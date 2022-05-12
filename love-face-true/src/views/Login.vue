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
        "https://lh3.googleusercontent.com/fife/AAWUweUKMJshoIQZA8NlvIH16vQyfSYgSbQB2IoJJYa5IKUzUeB05H5YrMOiMUTIygGXlJHd0Qyu18R6-0J0s_3XeaoE8fxVxS0Lhn6UWME9PLhjDpMPoUgnsk7iK5r3cjUSSCEXLi9Jz7Y3wmGnLQxyLkrtXZvnCQFsihlS7NGW9ZlLiwZd3y5Sbo5KQ2nM4whK45U1Ie7QwluIm1RwRaCQDKeVzhAS-lRvWP6_5wRmiz_84ZvAMo36UhTFfmdJtkcQ6u6zJVui4N5_IQv8YDZ8TtMdKGjTg_QvZ9tSFAJtBFwskLisoM6uGZKVSUo3zra_ioK6XywIQwj4ln1y89g8xdkF18gGPdSRJyUGTIqCNq9vMrk6YubNdaXvaJWn3tFg7wexCackrw2mxqtrAYoXDX2HrJE46w5VYFCXWXStJRNnNkOyz6rMMZyCrtSlPVOBBZ5YNGxUqFyzYPrzj9vqwi1J0v3Q1nH9ZhLA9StiRCyPBcG3KBR1ty-k8ZYtYIv2psmKsVz-Vl1VKlRWlPMoCL0jdWTVVjAoYpk5E4bMYydKxbbB-DkOqCKwzUROaqRExEb_NjmCmV9a0a3D3060KZ8ls-a1OznlOcgml2aoQUD3VVkiiKM07XoUO4gdGVmcHb-RvMtMl1bqsrUed92uFylPxEkXnmr-4KRac2pKSsu5nKQvPsuSVJMVRHTTnxq38pt6ML3p1mxh_2t9WfxAoDEgGn_6S-4GFlPJwElbmDxlKMbZ_xJNrU1tAbpA4rABbEUyxoQbBV07pLm1v5KZI_I6izNGz2sTc0Z60fT6lsElhIJpR6bO0-4KjB7tGbXN1rBVL0SXCtuJeLgWVoyityfjqA8hoGfWnjkA214fFgUdMVRyYWqgIOzZAwWPSSjg-kxrPjpTMl1mJMpQHwzuMMXwIWDeq37uxLf3wGekhNLCtBNyGogt_WHgFjod3Fh2Hlruh007s8FUmdhX3g-ewmI0ue1GbwTRb2Cd2YkbsUfRP7jcKjrZzy4iN-eLjMcKG6AYlSha4MkKAClbYPeidLKToEytjI33BvB9b19-E7pFMoixYaO2Qkys7BvkIdPaXkH_uFXOFUudqOhUDgW3e4GsklSiBdhL2e6dg3zi5DQhyjyP4mfU3Va82Q0ULAK2MnyZcTDdHX_8ET-27LzQXbazLsNhopYJOaCPuNBuiaIRt7p9Jp_qFT9Op7uAS4uuJ-li3z66rxYIaLeWEM7L3hn4W7l6sI4RL-i3nQfE25Cq62fMTWdqOhaOoNGiKIu6UCCSBknz4FiSiFvcH9l01nbTtV3QH73vkEfUwpvbGNDyFjwQXh565hgb6SJMtEb_9Sp8pe4OJkpKjVD3ncsIYyDoJsJCpKoweTnmaVM5Y81rxtR8t9b4N-1ye9gDzrXd8we1Sx96AHMI1nRDG3mLNG7CamqF6m8GVkMSAnAAaBNsqxZknF3F0hl5KFLf8V2CHUzkdDeC887sEZKpN1d-g-uRHKBO-uf4xlwz4uGML0HP24kkOb_BBin_MOVW2xrGOC3jMSJScy-RlgQ92MBOpFWU2JTLKEKN9U_6ppYt83S0ZB279deoUu74odTBZLN3RzHkIwR0X8FoOvPpJAPiEhoWulCMDrmab74qA_TM-DjN6MLSDR8A1vJJa33SKg0CkXmExAEhV2ZMyiOi1h8CMbcBHf1iDfvr6997cCVtRMVJtBRso11PbOKGd12QdbYwyTNGcA-E5mGMv5u0eu5ZaB5CHVMgbqkwsg0M0WRKoJasS_URVQFI43p7LzZWcwKr6WbNG1Akui9Dfwtk4hHboV7bb9hdygkE2E5OGIuWKnDz8q734oLnaSCWk46fmv4LvXBD9ZubiTXX7jY_zB3azAMFXA3b2WU=w505-h672-no?authuser=0",
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
