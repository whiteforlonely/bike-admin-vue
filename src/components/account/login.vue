<template>

  <div class="el-button-group">
    <!--<img src="../../assets/logo.png" class="m-b-20">-->
    <el-card class="width_400 text-center">
      <div slot="header" class="text-center f24">
        <span>车辆共享系统</span>
      </div>
      <el-form>
        <el-form-item>
          <el-input type="text" class="width_300 d_b" placeholder="手机号" v-model="mobilePhone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" class="width_300" placeholder="密码" v-model="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click.native="login" type="primary">{{loginTypeInfo[loginType].label}}</el-button>
        </el-form-item>
      </el-form>
      <div v-show="isUserLogin">
        <el-button type="text" @click.native="toRegister">注册新会员</el-button>
        <el-button type="text" @click.native="adminLogin">管理员登录</el-button>
      </div>
      <div v-show="!isUserLogin">
        <el-button type="text" @click.native="toRegister">注册管理员</el-button>
        <el-button type="text" @click.native="userLogin">会员登录</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        mobilePhone: '',
        password: '',
        loginLabel: '会员登录',
        loginType: 0, // 0=会员登录 1=管理员登录
        isUserLogin: true,
        loginTypeInfo: {
          0: {
            label: '会员登录'
          },
          1: {
            label: '管理员登录'
          }
        }

      };
    },

    methods: {
      login () {
        let _this = this;
        let action = this.GLOBAL.ACTION.LOGIN;
        this.$http.post(action, {
          mobilePhone: this.mobilePhone,
          password: this.password,
          loginType: this.loginType
        }, {emulateJSON: true}).then(function (response) {
          // 获取服务端返回的数据
          let data = response.body;
          if (data.result === _this.GLOBAL.STRING_DEFINE.RESULT_SUCCESS) {
            // 保存用户信息到本地
            let userInfo = JSON.stringify(data.userInfo);
            console.log('[LOGIN] userInfo: ' + userInfo);
            window.sessionStorage.setItem(this.GLOBAL.STRING_DEFINE.ACCESS_USER, userInfo);
            window.sessionStorage.setItem(_this.GLOBAL.STRING_DEFINE.USER_TYPE, _this.loginType);
            _this.$router.push({path: '/index', query: {'from': 'login', userType: _this.loginType}});
          } else {
            _this.$message(data.msg);
          }
        });
      },
      toRegister: function () {
        let _this = this;
        this.$router.push({path: '/register', query: {'from': 'login', 'registerType': '' + _this.loginType}});
      },
      adminLogin: function () {
        this.loginType = 1;
        this.isUserLogin = false;
      },
      userLogin: function () {
        this.loginType = 0;
        this.isUserLogin = true;
      }
    },
    created () {
      console.log('[LOGIN] created method. ');
    },
    mounted () {
      console.log('[LOGIN] mounted method. ');
      if (this.$route.query['from']) {
        this.loginType = this.$route.query.loginType;
        this.isUserLogin = (this.loginType === 0);
        console.log('[LOGIN]: loginType= ' + this.loginType);
      }
    }
  };
</script>
