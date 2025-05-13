import React, { useState } from 'react';
import { addInventory } from '../../../services/inventory Service';

const AddInventoryForm = ({ bookId, bookTitle, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    bookId: bookId,
    quantity: '',
    companyName: '',
    companyRegNo: '',
    companyAddress: '',
    pricePerBook: '',
    discount: '0.00'
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (['quantity', 'pricePerBook', 'discount'].includes(name)) {
      setFormData({
        ...formData,
        [name]: value.replace(/[^0-9.]/g, '')
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const calculateTotal = () => {
  const quantity = parseFloat(formData.quantity) || 0;
  const pricePerBook = parseFloat(formData.pricePerBook) || 0;
  const discountPercentage = parseFloat(formData.discount) || 0;

  const discountedPrice = pricePerBook * (1 - discountPercentage / 100);

  const total = discountedPrice * quantity;
  if(total < 0) {
    return 0;
  }

  return total.toFixed(2);
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    try {
      const inventoryData = {
        bookId: formData.bookId,
        quantity: parseInt(formData.quantity, 10),
        companyName: formData.companyName,
        companyRegNo: formData.companyRegNo,
        companyAddress: formData.companyAddress,
        pricePerBook: parseFloat(formData.pricePerBook),
        discount: parseFloat(formData.discount) || 0,
        totalAmount: parseFloat(calculateTotal())
      };
      
      const response = await addInventory(inventoryData);
      
      if (response.code === 0) {
        const newInventory = {
          ...response.data,
          bookTitle: bookTitle
        };
        onSuccess(newInventory);
      } else {
        setError(response.message || 'Failed to add inventory record');
      }
    } catch (err) {
      console.error('Error adding inventory:', err);
      setError(err.message || 'An error occurred while adding inventory record');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Add New Inventory</h2>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
              Company Name*
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="companyRegNo" className="block text-sm font-medium text-gray-700 mb-1">
              Company Registration No.*
            </label>
            <input
              type="text"
              id="companyRegNo"
              name="companyRegNo"
              value={formData.companyRegNo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-700 mb-1">
              Company Address*
            </label>
            <input
              type="text"
              id="companyAddress"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
              Quantity*
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="pricePerBook" className="block text-sm font-medium text-gray-700 mb-1">
              Price Per Book (Rs)*
            </label>
            <input
              type="text"
              id="pricePerBook"
              name="pricePerBook"
              value={formData.pricePerBook}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">
              Discount % per Book
            </label>
            <input
              type="number"
              id="discount"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              max={100}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Amount
            </label>
            <div className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-md">
              Rs {calculateTotal()}
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 border border-transparent shadow-sm text-sm font-medium rounded-md text-white hover:bg-blue-700"
            disabled={submitting}
          >
            {submitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </span>
            ) : 'Add Inventory'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddInventoryForm;