<script lang="ts">
  import { nanoid } from 'nanoid';
  import { goto } from '$app/navigation';
  import type { Song } from '$lib/types';
  import SongInput from '$lib/components/SongInput.svelte';
  import SongList from '$lib/components/SongList.svelte';
  import SetlistSummary from '$lib/components/SetlistSummary.svelte';

  let songs: Song[] = [];
  let shareUrl = '';
  let isSharing = false;

  function addSong(title: string, minutes: number, seconds: number) {
    const duration = (minutes * 60) + seconds;
    songs = [...songs, {
      id: nanoid(6),
      title,
      duration,
      position: songs.length
    }];
  }

  function removeSong(id: string) {
    songs = songs.filter(song => song.id !== id);
  }

  async function shareSetlist() {
    isSharing = true;
    const form = new FormData();
    form.append('songs', JSON.stringify(songs));
    
    try {
      const response = await fetch('?/createSetlist', {
        method: 'POST',
        body: form
      });
      
      const result = await response.json();
      if (result.setlistId) {
        shareUrl = `${window.location.origin}/setlist/${result.setlistId}`;
      }
    } catch (error) {
      console.error('Error sharing setlist:', error);
    } finally {
      isSharing = false;
    }
  }

  function copyUrl() {
    navigator.clipboard.writeText(shareUrl);
  }
</script>

<main class="container">
  <h1>Setlist Builder</h1>

  <SongInput onAddSong={addSong} />
  <SongList {songs} onRemove={removeSong} />
  <SetlistSummary {songs} />

  {#if songs.length > 0}
    <button class="share-btn" on:click={shareSetlist} disabled={isSharing}>
      {isSharing ? 'Generating Share URL...' : 'Share Setlist'}
    </button>

    {#if shareUrl}
      <div class="share-url">
        <p>Share this URL with your band:</p>
        <div class="url-container">
          <input type="text" readonly value={shareUrl} class="url-input" />
          <button class="copy-btn" on:click={copyUrl}>Copy</button>
        </div>
      </div>
    {/if}
  {/if}
</main>

<style>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
  }

  .share-btn {
    width: 100%;
    background: #ff3e00;
    color: white;
    border: none;
    padding: 0.8rem;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 1rem;
  }

  .share-btn:hover {
    background: #ff5722;
  }

  .share-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  .share-url {
    margin-top: 1rem;
    padding: 1rem;
    background: #f5f5f5;
    border-radius: 4px;
  }

  .url-container {
    display: flex;
    gap: 0.5rem;
  }

  .url-input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 0.9rem;
  }

  .copy-btn {
    background: #4CAF50;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }

  .copy-btn:hover {
    background: #45a049;
  }
</style>