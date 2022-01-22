<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">账号管理</div>
      <div class="tit2">
        <!-- <el-tabs v-model="activeName" @tab-click="tabsHandleClick">
          <el-tab-pane label="全部" name="1"></el-tab-pane>
          <el-tab-pane label="微信公众号" name="2"></el-tab-pane>
          <el-tab-pane label="微信小程序" name="3"></el-tab-pane>
        </el-tabs>-->
      </div>
    </div>
    <div class="nav2">
      <!-- <div class="myForm">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="用户搜索：">
            <div class="search">
              <el-input
                size="small"
                placeholder="请输入内容"
                v-model="formInline.search"
                class="input-with-select"
              >
              </el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button size="small" icon="el-icon-search" type="primary" @click="onSubmit">搜索</el-button>
            <el-button size="small" @click="onReact">重置</el-button>
          </el-form-item>
        </el-form>
      </div>-->
      <div class="tit1">
        <el-button @click="toZhanghao" size="small" type="primary" icon="el-icon-plus">添加账号</el-button>
      </div>
      <div class="myTable">
        <vxe-table height="700" :loading="loading" :data="tableData">
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column field="account" title="用户名"></vxe-table-column>
          <vxe-table-column field="qx" title="权限"></vxe-table-column>
          <!-- <vxe-table-column field="user_info.shop_name" title="店铺名称"></vxe-table-column> -->
          <!-- <vxe-table-column field="user_info.shop_phone" title="店铺联系方式"></vxe-table-column> -->
          <vxe-table-column title="操作状态" width="180">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" @click="seeMingxi(scope.row)" type="text">操作记录</el-button>
                <el-button size="small" @click="tabEdit(scope.row)" type="text">修改</el-button>
                <el-button size="small" @click="tabDel(scope.row)" type="text">删除</el-button>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.ZhanghaobiaoPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
    <!-- 操作记录 -->
    <el-dialog title="操作记录" :visible.sync="dialogVisible" width="80%" :before-close="handleClose">
      <!-- <div class="myForm">
        <el-form ref="mingxiFrom" :model="mingxiFrom" label-width="80px">
          <el-row>
            <el-col :span="20">
              <el-form-item label="状态：">
                <el-radio-group @change="changeMingxiRadio" v-model="mingxiFrom.rad1" size="small">
                  <el-radio-button label="1">资金余额明细</el-radio-button>
                  <el-radio-button label="2">积分明细</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div> -->
      <div class="myTable">
        <vxe-table :data="mingxiTableData">
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column field="admin_name" title="管理员名称"></vxe-table-column>
          <vxe-table-column field="params" title="请求参数"></vxe-table-column>
          <vxe-table-column field="path" title="请求地址"></vxe-table-column>
          <vxe-table-column field="ip" title="ip地址"></vxe-table-column>
          <!-- <vxe-table-column field="mark" width="250" title="备注"></vxe-table-column> -->
          <!-- <vxe-table-column field="pay_way" width="120" title="支付方式"></vxe-table-column> -->
          <vxe-table-column field="add_time" title="操作时间"></vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.zijinmingxiHandleSizeChange"
          @current-change="this.zijinmingxiHandleCurrentChange"
          :current-page="this.zijinmingxiliebiaoPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.mingxiTotal"
        ></el-pagination>
      </div>
    </el-dialog>
    <!-- 添加/编辑账号 -->
    <el-dialog
      title="添加/编辑账号"
      :visible.sync="addDialogVisible"
      width="700px"
      :before-close="addHandleClose"
    >
      <div class="myAddForm">
        <el-form :model="addForm" ref="addForm" label-width="100px" class="demo-addForm">
          <el-row>
            <el-col :span="20">
              <el-form-item label="用户名：">
                <el-input
                  :disabled="!isAdd"
                  size="small"
                  placeholder="请输入用户名"
                  v-model="addForm.account"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="密码：">
                <el-input size="small" v-model="addForm.password"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="权限：">
                <el-checkbox-group v-model="checkedQuanxian">
                  <el-checkbox
                    v-for="item in quanxianList"
                    :label="item.id"
                    :key="item.id"
                  >{{item.title}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item>
                <el-button size="small" type="primary" @click="AddOnSubmit">提交</el-button>
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
    ...mapState(["ZhanghaobiaoPage", "ZhanghaobiaoPageSize",'zijinmingxiliebiaoPage','zijinmingxiliebiaoPageSize'])
  },
  watch: {
    ZhanghaobiaoPage: function(page) {
      this.$store.commit("ZhanghaobiaoPage", page);
      this.getData();
    },
    ZhanghaobiaoPageSize: function(pageSize) {
      this.$store.commit("ZhanghaobiaoPageSize", pageSize);
      this.getData();
    }
  },
  data() {
    return {
      checkedQuanxian: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      id: "",
      loading: false,
      fuquanxuan: false,
      ziCheckList: [],
      isAdd: false,
      checkList: [],
      quanxianList: [],
      addForm: {
        account: "",
        password: ""
      },
      addDialogVisible: false,
      activeName: "1",
      formInline: {
        search: "",
        select: ""
      },
      options: [],
      tableData: [],
      total: 51,
      dialogVisible: false,
      mingxiFrom: {
        rad1: "1"
      },
      mingxiTableData: [],
      mingxiTotal: 0,
      mingxiUser_id: "",
      editDialogVisible: false,
      editForm: {
        level: "",
        pwd: "",
        uniqid: "",
        spread_uid: ""
      },
      editId: ""
    };
  },
  async created() {
    Array.prototype.indexOf = function(val) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {
          return i;
        }
      }
      return -1;
    };
    Array.prototype.remove = function(val) {
      var index = this.indexOf(val);
      if (index > -1) {
        this.splice(index, 1);
      }
    };
    await this.getQXdata();
    this.getData();
  },
  methods: {
    async getQXdata() {
      const res = await this.$api.menu();
      console.log(res);
      this.quanxianList = res.data;
      this.quanxianList = JSON.parse(
        JSON.stringify(this.quanxianList).replace(/name/g, "label")
      );
      this.quanxianList = JSON.parse(
        JSON.stringify(this.quanxianList).replace(/sub_menu/g, "children")
      );
      console.log(this.quanxianList);
    },
    async getData() {
      this.loading = true;
      const res = await this.$api.admin_list({
        limit: this.ZhanghaobiaoPageSize,
        page: this.ZhanghaobiaoPage
      });
      console.log(res.data);
      this.total = res.data.total;
      res.data.data.forEach(ele => {
        ele.qx = [];
        if (ele.rules) {
          var arr = ele.rules.split(",");
          arr.forEach(arrItem => {
            console.log(this.quanxianList);
            this.quanxianList.forEach(qxItem => {
              if (arrItem == qxItem.id) {
                ele.qx.push(qxItem.title);
              }
            });
          });
          console.log(arr);
        }
        console.log(ele.qx.toString());
      });
      setTimeout(() => {
        this.tableData = res.data.data;
        this.loading = false;
      }, 1000);
      console.log(this.tableData);
    },
    addHandleClose() {
      this.addDialogVisible = false;
    },
    toZhanghao() {
      for (const key in this.addForm) {
        this.addForm[key] = "";
      }
      this.checkedQuanxian = [];
      this.isAdd = true;
      this.addDialogVisible = true;
    },
    async submitForm() {
      const res = await this.$api.updat_user_info({
        user_id: this.editId,
        ...this.editForm
      });
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getData();
        this.editDialogVisible = false;
      } else {
        this.$message.error(res.msg);
      }
    },
    // changeMingxiRadio() {
    //   this.getMingxiData();
    // },
    async getMingxiData(){
      const res = await this.$api.admin_log_list({
        admin_id:this.mingxiUser_id
      })
      console.log(res)
      this.mingxiTableData = res.data.data;
      this.mingxiTotal = res.data.total
    },
    tabsHandleClick(tab, event) {
      console.log(tab, event);
    },
    toEdit(row) {
      this.editForm = {
        level: "",
        pwd: "",
        uniqid: "",
        spread_uid: ""
      };
      this.editId = row.user_id;
      this.editDialogVisible = true;
    },
    async seeMingxi(row) {
      console.log(row);
      this.mingxiUser_id = row.id;
      this.getMingxiData();
      this.dialogVisible = true;
    },
    toPingtuanjilu(row) {
      this.$router.push({
        name: "Pingtuanjilu",
        params: {
          userId: row.user_id
        }
      });
    },
    changeFu(e) {
      console.log(e);
    },
    changeZi(check, item) {
      console.log(check, item);
      let checkedCount = check.length;
      item.checkAll = checkedCount == item.sub_menu.length;
      if (item.sub_menu.length == 1) {
        item.isIndeterminate =
          checkedCount > 0 && checkedCount <= item.sub_menu.length;
      } else {
        item.isIndeterminate =
          checkedCount > 0 && checkedCount < item.sub_menu.length;
      }
      console.log(item.checkAll, item.isIndeterminate);
      this.$set(item, "isIndeterminate", item.isIndeterminate);
      this.$set(item, "checkAll", item.checkAll);
    },
    changeZiquanxian(check, item) {
      console.log(check, item);
    },
    changeFuquanxian(check, item) {
      console.log(check, item, "changeFuquanxian");
      var arr = [];
      item.sub_menu.forEach(ele => {
        arr.push(ele.id);
      });
      item.ziCheckList = check ? arr : [];
      this.$set(item, "isIndeterminate", false);
      this.$set(item, "checkAll", check);
    },
    async tabDel(row) {
      //  manage_del
      const res = await this.$api.delete_admin({
        admin_id:row.id
      });
      if (res) {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.getData();
        this.addDialogVisible = false;
      } else {
        this.$message.error(res.msg);
        this.getData();
      }
    },
    async tabEdit(row) {
      this.id = row.id;
      this.isAdd = false;
      console.log(row);
      this.addForm.account = row.account;
      if (row.rules) {
        this.checkedQuanxian = row.rules.split(",");
      } else {
        this.checkedQuanxian = [];
      }
      this.addDialogVisible = true;
    },
    async AddOnSubmit() {
      console.log(this.checkedQuanxian);
      if (this.isAdd) {
        // 添加
        const res = await this.$api.add_admin({
          ...this.addForm,
          rules: this.checkedQuanxian.toString(),
        });
        console.log(res);
        if (res) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.getData();
          this.addDialogVisible = false;
        } else {
          this.$message.error(res.msg);
          this.getData();
        }
      } else {
        const res = await this.$api.update_admin(
          {
            ...this.addForm,
            admin_id: this.id,
            rules: this.checkedQuanxian.toString()
          }
          // this.id
        );
        console.log(res);
        if (res) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.getData();
          this.addDialogVisible = false;
        } else {
          this.$message.error(res.msg);
          this.getData();
        }
      }
    },
    onSubmit() {
      console.log(this.formInline);
      this.getData();
    },
    onReact() {
      this.formInline.search = "";
      this.formInline.select = "";
      this.getData();
    },
    handleClose() {
      this.dialogVisible = false;
    },
    editHandleClose() {
      this.editDialogVisible = false;
    },
    formatDate(date1) {
      var date = new Date(date1);
      var YY = date.getFullYear() + "-";
      var MM =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hh =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var mm =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var ss =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return YY + MM + DD + " " + hh + mm + ss;
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("ZhanghaobiaoPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("ZhanghaobiaoPage", val);
    },
    zijinmingxiHandleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("zijinmingxiliebiaoPageSize", val);
    },
    zijinmingxiHandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("zijinmingxiliebiaoPage", val);
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-tree-node__label {
  font-size: 12px;
}
/deep/ .el-checkbox {
  transform: translateY(-1px);
}
/deep/ .el-checkbox__label {
  font-size: 12px;
}
.index {
}
.nav1 {
  margin: 0 -18px;
  background-color: #fff;
  padding: 20px 32px 0 40px;
  .tit1 {
    color: #17233d;
    font-weight: 500;
    font-size: 20px;
    padding-bottom: 20px;
  }
  .tit2 {
    margin-top: 10px;
    /deep/ .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
      padding-left: 20px;
    }
    /deep/ .el-tabs__header {
      margin: 0 0 1px;
    }
  }
}
.nav2 {
  margin: 18px 0;
  background: #fff;
  border-radius: 6px;
  padding: 24px;
  .myForm {
    /deep/ .el-form-item__label {
      font-size: 12px;
    }
    /deep/ .el-form-item {
      margin-right: 30px;
      margin-bottom: 0;
      vertical-align: text-top;
    }
    .search {
      /deep/ .el-select {
        width: 100px;
      }
    }
  }
  .tit1 {
    margin-top: 10px;
  }
  .myTable {
    margin-top: 10px;
    .xiala {
      padding: 10px 20px;
      .item {
        font-size: 12px;
        display: flex;
      }
    }
    .flex {
      display: flex;
      align-items: center;
    }
    .fenye {
      margin-top: 10px;
    }
    /deep/ .vxe-table--render-default .vxe-body--column {
      line-height: 14px;
      vertical-align: middle;
    }
    /deep/ .vxe-cell--label {
      font-size: 12px;
    }
    /deep/ .vxe-cell--title {
      font-size: 12px;
    }
    /deep/ .image-slot {
      width: 38px;
      height: 38px;
      border: 1px solid #ddd;
      line-height: 38px;
      text-align: center;
      border-radius: 4px;
    }
  }
}
.myForm {
  /deep/ .el-form-item__label {
    font-size: 12px;
  }
  /deep/ .el-form-item {
    margin-right: 30px;
    margin-bottom: 0;
    vertical-align: middle;
  }
}
.myTable {
  margin-top: 10px;
  .xiala {
    padding: 10px 20px;
    .item {
      font-size: 12px;
      display: flex;
      // align-items: center;
    }
  }
  .flex {
    display: flex;
    align-items: center;
  }
  .fenye {
    margin-top: 10px;
  }
  /deep/ .vxe-table--render-default .vxe-body--column {
    line-height: 14px;
    vertical-align: middle;
  }
  /deep/ .vxe-cell--label {
    font-size: 12px;
  }
  /deep/ .vxe-cell--title {
    font-size: 12px;
  }
  /deep/ .image-slot {
    width: 38px;
    height: 38px;
    border: 1px solid #ddd;
    line-height: 38px;
    text-align: center;
    border-radius: 4px;
  }
}
.editForm {
  /deep/ .el-form-item__label {
    font-size: 12px;
  }
  /deep/ .el-form-item {
    margin-right: 30px;
    margin-bottom: 20px;
  }
  .search {
    margin-top: 3px;
    /deep/ .el-select {
      width: 100px;
    }
  }
}
.myAddForm {
  /deep/ .el-select {
    width: 100%;
  }
  /deep/ .el-form-item__label {
    font-size: 12px;
    width: 130px !important;
  }
  /deep/ .el-form-item__content {
    margin-left: 130px !important;
  }
  /deep/ .el-radio__label {
    font-size: 12px;
  }
  /deep/ .el-button {
    width: 100%;
  }
  .myImg {
    position: relative;
    width: 60px;
    height: 60px;
    display: inline-block;
    margin-right: 12px;
    .closeBtn {
      position: absolute;
      top: -6px;
      right: -4px;
      width: 20px;
      height: 20px;
      .el-button {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    /deep/ .image-slot {
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: #fafafa;
      width: 58px;
      height: 58px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .el-icon-picture-outline {
        font-size: 20px;
      }
    }
  }
}
</style>