<template>
  <div id="login">
    <div class="container">
      <vue-particles
        color="#fff"
        :particleOpacity="0.6"
        :particlesNumber="30"
        shapeType="circle"
        :particleSize="6"
        linesColor="#fff"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="10"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        class="lizi"
      >
      </vue-particles>
      <div class="loginBox">
        <img class="logoo-img" src="../../assets/newImage/logo.png" alt="" />
        <!-- <div class="tit1">后台管理系统</div> -->
        <div class="tit2">飞捷腾达货运代理空运管理系统</div>
        <div class="loginBox2">
          <el-form
            :model="loginForm"
            ref="loginForm"
            status-icon
            label-width="100px"
            :rules="rules"
            class="demo-ruleForm"
          >
            <el-form-item prop="username">
              <!-- <div class="userInp">账号</div> -->
              <el-input
                type="text"
                v-model="loginForm.username"
                auto-complete="off"
                placeholder="请输入账号"
                class="el-inp"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <!-- <div class="pasInp">密码</div> -->
              <el-input
                type="password"
                v-model="loginForm.password"
                auto-complete="off"
                placeholder="请输入密码"
                class="el-inp"
                @keyup.enter.native="onLogin"
              ></el-input>
            </el-form-item>
            <el-form-item prop="checkPass" v-if="!this.isRegister">
              <i class="el-icon-unlock"></i>
              <el-input
                type="password"
                v-model="loginForm.checkPass"
                auto-complete="off"
                placeholder="请确认密码"
                class="el-inp"
                @keyup.enter.native="onLogin"
              ></el-input>
            </el-form-item>
            <!-- <el-form-item>
              <div class="footer">
                <div class="wjmm">忘记密码</div>
                <div class="zczh">注册账号</div>
              </div>
            </el-form-item> -->
          </el-form>
          <el-button
            @click="onLogin"
            class="loginBtn"
            type="primary"
          >登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.loginForm.checkPass !== "") {
          this.$refs.loginForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.loginForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      smdl: true,
      loginForm: {
        username: "admin",
        checkPass: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      isRegister: true,
    };
  },
  methods: {
    // 登录
    async onLogin() {
      const res = await this.$api.login({
        username: this.loginForm.username,
        userpass: this.loginForm.password,
      });
      console.log(res);
      if (res.result == 1) {
        // sessionStorage.setItem("username", this.loginForm.username);
        sessionStorage.setItem("token", res.token);
        sessionStorage.setItem("isLogin", true);
        // sessionStorage.setItem("isH5", "no");
        // sessionStorage.setItem("userInfo", JSON.stringify(res.info));
        sessionStorage.setItem(
          "menu",
          encodeURIComponent(JSON.stringify(res.menu_list))
        );
        this.$message({
          message: res.msg,
          type: "success",
        });
        setTimeout(() => {
          this.$router.push({ path: "/" });
          this.$router.go(0);
        }, 500);
      } else {
        this.$message.error(res.msg);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
#login {
  width: 100%;
  height: 100vh;
  background-color: #000000;
  .container {
    background-image: url("../../assets/newImage/zu13054.png");
    background-size: 100% 100%;
    position: relative;
    width: 100%;
    height: 100%;
    .bacImage {
      width: 100%;
      height: 100%;
      opacity: 1;
    }
    .leftImg {
      position: absolute;
      top: 27%;
      left: 13%;
      width: 37%;
      height: 46%;
    }
    .loginBox {
      position: absolute;
      top: 0;
      right: 13%;
      // border: 1px solid red;
      width: 31%;
      height: 100%;
      .logoo-img {
        position: absolute;
        height: 120px;
        width: 178px;
        top: 150px;
        left: 50%;
        transform: translateX(-50%);
      }
      .tit2 {
        width: 422px;
        position: absolute;
        top: 290px;
        font-size: 30px;
        left: 50%;
        transform: translateX(-50%);
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        color: #418bfb;
      }
      .loginBox2 {
        position: absolute;
        width: 460px;
        left: 50%;
        transform: translateX(-50%);
        height: 300px;
        top: 42%;
        height: 373px;
        opacity: 1;
        // background: #ffffff;
        border-radius: 20px;
        // box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.1);
        .demo-ruleForm {
          /deep/ .el-form-item__content {
            margin-left: 0 !important;
          }
          /deep/ .el-input {
            width: 100%;
          }
          /deep/ .el-input__inner{
            background: #F0F2F5;
          }
          .userInp {
            opacity: 1;
            font-size: 20px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            color: #ebbfcc;
          }
          .pasInp {
            opacity: 1;
            font-size: 20px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            color: #c2c2c2;
          }
          .footer {
            width: 80%;
            display: flex;
            justify-content: space-between;
          }
          .wjmm {
            opacity: 1;
            font-size: 16px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            text-align: center;
            color: #ebbfcc;
          }
          .zczh {
            opacity: 1;
            font-size: 16px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            text-align: center;
            color: #808080;
          }
        }
        .loginBtn {
          position: absolute;
          left: 50%;
          width: 100%;
          transform: translateX(-50%);
        }
      }
    }
  }
}
</style>
