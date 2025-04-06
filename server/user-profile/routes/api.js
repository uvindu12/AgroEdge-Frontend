const express = require('express');
const pool = require('../db/db');
const router = express.Router();


const determineSeason = (startDate) => {
  if (!startDate) return 'Year-round';
  const month = new Date(startDate).getMonth() + 1; 
  
  if (month >= 9 || month <= 3) return 'Maha';
  return 'Yala';
};


router.get('/profile/:userId', async (req, res) => {
  console.log('Received request for /api/profile/:userId with userId:', req.params.userId);
  const userId = req.params.userId; 

  
  if (!userId || typeof userId !== 'string' || userId.length > 10) {
    console.error('Invalid user ID:', req.params.userId);
    return res.status(400).json({ error: 'Invalid user ID' });
  }
  try {
    
    const userQuery = 'SELECT * FROM users WHERE id = $1';
    const userResult = await pool.query(userQuery, [userId]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const user = userResult.rows[0];

    
    const sessionsQuery = 'SELECT * FROM sessions WHERE user_id = $1';
    const sessionsResult = await pool.query(sessionsQuery, [userId]);
    const sessions = sessionsResult.rows;

    if (sessions.length === 0) {
      return res.status(404).json({ error: 'No sessions found for this user' });
    }

    
    const totalHarvests = sessions.length;
    const avgYield = (
      sessions.reduce((sum, s) => sum + (s.yield_perch || 0), 0) / sessions.length
    ).toFixed(2);
    const totalRevenue = sessions.reduce((sum, s) => sum + (s.seed_cost + s.irrigation_cost + s.labor_wages), 0);
    const totalExpenses = totalRevenue * 0.68; 
    const profitMargin = ((totalRevenue - totalExpenses) / totalRevenue * 100).toFixed(0) + '%';
    const sustainability = Math.min(
      100,
      Math.round(sessions.reduce((sum, s) => sum + (s.final_performance_score || 0), 0) / sessions.length)
    ) + '%';

    
    const farmerData = {
      personal: {
        name: user.username || 'Unknown Farmer',
        avatar: '',
        location: sessions[0].district || 'Unknown Location',
        phone: 'Not provided',
        email: user.email || 'Not provided',
        memberSince: user.created_at
          ? new Date(user.created_at).toLocaleString('default', { month: 'long', year: 'numeric' })
          : 'Unknown',
        bio: 'No bio provided.',
      },
      farm: {
        name: 'Green Valley Farm',
        size: sessions[0].farm_size ? `${sessions[0].farm_size} acres` : 'Unknown',
        soilType: sessions[0].soil_type || 'Unknown',
        waterSource: sessions[0].water_source || 'Unknown',
        mainCrops: [...new Set(sessions.map(s => s.crop_type).filter(Boolean))],
        certifications: ['Organic Certified', 'Good Agricultural Practices'],
        equipment: ['Tractor', 'Water Pump', 'Harvester'],
      },
      crops: sessions.map(s => ({
        name: s.crop_type || 'Unknown Crop',
        area: s.farm_size ? `${s.farm_size} acres` : 'Unknown',
        yield: s.yield_perch ? `${s.yield_perch.toFixed(1)} tons/acre` : 'Unknown',
        season: determineSeason(s.start_date),
        profit: s.final_performance_score > 75 ? 'High' : 'Medium',
      })),
      statistics: {
        totalHarvests,
        averageYield: `${avgYield} tons/acre`,
        profitMargin,
        waterUsage: sessions[0].water_usage < 1000 ? 'Efficient' : 'Moderate',
        sustainability,
      },
      achievements: [
        { title: 'Top Rice Producer 2022', date: 'December 2022' },
        { title: 'Sustainable Farming Award', date: 'June 2023' },
        { title: 'Community Leader', date: 'January 2023' },
      ],
      recentActivity: [
        { action: 'Updated crop data', date: '2 days ago' },
        { action: 'Added new harvest record', date: '1 week ago' },
        { action: 'Completed soil analysis', date: '2 weeks ago' },
      ],
    };

    res.json(farmerData);
  } catch (error) {
    console.error('Error fetching farmer profile:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

module.exports = router;