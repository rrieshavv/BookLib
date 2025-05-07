import React, { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import { getAllBooks } from "../services/bookService";

const Catalog = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [allBooks, setAllBooks] = useState([]);
  const [filterBooks, setFilterBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    author: "",
    genre: "",
    format: "",
    minPrice: "",
    maxPrice: "",
    language: "",
    inStock: false,
    publisher: "",
    search: "",
    sortBy: "popularity",
  });
  const pageSize = 12;

  // Fetching all books
  useEffect(() => {
    fetchAllBooks();
  }, []);

  const fetchAllBooks = async () => {
    try {
      const response = await getAllBooks(1, 500);
      if (response && response.data && response.data.books) {
        const books = response.data.books;
        setAllBooks(books);
        setFilterBooks(books); // Initializiing filterBooks with all books
        setTotalPages(Math.ceil(books.length / pageSize));
      } else {
        setError("No books found.");
      }
    } catch (err) {
      setError("Error connecting to the books API");
      console.error("Error fetching books:", err);
    } finally {
      setLoading(false);
    }
  };

  // Applying filters
  useEffect(() => {
    applyFilters();
  }, [filters, allBooks]);

  const applyFilters = () => {
    let filtered = [...allBooks];

    // Applying filters based on backend data fields
    // Filter by author
    if (filters.author) {
      const filterAuthor = filters.author.toLowerCase(); // Normalize filter
      filtered = filtered.filter((book) =>
        book.authors.some(
          (author) => author.name.toLowerCase() === filterAuthor // Normalize data
        )
      );
    }

    // Filter by genre
    if (filters.genre) {
      const filterGenre = filters.genre.toLowerCase(); // Normalize filter
      filtered = filtered.filter((book) =>
        book.genres.some(
          (genre) => genre.name.toLowerCase() === filterGenre // Normalize data
        )
      );
    }

    // Filter by publisher
    if (filters.publisher) {
      const filterPublisher = filters.publisher.toLowerCase(); // Normalize filter
      filtered = filtered.filter((book) =>
        book.publishers.some(
          (publisher) => publisher.name.toLowerCase() === filterPublisher // Normalize data
        )
      );
    }


    if (filters.format) {
      filtered = filtered.filter((book) => book.format === filters.format);
    }


    if (filters.minPrice) {
      filtered = filtered.filter(
        (book) => book.price >= parseFloat(filters.minPrice)
      );
    }


    if (filters.maxPrice) {
      filtered = filtered.filter(
        (book) => book.price <= parseFloat(filters.maxPrice)
      );
    }


    if (filters.language) {
      filtered = filtered.filter((book) => book.language === filters.language);
    }


    if (filters.inStock) {
      filtered = filtered.filter((book) => book.stockQty > 0);
    }



    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchLower) ||
          book.isbn.includes(searchLower) ||
          book.description.toLowerCase().includes(searchLower)
      );
    }

    // Applying sorting
    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort(
          (a, b) => new Date(b.publicationDate) - new Date(a.publicationDate)
        );
        break;
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // Default sorting (e.g., popularity) can be implemented if API provides it
        break;
    }

    setFilterBooks(filtered);
    setTotalPages(Math.ceil(filtered.length / pageSize));
    setCurrentPage(1); // Reset to first page after filtering
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      author: "",
      genre: "",
      format: "",
      minPrice: "",
      maxPrice: "",
      language: "",
      inStock: false,
      publisher: "",
      search: "",
      sortBy: "popularity",
    });
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleAddToCart = (book) => {
    console.log("Adding book to cart:", book);
  };

  const handleViewDetails = (bookId) => {
    console.log("Viewing book details:", bookId);
  };

  // Geting current page books
  const indexOfLastBook = currentPage * pageSize;
  const indexOfFirstBook = indexOfLastBook - pageSize;
  const currentBooks = filterBooks.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-7xl mx-auto">
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
              {/* Author */}
              <div>
                <label className="block mb-1 font-medium">Author</label>
                <select
                  name="author"
                  value={filters.author}
                  onChange={handleFilterChange}
                  className="w-full border p-2 rounded"
                >
                  <option value="">All Authors</option>
                  <option value="Robert Kaysaki">Robert Kaysaki</option>
                  <option value="Jane Austen">Jane Austen</option>
                </select>
              </div>

              {/* Genre */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Genre
                </label>
                <select
                  name="genre"
                  value={filters.genre}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
                >
                  <option value="">All Genres</option>
                  <option value="fiction">Fiction</option>
                  <option value="non-fiction">Non-Fiction</option>
                  <option value="fantasy">Fantasy</option>
                  <option value="mystery">Mystery</option>
                  <option value="finance">Finance</option>
                </select>
              </div>

              {/* Format */}
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

              {/* Price Range */}
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

              {/* Language */}
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

              {/* Availability */}
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
                </div>
              </div>

              {/* Publisher */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Publisher
                </label>
                <select
                  name="publisher"
                  value={filters.publisher}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
                >
                  <option value="">All Publishers</option>
                  <option value="Plata Publishing">Plata Publishing</option>
                  <option value="harpercollins">HarperCollins</option>
                  <option value="simon">Simon & Schuster</option>
                </select>
              </div>

              {/* Search */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Search
                </label>
                <input
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  type="text"
                  placeholder="Title, ISBN or Description"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
                />
              </div>
            </div>

            {/* Sorting & Apply Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
              <div className="w-full md:w-auto">
                <label className="block text-sm font-semibold mb-2">
                  Sort By
                </label>
                <select
                  name="sortBy"
                  value={filters.sortBy}
                  onChange={handleFilterChange}
                  className="w-full md:w-48 p-2 border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                  <option value="title">Title: A-Z</option>
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
              {currentBooks.length > 0 ? (
                currentBooks.map((book) => (
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

                      <button
                        onClick={() => handleViewDetails(book.id)}
                        className="bg-white border border-emerald-600 text-emerald-700 hover:bg-emerald-50 text-sm px-4 py-2 rounded transition"
                      >
                        View Details
                      </button>
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
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
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
