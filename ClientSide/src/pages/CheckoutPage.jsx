import React from "react";

const CheckoutPage = () => {
  return (
    <div className="bg-gray-100 font-sans min-h-screen">
      <div className="max-w-7xl mx-auto p-6 md:p-12">
        <h1 className="text-3xl font-bold mb-8 text-center text-purple-700">
          Checkout
        </h1>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Billing & Shipping Info */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Billing & Shipping Information
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-600">First Name</label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full p-3 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-600">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  className="w-full p-3 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-600">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-600">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full p-3 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-600">Shipping Address</label>
                <textarea
                  placeholder="Enter your address..."
                  className="w-full p-3 border rounded"
                  rows="2"
                ></textarea>
              </div>
            </form>
          </div>

          {/* Order Summary & Payment */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Your Order
            </h2>

            {/* Order Items */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between border-b pb-2">
                <span>Atomic Habits x2</span>
                <span>Rs 1000</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>The Subtle Art x1</span>
                <span>Rs 750</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Rich Dad Poor Dad x1</span>
                <span>Rs 600</span>
              </div>
              <div className="flex justify-between border-t pt-4 font-bold text-lg">
                <span>Total</span>
                <span>Rs 2350</span>
              </div>
            </div>

            {/* Payment Method */}
            <h3 className="text-lg font-semibold mb-2 text-gray-700">
              Payment Method
            </h3>
            <div className="space-y-3 mb-6">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  className="accent-purple-600"
                  defaultChecked
                />
                <span>Cash on Delivery</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  className="accent-purple-600"
                />
                <span>eSewa / Khalti</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  className="accent-purple-600"
                />
                <span>Bank Transfer</span>
              </label>
            </div>

            <button className="w-full bg-purple-600 text-white py-3 rounded hover:bg-purple-700 transition-all text-lg">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
