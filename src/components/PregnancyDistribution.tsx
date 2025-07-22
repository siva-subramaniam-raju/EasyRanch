import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { PregnancyDistributionData } from '../types';

interface PregnancyDistributionProps {
  data: PregnancyDistributionData[];
}

const PregnancyDistribution: React.FC<PregnancyDistributionProps> = ({ data }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('Week');
  const periods = ['Week', 'Month', 'Quarter'];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Pregnancy Status Distribution</h2>
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-gray-400" />
          <div className="flex bg-gray-100 rounded-lg p-1">
            {periods.map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  selectedPeriod === period
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {data.map((breed) => (
          <div key={breed.breed} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">{breed.breed}</span>
              <span className="text-sm text-gray-500">Total: {breed.total}</span>
            </div>
            <div className="flex h-6 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="bg-green-500 transition-all duration-300"
                style={{ width: `${(breed.pregnant / breed.total) * 100}%` }}
              />
              <div
                className="bg-red-500 transition-all duration-300"
                style={{ width: `${(breed.notPregnant / breed.total) * 100}%` }}
              />
              <div
                className="bg-orange-500 transition-all duration-300"
                style={{ width: `${(breed.uncertain / breed.total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Pregnant</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Not Pregnant</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Inconclusive</span>
        </div>
      </div>
    </div>
  );
};

export default PregnancyDistribution;