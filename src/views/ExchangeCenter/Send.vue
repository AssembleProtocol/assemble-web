<style lang="less" scoped>
  .exchange-center-send-container {
    color: #F7F8FA;
  }
  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
  }
  .nav-title {
    color: #F7F8FA;
    font-size: 24px;
    line-height: 38px;
  }
  .link-button {
    font-size: 14px;
    font-weight: bold;
    line-height: 28px;
    color: #6096FF;
  }
  .contents {
    padding: 0 20px;
  }
  .input-wrapper {
    &:not(:first-child) {
      margin-top: 20px;
    }
  }
  .qr-code-scan-button {
    width: 100%;
    height: 100%;
    background-image: url(~@/assets/qr-code-scan.svg);
    background-size: 32px;
    background-position: center;
    background-repeat: no-repeat;
  }
  .all-input-button-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-top: 5px;
  }
  .next-button {
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
  section.exchange-center-send-container
    .contents.assemble-section.dark
      header.nav
        h1.nav-title {{ $t('title') }}
      asm-input.input-wrapper(v-model="address", :placeholder="$t('enterAddress')")
        button.qr-code-scan-button(
          v-if="hasQrScanner",
          slot="suffix",
          @click="openQrScanner",
        )
      asm-input.input-wrapper(v-model="asm", :placeholder="$t('enterASM')")
      .all-input-button-wrapper
        button.link-button.all-input-button(@click="inputAllBalance") {{ $t('enterTheFullAmount') }}
      button.next-button(@click="goToNext") {{ $t('next') }}
      p.description {{ $t('description') }}
</template>

<script>
import AsmInput from '@/components/AsmInput';

let timer;

export default {
  components: {
    AsmInput,
  },
  props: {
    asmBalance: { type: [String, Number], default: null },
  },
  data() {
    return {
      transferFee: null,
      address: '',
      asm: '',
      hasQrScanner: false,
    };
  },
  async mounted() {
    await this.fetchFee();
    if (window.s3app) this.hasQrScanner = true;
  },
  methods: {
    async fetchFee() {
      const { data } = await this.$http.get('/exchange/asm-transfer-fee');
      const { transferFee } = data;
      this.transferFee = transferFee;
    },
    openQrScanner() {
      if (window.s3app) {
        window.s3app.scannedAddress = '';
        window.s3app.openQrScanner();
        timer = setInterval(() => {
          if (window.s3app.scannedAddress) {
            const splitted = window.s3app.scannedAddress.split('ethereum:');
            if (splitted.length === 2) [, this.address] = splitted;
            else this.address = window.s3app.scannedAddress;
            clearInterval(timer);
          }
        }, 100);
      }
    },
    inputAllBalance() {
      let asm = Number(this.asmBalance - this.transferFee);
      if (asm < this.transferFee) {
        this.$toast(`ASM을 보내는데 ${this.transferFee}ASM이 필요합니다.`);
        asm = 0;
      }
      this.asm = parseFloat(Math.floor(asm));
    },
    goToNext() {
      const asm = Number(this.asmBalance - this.transferFee);
      if (this.asm > asm) {
        this.$toast(`잔액이 부족합니다. 수수료로 ${this.transferFee}ASM이 필요합니다.`);
        return;
      }
      this.$router.push({
        path: this.$localePath('/exchange-center/send-confirmation'),
        query: { address: this.address, asm: this.asm, transferFee: this.transferFee },
      });
    },
  },
};
</script>

<i18n>
{
  "ko": {
    "title": "ASM 보내기",
    "enterAddress": "주소 입력하기",
    "enterASM": "ASM 입력하기",
    "enterTheFullAmount": "전액 입력하기",
    "next": "다음",
    "description": "ASM을 타인에게 전송할 때, 일정량의 네트워크 수수료가 부과됩니다. 이 수수료는 네트워크 상황에 따라 매번 달라질 수 있습니다.  이 수수료는 편의를 위해 어셈블에 의하여 최적값이 자동으로 계산되지만, 어셈블이 부과하는 것은 아닙니다. 암호화폐의 기술적 특성에 기인합니다."
  },
  "en": {
    "title": "Send ASM",
    "enterAddress": "enter an address",
    "enterASM": "enter an ASM",
    "enterTheFullAmount": "enter the full amount",
    "next": "next",
    "description": "When sending ASM to others, a certain amount of network fee is charged. This fee may vary from time to time depending on the network situation. This fee is automatically calculated by the assemble for convenience, but is not charged by the assemble. It is due to the technical characteristics of cryptocurrency."
  },
  "ja": {
    "title": "ASM送信",
    "enterAddress": "住所を記入する",
    "enterASM": "ASMに入る",
    "enterTheFullAmount": "全額を記入する",
    "next": "次ぎ",
    "description": "ASM を他人に転送する際、一定量のネットワーク手数料がかかります。 この手数料はネットワークの状況によって毎回変わることがあります。 この手数料は便宜のためにアセンブルによって最適値が自動的に計算されますが、アセンブルが賦課されるわけではありません。 暗号通貨の技術的特性に起因します。"
  },
  "cn": {
    "title": "发送 ASM",
    "enterAddress": "输入地址",
    "enterASM": "进入ASM",
    "enterTheFullAmount": "输入全部金额",
    "next": "下一个",
    "description": "将ASM传送给他人时，会收取一定数量的网络手续费。 这个手续费根据网络情况每次都会有所不同。 该手续费由汇编自动计算出最佳值，但不是汇编征收的。 基于加密货币的技术特性 。"
  }
}
</i18n>
