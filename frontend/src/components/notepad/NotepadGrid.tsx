import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import NotepadCard from './NotepadCard';
import NoteEditor from './NoteEditor';
import socket from '../../utils/socket';

interface Note {
  _id: string;
  title: string;
  content: string;
  lastEdited: string;
}

const NotepadGrid: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/notes', {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setError('Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();

    socket.on('note:created', (note: Note) => {
      setNotes((prev) => [note, ...prev]);
    });

    socket.on('note:updated', (updatedNote: Note) => {
      setNotes((prev) =>
        prev.map((note) => (note._id === updatedNote._id ? updatedNote : note))
      );
    });

    socket.on('note:deleted', (noteId: string) => {
      setNotes((prev) => prev.filter((note) => note._id !== noteId));
    });

    return () => {
      socket.off('note:created');
      socket.off('note:updated');
      socket.off('note:deleted');
    };
  }, []);

  if (loading) {
    return <div className="container my-4">Loading...</div>;
  }

  if (error) {
    return <div className="container my-4">Error: {error}</div>;
  }

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 text-dark">My Notes</h2>
        <button
          onClick={() => setIsCreatingNew(true)}
          className="btn btn-primary d-flex align-items-center"
        >
          <Plus className="h-5 w-5 me-2" />
          New Note
        </button>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {notes.map((note) => (
          <div key={note._id} className="col">
            <NotepadCard
              id={note._id}
              title={note.title}
              content={note.content}
              lastEdited={note.lastEdited}
              onEdit={(id) => {
                const noteToEdit = notes.find((n) => n._id === id);
                if (noteToEdit) {
                  setEditingNote(noteToEdit);
                }
              }}
              onDelete={(id) => {
                socket.emit('note:delete', id);
                setNotes((prev) => prev.filter((note) => note._id !== id));
              }}
              onShare={() => {}}
            />
          </div>
        ))}
      </div>

      {(editingNote || isCreatingNew) && (
        <NoteEditor
          noteId={editingNote?._id}
          initialTitle={editingNote?.title}
          initialContent={editingNote?.content}
          onSave={async (title, content) => {
            if (editingNote) {
              socket.emit('note:update', { ...editingNote, title, content });
            } else {
              socket.emit('note:create', {
                _id: Date.now().toString(),
                title,
                content,
                lastEdited: new Date().toISOString(),
              });
            }
            setEditingNote(null);
            setIsCreatingNew(false);
          }}
          onClose={() => {
            setEditingNote(null);
            setIsCreatingNew(false);
          }}
        />
      )}
    </div>
  );
};

export default NotepadGrid;