<template>
  <div>
    <el-row class="search-form">
      <el-form v-model="searchData" labelPosition="right" :labelWidth="formLabelWidth">
        <el-col :span="6">
          <el-form-item label="会员Id:">
            <el-input class="width_150 pull_left" size="small" v-model="searchData.userId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="类型:">
            <el-select class="width_150 pull_left" v-model="searchData.acType" size="small">
              <el-option v-for="item in acTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="状态:">
            <el-select class="width_150 pull_left" v-model="searchData.status" size="small">
              <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="流水类型:">
            <el-select class="width_150 pull_left" v-model="searchData.type" size="small">
              <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10.5">
          <el-form-item label="创建时间:">
            <el-date-picker
              v-model="searchData.time"
              type="daterange"
              size="small"
              align="right"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="currPage = 1; fetchData()" size="small">查询</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="info" @click="exportData" size="small">导出</el-button>
        </el-col>
      </el-form>
    </el-row>
    <el-table
      :data="tableData"
      highlight-current-row
      size="small"
      fit
      border
      stripe
      height="600"
      @cell-click="clickCell"
      :cellClassName="getCellClass"
      :summary-method="getSummary"
      style="width: 100%;"
      :showSummary="true">
      <el-table-column
        type="index"
        width="50"
        align="center"
        label="#">
      </el-table-column>

      <el-table-column
        prop="userId"
        align="center"
        label="用户ID">
      </el-table-column>

      <el-table-column
        label="操作金额类型"
        prop="typeName"
        width="100"
        align="center">
      </el-table-column>

      <el-table-column
        label="时间"
        prop="createTime"
        width="140"
        align="center">
      </el-table-column>

      <el-table-column
        label="流水方向"
        header-align="center"
        prop="oprAmount"
        min-width="50"
        align="left">
        <template slot-scope="scope">
          <div style="color:green; width: 100%;" v-show="scope.row.acType === 2 || scope.row.acType === 80"><i class="el-icon-circle-plus" style="margin-left: 20%"></i><span>{{scope.row.oprAmount}}</span></div>
          <div style="color:red; width: 100%;" v-show="scope.row.acType === 1 || scope.row.acType === 3"><i class="el-icon-remove" style="margin-left: 20%"></i><span>{{scope.row.oprAmount}}</span></div>
        </template>
      </el-table-column>

      <el-table-column
        label="操作前"
        prop="oprBeforeAmount"
        min-width="50"
        align="center">
      </el-table-column>

      <el-table-column
        label="操作后"
        prop="oprAfterAmount"
        min-width="50"
        align="center">
      </el-table-column>

      <el-table-column
        label="流水类型"
        prop="acType"
        width="100"
        align="center">
        <template slot-scope="scope">
          <span v-show="scope.row.acType === 1">投注消耗</span>
          <span v-show="scope.row.acType === 2">中奖</span>
          <span v-show="scope.row.acType === 3">微信提现</span>
          <span v-show="scope.row.acType === 80">线上充值</span>
        </template>
      </el-table-column>

      <el-table-column
        label="状态"
        prop="status"
        width="80"
        align="center">
        <template slot-scope="scope">
          <span class="text-color-40c" v-show="scope.row.status === 1">成功</span>
          <span class="text-color-cc0" v-show="scope.row.status === -1">失败</span>
          <span v-show="scope.row.status === 0">等待</span>
        </template>
      </el-table-column>

      <el-table-column
        label="模块ID"
        prop="acObj"
        width="70"
        align="center">
      </el-table-column>

      <el-table-column
        label="模块参数"
        prop="acParam"
        align="center">
      </el-table-column>

    </el-table>
    <el-pagination
      :current-page="currPage"
      :page-sizes="[10,20,40,100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
      :page-size="pageSize"
      @size-change="sizeChange"
      @current-change="pageChange">
      >
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        searchData: {
          acType: -1000,
          status: -1000,
          type: -1000
        },
        acTypes: [
          {
            value: -1000,
            label: '全部'
          },
          {
            value: 1,
            label: '投注消耗'
          },
          {
            value: 2,
            label: '中奖得到'
          },
          {
            value: 3,
            label: '微信提现'
          },
          {
            value: 80,
            label: '线上充值'
          }
        ],
        status: [
          {
            value: -1000,
            label: '全部'
          },
          {
            label: '失败',
            value: -1
          },
          {
            label: '等待',
            value: 0
          },
          {
            label: '成功',
            value: 1
          }
        ],
        types: [
          {
            value: -1000,
            label: '全部'
          },
          {
            label: '余额',
            value: 1
          },
          {
            label: '彩金',
            value: 2
          }
        ],
        totalCount: 0,
        currPage: 1,
        pageSize: 40,
        formLabelWidth: '100px',
        tableData: []
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
        if (this.searchData.time && this.searchData.time.length > 0) {
          this.searchData.startTime = this.searchData.time[0];
          this.searchData.endTime = this.searchData.time[1];
        } else {
          this.searchData.startTime = '';
          this.searchData.endTime = '';
        }
        params = Object.assign(this.searchData, params);
        let _this = this;
        this.$http.post(this.GLOBAL.ACTION.VIP_PAY_DETAIL, params, {emulateJSON: true})
          .then(response => {
            let data = response.body;
            if (data.result === 'fail') {
              _this.$toast(data.msg);
            } else {
              _this.tableData = data.list;
              _this.totalCount = data.total;
            }
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
          if ([1, 2, 3, 7, 8, 9, 10].indexOf(index) !== -1) {
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
        let params = {};
        if (this.searchData.time && this.searchData.time.length > 0) {
          this.searchData.startTime = this.searchData.time[0];
          this.searchData.endTime = this.searchData.time[1];
        } else {
          this.searchData.startTime = '';
          this.searchData.endTime = '';
        }
        params = Object.assign(this.searchData, params);
        this.$utils.exportExcel(this.GLOBAL.ACTION.VIP_USER_PAY_EXPORT, params, '流水数据');
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
    },

    mounted () {
      this.fetchData();
    }
  };
</script>
