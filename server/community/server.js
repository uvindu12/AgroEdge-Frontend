const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const pool = require('./config/db');
const profileRoutes = require('./routes/profile');
const messageRoutes = require('./routes/messages');
const userRoutes = require('./routes/users'); // Add this
const setupSocket = require('./sockets/chat');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/profile', profileRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes); // Add this

// Socket.IO setup
setupSocket(io);

const PORT = process.env.PORT || 5003;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});