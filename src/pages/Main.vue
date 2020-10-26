<template>
  <div id="main">
    <examine-button v-if="intelShow"></examine-button>
    <rd-header></rd-header>
    <el-container style="height: calc(100% - 70px)">
      <el-aside class="aside-box" id="aside">
        <el-scrollbar style="height:100%;background: #fff;overflow-x: hidden">
          <aside-left v-show="isFront"></aside-left>
          <aside-behind v-show="!isFront"></aside-behind>
        </el-scrollbar>
      </el-aside>
      <el-main id="el_main" style="height: 100%">

        <el-scrollbar style="height:100%" class="main-scrollbar" wrap-class="default-scrollbar__wrap">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive" id="main_view"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive" id="main_view"></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>

    <all-message></all-message>
    <div class="allFloating background-primary"
         id="allFloating"
         v-if="changeAllFloatingFlag"
         @click="setAllFloatingFn"
         @mouseover="setAllFloatingOverFn($event)"
         @mousedown="setAllFloatingMoveFn($event)"
         @mouseout="setAllFloatingOutFn($event)"
    >
      <div class="iconfont projectchat rd-chat-icon">
        <i v-show="changeIconStyle" class="new-chat-msg"></i>
      </div>
      <div class="pulse"></div>
    </div>
  </div>

    
</template>

<script>
  const previewBaseUrl = '../../../../static/preview/preview.html?rfsId='
  import RdHeader from '@/components/header/header'
  import select_box from '@/components/select_box/select_box'
  import asideLeft from '@/components/aside/aside'
  import AsideBehind from '@/components/backstageaside/backstageaside'
  import allMessage from '@/components/message/allMessage'
  export default {
      name: "Main",
      components:{
        RdHeader,
        AsideBehind,
        asideLeft,
        select_box,
        allMessage
      },
      computed: {
        stage() {
          console.log('stage',this.$store.state.stage)
          return this.$store.state.stage
        },
        getpreview() {
          if(this.$store.state.showPreview){
            let p = this.$store.state.previewData // 预览的数据
            let u = this.$store.state.loginObject // 登录信息
            this.pIframeSrc = previewBaseUrl + p.rfsId + '&docId=' + p.docId + '&token=' + u.userToken + '&userId=' + u.userId;
            console.log(1,  this.pIframeSrc)
            sessionStorage.sourceType = this.$store.state.previewData.sourceType || ''
            // this.savePreviewHistory()
          }
          return this.$store.state.showPreview
        },
        getUserIcons() {
          return this.$store.state.Management.state
        },
        changeAllFloatingFlag() {
          // console.log('消息', this.$store.state.allFloatingObj.allFloatingFlage)
          return this.$store.state.allFloatingObj.allFloatingFlage;
        },
        changeIconStyle() {
          return this.$store.state.allFloatingObj.iconStyle;
        }
      },
      watch: {
        stage(val){
          this.isFront = val==='front'
        },
        $route(to,from){
          this.getIntelShow(to)
        },
        getpreview(val){
          // let p = this.$store.state.previewData // 预览的数据
          // let u = this.$store.state.loginObject // 登录信息
          // console.log(1, p)
          // this.pIframeSrc = previewBaseUrl + p.rfsId + '&docId=' + p.docId + '&token=' + u.userToken + '&userId=' + u.userId;
          // window.open(this.pIframeSrc)
          // sessionStorage.sourceType = this.$store.state.previewData.sourceType || ''
          // this.savePreviewHistory()
          // this.handleClosePreview()
        },
        getUserIcons(val) {
          if(val == 1){
            this.settate=true
          }
        },
        changeIconStyle: {
          handler(newVal,oldVal){
            console.log(newVal,'____')
          },
          deep: true
        },
        "$store.state.previewData.headTitle": function(){
          this.headTitle = this.$store.state.previewData.headTitle;
        }
      },
      data () {
        return {
          intelShow:false,
          isFront: true,
          showDialog: false,
          settate:false,
          token:'',
          userId:'',
          projectId:'',
          pIframeSrc: '',
          positionX: 0,
          positionY: 0,
          headTitle: '预览',
          jumpLoginData:{}
        }
      },
      created(){
        // 处理东亚前海单点登录问题
        if(window.client === 'dongyaqianhai' && !sessionStorage.getItem('login')) {
          this.jumpLoginFz()
        }
        this.token = this.$store.state.loginObject.userToken;
        this.userId = this.$store.state.loginObject.userId;
        this.projectId = this.$store.state.projectMsg.pro_id;
        this.headTitle = this.$store.state.previewData.headTitle;
        this.getUserPerm()
        this.$utils.getProPermissionFn(this.projectId)
        this.isFront = this.$store.state.stage ? this.$store.state.stage==='front' : true

        // //    系统权限
        // getSysPermissionFn(this.$store.state.projectMsg.pro_id);
        // //        项目权限
        // getProPermissionFn(this.$store.state.projectMsg.pro_id);
      },
      mounted(){
        if(this.$store.state.Management.state == 0){
          this.settate=false
        }
        this.getIntelShow(this.$route)
      },
      methods:{
        jumpLoginFz(){//方正  
          if(!this.$route.query || !this.$route.query.json){
            return
          } 
          this.jumpLoginData = JSON.parse(this.$route.query.json) || '';
          if(this.jumpLoginData != '') {
            this.$message.success('登录成功!');
            // 存储当前项目ID
              this.$store.commit("projectId",this.jumpLoginData.projectId);

              // 存储用户信息
              this.$store.commit('loginData',this.jumpLoginData.userInfo);
              this.$store.commit('userToken',this.jumpLoginData.token);
              this.$store.commit('userId',this.jumpLoginData.userInfo.id);
              this.$store.commit('userName',this.jumpLoginData.userInfo.name);

              this.$store.commit('userNameAccn',this.jumpLoginData.userInfo.username);
              sessionStorage.setItem("user_info", JSON.stringify(this.jumpLoginData.userInfo));
              sessionStorage.setItem("userToken", JSON.stringify(this.jumpLoginData.token));
              sessionStorage.setItem("userId", JSON.stringify(this.jumpLoginData.userInfo.id));
              sessionStorage.setItem("userName", JSON.stringify(this.jumpLoginData.userInfo.name));
              sessionStorage.setItem("login", JSON.stringify(true));
              // 获取系统模块
              this.$utils.getModule()
              //获取项目信息
              this.getProjectMsg(this.jumpLoginData.projectId);
              // 保存项目ID
              this.$utils.saveProjectId(this.jumpLoginData.projectId)
              //消息连接
              mqReceiveJs.initMqConfig();
              // 清除超过30天的草稿
              this.$utils.clearDraft()

              if(this.$store.state.isPc) {
                this.ChromeMain.CS_Main_Login(this.user_name, this.pass_word,this.publicKeyCode, this.checked)
              }
          }
        },
        // 智能核查按钮配置
        getIntelShow(router){
          // console.log('router',router)
          this.intelShow = this.$globalConfig.smartVerification.isShowCheck(router,this)
        },
        getUserPerm() {
          this.$utils.getUserPermPromise().then(res=>{
            if(!res || !res.data) return
            this.$store.commit('setSystemPerm', res.data)
            let num = 0
            for(var i=0;i<res.data.length;i++){
              if(data[i] == "reception"){
                num = 1;
              }
            }
            if(num == 0){
              this.$router.push({path:"/backstage"});
            }
          })
        },


        getViewPortHeight() {
          return document.documentElement.clientHeight || document.body.clientHeight;
        },
        handleClosePreview () {
          this.$store.commit('closePreview')
        },
        savePreviewHistory() {
          var data = {
            token: this.$store.state.loginObject.userToken,
            userId: this.$store.state.loginObject.userId,
            data: {
              docId: this.$store.state.previewData.docId
              // docVersionRfs:
            }
          };
          this.$post('/doc/paper/previewDocLogRecord',data)
            .then((res) => {

            })
            .catch((error) => {
              console.log(error);
            });
        },
        setAllFloatingFn() {
          console.log('点击消息')
          let isClick = document.getElementById('allFloating').getAttribute('data-flag');
          console.log(isClick, '0000data-flag')
          if(isClick !== 'true') {
            return false
          }
          let allFloatingFromUrl = sessionStorage.allFloatingFromUrl
          window.msg.$store.state.allFloatingObj.iconStyle = false;
          sessionStorage.isAllChat = false;
          // 看是否有项目的权限，有则跳转到相对应的悬浮框，没有则提示后消失
          // console.log(22, this.$store.state.proChatIsShow)
          if (this.$store.state.proChatIsShow) {
            this.$router.push({
              path: allFloatingFromUrl,
              query: {
                prePro : true
              }
            })
            return
          }
          this.$message.error('您无权限查看该项目')
          setTimeout(()=>{
            let allFloatingFlage = false;
            sessionStorage.isAllChat = false;
            let formObj = {
              allFloatingFromUrl: allFloatingFromUrl,
              allFloatingFlage: allFloatingFlage
            }
            this.$store.commit('allFloatingFn', formObj)
          },500)
        },
        setAllFloatingOverFn(e) { //设置鼠标移入动画
          var over = document.querySelector('.pulse')
          //设置动画
          over.style['-webkit-animation'] = 'wave 1s ease-out';
          over.style['-moz-animation'] = 'wave 1s ease-out';
          over.style.animation = 'wave 1s ease-out';
          //配置动画
          over.style['-webkit-animation-iteration-count'] = 'infinite';
          over.style['-moz-animation-iteration-count'] = 'infinite';
          over.style.animationIterationCount = 'infinite';
        },
        setAllFloatingMoveFn(e) {
          let bdiv = document.getElementById('main')
          let odiv = document.getElementById('allFloating');   //获取当前元素
          let firstTime='',lastTime='';
          document.getElementById('allFloating').setAttribute('data-flag',false)
          firstTime = new Date().getTime();
          let disX = e.clientX - odiv.offsetLeft;
          let disY = e.clientY - odiv.offsetTop;
          document.onmousemove = (e)=>{
            //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            let left = e.clientX - disX;
            let top = e.clientY - disY;

            var width = bdiv.clientWidth - odiv.offsetWidth
            var height = bdiv.clientHeight - odiv.offsetHeight

            left = Math.min(Math.max(0, left), width)
            top = Math.min(Math.max(0, top), height)

            // //绑定元素位置到positionX和positionY上面
            // this.positionX = left;
            // this.positionY = top;

            //移动当前元素
            odiv.style.left = left + 'px';
            odiv.style.top = top + 'px';
          };
          document.onmouseup = (e) => {
            document.onmousemove = null;
            document.onmouseup = null;
            lastTime = new Date().getTime();
            if( (lastTime - firstTime) < 200){
              document.getElementById('allFloating').setAttribute('data-flag',true)
            }
          };
        },
        setAllFloatingOutFn(e) {
          var out = document.querySelector('.pulse')
          //删除动画
          out.style['-webkit-animation'] = '';
          out.style['-moz-animation'] = '';
          out.style.animation = '';
          //删除动画配置
          out.style['-webkit-animation-iteration-count'] = '';
          out.style['-moz-animation-iteration-count'] = '';
          out.style.animationIterationCount = '';
        }
      }
    }
</script>

<style scoped>
  .main-scrollbar /deep/ .el-scrollbar__bar.is-horizontal {
    height:0;
  }
  #main{
    height: 100%;
  }
  .allFloating{
    width: 64px;
    height: 64px;
    border-radius: 50%;
    position: fixed;
    right: 80px;
    top: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    z-index: 999;
  }
  .rd-chat-icon{
    font-size: 36px;
    color:#fff;
  }
  .new-chat-msg{
    position: absolute;
    display: inline-block;
    width: 12px;
    right: 17px;
    top: 13px;
    height: 12px;
    border-radius: 50%;
    background-color: #ff0000;
    }
  .chat{
    position: absolute;
    width: 64px;
    height: 64px;
    left: 0;
    top: 0;
    /* background: url('../assets/common_icon/chat_icon.png') no-repeat; */
    /* background-size: 65px 65px; */
    z-index: 2;
    /* border-radius: 50%; */
    /* box-shadow: 2px 2px 5px #275AA6; */
  }
  .chats{
    position: absolute;
    width: 64px;
    height: 64px;
    left: 0;
    top: 0;
    /* background: url('../assets/common_icon/haveChat_icon.png') no-repeat; */
    /* background-size: 65px 65px; */
    z-index: 2;
    /* border-radius: 50%;
    box-shadow: 2px 2px 5px #275AA6; */
  }
  .pulse {
    position: absolute;
    width: 80px;
    height: 80px;
    left: -12px;
    top: -12px;
    /* border: 4px solid #275AA6; */
    -webkit-border-radius: 30px;
    -moz-border-radius: 30px;
    border-radius: 90px;
    z-index: 1;
    opacity: 0;
  }
  @keyframes wave {
    0% {
      transform: scale(0);
      opacity: 0.0;
    }
    25% {
      transform: scale(0);
      opacity: 0.3;
    }
    50% {
      transform: scale(0.1);
      opacity: 0.6;
    }
    75% {
      transform: scale(0.5);
      opacity: 0.9;
    }
    100% {
      transform: scale(1);
      opacity: 0.0;
    }
  }
  @-webkit-keyframes wave {
    0% {
      -webkit-transform: scale(0);
      opacity: 0.0;
    }
    25% {
      -webkit-transform: scale(0);
      opacity: 1;
    }
    50% {
      -webkit-transform: scale(0.1);
      opacity: 1;
    }
    75% {
      -webkit-transform: scale(0.5);
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(1);
      opacity: 0.0;
    }
  }
  .aside-box{
    width: auto!important;
  }
</style>
