<template>
  <div class="wrapper">
      <table>
        <th @click="sort('id')">id</th>
        <th @click="sort('firstName')">firstName</th>
        <th @click="sort('lastName')">lastName</th>
        <th @click="sort('email')">email</th>
        <th @click="sort('phone')">phone</th>
        <tr v-for="(person, index) in sortedPersons" :key="index">
          <td>{{ person.id }}</td>
          <td>{{ person.firstName }}</td>
          <td>{{ person.lastName }}</td>
          <td>{{ person.email }}</td>
          <td>{{ person.phone }}</td>
        </tr>
      </table>
      <button @click="onClick">Click</button>
  </div>

</template>

<script>
export default {
  name: 'HomeComponent',
  data() {
    return {
      sortedPersons: [],
      chosenSort: {
        sort: '',
        mode: 'decrement'
      }
    }
  },
  computed: {
    persons() {
        return this.$store.getters.getPersons
    },
  },
  methods: {
    onClick() {
      console.log('js works')
    },
    sort(mode) {
      if (this.chosenSort.sort === mode & this.chosenSort.mode === 'increment') {
          this.chosenSort.mode = 'decrement'
      } else {
          this.chosenSort.mode = 'increment'
      } 
      this.chosenSort.sort = mode
      mode === 'id' ? this.arrIntSort(mode) : this.arrNamesSort(mode)
    },
    arrIntSort(mode) {
      this.sortedPersons = this.persons.sort((a, b) => {
        return this.chosenSort.mode === 'increment' ? a.id - b.id : b.id - a.id
      })
    },
    arrNamesSort(mode) {
      this.sortedPersons = this.persons.sort((a, b) => {
        if (a[mode] === b[mode]) {
          return 0
        }
        switch(this.chosenSort.mode) {
          case 'increment': 
            return a[mode] > b[mode] ? 1 : -1
          break
          case 'decrement': 
            return a[mode] > b[mode] ? -1 : 1
          break
        }
      })
    }
  },
  async created() {
    await this.$store.dispatch('getPersons')
    this.sortedPersons = this.persons
  }
}
</script>

<style lang="scss">
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>