import React, { useState } from 'react';
import { Filter, Eye, MoreHorizontal } from 'lucide-react';
import { CowData } from '../types';
import { calculateAttentionPriority } from '../data/utils';

interface AttentionListProps {
  cows: CowData[];
}

const AttentionList: React.FC<AttentionListProps> = ({ cows }) => {
  const [showFilter, setShowFilter] = useState(false);
  
  // Get cows that need attention
  const attentionCows = cows
    .filter(cow => cow.healthStatus !== 'healthy' || cow.alerts.length > 0)
    .sort((a, b) => calculateAttentionPriority(b) - calculateAttentionPriority(a))
    .slice(0, 5);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  const getStatusColor = (healthStatus: string) => {
    const colors = {
      healthy: 'text-green-600',
      attention: 'text-yellow-600',
      sick: 'text-red-600',
      critical: 'text-red-700',
    };
    return colors[healthStatus as keyof typeof colors] || 'text-gray-600';
  };

  const getStatusBadge = (healthStatus: string) => {
    const badges = {
      healthy: 'bg-green-100 text-green-800',
      attention: 'bg-yellow-100 text-yellow-800',
      sick: 'bg-red-100 text-red-800',
      critical: 'bg-red-200 text-red-900',
    };
    return badges[healthStatus as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold text-gray-900">Cows Requiring Attention</h2>
          <div className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
            {attentionCows.length} cows
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All Cattle
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
                COW ID
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
                BREED
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
                AGE
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
                LAST CHECK
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
                PREGNANCY PROBABILITY
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
                STATUS
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {attentionCows.map((cow) => (
              <tr key={cow.id} className="hover:bg-gray-50">
                <td className="py-4">
                  <span className="font-medium text-gray-900">{cow.id}</span>
                </td>
                <td className="py-4">
                  <span className="text-gray-600">{cow.breed}</span>
                </td>
                <td className="py-4">
                  <span className="text-gray-600">
                    {Math.floor(cow.age / 12)} years
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-600 text-sm">
                      {formatTimeAgo(cow.lastCheckup)}
                    </span>
                  </div>
                </td>
                <td className="py-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">
                        {cow.pregnancyStatus.confidence}%
                      </span>
                    </div>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${cow.pregnancyStatus.confidence}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusBadge(cow.healthStatus)}`}>
                    {cow.pregnancyStatus.confidence > 80 ? 'Very High Probability' : 
                     cow.pregnancyStatus.confidence > 60 ? 'High Probability' : 'Medium Probability'}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttentionList;