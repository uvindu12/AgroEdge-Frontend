const express = require('express');
const pool = require('../config/db');
const router = express.Router();

// Valid districts from your database
const VALID_DISTRICTS = [
    'Matale', 'NuwaraEliya', 'Puttalama', 'Vavuniya', 'Badulla', 'Batticaloa', 'Kilinochchi', 
    'Kandy', 'Kurunegala', 'Trincomalee', 'Anuradhapura', 'Ampara', 'Jaffna', 'Bandarawela', 
    'Rathnapura', 'Welimada', 'Monaragala', 'Mannar', 'Gampaha', 'Haputhale', 'Colombo', 'Kegalle'
];

// Get all farmers with pagination (optimized for testing in Postman)
router.get('/farmers', async (req, res) => {
    const { page = 1, limit = 20 } = req.query; // Default to page 1, 20 farmers per page
    const offset = (parseInt(page) - 1) * parseInt(limit);

    try {
        const result = await pool.query(`
            SELECT user_id, farm_size, district, crop_type, veg_variety, final_performance_score
            FROM users 
            LEFT JOIN sessions ON user_id = user_id
            ORDER BY user_id
            LIMIT $1 OFFSET $2
        `, [parseInt(limit), offset]);

        const totalResult = await pool.query('SELECT COUNT(*) FROM users  LEFT JOIN sessions  ON user_id = user_id');
        const totalFarmers = parseInt(totalResult.rows[0].count);

        console.log(`Fetched ${result.rows.length} farmers, page ${page}, limit ${limit}`);
        res.json({
            farmers: result.rows,
            totalFarmers,
            totalPages: Math.ceil(totalFarmers / parseInt(limit)),
            currentPage: parseInt(page)
        });
    } catch (error) {
        console.error('Error fetching farmers:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get best farmers and synthesized recommendation by district
router.get('/best-farmers/:district', async (req, res) => {
    const { district } = req.params;
    const { farm_size, soil_type } = req.query; // Optional filters

    // Validate district
    if (!VALID_DISTRICTS.includes(district)) {
        return res.status(400).json({ error: `Invalid district. Valid districts are: ${VALID_DISTRICTS.join(', ')}` });
    }

    let query = `
        SELECT user_id, farm_size, district, crop_type, veg_variety, soil_type, soil_ph, 
               seed_source, seed_quantity, water_source, irrigation_method, actual_harvest,
               final_performance_score,
               (actual_harvest - (seed_cost + irrigation_cost + labor_wages)) AS profit_estimate
        FROM users 
        LEFT JOIN sessions ON user_id = user_id
        WHERE district = $1
    `;
    const params = [district];

    if (farm_size) {
        query += ` AND farm_size BETWEEN $2 - 1 AND $2 + 1`; // Within ±1 acre
        params.push(parseFloat(farm_size));
    }
    if (soil_type) {
        query += ` AND soil_type = $${params.length + 1}`;
        params.push(soil_type);
    }
    query += ` ORDER BY final_performance_score DESC LIMIT 3`;

    try {
        const result = await pool.query(query, params);
        const farmers = result.rows;

        // Synthesize a recommendation
        let recommendation = '';
        if (farmers.length > 0) {
            const topFarmer = farmers[0];
            recommendation = `Based on top performers in ${district}, we recommend growing ${topFarmer.veg_variety} (${topFarmer.crop_type}) on ${topFarmer.soil_type} soil with ${topFarmer.irrigation_method} irrigation for optimal performance.`;
        } else {
            recommendation = `No sufficient data available for ${district} with the given filters.`;
        }

        res.json({
            recommendation,
            topFarmers: farmers,
        });
    } catch (error) {
        console.error('Error fetching best farmers:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Register a new farmer
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING user_id',
            [name, email, password]
        );
        res.status(201).json({ user_id: result.rows[0].user_id });
    } catch (error) {
        console.error('Error registering farmer:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Add farming session for a new farmer
router.post('/session', async (req, res) => {
    const {
        user_id, farm_size, district, crop_type, veg_variety, expected_harvest, seed_source, 
        seed_quantity, seed_cost, soil_type, soil_ph, start_date, end_date, actual_harvest, 
        water_source, irrigation_method, water_usage, irrigation_cost, labor_hours, labor_wages, 
        yield_perch, cost_per_kg, fertilizer_efficiency, pesticide_efficiency, water_efficiency, 
        labor_efficiency, seed_efficiency, final_performance_score, is_active, created_at, update_at
    } = req.body;

    // Validate district
    if (!VALID_DISTRICTS.includes(district)) {
        return res.status(400).json({ error: `Invalid district. Valid districts are: ${VALID_DISTRICTS.join(', ')}` });
    }

    try {
        await pool.query(
            `INSERT INTO sessions (
                user_id, farm_size, district, crop_type, veg_variety, expected_harvest, seed_source, 
                seed_quantity, seed_cost, soil_type, soil_ph, start_date, end_date, actual_harvest, 
                water_source, irrigation_method, water_usage, irrigation_cost, labor_hours, labor_wages, 
                yield_perch, cost_per_kg, fertilizer_efficiency, pesticide_efficiency, water_efficiency, 
                labor_efficiency, seed_efficiency, final_performance_score, is_active, created_at, update_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 
                      $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31)`,
            [
                user_id, farm_size, district, crop_type, veg_variety, expected_harvest, seed_source, 
                seed_quantity, seed_cost, soil_type, soil_ph, start_date, end_date, actual_harvest, 
                water_source, irrigation_method, water_usage, irrigation_cost, labor_hours, labor_wages, 
                yield_perch, cost_per_kg, fertilizer_efficiency, pesticide_efficiency, water_efficiency, 
                labor_efficiency, seed_efficiency, final_performance_score, is_active, created_at, update_at
            ]
        );
        res.status(201).json({ message: 'Session added successfully' });
    } catch (error) {
        console.error('Error adding session:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;