<style lang="less" scoped>
  #app {
    max-width: 768px;
    margin: 0 auto;
  }
  .page-enter-active, .page-leave-active {
    transition: opacity 200ms, transform 200ms ease;
  }
  .page-enter, .page-leave-to {
    opacity: 0;
    transform: translateY(0.5%);
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
