<style lang="less" scoped>
  .page-enter-active, .page-leave-active {
    transition: opacity 200ms, transform 200ms ease;
  }
  .page-enter, .page-leave-to {
    opacity: 0;
    transform: translateY(0.5%);
  }
  @media only screen and (min-width: 768px) {
    #app {
      min-height: 100vh;
      max-width: 414px;
      margin: 0 auto;
      background-color: #fff;
      box-shadow: 0px 0px 64px rgba(0, 0, 0, 0.08);
      &.dark {
        background-color: #000;
      }
    }
  }
</style>

<template lang="pug">
  #app
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
