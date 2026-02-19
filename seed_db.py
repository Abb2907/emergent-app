#!/usr/bin/env python3
"""Seed MongoDB Atlas with learning resources"""

import asyncio
import os
import uuid
from pathlib import Path
from datetime import datetime, timezone
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

ROOT_DIR = Path(__file__).parent / "backend"
load_dotenv(ROOT_DIR / '.env')

# Import resource data
import sys
sys.path.insert(0, str(ROOT_DIR))
from server import GITHUB_REPOS, OTHER_RESOURCES

async def seed_database():
    print("🌱 Seeding MongoDB Atlas with resources...")
    
    mongo_url = os.environ.get('MONGO_URL')
    db_name = os.environ.get('DB_NAME')
    
    if not mongo_url or not db_name:
        print("❌ Missing MONGO_URL or DB_NAME in .env")
        return False
    
    try:
        client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=10000)
        await client.server_info()
        db = client[db_name]
        
        # Check if already seeded
        existing = await db.resources.count_documents({})
        if existing > 0:
            print(f"✓ Database already has {existing} resources")
            client.close()
            return True
        
        # Prepare docs
        docs = []
        for repo in GITHUB_REPOS:
            docs.append({
                "resource_id": f"res_{uuid.uuid4().hex[:12]}",
                "type": "github",
                "url": f"https://github.com/{repo['github_id']}",
                **repo,
                "created_at": datetime.now(timezone.utc).isoformat()
            })
        
        for res in OTHER_RESOURCES:
            docs.append({
                "resource_id": f"res_{uuid.uuid4().hex[:12]}",
                **res,
                "created_at": datetime.now(timezone.utc).isoformat()
            })
        
        if docs:
            result = await db.resources.insert_many(docs)
            print(f"✓ Inserted {len(docs)} resources")
            
            # Create index
            try:
                await db.resources.create_index([
                    ("title", "text"), ("description", "text"),
                    ("category", "text"), ("tags", "text")
                ])
                print("✓ Created search index")
            except Exception as e:
                print(f"⚠️  Index creation: {e}")
        
        # Verify
        final_count = await db.resources.count_documents({})
        print(f"✓ Final count: {final_count} resources in database")
        
        client.close()
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    success = asyncio.run(seed_database())
    if success:
        print("\n✓ Database seeding complete!")
    else:
        print("\n❌ Seeding failed")
