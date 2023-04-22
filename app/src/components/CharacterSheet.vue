<template>
  <b-container fluid class="character-sheet">
    <b-row style="margin: 0; justify-content: flex-end">
      <b-col class="topBarButtonCol" cols="auto">
        <b-button
          v-if="editing"
          class="topBarButton"
          @click="editing = false"
          variant="success"
          >Save</b-button
        >
        <b-button
          v-else
          class="topBarButton"
          @click="editing = true"
          variant="warning"
          >Edit</b-button
        >
      </b-col>
      <b-col class="topBarButtonCol" cols="auto">
        <b-button
          class="topBarButton"
          @click="openImportCharacterModal"
          variant="info"
          >Import</b-button
        >
      </b-col>
      <b-col class="topBarButtonCol" cols="auto">
        <b-button class="topBarButton" @click="exportCharacter" variant="info"
          >Download</b-button
        >
      </b-col>
      <b-modal
        hide-header
        hide-footer
        centered
        size="md"
        id="importCharacterModal"
      >
        <b-container>
          <b-row style="margin-bottom: 1rem">
            <b-col>
              <b-form-file
                v-model="importFile"
                :state="Boolean(importFile)"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
                accept=".json"
                plain
              ></b-form-file>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="6">
              <b-button
                style="width: 100%"
                variant="danger"
                @click="closeImportModal"
                >Cancel</b-button
              >
            </b-col>
            <b-col cols="6">
              <b-button
                style="width: 100%"
                :disabled="!Boolean(importFile)"
                variant="success"
                @click="importCharacter"
                >Import</b-button
              >
            </b-col>
          </b-row>
        </b-container>
      </b-modal>
    </b-row>
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
          <HitDiceTracker :editing="editing" />
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
          <b-tab title="Feats">
            <b-row
              style="margin-top: 0.5rem"
              v-for="featIndex in feats"
              :key="`feat-${featIndex}`"
            >
              <FeatInfo :featIndex="featIndex" :editing="editing" />
            </b-row>
            <b-row
              v-if="editing"
              style="text-align: center; margin-top: 0.5rem"
            >
              <b-col>
                <span class="clickable" @click="addNewFeat">+ New Feat</span>
              </b-col>
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
          <b-tab title="Notes">
            <b-row>
              <b-col class="playerNotes" v-if="editing">
                <b-form-textarea v-model="playerNotes"></b-form-textarea>
              </b-col>
              <b-col class="playerNotes" v-else>
                <span v-html="formattedPlayerNotes"> </span>
              </b-col>
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
import HitDiceTracker from "@/components/HitDiceTracker.vue";
import CasterInfo from "@/components/CasterInfo.vue";
import SorcererTracker from "@/components/class_features/SorcererTracker.vue";
import PactMagicTracker from "@/components/class_features/PactMagicTracker.vue";
import SpellSlotsTracker from "@/components/class_features/SpellSlotsTracker.vue";
import AttacksInfo from "@/components/user_addons/AttacksInfo.vue";
import SpellsInfo from "@/components/user_addons/SpellsInfo.vue";
import FeatInfo from "@/components/user_addons/FeatInfo.vue";
import FeatureInfo from "@/components/user_addons/FeatureInfo.vue";
import InventoryInfo from "@/components/user_addons/InventoryInfo.vue";
import MoneyInfo from "@/components/MoneyInfo.vue";

import download from "downloadjs";

export default {
  name: "character-sheet",
  components: {
    StatsBar,
    CharacterInfo,
    CombatInfo,
    HitDiceTracker,
    CasterInfo,
    SorcererTracker,
    PactMagicTracker,
    SpellSlotsTracker,
    AttacksInfo,
    SpellsInfo,
    FeatInfo,
    FeatureInfo,
    InventoryInfo,
    MoneyInfo,
  },
  data() {
    return {
      editing: false,
      importFile: undefined,
    };
  },
  methods: {
    addNewFeature() {
      this.$store.dispatch("addNewFeature");
    },
    addNewFeat() {
      this.$store.dispatch("addNewFeat");
    },
    addNewItem() {
      this.$store.dispatch("addNewItem");
    },
    openImportCharacterModal() {
      this.$bvModal.show("importCharacterModal");
    },
    closeImportModal() {
      this.$bvModal.hide("importCharacterModal");
    },
    importCharacter() {
      this.closeImportModal();
      const reader = new FileReader();
      reader.onload = (res) => {
        this.$store.dispatch("importCharacterString", res.target.result);
      };
      reader.onerror = (err) => {
        console.log("Unable to read character info file", err);
      };

      reader.readAsText(this.importFile);
    },
    exportCharacter() {
      const characterString = this.$store.getters.stringifiedCharacter;
      const filename = `${this.$store.state.character_info.name
        .toLowerCase()
        .split(" ")
        .join("_")}_info.json`;

      download(characterString, filename, "text/plain");
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
    featsObject() {
      return this.$store.state.feats;
    },
    feats() {
      return Object.keys(this.featsObject);
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
    playerNotes: {
      get() {
        return this.$store.state.notes;
      },
      set(value) {
        this.$store.dispatch("updateNotes", value);
      },
    },
    formattedPlayerNotes() {
      return "<div>" + this.playerNotes.replaceAll("\n", "<br />") + "</div>";
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

.playerNotes {
  margin-top: 0.5rem;
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem !important;
  background-color: var(--foreground-bg-color);
  text-align: left;
}

.topBarButton {
  padding: 1px 15px !important;
  margin-top: 0.5rem;
}

.topBarButtonCol {
  padding: 0 5px !important;
}
</style>
