import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getInventoryById, updateInventory } from '../../../services/inventory Service';
import { getBookById } from '../../../services/bookService';
import AdminSideBar from './AdminSideBar';
import TopNavAdmin from './TopNavAdmin';

const EditInventoryForm = () => {
  const { bookId, inventoryId } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    bookId: bookId,
    companyName: '',
    companyRegNo: '',
    companyAddress: '',
    quantity: 0,
    pricePerBook: 0,
    discount: 0,
    totalAmount: 0
  });
  
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const bookResponse = await getBookById(bookId);
        if (bookResponse.code === 0) {
          setBook(bookResponse.data);
        } else {
          setError('Book not found');
        }
        
        const inventoryResponse = await getInventoryById(inventoryId);
        if (inventoryResponse.code === 0) {
          const inventoryData = inventoryResponse.data;
          setFormData({
            bookId: bookId,
            companyName: inventoryData.companyName || '',
            companyRegNo: inventoryData.companyRegNo || '',
            companyAddress: inventoryData.companyAddress || '',
            quantity: inventoryData.quantity || 0,
            pricePerBook: inventoryData.pricePerBook || 0,
            discount: inventoryData.discount || 0,
            totalAmount: inventoryData.totalAmount || 0
          });
        } else {
          setError('Inventory record not found');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    if (bookId && inventoryId) {
      fetchData();
    }
  }, [bookId, inventoryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };
    
    if (name === 'quantity' || name === 'pricePerBook' || name === 'discount') {
      const quantity = name === 'quantity' ? parseFloat(value) : parseFloat(formData.quantity);
      const pricePerBook = name === 'pricePerBook' ? parseFloat(value) : parseFloat(formData.pricePerBook);
      const discount = name === 'discount' ? parseFloat(value) : parseFloat(formData.discount);
      
      if (!isNaN(quantity) && !isNaN(pricePerBook)) {
        const validDiscount = Math.max(0, Math.min(100, discount));
        const discountAmount = (quantity * pricePerBook * validDiscount) / 100;
        const totalAmount = Math.max(0, (quantity * pricePerBook) - discountAmount);
        updatedFormData.totalAmount = totalAmount.toFixed(2);
        
        if (validDiscount !== discount) {
          updatedFormData.discount = validDiscount;
        }
      }
    }
    
    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Convert relevant fields to numbers
      const payload = {
        ...formData,
        bookId: parseInt(formData.bookId, 10),
        quantity: parseInt(formData.quantity, 10),
        pricePerBook: parseFloat(formData.pricePerBook),
        discount: Math.max(0, Math.min(100, parseFloat(formData.discount))),
        totalAmount: Math.max(0, parseFloat(formData.totalAmount))
      };

      const response = await updateInventory(inventoryId, payload);
      if (response.code === 0) {
        setSuccessMessage('Inventory record updated successfully');
        setTimeout(() => {
          navigate(`/admin/book/inventory/${bookId}`);
        }, 2000);
      } else {
        setError(response.message || 'Failed to update inventory record');
      }
    } catch (err) {
      setError(err.message || 'Failed to update inventory record');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(`/admin/book/inventory/${bookId}`);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSideBar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavAdmin />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
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
                {loading ? 'Loading...' : `Edit Inventory for: ${book?.title || 'Unknown Book'}`}
              </h1>
            </div>
          </div>

          {successMessage && (
            <div className="bg-green-100 text-green-700 p-4 rounded mb-4">
              {successMessage}
            </div>
          )}

          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-6">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Registration Number
                    </label>
                    <input
                      type="text"
                      name="companyRegNo"
                      value={formData.companyRegNo}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Address
                    </label>
                    <textarea
                      name="companyAddress"
                      value={formData.companyAddress}
                      onChange={handleChange}
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price Per Book (Rs)
                    </label>
                    <input
                      type="number"
                      name="pricePerBook"
                      value={formData.pricePerBook}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      name="discount"
                      value={formData.discount}
                      onChange={handleChange}
                      min="0"
                      max="100"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Amount (Rs)
                    </label>
                    <input
                      type="number"
                      name="totalAmount"
                      value={formData.totalAmount}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Auto-calculated based on quantity, price, and discount
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Updating...' : 'Update Inventory'}
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

export default EditInventoryForm;