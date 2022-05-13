import { createStore } from 'vuex'

export default createStore({
  state: {
    isSignedIn: null, // (1) Track authenticated state
    snackbarMessage: {
      text: '',
    },
  },
  getters: {
  },
  mutations: {
    // Update isSignedIn
    updateIsSignedIn(state, newIsSignedIn) {
      state.isSignedIn = newIsSignedIn;
    },
    // Update snackbarMessage
    updateSnackbarMessage(state, newSnackbarMessage) {
      state.snackbarMessage = newSnackbarMessage;
    },
  },
  actions: {
  },
})
