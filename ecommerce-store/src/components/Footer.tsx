import React from "react";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand/Logo */}
        <div>
          <h2 className="text-2xl font-bold mb-3">MyShop</h2>
          <p className="text-gray-400 text-sm">
            Your one-stop marketplace for electronics, fashion, gadgets & more.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="#" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Categories
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Subscription */}
        <div>
          <h3 className="font-semibold mb-3">Newsletter</h3>
          <p className="text-sm text-gray-400 mb-3">
            Get updates about our latest offers and products.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center border border-gray-600 rounded overflow-hidden"
          >
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 text-sm bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
            />
            <button className="bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-700 transition">
              Subscribe
            </button>
          </form>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-gray-400">
            <a href="#">
              <FontAwesomeIcon
                icon={faFacebookF}
                className="hover:text-white"
              />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faTwitter} className="hover:text-white" />
            </a>
            <a href="#">
              <FontAwesomeIcon
                icon={faInstagram}
                className="hover:text-white"
              />
            </a>
            <a href="#">
              <FontAwesomeIcon
                icon={faLinkedinIn}
                className="hover:text-white"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
