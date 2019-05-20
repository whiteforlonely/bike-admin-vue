<template>
  <div>
    <div>
      <el-row class="search-form">
        <el-form v-model="searchData" size="small" :labelWidth="formLabelWidth" labelPosition="right"
                 class="width_1000">
          <el-col :span="6">
            <el-form-item label="站点ID: ">
              <el-input v-model="searchData.id" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-show="Number(userType) === 1">
            <el-form-item label="用户ID: ">
              <el-input v-model="searchData.userId" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="站点名: ">
              <el-input v-model="searchData.name" clearable></el-input>
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
      <el-button type="primary" class="pull-left" @click="showAddSite">添加站点</el-button>
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
        label="站点ID"
        width="70"
        align="center"></el-table-column>
      <el-table-column
        prop="userId"
        label="用户ID"
        width="70"
        align="center"></el-table-column>
      <el-table-column
        prop="name"
        label="站点名"
        align="center"></el-table-column>
      <el-table-column
          prop="siteSize"
        label="站点大小"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="sitePosition"
        label="站点位置"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="bikeQuantity"
        label="车辆容量"
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
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="showUpdateSite(scope.row)">编辑</el-button>
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
      <el-form :model="curData" labelPosition="right" :labelWidth="formLabelWidth" size="small">
        <el-col :span="20" class="height_40">
          <el-form-item label="名称：" size="small">
            <el-input v-model="curData.name" auto-complete="off" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="20" class="height_40">
          <el-form-item label="大小：" size="small">
            <el-input type="digit" v-model="curData.siteSize" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="20" class="height_40">
          <el-form-item label="位置：" size="small">
            <el-input v-model="curData.sitePosition" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="20" class="height_40">
          <el-form-item label="车辆数量：" size="small">
            <el-input v-model="curData.bikeQuantity" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDialogShow=false ">取消</el-button>
        <el-button type="primary" @click="optType === 0 ? addRecord() : modifyRecord()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        tableData: [],
        pageSize: 40,
        currPage: 1,
        searchData: {},
        formLabelWidth: '100px',
        totalCount: 0,
        userType: 1,
        isDialogShow: false,
        dialogTitle: '添加站点',
        optType: 0,
        curData: {},
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
        this.$http.post(this.GLOBAL.ACTION.SITE_LIST, this.searchData, {emulateJSON: true})
          .then(res => {
            let data = res.body;
            _this.tableData = data.list;
            _this.totalCount = data.total;
          });
      },
      addRecord: function () {
        let _this = this;
        this.$http.post(this.GLOBAL.ACTION.SITE_ADD, this.curData, {emulateJSON: true})
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
        this.$http.post(this.GLOBAL.ACTION.SITE_UPDATE, this.curData, {emulateJSON: true})
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
      showAddSite: function () {
        this.optType = 0;
        this.dialogTitle = '新增站点';
        this.isDialogShow = true;
        this.curData = {};
        this.curData.userId = this.searchData.userId;
      },
      showUpdateSite: function (row) {
        this.optType = 1;
        this.dialogTitle = '修改站点信息';
        this.isDialogShow = true;
        this.curData = row;
      },
      delRecord: function (id) {
        let _this = this;
        this.$confirm('删除提醒', '确定删除记录' + id + '?')
          .then(() => {
          this.$http.post(this.GLOBAL.ACTION.SITE_DEL, {'id': id}, {emulateJSON: true})
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
    }
  };
</script>
