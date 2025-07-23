import React, { useState } from 'react';
import { Bell, Settings, User, Wifi, LogOut, User as UserIcon, ChevronDown, X } from 'lucide-react';
import { Notification } from '../types/index.ts';

const Header: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);

  const notifications: Notification[] = [
    {
      id: 1,
      title: 'New Alert',
      message: 'Cow C023 has elevated temperature',
      time: '2 min ago',
      type: 'health'
    },
    {
      id: 2,
      title: 'System Update',
      message: 'Barn sensor #5 battery low',
      time: '15 min ago',
      type: 'system'
    },
    {
      id: 3,
      title: 'Breeding Alert',
      message: 'Cow C045 is in heat cycle',
      time: '1 hour ago',
      type: 'breeding'
    }
  ];

  const getNotificationIcon = (type: string): JSX.Element => {
    switch (type) {
      case 'health':
        return <div className="w-2 h-2 bg-red-500 rounded-full"></div>;
      case 'system':
        return <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>;
      case 'breeding':
        return <div className="w-2 h-2 bg-blue-500 rounded-full"></div>;
      default:
        return <div className="w-2 h-2 bg-gray-500 rounded-full"></div>;
    }
  };

  return (
    <header className="farm-header sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900">Easy Ranch</h1>
              <p className="text-sm text-gray-500">Cow Monitoring Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-white pasture-accent px-3 py-1 rounded-full">
              <Wifi className="w-4 h-4" />
              <span className="text-sm font-medium">Connected</span>
            </div>
            
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-all relative"
              >
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                      <button 
                        onClick={() => setShowNotifications(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start space-x-3">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <button className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium">
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Settings */}
            <div className="relative">
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-all"
              >
                <Settings className="w-5 h-5" />
              </button>
              
              {showSettings && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
                  </div>
                  <div className="p-2">
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                      Dashboard Preferences
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                      Alert Settings
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                      Data Export
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                      System Configuration
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* User Menu */}
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">Farm Manager</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-2">
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors flex items-center space-x-2">
                      <UserIcon className="w-4 h-4" />
                      <span>Profile</span>
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors flex items-center space-x-2">
                      <Settings className="w-4 h-4" />
                      <span>Account Settings</span>
                    </button>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors flex items-center space-x-2">
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Backdrop for modals */}
      {(showNotifications || showSettings || showUserMenu) && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowNotifications(false);
            setShowSettings(false);
            setShowUserMenu(false);
          }}
        />
      )}
    </header>
  );
};

export default Header; 