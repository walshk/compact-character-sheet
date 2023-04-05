<template>
  <b-container fluid class="character-sheet">
    <StatsBar :stats="characterStats" />
  </b-container>
</template>

<script>
import StatsBar from "@/components/StatsBar.vue";

export default {
  name: "character-sheet",
  components: {
    StatsBar,
  },
  computed: {
    characterStats() {
      return this.$store.getters.characterStats;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.character-sheet {
}
</style>
