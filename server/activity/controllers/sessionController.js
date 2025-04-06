const { validationResult } = require('express-validator');
const Session = require('../models/Session');
const FertilizerUpload = require('../models/FertilizerUpload');
const PesticideUpload = require('../models/PesticideUpload');
const IrrigationUpload = require('../models/IrrigationUpload');
const LaborUpload = require('../models/LaborUpload');
const calculationService = require('../services/calculationService');
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
    console.log(req.params.id)
    console.log(req.userId)

    const session = await Session.findOne({
      where: { 
        id: Number(req.params.id),
        user_id: req.userId
      }
    });

  console.log(!session)
    
    if (!session) {
      console.log("here")
      return res.status(404).json({ message: 'Session not found' });
    }
    
    console.log("here after")
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

//End a session
exports.endSession = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { actual_harvest } = req.body;

    // Check if session exists and belongs to the user
    const session = await Session.findOne({
      where: {
        id,
        user_id: req.userId,
        is_active: true
      }
    });

    if (!session) {
      return res.status(404).json({
        message: 'Active session not found or you do not have permission'
      });
    }

    // Fetch all uploads for the session
    const fertilizers = await FertilizerUpload.findAll({
      where: { session_id: id }
    });
    
    const pesticides = await PesticideUpload.findAll({
      where: { session_id: id }
    });
    
    const irrigations = await IrrigationUpload.findAll({
      where: { session_id: id }
    });
    
    const labors = await LaborUpload.findAll({
      where: { session_id: id }
    });
    
    // Calculate summary using the calculation service
    const sessionSummary = calculationService.calculateSessionSummary(
      fertilizers, pesticides, irrigations, labors
    );

    // Update session with summary data
    // For irrigation data
    if (irrigations.length > 0) {
      session.water_source = sessionSummary.irrigation.most_common_water_source;
      session.irrigation_method = sessionSummary.irrigation.most_common_irrigation_method;
      session.water_usage = sessionSummary.irrigation.total_water_usage;
      session.irrigation_cost = sessionSummary.irrigation.total_irrigation_cost;
    }

    // For labor data
    if (labors.length > 0) {
      session.labor_hours = sessionSummary.labor.total_labor_hours;
      session.labor_wages = sessionSummary.labor.total_labor_wages;
    }

    // Update session end data
    session.actual_harvest = actual_harvest;
    session.end_date = new Date();
    session.is_active = false;

    // Save the updated session
    await session.save();

    logger.info(`Session ${id} ended by user ${req.userId}`);
    res.status(200).json({
      message: 'Session ended successfully',
      session,
      summary: sessionSummary
    });

  } catch (error) {
    console.error('End session error:', error);
    logger.error(`Error ending session: ${error.message}`);
    res.status(500).json({ message: 'Server error ending session' });
  }
};