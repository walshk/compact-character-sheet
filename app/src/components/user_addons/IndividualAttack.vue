<template>
  <b-row class="individual-attack">
    <b-col v-if="editing">
      <b-input v-model="atkName"></b-input>
    </b-col>
    <b-col v-else>
      {{ atkName }}
    </b-col>
    <b-col v-if="editing">
      <b-input type="number" v-model="atkBonus"></b-input>
    </b-col>
    <b-col v-else> {{ atkBonus >= 0 ? "+" : "" }}{{ atkBonus }} </b-col>
    <b-col v-if="editing">
      <b-input v-model="atkDamage"></b-input>
    </b-col>
    <b-col v-else>
      {{ atkDamage }}
    </b-col>
    <b-col v-if="editing">
      <span class="clickable" @click="deleteAttack(index)"
        ><b-icon-backspace
      /></span>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "individual-attack",
  components: {},
  props: {
    index: String,
    editing: Boolean,
  },
  data() {
    return {};
  },
  methods: {
    addNewAttack() {
      this.$store.dispatch("addNewAttack");
    },
    deleteAttack(index) {
      this.$store.dispatch("deleteAttack", index);
    },
  },
  computed: {
    atkName: {
      get() {
        return this.$store.state.combat.attacks[this.index].name;
      },
      set(value) {
        this.$store.dispatch("updateAttack", {
          index: this.index,
          key: "name",
          value,
        });
      },
    },
    atkBonus: {
      get() {
        return this.$store.state.combat.attacks[this.index].bonus;
      },
      set(value) {
        this.$store.dispatch("updateAttack", {
          index: this.index,
          key: "bonus",
          value,
        });
      },
    },
    atkDamage: {
      get() {
        return this.$store.state.combat.attacks[this.index].damage;
      },
      set(value) {
        this.$store.dispatch("updateAttack", {
          index: this.index,
          key: "damage",
          value,
        });
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.individual-attack {
  border-top: 1px solid black;
  margin: 0.25rem 0;
  padding: 0.25rem 0;
}
</style>
