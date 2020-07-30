import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { formatDate, formatInputDate, number } from "./filters";

Vue.config.productionTip = false;

Vue.filter("date", formatDate);
Vue.filter("inputDate", formatInputDate);
Vue.filter("number", number);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
