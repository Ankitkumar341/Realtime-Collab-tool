import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Notes</h2>
        <Button onClick={handleCreateNew} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-5 w-5 mr-2" />
          New Note
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map(note => (
          <NotepadCard
            key={note.id}
            {...note}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onShare={handleShare}
          />
        ))}
      </div>
    </div>
  );
};

export default NotepadGrid;