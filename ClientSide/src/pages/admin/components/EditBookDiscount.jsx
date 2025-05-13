import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDiscountByDiscountId, updateDiscount } from '../../../services/discountService';
import AdminSideBar from './AdminSideBar';
import TopNavAdmin from './TopNavAdmin';

const EditBookDiscount = () => {
  const { bookId, discountId } = useParams();
  const navigate = useNavigate();
  
  const [bookInfo, setBookInfo] = useState({
    title: '',
    loading: true,
    error: null
  });
  
  const [formData, setFormData] = useState({
    bookId: bookId,
    title: '',
    discountPercentage: '',
    startDate: '',
    endDate: ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [discountStatus, setDiscountStatus] = useState('');

  useEffect(() => {
    const fetchDiscountData = async () => {
      try {
        setLoading(true);
        const response = await getDiscountByDiscountId(discountId);
        
        if (response && response.data) {
          const discount = response.data;
          
          const startDate = new Date(discount.startDate).toISOString().split('T')[0];
          const endDate = new Date(discount.endDate).toISOString().split('T')[0];
          
          setFormData({
            bookId: discount.bookId,
            title: discount.title,
            discountPercentage: discount.discountPercentage,
            startDate: startDate,
            endDate: endDate
          });
          
          setBookInfo({
            title: discount.bookTitle || 'Book Details',
            loading: false,
            error: null
          });
          
          setDiscountStatus(getDiscountStatus(discount.startDate, discount.endDate).text);
        } else {
          setServerError('Failed to fetch discount details');
        }
      } catch (err) {
        console.error('Error fetching discount details:', err);
        setServerError('Failed to fetch discount details. Please try again.');
        setBookInfo({
          title: '',
          loading: false,
          error: 'Failed to fetch book information'
        });
      } finally {
        setLoading(false);
      }
    };

    if (discountId) {
      fetchDiscountData();
    }
  }, [discountId, bookId]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setSubmitting(true);
    setServerError(null);
    
    try {
      const startDateUTC = new Date(formData.startDate);
      const endDateUTC = new Date(formData.endDate);
      
      const discountData = {
        bookId: bookId,
        title: formData.title,
        discountPercentage: parseFloat(formData.discountPercentage),
        startDate: startDateUTC.toISOString(), 
        endDate: endDateUTC.toISOString()      
      };
      
      console.log("Sending updated discount data:", discountData);
      await updateDiscount(discountId, discountData);
      setSuccessMessage('Discount updated successfully!');
      
      setTimeout(() => {
        navigate(`/admin/books/discount/${bookId}`);
      }, 1500);
    } catch (err) {
      console.error('Error updating discount:', err);
      const errorMessage = err.response?.data?.message || 
                           err.response?.data?.title || 
                           err.response?.data || 
                           'Failed to update discount. Please try again.';
      setServerError(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(`/admin/books/discount/${bookId}`);
  };

  const today = new Date().toISOString().split('T')[0];

  const canEditDates = discountStatus === "Soon" || discountStatus === "Scheduled";
  const isActive = discountStatus === "Active";

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSideBar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavAdmin />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center mb-6">
            <button
              onClick={handleCancel}
              className="mr-4 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <h1 className="text-2xl font-semibold text-gray-800">
              Edit Discount {bookInfo.loading ? '...' : `for: ${bookInfo.title}`}
            </h1>
          </div>
          
          {bookInfo.error && (
            <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
              {bookInfo.error}
            </div>
          )}
          
          {successMessage && (
            <div className="bg-green-100 text-green-700 p-4 rounded mb-4">
              {successMessage}
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-700">Loading discount details...</span>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-6">
              <div className="mb-6">
                <span className={`${getDiscountStatus(formData.startDate, formData.endDate).className} text-xs font-medium mr-2 px-2.5 py-0.5 rounded`}>
                  Status: {discountStatus}
                </span>
                
                {isActive && (
                  <p className="mt-2 text-sm text-gray-600">
                    This discount is currently active. You can only modify the title and percentage.
                  </p>
                )}
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Discount Title*
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Summer Sale, Black Friday Deal"
                    required
                    minLength="3"
                    maxLength="100"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="discountPercentage" className="block text-sm font-medium text-gray-700 mb-1">
                    Discount Percentage (%)*
                  </label>
                  <input
                    type="number"
                    id="discountPercentage"
                    name="discountPercentage"
                    value={formData.discountPercentage}
                    onChange={handleChange}
                    min="0.01"
                    max="100"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter discount percentage (0.01-100)"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date*
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm ${canEditDates ? 'focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-100'}`}
                      min={today}
                      disabled={!canEditDates}
                      required
                    />
                    {!canEditDates && discountStatus === "Active" && (
                      <p className="text-xs text-gray-500 mt-1">
                        Cannot change start date for active discounts
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                      End Date*
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm ${isActive || canEditDates ? 'focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-100'}`}
                      min={formData.startDate || today}
                      disabled={!isActive && !canEditDates}
                      required
                    />
                    {!canEditDates && !isActive && (
                      <p className="text-xs text-gray-500 mt-1">
                        Cannot change end date for expired discounts
                      </p>
                    )}
                  </div>
                </div>
                
                {serverError && (
                  <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
                    {serverError}
                  </div>
                )}
                
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 border border-transparent shadow-sm text-sm font-medium rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : 'Update Discount'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default EditBookDiscount;