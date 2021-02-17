<template>
  <nav>
    <v-app-bar app color="black" dark>
      <v-btn class="mx-2" fab dark small color="error" @click="goBack()">
        <v-icon dark>
          mdi-arrow-left
        </v-icon>
      </v-btn>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.replace({
        name: "inspections",
      });
    },
  },
};
</script>

<style></style>
