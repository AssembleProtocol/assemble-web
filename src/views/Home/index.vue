<style lang="less" scoped>
  .nav {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 80px;
    padding: 0 20px;
    background-color: #fff;
    z-index: 999;
  }
  .nav-point-box {
    display: none;
  }
  .profile-button {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #F7F8FA;
    background-image: url(~@/assets/user-icon.png);
    background-size: 24px;
    background-position: center;
    background-repeat: no-repeat;
  }
  .section {
    padding: 20px;
  }
  .point-box {
    height: 145px;
    border-radius: 46px;
    padding: 20px 28px;
    background-color: #F7F8FA;
  }
  .point-box-text {
    margin-top: 10px;
  }
  .section-title {
    font-size: 24px;
    line-height: 36px;
  }
  .list-item-group {
    margin-top: 20px;
  }
  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .link-button {
    font-size: 14px;
    font-weight: bold;
    line-height: 28px;
    color: #6096FF;
  }
  @media only screen and (min-width: 768px) {
    .home-container {
      max-width: 1185px;
      margin: 0 auto;
    }
    .nav {
      position: relative;
      justify-content: unset;
      height: 120px;
      padding: 0 60px;
      background-color: transparent;
    }
    .nav-point-box {
      display: flex;
      align-items: center;
      height: 32px;
      margin-left: auto;
      padding: 0 8px;
      border-radius: 12px;
      background-color: #F7F8FA;
    }
    .nav-point-box-title {
      font-size: 14px;
      line-height: 24px;
      color: #48596D;
      font-weight: bold;
    }
    .nav-point-box-text {
      margin-left: 10px;
    }
    .profile-button {
      margin-left: 20px;
    }
    .article {
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
      align-items: flex-start;
      margin-top: -20px;
      > * { flex-shrink: 0; }
    }
    .section {
      background-color: #FFFFFF;
      box-shadow: 0px 2px 48px rgba(31, 46, 68, 0.08);
      border-radius: 20px;
    }
    .point-section {
      display: none;
    }
    .desktop-section {
      width: calc(100% * 2 / 5);
      padding: 20px;
    }
    .histories-section {
      margin-top: 40px;
    }
    .store-section-wrapper {
      width: calc(100% * 3 / 5);
      padding: 20px;
    }
  }
</style>

<template lang="pug">
  section.home-container
    nav.nav
      img.logo(src="@/assets/assemble-logo.png", height="32")
      .nav-point-box
        span.nav-point-box-title {{ $t('holdingPoints') }}
        point-text.nav-point-box-text(:value="totalAsp", size="xsmall")
      router-link.profile-button(to="/setting")
    article.article
      section.section.point-section
        .point-box
          nav.point-box-nav
            strong.point-box-title {{ $t('holdingPoints') }}
          point-text.point-box-text(:value="totalAsp")
      section.desktop-section
        section.section.app-section
          h1.section-title {{ $t('connectedApps') }}
          .list-item-group
            router-link.list-item-wrapper(to="/exchange-center")
              list-item(
                :title="$t('asmExchange')",
                appId="exchange",
                subtitle="app.assembleprotocol.com",
              )
            a.list-item-wrapper(
              v-for="myApp in myApps",
              :key="myApp._id",
              :href="myApp.url",
              target="_blank",
              @click="handleLink($event, myApp.url)",
            )
              list-item(:title="myApp.name", :appId="myApp.appId", :subtitle="myApp.subtitle")
        section.section.histories-section(v-if="histories && (histories.length > 0)")
          .section-header
            h1.section-title {{ $t('recentPointsHistories') }}
            router-link.link-button(to="/point-histories") {{ $t('viewAll') }}
          .list-item-group
            small-list-item(
              v-for="history in histories",
              :key="history._id",
              :appId="history.appId",
              :title="historyAppNamesMap[history._id]",
              :titleSuffix="history.createdAt",
              :subtitle="history.message",
              size="small",
            )
              point-text.partner-item-point(slot="suffix", :type="history.amount > 0 ? 'plus' : 'minus'", :value="Math.abs(history.amount)", size="small")
      .store-section-wrapper
        store-section
</template>

<script>
import PointText from '@/components/PointText';
import ListItem from '@/components/ListItem';
import SmallListItem from '@/components/SmallListItem';
import StoreSection from './components/StoreSection';

const MY_APP_URL_MAP = {
  clubpass: 'https://club-pass.com/ko/me',
  sta1: 'https://www.sta1.com/more/menu',
};

const MY_APP_SUBTITLE_MAP = {
  clubpass: 'club-pass.com',
  sta1: 'sta1.com',
};

const MY_APP_NAME_MAP = {
  clubpass: '클럽패스',
  sta1: '스타일닷컴',
};

const APP_TITLE_MAP = {
  clubpass: '클럽패스',
  sta1: '스타일닷컴',
  exchange: 'ASM 교환소',
  market: 'Assemble 마켓',
};

export default {
  components: {
    PointText,
    ListItem,
    SmallListItem,
    StoreSection,
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
      myApps: null,
      totalAsp: 0,
    };
  },
  async mounted() {
    const [
      { data: pointsData },
      { data: histories },
      { data: myApps },
    ] = await Promise.all([
      this.$http.get('/users/me/points'),
      this.$http.get('/users/me/point-histories', { params: { offset: 0, limit: 5 } }),
      this.$http.get('/my-apps'),
    ]);
    const { points } = pointsData;
    this.totalAsp = points;
    this.histories = histories.slice(0, 5);
    this.myApps = myApps.slice(1).map((a) => ({
      ...a,
      url: MY_APP_URL_MAP[a.appId],
      name: MY_APP_NAME_MAP[a.appId],
      subtitle: MY_APP_SUBTITLE_MAP[a.appId],
    }));
  },
  methods: {
    handleLink(e, url) {
      e.preventDefault();
      if (window.s3app) window.s3app.openInAppBrowser(url);
      else window.open(url);
    },
  },
};
</script>

<i18n>
{
  "ko": {
    "holdingPoints": "보유 포인트",
    "connectedApps": "연결된 앱",
    "asmExchange": "ASM 교환소",
    "recentPointsHistories": "최근 포인트 내역",
    "viewAll": "모두 보기"
  },
  "en": {
    "holdingPoints": "holding points",
    "connectedApps": "connected apps",
    "asmExchange": "ASM Exchange",
    "recentPointsHistories": "Recent Points Histories",
    "viewAll": "view all"
  }
}
</i18n>
