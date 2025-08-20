import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 border-b bg-white shadow-sm mb-6">
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-red-600 font-bold text-xl">P</span>
          <span className="font-bold text-lg">TokoOnline</span>
        </Link>
        <Link to="/" className="font-semibold text-gray-800 hover:text-black transition">Explore</Link>
      </div>
      <div className="flex items-center gap-6">
        <Link to="/about" className="text-blue-900 font-medium hover:underline">About</Link>
        <Link to="/cart" className="text-blue-900 font-medium hover:underline">Keranjang</Link>
      </div>
    </nav>
  );
};

export default Navbar;
