<template>
  <div>
    <div class="person__wrapper">
        <NewPersonForm @addNewPerson="addNewPerson"/>
    </div>
    <div>
      <input type="text" v-model="currentSearch">
      <button @click="search">Найти</button>
    </div>
    <table class="table">
      <th @click="sort('id')" class="table__heading">id <span class="arrow"></span></th>
      <th @click="sort('firstName')" class="table__heading">firstName <span class="arrow"></span></th>
      <th @click="sort('lastName')" class="table__heading">lastName <span class="arrow"></span></th>
      <th @click="sort('email')" class="table__heading">email <span class="arrow"></span></th>
      <th @click="sort('phone')" class="table__heading">phone <span class="arrow"></span></th>
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
    <div class="choose-buttons wrapper">
      <button class="button" @click="changePage('-')">Назад</button>
      <div>{{ this.page + 1 }}</div>
      <button class="button" @click="changePage('+')">Вперёд</button>
    </div>
    <div class="person__wrapper">
      <Person v-if="chosenRow.id" :person="chosenRow" />
    </div>
  </div>
</template>

<script>
import Person from './Person.vue'
import NewPersonForm from './NewPersonForm.vue'

export default {
  components: {
    Person,
    NewPersonForm
  },
  props: [
    'isLoaded'
  ],
  data() {
    return {
      longArr: 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
      shortArr: 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
      sortedPersons: [],
      chosenRow: {},
      chosenSort: {
        sort: '',
        mode: 'decrement'
      },
      searchData: '',
      currentSearch: '',
      pageSize: 50,
      page: 0,
    }
  },
  computed: {
    persons() {
      const persons = []
      for (let i = 0; i < Math.ceil(this.$store.getters.getPersons.length/this.pageSize); i++) {
        persons[i] = this.$store.getters.getPersons.slice((i*this.pageSize), (i*this.pageSize) + this.pageSize);
      }
      return persons
    }
  },
  watch: {
    isLoaded() {
      this.sortedPersons = this.persons[this.page]
    }
  },
  methods: {
    addNewPerson(data) {
      this.sortedPersons.unshift(data)
    },
    check() {
      console.log(this.persons)
    },
    changePage(mode) {
      switch(mode) {
        case '+': 
          if (this.page < this.persons.length - 1) {
            this.page++
            this.sortedPersons = this.persons[this.page]
          } else console.log('the end of the array')
        break
        case '-':
          if (mode === '-' & this.page >= 1) {
            this.page--
            this.sortedPersons = this.persons[this.page]
          } else console.log('the start of the array')
        break
      }
    },
    search() {
      this.searchData = this.currentSearch
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
      const arr = this.sortedPersons
      this.sortedPersons = arr.sort((a, b) => {
        return this.chosenSort.mode === 'increment' ? a.id - b.id : b.id - a.id
      })
    },
    arrNamesSort(mode) {
      const arr = this.sortedPersons
      this.sortedPersons = arr.sort((a, b) => {
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
  }
}
</script>

<style lang="scss">
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
  min-width: 60%;
  @media(max-width: 568px) {
    min-width: 80%;
  }
}
.arrow {
  font-weight: 1000;
}
</style>