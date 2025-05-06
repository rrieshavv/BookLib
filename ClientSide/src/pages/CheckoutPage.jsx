import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const CheckoutPage = () => {
  return (
    <>
      <NavBar theme="light" />

      <div className="bg-[#f4f1ea] font-sans min-h-screen pt-5">
        <div className="max-w-7xl mx-auto p-6 md:p-12">
          <h1 className="text-3xl font-bold mb-12 text-center text-emerald-700">
            Checkout
          </h1>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Billing & Shipping Info */}
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <h2 className="text-xl font-semibold mb-6 text-gray-700 border-b border-gray-300/40 pb-4">
                Billing & Shipping Information
              </h2>

              <form className="space-y-5">
                {[
                  { label: "First Name", type: "text", placeholder: "John" },
                  { label: "Last Name", type: "text", placeholder: "Doe" },
                  {
                    label: "Email Address",
                    type: "email",
                    placeholder: "you@example.com",
                  },
                  {
                    label: "Phone Number",
                    type: "tel",
                    placeholder: "9800000000",
                  },
                ].map((field, idx) => (
                  <div key={idx}>
                    <label className="block text-gray-600 mb-1">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-gray-600 mb-1">
                    Shipping Address
                  </label>
                  <textarea
                    placeholder="Enter your full address..."
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  ></textarea>
                </div>
              </form>
            </div>

            {/* Order Summary & Payment */}
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <h2 className="text-xl font-semibold mb-6 text-gray-700 border-b border-gray-300/40 pb-4">
                Your Order
              </h2>

              <div className="space-y-3 mb-6">
                {[
                  { item: "Atomic Habits x2", price: "Rs 1000" },
                  { item: "The Subtle Art x1", price: "Rs 750" },
                  { item: "Rich Dad Poor Dad x1", price: "Rs 600" },
                ].map((entry, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between border-b border-gray-200 pb-2 text-sm"
                  >
                    <span>{entry.item}</span>
                    <span>{entry.price}</span>
                  </div>
                ))}

                <div className="flex justify-between border-t border-gray-300/40 pt-4 font-bold text-lg">
                  <span>Total</span>
                  <span>Rs 2350</span>
                </div>
              </div>

              {/* Payment Method */}
              <h3 className="text-lg font-semibold mb-3 text-gray-700">
                Payment Method
              </h3>

              <div className="space-y-3 mb-6 text-sm">
                {[
                  "Cash on Delivery",
                  "eSewa / Khalti",
                  "Bank Transfer",
                ].map((method, idx) => (
                  <label key={idx} className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      className="accent-emerald-600"
                      defaultChecked={idx === 0}
                    />
                    <span>{method}</span>
                  </label>
                ))}
              </div>

              <button className="w-full block text-center bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700 transition">
                Place Order
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CheckoutPage;
