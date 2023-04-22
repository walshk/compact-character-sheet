<template>
  <b-container fluid id="app">
    <CharacterSheet />
  </b-container>
</template>

<script>
import CharacterSheet from "./components/CharacterSheet.vue";

export default {
  name: "App",
  components: {
    CharacterSheet,
  },
  created() {
    this.$store.dispatch("initStore");
  },
};
</script>

<style>
html,
body {
  height: 100%;
  background-color: var(--primary-bg-color);
  color: var(--primary-text-color);
}

#app {
  height: 100%;
  background-color: var(--primary-bg-color);
  color: var(--primary-text-color);
}

.tab-content {
  height: 65vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0.5rem 1rem;
}
</style>
