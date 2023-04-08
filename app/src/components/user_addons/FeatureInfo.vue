<template>
  <b-col class="feature-info">
    <b-row class="clickable" @click="showFeature = !showFeature">
      <b-col></b-col>
      <b-col v-if="editing" style="text-align: center">
        <b-input v-model="featureName"></b-input>
      </b-col>
      <b-col cols="auto" v-else style="text-align: center">
        <h5 style="margin-bottom: 0">
          {{ featureName }}{{ featureConsumed ? " (Used)" : "" }}
        </h5>
      </b-col>
      <b-col style="text-align: right"><b-icon-chevron-down /></b-col>
    </b-row>
    <b-collapse v-model="showFeature">
      <b-row>
        <b-col style="display: flex">
          <b-checkbox
            v-model="featureConsumed"
            style="margin-right: 0.5rem"
          ></b-checkbox>
          Already Used
        </b-col>
      </b-row>
      <b-row style="text-align: left; margin-top: 1rem">
        <b-col v-if="editing">
          <b-form-textarea v-model="featureDescription"></b-form-textarea>
        </b-col>
        <b-col v-else>
          <span>
            {{ featureDescription }}
          </span>
        </b-col>
      </b-row>
    </b-collapse>
  </b-col>
</template>

<script>
export default {
  name: "feature-info",
  components: {},
  props: {
    editing: Boolean,
    featureIndex: String,
  },
  data() {
    return {
      showFeature: false,
    };
  },
  methods: {},
  computed: {
    featureName: {
      get() {
        return this.$store.state.features[this.featureIndex].name;
      },
      set(value) {
        this.$store.dispatch("updateFeature", {
          index: this.featureIndex,
          key: "name",
          value,
        });
      },
    },
    featureConsumed: {
      get() {
        return this.$store.state.features[this.featureIndex].consumed;
      },
      set(value) {
        this.$store.dispatch("updateFeature", {
          index: this.featureIndex,
          key: "consumed",
          value,
        });
      },
    },
    featureDescription: {
      get() {
        return this.$store.state.features[this.featureIndex].description;
      },
      set(value) {
        this.$store.dispatch("updateFeature", {
          index: this.featureIndex,
          key: "description",
          value,
        });
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.feature-info {
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: var(--foreground-bg-color);
  text-align: center;
}
</style>
