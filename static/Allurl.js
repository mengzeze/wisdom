
var rd_env = 'develop' // 开发环境
// var rd_env = 'test' // 公网
// var rd_env = 'demo' // demo
// 登录页系统标题
var title = '荣大科技投行管理系统'
// var title = '恒泰长财智慧投行管理系统'
// 系统logo地址（建议图片尺寸：184*44px）
// var logo = './static/logo/logo-htcc.png'
var logo = './static/logo/logo.png'
// 登录表单左侧背景图
var loginbg = './static/logo/loginbg.png'
// var loginbg = './static/logo/loginbg-htcc.png'
// 客户名
var client = '';
// var client = ''//dongfangcaifu,fangzhengzhengquan,haitong
var hasOneClickSyncList = ['dongfangcaifu', 'haitong']//要一键同步功能的客户
var hasJumpLoginList = ['dongfangcaifu', 'fangzhengzhengquan','wanlianzhengquan','xiangcai']//要单点登录功能的客户
var hasToApprovalList = ['fangzhengzhengquan']//要单点登录后跳转到我的审批功能的客户
// 系统顶部标题
var subTitle = '智慧投行管理系统'
var turnUrl = "";
var rdSys = 'touhang' // 区分投行和底稿: touhang 投行，digao 底稿
// test

if(rd_env==='test') {

  // var allUrl = "http://101.200.167.121/"; // 接口地址
  // var mqAllurl = "http://101.200.167.121/activemq"; //消息地址

  // var allUrl = "http://47.95.254.55"; // 接口地址
  // var mqAllurl = "http://47.95.254.55/activemq"; //消息地址

  // var allUrl = "http://101.200.204.190"; // 接口地址
  // var mqAllurl = "http://101.200.204.190/activemq"; //消息地址

  // var allUrl = "http://192.168.7.238"; // 接口地址
  // var mqAllurl = "http://192.168.7.238/activemq"; //消息地址


  var allUrl = "http://39.106.254.225"; // 接口地址
  var mqAllurl = "http://39.106.254.225/activemq"; //消息地址
  var intelUrl = "https://check.rongdasoft.com:19000/#/childdetail" // 待配置智能核查跳转环境
} else if (rd_env==='demo') {
  var allUrl = "http://ibdemo.rongdasoft.com/";
  var mqAllurl = "http://ibdemo.rongdasoft.com/activemq";
  var intelUrl = "https://check.rongdasoft.com:19000/#/childdetail" // 待配置智能核查跳转环境
} else {

  var allUrl = "http://192.168.6.230:212";
  var mqAllurl = "ws://192.168.6.230:61614";
  var intelUrl = "https://check.rongdasoft.com:19000/#/childdetail"
}




