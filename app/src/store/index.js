/* eslint-disable prettier/prettier */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import { PROFICIENCY } from "@/globals";

let store = new Vuex.Store({
  state: {
    character_info: {
      name: "",
      race: "",
      class: "",
      level: 0,
      prof_bonus: 0,
      languages: "",
      proficiencies: "",
      inspiration: 0,
    },
    hit_dice: {
      type: "",
      used: 0,
      total: 0,
    },
    feats: {
      0: {
        name: "Test Feat",
        description: "Test Feat Description",
      },
    },
    stats: {
      str: {
        score: 0,
        proficiencies: {
          saves: PROFICIENCY.NOT_PROFICIENT,
          athletics: PROFICIENCY.NOT_PROFICIENT,
        },
      },
      dex: {
        score: 0,
        proficiencies: {
          saves: PROFICIENCY.NOT_PROFICIENT,
          acrobatics: PROFICIENCY.NOT_PROFICIENT,
          sleight_of_hand: PROFICIENCY.NOT_PROFICIENT,
          stealth: PROFICIENCY.NOT_PROFICIENT,
        },
      },
      con: {
        score: 0,
        proficiencies: {
          saves: PROFICIENCY.PROFICIENT,
        },
      },
      int: {
        score: 0,
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
        score: 0,
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
        score: 0,
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
      speed: "0ft",
      hp_max: 0,
      hp_current: 0,
      hp_temp: 0,
      death_save_successes: 0,
      death_save_failures: 0,
      attacks: {
        0: {
          name: "Test Attack",
          bonus: 0,
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
      spell_atk: 0,
      spell_save: 0,
      trackers: [],
    },
    class_features: {
      sorcerer: {
        points_used: 0,
        points_total: 0,
        metamagics: "",
      },
      pact_magic: {
        level: 0,
        slots_used: 0,
        slots_total: 0,
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
    inventory: {
      0: {
        name: "Test Item",
        attuned: false,
        description: "Description for Test Item",
      },
    },
    features: {
      0: {
        name: "Test Feature",
        description: "Description for test feature",
        uses: 0,
        limited_use: true,
      },
    },
    money: {
      cp: 0,
      sp: 0,
      ep: 0,
      gp: 0,
      pp: 0,
    },
    notes: "",
  },
  getters: {
    characterStats(state) {
      const prof_bonus = state.character_info.prof_bonus;
      const stats = structuredClone(state.stats);

      const stat_names = Object.keys(stats);
      for (let i = 0; i < stat_names.length; i++) {
        const score = stats[stat_names[i]].score;
        const mod = Math.floor((score - 10) / 2);
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
    abilityModifiers(state) {
      const modifiers = {};

      Object.keys(state.stats).forEach((statKey) => {
        const score = state.stats[statKey].score;
        const mod = Math.floor((score - 10) / 2);
        modifiers[statKey] = mod;
      });

      return modifiers;
    },
    stringifiedCharacter(state) {
      return JSON.stringify(state);
    },
  },
  mutations: {
    initStore(state) {
      let existingStore = localStorage.getItem("characterState");

      if (existingStore) {
        this.replaceState(Object.assign(state, JSON.parse(existingStore)));
        if (state.character_info.name !== "") {
          document.title = state.character_info.name;
        }
      }
    },
    importCharacterString(state, payload) {
      this.replaceState(JSON.parse(payload));
    },
    updateCharacterInfoByKey(state, payload) {
      const { key, value } = payload;
      state.character_info[key] = value;
    },
    updateAbilityScore(state, payload) {
      const { statName, value } = payload;

      state.stats[statName].score = value;
    },
    updateAbilityProficiency(state, payload) {
      const { statName, abilityName, value } = payload;
      state.stats[statName].proficiencies[abilityName] = value;
    },
    updateCombatInfoByKey(state, payload) {
      const { key, newValue } = payload;
      state.combat[key] = newValue;
    },
    updateHitDiceByKey(state, payload) {
      const { key, value } = payload;
      state.hit_dice[key] = value;
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
        prepared: false,
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
        uses: 0,
        limited_use: false,
        description: "",
      });
    },
    deleteFeature(state, index) {
      Vue.delete(state.features, index);
    },
    updateFeat(state, payload) {
      const { index, key, value } = payload;
      state.feats[index][key] = value;
    },
    addNewFeat(state) {
      const existingKeys = Object.keys(state.feats).map(Number);
      let newKey = 0;
      for (let i = 0; i < existingKeys.length; i++) {
        if (existingKeys[i] == newKey) {
          newKey += 1;
        }
      }

      Vue.set(state.feats, newKey, {
        name: "",
        description: "",
      });
    },
    deleteFeat(state, index) {
      Vue.delete(state.feats, index);
    },
    updateInventory(state, payload) {
      const { index, key, value } = payload;
      state.inventory[index][key] = value;
    },
    addNewItem(state) {
      const existingKeys = Object.keys(state.inventory).map(Number);
      let newKey = 0;
      for (let i = 0; i < existingKeys.length; i++) {
        if (existingKeys[i] == newKey) {
          newKey += 1;
        }
      }

      Vue.set(state.inventory, newKey, {
        name: "",
        attuned: false,
        description: "",
      });
    },
    deleteInventory(state, index) {
      Vue.delete(state.inventory, index);
    },
    updateMoney(state, payload) {
      const { key, value } = payload;
      state.money[key] = value;
    },
    updateNotes(state, payload) {
      state.notes = payload;
    },
  },
  actions: {
    initStore(context) {
      context.commit("initStore");
    },
    importCharacterString(context, payload) {
      context.commit("importCharacterString", payload);
    },
    updateAbilityScore(context, payload) {
      context.commit("updateAbilityScore", payload);
    },
    updateAbilityProficiency(context, payload) {
      context.commit("updateAbilityProficiency", payload);
    },
    updateCharacterInfoByKey(context, payload) {
      context.commit("updateCharacterInfoByKey", payload);
    },
    updateCombatInfoByKey(context, payload) {
      context.commit("updateCombatInfoByKey", payload);
    },
    updateHitDiceByKey(context, payload) {
      context.commit("updateHitDiceByKey", payload);
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
    updateFeat(context, payload) {
      context.commit("updateFeat", payload);
    },
    addNewFeat(context) {
      context.commit("addNewFeat");
    },
    deleteFeat(context, index) {
      context.commit("deleteFeat", index);
    },
    updateInventory(context, payload) {
      context.commit("updateInventory", payload);
    },
    addNewItem(context) {
      context.commit("addNewItem");
    },
    deleteInventory(context, index) {
      context.commit("deleteInventory", index);
    },
    updateMoney(context, payload) {
      context.commit("updateMoney", payload);
    },
    updateNotes(context, payload) {
      context.commit("updateNotes", payload);
    },
  },
  modules: {},
});

store.subscribe((mutation, state) => {
  localStorage.setItem("characterState", JSON.stringify(state));
  if (mutation === "updateCharacterInfoByKey") {
    if (state.character_info.name !== "") {
      document.title = state.character_info.name;
    }
  }
});

export default store;
