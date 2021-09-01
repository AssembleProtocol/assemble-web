import '@/styles/normalize.css';
import '@/styles/index.less';
import 'vant/lib/index.css';
import 'element-ui/lib/theme-chalk/index.css';

import Vue from 'vue';
import { ActionSheet, Toast } from 'vant';
import VueClipboard from 'vue-clipboard2';
import VueLocalstorage from 'vue-localstorage';
import { sync } from 'vuex-router-sync';
import axios from 'axios';
import VueI18n from 'vue-i18n';
import ElementUI from 'element-ui';

import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import LocaleRouterLink from '@/components/LocaleRouterLink';
import { createProvider } from './vue-apollo';

Vue.config.productionTip = false;

Vue.use(ActionSheet);
Vue.use(Toast);
Vue.use(VueClipboard);
Vue.use(VueLocalstorage);
Vue.use(VueI18n);
Vue.use(ElementUI);
Vue.component('locale-router-link', LocaleRouterLink);

const token = Vue.localStorage.get('token');

if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}
axios.defaults.baseURL = `${process.env.VUE_APP_API_BASE}`;

const i18n = new VueI18n({
  locale: 'ko',
  defaultLocale: 'ko',
});

Vue.prototype.$http = axios;

Vue.prototype.$localePath = function localePath(to) {
  if (typeof to !== 'string') return to;
  let locale;
  if (this.$i18n.locale) locale = this.$i18n.locale;
  else locale = 'ko';
  return `/${locale}/${to.replace(/^\/|\/$/g, '')}`;
};

const r = router(store, Vue.prototype.$http, i18n);
let canGoBack = false;

r.afterEach((to, from) => {
  if (from.name) canGoBack = true;
  else canGoBack = false;
  if (window.s3app && window.s3app.onRouteNameChange) {
    const { path, name } = to;
    window.s3app.onRouteNameChange({ path, name });
  }
});

Vue.prototype.$history = {
  canGoBack: () => canGoBack,
};

sync(store, r);

new Vue({
  i18n,
  router: r,
  store,
  apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount('#app');
