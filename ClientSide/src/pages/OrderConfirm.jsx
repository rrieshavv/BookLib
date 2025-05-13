import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OrderConfirm = () => {
  const navigate = useNavigate();
  const handleContinue = () => {
    navigate("/");
    return;
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          <FaCheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-500">Check your mail for invoice.</p>
        </div>
        <button
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
          onClick={handleContinue}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderConfirm;
