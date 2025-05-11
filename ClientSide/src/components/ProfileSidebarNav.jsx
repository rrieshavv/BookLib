import React from "react";

const ProfileSidebarNav = ({ activeTab, setActiveTab, onSignOut }) => {
  const tabs = [
    {
      key: "profile",
      label: "Account Details",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      key: "orders",
      label: "My Orders",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
          <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
        </svg>
      ),
    },
    // {
    //   key: "favourites",
    //   label: "Favourites",
    //   icon: (
    //     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
    //       <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
    //     </svg>
    //   ),
    // },
  ];

  return (
    <div className="p-4">
      <nav>
        <ul className="space-y-1">
          {tabs.map(tab => (
            <li key={tab.key}>
              <button
                onClick={() => setActiveTab(tab.key)}
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                  activeTab === tab.key
                    ? "bg-emerald-100 text-emerald-700"
                    : "hover:bg-gray-100"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            </li>
          ))}
          <li className="pt-4 mt-4 border-t border-gray-200">
            <button
              onClick={onSignOut}
              className="w-full text-left px-4 py-2 rounded-lg flex items-center text-red-600 hover:bg-red-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
              Sign Out
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProfileSidebarNav;
