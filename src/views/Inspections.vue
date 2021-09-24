<template>
  <div>
    <navbar>
      <template #title>Υγειονομικοί Έλεγχοι</template>
    </navbar>
    <v-main class="mb-10">
      <v-container>
        <v-row>
          <v-col>
            <v-form @submit.prevent>
              <v-text-field
                class="mt-3"
                label="Αναζήτηση με ΑΦΜ"
                prepend-inner-icon="mdi-magnify"
                v-model="query"
                outlined
                dense
                @keyup="getLoads()"
              ></v-text-field>
            </v-form>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-list two-line>
          <v-list-item-group active-class="pink--text">
            <template v-for="(item, index) in inspections.results">
              <v-list-item @click="viewInspection(item)" :key="index">
                <v-list-item-content>
                  <v-list-item-title
                    v-text="item.inspection.branch_store.business"
                  ></v-list-item-title>

                  <v-list-item-subtitle
                    class="text--primary"
                    v-text="
                      `${item.inspection.branch_store.health_regulator.first_name} ${item.inspection.branch_store.health_regulator.first_name}`
                    "
                  ></v-list-item-subtitle>

                  <v-list-item-subtitle
                    v-text="
                      `${item.inspection.branch_store.address} ${item.inspection.branch_store.address_number}, ${item.inspection.branch_store.zip_code}, ${item.inspection.branch_store.state}`
                    "
                  ></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-list-item-action-text
                    v-text="item.completed"
                  ></v-list-item-action-text>

                  <v-list-item-action-text
                    v-text="item.inspection.branch_store.vat"
                  ></v-list-item-action-text>

                  <v-chip :color="getColor(item.score)" dark>
                    {{ item.score }}
                  </v-chip>
                </v-list-item-action>
              </v-list-item>
              <v-divider :key="item.results"></v-divider>
            </template>
          </v-list-item-group>
        </v-list>

        <div v-if="inspections.next" class="text-center my-3">
          <v-pagination
            v-model="page"
            :length="Math.ceil(inspections.count / 10)"
            total-visible="7"
            circle
            @input="getLoads"
          ></v-pagination>
        </div>
      </v-container>
    </v-main>
    <Footer />
  </div>
</template>

<script>
  import Footer from "@/components/Footer.vue";
  import Navbar from "@/components/Navbar.vue";
  import authHeader from "../api/headers";

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
      async getLoads() {
        this.loading = true;

        await http
          .get(
            `inspections/completed/?page=${this.page}&search=${this.query}`,
            { headers: authHeader() }
          )
          .then((response) => {
            this.inspections = response.data;

            console.log(response.data);

            this.loading = false;
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
