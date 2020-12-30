import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/views/Home';
import ExchangeCenter from '@/views/ExchangeCenter';
import ExchangeCenterMain from '@/views/ExchangeCenter/Main';
import ExchangeCenterSend from '@/views/ExchangeCenter/Send';
import ExchangeCenterSendConfirmation from '@/views/ExchangeCenter/SendConfirmation';
import Setting from '@/views/Setting';
import SignupToConnecting from '@/views/SignupToConnecting';
import SigninToConnecting from '@/views/SigninToConnecting';
import Connecting from '@/views/Connecting';
import EmailAuthentication from '@/views/EmailAuthentication';
import Signup from '@/views/Signup';
import Signin from '@/views/Signin';

Vue.use(VueRouter);

export default function (store, http) {
  const checkToken = async function beforeEnter(to, from, next) {
    if (store.state.me) return next();
    if (localStorage.token) {
      try {
        await store.dispatch('fetchMe');
      } catch (e) {
        localStorage.removeItem('token');
        http.defaults.headers.common.Authorization = '';
      }
    } else return next('/signin');
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
    {
      path: '/setting',
      name: 'Setting',
      beforeEnter: checkToken,
      component: Setting,
    },
    {
      path: '/signup-to-Cg',
      name: 'SignupToConnecting',
      component: SignupToConnecting,
    },
    {
      path: '/signin-to-connecting',
      name: 'SigninToConnecting',
      component: SigninToConnecting,
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
      name: 'Signup',
      component: Signup,
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin,
    },
  ];

  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
  });
}
