<style lang="less" scoped>
  .container {
    padding: 0 10px;
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
    > * { flex-shrink: 0; }
  }
  #svg {
    width: 100%;
    flex: 1;
  }
  .date-list {
    display: flex;
    align-items: center;
    width: 100%;
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
  }
  .target-line {
    position: relative;
    width: 2px;
    flex: 1;
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
    position: absolute;
    height: 22px;
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
  section.container
    .svg-wrapper
      .ratio-wrapper
        svg#svg(ref="svg")
        .date-list
          p.date 28
          p.date 29
          p.date 30
          p.date 31
          p.date 1
          p.date 2
        .target-line-wrapper(v-if="clickedIndex >= 0", :style="targetLineStyleObj")
          .target-line
          //- p.target-line-text 12/01 9:00
</template>

<script>
import * as d3 from 'd3';

const DATA = [
  { min: 120, max: 140, start: 120, end: 135 },
  { min: 100, max: 135, start: 135, end: 125 },
  { min: 120, max: 140, start: 125, end: 140 },
  { min: 130, max: 160, start: 140, end: 150 },
  { min: 120, max: 170, start: 150, end: 110 },
  { min: 100, max: 130, start: 110, end: 115 },
];

const SMALL_BAR_WIDTH = 4;
const BAR_MIN_HEIGHT = 1;

// TODO: scope min max를 데이터에서 구해서 표시. 일정 이상 작아지진 않도록.

export default {
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
    const { width: contentsWidth, height: contentHeight } = this.$refs.svg.getBoundingClientRect();
    const svg = d3.select('#svg');
    this.bottomBarWidth = contentsWidth / DATA.length;
    this.middleBarWidth = this.bottomBarWidth - 10;

    svg.selectAll('bar').data(DATA).enter().append('rect')
      .attr('height', (d) => {
        let height = Math.abs(d.end - d.start);
        if (height === 0) height = BAR_MIN_HEIGHT;
        return height;
      })
      .attr('width', this.bottomBarWidth)
      .attr('fill', (d) => {
        if ((d.end - d.start) < 0) return 'rgba(5,0,255,.1)';
        return 'rgba(238,2,0,.1)';
      })
      .attr('x', (d, i) => this.bottomBarWidth * i)
      .attr('y', (d) => contentHeight - Math.abs(d.end - d.start));

    const index = d3.local();

    svg.selectAll('bar').data(DATA).enter().append('rect')
      .attr('height', (d) => {
        let height = Math.abs(d.end - d.start);
        if (height === 0) height = BAR_MIN_HEIGHT;
        return height;
      })
      .attr('width', this.middleBarWidth)
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

    svg.selectAll('bar').data(DATA).enter().append('rect')
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
      });
  },
};
</script>
