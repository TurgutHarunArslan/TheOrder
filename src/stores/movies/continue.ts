import { writable } from 'svelte/store';
import type { Movie } from '../../types/types';


const movies = writable<Movie[]>([]);

async function Load() {
    let tempmovs = []
    for (let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i)
        if (key?.startsWith("sh_")) {
            let data = localStorage.getItem(key)
            const { movie } = JSON.parse(data as string);
            tempmovs.push(movie)
        }
    }
    movies.set(tempmovs)
}

export { movies ,Load as LoadMovies};

