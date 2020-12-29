<style lang="less" scoped>
  .exchange-center-container {
    padding-bottom: 80px;
    color: #F7F8FA;
  }
  .nav {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 80px;
    padding: 0 20px;
    background-color: #000;
    z-index: 999;
  }
  .back-button {
    width: 24px;
    height: 24px;
    background-image: url(~@/assets/chevron-left.svg);
    background-size: cover;
    background-repeat: no-repeat;
  }
  .nav-right {
    display: flex;
    align-items: center;
  }
  .nav-poinst-box {
    display: flex;
    align-items: center;
    border-radius: 7px;
    background-color: #233248;
    overflow: hidden;
    &:not(:first-child) {
      margin-left: 10px;
    }
  }
  .nav-point-icon {
    width: 22px;
    height: 24px;
    background-position: center;
    background-repeat: no-repeat;
    &.asp {
      background-image: url(~@/assets/nav-point-asp-icon.svg);
      background-size: auto 19px;
    }
    &.asm {
      background-image: url(~@/assets/nav-point-asm-icon.svg);
      background-size: auto 14px;
    }
  }
  .nav-point-text {
    border-left: 1px solid #000;
    padding: 0 5px;
    font-weight: bold;
    font-size: 14px;
    line-height: 24px;
    &.asp {
      letter-spacing: 0.05em;
    }
    &.asm {
      letter-spacing: 0.1em;
    }
  }
</style>

<template lang="pug">
  section.exchange-center-container
    nav.nav
      button.back-button(@click="goBack")
      .nav-right
        .nav-poinst-box
          i.nav-point-icon.asp
          p.nav-point-text.asp 141,331
        .nav-poinst-box
          i.nav-point-icon.asm
          p.nav-point-text.asm 4.4900234
    article.article
      router-view
</template>

<script>
export default {
  mounted() {
    document.body.classList.add('dark');
  },
  destroyed() {
    document.body.classList.remove('dark');
  },
  methods: {
    goBack() {
      if (this.$history.canGoBack()) this.$router.back();
      else if (window.s3app) window.close();
      else this.$router.push('/');
    },
  },
};
</script>
