import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import announcementService from "../services/announcementService";

const POLL_INTERVAL_MS = 5000; // 5 seconds

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const hasFetched = useRef(false);
  const prevAnnouncementsRef = useRef([]);
  const navigate = useNavigate();
  
  // Fetch announcements (used for both initial and polling)
  const fetchCurrentAnnouncements = async (showPopup = false) => {
    try {
      const currentAnnouncements = await announcementService.getCurrentAnnouncements();
      // Only update if there are new announcements
      const isNew = JSON.stringify(currentAnnouncements) !== JSON.stringify(prevAnnouncementsRef.current);
      if (currentAnnouncements && currentAnnouncements.length > 0 && isNew) {
        setAnnouncements(currentAnnouncements);
        setIsVisible(true);
        setCurrentIndex(0);
        prevAnnouncementsRef.current = currentAnnouncements;
      } else if (currentAnnouncements.length === 0) {
        setAnnouncements([]);
        setIsVisible(false);
        setCurrentIndex(0);
        prevAnnouncementsRef.current = [];
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchCurrentAnnouncements(true);
    hasFetched.current = true;
  }, []);

  // Polling effect
  useEffect(() => {
    const interval = setInterval(() => {
      fetchCurrentAnnouncements();
    }, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);
  
  const handleClose = () => {
    if (currentIndex < announcements.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsVisible(false);
      setCurrentIndex(0);
    }
  };

  const handleGoToCatalog = () => {
    setIsVisible(false);
    setCurrentIndex(0);
    navigate("/catalog");
  };
  
  if (!isVisible || announcements.length === 0) {
    return null;
  }
  
  const currentAnnouncement = announcements[currentIndex];
  
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
              alt="Announcement banner" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Text Content */}
          <div className="w-full md:w-2/5 p-6 flex flex-col justify-between bg-gray-100">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">{currentAnnouncement.title}</h2>
              <p className="text-lg text-gray-700">{currentAnnouncement.description}</p>
            </div>
            
            <div className="mt-6 flex flex-col gap-2">
              <button
                onClick={handleGoToCatalog}
                className="px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition font-medium w-full"
              >
                Browse Catalog
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcement;