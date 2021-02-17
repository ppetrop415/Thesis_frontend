import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

require("@/store/subscriber");

Vue.config.productionTip = false;

store.dispatch(
  "auth/getInspections",
  JSON.parse(localStorage.getItem("credentials"))
);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
