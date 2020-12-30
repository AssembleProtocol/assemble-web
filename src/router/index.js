import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/views/Home';
import ExchangeCenter from '@/views/ExchangeCenter';
import ExchangeCenterMain from '@/views/ExchangeCenter/Main';
import ExchangeCenterSend from '@/views/ExchangeCenter/Send';
import ExchangeCenterSendConfirmation from '@/views/ExchangeCenter/SendConfirmation';
import Setting from '@/views/Setting';
import signupToConnecting from '@/views/signup-to-connecting';
import signinToConnecting from '@/views/signin-to-connecting';
import Connecting from '@/views/connecting';
import EmailAuthentication from '@/views/EmailAuthentication';
import Signup from '@/views/signup';
import Signin from '@/views/signin';

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

  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
  });
}
