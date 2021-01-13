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
      h1.header-title 포인트 → ASM
    .contents
      asm-input.input-wrapper(v-model="address", placeholder="받는 주소 입력하기")
        button.qr-code-scan-button(
          v-if="hasQrScanner",
          slot="suffix",
          @click="openQrScanner",
        )
      asm-input.input-wrapper(:value="displayExchangeText", readonly)
      button.next-button(@click="goToNext") 다음
      p.description 받는 주소에는 ASM을 받을 본인 또는 상대방의 암호화폐 거래소에서 발급 받은 주소 또는 이더리움 지갑의 주소를 입력하세요.
</template>

<script>
import { mapState } from 'vuex';
import AsmInput from '@/components/AsmInput';

let timer;

export default {
  components: {
    AsmInput,
  },
  props: {
    wallet: { type: Object, default: null },
  },
  computed: {
    ...mapState({
      to: (state) => state.route.query.to,
      from: (state) => state.route.query.from,
    }),
    displayExchangeText() {
      return `${this.from || 0} P → ${this.to || 0} ASM`;
    },
  },
  data() {
    return {
      address: '',
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
    goToNext() {
      this.$router.push({
        path: '/exchange-center/exchange-confirmation',
        query: { address: this.address, to: this.to, from: this.from },
      });
    },
  },
};
</script>
