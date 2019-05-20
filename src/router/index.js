import Vue from 'vue';
import Router from 'vue-router';
import login from '@/components/account/login';
import register from '@/components/account/register';
import home from '@/components/home';
import welcome from '@/components/views/welcome';
import GLOBAL from '@/components/base/global';
import adminUserList from '@/components/views/adminUser/adminUserList';
import userList from '@/components/views/user/userList';
import userDetail from '@/components/views/user/userDetail';
import bike from '@/components/views/bike/bikeManager';
import site from '@/components/views/site/siteManager';

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      // 管理员账号列表
      path: '/admin',
      name: '管理员系统',
      type: 1,
      component: home,
      iconCls: 'el-icon-menu',
      redirect: '/welcome',
      menuShow: true,
      leaf: false,
      children: [
        {path: '/admin/account', component: adminUserList, name: '账号管理', menuShow: true},
        {path: '/admin/user', component: userList, name: '用户管理', menuShow: true},
        {path: '/admin/bike', component: bike, name: '车辆管理', menuShow: true},
        {path: '/admin/site', component: site, name: '站点管理', menuShow: true}
      ]
    },
    {
      path: '/user',
      name: '用户系统',
      type: 0,
      component: home,
      iconCls: 'el-icon-edit',
      redirect: '/welcome',
      menuShow: true,
      leaf: false,
      children: [
        {path: '/user/detail', component: userDetail, name: '个人信息', menuShow: true},
        {path: '/user/bike', component: bike, name: '车辆管理', menuShow: true},
        {path: '/user/site', component: site, name: '站点管理', menuShow: true}
      ]
    },
    {
      path: '/index',
      component: home,
      name: 'admin',
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
  } else if (to.path.startsWith('/register')) {
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
