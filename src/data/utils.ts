import { 
  CowData, 
  AlertData, 
  ActivityData, 
  DailyTrendsData,
  FilterOptions,
  TimeRange 
} from '../types';

// Data filtering utilities
export const filterCowsByHealthStatus = (cows: CowData[], status: string[]): CowData[] => {
  if (status.length === 0) return cows;
  return cows.filter(cow => status.includes(cow.healthStatus));
};

export const filterCowsByBreed = (cows: CowData[], breeds: string[]): CowData[] => {
  if (breeds.length === 0) return cows;
  return cows.filter(cow => breeds.includes(cow.breed));
};

export const filterCowsByPregnancyStatus = (cows: CowData[], statuses: string[]): CowData[] => {
  if (statuses.length === 0) return cows;
  return cows.filter(cow => {
    if (statuses.includes('pregnant') && cow.pregnancyStatus.isPregnant) return true;
    if (statuses.includes('notPregnant') && !cow.pregnancyStatus.isPregnant) return true;
    if (statuses.includes('uncertain') && cow.pregnancyStatus.confidence < 70 && cow.pregnancyStatus.confidence > 30) return true;
    return false;
  });
};

export const filterCowsByZone = (cows: CowData[], zones: string[]): CowData[] => {
  if (zones.length === 0) return cows;
  return cows.filter(cow => zones.includes(cow.location.zone));
};

export const filterCowsByDateRange = (cows: CowData[], dateRange: TimeRange): CowData[] => {
  return cows.filter(cow => {
    const cowDate = cow.lastActivity;
    return cowDate >= dateRange.start && cowDate <= dateRange.end;
  });
};

export const applyAllFilters = (cows: CowData[], filters: FilterOptions): CowData[] => {
  let filteredCows = [...cows];
  
  filteredCows = filterCowsByBreed(filteredCows, filters.breeds);
  filteredCows = filterCowsByHealthStatus(filteredCows, filters.healthStatus);
  filteredCows = filterCowsByPregnancyStatus(filteredCows, filters.pregnancyStatus);
  filteredCows = filterCowsByZone(filteredCows, filters.zones);
  filteredCows = filterCowsByDateRange(filteredCows, filters.dateRange);
  
  return filteredCows;
};

// Sorting utilities
export const sortCowsById = (cows: CowData[], ascending: boolean = true): CowData[] => {
  return [...cows].sort((a, b) => {
    const comparison = a.id.localeCompare(b.id);
    return ascending ? comparison : -comparison;
  });
};

export const sortCowsByAge = (cows: CowData[], ascending: boolean = true): CowData[] => {
  return [...cows].sort((a, b) => {
    const comparison = a.age - b.age;
    return ascending ? comparison : -comparison;
  });
};

export const sortCowsByHealthStatus = (cows: CowData[], ascending: boolean = true): CowData[] => {
  const statusOrder = { 'critical': 0, 'sick': 1, 'attention': 2, 'healthy': 3 };
  return [...cows].sort((a, b) => {
    const comparison = statusOrder[a.healthStatus] - statusOrder[b.healthStatus];
    return ascending ? comparison : -comparison;
  });
};

export const sortCowsByPregnancyConfidence = (cows: CowData[], ascending: boolean = true): CowData[] => {
  return [...cows].sort((a, b) => {
    const comparison = a.pregnancyStatus.confidence - b.pregnancyStatus.confidence;
    return ascending ? comparison : -comparison;
  });
};

export const sortCowsByLastActivity = (cows: CowData[], ascending: boolean = true): CowData[] => {
  return [...cows].sort((a, b) => {
    const comparison = a.lastActivity.getTime() - b.lastActivity.getTime();
    return ascending ? comparison : -comparison;
  });
};

// Alert utilities
export const filterAlertsByPriority = (alerts: AlertData[], priorities: string[]): AlertData[] => {
  if (priorities.length === 0) return alerts;
  return alerts.filter(alert => priorities.includes(alert.priority));
};

export const filterAlertsByType = (alerts: AlertData[], types: string[]): AlertData[] => {
  if (types.length === 0) return alerts;
  return alerts.filter(alert => types.includes(alert.type));
};

export const filterAlertsByResolutionStatus = (alerts: AlertData[], resolved: boolean): AlertData[] => {
  return alerts.filter(alert => alert.resolved === resolved);
};

export const sortAlertsByPriority = (alerts: AlertData[], ascending: boolean = false): AlertData[] => {
  const priorityOrder = { 'critical': 0, 'high': 1, 'medium': 2, 'low': 3 };
  return [...alerts].sort((a, b) => {
    const comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
    return ascending ? comparison : -comparison;
  });
};

export const sortAlertsByTimestamp = (alerts: AlertData[], ascending: boolean = false): AlertData[] => {
  return [...alerts].sort((a, b) => {
    const comparison = a.timestamp.getTime() - b.timestamp.getTime();
    return ascending ? comparison : -comparison;
  });
};

// Activity utilities
export const filterActivitiesByType = (activities: ActivityData[], types: string[]): ActivityData[] => {
  if (types.length === 0) return activities;
  return activities.filter(activity => types.includes(activity.activityType));
};

export const filterActivitiesByDateRange = (activities: ActivityData[], dateRange: TimeRange): ActivityData[] => {
  return activities.filter(activity => {
    return activity.timestamp >= dateRange.start && activity.timestamp <= dateRange.end;
  });
};

export const groupActivitiesByHour = (activities: ActivityData[]): { [hour: number]: ActivityData[] } => {
  return activities.reduce((groups, activity) => {
    const hour = activity.timestamp.getHours();
    if (!groups[hour]) groups[hour] = [];
    groups[hour].push(activity);
    return groups;
  }, {} as { [hour: number]: ActivityData[] });
};

export const groupActivitiesByDay = (activities: ActivityData[]): { [day: string]: ActivityData[] } => {
  return activities.reduce((groups, activity) => {
    const day = activity.timestamp.toDateString();
    if (!groups[day]) groups[day] = [];
    groups[day].push(activity);
    return groups;
  }, {} as { [day: string]: ActivityData[] });
};

// Calculation utilities
export const calculateAverageTemperature = (cows: CowData[]): number => {
  if (cows.length === 0) return 0;
  const total = cows.reduce((sum, cow) => sum + cow.vitals.temperature, 0);
  return Number((total / cows.length).toFixed(1));
};

export const calculateAverageActivity = (cows: CowData[]): number => {
  if (cows.length === 0) return 0;
  const total = cows.reduce((sum, cow) => sum + cow.behavior.activity, 0);
  return Math.round(total / cows.length);
};

export const calculatePregnancyRate = (cows: CowData[]): number => {
  if (cows.length === 0) return 0;
  const pregnantCount = cows.filter(cow => cow.pregnancyStatus.isPregnant).length;
  return Number(((pregnantCount / cows.length) * 100).toFixed(1));
};

export const calculateHealthRate = (cows: CowData[]): number => {
  if (cows.length === 0) return 0;
  const healthyCount = cows.filter(cow => cow.healthStatus === 'healthy').length;
  return Number(((healthyCount / cows.length) * 100).toFixed(1));
};

export const calculateAttentionPriority = (cow: CowData): number => {
  let priority = 0;
  
  // Health status priority
  switch (cow.healthStatus) {
    case 'critical': priority += 100; break;
    case 'sick': priority += 80; break;
    case 'attention': priority += 60; break;
    default: priority += 0;
  }
  
  // Temperature priority
  if (cow.vitals.temperature > 39.5) priority += 30;
  else if (cow.vitals.temperature > 39.2) priority += 15;
  
  // Activity priority (very low or very high activity)
  if (cow.behavior.activity < 20 || cow.behavior.activity > 90) priority += 20;
  
  // Pregnancy uncertainty priority
  if (cow.pregnancyStatus.confidence < 40 && cow.pregnancyStatus.confidence > 60) priority += 15;
  
  // Last checkup priority (days since last checkup)
  const daysSinceCheckup = Math.floor((Date.now() - cow.lastCheckup.getTime()) / (1000 * 60 * 60 * 24));
  if (daysSinceCheckup > 7) priority += 25;
  else if (daysSinceCheckup > 3) priority += 10;
  
  // Alert priority
  if (cow.alerts.length > 0) priority += 40;
  
  return priority;
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
};

export const formatTemperature = (celsius: number, unit: 'C' | 'F' = 'C'): string => {
  if (unit === 'F') {
    const fahrenheit = (celsius * 9/5) + 32;
    return `${fahrenheit.toFixed(1)}°F`;
  }
  return `${celsius.toFixed(1)}°C`;
};

export const formatPercentageChange = (change: number): string => {
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(1)}%`;
};

export const getTimeRangeLabel = (start: Date, end: Date): string => {
  const daysDiff = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysDiff === 0) return 'Today';
  if (daysDiff === 1) return 'Yesterday';
  if (daysDiff <= 7) return 'Past Week';
  if (daysDiff <= 30) return 'Past Month';
  if (daysDiff <= 90) return 'Past Quarter';
  return 'Custom Range';
};

// Date utilities
export const getDateRanges = (): { [key: string]: TimeRange } => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  return {
    today: {
      start: today,
      end: new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1),
      label: 'Today'
    },
    yesterday: {
      start: new Date(today.getTime() - 24 * 60 * 60 * 1000),
      end: new Date(today.getTime() - 1),
      label: 'Yesterday'
    },
    week: {
      start: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
      end: now,
      label: 'Past 7 Days'
    },
    month: {
      start: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000),
      end: now,
      label: 'Past 30 Days'
    },
    quarter: {
      start: new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000),
      end: now,
      label: 'Past 90 Days'
    }
  };
};

// Data validation utilities
export const validateCowData = (cow: CowData): string[] => {
  const errors: string[] = [];
  
  if (!cow.id) errors.push('Cow ID is required');
  if (!cow.breed) errors.push('Breed is required');
  if (cow.age < 0 || cow.age > 360) errors.push('Invalid age');
  if (cow.weight < 200 || cow.weight > 1000) errors.push('Invalid weight');
  if (cow.vitals.temperature < 35 || cow.vitals.temperature > 45) errors.push('Invalid temperature');
  if (cow.pregnancyStatus.confidence < 0 || cow.pregnancyStatus.confidence > 100) errors.push('Invalid pregnancy confidence');
  
  return errors;
};

export const validateAlertData = (alert: AlertData): string[] => {
  const errors: string[] = [];
  
  if (!alert.id) errors.push('Alert ID is required');
  if (!alert.cowId) errors.push('Cow ID is required');
  if (!alert.type) errors.push('Alert type is required');
  if (!alert.priority) errors.push('Alert priority is required');
  if (!alert.title) errors.push('Alert title is required');
  if (!alert.timestamp) errors.push('Alert timestamp is required');
  
  return errors;
};