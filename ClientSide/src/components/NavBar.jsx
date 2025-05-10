import React, { useState } from 'react';
import { Link } from 'react-router';
import { FiShoppingCart, FiUser, FiLogOut, FiSettings, FiPackage } from 'react-icons/fi';

const NavBar = ({ theme = 'dark', user = { fullName: 'John Doe', email: 'john.doe@example.com' } }) => {
  const isDark = theme === 'dark';
  const [profileOpen, setProfileOpen] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  
  // Form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
  };

  const handleLogout = () => {
    // Implement logout functionality here
    console.log('Logging out');
  };

  const togglePasswordModal = () => {
    setShowPasswordModal(!showPasswordModal);
    // Reset form fields when closing
    if (!showPasswordModal) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };
  
  const handlePasswordUpdate = () => {
    // Implement password update logic here
    console.log('Updating password');
    // Validate passwords match
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Update password logic would go here
    
    // Close modal after successful update
    togglePasswordModal();
  };

  return (
    <>
      <header className={`absolute top-0 left-0 w-full z-20 px-6 md:px-16 py-4 flex items-center justify-between ${isDark ? 'text-white' : 'text-gray-900'}`}>
        <h1 className="text-xl font-bold">BookLib</h1>
        
        {/* Navigation Links */}
        <div className="flex items-center space-x-6 text-sm">
          <nav className={`${isDark ? '' : 'text-gray-800'} flex space-x-6`}>
            <Link to="/" className="hover:text-emerald-500 transition">Home</Link>
            <Link to="/catalog" className="hover:text-emerald-500 transition">Catalogue</Link>
            <Link to="/deals" className="hover:text-emerald-500 transition">Deals</Link>
            <Link to="/about-us" className="hover:text-emerald-500 transition">About</Link>
            <Link to="/login" className="hover:text-emerald-500 transition">Login</Link>
            
            {/* Cart Icon Button */}
            <Link to="/customer/cart" aria-label="Cart" className="ml-4 text-xl hover:text-emerald-500 transition">
              <FiShoppingCart />
            </Link>
            
            {/* Profile Icon Button */}
            <div className="relative ml-4">
              <button 
                onClick={toggleProfile} 
                className="text-xl hover:text-emerald-500 transition"
                aria-label="User Profile"
              >
                <FiUser />
              </button>
              
              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="px-4 py-3 border-b border-gray-200">
                    {/* User Avatar */}
                    <div className="flex items-center mb-2">
                      <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                        {user.fullName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-1">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <div className="flex items-center">
                        <FiUser className="mr-2" />
                        Profile
                      </div>
                    </Link>
                    
                    <Link to="/my-orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <div className="flex items-center">
                        <FiPackage className="mr-2" />
                        My Orders
                      </div>
                    </Link>
                    
                    <button 
                      onClick={togglePasswordModal} 
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <FiSettings className="mr-2" />
                        Change Password
                      </div>
                    </button>
                    
                    <button 
                      onClick={handleLogout} 
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <FiLogOut className="mr-2" />
                        Logout
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>
      
      {/* Password Change Modal - Fixed positioning with proper overlay */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay - Similar to the announcement overlay */}
          <div 
            className="absolute inset-0 bg-black/40" 
            onClick={togglePasswordModal}
          ></div>
          
          <div className="relative bg-white text-gray-900 p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Change Password</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="current-password" className="block text-sm font-medium mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  id="current-password"
                  className="w-full px-3 py-2 border rounded-md text-gray-900"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  id="new-password"
                  className="w-full px-3 py-2 border rounded-md text-gray-900"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  className="w-full px-3 py-2 border rounded-md text-gray-900"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={togglePasswordModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handlePasswordUpdate}
                  className="px-4 py-2 rounded-md text-sm font-medium bg-emerald-500 text-white hover:bg-emerald-600"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;