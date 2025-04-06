const express = require('express');
const { check } = require('express-validator');
const sessionController = require('../controllers/sessionController');
const authMiddleware = require('../middleware/auth');
const { validateFarmingMetrics } = require('../middleware/sessionValidation');
const { validateSessionDuration } = require('../middleware/sessionDurationValidator');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// @route   POST api/sessions
// @desc    Create a new farming session
// @access  Private
router.post(
  '/',
  [
    check('farm_size', 'Farm size is required').isFloat({ min: 0 }),
    check('district', 'District is required').not().isEmpty(),
    check('crop_type', 'Crop type is required').not().isEmpty(),
    check('veg_variety', 'Vegetable variety is required').not().isEmpty(),
    check('expected_harvest', 'Expected harvest is required').isFloat({ min: 0 }),
    check('seed_source', 'Seed source is required').not().isEmpty(),
    check('seed_quantity', 'Seed quantity is required').isFloat({ min: 0 }),
    check('seed_cost', 'Seed cost is required').isFloat({ min: 0 })
  ],
  validateFarmingMetrics,
  sessionController.createSession
);

// @route   GET api/sessions
// @desc    Get all sessions for current user
// @access  Private
router.get('/', sessionController.getAllSessions);

// @route   GET api/sessions/active
// @desc    Get active sessions for current user
// @access  Private
router.get('/active', sessionController.getActiveSessions);

// @route   GET api/sessions/:id
// @desc    Get a single session by ID
// @access  Private
router.get('/:id', sessionController.getSessionById);

// @route   PATCH api/sessions/:id/soil
// @desc    Update soil information (can be updated after starting)
// @access  Private
router.patch(
  '/:id/soil',
  sessionController.updateSoilInfo
);

// @route   PATCH api/sessions/:id/end
// @desc    End a session
// @access  Private
router.patch(
  '/:id/end',
  [
    check('actual_harvest', 'Actual harvest is required').isFloat({ min: 0 }),
    
  ],
  validateFarmingMetrics,
  //validateSessionDuration,
  sessionController.endSession
);

module.exports = router;