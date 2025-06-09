# Crypt Client - Feature-Based Architecture

A React/TypeScript gaming application with a feature-based folder structure for better organization and maintainability.

## 🏗️ Architecture Overview

This application uses a **feature-based architecture** where code is organized by business domain rather than technical type.

```
src/
├── features/           # Feature-based modules
│   ├── army/          # Army management feature
│   ├── battle/        # Battle system feature
│   ├── ranking/       # Ranking system feature
│   ├── auth/          # Authentication feature
│   └── user/          # User management feature
├── shared/            # Shared/reusable components
│   ├── components/
│   │   ├── ui/        # Basic UI components
│   │   ├── layout/    # Layout components
│   │   └── tables/    # Table components
│   └── index.ts       # Shared exports
├── Homepage/          # Main landing page
├── assets/           # Static assets
├── store/            # Global state management
├── utils/            # Utility functions
└── App.tsx           # Root application component
```

## 🎯 Features

### Army Management (`/features/army/`)
- Army creation and management
- Army statistics and rankings
- Ally and nemesis tracking
- Emblem selection and customization

### Battle System (`/features/battle/`)
- Battle creation and scheduling
- Real-time battle management
- Battle results and scoring
- Battle history tracking

### Ranking System (`/features/ranking/`)
- 40K and Fantasy leaderboards
- Ranking progression tracking
- Top player showcases
- Visual ranking graphs

### Authentication (`/features/auth/`)
- User login and registration
- Password reset functionality
- Session management
- Security validation

### User Management (`/features/user/`)
- User dashboard
- Personal statistics
- Profile management
- User-specific data views

## 🧩 Shared Components (`/shared/`)

Reusable components organized by purpose:
- **UI**: Basic form inputs, buttons, pills
- **Layout**: Headers, navigation, hero sections
- **Tables**: Table headers, rows, and data display

## 📦 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## 🔄 Import Patterns

### Feature Imports
```tsx
// Import from feature index
import { ArmyDash, AddArmy } from 'src/features/army';
import { BattleCard, CreateBattle } from 'src/features/battle';
```

### Shared Component Imports
```tsx
// Import from shared index
import { Header, InputBox, NavButton } from 'src/shared';
```

### Cross-Feature Imports
```tsx
// Avoid when possible, use shared components instead
import { SomeComponent } from 'src/features/other-feature';
```

## 🛠️ Development Guidelines

### Adding New Features
1. Create feature folder in `/features/`
2. Add `components/` and `pages/` subdirectories
3. Create feature `index.ts` for exports
4. Update main imports in `App.tsx`
5. Add feature documentation

### Adding Shared Components
1. Determine component category (ui/layout/tables)
2. Add to appropriate shared subfolder
3. Export from shared `index.ts`
4. Update shared documentation

### Import Rules
- Use feature exports for feature-specific components
- Use shared exports for reusable components
- Avoid deep imports into feature internals
- Prefer relative imports within the same feature

## 🎮 Game Types Supported

- **Warhammer 40K**: Sci-fi tabletop gaming
- **Warhammer Fantasy**: Fantasy tabletop gaming

## 🏆 Key Metrics Tracked

- Army rankings and progression
- Battle win/loss ratios
- Player statistics and achievements
- Ally and nemesis relationships

## 🔧 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI
- **State Management**: Zustand
- **Styling**: SCSS modules
- **Routing**: React Router

## 📁 Recent Restructure

This project was recently restructured from a flat component structure to a feature-based architecture for:
- Better code organization
- Improved maintainability
- Clearer feature boundaries
- Enhanced team collaboration
- Easier testing and debugging

## 🤝 Contributing

When contributing:
1. Follow the feature-based structure
2. Add appropriate documentation
3. Use TypeScript for type safety
4. Follow existing code patterns
5. Test your changes thoroughly

## 📚 Documentation

Each feature includes its own README with:
- Component descriptions
- Usage examples
- Key features
- Dependencies
- Import patterns

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
