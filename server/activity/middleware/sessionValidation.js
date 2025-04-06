/**
 * Validation middleware for farming sessions
 * Handles input validation and outlier detection for critical farming metrics
 */
const logger = require('../loggingOperations/logger');

// Crop-specific validation ranges
const CROP_VALIDATION_RANGES = {
  
// Winged bean
// Leeks
// Onion
// Carrot
// Pumpkin
// Potato
// Brinjal
// Beetroot
// Cabbage


  'Winged bean': {
    expected_harvest: { min: 3.483876663, max: 7.483876663 },
    actual_harvest: { min: 3.510525675, max: 7.510525675 },
    seed_quantity: { min: 5, max: 9 },
    seed_cost: { min: 53, max: 57 }
  },
  'Leeks': {
    expected_harvest: { min: 18.11407686, max: 22.11407686 },
    actual_harvest: { min: 18.1292141, max: 22.1292141 },
    seed_quantity: { min: 1, max: 5 },
    seed_cost: { min: 42.8, max: 46.8 }
  },
  'Onion': {
    expected_harvest: { min: 5.200705944, max: 9.200705944 },
    actual_harvest: { min: 5.238122244, max: 9.238122244 },
    seed_quantity: { min: 0, max: 2.390802845 },
    seed_cost: { min: 299.3638381, max: 303.3638381 }
  },
  'Carrot': {
    expected_harvest: { min: 18.08841679, max: 22.08841679 },
    actual_harvest: { min: 18.07326908, max: 22.07326908 },
    seed_quantity: { min: 5, max: 9 },
    seed_cost: { min: 69.5, max: 73.5 }
  },
  'Pumpkin': {
    expected_harvest: { min: 28.05321204, max: 32.05321204 },
    actual_harvest: { min: 28.19465658, max: 32.19465658 },
    seed_quantity: { min: 5, max: 9 },
    seed_cost: { min: 58, max: 62 }
  },
  'Potato': {
    expected_harvest: { min: 55.54257532, max: 59.54257532 },
    actual_harvest: { min: 55.45342687, max: 59.45342687 },
    seed_quantity: { min: 0, max: 2.386248356 },
    seed_cost: { min: 0, max: 2.479547812 }
  },
  'Brinjal': {
    expected_harvest: { min: 5.547322367, max: 9.547322367 },
    actual_harvest: { min: 5.406504634, max: 9.406504634 },
    seed_quantity: { min: 0, max: 2.39380667 },
    seed_cost: { min: 226.0504243, max: 230.0504243 }
  },
  'Beetroot': {
    expected_harvest: { min: 7.329341459, max: 11.329341459 },
    actual_harvest: { min: 7.231098372, max: 11.231098372 },
    seed_quantity: { min: 0, max: 2.403562723 },
    seed_cost: { min: 281.3459689, max: 285.3459689 }
  },
  'Cabbage': {
    expected_harvest: { min: 80.81384679, max: 84.81384679 },
    actual_harvest: { min: 80.46383569, max: 84.46383569 },
    seed_quantity: { min: 0, max: 2.75 },
    seed_cost: { min: 2.761840463, max: 6.761840463 }
  },
  'DEFAULT': { // Fallback for crops not explicitly listed
    expected_harvest: { min: 100, max: 30000 },
    actual_harvest: { min: 80, max: 35000 },
    seed_quantity: { min: 0.01, max: 10 },
    seed_cost: { min: 100, max: 25000 }
  }
};

/**
 * Validates farming metrics based on crop type to catch outliers
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.validateFarmingMetrics = (req, res, next) => {
  try {
    // For new session creation
    if (req.method === 'POST') {
      const { crop_type, veg_variety, expected_harvest, seed_quantity, seed_cost, farm_size } = req.body;
      
      // Find validation ranges for the crop type
      const cropRanges = CROP_VALIDATION_RANGES[crop_type] || CROP_VALIDATION_RANGES.DEFAULT;
      
      // Normalize values per acre for comparison
      const normalizedExpectedHarvest = expected_harvest / farm_size;
      const normalizedSeedQuantity = seed_quantity / farm_size;
      
      // Validate expected harvest
      if (normalizedExpectedHarvest < cropRanges.expected_harvest.min || 
          normalizedExpectedHarvest > cropRanges.expected_harvest.max) {
        return res.status(400).json({
          message: `Expected harvest (${expected_harvest} kg) seems unusual for ${crop_type} on ${farm_size} acres. Expected range: ${cropRanges.expected_harvest.min * farm_size} - ${cropRanges.expected_harvest.max * farm_size} kg.`
        });
      }
      
      // Validate seed quantity
      if (normalizedSeedQuantity < cropRanges.seed_quantity.min || 
          normalizedSeedQuantity > cropRanges.seed_quantity.max) {
        return res.status(400).json({
          message: `Seed quantity (${seed_quantity} kg) seems unusual for ${crop_type} on ${farm_size} acres. Expected range: ${cropRanges.seed_quantity.min * farm_size} - ${cropRanges.seed_quantity.max * farm_size} kg.`
        });
      }
      
      // Validate seed cost
      if (seed_cost < cropRanges.seed_cost.min || 
          seed_cost > cropRanges.seed_cost.max) {
        return res.status(400).json({
          message: `Seed cost (${seed_cost}) seems unusual for ${crop_type}. Expected range: ${cropRanges.seed_cost.min} - ${cropRanges.seed_cost.max}.`
        });
      }
    }
    
    // For ending a session
    if (req.method === 'PATCH' && req.path.includes('/end')) {
      const { actual_harvest } = req.body;
      const sessionId = req.params.id;
      
      // Get the session to retrieve crop type and farm size
      const Session = require('../models/Session');
      Session.findByPk(sessionId)
        .then(session => {
          if (!session) {
            return res.status(404).json({ message: 'Session not found' });
          }
          
          const { crop_type, farm_size } = session;
          const cropRanges = CROP_VALIDATION_RANGES[crop_type] || CROP_VALIDATION_RANGES.DEFAULT;
          
          // Normalize actual harvest per acre
          const normalizedActualHarvest = actual_harvest / farm_size;
          
          // Validate actual harvest
          if (normalizedActualHarvest < cropRanges.actual_harvest.min || 
              normalizedActualHarvest > cropRanges.actual_harvest.max) {
            return res.status(400).json({
              message: `Actual harvest (${actual_harvest} kg) seems unusual for ${crop_type} on ${farm_size} acres. Expected range: ${cropRanges.actual_harvest.min * farm_size} - ${cropRanges.actual_harvest.max * farm_size} kg.`
            });
          }
          
          next();
        })
        .catch(error => {
          logger.error(`Error in validateFarmingMetrics: ${error.message}`);
          next();
        });
      return; // Return here to prevent calling next() twice
    }
    
    next();
  } catch (error) {
    logger.error(`Error in validateFarmingMetrics: ${error.message}`);
    next();
  }
};