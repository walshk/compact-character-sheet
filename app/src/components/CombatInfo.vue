<template>
  <b-col class="combat-info">
    <b-row class="clickable" @click="showCombatInfo = !showCombatInfo">
      <b-col></b-col>
      <b-col style="text-align: center">
        <h5 style="margin-bottom: 0">Combat</h5>
      </b-col>
      <b-col style="text-align: right"><b-icon-chevron-down /></b-col>
    </b-row>
    <b-collapse
      style="margin-top: 1rem"
      v-model="showCombatInfo"
      id="combatInfoCollapse"
    >
      <b-row>
        <b-col class="combat-section">
          <b-row>
            <b-col><h5>Init.</h5></b-col>
          </b-row>
          <b-row>
            <b-col style="font-size: 1.5rem"
              >{{ initiative >= 0 ? "+" : "" }}{{ initiative }}</b-col
            >
          </b-row>
        </b-col>
        <b-col class="combat-section">
          <b-row
            ><b-col><h5>Speed</h5></b-col></b-row
          >
          <b-row
            ><b-col style="font-size: 1.5rem">{{
              combatInfo.speed
            }}</b-col></b-row
          >
        </b-col>
        <b-col class="combat-section">
          <b-row>
            <b-col><h5>AC</h5></b-col>
          </b-row>
          <b-row>
            <b-col style="font-size: 1.5rem">{{
              combatInfo.armor_class
            }}</b-col>
          </b-row>
        </b-col>

        <b-col id="hp-section" class="combat-section">
          <HealthInfo :editing="editing" />
        </b-col>

        <b-col class="combat-section">
          <b-row>
            <b-col>
              <h5>Temp HP</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col style="font-size: 1.5rem">
              {{ hpTemp }}
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-collapse>
  </b-col>
</template>

<script>
import HealthInfo from "@/components/HealthInfo.vue";

export default {
  name: "combat-info",
  components: {
    HealthInfo,
  },
  props: {
    editing: Boolean,
  },
  data() {
    return {
      showCombatInfo: true,
    };
  },
  computed: {
    combatInfo() {
      return this.$store.state.combat;
    },
    initiative() {
      return this.$store.state.stats.dex.modifier;
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
.combat-info {
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: var(--foreground-bg-color);
}

.combat-section {
  text-align: center;
  padding: 1rem 0.5rem;
}
</style>
