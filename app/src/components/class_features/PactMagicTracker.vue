<template>
  <b-col class="pact-magic-tracker elevated">
    <b-row class="clickable" @click="showPactMagic = !showPactMagic">
      <b-col></b-col>
      <b-col style="text-align: center">
        <h5 style="margin-bottom: 0">Pact Magic</h5>
      </b-col>
      <b-col style="text-align: right"><b-icon-chevron-down /></b-col>
    </b-row>
    <b-collapse v-model="showPactMagic">
      <b-row>
        <b-col>
          <b-row>
            <b-col>
              <h5>Spell Slots Used</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="editing">
              <span
                ><b-input type="number" v-model="pactSlotsUsed"></b-input
              ></span>
            </b-col>
            <b-col v-else class="largeText">
              {{ pactSlotsUsed }}
            </b-col>
          </b-row>
        </b-col>
        <b-col>
          <b-row>
            <b-col>
              <h5>Spell Slots Total</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="editing">
              <span
                ><b-input type="number" v-model="pactSlotsTotal"></b-input
              ></span>
            </b-col>
            <b-col v-else class="largeText">
              {{ pactSlotsTotal }}
            </b-col>
          </b-row>
        </b-col>
        <b-col>
          <b-row>
            <b-col>
              <h5>Spell Level</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="editing">
              <span><b-input type="number" v-model="pactLevel"></b-input></span>
            </b-col>
            <b-col v-else class="largeText">
              <span>{{ pactLevel }}</span>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-collapse>
  </b-col>
</template>

<script>
export default {
  name: "pact-magic-tracker",
  components: {},
  props: {
    editing: Boolean,
  },
  data() {
    return {
      showPactMagic: false,
    };
  },
  computed: {
    pactSlotsUsed: {
      get() {
        return this.$store.state.class_features.pact_magic.slots_used;
      },
      set(value) {
        this.$store.dispatch("updateClassFeatureValue", {
          feature: "pact_magic",
          key: "slots_used",
          value,
        });
      },
    },
    pactSlotsTotal: {
      get() {
        return this.$store.state.class_features.pact_magic.slots_total;
      },
      set(value) {
        this.$store.dispatch("updateClassFeatureValue", {
          feature: "pact_magic",
          key: "slots_total",
          value,
        });
      },
    },
    pactLevel: {
      get() {
        return this.$store.state.class_features.pact_magic.level;
      },
      set(value) {
        this.$store.dispatch("updateClassFeatureValue", {
          feature: "pact_magic",
          key: "level",
          value,
        });
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pact-magic-tracker {
  border: var(--default-border);
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: var(--foreground-bg-color);
  text-align: center;
}
</style>
