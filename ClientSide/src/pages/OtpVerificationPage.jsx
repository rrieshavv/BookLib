import React from 'react';

const OtpVerificationPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel */}
      <div className="w-full md:w-1/2 h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white/80 shadow-xl rounded-lg p-6 sm:p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Enter OTP
          </h2>
          <p className="text-center text-sm text-gray-600 mb-6">
            We’ve sent a 6-digit verification code to your email address.
          </p>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-400 outline-none"
            />
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-3 rounded-md hover:bg-emerald-700 transition"
            >
              Verify OTP
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-4">
            Didn’t receive the code?{' '}
            <span className="text-emerald-500 hover:underline cursor-pointer">
              Resend
            </span>
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden md:block w-1/2 h-screen">
        <img
          src="../src/assets/rightPannelImageAuth.jpg"
          alt="OTP Verification"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default OtpVerificationPage;
