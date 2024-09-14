import { writable } from 'svelte/store';
import type { Movie } from '../../types/types';
const API_KEY = '9313885ee41ab3fa03dd3907236ff042';
const BASE_URL = 'https://api.themoviedb.org/3';
const ENDPOINt = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;


const movies = writable<Movie[]>([]);

async function fetchDailyMovies() {
    try {
        const response = await fetch(ENDPOINt);
        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        movies.set(data.results);
    } catch (error) {
        console.error('Error fetching movies:', error);
        movies.set([]);
    }
}

fetchDailyMovies();

export { movies, fetchDailyMovies as fetchWeeklyMovies };

