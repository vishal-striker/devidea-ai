# DevIdeaAI MongoDB Connection Fix & Deployment TODO

## Current Status
✅ **Dependencies**: mongoose, dotenv installed in server/package.json  
✅ **server.js**: Uses `process.env.PORT`, `dotenv.config()`, calls `connectDB()`  
✅ **config/db.js**: Uses `process.env.MONGO_URI`, async connect with success/error logs  

## Deployment Verification Steps (Render + MongoDB Atlas)

### 1. Verify Render Environment Variables
```
Environment → Add Environment Variable:
Key: MONGO_URI
Value: mongodb+srv://devideauser:YOUR_PASSWORD@devidea-cluster.xxxxx.mongodb.net/devideaai?retryWrites=true&w=majority
```
- Copy from MongoDB Atlas → Clusters → Connect → Drivers
- Replace `<password>` with your Atlas user password
- Special chars: `@` → `%40`, `#` → `%23`

### 2. Update MongoDB Atlas Network Access
```
Atlas Dashboard → Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)
```
⚠️ **Security Note**: Restrict to Render IPs later (find in Render docs).

### 3. Deploy & Monitor Logs
```
git add . && git commit -m "Improve DB logging" && git push origin main
```
Check Render logs for:
```
✔ Server running on port 5000
✔ MongoDB Connected
```
❌ If error: `"MongoDB Connection Error: ..."` → Check URI/whitelist.

### 4. Test API Endpoints
```bash
# Health check
curl https://devidea-ai.onrender.com/api/health

# Test idea save (requires DB)
curl -X POST https://devidea-ai.onrender.com/api/ideas \\
  -H "Content-Type: application/json" \\
  -d '{"title":"Test","description":"DB test"}'
```

## Troubleshooting
| Issue | Fix |
|-------|-----|
| No MONGO_URI log | Add to Render Environment Variables |
| `authentication failed` | Check Atlas user/password, encode special chars (%40 for @) |
| `connection timeout` | Atlas whitelist → 0.0.0.0/0 |
| Render 500 errors | Check logs for `"MongoDB Connection Error:"` details |
| Local testing | `cd server && npm run dev` → see "MongoDB Connected: localhost" |

## Next Steps After Fix
- [ ] Remove IP whitelist 0.0.0.0/0 
- [ ] Add Render outbound IP to Atlas whitelist
- [ ] Test full app flow (create/edit ideas)
- [ ] Monitor Render metrics/performance

**Progress: 90% complete - Fix Render env & redeploy!**
