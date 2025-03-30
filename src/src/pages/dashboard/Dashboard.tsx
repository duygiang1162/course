import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuthStore } from '../../lib/store';

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center space-x-4">
            <img
              src={user?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.full_name || 'User')}`}
              alt={user?.full_name || 'User'}
              className="h-16 w-16 rounded-full"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.full_name || user?.username || 'User'}!
              </h2>
              <p className="text-gray-500">
                Member since {new Date(user?.created_at || '').toLocaleDateString()}
              </p>
              {location.state?.loggedIn && (
                <div className="mt-2 p-2 bg-green-100 text-green-800 rounded">
                  You have successfully logged in!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
