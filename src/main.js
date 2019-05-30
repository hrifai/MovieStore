// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import Vuetify from "vuetify";
import router from "./router/index";
import "vuetify/dist/vuetify.min.css";
import VueRouter from "vue-router";
import VueFire from 'vuefire'

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(VueFire);
Vue.use(VueRouter);

window.v = new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
