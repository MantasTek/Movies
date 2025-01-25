import { useState } from 'react';

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

        if (response.ok) {
          alert('Booking successful!');
          onClose();
        } else {
          throw new Error('Booking failed');
        }
      } catch (error) {
        console.error('Error making booking:', error);
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
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
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