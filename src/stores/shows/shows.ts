import { writable } from 'svelte/store';
import type { AllShows} from '../../types/types';
import { shows as weeklyShows } from './weekly';
import { shows as dailyShows } from './daily';
import { shows as Continues, LoadShows } from './continue';
import { fetchQuerySeries, Resultseries } from './search';

const shows = writable<AllShows>({
    Weekly:  [],
    Daily: [],
    Search:[],
    Continue:[]
});

weeklyShows.subscribe($weekly => {
    shows.update(m => ({ ...m, Weekly: $weekly }));
});

dailyShows.subscribe($daily => {
    shows.update(m => ({ ...m, Daily: $daily }));
});

Resultseries.subscribe($search => {
    shows.update(m => ({ ...m, Search: $search }));
});

Continues.subscribe($cont => {
    shows.update(m => ({ ...m, Continue: $cont }));
});

function Search(query : string){
    fetchQuerySeries(query)
}

export {shows,Search,LoadShows}