# DevIdeaAI Backend Render Deployment TODO

## ✅ Completed
- [x] Create deployment TODO

## 🔄 In Progress

## ⏳ Pending

### 1. Code Fixes (3/3) ✅
- [x] Update server/server.js (PORT=5000, listen '0.0.0.0', health JSON)
- [x] Update README.md (Render steps + env vars + test URL)
- [x] Create .gitignore (node_modules/, .env, etc.)

### 2. Git Prep (0/3)  
- [ ] git add .
- [ ] git commit -m "fix: production config for Render deployment"
- [ ] git push origin main

### 3. Render Deploy (User actions - 0/4)
- [ ] Dashboard: Root directory = `server`
- [ ] Environment variables:
  | Var | Value |
  |-----|-------|
  | MONGO_URI | `mongodb+srv://...` (password %40 encoded) |
  | JWT_SECRET | `your-strong-secret-key` |
  | GEMINI_API_KEY | `your-gemini-key` |
- [ ] Start command: `npm start`
- [ ] Manual Deploy / Connect GitHub repo

### 4. Verify (0/2)
- [ ] https://devidea-ai.onrender.com/api/health → `{"status": "ok", "mongodb": "connected"}`
- [ ] Test /api/auth/register, /api/ideas (with valid token)

**Next step after git push: User handles Render dashboard env vars & deploy.**
