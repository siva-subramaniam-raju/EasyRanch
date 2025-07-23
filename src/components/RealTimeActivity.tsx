import React, { useState, useEffect } from 'react';
import { Clock, Activity, AlertCircle, CheckCircle, Filter, RefreshCw, Eye, ChevronDown } from 'lucide-react';

interface ActivityItem {
  id: string;
  cowId: string;
  cowName: string;
  activity: string;
  location: string;
  time: string;
  duration: string;
  status: 'normal' | 'success' | 'alert';
  type: 'feeding' | 'ruminating' | 'walking' | 'lying' | 'heat_detection';
}

const RealTimeActivity: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: '1',
      cowId: 'C001',
      cowName: 'Cow C001',
      activity: 'Started feeding at station 3',
      location: 'Feeding Station 3',
      time: '2 min ago',
      duration: '15 min',
      status: 'normal',
      type: 'feeding'
    },
    {
      id: '2',
      cowId: 'C045',
      cowName: 'Cow C045',
      activity: 'Good rumination pattern detected',
      location: 'Stall Area A',
      time: '5 min ago',
      duration: '45 min',
      status: 'success',
      type: 'ruminating'
    },
    {
      id: '3',
      cowId: 'C023',
      cowName: 'Cow C023',
      activity: 'Excessive lying detected',
      location: 'Stall Area B',
      time: '12 min ago',
      duration: '2 hours',
      status: 'alert',
      type: 'lying'
    },
    {
      id: '4',
      cowId: 'C012',
      cowName: 'Cow C012',
      activity: 'Moving to water station',
      location: 'Water Station 2',
      time: '15 min ago',
      duration: '5 min',
      status: 'normal',
      type: 'walking'
    },
    {
      id: '5',
      cowId: 'C089',
      cowName: 'Cow C089',
      activity: 'Resting in stall area',
      location: 'Stall Area C',
      time: '18 min ago',
      duration: '30 min',
      status: 'normal',
      type: 'lying'
    },
    {
      id: '6',
      cowId: 'C067',
      cowName: 'Cow C067',
      activity: 'Heat cycle indicators detected',
      location: 'Breeding Area',
      time: '25 min ago',
      duration: 'Ongoing',
      status: 'success',
      type: 'heat_detection'
    }
  ]);

  // Real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setActivities(prev => {
        const newActivities = [...prev];
        // Update times
        newActivities.forEach(activity => {
          if (activity.time.includes('min ago')) {
            const minutes = parseInt(activity.time.split(' ')[0]);
            if (minutes < 60) {
              activity.time = `${minutes + 1} min ago`;
            } else {
              activity.time = `${Math.floor(minutes / 60)}h ${minutes % 60}m ago`;
            }
          }
        });
        
        // Add new activity occasionally
        if (Math.random() > 0.7) {
          const newActivity: ActivityItem = {
            id: Date.now().toString(),
            cowId: `C${Math.floor(Math.random() * 100).toString().padStart(3, '0')}`,
            cowName: `Cow C${Math.floor(Math.random() * 100).toString().padStart(3, '0')}`,
            activity: 'New activity detected',
            location: 'Various locations',
            time: 'Now',
            duration: '5 min',
            status: 'normal',
            type: 'walking'
          };
          newActivities.unshift(newActivity);
        }
        
        return newActivities.slice(0, 10); // Keep only latest 10 activities
      });
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'alert':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'alert':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-blue-500" />;
    }
  };

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    return activity.status === filter;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh with new data
    setTimeout(() => {
      setActivities(prev => {
        const newActivities = [...prev];
        newActivities.forEach(activity => {
          activity.time = 'Just now';
        });
        return newActivities;
      });
      setIsRefreshing(false);
    }, 1000);
  };

  const handleViewDetails = (activity: ActivityItem) => {
    console.log('Viewing activity details:', activity);
    // Simulate opening activity details modal
    alert(`Opening details for ${activity.cowName} - ${activity.activity}...`);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    console.log('Filtering activities by:', newFilter);
  };

  return (
    <div className="dashboard-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <h2 className="text-lg font-semibold text-gray-900">Real-time Activity</h2>
          <Clock className="dashboard-icon" />
        </div>
        <button 
          onClick={handleRefresh}
          className="dashboard-button secondary"
          disabled={isRefreshing}
          title="Refresh activities"
        >
          <RefreshCw className={`dashboard-icon ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="relative">
          <select 
            value={filter}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="dashboard-select"
            title="Filter activities by status"
          >
            <option value="all">All Activities ({activities.length})</option>
            <option value="normal">Normal ({activities.filter(a => a.status === 'normal').length})</option>
            <option value="success">Success ({activities.filter(a => a.status === 'success').length})</option>
            <option value="alert">Alerts ({activities.filter(a => a.status === 'alert').length})</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 dashboard-icon pointer-events-none" />
        </div>
      </div>
      
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {filteredActivities.map((activity) => (
          <div 
            key={activity.id}
            className={`activity-item ${activity.status} cursor-pointer hover:shadow-md transition-all duration-200`}
            onClick={() => handleViewDetails(activity)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStatusIcon(activity.status)}
                <div>
                  <span className="font-medium text-gray-900">{activity.cowName}</span>
                  <span className="text-xs text-gray-500 ml-2">• {activity.location}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">{activity.time}</span>
                <Eye className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
            </div>
            <p className="text-sm text-gray-700 mt-2">{activity.activity}</p>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-3">
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                  activity.status === 'success' ? 'bg-gray-100 text-gray-800' :
                  activity.status === 'alert' ? 'bg-gray-100 text-gray-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {activity.type.charAt(0).toUpperCase() + activity.type.slice(1).replace('_', ' ')}
                </span>
                <span className="text-xs text-gray-500">Duration: {activity.duration}</span>
              </div>
              <button 
                className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewDetails(activity);
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Real-time status indicator */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span>Live activity data updating every 15 seconds</span>
        </div>
      </div>
    </div>
  );
};

export default RealTimeActivity; 