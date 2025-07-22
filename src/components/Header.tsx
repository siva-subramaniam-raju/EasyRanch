import React, { useState, useRef, useEffect } from 'react';
import { Wifi, Settings, User, Bell, Moon, Sun, Monitor, Volume2, VolumeX, Shield, Database, Download, Upload, RefreshCw, LogOut, User as UserIcon } from 'lucide-react';

const Header: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const settingsRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    // Apply dark mode to document
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleNotificationToggle = () => {
    setNotifications(!notifications);
  };

  const handleSoundToggle = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleExportData = () => {
    // Simulate data export
    const data = {
      timestamp: new Date().toISOString(),
      message: 'Data exported successfully'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'farm-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);
            console.log('Imported data:', data);
            alert('Data imported successfully!');
          } catch (error) {
            alert('Invalid file format!');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleRefreshData = () => {
    // Simulate data refresh
    console.log('Refreshing data...');
    // You can add actual refresh logic here
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      console.log('Logging out...');
      // Add actual logout logic here
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg border-b border-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🐄</span>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">EasyRanch</h1>
                <p className="text-xs sm:text-sm text-blue-100">Cow Monitoring Dashboard</p>
              </div>
            </div>
          </div>
          
          {/* Status and Controls */}
          <div className="flex items-center space-x-3 sm:space-x-6">
            {/* Connection Status */}
            <div className="hidden sm:flex items-center space-x-2 bg-green-500 bg-opacity-20 text-green-100 px-3 py-1.5 rounded-full border border-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <Wifi className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">Connected</span>
            </div>
            
            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 text-blue-100 hover:text-white hover:bg-blue-500 rounded-lg transition-all duration-200"
              >
                <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-blue-600">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
              </button>
              
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 transform transition-all duration-200">
                  <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                    <p className="text-sm text-gray-600">Real-time farm alerts</p>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 animate-pulse"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">Cow #123 showing unusual behavior</p>
                          <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">Temperature alert in Barn A</p>
                          <p className="text-xs text-gray-500 mt-1">5 minutes ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-t border-gray-200 bg-gray-50">
                    <button className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Settings Menu */}
            <div className="relative" ref={settingsRef}>
              <button 
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="p-2 text-blue-100 hover:text-white hover:bg-blue-500 rounded-lg transition-all duration-200"
              >
                <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              
              {isSettingsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 transform transition-all duration-200">
                  <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
                    <p className="text-sm text-gray-600">Configure your dashboard</p>
                  </div>
                  
                  <div className="p-4 space-y-6">
                    {/* Appearance */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                        <Monitor className="w-4 h-4 mr-2" />
                        Appearance
                      </h4>
                      <div className="space-y-2">
                        <button
                          onClick={handleDarkModeToggle}
                          className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                            <span className="text-sm">Dark Mode</span>
                          </div>
                          <div className={`w-10 h-6 rounded-full transition-colors ${darkMode ? 'bg-blue-600' : 'bg-gray-300'}`}>
                            <div className={`w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${darkMode ? 'translate-x-4' : 'translate-x-0.5'}`}></div>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Notifications */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                        <Bell className="w-4 h-4 mr-2" />
                        Notifications
                      </h4>
                      <div className="space-y-2">
                        <button
                          onClick={handleNotificationToggle}
                          className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <Bell className="w-4 h-4" />
                            <span className="text-sm">Enable Notifications</span>
                          </div>
                          <div className={`w-10 h-6 rounded-full transition-colors ${notifications ? 'bg-blue-600' : 'bg-gray-300'}`}>
                            <div className={`w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${notifications ? 'translate-x-4' : 'translate-x-0.5'}`}></div>
                          </div>
                        </button>
                        
                        <button
                          onClick={handleSoundToggle}
                          className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                            <span className="text-sm">Sound Alerts</span>
                          </div>
                          <div className={`w-10 h-6 rounded-full transition-colors ${soundEnabled ? 'bg-blue-600' : 'bg-gray-300'}`}>
                            <div className={`w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${soundEnabled ? 'translate-x-4' : 'translate-x-0.5'}`}></div>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Data Management */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                        <Database className="w-4 h-4 mr-2" />
                        Data Management
                      </h4>
                      <div className="space-y-2">
                        <button
                          onClick={handleExportData}
                          className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                        >
                          <Download className="w-4 h-4" />
                          <span className="text-sm">Export Data</span>
                        </button>
                        
                        <button
                          onClick={handleImportData}
                          className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                        >
                          <Upload className="w-4 h-4" />
                          <span className="text-sm">Import Data</span>
                        </button>
                        
                        <button
                          onClick={handleRefreshData}
                          className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                        >
                          <RefreshCw className="w-4 h-4" />
                          <span className="text-sm">Refresh Data</span>
                        </button>
                      </div>
                    </div>

                    {/* System */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                        <Shield className="w-4 h-4 mr-2" />
                        System
                      </h4>
                      <div className="space-y-2">
                        <button className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                          <Database className="w-4 h-4" />
                          <span className="text-sm">Database Settings</span>
                        </button>
                        
                        <button className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                          <Shield className="w-4 h-4" />
                          <span className="text-sm">Security</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 text-blue-100 hover:text-white hover:bg-blue-500 rounded-lg transition-all duration-200"
              >
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center border border-white border-opacity-30">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium text-white">Farm Manager</div>
                </div>
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 transform transition-all duration-200">
                  <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Farm Manager</p>
                        <p className="text-xs text-gray-600">Administrator</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <button className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                      <UserIcon className="w-4 h-4" />
                      <span className="text-sm">Profile</span>
                    </button>
                    
                    <button className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                      <Settings className="w-4 h-4" />
                      <span className="text-sm">Account Settings</span>
                    </button>
                    
                    <div className="border-t border-gray-200 my-2"></div>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-red-50 transition-colors text-left text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;