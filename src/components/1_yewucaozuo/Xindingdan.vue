<template>
  <div class="index">
    <div class="top">
      <div class="t-tit1" v-html="headerTit"></div>
      <div class="t-tit2">
        <div class="tt2-left">
          <el-input placeholder="请输入内容" v-model="keyword" class="input-with-select">
            <el-select v-model="search_type" slot="prepend" placeholder="请选择">
              <el-option label="工作单号" value="1"></el-option>
              <!-- <el-option label="运单号" value="2"></el-option> -->
              <el-option label="公司名" value="3"></el-option>
              <el-option label="中文品名" value="4"></el-option>
            </el-select>
            <el-button @click="search" slot="append" icon="el-icon-search">搜索</el-button>
          </el-input>
          <el-select @change="changeOrder" style="margin-left:50px;width:200px" v-model="order_status" placeholder="请选择">
            <el-option label="全部工作号" value="0"> </el-option>
            <el-option label="新订单" value="1"> </el-option>
            <el-option label="应付已制作" value="2"> </el-option>
            <el-option label="应收已制作" value="3"> </el-option>
            <el-option label="应付已审核" value="4"> </el-option>
            <el-option label="应收已审核" value="5"> </el-option>
            <el-option label="费用已完成" value="6"> </el-option>
          </el-select>
        </div>
        <div class="tt2-right">
          <el-button @click="addDingdan" type="success">创建新订单</el-button>
          <!-- <el-button type="primary" plain>字段设置</el-button> -->
        </div>
      </div>
    </div>
    <div class="content">
      <div class="myTable">
        <vxe-grid ref="xGrid2" v-if="vxeGrid" v-bind="gridOptions2">
          <template #name_edit="{ row }">
            <div class="flex">
              <el-button size="small" @click="tabEdit(row)" type="text">编辑</el-button>
              <el-button size="small" @click="tabDel(row)" type="text">删除</el-button>
            </div>
          </template>
        </vxe-grid>
        <!-- <vxe-table :data="tableData">
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column
            field="admin_name"
            title="管理员名称"
          ></vxe-table-column>
          <vxe-table-column field="params" title="请求参数"></vxe-table-column>
          <vxe-table-column field="path" title="请求地址"></vxe-table-column>
          <vxe-table-column field="ip" title="ip地址"></vxe-table-column>
          <vxe-table-column
            field="add_time"
            title="操作时间"
          ></vxe-table-column>
        </vxe-table> -->
        <el-pagination class="fenye" @size-change="this.xindingdanHandleSizeChange"
          @current-change="this.xindingdanHandleCurrentChange" :current-page="this.xindingdanPage" :page-size="10"
          :page-sizes="[10, 15, 20, 30]" layout="total,sizes, prev, pager, next, jumper" :total="this.total">
        </el-pagination>
      </div>
    </div>
    <!-- 创建新订单 -->
    <el-dialog title="创建新订单" :visible.sync="addDialogVisible" width="700px" :before-close="addHandleClose">
      <div class="myAddForm">
        <el-form :model="addForm" ref="addForm" label-width="130px" class="demo-addForm">
          <el-row>
            <el-col :span="20">
              <el-form-item label="工作号类型：">
                <el-select size="small" v-model="addForm.workno_id" placeholder="请选择">
                  <el-option v-for="item in gzzData" :key="item.id" :label="item.code" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="新工作号：">
                <el-row>
                  <el-col :span="18">
                    <el-input size="small" v-model="addForm.work_no"></el-input>
                  </el-col>
                  <el-col style="margin-left: 20px" :span="4">
                    <el-button size="small" type="primary" @click="newShengcheng">新生成</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="运输类型：">
                <el-radio-group v-model="addForm.traffic_type">
                  <el-radio label="1">空运</el-radio>
                  <el-radio label="2">海运</el-radio>
                  <el-radio label="3">陆运</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item>
                <el-button size="small" type="primary" @click="AddOnSubmit">确定</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Sortable from "sortablejs";
// import VXETable from "vxe-table";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["headerTit", "xindingdanPage", "xindingdanPageSize"]),
  },
  watch: {
    xindingdanPage: function (page) {
      this.$store.commit("xindingdanPage", page);
      this.getData();
    },
    xindingdanPageSize: function (pageSize) {
      this.$store.commit("xindingdanPageSize", pageSize);
      this.getData();
    },
  },
  data() {
    return {
      isAdd: false,
      keyword: "",
      search_type: '',
      order_status: '',
      total: 0,
      tableData: [],
      addForm: {
        workno_id: "",
        work_no: "",
        traffic_type: '',
        // sele1: '',
        // radio1: "",
        // input1: "",
        // radio2: "ky3",
      },
      addDialogVisible: false,
      gridOptions2: {
        showFooter: true,
        class: "sortable-column-demo",
        columnConfig: {
          useKey: true,
          minWidth: 200,
        },
        scrollX: {
          enabled: false,
        },
        columns: [
          { field: "work_no", title: "工作号", width: '170', className: '' },
          { field: "primary_no", title: "主单号", width: '170', className: '' },
          { field: "receiving_address", title: "货主名称", width: '180', className: '' },
          { field: "airline_company", title: "航空公司", width: '180', className: '' },
          { field: "goodsarrival_date", title: "到货日期", width: '130', className: '' },
          { field: "flight_date", title: "航班日期", width: '130', className: '' },
          {
            field: "operator",
            title: "操作员",
            showOverflow: true,
            width: '120', className: ''
          },
          { field: "sale", title: "业务员", width: '120', className: '' },
          { field: "customer_service", title: "客服", width: '120', className: '' },
          { field: "myDistribution_status", title: "配货状态", width: '160', className: '' },
          { field: "myAirport", title: "三子代码/中文全称", width: '200', className: '' },
          { field: "chinese_productname", title: "货物中文名称", width: '180', className: '' },
          { field: "myOrder_status", title: "工作号状态", width: '180', className: '' },
          { field: "myAirtransportation_status", title: "空运状态", width: '160', className: '' },
          { field: "booking_agent", title: "订舱代理", width: '180', className: '' },
          {
            title: "操作",
            slots: {
              default: "name_edit",
            },
            fixed: 'right',
            width: '110'
          },
        ],
        data: [
          {
            id: 10001,
            name: "Test1",
            nickname: "T1",
            role: "Develop",
            sex: "Man",
            age: 28,
            address: "ShenzhenShenzhenShenzhenShenzhenShenzhenShenzhenShenzhenShenzhen",
          },
          {
            id: 10002,
            name: "Test2",
            nickname: "T2",
            role: "Test",
            sex: "Women",
            age: 22,
            address: "\"Guangzhou\"-\"广州\"",
          },
          {
            id: 10003,
            name: "Test3",
            nickname: "T3",
            role: "PM",
            sex: "Man",
            age: 32,
            address: "Shanghai",
          },
          {
            id: 10004,
            name: "Test4",
            nickname: "T4",
            role: "Designer",
            sex: "Women",
            age: 23,
            address: "Shenzhen",
          },
          {
            id: 10005,
            name: "Test5",
            nickname: "T5",
            role: "Develop",
            sex: "Women",
            age: 30,
            address: "Shanghai",
          },
        ],
        gzzData: [],
      },
      tableColumn: [],
      ddData: [],
      columnList: [],
      vxeGrid: true,
    };
  },
  created() {
    this.getColumnData()
    this.columnDrop2();
    this.getGZZData()
  },
  beforeDestroy() {
    if (this.sortable2) {
      this.sortable2.destroy();
    }
  },
  methods: {
    async getColumnData() {
      const res = await this.$api.order_columnlist({
        order_type: 1,
      })
      // this.gridOptions2.columns = res.column
      res.column.forEach(ele => {
        ele.title = ele.column_name;
        ele.field = ele.column_field;
        ele.className = ele.id
        if (ele.field == 'order_status') {
          ele.field = 'myOrder_status'
        }
        if (ele.field == 'airtransportation_status') {
          ele.field = 'myAirtransportation_status'
        }
        if (ele.field == 'distribution_status') {
          ele.field = 'myDistribution_status'
        }
        if (ele.field == 'airport') {
          ele.field = 'myAirport'
        }
      })
      res.column.push({
        title: "操作",
        slots: {
          default: "name_edit",
        },
        fixed: 'right',
        width: '110'
      })
      this.$set(this.gridOptions2, 'columns', res.column)
      this.vxeGrid = true
      this.$forceUpdate()
      this.columnDrop2()
      this.getData()
      console.log(this.gridOptions2.columns)
    },
    async getData() {
      const res = await this.$api.order_list({
        order_type: 1,
        page: this.xindingdanPage,
        pagesize: this.xindingdanPageSize,
        search_type:this.search_type,
        keyword:this.keyword,
        order_status:this.order_status
      });
      res.list.forEach(ele => {
        ele.myOrder_status = ele.order_status == 1 ? '新订单' : ele.order_status == 2 ? '应付已制作' : ele.order_status == 3 ? '应收已制作' : ele.order_status == 4 ? '应付已审核' : ele.order_status == 5 ? '应收已审核' : "费用已完成";
        ele.myAirtransportation_status = ele.airtransportation_status == 0 ? '未起飞' : ele.airtransportation_status == 1 ? '起飞已确认' : ele.airtransportation_status == 2 ? '转运已确认' : '已到港';
        ele.myDistribution_status = ele.distribution_status == 0 ? '未入仓' : ele.distribution_status == 1 ? '建立委托' : ele.distribution_status == 2 ? '已提货' : ele.distribution_status == 3 ? '已到货' : ele.distribution_status == 4 ? '已出重' : ele.distribution_status == 5 ? '已运抵' : ele.distribution_status == 6 ? '已报关' : '已交单';
        ele.myAirport = `${ele.airport.three_charcode}/${ele.airport.chinese_name}`
      })
      this.gridOptions2.data = res.list
      this.total = res.total;
      this.$forceUpdate()
    },
    async getGZZData() {
      const res = await this.$api.workno_list({
        page: 1,
        pagesize: 10000,
      });
      this.gzzData = res.list;
    },
    async newShengcheng() {
      const res = await this.$api.create_userorderidentifier({
        workno_id: this.addForm.workno_id,
      });
      this.$message(res.msg);
      if (res.result == 1) {
        this.addForm.work_no = res.work_no;
      }
    },
    changeOrder(){
      this.getData()
    },
    search(){
      this.getData()
    },
    addDingdan() {
      this.isAdd = true;
      // this.addForm.radio1 = "";
      // this.addForm.radio2 = "ky3";
      // this.addForm.input1 = "";
      this.addDialogVisible = true;
    },
    tabEdit(row) {
      console.log(row);
      this.$store.commit('chukouObj', { order_id: row.id ,traffic_type:row.traffic_type,work_no:row.work_no})
      this.$router.push({ name: 'Addxindingdan' })
    },
    async tabDel(row) {
      console.log(row);
      const res = await this.$api.order_del({
        order_id: row.id
      })
      this.$message(res.msg)
      if (res.result == 1) {
        this.getData()
      }
    },
    columnDrop2() {
      this.$nextTick(() => {
        const $table = this.$refs.xGrid2;
        this.sortable2 = Sortable.create(
          $table.$el.querySelector(
            ".body--wrapper>.vxe-table--header .vxe-header--row"
          ),
          {
            handle: ".vxe-header--column",
            onEnd: async ({ newIndex, oldIndex }) => {
              this.vxeGrid = false
              if (this.tableColumn.length == 0) {
                this.tableColumn = $table.getColumns();
              }
              let currRow = this.tableColumn.splice(oldIndex, 1)[0];
              this.tableColumn.splice(newIndex, 0, currRow);
              var arr = []
              this.tableColumn.forEach(ele => {
                arr.push(ele.className)
              })
              console.log(arr.toString())
              await this.$api.order_columnset({
                order_type: 1,
                column_ids: arr.toString()
              })
              this.getColumnData()
            },
          }
        );
      });
    },
    async AddOnSubmit() {
      const res = await this.$api.create_userorder({
        ...this.addForm,
        order_type: 1
      })
      this.$message(res.msg);
      if (res.result == 1) {
        this.$store.commit('chukouObj', { order_id: res.order_id, ...this.addForm })
        this.$router.push({ name: 'Addxindingdan' })
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
.index {}

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
        width: 500px;
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

    .tt2-right {}
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
