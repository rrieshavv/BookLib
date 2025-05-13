import React, { useEffect, useState } from "react";
import { getAllBooks } from "../services/bookService";
import { Link, useNavigate } from "react-router-dom";

const BookPreview = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [cartIds, setCartIds] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const response = await getAllBooks(1, 4);
        if (response && response.data && response.data.books) {
          setBooks(response.data.books.slice(0, 4));
        } else {
          setError("No books found.");
        }
      } catch (err) {
        setError("Error fetching books.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
    setCartIds(JSON.parse(localStorage.getItem("cart") || "[]"));
    setFavoriteIds(JSON.parse(localStorage.getItem("favorites") || "[]"));
  }, []);

  const handleAddToCart = (bookId) => {
    let updatedCart;
    if (cartIds.includes(bookId)) {
      updatedCart = cartIds.filter((id) => id !== bookId);
    } else {
      updatedCart = [...cartIds, bookId];
    }
    setCartIds(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleAddToFavorites = (bookId) => {
    let updatedFavorites;
    if (favoriteIds.includes(bookId)) {
      updatedFavorites = favoriteIds.filter((id) => id !== bookId);
    } else {
      updatedFavorites = [...favoriteIds, bookId];
    }
    setFavoriteIds(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-600"></div>
          <p className="mt-2 text-emerald-600">Loading books...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-bold text-gray-800">Featured Books</h2>
            <p className="text-gray-600 mt-2">
              Our handpicked selection just for you
            </p>
          </div>
          <button
            onClick={() => navigate("/catalog")}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition flex items-center gap-2 shadow-md"
          >
            Browse Catalog
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {error ? (
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="text-red-600 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {books.map((book) => {
              console.log("Book authors:", book.authors);
              console.log("Book publishers:", book.publishers);
              return (
                <div
                  key={book.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 flex flex-col overflow-hidden border border-gray-100"
                >
                  <div className="relative h-64 bg-gray-100 overflow-hidden group">
                    <img
                      src={book.imageUrl || "/api/placeholder/240/320"}
                      alt={book.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-300"
                    />
                    <button
                      onClick={() => handleAddToFavorites(book.id)}
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
                    >
                      {favoriteIds.includes(book.id) ? (
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-red-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                          <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                        </svg>
                      ) : (
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400 hover:text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                          <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                        </svg>
                      )}
                    </button>
                  </div>

                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-xl text-gray-800 line-clamp-2 hover:text-emerald-600 transition">
                          <Link to={`/books/${book.id}`}>{book.title}</Link>
                        </h3>
                        {book.stockQty > 0 ? (
                          <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                            In Stock
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                            Out of Stock
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        By{" "}
                        <span className="text-emerald-600">
                          {book.authors && book.authors.length > 0
                            ? book.authors.map(a => a.name).join(", ")
                            : "Unknown Author"}
                        </span>
                      </p>
                      {book.publishers && book.publishers.length > 0 && (
                        <p className="text-xs text-gray-500 mt-1">
                          Publishers: {book.publishers.map(p => p.name).join(", ")}
                        </p>
                      )}
                      {book.genres && book.genres.length > 0 && (
                        <p className="text-xs text-gray-500 mt-1">
                          Genres: {book.genres.map(g => g.name).join(", ")}
                        </p>
                      )}
                      <div className="mt-4">
                        {book.currentDicountedPrice ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xl line-through text-gray-500">
                            Rs. {book.price}
                          </span>
                          <span className="text-2xl font-bold text-emerald-700">
                            Rs. {book.currentDicountedPrice.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-2xl font-bold text-emerald-700">
                            Rs. {book.price}
                          </span>
                        )}
                    </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      <button
                        onClick={() => handleAddToCart(book.id)}
                        disabled={book.stockQty <= 0}
                        className={`flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium rounded-lg transition
                          ${
                          book.stockQty <= 0
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : cartIds.includes(book.id)
                              ? "bg-emerald-600 text-white hover:bg-emerald-700"
                              : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                        }`}
                      >
                        {cartIds.includes(book.id) ? (
                          <>
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                              <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                            </svg>
                            Remove from Cart
                          </>
                        ) : (
                          <>
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                              <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                            </svg>
                            Add to Cart
                          </>
                        )}
                      </button>

                      <Link to={`/books/${book.id}`} className="block">
                        <button className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition">
                          View Details
                          <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                          </svg>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {books.length > 0 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => navigate("/catalog")}
              className="px-6 py-3 text-emerald-600 border border-emerald-600 rounded-lg hover:bg-emerald-50 transition flex items-center gap-2"
            >
              View All Books
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookPreview;
