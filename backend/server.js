const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const pageAnalytics = require('./routes/pageAnalytics');
const formAnalytics = require('./routes/formAnalytics');
const ipAnalytics = require('./routes/ipAnalytics');
const totalUsers = require('./routes/totalUsers');

//const uri = process.env.MONGODB_URI;

// Create the Express app
const app = express();

// Set up middleware
app.use(cors({   
  origin: ["https://analytics-project-frontend.vercel.app/"],
  methods: ["POST", "GET"],
  credentials: true
}));
//app.use(cors({ origin: '*' }));
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
mongoose.connect('mongodb+srv://leozadda:mR74LoVOBifNitlj@useranalytics.pid8es0.mongodb.net/?retryWrites=true&w=majority&appName=UserAnalytics')
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server after successful MongoDB connection
    app.listen(port, () => {
      console.log(`Server running`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Set up routes
app.use('/', formAnalytics);
app.use('/', ipAnalytics);
app.use('/', pageAnalytics);
app.use('/', totalUsers);

// Add a root route handler
app.get('/', (req, res) => {
  res.send('Welcome to the Analytics API');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// For Vercel serverless functions
module.exports = app;