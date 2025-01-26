import { useState } from 'react';
import PropTypes from 'prop-types';

export const BookingForm = ({ movie, selectedSeats, totalPrice, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});

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

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    // Clear error when user starts typing again
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:3000/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            movieTitle: movie.Title,
            seats: selectedSeats,
            price: totalPrice,
            bookingDate: new Date().toISOString()
          }),
        });

        if (!response.ok) {
          throw new Error('Booking failed');
        }

        alert('Booking successful!');
        onClose();
      } catch (err) {
        console.error('Error making booking:', err);
        alert('Failed to make booking. Please try again.');
      }
    } else {
      setErrors(newErrors);
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
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <span className="error" id="name-error" role="alert">
                {errors.name}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            {errors.phone && (
              <span className="error" id="phone-error" role="alert">
                {errors.phone}
              </span>
            )}
          </div>

          <div className="booking-summary">
            <p>Movie: {movie.Title}</p>
            <p>Seats: {selectedSeats.length}</p>
            <p>Total Price: {totalPrice} kr</p>
          </div>

          <div className="form-actions">
            <button type="submit">Confirm Booking</button>
            <button type="button" onClick={onClose}>Cancel</button>
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
};