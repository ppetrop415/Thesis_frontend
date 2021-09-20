<template>
  <div>
    <Navbar />
    <v-main class="mb-10">
      <v-container fluid>
        <v-row class="mx-2 mt-2">
          <v-col cols="9">
            <v-form @submit.prevent="getLoads">
              <v-text-field
                label="Αναζήτηση με ΑΦΜ"
                prepend-inner-icon="mdi-magnify"
                v-model="query"
                rounded
                outlined
              ></v-text-field>
            </v-form>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="text-end">
            <v-btn
              color="error"
              class="white--text right"
              fab
              right
              @click="startNewInspection()"
              elevation="10"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-card class="mb-10" elevation="15">
          <v-data-table
            :headers="headers"
            :items="inspections.results"
            disable-pagination
            :hide-default-footer="true"
            :loading="loading"
            loading-text="Loading... Please wait"
          >
            <template v-slot:[`item.score`]="{ item }">
              <v-chip :color="getColor(item.score)" dark>
                {{ item.score }}
              </v-chip>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
              <v-btn
                class="my-2 mr-2"
                fab
                dark
                small
                color="primary"
                @click="viewInspection(item)"
              >
                <v-icon>
                  mdi-eye
                </v-icon>
              </v-btn>
              <!-- <v-btn class="my-2 mr-2" fab dark small color="error">
                <v-icon>
                  mdi-file-pdf
                </v-icon>
              </v-btn> -->
            </template>
          </v-data-table>
          <hr />
          <div class="text-center mt-2">
            <v-pagination
              v-model="page"
              :length="Math.ceil(inspections.count / 10)"
              total-visible="7"
              circle
              @input="getLoads"
            ></v-pagination>
          </div>
        </v-card>
      </v-container>
    </v-main>
    <Footer />
  </div>
</template>

<script>
  import Footer from "@/components/Footer.vue";
  import Navbar from "@/components/Navbar.vue";

  import http from "../api/axios";

  import { mapState } from "vuex";

  export default {
    name: "Inspections",
    components: { Navbar, Footer },
    data() {
      return {
        query: "",
        loading: false,
        inspections: [],
        selectedItemIndex: -1,
        page: 1,
        headers: [
          {
            text: "Επωνυμία",
            align: "start",
            sortable: false,
            value: "inspection.branch_store.business",
            class: "error white--text text-subtitle-1",
          },
          {
            text: "ΑΦΜ",
            value: "inspection.branch_store.vat",
            class: "error white--text text-subtitle-1",
          },
          {
            text: "Βαθμολογία",
            value: "score",
            class: "error white--text text-subtitle-1",
          },

          {
            text: "Ημερομηνία",
            value: "completed",
            class: "error white--text text-subtitle-1",
          },
          {
            text: "Ενέργειες",
            value: "actions",
            sortable: false,
            class: "error white--text text-subtitle-1",
          },
        ],
      };
    },
    computed: {
      // ...mapState("inspection", ["inspections"]),
      ...mapState("auth", ["token"]),
    },
    created() {
      // this.getInspectionsPaginated(this.page);
      this.getLoads();
    },
    methods: {
      pageCount() {
        Math.ceil(this.inspections.count / 10);
      },

      async getLoads() {
        this.loading = true;

        await http
          .get(`inspections/completed/?page=${this.page}&search=${this.query}`)
          .then((response) => {
            this.inspections = response.data;

            console.log(response.data);

            this.loading = false;
          });
      },

      startNewInspection() {
        this.$router.push({
          name: "new-inspection",
        });
      },

      getColor(score) {
        if (score) {
          if (score > 100) return "red";
          else if (score > 40) return "orange";
          else return "green";
        }
      },

      viewInspection(item) {
        this.selectedItem = this.inspections.results.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.$router.push({
          name: "inspection-detail",
          params: {
            item: this.editedItem,
            uuid: this.editedItem.inspection.uuid,
          },
        });
      },
    },
  };
</script>
