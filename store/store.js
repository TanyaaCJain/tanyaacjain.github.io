import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// eslint-disable-next-line no-new
new Vuex.Store({
  modules: {
    about: {
      namespaced: true,
      state: () => ({
        about: []
      })
    },
    honors: {
      namespaced: true,
      state: () => ({
        honors: []
      })
    },
    links: {
      namespaced: true,
      state: () => ({
        links: []
      })
    },
    press: {
      namespaced: true,
      state: () => ({
        press: []
      })
    },
    social: {
      namespaced: true,
      state: () => ({
        social: []
      })
    }
  }
})
