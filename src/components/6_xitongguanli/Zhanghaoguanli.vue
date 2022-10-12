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
            field="realname"
            title="名字"
          ></vxe-table-column>
          <vxe-table-column
            field="mobile"
            title="电话"
          ></vxe-table-column>
          <vxe-table-column
            field="username"
            title="用户名"
          ></vxe-table-column>
          <!-- <vxe-table-column field="path" title="密码"></vxe-table-column> -->
          <vxe-table-column
            field="post_name"
            title="岗位"
          ></vxe-table-column>
          <vxe-table-column
            field="groups_name"
            title="分组"
          ></vxe-table-column>
          <vxe-table-column
            field="is_status"
            title="有效"
          ></vxe-table-column>
          <vxe-table-column field="myStatus" title="状态(是否有效)">
            <template slot-scope="scope">
              <el-switch
                @change="changeKG(scope.row)"
                v-model="scope.row.myStatus"
              ></el-switch>
            </template>
          </vxe-table-column>
          <!-- <vxe-table-column field="qx" title="权限"></vxe-table-column> -->
          <vxe-table-column title="操作状态" width="120">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" :disabled="_6_qx.indexOf('修改') == -1" @click="toEdit(scope.row)" type="text"
                  >编辑</el-button
                >
                <el-button size="small" :disabled="_6_qx.indexOf('删除') == -1" @click="toDel(scope.row)" type="text"
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
          :current-page="this._6_1Page"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
    <!-- 创建角色 -->
    <el-dialog
      title="创建角色"
      :visible.sync="addDialogVisible"
      width="1200px"
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
            <el-col :span="7">
              <el-form-item label="名字：" prop="realname">
                <el-input size="small" v-model="addForm.realname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="电话：" prop="mobile">
                <el-row>
                  <el-input
                    size="small"
                    v-model="addForm.mobile"
                    :disabled="!isAdd"
                  ></el-input>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="用户名：" prop="username">
                <el-input
                  size="small"
                  v-model="addForm.username"
                  :disabled="!isAdd"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7" v-if="isAdd">
              <el-form-item label="密码：" prop="userpass">
                <el-input size="small" v-model="addForm.userpass"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7" v-else>
              <el-form-item label="密码：">
                <el-input size="small" v-model="addForm.userpass"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="岗位：" prop="post_id">
                <el-select
                  size="small"
                  v-model="addForm.post_id"
                  filterable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in gwList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="分组：" prop="sele1">
                <el-select
                  size="small"
                  v-model="addForm.groups_id"
                  filterable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in fzList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7">
              <el-form-item label="邮箱：" prop="mail">
                <el-input size="small" v-model="addForm.mail"></el-input>
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
    ...mapState(["headerTit", "_6_1Page", "_6_1PageSize",'_6_qx']),
  },
  watch: {
    _6_1Page: function (page) {
      this.$store.commit("_6_1Page", page);
      this.getData()
    },
    _6_1PageSize: function (pageSize) {
      this.$store.commit("_6_1PageSize", pageSize);
      this.getData()
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
      radio: "",
      addForm: {
        realname: "",
        mobile: "",
        username: "",
        userpass: "",
        post_id: "",
        mail: "",
        groups_id:"",
        // radio1: "",
        // input1: "",
        // radio2: "ky3",
      },
      rules: {
        realname: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入电话", trigger: "blur" }],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        userpass: [{ required: true, message: "请输入密码", trigger: "blur" }],
        post_id: [{ required: true, message: "请选择岗位", trigger: "change" }],
        mail: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
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
      quanxianList: [],
      defaultProps: {
        children: "sub_menu",
        label: "name",
      },
      checkList1: [],
      gwList: [],
      fzList: [],
      id: "",
    };
  },
  created() {
    Array.prototype.remove = function (val) {
      var index = this.indexOf(val);
      if (index > -1) {
        this.splice(index, 1);
      }
    };
    this.getGWdata();
    this.getFZdata();
    setTimeout(() => {
      this.getData();
    }, 500);
  },
  beforeDestroy() {
    if (this.sortable2) {
      this.sortable2.destroy();
    }
  },
  methods: {
    async getData() {
      const res = await this.$api.user_list({
        page: this._6_1Page,
        pagesize: this._6_1PageSize,
      });
      this.tableData = res.list;
      this.total = res.total;
      this.tableData.forEach(async (ele) => {
        // console.log(ele);
        ele.myStatus = ele.is_status == "1" ? true : false;
        ele.qx = "";
        ele.qxArr = ele.limits_ids.split(",");
        ele.newQxArr = ele.limits_ids.split(",");
        if (ele.newQxArr.indexOf("1") != -1) {
          if (
            ele.newQxArr.indexOf("2") != -1 &&
            ele.newQxArr.indexOf("23") != -1
          ) {
            console.log("have 1");
            if (
              ele.newQxArr.indexOf("3") != -1 &&
              ele.newQxArr.indexOf("4") != -1 &&
              ele.newQxArr.indexOf("5") != -1 &&
              ele.newQxArr.indexOf("6") != -1 &&
              ele.newQxArr.indexOf("7") != -1 &&
              ele.newQxArr.indexOf("8") != -1
            ) {
              console.log("have 2");
            } else {
              ele.newQxArr.remove("2");
              ele.newQxArr.remove("1");
            }
            if (
              ele.newQxArr.indexOf("24") != -1 &&
              ele.newQxArr.indexOf("25") != -1 &&
              ele.newQxArr.indexOf("26") != -1 &&
              ele.newQxArr.indexOf("27") != -1 &&
              ele.newQxArr.indexOf("28") != -1 &&
              ele.newQxArr.indexOf("29") != -1
            ) {
              console.log("have 23");
            } else {
              ele.newQxArr.remove("23");
              ele.newQxArr.remove("1");
            }
          } else {
            ele.newQxArr.remove("1");
          }
        }
        if (ele.newQxArr.indexOf("10") != -1) {
          if (
            ele.newQxArr.indexOf("11") != -1 &&
            ele.newQxArr.indexOf("12") != -1 &&
            ele.newQxArr.indexOf("13") != -1 &&
            ele.newQxArr.indexOf("14") != -1 &&
            ele.newQxArr.indexOf("15") != -1 &&
            ele.newQxArr.indexOf("16") != -1 &&
            ele.newQxArr.indexOf("17") != -1 &&
            ele.newQxArr.indexOf("32") != -1 &&
            ele.newQxArr.indexOf("31") != -1
          ) {
            console.log("have 10");
          } else {
            ele.newQxArr.remove("10");
          }
        }
        if (ele.newQxArr.indexOf("19") != -1) {
          if (
            ele.newQxArr.indexOf("20") != -1 &&
            ele.newQxArr.indexOf("21") != -1 &&
            ele.newQxArr.indexOf("22") != -1
          ) {
            console.log("have 19");
          } else {
            ele.newQxArr.remove("19");
          }
        }

        var arr = [];
        this.quanxianList.forEach((ele2) => {
          if (ele.qxArr.indexOf(ele2.id.toString()) != -1) {
            if (ele2.sub_menu.length > 0) {
              ele2.sub_menu.forEach((ele3) => {
                if (ele.qxArr.indexOf(ele3.id.toString()) != -1) {
                  arr.push(`${ele2.name}-${ele3.name}`);
                }
              });
            } else {
              arr.push(ele2.name);
            }
          }
        });
        this.$set(ele, "qx", arr.toString());
      });
    },
    async getGWdata() {
      const res = await this.$api.userpost_list({
        page: 1,
        pagesize: 10000,
      });
      console.log(res);
      this.gwList = res.list;
    },
    async getFZdata() {
      const res = await this.$api.usergroups_list({
        page: 1,
        pagesize: 10000,
      });
      console.log(res);
      this.fzList = res.list;
    },
    async toDel(row) {
      const res = await this.$api.del_users({
        id: row.id,
      });
      if (res.result == 1) {
        this.$message(res.msg);
        this.getData();
      }
    },
    toEdit(row) {
      this.isAdd = false;
      this.id = row.id;
      // this.checkList1 = row.limits.split(",");
      this.addDialogVisible = true;
      this.addForm = { ...row };
      // var arr = [];
      // row.newQxArr.forEach((ele) => {
      //   arr.push(Number(ele));
      // });
      // setTimeout(() => {
      //   console.log(arr, this.$refs);
      //   this.$refs.tree.setCheckedKeys(arr);
      // }, 300);
    },
    // 开关（上架/下架）
    async changeKG(row) {
      console.log(row);
      const res = await this.$api.set_userstatus({
        status: row.myStatus == true ? "1" : "0",
        id: row.id,
      });
      this.$message(res.msg);
      if (res.result == 1) {
        this.getData();
      }
    },
    addKehu() {
      this.isAdd = true;
      for (const key in this.addForm) {
        this.addForm[key] = "";
      }
      this.checkList1 = [];
      this.$refs.tree ? this.$refs.tree.setCheckedKeys([]) : "";
      this.addDialogVisible = true;
    },
    // addDingdan() {
    //   this.isAdd = true;
    //   this.addForm.radio1 = "";
    //   this.addForm.radio2 = "ky3";
    //   this.addForm.input1 = "";
    //   this.addDialogVisible = true;
    // },
    AddOnSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.isAdd) {
            const res = await this.$api.add_users({
              realname: this.addForm.realname,
              mobile: this.addForm.mobile,
              username: this.addForm.username,
              userpass: this.addForm.userpass,
              post_id: this.addForm.post_id,
              groups_id: this.addForm.groups_id,
              mail: this.addForm.mail,
            });
            this.$message(res.msg);
            if (res.result == 1) {
              this.getData();
              this.addDialogVisible = false;
            }
          } else {
            const res = await this.$api.update_users({
              id: this.id,
              realname: this.addForm.realname,
              mobile: this.addForm.mobile,
              username: this.addForm.username,
              userpass: this.addForm.userpass,
              post_id: this.addForm.post_id,
              groups_id: this.addForm.groups_id,
              mail: this.addForm.mail,
            });
            this.$message(res.msg);
            if (res.result == 1) {
              this.getData();
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
      this.$store.commit("_6_1PageSize", val);
    },
    xindingdanHandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("_6_1Page", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.index {
}
/deep/ .vxe-table--body {
  font-size: 12px;
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
  .el-checkbox__label {
    font-size: 12px;
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
