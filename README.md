# event-planner

An Angular event planning application that has been upgraded to the latest Angular version (18.x).

## Features

- View upcoming Angular events
- Create new events
- View event details and sessions
- User authentication and profiles
- Session voting and management

## Technology Stack

- **Angular**: 18.2.0
- **TypeScript**: 5.5.4
- **RxJS**: 7.8.1
- **Bootstrap**: 5.3.3
- **Node.js**: Backend API server

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the backend API server (in one terminal):
   ```bash
   npm run server
   ```

2. Start the Angular development server (in another terminal):
   ```bash
   npm start
   ```

3. Open your browser and navigate to `http://localhost:4200`

The backend API runs on port 8808, and the Angular CLI dev server proxies API requests to it.

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/event-planner` directory.

## Recent Updates

This application has been fully upgraded from Angular 4 to Angular 18, including:

- Migration from `@angular/http` to `@angular/common/http` (HttpClient)
- Updated RxJS from v5 to v7 with modern operators
- Replaced SystemJS with Angular CLI build system
- Updated Bootstrap from v3 to v5
- Modern TypeScript 5.x support
- Proper zone.js polyfills configuration

All functionality has been preserved and tested during the upgrade.

## Project Structure

```
event-planner/
├── app/                  # Angular application source
│   ├── common/          # Shared components and services
│   ├── events/          # Event-related components
│   ├── nav/             # Navigation component
│   └── user/            # User authentication and profile
├── server.js            # Backend API server
├── angular.json         # Angular CLI configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

## License

MIT