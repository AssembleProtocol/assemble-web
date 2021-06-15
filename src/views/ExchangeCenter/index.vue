<style lang="less" scoped>
  .exchange-center-container {
    padding-bottom: 80px;
    color: #F7F8FA;
  }
  .nav {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 80px;
    padding: 0 20px;
    background-color: #000;
    z-index: 999;
  }
  .nav-button {
    width: 24px;
    height: 24px;
    background-size: cover;
    background-repeat: no-repeat;
    &.back {
      background-image: url(~@/assets/chevron-left.svg);
    }
    &.close {
      background-image: url(~@/assets/close-white.svg);
    }
  }
  .nav-right {
    display: flex;
    align-items: center;
  }
  .nav-point-box {
    display: flex;
    align-items: center;
    border-radius: 7px;
    background-color: #233248;
    overflow: hidden;
    &:not(:first-child) {
      margin-left: 10px;
    }
  }
  .nav-point-icon {
    width: 22px;
    height: 24px;
    background-position: center;
    background-repeat: no-repeat;
    &.asp {
      background-image: url(~@/assets/nav-point-asp-icon.svg);
      background-size: auto 19px;
    }
    &.asm {
      background-image: url(~@/assets/nav-point-asm-icon.svg);
      background-size: auto 14px;
    }
  }
  .nav-point-text {
    border-left: 1px solid #000;
    padding: 0 5px;
    font-weight: bold;
    font-size: 14px;
    line-height: 24px;
    &.asp {
      letter-spacing: 0.05em;
    }
    &.asm {
      letter-spacing: 0.1em;
    }
  }
  .page-enter-active, .page-leave-active {
    transition: opacity 200ms, transform 200ms ease;
  }
  .page-enter, .page-leave-to {
    opacity: 0;
    transform: translateY(0.5%);
  }
</style>

<template lang="pug">
  section.exchange-center-container
    nav.nav(v-if="!initLoading")
      button.nav-button.close(v-if="navCloseVisible", @click="goExchangeHome")
      button.nav-button.back(v-else, @click="goBack")
      .nav-right(v-if="navPointVisible")
        .nav-point-box
          i.nav-point-icon.asp
          p.nav-point-text.asp {{ asp | displayNumber }}
        .nav-point-box
          i.nav-point-icon.asm
          p.nav-point-text.asm {{ wallet.balance | displayNumber }}
    article.article
      transition(name="page", mode="out-in")
        router-view(
          :key="routeName",
          :initLoading="initLoading",
          :wallet="wallet",
          :asp="asp",
          :walletHistories="walletHistories",
          @showNavPoint="showNavPoint",
          @hideNavPoint="hideNavPoint",
          @showNavClose="showNavClose",
          @hideNavClose="hideNavClose",
          @goExchangeHome="goExchangeHome",
        )
</template>

<script>
import { mapState } from 'vuex';

export default {
  filters: {
    displayNumber(number) {
      return Number(number).toLocaleString();
    },
  },
  computed: {
    ...mapState({
      routeName: (state) => state.route.name,
    }),
  },
  data() {
    return {
      navPointVisible: true,
      navCloseVisible: false,
      initLoading: true,
      loading: false,
      wallet: null,
      asp: 0,
      walletHistories: null,
    };
  },
  async mounted() {
    document.body.classList.add('dark');
    document.getElementById('app').classList.add('dark');
    this.initAsp();
    await this.fetchWallet();
    await this.fetchHistories();
  },
  destroyed() {
    document.body.classList.remove('dark');
    document.getElementById('app').classList.remove('dark');
  },
  methods: {
    async fetchHistories() {
      const { data: walletHistories } = await this.$http.get('/wallet/histories', { params: { size: 5 } });
      this.walletHistories = walletHistories;
    },
    goExchangeHome() {
      this.initWallet();
      this.$router.push('/exchange-center');
    },
    goBack() {
      if (this.routeName === 'ExchangeCenterMain') this.$router.push('/');
      else if (this.$history.canGoBack()) this.$router.back();
      else if (window.s3app) window.close();
      else this.$router.push('/');
    },
    async initWallet() {
      const { data: wallet } = await this.$http.get('/wallet');
      this.wallet = wallet;
      this.initAsp();
    },
    async fetchWallet() {
      if (this.loading) return;
      try {
        this.loading = true;
        const { data: wallet } = await this.$http.get('/wallet');
        this.wallet = wallet;
        this.initAsp();
      } finally {
        this.loading = false;
        this.initLoading = false;
      }
    },
    async initAsp() {
      const { data } = await this.$http.get('/users/me/points');
      const { points } = data;
      this.asp = points;
    },
    showNavPoint() {
      this.navPointVisible = true;
    },
    hideNavPoint() {
      this.navPointVisible = false;
    },
    showNavClose() {
      this.navCloseVisible = true;
    },
    hideNavClose() {
      this.navCloseVisible = false;
    },
  },
};
</script>
