<template>
  <div class="index">
    <div class="top">
      <div class="t-tit1" v-html="headerTit"></div>
    </div>
    <div class="content">
      <div class="nav1 nav2">
        <div class="n-tit1">联系方式</div>
        <div class="box">
          <el-form
            style="margin-top: 16px"
            :model="addForm"
            ref="addForm"
            label-width="130px"
            class="demo-addForm"
          >
            <el-row>
              <el-col :span="6">
                <el-form-item label="起运港：">
                  <el-select
                    filterable
                    size="small"
                    v-model="addForm.port_departureid"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in JCList"
                      :key="item.id"
                      :label="`${item.three_charcode}-${item.province}`"
                      :value="item.id"
                    >
                      <div
                        style="display: flex; justify-content: space-between"
                      >
                        <span style="color: #8492a6; font-size: 13px">{{
                          item.three_charcode
                        }}</span>
                        <span style="color: #8492a6; font-size: 13px">{{
                          item.province
                        }}</span>
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
                    v-model="addForm.port_destinationid"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in JCList"
                      :key="item.id"
                      :label="`${item.three_charcode}-${item.province}`"
                      :value="item.id"
                    >
                      <div
                        style="display: flex; justify-content: space-between"
                      >
                        <span style="color: #8492a6; font-size: 13px">{{
                          item.three_charcode
                        }}</span>
                        <span style="color: #8492a6; font-size: 13px">{{
                          item.province
                        }}</span>
                      </div>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="航空公司：">
                  <el-select
                    filterable
                    size="small"
                    v-model="addForm.airline_companyid"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in JCList"
                      :key="item.id"
                      :label="`${item.english_name}-${item.chinese_name}`"
                      :value="item.id"
                    >
                      <div
                        style="display: flex; justify-content: space-between"
                      >
                        <span style="color: #8492a6; font-size: 13px">{{
                          item.english_name
                        }}</span>
                        <span style="color: #8492a6; font-size: 13px">{{
                          item.chinese_name
                        }}</span>
                      </div>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="航班号：">
                  <el-input
                    size="small"
                    v-model="addForm.flight_number"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="机型：">
                  <el-input size="small" v-model="addForm.model"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="中转港：">
                  <el-select
                    filterable
                    size="small"
                    v-model="addForm.transit_portid"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in JCList"
                      :key="item.id"
                      :label="`${item.three_charcode}-${item.province}`"
                      :value="item.id"
                    >
                      <div
                        style="display: flex; justify-content: space-between"
                      >
                        <span style="color: #8492a6; font-size: 13px">{{
                          item.three_charcode
                        }}</span>
                        <span style="color: #8492a6; font-size: 13px">{{
                          item.province
                        }}</span>
                      </div>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="时效：">
                  <el-row style="display: flex">
                    <el-input
                      style="width: 80px; margin-right: 12px"
                      size="small"
                      v-model="addForm.prescription_daynum"
                    ></el-input>
                    天
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="接散货：">
                  <el-radio-group v-model="addForm.receiving_bulkcargo">
                    <el-radio :label="1">允许</el-radio>
                    <el-radio :label="0">不允许</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="接托盘：">
                  <el-radio-group v-model="addForm.receive_tray">
                    <el-radio :label="1">允许</el-radio>
                    <el-radio :label="0">不允许</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="模式：">
                  <el-radio-group v-model="addForm.pattern">
                    <el-radio :label="1">直飞</el-radio>
                    <el-radio :label="2">中转</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="普货政策：">
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="addForm.general_cargopolicy"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="nav1 nav2">
        <div class="n-tit1">航班</div>
        <div class="box">
          <el-form
            style="margin-top: 16px"
            :model="addForm"
            ref="addForm"
            label-width="130px"
            class="demo-addForm"
          >
            <el-row>
              <el-col :span="20">
                <el-form-item label="班期：">
                  <el-radio-group
                    @change="addForm2.flight_date = []"
                    v-model="addForm2.schedule"
                  >
                    <el-radio :label="1">每周固定</el-radio>
                    <el-radio :label="2">每月固定</el-radio>
                    <el-radio :label="3">指定日期</el-radio>
                    <el-radio :label="4">每日</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item
                  v-if="addForm2.schedule == 1"
                  label="航班日期(每周)："
                >
                  <el-checkbox-group v-model="addForm2.flight_date">
                    <el-checkbox style="width: 46px" label="周日"></el-checkbox>
                    <el-checkbox style="width: 46px" label="周一"></el-checkbox>
                    <el-checkbox style="width: 46px" label="周二"></el-checkbox>
                    <el-checkbox style="width: 46px" label="周三"></el-checkbox>
                    <el-checkbox style="width: 46px" label="周四"></el-checkbox>
                    <el-checkbox style="width: 46px" label="周五"></el-checkbox>
                    <el-checkbox style="width: 46px" label="周六"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item
                  v-if="addForm2.schedule == 2"
                  label="航班日期(每月)："
                >
                  <el-checkbox-group v-model="addForm2.flight_date">
                    <el-checkbox
                      style="width: 46px"
                      v-for="item in 31"
                      :key="item"
                      :label="`${item}号`"
                    ></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item
                  v-if="addForm2.schedule == 3"
                  label="航班日期(指定)："
                >
                  <el-date-picker
                    v-model="time1"
                    size="small"
                    type="date"
                    @change="changeTime1"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                  <el-row>
                    <el-tag
                      style="margin-right: 10px"
                      v-for="tag in addForm2.flight_date"
                      :key="tag"
                      @close="handleClose(tag)"
                      closable
                    >
                      {{ tag }}
                    </el-tag>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="nav1 nav2">
        <div class="n-tit1">敏感货物</div>
        <div class="box">
          <el-input
            style="width: 240px; margin-bottom: 16px"
            size="small"
            placeholder="请输入内容"
            v-model="input3"
            class="input-with-select"
          >
            <el-button @click="addHW" slot="append">添加</el-button>
          </el-input>
          <el-checkbox-group v-model="sensitive_goodsid">
            <el-checkbox v-for="item in HWList" :key="item.id" :label="item.id"
              >{{ item.name
              }}<i
                @click="delHW(item)"
                style="color: #409eff; margin-left: 4px"
                class="el-icon-error"
              ></i
            ></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="nav1 nav5">
        <div class="box_tit">
          <div class="tit-l">杂费</div>
          <el-button
            style="margin-right: 20px"
            @click="addClick1"
            type="success"
            >新增</el-button
          >
        </div>
        <div class="box">
          <div class="myTable">
            <vxe-table :data="tableData1">
              <vxe-table-column
                field="input1"
                title="费用名称"
                show-overflow
              ></vxe-table-column>
              <vxe-table-column
                field="sel1"
                title="默认币种"
                show-overflow
              ></vxe-table-column>
              <vxe-table-column
                field="input2"
                title="默认单价"
                show-overflow
              ></vxe-table-column>
              <vxe-table-column field="swi1" title="有效">
                <template slot-scope="scope">
                  <el-switch
                    @change="changeKG(scope.row, scope.rowIndex)"
                    v-model="scope.row.swi1"
                  ></el-switch>
                </template>
              </vxe-table-column>
              <vxe-table-column title="操作状态" width="120">
                <template slot-scope="scope">
                  <div class="flex">
                    <el-button
                      size="small"
                      @click="toEdit1(scope.row, scope.rowIndex)"
                      type="text"
                      >编辑</el-button
                    >
                    <el-button
                      size="small"
                      @click="toDel1(scope.rowIndex)"
                      type="text"
                      >删除</el-button
                    >
                  </div>
                </template>
              </vxe-table-column>
            </vxe-table>
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
    <!-- 新增联系人 -->
    <el-dialog
      title="新增联系人"
      :visible.sync="addDialogVisible1"
      width="700px"
      :before-close="addHandleClose1"
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
              <el-form-item label="费用名称：">
                <el-input size="small" v-model="addDiaForm1.input1"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="默认币种：">
                <el-select
                  filterable
                  size="small"
                  v-model="addDiaForm1.sel1"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in BZList"
                    :key="item.id"
                    :label="`${item.code}-${item.name}`"
                    :value="`${item.code}`"
                  >
                    <div style="display: flex; justify-content: space-between">
                      <span style="color: #8492a6; font-size: 13px">{{
                        item.code
                      }}</span>
                      <span style="color: #8492a6; font-size: 13px">{{
                        item.name
                      }}</span>
                    </div>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="默认单价：">
                <el-input size="small" v-model="addDiaForm1.input2"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="有效：">
                <el-switch
                  size="small"
                  v-model="addDiaForm1.swi1"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                ></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item>
                <el-button size="small" @click="addDialogVisible1 = false"
                  >取消</el-button
                >
                <el-button size="small" type="primary" @click="AddDiaOnSubmit1"
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
    ...mapState(["headerTit", "hangbanObj"]),
  },
  watch: {
    // xindingdanPage: function (page) {
    //   this.$store.commit("xindingdanPage", page);
    //   //   this.getData();
    // },
    // xindingdanPageSize: function (pageSize) {
    //   this.$store.commit("xindingdanPageSize", pageSize);
    //   //   this.getData();
    // },
  },
  data() {
    return {
      addForm: {
        port_departureid: "",
        port_destinationid: "",
        airline_companyid: "",
        flight_number: "",
        model: "",
        transit_portid: "",
        prescription_daynum: "",
        receiving_bulkcargo: "",
        receive_tray: "",
        pattern: "",
        general_cargopolicy: "",
      },
      addForm2: {
        schedule: "1",
        flight_date: [],
      },
      time1: "",
      input3: "",
      sensitive_goodsid: [],
      addDialogVisible1: false,
      addDiaForm1: {
        input1: "",
        sel1: "",
        input2: "",
        swi1: true,
      },
      isAdd1: true,
      tableData1: [],
      editId1: "",
      JCList: [],
      HWList: [],
      BZList: [],
    };
  },
  created() {
    this.getJCData();
    this.getHWData();
    this.getBZData();
    console.log(this.hangbanObj);
    if (this.hangbanObj) {
      this.addForm = { ...this.hangbanObj };
      this.addForm2 = { ...this.hangbanObj };
      this.addForm2.flight_date = this.hangbanObj.flight_date.split(",");
      this.sensitive_goodsid = this.hangbanObj.sensitive_goodsid.split(",");
      this.tableData1 = this.hangbanObj.incidental;
    }
  },
  methods: {
    async getBZData() {
      const res = await this.$api.currency_list({
        page: 1,
        pagesize: 1000,
      });
      console.log(res);
      this.BZList = res.list;
    },
    async getHWData() {
      const res = await this.$api.sensitivegoods_list({
        page: 1,
        pagesize: 1000,
      });
      console.log(res);
      this.HWList = res.list;
    },
    async getJCData() {
      const res = await this.$api.list_airport({
        page: 1,
        pagesize: 1000,
      });
      console.log(res);
      this.JCList = res.list;
    },
    // 开关（上架/下架）
    changeKG(row, i) {
      console.log(row, i);
      this.tableData1[i].swi1 = row.swi1;
    },
    async onSubmit() {
      console.log(
        this.addForm,
        this.addForm2,
        this.sensitive_goodsid,
        this.tableData1
      );
      if (this.hangbanObj) {
        const res = await this.$api.update_flight({
          id: this.hangbanObj.id,
          ...this.addForm2,
          ...this.addForm,
          flight_date: this.addForm2.flight_date.toString(),
          sensitive_goodsid: this.sensitive_goodsid.toString(),
          incidental: JSON.stringify(this.tableData1),
        });
        this.$message(res.msg);
        if (res.result == 1) {
          this.$store.commit("hangbanObj", null);
          setTimeout(() => {
            this.$router.push({ name: "Hangbanxinxi" });
          }, 1000);
        }
      } else {
        const res = await this.$api.create_flight({
          ...this.addForm2,
          ...this.addForm,
          flight_date: this.addForm2.flight_date.toString(),
          sensitive_goodsid: this.sensitive_goodsid.toString(),
          incidental: JSON.stringify(this.tableData1),
        });
        this.$message(res.msg);
        if (res.result == 1) {
          this.$store.commit("hangbanObj", null);
          setTimeout(() => {
            this.$router.push({ name: "Hangbanxinxi" });
          }, 1000);
        }
      }
    },
    changeTime1(e) {
      console.log(e);
      this.addForm2.flight_date.push(e);
      this.time1 = "";
    },
    handleClose(tag) {
      this.addForm2.flight_date.splice(
        this.addForm2.flight_date.indexOf(tag),
        1
      );
    },
    AddDiaOnSubmit1() {
      if (this.isAdd1) {
        this.tableData1.push({ ...this.addDiaForm1 });
      } else {
        this.$set(this.tableData1, this.editId1, { ...this.addDiaForm1 });
      }
      this.addDialogVisible1 = false;
      console.log(this.tableData1);
    },
    async addHW() {
      const res = await this.$api.create_sensitivegoods({
        name: this.input3,
      });
      if (res.result == 1) {
        this.getHWData();
      }
    },
    async delHW(row) {
      const res = await this.$api.del_sensitivegoods({
        id: row.id,
      });
      if (res.result == 1) {
        this.sensitive_goodsid = [];
        this.getHWData();
      }
    },
    addClick1() {
      this.isAdd1 = true;
      for (const key in this.addDiaForm1) {
        this.addDiaForm1[key] = "";
      }
      this.addDiaForm1.swi1 = true;
      this.addDiaForm1.time1 = this.getNowDate();
      this.addDialogVisible1 = true;
    },
    changeSw(row, i) {
      console.log(row, i);
    },
    toEdit1(row, i) {
      console.log(i);
      this.editId1 = i;
      this.isAdd1 = false;
      this.addDiaForm1 = { ...row };
      this.addDialogVisible1 = true;
    },
    toDel1(i) {
      this.tableData1.splice(i, 1);
    },
    addHandleClose1() {
      this.addDialogVisible1 = false;
    },
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
/deep/ .el-select {
  width: 100%;
}
.sortable-column-demo .vxe-header--row .vxe-header--column.sortable-ghost,
.sortable-column-demo .vxe-header--row .vxe-header--column.sortable-chosen {
  background-color: #dfecfb;
}
.sortable-column-demo .vxe-header--row .vxe-header--column.col--fixed {
  cursor: no-drop;
}
</style>
