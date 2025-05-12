import React from "react";
import { FiTrash2, FiEdit } from "react-icons/fi";

const List = ({ announcements, onDelete, onEdit }) => {
  return (
    <div className="space-y-4">
      {announcements.length === 0 ? (
        <div className="text-center py-20 text-gray-500 bg-white rounded-lg shadow-sm">
          No announcements yet.
        </div>
      ) : (
        announcements.map((a) => (
          <div
            key={a.announcementId}
            className="bg-white p-5 rounded-lg shadow flex items-start justify-between hover:shadow-md transition duration-200"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{a.title}</h3>
              <p className="text-gray-600 mt-1">{a.description}</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                className="text-blue-600 hover:text-blue-800 transition"
                title="Edit"
                onClick={() => onEdit(a)}
              >
                <FiEdit className="w-5 h-5" />
              </button>
              <button
                className="text-red-600 hover:text-red-800 transition"
                title="Delete"
                onClick={() => onDelete(a)} // 
              >
                <FiTrash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default List;
