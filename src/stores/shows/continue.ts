import { writable } from 'svelte/store';
import type { Show } from '../../types/types';


const shows = writable<Show[]>([]);

async function Load() {
    let tempshow = []
    for (let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i)
        if (key?.startsWith("tv_")) {
            let data = localStorage.getItem(key)
            const { show,seasonNumber, episodeNumber } = JSON.parse(data as string);
            tempshow.push(show)
        }
    }
    shows.set(tempshow)
}

export { shows,Load as LoadShows };

