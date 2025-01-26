# Movie Seat Booking Application

## Project Overview

A React-based movie theater seat booking system that allows users to:

- Browse and select movies
- Choose available seats interactively
- Make bookings with personal information
- View real-time price calculations

## Technical Choices and Justification

### Frontend Framework: React with Vite

- **Why React?**
  - Component-based architecture enables modular, reusable code
  - Virtual DOM for efficient rendering of seat selections
  - Strong ecosystem and community support
  - Extensive experience in team with React
  - Easy integration with REST APIs

- **Why Vite?**
  - Fast development server with hot module replacement
  - Efficient build process for production
  - Native ESM support for better development experience
  - Minimal configuration required
  - Better performance compared to Create React App

### State Management

- **Local State with React Hooks**
  - Used useState and useEffect for component-level state
  - Chose this over Redux/Context as the application scope is moderate
  - Simpler to maintain and understand
  - Sufficient for current requirements without added complexity

### Backend Choice: JSON Server

- **Benefits:**
  - Quick setup for prototyping
  - RESTful API conventions
  - Persistent data storage
  - No complex backend configuration needed
  - Perfect for MVP development

## Project Structure and Organization

src/
├── components/
│   ├── Admin.jsx         # Movie management
│   ├── BookingForm.jsx   # Booking functionality
│   ├── MovieBooking.jsx  # Main booking interface
│   ├── MovieForm.jsx     # Movie creation/editing
│   └── SeatGrid.jsx      # Seat selection interface
├── services/
│   └── movieService.js   # API integration
├── styles/
│   ├── Admin.css
│   ├── BookingForm.css
│   └── MovieBooking.css
└── App.jsx              # Main component and routing

### Architecture Decisions

1. **Component Separation:**
   - Split into logical, reusable components
   - Each component has single responsibility
   - Makes testing and maintenance easier

2. **Services Layer:**
   - Centralized API calls in service files
   - Consistent error handling
   - Reusable data fetching logic

3. **CSS Organization:**
   - Component-specific CSS files
   - Modular styling approach
   - Easy to maintain and scale

## Features

### User Features

- Interactive seat selection
- Real-time price updates
- Movie selection
- Booking confirmation system

### Admin Features

- Movie management (CRUD operations)
- Movie details editing
- Basic validation

## Setup Instructions

1. Clone the repository
git clone [repository-url]
2. Install dependencies
npm install
3. Start JSON Server (database)
json-server --watch db.json
4. Start development server
npm run dev

## API Endpoints

- GET /movies - Fetch all movies
- POST /movies - Create new movie
- PUT /movies/:id - Update movie
- DELETE /movies/:id - Delete movie
- GET /bookings - Fetch all bookings
- POST /bookings - Create new booking

## Future Enhancements

- User authentication
- Advanced booking management
- Session management
- Email confirmations
- Payment integration

## Testing

The project uses manual testing for:

- Form validations
- CRUD operations
- UI responsiveness
- Booking flow

## Known Limitations

- Limited to browser local storage
- No user authentication
- Basic error handling
- Simple booking validation

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request
