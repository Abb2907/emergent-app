"""FastAPI app for Vercel serverless deployment"""
from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import uuid
import json
import re
from datetime import datetime, timezone, timedelta
from pydantic import BaseModel
from typing import List, Optional

# Optional: LLM search enhancement
try:
    from emergentintegrations.llm.chat import LlmChat, UserMessage
    HAS_LLM = True
except ImportError:
    HAS_LLM = False
    LlmChat = None
    UserMessage = None

# Get environment variables
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'test_database')

# Initialize MongoDB
client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=10000)
db = client[db_name]

# FastAPI app
app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class SessionRequest(BaseModel):
    session_id: str

class BookmarkRequest(BaseModel):
    resource_id: str

# Auth helpers
async def get_current_user(request: Request):
    token = request.cookies.get("session_token")
    if not token:
        auth = request.headers.get("Authorization", "")
        if auth.startswith("Bearer "):
            token = auth[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    session = await db.user_sessions.find_one({"session_token": token}, {"_id": 0})
    if not session:
        raise HTTPException(status_code=401, detail="Invalid session")
    
    expires_at = session["expires_at"]
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=401, detail="Session expired")
    
    user = await db.users.find_one({"user_id": session["user_id"]}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user

async def get_optional_user(request: Request):
    try:
        return await get_current_user(request)
    except HTTPException:
        return None

# ============================================================
# RESOURCES ENDPOINTS
# ============================================================

@app.get("/api/resources")
async def get_resources(
    type: Optional[str] = None,
    category: Optional[str] = None,
    level: Optional[str] = None,
    limit: int = 50,
    skip: int = 0
):
    query = {}
    if type and type != "all":
        query["type"] = type
    if category:
        query["category"] = {"$regex": category, "$options": "i"}
    if level:
        query["level"] = level
    resources = await db.resources.find(query, {"_id": 0}).skip(skip).limit(limit).to_list(limit)
    total = await db.resources.count_documents(query)
    return {"resources": resources, "total": total}

@app.get("/api/resources/categories")
async def get_categories():
    pipeline = [
        {"$group": {"_id": "$category", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    cats = await db.resources.aggregate(pipeline).to_list(100)
    return {"categories": [c["_id"] for c in cats if c["_id"]]}

@app.get("/api/resources/stats")
async def get_stats():
    total = await db.resources.count_documents({})
    github_count = await db.resources.count_documents({"type": "github"})
    course_count = await db.resources.count_documents({"type": "course"})
    paper_count = await db.resources.count_documents({"type": "paper"})
    return {"total": total, "github": github_count, "courses": course_count, "papers": paper_count}

@app.get("/api/search")
async def search_resources(q: str = "", limit: int = 50):
    if not q.strip():
        return {"resources": [], "total": 0, "query": q}

    keywords = [q]
    try:
        llm_key = os.environ.get("EMERGENT_LLM_KEY")
        if HAS_LLM and llm_key and len(q.strip()) > 3:
            chat = LlmChat(
                api_key=llm_key,
                session_id=f"search_{uuid.uuid4().hex[:8]}",
                system_message="""You are an AI search query enhancer for an AI learning platform.
Extract the most relevant search keywords from the user's query.
Return ONLY valid JSON: {"keywords": ["keyword1", "keyword2", "keyword3"]}
Keep keywords concise and directly relevant to AI/ML topics. Max 5 keywords."""
            ).with_model("gemini", "gemini-3-flash-preview")
            msg = UserMessage(text=f"Query: {q}")
            ai_resp = await chat.send_message(msg)
            match = re.search(r'\{.*?\}', ai_resp, re.DOTALL)
            if match:
                parsed = json.loads(match.group())
                kws = parsed.get("keywords", [])
                if kws:
                    keywords = list(set([q] + kws))
    except Exception:
        pass

    regex_patterns = [{"$regex": kw, "$options": "i"} for kw in keywords]
    mongo_query = {"$or": [
        {"title": {"$in": regex_patterns}},
        {"description": {"$in": regex_patterns}},
        {"category": {"$in": regex_patterns}},
        {"tags": {"$elemMatch": {"$in": regex_patterns}}}
    ]}
    resources = await db.resources.find(mongo_query, {"_id": 0}).limit(limit).to_list(limit)
    return {"resources": resources, "total": len(resources), "query": q, "keywords": keywords}

# ============================================================
# BOOKMARKS ENDPOINTS
# ============================================================

@app.get("/api/bookmarks")
async def get_bookmarks(request: Request):
    user = await get_current_user(request)
    bms = user.get("bookmarks", [])
    if not bms:
        return {"resources": []}
    resources = await db.resources.find({"resource_id": {"$in": bms}}, {"_id": 0}).to_list(200)
    return {"resources": resources}

@app.post("/api/bookmarks/{resource_id}")
async def add_bookmark(resource_id: str, request: Request):
    user = await get_current_user(request)
    await db.users.update_one({"user_id": user["user_id"]}, {"$addToSet": {"bookmarks": resource_id}})
    return {"message": "Bookmarked"}

@app.delete("/api/bookmarks/{resource_id}")
async def remove_bookmark(resource_id: str, request: Request):
    user = await get_current_user(request)
    await db.users.update_one({"user_id": user["user_id"]}, {"$pull": {"bookmarks": resource_id}})
    return {"message": "Removed"}

# ============================================================
# PROGRESS ENDPOINTS
# ============================================================

@app.post("/api/progress/{resource_id}")
async def mark_complete(resource_id: str, request: Request):
    user = await get_current_user(request)
    await db.users.update_one({"user_id": user["user_id"]}, {"$addToSet": {"completed": resource_id}})
    updated = await db.users.find_one({"user_id": user["user_id"]}, {"_id": 0})
    count = len(updated.get("completed", []))
    badges = updated.get("badges", [])
    new_badges = []
    badge_thresholds = [(1, "ML Initiate"), (5, "Knowledge Seeker"), (15, "Deep Learning Smith"), (30, "LLM Architect"), (50, "Frontier Explorer")]
    for threshold, badge in badge_thresholds:
        if count >= threshold and badge not in badges:
            new_badges.append(badge)
    if new_badges:
        await db.users.update_one({"user_id": user["user_id"]}, {"$push": {"badges": {"$each": new_badges}}})
    return {"message": "Marked complete", "new_badges": new_badges, "total_completed": count}

@app.delete("/api/progress/{resource_id}")
async def unmark_complete(resource_id: str, request: Request):
    user = await get_current_user(request)
    await db.users.update_one({"user_id": user["user_id"]}, {"$pull": {"completed": resource_id}})
    return {"message": "Unmarked"}

# ============================================================
# AUTH ENDPOINTS
# ============================================================

@app.post("/api/auth/session")
async def auth_session(req: SessionRequest, response: Response):
    """Mock auth endpoint - in production, validate with auth service"""
    # For now, just create a test user
    import httpx
    try:
        async with httpx.AsyncClient() as hc:
            resp = await hc.get(
                "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data",
                headers={"X-Session-ID": req.session_id}
            )
            if resp.status_code != 200:
                raise HTTPException(status_code=401, detail="Invalid session")
            data = resp.json()
    except:
        # Fallback for testing
        data = {"email": f"user_{uuid.uuid4().hex[:8]}@test.com", "name": "Test User", "picture": "", "session_token": uuid.uuid4().hex}

    email = data["email"]
    session_token = data["session_token"]

    user = await db.users.find_one({"email": email}, {"_id": 0})
    if not user:
        user_id = f"user_{uuid.uuid4().hex[:12]}"
        user = {
            "user_id": user_id,
            "email": email,
            "name": data.get("name", "User"),
            "picture": data.get("picture", ""),
            "bookmarks": [],
            "completed": [],
            "badges": [],
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        await db.users.insert_one({**user})
    else:
        user_id = user["user_id"]

    expires_at = datetime.now(timezone.utc) + timedelta(days=7)
    await db.user_sessions.insert_one({
        "user_id": user_id,
        "session_token": session_token,
        "expires_at": expires_at.isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat()
    })

    response.set_cookie(
        "session_token", session_token, max_age=7*24*3600,
        httponly=True, secure=True, samesite="none", path="/"
    )
    return {"user": {k: v for k, v in user.items() if k != "_id"}}

@app.get("/api/auth/me")
async def get_me(request: Request):
    user = await get_current_user(request)
    return {k: v for k, v in user.items() if k != "_id"}

@app.post("/api/auth/logout")
async def logout(request: Request, response: Response):
    token = request.cookies.get("session_token")
    if token:
        await db.user_sessions.delete_one({"session_token": token})
    response.delete_cookie("session_token", path="/", samesite="none", secure=True)
    return {"message": "Logged out"}

# Health check
@app.get("/health")
async def health():
    return {"status": "ok"}

# Vercel serverless function handler
from mangum import Mangum
handler = Mangum(app)
