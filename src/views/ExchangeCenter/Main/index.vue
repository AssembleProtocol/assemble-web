<style lang="less" scoped>
  .exchange-center-main-container {
    padding-bottom: 80px;
    color: #F7F8FA;
  }
  .section {
    padding: 20px;
  }
  .transaction-section {
    margin-bottom: 20px;
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
      &:not(:first-of-type) {
        margin-left: 40px;
      }
    }
    .assemble-section {
      margin-bottom: 20px;
    }
  }
</style>

<template lang="pug">
  section.exchange-center-main-container
    .contents(v-if="!initLoading")
      section.desktop-section
        section.section.assemble-section.dark
          h1.section-title.large {{ $t('asmExchange') }}
          p.section-description(v-html="$t('description')")
          .point-box
            nav.point-box-nav
              strong.point-box-title {{ $t('pointBoxTitle') }}
              .point-box-nav-right
                button.point-box-nav-button.send(@click="goToSendAsm")
                button.point-box-nav-button.receive(@click="showReceivingAsm")
            point-text.point-box-text(:value="asmBalance", pointType="asm")
        exchange-section(:asp="asp", :asmBalance="asmBalance")
      section.desktop-section
        section.section.transaction-section.assemble-section.dark(v-if="walletHistories && walletHistories.length > 0")
          nav.section-nav
            h2.section-title {{ $t('transactionTitle') }}
            locale-router-link.link-button(to="/exchange-center/transactions") {{ $t('viewAll') }}
          .transaction-list
            transaction-item(
              v-for="walletHistory in walletHistories",
              :key="walletHistory._id",
              :transaction="walletHistory",
            )
        section.section.shortcut-section.assemble-section.dark
          nav.section-nav
            h2.section-title {{ $t('shortcut') }}
          .shortcut-button-group
            button.shortcut-button(@click="goToSendAsm") {{ $t('sendASM') }}
            button.shortcut-button(@click="showReceivingAsm") {{ $t('recieveASM') }}
            button.shortcut-button(@click="showReceivingAsm") {{ $t('ASMaddress') }}
            a.shortcut-button(:href="`https://etherscan.io/address/${myWalletAddress}#tokentxns`", target="_blank") {{ $t('viewInEthercan') }}

    receiving-asm-action-sheet(
      :address="myWalletAddress",
      :visible="receivingAsmVisible",
      @close="closeReceivingAsm",
    )
</template>

<script>
import { mapState } from 'vuex';

import PointText from '@/components/PointText';
import ExchangeSection from './components/ExchangeSection';
import ReceivingAsmActionSheet from '../components/ReceivingAsmActionSheet';
import TransactionItem from '../components/TransactionItem';

export default {
  components: {
    PointText,
    ExchangeSection,
    ReceivingAsmActionSheet,
    TransactionItem,
  },
  props: {
    initLoading: { type: Boolean },
    asmBalance: { type: [String, Number], default: null },
    asp: { type: [Number, String], default: null },
    walletHistories: { type: Array, default: () => [] },
  },
  computed: {
    ...mapState({
      me: (state) => state.me,
    }),
    myWalletAddress() {
      if (!this.me) return '';
      return this.me.walletAddress;
    },
  },
  data() {
    return {
      receivingAsmVisible: false,
    };
  },
  methods: {
    goToSendAsm() {
      this.$router.push(this.$localePath('/exchange-center/send'));
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

<i18n>
{
  "ko": {
    "asmExchange": "ASM 교환소",
    "description": "어셈블 포인트와 ASM은 서로 교환할 수 있어요.</br>ASM으로 교환하면, 사람들과 안전하게 주고받거나,</br>암호화폐 거래소에서 거래할 수 있어요.",
    "pointBoxTitle": "보유 ASM",
    "transactionTitle": "트랜잭션",
    "viewAll": "모두 보기",
    "shortcut": "바로가기",
    "sendASM": "ASM 보내기",
    "recieveASM": "ASM 받기",
    "ASMaddress": "ASM 입금 주소 보기",
    "viewInEthercan": "Etherscan에서 보기"
  },
  "en": {
    "asmExchange": "ASM Exchange",
    "description": "Assemble points and ASM can be exchanged.</br>If you exchange it with ASM,</br>you can exchange it safely with people or trade it on the cryptocurrency exchange.",
    "pointBoxTitle": "ASM Retained",
    "transactionTitle": "Transaction",
    "viewAll": "View all",
    "shortcut": "Shortcut",
    "sendASM": "Send ASM",
    "recieveASM": "Recieve ASM",
    "ASMaddress": "View ASM Deposit Address",
    "viewInEthercan": "View in Ethercan"
  },
  "ja": {
    "asmExchange": "ASM交換所",
    "description": "アセンブルポイントとASMはお互いに交換できます。</br>ASMに交換すれば、人々と安全にやり取りしたり、</br>暗号通貨取引所で取引することができます。",
    "pointBoxTitle": "保有ASM",
    "transactionTitle": "Transaction",
    "viewAll": "丸見え",
    "shortcut": "真っ直ぐに行く",
    "sendASM": "ASM送信",
    "recieveASM": "ASMを受信する",
    "ASMaddress": "ASM入金アドレスを見る",
    "viewInEthercan": "Etherscanで見る"
  },
  "cn": {
    "asmExchange": "ASM交换站",
    "description": "汇编积分和ASM可以互相交换。</br>用ASM交换的话，可以安全地与人交流，</br>也可以在加密货币交易所进行交易。",
    "pointBoxTitle": "持有ASM",
    "transactionTitle": "Transaction",
    "viewAll": "全部查看",
    "shortcut": "快捷键",
    "sendASM": "发送 ASM",
    "recieveASM": "接收ASM",
    "ASMaddress": "显示ASM汇款地址",
    "viewInEthercan": "在 Eterscan 上显示"
  }
}
</i18n>
