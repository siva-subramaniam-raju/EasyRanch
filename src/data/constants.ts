// Application constants and configuration

export const BREEDS = ['Holstein', 'Jersey', 'Angus', 'Hereford', 'Simmental'] as const;

export const HEALTH_STATUS_COLORS = {
  healthy: '#10B981', // green-500
  attention: '#F59E0B', // amber-500
  sick: '#EF4444', // red-500
  critical: '#DC2626', // red-600
} as const;

export const PREGNANCY_STATUS_COLORS = {
  pregnant: '#10B981', // green-500
  notPregnant: '#6B7280', // gray-500
  uncertain: '#F59E0B', // amber-500
} as const;

export const ALERT_PRIORITY_COLORS = {
  low: '#6B7280', // gray-500
  medium: '#F59E0B', // amber-500
  high: '#EF4444', // red-500
  critical: '#DC2626', // red-600
} as const;

export const ACTIVITY_TYPES = {
  eating: { label: 'Eating', color: '#10B981', icon: '🌾' },
  resting: { label: 'Resting', color: '#6B7280', icon: '😴' },
  walking: { label: 'Walking', color: '#3B82F6', icon: '🚶' },
  drinking: { label: 'Drinking', color: '#06B6D4', icon: '💧' },
  socializing: { label: 'Socializing', color: '#8B5CF6', icon: '👥' },
  ruminating: { label: 'Ruminating', color: '#F59E0B', icon: '🤔' },
} as const;

export const BARN_ZONES = {
  feeding: { label: 'Feeding Area', color: '#10B981' },
  resting: { label: 'Resting Area', color: '#6B7280' },
  walkway: { label: 'Walkway', color: '#3B82F6' },
  milking: { label: 'Milking Station', color: '#F59E0B' },
  medical: { label: 'Medical Area', color: '#EF4444' },
} as const;

export const BARN_DIMENSIONS = {
  width: 100,
  height: 60,
  scale: 1, // 1 unit = 1 meter
} as const;

export const DASHBOARD_REFRESH_INTERVAL = 30000; // 30 seconds
export const ALERT_CHECK_INTERVAL = 10000; // 10 seconds
export const ACTIVITY_UPDATE_INTERVAL = 5000; // 5 seconds

export const GESTATION_PERIOD_DAYS = 283; // Average cow gestation period
export const BREEDING_CYCLE_DAYS = 21; // Average estrous cycle length

export const TEMPERATURE_THRESHOLDS = {
  normal: { min: 38.0, max: 39.5 }, // Celsius
  fever: { min: 39.5, max: 41.0 },
  critical: { min: 41.0, max: 43.0 },
} as const;

export const ACTIVITY_THRESHOLDS = {
  low: { min: 0, max: 30 },
  normal: { min: 30, max: 70 },
  high: { min: 70, max: 100 },
} as const;

export const CHART_COLORS = {
  primary: '#3B82F6',
  secondary: '#10B981',
  accent: '#F59E0B',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  neutral: '#6B7280',
  background: '#F9FAFB',
} as const;

export const RESPONSIVE_BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
} as const;