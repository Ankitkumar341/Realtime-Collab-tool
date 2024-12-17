import { useState } from 'react';
import { Note } from '@/types/note';

const initialNotes: Note[] = [
  {
    id: '1',
    title: 'Welcome Note',
    content: 'Welcome to your collaborative notepad! Start creating and sharing notes with your team.',
    lastEdited: 'Just now'
  },
  {
    id: '2',
    title: 'Getting Started',
    content: '1. Create a new note\n2. Share with teammates\n3. Edit in real-time\n4. Save your changes',
    lastEdited: '5 mins ago'
  }
];

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>(initialNotes);

  const addNote = (title: string, content: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      lastEdited: 'Just now'
    };
    setNotes([newNote, ...notes]);
  };

  const updateNote = (id: string, title: string, content: string) => {
    setNotes(notes.map(note => 
      note.id === id 
        ? { ...note, title, content, lastEdited: 'Just now' }
        : note
    ));
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
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
    shareNote
  };
};

export default useNotes;