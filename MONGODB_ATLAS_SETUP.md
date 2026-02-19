# MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Sign Up" (or "Try Free")
3. Create account with:
   - Email
   - Password
   - Accept terms
4. Verify your email

## Step 2: Create a Free Cluster

1. After login, click "Create" or "New Project"
2. Name the project (e.g., "emergent-app")
3. Click "Create Project"
4. Click "Create Deployment"
5. Choose "Free" tier (M0 Sandbox)
6. Select region closest to you
7. Click "Create Deployment"
8. Wait 1-2 minutes for cluster to initialize

## Step 3: Get Your Connection String

1. In your cluster dashboard, click "Connect"
2. Choose "Drivers" tab
3. Select "Node.js" driver
4. Copy the connection string
5. It looks like:
   ```
   mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/test_database?retryWrites=true&w=majority
   ```

## Step 4: Create Database User

If not already created:
1. Go to "Database Access"
2. Click "Add New Database User"
3. Create username and password
4. Grant "Read and write to any database" permission
5. Click "Create User"
6. Remember your username and password!

## Step 5: Whitelist IP Address

1. Go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
   - For production, add specific IPs only
4. Click "Confirm"

## Step 6: Update Your Backend Configuration

Replace YOUR_USERNAME and YOUR_PASSWORD in the connection string with your database user credentials you created in Step 4.

Example:
```
mongodb+srv://myuser:mypassword@cluster0.abcd1.mongodb.net/test_database?retryWrites=true&w=majority
```

IMPORTANT: URL encode special characters in password
- @ → %40
- : → %3A
- If your password is "p@ss:word", use "p%40ss%3Aword"

## Step 7: Update .env File

Update `a:\emergent-app\backend\.env` with your MongoDB Atlas connection string:

```
MONGO_URL="mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/test_database?retryWrites=true&w=majority"
DB_NAME="test_database"
CORS_ORIGINS="*"
EMERGENT_LLM_KEY=sk-emergent-f661b8634E934569d0
```

## Step 8: Test Connection

```powershell
cd a:\emergent-app
python test_backend.py
```

Expected output:
```
2. Testing MongoDB Connection:
   ✓ MongoDB Connected Successfully
   - Resources in DB: 0
   - Users in DB: 0
```

## Step 9: Start Backend (Resources will auto-seed)

```powershell
cd a:\emergent-app\backend
&'a:\emergent-app\backend\venv\Scripts\Activate.ps1'
python server.py
```

You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:__main__:Seeded 400+ resources
```

## Step 10: Verify Resources Are Loaded

```powershell
cd a:\emergent-app
python test_backend.py
```

Should show:
```
- Resources in DB: 400+
- Users in DB: 0
```

---

## Troubleshooting

### Connection Timeout
- Check IP whitelist includes your current IP
- Verify connection string is correct
- Check password has no unencoded special characters

### Authentication Failed
- Double-check username and password
- Verify password URL encoding for special characters

### "Please check your connection string"
- Copy full connection string from MongoDB Atlas
- Make sure it's `mongodb+srv://` not `mongodb://`

---

## Need Help?
MongoDB Atlas docs: https://docs.atlas.mongodb.com/
