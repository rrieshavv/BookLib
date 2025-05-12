import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBookById } from "../services/bookService";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalOriginalPrice, setTotalOriginalPrice] = useState(0); // For showing savings
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
        localStorage.removeItem("cartQty");
    const fetchCartItems = async () => {
      try {
        const cartIds = JSON.parse(localStorage.getItem("cart") || "[]");
        const items = await Promise.all(
          cartIds.map(async (id) => {
            const bookData = await getBookById(id);
            return {
              ...bookData.data,
              quantity: 1,
            };
          })
        );

        setCartItems(items);

        // Calculate both original and discounted totals
        const { originalTotal, discountedTotal } = items.reduce(
          (totals, item) => {
            const price = item.currentDicountedPrice || item.price;
            totals.discountedTotal += price * item.quantity;
            totals.originalTotal += item.price * item.quantity;
            return totals;
          },
          { originalTotal: 0, discountedTotal: 0 }
        );

        setTotalPrice(discountedTotal);
        setTotalOriginalPrice(originalTotal);
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

    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedItems);

    // Recalculate both totals
    const { originalTotal, discountedTotal } = updatedItems.reduce(
      (totals, item) => {
        const price = item.currentDicountedPrice || item.price;
        totals.discountedTotal += price * item.quantity;
        totals.originalTotal += item.price * item.quantity;
        return totals;
      },
      { originalTotal: 0, discountedTotal: 0 }
    );

    setTotalPrice(discountedTotal);
    setTotalOriginalPrice(originalTotal);
    setItemCount(updatedItems.reduce((sum, item) => sum + item.quantity, 0));
  };

  const removeItem = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);

    const updatedIds = updatedItems.map((item) => item.id);
    localStorage.setItem("cart", JSON.stringify(updatedIds));

    const { originalTotal, discountedTotal } = updatedItems.reduce(
      (totals, item) => {
        const price = item.currentDicountedPrice || item.price;
        totals.discountedTotal += price * item.quantity;
        totals.originalTotal += item.price * item.quantity;
        return totals;
      },
      { originalTotal: 0, discountedTotal: 0 }
    );

    setTotalPrice(discountedTotal);
    setTotalOriginalPrice(originalTotal);
    setItemCount(updatedItems.length);
  };

  const ClearCart = () => {
    localStorage.removeItem("cart");
    setCartItems([]);
    setItemCount(0);
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
                <h2 className="text-2xl md:text-3xl font-bold">
                  Shopping Cart
                </h2>
                <p className="text-gray-600">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </p>
              </div>

              {/* Cart Items */}
              <div className="flex flex-col gap-8 max-h-[350px] overflow-y-auto pr-2">
                {cartItems.length === 0 ? (
                  <p>Your cart is empty</p>
                ) : (
                  cartItems.map((item) => {
                    const displayPrice =
                      item.currentDicountedPrice || item.price;
                    const totalPrice = displayPrice * item.quantity;
                    const originalTotalPrice = item.price * item.quantity;

                    return (
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-gray-300/80 pb-4"
                      >
                        <img
                          src={
                            item.imageUrl || "https://via.placeholder.com/100"
                          }
                          alt={item.title}
                          className="w-24 h-24 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold">
                            {item.title}
                          </h3>
                          <p className="text-gray-500">
                            {item.authors
                              ?.map((author) => author.name)
                              .join(", ")}
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
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            -
                          </button>
                          <span className="px-4">{item.quantity}</span>
                          <button
                            className="px-2 py-1 bg-gray-200 rounded"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          {item.currentDicountedPrice ? (
                            <div className="flex flex-col items-end">
                              <p className="text-lg font-semibold">
                                Rs {totalPrice.toFixed(2)}
                              </p>
                              <p className="text-gray-500 line-through text-sm">
                                Rs {originalTotalPrice.toFixed(2)}
                              </p>
                            </div>
                          ) : (
                            <p className="text-lg font-semibold">
                              Rs {totalPrice.toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })
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
                  <p>Rs {totalOriginalPrice.toFixed(2)}</p>
                </div>

                {totalOriginalPrice !== totalPrice && (
                  <div className="flex justify-between text-emerald-600">
                    <p>Discount</p>
                    <p>- Rs {(totalOriginalPrice - totalPrice).toFixed(2)}</p>
                  </div>
                )}

                <div className="flex justify-between font-bold text-lg border-t border-gray-300/80 pt-4">
                  <p>Total Cost</p>
                  <div className="flex flex-col items-end">
                    <p>Rs {totalPrice.toFixed(2)}</p>
                    {totalOriginalPrice !== totalPrice && (
                      <p className="text-gray-500 line-through text-sm font-normal">
                        Rs {totalOriginalPrice.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>

                <Link
                  to="/customer/checkout"
                  className={`w-full block text-center bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700 transition ${
                    cartItems.length === 0
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  onClick={(e) => {
                    if (cartItems.length === 0) {
                      e.preventDefault();
                    } else {
                      const cartQtyData = cartItems.map((item) => ({
                        id: item.id,
                        quantity: item.quantity,
                      }));
                      localStorage.setItem(
                        "cartQty",
                        JSON.stringify(cartQtyData)
                      );
                    }
                  }}
                >
                  Checkout
                </Link>

                <button
                  className={`w-full block text-center bg-slate-600 text-white px-6 py-2 rounded hover:bg-red-700 transition ${
                    cartItems.length === 0
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  onClick={ClearCart}
                >
                  Empty Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
