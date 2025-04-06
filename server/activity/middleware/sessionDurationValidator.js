/**
 * Session duration validator middleware
 * Prevents farmers from ending a session before the minimum required growing period
 */
const logger = require('../loggingOperations/logger');
const Session = require('../models/Session');

/**
 * Calculate if the minimum growing period has elapsed
 * @param {Date} startDate - Session start date
 * @returns {Object} - Contains isValid flag and days remaining if not valid
 */
const hasMinimumGrowingPeriodElapsed = (startDate) => {
  const MIN_GROWING_PERIOD_DAYS = 70; // 2 months and 10 days
  
  const currentDate = new Date();
  const sessionStartDate = new Date(startDate);
  
  // Calculate the time difference in milliseconds
  const timeDifference = currentDate - sessionStartDate;
  
  // Convert to days
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
  // Check if minimum period has elapsed
  if (daysDifference < MIN_GROWING_PERIOD_DAYS) {
    return {
      isValid: false,
      daysRemaining: MIN_GROWING_PERIOD_DAYS - daysDifference
    };
  }
  
  return { isValid: true };
};

/**
 * Middleware to validate session duration before ending
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.validateSessionDuration = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Only apply validation to session end requests
    if (req.method !== 'PATCH' || !req.path.includes('/end')) {
      return next();
    }
    
    // Get the session
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
    
    // Check if minimum growing period has elapsed
    const durationValidation = hasMinimumGrowingPeriodElapsed(session.start_date);
    
    if (!durationValidation.isValid) {
      return res.status(400).json({
        message: `Cannot end session before minimum growing period of 2 months and 10 days. Please wait ${durationValidation.daysRemaining} more days.`,
        daysRemaining: durationValidation.daysRemaining
      });
    }
    
    next();
  } catch (error) {
    logger.error(`Error in validateSessionDuration: ${error.message}`);
    res.status(500).json({ message: 'Server error validating session duration' });
  }
};