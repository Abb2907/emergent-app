"""Shared utilities for API endpoints"""
import os
from motor.motor_asyncio import AsyncIOMotorClient
from typing import Optional
from pydantic import BaseModel, Field

# Initialize MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'test_database')

client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=5000)
db = client[db_name]

# Pydantic Models
class SessionRequest(BaseModel):
    session_id: str

class BookmarkRequest(BaseModel):
    resource_id: str

async def get_current_user(request):
    """Extract and validate user from request"""
    try:
        token = request.cookies.get("session_token") or request.headers.get("Authorization", "").replace("Bearer ", "")
        if not token:
            return None
        
        session = await db.user_sessions.find_one({"session_token": token}, {"_id": 0})
        if not session:
            return None
        
        from datetime import datetime, timezone
        expires_at = session.get("expires_at")
        if isinstance(expires_at, str):
            expires_at = datetime.fromisoformat(expires_at)
        if expires_at.tzinfo is None:
            expires_at = expires_at.replace(tzinfo=timezone.utc)
        
        if expires_at < datetime.now(timezone.utc):
            return None
        
        user = await db.users.find_one({"user_id": session["user_id"]}, {"_id": 0})
        return user
    except Exception:
        return None

async def get_optional_user(request):
    """Get user if authenticated, otherwise return None"""
    return await get_current_user(request)
