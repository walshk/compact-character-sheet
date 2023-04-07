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
      initiative: 0,
      armor_class: 0,
      speed: "",
      hp_max: 0,
      hp_current: 0,
      hp_temp: 0,
      spell_atk: 0,
      spell_save: 0,
      death_save_successes: 0,
      death_save_failures: 0,
    },
    inventory: [
      {
        name: "Test Item",
        isMagic: false,
        description: "Description for Test Item",
      },
    ],
    features: [
      {
        name: "Test Feature",
        consumed: false,
      },
    ],
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
  },
  modules: {},
});

store.subscribe((mutation, state) => {
  localStorage.setItem("characterState", JSON.stringify(state));
});

export default store;
