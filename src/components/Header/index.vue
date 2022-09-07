<template>
  <div class="header">
    <div class="nav1">
      <!-- <div class="tit1" v-html="headerTit"></div> -->
      <div class="left">
        <div class="left-l">
          <img src="../../assets/newImage/logo.png" class="ll-img" alt="" />
          <div class="left-txt">飞捷腾达</div>
        </div>
        <!-- <img class="l-img" src="../../assets/img/zu102.png" alt="" /> -->
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          router
          @select="changeSelect"
        >
          <el-menu-item
            v-for="item in menu"
            :key="item.id"
            :index="item.menu_index"
            :route="{ name: item.url }"
            ><i class="el-icon-s-home"></i>{{ item.name }}</el-menu-item
          >
          <!-- <el-menu-item index="1" :route="{ name: '1_yewucaozuo' }"
            ><i class="el-icon-s-home"></i>业务操作</el-menu-item
          >
          <el-menu-item index="2" :route="{ name: '2_caiwujiesuan' }"
            ><i class="el-icon-s-order"></i>财务结算</el-menu-item
          >
          <el-menu-item index="3" :route="{ name: 'Kongyunbaobiao' }"
            ><i class="el-icon-s-marketing"></i>空运报表</el-menu-item
          >
          <el-menu-item index="4"
            ><i class="el-icon-s-data"></i>统计分析</el-menu-item
          >
          <el-menu-item index="5" :route="{ name: '5_jichuziliao' }"
            ><i class="el-icon-s-management"></i>基础资料</el-menu-item
          >
          <el-menu-item index="6" :route="{ name: '6_xitongguanli' }"
            ><i class="el-icon-s-tools"></i>系统管理</el-menu-item
          > -->
        </el-menu>
      </div>
      <div class="tit2">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            admin<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item command="1">个人中心</el-dropdown-item> -->
            <el-dropdown-item command="2">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["headerTit"]),
  },
  watch: {
    $route: {
      handler: function (val) {
        console.log(val);
        if (val.path.indexOf("/1_yewucaozuo") != -1) {
          this.activeIndex = "1";
        } else if (val.path.indexOf("/2_caiwujiesuan") != -1) {
          this.activeIndex = "2";
        } else if (val.path.indexOf("/5_jichuziliao") != -1) {
          this.activeIndex = "5";
        } else if (val.path.indexOf("/6_xitongguanli") != -1) {
          this.activeIndex = "6";
        } else if (val.path == "/Qita/Zhongjiangliebiao") {
          this.activeIndex = "10-6";
          this.$store.commit(
            "headerTit",
            `其他 / <span style="color: #515a61;
        font-weight: 700;">中奖列表</span>`
          );
        }
        if (val.path == "/1_yewucaozuo") {
          this.$router.push({ path: "/1_yewucaozuo/Xindingdan" });
        }
      },
      immediate: true,
      deep: true,
    },
    activeIndex: {
      handler: function (val) {
        console.log(val)
        this.getmenu(val);
        // if (val == 1) {
        //   this.aside_left = [
        //     { url: "Xindingdan", title: "空运出口", index: "1-1" },
        //     { url: "Xindingdan", title: "空运进口", index: "1-2" },
        //   ];
        // } else if (val == 3) {
        //   this.aside_left = [];
        // } else if (val == 5) {
        //   this.aside_left = [
        //     { url: "Kehuziliao", title: "客户资料", index: "5-1" },
        //     { url: "Feiyongleixin", title: "费用类型", index: "5-2" },
        //     { url: "Bizhongxinxi", title: "币种信息", index: "5-3" },
        //     { url: "Huilv", title: "汇率", index: "5-4" },
        //     { url: "Hangbanxinxi", title: "航班信息", index: "5-5" },
        //     { url: "Huowuleixin", title: "货物类型", index: "5-6" },
        //     { url: "Guojia", title: "国家", index: "5-7" },
        //     { url: "Xindingdan", title: "港口", index: "5-8" },
        //     { url: "Xindingdan", title: "船舶", index: "5-9" },
        //   ];
        // } else if (val == 6) {
        //   this.aside_left = [
        //     { url: "Zhanghaoguanli", title: "账号管理", index: "6-1" },
        //     { url: "Gangweiguanli", title: "岗位管理", index: "6-2" },
        //     { url: "Fenzushezhi", title: "分组设置", index: "6-3" },
        // { url: "Gongzuozubianhao", title: "工作", index: "6-4" },
        //   ];
        // } else {
        //   this.aside_left = [];
        // }
        // this.$store.commit("aside_left", this.aside_left);
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      activeIndex: "",
      aside_left: null,
      menu: [],
    };
  },
  // created() {
  //   this.getmenu();
  // },
  methods: {
    getmenu(val) {
      console.log(val)
      this.menu = JSON.parse(
        decodeURIComponent(sessionStorage.getItem("menu"))
      );
      console.log(this.menu)
      this.menu.forEach(ele=>{
        console.log(ele.name)
        if(ele.name == '业务操作'){
          this.$store.commit('_1_qx',ele.button)
        }
        if(ele.name == '财务结算'){
          this.$store.commit('_2_qx',ele.button)
        }
        if(ele.name == '空运报表'){
          this.$store.commit('_3_qx',ele.button)
        }
        if(ele.name == '统计分析'){
          this.$store.commit('_4_qx',ele.button)
        }
        if(ele.name == '基础资料'){
          this.$store.commit('_5_qx',ele.button)
        }
        if(ele.name == '系统管理'){
          this.$store.commit('_6_qx',ele.button)
        }
      })
      // this.userName = sessionStorage.getItem("username");
      this.menu.forEach(ele=>{
        if(ele.menu_index == val){
          this.aside_left = ele.sub_menu
        }
      })
      // this.aside_left = this.menu[val-1].sub_menu
      console.log(this.aside_left)
      this.$store.commit("aside_left", this.aside_left);
    },
    handleCommand(command) {
      if (command == "2") {
        sessionStorage.setItem("token", null);
        sessionStorage.setItem("isLogin", null);
        this.$router.go(0);
        this.$router.push({ path: "/login" });
      }
    },
    changeSelect(e) {
      this.activeIndex = e;
    },
  },
};
</script>

<style scoped lang='scss'>
.header {
  display: flex;
  position: relative;
  background-color: #fff;
  height: 100%;
  box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.1);
  .left {
    display: flex;
    align-items: center;
    .left-l {
      width: 280px;
      display: flex;
      align-items: center;
      justify-content: center;
      .ll-img {
        width: 119px;
        height: 78px;
      }
      .left-txt {
        font-size: 30px;
        font-family: ZoomlaCuHei-A003, ZoomlaCuHei-A003-Regular;
        font-weight: 700;
        color: #3258a1;
      }
    }
    .l-img {
      width: 280px;
      height: 86px;
    }
    /deep/ .el-menu--horizontal > .el-menu-item.is-active {
      background: #409eff;
      color: #fff;
    }
  }
  .nav1 {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px 0 0;
    font-size: 14px;
    /deep/ .el-menu {
      height: 86px !important;
    }
    /deep/ .el-menu--horizontal > .el-menu-item {
      height: 86px;
      line-height: 86px;
    }
    .tit1 {
      color: #999;
      .active {
        color: #515a61;
        font-weight: 700;
      }
    }
    .tit2 {
      .el-dropdown-link {
        cursor: pointer;
        color: #409eff;
      }
      .el-icon-arrow-down {
        font-size: 12px;
      }
    }
  }
}
</style>
