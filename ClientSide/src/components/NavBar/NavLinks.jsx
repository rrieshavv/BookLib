import React from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

const NavLinks = ({ role }) => {
  return (
    <nav className="flex space-x-6 text-sm">
      <Link to="/" className="hover:text-emerald-500 transition">
        Home
      </Link>
      <Link to="/catalog" className="hover:text-emerald-500 transition">
        Catalogue
      </Link>
      <Link to="/deals" className="hover:text-emerald-500 transition">
        Deals
      </Link>
      <Link to="/about-us" className="hover:text-emerald-500 transition">
        About
      </Link>
      {!role && (
        <Link to="/login" className="hover:text-emerald-500 transition">
          Login
        </Link>
      )}
      <Link
        to="/customer/cart"
        aria-label="Cart"
        className="ml-4 text-xl hover:text-emerald-500 transition"
      >
        <FiShoppingCart />
      </Link>
    </nav>
  );
};

export default NavLinks;
