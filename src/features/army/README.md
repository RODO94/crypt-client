# Army Feature

Manages army-related functionality including army creation, information display, and army management.

## Components

### Core Components
- **AllyCard** - Displays ally information for an army
- **ArmyAlly** - Shows ally details with battle history
- **ArmyDash** - Main dashboard for army statistics and management
- **ArmyNemesis** - Displays nemesis information and battle history
- **ArmyPill** - Compact army display component
- **NemesisCard** - Card component for nemesis information

## Pages

- **AddArmy** - Form for creating a new army
- **ArmyInfo** - Detailed army information page with stats, allies, and nemeses

## Key Features

- Army creation with emblem selection
- Army statistics tracking (win percentage, battle count, ranking)
- Ally and nemesis relationship management
- Army ranking visualization
- Army type support (40K and Fantasy)

## Usage

```tsx
import { ArmyDash, AddArmy, ArmyInfo } from 'src/features/army';
```

## Dependencies

- Shared UI components (Emblem, Header)
- User store for authentication
- Armies store for army data management
- Rankings store for army ranking data

