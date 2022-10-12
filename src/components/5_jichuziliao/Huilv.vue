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
            <el-button @click="search" slot="append" icon="el-icon-search">搜索</el-button>
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
          <el-button :disabled="_5_qx.indexOf('增加') == -1" @click="addDingdan" type="success">创建汇率</el-button>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column
            field="source_currency"
            title="源币种"
          ></vxe-table-column>
          <vxe-table-column
            field="host_currency"
            title="宿币种"
          ></vxe-table-column>
          <vxe-table-column field="base" title="基数"></vxe-table-column>
          <vxe-table-column
            field="exchange_rate"
            title="汇率"
          ></vxe-table-column>
          <vxe-table-column
            field="invoice_exchangerate"
            title="发票汇率"
          ></vxe-table-column>
          <vxe-table-column
            field="time"
            title="有效日期"
          ></vxe-table-column>
          <vxe-table-column title="操作状态" width="120">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" :disabled="_5_qx.indexOf('修改') == -1" @click="tabEdit(scope.row)" type="text"
                  >编辑</el-button
                >
                <el-button size="small" :disabled="_5_qx.indexOf('删除') == -1" @click="tabDel(scope.row)" type="text"
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
          :current-page="this._5_4Page"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
    <!-- 创建汇率 -->
    <el-dialog
      title="创建汇率"
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
              <el-form-item label="源币种：">
                <el-select
                  size="small"
                  v-model="addForm.source_currencyid"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in bzList"
                    :key="item.id"
                    :label="item.code"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="宿币种：">
                <el-select
                  size="small"
                  v-model="addForm.host_currencyid"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in bzList"
                    :key="item.id"
                    :label="item.code"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="基数：">
                <el-input size="small" v-model="addForm.base"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="汇率：">
                <el-input
                  size="small"
                  v-model="addForm.exchange_rate"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="发票汇率：">
                <el-input
                  size="small"
                  v-model="addForm.invoice_exchangerate"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="有效时间：">
                <el-date-picker
                  size="small"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  v-model="addForm.effective_time"
                  type="datetime"
                  placeholder="选择时间"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="失效日期：">
                <el-date-picker
                  size="small"
                  value-format="yyyy-MM-dd"
                  v-model="addForm.expiration_date"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
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
    ...mapState(["headerTit", "_5_4Page", "_5_4PageSize",'_5_qx']),
  },
  watch: {
    _5_4Page: function (page) {
      this.$store.commit("_5_4Page", page);
        this.getData();
    },
    _5_4PageSize: function (pageSize) {
      this.$store.commit("_5_4PageSize", pageSize);
        this.getData();
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
        source_currencyid: "",
        host_currencyid: "",
        base: "",
        exchange_rate: "",
        invoice_exchangerate: "",
        effective_time: "",
        expiration_date: "",
      },
      addDialogVisible: false,
      id: "",
      bzList: [],
    };
  },
  created() {
    this.getData();
    this.getBZData();
  },
  methods: {
    async getData() {
      const res = await this.$api.exchangerate_list({
        page: this._5_4Page,
        pagesize: this._5_4PageSize,
        keyword: this.keyword,
      });
      this.tableData = res.list;
      this.tableData.forEach(ele=>{
        ele.time = `${ele.effective_time} - ${ele.expiration_date}`
      })
      this.total = res.total;
    },
    async getBZData() {
      const res = await this.$api.currency_list({
        page: 1,
        pagesize: 1000,
      });
      this.bzList = res.list;
    },
    search(){
      this.getData()
    },
    addDingdan() {
      this.isAdd = true;
      for (const key in this.addForm) {
        this.addForm[key] = ''
      }
      this.addDialogVisible = true;
    },
    tabEdit(row) {
      console.log(row);
      this.isAdd = false;
      this.id = row.id;
      this.addForm = { ...row };
      this.addDialogVisible = true;
    },
    async tabDel(row) {
      const res = await this.$api.del_exchangerate({ id: row.id });
      this.$message(res.msg);
      if (res.result == 1) {
        this.getData();
      }
    },
    async AddOnSubmit() {
      if (this.isAdd) {
        const res = await this.$api.create_exchangerate({
          ...this.addForm,
        });
        console.log(res);
        this.$message(res.msg);
        if (res.result == 1) {
          this.getData();
          this.addDialogVisible = false;
        }
      } else {
        const res = await this.$api.update_exchangerate({
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
      this.$store.commit("_5_4PageSize", val);
    },
    xindingdanHandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("_5_4Page", val);
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
</style>
