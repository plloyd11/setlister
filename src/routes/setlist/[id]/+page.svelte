<script lang="ts">
  import type { PageData } from './$types';
  import SongList from '$lib/components/SongList.svelte';
  import SetlistSummary from '$lib/components/SetlistSummary.svelte';

  export let data: PageData;
</script>

<main class="container">
  <h1>Shared Setlist</h1>
  
  <SongList songs={data.songs} onRemove={() => {}} />
  <SetlistSummary songs={data.songs} />
  
  <a href="/" class="new-btn">Create New Setlist</a>
</main>

<style>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
  }

  .new-btn {
    display: block;
    width: 100%;
    background: #4CAF50;
    color: white;
    text-align: center;
    padding: 0.8rem;
    border-radius: 4px;
    text-decoration: none;
  }

  .new-btn:hover {
    background: #45a049;
  }
</style>