<template>
  <div class="backaside">
    <el-radio-group v-model="isCollapse" class="left-menu-btn">
      <el-radio-button :label="false" v-show="isCollapse">
        <i class="el-icon-d-arrow-right"></i>
      </el-radio-button>
      <el-radio-button :label="true" v-show="!isCollapse">
        <i  class="el-icon-d-arrow-left"></i>
      </el-radio-button>
    </el-radio-group>
    <el-menu
      :default-active="curMenu"
      router
      class="el-menu-vertical-demo"
      :collapse="isCollapse">
        <el-menu-item v-if="$utils.checkSystemPermission('user_operation')"
                      index="/management" class="back_list_rout">
            <i><img src="../../assets/image/aside/backaside1.png" alt="" style="width:18px;height:18px;margin-right:4px;"></i>
            <span slot="title">人员管理</span>
        </el-menu-item>
        <el-menu-item v-if="$utils.checkSystemPermission('bask_role_permission')"
                      index="/role">
            <i><img src="../../assets/image/aside/backaside2.png" alt="" style="width:18px;height:18px;margin-right:4px;"></i>
            <span slot="title">角色权限</span>
        </el-menu-item>
        <el-menu-item v-if="$utils.checkSystemPermission('organizational_structure')"
                      index="/framework">
            <i><img src="../../assets/image/aside/backaside3.png" alt="" style="width:18px;height:18px;margin-right:4px;"></i>
            <span slot="title">组织架构</span>
        </el-menu-item>
        <el-submenu index="2" v-if="$utils.m('paper_manage') && $utils.checkSystemPermission('bask_paper_opation')">
            <template slot="title">
                <!-- 一级菜单 -->
                <i><img src="../../assets/image/aside/backaside4.png" alt="" style="width:18px;height:18px;margin-right:4px;"></i>
                <span>底稿管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/backstagedirectorylist" style="padding-left:46px;">目录管理</el-menu-item>
        </el-submenu>
        <el-submenu index="3" v-if="$utils.checkSystemPermission('process_engine')">
            <template slot="title">
                <!-- 一级菜单 -->
                <i><img src="../../assets/image/aside/backaside5.png" alt="" style="width:18px;height:18px;margin-right:4px;"></i>
                <span>流程引擎管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/processengine" style="padding-left:47px;">流程引擎</el-menu-item>
        </el-submenu>
        <el-submenu index="4" v-if="$utils.checkSystemPermission('bask_sys_operation')">
            <template slot="title">
                <!-- 一级菜单 -->
                <i><img src="../../assets/image/aside/backaside6.png" alt="" style="width:18px;height:18px;margin-right:4px;"></i>
                <span>系统配置</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item v-if="$utils.checkSystemPermission('bask_project_config')"
                          index="/projectbusinconfig"
                          style="padding-left:46px;">业务类型配置</el-menu-item>
            <el-menu-item v-if="$utils.m('project_task') && $utils.checkSystemPermission('bask_task_config')"
                          index="/tasksconfig"
                          style="padding-left:46px;">任务配置</el-menu-item>
            <el-menu-item v-if="$utils.checkSystemPermission('bask_workbench_operation')"
                          index="/maindeskconfig"
                          style="padding-left:46px;">主工作台配置</el-menu-item>
            <el-menu-item v-if="($utils.m('project_meeting') || $utils.m('project_vote'))&& $utils.checkSystemPermission('bask_type_config')"
                          index="/classification"
                          style="padding-left:46px;">业务规则配置</el-menu-item>
            <el-menu-item v-if="$utils.m('paper_manage')" index="/BorrowTime" style="padding-left:46px;">借阅时间配置</el-menu-item>
            <el-menu-item v-if="$utils.checkSystemPermission('bask_time_configuration')" index="/timeConfiguration" style="padding-left:46px;">时间变量配置</el-menu-item>
          <!--v-if="$utils.m('bask_time_configuration')"-->
            <el-menu-item index="/projectHideSet" style="padding-left:46px;" v-if="isSuperUser">一键隐藏项目</el-menu-item>
            <el-menu-item index="/noticetypeconfig" style="padding-left:46px;">通知方式配置</el-menu-item>
            <el-menu-item index="/mustFillItem" style="padding-left:46px;">表单字段管理</el-menu-item>
            <!-- <el-menu-item index="/projectroleconfig" style="padding-left:46px;" v-if="$utils.checkSystemPermission('project_role_configuration')">项目角色配置</el-menu-item> -->
            <el-menu-item index="/approvalTypeconfig" style="padding-left:46px;" v-if="$utils.checkSystemPermission('process_type_configuration')">审批类型配置</el-menu-item>
            <el-menu-item index="/projectroleconfig" style="padding-left:46px;" v-if="$utils.checkSystemPermission('project_role_configuration')">项目角色配置</el-menu-item>
        </el-submenu>
      <el-menu-item v-if="$utils.checkSystemPermission('bask_sys_log')" index="/systemlog">
        <i><img src="../../assets/image/aside/backaside7.png" alt="" style="width:18px;height:18px;margin-right:4px;"></i>
        <span slot="title">系统日志</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isSuperUser: this.$store.state.loginObject.isSuperUser,
      curMenu: this.$store.state.curPath || '/management',
      isCollapse: false
    };
  },
  created(){
    
    
  },
  watch: {
    $route (to, from) {
      let menu = to.path
      this.isSuperUser = this.$store.state.loginObject.isSuperUser;
      this.$nextTick(()=>{
        this.curMenu = menu
        this.$store.commit('curPath', menu)
      })

    }
  },
  methods: {
  }
};
</script>
<style lang="scss">
.backaside .el-menu-item{
    text-align: left;
}

.backaside .el-submenu__title{
    text-align: left;
}
.el-col-12 {
  width: 100%;
}
.backaside {
  .left-menu-btn .el-radio-button__inner{
    width: 16px;
    height: 48px;
    line-height: 48px;
    padding: 0;
    background:  #f5f6f9;
    border: none!important;
    border-radius: 4px 0 0 4px!important;
  }
}
</style>
<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu--collapse{
  width: 64px;
}
.left-menu-btn{
  position:absolute;
  right:0;
  top: 50%;
  margin-top: -66px;
  z-index: 1000;
}
</style>
