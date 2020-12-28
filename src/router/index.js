import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home';
import Wallet from '@/views/Wallet';
import ExchangeCenter from '@/views/ExchangeCenter';

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
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
