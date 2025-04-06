const express = require('express');
const router = express.Router();
const axios = require('axios');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mydbnew',
  password: '1234',
  port: 5432,
});



// Existing route for POST /api/kpi
router.post('/', async (req, res) => {
  try {
    const { farm_id, final_score } = req.body;
    console.log(req.body)
    const response = await axios.post('http://localhost:8000/receive-kpi', {
      farm_id,
      final_score,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${req.headers.authorization.split(' ')[1]}`,
      },
    });
    console.log("here 1")
    res.json({ message: 'KPI sent successfully', data: response.data });
  } catch (error) {
    console.error('Error sending KPI:', error.message);
    res.status(500).json({ error: 'Failed to send KPI' });
  }
});

// Add new route for GET /api/kpi/report/:sessionId
router.get('/report/:sessionId', async (req, res) => {
  try {

    const { sessionId } = req.params;

    // Fetch session data from the database
    const sessionQuery = 'SELECT * FROM sessions WHERE id = $1';
    const sessionResult = await pool.query(sessionQuery, [sessionId]);
    // console.log(sessionResult);
    if (sessionResult.rows.length === 0) {
      return res.status(404).json({ error: 'Session not found' });
    }
    const session = sessionResult.rows[0];
    console.log(session)

    // Fetch KPI data from the FastAPI server
    const kpiResponse = await axios.post(`http://localhost:8000/receive-kpi`, {
      headers: {
        'Authorization': req.headers.authorization,
      },
    });
    const kpiData = kpiResponse.data;
 
    // Fetch farmer data (assuming you have a users table)
    const userQuery = 'SELECT * FROM users WHERE id = $1';
    const userResult = await pool.query(userQuery, [session.user_id]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'Farmer not found' });
    }
    const farmer = userResult.rows[0];

    // Transform the data into the FarmerReport format
    const report = {
      farmerName: farmer.name || 'Unknown Farmer',
      farmerId: farmer.id,
      finalScore: kpiData.final_score,
      criteria: Object.entries(kpiData.kpis).map(([criterion, details]) => ({
        criterion,
        score: details.score,
        weight: details.weight,
        weightContribution: details.weighted_contribution,
      })),
      recommendations: kpiData.recommendations,
    };

    res.json(report);
  } catch (error) {
    console.error('Error fetching report:');
    res.status(500).json({ error: 'Failed to fetch report' });
  }
});

module.exports = router;