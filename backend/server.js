const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const pageAnalytics = require('./routes/pageAnalytics');
const formAnalytics = require('./routes/formAnalytics');
const ipAnalytics = require('./routes/ipAnalytics');
const totalUsers = require('./routes/totalUsers');

// Create the Express app
const app = express();

// Set up middleware
app.use(cors()); // This allows all origins
console.log('CORS middleware set up to allow all origins');

app.use(express.json()); // Parse JSON request bodies
console.log('JSON parsing middleware set up');

// Connect to MongoDB
const mongoURI = 'mongodb+srv://leezadda:ISEFBSsv2flNfGw6@analytics-cluster.kufwm7j.mongodb.net/?retryWrites=true&w=majority&appName=analytics-cluster';
console.log('Attempting to connect to MongoDB...');

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} request to ${req.url}`);
  next();
});

// Set up routes with unique paths
app.use('/', formAnalytics);
app.use('/', ipAnalytics);
app.use('/', pageAnalytics);
app.use('/', totalUsers);
console.log('Routes set up');

// Add a root route handler
app.get('/', (req, res) => {
  console.log('Root route accessed');
  res.send('Welcome to the Analytics API');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error occurred:', err);
  res.status(500).send('Something broke!');
});

// For Vercel serverless functions
module.exports = app;

console.log('Server setup complete');
