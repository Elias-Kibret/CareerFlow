import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../Store/userStore";
import { NAV_ITEMS, AUTH_ITEMS } from "../utils/headerConstants";
import { IoMdArrowDropdown } from "react-icons/io";

// Header Component
export const Header = () => {
  const { user, isAuthenticated, logout } = useUserStore((state) => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    logout: state.logout,
  }));
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-blue-600 text-white py-4 px-6 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Brand
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center hover:underline"
            >
              {item.icon}
              <span className="ml-2">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center px-2 py-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* User/Profile Section */}
        <div className="relative flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="relative">
              <button
                className="flex items-center space-x-2 bg-blue-700 px-4 py-2 rounded-md hover:bg-blue-800 focus:outline-none"
                type="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  src={user?.profileImage || "https://via.placeholder.com/40"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <span>{user?.name}</span>
                <IoMdArrowDropdown className="w-4 h-4 ml-2" />
              </button>

              <div
                className="absolute right-0 mt-2 w-48 bg-white text-gray-700 rounded-md shadow-lg z-10 hidden group-hover:block"
                aria-labelledby="profile-menu"
              >
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Update Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              {AUTH_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="bg-blue-700 px-4 py-2 rounded-md hover:bg-blue-800 flex items-center space-x-2"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-blue-600 text-white mt-4 space-y-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block px-4 py-2 hover:bg-blue-700 flex items-center space-x-2"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};
