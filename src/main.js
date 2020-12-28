import '@/styles/normalize.css';
import '@/styles/index.less';
import 'vant/lib/index.css';

import Vue from 'vue';
import { ActionSheet } from 'vant';

import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

let canGoBack = false;

Vue.config.productionTip = false;

Vue.use(ActionSheet);

router.afterEach((_, from) => {
  if (from.name) canGoBack = true;
});

Vue.prototype.$history = {
  canGoBack: () => canGoBack,
};

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
