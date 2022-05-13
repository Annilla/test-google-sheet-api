<template>
  <div>
    <div v-if="isSignedIn">
      <v-card tile>
        <v-text-field
          v-model="searchKeywords"
          label="Search keywords"
          prepend-inner-icon="mdi-magnify"
          single-line
          clearable
          color="primary"
        >
        </v-text-field>
      </v-card>
      <v-card tile>
        <template
          v-for="item in filterSheetData"
          :key="`v-list-item-${item.RowNumber}`"
        >
          <v-list-item three-line>
            <v-list-item-header>
              <v-list-item-title>
                <div class="text-h4">{{ item.APP }}</div>
              </v-list-item-title>
              <v-list-item-subtitle>
                <div class="text-body-1">
                  <v-icon
                    icon="mdi-account"
                    color="secondary ml-0 mr-3"
                  ></v-icon>
                  {{ item.Account }}
                </div>
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <div class="text-body-1">
                  <v-icon icon="mdi-key" color="secondary ml-0 mr-3"></v-icon>
                  {{ item.Password }}
                </div>
              </v-list-item-subtitle>
            </v-list-item-header>
            <template v-slot:append>
              <v-list-item-avatar end>
                <v-btn
                  variant="text"
                  color="primary"
                  icon="mdi-content-copy"
                  @click="copyPassword(item.Password)"
                ></v-btn>
              </v-list-item-avatar>
              <v-list-item-avatar end>
                <v-btn
                  variant="text"
                  color="primary"
                  icon="mdi-file-document-outline"
                  @click="goDetail(item.RowNumber)"
                ></v-btn>
              </v-list-item-avatar>
            </template>
          </v-list-item>
          <v-divider class="mt-2 mb-2"></v-divider>
        </template>
        <v-card-text v-if="filterSheetData?.length === 0">
          <div class="text-h4">No data</div>
        </v-card-text>
        <v-card-actions
          v-if="
            searchKeywords === null &&
            filterSheetData?.length < sheetData.length
          "
        >
          <v-btn @click="nextPage()" color="secondary" block size="large"
            >More<v-icon end icon="mdi-chevron-down"></v-icon
          ></v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div v-if="!isSignedIn || !sheetData.length || loadAPI" class="text-center">
      <ProgressCircle/>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { defineComponent } from "vue";
import { mapState } from "vuex";
import ProgressCircle from "../components/ProgressCircle.vue";
import { getSheetAPI } from "../js/utils";

export default defineComponent({
  name: "List",
  components: { ProgressCircle },
  data() {
    return {
      searchKeywords: null,
      filterSheetData: null,
      loadAPI: false,
      count: 10,
      page: 1,
    };
  },
  watch: {
    searchKeywords: _.debounce(function () {
      this.filterData();
    }, 1000),
  },
  computed: {
    ...mapState({
      isSignedIn: (state) => state.isSignedIn,
      sheetData: (state) => state.sheetData,
    }),
  },
  mounted() {
    this.getSheet();
  },
  methods: {
    goDetail(RowNumber) {
      this.$router.push({ name: "detail", params: { RowNumber: RowNumber } });
    },
    copyPassword(password) {
      navigator.clipboard
        .writeText(password)
        .then(() => {
          this.$store.commit("updateSnackbarMessage", {
            text: `Password ${password} copied!`,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    nextPage() {
      this.page++;
      this.filterData();
    },
    filterData() {
      let data = this.sheetData;
      if (this.searchKeywords !== null && this.searchKeywords.length) {
        // Filter data
        data = _.filter(
          data,
          _.flow(
            _.identity,
            _.values,
            _.join,
            _.toLower,
            _.partialRight(_.includes, this.searchKeywords)
          )
        );
      }
      // Sort data
      data = _.orderBy(data, ["APP", "Account"], ["asc", "asc"]);
      // Slice data
      this.filterSheetData = _.slice(data, 0, this.page * this.count);
      this.loadAPI = false;
    },
    async getSheet() {
      this.loadAPI = true;
      const res = await getSheetAPI(this);

      if (res) {
        this.filterData();
      }
    },
  },
});
</script>