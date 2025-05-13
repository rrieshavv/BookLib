// CustomersDashboard.jsx
import React, { useState, useEffect } from "react";
import AdminSideBar from "./components/AdminSideBar";
import TopNavAdmin from "./components/TopNavAdmin";
import CustomerSearchBar from "./components/Customer/CustomerSearchBar";
import CustomerTable from "./components/Customer/CustomerTable";
import { toast } from "react-toastify";
import { customerService } from "../../services/customerService";

const CustomersDashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const data = await customerService.getAllCustomers();
      if (!Array.isArray(data)) {
        throw new Error("Invalid data format received from server");
      }
      setCustomers(data);
      setError(null);
    } catch (err) {
      const errorMessage = err.message || "Failed to fetch customers";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    const fullName = `${customer.firstName || ''} ${customer.lastName || ''}`.toLowerCase();
    const email = (customer.email || '').toLowerCase();
    const username = (customer.username || '').toLowerCase();
    const phone = (customer.phoneNumber || '').toLowerCase();
    const membershipCode = (customer.membershipCode || '').toLowerCase();
    return (
      fullName.includes(searchLower) ||
      email.includes(searchLower) ||
      username.includes(searchLower) ||
      phone.includes(searchLower) ||
      membershipCode.includes(searchLower)
    );
  });

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSideBar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNavAdmin />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Customer Management
            </h2>
            <p className="text-gray-600">Manage and view all customers</p>
          </div>

          <CustomerSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <CustomerTable customers={filteredCustomers} loading={loading} error={error} retry={fetchCustomers} />
        </main>
      </div>
    </div>
  );
};

export default CustomersDashboard;
