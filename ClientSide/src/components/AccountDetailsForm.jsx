import React, { useState } from "react";
import { updateUserProfile } from "../services/authService";

const AccountDetailsForm = ({ user, setUser }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser({ ...user, profileImage: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const result = await updateUserProfile(user);
      if (result.success) {
        setMessage({ type: "success", text: "Profile updated successfully!" });
        // Update the user state with the new data
        if (result.data) {
          setUser(prevUser => ({
            ...prevUser,
            ...result.data
          }));
        }
      } else {
        setMessage({ type: "error", text: result.message || "Failed to update profile" });
      }
    } catch (error) {
      setMessage({ 
        type: "error", 
        text: error.message || "An error occurred while updating profile" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Account Details</h2>
      {message.text && (
        <div className={`p-4 mb-4 rounded ${
          message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}>
          {message.text}
        </div>
      )}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              value={user.firstName || ""}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              value={user.lastName || ""}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={user.email || ""}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={user.phoneNumber || ""}
              onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
              placeholder="Enter your phone number"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className={`bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded font-medium ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountDetailsForm;