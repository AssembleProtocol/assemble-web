<style lang="less" scoped>
  .asm-input-wrapper {
    position: relative;
    height: 57px;
    width: 100%;
    border-radius: 9px;
    background-color: #191F28;
  }
  .icon-wrapper {
    position: absolute;
    top: 1px;
    width: 55px;
    height: 55px;
    &.prefix {
      left: 1px;
    }
    &.suffix {
      right: 1px;
    }
  }
  .input {
    width: 100%;
    height: 57px;
    border: 1px solid transparent;
    border-radius: 9px;
    padding: 0 10px;
    line-height: 55px;
    color: #F7F8FA;
    font-size: 18px;
    font-weight: bold;
    &:focus {
      border-color: #2E75FF;
    }
    &.hasPrefix {
      padding-left: 66px;
    }
    &.hasSuffix {
      padding-right: 66px;
    }
  }
</style>

<template lang="pug">
  .asm-input-wrapper
    .icon-wrapper.prefix(v-if="$slots.prefix")
      slot(name="prefix")
    input.input(
      :value="value",
      :class="{ hasPrefix, hasSuffix }",
      :style="inputStyleObj",
      :readonly="readonly",
      :placeholder="placeholder",
      :type="type",
      @input="input",
      @blur="blur",
    )
    .icon-wrapper.suffix(v-if="$slots.suffix")
      slot(name="suffix")
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    fontSize: {
      type: Number,
      default: 18,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  computed: {
    hasPrefix() {
      if (this.$slots.prefix) return true;
      return false;
    },
    hasSuffix() {
      if (this.$slots.suffix) return true;
      return false;
    },
    inputStyleObj() {
      const obj = {};
      if (this.fontSize) obj.fontSize = `${this.fontSize}px`;
      return obj;
    },
  },
  methods: {
    input(e) {
      this.$emit('input', e.target.value);
    },
    blur(e) {
      this.$emit('blur', e);
    },
  },
};
</script>
