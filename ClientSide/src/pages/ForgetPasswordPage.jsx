import React from 'react';
import { Link } from 'react-router-dom';

const ForgetPasswordPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left panel */}
      <div className="w-full md:w-1/2 h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white/80 shadow-xl rounded-lg p-6 sm:p-8 w-full max-w-md">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
            Reset Your Password
          </h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm sm:text-base text-gray-700 mb-1"
              >
                Registered Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm sm:text-base focus:ring-2 focus:ring-indigo-400 outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-2 sm:py-3 rounded-md hover:bg-emerald-700 transition"
            >
              Send Reset Link
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Remembered your password?{' '}
            <Link
                to="/login"
                className="text-emerald-500 hover:text-emerald-600 hover:underline"
            >
                Login
            </Link>
          </p>
        </div>
      </div>

      {/* Right image panel */}
      <div className="hidden md:block w-1/2 h-screen">
        <img
          src="../src/assets/rightPannelImageAuth.jpg"
          alt="Background Art"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
