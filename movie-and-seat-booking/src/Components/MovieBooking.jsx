import { useState, useEffect } from 'react';
import { BookingForm } from './BookingForm';
import '../styles/MovieBooking.css';

export const MovieBooking = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch('https://gist.githubusercontent.com/aspcodenet/32a21ce9d8b8ccf19108a8a02883e9bb/raw/785f9bcb1527cb01e182d3fe40ffafd6fd00dac9/movies.json');
      const data = await response.json();
      setMovies(data);
      setSelectedMovie(data[0]);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleSeatClick = (seatIndex) => {
    if (!selectedSeats.includes(seatIndex)) {
      setSelectedSeats([...selectedSeats, seatIndex]);
    } else {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatIndex));
    }
  };

  const totalPrice = selectedMovie ? selectedSeats.length * selectedMovie.Price : 0;

  const handleMovieChange = (event) => {
    const movie = movies.find(m => m.Title === event.target.value);
    setSelectedMovie(movie);
  };

  return (
    <div className="movie-booking">
      <div className="movie-container">
        <label>Pick a movie:</label>
        <select 
          value={selectedMovie?.Title || ''} 
          onChange={handleMovieChange}
        >
          {movies.map(movie => (
            <option key={movie.Title} value={movie.Title}>
              {movie.Title} ({movie.Price} kr)
            </option>
          ))}
        </select>
      </div>

      <ul className="showcase">
        <li><div className="seat"></div><small>N/A</small></li>
        <li><div className="seat selected"></div><small>Selected</small></li>
        <li><div className="seat occupied"></div><small>Occupied</small></li>
      </ul>

      <div className="container">
        <div className="screen"></div>
        {Array(6).fill(null).map((_, rowIndex) => (
          <div key={rowIndex} className="row">
            {Array(8).fill(null).map((_, seatIndex) => {
              const index = rowIndex * 8 + seatIndex;
              const isOccupied = [3, 4, 14, 15, 22, 23, 34, 35, 44, 45, 46].includes(index);
              return (
                <div
                  key={seatIndex}
                  className={`seat ${isOccupied ? 'occupied' : ''} 
                    ${selectedSeats.includes(index) ? 'selected' : ''}`}
                  onClick={() => !isOccupied && handleSeatClick(index)}
                />
              );
            })}
          </div>
        ))}
      </div>

      <p className="text">
        You have selected <span>{selectedSeats.length}</span> seats 
        for a price of <span>{totalPrice}</span> kr
      </p>

      {selectedSeats.length > 0 && (
        <button 
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