import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home';
import ExchangeCenter from '@/views/ExchangeCenter';
import ExchangeCenterMain from '@/views/ExchangeCenter/Main';
import ExchangeCenterSend from '@/views/ExchangeCenter/Send';
import ExchangeCenterSendConfirmation from '@/views/ExchangeCenter/SendConfirmation';

Vue.use(VueRouter);

export default function (store, http) {
  const checkToken = async function beforeEnter(to, from, next) {
    if (localStorage.token) {
      const me = await store.dispatch('fetchMe');
      if (!me) {
        localStorage.removeItem('token');
        http.defaults.headers.common.Authorization = '';
      }
    }
    return next();
  };

  const routes = [
    {
      path: '/',
      name: 'Home',
      beforeEnter: checkToken,
      component: Home,
    },
    {
      path: '/exchange-center',
      name: 'ExchangeCenter',
      beforeEnter: checkToken,
      component: ExchangeCenter,
      children: [
        {
          path: '/',
          name: 'ExchangeCenterMain',
          component: ExchangeCenterMain,
        },
        {
          path: 'send',
          name: 'ExchangeCenterSend',
          component: ExchangeCenterSend,
        },
        {
          path: 'send-confirmation',
          name: 'ExchangeCenterSendConfirmation',
          component: ExchangeCenterSendConfirmation,
        },
      ],
    },
  ];

  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
  });
}
