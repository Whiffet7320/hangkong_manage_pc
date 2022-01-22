import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.config.productionTip = false;


const routes = [{
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
        },{
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
    },
]

const router = new VueRouter({
    mode: 'history',
    routes,
})


export default router