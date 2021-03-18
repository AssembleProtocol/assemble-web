<style lang="less" scoped>
  .exchange-center-new-wallet-result-container {
    color: #F7F8FA;
  }
  .header {
    display: flex;
    align-items: center;
    margin-top: 20px;
    padding: 0 20px;
  }
  .header-title {
    color: #F7F8FA;
    font-size: 24px;
    line-height: 38px;
  }
  .contents {
    margin-top: 20px;
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
  .description {
    margin-top: 20px;
    color: #D6DAE0;
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
</style>

<template lang="pug">
  section.exchange-center-new-wallet-result-container
    header.header
      h1.header-title 접수되었습니다
    .contents
      .form-group
        p.label 보유 포인트
        p.value {{ asp | displayNumber }} P
      .form-group
        p.label 지갑
        p.value - {{ cost | displayNumber }} P
      hr.divier
      .form-group
        p.label 합계
        p.value {{ asp | displayNumber }} P
      p.description 지갑을 생성하고 있습니다. 보통 몇 분 안에 끝나지만, 한 두시간이 걸릴 수도 있습니다. 이러한 지연은 암호화폐의 기술적 특성으로 발생됩니다.
      button.submit-button(@click="goToExchangeMain") 교환소로 돌아가기
</template>

<script>
const WALLET_COST = 30000;

export default {
  name: 'NewWalletResult',
  props: {
    asp: { type: [Number, String], default: null },
  },
  filters: {
    displayNumber(number) {
      return Number(number).toLocaleString();
    },
  },
  mounted() {
    this.$emit('showNavClose');
    this.$emit('hideNavPoint');
  },
  destroyed() {
    this.$emit('hideNavClose');
    this.$emit('showNavPoint');
  },
  data() {
    return {
      cost: WALLET_COST,
    };
  },
  methods: {
    goToExchangeMain() {
      this.$emit('goExchangeHome');
    },
  },
};
</script>
