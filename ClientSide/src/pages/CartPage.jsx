import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { getBookById } from "../services/bookService";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        // Get cart item IDs from localStorage
        const cartIds = JSON.parse(localStorage.getItem("cart") || "[]");
        
        // Fetch details for each book in cart
        const items = await Promise.all(
          cartIds.map(async (id) => {
            const bookData = await getBookById(id);
            return {
              ...bookData.data,
              quantity: 1 // Default quantity
            };
          })
        );
        
        setCartItems(items);
        
        // Calculate total price
        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setTotalPrice(total);
        setItemCount(items.length);
        
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedItems = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedItems);
    
    // Recalculate total
    const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalPrice(total);
  };

  const removeItem = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    
    // Update localStorage
    const updatedIds = updatedItems.map(item => item.id);
    localStorage.setItem("cart", JSON.stringify(updatedIds));
    
    // Recalculate total
    const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalPrice(total);
    setItemCount(updatedItems.length);
  };

  if (loading) {
    return (
      <div className="bg-[#f4f1ea] font-sans min-h-screen flex flex-col pt-5">
        <div className="container mx-auto p-6 md:p-8 max-w-6xl">
          <div className="flex justify-center items-center h-64">
            <p>Loading your cart...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#f4f1ea] font-sans min-h-screen flex flex-col pt-5">
        <div className="container mx-auto p-6 md:p-8 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Cart Items Section */}
            <div className="w-full md:w-2/3 bg-white p-8 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold">Shopping Cart</h2>
                <p className="text-gray-600">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
              </div>

              {/* Cart Items */}
              <div className="flex flex-col gap-8 max-h-[350px] overflow-y-auto pr-2">
                {cartItems.length === 0 ? (
                  <p>Your cart is empty</p>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-gray-300/80 pb-4">
                      <img
                        src={item.imageUrl || "https://via.placeholder.com/100"}
                        alt={item.title}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        <p className="text-gray-500">
                          {item.authors.map(author => author.name).join(", ")}
                        </p>
                        <button 
                          className="text-red-500 text-sm hover:underline"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          className="px-2 py-1 bg-gray-200 rounded"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button 
                          className="px-2 py-1 bg-gray-200 rounded"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold">Rs {(item.price * item.quantity).toFixed(2)}</p>
                        {item.isOnSale && (
                          <p className="text-gray-500 line-through">Rs {(item.price * 1.5).toFixed(2)}</p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Continue Shopping */}
              <Link
                to="/catalog"
                className="text-emerald-600 hover:underline mt-6 inline-block"
              >
                &larr; Continue Shopping
              </Link>
            </div>

            {/* Order Summary Section */}
            <div className="w-full md:w-1/3 bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <p>Items ({itemCount})</p>
                  <p>Rs {totalPrice.toFixed(2)}</p>
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
                  <p>Rs {(totalPrice + 100).toFixed(2)}</p>
                </div>
                
                <Link
                  to="/customer/checkout"
                  className={`w-full block text-center bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700 transition ${
                    cartItems.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={(e) => cartItems.length === 0 && e.preventDefault()}
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