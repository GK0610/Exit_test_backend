const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
require('./connection/mongodb'); // Assuming mongodb.js is in the connections folder

// Import your routes here
const todoRoutes = require('./Routes/todoRoutes');
app.use('/api/todos', todoRoutes);

// Define the port
const PORT = process.env.PORT || 5000;

// Define the connectDB function
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

// Call the connectDB function and start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  });
});
