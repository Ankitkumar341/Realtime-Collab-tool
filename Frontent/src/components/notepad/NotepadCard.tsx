import React from 'react';
import { motion } from 'framer-motion';
import { FileEdit, Trash2, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      className="bg-white rounded-lg shadow-lg p-4 border border-gray-200 hover:shadow-xl transition-shadow"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 truncate">{title}</h3>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onShare(id)}
            className="text-blue-600 hover:text-blue-700"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{content}</p>
      
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">Last edited: {lastEdited}</span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(id)}
            className="text-blue-600 hover:text-blue-700"
          >
            <FileEdit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(id)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default NotepadCard;