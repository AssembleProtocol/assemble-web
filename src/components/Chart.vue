<style lang="less" scoped>
  .chart-container {
    padding: 0 20px;
  }
  .svg-wrapper {
    position: relative;
    width: 100%;
    padding-top: 100%;
  }
  .ratio-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: auto;
    > * { flex-shrink: 0; }
  }
  #svg {
    width: calc(((100vw - 60px) / 6) * 14);
    flex: 1;
  }
  .date-list {
    display: flex;
    align-items: center;
    width: calc(((100vw - 60px) / 6) * 14);
    height: 28px;
    > * { flex-shrink: 0; }
  }
  .date {
    flex: 1;
    font-size: 12px;
    line-height: 18px;
    color: #DADADA;
    text-align: center;
  }
  .target-line-wrapper {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    > * { flex-shrink: 0; }
  }
  .target-line {
    position: relative;
    width: 2px;
    height: calc(100% - 28px);
    background-color: #404040;
    &::after {
      content: "";
      display: block;
      position: absolute;
      bottom: -3px;
      left: -2px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #404040;
    }
  }
  .target-line-text {
    height: 18px;
    margin-top: 7px;
    padding: 0 5px;
    border-radius: 6px;
    background-color: #404040;
    color: #fff;
    white-space: nowrap;
    font-weight: bold;
    font-size: 12px;
    line-height: 18px;
  }
</style>

<template lang="pug">
  .chart-container
    .svg-wrapper
      .ratio-wrapper(ref="wrapper")
        svg#svg
        .date-list
          p.date(v-for="d in data") {{ d.date | dateFilter }}
        .target-line-wrapper(v-if="clickedIndex >= 0", :style="targetLineStyleObj")
          .target-line
          p.target-line-text 12/01 9:00
</template>

<script>
import moment from 'moment';
import * as d3 from 'd3';

const SMALL_BAR_WIDTH = 4;
const BAR_MIN_HEIGHT = 1;

// TODO: scope min max를 데이터에서 구해서 표시. 일정 이상 작아지진 않도록.

export default {
  props: {
    data: { type: Array, default: () => [] },
  },
  filters: {
    dateFilter(date) {
      return moment(date).format('D');
    },
  },
  computed: {
    targetLineStyleObj() {
      const obj = {};
      if (this.clickedIndex >= 0) {
        obj.width = `${this.bottomBarWidth}px`;
        obj.left = `${this.clickedIndex * this.bottomBarWidth}px`;
      }
      return obj;
    },
  },
  data() {
    return {
      clickedIndex: -1,
      bottomBarWidth: null,
      middleBarWidth: null,
    };
  },
  mounted() {
    const { width: contentsWidth, height: wrapperHeight } = this.$refs.wrapper.getBoundingClientRect();
    const contentHeight = wrapperHeight - 28;
    const svg = d3.select('#svg');
    this.bottomBarWidth = contentsWidth / 6;
    this.middleBarWidth = this.bottomBarWidth - 10;

    const index = d3.local();

    svg.selectAll('bar').data(this.data).enter().append('rect')
      .attr('width', this.bottomBarWidth)
      .attr('height', (d) => {
        let height = Math.abs(d.end - d.start);
        console.log(height);
        if (height === 0) height = BAR_MIN_HEIGHT;
        return height;
      })
      .attr('fill', (d) => {
        if ((d.end - d.start) < 0) return 'rgba(5,0,255,.1)';
        return 'rgba(238,2,0,.1)';
      })
      .attr('x', (d, i) => this.bottomBarWidth * i)
      .attr('y', (d) => contentHeight - Math.abs(d.end - d.start))
      .each((d, i) => { index.set(d, i); })
      .on('click', ($event, d) => { this.clickedIndex = index.get(d); });

    svg.selectAll('bar').data(this.data).enter().append('rect')
      .attr('width', this.middleBarWidth)
      .attr('height', (d) => {
        let height = Math.abs(d.end - d.start);
        if (height === 0) height = BAR_MIN_HEIGHT;
        return height;
      })
      .attr('fill', (d) => {
        if ((d.end - d.start) < 0) return 'rgba(5,0,255)';
        return 'rgba(238,2,0)';
      })
      .attr('x', (d, i) => (this.bottomBarWidth * i) + (this.bottomBarWidth - this.middleBarWidth) / 2)
      .attr('y', (d) => {
        if ((d.end - d.start) >= 0) return contentHeight - d.end;
        return contentHeight - d.start;
      })
      .each((d, i) => { index.set(d, i); })
      .on('click', ($event, d) => { this.clickedIndex = index.get(d); });

    svg.selectAll('bar').data(this.data).enter().append('rect')
      .attr('height', (d) => {
        let height = Math.abs(d.max - d.min);
        if (height === 0) height = BAR_MIN_HEIGHT;
        return height;
      })
      .attr('width', SMALL_BAR_WIDTH)
      .attr('fill', (d) => {
        if ((d.end - d.start) < 0) return 'rgba(5,0,255)';
        return 'rgba(238,2,0)';
      })
      .attr('x', (d, i) => (this.bottomBarWidth * i) + ((this.bottomBarWidth - SMALL_BAR_WIDTH) / 2))
      .attr('y', (d) => {
        if ((d.max - d.min) < 0) return contentHeight - d.min;
        return contentHeight - d.max;
      })
      .each((d, i) => { index.set(d, i); })
      .on('click', ($event, d) => { this.clickedIndex = index.get(d); });
  },
};
</script>
