# Monorepo Structure

## Single Vercel Deployment

This is now a unified monorepo that deploys as a single Vercel project:

```
emergent-app/
├── frontend/          # React SPA (deployed to /)
├── api/               # Python FastAPI serverless functions (deployed to /api)
├── vercel.json        # Vercel configuration
└── ...
```

### Deployment

Push to GitHub and Vercel will automatically:
1. Build the frontend with `cd frontend && npm run build`
2. Deploy frontend assets to `/`
3. Deploy Python API functions to `/api`
4. Proxy `/api/*` requests to the serverless functions

### Local Development

**Frontend:**
```bash
cd frontend
npm install
npm start  # Runs on http://localhost:3000
```

**Backend API:**
Set `MONGO_URL` in `.env.local`, then frontend will call `/api` endpoints directly.

### Environment Variables

Set these in Vercel project settings:
- `MONGO_URL` - MongoDB Atlas connection string
- `DB_NAME` - Database name (default: test_database)
- `CORS_ORIGINS` - Allowed origins (default: *)
- `EMERGENT_LLM_KEY` - API key for LLM features

See `.env.example` for template.
