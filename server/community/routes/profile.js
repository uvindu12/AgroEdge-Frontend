const express = require('express');
const router = express.Router();
const pool = require('../config/db');
//const { authenticateToken } = require('../middleware/auth');

// Get user profile '/', authenticateToken, async (req, res)
router.get('/', async (req, res) => {

    req.user = { id: '005a8061c6' };

    try {
        const result = await pool.query(
            'SELECT p.user_id AS id, p.username, p.email, p.profile_picture, p.member_since, p.message_count ' +
            'FROM comm_profile p ' +
            'WHERE p.user_id = $1',
            [req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userProfile = result.rows[0];
        res.json({
            id: userProfile.id,
            name: userProfile.username,
            email: userProfile.email,
            avatarUrl: userProfile.profile_picture ? Buffer.from(userProfile.profile_picture).toString('base64') : '/placeholder.svg?height=96&width=96',
            messageCount: userProfile.message_count || 0,
            joinDate: userProfile.member_since,
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;