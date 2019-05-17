import Vue from 'vue';
import Router from 'vue-router';
import login from '@/components/account/login';
import home from '@/components/home';
import welcome from '@/components/test/welcome';
import GLOBAL from '@/components/base/global';
import adminUserList from '@/components/views/adminUser/adminUserList';
import banner from '@/components/views/banner/banner';
import launcherPic from '@/components/views/banner/launcherPic';
import pk10match from '@/components/views/match/pk10MatchList';
import sgftmatch from '@/components/views/match/sgftMatchList';
import zqjcmatch from '@/components/views/match/zqjcMatchList';
import cqsscmatch from '@/components/views/match/cqsscMatchList';
import vipUserList from '@/components/views/vipUserManager/vipUserList';
import vipUserPayDetailList from '@/components/views/vipUserManager/vipUserPayDetailList';
import orderList from '@/components/views/OrderManager/orderList';
import orderTicketList from '@/components/views/OrderManager/orderTicketList';
import vipUserDetail from '@/components/views/vipUserManager/vipUserDetail';
import vipUserWithdraw from '@/components/views/vipUserManager/vipUserWithdraw';
import bindwx from '@/components/openwx/bind';
import wxbinded from '@/components/openwx/binded';
import wxbindsuccess from '@/components/openwx/bindsuccess';
import wxunbindsuccess from '@/components/openwx/unbindsuccess';
import wxrouter from '@/components/openwx/wxrouter';

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/open/wx/bind',
      name: 'bindwx',
      component: bindwx,
      meta: {
        title: '用户绑定'
      }
    },
    {
      path: '/open/wx/bind/success',
      name: 'wxbindsuccess',
      component: wxbindsuccess,
      meta: {
        title: '绑定成功'
      }
    },
    {
      path: '/open/wx/unbind/success',
      name: 'wxunbindsuccess',
      component: wxunbindsuccess,
      meta: {
        title: '解除绑定'
      }
    },
    {
      path: '/open/wx/binded',
      name: 'wxbinded',
      component: wxbinded,
      meta: {
        title: '已绑定'
      }
    },
    {
      path: '/open/wx/router',
      name: 'wxrouter',
      component: wxrouter
    },
    {
      // 管理员账号列表
      path: '/system',
      name: '系统设置',
      type: 'home',
      component: home,
      iconCls: 'el-icon-menu',
      redirect: '/welcome',
      menuShow: true,
      children: [
        {path: '/admin/user', component: adminUserList, name: '后台账号管理', menuShow: true}
      ]
    },
    {
      path: '/vip',
      name: '会员列表',
      type: 'home',
      component: home,
      iconCls: 'el-icon-edit',
      redirect: '/welcome',
      menuShow: true,
      children: [
        {path: '/vip/baseInfo', component: vipUserList, name: '会员详情 - 基本信息', menuShow: true},
        {path: '/vip/cashDetail', component: vipUserPayDetailList, name: '会员详情 - 流水明细', menuShow: true},
        {path: '/vip/userDetail', component: vipUserDetail, name: '会员详情 - 会员详情'},
       /* {path: '/vip/betDetail', name: '会员详情 - 购彩记录', menuShow: true}, */
       /* {path: '/vip/orderDetail', component: vipUserOrderList, name: '会员详情 - 订单记录', menuShow: true}, */
        {path: '/vip/withdraw', component: vipUserWithdraw, name: '会员详情 - 提现记录', menuShow: true}
      ]
    },
    {
      path: '/order',
      name: '订单记录',
      type: 'home',
      component: home,
      iconCls: 'el-icon-goods',
      redirect: '/welcome',
      menuShow: true,
      children: [
        {path: '/order/list', component: orderList, name: '订单列表', menuShow: true},
        {path: '/order/ticket/list', component: orderTicketList, name: '投注列表', menuShow: true}
      ]
    },
    {
      path: '/reward',
      name: '期程列表',
      type: 'home',
      component: home,
      iconCls: 'el-icon-picture-outline',
      redirect: '/welcome',
      menuShow: true,
      children: [
        {path: '/pk10match/list', name: '北京赛车PK10', component: pk10match, menuShow: true},
        {path: '/sgftmatch/list', name: 'SG飞艇', component: sgftmatch, menuShow: true},
        {path: '/zqjcmatch/list', name: '足球竞彩', component: zqjcmatch, menuShow: true},
        {path: '/cqsscmatch/list', name: '重庆时时彩', component: cqsscmatch, menuShow: true}
      ]
    },
    {
      path: '/platform',
      name: '平台设置',
      type: 'home',
      component: home,
      iconCls: 'el-icon-setting',
      redirect: '/welcome',
      menuShow: true,
      children: [
        {path: '/platform/adv/pics', name: '广告图管理', component: banner, menuShow: true},
        {path: '/platform/welcome/pics', name: '启动图管理', component: launcherPic, menuShow: true}
      ]
    },
    {
      path: '/index',
      component: home,
      name: 'home',
      redirect: '/welcome',
      children: [{
        path: '/welcome',
        name: 'home-welcome',
        component: welcome
      }]
    },
    {
      path: '/',
      redirect: '/index'
    }
  ]
});
router.beforeEach((to, from, next) => {
  console.log('to: ' + to.path);
  if (to.path.startsWith('/login')) {
    window.sessionStorage.removeItem(GLOBAL.STRING_DEFINE.ACCESS_USER);
    next();
  } else if (to.path.startsWith('/open')) {
    next();
  } else {
    let user = window.sessionStorage.getItem(GLOBAL.STRING_DEFINE.ACCESS_USER);
    if (!user) {
      next({path: '/login'});
    } else {
      next();
    }
  }
});

export default router;
