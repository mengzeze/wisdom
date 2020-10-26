import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
import utils from '@/utils/utils'
import {
  Message
} from 'element-ui'
import {
  MessageBox
} from 'element-ui'
import axios from "axios";
import frontRouters from './front-router'
import backRouters from './back-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location,) {
  return originalPush.call(this, location).catch(err => err)
}
//主页面
const main = r => require.ensure([], () => r(require('@/pages/Main.vue'))) 
//登录
const login = r => require.ensure([], () => r(require('../pages/login/login.vue'))) 
// 审批意见页
const approvalComments = r => require.ensure([], () => r(require('@/pages/front/projectlist/projectDoc/approvalComments')))

Vue.use(Router)

const routes = [{
    // 自定义-默认登录页
    path: '/',
    component: login
  },
  {
    // 登录
    path: '/login',
    component: login
  },
  {
    // 登录
    path: '/main',
    component: main,
    redirect: "/maindeskindex",
    children: [...frontRouters, ...backRouters]
  },
  {
    //审批意见页
    path: '/approvalComments',
    meta: {
      requireAuth: true,
      keepAlive: false,
      stage:'back'
    },
    component: approvalComments
  }
]

const router = new Router({
  routes,
})

// 项目管理没有权限时跳转到项目列表页面
let projectArr = [
  '/project_tasks',
  '/projectmember',
  '/projectmessage',
  '/projectrole',
  '/projecmeeting',
  '/projectDoc',
  '/projecvote',
  '/projecJournal',
  '/projecchat',
  '/projecexamine'
]
let toChatArr = [
  '/Searchpage',
  '/Filepage',
  '/manuscriptmanage',
  '/fullsearch',
  '/messagecenter',
  '/projecchat',
  '/projecexamine'
]
let handleMenuData = (to) => {
  let menu = to.path
  if (menu.indexOf('/project_tasks') > -1) { // 项目任务
    menu = '/projecttasks'
  } else if (menu.indexOf('/customdetails') > -1) { // 客户详情
    let type = store.state.customObj.id
    switch (type) {
      case 1:
        menu = '/medium';
        break;
      case 2:
        menu = '/natural';
        break;
      case 3:
        menu = '/financing';
        break;
    }
  } else if (menu.indexOf('/fullsearch')>-1){ // 底稿搜索结果页
    menu = '/manuscriptmanage';
  } else if (menu.indexOf('/projectDocSearch')>-1 || menu.indexOf('/proDocSelectList')>-1){ // 项目文档搜索
    menu = '/projectDoc';
  }

  to.meta.stage && store.commit('setStage', to.meta.stage)
  store.commit('setCurMenu', menu)
}
let handleRoterData = (to, from, next, upload) => {
  // console.log(12345, to, from, )
  if (upload) {
    store.commit('closeUploadDialog', true)
    store.commit('setUploadStatus', false)
    window.closeUploadDialog()
  }
  // 清空选中的数据
  store.commit('setSelectedNum',0)

  let hasLogin = sessionStorage.getItem('login')
  // 特殊处理项目任务
  let toPath = to.path === "/project_tasks/tasks" ? '/project_tasks' : to.path
  if (toPath === '/login') { // 如果前往登录页面
    next()
  } else if (!hasLogin) { // 没有登录
    // next({
    //   path: '/login'
    // })
    // 东亚前海特殊处理
    if(window.client === 'dongyaqianhai' && to.query && to.query.json) {
      JSON.parse(to.query.json).token ? next() : next({ path: '/login'})
    } else {
      next({
        path: '/login'
      })
    }
  } else { // 已经登录
    axios.all([
      utils.getUserPermPromise(),
      utils.getModulePromise(),
      utils.getProjectPermPromise(),
      utils.initRoleData()
    ]).then(axios.spread((res1, res2, res3, res4) => {
      store.commit('setSystemPerm', res1)
      store.commit('setModule', res2)
      store.commit('setProjectPerm', res3)
      store.commit('setRoleModule', {})//先把数据清空
      store.commit('setRoleModule', res4)//角色配置数据
      // 如果是文件审批页进入项目聊天,直接进入
      let chat = toChatArr.indexOf(from.path) !== -1 && to.path === '/projecchat'
      !chat && utils.queryProChatNum();
      utils.queryProExamNum();
      // utils.queryProChatNum();

      let authData = to.meta.authData || ''
      // console.log('权限', authData)
      // if (to.path == '/projecexamine' || from.path == '/projecexamine'){
      //   authData = true
      // }
      if (authData) { // 需要判断权限
        if (to.query.isFromStop) { // 来自项目终止库的，不需要判断权限
          store.commit("projectHide", false);
          next()
          handleMenuData(to)
        } else if (chat) { // 如果是文件审批页进入项目聊天,直接进入
          store.commit("proChatIsShow", true);
          next()
          handleMenuData(to)
        } else if (!res3 && projectArr.indexOf(toPath) !== -1) { // 如果当前项目已隐藏，要进入项目管理页面，时跳转到项目列表
          store.commit("proChatIsShow", false);
          // console.log('不显示')
          store.commit("projectHide", false);
          next({
            path: '/projectlist'
          })
          handleMenuData(to)
        } else {
          let access = 0
          authData.forEach(v => {
            v.isProject && utils.checkProjectPermission(v.code) && access++
            v.isSystem && utils.checkSystemPermission(v.code) && access++
            v.isMaindesk && utils.roleM(v.code) && access++
            v.isModule && utils.m(v.code) && access++
          })
          if (access === authData.length) {
            next()
            handleMenuData(to)
          } else {
            Message.error('没有权限进入该页面')
            return false;
          }
        }
      } else { // 不需要判断权限
        next()
        handleMenuData(to)
      }
    }))
  }
}

let checkRouteExist = (toPath) => {
  let isExist = false
  check(routes)

  function check(routeArr) {
    for (let item of routeArr) {
      // console.log(item.path, toPath)
      if (item.path === toPath || /\/newprocess/.test(toPath)) {
        isExist = true
        break
      } else if (item.children && item.children.length) {
        check(item.children)
      }
    }
  }
  // console.log('isExist', isExist)
  return isExist

}

router.beforeEach(function (to, from, next) {
  if (!checkRouteExist(to.path)) { // 访问的路由不存在
    return false;
  }

  let isUpload = store.state.isUpload

  if (isUpload && from.path !== '/') { // 不是刷新页面后进入
    MessageBox.confirm('有文件正在上传，页面切换或刷新将导致文件上传取消。是否继续？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      handleRoterData(to, from, next, 'upload')
    }).catch(() => {});

  } else {
    handleRoterData(to, from, next)
  }

})

export default router;
