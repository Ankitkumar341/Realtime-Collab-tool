const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', required: true
  },
  lastEdited: {
    type: Date,
    default: Date.now,
  },
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;