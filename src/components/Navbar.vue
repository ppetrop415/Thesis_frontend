<template>
  <nav>
    <v-app-bar app color="black" dark>
      <!-- <slot name="left_button" /> -->
      <v-app-bar-nav-icon @click="drawer = !drawer"
        ><slot name="left_button"
      /></v-app-bar-nav-icon>
      <slot name="title" />
      <v-spacer></v-spacer>
      <slot name="right_button" />
    </v-app-bar>

    <v-navigation-drawer app color="black" dark v-model="drawer">
      <v-list-item>
        <v-list-item-content class="text-center">
          <v-list-item-title class="title">
            <span class=" text-h4 font-weight-bold">S</span>any
            <span class="red--text text-h4 font-weight-bold">H</span>ealth
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list class="text-center">
        <v-layout column align-center>
          <v-flex class="ma-5">
            <v-avatar size="100" color="grey">
              <v-icon size="70">
                mdi-account
              </v-icon>
            </v-avatar>
          </v-flex>
        </v-layout>

        <v-list-item link :to="{ name: 'profile' }">
          <v-list-item-content>
            <v-list-item-title class="title mb-3">
              {{ token.user.first_name }} <br />
              {{ token.user.last_name }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ token.user.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-list-item :to="{ name: 'login' }" class="pa-2">
          <v-btn block @click="logout">
            Αποσυνδεση
          </v-btn>
        </v-list-item>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script>
  import { mapActions, mapState } from "vuex";

  export default {
    data() {
      return {
        drawer: false,
        items: [
          { title: "Έλεγχοι", icon: "mdi-file", route: "/inspections" },
          {
            title: "Νέος Έλεγχος",
            icon: "mdi-file-plus",
            route: "/new-inspection",
          },
          { title: "Αναζήτηση", icon: "mdi-magnify", route: "/search" },
        ],
      };
    },
    computed: { ...mapState("auth", ["token"]) },
    methods: {
      ...mapActions("auth", ["signOut"]),
      logout() {
        this.signOut().then(() => {
          this.$router.replace({
            name: "login",
          });
        });
        localStorage.removeItem("credentials");
      },
    },
  };
</script>

<style></style>
