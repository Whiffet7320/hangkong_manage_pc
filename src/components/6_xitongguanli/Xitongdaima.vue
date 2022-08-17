<template>
  <div class="index">
    <div class="top">
      <div class="t-tit1" v-html="headerTit"></div>
    </div>
    <div class="left_menu">
      <el-menu
        :default-active="menuActiveIndex"
        class="el-menu-vertical-demo"
        background-color="#fff"
        text-color="#909399"
      >
        <el-menu-item index="6-5-1">
          <span slot="title">系统代码1</span>
        </el-menu-item>
        <el-menu-item index="6-5-2">
          <span slot="title">系统代码2</span>
        </el-menu-item>
        <el-menu-item index="6-5-3">
          <span slot="title">系统代码3</span>
        </el-menu-item>
        <el-menu-item v-for="item in 20" :key="item" index="6-5-4">
          <span slot="title">系统代码4</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 分组设置 -->
    <el-dialog
      title="分组设置"
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
        >
          <el-row>
            <el-col :span="20">
              <el-form-item label="分组名称：" prop="name">
                <el-input
                  size="small"
                  placeholder="限1-6个字内"
                  v-model="addForm.name"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="分组人员：">
                <el-checkbox-group v-model="checkList1">
                  <el-row>
                    <el-col v-for="(item, i) in userList" :key="i" :span="4">
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
    ...mapState(["headerTit", "_6_3Page", "_6_3PageSize"]),
  },
  watch: {
    _6_3Page: function (page) {
      this.$store.commit("_6_3Page", page);
      //   this.getData();
    },
    _6_3PageSize: function (pageSize) {
      this.$store.commit("_6_3PageSize", pageSize);
      //   this.getData();
    },
  },
  data() {
    return {
      menuActiveIndex: "",
      addDialogVisible:false,
      addForm:{}
    };
  },
  created() {
  },
  methods: {
    async getFZData() {
      const res = await this.$api.usergroups_list({
        page: this._6_3Page,
        pagesize: this._6_3PageSize,
      });
      this.tableData = res.list;
      this.total = res.total;
      this.tableData.forEach((ele) => {
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
      this.addForm.name = "";
      this.checkList1 = [];
      this.addDialogVisible = true;
    },
    // addDingdan() {
    //   this.isAdd = true;
    //   this.addForm.radio1 = "";
    //   this.addForm.radio2 = "ky3";
    //   this.addForm.input1 = "";
    //   this.addDialogVisible = true;
    // },
    toEdit(row) {
      this.id = row.id;
      this.addForm.name = row.name;
      this.checkList1 = row.ryId;
      this.addDialogVisible = true;
    },
    async toDel(row) {
      const res = await this.$api.del_usergroups({ id: row.id });
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
            const res = await this.$api.add_usergroups({
              name: this.addForm.name,
              userids: this.checkList1.toString(),
            });
            this.$message(res.msg);
            if (res.result == 1) {
              this.getFZData();
              this.addDialogVisible = false;
            }
          } else {
            const res = await this.$api.update_usergroups({
              id: this.id,
              name: this.addForm.name,
              userids: this.checkList1.toString(),
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
      this.$store.commit("_6_3PageSize", val);
    },
    xindingdanHandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("_6_3Page", val);
    },
  },
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
width:8px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
-webkit-box-shadow:inset006pxrgba(0,0,0,0.3);
border-radius:10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
border-radius:10px;
background:rgba(0,0,0,0.1);
-webkit-box-shadow:inset006pxrgba(0,0,0,0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
background:#999999;
}
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
.left_menu{
  box-shadow: 0 0 16px 0px #eee;
  width: 120px;
  height: calc(100vh - 148px);
  overflow-y: scroll;
  /deep/ .el-menu-item{
    height: 40px;
    line-height: 40px;
    font-size: 12px;
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
