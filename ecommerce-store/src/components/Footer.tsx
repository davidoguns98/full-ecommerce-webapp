import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 YourStore. All Rights Reserved.</p>
        <div className="mt-4">
          <a href="/terms" className="text-yellow-400 hover:text-yellow-300">
            Terms of Service
          </a>{" "}
          |
          <a href="/privacy" className="text-yellow-400 hover:text-yellow-300">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
