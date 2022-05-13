<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>Love Face True</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-list class="d-none d-sm-block">
        <v-list-item
          :prepend-avatar="user.imageUrl"
          :title="user.fullName"
          :subtitle="user.email"
        >
        </v-list-item>
      </v-list>
      <v-list class="d-sm-none">
        <v-list-item
          :prepend-avatar="user.imageUrl"
        >
        </v-list-item>
      </v-list>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <LayoutSnackbar :message="snackbarMessage"></LayoutSnackbar>
  </v-app>
</template>

<script>
import { defineComponent } from "vue";
import { mapState } from "vuex";
import LayoutSnackbar from "../components/Layout.Snackbar.vue"

export default defineComponent({
  name: "Layout",
  components: { LayoutSnackbar },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      isSignedIn: (state) => state.isSignedIn,
      snackbarMessage: (state) => state.snackbarMessage,
    }),
    user() {
      // (4) Display authenticated user name
      const user = this.$gapi.getUserData();

      if (user) {
        return user;
      }
    },
  },
  methods: {
    async logout() {
      await this.$gapi.logout();
      this.$router.push({ name: "login" });
    },
  },
});
</script>