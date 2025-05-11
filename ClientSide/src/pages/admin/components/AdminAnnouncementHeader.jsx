import React from "react";

const AdminAnnouncementHeader = ({ onAddClick }) => (
  <div className="flex justify-between items-center mb-8">
    <div>
      <h2 className="text-3xl font-bold text-gray-800">📢 Announcements</h2>
      <p className="text-gray-500">
        Manage all the latest announcements for admins and users.
      </p>
    </div>
    <button
      onClick={onAddClick}
      className="bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-blue-700 transition duration-200"
    >
      + Add Announcement
    </button>
  </div>
);

export default AdminAnnouncementHeader;
