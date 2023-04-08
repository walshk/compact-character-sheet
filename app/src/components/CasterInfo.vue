<template>
  <b-col class="caster-info">
    <b-row class="clickable" @click="showCasterInfo = !showCasterInfo">
      <b-col></b-col>
      <b-col style="text-align: center">
        <h5 style="margin-bottom: 0">Spellcaster</h5>
      </b-col>
      <b-col style="text-align: right"><b-icon-chevron-down /></b-col>
    </b-row>
    <b-collapse v-model="showCasterInfo" id="casterInfoCollapse">
      <b-row>
        <b-col>
          <b-row>
            <b-col><h5>Spell Attack Bonus</h5></b-col>
          </b-row>
          <b-row>
            <b-col v-if="editing">
              <b-input type="number" v-model="spellAtk"></b-input>
            </b-col>
            <b-col v-else class="largeText">+{{ spellAtk }}</b-col>
          </b-row>
        </b-col>
        <b-col>
          <b-row>
            <b-col><h5>Spell Save DC</h5></b-col>
          </b-row>
          <b-row>
            <b-col v-if="editing">
              <b-input type="number" v-model="spellSave"></b-input>
            </b-col>
            <b-col v-else class="largeText">{{ spellSave }}</b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-collapse>
  </b-col>
</template>

<script>
export default {
  name: "caster-info",
  components: {},
  props: {
    editing: Boolean,
  },
  data() {
    return {
      showCasterInfo: true,
    };
  },
  computed: {
    spellAtk: {
      get() {
        return this.$store.state.caster.spell_atk;
      },
      set(value) {
        this.$store.dispatch("updateCasterInfoByKey", {
          key: "spell_atk",
          value,
        });
      },
    },
    spellSave: {
      get() {
        return this.$store.state.caster.spell_save;
      },
      set(value) {
        this.$store.dispatch("updateCasterInfoByKey", {
          key: "spell_save",
          value,
        });
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.caster-info {
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: var(--foreground-bg-color);
  text-align: center;
}
</style>
