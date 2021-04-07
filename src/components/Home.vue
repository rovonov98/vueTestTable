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
        mode: 'down'
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
      this.chosenSort.sort = mode
      if (this.chosenSort.sort === mode & this.chosenSort.mode === 'up') {
          this.chosenSort.mode = 'down'
      } else {
          this.chosenSort.mode = 'up'
      } 
      mode === 'id' ? this.arrIntSort() : this.arrNamesSort(mode)
    },
    arrIntSort() {
      this.sortedPersons = this.persons.sort((a, b) => {
        return this.chosenSort.mode === 'down' ? a.id - b.id : b.id - a.id
      })
    },
    arrNamesSort(mode) {
      this.sortedPersons = this.persons.sort((a, b) => {
        if (a[mode] === b[mode]) {
          return 0
        }
        switch(this.chosenSort.mode) {
          case 'down': 
            return a[mode] > b[mode] ? 1 : -1
          break
          case 'up': 
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