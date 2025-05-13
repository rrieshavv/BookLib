import React, { useEffect, useState } from "react";
import TopNavStaff from "./components/TopNavStaff";
import StaffSideBar from "./components/StaffSideBar";
import { getAuthData } from "../../utils/authStorage";
import { Link } from "react-router-dom";
import { getStaffDashboard } from "../../services/dashboardService";
import { toast } from "react-toastify";

const StaffDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { username } = getAuthData();
  const staffName = username.toUpperCase();

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await getStaffDashboard();
      setData(res);
    } catch {
      toast.error("Error loading dashboard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <StaffSideBar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNavStaff />

        <main className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="text-center text-gray-500 text-lg py-20 animate-pulse">
              Loading dashboard...
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                  Welcome back, {staffName}!
                </h1>
                <p className="text-gray-600">Here's what's happening today.</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-medium text-gray-700">Pending Orders</h3>
                  <p className="text-3xl font-bold text-blue-600">
                    {data?.pendingOrders ?? 0}
                  </p>
                  <p className="text-gray-500 mt-2">Need your attention</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-medium text-gray-700">Completed Today</h3>
                  <p className="text-3xl font-bold text-green-600">
                    {data?.completedToday ?? 0}
                  </p>
                  <p className="text-gray-500 mt-2">Great job!</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Quick Actions
                </h2>
                <div className="flex space-x-4">
                  <Link
                    to="/staff/process-orders"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Process New Orders
                  </Link>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default StaffDashboard;
