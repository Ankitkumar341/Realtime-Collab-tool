const Note = require('../models/noteModel');
const io = require('../server'); // Import the io instance

// Get all notes
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new note
const createNote = async (req, res) => {
  const { title, content, owner } = req.body;
  const newNote = new Note({
    title,
    content,
    owner,
  });

  try {
    const savedNote = await newNote.save();
    io.emit('note:created', savedNote); // Emit event
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a note
const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content, lastEdited: Date.now() },
      { new: true }
    );
    io.emit('note:updated', updatedNote); // Emit event
    res.json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a note
const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    await Note.findByIdAndDelete(id);
    io.emit('note:deleted', id); // Emit event
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};