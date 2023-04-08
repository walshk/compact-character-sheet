<template>
  <b-container fluid class="health-info">
    <b-row>
      <b-col style="text-align: center">
        <h5>HP</h5>
      </b-col>
    </b-row>
    <b-row>
      <b-col v-if="editing" class="currentHp">
        <b-input
          type="number"
          v-model="hpCurrent"
          style="text-align: center"
        ></b-input
        >/<b-input
          type="number"
          v-model="hpMax"
          style="text-align: center"
        ></b-input>
      </b-col>
      <b-col v-else class="currentHp"> {{ hpCurrent }} / {{ hpMax }} </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "health-info",
  props: {
    editing: Boolean,
  },
  data() {
    return {};
  },
  computed: {
    hpCurrent: {
      get() {
        return this.$store.state.combat.hp_current;
      },
      set(value) {
        this.$store.dispatch("updateCombatInfoByKey", {
          key: "hp_current",
          newValue: value,
        });
      },
    },
    hpMax: {
      get() {
        return this.$store.state.combat.hp_max;
      },
      set(value) {
        this.$store.dispatch("updateCombatInfoByKey", {
          key: "hp_max",
          newValue: value,
        });
      },
    },
    hpTemp: {
      get() {
        return this.$store.state.combat.hp_temp;
      },
      set(value) {
        this.$store.dispatch("updateCombatInfoByKey", {
          key: "hp_temp",
          newValue: value,
        });
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.health-info {
  padding: 0;
}

.currentHp {
  text-align: center;
  font-size: 1.5rem;
}

#tempHpCol {
  justify-content: flex-end;
}

#maxHpCol,
#tempHpCol {
  font-size: 0.75rem;
  display: flex;
  align-items: center;
}
</style>
