<template>
  <div class="index">
    <div class="top">
      <div class="t-tit1" v-html="headerTit"></div>
    </div>
    <div class="t-tit3">
      <el-button
      :disabled="_6_qx.indexOf('增加') == -1"
        style="margin-left: 20px; margin-top: 20px"
        @click="addKehu"
        type="success"
        >创建</el-button
      >
    </div>
    <div class="content">
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column
            width="120"
            field="code"
            title="编号代码"
          ></vxe-table-column>
          <vxe-table-column field="rule" title="编码规则"></vxe-table-column>
          <vxe-table-column
            field="current_number"
            title="当前编号"
          ></vxe-table-column>
          <vxe-table-column
            field="myBusiness_type"
            title="业务类型"
          ></vxe-table-column>
          <vxe-table-column
            field="myZeroing_mode"
            title="归零方式"
          ></vxe-table-column>
          <vxe-table-column
            field="zero_value"
            title="归零值"
          ></vxe-table-column>
          <vxe-table-column
            field="zero_value"
            title="下次归零日期"
          ></vxe-table-column>
          <vxe-table-column title="操作状态" width="120">
            <template slot-scope="scope">
              <div class="flex">
                <el-button :disabled="_6_qx.indexOf('修改') == -1" size="small" @click="toEdit(scope.row)" type="text"
                  >编辑</el-button
                >
                <el-button
                  size="small"
                  :disabled="scope.row.is_sys == 1 && _6_qx.indexOf('删除') == -1"
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
          :current-page="this._6_4Page"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
    <!-- 工作号编号 -->
    <el-dialog
      title="工作号编号"
      :visible.sync="addDialogVisible"
      width="900px"
      :before-close="addHandleClose"
    >
      <div class="myAddForm">
        <el-form
          :model="addForm"
          ref="addForm"
          label-width="130px"
          class="demo-addForm"
          :rules="rules"
        >
          <el-row>
            <el-col :span="20">
              <el-form-item label="编号代码：" >
                <el-input
                  size="small"
                  placeholder=""
                  v-model="addForm.code"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="编号规则：" >
                <el-input
                  size="small"
                  placeholder=""
                  v-model="addForm.rule"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="">
                <el-button @click="c1" size="small" type="primary"
                  >年(2位)</el-button
                >
                <el-button @click="c2" size="small" type="primary"
                  >年(4位)</el-button
                >
                <el-button @click="c3" size="small" type="primary"
                  >月</el-button
                >
                <el-button @click="c4" size="small" type="primary"
                  >日</el-button
                >
                <el-button @click="c5" size="small" type="primary"
                  >流水号</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="当前编号：">
                <el-input
                  size="small"
                  placeholder=""
                  v-model="addForm.current_number"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="业务类型：">
                <el-select
                  size="small"
                  v-model="addForm.business_type"
                  placeholder="请选择"
                >
                  <el-option label="包机" :value="1"> </el-option>
                  <el-option label="其他" :value="2"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="归零方式：">
                <el-select
                  size="small"
                  v-model="addForm.zeroing_mode"
                  placeholder="请选择"
                >
                  <el-option label="不归零" :value="1"> </el-option>
                  <el-option label="按月归零" :value="2"> </el-option>
                  <el-option label="按年归零" :value="3"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="归零值：">
                <el-input
                  size="small"
                  placeholder=""
                  v-model="addForm.zero_value"
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
                <el-button
                  size="small"
                  type="primary"
                  @click="AddOnSubmit('addForm')"
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
    ...mapState(["headerTit", "_6_4Page", "_6_4PageSize",'_6_qx']),
  },
  watch: {
    _6_4Page: function (page) {
      this.$store.commit("_6_4Page", page);
        this.getFZData();
    },
    _6_4PageSize: function (pageSize) {
      this.$store.commit("_6_4PageSize", pageSize);
        this.getFZData();
    },
  },
  data() {
    return {
      id: "",
      isAdd: false,
      keyword: "",
      sele1: "",
      sele2: "",
      total: 0,
      tableData: [],
      radio: "",
      addForm: {
        code: "",
        rule: "",
        current_number:'',
        business_type: "",
        zeroing_mode: "",
        zero_value: "",
      },
      rules: {
        name: [{ required: true, message: "请输入工作号", trigger: "blur" }],
        input2: [{ required: true, message: "请输入工作号", trigger: "blur" }],
        sele1: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        sele2: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        sele3: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        sele4: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        sele5: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        sele6: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        sele7: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        time1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change",
          },
        ],
        radio1: [{ required: true, trigger: "change" }],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
      addDialogVisible: false,
      // quanxianList: [],
      quanxianList: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      checkList1: [],
      userList: [],
    };
  },
  created() {
    this.getData();
    this.getFZData();
  },
  beforeDestroy() {
    if (this.sortable2) {
      this.sortable2.destroy();
    }
  },
  methods: {
    async getFZData() {
      const res = await this.$api.workno_list({
        page: this._6_4Page,
        pagesize: this._6_4PageSize,
      });
      this.tableData = res.list;
      this.total = res.total;
      this.tableData.forEach((ele) => {
        ele.myBusiness_type = ele.business_type == 1 ? "包机" : "其它";
        ele.myZeroing_mode =
          ele.zeroing_mode == 1
            ? "不归零"
            : ele.zeroing_mode == 2
            ? "按月归零"
            : "按年归零";
      });
      console.log(this.tableData);
    },
    async getData() {
      const res = await this.$api.user_list({
        page: 1,
        pagesize: 1000,
      });
      console.log(res);
      this.userList = res.list;
    },
    addKehu() {
      this.isAdd = true;
      this.addDialogVisible = true;
      for (const key in this.addForm) {
        this.addForm[key] = ''
      }
      this.addDialogVisible = true;
    },
    c1() {
      // var time = this.$getTime();
      // time = `<${time.slice(2, 4)}>`;
      this.addForm.rule += `<YY>`;
    },
    c2() {
      this.addForm.rule += `<YYYY>`;
    },
    c3() {
      this.addForm.rule += `<MM>`;
    },
    c4() {
      this.addForm.rule += `<dd>`;
    },
    c5() {
      // var charactors = "1234567890";
      // var value = "",
      //   i;
      // for (var j = 1; j <= 6; j++) {
      //   i = parseInt(10 * Math.random());
      //   value = value + charactors.charAt(i);
      // }
      this.addForm.rule += `<XXXXXX>`;
    },
    // addDingdan() {
    //   this.isAdd = true;
    //   this.addForm.radio1 = "";
    //   this.addForm.radio2 = "ky3";
    //   this.addForm.input1 = "";
    //   this.addDialogVisible = true;
    // },
    toEdit(row) {
      this.isAdd = false;
      this.id = row.id;
      this.addForm = {...row};
      this.addDialogVisible = true;
    },
    async toDel(row) {
      const res = await this.$api.del_workno({ id: row.id });
      this.$message(res.msg);
      if (res.result == 1) {
        this.getFZData();
      }
    },
    AddOnSubmit(formName) {
      console.log(this.addForm);
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.isAdd) {
            const res = await this.$api.create_workno({
              ...this.addForm
            });
            this.$message(res.msg);
            if (res.result == 1) {
              this.getFZData();
              this.addDialogVisible = false;
            }
          } else {
            const res = await this.$api.update_workno({
              id: this.id,
              ...this.addForm
            });
            this.$message(res.msg);
            if (res.result == 1) {
              this.getFZData();
              this.addDialogVisible = false;
            }
          }
        }
      });
    },
    addHandleClose() {
      this.addDialogVisible = false;
    },
    xindingdanHandleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("_6_4PageSize", val);
    },
    xindingdanHandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("_6_4Page", val);
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
/deep/ .el-checkbox-group {
  display: flex !important;
  align-items: center;
  .el-col-4 {
    width: 50%;
  }
  .el-checkbox__label {
    font-size: 12px;
    margin-right: 8px;
  }
}
/deep/
  .el-tree
  > .el-tree-node.is-expanded.is-focusable
  > .el-tree-node__content {
  background: #f2f6fc;
}
/deep/ .el-tree {
  border: 1px solid #dcdfe6;
  padding: 10px;
  .tree_flex > span:nth-child(1) {
    width: 200px;
  }
  .tree_flex {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .tree_nav {
      display: flex;
      align-items: center;
      .txt {
        font-size: 13px;
        margin-right: 20px;
      }
    }
  }
}
.sortable-column-demo .vxe-header--row .vxe-header--column.sortable-ghost,
.sortable-column-demo .vxe-header--row .vxe-header--column.sortable-chosen {
  background-color: #dfecfb;
}
.sortable-column-demo .vxe-header--row .vxe-header--column.col--fixed {
  cursor: no-drop;
}
</style>
