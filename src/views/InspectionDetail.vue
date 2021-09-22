<template>
  <div>
    <navbar>
      <template #left_button><btn-go-back /></template>
      <template #title>Υγειονομικός Έλεγχος</template>
    </navbar>
    <v-main class="mt-4 mb-10">
      <v-container fluid>
        <v-card elevation="10" class="mb-10 pa-3">
          <v-row no-gutters justify="center">
            <h1>Στοιχεία Ελέγχου</h1>
          </v-row>

          <v-row no-gutters class="mt-5">
            <v-col cols="auto" class="mr-auto">
              <div class="caption grey--text">
                Μοναδικός Κωδικός Επιθεώρησης
              </div>
              <div>{{ inspection.uuid }}</div>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="auto">
              <div class="caption grey--text">Ημ/νια-Ωρα Έναρξης</div>
              <div>{{ inspection.date_created }}</div>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="auto">
              <div class="caption grey--text">Ημ/νια-Ωρα Ολοκλήρωσης</div>
              <div>{{ inspection.complete.completed }}</div>
            </v-col>
          </v-row>
          <v-row no-gutters class="mb-6">
            <v-col cols="auto" sm="4">
              <div class="caption grey--text">Επιθεωρητής</div>
              <div>
                {{ inspection.inspector.first_name }}
                {{ inspection.inspector.last_name }}
              </div>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="auto">
              <div class="caption grey--text">
                Βαθμολογία
              </div>
              <div class="text-center">
                <v-chip
                  :color="getColor(inspection.complete.score)"
                  text-color="white"
                >
                  {{ inspection.complete.score }}
                </v-chip>
              </div>
            </v-col>
          </v-row>
          <v-row no-gutters justify="center">
            <h2>Στοιχεία Eπιχείρησης</h2>
          </v-row>
          <v-row no-gutters>
            <v-col cols="auto" class="mr-auto">
              <div class="caption grey--text">Επωνυμία</div>
              <div>{{ inspection.branch_store.business }}</div>
            </v-col>
            <v-col cols="auto" class="text-right">
              <div class="caption grey--text">Αριθμός Γνωστοποίησης</div>
              <div>{{ inspection.branch_store.notify_number }}</div>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="auto" class="mr-auto">
              <div class="caption grey--text">Διεύθυνση</div>
              <div>
                {{ inspection.branch_store.address }}
                {{ inspection.branch_store.address_number }},
                {{ inspection.branch_store.zip_code }},
                {{ inspection.branch_store.state }}
              </div>
            </v-col>
            <v-col cols="auto" class="text-right">
              <div class="caption grey--text">ΑΦΜ</div>
              <div>{{ inspection.branch_store.vat }}</div>
            </v-col>
          </v-row>
          <v-row no-gutters class="mb-5">
            <v-col class="mb-5" cols="12">
              <div class="caption grey--text">Ιδιοκτήτης</div>
              <div>
                {{ inspection.branch_store.health_regulator.first_name }}
                {{ inspection.branch_store.health_regulator.last_name }}
              </div>
            </v-col>
            <v-col class="mb-5" cols="12">
              <div class="caption grey--text">Υγειονομικός Υπεύθυνος</div>
              <div>
                {{ inspection.branch_store.health_regulator.first_name }}
                {{ inspection.branch_store.health_regulator.last_name }}
              </div>
            </v-col>
            <v-col class="mb-5" cols="12">
              <div class="caption grey--text">Δραστηριότητα</div>
              <div>{{ inspection.branch_store.activity }}</div>
            </v-col>
          </v-row>

          <v-data-table
            :headers="headers"
            :items="inspection.answers"
            disable-pagination
            :hide-default-footer="true"
          >
          </v-data-table>
          <hr />
        </v-card>
      </v-container>
    </v-main>
    <Footer />
  </div>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  import Footer from "@/components/Footer.vue";

  import Navbar from "@/components/Navbar.vue";
  import BtnGoBack from "../components/btnGoBack.vue";
  export default {
    components: { Navbar, BtnGoBack, Footer },
    props: ["uuid"],
    name: "InspectionDetail",
    data() {
      return {
        headers: [
          {
            text: "Ερώτηση",
            align: "start",
            sortable: false,
            value: "question",
            class: "error white--text text-h6",
          },
          {
            text: "Αποτέλεσμα",
            value: "body",
            class: "error white--text text-h6",
          },
          {
            text: "Σχόλια - Παρατηρήσεις",
            value: "comment",
            class: "error white--text text-h6",
          },
        ],
      };
    },
    computed: {
      ...mapState("inspection", ["inspection"]),
    },
    mounted() {
      this.getInspection(this.uuid);
    },
    methods: {
      ...mapActions("inspection", ["getInspection"]),
      getColor(score) {
        if (score) {
          if (score > 100) return "red";
          else if (score > 40) return "orange";
          else return "green";
        }
      },
    },
  };
</script>

<style></style>
