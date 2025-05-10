import React, { useEffect, useState } from "react";
import { getAllBooks } from "../services/bookService";
import { Link, useNavigate } from "react-router-dom";

const BookPreview = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getAllBooks(1, 4);
        if (response && response.data && response.data.books) {
          setBooks(response.data.books.slice(0, 4));
        } else {
          setError("No books found.");
        }
      } catch (err) {
        setError("Error fetching books.");
      }
    };

    fetchBooks();
  }, []);

  const handleAddToCart = (book) => {
    console.log("Adding book to cart:", book);
  };

  

  return (
    <div className="bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Featured Books</h2>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-[#fdfaf5] p-4 rounded shadow hover:shadow-lg flex flex-col justify-between min-h-[520px] relative"
              >
                {/* Book Image */}
                <img
                  src={book.imageUrl || "/api/placeholder/240/320"}
                  alt={book.title}
                  className="w-full h-auto object-contain rounded"
                />

                {/* Book Title & Author */}
                <h3 className="mt-4 font-semibold text-lg">{book.title}</h3>
                <p className="text-sm text-gray-600">
                  By{" "}
                  {book.authors && book.authors.length > 0
                    ? book.authors[0].name
                    : "Unknown Author"}
                </p>

                {/* Book Price */}
                <div className="flex items-center mt-2 gap-2">
                  <p className="font-semibold text-emerald-700">
                    Rs. {book.price}
                  </p>
                </div>

                {/* Book Availability */}
                <div className="mt-2 flex items-center text-xs">
                  {book.stockQty > 0 ? (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                      In Stock
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex gap-2 justify-center">
                  <button
                    onClick={() => handleAddToCart(book)}
                    className={`${
                      book.stockQty > 0
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "bg-gray-400 cursor-not-allowed"
                    } text-white text-sm px-4 py-2 rounded transition`}
                    disabled={book.stockQty <= 0}
                  >
                    Add to Cart
                  </button>

                  <Link to={`/books/${book.id}`}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate("/catalog")}
            className="bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700"
          >
            Show More
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookPreview;
