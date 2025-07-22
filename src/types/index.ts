// Core data types for the farm management dashboard

export interface CowData {
  id: string;
  name?: string;
  breed: 'Holstein' | 'Jersey' | 'Angus' | 'Hereford' | 'Simmental';
  age: number; // in months
  weight: number; // in kg
  healthStatus: 'healthy' | 'attention' | 'sick' | 'critical';
  pregnancyStatus: {
    isPregnant: boolean;
    confidence: number; // percentage 0-100
    daysInCycle: number;
    expectedDueDate?: Date;
    breedingDate?: Date;
    gestationDays?: number;
  };
  location: {
    x: number; // barn coordinates
    y: number;
    zone: 'feeding' | 'resting' | 'walkway' | 'milking' | 'medical';
  };
  lastActivity: Date;
  lastCheckup: Date;
  vitals: {
    temperature: number; // celsius
    heartRate: number; // bpm
    rumination: number; // minutes per hour
    activity: number; // steps per hour
  };
  behavior: {
    activity: number; // 0-100 scale
    movement: number;
    resting: number;
    social: number;
    feeding: number;
    vocalization: number;
    heat: number;
  };
  alerts: string[]; // array of alert IDs
}

export interface AlertData {
  id: string;
  cowId: string;
  type: 'health' | 'pregnancy' | 'behavior' | 'location' | 'feeding' | 'temperature';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: Date;
  resolved: boolean;
  resolvedBy?: string;
  resolvedAt?: Date;
  actionRequired: boolean;
  estimatedResolutionTime?: number; // minutes
}

export interface ActivityData {
  id: string;
  cowId: string;
  timestamp: Date;
  activityType: 'eating' | 'resting' | 'walking' | 'drinking' | 'socializing' | 'ruminating';
  duration: number; // minutes
  location: {
    x: number;
    y: number;
    zone: string;
  };
  intensity: number; // 0-100
  heartRate?: number;
  temperature?: number;
}

export interface DailyTrendsData {
  date: Date;
  hour: number; // 0-23
  metrics: {
    averageActivity: number;
    peakActivity: number;
    averageRumination: number;
    averageTemperature: number;
    peakTemperature: number;
    cowsActive: number;
    totalCows: number;
  };
}

export interface BarnLayoutData {
  zones: {
    id: string;
    type: 'feeding' | 'resting' | 'walkway' | 'milking' | 'medical';
    coordinates: { x: number; y: number }[];
    capacity: number;
    currentOccupancy: number;
    temperature?: number;
    humidity?: number;
  }[];
  dimensions: {
    width: number;
    height: number;
    scale: number; // meters per unit
  };
  equipment: {
    id: string;
    type: 'feeder' | 'water' | 'camera' | 'sensor';
    position: { x: number; y: number };
    status: 'active' | 'inactive' | 'maintenance';
  }[];
}

export interface PregnancyDistributionData {
  breed: string;
  pregnant: number;
  notPregnant: number;
  uncertain: number;
  total: number;
  averageConfidence: number;
}

export interface BehavioralIndicatorData {
  category: 'pregnant' | 'nonPregnant';
  metrics: {
    activity: number;
    movement: number;
    resting: number;
    social: number;
    feeding: number;
  };
}

export interface KPIMetrics {
  totalCows: number;
  healthyCows: number;
  pregnantCows: number;
  alertsCount: number;
  averageActivity: number;
  pregnancyRate: number;
  healthRate: number;
  averageTemperature: number;
  changes: {
    totalCows: number;
    healthyCows: number;
    pregnantCows: number;
    alertsCount: number;
    averageActivity: number;
    pregnancyRate: number;
    healthRate: number;
    averageTemperature: number;
  };
}

export interface RealTimeActivityItem {
  id: string;
  cowId: string;
  cowName: string;
  activityType: string;
  timestamp: Date;
  duration?: number;
  location?: string;
  status: 'ongoing' | 'completed';
  priority?: 'normal' | 'attention';
}

export interface TimeRange {
  start: Date;
  end: Date;
  label: string;
}

export interface FilterOptions {
  breeds: string[];
  healthStatus: string[];
  pregnancyStatus: string[];
  zones: string[];
  dateRange: TimeRange;
}

// Chart data types
export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
  metadata?: any;
}

export interface ChartConfig {
  type: 'bar' | 'line' | 'radar' | 'doughnut' | 'progress';
  title: string;
  datasets: {
    label: string;
    data: ChartDataPoint[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
  }[];
  options?: any;
}