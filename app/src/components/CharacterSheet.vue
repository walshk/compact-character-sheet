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
      <b-col style="padding-left: 1rem">
        <b-tabs pills>
          <b-tab title="Combat">
            <b-row style="margin-top: 0.5rem">
              <AttacksInfo :editing="editing" />
            </b-row>
            <b-row style="margin-top: 0.5rem">
              <SpellsInfo :editing="editing" />
            </b-row>
          </b-tab>
          <b-tab title="Features">
            <b-row
              style="margin-top: 0.5rem"
              v-for="featureIndex in features"
              :key="`feature-${featureIndex}`"
            >
              <FeatureInfo :featureIndex="featureIndex" :editing="editing" />
            </b-row>
            <b-row
              v-if="editing"
              style="text-align: center; margin-top: 0.5rem"
            >
              <b-col>
                <span class="clickable" @click="addNewFeature"
                  >+ New Feature</span
                >
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Inventory">
            <b-row
              style="margin-top: 0.5rem"
              v-for="itemIndex in inventory"
              :key="`item-${itemIndex}`"
            >
              <InventoryInfo :index="itemIndex" :editing="editing" />
            </b-row>
            <b-row
              v-if="editing"
              style="text-align: center; margin-top: 0.5rem"
            >
              <b-col>
                <span class="clickable" @click="addNewItem">+ New Item</span>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Money">
            <b-row>
              <MoneyInfo :editing="editing" />
            </b-row>
          </b-tab>
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
import AttacksInfo from "@/components/user_addons/AttacksInfo.vue";
import SpellsInfo from "@/components/user_addons/SpellsInfo.vue";
import FeatureInfo from "@/components/user_addons/FeatureInfo.vue";
import InventoryInfo from "@/components/user_addons/InventoryInfo.vue";
import MoneyInfo from "@/components/MoneyInfo.vue";

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
    AttacksInfo,
    SpellsInfo,
    FeatureInfo,
    InventoryInfo,
    MoneyInfo,
  },
  data() {
    return {
      editing: false,
    };
  },
  methods: {
    addNewFeature() {
      this.$store.dispatch("addNewFeature");
    },
    addNewItem() {
      this.$store.dispatch("addNewItem");
    },
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
    featuresObject() {
      return this.$store.state.features;
    },
    features() {
      return Object.keys(this.featuresObject);
    },
    inventoryObject() {
      return this.$store.state.inventory;
    },
    inventory() {
      return Object.keys(this.inventoryObject);
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
