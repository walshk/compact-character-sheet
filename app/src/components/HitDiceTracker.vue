<template>
  <b-col class="hit-dice-tracker elevated">
    <b-row class="clickable" @click="showHitDice = !showHitDice">
      <b-col></b-col>
      <b-col style="text-align: center">
        <h5 style="margin-bottom: 0">Hit Dice</h5>
      </b-col>
      <b-col style="text-align: right"><b-icon-chevron-down /></b-col>
    </b-row>
    <b-collapse v-model="showHitDice">
      <b-row>
        <b-col>
          <b-row>
            <b-col>
              <h5>Used</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="editing">
              <span
                ><b-input type="number" v-model="used" min="0"></b-input
              ></span>
            </b-col>
            <b-col v-else class="largeText">
              {{ used }}
            </b-col>
          </b-row>
        </b-col>
        <b-col>
          <b-row>
            <b-col>
              <h5>Total</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="editing">
              <span
                ><b-input type="number" v-model="total" min="0"></b-input
              ></span>
            </b-col>
            <b-col v-else class="largeText">
              {{ total }}
            </b-col>
          </b-row>
        </b-col>
        <b-col>
          <b-row>
            <b-col>
              <h5>Type</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="editing">
              <span><b-input v-model="type"></b-input></span>
            </b-col>
            <b-col v-else class="largeText">
              <span>{{ type }}</span>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-collapse>
  </b-col>
</template>

<script>
export default {
  name: "hit-dice-tracker",
  components: {},
  props: {
    editing: Boolean,
  },
  data() {
    return {
      showHitDice: false,
    };
  },
  computed: {
    type: {
      get() {
        return this.$store.state.hit_dice.type;
      },
      set(value) {
        this.$store.dispatch("updateHitDiceByKey", {
          key: "type",
          value,
        });
      },
    },
    used: {
      get() {
        return this.$store.state.hit_dice.used;
      },
      set(value) {
        this.$store.dispatch("updateHitDiceByKey", {
          key: "used",
          value,
        });
      },
    },
    total: {
      get() {
        return this.$store.state.hit_dice.total;
      },
      set(value) {
        this.$store.dispatch("updateHitDiceByKey", {
          key: "total",
          value,
        });
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hit-dice-tracker {
  border: var(--default-border);
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: var(--foreground-bg-color);
  text-align: center;
}
</style>
