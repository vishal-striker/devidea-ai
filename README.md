# DevIdeaAI - AI-Powered Project Idea Generator

A full-stack application that generates innovative software project ideas with detailed descriptions, features, and architecture suggestions. Built with MERN stack (MongoDB, Express, React, Node.js).

## Features

- 🎯 **Generate Project Ideas** - Select tech stack and difficulty level to get project ideas
- 💾 **Save Ideas** - Save generated ideas to MongoDB
- 📋 **Dashboard** - View and manage all saved ideas
- 🔍 **Search & Filter** - Search ideas by title, description, or tech stack
- 🤖 **AI Integration** - OpenAI integration for dynamic idea generation (optional)
- 📱 **Responsive Design** - Works on desktop and mobile

## Tech Stack

- **Frontend**: React, Tailwind CSS, React Router
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **AI**: OpenAI GPT-3.5 (optional)

## Quick Start

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone and install dependencies:**
```bash
# Install all dependencies
npm run install-all

# Or install separately:
cd server && npm install
cd ../client && npm install
```

2. **Configure Environment Variables:**

Create `server/.env` file:
```env
# MongoDB
MONGO_URI=mongodb://localhost:27017/devideaai

# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/devideaai

# Server Port
PORT=5000

# OpenAI (optional - leave blank to use template fallback)
OPENAI_API_KEY=your_openai_api_key_here
```

3. **Start MongoDB:**
```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
```

4. **Run the Application:**

```bash
# Run both server and client
npm run dev

# Or run separately:
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend  
npm run client
```

5. **Open Browser:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ideas/generate` | Generate a new project idea |
| POST | `/api/ideas/save` | Save an idea to database |
| GET | `/api/ideas` | Get all saved ideas |
| DELETE | `/api/ideas/:id` | Delete an idea |
| GET | `/api/health` | Health check |

### Example Usage

**Generate Idea:**
```bash
curl -X POST http://localhost:5000/api/ideas/generate \
  -H "Content-Type: application/json" \
  -d '{"techStack": "MERN", "difficulty": "Beginner"}'
```

**Save Idea:**
```bash
curl -X POST http://localhost:5000/api/ideas/save \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Task Manager",
    "description": "A task management app",
    "features": ["Create tasks", "Mark complete"],
    "architecture": "MERN Stack",
    "techStack": "MERN",
    "difficulty": "Beginner"
  }'
```

**Get All Ideas:**
```bash
curl http://localhost:5000/api/ideas
```

## Project Structure

```
DevIdeaAI/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/         # Page components
│   │   ├── services/     # API services
│   │   └── App.js        # Main app
│   └── package.json
├── server/                # Express backend
│   ├── config/           # Database config
│   ├── controllers/      # Route controllers
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── server.js        # Server entry
│   └── .env             # Environment variables
├── package.json          # Root package.json
└── README.md
```

## Deployment

### Backend (Render/Railway/Heroku)

1. Push code to GitHub
2. Connect to deployment platform
3. Set environment variables:
   - `MONGO_URI` - MongoDB connection string
   - `OPENAI_API_KEY` - OpenAI key (optional)
4. Build command: `npm run install-all`
5. Start command: `npm run start`

### Frontend (Vercel/Netlify)

1. Build the React app:
```bash
cd client
npm run build
```

2. Deploy the `build` folder to static hosting

Or connect your GitHub repository to Vercel/Netlify for automatic deployments.

## Tech Stack Options

Available project ideas for:
- **MERN** (MongoDB, Express, React, Node.js)
- **MEAN** (MongoDB, Express, Angular, Node.js)
- **Python** (Django/Flask)
- **Java** (Spring Boot)
- **AI/ML**
- **Mobile App** (React Native/Flutter)

Difficulty Levels:
- Beginner
- Intermediate  
- Advanced

## License

MIT

# devidea-ai
