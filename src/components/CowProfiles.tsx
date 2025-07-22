import React from 'react';
import { Settings, Heart, Thermometer } from 'lucide-react';
import { CowData } from '../types';

interface CowProfilesProps {
  cows: CowData[];
}

const CowProfiles: React.FC<CowProfilesProps> = ({ cows }) => {
  const profileCows = cows.slice(0, 4);

  const getHealthColor = (healthStatus: string) => {
    const colors = {
      healthy: 'text-green-600',
      attention: 'text-yellow-600',
      sick: 'text-red-600',
      critical: 'text-red-700',
    };
    return colors[healthStatus as keyof typeof colors] || 'text-gray-600';
  };

  const getHealthPercentage = (healthStatus: string) => {
    const percentages = {
      healthy: 92,
      attention: 75,
      sick: 45,
      critical: 20,
    };
    return percentages[healthStatus as keyof typeof percentages] || 50;
  };

  const getStatusIcon = (pregnancyStatus: any) => {
    if (pregnancyStatus.isPregnant && pregnancyStatus.confidence > 80) return '🤰';
    if (pregnancyStatus.confidence > 60) return '❤️';
    if (pregnancyStatus.confidence > 40) return '🔄';
    return '⭕';
  };

  const getStatusText = (pregnancyStatus: any) => {
    if (pregnancyStatus.isPregnant && pregnancyStatus.confidence > 80) return 'Pregnant';
    if (pregnancyStatus.confidence > 60) return 'Heat';
    if (pregnancyStatus.confidence > 40) return 'Inseminated';
    return 'Open';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Cow Profiles</h2>
        <Settings className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {profileCows.map((cow) => (
          <div key={cow.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="text-lg">{getStatusIcon(cow.pregnancyStatus)}</div>
                <div>
                  <h3 className="font-medium text-gray-900">{cow.name || cow.id}</h3>
                  <p className="text-sm text-gray-500">{cow.breed} • {Math.floor(cow.age / 12)} years</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${getHealthColor(cow.healthStatus)}`}>
                  Health: {getHealthPercentage(cow.healthStatus)}%
                </div>
                <div className="text-xs text-gray-500">
                  Last: {formatDate(cow.lastCheckup)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="flex items-center space-x-2">
                <div className="text-sm">
                  {getStatusIcon(cow.pregnancyStatus)}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {getStatusText(cow.pregnancyStatus)}
                  </div>
                  <div className="text-xs text-gray-500">
                    Last: {formatDate(cow.lastActivity)}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Thermometer className="w-4 h-4 text-red-500" />
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {cow.vitals.temperature.toFixed(1)}°C
                  </div>
                  <div className="text-xs text-gray-500">
                    Last: {formatDate(cow.lastActivity)}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Health Status</span>
                <span className={getHealthColor(cow.healthStatus)}>
                  {getHealthPercentage(cow.healthStatus)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getHealthPercentage(cow.healthStatus)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CowProfiles;