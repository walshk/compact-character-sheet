<template>
  <b-col class="inventory-info">
    <b-row class="clickable" @click="showInventory = !showInventory">
      <b-col></b-col>
      <b-col v-if="editing" style="text-align: center">
        <b-input v-model="itemName"></b-input>
      </b-col>
      <b-col cols="auto" v-else style="text-align: center">
        <h5 style="margin-bottom: 0">{{ itemName }}</h5>
      </b-col>
      <b-col style="text-align: right"><b-icon-chevron-down /></b-col>
    </b-row>
    <b-collapse v-model="showInventory">
      <b-row>
        <b-col style="display: flex">
          <b-checkbox
            v-model="itemAttuned"
            style="margin-right: 0.5rem"
          ></b-checkbox>
          Attuned
        </b-col>
      </b-row>
      <b-row style="text-align: left; margin-top: 1rem">
        <b-col v-if="editing">
          <b-form-textarea v-model="itemDescription"></b-form-textarea>
        </b-col>
        <b-col v-else>
          <span>
            {{ itemDescription }}
          </span>
        </b-col>
      </b-row>
      <b-row v-if="editing" style="margin-top: 0.5rem">
        <b-col>
          <b-button @click="deleteItem">Delete</b-button>
        </b-col>
      </b-row>
    </b-collapse>
  </b-col>
</template>

<script>
export default {
  name: "inventory-info",
  components: {},
  props: {
    editing: Boolean,
    index: String,
  },
  data() {
    return {
      showInventory: false,
    };
  },
  methods: {
    deleteItem() {
      this.$store.dispatch("deleteInventory", this.index);
    },
  },
  computed: {
    itemName: {
      get() {
        return this.$store.state.inventory[this.index].name;
      },
      set(value) {
        this.$store.dispatch("updateInventory", {
          index: this.index,
          key: "name",
          value,
        });
      },
    },
    itemDescription: {
      get() {
        return this.$store.state.inventory[this.index].description;
      },
      set(value) {
        this.$store.dispatch("updateInventory", {
          index: this.index,
          key: "description",
          value,
        });
      },
    },
    itemAttuned: {
      get() {
        return this.$store.state.inventory[this.index].attuned;
      },
      set(value) {
        this.$store.dispatch("updateInventory", {
          index: this.index,
          key: "attuned",
          value,
        });
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.inventory-info {
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: var(--foreground-bg-color);
  text-align: center;
}
</style>
