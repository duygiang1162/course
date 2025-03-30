import React from 'react';
import { useAuthStore } from '../../lib/store';

const courses = [
  {
    id: 1,
    title: 'Advanced React Patterns',
    progress: 75,
    lastAccessed: '2023-06-15T14:30:00Z',
    milestones: [
      { title: 'Introduction', completed: true },
      { title: 'Component Design', completed: true },
      { title: 'Performance', completed: false },
      { title: 'Testing', completed: false }
    ],
    estCompletion: '2 weeks'
  },
  {
    id: 2,
    title: 'TypeScript Masterclass',
    progress: 42,
    lastAccessed: '2023-06-14T09:15:00Z',
    milestones: [
      { title: 'Basics', completed: true },
      { title: 'Interfaces', completed: true },
      { title: 'Generics', completed: false },
      { title: 'Advanced Types', completed: false }
    ],
    estCompletion: '3 weeks'
  }
];

const Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50 transition-opacity duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Learning Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Course Progress Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
            <h2 className="text-xl font-semibold mb-6">Your Progress</h2>
            <div className="space-y-6">
              {courses.map(course => (
                <div key={course.id} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{course.title}</h3>
                    <span className="text-sm text-gray-500">
                      Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <div className="mt-1 text-right text-sm text-gray-500">
                    {course.progress}% complete
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Path Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
            <h2 className="text-xl font-semibold mb-6">Learning Path</h2>
            <div className="space-y-6">
              {courses.map(course => (
                <div key={course.id}>
                  <h3 className="font-medium mb-3">{course.title}</h3>
                  <div className="space-y-3">
                    {course.milestones.map((milestone, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className={`flex-shrink-0 h-5 w-5 rounded-full mt-1 mr-3 ${milestone.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                        <div>
                          <p className={`${milestone.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                            {milestone.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-sm text-gray-500">
                    Estimated completion: {course.estCompletion}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
