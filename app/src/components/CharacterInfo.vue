<template>
  <b-container fluid class="character-info">
    <b-row>
      <b-col class="highlight-info elevated">
        <h5>Name</h5>
        <div v-if="editing" style="margin-bottom: 0.5rem">
          <b-form-input v-model="charName"></b-form-input>
        </div>
        <div v-else>
          <h5>{{ charName }}</h5>
        </div>
      </b-col>
      <b-col class="highlight-info elevated">
        <h5>Class</h5>
        <div v-if="editing" style="margin-bottom: 0.5rem">
          <b-form-input v-model="charClass"></b-form-input>
        </div>
        <div v-else>
          <h5>{{ charClass }}</h5>
        </div>
      </b-col>
      <b-col class="highlight-info elevated">
        <h5>Level</h5>
        <div v-if="editing" style="margin-bottom: 0.5rem">
          <b-form-input
            v-model="charLevel"
            type="number"
            min="0"
          ></b-form-input>
        </div>
        <div v-else>
          <h5>{{ charLevel }}</h5>
        </div>
      </b-col>
      <b-col class="highlight-info elevated">
        <h5>Proficiency Bonus</h5>
        <div v-if="editing" style="margin-bottom: 0.5rem">
          <b-form-input
            v-model="charProfBonus"
            type="number"
            min="0"
          ></b-form-input>
        </div>
        <div v-else>
          <h5>+{{ charProfBonus }}</h5>
        </div>
      </b-col>
      <b-col class="highlight-info elevated">
        <h5>Inspiration</h5>
        <div v-if="editing" style="margin-bottom: 0.5rem">
          <b-form-input
            v-model="charInspiration"
            type="number"
            min="0"
          ></b-form-input>
        </div>
        <div v-else>
          <h5>{{ charInspiration }}</h5>
        </div>
      </b-col>
      <b-col class="highlight-info elevated">
        <h5>Passive Perception</h5>
        <div>
          <h5>{{ passivePerception }}</h5>
        </div>
      </b-col>
      <b-col class="highlight-info elevated">
        <h5>Proficiencies</h5>
        <div v-if="editing" style="margin-bottom: 0.5rem">
          <b-form-input v-model="charProficiencies"></b-form-input>
        </div>
        <div v-else style="margin-bottom: 0.5rem">
          <span class="smallText">{{ charProficiencies }}</span>
        </div>
      </b-col>
      <b-col class="highlight-info elevated">
        <h5>Languages</h5>
        <div v-if="editing" style="margin-bottom: 0.5rem">
          <b-form-input v-model="charLanguages"></b-form-input>
        </div>
        <div v-else style="margin-bottom: 0.5rem">
          <span class="smallText">{{ charLanguages }}</span>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { PROFICIENCY } from "@/globals";

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
    charName: {
      get() {
        return this.charInfo.name;
      },
      set(value) {
        this.$store.dispatch("updateCharacterInfoByKey", {
          key: "name",
          value,
        });
      },
    },
    charClass: {
      get() {
        return this.charInfo.class;
      },
      set(value) {
        this.$store.dispatch("updateCharacterInfoByKey", {
          key: "class",
          value,
        });
      },
    },
    charLevel: {
      get() {
        return this.charInfo.level;
      },
      set(value) {
        this.$store.dispatch("updateCharacterInfoByKey", {
          key: "level",
          value,
        });
      },
    },
    charProfBonus: {
      get() {
        return this.charInfo.prof_bonus;
      },
      set(value) {
        this.$store.dispatch("updateCharacterInfoByKey", {
          key: "prof_bonus",
          value,
        });
      },
    },
    charInspiration: {
      get() {
        return this.charInfo.inspiration;
      },
      set(value) {
        this.$store.dispatch("updateCharacterInfoByKey", {
          key: "inspiration",
          value,
        });
      },
    },
    charLanguages: {
      get() {
        return this.charInfo.languages;
      },
      set(value) {
        this.$store.dispatch("updateCharacterInfoByKey", {
          key: "languages",
          value,
        });
      },
    },
    charProficiencies: {
      get() {
        return this.charInfo.proficiencies;
      },
      set(value) {
        this.$store.dispatch("updateCharacterInfoByKey", {
          key: "proficiencies",
          value,
        });
      },
    },
    passivePerception() {
      const wisdomMod = this.$store.state.stats.wis.modifier;
      const proficiency = this.$store.state.stats.wis.proficiencies.perception;
      const profBonus = this.charProfBonus;

      switch (proficiency) {
        case PROFICIENCY.PROFICIENT:
          return 10 + wisdomMod + profBonus;
        case PROFICIENCY.EXPERTISE:
          return 10 + wisdomMod + 2 * profBonus;
        default:
          return 10 + wisdomMod;
      }
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
  background-color: var(--foreground-bg-color);
  margin: 0.5rem 1rem;
  padding-top: 0.5rem;
  border: var(--default-border);
  border-radius: 1rem;
}

.smallText {
  font-size: 0.85rem;
}
</style>
