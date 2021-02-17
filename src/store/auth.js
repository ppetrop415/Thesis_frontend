import axios from "@/api/axios";

import Inspection from "@/services/inspection";
import Auth from "@/services/auth";

export default {
  state: {
    inspections: null,
    page: 1,
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

    SET_INSPECTIONS(state, data) {
      state.inspections = data;
    },
  },
  actions: {
    async signIn({ dispatch }, credentials) {
      let response = await axios.post("auth/login/", credentials);

      return dispatch("getInspections", response.data);
    },

    async getInspections({ commit, state }, data) {
      if (data) {
        commit("SET_CREDENTIALS", data);
      }

      if (!state.token) {
        return;
      }

      try {
        let response = await Inspection.getAll();
        commit("SET_INSPECTIONS", response.data);
      } catch {
        commit("SET_CREDENTIALS", null);
      }
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
