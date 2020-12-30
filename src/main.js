import '@/styles/normalize.css';
import '@/styles/index.less';
import 'vant/lib/index.css';

import Vue from 'vue';
import { ActionSheet, Toast } from 'vant';
import VueClipboard from 'vue-clipboard2';
import VueLocalstorage from 'vue-localstorage';
import { sync } from 'vuex-router-sync';
import axios from 'axios';

import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

Vue.config.productionTip = false;

Vue.use(ActionSheet);
Vue.use(Toast);
Vue.use(VueClipboard);
Vue.use(VueLocalstorage);

const token = Vue.localStorage.get('token');

if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}
axios.defaults.baseURL = 'https://api.assemble.sta1.com';

Vue.prototype.$http = axios;

const r = router(store, Vue.prototype.$http);
let canGoBack = false;

r.afterEach((to, from) => {
  if (from.name) canGoBack = true;
  else canGoBack = false;
});

Vue.prototype.$history = {
  canGoBack: () => canGoBack,
};

sync(store, r);

new Vue({
  router: r,
  store,
  render: (h) => h(App),
}).$mount('#app');
