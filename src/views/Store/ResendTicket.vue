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
  .phone-number-input {
    margin-top: 20px;
  }
  .submit-button {
    width: 100%;
    height: 55px;
    margin-top: 20px;
    border-radius: 9px;
    background-color: #1D6AFE;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    line-height: 55px;
    text-align: center;

    &.inactive {
      background-color: #868A93;
      color: #D6D9E0;
    }
  }
</style>

<template lang="pug">
  section.store-ticket-resend-container
    nav.nav
      button.back-button(@click="$router.back()")
      h1.title 재발송하기
    .contents
      bg-input.phone-number-input(
        type="tel",
        placeholder="티켓을 받을 휴대전화번호 입력",
        v-model="phoneNumber",
        @input.native="validPhoneNumber",
      )
      button.submit-button(
        :class="{ inactive: !phoneNumberValidity }",
        @click="submitOrder",
      ) {{ validityText }}
</template>

<script>
import { mapState } from 'vuex';
import Phone from 'phone';
import BgInput from '@/components/BgInput';

export default {
  components: {
    BgInput,
  },
  computed: {
    ...mapState({
      ticketId: (state) => state.route.query.ticketId,
    }),
    validityText() {
      if (this.phoneNumberValidity) return '요청하기';
      return '유효한 휴대전화번호를 입력하세요';
    },
  },
  data() {
    return {
      phoneNumber: null,
      phoneNumberValidity: false,
    };
  },
  methods: {
    validPhoneNumber($event) {
      const { value } = $event.target;
      this.phoneNumberValidity = !!Phone(value, 'KOR').length;
    },
    submitOrder() {
      if (!this.phoneNumberValidity) return;
      // TODO: resend api 호출
      this.$router.replace({
        path: '/store/resend-ticket-complete/456',
        query: { phoneNumber: this.phoneNumber },
      });
    },
  },
};
</script>
