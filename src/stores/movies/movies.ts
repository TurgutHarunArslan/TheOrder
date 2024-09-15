import { writable } from 'svelte/store';
import type { AllMovies} from '../../types/types';
import { movies as weeklyMovies } from './weekly';
import { movies as dailyMovies } from './daily';
import { movies as Continues, LoadMovies } from './continue';
import { Resultmovies,fetchQueryMovies } from './search';

const movies = writable<AllMovies>({
    Weekly:  [],
    Daily: [],
    Search:[],
    Continue:[]
});

weeklyMovies.subscribe($weekly => {
    movies.update(m => ({ ...m, Weekly: $weekly }));
});

dailyMovies.subscribe($daily => {
    movies.update(m => ({ ...m, Daily: $daily }));
});

Resultmovies.subscribe($search => {
    movies.update(m => ({ ...m, Search: $search }));
});

Continues.subscribe($cont => {
    movies.update(m => ({ ...m, Continue: $cont }));
});

function Search(query : string){
    fetchQueryMovies(query)
}

export {movies,Search,LoadMovies}