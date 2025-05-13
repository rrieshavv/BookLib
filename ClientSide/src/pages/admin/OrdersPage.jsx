import React, { useState, useEffect } from "react";
import { getAllOrders } from "../../services/orderService";
import AdminSideBar from "./components/AdminSideBar";
import TopNavAdmin from "./components/TopNavAdmin";
import { Link } from "react-router-dom";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Pending"); // Default filter

  const statusOptions = ["Pending", "Completed", "Cancelled"];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders(statusFilter);
        console.log(data);
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [statusFilter]); // Refetch when statusFilter changes

  const filteredOrders = orders.filter((order) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      order.orderId.toLowerCase().includes(searchLower) ||
      order.status.toLowerCase().includes(searchLower) ||
      order.claimCode.toLowerCase().includes(searchLower) ||
      (order.membershipCode &&
        order.membershipCode.toLowerCase().includes(searchLower))
    );
  });

  const handleGenerateInvoice = (orderId) => {
    console.log(`Generating invoice for order: ${orderId}`);
    // window.open(`/api/invoice/${orderId}`, '_blank');
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSideBar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavAdmin />
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Orders</h1>

          {/* Filters */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-64">
              <label
                htmlFor="status-filter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Status
              </label>
              <select
                id="status-filter"
                className="w-full px-4 py-2 border rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-grow">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Search
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search orders by ID, status, claim code..."
                className="w-full px-4 py-2 border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Order ID</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Amount</th>
                  <th className="py-3 px-4 text-left">Claim Code</th>
                  <th className="py-3 px-4 text-left">Membership</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr
                      key={order.orderId}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 font-mono text-sm">
                        {order.orderCode}
                      </td>
                      <td className="py-3 px-4">
                        {formatDate(order.orderDate)}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            order.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium">
                        Rs. {order.totalAmount}
                      </td>
                      <td className="py-3 px-4 font-mono">{order.claimCode}</td>
                      <td className="py-3 px-4">
                        {order.membershipCode || "N/A"}
                      </td>
                      <td className="py-3 px-4">
                        <Link
                          
                          to={`/order/details?id=${order.orderId}&route=a`}
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                        >
                          Invoice
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="py-4 px-4 text-center text-gray-500"
                    >
                      No {statusFilter.toLowerCase()} orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrdersPage;
