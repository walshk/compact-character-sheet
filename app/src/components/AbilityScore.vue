<template>
  <b-row style="display: flex; align-items: center" class="ability-score">
    <b-col v-if="editing" style="margin-right: 1rem" cols="5">
      <b-form-select
        v-model="proficiencyValue"
        :options="abilityOptions"
      ></b-form-select>
    </b-col>
    <b-col v-else style="margin-right: 1rem" cols="1">
      {{ stats[statKey].proficiencies[ability] >= 0 ? "+" : ""
      }}{{ stats[statKey].proficiencies[ability] }}
    </b-col>
    <b-col style="padding: 0; text-align: left">
      {{ ability.replaceAll("_", " ").toUpperCase() }}
    </b-col>
  </b-row>
</template>

<script>
import { PROFICIENCY } from "@/globals";

export default {
  name: "ability-score",
  props: {
    stats: Object,
    statKey: String,
    ability: String,
    editing: Boolean,
  },
  data() {
    return {
      abilityOptions: [
        { value: PROFICIENCY.NOT_PROFICIENT, text: "None" },
        { value: PROFICIENCY.PROFICIENT, text: "Prof." },
        { value: PROFICIENCY.EXPERTISE, text: "Exp." },
      ],
    };
  },
  computed: {
    proficiencyValue: {
      get() {
        return this.$store.state.stats[this.statKey].proficiencies[
          this.ability
        ];
      },
      set(value) {
        this.$store.dispatch("updateAbilityProficiency", {
          statName: this.statKey,
          abilityName: this.ability,
          value,
        });
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ability-score {
}
</style>
