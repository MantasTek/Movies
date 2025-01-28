import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MovieForm } from './MovieForm';
import { movieService } from '../services/movieService';
import '../styles/Admin.css';

export const Admin = () => {
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await movieService.getMovies();
      setMovies(data);
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

  const handleDelete = async (movieId) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      setError(null);
      try {
        await movieService.deleteMovie(movieId);
        await fetchMovies();
      } catch (err) {
        setError('Error deleting movie. Please try again.');
        console.error('Error deleting movie:', err);
      }
    }
  };

  const handleSave = async (movieData) => {
    setError(null);
    try {
      if (movieData.id) {
        await movieService.updateMovie(movieData.id, movieData);
      } else {
        await movieService.createMovie(movieData);
      }
      setEditingMovie(null);
      await fetchMovies();
    } catch (err) {
      setError(`Error ${movieData.id ? 'updating' : 'creating'} movie. Please try again.`);
      console.error('Error saving movie:', err);
    }
  };

  if (isLoading) {
    return <div className="admin-panel">Loading...</div>;
  }

  return (
    <div className="admin-panel">
      <h1>Movie Management</h1>
      
      {error && <div className="error-message" role="alert">{error}</div>}

      <button 
        type="button"
        className="add-movie-btn"
        onClick={() => setEditingMovie({})}
      >
        Add New Movie
      </button>

      <div className="movies-list">
        {movies.map(movie => (
          <div key={movie.id || movie.Title} className="movie-item">
            <div className="movie-info">
              <h3>{movie.Title}</h3>
              <p>Price: {movie.Price} kr</p>
            </div>
            <div className="movie-actions">
              <button 
                type="button" 
                onClick={() => setEditingMovie(movie)}
              >
                Edit
              </button>
              <button 
                type="button" 
                onClick={() => handleDelete(movie.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingMovie && (
        <MovieForm 
          movie={editingMovie} 
          onSave={handleSave}
          onCancel={() => setEditingMovie(null)}
        />
      )}
    </div>
  );
};

MovieForm.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Price: PropTypes.number,
    Year: PropTypes.string,
    Poster: PropTypes.string
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};