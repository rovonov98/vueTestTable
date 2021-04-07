import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {},
    state: {
      persons: []
    },
    mutations: {
      setPersons(state, persons) {
        state.persons = persons
      }
    },
    actions: {
      async getPersons(state) {
        const jsonPersons = await fetch('http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}')
        const persons = await jsonPersons.json()
        state.commit('setPersons', persons)
        console.log('works')
      }
    },
    getters: {
      getPersons: state => state.persons
    }
  })