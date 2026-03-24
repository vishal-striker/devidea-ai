const { GoogleGenerativeAI } = require("@google/generative-ai");
const Idea = require('../models/Idea');

// Initialize Gemini
const genAI = process.env.GEMINI_API_KEY 
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

// Simplified fallback templates (only structure, minimal data)
const ideaTemplates = {
  MERN: {
    Beginner: [{
      title: "Task Manager",
      description: "Simple task management app",
      features: ["CRUD tasks", "Categories", "Local storage"],
      architecture: "React + Express + MongoDB",
      extensions: ["Auth", "Deploy"]
    }],
    Intermediate: [{
      title: "E-Commerce",
      description: "Fullstack shopping app",
      features: ["Products", "Cart", "Payments"],
      architecture: "MERN stack with Stripe",
      extensions: ["Admin", "Analytics"]
    }],
    Advanced: [{
      title: "SaaS Platform",
      description: "Multi-tenant SaaS app",
      features: ["Tenants", "Billing", "API"],
      architecture: "Microservices MERN",
      extensions: ["SSO", "AI"]
    }]
  },
  MEAN: { Beginner: [], Intermediate: [], Advanced: [] },
  Python: { Beginner: [], Intermediate: [], Advanced: [] },
  Java: { Beginner: [], Intermediate: [], Advanced: [] },
  'AI/ML': { Beginner: [], Intermediate: [], Advanced: [] },
  'Mobile App': { Beginner: [], Intermediate: [], Advanced: [] }
};

// Get random item
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Generate unique ID
const generateId = () => Math.random().toString(36).substring(2, 15);

// @desc    Generate AI project idea (Gemini primary, templates fallback)
const generateIdea = async (req, res) => {
  try {
    const { techStack, difficulty } = req.body;

    if (!techStack || !difficulty) {
      return res.status(400).json({ message: 'techStack and difficulty required' });
    }

    let idea, isAIGenerated = false;

    // Try Gemini AI
    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Generate a UNIQUE software project idea.

Tech Stack: ${techStack}
Difficulty: ${difficulty}

Respond ONLY in valid JSON format:

{
  "title": "project title",
  "description": "3 sentence project description", 
  "features": ["feature1","feature2","feature3","feature4"],
  "architecture": "technical architecture",
  "extensions": ["future idea1","future idea2"]
}

Important rules:
- Output must be valid JSON
- Do NOT include markdown  
- Do NOT include explanations
- Only JSON`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text().trim();
        
        console.log('Raw Gemini:', responseText.substring(0, 100) + '...');
        
        let parsedIdea;
        try {
          parsedIdea = JSON.parse(responseText);
        } catch (parseError) {
          console.error('Parse failed:', parseError.message);
          console.error('Response:', responseText);
          throw parseError;
        }
        
        idea = parsedIdea;
        isAIGenerated = true;
        console.log(`✅ Gemini ${techStack}-${difficulty}`);

      } catch (aiError) {
        console.log('Gemini failed:', aiError.message);
      }
    }

    // Fallback to templates
    if (!idea) {
      const templates = ideaTemplates[techStack]?.[difficulty] || [];
      if (templates.length === 0) {
        return res.status(400).json({ message: 'No templates for this stack/difficulty' });
      }
      idea = getRandomItem(templates);
      console.log(`📦 Template: ${techStack} ${difficulty}`);
    }

    // Standard response
    const response = {
      id: generateId(),
      title: idea.title,
      description: idea.description,
      features: idea.features || [],
      architecture: idea.architecture,
      techStack,
      difficulty,
      extensions: idea.extensions || [],
      generatedAt: new Date().toISOString(),
      isAIGenerated
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Generation error:', error);
    res.status(500).json({ message: 'AI generation failed' });
  }
};

// Keep existing functions unchanged
const saveIdea = async (req, res) => {
  try {
    const { title, description, features, architecture, techStack, difficulty, extensions } = req.body;

    console.log('=== SAVE IDEA REQUEST ===');
    console.log('User ID:', req.user.id);

    if (!title || !description || !architecture || !techStack || !difficulty) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const idea = new Idea({
      title,
      description,
      features: features || [],
      architecture,
      techStack,
      difficulty,
      extensions: extensions || [],
      userId: req.user.id
    });

    const savedIdea = await idea.save();
    const populatedIdea = await Idea.findById(savedIdea._id).populate('userId', 'name email');
    
    res.status(201).json(populatedIdea);
  } catch (error) {
    console.error('Save error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getIdeas = async (req, res) => {
  try {
    console.log('User ID:', req.user.id);
    
    const { search } = req.query;
    let query = { userId: req.user.id };
    
    if (search) {
      query.$and = [
        { userId: req.user.id },
        {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { techStack: { $regex: search, $options: 'i' } }
          ]
        }
      ];
    }

    const ideas = await Idea.find(query).populate('userId', 'name email').sort({ createdAt: -1 });
    res.status(200).json(ideas);
  } catch (error) {
    console.error('Get ideas error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteIdea = async (req, res) => {
  try {
    const idea = await Idea.findOne({ _id: req.params.id, userId: req.user.id });

    if (!idea) {
      return res.status(404).json({ message: 'Idea not found or unauthorized' });
    }

    await Idea.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Idea deleted' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  generateIdea,
  saveIdea,
  getIdeas,
  deleteIdea
};
