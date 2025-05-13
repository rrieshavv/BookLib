import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

const DeleteConfirmationModal = ({ isOpen, item, type, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition-all duration-300">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full">
        <div className="flex items-center mb-4">
          <FiAlertTriangle className="w-6 h-6 text-red-500 mr-2" />
          <h3 className="text-xl font-bold text-gray-800">Delete Confirmation</h3>
        </div>
        
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete the {type.toLowerCase()}:{' '}
          <strong>{item?.name}</strong>?
        </p>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;