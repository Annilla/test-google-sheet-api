import { createStore } from 'vuex'

export default createStore({
  state: {
    isSignedIn: null, // Track authenticated state
    sheetData: [],
    searchKeywords: null,
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
    // Update sheetData
    updateSheetData(state, newSheetData) {
      state.sheetData = newSheetData;
    },
    // Update searchKeywords
    updateSearchKeywords(state, newSearchKeywords) {
      state.searchKeywords = newSearchKeywords;
    },
    // Update snackbarMessage
    updateSnackbarMessage(state, newSnackbarMessage) {
      state.snackbarMessage = newSnackbarMessage;
    },
  },
  actions: {
  },
})
