<style lang="less" scoped>
  #app {
    padding-bottom: 120px;
  }
  .bar {
    display: none;
  }
  .page-enter-active, .page-leave-active {
    transition: opacity 200ms, transform 200ms ease;
  }
  .page-enter, .page-leave-to {
    opacity: 0;
    transform: translateY(0.5%);
  }
  @media only screen and (min-width: 768px) {
    #app {
      background-color: #fff;
      &.dark {
        background-color: #000;
      }
    }
    .bar {
      display: block;
      width: 100%;
      height: 10px;
      background: linear-gradient(90.02deg, #56CEF3 0%, #3430FF 20.31%, #0F52D2 99.48%);
      z-index: 99999;
    }
  }
</style>

<template lang="pug">
  #app
    .bar
    transition(:name="transitionName", mode="out-in")
      router-view
</template>

<script>
const DEFAULT_TRANSITION = 'page';

export default {
  watch: {
    $route(to, from) {
      const goingToExchangeCenter = to.name === 'Home' && from.name === 'ExchangeCenterMain';
      const backToMainFromExchangeCenter = to.name === 'ExchangeCenterMain' && from.name === 'Home';
      if (goingToExchangeCenter || backToMainFromExchangeCenter) this.transitionName = null;
      else this.transitionName = DEFAULT_TRANSITION;
    },
  },
  data() {
    return {
      transitionName: DEFAULT_TRANSITION,
    };
  },
};
</script>
