import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const MovieForm = ({ movie, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    Title: '',
    Price: '',
    Year: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (movie) {
      setFormData({
        Title: movie.Title || '',
        Price: movie.Price || '',
        Year: movie.Year || ''
      });
    }
  }, [movie]);

  const validateForm = () => {
    const newErrors = {};
    const currentYear = new Date().getFullYear();

    if (!formData.Title.trim()) {
      newErrors.Title = 'Title is required';
    }

    if (!formData.Price) {
      newErrors.Price = 'Price is required';
    } else if (isNaN(formData.Price) || Number(formData.Price) < 0) {
      newErrors.Price = 'Price must be a positive number';
    }

    if (!formData.Year.trim()) {
      newErrors.Year = 'Year is required';
    } else {
      const yearNum = Number(formData.Year);
      if (isNaN(yearNum) || yearNum < 1888 || yearNum > currentYear + 5) {
        newErrors.Year = `Year must be between 1888 and ${currentYear + 5}`;
      }
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      onSave({
        ...movie,
        ...formData,
        Price: Number(formData.Price)
      });
    } else {
      setErrors(validationErrors);
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
    <div className="movie-form-overlay">
      <div className="movie-form">
        <h2>{movie.id ? 'Edit Movie' : 'Add New Movie'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="Title">Title:</label>
            <input
              id="Title"
              type="text"
              value={formData.Title}
              onChange={handleInputChange}
              aria-invalid={!!errors.Title}
              aria-describedby={errors.Title ? "title-error" : undefined}
            />
            {errors.Title && (
              <span className="error" id="title-error" role="alert">
                {errors.Title}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="Price">Price (kr):</label>
            <input
              id="Price"
              type="number"
              min="0"
              step="1"
              value={formData.Price}
              onChange={handleInputChange}
              aria-invalid={!!errors.Price}
              aria-describedby={errors.Price ? "price-error" : undefined}
            />
            {errors.Price && (
              <span className="error" id="price-error" role="alert">
                {errors.Price}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="Year">Year:</label>
            <input
              id="Year"
              type="number"
              min="1888"
              max={new Date().getFullYear() + 5}
              value={formData.Year}
              onChange={handleInputChange}
              aria-invalid={!!errors.Year}
              aria-describedby={errors.Year ? "year-error" : undefined}
            />
            {errors.Year && (
              <span className="error" id="year-error" role="alert">
                {errors.Year}
              </span>
            )}
          </div>

          <div className="form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

MovieForm.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    Title: PropTypes.string,
    Price: PropTypes.number,
    Year: PropTypes.string
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};