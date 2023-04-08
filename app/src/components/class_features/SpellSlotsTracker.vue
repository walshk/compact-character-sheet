<template>
  <b-col class="spell-slots-tracker">
    <b-row class="clickable" @click="showSpellSlots = !showSpellSlots">
      <b-col></b-col>
      <b-col style="text-align: center">
        <h5 style="margin-bottom: 0">Spell Slots</h5>
      </b-col>
      <b-col style="text-align: right"><b-icon-chevron-down /></b-col>
    </b-row>
    <b-collapse v-model="showSpellSlots">
      <b-row>
        <b-col v-for="level in slotLevels" :key="`slot-${level}`">
          <b-row>
            <b-col>
              <span>{{ level }}</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group stacked>
                <b-form-checkbox
                  v-for="slot in getSlotsForLevel(level)"
                  :key="level + slot + 'slot'"
                  :checked="slotData[level][slot]"
                  @change="toggleSpellSlot(level, slot)"
                >
                </b-form-checkbox>
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-collapse>
  </b-col>
</template>

<script>
export default {
  name: "spell-slots-tracker",
  components: {},
  props: {
    editing: Boolean,
  },
  data() {
    return {
      showSpellSlots: false,
    };
  },
  methods: {
    getSlotsForLevel(level) {
      return Object.keys(this.slotData[level]);
    },
    toggleSpellSlot(level, slot) {
      this.$store.dispatch("toggleSpellSlot", {
        level,
        slot,
      });
    },
  },
  computed: {
    slotData() {
      return this.$store.state.class_features.spell_slots;
    },
    slotLevels() {
      return Object.keys(this.slotData);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.spell-slots-tracker {
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: var(--foreground-bg-color);
  text-align: center;
}
</style>
