<template>
  <b-col class="combat-info elevated">
    <b-row class="clickable" @click="showCombatInfo = !showCombatInfo">
      <b-col></b-col>
      <b-col style="text-align: center">
        <h5 style="margin-bottom: 0">Combat & Health</h5>
      </b-col>
      <b-col style="text-align: right"><b-icon-chevron-down /></b-col>
    </b-row>
    <b-collapse v-model="showCombatInfo" id="combatInfoCollapse">
      <b-row>
        <b-col class="combat-section">
          <b-row>
            <b-col><h5>Init.</h5></b-col>
          </b-row>
          <b-row>
            <b-col style="font-size: 1.5rem" v-if="editing"
              ><b-input type="number" v-model="initiative"></b-input
            ></b-col>
            <b-col style="font-size: 1.5rem" v-else
              >{{ initiative >= 0 ? "+" : "" }}{{ initiative }}</b-col
            >
          </b-row>
        </b-col>
        <b-col class="combat-section">
          <b-row
            ><b-col><h5>Speed</h5></b-col></b-row
          >
          <b-row>
            <b-col v-if="editing" style="font-size: 1.5rem">
              <b-input v-model="speed"></b-input>
            </b-col>
            <b-col v-else style="font-size: 1.5rem">{{ speed }}</b-col>
          </b-row>
        </b-col>
        <b-col class="combat-section">
          <b-row>
            <b-col><h5>AC</h5></b-col>
          </b-row>
          <b-row>
            <b-col v-if="editing" style="font-size: 1.5rem">
              <b-input type="number" v-model="armor_class"></b-input>
            </b-col>
            <b-col v-else style="font-size: 1.5rem">{{ armor_class }}</b-col>
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
            <b-col v-if="editing" style="font-size: 1.5rem">
              <b-input type="number" v-model="hpTemp"></b-input>
            </b-col>
            <b-col v-else style="font-size: 1.5rem">{{ hpTemp }}</b-col>
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
      showCombatInfo: false,
    };
  },
  computed: {
    combatInfo() {
      return this.$store.state.combat;
    },
    initiative: {
      get() {
        return this.$store.state.combat.initiative;
      },
      set(value) {
        this.$store.dispatch("updateCombatInfoByKey", {
          key: "initiative",
          newValue: value,
        });
      },
    },
    speed: {
      get() {
        return this.$store.state.combat.speed;
      },
      set(value) {
        this.$store.dispatch("updateCombatInfoByKey", {
          key: "speed",
          newValue: value,
        });
      },
    },
    armor_class: {
      get() {
        return this.$store.state.combat.armor_class;
      },
      set(value) {
        this.$store.dispatch("updateCombatInfoByKey", {
          key: "armor_class",
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
.combat-info {
  border: var(--default-border);
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: var(--foreground-bg-color);
}

.combat-section {
  text-align: center;
  padding: 1rem 0.5rem;
}
</style>
