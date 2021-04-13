import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSimpleAlert from "vue-simple-alert";
import { createProvider } from "./vue-apollo";

Vue.config.productionTip = false;

// Filtro global
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
Vue.use(VueSimpleAlert);

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount("#app");
