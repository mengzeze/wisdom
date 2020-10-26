<template>
  <div class="head_top">
<!--    <el-header>-->
<!--        <span v-html="title.head_top.pro_title"></span>-->
<!--      <el-popover placement="bottom" trigger="click" class="popoverCla">-->
<!--        <el-button slot="reference" class="clearfix set_btn">-->
<!--            <img :src="userImg" class="head_user_img">-->
<!--             <span :title="user_name">欢迎您，{{user_name}}</span>-->
<!--            <img src="../../assets/image/set_biao.png" height="10" width="10">-->
<!--        </el-button>-->
<!--        <ul class="set_menu">-->
<!--            <li class="set_list" v-if="$utils.checkSystemPermission('reception')" @click="tabBehind">切换前台</li>-->
<!--            <li class="set_list" @click="changePass">修改密码</li>-->
<!--            <li class="set_list" @click="backLogin" >退出登录</li>-->
<!--        </ul>-->
<!--      </el-popover>-->
<!--    </el-header>-->


    <el-header>
      <div class="flex j-spaceBetween">
        <span class="header-sys-title">{{subTitle}}</span>

        <div class="flex align-center" style="height: 60px">
          <div class="header-box-pc" v-if="$store.state.isPC">
            <i title="刷新" class="header-refresh" @click="handlerefresh"></i>
            <i :title="netTitle" :class="{'s0': net==='0', 's1': net==='1','s2': net==='2','s3': net==='3','s4': net==='4'}"></i>
            <i title="传输" class="header-transfer" @click="handleTransfer"></i>
          </div>

          <el-dropdown @command="handleCommand"  trigger="click" placement="bottom">
            <span class="flex a-center user-info-box">
              <img :src="userImg" class="head_user_img">
              <span class="header-user-text" :title="user_name">{{title.head_top.welcome}}{{user_name}}</span>
              <img class="ml-5" src="../../assets/image/set_biao.png" height="10" width="10">
            </span>

            <el-dropdown-menu slot="dropdown" class="header-dropdown">
              <el-dropdown-item v-if="$utils.checkSystemPermission('reception')" command="a">切换前台</el-dropdown-item>
              <el-dropdown-item command="d" v-if="client && hasOneClickSyncList.indexOf(client) != -1">一键同步</el-dropdown-item>
              <el-dropdown-item command="b">修改密码</el-dropdown-item>
              <el-dropdown-item command="c">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-header>
      <!--修改密码-->
    <el-dialog title="修改密码"  :visible.sync="passVisible" :close-on-click-modal="false" width="500px">
          <div class="msg_box">
              <div class="pass_box">
                  <label><em>*</em>原密码：</label><el-input type="password" v-model.trim="old_pass" placeholder="请输入6-18位数字字母组合" maxlength="18"></el-input>
              </div>
              <div class="pass_box">
                  <label><em>*</em>新密码：</label><el-input type="password" v-model.trim="new_pass" placeholder="请输入6-18位数字字母组合" maxlength="18"></el-input>
              </div>
              <div class="pass_box">
                  <label><em>*</em>确认密码：</label><el-input type="password" v-model.trim="sure_pass" placeholder="请输入6-18位数字字母组合" maxlength="18"></el-input>
              </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button size="medium" @click="passVisible = false">取 消</el-button>
            <el-button size="medium" type="primary" @click="surechangePass">确认修改</el-button>
          </span>
      </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'head_top',
  data () {
    return {
      subTitle: window.subTitle || '智慧投行管理系统',
      client: window.client,
      hasOneClickSyncList: window.hasOneClickSyncList || [],
      net: '4',
      netTitle: '',
      title: this.common.commonObjFn(),
      user_name: '',
      userImg:'',
      passw: false,
      visib_box: false,
        //    修改密码
        passVisible: false,
        old_pass:'',
        new_pass:'',
        sure_pass: '',
        token:"",
        userId:'',
        usId:'',
    }
  },
  mounted(){
      this.token = this.$store.state.loginObject.userToken;
      this.userId = this.$store.state.loginObject.userId;
      this.usId = JSON.parse(sessionStorage.getItem("user_info")).userInfo.id;
      this.user_name = this.$store.state.loginObject.userName;
      this.userImg = (typeof sessionStorage.userImg !== 'undefined' ? sessionStorage.userImg : require('@/assets/user_img/user2.png'))
    // this.title = this.common.commonObjFn();
    // console.log(this.title)
    // console.log(this.title.head_top.pro_title,1111);
  },
  methods:{
    checkNet(net, title){
      this.net = net
      this.netTitle = title
    },
    handlerefresh(){
      window.location.reload()
    },
    handleTransfer(){
      window.ChromeMain.CS_Main_ShowUpDown()
    },
    handleCommand(v){
      switch (v) {
        case 'a':
          this.tabBehind()
          break;
        case 'b':
          this.changePass()
          break;
        case 'c':
          this.backLogin()
          break
        case 'd':
          this.oneClickSync()
          break
      }
    },
    // 退出登录
    backLogin(){
      this.$confirm('确认退出登录吗', '退出登录', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      })
        .then(() => {
          sessionStorage.removeItem('userImg')
          this.toQuit(true);
          // 投行PC端退出登录
          this.$store.state.isPC && window.ChromeMain.CS_Main_Logout()
        })
        .catch(action => {
          // console.log(action);
        });
    },
    toQuit(isClick){
        var arg = {
            "token":this.token,
            "userId":this.userId,
            "pageNo":0,
            "pageSize":0,
            "data":{}
        };
        var that = this;
      this.$post("/sys/loginOut",arg).then(res => {
            if (res.code ==  that.code.codeNum.SUCCESS) {
                sessionStorage.removeItem("user_info");
                  if(isClick){
                      that.$message({
                          type: 'success',
                          message: '退出成功!'
                        });
                      this.$store.commit("projectId","");
                      sessionStorage.removeItem("userId");
                      sessionStorage.removeItem("login");
                      that.$router.push({path:"/login"});
                      dis_connect();
                  }
             } else {
                  if(isClick){
                      that.$message({
                          type: 'error',
                          message: '退出失败!'
                        });
                  }
                 console.log(res);
            }
        }, res => {
        if(isClick){
            that.$message({
            type: 'error',
            message: '退出失败!'
          });
        }
        console.log(res);
      });
    },
    oneClickSync(){
      var arg = {
        "token":this.token,
        "userId":this.userId
      }
      var url = '/syncdata/syncdata';
      if(this.client == 'fangzhengzhengquan'){//方正
        url = "/dataSyn/dfDataSync";
      }
      this.$post(url,arg).then((response => {
            if(response.code == this.code.codeNum.SUCCESS){
                this.$message.success(response.data);
            }else{
                this.$message.error(response.data);
            }
        })).catch(error => {
            
        });
    },
    // 修改密码
    changePass(){
      // $(".el-popover").css("display","none");
        this.passVisible = true;
      this.passw = true;
      this.visib_box = true;
      this.old_pass='';
      this.new_pass='';
      this.sure_pass='';
    },
    //    确认修改密码
    surechangePass(){
        var reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/;
        if(this.old_pass == ""){
            this.$message.error('原密码内容不能为空');
            return;
        }
        if(this.new_pass == ""){
            this.$message.error('新密码不能为空');
            return;
        }else if(!reg.test(this.new_pass)){
            this.$message.error('新密码格式错误');
            return;
        }
        if(this.sure_pass == ""){
            this.$message.error('确认密码不能为空');
            return;
        }else if(this.sure_pass != this.new_pass){
            this.$message.error('确认密码错误');
            return;
        }
        var passObj  = {
            "data":{
                "id":this.userId,
                "password":this.old_pass,
                "newPassword":this.new_pass
            },
            "token":this.token,
            "userId":this.userId
        };
        var that = this;
        this.$post('/sys/updatePassword',passObj).then((response => {
            console.log(response);
            console.log(response.data);
            var data =  response.data;
            if(response.code == that.code.codeNum.SUCCESS){
                that.$message({
                    type: 'success',
                    message: '修改密码成功!请重新登录'
                });
                that.$router.push({path: '/login'});
            }else{
                that.$message.error(response.msg);
            }
        })).catch(error => {
            this.$message(error.msg,3);
        });
    },
    //切换前台
    tabBehind(){
       this.$router.push({path:"/maindeskindex"});
       // window.localStorage.setItem('logostaet','1')
    }
  }
}
</script>

<style scoped lang="scss" type="text/css">

  .header-box-pc {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
  .header-box-pc>i {
    display: inline-block;
    width: 19px;
    height: 18px;
    margin-right: 17px;
  }
  .header-refresh{
    cursor: pointer;
    background: url("../../assets/pc/header/refresh.png") no-repeat center center;
  }
  .header-transfer{
    cursor: pointer;
    background: url("../../assets/pc/header/chuanshu.png") no-repeat center center;
  }
  .s4{
    background: url("../../assets/pc/header/s-4.png") no-repeat center center;
  }
  .s3{
    background: url("../../assets/pc/header/s-3.png") no-repeat center center;
  }
  .s2{
    background: url("../../assets/pc/header/s-2.png") no-repeat center center;
  }
  .s1{
    background: url("../../assets/pc/header/s-1.png") no-repeat center center;
  }
  .s0{
    background: url("../../assets/pc/header/s-0.png") no-repeat center center;
  }
  .head_user_img {
    float: left;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 10px 0px;
  }
  .header-user-text{
    max-width: 140px;
    text-align: right;
    font-size: 14px;
    font-weight: 600;
    color: #fff;
    padding-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .header-sys-title{
    color:#fff;
    line-height:60px;
    font-size:20px;
    font-weight:bold;
  }
  .ml-5{
    margin-left: 5px;
  }
  .user-info-box{
    padding:0 10px;
  }
  .user-info-box:hover{
    cursor: pointer;
    background: #4e8fec;
    border-radius: 3px;
  }
  .header-dropdown{
    padding-left: 10px;
    padding-right: 10px;
  }




.head_top{
  width:100%;
  height:60px;
  background:#0061A9;
  .el-header{
    height:60px;
  }
.el-dialog{
    text-align:left;
.msg_user{
    border:1px solid #e7e7e7;
}
.msg_box{
    width:100%;
    padding:20px;
    box-sizing: border-box;
.msg_div{
    background: #fff;
ul{
    width:300px;
    float: left;
    height:100%;
li{
    width:100%;
    height:30px;
    line-height: 30px;
    margin-bottom:10px;
label{
    display: inline-block;
    width:50px;
    text-align: right;
}
span{
    display: inline-block;
    width:200px;
    margin-left: 10px;
    text-align: left;
}
}
}
img{
    float: right;
    width:80px;
    height:80px;
}
.el-upload{
    float: right;
    padding-top: 20px;
}
}
.pass_box{
    width:100%;
    height:45px;
    margin-bottom:10px;
label{
    font-weight: bolder;
    display: inline-block;
    width: 100px;
    text-align:right;
em{
    color: red;
}
}
.el-input{
    width:310px;
}
}
}
}
}
.headerimg{
  width: 130px;
    height: 44px;
    overflow: hidden;
    margin-top: 7px;
    margin-left: 28px;
    img{
      width: 100%;
    }
}
.set_menu{
  width:100px;
  .set_list{
    line-height:42px;
    width:100%;
    color:#333;
    text-align:center;
    list-style:none;
    cursor:pointer;
    &:hover{
      background:#F5F7FA;
    }
  }
.all_proje_enum{
    display: none;
}
}
.firsti{
    width: 25px;
    height: 25px;
    border-radius: 23px;
    overflow: hidden;
    vertical-align: middle;
    float: right;
    margin-right: 170px;
    margin-top: 17px;
}
#fiesr2{
    padding-right: 36px;
    line-height: 60px;
    float: right;
    color: white;
}
#first3{
   float: left;
    margin-left: 65px;
    line-height: 60px;
    color: white;
}

</style>

