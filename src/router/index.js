import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Mockup",
    component: () => import("../views/Mockup.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/enterprises",
    name: "enterprises",
    component: () => import("../views/Enterprises.vue"),
  },
  {
    path: "/geolocation",
    name: "Geolocation",
    component: () => import("../views/Geolocation.vue"),
  },
  {
    path: "/deliveries",
    name: "Deliveries",
    component: () => import("../views/Deliveries.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  
  {
    path: "/editar",
    name: "editar",
    component: () => import("../views/Editar.vue"),
  },

  
  {
    path: "/registrar",
    name: "Registrar",
    component: () => import("../views/Registrar.vue"),
  },

  // {
  //   path: "/example",
  //   name: "Example",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/Example.vue"),
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
