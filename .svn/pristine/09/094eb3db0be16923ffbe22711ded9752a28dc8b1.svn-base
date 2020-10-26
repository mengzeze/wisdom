<template>
<div class="customparentsclass">
  <div class="customcontact">
      <el-breadcrumb separator="/">
          <el-breadcrumb-item>客户管理</el-breadcrumb-item>
          <el-breadcrumb-item>客户联系人</el-breadcrumb-item>
      </el-breadcrumb>


    <div class="headersBox finance_tit">
        <div class="headersL">
          <span class="headers_clearFix_title">客户联系人</span>
        </div>
        <div class="headersR">
          <el-button v-if="$utils.checkSystemPermission('crm_financing_contacts_export')" type="primary" @click="handleExport">导出</el-button>
        </div>
      </div>
      <!-- <el-row class="finance_tit">
              <span>客户联系人</span>
      </el-row> -->

      <div class="query-box" v-on:keyup.enter="searchBtn">
        <el-form ref="form" :model="search_form"  :inline="true" class="form_box clearfix">
          <el-form-item label="客户名称：">
            <el-input v-model="search_form.name" placeholder="请输入客户名称" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="客户类型：">
            <el-select v-model="search_form.type" placeholder="请选择客户类型" >
              <el-option v-for="item in selectRoleList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系人姓名：">
            <el-input v-model="search_form.contact_name" placeholder="请输入联系人姓名"  maxlength="10"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button  type="primary" icon="el-icon-search" @click="searchBtn">查询</el-button>
            <el-button  @click="resetBtn" icon="el-icon-refresh">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
          <el-table :data="tableData" fit show-header :header-cell-style="{background:'#FAFAFA',color:'#000'}" style="width: 100%" class="pro_tables" @selection-change="handleSelectionChange">
              <el-table-column type="selection"></el-table-column>
              <el-table-column prop="typeName" label="客户类型" align="center" min-width="100">
                   <template slot-scope="scope">
                        <p :title="scope.row.typeName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.typeName}}</p>
                    </template>
              </el-table-column>
              <el-table-column prop="name" label="客户名称" align="center" min-width="100">
                   <template slot-scope="scope">
                        <el-button @click="clientDetail(scope.row)"
                             type="text"
                             class="ellipsis1"
                             style="padding:0;width:100%;line-height:22px;"
                             :title="scope.row.name">{{ scope.row.name }}</el-button>
                    </template>
              </el-table-column>
              <el-table-column prop="department" label="部门" align="center" min-width="100">
                  <template slot-scope="scope">
                        <p :title="scope.row.department" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.department}}</p>
                    </template>
              </el-table-column>
              <el-table-column prop="duty" label="职务" align="center" min-width="100">
                  <template slot-scope="scope">
                        <p :title="scope.row.duty" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.duty}}</p>
                    </template>
              </el-table-column>
              <el-table-column prop="contactName" label="联系人姓名" align="center" min-width="100">
                  <template slot-scope="scope">
                        <p :title="scope.row.contactName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.contactName}}</p>
                    </template>
              </el-table-column>
              <el-table-column prop="phoneNumber" label="手机号码" align="center" min-width="100">
                  '<template slot-scope="scope">
                        <p :title="scope.row.phoneNumber" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.phoneNumber}}</p>
                    </template>
              </el-table-column>
              <el-table-column prop="telephone" label="电话" align="center" min-width="100">
                   <template slot-scope="scope">
                        <p :title="scope.row.telephone" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.telephone}}</p>
                    </template>
              </el-table-column>
              <el-table-column prop="email" label="邮箱" align="center" min-width="100">
                   <template slot-scope="scope">
                        <p :title="scope.row.email" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.email}}</p>
                    </template>
              </el-table-column>
              <el-table-column prop="address" label="地址" align="center" min-width="100">
                   <template slot-scope="scope">
                        <p :title="scope.row.address" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.address}}</p>
                    </template>
              </el-table-column>
          </el-table>
      </div>
      <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="dataTotal" :pageSize="pageSize" :page-sizes="pageSizes" :current-page="currentPage" @current-change="onPageChange" @size-change="handleSizeChange">
      </el-pagination>
    <div class="func_btn">
      <!-- <el-button v-if="$utils.checkSystemPermission('crm_financing_contacts_export')" type="primary" @click="handleExport">导出</el-button> -->
      <!-- <el-button type="danger" @click="handleAllDelete">删除</el-button> -->
    </div>
      <!--<el-dialog  :title="dialogTitle" :visible.sync="dialogVisible"  width="60%">-->
          <!--<span>这是一段信息</span>-->
          <!--<span slot="footer" class="dialog-footer">-->
              <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
              <!--<el-button type="primary" @click="dialogVisible = false">保存</el-button>-->
          <!--</span>-->
      <!--</el-dialog>-->
  </div>
  </div>
</template>

<script>

  export default{
    name: 'customcontact',
    data () {
      return {
        search_form:{
          name: '',
          type: '融资客户',
          contact_name: '',
        },
        selectRoleList:[
            {
                value:0,
                label: "全部"
            },
            {
                value:1,
                label: "融资客户"
            },{
                value:2,
                label: "自然人"
            },{
                value:3,
                label: "中介机构"
            }
        ],
        // 列表数据
        tableData: [],
        pageSize:10,
        pageSizes: [10,20,50,100],    //每页显示数量
        currentPage: 1,  //当前页
        dataTotal: 0,    //总量
        dialogVisible: false, //弹框
        dialogTitle: "新建客户联系人",
        token:"",
        userId:"",
        i:0,
        success_code:"",
        multipleSelection:[]

      }
    },
    created(){
        this.token = this.$store.state.loginObject.userToken;
        this.userId = this.$store.state.loginObject.userId;
        this.success_code = this.code.codeNum.SUCCESS;
        this.listCust();
    },
    mounted(){
       
    },
    methods:{
    // 客户跳转详情
    clientDetail (item) {
      console.log(item.individualId)
      // if(!item.individualId) {
      //   this.$message.warning('该客户已删除')
      //   return
      // }
      const typeObj = {
        '融资客户': {
          label: 1,
          val: 'companyId'
        },
        '自然人': {
          label: 2,
          val: 'individualId'
        },
        '中介机构': {
          label: 3,
          val: 'intermediaryId'
        }
      }
      let clientTypeId = typeObj[item.typeName].label
      this.$post('/info/crm/getCrmInfo', {
        data: {
          type: clientTypeId,
          id: item[typeObj[item.typeName].val]
        }
      }).then(res => {
        if (res.code != this.success_code) {
          this.$message.error(res.msg)
          return
        }
        const data = res.data
        this.$store.commit("customObj", { id: clientTypeId, row: JSON.stringify(data) })
        this.$router.push({ path: '/customdetails',query:{ isContact:true } })
      }).catch(err => { console.log(err) })
    },
        // 查询
        searchBtn(){
            this.currentPage = 1;
            this.listCust();

        },
        // 重置
        resetBtn(){
            this.search_form = {
                name: '',
                type: '融资客户',
                contact_name: '',
            };
            //this.listCust();
        },
        // 列表
        listCust(){
             var typeDate = this.search_form.type;
             if(typeDate == "全部"){
                 this.search_form.type = 0;
             }else if(typeDate == "融资客户"){
                 this.search_form.type = 1
             }else if(typeDate == "自然人"){
                 this.search_form.type = 2
             }else if(typeDate == "中介机构"){
                 this.search_form.type = 3
             }
            var data={
                data:{
                    name: this.search_form.name,
                    type: this.search_form.type,
                    contactName: this.search_form.contact_name
                },
                token:this.token,
                userId:this.userId,
                pageNo:this.currentPage,
                pageSize:this.pageSize
            }
            var _this=this;
            this.$post('/info/crm/allContact', data).then((response)=> {
                _this.tableData=response.data.list;
                _this.dataTotal = response.data.total;
               // console.log(response.data);
            }).catch(function(error) {
                console.log(error);
            });
        
        },
     //分页
        onPageChange(currentPage) {
            this.currentPage = currentPage;
            this.listCust()
            //console.log(this.currentPage)  //点击第几页
        },
        // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange(val) {
            // console.log(val)
            this.pageSize = val;
            //console.log(this.pageSize)
            setTimeout(()=>{
              this.listCust()
            },500)
        },
        handleSelectionChange(val){
            this.multipleSelection = val;
        },
        handleExport(){//导出表格
            //console.log(this.multipleSelection)
            if(this.multipleSelection.length > 0) {
                //var typeDate = this.search_form.type;
                //console.log(typeDate)
                var exportdata = [];
                for(var i =0; i<this.multipleSelection.length; i++){
                    exportdata.push({
                        id: this.multipleSelection[i].id,
                        typeName: this.multipleSelection[i].typeName, //客户类型
                        name: this.multipleSelection[i].name,  //客户名称
                        department: this.multipleSelection[i].department,
                        duty: this.multipleSelection[i].duty,
                        contactName: this.multipleSelection[i].contactName,
                        phoneNumber: this.multipleSelection[i].phoneNumber,
                        telephone: this.multipleSelection[i].telephone,
                        email: this.multipleSelection[i].email,
                        address: this.multipleSelection[i].address,
                    })
                }
                console.log(exportdata)
                var params = {// 参数
                    token:this.token,
                    userId:this.userId,
                    data: exportdata
                };
                this.$store.commit("export", { url: "/info/crm/exportAllContact", data: exportdata });
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

<style scoped lang="scss" type="text/css">
  .customparentsclass .customcontact{
        position:relative;
        background:#fff;
      .el-breadcrumb{
          line-height: 46px;
          padding-left: 10px;
        //   margin-left: 10px;
      }
        .finance_tit {
    // padding:10px 0;
    padding-bottom: 10px;
    border-bottom: 14px solid #f0f2f5;
    font-size: 20px;
    font-weight: bold;
    // padding-left: 10px;
    /*// margin:5px 0 19px;*/
    span {
      float: left;
      color: #333;
      font-size: 20px;
      // line-height:32px;
      // margin-left:10px;
    }
  }
      .form_box{
          background:#fff;
          padding-top: 20px;
          padding-left:10px;
        //   padding-bottom:20px;
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
            margin-top:0px;
          }
      }
      .el-pagination{
        margin-top:20px;
        text-align: right;
        margin-right: 40px;
      }
        .func_btn{
        width:200px;
        position: relative;
        top: -40px;
        left:-40px;
    }
      .headersBox {
    overflow: hidden;
    zoom: 1;

    .headers_clearFix_title {
      padding-left: 10px;
      text-align: left;
      font-size: 20px;
      font-weight: bold;
    }
    .headersL {
      float: left;
    }
    .headersR {
      float: right;
      box-sizing: border-box;
      padding-right: 20px;
      //   padding-bottom: 16px;
    }
  }
  }
</style>
<style lang="scss" type="text/css">
.customparentsclass .headersBox .el-button+.el-button {
    margin-left: 5px;
}
 .customparentsclass .customcontact .table_box{
      padding:0 10px;
      box-sizing:border_box;
  }
  .customparentsclass .customcontact .el-button--medium{
      padding:12px 20px!important;
  }
    .customparentsclass{
        .pro_tables td{
            padding: 15px 0 14px 0;
        }
    }
/* .pro_table td{
    padding: 
} */
</style>
