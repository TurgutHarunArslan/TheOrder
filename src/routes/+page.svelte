<script lang="ts">
    import {movies as ms} from  "../stores/movies/movies"
    import type { AllMovies, AllShows } from "../types/types";
    import { goto } from "$app/navigation";
    import { shows as sw } from "../stores/shows/shows";
    let movies : AllMovies = {
        Weekly: [],
        Daily:[]
    }

    let shows : AllShows = {
        Weekly: [],
        Daily:[]
    }

    $: movies = $ms
    $: shows = $sw
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Media Provider" />
</svelte:head>

<main style="zoom: 70%;">

    <section>
        <h1 style="text-align: center; color: white;">Movies of the Week</h1>
        <div class="movieContainer">
            {#each movies.Weekly as movie}
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div class="movie-card" on:click={() => goto("/movie?Id=" + movie.id)}>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} draggable="false" />
                    <h3>{movie.title}</h3>
                </div>
            {/each}
        </div>
    </section>
    
    <section>
        <h1 style="text-align: center; color: white;">Movies of the Day</h1>
            <div class="movieContainer">
                {#each movies.Daily as movie}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div class="movie-card" on:click={() => goto("/movie?Id=" + movie.id)}>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} draggable="false" />
                        <h3>{movie.title}</h3>
                    </div>
                {/each}
            </div>
    </section>

    <section>
        <h1 style="text-align: center; color: white;">Tv Series of the Week</h1>
        <div class="movieContainer">
            {#each shows.Weekly as show}
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div class="movie-card" on:click={() => goto("/show?Id=" + show.id)}>
                    <img src={`https://image.tmdb.org/t/p/w300${show.poster_path}`} alt={show.name} draggable="false" />
                    <h3>{show.name}</h3>
                </div>
            {/each}
        </div>
    </section>

     <section>
        <h1 style="text-align: center; color: white;">Tv Series of the Week</h1>
            <div class="movieContainer">
                {#each shows.Daily as show}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div class="movie-card" on:click={() => goto("/show?Id=" + show.id)}>
                        <img src={`https://image.tmdb.org/t/p/w300${show.poster_path}`} alt={show.name} draggable="false" />
                        <h3>{show.name}</h3>
                    </div>
                {/each}
            </div>
    </section>   

</main>


<style>
.movie-card {
    background-color: #2E236C;
    color: whitesmoke;
    border-radius: 8px;
    min-width: 200px;
    overflow: hidden;
    text-align: center;
    cursor: pointer;
}

.movie-card img {
    width: 100%;
    height: 85%;
    border-radius: 8px;
    user-select: none;
}

.movie-card h3 {
    font-size: 1.2rem;
    margin: 0.5rem 0;
    color: whitesmoke;
}

.movieContainer {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    gap: 1rem; */
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    width: 100%;
    box-sizing: border-box; 
    padding-bottom: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    scrollbar-width: auto;
    scrollbar-color: rgb(82, 74, 153) transparent;
}
</style>