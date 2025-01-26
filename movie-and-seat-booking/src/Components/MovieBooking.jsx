import { useState, useEffect } from 'react';
import { BookingForm } from './BookingForm';
import { SeatGrid } from './components/seatGrid';
import { movieService } from '../services/movieService';
import '../styles/MovieBooking.css';

export const MovieBooking = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      const data = await movieService.getMovies();
      setMovies(data);
      setSelectedMovie(data[0]);
    } catch (err) {
      setError('Error loading movies. Please try again.');
      console.error('Error fetching movies:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSeatClick = (seatIndex) => {
    setSelectedSeats(prevSeats => 
      prevSeats.includes(seatIndex)
        ? prevSeats.filter(seat => seat !== seatIndex)
        : [...prevSeats, seatIndex]
    );
  };

  const handleMovieChange = (event) => {
    const movie = movies.find(m => m.Title === event.target.value);
    setSelectedMovie(movie);
  };

  if (isLoading) {
    return <div className="movie-booking">Loading...</div>;
  }

  if (error) {
    return <div className="movie-booking error-message">{error}</div>;
  }

  const totalPrice = selectedMovie ? selectedSeats.length * selectedMovie.Price : 0;

  return (
    <div className="movie-booking">
      <div className="movie-container">
        <label htmlFor="movie-select">Pick a movie:</label>
        <select 
          id="movie-select"
          value={selectedMovie?.Title || ''} 
          onChange={handleMovieChange}
        >
          {movies.map(movie => (
            <option key={movie.id || movie.Title} value={movie.Title}>
              {movie.Title} ({movie.Price} kr)
            </option>
          ))}
        </select>
      </div>

      <SeatGrid 
        selectedSeats={selectedSeats}
        onSeatClick={handleSeatClick}
      />

      <p className="text">
        You have selected <span>{selectedSeats.length}</span> seats 
        for a price of <span>{totalPrice}</span> kr
      </p>

      {selectedSeats.length > 0 && (
        <button 
          type="button"
          className="booking-button"
          onClick={() => setShowBookingForm(true)}
        >
          Book Selected Seats
        </button>
      )}

      {showBookingForm && (
        <BookingForm
          movie={selectedMovie}
          selectedSeats={selectedSeats}
          totalPrice={totalPrice}
          onClose={() => setShowBookingForm(false)}
        />
      )}
    </div>
  );
};