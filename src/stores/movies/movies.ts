import { writable } from 'svelte/store';
import type { AllMovies} from '../../types/types';
import { movies as weeklyMovies } from './weekly';
import { movies as dailyMovies } from './daily';


const movies = writable<AllMovies>({
    Weekly:  [],
    Daily: []
});

weeklyMovies.subscribe($weekly => {
    movies.update(m => ({ ...m, Weekly: $weekly }));
});

dailyMovies.subscribe($daily => {
    movies.update(m => ({ ...m, Daily: $daily }));
});

export {movies}