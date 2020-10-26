import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import '../static/theme/index.css'
import '../static/theme/custom.css'
// import '../static/theme/index-hengtai.css'
// import '../static/theme/custom-hengtai.css'
import infiniteScroll from 'vue-infinite-scroll'

import echarts from 'echarts/lib/echarts' // 引入echarts
import echartsPie from 'echarts/lib/chart/pie'
import echartsTooltip from 'echarts/lib/component/tooltip'
import echartsLegen from 'echarts/lib/component/legend'

// import echarts from 'echarts'

import { post, get,deleteFn, patch, put } from './api/axios'
import store from './store/index'   //引入vuex
import '@/style/reset.css'    //引入重置的css
import '@/style/element.css'    //引入重写element UI的样式
import '@/style/common.css'    //引入公共的css
import common from './pages/common/js/common.js'    //引入公共的js
import code from './pages/common/js/code.js'    //引入公共的js
import report from './pages/common/js/reportData.js'    //引入公共报送的js
import ztree from './pages/common/zTree/jquery.ztree.all.min.js' //引入zTree
import ztreeStyle from './pages/common/zTree/zTreeStyle/zTreeStyle.css' //引入zTree样式
import JSEncrypt from 'jsencrypt/bin/jsencrypt'    //rsa加密
import utils from '@/utils/utils'
import { emoji } from '@/utils/emoji.js'
import select from '@/utils/select'
import crypto from '@/utils/crypto'
import editcomponent from './pages/front/projecttasks/viewswitches/Modularcomponent'
import MyDirective from '@/directive/index' // 全局指令
import MyFilter from '@/filter/index' // 全局指令
import PublicComponent from '@/components/componentInstall'
import config from '@/config'

// import doc_main from './pages/common/js/doc.main'
// import doc_utils from './pages/common/js/doc.utils'
// import main from './pages/common/js/main'

import global from './global'
import FullCalendar from 'vue-full-calendar'
import moment from 'moment'//导入文件

import Port from './library'//个人插件类入口文件

import 'url-search-params-polyfill'
import './assets/drag/layout.css'
import './assets/drag/header.css'
import './assets/drag/nav.css'
import './assets/drag/demos.css'
// import './assets/drag/form.css'


// 图标字体
import './assets/iconfont/iconfont.css'
import './assets/iconfont/iconfont'

Vue.use(editcomponent)
Vue.use(infiniteScroll)
Vue.use(ElementUI)
Vue.use(FullCalendar)
Vue.use(MyDirective)
Vue.use(MyFilter)
Vue.use(PublicComponent)
Vue.use(Port,{post,get,deleteFn,patch,put})
Vue.prototype.$moment = moment;//赋值使用
Vue.prototype.emoji = emoji

Vue.prototype.common = common
Vue.prototype.code = code
Vue.prototype.report = report
Vue.prototype.$echarts = echarts
//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$get=get;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;
Vue.prototype.$delete=deleteFn;
Vue.config.productionTip = false;
Vue.prototype.global = global
Vue.prototype.$utils = utils
Vue.prototype.$select = select
Vue.prototype.$crypto = crypto
Vue.prototype.$globalConfig = config
Vue.prototype.$getCode = function(password,key){
    var encryptor = new JSEncrypt();
    encryptor.setPublicKey(key);
    var pswd = encryptor.encrypt(password);
    return pswd;
}



/* eslint-disable no-new */
window.msg = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

