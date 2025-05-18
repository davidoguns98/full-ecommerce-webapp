import React from "react";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="">
          <img src="../assets/logo.png" alt="logo" />
        </Link>
        <div className="space-x-6">
          <Link to="/" className="hover:text-yellow-400">
            Home
          </Link>
          <Link to="/products" className="hover:text-yellow-400">
            Products
          </Link>
          <Link to="/cart" className="hover:text-yellow-400">
            Cart
          </Link>
        </div>
        <div>
          <Link to="/login" className="hover:text-yellow-400">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
