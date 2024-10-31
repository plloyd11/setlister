<script lang="ts">
  import type { Song } from '$lib/types';
  import { formatTime } from '$lib/utils';

  export let songs: Song[];

  $: totalDuration = songs.reduce((acc, song) => acc + song.duration, 0);
</script>

<div class="summary">
  <p>Total Songs: {songs.length}</p>
  <p>Total Duration: {formatTime(totalDuration)}</p>
</div>

<style>
  .summary {
    margin-bottom: 1rem;
  }
</style>