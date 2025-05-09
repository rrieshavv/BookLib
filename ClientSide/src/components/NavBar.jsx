import React from 'react';
import { Link } from 'react-router';
import { FiShoppingCart } from 'react-icons/fi'; // Import the cart icon

const NavBar = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';

  return (
    <header className={`absolute top-0 left-0 w-full z-20 px-6 md:px-16 py-4 flex items-center justify-between ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <h1 className="text-xl font-bold">BookLib</h1>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6 text-sm">
        <nav className={`${isDark ? '' : 'text-gray-800'} flex space-x-6`}>
          <Link to="/" className="hover:text-emerald-500 transition">Home</Link>
          <Link to="/catalog" className="hover:text-emerald-500 transition">Catalogue</Link>
          <Link to="/deals" className="hover:text-emerald-500 transition">Deals</Link>
          <Link to="/about-us" className="hover:text-emerald-500 transition">About</Link>
          <Link to="/login" className="hover:text-emerald-500 transition">Login</Link>
          {/* Cart Icon Button */}
          <Link to="/customer/cart" aria-label="Cart" className="ml-4 text-xl hover:text-emerald-500 transition">
            <FiShoppingCart />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
