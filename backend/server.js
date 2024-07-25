const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const pageAnalytics = require('./routes/pageAnalytics');
const formAnalytics = require('./routes/formAnalytics');
const ipAnalytics = require('./routes/ipAnalytics');
const totalUsers = require('./routes/totalUsers');

const port = 5000;

// Create the Express app
const app = express();

// Set up middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
mongoose.connect('mongodb+srv://leezadda:ISEFBSsv2flNfGw6@analytics-cluster.kufwm7j.mongodb.net/?retryWrites=true&w=majority&appName=analytics-cluster')
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server after successful MongoDB connection
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });


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

// Set up routes
app.use('/', formAnalytics);
app.use('/', ipAnalytics);
app.use('/', pageAnalytics);
app.use('/', totalUsers);

// For Vercel serverless functions
module.exports = app;



