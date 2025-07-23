import React from 'react';
import { BarChart3 } from 'lucide-react';

interface PregnancyStatusDistributionProps {
  timeframe: 'week' | 'month' | 'quarter';
  onTimeframeChange?: (timeframe: 'week' | 'month' | 'quarter') => void;
}

const PregnancyStatusDistribution: React.FC<PregnancyStatusDistributionProps> = ({ 
  timeframe, 
  onTimeframeChange 
}) => {
  // Different datasets for different timeframes
  const weekData = [
    {
      breed: 'Holstein',
      total: 12,
      pregnant: 8,
      notPregnant: 3,
      inconclusive: 1
    },
    {
      breed: 'Jersey',
      total: 9,
      pregnant: 6,
      notPregnant: 2,
      inconclusive: 1
    },
    {
      breed: 'Angus',
      total: 8,
      pregnant: 4,
      notPregnant: 3,
      inconclusive: 1
    },
    {
      breed: 'Hereford',
      total: 10,
      pregnant: 6,
      notPregnant: 2,
      inconclusive: 2
    },
    {
      breed: 'Guernsey',
      total: 5,
      pregnant: 3,
      notPregnant: 1,
      inconclusive: 1
    }
  ];

  const monthData = [
    {
      breed: 'Holstein',
      total: 35,
      pregnant: 24,
      notPregnant: 8,
      inconclusive: 3
    },
    {
      breed: 'Jersey',
      total: 27,
      pregnant: 18,
      notPregnant: 5,
      inconclusive: 4
    },
    {
      breed: 'Angus',
      total: 24,
      pregnant: 12,
      notPregnant: 10,
      inconclusive: 2
    },
    {
      breed: 'Hereford',
      total: 27,
      pregnant: 15,
      notPregnant: 7,
      inconclusive: 5
    },
    {
      breed: 'Guernsey',
      total: 14,
      pregnant: 10,
      notPregnant: 3,
      inconclusive: 1
    }
  ];

  const quarterData = [
    {
      breed: 'Holstein',
      total: 98,
      pregnant: 67,
      notPregnant: 25,
      inconclusive: 6
    },
    {
      breed: 'Jersey',
      total: 76,
      pregnant: 52,
      notPregnant: 18,
      inconclusive: 6
    },
    {
      breed: 'Angus',
      total: 68,
      pregnant: 34,
      notPregnant: 28,
      inconclusive: 6
    },
    {
      breed: 'Hereford',
      total: 72,
      pregnant: 41,
      notPregnant: 22,
      inconclusive: 9
    },
    {
      breed: 'Guernsey',
      total: 42,
      pregnant: 29,
      notPregnant: 10,
      inconclusive: 3
    }
  ];

  // Select data based on timeframe
  const getBreedData = () => {
    switch (timeframe) {
      case 'week':
        return weekData;
      case 'month':
        return monthData;
      case 'quarter':
        return quarterData;
      default:
        return monthData;
    }
  };

  const breedData = getBreedData();

  const calculatePercentages = (data: typeof breedData[0]) => {
    const total = data.pregnant + data.notPregnant + data.inconclusive;
    return {
      pregnant: (data.pregnant / total) * 100,
      notPregnant: (data.notPregnant / total) * 100,
      inconclusive: (data.inconclusive / total) * 100
    };
  };

  // Calculate summary statistics
  const totalCows = breedData.reduce((sum, breed) => sum + breed.total, 0);
  const totalPregnant = breedData.reduce((sum, breed) => sum + breed.pregnant, 0);
  const totalNotPregnant = breedData.reduce((sum, breed) => sum + breed.notPregnant, 0);
  const totalInconclusive = breedData.reduce((sum, breed) => sum + breed.inconclusive, 0);
  
  const overallPregnancyRate = totalCows > 0 ? ((totalPregnant / totalCows) * 100).toFixed(1) : '0.0';

  return (
    <div className="dashboard-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Pregnancy Status Distribution</h2>
        <BarChart3 className="dashboard-icon" />
      </div>
      
      <div className="flex space-x-2 mb-6">
        <button 
          className={`dashboard-button ${timeframe === 'week' ? '' : 'secondary'}`}
          onClick={() => onTimeframeChange?.('week')}
        >
          Week
        </button>
        <button 
          className={`dashboard-button ${timeframe === 'month' ? '' : 'secondary'}`}
          onClick={() => onTimeframeChange?.('month')}
        >
          Month
        </button>
        <button 
          className={`dashboard-button ${timeframe === 'quarter' ? '' : 'secondary'}`}
          onClick={() => onTimeframeChange?.('quarter')}
        >
          Quarter
        </button>
      </div>

      {/* Summary Statistics */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-900">{totalCows}</p>
            <p className="text-sm text-gray-600">Total Cows</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">{totalPregnant}</p>
            <p className="text-sm text-gray-600">Pregnant</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-600">{totalNotPregnant}</p>
            <p className="text-sm text-gray-600">Not Pregnant</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-600">{totalInconclusive}</p>
            <p className="text-sm text-gray-600">Inconclusive</p>
          </div>
        </div>
        <div className="mt-3 text-center">
          <p className="text-sm text-gray-600">
            Overall Pregnancy Rate: <span className="font-semibold text-green-600">{overallPregnancyRate}%</span>
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        {breedData.map((breed) => {
          const percentages = calculatePercentages(breed);
          return (
            <div key={breed.breed} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-900">{breed.breed}</span>
                <span className="text-gray-500">Total: {breed.total}</span>
              </div>
              <div className="flex space-x-1 h-6">
                <div 
                  className="bg-green-600 rounded-l-md" 
                  title={`Pregnant: ${breed.pregnant}`}
                  style={{ width: `${percentages.pregnant}%` }}
                ></div>
                <div 
                  className="bg-red-500" 
                  title={`Not Pregnant: ${breed.notPregnant}`}
                  style={{ width: `${percentages.notPregnant}%` }}
                ></div>
                <div 
                  className="bg-orange-500 rounded-r-md" 
                  title={`Inconclusive: ${breed.inconclusive}`}
                  style={{ width: `${percentages.inconclusive}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="flex items-center justify-center space-x-6 mt-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-600 rounded"></div>
          <span className="text-gray-600">Pregnant</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span className="text-gray-600">Not Pregnant</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded"></div>
          <span className="text-gray-600">Inconclusive</span>
        </div>
      </div>
    </div>
  );
};

export default PregnancyStatusDistribution; 