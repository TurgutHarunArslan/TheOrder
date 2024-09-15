import { derived, get, writable } from 'svelte/store';
import type { ProviderName, CurrentShow, Season } from '../../types/types';
const providers = {
    "VidBinge" : "https://vidbinge.dev/embed/tv/",
    "Vidlink": "https://vidlink.pro/tv/"
}

const API_KEY = '9313885ee41ab3fa03dd3907236ff042';
const BASE_URL = 'https://api.themoviedb.org/3';

const currentShow = writable<CurrentShow | null>()
const currentShowID = writable<string>()

const currentProvider = writable<ProviderName>("VidBinge")
const currentSeason = writable<string>()

const currentEpisode = writable<string>()

const currentUrl = derived(
    [currentShowID,currentProvider, currentSeason, currentEpisode],
    ([$currentShowID,$currentProvider, $currentSeason, $currentEpisode]) => 
        `${providers[$currentProvider]}/${$currentShowID}/${$currentSeason}/${$currentEpisode}`
)

function save_progress(){
    const combined = {
        show: get(currentShow),
        seasonNumber: get(currentSeason),
        episodeNumber: get(currentEpisode),
    };
    localStorage.setItem("tv_" + get(currentShowID), JSON.stringify(combined));
}

function setShowId(id: string) {
    currentShowID.set(id);
    FetchShowDetails(id);
}

function SetCurrentSeason(sesnumber : string,epnumber : string){
    if (sesnumber == get(currentSeason)){
        return
    }
    currentSeason.set(sesnumber)
    save_progress()
    currentEpisode.set(epnumber)
}

function SetCurrentEp(number : string){
    currentEpisode.set(number)
    save_progress()
}

function SetCurrentProvider(provider : ProviderName): void{
    currentProvider.set(provider)
}

function LoadShow(showid: string,seasons : Season[]){
    const Data = localStorage.getItem("tv_" + showid);
    if (Data) {
        const { show,seasonNumber, episodeNumber } = JSON.parse(Data);
        SetCurrentSeason(seasonNumber || seasons[0].season_number,episodeNumber || "1");
    }else{
        SetCurrentSeason(seasons[0].season_number,"1")
    }
    
}

async function FetchShowDetails(id:string){
    let ENDPOINT = `${BASE_URL}/tv/${id}?api_key=${API_KEY}`;
    try {
        const response = await fetch(ENDPOINT);
        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }
        const data : CurrentShow = await response.json();
        currentShow.set(data);
        LoadShow(id,data.seasons)
        save_progress()
    } catch (error) {
        console.error('Error fetching movies:', error);
        currentShow.set(null);
    }
}

export {setShowId,SetCurrentSeason,SetCurrentEp,SetCurrentProvider,currentShow,currentEpisode,currentSeason,currentUrl,currentProvider,providers}