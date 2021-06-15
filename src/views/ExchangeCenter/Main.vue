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
  .point-box-nav-right {
    display: flex;
    align-items: center;
  }
  .point-box-nav-button {
    width: 32px;
    height: 32px;
    border-radius: 12px;
    background-color: #314662;
    background-size: 24px;
    background-position: center;
    background-repeat: no-repeat;
    &:not(:first-child) {
      margin-left: 20px;
    }
    &.send { background-image: url(~@/assets/send.svg); }
    &.receive { background-image: url(~@/assets/receive.svg); }
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
  .point-ratio-text {
    font-size: 14px;
    color: #FFC42C;
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
    &.disabled {
      opacity: 0.6;
    }
  }
  .error-message {
    margin-top: 5px;
    text-align: center;
    color: #FF134C;
    font-size: 12px;
    font-weight: bold;
    line-height: 24px;
  }
  .transaction-list {
    display: flex;
    flex-direction: column;
    margin: 0 -20px;
  }
  .shortcut-button-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 10px 0 -10px 0;
  }
  .shortcut-button {
    margin: 10px 0;
    font-size: 18px;
    font-weight: bold;
    line-height: 36px;
    color: #6096FF;
  }
</style>

<template lang="pug">
  section.exchange-center-main-container
    .contents(v-if="!initLoading")
      section.section
        h1.section-title.large ASM 교환소
        p.section-description.
          어셈블 포인트와 ASM은 서로 교환할 수 있어요.#[br]
          ASM으로 교환하면, 사람들과 안전하게 주고받거나,#[br]
          암호화폐 거래소에서 거래할 수 있어요.
        .point-box
          nav.point-box-nav
            strong.point-box-title 보유 ASM
            .point-box-nav-right
              button.point-box-nav-button.send(@click="goToSendAsm")
              button.point-box-nav-button.receive(@click="showReceivingAsm")
          point-text.point-box-text(:value="wallet.balance", pointType="asm")
      section.section
        nav.section-nav
          h2.section-title 트랜잭션
          router-link.link-button(to="/exchange-center/transactions") 모두 보기
        .transaction-list
          transaction-item(
            v-for="walletHistory in walletHistories",
            :key="walletHistory._id",
            :transaction="walletHistory",
          )
      section.section.excahnge
        nav.section-nav
          h2.section-title 포인트 → ASM
          p.point-ratio-text {{ POINT_RATIO }}P / ASM
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
          button.bg-button.exchange-button(:class="{ disabled: notEnoughAsp }", @click="goToExchange") {{ displayExchangeText }}
          p.error-message(v-if="errorMessage") {{ errorMessage }}
      section.section.shortcut
        nav.section-nav
          h2.section-title 바로가기
        .shortcut-button-group
          button.shortcut-button(@click="goToSendAsm") ASM 보내기
          button.shortcut-button(@click="showReceivingAsm") ASM 받기
          button.shortcut-button(@click="showReceivingAsm") ASM 입금 주소 보기
          a.shortcut-button(:href="`https://etherscan.io/address/${myWalletAddress}#tokentxns`", target="_blank") Etherscan에서 보기

    receiving-asm-action-sheet(
      :address="myWalletAddress",
      :visible="receivingAsmVisible",
      @close="closeReceivingAsm",
    )
</template>

<script>
import { mapState } from 'vuex';
import PointText from '@/components/PointText';
import AsmInput from '@/components/AsmInput';
import ReceivingAsmActionSheet from './components/ReceivingAsmActionSheet';
import TransactionItem from './components/TransactionItem';

const POINT_RATIO = 60;
const FEE = 100;

export default {
  components: {
    PointText,
    AsmInput,
    ReceivingAsmActionSheet,
    TransactionItem,
  },
  props: {
    initLoading: { type: Boolean },
    wallet: { type: Object, default: null },
    asp: { type: [Number, String], default: null },
    walletHistories: { type: Array, default: () => [] },
  },
  watch: {
    asp(v) {
      this.from = Number(v);
      this.to = parseFloat((this.from / POINT_RATIO).toFixed(4));
    },
    notEnoughAsp(v) {
      if (v) this.errorMessage = '교환에는 최소 1100P가 필요합니다.';
      else this.errorMessage = null;
    },
  },
  computed: {
    ...mapState({
      me: (state) => state.me,
    }),
    notEnoughAsp() {
      if (this.asp < 1100) return true;
      if (this.from < 1100) return true;
      return false;
    },
    displayExchangeText() {
      if (this.notEnoughAsp) return '잔여 포인트 부족으로 교환 불가';
      return `${this.from || 0} P를 ${this.to || 0} ASM 로 교환`;
    },
    myWalletAddress() {
      if (!this.me) return '';
      return this.me.walletAddress;
    },
  },
  data() {
    return {
      receivingAsmVisible: false,
      from: null,
      to: null,
      errorMessage: null,
      POINT_RATIO,
    };
  },
  mounted() {
    const from = Number(this.asp - FEE);
    if (from > 0) this.from = from;
    else this.from = 0;
    this.to = parseFloat((this.from / POINT_RATIO).toFixed(4));
  },
  methods: {
    calcTo(value) {
      if (value) this.from = Number(value);
      this.to = parseFloat((this.from / POINT_RATIO).toFixed(4));
    },
    inputAllFrom() {
      const from = Number(this.asp - FEE);
      if (from > 0) this.from = from;
      else this.from = 0;
      this.calcTo();
    },
    goToExchange() {
      if (this.notEnoughAsp) return;
      if (!this.from) {
        this.errorMessage = '잔액이 부족합니다';
        return;
      }
      this.$router.push({
        path: '/exchange-center/exchange',
        query: {
          from: this.from,
          to: this.to,
        },
      });
    },
    goToSendAsm() {
      this.$router.push('/exchange-center/send');
    },
    showReceivingAsm() {
      this.receivingAsmVisible = true;
    },
    closeReceivingAsm() {
      this.receivingAsmVisible = false;
    },
  },
};
</script>
