import React, { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import { getFilteredBooks } from "../services/bookService";
import { Link } from "react-router-dom";

const Catalog = () => {
  const initialFilters = {
    searchTerm: "",
    authorIds: [],
    genreIds: [],
    publisherIds: [],
    minPrice: "",
    maxPrice: "",
    language: "",
    format: "",
    inStock: false,
    onSale: false,
    minRating: "",
    pageNumber: 1,
    pageSize: 12,
    sortOption: "title-asc",
  };

  // State management
  const [filters, setFilters] = useState(initialFilters); // Current filter inputs
  const [appliedFilters, setAppliedFilters] = useState(initialFilters); // Filters applied to API
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetching books when appliedFilters change
  useEffect(() => {
    fetchBooks();
  }, [appliedFilters]);

  // Function to fetch books from the API
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const [sortField, sortDirection] = appliedFilters.sortOption.split("-");
      const sortBy = sortField;
      const sortAscending = sortDirection === "asc";

      // Base parameters for pagination and sorting
      const params = {
        pageNumber: appliedFilters.pageNumber,
        pageSize: appliedFilters.pageSize,
        sortBy,
        sortAscending,
      };

      // Add filter parameters only if they are set
      if (appliedFilters.searchTerm)
        params.searchTerm = appliedFilters.searchTerm;
      if (appliedFilters.authorIds.length > 0)
        params.authorIds = appliedFilters.authorIds;
      if (appliedFilters.genreIds.length > 0)
        params.genreIds = appliedFilters.genreIds;
      if (appliedFilters.publisherIds.length > 0)
        params.publisherIds = appliedFilters.publisherIds;
      if (appliedFilters.minPrice)
        params.minPrice = parseFloat(appliedFilters.minPrice);
      if (appliedFilters.maxPrice)
        params.maxPrice = parseFloat(appliedFilters.maxPrice);
      if (appliedFilters.language) params.language = appliedFilters.language;
      if (appliedFilters.format) params.format = appliedFilters.format;
      if (appliedFilters.inStock) params.inStock = appliedFilters.inStock;
      if (appliedFilters.onSale) params.onSale = appliedFilters.onSale;
      if (appliedFilters.minRating)
        params.minRating = parseInt(appliedFilters.minRating);

      const response = await getFilteredBooks(params);

      if (response && response.data && response.data.data) {
        setBooks(response.data.data.books || []);
        setTotalPages(response.data.data.totalPages || 1);
      } else {
        setError("No books found.");
      }
    } catch (err) {
      setError("Error connecting to the books API");
    } finally {
      setLoading(false);
    }
  };

  // Handling changes in filter inputs and applying them immediately
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    let updatedFilters = { ...filters };

    if (
      name === "authorIds" ||
      name === "genreIds" ||
      name === "publisherIds"
    ) {
      updatedFilters[name] = value ? [value] : [];
    } else if (type === "checkbox") {
      updatedFilters[name] = checked;
    } else {
      updatedFilters[name] = value;
    }

    setFilters(updatedFilters);
    setAppliedFilters({ ...updatedFilters, pageNumber: 1 });
  };

  const applyFilters = () => {
    setAppliedFilters({ ...filters, pageNumber: 1 });
  };

  // Reset filters
  const resetFilters = () => {
    setFilters(initialFilters);
    setAppliedFilters(initialFilters);
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setAppliedFilters((prev) => ({ ...prev, pageNumber: newPage }));
    }
  };

  // Toggle filter panel visibility
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleAddToCart = (book) => {
    console.log("Adding book to cart:", book);
  };

  const handleViewDetails = (bookId) => {
    console.log("Viewing book details:", bookId);
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Book Catalogue</h2>
          <button
            onClick={toggleFilter}
            className="flex items-center bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
          >
            <Filter className="h-5 w-5 mr-2" /> Filter
          </button>
        </div>

        {/* Filter Panel */}
        {isFilterOpen && (
          <div className="bg-[#fdfaf5] p-6 rounded-lg shadow mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Author Filter */}
              <div>
                <label className="block mb-1 font-medium">Author</label>
                <select
                  name="authorIds"
                  value={filters.authorIds[0] || ""}
                  onChange={handleFilterChange}
                  className="w-full border p-2 rounded"
                >
                  <option value="">All Authors</option>
                  <option value="94a46826-4406-4b88-8181-5fa8177c9000">
                    Robert Kiyosaki
                  </option>
                  <option value="a1b2c3d4-e5f6-7890-abcd-ef1234567890">
                    Jane Austen
                  </option>
                </select>
              </div>

              {/* Genre Filter */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Genre
                </label>
                <select
                  name="genreIds"
                  value={filters.genreIds[0] || ""}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
                >
                  <option value="">All Genres</option>
                  <option value="86a902a3-a20c-4fd7-bb7b-4fc0161a51b3">
                    Finance
                  </option>
                  <option value="123e4567-e89b-12d3-a456-426614174000">
                    Fiction
                  </option>
                </select>
              </div>

              {/* Publisher Filter */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Publisher
                </label>
                <select
                  name="publisherIds"
                  value={filters.publisherIds[0] || ""}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
                >
                  <option value="">All Publishers</option>
                  <option value="38044e82-d1e8-4de6-992f-98d0a2436a62">
                    Plata Publishing
                  </option>
                  <option value="987fcdeb-1234-5678-9abc-def123456789">
                    HarperCollins
                  </option>
                </select>
              </div>

              {/* Format Filter */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Format
                </label>
                <select
                  name="format"
                  value={filters.format}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
                >
                  <option value="">All Formats</option>
                  <option value="Paperback">Paperback</option>
                  <option value="Hardcover">Hardcover</option>
                  <option value="signed">Signed Edition</option>
                  <option value="limited">Limited Edition</option>
                  <option value="deluxe">Deluxe Edition</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Price Range
                </label>
                <div className="flex items-center gap-2">
                  <input
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    type="number"
                    placeholder="Min"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
                  />
                  <span>-</span>
                  <input
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    type="number"
                    placeholder="Max"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
                  />
                </div>
              </div>

              {/* Language Filter */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Language
                </label>
                <select
                  name="language"
                  value={filters.language}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
                >
                  <option value="">All Languages</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Spanish">Spanish</option>
                </select>
              </div>

              {/* Availability Filter */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Availability
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center">
                    <input
                      name="inStock"
                      checked={filters.inStock}
                      onChange={handleFilterChange}
                      type="checkbox"
                      className="mr-2"
                    />
                    In Stock
                  </label>
                  <label className="flex items-center">
                    <input
                      name="onSale"
                      checked={filters.onSale}
                      onChange={handleFilterChange}
                      type="checkbox"
                      className="mr-2"
                    />
                    On Sale
                  </label>
                </div>
              </div>

              {/* Search Filter */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Search
                </label>
                <input
                  name="searchTerm"
                  value={filters.searchTerm}
                  onChange={handleFilterChange}
                  type="text"
                  placeholder="Title, ISBN or Description"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
                />
              </div>

              {/* Minimum Rating Filter */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Min Rating
                </label>
                <input
                  name="minRating"
                  value={filters.minRating}
                  onChange={handleFilterChange}
                  type="number"
                  min="0"
                  max="5"
                  placeholder="0-5"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
                />
              </div>
            </div>

            {/* Sorting and Action Buttons */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
              <div className="w-full md:w-auto">
                <label className="block text-sm font-semibold mb-2">
                  Sort By
                </label>
                <select
                  name="sortOption"
                  value={filters.sortOption}
                  onChange={handleFilterChange}
                  className="w-full md:w-48 p-2 border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
                >
                  <option value="title-asc">Title: A-Z</option>
                  <option value="title-desc">Title: Z-A</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="publicationDate-desc">Newest First</option>
                  <option value="popularity-desc">Popularity</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={applyFilters}
                className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
              >
                Apply Filters
              </button>
              <button
                onClick={resetFilters}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Reset
              </button>
            </div>
          </div>
        )}

        {/* Book List */}
        {loading ? (
          <p>Loading books...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <section id="book-catalog" className="bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {books.length > 0 ? (
                books.map((book) => (
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
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <p className="text-lg text-gray-600">No books found</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 space-x-4">
          <button
            disabled={appliedFilters.pageNumber === 1}
            onClick={() => handlePageChange(appliedFilters.pageNumber - 1)}
            className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {appliedFilters.pageNumber} of {totalPages}
          </span>
          <button
            disabled={appliedFilters.pageNumber === totalPages}
            onClick={() => handlePageChange(appliedFilters.pageNumber + 1)}
            className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
