<template>
  <div class="head_top_qian">
    <el-header>
      <div class="flex j-spaceBetween">
        <span class="header-sys-title">{{subTitle}}</span>
        <div class="flex a-center" style="height: 60px">

          <div class="header-box-pc" v-if="$store.state.isPC">
            <i title="刷新" class="header-refresh" @click="handlerefresh"></i>
            <i :title="netTitle" :class="{'s0': net==='0', 's1': net==='1','s2': net==='2','s3': net==='3','s4': net==='4'}"></i>
            <i title="传输" class="header-transfer" @click="handleTransfer"></i>
          </div>
          <div class="header__icon-box">
            <span class="iconfont" v-if="isFront && $utils.checkSystemPermission('project_report')" @click="handleReportShow">&#xe684;</span>
          </div>
          <theme-picker v-if="isShowThemePicker" style="float:right;" class="theme-picker" @onThemeChange="onThemeChange"></theme-picker>

          <el-dropdown @command="handleCommand"  trigger="click" placement="bottom">
            <span class="flex a-center user-info-box">
              <img :src="defaultImage" class="head_user_img">
              <span class="header-user-text" :title="user_name">{{title.head_top.welcome}}{{ userNameStored || user_name }}</span>
              <img class="ml-5" src="../../assets/image/set_biao.png" height="10" width="10">
            </span>

            <el-dropdown-menu slot="dropdown" class="header-dropdown">
              <el-dropdown-item v-if="isFront && $utils.checkSystemPermission('backstage')" command="a">切换后台</el-dropdown-item>
              <el-dropdown-item v-if="!isFront && $utils.checkSystemPermission('reception')" command="e">切换前台</el-dropdown-item>
              <el-dropdown-item command="f" v-if="client && hasOneClickSyncList.indexOf(client) != -1">{{title.head_top.oneClickSync}}</el-dropdown-item>
              <el-dropdown-item v-if="isFront" command="b">{{title.head_top.user_msg}}</el-dropdown-item>
              <el-dropdown-item  command="g">使用帮助</el-dropdown-item>
              <el-dropdown-item command="c">{{title.head_top.change_pass}}</el-dropdown-item>
              <el-dropdown-item command="d" >{{title.head_top.back_login}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-header>
      <report-list ref="reportList"></report-list>
      <!--个人基本信息-->
      <el-dialog title="个人信息" :close-on-click-modal="false"  :visible.sync="dialogVisible" :before-close="userClose" width="500px" class="personmessage">
          <div class="msg_box msg_user">
              <div class="clearfix msg_div">
                  <ul>
                      <li>
                          <el-row>
                                <el-col :span="4">
                                    <label>账号：</label>
                                </el-col>
                                <el-col :span="20">
                                    <span>{{msgObj.username}}</span>
                                </el-col>
                          </el-row>
                      </li>
                      <li>
                          <el-row>
                              <el-col :span="4">
                                    <label><em style="color:red">*</em>姓名：</label>
                                </el-col>
                                <el-col :span="20">
                                    <span v-if="img_upload == false">{{msgObj.name}}</span>
                                    <input type="text" class="inpss" style="width: 80%;height: 28px;outline-style: none;border: 1px solid #e4e7ed;padding-left: 8px;" v-if="img_upload == true" v-model.trim="name" placeholder="请输入姓名,最多可输入10字符" maxlength="10">
                                    <!-- <el-input v-if="img_upload == true" v-model.trim="name" placeholder="请输入内容" maxlength="10"></el-input> -->
                                 </el-col>
                          </el-row>
                      </li>
                      <li>
                         <el-row>
                              <el-col :span="4">
                                <label><em style="color:red">*</em>性别：</label>
                            </el-col>
                            <el-col :span="20">
                                <span v-if="img_upload == false">{{(msgObj.sex == 0 ? '男' : '女' )}}</span>
                                <el-select v-if="img_upload == true" v-model="sex" placeholder="请选择">
                                    <el-option v-for="item in sexObj" :key="item.value"  :label="item.label"  :value="(item.value == '0'? '男' : '女' )">
                                    </el-option>
                                </el-select>
                               </el-col>
                          </el-row>
                      </li>
                      <li>
                        <el-row>
                              <el-col :span="4">
                                <label>手机：</label>
                            </el-col>
                            <el-col :span="20">
                                <span v-if="img_upload == false">{{msgObj.mobile}}</span>
                                <!-- <el-input v-if="img_upload == true" v-model.trim="phone" placeholder="请输入内容"></el-input> -->
                                 <input type="text" class="inpss" style="width: 80%;height: 28px;outline-style: none;border: 1px solid #e4e7ed;padding-left: 8px;" v-if="img_upload == true" v-model.trim="phone"  placeholder="请输入手机号" >
                            </el-col>
                        </el-row>
                      </li>
                      <li>
                        <el-row>
                            <el-col :span="4">
                                <label>邮箱：</label>
                            </el-col>
                            <el-col :span="20">
                                <span style="width: 206px;height: 24px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" :title="msgObj.email" v-if="img_upload == false">{{msgObj.email}}</span>
                                <!-- <el-input v-if="img_upload == true" v-model.trim="email" placeholder="请输入内容"></el-input> -->
                                 <input type="text" maxlength="50" class="inpss" style="width: 80%;height: 28px;outline-style: none;border: 1px solid #e4e7ed;padding-left: 8px;" v-if="img_upload == true" v-model.trim="email" placeholder="请输入邮箱" >
                             </el-col>
                        </el-row>
                      </li>
                      <li>
                        <el-row>
                            <el-col :span="4">
                                <label>部门：</label>
                           </el-col>
                            <el-col :span="20">
                                <span>{{msgObj.deptName}}</span>
                            </el-col>
                        </el-row>
                      </li>
                      <li>
                        <el-row>
                            <el-col :span="4">
                                <label>职位：</label>
                             </el-col>
                            <el-col :span="20">
                                <span>{{msgObj.job}}</span>
                             </el-col>
                        </el-row>
                      </li>

                      <li>
                          <el-row>
                           <el-col :span="4">
                               <label>角色：</label>
                            </el-col>
                            <el-col :span="20">
                          <span style="height:86px;overflow-y:auto;font-size: 13px;border: 1px solid #f1f1f1;width: 350px;padding: 5px;border-radius: 5px;overflow: hidden;margin-left: 20px;"> <el-scrollbar style="height:100%">{{msgObj.roleName}}</el-scrollbar></span>
                          </el-col>
                          </el-row>
                      </li>
                  </ul>
                  <!--<img :src="msgObj.userImg" alt=""  v-if="img_upload == false" />-->
                  <!--<img :src="msgObj.userImg" alt=""  v-if="img_upload == true"  @click="uploadImg"/>-->
                  <template v-if="img_upload">
                      <div class="msg_user_header">
                        <div>
                            <img :src="(catchImage==''? defaultImage : catchImage)" alt="">
                        </div>
                        <div>
                            <el-button type="primary" size="small" @click.stop="uploadImg">上传图片</el-button>
                        </div>
                    </div>
                  </template>
                  <template v-else>
                      <div class="msg_user_header">
                          <img :src="defaultImage" alt="">
                      </div>
                  </template>
              </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button class="mr-10" size="medium" @click.stop="userClose">取 消</el-button>
            <el-button size="medium" type="primary" @click.stop="userMsgBox">{{text_btn}}</el-button>
          </span>
      </el-dialog>
      <!--修改密码-->
      <el-dialog title="修改密码" :close-on-click-modal="false" :visible.sync="passVisible"  width="500px">
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
            <el-button size="medium" @click.stop="passVisible = false">取 消</el-button>
            <el-button size="medium" type="primary" @click.stop="surechangePass">确认修改</el-button>
          </span>
      </el-dialog>
      <!--上传-->
      <rd-uploader ref="RdUploader" @uploaded="docUpload"></rd-uploader>
  </div>
</template>

<script>
import frontRouter from '@/router/front-router'
import backRouter from '@/router/back-router'
import reportList from './components/reportList'
import axios from "axios";
export default {
  name: 'head_top',
  data() {
    return {
      isFront: true, // 是否为前台
      subTitle: window.subTitle || '智慧投行管理系统',
      client: window.client,
      hasOneClickSyncList: window.hasOneClickSyncList || [],
      net: '4',
      netTitle: '',
      catchImage:'',
      defaultImage:require('@/assets/user_img/user2.png'),
      title: this.common.commonObjFn(),
      user_name: '',
      userImg:'',
      passw: false,
      visib_box: false,
        img_upload: false,
        name:"",
        phone:'',
        email:'',
        sexObj: [{
            value: '0',
            label: '男'
        }, {
            value: '1',
            label: '女'
        }],
        sex: '',
        dialogVisible: false,
        msgObj:{},
        text_btn:'编辑',
        imgUrl:'../../assets/image/user.png',
        imageUrl: '',

    //    修改密码
        passVisible: false,
        old_pass:'',
        new_pass:'',
        sure_pass: '',
        token:"",
        userId:'',
        uploadDocAddIsShow: false,
        addDoc:false,
        uploadParamData: {
            docSource: 0,
            projId: 0,
            parentId: 0,
        },
    }
  },
  components:{
    reportList
  },
  watch:{
    defaultImage(a){
      if(a!==''){
          sessionStorage.userImg = a
      }
    },
    stage(val){
      this.isFront = val==='front'
    }
  },
  created(){
    window.PC.checkNet = this.checkNet
    this.isFront = this.$store.state.stage ? this.$store.state.stage==='front' : true
  },
  computed:{
    stage(){
      return this.$store.state.stage
    },
    isShowThemePicker() {
        return process.env.NODE_ENV !== 'production'
    },
    userNameStored() {
      this.user_name = this.$store.state.userName
      return this.$store.state.loginObject.userName
    }
  },
  mounted(){
      this.token = this.$store.state.loginObject.userToken;
      this.userId = this.$store.state.loginObject.userId;
      this.user_name = this.$store.state.loginObject.userName;
      this.userMessageUpload()
  },
  methods:{
    handleReportShow(){
      this.$refs.reportList.handleShow()
    },
    
    // 切换主题
    onThemeChange(themeColor) {
      this.$store.commit('setThemeColor', themeColor)
    },

    /**
     * 检测网络
     * @param net
     * @param title
     */
    checkNet(net, title){
      this.net = net // 网络信号
      this.netTitle = title // 网络提示
    },
    /**
     * 刷新页面
     */
    handlerefresh(){
      window.location.reload()
    },
    /**
     * 传输
     */
    handleTransfer(){
      window.ChromeMain.CS_Main_ShowUpDown()
    },
    handleCommand(v){
      switch (v) {
        case 'a':
          this.tabBehind()
              break
        case 'b':
          this.userMsg()
              break
        case 'c':
          this.changePass()
              break
        case 'd':
          this.backLogin()
              break
        case 'e':
          this.tabFront()
              break
        case 'f':
          this.oneClickSync()
              break
        case 'g':
          this.helpPreview()
              break
      }

    },
      myHeadFile(e){
        const file = e.srcElement.files[0]
        const imgURL = window.URL.createObjectURL(file) 
        console.log(imgUrl)
      },
    //  上传
      uploadAddDocClose() {
          this.uploadDocAddIsShow = false;
          this.addDoc = false;
      },
      docUpload(uploadData){
          this.$refs['RdUploader'].handleUploadSuccess(uploadData.tId)
          this.catchImage = (uploadData.docId !== '' && uploadData.docId !== 'null' && uploadData.docId !== null) 
          ? this.$utils.getDownloadUrl(uploadData.docId) 
          : require('@/assets/user_img/user2.png')
          this.userImg = uploadData.docId
      },

      // 退出登录
    backLogin(){
      this.$confirm('确认退出登录吗？', '退出登录', {
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
      this.$post("/sys/loginOut",arg).then(res => {
        if (res.code == 0) {
          sessionStorage.removeItem("user_info");
          localStorage.removeItem("user_info");
           this.$store.dispatch('loginData',"");
           this.$store.dispatch('userToken',"");
          if(isClick){
            this.$message({
              type: 'success',
              message: '退出成功!'
            });
              this.$store.commit("projectId","");
              sessionStorage.removeItem("userId");
              sessionStorage.removeItem("login");
              this.$router.push({path:"/login"});
              dis_connect();
          }
        } else {
          if(isClick){
            this.$message({
              type: 'error',
              message: '退出失败!'
            });
          }
        }
      }, res => {
        if(isClick){
          this.$message({
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
    //切换后台
    tabBehind(){
      this.handleToMenu('back')
    },

    //切换前台
    tabFront(){
      this.handleToMenu('front')
    },
    handleToMenu(key){
      axios.all([
        this.$utils.getUserPermPromise(),
        this.$utils.getModulePromise(),
        this.$utils.getProjectPermPromise(),
        this.$utils.initRoleData()
      ]).then(axios.spread((res1, res2, res3, res4) => {
        this.$store.commit('setSystemPerm', res1)
        this.$store.commit('setModule', res2)
        this.$store.commit('setProjectPerm', res3)
        this.$store.commit('setRoleModule', {})//先把数据清空
        this.$store.commit('setRoleModule', res4)//角色配置数据
        let routerData = key === 'front' ? frontRouter : backRouter
        let router = routerData.find(v=> {
        if(!v.meta.isMenu) { // notMenu
          return false
        } else if(key==='back' && !this.$utils.checkSystemPermission('backstage')){
          return false
        } else if(key==='front' && !this.$utils.checkSystemPermission('reception')) {
          return false
        } else if(!v.meta.authData || !v.meta.authData.length) { // isMenu && 不需要权限判断
          return true
        }
        
          let access = 0
          v.meta.authData.forEach(a => {
            a.isProject && this.$utils.checkProjectPermission(a.code) && access++
            a.isSystem && this.$utils.checkSystemPermission(a.code) && access++
            a.isMaindesk && this.$utils.roleM(a.code) && access++
            a.isModule && this.$utils.m(a.code) && access++
          })
          return access === v.meta.authData.length
        })
        // console.log('router', router)
        if(!router) {
          this.$message.error('没有权限进入该页面')
          return
        }
        key === 'front' ? this.$store.commit('setStage', 'front') : this.$store.commit('setStage', 'back')
        this.$router.push({path:router.path});
      }))
    },


  //  个人信息
      userMsg(){
           this.dialogVisible = true;
           this.img_upload = false;
           this.text_btn = "编辑";
           this.userMessageUpload()
      },
      userMessageUpload(){
          var dataObj = {
               "token":this.token,
               "userId":this.userId,
               "data":{
                   "id":this.userId
               }
           };
          var that = this;
          this.$post("/sys/selectUserInfoByUserId",dataObj).then((response => {
              var data =  response.data;
              if(response.code == that.code.codeNum.SUCCESS){
                this.defaultImage = (typeof data.userImg == 'string' && data.userImg !== '' && data.userImg !== 'null' && data.userImg !== null) 
                ? this.$utils.getDownloadUrl(data.userImg) 
                : require('@/assets/user_img/user2.png')
                this.userImg = data.userImg
                  if(data){
                      if(data.sex == 0){
                          this.sex = "男"
                      }else{
                          this.sex = "女"
                      }
                      this.msgObj = {
                          username:data.username,
                          name:data.name,
                          sex:data.sex,
                          mobile:data.mobile,
                          email:data.email,
                          deptName:data.deptName,
                          deptId:data.deptId,
                          job:data.job,
                          roleName:data.roleName,
                          roleId:data.roleId,
                          // userImg:data.userImg,
                          id:data.id
                      };
                      let isSuper = data.isSuper === 1 ? true : false;
                      this.$store.commit('isSuperUser',isSuper);//当前登录用户是否是超级用户
                  }else{
                      this.$message("查询结果为空！");
                  }
              }else{
                  this.$message(response.msg);
              }
          })).catch(error => {
              console.log(error);
          });
      },
  //    图片上传
      uploadImg() {
        let options = {
          multiple: false,
          accept: 'png,jpg,jpeg,gif'
        }
        this.$refs['RdUploader'].openSelect(options, this.uploadParamData)

      },

    handleUploaded(data){
      this.docUpload(data)
    },

      userClose(){
          this.catchImage = ''
          this.dialogVisible = false
      },
      //    编辑个人信息
      userMsgBox(){
          if(this.text_btn == "编辑"){
              this.text_btn = "确定";
              this.img_upload = true;
              this.name = this.msgObj.name;
            //   this.sex = this.msgObj.sex ;
              this.phone = this.msgObj.mobile;
              this.email = this.msgObj.email;
          }else{
              if(this.name.length < 1){
                  this.$message.error('请输入姓名');
                  return;
              }
              var myreg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
              if(this.phone){
                  if(!myreg.test(this.phone)){
                      this.$message.error('手机号输入错误,请重新输入');
                      return;
                  }
              }
              if(this.email){
                  if(!this.$utils.testEmail(this.email)){
                      this.$message.error('邮箱输入格式错误,请重新输入');
                      return;
                  }
              }
              if(this.sex == "男" || this.sex == 0){
                  this.msgObj.sex = 0;
              }else{
                  this.msgObj.sex = 1;
              }

              this.msgObj.name = this.name;
            //   this.msgObj.sex = this.sex;
              this.msgObj.mobile = this.phone;
              this.msgObj.email = this.email;
              this.msgObj.userImg = (this.userImg == '' ? (typeof sessionStorage.userImg !== 'undefined' ? sessionStorage.userImg : '' ) : this.userImg);
              this.msgObj.id = this.userId;
              this.defaultImage = (this.catchImage !== ''? this.catchImage : (typeof sessionStorage.userImg !== 'undefined'? sessionStorage.userImg : require('@/assets/user_img/user2.png')) );
              this.catchImage = ''
              // this.img_upload = true;
              var msgObj = {
                  "data":this.msgObj,
                  "token":this.token,
                  "userId":this.userId,
              };
              var that = this;
              this.$post("/sys/editUserInfo",msgObj).then((response => {
                  if(response.code == that.code.codeNum.SUCCESS){
                      that.dialogVisible = false;
                      that.$message({
                          type: 'success',
                          message: '修改个人信息成功!'
                      });
                      that.$store.commit("userName",that.name)
                      that.user_name = that.name;
                  }else{
                      that.$message({
                          type: 'error',
                          message: response.msg
                      });
                  }
              })).catch(error => {
                  console.log(error);
              });
          }
      },
      // 修改密码
      changePass(){
          // $(".el-popover").css("display","none");
          this.passVisible = true;
          this.old_pass='';
          this.new_pass='';
          this.sure_pass='';
      },
  //    确认修改密码
      surechangePass(){
            var reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/;
            console.log(this.old_pass+'________-')
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
              this.$message.error('确认密码与新密码不符,请重新输入');
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
          this.$post('/sys/updatePassword',passObj).then((response => {
              if(response.code !== this.code.codeNum.SUCCESS){
                this.$message.error(response.msg);
              }else{
                this.$message.success('修改密码成功!请重新登录')
                this.$router.push({path: '/login'});
              }
          })).catch(error => {
              console.error(error)
          });
      },
      //  使用帮助 预览
      helpPreview(){
        var proViewData = {
          projectId:'',
          rfsId: '',
          docId: '',
          photoType: 'pdf',
          docName: '使用帮助手册',
          sourceType: 'helpfile'
        }
        this.$store.commit('previewAllFn',proViewData)
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
    border-radius: 3px;
  }
  .header-dropdown{
    padding-left: 10px;
    padding-right: 10px;
  }

.head_top_qian{
      width:100%;
      height:60px;
      .el-header{
            height:60px;
        }
        .el-dialog{
            text-align:left;
            .msg_user{
                // border:1px solid #e7e7e7;
                &_header{
                    float:left;
                    width:120px;
                    padding:20px 0px;
                    text-align:center;
                    img{
                        float:none !important;
                        display:block;
                        width: 62px !important;
                        height: 62px !important;
                        margin:0px auto;
                    }
                    button{
                        margin:10px 0px;
                    }
                }
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
                                margin-left: 5px;
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
                        width: 85px;
                        text-align: left;
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

  .header__icon-box{
    color:#fff;
    padding:0px 20px;
    *{
      font-size: 20px;
      font-weight: 400;
      cursor: pointer;
      &:hover{
        color:#ccc
      }
    }
  }
</style>
<style>
    .head_top_qian .el-dialog__header{
        border-bottom: 1px solid #eee!important;
    }
.head_top_qian .personmessage .el-dialog__body{
    padding:0px 20px;
}
    .head_top_qian .personmessage .el-dialog__footer{
    margin-top: -25px;
}
    .head_top_qian .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
    .head_top_qian .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
    .head_top_qian .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 58px;
    height: 58px;
    line-height: 58px;
    text-align: center;
}
    .head_top_qian .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
    .head_top_qian .msg_div .el-input{
    width: 210px;
    height: 30px;
}
    .head_top_qian .msg_div .el-input__inner{
    height:30px;
}
    .head_top_qian .msg_div .el-select{
    width: 210px;
    height: 30px;
}
    .head_top_qian .msg_div .el-input{
    width: 210px;
    height: 30px;
}
    .head_top_qian .msg_div .el-input__icon{
        line-height: 0;
    }
    .head_top_qian .head_top .el-popover{
        min-width:100px;
    }
    .inpss{
        outline-style: none ;
        border: 1px solid #ccc; 
        border-radius: 3px;
        padding-left: 1px;
        font-size: 13px;
    }
    ::-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #ccc;
    padding-left: 1px;
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:  #ccc;
    padding-left: 1px;
    }
    input::-webkit-input-placeholder{
    color:  #ccc;
    padding-left: 1px;
    }
</style>
