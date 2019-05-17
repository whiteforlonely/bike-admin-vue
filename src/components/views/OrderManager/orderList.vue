<template>
  <div>
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
              <el-select v-model="searchData.matchType" size="small">
                <el-option v-for="(item, index) in GLOBAL.OPTIONS_LOTTERY_TYPE"
                           :key="index"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单ID: ">
              <el-input v-model="searchData.id" class="pull-right" size="small" :clearable="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户ID: ">
              <el-input v-model="searchData.userId" class="pull-right" size="small" :clearable="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单编号: ">
              <el-input v-model="searchData.orderCode" class="pull-right" size="small" :clearable="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单类别: ">
              <el-select v-model="searchData.orderType" size="small">
                <el-option v-for="(item, index) in orderTypeOptions"
                           :key="index"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="支付类型: ">
              <el-select v-model="searchData.payType" size="small">
                <el-option v-for="(item, index) in payTypeOptions"
                           :key="index"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单状态: ">
              <el-select v-model="searchData.status" size="small">
                <el-option v-for="(item, index) in statusOptions"
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
          <el-col :span="10.5">
            <el-form-item label="支付时间: ">
              <el-date-picker
                type="daterange"
                value-format="yyyy-MM-dd"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                v-model="searchData.paySuccessTime"
                size="small"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item labelWidth="0">
              <el-button type="primary" @click="currPage = 1; fetchData();" size="small">查询</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item labelWidth="0">
              <el-button type="info" @click="exportData" size="small">导出</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <el-table
      border
      stripe
      fit
      highlight-current-row
      size="small"
      style="width: 100%;"
      height="600"
      show-summary
      @cell-click="clickCell"
      :cell-class-name="getCellClass"
      :summaryMethod="getSummary"
      :data="tableData">
      <el-table-column
        type="expand"
        align="center"
        width="50">
        <template slot-scope="props">
          <el-form labelPosition="left" inline class="table-expand" size="mini">
            <el-form-item label="订单编码">
              <span>{{ props.row.orderCode }}</span>
            </el-form-item>
            <el-form-item label="渠道">
              <span>{{ props.row.packageName }}</span>
            </el-form-item>
            <el-form-item label="法币支付">
              <span>{{ props.row.moneyPrice }}</span>
            </el-form-item>
            <el-form-item label="余额支付">
              <span>{{ props.row.beanPrice }}</span>
            </el-form-item>
            <el-form-item label="彩金支付">
              <span>{{ props.row.otherPrice }}</span>
            </el-form-item>
            <el-form-item label="彩种">
              <span>{{ props.row.matchName }}</span>
            </el-form-item>
            <el-form-item label="期码">
              <div class="el-table-cell-active"><span @click="checkMatchResult(props.row)">{{ props.row.matchNum }}</span></div>
            </el-form-item>
            <el-form-item label="票据信息">
              <span>{{ props.row.ticketInfo }}</span>
            </el-form-item>
            <el-form-item label="发起支付">
              <span>{{ props.row.payCreateTime }}</span>
            </el-form-item>
            <el-form-item label="支付详情">
              <span>{{ props.row.payInfo }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        label="订单ID"
        width="70"
        align="center"></el-table-column>
      <el-table-column
        prop="userId"
        label="用户ID"
        width="80"
        align="center"></el-table-column>
      <el-table-column
        prop="amount"
        label="订单金额"
        width="100"
        align="center"></el-table-column>
      <el-table-column
        prop="orderType"
        label="订单类别"
        width="100"
        align="center">
        <template slot-scope="scope">
          <span v-show="scope.row.orderType === 1">投注订单</span>
          <span v-show="scope.row.orderType === 80">充值订单</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="payType"
        label="支付类型"
        width="100"
        align="center">
        <template slot-scope="scope">
          <span v-show="scope.row.payType === 1">余额</span>
          <span v-show="scope.row.payType === 2">微信</span>
          <span v-show="scope.row.payType === 3">支付宝</span>
          <span v-show="scope.row.payType === 4">银联</span>
          <span v-show="scope.row.payType === 8">线下</span>
          <span v-show="scope.row.payType === 9">混合</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="下单 | 支付时间"
        width="270px"
        align="center">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span> | <span>{{scope.row.paySuccessTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="80"
        align="center">
        <template slot-scope="scope">
          <span v-show="scope.row.status === 1">订单取消</span>
          <span v-show="scope.row.status === 10">待付款</span>
          <span v-show="scope.row.status === 20">付款成功</span>
          <span v-show="scope.row.status === 25">付款失败</span>
          <span v-show="scope.row.status === 30">已出票</span>
          <span v-show="scope.row.status === 45">退款申请中</span>
          <span v-show="scope.row.status === 46">退款拒绝</span>
          <span v-show="scope.row.status === 50">已退款</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <span>
            <a href="" v-show="scope.row.orderType === 1 && scope.row.status === 20"
               @click.stop.prevent="checkOrderTicketList(scope.row.id)">投注方案列表</a>
            <a href="" v-show="scope.row.status === 10" @click.stop.prevent="cancelOrder(scope.row.id)">取消订单</a>
            <a href="" v-show="scope.row.status === 10 && scope.row.payType === 8"
               @click.stop.prevent="payOrder(scope.row.id)">支付</a>
            <a href="" v-show="scope.row.status === 45" @click.stop.prevent="refund(scope.row.id)">退款</a>
            <a href="" v-show="scope.row.status === 45" @click.stop.prevent="rejectRefund(scope.row.id)">拒绝退款</a>
            <span v-show="scope.row.status === 1">-</span>
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
</template>

<script>

  export default {
    name: 'orderDetail',
    data () {
      return {
        orderTypeOptions: [
          {
            label: '全部',
            value: -1000
          },
          {
            label: '投注订单',
            value: 1
          },
          {
            label: '充值订单',
            value: 80
          }
        ],
        statusOptions: [
          {
            label: '全部',
            value: -1000
          },
          {
            label: '订单取消',
            value: 1
          },
          {
            label: '待付款',
            value: 10
          },
          {
            label: '付款成功',
            value: 20
          },
          {
            label: '待付失败',
            value: 25
          },
          {
            label: '已出票',
            value: 30
          },
          {
            label: '退款申请中',
            value: 45
          },
          {
            label: '拒绝退款',
            value: 46
          },
          {
            label: '已退款',
            value: 50
          }
        ],
        payTypeOptions: [
          {
            label: '全部',
            value: -1000
          },
          {
            label: '余额支付',
            value: 1
          },
          {
            label: '微信支付',
            value: 2
          },
          {
            label: '支付宝支付',
            value: 3
          },
          {
            label: '银联扫码',
            value: 4
          },
          {
            label: '线下支付',
            value: 8
          },
          {
            label: '混合支付',
            value: 9
          }
        ],
        searchData: {
          packageId: -1000,
          payType: -1000,
          status: -1000,
          orderType: -1000,
          matchType: -1000
        },
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
        params = Object.assign(params, this.searchData);
        if (params.createTime) {
          params.createTimeStart = params.createTime[0];
          params.createTimeEnd = params.createTime[1];
        } else {
          params.createTimeStart = '';
          params.createTimeEnd = '';
        }
        if (params.paySuccessTime) {
          params.paySuccessTimeStart = params.paySuccessTime[0];
          params.paySuccessTimeEnd = params.paySuccessTime[1];
        } else {
          params.paySuccessTimeStart = '';
          params.paySuccessTimeEnd = '';
        }
        let _this = this;
        this.$http.post(this.GLOBAL.ACTION.ORDER_LIST, params, {emulateJSON: true})
          .then(response => {
            let data = response.body;
            _this.tableData = data.list;
            _this.totalCount = data.total;
          });
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
        if (params.paySuccessTime) {
          params.paySuccessTimeStart = params.paySuccessTime[0];
          params.paySuccessTimeEnd = params.paySuccessTime[1];
        } else {
          params.paySuccessTimeStart = '';
          params.paySuccessTimeEnd = '';
        }
        this.$utils.exportExcel(this.GLOBAL.ACTION.ORDER_EXPORT, params, '订单数据');
      },
      checkOrderTicketList: function (orderId) {
        this.$router.push({path: '/order/ticket/list', query: {from: 'orderList', orderId: orderId}});
      },
      cancelOrder: function (orderId) {
        let _this = this;
        this.$confirm('确定取消订单？', '取消订单')
          .then(() => {
            // todo
            _this.$http.post(_this.GLOBAL.ACTION.ORDER_CANCEL, {id: orderId}, {emulateJSON: true})
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
      payOrder: function (orderId) {
        let _this = this;
        this.$confirm('确定支付订单？', '订单支付')
          .then(() => {
            // todo
            _this.$http.post(_this.GLOBAL.ACTION.ORDER_RECHARGE_PAY, {id: orderId}, {emulateJSON: true})
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
      refund: function (orderId) {
        let _this = this;
        this.$confirm('确定退款？', '退款操作')
          .then(() => {
            // todo
            _this.$http.post(_this.GLOBAL.ACTION.ORDER_REFUND, {id: orderId}, {emulateJSON: true})
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
      rejectRefund: function (orderId) {
        let _this = this;
        this.$confirm('确定不予退款？', '拒绝退款')
          .then(() => {
            // todo
            _this.$http.post(_this.GLOBAL.ACTION.ORDER_REJECT_REFUND, {id: orderId}, {emulateJSON: true})
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
      getSummary (param) {
        const {columns, data} = param;
        const sums = [];

        columns.forEach((column, index) => {
          const values = data.map(item => Number(item[column.property]));
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          if ([1, 2, 4, 5, 6, 7, 8].indexOf(index) !== -1) {
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
      },

      checkMatchResult: function (row) {
        this.$router.push({path: this.GLOBAL.MATCH_TYPE_INFO[row.matchType].path, query: {code: row.matchNum}});
      }
    },
    mounted () {
      if (this.$route.query['userId']) {
        this.searchData.userId = this.$route.query.userId;
      }
      this.fetchData();
    },
    created () {
      this.$store.state.curNavMenuActive = this.$route.path;
    }
  };

</script>
