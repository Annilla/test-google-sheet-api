import { createStore } from 'vuex'

export default createStore({
  state: {
    isSignedIn: null, // (1) Track authenticated state
  },
  getters: {
  },
  mutations: {
    // 更新 isSignedIn
    updateIsSignedIn(state, newIsSignedIn) {
      state.isSignedIn = newIsSignedIn;
    },
  },
  actions: {
  },
})
