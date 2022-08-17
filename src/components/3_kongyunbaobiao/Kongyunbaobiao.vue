<template>
  <div class="index">
    <div class="top">
      <div class="top1">
        <el-form
          :model="addForm"
          ref="addForm"
          label-width="130px"
          class="demo-addForm"
        >
          <el-row>
            <el-col :span="5">
              <el-form-item label="工作号：">
                <el-row>
                  <el-input size="small" v-model="addForm.input1"></el-input>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="委托单位：">
                <el-select
                  filterable
                  size="small"
                  v-model="addForm.sele2"
                  placeholder="请选择"
                >
                  <el-option label="中国-CN-China" value="China">
                    <div style="display: flex; justify-content: space-between">
                      <span>中国</span>
                      <span style="color: #8492a6; font-size: 13px">CN</span>
                      <span style="color: #8492a6; font-size: 13px">China</span>
                    </div>
                  </el-option>
                  <el-option label="美国-USA-America" value="America">
                    <div style="display: flex; justify-content: space-between">
                      <span>美国</span>
                      <span style="color: #8492a6; font-size: 13px">USA</span>
                      <span style="color: #8492a6; font-size: 13px"
                        >America</span
                      >
                    </div>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="分单号：">
                <el-input size="small" v-model="addForm.input3"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="总单号：">
                <el-input size="small" v-model="addForm.input3"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="起运港：">
                <el-row>
                  <el-select
                    filterable
                    size="small"
                    v-model="addForm.sele2"
                    placeholder="请选择"
                  >
                    <el-option label="中国-CN-China" value="China">
                      <div
                        style="display: flex; justify-content: space-between"
                      >
                        <span>中国</span>
                        <span style="color: #8492a6; font-size: 13px">CN</span>
                        <span style="color: #8492a6; font-size: 13px"
                          >China</span
                        >
                      </div>
                    </el-option>
                    <el-option label="美国-USA-America" value="America">
                      <div
                        style="display: flex; justify-content: space-between"
                      >
                        <span>美国</span>
                        <span style="color: #8492a6; font-size: 13px">USA</span>
                        <span style="color: #8492a6; font-size: 13px"
                          >America</span
                        >
                      </div>
                    </el-option>
                  </el-select>
                  <el-input
                    style="width: inherit; margin-left: 10px"
                    size="small"
                    v-model="addForm.input2"
                  ></el-input>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="航空公司：">
                <el-select
                  filterable
                  size="small"
                  v-model="addForm.sele2"
                  placeholder="请选择"
                >
                  <el-option label="中国-CN-China" value="China">
                    <div style="display: flex; justify-content: space-between">
                      <span>中国</span>
                      <span style="color: #8492a6; font-size: 13px">CN</span>
                      <span style="color: #8492a6; font-size: 13px">China</span>
                    </div>
                  </el-option>
                  <el-option label="美国-USA-America" value="America">
                    <div style="display: flex; justify-content: space-between">
                      <span>美国</span>
                      <span style="color: #8492a6; font-size: 13px">USA</span>
                      <span style="color: #8492a6; font-size: 13px"
                        >America</span
                      >
                    </div>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="目的港：">
                <el-select
                  filterable
                  size="small"
                  v-model="addForm.sele2"
                  placeholder="请选择"
                >
                  <el-option label="中国-CN-China" value="China">
                    <div style="display: flex; justify-content: space-between">
                      <span>中国</span>
                      <span style="color: #8492a6; font-size: 13px">CN</span>
                      <span style="color: #8492a6; font-size: 13px">China</span>
                    </div>
                  </el-option>
                  <el-option label="美国-USA-America" value="America">
                    <div style="display: flex; justify-content: space-between">
                      <span>美国</span>
                      <span style="color: #8492a6; font-size: 13px">USA</span>
                      <span style="color: #8492a6; font-size: 13px"
                        >America</span
                      >
                    </div>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <el-form-item label="客服：">
                <el-select
                  filterable
                  size="small"
                  v-model="addForm.sele2"
                  placeholder="请选择"
                >
                  <el-option label="中国-CN-China" value="China"></el-option>
                  <el-option
                    label="美国-USA-America"
                    value="America"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="操作员：">
                <el-select
                  filterable
                  size="small"
                  v-model="addForm.sele2"
                  placeholder="请选择"
                >
                  <el-option label="中国-CN-China" value="China"></el-option>
                  <el-option
                    label="美国-USA-America"
                    value="America"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="业务员：">
                <el-select
                  filterable
                  size="small"
                  v-model="addForm.sele2"
                  placeholder="请选择"
                >
                  <el-option label="中国-CN-China" value="China"></el-option>
                  <el-option
                    label="美国-USA-America"
                    value="America"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="代理：">
                <el-select
                  filterable
                  size="small"
                  v-model="addForm.sele2"
                  placeholder="请选择"
                >
                  <el-option label="中国-CN-China" value="China">
                    <div style="display: flex; justify-content: space-between">
                      <span>中国</span>
                      <span style="color: #8492a6; font-size: 13px">CN</span>
                      <span style="color: #8492a6; font-size: 13px">China</span>
                    </div>
                  </el-option>
                  <el-option label="美国-USA-America" value="America">
                    <div style="display: flex; justify-content: space-between">
                      <span>美国</span>
                      <span style="color: #8492a6; font-size: 13px">USA</span>
                      <span style="color: #8492a6; font-size: 13px"
                        >America</span
                      >
                    </div>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="heng"></div>
          <el-row>
            <el-col :span="10">
              <el-form-item label="货到日期：">
                <el-date-picker
                  size="small"
                  v-model="addForm.time1"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="操作状态：">
                <el-select
                  filterable
                  size="small"
                  v-model="addForm.sele2"
                  placeholder="请选择"
                >
                  <el-option label="中国-CN-China" value="China"></el-option>
                  <el-option
                    label="美国-USA-America"
                    value="America"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item>
                <el-button size="small" type="primary" @click="AddOnSubmit"
                  >搜索</el-button
                >
                <el-button size="small" @click="reset">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
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
          <vxe-table-column field="id" title="工作号"></vxe-table-column>
          <vxe-table-column
            field="admin_name"
            title="委托单位"
          ></vxe-table-column>
          <vxe-table-column field="params" title="业务员"></vxe-table-column>
          <vxe-table-column field="path" title="起运港"></vxe-table-column>
          <vxe-table-column field="ip" title="开航时间"></vxe-table-column>
          <vxe-table-column field="ip" title="目的时间"></vxe-table-column>
          <vxe-table-column field="ip" title="分单号"></vxe-table-column>
          <vxe-table-column field="ip" title="总单号"></vxe-table-column>
          <vxe-table-column field="ip" title="操作说明"></vxe-table-column>
          <vxe-table-column field="ip" title="定代理仓"></vxe-table-column>
          <vxe-table-column field="ip" title="计费重量"></vxe-table-column>
          <vxe-table-column field="ip" title="货到日期"></vxe-table-column>
          <vxe-table-column field="ip" title="委托单位简称"></vxe-table-column>
          <vxe-table-column field="ip" title="报关方式"></vxe-table-column>
          <vxe-table-column field="add_time" title="客服"></vxe-table-column>
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
    <!-- 创建汇率 -->
    <el-dialog
      title="创建汇率"
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
              <el-form-item label="币种代码：">
                <el-row>
                  <el-input size="small" v-model="addForm.input1"></el-input>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="币种名称：">
                <el-input size="small" v-model="addForm.input2"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="符号：">
                <el-input size="small" v-model="addForm.input3"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="本位币标记：">
                <el-switch
                  size="small"
                  v-model="addForm.swi1"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                ></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="参与统计分析：">
                <el-switch
                  size="small"
                  v-model="addForm.swi2"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                ></el-switch>
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
    ...mapState(["headerTit", "xindingdanPage", "xindingdanPageSize"]),
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
        input1: "",
        input2: "",
        input3: "",
        swi1: false,
        swi2: true,
      },
      addDialogVisible: false,
    };
  },
  created() {},
  beforeDestroy() {
    if (this.sortable2) {
      this.sortable2.destroy();
    }
  },
  methods: {
    addDingdan() {
      this.isAdd = true;
      this.addForm.radio1 = "";
      this.addForm.radio2 = "ky3";
      this.addForm.input1 = "";
      this.addDialogVisible = true;
    },
    tabEdit(row) {
      console.log(row);
    },
    tabDel(row) {
      console.log(row);
    },
    AddOnSubmit() {
      console.log(this.addForm);
    },
    reset() {},
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
  margin: 20px;
  padding: 30px 16px 16px 16px;
  border-radius: 10px;
  .heng {
    height: 1px;
    width: 100%;
    background: #ddd;
    margin-bottom: 20px;
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
