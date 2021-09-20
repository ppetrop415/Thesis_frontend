import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Inspections from "@/views/Inspections.vue";
import NewInspection from "@/views/NewInspection.vue";
import Inspection from "@/views/Inspection.vue";
import InspectionDetail from "@/views/InspectionDetail.vue";
import Search from "@/views/Search";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({
          name: "login",
        });
      }
      next();
    },
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/inspections",
    name: "inspections",
    component: Inspections,
    // component: () =>
    //   import(/* webpackChunkName: "inspections" */ "../views/Inspections.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({
          name: "login",
        });
      }
      next();
    },
  },
  {
    path: "/inspections/:uuid",
    name: "inspection-detail",
    component: InspectionDetail,
    props: true,
    // component: () =>
    //   import(/* webpackChunkName: "inspections" */ "../views/Inspections.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({
          name: "login",
        });
      }
      next();
    },
  },
  {
    path: "/new-inspection",
    name: "new-inspection",
    component: NewInspection,
    // component: () =>
    //   import(/* webpackChunkName: "inspections" */ "../views/Inspections.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({
          name: "login",
        });
      }
      next();
    },
  },
  {
    path: "/new-inspection/:slug",
    name: "inspection",
    component: Inspection,
    props: true,
    // component: () =>
    //   import(/* webpackChunkName: "inspections" */ "../views/Inspections.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({
          name: "login",
        });
      }
      next();
    },
  },
  {
    path: "/search",
    name: "search",
    component: Search,
    // component: () =>
    //   import(/* webpackChunkName: "inspections" */ "../views/Inspections.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({
          name: "login",
        });
      }
      next();
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
