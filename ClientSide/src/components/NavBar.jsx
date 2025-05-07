import React from 'react';
import { Link } from 'react-router';

const NavBar = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';

  return (
    <header className={`absolute top-0 left-0 w-full z-20 px-6 md:px-16 py-4 flex items-center justify-between ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <h1 className="text-xl font-bold">BookLib</h1>
      <nav className={`space-x-6 text-sm ${isDark ? '' : 'text-gray-800'}`}>
        <Link to="/" className={`hover:text-emerald-500 transition`}>Home</Link>
        <Link to="/" className={`hover:text-emerald-500 transition`}>Catalogue</Link>
        <Link to="/" className={`hover:text-emerald-500 transition`}>Deals</Link>
        <Link to="/" className={`hover:text-emerald-500 transition`}>About</Link>
        <Link to="/customer/cart" className={`hover:text-emerald-500 transition`}>Cart</Link>
        <Link to="/login" className={`hover:text-emerald-500 transition`}>Login</Link>
      </nav>
    </header>
  );
};

export default NavBar;
