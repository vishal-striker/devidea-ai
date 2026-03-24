const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected to devidea");
    console.log(`Connected DB: ${mongoose.connection.name}`);
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    } else {
      console.warn('Development: Running without MongoDB. Some features limited.');
    }
  }
};

module.exports = connectDB;

