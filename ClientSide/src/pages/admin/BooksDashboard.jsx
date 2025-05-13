import React, { useEffect, useState } from "react";
import AdminSideBar from "./components/AdminSideBar";
import TopNavAdmin from "./components/TopNavAdmin";
import { getAllBooks } from "../../services/bookService";
import AdminBookCard from "./components/BookCard";
import BookMetadataSection from "./components/BookMetadata/BookMetadataSection";
import { useNavigate } from "react-router-dom";

const BooksDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("books");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    totalPages: 1
  });
  
  useEffect(() => {
    if (activeTab === "books") {
      fetchBooks();
    }
  }, [activeTab, pagination.page, pagination.size]);
  
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await getAllBooks(pagination.page, pagination.size);
      setBooks(response.data.books);
      setPagination(prev => ({
        ...prev,
        totalPages: response.data.totalPages
      }));
    } catch (err) {
      setError(err.message || "Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };
  
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, page: newPage }));
    }
  };

  const handleAddNewBook = () => {
    navigate("/admin/books/add"); 
  };

  const renderContent = () => {
    switch (activeTab) {
      case "books":
        return (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">Books Management</h1>
              <button
                onClick={handleAddNewBook}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add New Book
              </button>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
                {error}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {books.map((book) => (
                    <AdminBookCard key={book.id} book={book} />
                  ))}
                </div>
                
                <div className="flex justify-between items-center mt-8">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className={`px-4 py-2 rounded ${pagination.page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                  >
                    Previous
                  </button>
                  
                  <span className="text-gray-600">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className={`px-4 py-2 rounded ${pagination.page === pagination.totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </>
        );
      case "authors":
        return <BookMetadataSection type="Author" />;
      case "publishers":
        return <BookMetadataSection type="Publisher" />;
      case "genres":
        return <BookMetadataSection type="Genre" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSideBar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavAdmin />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {["books", "authors", "publishers", "genres"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`${
                      activeTab === tab
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>
          </div>
          
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default BooksDashboard;