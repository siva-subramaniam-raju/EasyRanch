import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FileText, Activity, Bed, Utensils, Thermometer, Mic, Users, Eye, TrendingDown, TrendingUp, X, Download, BarChart3, Calendar } from 'lucide-react';

interface CorrelationMetric {
  id: string;
  title: string;
  correlation: number;
  insight: string;
  averageValue: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: JSX.Element;
}

interface FullReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  metrics: CorrelationMetric[];
}

const FullReportModal: React.FC<FullReportModalProps> = ({ isOpen, onClose, metrics }) => {
  if (!isOpen) return null;

  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter'>('month');
  const [selectedMetric, setSelectedMetric] = useState<string>('all');

  const periods = [
    { value: 'week', label: 'Last Week', data: '7 days of detailed analysis' },
    { value: 'month', label: 'Last Month', data: '30 days of comprehensive data' },
    { value: 'quarter', label: 'Last Quarter', data: '90 days of trend analysis' }
  ];

  const filteredMetrics = selectedMetric === 'all' 
    ? metrics 
    : metrics.filter(m => m.title.toLowerCase().includes(selectedMetric.toLowerCase()));

  // Helper functions moved inside the modal component
  const getInsightColor = (changeType: string) => {
    return changeType === 'increase' ? 'text-green-600' : 'text-red-600';
  };

  const getInsightIcon = (changeType: string) => {
    return changeType === 'increase' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />;
  };

  const modalContent = (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4" style={{ zIndex: 9999 }}>
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Behavioral Trends Full Report</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            title="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Controls */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
                <div className="flex space-x-2">
                  {periods.map((period) => (
                    <button
                      key={period.value}
                      onClick={() => setSelectedPeriod(period.value as 'week' | 'month' | 'quarter')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedPeriod === period.value
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {period.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter Metrics</label>
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  title="Filter metrics"
                >
                  <option value="all">All Metrics</option>
                  <option value="activity">Activity Related</option>
                  <option value="health">Health Related</option>
                  <option value="behavior">Behavior Related</option>
                </select>
              </div>
            </div>
            <button className="dashboard-button flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Summary Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-blue-900">Overall Correlation</h3>
              </div>
              <p className="text-2xl font-bold text-blue-600">
                {(metrics.reduce((sum, m) => sum + m.correlation, 0) / metrics.length).toFixed(2)}
              </p>
              <p className="text-sm text-blue-700">Average correlation across all metrics</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-green-900">Analysis Period</h3>
              </div>
              <p className="text-lg font-bold text-green-600">
                {periods.find(p => p.value === selectedPeriod)?.label}
              </p>
              <p className="text-sm text-green-700">
                {periods.find(p => p.value === selectedPeriod)?.data}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-purple-900">Trends Identified</h3>
              </div>
              <p className="text-2xl font-bold text-purple-600">
                {metrics.filter(m => m.correlation > 0.5).length}
              </p>
              <p className="text-sm text-purple-700">Strong positive correlations</p>
            </div>
          </div>

          {/* Detailed Metrics */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Detailed Behavioral Analysis</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredMetrics.map((metric) => (
                <div key={metric.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {metric.icon}
                      <h4 className="text-lg font-semibold text-gray-900">{metric.title}</h4>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      metric.correlation > 0.5 ? 'bg-green-100 text-green-800' :
                      metric.correlation < -0.5 ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {metric.correlation > 0 ? '+' : ''}{metric.correlation.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      {getInsightIcon(metric.changeType)}
                      <span className={`text-sm ${getInsightColor(metric.changeType)}`}>
                        {metric.insight}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Average Value</p>
                        <p className="font-medium">{metric.averageValue}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Change</p>
                        <p className={`font-medium ${getInsightColor(metric.changeType)}`}>
                          {metric.change}
                        </p>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Correlation Strength</span>
                        <span>{Math.abs(metric.correlation) > 0.7 ? 'Strong' : Math.abs(metric.correlation) > 0.4 ? 'Moderate' : 'Weak'}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            Math.abs(metric.correlation) > 0.7 ? 'bg-green-500' :
                            Math.abs(metric.correlation) > 0.4 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.abs(metric.correlation) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="mt-8 p-6 bg-yellow-50 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-900 mb-3">Recommendations</h3>
            <div className="space-y-2 text-sm text-yellow-800">
              <p>• Monitor high-correlation metrics more closely for early pregnancy detection</p>
              <p>• Adjust feeding schedules based on behavioral pattern changes</p>
              <p>• Implement targeted interventions for cows showing concerning trends</p>
              <p>• Schedule veterinary checkups for animals with significant behavioral changes</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Report generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
            </p>
            <div className="flex items-center space-x-3">
              <button className="text-sm text-gray-600 hover:text-gray-800 transition-colors">
                Print Report
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-800 transition-colors">
                Share Report
              </button>
              <button
                onClick={onClose}
                className="dashboard-button"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

const BehavioralTrendsCorrelation: React.FC = () => {
  const [showFullReport, setShowFullReport] = useState(false);
  const [metrics, setMetrics] = useState<CorrelationMetric[]>([
    {
      id: '1',
      title: 'Activity Level',
      correlation: -0.78,
      insight: '15% decrease in pregnant cows',
      averageValue: '4.2k Avg steps/day',
      change: '-12%',
      changeType: 'decrease',
      icon: <Activity className="w-5 h-5 text-green-600" />
    },
    {
      id: '2',
      title: 'Resting Time',
      correlation: 0.85,
      insight: '22% increase in pregnant cows',
      averageValue: '9.8h Avg rest/day',
      change: '+18%',
      changeType: 'increase',
      icon: <Bed className="w-5 h-5 text-green-600" />
    },
    {
      id: '3',
      title: 'Feeding Pattern',
      correlation: 0.18,
      insight: '6% decrease in feeding time',
      averageValue: '4.7h/day Avg feeding/day',
      change: '-4%',
      changeType: 'decrease',
      icon: <Utensils className="w-5 h-5 text-green-600" />
    },
    {
      id: '4',
      title: 'Heat Detection',
      correlation: -0.81,
      insight: 'Heat signs dropped post-insemination',
      averageValue: '-78% Heat behavior reduction',
      change: '4 days Since last heat',
      changeType: 'decrease',
      icon: <Thermometer className="w-5 h-5 text-green-600" />
    },
    {
      id: '5',
      title: 'Vocalization',
      correlation: -0.26,
      insight: '8% decrease in vocal activity',
      averageValue: '8 calls/day Avg vocalizations',
      change: '-6%',
      changeType: 'decrease',
      icon: <Mic className="w-5 h-5 text-green-600" />
    },
    {
      id: '6',
      title: 'Social Interaction',
      correlation: -0.65,
      insight: '18% decrease in interactions',
      averageValue: '42 Avg interactions/day',
      change: '-14%',
      changeType: 'decrease',
      icon: <Users className="w-5 h-5 text-green-600" />
    }
  ]);

  // Real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        correlation: Math.max(-1, Math.min(1, metric.correlation + (Math.random() - 0.5) * 0.1)),
        change: metric.changeType === 'increase' 
          ? `+${Math.max(0, parseInt(metric.change.replace(/[^0-9]/g, '')) + Math.floor(Math.random() * 3))}%`
          : `-${Math.max(0, parseInt(metric.change.replace(/[^0-9]/g, '')) + Math.floor(Math.random() * 3))}%`
      })));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const getCorrelationColor = (correlation: number) => {
    if (correlation > 0) return 'text-green-600';
    if (correlation < 0) return 'text-red-600';
    return 'text-orange-600';
  };

  const getInsightColor = (changeType: string) => {
    return changeType === 'increase' ? 'text-green-600' : 'text-red-600';
  };

  const getInsightIcon = (changeType: string) => {
    return changeType === 'increase' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />;
  };

  const handleViewFullReport = () => {
    setShowFullReport(true);
    console.log('Opening full report modal...');
  };

  return (
    <>
    <div className="dashboard-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Behavioral Trends & Pregnancy Correlation</h2>
          <button 
            className="dashboard-button secondary flex items-center space-x-2"
            onClick={handleViewFullReport}
          >
          <FileText className="dashboard-icon" />
          <span>View Full Report</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => (
            <div key={metric.id} className="correlation-card">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                {metric.icon}
                  <h3 className="font-medium text-gray-900">{metric.title}</h3>
                </div>
                <Eye className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Correlation:</span>
                  <span className={`font-semibold ${getCorrelationColor(metric.correlation)}`}>
                  {metric.correlation > 0 ? '+' : ''}{metric.correlation.toFixed(2)}
                  </span>
                </div>
                
                                <div className="flex items-center space-x-1">
                  {getInsightIcon(metric.changeType)}
                  <span className={`text-sm ${getInsightColor(metric.changeType)}`}>
                    {metric.insight}
                  </span>
              </div>
                
                <div className="text-xs text-gray-500">
                  {metric.averageValue}
            </div>
            
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Change:</span>
                  <span className={`text-xs font-medium ${getInsightColor(metric.changeType)}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Real-time status indicator */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span>Live correlation data updating every minute</span>
          </div>
        </div>
      </div>

      <FullReportModal 
        isOpen={showFullReport} 
        onClose={() => setShowFullReport(false)} 
        metrics={metrics}
      />
    </>
  );
};

export default BehavioralTrendsCorrelation; 