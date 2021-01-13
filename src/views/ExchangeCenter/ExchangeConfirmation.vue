<style lang="less" scoped>
  .exchange-center-exchange-result-container {
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
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
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
</style>

<template lang="pug">
  section.exchange-center-exchange-result-container
    header.header
      h1.header-title 포인트 → ASM 확인하기
    .contents
      .form-group
        p.label 받는 주소
        p.value {{ displayAddress }}
      .form-group
        p.label 지불 포인트
        p.value {{ from }} P
      hr.divier
      .form-group
        p.label 교환 ASM
        p.value {{ to }} ASM
      button.submit-button(@click="goToExchangeResult") 교환하기
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      address: (state) => state.route.query.address,
      from: (state) => state.route.query.from,
      to: (state) => state.route.query.to,
    }),
    displayAddress() {
      if (!this.address) return '';
      return `${this.address.slice(0, 6)}...${this.address.slice(-4)}`;
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
  methods: {
    goToExchangeResult() {
      this.$router.push({
        path: '/exchange-center/exchange-result',
        query: { address: this.address, from: this.from, to: this.to },
      });
    },
  },
};
</script>
