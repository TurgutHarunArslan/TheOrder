<script lang="ts">
  import { goto } from "$app/navigation";
  import type { Movie, Show } from "../types/types";

  export let mediaList: (Show | Movie)[];
  export let header: string;

  function isShow(item: Show | Movie): item is Show {
    return 'first_air_date' in item;
  }

function remove_item(item: Show | Movie) {
  if (isShow(item)) {
    delete_show(item.id);
  } else {
    delete_movie(item.id);
  }

  mediaList = mediaList.filter(mediaItem => mediaItem.id !== item.id);
}

function delete_show(id: string) {
  localStorage.removeItem("tv_" + id);
}

function delete_movie(id: string) {
  localStorage.removeItem("sh_" + id);
}

</script>

{#if mediaList.length > 0}
  
<section>
  <h1 style="text-align: center; color: white; font-size: 2rem;">{header}</h1>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div class="MediaContainer">
    
    {#each mediaList as item}
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      {#if isShow(item)}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <div 
            class="media-card" 
            on:click={() => goto("/show?Id=" + item.id)}
            style="background-image: url('https://image.tmdb.org/t/p/w500{item.poster_path}');">
            <button class="media-del" on:click={(e) => { e.stopPropagation(); remove_item(item); }}>
              <svg width="32" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <span class="media-text">{item.name}</span>
        </div>
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      {:else}
          <div 
              class="media-card" 
              on:click={() => goto("/movie?Id=" + item.id)}
              style="background-image: url('https://image.tmdb.org/t/p/w500{item.poster_path}');">
              <button class="media-del" on:click={(e) => { e.stopPropagation(); remove_item(item); }}>
                <svg width="32" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <span class="media-text">{item.title}</span>
          </div>
      {/if}
    {/each}
    
  </div>
</section>

{/if}


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
    position: relative;
}

.media-del {
  z-index: 2;
  border: none;
  color: whitesmoke;
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.media-del:hover {
  opacity: 0.8;
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