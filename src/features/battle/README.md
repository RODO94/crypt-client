# Battle Feature

Handles all battle-related functionality including battle creation, management, and viewing battle results.

## Components

### Battle Display
- **BattleCard** - Generic battle information card
- **NewBattleCard** - Card for displaying new/upcoming battles
- **NextBattleCard** - Shows the next upcoming battle for a user

### Battle Management
- **BattleDash** - Main battle dashboard with combatant management
- **CreateBattleForm** - Form for creating new battles
- **CreateBattleCombatants** - Component for selecting battle participants
- **BattlePointsForm** - Form for entering battle points/results

### Battle Lists
- **CompletedBattles** - List of completed battles
- **UpcomingBattles** - List of upcoming battles
- **BattleResultBanner** - Displays battle results

### Table Components
- **BattleTableRow** - Row component for battle tables
- **BattleCompleteRow** - Row component for completed battles
- **NewBattleTableRow** - Row component for new battle tables
- **NewBattleTableCompleteRow** - Row component for completed battle tables

### UI Components
- **BattleTypePill** - Pill component showing battle type (40K/Fantasy)

## Pages

- **BattleInfo** - Detailed battle information page
- **CreateBattle** - Battle creation page with full workflow
- **CompletedBattlesPage** - Page listing all completed battles
- **UpcomingBattlesPage** - Page listing all upcoming battles

## Key Features

- Battle creation with army/player selection
- Battle type support (40K and Fantasy)
- Battle points tracking and results
- Player vs player battle management
- Battle history and statistics
- Real-time battle updates

## Usage

```tsx
import { 
  BattleCard, 
  CreateBattle, 
  BattleInfo,
  CompletedBattlesPage 
} from 'src/features/battle';
```

## Dependencies

- Shared UI components (tables, navigation)
- User store for authentication
- Battles store for battle data
- Armies store for army/player data

