<template>
  <div>
    <Navbar />
    <v-main>
      <v-container fluid class="mb-5">
        <v-row class="mt-5" no-gutters justify="center">
          <h1>Νέα Επιθεώρηση</h1>
        </v-row>
        <v-form class="mt-10" @submit.prevent="handleSearch">
          <v-text-field
            label="Τοποθέτησε το ΑΦΜ απο μια απόδειξη"
            prepend-inner-icon="mdi-magnify"
            v-model="vat"
            rounded
            outlined
          ></v-text-field>
        </v-form>

        <div v-if="!branchstore" class="mb-10">
          <div class="mb-5" v-for="(item, index) in branchstore" :key="index">
            <v-card class="my-3 pa-3" elevation="15">
              <v-row no-gutters>
                <v-col cols="auto" class="mr-auto">
                  Αναζήτησε μια επιχείρηση με το ΑΦΜ για να ξεκινήσεις έναν νέο
                  υγειονομικό έλεγχο.
                </v-col>
              </v-row>
            </v-card>
          </div>
        </div>
        <div v-else class="mb-10">
          <div class="mb-5" v-for="(item, index) in branchstore" :key="index">
            <v-card class="my-3 pa-3">
              <v-row no-gutters>
                <v-col cols="auto" class="mr-auto">
                  <div class="caption grey--text">Τίτλος</div>
                  <div>{{ item.business.title }}</div>
                </v-col>
                <v-col cols="auto" class="text-right">
                  <div class="caption grey--text">Αριθμός Γνωστοποίησης</div>
                  <div>{{ item.notify_number }}</div>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="auto" class="mr-auto">
                  <div class="caption grey--text">Διεύθυνση</div>
                  <div>Οιδίποδος 33, 10443, Αθήνα</div>
                </v-col>
                <v-col cols="auto" class="text-right">
                  <div class="caption grey--text">ΑΦΜ</div>
                  <div>{{ item.vat }}</div>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12">
                  <div class="caption grey--text">Ιδιοκτήτης</div>
                  <div>{{ item.business.owner_full_name }}</div>
                </v-col>
                <v-col cols="12">
                  <div class="caption grey--text">Υγειονομικός Υπεύθυνος</div>
                  <div>
                    {{ item.health_regulator.first_name }}
                    {{ item.health_regulator.last_name }}
                  </div>
                </v-col>
                <v-col cols="12">
                  <div class="caption grey--text">Δραστηριότητα</div>
                  <div>Επιχείρηση Μαζικής Εστίασης Πλήρους Επεξεργασίας</div>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-card-actions class="mt-2">
                  <v-btn
                    class="error"
                    @click.stop="(dialog = true), sendData(item)"
                    >Εναρξη</v-btn
                  >
                </v-card-actions>
              </v-row>
            </v-card>
            <v-dialog v-model="dialog" max-width="400">
              <v-card>
                <v-row no-gutters justify="center">
                  <v-card-title>
                    Νέα Επιθεώρηση
                  </v-card-title>
                </v-row>
                <v-card-text>
                  Είσαι σίγουρος/η ότι θες να ξεκινήσεις έναν υγειονομικό έλεγχο
                  σε αυτή την επιχείρηση
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue" text @click="dialog = false">
                    Disagree
                  </v-btn>

                  <v-btn
                    color="error"
                    @click="
                      (dialog = false), startInspection(selectedBranchstore)
                    "
                  >
                    Agree
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </div>
      </v-container>
    </v-main>
    <Footer />
  </div>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  import Footer from "../components/Footer.vue";
  import Navbar from "../components/Navbar.vue";
  export default {
    components: { Navbar, Footer },
    name: "NewInspection",
    data() {
      return {
        vat: null,
        dialog: false,
        selectedBranchstore: "",
      };
    },
    computed: {
      ...mapState("branchstore", ["branchstore"]),
      ...mapState("auth", ["token"]),
    },
    created() {
      this.searchBranchstore();
    },
    methods: {
      ...mapActions("branchstore", ["searchBranchstore"]),
      ...mapActions("inspection", ["createInspection"]),

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
