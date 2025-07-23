import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle, Eye, Clock, Filter, SortAsc, SortDesc, ChevronRight, Users, X, Search, Download, BarChart3, MapPin, Thermometer, Activity, Heart } from 'lucide-react';

interface CattleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CattleModal: React.FC<CattleModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('id');

  const allCattle = [
    { id: 'C001', name: 'Bessie', breed: 'Holstein', age: 4, status: 'Healthy', location: 'Barn A - Stall 1', temperature: 38.5, activity: 'Normal', pregnancyStatus: 'Pregnant', lastCheck: '2 hours ago' },
    { id: 'C002', name: 'Daisy', breed: 'Jersey', age: 3, status: 'Monitoring', location: 'Barn A - Stall 2', temperature: 39.1, activity: 'High', pregnancyStatus: 'Heat', lastCheck: '1 hour ago' },
    { id: 'C003', name: 'Molly', breed: 'Guernsey', age: 5, status: 'Healthy', location: 'Barn A - Stall 3', temperature: 38.8, activity: 'Low', pregnancyStatus: 'Inseminated', lastCheck: '3 hours ago' },
    { id: 'C004', name: 'Luna', breed: 'Holstein', age: 2, status: 'Alert', location: 'Barn B - Stall 1', temperature: 40.2, activity: 'Very Low', pregnancyStatus: 'Open', lastCheck: '30 min ago' },
    { id: 'C005', name: 'Rosie', breed: 'Angus', age: 4, status: 'Healthy', location: 'Barn B - Stall 2', temperature: 38.6, activity: 'Normal', pregnancyStatus: 'Pregnant', lastCheck: '4 hours ago' },
    { id: 'C006', name: 'Bella', breed: 'Hereford', age: 3, status: 'Monitoring', location: 'Barn B - Stall 3', temperature: 39.5, activity: 'High', pregnancyStatus: 'Heat', lastCheck: '2 hours ago' },
    { id: 'C007', name: 'Grace', breed: 'Holstein', age: 6, status: 'Healthy', location: 'Barn C - Stall 1', temperature: 38.4, activity: 'Normal', pregnancyStatus: 'Pregnant', lastCheck: '5 hours ago' },
    { id: 'C008', name: 'Ruby', breed: 'Jersey', age: 2, status: 'Alert', location: 'Barn C - Stall 2', temperature: 39.8, activity: 'Low', pregnancyStatus: 'Open', lastCheck: '1 hour ago' },
    { id: 'C009', name: 'Pearl', breed: 'Guernsey', age: 4, status: 'Healthy', location: 'Barn C - Stall 3', temperature: 38.7, activity: 'Normal', pregnancyStatus: 'Inseminated', lastCheck: '6 hours ago' },
    { id: 'C010', name: 'Sage', breed: 'Angus', age: 3, status: 'Monitoring', location: 'Barn A - Stall 4', temperature: 39.3, activity: 'High', pregnancyStatus: 'Heat', lastCheck: '45 min ago' },
    { id: 'C011', name: 'Willow', breed: 'Hereford', age: 5, status: 'Healthy', location: 'Barn A - Stall 5', temperature: 38.9, activity: 'Normal', pregnancyStatus: 'Pregnant', lastCheck: '3 hours ago' },
    { id: 'C012', name: 'Ivy', breed: 'Holstein', age: 2, status: 'Alert', location: 'Barn B - Stall 4', temperature: 40.1, activity: 'Very Low', pregnancyStatus: 'Open', lastCheck: '20 min ago' },
    { id: 'C013', name: 'Hazel', breed: 'Jersey', age: 4, status: 'Healthy', location: 'Barn B - Stall 5', temperature: 38.5, activity: 'Normal', pregnancyStatus: 'Pregnant', lastCheck: '4 hours ago' },
    { id: 'C014', name: 'Maple', breed: 'Guernsey', age: 3, status: 'Monitoring', location: 'Barn C - Stall 4', temperature: 39.2, activity: 'High', pregnancyStatus: 'Heat', lastCheck: '1.5 hours ago' },
    { id: 'C015', name: 'Aspen', breed: 'Angus', age: 5, status: 'Healthy', location: 'Barn C - Stall 5', temperature: 38.6, activity: 'Normal', pregnancyStatus: 'Inseminated', lastCheck: '5 hours ago' }
  ];

  const breeds = ['all', ...Array.from(new Set(allCattle.map(cow => cow.breed)))];
  const statuses = ['all', 'Healthy', 'Monitoring', 'Alert'];

  const filteredCattle = allCattle.filter(cow => {
    const matchesSearch = cow.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         cow.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBreed = selectedBreed === 'all' || cow.breed === selectedBreed;
    const matchesStatus = selectedStatus === 'all' || cow.status === selectedStatus;
    return matchesSearch && matchesBreed && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Healthy': return 'bg-green-100 text-green-800';
      case 'Monitoring': return 'bg-yellow-100 text-yellow-800';
      case 'Alert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPregnancyColor = (status: string) => {
    switch (status) {
      case 'Pregnant': return 'bg-blue-100 text-blue-800';
      case 'Heat': return 'bg-pink-100 text-pink-800';
      case 'Inseminated': return 'bg-purple-100 text-purple-800';
      case 'Open': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTemperatureColor = (temp: number) => {
    if (temp > 39.5) return 'text-red-600';
    if (temp > 39.0) return 'text-yellow-600';
    return 'text-green-600';
  };

  const stats = {
    total: allCattle.length,
    healthy: allCattle.filter(c => c.status === 'Healthy').length,
    monitoring: allCattle.filter(c => c.status === 'Monitoring').length,
    alert: allCattle.filter(c => c.status === 'Alert').length,
    pregnant: allCattle.filter(c => c.pregnancyStatus === 'Pregnant').length,
    inHeat: allCattle.filter(c => c.pregnancyStatus === 'Heat').length
  };

  const modalContent = (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4" style={{ zIndex: 9999 }}>
      <div className="bg-white rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Users className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">All Cattle Management</h2>
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
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search cattle..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={selectedBreed}
                onChange={(e) => setSelectedBreed(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                title="Filter by breed"
              >
                {breeds.map(breed => (
                  <option key={breed} value={breed}>
                    {breed === 'all' ? 'All Breeds' : breed}
                  </option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                title="Filter by status"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Status' : status}
                  </option>
                ))}
              </select>
            </div>
            <button className="dashboard-button flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Data</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-600">Total Cattle</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.healthy}</p>
              <p className="text-sm text-gray-600">Healthy</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{stats.monitoring}</p>
              <p className="text-sm text-gray-600">Monitoring</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{stats.alert}</p>
              <p className="text-sm text-gray-600">Alert</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.pregnant}</p>
              <p className="text-sm text-gray-600">Pregnant</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-pink-600">{stats.inHeat}</p>
              <p className="text-sm text-gray-600">In Heat</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          <div className="overflow-x-auto">
            <table className="w-full dashboard-table">
              <thead>
                <tr>
                  <th className="cursor-pointer" onClick={() => setSortBy('id')}>
                    <div className="flex items-center space-x-1">
                      <span>ID</span>
                      {sortBy === 'id' && <SortAsc className="w-3 h-3" />}
                    </div>
                  </th>
                  <th>Name</th>
                  <th>Breed</th>
                  <th>Age</th>
                  <th>Status</th>
                  <th>Location</th>
                  <th className="cursor-pointer" onClick={() => setSortBy('temperature')}>
                    <div className="flex items-center space-x-1">
                      <Thermometer className="w-4 h-4" />
                      <span>Temp</span>
                      {sortBy === 'temperature' && <SortAsc className="w-3 h-3" />}
                    </div>
                  </th>
                  <th>Activity</th>
                  <th>Pregnancy</th>
                  <th>Last Check</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCattle.map((cow) => (
                  <tr key={cow.id} className="hover:bg-gray-50 transition-colors">
                    <td className="font-medium text-gray-900">#{cow.id}</td>
                    <td className="font-medium">{cow.name}</td>
                    <td>{cow.breed}</td>
                    <td>{cow.age} years</td>
                    <td>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(cow.status)}`}>
                        {cow.status}
                      </span>
                    </td>
                    <td className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-sm">{cow.location}</span>
                    </td>
                    <td className={`font-medium ${getTemperatureColor(cow.temperature)}`}>
                      {cow.temperature}°C
                    </td>
                    <td>
                      <div className="flex items-center space-x-1">
                        <Activity className="w-3 h-3 text-gray-400" />
                        <span className="text-sm">{cow.activity}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getPregnancyColor(cow.pregnancyStatus)}`}>
                        {cow.pregnancyStatus}
                      </span>
                    </td>
                    <td className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-sm">{cow.lastCheck}</span>
                    </td>
                    <td>
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors" title="View details">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-blue-400 hover:text-blue-600 transition-colors" title="Health check">
                          <Heart className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-green-400 hover:text-green-600 transition-colors" title="Take action">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredCattle.length} of {allCattle.length} cattle • Last updated: {new Date().toLocaleTimeString()}
            </p>
            <div className="flex items-center space-x-3">
              <button className="text-sm text-gray-600 hover:text-gray-800 transition-colors">
                Print Report
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-800 transition-colors">
                Share Data
              </button>
              <button
                onClick={onClose}
                className="dashboard-button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

const CowsRequiringAttention = () => {
  const [sortBy, setSortBy] = useState('probability');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedBreed, setSelectedBreed] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showCattleModal, setShowCattleModal] = useState(false);
  const [cowsData, setCowsData] = useState([
    {
      cowId: 'F-724',
      breed: 'Holstein',
      age: '4 years',
      lastCheck: '2h 16m ago',
      pregnancyProbability: 85,
      status: 'High Probability',
      statusColor: 'bg-green-100 text-green-700',
      temperature: 38.9,
      activityLevel: 'Normal',
      location: 'Barn A - Stall 12'
    },
    {
      cowId: 'J-312',
      breed: 'Jersey',
      age: '3 years',
      lastCheck: '1m ago',
      pregnancyProbability: 45,
      status: 'Inconclusive',
      statusColor: 'bg-orange-100 text-orange-700',
      temperature: 39.2,
      activityLevel: 'Low',
      location: 'Barn B - Stall 8'
    },
    {
      cowId: 'A-589',
      breed: 'Angus',
      age: '5 years',
      lastCheck: '22h 3m ago',
      pregnancyProbability: 15,
      status: 'Low Probability',
      statusColor: 'bg-red-100 text-red-700',
      temperature: 40.1,
      activityLevel: 'Very Low',
      location: 'Barn A - Stall 5'
    },
    {
      cowId: 'H-102',
      breed: 'Hereford',
      age: '2 years',
      lastCheck: 'Now',
      pregnancyProbability: 60,
      status: 'Needs Verification',
      statusColor: 'bg-orange-100 text-orange-700',
      temperature: 38.7,
      activityLevel: 'Normal',
      location: 'Barn C - Stall 3'
    },
    {
      cowId: 'G-456',
      breed: 'Guernsey',
      age: '4 years',
      lastCheck: '1h 16m ago',
      pregnancyProbability: 92,
      status: 'Very High Probability',
      statusColor: 'bg-green-100 text-green-700',
      temperature: 38.5,
      activityLevel: 'High',
      location: 'Barn B - Stall 15'
    }
  ]);

  // Real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCowsData(prev => prev.map(cow => ({
        ...cow,
        pregnancyProbability: Math.max(0, Math.min(100, cow.pregnancyProbability + (Math.random() - 0.5) * 10)),
        temperature: Math.max(37.5, Math.min(41.0, cow.temperature + (Math.random() - 0.5) * 0.5)),
        lastCheck: cow.lastCheck === 'Now' ? 'Now' : 
          cow.lastCheck.includes('h') ? 
            `${Math.max(0, parseInt(cow.lastCheck.split('h')[0]) + Math.floor(Math.random() * 2) - 1)}h ${Math.floor(Math.random() * 60)}m ago` :
            cow.lastCheck
      })));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const breeds = ['all', ...Array.from(new Set(cowsData.map(cow => cow.breed)))];

  const getProgressBarColor = (probability) => {
    if (probability >= 80) return 'bg-green-500';
    if (probability >= 50) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleViewDetails = (cow) => {
    console.log('Viewing details for cow:', cow);
    // Simulate opening cow details modal
    alert(`Opening detailed view for Cow ${cow.cowId} (${cow.breed})...`);
  };

  const handleViewAllCattle = () => {
    setShowCattleModal(true);
    console.log('Opening cattle management modal...');
  };

  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
  };

  const filteredAndSortedCows = cowsData
    .filter(cow => selectedBreed === 'all' || cow.breed === selectedBreed)
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'probability':
          aValue = a.pregnancyProbability;
          bValue = b.pregnancyProbability;
          break;
        case 'lastCheck':
          // Convert time to minutes for sorting
          aValue = a.lastCheck === 'Now' ? 0 : parseInt(a.lastCheck.split('h')[0]) * 60;
          bValue = b.lastCheck === 'Now' ? 0 : parseInt(b.lastCheck.split('h')[0]) * 60;
          break;
        case 'temperature':
          aValue = a.temperature;
          bValue = b.temperature;
          break;
        default:
          aValue = a[sortBy];
          bValue = b[sortBy];
      }
      
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

  return (
    <>
      <div className="dashboard-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-semibold text-gray-900">Cows Requiring Attention</h2>
            <AlertTriangle className="dashboard-icon text-orange-500" />
            <span className="text-sm text-gray-600">{cowsData.length} cows</span>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleFilterToggle}
              className="dashboard-button secondary flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button 
              onClick={handleViewAllCattle}
              className="dashboard-button secondary flex items-center space-x-2"
            >
              <Users className="w-4 h-4" />
              <span>View All Cattle</span>
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg border-farm">
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
                <select 
                  value={selectedBreed}
                  onChange={(e) => setSelectedBreed(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  title="Filter by breed"
                >
                  {breeds.map(breed => (
                    <option key={breed} value={breed}>
                      {breed === 'all' ? 'All Breeds' : breed}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select 
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  title="Sort by field"
                >
                  <option value="probability">Pregnancy Probability</option>
                  <option value="lastCheck">Last Check</option>
                  <option value="temperature">Temperature</option>
                  <option value="breed">Breed</option>
                </select>
              </div>
              <button 
                onClick={() => handleSort(sortBy)}
                className="mt-6 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>COW ID</th>
                <th>BREED</th>
                <th>AGE</th>
                <th>LAST CHECK</th>
                <th>PREGNANCY PROBABILITY</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedCows.map((cow) => (
                <tr key={cow.cowId} className="hover:bg-gray-50 transition-colors">
                  <td className="font-medium text-gray-900">#{cow.cowId}</td>
                  <td>{cow.breed}</td>
                  <td>{cow.age}</td>
                  <td className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span>{cow.lastCheck}</span>
                  </td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(cow.pregnancyProbability)}`}
                          style={{ width: `${cow.pregnancyProbability}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{cow.pregnancyProbability}%</span>
                    </div>
                  </td>
                  <td>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${cow.statusColor}`}>
                      {cow.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleViewDetails(cow)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleViewDetails(cow)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Take action"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Real-time status indicator */}
        <div className="mt-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span>Live attention data updating every 30 seconds</span>
          </div>
        </div>
      </div>

      <CattleModal 
        isOpen={showCattleModal} 
        onClose={() => setShowCattleModal(false)} 
      />
    </>
  );
};

export default CowsRequiringAttention; 