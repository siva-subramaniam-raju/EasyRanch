// Cow-related types
export interface Cow {
  id: string;
  name: string;
  age: number;
  breed: CowBreed;
  healthScore: number;
  activityLevel: ActivityLevel;
  temperature: number;
  lastCheckup: string;
  reproductiveStatus: ReproductiveStatus;
  image?: string;
}

export type CowBreed = 'Holstein' | 'Jersey' | 'Guernsey' | 'Ayrshire' | 'Brown Swiss';

export type ActivityLevel = 'low' | 'normal' | 'high';

export type ReproductiveStatus = 'Open' | 'Heat' | 'Inseminated' | 'Pregnant' | 'Dry';

// Alert types
export interface Alert {
  id: number;
  title: string;
  message: string;
  time: string;
  type: AlertType;
  cowId?: string;
  severity: AlertSeverity;
}

export type AlertType = 'health' | 'system' | 'breeding' | 'maintenance';

export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical';

// Activity types
export interface Activity {
  id: string;
  type: ActivityType;
  description: string;
  timestamp: string;
  cowId?: string;
  cowName?: string;
  severity?: AlertSeverity;
}

export type ActivityType = 'health_check' | 'feeding' | 'milking' | 'breeding' | 'alert' | 'maintenance';

// Component props
export interface CowProfilesProps {
  onCowSelect?: (cowId: string) => void;
}

// Notification types
export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: AlertType;
}

// Barn and sensor types
export interface BarnZone {
  id: string;
  name: string;
  temperature: number;
  humidity: number;
  occupancy: number;
  status: 'normal' | 'warning' | 'alert';
}

export interface SensorData {
  id: string;
  type: 'temperature' | 'humidity' | 'motion' | 'weight';
  value: number;
  unit: string;
  timestamp: string;
  status: 'active' | 'inactive' | 'error';
}

// KPI types
export interface KPIMetrics {
  milkProduction: number;
  healthScore: number;
  breedingSuccess: number;
  feedEfficiency: number;
}

// Behavioral trends
export interface BehavioralTrend {
  cowId: string;
  cowName: string;
  trend: 'improving' | 'declining' | 'stable';
  metric: string;
  change: number;
  period: string;
} 