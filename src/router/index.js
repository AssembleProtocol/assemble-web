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
    name: 'Home',
    component: Home,
  },
  {
    path: '/wallet',
    name: 'Wallet',
    component: Wallet,
  },
  {
    path: '/exchange-center',
    name: 'ExchangeCenter',
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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
