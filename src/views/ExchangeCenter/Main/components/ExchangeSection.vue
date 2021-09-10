<style lang="less" scoped>
.section {
  padding: 20px;
}
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.section-title {
  font-size: 24px;
  line-height: 1.6;
}
.nav-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.exchange-section-description {
  color: rgba(214, 218, 224, .6);
  font-size: 14px;
  line-height: 2;
}
.point-ratio-text {
  font-size: 14px;
  color: #FFC42C;
}
.exchange-form-group {
  position: relative;
  margin-top: 20px;
}
.exchange-input-box {
  position: relative;
  &:not(:last-of-type) {
    margin-bottom: 10px;
  }
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
.link-button {
  font-size: 14px;
  font-weight: bold;
  line-height: 28px;
  color: #6096FF;
}
.exchange-all-input-button {
  position: absolute;
  bottom: 14px;
  right: 10px;
}
.change-exchange-button {
  position: absolute;
  top: 40px;
  left: calc((100% - 40px) / 2);
  width: 40px;
  height: 40px;
  border: 1px solid #1A2638;
  border-radius: 17px;
  box-shadow: 0px 4px 6px #000000;
  background-image: url(~@/assets/exchange-icon.png);
  background-size: 24px;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #1C2C43;
  z-index: 1;
}
.converted-to-value {
  position: absolute;
  bottom: 14px;
  right: 10px;
  color: rgba(214, 218, 224, .6);
  font-size: 14px;
  line-height: 2;
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
  @media only screen and (min-width: 768px) {
    .exchange-section {
      margin-bottom: 20px;
    }
  }
</style>

<template lang="pug">
section.section.exchange-section.assemble-section.dark
  nav.nav
    h2.section-title {{ $t('exchangeTitle') }}
  .nav-footer
    p.exchange-section-description ASM은 1단위로 교환됩니다.
    p.point-ratio-text {{ this.POINT_RATIO }}P / ASM
  .exchange-form-group
    .exchange-input-box
      asm-input(:fontSize="24", :value="from", @input="calcTo", ref="fromInput")
        i.exchange-input-icon(
          slot="prefix",
          :class="[exchangeMethod === 'toASM' ? 'asp' : 'asm']",
        )
      button.link-button.exchange-all-input-button(@click="inputAllFrom") {{ $t('enterTheFullAmount') }}
    button.change-exchange-button(@click="toggleExchangeMethod()")
    .exchange-input-box
      asm-input(:fontSize="24", :value="to", :disabled="true")
        i.exchange-input-icon(
          slot="prefix",
          :class="[exchangeMethod === 'toASM' ? 'asm' : 'asp']",
        )
      strong.converted-to-value {{ displayConvertedFromValue }}
    button.bg-button.exchange-button(:class="{ disabled: invalidity }", @click="goToExchange") {{ displayExchangeText }}
    p.error-message(v-if="invalidity") {{ invalidity }}
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
    asp: { type: [Number, String], default: null },
    asmBalance: { type: [String, Number], default: null },
  },
  watch: {
    asp(v) {
      let floorNumber;
      this.from = Number(v);
      if (this.exchangeMethod === 'toASM') floorNumber = (this.from / this.POINT_RATIO).toFixed(0);
      else floorNumber = (this.from * this.POINT_RATIO).toFixed(0);
      this.to = parseFloat(floorNumber);
    },
  },
  computed: {
    ...mapState({
      me: (state) => state.me,
    }),
    invalidity() {
      if (this.exchangeMethod === 'toASM') {
        if (this.asp - this.from < 0) return this.$t('notEnoughRemainingPoints');
      } else if (this.asmBalance - this.from < 0) return this.$t('notEnoughRemainingASM');
      return null;
    },
    displayExchangeText() {
      const from = Number(this.from).toLocaleString();
      const to = Number(this.to).toLocaleString();
      if (this.exchangeMethod === 'toASM') return this.$t('exchangeText', { from: `${from}P`, to: `${to}ASM` });
      return this.$t('exchangeText', { from: `${from}ASM`, to: `${to}P` });
    },
    displayConvertedFromValue() {
      if (this.exchangeMethod === 'toASM') {
        const convertedPoint = Number((this.to * this.POINT_RATIO).toFixed(0)).toLocaleString();
        return `${convertedPoint} P`;
      }
      const convertedASM = Number((this.from).toFixed(0)).toLocaleString();
      return `${convertedASM} ASM`;
    },
  },
  data() {
    return {
      exchangeMethod: 'toASM', // 'toASM', 'toPoint'
      from: null,
      to: null,
      POINT_RATIO: null,
    };
  },
  async mounted() {
    await this.fetchASMPrice();
    timer = setInterval(() => this.fetchASMPrice(), 1000 * 5);
    const from = Number(this.asp);
    if (from > 0) this.from = from;
    else this.from = 0;
    const floorNumber = (this.from / this.POINT_RATIO).toFixed(0);
    this.to = parseFloat(floorNumber);
  },
  destroyed() {
    clearInterval(timer);
  },
  methods: {
    async fetchASMPrice() {
      const { data } = await this.$http.get('/config/asm-price');
      const { price } = data;
      this.POINT_RATIO = price;
      if (this.exchangeMethod === 'toASM') {
        const floorNumber = (this.from / this.POINT_RATIO).toFixed(0);
        this.to = parseFloat(floorNumber);
      } else {
        const floorNumber = (this.from * this.POINT_RATIO).toFixed(0);
        this.to = parseFloat(floorNumber);
      }
    },
    calcTo(value) {
      if (value) this.from = Number(value);
      if (this.exchangeMethod === 'toASM') {
        const floorNumber = (this.from / this.POINT_RATIO).toFixed(0);
        this.to = parseFloat(floorNumber);
      } else {
        const floorNumber = (this.from * this.POINT_RATIO).toFixed(0);
        this.to = parseFloat(floorNumber);
      }
    },
    inputAllFrom() {
      if (this.exchangeMethod === 'toASM') {
        const from = Number(this.asp);
        if (from > 0) this.from = from;
        else this.from = 0;
      } else {
        this.from = Number(this.asmBalance);
      }
      this.calcTo();
    },
    toggleExchangeMethod() {
      const temp = this.to;
      this.to = this.from;
      this.from = temp;
      if (this.exchangeMethod === 'toASM') this.exchangeMethod = 'toPoint';
      else this.exchangeMethod = 'toASM';
      this.$nextTick(() => {
        this.$refs.fromInput.doFocus();
        this.calcTo();
      });
    },
    goToExchange() {
      if (this.invalidity) return;
      if (!this.from) return;
      this.$router.push({
        path: this.$localePath('/exchange-center/exchange-confirmation'),
        query: { from: this.from, to: this.to, exchangeMethod: this.exchangeMethod },
      });
    },
  },
};
</script>

<i18n>
{
  "ko": {
    "exchangeTitle": "교환하기",
    "enterTheFullAmount": "전액 입력하기",
    "notEnoughRemainingPoints": "잔여 포인트 부족",
    "notEnoughRemainingASM": "잔여 ASM 부족",
    "exchangeText": "{from}를 {to} 로 교환"
  },
  "en": {
    "exchangeTitle": "Exchange",
    "enterTheFullAmount": "enter the full amount",
    "notEnoughRemainingPoints": "not enough remaining points",
    "notEnoughRemainingASM": "not enough remaining ASM",
    "exchangeText": "Exchange {from} to {to}"
  },
  "ja": {
    "exchangeTitle": "交換する",
    "enterTheFullAmount": "全額を記入する",
    "notEnoughRemainingPoints": "残りの点が足りない",
    "exchangeText": "●{from}を{to}に交換"
  },
  "cn": {
    "exchangeTitle": "交换",
    "enterTheFullAmount": "输入全部金额",
    "notEnoughRemainingPoints": "剩下的分数不够",
    "exchangeText": "将{from}替换为{to}"
  }
}
</i18n>
