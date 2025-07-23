import React, { useState } from 'react';
import { BarChart3, Activity, TrendingUp, Thermometer } from 'lucide-react';

type TrendType = 'activity' | 'rumination' | 'temperature';

const DailyTrends: React.FC = () => {
  const [selectedTrend, setSelectedTrend] = useState<TrendType>('activity');

  const activityData = [20, 15, 80, 95, 70, 45];
  const ruminationData = [30, 25, 85, 90, 75, 50];
  const temperatureData = [38.2, 38.1, 38.5, 38.8, 38.6, 38.4];

  const timeLabels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];

  const getCurrentData = () => {
    switch (selectedTrend) {
      case 'rumination':
        return ruminationData;
      case 'temperature':
        return temperatureData;
      default:
        return activityData;
    }
  };

  const getMaxValue = () => {
    const data = getCurrentData();
    return selectedTrend === 'temperature' ? Math.max(...data) + 0.5 : 100;
  };

  const getAverage = () => {
    const data = getCurrentData();
    return data.reduce((sum, val) => sum + val, 0) / data.length;
  };

  const getPeak = () => {
    const data = getCurrentData();
    return Math.max(...data);
  };

  const getTrendIcon = (trend: TrendType) => {
    switch (trend) {
      case 'activity':
        return <Activity className="w-4 h-4" />;
      case 'rumination':
        return <TrendingUp className="w-4 h-4" />;
      case 'temperature':
        return <Thermometer className="w-4 h-4" />;
    }
  };

  const currentData = getCurrentData();
  const maxValue = getMaxValue();

  return (
    <div className="dashboard-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Daily Trends</h2>
        <BarChart3 className="dashboard-icon" />
      </div>
      
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        <button 
          className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            selectedTrend === 'activity' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setSelectedTrend('activity')}
        >
          <Activity className="w-4 h-4" />
          <span>Activity</span>
        </button>
        <button 
          className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            selectedTrend === 'rumination' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setSelectedTrend('rumination')}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Rumination</span>
        </button>
        <button 
          className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            selectedTrend === 'temperature' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setSelectedTrend('temperature')}
        >
          <Thermometer className="w-4 h-4" />
          <span>Temperature</span>
        </button>
      </div>
      
      <div className="h-48 flex items-end justify-between space-x-2">
        {currentData.map((value, index) => {
          const height = selectedTrend === 'temperature' 
            ? ((value - Math.min(...currentData)) / (Math.max(...currentData) - Math.min(...currentData))) * 100
            : (value / maxValue) * 100;
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full trend-bar relative h-32 flex items-end">
                <div 
                  className="w-full trend-bar-fill" 
                  style={{ 
                    height: `${Math.max(height, 4)}px`,
                    minHeight: '4px'
                  }}
                ></div>
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700">
                  {selectedTrend === 'temperature' ? value.toFixed(1) : Math.round(value)}
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">{timeLabels[index]}</div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
        <span>Last 24 hours</span>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <span>Avg:</span>
            <span className="font-medium">
              {selectedTrend === 'temperature' ? getAverage().toFixed(1) : Math.round(getAverage())}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <span>Peak:</span>
            <span className="font-medium">
              {selectedTrend === 'temperature' ? getPeak().toFixed(1) : Math.round(getPeak())}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyTrends; 