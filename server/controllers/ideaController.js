const OpenAI = require('openai');
const Idea = require('../models/Idea');

// Initialize OpenAI client
const openai = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here'
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

// Project idea templates for fallback
const ideaTemplates = {
  MERN: {
    Beginner: [
      {
        title: "Task Management Dashboard",
        description: "A simple task management application that helps users organize their daily coding tasks with categories and priority levels.",
        features: ["Create, edit, and delete tasks", "Mark tasks as complete", "Category tagging system", "Filter tasks by status", "Local storage persistence"],
        architecture: "React frontend with functional components, Node.js Express backend, MongoDB for data storage, REST API integration.",
        extensions: ["Add due dates", "Implement drag-and-drop", "Add dark mode"]
      },
      {
        title: "Weather Information App",
        description: "A weather dashboard that fetches real-time weather data and displays forecasts for multiple cities.",
        features: ["Search city weather", "Display temperature, humidity, wind", "5-day forecast view", "Weather icons and backgrounds", "Save favorite cities"],
        architecture: "React frontend with hooks, OpenWeatherMap API integration, Node.js proxy server, MongoDB for storing favorites.",
        extensions: ["Add weather alerts", "Implement charts", "Add notifications"]
      },
      {
        title: "Personal Budget Tracker",
        description: "A finance tracking application to manage personal expenses and income with visual summaries.",
        features: ["Add transactions (income/expense)", "Category-based organization", "Monthly summary charts", "Transaction history", "Data export functionality"],
        architecture: "React with Chart.js for visualizations, Node.js backend, MongoDB for transaction storage.",
        extensions: ["Add budgets", "Recurring transactions", "Multi-currency support"]
      }
    ],
    Intermediate: [
      {
        title: "E-Learning Platform",
        description: "A comprehensive online learning management system with video courses, quizzes, and progress tracking.",
        features: ["User authentication and profiles", "Course creation and management", "Video streaming integration", "Quiz and assessment system", "Progress tracking and certificates", "Discussion forums"],
        architecture: "React SPA with React Router, Node.js/Express REST API, MongoDB database, JWT authentication, Cloud storage for videos.",
        extensions: ["Live streaming", "Payment integration", "AI recommendations"]
      },
      {
        title: "Real-Time Collaboration Tool",
        description: "A collaborative workspace for teams to brainstorm, organize ideas, and work together in real-time.",
        features: ["Real-time document editing", "Team workspaces", "Comments and mentions", "File sharing and attachments", "Activity timeline", "Notification system"],
        architecture: "React with WebSocket (Socket.io), Node.js backend, MongoDB for data, Express for API routes.",
        extensions: ["Video conferencing", "Code snippet sharing", "Integrations"]
      },
      {
        title: "Job Portal Application",
        description: "A full-featured job board connecting employers with job seekers, featuring advanced filtering and applications.",
        features: ["User authentication (Employer/Seeker)", "Job posting and management", "Advanced search and filters", "Application tracking system", "Resume upload and parsing", "Email notifications"],
        architecture: "React frontend, Node.js REST API, MongoDB with indexing for search, JWT auth, Multer for file uploads.",
        extensions: ["AI job matching", "Interview scheduling", "Analytics dashboard"]
      }
    ],
    Advanced: [
      {
        title: "SaaS Project Management Platform",
        description: "A multi-tenant SaaS platform for enterprise project management with advanced analytics and automation.",
        features: ["Multi-tenant architecture", "Advanced Kanban boards", "Gantt charts and timelines", "Resource management", "Time tracking and billing", "Custom workflows", "API and webhooks", "SSO integration"],
        architecture: "React with TypeScript, Node.js microservices, MongoDB sharded clusters, Redis caching, Docker containers.",
        extensions: ["AI sprint planning", "Predictive analytics", "Mobile apps"]
      },
      {
        title: "Healthcare Management System",
        description: "A comprehensive HIPAA-compliant healthcare platform for managing patients, appointments, and medical records.",
        features: ["Patient management (CRUD)", "Appointment scheduling", "Electronic medical records", "Prescription management", "Billing and insurance", "Doctor dashboards", "Secure messaging", "Reporting and analytics"],
        architecture: "React with Redux, Node.js REST API, MongoDB with encryption, JWT/OAuth2, HL7 integration support.",
        extensions: ["Telemedicine", "IoT integration", "ML diagnostics"]
      },
      {
        title: "E-Commerce Marketplace",
        description: "A full-featured multi-vendor marketplace with advanced search, payments, and seller dashboards.",
        features: ["Multi-vendor support", "Advanced product search", "Shopping cart and checkout", "Payment gateway integration", "Order management", "Vendor dashboards", "Review and rating system", "Inventory management"],
        architecture: "React SSR with Next.js, Node.js GraphQL API, MongoDB, Redis for sessions, Stripe integration.",
        extensions: ["AI recommendations", "Dynamic pricing", "Chatbots"]
      }
    ]
  },
  MEAN: {
    Beginner: [
      {
        title: "Contact Manager App",
        description: "A contact management application to store and organize personal and professional contacts.",
        features: ["Add, edit, delete contacts", "Search and filter contacts", "Contact groups and tags", "Import/export contacts", "Favorite contacts"],
        architecture: "Angular frontend, Node.js/Express backend, MongoDB database, RESTful API design.",
        extensions: ["Profile photos", "Birthday reminders", "VCard support"]
      },
      {
        title: "Recipe Sharing Platform",
        description: "A community platform for sharing and discovering recipes with step-by-step instructions.",
        features: ["Browse recipes by category", "Submit new recipes", "Recipe ratings and reviews", "Favorites collection", "Ingredient search"],
        architecture: "Angular SPA, Node.js backend, MongoDB, Angular Material UI components.",
        extensions: ["Meal planning", "Shopping list generator", "Nutritional info"]
      },
      {
        title: "Book Library System",
        description: "A digital library to manage personal book collections and track reading progress.",
        features: ["Book catalog management", "Reading status tracking", "Reading lists and shelves", "Notes and highlights", "Book recommendations"],
        architecture: "Angular with RxJS, Node.js API, MongoDB with flexible schema.",
        extensions: ["Google Books API", "Reading statistics", "Social features"]
      }
    ],
    Intermediate: [
      {
        title: "Social Media Analytics Dashboard",
        description: "A comprehensive analytics tool for tracking and analyzing social media performance across platforms.",
        features: ["Multi-platform integration", "Engagement metrics tracking", "Content performance analytics", "Audience demographics", "Scheduled posting", "Report generation"],
        architecture: "Angular with NgRx state management, Node.js backend, MongoDB aggregation pipelines, Chart.js visualizations.",
        extensions: ["AI content suggestions", "Competitor analysis", "Influencer tracking"]
      },
      {
        title: "Online Exam System",
        description: "A secure online examination platform with timed tests, automated grading, and anti-cheating measures.",
        features: ["Test creation and management", "Timed quiz sessions", "Multiple question types", "Automated grading", "Result analytics", "Certificate generation"],
        architecture: "Angular frontend, Node.js/Express, MongoDB, JWT authentication, WebSocket for real-time proctoring hints.",
        extensions: ["Video proctoring", "Question bank AI", "Peer review system"]
      },
      {
        title: "Fleet Management System",
        description: "A comprehensive solution for managing vehicle fleets with GPS tracking and maintenance scheduling.",
        features: ["Real-time GPS tracking", "Route optimization", "Maintenance scheduling", "Driver management", "Fuel consumption tracking", "Alert and notifications"],
        architecture: "Angular with Leaflet maps, Node.js backend, MongoDB with GeoJSON, WebSocket for live tracking.",
        extensions: ["IoT sensors integration", "Predictive maintenance", "Mobile app"]
      }
    ],
    Advanced: [
      {
        title: "Enterprise Resource Planning System",
        description: "A full-featured ERP solution for managing business operations including inventory, HR, and finance.",
        features: ["Inventory management", "Human resources module", "Financial accounting", "Supply chain management", "CRM integration", "Business intelligence", "Multi-branch support", "Audit logging"],
        architecture: "Angular Enterprise, Node.js microservices, MongoDB, Redis, Elasticsearch, Docker deployment.",
        extensions: ["AI forecasting", "Mobile companion app", "Blockchain verification"]
      },
      {
        title: "Real Estate Marketplace",
        description: "A sophisticated property listing platform with virtual tours, mortgage calculators, and agent portals.",
        features: ["Property listings with images", "Virtual 360 tours", "Advanced search filters", "Mortgage calculator", "Agent dashboards", "Lead management", "Appointment scheduling", "Document management"],
        architecture: "Angular Universal SSR, Node.js GraphQL, MongoDB, Three.js for virtual tours, Stripe for payments.",
        extensions: ["AI property valuation", "AR furniture placement", "Market predictions"]
      },
      {
        title: "Learning Management System",
        description: "A comprehensive educational platform with courses, assessments, progress tracking, and certifications.",
        features: ["Course management", "Video streaming", "Interactive quizzes", "Progress tracking", "Certificate generation", "Discussion forums", "Admin analytics", "Mobile responsive"],
        architecture: "Angular with Angular Material, Node.js API, MongoDB, Cloud storage for media, WebSocket for notifications.",
        extensions: ["Live classes", "AI tutoring", "Peer learning"]
      }
    ]
  },
  Python: {
    Beginner: [
      {
        title: "URL Shortener Service",
        description: "A URL shortening service that creates compact links for sharing and tracks click analytics.",
        features: ["Shorten long URLs", "Custom short codes", "Click analytics", "QR code generation", "Link expiration"],
        architecture: "Flask/Django backend, MongoDB/SQLite database, Redis for caching, RESTful API.",
        extensions: ["User accounts", "Password protection", "Bulk shortening"]
      },
      {
        title: "File Organizer Tool",
        description: "An intelligent file organization tool that automatically sorts files based on type, date, or custom rules.",
        features: ["Automatic file sorting", "Custom organization rules", "File type detection", "Scheduled cleanup", "Undo functionality"],
        architecture: "Python CLI/GUI with Tkinter or PyQt, SQLite for rules, watchdog for monitoring.",
        extensions: ["Cloud sync", "Duplicate detection", "Encryption"]
      },
      {
        title: "Personal Diary App",
        description: "A secure digital diary for recording daily thoughts, mood tracking, and photo attachments.",
        features: ["Create diary entries", "Mood tracking", "Photo attachments", "Search functionality", "Password protection"],
        architecture: "Django web app, PostgreSQL/MySQL database, Django authentication, File storage.",
        extensions: ["Mood analytics", "Export to PDF", "Tags and categories"]
      }
    ],
    Intermediate: [
      {
        title: "Automated Testing Framework",
        description: "A comprehensive test automation framework for web applications with recording and playback capabilities.",
        features: ["Record and playback", "Cross-browser testing", "Test scheduling", "Detailed reports", "CI/CD integration", "Screenshot on failure"],
        architecture: "Python with Selenium/Playwright, pytest for test runner, Allure for reports, Docker for parallel execution.",
        extensions: ["AI test generation", "Visual regression testing", "Performance testing"]
      },
      {
        title: "Data Visualization Dashboard",
        description: "An interactive dashboard for visualizing complex datasets with charts, maps, and real-time updates.",
        features: ["Multiple chart types", "Real-time data streaming", "Interactive filters", "Data export options", "Customizable layouts", "User authentication"],
        architecture: "Django/Flask backend, React/Vue frontend, PostgreSQL, Plotly/D3.js for visualizations.",
        extensions: ["Machine learning insights", "Predictive charts", "API access"]
      },
      {
        title: "REST API Generator",
        description: "A code generation tool that automatically creates REST APIs from database schemas or specifications.",
        features: ["Database schema to API", "CRUD endpoints generation", "Authentication setup", "Documentation generation", "Postman collection export", "Validation rules"],
        architecture: "Flask with OpenAPI/Swagger, SQLAlchemy ORM, automatic route generation, Jinja2 templates.",
        extensions: ["GraphQL support", "Microservice generation", "Deployment scripts"]
      }
    ],
    Advanced: [
      {
        title: "Machine Learning Platform",
        description: "A comprehensive ML platform for training, deploying, and managing machine learning models at scale.",
        features: ["Model training pipeline", "Hyperparameter tuning", "Model versioning", "API deployment", "A/B testing", "Performance monitoring", "Feature engineering", "Collaboration tools"],
        architecture: "Django REST Framework, Celery for async tasks, PostgreSQL, MLflow for ML lifecycle, Docker/Kubernetes.",
        extensions: ["AutoML", "Federated learning", "Edge deployment"]
      },
      {
        title: "Cybersecurity Scanner",
        description: "An advanced security scanning tool for identifying vulnerabilities in web applications and networks.",
        features: ["Vulnerability scanning", "Port scanning", "SSL analysis", "OWASP Top 10 checks", "Detailed reports", "Remediation suggestions", "Scheduled scans", "Compliance checking"],
        architecture: "Python with Scapy/Nmap integration, Django admin panel, MongoDB for results, Celery for scanning.",
        extensions: ["AI threat detection", "Real-time monitoring", "Integration with SIEM"]
      },
      {
        title: "Quantitative Trading System",
        description: "A sophisticated algorithmic trading platform for executing strategies across multiple exchanges.",
        features: ["Multiple exchange support", "Strategy backtesting", "Real-time execution", "Risk management", "Portfolio optimization", "Technical indicators", "Paper trading", "Performance analytics"],
        architecture: "FastAPI for low latency, PostgreSQL for historical data, Redis for caching, Pandas/NumPy for analysis.",
        extensions: ["Machine learning strategies", "Social sentiment analysis", "Options trading"]
      }
    ]
  },
  Java: {
    Beginner: [
      {
        title: "Employee Management System",
        description: "A simple HR application for managing employee records, attendance, and leave requests.",
        features: ["Employee CRUD operations", "Attendance tracking", "Leave management", "Department organization", "Search and filter"],
        architecture: "Spring Boot REST API, React/Vue frontend, MySQL/PostgreSQL database, JPA/Hibernate.",
        extensions: ["Payroll calculation", "Performance reviews", "Reports generation"]
      },
      {
        title: "Hotel Booking System",
        description: "A hotel reservation system for managing rooms, bookings, and guest information.",
        features: ["Room availability check", "Booking management", "Guest profiles", "Payment processing", "Cancellation handling"],
        architecture: "Spring Boot backend, Thymeleaf/React frontend, MySQL database, Spring Security.",
        extensions: ["Room service orders", "Review system", "Loyalty program"]
      },
      {
        title: "Library Management System",
        description: "A digital library system for managing books, members, and borrowing transactions.",
        features: ["Book catalog management", "Member registration", "Borrow/return tracking", "Late fee calculation", "Reservation system"],
        architecture: "Spring MVC with Thymeleaf, Spring Data JPA, MySQL, Spring Security.",
        extensions: ["Barcode scanning", "Email notifications", "Digital lending"]
      }
    ],
    Intermediate: [
      {
        title: "Banking Application",
        description: "A comprehensive online banking system with account management, transactions, and transfers.",
        features: ["Account management", "Fund transfers", "Transaction history", "Bill payments", "Loan applications", "Mini statements"],
        architecture: "Spring Boot microservices, React frontend, PostgreSQL, Spring Security with OAuth2, Kafka for messaging.",
        extensions: ["Investment tracking", "Budget tools", "Chatbot support"]
      },
      {
        title: "Inventory Management System",
        description: "A robust inventory control system for tracking stock, orders, and suppliers.",
        features: ["Stock tracking", "Purchase orders", "Supplier management", "Low stock alerts", "Barcode scanning", "Reports and analytics"],
        architecture: "Spring Boot API, Angular frontend, MySQL, JasperReports for reporting.",
        extensions: ["POS integration", "Multi-warehouse", "Demand forecasting"]
      },
      {
        title: "Restaurant POS System",
        description: "A point-of-sale system for restaurants with table management, orders, and kitchen display.",
        features: ["Table management", "Order taking", "Kitchen display system", "Payment processing", "Inventory tracking", "Daily reports"],
        architecture: "Spring Boot backend, React Native mobile app, MySQL, WebSocket for real-time kitchen updates.",
        extensions: ["Delivery integration", "Customer loyalty", "Menu customization"]
      }
    ],
    Advanced: [
      {
        title: "Hospital Information System",
        description: "A comprehensive healthcare management system for hospitals with patient records, billing, and more.",
        features: ["Patient records (EMR)", "Appointment scheduling", "Doctor management", "Pharmacy system", "Laboratory integration", "Billing and insurance", "Operation theater management", "Emergency services"],
        architecture: "Spring Boot microservices, React frontend, PostgreSQL, HL7 FHIR integration, Docker.",
        extensions: ["Telemedicine", "IoT device integration", "AI diagnostics"]
      },
      {
        title: "Supply Chain Management System",
        description: "An enterprise supply chain solution for tracking products from manufacturing to delivery.",
        features: ["Warehouse management", "Order fulfillment", "Route optimization", "Supplier portal", "Quality control", "Traceability", "Analytics dashboard", "Mobile scanning"],
        architecture: "Spring Cloud microservices, Angular frontend, MongoDB, Kafka for event streaming, Kubernetes.",
        extensions: ["IoT tracking", "Predictive analytics", "Blockchain tracking"]
      },
      {
        title: "Learning Management System",
        description: "A comprehensive educational platform with courses, assessments, and certification management.",
        features: ["Course management", "Video streaming", "Assessment engine", "Progress tracking", "Certification system", "Discussion forums", "Instructor tools", "Analytics"],
        architecture: "Spring Boot with Spring Cloud, Angular, PostgreSQL, Redis caching, FFmpeg for video processing.",
        extensions: ["Live classes", "AI tutoring", "VR labs"]
      }
    ]
  },
  'AI/ML': {
    Beginner: [
      {
        title: "Image Classifier",
        description: "A web application that classifies images using pre-trained machine learning models.",
        features: ["Image upload", "Pre-trained model integration", "Classification results", "Confidence scores", "History of classifications"],
        architecture: "Flask/FastAPI backend, React frontend, TensorFlow/PyTorch models, MongoDB for history.",
        extensions: ["Custom model training", "Multiple model support", "Batch processing"]
      },
      {
        title: "Sentiment Analyzer",
        description: "A tool that analyzes text sentiment and provides insights into emotional tone.",
        features: ["Text input", "Sentiment detection", "Emotion classification", "Visualization charts", "Analysis history"],
        architecture: "Python backend with NLTK/Transformers, React frontend, PostgreSQL for storage.",
        extensions: ["Social media integration", "Multi-language support", "Real-time analysis"]
      },
      {
        title: "Chatbot Interface",
        description: "An AI-powered chatbot interface for answering questions and providing assistance.",
        features: ["Natural language queries", "Context awareness", "Quick responses", "Conversation history", "Custom knowledge base"],
        architecture: "Django/FastAPI, React frontend, Rasa/SpaCy for NLP, PostgreSQL for conversations.",
        extensions: ["Voice support", "Multi-language", "Integration APIs"]
      }
    ],
    Intermediate: [
      {
        title: "Recommendation Engine",
        description: "A sophisticated recommendation system for suggesting products, content, or connections.",
        features: ["User behavior tracking", "Collaborative filtering", "Content-based recommendations", "Real-time suggestions", "A/B testing support"],
        architecture: "Python with Scikit-learn, FastAPI, MongoDB for user data, Redis for caching recommendations.",
        extensions: ["Deep learning models", "Cross-platform sync", "Explainable AI"]
      },
      {
        title: "Object Detection System",
        description: "A real-time object detection system for identifying and tracking objects in images and video.",
        features: ["Image/video input", "Multi-object detection", "Bounding box visualization", "Object tracking", "Export detection results"],
        architecture: "Flask backend with OpenCV/YOLO, React frontend, PostgreSQL for storing detections.",
        extensions: ["Custom training", "Edge deployment", "Surveillance integration"]
      },
      {
        title: "Fraud Detection System",
        description: "An AI-powered system for detecting fraudulent transactions in real-time.",
        features: ["Transaction monitoring", "Anomaly detection", "Risk scoring", "Alert system", "Case management", "Report generation"],
        architecture: "Spring Boot/Python, React dashboard, PostgreSQL, MLflow for model management.",
        extensions: ["Real-time streaming", "Network analysis", "AutoML"]
      }
    ],
    Advanced: [
      {
        title: "Autonomous Vehicle Simulation",
        description: "A comprehensive simulation environment for testing autonomous vehicle algorithms.",
        features: ["Realistic physics simulation", "Sensor simulation", "Scenario testing", "Performance metrics", "Map generation", "Collision detection"],
        architecture: "Python with CARLA/airsim, FastAPI for control, MongoDB for scenarios, Unity/UE for visualization.",
        extensions: ["RL training", "V2X simulation", "Digital twins"]
      },
      {
        title: "Medical Diagnosis Assistant",
        description: "An AI-powered system to assist doctors in diagnosing diseases from medical data.",
        features: ["Symptom analysis", "Disease prediction", "Treatment recommendations", "Medical imaging analysis", "Confidence scoring", "Doctor verification"],
        architecture: "Django/Python FastAPI, React frontend, PostgreSQL for patient data, PyTorch for models.",
        extensions: ["Federated learning", "Drug interaction", "Genomic analysis"]
      },
      {
        title: "Natural Language Processing Platform",
        description: "A comprehensive NLP platform for text analysis, translation, and language processing tasks.",
        features: ["Text classification", "Named entity recognition", "Machine translation", "Text summarization", "Question answering", "Custom model training"],
        architecture: "FastAPI with Transformers, React frontend, PostgreSQL, Celery for async tasks.",
        extensions: ["Voice-to-text", "Multi-modal AI", "Custom fine-tuning"]
      }
    ]
  },
  'Mobile App': {
    Beginner: [
      {
        title: "Habit Tracker App",
        description: "A mobile app for tracking daily habits and building positive routines.",
        features: ["Daily habit logging", "Streak tracking", "Reminders", "Progress visualization", "Categories"],
        architecture: "React Native/Flutter, Firebase for backend, Redux for state management.",
        extensions: ["Social features", "Gamification", "Widgets"]
      },
      {
        title: "Flashcard App",
        description: "A study tool for creating and reviewing flashcards with spaced repetition.",
        features: ["Create flashcard decks", "Spaced repetition algorithm", "Progress tracking", "Import/export decks", "Study modes"],
        architecture: "React Native with AsyncStorage, SQLite for local storage.",
        extensions: ["Cloud sync", "AI suggestions", "Multi-language"]
      },
      {
        title: "Expense Tracker",
        description: "A simple mobile app for tracking daily expenses and income.",
        features: ["Add transactions", "Category organization", "Monthly summaries", "Visual charts", "Budget setup"],
        architecture: "Flutter with Provider, SQLite local database, shared preferences.",
        extensions: ["Camera receipt scanning", "Multi-currency", "Cloud backup"]
      }
    ],
    Intermediate: [
      {
        title: "Food Delivery App",
        description: "A complete food ordering and delivery application with restaurant listings.",
        features: ["Restaurant browsing", "Menu viewing", "Cart management", "Order tracking", "Payment integration", "Reviews and ratings"],
        architecture: "React Native/Flutter, Node.js backend, MongoDB, Stripe integration.",
        extensions: ["Live tracking", "Driver app", "Restaurant dashboard"]
      },
      {
        title: "Fitness Tracking App",
        description: "A comprehensive fitness app for workouts, nutrition, and health tracking.",
        features: ["Workout logging", "Exercise library", "Nutrition tracking", "Progress photos", "Goals setting", "Social sharing"],
        architecture: "React Native with Redux, Firebase, health API integrations.",
        extensions: ["Wearable integration", "AI coaching", "Challenges"]
      },
      {
        title: "Social Event Planner",
        description: "An app for organizing events, inviting friends, and managing RSVPs.",
        features: ["Create events", "Guest management", "RSVP tracking", "Location integration", "Event reminders", "Photo sharing"],
        architecture: "Flutter with BLoC, Firebase Auth and Firestore, maps integration.",
        extensions: ["Chat feature", "Event recommendations", "Calendar sync"]
      }
    ],
    Advanced: [
      {
        title: "Super App Platform",
        description: "A comprehensive super app combining multiple services in one platform.",
        features: ["Super app shell", "Mini app framework", "Wallet and payments", "Messaging", "Services marketplace", "Super admin panel", "Analytics dashboard"],
        architecture: "React Native with Monorepo, Node.js microservices, MongoDB, Redis, Kubernetes.",
        extensions: ["AI assistant", "IoT integration", "Internationalization"]
      },
      {
        title: "Telehealth Platform",
        description: "A comprehensive telehealth solution with video consultations and health tracking.",
        features: ["Video consultations", "Appointment booking", "Prescription management", "Health metrics", "Doctor chat", "Emergency SOS", "Medical records"],
        architecture: "Flutter/React Native, WebRTC for video, Node.js backend, MongoDB, Twilio integration.",
        extensions: ["AI triage", "Remote monitoring", "Pharmacy integration"]
      },
      {
        title: "On-Demand Service Platform",
        description: "A multi-service platform for booking professionals like plumbers, electricians, cleaners.",
        features: ["Service categories", "Real-time booking", "Provider matching", "In-app payments", "Live tracking", "Review system", "Admin dashboard"],
        architecture: "React Native, Node.js microservices, MongoDB, WebSocket for real-time updates.",
        extensions: ["Subscription plans", "AI pricing", "Multi-city expansion"]
      }
    ]
  }
};

// Get random item from array
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Generate unique ID
const generateId = () => Math.random().toString(36).substring(2, 15);

// Function to generate idea using OpenAI
const generateIdeaWithAI = async (techStack, difficulty) => {
  if (!openai) {
    throw new Error('OpenAI API not configured');
  }

  const prompt = `Generate a creative software project idea for a ${difficulty} level project using ${techStack} technology stack.

Return a JSON object with exactly this structure (no additional text):
{
  "title": "Project Title",
  "description": "A brief description of what the project does (1-2 sentences)",
  "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
  "architecture": "Brief description of the recommended architecture (1-2 sentences)",
  "extensions": ["Possible extension 1", "Possible extension 2", "Possible extension 3"]
}

Requirements:
- The project should be realistic and achievable at ${difficulty} level
- Use ${techStack} as the primary technology
- Make it creative and practical
- Features should be specific and actionable
- Architecture should mention the key technologies involved
- Extensions should be meaningful features that could be added later

JSON:`;

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are a software architecture expert who generates creative and practical project ideas. Always respond with valid JSON only.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    temperature: 0.8,
    max_tokens: 800
  });

  const content = response.choices[0].message.content;
  
  // Parse the JSON response
  const parsedIdea = JSON.parse(content);
  
  return {
    title: parsedIdea.title,
    description: parsedIdea.description,
    features: parsedIdea.features,
    architecture: parsedIdea.architecture,
    extensions: parsedIdea.extensions
  };
};

// @desc    Generate a new project idea
// @route   POST /api/ideas/generate
// @access  Public
const generateIdea = async (req, res) => {
  try {
    const { techStack, difficulty } = req.body;

    // Validate input
    if (!techStack || !difficulty) {
      return res.status(400).json({ 
        message: 'Please provide both techStack and difficulty' 
      });
    }

    // Validate tech stack
    if (!ideaTemplates[techStack]) {
      return res.status(400).json({ 
        message: `Invalid tech stack: ${techStack}. Choose from: MERN, MEAN, Python, Java, AI/ML, Mobile App` 
      });
    }

    // Validate difficulty
    const templates = ideaTemplates[techStack];
    if (!templates[difficulty]) {
      return res.status(400).json({ 
        message: `Invalid difficulty: ${difficulty}. Choose from: Beginner, Intermediate, Advanced` 
      });
    }

    let idea;
    let isAIGenerated = false;

    // Try to generate with OpenAI first
    if (openai) {
      try {
        idea = await generateIdeaWithAI(techStack, difficulty);
        isAIGenerated = true;
        console.log(`AI-generated idea for ${techStack} - ${difficulty}`);
      } catch (aiError) {
        console.error('OpenAI generation failed, using template fallback:', aiError.message);
        // Fall back to templates
        idea = getRandomItem(templates[difficulty]);
      }
    } else {
      // No OpenAI configured, use templates
      console.log('OpenAI not configured, using template fallback');
      idea = getRandomItem(templates[difficulty]);
    }

    // If using template, add variation
    if (!isAIGenerated) {
      const variations = [
        "Enhanced with modern features",
        "With cloud integration",
        "With modern UI/UX design",
        "With analytics dashboard",
        "With mobile companion app"
      ];
      const selectedVariation = getRandomItem(variations);
      
      // Return the generated idea with metadata
      res.status(200).json({
        id: generateId(),
        title: idea.title,
        description: idea.description,
        features: idea.features,
        architecture: idea.architecture,
        extensions: idea.extensions.map(ext => `${ext} (${selectedVariation})`),
        techStack,
        difficulty,
        generatedAt: new Date().toISOString(),
        isAIGenerated
      });
    } else {
      // Return AI-generated idea with metadata
      res.status(200).json({
        id: generateId(),
        title: idea.title,
        description: idea.description,
        features: idea.features,
        architecture: idea.architecture,
        extensions: idea.extensions,
        techStack,
        difficulty,
        generatedAt: new Date().toISOString(),
        isAIGenerated
      });
    }
  } catch (error) {
    console.error('Error generating idea:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Save an idea to database
// @route   POST /api/ideas/save
// @access  Public
const saveIdea = async (req, res) => {
  try {
    const { title, description, features, architecture, techStack, difficulty, extensions } = req.body;

    console.log('=== SAVE IDEA REQUEST ===');
    console.log('Received data:', { title, techStack, difficulty, hasFeatures: !!features });

    // Validate required fields
    if (!title || !description || !architecture || !techStack || !difficulty) {
      console.log('Validation failed: missing required fields');
      return res.status(400).json({ 
        message: 'Please provide all required fields' 
      });
    }

    const idea = new Idea({
      title,
      description,
      features: features || [],
      architecture,
      techStack,
      difficulty,
      extensions: extensions || []
    });

    const savedIdea = await idea.save();
    console.log('Idea saved successfully to MongoDB with ID:', savedIdea._id);
    
    res.status(201).json(savedIdea);
  } catch (error) {
    console.error('Error saving idea:', error.message);
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

// @desc    Get all saved ideas
// @route   GET /api/ideas
// @access  Public
const getIdeas = async (req, res) => {
  try {
    console.log('=== GET IDEAS REQUEST ===');
    
    const { search } = req.query;
    
    let query = {};
    
    // Add search functionality
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { techStack: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const ideas = await Idea.find(query).sort({ createdAt: -1 });
    console.log(`Found ${ideas.length} ideas in MongoDB`);
    
    res.status(200).json(ideas);
  } catch (error) {
    console.error('Error fetching ideas:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete an idea
// @route   DELETE /api/ideas/:id
// @access  Public
const deleteIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }

    await idea.deleteOne();
    
    res.status(200).json({ message: 'Idea deleted successfully' });
  } catch (error) {
    console.error('Error deleting idea:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  generateIdea,
  saveIdea,
  getIdeas,
  deleteIdea
};

