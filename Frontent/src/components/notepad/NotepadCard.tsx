import React from 'react';
import { motion } from 'framer-motion';
import { FileEdit, Trash2, Share2 } from 'lucide-react';

interface NotepadCardProps {
  id: string;
  title: string;
  content: string;
  lastEdited: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onShare: (id: string) => void;
}

const NotepadCard: React.FC<NotepadCardProps> = ({
  id,
  title,
  content,
  lastEdited,
  onEdit,
  onDelete,
  onShare
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card shadow-sm border-light mb-3"
    >
      <div className="card-body d-flex justify-content-between align-items-start">
        <h5 className="card-title text-truncate" style={{ maxWidth: '80%' }}>
          {title}
        </h5>
        <div>
          <button
            className="btn btn-link text-primary"
            onClick={() => onShare(id)}
            aria-label="Share"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="card-text text-muted text-truncate" style={{ WebkitLineClamp: 3, overflow: 'hidden' }}>
        {content}
      </p>

      <div className="card-footer d-flex justify-content-between align-items-center">
        <small className="text-muted">Last edited: {lastEdited}</small>
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => onEdit(id)}
            aria-label="Edit"
          >
            <FileEdit className="h-4 w-4 me-1" />
            Edit
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => onDelete(id)}
            aria-label="Delete"
          >
            <Trash2 className="h-4 w-4 me-1" />
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default NotepadCard;
