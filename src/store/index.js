import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  collapsed: false,
  count: 0,
  leftNavState: 'home',
  curNavMenuActive: ''
};

const mutations = {
  increment (state) {
    state.count++;
  }
};

const store = new Vuex.Store({
  state,
  mutations
});

export default store;
