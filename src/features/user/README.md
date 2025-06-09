# User Feature

Manages user-specific data, dashboard, and user profile functionality.

## Components

### User Rankings
- **UsersFantasyRanking** - User's Fantasy ranking history and position
- **UsersFortyRanking** - User's 40K ranking history and position

### User Battle History
- **UsersResults** - User's completed battle results
- **UsersUpcomingBattles** - User's upcoming scheduled battles

## Pages

- **UserDashboard** - Main user dashboard with overview of all user data
- **UserProfile** - User profile management page

## Key Features

### Dashboard Overview
- Next upcoming battle display
- Current ranking positions (both 40K and Fantasy)
- Ally and nemesis information
- Quick access to user statistics

### User Statistics
- Personal ranking history for both game types
- Battle results and win/loss records
- Upcoming battle schedule
- Personal army management

### Profile Management
- User information editing
- Personal statistics viewing
- Account settings

## Dashboard Sections

1. **Hero Section** - User overview with next battle and key stats
2. **Rankings Section** - Both 40K and Fantasy ranking displays
3. **Battles Section** - Upcoming battles and recent results

## Usage

```tsx
import { 
  UserDashboard, 
  UserProfile,
  UsersResults,
  UsersFantasyRanking 
} from 'src/features/user';
```

## Dependencies

- Shared layout components (DashboardHero)
- User store for user data
- Battles store for user battle data
- Armies store for user army data
- Rankings store for user ranking data

