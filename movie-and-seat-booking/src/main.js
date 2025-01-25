import './style.css';
import { Movie } from './models/movie.js';

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = 0;
let movies = [];

async function fetchMovies() {
    try {
        const response = await fetch('https://gist.githubusercontent.com/aspcodenet/32a21ce9d8b8ccf19108a8a02883e9bb/raw/785f9bcb1527cb01e182d3fe40ffafd6fd00dac9/movies.json');
        const data = await response.json();
        movies = data.map(movie => new Movie(movie.Title, movie.Price));
        populateMovieSelect();
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

function populateMovieSelect() {
    movieSelect.innerHTML = '';
    movies.forEach(movie => {
        const option = document.createElement('option');
        option.value = movie.price;
        option.textContent = `${movie.title} (${movie.price} kr)`;
        movieSelect.appendChild(option);
    });
    
    if (movies.length > 0) {
        ticketPrice = movies[0].price;
        updateSelectedCount();
    }
}

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = `${selectedSeatsCount * ticketPrice} kr`;
}

movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    updateSelectedCount();
});

container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

document.addEventListener('DOMContentLoaded', fetchMovies);