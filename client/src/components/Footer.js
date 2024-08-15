import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* First Column */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              About Us
            </h3>
            <p className="text-gray-600">
              We are a team of passionate individuals dedicated to helping you
              find the best job opportunities.
            </p>
          </div>

          {/* Second Column */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Services
            </h3>
            <ul className="list-none space-y-2">
              <li>
                <a href="#" className="text-orange-500 hover:text-orange-600">
                  Job Search
                </a>
              </li>
              <li>
                <a href="#" className="text-orange-500 hover:text-orange-600">
                  Resume Building
                </a>
              </li>
              <li>
                <a href="#" className="text-orange-500 hover:text-orange-600">
                  Career Counseling
                </a>
              </li>
              <li>
                <a href="#" className="text-orange-500 hover:text-orange-600">
                  Interview Preparation
                </a>
              </li>
            </ul>
          </div>

          {/* Third Column */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Links
            </h3>
            <ul className="list-none space-y-2">
              <li>
                <a href="#" className="text-orange-500 hover:text-orange-600">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-orange-500 hover:text-orange-600">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-orange-500 hover:text-orange-600">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-orange-500 hover:text-orange-600">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Fourth Column */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Follow Us
            </h3>
            <ul className="list-none space-y-2">
              <li>
                <a href="#" className="text-orange-500 hover:text-orange-600">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-orange-500 hover:text-orange-600">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-orange-500 hover:text-orange-600">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="text-orange-500 hover:text-orange-600">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
