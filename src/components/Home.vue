<template>
  <section class="wrapper">
    <div>
      <input type="text" v-model="searchData">
      <button @click="search">Найти</button>
    </div>
    <table class="table">
      <th @click="sort('id')" class="table__heading">id</th>
      <th @click="sort('firstName')" class="table__heading">firstName</th>
      <th @click="sort('lastName')" class="table__heading">lastName</th>
      <th @click="sort('email')" class="table__heading">email</th>
      <th @click="sort('phone')" class="table__heading">phone</th>
      <tr
        v-show="searchCheck(index)" 
        v-for="(person, index) in sortedPersons" 
        :key="index"
        @click="chooseRows(index)"
        class="table__row"
      >
        <td class="table__domain">{{ person.id }}</td>
        <td class="table__domain">{{ person.firstName }}</td>
        <td class="table__domain">{{ person.lastName }}</td>
        <td class="table__domain">{{ person.email }}</td>
        <td class="table__domain">{{ person.phone }}</td>
      </tr>
    </table>
    <div class="person__wrapper">
      <Person v-if="chosenRow.id" :person="chosenRow" />
    </div>
  </section>

</template>

<script>
import Person from './Person.vue'

export default {
  name: 'HomeComponent',
  components: {
    Person
  },
  data() {
    return {
      sortedPersons: [],
      chosenRow: {},
      chosenSort: {
        sort: '',
        mode: 'decrement'
      },
      searchData: ''
    }
  },
  computed: {
    persons() {
        return this.$store.getters.getPersons
    },
  },
  methods: {
    search() {
      console.log(this.sortedPersons[0].keys)
    },
    searchCheck(index) {
      let arr = [
        this.sortedPersons[index].id.toString(), 
        this.sortedPersons[index].firstName, 
        this.sortedPersons[index].lastName, 
        this.sortedPersons[index].email, 
        this.sortedPersons[index].phone
      ]
      return arr.some((prop) => prop.includes(this.searchData))
    },
    chooseRows(index) {
      this.chosenRow = this.sortedPersons[index]
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
.table {
  border-collapse: collapse;
  border: 3px solid purple;
}
.table__row {
  border-bottom: 1px solid #000;
  cursor: pointer;
}
.table__domain {
  padding: .2rem;
}
.table__heading {
  border: 3px solid #000;
  padding: .3rem;
  text-align: left;
  cursor: pointer;
}
.person__wrapper {
  margin: 1rem;
  @media(max-width: 568px) {
    min-width: 80%;
  }
}
</style>