import '@/styles/normalize.css';
import '@/styles/index.less';
import 'vant/lib/index.css';

import Vue from 'vue';
import { ActionSheet, Toast } from 'vant';
import VueClipboard from 'vue-clipboard2';

import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

Vue.config.productionTip = false;

Vue.use(ActionSheet);
Vue.use(Toast);
Vue.use(VueClipboard);

let canGoBack = false;

router.afterEach((to, from) => {
  if (from.name) canGoBack = true;
  else canGoBack = false;
});

Vue.prototype.$history = {
  canGoBack: () => canGoBack,
};

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
