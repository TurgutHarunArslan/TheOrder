<script lang="ts">
    import "../global.css"
    import type { ProviderName,CurrentShow as ShowType,Season } from "../../types/types";
    import { page } from "$app/stores";
    import { setShowId,SetCurrentProvider,currentUrl,currentShow,currentProvider,providers,currentEpisode,currentSeason, SetCurrentEp, SetCurrentSeason} from "../../stores/shows/current";
    import { onDestroy } from "svelte";

    let Providers : ProviderName[] = Object.keys(providers) as ProviderName[]
    let movieID = ''

    let show : ShowType | null ,url: string,currentprovider : string;
    let CurrentEp: string,CurrentSes:string;


    let seasons: Season[] = [];
    let episodes: string[] = [];

    $: {
        const searchParams = $page.url.searchParams;
        movieID = searchParams.get('Id') || '';
        setShowId(movieID)
    }

    $: {
        show = $currentShow;
        url = $currentUrl;
        currentprovider = $currentProvider;
        CurrentEp = $currentEpisode;
        CurrentSes = $currentSeason;

        if (show?.seasons) {
            seasons = show.seasons;
            const selectedSeason = seasons.find(season => season.season_number === CurrentSes);
            episodes = selectedSeason ? Array.from({ length: parseInt(selectedSeason.episode_count) }, (_, i) => (i + 1).toString()) : [];
        }

    }

    onDestroy(()=>{
        setShowId("")
    })
</script>
<main>
    <div id="Poster">
        <h3>{show?.name}</h3>
        <img src={`https://image.tmdb.org/t/p/w500${show?.poster_path}`} alt={show?.name} />
    </div>
    <div id="Providers"> 
        {#each Providers as provider}
            <button class="option {currentprovider === provider ? 'selected' : ''}" on:click={() => SetCurrentProvider(provider)}>
                {provider}
            </button>
        {/each}
    </div>

    <div id="SeasonSection">
        <div id="ses">
            {#each seasons as ses}
                <button class="option {CurrentSes === ses.season_number ? 'selected' : ''}" on:click={() => SetCurrentSeason(ses.season_number,"1")}>
                    {ses.name}
                </button>
            {/each}
        </div>
    </div>

    <div id="EpSection">
        <div id="eps">
            {#each episodes as ep}
                <button class="option {CurrentEp === ep ? 'selected' : ''}" on:click={() => SetCurrentEp(ep)}>
                    {ep}
                </button>
            {/each}
        </div>
    </div>

    <div id="PlayerSection">
        <iframe src={url} title="Movie" frameborder='0' allowfullscreen></iframe>
    </div>
</main>
    
<style>
main{
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-column-gap: 32px;
    row-gap: 16px;
    min-width: 100vw;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    color: white;
}
#PlayerSection{
    grid-area: 2 / 2 / 5 / 5;
}
#PlayerSection > iframe{
    width: 100%;
    height: 100%;
}

#Poster{
    grid-area: 2 / 1 / 5 / 2;
}

#Poster > img {
    width: 100%;
    height: 80%;
}
#Providers{
    grid-area: 1 / 2 / 2 / 3;
    align-content: end;
}

#SeasonSection{
    grid-area: 1 / 5 / 2 / 6;
    align-content: end;
}
#ses{
    max-width: 20vw;
    height: 6vh;
    overflow-x: auto;
    white-space: nowrap;
}
#EpSection{
    grid-area: 2 / 5 / 5 / 6;
}
#eps{
    max-width: 20vw;
    height: 5vh;
    overflow-x: auto;
    white-space: nowrap;
}
#eps > button {
    width: 32px;
    height: 32px;
    display: inline-block;
}
</style>
