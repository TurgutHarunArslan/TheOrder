<script lang="ts">
import {movies as ms, Search as mSearch,LoadMovies} from  "../stores/movies/movies"
import type { AllMovies, AllShows } from "../types/types";
import { goto } from "$app/navigation";
import { LoadShows, Search as sSearch, shows as sw } from "../stores/shows/shows";
import { onMount } from "svelte";
  import Media from "../component/media.svelte";
  import MediaContinue from "../component/mediaContinue.svelte";
let query = '';

export let movies : AllMovies = {
    Weekly: [],
    Daily:[],
    Search:[],
    Continue:[]
}

export let shows : AllShows = {
    Weekly: [],
    Daily:[],
    Search:[],
    Continue:[]
}

$: movies = $ms
$: shows = $sw
$: {
    mSearch(query)
    sSearch(query)
}

onMount(()=>{
    LoadShows()
    LoadMovies()
})

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Media Provider" />
</svelte:head>

<div id="main">
    <main style="zoom: 70%;">

        <div class="searchbar">
            <input type="text" name="Search" placeholder="Search" bind:value={query} >
        </div>

        {#if (query == '' || query == null)}

            <MediaContinue header="Continue Watching" mediaList={[...shows.Continue, ...movies.Continue]}/>

            <Media Media={movies.Weekly} header='Movies Of The Week'/>
            
            <Media Media={movies.Daily} header='Movies Of The Day'/>

            <Media Media={shows.Daily} header='TV Series Of The Day'/>

            <Media Media={shows.Weekly} header='TV Series Of The Week'/>

        {:else}

            {#if movies.Search.length > 0 || shows.Search.length > 0}
                <Media Media={movies.Search} header='Movies'/>
                <Media Media={shows.Search} header='Shows'/>
            {:else}
                <h1 style="text-align: center; color: whitesmoke;">
                    No Search Results :()
                </h1>
            {/if}

        {/if}

    </main>
</div>
<style>
    #main {
        background-color: #101820;
        background-color: #101820;
        min-height: 100%;
    }
    .searchbar{
        top: 15px;
        position: relative;
        background-color: #101820;
        display: flex;
        justify-content: center;
    }
    .searchbar input {
        background-color: #000000;
        color: whitesmoke;
        font-size: 2rem;
        border: 0;
        border-radius: 25px;
        width: 70%;
        padding: 10px;
    }
</style>