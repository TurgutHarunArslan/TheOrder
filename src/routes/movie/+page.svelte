<script lang="ts">
  import "../global.css"
  import { page } from '$app/stores';
  import type { ProviderName } from '../../types/types';
  import {setMovieID,setCurrentProvider,currentUrl,currentProvider as Cprovider,providers as providerObject, currentMovie} from '../../stores/movies/current'
  import { onDestroy } from 'svelte';
  let Providers : ProviderName[] = Object.keys(providerObject) as ProviderName[]
  let movie;
  let movieID = '';
  let MovieUrl = '';
  let currentProvider: ProviderName;

  $: {
    const searchParams = $page.url.searchParams;
    movieID = searchParams.get('Id') || '';
    setMovieID(movieID)
  }

  $: MovieUrl = $currentUrl
  $: currentProvider = $Cprovider
  $: movie = $currentMovie

  onDestroy(()=>{
    setMovieID("")
  })
</script>
<!--
    <main id="main">
        <section id="ProviderSection">
            
        <div id="PosterSection">
            <h3>{movie?.title}</h3>
            <img src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} alt={movie?.title} />
        </div>
        
        <div>
            <h4>Providers</h4>
            <div class="options-container">
                {#each Providers as provider}
                <button class="option {currentProvider === provider ? 'selected' : ''}" on:click={() => setCurrentProvider(provider)}>
                    {provider}
                </button>
                {/each}
            </div>
        </div>
        
    </section>
    
    <section id="PlayerSection">
        <iframe src={MovieUrl} title="Movie" frameborder='0' allowfullscreen></iframe>
    </section>
</main>
-->
<main>
    <div id="Poster">
        <h3>{movie?.title}</h3>
        <img src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} alt={movie?.title} />
    </div>
    <div id="Providers"> 
        {#each Providers as provider}
            <button class="option {currentProvider === provider ? 'selected' : ''}" on:click={() => setCurrentProvider(provider)}>
                {provider}
            </button>
        {/each}
    </div>
    <div id="PlayerSection">
        <iframe src={MovieUrl} allowfullscreen title="movie" frameborder="0"></iframe>
    </div>
</main>

<style>
main {
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
    grid-area: 2 / 2 / 5 / 6;
}
#PlayerSection > iframe{
    width: 100%;
    height: 100%;
}
#Poster{
    text-align: center;
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
</style>