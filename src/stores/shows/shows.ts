import { writable } from 'svelte/store';
import type { AllShows} from '../../types/types';
import { shows as weeklyShows } from './weekly';
import { shows as dailyShows } from './daily';


const shows = writable<AllShows>({
    Weekly:  [],
    Daily: []
});

weeklyShows.subscribe($weekly => {
    shows.update(m => ({ ...m, Weekly: $weekly }));
});

dailyShows.subscribe($daily => {
    shows.update(m => ({ ...m, Daily: $daily }));
});

export {shows}