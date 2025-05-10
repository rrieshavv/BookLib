import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const CartPage = () => {
  return (
    <>
    <div className="bg-[#f4f1ea] font-sans min-h-screen flex flex-col pt-5">
      <div className="container mx-auto p-6 md:p-8 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Cart Items Section */}
          <div className="w-full md:w-2/3 bg-white p-8 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Shopping Cart</h2>
              <p className="text-gray-600">3 items</p>
            </div>

            {/* Cart Items */}
            <div className="flex flex-col gap-8 max-h-[350px] overflow-y-auto pr-2">
              {/* Item 1 */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-gray-300/80 pb-4">
                <img
                  src="https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UF1000,1000_QL80_.jpg"
                  alt="Atomic Habits"
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">Atomic Habits</h3>
                  <p className="text-gray-500">James Clear</p>
                  <button className="text-red-500 text-sm hover:underline">
                    Remove
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 bg-gray-200 rounded">-</button>
                  <span className="px-4">2</span>
                  <button className="px-2 py-1 bg-gray-200 rounded">+</button>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">Rs 500</p>
                  <p className="text-gray-500 line-through">Rs 1000</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-gray-300/80 pb-4">

                <img
                  src="https://m.media-amazon.com/images/I/71QKQ9mwV7L.jpg"
                  alt="Subtle Art"
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">The Subtle Art</h3>
                  <p className="text-gray-500">Mark Manson</p>
                  <button className="text-red-500 text-sm hover:underline">
                    Remove
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 bg-gray-200 rounded">-</button>
                  <span className="px-4">1</span>
                  <button className="px-2 py-1 bg-gray-200 rounded">+</button>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">Rs 750</p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-gray-300/80 pb-4">

                <img
                  src="https://m.media-amazon.com/images/I/81BE7eeKzAL.jpg"
                  alt="Rich Dad Poor Dad"
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">Rich Dad Poor Dad</h3>
                  <p className="text-gray-500">Robert Kiyosaki</p>
                  <button className="text-red-500 text-sm hover:underline">
                    Remove
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 bg-gray-200 rounded">-</button>
                  <span className="px-4">1</span>
                  <button className="px-2 py-1 bg-gray-200 rounded">+</button>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">Rs 600</p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-gray-300/80 pb-4">

                <img
                  src="https://m.media-amazon.com/images/I/81BE7eeKzAL.jpg"
                  alt="Rich Dad Poor Dad"
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">Rich Dad Poor Dad</h3>
                  <p className="text-gray-500">Robert Kiyosaki</p>
                  <button className="text-red-500 text-sm hover:underline">
                    Remove
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 bg-gray-200 rounded">-</button>
                  <span className="px-4">1</span>
                  <button className="px-2 py-1 bg-gray-200 rounded">+</button>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">Rs 600</p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-gray-300/80 pb-4">

                <img
                  src="https://m.media-amazon.com/images/I/81BE7eeKzAL.jpg"
                  alt="Rich Dad Poor Dad"
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">Rich Dad Poor Dad</h3>
                  <p className="text-gray-500">Robert Kiyosaki</p>
                  <button className="text-red-500 text-sm hover:underline">
                    Remove
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 bg-gray-200 rounded">-</button>
                  <span className="px-4">1</span>
                  <button className="px-2 py-1 bg-gray-200 rounded">+</button>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">Rs 600</p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-gray-300/80 pb-4">
                <img
                  src="https://m.media-amazon.com/images/I/81BE7eeKzAL.jpg"
                  alt="Rich Dad Poor Dad"
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">Rich Dad Poor Dad</h3>
                  <p className="text-gray-500">Robert Kiyosaki</p>
                  <button className="text-red-500 text-sm hover:underline">
                    Remove
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 bg-gray-200 rounded">-</button>
                  <span className="px-4">1</span>
                  <button className="px-2 py-1 bg-gray-200 rounded">+</button>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">Rs 600</p>
                </div>
              </div>

            </div>

            {/* Continue Shopping */}
            <a
              href="/catalogue"
              className="text-emerald-600 hover:underline mt-6 inline-block"
            >
              &larr; Continue Shopping
            </a>
          </div>

          {/* Order Summary Section */}
          <div className="w-full md:w-1/3 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Order Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p>Items (4)</p>
                <p>Rs 1850</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping</p>
                <p className="text-gray-500">Standard Delivery: Rs 100</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Promo Code
                </label>
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    placeholder="Enter your code"
                    className="w-full p-2 border rounded"
                  />
                  <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    Apply
                  </button>
                </div>
              </div>
              <div className="flex justify-between font-bold text-lg border-t border-gray-300/80 pt-4">
                <p>Total Cost</p>
                <p>Rs 1950</p>
              </div>
             
              <Link
                to="/customer/checkout"
                className="w-full block text-center bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700 transition"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CartPage;
