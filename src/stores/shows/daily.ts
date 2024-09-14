import { writable } from 'svelte/store';
import type { Show } from '../../types/types';
const API_KEY = '9313885ee41ab3fa03dd3907236ff042';
const BASE_URL = 'https://api.themoviedb.org/3';
const WEEKLY_SHOWS_ENDPOINT = `${BASE_URL}/trending/tv/day?api_key=${API_KEY}`;


const shows = writable<Show[]>([]);

async function fetchDailyShows() {
    try {
        const response = await fetch(WEEKLY_SHOWS_ENDPOINT);
        if (!response.ok) {
            throw new Error('Failed to fetch shows');
        }
        const data = await response.json();
        shows.set(data.results);
    } catch (error) {
        console.error('Error fetching shows:', error);
        shows.set([]);
    }
}

fetchDailyShows();

export { shows };

