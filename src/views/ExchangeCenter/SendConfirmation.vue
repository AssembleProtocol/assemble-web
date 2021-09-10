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
  .loading-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80px 0;
  }
  .wrapper {
    margin-top: 20px;
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
  .loading {
    color: #6096FF;
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
        h1.nav-title {{ $t('title') }}
      .loading-container(v-if="checkLoading")
        i.el-icon-loading.loading
      .wrapper(v-else)
        .form-group
          p.label(v-if="user") {{ $t('incomingUser') }}
          p.label(v-else) {{ $t('incomingAddress') }}
          p.value {{ displayAddress }}
        .form-group
          p.label {{ $t('quantity') }}
          p.value {{ asm }} ASM
        .form-group(v-if="!user")
          p.label {{ $t('fee') }}
          p.value {{ transferFee }} ASM
        hr.divier
        .form-group
          p.label {{ $t('sum') }}
          p.value(v-if="!user") {{ Number(asm) + Number(transferFee) }} ASM
          p.value(v-else) {{ Number(asm) }} ASM
        button.subimt-button(@click="goToResult") {{ $t('send') }}
        p.description(v-if="user") 해당 주소는 어셈블 교환소 입금 전용 주소입니다. ASM은 즉시 전달되며, 수수료가 면제됩니다.
        p.description(v-else) ASM을 보낼 때 소요되는 수수료는 네트워크 상황에 따라 달라질 수 있습니다.  이 수수료는 편의를 위해 어셈블에 의하여 최적값이 자동으로 계산되지만, 어셈블이 부과하는 것은 아닙니다. 암호화폐의 기술적 특성에 기인합니다.
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      address: (state) => state.route.query.address,
      asm: (state) => state.route.query.asm,
      transferFee: (state) => state.route.query.transferFee,
    }),
    displayAddress() {
      if (!this.address) return '';
      if (this.user) return this.user.name;
      if (this.address.length > 6) return `${this.address.slice(0, 6)}...${this.address.slice(-4)}`;
      return this.address;
    },
  },
  data() {
    return {
      checkLoading: false,
      loading: false,
      user: null,
    };
  },
  mounted() {
    this.$emit('hideNavPoint');
    this.checkIsInnerAddress();
  },
  destroyed() {
    this.$emit('showNavPoint');
  },
  methods: {
    async checkIsInnerAddress() {
      this.checkLoading = true;
      const { data } = await this.$http.get('/exchange/deposit-addresses', { params: { depositAddress: this.address } });
      if (data.length > 0) [this.user] = data;
      this.checkLoading = false;
    },
    async goToResult() {
      if (this.loading) return;
      try {
        this.loading = true;
        await this.$http.post('/exchange/transactions', {
          address: this.address,
          amount: -Number(this.asm),
        });
        const query = { ...this.$route.query };
        if (this.user) query.username = this.username;
        this.$router.push({
          path: this.$localePath('/exchange-center/send-result'),
          query,
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

<i18n>
{
  "ko": {
    "title": "최종 확인하기",
    "incomingUser": "받는 유저",
    "incomingAddress": "받는 주소",
    "quantity": "수량",
    "fee": "수수료",
    "sum": "합계",
    "send": "보내기"
  },
  "en": {
    "title": "Confirmation",
    "incomingUser": "incoming user",
    "incomingAddress": "incoming address",
    "quantity": "quantity",
    "fee": "fee",
    "sum": "sum",
    "send": "Send"
  },
  "ja": {
    "title": "最終確認",
    "incomingAddress": "宛先",
    "quantity": "数量",
    "fee": "手数料",
    "sum": "合計",
    "send": "送り"
  },
  "cn": {
    "title": "最终确认",
    "incomingAddress": "收件地址",
    "quantity": "数量",
    "fee": "佣金",
    "sum": "合计",
    "send": "发送"
  }
}
</i18n>
