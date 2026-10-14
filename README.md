# Tesla Supercharger & Fleet Platform

An Angular web application for managing charging stations and vehicle charging
information. The application provides a responsive shell with navigation,
localized content, and API-backed views for the charging and fleet domains.

## Features

- Home dashboard with charging station data loaded from the platform API.
- Charging station collection and station detail cards.
- Vehicle charge data table with sorting, pagination, and CRUD actions.
- Reactive application state management using Angular Signals.
- Lazy-loaded charging and vehicle routes.
- English and Spanish localization with a language switcher.
- Material Design components and responsive application layout.
- Loading and error states for API operations.
- Web Share API support for charging station information, with clipboard
  fallback where sharing is unavailable.

## Technology Stack

- Angular 22
- TypeScript 6
- Angular Material and Angular CDK
- RxJS 7
- `@ngx-translate/core` and `@ngx-translate/http-loader`
- Vitest through the Angular CLI test builder
- npm

## Configuration

### Prerequisites

- Node.js compatible with the installed Angular CLI version.
- npm 11 or a compatible npm version.
- A running platform provider API.

### Install dependencies

```bash
npm install
```

### Configure the API

API settings are defined in:

- `src/environments/environment.development.ts` for development.
- `src/environments/environment.ts` for production builds.

The development configuration expects the API at
`http://localhost:3000/api/v1`, while the production configuration expects
`http://localhost:8080/api/v1`. Both configurations use the following
resource paths:

- `/charging-stations`
- `/vehicle-charges`

Update the environment files when the platform provider API is hosted at a
different URL.

### Run the development server

```bash
npm start
```

Open `http://localhost:4200/` in a browser. The development server reloads
automatically when source files change.

### Build the application

```bash
npm run build
```

Production build artifacts are generated in `dist/eaAlexVasquez`.

### Run unit tests

```bash
npm test
```

## Project Structure

- `src/app/chargingStations`: charging station domain, API integration, state,
  and presentation components.
- `src/app/vehicleCharges`: vehicle charge domain, API integration, state, and
  presentation components.
- `src/app/shared`: layout, navigation, localization, and shared
  infrastructure.
- `public/i18n`: English and Spanish translation resources.
- `src/environments`: environment-specific API configuration.

## Authorship

**Author:** Dev-AlexanderVasquez  
**Email:** [devshiro2802@gmail.com](mailto:devshiro2802@gmail.com)  
**Private GitHub repository:**  
[https://github.com/Dev-AlexanderVasquez/ea7760u202222473](https://github.com/Dev-AlexanderVasquez/ea7760u202222473)
