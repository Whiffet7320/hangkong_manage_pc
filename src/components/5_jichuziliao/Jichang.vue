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
            <el-button @click="search" slot="append" icon="el-icon-search"
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
        <div class="tt2-right">
          <el-button @click="addDingdan" type="success">创建机场</el-button>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column
            field="three_charcode"
            title="三字码"
          ></vxe-table-column>
          <vxe-table-column
            field="basic"
            title="基本"
          ></vxe-table-column>
          <vxe-table-column field="area_code" title="地区码"></vxe-table-column>
          <vxe-table-column
            field="numeric_code"
            title="数字码"
          ></vxe-table-column>
          <vxe-table-column
            field="english_name"
            title="英文名"
          ></vxe-table-column>
          <vxe-table-column field="chinese_name" title="中文名"></vxe-table-column>
          <vxe-table-column field="area" title="所属区域"></vxe-table-column>
          <vxe-table-column field="country_id" title="国家"></vxe-table-column>
          <vxe-table-column field="province" title="省份"></vxe-table-column>
          <vxe-table-column title="操作状态" width="120">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" @click="tabEdit(scope.row)" type="text"
                  >编辑</el-button
                >
                <el-button size="small" @click="tabDel(scope.row)" type="text"
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
          :current-page="this._5_7Page"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
    <!-- 创建机场 -->
    <el-dialog
      title="创建机场"
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
              <el-form-item label="三字码：">
                <el-input
                  size="small"
                  v-model="addForm.three_charcode"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="基本：">
                <el-input size="small" v-model="addForm.basic"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="地区码：">
                <el-input size="small" v-model="addForm.area_code"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="数字码：">
                <el-input
                  size="small"
                  v-model="addForm.numeric_code"
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
              <el-form-item label="所属区域：">
                <el-select
                  size="small"
                  v-model="addForm.area"
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
              <el-form-item label="国家：">
                <el-select
                  filterable
                  size="small"
                  v-model="addForm.country_id"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in gjList"
                    :key="item.id"
                    :label="`${item.english_name}-${item.chinese_name}`"
                    :value="item.id"
                  >
                    <div style="display: flex; justify-content: space-between">
                      <span style="color: #8492a6; font-size: 13px">{{item.english_name}}</span>
                      <span style="color: #8492a6; font-size: 13px">{{item.chinese_name}}</span>
                    </div>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="省份：">
                <el-input size="small" v-model="addForm.province"></el-input>
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
    ...mapState(["headerTit", "_5_7Page", "_5_7PageSize"]),
  },
  watch: {
    _5_7Page: function (page) {
      this.$store.commit("_5_7Page", page);
        this.getData();
    },
    _5_7PageSize: function (pageSize) {
      this.$store.commit("_5_7PageSize", pageSize);
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
        three_charcode: "",
        basic: "",
        area_code: "",
        numeric_code: "",
        english_name: "",
        chinese_name: "",
        area: "",
        country_id: "",
        province: "",
      },
      addDialogVisible: false,
      id: "",
      bzList: [],
      gjList: [],
    };
  },
  created() {
    this.getData();
    this.getBZData();
    this.getGJData();
  },
  methods: {
    async getGJData() {
      const res = await this.$api.country_list({
        page: 1,
        pagesize: 1000,
      });
      this.gjList = res.list;
    },
    async getData() {
      const res = await this.$api.list_airport({
        page: this._5_7Page,
        pagesize: this._5_7PageSize,
        keyword: this.keyword,
      });
      this.tableData = res.list;
      // this.tableData.forEach((ele) => {
      //   ele.time = `${ele.effective_time} - ${ele.expiration_date}`;
      // });
      this.total = res.total;
    },
    async getBZData() {
      const res = await this.$api.currency_list({
        page: 1,
        pagesize: 1000,
      });
      this.bzList = res.list;
    },
    search() {
      this.getData();
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
      const res = await this.$api.del_airport({ id: row.id });
      this.$message(res.msg);
      if (res.result == 1) {
        this.getData();
      }
    },
    async AddOnSubmit() {
      if (this.isAdd) {
        const res = await this.$api.create_airport({
          ...this.addForm,
        });
        console.log(res);
        this.$message(res.msg);
        if (res.result == 1) {
          this.getData();
          this.addDialogVisible = false;
        }
      } else {
        const res = await this.$api.update_airport({
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
      this.$store.commit("_5_7PageSize", val);
    },
    xindingdanHandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("_5_7Page", val);
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
