import React from 'react';
import { Clock, Eye, MoreVertical } from 'lucide-react';
import { RealTimeActivityItem } from '../types';
import { ACTIVITY_TYPES } from '../data/constants';

interface RealTimeActivityProps {
  activities: RealTimeActivityItem[];
}

const RealTimeActivity: React.FC<RealTimeActivityProps> = ({ activities }) => {
  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ${diffMins % 60}m ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  const getActivityIcon = (activityType: string) => {
    return ACTIVITY_TYPES[activityType as keyof typeof ACTIVITY_TYPES]?.icon || '📍';
  };

  const getActivityColor = (activityType: string) => {
    return ACTIVITY_TYPES[activityType as keyof typeof ACTIVITY_TYPES]?.color || '#6B7280';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold text-gray-900">Real-time Activity</h2>
          <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
            All Activities (6)
          </div>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded">
          <MoreVertical className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.slice(0, 6).map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
              style={{ backgroundColor: getActivityColor(activity.activityType) }}
            >
              {getActivityIcon(activity.activityType)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">
                  {activity.cowName} • {activity.activityType}
                </p>
                <span className="text-xs text-gray-500">{formatTimeAgo(activity.timestamp)}</span>
              </div>
              
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-xs text-gray-600">
                  {activity.activityType === 'eating' ? 'Eating' : 
                   activity.activityType === 'walking' ? 'Started feeding at station 3' :
                   activity.activityType === 'resting' ? 'Good rumination pattern detected' :
                   `${activity.activityType} activity`}
                </span>
                {activity.duration && (
                  <span className="text-xs text-gray-500">
                    Duration: {activity.duration}m
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">
                  {activity.location || 'Station 3'}
                </span>
                <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="w-full text-center text-blue-600 hover:text-blue-700 font-medium text-sm">
          View All Activities
        </button>
      </div>
    </div>
  );
};

export default RealTimeActivity;