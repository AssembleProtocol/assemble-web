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
  .close-button {
    position: absolute;
    top: 28px;
    left: 20px;
    width: 24px;
    height: 24px;
    background-image: url('~@/assets/close-black.svg');
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
  .form-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
  }
  .label {
    font-weight: bold;
    line-height: 32px;
    color: rgba(31, 46, 68, .6);
  }
  .value {
    font-weight: bold;
    line-height: 32px;
  }
  .notice-description {
    margin-top: 20px;
    font-size: 14px;
    line-height: 28px;
    color: rgba(31, 46, 68, .6);
  }
  @media only screen and (min-width: 768px) {
    .nav {
      position: relative;
      top: unset;
      height: 120px;
      padding: 0 80px;
      background-color: transparent;
    }
    .close-button {
      top: 48px;
      left: 80px;
    }
    .contents {
      margin: 0 auto;
      padding: 20px;
    }
  }
</style>

<template lang="pug">
  section.store-order-complete-container
    nav.nav
      button.close-button(@click="goToHome")
      h1.title {{ $t('title') }}
    .contents.assemble-section(v-if="purchasedItem")
      product-list-item(
        :image="purchasedItem.itemImage",
        :brandName="purchasedItem.itemBrandName",
        :name="purchasedItem.itemName",
      )
      .form-group
        p.label {{ $t('receivePhoneNumber') }}
        p.value {{ purchasedItem.phoneNumber }}
      p.notice-description {{ $t('description') }}
</template>

<script>
import gql from 'graphql-tag';
import { mapState } from 'vuex';
import ProductListItem from './components/ProductListItem';

export default {
  props: {
    purchasedId: {
      type: String,
      default: null,
    },
  },
  components: {
    ProductListItem,
  },
  apollo: {
    purchasedItem: {
      query: gql`query ($_id: ID!) {
        purchasedItem(_id: $_id) {
          _id
          userId
          paid
          expire
          itemId
          itemName
          itemImage
          itemBrandName
          createdAt
          phoneNumber
        }
      }`,
      variables() {
        return {
          _id: this.purchasedId,
        };
      },
    },
  },
  computed: {
    ...mapState({
      phoneNumber: (state) => state.route.query.phoneNumber,
    }),
  },
  methods: {
    goToHome() {
      this.$router.back();
    },
  },
};
</script>

<i18n>
{
  "ko": {
    "title": "재발송 요청이 완료되었습니다.",
    "receivePhoneNumber": "받는 번호",
    "description": "받는 번호로 몇 분 내로 티켓이 도착합니다!"
  },
  "en": {
    "title": "Your re-send request has been completed.",
    "receivePhoneNumber": "receive phone number",
    "description": "Your ticket will arrive in a few minutes at the phone number you receive!"
  },
  "ja": {
    "title": "再送の要請が完了しました。",
    "receivePhoneNumber": "受け取る番号",
    "description": "受け取る番号で数分以内にチケットが届きます！"
  },
  "cn": {
    "title": "重新发送请求已完成 。",
    "receivePhoneNumber": "收件编号",
    "description": "几分钟内就能收到票！"
  }
}
</i18n>
