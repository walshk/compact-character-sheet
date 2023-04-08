<template>
  <b-container fluid class="character-sheet">
    <b-button @click="editing = !editing">Toggle Edit</b-button>
    <b-row class="section">
      <b-col>
        <CharacterInfo :editing="editing" />
      </b-col>
    </b-row>
    <b-row class="section">
      <b-col>
        <StatsBar :editing="editing" :stats="characterStats" />
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="6">
        <b-row>
          <CombatInfo :editing="editing" />
        </b-row>
        <b-row style="margin-top: 0.5rem">
          <CasterInfo :editing="editing" />
        </b-row>
        <!-- OPTIONAL SPELLCASTER TRACKING ROWS -->
        <b-row style="margin-top: 0.5rem" v-if="hasSpellSlots">
          <SpellSlotsTracker :editing="editing" />
        </b-row>
        <b-row style="margin-top: 0.5rem" v-if="hasPactMagic">
          <PactMagicTracker :editing="editing" />
        </b-row>
        <b-row style="margin-top: 0.5rem" v-if="hasSorceryPoints">
          <SorcererTracker :editing="editing" />
        </b-row>
      </b-col>
      <b-col>
        <b-tabs pills>
          <b-tab title="Combat"></b-tab>
          <b-tab title="Inventory"></b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import StatsBar from "@/components/StatsBar.vue";
import CharacterInfo from "@/components/CharacterInfo.vue";
import CombatInfo from "@/components/CombatInfo.vue";
import CasterInfo from "@/components/CasterInfo.vue";
import SorcererTracker from "@/components/class_features/SorcererTracker.vue";
import PactMagicTracker from "@/components/class_features/PactMagicTracker.vue";
import SpellSlotsTracker from "@/components/class_features/SpellSlotsTracker.vue";

export default {
  name: "character-sheet",
  components: {
    StatsBar,
    CharacterInfo,
    CombatInfo,
    CasterInfo,
    SorcererTracker,
    PactMagicTracker,
    SpellSlotsTracker,
  },
  data() {
    return {
      editing: false,
    };
  },
  computed: {
    characterStats() {
      return this.$store.getters.characterStats;
    },
    class() {
      return this.$store.state.character_info.class.toLowerCase();
    },
    hasSorceryPoints() {
      return this.class.includes("sorcerer");
    },
    hasPactMagic() {
      return this.class.includes("warlock");
    },
    hasSpellSlots() {
      return (
        this.class.includes("sorcerer") ||
        this.class.includes("wizard") ||
        this.class.includes("cleric") ||
        this.class.includes("bard") ||
        this.class.includes("druid")
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.character-sheet {
}

.section {
  margin-bottom: 0.5rem;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: black !important;
  background-color: white !important;
}

.nav-link {
  color: var(--primary-text-color) !important;
}

.nav-link:hover:not(.nav-link.active) {
  filter: brightness(75%);
}
</style>
