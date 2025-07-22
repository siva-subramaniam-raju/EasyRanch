import React from 'react';
import { Calendar, TrendingUp } from 'lucide-react';
import { CowData } from '../types';

interface PregnancyStatusProps {
  cows: CowData[];
}

const PregnancyStatus: React.FC<PregnancyStatusProps> = ({ cows }) => {
  const pregnantCows = cows.filter(cow => cow.pregnancyStatus.isPregnant).slice(0, 4);

  const getStatusColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 70) return 'text-blue-600';
    if (confidence >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBadge = (confidence: number) => {
    if (confidence >= 90) return { text: 'Pregnant', class: 'bg-green-100 text-green-800' };
    if (confidence >= 70) return { text: 'Heat', class: 'bg-red-100 text-red-800' };
    if (confidence >= 50) return { text: 'Inseminated', class: 'bg-blue-100 text-blue-800' };
    return { text: 'Open', class: 'bg-gray-100 text-gray-800' };
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'N/A';
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Pregnancy Status</h2>
        <Calendar className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {pregnantCows.map((cow) => {
          const badge = getStatusBadge(cow.pregnancyStatus.confidence);
          return (
            <div key={cow.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">{cow.id}</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${badge.class}`}>
                    {badge.text}
                  </span>
                </div>
                <TrendingUp className="w-4 h-4 text-gray-400" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Days in cycle</span>
                  <div className="font-medium text-gray-900">{cow.pregnancyStatus.daysInCycle}</div>
                </div>
                <div>
                  <span className="text-gray-500">Confidence</span>
                  <div className={`font-medium ${getStatusColor(cow.pregnancyStatus.confidence)}`}>
                    {cow.pregnancyStatus.confidence}%
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <span className="text-gray-500 text-sm">Last insemination</span>
                <div className="font-medium text-gray-900">
                  {formatDate(cow.pregnancyStatus.breedingDate)}
                </div>
              </div>

              {cow.pregnancyStatus.expectedDueDate && (
                <div className="mt-2">
                  <span className="text-gray-500 text-sm">Expected calving</span>
                  <div className="font-medium text-gray-900">
                    {formatDate(cow.pregnancyStatus.expectedDueDate)}
                  </div>
                </div>
              )}

              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${cow.pregnancyStatus.confidence}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PregnancyStatus;