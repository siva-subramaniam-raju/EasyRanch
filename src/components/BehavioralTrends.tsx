import React from 'react';
import { TrendingUp, TrendingDown, FileText } from 'lucide-react';
import { BehavioralIndicatorData } from '../types';

interface BehavioralTrendsProps {
  data: BehavioralIndicatorData[];
}

const BehavioralTrends: React.FC<BehavioralTrendsProps> = ({ data }) => {
  const pregnantData = data.find(d => d.category === 'pregnant')?.metrics;
  const nonPregnantData = data.find(d => d.category === 'nonPregnant')?.metrics;

  if (!pregnantData || !nonPregnantData) return null;

  const trends = [
    {
      title: 'Activity Level',
      value: pregnantData.activity,
      change: -15.1,
      changeText: 'decrease in pregnant cows',
      details: '4.2x Avg steps/day',
      subDetails: '-8.5%',
      icon: '📈',
    },
    {
      title: 'Resting Time',
      value: pregnantData.resting,
      change: 22.1,
      changeText: 'increase in pregnant cows',
      details: '9.8h Avg rest/day',
      subDetails: '+8.1%',
      icon: '🛏️',
    },
    {
      title: 'Feeding Pattern',
      value: pregnantData.feeding,
      change: -6.1,
      changeText: 'decrease in feeding time',
      details: '4.7h/day Avg feeding/day',
      subDetails: '-4%',
      icon: '🌾',
    },
    {
      title: 'Heat Detection',
      value: 81,
      change: -78.1,
      changeText: 'Heat behavior reduction',
      details: '2 days since last heat',
      subDetails: '',
      icon: '🔥',
    },
    {
      title: 'Vocalization',
      value: 26,
      change: -8.1,
      changeText: 'decrease in vocal activity',
      details: '5 calls/day Avg vocalizations',
      subDetails: '-5%',
      icon: '🔊',
    },
    {
      title: 'Social Interaction',
      value: pregnantData.social,
      change: -18.1,
      changeText: 'decrease in interactions',
      details: '42 Avg interactions/day',
      subDetails: '-14%',
      icon: '👥',
    },
  ];

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 ? TrendingUp : TrendingDown;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Behavioral Trends & Pregnancy Correlation
        </h2>
        <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
          <FileText className="w-4 h-4" />
          <span>View Full Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trends.map((trend, index) => {
          const ChangeIcon = getChangeIcon(trend.change);
          return (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl">{trend.icon}</div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{trend.value}</div>
                </div>
              </div>
              
              <h3 className="font-medium text-gray-900 mb-2">{trend.title}</h3>
              
              <div className="space-y-1">
                <div className="flex items-center space-x-1">
                  <ChangeIcon className={`w-3 h-3 ${getChangeColor(trend.change)}`} />
                  <span className={`text-xs font-medium ${getChangeColor(trend.change)}`}>
                    {Math.abs(trend.change).toFixed(1)}%
                  </span>
                  <span className="text-xs text-gray-500">{trend.changeText}</span>
                </div>
                
                <div className="text-xs text-gray-600">{trend.details}</div>
                {trend.subDetails && (
                  <div className="text-xs text-gray-500">{trend.subDetails}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BehavioralTrends;