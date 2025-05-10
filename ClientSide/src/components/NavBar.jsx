import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FiShoppingCart, FiUser, FiLogOut, FiSettings, FiPackage, FiEye, FiEyeOff, FiAlertCircle, FiCheckCircle, FiX } from 'react-icons/fi';

const NavBar = ({ theme = 'dark', user = { fullName: 'John Doe', email: 'john.doe@example.com' } }) => {
  const isDark = theme === 'dark';
  const [profileOpen, setProfileOpen] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  
  // Form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // UI state for password fields
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(''); // 'loading', 'success', 'error'
  const [statusMessage, setStatusMessage] = useState('');
  
  // Password strength indicators
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false
  });

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
  };

  const handleLogout = () => {
    // Implement logout functionality here
    console.log('Logging out');
  };

  const togglePasswordModal = () => {
    setShowPasswordModal(!showPasswordModal);
    // Reset form when closing modal
    if (!showPasswordModal) {
      resetPasswordForm();
    }
  };
  
  const resetPasswordForm = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setFormErrors({});
    setSubmitStatus('');
    setPasswordStrength({
      score: 0,
      hasMinLength: false,
      hasUpperCase: false,
      hasLowerCase: false,
      hasNumber: false,
      hasSpecialChar: false
    });
  };

  // Evaluate password strength when new password changes
  useEffect(() => {
    if (newPassword) {
      const strength = {
        hasMinLength: newPassword.length >= 8,
        hasUpperCase: /[A-Z]/.test(newPassword),
        hasLowerCase: /[a-z]/.test(newPassword),
        hasNumber: /[0-9]/.test(newPassword),
        hasSpecialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(newPassword)
      };

      // Calculate score (0-4)
      const score = Object.values(strength).filter(Boolean).length;
      
      setPasswordStrength({
        ...strength,
        score
      });
    }
  }, [newPassword]);
  
  // Handle escape key to close modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && showPasswordModal) {
        togglePasswordModal();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [showPasswordModal]);

  // Focus on first input when modal opens
  useEffect(() => {
    if (showPasswordModal) {
      setTimeout(() => {
        const firstInput = document.getElementById('current-password');
        if (firstInput) firstInput.focus();
      }, 100);
    }
  }, [showPasswordModal]);

  const validatePasswordForm = () => {
    const errors = {};
    
    if (!currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    
    if (!newPassword) {
      errors.newPassword = 'New password is required';
    } else if (newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters';
    } else if (passwordStrength.score < 3) {
      errors.newPassword = 'Password is too weak';
    }
    
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your new password';
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handlePasswordUpdate = async () => {
    if (!validatePasswordForm()) {
      return;
    }
    
    setSubmitStatus('loading');
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Implementation for password update would go here
      console.log('Password update data:', {
        currentPassword,
        newPassword
      });
      
      setSubmitStatus('success');
      setStatusMessage('Password updated successfully!');
      
      // Close modal after showing success message
      setTimeout(() => {
        togglePasswordModal();
      }, 1500);
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage(error.message || 'Failed to update password. Please try again.');
    }
  };
  
  // Get strength color
  const getStrengthColor = () => {
    const { score } = passwordStrength;
    if (score === 0) return 'bg-gray-200';
    if (score === 1) return 'bg-red-500';
    if (score === 2) return 'bg-orange-500';
    if (score === 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // Get strength label
  const getStrengthLabel = () => {
    const { score } = passwordStrength;
    if (score === 0) return '';
    if (score === 1) return 'Weak';
    if (score === 2) return 'Fair';
    if (score === 3) return 'Good';
    return 'Strong';
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
      
      {/* Enhanced Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop overlay with blur effect */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={togglePasswordModal}
          ></div>
          
          {/* Modal container */}
          <div className="relative bg-white text-gray-900 p-6 rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium">Change Password</h3>
              <button 
                onClick={togglePasswordModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close modal"
              >
                <FiX size={20} />
              </button>
            </div>
            
            {submitStatus === 'success' ? (
              <div className="flex flex-col items-center justify-center py-8">
                <FiCheckCircle className="text-green-500 mb-4" size={48} />
                <p className="text-center text-green-500 font-medium">{statusMessage}</p>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Current password field */}
                <div>
                  <label htmlFor="current-password" className="block text-sm font-medium mb-1">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      id="current-password"
                      className={`w-full px-3 py-2 border ${formErrors.currentPassword ? 'border-red-500' : 'border-gray-300'} rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                      placeholder="Enter current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      disabled={submitStatus === 'loading'}
                    />
                    <button 
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      tabIndex="-1"
                      aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                    >
                      {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {formErrors.currentPassword && (
                    <p className="mt-1 text-xs text-red-500 flex items-center">
                      <FiAlertCircle className="mr-1" />
                      {formErrors.currentPassword}
                    </p>
                  )}
                </div>
                
                {/* New password field */}
                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      id="new-password"
                      className={`w-full px-3 py-2 border ${formErrors.newPassword ? 'border-red-500' : 'border-gray-300'} rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      disabled={submitStatus === 'loading'}
                    />
                    <button 
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      tabIndex="-1"
                      aria-label={showNewPassword ? "Hide password" : "Show password"}
                    >
                      {showNewPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {formErrors.newPassword && (
                    <p className="mt-1 text-xs text-red-500 flex items-center">
                      <FiAlertCircle className="mr-1" />
                      {formErrors.newPassword}
                    </p>
                  )}
                  
                  {/* Password strength meter */}
                  {newPassword && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">Password strength:</span>
                        <span className="text-xs font-medium" style={{ color: getStrengthColor().replace('bg-', 'text-') }}>{getStrengthLabel()}</span>
                      </div>
                      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getStrengthColor()} transition-all duration-300 ease-in-out`}
                          style={{ width: `${passwordStrength.score * 25}%` }}
                        ></div>
                      </div>
                      
                      {/* Password requirements checklist */}
                      <ul className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1">
                        <li className="text-xs flex items-center">
                          <span className={`mr-1 ${passwordStrength.hasMinLength ? 'text-green-500' : 'text-gray-400'}`}>
                            {passwordStrength.hasMinLength ? <FiCheckCircle /> : <FiAlertCircle />}
                          </span>
                          At least 8 characters
                        </li>
                        <li className="text-xs flex items-center">
                          <span className={`mr-1 ${passwordStrength.hasUpperCase ? 'text-green-500' : 'text-gray-400'}`}>
                            {passwordStrength.hasUpperCase ? <FiCheckCircle /> : <FiAlertCircle />}
                          </span>
                          Uppercase letter
                        </li>
                        <li className="text-xs flex items-center">
                          <span className={`mr-1 ${passwordStrength.hasLowerCase ? 'text-green-500' : 'text-gray-400'}`}>
                            {passwordStrength.hasLowerCase ? <FiCheckCircle /> : <FiAlertCircle />}
                          </span>
                          Lowercase letter
                        </li>
                        <li className="text-xs flex items-center">
                          <span className={`mr-1 ${passwordStrength.hasNumber ? 'text-green-500' : 'text-gray-400'}`}>
                            {passwordStrength.hasNumber ? <FiCheckCircle /> : <FiAlertCircle />}
                          </span>
                          Number
                        </li>
                        <li className="text-xs flex items-center col-span-2">
                          <span className={`mr-1 ${passwordStrength.hasSpecialChar ? 'text-green-500' : 'text-gray-400'}`}>
                            {passwordStrength.hasSpecialChar ? <FiCheckCircle /> : <FiAlertCircle />}
                          </span>
                          Special character
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                
                {/* Confirm password field */}
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirm-password"
                      className={`w-full px-3 py-2 border ${formErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={submitStatus === 'loading'}
                    />
                    <button 
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      tabIndex="-1"
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {formErrors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-500 flex items-center">
                      <FiAlertCircle className="mr-1" />
                      {formErrors.confirmPassword}
                    </p>
                  )}
                </div>
                
                {/* Status message */}
                {submitStatus === 'error' && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600 flex items-center">
                      <FiAlertCircle className="mr-2 flex-shrink-0" />
                      {statusMessage}
                    </p>
                  </div>
                )}
                
                {/* Action buttons */}
                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={togglePasswordModal}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    disabled={submitStatus === 'loading'}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handlePasswordUpdate}
                    className={`px-4 py-2 rounded-md text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
                      submitStatus === 'loading' 
                        ? 'bg-emerald-400 cursor-not-allowed' 
                        : 'bg-emerald-500 hover:bg-emerald-600'
                    }`}
                    disabled={submitStatus === 'loading'}
                  >
                    {submitStatus === 'loading' ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;