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
/deep/ .vxe-header--row{
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
</style>

