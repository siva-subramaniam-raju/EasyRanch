import React from 'react';
import { Calendar, CheckCircle2, Heart, Clock, TrendingUp } from 'lucide-react';

interface PregnancyStatusItem {
  id: string;
  cowId: string;
  cowName: string;
  status: 'pregnant' | 'heat' | 'inseminated' | 'open';
  daysInCycle: number;
  confidence: number;
  lastInsemination?: string;
  expectedCalving?: string;
}

const PregnancyStatus: React.FC = () => {
  const pregnancyData: PregnancyStatusItem[] = [
    {
      id: '1',
      cowId: 'C001',
      cowName: 'Cow C001',
      status: 'pregnant',
      daysInCycle: 45,
      confidence: 95,
      lastInsemination: '2024-01-15',
      expectedCalving: '2024-10-23'
    },
    {
      id: '2',
      cowId: 'C023',
      cowName: 'Cow C023',
      status: 'heat',
      daysInCycle: 21,
      confidence: 88
    },
    {
      id: '3',
      cowId: 'C045',
      cowName: 'Cow C045',
      status: 'inseminated',
      daysInCycle: 3,
      confidence: 92,
      lastInsemination: '2024-02-28'
    },
    {
      id: '4',
      cowId: 'C067',
      cowName: 'Cow C067',
      status: 'open',
      daysInCycle: 35,
      confidence: 78
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pregnant':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'heat':
        return <Heart className="w-4 h-4 text-red-500" />;
      case 'inseminated':
        return <Clock className="w-4 h-4 text-blue-500" />;
      default:
        return <TrendingUp className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pregnant':
        return 'text-green-700 bg-green-100';
      case 'heat':
        return 'text-red-700 bg-red-100';
      case 'inseminated':
        return 'text-blue-700 bg-blue-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pregnant':
        return 'Pregnant';
      case 'heat':
        return 'Heat';
      case 'inseminated':
        return 'Inseminated';
      default:
        return 'Open';
    }
  };

  return (
    <div className="dashboard-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Pregnancy Status</h2>
        <Calendar className="dashboard-icon" />
      </div>
      
      <div className="space-y-4">
        {pregnancyData.map((cow) => (
          <div key={cow.id} className={`pregnancy-card ${cow.status}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {getStatusIcon(cow.status)}
                <span className="font-medium text-gray-900">{cow.cowName}</span>
              </div>
              <span className={`status-badge ${cow.status}`}>
                {getStatusText(cow.status)}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Days in cycle</p>
                <p className="font-medium">{cow.daysInCycle}</p>
              </div>
              <div>
                <p className="text-gray-500">Confidence</p>
                <p className="font-medium">{cow.confidence}%</p>
              </div>
            </div>
            
            {cow.lastInsemination && (
              <div className="mt-3 text-sm">
                <p className="text-gray-500">Last insemination</p>
                <p className="font-medium">{cow.lastInsemination}</p>
              </div>
            )}
            
            {cow.expectedCalving && (
              <div className="mt-3 text-sm">
                <p className="text-gray-500">Expected calving</p>
                <p className="font-medium text-green-600">{cow.expectedCalving}</p>
              </div>
            )}
            
            <div className="mt-3">
              <div className="progress-bar">
                <div 
                  className={`progress-fill ${cow.status}`}
                  style={{ width: `${cow.confidence}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PregnancyStatus; 