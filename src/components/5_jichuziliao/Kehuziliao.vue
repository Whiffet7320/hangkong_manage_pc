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
            <el-select
              v-model="customer_typeid"
              slot="prepend"
              placeholder="全部客户"
            >
              <el-option
                v-for="item in khList"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-button @click="search1" slot="append" icon="el-icon-search"
              >搜索</el-button
            >
          </el-input>
          <el-input
            style="margin-left: 50px"
            placeholder="请输入内容"
            v-model="keyword2"
            class="input-with-select"
          >
            <el-select
              v-model="attribute_codeid"
              slot="prepend"
              placeholder="请选择属性代码"
            >
              <el-option
                v-for="item in sxList"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-button @click="search2" slot="append" icon="el-icon-search"
              >搜索</el-button
            >
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
        <!-- <div class="tt2-right">
          <el-button @click="addDingdan" type="success">创建新订单</el-button>
          <el-button type="primary" plain>字段设置</el-button>
        </div> -->
      </div>
      <div class="t-tit3">
        <el-button :disabled="_5_qx.indexOf('增加') == -1" style="margin-right: 20px" @click="addKehu" type="success"
          >创建客户</el-button
        >
        <el-checkbox @change="check1" v-model="business_type"
          >只看空运</el-checkbox
        >
        <el-checkbox @change="check2" v-model="is_status">只看有效</el-checkbox>
      </div>
    </div>
    <div class="content">
      <div class="myTable">
        <!-- <vxe-grid ref="xGrid2" v-bind="gridOptions2">
          <template #name_edit="{ row }">
            <div class="flex">
              <el-button size="small" @click="tabEdit(row)" type="text"
                >编辑</el-button
              >
              <el-button size="small" @click="tabDel(row)" type="text"
                >删除</el-button
              >
            </div>
          </template>
        </vxe-grid> -->
        <vxe-table :data="tableData">
          <vxe-table-column
            field="chinese_name"
            title="中文名"
          ></vxe-table-column>
          <vxe-table-column
            field="abbreviation"
            title="简称(代码)"
          ></vxe-table-column>
          <vxe-table-column
            field="english_name"
            title="英文名"
          ></vxe-table-column>
          <vxe-table-column
            field="customer_type"
            title="类型"
          ></vxe-table-column>
          <vxe-table-column
            field="attribute_code"
            title="属性代码"
          ></vxe-table-column>
          <vxe-table-column
            field="settlement_currency"
            title="结算币种"
          ></vxe-table-column>
          <vxe-table-column
            field="myCountry_name"
            title="国家城市"
          ></vxe-table-column>
          <vxe-table-column field="phone" title="联系电话"></vxe-table-column>
          <vxe-table-column
            field="mybusiness_type"
            title="业务类型"
          ></vxe-table-column>
          <vxe-table-column
            field="myInvoice_receiving"
            title="发票收寄联系人"
          ></vxe-table-column>
          <vxe-table-column
            field="myReconciliation_contact"
            title="对账联系人"
          ></vxe-table-column>
          <vxe-table-column
            field="myFixed_contact"
            title="固定联系人"
          ></vxe-table-column>
          <vxe-table-column
            field="salesman"
            title="指派业务员"
          ></vxe-table-column>
          <vxe-table-column field="myStatus" width="120" title="有效">
            <template slot-scope="scope">
              <el-switch
                @change="changeKG(scope.row)"
                v-model="scope.row.myStatus"
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
          :current-page="this._5_1Page"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
    <!-- 创建新订单 -->
    <el-dialog
      title="创建新订单"
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
              <el-form-item label="工作号类型：">
                <el-radio-group v-model="addForm.radio1">
                  <el-radio label="ky1">空运出口工作单号</el-radio>
                  <el-radio label="ky2">空运出口包机</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="新工作号：">
                <el-row>
                  <el-col :span="18">
                    <el-input size="small" v-model="addForm.input1"></el-input>
                  </el-col>
                  <el-col style="margin-left: 20px" :span="4">
                    <el-button size="small" type="primary" @click="AddOnSubmit"
                      >新生成</el-button
                    >
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="运输类型：">
                <el-radio-group v-model="addForm.radio2">
                  <el-radio label="ky3">空运</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item>
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
// import Sortable from "sortablejs";
// import VXETable from "vxe-table";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["headerTit", "_5_1Page", "_5_1PageSize",'_5_qx']),
  },
  watch: {
    _5_1Page: function (page) {
      this.$store.commit("_5_1Page", page);
      //   this.getData();
    },
    _5_1PageSize: function (pageSize) {
      this.$store.commit("_5_1PageSize", pageSize);
      //   this.getData();
    },
  },
  data() {
    return {
      isAdd: false,
      keyword: "",
      customer_typeid: "",
      attribute_codeid: "",
      total: 0,
      tableData: [],
      is_status: "",
      business_type: "",
      addForm: {
        sele1: "",
        radio1: "",
        input1: "",
        radio2: "ky3",
      },
      addDialogVisible: false,
      sxList: [],
      khList: [],
      keyword2: "",
    };
  },
  created() {
    this.getSXData();
    this.getKHData();
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.customer_list({
        page: this._5_1Page,
        pagesize: this._5_1PageSize,
        keyword: this.keyword == "" ? this.keyword2 : this.keyword,
        customer_typeid: this.customer_typeid,
        attribute_codeid: this.attribute_codeid,
        business_type: this.business_type ? 2 : 0,
        is_status: this.is_status ? 2 : 0,
      });
      console.log(res);
      this.tableData = res.list;
      this.tableData.forEach((ele) => {
        ele.myCountry_name = `${ele.country_name}-${ele.province_name}-${ele.city_name}`;
        ele.myStatus = ele.is_status == 1 ? true : false;
        ele.mybusiness_type = [];
        ele.business_type.split(",").forEach((ele2) => {
          var name1 = ele2 == 1 ? "海运" : "空运";
          ele.mybusiness_type.push(name1);
        });
        ele.mybusiness_type = ele.mybusiness_type.toString();
        ele.myReconciliation_contact = []
        ele.reconciliation_contact.forEach(ele2=>{
          ele.myReconciliation_contact.push(ele2.input1)
        })
        ele.myInvoice_receiving = []
        ele.invoice_receiving.forEach(ele2=>{
          ele.myInvoice_receiving.push(ele2.input1)
        })
        ele.myFixed_contact = []
        ele.fixed_contact.forEach(ele2=>{
          ele.myFixed_contact.push(ele2.input1)
        })
        ele.myReconciliation_contact = ele.myReconciliation_contact.toString();
        ele.myInvoice_receiving = ele.myInvoice_receiving.toString();
        ele.myFixed_contact = ele.myFixed_contact.toString();
      });
    },
    async getSXData() {
      const res = await this.$api.customer_attributecode();
      console.log(res);
      this.sxList = res.list;
    },
    async getKHData() {
      const res = await this.$api.customer_type();
      console.log(res);
      this.khList = res.list;
    },
    // 开关（上架/下架）
    async changeKG(row) {
      console.log(row);
      const res = await this.$api.set_customerstatus({
        status: row.myStatus == true ? "1" : "0",
        id: row.id,
      });
      this.$message(res.msg);
      if (res.result == 1) {
        this.getData();
      }
    },
    search1() {
      this.keyword2 = "";
      this.attribute_codeid = "";
      this.getData();
    },
    search2() {
      this.keyword = "";
      this.customer_typeid = "";
      this.getData();
    },
    check1() {
      this.getData();
    },
    check2() {
      this.getData();
    },
    addKehu() {
      this.$store.commit("kehuObj", null);
      this.$router.push({ name: "AddKehu" });
    },
    tabEdit(row) {
      console.log(row);
      this.$store.commit("kehuObj", row);
      this.$router.push({ name: "AddKehu" });
    },
    async tabDel(row) {
      const res = await this.$api.del_customer({ id: row.id });
      this.$message(res.msg);
      if (res.result == 1) {
        this.getData();
      }
    },
    AddOnSubmit() {
      console.log(this.addForm);
    },
    addHandleClose() {
      this.addDialogVisible = false;
    },
    xindingdanHandleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("_5_1PageSize", val);
    },
    xindingdanHandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("_5_1Page", val);
    },
  },
};
</script>

<style lang="scss" scoped>
// /deep/ .tt2-left {
//   .input-with-select:nth-of-type(1) {
//     .el-input-group__prepend {
//       .el-select {
//         width: 110px !important;
//       }
//     }
//   }
//   .input-with-select:nth-of-type(2) {
//     .el-input-group__prepend {
//       .el-select {
//         width: 200px !important;
//       }
//     }
//   }
// }
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
      /deep/ .el-input-group__append {
        background: #409eff;
        color: #fff;
        border: 0 !important;
      }
    }
    /deep/ .tt2-left {
      .el-input-group:nth-of-type(1) {
        width: 410px;
        .el-input-group__prepend {
          .el-select {
            width: 110px !important;
          }
        }
      }
      .el-input-group:nth-of-type(2) {
        width: 500px;
        .el-input-group__prepend {
          .el-select {
            width: 200px !important;
          }
        }
      }
    }
    .tt2-right {
    }
  }
  .t-tit3 {
    margin-top: 20px;
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
// /deep/ .vxe-header--row{
//   font-size: 12px !important;
// }
// /deep/ .vxe-body--row {
//   font-size: 12px !important;
// }
.sortable-column-demo .vxe-header--row .vxe-header--column.sortable-ghost,
.sortable-column-demo .vxe-header--row .vxe-header--column.sortable-chosen {
  background-color: #dfecfb;
}
.sortable-column-demo .vxe-header--row .vxe-header--column.col--fixed {
  cursor: no-drop;
}
</style>
