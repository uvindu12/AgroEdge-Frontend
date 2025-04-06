const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Get all users (for the message list)
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT p.user_id AS id, p.username, p.email, p.profile_picture, p.member_since, p.message_count ' +
            'FROM comm_profile p'
        );

        const users = result.rows.map(user => ({
            id: user.id,
            name: user.username,
            email: user.email,
            avatarUrl: user.profile_picture ? Buffer.from(user.profile_picture).toString('base64') : '/placeholder.svg?height=96&width=96',
            messageCount: user.message_count || 0,
            joinDate: user.member_since,
        }));

        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;