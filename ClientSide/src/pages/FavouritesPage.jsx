import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBookById } from "../services/bookService";
import { FaTrash, FaHeart, FaRegHeart, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const FavouritesPage = () => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const fetchFavoriteItems = async () => {
      try {
        const favoriteIds = JSON.parse(
          localStorage.getItem("favorites") || "[]"
        );

        const items = await Promise.all(
          favoriteIds.map(async (id) => {
            const bookData = await getBookById(id);
            return {
              ...bookData.data,
            };
          })
        );

        setFavoriteItems(items);
        setItemCount(items.length);
      } catch (error) {
        console.error("Error fetching favorite items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteItems();
  }, []);

  const removeItem = (id) => {
    const updatedItems = favoriteItems.filter((item) => item.id !== id);
    setFavoriteItems(updatedItems);

    const updatedIds = updatedItems.map((item) => item.id);
    localStorage.setItem("favorites", JSON.stringify(updatedIds));
    setItemCount(updatedItems.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"
        ></motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">
            Your Favorites
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            {itemCount === 0
              ? "Your favorite collection is waiting to be filled"
              : `You've saved ${itemCount} precious book${
                  itemCount !== 1 ? "s" : ""
                }`}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {favoriteItems.length === 0 ? (
            <div className="p-12 text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaRegHeart className="mx-auto h-16 w-16 text-gray-300" />
              </motion.div>
              <h3 className="mt-4 text-2xl font-semibold text-gray-800">
                Your heart is empty
              </h3>
              <p className="mt-2 text-gray-500">
                Discover amazing books and add them to your favorites
              </p>
              <div className="mt-8">
                <Link
                  to="/books"
                  className="inline-flex items-center px-6 py-3 rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 group"
                >
                  Explore Books
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              <AnimatePresence>
                {favoriteItems.map((item) => (
                  <motion.li
                    key={item.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 hover:bg-gray-50/50 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className="flex-shrink-0 relative">
                          {item.imageUrl ? (
                            <img
                              className="h-20 w-14 object-cover rounded-lg shadow-sm border border-gray-100"
                              src={item.imageUrl}
                              alt={item.title}
                            />
                          ) : (
                            <div className="h-20 w-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                              <FaHeart className="text-gray-300 text-xl" />
                            </div>
                          )}
                          <div className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                            <FaHeart className="text-xs" />
                          </div>
                        </div>
                        <div>
                          <Link
                            to={`/books/${item.id}`}
                            className="text-lg font-semibold text-gray-800 hover:text-indigo-600 transition-colors"
                          >
                            {item.title}
                          </Link>
                          <p className="text-sm text-gray-600 mt-1">
                            {item.author}
                          </p>
                          <p className="text-base font-bold text-indigo-600 mt-1">
                            {item.currentDicountedPrice ? (
                              <span className="flex items-center gap-2">
                                <span className="line-through text-gray-400">
                                  Rs. {item.price?.toFixed(2) || "N/A"}
                                </span>
                                <span className="text-indigo-600">
                                  Rs. {item.currentDicountedPrice?.toFixed(2)}
                                </span>
                              </span>
                            ) : (
                              <span>Rs. {item.price?.toFixed(2) || "N/A"}</span>
                            )}
                          </p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeItem(item.id)}
                        className="p-3 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                        title="Remove from favorites"
                      >
                        <FaTrash className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </motion.div>

        {favoriteItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex justify-center"
          >
            <Link
              to="/catalog"
              className="flex items-center px-6 py-3 rounded-xl shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-50 border border-gray-200 hover:border-indigo-200 transition-all duration-300 group"
            >
              Discover More Books
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FavouritesPage;
