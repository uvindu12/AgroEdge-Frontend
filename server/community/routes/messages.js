const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const multer = require('multer');
const { authenticateToken } = require('../middleware/auth');

// Configure Multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Get all messages with user info
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT m.*, p.username, p.profile_picture ' +
      'FROM comm_messages m ' +
      'JOIN comm_profile p ON m.user_id = p.user_id ' +
      'ORDER BY m.created_at ASC' // ASC for chronological order (oldest first)
    );
    const messages = result.rows;

    for (let message of messages) {
      const reactionsResult = await pool.query(
        'SELECT * FROM comm_message_reactions WHERE message_id = $1',
        [message.id]
      );
      message.reactions = reactionsResult.rows.map(r => ({
        userId: r.user_id,
        emoji: r.emoji,
      }));
      if (message.image_data) {
        message.image_data = Buffer.from(message.image_data).toString('base64');
      }
    }

    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get replies for a specific message
router.get('/:messageId/replies', async (req, res) => {
  const { messageId } = req.params;
  try {
    const result = await pool.query(
      'SELECT r.*, p.username, p.profile_picture ' +
      'FROM comm_replies r ' +
      'JOIN comm_profile p ON r.user_id = p.user_id ' +
      'WHERE r.message_id = $1 ' +
      'ORDER BY r.created_at ASC',
      [messageId]
    );
    const replies = result.rows;

    for (let reply of replies) {
      const reactionsResult = await pool.query(
        'SELECT * FROM comm_reply_reactions WHERE reply_id = $1',
        [reply.id]
      );
      reply.reactions = reactionsResult.rows.map(r => ({
        userId: r.user_id,
        emoji: r.emoji,
      }));
      if (reply.image_data) {
        reply.image_data = Buffer.from(reply.image_data).toString('base64');
      }
    }

    res.json(replies);
  } catch (error) {
    console.error('Error fetching replies:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Upload image to database and return Base64 string
router.post('/upload-image', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const imageBase64 = file.buffer.toString('base64');
    res.json({ imageBase64 });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

module.exports = router;