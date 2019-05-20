import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  collapsed: false,
  curNavMenuActive: ''
};

const mutations = {
};

const store = new Vuex.Store({
  state,
  mutations
});

export default store;
