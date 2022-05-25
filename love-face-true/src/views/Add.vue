<template>
  <div>
    <v-row align="center" class="fill-height" v-if="isSignedIn">
      <v-col>
        <v-card tile max-width="500" class="ml-auto mr-auto">
          <v-list-item two-line>
            <v-list-item-header>
              <v-list-item-title>
                <div class="text-body-1 text-secondary">APP</div>
                <v-text-field
                  v-model="inputValue.APP"
                  single-line
                  variant="underlined"
                  color="secondary"
                  :disabled="loading"
                ></v-text-field>
              </v-list-item-title>
            </v-list-item-header>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-header>
              <v-list-item-title>
                <div class="text-body-1 text-secondary">Account</div>
                <v-text-field
                  v-model="inputValue.Account"
                  single-line
                  variant="underlined"
                  color="secondary"
                  :disabled="loading"
                ></v-text-field>
              </v-list-item-title>
            </v-list-item-header>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-header>
              <v-list-item-title>
                <div class="text-body-1 text-secondary">Password</div>
                <v-text-field
                  v-model="inputValue.Password"
                  single-line
                  variant="underlined"
                  color="secondary"
                  :disabled="loading"
                ></v-text-field>
              </v-list-item-title>
            </v-list-item-header>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-header>
              <v-list-item-title>
                <div class="text-body-1 text-secondary">Remark</div>
                <v-text-field
                  v-model="inputValue.Remark"
                  single-line
                  variant="underlined"
                  color="secondary"
                  :disabled="loading"
                ></v-text-field>
              </v-list-item-title>
            </v-list-item-header>
          </v-list-item>
          <v-divider class="mt-5"></v-divider>
          <v-card-actions>
            <v-btn color="secondary" block size="large" @click="saveData()" :loading="loading" :disabled="loading"
              >Save<v-icon end icon="mdi-content-save"></v-icon
            ></v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn color="primary" block size="large" @click="goList()" :disabled="loading"
              >Cancel<v-icon end icon="mdi-cancel"></v-icon
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <div v-if="!isSignedIn" class="text-center">
      <ProgressCircle />
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import ProgressCircle from "../components/ProgressCircle.vue";
import { defineComponent } from "vue";
import { mapState } from "vuex";
import { getSheetAPI } from "../js/utils";

export default defineComponent({
  name: "Edit",
  components: { ProgressCircle },
  data() {
    return {
      inputValue: {
        APP: '',
        Account: '',
        Password: '',
        Remark: '',
      },
      loading: false,
    };
  },
  computed: {
    ...mapState({
      isSignedIn: (state) => state.isSignedIn,
    }),
    user() {
      const user = this.$gapi.getUserData();

      if (user) {
        return user;
      }
    },
    nowDate() {
      const date = new Date();
      return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;
    }
  },
  methods: {
    goList() {
      this.$router.push({ name: "list" });
    },
    async saveData() {
      this.loading = true;
      const gapi = await this.$gapi.getGapiClient();
      gapi.client.sheets.spreadsheets.values
        .append({
          spreadsheetId: process.env.VUE_APP_SPREADSHEET_ID,
          range: `${process.env.VUE_APP_SPREADSHEET_SHEET}`,
          valueInputOption: "USER_ENTERED",
          resource: {
            values: [
              [
                `${this.user.fullName}-${this.nowDate}`,
                this.inputValue.APP,
                this.inputValue.Account,
                this.inputValue.Password,
                this.inputValue.Remark,
              ],
            ],
          },
        })
        .then(async (response) => {
          const result = response.result;
          this.$store.commit("updateSnackbarMessage", {
            text: `${this.inputValue.APP} added.`,
          });
          console.log(`${result.updates.updatedCells} cells appended.`);
          // Renew sheet
          const res = await getSheetAPI(this);
          if (res) {
            this.loading = false;
            this.goList();
          }
        });
    },
  },
});
</script>