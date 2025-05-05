import React from 'react'

const Hero = () => {
  const scrollToCatalog = (e) => {
    e.currentTarget.blur(); // Remove focus from button

    const catalogSection = document.getElementById('book-catalog');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="absolute inset-0 flex items-center px-6 md:px-24 z-10">
      <div>
        <h2 className="text-white text-4xl md:text-5xl font-bold mb-4">Welcome to BookLib</h2>
        <p className="text-white text-lg md:text-xl mb-6 max-w-xl">
          We serve you the best collection of books, from fiction to knowledge treasures.
        </p>
        <button
          onClick={scrollToCatalog}
          className="bg-white text-emerald-700 px-6 py-3 rounded-md font-semibold shadow
                     hover:bg-emerald-600 hover:text-white
                     focus:outline-none
                     transition duration-200">
          Shop Now
        </button>
      </div>
    </div>
  )
}

export default Hero
