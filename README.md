# Strava Kudos Buddy

A web application that allows Strava users to analyze and compare kudos interactions between athletes. Track who you're supporting and who's supporting you!

## Features

- Strava OAuth Authentication
- Kudos comparison analytics
- Interactive visualization of kudos interactions
- Athlete search functionality

## Tech Stack

### Backend
- Node.js with Express
- TypeScript
- Strava API integration

### Frontend
- React
- TypeScript
- Tailwind CSS
- shadcn/ui components

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

## Project Structure

```
└── backend/
    ├── src/
    │   ├── middleware/
    │   ├── routes/
    │   ├── services/
    │   ├── types/
    │   └── server.ts
    ├── package.json
    └── tsconfig.json
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.