import React, { useState } from 'react';
import { Eye, Thermometer } from 'lucide-react';
import { CowData, BarnLayoutData } from '../types';
import { HEALTH_STATUS_COLORS } from '../data/constants';

interface BarnLayoutProps {
  cows: CowData[];
  layout: BarnLayoutData;
}

const BarnLayout: React.FC<BarnLayoutProps> = ({ cows, layout }) => {
  const [liveView, setLiveView] = useState(false);

  const getStatusColor = (healthStatus: string) => {
    return HEALTH_STATUS_COLORS[healthStatus as keyof typeof HEALTH_STATUS_COLORS] || '#6B7280';
  };

  const getZoneColor = (zoneType: string) => {
    const colors = {
      feeding: '#FEF3C7', // yellow-100
      resting: '#DBEAFE', // blue-100
      walkway: '#F3F4F6', // gray-100
      milking: '#FEE2E2', // red-100
      medical: '#FECACA', // red-200
    };
    return colors[zoneType as keyof typeof colors] || '#F3F4F6';
  };

  const averageTemp = cows.reduce((sum, cow) => sum + cow.vitals.temperature, 0) / cows.length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Barn Layout</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setLiveView(!liveView)}
            className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              liveView 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Live View</span>
          </button>
          <Thermometer className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="relative bg-green-50 rounded-lg p-4 mb-4" style={{ aspectRatio: '5/3' }}>
        <svg
          viewBox={`0 0 ${layout.dimensions.width} ${layout.dimensions.height}`}
          className="w-full h-full"
        >
          {/* Render zones */}
          {layout.zones.map((zone) => (
            <polygon
              key={zone.id}
              points={zone.coordinates.map(coord => `${coord.x},${coord.y}`).join(' ')}
              fill={getZoneColor(zone.type)}
              stroke="#D1D5DB"
              strokeWidth="0.5"
              opacity="0.7"
            />
          ))}

          {/* Render feeding areas */}
          <rect x="10" y="8" width="25" height="4" fill="#FCD34D" rx="1" />
          <rect x="65" y="8" width="25" height="4" fill="#FCD34D" rx="1" />

          {/* Render cows with larger, more visible dots */}
          {cows.slice(0, 12).map((cow) => {
            const isAlert = cow.healthStatus === 'attention' || cow.healthStatus === 'sick' || cow.healthStatus === 'critical';
            const hasAlerts = cow.alerts.length > 0;
            const shouldBlink = isAlert || hasAlerts;
            
            return (
              <g key={cow.id}>
                {/* Outer glow for better visibility */}
                <circle
                  cx={cow.location.x}
                  cy={cow.location.y}
                  r="6"
                  fill={getStatusColor(cow.healthStatus)}
                  opacity="0.3"
                  className={shouldBlink ? 'animate-pulse' : ''}
                />
                {/* Main dot */}
                <circle
                  cx={cow.location.x}
                  cy={cow.location.y}
                  r="4"
                  fill={getStatusColor(cow.healthStatus)}
                  stroke="white"
                  strokeWidth="1"
                  className={shouldBlink ? 'animate-pulse' : (liveView ? 'animate-pulse' : '')}
                />
                {/* Inner highlight */}
                <circle
                  cx={cow.location.x - 1}
                  cy={cow.location.y - 1}
                  r="1.5"
                  fill="white"
                  opacity="0.8"
                />
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-full shadow-sm"></div>
            <span className="text-sm text-gray-600">Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full shadow-sm"></div>
            <span className="text-sm text-gray-600">Resting</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full shadow-sm"></div>
            <span className="text-sm text-gray-600">Feeding</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded-full shadow-sm animate-pulse"></div>
            <span className="text-sm text-gray-600">Alert</span>
          </div>
        </div>
        <div className="text-sm text-gray-600 flex items-center space-x-1">
          <span>🌡️</span>
          <span>Avg: {averageTemp.toFixed(1)}°C</span>
        </div>
      </div>
    </div>
  );
};

export default BarnLayout;