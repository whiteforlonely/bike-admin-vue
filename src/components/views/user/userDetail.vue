<template>
  <div>
    <el-card class="box-card width_1000">
      <div slot="header" class="height_25">
        <span class="pull-left f20">个人信息</span>
        <el-button type="text" v-show="isEdit" @click.native="back" class="pull-right">取消</el-button>
        <el-button type="text" v-show="isEdit" @click.native="save" class="pull-right">保存</el-button>
        <el-button type="text" v-show="!isEdit" @click.native="startToEdit" class="pull-right">编辑</el-button>
      </div>
      <el-form v-model="user" label-width="100px" class="user-info-form">
        <el-col :span="8">
          <el-form-item label="ID："><span class="pull-left">{{user.id}}</span></el-form-item>
          <el-form-item label="姓名：">
            <el-input v-if="isEdit" v-model="user.userName"></el-input>
            <span v-else class="pull-left">{{user.userName}}</span>
          </el-form-item>
          <el-form-item label="性别：">
            <el-radio-group v-if="isEdit" v-model="user.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
              <el-radio :label="0">保密</el-radio>
            </el-radio-group>
            <span v-else class="pull-left">{{user.sex === 1? '男' : user.sex === 2 ? '女' : '保密'}}</span>
          </el-form-item>
          <el-form-item label="手机：">
            <el-input v-if="isEdit" v-model="user.phoneNum" clearable="true"></el-input>
            <span v-else class="pull-left">{{user.phoneNum}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="密码：">
            <el-input type="password" v-if="isEdit" v-model="user.password"></el-input>
            <span v-else class="pull-left">******</span>
          </el-form-item>
          <el-form-item label="身份证号：">
            <el-input v-if="isEdit" v-model="user.identityCard" clearable="true"></el-input>
            <span v-else class="pull-left">{{user.identityCard}}</span>
          </el-form-item>
          <el-form-item label="地址：">
            <el-input v-if="isEdit" v-model="user.address" clearable="true"></el-input>
            <span v-else class="pull-left text-left">{{user.address}}</span>
          </el-form-item>
          <el-form-item label="时间：">
            <span class="pull-left">{{user.createTime}}</span>
          </el-form-item>
        </el-col>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {

  data () {
    return {
      isEdit: false,
      user: {}
    };
  },

  methods: {
    startToEdit: function () {
      this.isEdit = true;
    },
    save: function () {
      let _this = this;
      this.$http.post(this.GLOBAL.ACTION.USER_UPDATE, this.user, {emulateJSON: true})
        .then(res => {
          let data = res.body;
          if (data.result === _this.GLOBAL.STRING_DEFINE.RESULT_SUCCESS) {
            console.log('[USER] after-> user' + JSON.stringify(_this.user));
            window.sessionStorage.setItem(_this.GLOBAL.STRING_DEFINE.ACCESS_USER, JSON.stringify(_this.user));
            _this.isEdit = false;
          } else {
            _this.$message(data.msg);
          }
        });
    },
    back: function () {
      this.isEdit = false;
    }
  },

  mounted () {
    let userInfo = JSON.parse(window.sessionStorage.getItem(this.GLOBAL.STRING_DEFINE.ACCESS_USER));
    console.log('[USER] user: ' + JSON.stringify(userInfo));
    if (userInfo) {
      this.user = userInfo;
    }
  }
};
</script>
<style>
  .user-info-form .el-form-item label{
    color: #00a1e9;
  }
</style>
