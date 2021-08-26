<style lang="less" scoped>
  .exchange-center-send-confirmation-container {
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
  .subimt-button {
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
  section.exchange-center-send-confirmation-container
    .contents.assemble-section.dark
      header.nav
        h1.nav-title 최종 확인하기
      .form-group
        p.label 받는 주소
        p.value {{ displayAddress }}
      .form-group
        p.label 수량
        p.value {{ asm }} ASM
      .form-group
        p.label 수수료
        p.value 300 ASM
      hr.divier
      .form-group
        p.label 합계
        p.value {{ Number(asm) + 300 }} ASM
      button.subimt-button(@click="goToResult") 보내기
      //- p.description ASM을 보낼 때 소요되는 수수료는 네트워크 상황에 따라 달라질 수 있습니다.  이 수수료는 편의를 위해 어셈블에 의하여 최적값이 자동으로 계산되지만, 어셈블이 부과하는 것은 아닙니다. 암호화폐의 기술적 특성에 기인합니다.
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      address: (state) => state.route.query.address,
      asm: (state) => state.route.query.asm,
    }),
    displayAddress() {
      if (!this.address) return '';
      if (this.address.length > 6) return `${this.address.slice(0, 6)}...${this.address.slice(-4)}`;
      return this.address;
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  mounted() {
    this.$emit('hideNavPoint');
  },
  destroyed() {
    this.$emit('showNavPoint');
  },
  methods: {
    async goToResult() {
      if (this.loading) return;
      try {
        this.loading = true;
        await this.$http.post('/wallet/send', {
          to: this.address,
          amount: Number(this.asm),
        });
        this.$router.push({
          path: '/exchange-center/send-result',
          query: this.$route.query,
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
