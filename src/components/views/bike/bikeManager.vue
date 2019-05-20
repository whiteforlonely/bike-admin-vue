<template>
  <div>
    <div>
      <el-row class="search-form">
        <el-form v-model="searchData" size="small" :labelWidth="formLabelWidth" labelPosition="right"
                 class="width_1000">
          <el-col :span="6">
            <el-form-item label="车辆ID: ">
              <el-input v-model="searchData.id" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-show="Number(userType) === 1">
            <el-form-item label="用户ID: ">
              <el-input v-model="searchData.userId" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="站点ID: ">
              <el-input v-model="searchData.siteId" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车辆编号: ">
              <el-input v-model="searchData.bikeCode" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车辆颜色: ">
              <el-input v-model="searchData.color" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态: ">
              <el-select v-model="searchData.status" size="small">
                <el-option v-for="(item, index) in statusOptions"
                           :key="index"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item labelWidth="0">
              <el-button type="primary" @click="currPage = 1; fetchData();" size="small">查询</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <el-col :span="24" class="p-tb-10 m-l-10">
      <el-button type="primary" class="pull-left" @click="showAddBike">添加车辆</el-button>
    </el-col>
    <el-table
      border
      stripe
      fit
      highlight-current-row
      size="small"
      style="width: 100%;"
      height="600"
      :data="tableData">
      <el-table-column
        type="index"
        align="center"
        label="#"
        width="50">
      </el-table-column>
      <el-table-column
        prop="id"
        label="车辆ID"
        width="70"
        align="center"></el-table-column>
      <el-table-column
        prop="userId"
        label="用户ID"
        width="70"
        align="center"></el-table-column>
      <el-table-column
        prop="siteId"
        label="站点ID"
        width="70"
        align="center"></el-table-column>
      <el-table-column
        prop="position"
        label="位置"
        align="center"></el-table-column>
      <el-table-column
        prop="bikeCode"
        label="车辆编号"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="color"
        label="颜色"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="发布时间"
        width="140"
        align="center">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="80"
        align="center">
        <template slot-scope="scope">
          <span v-show="scope.row.status === 1">使用中</span>
          <span v-show="scope.row.status === 2">未使用</span>
          <span v-show="scope.row.status === 3">车辆故障</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="appearance"
        label="外观"
        align="center">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="showUpdateBike(scope.row)">编辑</el-button>
          <el-button type="text" @click="delRecord(scope.row.id)">删除</el-button>
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
    <el-dialog
      :title="dialogTitle"
      :visible.sync="isDialogShow"
      width="400px">
      <el-form :model="curBike" labelPosition="right" :labelWidth="formLabelWidth" size="small">
        <el-col :span="20" class="height_40">
          <el-form-item label="编号：" size="small">
            <el-input v-model="curBike.bikeCode" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="20" class="height_40">
          <el-form-item label="租费：" size="small">
            <el-input type="digit" v-model="curBike.bikeAmount" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="20" class="height_40">
          <el-form-item label="颜色：" size="small">
            <el-input v-model="curBike.color" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="20" class="height_40">
          <el-form-item label="外观：" size="small">
            <el-input v-model="curBike.appearance" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="20" class="height_40">
          <el-form-item label="位置：" size="small">
            <el-input v-model="curBike.position" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=20 class="height_80">
          <el-form-item label="站点：" size="small">
            <el-select v-model="curBike.siteId" filterable placeholder="请选择">
              <el-option v-for="(item, index) in siteList" :key="index" :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDialogShow=false">取消</el-button>
        <el-button type="primary" @click="optType === 0 ? addRecord() : modifyRecord()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        statusOptions: [
          {
            label: '全部',
            value: -1000
          },
          {
            label: '使用中',
            value: 1
          },
          {
            label: '未使用',
            value: 2
          },
          {
            label: '设备故障',
            value: 3
          }
        ],
        searchData: {
          status: -1000
        },
        tableData: [],
        pageSize: 40,
        currPage: 1,
        formLabelWidth: '100px',
        totalCount: 0,
        userType: 1,
        isDialogShow: false,
        dialogTitle: '添加车辆',
        optType: 0,
        curBike: {},
        siteList: []
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
      fetchData: function () {
        let _this = this;
        console.log('[BIKE] params: ' + JSON.stringify(this.searchData));
        this.$http.post(this.GLOBAL.ACTION.BIKE_LIST, this.searchData, {emulateJSON: true})
          .then(res => {
            let data = res.body;
            _this.tableData = data.list;
            _this.totalCount = data.total;
          });
      },
      addRecord: function () {
        let _this = this;
        this.$http.post(this.GLOBAL.ACTION.BIKE_ADD, this.curBike, {emulateJSON: true})
          .then(res => {
            let data = res.body;
            if (data.result === _this.GLOBAL.STRING_DEFINE.RESULT_SUCCESS) {
              _this.isDialogShow = false;
              _this.fetchData();
            } else {
              _this.$message(data.msg);
            }
          });
      },
      modifyRecord: function (row) {
        let _this = this;
        this.$http.post(this.GLOBAL.ACTION.BIKE_UPDATE, this.curBike, {emulateJSON: true})
          .then(res => {
            let data = res.body;
            if (data.result === _this.GLOBAL.STRING_DEFINE.RESULT_SUCCESS) {
              _this.isDialogShow = false;
              _this.fetchData();
            } else {
              _this.$message(data.msg);
            }
          });
      },
      showAddBike: function () {
        this.optType = 0;
        this.dialogTitle = '新增车辆';
        this.isDialogShow = true;
        this.curBike = {};
        this.curBike.userId = this.searchData.userId;
      },
      showUpdateBike: function (row) {
        this.optType = 1;
        this.dialogTitle = '修改车辆信息';
        this.isDialogShow = true;
        this.curBike = row;
      },
      delRecord: function (id) {
        let _this = this;
        this.$confirm('删除提醒', '确定删除记录' + id + '?')
          .then(() => {
          this.$http.post(this.GLOBAL.ACTION.BIKE_DEL, {'id': id}, {emulateJSON: true})
            .then(res => {
              let data = res.body;
              if (data.result === _this.GLOBAL.STRING_DEFINE.RESULT_SUCCESS) {
                _this.fetchData();
              } else {
                _this.$message(data.msg);
              }
            });
        });
      }
    },

    mounted () {
      let userType = window.sessionStorage.getItem(this.GLOBAL.STRING_DEFINE.USER_TYPE);
      this.userType = Number(userType);

      if (this.userType === 0) {
        let userInfo = JSON.parse(window.sessionStorage.getItem(this.GLOBAL.STRING_DEFINE.ACCESS_USER));
        if (userInfo) {
          this.searchData.userId = userInfo.id;
        }
      }
      this.fetchData();

      // 获取站点信息
      this.$http.get(this.GLOBAL.ACTION.SITE_LIST, {}, {emulateJSON: true})
        .then(res => {
          this.siteList = res.data.list;
        });
    }
  };
</script>
