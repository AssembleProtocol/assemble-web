<style lang="less" scoped>
  .exchange-center-send-result-container {
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
  section.exchange-center-send-result-container
    .contents.assemble-section.dark
      header.nav
        h1.nav-title {{ $t('title') }}
      .form-group
        p.label(v-if="username") {{ $t('incomingUser') }}
        p.label(v-else) {{ $t('incomingAddress') }}
        p.value {{ displayAddress }}
      .form-group
        p.label {{ $t('quantity') }}
        p.value {{ asm }} ASM
      .form-group(v-if="!username")
        p.label {{ $t('fee') }}
        p.value {{ transferFee }} ASM
      hr.divier
      .form-group
        p.label {{ $t('sum') }}
        p.value(v-if="!username") {{ Number(asm) + Number(transferFee) }} ASM
        p.value(v-else) {{ Number(asm) }} ASM
      p.description {{ $t('description') }}
      button.submit-button(@click="goToExchangeMain") {{ $t('returnToExcahnge') }}
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      address: (state) => state.route.query.address,
      asm: (state) => state.route.query.asm,
      transferFee: (state) => state.route.query.transferFee,
      username: (state) => state.route.query.username,
    }),
    displayAddress() {
      if (!this.address) return '';
      if (this.username) return this.username;
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
    goToExchangeMain() {
      this.$emit('goExchangeHome');
    },
  },
};
</script>

<i18n>
{
  "ko": {
    "title": "접수되었습니다",
    "incomingAddress": "받는 주소",
    "incomingUser": "받는 유저",
    "quantity": "수량",
    "fee": "수수료",
    "sum": "합계",
    "description": "ASM을 보내는 중입니다. 보통 몇 분 안에 끝나지만, 한 두시간이 걸릴 수도 있습니다. 이러한 지연은 암호화폐의 기술적 특성으로 발생됩니다.",
    "returnToExcahnge": "교환소로 돌아가기"
  },
  "en": {
    "title": "You've received.",
    "incomingAddress": "incoming address",
    "incomingUser": "incoming user",
    "quantity": "quantity",
    "fee": "fee",
    "sum": "sum",
    "description": "Sending ASM. It usually ends in a few minutes, but it can take an hour or two. This delay is caused by the technical characteristics of cryptocurrency.",
    "returnToExcahnge": "Return to Exchange"
  },
  "ja": {
    "title": "受け付けました",
    "incomingAddress": "宛先",
    "quantity": "数量",
    "fee": "手数料",
    "sum": "合計",
    "description": "ASMを送っています。 通常数分以内に終わりますが、1~2時間かかることもあります。 このような遅延は暗号通貨の技術的特性により発生します。",
    "returnToExcahnge": "交換所へ帰る"
  },
  "cn": {
    "title": "已收到",
    "incomingAddress": "收件地址",
    "quantity": "数量",
    "fee": "佣金",
    "sum": "合计",
    "description": "正在发送ASM。 一般在几分钟内结束，但可能需要一两个小时。 这种延迟是由于加密货币的技术特性引起的。",
    "returnToExcahnge": "返回交换站"
  }
}
</i18n>
