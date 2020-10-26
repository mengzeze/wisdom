<template>
<div class="statistparents">
  <div class="maindeskindex" v-loading.lock.fullscreen="tableLoading && echartsLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 1)">
    <div class="maindeskindex_contenti_headers">
       <el-breadcrumb separator="/" style="margin-top:20px;">
          <el-breadcrumb-item :to="{path:'/maindeskindex'}">主工作台</el-breadcrumb-item>
          <el-breadcrumb-item>项目统计</el-breadcrumb-item>
      </el-breadcrumb>
      <h3 class="headers_clearFix">
        <span class="headers_clearFix_title">项目统计</span>
      </h3>
    </div>
    <div class="container">
        <!-- <el-card class="box-card"> -->
        <div class="box-card" style="height:310px;padding:10px;padding-top:15px;">
            <!-- <el-scrollbar style="height:100%"> -->
            
                <div class="container_box" style="position: relative">
                    <!-- <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8"> -->
                        <div class="choose-input">
                        <el-input v-model="financingName" placeholder="请选择业务类型" class="fin_inp" disabled style="width:300px;"></el-input>
                        <div><el-button  @click="optType(1)" type="primary" style="margin-left:-4px;">选择</el-button></div>
                        </div>
                    <!-- </el-col> -->
                    <!-- <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16"> -->
                        <p style="text-align:center;position: absolute;left: 50%;top: 50%;;color:#909399;padding-bottom:20px;" v-if="nodata">暂无数据</p>
                        <el-row>
                            <!-- <el-col :xs="24" :sm="24" :md="24" :lg="" :xl="8"> -->
                                <div id="myChart" :style="{ height: '200px'}" ref="chart"></div>
                            <!-- </el-col>  -->
                        </el-row>
                    <!-- </el-col> -->
                </div>
            
         <!-- </el-card> -->
            <!-- </el-scrollbar> -->
         </div>
        <el-card class="box-card no-padding">
            <div class="container_box query-box" v-on:keyup.enter="onSearch">
                <el-form :inline="true" ref="formInline" :model="formInline" class="demo-form-inline">
                    <el-form-item label="项目编码：">
                        <el-input v-model="formInline.code" placeholder="请输入项目编码"></el-input>
                    </el-form-item>
                    <el-form-item label="项目名称：">
                         <el-input v-model="formInline.name" placeholder="请输入项目名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSearch" icon="el-icon-search">查询</el-button>
                        <el-button @click="onSubmit" icon="el-icon-refresh">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
          <div>
            <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#FAFAFA',color:'#000'}">
              <el-table-column fixed prop="code" label="项目编码" width="" align="center" min-width="100">
                <template slot-scope="scope">
                  <p :title="scope.row.code" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.code}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="项目名称" width="" align="center" min-width="100">
                <template slot-scope="scope">
                  <p :title="scope.row.name" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.name}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="financingName" label="业务类型" width="" align="center" min-width="100">
                <template slot-scope="scope">
                  <p :title="scope.row.financingName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.financingName}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="currentImplementStageName" label="项目阶段" min-width="100" align="center">
                <template slot-scope="scope">
                  <p :title="scope.row.currentImplementStageName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.currentImplementStageName}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="projectStatus" label="项目状态" align="center" min-width="100">
                <template slot-scope="scope">
                  <p :title="scope.row.projectStatus" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.projectStatus}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="deptName" label="所属部门" width="" align="center" min-width="100">
                <template slot-scope="scope">
                  <p :title="scope.row.deptName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.deptName}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="picNames" label="项目负责人" width="" align="center" min-width="100">
                <template slot-scope="scope">
                  <p :title="scope.row.picNames" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.picNames}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="createTime" label="创建时间" width="" align="center" min-width="100">
                <template slot-scope="scope">
                  <p :title="scope.row.createTime" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.createTime}}</p>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="" align="center" min-width="100">
                <template slot-scope="scope">
                  <!-- <el-tooltip class="item" effect="dark" content="查看" placement="top"> -->
                  <el-button class="pv-0" type="text" @click="handleClick(scope.$index,scope.row)" title="查看"><i class="icon-operate-btn iconfont wenzhang"></i></el-button>
                  <!-- </el-tooltip> -->
                </template>
              </el-table-column>
            </el-table>
          </div>
            <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="dataTotal" :pageSize="pageSize" :page-sizes="pageSizes" :current-page="currentPage" @current-change="onPageChange" @size-change="handleSizeChange">
            </el-pagination>
         </el-card>
    </div>
         <!--融资类型弹框-->
    <project-type v-if="typeFlag" :typeObj='typeObj' :state="state"  v-on:typeProject='typeProject' :optState="optState"></project-type>
  </div>
</div>
</template>

<script>
const moment = require("moment");
import projectType from "@/components/dialogcommon/projecttype";
export default {
  data() {
    
    return {
         //融资类型
        typeFlag:false,
        typeObj:[],
        optState:'',
        state:1,
         financingName:'',
         tupeNum:1,
         financingId:'',
        tableData: [],
        formInline: {
            code: '',
            name: ''
        },
        pageSize:10,
        pageSizes: [10,20,50,100],    //每页显示数量
        currentPage: 1,  //当前页
        dataTotal: 0,    //总量
        token: "",
      userId: "",
      success_code: "",
      mychartdata:true,
      nodata:false,
      tableLoading: true,
      echartsLoading: true
    };
  },
   components: {
        projectType
    },


    mounted() {
        this.drawLine();
        this.liststatist();
    },
    created(){
        this.token = this.$store.state.loginObject.userToken;
        this.userId = this.$store.state.loginObject.userId;
        this.success_code = this.code.codeNum.SUCCESS;
        //this.drawLine();
       // window.setInterval(this.drawLine(),1000);

       this.chushihua();
    },
    methods:{
        optType(val){
          this.tupeNum = val;
           var typeObj = { "token": this.token, "userId": this.userId, "data": {} } ;
          var that = this;
          this.$post("/info/project/getAllFinanceType",typeObj).then((response => {
              var data =  response.data;
              console.log(data)
              if(response.code == that.code.codeNum.SUCCESS){
                  that.typeFlag = true;
                  that.state = 1;
                  that.typeObj = data;
                  that.optState = {value:val};
              }else{
                //   this.$message(response.msg);
              }
          })).catch(error => {

          });
        },
        //融资类型返回值
        typeProject(data){              
            if(data.length > 0){
                if(this.tupeNum == 1){
                    this.financingId = data[0].id;
                    this.financingName = data[0].label;
                    this.drawLine();
                    this.liststatist();
                }
            }else{
                if(this.tupeNum == 1){
                    this.financingId = "";
                    this.financingName = "";
                    this.selectStageList = [];
                }
            }
        },

        // 页面初始化的时候掉接口
        chushihua(){
            var data = {}
            var _this = this;
                this.$post('/info/project/getLastProjectCountInfo',data).then((response)=> {
                    if(response.code == _this.success_code){
                        //console.log(response)
                        if(response.data.hasRecord == true){
                            _this.financingId = response.data.financingId;
                           // console.log(_this.financingId)
                            _this.financingName = response.data.label
                                var datalist = {
                                        data:{
                                            financingId:_this.financingId,
                                            name:'',
                                            code:''
                                        },
                                    pageNo:_this.currentPage,
                                    pageSize:_this.pageSize,
                                    token: _this.token,
                                    userId: _this.userId
                                }
                               // var that = this;
                                _this.$post('/info/project/getProjectCountList',datalist).then((response)=> {
                                    if(response.code == _this.success_code){
                                        //console.log(response.data)
                                        _this.dataTotal = response.data.total;
                                        _this.tableData = response.data.list;
                                    }else{
                                        // _this.$message(response.msg);
                                    }
                                    this.tableLoading = false;
                                }).catch(function(error) {
                                    console.log(error);
                                    _this.tableLoading = false;
                                });
                            
                            _this.mychartdata = true;
                            _this.nodata = false;
                            var myCharts = _this.$refs.chart;
                               if(myCharts){
                           // console.log(myCharts)
                            var dataseries = [];
                            var datalegend = [];
                    // 基于准备好的dom，初始化echarts实例

                    // let myChart = this.$echarts.init(document.getElementById('myChart'))
                    
                    let myChart = _this.$echarts.init(myCharts)
                    // window.addEventListener("resize", () => { myChart.resize();});
                    // myChart.setOption(option);
                    //绘制图表

                        //_this.dataTotal = response.data.projectListInfo.total;
                        //_this.tableData = response.data.projectListInfo.list;
                       // console.log(response.data)
                        for (var value in response.data.lastProjectCountInfo.countInfo) {
                           // console.log(response.data.lastProjectCountInfo.countInfo[value])
                            dataseries.push(response.data.lastProjectCountInfo.countInfo[value])
                        }
                            //aaaaa.push(response.data.countInfo[value])
                            //console.log(aaaaa)
                            dataseries.map((item,index)=>{
                                datalegend.push(item.name)
                            })
                            myChart.setOption({
                                tooltip: {
                                    trigger: 'item',
                                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                                },
                                legend: {
                                    orient: 'vertical',
                                    x: "right",
                                   //x: 'center',
                                    //y: 'center',
                                    //bottom:-10,
                                    top:10,
                                //left:900,
                                    // itemGap:30,
                                    // itemWidth:5,
                                    textStyle:{
                                        fontSize: 12
                                    },
                                    align:'left',
                                    data: datalegend,
                                    // formatter: function (name) {
                                    //     if (!name) return '';
                                    //             if (name.length > 5) {
                                    //                 name =  name.slice(0,5) + '...';
                                    //             }
                                    //     },
                                    //     tooltip: {
                                    //         show: true
                                    // }
                                    // formatter: function (name) {
                                    //     return echarts.format.truncateText(name, 40, '14px Microsoft Yahei', '…');
                                    // },
                                    tooltip: {
                                        show: true
                                    },
                                    formatter: function (name) {
                                        return (name.length > 8 ? (name.slice(0,8)+"...") : name ); 
                                    }

                                },
                                color:[
                                    '#3BA0FF',
                                    '#36CBCB',
                                    '#4DCB73',
                                    '#FAD337',
                                    '#F2637B',
                                    '#975FE4',
                                    '#e36f7e',
                                    '#d088ce',
                                    '#f5d464',
                                    '#72c9ca'
                                ],
                                series: [
                                    {
                                    name:'访问来源',
                                    // showVal:true,
                                    type:'pie',
                                    radius: ['60%', '70%'],
                                    center:['40%','60%'],
                                    avoidLabelOverlap: false,
                                    label: {
                                        normal: {
                                        show: false,
                                        position: 'center'
                                        },
                                        emphasis: {
                                        show: true,
                                        textStyle: {
                                        fontSize: '16',
                                        fontWeight: 'bold'
                                        }
                                        }
                                    },
                                    labelLine: {
                                        normal: {
                                        show: false
                                        }
                                    },
                                        // data:[
                                        //     {value:335, name:'直接访问'},
                                        //     {value:310, name:'邮件营销'},
                                        //     {value:234, name:'联盟广告'},
                                        //     {value:135, name:'视频广告'},
                                        //     {value:1548, name:'搜索引擎'}
                                        // ]
                                    data:dataseries,
                                    }
                                ]
                            })
                }else{
                    //console.log(myCharts)
                }

            }
            _this.echartsLoading = false;
        }else{
            // _this.$message(response.msg);
            _this.echartsLoading = false;
        }
    }).catch(function(error) {
        // console.log(error);
        _this.echartsLoading = false;
    });

    },
        liststatist(){
            if(this.financingId == undefined || this.financingId == "" || this.financingId == null){
                this.nodata = true;
            }else{
                //console.log(this.financingId)
                var data = {
                    data:{
                        financingId:this.financingId,
                        name:this.formInline.name,
                        code:this.formInline.code
                    },
                    pageNo:this.currentPage,
                    pageSize:this.pageSize,
                    token: this.token,
                    userId: this.userId
                }
                var _this = this;
                this.$post('/info/project/getProjectCountList',data).then((response)=> {
                    if(response.code == _this.success_code){
                        //console.log(response.data)
                        _this.dataTotal = response.data.total;
                        _this.tableData = response.data.list;
                    }else{
                        // _this.$message(response.msg);
                    }
                }).catch(function(error) {
                    console.log(error);
                });
            }
        },
        drawLine(){
            //console.log(this.financingId)
            if (this.financingId == undefined || this.financingId == "" || this.financingId == null){
                //this.mychartdata = false;
                this.nodata = true;
                //return false;
            }else{
                //console.log(this.financingId)
                this.mychartdata = true;
                this.nodata = false;
                var myCharts = this.$refs.chart;
                if(myCharts){
                    //console.log(myCharts)
                    var dataseries = [];
                    var datalegend = [];
                    // 基于准备好的dom，初始化echarts实例

                    // let myChart = this.$echarts.init(document.getElementById('myChart'))
                    
                    let myChart = this.$echarts.init(myCharts)
                    // window.addEventListener("resize", () => { myChart.resize();});
                    // myChart.setOption(option);
                    //绘制图表
                    var data = {
                        data:{
                            financingId:this.financingId
                        },
                    }
                    var _this = this;
                    this.$post('/info/project/getProjectCountInfo',data).then((response)=> {
                    if(response.code == _this.success_code){
                        //_this.dataTotal = response.data.projectListInfo.total;
                        //_this.tableData = response.data.projectListInfo.list;
                        //console.log(response.data)
                        for (var value in response.data.countInfo) {
                            //console.log(response.data.countInfo[value])
                            dataseries.push(response.data.countInfo[value])
                        }
                            //aaaaa.push(response.data.countInfo[value])
                            //console.log(aaaaa)
                            dataseries.map((item,index)=>{
                                datalegend.push(item.name)
                            })
                            myChart.setOption({
                                tooltip: {
                                    trigger: 'item',
                                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                                },
                                legend: {
                                    orient: 'vertical',
                                    x: "right",
                                   //x: 'center',
                                    //y: 'center',
                                    //bottom:-10,
                                    top:10,
                                //left:900,
                                    // itemGap:30,
                                    // itemWidth:5,
                                    textStyle:{
                                        fontSize: 12
                                    },
                                    align:'left',
                                    data: datalegend,
                                    // formatter: function (name) {
                                    //     if (!name) return '';
                                    //             if (name.length > 5) {
                                    //                 name =  name.slice(0,5) + '...';
                                    //             }
                                    //     },
                                    //     tooltip: {
                                    //         show: true
                                    // }
                                    // formatter: function (name) {
                                    //     return echarts.format.truncateText(name, 40, '14px Microsoft Yahei', '…');
                                    // },
                                    tooltip: {
                                        show: true
                                    },
                                    formatter: function (name) {
                                        return (name.length > 8 ? (name.slice(0,8)+"...") : name ); 
                                    }

                                },
                                color:[
                                    '#3BA0FF',
                                    '#36CBCB',
                                    '#4DCB73',
                                    '#FAD337',
                                    '#F2637B',
                                    '#975FE4',
                                    '#e36f7e',
                                    '#d088ce',
                                    '#f5d464',
                                    '#72c9ca'
                                ],
                                series: [
                                    {
                                    name:'访问来源',
                                    // showVal:true,
                                    type:'pie',
                                    radius: ['60%', '70%'],
                                    center:['40%','60%'],
                                    avoidLabelOverlap: false,
                                    label: {
                                        normal: {
                                        show: false,
                                        position: 'center'
                                        },
                                        emphasis: {
                                        show: true,
                                        textStyle: {
                                        fontSize: '16',
                                        fontWeight: 'bold'
                                        }
                                        }
                                    },
                                    labelLine: {
                                        normal: {
                                        show: false
                                        }
                                    },
                                        // data:[
                                        //     {value:335, name:'直接访问'},
                                        //     {value:310, name:'邮件营销'},
                                        //     {value:234, name:'联盟广告'},
                                        //     {value:135, name:'视频广告'},
                                        //     {value:1548, name:'搜索引擎'}
                                        // ]
                                    data:dataseries,
                                    }
                                ]
                            })
                        }else{
                            // _this.$message(response.msg);
                        }
                        
                    }).catch(function(error) {
                        console.log(error);
                    });
                }else{
                    //console.log(myCharts)
                }
            }
        },
        onSubmit() {
            this.formInline = {
                name: '',
                code:''
            };
        },
        onSearch(){
            this.currentPage = 1;
            this.liststatist()
        },
             //分页
        onPageChange(currentPage) {
            this.currentPage = currentPage;
            this.liststatist()
            //console.log(this.currentPage)  //点击第几页
        },
        // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange(val) {
            this.pageSize =val;
            //console.log(val)
            this.liststatist()
        },
        handleClick(index, row) {
            var editObj = {
                'token': this.token,
                'userId': this.userId,
                "projectId": row.id,
                "data":{
                    "projectId":row.id
                }
            }
            var that=this;
            var num = 0 ;
            this.$post('/info/project/getProjectPerm', editObj).then((response)=> {
                if(response.code == that.code.codeNum.SUCCESS) {
                  let accessList = response.data
                  if(!accessList || !accessList.length){ // 没有权限、权限为空
                    this.$message.error('无对应权限,请联系对应项目组负责人处理')
                    return;
                  }
                  let hasAccess = false
                  let path = ''
                  if(this.$utils.m('project_task')) { // 有任务模块
                    if(accessList.indexOf('project_task')>-1) { // 有项目任务权限
                      hasAccess = true
                      path = '/project_tasks/tasks'
                    }
                  } else if(accessList.indexOf('project_information')>-1){ // 有项目信息权限
                    console.log('projectmessage')
                    hasAccess = true
                    path = '/projectmessage'
                  }
                  if(!hasAccess){
                    this.$message.error("没有权限")
                    return
                  }

                  this.$store.commit("projectId",row.id);
                  this.$store.commit("projectMsg",row);
                  this.$store.commit("projectMsgname",row.name);
                  this.$utils.saveProjectId(row.id);
                  this.$router.push({path: path})
                  this.$utils.queryProChatNum(row.id);
                  this.$utils.queryProExamNum(row.id);
                }else{
                    // that.$message.error(response.msg);
                }
            }).catch(function(error) {
                console.log(error);
            });
        },
        

    }
};
</script>

<style lang="scss" scoped>
.statistparents .maindeskindex .el-pagination{
    text-align: right;
    margin-top: 20px;
    margin-right: 40px;
}
.statistparents .maindeskindex .maindeskindex_contenti_headers {
  padding: 0 20px;
  padding-left: 10px;
  margin: auto;
  height: 90px;
  overflow: hidden;
  background-color: #fff;
  text-align: left;

  .headers_break {
    height: 20px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-top: 0.5%;
  }

   .headers_clearFix {
    height: 40px;
    font-size: 20px;
    font-family: MicrosoftYaHei;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    margin-top: 8px;
    margin-bottom: 10px;

    .headers_clearFix_title {
      font-size: 20px;
      line-height: 40px;
      color: #333;
    }
  }
}

.statistparents .maindeskindex .container {
  margin-top: 14px;
//   padding: 20px; 
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;

  .messagebox{
      width:60%!important;
  }
    .rightWidth{
        width:39%!important;
    }
  .box-card {
    width: 100%;
    text-align: left;
    overflow: auto;
    margin-bottom:20px;
    background: #ffffff;

    .tb_rows {
      height: 35px;
      line-height: 35px;
    }
    .tb_rows:nth-child(odd) {
      background-color: #f2f2f2;
    }
    .text-overflow{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
<style lang="scss">
.statistparents .maindeskindex .crm_financing_edit{
        width:28px;
        height:28px;
        background: url("../../../assets/prolist/edit01.png") no-repeat 100% 100%/ 100% 100%;
}
.statistparents .maindeskindex .crm_financing_edit:hover{
    background: url("../../../assets/prolist/edit1.png") no-repeat 100% 100%/ 100% 100%;
} 
.statistparents .maindeskindex .el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover{
    -webkit-box-shadow:0 0px 0px 0 rgba(0,0,0,0);
    box-shadow:0 0px 0px 0 rgba(0,0,0,0)
}
// 移入表格行样式
.statistparents{
  .el-table tr.hover-row>td{
    background: #f5f7fa;
  }
}
</style>


