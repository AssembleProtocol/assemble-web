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
  .point-ratio-text {
    font-size: 14px;
    color: #FFC42C;
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
  .link-button-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-top: 5px;
  }
  .link-button {
    font-size: 14px;
    font-weight: bold;
    line-height: 28px;
    color: #6096FF;
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
        h1.nav-title 포인트 → ASM
        p.point-ratio-text {{ this.POINT_RATIO }}P / ASM
      asm-input.input-wrapper(:value="displayExchangeText", readonly)
      asm-input.input-wrapper(v-model="address", placeholder="받는 주소")
        button.qr-code-scan-button(
          v-if="hasQrScanner",
          slot="suffix",
          @click="openQrScanner",
        )
      .link-button-wrapper
        button.link-button(@click="inputMyAddress") 내 교환소 지갑 주소 입력하기
      button.next-button(@click="goToNext") 다음
      p.description 최종 교환된 ASM은 시세 변동에 의해 차이가 있을 수 있습니다. 받는 주소에는 ASM을 받을 본인 또는 상대방의 암호화폐 거래소에서 발급 받은 주소 또는 이더리움 지갑의 주소를 입력하세요. 교환에는 100 포인트의 수수료가 추가로 소요됩니다.
</template>

<script>
import { mapState } from 'vuex';
import AsmInput from '@/components/AsmInput';

let qrScannerTimer;
let fetchASMPriceTimer;

export default {
  components: {
    AsmInput,
  },
  props: {
    wallet: { type: Object, default: null },
  },
  computed: {
    ...mapState({
      from: (state) => state.route.query.from,
      me: (state) => state.me,
    }),
    displayExchangeText() {
      return `${this.from || 0} P → ${this.to || 0} ASM`;
    },
    myWalletAddress() {
      if (!this.me) return '';
      return this.me.walletAddress;
    },
  },
  data() {
    return {
      address: '',
      hasQrScanner: false,
      to: null,
      POINT_RATIO: null,
    };
  },
  async mounted() {
    await this.fetchASMPrice();
    fetchASMPriceTimer = setInterval(() => this.fetchASMPrice(), 1000 * 5);
    if (window.s3app) this.hasQrScanner = true;
  },
  destroyed() {
    clearInterval(fetchASMPriceTimer);
  },
  methods: {
    async fetchASMPrice() {
      const { data } = await this.$http.get('/config/asm-price');
      const { price } = data;
      this.POINT_RATIO = price;
      this.to = parseFloat((this.from / this.POINT_RATIO).toFixed(4));
    },
    openQrScanner() {
      if (window.s3app) {
        window.s3app.scannedAddress = '';
        window.s3app.openQrScanner();
        qrScannerTimer = setInterval(() => {
          if (window.s3app.scannedAddress) {
            const splitted = window.s3app.scannedAddress.split('ethereum:');
            if (splitted.length === 2) [, this.address] = splitted;
            else this.address = window.s3app.scannedAddress;
            clearInterval(qrScannerTimer);
          }
        }, 100);
      }
    },
    inputMyAddress() {
      this.address = this.myWalletAddress;
    },
    goToNext() {
      this.$router.push({
        path: this.$localePath('/exchange-center/exchange-confirmation'),
        query: { address: this.address, to: this.to, from: this.from },
      });
    },
  },
};
</script>
