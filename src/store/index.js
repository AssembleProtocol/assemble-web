import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    me: null,
  },
  mutations: {
    SET_ME(state, me) {
      state.me = me;
    },
  },
  actions: {
    async login(_, { email, password }) {
      const { data } = await axios.post('/login', { email, password });
      const { accessToken } = data;
      return accessToken;
    },
    async fetchMe({ commit }) {
      const { data: me } = await axios.get('/users/me');
      commit('SET_ME', me);
    },
  },
  modules: {
  },
});
