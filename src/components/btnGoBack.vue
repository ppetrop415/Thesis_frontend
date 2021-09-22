<template>
  <v-btn class="mx-5" fab dark small color="error" @click="goBack()">
    <v-icon dark>
      mdi-arrow-left
    </v-icon>
  </v-btn>
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
