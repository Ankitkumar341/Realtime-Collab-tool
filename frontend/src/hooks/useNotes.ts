import { useState, useEffect } from 'react';
import { Note } from '@/types/note';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/notes');
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const addNote = async (title: string, content: string) => {
    const newNote = { title, content };

    try {
      const response = await fetch('http://localhost:5000/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });
      const savedNote = await response.json();
      setNotes([savedNote, ...notes]);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const updateNote = async (id: string, title: string, content: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });
      const updatedNote = await response.json();
      setNotes(notes.map(note => (note.id === id ? updatedNote : note)));
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: 'DELETE',
      });
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const shareNote = (id: string) => {
    // Implement sharing functionality
    console.log('Sharing note:', id);
  };

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
    shareNote,
  };
};

export default useNotes;