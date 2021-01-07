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
    nav.nav
      button.nav-button.close(v-if="navCloseVisible", @click="goExchangeHome")
      button.nav-button.back(v-else, @click="goBack")
      .nav-right(v-if="walletAvailable && navPointVisible")
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
          :hasWallet="hasWallet",
          :walletAvailable="walletAvailable",
          :wallet="wallet",
          :asp="asp",
          @createWallet="createWallet",
          @showNavPoint="showNavPoint",
          @hideNavPoint="hideNavPoint",
          @showNavClose="showNavClose",
          @hideNavClose="hideNavClose",
          @goExchangeHome="goExchangeHome",
        )
</template>

<script>
import { mapState } from 'vuex';

let timer;

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
    hasWallet() {
      if (this.wallet) return true;
      return false;
    },
    walletAvailable() {
      if (!this.hasWallet) return false;
      if (this.wallet.available) return true;
      return false;
    },
  },
  data() {
    return {
      navPointVisible: true,
      navCloseVisible: false,
      initLoading: true,
      loading: false,
      wallet: null,
      asp: 0,
    };
  },
  mounted() {
    document.body.classList.add('dark');
    this.fetchWallet();
    timer = setInterval(this.fetchWallet, 3000);
  },
  destroyed() {
    document.body.classList.remove('dark');
    clearInterval(timer);
  },
  methods: {
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
    async createWallet() {
      if (this.hasWallet) return;
      this.wallet = { available: false };
      await this.$http.post('/wallet');
      await this.fetchWallet();
    },
    async initWallet() {
      const { data: wallet } = await this.$http.get('/wallet');
      this.wallet = wallet;
      this.initAsp();
    },
    async fetchWallet() {
      if (this.loading || this.walletAvailable) return;
      try {
        this.loading = true;
        const { data: wallet } = await this.$http.get('/wallet');
        this.wallet = wallet;
        this.fetchAsp();
        if (timer) clearInterval(timer);
      } finally {
        this.loading = false;
        this.initLoading = false;
      }
    },
    async initAsp() {
      const { data: histories } = await this.$http.get('/users/me/point-histories');
      let sum = 0;
      histories.forEach((h) => { sum += h.amount; });
      this.asp = sum;
    },
    async fetchAsp() {
      const { data: histories } = await this.$http.get('/users/me/point-histories');
      histories.forEach((h) => { this.asp += h.amount; });
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
