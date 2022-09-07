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
          <el-button :disabled="_5_qx.indexOf('增加') == -1" @click="addDingdan" type="success">创建币种</el-button>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column field="code" title="币种代码"></vxe-table-column>
          <vxe-table-column field="name" title="币种名称"></vxe-table-column>
          <vxe-table-column field="symbol" title="符号"></vxe-table-column>
          <vxe-table-column field="myCurrency_mark" title="本位币标记">
            <template slot-scope="scope">
              <el-switch
                @change="changeKG(scope.row)"
                v-model="scope.row.myCurrency_mark"
              ></el-switch>
            </template>
          </vxe-table-column>
          <vxe-table-column field="myStatistical_analysis" title="参与统计分析">
            <template slot-scope="scope">
              <el-switch
                @change="changeKG2(scope.row)"
                v-model="scope.row.myStatistical_analysis"
              ></el-switch>
            </template>
          </vxe-table-column>
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
          :current-page="this._5_3Page"
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
              <el-form-item label="币种代码：">
                <el-row>
                  <el-input size="small" v-model="addForm.code"></el-input>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="币种名称：">
                <el-input size="small" v-model="addForm.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="符号：">
                <el-input size="small" v-model="addForm.symbol"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="本位币标记：">
                <el-switch
                  size="small"
                  v-model="addForm.currency_mark"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                ></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="参与统计分析：">
                <el-switch
                  size="small"
                  v-model="addForm.statistical_analysis"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                ></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item>
                <el-button
                  size="small"
                  style="width: 100px"
                  @click="addDialogVisible = false"
                  >取消</el-button
                >
                <el-button
                  size="small"
                  style="width: 100px"
                  type="primary"
                  @click="AddOnSubmit"
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
    ...mapState(["headerTit", "_5_3Page", "_5_3PageSize",'_5_qx']),
  },
  watch: {
    _5_3Page: function (page) {
      this.$store.commit("_5_3Page", page);
        this.getData();
    },
    _5_3PageSize: function (pageSize) {
      this.$store.commit("_5_3PageSize", pageSize);
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
        name: "",
        code: "",
        symbol: "",
        currency_mark: 0,
        statistical_analysis: 0,
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
      const res = await this.$api.currency_list({
        page: this._5_3Page,
        pagesize: this._5_3PageSize,
        keyword: this.keyword,
      });
      this.tableData = res.list;
      this.tableData.forEach((ele) => {
        ele.myCurrency_mark = ele.currency_mark == 1 ? true : false;
        ele.myStatistical_analysis =
          ele.statistical_analysis == 1 ? true : false;
      });
      this.total = res.total;
    },
    // 开关（上架/下架）
    async changeKG(row) {
      console.log(row);
      const res = await this.$api.update_currency({
        ...row,
        statistical_analysis: row.myStatistical_analysis == true ? "1" : "0",
        currency_mark: row.myCurrency_mark == true ? "1" : "0",
        id: row.id,
      });
      this.$message(res.msg);
      if (res.result == 1) {
        this.getData();
      }
    },
    async changeKG2(row) {
      console.log(row);
      const res = await this.$api.update_currency({
        ...row,
        statistical_analysis: row.myStatistical_analysis == true ? "1" : "0",
        currency_mark: row.myCurrency_mark == true ? "1" : "0",
        id: row.id,
      });
      this.$message(res.msg);
      if (res.result == 1) {
        this.getData();
      }
    },
    search(){
      this.getData()
    },
    addDingdan() {
      this.isAdd = true;
      for (const key in this.addForm) {
        this.addForm[key] = "";
      }
      this.addForm.currency_mark = 0;
      this.addForm.statistical_analysis = 0;
      this.addDialogVisible = true;
    },
    tabEdit(row) {
      console.log(row);
      this.isAdd = false;
      this.id = row.id;
      this.addForm = { ...row };
      this.addForm.currency_mark = row.currency_mark == 0 ? false : true;
      this.addForm.statistical_analysis =
        row.statistical_analysis == 0 ? false : true;
      this.addDialogVisible = true;
    },
    async tabDel(row) {
      const res = await this.$api.del_currency({ id: row.id });
      this.$message(res.msg);
      if (res.result == 1) {
        this.getData();
      }
    },
    async AddOnSubmit() {
      if (this.isAdd) {
        const res = await this.$api.create_currency({
          ...this.addForm,
          currency_mark: this.addForm.currency_mark ? 1 : 0,
          statistical_analysis: this.addForm.statistical_analysis ? 1 : 0,
        });
        console.log(res);
        this.$message(res.msg);
        if (res.result == 1) {
          this.getData();
          this.addDialogVisible = false;
        }
      } else {
        const res = await this.$api.update_currency({
          ...this.addForm,
          id: this.id,
          currency_mark: this.addForm.currency_mark ? 1 : 0,
          statistical_analysis: this.addForm.statistical_analysis ? 1 : 0,
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
      this.$store.commit("_5_3PageSize", val);
    },
    xindingdanHandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("_5_3Page", val);
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
