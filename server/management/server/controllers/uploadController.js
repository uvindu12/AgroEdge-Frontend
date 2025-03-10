const { validationResult } = require('express-validator');
const Session = require('../models/Session');
const FertilizerUpload = require('../models/FertilizerUpload');
const PesticideUpload = require('../models/PesticideUpload');
const IrrigationUpload = require('../models/IrrigationUpload');
const LaborUpload = require('../models/LaborUpload');
const MachineryUpload = require('../models/MachineryUpload');
const DiseaseUpload = require('../models/DiseaseUpload');

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
      session_id, fertilizer_type, fertilizer_brand, 
      quantity, npk_ratio, application_method, cost 
    } = req.body;

    // Check if session exists and is active
    const session = await checkSession(session_id, req.userId);
    if (!session) {
      return res.status(404).json({ 
        message: 'Active session not found or you do not have permission' 
      });
    }

    // Create fertilizer upload
    const upload = await FertilizerUpload.create({
      session_id,
      fertilizer_type,
      fertilizer_brand,
      quantity,
      npk_ratio,
      application_method,
      cost,
      application_date: req.body.application_date || new Date()
    });

    res.status(201).json({
      message: 'Fertilizer application recorded successfully',
      upload
    });
    
  } catch (error) {
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
      session_id, pesticide_type, pesticide_name, 
      quantity, application_frequency, application_method, cost 
    } = req.body;

    // Check if session exists and is active
    const session = await checkSession(session_id, req.userId);
    if (!session) {
      return res.status(404).json({ 
        message: 'Active session not found or you do not have permission' 
      });
    }

    // Create pesticide upload
    const upload = await PesticideUpload.create({
      session_id,
      pesticide_type,
      pesticide_name,
      quantity,
      application_frequency,
      application_method,
      cost,
      application_date: req.body.application_date || new Date()
    });

    res.status(201).json({
      message: 'Pesticide application recorded successfully',
      upload
    });
    
  } catch (error) {
    console.error('Add pesticide upload error:', error);
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
      water_usage, irrigation_schedule, cost 
    } = req.body;

    // Check if session exists and is active
    const session = await checkSession(session_id, req.userId);
    if (!session) {
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
      irrigation_schedule,
      cost,
      irrigation_date: req.body.irrigation_date || new Date()
    });

    res.status(201).json({
      message: 'Irrigation activity recorded successfully',
      upload
    });
    
  } catch (error) {
    console.error('Add irrigation upload error:', error);
    res.status(500).json({ message: 'Server error recording irrigation activity' });
  }
};

// Get all uploads for a session
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
    
    const machineries = await MachineryUpload.findAll({
      where: { session_id: sessionId },
      order: [['machinery_date', 'DESC']]
    });
    
    const diseases = await DiseaseUpload.findAll({
      where: { session_id: sessionId },
      order: [['disease_date', 'DESC']]
    });
    
    res.status(200).json({
      session,
      uploads: {
        fertilizers,
        pesticides,
        irrigations,
        labors,
        machineries,
        diseases
      }
    });
    
  } catch (error) {
    console.error('Get session uploads error:', error);
    res.status(500).json({ message: 'Server error retrieving session uploads' });
  }
};