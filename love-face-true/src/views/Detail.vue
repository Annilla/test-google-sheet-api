<template>
  <div>
    <v-row align="center" class="fill-height" v-if="isSignedIn">
      <v-col>
        <v-card tile max-width="500" class="ml-auto mr-auto">
          <v-list-item two-line v-for="(item, index) in listItems" :key="`${item.title}${index}`">
            <v-list-item-header>
              <v-list-item-title>
                <div class="text-body-1 text-secondary">{{ item.title }}</div>
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-container class="pa-0">
                  <v-row no-gutters>
                    <v-col cols="8">
                      <div class="text-h5">{{ item.value }}</div>
                    </v-col>
                    <v-col cols="4">
                      <div class="text-right" v-if="item.title === 'Password' || item.title === 'Account'">
                        <v-btn variant="text" color="primary" icon="mdi-content-copy"
                          @click="copyPassword(item.title, item.value)"></v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>

              </v-list-item-subtitle>
            </v-list-item-header>
          </v-list-item>
          <v-divider class="mt-5"></v-divider>
          <v-card-actions>
            <v-btn color="secondary" block size="large" @click="goEdit()">Edit<v-icon end
                icon="mdi-pencil"></v-icon></v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn color="primary" block size="large" @click="goList()">Go back list<v-icon end
                icon="mdi-heart"></v-icon></v-btn>
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

export default defineComponent({
  name: "Detail",
  components: { ProgressCircle },
  computed: {
    ...mapState({
      isSignedIn: (state) => state.isSignedIn,
      sheetData: (state) => state.sheetData,
    }),
    currentData() {
      const data = _.filter(this.sheetData, {
        RowNumber: Number(this.$route.params.RowNumber),
      });
      return data[0];
    },
    listItems() {
      return [
        {
          title: "APP",
          value: this.currentData.APP,
        },
        {
          title: "Account",
          value: this.currentData.Account,
        },
        {
          title: "Password",
          value: this.currentData.Password,
        },
        {
          title: "Remark",
          value: this.currentData.Remark,
        },
      ];
    },
  },
  methods: {
    copyPassword(title, password) {
      navigator.clipboard
        .writeText(password)
        .then(() => {
          this.$store.commit("updateSnackbarMessage", {
            text: `${title} ${password} copied!`,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    goList() {
      this.$router.push({ name: "list" });
    },
    goEdit() {
      this.$router.push({ name: "edit", params: { RowNumber: this.currentData.RowNumber } });
    },
  },
});
</script>