<template>
  <b-col class="attacks-info">
    <b-row class="clickable" @click="showAttacks = !showAttacks">
      <b-col></b-col>
      <b-col style="text-align: center">
        <h5 style="margin-bottom: 0">Attacks</h5>
      </b-col>
      <b-col style="text-align: right"><b-icon-chevron-down /></b-col>
    </b-row>
    <b-collapse v-model="showAttacks">
      <b-row>
        <b-col>
          <span>Name</span>
        </b-col>
        <b-col>
          <span>Attack Bonus</span>
        </b-col>
        <b-col>
          <span>Damage</span>
        </b-col>
        <b-col v-if="editing">
          <span>Delete</span>
        </b-col>
      </b-row>
      <IndividualAttack
        v-for="attackIndex in attacks"
        :key="`attack-${attackIndex}`"
        :editing="editing"
        :index="attackIndex"
      />
      <b-row v-if="editing">
        <b-col>
          <span @click="addNewAttack" class="clickable">+ New Attack</span>
        </b-col>
      </b-row>
    </b-collapse>
  </b-col>
</template>

<script>
import IndividualAttack from "@/components/user_addons/IndividualAttack.vue";

export default {
  name: "attacks-info",
  components: {
    IndividualAttack,
  },
  props: {
    editing: Boolean,
  },
  data() {
    return {
      showAttacks: false,
    };
  },
  methods: {
    updateAttack(index, key, value) {
      this.$store.dispatch("updateAttack", {
        index,
        key,
        value,
      });
    },
    addNewAttack() {
      this.$store.dispatch("addNewAttack");
    },
    deleteAttack(index) {
      this.$store.dispatch("deleteAttack", index);
    },
  },
  computed: {
    attacksObject() {
      return this.$store.state.combat.attacks;
    },
    attacks() {
      return Object.keys(this.attacksObject);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.attacks-info {
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: var(--foreground-bg-color);
  text-align: center;
}
</style>
