import React from 'react';
import { TrendingUp, TrendingDown, Users, Heart, Target, AlertTriangle } from 'lucide-react';
import { KPIMetrics } from '../types';

interface KPICardsProps {
  metrics: KPIMetrics;
}

const KPICards: React.FC<KPICardsProps> = ({ metrics }) => {
  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(1)}%`;
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 ? TrendingUp : TrendingDown;
  };

  const cards = [
    {
      title: 'Total Cows Monitored',
      value: metrics.totalCows,
      change: metrics.changes.totalCows,
      changeText: 'from last month',
      icon: Users,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Potential Pregnancies',
      value: metrics.pregnantCows,
      change: metrics.changes.pregnancyRate,
      changeText: 'from last week',
      icon: Heart,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Prediction Accuracy',
      value: `${(92.4).toFixed(1)}%`,
      change: 2.1,
      changeText: 'improvement',
      icon: Target,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Attention Needed',
      value: metrics.alertsCount,
      change: metrics.changes.alertsCount,
      changeText: 'resolved',
      icon: AlertTriangle,
      iconColor: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const ChangeIcon = getChangeIcon(card.change);
        return (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                <card.icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
              <div className="text-3xl font-bold text-gray-900">{card.value}</div>
              <div className="flex items-center space-x-1 text-sm">
                <ChangeIcon className={`w-4 h-4 ${getChangeColor(card.change)}`} />
                <span className={getChangeColor(card.change)}>
                  {formatChange(card.change)}
                </span>
                <span className="text-gray-500">{card.changeText}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KPICards;