export interface Movie {
    id: string;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
}

export interface AllMovies {
    Weekly:Movie[];
    Daily:Movie[];
    Search:Movie[]
    Continue:Movie[]
}

export interface Show {
    id: string;
    name: string;
    overview: string;
    poster_path: string;
    first_air_date: string;
}
export interface Season {
    name:string
    season_number:string
    episode_count: string
}

export interface CurrentShow {
    id: string;
    name: string;
    poster_path: string;
    seasons:Season[]
}

export interface AllShows {
    Weekly:Show[];
    Daily:Show[];
    Search:Show[]
    Continue:Show[]
}
export type ProviderName = "VidBinge" | "Vidlink";