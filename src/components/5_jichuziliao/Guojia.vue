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
          <el-button :disabled="_5_qx.indexOf('增加') == -1" @click="addDingdan" type="success">创建国家</el-button>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column field="country_code" title="国家代码"></vxe-table-column>
          <vxe-table-column
            field="numeric_code"
            title="数字码(GB)"
          ></vxe-table-column>
          <vxe-table-column field="alphabetic_code" title="字母码(GB)"></vxe-table-column>
          <vxe-table-column field="chinese_name" title="中文名"></vxe-table-column>
          <vxe-table-column field="english_name" title="英文名"></vxe-table-column>
          <vxe-table-column
            field="customs_code"
            title="海关编码"
          ></vxe-table-column>
          <vxe-table-column
            field="attachment"
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
          :current-page="this.xindingdanPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
    <!-- 创建国家 -->
    <el-dialog
      title="创建国家"
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
              <el-form-item label="国家代码：">
                <el-row>
                  <el-input
                    size="small"
                    v-model="addForm.country_code"
                  ></el-input>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="数字码(GB)：">
                <el-input
                  size="small"
                  v-model="addForm.numeric_code"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="字母码(GB)：">
                <el-input
                  size="small"
                  v-model="addForm.alphabetic_code"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="中文名：">
                <el-input
                  size="small"
                  v-model="addForm.chinese_name"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="英文名：">
                <el-input
                  size="small"
                  v-model="addForm.english_name"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="海关编码：">
                <el-input
                  size="small"
                  v-model="addForm.customs_code"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="附件说明：">
                <el-input
                  type="textarea"
                  size="small"
                  v-model="addForm.attachment"
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
    ...mapState(["headerTit", "xindingdanPage", "xindingdanPageSize",'_5_qx']),
  },
  watch: {
    xindingdanPage: function (page) {
      this.$store.commit("xindingdanPage", page);
      //   this.getData();
    },
    xindingdanPageSize: function (pageSize) {
      this.$store.commit("xindingdanPageSize", pageSize);
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
        country_code: "",
        numeric_code: "",
        alphabetic_code: "",
        chinese_name: "",
        english_name: "",
        customs_code: "",
        attachment: "",
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
      const res = await this.$api.country_list({
        page: this._5_4Page,
        pagesize: this._5_4PageSize,
        keyword: this.keyword,
      });
      this.tableData = res.list;
      this.tableData.forEach((ele) => {
        ele.time = `${ele.effective_time} - ${ele.expiration_date}`;
      });
      this.total = res.total;
    },
    search(){
      this.getData()
    },
    addDingdan() {
      this.isAdd = true;
      for (const key in this.addForm) {
        this.addForm[key] = "";
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
      const res = await this.$api.del_country({ id: row.id });
      this.$message(res.msg);
      if (res.result == 1) {
        this.getData();
      }
    },
    async AddOnSubmit() {
      if (this.isAdd) {
        const res = await this.$api.create_country({
          ...this.addForm,
        });
        console.log(res);
        this.$message(res.msg);
        if (res.result == 1) {
          this.getData();
          this.addDialogVisible = false;
        }
      } else {
        const res = await this.$api.update_country({
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
      this.$store.commit("xindingdanPageSize", val);
    },
    xindingdanHandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("xindingdanPage", val);
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
