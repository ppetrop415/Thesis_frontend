<template
  ><div>
    <Navbar />
    <v-main class="mb-10">
      <v-container fluid class="mb-5">
        <v-row class="mt-5" no-gutters justify="center">
          <h1>Αναζήτηση Υγειονομικού Ελέγχου</h1>
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
      </v-container>
    </v-main>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  props: {
    attrs: {
      type: Object,
      default: () => ({}),
    },
  },
  components: { Navbar, Footer },
  data() {
    return {
      vat: null,
    };
  },
};
</script>

<style></style>
