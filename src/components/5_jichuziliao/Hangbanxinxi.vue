<template>
  <div class="index">
    <div class="top">
      <div class="t-tit1" v-html="headerTit"></div>
      <div class="t-tit2">
        <div class="tt2-left">
          <el-input
            placeholder="请输入内容"
            v-model="keyword"
            class="input-with-select"
          >
            <el-button slot="append" icon="el-icon-search">搜索</el-button>
          </el-input>
          <!-- <el-select style="margin-left:50px;width:200px" v-model="sele2" placeholder="请选择">
            <el-option label="新订单" value="1"> </el-option>
            <el-option label="应付已制作" value="2"> </el-option>
            <el-option label="应收已制作" value="3"> </el-option>
            <el-option label="应付已审核" value="4"> </el-option>
            <el-option label="应收已审核" value="5"> </el-option>
            <el-option label="全部工作号" value="6"> </el-option>
          </el-select> -->
        </div>
        <div class="tt2-right">
          <el-button @click="addDingdan" type="success">创建航班</el-button>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column
            field="port_departure.chinese_name"
            title="起运港"
          ></vxe-table-column>
          <vxe-table-column
            field="port_destination.chinese_name"
            title="目的港"
          ></vxe-table-column>
          <vxe-table-column
            field="airline_company.chinese_name"
            title="航空公司"
          ></vxe-table-column>
          <vxe-table-column field="model" title="机型"></vxe-table-column>
          <vxe-table-column
            field="flight_number"
            title="航班号"
          ></vxe-table-column>
          <vxe-table-column field="mySchedule" title="班期"></vxe-table-column>
          <vxe-table-column
            field="flight_dateday"
            title="近一次航班日期"
          ></vxe-table-column>
          <vxe-table-column
            field="prescription_daynum"
            title="时效天数"
          ></vxe-table-column>
          <vxe-table-column field="myPattern" title="模式"></vxe-table-column>
          <vxe-table-column
            field="transit_port.chinese_name"
            title="中转港"
          ></vxe-table-column>
          <vxe-table-column field="receiving_bulkcargo" title="散货">
            <template slot-scope="scope">
              <el-switch
                @change="changeKG1(scope.row)"
                v-model="scope.row.myReceiving_bulkcargo"
              ></el-switch>
            </template>
          </vxe-table-column>
          <vxe-table-column field="receive_tray" title="托盘">
            <template slot-scope="scope">
              <el-switch
                @change="changeKG2(scope.row)"
                v-model="scope.row.myReceive_tray"
              ></el-switch>
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="sensitive_goods.name"
            title="敏感货物"
          ></vxe-table-column>
          <vxe-table-column
            field="general_cargopolicy"
            title="普货政策"
          ></vxe-table-column>
          <!-- <vxe-table-column
            field="add_time"
            title="杂费"
          ></vxe-table-column> -->
          <vxe-table-column title="操作状态" width="120">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" @click="tabEdit(scope.row)" type="text"
                  >编辑</el-button
                >
                <el-button size="small" @click="tabDel(scope.row)" type="text"
                  >删除</el-button
                >
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.xindingdanHandleSizeChange"
          @current-change="this.xindingdanHandleCurrentChange"
          :current-page="this._5_5Page"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
    <!-- 创建航班 -->
    <el-dialog
      title="创建航班"
      :visible.sync="addDialogVisible"
      width="700px"
      :before-close="addHandleClose"
    >
      <div class="myAddForm">
        <el-form
          :model="addForm"
          ref="addForm"
          label-width="130px"
          class="demo-addForm"
        >
          <el-row>
            <el-col :span="20">
              <el-form-item label="航空公司代码：">
                <el-input
                  size="small"
                  v-model="addForm.airline_code"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="航班代码：">
                <el-row>
                  <el-input
                    size="small"
                    v-model="addForm.flight_code"
                  ></el-input>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="航线代码：">
                <el-row>
                  <el-input
                    size="small"
                    v-model="addForm.route_code"
                  ></el-input>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="中转港：">
                <el-input
                  size="small"
                  v-model="addForm.transit_port"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="交单时间：">
                <el-date-picker
                  size="small"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  v-model="addForm.hours_presentation"
                  type="datetime"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="开港时间：">
                <el-date-picker
                  size="small"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  v-model="addForm.departure_time"
                  type="datetime"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="到港时间：">
                <el-date-picker
                  size="small"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  v-model="addForm.arrival_time"
                  type="datetime"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="备注：">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="addForm.remarks"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item>
                <el-button size="small" @click="addDialogVisible = false"
                  >取消</el-button
                >
                <el-button size="small" type="primary" @click="AddOnSubmit"
                  >确定</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["headerTit", "_5_5Page", "_5_5PageSize"]),
  },
  watch: {
    _5_5Page: function (page) {
      this.$store.commit("_5_5Page", page);
      //   this.getData();
    },
    _5_5PageSize: function (pageSize) {
      this.$store.commit("_5_5PageSize", pageSize);
      //   this.getData();
    },
  },
  data() {
    return {
      isAdd: false,
      keyword: "",
      sele1: "",
      sele2: "",
      total: 0,
      tableData: [],
      addForm: {
        airline_code: "",
        flight_code: "",
        route_code: "",
        transit_port: "",
        hours_presentation: "",
        departure_time: "",
        arrival_time: "",
        remarks: "",
      },
      addDialogVisible: false,
      id: "",
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.flight_list({
        page: this._5_5Page,
        pagesize: this._5_5PageSize,
        keyword: this.keyword,
      });
      this.tableData = res.list;
      this.tableData.forEach((ele) => {
        ele.myReceiving_bulkcargo = ele.receiving_bulkcargo == 1 ? true : false;
        ele.myReceive_tray = ele.receive_tray == 1 ? true : false;
        ele.mySchedule = ele.schedule == 1 ? '每周固定' : ele.schedule == 2 ? '每月固定' : ele.schedule == 3 ? '指定日期' : '每日';
         ele.myPattern = ele.pattern == 1 ? '直飞' : '中转';
      });
      this.total = res.total;
    },
    addDingdan() {
      this.$store.commit("hangbanObj", null);
      this.$router.push({ name: "AddHangban" });
      // this.isAdd = true;
      // for (const key in this.addForm) {
      //   this.addForm[key] = "";
      // }
      // this.addDialogVisible = true;
    },
    tabEdit(row) {
      this.$store.commit("hangbanObj", row);
      this.$router.push({ name: "AddHangban" });
    },
    // 开关（上架/下架）
    async changeKG1(row) {
      console.log(row);
      const res = await this.$api.set_receivingbulkcargostatus({
        status: row.myReceiving_bulkcargo == true ? "1" : "0",
        id: row.id,
      });
      this.$message(res.msg);
      if (res.result == 1) {
        this.getData();
      }
    },
    async changeKG2(row) {
      console.log(row);
      const res = await this.$api.set_receivetraystatus({
        status: row.myReceive_tray == true ? "1" : "0",
        id: row.id,
      });
      this.$message(res.msg);
      if (res.result == 1) {
        this.getData();
      }
    },
    async tabDel(row) {
      const res = await this.$api.del_flight({ id: row.id });
      this.$message(res.msg);
      if (res.result == 1) {
        this.getData();
      }
    },
    async AddOnSubmit() {
      if (this.isAdd) {
        const res = await this.$api.create_flight({
          ...this.addForm,
        });
        console.log(res);
        this.$message(res.msg);
        if (res.result == 1) {
          this.getData();
          this.addDialogVisible = false;
        }
      } else {
        const res = await this.$api.update_flight({
          ...this.addForm,
          id: this.id,
        });
        console.log(res);
        this.$message(res.msg);
        if (res.result == 1) {
          this.getData();
          this.addDialogVisible = false;
        }
      }
    },
    addHandleClose() {
      this.addDialogVisible = false;
    },
    xindingdanHandleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("_5_5PageSize", val);
    },
    xindingdanHandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("_5_5Page", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.index {
}
.top {
  background: #fff;
  padding: 24px 20px;
  .t-tit1 {
    color: #999;
    .active {
      color: #515a61;
      font-weight: 700;
    }
  }
  .t-tit2 {
    display: flex;
    align-content: center;
    justify-content: space-between;
    margin-top: 24px;
    .tt2-left {
      /deep/ .el-input-group {
        width: 440px;
      }
      /deep/ .el-select {
        width: 110px;
      }
      /deep/ .el-input-group__append {
        background: #409eff;
        color: #fff;
        border: 0 !important;
      }
    }
    .tt2-right {
    }
  }
}
.content {
  background: #fff;
  margin: 20px;
  padding: 16px;
}
.fenye {
  margin-top: 10px;
}

.sortable-column-demo .vxe-header--row .vxe-header--column.sortable-ghost,
.sortable-column-demo .vxe-header--row .vxe-header--column.sortable-chosen {
  background-color: #dfecfb;
}
.sortable-column-demo .vxe-header--row .vxe-header--column.col--fixed {
  cursor: no-drop;
}

.myAddForm {
  /deep/ .el-select {
    width: 100%;
  }
}
</style>
