<template>
  <b-col class="sorcerer-tracker elevated">
    <b-row class="clickable" @click="showSorcery = !showSorcery">
      <b-col></b-col>
      <b-col style="text-align: center">
        <h5 style="margin-bottom: 0">Sorcerer</h5>
      </b-col>
      <b-col style="text-align: right"><b-icon-chevron-down /></b-col>
    </b-row>
    <b-collapse v-model="showSorcery">
      <b-row>
        <b-col>
          <b-row>
            <b-col>
              <h5>Sorcery Points Used</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="editing">
              <span
                ><b-input type="number" v-model="sorcPointsUsed"></b-input
              ></span>
            </b-col>
            <b-col v-else class="largeText">
              {{ sorcPointsUsed }}
            </b-col>
          </b-row>
        </b-col>
        <b-col>
          <b-row>
            <b-col>
              <h5>Sorcery Points Total</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="editing">
              <span
                ><b-input type="number" v-model="sorcPointsTotal"></b-input
              ></span>
            </b-col>
            <b-col v-else class="largeText">
              {{ sorcPointsTotal }}
            </b-col>
          </b-row>
        </b-col>
        <b-col>
          <b-row>
            <b-col>
              <h5>Metamagics</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="editing">
              <span><b-input v-model="metamagics"></b-input></span>
            </b-col>
            <b-col v-else>
              <span>{{ metamagics }}</span>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-collapse>
  </b-col>
</template>

<script>
export default {
  name: "sorcerer-tracker",
  components: {},
  props: {
    editing: Boolean,
  },
  data() {
    return {
      showSorcery: false,
    };
  },
  computed: {
    sorcPointsUsed: {
      get() {
        return this.$store.state.class_features.sorcerer.points_used;
      },
      set(value) {
        this.$store.dispatch("updateClassFeatureValue", {
          feature: "sorcerer",
          key: "points_used",
          value,
        });
      },
    },
    sorcPointsTotal: {
      get() {
        return this.$store.state.class_features.sorcerer.points_total;
      },
      set(value) {
        this.$store.dispatch("updateClassFeatureValue", {
          feature: "sorcerer",
          key: "points_total",
          value,
        });
      },
    },
    metamagics: {
      get() {
        return this.$store.state.class_features.sorcerer.metamagics;
      },
      set(value) {
        this.$store.dispatch("updateClassFeatureValue", {
          feature: "sorcerer",
          key: "metamagics",
          value,
        });
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sorcerer-tracker {
  border: var(--default-border);
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: var(--foreground-bg-color);
  text-align: center;
}
</style>
