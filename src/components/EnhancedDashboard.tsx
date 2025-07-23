import React, { useState, useEffect } from 'react';
import Header from './Header.tsx';
import Footer from './Footer.tsx';
import PregnancyStatusDistribution from './PregnancyStatusDistribution.tsx';
import BehavioralIndicators from './BehavioralIndicators.tsx';
import RealTimeActivity from './RealTimeActivity.tsx';
import SmartAlerts from './SmartAlerts.tsx';
import PregnancyStatus from './PregnancyStatus.tsx';
import BarnLayout from './BarnLayout.tsx';
import DailyTrends from './DailyTrends.tsx';
import CowsRequiringAttention from './CowsRequiringAttention.tsx';
import BehavioralTrendsCorrelation from './BehavioralTrendsCorrelation.tsx';
import CowProfiles from './CowProfiles.tsx';
import CowVideoPlayer from './CowVideoPlayer.tsx';
import { Eye, AlertTriangle, Download, FileText } from 'lucide-react';

const EnhancedDashboard: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'quarter'>('week');
  const [dashboardData, setDashboardData] = useState({
    totalCows: 142,
    potentialPregnancies: 38,
    predictionAccuracy: 92.4,
    attentionNeeded: 7,
    lastUpdate: new Date()
  });

  // Real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setDashboardData(prev => ({
        ...prev,
        totalCows: prev.totalCows + Math.floor(Math.random() * 3) - 1,
        potentialPregnancies: Math.max(0, prev.potentialPregnancies + Math.floor(Math.random() * 5) - 2),
        predictionAccuracy: Math.min(100, Math.max(85, prev.predictionAccuracy + (Math.random() - 0.5) * 2)),
        attentionNeeded: Math.max(0, prev.attentionNeeded + Math.floor(Math.random() * 3) - 1),
        lastUpdate: new Date()
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'viewActivities':
        console.log('Opening all activities view...');
        // Simulate opening activities modal
        alert('Opening Activities Dashboard...');
        break;
      case 'viewAlerts':
        console.log('Opening all alerts view...');
        // Simulate opening alerts modal
        alert('Opening Alerts Dashboard...');
        break;
      case 'downloadReport':
        console.log('Downloading report...');
        // Simulate report download
        const link = document.createElement('a');
        link.href = 'data:text/csv;charset=utf-8,Report Data';
        link.download = `farm-report-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        break;
      default:
        break;
    }
  };

  const handleCowSelect = (cowId: string) => {
    console.log('Selected cow:', cowId);
    // Simulate opening cow details modal
    alert(`Opening details for Cow ${cowId}...`);
  };

  return (
    <div className="dashboard-container">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="summary-card p-6 cursor-pointer hover:shadow-lg transition-all duration-300" 
               onClick={() => handleQuickAction('viewActivities')}>
            <div className="flex items-center justify-between">
              <div className="summary-card-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12.5" cy="8.5" r="2.5"></circle>
                  <path d="M12.5 2a6.5 6.5 0 0 0-6.22 4.6c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c4 0 8.4-1.8 11.4-4.3A6.5 6.5 0 0 0 12.5 2Z"></path>
                  <path d="m18.5 6 2.19 4.5a6.48 6.48 0 0 1 .31 2 6.49 6.49 0 0 1-2.6 5.2C15.4 20.2 11 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5"></path>
                </svg>
              </div>
              <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-600">Total Cows Monitored</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{dashboardData.totalCows}</p>
              <p className="text-sm text-green-600 mt-1">↑12% from last month</p>
            </div>
          </div>

          <div className="summary-card p-6 cursor-pointer hover:shadow-lg transition-all duration-300"
               onClick={() => handleQuickAction('viewAlerts')}>
            <div className="flex items-center justify-between">
              <div className="summary-card-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
                </svg>
              </div>
              <AlertTriangle className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-600">Potential Pregnancies</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{dashboardData.potentialPregnancies}</p>
              <p className="text-sm text-green-600 mt-1">↑5% from last week</p>
            </div>
          </div>

          <div className="summary-card p-6 cursor-pointer hover:shadow-lg transition-all duration-300"
               onClick={() => handleQuickAction('downloadReport')}>
            <div className="flex items-center justify-between">
              <div className="summary-card-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
              </div>
              <Download className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-600">Prediction Accuracy</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{dashboardData.predictionAccuracy.toFixed(1)}%</p>
              <p className="text-sm text-green-600 mt-1">↑2.1% improvement</p>
            </div>
          </div>

          <div className="summary-card p-6 cursor-pointer hover:shadow-lg transition-all duration-300"
               onClick={() => handleQuickAction('viewAlerts')}>
            <div className="flex items-center justify-between">
              <div className="summary-card-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                  <path d="M12 9v4"></path>
                  <path d="M12 17h.01"></path>
                </svg>
              </div>
              <AlertTriangle className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-600">Attention Needed</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{dashboardData.attentionNeeded}</p>
              <p className="text-sm text-green-600 mt-1">↓3 resolved</p>
            </div>
          </div>
        </div>

        {/* Main Dashboard Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <PregnancyStatusDistribution 
            timeframe={selectedTimeframe} 
            onTimeframeChange={setSelectedTimeframe}
          />
          <BehavioralIndicators />
        </div>

        {/* Real-time Activity and Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RealTimeActivity />
              <SmartAlerts />
            </div>
          </div>
          <div className="space-y-6">
            <PregnancyStatus />
            <CowProfiles onCowSelect={handleCowSelect} />
          </div>
        </div>

        {/* Live Farm Video Monitoring - Repositioned */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Live Farm Video Monitoring</h2>
              <CowVideoPlayer className="w-full" />
            </div>
          </div>
          <div className="space-y-6">
            {/* Additional content can go here beside the video */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                  onClick={() => handleQuickAction('viewActivities')}
                >
                  <Eye className="w-4 h-4" />
                  <span>View All Activities</span>
                </button>
                <button 
                  className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                  onClick={() => handleQuickAction('viewAlerts')}
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>View All Alerts</span>
                </button>
                <button 
                  className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center space-x-2"
                  onClick={() => handleQuickAction('downloadReport')}
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Barn Layout and Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <BarnLayout />
          <DailyTrends />
        </div>

        {/* Cows Requiring Attention */}
        <div className="mb-8">
          <CowsRequiringAttention />
        </div>

        {/* Behavioral Trends Correlation */}
        <div className="mb-8">
          <BehavioralTrendsCorrelation />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EnhancedDashboard; 