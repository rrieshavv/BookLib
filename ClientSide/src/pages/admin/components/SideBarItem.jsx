import React from 'react'

const SideBarItem = ({ icon, text, active = false }) => (
  <a
    href="#"
    className={`flex items-center px-4 py-2 text-sm rounded-lg ${
      active
        ? "bg-blue-50 text-blue-600 font-medium"
        : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    <span className="mr-3">{icon}</span>
    {text}
  </a>
);


export default SideBarItem