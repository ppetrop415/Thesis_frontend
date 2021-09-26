// import axios from "@/api/axios";

// import Inspection from "@/services/inspection";
import Auth from "../services/auth";

export default {
  state: {
    token: null,
    error: null,
  },

  getters: {
    authenticated(state) {
      if (state.token) {
        return true;
      } else {
        return false;
      }
    },
    error(state) {
      return state.error;
    },
  },
  mutations: {
    SET_CREDENTIALS(state, token) {
      state.token = token;
    },
    SET_ERRORS(state, error) {
      state.error = error;
    },
  },

  actions: {
    async signIn({ commit }, credentials) {
      await Auth.login(credentials)
        .then((response) => {
          commit("SET_CREDENTIALS", response.data);
        })
        .catch(() => {
          console.log("Wrong Credentials");
        });
    },

    signOut({ commit }) {
      return Auth.logout().then(() => {
        commit("SET_CREDENTIALS", null);
        commit("SET_INSPECTIONS", null);
      });
    },
  },
  namespaced: true,
};
