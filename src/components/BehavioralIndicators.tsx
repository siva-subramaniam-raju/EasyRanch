import React from 'react';
import { TrendingUp } from 'lucide-react';
import { BehavioralIndicatorData } from '../types';

interface BehavioralIndicatorsProps {
  data: BehavioralIndicatorData[];
}

const BehavioralIndicators: React.FC<BehavioralIndicatorsProps> = ({ data }) => {
  const pregnantData = data.find(d => d.category === 'pregnant')?.metrics;
  const nonPregnantData = data.find(d => d.category === 'nonPregnant')?.metrics;

  if (!pregnantData || !nonPregnantData) return null;

  // Create radar chart data points
  const metrics = ['Activity Level', 'Movement Pattern', 'Resting Time', 'Social Interaction', 'Feeding Pattern'];
  const pregnantValues = [
    pregnantData.activity,
    pregnantData.movement,
    pregnantData.resting,
    pregnantData.social,
    pregnantData.feeding
  ];
  const nonPregnantValues = [
    nonPregnantData.activity,
    nonPregnantData.movement,
    nonPregnantData.resting,
    nonPregnantData.social,
    nonPregnantData.feeding
  ];

  // Simple radar chart using SVG
  const createRadarPath = (values: number[], maxValue: number = 100) => {
    const centerX = 120;
    const centerY = 120;
    const radius = 80;
    const angleStep = (2 * Math.PI) / values.length;

    const points = values.map((value, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const normalizedValue = (value / maxValue) * radius;
      const x = centerX + normalizedValue * Math.cos(angle);
      const y = centerY + normalizedValue * Math.sin(angle);
      return `${x},${y}`;
    });

    return `M ${points.join(' L ')} Z`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Behavioral Indicators</h2>
        <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
          Details
        </button>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="relative mb-6 lg:mb-0">
          <svg width="240" height="240" className="transform -rotate-90">
            {/* Grid circles */}
            {[20, 40, 60, 80].map((r) => (
              <circle
                key={r}
                cx="120"
                cy="120"
                r={r}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            ))}
            
            {/* Grid lines */}
            {metrics.map((_, index) => {
              const angle = (index * 2 * Math.PI) / metrics.length - Math.PI / 2;
              const x2 = 120 + 80 * Math.cos(angle);
              const y2 = 120 + 80 * Math.sin(angle);
              return (
                <line
                  key={index}
                  x1="120"
                  y1="120"
                  x2={x2}
                  y2={y2}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
              );
            })}

            {/* Non-pregnant data */}
            <path
              d={createRadarPath(nonPregnantValues)}
              fill="rgba(239, 68, 68, 0.2)"
              stroke="#ef4444"
              strokeWidth="2"
            />

            {/* Pregnant data */}
            <path
              d={createRadarPath(pregnantValues)}
              fill="rgba(16, 185, 129, 0.2)"
              stroke="#10b981"
              strokeWidth="2"
            />
          </svg>

          {/* Labels */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              {metrics.map((metric, index) => {
                const angle = (index * 2 * Math.PI) / metrics.length - Math.PI / 2;
                const x = 120 + 100 * Math.cos(angle);
                const y = 120 + 100 * Math.sin(angle);
                return (
                  <div
                    key={metric}
                    className="absolute text-xs text-gray-600 font-medium"
                    style={{
                      left: `${x - 40}px`,
                      top: `${y - 10}px`,
                      width: '80px',
                      textAlign: 'center',
                    }}
                  >
                    {metric}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-4 lg:ml-8">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">Pregnant Cows (Avg)</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">Non-Pregnant Cows (Avg)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BehavioralIndicators;