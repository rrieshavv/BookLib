import React, { useState } from "react";
import { Link } from "react-router-dom";
import AccountDetailsForm from "../components/AccountDetailsForm";
import OrdersList from "../components/OrdersList";
import BookmarksList from "../components/BookmarksList";
import ProfileSummary from "../components/ProfileSummary";
import ProfileSidebarNav from "../components/ProfileSidebarNav";

const ProfilePage = () => {
  // Mock user data - in a real app, this would come from API/context
  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    avatar: null, // Placeholder for user avatar
    joinDate: "May 2024",
    membershipId: "MEM12345",
    phone: "",
  });

  // Mock order history
  const [orders, setOrders] = useState([
    {
      id: "ORD-8901",
      date: "May 5, 2025",
      status: "Pending",
      items: 1,
      total: 700,
      claimCode: null,
    },
    {
      id: "ORD-7842",
      date: "April 28, 2025",
      status: "Completed",
      items: 3,
      total: 1250,
      claimCode: "CLM-89275",
    },
    {
      id: "ORD-6523",
      date: "March 15, 2025",
      status: "Completed",
      items: 2,
      total: 950,
      claimCode: "CLM-76123",
    },
    {
      id: "ORD-5731",
      date: "February 2, 2025",
      status: "Cancelled",
      items: 1,
      total: 650,
      claimCode: null,
    },
  ]);

  // Mock bookmarked books
  const [bookmarks, setBookmarks] = useState([
    {
      id: 1,
      title: "Don Quixote",
      author: "Alex Michaelides",
      cover: "src/assets/books/don-quixote.jpg",
      price: 450,
    },
    {
      id: 2,
      title: "Normal People",
      author: "Tara Westover",
      cover: "src/assets/books/normal-people.jpg",
      price: 550,
    },
    {
      id: 3,
      title: "War Peace",
      author: "Delia Owens",
      cover: "src/assets/books/war-peace.jpg",
      price: 650,
    },
  ]);

  // UI State
  const [activeTab, setActiveTab] = useState("profile");

  // Handle remove bookmark
  const removeBookmark = (bookId) => {
    setBookmarks(bookmarks.filter(book => book.id !== bookId));
  };

  return (
    <div className="bg-[#f4f1ea] font-sans min-h-screen flex flex-col pt-5">
      <div className="container mx-auto p-6 md:p-8 max-w-6xl">
        <Link to="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-800 font-medium mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 15.707a1 1 0 01-1.414 0L6.586 11l4.707-4.707a1 1 0 011.414 1.414L9.414 11l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">My Profile</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Profile Summary */}
              <ProfileSummary user={user} />

              {/* Navigation */}
              <div className="p-4">
                <ProfileSidebarNav
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onSignOut={() => console.log("Signing out...")} // replace with actual logic
                />
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="w-full md:w-3/4">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              {/* Account Details Tab */}
              {activeTab === "profile" && (
                <AccountDetailsForm user={user} setUser={setUser} />
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <OrdersList orders={orders} />
              )}

              {/* Bookmarks Tab */}
              {activeTab === "bookmarks" && (
                <BookmarksList bookmarks={bookmarks} removeBookmark={removeBookmark} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;