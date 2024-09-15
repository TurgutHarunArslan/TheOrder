<script lang="ts">
  import { goto } from "$app/navigation";
  import type { Movie, Show } from "../types/types";
  export let Media: Show[] | Movie[];
  export let header: string;
</script>

<section>
    <h1 style="text-align: center; color: white; font-size: 2rem;">{header}</h1>
    <div class="MediaContainer">
        {#each Media as item}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            {#if 'first_air_date' in item}
                <div 
                    class="media-card" 
                    on:click={() => goto("/show?Id=" + item.id)}
                    style="background-image: url('https://image.tmdb.org/t/p/w500{item.poster_path}');">
                    <span class="media-text">{item.name}</span>
                </div>
            {:else}
                <div 
                    class="media-card" 
                    on:click={() => goto("/movie?Id=" + item.id)}
                    style="background-image: url('https://image.tmdb.org/t/p/w500{item.poster_path}');">
                    <span class="media-text">{item.title}</span>
                </div>
            {/if}
        {/each}
    </div>
</section>



<style>
.media-card {
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    border-radius: 8px;
    min-width: 300px;
    max-width: 300px;
    min-height: 450px;
    max-height: 450px;
    overflow: hidden;
    cursor: pointer;
}

.media-text {
    background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 75%);
    color: white;
    text-align: left;
    font-size: clamp(0.8rem, 1vw + 1rem, 1.5rem);
    text-wrap: wrap;
    padding-top: 5px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
}

.MediaContainer {
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