# Ranking Feature

Manages ranking systems for both 40K and Fantasy battle types, including leaderboards and ranking tracking.

## Components

### Ranking Display
- **RankGraph** - Visual graph component for ranking progression
- **RankTracker** - Component for tracking army ranking over time
- **RankTrackerCard** - Card component displaying ranking information

### Leaderboards
- **FantasyTopFive** - Top 5 Fantasy armies leaderboard
- **FortyKTopFive** - Top 5 40K armies leaderboard

## Pages

- **FantasyRankingPage** - Full Fantasy ranking leaderboard page
- **FortyKRankingPage** - Full 40K ranking leaderboard page

## Key Features

- Dual ranking systems (40K and Fantasy)
- Top 5 leaderboards for quick viewing
- Full ranking pages with detailed statistics
- Ranking progression tracking over time
- Visual ranking graphs and charts
- Army performance comparisons

## Ranking System

The ranking system tracks:
- Current ranking position
- Previous ranking for comparison
- Ranking progression over time
- Win/loss ratios affecting rankings
- Battle count impact on rankings

## Usage

```tsx
import { 
  RankTracker, 
  FantasyRankingPage, 
  FortyKRankingPage,
  FantasyTopFive 
} from 'src/features/ranking';
```

## Dependencies

- Shared table components
- Rankings store for ranking data
- Battles store for battle results that affect rankings

