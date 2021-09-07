<style lang="less" scoped>
  .exchange-center-exchange-result-container {
    color: #F7F8FA;
  }
  .nav {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }
  .nav-title {
    color: #F7F8FA;
    font-size: 24px;
    line-height: 38px;
  }
  .contents {
    padding: 0 20px;
  }
  .form-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:not(:first-child) {
      margin-top: 20px;
    }
  }
  .label {
    font-size: 18px;
    font-weight: bold;
    line-height: 55px;
    color: rgba(214, 218, 224, .6);
  }
  .value {
    font-size: 18px;
    font-weight: bold;
    line-height: 55px;
    color: #F7F8FA;
  }
  .divier {
    width: 100%;
    height: 1px;
    margin: 20px 0;
    border: 0;
    background-color: #C4C4C4;
  }
  .submit-button {
    width: 100%;
    height: 55px;
    margin-top: 20px;
    border-radius: 9px;
    background-color: #2E75FF;
    line-height: 55px;
    text-align: center;
    color: #F7F8FA;
    font-weight: bold;
  }
  .link-button-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .link-button {
    color: #2E75FF;
    line-height: 28px;
    font-weight: bold;
  }
  .description {
    margin-top: 20px;
    color: rgba(214, 218, 224, 0.6);
    font-size: 14px;
    line-height: 28px;
  }
  @media only screen and (min-width: 768px) {
    .contents {
      margin: 0 auto;
      padding: 20px;
    }
    .nav {
      margin-top: 0;
    }
  }
</style>

<template lang="pug">
  section.exchange-center-exchange-result-container
    .contents.assemble-section.dark
      header.nav
        h1.nav-title {{ $t('title') }}
      .form-group
        p.label {{ $t('incomingAddress') }}
        p.value {{ displayAddress }}
      .form-group
        p.label {{ $t('paymentPoints') }}
        p.value {{ from }} P
      .form-group
        p.label {{ $t('exchangeFee') }}
        p.value 100 P
      hr.divier
      .form-group
        p.label {{ $t('exchangeASM') }}
        p.value {{ to }} ASM
      button.submit-button(@click="goToExchangeResult") {{ $t('toExchange') }}
      p.description {{ $t('description') }}
</template>

<script>
import { mapState } from 'vuex';

let fetchASMPriceTimer;

export default {
  computed: {
    ...mapState({
      address: (state) => state.route.query.address,
      from: (state) => state.route.query.from,
    }),
    displayAddress() {
      if (!this.address) return '';
      return `${this.address.slice(0, 6)}...${this.address.slice(-4)}`;
    },
  },
  data() {
    return {
      loading: false,
      to: null,
      POINT_RATIO: null,
    };
  },
  async mounted() {
    await this.fetchASMPrice();
    fetchASMPriceTimer = setInterval(() => this.fetchASMPrice(), 1000 * 5);
  },
  destroyed() {
    clearInterval(fetchASMPriceTimer);
  },
  methods: {
    async fetchASMPrice() {
      const { data } = await this.$http.get('/config/asm-price');
      const { price } = data;
      this.POINT_RATIO = price;
      this.to = parseFloat((this.from / this.POINT_RATIO).toFixed(4));
    },
    async goToExchangeResult() {
      if (this.loading) return;
      try {
        this.loading = true;
        const { data } = await this.$http.post('/wallet/exchange/point-to-asm', { to: this.address, point: Number(this.from) });
        const { address, point, asm, price } = data;
        this.$router.push({
          path: this.$localePath('/exchange-center/exchange-result'),
          query: { address, from: point, to: asm, price },
        });
      } catch (e) {
        if (!e.response || !e.response.data) return;
        this.$toast(e.response.data.message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<i18n>
{
  "ko": {
    "title": "포인트 → ASM",
    "incomingAddress": "받는 주소",
    "paymentPoints": "지불 포인트",
    "exchangeFee": "교환 수수료",
    "exchangeASM": "교환 ASM",
    "toExchange": "교환하기",
    "description": "최종 교환된 ASM은 시세 변동에 의해 차이가 있을 수 있습니다."
  },
  "en": {
    "title": "Check Point → ASM",
    "incomingAddress": "incoming address",
    "paymentPoints": "payment points",
    "exchangeFee": "exchange fee",
    "exchangeASM": "exchagne ASM",
    "toExchange": "To Exchange",
    "description": "The last exchanged ASM may be different due to market price fluctuations."
  },
  "ja": {
    "title": "Point→ASMを確認します",
    "incomingAddress": "宛先",
    "paymentPoints": "支払いポイント",
    "exchangeFee": "交換手数料"
  },
  "cn": {
    "title": "确认Point→ASM",
    "incomingAddress": "收件地址",
    "paymentPoints": "支付点",
    "exchangeFee": "交换手续费"
  }
}
</i18n>
