const express = require('express');
const { check } = require('express-validator');
const uploadController = require('../controllers/uploadController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// @route   POST api/uploads/fertilizer
// @desc    Add fertilizer application details
// @access  Private
router.post(
  '/fertilizer',
  [
    check('session_id', 'Session ID is required').isInt(),
    check('fertilizer_type', 'Fertilizer type is required').not().isEmpty(),
    check('quantity', 'Quantity is required').isFloat({ min: 0 }),
    check('cost', 'Cost is required').isFloat({ min: 0 })
  ],
  uploadController.addFertilizerUpload
);

// @route   POST api/uploads/pesticide
// @desc    Add pesticide application details
// @access  Private
router.post(
  '/pesticide',
  [
    check('session_id', 'Session ID is required').isInt(),
    check('pesticide_type', 'Pesticide type is required').not().isEmpty(),
    check('quantity', 'Quantity is required').isFloat({ min: 0 }),
    check('cost', 'Cost is required').isFloat({ min: 0 })
  ],
  uploadController.addPesticideUpload
);

// @route   POST api/uploads/irrigation
// @desc    Add irrigation details
// @access  Private
router.post(
  '/irrigation',
  [
    check('session_id', 'Session ID is required').isInt(),
    check('water_source', 'Water source is required').not().isEmpty(),
    check('irrigation_method', 'Irrigation method is required').not().isEmpty(),
    check('water_usage', 'Water usage is required').isFloat({ min: 0 }),
    check('cost', 'Cost is required').isFloat({ min: 0 })
  ],
  uploadController.addIrrigationUpload
);

// @route   POST api/uploads/labor
// @desc    Add labor details
// @access  Private
router.post(
  '/labor',
  [
    check('session_id', 'Session ID is required').isInt(),
    check('labor_hours', 'Labor hours is required').isFloat({ min: 0 }),
    check('wages_per_day', 'Wages per day is required').isFloat({ min: 0 })
  ],
  uploadController.addLaborUpload
);



// @route   GET api/uploads/session/:sessionId
// @desc    Get all uploads for a session
// @access  Private
router.get('/session/:sessionId', uploadController.getSessionUploads);

module.exports = router;