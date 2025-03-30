import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">CourseApp</h3>
            <p className="text-gray-400 text-sm">
              Empowering learners worldwide with quality education.
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">About Us</Link></li>
              <li><Link to="/courses" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Courses</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>hello@courseapp.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Learning St, Edu City</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} CourseApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
