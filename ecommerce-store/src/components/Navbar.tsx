import React, { useState } from "react";
import {
  faBars,
  faBox,
  faUser,
  faShoppingCart,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Navbar = ({ cart }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDesktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="https://via.placeholder.com/40"
            alt="Logo"
            className="h-10 w-auto"
          />
        </Link>

        {/* Search Bar (Desktop only) */}
        <div className="hidden md:flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search..."
            className="w-64 border border-gray-300 rounded-l-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
          <button className="bg-blue-500 text-white px-3 py-1.5 text-sm rounded-r-md hover:bg-blue-600">
            Search
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="/products"
              className="flex items-center space-x-1 hover:text-blue-400"
            >
              <FontAwesomeIcon icon={faBox} />
              <span>Product</span>
            </a>

            {/* My Account Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDesktopDropdownOpen(!isDesktopDropdownOpen)}
                className="flex items-center space-x-1 hover:text-blue-400 focus:outline-none"
              >
                <FontAwesomeIcon icon={faUser} />
                <span>My Account</span>
                <FontAwesomeIcon icon={faChevronDown} className="text-sm" />
              </button>
              {isDesktopDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 border rounded shadow-md z-50">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Profile
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Orders
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Logout
                  </a>
                </div>
              )}
            </div>

            <Link
              to="/cart"
              className="flex items-center space-x-1 hover:text-blue-400"
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              <span>Cart ({totalItems})</span>
            </Link>
          </div>

          {/* Mobile Hamburger (right-aligned) */}
          <button
            className="md:hidden text-2xl focus:outline-none ml-auto"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          <div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            />
            <button className="w-full mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm">
              Search
            </button>
          </div>
          <a href="#" className="block hover:text-blue-400">
            Product
          </a>

          <button
            onClick={() => setMobileDropdownOpen(!isMobileDropdownOpen)}
            className="w-full text-left flex items-center justify-between hover:text-blue-400"
          >
            My Account
            <FontAwesomeIcon icon={faChevronDown} className="text-sm" />
          </button>

          {isMobileDropdownOpen && (
            <div className="pl-4 mt-1 space-y-1">
              <a href="#" className="block hover:text-blue-400">
                Profile
              </a>
              <a href="#" className="block hover:text-blue-400">
                Orders
              </a>
              <a href="#" className="block hover:text-blue-400">
                Logout
              </a>
            </div>
          )}

          <a href="#" className="block hover:text-blue-400">
            Cart
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
