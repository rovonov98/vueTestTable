import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {},
    state: {
      persons: [],
    },
    mutations: {
      setPersons(state, persons) {
        state.persons = persons
      },
      setLoading(state) {
        state.isLoding = !state.isLoading
      }
    },
    actions: {
      async getPersons(state, link) {
        try {
          const response = await fetch(link)
          const persons = await response.json()
          state.commit('setPersons', persons)
        }
        catch(err) {
          console.log(err)
        }
      }
    },
    getters: {
      getPersons: state => state.persons,
    }
  })