import React, { useEffect, useState } from "react";
import AdminSideBar from "./components/AdminSideBar";
import TopNavAdmin from "./components/TopNavAdmin";
import { getAllBooks } from "../../services/bookService";
import AdminBookCard from "./components/BookCard";
import { useNavigate } from "react-router-dom";



const BooksDashboard = () => {
  const navigate = useNavigate()
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    totalPages: 1
  });
  
  useEffect(() => {
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
    
    fetchBooks();
  }, [pagination.page, pagination.size]);
  
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, page: newPage }));
    }
  };

  const handleAddNewBook = () => {
    navigate("/admin/books/add"); 
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSideBar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <TopNavAdmin />
        
        <main className="flex-1 overflow-y-auto p-6">
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
        </main>
      </div>
    </div>
  );
};

export default BooksDashboard;