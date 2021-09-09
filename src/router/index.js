import Vue from 'vue';
import VueRouter from 'vue-router';
import getBrowserLocale from '@/utils/get-browser-locale';

import Home from '@/views/Home';
import PointHistories from '@/views/PointHistories';

import Setting from '@/views/Setting';
import Profile from '@/views/Profile';
import SignupToConnecting from '@/views/SignupToConnecting';
import SigninToConnecting from '@/views/SigninToConnecting';
import Connecting from '@/views/Connecting';
import EmailVerification from '@/views/EmailVerification';
import Signup from '@/views/Signup';
import Signin from '@/views/Signin';
import ChangePassword from '@/views/ChangePassword';
import RequestResetPassword from '@/views/RequestResetPassword';
import ChangeEmail from '@/views/ChangeEmail';

import ExchangeCenter from '@/views/ExchangeCenter';
import ExchangeCenterMain from '@/views/ExchangeCenter/Main';

import ExchangeCenterSend from '@/views/ExchangeCenter/Send';
import ExchangeCenterSendConfirmation from '@/views/ExchangeCenter/SendConfirmation';
import ExchangeCenterSendResult from '@/views/ExchangeCenter/SendResult';

import ExchangeCenterExchange from '@/views/ExchangeCenter/Exchange';
import ExchangeCenterExchangeConfirmation from '@/views/ExchangeCenter/ExchangeConfirmation';
import ExchangeCenterExchangeResult from '@/views/ExchangeCenter/ExchangeResult';

import ExchangeCenterNewWallet from '@/views/ExchangeCenter/NewWallet';
import ExchangeCenterNewWalletResult from '@/views/ExchangeCenter/NewWalletResult';

import ExchangeCenterTransactions from '@/views/ExchangeCenter/Transactions';
import StoreProductDetail from '@/views/Store/Product';
import StoreOrder from '@/views/Store/Order';
import StoreOrderComplete from '@/views/Store/OrderComplete';
import StoreTicket from '@/views/Store/Ticket';
import StoreResendTicketComplete from '@/views/Store/ResendTicketComplete';

Vue.use(VueRouter);

export default function (store, vuePrototype, i18n) {
  const { $http, $localePath } = vuePrototype;
  const checkToken = async function beforeEnter(to, from, next) {
    if (store.state.me) return next();
    const locale = i18n.locale || 'ko';
    if (localStorage.token) {
      try {
        await store.dispatch('fetchMe');
        if (!store.state.me.emailVerified) {
          return next({
            path: `/${locale}/email-verification`,
            query: { email: store.state.me.email },
          });
        }
      } catch (e) {
        localStorage.removeItem('token');
        $http.defaults.headers.common.Authorization = '';
        return next(`/${locale}/signin`);
      }
    } else return next(`/${locale}/signin`);
    return next();
  };

  const routes = [
    {
      path: '',
      name: 'Home',
      beforeEnter: checkToken,
      component: Home,
    },
    {
      path: 'point-histories',
      name: 'PointHistories',
      beforeEnter: checkToken,
      component: PointHistories,
    },
    {
      path: 'setting',
      name: 'Setting',
      beforeEnter: checkToken,
      component: Setting,
    },
    {
      path: 'profile',
      name: 'Profile',
      beforeEnter: checkToken,
      component: Profile,
    },
    {
      path: 'signup-to-connecting',
      name: 'SignupToConnecting',
      component: SignupToConnecting,
    },
    {
      path: 'signin-to-connecting',
      name: 'SigninToConnecting',
      component: SigninToConnecting,
    },
    {
      path: 'change-password',
      name: 'ChangePassword',
      beforeEnter: checkToken,
      component: ChangePassword,
    },
    {
      path: 'request-reset-password',
      name: 'RequestResetPassword',
      component: RequestResetPassword,
    },
    {
      path: 'change-email',
      name: 'ChangeEmail',
      beforeEnter: checkToken,
      component: ChangeEmail,
    },
    {
      path: 'connecting',
      name: 'Connecting',
      component: Connecting,
    },
    {
      path: 'email-verification',
      name: 'EmailVerification',
      component: EmailVerification,
    },
    {
      path: 'signup',
      name: 'Signup',
      component: Signup,
    },
    {
      path: 'signin',
      name: 'Signin',
      component: Signin,
    },
    {
      path: 'exchange-center',
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
        {
          path: 'send-result',
          name: 'ExchangeCenterSendResult',
          component: ExchangeCenterSendResult,
        },
        {
          path: 'exchange',
          name: 'ExchangeCenterExchange',
          component: ExchangeCenterExchange,
        },
        {
          path: 'exchange-confirmation',
          name: 'ExchangeCenterExchangeConfirmation',
          component: ExchangeCenterExchangeConfirmation,
        },
        {
          path: 'exchange-result',
          name: 'ExchangeCenterExchangeResult',
          component: ExchangeCenterExchangeResult,
        },
        {
          path: 'new-wallet',
          name: 'ExchangeCenterNewWallet',
          component: ExchangeCenterNewWallet,
        },
        {
          path: 'new-wallet-result',
          name: 'ExchangeCenterNewWalletResult',
          component: ExchangeCenterNewWalletResult,
        },
        {
          path: 'transactions',
          name: 'ExchangeCenterTransactions',
          component: ExchangeCenterTransactions,
        },
      ],
    },
    {
      path: 'store/products/:productId',
      name: 'StoreProductDetail',
      component: StoreProductDetail,
      beforeEnter: checkToken,
      props: (route) => ({ productId: route.params.productId }),
    },
    {
      path: 'store/orders/:productId',
      name: 'StoreOrder',
      component: StoreOrder,
      beforeEnter: checkToken,
      props: (route) => ({ productId: route.params.productId }),
    },
    {
      path: 'store/order-complete/:purchasedId',
      name: 'StoreOrderComplete',
      component: StoreOrderComplete,
      props: (route) => ({ purchasedId: route.params.purchasedId }),
    },
    {
      path: 'store/tickets',
      name: 'StoreTicket',
      beforeEnter: checkToken,
      component: StoreTicket,
    },
    {
      path: 'store/resend-ticket-complete/:purchasedId',
      name: 'StoreResendTicketComplete',
      component: StoreResendTicketComplete,
      beforeEnter: checkToken,
      props: (route) => ({ purchasedId: route.params.purchasedId }),
    },
  ];

  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/:locale',
        component: {
          render: (h) => h('router-view'),
        },
        beforeEnter: (to, from, next) => {
          const { locale } = to.params;
          const supportedLocales = process.env.VUE_APP_I18N_SUPPORTED_LOCALE.split(',');
          // TODO: locale 없이 들어온 path들에 locale 적용
          if (!supportedLocales.includes(locale)) return next($localePath(to.fullPath), i18n.locale);
          if (i18n.locale !== locale) i18n.locale = locale;
          return next();
        },
        children: routes,
      },
      {
        path: '*',
        redirect: () => {
          const currentBrowserLocale = getBrowserLocale({ countryCodeOnly: true });
          let locale;
          if (currentBrowserLocale) locale = currentBrowserLocale;
          else locale = 'ko';
          return `/${locale}`;
        },
      },
    ],
    // 200ms page transition
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(savedPosition);
          }, 200);
        });
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ x: 0, y: 0 });
        }, 200);
      });
    },
  });
}
