<template>
  <div class="aside">
    <!-- <div class="nav4" @click="loginOut">
      <img class="pic1" src="../../assets/image/组191.png" alt="" />
      <div class="tit1">切换账号</div>
    </div>-->
    <div class="menu">
      <!-- <div class="myisCollBtn">
        <el-button @click="myisColl">
          <i class="el-icon-menu"></i>
        </el-button>
      </div> -->

      <el-menu
        :default-active="menuActiveIndex"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        background-color="#fff"
        text-color="#909399"
        router
      >
        <!-- <el-menu-item
          v-if="userName == 'admin'"
          :route="{ name: 'Shouye' }"
          index="1-1"
        >
          <i class="el-icon-s-home"></i>
          <span slot="title">数据</span>
        </el-menu-item> -->
        <template v-if="false">
          <el-submenu
            v-for="item in menu"
            :key="item.id"
            :index="item.menu_index"
          >
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item
              v-for="item2 in item.sub_menu"
              :key="item2.id"
              :route="{ name: item2.url }"
              :index="item2.menu_index"
              >{{ item2.title }}</el-menu-item
            >
          </el-submenu>
        </template>

        <template v-if="true">
          <el-menu-item
            v-for="item in aside_left"
            :key="item.id"
            :route="{ name: item.url }"
            :index="item.menu_index"
          >
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
          <!-- <el-menu-item
            index="6-5"
            :route="{ name: 'Xitongdaima' }"
          >
            <span slot="title">系统代码</span>
          </el-menu-item> -->
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["aside_left"]),
  },
  watch: {
    $route(to) {
      console.log(to.path); //到哪去
      if(to.path == "/1_yewucaozuo"){
        this.$router.push({path:'/1_yewucaozuo/Xindingdan'})
      }
      if(to.path == "/5_jichuziliao"){
        this.$router.push({path:'/5_jichuziliao/Bengongsiziliao'})
      }
      if(to.path == "/6_xitongguanli"){
        this.$router.push({path:'/6_xitongguanli/Zhanghaoguanli'})
      }
      if (to.path == "/1_yewucaozuo/Xindingdan") {
        this.menuActiveIndex = "1-1";
        this.$store.commit("headerTit", `空运操作 / <span style="color: #515a61;
        font-weight: 700;">新订单</span>`);
      } else if (to.path == "/5_jichuziliao/Bengongsiziliao") {
        this.menuActiveIndex = "5-8";
        this.$store.commit("headerTit", `基础资料 / <span style="color: #515a61;
        font-weight: 700;">本公司资料</span>`);
      } else if (to.path == "/5_jichuziliao/AddKehu") {
        this.menuActiveIndex = "5-1";
        this.$store.commit("headerTit", `基础资料 / <span style="color: #515a61;
        font-weight: 700;">创建客户</span>`);
      } else if (to.path == "/5_jichuziliao/Feiyongleixin") {
        this.menuActiveIndex = "5-2";
        this.$store.commit("headerTit", `基础资料 / <span style="color: #515a61;
        font-weight: 700;">费用类型</span>`);
      } else if (to.path == "/5_jichuziliao/Bizhongxinxi") {
        this.menuActiveIndex = "5-3";
        this.$store.commit("headerTit", `基础资料 / <span style="color: #515a61;
        font-weight: 700;">币种信息</span>`);
      } else if (to.path == "/5_jichuziliao/Huilv") {
        this.menuActiveIndex = "5-4";
        this.$store.commit("headerTit", `基础资料 / <span style="color: #515a61;
        font-weight: 700;">汇率</span>`);
      } else if (to.path == "/5_jichuziliao/Hangbanxinxi") {
        this.menuActiveIndex = "5-5";
        this.$store.commit("headerTit", `基础资料 / <span style="color: #515a61;
        font-weight: 700;">航班信息</span>`);
      } else if (to.path == "/5_jichuziliao/Huowuleixin") {
        this.menuActiveIndex = "5-6";
        this.$store.commit("headerTit", `基础资料 / <span style="color: #515a61;
        font-weight: 700;">货物类型</span>`);
      } else if (to.path == "/5_jichuziliao/Guojia") {
        this.menuActiveIndex = "5-7";
        this.$store.commit("headerTit", `基础资料 / <span style="color: #515a61;
        font-weight: 700;">国家</span>`);
      } else if (to.path == "/5_jichuziliao/AddHangban") {
        this.menuActiveIndex = "5-5";
        this.$store.commit("headerTit", `基础资料 / <span style="color: #515a61;
        font-weight: 700;">创建航班</span>`);
      } else if (to.path == "/5_jichuziliao/Bengongsiziliao") {
        this.menuActiveIndex = "5-8";
        this.$store.commit("headerTit", `基础资料 / <span style="color: #515a61;
        font-weight: 700;">本公司资料</span>`);
      } else if (to.path == "/5_jichuziliao/Kongyunhangxian") {
        this.menuActiveIndex = "5-9";
        this.$store.commit("headerTit", `基础资料 / <span style="color: #515a61;
        font-weight: 700;">空运航线</span>`);
      } else if (to.path == "/5_jichuziliao/Shuilv") {
        this.menuActiveIndex = "5-10";
        this.$store.commit("headerTit", `基础资料 / <span style="color: #515a61;
        font-weight: 700;">税率</span>`);
      } else if (to.path == "/5_jichuziliao/Jichang") {
        this.menuActiveIndex = "5-11";
        this.$store.commit("headerTit", `基础资料 / <span style="color: #515a61;
        font-weight: 700;">机场</span>`);
      } else if (to.path == "/6_xitongguanli/Zhanghaoguanli") {
        this.menuActiveIndex = "6-1";
        this.$store.commit("headerTit", `系统管理 / <span style="color: #515a61;
        font-weight: 700;">账号管理</span>`);
      } else if (to.path == "/6_xitongguanli/Gangweiguanli") {
        this.menuActiveIndex = "6-2";
        this.$store.commit("headerTit", `系统管理 / <span style="color: #515a61;
        font-weight: 700;">岗位管理</span>`);
      }  else if (to.path == "/6_xitongguanli/Fenzushezhi") {
        this.menuActiveIndex = "6-3";
        this.$store.commit("headerTit", `系统管理 / <span style="color: #515a61;
        font-weight: 700;">分组设置</span>`);
      }  else if (to.path == "/6_xitongguanli/Gongzuozubianhao") {
        this.menuActiveIndex = "6-4";
        this.$store.commit("headerTit", `系统管理 / <span style="color: #515a61;
        font-weight: 700;">工作号编号</span>`);
      }  else if (to.path == "/6_xitongguanli/Xitongdaima") {
        this.menuActiveIndex = "6-5";
        this.$store.commit("headerTit", `系统管理 / <span style="color: #515a61;
        font-weight: 700;">系统代码</span>`);
      } else if (to.path == "/Qita/Zhongjiangliebiao") {
        this.menuActiveIndex = "10-6";
        this.$store.commit(
          "headerTit",
          `其他 / <span style="color: #515a61;
        font-weight: 700;">中奖列表</span>`
        );
      }
    },
  },
  data() {
    return {
      menu: [],
      activeIndex: 0,
      menuActiveIndex: "",
      userInfo: null,
      isCollapse: false,
    };
  },
  created() {
    this.menu = JSON.parse(decodeURIComponent(sessionStorage.getItem("menu")));
    this.userName = sessionStorage.getItem("username");
    console.log(this.menu, this.userName);
  },
  methods: {
    myisColl() {
      this.isCollapse = !this.isCollapse;
    },
    loginOut() {
      sessionStorage.setItem("token", null);
      sessionStorage.setItem("isLogin", null);
      this.$router.go(0);
      this.$router.push({ path: "/login" });
    },
  },
};
</script>

<style lang="scss" scoped>
.aside {
  margin-top: 20px;
  .menu {
    /deep/ .el-menu {
      border-right: 0px;
    }
    /deep/ .el-menu-item.is-active {
      background: #edf5ff !important;
      border-right: 2px solid;
      font-weight: 700;
    }
    /deep/ .el-menu-item {
      padding: 0 !important;
      span {
        margin-left: 60px;
      }
    }
    /deep/ .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 280px;
    }
    .myisCollBtn {
      margin-top: 10px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>