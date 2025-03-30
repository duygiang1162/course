import React from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ShoppingCart, Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">LearnHub</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/courses" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Courses
              </Link>
              <Link to="/topics" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Topics
              </Link>
              <Link to="/teachers" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Teachers
              </Link>
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <button className="text-gray-700 hover:text-blue-600">
              <Search className="h-5 w-5" />
            </button>
            <Link to="/cart" className="text-gray-700 hover:text-blue-600">
              <ShoppingCart className="h-5 w-5" />
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-blue-600">
              <User className="h-5 w-5" />
            </Link>
          </div>
          
          <div className="flex items-center sm:hidden">
            <button className="text-gray-700 hover:text-blue-600">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
