const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Error: ${error.message}`);
    console.warn('Warning: Running without MongoDB. Idea saving will not work.');
    // Don't exit - allow server to run for testing without DB
  }
};

module.exports = connectDB;

