# API Connection Fix - Frontend/Backend Deployment

## Current Status
✅ `client/.env` created with REACT_APP_API_URL  
✅ Backend CORS updated for Vercel frontend  

## Step 1: Frontend API Service (Updated)
`client/src/services/api.js` now uses:
```
const API_URL = process.env.REACT_APP_API_URL 
  ? `${process.env.REACT_APP_API_URL}/api/ideas`
  : '/api/ideas';
```

## Step 2: App.js Fixed
Direct fetch replaced with api service import.

## Step 3: Backend CORS Secured
`server/server.js`: `cors({ origin: "https://devidea-ai-app.vercel.app" })`

## Deployment Steps

### Frontend (Vercel)
```
cd client
npm install
npm run build
git add .
git commit -m "Fix API calls with REACT_APP_API_URL"
git push
```
Vercel auto-deploys → restart if needed.

### Backend (Render)
```
git push origin main
```
Render auto-deploys.

## Test After Deploy
1. Visit https://devidea-ai-app.vercel.app
2. Select tech/difficulty → **Generate Project Idea**
3. ✅ No "Failed to generate idea"
4. Save idea → check Dashboard
5. Browser Console → no CORS errors

## Troubleshooting
| Error | Fix |
|-------|-----|
| CORS error | Check backend CORS origin matches Vercel URL |
| `undefined` API_URL | Restart dev server, rebuild frontend |
| 404 on /api/ideas | Verify Render URL in .env |
| OpenAI error | Check backend OpenAI env vars on Render |

**Progress: Ready for deploy! Test generate button 🚀**
