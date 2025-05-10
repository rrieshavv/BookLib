import React from "react";
import { Link } from "react-router-dom";

const OrdersList = ({ orders }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <h3 className="font-semibold">Order #{order.id}</h3>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-sm border-t border-gray-200 pt-3">
                <div>
                  <p>
                    <span className="font-medium">Items:</span> {order.items}
                  </p>
                  <p>
                    <span className="font-medium">Total:</span> Rs {order.total}
                  </p>
                  {order.claimCode && (
                    <p>
                      <span className="font-medium">Claim Code:</span> {order.claimCode}
                    </p>
                  )}
                </div>
                <div>
                  {order.status !== "Cancelled" && order.status !== "Completed" && (
                    <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="text-emerald-600 hover:text-emerald-800 text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">You haven't placed any orders yet.</p>
          <Link
            to="/catalog"
            className="inline-block mt-4 text-emerald-600 hover:text-emerald-800 font-medium"
          >
            Browse Books
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrdersList;
