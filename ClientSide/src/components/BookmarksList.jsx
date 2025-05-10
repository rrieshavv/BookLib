import React from "react";
import { Link } from "react-router-dom";

const BookmarksList = ({ bookmarks, removeBookmark }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Bookmarked Books</h2>
      {bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((book) => (
            <div
              key={book.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow relative"
            >
              <button
                onClick={() => removeBookmark(book.id)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className="flex flex-col items-center">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-24 h-32 object-cover mb-3"
                />
                <h3 className="font-medium text-center">{book.title}</h3>
                <p className="text-sm text-gray-500 text-center">{book.author}</p>
                <p className="mt-2 font-semibold">Rs {book.price}</p>
                <div className="mt-3 flex space-x-2">
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded text-sm">
                    Add to Cart
                  </button>
                  <Link
                    to={`/book/${book.id}`}
                    className="border border-gray-300 hover:border-gray-400 px-3 py-1 rounded text-sm"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">You haven't bookmarked any books yet.</p>
          <Link
            to="/catalog"
            className="inline-block mt-4 text-emerald-600 hover:text-emerald-800 font-medium"
          >
            Browse Books
          </Link>
        </div>
      )}
    </div>
  );
};

export default BookmarksList;
