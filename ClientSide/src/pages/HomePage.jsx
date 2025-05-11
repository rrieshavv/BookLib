import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Category from "../components/Category";
import BookPreview from "../components/BookPreview";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import Announcement from "../components/Announcement";
import { Book } from "lucide-react";
import { getRole } from "../utils/authStorage";


const HomePage = () => {

  const announcement = {
    title: "Summer Reading Sale!",
    message: "Enjoy 30% off on all bestsellers until June 15th. Browse our collection now and find your next favorite book!",
  };

  return (
    <div className="bg-[#f4f1ea] text-gray-800 font-sans">
      {/* Announcement Pop-up */}
      <Announcement 
        title={announcement.title}
        message={announcement.message}
        backgroundImage={announcement.backgroundImage}
      />
      
      <section
        className="relative w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/src/assets/hero-section-img.jpg')" }} // Updated path
      >
        <div className="absolute inset-0 bg-black/40">
          <NavBar theme="dark"/>
          <Hero />
        </div>
      </section>
      
      {/* Category Section */}
      <Category />
      
      {/* Catalog Section */}
      <section id="book-catalog">
      <BookPreview />
      </section>
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* Newsletter */}
      <Newsletter />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;