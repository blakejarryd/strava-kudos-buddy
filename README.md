# Strava Kudos Buddy

A web application that allows Strava users to analyze and compare kudos interactions between athletes. Track who you're supporting and who's supporting you!

## Features

- Strava OAuth Authentication
- Kudos comparison analytics
  - Track kudos given and received
  - View detailed activity interactions
  - Historical comparison data
- Interactive visualization of kudos interactions
  - Bar chart comparisons
  - Activity timeline
  - Detailed activity lists
- Athlete search functionality
- Responsive design for mobile and desktop

## Tech Stack

### Backend
- Node.js with Express
- TypeScript
- Strava API integration

### Frontend
- React with Vite
- TypeScript
- Tailwind CSS
- shadcn/ui components
- React Router for navigation
- Recharts for data visualization

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Strava API credentials

### Setting up Strava API Access

1. Go to [Strava API Settings](https://www.strava.com/settings/api)
2. Create a new application
3. Note down your:
   - Client ID
   - Client Secret
   - Set Authorization Callback Domain to your development/production domain

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file:
   ```bash
   cp .env.example .env
   ```

4. Add your Strava API credentials to .env

5. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file:
   ```bash
   cp .env.example .env
   ```

4. Add your environment variables:
   - `VITE_API_URL`: Your backend API URL
   - `VITE_STRAVA_CLIENT_ID`: Your Strava Client ID

5. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
strava-kudos-buddy/
├── backend/
│   ├── src/
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   ├── errorHandler.ts
│   │   │   └── logger.ts
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   └── kudos.ts
│   │   ├── services/
│   │   │   ├── stravaAuth.ts
│   │   │   ├── stravaApi.ts
│   │   │   └── kudosComparison.ts
│   │   ├── types/
│   │   │   ├── kudos.ts
│   │   │   └── strava.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Layout.tsx
    │   │   ├── Navbar.tsx
    │   │   └── ProtectedRoute.tsx
    │   ├── context/
    │   │   └── AuthContext.tsx
    │   ├── pages/
    │   │   ├── HomePage.tsx
    │   │   ├── DashboardPage.tsx
    │   │   └── ComparisonPage.tsx
    │   ├── styles/
    │   │   └── globals.css
    │   └── App.tsx
    ├── package.json
    └── tsconfig.json
```

## Components

### Frontend Components
- `Layout`: Main application layout with navigation
- `Navbar`: Navigation bar with authentication status
- `ProtectedRoute`: Route wrapper for authenticated pages
- `AuthContext`: Global authentication state management

### Pages
- `HomePage`: Landing page with Strava login
- `DashboardPage`: User dashboard with athlete search
- `ComparisonPage`: Kudos comparison visualization

## API Endpoints

### Authentication
- `GET /api/auth/strava/url` - Get Strava OAuth URL
- `GET /api/auth/strava/callback` - OAuth callback handler

### Kudos Comparison
- `GET /api/kudos/compare/:targetAthleteId` - Compare kudos with another athlete
- `GET /api/kudos/search/athletes` - Search for athletes
- `GET /api/kudos/athlete/:id` - Get athlete profile

### Parameters for Comparison
- `startDate` (optional) - Start date for comparison period
- `endDate` (optional) - End date for comparison period
- `athleteId` - Current athlete's ID

## Authentication Flow

1. User clicks "Connect with Strava"
2. User is redirected to Strava OAuth page
3. After approval, Strava redirects back with auth code
4. Backend exchanges code for access token
5. User is authenticated and redirected to dashboard

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
