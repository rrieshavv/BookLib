import React, { useState, useEffect } from "react";

const Announcement = ({
  title = "Summer Reading Sale!",
  message = "Enjoy 30% off on all bestsellers until June 15th. Browse our collection now and find your next favorite book!",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Show the announcement when component mounts
    setIsVisible(true);
  }, []);
  
  const handleClose = () => {
    setIsVisible(false);
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={handleClose}
      ></div>
      
      {/* Announcement Modal */}
      <div className="relative bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl w-full">
        {/* Close Button - Absolute positioned on top of the image */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 z-20 text-white bg-black/30 rounded-full p-1 hover:bg-black/50"
          aria-label="Close announcement"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content Area */}
        <div className="flex flex-col md:flex-row">
          {/* Image - Takes full height and appropriate width */}
          <div className="w-full md:w-3/5 relative">
            <img 
              src="/src/assets/announcement-banner.jpg" 
              alt="Person reading by coastal cliffs" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Text Content */}
          <div className="w-full md:w-2/5 p-6 flex flex-col justify-between bg-gray-100">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">{title}</h2>
              <p className="text-lg text-gray-700">{message}</p>
            </div>
            
            <div className="mt-6">
              <button
                onClick={handleClose}
                className="px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition font-medium w-full"
              >
                Explore Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcement;