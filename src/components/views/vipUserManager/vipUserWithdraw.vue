<template>
  <div>
    <el-row class="search-form">
      <el-form v-model="searchData" labelPosition="right" :labelWidth="formLabelWidth" class="width_1000">
        <el-col :span="6">
          <el-form-item label="用户ID:">
            <el-input class="width_150 pull-right" size="small" v-model="searchData.userId"
                      :clearable="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="申请编号:">
            <el-input class="width_150 pull-right" size="small" v-model="searchData.code" :clearable="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="状态:">
            <el-select class="width_150 pull-right" v-model="searchData.status" size="small">
              <el-option v-for="item in statusOptions" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="提现类别:">
            <el-select class="width_150 pull-right" v-model="searchData.type" size="small">
              <el-option v-for="item in typeOptions" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="银行卡号:">
            <el-input class="width_150 pull-right" size="small" v-model="searchData.bankAcct"
                      :clearable="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="银行名称:">
            <el-input class="width_150 pull-right" size="small" v-model="searchData.bankName"
                      :clearable="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="银行用户:">
            <el-input class="width_150 pull-right" size="small" v-model="searchData.bankUserName"
                      :clearable="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="alipay账号:">
            <el-input class="width_150 pull-right" size="small" v-model="searchData.alipayAcct"
                      :clearable="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="alipay用户:">
            <el-input class="width_150 pull-right" size="small" v-model="searchData.alipayUserName"
                      :clearable="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="微信账号:">
            <el-input class="width_150 pull-right" size="small" v-model="searchData.wxAcct"
                      :clearable="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="微信用户:">
            <el-input class="width_150 pull-right" size="small" v-model="searchData.wxUserName"
                      :clearable="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="申请时间:">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="searchData.createTime"
              type="date"
              placeholder="选择日期"
              size="small"
              style="width: 150px; float: right;">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="回复时间:">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="searchData.replyTime"
              type="date"
              placeholder="选择日期"
              size="small"
              style="width: 150px; float: right;">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item labelWidth="0px">
            <el-button type="primary" @click="currPage = 1; fetchData()" size="small">查询</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item labelWidth="0px">
            <el-button type="info" @click="exportData()" size="small">导出</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
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
        :cell-class-name="getCellClass"
        @cell-click="clickCell"
        :summaryMethod="getSummary"
        style="width: 100%">
        <el-table-column
          label="#"
          width="50"
          type="expand"
          align="center">
          <template slot-scope="props">
            <el-form label-position="left" inline class="table-expand" size="small">
              <el-form-item label="ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="申请编号">
                <span>{{ props.row.code }}</span>
              </el-form-item>
              <el-form-item label="银行">
                <span>{{ props.row.bankName }}</span>
              </el-form-item>
              <el-form-item label="银行卡号">
                <span>{{ props.row.bankAcct }}</span>
              </el-form-item>
              <el-form-item label="银行用户">
                <span>{{ props.row.bankUserName }}</span>
              </el-form-item>
              <el-form-item label="支付宝账号">
                <span>{{ props.row.alipayAcct }}</span>
              </el-form-item>
              <el-form-item label="支付宝用户">
                <span>{{ props.row.alipayUserName }}</span>
              </el-form-item>
              <el-form-item label="微信号">
                <span>{{ props.row.wxAcct }}</span>
              </el-form-item>
              <el-form-item label="微信用户">
                <span>{{ props.row.wxUserName }}</span>
              </el-form-item>
              <el-form-item label="拒绝理由">
                <span>{{ props.row.rejectReason }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
        prop="userId"
        label="用户ID"
        width="80"
        align="center"></el-table-column>
        <el-table-column
          label="申请金额"
          prop="amount"
          width="100"
          align="center"></el-table-column>
        <el-table-column
          label="类型"
          prop="type"
          width="70"
          align="center">
          <template slot-scope="scope">
            <div>
              <span class="text-color-333" v-show="scope.row.type === 1">微信</span>
              <span class="text-color-333" v-show="scope.row.type === 2">支付宝</span>
              <span class="text-color-333" v-show="scope.row.type === 3">银联</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="申请|回复时间"
          width="300"
          align="center">
          <template slot-scope="scope">
            <div>
              <span class="text-color-333">{{scope.row.createTime}} | {{scope.row.replyTime}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          prop="status"
          width="100"
          align="center">
          <template slot-scope="scope">
            <div>
              <span class="text-color-333" v-show="scope.row.status === 0">审核中</span>
              <span class="text-color-666" v-show="scope.row.status === 15">等待自动转账</span>
              <span class="text-color-666" v-show="scope.row.status === 16">自动转账中</span>
              <span class="text-color-cc0" v-show="scope.row.status === 18">已拒绝</span>
              <span class="text-color-cc0" v-show="scope.row.status === 19">自动转账失败</span>
              <span class="text-color-40c" v-show="scope.row.status === 20">自动到账</span>
              <span class="text-color-40c" v-show="scope.row.status === 21">手动到账</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <div>
              <span>
                <a href="" v-show="scope.row.status === 0" @click.stop.prevent="autoTrans(scope.row.id)">审核</a>
                <a href="" v-show="scope.row.status === 0 || scope.row.status === 19" @click.stop.prevent="handTrans(scope.row.id)">手动转账</a>
                <a href="" v-show="scope.row.status === 19" @click.stop.prevent="reAutoTrans(scope.row.id)">自动转账</a>
                <a href="" v-show="scope.row.status === 0" @click.stop.prevent="showReject(scope.row)">拒绝提现</a>
                <span v-show="scope.row.status != 19 && scope.row.status != 0">-</span>
              </span>
            </div>
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
    <el-dialog title="拒绝提现" :visible.sync="isRejectShow" width="400px">
      <el-input type="textarea" placeholder="拒绝理由" v-model="curRecord.rejectReason"
                :autosize="{minRows: 2, maxRows: 4}"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isRejectShow=false" type="plain">取 消</el-button>
        <el-button @click="reject()" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        searchData: {
          code: '',
          status: -1000,
          type: -1000,
          createTime: '',
          replyTime: ''

        },
        statusOptions: [
          {
            label: '全部',
            value: -1000
          },
          {
            label: '审核中',
            value: 0
          },
          {
            label: '自动转账中',
            value: 15
          },
          {
            label: '自动转账失败',
            value: 19
          },
          {
            label: '自动转账成功',
            value: 20
          },
          {
            label: '手动转账到账',
            value: 21
          },
          {
            label: '已拒绝',
            value: 18
          }
        ],
        typeOptions: [
          {
            label: '全部',
            value: -1000
          },
          {
            label: '微信提现',
            value: 1
          },
          {
            label: '支付宝提现',
            value: 2
          },
          {
            label: '银联提现',
            value: 3
          }
        ],
        totalCount: 0,
        currPage: 1,
        pageSize: 40,
        tableData: [],
        curRecord: {},
        isRejectShow: false,
        formLabelWidth: '100px'
      };
    },
    mounted () {
      this.fetchData();
    },
    methods: {

      autoTrans: function (id) {
        let _this = this;
        this.$confirm('确定通过审核？', '审核提示')
          .then(() => {
            _this.$http.post(_this.GLOBAL.ACTION.WITHDRAW_APPLIED, {id: id}, {emulateJSON: true})
              .then(res => {
                let data = res.body;
                if (data.result === 'success') {
                  _this.fetchData();
                } else {
                  _this.$toast(data.msg);
                }
              });
          });
      },

      handTrans: function (id) {
        let _this = this;
        this.$confirm('确定已转账？', '人工转账')
          .then(() => {
            _this.$http.post(_this.GLOBAL.ACTION.WITHDRAW_HAND, {id: id}, {emulateJSON: true})
              .then(res => {
                let data = res.body;
                if (data.result === 'success') {
                  _this.fetchData();
                } else {
                  _this.$toast(data.msg);
                }
              });
          });
      },

      showReject: function (row) {
        this.curRecord = row;
        this.isRejectShow = true;
      },

      reAutoTrans: function (id) {
        let _this = this;
        this.$confirm('确定重新自动转账？', '重审提示')
          .then(() => {
            _this.$http.post(_this.GLOBAL.ACTION.WITHDRAW_REAUTO, {id: id}, {emulateJSON: true})
              .then(res => {
                let data = res.body;
                if (data.result === 'success') {
                  _this.fetchData();
                } else {
                  _this.$toast(data.msg);
                }
              });
          });
      },

      reject: function () {
        let _this = this;
        let params = {
          id: this.curRecord.id,
          rejectReason: this.curRecord.rejectReason
        };
        this.$http.post(_this.GLOBAL.ACTION.WITHDRAW_REJECT, params, {emulateJSON: true})
          .then(res => {
            let data = res.body;
            if (data.result === 'success') {
              _this.fetchData();
              _this.isRejectShow = false;
            } else {
              _this.$toast(data.msg);
            }
          });
      },

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
        let params = {
          start: (this.currPage - 1) * this.pageSize,
          length: this.pageSize
        };
        params = Object.assign(params, this.searchData);

        let _this = this;
        this.$http.post(this.GLOBAL.ACTION.WITHDRAW_LIST, params, {emulateJSON: true})
          .then(res => {
            let data = res.body;
            _this.totalCount = data.total;
            _this.tableData = data.list;
          });
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
          if ([1, 3, 4, 5, 6].indexOf(index) !== -1) {
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
      },
      exportData: function () {
        let params = this.searchData;
        this.$utils.exportExcel(this.GLOBAL.ACTION.WITHDRAW_EXPORT, params, '提现数据表');
      },
      clickCell: function (row, column, cell, event) {
        if (column.property === 'userId') {
          this.$router.push({path: '/vip/baseInfo', query: {'tUserInfoId': row.userId}});
        }
      },

      getCellClass (param) {
        const {column} = param;
        if (column.property === 'userId') {
          return 'el-table-cell-active';
        }
      }
    },

    created () {
      this.$store.state.curNavMenuActive = this.$route.path;
    }
  };
</script>
