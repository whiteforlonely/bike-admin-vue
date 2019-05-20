<template>
  <div>
    <el-row>
      <el-col :span="3">
        <el-button class="pull-left" @click="prepareCreateAdminUser()" type="primary" size="small">添加管理员</el-button>
      </el-col>
      <el-col :span="2">
        <el-button @click="exportData()" size="small" type="info">导出</el-button>
      </el-col>
    </el-row>
    <div class="width_1000">
      <el-table
        :data="tableData"
        stripe
        border
        highlight-current-row
        height="600"
        size="small"
        fit
        style="width: 100%">
        <el-table-column
          type="index"
          align="center"
          label="#"></el-table-column>

        <el-table-column
          prop="nickname"
          label="姓名"
          align="center"></el-table-column>
        <el-table-column
          prop="mobilephone"
          label="手机"
          align="center"></el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          align="center">
          <template slot-scope="scope">
            <span v-show="scope.row.status === 0">正常</span>
            <span v-show="scope.row.status === 1" class="text-color-cc0">已停用</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="props">
            <span>
              <a href="" v-show="props.row.status === 0" @click.stop.prevent="prepareModifyAdminUser(props.row)">编辑</a>&nbsp;
              <a href="" v-show="props.row.status === 0" @click.stop.prevent="forbidAccount(props.row.id)">停用账号</a>
              <a href="" v-show="props.row.status === 1" @click.stop.prevent="reuseAccount(props.row.id)">恢复账号</a>
              <a href="" @click.stop.prevent="deleteRecord(props.row.id)">删除</a>
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
      <el-form :model="curUser" labelPosition="right" :labelWidth="formLabelWidth" size="small">
        <el-col :span="24" class="height_40">
          <el-form-item label="昵称: " size="small">
            <el-input v-model="curUser.nickname" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="height_40">
          <el-form-item label="手机号码: " size="small">
            <el-input type="digit" v-model="curUser.mobilephone" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="height_80">
          <el-form-item label="密码: " size="small">
            <el-input type="password" v-model="curUser.password" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="optType === 0 ? addRecord() : modifyRecord()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'admin-user-list',
    data () {
      return {
        totalCount: 0,
        currPage: 1,
        pageSize: 40,
        dialogFormVisible: false,
        formLabelWidth: '80px',
        optType: 0,
        optTitle: '添加管理员',
        tableData: [],
        curUser: {}
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
        let _this = this;
        this.$http.post(this.GLOBAL.ACTION.ADMIN_USER_LIST, params, {emulateJSON: true})
          .then(response => {
            let data = response.body;
            _this.tableData = data.list;
            _this.totalCount = data.total;
          });
      },

      prepareCreateAdminUser: function () {
        this.curUser = {};
        this.dialogFormVisible = true;
        this.optType = 0;
        this.optTitle = '添加管理员';
      },

      prepareModifyAdminUser: function (rowData) {
        this.curUser = rowData;
        this.dialogFormVisible = true;
        this.optType = 1;
        this.optTitle = '修改管理员信息';
      },

      deleteRecord: function (userid) {
        let _this = this;
        this.$http.post(this.GLOBAL.ACTION.ADMIN_USER_DELETE, {id: userid}, {emulateJSON: true})
          .then(response => {
            let data = response.body;
            if (data.result === 'success') {
              _this.fetchData();
            } else {
              _this.$message(data.msg);
            }
          });
      },

      addRecord: function () {
        let _this = this;
        this.dialogFormVisible = false;
        this.$http.post(this.GLOBAL.ACTION.ADMIN_USER_ADD, this.curUser, {emulateJSON: true})
          .then(response => {
            let data = response.body;
            if (data.result === 'success') {
              _this.fetchData();
            } else {
              _this.$message(data.msg);
            }
          });
      },

      modifyRecord: function () {
        let _this = this;
        this.dialogFormVisible = false;
        this.$http.post(this.GLOBAL.ACTION.ADMIN_USER_UPDATE, this.curUser, {emulateJSON: true})
          .then(response => {
            let data = response.body;
            if (data.result === 'success') {
              _this.fetchData();
            } else {
              _this.$message(data.msg);
              _this.fetchData();
            }
          });
      },

      forbidAccount: function (userid) {
        let _this = this;
        this.$http.post(this.GLOBAL.ACTION.ADMIN_USER_FORBID, {id: userid}, {emulateJSON: true})
          .then(response => {
            let data = response.body;
            if (data.result === 'success') {
              _this.fetchData();
            } else {
              _this.$message(data.msg);
            }
          });
      },

      reuseAccount: function (userid) {
        let _this = this;
        this.$http.post(this.GLOBAL.ACTION.ADMIN_USER_REUSE, {id: userid}, {emulateJSON: true})
          .then(response => {
            let data = response.body;
            if (data.result === 'success') {
              _this.fetchData();
            } else {
              _this.$message(data.msg);
            }
          });
      },

      exportData: function () {
        this.$utils.exportExcel(this.GLOBAL.ACTION.ADMIN_USER_EXPORT, {}, '管理账号数据表');
      }
    },
    created () {
    },
    mounted () {
      this.fetchData();
    }
  };
</script>
