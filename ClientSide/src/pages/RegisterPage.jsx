import React from 'react';

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left panel with form */}
      <div className="w-full md:w-1/2 h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white/80 shadow-xl rounded-lg p-6 sm:p-8 w-full max-w-md">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
            Register for BookLib
          </h2>

          <form className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Choose a username"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
                required
              />
            </div>

            <div className="flex space-x-2">
              <div className="w-1/2">
                <label htmlFor="firstName" className="block text-sm text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="First name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
                  required
                />
              </div>

              <div className="w-1/2">
                <label htmlFor="lastName" className="block text-sm text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="mobile" className="block text-sm text-gray-700 mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                placeholder="98XXXXXXXX"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Create a password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
                required
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-2 sm:py-3 rounded-md hover:bg-emerald-700 transition"
            >
              Register
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <a
              href="/login"
              className="text-emerald-500 hover:text-emerald-600 hover:underline"
            >
              Login
            </a>
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

export default RegisterPage;
