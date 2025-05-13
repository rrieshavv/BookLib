import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getInventoryByBookId, deleteInventory } from '../../../services/inventory Service';
import { getBookById } from '../../../services/bookService';
import AdminSideBar from './AdminSideBar';
import TopNavAdmin from './TopNavAdmin';
import AddInventoryForm from './AddInventoryForm';

const BookInventoryPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  
  const [book, setBook] = useState(null);
  const [inventories, setInventories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

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
        
        try {
          const inventoryResponse = await getInventoryByBookId(bookId);
          if (inventoryResponse.code === 0) {
            const inventoryData = inventoryResponse.data;
            const inventoryArray = Array.isArray(inventoryData) ? inventoryData : [inventoryData];
            setInventories(inventoryArray);
          }
        } catch (inventoryError) {
          if (inventoryError.response && inventoryError.response.status === 404) {
            setInventories([]);
          } else {
            console.error("Error fetching inventory:", inventoryError);
          }
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    if (bookId) {
      fetchData();
    }
  }, [bookId]);

  const handleBackClick = () => {
    navigate(`/admin/books/${bookId}`);
  };

  const handleDeleteClick = async (inventoryId) => {
    // Using default browser confirm dialog instead of custom modal
    const isConfirmed = window.confirm("Are you sure you want to delete this inventory record? This action cannot be undone.");
    
    if (isConfirmed) {
      try {
        const response = await deleteInventory(inventoryId);
        if (response.code === 0) {
          setInventories(inventories.filter(inv => inv.id !== inventoryId));
          setSuccessMessage('Inventory record deleted successfully');
          setTimeout(() => setSuccessMessage(null), 3000);
        } else {
          setError('Failed to delete inventory record');
        }
      } catch (err) {
        setError(err.message || 'Failed to delete inventory record');
      }
    }
  };

  const handleAddSuccess = (newInventory) => {
    setInventories([newInventory, ...inventories]);
    setShowAddForm(false);
    setSuccessMessage('Inventory record added successfully');
    setTimeout(() => setSuccessMessage(null), 3000);
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
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
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
                {loading ? 'Loading...' : `Inventory for: ${book?.title || 'Unknown Book'}`}
              </h1>
            </div>
            
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {showAddForm ? 'Cancel' : 'Add Inventory'}
            </button>
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

          {showAddForm && (
            <div className="mb-6">
              <AddInventoryForm
                bookId={bookId}
                bookTitle={book?.title}
                onSuccess={handleAddSuccess}
                onCancel={() => setShowAddForm(false)}
              />
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : inventories.length === 0 ? (
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <p className="text-gray-500">No inventory records found for this book.</p>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black-800 uppercase tracking-wider">
                        Company
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black-800 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black-800 uppercase tracking-wider">
                        Price Per Book
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black-800 uppercase tracking-wider">
                        Discount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black-800 uppercase tracking-wider">
                        Total Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black-800 uppercase tracking-wider">
                        Created At
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-black-800 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {inventories.map((inventory) => (
                      <tr key={inventory.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{inventory.companyName}</div>
                          <div className="text-xs text-gray-500">Reg: {inventory.companyRegNo}</div>
                          <div className="text-xs text-gray-500">{inventory.companyAddress}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">
                          {inventory.quantity} units
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">
                          Rs {inventory.pricePerBook}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">
                           {inventory.discount}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">
                          Rs {inventory.totalAmount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">
                          {formatDate(inventory.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Link 
                              to={`/admin/book/inventory/edit/${bookId}/${inventory.id}`}
                              className="text-blue-600 hover:text-blue-900 flex items-center"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </Link>
                            <button
                              onClick={() => handleDeleteClick(inventory.id)}
                              className="text-red-600 hover:text-red-900 flex items-center"
                              title="Delete inventory record"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BookInventoryPage;