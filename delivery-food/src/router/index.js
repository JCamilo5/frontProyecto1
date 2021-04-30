import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/user/Login.vue"),
  },
  {
    path: "/docs-vue",
    name: "Documentation",
    component: () => import("@/views/docs/Documentation.vue"),
  },
  {
    path: "/example-list",
    name: "ExampleList",
    component: () => import("@/views/example/ExampleList.vue"),
  },
  {
    path: "/example-add",
    name: "ExampleAdd",
    component: () => import("@/views/example/ExampleAdd.vue"),
  },
  {
    path: "/example-edit/:id",
    name: "ExampleEdit",
    component: () => import("@/views/example/ExampleEdit.vue"),
  },
  {
    path: "/editar/:id",
    name: "Editar",
    component: () => import("@/views/user/Editar.vue"),
  },
  {
    path: "/registrar",
    name: "Registrar",
    component: () => import("../views/user/Registrar.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/user/Home.vue"),
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
