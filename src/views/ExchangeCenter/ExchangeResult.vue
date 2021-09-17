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
  .divider {
    width: 100%;
    height: 1px;
    margin: 20px 0;
    border: 0;
    background-color: #C4C4C4;
  }
  .description {
    margin-top: 20px;
    color: rgba(214, 218, 224, .6);
    font-size: 14px;
    line-height: 28px;
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
        p.label {{ $t('currentRatio') }}
        p.value {{ POINT_RATIO }} P / ASM
      .form-group
        p.label {{ displayFromLabel }}
        p.value {{ displayFrom }}
      hr.divider
      .form-group
        p.label {{ displayToLabel }}
        p.value {{ displayTo }}
      p.description {{ displayDescription }}
      button.submit-button(@click="goToExchangeMain") {{ $t('returnToExcahnge') }}
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      from: (state) => state.route.query.from,
      to: (state) => state.route.query.to,
      price: (state) => state.route.query.price,
      exchangeMethod: (state) => state.route.query.exchangeMethod,
    }),
    displayFromLabel() {
      if (this.exchangeMethod === 'toASM') return `${this.$t('paymentPoints')}`;
      return `${this.$t('paymentASM')}`;
    },
    displayFrom() {
      if (this.exchangeMethod === 'toASM') return `${this.from} P`;
      return `${this.from} ASM`;
    },
    displayToLabel() {
      if (this.exchangeMethod === 'toASM') return `${this.$t('exchangeASM')}`;
      return `${this.$t('exchangePoints')}`;
    },
    displayTo() {
      if (this.exchangeMethod === 'toASM') return `${Number(this.to).toLocaleString()} ASM`;
      return `${Number(this.to).toLocaleString()} P`;
    },
    displayDescription() {
      if (this.exchangeMethod === 'toASM') return this.$t('toASMDescription');
      return this.$t('toPointDescription');
    },
  },
  async mounted() {
    this.$emit('showNavClose');
    this.$emit('hideNavPoint');
    await this.fetchASMPrice();
  },
  destroyed() {
    this.$emit('hideNavClose');
    this.$emit('showNavPoint');
  },
  data() {
    return {
      POINT_RATIO: null,
    };
  },
  methods: {
    async fetchASMPrice() {
      const { data } = await this.$http.get('/config/asm-price');
      const { price } = data;
      this.POINT_RATIO = price;
    },
    goToExchangeMain() {
      this.$emit('goExchangeHome');
    },
  },
};
</script>

<i18n>
{
  "ko": {
    "title": "교환이 완료되었습니다.",
    "currentRatio": "적용 교환비",
    "paymentPoints": "지불된 포인트",
    "paymentASM": "지불된 ASM",
    "exchangeASM": "교환된 ASM",
    "exchangePoints": "교환된 포인트",
    "toASMDescription": "교환된 ASM은 교환소의 보유 ASM에서 확인하실 수 있습니다.",
    "toPointDescription": "교환된 포인트는 교환소 상단 또는 어셈블 홈에서 확인하실 수 있습니다.",
    "returnToExcahnge": "교환소로 돌아가기"
  },
  "en": {
    "title": "The exchange has been completed.",
    "currentRatio": "Current exchange ratio",
    "paymentPoints": "payment points",
    "paymentASM": "paid ASM",
    "exchangeASM": "Exchange points",
    "exchangePoints": "Point to be exchanged.",
    "toASMDescription": "You can check the exchanged ASM on the exchange office's ASM.",
    "toPointDescription": "The exchanged points can be found at the top of the exchange or at the assemble home.",
    "returnToExcahnge": "Return to Exchange"
  },
  "ja": {
    "title": "交換が完了しました。",
    "currentRatio": "適用交換費",
    "paymentPoints": "支払われたポイント",
    "paymentASM": "支払われたASM",
    "exchangeASM": "交換されたASM",
    "exchangePoints": "交換されたポイント",
    "toASMDescription": "交換されたASMは交換所保有ASMでご確認いただけます。",
    "toPointDescription": "交換されたポイントは交換所の上段、またはアセンブルホームでご確認いただけます。",
    "returnToExcahnge": "交換所に戻る"
  },
  "cn": {
    "title": "交换已完成。",
    "currentRatio": "适用交换费",
    "paymentPoints": "已付点",
    "paymentASM": "已付的ASM",
    "exchangeASM": "交换的ASM",
    "exchangePoints": "交换的亮点",
    "toASMDescription": "交换的ASM可在交换所拥有的ASM中确认。",
    "toPointDescription": "交换的积分可在交换所上端或汇编中心确认。",
    "returnToExcahnge": "返回交换站"
  }
}
</i18n>
