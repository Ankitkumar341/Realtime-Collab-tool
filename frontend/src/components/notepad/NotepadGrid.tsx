import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import NotepadCard from './NotepadCard';
import NoteEditor from './NoteEditor';

interface Note {
  id: string;
  title: string;
  content: string;
  lastEdited: string;
}

const NotepadGrid: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([
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
  ]);

  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const handleEdit = (id: string) => {
    const note = notes.find(n => n.id === id);
    if (note) {
      setEditingNote(note);
    }
  };

  const handleDelete = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleShare = (id: string) => {
    // Implement sharing functionality
    console.log('Sharing note:', id);
  };

  const handleCreateNew = () => {
    setIsCreatingNew(true);
  };

  const handleSave = (title: string, content: string) => {
    if (editingNote) {
      setNotes(notes.map(note => 
        note.id === editingNote.id 
          ? { ...note, title, content, lastEdited: 'Just now' }
          : note
      ));
      setEditingNote(null);
    } else {
      const newNote: Note = {
        id: Date.now().toString(),
        title,
        content,
        lastEdited: 'Just now'
      };
      setNotes([newNote, ...notes]);
      setIsCreatingNew(false);
    }
  };

  if (editingNote || isCreatingNew) {
    return (
      <NoteEditor
        noteId={editingNote?.id}
        initialTitle={editingNote?.title}
        initialContent={editingNote?.content}
        onSave={handleSave}
        onClose={() => {
          setEditingNote(null);
          setIsCreatingNew(false);
        }}
      />
    );
  }

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 text-dark">My Notes</h2>
        <button 
          onClick={handleCreateNew} 
          className="btn btn-primary d-flex align-items-center">
          <Plus className="h-5 w-5 me-2" />
          New Note
        </button>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {notes.map(note => (
          <div key={note.id} className="col">
            <NotepadCard
              id={note.id}
              title={note.title}
              content={note.content}
              lastEdited={note.lastEdited}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onShare={handleShare}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotepadGrid;
