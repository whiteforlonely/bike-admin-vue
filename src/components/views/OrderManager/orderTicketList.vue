<template>
  <div>
    <div @click="$router.history.go(-1)" class="return-back" v-show="isBackShow">
      <span class="el-icon-back">&nbsp;返回</span>
    </div>
    <div>
      <el-row class="search-form">
        <el-form v-model="searchData" :labelWidth="formLabelWidth" labelPosition="right" class="width_1000">
          <el-col :span="6">
            <el-form-item label="渠道: ">
              <el-select v-model="searchData.packageId" size="small">
                <el-option v-for="(item, index) in GLOBAL.OPTIONS_PACKAGE"
                           :key="index"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="彩种: ">
              <el-select v-model="searchData.matchType" size="small" @change="matchTypeChanged">
                <el-option v-for="(item, index) in GLOBAL.OPTIONS_LOTTERY_TYPE"
                           :key="index"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单ID: ">
              <el-input v-model="searchData.orderId" class="pull-right" size="small" :clearable="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户ID: ">
              <el-input v-model="searchData.userId" class="pull-right" size="small" :clearable="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="票号: ">
              <el-input v-model="searchData.ticketCode" class="pull-right" size="small" :clearable="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="玩法: ">
              <el-select v-model="searchData.gameType" size="small" filterable>
                <el-option v-for="(item, index) in GLOBAL.MATCH_TYPE_INFO[searchData.matchType].gameTypes"
                           :key="index"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="盘口: ">
              <el-select v-model="searchData.poolType" size="small">
                <el-option v-for="(item, index) in poolTypeOptions"
                           :key="index"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="出票状态: ">
              <el-select v-model="searchData.ticketStatus" size="small">
                <el-option v-for="(item, index) in ticketStatusOptions"
                           :key="index"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="中奖状态: ">
              <el-select v-model="searchData.awardStatus" size="small">
                <el-option v-for="(item, index) in awardStatusOptions"
                           :key="index"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="期码: ">
              <el-input v-model="searchData.matchNum" class="pull-right" size="small" :clearable="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10.5">
            <el-form-item label="下单时间: ">
              <el-date-picker
                type="daterange"
                value-format="yyyy-MM-dd"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                v-model="searchData.createTime"
                size="small"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="2" class="pull-right">
            <el-form-item labelWidth="0">
              <el-button type="primary" @click="currPage = 1; fetchData();" size="small">查询</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="2" class="pull-right">
            <el-form-item labelWidth="0">
              <el-button type="info" @click="exportData" size="small">导出</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <el-table
    stripe
    fit
    border
    height="600"
    highlight-current-row
    :data="tableData"
    size="small"
    show-summary
    @cell-click="clickCell"
    :cell-class-name="getCellClass"
    :summaryMethod="getSummary"
    style="width: 100%;">
      <el-table-column
      type="expand"
      width="50"
      label="#"
      align="center">
        <template slot-scope="props">
          <el-form size="mini" inline class="table-expand" labelPosition="left">
            <el-form-item label="渠道">{{props.row.packageName}}</el-form-item>
            <el-form-item label="订单ID">{{props.row.orderId}}</el-form-item>
            <el-form-item label="盘口" v-show="props.row.poolType === 1"><span>盘口A</span></el-form-item>
            <el-form-item label="押注金额">{{props.row.betAmount}}</el-form-item>
            <el-form-item label="押注倍数">{{props.row.betQuantity}}</el-form-item>
            <el-form-item label="押注赔率">{{props.row.betRatio}}</el-form-item>
            <el-form-item label="单注价格">{{props.row.betPrice}}</el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
      prop="userId"
      label="用户ID"
      align="center"></el-table-column>
      <el-table-column
      label="期码"
      prop="matchNum"
      width="100"
      align="center"></el-table-column>
      <el-table-column
      prop="ticketCode"
      label="票号"
      width="170"
      align="center"></el-table-column>
      <el-table-column
      prop="matchName"
      label="彩种"
      width="70"
      align="center"></el-table-column>
      <el-table-column
      prop="gameTypeName"
      label="玩法"
      width="90"
      align="center"></el-table-column>
      <el-table-column
      prop="betResultName"
      label="押注项"
      width="60"
      align="center"></el-table-column>
      <el-table-column
        prop="winAmount"
        label="可赢金额"
        width="70"
        align="center"></el-table-column>
      <el-table-column
      label="出票状态"
      width="70"
      align="center">
        <template slot-scope="scope">
          <span class="text-color-666" v-show="scope.row.ticketStatus === 5">待出票</span>
          <span class="text-color-40c" v-show="scope.row.ticketStatus === 10">已出票</span>
          <span class="text-color-cc0" v-show="scope.row.ticketStatus === 20">出票失败</span>
        </template>
      </el-table-column>
      <el-table-column
      label="开奖状态"
      width="70"
      align="center">
        <template slot-scope="scope">
          <span class="text-color-cc0" v-show="scope.row.awardStatus === 0">待开奖</span>
          <span class="text-color-1e9" v-show="scope.row.awardStatus === 5">未中奖</span>
          <span class="text-color-40c" v-show="scope.row.awardStatus === 10">已中奖</span>
          <span class="text-color-40c" v-show="scope.row.awardStatus === 20">已派奖</span>
        </template>
      </el-table-column>
      <el-table-column
      prop="createTime"
      label="出票时间"
      width="140"
      align="center"></el-table-column>
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
</template>

<script>
  export default {
    data () {
      return {
        poolTypeOptions: [
          {
            label: '全部',
            value: -1000
          },
          {
            label: '盘口A',
            value: 1
          }
        ],
        ticketStatusOptions: [
          {
            label: '全部',
            value: -1000
          },
          {
            label: '待出票',
            value: 5
          },
          {
            label: '已出票',
            value: 10
          },
          {
            label: '出票失败',
            value: 20
          }
        ],
        awardStatusOptions: [
          {
            label: '全部',
            value: -1000
          },
          {
            label: '待开奖',
            value: 0
          },
          {
            label: '未中奖',
            value: 5
          },
          {
            label: '已中奖',
            value: 10
          },
          {
            label: '已派奖',
            value: 20
          }
        ],
        searchData: {
          packageId: -1000,
          ticketStatus: -1000,
          awardStatus: -1000,
          gameType: -1000,
          matchType: -1000,
          poolType: -1000
        },
        totalCount: 0,
        currPage: 1,
        pageSize: 40,
        formLabelWidth: '100px',
        tableData: [],
        isBackShow: false
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
        params = Object.assign(params, this.searchData);
        if (params.createTime) {
          params.createTimeStart = params.createTime[0];
          params.createTimeEnd = params.createTime[1];
        } else {
          params.createTimeStart = '';
          params.createTimeEnd = '';
        }
        let _this = this;
        this.$http.post(this.GLOBAL.ACTION.ORDER_TICKET_LIST, params, {emulateJSON: true})
          .then(response => {
            let data = response.body;
            _this.tableData = data.list;
            _this.totalCount = data.total;
          });
      },
      matchTypeChanged: function (matchType) {
        this.searchData.gameType = this.GLOBAL.MATCH_TYPE_INFO[matchType].gameTypes[0].value;
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
          if ([1, 2, 3, 4, 5, 6, 8, 9, 10].indexOf(index) !== -1) {
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
        params = Object.assign(params, this.searchData);
        if (params.createTime) {
          params.createTimeStart = params.createTime[0];
          params.createTimeEnd = params.createTime[1];
        } else {
          params.createTimeStart = '';
          params.createTimeEnd = '';
        }

        this.$utils.exportExcel(this.GLOBAL.ACTION.ORDER_TICKET_EXPORT, params, '订单票单数据');
      },
      clickCell: function (row, column, cell, event) {
        if (column.property === 'userId') {
          this.$router.push({path: '/vip/baseInfo', query: {'tUserInfoId': row.userId}});
        } else if (column.property === 'matchNum') {
          this.$router.push({path: this.GLOBAL.MATCH_TYPE_INFO[row.matchType].path, query: {code: row.matchNum}});
        }
      },

      getCellClass (param) {
        const {column} = param;
        if (column.property === 'userId' || column.property === 'matchNum') {
          return 'el-table-cell-active';
        }
      }
    },

    mounted () {
      if (this.$route.query['from']) {
        let from = this.$route.query['from'];
        if (from === 'matchList') {
          this.searchData.matchNum = this.$route.query.code;
          this.searchData.matchType = this.$route.query.matchType;
          this.searchData.awardStatus = this.$route.query.awardStatus;
        } else if (from === 'orderList') {
          this.searchData.orderId = this.$route.query.orderId;
        }
        this.isBackShow = true;
      }
      this.fetchData();
    },
    created () {
      this.$store.state.curNavMenuActive = this.$route.path;
    }
  };
</script>
