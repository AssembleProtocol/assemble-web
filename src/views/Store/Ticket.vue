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
    display: flex;
    flex-direction: column;
    margin: -10px 0;
    padding: 0 20px;
  }
  .empty-text {
    margin-top: 10px;
    font-size: 14px;
    line-height: 28px;
    color: rgba(72, 89, 109, .6);
  }
  .ticket-item {
    display: flex;
    align-items: center;
    margin: 10px 0;
  }
  .ticket-item-content {
    flex: 1;
  }
  .ticket-button {
    height: 30px;
    line-height: 30px;
    margin-left: 20px;
    border-radius: 4px;
    padding: 0 10px;
    background-color: #fafafa;
    font-size: 14px;
    font-weight: bold;
    color: #1D6AFE;

    &.expired {
      color: #ADADAD;
      cursor: default;
    }
  }
  @media only screen and (min-width: 768px) {
    .nav {
      position: inherit;
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
  }
</style>

<template lang="pug">
  section.store-tickets-container
    nav.nav
      button.back-button(@click="$router.back()")
      h1.title {{ $t('title') }}
    .contents.assemble-section(v-if="isEmpty")
      p.empty-text {{ $t('emptyText') }}
    .contents.assemble-section(v-else)
      .ticket-item(v-for="purchasedItem in purchasedItems", :key="purchasedItem._id")
        .ticket-item-content
          product-list-item(
            :image="purchasedItem.itemImage",
            :brandIcon="purchasedItem.itemBrandIcon",
            :brandName="purchasedItem.itemBrandName",
            :name="purchasedItem.itemName",
          )
        button.ticket-button.expired(v-if="expiredTicketsMap[purchasedItem._id]") {{ $t('expired') }}
        button.ticket-button(v-else, @click="goToResending(purchasedItem._id)") {{ $t('resend') }}
</template>

<script>
import gql from 'graphql-tag';
import moment from 'moment';
import ProductListItem from './components/ProductListItem';

export default {
  components: {
    ProductListItem,
  },
  apollo: {
    purchasedItems: {
      query: gql`{
        purchasedItems {
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
    isEmpty() {
      if (!this.purchasedItems || (this.purchasedItems.length === 0)) return true;
      return false;
    },
    expiredTicketsMap() {
      const map = {};
      this.purchasedItems.forEach((purchasedItem) => {
        const now = moment();
        map[purchasedItem._id] = now.diff(moment(purchasedItem.expire)) > 0;
      });
      return map;
    },
  },
  methods: {
    async goToResending(purchasedItemId) {
      try {
        await this.$apollo.mutate({
          mutation: gql`mutation ($purchasedItemId: ID!) {
            resendPurchaseMMS(purchasedItemId: $purchasedItemId) {
              _id
              userId
              paid
              expire
              itemId
              itemName
              itemImage
              itemBrandName
              itemBrandIcon
              createdAt
              phoneNumber
            }
          }`,
          variables: {
            purchasedItemId,
          },
        });
        this.$router.push(this.$localePath(`/store/resend-ticket-complete/${purchasedItemId}`));
      } catch (e) {
        console.error(e);
        this.$toast('사용되었거나 만료되어 재발송할 수 없는 상태입니다.');
      }
    },
  },
};
</script>

<i18n>
{
  "ko": {
    "title": "구입한 티켓들",
    "emptyText": "구입한 티켓이 없습니다.",
    "expired": "만료됨",
    "resend": "재발송"
  },
  "en": {
    "title": "Purchased tickets",
    "emptyText": "There is no ticket you purchased.",
    "expired": "expired",
    "resend": "resend"
  }
}
</i18n>
