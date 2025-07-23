import React, { useState, useEffect } from 'react';

const BehavioralIndicators: React.FC = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [pregnantData, setPregnantData] = useState([85, 65, 45, 75, 90]); // Activity, Resting, Feeding, Social, Movement
  const [nonPregnantData, setNonPregnantData] = useState([70, 80, 60, 85, 75]);

  // Real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setPregnantData(prev => prev.map(value => 
        Math.max(0, Math.min(100, value + (Math.random() - 0.5) * 10))
      ));
      setNonPregnantData(prev => prev.map(value => 
        Math.max(0, Math.min(100, value + (Math.random() - 0.5) * 10))
      ));
    }, 45000); // Update every 45 seconds

    return () => clearInterval(interval);
  }, []);

  const maxValue = 100;
  const centerX = 96;
  const centerY = 96;
  const radius = 80;

  const createPolygonPoints = (data: number[]) => {
    return data.map((value, index) => {
      const angle = (index * 72 - 90) * (Math.PI / 180); // 72 degrees per axis, start from top
      const distance = (value / maxValue) * radius;
      const x = centerX + distance * Math.cos(angle);
      const y = centerY + distance * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  const pregnantPoints = createPolygonPoints(pregnantData);
  const nonPregnantPoints = createPolygonPoints(nonPregnantData);

  const axisLabels = [
    { text: 'Activity Level', x: centerX, y: centerY - radius - 25, angle: -90 },
    { text: 'Resting Time', x: centerX + radius + 25, y: centerY - 40, angle: 18 },
    { text: 'Feeding Pattern', x: centerX + 40, y: centerY + radius + 25, angle: 90 },
    { text: 'Social Interaction', x: centerX - radius - 25, y: centerY - 40, angle: 162 },
    { text: 'Movement Range', x: centerX - 40, y: centerY - radius - 25, angle: -162 }
  ];

  const handleDetailsClick = () => {
    setShowDetails(!showDetails);
    // Simulate opening detailed behavioral analysis
    if (!showDetails) {
      console.log('Opening detailed behavioral analysis...');
      alert('Opening Detailed Behavioral Analysis Dashboard...');
    }
  };

  const getAverageValue = (data: number[]) => {
    return (data.reduce((sum, val) => sum + val, 0) / data.length).toFixed(1);
  };

  return (
    <div className="dashboard-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Behavioral Indicators</h2>
        <button 
          className="dashboard-button secondary"
          onClick={handleDetailsClick}
        >
          Details
        </button>
      </div>
      
      <div className="chart-container relative w-full h-80">
        <div className="radar-chart">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 relative">
              {/* Background circles */}
              <div className="radar-circle absolute" style={{ width: '20%', height: '20%', top: '40%', left: '40%' }}></div>
              <div className="radar-circle absolute" style={{ width: '40%', height: '40%', top: '30%', left: '30%' }}></div>
              <div className="radar-circle absolute" style={{ width: '60%', height: '60%', top: '20%', left: '20%' }}></div>
              <div className="radar-circle absolute" style={{ width: '80%', height: '80%', top: '10%', left: '10%' }}></div>
              <div className="radar-circle absolute" style={{ width: '100%', height: '100%', top: '0%', left: '0%' }}></div>
              
              {/* Axis labels with better positioning */}
              {axisLabels.map((label, index) => (
                <div
                  key={index}
                  className="absolute text-xs font-medium text-gray-700 bg-white px-1 py-0.5 rounded"
                  style={{
                    left: label.x,
                    top: label.y,
                    transform: 'translate(-50%, -50%)',
                    whiteSpace: 'nowrap',
                    zIndex: 10
                  }}
                >
                  {label.text}
                </div>
              ))}
              
              {/* Radar chart polygons */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 192 192">
                {/* Pregnant cows polygon */}
                <polygon
                  points={pregnantPoints}
                  fill="rgba(34, 197, 94, 0.2)"
                  stroke="rgb(34, 197, 94)"
                  strokeWidth="2"
                />
                {/* Non-pregnant cows polygon */}
                <polygon
                  points={nonPregnantPoints}
                  fill="rgba(239, 68, 68, 0.2)"
                  stroke="rgb(239, 68, 68)"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Legend with real-time averages */}
      <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-gray-600">Pregnant Cows (Avg: {getAverageValue(pregnantData)})</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-gray-600">Non-Pregnant Cows (Avg: {getAverageValue(nonPregnantData)})</span>
        </div>
      </div>

      {/* Real-time status indicator */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live data updating every 45 seconds</span>
        </div>
      </div>
    </div>
  );
};

export default BehavioralIndicators; 