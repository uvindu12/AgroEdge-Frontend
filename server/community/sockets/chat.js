const pool = require('../config/db');

const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Join the Community Hub room
    socket.join('community-hub');

    // Send a new message
    socket.on('sendMessage', async (messageData, callback) => {
      const { userId, content, imageBase64 } = messageData;
      try {
        const imageData = imageBase64 ? Buffer.from(imageBase64, 'base64') : null;
        const result = await pool.query(
          'INSERT INTO comm_messages (user_id, content, image_data, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
          [userId, content, imageData]
        );
        const newMessage = result.rows[0];

        // Increment message count in comm_profile
        await pool.query(
          'UPDATE comm_profile SET message_count = message_count + 1 WHERE user_id = $1',
          [userId]
        );

        // Fetch user details for the message
        const userResult = await pool.query(
          'SELECT username, profile_picture FROM comm_profile WHERE user_id = $1',
          [userId]
        );
        newMessage.username = userResult.rows[0].username;
        newMessage.profile_picture = userResult.rows[0].profile_picture;
        newMessage.reactions = [];

        // Convert image_data to Base64 for the frontend
        if (newMessage.image_data) {
          newMessage.image_data = Buffer.from(newMessage.image_data).toString('base64');
        }

        // Broadcast the message to all users in the room
        io.to('community-hub').emit('newMessage', newMessage);

        // Only call callback if it exists and is a function
        if (typeof callback === 'function') {
          callback({ status: 'success', message: newMessage });
        }
      } catch (error) {
        console.error('Error sending message:', error);
        // Only call callback if it exists and is a function
        if (typeof callback === 'function') {
          callback({ status: 'error', error: 'Failed to send message' });
        }
      }
    });

    // Send a reply
    socket.on('sendReply', async (replyData, callback) => {
      const { messageId, userId, content, imageBase64 } = replyData;
      try {
        const imageData = imageBase64 ? Buffer.from(imageBase64, 'base64') : null;
        const result = await pool.query(
          'INSERT INTO comm_replies (message_id, user_id, content, image_data, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
          [messageId, userId, content, imageData]
        );
        const newReply = result.rows[0];

        // Fetch user details for the reply
        const userResult = await pool.query(
          'SELECT username, profile_picture FROM comm_profile WHERE user_id = $1',
          [userId]
        );
        newReply.username = userResult.rows[0].username;
        newReply.profile_picture = userResult.rows[0].profile_picture;
        newReply.reactions = [];

        // Convert image_data to Base64 for the frontend
        if (newReply.image_data) {
          newReply.image_data = Buffer.from(newReply.image_data).toString('base64');
        }

        // Broadcast the reply
        io.to('community-hub').emit('newReply', newReply);

        // Only call callback if it exists and is a function
        if (typeof callback === 'function') {
          callback({ status: 'success', reply: newReply });
        }
      } catch (error) {
        console.error('Error sending reply:', error);
        // Only call callback if it exists and is a function
        if (typeof callback === 'function') {
          callback({ status: 'error', error: 'Failed to send reply' });
        }
      }
    });

    // Handle reactions to messages
    socket.on('reactToMessage', async ({ messageId, userId, emoji }, callback) => {
      try {
        const reactionResult = await pool.query(
          'INSERT INTO comm_message_reactions (message_id, user_id, emoji) VALUES ($1, $2, $3) ON CONFLICT (message_id, user_id, emoji) DO DELETE RETURNING *',
          [messageId, userId, emoji]
        );
        io.to('community-hub').emit('reactionUpdated', {
          messageId,
          userId,
          emoji,
          added: reactionResult.rows.length > 0,
        });

        // Only call callback if it exists and is a function
        if (typeof callback === 'function') {
          callback({ status: 'success' });
        }
      } catch (error) {
        console.error('Error handling reaction:', error);
        // Only call callback if it exists and is a function
        if (typeof callback === 'function') {
          callback({ status: 'error', error: 'Failed to handle reaction' });
        }
      }
    });

    // Handle reactions to replies
    socket.on('reactToReply', async ({ messageId, replyId, userId, emoji }, callback) => {
      try {
        const reactionResult = await pool.query(
          'INSERT INTO comm_reply_reactions (reply_id, user_id, emoji) VALUES ($1, $2, $3) ON CONFLICT (reply_id, user_id, emoji) DO DELETE RETURNING *',
          [replyId, userId, emoji]
        );
        io.to('community-hub').emit('replyReactionUpdated', {
          messageId,
          replyId,
          userId,
          emoji,
          added: reactionResult.rows.length > 0,
        });

        // Only call callback if it exists and is a function
        if (typeof callback === 'function') {
          callback({ status: 'success' });
        }
      } catch (error) {
        console.error('Error handling reply reaction:', error);
        // Only call callback if it exists and is a function
        if (typeof callback === 'function') {
          callback({ status: 'error', error: 'Failed to handle reply reaction' });
        }
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

module.exports = setupSocket;