<template>
  <b-col class="money-info">
    <b-row>
      <b-col>Platinum</b-col>
      <b-col>
        <span v-if="editing">
          <b-input type="number" v-model="pp"></b-input>
        </span>
        <span v-else>
          {{ pp }}
        </span>
      </b-col>
    </b-row>
    <b-row class="moneySection">
      <b-col>Gold</b-col>
      <b-col>
        <span v-if="editing">
          <b-input type="number" v-model="gp"></b-input>
        </span>
        <span v-else>
          {{ gp }}
        </span>
      </b-col>
    </b-row>
    <b-row class="moneySection">
      <b-col>Electrum</b-col>
      <b-col>
        <span v-if="editing">
          <b-input type="number" v-model="ep"></b-input>
        </span>
        <span v-else>
          {{ ep }}
        </span>
      </b-col>
    </b-row>
    <b-row class="moneySection">
      <b-col>Silver</b-col>
      <b-col>
        <span v-if="editing">
          <b-input type="number" v-model="sp"></b-input>
        </span>
        <span v-else>
          {{ sp }}
        </span>
      </b-col>
    </b-row>
    <b-row class="moneySection">
      <b-col>Copper</b-col>
      <b-col>
        <span v-if="editing">
          <b-input type="number" v-model="cp"></b-input>
        </span>
        <span v-else>
          {{ cp }}
        </span>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <span style="font-size: 1rem"> Total Value: {{ totalValue }} gp </span>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
export default {
  name: "money-info",
  components: {},
  props: {
    editing: Boolean,
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    cp: {
      get() {
        return this.$store.state.money.cp;
      },
      set(value) {
        this.$store.dispatch("updateMoney", {
          key: "cp",
          value: Number(value),
        });
      },
    },
    sp: {
      get() {
        return this.$store.state.money.sp;
      },
      set(value) {
        this.$store.dispatch("updateMoney", {
          key: "sp",
          value: Number(value),
        });
      },
    },
    ep: {
      get() {
        return this.$store.state.money.ep;
      },
      set(value) {
        this.$store.dispatch("updateMoney", {
          key: "ep",
          value: Number(value),
        });
      },
    },
    gp: {
      get() {
        return this.$store.state.money.gp;
      },
      set(value) {
        this.$store.dispatch("updateMoney", {
          key: "gp",
          value: Number(value),
        });
      },
    },
    pp: {
      get() {
        return this.$store.state.money.pp;
      },
      set(value) {
        this.$store.dispatch("updateMoney", {
          key: "pp",
          value: Number(value),
        });
      },
    },
    totalValue() {
      const amount =
        10 * parseInt(this.pp) +
        parseInt(this.gp) +
        0.5 * parseInt(this.ep) +
        0.1 * parseInt(this.sp) +
        0.01 * parseInt(this.cp);
      return +parseFloat(amount).toFixed(2);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.money-info {
  margin-top: 0.5rem;
  font-size: 1.25rem;
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: var(--foreground-bg-color);
  text-align: center;
}

.moneySection {
  border-top: 1px solid black;
  margin-top: 0.25rem;
}
</style>
