import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBookById } from '../../../services/bookService';
import AdminSideBar from './AdminSideBar';
import TopNavAdmin from './TopNavAdmin';
import BookEditForm from './BookEditForm';

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        const response = await getBookById(id);
        if (response.code === 0) {
          setBook(response.data);
        } else {
          setError('Book not found');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch book details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBookDetails();
    }
  }, [id]);

  const handleBackClick = () => {
    navigate('/admin/books');
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSideBar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavAdmin />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center mb-6">
            <button
              onClick={handleBackClick}
              className="mr-4 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <h1 className="text-2xl font-semibold text-gray-800">Book Details</h1>
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
              {isEditing ? (
                <BookEditForm 
                  book={book} 
                  onCancel={toggleEditMode} 
                  onSuccess={(updatedBook) => {
                    setBook(updatedBook);
                    setIsEditing(false);
                  }} 
                />
              ) : (
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0 p-6 flex justify-center md:w-1/3">
                      <img
                        className="h-64 object-cover rounded"
                        src={book?.imageUrl || '/placeholder-book.png'}
                        alt={`Cover of ${book?.title || 'Book'}`}
                      />
                    </div>
                    
                    <div className="p-6 md:w-2/3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                            {book?.genres?.map(genre => genre.name).join(', ')}
                          </div>
                          <h1 className="text-2xl font-bold text-gray-900 mt-1">
                            {book?.title}
                          </h1>
                          <p className="text-gray-600 mt-1">
                            by {book?.authors?.map(author => author.name).join(', ')}
                          </p>
                        </div>
                        <div className='flex space-x-2'>

                          {/* <button
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition">
                          Discount
                          </button> */}
                          <Link to={`/admin/books/discount/${book.id}`}>
                          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition">
                          Discount
                          </button>
                          </Link>

                          <button
                          onClick={toggleEditMode}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition">
                          Edit Book
                          </button>

                          <button
                          onClick={toggleEditMode}
                          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded transition">
                           Inventory
                          </button>



                          

                        </div>
                        
                          


                      </div>
                      
                      <div className="mt-6">
                        <h2 className="text-lg font-semibold text-gray-800">Description</h2>
                        <p className="mt-2 text-gray-600">{book?.description}</p>
                      </div>
                      
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        <div>
                          <p className="text-sm text-gray-500">ISBN</p>
                          <p className="font-medium">{book?.isbn}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Publication Date</p>
                          <p className="font-medium">{book?.publicationDate ? formatDate(book.publicationDate) : ''}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Format</p>
                          <p className="font-medium">{book?.format}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Language</p>
                          <p className="font-medium">{book?.language}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Publishers</p>
                          <p className="font-medium">{book?.publishers?.map(p => p.name).join(', ')}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Stock Quantity</p>
                          <p className="font-medium">{book?.stockQty} available</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Created</p>
                          <p className="font-medium">
                            {book?.createdDate ? formatDate(book.createdDate) : ''} by {book?.createdBy}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Last Updated</p>
                          <p className="font-medium">
                            {book?.updatedDate ? formatDate(book.updatedDate) : ''} by {book?.updatedBy}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-gray-900">
                            ${book?.price?.toFixed(2)}
                          </span>
                          
                          {book?.isOnSale && (
                            <span className="ml-3 bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                              On Sale
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default BookDetailPage;