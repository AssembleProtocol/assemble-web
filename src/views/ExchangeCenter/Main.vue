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
    &.shortcut {
      margin-top: 40px;
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
            strong.point-box-title 보유 ASM
            .point-box-nav-right
              button.point-box-nav-button.send(@click="goToSendAsm")
              button.point-box-nav-button.receive(@click="showReceivingAsm")
          point-text.point-box-text(:value="wallet.balance", pointType="asm")
      section.section.excahnge
        nav.section-nav
          h2.section-title 교환하기
          //- button.link-button(@click="toggleExchange") 위 아래 전환
        .exchange-form-group
          .exchange-input-box
            asm-input(:fontSize="24", v-model="from", @input="calcTo")
              i.exchange-input-icon(slot="prefix", :class="{ asp: toAsm, asm: !toAsm }")
            button.link-button.exchange-all-input-button(@click="inputAllFrom") 전액 입력하기
          .exchange-icon-wrapper
            i.exchange-icon
          .exchange-input-box
            asm-input(:fontSize="24", v-model="to", :readonly="true")
              i.exchange-input-icon(slot="prefix", :class="{ asm: toAsm, asp: !toAsm }")
          button.bg-button.exchange-button(@click="goToExchange") {{ displayExchangeText }}
      section.section.shortcut
        nav.section-nav
          h2.section-title 바로가기
        .shortcut-button-group
          button.shortcut-button(@click="goToSendAsm") ASM 보내기
          button.shortcut-button(@click="showReceivingAsm") ASM 받기
          button.shortcut-button ASM 입금 주소 보기
          a.shortcut-button(:href="`https://ropsten.etherscan.io/address/${myWalletAddress}#tokentxns`", target="_blank") Etherscan에서 보기

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

export default {
  components: {
    PointText,
    AsmInput,
    ReceivingAsmActionSheet,
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
      if (this.toAsm) return `${this.from || 0}P를 ${this.to || 0}ASM 로 교환`;
      return `${this.from || 0}ASM을 ${this.to || 0}P 로 교환`;
    },
    myWalletAddress() {
      if (!this.me) return '';
      return this.me.walletAddress;
    },
  },
  data() {
    return {
      toAsm: true,
      receivingAsmVisible: false,
      from: null,
      to: null,
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
    toggleExchange() {
      this.toAsm = !this.toAsm;
      const tempTo = this.to;
      this.to = this.from;
      this.from = tempTo;
    },
    calcTo() {
      this.to = this.from / 1000;
    },
    inputAllFrom() {
      this.from = Number(this.asp);
      this.calcTo();
    },
    goToExchange() {
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
