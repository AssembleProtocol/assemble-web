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
        h1.nav-title {{ displayTitle }}
      .form-group
        p.label {{ $t('currentRatio') }}
        p.value {{ POINT_RATIO }} P / ASM
      .form-group
        p.label {{ displayFromLabel }}
        p.value {{ displayFrom }}
      hr.divier
      .form-group
        p.label {{ displayToLabel }}
        p.value {{ displayTo }}
      p.description(v-html="$t('description')")
      button.submit-button(@click="goToExchangeResult") {{ $t('toExchange') }}
</template>

<script>
import { mapState } from 'vuex';

let fetchASMPriceTimer;

export default {
  filters: {
    displayNumber(number) {
      return Number(number).toLocaleString();
    },
  },
  computed: {
    ...mapState({
      from: (state) => state.route.query.from,
      exchangeMethod: (state) => state.route.query.exchangeMethod,
    }),
    displayTitle() {
      if (this.exchangeMethod === 'toASM') return this.$t('toASMTitle');
      return this.$t('toPointTitle');
    },
    displayFromLabel() {
      if (this.exchangeMethod === 'toASM') return this.$t('paymentPoints');
      return this.$t('paymentASM');
    },
    displayFrom() {
      if (this.exchangeMethod === 'toASM') return `${Number(this.from).toLocaleString()} P`;
      return `${Number(this.from).toLocaleString()} ASM`;
    },
    displayToLabel() {
      if (this.exchangeMethod === 'toASM') return `${this.$t('exchangeASM')}`;
      return `${this.$t('exchangePoints')}`;
    },
    displayTo() {
      if (this.exchangeMethod === 'toASM') return `${Number(this.to).toLocaleString()} ASM`;
      return `${Number(this.to).toLocaleString()} P`;
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
      if (this.exchangeMethod === 'toASM') this.to = parseFloat((this.from / this.POINT_RATIO).toFixed(0));
      else this.to = parseFloat((this.from * this.POINT_RATIO).toFixed(0));
    },
    async goToExchangeResult() {
      if (this.loading) return;
      try {
        this.loading = true;
        let query = { exchangeMethod: this.exchangeMethod };
        if (this.exchangeMethod === 'toASM') {
          const { data } = await this.$http.post('/exchange/point-to-asm', { point: Number(this.from) });
          const { point, asm, price } = data;
          query = { ...query, from: point, to: asm, price };
        } else {
          const { data } = await this.$http.post('/exchange/asm-to-point', { asm: Number(this.from) });
          const { point, asm, price } = data;
          query = { ...query, from: asm, to: point, price };
        }
        this.$router.push({
          path: this.$localePath('/exchange-center/exchange-result'),
          query,
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
    "toASMTitle": "포인트 → ASM 확인하기",
    "toPointTitle": "ASM → 포인트 확인하기",
    "currentRatio": "현재 교환비",
    "paymentPoints": "지불 예정 포인트",
    "paymentASM": "지불 예정 ASM",
    "exchangeASM": "교환 예정 ASM",
    "exchangePoints": "교환 예정 포인트",
    "toExchange": "교환하기",
    "description": "ASM은 1단위로 교환됩니다. 입력하신 포인트는 최소 단위에 맞추어 자동으로 조정되었습니다. <b>교환비의 실시간 변동에 따라 실제 교환된 양은 차이가 있을 수 있으며, 지불 포인트를 넘지않는 금액으로 자동 조정됩니다.</b> 교환 후 취소는 불가합니다."
  },
  "en": {
    "toASMTitle": "Check Point → ASM",
    "toPointTitle": "Check ASM → Point",
    "currentRatio": "Current exchange ratio",
    "paymentPoints": "Point to be paid",
    "paymentASM": "ASM to be paid",
    "exchangeASM": "ASM to be exchanged.",
    "exchangePoints": "Point to be exchanged.",
    "toExchange": "To Exchange",
    "description": "The last exchanged ASM may be different due to market price fluctuations."
  },
  "ja": {
    "toASMTitle": "Point→ASMを確認します",
    "currentRatio": "宛先",
    "paymentPoints": "支払いポイント"
  },
  "cn": {
    "toASMTitle": "确认Point→ASM",
    "currentRatio": "收件地址",
    "paymentPoints": "支付点"
  }
}
</i18n>
