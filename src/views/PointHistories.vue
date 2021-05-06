<style lang="less" scoped>
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
</style>

<template lang="pug">
  section.point-histories-container
    nav.nav
      button.back-button(@click="$router.back()")
      h1.title 포인트 내역
    .contents
      .list-item-group
        small-list-item(
          v-for="history in histories",
          :key="history._id",
          :appId="history.appId",
          :title="history.appId === 'clubpass' ? '클럽패스' : 'ASM 교환소'",
          :titleSuffix="history.createdAt",
          :subtitle="history.message",
          size="small",
        )
          point-text.partner-item-point(slot="suffix", :type="history.amount > 0 ? 'plus' : 'minus'", :value="Math.abs(history.amount)", size="small")
</template>

<script>
import SmallListItem from '@/components/SmallListItem';
import PointText from '@/components/PointText';

export default {
  components: {
    SmallListItem,
    PointText,
  },
  data() {
    return {
      histories: null,
    };
  },
  async mounted() {
    const { data: histories } = await this.$http.get('/users/me/point-histories');
    this.histories = histories;
  },
};
</script>
