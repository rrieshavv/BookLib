import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInventories } from '../../../services/inventaryService';
import AdminSideBar from './AdminSideBar';
import TopNavAdmin from './TopNavAdmin';

const Inventory = () => {
  const [inventories, setInventories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        setLoading(true);
        const response = await getInventories();
        console.log('Fetched Inventories:', response);

        // Correctly setting inventories from response.data
        if (response.data) {
          setInventories(response.data);
        } else {
          setInventories([]);
        }

        setError(null);
      } catch (err) {
        setError('Failed to fetch inventory history');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInventories();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderInventoryHistory = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-700">Loading inventory history...</span>
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
          <h2 className="text-xl font-semibold text-gray-800">Inventory History</h2>
        </div>

        {inventories.length === 0 ? (
          <p className="text-gray-600">No inventory history found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3">Book Title</th>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Price/Book</th>
                  <th className="px-4 py-3">Discount</th>
                  <th className="px-4 py-3">Total Amount</th>
                  <th className="px-4 py-3">Date Added</th>
                  

                </tr>
              </thead>
              <tbody>
                {inventories.map((inventory) => (
                  <tr key={inventory.id} className="border-b hover:bg-gray-100 transition">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {inventory.bookTitle}
                    </td>
                    <td className="px-4 py-3">
                      {inventory.companyName}
                    </td>
                    <td className="px-4 py-3">
                      {inventory.quantity}
                    </td>
                    <td className="px-4 py-3">
                      {`Rs. ${inventory.pricePerBook}`}
                    </td>
                    <td className="px-4 py-3">
                      {inventory.discount}%
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {`Rs. ${inventory.totalAmount}`}
                    </td>
                    <td className="px-4 py-3">
                      {formatDate(inventory.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSideBar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavAdmin />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Inventory History</h1>
          </div>
          {renderInventoryHistory()}
        </main>
      </div>
    </div>
  );
};

export default Inventory;
