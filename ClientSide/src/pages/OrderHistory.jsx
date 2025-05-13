import React, { useEffect, useState } from "react";
import {
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaTruck,
  FaReceipt,
  FaTimes,
} from "react-icons/fa";
import { getCustomerOrderHistory, cancelOrder } from "../services/orderService";
import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { toast } from "react-toastify";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelModal, setCancelModal] = useState({
    show: false,
    orderId: null,
    password: "",
    error: null,
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getCustomerOrderHistory();
        setOrders(data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async () => {
    if (!cancelModal.password) {
      setCancelModal((prev) => ({
        ...prev,
        error: "Please enter your password",
      }));
      return;
    }

    try {
      const res = await cancelOrder({
        orderId: cancelModal.orderId,
        password: cancelModal.password,
      });
      setCancelModal({
        show: false,
        orderId: null,
        password: "",
        error: null,
      });
      if (res.success) {
        setOrders(
          orders.map((order) =>
            order.orderId === cancelModal.orderId
              ? { ...order, status: "Cancelled" }
              : order
          )
        );
        toast.success("Order cancelled successfully.");
      } else {
        toast.error(res.data);
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      setCancelModal((prev) => ({
        ...prev,
        error:
          error.response?.data?.message ||
          "Failed to cancel order. Please try again.",
      }));
      toast.error(error.response?.data.data);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <FaCheckCircle className="text-green-500" />;
      case "Cancelled":
      case "Cancelled":
        return <FaTimesCircle className="text-red-500" />;
      case "Shipped":
        return <FaTruck className="text-blue-500" />;
      default:
        return <FaClock className="text-yellow-500" />;
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-red-50 rounded-lg max-w-md">
          <FaTimesCircle className="mx-auto h-12 w-12 text-red-500" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            Error loading orders
          </h3>
          <p className="mt-1 text-sm text-gray-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Cancel Confirmation Modal */}
      {cancelModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900">
              Confirm Cancellation
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to cancel this order? This action cannot be
              undone.
            </p>

            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Enter your password to confirm
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={cancelModal.password}
                onChange={(e) =>
                  setCancelModal((prev) => ({
                    ...prev,
                    password: e.target.value,
                    error: null,
                  }))
                }
              />
              {cancelModal.error && (
                <p className="mt-2 text-sm text-red-600">{cancelModal.error}</p>
              )}
            </div>

            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() =>
                  setCancelModal({
                    show: false,
                    orderId: null,
                    password: "",
                    error: null,
                  })
                }
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCancelOrder}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          <p className="mt-2 text-sm text-gray-600">
            View your recent purchases and their current status
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Order ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order.orderId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{order.orderId.substring(0, 8)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(order.orderDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          {getStatusIcon(order.status)}
                          <span className="ml-2">{order.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        Rs. {order.totalAmount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                        <Link to={`/order/details?id=${order.orderId}`} className="text-indigo-600 hover:text-indigo-900 flex items-center">
                          <FaReceipt className="mr-2" /> Invoice
                        </Link >
                        {order.status === "Pending" && (
                          <button
                            onClick={() =>
                              setCancelModal({
                                show: true,
                                orderId: order.orderId,
                                password: "",
                                error: null,
                              })
                            }
                            className="text-red-600 hover:text-red-900 flex items-center"
                          >
                            <FaTimes className="mr-2" /> Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-end">
          <Link
            to="/"
            className="mt-3 flex gap-3 items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
          >
            <FiHome />
            <span> Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
