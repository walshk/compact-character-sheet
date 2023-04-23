<template>
  <b-col class="feat-info elevated">
    <b-row class="clickable" @click="showFeat = !showFeat">
      <b-col></b-col>
      <b-col v-if="editing" style="text-align: center">
        <b-input v-model="featName"></b-input>
      </b-col>
      <b-col cols="auto" v-else style="text-align: center">
        <h5 style="margin-bottom: 0">
          {{ featName }}
        </h5>
      </b-col>
      <b-col style="text-align: right"><b-icon-chevron-down /></b-col>
    </b-row>
    <b-collapse v-model="showFeat">
      <b-row style="text-align: left; margin-top: 1rem">
        <b-col v-if="editing">
          <b-form-textarea v-model="featDescription"></b-form-textarea>
        </b-col>
        <b-col v-else>
          <span v-html="formattedFeatDescription"> </span>
        </b-col>
      </b-row>
      <b-row v-if="editing" style="margin-top: 0.5rem">
        <b-col>
          <b-button @click="deleteFeat">Delete</b-button>
        </b-col>
      </b-row>
    </b-collapse>
  </b-col>
</template>

<script>
export default {
  name: "feat-info",
  components: {},
  props: {
    editing: Boolean,
    featIndex: String,
  },
  data() {
    return {
      showFeat: false,
    };
  },
  methods: {
    deleteFeat() {
      this.$store.dispatch("deleteFeat", this.featIndex);
    },
  },
  computed: {
    featName: {
      get() {
        return this.$store.state.feats[this.featIndex].name;
      },
      set(value) {
        this.$store.dispatch("updateFeat", {
          index: this.featIndex,
          key: "name",
          value,
        });
      },
    },
    featDescription: {
      get() {
        return this.$store.state.feats[this.featIndex].description;
      },
      set(value) {
        this.$store.dispatch("updateFeat", {
          index: this.featIndex,
          key: "description",
          value,
        });
      },
    },
    formattedFeatDescription() {
      return (
        "<div>" + this.featDescription.replaceAll("\n", "<br />") + "</div>"
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.feat-info {
  border: var(--default-border);
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: var(--foreground-bg-color);
  text-align: center;
}
</style>
