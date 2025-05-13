import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCurrentDiscounts } from '../../services/discountService';
import AdminSideBar from './components/AdminSideBar';
import TopNavAdmin from './components/TopNavAdmin';

const DiscountHistoryPage = () => {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookTitle, setBookTitle] = useState('');
  const navigate = useNavigate();
  const { bookId } = useParams();

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        setLoading(true);
        const response = await getCurrentDiscounts(bookId);
        console.log(response);
        
        if (response.data && response.data.discounts) {
          setDiscounts(response.data.discounts);
          setBookTitle(response.data.discounts[0]?.bookTitle || 'Book Discounts');


        }
        
        setError(null);
      } catch (err) {
        setError('Failed to fetch discount history');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscounts();
  }, [bookId]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isDiscountActive = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    return now >= start && now <= end;
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
          
        </div>

        {discounts.length === 0 ? (
          <p className="text-gray-600">No discount history found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3">Book Title</th>
                  <th scope="col" className="px-4 py-3">Discount Title</th>
                  <th scope="col" className="px-4 py-3">Discount %</th>
                  <th scope="col" className="px-4 py-3">Start Date</th>
                  <th scope="col" className="px-4 py-3">End Date</th>
                </tr>
              </thead>
              <tbody>
                {discounts.map((discount) => (
                  <tr
                    key={discount.discountId}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {discount.bookTitle}
                    </td>


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
      {/* Sidebar */}
      <AdminSideBar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <TopNavAdmin />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              All Discount History
            </h1>
          </div>
          
          {renderDiscountHistory()}
        </main>
      </div>
    </div>
  );
};

export default DiscountHistoryPage;