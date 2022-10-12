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
          <el-button :disabled="_5_qx.indexOf('增加') == -1" @click="addDingdan" type="success">创建费用</el-button>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column
            field="cost_code"
            title="费用代码"
          ></vxe-table-column>
          <vxe-table-column field="myReceivable" title="应收">
            <template slot-scope="scope">
              <el-checkbox
                @change="changeKG(scope.row)"
                v-model="scope.row.myReceivable"
              ></el-checkbox>
            </template>
          </vxe-table-column>
          <vxe-table-column field="myReceivable2" title="应付">
            <template slot-scope="scope">
              <el-checkbox
                @change="changeKG2(scope.row)"
                v-model="scope.row.myReceivable2"
              ></el-checkbox>
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="definition"
            title="费用名称"
          ></vxe-table-column>
          <vxe-table-column
            field="definition_english"
            title="英文名"
          ></vxe-table-column>
          <vxe-table-column field="myCommission" title="状态(是否佣金)">
            <template slot-scope="scope">
              <el-switch
                @change="changeKG3(scope.row)"
                v-model="scope.row.myCommission"
              ></el-switch>
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="fee_groups"
            title="费用组"
          ></vxe-table-column>
          <vxe-table-column
            field="currency"
            title="默认币种"
          ></vxe-table-column>
          <vxe-table-column
            field="default_price"
            title="默认单价"
          ></vxe-table-column>
          <vxe-table-column
            field="attachments"
            title="附件说明"
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
          :current-page="this._5_2Page"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
    <!-- 创建费用类型 -->
    <el-dialog
      title="创建费用类型"
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
              <el-form-item label="费用代码：">
                <el-row>
                  <el-input size="small" v-model="addForm.cost_code"></el-input>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="应收/应付：">
                <el-radio-group v-model="addForm.receivable">
                  <el-radio label="1">应收</el-radio>
                  <el-radio label="2">应付</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="费用名称：">
                <el-input size="small" v-model="addForm.definition"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="英文名：">
                <el-input
                  size="small"
                  v-model="addForm.definition_english"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="佣金：">
                <el-switch
                  size="small"
                  v-model="addForm.commission"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                ></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="费用组：">
                <el-select
                  size="small"
                  v-model="addForm.fee_groups"
                  placeholder="请选择"
                >
                  <el-option label="AIR" value="AIR"></el-option>
                  <el-option label="CIQ" value="CIQ"></el-option>
                  <el-option label="CUSTOMS" value="CUSTOMS"></el-option>
                  <el-option label="SEA" value="SEA"></el-option>
                  <el-option label="保险" value="保险"></el-option>
                  <el-option label="税费" value="税费"></el-option>
                  <el-option label="杂费" value="杂费"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="默认币种：">
                <el-select
                  size="small"
                  v-model="addForm.currency_id"
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
              <el-form-item label="默认单价：">
                <el-input
                  size="small"
                  v-model="addForm.default_price"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="附件说明：">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="addForm.attachments"
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
    ...mapState(["headerTit", "_5_2Page", "_5_2PageSize",'_5_qx']),
  },
  watch: {
    _5_2Page: function (page) {
      this.$store.commit("_5_2Page", page);
        this.getData();
    },
    _5_2PageSize: function (pageSize) {
      this.$store.commit("_5_2PageSize", pageSize);
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
        cost_code: "",
        receivable: "",
        definition: "",
        definition_english: "",
        commission: 0,
        fee_groups: "",
        currency_id: "",
        default_price: "",
        attachments: "",
      },
      addDialogVisible: false,
      id: "",
      bzList: [],
    };
  },
  created() {
    this.getBZData();
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.list_costtypes({
        page: this._5_2Page,
        pagesize: this._5_2PageSize,
        keyword: this.keyword,
      });
      this.tableData = res.list;
      this.tableData.forEach((ele) => {
        ele.myReceivable = ele.receivable == 1 ? true : false;
        ele.myReceivable2 = ele.receivable == 1 ? false : true;
        ele.myCommission = ele.commission == 1 ? true : false;
      });
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
    // 开关（上架/下架）
    async changeKG(row) {
      console.log(row);
      const res = await this.$api.update_costtypes({
        ...row,
        receivable: row.myReceivable == true ? "1" : "2",
        commission: row.myCommission == true ? "1" : "0",
        id: row.id,
      });
      this.$message(res.msg);
      if (res.result == 1) {
        this.getData();
      }
    },
    async changeKG2(row) {
      console.log(row);
      const res = await this.$api.update_costtypes({
        ...row,
        receivable: row.myReceivable2 == true ? "2" : "1",
        commission: row.myCommission == true ? "1" : "0",
        id: row.id,
      });
      this.$message(res.msg);
      if (res.result == 1) {
        this.getData();
      }
    },
    async changeKG3(row) {
      console.log(row);
      const res = await this.$api.update_costtypes({
        ...row,
        receivable: row.myReceivable == true ? "1" : "0",
        commission: row.myCommission == true ? "1" : "0",
        id: row.id,
      });
      this.$message(res.msg);
      if (res.result == 1) {
        this.getData();
      }
    },
    addDingdan() {
      this.isAdd = true;
      this.addForm.radio1 = "";
      this.addForm.radio2 = "ky3";
      this.addForm.input1 = "";
      this.addDialogVisible = true;
    },
    tabEdit(row) {
      console.log(row);
      this.isAdd = false;
      this.id = row.id;
      this.addForm = { ...row };
      this.addForm.commission = row.myCommission
      this.addDialogVisible = true;
    },
    async tabDel(row) {
      const res = await this.$api.del_costtypes({ id: row.id });
      this.$message(res.msg);
      if (res.result == 1) {
        this.getData();
      }
    },
    async AddOnSubmit() {
      if (this.isAdd) {
        const res = await this.$api.create_costtypes({
          ...this.addForm,
        });
        console.log(res);
        this.$message(res.msg);
        if (res.result == 1) {
          this.getData();
          this.addDialogVisible = false;
        }
      } else {
        const res = await this.$api.update_costtypes({
          ...this.addForm,
        });
        console.log(res);
        this.$message(res.msg);
        if (res.result == 1) {
          this.getData();
          this.addDialogVisible = false;
        }
      }
      console.log(this.addForm);
    },
    addHandleClose() {
      this.addDialogVisible = false;
    },
    xindingdanHandleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("_5_2PageSize", val);
    },
    xindingdanHandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("_5_2Page", val);
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
