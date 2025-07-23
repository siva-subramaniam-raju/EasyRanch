import React, { useState } from 'react';
import { Eye, MapPin, Thermometer, X, Activity, Heart, Milk, AlertTriangle, Clock, MapPin as LocationPin } from 'lucide-react';

interface CowPosition {
  id: string;
  cowId: string;
  x: number;
  y: number;
  status: 'active' | 'resting' | 'feeding' | 'alert';
  temperature: number;
  name: string;
  breed?: string;
  age?: number;
  weight?: number;
  milkProduction?: number;
  lastMilking?: string;
  healthScore?: number;
  location?: string;
  activityLevel?: number;
}

interface CowDetails {
  cowId: string;
  name: string;
  breed: string;
  age: number;
  weight: number;
  temperature: number;
  milkProduction: number;
  lastMilking: string;
  healthScore: number;
  location: string;
  activityLevel: number;
  status: string;
  recentActivity: string[];
  alerts: string[];
}

const BarnLayout: React.FC = () => {
  const [selectedCow, setSelectedCow] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const cows: CowPosition[] = [
    {
      id: '1',
      cowId: 'C001',
      x: 20,
      y: 30,
      status: 'resting',
      temperature: 38.5,
      name: 'C001',
      breed: 'Holstein',
      age: 4,
      weight: 650,
      milkProduction: 28.5,
      lastMilking: '2 hours ago',
      healthScore: 95,
      location: 'Main Barn - Section A',
      activityLevel: 65
    },
    {
      id: '2',
      cowId: 'C023',
      x: 60,
      y: 20,
      status: 'alert',
      temperature: 39.1,
      name: 'C023',
      breed: 'Jersey',
      age: 3,
      weight: 450,
      milkProduction: 22.3,
      lastMilking: '1 hour ago',
      healthScore: 78,
      location: 'Main Barn - Section B',
      activityLevel: 45
    },
    {
      id: '3',
      cowId: 'C045',
      x: 40,
      y: 60,
      status: 'feeding',
      temperature: 38.8,
      name: 'C045',
      breed: 'Guernsey',
      age: 5,
      weight: 550,
      milkProduction: 25.7,
      lastMilking: '3 hours ago',
      healthScore: 92,
      location: 'Main Barn - Section A',
      activityLevel: 88
    },
    {
      id: '4',
      cowId: 'C067',
      x: 80,
      y: 40,
      status: 'active',
      temperature: 38.6,
      name: 'C067',
      breed: 'Holstein',
      age: 2,
      weight: 600,
      milkProduction: 30.2,
      lastMilking: '4 hours ago',
      healthScore: 98,
      location: 'Main Barn - Section C',
      activityLevel: 92
    },
    {
      id: '5',
      cowId: 'C012',
      x: 25,
      y: 75,
      status: 'resting',
      temperature: 38.4,
      name: 'C012',
      breed: 'Ayrshire',
      age: 6,
      weight: 520,
      milkProduction: 24.1,
      lastMilking: '5 hours ago',
      healthScore: 89,
      location: 'Main Barn - Section B',
      activityLevel: 55
    },
    {
      id: '6',
      cowId: 'C089',
      x: 70,
      y: 70,
      status: 'active',
      temperature: 38.7,
      name: 'C089',
      breed: 'Holstein',
      age: 3,
      weight: 580,
      milkProduction: 27.8,
      lastMilking: '2.5 hours ago',
      healthScore: 94,
      location: 'Main Barn - Section C',
      activityLevel: 85
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500 border-green-600';
      case 'resting':
        return 'bg-blue-500 border-blue-600';
      case 'feeding':
        return 'bg-yellow-500 border-yellow-600';
      case 'alert':
        return 'bg-red-500 border-red-600 animate-pulse';
      default:
        return 'bg-gray-500 border-gray-600';
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getActivityColor = (level: number) => {
    if (level >= 80) return 'text-green-600';
    if (level >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleCowClick = (cowId: string) => {
    setSelectedCow(cowId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCow(null);
  };

  const selectedCowData = cows.find(cow => cow.cowId === selectedCow);

  const averageTemperature = cows.reduce((sum, cow) => sum + cow.temperature, 0) / cows.length;

  return (
    <div className="dashboard-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Barn Layout</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Eye className="dashboard-icon" />
            <span className="text-sm text-gray-600">Live View</span>
          </div>
          <MapPin className="dashboard-icon" />
        </div>
      </div>
      
      <div className="chart-container mb-4">
        <div className="barn-container h-80">
          {/* Barn structure elements */}
          <div className="absolute top-4 left-4 right-4 h-8 bg-gray-300 rounded opacity-50"></div>
          <div className="absolute bottom-4 left-4 right-4 h-8 bg-gray-300 rounded opacity-50"></div>
          <div className="absolute top-16 left-4 bottom-16 w-8 bg-gray-300 rounded opacity-50"></div>
          <div className="absolute top-16 right-4 bottom-16 w-8 bg-gray-300 rounded opacity-50"></div>
          <div className="absolute top-4 left-16 w-20 h-8 bg-yellow-200 rounded opacity-70"></div>
          <div className="absolute top-4 right-16 w-20 h-8 bg-yellow-200 rounded opacity-70"></div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-blue-200 rounded opacity-70"></div>
          
          {/* Cow positions */}
          {cows.map((cow) => (
            <div
              key={cow.id}
              className={`cow-dot ${cow.status} cursor-pointer hover:scale-110 transition-transform`}
              style={{ left: `${cow.x}%`, top: `${cow.y}%` }}
              title={`${cow.name} - ${cow.status} - ${cow.temperature}°C`}
              onClick={() => handleCowClick(cow.cowId)}
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                {cow.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Resting</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Feeding</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Alert</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Thermometer className="w-4 h-4" />
          <span>Avg: {averageTemperature.toFixed(1)}°C</span>
        </div>
      </div>

      {/* Cow Details Modal */}
      {showModal && selectedCowData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {selectedCowData.name} - {selectedCowData.breed}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                title="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Activity className="w-4 h-4 mr-2" />
                    Basic Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cow ID:</span>
                      <span className="font-medium">{selectedCowData.cowId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Breed:</span>
                      <span className="font-medium">{selectedCowData.breed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Age:</span>
                      <span className="font-medium">{selectedCowData.age} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Weight:</span>
                      <span className="font-medium">{selectedCowData.weight} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{selectedCowData.location}</span>
                    </div>
                  </div>
                </div>

                {/* Health Metrics */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Heart className="w-4 h-4 mr-2" />
                    Health Metrics
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Temperature:</span>
                      <span className={`font-medium ${selectedCowData.temperature > 39 ? 'text-red-600' : 'text-green-600'}`}>
                        {selectedCowData.temperature}°C
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Health Score:</span>
                      <span className={`font-medium ${getHealthColor(selectedCowData.healthScore)}`}>
                        {selectedCowData.healthScore}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Activity Level:</span>
                      <span className={`font-medium ${getActivityColor(selectedCowData.activityLevel)}`}>
                        {selectedCowData.activityLevel}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`font-medium ${selectedCowData.status === 'alert' ? 'text-red-600' : 'text-green-600'}`}>
                        {selectedCowData.status.charAt(0).toUpperCase() + selectedCowData.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Production & Activity */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Milk className="w-4 h-4 mr-2" />
                    Production Data
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Milk Production:</span>
                      <span className="font-medium">{selectedCowData.milkProduction} L/day</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Milking:</span>
                      <span className="font-medium">{selectedCowData.lastMilking}</span>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Recent Activity
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="text-gray-600">
                      • Moved to feeding area 15 minutes ago
                    </div>
                    <div className="text-gray-600">
                      • Temperature check completed 30 minutes ago
                    </div>
                    <div className="text-gray-600">
                      • Milking session completed 2 hours ago
                    </div>
                    <div className="text-gray-600">
                      • Health check performed 4 hours ago
                    </div>
                  </div>
                </div>

                {/* Alerts */}
                {selectedCowData.status === 'alert' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-900 mb-3 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Alerts
                    </h4>
                    <div className="space-y-2 text-sm text-red-700">
                      <div>• Elevated temperature detected</div>
                      <div>• Reduced activity level observed</div>
                      <div>• Requires immediate attention</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                View Full Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BarnLayout; 