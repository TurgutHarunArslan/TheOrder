<script lang="ts">
    import type { ProviderName,CurrentShow as ShowType,Season } from "../../types/types";
    import { page } from "$app/stores";
    import { setShowId,SetCurrentProvider,currentUrl,currentShow,currentProvider,providers,currentEpisode,currentSeason, SetCurrentEp, SetCurrentSeason} from "../../stores/shows/current.";

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

</script>

<main id="main">
    <section id="ProviderSection" >
        <h3>{show?.name}</h3>
        <img src={`https://image.tmdb.org/t/p/w300${show?.poster_path}`} alt={show?.name}/>

        <h4>Providers</h4>
        <select bind:value={currentprovider} on:change={() => SetCurrentProvider(currentprovider as ProviderName)}>
            {#each Providers as provider}
                <option value={provider}>{provider}</option>
            {/each}
        </select>

        <div>
            <h4>Seasons</h4>
            <select bind:value={CurrentSes} on:click={ () => SetCurrentSeason(CurrentSes,"1")}>
                {#each seasons as season}
                    <option value={season.season_number}>{season.name}</option>
                {/each}
            </select>
    
            <h4>Episodes</h4>
            <select bind:value={CurrentEp} on:click={ () => SetCurrentEp(CurrentEp)}>
                {#each episodes as episode}
                    <option value={episode}>{episode}</option>
                {/each}
            </select>
        </div>

    </section>

    <section id="PlayerSection">
        <iframe src={url} title="Movie" frameborder='0' allowfullscreen></iframe>
    </section>

</main>

<style>
    #main{
        display: flex;
        min-width: 100vw;
        min-height: 100vh;
		margin: 0;
		padding: 0;
        color: white;
    }
    #ProviderSection{
        width: 20%;
        padding: 10px;
        text-align: center;
    }
    #ProviderSection > h3 {
        height: fit-content;
    }
    #ProviderSection > img{
        width: 100%;
        height: 50%;
    }
    #PlayerSection{
        width: 100%;
        display: flex;
        justify-content: center;
        align-content: center;
    }
    iframe{
        width: 80%;
        height: 80%;
    }
</style>
