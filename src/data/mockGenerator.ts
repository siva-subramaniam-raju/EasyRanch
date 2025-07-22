import { 
  CowData, 
  AlertData, 
  ActivityData, 
  DailyTrendsData, 
  BarnLayoutData, 
  PregnancyDistributionData,
  BehavioralIndicatorData,
  KPIMetrics,
  RealTimeActivityItem 
} from '../types';
import { BREEDS, BARN_DIMENSIONS, GESTATION_PERIOD_DAYS } from './constants';

// Utility functions for generating realistic mock data
const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomNumber = (min: number, max: number, decimals: number = 0): number => {
  const value = Math.random() * (max - min) + min;
  return decimals > 0 ? Number(value.toFixed(decimals)) : Math.floor(value);
};

const getRandomDate = (daysBack: number): Date => {
  const now = new Date();
  const pastDate = new Date(now.getTime() - (Math.random() * daysBack * 24 * 60 * 60 * 1000));
  return pastDate;
};

const generateCowId = (index: number): string => {
  return `COW${(index + 1).toString().padStart(3, '0')}`;
};

// Generate individual cow data
export const generateCowData = (count: number): CowData[] => {
  const cows: CowData[] = [];
  
  for (let i = 0; i < count; i++) {
    const breed = getRandomElement(BREEDS);
    const age = getRandomNumber(12, 120); // 1-10 years in months
    const isPregnant = Math.random() < 0.65; // 65% pregnancy rate
    const healthStatus = getRandomElement(['healthy', 'healthy', 'healthy', 'attention', 'sick'] as const);
    
    const pregnancyConfidence = isPregnant ? getRandomNumber(60, 95) : getRandomNumber(5, 40);
    const daysInCycle = getRandomNumber(1, 283);
    const breedingDate = isPregnant ? getRandomDate(daysInCycle) : undefined;
    const expectedDueDate = isPregnant && breedingDate ? 
      new Date(breedingDate.getTime() + (GESTATION_PERIOD_DAYS * 24 * 60 * 60 * 1000)) : 
      undefined;
    
    const cow: CowData = {
      id: generateCowId(i),
      name: `${breed}-${i + 1}`,
      breed,
      age,
      weight: getRandomNumber(400, 700), // kg
      healthStatus,
      pregnancyStatus: {
        isPregnant,
        confidence: pregnancyConfidence,
        daysInCycle,
        expectedDueDate,
        breedingDate,
        gestationDays: isPregnant ? daysInCycle : undefined,
      },
      location: {
        x: getRandomNumber(10, BARN_DIMENSIONS.width - 10),
        y: getRandomNumber(10, BARN_DIMENSIONS.height - 10),
        zone: getRandomElement(['feeding', 'resting', 'walkway', 'milking'] as const),
      },
      lastActivity: getRandomDate(1),
      lastCheckup: getRandomDate(7),
      vitals: {
        temperature: getRandomNumber(38.0, 39.8, 1),
        heartRate: getRandomNumber(60, 80),
        rumination: getRandomNumber(20, 45),
        activity: getRandomNumber(100, 300),
      },
      behavior: {
        activity: getRandomNumber(30, 90),
        movement: getRandomNumber(25, 85),
        resting: getRandomNumber(40, 80),
        social: getRandomNumber(20, 70),
        feeding: getRandomNumber(50, 90),
        vocalization: getRandomNumber(10, 60),
        heat: isPregnant ? getRandomNumber(10, 30) : getRandomNumber(20, 80),
      },
      alerts: [],
    };
    
    cows.push(cow);
  }
  
  return cows;
};

// Generate alert data
export const generateAlertData = (cows: CowData[]): AlertData[] => {
  const alerts: AlertData[] = [];
  const alertTypes = [
    { type: 'health', priority: 'high', title: 'High Temperature Detected' },
    { type: 'pregnancy', priority: 'medium', title: 'Pregnancy Status Change' },
    { type: 'behavior', priority: 'low', title: 'Abnormal Activity Pattern' },
    { type: 'feeding', priority: 'medium', title: 'Low Feeding Activity' },
    { type: 'location', priority: 'low', title: 'Extended Time in Medical Area' },
  ] as const;
  
  // Generate alerts for random cows
  const alertCount = Math.floor(cows.length * 0.3); // 30% of cows have alerts
  const selectedCows = cows.slice(0, alertCount);
  
  selectedCows.forEach((cow, index) => {
    const alertTemplate = getRandomElement(alertTypes);
    const alert: AlertData = {
      id: `ALERT${(index + 1).toString().padStart(3, '0')}`,
      cowId: cow.id,
      type: alertTemplate.type,
      priority: alertTemplate.priority,
      title: alertTemplate.title,
      description: `${alertTemplate.title} for cow ${cow.id} (${cow.breed})`,
      timestamp: getRandomDate(2),
      resolved: Math.random() < 0.4, // 40% resolved
      actionRequired: alertTemplate.priority !== 'low',
      estimatedResolutionTime: getRandomNumber(15, 120),
    };
    
    if (alert.resolved) {
      alert.resolvedBy = 'System';
      alert.resolvedAt = new Date(alert.timestamp.getTime() + (getRandomNumber(30, 300) * 60 * 1000));
    }
    
    alerts.push(alert);
    cow.alerts.push(alert.id);
  });
  
  return alerts;
};

// Generate activity data
export const generateActivityData = (cows: CowData[], days: number = 7): ActivityData[] => {
  const activities: ActivityData[] = [];
  const activityTypes = ['eating', 'resting', 'walking', 'drinking', 'socializing', 'ruminating'] as const;
  
  cows.forEach((cow) => {
    // Generate activities for the last 'days' days
    for (let day = 0; day < days; day++) {
      const activitiesPerDay = getRandomNumber(8, 15);
      
      for (let i = 0; i < activitiesPerDay; i++) {
        const timestamp = new Date();
        timestamp.setDate(timestamp.getDate() - day);
        timestamp.setHours(getRandomNumber(0, 23));
        timestamp.setMinutes(getRandomNumber(0, 59));
        
        const activity: ActivityData = {
          id: `ACT${activities.length + 1}`,
          cowId: cow.id,
          timestamp,
          activityType: getRandomElement(activityTypes),
          duration: getRandomNumber(15, 120), // minutes
          location: {
            x: cow.location.x + getRandomNumber(-5, 5),
            y: cow.location.y + getRandomNumber(-5, 5),
            zone: cow.location.zone,
          },
          intensity: getRandomNumber(20, 90),
          heartRate: getRandomNumber(60, 85),
          temperature: getRandomNumber(38.0, 39.5, 1),
        };
        
        activities.push(activity);
      }
    }
  });
  
  return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

// Generate daily trends data
export const generateDailyTrendsData = (days: number = 7): DailyTrendsData[] => {
  const trends: DailyTrendsData[] = [];
  
  for (let day = 0; day < days; day++) {
    const date = new Date();
    date.setDate(date.getDate() - day);
    
    for (let hour = 0; hour < 24; hour++) {
      const trend: DailyTrendsData = {
        date,
        hour,
        metrics: {
          averageActivity: getRandomNumber(30, 80),
          peakActivity: getRandomNumber(70, 100),
          averageRumination: getRandomNumber(25, 40),
          averageTemperature: getRandomNumber(38.2, 39.3, 1),
          peakTemperature: getRandomNumber(39.0, 40.0, 1),
          cowsActive: getRandomNumber(15, 45),
          totalCows: 50, // Assuming 50 total cows
        },
      };
      
      trends.push(trend);
    }
  }
  
  return trends.sort((a, b) => b.date.getTime() - a.date.getTime() || b.hour - a.hour);
};

// Generate barn layout data
export const generateBarnLayoutData = (): BarnLayoutData => {
  return {
    zones: [
      {
        id: 'feeding-1',
        type: 'feeding',
        coordinates: [
          { x: 5, y: 5 },
          { x: 30, y: 5 },
          { x: 30, y: 15 },
          { x: 5, y: 15 },
        ],
        capacity: 20,
        currentOccupancy: getRandomNumber(8, 18),
        temperature: getRandomNumber(15, 25, 1),
      },
      {
        id: 'resting-1',
        type: 'resting',
        coordinates: [
          { x: 35, y: 5 },
          { x: 70, y: 5 },
          { x: 70, y: 25 },
          { x: 35, y: 25 },
        ],
        capacity: 30,
        currentOccupancy: getRandomNumber(15, 28),
        temperature: getRandomNumber(18, 22, 1),
      },
      {
        id: 'milking-1',
        type: 'milking',
        coordinates: [
          { x: 75, y: 5 },
          { x: 95, y: 5 },
          { x: 95, y: 20 },
          { x: 75, y: 20 },
        ],
        capacity: 8,
        currentOccupancy: getRandomNumber(2, 6),
        temperature: getRandomNumber(16, 20, 1),
      },
    ],
    dimensions: BARN_DIMENSIONS,
    equipment: [
      { id: 'camera-1', type: 'camera', position: { x: 15, y: 45 }, status: 'active' },
      { id: 'camera-2', type: 'camera', position: { x: 50, y: 45 }, status: 'active' },
      { id: 'camera-3', type: 'camera', position: { x: 85, y: 45 }, status: 'active' },
      { id: 'feeder-1', type: 'feeder', position: { x: 17, y: 10 }, status: 'active' },
      { id: 'feeder-2', type: 'feeder', position: { x: 83, y: 30 }, status: 'active' },
      { id: 'water-1', type: 'water', position: { x: 25, y: 35 }, status: 'active' },
      { id: 'water-2', type: 'water', position: { x: 75, y: 35 }, status: 'active' },
    ],
  };
};

// Generate pregnancy distribution data
export const generatePregnancyDistributionData = (cows: CowData[]): PregnancyDistributionData[] => {
  const breedGroups = BREEDS.reduce((acc, breed) => {
    acc[breed] = cows.filter(cow => cow.breed === breed);
    return acc;
  }, {} as Record<string, CowData[]>);
  
  return BREEDS.map(breed => {
    const breedCows = breedGroups[breed] || [];
    const pregnant = breedCows.filter(cow => cow.pregnancyStatus.isPregnant && cow.pregnancyStatus.confidence > 70).length;
    const notPregnant = breedCows.filter(cow => !cow.pregnancyStatus.isPregnant && cow.pregnancyStatus.confidence < 30).length;
    const uncertain = breedCows.length - pregnant - notPregnant;
    const averageConfidence = breedCows.reduce((sum, cow) => sum + cow.pregnancyStatus.confidence, 0) / breedCows.length || 0;
    
    return {
      breed,
      pregnant,
      notPregnant,
      uncertain,
      total: breedCows.length,
      averageConfidence: Number(averageConfidence.toFixed(1)),
    };
  });
};

// Generate behavioral indicator data
export const generateBehavioralIndicatorData = (cows: CowData[]): BehavioralIndicatorData[] => {
  const pregnantCows = cows.filter(cow => cow.pregnancyStatus.isPregnant);
  const nonPregnantCows = cows.filter(cow => !cow.pregnancyStatus.isPregnant);
  
  const calculateAverages = (cowGroup: CowData[]) => {
    if (cowGroup.length === 0) return { activity: 0, movement: 0, resting: 0, social: 0, feeding: 0 };
    
    const totals = cowGroup.reduce((acc, cow) => ({
      activity: acc.activity + cow.behavior.activity,
      movement: acc.movement + cow.behavior.movement,
      resting: acc.resting + cow.behavior.resting,
      social: acc.social + cow.behavior.social,
      feeding: acc.feeding + cow.behavior.feeding,
    }), { activity: 0, movement: 0, resting: 0, social: 0, feeding: 0 });
    
    return {
      activity: Math.round(totals.activity / cowGroup.length),
      movement: Math.round(totals.movement / cowGroup.length),
      resting: Math.round(totals.resting / cowGroup.length),
      social: Math.round(totals.social / cowGroup.length),
      feeding: Math.round(totals.feeding / cowGroup.length),
    };
  };
  
  return [
    {
      category: 'pregnant',
      metrics: calculateAverages(pregnantCows),
    },
    {
      category: 'nonPregnant',
      metrics: calculateAverages(nonPregnantCows),
    },
  ];
};

// Generate KPI metrics
export const generateKPIMetrics = (cows: CowData[], alerts: AlertData[]): KPIMetrics => {
  const totalCows = cows.length;
  const healthyCows = cows.filter(cow => cow.healthStatus === 'healthy').length;
  const pregnantCows = cows.filter(cow => cow.pregnancyStatus.isPregnant).length;
  const activeAlerts = alerts.filter(alert => !alert.resolved).length;
  
  const averageActivity = Math.round(
    cows.reduce((sum, cow) => sum + cow.behavior.activity, 0) / totalCows
  );
  
  const averageTemperature = Number(
    (cows.reduce((sum, cow) => sum + cow.vitals.temperature, 0) / totalCows).toFixed(1)
  );
  
  const pregnancyRate = Number(((pregnantCows / totalCows) * 100).toFixed(1));
  const healthRate = Number(((healthyCows / totalCows) * 100).toFixed(1));
  
  // Simulate previous period changes
  return {
    totalCows,
    healthyCows,
    pregnantCows,
    alertsCount: activeAlerts,
    averageActivity,
    pregnancyRate,
    healthRate,
    averageTemperature,
    changes: {
      totalCows: getRandomNumber(-2, 3),
      healthyCows: getRandomNumber(-3, 2),
      pregnantCows: getRandomNumber(-1, 4),
      alertsCount: getRandomNumber(-5, 3),
      averageActivity: getRandomNumber(-8, 12),
      pregnancyRate: getRandomNumber(-2.5, 3.2, 1),
      healthRate: getRandomNumber(-1.5, 2.8, 1),
      averageTemperature: getRandomNumber(-0.3, 0.4, 1),
    },
  };
};

// Generate real-time activity data
export const generateRealTimeActivityData = (cows: CowData[], count: number = 20): RealTimeActivityItem[] => {
  const activities: RealTimeActivityItem[] = [];
  
  for (let i = 0; i < count; i++) {
    const cow = getRandomElement(cows);
    const activityType = getRandomElement(['eating', 'walking', 'resting', 'drinking', 'socializing']);
    const timestamp = new Date(Date.now() - (i * getRandomNumber(1, 30) * 60 * 1000)); // Stagger timestamps
    
    activities.push({
      id: `ACTIVITY${i + 1}`,
      cowId: cow.id,
      cowName: cow.name || cow.id,
      activityType,
      timestamp,
      duration: getRandomNumber(5, 45),
      location: cow.location.zone,
      status: Math.random() < 0.7 ? 'ongoing' : 'completed',
      priority: cow.healthStatus !== 'healthy' ? 'attention' : 'normal',
    });
  }
  
  return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};