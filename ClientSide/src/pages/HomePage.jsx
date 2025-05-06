import React from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Category from "../components/Category";
import Catalog from "../components/Catalog";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="bg-[#f4f1ea] text-gray-800 font-sans">
      <section
        className="relative w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('../src/assets/hero-section-img.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40">
          <NavBar theme="dark"/>
          <Hero />
        </div>
      </section>

      {/* Category Section */}
      <Category />

      {/* Catalog Section */}
      <Catalog />

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <Newsletter />

      {/* React */}
      <Footer />
    </div>
  );
};

export default HomePage;
