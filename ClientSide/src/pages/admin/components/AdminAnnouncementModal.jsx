import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";

const AdminAnnouncementModal = ({ isOpen, onClose, onSubmit, announcement }) => {
  if (!isOpen) return null;

  useEffect(() => {
    if (announcement) {
      // Pre-fill form when in edit mode
      const form = document.querySelector('form');
      form.title.value = announcement.title;
      form.content.value = announcement.description;
    }
  }, [announcement]);

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
        <form onSubmit={onSubmit}>
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
          <div className="mb-6">
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
            <label className = "block test-sm font-medium text-gray-600 mb-1">
                Active
            </label>
            <input
            type="checkbox"
            name="isActive"
            defaultChecked={announcement ? announcement.isActive : true}
            className="mr-2"
            />
            <span>{announcement && !announcement.isActive ? "Inactive" : "Active"}</span>
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

export default AdminAnnouncementModal;
