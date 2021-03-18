<style lang="less" scoped>

</style>

<template lang="pug">
  van-action-sheet(:value="visible", @input="close", ref="actionSheet")
    slot
</template>

<script>
export default {
  props: {
    visible: { type: Boolean, default: false },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    doClose() {
      this.$refs.actionSheet.close();
    },
  },
};
</script>
