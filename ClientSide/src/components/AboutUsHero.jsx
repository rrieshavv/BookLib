import React from 'react';
import NavBar from '../components/NavBar/NavBar';

const AboutUsHero = ({ scrollToTeamMembers }) => {
  return (
    <section className="relative h-screen">
      {/* Hero background image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="../src/assets/about-us-hero.jpeg"
          alt="Team Banner"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent"></div>
      </div>

      {/* Navbar positioned over hero image */}
      <NavBar theme="dark" className="absolute top-0 left-0 right-0 z-10" />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Meet the Team</h1>
        <p className="text-xl text-gray-200 max-w-2xl mx-auto">
          We're a group of creators, coders, and thinkers passionate about building beautiful digital experiences.
        </p>
        <button
          onClick={scrollToTeamMembers} 
          className="mt-8 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
        >
          Learn More
        </button>
      </div>
    </section>
  );
};

export default AboutUsHero;
