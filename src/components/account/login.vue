<template>

  <div>
    <img src="../../assets/logo.png" class="m-b-20">
    <el-form>
      <el-form-item>
        <el-input type="text" class="width_300 d_b" placeholder="手机号" v-model="mobilePhone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" class="width_300" placeholder="密码" v-model="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click.native="login" type="primary">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default{
    name: 'login',
    data () {
      return {
        mobilePhone: '',
        password: ''
      };
    },

    methods: {
      login () {
        var _this = this;
        this.$http.post(this.GLOBAL.ACTION.LOGIN, {
          mobilePhone: this.mobilePhone,
          password: this.password
        }, {emulateJSON: true}).then(function (response) {
          // 获取服务端返回的数据
          let data = response.body;
          if (data.result === _this.GLOBAL.STRING_DEFINE.RESULT_SUCCESS) {
            // 保存用户信息到本地
            let userInfo = JSON.stringify(data.userInfo);
            window.sessionStorage.setItem(this.GLOBAL.STRING_DEFINE.ACCESS_USER, userInfo);
            _this.$router.push('/index');
          } else {
            _this.$toast(data.msg);
          }
        });
      }
    }
  };
</script>

<style>

</style>
