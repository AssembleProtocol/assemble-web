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
  @media only screen and (min-width: 768px) {
    .nav {
      position: inherit;
      height: 120px;
      padding: 0 80px;
      background-color: transparent;
    }
  }
</style>

<template lang="pug">
  section.exchange-center-container
    nav.nav
      button.nav-button.close(v-if="navCloseVisible", @click="goExchangeHome")
      button.nav-button.back(v-else, @click="goBack")
      .nav-right(v-if="navPointVisible")
        .nav-point-box
          i.nav-point-icon.asp
          p.nav-point-text.asp {{ asp | displayNumber }}
        .nav-point-box
          i.nav-point-icon.asm
          p.nav-point-text.asm {{ asmBalance | displayNumber }}
    article.article
      transition(name="page", mode="out-in")
        router-view(
          :key="routeName",
          :initLoading="initLoading",
          :asmBalance="asmBalance",
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
      asmBalance: null,
      asp: 0,
      walletHistories: null,
    };
  },
  async mounted() {
    document.body.classList.add('dark');
    document.getElementById('app').classList.add('dark');
    this.initAsp();
    await this.fetchASMBalance();
    await this.fetchHistories();
  },
  destroyed() {
    document.body.classList.remove('dark');
    document.getElementById('app').classList.remove('dark');
  },
  methods: {
    async fetchHistories() {
      const { data: walletHistories } = await this.$http.get('/exchange/transactions', { params: { offset: 0, limit: 5 } });
      this.walletHistories = walletHistories;
    },
    async goExchangeHome() {
      await this.initASMBalance();
      await this.fetchHistories();
      this.$router.push(this.$localePath('/exchange-center'));
    },
    goBack() {
      if (this.routeName === 'ExchangeCenterMain') this.$router.push(this.$localePath('/'));
      else if (this.$history.canGoBack()) this.$router.back();
      else if (window.s3app) window.close();
      else this.$router.push(this.$localePath('/'));
    },
    async initASMBalance() {
      const { data } = await this.$http.get('/exchange/me/asm-balance');
      const { asmBalance } = data;
      this.asmBalance = asmBalance;
      this.initAsp();
    },
    async fetchASMBalance() {
      if (this.loading) return;
      try {
        this.loading = true;
        const { data } = await this.$http.get('exchange/me/asm-balance');
        const { asmBalance } = data;
        this.asmBalance = asmBalance;
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
    doClose() {
      this.$refs.actionSheet.doClose();
    },
  },
};
</script>
