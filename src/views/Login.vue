<template>
  <v-container class="my-auto">
    <div class="text-center mb-6">
      <h1>Health <span class="blue--text">&</span> Safety</h1>
    </div>
    <v-card width="500" elevation="11" class="mx-auto">
      <v-alert
        v-if="errors"
        type="error"
        dense
        dismissible
        @input="onDismissed"
      >
        {{ errors }}
      </v-alert>
    </v-card>
    <v-card width="500" height="350" elevation="11" class="mx-auto pa-3">
      <div class="text-center mt-4">
        <h2>Login</h2>
      </div>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            label="Email"
            v-model="form.email"
            :rules="emailRules"
            autocomplete="email"
            prepend-icon="mdi-account-circle"
            required
          />
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            v-model="form.password"
            autocomplete="current-password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            :rules="passwordRules"
            required
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="error"
          block
          type="submit"
          :loading="loading"
          @click="submit"
          >Login</v-btn
        >
      </v-card-actions>
      <v-btn color="blue" text>Forgor Password? </v-btn>
    </v-card>
  </v-container>
</template>

<script>
// import User from "../models/user";
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      errors: "",
      loading: false,
      showPassword: false,
      valid: true,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [(v) => !!v || "Password is required"],
    };
  },
  methods: {
    ...mapActions("auth", ["signIn"]),
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.signIn({
          email: this.form.email,
          password: this.form.password,
        })
          .then(() => {
            this.$router.replace({
              name: "inspections",
            });
            this.loading = false;
          })
          .catch(() => {
            this.errors =
              "Τα στοιχεία εισόδου που καταχωρήσατε δεν είναι σωστά.";
            this.loading = false;
          });
      }
    },
    onDismissed() {
      this.errors = "";
    },
  },
};
</script>
