import { useState } from 'react';
import PropTypes from 'prop-types';
import { movieService } from '../services/movieService';

export const BookingForm = ({ movie, selectedSeats, totalPrice, onClose, onBookingComplete }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const bookingData = {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          movieTitle: movie.Title,
          seats: selectedSeats.map(seat => seat + 1),
          price: totalPrice,
          bookingDate: new Date().toISOString()
        };

        await movieService.createBooking(bookingData);
        alert('Booking successful! Thank you for your purchase.');
        onBookingComplete();
      } catch (error) {
        console.error('Error making booking:', error);
        alert('Failed to make booking. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };

  return (
    <div className="booking-form-overlay">
      <div className="booking-form">
        <h2>Book Selected Seats</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>

          <div className="booking-summary">
            <p>Movie: {movie.Title}</p>
            <p>Seats: {selectedSeats.map(seat => seat + 1).join(', ')}</p>
            <p>Total Price: {totalPrice} kr</p>
          </div>

          <div className="form-actions">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Confirm Booking'}
            </button>
            <button type="button" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

BookingForm.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
  }).isRequired,
  selectedSeats: PropTypes.arrayOf(PropTypes.number).isRequired,
  totalPrice: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onBookingComplete: PropTypes.func.isRequired
};