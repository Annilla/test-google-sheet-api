<template>
  <router-view/>
</template>

<script>

export default {
  name: 'App',
  created() {
    // (2) Subscribe to authentication status changes
    this.$gapi.listenUserSignIn((isSignedIn) => {
      this.$store.commit('updateIsSignedIn', isSignedIn);
    });
  },
}
</script>
