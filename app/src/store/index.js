/* eslint-disable prettier/prettier */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import { PROFICIENCY } from "@/globals";

let store = new Vuex.Store({
  state: {
    character_info: {
      name: "Ensis Caelum",
      race: "Scourge Aasimar",
      class: "Sorcerer/Warlock",
      level: 6,
      prof_bonus: 3,
      languages: "Common, Celestial",
      proficiencies: "",
      inspiration: 1,
    },
    stats: {
      str: {
        modifier: 0,
        proficiencies: {
          saves: PROFICIENCY.NOT_PROFICIENT,
          athletics: PROFICIENCY.NOT_PROFICIENT,
        },
      },
      dex: {
        modifier: 2,
        proficiencies: {
          saves: PROFICIENCY.NOT_PROFICIENT,
          acrobatics: PROFICIENCY.NOT_PROFICIENT,
          sleight_of_hand: PROFICIENCY.NOT_PROFICIENT,
          stealth: PROFICIENCY.NOT_PROFICIENT,
        },
      },
      con: {
        modifier: 4,
        proficiencies: {
          saves: PROFICIENCY.PROFICIENT,
        },
      },
      int: {
        modifier: 1,
        proficiencies: {
          saves: PROFICIENCY.NOT_PROFICIENT,
          arcana: PROFICIENCY.PROFICIENT,
          history: PROFICIENCY.NOT_PROFICIENT,
          investigation: PROFICIENCY.NOT_PROFICIENT,
          nature: PROFICIENCY.NOT_PROFICIENT,
          religion: PROFICIENCY.NOT_PROFICIENT,
        },
      },
      wis: {
        modifier: 0,
        proficiencies: {
          saves: PROFICIENCY.NOT_PROFICIENT,
          animal_handling: PROFICIENCY.NOT_PROFICIENT,
          insight: PROFICIENCY.PROFICIENT,
          medicine: PROFICIENCY.NOT_PROFICIENT,
          perception: PROFICIENCY.NOT_PROFICIENT,
          survival: PROFICIENCY.NOT_PROFICIENT,
        },
      },
      cha: {
        modifier: 5,
        proficiencies: {
          saves: PROFICIENCY.PROFICIENT,
          deception: PROFICIENCY.NOT_PROFICIENT,
          intimidation: PROFICIENCY.PROFICIENT,
          performance: PROFICIENCY.NOT_PROFICIENT,
          persuasion: PROFICIENCY.PROFICIENT,
        },
      },
    },
    combat: {
      armor_class: 19,
      speed: "30ft",
      hp_max: 59,
      hp_current: 55,
      hp_temp: 12,
      death_save_successes: 0,
      death_save_failures: 0,
      attacks: {
        0: {
          name: "Test Attack",
          bonus: 9,
          damage: "1d10+5 force",
        },
      },
      spells: {
        0: {
          level: "1",
          name: "Test Spell",
          prepared: true,
        },
      },
    },
    caster: {
      spell_atk: 8,
      spell_save: 16,
      trackers: [],
    },
    class_features: {
      sorcerer: {
        points_used: 2,
        points_total: 6,
        metamagics: "Quicken, Twinned, Subtle",
      },
      pact_magic: {
        level: 3,
        slots_used: 0,
        slots_total: 2,
      },
      spell_slots: {
        "1st": {
          0: false,
          1: false,
          2: false,
          3: false,
        },
        "2nd": {
          0: false,
          1: false,
          2: false,
        },
        "3rd": {
          0: false,
          1: false,
          2: false,
        },
        "4th": {
          0: false,
          1: false,
          2: false,
        },
        "5th": {
          0: false,
          1: false,
          2: false,
        },
        "6th": {
          0: false,
          1: false,
        },
        "7th": {
          0: false,
          1: false,
        },
        "8th": {
          0: false,
        },
        "9th": {
          0: false,
        },
      },
    },
    inventory: [
      {
        name: "Test Item",
        isMagic: false,
        isAttuned: false,
        description: "Description for Test Item",
      },
    ],
    features: {
      0: {
        name: "Test Feature",
        description: "Description for test feature",
        consumed: false,
      },
    },
    money: {
      cp: 0,
      ep: 0,
      gp: 0,
      pp: 0,
    },
  },
  getters: {
    characterStats(state) {
      const prof_bonus = state.character_info.prof_bonus;
      const stats = structuredClone(state.stats);

      const stat_names = Object.keys(stats);
      for (let i = 0; i < stat_names.length; i++) {
        const mod = stats[stat_names[i]].modifier;
        Object.keys(stats[stat_names[i]].proficiencies).forEach((key) => {
          switch (stats[stat_names[i]].proficiencies[key]) {
            case PROFICIENCY.PROFICIENT:
              stats[stat_names[i]].proficiencies[key] = mod + prof_bonus;
              break;
            case PROFICIENCY.EXPERTISE:
              stats[stat_names[i]].proficiencies[key] = prof_bonus * 2 + mod;
              break;
            default:
              stats[stat_names[i]].proficiencies[key] = mod;
              break;
          }
        });
      }

      return stats;
    },
  },
  mutations: {
    initStore(state) {
      let existingStore = localStorage.getItem("characterState");

      if (existingStore) {
        this.replaceState(Object.assign(state, JSON.parse(existingStore)));
      }
    },
    updateStatModifier(state, payload) {
      const { statName, value } = payload;

      state.stats[statName].modifier = value;
    },
    updateAbilityProficiency(state, payload) {
      const { statName, abilityName, value } = payload;
      state.stats[statName].proficiencies[abilityName] = value;
    },
    updateCombatInfoByKey(state, payload) {
      const { key, newValue } = payload;
      state.combat[key] = newValue;
    },
    toggleSpellSlot(state, payload) {
      const { level, slot } = payload;
      state.class_features.spell_slots[level][slot] =
        !state.class_features.spell_slots[level][slot];
    },
    updateClassFeatureValue(state, payload) {
      const { feature, key, value } = payload;
      state.class_features[feature][key] = value;
    },
    updateCasterInfoByKey(state, payload) {
      const { key, value } = payload;
      state.caster[key] = value;
    },
    updateAttack(state, payload) {
      const { index, key, value } = payload;
      state.combat.attacks[index][key] = value;
    },
    addNewAttack(state) {
      const existingKeys = Object.keys(state.combat.attacks).map(Number);
      let newKey = 0;
      for (let i = 0; i < existingKeys.length; i++) {
        if (existingKeys[i] == newKey) {
          newKey += 1;
        }
      }

      Vue.set(state.combat.attacks, newKey, {
        name: "",
        bonus: 0,
        damage: "",
      });
    },
    deleteAttack(state, index) {
      Vue.delete(state.combat.attacks, index);
    },
    updateSpell(state, payload) {
      const { index, key, value } = payload;
      state.combat.spells[index][key] = value;
    },
    addNewSpell(state) {
      const existingKeys = Object.keys(state.combat.spells).map(Number);
      let newKey = 0;
      for (let i = 0; i < existingKeys.length; i++) {
        if (existingKeys[i] == newKey) {
          newKey += 1;
        }
      }

      Vue.set(state.combat.spells, newKey, {
        level: 0,
        name: "",
        ritual: "no",
      });
    },
    deleteSpell(state, index) {
      Vue.delete(state.combat.spells, index);
    },
    updateFeature(state, payload) {
      const { index, key, value } = payload;
      state.features[index][key] = value;
    },
    addNewFeature(state) {
      const existingKeys = Object.keys(state.features).map(Number);
      let newKey = 0;
      for (let i = 0; i < existingKeys.length; i++) {
        if (existingKeys[i] == newKey) {
          newKey += 1;
        }
      }

      Vue.set(state.features, newKey, {
        name: "",
        consumed: false,
        description: "",
      });
    },
    deleteFeature(state, index) {
      Vue.delete(state.features, index);
    },
  },
  actions: {
    initStore(context) {
      context.commit("initStore");
    },
    updateStatModifier(context, payload) {
      context.commit("updateStatModifier", payload);
    },
    updateAbilityProficiency(context, payload) {
      context.commit("updateAbilityProficiency", payload);
    },
    updateCombatInfoByKey(context, payload) {
      context.commit("updateCombatInfoByKey", payload);
    },
    toggleSpellSlot(context, payload) {
      context.commit("toggleSpellSlot", payload);
    },
    updateClassFeatureValue(context, payload) {
      context.commit("updateClassFeatureValue", payload);
    },
    updateCasterInfoByKey(context, payload) {
      context.commit("updateCasterInfoByKey", payload);
    },
    updateAttack(context, payload) {
      context.commit("updateAttack", payload);
    },
    addNewAttack(context) {
      context.commit("addNewAttack");
    },
    deleteAttack(context, index) {
      context.commit("deleteAttack", index);
    },
    updateSpell(context, payload) {
      context.commit("updateSpell", payload);
    },
    addNewSpell(context) {
      context.commit("addNewSpell");
    },
    deleteSpell(context, index) {
      context.commit("deleteSpell", index);
    },
    updateFeature(context, payload) {
      context.commit("updateFeature", payload);
    },
    addNewFeature(context) {
      context.commit("addNewFeature");
    },
    deleteFeature(context, index) {
      context.commit("deleteFeature", index);
    },
  },
  modules: {},
});

store.subscribe((mutation, state) => {
  localStorage.setItem("characterState", JSON.stringify(state));
});

export default store;
