<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" no-gutters>
        <v-row align="center" class="fill-height">
          <v-col>
            <v-card max-width="320" class="ml-auto mr-auto">
              <v-img
                :src="imgUrl"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="300px"
                cover
              >
                <v-card-title class="text-white">Love Face True</v-card-title>
              </v-img>
              <v-card-text v-if="isSignedIn">
                <v-list v-if="user">
                  <v-list-item
                    :prepend-avatar="user.imageUrl"
                    :title="user.fullName"
                    :subtitle="user.email"
                  >
                  </v-list-item>
                </v-list>
              </v-card-text>
              <div v-if="isSignedIn">
                <v-card-actions>
                  <v-btn @click="logout()" color="secondary" block size="large">Logout<v-icon end icon="mdi-logout"></v-icon></v-btn>
                </v-card-actions>
                <v-card-actions>
                  <v-btn @click="goList()" color="primary" block size="large">Go to list<v-icon end icon="mdi-heart"></v-icon></v-btn>
                </v-card-actions>
              </div>
              <div class="text-center" v-if="isSignedIn === null">
                <v-progress-circular
                  indeterminate
                  color="primary"
                  class="mt-5 mb-5"
                ></v-progress-circular>
              </div>
              <v-card-actions v-if="!isSignedIn && isSignedIn !== null">
                <v-btn
                  @click="login()"
                  color="secondary"
                  block
                  size="large"
                  >Login<v-icon end icon="mdi-login"></v-icon></v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "Login",
  data() {
    return {
      imgUrl:
        "https://lh3.googleusercontent.com/pw/AM-JKLV9PwbGFcxkWoCngcdlOGuQA1MzwEln5MjZ-5b-NaXk2io3SYTnyrROdW5UWk4nmETQizsK3cidJGt8GgsDSxwbEHHG9hQJsN1mrDrBvkECDenJ5K8zebvWSZe10cPWmZFXKHzZPMeuJ1R85UxJQK14YQ=w686-h913-no?authuser=0",
    };
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
      this.goList();
    },
    logout() {
      this.$gapi.logout();
    },
    goList() {
      this.$router.push({ name: "list" });
    },
  },
});
</script>
