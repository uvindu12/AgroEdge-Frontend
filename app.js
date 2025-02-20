const express = require('express');
const bodyParser = require('body-parser');
const farmroute1 = require('./routes/fixed'); //fixed.js
const farmroute2 = require('./routes/non-fixed'); //non-fixed.js

const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// Use farm routes
app.use('/api', farmroute1,farmroute2 );

// Export the app
module.exports = app;