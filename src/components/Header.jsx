import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-6 bg-blue-950 sticky top-0 left-0 right-0 z-20 m-0">
      <Link to="/" className="text-white text-2xl font-bold">
        ch<span className="text-pink-400">Stream</span>IV
      </Link>
      <nav className="flex gap-4">
        <Link to="/buy-now" className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-medium transition-colors">
          Buy now
        </Link>
        <Link to="/about" className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-medium transition-colors">
          About Us
        </Link>
        <Link to="/contact" className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-medium transition-colors">
          Contact
        </Link>
      </nav>
    </header>
  );
};

export default Header;
