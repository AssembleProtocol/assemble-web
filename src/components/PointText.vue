<style lang="less" scoped>
  .point-text-container {
    display: flex;
    align-items: center;
    &.large {
      .point-text {
        font-size: 46px;
        font-weight: bold;
        line-height: 69px;
      }
    }
    &.small {
      .point-text {
        font-size: 18px;
        font-weight: bold;
        line-height: 27px;
      }
    }
    &.plus {
      .point-text {
        color: #4886FD;
      }
    }
  }
  .point-text-icon {
    &.asm {
      margin-left: 5px;
    }
  }
</style>

<template lang="pug">
  .point-text-container(:class="[size, type]")
    p.point-text {{ displayValue }}
    img.point-text-icon(
      :src="iconSrc",
      :class="{ asm: pointType === 'asm' }",
      :height="size === 'large' ? 69 : 27",
    )
</template>

<script>
import DefaultLargeIcon from '@/assets/asp-icon-large.svg';
import DefaultSmallIcon from '@/assets/asp-icon-small.svg';
import BlueSmallIcon from '@/assets/asp-icon-small-blue.svg';
import AsmIcon from '@/assets/asm-icon-large.svg';

export default {
  props: {
    value: {
      type: [String, Number],
      default: '0',
    },
    size: {
      type: String,
      default: 'large', // 'large', 'small'
    },
    type: {
      type: String,
      default: 'default', // 'default', 'plus', 'minus';
    },
    pointType: {
      type: String,
      default: 'asp', // 'asp', 'asm'
    },
  },
  computed: {
    displayValue() {
      if (this.type === 'plus') return `+${this.value}`;
      if (this.type === 'minus') return `-${this.value}`;
      const numberValue = Number(this.value || 0);
      return numberValue.toLocaleString();
    },
    iconSrc() {
      if (this.pointType === 'asm') return AsmIcon;
      if (this.type === 'large') return DefaultLargeIcon;
      if (this.type === 'plus') return BlueSmallIcon;
      return DefaultSmallIcon;
    },
  },
};
</script>
