<template>
  <b-row class="individual-spell">
    <b-col cols="2" v-if="editing">
      <b-input v-model="spellLevel"></b-input>
    </b-col>
    <b-col cols="2" v-else>
      {{ spellLevel }}
    </b-col>
    <b-col cols="2">
      <b-checkbox v-model="spellPrepared"></b-checkbox>
    </b-col>
    <b-col v-if="editing">
      <b-input v-model="spellName"></b-input>
    </b-col>
    <b-col v-else>
      <a class="spellLink clickable" :href="spellUrl" target="_blank">{{
        spellName
      }}</a>
    </b-col>
    <b-col v-if="editing">
      <span class="clickable" @click="deleteSpell(index)"
        ><b-icon-backspace
      /></span>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "individual-spell",
  components: {},
  props: {
    index: String,
    editing: Boolean,
  },
  data() {
    return {};
  },
  methods: {
    deleteSpell(index) {
      this.$store.dispatch("deleteSpell", index);
    },
  },
  computed: {
    spellLevel: {
      get() {
        return this.$store.state.combat.spells[this.index].level;
      },
      set(value) {
        this.$store.dispatch("updateSpell", {
          index: this.index,
          key: "level",
          value,
        });
      },
    },
    spellName: {
      get() {
        return this.$store.state.combat.spells[this.index].name;
      },
      set(value) {
        this.$store.dispatch("updateSpell", {
          index: this.index,
          key: "name",
          value,
        });
      },
    },
    spellPrepared: {
      get() {
        return this.$store.state.combat.spells[this.index].prepared;
      },
      set(value) {
        this.$store.dispatch("updateSpell", {
          index: this.index,
          key: "prepared",
          value,
        });
      },
    },
    spellUrl() {
      const spellName =
        this.$store.state.combat.spells[this.index].name.toLowerCase();
      const openParenIndex = spellName.indexOf("(");
      const trimmedSpellName =
        openParenIndex >= 0
          ? spellName.slice(0, openParenIndex - 1)
          : spellName;

      const cleanSpellName = trimmedSpellName
        .split(" ")
        .join("-")
        .replaceAll("'", "")
        .replaceAll("/", "-");

      return `http://dnd5e.wikidot.com/spell:${cleanSpellName}`;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.individual-spell {
  text-align: left;
  border-top: 1px solid black;
  margin: 0.25rem 0;
  padding: 0.25rem 0;
}

.spellLink {
  color: white;
  text-decoration: none;
}
</style>
