# Monorepo Deployment Guide

## ✅ What's Changed

Your project is now a **unified monorepo** with:

```
✅ Frontend (React) → Deploys to Vercel (root /)
✅ Backend (FastAPI) → Deploys to Vercel as serverless functions (/api)
✅ Database (MongoDB Atlas) → Shared across frontend & backend
✅ Single Vercel deployment → No separate backend hosting needed
```

## 🗂️ Folder Structure

```
emergent-app/
├── frontend/                          # React SPA
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env                          # (Empty - uses relative /api)
│
├── api/                              # Python FastAPI serverless
│   ├── index.py                      # Main FastAPI app
│   ├── utils.py                      # Shared utilities
│   ├── requirements.txt              # Python dependencies
│   └── __init__.py
│
├── vercel.json                       # Vercel configuration
├── .env.local                        # Local development env vars
├── .env.example                      # Template (commit to repo)
└── backend/                          # (OLD - can be deleted)
```

## 🚀 Deployment Steps

### Step 1: Commit Changes

```bash
git add -A
git commit -m "Consolidate to monorepo: frontend + API in single Vercel deployment"
git push origin main
```

### Step 2: Configure Vercel Environment Variables

1. Go to **Vercel Dashboard** → Your Project
2. Go to **Settings** → **Environment Variables**
3. Add these variables:

```
MONGO_URL = mongodb+srv://mongoDb:alloydb@cluster0.tkahlx4.mongodb.net/test_database?retryWrites=true&w=majority
DB_NAME = test_database
CORS_ORIGINS = *
EMERGENT_LLM_KEY = sk-emergent-f661b8634E934569d0
```

4. Redeploy the project (or just push again)

### Step 3: Verify Deployment

Once Vercel finishes deploying:

1. Visit your frontend URL (e.g., `https://emergent-app.vercel.app`)
2. Resources should load from `/api/resources`
3. Check Vercel logs for any errors

## 🔄 How It Works

### Local Development

**Frontend only (connects to MongoDB Atlas via `/api`):**
```bash
cd frontend
npm install
npm start  # http://localhost:3000
```

The frontend will make requests to `http://localhost:3000/api/...`

### Production Deployment

Vercel automatically:
1. ✅ Builds frontend: `cd frontend && npm run build`
2. ✅ Deploys frontend to `/` 
3. ✅ Deploys Python API to `/api`
4. ✅ Routes all `/api/*` requests to serverless functions
5. ✅ Everything shares the same domain (no CORS issues!)

## 📝 Key Changes Made

| File | Change |
|------|--------|
| `/api/index.py` | ✨ New main FastAPI app with all endpoints |
| `/api/requirements.txt` | ✨ New Python dependencies for serverless |
| `vercel.json` | ✨ New Vercel configuration |
| `frontend/.env` | Updated to use relative `/api` paths |
| All frontend components | Updated API URL to support both modes |
| `.gitignore` | Updated to exclude `.env` files |

## 🎯 Benefits of This Monorepo Structure

✅ **Single Vercel Deployment** - No separate backend hosting needed  
✅ **No CORS Issues** - Frontend and API on same domain  
✅ **Easier Maintenance** - Single Git repo, single deployment  
✅ **Better Performance** - No cross-domain requests  
✅ **Automatic Scaling** - Vercel handles both frontend and backend  

## 🔧 Troubleshooting

### Resources not loading after deployment?

1. Check Vercel **Deployments** tab for build errors
2. Check **Functions** tab to see if API is deployed
3. Check browser console for API error messages
4. Verify `MONGO_URL` is correct in Vercel env vars

### Local development endpoint not working?

Make sure `.env.local` has `MONGO_URL` set:
```
MONGO_URL=mongodb+srv://mongoDb:alloydb@cluster0.tkahlx4.mongodb.net/test_database?retryWrites=true&w=majority
```

### Want to use external backend again?

Set `REACT_APP_BACKEND_URL` in `frontend/.env`:
```
REACT_APP_BACKEND_URL=https://your-external-backend.com
```

## 📚 Additional Resources

- [Vercel Python Support](https://vercel.com/docs/concepts/functions/serverless-functions/runtimes/python)
- [FastAPI Documentation](https://fastapi.tiangithub.com)
- [Mongum (ASGI Adapter)](https://www.mangum.io/)

---

**Status:** ✅ Ready for Vercel deployment! Just push to GitHub and redeploy.
