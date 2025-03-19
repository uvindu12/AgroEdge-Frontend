const { validationResult } = require('express-validator');
const Session = require('../models/Session');
const logger = require('../loggingOperations/logger');

// Create a new session
exports.createSession = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { 
      farm_size,   district, crop_type, 
      veg_variety, expected_harvest,  
      seed_source, seed_quantity, seed_cost, soil_type, soil_ph 
    } = req.body;

    // Create new session
    const session = await Session.create({
      user_id: req.userId,
      farm_size,
      
      village,
      district,
      crop_type,
      veg_variety,
      expected_harvest,
      seed_source,
      seed_quantity,
      seed_cost,
      soil_type: soil_type || null,
      soil_ph: soil_ph || null,
      start_date: new Date(),
      is_active: true
    });

    // Log session creation
    logger.info(`User ${req.userId} created a new session with ID: ${session.id}`);

    res.status(201).json({
      message: 'Session created successfully',
      session
    });
    
  } catch (error) {
    console.error('Create session error:', error);
    logger.error(`Error creating session for User ${req.userId}: ${error.message}`);
    res.status(500).json({ message: 'Server error creating session' });
  }
};

// Get all sessions for current user
exports.getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.findAll({
      where: { user_id: req.userId },
      order: [['start_date', 'DESC']]
    });
    
    res.status(200).json({ sessions });
    
  } catch (error) {
    console.error('Get sessions error:', error);
    res.status(500).json({ message: 'Server error retrieving sessions' });
  }
};

// Get active sessions for current user
exports.getActiveSessions = async (req, res) => {
  try {
    const sessions = await Session.findAll({
      where: { 
        user_id: req.userId,
        is_active: true
      },
      order: [['start_date', 'DESC']]
    });
    
    res.status(200).json({ sessions });
    
  } catch (error) {
    console.error('Get active sessions error:', error);
    res.status(500).json({ message: 'Server error retrieving active sessions' });
  }
};

// Get a single session by ID
exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findOne({
      where: { 
        id: req.params.id,
        user_id: req.userId
      }
    });
    
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    
    res.status(200).json({ session });
    
  } catch (error) {
    console.error('Get session error:', error);
    res.status(500).json({ message: 'Server error retrieving session' });
  }
};

// Update soil information (can be updated after starting)
exports.updateSoilInfo = async (req, res) => {
  try {
    const { soil_type, soil_ph } = req.body;
    
    // Find session
    const session = await Session.findOne({
      where: { 
        id: req.params.id,
        user_id: req.userId,
        is_active: true
      }
    });
    
    if (!session) {
      return res.status(404).json({ 
        message: 'Active session not found or you do not have permission to update it' 
      });
    }
    
    // Update soil info
    await session.update({
      soil_type: soil_type !== undefined ? soil_type : session.soil_type,
      soil_ph: soil_ph !== undefined ? soil_ph : session.soil_ph
    });
    
    res.status(200).json({
      message: 'Soil information updated successfully',
      session
    });
    
  } catch (error) {
    console.error('Update soil info error:', error);
    res.status(500).json({ message: 'Server error updating soil information' });
  }
};

// End a session
exports.endSession = async (req, res) => {
  try {
    const { actual_harvest, selling_price, buyer_type, storage_method } = req.body;
    
    // Find session
    const session = await Session.findOne({
      where: { 
        id: req.params.id,
        user_id: req.userId,
        is_active: true
      }
    });
    
    if (!session) {
      return res.status(404).json({ 
        message: 'Active session not found or you do not have permission to end it' 
      });
    }

     // Check if soil data is missing
     if (!session.soil_type || !session.soil_ph) {
      return res.status(400).json({
        message: 'Soil data is required before ending the session. Please update soil information.'
      });
    }
    
    // Calculate total revenue and profit/loss
    const total_revenue = actual_harvest * selling_price;
    const profit_loss = await calculateProfit(session.id, total_revenue);
    
    // Update session to end it
    await session.update({
      actual_harvest,
      
      end_date: new Date(),
      is_active: false
    });

    // Log session ending
    logger.info(`User ${req.userId} ended session ID: ${session.id}, Profit/Loss: ${profit_loss}`);
    
    res.status(200).json({
      message: 'Session ended successfully',
      session
    });
    
  } catch (error) {
    console.error('End session error:', error);
    logger.error(`Error ending session ${req.params.id} for User ${req.userId}: ${error.message}`);
    res.status(500).json({ message: 'Server error ending session' });
  }
};