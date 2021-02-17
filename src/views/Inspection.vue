<template>
  <div>
    <Navbar />
    <v-main class="mt-4 mb-10">
      <v-container fluid>
        <v-card class="mb-10 pa-3" elevation="10">
          <v-row class="mt-4" no-gutters justify="center">
            <h2>Στοιχεία Eπιχείρησης</h2>
          </v-row>
          <v-row no-gutters>
            <v-col cols="auto" class="mr-auto">
              <div class="caption grey--text">Επωνυμία</div>
              <div>{{ branchstore.business.title }}</div>
            </v-col>
            <v-col cols="auto" class="text-right">
              <div class="caption grey--text">Αριθμός Γνωστοποίησης</div>
              <div>{{ branchstore.notify_number }}</div>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="auto" class="mr-auto">
              <div class="caption grey--text">Διεύθυνση</div>
              <div>
                {{ branchstore.address }} {{ branchstore.address_number }},
                {{ branchstore.zip_code }}, {{ branchstore.state }}
              </div>
            </v-col>
            <v-col cols="auto" class="text-right">
              <div class="caption grey--text">ΑΦΜ</div>
              <div>{{ branchstore.vat }}</div>
            </v-col>
          </v-row>
          <v-row no-gutters class="mb-5">
            <v-col cols="12">
              <div class="caption grey--text">Ιδιοκτήτης</div>
              <div>{{ branchstore.business.owner_full_name }}</div>
            </v-col>
            <v-col cols="12">
              <div class="caption grey--text">Υγειονομικός Υπεύθυνος</div>
              <div>
                {{ branchstore.health_regulator.first_name }}
                {{ branchstore.health_regulator.last_name }}
              </div>
            </v-col>
            <v-col cols="12">
              <div class="caption grey--text">Δραστηριότητα</div>
              <div>{{ branchstore.activity.title }}</div>
            </v-col>
          </v-row>

          <v-expansion-panels class="mb-6" focusable>
            <v-expansion-panel
              v-for="(category, index) in branchstore.activity.categories"
              :key="index"
            >
              <v-expansion-panel-header
                expand-icon="mdi-menu-down"
                color="error"
                disable-icon-rotate
                class="white--text"
              >
                {{ category.title }}
              </v-expansion-panel-header>

              <expansion-panel-content
                v-for="(question, index) in category.questions"
                :key="index"
                :question="question"
              />
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-container>
    </v-main>
    <Footer />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Footer from "@/components/Footer.vue";
import ExpansionPanelContent from "@/components/Inspection/ExpansionPanelContent.vue";
import Navbar from "@/components/Inspection/Navbar.vue";
export default {
  components: { Navbar, Footer, ExpansionPanelContent },
  props: ["slug", "branchstore"],
  name: "Inspection",
  data() {
    return {
      row: null,
      show: false,
    };
  },
  computed: {
    ...mapState("branchstore", ["branchstore"]),
  },
  mounted() {
    this.getBranchstore(this.slug);
  },
  methods: {
    ...mapActions("branchstore", ["getBranchstore"]),
  },
};
</script>

<style></style>
