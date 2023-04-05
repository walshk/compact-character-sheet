<template>
  <b-container fluid class="stats-bar">
    <b-row>
      <b-col class="stat-col" v-for="statKey in statsKeys" :key="statKey">
        <b-row class="">
          <b-col>
            <h3>{{ statKey.toUpperCase() }}</h3>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="stat-modifier">
            {{ stats[statKey].modifier >= 0 ? "+" : "-"
            }}{{ stats[statKey].modifier }}
          </b-col>
        </b-row>
        <b-row
          v-for="ability in Object.keys(stats[statKey].proficiencies)"
          :key="ability"
          class="ability-info"
        >
          <b-col style="margin-right: 0.5rem" cols="1">
            {{ stats[statKey].proficiencies[ability] >= 0 ? "+" : "-"
            }}{{ stats[statKey].proficiencies[ability] }}
          </b-col>
          <b-col style="padding-left: 0" cols="auto">
            {{ ability.replaceAll("_", " ").toUpperCase() }}
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "stats-bar",
  props: {
    stats: Object,
  },
  computed: {
    statsKeys() {
      return Object.keys(this.stats);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stats-bar {
  text-align: center;
}

.stat-col {
  border: 1px solid black;
  border-radius: 1rem;
  padding: 0.5rem 0.5rem;
  margin: 0.2rem;
}
.stat-modifier {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}
.ability-info {
  font-size: 0.8rem;
}
</style>
