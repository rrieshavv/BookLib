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

              <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="form-group">
                  <label className="block text-gray-700 text-sm font-medium mb-2">First Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Ramesh"
                      className="w-full pl-10 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Last Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Shrestha"
                      className="w-full pl-10 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="block text-gray-700 text-sm font-medium mb-2">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+977 9800000000"
                    className="w-full pl-10 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="block text-gray-700 text-sm font-medium mb-2">Full Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="address"
                    placeholder="Street, Tole, House No."
                    className="w-full pl-10 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
              <div className="form-group">
              <label className="block text-gray-700 text-sm font-medium mb-2">Province</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <select 
                  name="province" 
                  className="w-full pl-10 p-3 bg-gray-50 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-sm"
                >
                  <option value="">Select Province</option>
                  <option value="province1">Province 1</option>
                  <option value="madhesh">Madhesh</option>
                  <option value="bagmati">Bagmati</option>
                  <option value="gandaki">Gandaki</option>
                  <option value="lumbini">Lumbini</option>
                  <option value="karnali">Karnali</option>
                  <option value="sudurpashchim">Sudurpashchim</option>
                </select>
              </div>
            </div>

                <div className="form-group">
                  <label className="block text-gray-700 text-sm font-medium mb-2">District</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="district"
                      placeholder="Kathmandu"
                      className="w-full pl-10 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Municipality / Ward</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="municipality"
                      placeholder="Budhanilkantha-1"
                      className="w-full pl-10 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-base"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="block text-gray-700 text-sm font-medium mb-2">Country</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="country"
                    value="Nepal"
                    disabled
                    className="w-full pl-10 p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 text-base"
                  />
                </div>
              </div>
            </form>


            </div>

            {/* Order Summary & Payment */}
            <div className="bg-white p-8 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-6 text-gray-700 border-b border-gray-300/40 pb-4">
              Your Order
            </h2>

            {/* Order Items */}
            <div className="space-y-2 mb-6 text-sm text-gray-700">
              {[
                { item: "Atomic Habits x2", price: "Rs 1000" },
                { item: "The Subtle Art x1", price: "Rs 750" },
                { item: "Rich Dad Poor Dad x1", price: "Rs 600" },
              ].map((entry, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="truncate">{entry.item}</span>
                  <span>{entry.price}</span>
                </div>
              ))}

              {/* Line above Total */}
              <div className="border-t border-gray-300/40 my-3"></div>

              {/* Total */}
              <div className="flex justify-between items-center font-bold text-lg text-gray-800">
                <span>Total</span>
                <span>Rs 2350</span>
              </div>
            </div>

            {/* Payment Method */}
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              Payment Method
            </h3>

            <div className="space-y-3 mb-6 text-sm text-gray-700">
              {["Cash on Delivery"].map(
                (method, idx) => (
                  <label key={idx} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      className="accent-emerald-600"
                      defaultChecked={idx === 0}
                    />
                    <span>{method}</span>
                  </label>
                )
              )}
            </div>

            {/* Place Order Button */}
            <button className="w-full text-center bg-emerald-600 text-white text-base font-medium px-6 py-3 rounded-lg hover:bg-emerald-700 transition-all">
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
