import Branchstore from "@/services/branchstore";

export default {
  state: {
    branchstores: [],
    branchstore: null,
    vat: null,
  },

  getters: {
    totalQuestions: (state) => {
      let total = 0;

      state.branchstore.activity.categories.forEach((item) => {
        total += item.questions.length;
      });
      return total;
    },
  },
  mutations: {
    SET_BRANCHSTORES: (state, branchstores) =>
      (state.branchstores = branchstores),
    SET_BRANCHSTORE: (state, branchstore) => (state.branchstore = branchstore),
    SEARCH_BRANCHSTORE: (state, branchstore) =>
      (state.branchstore = branchstore),
  },
  actions: {
    async getBranchstores({ commit }) {
      await Branchstore.getAll()
        .then((response) => {
          commit("SET_BRANCHSTORES", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async getBranchstore({ commit }, slug) {
      await Branchstore.get(slug)
        .then((response) => {
          commit("SET_BRANCHSTORE", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async searchBranchstore({ commit }, vat) {
      await Branchstore.findByVat(vat)
        .then((response) => {
          commit("SEARCH_BRANCHSTORE", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  namespaced: true,
};
