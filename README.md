# Easy Ranch Cow Monitoring Dashboard

A comprehensive React-based dashboard for monitoring dairy farm operations, cow health, and behavioral analytics.

## Features

- **Real-time Activity Monitoring** - Track cow movements and behaviors
- **Smart Alerts System** - Automated health and breeding alerts
- **Pregnancy Status Tracking** - Monitor breeding cycles and pregnancy indicators
- **Behavioral Analytics** - Radar charts and trend analysis
- **Live Video Monitoring** - Integrated video player for barn surveillance
- **Barn Layout Visualization** - Interactive barn map with cow locations
- **Health Metrics Dashboard** - Comprehensive health monitoring

## Technology Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Responsive Design** for mobile and desktop

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd smart-farm-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Project Structure

```
├── src/                    # Source code
│   ├── components/         # React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── EnhancedDashboard.tsx
│   │   ├── CowVideoPlayer.tsx
│   │   ├── BehavioralIndicators.tsx
│   │   ├── RealTimeActivity.tsx
│   │   ├── SmartAlerts.tsx
│   │   ├── PregnancyStatus.tsx
│   │   ├── PregnancyStatusDistribution.tsx
│   │   ├── DailyTrends.tsx
│   │   ├── CowsRequiringAttention.tsx
│   │   ├── CowProfiles.tsx
│   │   ├── CowImage.tsx
│   │   ├── BehavioralTrendsCorrelation.tsx
│   │   └── BarnLayout.tsx
│   ├── styles/            # CSS styles
│   │   └── dashboard.css
│   ├── types/             # TypeScript type definitions
│   ├── index.css          # Global styles
│   ├── main.tsx           # Application entry point
│   └── App.tsx            # Root component
├── public/                # Static assets
│   ├── Cow Video.mp4      # Video file
│   ├── cow-icon.svg       # Icons
│   └── manifest.json      # PWA manifest
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── README.md              # Project documentation
```

## Key Components

- **EnhancedDashboard** - Main dashboard layout
- **CowVideoPlayer** - Video monitoring interface
- **BehavioralIndicators** - Radar chart analytics
- **RealTimeActivity** - Live activity feed
- **SmartAlerts** - Alert management system
- **PregnancyStatus** - Breeding cycle tracking

## Features

### Dashboard Overview
- Summary cards with key metrics
- Real-time activity monitoring
- Smart alerts and notifications
- Pregnancy status tracking

### Video Monitoring
- Live barn camera feeds
- Video quality controls
- Error handling and retry functionality
- Recording information display

### Analytics
- Behavioral trend analysis
- Pregnancy correlation charts
- Health metrics visualization
- Performance indicators

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the Easy Ranch - Innova8s Pte Ltd.

## Support

For support and questions, please contact the development team. 
