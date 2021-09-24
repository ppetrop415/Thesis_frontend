<template>
  <div>
    <navbar>
      <template #title>Profile</template>
    </navbar>
    <v-main class="mb-10">
      <v-container class="mb-10">
        <div class="text-h4">Profile Details</div>
        <v-row>
          <v-col>
            <v-card class="pa-5 my-5">
              <v-card-title>Persolan Details</v-card-title>
              <v-card-text>
                <v-row align="center" justify="center">
                  <v-col>
                    <v-avatar class="justify-center" size="64" color="grey">
                      <v-icon size="32">
                        mdi-account
                      </v-icon>
                    </v-avatar>
                  </v-col>
                  <v-col>
                    <div class="text-body-2">Όνομα</div>
                    <div class="text-body-1 font-weight-bold">
                      Παναγιώτης
                    </div>
                    <div class="text-body-2">Επώνυμο</div>
                    <div class="text-body-1 font-weight-bold">
                      Πετρόπουλος
                    </div>
                  </v-col>
                  <v-col>
                    <div>Διεύθυνση</div>
                    <div class=" text-body-1 font-weight-bold">
                      Οιδίποδος 33, 10443, Αθήνα
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" lg="6">
            <v-card class="pa-5 my-5"
              ><v-card-title>Contact Details</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col>
                    <div class="text-body-2">
                      Ηλεκτρονική Διεύθυνση 2
                    </div>
                    <div class=" text-body-1 font-weight-bold">
                      ppetropoulos.patt.gov@gmail.com
                    </div>
                    <div>Ηλεκτρονική Διεύθυνση 1</div>
                    <div class="text-body-1 font-weight-bold">
                      ppetropoulos@patt.gov.gr
                    </div>
                  </v-col>
                  <v-col>
                    <div class="text-body-2">Τηλέφωνο</div>
                    <div class="text-body-1 font-weight-bold">
                      6970788952
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" lg="6">
            <v-card class="pa-5 my-5"
              ><v-card-title>Profesional Details</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col>
                    <div class="text-body-2">
                      Έδρα
                    </div>
                    <div class=" text-body-1 font-weight-bold">
                      Περιφέρεια Αττικής
                    </div>
                    <div>Ενότητα</div>
                    <div class="text-body-1 font-weight-bold">
                      Περιφερειακή Ενότητα Κεντρικού Τομέα Αθηνών
                    </div>
                  </v-col>
                  <v-col>
                    <div class="text-body-2">Συνεργάτης</div>
                    <div class="text-body-1 font-weight-bold">
                      Κυριακάκη Σοφία
                    </div>
                    <div class="text-body-2">Περιοχή</div>
                    <div class="text-body-1 font-weight-bold">
                      4ο ΔΔ (Κολωνός)
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Footer />
  </div>
</template>

<script>
  import http from "../api/axios";

  import { mapActions, mapState } from "vuex";
  import Footer from "../components/Footer.vue";
  import Navbar from "../components/Navbar.vue";
  export default {
    components: { Navbar, Footer },
    name: "NewInspection",
    data() {
      return {
        query: "",
        page: 1,
        dialog: false,
        selectedBranchstore: "",
        branchstore: "",
      };
    },
    computed: {
      ...mapState("auth", ["token"]),
    },
    methods: {
      ...mapActions("branchstore", ["searchBranchstore"]),
      ...mapActions("inspection", ["createInspection"]),

      async getLoads() {
        await http
          .get(`branchstores/?page=${this.page}&search=${this.query}`)
          .then((response) => {
            this.branchstore = response.data.results;

            console.log(response.data);
          });
      },

      handleSearch() {
        if (this.vat !== null) {
          this.searchBranchstore(this.vat);
        } else {
          console.log("add a number");
        }
      },
      sendData(item) {
        this.selectedBranchstore = item;
      },
      startInspection() {
        this.createInspection({
          branch_store: this.selectedBranchstore.id,
          inspector: this.token.user.id,
        });
        this.$router.push({
          name: "inspection",
          params: {
            slug: this.selectedBranchstore.slug,
            branchstore: this.selectedBranchstore,
          },
        });
      },
    },
  };
</script>

<style></style>
