import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getCustomerOrderDetails } from "../services/orderService";

const CustomerOrderDetails = () => {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      fetchOrderDetails();
    }
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      const details = await getCustomerOrderDetails(id);
      setOrderData(details.data);
    } catch (error) {
      console.error("Failed to fetch order details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Back Button */}
      <div className="mb-4">
        <Link
          to="/order-history"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          ← Back to Order History
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="text-gray-500 text-lg animate-pulse">Loading order details...</div>
        </div>
      ) : orderData ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
              <p className="text-gray-600 mt-1">Order Code: {orderData.orderCode}</p>
            </div>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Invoice: {orderData.invoiceCode}
            </div>
          </div>

          {/* Customer & Shipping Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Customer Information</h3>
              <div className="space-y-1 text-gray-700">
                <p><span className="font-medium">Name:</span> {orderData.firstName} {orderData.lastName}</p>
                <p><span className="font-medium">Phone:</span> {orderData.phoneNumber}</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
              <div className="space-y-1 text-gray-700">
                <p>{orderData.addressLine1}</p>
                {orderData.addressLine2 && <p>{orderData.addressLine2}</p>}
                <p>{orderData.city}, {orderData.state} {orderData.zipCode}</p>
                <p>{orderData.country}</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Order Items</h3>
            <div className="overflow-x-auto border rounded">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Book</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Total</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {orderData.orderItems.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-800">{item.bookName}</div>
                        {item.authorName && (
                          <div className="text-sm text-gray-500">by {item.authorName}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{item.quantity}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Rs. {item.price.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">Rs. {item.totalPrice.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <div className="flex justify-between mb-2 text-gray-700">
              <span className="font-medium">Subtotal:</span>
              <span>Rs. {orderData.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2 text-gray-700">
              <span className="font-medium">Discount:</span>
              <span className="text-red-600">-Rs. {orderData.bulkDiscount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t font-bold text-gray-900">
              <span>Grand Total:</span>
              <span>Rs. {orderData.grandTotalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-red-500 mt-10">Order not found or failed to load.</div>
      )}
    </div>
  );
};

export default CustomerOrderDetails;
