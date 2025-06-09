# Authentication Feature

Handles user authentication, registration, and password management.

## Pages

- **LogIn** - User login page with email/password authentication
- **SignUp** - User registration page with emblem selection
- **LogInRedirect** - Redirects users after authentication
- **ForgotPassword** - Password reset request page
- **ResetPassword** - Password reset form with token validation

## Key Features

### Authentication
- Email/password login
- User registration with emblem selection
- JWT token-based authentication
- Session management

### Password Management
- Forgot password functionality
- Email-based password reset
- Token-based reset validation
- Password confirmation validation

### User Registration
- Required fields: email, password, first name, last name, known as
- Emblem selection from available army emblems
- Crypt code validation for registration
- User validation and error handling

## Security Features

- Password confirmation validation
- Secure token-based password reset
- Input validation and sanitization
- Error message handling

## Usage

```tsx
import { 
  LogIn, 
  SignUp, 
  ForgotPassword, 
  ResetPassword 
} from 'src/features/auth';
```

## Dependencies

- Shared UI components (InputBox, NavButton)
- User store for authentication state
- UserAuth utility functions
- Emblem assets for user selection

