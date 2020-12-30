<style lang="less" scoped>
  .exchange-center-send-container {
    color: #F7F8FA;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    padding: 0 20px;
  }
  .header-title {
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
    margin-top: 20px;
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
</style>

<template lang="pug">
  section.exchange-center-send-container
    header.header
      h1.header-title ASM 보내기
    .contents
      asm-input.input-wrapper(v-model="address", placeholder="주소 입력하기")
        button.qr-code-scan-button(
          v-if="hasQrScanner",
          slot="suffix",
          @click="openQrScanner",
        )
      asm-input.input-wrapper(v-model="asm", placeholder="ASM 입력하기")
      .all-input-button-wrapper
        button.link-button.all-input-button(@click="inputAllBalance") 전액 입력하기
      button.next-button(@click="goToNext") 다음
      p.description ASM을 타인에게 전송할 때, 일정량의 네트워크 수수료가 부과됩니다. 이 수수료는 네트워크 상황에 따라 매번 달라질 수 있습니다.  이 수수료는 편의를 위해 어셈블에 의하여 최적값이 자동으로 계산되지만, 어셈블이 부과하는 것은 아닙니다. 암호화폐의 기술적 특성에 기인합니다.
</template>

<script>
import AsmInput from '@/components/AsmInput';

let timer;

export default {
  components: {
    AsmInput,
  },
  props: {
    wallet: { type: Object, default: null },
  },
  data() {
    return {
      address: '',
      asm: '',
      hasQrScanner: false,
    };
  },
  mounted() {
    if (window.s3app) this.hasQrScanner = true;
  },
  methods: {
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
      this.asm = this.wallet.balance;
    },
    goToNext() {
      this.$router.push({
        path: '/exchange-center/send-confirmation',
        query: { address: this.address, asm: this.asm },
      });
    },
  },
};
</script>
