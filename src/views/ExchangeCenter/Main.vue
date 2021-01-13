<style lang="less" scoped>
  .exchange-center-main-container {
    padding-bottom: 80px;
    color: #F7F8FA;
  }
  .section {
    padding: 20px;
    &.excahnge {
      margin-top: 20px;
    }
  }
  .section-title {
    font-size: 24px;
    line-height: 1.6;
    &.large {
      font-size: 32px;
    }
  }
  .section-description {
    margin-top: 20px;
    font-size: 14px;
    line-height: 28px;
    color: rgba(214,218,224,0.9);
  }
  .create-wallet-button {
    margin-top: 20px;
  }
  .point-box {
    margin-top: 25px;
    border-radius: 46px;
    padding: 20px 28px;
    background-color: #233248;
  }
  .point-box-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .point-box-title {
    color: #D6DAE0;
  }
  .point-box-text {
    margin-top: 10px;
  }
  .section-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .link-button {
    font-size: 14px;
    font-weight: bold;
    line-height: 28px;
    color: #6096FF;
  }
  .exchange-form-group {
    margin-top: 20px;
  }
  .exchange-input-box {
    position: relative;
  }
  .exchange-input-icon {
    display: block;
    width: 55px;
    height: 55px;
    background-repeat: no-repeat;
    &.asp {
      background-image: url(~@/assets/nav-point-asp-icon.svg);
      background-size: auto 34px;
      background-position: center 7px;
    }
    &.asm {
      background-image: url(~@/assets/nav-point-asm-icon.svg);
      background-size: auto 26px;
      background-position: center 13px;
    }
  }
  .exchange-all-input-button {
    position: absolute;
    bottom: -33px;
    right: 10px;
  }
  .exchange-icon-wrapper {
    margin: 20px 0;
  }
  .exchange-icon {
    display: block;
    width: 16px;
    height: 27px;
    margin: 0 auto;
    background-image: url(~@/assets/exchange-icon.svg);
    background-size: cover;
    background-repeat: no-repeat;
  }
  .bg-button {
    width: 100%;
    height: 55px;
    border-radius: 9px;
    background-color: #2E75FF;
    line-height: 55px;
    text-align: center;
    color: #F7F8FA;
    font-weight: bold;

    &.inactive {
      background-color: #808080;
    }
  }
  .exchange-button {
    margin-top: 30px;
  }
  .error-message {
    margin-top: 5px;
    text-align: center;
    color: #FF134C;
    font-size: 12px;
    font-weight: bold;
    line-height: 24px;
  }
</style>

<template lang="pug">
  section.exchange-center-main-container
    .empty-contents(v-if="!initLoading && !walletAvailable")
      section.section
        h1.section-title.large ASM 교환소
        p.section-description.
          어셈블 포인트와 ASM은 서로 교환할 수 있어요.#[br]
          ASM으로 교환하면, 사람들과 안전하게 주고받거나,#[br]
          암호화폐 거래소에서 거래할 수 있어요.
        p.section-description.
          현재 교환소에서 사용할 수 있는 지갑이 없어요.#[br]
          지갑은 ASM을 주고 받거나, 보관할 수 있도록 해 줍니다.#[br]
          지갑 만들기는 보통 몇 분 안에 끝나지만,#[br]
          한 두시간이 걸릴 수도 있어요.
        button.bg-button.create-wallet-button(
          :class="{ inactive: hasWallet && !walletAvailable }",
          @click="createWallet",
        ).
          {{ !hasWallet ? '지갑 만들기' : '지갑을 만들고 있습니다..' }}
    .contents(v-if="!initLoading && hasWallet && walletAvailable")
      section.section
        h1.section-title.large ASM 교환소
        p.section-description.
          어셈블 포인트와 ASM은 서로 교환할 수 있어요.#[br]
          ASM으로 교환하면, 사람들과 안전하게 주고받거나,#[br]
          암호화폐 거래소에서 거래할 수 있어요.
        .point-box
          nav.point-box-nav
            strong.point-box-title 보유 포인트
          point-text.point-box-text(:value="wallet.balance", pointType="asm")
      section.section.excahnge
        nav.section-nav
          h2.section-title 포인트 → ASM
        .exchange-form-group
          .exchange-input-box
            asm-input(:fontSize="24", :value="from", @input="calcTo")
              i.exchange-input-icon.asp(slot="prefix")
            button.link-button.exchange-all-input-button(@click="inputAllFrom") 전액 입력하기
          .exchange-icon-wrapper
            i.exchange-icon
          .exchange-input-box
            asm-input(:fontSize="24", :value="to", :readonly="true")
              i.exchange-input-icon.asm(slot="prefix")
          button.bg-button.exchange-button(@click="goToExchange") {{ displayExchangeText }}
          p.error-message(v-if="errorMessage") {{ errorMessage }}
</template>

<script>
import { mapState } from 'vuex';
import PointText from '@/components/PointText';
import AsmInput from '@/components/AsmInput';

export default {
  components: {
    PointText,
    AsmInput,
  },
  props: {
    initLoading: { type: Boolean },
    hasWallet: { type: Boolean },
    walletAvailable: { type: Boolean },
    wallet: { type: Object, default: null },
    asp: { type: [Number, String], default: null },
  },
  watch: {
    asp(v) {
      this.from = Number(v);
      this.to = this.from / 1000;
    },
  },
  computed: {
    ...mapState({
      me: (state) => state.me,
    }),
    displayExchangeText() {
      return `${this.from || 0} P를 ${this.to || 0} ASM 로 교환`;
    },
  },
  data() {
    return {
      from: null,
      to: null,
      errorMessage: null,
    };
  },
  mounted() {
    this.from = Number(this.asp);
    this.to = this.from / 1000;
  },
  methods: {
    createWallet() {
      if (this.hasWallet) return;
      this.$emit('createWallet');
    },
    calcTo() {
      this.to = this.from / 1000;
    },
    inputAllFrom() {
      this.from = Number(this.asp);
      this.calcTo();
    },
    goToExchange() {
      // if (!this.from) {
      //   this.errorMessage = '잔액이 부족합니다';
      //   return;
      // }
      this.$router.push({
        path: '/exchange-center/exchange',
        query: {
          from: this.from,
          to: this.to,
        },
      });
    },
  },
};
</script>
