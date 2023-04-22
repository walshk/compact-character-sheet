<template>
  <b-col class="feature-info">
    <b-row class="clickable" @click="showFeature = !showFeature">
      <b-col></b-col>
      <b-col v-if="editing" style="text-align: center">
        <b-input v-model="featureName"></b-input>
      </b-col>
      <b-col cols="auto" v-else style="text-align: center">
        <h5 v-if="featureLimitedUse" style="margin-bottom: 0">
          {{ featureName }} {{ expended ? " (Used)" : `(${featureUses})` }}
        </h5>
        <h5 v-else style="margin-bottom: 0">
          {{ featureName }}
        </h5>
      </b-col>
      <b-col style="text-align: right"><b-icon-chevron-down /></b-col>
    </b-row>
    <b-collapse v-model="showFeature">
      <b-row v-if="featureLimitedUse">
        <b-col style="display: flex">
          <h5 style="margin-right: 0.5rem">Available Uses:</h5>
          <b-input
            v-if="editing"
            type="number"
            :min="0"
            v-model="featureUses"
            style="width: fit-content"
          ></b-input>
          <h5 id="featureCount" v-else :style="featureCountStyle">
            {{ featureUses }}
          </h5>
        </b-col>
      </b-row>
      <b-row style="text-align: left; margin-top: 1rem">
        <b-col v-if="editing">
          <b-form-textarea v-model="featureDescription"></b-form-textarea>
        </b-col>
        <b-col v-else>
          <span v-html="formattedFeatureDescription"> </span>
        </b-col>
      </b-row>
      <b-row v-if="editing" style="margin-top: 0.5rem">
        <b-col>
          <b-form-checkbox
            v-model="featureLimitedUse"
            style="margin-right: 0.5rem"
            >&nbsp;&nbsp;Limited Uses?</b-form-checkbox
          >
        </b-col>
      </b-row>
      <b-row v-if="editing" style="margin-top: 0.5rem">
        <b-col>
          <b-button @click="deleteFeature">Delete</b-button>
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
  methods: {
    deleteFeature() {
      this.$store.dispatch("deleteFeature", this.featureIndex);
    },
  },
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
    featureUses: {
      get() {
        return this.$store.state.features[this.featureIndex].uses;
      },
      set(value) {
        this.$store.dispatch("updateFeature", {
          index: this.featureIndex,
          key: "uses",
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
    featureLimitedUse: {
      get() {
        return this.$store.state.features[this.featureIndex].limited_use;
      },
      set(value) {
        this.$store.dispatch("updateFeature", {
          index: this.featureIndex,
          key: "limited_use",
          value,
        });
      },
    },
    formattedFeatureDescription() {
      return (
        "<div>" + this.featureDescription.replaceAll("\n", "<br />") + "</div>"
      );
    },
    featureCountStyle() {
      if (this.featureUses <= 0) {
        return {
          "--feature-uses-color": "var(--bs-danger)",
        };
      }
      return {
        "--feature-uses-color": "var(--bs-info)",
      };
    },
    expended() {
      return this.featureLimitedUse ? this.featureUses <= 0 : false;
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

#featureCount {
  color: var(--feature-uses-color);
}
</style>
