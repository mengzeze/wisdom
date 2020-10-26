
/**
 * 智能核查按钮是否展示
 * @param {Object} router 当前路由信息
 * @param {Object} Vue 调用的vue组件
 * @return {Boolean} isShow 显示隐藏
 */
const isShowCheck = (router,Vue) => {
  const item = router.query.item && JSON.parse(router.query.item)
  console.log(item,'___item')
  let isShow = false
  const config = [
    {
      path: '/manuscriptmanage',
      authorCode: Vue.$utils.checkSystemPermission('paper_check_view')
    },
    {
      path: '/fullsearch',
      authorCode: Vue.$utils.checkSystemPermission('paper_check_view')
    },
    {
      path: '/projectDoc',
      authorCode: Vue.$utils.checkSystemPermission('project_check_view')
    },
    {
      path: '/projectDocSearch',
      authorCode: Vue.$utils.checkSystemPermission('project_check_view')
    },
    {
      path: '/proDocSelectList',
      authorCode: Vue.$utils.checkSystemPermission('project_check_view')
    },
    {
      path: '/Filepage',
      authorCode: item && [2,10].includes(item.categoryId) && Vue.$utils.checkSystemPermission(item.docSource == 2?'paper_check_view':'project_check_view') // 通过审批类型id限制展示或隐藏
    },
    {
      path: '/Searchpage',
      authorCode: item && [2,10].includes(item.categoryId) && Vue.$utils.checkSystemPermission(item.docSource == 2?'paper_check_view':'project_check_view')
    }
  ]
  for(let i = 0,len=config.length; i < len; i ++) {
    if(config[i].path == router.path && config[i].authorCode) {
      isShow = true
      return isShow
    }
  }
  return isShow
}

export default {
  isShowCheck
}