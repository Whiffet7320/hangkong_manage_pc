import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router';
import api from './api/index';
import store from './store';
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';
import 'xe-utils';
import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';
import VueParticles from 'vue-particles'
import Vant from 'vant';
import 'vant/lib/index.css';
// 引入自己写的全局css
import './assets/style.css'
Vue.use(Vant);
Vue.use(VueParticles)
Vue.use(VXETable)

// function uploadOSS(){

// }
// Vue.prototype.$uploadOSS = uploadOSS;
Vue.prototype.$api = api;
// Vue.prototype.$url = 'http://192.168.50.142:9004'
Vue.prototype.$url = 'https://guangke.bjxinzeyuan.cn'

Vue.use(ElementUI);
Vue.use(Viewer)
Viewer.setDefaults({
  Options: {
    'inline': true,
    'button': true,
    'navbar': true,
    'title': true,
    'toolbar': true,
    'tooltip': true,
    'movable': true,
    'zoomable': true,
    'rotatable': true,
    'scalable': true,
    'transition': true,
    'fullscreen': true,
    'keyboard': true,
    'url': 'data-source'
  }
})
Array.prototype.indexOf = function (val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
};
Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
//获取当前日期函数
function getNowFormatDate() {
  let date = new Date(),
    seperator1 = '-', //格式分隔符
    year = date.getFullYear(), //获取完整的年份(4位)
    month = date.getMonth() + 1, //获取当前月份(0-11,0代表1月)
    strDate = date.getDate() // 获取当前日(1-31)
  if (month >= 1 && month <= 9) month = '0' + month // 如果月份是个位数，在前面补0
  if (strDate >= 0 && strDate <= 9) strDate = '0' + strDate // 如果日是个位数，在前面补0

  let currentdate = year + seperator1 + month + seperator1 + strDate
  return currentdate
}
Vue.prototype.$getTime = getNowFormatDate

router.beforeEach((to, from, next) => {
  console.log(to)
  // 如果有token 说明该用户已登陆
  if (sessionStorage.getItem("isLogin") == 'true') {
    // 在已登陆的情况下访问登陆页会重定向到首页
    next()
  } else {
    // 没有登陆则访问任何页面都重定向到登陆页
  }
});

// router.beforeEach((to, from, next) => {
//   console.log(to.fullPath)
//   var menu = JSON.parse(decodeURIComponent(sessionStorage.getItem("menu")))
//   // console.log(menu)
//   var flag = false;
//   menu.forEach(ele=>{
//     ele.sub_menu.forEach(ele2=>{
//       if(to.fullPath.indexOf(ele2.url) != -1){
//         flag = true;
//       }
//     })
//   })
//   if(to.fullPath == '/'){
//     flag = true;
//   }
//   console.log(flag)
//   if(!flag && to.fullPath != '/NotFound/NotFound404'){
//     next({name:'NotFound404'})
//   }
//   // 如果有token 说明该用户已登陆
//   if (sessionStorage.getItem("isLogin")=='true') {
//     // 在已登陆的情况下访问登陆页会重定向到首页
//     next()
//   } else {
//     // 没有登陆则访问任何页面都重定向到登陆页
//   }
// });

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')