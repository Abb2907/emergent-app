#!/usr/bin/env python3
"""Diagnostic script to test backend connectivity"""

import asyncio
import os
from pathlib import Path
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent / "backend"
load_dotenv(ROOT_DIR / '.env')

async def test_backend():
    print("=" * 60)
    print("BACKEND DIAGNOSTICS")
    print("=" * 60)
    
    # 1. Check environment variables
    print("\n1. Environment Variables:")
    mongo_url = os.environ.get('MONGO_URL')
    db_name = os.environ.get('DB_NAME')
    cors_origins = os.environ.get('CORS_ORIGINS')
    
    print(f"   MONGO_URL: {mongo_url}")
    print(f"   DB_NAME: {db_name}")
    print(f"   CORS_ORIGINS: {cors_origins}")
    
    if not mongo_url or not db_name:
        print("   ❌ CRITICAL: Missing database configuration!")
        return False
    
    # 2. Test MongoDB connection
    print("\n2. Testing MongoDB Connection:")
    try:
        from motor.motor_asyncio import AsyncIOMotorClient
        
        client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=5000)
        await client.server_info()
        db = client[db_name]
        
        # Count resources
        resource_count = await db.resources.count_documents({})
        user_count = await db.users.count_documents({})
        
        print(f"   ✓ MongoDB Connected Successfully")
        print(f"   - Resources in DB: {resource_count}")
        print(f"   - Users in DB: {user_count}")
        
        if resource_count == 0:
            print("   ⚠️  WARNING: No resources found in database!")
            print("      The startup seed may not have run correctly.")
            return False
        
        # Sample resources
        sample = await db.resources.find_one({}, {"_id": 0})
        if sample:
            print(f"   - Sample resource: {sample.get('title', 'N/A')}")
        
        client.close()
        return True
        
    except Exception as e:
        print(f"   ❌ MongoDB Connection Failed: {e}")
        print("   Make sure MongoDB is running on localhost:27017")
        return False

if __name__ == "__main__":
    success = asyncio.run(test_backend())
    print("\n" + "=" * 60)
    if success:
        print("✓ Backend looks healthy!")
    else:
        print("❌ Backend has issues - see above for details")
    print("=" * 60)
