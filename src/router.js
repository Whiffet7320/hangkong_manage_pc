import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.config.productionTip = false;


const routes = [{
        path: '/1_yewucaozuo',
        name: '1_yewucaozuo',
        component: () => import('./components/1_yewucaozuo'),
        children: [{
            path: 'Xindingdan',
            name: 'Xindingdan',
            component: () => import('./components/1_yewucaozuo/Xindingdan.vue'),
        },{
            path: 'Chukoudingdan',
            name: 'Chukoudingdan',
            component: () => import('./components/1_yewucaozuo/Chukoudingdan.vue'),
        }, {
            path: 'Addxindingdan',
            name: 'Addxindingdan',
            component: () => import('./components/1_yewucaozuo/Addxindingdan.vue'),
        }, ]
    },
    {
        path: '/2_caiwujiesuan',
        name: '2_caiwujiesuan',
        component: () => import('./components/2_caiwujiesuan'),
        children: [{
            path: 'Xindingdan',
            name: 'Xindingdan',
            component: () => import('./components/2_caiwujiesuan/Xindingdan.vue'),
        }, ]
    }, {
        path: '/3_kongyunbaobiao',
        name: '3_kongyunbaobiao',
        component: () => import('./components/3_kongyunbaobiao'),
        children: [{
            path: 'Kongyunbaobiao',
            name: 'Kongyunbaobiao',
            component: () => import('./components/3_kongyunbaobiao/Kongyunbaobiao.vue'),
        }, ]
    }, {
        path: '/5_jichuziliao',
        name: '5_jichuziliao',
        component: () => import('./components/5_jichuziliao'),
        children: [{
            path: 'Kehuziliao',
            name: 'Kehuziliao',
            component: () => import('./components/5_jichuziliao/Kehuziliao.vue'),
        }, {
            path: 'Feiyongleixin',
            name: 'Feiyongleixin',
            component: () => import('./components/5_jichuziliao/Feiyongleixin.vue'),
        }, {
            path: 'Bizhongxinxi',
            name: 'Bizhongxinxi',
            component: () => import('./components/5_jichuziliao/Bizhongxinxi.vue'),
        }, {
            path: 'Huilv',
            name: 'Huilv',
            component: () => import('./components/5_jichuziliao/Huilv.vue'),
        }, {
            path: 'Hangbanxinxi',
            name: 'Hangbanxinxi',
            component: () => import('./components/5_jichuziliao/Hangbanxinxi.vue'),
        }, {
            path: 'Huowuleixin',
            name: 'Huowuleixin',
            component: () => import('./components/5_jichuziliao/Huowuleixin.vue'),
        }, {
            path: 'Guojia',
            name: 'Guojia',
            component: () => import('./components/5_jichuziliao/Guojia.vue'),
        }, {
            path: 'AddKehu',
            name: 'AddKehu',
            component: () => import('./components/5_jichuziliao/AddKehu.vue'),
        }, {
            path: 'AddHangban',
            name: 'AddHangban',
            component: () => import('./components/5_jichuziliao/AddHangban.vue'),
        },{
            path: 'Jichang',
            name: 'Jichang',
            component: () => import('./components/5_jichuziliao/Jichang.vue'),
        },{
            path: 'Shuilv',
            name: 'Shuilv',
            component: () => import('./components/5_jichuziliao/Shuilv.vue'),
        },{
            path: 'Kongyunhangxian',
            name: 'Kongyunhangxian',
            component: () => import('./components/5_jichuziliao/Kongyunhangxian.vue'),
        },{
            path: 'Bengongsiziliao',
            name: 'Bengongsiziliao',
            component: () => import('./components/5_jichuziliao/Bengongsiziliao.vue'),
        },]
    },
    {
        path: '/6_xitongguanli',
        name: '6_xitongguanli',
        component: () => import('./components/6_xitongguanli'),
        children: [{
            path: 'Zhanghaoguanli',
            name: 'Zhanghaoguanli',
            component: () => import('./components/6_xitongguanli/Zhanghaoguanli.vue'),
        },{
            path: 'Gangweiguanli',
            name: 'Gangweiguanli',
            component: () => import('./components/6_xitongguanli/Gangweiguanli.vue'),
        },{
            path: 'Fenzushezhi',
            name: 'Fenzushezhi',
            component: () => import('./components/6_xitongguanli/Fenzushezhi.vue'),
        },{
            path: 'Gongzuozubianhao',
            name: 'Gongzuozubianhao',
            component: () => import('./components/6_xitongguanli/Gongzuozubianhao.vue'),
        },{
            path: 'Xitongdaima',
            name: 'Xitongdaima',
            component: () => import('./components/6_xitongguanli/Xitongdaima.vue'),
        }, ]
    },
    // 
    {
        path: '/',
        name: 'Home',
        component: () => import('./components/Home'),
        children: [{
            path: 'Shouye',
            name: 'Shouye',
            component: () => import('./components/Home/Shouye'),
        }, ]
    }, {
        path: '/Xiaoyuanbiaobai',
        name: 'Xiaoyuanbiaobai',
        component: () => import('./components/Xiaoyuanbiaobai'),
        children: [{
            path: 'Biaobaiqiang',
            name: 'Biaobaiqiang',
            component: () => import('./components/Xiaoyuanbiaobai/Biaobaiqiang'),
        }]
    }, {
        path: '/Xiaoyuanjishi',
        name: 'Xiaoyuanjishi',
        component: () => import('./components/Xiaoyuanjishi'),
        children: [{
            path: 'Bangbangshougou',
            name: 'Bangbangshougou',
            component: () => import('./components/Xiaoyuanjishi/Bangbangshougou'),
        }, {
            path: 'Bangbangzhuanmai',
            name: 'Bangbangzhuanmai',
            component: () => import('./components/Xiaoyuanjishi/Bangbangzhuanmai'),
        }]
    }, {
        path: '/Xiaoyuanshudong',
        name: 'Xiaoyuanshudong',
        component: () => import('./components/Xiaoyuanshudong'),
        children: [{
            path: 'Shudongliebiao',
            name: 'Shudongliebiao',
            component: () => import('./components/Xiaoyuanshudong/Shudongliebiao'),
        }]
    }, {
        path: '/Xiaoyuanyijiao',
        name: 'Xiaoyuanyijiao',
        component: () => import('./components/Xiaoyuanyijiao'),
        children: [{
            path: 'Bangbangbaoxiu',
            name: 'Bangbangbaoxiu',
            component: () => import('./components/Xiaoyuanyijiao/Bangbangbaoxiu'),
        }, {
            path: 'Xiaoyuanfengjing',
            name: 'Xiaoyuanfengjing',
            component: () => import('./components/Xiaoyuanyijiao/Xiaoyuanfengjing'),
        }]
    }, {
        path: '/Shiwuzhaoling',
        name: 'Shiwuzhaoling',
        component: () => import('./components/Shiwuzhaoling'),
        children: [{
            path: 'Bangbangxunwu',
            name: 'Bangbangxunwu',
            component: () => import('./components/Shiwuzhaoling/Bangbangxunwu'),
        }, {
            path: 'Bangbangxunzhu',
            name: 'Bangbangxunzhu',
            component: () => import('./components/Shiwuzhaoling/Bangbangxunzhu'),
        }]
    }, {
        path: '/Xiaoyuanpindan',
        name: 'Xiaoyuanpindan',
        component: () => import('./components/Xiaoyuanpindan'),
        children: [{
            path: 'Bangbangpinche',
            name: 'Bangbangpinche',
            component: () => import('./components/Xiaoyuanpindan/Bangbangpinche'),
        }, {
            path: 'Bangbangpindan',
            name: 'Bangbangpindan',
            component: () => import('./components/Xiaoyuanpindan/Bangbangpindan'),
        }]
    }, {
        path: '/H5',
        name: 'H5',
        component: () => import('./components/Wenzhang/H5'),
    },
    // 
    {
        path: '/Wenzhang',
        name: 'Wenzhang',
        component: () => import('./components/Wenzhang'),
        children: [{
            path: 'Wenzhangliebiao',
            name: 'Wenzhangliebiao',
            component: () => import('./components/Wenzhang/Wenzhangliebiao'),
        }, {
            path: 'Tianjiawenzhang',
            name: 'Tianjiawenzhang',
            component: () => import('./components/Wenzhang/Tianjiawenzhang'),
        }, {
            path: 'H5',
            name: 'H5',
            component: () => import('./components/Wenzhang/H5'),
        }]
    }, {
        path: '/Qita',
        name: 'Qita',
        component: () => import('./components/Qita'),
        children: [{
            path: 'Fankuiliebiao',
            name: 'Fankuiliebiao',
            component: () => import('./components/Qita/Fankuiliebiao'),
        }, {
            path: 'Chengshiliebiao',
            name: 'Chengshiliebiao',
            component: () => import('./components/Qita/Chengshiliebiao'),
        }, {
            path: 'Gudingweizhi',
            name: 'Gudingweizhi',
            component: () => import('./components/Qita/Gudingweizhi'),
        }, {
            path: 'Gudingweizhishangping',
            name: 'Gudingweizhishangping',
            component: () => import('./components/Qita/Gudingweizhishangping'),
        }, {
            path: 'Jiangpingliebiao',
            name: 'Jiangpingliebiao',
            component: () => import('./components/Qita/Jiangpingliebiao'),
        }, {
            path: 'Zhongjiangliebiao',
            name: 'Zhongjiangliebiao',
            component: () => import('./components/Qita/Zhongjiangliebiao'),
        }, ]
    }, {
        path: '/Shezhi',
        name: 'Shezhi',
        component: () => import('./components/Shezhi'),
        children: [{
            path: 'Xiaoxiguanli',
            name: 'Xiaoxiguanli',
            component: () => import('./components/Shezhi/Xiaoxiguanli'),
        }, {
            path: 'Zhanghaoguanli',
            name: 'Zhanghaoguanli',
            component: () => import('./components/Shezhi/Zhanghaoguanli'),
        }, {
            path: 'Qitashezhi',
            name: 'Qitashezhi',
            component: () => import('./components/Shezhi/Qitashezhi'),
        }, {
            path: 'Lunbotushezhi',
            name: 'Lunbotushezhi',
            component: () => import('./components/Shezhi/Lunbotushezhi'),
        }, {
            path: 'Lunbotuliebiao',
            name: 'Lunbotuliebiao',
            component: () => import('./components/Shezhi/Lunbotuliebiao'),
        }, {
            path: 'Kaipinyeshezhi',
            name: 'Kaipinyeshezhi',
            component: () => import('./components/Shezhi/Kaipinyeshezhi'),
        }, {
            path: 'Shujuzhongxin',
            name: 'Shujuzhongxin',
            component: () => import('./components/Shezhi/Shujuzhongxin'),
        }]
    },{
        path: '/NotFound',
        name: 'NotFound',
        component: () => import('./components/NotFound'),
        children: [{
            path: 'NotFound404',
            name: 'NotFound404',
            component: () => import('./components/NotFound/404'),
        }]
    }, 
]

const router = new VueRouter({
    mode: 'hash',
    routes,
})


export default router