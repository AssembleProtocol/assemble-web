import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Wallet from '@/views/Wallet.vue';
import Setting from '@/views/Setting.vue';
import signupToConnecting from '@/views/signup-to-connecting.vue';
import signinToConnecting from '@/views/signin-to-connecting.vue';
import Connecting from '@/views/connecting.vue';
import EmailAuthentication from '@/views/EmailAuthentication.vue';
import Signup from '@/views/signup.vue';
import Signin from '@/views/signin.vue';

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
    name: 'signup-to-connecting',
    component: signupToConnecting,
  },
  {
    path: '/signin-to-connecting',
    name: 'signin-to-connecting',
    component: signinToConnecting,
  },
  {
    path: '/connecting',
    name: 'Connecting',
    component: Connecting,
  },
  {
    path: '/email-authentication',
    name: 'EmailAuthentication',
    component: EmailAuthentication,
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
