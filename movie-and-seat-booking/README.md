# Movie Seat Booking Application

## Project Overview

A React-based movie seat booking system that allows users to select movies, choose seats, and make bookings.

## Technical Stack

- **Frontend Framework**: React with Vite
  - Chosen for its component-based architecture and efficient rendering
  - Vite provides fast development and optimized production builds
- **State Management**: React Hooks (useState, useEffect)
- **API Integration**: Fetch API for REST endpoints
- **Styling**: CSS Modules for component-specific styling
- **Backend**: JSON Server for REST API functionality

## Features

- Interactive seat selection interface
- Real-time price calculations
- Movie selection from API
- Booking form with validation
- Admin interface for movie management

## Project Structure

movie-seat-booking/
├── src/
│   ├── components/
│   │   ├── MovieBooking.jsx
│   │   └── BookingForm.jsx
│   ├── styles/
│   │   ├── MovieBooking.css
│   │   └── BookingForm.css
│   └── App.jsx
├── public/
└── vite.config.js

## Setup Instructions

1. Clone repository
2. Install dependencies: `npm install`
3. Start JSON Server: `json-server --watch db.json`
4. Run development server: `npm run dev`

## Deployment

Project is deployed using GitHub Pages through GitHub Actions workflow.

## Future Enhancements

- Payment integration
- User authentication
- Email confirmations
- Mobile responsiveness
