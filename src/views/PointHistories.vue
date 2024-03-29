<style lang="less" scoped>
  .point-histories-container {
    height: 100%;
    overflow-y: auto;
    padding-bottom: 120px;
  }
  .nav {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    padding: 0 20px;
    z-index: 999;
    background-color: #fff;
  }
  .back-button {
    position: absolute;
    top: 28px;
    left: 20px;
    width: 24px;
    height: 24px;
    background-image: url('~@/assets/back-button.png');
    background-repeat: no-repeat;
    background-size: cover;
  }
  .title {
    font-size: 16px;
    line-height: 26px;
  }
  .contents {
    padding: 0 20px;
  }
  .list-item-group {
    margin-top: 10px;
  }
  @media only screen and (min-width: 768px) {
    .nav {
      position: relative;
      height: 120px;
      padding: 0 80px;
      background-color: transparent;
    }
    .back-button {
      top: 48px;
      left: 80px;
    }
    .contents {
      margin: 0 auto;
      padding: 20px;
    }
    .list-item-group {
      margin-top: 0;
    }
  }
</style>

<template lang="pug">
  section.point-histories-container(
    v-infinite-scroll="fetchNextHistories",
    :infinite-scroll-immediate-check="false",
    :infinite-scroll-distance="300",
  )
    nav.nav
      button.back-button(@click="$router.back()")
      h1.title {{ $t('title') }}
    .contents.assemble-section
      .list-item-group
        small-list-item(
          v-for="(history, index) in histories",
          :key="history._id",
          :appId="history.appId",
          :title="historyAppNamesMap[history._id]",
          :titleSuffix="history.createdAt",
          :subtitle="history.message",
          size="small",
        )
          point-text.partner-item-point(slot="suffix", :type="history.amount > 0 ? 'plus' : 'minus'", :value="Math.abs(history.amount)", size="small")
</template>

<script>
import SmallListItem from '@/components/SmallListItem';
import PointText from '@/components/PointText';

const APP_TITLE_MAP = {
  clubpass: '클럽패스',
  sta1: '스타일닷컴',
  exchange: 'ASM 교환소',
  market: 'Assemble 마켓',
};

const LIMIT = 20;

export default {
  components: {
    SmallListItem,
    PointText,
  },
  computed: {
    historyAppNamesMap() {
      if (!this.histories) return {};
      const map = {};
      this.histories.forEach((history) => {
        map[history._id] = APP_TITLE_MAP[history.appId];
      });

      return map;
    },
  },
  data() {
    return {
      histories: null,
      initLoading: false,
      fetchLoading: false,
      offset: 0,
      hasMore: false,
    };
  },
  mounted() {
    document.documentElement.classList.add('full-height');
    this.initHistories();
  },
  destroyed() {
    document.documentElement.classList.remove('full-height');
  },
  methods: {
    async initHistories() {
      if (this.initLoading) return;
      this.initLoading = true;
      try {
        const { data: histories } = await this.$http.get('/users/me/point-histories', { params: { offset: 0, limit: LIMIT } });
        this.histories = histories;

        if (this.histories.length === LIMIT) this.hasMore = true;
        else this.hasMore = false;
      } catch (e) {
        if (!e.response || !e.response.data) return;
        this.$toast(e.response.data.message);
      } finally {
        this.initLoading = false;
      }
    },
    async fetchNextHistories() {
      if (this.fetchLoading || !this.hasMore) return;
      this.fetchLoading = true;
      try {
        this.offset += LIMIT;
        const { data: histories } = await this.$http.get('/users/me/point-histories', { params: { offset: this.offset, limit: LIMIT } });
        histories.forEach((history) => this.histories.push(history));

        if (histories.length === LIMIT) this.hasMore = true;
        else this.hasMore = false;
      } catch (e) {
        if (!e.response || !e.response.data) return;
        this.$toast(e.response.data.message);
      } finally {
        this.fetchLoading = false;
      }
    },
  },
};
</script>

<i18n>
{
  "ko": {
    "title": "포인트 내역"
  },
  "en": {
    "title": "Point History"
  },
  "ja": {
    "title": "ポイントの内訳"
  },
  "cn": {
    "title": "积分明细"
  }
}
</i18n>
