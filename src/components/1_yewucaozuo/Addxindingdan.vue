<template>
  <div class="index">
    <div class="top">
      <div class="t-tit1">
        空运操作 / 新订单 / <span class="active">新建订单</span>
      </div>
    </div>
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="委托信息" name="1">
          <div class="nav1 nav3">
            <div class="myStep">
              <el-steps :active="stepIndex">
                <el-step :icon="stepIndex == 1 ? 'el-icon-success' : ''">
                  <template v-slot:title>
                    <div class="stepbox-title">
                      <div class="st-txt">建立委托</div>
                    </div>
                  </template>
                  <template v-if="stepIndex > 1" v-slot:description>
                    <div class="stepbox">
                      <div class="st-txt">创建人：{{procedure[0].user.realname}}</div>
                      <div class="st-txt">{{procedure[0].create_time}}</div>
                    </div>
                  </template>
                </el-step>
                <el-step :icon="stepIndex == 2 ? 'el-icon-success' : ''">
                  <template v-slot:title>
                    <div class="stepbox-title">
                      <div class="st-txt">已提货</div>
                    </div>
                  </template>
                  <template v-slot:description>
                    <div v-if="stepIndex == 2" class="stepbox">
                      <el-button @click="changeStepBox(2)" size="small" type="primary">确认提货</el-button>
                    </div>
                  </template>
                </el-step>
                <el-step :icon="stepIndex == 3 ? 'el-icon-success' : ''" title="已到货">
                  <template v-slot:description>
                    <div v-if="stepIndex == 3" class="stepbox">
                      <el-button @click="changeStepBox(3)" size="small" type="primary">确认到货</el-button>
                    </div>
                  </template>
                </el-step>
                <el-step :icon="stepIndex == 4 ? 'el-icon-success' : ''" title="已出重">
                  <template v-slot:description>
                    <div v-if="stepIndex == 4" class="stepbox">
                      <el-button @click="changeStepBox(4)" size="small" type="primary">确认运抵</el-button>
                    </div>
                  </template>
                </el-step>
                <el-step :icon="stepIndex == 5 ? 'el-icon-success' : ''" title="已运抵">
                  <template v-slot:description>
                    <div v-if="stepIndex == 5" class="stepbox">
                      <el-button @click="changeStepBox(5)" size="small" type="primary">确认运抵</el-button>
                    </div>
                  </template>
                </el-step>
                <el-step :icon="stepIndex == 6 ? 'el-icon-success' : ''" title="已报关">
                  <template v-slot:description>
                    <div v-if="stepIndex == 6" class="stepbox">
                      <el-button @click="changeStepBox(6)" size="small" type="primary">确认报关</el-button>
                    </div>
                  </template>
                </el-step>
                <el-step :icon="stepIndex == 7 ? 'el-icon-success' : ''" title="已交单">
                  <template v-slot:description>
                    <div v-if="stepIndex == 7" class="stepbox">
                      <el-button @click="changeStepBox(7)" size="small" type="primary">确认交单</el-button>
                    </div>
                  </template>
                </el-step>
              </el-steps>
            </div>

            <div class="n-tit1">委托信息</div>
            <div class="box">
              <el-form :disabled='newIs_sign == 1' style="margin-top: 16px" :model="addForm1_1" ref="addForm1_1" label-width="130px"
                class="demo-addForm" :rules="rules1_1">
                <el-row :gutter="10">
                  <el-col :span="6">
                    <el-form-item label="运输类型：">
                      <el-radio-group disabled v-model="chukouObj.traffic_type">
                        <el-radio label="1">空运</el-radio>
                        <el-radio label="2">海运</el-radio>
                        <el-radio label="3">陆运</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="工作号：">
                      <el-input size="small" disabled v-model="chukouObj.work_no"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="工作号状态：">
                      <el-select size="small" v-model="ddObj.order_status" disabled>
                        <el-option label="新订单" :value="1"></el-option>
                        <el-option label="应付已制作" :value="2"></el-option>
                        <el-option label="应收已制作" :value="3"></el-option>
                        <el-option label="应付已审核" :value="4"></el-option>
                        <el-option label="应收已审核" :value="5"></el-option>
                        <el-option label="费用已完成" :value="6"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <div class="heng"></div>
                <el-row style="margin-top: 20px" :gutter="10">
                  <el-col :span="6">
                    <el-form-item label="操作时间：" prop="operation_time">
                      <el-date-picker size="small" v-model="addForm1_1.operation_time" type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="操作员：" prop="operator_id">
                      <el-select size="small" v-model="addForm1_1.operator_id">
                        <el-option v-for="item in kfList" :key="item.id" :label="item.realname" :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="销售：" prop="sale_id">
                      <el-select size="small" v-model="addForm1_1.sale_id">
                        <el-option v-for="item in xsList" :key="item.id" :label="item.realname" :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="客服：" prop="customerservice_id">
                      <el-select size="small" v-model="addForm1_1.customerservice_id">
                        <el-option v-for="item in kfList" :key="item.id" :label="item.realname" :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <!-- <el-col :span="6">
                    <el-form-item label="配货状态：" prop="sele5">
                      <el-select size="small" v-model="addForm1_1.sele5">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col> -->
                  <el-col :span="6">
                    <el-form-item label="委托单位：" prop="client_id">
                      <el-select size="small" v-model="addForm1_1.client_id" filterable remote reserve-keyword
                        placeholder="请输入关键词" :remote-method="remoteMethod1" :loading="loading"
                        v-el-select-loadmore="loadmore1">
                        <el-option v-for="item in khList1" :key="item.id"
                          :label="`${item.abbreviation}-${item.chinese_name}-${item.english_name}`" :value="item.id">
                          <div style="
                                  display: flex;
                                  justify-content: space-between;
                                ">
                            <span style="font-size: 12px">{{ item.abbreviation }}</span>
                            <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.chinese_name }}</span>
                            <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.english_name }}</span>
                          </div>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="航线人员：" prop="airlinepersonnel_id">
                      <el-select size="small" v-model="addForm1_1.airlinepersonnel_id">
                        <el-option v-for="item in xsList" :key="item.id" :label="item.realname" :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <div style="margin-top: 40px" class="nav1 nav3">
            <div class="n-tit1">货物信息</div>
            <div class="box">
              <el-form :disabled='newIs_sign == 1' style="margin-top: 16px" :model="addForm1_2" ref="addForm1_2" label-width="130px"
                class="demo-addForm" :rules="rules1_2">
                <el-row :gutter="10">
                  <el-col :span="5">
                    <el-form-item label="收货地址：" prop="receivingaddress_id">
                      <el-select size="small" v-model="addForm1_2.receivingaddress_id" filterable remote reserve-keyword
                        placeholder="请输入关键词" :remote-method="remoteMethod1" :loading="loading"
                        v-el-select-loadmore="loadmore1">
                        <el-option v-for="item in khList1" :key="item.id"
                          :label="`${item.abbreviation}-${item.chinese_name}-${item.english_name}`" :value="item.id">
                          <div style="
                                  display: flex;
                                  justify-content: space-between;
                                ">
                            <span style="font-size: 12px">{{ item.abbreviation }}</span>
                            <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.chinese_name }}</span>
                            <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.english_name }}</span>
                          </div>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="起运港：" prop="portdeparture_id">
                      <el-row>
                        <el-col :span="8">
                          <el-select filterable size="small" v-model="addForm1_2.portdeparture_id" placeholder="请选择">
                            <el-option v-for="item in jcList" :key='item.id' :label="`${item.three_charcode}`"
                              :value="item.id">
                              <div style="
                                  display: flex;
                                  justify-content: space-between;
                                ">
                                <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.three_charcode
                                }}</span>
                                <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.english_name
                                }}</span>
                                <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.chinese_name
                                }}</span>
                              </div>
                            </el-option>
                          </el-select>
                        </el-col>
                        <el-col :span="14">
                          <el-select style="margin-left: 10px; width: 100%" filterable size="small"
                            v-model="addForm1_2.portdeparture_id" placeholder="请选择">
                            <el-option v-for="item in jcList" :key='item.id'
                              :label="`${item.english_name}-${item.chinese_name}`" :value="item.id">
                              <div style="
                                  display: flex;
                                  justify-content: space-between;
                                ">
                                <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.three_charcode
                                }}</span>
                                <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.english_name
                                }}</span>
                                <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.chinese_name
                                }}</span>
                              </div>
                            </el-option>
                          </el-select>
                        </el-col>
                      </el-row>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="销售卖价：" prop="selling_price">
                      <el-input size="small" v-model="addForm1_2.selling_price" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="ALLIN：" prop="allin">
                      <el-input size="small" disabled v-model="addForm1_2.allin" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="5">
                    <el-form-item label="最终目的国：" prop="finalcountry_id">
                      <el-select filterable size="small" v-model="addForm1_2.finalcountry_id" placeholder="请选择">
                        <el-option v-for="item in gjList" :key="item.id"
                          :label="`${item.country_code}-${item.chinese_name}`" :value="item.id">
                          <div style="
                              display: flex;
                              justify-content: space-between;
                            ">
                            <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.country_code }}</span>
                            <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.chinese_name }}</span>
                          </div>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="目的港：" prop="portdestination_id">
                      <el-row>
                        <el-col :span="8">
                          <el-select filterable size="small" v-model="addForm1_2.portdestination_id" placeholder="请选择">
                            <el-option v-for="item in jcList" :key='item.id' :label="`${item.three_charcode}`"
                              :value="item.id">
                              <div style="
                                  display: flex;
                                  justify-content: space-between;
                                ">
                                <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.three_charcode
                                }}</span>
                                <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.english_name
                                }}</span>
                                <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.chinese_name
                                }}</span>
                              </div>
                            </el-option>
                          </el-select>
                        </el-col>
                        <el-col :span="14">
                          <el-select style="margin-left: 10px; width: 100%" filterable size="small"
                            v-model="addForm1_2.portdestination_id" placeholder="请选择">
                            <el-option v-for="item in jcList" :key='item.id'
                              :label="`${item.english_name}-${item.chinese_name}`" :value="item.id">
                              <div style="
                                  display: flex;
                                  justify-content: space-between;
                                ">
                                <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.three_charcode
                                }}</span>
                                <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.english_name
                                }}</span>
                                <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.chinese_name
                                }}</span>
                              </div>
                            </el-option>
                          </el-select>
                        </el-col>
                      </el-row>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="委托件数：" prop="number_entrustedpieces">
                      <el-input size="small" v-model="addForm1_2.number_entrustedpieces" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="委托体积：" prop="entrusted_volume">
                      <el-input size="small" v-model="addForm1_2.entrusted_volume" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="5">
                    <el-form-item label="包装类型：" prop="package_typeid">
                      <el-select size="small" v-model="addForm1_2.package_typeid">
                        <el-option v-for='item in bzList' :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="重量单位：" prop="weight_unit">
                      <el-input size="small" v-model="addForm1_2.weight_unit" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="委托重量：" prop="entrusted_weight">
                      <el-input size="small" v-model="addForm1_2.entrusted_weight" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="价格备注：">
                      <el-input size="small" v-model="addForm1_2.price_remarks" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="5">
                    <el-form-item label="委托密度：">
                      <el-input size="small" v-model="addForm1_2.commission_density" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="19">
                    <el-form-item label="航班特殊要求：">
                      <el-input size="small" v-model="addForm1_2.flight_requirements" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="5">
                    <el-form-item label="货到日期：" prop="goodsarrival_date">
                      <el-date-picker size="small" value-format="yyyy-MM-dd" v-model="addForm1_2.goodsarrival_date"
                        type="date" placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="单到日期：" prop="arrival_date">
                      <el-date-picker size="small" value-format="yyyy-MM-dd" v-model="addForm1_2.arrival_date"
                        type="date" placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="货到方式：" prop="delivery_method">
                      <el-select size="small" v-model="addForm1_2.delivery_method">
                        <el-option v-for="item in hdfsList" :key='item.id' :label="item.name" :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="报关方式：" prop="declaration_method">
                      <el-select size="small" v-model="addForm1_2.declaration_method">
                        <el-option v-for="item in bgfsList" :key='item.id' :label="item.name" :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="5">
                    <el-form-item label="中文品名：" prop="chinese_productname">
                      <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="addForm1_2.chinese_productname">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="英文品名：">
                      <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="addForm1_2.english_productname">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="标记唛码：">
                      <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="addForm1_2.mark_numbers">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="20">
                    <el-form-item label="操作说明：">
                      <el-input type="textarea" :rows="5" placeholder="请输入内容"
                        v-model="addForm1_2.operating_instructions">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <div style="margin-top: 40px" class="nav1 nav3">
            <div class="n-tit1">空运服务</div>
            <div class="box">
              <el-form :disabled='newIs_sign == 1' style="margin-top: 16px" :model="addForm1_3" ref="addForm1_3" label-width="130px"
                class="demo-addForm" :rules="rules1_3">
                <el-row style="margin-top: 20px" :gutter="10">
                  <el-col :span="6">
                    <el-form-item label="业务类型：" prop="business_type">
                      <el-select size="small" v-model="addForm1_3.business_type">
                        <el-option v-for="item in ywlxList" :key='item.id' :label="item.name" :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="主单号：" prop="primary_no">
                      <el-tooltip v-if="tooltipFlag" :content="tooltipContent" placement="top">
                        <el-input @input="checkOrder" size="small" v-model="addForm1_3.primary_no" placeholder="请输入内容">
                        </el-input>
                      </el-tooltip>
                      <el-input v-else @input="checkOrder" size="small" v-model="addForm1_3.primary_no"
                        placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="航空公司：" prop="airline_companyid">
                      <el-select size="small" v-model="addForm1_3.airline_companyid">
                        <el-option v-for="item in khList1" :key="item.id"
                          :label="`${item.abbreviation}-${item.chinese_name}-${item.english_name}`" :value="item.id">
                          <div style="
                                  display: flex;
                                  justify-content: space-between;
                                ">
                            <span style="font-size: 12px">{{ item.abbreviation }}</span>
                            <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.chinese_name }}</span>
                            <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.english_name }}</span>
                          </div>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="6">
                    <el-form-item label="订舱代理：" prop="booking_agentid">
                      <el-select filterable size="small" v-model="addForm1_3.booking_agentid" placeholder="请选择">
                        <el-option v-for="item in khList1" :key="item.id"
                          :label="`${item.abbreviation}-${item.chinese_name}-${item.english_name}`" :value="item.id">
                          <div style="
                                  display: flex;
                                  justify-content: space-between;
                                ">
                            <span style="font-size: 12px">{{ item.abbreviation }}</span>
                            <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.chinese_name }}</span>
                            <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.english_name }}</span>
                          </div>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="承运人：" prop="carrier_id">
                      <el-select filterable size="small" v-model="addForm1_3.carrier_id" placeholder="请选择">
                        <el-option v-for="item in khList1" :key="item.id"
                          :label="`${item.abbreviation}-${item.chinese_name}-${item.english_name}`" :value="item.id">
                          <div style="
                                  display: flex;
                                  justify-content: space-between;
                                ">
                            <span style="font-size: 12px">{{ item.abbreviation }}</span>
                            <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.chinese_name }}</span>
                            <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.english_name }}</span>
                          </div>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="产品：" prop="product">
                      <el-select size="small" v-model="addForm1_3.product">
                        <el-option v-for="item in cpList" :key='item.id' :label="item.name" :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <div class="footer-btn">
              <el-row>
                <el-col :span="20">
                  <el-button style="width: 10%" type="primary" @click="AddDiaOnSubmit1">保存</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="签单" name="2">
          <div class="nav1 nav3">
            <div class="n-tit1">基本信息</div>
            <div class="box">
              <el-form :disabled='newIs_sign == 1' style="margin-top: 16px" :model="addForm2_1" ref="addForm2_1" label-width="130px"
                class="demo-addForm" :rules="rules2_1">
                <el-row :gutter="10">
                  <el-col :span="12">
                    <div class="b-txt">应收客户</div>
                    <el-col :span="12">
                      <el-form-item label="销售卖价：" prop="selling_price">
                        <el-input size="small" v-model="addForm2_1.selling_price"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="ALLIN：">
                        <el-input size="small" disabled v-model="addForm2_1.allin"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <div class="b-txt">应付承运人</div>
                    <el-col :span="12">
                      <el-form-item label="成本运价：" prop="freight_bill">
                        <el-input size="small" v-model="addForm2_1.freight_bill"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="ALLIN：">
                        <el-input size="small" disabled v-model="addForm2_1.carrier_allin"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-col :span="12">
                      <el-form-item label="安全费：">
                        <el-input size="small" v-model="addForm2_1.safety_fee"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="燃油费：">
                        <el-input size="small" v-model="addForm2_1.fuel_cost"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-col :span="12">
                      <el-form-item label="安全费：">
                        <el-input size="small" v-model="addForm2_1.carrier_safetyfee"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="燃油费：">
                        <el-input size="small" v-model="addForm2_1.carrier_fuelcost"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
                <div class="heng"></div>
                <el-row style="margin-top: 30px" :gutter="10">
                  <div class="b-txt">委托内容</div>
                  <el-col :span="6">
                    <el-form-item label="主单号：">
                      <el-input size="small" v-model="addForm1_3.primary_no"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="起运港：">
                      <el-row>
                        <el-col :span="8">
                          <el-select filterable size="small" v-model="addForm2_1.port_consignedid" placeholder="请选择">
                            <el-option v-for="item in jcList" :key='item.id' :label="`${item.three_charcode}`"
                              :value="item.id">
                              <div style="
                                  display: flex;
                                  justify-content: space-between;
                                ">
                                <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.three_charcode
                                }}</span>
                                <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.english_name
                                }}</span>
                                <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.chinese_name
                                }}</span>
                              </div>
                            </el-option>
                          </el-select>
                        </el-col>
                        <el-col :span="14">
                          <el-select style="margin-left: 10px; width: 100%" filterable size="small"
                            v-model="addForm2_1.port_consignedid" placeholder="请选择">
                            <el-option v-for="item in jcList" :key='item.id'
                              :label="`${item.english_name}-${item.chinese_name}`" :value="item.id">
                              <div style="
                                  display: flex;
                                  justify-content: space-between;
                                ">
                                <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.three_charcode
                                }}</span>
                                <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.english_name
                                }}</span>
                                <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.chinese_name
                                }}</span>
                              </div>
                            </el-option>
                          </el-select>
                        </el-col>
                      </el-row>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="目的港：">
                      <el-row>
                        <el-col :span="8">
                          <el-select filterable size="small" v-model="addForm2_1.port_destinationid" placeholder="请选择">
                            <el-option v-for="item in jcList" :key='item.id' :label="`${item.three_charcode}`"
                              :value="item.id">
                              <div style="
                                  display: flex;
                                  justify-content: space-between;
                                ">
                                <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.three_charcode
                                }}</span>
                                <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.english_name
                                }}</span>
                                <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.chinese_name
                                }}</span>
                              </div>
                            </el-option>
                          </el-select>
                        </el-col>
                        <el-col :span="14">
                          <el-select style="margin-left: 10px; width: 100%" filterable size="small"
                            v-model="addForm2_1.port_destinationid" placeholder="请选择">
                            <el-option v-for="item in jcList" :key='item.id'
                              :label="`${item.english_name}-${item.chinese_name}`" :value="item.id">
                              <div style="
                                  display: flex;
                                  justify-content: space-between;
                                ">
                                <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.three_charcode
                                }}</span>
                                <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.english_name
                                }}</span>
                                <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.chinese_name
                                }}</span>
                              </div>
                            </el-option>
                          </el-select>
                        </el-col>
                      </el-row>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="承运人：">
                      <el-row>
                        <el-col :span="8">
                          <el-select filterable size="small" v-model="addForm2_1.carrier_id" placeholder="请选择">
                            <el-option v-for="item in khList1" :key="item.id" :label="`${item.abbreviation}`"
                              :value="item.id">
                              <div style="
                                  display: flex;
                                  justify-content: space-between;
                                ">
                                <span style="font-size: 12px">{{ item.abbreviation }}</span>
                                <!-- <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.chinese_name
                                }}</span>
                                <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.english_name
                                }}</span> -->
                              </div>
                            </el-option>
                          </el-select>
                        </el-col>
                        <el-col :span="14">
                          <el-select style="margin-left: 10px; width: 100%" filterable size="small"
                            v-model="addForm2_1.carrier_id" placeholder="请选择">
                            <el-option v-for="item in khList1" :key="item.id"
                              :label="`${item.chinese_name}-${item.english_name}`" :value="item.id">
                              <div style="
                                  display: flex;
                                  justify-content: space-between;
                                ">
                                <!-- <span style="font-size: 12px">{{ item.abbreviation }}</span> -->
                                <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.chinese_name
                                }}</span>
                                <span style="color: #8492a6; font-size: 12px;margin:0 12px">{{ item.english_name
                                }}</span>
                              </div>
                            </el-option>
                          </el-select>
                        </el-col>
                      </el-row>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="6">
                    <el-form-item label="航班日期：" prop="flight_date">
                      <el-date-picker size="small" value-format="yyyy-MM-dd" v-model="addForm2_1.flight_date"
                        type="date" placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="17">
                    <el-form-item label="备注：">
                      <el-input size="small" maxlength="50" show-word-limit v-model="addForm2_1.remarks"
                        placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <div style="margin-top: 40px" class="nav1 nav3">
            <div class="n-tit1">件重体信息</div>
            <div class="box">
              <el-form :disabled='newIs_sign == 1' style="margin-top: 16px" :model="addForm2_2" ref="addForm2_2" label-width="130px"
                class="demo-addForm" :rules="rules2_2">
                <el-row style="margin-top: 20px" :gutter="10">
                  <el-col :span="6">
                    <el-form-item label="制单件数：" prop="production_units">
                      <el-input size="small" v-model="addForm2_2.production_units" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="制单GW：" prop="maker_gw">
                      <el-input size="small" v-model="addForm2_2.maker_gw" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="制单体积：" prop="maker_volume">
                      <el-input size="small" v-model="addForm2_2.maker_volume" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="制单CW：" prop="maker_cw">
                      <el-input size="small" v-model="addForm2_2.maker_cw" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="6">
                    <el-form-item label="制单密度：" prop="maker_density">
                      <el-input size="small" v-model="addForm2_2.maker_density" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="应收重量：" prop="receivable_weight">
                      <el-input size="small" v-model="addForm2_2.receivable_weight" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <div class="footer-btn">
              <el-row>
                <el-col :span="20">
                  <el-button style="width: 10%" type="danger" @click="onSubmit2_1">签单确认</el-button>
                  <el-button style="width: 10%" type="primary" @click="onSubmit2_2('0')">保存</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="制单" name="3">
          <div class="nav1 nav3">
            <div class="n-tit1">空运信息</div>
            <div class="box">
              <el-form style="margin-top: 16px" :model="addForm3_1" ref="addForm3_1" label-width="130px"
                class="demo-addForm">
                <el-row :gutter="10">
                  <el-col :span="5">
                    <el-form-item label="主单号：">
                      <el-input size="small" v-model="addForm3_1.input1" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="分单号：">
                      <el-input size="small" v-model="addForm3_1.input1" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="5">
                    <el-form-item label="航空公司：">
                      <el-input size="small" v-model="addForm3_1.input1" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="起运港：">
                      <el-input size="small" v-model="addForm3_1.input1" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="目的港：">
                      <el-input size="small" v-model="addForm3_1.input1" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="5">
                    <el-form-item label="制单件数：">
                      <el-input size="small" v-model="addForm3_1.input1" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="制单GW：">
                      <el-input size="small" v-model="addForm3_1.input1" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="制单体积：">
                      <el-input size="small" v-model="addForm3_1.input1" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="制单CW：">
                      <el-input size="small" v-model="addForm3_1.input1" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="5">
                    <el-form-item label="制单密度：">
                      <el-input size="small" v-model="addForm3_1.input1" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="应收重量：">
                      <el-input size="small" v-model="addForm3_1.input1" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="5">
                    <el-form-item label="中文品名：">
                      <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="addForm3_1.input4">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="英文品名：">
                      <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="addForm3_1.input4">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="操作说明：">
                      <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="addForm3_1.input4">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <div style="margin-top: 40px" class="nav1 nav3">
            <div class="n-tit1">价格确认</div>
            <div class="box">
              <div class="float-txt">价格已确认</div>
              <el-row :gutter="10">
                <el-col :span="3"><span class="span-txt">委托件数：60</span></el-col>
                <el-col :span="3"><span class="span-txt">委托重量：72</span></el-col>
                <el-col :span="3"><span class="span-txt">委托体积：10</span></el-col>
                <el-col :span="3"><span class="span-txt">委托密度：56</span></el-col>
                <el-col :span="3"><span class="span-txt">销售卖价：89</span></el-col>
                <el-col :span="3"><span class="span-txt">备注</span></el-col>
              </el-row>
              <el-row :gutter="10" style="margin-top: 16px">
                <el-col :span="3"><span class="span-txt">实际件数：56</span></el-col>
                <el-col :span="3"><span class="span-txt">实际重量：45</span></el-col>
                <el-col :span="3"><span class="span-txt">实际体积：26</span></el-col>
                <el-col :span="3"><span class="span-txt">实际密度：61</span></el-col>
              </el-row>
              <el-row :gutter="10" style="margin-top: 16px">
                <el-col :span="8"><span class="span-txt">确认人/修改人：万小明</span></el-col>
                <el-col :span="10"><span class="span-txt">确认/修改 时间：2022-05-15 12:12:56</span></el-col>
              </el-row>
            </div>
          </div>
          <div style="margin-top: 40px" class="nav1 nav3">
            <div class="n-tit1">起飞确认</div>
            <div class="box">
              <div class="float-txt">起飞已确认</div>
              <el-row :gutter="10">
                <el-col :span="5"><span class="span-txt">航班号：60</span></el-col>
                <el-col :span="5"><span class="span-txt">航班日期：72</span></el-col>
              </el-row>
              <el-row :gutter="10" style="margin-top: 16px">
                <el-col :span="5"><span class="span-txt">确认时间：2022-05-15 12:12:56</span></el-col>
                <el-col :span="5"><span class="span-txt">航线员：万小明</span></el-col>
                <el-col :span="8"><span class="span-txt">备注：</span></el-col>
              </el-row>
            </div>
          </div>
          <div style="margin-top: 40px" class="nav1 nav3">
            <div class="n-tit1">转运确认</div>
            <div class="box">
              <div class="float-txt">转运已确认</div>
              <el-row :gutter="10">
                <el-col :span="5"><span class="span-txt">转运航班：60</span></el-col>
                <el-col :span="5"><span class="span-txt">航班日期：72</span></el-col>
              </el-row>
              <el-row :gutter="10" style="margin-top: 16px">
                <el-col :span="5"><span class="span-txt">确认时间：2022-05-15 12:12:56</span></el-col>
                <el-col :span="5"><span class="span-txt">航线员：万小明</span></el-col>
                <el-col :span="8"><span class="span-txt">备注：</span></el-col>
              </el-row>
            </div>
          </div>
          <div style="margin-top: 40px" class="nav1 nav3">
            <div class="n-tit1">到港确认</div>
            <div class="box">
              <div class="float-txt">已到港</div>
              <el-row :gutter="10" style="margin-top: 16px">
                <el-col :span="5"><span class="span-txt">确认时间：2022-05-15 12:12:56</span></el-col>
                <el-col :span="5"><span class="span-txt">航线员：万小明</span></el-col>
                <el-col :span="8"><span class="span-txt">备注：</span></el-col>
              </el-row>
            </div>
          </div>
          <div class="footer-btn">
            <el-button type="primary" @click="onSubmit3_1">价格确认</el-button>
            <el-button type="primary" @click="onSubmit3_2">起飞确认</el-button>
            <el-button type="primary" @click="onSubmit3_3">转运确认</el-button>
            <el-button type="primary" @click="onSubmit3_4">到港确认</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="制作费用" name="4">
          <div class="btns">
            <el-button @click="addDialogVisible4_2 = true" type="primary">查看利润</el-button>
            <!-- <el-button @click="addDialogVisible4_3 = true" type="primary"
              >费用方案</el-button
            > -->
            <el-button @click="addDialogVisible4_4 = true" type="primary">核算卡</el-button>
            <el-button @click="addDialogVisible4_5 = true" type="primary">黑名单解锁</el-button>
          </div>
          <div class="nav1 nav3">
            <div class="n-tit1">应收费用明细</div>
            <div class="myTable" v-if="activeName == 4">
              <vxe-toolbar>
                <template #buttons>
                  <vxe-button @click="tableData4_1_c1">新增</vxe-button>
                  <vxe-button @click="tableData4_1_c2">单笔审核</vxe-button>
                  <vxe-button @click="tableData4_1_c3">全部审核</vxe-button>
                </template>
              </vxe-toolbar>
              <vxe-table align="center" :loading="loading4_1" :data="tableData4_1">
                <vxe-table-column field="myReceivable" title="审" width="60">
                  <template slot-scope="scope">
                    <el-checkbox @change="change4_1(scope.row)" v-model="scope.row.myReceivable"></el-checkbox>
                  </template>
                </vxe-table-column>
                <vxe-table-column field="myReceivable" title="票" width="60">
                  <template slot-scope="scope">
                    <el-checkbox @change="change4_2(scope.row)" v-model="scope.row.myReceivable"></el-checkbox>
                  </template>
                </vxe-table-column>
                <!-- <vxe-table-column field="id" title="ID"></vxe-table-column> -->
                <vxe-table-column field="input1" title="费用类型" show-overflow></vxe-table-column>
                <vxe-table-column field="radio1" title="结算对象" show-overflow></vxe-table-column>
                <vxe-table-column field="input2" title="方式" show-overflow></vxe-table-column>
                <vxe-table-column field="input3" title="单位" show-overflow></vxe-table-column>
                <vxe-table-column field="input4" title="币种" show-overflow></vxe-table-column>
                <vxe-table-column field="input5" title="数量" show-overflow></vxe-table-column>
                <vxe-table-column field="input6" title="单价" show-overflow></vxe-table-column>
                <vxe-table-column field="input7" title="应收金额" show-overflow></vxe-table-column>
                <vxe-table-column field="input8" title="税价类型" show-overflow></vxe-table-column>
                <vxe-table-column field="input9" title="税率" show-overflow></vxe-table-column>
                <vxe-table-column field="time1" title="税价" show-overflow></vxe-table-column>
                <vxe-table-column field="input10" title="金额(不含税)" show-overflow></vxe-table-column>
                <vxe-table-column field="input10" title="帐单号" show-overflow></vxe-table-column>
                <vxe-table-column field="input10" title="应收日期" show-overflow></vxe-table-column>
                <vxe-table-column field="input10" title="实收金额" show-overflow></vxe-table-column>
                <vxe-table-column field="input10" title="发票号" show-overflow></vxe-table-column>
                <vxe-table-column field="input10" title="发票抬头" show-overflow></vxe-table-column>
                <vxe-table-column field="input10" title="录入人" show-overflow></vxe-table-column>
                <vxe-table-column field="input10" title="录入时间" show-overflow></vxe-table-column>
                <vxe-table-column field="input10" title="审核人" show-overflow></vxe-table-column>
                <vxe-table-column field="input10" title="单号" show-overflow></vxe-table-column>
                <vxe-table-column field="input10" title="汇率" show-overflow></vxe-table-column>
                <vxe-table-column title="操作状态" width="120">
                  <template slot-scope="scope">
                    <div class="flex">
                      <el-button size="small" @click="toEdit4_1(scope.row)" type="text">编辑</el-button>
                      <el-button size="small" @click="toDel4_1(scope.row)" type="text">删除</el-button>
                    </div>
                  </template>
                </vxe-table-column>
              </vxe-table>
            </div>
          </div>
          <div style="margin-top: 40px; margin-bottom: 100px" class="nav1 nav3">
            <div class="n-tit1">应付费用明细</div>
            <div class="myTable" v-if="activeName == 4">
              <vxe-toolbar>
                <template #buttons>
                  <vxe-button @click="tableData4_1_c1">新增</vxe-button>
                  <vxe-button @click="tableData4_1_c2">单笔审核</vxe-button>
                  <vxe-button @click="tableData4_1_c3">全部审核</vxe-button>
                </template>
              </vxe-toolbar>
              <vxe-table align="center" :loading="loading4_1" :data="tableData4_1">
                <vxe-table-column field="myReceivable" title="审" width="60">
                  <template slot-scope="scope">
                    <el-checkbox @change="change4_3(scope.row)" v-model="scope.row.myReceivable"></el-checkbox>
                  </template>
                </vxe-table-column>
                <vxe-table-column field="myReceivable" title="票" width="60">
                  <template slot-scope="scope">
                    <el-checkbox @change="change4_4(scope.row)" v-model="scope.row.myReceivable"></el-checkbox>
                  </template>
                </vxe-table-column>
                <!-- <vxe-table-column field="id" title="ID"></vxe-table-column> -->
                <vxe-table-column field="input1" title="费用类型" show-overflow></vxe-table-column>
                <vxe-table-column field="radio1" title="结算对象" show-overflow></vxe-table-column>
                <vxe-table-column field="input2" title="方式" show-overflow></vxe-table-column>
                <vxe-table-column field="input3" title="单位" show-overflow></vxe-table-column>
                <vxe-table-column field="input4" title="币种" show-overflow></vxe-table-column>
                <vxe-table-column field="input5" title="数量" show-overflow></vxe-table-column>
                <vxe-table-column field="input6" title="单价" show-overflow></vxe-table-column>
                <vxe-table-column field="input7" title="应收金额" show-overflow></vxe-table-column>
                <vxe-table-column field="input8" title="税价类型" show-overflow></vxe-table-column>
                <vxe-table-column field="input9" title="税率" show-overflow></vxe-table-column>
                <vxe-table-column field="time1" title="税价" show-overflow></vxe-table-column>
                <vxe-table-column field="input10" title="金额(不含税)" show-overflow></vxe-table-column>
                <vxe-table-column field="input10" title="帐单号" show-overflow></vxe-table-column>
                <vxe-table-column field="input10" title="应收日期" show-overflow></vxe-table-column>
                <vxe-table-column field="input10" title="实收金额" show-overflow></vxe-table-column>
                <vxe-table-column field="input10" title="发票号" show-overflow></vxe-table-column>
                <vxe-table-column field="input10" title="发票抬头" show-overflow></vxe-table-column>
                <vxe-table-column field="input10" title="录入人" show-overflow></vxe-table-column>
                <vxe-table-column field="input10" title="录入时间" show-overflow></vxe-table-column>
                <vxe-table-column field="input10" title="审核人" show-overflow></vxe-table-column>
                <vxe-table-column field="input10" title="单号" show-overflow></vxe-table-column>
                <vxe-table-column field="input10" title="汇率" show-overflow></vxe-table-column>
                <vxe-table-column title="操作状态" width="120">
                  <template slot-scope="scope">
                    <div class="flex">
                      <el-button size="small" @click="toEdit4_1(scope.row)" type="text">编辑</el-button>
                      <el-button size="small" @click="toDel4_1(scope.row)" type="text">删除</el-button>
                    </div>
                  </template>
                </vxe-table-column>
              </vxe-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="账单" name="5">
          <div class="btns">
            <el-button type="primary">新增</el-button>
            <el-button type="primary">下载</el-button>
          </div>
          <div class="nav1 nav3">
            <div class="n-tit1">应收费用明细</div>
            <div class="myTable" v-if="activeName == 5">
              <vxe-table align="center" :data="tableData5_1">
                <vxe-column title="核销" type="checkbox" width="100"></vxe-column>
                <vxe-table-column field="input1" title="账单" show-overflow></vxe-table-column>
                <vxe-table-column field="radio1" title="结算单位" show-overflow></vxe-table-column>
                <vxe-table-column field="input2" title="制单人" show-overflow></vxe-table-column>
                <vxe-table-column field="input3" title="生成日期" show-overflow></vxe-table-column>
                <vxe-table-column field="input4" title="币种" show-overflow></vxe-table-column>
                <vxe-table-column field="input5" title="金额" show-overflow></vxe-table-column>
                <vxe-table-column field="input6" title="已销金额" show-overflow></vxe-table-column>
                <vxe-table-column field="input7" title="附加说明" show-overflow></vxe-table-column>
                <vxe-column title="审核" type="checkbox" width="100"></vxe-column>
                <vxe-table-column title="操作状态" width="120">
                  <template slot-scope="scope">
                    <div class="flex">
                      <el-button size="small" @click="toEdit5_1(scope.row)" type="text">编辑</el-button>
                      <el-button size="small" @click="toDel5_1(scope.row)" type="text">删除</el-button>
                    </div>
                  </template>
                </vxe-table-column>
              </vxe-table>
            </div>
          </div>
          <div style="margin-top: 40px; margin-bottom: 100px" class="nav1 nav3">
            <div class="n-tit1">发票信息</div>
            <div class="myTable" v-if="activeName == 5">
              <vxe-table align="center" :data="tableData5_2">
                <vxe-column title="发票" type="checkbox" width="100"></vxe-column>
                <vxe-table-column field="input1" title="费用类型" show-overflow></vxe-table-column>
                <vxe-table-column field="radio1" title="结算对象" show-overflow></vxe-table-column>
                <vxe-table-column field="input2" title="方式" show-overflow></vxe-table-column>
                <vxe-table-column field="input3" title="箱型" show-overflow></vxe-table-column>
                <vxe-table-column field="input4" title="按数量" show-overflow></vxe-table-column>
                <vxe-table-column field="input5" title="币种" show-overflow></vxe-table-column>
                <vxe-table-column field="input6" title="数量" show-overflow></vxe-table-column>
                <vxe-table-column field="input7" title="单价" show-overflow></vxe-table-column>
                <vxe-table-column field="input7" title="应收金额" show-overflow></vxe-table-column>
                <vxe-table-column field="input7" title="录入人" show-overflow></vxe-table-column>
                <vxe-table-column field="input7" title="帐单号" show-overflow></vxe-table-column>
                <vxe-table-column field="input7" title="佣金" show-overflow></vxe-table-column>
                <vxe-table-column field="input7" title="佣金比例" show-overflow></vxe-table-column>
                <vxe-table-column field="input7" title="请款单号" show-overflow></vxe-table-column>
                <vxe-table-column field="input7" title="发票号" show-overflow></vxe-table-column>
                <vxe-table-column field="input7" title="工作号" show-overflow></vxe-table-column>
                <vxe-table-column field="input7" title="附加说明" show-overflow></vxe-table-column>
                <vxe-table-column title="操作状态" width="120">
                  <template slot-scope="scope">
                    <div class="flex">
                      <el-button size="small" @click="toEdit5_2(scope.row)" type="text">编辑</el-button>
                      <el-button size="small" @click="toDel5_2(scope.row)" type="text">删除</el-button>
                    </div>
                  </template>
                </vxe-table-column>
              </vxe-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="文件附件" name="6">
          <div class="btns">
            <el-button @click="companyList" type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
          </div>
          <div class="txttt">
            请上传pdf、JPG、PNG、Doc格式文件上传，且不可大于100M
          </div>
          <div class="nav1 nav3">
            <div class="myTable" v-if="activeName == 6">
              <vxe-table align="center" :data="tableData6_1">
                <vxe-table-column field="input1" title="文件名" show-overflow width="500"></vxe-table-column>
                <vxe-table-column field="radio1" title="文件类型" show-overflow></vxe-table-column>
                <vxe-table-column field="input2" title="占用空间" show-overflow></vxe-table-column>
                <vxe-table-column field="input3" title="附件" show-overflow></vxe-table-column>
                <vxe-table-column field="input4" title="创建人" show-overflow></vxe-table-column>
                <vxe-table-column field="input5" title="创建日期" show-overflow></vxe-table-column>
                <vxe-table-column field="input6" title="源途径" show-overflow></vxe-table-column>
                <vxe-table-column field="input7" title="备注" show-overflow></vxe-table-column>
                <vxe-table-column title="操作状态" width="120">
                  <template slot-scope="scope">
                    <div class="flex">
                      <el-button size="small" @click="toEdit6_1(scope.row)" type="text">重新上传</el-button>
                      <el-button size="small" @click="toDel6_1(scope.row)" type="text">删除</el-button>
                    </div>
                  </template>
                </vxe-table-column>
              </vxe-table>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 签单确认 -->
    <el-dialog title="签单确认" :visible.sync="addDialogVisible2_1" width="700px" :before-close="addHandleClose2_1">
      <div class="dia2_1">
        <div class="tit1">
          <div class="txt1-1">确认人</div>
          <div class="txt1-2">{{realname}}</div>
        </div>
        <div class="tit1" style="margin-top: 20px">
          <div class="txt1-1">确认时间</div>
          <div class="txt1-2">{{now}}</div>
        </div>
        <div class="btns">
          <el-button style="width: 100px" @click="addDialogVisible2_1 = false">取消</el-button>
          <el-button style="margin-left: 60px; width: 100px" type="primary" @click="onSubmit2_2('1')">确认</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 价格确认 -->
    <el-dialog title="价格确认" :visible.sync="addDialogVisible3_1" width="900px" :before-close="addHandleClose3_1">
      <div class="dia3_1">
        <el-form style="margin-top: 16px" :model="addFormDia3_1" ref="addFormDia3_1" label-width="130px"
          class="demo-addForm">
          <el-row :gutter="10">
            <el-col :span="11">
              <el-form-item label="委托件数：" prop="input1">
                <el-input size="small" v-model="addFormDia3_1.input1" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="委托重量：" prop="input1">
                <el-input size="small" v-model="addFormDia3_1.input1" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="11">
              <el-form-item label="委托体积：" prop="input1">
                <el-input size="small" v-model="addFormDia3_1.input1" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="委托密度：" prop="input1">
                <el-input size="small" v-model="addFormDia3_1.input1" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="11">
              <el-form-item label="销售卖家：" prop="input1">
                <el-input size="small" v-model="addFormDia3_1.input1" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="备注：" prop="input1">
                <el-input size="small" v-model="addFormDia3_1.input1" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="heng"></div>
          <el-row style="margin-top: 24px" :gutter="10">
            <el-col :span="11">
              <el-form-item label="实际件数：" prop="input1">
                <el-input size="small" v-model="addFormDia3_1.input1" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="实际重量：" prop="input1">
                <el-input size="small" v-model="addFormDia3_1.input1" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="11">
              <el-form-item label="实际体积：" prop="input1">
                <el-input size="small" v-model="addFormDia3_1.input1" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="实际密度：" prop="input1">
                <el-input size="small" v-model="addFormDia3_1.input1" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="footer-btn">
            <el-button style="width: 140px" @click="addDialogVisible3_1 = false">取消</el-button>
            <el-button style="margin-left: 20px; width: 140px" type="primary" @click="onSubmitDia3_1">确认</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
    <!-- 起飞确认 -->
    <el-dialog title="起飞确认" :visible.sync="addDialogVisible3_2" width="600px" :before-close="addHandleClose3_2">
      <div class="dia3_1">
        <el-form style="margin-top: 16px" :model="addFormDia3_2" ref="addFormDia3_2" label-width="130px"
          class="demo-addForm">
          <el-row :gutter="10">
            <el-col :span="21">
              <el-form-item label="航班号：" prop="input1">
                <el-input size="small" v-model="addFormDia3_2.input1" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="21">
              <el-form-item label="航班日期：" prop="input1">
                <el-date-picker size="small" value-format="yyyy-MM-dd" v-model="addFormDia3_2.time1" type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="21">
              <el-form-item label="备注：" prop="input1">
                <el-input size="small" v-model="addFormDia3_2.input1" placeholder="请输入内容" type="textarea" :rows="4">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="footer-btn">
            <el-button style="width: 140px" @click="addDialogVisible3_2 = false">取消</el-button>
            <el-button style="margin-left: 20px; width: 140px" type="primary" @click="onSubmitDia3_2">确认</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
    <!-- 转运确认 -->
    <el-dialog title="转运确认" :visible.sync="addDialogVisible3_3" width="600px" :before-close="addHandleClose3_3">
      <div class="dia3_1">
        <el-form style="margin-top: 16px" :model="addFormDia3_3" ref="addFormDia3_3" label-width="130px"
          class="demo-addForm">
          <el-row :gutter="10">
            <el-col :span="21">
              <el-form-item label="转运航班：" prop="input1">
                <el-input size="small" v-model="addFormDia3_3.input1" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="21">
              <el-form-item label="航班日期：" prop="input1">
                <el-date-picker size="small" value-format="yyyy-MM-dd" v-model="addFormDia3_3.time1" type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="21">
              <el-form-item label="备注：" prop="input1">
                <el-input size="small" v-model="addFormDia3_3.input1" placeholder="请输入内容" type="textarea" :rows="4">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="footer-btn">
            <el-button style="width: 140px" @click="addDialogVisible3_3 = false">取消</el-button>
            <el-button style="margin-left: 20px; width: 140px" type="primary" @click="onSubmitDia3_3">确认</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
    <!-- 到港确认 -->
    <el-dialog title="到港确认" :visible.sync="addDialogVisible3_4" width="600px" :before-close="addHandleClose3_4">
      <div class="dia3_4">
        <div class="tit">
          <i class="el-icon-warning"></i>
          <div class="txt">确认货运已经到港</div>
        </div>

        <div class="footer-btn">
          <el-button style="width: 140px" @click="addDialogVisible3_4 = false">取消</el-button>
          <el-button style="margin-left: 20px; width: 140px" type="primary" @click="onSubmitDia3_4">确认</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 新增应收费用 -->
    <el-dialog title="新增应收费用" :visible.sync="addDialogVisible4_1" width="1100px" :before-close="addHandleClose4_1">
      <div class="dia4_1 dia3_4">
        <el-form style="margin-top: 16px" :model="addFormDia4_1" ref="addFormDia4_1" label-width="110px"
          class="demo-addForm">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="费用类型：" prop="input1">
                <el-select size="small" v-model="addFormDia4_1.sele5">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结算对象：" prop="input1">
                <el-select style="margin-left: 10px; width: 100%" filterable size="small" v-model="addFormDia4_1.sele2"
                  placeholder="请选择">
                  <el-option label="中国" value="China">
                    <div style="display: flex; justify-content: space-between">
                      <span>中国</span>
                      <span style="color: #8492a6; font-size: 12px;margin:0 12px">CN</span>
                      <span style="color: #8492a6; font-size: 12px;margin:0 12px">China</span>
                    </div>
                  </el-option>
                  <el-option label="美国" value="America">
                    <div style="display: flex; justify-content: space-between">
                      <span>美国</span>
                      <span style="color: #8492a6; font-size: 12px;margin:0 12px">USA</span>
                      <span style="color: #8492a6; font-size: 12px;margin:0 12px">America</span>
                    </div>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="方式：" prop="input1">
                <el-select size="small" v-model="addFormDia4_1.sele5">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="5">
              <el-form-item label="单位：" prop="input1">
                <el-select size="small" v-model="addFormDia4_1.sele5">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="币种：" prop="input1">
                <el-select size="small" v-model="addFormDia4_1.sele5">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="数量：" prop="input1">
                <el-input size="small" v-model="addFormDia4_1.input1" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="单价：" prop="input1">
                <el-input size="small" v-model="addFormDia4_1.input1" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="5">
              <el-form-item label="应收金额：" prop="input1">
                <el-input size="small" v-model="addFormDia4_1.input1" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="税价类型：" prop="input1">
                <el-select size="small" v-model="addFormDia4_1.sele5">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="税率：" prop="input1">
                <el-select size="small" v-model="addFormDia4_1.sele5">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="税价：" prop="input1">
                <el-input size="small" v-model="addFormDia4_1.input1" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="金额(不含税)：" prop="input1">
                <el-input size="small" v-model="addFormDia4_1.input1" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="帐单号：" prop="input1">
                <el-input size="small" v-model="addFormDia4_1.input1" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="应收日期：" prop="input1">
                <el-date-picker size="small" value-format="yyyy-MM-dd" v-model="addFormDia4_1.time1" type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="5">
              <el-form-item label="实收金额：" prop="input1">
                <el-input size="small" v-model="addFormDia4_1.input1" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="发票号：" prop="input1">
                <el-input size="small" v-model="addFormDia4_1.input1" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="发票抬头：" prop="input1">
                <el-input size="small" v-model="addFormDia4_1.input1" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="录入人：" prop="input1">
                <el-input size="small" v-model="addFormDia4_1.input1" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="审核人：" prop="input1">
                <el-input size="small" v-model="addFormDia4_1.input1" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单号：" prop="input1">
                <el-input size="small" v-model="addFormDia4_1.input1" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="汇率：" prop="input1">
                <el-input size="small" v-model="addFormDia4_1.input1" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="footer-btn">
            <el-button style="width: 140px" @click="addDialogVisible4_1 = false">取消</el-button>
            <el-button style="margin-left: 20px; width: 140px" type="primary" @click="onSubmitDia4_1">确认</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
    <!-- 查看利润 -->
    <el-dialog title="查看利润" :visible.sync="addDialogVisible4_2" width="600px" :before-close="addHandleClose4_2">
      <div class="dia3_1">
        <div class="myTable">
          <vxe-table align="center" :data="tableData4_2">
            <vxe-table-column field="input7" title="币种" show-overflow></vxe-table-column>
            <vxe-table-column field="input8" title="应收金额" show-overflow></vxe-table-column>
            <vxe-table-column field="input9" title="应付金额" show-overflow></vxe-table-column>
            <vxe-table-column field="time1" title="利润金额" show-overflow></vxe-table-column>
            <vxe-table-column field="input10" title="汇率" show-overflow></vxe-table-column>
          </vxe-table>
        </div>
        <el-form style="margin-top: 16px" :model="addFormDia4_2" ref="addFormDia4_2" label-width="100px"
          class="demo-addForm">
          <el-row :gutter="10">
            <el-col :span="11">
              <el-form-item label="折合：" prop="input1">
                <el-select size="small" v-model="addFormDia4_2.sel1" placeholder="请选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="应收合计：">
                <el-input size="small" v-model="addFormDia4_2.input1" placeholder="请输入内容" :rows="4"></el-input>
              </el-form-item>
              <el-form-item label="应付合计：">
                <el-input size="small" v-model="addFormDia4_2.input2" placeholder="请输入内容" :rows="4"></el-input>
              </el-form-item>
              <el-form-item label="利润合计：">
                <el-input size="small" v-model="addFormDia4_2.input3" placeholder="请输入内容" :rows="4"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="footer-btn">
            <el-button style="width: 140px" @click="addDialogVisible4_2 = false">取消</el-button>
            <el-button style="margin-left: 20px; width: 140px" type="primary" @click="onSubmitDia4_2">确认</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
    <!-- 费用方案 -->
    <el-dialog title="费用方案" :visible.sync="addDialogVisible4_3" width="900px" :before-close="addHandleClose4_3">
      <div class="dia3_1">
        <el-radio-group style="margin-bottom: 20px" v-model="addFormDia4_3.radio2" size="small">
          <el-radio-button label="收入类型"></el-radio-button>
          <el-radio-button label="支出类型"></el-radio-button>
        </el-radio-group>
        <div class="myTable">
          <vxe-table align="center" :data="tableData4_3">
            <vxe-table-column field="input7" title="币种" show-overflow></vxe-table-column>
            <vxe-table-column field="input8" title="应收金额" show-overflow></vxe-table-column>
            <vxe-table-column field="input9" title="应付金额" show-overflow></vxe-table-column>
            <vxe-table-column field="time1" title="利润金额" show-overflow></vxe-table-column>
            <vxe-table-column field="input10" title="汇率" show-overflow></vxe-table-column>
          </vxe-table>
        </div>
      </div>
    </el-dialog>
    <!-- 核算卡 -->
    <el-dialog title="核算卡" :visible.sync="addDialogVisible4_4" width="600px" :before-close="addHandleClose4_4">
      <div class="dia3_1"></div>
    </el-dialog>
    <!-- 黑名单解锁 -->
    <el-dialog title="黑名单解锁" :visible.sync="addDialogVisible4_5" width="900px" :before-close="addHandleClose4_5">
      <div class="dia3_1">
        <div class="myTable">
          <vxe-table align="center" :data="tableData4_5">
            <vxe-table-column field="myReceivable" title="选择" width="60">
              <template slot-scope="scope">
                <el-checkbox @change="change4_5(scope.row)" v-model="scope.row.myReceivable"></el-checkbox>
              </template>
            </vxe-table-column>
            <vxe-table-column field="input7" title="客户名称" show-overflow></vxe-table-column>
            <vxe-table-column field="input8" title="超期天数" show-overflow></vxe-table-column>
            <vxe-table-column field="input9" title="超期金额" show-overflow></vxe-table-column>
            <vxe-table-column field="time1" title="状态" show-overflow></vxe-table-column>
            <vxe-table-column field="input10" title="加入黑名单日期" show-overflow></vxe-table-column>
            <vxe-table-column field="input10" title="临时延时天数" show-overflow></vxe-table-column>
            <vxe-table-column field="input10" title="临时延时额度" show-overflow></vxe-table-column>
            <vxe-table-column title="操作" width="80">
              <template slot-scope="scope">
                <div class="flex">
                  <el-button size="small" @click="toEdit4_5(scope.row)" type="text">明细</el-button>
                </div>
              </template>
            </vxe-table-column>
          </vxe-table>
        </div>
        <el-form style="margin-top: 16px" :model="addFormDia4_5" ref="addFormDia4_5" label-width="140px"
          class="demo-addForm">
          <el-row :gutter="10">
            <el-col :span="10">
              <el-form-item label="临时增加金额：">
                <el-input size="small" v-model="addFormDia4_5.input1" placeholder="请输入内容" :rows="4"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="临时增加天数：">
                <el-input size="small" v-model="addFormDia4_5.input1" placeholder="请输入内容" :rows="4"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="footer-btn">
            <el-button style="width: 140px" @click="addDialogVisible4_5 = false">取消</el-button>
            <el-button style="margin-left: 20px; width: 140px" type="primary" @click="onSubmitDia4_5_1">锁定</el-button>
            <el-button style="margin-left: 20px; width: 140px" type="primary" @click="onSubmitDia4_5_2">解锁</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
    <div v-if="activeName == 4" class="footer_float">
      <div class="txt1">应收已审核</div>
      <div class="txt2">应付已审核</div>
      <div class="txt3">
        <div class="txt3-1">费用状态</div>
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <input type="file" name="companyLogo" id="file0" class="displayN" multiple="multiple" @change="companyLogo($event)"
      ref="fileInputList" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["chukouObj"]),
  },
  directives: {
    'el-select-loadmore': {
      bind(el, binding) {
        // 获取element-ui定义好的scroll盒子
        const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
        SELECTWRAP_DOM.addEventListener('scroll', function () {
          /**
          * scrollHeight 获取元素内容高度(只读)
          * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚        动 条, 那它的scrollTop的值默认为0.
          * clientHeight 读取元素的可见高度(只读)
          * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
          * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
          */
          const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
          if (condition) {
            console.log(binding)
            binding.value();
          }
        });
      }
    }
  },
  data() {
    // var check_order = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error('请输入主单号'));
    //   }
    //   setTimeout(async () => {
    //     const res = await this.$api.check_orderprimaryno({
    //       primary_no: value,
    //     })
    //     console.log(res)
    //     if (res.result == 1) {
    //       if (res.check_status == 1) {
    //         this.tooltipFlag = true;
    //         this.tooltipContent = '有相同的主单号'
    //         // callback(new Error('未有相同的主单号'));
    //       } else {
    //         this.tooltipFlag = false;
    //         // callback();
    //       }
    //     }
    //   }, 300);
    // };
    return {
      tooltipFlag: false,
      tooltipContent: "",
      options: [],
      activeName: "1",
      addForm1_1: {
        operation_time: "",
        operator_id: "",
        sale_id: "",
        customerservice_id: "",
        client_id: '',
        airlinepersonnel_id: '',
      },
      rules1_1: {
        input1: [{ required: true, message: "请输入工作号", trigger: "blur" }],
        operator_id: [
          { required: true, message: "请选择操作员", trigger: "change" },
        ],
        sale_id: [
          { required: true, message: "请选择销售员", trigger: "change" },
        ],
        client_id: [
          { required: true, message: "请选择委托单位", trigger: "change" },
        ],
        airlinepersonnel_id: [
          { required: true, message: "请选择航线人员", trigger: "change" },
        ],
        customerservice_id: [
          { required: true, message: "请选择客服人员", trigger: "change" },
        ],
        operation_time: [
          {
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
      addForm1_2: {
        receivingaddress_id: "",
        portdeparture_id: "",
        selling_price: "",
        allin: "ALLIN",
        finalcountry_id: "",
        portdestination_id: "",
        number_entrustedpieces: "",
        entrusted_volume: "",
        package_typeid: "",
        weight_unit: '',
        entrusted_weight: "",
        price_remarks: "",
        commission_density: "",
        flight_requirements: "",
        goodsarrival_date: "",
        arrival_date: "",
        delivery_method: "",
        declaration_method: "",
        chinese_productname: "",
        english_productname: "",
        mark_numbers: "",
        operating_instructions: "",
      },
      rules1_2: {
        selling_price: [{ required: true, message: "请输入销售卖价", trigger: "blur" }],
        allin: [{ required: true, message: "请输入ALLIN", trigger: "blur" }],
        receivingaddress_id: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        portdeparture_id: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        finalcountry_id: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        portdestination_id: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        number_entrustedpieces: [{ required: true, message: "请输入委托件数", trigger: "blur" }],
        entrusted_volume: [{ required: true, message: "请输入委托体积", trigger: "blur" }],
        package_typeid: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        weight_unit: [{ required: true, message: "请输入重量单位", trigger: "blur" }],
        entrusted_weight: [{ required: true, message: "请输入委托重量", trigger: "blur" }],
        commission_density: [{ required: true, message: "请输入委托密度", trigger: "blur" }],
        goodsarrival_date: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        arrival_date: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        delivery_method: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        declaration_method: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        chinese_productname: [{ required: true, message: "请输入中文品名", trigger: "blur" }],
      },
      addForm1_3: {
        business_type: "",
        primary_no: "",
        airline_companyid: "",
        booking_agentid: "",
        carrier_id: "",
        product: "",
      },
      rules1_3: {
        primary_no: [{ required: true, message: "请输入主单号", trigger: "blur" }],
        business_type: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        airline_companyid: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        booking_agentid: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        carrier_id: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        product: [
          { required: true, message: "请选择", trigger: "change" },
        ],
      },
      addForm2_1: {
        selling_price: "",
        allin: "ALLIN",
        freight_bill: "",
        carrier_allin: "ALLIN",
        safety_fee: "",
        fuel_cost: "",
        carrier_safetyfee: "",
        carrier_fuelcost: "",
        primary_no: "",
        port_consignedid: "",
        port_destinationid: "",
        flight_date: "",
        remarks: "",
      },
      rules2_1: {
        selling_price: [{ required: true, message: "请输入销售卖价", trigger: "blur" }],
        freight_bill: [{ required: true, message: "请输入成本运价", trigger: "blur" }],
        flight_date: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
      },
      addForm2_2: {
        production_units: '',
        maker_gw: "",
        maker_volume: "",
        maker_cw: "",
        maker_density: "",
      },
      rules2_2: {
        production_units: [{ required: true, message: "请输入制单件数", trigger: "blur" }],
        maker_gw: [{ required: true, message: "请输入制单GW", trigger: "blur" }],
        maker_volume: [{ required: true, message: "请输入制单体积", trigger: "blur" }],
        maker_cw: [{ required: true, message: "请输入制单CW", trigger: "blur" }],
        maker_density: [{ required: true, message: "请输入制单密度", trigger: "blur" }],
        receivable_weight: [{ required: true, message: "请输入应收重量", trigger: "blur" }],
        sele1: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        sele2: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        sele3: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        sele4: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        sele5: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        sele6: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        sele7: [
          { required: true, message: "请选择", trigger: "change" },
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
      addForm3_1: {},
      addDialogVisible2_1: false,
      addDialogVisible3_1: false,
      addFormDia3_1: {},
      addDialogVisible3_2: false,
      addFormDia3_2: {},
      addDialogVisible3_3: false,
      addFormDia3_3: {},
      addDialogVisible3_4: false,
      tableData4_1: [],
      loading4_1: true,
      options1: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
      addDialogVisible4_1: false,
      addFormDia4_1: {},
      addDialogVisible4_2: false,
      addFormDia4_2: {},
      tableData4_2: [],
      addDialogVisible4_3: false,
      addFormDia4_3: {},
      tableData4_3: [],
      addDialogVisible4_4: false,
      addDialogVisible4_5: false,
      addFormDia4_5: {},
      tableData4_5: [],
      tableData5_1: [],
      tableData5_2: [],
      tableData6_1: [],
      stepIndex: 1,
      ddObj: {},
      post_id: "",//==8
      kfList: [],
      khList1: [],
      khList2: [],
      loading: false,
      xsList: [],
      KHpage1: 1,
      KHpage2: 1,
      khKeyword: '',
      jcList: [],
      bzList: [],
      hdfsList: [],
      bgfsList: [],
      ywlxList: [],
      cpList: [],
      realname:"",
      login_userid:"",
      now:"",
      newIs_sign:"",
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading4_1 = false;
    }, 1000);
  },
  created() {
    console.log(this.chukouObj)
    this.getData()
    this.getKHList()
    this.khList2 = [...this.khList1]
    this.getKFList()
    this.getXSList()
    this.getJCList()
    this.getGJList()
    this.getBZList()
    this.getHDFSList()
    this.getBGFSList()
    this.getYWLXList()
    this.getCPList()
    this.getUserData()
  },
  methods: {
    async getData() {
      const res = await this.$api.view_userorder({
        order_id: this.chukouObj.order_id
      })
      console.log(res)
      this.ddObj = res
      for (const key in res) {
        if (res[key] == 0) {
          res[key] = ''
        }
        if (key in this.addForm1_1) {
          this.addForm1_1[key] = res[key]
        }
        if (key in this.addForm1_2) {
          this.addForm1_2[key] = res[key]
        }
        if (key in this.addForm1_3) {
          this.addForm1_3[key] = res[key]
        }
      }
      this.addForm1_2.allin = 'ALLIN'
      this.addForm1_3.business_type = res.business_typeid
      this.addForm1_2.delivery_method = res.delivery_methodid
      this.addForm1_2.declaration_method = res.declaration_methodid
      this.newIs_sign = res.is_sign;
      this.procedure = res.procedure;
      this.stepIndex = this.procedure.length + 1
    },
    // async getKHList(mode='page1') {
    //   const res = await this.$api.customer_list({
    //     page: mode == 'page1' ? this.KHpage1 : this.KHpage2,
    //     pagesize: 30,
    //     keyword:this.khKeyword
    //   })
    //   if(mode == 'page1'){
    //     this.khList1 = this.khList1.concat(res.list);
    //   }else{
    //     // this.khList2 = res.list;
    //     this.khList2 = this.khList2.concat(res.list);
    //   }
    // },
    async getKHList() {
      const res = await this.$api.customer_list({
        page: 1,
        pagesize: 300,
        keyword: this.khKeyword
      })
      this.khList1 = res.list
    },
    async getGJList() {
      const res = await this.$api.country_list({
        page: 1,
        pagesize: 10000,
      })
      this.gjList = res.list;
    },
    async getBZList() {
      const res = await this.$api.package()
      this.bzList = res.list;
    },
    async getHDFSList() {
      const res = await this.$api.delivery_method()
      this.hdfsList = res.list;
    },
    async getYWLXList() {
      const res = await this.$api.business_type()
      this.ywlxList = res.list;
    },
    async getBGFSList() {
      const res = await this.$api.customs_method()
      this.bgfsList = res.list;
    },
    async getCPList() {
      const res = await this.$api.product_type()
      this.cpList = res.list;
    },
    async getJCList() {
      const res = await this.$api.list_airport({
        page: 1,
        pagesize: 10000,
      })
      this.jcList = res.list;
    },
    async getKFList() {
      const res = await this.$api.user_list({
        post_id: 8,
        page: 1,
        pagesize: 1000,
      })
      this.kfList = res.list;
    },
    async getXSList() {
      const res = await this.$api.user_list({
        post_id: 3,
        page: 1,
        pagesize: 1000,
      })
      this.xsList = res.list;
    },
    async getUserData() {
      const res = await this.$api.read_userinfo()
      this.post_id = res.login_user.post_id
    },
    async checkOrder(e) {
      const res = await this.$api.check_orderprimaryno({
        primary_no: e,
      })
      console.log(res)
      if (res.result == 1) {
        if (res.check_status == 1) {
          this.tooltipFlag = true;
          this.tooltipContent = '有相同的主单号'
        } else {
          this.tooltipFlag = false;
        }
      }
    },
    async changeStepBox(step){
      const res = await this.$api.operate_procedure({
        order_id: this.chukouObj.order_id,
        types:step
      })
      this.$message(res.msg)
      if(res.result == 1){
        this.getData()
      }
    },
    loadmore1() {
      this.KHpage1++
      this.getKHList('page1');
    },
    remoteMethod1(query) {
      console.log(query)
      this.khKeyword = query
      this.getKHList('page1');
      // if (query !== '') {
      //   this.loading = true;
      //   setTimeout(() => {
      //     this.loading = false;
      //     this.options = this.list.filter(item => {
      //       return item.label.toLowerCase()
      //         .indexOf(query.toLowerCase()) > -1;
      //     });
      //   }, 200);
      // }
    },
    // 上传
    companyList() {
      this.$refs.fileInputList.click();
    },
    companyLogo(event) {
      var file = event.target.files[0];
      this.imgFile = file;
      this.uploading(true);
      this.$refs.fileInputList.value = "";
    },
    //将文件转为blob类型
    readFileAsBuffer(file) {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.readAsDataURL(file);
        reader.onload = function () {
          const base64File = reader.result.replace(
            /^data:\w+\/\w+;base64,/,
            ""
          );
          resolve(new window.OSS.Buffer(base64File, "base64"));
        };
      });
    },
    async uploading(flag) {
      // console.log(document.getElementById("file0").value);
      if (flag) {
        var file_re = await this.readFileAsBuffer(this.imgFile);
        const res = await this.$api.uploadToken();
        let myData = res.data;
        console.log(myData);
        let client = new window.OSS.Wrapper({
          region: myData.region, //oss地址
          accessKeyId: myData.accessKeyId, //ak
          accessKeySecret: myData.accessKeySecret, //secret
          stsToken: myData.stsToken,
          bucket: myData.bucket, //oss名字
        });
        var imgtype = this.imgFile.type.substr(6, 4);
        var store = `${new Date().getTime()}.${imgtype}`;
        client.put(store, file_re).then(() => {
          //这个结果就是url
          console.log(store);
          // var oss_imgurl = client.signatureUrl(store);
          var oss_imgurl = `https://${myData.bucket}.${myData.url}/${store}`;
          this.$set(this.ruleForm, "image", oss_imgurl);
          console.log(oss_imgurl);
        });
      }
    },
    change4_1(row) {
      console.log(row);
      // const res = await this.$api.update_costtypes({
      //   ...row,
      //   receivable: row.myReceivable == true ? "1" : "2",
      //   commission: row.myCommission == true ? "1" : "0",
      //   id: row.id,
      // });
      // this.$message(res.msg);
      // if (res.result == 1) {
      //   this.getData();
      // }
    },
    change4_2(row) {
      console.log(row);
    },
    change4_3(row) {
      console.log(row);
    },
    change4_4(row) {
      console.log(row);
    },
    change4_5(row) {
      console.log(row);
    },
    toEdit4_1(row) {
      console.log(row);
    },
    toDel4_1(row) {
      console.log(row);
    },
    toEdit5_1(row) {
      console.log(row);
    },
    toDel5_1(row) {
      console.log(row);
    },
    toEdit5_2(row) {
      console.log(row);
    },
    toDel5_2(row) {
      console.log(row);
    },
    toEdit6_1(row) {
      console.log(row);
    },
    toDel6_1(row) {
      console.log(row);
    },
    async AddDiaOnSubmit1() {
      let i = 0
      console.log(this.addForm1_1, this.addForm1_2, this.addForm1_3)
      this.$refs['addForm1_3'].validate((valid) => {
        if (valid) {
          i++
        }
      });
      this.$refs['addForm1_2'].validate((valid) => {
        if (valid) {
          i++
        }
      });
      this.$refs['addForm1_1'].validate((valid) => {
        if (valid) {
          i++
        }
      });
      console.log(i)
      if (i == 3) {
        const res = await this.$api.update_userorder({
          ...this.addForm1_1,
          ...this.addForm1_2,
          ...this.addForm1_3,
          order_id: this.chukouObj.order_id,
        })
        this.$message(res.msg);
        if (res.result == 1) {
          console.log(res)
          setTimeout(() => {
            this.getData()
            this.activeName = '2'
            this.addForm2_1.port_consignedid = this.addForm1_2.portdeparture_id
            this.addForm2_1.port_destinationid = this.addForm1_2.portdestination_id
            this.addForm2_1.carrier_id = this.addForm1_3.carrier_id
          }, 500)
        }
      }
    },
    async onSubmit2_2(is_sign) { 
      let i = 0
      console.log(this.addForm2_1, this.addForm2_2)
      this.$refs['addForm2_1'].validate((valid) => {
        if (valid) {
          i++
        }
      });
      this.$refs['addForm2_2'].validate((valid) => {
        if (valid) {
          i++
        }
      });
      console.log(i)
      if (i == 2) {
        const res = await this.$api.user_signature({
          ...this.addForm2_1,
          ...this.addForm2_2,
          primary_no:this.addForm1_3.primary_no,
          order_id: this.chukouObj.order_id,
          is_sign:is_sign,
          sign_time:this.now,
          sign_userid:this.login_userid
        })
        this.$message(res.msg);
        if (res.result == 1) {
          console.log(res)
          setTimeout(() => {
            this.getData()
            this.activeName = '2'
            this.addDialogVisible2_1 = false;
          }, 500)
        }
      }
    },
    async onSubmit2_1() {
      const res = await this.$api.read_userinfo()
      this.realname = res.login_user.realname;
      this.login_userid = res.login_userid;
      this.now = res.now
      this.addDialogVisible2_1 = true;
    },
    onSubmit3_1() {
      this.addDialogVisible3_1 = true;
    },
    onSubmitDia3_1() {
      console.log(this.addFormDia3_1);
    },
    onSubmit3_2() {
      this.addDialogVisible3_2 = true;
    },
    onSubmit3_3() {
      this.addDialogVisible3_3 = true;
    },
    onSubmit3_4() {
      this.addDialogVisible3_4 = true;
    },
    onSubmitDia3_2() {
      console.log(this.addFormDia3_2);
    },
    onSubmitDia3_3() {
      console.log(this.addFormDia3_3);
    },
    onSubmitDia3_4() {
      this.addDialogVisible3_4 = false;
      // console.log(this.addFormDia3_4);
    },
    onSubmitDia4_1() {
      console.log(this.addFormDia4_1);
    },
    onSubmitDia4_2() {
      console.log(this.addFormDia4_2);
    },
    onSubmitDia4_5_1() { },
    onSubmitDia4_5_2() { },
    tableData4_1_c1() {
      this.addDialogVisible4_1 = true;
    },
    tableData4_1_c2() { },
    tableData4_1_c3() { },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    addHandleClose2_1() {
      this.addDialogVisible2_1 = false;
    },
    addHandleClose3_1() {
      this.addDialogVisible3_1 = false;
    },
    addHandleClose3_2() {
      this.addDialogVisible3_2 = false;
    },
    addHandleClose3_3() {
      this.addDialogVisible3_3 = false;
    },
    addHandleClose3_4() {
      this.addDialogVisible3_4 = false;
    },
    addHandleClose4_1() {
      this.addDialogVisible4_1 = false;
    },
    addHandleClose4_2() {
      this.addDialogVisible4_2 = false;
    },
    addHandleClose4_3() {
      this.addDialogVisible4_3 = false;
    },
    addHandleClose4_4() {
      this.addDialogVisible4_4 = false;
    },
    addHandleClose4_5() {
      this.addDialogVisible4_5 = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.index {
  position: relative;
}

.stepbox {
  display: flex;
  flex-direction: column;

  .el-button--small {
    width: 80px;
  }
}

.footer_float {
  position: fixed;
  bottom: 0px;
  background: #fff;
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 30px;

  .txt1 {
    color: #67c23a;
    font-size: 16px;
  }

  .txt2 {
    margin-left: 30px;
    margin-right: 50px;
    color: #f56c6c;
    font-size: 16px;
  }

  .txt3 {
    display: flex;
    align-items: center;

    .txt3-1 {
      margin-right: 20px;
    }
  }
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
  .myStep {
    background: #fff;
    padding: 20px 30px;
    border-radius: 20px;
    margin-bottom: 20px;
  }

  /deep/ .el-tabs__header.is-top {
    background: #fff;
    padding: 0 20px;
  }

  /deep/ .el-tabs__item {
    font-size: 20px;
    font-weight: 300;
  }

  /deep/ .el-tabs__content {
    padding: 20px 30px;
  }

  .btns {
    margin-bottom: 30px;
  }

  .txttt {
    color: #909399;
    margin-bottom: 20px;
  }

  .nav1 {
    .n-tit1 {
      font-size: 24px;
    }

    .box {
      padding: 20px;
      background: #fff;
      border-radius: 10px;
      margin-top: 20px;
      position: relative;

      .float-txt {
        position: absolute;
        right: 50px;
        top: 20px;
        color: #67c23a;
        font-size: 18px;
        font-weight: 300;
      }

      .span-txt {
        font-size: 14px;
        color: #606266;
      }
    }

    .myTable {
      padding: 20px;
      background: #fff;
      border-radius: 10px;
      margin-top: 20px;

      /deep/ .vxe-table--render-default .vxe-cell {
        // padding-left: 0px !important;
        // padding-right: 0px !important;
      }

      /deep/ .vxe-header--column .vxe-cell--title {
        font-size: 12px;
      }
    }
  }

  .nav3.nav1 {
    .b-txt {
      font-size: 18px;
      font-weight: 800;
      margin-bottom: 20px;
      margin-left: 20px;
    }

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

    .heng {
      background: #ddd;
      height: 1px;
      width: 100%;
    }
  }

  .footer-btn {
    margin-top: 40px;
    margin-bottom: 50px;
  }
}

.dia2_1 {
  padding: 0 20px;

  .tit1 {
    display: flex;
    align-items: center;
    font-size: 14px;

    .txt1-1 {
      width: 140px;
    }
  }

  .btns {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
}

.heng {
  background: #ddd;
  height: 1px;
  width: 100%;
}

.dia3_1 {
  .footer-btn {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
}

.dia3_4 {
  .tit {
    display: flex;
    flex-direction: column;
    align-items: center;

    .el-icon-warning {
      font-size: 50px;
    }

    .txt {
      margin-top: 20px;
      font-size: 26px;
    }
  }

  .footer-btn {
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
}

.displayN {
  display: none;
}
</style>