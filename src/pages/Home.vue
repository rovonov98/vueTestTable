<template>
  <div class="wrapper">
    <div class="choose-buttons wrapper" v-if="this.$store.getters.getPersons.length <= 0">
      <button class="button" @click="loadArr(shortArr)">Короткий список</button>
      <button class="button" @click="loadArr(longArr)">Длинный список</button>
    </div>
    <div v-if="isLoading">
      Loading...
    </div>
    <div  v-if="this.$store.getters.getPersons.length > 0" class="wrapper table-section__wrapper">
      <Table :isLoaded="isLoaded"/>
    </div>
  </div>

</template>

<script>
import Table from './../components/Table.vue'

export default {
  name: 'HomeComponent',
  components: {
    Table
  },
  data() {
    return {
      longArr: 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
      shortArr: 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
      isLoading: false,
      isLoaded: false,

    }
  },
  methods: {
    async loadArr(link) {
      this.isLoading = !this.isLoading
      await this.$store.dispatch('getPersons', link)
      this.isLoading = !this.isLoading
      this.isLoaded = true
    },
  }
}
</script>

<style lang="scss">
.table-section__wrapper {
  min-width: 60%;
  @media(max-width: 586px) {
    min-width: 80%;
  }
}
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.choose-buttons {
  flex-direction: row;
  button {
    margin: 1rem;
  }
}
.button {
  padding: .5rem 1rem;
  background: rgba(30, 139, 195, 1);
  border-radius: 8px;
  color: white;
}
.button_disabled {
  background: $transparent-grey;
  color: #000;
}
</style>