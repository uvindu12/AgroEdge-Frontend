const FertilizerUpload = require('../models/FertilizerUpload');
const PesticideUpload = require('../models/PesticideUpload');
const IrrigationUpload = require('../models/IrrigationUpload');
const LaborUpload = require('../models/LaborUpload');
const MachineryUpload = require('../models/MachineryUpload');
const Session = require('../models/Session');

/**
 * Calculate the total expenses for a session
 * @param {number} sessionId - The ID of the session
 * @returns {Promise<number>} - Total expenses
 */
const calculateTotalExpenses = async (sessionId) => {
  try {
    // Get the session to include seed cost
    const session = await Session.findByPk(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }
    
    // Get seed cost
    const seedCost = session.seed_cost || 0;
    
    // Get fertilizer costs
    const fertilizerCosts = await FertilizerUpload.sum('cost', {
      where: { session_id: sessionId }
    }) || 0;
    
    // Get pesticide costs
    const pesticideCosts = await PesticideUpload.sum('cost', {
      where: { session_id: sessionId }
    }) || 0;
    
    // Get irrigation costs
    const irrigationCosts = await IrrigationUpload.sum('cost', {
      where: { session_id: sessionId }
    }) || 0;
    
    // Get labor costs
    const laborCosts = await LaborUpload.sum('wages_per_day', {
      where: { session_id: sessionId }
    }) || 0;
    
    // Sum all costs
    const totalExpenses = seedCost + fertilizerCosts + pesticideCosts + irrigationCosts + laborCosts;
    
    return totalExpenses;
  } catch (error) {
    console.error('Error calculating total expenses:', error);
    throw error;
  }
};

/**
 * Calculate profit/loss for a session
 * @param {number} sessionId - The ID of the session
 * @param {number} totalRevenue - The total revenue from sales
 * @returns {Promise<number>} - Profit/loss amount
 */
exports.calculateProfit = async (sessionId, totalRevenue) => {
  try {
    const totalExpenses = await calculateTotalExpenses(sessionId);
    return totalRevenue - totalExpenses;
  } catch (error) {
    console.error('Error calculating profit:', error);
    throw error;
  }
};