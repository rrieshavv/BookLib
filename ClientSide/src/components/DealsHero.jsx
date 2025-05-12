import React from "react";
import NavBar from "../components/NavBar/NavBar";

const DealsHeroBanner = ({ onSaveClick }) => {
  return (
    <section
      className="relative w-full h-64 md:h-208 bg-cover bg-center"
      style={{ backgroundImage: "url('../src/assets/deals-hero.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <NavBar theme="dark" />
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Book Deals of the Season
          </h1>
          <p className="text-xl md:text-2xl mb-6">
            Discover limited-time discounts on bestselling and award-winning books.
            <span className="block text-center">Your next great read is just a deal away!</span>
          </p>
          <button
            className="bg-white text-emerald-700 px-6 py-3 rounded-md font-semibold shadow
                       hover:bg-emerald-600 hover:text-white
                       focus:outline-none
                       transition duration-200"
            onClick={onSaveClick}
          >
            Save Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default DealsHeroBanner;
