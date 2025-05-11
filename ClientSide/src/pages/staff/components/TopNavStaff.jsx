import React from "react";
import { getAuthData } from "../../../utils/authStorage";

const TopNavStaff = () => {
  const { username } = getAuthData();
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white border-b">
      <div className="flex items-center">
        <button className="md:hidden p-2 rounded-lg focus:outline-none focus:ring">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button className="flex items-center space-x-2 focus:outline-none">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
              S
            </div>
            <span className="hidden md:inline-block">{username}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopNavStaff;
