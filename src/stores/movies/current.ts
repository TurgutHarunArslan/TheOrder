import { writable, derived, get } from 'svelte/store';
import type { Movie, ProviderName } from '../../types/types';
import { API_KEY } from '$lib/api';
const providers = {
    "VidSrc": "https://vidsrc.me/embed/movie",
    "VidBinge": "https://vidbinge.dev/embed/movie/",
    "Vidlink": "https://vidlink.pro/movie/"
};

const BASE_URL = 'https://api.themoviedb.org/3';

const currentMovie = writable<Movie | null>(null);
const currentMovieID = writable<string | null>(null);
const currentProvider = writable<ProviderName>("VidSrc");

const currentUrl = derived(
    [currentProvider,currentMovieID],
    ([$currentProvider, $currentMovieID]) =>  {
        let movieId : string = $currentMovieID as string
        return buildUrl($currentProvider,movieId);
    }
);

function buildUrl(provider: ProviderName,movieId: string ) {
    let providerUrl = providers[provider]
    if (provider == "VidSrc"){
        return `${providerUrl}?tmdb=${movieId}`;
    }
    return `${providerUrl}/${movieId}`;
}

async function fetchMovieData(id: string) {
    if (id == ''){
        currentMovie.set(null)
        return
    }
    const ENDPOINT = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
    try {
        const response = await fetch(ENDPOINT);
        if (!response.ok) {
            throw new Error('Failed to fetch movie data');
        }
        const data = await response.json();
        currentMovie.set(data);
        save_progress(data)
    } catch (error) {
        console.error('Error fetching movie data:', error);
        currentMovie.set(null);
    }
}

function save_progress(data : Movie){
    const combined = {
        movie: data,
    };
    localStorage.setItem("sh_" + get(currentMovieID), JSON.stringify(combined));
}

function setMovieID(id: string) {
    currentMovieID.set(id);
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
