import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Learn Without Limits
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Access quality education from expert instructors worldwide
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/courses"
                className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100"
              >
                Browse Courses
              </Link>
              <Link
                to="/signup"
                className="border-2 border-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600"
              >
                Join Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Quality Content</h3>
            <p className="text-gray-600">
              Expert-led courses with practical examples and exercises
            </p>
          </div>
          <div className="text-center p-6">
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Interactive Learning</h3>
            <p className="text-gray-600">
              Engage with instructors and fellow learners in real-time
            </p>
          </div>
          <div className="text-center p-6">
            <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Certified Courses</h3>
            <p className="text-gray-600">
              Earn recognized certificates upon course completion
            </p>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={`https://images.unsplash.com/photo-167${i}956217094-0df${i}c9c29c0?auto=format&fit=crop&w=800`}
                  alt="Course thumbnail"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Web Development Fundamentals</h3>
                  <p className="text-gray-600 mb-4">Learn the basics of web development with HTML, CSS, and JavaScript</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-semibold">$49.99</span>
                    <Link
                      to="/course-details"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
