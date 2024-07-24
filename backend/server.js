const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const pageAnalytics = require('./routes/pageAnalytics');
const formAnalytics = require('./routes/formAnalytics');
const ipAnalytics = require('./routes/ipAnalytics');
const totalUsers = require('./routes/totalUsers');

const port = process.env.PORT;
const uri = "mongodb+srv://leozadda:mR74LoVOBifNitlj@useranalytics.pid8es0.mongodb.net/?retryWrites=true&w=majority&appName=UserAnalytics";

// Create the Express app
const app = express();

// Set up middleware
app.use(cors({origin: process.env.FRONTEND_URL}));
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
mongoose.connect(uri)
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

// Set up routes
app.use('/', formAnalytics);
app.use('/', ipAnalytics);
app.use('/', pageAnalytics);
app.use('/', totalUsers);