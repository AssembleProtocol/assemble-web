<style lang="less" scoped>
  .container {
    padding: 0 10px;
  }
</style>

<template lang="pug">
  section.container
    chart(:data="data")
</template>

<script>
import Chart from '@/components/Chart';

const DATA = [
  { min: 120, max: 140, start: 120, end: 135, date: '2020-12-09' },
  { min: 100, max: 135, start: 135, end: 125, date: '2020-12-10' },
  { min: 120, max: 140, start: 125, end: 140, date: '2020-12-11' },
  { min: 130, max: 160, start: 140, end: 150, date: '2020-12-12' },
  { min: 120, max: 170, start: 150, end: 110, date: '2020-12-13' },
  { min: 100, max: 130, start: 110, end: 115, date: '2020-12-14' },
  { min: 100, max: 130, start: 110, end: 115, date: '2020-12-15' },
  { min: 120, max: 140, start: 120, end: 135, date: '2020-12-16' },
  { min: 100, max: 135, start: 135, end: 125, date: '2020-12-17' },
  { min: 120, max: 140, start: 125, end: 140, date: '2020-12-18' },
  { min: 130, max: 160, start: 140, end: 150, date: '2020-12-19' },
  { min: 120, max: 170, start: 150, end: 110, date: '2020-12-20' },
  { min: 100, max: 130, start: 110, end: 115, date: '2020-12-21' },
  { min: 100, max: 130, start: 110, end: 115, date: '2020-12-22' },
];

export default {
  components: {
    Chart,
  },
  data() {
    return {
      data: DATA,
    };
  },
};
</script>
