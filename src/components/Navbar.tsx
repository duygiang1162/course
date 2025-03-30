import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../lib/store';

const Navbar = () => {
  const { user, signOut } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900">
              LearnHub
            </Link>
          </div>

          {!user ? (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md transition-colors duration-200"
              >
                Sign up
              </Link>
            </div>
          ) : (
            <div className="ml-4 flex items-center md:ml-6 relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src={user.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email)}`}
                  alt="User profile"
                />
              </button>

              {dropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50 transition-all duration-150 ease-out">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-100"
                  >
                    Your Profile
                  </Link>
                  <Link
                    to="/courses"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-100"
                  >
                    Purchased Courses
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-100"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={signOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-100"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
