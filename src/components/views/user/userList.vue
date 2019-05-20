<template>
  <div style="width: 100%;">
    <div @click="$router.history.go(-1)" class="return-back" v-show="isBackShow">
      <span class="el-icon-back">返回</span>
    </div>
    <el-row class="search-form">
      <el-form v-model="searchData" labelPosition="right" :labelWidth="formLabelWidth">
        <el-col :span="6">
          <el-form-item label="用户Id:">
            <el-input class="width_150 pull-left" size="small" v-model="searchData.tUserInfoId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="昵称:">
            <el-input class="width_150 pull-left" size="small" v-model="searchData.nickName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="电话:">
            <el-input class="width_150 pull-left" size="small" v-model="searchData.phoneNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="昵称:">
            <el-input class="width_150 pull-left" size="small" v-model="searchData.userName"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="身份证">
            <el-input class="width_150 pull-left" size="small" v-model="searchData.identityCard"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10.5">
          <el-form-item label="注册时间:">
            <el-date-picker
              v-model="searchData.createTime"
              type="daterange"
              size="small"
              align="right"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="pull-right">
          <el-button type="primary" @click="currPage = 1; fetchData()" size="small">查询</el-button>
        </el-col>
      </el-form>
    </el-row>
    <el-col :span="4" class="pull-left">
      <el-button type="primary" @click="showAddUser" size="small">添加用户</el-button>
    </el-col>
    <div>
      <el-table
        :data="tableData"
        stripe
        border
        highlight-current-row
        height="600"
        size="small"
        fit
        show-summary
        :summaryMethod="getSummary"
        style="width: 100%">
        <el-table-column
          type="index"
          width="50"
          label="#"
          align="center">
        </el-table-column>

        <el-table-column
          prop="id"
          align="center"
          width="70"
          label="ID">
        </el-table-column>

        <el-table-column
          prop="userName"
          label="昵称"
          align="center">
        </el-table-column>

        <el-table-column
          prop="phoneNum"
          label="手机"
          align="center">
        </el-table-column>

        <el-table-column
          prop="identityCard"
          label="身份证"
          align="center">
        </el-table-column>

        <el-table-column
          label="注册时间"
          prop="regLoginTime"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.createTime}}<br/>{{scope.row.lastLoginTime}}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          prop="opt"
          :show-overflow-tooltip="false"
          align="center">
          <template slot-scope="scope">
            <span>
            &nbsp;<a href="" @click.stop.prevent="checkDetail(scope.row)">编辑</a>&nbsp;
             <a href="" @click.stop.prevent="deleteRecord(scope.row.tUserInfoId)">删除</a><br/>
            </span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="currPage"
        :page-sizes="[10, 20, 40, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        :page-size="pageSize"
        @size-change="sizeChange"
        @current-change="pageChange"
      ></el-pagination>
    </div>
    <el-dialog :title="optTitle" width="300px" :visible.sync="dialogFormVisible" label-width="120">
      <el-form :model="tUserCertification" labelPosition="right" :labelWidth="formLabelWidth" size="small">
        <el-col :span="24" class="height_40">
          <el-form-item label="证件姓名: " size="small">
            <el-input v-model="tUserCertification.identityCardName" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="height_40">
          <el-form-item label="证件号码: " size="small">
            <el-input type="digit" v-model="tUserCertification.identityCardNum" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="height_80">
          <el-form-item label="验证: " size="small">
            <el-select class="item-choose" v-model="tUserCertification.identifyCardIsAvail" size="small">
              <el-option v-for="(item,index) in redirectOptions"
                         :key="index"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updCertification()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        searchData: {
          tUserInfoId: '',
          nickName: '',
          phoneNum: '',
          createTime: '',
          lastLoginTime: '',
          userName: '',
          fromPackage: -1000
        },
        isBackShow: false,
        tUserCertification: {},
        optTitle: '修改验证信息',
        fromPackages: [
          {
            value: -1000,
            label: '全部'
          },
          {
            value: 101,
            label: '主包'
          }
        ],
        redirectOptions: [
          {
            label: '已验证',
            value: 1
          },
          {
            label: '未验证',
            value: 0
          }
        ],
        totalCount: 0,
        currPage: 1,
        pageSize: 40,
        curUser: {},
        dialogFormVisible: false,
        formLabelWidth: '100px',
        tableData: [],
        multipleSort: false
      };
    },

    methods: {
      sizeChange: function (size) {
        this.pageSize = size;
        this.currPage = 1;
        this.fetchData();
      },
      pageChange: function (pageNo) {
        this.currPage = pageNo;
        this.fetchData();
      },
      // 请求服务端数据
      fetchData: function () {
        let params = {
          start: (this.currPage - 1) * this.pageSize,
          length: this.pageSize
        };
        if (this.searchData.createTime && this.searchData.createTime.length > 0) {
          this.searchData.startCreateTime = this.searchData.createTime[0];
          this.searchData.endCreateTime = this.searchData.createTime[1];
        } else {
          this.searchData.startCreateTime = '';
          this.searchData.endCreateTime = '';
        }
        params = Object.assign(this.searchData, params);
        let _this = this;
        this.$http.post(this.GLOBAL.ACTION.VIP_USER_LIST, params, {emulateJSON: true})
          .then(response => {
            let data = response.body;
            if (data.result === 'fail') {
              _this.$message(data.msg);
            } else {
              _this.tableData = data.list;
              _this.totalCount = data.total;
            }
          });
      },
      exportData: function () {
        let params = {
        };
        if (this.searchData.createTime && this.searchData.createTime.length > 0) {
          this.searchData.startCreateTime = this.searchData.createTime[0];
          this.searchData.endCreateTime = this.searchData.createTime[1];
        } else {
          this.searchData.startCreateTime = '';
          this.searchData.endCreateTime = '';
        }
        params = Object.assign(this.searchData, params);
        this.$utils.exportExcel(this.GLOBAL.ACTION.VIP_USER_EXPORT, params, '用户表');
      },
      checkDetail (row) {
        this.$router.push({
          path: '/vip/userDetail.vue',
          query: {
            userId: row.tUserInfoId
          }
        });
      },
      selectUserOrder (id) {
        this.$router.push({
          path: '/order/list',
          query: {
            userId: id
          }
        });
      },
      deleteRecord (userid) {
        let _this = this;
        this.$http.post(this.GLOBAL.ACTION.VIP_USER_DELETE, {id: userid}, {emulateJSON: true})
          .then(response => {
            let data = response.body;
            if (data.result === 'success') {
              _this.fetchData();
            } else {
              _this.$message(data.msg);
            }
          });
      },
      forbid (userid) {
        let _this = this;
        this.$http.post(this.GLOBAL.ACTION.VIP_USER_FORBID, {id: userid}, {emulateJSON: true})
          .then(response => {
            let data = response.body;
            if (data.result === 'success') {
              _this.fetchData();
            } else {
              _this.$message(data.msg);
            }
          });
      },
      release (userid) {
        let _this = this;
        this.$http.post(this.GLOBAL.ACTION.VIP_USER_RELEASE, {id: userid}, {emulateJSON: true})
          .then(response => {
            let data = response.body;
            if (data.result === 'success') {
              _this.fetchData();
            } else {
              _this.$message(data.msg);
            }
          });
      },
      preUpdCertification: function (userId) {
        let _this = this;
        this.$http.post(this.GLOBAL.ACTION.VIP_USER_DETAIL, {id: userId}, {emulateJSON: true})
          .then(response => {
            let data = response.body;
            if (data.tUserCertification) {
              _this.tUserCertification = data.tUserCertification;
              this.dialogFormVisible = true;
            } else {
              _this.$message('该用户未绑定有效证件');
            }
          });
      },
      updCertification (tUserCertification) {
        this.dialogFormVisible = false;
        let params = {
          userId: this.tUserCertification.userId,
          identityCardName: this.tUserCertification.identityCardName,
          identityCardNum: this.tUserCertification.identityCardNum,
          identifyCardIsAvail: this.tUserCertification.identifyCardIsAvail
        };
        let _this = this;
        this.$http.post(this.GLOBAL.ACTION.VIP_USER_UPDCERTIFICATION, params, {emulateJSON: true})
          .then(response => {
            let data = response.body;
            if (data.result === 'success') {
              _this.$message(data.msg);
              _this.fetchData();
            } else {
              _this.$message(data.msg);
              _this.fetchData();
            }
          });
      },
      formatter: function (rowData, column) {
        if (column.property === 'userStatus') {
          if (rowData.userStatus === 0) {
            return '正常';
          } else if (rowData.userStatus === 100) {
            return '限制中';
          } else if (rowData.userStatus === -100) {
            return '删除';
          }
        }
      },
      getSummary (param) {
        const {columns, data} = param;
        const sums = [];

        columns.forEach((column, index) => {
          const values = data.map(item => Number(item[column.property]));
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          if ([1, 2, 3, 4, 6, 7].indexOf(index) !== -1) {
            sums[index] = 'N/A';
          } else {
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index] = sums[index].toFixed(2);
            } else {
              sums[index] = 'N/A';
            }
          }
        });

        return sums;
      }
    },
    created () {
      this.$store.state.curNavMenuActive = this.$route.path;
    },
    mounted () {
      if (this.$route.query['tUserInfoId']) {
        this.searchData.tUserInfoId = this.$route.query.tUserInfoId;
        this.isBackShow = true;
      } else {
        this.isBackShow = false;
      }
      this.fetchData();
    }
  };
</script>
