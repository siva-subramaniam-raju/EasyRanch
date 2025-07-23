import React from 'react';
import { Users, Activity, Heart, Thermometer } from 'lucide-react';
import { Cow, CowProfilesProps } from '../types/index.ts';

const CowProfiles: React.FC<CowProfilesProps> = ({ onCowSelect }) => {
  const cowProfiles: Cow[] = [
    {
      id: 'C001',
      name: 'Bessie',
      age: 4,
      breed: 'Holstein',
      healthScore: 92,
      activityLevel: 'normal',
      temperature: 38.5,
      lastCheckup: '2024-02-25',
      reproductiveStatus: 'Pregnant'
    },
    {
      id: 'C023',
      name: 'Daisy',
      age: 3,
      breed: 'Jersey',
      healthScore: 88,
      activityLevel: 'high',
      temperature: 39.1,
      lastCheckup: '2024-02-28',
      reproductiveStatus: 'Heat'
    },
    {
      id: 'C045',
      name: 'Molly',
      age: 5,
      breed: 'Guernsey',
      healthScore: 85,
      activityLevel: 'low',
      temperature: 38.8,
      lastCheckup: '2024-02-20',
      reproductiveStatus: 'Inseminated'
    },
    {
      id: 'C067',
      name: 'Luna',
      age: 2,
      breed: 'Holstein',
      healthScore: 94,
      activityLevel: 'normal',
      temperature: 38.6,
      lastCheckup: '2024-02-27',
      reproductiveStatus: 'Open'
    }
  ];

  const getActivityColor = (level: string): string => {
    switch (level) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'low':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-green-600 bg-green-100';
    }
  };

  const getHealthColor = (score: number): string => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="dashboard-card rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Cow Profiles</h2>
        <Users className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="space-y-4">
        {cowProfiles.map((cow) => (
          <div
            key={cow.id}
            className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all cursor-pointer hover:border-green-300"
            onClick={() => onCowSelect?.(cow.id)}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-medium text-gray-900">{cow.name}</h3>
                <p className="text-sm text-gray-500">{cow.breed} • {cow.age} years</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${getHealthColor(cow.healthScore)}`}>
                  Health: {cow.healthScore}%
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-gray-400" />
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getActivityColor(cow.activityLevel)}`}>
                  {cow.activityLevel.charAt(0).toUpperCase() + cow.activityLevel.slice(1)}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Thermometer className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{cow.temperature}°C</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{cow.reproductiveStatus}</span>
              </div>
              
              <div className="text-xs text-gray-500">
                Last: {cow.lastCheckup}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CowProfiles; 