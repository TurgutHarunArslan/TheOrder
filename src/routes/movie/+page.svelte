<script lang="ts">
  import { page } from '$app/stores';
  import type { ProviderName } from '../../types/types';
  import {setMovieID,setCurrentProvider,currentUrl,currentProvider as Cprovider,providers as providerObject, currentMovie} from '../../stores/movies/current'
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
</script>

<main id="main">
    <section id="ProviderSection" >
        <h3>{movie?.title}</h3>
        <img src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} alt={movie?.title}/>
        <h4>Providers</h4>
        <select bind:value={currentProvider} on:change={() => setCurrentProvider(currentProvider)}>
            {#each Providers as provider}
                <option value={provider}>{provider}</option>
            {/each}
        </select>
    </section>

    <section id="PlayerSection">
        <iframe src={MovieUrl} title="Movie" frameborder='0' allowfullscreen></iframe>
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