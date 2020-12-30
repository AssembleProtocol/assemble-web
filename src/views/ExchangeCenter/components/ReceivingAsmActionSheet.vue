<style lang="less" scoped>
  .receiving-asm-action-sheet {
    width: calc(100% - 20px);
    left: 10px;
    bottom: 20px;
    border-radius: 28px;
    background-color: #233248;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);
  }
  .nav {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
  }
  .title {
    font-size: 18px;
    color: #F7F8FA;
  }
  .close-button {
    position: absolute;
    top: 22px;
    right: 20px;
    width: 16px;
    height: 16px;
    background-image: url(~@/assets/close.svg);
    background-size: cover;
    background-repeat: no-repeat;
  }
  .contents {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 20px 40px 20px;
  }
  .address {
    width: 111px;
    height: 32px;
    padding: 0 10px;
    border-radius: 12px;
    background-color: #314662;
    color: #6096FF;
    font-size: 14px;
    line-height: 32px;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .qr-code {
    margin-top: 20px;
    border-radius: 28px;
  }
  .description {
    margin-top: 20px;
    font-size: 14px;
    line-height: 28px;
    color: #D6DAE0;
    text-align: center;
  }
  .share-button {
    width: 100%;
    height: 55px;
    margin-top: 40px;
    border-radius: 12px;
    background-color: #2E75FF;
    text-align: center;
    color: #F7F8FA;
    font-weight: bold;
  }
</style>

<template lang="pug">
  action-sheet.receiving-asm-action-sheet(:visible="visible", @close="close", ref="actionSheet")
    article.container
      nav.nav
        strong.title ASM 받기
        button.close-button(@click="doClose")
      section.contents
        p.address(@click="copy") {{ displayAddress }}
        vue-qrcode.qr-code(:width="200", :value="`ethereum:${address}`")
        p.description.
          QR코드를 촬영하거나, 주소를 공유하세요.#[br]
          이 교환소로 ASM을 받아올 수 있습니다.
        button.share-button(@click="share") 주소 공유하기
</template>

<script>
import VueQrcode from 'vue-qrcode';
import ActionSheet from '@/components/ActionSheet';

export default {
  components: {
    VueQrcode,
    ActionSheet,
  },
  props: {
    visible: { type: Boolean, default: false },
    address: { type: String, default: '' },
  },
  computed: {
    displayAddress() {
      if (!this.address) return '';
      return `${this.address.slice(0, 6)}...${this.address.slice(-4)}`;
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    doClose() {
      this.$refs.actionSheet.doClose();
    },
    copy() {
      this.$copyText(this.address)
        .then(() => {
          this.$toast('주소가 복사되었습니다.');
        });
    },
    share() {
      if (window.s3app) {
        window.s3app.share(this.address);
      } else this.copy();
    },
  },
};
</script>
