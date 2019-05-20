<template>
  <div class="el-button-group">
    <!--<img src="../../assets/logo.png" class="m-b-20">-->
    <el-card class="width_400">
      <div slot="header">
        <span class="text-center f24">{{registerTypeInfo[registerInfo.registerType].name}}</span>
      </div>
    <el-form ref="registerForm" status-icon :model="registerInfo" label-width="100px" :rules="registerFormRules">
      <el-form-item label="昵称：" prop="userName">
        <el-input placeholder="输入昵称" v-model="registerInfo.userName"></el-input>
      </el-form-item>
      <el-form-item label="手机号：" prop="mobilePhone">
        <el-input placeholder="11位手机号码" v-model.number="registerInfo.mobilePhone"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input type="password" placeholder="至少6位数" v-model="registerInfo.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="confirmPwd">
        <el-input type="password" placeholder="重新输入密码" v-model="registerInfo.confirmPwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click.native="register" type="primary">提交</el-button>
        <el-button @click.native="reset" type="plain">重置</el-button>
      </el-form-item>
    </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    data () {
      var validatePwd = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入确认没密码'));
        } else if (value !== this.registerInfo.password) {
          return callback(new Error('两次密码不一致'));
        } else {
          return callback();
        }
      };
      return {
        registerTypeInfo: {
          0: {
            name: '注册会员'
          },
          1: {
            name: '注册管理员'
          }
        },
        registerInfo: {
          registerType: 0,
          userName: '',
          mobilePhone: '',
          password: '',
          confirmPwd: ''
        },
        registerFormRules: {
          userName: [
            {required: true, message: '昵称不为空', trigger: 'blur'}
          ],
          mobilePhone: [
            {required: true, message: '手机号码不为空'},
            {type: 'number', min: 10000000000, max: 99999999999, message: '请输入有效手机号码'}
          ],
          password: [
            {required: true, message: '必须设置密码'},
            {min: 6, message: '请输入有效密码'}
          ],
          confirmPwd: [
            {required: true, validator: validatePwd}
          ]
        }
      };
    },
    methods: {
      register: function () {
        let _this = this;
        let action = this.GLOBAL.ACTION.REGISTER;
        let params = Object.assign(this.registerInfo, {});
        this.$http.post(action, params, {emulateJSON: true})
          .then((res) => {
            let data = res.body;
            if (data.result === this.GLOBAL.STRING_DEFINE.RESULT_SUCCESS) {
              this.$router.push({path: '/login', query: {'from': 'register', 'loginType': _this.registerInfo.registerType}});
            } else {
              this.$message(data.msg);
            }
          });
      },
      reset: function () {
        this.$refs['registerForm'].resetFields();
      }
    },
    mounted () {
      if (this.$route.query['from']) {
        this.registerInfo.registerType = this.$route.query.registerType;
      }
    }
  };
</script>

<style>

</style>
