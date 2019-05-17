<template>
  <div class="border0">
    <div @click="$router.history.go(-1)" class="return-back">
      <span class="el-icon-back">返回</span>
    </div>
    <el-row class="width_1000">
      <el-card class="box-card">
        <div slot="header" class="clearfix text-left">
          <span>银行卡信息</span>
        </div>
        <el-col :span="8" v-for="(tUserBankcard,index) in tUserBankcards" :key="index">
          <el-card class="box-card" align="center">
            <div slot="header" class="clearfix">
              <span>{{tUserBankcard.bankName}}</span>
            </div>
            <div>
              <div class="item">
                <div class="title">
                  <span>银行卡类型</span>
                </div>
                <div class="content">
                  <span>{{tUserBankcard.type}}</span>
                </div>
              </div>
              <div class="item">
                <div class="title">
                  <span>银行账户</span>
                </div>
                <div class="content">
                  <span>{{tUserBankcard.bankAcct}}</span>
                </div>
              </div>
              <div class="item">
                <div class="title">
                  <span>开户姓名</span>
                </div>
                <div class="content">
                  <span>{{tUserBankcard.bankBranchName}}</span>
                </div>
              </div>
              <div class="item">
                <div class="title">
                  <span>开户省份</span>
                </div>
                <div class="content">
                  <span>{{tUserBankcard.bankBranchProvince}}</span>
                </div>
              </div>
              <div class="item">
                <div class="title">
                  <span>开户城市</span>
                </div>
                <div class="content">
                  <span>{{tUserBankcard.bankBranchCity}}</span>
                </div>
              </div>
              <div class="item">
                <div class="title">
                  <span>姓名</span>
                </div>
                <div class="content">
                  <span>{{tUserBankcard.realName}}</span>
                </div>
              </div>
              <div class="item">
                <div class="title">
                  <span>添加时间</span>
                </div>
                <div class="content">
                  <span>{{tUserBankcard.createTime}}</span>
                </div>
              </div>
              <div class="item">
                <div class="title">
                  <span>默认设置</span>
                </div>
                <div class="content">
                  <span>{{tUserBankcard.isDefault}}</span>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-card>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix text-left">
            <span>基本信息</span>
          </div>
          <div class="box-card">
            <div class="item">
              <div class="title">
                <span>余额</span>
              </div>
              <div class="content">
                <span>{{tuserInfo.amount}}</span>
              </div>
            </div>
            <div class="item">
              <div class="title">
                <span>彩金</span>
              </div>
              <div class="content">
                <span>{{tuserInfo.handsel}}</span>
              </div>
            </div>
            <div class="item">
              <div class="title">
                <span>积分</span>
              </div>
              <div class="content">
                <span>{{tuserInfo.credit}}</span>
              </div>
            </div>
            <div class="item">
              <div class="title">
                <span>红包</span>
              </div>
              <div class="content">
                <span>{{tuserInfo.redPacket}}</span>
              </div>
            </div>
            <div class="item">
              <div class="title">
                <span>渠道</span>
              </div>
              <div class="content">
                <span>{{GLOBAL.PACKAGE_INFO[tuserInfo.fromPackage]}}</span>
              </div>
            </div>
            <div class="item">
              <div class="title">
                <span>注册版号</span>
              </div>
              <div class="content">
                <span>{{tuserInfo.fromVersion}}</span>
              </div>
            </div>
            <div class="item">
              <div class="title">
                <span>分享码</span>
              </div>
              <div class="content">
                <span>{{tuserInfo.shareCode}}</span>
              </div>
            </div>
            <el-form labelPosition="left" labelWidth="100px" size="mini" class="user-detail-bank-form">
              <el-form-item label="头像">
                <el-col :span="24" class="text-left"><img :src="tuserInfo.headPic" width="100" height="100"
                                                          class="border-cc8"></el-col>
              </el-form-item>
              <el-form-item label="分享码图片">
                <el-col :span="24" class="text-left"><img :src="tuserInfo.shareCodePicKey" width="100" height="100"
                                                          class="border-cc8"></el-col>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix text-left">
            <span>证件信息</span>
          </div>
            <div>
              <div class="item">
                <div class="title">
                  <span>证件类型</span>
                </div>
                <div class="content">
                  <span>{{tUserCertification.type}}</span>
                </div>
              </div>
              <div class="item">
                <div class="title">
                  <span>已验证证件</span>
                </div>
                <div class="content">
                  <span>{{tUserCertification.identifyCardIsAvail}}</span>
                </div>
              </div>
              <div class="item">
                <div class="title">
                  <span>证件号码</span>
                </div>
                <div class="content">
                  <span>{{tUserCertification.identityCardNum}}</span>
                </div>
              </div>
              <div class="item">
                <div class="title">
                  <span>证件名字</span>
                </div>
                <div class="content">
                  <span>{{tUserCertification.identityCardName}}</span>
                </div>
              </div>
              <el-form labelPosition="left" labelWidth="100px" size="mini" class="user-detail-bank-form">
                <el-form-item label="证件-正面">
                  <el-col :span="24" class="text-left"><img :src="tUserCertification.identityCardPicFront" width="150"
                                                            height="95"
                                                            class="border-cc8"></el-col>
                </el-form-item>
                <el-form-item label="证件-反面">
                  <el-col :span="24" class="text-left"><img :src="tUserCertification.identityCardPicBack" width="150"
                                                            height="95"
                                                            class="border-cc8"></el-col>
                </el-form-item>
              </el-form>
              <div class="item">
                <div class="title">
                  <span>护照号</span>
                </div>
                <div class="content">
                  <span>{{tUserCertification.passPortNum}}</span>
                </div>
              </div>
              <div class="item">
                <div class="title">
                  <span>护照姓名</span>
                </div>
                <div class="content">
                  <span>{{tUserCertification.passPortName}}</span>
                </div>
              </div>
              <div class="item">
                <div class="title">
                  <span>绑定时间</span>
                </div>
                <div class="content">
                  <span>{{tUserCertification.createTime}}</span>
                </div>
              </div>
              <div class="item">
                <div class="title">
                  <span>绑定支付宝</span>
                </div>
                <div class="content">
                  <span>{{tUserCertification.alipayIsAvail}}</span>
                </div>
              </div>
              <div class="item">
                <div class="title">
                  <span>支付宝账户</span>
                </div>
                <div class="content">
                  <span>{{tUserCertification.alipayNum}}</span>
                </div>
              </div>
              <div class="item">
                <div class="title">
                  <span>支付宝姓名</span>
                </div>
                <div class="content">
                  <span>{{tUserCertification.alipayName}}</span>
                </div>
              </div>
              <el-form labelPosition="left" labelWidth="100px" size="mini" class="user-detail-bank-form">
                <el-form-item label="支付宝收款码">
                  <el-col :span="24" class="text-left"><img :src="tUserCertification.alipayGatheringPic" width="100"
                                                            height="100"
                                                            class="border-cc8"></el-col>
                </el-form-item>
              </el-form>
              <div class="item">
                <div class="title">
                  <span>绑定微信</span>
                </div>
                <div class="content">
                  <span>{{tUserCertification.wxpayIsAvail}}</span>
                </div>
              </div>
              <div class="item">
                <div class="title">
                  <span>微信账户</span>
                </div>
                <div class="content">
                  <span>{{tUserCertification.wxpayNum}}</span>
                </div>
              </div>
              <div class="item">
                <div class="title">
                  <span>微信姓名</span>
                </div>
                <div class="content">
                  <span>{{tUserCertification.wxpayName}}</span>
                </div>
              </div>
              <el-form labelPosition="left" labelWidth="100px" size="mini" class="user-detail-bank-form">
                <el-form-item label="微信收款码">
                  <el-col :span="24" class="text-left"><img :src="tUserCertification.wxpayGatheringPic" width="100"
                                                            height="100"
                                                            class="border-cc8"></el-col>
                </el-form-item>
              </el-form>
            </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix text-left">
            <span>状态信息</span>
          </div>
          <div>
            <div>
              <div class="item">
                <div class="title">
                  <span>是否在线</span>
                </div>
                <div class="content">
                  <span>{{userStatus.online}}</span>
                </div>
              </div>
            </div>
            <div>
              <div class="item">
                <div class="title">
                  <span>fromPlaceId</span>
                </div>
                <div class="content">
                  <span>{{userStatus.fromPlaceId}}</span>
                </div>
              </div>
            </div>
            <div>
              <div class="item">
                <div class="title">
                  <span>登录平台</span>
                </div>
                <div class="content">
                  <span>{{userStatus.loginPlatform}}</span>
                </div>
              </div>
            </div>
            <div>
              <div class="item">
                <div class="title">
                  <span>app版本号</span>
                </div>
                <div class="content">
                  <span>{{userStatus.loginVersion}}</span>
                </div>
              </div>
            </div>
            <div>
              <div class="item">
                <div class="title">
                  <span>语言环境</span>
                </div>
                <div class="content">
                  <span>{{userStatus.loginLang}}</span>
                </div>
              </div>
            </div>
            <div>
              <div class="item">
                <div class="title">
                  <span>设备ID</span>
                </div>
                <div class="content">
                  <span>{{userStatus.oldDeviceId}}</span>
                </div>
              </div>
            </div>
            <div>
              <div class="item">
                <div class="title">
                  <span>当前设备ID</span>
                </div>
                <div class="content">
                  <span>{{userStatus.currentDeviceId}}</span>
                </div>
              </div>
            </div>
            <div>
              <div class="item">
                <div class="title">
                  <span>app标识</span>
                </div>
                <div class="content">
                  <span>{{userStatus.loginAppName}}</span>
                </div>
              </div>
            </div>
            <div>
              <div class="item">
                <div class="title">
                  <span>系统版本</span>
                </div>
                <div class="content">
                  <span>{{userStatus.loginSystemVersion}}</span>
                </div>
              </div>
            </div>
            <div>
              <div class="item">
                <div class="title">
                  <span>网络</span>
                </div>
                <div class="content">
                  <span>{{userStatus.loginNetwork}}</span>
                </div>
              </div>
            </div>
            <div>
              <div class="item">
                <div class="title">
                  <span>省份</span>
                </div>
                <div class="content">
                  <span>{{userStatus.loginRegionProv}}</span>
                </div>
              </div>
            </div>
            <div>
              <div class="item">
                <div class="title">
                  <span>城市</span>
                </div>
                <div class="content">
                  <span>{{userStatus.loginRegionCity}}</span>
                </div>
              </div>
            </div>
            <div>
              <div class="item">
                <div class="title">
                  <span>地区</span>
                </div>
                <div class="content">
                  <span>{{userStatus.loginRegionDistrict}}</span>
                </div>
              </div>
            </div>
            <div>
              <div class="item">
                <div class="title">
                  <span>ip地址</span>
                </div>
                <div class="content">
                  <span>{{userStatus.loginIpAddr}}</span>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        tUserBankcards: [],
        tUserCertification: {},
        userStatus: {},
        tuserInfo: {}
      };
    },
    methods: {
      fetchData: function () {
        let params = {
          id: this.userId
        };
        let _this = this;
        this.$http.post(this.GLOBAL.ACTION.VIP_USER_DETAIL, params, {emulateJSON: true})
          .then(res => {
            let data = res.body;
            if (data.tUserBankcard) {
              _this.tUserBankcards = data.tUserBankcard;
            }
            if (data.tUserCertification) {
              _this.tUserCertification = data.tUserCertification;
            }
            if (data.userStatus) {
              _this.userStatus = data.userStatus;
            }
            if (data.tUserInfo) {
              _this.tuserInfo = data.tUserInfo;
            }
          });
      }
    },
    mounted () {
      this.fetchData();
    },
    created () {
      this.userId = this.$route.query.userId;
    }
  };
</script>

<style>

  .user-detail-bank-form label {
    color: #2a6496;
  }

  .item {
    width: 100%;
    float: left;
  }

  .item .title {
    width: 100px;
    color: #2a6496;
    text-align: left;
    float: left;
    height: 25px;
    line-height: 25px;
  }

  .item .content {
    text-align: left;
    float: left;
    height: 25px;
    line-height: 25px;
  }

  .item .comtent img {
    display: block;
    overflow: visible;
  }
</style>
