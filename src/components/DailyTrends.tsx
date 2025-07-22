import React from 'react';
import { BarChart3, Activity, Brain, Thermometer } from 'lucide-react';
import { DailyTrendsData } from '../types';

interface DailyTrendsProps {
  data: DailyTrendsData[];
}

const DailyTrends: React.FC<DailyTrendsProps> = ({ data }) => {
  // Get today's data (last 24 hours)
  const todayData = data.filter(d => {
    const today = new Date();
    return d.date.toDateString() === today.toDateString();
  }).sort((a, b) => a.hour - b.hour);

  // Create chart data for 6-hour intervals
  const chartData = [];
  for (let i = 0; i < 24; i += 4) {
    const hourData = todayData.find(d => d.hour === i);
    if (hourData) {
      chartData.push({
        time: `${i.toString().padStart(2, '0')}:00`,
        activity: hourData.metrics.averageActivity,
        rumination: hourData.metrics.averageRumination,
        temperature: hourData.metrics.averageTemperature,
      });
    }
  }

  const maxActivity = Math.max(...chartData.map(d => d.activity));
  const maxRumination = Math.max(...chartData.map(d => d.rumination));

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Daily Trends</h2>
        <BarChart3 className="w-5 h-5 text-gray-400" />
      </div>

      <div className="flex items-center space-x-6 mb-4">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-green-600" />
          <span className="text-sm text-gray-600">Activity</span>
        </div>
        <div className="flex items-center space-x-2">
          <Brain className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-gray-600">Rumination</span>
        </div>
        <div className="flex items-center space-x-2">
          <Thermometer className="w-4 h-4 text-red-600" />
          <span className="text-sm text-gray-600">Temperature</span>
        </div>
      </div>

      <div className="relative h-48 mb-4">
        <div className="flex items-end justify-between h-full space-x-2">
          {chartData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center space-y-1">
              <div className="flex items-end space-x-1 h-32">
                <div
                  className="bg-green-500 rounded-t-sm min-w-[8px] transition-all duration-300"
                  style={{ height: `${(data.activity / maxActivity) * 100}%` }}
                />
                <div
                  className="bg-blue-500 rounded-t-sm min-w-[8px] transition-all duration-300"
                  style={{ height: `${(data.rumination / maxRumination) * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-500 font-medium">{data.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t border-gray-200">
        <span>Last 24 hours</span>
        <div className="flex items-center space-x-4">
          <span>Avg: 54</span>
          <span>Peak: 95</span>
        </div>
      </div>
    </div>
  );
};

export default DailyTrends;