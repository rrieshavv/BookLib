import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCurrentDiscounts, deleteDiscount } from '../../../services/discountService';
import AdminSideBar from './AdminSideBar';
import TopNavAdmin from './TopNavAdmin';

const BookDiscountHistory = () => {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookTitle, setBookTitle] = useState('');
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const { bookId } = useParams(); 

  const fetchDiscounts = async () => {
    try {
      setLoading(true);
      console.log(`Fetching discounts for book ID: ${bookId}`);
      
      if (!bookId) {
        setError('No book ID provided');
        setLoading(false);
        return;
      }
      
      const response = await getCurrentDiscounts(bookId);
      console.log("Discounts response:", response);
      
      if (response.data && response.data.discounts) {
        setDiscounts(response.data.discounts);
        setBookTitle(response.data.discounts[0]?.bookTitle || 'Book Discounts');
      } else {
        setDiscounts([]);
        setBookTitle('Book Discounts');
      }
      
      setError(null);
    } catch (err) {
      setError('Failed to fetch discount history');
      console.error("Error fetching discounts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscounts();
  }, [bookId]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isDiscountStartingSoon = (startDate) => {
    const now = new Date();
    const start = new Date(startDate);
    
    if (start <= now) {
      return false;
    }
    
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(now.getDate() + 7);
    
    return start <= sevenDaysFromNow;
  };
  
  const getDiscountStatus = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (now >= start && now <= end) {
      return {
        text: "Active",
        className: "bg-green-100 text-green-800"
      };
    } else if (now < start && isDiscountStartingSoon(startDate)) {
      return {
        text: "Soon",
        className: "bg-blue-100 text-blue-800"
      };
    } else if (now < start) {
      return {
        text: "Scheduled",
        className: "bg-purple-100 text-purple-800"
      };
    } else {
      return {
        text: "Expired",
        className: "bg-gray-100 text-gray-800"
      };
    }
  };

  const handleAddDiscount = () => {
    navigate(`/admin/books/${bookId}/add-discount`);
  };

  const handleEditDiscount = (discountId) => {
    navigate(`/admin/books/${bookId}/edit-discount/${discountId}`);
  };

  const handleDeleteClick = async (discount) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the discount "${discount.title}"? This action cannot be undone.`);
    
    if (confirmDelete) {
      setDeleting(true);
      try {
        await deleteDiscount(discount.discountId);
        fetchDiscounts();
      } catch (err) {
        console.error("Error deleting discount:", err);
        window.alert('Failed to delete the discount. Please try again.');
      } finally {
        setDeleting(false);
      }
    }
  };

  const handleBackClick = () => {
    navigate(`/admin/books/${bookId}`);
  };

  const canEditOrDelete = (status) => {
    return status === "Soon" || status === "Scheduled" || status === "Active";
  };

  const renderDiscountHistory = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-700">Loading discount history...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
          {error}
        </div>
      );
    }

    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Discount History</h2>
          <button
            onClick={handleAddDiscount}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Discount
          </button>
        </div>

        {discounts.length === 0 ? (
          <p className="text-gray-600">No discount history found for this book.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3">Discount Title</th>
                  <th scope="col" className="px-4 py-3">Discount %</th>
                  <th scope="col" className="px-4 py-3">Start Date</th>
                  <th scope="col" className="px-4 py-3">End Date</th>
                  <th scope="col" className="px-4 py-3">Status</th>
                  <th scope="col" className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {discounts.map((discount) => {
                  const status = getDiscountStatus(discount.startDate, discount.endDate);
                  const isEditable = canEditOrDelete(status.text);
                  
                  return (
                    <tr
                      key={discount.discountId}
                      className="border-b hover:bg-gray-100 transition"
                    >
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {discount.title}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {discount.discountPercentage}%
                      </td>
                      <td className="px-4 py-3">
                        {formatDate(discount.startDate)}
                      </td>
                      <td className="px-4 py-3">
                        {formatDate(discount.endDate)}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`${status.className} text-xs font-medium mr-2 px-2.5 py-0.5 rounded`}>
                          {status.text}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditDiscount(discount.discountId)}
                            className={`p-1.5 rounded-full ${isEditable ? 'text-blue-600 hover:bg-blue-100' : 'text-gray-400 cursor-not-allowed'}`}
                            disabled={!isEditable}
                            title={isEditable ? "Edit discount" : "Cannot edit expired discounts"}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          
                          {(status.text === "Soon" || status.text === "Scheduled") && (
                            <button
                              onClick={() => handleDeleteClick(discount)}
                              className="p-1.5 text-red-600 rounded-full hover:bg-red-100"
                              title="Delete discount"
                              disabled={deleting}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSideBar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
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
            <h1 className="text-2xl font-semibold text-gray-800">
              Discount History: {bookTitle}
            </h1>
          </div>
          
          {renderDiscountHistory()}
        </main>
      </div>
    </div>
  );
};

export default BookDiscountHistory;