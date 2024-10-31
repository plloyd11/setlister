<script lang="ts">
  import type { Song } from '$lib/types';
  import { formatTime } from '$lib/utils';

  export let songs: Song[];
  export let onRemove: (id: string) => void;
</script>

<div class="songs-list">
  {#each songs as song (song.id)}
    <div class="song-item">
      <span class="song-title">{song.title}</span>
      <span class="song-duration">{formatTime(song.duration)}</span>
      <button class="remove-btn" on:click={() => onRemove(song.id)}>×</button>
    </div>
  {/each}
</div>

<style>
  .songs-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }

  .song-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    background: #f5f5f5;
    border-radius: 4px;
  }

  .remove-btn {
    background: none;
    border: none;
    color: #ff3e00;
    font-size: 1.2rem;
    cursor: pointer;
  }
</style>