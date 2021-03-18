<style lang="less" scoped>
  .exchange-center-new-wallet-container {
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
    max-width: 120px;
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
    color: rgba(214, 218, 224, .6);
    font-size: 14px;
    line-height: 28px;
  }
</style>

<template lang="pug">
  section.exchange-center-new-wallet-container
    header.header
      h1.header-title 내 교환소 지갑 만들기
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
        p.value {{ total | displayNumber }} P
      button.submit-button(@click="createWallet") 지갑 만들기
      p.description 교환소에서 간편하게 이용 가능한 지갑을 만듭니다. 지갑을 만들기 시작하면 환불이 불가합니다. 이는 암호화폐 기술적 특성에 기인합니다.
</template>

<script>
const WALLET_COST = 30000;

export default {
  name: 'NewWallet',
  props: {
    asp: { type: [Number, String], default: null },
  },
  filters: {
    displayNumber(number) {
      return Number(number).toLocaleString();
    },
  },
  computed: {
    total() {
      if (this.asp < WALLET_COST) return 0;
      return this.asp - WALLET_COST;
    },
  },
  mounted() {
    this.$emit('hideNavPoint');
  },
  destroyed() {
    this.$emit('showNavPoint');
  },
  data() {
    return {
      cost: WALLET_COST,
    };
  },
  methods: {
    createWallet() {
      this.$emit('createWallet');
      this.$router.push('/exchange-center/new-wallet-result');
    },
  },
};
</script>
