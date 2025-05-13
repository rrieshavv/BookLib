import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer";
import { getBookById } from "../services/bookService";
import { placeOrder } from "../services/orderService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAuthData, getRole } from "../utils/authStorage";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalOriginalPrice, setTotalOriginalPrice] = useState(0);
  const [bulkDiscount, setBulkDiscount] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "Nepal",
    state: "",
    zip: "",
    city: "",
    addrLine1: "",
    addrLine2: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartQty = JSON.parse(localStorage.getItem("cartQty") || "[]");

        const items = await Promise.all(
          cartQty.map(async ({ id, quantity }) => {
            const bookData = await getBookById(id);
            return {
              ...bookData.data,
              quantity: quantity || 1, // default to 1 if missing
            };
          })
        );

        setCartItems(items);
        calculateTotals(items);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotals = (items) => {
    const { originalTotal, discountedTotal } = items.reduce(
      (totals, item) => {
        const price = item.currentDicountedPrice || item.price;
        totals.discountedTotal += price * item.quantity;
        totals.originalTotal += item.price * item.quantity;
        return totals;
      },
      { originalTotal: 0, discountedTotal: 0 }
    );

    let finalTotal = discountedTotal;
    let bulkDiscountAmount = 0;

    if (items.length > 5) {
      bulkDiscountAmount = finalTotal * 0.05;
      finalTotal -= bulkDiscountAmount;
      setBulkDiscount(bulkDiscountAmount);
    } else {
      setBulkDiscount(0);
    }

    setTotalPrice(finalTotal);
    setTotalOriginalPrice(originalTotal);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    setProcessing(true);
    const { token } = getAuthData();
    if (token == null) {
      toast.warning("Login first to place your order.");
      navigate("/login");
      return;
    }

    // ✅ Basic form validation
    const requiredFields = [
      "firstName",
      "lastName",
      "country",
      "state",
      "zip",
      "city",
      "addrLine1",
      "phoneNumber",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.warning(`Please fill in the ${field} field.`);
        setProcessing(false);
        return;
      }
    }

    try {
      // Prepare order items from cart
      const orderItems = cartItems.map((item) => ({
        bookId: item.id,
        quantity: item.quantity,
      }));

      // Combine form data with order items
      const completeOrderData = {
        ...formData,
        orderItems,
      };

      const result = await placeOrder(completeOrderData);
      if (result.success) {
        toast.success("Order placed successfully.");
        localStorage.removeItem("cartQty"); // Clear cart after successful order
        navigate("/");
      } else {
        setProcessing(false);
        toast.error(result.message);
      }
    } catch (error) {
      setProcessing(false);
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="bg-[#f4f1ea] font-sans min-h-screen flex flex-col pt-5">
        <div className="container mx-auto p-6 md:p-8 max-w-6xl">
          <div className="flex justify-center items-center h-64">
            <p>Loading your order...</p>
          </div>
        </div>
      </div>
    );
  }

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
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Ramesh"
                        className="w-full pl-10 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Shrestha"
                        className="w-full pl-10 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="+977 9800000000"
                      className="w-full pl-10 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Address Line 1
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="addrLine1"
                      value={formData.addrLine1}
                      onChange={handleInputChange}
                      placeholder="Street, Tole, House No."
                      className="w-full pl-10 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Address Line 2 (Optional)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="addrLine2"
                      value={formData.addrLine2}
                      onChange={handleInputChange}
                      placeholder="Apartment, Suite, etc."
                      className="w-full pl-10 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="form-group">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Province/State
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full pl-10 p-3 bg-gray-50 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-sm"
                        required
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
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      City/District
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Kathmandu"
                        className="w-full pl-10 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      ZIP Code
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        placeholder="44600"
                        className="w-full pl-10 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-base"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Country
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full pl-10 p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 text-base"
                      readOnly
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
                {cartItems.length === 0 ? (
                  <p>Your cart is empty</p>
                ) : (
                  <>
                    {cartItems.map((item) => {
                      const displayPrice =
                        item.currentDicountedPrice || item.price;
                      const totalPrice = displayPrice * item.quantity;
                      const originalTotalPrice = item.price * item.quantity;

                      return (
                        <div
                          key={item.id}
                          className="flex justify-between items-center"
                        >
                          <span className="truncate">
                            {item.title} ×{item.quantity}
                          </span>
                          <div className="flex flex-col items-end">
                            <span>Rs {totalPrice.toFixed(2)}</span>
                            {item.currentDicountedPrice && (
                              <span className="text-gray-500 line-through text-xs">
                                Rs {originalTotalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {/* Discounts */}
                    {totalOriginalPrice !== totalPrice + bulkDiscount && (
                      <div className="flex justify-between text-emerald-600 pt-2">
                        <span>Product Discount</span>
                        <span>
                          - Rs{" "}
                          {(
                            totalOriginalPrice -
                            (totalPrice + bulkDiscount)
                          ).toFixed(2)}
                        </span>
                      </div>
                    )}

                    {bulkDiscount > 0 && (
                      <div className="flex justify-between text-emerald-600">
                        <span>Bulk Discount (5%)</span>
                        <span>- Rs {bulkDiscount.toFixed(2)}</span>
                      </div>
                    )}

                    {/* Line above Total */}
                    <div className="border-t border-gray-300/40 my-3"></div>

                    {/* Total */}
                    <div className="flex justify-between items-center font-bold text-lg text-gray-800">
                      <span>Total</span>
                      <div className="flex flex-col items-end">
                        <span>Rs {totalPrice.toFixed(2)}</span>
                        {totalOriginalPrice !== totalPrice && (
                          <span className="text-gray-500 line-through text-sm font-normal">
                            Rs {totalOriginalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Payment Method */}
              <h3 className="text-lg font-semibold mb-3 text-gray-700">
                Payment Method
              </h3>

              <div className="space-y-3 mb-6 text-sm text-gray-700">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    className="accent-emerald-600"
                    defaultChecked
                  />
                  <span>Cash on Delivery</span>
                </label>
              </div>

              {/* Place Order Button */}
              <button
                className={`w-full text-center bg-emerald-600 text-white text-base font-medium px-6 py-3 rounded-lg hover:bg-emerald-700 transition-all ${
                  cartItems.length === 0 || processing
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={cartItems.length === 0 || processing}
                onClick={handlePlaceOrder}
              >
                {processing ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Place Order"
                )}
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
