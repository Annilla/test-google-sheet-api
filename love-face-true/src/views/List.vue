<template>
  <div>
    <div v-if="isSignedIn">
      <v-card tile>
        <v-list-item
          three-line
          v-for="item in sheetData"
          :key="item.__PowerAppsId__"
        >
          <v-list-item-header>
            <v-list-item-title>{{ item.APP }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ item.Account }}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              {{ item.Password }}
            </v-list-item-subtitle>
          </v-list-item-header>
        </v-list-item>
      </v-card>
    </div>
    <div v-if="!isSignedIn || !sheetData.length" class="text-center">
      <v-progress-circular
        indeterminate
        color="primary"
        class="mt-5"
      ></v-progress-circular>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "List",
  data() {
    return {
      sheetData: [],
    };
  },
  computed: {
    ...mapState({
      isSignedIn: (state) => state.isSignedIn,
    }),
  },
  mounted() {
    this.getSheet();
  },
  methods: {
    async getSheet() {
      const gapi = await this.$gapi.getGapiClient();
      gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: process.env.VUE_APP_SPREADSHEET_ID,
          range: process.env.VUE_APP_SPREADSHEET_RANGE,
        })
        .then(
          (response) => {
            const range = response.result;
            const dataArray = range.values;
            if (dataArray.length > 0) {
              const keyArray = dataArray[0];
              for (const key in dataArray) {
                if (key > 0) {
                  const el = dataArray[key];
                  this.sheetData.push({
                    [keyArray[0]]: el[0],
                    [keyArray[1]]: el[1],
                    [keyArray[2]]: el[2],
                    [keyArray[3]]: el[3],
                    [keyArray[4]]: el[4],
                  });
                }
              }
            } else {
              console.log("No data found.");
            }
          },
          (response) => {
            console.log(`Error: ${response.result.error.message}`);
          }
        );
    },
  },
});
</script>