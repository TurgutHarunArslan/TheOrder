import { writable } from 'svelte/store';
import type { Movie } from '../../types/types';
const API_KEY = '9313885ee41ab3fa03dd3907236ff042';
const BASE_URL = 'https://api.themoviedb.org/3';
const MOVIE_SEARCH = `${BASE_URL}/search/movie?api_key=${API_KEY}&include_adult=false&language=en-US&page=1`;


const movies = writable<Movie[]>([]);

async function fetchQueryMovies(query : string) {
    try {
        const response = await fetch(MOVIE_SEARCH + "&query=" + query);
        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        const sortedResults = data.results.sort((a: { popularity: number; }, b: { popularity: number; }) => b.popularity - a.popularity);
        movies.set(sortedResults);
    } catch (error) {
        console.error('Error fetching movies:', error);
        movies.set([]);
    }
}

export {movies as Resultmovies,fetchQueryMovies}