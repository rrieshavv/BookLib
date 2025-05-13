import React, { useEffect, useState } from "react";
import {
  FiUsers,
  FiBook,
  FiShoppingBag,
  FiFileText,
  FiCheckCircle,
  FiXCircle,
  FiUserCheck,
} from "react-icons/fi";
import AdminSideBar from "./components/AdminSideBar";
import TopNavAdmin from "./components/TopNavAdmin";
import { getAdminDashboard } from "../../services/dashboardService";
import { toast } from "react-toastify";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await getAdminDashboard();
      setData(response);
    } catch {
      toast.error("Failed to load admin dashboard.");
    } finally {
      setLoading(false);
    }
  };

  const orderDistribution = [
    {
      name: "Pending",
      value: data?.totalPendingOrders || 0,
    },
    {
      name: "Completed",
      value: data?.totalCompletedOrders || 0,
    },
    {
      name: "Cancelled",
      value: data?.totalCancelledOrders || 0,
    },
  ];

  const barData = [
    { name: "Customers", value: data?.totalCustomers || 0 },
    { name: "Staffs", value: data?.totalStaffs || 0 },
    { name: "Books", value: data?.totalBooks || 0 },
  ];

  const pieColors = ["#facc15", "#4ade80", "#f87171"];

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSideBar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNavAdmin />

        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Dashboard Overview
            </h2>
            <p className="text-gray-600">Welcome back, Admin</p>
          </div>

          {loading ? (
            <div className="text-center text-gray-500 py-20 animate-pulse">
              Loading dashboard...
            </div>
          ) : (
            <>
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
                <StatCard title="Total Customers" value={data.totalCustomers} icon={<FiUsers />} />
                <StatCard title="Total Staffs" value={data.totalStaffs} icon={<FiUserCheck />} />
                <StatCard title="Total Books" value={data.totalBooks} icon={<FiBook />} />
                <StatCard title="Total Orders" value={data.totalOrders} icon={<FiShoppingBag />} />
                <StatCard title="Pending Orders" value={data.totalPendingOrders} icon={<FiFileText />} negative />
                <StatCard title="Completed Orders" value={data.totalCompletedOrders} icon={<FiCheckCircle />} />
                <StatCard title="Cancelled Orders" value={data.totalCancelledOrders} icon={<FiXCircle />} negative />
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pie Chart */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Order Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={orderDistribution}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {orderDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Bar Chart */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    User & Book Overview
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={barData}>
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#60a5fa" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, negative = false }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-800 mt-1">{value}</p>
      </div>
      <div
        className={`p-3 rounded-full ${
          negative ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
        }`}
      >
        {icon}
      </div>
    </div>
  </div>
);

export default AdminDashboard;
