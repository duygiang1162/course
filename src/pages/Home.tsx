import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../lib/store';

const courses = [
  {
    id: 1,
    title: 'Advanced React Patterns',
    thumbnail: '/placeholder-react.jpg',
    rating: 4.8,
    price: 89.99,
    students: 1245
  },
  {
    id: 2,
    title: 'TypeScript Masterclass',
    thumbnail: '/placeholder-ts.jpg',
    rating: 4.7,
    price: 79.99,
    students: 987
  },
  {
    id: 3,
    title: 'Node.js Performance',
    thumbnail: '/placeholder-node.jpg',
    rating: 4.6,
    price: 69.99,
    students: 756
  },
  {
    id: 4,
    title: 'CSS Architecture',
    thumbnail: '/placeholder-css.jpg',
    rating: 4.5,
    price: 59.99,
    students: 654
  },
  {
    id: 5,
    title: 'Database Design',
    thumbnail: '/placeholder-db.jpg',
    rating: 4.9,
    price: 99.99,
    students: 1432
  }
];

const recentCourses = [
  { id: 1, title: 'Advanced React Patterns', progress: 75 },
  { id: 2, title: 'TypeScript Masterclass', progress: 42 },
  { id: 3, title: 'Node.js Performance', progress: 18 }
];

const Home = () => {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50 transition-all duration-300 ease-in-out">
      {!user ? (
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
                Welcome
              </h2>
              <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Learn something new today
              </h1>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Get started by creating an account
              </p>
            </div>

            {}

            <section className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Courses</h2>
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {courses.map((course) => (
                  <div key={course.id} className="group relative transition-transform duration-300 hover:scale-105">
                    <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <Link to={`/courses/${course.id}`}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {course.title}
                          </Link>
                        </h3>
                        <div className="mt-1 flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="text-xs text-gray-500 ml-1">({course.rating})</span>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-900">${course.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome back, {user.email}</h1>
              
              <section className="mb-8 bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
                <h2 className="text-xl font-semibold mb-4">Learning Progress</h2>
                <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: '65%' }}
                  />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Courses</p>
                    <p className="text-xl font-bold">3</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Completion</p>
                    <p className="text-xl font-bold">65%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Hours</p>
                    <p className="text-xl font-bold">12.5</p>
                  </div>
                </div>
              </section>

              <section className="mb-8 bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
                <h2 className="text-xl font-semibold mb-4">Recently Accessed</h2>
                <div className="space-y-4">
                  {recentCourses.map((course) => (
                    <div key={course.id} className="flex items-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-md mr-4"></div>
                      <div className="flex-1">
                        <h3 className="font-medium">{course.title}</h3>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-out" 
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="md:w-1/3">
              <section className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
                <h2 className="text-xl font-semibold mb-4">Course Roadmap</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-600 mt-1 mr-3"></div>
                    <div>
                      <p className="font-medium">Advanced React Patterns</p>
                      <p className="text-sm text-gray-500">Next: Performance Optimization</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-600 mt-1 mr-3"></div>
                    <div>
                      <p className="font-medium">TypeScript Masterclass</p>
                      <p className="text-sm text-gray-500">Next: Advanced Types</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-gray-300 mt-1 mr-3"></div>
                    <div>
                      <p className="font-medium text-gray-400">Database Design</p>
                      <p className="text-sm text-gray-400">Not started</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
