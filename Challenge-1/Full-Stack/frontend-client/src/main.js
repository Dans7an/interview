import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { createProvider, createClient } from './vue-apollo';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

// create and export the apollo client here so it can be imported and used in
// other files
export const apolloClient = createClient();

new Vue({
  router,
  store,
  apolloProvider: createProvider(apolloClient),
  render: (h) => h(App),
  vuetify,

  created() {
    store.dispatch('refreshLogin');
  },
}).$mount('#app');
