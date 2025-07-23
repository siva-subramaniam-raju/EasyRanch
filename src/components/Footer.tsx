import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        {/* Logo and Application Name */}
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <svg 
              className="w-6 h-6 text-white" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12.5 2a6.5 6.5 0 0 0-6.22 4.6c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c4 0 8.4-1.8 11.4-4.3A6.5 6.5 0 0 0 12.5 2Z"/>
              <path d="m18.5 6 2.19 4.5a6.48 6.48 0 0 1 .31 2 6.49 6.49 0 0 1-2.6 5.2C15.4 20.2 11 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5"/>
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Easy Ranch</h2>
            <p className="text-sm text-gray-600">Farm Management System</p>
          </div>
        </div>

        {/* Copyright and Version Info */}
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-600">
          <span>© 2024 Easy Ranch. All rights reserved.</span>
          <span className="hidden sm:inline">•</span>
          <span>Version 1.0.0</span>
          <span className="hidden sm:inline">•</span>
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 