<template>
  <b-container fluid class="stats-bar">
    <b-row>
      <b-col class="stat-col" v-for="statKey in statsKeys" :key="statKey">
        <b-row class="">
          <b-col></b-col>
          <b-col>
            <h5>{{ statKey.toUpperCase() }}</h5>
          </b-col>
          <b-col>
            <b-icon-chevron-down
              @click="toggleCollapse(`collapse-stat`)"
              class="clickable"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col v-if="editing">
            <b-input
              type="number"
              :value="stats[statKey].modifier"
              @input="(newValue) => updateModifier(statKey, newValue)"
              style="text-align: center"
            ></b-input>
          </b-col>
          <b-col v-else class="stat-modifier">
            {{ stats[statKey].modifier >= 0 ? "+" : ""
            }}{{ stats[statKey].modifier }}
          </b-col>
        </b-row>
        <b-collapse id="collapse-stat">
          <b-row
            v-for="ability in Object.keys(stats[statKey].proficiencies)"
            :key="ability"
            class="ability-info"
          >
            <AbilityScore
              :stats="stats"
              :statKey="statKey"
              :ability="ability"
              :editing="editing"
            />
          </b-row>
        </b-collapse>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import AbilityScore from "@/components/AbilityScore.vue";

export default {
  name: "stats-bar",
  components: {
    AbilityScore,
  },
  props: {
    stats: Object,
    editing: Boolean,
  },
  data() {
    return {};
  },
  methods: {
    getAbilityProficiency(statName, abilityName) {
      return this.$store.state.stats[statName].proficiencies[abilityName];
    },
    updateProficiency(statName, abilityName, value) {
      this.$store.dispatch("updateAbilityProficiency", {
        statName,
        abilityName,
        value,
      });
    },
    updateModifier(statName, value) {
      this.$store.dispatch("updateStatModifier", {
        statName,
        value: Number(value),
      });
    },
    toggleCollapse(collapseId) {
      this.$root.$emit("bv::toggle::collapse", collapseId);
    },
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
  background-color: #303030;
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
