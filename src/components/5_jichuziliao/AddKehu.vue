<template>
  <div class="index">
    <div class="top">
      <div class="t-tit1" v-html="headerTit"></div>
    </div>
    <div class="content">
      <div class="nav1">
        <div class="n-tit1">客户类型</div>
        <div class="box">
          <el-checkbox-group v-model="customer_typeid">
            <el-row>
              <el-col style="margin: 8px 0" :span="3" v-for="item in khList" :key="item.id">
                <el-checkbox :label="item.id">{{
                item.title
                }}</el-checkbox>
              </el-col>
            </el-row>
          </el-checkbox-group>
        </div>
      </div>
      <div class="nav1 nav2">
        <div class="n-tit1">客户基本资料</div>
        <div class="box">
          <el-form style="margin-top: 16px" :model="addForm" ref="addForm" label-width="130px" class="demo-addForm">
            <el-row>
              <el-col :span="5">
                <el-form-item label="中文名：">
                  <el-row>
                    <el-input size="small" v-model="addForm.chinese_name"></el-input>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="英文名：">
                  <el-row>
                    <el-input size="small" v-model="addForm.english_name"></el-input>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="简称：">
                  <el-row>
                    <el-input size="small" v-model="addForm.abbreviation"></el-input>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item label="属性代码：">
                  <el-select filterable size="small" v-model="addForm.attribute_codeid" placeholder="请选择">
                    <el-option v-for="item in sxList" :key="item.id" :label="item.title" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="结算货币：">
                  <el-select filterable size="small" v-model="addForm.settlement_currencyid" placeholder="请选择">
                    <el-option v-for="item in BZList" :key="item.id" :label="item.code" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="业务类型：">
                  <!-- <el-select
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
                  </el-select> -->
                  <el-checkbox-group v-model="addForm.business_type">
                    <el-checkbox label="1">海运操作</el-checkbox>
                    <el-checkbox label="2">空运操作</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="nav1 nav3">
        <div class="n-tit1">联系方式</div>
        <div class="box">
          <el-form style="margin-top: 16px" :model="addForm2" ref="addForm2" label-width="130px" class="demo-addForm">
            <el-row :gutter="10">
              <el-col :span="10">
                <el-form-item label="国家城市：">
                  <el-row>
                    <el-col :span="6">
                      <el-input size="small" placeholder="国家" v-model="addForm2.country_name"></el-input>
                    </el-col>
                    <el-col style="margin-left: 10px" :span="8">
                      <el-input size="small" placeholder="省份/自治区/州" v-model="addForm2.province_name"></el-input>
                    </el-col>
                    <el-col style="margin-left: 10px" :span="8">
                      <el-input size="small" placeholder="城市" v-model="addForm2.city_name"></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="传真：">
                  <el-row>
                    <el-col :span="6">
                      <el-input size="small" placeholder="传真国家代码" v-model="addForm2.country_code"></el-input>
                    </el-col>
                    <el-col style="margin-left: 10px" :span="8">
                      <el-input size="small" placeholder="传真号" v-model="addForm2.fax"></el-input>
                    </el-col>
                    <el-col style="margin-left: 10px" :span="8">
                      <el-input size="small" placeholder="传真分机号" v-model="addForm2.extension_number"></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="6">
                <el-form-item label="联系电话：">
                  <el-input size="small" v-model="addForm2.phone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="电子邮件：">
                  <el-input size="small" v-model="addForm2.email"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="公司网址：">
                  <el-input size="small" v-model="addForm2.url"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="地址邮编：">
                  <el-input size="small" v-model="addForm2.post_code"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="6">
                <el-form-item label="关键字：">
                  <el-input size="small" v-model="addForm2.keywords"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="海关编码：">
                  <el-input size="small" v-model="addForm2.customs_code"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="BCODE：">
                  <el-input size="small" v-model="addForm2.bcode"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="6">
                <el-form-item label="付款期限：">
                  <el-col style="padding:0" :span="10">
                    <el-select size="small" v-model="addForm2.payment_termtypes" placeholder="请选择">
                      <el-option label="航班月份" :value="1"></el-option>
                      <el-option label="开航日期" :value="2"></el-option>
                      <el-option label="操作日期" :value="3"></el-option>
                    </el-select>
                  </el-col>
                  <el-col style="padding:0;padding-left: 4px;" :span="14">
                    <el-input size="small" v-model="addForm2.payment_term"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="拖欠限额：">
                  <el-input size="small" v-model="addForm2.delinquency_limit"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="指定财务月：">
                  <el-col style="padding:0" :span="10">
                    <el-select @change="timeChange1" size="small" v-model="addForm2.financial_monthtype" placeholder="请选择">
                      <el-option label="自然月" :value="1"></el-option>
                      <el-option label="自定义" :value="2"></el-option>
                    </el-select>
                  </el-col>
                  <el-col style="padding:0;padding-left: 4px;margin-top: 1px;" :span="14">
                    <el-date-picker size="small"
                      value-format="yyyy-MM-dd" v-show="addForm2.financial_monthtype == 2" v-model="addForm2.time" type="daterange" range-separator="-"
                      start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                    <el-date-picker @change="timeChange2" size="small" v-show="addForm2.financial_monthtype == 1" v-model="addForm2.time2"
                      value-format="yyyy-MM" type="month" placeholder="选择月">
                    </el-date-picker>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row :gutter="10">
              <el-col :span="6">
                <el-form-item label="固定联系人：">
                  <el-input size="small" v-model="addForm2.fixed_contact"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="对账联系人：">
                  <el-input size="small" v-model="addForm2.reconciliation_contact"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="发票收寄联系人：">
                  <el-input size="small" v-model="addForm2.invoice_receiving"></el-input>
                </el-form-item>
              </el-col>
            </el-row> -->
            <el-row :gutter="10">
              <el-col :span="20">
                <el-form-item label="附加说明：">
                  <el-input type="textarea" :rows="5" v-model="addForm2.additional"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="box_box" style="margin-top:20px">
            <div class="box_tit">
              <div class="tit-l">固定联系人</div>
              <el-button style="margin-right: 20px" @click="addClick7" type="success">新增</el-button>
            </div>
            <div class="myTable">
              <vxe-table :data="tableData7">
                <vxe-column type="checkbox" width="50"></vxe-column>
                <!-- <vxe-table-column field="id" title="ID"></vxe-table-column> -->
                <vxe-table-column field="input1" title="姓名" show-overflow></vxe-table-column>
                <vxe-table-column field="radio1" title="性别" show-overflow></vxe-table-column>
                <!-- <vxe-table-column field="input2" title="职务" show-overflow></vxe-table-column> -->
                <vxe-table-column field="input2" title="电话" show-overflow></vxe-table-column>
                <vxe-table-column field="input3" title="手机" show-overflow></vxe-table-column>
                <!-- <vxe-table-column field="input5" title="传真" show-overflow></vxe-table-column>
                <vxe-table-column field="input6" title="账户" show-overflow></vxe-table-column> -->
                <vxe-table-column field="input4" title="电子邮件" show-overflow></vxe-table-column>
                <vxe-table-column field="input5" title="联系QQ" show-overflow></vxe-table-column>
                <vxe-table-column field="input6" title="发票地址" show-overflow></vxe-table-column>
                <vxe-table-column field="time1" title="日期" show-overflow></vxe-table-column>
                <vxe-table-column field="input7" title="备注" show-overflow></vxe-table-column>
                <vxe-table-column field="swi1" width="100" title="有效">
                  <template slot-scope="scope">
                    <el-switch @change="changeSw7(scope.row, scope.rowIndex)" v-model="scope.row.swi1"></el-switch>
                  </template>
                </vxe-table-column>
                <vxe-table-column title="操作状态" width="120">
                  <template slot-scope="scope">
                    <div class="flex">
                      <el-button size="small" @click="toEdit7(scope.row, scope.rowIndex)" type="text">编辑</el-button>
                      <el-button size="small" @click="toDel7(scope.rowIndex)" type="text">删除</el-button>
                    </div>
                  </template>
                </vxe-table-column>
              </vxe-table>
            </div>
          </div>
          <div class="box_box" style="margin-top:20px">
            <div class="box_tit">
              <div class="tit-l">对账联系人</div>
              <el-button style="margin-right: 20px" @click="addClick8" type="success">新增</el-button>
            </div>
            <div class="myTable">
              <vxe-table :data="tableData8">
                <vxe-column type="checkbox" width="50"></vxe-column>
                <!-- <vxe-table-column field="id" title="ID"></vxe-table-column> -->
                <vxe-table-column field="input1" title="姓名" show-overflow></vxe-table-column>
                <vxe-table-column field="radio1" title="性别" show-overflow></vxe-table-column>
                <!-- <vxe-table-column field="input2" title="职务" show-overflow></vxe-table-column> -->
                <vxe-table-column field="input2" title="电话" show-overflow></vxe-table-column>
                <vxe-table-column field="input3" title="手机" show-overflow></vxe-table-column>
                <!-- <vxe-table-column field="input5" title="传真" show-overflow></vxe-table-column>
                <vxe-table-column field="input6" title="账户" show-overflow></vxe-table-column> -->
                <vxe-table-column field="input4" title="电子邮件" show-overflow></vxe-table-column>
                <vxe-table-column field="input5" title="联系QQ" show-overflow></vxe-table-column>
                <vxe-table-column field="input6" title="发票地址" show-overflow></vxe-table-column>
                <vxe-table-column field="time1" title="日期" show-overflow></vxe-table-column>
                <vxe-table-column field="input7" title="备注" show-overflow></vxe-table-column>
                <vxe-table-column field="swi1" width="100" title="有效">
                  <template slot-scope="scope">
                    <el-switch @change="changeSw8(scope.row, scope.rowIndex)" v-model="scope.row.swi1"></el-switch>
                  </template>
                </vxe-table-column>
                <vxe-table-column title="操作状态" width="120">
                  <template slot-scope="scope">
                    <div class="flex">
                      <el-button size="small" @click="toEdit8(scope.row, scope.rowIndex)" type="text">编辑</el-button>
                      <el-button size="small" @click="toDel8(scope.rowIndex)" type="text">删除</el-button>
                    </div>
                  </template>
                </vxe-table-column>
              </vxe-table>
            </div>
          </div>
          <div class="box_box" style="margin-top:20px">
            <div class="box_tit">
              <div class="tit-l">发票收寄联系人</div>
              <el-button style="margin-right: 20px" @click="addClick9" type="success">新增</el-button>
            </div>
            <div class="myTable">
              <vxe-table :data="tableData9">
                <vxe-column type="checkbox" width="50"></vxe-column>
                <!-- <vxe-table-column field="id" title="ID"></vxe-table-column> -->
                <vxe-table-column field="input1" title="姓名" show-overflow></vxe-table-column>
                <vxe-table-column field="radio1" title="性别" show-overflow></vxe-table-column>
                <!-- <vxe-table-column field="input2" title="职务" show-overflow></vxe-table-column> -->
                <vxe-table-column field="input2" title="电话" show-overflow></vxe-table-column>
                <vxe-table-column field="input3" title="手机" show-overflow></vxe-table-column>
                <!-- <vxe-table-column field="input5" title="传真" show-overflow></vxe-table-column>
                <vxe-table-column field="input6" title="账户" show-overflow></vxe-table-column> -->
                <vxe-table-column field="input4" title="电子邮件" show-overflow></vxe-table-column>
                <vxe-table-column field="input5" title="联系QQ" show-overflow></vxe-table-column>
                <vxe-table-column field="input6" title="发票地址" show-overflow></vxe-table-column>
                <vxe-table-column field="time1" title="日期" show-overflow></vxe-table-column>
                <vxe-table-column field="input7" title="备注" show-overflow></vxe-table-column>
                <vxe-table-column field="swi1" width="100" title="有效">
                  <template slot-scope="scope">
                    <el-switch @change="changeSw9(scope.row, scope.rowIndex)" v-model="scope.row.swi1"></el-switch>
                  </template>
                </vxe-table-column>
                <vxe-table-column title="操作状态" width="120">
                  <template slot-scope="scope">
                    <div class="flex">
                      <el-button size="small" @click="toEdit9(scope.row, scope.rowIndex)" type="text">编辑</el-button>
                      <el-button size="small" @click="toDel9(scope.rowIndex)" type="text">删除</el-button>
                    </div>
                  </template>
                </vxe-table-column>
              </vxe-table>
            </div>
          </div>
          <div class="box_box" style="margin-top:20px">
            <div class="box_tit">
              <div class="tit-l">其他联系人</div>
              <el-button style="margin-right: 20px" @click="addClick1" type="success">新增</el-button>
            </div>
            <div class="myTable">
              <vxe-table :data="tableData1">
                <vxe-column type="checkbox" width="50"></vxe-column>
                <!-- <vxe-table-column field="id" title="ID"></vxe-table-column> -->
                <vxe-table-column field="input1" title="姓名" show-overflow></vxe-table-column>
                <vxe-table-column field="radio1" title="性别" show-overflow></vxe-table-column>
                <vxe-table-column field="input2" title="职务" show-overflow></vxe-table-column>
                <vxe-table-column field="input3" title="电话" show-overflow></vxe-table-column>
                <vxe-table-column field="input4" title="手机" show-overflow></vxe-table-column>
                <vxe-table-column field="input5" title="传真" show-overflow></vxe-table-column>
                <vxe-table-column field="input6" title="账户" show-overflow></vxe-table-column>
                <vxe-table-column field="input7" title="电子邮件" show-overflow></vxe-table-column>
                <vxe-table-column field="input8" title="银行" show-overflow></vxe-table-column>
                <vxe-table-column field="input9" title="BP机" show-overflow></vxe-table-column>
                <vxe-table-column field="time1" title="日期" show-overflow></vxe-table-column>
                <vxe-table-column field="input10" title="备注" show-overflow></vxe-table-column>
                <vxe-table-column field="swi1" width="100" title="有效">
                  <template slot-scope="scope">
                    <el-switch @change="changeSw1(scope.row, scope.rowIndex)" v-model="scope.row.swi1"></el-switch>
                  </template>
                </vxe-table-column>
                <vxe-table-column title="操作状态" width="120">
                  <template slot-scope="scope">
                    <div class="flex">
                      <el-button size="small" @click="toEdit1(scope.row, scope.rowIndex)" type="text">编辑</el-button>
                      <el-button size="small" @click="toDel1(scope.rowIndex)" type="text">删除</el-button>
                    </div>
                  </template>
                </vxe-table-column>
              </vxe-table>
            </div>
          </div>
        </div>
      </div>
      <div class="nav1 nav4">
        <div class="n-tit1">客户基本资料</div>
        <div class="box">
          <el-form style="margin-top: 16px" :model="addForm3" ref="addForm3" label-width="130px" class="demo-addForm3">
            <el-row>
              <el-col :span="5">
                <el-form-item label="业务员：">
                  <el-select filterable clearable size="small" v-model="addForm3.salesman_id" placeholder="请选择">
                    <el-option v-for="item in YWYList" :key="item.id" :label="item.realname" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="货主类型：">
                  <el-select filterable clearable size="small" v-model="addForm3.owner_type" placeholder="请选择">
                    <el-option label="中国-CN-China" value="China"></el-option>
                    <el-option label="美国-USA-America" value="America"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="货主属性：">
                  <el-select clearable filterable size="small" v-model="addForm3.owner_attribute" placeholder="请选择">
                    <el-option label="中国-CN-China" value="China"></el-option>
                    <el-option label="美国-USA-America" value="America"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="客服：">
                  <el-select clearable filterable size="small" v-model="addForm3.customer_serviceid" placeholder="请选择">
                    <el-option v-for="item in YWYList" :key="item.id" :label="item.realname" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="费用优惠说明：">
                  <el-input type="textarea" size="small" v-model="addForm3.fee_preference" :rows="5"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="nav1 nav5">
        <div class="box_tit">
          <div class="tit-l">装箱地点列表</div>
          <el-button style="margin-right: 20px" @click="addClick2" type="success">新增</el-button>
        </div>
        <div class="box">
          <div class="myTable">
            <vxe-table :data="tableData2">
              <vxe-table-column width="180" field="input1" title="地点邮编" show-overflow></vxe-table-column>
              <vxe-table-column width="150" field="input2" title="联系人" show-overflow></vxe-table-column>
              <vxe-table-column width="150" field="input3" title="电话" show-overflow></vxe-table-column>
              <vxe-table-column field="input4" title="详细地址" show-overflow></vxe-table-column>
              <vxe-table-column title="操作状态" width="120">
                <template slot-scope="scope">
                  <div class="flex">
                    <el-button size="small" @click="toEdit2(scope.row, scope.rowIndex)" type="text">编辑</el-button>
                    <el-button size="small" @click="toDel2(scope.rowIndex)" type="text">删除</el-button>
                  </div>
                </template>
              </vxe-table-column>
            </vxe-table>
          </div>
        </div>
      </div>
      <div class="nav1 nav5">
        <div class="box_tit">
          <div class="tit-l">发票抬头</div>
          <el-button style="margin-right: 20px" @click="addClick3" type="success">新增</el-button>
        </div>
        <div class="box">
          <div class="myTable">
            <vxe-table :data="tableData3">
              <vxe-table-column width="260" field="input1" title="抬头" show-overflow></vxe-table-column>
              <vxe-table-column width="150" field="input2" title="财务编码" show-overflow></vxe-table-column>
              <vxe-table-column width="150" field="input3" title="税号" show-overflow></vxe-table-column>
              <vxe-table-column field="input4" title="地址" show-overflow></vxe-table-column>
              <vxe-table-column title="操作状态" width="120">
                <template slot-scope="scope">
                  <div class="flex">
                    <el-button size="small" @click="toEdit3(scope.row, scope.rowIndex)" type="text">编辑</el-button>
                    <el-button size="small" @click="toDel3(scope.rowIndex)" type="text">删除</el-button>
                  </div>
                </template>
              </vxe-table-column>
            </vxe-table>
          </div>
        </div>
      </div>
      <div class="f-btn" style="margin-bottom: 70px">
        <el-button style="margin-top: 30px; width: 100%" @click="onSubmit" type="primary">保存</el-button>
      </div>
    </div>
    <!-- 新增固定联系人 -->
    <el-dialog title="新增固定联系人" :visible.sync="addDialogVisible7" width="700px" :before-close="addHandleClose7">
      <div class="myAddForm">
        <el-form :model="addDiaForm7" ref="addForm" label-width="130px" class="demo-addForm">
          <el-row>
            <el-col :span="20">
              <el-form-item label="姓名：">
                <el-row>
                  <el-input size="small" v-model="addDiaForm7.input1"></el-input>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="性别：">
                <el-row>
                  <el-radio-group v-model="addDiaForm7.radio1">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                  </el-radio-group>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="电话：">
                <el-input size="small" v-model="addDiaForm7.input2"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="手机：">
                <el-input size="small" v-model="addDiaForm7.input3"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="电子邮件：">
                <el-input size="small" v-model="addDiaForm7.input4"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="联系QQ：">
                <el-input size="small" v-model="addDiaForm7.input5"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="发票地址：">
                <el-input size="small" v-model="addDiaForm7.input6"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="日期：">
                <el-date-picker size="small" value-format="yyyy-MM-dd" v-model="addDiaForm7.time1" type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="备注：">
                <el-input type="textarea" size="small" v-model="addDiaForm7.input7"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="有效：">
                <el-switch size="small" v-model="addDiaForm7.swi1" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item>
                <el-button size="small" @click="addDialogVisible7 = false">取消</el-button>
                <el-button size="small" type="primary" @click="AddDiaOnSubmit7">确定</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
    <!-- 新增对账联系人 -->
    <el-dialog title="新增对账联系人" :visible.sync="addDialogVisible8" width="700px" :before-close="addHandleClose8">
      <div class="myAddForm">
        <el-form :model="addDiaForm8" ref="addForm" label-width="130px" class="demo-addForm">
          <el-row>
            <el-col :span="20">
              <el-form-item label="姓名：">
                <el-row>
                  <el-input size="small" v-model="addDiaForm8.input1"></el-input>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="性别：">
                <el-row>
                  <el-radio-group v-model="addDiaForm8.radio1">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                  </el-radio-group>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="电话：">
                <el-input size="small" v-model="addDiaForm8.input2"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="手机：">
                <el-input size="small" v-model="addDiaForm8.input3"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="电子邮件：">
                <el-input size="small" v-model="addDiaForm8.input4"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="联系QQ：">
                <el-input size="small" v-model="addDiaForm8.input5"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="发票地址：">
                <el-input size="small" v-model="addDiaForm8.input6"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="日期：">
                <el-date-picker size="small" value-format="yyyy-MM-dd" v-model="addDiaForm8.time1" type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="备注：">
                <el-input type="textarea" size="small" v-model="addDiaForm8.input7"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="有效：">
                <el-switch size="small" v-model="addDiaForm8.swi1" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item>
                <el-button size="small" @click="addDialogVisible8 = false">取消</el-button>
                <el-button size="small" type="primary" @click="AddDiaOnSubmit8">确定</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
    <!-- 新增发票收寄联系人 -->
    <el-dialog title="新增发票收寄联系人" :visible.sync="addDialogVisible9" width="700px" :before-close="addHandleClose9">
      <div class="myAddForm">
        <el-form :model="addDiaForm9" ref="addForm" label-width="130px" class="demo-addForm">
          <el-row>
            <el-col :span="20">
              <el-form-item label="姓名：">
                <el-row>
                  <el-input size="small" v-model="addDiaForm9.input1"></el-input>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="性别：">
                <el-row>
                  <el-radio-group v-model="addDiaForm9.radio1">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                  </el-radio-group>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="电话：">
                <el-input size="small" v-model="addDiaForm9.input2"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="手机：">
                <el-input size="small" v-model="addDiaForm9.input3"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="电子邮件：">
                <el-input size="small" v-model="addDiaForm9.input4"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="联系QQ：">
                <el-input size="small" v-model="addDiaForm9.input5"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="发票地址：">
                <el-input size="small" v-model="addDiaForm9.input6"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="日期：">
                <el-date-picker size="small" value-format="yyyy-MM-dd" v-model="addDiaForm9.time1" type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="备注：">
                <el-input type="textarea" size="small" v-model="addDiaForm9.input7"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="有效：">
                <el-switch size="small" v-model="addDiaForm9.swi1" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item>
                <el-button size="small" @click="addDialogVisible9 = false">取消</el-button>
                <el-button size="small" type="primary" @click="AddDiaOnSubmit9">确定</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
    <!-- 新增其他联系人 -->
    <el-dialog title="新增其他联系人" :visible.sync="addDialogVisible1" width="700px" :before-close="addHandleClose1">
      <div class="myAddForm">
        <el-form :model="addDiaForm1" ref="addForm" label-width="130px" class="demo-addForm">
          <el-row>
            <el-col :span="20">
              <el-form-item label="姓名：">
                <el-row>
                  <el-input size="small" v-model="addDiaForm1.input1"></el-input>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="性别：">
                <el-row>
                  <el-radio-group v-model="addDiaForm1.radio1">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                  </el-radio-group>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="职务：">
                <el-input size="small" v-model="addDiaForm1.input2"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="电话：">
                <el-input size="small" v-model="addDiaForm1.input3"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="手机：">
                <el-input size="small" v-model="addDiaForm1.input4"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="传真：">
                <el-input size="small" v-model="addDiaForm1.input5"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="账户：">
                <el-input size="small" v-model="addDiaForm1.input6"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="电子邮件：">
                <el-input size="small" v-model="addDiaForm1.input7"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="银行：">
                <el-input size="small" v-model="addDiaForm1.input8"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="BP机：">
                <el-input size="small" v-model="addDiaForm1.input9"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="日期：">
                <el-date-picker size="small" value-format="yyyy-MM-dd" v-model="addDiaForm1.time1" type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="备注：">
                <el-input type="textarea" size="small" v-model="addDiaForm1.input10"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="有效：">
                <el-switch size="small" v-model="addDiaForm1.swi1" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item>
                <el-button size="small" @click="addDialogVisible1 = false">取消</el-button>
                <el-button size="small" type="primary" @click="AddDiaOnSubmit1">确定</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
    <!-- 装箱地点 -->
    <el-dialog title="装箱地点" :visible.sync="addDialogVisible2" width="700px" :before-close="addHandleClose2">
      <div class="myAddForm">
        <el-form :model="addDiaForm2" ref="addForm" label-width="130px" class="demo-addForm">
          <el-row>
            <el-col :span="20">
              <el-form-item label="地点邮编：">
                <el-row>
                  <el-input size="small" v-model="addDiaForm2.input1"></el-input>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="联系人：">
                <el-input size="small" v-model="addDiaForm2.input2"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="电话：">
                <el-input size="small" v-model="addDiaForm2.input3"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="详细地址：">
                <el-input type="textarea" :rows="5" size="small" v-model="addDiaForm2.input4"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item>
                <el-button size="small" @click="addDialogVisible2 = false">取消</el-button>
                <el-button size="small" type="primary" @click="AddDiaOnSubmit2">确定</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
    <!-- 发票抬头 -->
    <el-dialog title="发票抬头" :visible.sync="addDialogVisible3" width="700px" :before-close="addHandleClose3">
      <div class="myAddForm">
        <el-form :model="addDiaForm3" ref="addForm" label-width="130px" class="demo-addForm">
          <el-row>
            <el-col :span="20">
              <el-form-item label="抬头：">
                <el-row>
                  <el-input size="small" v-model="addDiaForm3.input1"></el-input>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="财务编码：">
                <el-input size="small" v-model="addDiaForm3.input2"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="税号：">
                <el-input size="small" v-model="addDiaForm3.input3"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="地址：">
                <el-input type="textarea" :rows="5" size="small" v-model="addDiaForm3.input4"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item>
                <el-button size="small" @click="addDialogVisible3 = false">取消</el-button>
                <el-button size="small" type="primary" @click="AddDiaOnSubmit3">确定</el-button>
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
    ...mapState(["headerTit", "kehuObj"]),
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
      checkList1: [],
      addForm: {
        chinese_name: "",
        english_name: "",
        abbreviation: "",
        attribute_codeid: "",
        settlement_currencyid: "",
        business_type: [],
      },
      addForm2: {
        country_name: "",
        province_name: "",
        city_name: "",
        country_code: "",
        fax: "",
        extension_number: "",
        phone: "",
        email: "",
        url: "",
        post_code: "",
        keywords: "",
        customs_code: "",
        bcode: "",
        payment_termtypes: "",
        payment_term: "",
        delinquency_limit: "",
        financial_monthtype: "",
        fixed_contact: "",
        reconciliation_contact: "",
        invoice_receiving: "",
        additional: "",
        time: [],
        time2: '',
      },
      addForm3: {
        salesman_id: "",
        owner_type: "",
        owner_attribute: "",
        customer_serviceid: "",
        fee_preference: "",
      },
      addDialogVisible1: false,
      addDiaForm1: {
        input1: "",
        input2: "",
        input3: "",
        input4: "",
        input5: "",
        input6: "",
        input7: "",
        input8: "",
        input9: "",
        input10: "",
        time1: "",
        radio1: "",
        swi1: true,
      },
      isAdd1: true,
      tableData1: [],
      editId1: "",
      isAdd2: true,
      addDialogVisible2: false,
      tableData2: [],
      editId2: "",
      addDiaForm2: {
        input1: "",
        input2: "",
        input3: "",
        input4: "",
      },
      isAdd3: true,
      addDialogVisible3: false,
      tableData3: [],
      editId3: "",
      addDiaForm3: {
        input1: "",
        input2: "",
        input3: "",
        input4: "",
      },
      isAdd7: true,
      addDialogVisible7: false,
      tableData7: [],
      editId7: "",
      addDiaForm7: {
        input1: "",
        input2: "",
        input3: "",
        input4: "",
        input5: "",
        input6: "",
        input7: "",
        input8: "",
        input9: "",
        input10: "",
        time1: "",
        radio1: "",
        swi1: true,
      },
      isAdd8: true,
      addDialogVisible8: false,
      tableData8: [],
      editId8: "",
      addDiaForm8: {
        input1: "",
        input2: "",
        input3: "",
        input4: "",
        input5: "",
        input6: "",
        input7: "",
        input8: "",
        input9: "",
        input10: "",
        time1: "",
        radio1: "",
        swi1: true,
      },
      isAdd9: true,
      addDialogVisible9: false,
      tableData9: [],
      editId9: "",
      addDiaForm9: {
        input1: "",
        input2: "",
        input3: "",
        input4: "",
        input5: "",
        input6: "",
        input7: "",
        input8: "",
        input9: "",
        input10: "",
        time1: "",
        radio1: "",
        swi1: true,
      },
      sxList: [],
      khList: [],
      BZList: [],
      YWYList: [],
      customer_typeid: [],
      options: [],
    };
  },
  created() {
    console.log(this.kehuObj);
    this.getYWYData();
    this.getSXData();
    this.getKHData();
    this.getBZData();
    this.addForm = { ...this.kehuObj };
    this.addForm2 = { ...this.kehuObj };
    this.addForm3 = { ...this.kehuObj };
    this.addForm.business_type = this.kehuObj.business_type.split(",");
    this.customer_typeid = this.kehuObj.customer_typeid.split(",");
    this.customer_typeid = this.customer_typeid.map(ele => {
      return Number(ele)
    })
    this.tableData1 = this.kehuObj.contacts;
    this.tableData2 = this.kehuObj.packing_places;
    this.tableData3 = this.kehuObj.invoice_header;
    this.tableData7 = this.kehuObj.fixed_contact;
    this.tableData8 = this.kehuObj.reconciliation_contact;
    this.tableData9 = this.kehuObj.invoice_receiving;
    if (this.kehuObj) {
      this.$set(this.addForm2,'time',[this.kehuObj.financial_startday, this.kehuObj.financial_endday])
      this.$set(this.addForm2,'time2',this.kehuObj.financial_startday.substring(0,7))
    }
  },
  methods: {
    async getYWYData() {
      const res = await this.$api.user_list({
        post_id: "3",
        page: 1,
        pagesize: 1000,
      });
      console.log(res);
      this.YWYList = res.list;
    },
    async getBZData() {
      const res = await this.$api.currency_list({
        page: 1,
        pagesize: 1000,
      });
      console.log(res);
      this.BZList = res.list;
    },
    async getSXData() {
      const res = await this.$api.customer_attributecode({
        page: 1,
        pagesize: 1000,
      });
      console.log(res);
      this.sxList = res.list;
    },
    async getKHData() {
      const res = await this.$api.customer_type({
        page: 1,
        pagesize: 1000,
      });
      console.log(res);
      this.khList = res.list;
    },
    async onSubmit() {
      // console.log(
      //   this.customer_typeid,
      //   this.addForm,
      //   this.addForm2,
      //   this.tableData1,
      //   this.addForm3,
      //   this.tableData2,
      //   this.tableData3,
      // this.tableData7
      // this.tableData8
      // this.tableData9
      // );
      console.log(this.addForm2)
      if (this.kehuObj) {
        const res = await this.$api.update_customer({
          ...this.addForm3,
          ...this.addForm2,
          ...this.addForm,
          financial_monthtype: this.addForm2.financial_monthtype,
          payment_termtypes: this.addForm2.payment_termtypes,
          financial_startday: this.addForm2.time[0],
          financial_endday: this.addForm2.time[1],
          customer_typeid: this.customer_typeid.toString(),
          business_type: this.addForm.business_type.toString(),
          contacts: JSON.stringify(this.tableData1),
          packing_places: JSON.stringify(this.tableData2),
          invoice_header: JSON.stringify(this.tableData3),
          fixed_contact: JSON.stringify(this.tableData7),
          reconciliation_contact: JSON.stringify(this.tableData8),
          invoice_receiving: JSON.stringify(this.tableData9),
        });
        this.$message(res.msg);
        if (res.result == 1) {
          this.$store.commit("kehuObj", null);
          setTimeout(() => {
            this.$router.push({ name: "Kehuziliao" });
          }, 1000);
        }
      } else {
        const res = await this.$api.create_customer({
          customer_typeid: this.customer_typeid.toString(),
          ...this.addForm,
          ...this.addForm2,
          financial_monthtype: this.addForm2.financial_monthtype,
          payment_termtypes: this.addForm2.payment_termtypes,
          business_type: this.addForm.business_type.toString(),
          contacts: JSON.stringify(this.tableData1),
          ...this.addForm3,
          packing_places: JSON.stringify(this.tableData2),
          invoice_header: JSON.stringify(this.tableData3),
          financial_startday: this.addForm2.time[0],
          financial_endday: this.addForm2.time[1],
          fixed_contact: JSON.stringify(this.tableData7),
          reconciliation_contact: JSON.stringify(this.tableData8),
          invoice_receiving: JSON.stringify(this.tableData9),
        });
        this.$message(res.msg);
        if (res.result == 1) {
          this.$store.commit("kehuObj", null);
          setTimeout(() => {
            this.$router.push({ name: "Kehuziliao" });
          }, 1000);
        }
      }
    },
    timeChange1() {
      this.$set(this.addForm2,'time',[])
      this.$set(this.addForm2,'time2','')
    },
    timeChange2(e) {
      console.log(e)
      var y = e.split('-')[0]
      var m = e.split('-')[1]
      var d = new Date(y, m, 0).getDate(); //获取当月最后一日
      this.$set(this.addForm2,'time',[`${y}-${m}-01`,`${y}-${m}-${d}`])
      console.log(this.addForm2.time)
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
    AddDiaOnSubmit7() {
      if (this.isAdd7) {
        this.tableData7.push({ ...this.addDiaForm7 });
      } else {
        this.$set(this.tableData7, this.editId7, { ...this.addDiaForm7 });
      }
      this.addDialogVisible7 = false;
      console.log(this.tableData7);
    },
    AddDiaOnSubmit8() {
      if (this.isAdd8) {
        this.tableData8.push({ ...this.addDiaForm8 });
      } else {
        this.$set(this.tableData8, this.editId8, { ...this.addDiaForm8 });
      }
      this.addDialogVisible8 = false;
      console.log(this.tableData8);
    },
    AddDiaOnSubmit9() {
      if (this.isAdd9) {
        this.tableData9.push({ ...this.addDiaForm9 });
      } else {
        this.$set(this.tableData9, this.editId9, { ...this.addDiaForm9 });
      }
      this.addDialogVisible9 = false;
      console.log(this.tableData9);
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
    addClick7() {
      this.isAdd7 = true;
      for (const key in this.addDiaForm7) {
        this.addDiaForm7[key] = "";
      }
      this.addDiaForm7.swi1 = true;
      this.addDiaForm7.time1 = this.getNowDate();
      this.addDialogVisible7 = true;
    },
    addClick8() {
      this.isAdd8 = true;
      for (const key in this.addDiaForm8) {
        this.addDiaForm8[key] = "";
      }
      this.addDiaForm8.swi1 = true;
      this.addDiaForm8.time1 = this.getNowDate();
      this.addDialogVisible8 = true;
    },
    addClick9() {
      this.isAdd9 = true;
      for (const key in this.addDiaForm9) {
        this.addDiaForm9[key] = "";
      }
      this.addDiaForm9.swi1 = true;
      this.addDiaForm9.time1 = this.getNowDate();
      this.addDialogVisible9 = true;
    },
    changeSw1(row, i) {
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
    changeSw7(row, i) {
      console.log(row, i);
    },
    toEdit7(row, i) {
      console.log(i);
      this.editId7 = i;
      this.isAdd7 = false;
      this.addDiaForm7 = { ...row };
      this.addDialogVisible7 = true;
    },
    toDel7(i) {
      this.tableData7.splice(i, 1);
    },
    addHandleClose7() {
      this.addDialogVisible7 = false;
    },
    changeSw8(row, i) {
      console.log(row, i);
    },
    toEdit8(row, i) {
      console.log(i);
      this.editId8 = i;
      this.isAdd8 = false;
      this.addDiaForm8 = { ...row };
      this.addDialogVisible8 = true;
    },
    toDel8(i) {
      this.tableData8.splice(i, 1);
    },
    addHandleClose8() {
      this.addDialogVisible8 = false;
    },
    changeSw9(row, i) {
      console.log(row, i);
    },
    toEdit9(row, i) {
      console.log(i);
      this.editId9 = i;
      this.isAdd9 = false;
      this.addDiaForm9 = { ...row };
      this.addDialogVisible9 = true;
    },
    toDel9(i) {
      this.tableData9.splice(i, 1);
    },
    addHandleClose9() {
      this.addDialogVisible9 = false;
    },
    AddDiaOnSubmit2() {
      if (this.isAdd2) {
        this.tableData2.push({ ...this.addDiaForm2 });
      } else {
        this.$set(this.tableData2, this.editId2, { ...this.addDiaForm2 });
      }
      this.addDialogVisible2 = false;
      console.log(this.tableData2);
    },
    addClick2() {
      this.isAdd2 = true;
      for (const key in this.addDiaForm2) {
        this.addDiaForm2[key] = "";
      }
      this.addDialogVisible2 = true;
    },
    toEdit2(row, i) {
      console.log(i);
      this.editId2 = i;
      this.isAdd2 = false;
      this.addDiaForm2 = { ...row };
      this.addDialogVisible2 = true;
    },
    toDel2(i) {
      this.tableData2.splice(i, 1);
    },
    addHandleClose2() {
      this.addDialogVisible2 = false;
    },
    AddDiaOnSubmit3() {
      if (this.isAdd3) {
        this.tableData3.push({ ...this.addDiaForm3 });
      } else {
        this.$set(this.tableData3, this.editId3, { ...this.addDiaForm3 });
      }
      this.addDialogVisible3 = false;
      console.log(this.tableData3);
    },
    addClick3() {
      this.isAdd3 = true;
      for (const key in this.addDiaForm3) {
        this.addDiaForm3[key] = "";
      }
      this.addDialogVisible3 = true;
    },
    toEdit3(row, i) {
      console.log(i);
      this.editId3 = i;
      this.isAdd3 = false;
      this.addDiaForm3 = { ...row };
      this.addDialogVisible3 = true;
    },
    toDel3(i) {
      this.tableData3.splice(i, 1);
    },
    addHandleClose3() {
      this.addDialogVisible3 = false;
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

  .nav2.nav1 {}

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

.sortable-column-demo .vxe-header--row .vxe-header--column.sortable-ghost,
.sortable-column-demo .vxe-header--row .vxe-header--column.sortable-chosen {
  background-color: #dfecfb;
}

.sortable-column-demo .vxe-header--row .vxe-header--column.col--fixed {
  cursor: no-drop;
}
</style>
