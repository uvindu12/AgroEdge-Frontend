const express = require('express');
const cors = require('cors');
const { sequelize, testConnection } = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const kpiRoutes = require('./routes/kpiRoutes');

// Load environment variables
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection
testConnection(); 

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/kpi', kpiRoutes);


// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Farmer Crop Management System API' });
});

// Sync database and start server
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to sync database:', err);
});