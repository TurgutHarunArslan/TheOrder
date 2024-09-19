import { writable } from 'svelte/store';
import type { Movie } from '../../types/types';
import { API_KEY } from '$lib/api';
const BASE_URL = 'https://api.themoviedb.org/3';
const WEEKLY_MOVIES_ENDPOINT = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`;


const movies = writable<Movie[]>([]);

async function fetchWeeklyMovies() {
    try {
        const response = await fetch(WEEKLY_MOVIES_ENDPOINT);
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

fetchWeeklyMovies();

export { movies, fetchWeeklyMovies };

