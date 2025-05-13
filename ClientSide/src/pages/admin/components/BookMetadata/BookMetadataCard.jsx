import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const BookMetadataCard = ({ item, type, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col">
      <div className="p-4 flex-grow flex flex-col">
        <div className="text-xs text-indigo-500 font-semibold mb-2">
          {type}
        </div>
        
        <h2 className="text-lg font-medium text-gray-900">
          {item.name}
        </h2>
        
        <div className="mt-auto pt-3 border-t border-gray-200 flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(item)}
              className="text-blue-500 hover:text-blue-700 transition"
              title="Edit"
            >
              <FiEdit2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(item)}
              className="text-red-500 hover:text-red-700 transition"
              title="Delete"
            >
              <FiTrash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookMetadataCard;