import { writable, derived } from 'svelte/store';
import type { Movie, ProviderName } from '../../types/types';

const providers = {
    "VidBinge": "https://vidbinge.dev/embed/movie/",
    "Vidlink": "https://vidlink.pro/movie/"
};

const API_KEY = '9313885ee41ab3fa03dd3907236ff042';
const BASE_URL = 'https://api.themoviedb.org/3';

const currentMovie = writable<Movie | null>(null);
const currentMovieID = writable<string | null>(null);
const currentProvider = writable<ProviderName>("VidBinge");

const currentUrl = derived(
    [currentProvider, currentMovieID],
    ([$currentProvider, $currentMovieID]) => 
        $currentMovieID ? `${providers[$currentProvider]}${$currentMovieID}` : ""
);

async function fetchMovieData(id: string) {
    const ENDPOINT = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
    try {
        const response = await fetch(ENDPOINT);
        if (!response.ok) {
            throw new Error('Failed to fetch movie data');
        }
        const data = await response.json();
        currentMovie.set(data);
    } catch (error) {
        console.error('Error fetching movie data:', error);
        currentMovie.set(null);
    }
}

function setMovieID(id: string) {
    currentMovieID.set(id);
    localStorage.setItem("show_" + id,"");
    fetchMovieData(id);
}

function setCurrentProvider(provider: ProviderName) {
    currentProvider.set(provider);
}

export {
    setMovieID,
    setCurrentProvider,
    currentProvider,
    currentUrl,
    currentMovie,
    providers
};
