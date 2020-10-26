<template>
  <div class="myclientparents my-client">
      <div class="myclientele">
      <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{path:'/maindeskindex'}">主工作台</el-breadcrumb-item>
          <el-breadcrumb-item>我的客户</el-breadcrumb-item>
      </el-breadcrumb>
    <el-row class="finance_tit">
    <div class="tit">我的客户</div>
    <!-- <el-menu :default-active="this.$router.path" router class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item  index="/project_tasks/tasks" class="task_click">
            新增客户
                <el-menu-item index="/project_tasks/tasks">新增融资客户</el-menu-item>
                <el-menu-item index="2-3">新增自然人客户</el-menu-item>
            </el-submenu>
        </el-menu-item>
    </el-menu> -->

    <!-- 导出和删除目前先不动 如果要修改 下面676行padding改一下就ok -->
    <div style="float:right">
        <el-button type="primary" style="float:left" @click="handleExport" id="crm_financing_export" v-if="$utils.checkSystemPermission('crm_financing_export')">导出</el-button>
    <el-menu :default-active="this.$router.path" router class="el-menu-demo fr" mode="horizontal">
        <el-submenu index="2">
            <template slot="title">
               <div>
                   <el-button icon="el-icon-plus" type="primary">
                    新增客户
                </el-button>
                </div>
            </template>
            <el-menu-item index="/medium">新增融资客户</el-menu-item>
            <el-menu-item index="/natural">新增自然人客户</el-menu-item>
            <el-menu-item index="/financing">新增中介机构</el-menu-item>
        </el-submenu>
    </el-menu>
    </div>

    <!-- <el-menu :default-active="this.$router.path" router class="el-menu-demo fr" mode="horizontal">
        <el-submenu index="2">
            <template slot="title">
               <div style="position: relative;">
                   <el-button style="position: absolute;top: 6px;right: -14px;" icon="el-icon-plus" type="primary">
                    新增客户
                </el-button>
                </div>
            </template>
            <el-menu-item index="/medium">新增融资客户</el-menu-item>
            <el-menu-item index="/natural">新增自然人客户</el-menu-item>
            <el-menu-item index="/financing">新增中介机构</el-menu-item>
        </el-submenu>
    </el-menu> -->

    <!-- <el-select v-model="addtype" placeholder="请选择新增客户类型" clearable class="fr" style="margin-right:10px;">
        <el-option
        v-for="item in adtypeData"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
    </el-select> -->
      <!-- <el-button size="small" icon="el-icon-circle-plus-outline" type="primary">新增客户</el-button> -->
    </el-row>
    <div v-on:keyup.enter="searchBtn">
    <el-form ref="search_form" :model="search_form" label-width="120px" class="form_box clearfix">
      <el-form-item label="客户名称：">
        <el-input v-model="search_form.name" placeholder="请输入客户名称"></el-input>
      </el-form-item>
      <el-form-item label="客户负责人：">
        <!-- <el-input v-model="search_form.principal" placeholder="请输入客户负责人"></el-input> -->
        <el-input v-model="search_form.principal" class="fl" placeholder="请输入客户负责人" disabled="disabled" :myclect="myclect"></el-input>
        <el-button type="primary" size="small" @click="optUser" class="fl" style="margin-left: 0px;height: 40px;margin-top: 0px;">选择人员</el-button>
      </el-form-item>
      <el-form-item label="客户类型：">
           <el-select v-model="search_form.type" placeholder="请选择客户类型">
                <el-option
                v-for="item in selectStateListType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
      </el-form-item>
      <el-form-item label="客户状态：">
        <el-select v-model="search_form.status" placeholder="请选择客户状态" clearable>
            <el-option v-for="item in selectStateListState" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="行业（1级）：">
        <el-select name="province" id="province" class="classify" v-on:change="indexSelect01" v-model="indexId" placeholder="请选择一级行业">
          <el-option  :value="item.id" v-for="(item,index) in select01" :key="item.id">{{item.name}}</el-option>
        </el-select>
        <!-- <select name="province" id="province" class="classify" v-on:change="indexSelect01" v-model="indexId" placeholder="请选择一级行业">
            <option :value="item.id" v-for="(item,index) in select01">{{item.name}}</option>
        </select> -->
      </el-form-item>
      <el-form-item label="行业（2级）：">
        <el-select name="city" id="city" class="classify mt10" v-model="indexId2" placeholder="请选择二级行业">
          <el-option :value="k.name" v-for="k in select02" :key="k.id">{{k.name}}</el-option>
        </el-select>
         <!--二级菜单-->
        <!-- <select name="city" id="city" class="classify mt10" v-model="indexId2" placeholder="请选择一级行业">
            <option :value="k.id" v-for="k in select02">{{k.name}}</option>
        </select> -->
      </el-form-item>
      <el-button type="primary" @click="searchBtn" icon="el-icon-search">查询</el-button>
      <el-button  @click="resetBtn" icon="el-icon-refresh">重置</el-button>

    </el-form>
    </div>
    <div class="table_box">
      <el-table :data="tableData" fit show-header style="width: 100%;" :header-cell-style="{background:'#FAFAFA',color:'#000'}" class="pro_tablemy" @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="uid" label="客户编码" align="center" min-width="100">
            <template slot-scope="scope">
                <p :title="scope.row.uid" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.uid}}</p>
            </template>
        </el-table-column>
        <el-table-column prop="name" label="客户名称" align="center" min-width="100">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)"
                             type="text"
                             class="ellipsis1"
                             style="padding:0;width:100%"
                             :title="scope.row.name">{{ scope.row.name }}</el-button>
            </template>
        </el-table-column>
        <el-table-column prop="typeName" label="客户类型" align="center" min-width="100">
             <template slot-scope="scope">
                <p :title="scope.row.typeName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.typeName}}</p>
            </template>
        </el-table-column>
        <el-table-column prop="statusName" label="客户状态" align="center" min-width="100">
             <template slot-scope="scope">
                <p :title="scope.row.statusName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.statusName}}</p>
            </template> </el-table-column>
        <el-table-column prop="ipoName" label="上市板块" align="center" min-width="100">
             <template slot-scope="scope">
                <p :title="scope.row.ipoName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.ipoName}}</p>
            </template>
        </el-table-column>
        <el-table-column prop="industryOne" label="行业（1级）" align="center" min-width="100">
             <template slot-scope="scope">
                <p :title="scope.row.industryOne" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.industryOne}}</p>
            </template>
        </el-table-column>
        <el-table-column prop="industryTwo" label="行业（2级）" align="center" min-width="100">
             <template slot-scope="scope">
                <p :title="scope.row.industryTwo" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.industryTwo}}</p>
            </template>
        </el-table-column>
        <!-- <el-table-column prop="deptId" label="所属部门" align="center" min-width="100"> </el-table-column> -->
        <el-table-column prop="principalName" label="客户负责人" align="center" min-width="100">
             <template slot-scope="scope">
                <p :title="scope.row.principalName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.principalName}}</p>
            </template>
        </el-table-column>
        <el-table-column prop="createByName" label="创建人" align="center" min-width="100">
            <template slot-scope="scope">
                <p :title="scope.row.createByName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.createByName}}</p>
            </template></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center" min-width="100">
            <template slot-scope="scope">
                <p :title="scope.row.createTime" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.createTime}}</p>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="100">
          <template slot-scope="scope">
            <!-- <el-button type="text" @click="handleClick(scope.row)"><img src="../../../assets/image/editcust.png" alt="" style="width:28px;height:28px;"></el-button> -->
            <!-- <el-tooltip class="item" effect="dark" content="编辑" placement="top"> -->
                <el-button class="pv-0" type="text"
                @click="handleClick(scope.row)"
                title="详情"><i class="icon-operate-btn iconfont wenzhang"></i></el-button>
             <!-- </el-tooltip> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="dataTotal" :pageSize="pageSize" :page-sizes="pageSizes" :current-page="currentPage" @current-change="onPageChange" @size-change="handleSizeChange">
    </el-pagination>
    <div class="func_btn">
      <!-- <el-button type="primary" @click="handleExport" id="crm_financing_export" v-if="$utils.checkSystemPermission('crm_financing_export')">导出</el-button> -->
      <!-- <el-button @click="handleAllDelete">删除</el-button> -->
    </div>
    </div>
      <!-- 删除弹框 -->
      <div class="shanchutankuang">


    <el-dialog
        title="提示"
        :visible.sync="deletes"
        :close-on-click-modal="false"
        width="22%">
        <div class="clearfix">
            <img class="fl" src="../../../assets/image/shan1.png" alt="" style="width:24px;height:24px;position: relative;top: -3px;margin-right: 10px">
            <span class="fl">确定删除这条信息吗</span>
        </div>
        <!-- <span>确定删除这条信息吗</span> -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="deletes = false">取 消</el-button>
            <el-button type="primary" @click="deletessure">确 定</el-button>
        </span>
    </el-dialog>
    </div>
    <!--选择人员-->
    <frame-work v-if="flag" :peodatas='peodatas'  v-on:statesbox='statesboxs'></frame-work>
    <fintall-deptuser :findFlagShow.sync="findFlag"
                      v-on:findAllUser="findAllUser"
                      :findUserObj="findUserObj"
                      :findState="findState"
                      :checkState="checkState"></fintall-deptuser>
  </div>

</template>

<script>
import frameWork from '@/components/select_box/frameworkpeo'
import fintallDeptuser from '@/components/select_box/findAllDeptUserSingleNew'
export default{
name: 'financing',
components: {
    frameWork,
    fintallDeptuser
},
    data () {
        return {
        findFlag:false,
        findState:{},
        checkState:{},
        //添加人员
        flag:false,
        peodatas:'',
        deployObj:[
            {name:''},
        ],
        findUserObj: [],
        select01: [],//获取的一级数组数据
        select02: [],//获取的二级数组数据
        indexId:'',//定义分类一的默认值
        indexId2:'',
        indexNum:0,//定义一级菜单的下标
        table_title: this.common.commonObjFn(),
        search_form:{
            name: '',
            principal: '',
            type: '融资客户',
            status: '',
            indexId: '',
            indexId2:''
        },
        deletes:false,
        token:'',
        userId:'',
        success_code:'',
        // 客户状态
        selectStateListState:[
            {
                value: 1002,
                label: '初步洽谈'
            },
            {
                value: 1003,
                label: '达成合作'
            },
            {
                value: 1004,
                label: '协议签署'
            }
        ],
        addtype:'新增融资客户',
        adtypeData:[
            {
                value:1,
                label:'新增融资客户'
            },
            {
                value:2,
                label:'新增自然人'
            },
            {
                value:3,
                label:'新增中介机构'
            }
        ],
        // 客户类型
        selectStateListType: [
            {
                value:0,
                label:'全部'
            },
            {
                value: 1,
                label: '融资客户'
            },
            {
                value: 2,
                label: '自然人客户'
            },
            {
                value: 3,
                label: '中介机构'
            }
        ],
        // 上市板块
        selectStateListipo:[
            {
                value: 1009,
                label: '未上市'
            },
            {
                value: 1010,
                label: '主板'
            },
            {
                value: 1011,
                label:'中小板'
            },
            {
                value: 1012,
                label:'创业板'
            },
            {
                value: 1013,
                label:'新三板'
            },
            {
                value: 1014,
                label:'其他'
            }
        ],

        tableData: [],
        multipleSelection: [],
        pageSize:10,
        pageSizes: [10,20,50,100],    //每页显示数量
        currentPage: 1,  //当前页
        dataTotal: 0, //总量
        idsdelete:[],
        myclect:'',
        typeNames:'',
        typeid:'',
        findVal: ""
      }
    },
    created () {
        this.myclienteList();
        this.token = this.$store.state.loginObject.userToken;
        this.userId = this.$store.state.loginObject.userId;
        this.success_code = this.code.codeNum.SUCCESS;
        // this.$router.push({path:'/customdetails/1/row', query:{row:row}})
    },
    mounted(){
        this.indusytryData()
    },

    methods:{
        //添加人员
        findAllUser(data){
          console.log(data, 22222,'返回')
          if (!data || !data.length) {
            this.findFlag = false;
            this.findState = {};
            this.checkState = {};
            this.search_form.principal = ''
            this.myclect  = ''
            return
          }
            this.deployObj = data;
            this.deployObj.forEach(v => {
              v.uniqueKey = 'user' + v.userId
            })
            this.search_form.principal = this.deployObj[0].name;
            this.myclect = this.deployObj[0].userId
            this.findFlag = false;
            this.findState = {};
            this.checkState = {};
            this.findUserObj = this.deployObj
        },
        // statesboxs(data){
        //     this.deployObj = data;
        //     this.search_form.principal = this.deployObj[0].name;

        //     console.log(this.deployObj[0].id)
        //     // for(var i=0; i<this.deployObj.length;i++){
        //     //     this.pricipalsArray.push(this.deployObj[i].id)
        //     //     console.log(this.pricipalsArray)
        //     // }
        // },
          // 选择用户
        optUser(){
            // this.user_num = num;search_form.principal
          // this.findAllUser = this.deployObj
          this.findFlag = true;
            this.findState = {state:0};
            this.checkState = {state:1};
            let obj = {
                id: this.myclect,
                userId: this.myclect,
                uniqueKey: 'user' + this.myclect,
                name: this.search_form.principal,
                label: this.search_form.principal
            }
            console.log(this.search_form.principal, 222, this.deployObj, this.myclect)
            this.findUserObj = []
          if (!this.search_form.principal && !this.myclect) {
            this.findUserObj = []
            return
          }
          this.findUserObj.push(obj)
        },
        indexSelect(event){
            this.A = event.target.value;
            // console.log(this.A);
        },
        //点击行业出现数据
        indexSelect01(){
            let i = 0;
            for (i = 0;i<this.select01.length;i++) {
                //console.log(this.select01[i].name)
                if (this.select01[i].id == this.indexId){
                    //console.log(this.select01[i].id)
                    this.indexId = this.select01[i].name;
                    //console.log(this.indexId2)
                    this.indexNum = i;
                    //console.log(this.indexNum)
                    break
                }
            }
            //console.log(this.select01[this.indexNum].childrens)
            this.select02 = this.select01[this.indexNum].childrens;
            this.indexId2 = '';

        },

        indusytryData(){
            var datas = {
                data:{

                },
                token:this.token,
                userId:this.userId
            }
            var _this = this;
             this.$post('/sys/Industry',datas).then((response)=> {
                 //console.log(response.data)
                 //console.log(response.data)
                _this.select01 = response.data;
                _this.indexSelect01();

            }).catch(function(error) {
                console.log(error);
            });
        },
        handleClick(row){
            console.log(12, row);
            this.typeid = row.id;
            if(row.typeName == "融资客户"){
                var ids = 1;
                this.typeNames = 1
            }else if(row.typeName == "自然人"){
                var ids = 2;
                this.typeNames = 2
                //this.$router.push({path: '/customdetails', query: {id:ids,row: JSON.stringify(row) }})
            }else if(row.typeName == "中介机构"){
                var ids = 3;
                this.typeNames = 3
                //this.$router.push({path: '/customdetails', query: {id:ids,row: JSON.stringify(row) }})
            }
                var datas = {
                    data:{
                        type:this.typeNames,
                        id:this.typeid
                    },
                }
                var _this = this;
                this.$post('/info/crm/getCrmInfo',datas).then((response)=> {
                   // console.log(response.data)
                    row = response.data
                    //console.log(row)
                    // _this.$router.push({path: '/customdetails', query: {id:ids,row: JSON.stringify(row)}})
                    var customObj = {id:ids,row: JSON.stringify(row)};
                    _this.$store.commit("customObj",customObj)
                    _this.$router.push({path: '/customdetails'})

                }).catch(function(error) {
                    console.log(error);
                });


            //var ids = 1;
            // this.$router.push({path: '/customdetails', query: {id:ids,row: row}})
            //this.$router.push({path: '/customdetails', query: {id:ids,row: JSON.stringify(row) }})
        },

        //获取选中项的数据

        handleSelectionChange(val) {
            this.multipleSelection = val;
            //console.log(val)
            for(var i=0; i< this.multipleSelection.length; i++){
               // console.log(this.multipleSelection[i].uid);
                var kk = this.idsdelete;
                this.idsdelete.push(this.multipleSelection[i].id)
               // console.log(this.idsdelete)
            }
        },
        // 确定删除
        deletessure(){
            //var id = this.multipleSelection[0].uid;
            var datas = {
                data:{
                    ids:this.idsdelete,
                    type:this.search_form.type
                },
                token:this.token,
                userId:this.userId

            }
            var _this = this;
            this.$post('/info/crm/myClients/delete', datas).then((response)=> {
                if(response.code == _this.success_code){
                    _this.deletes = false;
                    _this.myclienteList();
                    _this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                }else{
                    _this.$message(response.msg);
                }
                // _this.deletes = false;
                // _this.$message({
                //     message: '删除成功',
                //     type: 'success'
                // });
                // _this.myclienteList();

            }).catch(function(error) {
                console.log(error);
            });
        },
        // 是否选择一条数据
         handleAllDelete() {
              if(this.multipleSelection.length > 0) {
                  this.deletes = true;
              } else {
                  this.$message({
                    message: '请选择一条数据',
                    type: 'warning'
                });
              }
          },
        // 查询
        searchBtn(){
            //this.myclienteList(this.search_form.name,this.search_form.principal,this.search_form.type,this.search_form.status,this.indexId,this.indexId2)
            this.currentPage = 1;
            this.myclienteList()
        },
        // 重置
        resetBtn(){
            this.search_form = {
                name: '',
                principal: '',
                type: '融资客户',
                status: '',

            };
            this.myclect = '';
            this.indexId = '';
            this.indexId2=''
        },
        //分页
        onPageChange(currentPage) {
            this.currentPage = currentPage;
            this.myclienteList()
            //console.log(this.currentPage)  //点击第几页
        },
        // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange(val) {
           // console.log(val)
            this.pageSize = val;
            this.myclienteList()
        },

        // 列表数据
        myclienteList(){
            //console.log(this.search_form.type)
            // if(this.search_form.type == 1){
            //     var aaa = "company"
            // }else if(this.search_form.type == 2){
            //     var aaa = "individual"
            // }else if(this.search_form.type == 3){
            //     var aaa = "intermediary"
            // }
             var typeDate = this.search_form.type;
             //console.log(typeDate)
            if(typeDate == "全部"){
                 this.search_form.type = 0;
             }else if(typeDate == "融资客户"){
                 this.search_form.type = 1
             }else if(typeDate == "自然人"){
                 this.search_form.type = 2
             }else if(typeDate == "中介机构"){
                 this.search_form.type = 3
             }
            //  if(typeDate == "融资客户"){
            //      this.search_form.type = 1;
            //  }else if(typeDate == "自然人"){
            //      this.search_form.type = 2
            //  }else if(typeDate == "中介机构"){
            //      this.search_form.type = 3
            //  }
            var data={
                token:this.token,
                userId:this.userId,
                pageNo: this.currentPage,
                pageSize: this.pageSize,
                data: {
                    name: this.search_form.name,
                    principal: this.myclect,
                    type: this.search_form.type,
                    status: this.search_form.status,
                    industryOne: this.indexId,
                    industryTwo: this.indexId2
                }

            }
            var _this=this;
            this.$post('/info/crm/myClients', data).then((response)=> {
               // console.log(response.data)
                _this.tableData = response.data.list;
                _this.dataTotal = response.data.total;
            }).catch(function(error) {
                console.log(error);
            });

        },
        //新增融资客户
        newProFn(){
            this.dialogVisible = true;

        },
        // 导出
        handleExport(){
            if(this.multipleSelection.length > 0) {
                    var exportdata = [];
                    for(var i =0; i<this.multipleSelection.length; i++){
                       // console.log(this.multipleSelection[i].id)
                       // console.log(this.multipleSelection[i])
                        //exportdata.push(this.multipleSelection[i])
                        exportdata.push({
                            id: this.multipleSelection[i].id,
                            uid: this.multipleSelection[i].uid,
                            name: this.multipleSelection[i].name,
                            typeName: this.multipleSelection[i].typeName,
                            statusName: this.multipleSelection[i].statusName,
                            ipoName: this.multipleSelection[i].ipoName,
                            industryOne: this.multipleSelection[i].industryOne,
                            industryTwo: this.multipleSelection[i].industryTwo,
                            principalName: this.multipleSelection[i].principalName,
                            createByName: this.multipleSelection[i].createByName,
                            createTime: this.multipleSelection[i].createTime
                        })
                    }
                    //console.log(exportdata)
                    var params = {// 参数
                        token:this.token,
                        userId:this.userId,
                        data: exportdata
                    };
                   // console.log(params)
                    this.$store.commit("export", { url: "/info/crm/exportMyCrm", data: exportdata });
            }else{
                    this.$message({
                        message: '请选择一条数据',
                        type: 'warning'
                    });
            }
        }
    }
}

</script>
<style>
.myclientparents .myclientele .pro_tablemy td{
    /* height: 20px!important; */
    /* padding: 2px 0px!important; */
}
.myclientparents .pv-0{
      padding-top:0px;
      padding-bottom: 0px;
  }
.myclientparents .myclientele .el-button--medium{
    padding: 11px 20px!important;
}
</style>

<style scoped lang="scss" type="text/css">

.myclientparents .myclientele  .el-menu.el-menu--horizontal{
    border-bottom:0px;
    // padding-right: 20px;
    // margin-top: -17px;
}
/deep/.el-submenu .el-submenu__title:hover {
    background-color:transparent;
}
/deep/ .el-menu--horizontal>.el-submenu .el-submenu__title {
    height: 40px;
}
.myclientparents .myclientele{
    position:relative;
    background:#fff;

    .el-submenu {
        background-color:transparent;
    }

  .el-breadcrumb{
      line-height: 40px;
      padding-left: 10px;
    //   margin-left: 10px;
      padding-top: 5px;
  }
  .finance_tit{
    // padding:10px 0;
    // padding-bottom: 10px;
    height:70px;
    border-bottom: 14px solid #f0f2f5;
    font-size: 20px;
    font-weight: bold;
    padding-left: 10px;
  .el-button{
    float:right;
  }
  .tit{
    float:left;
    color:#333;
    font-size:20px;
    line-height:32px;
    margin-top:8px;
  }
  }
  .form_box{
    background:#fff;
    padding-top: 20px;
    padding-left:10px;
    padding-bottom:5px;

  .el-form-item{
    float:left;
    margin-right:20px;
    margin-bottom: 15px;
    height:40px;
  .el-input{
    width:217px;
  }
  .inline-input{
    width:217px;
  }
  .el-select{
    width:217px;
  }
  }
  .el-button{
    float:left;
    margin-left:20px;
    margin-top:2px;
  }
  }
  .el-pagination{
    margin-top:20px;
    text-align: right;
    margin-right: 40px;
  }
  .func_btn{
    width:100px;
    position: relative;
    top: -40px;
  }


}
</style>
<style>
 .myclientparents .myclientele  .el-menu--horizontal>.el-submenu .el-submenu__icon-arrow{
    position: static;
    vertical-align: middle;
    margin-left: 8px;
    margin-top: -3px;
    display: none;
  }
 .myclientparents .myclientele  .el-submenu__title .add_span{
     color:#fff;
     font-size: 18px;
 }
  .myclientparents .myclientele .el-submenu [class^=el-icon-]{
      /* background-color: #0061A9;
      color:#fff!important; */
      font-size: 14px;
      width: 7px;
      color: white;
  }
  .myclientparents .myclientele .el-dialog{
      text-align: left;
  }
  /* .el-textarea{
      width:580px;
  } */
  .myclientparents .myclientele .el-dialog__footer{
      text-align: right;
      margin-right: 40px;
  }
  .myclientparents .myclientele .dialog_tit{
      font-size: 16px;
      font-weight: 600;
  }
  /* .el-scrollbar__wrap {
      overflow-x: hidden;
  } */
  .myclientparents .myclientele  .shanchutankuang .el-dialog .el-dialog__header{
      border-bottom:1px solid #fff!important;
      text-align: left!important;
      font-size: 18px;
      color: #303133;
  }
  .myclientparents .myclientele .shanchutankuang .el-dialog .el-dialog__footer{
      margin-right: 0px;
  }
  .myclientparents .myclientele .shanchutankuang .el-dialog__body{
      text-align: left;
  }

  .myclientparents .myclientele .shanchutankuang .el-dialog .el-dialog__footer .dialog-footer .el-button{
      padding: 9px 15px;
    font-size: 12px;
    border-radius: 3px;
  }
</style>
