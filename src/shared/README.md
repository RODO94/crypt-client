# Shared Components

Reusable components used across multiple features in the application.

## UI Components (`/components/ui/`)

Basic, reusable UI elements:

- **InputBox** - Standardized form input component
- **UserSelectInput** - Dropdown for user selection
- **PlayerTypePill** - Pill component for displaying player types
- **Emblem** - Emblem/icon display component
- **EmblemCard** - Card component featuring an emblem

## Layout Components (`/components/layout/`)

Layout and navigation components:

- **Header** - Main application header
- **NavHeader** - Navigation header component
- **NavFooter** - Navigation footer component
- **NavigationLink** - Standardized navigation link component
- **NavButton** - Navigation button component
- **DashboardHero** - Hero section for dashboard pages
- **EmblemHero** - Hero section featuring emblems
- **HomeHero** - Hero section for homepage

## Table Components (`/components/tables/`)

Table-related components:

- **ThreeColTableHeader** - Header for 3-column tables
- **FiveColTableHeader** - Header for 5-column tables
- **FiveColTableRow** - Row component for 5-column tables
- **DateTableHeader** - Header with date functionality
- **NewDateTableHeader** - Updated date table header

## Usage

Shared components can be imported from the main shared index:

```tsx
import { 
  InputBox, 
  Header, 
  NavButton, 
  ThreeColTableHeader 
} from 'src/shared';
```

Or from specific categories:

```tsx
import { InputBox } from 'src/shared/components/ui/InputBox';
import { Header } from 'src/shared/components/layout/Header';
```

## Design Principles

- **Reusability** - Components should be usable across multiple features
- **Consistency** - Maintain consistent styling and behavior
- **Modularity** - Each component should have a single responsibility
- **Accessibility** - Follow accessibility best practices

## Component Categories

### UI Components
Focused on user interaction and form elements.

### Layout Components
Handle page structure, navigation, and content organization.

### Table Components
Specialized components for data display in tabular format.

## Dependencies

- Material-UI components for enhanced functionality
- Application stores for data when needed
- Utility functions for common operations

