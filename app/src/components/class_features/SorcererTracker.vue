<template>
  <b-col class="sorcerer-tracker">
    <b-row class="clickable" @click="showSorcery = !showSorcery">
      <b-col></b-col>
      <b-col style="text-align: center">
        <h5 style="margin-bottom: 0">Sorcerer</h5>
      </b-col>
      <b-col style="text-align: right"><b-icon-chevron-down /></b-col>
    </b-row>
    <b-collapse style="margin-top: 1rem" v-model="showSorcery">
      <b-row>
        <b-col>
          <b-row>
            <b-col>
              <h5>Sorcery Points</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="largeText">
              {{ sorcPointsAvailable }} / {{ sorcPointsTotal }}
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
            <b-col>
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
      showSorcery: true,
    };
  },
  computed: {
    sorcPointsAvailable: {
      get() {
        return this.$store.state.class_features.sorcerer.points_available;
      },
    },
    sorcPointsTotal: {
      get() {
        return this.$store.state.class_features.sorcerer.points_total;
      },
    },
    metamagics: {
      get() {
        return this.$store.state.class_features.sorcerer.metamagics;
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sorcerer-tracker {
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: var(--foreground-bg-color);
  text-align: center;
}
</style>
