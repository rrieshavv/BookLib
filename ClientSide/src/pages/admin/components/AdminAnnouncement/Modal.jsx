import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

// Helper: Convert UTC date string to local input string (YYYY-MM-DDTHH:mm)
function utcToLocalInputString(utcString) {
  if (!utcString) return '';
  const date = new Date(utcString);
  // Get local date parts
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

const Modal = ({ isOpen, onClose, onSubmit, announcement }) => {
  const [isActive, setIsActive] = useState(announcement ? announcement.isActive : true);
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');

  useEffect(() => {
    if (announcement) {
      const form = document.querySelector('form');
      form.title.value = announcement.title;
      form.content.value = announcement.description;
      setStartDateTime(utcToLocalInputString(announcement.displayStartTs));
      setEndDateTime(utcToLocalInputString(announcement.displayEndTs));
      setIsActive(announcement.isActive);
    } else {
      setIsActive(true);
      setStartDateTime('');
      setEndDateTime('');
    }
  }, [announcement, isOpen]);

  if (!isOpen) return null;

  // Custom submit handler to use local state for date fields
  const handleFormSubmit = (e) => {
    // Set the form values to our local state before passing to parent
    e.target.startDateTime.value = startDateTime;
    e.target.endDateTime.value = endDateTime;
    e.target.isActive.checked = isActive;
    onSubmit(e);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition-all duration-300">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
        >
          <FiX className="w-5 h-5" />
        </button>
        <h3 className="text-2xl font-bold mb-6 text-gray-800">
          {announcement ? "Edit Announcement" : "Add New Announcement"}
        </h3>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">Content</label>
            <textarea
              name="content"
              placeholder="Enter announcement details"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">Start Date & Time</label>
            <input
              type="datetime-local"
              name="startDateTime"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={startDateTime}
              onChange={e => setStartDateTime(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">End Date & Time</label>
            <input
              type="datetime-local"
              name="endDateTime"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={endDateTime}
              onChange={e => setEndDateTime(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Active
            </label>
            <input
              type="checkbox"
              name="isActive"
              checked={isActive}
              onChange={e => setIsActive(e.target.checked)}
              className="mr-2"
            />
            <span>Active</span>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              {announcement ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
