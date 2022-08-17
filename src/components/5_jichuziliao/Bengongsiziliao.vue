<template>
  <div class="index">
    <div class="top">
      <div class="t-tit1" v-html="headerTit"></div>
    </div>
    <div class="content">
      <div class="nav1 nav2">
        <div class="n-tit1">基本资料</div>
        <div class="box">
          <el-form
            style="margin-top: 16px"
            :model="addForm"
            ref="addForm"
            label-width="130px"
            class="demo-addForm"
          >
            <el-row>
              <el-col :span="11">
                <el-form-item label="中文名称：">
                  <el-row>
                    <el-input
                      size="small"
                      v-model="addForm.chinese_name"
                    ></el-input>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="英文名称：">
                  <el-row>
                    <el-input
                      size="small"
                      v-model="addForm.english_name"
                    ></el-input>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="地区：">
                  <el-row>
                    <el-col :span="5">
                      <el-input
                        size="small"
                        v-model="addForm.country_name"
                      ></el-input>
                    </el-col>
                    <el-col style="margin-left: 2%" :span="9">
                      <el-input
                        size="small"
                        v-model="addForm.province_name"
                      ></el-input>
                    </el-col>
                    <el-col style="margin-left: 2%" :span="9">
                      <el-input
                        size="small"
                        v-model="addForm.city_name"
                      ></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="具体地址：">
                  <el-row>
                    <el-input
                      size="small"
                      v-model="addForm.address"
                    ></el-input>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-col :span="12">
                  <el-form-item label="公司电话：">
                    <el-input
                      size="small"
                      v-model="addForm.company_officenumber"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="电子邮件：">
                    <el-input
                      size="small"
                      v-model="addForm.mail"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="11">
                <el-col :span="12">
                  <el-form-item label="传真：">
                    <el-input
                      size="small"
                      v-model="addForm.fax"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="邮政编码：">
                    <el-input
                      size="small"
                      v-model="addForm.postal_code"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="工商登记号：">
                  <el-row>
                    <el-input
                      size="small"
                      v-model="addForm.commercial_registrationnumber"
                    ></el-input>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="税务登记号：">
                  <el-row>
                    <el-input
                      size="small"
                      v-model="addForm.tax_registrationnumber"
                    ></el-input>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="nav1 nav5">
        <div class="box_tit">
          <div class="tit-l">银行账号</div>
          <el-button style="margin-right: 20px" @click="addClick" type="success"
            >新增</el-button
          >
        </div>
        <div class="box">
          <div class="myTable">
            <vxe-table :data="tableData1">
              <vxe-table-column
                field="account_name"
                title="账户名称"
                show-overflow
              ></vxe-table-column>
              <vxe-table-column
                field="bank_name"
                title="银行"
                show-overflow
              ></vxe-table-column>
              <vxe-table-column
                field="currency"
                title="币种"
                show-overflow
              ></vxe-table-column>
              <vxe-table-column
                field="account_number"
                title="账号"
                show-overflow
              ></vxe-table-column>
              <vxe-table-column
                field="bank_deposit"
                title="开户行"
                show-overflow
              ></vxe-table-column>
              <vxe-table-column
                field="remarks"
                title="备注"
                show-overflow
              ></vxe-table-column>
              <vxe-table-column title="操作状态" width="120">
                <template slot-scope="scope">
                  <div class="flex">
                    <el-button
                      size="small"
                      @click="toEdit(scope.row)"
                      type="text"
                      >编辑</el-button
                    >
                    <el-button
                      size="small"
                      @click="toDel(scope.row)"
                      type="text"
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
          :current-page="this._5_9Page"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
          </div>
        </div>
      </div>
      <div class="f-btn" style="margin-bottom: 70px">
        <el-button
          style="margin-top: 30px; width: 100%"
          @click="onSubmit"
          type="primary"
          >保存</el-button
        >
      </div>
    </div>
    <!-- 银行账号 -->
    <el-dialog
      title="银行账号"
      :visible.sync="addDialogVisible"
      width="700px"
      :before-close="addHandleClose"
    >
      <div class="myAddForm">
        <el-form
          :model="addDiaForm1"
          ref="addForm"
          label-width="130px"
          class="demo-addForm"
        >
          <el-row>
            <el-col :span="20">
              <el-form-item label="账户名称：">
                <el-row>
                  <el-input
                    size="small"
                    v-model="addDiaForm1.account_name"
                  ></el-input>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="银行名称：">
                <el-input
                  size="small"
                  v-model="addDiaForm1.bank_name"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="币种：">
                <el-select
                  size="small"
                  v-model="addDiaForm1.currency_id"
                  filterable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in bzList"
                    :key="item.id"
                    :label="`${item.code}-${item.name}`"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="账号：">
                <el-input
                  size="small"
                  v-model="addDiaForm1.account_number"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="开户行：">
                <el-input
                  size="small"
                  v-model="addDiaForm1.bank_deposit"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="备注：">
                <el-input
                  type="textarea"
                  size="small"
                  v-model="addDiaForm1.remarks"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item>
                <el-button size="small" @click="addDialogVisible = false"
                  >取消</el-button
                >
                <el-button size="small" type="primary" @click="AddDiaOnSubmit"
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
    ...mapState(["headerTit", "_5_9Page", "_5_9PageSize"]),
  },
  watch: {
    _5_9Page: function (page) {
      this.$store.commit("_5_9Page", page);
        this.getYHData();
    },
    _5_9PageSize: function (pageSize) {
      this.$store.commit("_5_9PageSize", pageSize);
        this.getYHData();
    },
  },
  data() {
    return {
      checkList1: [],
      addForm: {
        chinese_name: "",
        english_name: "",
        country_name: "",
        province_name: "",
        city_name: "",
        address: "",
        company_officenumber: "",
        mail: "",
        fax: "",
        postal_code: "",
        commercial_registrationnumber: "",
        tax_registrationnumber: "",
      },
      addDialogVisible: false,
      addDiaForm1: {
        account_name: "",
        bank_name: "",
        currency_id: "",
        account_number: "",
        bank_deposit: "",
        remarks: "",
      },
      total:0,
      isAdd1: true,
      tableData1: [],
      editId1: "",
      bzList: [],
    };
  },
  created() {
    this.getbzData();
    this.getYHData();
    this.getData()
  },
  methods: {
    async getData() {
      const res = await this.$api.companyinfo();
      this.addForm = {...res}
    },
    async getbzData() {
      const res = await this.$api.currency_list({
        page: 1,
        pagesize: 1000,
      });
      console.log(res);
      this.bzList = res.list;
    },
    async getYHData() {
      const res = await this.$api.list_companybank({
        page: this._5_9Page,
        pagesize: this._5_9PageSize,
      });
      console.log(res);
      this.tableData1 = res.list;
      this.total = res.total
    },
    async onSubmit() {
        const res = await this.$api.update_companyinfo({
          ...this.addForm
        });
        this.$message(res.msg);
        if (res.result == 1) {
          this.getData()
        }
    },
    async AddDiaOnSubmit() {
      if (this.isAdd1) {
        const res = await this.$api.create_companybank({
          ...this.addDiaForm1,
        });
        this.$message(res.msg);
        if (res.result == 1) {
          this.getYHData();
          this.addDialogVisible = false;
        }
      } else {
        const res = await this.$api.update_companybank({
          id: this.editId1,
          ...this.addDiaForm1,
        });
        this.$message(res.msg);
        if (res.result == 1) {
          this.getYHData();
          this.addDialogVisible = false;
        }
      }
    },
    addClick() {
      this.isAdd1 = true;
      for (const key in this.addDiaForm1) {
        this.addDiaForm1[key] = "";
      }
      this.addDiaForm1.swi1 = true;
      this.addDiaForm1.time1 = this.getNowDate();
      this.addDialogVisible = true;
    },
    toEdit(row) {
      this.editId1 = row.id;
      this.isAdd1 = false;
      this.addDiaForm1 = { ...row };
      this.addDialogVisible = true;
    },
    async toDel(row) {
      const res = await this.$api.del_companybank({ id: row.id });
      this.$message(res.msg);
      if (res.result == 1) {
        this.getYHData();
      }
    },
    AddOnSubmit() {
      console.log(this.addForm);
    },
    addHandleClose() {
      this.addDialogVisible = false;
    },
    getNowDate() {
      var now = new Date();
      var year = now.getFullYear();
      var month = now.getMonth();
      var data = now.getDate();
      month = month + 1;
      return `${year}-${month}-${data}`;
    },
    xindingdanHandleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("_5_9PageSize", val);
    },
    xindingdanHandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("_5_9Page", val);
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
}
.content {
  margin: 20px 30px;
  .nav1 {
    margin-top: 40px;
    .n-tit1 {
      font-size: 24px;
    }
    .box {
      padding: 20px;
      background: #fff;
      border-radius: 10px;
      margin-top: 20px;
    }
  }
  .nav2.nav1 {
  }
  .nav3.nav1 {
    .box_box {
      padding: 0 20px;
      .box_tit {
        display: flex;
        align-content: center;
        justify-content: space-between;
        align-items: center;
        .tit-l {
          font-size: 24px;
        }
      }
    }
    .myTable {
      margin-top: 20px;
    }
  }
  .nav5.nav1 {
    .box_tit {
      display: flex;
      align-content: center;
      justify-content: space-between;
      align-items: center;
      .tit-l {
        font-size: 24px;
      }
    }
  }
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
