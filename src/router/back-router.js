
//流程引擎
const newprocess = r => require.ensure([], () => r(require('../pages/behind/processengine/newprocess.vue'))) // 新建流程引擎
const processengine = r => require.ensure([], () => r(require('../pages/behind/processengine/processengine.vue'))) // 流程引擎

//wangyru 的后台系统配置
const projectbusinconfig = r => require.ensure([], () => r(require('../pages/behind/systemconfig/projectbusinconfig/projectbusinconfig.vue')))
const tasksconfig = r => require.ensure([], () => r(require('../pages/behind/systemconfig/tasksconfig/tasksconfig.vue')))
const tasksmodule = r => require.ensure([], () => r(require('../pages/behind/systemconfig/tasksconfig/tasktemplate.vue')))
const classification = r => require.ensure([], () => r(require('../pages/behind/systemconfig/business-role/BusinessRole.vue')))
const timeConfiguration = r => require.ensure([], () => r(require('../pages/behind/systemconfig/time-variable/timeConfiguration.vue')))

//songwh  后台底稿管理的目录管理
const backstagedirectory = r => require.ensure([], () => r(require('../pages/behind/scriptmanagement/backstagedirectory/backstagedirectory.vue')))
//songwh  后台底稿管理的目录列表
const backstagedirectorylist = r => require.ensure([], () => r(require('../pages/behind/scriptmanagement/backstagedirectory/directorylist.vue')))
//songwh  后台系统配置主工作台配置
const maindeskconfig = r => require.ensure([], () => r(require('../pages/behind/systemconfig/maindeskconfig/maindeskconfig.vue')))
//songwh  后台系统日志
const systemlog = r => require.ensure([], () => r(require('../pages/behind/systemlog/systemlog.vue')))

const framework = r => require.ensure([], () => r(require('@/pages/behind/framework/framework')))
const role = r => require.ensure([], () => r(require('@/pages/behind/role/role')))
const management = r => require.ensure([], () => r(require('@/pages/behind/management/management')))

//借阅时间配置
const BorrowTime = r => require.ensure([], () => r(require('../pages/behind/systemconfig/borrow-config/BorrowTime')))
const projectHideSet = r => require.ensure([], () => r(require('../pages/behind/systemconfig/hide-project/projectHideSet')))
const mustFillItem = r => require.ensure([], () => r(require('../pages/behind/systemconfig/fields-config/mustFillItem'))) //必填字段管理
// zhonglei
const noticeTypeConfig = r => require.ensure([], () => r(require('../pages/behind/systemconfig/noticetypeconfig/noticetypeconfig'))) // 通知方式配置

const approvalTypeconfig = r => require.ensure([], () => r(require('../pages/behind/systemconfig/approval-type/approvalTypeconfig.vue'))) //审批类型配置
const projectroleconfig = r => require.ensure([], () => r(require('../pages/behind/systemconfig/projectroleconfig/projectroleconfig.vue')))


const backRouters = [
  { //人员管理
    path: '/management',
    meta: {
      requireAuth: true,
      keepAlive: false,
      isMenu: true,
      authData: [{
        isSystem: true,
        code: 'user_operation'
      }, ],
      stage:'back'
    },
    component: management
  },
  { //角色权限
    path: '/role',
    meta: {
      requireAuth: true,
      keepAlive: false,
      isMenu: true,
      authData: [{
        isSystem: true,
        code: 'bask_role_permission'
      }, ],
      stage:'back'
    },
    component: role
  },
  { //组织构架
    path: '/framework',
    meta: {
      requireAuth: true,
      keepAlive: false,
      isMenu: true,
      authData: [{
        isSystem: true,
        code: 'organizational_structure'
      }, ],
      stage:'back'
    },
    component: framework
  },
  {
    // 后台底稿管理的目录管理
    path: '/backstagedirectory',
    meta: {
      requireAuth: true,
      keepAlive: false,
      authData: [{
        isSystem: true,
        code: 'bask_paper_opation'
      }],
      stage:'back'
    },
    component: backstagedirectory,
  },
  {
    // 后台底稿管理的目录列表
    path: '/backstagedirectorylist',
    meta: {
      requireAuth: true,
      isMenu: true,
      keepAlive: false,
      authData: [{
        isSystem: true,
        code: 'bask_paper_opation'
      }],
      stage:'back'
    },
    component: backstagedirectorylist,
  },
  {
    // 流程引擎
    path: '/processengine',
    meta: {
      requireAuth: true,
      keepAlive: false,
      isMenu: true,
      authData: [{
        isSystem: true,
        code: 'process_engine'
      }],
      stage:'back'
    },
    component: processengine,
  }, { //新建流程
    path: '/newprocess/:id',
    meta: {
      requireAuth: true,
      keepAlive: false,
      authData: [{
        isSystem: true,
        code: 'process_engine'
      }],
      stage:'back'
    },
    component: newprocess,
  },
  {
    // 系统配置 - 业务类型配置
    path: '/projectbusinconfig',
    meta: {
      requireAuth: true,
      keepAlive: false,
      isMenu: true,
      authData: [{
          isSystem: true,
          code: 'bask_sys_operation'
        },
        {
          isSystem: true,
          code: 'bask_project_config'
        },
      ],
      stage:'back'
    },
    component: projectbusinconfig,
  },
  {
    //系统配置 -- 任务配置
    path: '/tasksconfig',
    meta: {
      requireAuth: true,
      keepAlive: false,
      isMenu: true,
      authData: [{
          isSystem: true,
          code: 'bask_sys_operation'
        },
        {
          isSystem: true,
          code: 'bask_task_config'
        },
      ],
      stage:'back'
    },
    component: tasksconfig,
  },
  {
    //系统的模板设置
    path: '/tasksmodule',
    meta: {
      requireAuth: true,
      keepAlive: false,
      authData: [{
          isSystem: true,
          code: 'bask_sys_operation'
        },
        {
          isSystem: true,
          code: 'bask_task_config'
        },
      ],
      stage:'back'
    },
    component: tasksmodule,
  }, 
  {
    //主工作台配置
    path: '/maindeskconfig',
    meta: {
      requireAuth: true,
      keepAlive: false,
      isMenu: true,
      authData: [{
          isSystem: true,
          code: 'bask_sys_operation'
        },
        {
          isSystem: true,
          code: 'bask_workbench_operation'
        },
      ],
      stage:'back'
    },
    component: maindeskconfig,
  },
  {
    //业务规则配置
    path: '/classification',
    meta: {
      requireAuth: true,
      keepAlive: false,
      isMenu: true,
      authData: [{
        isSystem: true,
        code: 'bask_sys_operation'
      },
      {
        isSystem: true,
        code: 'bask_type_config'
      }
    ],
      stage:'back'
    },
    component: classification,
  },
  {
    //借阅时间配置
    path: '/BorrowTime',
    meta: {
      requireAuth: true,
      keepAlive: false,
      isMenu: true,
      authData: [{
        isSystem: true,
        code: 'bask_sys_operation'
      }],
      stage:'back'
    },
    component: BorrowTime,
  },
  {
    // 时间变量配置
    path: '/timeConfiguration',
    meta: {
      requireAuth: true,
      keepAlive: false,
      isMenu: true,
      authData: [{
        isSystem: true,
        code: 'bask_sys_operation'
      },
      {
        isSystem: true,
        code: 'bask_time_configuration'
      }
    ],
      stage:'back'
    },
    component: timeConfiguration,
  },
  {
    //系统配置的一键隐藏项目
    path: '/projectHideSet',
    meta: {
      requireAuth: true,
      keepAlive: false,
      isMenu: true,
      authData: [{
        isSystem: true,
        code: 'bask_sys_operation'
      }],
      stage:'back'
    },
    component: projectHideSet,
  },
  {
    // 通知方式配置
    path: '/noticetypeconfig',
    meta: {
      requireAuth: true,
      keepAlive: false,
      isMenu: true,
      authData: [{
        isSystem: true,
        code: 'bask_sys_operation'
      }, ],
      stage:'back'
    },
    component: noticeTypeConfig,
  },
  {
    //表单字段管理
    path: '/mustFillItem',
    meta: {
      requireAuth: true,
      keepAlive: false,
      isMenu: true,
      authData: [{
        isSystem: true,
        code: 'bask_sys_operation'
      }],
      stage:'back'
    },
    component: mustFillItem,
  },
  {
    // 系统配置 - 审批配置类型
    path: '/approvalTypeconfig',
    meta: {
      requireAuth: true,
      keepAlive: false,
      isMenu: true,
      authData: [{
          isSystem: true,
          code: 'bask_sys_operation'
        },
        {
          isSystem: true,
          code: 'process_type_configuration'
        },
      ],
      stage:'back'
    },
    component: approvalTypeconfig,
  },
  {
    //系统配置 - 项目角色配置
    path: '/projectroleconfig',
    meta: {
      requireAuth: true,
      keepAlive: false,
      isMenu: true,
      authData: [{
          isSystem: true,
          code: 'bask_sys_operation'
        },
        {
          isSystem: true,
          code: 'project_role_configuration'
        },
      ],
      stage:'back'
    },
    component: projectroleconfig,
  }, 
  {
    // 系统日志
    path: '/systemlog',
    meta: {
      requireAuth: true,
      keepAlive: false,
      isMenu: true,
      authData: [{
        isSystem: true,
        code: 'bask_sys_log'
      }],
      stage:'back'
    },
    component: systemlog,
  }
]

export default backRouters