import React, { useState } from "react";
import StaffSideBar from "./components/StaffSideBar";
import TopNavStaff from "./components/TopNavStaff";
import {
  getOrderDetails,
  processOrderConfirm,
} from "../../services/orderService";
import { toast } from "react-toastify";

const ProcessOrders = () => {
  const [searchInput, setSearchInput] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showRemarkModal, setShowRemarkModal] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    setLoading(true);
    setError(null);
    setOrderData(null);
    setDisableBtn(false);

    try {
      const [membershipId, claimCode] = searchInput.split("/");
      const result = await getOrderDetails(membershipId, claimCode);

      if (result.success) {
        setOrderData(result.data);
      } else {
        setError(result.message || "Failed to fetch order details");
      }
    } catch (err) {
      setError("Cannot process this order");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cancel = () => {
    setSearchInput("");
    setOrderData(null);
  };

  const handlePrint = () => {
    if (!orderData) return;

    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice ${orderData.invoiceCode}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .invoice-header { text-align: center; margin-bottom: 20px; }
            .invoice-title { font-size: 24px; font-weight: bold; }
            .invoice-details { margin: 20px 0; }
            .customer-info, .shipping-info { margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .summary { margin-top: 20px; }
            .total { font-weight: bold; font-size: 18px; }
            @media print {
              body { margin: 0; padding: 20px; }
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="invoice-header">
            <div class="invoice-title">INVOICE</div>
            <div>${orderData.invoiceCode}</div>
          </div>
          
          <div class="invoice-details">
            <div><strong>Order Code:</strong> ${orderData.orderCode}</div>
            <div><strong>Date:</strong> ${new Date().toLocaleDateString()}</div>
          </div>
          
          <div class="grid">
            <div class="customer-info">
              <h3>Customer Information</h3>
              <p><strong>Name:</strong> ${orderData.firstName} ${
      orderData.lastName
    }</p>
              <p><strong>Phone:</strong> ${orderData.phoneNumber}</p>
            </div>
            
            <div class="shipping-info">
              <h3>Shipping Address</h3>
              <p>${orderData.addressLine1}</p>
              ${
                orderData.addressLine2 ? `<p>${orderData.addressLine2}</p>` : ""
              }
              <p>${orderData.city}, ${orderData.state} ${orderData.zipCode}</p>
              <p>${orderData.country}</p>
            </div>
          </div>
          
          <h3>Order Items</h3>
          <table>
            <thead>
              <tr>
                <th>Book</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${orderData.orderItems
                .map(
                  (item) => `
                <tr>
                  <td>${item.bookName}</td>
                  <td>${item.quantity}</td>
                  <td>Rs. ${item.price.toFixed(2)}</td>
                  <td>Rs. ${item.totalPrice.toFixed(2)}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          
          <div class="summary">
            <div><strong>Subtotal:</strong> Rs. ${orderData.totalAmount.toFixed(
              2
            )}</div>
            <div><strong>Discount:</strong> -Rs. ${orderData.bulkDiscount.toFixed(
              2
            )}</div>
            <div class="total"><strong>Grand Total:</strong> Rs. ${orderData.grandTotalAmount.toFixed(
              2
            )}</div>
          </div>
          
          <script>
            setTimeout(() => {
              window.print();
              window.close();
            }, 200);
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleProcessOrder = () => {
    setShowRemarkModal(true);
  };

  const submitProcessOrder = async () => {
    try {
      const [membershipId, claimCode] = searchInput.split("/");
      const payload = {
        membershipId: membershipId, // Make sure this is available in orderData
        claimCode: orderData.claimCode, // Make sure this is available in orderData
        remarks: remarks,
      };
      const res = await processOrderConfirm(payload);
      if (res.success) {
        toast.success(res.message || "Order processed successfully");
      } else {
        toast.error(res.message || "Failed to process order");
      }
      setShowRemarkModal(false);
      setRemarks("");
      setDisableBtn(true);
    } catch (error) {
      toast.error("Failed to process order");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <StaffSideBar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navigation */}
        <TopNavStaff />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Process Orders
          </h1>

          {/* Search Form */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <form onSubmit={handleSearch} className="flex gap-4">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter Membership ID/Claim Code"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition"
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </form>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
              <p>{error}</p>
            </div>
          )}

          {/* Order Details */}
          {orderData && (
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Order Details
                  </h2>
                  <p className="text-gray-600">
                    Order Code: {orderData.orderCode}
                  </p>
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {orderData.invoiceCode}
                </div>
              </div>

              {/* Customer Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Customer Information
                  </h3>
                  <div className="space-y-1">
                    <p>
                      <span className="font-medium">Name:</span>{" "}
                      {orderData.firstName} {orderData.lastName}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span>{" "}
                      {orderData.phoneNumber}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Shipping Address
                  </h3>
                  <div className="space-y-1">
                    <p>{orderData.addressLine1}</p>
                    {orderData.addressLine2 && <p>{orderData.addressLine2}</p>}
                    <p>
                      {orderData.city}, {orderData.state} {orderData.zipCode}
                    </p>
                    <p>{orderData.country}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Order Items</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Book
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orderData.orderItems.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">
                              {item.bookName}
                            </div>
                            {item.authorName && (
                              <div className="text-sm text-gray-500">
                                by {item.authorName}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Rs. {item.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            Rs. {item.totalPrice.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Subtotal:</span>
                  <span>Rs. {orderData.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Discount:</span>
                  <span className="text-red-600">
                    -Rs. {orderData.bulkDiscount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="font-bold">Grand Total:</span>
                  <span className="font-bold">
                    Rs. {orderData.grandTotalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={cancel}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                >
                  Print Invoice
                </button>
                <button
                  onClick={handleProcessOrder}
                  className={`px-4 py-2 rounded-md transition ${
                    disableBtn
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                  disabled={disableBtn}
                >
                  Proceed
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Remark Modal */}
      {showRemarkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Remarks</h2>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter any remarks about this order..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              rows={4}
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowRemarkModal(false);
                  setRemarks("");
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={submitProcessOrder}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessOrders;
