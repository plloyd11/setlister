<script lang="ts">
  export let onAddSong: (title: string, minutes: number, seconds: number) => void;

  let title = '';
  let minutes = 0;
  let seconds = 0;

  function handleSubmit() {
    if (!title) return;
    onAddSong(title, minutes, seconds);
    title = '';
    minutes = 0;
    seconds = 0;
  }
</script>

<div class="add-song">
  <input
    type="text"
    bind:value={title}
    placeholder="Song title"
    class="input"
  />
  <div class="duration-inputs">
    <input
      type="number"
      bind:value={minutes}
      min="0"
      placeholder="Min"
      class="input"
    />
    <input
      type="number"
      bind:value={seconds}
      min="0"
      max="59"
      placeholder="Sec"
      class="input"
    />
  </div>
  <button on:click={handleSubmit}>Add Song</button>
</div>

<style>
  .add-song {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .duration-inputs {
    display: flex;
    gap: 0.5rem;
  }

  .input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
</style>