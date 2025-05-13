import { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import { getFilteredBooks, getAllAuthors, getAllGenres, getAllPublishers, getAllLanguages, getAllFormats } from "../services/bookService";
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
  const [filters, setFilters] = useState(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [cartIds, setCartIds] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);

  // State for dynamic filter options
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [formats, setFormats] = useState([]);

  // Fetch filter options on component mount
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [authorsData, genresData, publishersData, languagesData, formatsData] = await Promise.all([
          getAllAuthors(),
          getAllGenres(),
          getAllPublishers(),
          getAllLanguages(),
          getAllFormats(),
        ]);
        setAuthors(authorsData.data || []);
        setGenres(genresData.data || []);
        setPublishers(publishersData.data || []);
        setLanguages(languagesData.data || []);
        setFormats(formatsData.data || []);
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };
    fetchFilterOptions();
  }, []);

  // Fetch books when appliedFilters change
  useEffect(() => {
    fetchBooks();
    setCartIds(JSON.parse(localStorage.getItem("cart") || "[]"));
    setFavoriteIds(JSON.parse(localStorage.getItem("favorites") || "[]"));
  }, [appliedFilters]);

  // Function to fetch books from the API
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const [sortField, sortDirection] = appliedFilters.sortOption.split("-");
      const sortBy = sortField;
      const sortAscending = sortDirection === "asc";

      const params = {
        pageNumber: appliedFilters.pageNumber,
        pageSize: appliedFilters.pageSize,
        sortBy,
        sortAscending,
      };

      if (appliedFilters.searchTerm) params.searchTerm = appliedFilters.searchTerm;
      if (appliedFilters.authorIds.length > 0) params.authorIds = appliedFilters.authorIds;
      if (appliedFilters.genreIds.length > 0) params.genreIds = appliedFilters.genreIds;
      if (appliedFilters.publisherIds.length > 0) params.publisherIds = appliedFilters.publisherIds;
      if (appliedFilters.minPrice) params.minPrice = parseFloat(appliedFilters.minPrice);
      if (appliedFilters.maxPrice) params.maxPrice = parseFloat(appliedFilters.maxPrice);
      if (appliedFilters.language) params.language = appliedFilters.language;
      if (appliedFilters.format) params.format = appliedFilters.format;
      if (appliedFilters.inStock) params.inStock = appliedFilters.inStock;
      if (appliedFilters.onSale) params.onSale = appliedFilters.onSale;
      if (appliedFilters.minRating) params.minRating = parseInt(appliedFilters.minRating);

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

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    let updatedFilters = { ...filters };

    if (name === "authorIds" || name === "genreIds" || name === "publisherIds") {
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

  const resetFilters = () => {
    setFilters(initialFilters);
    setAppliedFilters(initialFilters);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setAppliedFilters((prev) => ({ ...prev, pageNumber: newPage }));
    }
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleAddToCart = (bookId) => {
    let updatedCart = cartIds.includes(bookId)
      ? cartIds.filter((id) => id !== bookId)
      : [...cartIds, bookId];
    setCartIds(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleAddToFavorites = (bookId) => {
    let updatedFavorites = favoriteIds.includes(bookId)
      ? favoriteIds.filter((id) => id !== bookId)
      : [...favoriteIds, bookId];
    setFavoriteIds(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-4xl font-bold text-gray-800">Book Catalogue</h2>
            <p className="text-gray-600 mt-2">Find your next favorite read</p>
          </div>
          <button
            onClick={toggleFilter}
            className="flex items-center bg-emerald-600 text-white px-5 py-3 rounded-lg hover:bg-emerald-700 transition shadow-md"
          >
            <Filter className="h-5 w-5 mr-2" /> Filter Books
          </button>
        </div>

        {/* Filter Panel */}
        {isFilterOpen && (
          <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Author Filter */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Author</label>
                <select
                  name="authorIds"
                  value={filters.authorIds[0] || ""}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">All Authors</option>
                  {authors.map((author) => (
                    <option key={author.id} value={author.id}>
                      {author.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Genre Filter */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Genre</label>
                <select
                  name="genreIds"
                  value={filters.genreIds[0] || ""}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">All Genres</option>
                  {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                      {genre.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Publisher Filter */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Publisher</label>
                <select
                  name="publisherIds"
                  value={filters.publisherIds[0] || ""}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">All Publishers</option>
                  {publishers.map((publisher) => (
                    <option key={publisher.id} value={publisher.id}>
                      {publisher.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Format Filter */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Format</label>
                <select
                  name="format"
                  value={filters.format}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">All Formats</option>
                  {formats.map((format) => (
                    <option key={format} value={format}>
                      {format}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Price Range</label>
                <div className="flex items-center gap-2">
                  <input
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    type="number"
                    placeholder="Min"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <span>-</span>
                  <input
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    type="number"
                    placeholder="Max"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Language Filter */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Language</label>
                <select
                  name="language"
                  value={filters.language}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">All Languages</option>
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* Availability Filter */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Availability</label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      name="inStock"
                      checked={filters.inStock}
                      onChange={handleFilterChange}
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                    <span className="ml-2">In Stock</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      name="onSale"
                      checked={filters.onSale}
                      onChange={handleFilterChange}
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                    <span className="ml-2">On Sale</span>
                  </label>
                </div>
              </div>

              {/* Search Filter */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Search</label>
                <input
                  name="searchTerm"
                  value={filters.searchTerm}
                  onChange={handleFilterChange}
                  type="text"
                  placeholder="Title, ISBN or Description"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              {/* Minimum Rating Filter */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Min Rating</label>
                <input
                  name="minRating"
                  value={filters.minRating}
                  onChange={handleFilterChange}
                  type="number"
                  min="0"
                  max="5"
                  placeholder="0-5"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Sorting and Action Buttons */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4">
              <div className="w-full md:w-auto">
                <label className="block mb-2 text-sm font-medium text-gray-700">Sort By</label>
                <select
                  name="sortOption"
                  value={filters.sortOption}
                  onChange={handleFilterChange}
                  className="w-full md:w-64 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="title-asc">Title: A-Z</option>
                  <option value="title-desc">Title: Z-A</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="publicationDate-desc">Newest First</option>
                  <option value="popularity-desc">Popularity</option>
                </select>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                <button
                  onClick={applyFilters}
                  className="flex-1 md:flex-none bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition font-medium shadow-sm"
                >
                  Apply Filters
                </button>
                <button
                  onClick={resetFilters}
                  className="flex-1 md:flex-none bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Book List */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-600"></div>
            <p className="ml-2 text-emerald-600">Loading books...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-center">
            <p className="text-red-600 flex items-center justify-center gap-2">
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
          <section id="book-catalog" className="bg-gray-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {books.length > 0 ? (
                books.map((book) => (
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
                          <h3
                            className="font-bold text-xl text-gray-800 line-clamp-2 hover:text-emerald-600 transition cursor-pointer"
                            onClick={() => handleViewDetails(book.id)}
                          >
                            {book.title}
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
                              ? book.authors.map(a => a.name).join(",")
                              : "Unknown Author"}
                          </span>
                        </p>
                        <div className="mt-4">
                          <span className="text-2xl font-bold text-emerald-700">
                            Rs. {book.price}
                          </span>
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
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-gray-300 mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  <p className="text-xl text-gray-500">No books found matching your criteria</p>
                  <p className="text-gray-400 mt-2">Try adjusting your filters or search terms</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Pagination */}
        {books.length > 0 && (
          <div className="flex justify-center items-center mt-12">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                disabled={appliedFilters.pageNumber === 1}
                onClick={() => handlePageChange(appliedFilters.pageNumber - 1)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white"
              >
                Previous
              </button>
              <div className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border-t border-b border-gray-300">
                Page {appliedFilters.pageNumber} of {totalPages}
              </div>
              <button
                disabled={appliedFilters.pageNumber === totalPages}
                onClick={() => handlePageChange(appliedFilters.pageNumber + 1)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;