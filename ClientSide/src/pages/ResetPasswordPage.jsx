import React from 'react';

const ResetPasswordPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel */}
      <div className="w-full md:w-1/2 h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white/80 shadow-xl rounded-lg p-6 sm:p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Set New Password
          </h2>
          <p className="text-center text-sm text-gray-600 mb-6">
            Enter a new password for your account.
          </p>

          <form className="space-y-4">
            <div>
              <label htmlFor="newPassword" className="block text-sm text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                placeholder="Enter new password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Re-enter password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-3 rounded-md hover:bg-emerald-700 transition"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden md:block w-1/2 h-screen">
        <img
          src="../src/assets/rightPannelImageAuth.jpg"
          alt="Reset Password"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
