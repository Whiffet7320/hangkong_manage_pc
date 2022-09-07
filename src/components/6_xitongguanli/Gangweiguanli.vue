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
            field="name"
            title="岗位"
          ></vxe-table-column>
          <vxe-table-column field="ry" title="人员"></vxe-table-column>
          <vxe-table-column title="操作状态" width="120">
            <template slot-scope="scope">
              <div class="flex">
                <el-button :disabled="_6_qx.indexOf('修改') == -1" size="small" @click="toEdit(scope.row)" type="text"
                  >编辑</el-button
                >
                <el-button
                  size="small"
                  :disabled="scope.row.is_sys == 1"
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
          :current-page="this._6_2Page"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
    <!-- 创建岗位 -->
    <el-dialog
      title="创建岗位"
      :visible.sync="addDialogVisible"
      width="1300px"
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
              <el-form-item label="岗位名称：" prop="name">
                <el-input
                  :disabled="addForm.is_sys == 1"
                  size="small"
                  placeholder="限1-6个字内"
                  v-model="addForm.name"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="岗位人员：">
                <el-checkbox-group v-model="checkList2">
                  <el-row>
                    <el-col v-for="(item, i) in userList" :key="i" :span="3">
                      <el-checkbox :label="item.id">{{
                        item.realname
                      }}</el-checkbox>
                    </el-col>
                  </el-row>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="权限：">
                <el-tree
                  default-expand-all
                  :data="quanxianList"
                  ref="tree"
                  show-checkbox
                  node-key="id"
                  :props="defaultProps"
                >
                  <span class="custom-tree-node" slot-scope="{ node, data }">
                    <div class="tree_flex">
                      <span>{{ node.label }}</span>
                      <div class="tree_nav" v-if="data.button">
                        <div class="txt">操作权限</div>
                        <el-checkbox-group
                          v-if="data.is_radio == 0"
                          v-model="checkList1"
                        >
                          <el-checkbox
                            v-for="(item, i) in data.button"
                            :key="i"
                            :label="item"
                            >{{ item.split("_")[1] }}</el-checkbox
                          >
                        </el-checkbox-group>
                        <el-radio-group v-else v-model="data.btnRadio1">
                          <el-radio
                            v-for="(item, i) in data.button"
                            :key="i"
                            :label="item"
                            >{{ item.split("_")[1] }}</el-radio
                          >
                        </el-radio-group>
                      </div>
                    </div>

                    <!-- <span>
                      <el-button
                        type="text"
                        size="mini"
                        @click="() => append(data)"
                      >
                        Append
                      </el-button>
                      <el-button
                        type="text"
                        size="mini"
                        @click="() => remove(node, data)"
                      >
                        Delete
                      </el-button>
                    </span> -->
                  </span>
                </el-tree>
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
    ...mapState(["headerTit", "_6_2Page", "_6_2PageSize",'_6_qx']),
  },
  watch: {
    _6_2Page: function (page) {
      this.$store.commit("_6_2Page", page);
      //   this.getData();
    },
    _6_2PageSize: function (pageSize) {
      this.$store.commit("_6_2PageSize", pageSize);
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
      radio: "",
      addForm: {
        name: "",
        is_sys:'',
      },
      rules: {
        name: [{ required: true, message: "请输入工作号", trigger: "blur" }],
      },
      addDialogVisible: false,
      // quanxianList: [],
      quanxianList: [],
      defaultProps: {
        children: "sub_menu",
        label: "name",
      },
      radio1: "",
      radioList: [],
      radioListIndex: [],
      checkList1: [],
      checkList2: [],
      userList: [],
    };
  },
  created() {
    this.getQXdata();
    this.getUserData();
    this.getData();
  },
  beforeDestroy() {
    if (this.sortable2) {
      this.sortable2.destroy();
    }
  },
  methods: {
    async getQXdata() {
      const res = await this.$api.user_menu();
      console.log(res);
      this.quanxianList = res.list;
      // this.quanxianList.forEach((ele) => {
      //   if (ele.button) {
      //     ele.btnRadio1 = "";
      //   }
      // });
      console.log(this.quanxianList);
    },
    async getData() {
      const res = await this.$api.userpost_list({
        page: this._6_2Page,
        pagesize: this._6_2PageSize,
      });
      console.log(res);
      this.tableData = res.list;
      this.total = res.total;
      this.tableData.forEach(async (ele) => {
        ele.myStatus = ele.is_status == "1" ? true : false;
        ele.qx = "";
        ele.qxArr = [...new Set(ele.limits_ids.split(","))];
        ele.newQxArr = [...new Set(ele.limits_ids.split(","))];
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
        ele.ry = [];
        ele.ryId = [];
        ele.users.forEach((ele2) => {
          ele.ry.push(ele2.realname);
          ele.ryId.push(ele2.id);
        });
        ele.ry = ele.ry.toString();
      });
      console.log(this.tableData);
    },
    async getUserData() {
      const res = await this.$api.user_list({
        page: 1,
        pagesize: 1000,
      });
      console.log(res);
      this.userList = res.list;
    },
    addKehu() {
      this.isAdd = true;
      this.addForm.name = "";
      this.addForm.is_sys = '';
      this.checkList1 = [];
      this.addDialogVisible = true;
    },
    // addDingdan() {
    //   this.isAdd = true;
    //   this.addForm.radio1 = "";
    //   this.addForm.radio2 = "ky3";
    //   this.addForm.name = "";
    //   this.addDialogVisible = true;
    // },
    toEdit(row) {
      console.log(row);
      if (row.limits.indexOf("1_") != -1) {
        this.$set(
          this.quanxianList[0],
          "btnRadio1",
          `1_${row.menu_limits[0].button[0]}`
        );
      } else {
        this.$set(this.quanxianList[0], "btnRadio1", ``);
      }
      if (row.limits.indexOf("9_") != -1) {
        this.$set(
          this.quanxianList[2],
          "btnRadio1",
          `9_${row.menu_limits[1].button[0]}`
        );
      } else {
        this.$set(this.quanxianList[2], "btnRadio1", ``);
      }
      if (row.limits.indexOf("18_") != -1) {
        this.$set(
          this.quanxianList[3],
          "btnRadio1",
          `18_${row.menu_limits[2].button[0]}`
        );
      } else {
        this.$set(this.quanxianList[3], "btnRadio1", ``);
      }
      console.log(this.quanxianList);
      this.addForm.name = row.name;
      this.addForm.is_sys = row.is_sys;
      this.checkList2 = row.ryId;
      this.isAdd = false;
      this.id = row.id;
      this.checkList1 = [...new Set(row.limits.split(","))];
      this.addDialogVisible = true;
      this.addForm = { ...row };
      var arr = [];
      row.newQxArr.forEach((ele) => {
        arr.push(Number(ele));
      });
      setTimeout(() => {
        console.log(arr, this.$refs);
        this.$refs.tree.setCheckedKeys(arr);
      }, 300);
    },
    async toDel(row) {
      const res = await this.$api.del_userpost({ id: row.id });
      this.$message(res.msg);
      if (res.result == 1) {
        this.getData();
      }
    },
    // AddOnSubmit(formName) {
    //   console.log(this.addForm);
    //   this.$refs[formName].validate(async (valid) => {
    //     if (valid) {
    //       if (this.isAdd) {
    //         const res = await this.$api.add_userpost({
    //           name: this.addForm.name,
    //           userids: this.checkList1.toString(),
    //         });
    //         this.$message(res.msg);
    //         if (res.result == 1) {
    //           this.getData();
    //           this.addDialogVisible = false;
    //         }
    //       } else {
    //         const res = await this.$api.update_userpost({
    //           id: this.id,
    //           name: this.addForm.name,
    //           userids: this.checkList1.toString(),
    //         });
    //         this.$message(res.msg);
    //         if (res.result == 1) {
    //           this.getData();
    //           this.addDialogVisible = false;
    //         }
    //       }
    //     }
    //   });
    // },
    AddOnSubmit(formName) {
      console.log(this.addForm, this.quanxianList, this.checkList1);
      var radioList = [];
      this.quanxianList.forEach((ele) => {
        if (ele.btnRadio1) {
          radioList.push(ele.btnRadio1);
        }
      });
      if (
        this.checkList1.toString().indexOf("1_") != -1 &&
        radioList.toString().indexOf("1_") != -1
      ) {
        console.log();
        this.checkList1.forEach((ele, i) => {
          if (ele.indexOf("1_") != -1) {
            this.checkList1.splice(i, 1);
          }
        });
      }
      if (
        this.checkList1.toString().indexOf("9_") != -1 &&
        radioList.toString().indexOf("9_") != -1
      ) {
        console.log();
        this.checkList1.forEach((ele, i) => {
          if (ele.indexOf("9_") != -1) {
            this.checkList1.splice(i, 1);
          }
        });
      }
      if (
        this.checkList1.toString().indexOf("18_") != -1 &&
        radioList.toString().indexOf("18_") != -1
      ) {
        console.log();
        this.checkList1.forEach((ele, i) => {
          if (ele.indexOf("18_") != -1) {
            this.checkList1.splice(i, 1);
          }
        });
      }
      console.log(radioList);
      var arr = [];
      arr = [
        ...this.$refs.tree.getCheckedKeys(false),
        ...this.$refs.tree.getHalfCheckedKeys(true),
      ];
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.isAdd) {
            const res = await this.$api.add_userpost({
              name: this.addForm.name,
              userids: this.checkList2.toString(),
              limit_ids: [...new Set(arr)].toString(),
              // limits: [...this.checkList1, ...radioList].toString(),
              limits: [
                ...new Set([...this.checkList1, ...radioList]),
              ].toString(),
            });
            if (res.result == 1) {
              this.$message(res.msg);
              this.getData();
              this.addDialogVisible = false;
            }
          } else {
            const res = await this.$api.update_userpost({
              id: this.id,
              name: this.addForm.name,
              userids: this.checkList2.toString(),
              limit_ids: [...new Set(arr)].toString(),
              limits: [
                ...new Set([...this.checkList1, ...radioList]),
              ].toString(),
            });
            if (res.result == 1) {
              this.$message(res.msg);
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
      this.$store.commit("_6_2PageSize", val);
    },
    xindingdanHandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("_6_2Page", val);
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
// /deep/ .el-checkbox-group {
//   display: flex !important;
//   align-items: center;
//   .el-col-4 {
//     width: 50%;
//   }
//   .el-checkbox__label {
//     font-size: 12px;
//     margin-right: 8px;
//   }
// }
/deep/ .el-radio-group {
  .el-radio__label {
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
