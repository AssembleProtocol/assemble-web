import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Wallet from '@/views/Wallet.vue';
import Setting from '@/views/Setting.vue';
import AccountJoin from '@/views/AccountJoin.vue';
import Account from '@/views/Account.vue';
import AccountData from '@/views/AccountData.vue';
import EmailAuthentication from '@/views/EmailAuthentication.vue';
import Join from '@/views/Join.vue';
import Login from '@/views/Login.vue';

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
    path: '/setting',
    name: 'Setting',
    component: Setting,
  },
  {
    path: '/signup-to-connecting',
    name: 'AccountJoin',
    component: AccountJoin,
  },
  {
    path: '/signin-to-connecting',
    component: Account,
  },
  {
    path: '/connecting',
    component: AccountData,
  },
  {
    path: '/email-authentication',
    name: 'EmailAuthentication',
    component: EmailAuthentication,
  },
  {
    path: '/signup',
    name: 'Join',
    component: Join,
  },
  {
    path: '/signin',
    name: 'Login',
    component: Login,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
