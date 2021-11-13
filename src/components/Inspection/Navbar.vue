<template>
  <nav>
    <v-app-bar app color="black" dark>
      <v-app-bar-title class="ml-2">New Inspection</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn elevation="2" outlined rounded
        >Score: {{ answerTotalScore }}</v-btn
      >
      <v-btn
        class="mx-2"
        elevation="4"
        fab
        dark
        small
        v-show="totalAnswers === totalQuestions"
        color="error"
        @click="submitInspection()"
      >
        <v-icon dark>
          mdi-send
        </v-icon>
      </v-btn>
    </v-app-bar>
  </nav>
</template>

<script>
  import { mapActions, mapGetters, mapState } from "vuex";
  export default {
    data() {
      return {
        drawer: false,
        disabled: null,
      };
    },
    computed: {
      ...mapGetters("inspection", ["answerTotalScore", "totalAnswers"]),
      ...mapGetters("branchstore", ["totalQuestions"]),
      ...mapState("inspection", ["inspection"]),
    },
    methods: {
      ...mapActions("inspection", ["completeInspection"]),
      submitInspection() {
        this.completeInspection({
          score: this.answerTotalScore,
          inspection: this.inspection.uuid,
        });
        this.$router.push({
          name: "inspections",
        });
      },
    },
  };
</script>

<style></style>
