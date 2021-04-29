<style lang="less" scoped>
  .bg-input {
    width: 100%;
    height: 55px;
    border-radius: 9px;
    padding: 0 10px;
    background-color: #F7F8FA;
    font-weight: bold;
    font-size: 18px;
    line-height: 55px;
    &::placeholder {
      font-weight: bold;
      font-size: 18px;
      line-height: 55px;
      color: #C5CAD0;
    }
  }
</style>

<template lang="pug">
  input.bg-input(@input="$emit('input', $event.target.value)", :value="value")
</template>

<script>
export default {
  props: {
    value: {
      type: [Number, String],
      default: '',
    },
  },
};
</script>
