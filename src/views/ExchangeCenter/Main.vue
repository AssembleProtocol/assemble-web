<style lang="less" scoped>
  .exchange-center-main-container {
    padding-bottom: 80px;
    color: #F7F8FA;
  }
  .section {
    padding: 20px;
  }
  .exchange-section {
    margin-top: 20px;
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
  .wallet-loading-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
  .wallet-loading {
    background-color: #314662;
    border: 4px solid #2E75FF;
    width: 30px;
    height: 30px;
    top: 30px;
    left: 30px;
    animation: loading 2s infinite ease-in-out;
  }
  @keyframes loading {
    0% {
      border-radius: 0;
      transform: rotate(0deg);
    }

    50% {
      border-radius: 50%;
      border-width: 6px;
    }

    100% {
      border-radius: 0;
      transform: rotate(720deg);
    }
  }
  .wallet-loading-text {
    margin-top: 20px;
    font-size: 14px;
    font-weight: bold;
    line-height: 28px;
    color: #F7F8FA;
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
  .point-box-nav-text-button {
    height: 32px;
    line-height: 32px;
    border-radius: 12px;
    padding: 0 10px;
    background-color: #314662;
    color: #6096FF;
    font-weight: bold;
  }
  .wallet-description {
    margin-top: 10px;
    font-size: 14px;
    font-weight: bold;
    line-height: 28px;
    color: #F7F8FA;
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
  @media only screen and (min-width: 768px) {
    .contents {
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }
    .desktop-section {
      margin-left: 40px;
    }
    .exchange-section, .shortcut-section {
      margin-top: 20px;
    }
  }
</style>

<template lang="pug">
  section.exchange-center-main-container
    .contents(v-if="!initLoading")
      section.section.assemble-section.dark
        h1.section-title.large ASM 교환소
        p.section-description.
          어셈블 포인트와 ASM은 서로 교환할 수 있어요.#[br]
          ASM으로 교환하면, 사람들과 안전하게 주고받거나,#[br]
          암호화폐 거래소에서 거래할 수 있어요.
        .point-box(v-if="hasWallet && walletAvailable")
          nav.point-box-nav
            strong.point-box-title 보유 ASM
            .point-box-nav-right
              button.point-box-nav-button.send(@click="goToSendAsm")
              button.point-box-nav-button.receive(@click="showReceivingAsm")
          point-text.point-box-text(:value="wallet.balance", pointType="asm")
        .point-box(v-else-if="hasWallet && !walletAvailable")
          nav.point-box-nav
            strong.point-box-title 내 교환소 지갑
          .wallet-loading-wrapper
            .wallet-loading
            p.wallet-loading-text 만드는 중
        .point-box(v-else)
          nav.point-box-nav
            strong.point-box-title 내 교환소 지갑
            .point-box-nav-right
              button.point-box-nav-text-button(@click="goToCreateWallet") 만들기
          p.wallet-description 교환소 지갑을 만들면, 앱을 떠나지 않고 이곳에서 간편하게 ASM을 관리할 수 있습니다. 지갑 생성에는 30,000 포인트가 소요됩니다.
      section.desktop-section
        section.section.transaction-section.assemble-section.dark(v-if="hasWallet && walletAvailable && (walletHistories && walletHistories.length > 0)")
          nav.section-nav
            h2.section-title 트랜잭션
            router-link.link-button(to="/exchange-center/transactions") 모두 보기
          .transaction-list
            transaction-item(
              v-for="walletHistory in walletHistories",
              :key="walletHistory._id",
              :transaction="walletHistory",
            )
        section.section.exchange-section.assemble-section.dark
          nav.section-nav
            h2.section-title 포인트 → ASM
            p.point-ratio-text {{ this.POINT_RATIO }}P / ASM
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
            p.error-message(v-if="notEnoughAsp") {{ notEnoughAsp }}
        section.section.shortcut-section.assemble-section.dark(v-if="hasWallet && walletAvailable")
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

const WALLET_COST = 30000;
const MINIMUM = 1000;
const FEE = 100;

let timer;

export default {
  components: {
    PointText,
    AsmInput,
    ReceivingAsmActionSheet,
    TransactionItem,
  },
  props: {
    initLoading: { type: Boolean },
    hasWallet: { type: Boolean },
    walletAvailable: { type: Boolean },
    wallet: { type: Object, default: null },
    asp: { type: [Number, String], default: null },
    walletHistories: { type: Array, default: () => [] },
  },
  watch: {
    asp(v) {
      this.from = Number(v);
      this.to = parseFloat((this.from / this.POINT_RATIO).toFixed(4));
    },
  },
  computed: {
    ...mapState({
      me: (state) => state.me,
    }),
    notEnoughAsp() {
      if (this.asp < MINIMUM) return `최소 ${MINIMUM}P 필요`;
      if (this.asp - this.from < 0) return '잔여 포인트 부족';
      if (this.asp - this.from < FEE) return `교환 수수료 ${FEE}P 부족`;
      if (this.from < MINIMUM) return `최소 ${MINIMUM}P 필요`;
      return null;
    },
    displayExchangeText() {
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
      POINT_RATIO: null,
    };
  },
  async mounted() {
    await this.fetchASMPrice();
    timer = setInterval(() => this.fetchASMPrice(), 1000 * 5);
    const from = Number(this.asp - FEE);
    if (from > 0) this.from = from;
    else this.from = 0;
    this.to = parseFloat((this.from / this.POINT_RATIO).toFixed(4));
  },
  destroyed() {
    clearInterval(timer);
  },
  methods: {
    async fetchASMPrice() {
      const { data } = await this.$http.get('/config/asm-price');
      const { price } = data;
      this.POINT_RATIO = price;
      this.to = parseFloat((this.from / this.POINT_RATIO).toFixed(4));
    },
    goToCreateWallet() {
      if (this.hasWallet) return;
      if (this.asp < WALLET_COST) {
        this.$toast('지갑을 생성하는데 30,000P가 필요합니다.');
        return;
      }
      this.$router.push('/exchange-center/new-wallet');
    },
    calcTo(value) {
      if (value) this.from = Number(value);
      this.to = parseFloat((this.from / this.POINT_RATIO).toFixed(4));
    },
    inputAllFrom() {
      const from = Number(this.asp - FEE);
      if (from > 0) this.from = from;
      else this.from = 0;
      this.calcTo();
    },
    goToExchange() {
      if (this.notEnoughAsp) return;
      if (!this.from) return;
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
