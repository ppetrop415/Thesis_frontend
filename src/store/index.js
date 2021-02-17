import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import inspection from "./inspection";
import branchstore from "./branchstore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    inspection,
    branchstore,
  },
});
