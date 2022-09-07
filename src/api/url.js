export default {
    // 航空-系统管理
    baseUrl: 'https://crmdl.api.5laoye.com/service/web',
    login: '/login', //用户登录
    user_list: "/user_list", //账号列表
    add_users: "/add_users", //添加账号
    del_users: '/del_users', //删除账号
    update_users: '/update_users', //修改账号
    set_userstatus: '/set_userstatus', //设置账号状态
    user_menu: '/user_menu', //菜单权限列表
    usergroups_list: '/usergroups_list', //分组列表
    add_usergroups: '/add_usergroups', //添加分组
    update_usergroups: '/update_usergroups', //修改分组
    del_usergroups: "/del_usergroups", //删除分组
    userpost_list: '/userpost_list', //岗位列表
    add_userpost: '/add_userpost', //添加岗位
    update_userpost: '/update_userpost', //修改岗位
    del_userpost: '/del_userpost', //删除岗位
    // 基础资料
    customer_attributecode: '/customer_attributecode', //客户基本资料--属性代码列表
    customer_type: '/customer_type', //客户类型列表
    customer_list: "/customer_list", //客户列表
    create_customer: '/create_customer', //创建客户资料
    update_customer: '/update_customer', //修改客户资料
    set_customerstatus: "/set_customerstatus", //设置客户状态
    del_customer: '/del_customer', //删除客户资料
    // 
    create_costtypes: '/create_costtypes', //创建费用类型
    list_costtypes: '/list_costtypes', //费用类型列表
    update_costtypes: '/update_costtypes', //修改费用类型
    del_costtypes: '/del_costtypes', //删除费用类型
    // 
    create_currency: '/create_currency', //创建币种信息
    currency_list: '/currency_list', //币种信息列表
    update_currency: "/update_currency", //修改币种信息
    del_currency: '/del_currency', //删除币种信息
    // 
    create_exchangerate: '/create_exchangerate', //创建汇率
    exchangerate_list: '/exchangerate_list', //汇率列表
    update_exchangerate: '/update_exchangerate', //修改汇率
    del_exchangerate: '/del_exchangerate', //删除汇率
    // 
    create_goods: "/create_goods", //创建货物类型
    goods_list: "/goods_list", //货物类型列表
    update_goods: '/update_goods', //修改货物类型
    del_goods: '/del_goods', //删除货物类型
    // 
    create_country: '/create_country', //创建国家
    update_country: "/update_country", //修改国家
    del_country: '/del_country', //删除国家
    country_list: '/country_list', //国家列表
    // 
    create_airport: '/create_airport', //创建机场
    list_airport: "/list_airport", //机场列表
    update_airport: "/update_airport", //修改机场
    del_airport: '/del_airport', //删除机场
    // 
    create_airroute: "/create_airroute", //创建空运航线
    airroute_list: '/airroute_list', //空运航线列表
    update_airroute: '/update_airroute', //修改空运航线
    del_airroute: '/del_airroute', //删除空运航线
    // 
    create_companybank: "/create_companybank", //本公司资料--创建银行账号
    list_companybank: "/list_companybank", //本公司资料--银行账号列表
    update_companybank: '/update_companybank', //本公司资料--修改银行账号
    del_companybank: '/del_companybank', //本公司资料--删除银行账号
    update_companyinfo: "/update_companyinfo", //修改本公司资料
    companyinfo: "/companyinfo", //本公司资料
    // 
    sensitivegoods_list: "/sensitivegoods_list", //敏感货物列表
    create_sensitivegoods: "/create_sensitivegoods", //创建敏感货物
    del_sensitivegoods: '/del_sensitivegoods', //删除敏感货物
    create_flight: "/create_flight", //创建航班信息
    flight_list: "/flight_list", //航班信息列表
    update_flight: '/update_flight', //修改航班信息
    del_flight: "/del_flight", //删除航班信息
    set_receivingbulkcargostatus:"/set_receivingbulkcargostatus",//设置接散货状态
    set_receivetraystatus:'/set_receivetraystatus',//设置接托盘状态
    // 
    create_taxrate:'/create_taxrate',//创建税率
    taxrate_list:'/taxrate_list',//税率列表
    update_taxrate:'/update_taxrate',//修改税率
    del_taxrate:"/del_taxrate",//删除税率
    // 
    workno_list:'/workno_list',//工作号编号列表
    create_workno:"/create_workno",//创建工作号编号
    update_workno:'/update_workno',//修改工作号编号
    del_workno:'/del_workno',//删除工作号编号
    // 业务操作
    create_userorderidentifier:"/create_userorderidentifier",//生成新工作号
    create_userorder:"/create_userorder",//创建新订单
    update_userorder:"/update_userorder",//委托信息
    read_userinfo:"/read_userinfo",//读取当前登录用户信息
    view_userorder:"/view_userorder",//订单详情
    package:"/package",//包装类型列表
    delivery_method:"/delivery_method",//货到方式列表
    customs_method:"/customs_method",//报关方式列表
    business_type:"/business_type",//业务类型列表
    check_orderprimaryno:"/check_orderprimaryno",//检查主订单号是否存在
    product_type:"/product_type",//空运服务产品列表
    user_signature:"/user_signature",//签单
    operate_procedure:"/operate_procedure",//操作流程
    price_confirmationview:'/price_confirmationview',//价格确认详情
    price_confirmation:"/price_confirmation",//价格确认
    takeoff_confirmationview:"/takeoff_confirmationview",//起飞确认详情
    takeoff_confirmation:"/takeoff_confirmation",//起飞确认
    transshipment_confirmationview:"/transshipment_confirmationview",//转运确认详情
    transshipment_confirmation:"/transshipment_confirmation",//转运确认
    goods_arrivalconfirmationview:"/goods_arrivalconfirmationview",//到港确认详情
    goods_arrivalconfirmation:'/goods_arrivalconfirmation',//到港确认
}