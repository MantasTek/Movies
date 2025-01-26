const API_URL = 'http://localhost:3000';

export const movieService = {
  async getMovies() {
    const response = await fetch(`${API_URL}/movies`);
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    return response.json();
  },

  async createMovie(movieData) {
    const response = await fetch(`${API_URL}/movies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movieData)
    });
    if (!response.ok) {
      throw new Error('Failed to create movie');
    }
    return response.json();
  },

  async updateMovie(id, movieData) {
    const response = await fetch(`${API_URL}/movies/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movieData)
    });
    if (!response.ok) {
      throw new Error('Failed to update movie');
    }
    return response.json();
  },

  async deleteMovie(id) {
    const response = await fetch(`${API_URL}/movies/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete movie');
    }
  }
};