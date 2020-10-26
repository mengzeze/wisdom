<template>
  <div class="asides">
    <el-radio-group v-model="isCollapse"
                    class="left-menu-btn"
                    @change="watchCollapseValue"
                >
      <el-radio-button :label="false"
                       v-show="isCollapse">
        <i class="el-icon-d-arrow-right"></i>
      </el-radio-button>
      <el-radio-button :label="true"
                       v-show="!isCollapse">
        <i class="el-icon-d-arrow-left"></i>
      </el-radio-button>
    </el-radio-group>
    <el-menu :default-active="curMenu"
             class="el-menu-vertical-demo"
             @select="handleMenuSelect"
             :collapse="isCollapse"
             ref="menuRef"
            >
      <el-submenu index="1">
        <template slot="title">
          <!-- 一级菜单 -->
          <i><img src="../../assets/image/aside/asdeicon1.png"
                 alt=""
                 style="width:18px;height:18px;margin-right:4px;"></i>
          <span>主工作台</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item 
                      index="/myapproval"
                      style="padding-left:46px;">我的审批</el-menu-item>
        <el-menu-item 
                      index="/statisticalpro"
                      style="padding-left:46px;">项目统计</el-menu-item>
        <el-menu-item 
                      index="/calendar"
                      style="padding-left:46px;">日历表</el-menu-item>
        <el-menu-item 
                      index="/backlogmatter"
                      style="padding-left:46px;">待办事项</el-menu-item>
        <el-menu-item v-if="$utils.m('customer_manage') && $utils.roleM('my_client')"
                      index="/myclient"
                      style="padding-left:46px;">我的客户</el-menu-item>
        <el-menu-item v-if="$utils.m('project_meeting') && $utils.roleM('meeting')"
                      index="/mymeeting"
                      style="padding-left:46px;">我的会议</el-menu-item>
        <el-menu-item v-if="$utils.m('project_vote') && $utils.roleM('vote')"
                      index="/myvote"
                      style="padding-left:46px;">我的投票</el-menu-item>
        <el-menu-item v-if="$utils.m('project_log') && $utils.roleM('my_log')"
                      index="/mydiary"
                      style="padding-left:46px;">我的日志</el-menu-item>
      </el-submenu>
      <el-submenu v-if="$utils.m('customer_manage') && $utils.checkSystemPermission('crm_manage')"
                  index="2"
                  class="back_list_rout">
        <template slot="title">
          <!-- 一级菜单 -->
          <i><img src="../../assets/image/aside/asdeicon3.png"
                 alt=""
                 style="width:18px;height:18px;margin-right:4px;"></i>
          <span>客户管理</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item index="/medium">融资客户管理</el-menu-item>
        <el-menu-item index="/natural">自然人客户</el-menu-item>
        <el-menu-item index="/financing">中介机构</el-menu-item>
        <el-menu-item index="/customcontact">客户联系人</el-menu-item>
        <el-menu-item index="/customvisit">客户拜访记录</el-menu-item>
      </el-submenu>
      <el-submenu v-if="$utils.checkSystemPermission('project_manage')"
                  index="3"
                  class="back_list_rout">
        <template slot="title">
          <!-- 一级菜单 -->
          <i><img src="../../assets/image/aside/asdeicon2.png"
                 alt=""
                 style="width:18px;height:18px;margin-right:4px;"></i>
          <span>项目管理</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item index="/projectlist"
                      style="padding-left:46px;"
                      class="menu_list">项目列表
        </el-menu-item>
        <el-menu-item v-if="$utils.m('project_task') && $utils.checkProjectPermission('project_task')"
                      index="/projecttasks"
                      style="padding-left:47px!important">项目任务
        </el-menu-item>
        <el-menu-item v-if="$utils.checkProjectPermission('project_user')"
                      index="/projectmember"
                      style="padding-left:46px!important;">项目成员
        </el-menu-item>
        <el-menu-item v-if="$utils.checkProjectPermission('project_information')"
                      index="/projectmessage"
                      style="padding-left:46px;">项目信息
        </el-menu-item>
        <el-menu-item v-if="$utils.checkProjectPermission('project_role')"
                      index="/projectrole"
                      style="padding-left:46px;">项目角色权限
        </el-menu-item>
        <el-menu-item v-if="$utils.m('project_meeting') && $utils.checkProjectPermission('project_meet')"
                      index="/projecmeeting"
                      style="padding-left:46px;">项目会议
        </el-menu-item>

        <el-menu-item v-if="$utils.m('project_vote') && $utils.checkProjectPermission('project_vote')"
                      index="/projecvote"
                      style="padding-left:46px;">项目投票
        </el-menu-item>
        <el-menu-item v-if="$utils.checkProjectPermission('project_file')"
                      index="/projectDoc"
                      style="padding-left:46px;">项目文档
        </el-menu-item>
        <el-menu-item v-if="projectHide"
                      index="/projecexamine"
                      style="padding-left:46px;">项目审批
        </el-menu-item>
        <el-menu-item v-if="$utils.checkProjectPermission('projet_log')"
                      index="/projecJournal"
                      style="padding-left:46px;">项目日志
        </el-menu-item>
        <el-menu-item index="/projecchat"
                      style="padding-left:46px;"
                      v-if="chatIsShow">项目聊天
          <!-- <el-menu-item index="/projecchat"  style="padding-left:46px;" v-if="store.state.proChatIsShow">项目聊天 -->
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-if="$utils.m('paper_manage') && $utils.checkSystemPermission('paper_mange')"
                    index="/manuscriptmanage"
                    class="back_list_rout">
        <i><img src="../../assets/image/aside/asdeicon4.png"
               alt=""
               style="width:18px;height:18px;margin-right:4px;"></i>
        <span slot="title">底稿管理</span>
      </el-menu-item>
      <!-- <el-submenu
                  index="4" class="back_list_rout">
        <template slot="title">
          <i><img src="../../assets/image/asdeicon7.png" alt="" style="width:18px;height:18px;margin-right:4px;"></i>
          <span>合规管理</span>
        </template>
        <el-menu-item index="/antiWashMoney" style="padding-left:46px;" class="menu_list">反洗钱
        </el-menu-item>
        <el-menu-item
                      index="/gainConflictCheck" style="padding-left:47px!important">利益冲突核查
        </el-menu-item>
      </el-submenu> -->
      <el-menu-item index="/messagecenter"
                    class="msg_cen_menu">

        <i>
          <img src="../../assets/image/aside/asdeicon5.png"
               alt=""
               style="width:18px;height:18px;margin-right:4px;">
          <i class="badge" v-show="isCollapse && isShowIcon"></i>
        </i>
        <div slot="title"
             class="message_box">
          <span>消息中心</span>
          <span v-show="!isCollapse && isShowIcon"
                class="message_icon"><img src="../../assets/image/aside/new.png"
                 alt=""></span>
        </div>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import { constants } from "fs";
import { setTimeout } from 'timers';

export default {
  data() {
    return {
      token: '',
      userId: '',
      projectId: '',
      requestCode: {},//接口默认字段
      chatIsShow: false,
      isCollapse: false,
      projectHide: false,
      client: window.client,
      otherCurMenu: null,
    };
  },
  created() {
    this.token = this.$store.state.loginObject.userToken;
    this.userId = this.$store.state.loginObject.userId;
    this.projectId = this.$store.state.projectMsg.pro_id;
    this.requestCode = this.code.codeNum;
    this.chatIsShow = this.$store.state.proChatIsShow;
    this.projectHide = this.$store.state.projectHide;
    this.initHide()
  },
  methods: {
    watchCollapseValue() {
      if (!this.isCollapse) {
        setTimeout(() => {
          this.bindEvent();
        }, 500)
      }
    },

    bindEvent() {
      const el = this.$el.querySelector('.el-submenu__title');
      el.addEventListener('click', () => {
        this.$router.push({ path: "/main" });
        //this.$refs.menuRef.open('1');
        //console.log(this.$refs.menuRef.collapse,'--this.$refs.menuRef')
      });
    },
    menuList() {
      // elementUI NavMenu组件自带样式切换，不需要手动切换
      // $(".menu_btn").removeClass("is-active");
    },
    handleMenuSelect(index) {
      let path = index
      if (path === '/projecttasks') {
        path = '/project_tasks/tasks'
      }
      if(index == '/projecchat'){
        this.initHide(index)
        return
      }
      // 当路由为项目聊天时，需要查看有没有隐藏掉、、、
      this.$router.push({ path: path })
    },
    initHide(index){
        let obj = {
          data: {
            id: this.projectId
          }
        }
        this.$post("/info/project/getProjectById", obj).then((res => {
          if (this.requestCode.SUCCESS !== res.code) {
            this.$store.commit("projectHide", false);
            this.projectHide = this.$store.state.projectHide;
            return;
          } else {
            this.$store.commit("projectHide", res.data.isHide == 1 ? false : true);
            this.projectHide = res.data.isHide == 1 ? false : true
            this.$nextTick(()=>{
              index && (this.projectHide ? this.$router.push({ path: index }) : this.$router.push({ path: '/projectlist' }))
            })
          }
        })).catch(error => {

        });
    }
  },
  mounted() {
    this.bindEvent();
    this.initHide()
  },
  computed: {
    chatShow() {
      return this.$store.state.projectMsg.pro_id
    },
    proExamIsShow() {
      return this.$store.state.projectMsg.pro_id
    },
    curMenu() {
      return this.$store.state.curMenu
    },
    isShowIcon() {
      return this.$store.state.asideMessageIcon && this.$route.path != '/messagecenter'
    }
  },
  watch: {
    curMenu(data) {
      this.$nextTick(() => {
        this.$store.commit('curPath', data);

        if (data === '/maindeskindex') {
          console.log('=====', data);
          this.$refs.menuRef.activeIndex= '1';
          // $('#aside .el-menu-item.is-active').removeClass('is-active')
        }
      })
    },
    // 全局存储侧边栏状态
    isCollapse(val) {
      this.$store.commit('setAsidCollapse',val)
    },
    // $route (to, from) {
    //   let menu = to.path
    //   if (menu.indexOf('/project_tasks') > -1) { // 项目任务
    //     menu = '/projecttasks'
    //   } else if (menu.indexOf('/customdetails')>-1) { // 客户详情
    //     let type = this.$store.state.customObj.id
    //     switch (type) {
    //       case 1:
    //         menu = '/medium';
    //             break;
    //       case 2:
    //         menu = '/natural';
    //             break;
    //       case 3:
    //         menu = '/financing';
    //         break;
    //     }
    //   }
    //   this.$nextTick(()=>{
    //     this.curMenu = menu
    //     this.$store.commit('curPath', menu)
    //     if(menu==='/maindeskindex') {
    //       $('#aside .el-menu-item.is-active').removeClass('is-active')
    //     }
    //   })

    // },
    chatShow: {
      handler(newVal, oldVal) {
        this.projectId = newVal
        let obj = {
          token: this.token,
          userId: this.userId,
          data: {
            projectId: this.projectId
          }
        }
        this.$post("/info/projectChat/queryProjectChatNum", obj).then((res => {
          if (this.requestCode.SUCCESS !== res.code) {
            if (this.requestCode.RESULT_EMPTY == res.code) {
              return;
            } else {
              this.$message.error(res.msg);
              return;
            }
          }
          let showChat = false
          showChat = (res.data && res.data.findIndex(v => v.projectId == newVal) > -1)
          this.$store.commit("proChatIsShow", showChat);
        })).catch(error => {

        });
      },
      immediate: true,
      deep: true
    },
    '$store.state.proChatIsShow'() {
      this.chatIsShow = this.$store.state.proChatIsShow;
    },
    proExamIsShow: {
      handler(newVal, oldVal) {
        let obj = {
          data: {
            id: this.projectId
          }
        }
        this.$post("/info/project/getProjectById", obj).then((res => {
          if (this.requestCode.SUCCESS !== res.code) {
            return;
          } else {
            let projectHide = res.data.isHide == 1 ? false : true;
            this.$store.commit("projectHide", projectHide);
          }
        })).catch(error => {

        });
      },
      immediate: true,
      deep: true
    },
    '$store.state.projectHide'() {
      this.projectHide = this.$store.state.projectHide;
    }
  }
};
</script>
<style lang="scss">
.el-col-12 {
  width: 100%;
}
.asides .el-submenu__title {
  text-align: left;
}

.asides .el-menu-item {
  text-align: left;
}
.asides {
  .left-menu-btn .el-radio-button__inner {
    width: 16px;
    height: 48px;
    line-height: 48px;
    padding: 0;
    background: #f5f6f9;
    border: none !important;
    border-radius: 4px 0 0 4px !important;
  }
}
</style>
<style scoped lang="scss">
.badge {
  display: inline-block;
  position: relative;
  right:10px;
  top:-10px;
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background-color: #d73224;
}
.message_box {
  display: inline-block;
  .message_icon {
    display: inline-block;
    padding-left: 5px;
    padding-bottom: 4px;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu--collapse {
  width: 64px;
}
.left-menu-btn {
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -66px;
  z-index: 1000;
}
</style>
