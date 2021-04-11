import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {},
    state: {
      persons: [],
      error: ''
    },
    mutations: {
      setPersons(state, persons) {
        state.persons = persons
      },
      setLoading(state) {
        state.isLoding = !state.isLoading
      },
      setError(state, err) {
        state.error = err
      }
    },
    actions: {
      async getPersons(state, link) {
        try {
          const response = await fetch(link)
          const persons = await response.json()
          state.commit('setPersons', persons)
          state.commit('setError', '')
        }
        catch(err) {
          state.commit('setError', err)
        }
      }
    },
    getters: {
      getPersons: state => state.persons,
      getError: state => state.error
    }
  })