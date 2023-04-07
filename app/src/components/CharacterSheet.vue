<template>
  <b-container fluid class="character-sheet">
    <b-button @click="editing = !editing">Toggle Edit</b-button>
    <b-row>
      <b-col>
        <CharacterInfo :editing="editing" />
      </b-col>
    </b-row>
    <b-row style="margin-top: 1rem">
      <b-col>
        <StatsBar :editing="editing" :stats="characterStats" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import StatsBar from "@/components/StatsBar.vue";
import CharacterInfo from "@/components/CharacterInfo.vue";

export default {
  name: "character-sheet",
  components: {
    StatsBar,
    CharacterInfo,
  },
  data() {
    return {
      editing: false,
    };
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
