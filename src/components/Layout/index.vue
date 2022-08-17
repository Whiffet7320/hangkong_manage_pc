<template>
  <div class="layout">
    <el-container v-if="this.isLogin == 'true' && this.isH5 != 'yes'">
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <el-aside v-if="haveAside" width="null">
          <Aside />
        </el-aside>
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
    <H5 v-else-if="this.isLogin == 'true' && this.isH5 == 'yes'" />
    <Login v-else />
  </div>
</template>

<script>
import Login from "../Login";
import Header from "../Header";
import Aside from "../Aside";
import H5 from "../../components/Wenzhang/H5";

window.addEventListener("beforeunload", function () {
  console.log(sessionStorage.getItem("isH5zhanshi"), 1111, 1111);
  if (sessionStorage.getItem("isH5zhanshi") == null) {
    sessionStorage.setItem("isH5", "no");
  } else {
    if (sessionStorage.getItem("isH5zhanshi") != "yes") {
      sessionStorage.setItem("isH5", "no");
      setTimeout(() => {
        sessionStorage.setItem("isH5zhanshi", "yes");
        // sessionStorage.getItem('isH5zhanshi') != 'no'
      }, 1000);
    } else {
      sessionStorage.setItem("isH5", "yes");
      // setTimeout(() => {
      sessionStorage.setItem("isH5zhanshi", "no");
      // }, 1000);
    }
  }
});
export default {
  data() {
    return {
      isLogin: "false",
      isH5: "no",
      haveAside:true,
    };
  },
  watch: {
    $route: {
      handler: function (val) {
        console.log(val);
        if (val.path == '/3_kongyunbaobiao/Kongyunbaobiao') {
          this.haveAside = false;
        }else{
          this.haveAside = true;
        }
      },
      immediate: true,
      deep: true,
    },
  },
  created() {
    this.isLogin = sessionStorage.getItem("isLogin");
    this.isH5 = sessionStorage.getItem("isH5");
    console.log(this.isH5);
  },
  components: {
    Login,
    Header,
    Aside,
    H5,
  },
};
</script>

<style lang='scss'>
/deep/ .layout .vxe-header--row{
  font-size: 12px !important;
}
/deep/ .vxe-body--row {
  font-size: 12px !important;
}
/* .el-header {
  background-color: #b3c0d1;
  height: 60px;
  padding: 0 !important;
} */
.el-header {
  padding: 0;
  height: 84px !important;
}
.el-container {
  height: calc(100vh);
}
.el-aside {
  background-color: #fff;
  color: #333;
  width: 280px !important;
  min-width: 40px;
}

.el-main {
    padding: 0 !important;
  /* padding: 0 0 0 24px !important; */
  background: #f1f5f8;
  color: #333;
  height: calc(100vh - 84px);
}
</style>