<template>
  <div class="customvistparentsclass">
    <div class="customvisit">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>客户管理</el-breadcrumb-item>
        <el-breadcrumb-item>客户拜访记录</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="headersBox finance_tit">
        <div class="headersL">
          <span class="headers_clearFix_title">客户拜访记录</span>
        </div>
        <div class="headersR">
          <el-button v-if="$utils.checkSystemPermission('crm_financing_visit_export')" type="primary" @click="handleExport">导出</el-button>
        </div>
      </div>
      <!-- <el-row class="finance_tit">
      <span>客户拜访记录</span>
    </el-row> -->

      <div class="query-box" v-on:keyup.enter="searchBtn">
        <el-form ref="form" :model="search_form" :inline="true" class="form_box clearfix">
          <el-form-item label="拜访人员：">
            <!-- <el-input v-model="search_form.visit_personnel" placeholder="请输入关键词"></el-input> -->
            <el-input v-model="search_form.visit_personnel" class="fl" placeholder="请选择拜访人员" disabled="disabled" :customer="customer"></el-input>
            <el-button type="primary" size="small" @click="optUser()" class="fl" style="margin-left: 0px;height: 40px;margin-top: 0px;">选择人员</el-button>
          </el-form-item>
          <el-form-item label="拜访日期：">
            <!-- <el-date-picker  v-model="search_form.start_date" type="daterange"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker> -->
            <el-date-picker v-model="search_form.start_date"
                            type="datetime"
                            placeholder="开始日期"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            @focus="$utils.handleTimeFocus"></el-date-picker>
            <!-- <el-date-picker v-model="search_form.end_date" type="datetime" placeholder="结束日期" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker> -->
          </el-form-item>
          <el-form-item label="客户类型：">
            <el-select v-model="search_form.type" placeholder="请选择客户类型">
              <el-option v-for="item in selectRoleList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户名称：">
            <el-input v-model="search_form.name" placeholder="请输入客户名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchBtn" icon="el-icon-search">查询</el-button>
            <el-button @click="resetBtn" icon="el-icon-refresh">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-table :data="tableData" fit show-header :header-cell-style="{background:'#FAFAFA',color:'#000'}" style="width: 100%" class="pro_table" @selection-change="handleSelectionChange">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="creatorName" label="创建人" align="center" min-width="100">
            <template slot-scope="scope">
              <p :title="scope.row.creatorName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.creatorName}}</p>
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
          <el-table-column prop="typeName" label="客户类型" align="center" min-width="100">
            <template slot-scope="scope">
              <p :title="scope.row.typeName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.typeName}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="拜访日期" align="center" min-width="100" width="115">
            <template slot-scope="scope">
              <p :title="scope.row.date" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.date}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="place" label="拜访地点" align="center" min-width="100">
            <template slot-scope="scope">
              <p :title="scope.row.place" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.place}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="visitPersonnelName" label="拜访人员" align="center" min-width="100">
            <template slot-scope="scope">
              <p :title="scope.row.visitPersonnelName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.visitPersonnelName}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="form" label="拜访形式" align="center" min-width="100">
            <template slot-scope="scope">
              <p :title="scope.row.form" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.form}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center" min-width="100">
            <template slot-scope="scope">
              <p :title="scope.row.createTime" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.createTime}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="result" label="主要成果" align="center" min-width="100">
            <template slot-scope="scope">
              <p :title="scope.row.result" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.result}}</p>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="dataTotal" :pageSize="pageSize" :page-sizes="pageSizes" :current-page="currentPage" @current-change="onPageChange" @size-change="handleSizeChange">
      </el-pagination>
      <div class="func_btn">
        <!-- <el-button v-if="$utils.checkSystemPermission('crm_financing_visit_export')" type="primary" @click="handleExport">导出</el-button> -->
      </div>
      <frame-work v-if="flag" :peodatas='peodatas' v-on:statesbox='statesboxs' :radioUser="1"></frame-work>
      <!--:findUserObj="findUserObj"-->
      <fintall-deptuser :findFlagShow.sync="findFlag" v-on:findAllUser="findAllUser"
                        :findUserObj="findUserObj"
                        :findState="findState" :checkState="checkState"></fintall-deptuser>
    </div>
  </div>
</template>

<script>
import frameWork from '@/components/select_box/frameworkpeo'
import fintallDeptuser from '@/components/select_box/findAllDeptUserSingleNew'
export default {
  name: 'customvisit',
  components: {
    frameWork,
    fintallDeptuser
  },
  data () {
    return {
      //添加人员
      findUserObj: [],
      flag: false,
      peodatas: '',
      findFlag: false,
      findState: {},
      checkState: {},
      search_form: {
        visit_personnel: '',
        start_date: '',
        name: '',
        type: '融资客户'
      },
      tableData: [],
      multipleSelection: [],
      pageSize: 10,
      pageSizes: [10, 20, 50, 100],    //每页显示数量
      currentPage: 1,  //当前页
      dataTotal: 0,    //总量
      token: '',
      userId: '',
      success_code: '',
      selectRoleList: [
        {
          value: 0,
          label: "全部"
        },
        {
          value: 1,
          label: "融资客户"
        }, {
          value: 2,
          label: "自然人"
        }, {
          value: 3,
          label: "中介机构"
        }
      ],
      customer: '',
      i: 0,
    }
  },
  mounted () {

  },
  created () {

    this.token = this.$store.state.loginObject.userToken;
    this.userId = this.$store.state.loginObject.userId;
    this.success_code = this.code.codeNum.SUCCESS;
    this.custvustList();
  },
  methods: {
    clientDetail (item) {
      console.log(item.intermediaryId)
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
        this.$router.push({ path: '/customdetails',query:{ isVisit:true } })
      }).catch(err => { console.log(err) })
    },
    //添加人员
    findAllUser (data) {
      if (!data.length) {
        this.findFlag = false;
        this.search_form.visit_personnel = '';
        this.customer = '';
        return
      }
      this.deployObj = data;
      this.deployObj.forEach(v => {
        v.uniqueKey = 'user' + v.userId
      })
      this.search_form.visit_personnel = this.deployObj[0].name;
      this.customer = this.deployObj[0].userId;
      this.findFlag = false;
      this.findState = {};
      this.checkState = {};
      this.findUserObj = this.deployObj
    },
    // 选择用户
    optUser () {
      if (!this.search_form.visit_personnel) {
        this.findUserObj = []
      }
      this.findFlag = true;
      this.findState = { state: 0 };
      this.checkState = { state: 1 };
      // var dataObj = {
      //     "data":{},
      //     "pageNo":0,
      //     "pageSize":0,
      //     "token":this.token,
      //     "userId":this.userId,
      // };
      // var that = this;
      // this.$post('/sys/getAllUser', dataObj).then((response)=> {
      //     console.log(response.data);
      //     that.flag = true;
      //     that.peodatas = response.data.list;
      // }).catch(function(error) {
      //     console.log(error);
      // });

    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
      console.log(val);
    },
    // 查询
    searchBtn () {
      // var data = this.search_form;
      //  this.mediunList(this.search_form.visit_personnel,this.search_form.name,this.search_form.start_date)
      this.currentPage = 1;
      this.custvustList()
    },
    // 重置
    resetBtn () {
      this.search_form = {
        visit_personnel: '',
        name: '',
        start_date: '',
        type: '融资客户'
      };
      this.customer = '';
      //this.custvustList()
    },
    // 分页
    onPageChange (currentPage) {
      this.currentPage = currentPage;
      this.custvustList()
      // console.log(this.currentPage)  //点击第几页
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange (val) {
      this.pageSize = val;
      setTimeout(() => {
        this.custvustList()
      }, 500)
    },
    custvustList () {
      // if(currentPage==undefined || currentPage == ""){
      //     currentPage=0
      // }
      // if(currentPageval==undefined || currentPageval == ""){
      //     currentPageval=10
      // }
      var typeDate = this.search_form.type;
      //console.log(typeDate)
      //  if(typeDate == "融资客户"){
      //      this.search_form.type = 1;
      //  }else if(typeDate == "自然人"){
      //      this.search_form.type = 2
      //  }else if(typeDate == "中介机构"){
      //      this.search_form.type = 3
      //  }
      if (typeDate == "全部") {
        this.search_form.type = 0;
      } else if (typeDate == "融资客户") {
        this.search_form.type = 1
      } else if (typeDate == "自然人") {
        this.search_form.type = 2
      } else if (typeDate == "中介机构") {
        this.search_form.type = 3
      }
      var data = {
        data: {
          visitPersonnel: this.customer,
          date: this.search_form.start_date,
          name: this.search_form.name,
          type: this.search_form.type
        },
        token: this.token,
        userId: this.userId,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      }
      var _this = this;
      this.$post('/info/crm/allVisit', data).then((response) => {
        for (var i = 0; i < response.data.list.length; i++) {
          response.data.list[i].date = response.data.list[i].startDate + '--' + response.data.list[i].endDate;
        }
        _this.tableData = response.data.list;
        _this.dataTotal = response.data.total;
      }).catch(function (error) {
        console.log(error);
      });

    },
    // 导出
    handleExport () {
      //console.log(this.multipleSelection)
      if (this.multipleSelection.length > 0) {
        var exportdata = [];
        for (var i = 0; i < this.multipleSelection.length; i++) {
          console.log(this.multipleSelection[i].id)
          exportdata.push({
            id: this.multipleSelection[i].id,
            type: this.multipleSelection[i].typeName, //客户类型
            name: this.multipleSelection[i].name,  //客户名称
            date: this.multipleSelection[i].date,
            place: this.multipleSelection[i].place,
            visitPersonnelName: this.multipleSelection[i].visitPersonnelName,
            form: this.multipleSelection[i].form,
            result: this.multipleSelection[i].result,
            creatorName: this.multipleSelection[i].creatorName,
            createTime: this.multipleSelection[i].createTime,
          })
        }
        //console.log(exportdata)
        var params = {// 参数
          token: this.token,
          userId: this.userId,
          data: exportdata
        };
        this.$store.commit("export", { url: "/info/crm/exportAllVisit", data: exportdata });
      } else {
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
.customvistparentsclass .customvisit {
  position: relative;
  background: #fff;
  .el-breadcrumb {
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
  .form_box {
    background: #fff;
    padding-top: 20px;
    padding-left: 10px;
    // padding-bottom:20px;
    .el-form-item {
      float: left;
      margin-right: 20px;
      margin-bottom: 15px;
      height: 40px;
      .el-input {
        width: 190px;
      }
      .inline-input {
        width: 190px;
      }
      .el-select {
        width: 170px;
      }
    }
    .el-button {
      float: left;
      margin-left: 20px;
      margin-top: 0px;
    }
  }
  .el-pagination {
    margin-top: 20px;
    text-align: right;
    margin-right: 40px;
  }
  .func_btn {
    width: 100px;
    position: relative;
    top: -40px;
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
.customvistparentsclass .headersBox .el-button + .el-button {
  margin-left: 5px;
}
.customvistparentsclass .customvisit .table_box {
  padding: 0 10px;
  box-sizing: border-box;
}

.customvistparentsclass .customvisit .el-button--medium {
  padding: 12px 20px !important;
}
.customvistparentsclass {
  .pro_table td {
    padding: 15px 0 14px 0;
  }
}
</style>
