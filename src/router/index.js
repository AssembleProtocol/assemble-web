import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home';
import Wallet from '@/views/Wallet';
import ExchangeCenter from '@/views/ExchangeCenter';
import ExchangeCenterMain from '@/views/ExchangeCenter/Main';
import ExchangeCenterSend from '@/views/ExchangeCenter/Send';
import ExchangeCenterSendConfirmation from '@/views/ExchangeCenter/SendConfirmation';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/wallet',
    component: Wallet,
  },
  {
    path: '/exchange-center',
    component: ExchangeCenter,
    children: [
      {
        path: '/',
        component: ExchangeCenterMain,
      },
      {
        path: 'send',
        component: ExchangeCenterSend,
      },
      {
        path: 'send-confirmation',
        component: ExchangeCenterSendConfirmation,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
