import React from "react";
import { FiSearch } from "react-icons/fi";

const CustomerSearchBar = ({ searchTerm, setSearchTerm }) => (
  <div className="mb-6">
    <div className="relative max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Search by name, email, username, phone, or membership code..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-200"
      />
      <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      {searchTerm && (
        <button
          onClick={() => setSearchTerm("")}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      )}
    </div>
  </div>
);

export default CustomerSearchBar;
