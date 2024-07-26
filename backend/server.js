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

app.use(cors({
  origin: '*', // Allow all origins
  methods: '*', // Allow all HTTP methods
  allowedHeaders: '*' // Allow all headers
}));


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

// Set up routes
app.use('/', formAnalytics);
app.use('/', ipAnalytics);
app.use('/', pageAnalytics);
app.use('/', totalUsers);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error occurred:', err);
  console.log('Response headers:', res.getHeaders());
  res.status(500).send('Something broke!');
});

// For Vercel serverless functions
module.exports = app;