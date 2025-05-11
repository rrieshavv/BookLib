import SideBarItem from "../../admin/components/SideBarItem";
import { FiFileText, FiHome, FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { clearAuthData } from "../../../utils/authStorage";

const StaffSideBar = () => {
  const nav = useNavigate();
  const handleLogout = () => {
    clearAuthData();
    nav('/login');
  };
  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r">
      <div className="flex items-center justify-center h-16 border-b">
        <h1 className="text-xl font-bold text-gray-800">BookLib </h1>
      </div>
      <div className="flex flex-col flex-grow p-4 overflow-auto">
        <nav className="flex-1 space-y-2">
          <Link to="/staff/dashboard">
            <SideBarItem
              icon={<FiHome className="h-5 w-5" />}
              text="Dashboard"
            />
          </Link>
          <Link to="/staff/process-orders">
            <SideBarItem
              icon={<FiFileText className="h-5 w-5" />}
              text="Process Orders"
            />
          </Link>
        </nav>
        <div className="mt-auto mb-4">
          <button
            className="flex items-center w-full px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100"
            onClick={handleLogout}
          >
            <FiLogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffSideBar;
