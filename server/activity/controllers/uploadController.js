const { validationResult } = require('express-validator');
const Session = require('../models/Session');
const FertilizerUpload = require('../models/FertilizerUpload');
const PesticideUpload = require('../models/PesticideUpload');
const IrrigationUpload = require('../models/IrrigationUpload');
const LaborUpload = require('../models/LaborUpload');
const calculationService = require('../services/calculationService');
const logger = require('../loggingOperations/logger');


// Check if session exists and is active
const checkSession = async (sessionId, userId) => {
  const session = await Session.findOne({
    where: {
      id: sessionId,
      user_id: userId,
      is_active: true
    }
  });
  
  return session;
};

// Add fertilizer upload
exports.addFertilizerUpload = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { 
      session_id, fertilizer_type, application_method,
      quantity,   cost 
    } = req.body;

    // Check if session exists and is active
    const session = await checkSession(session_id, req.userId);
    if (!session) {
      logger.warn(`Unauthorized access to session: ${session_id} by user ${req.userId}`);
      return res.status(404).json({ 
        message: 'Active session not found or you do not have permission' 
      });
    }

    // Create fertilizer upload
    const upload = await FertilizerUpload.create({
      session_id,
      fertilizer_type,
      application_method,
      quantity,
      cost,
      application_date: req.body.application_date || new Date()
    });

    logger.info(`Fertilizer upload added for session: ${session_id} by user ${req.userId}`);
    res.status(201).json({
      message: 'Fertilizer application recorded successfully',
      upload
    });
    
  } catch (error) {
    logger.error(`Error adding fertilizer upload: ${error.message}`);
    console.error('Add fertilizer upload error:', error);
    res.status(500).json({ message: 'Server error recording fertilizer application' });
  }
};

// Add pesticide upload
exports.addPesticideUpload = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { 
      session_id, pesticide_type,  
      quantity,  cost 
    } = req.body;

    // Check if session exists and is active
    const session = await checkSession(session_id, req.userId);
    if (!session) {
      logger.warn(`Unauthorized access to session: ${session_id} by user ${req.userId}`);
      return res.status(404).json({ 
        message: 'Active session not found or you do not have permission' 
      });
    }

    // Create pesticide upload
    const upload = await PesticideUpload.create({
      session_id,
      pesticide_type,
      quantity,
      cost,
      application_date: req.body.application_date || new Date()
    });

    logger.info(`Pesticide upload added for session: ${session_id} by user ${req.userId}`);
    res.status(201).json({
      message: 'Pesticide application recorded successfully',
      upload
    });
    
  } catch (error) {
    console.error('Add pesticide upload error:', error);
    logger.error(`Error adding Pesticide upload: ${error.message}`);
    res.status(500).json({ message: 'Server error recording pesticide application' });
  }
};

// Add irrigation upload
exports.addIrrigationUpload = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { 
      session_id, water_source, irrigation_method, 
      water_usage,  cost 
    } = req.body;

    // Check if session exists and is active
    const session = await checkSession(session_id, req.userId);
    if (!session) {
      logger.warn(`Unauthorized access to session: ${session_id} by user ${req.userId}`);
      return res.status(404).json({ 
        message: 'Active session not found or you do not have permission' 
      });
    }

    // Create irrigation upload
    const upload = await IrrigationUpload.create({
      session_id,
      water_source,
      irrigation_method,
      water_usage,
      cost,
      irrigation_date: req.body.irrigation_date || new Date()
    });

    logger.info(`Irrigation upload added for session: ${session_id} by user ${req.userId}`);
    res.status(201).json({
      message: 'Irrigation activity recorded successfully',
      upload
    });
    
  } catch (error) {
    console.error('Add Irrigation upload error:', error);
    logger.error(`Error adding Irrigation upload: ${error.message}`);
    res.status(500).json({ message: 'Server error recording irrigation activity' });
  }
};

// Add labor upload
exports.addLaborUpload = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { 
      session_id, labor_hours, wages_per_day
    } = req.body;

    // Check if session exists and is active
    const session = await checkSession(session_id, req.userId);
    if (!session) {
      logger.warn(`Unauthorized access to session: ${session_id} by user ${req.userId}`);
      return res.status(404).json({ 
        message: 'Active session not found or you do not have permission' 
      });
    }

    // Create labor upload
    const upload = await LaborUpload.create({
      session_id,
      labor_hours,
      wages_per_day,
      labor_date: req.body.labor_date || new Date()
    });

    logger.info(`Labor upload added for session: ${session_id} by user ${req.userId}`);
    res.status(201).json({
      message: 'Labor activity recorded successfully',
      upload
    });
    
  } catch (error) {
    console.error('Add labor upload error:', error);
    logger.error(`Error adding labor upload: ${error.message}`);
    res.status(500).json({ message: 'Server error recording labor activity' });
  }
};

// Get all uploads for a session with summary calculations
exports.getSessionUploads = async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    // Check if user has access to this session
    const session = await Session.findOne({
      where: {
        id: sessionId,
        user_id: req.userId
      }
    });
    
    if (!session) {
      return res.status(404).json({ 
        message: 'Session not found or you do not have permission' 
      });
    }
    
    // Fetch all uploads for the session
    const fertilizers = await FertilizerUpload.findAll({
      where: { session_id: sessionId },
      order: [['application_date', 'DESC']]
    });
    
    const pesticides = await PesticideUpload.findAll({
      where: { session_id: sessionId },
      order: [['application_date', 'DESC']]
    });
    
    const irrigations = await IrrigationUpload.findAll({
      where: { session_id: sessionId },
      order: [['irrigation_date', 'DESC']]
    });
    
    const labors = await LaborUpload.findAll({
      where: { session_id: sessionId },
      order: [['labor_date', 'DESC']]
    });
    
    // Calculate summary using the calculation service
    const sessionSummary = calculationService.calculateSessionSummary(
      fertilizers, pesticides, irrigations, labors
    );
    
    res.status(200).json({
      session,
      uploads: {
        fertilizers,
        pesticides,
        irrigations,
        labors
      },
      summary: sessionSummary
    });
    
  } catch (error) {
    console.error('Get session uploads error:', error);
    logger.error(`Error getting session uploads: ${error.message}`);
    res.status(500).json({ message: 'Server error retrieving session uploads' });
  }
};

// Get session summary only (for dashboard or reports)
exports.getSessionSummary = async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    // Check if user has access to this session
    const session = await Session.findOne({
      where: {
        id: sessionId,
        user_id: req.userId
      }
    });
    
    if (!session) {
      return res.status(404).json({ 
        message: 'Session not found or you do not have permission' 
      });
    }
    
    // Fetch all uploads for the session
    const fertilizers = await FertilizerUpload.findAll({
      where: { session_id: sessionId }
    });
    
    const pesticides = await PesticideUpload.findAll({
      where: { session_id: sessionId }
    });
    
    const irrigations = await IrrigationUpload.findAll({
      where: { session_id: sessionId }
    });
    
    const labors = await LaborUpload.findAll({
      where: { session_id: sessionId }
    });
    
    // Calculate summary using the calculation service
    const sessionSummary = calculationService.calculateSessionSummary(
      fertilizers, pesticides, irrigations, labors
    );
    
    res.status(200).json({
      session,
      summary: sessionSummary
    });
    
  } catch (error) {
    console.error('Get session summary error:', error);
    logger.error(`Error getting session summary: ${error.message}`);
    res.status(500).json({ message: 'Server error retrieving session summary' });
  }
};