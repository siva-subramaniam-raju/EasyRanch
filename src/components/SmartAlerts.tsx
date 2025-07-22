import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Eye, X } from 'lucide-react';
import { AlertData } from '../types';
import { ALERT_PRIORITY_COLORS } from '../data/constants';

interface SmartAlertsProps {
  alerts: AlertData[];
}

const SmartAlerts: React.FC<SmartAlertsProps> = ({ alerts }) => {
  const [showResolved, setShowResolved] = useState(false);
  const activeAlerts = alerts.filter(alert => !alert.resolved);
  const resolvedAlerts = alerts.filter(alert => alert.resolved);

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours}h ${diffMins % 60}m ago`;
  };

  const getPriorityColor = (priority: string) => {
    return ALERT_PRIORITY_COLORS[priority as keyof typeof ALERT_PRIORITY_COLORS] || '#6B7280';
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      critical: 'bg-red-100 text-red-800',
      high: 'bg-red-100 text-red-700',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-gray-100 text-gray-700',
    };
    return colors[priority as keyof typeof colors] || colors.low;
  };

  const displayAlerts = showResolved ? resolvedAlerts : activeAlerts;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold text-gray-900">Smart Alerts</h2>
          <div className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
            3 active
          </div>
        </div>
        <button
          onClick={() => setShowResolved(!showResolved)}
          className="text-blue-600 text-sm font-medium hover:text-blue-700"
        >
          {showResolved ? 'Hide resolved' : 'Show resolved'}
        </button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {displayAlerts.slice(0, 5).map((alert) => (
          <div key={alert.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div 
                  className="w-2 h-2 rounded-full mt-2"
                  style={{ backgroundColor: getPriorityColor(alert.priority) }}
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-gray-900">{alert.cowId}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{formatTimeAgo(alert.timestamp)}</span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">{alert.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getPriorityBadge(alert.priority)}`}>
                      {alert.priority.charAt(0).toUpperCase() + alert.priority.slice(1)} Priority
                    </span>
                    {alert.resolved && (
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">
                        Resolved
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {!alert.resolved && (
                  <button className="text-green-600 hover:text-green-700 p-1">
                    <CheckCircle className="w-4 h-4" />
                  </button>
                )}
                <button className="text-blue-600 hover:text-blue-700 p-1">
                  <Eye className="w-4 h-4" />
                </button>
                {alert.resolved && (
                  <button className="text-gray-400 hover:text-gray-600 p-1">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            {!alert.resolved && alert.actionRequired && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors">
                  Resolve
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="w-full text-center text-blue-600 hover:text-blue-700 font-medium text-sm">
          View All Alerts
        </button>
      </div>
    </div>
  );
};

export default SmartAlerts;