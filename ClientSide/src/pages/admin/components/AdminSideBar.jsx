import React from "react";
import {
  FiHome,
  FiUsers,
  FiSettings,
  FiPieChart,
  FiShoppingBag,
  FiFileText,
  FiBell,
  FiLogOut,
  FiUser,
  FiTag,
  FiBox,
} from "react-icons/fi";
import SideBarItem from "./SideBarItem";
import { Link, useNavigate } from "react-router-dom";
import { clearAuthData } from "../../../utils/authStorage";

const AdminSideBar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    clearAuthData();
    navigate("/login");
  };
  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r">
      <div className="flex items-center justify-center h-16 border-b">
        <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
      </div>
      <div className="flex flex-col flex-grow p-4 overflow-auto">
        <nav className="flex-1 space-y-2">
          <Link to="/admin/dashboard">
            <SideBarItem
              icon={<FiHome className="h-5 w-5" />}
              text="Dashboard"
            />
          </Link>
          <Link to="/admin/books">
            <SideBarItem icon={<FiUsers className="h-5 w-5" />} text="Books" />
          </Link>
          <Link to="/admin/customers">
            <SideBarItem
              icon={<FiUser className="h-5 w-5" />}
              text="Customers"
            />
          </Link>
          <Link to="/admin/all-orders">
            <SideBarItem
              icon={<FiTag className="h-5 w-5" />}
              text="All Orders"
            />
          </Link>
          <Link to="/admin/announcements">
            <SideBarItem
              icon={<FiBell className="h-5 w-5" />}
              text="Announcements"
            />
          </Link>
          <Link to="/admin/books/discount">
            <SideBarItem
              icon={<FiTag className="h-5 w-5" />}
              text="All Discount History"
            />
          </Link>
          <Link to="/admin/inventory">
            <SideBarItem
              icon={<FiBox className="h-5 w-5" />}
              text="Inventory"
            />
          </Link>
          {/* <SideBarItem
            icon={<FiShoppingBag className="h-5 w-5" />}
            text="Products"
          />
          <SideBarItem
            icon={<FiFileText className="h-5 w-5" />}
            text="Orders"
          />
          <SideBarItem
            icon={<FiPieChart className="h-5 w-5" />}
            text="Analytics"
          />
          <SideBarItem
            icon={<FiSettings className="h-5 w-5" />}
            text="Settings"
          /> */}
        </nav>
        <div className="mt-auto mb-4">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <FiLogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );

  // Reusable components
};

export default AdminSideBar;
