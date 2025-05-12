import React from "react";
import { Link } from "react-router-dom";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import ProfileAvatar from "./ProfileAvatar";

const UserDropdown = ({ name, email, img, role, onLogout, onChangePassword }) => {
  return (
    <div className="absolute right-0 mt-2 w-64 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center mb-2">
          <ProfileAvatar name={name} img={img} />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{name}</p>
            <p className="text-xs text-gray-500">{email}</p>
          </div>
        </div>
      </div>

      <div className="py-1">
        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          <div className="flex items-center">
            <FiUser className="mr-2" /> Profile
          </div>
        </Link>

        {role === "staff" && (
          <Link to="/staff/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <div className="flex items-center">
              <FiSettings className="mr-2" /> Staff Site
            </div>
          </Link>
        )}

        {role === "admin" && (
          <Link to="/admin/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <div className="flex items-center">
              <FiSettings className="mr-2" /> Admin Site
            </div>
          </Link>
        )}

        <button
          onClick={onChangePassword}
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <div className="flex items-center">
            <FiSettings className="mr-2" /> Change Password
          </div>
        </button>

        <button
          onClick={onLogout}
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <div className="flex items-center">
            <FiLogOut className="mr-2" /> Logout
          </div>
        </button>
      </div>
    </div>
  );
};

export default UserDropdown;
