import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    headerTit:'',
    aside_left:[],
    xindingdanPage: 1,
    xindingdanPageSize: 10,
    kehuObj:null,
    hangbanObj:null,
    chukouObj:null,
    _5_1Page :1,
    _5_1PageSize :10,
    _5_2Page :1,
    _5_2PageSize :10,
    _5_3Page :1,
    _5_3PageSize :10,
    _5_4Page :1,
    _5_4PageSize :10,
    _5_5Page :1,
    _5_5PageSize :10,
    _5_6Page :1,
    _5_6PageSize :10,
    _5_7Page :1,
    _5_7PageSize :10,
    _5_8Page :1,
    _5_8PageSize :10,
    _5_9Page :1,
    _5_9PageSize :10,
    _5_10Page :1,
    _5_10PageSize :10,
    // 
    _6_1Page :1,
    _6_1PageSize :10,
    _6_2Page :1,
    _6_2PageSize :10,
    _6_3Page :1,
    _6_3PageSize :10,
    _6_4Page :1,
    _6_4PageSize :10,
  },
  mutations: {
    headerTit(state, str) {
      state.headerTit = str;
    },
    xindingdanPage(state, str) {
      state.xindingdanPage = str;
    },
    xindingdanPageSize(state, str) {
      state.xindingdanPageSize = str;
    },
    aside_left(state, str) {
      state.aside_left = str;
    },
    kehuObj(state, str) {
      state.kehuObj = str;
    },
    chukouObj(state, str) {
      state.chukouObj = str;
    },
    hangbanObj(state, str) {
      state.hangbanObj = str;
    },
    _5_5Page(state, str) {
      state._5_5Page = str;
    },
    _5_5PageSize(state, str) {
      state._5_5PageSize = str;
    },
    _5_6Page(state, str) {
      state._5_6Page = str;
    },
    _5_6PageSize(state, str) {
      state._5_6PageSize = str;
    },
    _5_7Page(state, str) {
      state._5_7Page = str;
    },
    _5_7PageSize(state, str) {
      state._5_7PageSize = str;
    },
    _5_8Page(state, str) {
      state._5_8Page = str;
    },
    _5_8PageSize(state, str) {
      state._5_8PageSize = str;
    },
    _5_9Page(state, str) {
      state._5_9Page = str;
    },
    _5_9PageSize(state, str) {
      state._5_9PageSize = str;
    },
    _5_10Page(state, str) {
      state._5_10Page = str;
    },
    _5_10PageSize(state, str) {
      state._5_10PageSize = str;
    },
    _5_2Page(state, str) {
      state._5_2Page = str;
    },
    _5_2PageSize(state, str) {
      state._5_2PageSize = str;
    },
    _5_4Page(state, str) {
      state._5_4Page = str;
    },
    _5_4PageSize(state, str) {
      state._5_4PageSize = str;
    },
    _5_3Page(state, str) {
      state._5_3Page = str;
    },
    _5_3PageSize(state, str) {
      state._5_3PageSize = str;
    },
    _5_1Page(state, str) {
      state._5_1Page = str;
    },
    _5_1PageSize(state, str) {
      state._5_1PageSize = str;
    },
    _6_1Page(state, str) {
      state._6_1Page = str;
    },
    _6_1PageSize(state, str) {
      state._6_1PageSize = str;
    },
    _6_2Page(state, str) {
      state._6_2Page = str;
    },
    _6_2PageSize(state, str) {
      state._6_2PageSize = str;
    },
    _6_3Page(state, str) {
      state._6_3Page = str;
    },
    _6_3PageSize(state, str) {
      state._6_3PageSize = str;
    },
    _6_4Page(state, str) {
      state._6_4Page = str;
    },
    _6_4PageSize(state, str) {
      state._6_4PageSize = str;
    },
    // 
    h5ValArr(state, obj) {
      console.log(obj)
      if (state.h5ValArr.length == 0) {
        state.h5ValArr.push(obj);
      } else {
        state.h5ValArr.forEach(ele => {
          if (ele.id == obj.id) {
            ele.val = obj.val
          } else {
            state.h5ValArr.push(obj);
          }
        })
      }
      console.log(state.h5ValArr)
    },
   
  },
  actions: {

  },
});