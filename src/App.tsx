import React from 'react';
import Header from './components/Header';
import VideoSection from './components/VideoSection';
import KPICards from './components/KPICards';
import RealTimeActivity from './components/RealTimeActivity';
import BehavioralIndicators from './components/BehavioralIndicators';
import SmartAlerts from './components/SmartAlerts';
import BarnLayout from './components/BarnLayout';
import PregnancyStatus from './components/PregnancyStatus';
import DailyTrends from './components/DailyTrends';
import CowProfiles from './components/CowProfiles';
import BehavioralTrends from './components/BehavioralTrends';
import PregnancyDistribution from './components/PregnancyDistribution';
import AttentionList from './components/AttentionList';
import {
  mockKPIMetrics,
  mockCowData,
  mockAlertData,
  mockActivityData,
  mockDailyTrendsData,
  mockBarnLayoutData,
  mockPregnancyDistributionData,
  mockBehavioralIndicatorData,
  mockRealTimeActivityData,
} from './data/mockData';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Welcome to EasyRanch Dashboard
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  Real-time monitoring and analytics for your farm operations
                </p>
              </div>
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live Data</span>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="mb-8">
          <KPICards metrics={mockKPIMetrics} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <VideoSection />
            </div>

            {/* Real-time Activity */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <RealTimeActivity activities={mockRealTimeActivityData} />
            </div>

            {/* Behavioral Indicators */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <BehavioralIndicators data={mockBehavioralIndicatorData} />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Smart Alerts */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <SmartAlerts alerts={mockAlertData} />
            </div>

            {/* Pregnancy Status */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <PregnancyStatus cows={mockCowData} />
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Daily Trends */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <DailyTrends data={mockDailyTrendsData} />
          </div>

          {/* Cow Profiles */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <CowProfiles cows={mockCowData} />
          </div>
        </div>

        {/* Barn Layout - Moved here */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <BarnLayout layout={mockBarnLayoutData} cows={mockCowData} />
          </div>
        </div>

        {/* Full Width Sections */}
        <div className="space-y-6">
          {/* Behavioral Trends */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <BehavioralTrends data={mockBehavioralIndicatorData} />
          </div>

          {/* Pregnancy Distribution */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <PregnancyDistribution data={mockPregnancyDistributionData} />
          </div>

          {/* Attention List */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <AttentionList cows={mockCowData} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 sm:mb-0">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🐄</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">EasyRanch</p>
                <p className="text-xs text-gray-500">Farm Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <span>© 2024 EasyRanch. All rights reserved.</span>
              <span>•</span>
              <span>Version 1.0.0</span>
              <span>•</span>
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;