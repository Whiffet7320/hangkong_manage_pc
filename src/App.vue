<template>
  <div id="app">
    <Layout />
  </div>
</template>

<script>
import Layout from "./components/Layout";
export default {
  name: "App",
  components: {
    Layout
  },
  mounted() {
    const oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.src = "https://gosspublic.alicdn.com/aliyun-oss-sdk-4.4.4.min.js";
    document.body.appendChild(oScript);
  }
};
</script>

<style lang="scss" scoped>
@import "./assets/reset.css";

/deep/ .el-dialog {
  border-radius: 10px;
}
</style>
<style lang="scss">
/deep/ .vxe-header--row {
  font-size: 12px !important;
}

/deep/ .vxe-body--row {
  font-size: 12px !important;
}

.el-popover {
  transform: translateY(-6px);

  .el-checkbox {
    width: 160px;
    margin-bottom: 10px;
    display: inline-block;
    margin-right: 0px;

    .el-checkbox__label {
      font-size: 12px;
    }
  }
}

/*滚动条样式*/
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-track {
  background-color: #FFFFFF;
}
::-webkit-scrollbar-corner {
  background-color: #FFFFFF;
}

::-webkit-scrollbar-thumb:active {
  background-color: #787878;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #A8A8A8;
}

::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 5px;
  border: 1px solid #F1F1F1;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
}


</style>

