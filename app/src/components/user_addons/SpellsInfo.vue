<template>
  <b-col class="spells-info elevated">
    <b-row class="clickable" @click="showSpells = !showSpells">
      <b-col></b-col>
      <b-col style="text-align: center">
        <h5 style="margin-bottom: 0">Spells</h5>
      </b-col>
      <b-col style="text-align: right"><b-icon-chevron-down /></b-col>
    </b-row>
    <b-collapse v-model="showSpells">
      <b-row style="margin: auto; text-align: left">
        <b-col cols="2">
          <span>Lvl</span>
        </b-col>
        <b-col cols="2">
          <span>Prep.</span>
        </b-col>
        <b-col>
          <span>Name</span>
        </b-col>
        <b-col v-if="editing">
          <span>Delete</span>
        </b-col>
      </b-row>
      <div class="spellsCollapse">
        <IndividualSpell
          v-for="spellIndex in spells"
          :key="`spell-${spellIndex}`"
          :editing="editing"
          :index="spellIndex"
        />
      </div>
      <b-row v-if="editing">
        <b-col>
          <span @click="addNewSpell" class="clickable">+ New Spell</span>
        </b-col>
      </b-row>
    </b-collapse>
  </b-col>
</template>

<script>
import IndividualSpell from "@/components/user_addons/IndividualSpell.vue";

export default {
  name: "spells-info",
  components: {
    IndividualSpell,
  },
  props: {
    editing: Boolean,
  },
  data() {
    return {
      showSpells: false,
    };
  },
  methods: {
    updateSpell(index, key, value) {
      this.$store.dispatch("updateSpell", {
        index,
        key,
        value,
      });
    },
    addNewSpell() {
      this.$store.dispatch("addNewSpell");
    },
    deleteSpell(index) {
      this.$store.dispatch("deleteSpell", index);
    },
  },
  computed: {
    spellsObject() {
      return this.$store.state.combat.spells;
    },
    spells() {
      return Object.keys(this.spellsObject);
      // return Object.keys(this.spellsObject).sort(
      //   (a, b) => this.spellsObject[a].level - this.spellsObject[b].level
      // );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.spells-info {
  border: var(--default-border);
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: var(--foreground-bg-color);
  text-align: center;
}

.spellsCollapse {
  max-height: 40vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
