<template lang="pug">
  router-link(:to="getTo()")
    slot
</template>

<script>
export default {
  props: ['to'],
  methods: {
    getTo() {
      if (typeof this.to !== 'string') return this.to;
      const { locale } = this.$route.params;
      return `/${locale}/${this.to.replace(/^\/|\/$/g, '')}`;
    },
  },
};
</script>
