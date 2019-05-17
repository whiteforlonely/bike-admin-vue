// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import VueResource from 'vue-resource';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/style.css';
import '@/assets/css/common.css';
import GLOBAL from './components/base/global';
import utils from './components/base/utils';
import 'vue-easytable/libs/themes-base/index.css';
import {VTable, VPagination} from 'vue-easytable';
import Toast from './components/views/common/toast';

Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(VueResource);
Vue.use(Toast);
Vue.config.productionTip = false;
Vue.prototype.GLOBAL = GLOBAL;
Vue.prototype.$utils = utils;
Vue.component(VTable.name, VTable);
Vue.component(VPagination.name, VPagination);

const app = new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});

// 网络请求加载动画
Vue.prototype.openLoading = function () {
  const loading = this.$loading({
    lock: true,
    text: '加载中...',
    spinner: 'el-icon-loading',
    background: 'rgba(0,0,0,0.7)',
    target: '#main'
  });

  setTimeout(function () {
    loading.close();
  }, 5000);

  return loading;
};

Vue.http.interceptors.push((request, next) => {
  const rLoading = app.openLoading();
  next((response) => {
    rLoading.close();
    return response;
  });
});
