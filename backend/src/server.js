const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./routes/AuthRouter');
const NoteRouter = require('./routes/noteRoutes');
require('dotenv').config();
require('./models/db');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
});

// Middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' } // Set to true if using HTTPS
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use('/auth', AuthRouter);
app.use('/api/notes', NoteRouter);

// Socket.IO setup
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('note:create', (note) => {
    io.emit('note:created', note);
  });

  socket.on('note:update', (note) => {
    io.emit('note:updated', note);
  });

  socket.on('note:delete', (noteId) => {
    io.emit('note:deleted', noteId);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.get('/ping', (req, res) => {
  res.send('pong');
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = io;
