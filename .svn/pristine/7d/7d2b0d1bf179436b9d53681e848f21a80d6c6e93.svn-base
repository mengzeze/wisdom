<template>
<div class="worknoteparents">
  <div class="worknote">
    <div class="table_box">
      <el-table :data="tableData" fit show-header :header-cell-style="{background:'#FAFAFA',color:'#000'}" style="width: 100%" class="pro_table" @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="code" label="项目编码" align="center" min-width="100">
             <template slot-scope="scope">
                <p :title="scope.row.code" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.code}}</p>
            </template>
        </el-table-column>
        <el-table-column prop="name" label="项目名称" align="center" min-width="100">
            <template slot-scope="scope">
                <p :title="scope.row.name" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.name}}</p>
            </template>
        </el-table-column>
        <el-table-column prop="deptName" label="部门" align="center" min-width="100">
             <template slot-scope="scope">
                <p :title="scope.row.deptName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.deptName}}</p>
            </template>
        </el-table-column>
        <el-table-column prop="financingName" label="项目类型" align="center" min-width="100">
             <template slot-scope="scope">
                <p :title="scope.row.financingName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.financingName}}</p>
            </template>
        </el-table-column>
        <el-table-column prop="principalName" label="客户负责人" align="center" min-width="100">
             <template slot-scope="scope">
                <p :title="scope.row.principalName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.principalName}}</p>
            </template>
        </el-table-column>
        <el-table-column prop="userIdName" label="项目负责人" align="center" min-width="100">
             <template slot-scope="scope">
                <p :title="scope.row.userIdName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.userIdName}}</p>
            </template>
        </el-table-column>
        <el-table-column prop="createByname" label="项目创建人" align="center" min-width="100">
             <template slot-scope="scope">
                <p :title="scope.row.createByname" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.createByname}}</p>
            </template>
        </el-table-column>
        <el-table-column prop="createTime" label="项目创建时间" align="center" min-width="100">
             <template slot-scope="scope">
                <p :title="scope.row.createTime" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.createTime}}</p>
            </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="dataTotal" :pageSize="pageSize" :page-sizes="pageSizes" :current-page="currentPage" @current-change="onPageChange" @size-change="handleSizeChange">
    </el-pagination>
    <div class="func_btn">
      <!-- <el-button size="medium" type="primary" @click="handleExport" v-if="$utils.checkSystemPermission('crm_financing_cooperation_export')">导出</el-button> -->
    </div>
  </div>
</div>
</template>

<script>

  export default{
    name: 'worknote',
    props:[
        'custData',
        'finacnData'
    ],
    data () {
      return {
        tableData: [],
        pageSize:10,
        pageSizes: [10,20,50,100],    //每页显示数量
        currentPage: 1,  //当前页
        dataTotal: 0,    //总量
        token:'',
        userId:'',
        success_code:'',
        multipleSelection:[],
        nameexport:'',
        typeNames:''
      }
    },
    mounted(){

    },
    created () {
        
        this.token = this.$store.state.loginObject.userToken;
        this.userId = this.$store.state.loginObject.userId;
        this.success_code = this.code.codeNum.SUCCESS;
        //this.workList();
    },
    methods:{
        // 分页
        onPageChange(currentPage) {
            this.currentPage = currentPage;
            this.workList()
            //console.log(this.currentPage)  //点击第几页
        },
        handleSizeChange(val) {
              //console.log(`每页 ${val} 条`);
              this.pageSize = val;
            //   this.mediunList()
              this.workList()
        },
        workList(){
            if(this.$store.state.customObj.id == 1){
                var data={
                    data:{
                        crmId:this.custData.id
                    },
                    token:this.token,
                    userId:this.userId,
                    pageNo: this.currentPage,
                    pageSize: this.pageSize
                }
                var _this=this;
                this.$post('/info/crm/CompanyCoo', data).then((response)=> {
                    if(response.code !== 0) {
                        _this.$message.error(response.msg);
                        return
                    }
                    //console.log(response.data)
                    _this.tableData=response.data.list;
                    _this.dataTotal = response.data.total;
                }).catch(function(error) {
                    console.log(error);
                });
            }else if(this.$store.state.customObj.id == 3 ){
                var data={
                    data:{
                        crmId:this.finacnData.id
                    },
                    token:this.token,
                    userId:this.userId,
                    pageNo: this.currentPage,
                    pageSize: this.pageSize
                }
                var _this=this;
                this.$post('/info/crm/IntermediaryCoo', data).then((response)=> {
                    if(response.code !== 0) {
                        _this.$message.error(response.msg);
                        return
                    }
                    //console.log(response.data)
                    _this.tableData=response.data.list;
                    _this.dataTotal = response.data.total;
                }).catch(function(error) {
                    console.log(error);
                });
            }
            
        
        },
        handleSelectionChange(val){
            this.multipleSelection = val;
        },
        handleExport(){//导出表格
            //console.log(this.multipleSelection)
            if(this.multipleSelection.length > 0) {
                if(this.$store.state.customObj.id == 1){
                    //this.typeIds = this.custData.id;
                    this.nameexport = this.custData.name
                    this.typeNames = "融资客户"
                }else if(this.$store.state.customObj.id == 2){
                    //this.typeIds = this.naturalData.id;
                    this.nameexport = this.naturalData.name
                    this.typeNames = "自然人"
                }else if(this.$store.state.customObj.id == 3){
                    //this.typeIds = this.finacnData.id;
                    this.nameexport = this.finacnData.name
                    this.typeNames = "中介机构"
                }
                var exportdata = [];
                for(var i =0; i<this.multipleSelection.length; i++){
                    //console.log(this.multipleSelection[i].id)
                     exportdata.push({
                        id: this.multipleSelection[i].id,
                        customType: this.typeNames,
                        customName: this.nameexport,
                        code: this.multipleSelection[i].code,
                        name:this.multipleSelection[i].name,
                        financingName: this.multipleSelection[i].financingName,
                        principalName: this.multipleSelection[i].principalName,
                        userIdName: this.multipleSelection[i].userIdName,
                        createByname: this.multipleSelection[i].createByname,
                        createTime: this.multipleSelection[i].createTime
                    })
                }
                //console.log(exportdata)
                var params = {// 参数
                    token:this.token,
                    userId:this.userId,
                    data: exportdata
                };
                this.$store.commit("export", { url: "/info/crm/exportCooperation", data: exportdata });
            }else{
                this.$message({
                    message: '请选择一条数据',
                    type: 'warning'
                });
            }
        },
    }
  }

</script>

<style scoped lang="scss" type="text/css">
 .worknoteparents .worknote{
        position:relative;
        background:#fff;
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
 .worknoteparents .worknote .table_box{
    padding:0 10px;
    box-sizing:border_box;
  }
  .worknoteparents .worknote  .pro_table td{
    /* height: 20px!important; */
    /* padding: 2px 0px!important; */
}
.worknoteparents .worknote .el-button--medium{
    padding: 12px 20px!important;
}
</style>
