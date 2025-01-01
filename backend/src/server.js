const express = require('express');
const app = express();
const BodyParser  = require ('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const AuthRouter= require('./routes/AuthRouter');
require('dotenv').config();
require('./models/db')


// Middleware
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(cors(
  origin = 'http://localhost:5173',
  method = ['GET', 'POST', 'PUT', 'DELETE'],
  Credentials = true

));
app.use(express.json());
app.use('/auth', AuthRouter)


// Routes
app.use('/api/notes', require('./routes/noteRoutes'));
// app.use('/routes', require('./routes'))


// Start the server
const PORT = process.env.PORT || 5000;
app.get('/ping', (req, res) =>{
  res.send('pong');
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});