<template>
  <div class="login">
    <div class="login_head">
      <div class="logo-wrapper">
        <img class="login-logo" :src="logo" alt="" />
        <span class="login-text">账户登录</span>
      </div>
    </div>
    <div class="cont_box">
      <h2 class="sys-title">{{ title }}</h2>
      <p class="title-sub">
        / <span class="ph-3">高效</span> / <span class="ph-3">专业</span> /
        <span class="ph-3">协作</span> / <span class="ph-3">管理</span> /
      </p>
      <img class="company-bg" :src="loginBg" alt="" />
      <div class="account-warpper">
        <p class="account-title">账户登录</p>
        <div class="inp_box">
          <img class="tip-img" src="../../assets/login/user.png" />
          <el-input
            type="text"
            class="el_inp"
            v-model.trim="user_name"
            placeholder="请输入账号"
            @keydown.native="enterEvent"
            maxlength="50"
            clearable
          ></el-input>
        </div>
        <div class="inp_box">
          <img class="tip-img" src="../../assets/login/pass.png" />
          <el-input
            type="password"
            maxlength="18"
            class="el_inp"
            v-model.trim="pass_word"
            placeholder="请输入密码"
            @keydown.native="enterEvent"
            clearable
          ></el-input>
        </div>
        <el-checkbox v-model="checked" @change="notePass">记住密码</el-checkbox>
        <el-button
          type="primary"
          @click="loginPro"
          class="login_btn"
          :disabled="isDisabled"
          >登录</el-button
        >
      </div>
    </div>
    <img src="../../assets/login/left-top.png" alt="" class="left-top" />
    <img src="../../assets/login/left-cen.png" alt="" class="left-cen" />
    <img src="../../assets/login/left-bom.png" alt="" class="left-bom" />
    <img src="../../assets/login/right-top.png" alt="" class="right-top" />
    <img src="../../assets/login/right-bom.png" alt="" class="right-bom" />
  </div>
</template>

<script>
import Crypto from "@/crypto/crypto-api.js";
export default {
  name: "login",
  data() {
    return {
      ChromeMain: {},
      client: window.client,
      user_name: "",
      pass_word: "",
      checked: false,
      abled: true,
      keyCode: "",
      publicKeyCode: "",
      isBrowserSupport: true,
      logo: window.logo || "./static/logo/logo.png",
      loginBg: window.loginbg || "./static/logo/loginbg.png",
      title: window.title || "荣大科技投行管理系统",
      jumpLoginData: "", //跳转登录传过来的数据
      isJumpLogon: false, //是否是通过跳转登录
      jumpToken: "", //通过跳转带过来的token
      jumpIp: "" //跳转ip
    };
  },
  created() {
    sessionStorage.isConnected === "true" && dis_connect();
    sessionStorage.clear();
    // 清空已选文件
    this.$store.commit("clearSelection");

    // 判断浏览器版本是否支持
    this.checkBrowserVersion();

    // 获取pc端模块对象
    this.ChromeMain = window.ChromeMain;

    //密码初始化处理, 只处理web端
    !this.$store.state.isPC && this.init();
    // this.setUserInfo()

    // PC端初始化用户信息
    window.PC.initUserInfo = this.setUserInfo;

    let that = this;
    window.PC.toHome = () => {
      that.$router.push({ path: "/main" });
    };
    // 获取RSkey
    this.getRSAKey();
    //通过跳转实现登录
    this.jumpLoginFz();
    // if(this.client == 'dongfangcaifu'){
    //   this.jumpToken = this.$route.query.token || '';
    //   this.jumpIp = this.$route.query.clientip || '';
    //   this.isJumpLogon = this.jumpToken != '';
    //   if(this.isJumpLogon){
    //     this.jumpLogin();
    //   }
    // } else if(this.client == 'fangzhengzhengquan'){
    //   this.jumpLoginFz();
    // }
  },
  mounted() {},
  computed: {
    isDisabled() {
      return !this.pass_word || !this.pass_word;
    },
    themeColor() {
      this.$store.state.themeColor;
    }
  },
  methods: {
    // 切换主题
    onThemeChange(themeColor) {
      this.$store.commit("setThemeColor", themeColor);
    },

    setUserInfo(name, pwd, isRemember) {
      this.user_name = name; // 用户名
      this.pass_word = pwd; // 密码
      this.checked = isRemember === "True"; // 是否记住密码
    },

    // 判断IE版本
    checkBrowserVersion() {
      //浏览器版本验证，主要针对的是ie
      var flag = this.IEVersion();
      if (!flag) {
        this.isBrowserSupport = false;
        this.notSupport();
      }
    },
    notSupport() {
      this.$confirm(
        "暂不支持IE浏览器10以下版本！请更新您的浏览器版本",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          showCancelButton: false
        }
      )
        .then(() => {})
        .catch(() => {});
    },

    /**
     * 初始化：获取秘钥、处理密码
     */
    init() {
      // 处理密码： 判断用户是否记住密码
      this.checked = Boolean(JSON.parse(localStorage.getItem("check")));
      if (this.checked) {
        this.user_name = JSON.parse(localStorage.getItem("user_name"));
        var passw = JSON.parse(localStorage.getItem("pass_word"));
        passw && (passw = Crypto.decrypt(passw));
        this.pass_word = passw;
      } else {
        this.user_name = "";
        this.pass_word = "";
      }
    },
    /**
     * 获取钥匙
     */
    getRSAKey() {
      this.getRSAKeyPromise().then(res => {
        if (!res) {
          this.$message.error("系统异常，请刷新重试！");
          return;
        }
        this.publicKeyCode = res;
      });
    },

    async getRSAKeyPromise() {
      return await this.$post("/sys/getRSAKey").then(
        response => {
          if (response.code !== this.code.codeNum.SUCCESS || !response.data) {
            return;
          }
          return response.data;
        },
        err => {
          return;
        }
      );
    },

    //记住密码
    notePass() {
      if (this.checked) {
        localStorage.setItem("check", this.checked);
      } else {
        localStorage.removeItem("check");
      }
    },
    enterEvent(e) {
      var e = window.event || e;
      switch (e.keyCode || e.which) {
        case 13: //回车
          this.loginPro();
          break;
      }
    },
    //项目信息
    getProjectMsg(id) {
      if (id === 0) {
        this.$store.commit("projectMsg", {});
        return;
      }
      var obj = {
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId,
        data: {
          id: id
        }
      };
      var that = this;
      this.$post("/info/project/getProjectInfo", obj)
        .then(response => {
          var data = response.data;
          if (response.code == that.code.codeNum.SUCCESS) {
            that.$store.commit("projectMsg", response.data);
          } else {
            console.log(response.msg);
          }
        })
        .catch(error => {
          console.log(response.msg);
        });
    },
    //登录
    loginPro() {
      if (!this.isBrowserSupport) {
        this.notSupport();
        return;
      }
      if (this.user_name == "") {
        this.$message.error("账号不能为空");
        return;
      }
      if (this.pass_word == "") {
        this.$message.error("密码不能为空");
        return;
      }
      if (!this.publicKeyCode) {
        // 没有publicKeyCode，重新获取
        this.getRSAKeyPromise().then(res => {
          if (!res) {
            this.$message.error("系统异常，请刷新重试");
            return;
          }
          this.publicKeyCode = res;
          this.handleLogin();
        });
        return;
      }
      this.handleLogin();
    },
    getSuccessIconState() {
      this.$post("/sys/showNewMsg")
        .then(res => {
          if (res.code != this.code.codeNum.SUCCESS) {
            this.$message.error(res.msg);
            return;
          }
          this.$store.commit("setMessageIcon", res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleLogin() {
      var arg = {
        data: {
          username: this.user_name, //账号
          password: this.$getCode(this.pass_word, this.publicKeyCode), //密码
          publicKey: this.publicKeyCode
        }
      };
      var that = this;
      this.$post("/sys/login", arg)
        .then(response => {
          if (response.code == that.code.codeNum.SUCCESS) {
            this.$message.success("登录成功!");
            this.$store.commit("setStage", "front");

            if (that.checked) {
              //记住密码
              localStorage.setItem("user_info", JSON.stringify(response.data));
              localStorage.setItem(
                "userToken",
                JSON.stringify(response.data.token)
              );
              localStorage.setItem(
                "userId",
                JSON.stringify(response.data.userInfo.Id)
              );
              localStorage.setItem("user_name", JSON.stringify(that.user_name));
              var passW = Crypto.encrypt(that.pass_word);
              localStorage.setItem("pass_word", JSON.stringify(passW));
            }
            // 存储当前项目ID
            that.$store.commit("projectId", response.data.projectId);

            // 存储用户信息
            that.$store.commit("loginData", response.data);
            that.$store.commit("userToken", response.data.token);
            that.$store.commit("userId", response.data.userInfo.id);
            that.$store.commit("userName", response.data.userInfo.name);
            that.$store.commit("userNameAccn", response.data.userInfo.username);
            sessionStorage.setItem("user_info", JSON.stringify(response.data));
            sessionStorage.setItem(
              "userToken",
              JSON.stringify(response.data.token)
            );
            sessionStorage.setItem(
              "userId",
              JSON.stringify(response.data.userInfo.id)
            );
            sessionStorage.setItem(
              "userName",
              JSON.stringify(response.data.userInfo.name)
            );
            sessionStorage.setItem("login", JSON.stringify(true));
            // 获取系统模块
            this.$utils.getModule();
            //获取项目信息
            that.getProjectMsg(response.data.projectId);
            // 保存项目ID
            this.$utils.saveProjectId(response.data.projectId);
            //消息连接
            mqReceiveJs.initMqConfig();
            // 清除超过30天的草稿
            this.$utils.clearDraft();
            // 获取消息中心图标状态
            this.getSuccessIconState();

            if (this.$store.state.isPC) {
              this.ChromeMain.CS_Main_Login(
                this.user_name,
                this.pass_word,
                this.checked,
                response.data.userInfo.id,
                response.data.token
              );
            } else {
              that.$router.push({ path: "/main" });
            }
            this.$store.commit("clearCopyFn");
            this.$store.commit("setFrontProjectRole", {});
            this.$store.commit("setBehindRoleAuth", []);
            this.$store.commit("setDirTemplate", []);
          } else if (response.code == that.code.codeNum.RSA_ERROR) {
            that.$router.push({ path: "/login" });
          } else {
            if (!response.data.errorNum) {
              this.$message({
                type: "error",
                message: response.msg
              });
            } else {
              this.$message({
                type: "error",
                message: response.data.errorNum
              });
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //登录
    jumpLogin() {
      if (!this.isBrowserSupport) {
        this.notSupport();
        return;
      }
      var arg = {
        data: {
          clientip: this.jumpIp,
          token: this.jumpToken
        }
      };
      var that = this;
      this.$post("/sys/singleLogin", arg)
        .then(response => {
          if (response.code == that.code.codeNum.SUCCESS) {
            this.$message.success("登录成功!");
            // 存储当前项目ID
            that.$store.commit("projectId", response.data.projectId);

            // 存储用户信息
            that.$store.commit("loginData", response.data);
            that.$store.commit("userToken", response.data.token);
            that.$store.commit("userId", response.data.userInfo.id);
            that.$store.commit("userName", response.data.userInfo.name);
            that.$store.commit("userNameAccn", response.data.userInfo.username);
            sessionStorage.setItem("user_info", JSON.stringify(response.data));
            sessionStorage.setItem(
              "userToken",
              JSON.stringify(response.data.token)
            );
            sessionStorage.setItem(
              "userId",
              JSON.stringify(response.data.userInfo.id)
            );
            sessionStorage.setItem(
              "userName",
              JSON.stringify(response.data.userInfo.name)
            );
            sessionStorage.setItem("login", JSON.stringify(true));
            // 获取系统模块
            this.$utils.getModule();
            //获取项目信息
            that.getProjectMsg(response.data.projectId);
            // 保存项目ID
            this.$utils.saveProjectId(response.data.projectId);
            //消息连接
            mqReceiveJs.initMqConfig();
            // 清除超过30天的草稿
            this.$utils.clearDraft();

            if (this.$store.state.isPc) {
              this.ChromeMain.CS_Main_Login(
                this.user_name,
                this.pass_word,
                this.publicKeyCode,
                this.checked
              );
            } else if (
              this.jumpLoginData.approvalId != undefined &&
              this.jumpLoginData.approvalId != ""
            ) {
              this.$store.commit(
                "jumpLoginApprovalId",
                this.jumpLoginData.approvalId
              );
              this.$router.push({
                path: "/myapproval",
                query: {
                  isJumpLoginappro: true
                }
              });
            } else {
              that.$router.push({ path: "/main" });
            }
          } else if (response.code == that.code.codeNum.RSA_ERROR) {
            that.$router.push({ path: "/login" });
          } else {
            if (!response.data.errorNum) {
              this.$message({
                type: "error",
                message: response.msg
              });
            } else {
              this.$message({
                type: "error",
                message: response.data.errorNum
              });
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    jumpLoginFz() {
      //方正
      if (this.$route.query.json != undefined) {
        this.jumpLoginData = JSON.parse(this.$route.query.json) || "";
      }
      if (this.jumpLoginData != "") {
        this.$message.success("登录成功!");
        // 存储当前项目ID
        this.$store.commit("projectId", this.jumpLoginData.projectId);

        // 存储用户信息
        this.$store.commit("loginData", this.jumpLoginData.userInfo);
        this.$store.commit("userToken", this.jumpLoginData.token);
        this.$store.commit("userId", this.jumpLoginData.userInfo.id);
        this.$store.commit("userName", this.jumpLoginData.userInfo.name);

        this.$store.commit(
          "userNameAccn",
          this.jumpLoginData.userInfo.username
        );
        sessionStorage.setItem(
          "user_info",
          JSON.stringify(this.jumpLoginData.userInfo)
        );
        sessionStorage.setItem(
          "userToken",
          JSON.stringify(this.jumpLoginData.token)
        );
        sessionStorage.setItem(
          "userId",
          JSON.stringify(this.jumpLoginData.userInfo.id)
        );
        sessionStorage.setItem(
          "userName",
          JSON.stringify(this.jumpLoginData.userInfo.name)
        );
        sessionStorage.setItem("login", JSON.stringify(true));
        // 获取系统模块
        this.$utils.getModule();
        //获取项目信息
        this.getProjectMsg(this.jumpLoginData.projectId);
        // 保存项目ID
        this.$utils.saveProjectId(this.jumpLoginData.projectId);
        //消息连接
        mqReceiveJs.initMqConfig();
        // 清除超过30天的草稿
        this.$utils.clearDraft();

        if (this.$store.state.isPc) {
          this.ChromeMain.CS_Main_Login(
            this.user_name,
            this.pass_word,
            this.publicKeyCode,
            this.checked
          );
        } else if (
          this.jumpLoginData.approvalId != undefined &&
          this.jumpLoginData.approvalId != ""
        ) {
          this.$store.commit(
            "jumpLoginApprovalId",
            this.jumpLoginData.approvalId
          );
          this.$router.push({
            path: "/myapproval",
            query: {
              isJumpLoginappro: true
            }
          });
        } else {
          this.$router.push({ path: "/main" });
        }
      }
    },
    IEVersion() {
      var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
      var isIE =
        userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
      var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
      var isIE11 =
        userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
      if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
          return false;
        } else if (fIEVersion == 8) {
          return false;
        } else if (fIEVersion == 9) {
          return false;
        } else if (fIEVersion == 10) {
          return true;
        } else {
          return false; //IE版本<=7
        }
      } else if (isEdge) {
        return true; //edge
      } else if (isIE11) {
        return true; //IE11
      } else {
        return true; //不是ie浏览器
      }
    }
  }
};
</script>
<style>
.login .el-input--suffix .el-input__inner {
  padding-left: 30px;
}
</style>
<style scoped lang="scss" type="text/css">
.login {
  width: 100%;
  height: 100%;
  background: #f0f2f5;
}
.login_head {
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  height: 72px;
  background: #fff;
  text-align: left;
}

.logo-wrapper {
  margin-left: 120px;
}

.login-logo {
  max-width: 184px;
  height: auto;
  max-height: 44px;
  vertical-align: bottom;
}

.login-text {
  color: #221815;
  font-size: 20px;
  font-weight: 500;
  margin-left: 10px;
}

.sys-title {
  position: absolute;
  top: 64px;
  left: 17px;
  color: #ffffff;
  z-index: 10;
  font-size: 23px;
}
.cont_box {
  position: fixed;
  width: 796px;
  height: 490px;
  left: 50%;
  top: 55%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding-left: 300px;
  box-sizing: border-box;
}

.company-bg {
  position: absolute;
  left: 0px;
  top: -16px;
  height: calc(100% + 32px);
  width: auto;
}
.account-warpper {
  width: 496px;
  height: 100%;
  padding: 54px 64px 0;
  box-sizing: border-box;
  text-align: left;
}
.account-title {
  color: #333;
  font-size: 28px;
  line-height: 76px;
  font-weight: 600;
  text-align: left;
}
.inp_box {
  width: 368px;
  padding: 0;
  height: 40px;
  margin-bottom: 24px;
  position: relative;
}
.tip-img {
  position: absolute;
  left: 8px;
  top: 12px;
  width: 16px;
  height: 16px;
  z-index: 10;
}
.el_inp {
  width: 100%;
  height: 100%;
  padding: 0;
}
.login_btn {
  font-size: 16px;
  display: block;
  width: 100%;
  height: 40px;
  margin-top: 24px;
}
.left-top {
  width: 51px;
  height: 51px;
  position: absolute;
  left: 200px;
  top: 15%;
}
.left-cen {
  width: 174px;
  height: 284px;
  position: absolute;
  left: 0px;
  top: 24%;
}
.left-bom {
  width: 150px;
  height: 106px;
  position: absolute;
  left: 63px;
  bottom: 4%;
}
.right-top {
  width: 70px;
  height: 76px;
  position: absolute;
  right: 100px;
  top: 18%;
}
.right-bom {
  width: 261px;
  height: 284px;
  position: absolute;
  right: 0px;
  bottom: 4%;
}

.login .title-sub {
  position: absolute;
  top: 100px;
  left: 17px;
  color: #ffffff;
  z-index: 10;
  font-size: 16px;
}
.ph-3 {
  padding: 0 3px;
}

@media screen and (max-width: 1640px) and (min-width: 1360px) {
  .login .cont_box {
  }
}

@media screen and (min-width: 1640px) {
}
@media screen and (max-width: 1360px) and (min-width: 1200px) {
}
@media screen and (max-width: 1360px) and (min-width: 821px) {
  /*.login .cont_box {*/
  /*  width: 740px;*/
  /*  height: calc(100% - 80px);*/
  /*}*/
}

@media screen and (max-width: 1280px) and (min-width: 821px) {
  .login-logo {
    // margin: 14px 10px 14px 20px;
  }
  .login .cont_box {
    width: 740px;
    height: 470px;
    padding-left: 266px;
  }
  .login .cont_box .company-bg {
    height: calc(100% + 32px);
  }
  .login .sys-title {
    font-size: 20px;
    top: 60px;
  }
  .login .title-sub {
    font-size: 14px;
  }
}

@media screen and (max-width: 820px) {
  .login-logo {
    // margin: 14px 10px 14px 20px;
  }
  .login .cont_box {
    width: 620px;
    height: 380px;
    padding-left: 250px;
  }
  .login .cont_box .company-bg {
    height: calc(100% + 32px);
  }
  .login .sys-title {
    font-size: 20px;
    top: 60px;
  }
  .login .title-sub {
    font-size: 14px;
  }

  .login .cont_box .account-warpper .account-title {
    font-size: 24px;
  }

  .login .cont_box .account-warpper .inp_box {
    width: 280px;
  }
  .login .cont_box .account-warpper {
    width: 380px;
    padding-top: 30px;
    padding-left: 50px;
    padding-right: 50px;
  }
}
</style>
