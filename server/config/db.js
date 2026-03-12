const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    console.warn('Warning: Running without MongoDB. Idea saving will not work.');
    // Don't exit - allow server to run for testing without DB
  }
};

module.exports = connectDB;

