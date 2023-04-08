<template>
  <b-container fluid class="character-info">
    <b-row>
      <b-col>
        <div>
          <span>{{ charInfo.name }}</span>
        </div>
        <div>
          <span>{{ charInfo.race }}</span>
        </div>
        <div>
          <span>Level {{ charInfo.level }} {{ charInfo.class }}</span>
        </div>
      </b-col>
      <b-col class="highlight-info">
        <div>Proficiency Bonus</div>
        <div>
          <h5>+{{ charInfo.prof_bonus }}</h5>
        </div>
      </b-col>
      <b-col class="highlight-info">
        <div>Inspiration</div>
        <div>
          <h5>{{ charInfo.inspiration }}</h5>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "character-info",
  props: {
    editing: Boolean,
  },
  data() {
    return {};
  },
  computed: {
    charInfo() {
      return this.$store.state.character_info;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.character-info {
}

.highlight-info {
  text-align: center;
}
</style>
