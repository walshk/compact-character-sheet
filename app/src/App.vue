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
}

#app {
  background-color: var(--primary-bg-color);
  color: var(--primary-text-color);
  height: 100%;
}
</style>
