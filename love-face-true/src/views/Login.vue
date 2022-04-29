<template>
  <v-app>
    <v-main>
      <div v-if="isSignedIn">
        <v-list>
          <v-list-item
            :prepend-avatar="user.imageUrl"
            :title="user.fullName"
            :subtitle="user.email"
          >
          </v-list-item>
        </v-list>
        <v-btn @click="logout()">Logout</v-btn>
      </div>
      <v-btn
        :disabled="isSignedIn === null"
        @click="login()"
        v-if="!isSignedIn"
      >
        Login
      </v-btn>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "Login",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      isSignedIn: (state) => state.isSignedIn,
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
    // (3) Expose $gapi methods
    async login() {
      await this.$gapi.login();
      this.$router.push({ name: "list" });
    },
    logout() {
      this.$gapi.logout();
    },
  },
});
</script>
