<template>
  <el-row class="container">
    <el-col :span="24" class="topbar-wrap">
      <div class="topbar-logo topbar-btn">
        <a href="/"><img src="../assets/logo.png" style="padding-left:8px;"></a>
      </div>
      <div class="topbar-logos">
        <a href="/" style="color: #fff;"><span>车辆共享系统</span></a>
      </div>
      <div class="topbar-account topbar-btn">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner">
            <i class="iconfont icon-user"></i> 你好，{{nickname}}   <i class="el-icon-caret-bottom"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
    <el-col :span="24" class="main">
      <aside :class="{showSidebar: !collapsed}">
        <el-menu unique-opened router :collapse="collapsed" ref="leftNavigation" :default-active="navselected" :active="navselected">

          <template v-for="(item, index) in $router.options.routes">
            <template v-if="Number(item.type) === Number(userType) && !item.leaf">
              <el-submenu :key="item.name" :index="index+''" v-show="item.menuShow">
                <template slot="title"><i :class="item.iconCls"></i><span slot="title">{{item.name}}</span></template>
                <el-menu-item v-for="(term) in item.children" :key="term.name" :index="term.path" v-if="term.menuShow"
                              :class="$route.path===term.path? 'is-active' : ''">
                  <i :class="term.iconCls"></i><span slot="title">{{term.name}}</span>
                </el-menu-item>
              </el-submenu>
            </template>
          </template>
        </el-menu>
      </aside>
      <div class="menu-toggle" @click.prevent="collapse">
        <i class="el-icon-caret-left" v-show="!collapsed" title="收起"></i>
        <i class="el-icon-caret-right" v-show="collapsed" title="展开"></i>
      </div>
      <section class="content-container">
        <div class="grid-content el-button-group">
          <el-col :span="24">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
        collapsed: this.$store.state.collapsed,
        nickname: '',
        navselected: '/',
        userType: 0
      };
    },

    methods: {
      collapse: function () {
        this.collapsed = !this.collapsed;
        this.$store.state.collapsed = this.collapsed;
      },

      logout: function () {
        let _this = this;
        this.$confirm('确认退出吗', '提示').then(() => {
          sessionStorage.removeItem(this.GLOBAL.STRING_DEFINE.ACCESS_USER);
          _this.$router.push('/login');
        });
      },

      getNavType: function () {
        this.navselected = this.$store.state.curNavMenuActive;
        this.$refs.leftNavigation.initOpenedMenu();
      }
    },

    watch: {
      '$store.state.curNavMenuActive': 'getNavType'
    },

    created () {
      let nickname = JSON.parse(window.sessionStorage.getItem(this.GLOBAL.STRING_DEFINE.ACCESS_USER)).userName;
      let userType = window.sessionStorage.getItem(this.GLOBAL.STRING_DEFINE.USER_TYPE);
      if (nickname) {
        this.nickname = nickname;
      }
      if (userType) {
        this.userType = userType;
      }
    }
  };
</script>
