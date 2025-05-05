import React from 'react'
import { Link } from 'react-router'

const NavBar = () => {
  return (
    <header className="absolute top-0 left-0 w-full z-20 px-6 md:px-16 py-4 flex items-center justify-between text-white">
    <h1 className="text-xl font-bold">BookLib</h1>
    <nav className="space-x-6 text-sm">
        <Link to="/" className="hover:text-emerald-300 transition">Home</Link>
        <Link to="/" className="hover:text-emerald-300 transition">Catalogue</Link>
        <Link to="/" className="hover:text-emerald-300 transition">Deals</Link>
        <Link to="/" className="hover:text-emerald-300 transition">About</Link>
    </nav>
</header>
  )
}

export default NavBar