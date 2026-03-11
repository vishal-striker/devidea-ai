# MongoDB Setup Guide for DevIdeaAI

## Option 1: Local MongoDB (Recommended for Development)

### Step 1: Install MongoDB Community Server
1. Download MongoDB from: https://www.mongodb.com/try/download/community
2. Choose:
   - Version: Current (latest)
   - Package: MSI
   - Platform: Windows
3. Run the installer
4. During installation, check "Install MongoDB as a Service"
5. Complete the installation

### Step 2: Start MongoDB
```bash
# If installed as a service (automatic):
# MongoDB should start automatically

# If not running as service, manually start:
mongod
```

### Step 3: Verify Connection
The `.env` file is already configured for local MongoDB:
```
MONGO_URI=mongodb://localhost:27017/devideaai
```

---

## Option 2: MongoDB Atlas (Cloud)

### Step 1: Create Free Account
1. Go to https://www.mongodb.com/atlas
2. Click "Try Free" 
3. Create account with Google or Email

### Step 2: Create Free Cluster
1. After login, click "Create a Cluster"
2. Select:
   - **Provider**: AWS (or Google Cloud/Azure)
   - **Region**: Choose one near you (e.g., us-east-1)
   - **Cluster Tier**: Free (M0)
   - **Cluster Name**: devidea-cluster
3. Click "Create Cluster" (wait 1-2 minutes)

### Step 3: Create Database User
1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose:
   - **Authentication Method**: Password
   - **Username**: devideauser
   - **Password**: Create a strong password (e.g., `DevIdea123!`)
   - **Database User Privileges**: Atlas admin
4. Click "Add User"

### Step 4: Network Access (Allow All IPs)
1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. For development, select "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### Step 5: Get Connection String
1. Click "Database" in left sidebar
2. Click "Connect" on your cluster
3. Select "Drivers"
4. Copy the connection string:
```
mongodb+srv://devideauser:<password>@devidea-cluster.xxxxx.mongodb.net/devideaai?retryWrites=true&w=majority
```

### Step 6: Update .env File
Replace `<password>` with your actual password and update `.env`:
```
MONGO_URI=mongodb+srv://devideauser:YOUR_PASSWORD_HERE@devidea-cluster.xxxxx.mongodb.net/devideaai?retryWrites=true&w=majority
```

---

## Testing the Connection

After setting up MongoDB:

1. **Restart the server:**
```bash
cd server
npm run dev
```

2. **Check the terminal** - You should see:
```
MongoDB Connected: localhost
```

3. **Test with Postman:**
- POST `http://localhost:5000/api/ideas/save`
- Body:
```json
{
  "title": "Test Project",
  "description": "A test project idea",
  "features": ["Feature 1", "Feature 2"],
  "architecture": "MERN Stack",
  "techStack": "MERN",
  "difficulty": "Beginner",
  "extensions": ["Ext 1"]
}
```

---

## Troubleshooting

| Error | Solution |
|-------|----------|
| `ECONNREFUSED` | MongoDB not running. Start with `mongod` |
| `Authentication failed` | Check username/password in MONGO_URI |
| `Database not found` | The database will be created automatically |
| `Timeout` | Check network/firewall settings |

## Quick Check Commands
```bash
# Check if MongoDB is running
sc query MongoDB

# Or check with mongosh
mongosh --eval "db.version()"
```

