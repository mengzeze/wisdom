<template>
  <div class="zhonjieparents">
    <div class="financing">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>客户管理</el-breadcrumb-item>
        <el-breadcrumb-item>中介机构</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="headersBox finance_tit">
        <div class="headersL">
          <span class="headers_clearFix_title">中介机构</span>
        </div>
        <div class="headersR">
          <el-button type="primary" v-if="$utils.checkSystemPermission('crm_financing_export')"  @click="handleExport">导出</el-button>
          <el-button type="primary" v-if="$utils.checkSystemPermission('crm_financing_del')" @click="handleAllDelete">删除</el-button>
          <el-button type="primary" @click="newProFn" icon="el-icon-plus"  v-if="$utils.checkSystemPermission('crm_financing_add')">新增中介机构</el-button>
        </div>
      </div>
      <!-- <el-row class="finance_tit" style="position: relative;">
              <span>中介机构</span>
              <el-button @click="newProFn" style="position: absolute;top: -11px;right: 7px;" icon="el-icon-plus" type="primary" v-if="$utils.checkSystemPermission('crm_financing_add')">新增中介机构</el-button>
        </el-row> -->

      <div class="query-box" v-on:keyup.enter="searchBtn">
        <el-form ref="form" :model="search_form" :inline="true" class="form_box clearfix">
          <el-form-item label="机构名称：">
            <el-input v-model="search_form.name" placeholder="请输入机构名称"></el-input>
          </el-form-item>
          <el-form-item label="机构简称：">
            <el-input v-model="search_form.abbreviation" placeholder="请输入机构简称" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="机构类型：">
            <el-select v-model="search_form.type" placeholder="请选择机构类型" clearable>
              <!-- <el-option v-for="item in selectRoleList" :key="item.id" :lable="item.id" :value="item.name"></el-option> -->
              <el-option v-for="item in selectStateListState1" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户负责人：">
            <!-- <el-input v-model="search_form.principal" placeholder="请输入关键词"></el-input> -->
            <el-input v-model="search_form.principal" class="fl" placeholder="请输入客户负责人" disabled="disabled" :customer="customer"></el-input>
            <el-button type="primary" size="small" @click="optUser(2)" class="fl" style="margin-left: 0px;height: 40px;margin-top: 0px;">选择人员</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchBtn" icon="el-icon-search">查询</el-button>
            <el-button @click="resetBtn" icon="el-icon-refresh" style="">重置</el-button>
          </el-form-item>

        </el-form>
      </div>
      <el-table :data="tableData" fit show-header :header-cell-style="{background:'#FAFAFA',color:'#000'}" style="width: 100%" class="pro_table" @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="uid" label="机构编码" align="center" min-width="100">
          <template slot-scope="scope">
            <p :title="scope.row.uid" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.uid}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="机构名称" align="center" min-width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)"
                v-if="$utils.checkSystemPermission('crm_financing_edit')"
                             type="text"
                             class="ellipsis1"
                             style="padding:0;width:100%;line-height:22px;"
                             :title="scope.row.name">{{ scope.row.name }}</el-button>
                 <p v-else :title="scope.row.name" class="ellipsis1">{{scope.row.name}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="abbreviation" label="机构简称" align="center" min-width="100">
          <template slot-scope="scope">
            <p :title="scope.row.abbreviation" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.abbreviation}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="typeName" label="机构类型" align="center" min-width="100">
          <template slot-scope="scope">
            <p :title="scope.row.typeName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.typeName}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="principalName" label="客户负责人" align="center" min-width="100">
          <template slot-scope="scope">
            <p :title="scope.row.principalName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.principalName}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="createByName" label="创建人" align="center" min-width="100">
          <template slot-scope="scope">
            <p :title="scope.row.createByName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.createByName}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center" min-width="100">
          <template slot-scope="scope">
            <p :title="scope.row.createTime" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.createTime}}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="100">
          <template slot-scope="scope">
            <!-- <router-link to="/customdetails/3"><el-button type="text">编辑</el-button></router-link> -->
            <!-- <el-tooltip class="item" effect="dark" content="编辑" placement="top"> -->
            <el-button class="pv-0" type="text"
            @click="handleClick(scope.row)"
            v-if="$utils.checkSystemPermission('crm_financing_edit')" title="详情"><i class="icon-operate-btn iconfont wenzhang"></i></el-button>
            <!-- </el-tooltip> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="dataTotal" :pageSize="pageSize" :page-sizes="pageSizes" :current-page="currentPage" @current-change="onPageChange" @size-change="handleSizeChange">
      </el-pagination>
      <div class="func_btn">
        <!-- <el-button v-if="$utils.checkSystemPermission('crm_financing_export')" type="primary" @click="handleExport">导出</el-button>
        <el-button v-if="$utils.checkSystemPermission('crm_financing_del')" @click="handleAllDelete">删除</el-button> -->
      </div>
      <!--弹框-->
      <el-dialog title="新增中介机构" :visible.sync="dialogVisible" width="790px" :close-on-click-modal="false" :before-close="handleClose">
        <span class="dialog_tit">机构信息</span>
        <div style="height:500px;">
          <el-scrollbar style="height:100%">
            <el-form ref="msgObj" :model="msgObj" label-width="120px" class="form_box clearfix">
              <el-form-item label="机构名称：" :rules="[{required:true}]">
                <!--<el-input v-model="msgObj.pro_name" placeholder="请输入关键词"   maxlength="100"></el-input>-->
                <!-- <el-autocomplete  class="inline-input"  v-model="msgObj.name"  placeholder="请输入机构名称" :trigger-on-focus="false"
                          ></el-autocomplete> -->
                <el-input v-model="msgObj.name" placeholder="请输入机构名称" maxlength="100"></el-input>
              </el-form-item>
              <el-form-item label="机构简称：" :rules="[{required:true}]">
                <el-input v-model="msgObj.abbreviation" placeholder="请输入机构简称" maxlength="50"></el-input>
              </el-form-item>
              <el-form-item label="机构类型：" :rules="[{required:true}]">
                <el-select v-model="msgObj.type" placeholder="请选择机构类型" clearable>
                  <!-- <el-option v-for="item in selectStateList" :key="item.id" :lable="item.id" :value="item.name"></el-option> -->
                  <el-option v-for="item in selectStateListState1" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="客户状态：" :rules="[{required:true}]">
                        <el-select v-model="msgObj.status" placeholder="请选择客户状态" clearable  @change="selectRoleChange">
                            <el-option v-for="item in selectStateListState" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                        </el-select>
                      </el-form-item> -->
              <el-form-item label="机构联系人：" :rules="[{required:true}]">
                <el-input v-model="msgObj.contact" placeholder="请输入机构联系人" maxlength="20"></el-input>
              </el-form-item>
              <el-form-item label="客户负责人：" :rules="[{required:true}]">
                <el-input v-model="msgObj.principal" class="fl" placeholder="请输入客户负责人" disabled="disabled" :principalmsg="principalmsg"></el-input>
                <el-button type="primary" size="small" @click="optUser(1)" class="fl" style="margin-left: 0px;height: 40px;margin-top: 0px;">选择人员</el-button>
                <!-- <el-input v-model="msgObj.principal" placeholder="请输入客户负责人"></el-input> -->
                <!-- <div style="width:300px;border:1px solid #3333;display:inline-block;border-radius:5px;">
                            <span v-for="item in  deployObj" class="role_btn">{{item.name}}</span>
                        </div>
                         <el-button size="small" type="primary" @click="optUser" class="opt_btn" style="margin-left:0px;margin-right:3px;">选择用户</el-button> -->
              </el-form-item>
              <el-form-item label="联系电话：" :rules="[{required:true}]">
                <el-input v-model="msgObj.telephone" placeholder="请输入联系电话" maxlength="50"></el-input>
              </el-form-item>
              <el-form-item label="邮箱：" :rules="[{required:true}]">
                <el-input v-model="msgObj.email" placeholder="请输入邮箱" maxlength="50"></el-input>
              </el-form-item>
              <el-form-item label="传真：">
                <el-input v-model="msgObj.fax" placeholder="请输入传真" maxlength="15"></el-input>
              </el-form-item>
              <el-form-item label="邮编：">
                <el-input v-model="msgObj.postcode" @input="msgObj.postcode=msgObj.postcode.replace(/[^\d\.]/g,'')" placeholder="请输入邮编" maxlength="6"></el-input>
              </el-form-item>
              <el-form-item label="办公地址：">
                <el-input v-model="msgObj.address" placeholder="请输入办公地址" maxlength="100"></el-input>
              </el-form-item>
              <el-form-item label="机构网址：">
                <el-input v-model="msgObj.website" placeholder="请输入机构网址" maxlength="100"></el-input>
              </el-form-item>
              <el-form-item label="机构简介：" style="margin-top:10px;">
                <el-input type="textarea" :rows="2" v-model.trim="msgObj.introduction" placeholder="请输入机构简介" maxlength="2000" resize="none"></el-input>
              </el-form-item>
              <el-form-item label="备注：" style="margin-top:10px;">
                <el-input type="textarea" :rows="2" v-model.trim="msgObj.remarks" placeholder="请输入备注" maxlength="100" resize="none"></el-input>
              </el-form-item>
            </el-form>
          </el-scrollbar>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="medium" @click="closemediumDialog">取 消</el-button>
          <el-button size="medium" type="primary" @click="saveMsg">保存</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 删除弹框 -->
    <div class="shanchutankuang">
      <el-dialog title="提示" :close-on-click-modal="false" :visible.sync="deletes" width="22%">
        <div class="clearfix">
          <img class="fl" src="../../../../assets/image/shan1.png" alt="" style="width:24px;height:24px;position: relative;top: -3px;margin-right: 10px">
          <span class="fl">确定删除这条信息吗</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="medium" @click="deletes = false">取 消</el-button>
          <el-button size="medium" type="primary" @click="deletessure">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- <frame-work v-if="flag" :peodatas='peodatas'  v-on:statesbox='statesboxs' :radioUser="1"></frame-work> -->
    <!--:findUserObj="user_num === 1 ? findUserObj : findUserObjM"-->
    <fintall-deptuser :findFlagShow.sync="findFlag"
                      v-on:findAllUser="findAllUser"
                      :findUserObj="user_num === 1 ? findUserObj : findUserObjM"
                      :findState="findState" :checkState="checkState"></fintall-deptuser>
  </div>
</template>

<script>
// import frameWork from '@/components/select_box/frameworkpeo'
import fintallDeptuser from '@/components/select_box/findAllDeptUserSingleNew'
export default {
  name: 'financing',
  components: {
    // frameWork,
    fintallDeptuser
  },
  data () {
    return {
      findUserObj: [],
      findUserObjM: [],
      table_title: this.common.commonObjFn(),
      deletes: false,
      search_form: {
        name: '',
        abbreviation: '',
        type: '',
        principal: '',
      },
      // 客户状态
      // selectStateListState:[
      //     {
      //         value: 1002,
      //         label: '初步洽谈'
      //     },
      //     {
      //         value: 1003,
      //         label: '达成合作'
      //     },
      //     {
      //         value: 1004,
      //         label: '协议签署'
      //     }
      // ],
      selectStateListState1: [
        {
          value: 1056,
          label: '会计师事务所'
        },
        {
          value: 1057,
          label: '律师事务所'
        },
        {
          value: 1058,
          label: '资产评估机构'
        },
        {
          value: 1059,
          label: '信用评级机构'
        },
        {
          value: 1060,
          label: '券商机构'
        }
      ],
      tableData: [],
      multipleSelection: [],
      pageSize: 10,
      pageSizes: [10, 20, 50, 100],    //每页显示数量
      currentPage: 1,  //当前页
      dataTotal: 0,    //总量

      dialogVisible: false, //弹框
      msgObj: {
        name: '',
        abbreviation: '',
        type: '',
        status: '',
        contact: '',
        principal: "",
        telephone: '',
        email: '',
        fax: '',
        postcode: '',
        address: '',
        website: '',
        introduction: '',
        remarks: '',
      },
      deployObj: [
        { name: '' },
      ],
      //添加人员
      flag: false,
      peodatas: '',
      findFlag: false,
      findState: {},
      checkState: {},
      token: '',
      userId: '',
      success_code: '',
      idsdelete: '',
      user_num: '',
      customer: '',
      principalmsg: '',
      newProjectDialogTimer: null
    }
  },
  mounted () {
    //this.restaurants = this.loadAll();
  },
  created () {

    this.token = this.$store.state.loginObject.userToken;
    this.userId = this.$store.state.loginObject.userId;
    this.success_code = this.code.codeNum.SUCCESS;
    this.financingList();
  },
  methods: {
    handleClose (done) {
      //console.log(this.msgObj.name)
      var _this = this
      this.$confirm('确认关闭？')
        .then(_ => {
          this.closemediumDialog()
        })
        .catch(_ => { });
    },
    //添加人员
    findAllUser (data) {
      if (data.length == 0) {
        this.findFlag = false;
        this.findState = {};
        this.checkState = {};
        if(this.user_num == 1){
          this.msgObj.principal = '';
          this.principalmsg = '';
          this.findUserObj = []
        }else{
          this.search_form.principal = '';
          this.customer = '';
          this.findUserObjM = []
        }
        return
      }
      this.deployObj = data;
      this.deployObj.forEach(v => {
        v.uniqueKey = 'user' + v.userId
      })
      if (this.user_num == 1) {
        this.deployObj = data;
        this.msgObj.principal = this.deployObj[0].name;
        this.principalmsg = this.deployObj[0].userId;
        this.findFlag = false;
        this.findState = {};
        this.checkState = {};
        this.findUserObj = data
      } else {
        this.deployObj = data;
        this.search_form.principal = this.deployObj[0].name;
        this.customer = this.deployObj[0].userId;
        this.findFlag = false;
        this.findState = {};
        this.checkState = {};
        this.findUserObjM = data
      }

    },
    // statesboxs(data){
    //     console.log(data);
    //     this.deployObj = data;
    //     if(this.user_num == 1){
    //         this.deployObj = data;
    //         this.msgObj.principal = this.deployObj[0].name;
    //         this.principalmsg = this.deployObj[0].id;
    //     }else{
    //         this.deployObj = data;
    //         this.search_form.principal = this.deployObj[0].name;
    //         this.customer = this.deployObj[0].id;
    //     }
    // },
    // 选择用户
    optUser (num) {
      this.user_num = num;
      this.findFlag = true;
      this.findState = { state: 0 };
      this.checkState = { state: 1 };
      if (!this.search_form.principal) {
        this.findUserObjM = []
      }
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
    handleClick (row) {
      var ids = 3;
      row.crmType = 3
      var customObj = { id: ids, row: JSON.stringify(row) };
      this.$store.commit("customObj", customObj)
      this.$router.push({ path: '/customdetails', query: { ctype: 3 } })
      //
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
      console.log(val);
      var kk = [];
      for (var i = 0; i < this.multipleSelection.length; i++) {

        kk.push(this.multipleSelection[i].id)
        console.log(this.idsdelete)
      }
      this.idsdelete = kk;
    },
    // 确定删除
    deletessure () {
      var datas = {
        data: {
          ids: this.idsdelete
        },
        token: this.token,
        userId: this.userId

      }
      var _this = this;
      this.$post('/info/crm/Intermediary/delete', datas).then((response) => {
        // _this.deletes = false;
        // _this.$message({
        //     message: '删除成功',
        //     type: 'success'
        // });
        // _this.financingList();
        if (response.code == _this.success_code) {
          _this.deletes = false;
          _this.$message({
            message: '删除成功',
            type: 'success'
          });
          _this.financingList();
        } else {
          _this.$message(response.msg);
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    // 是否选择一条数据
    handleAllDelete () {
      if (this.multipleSelection.length > 0) {
        this.deletes = true;
      } else {
        this.$message({
          message: '请选择一条数据',
          type: 'warning'
        });
      }
    },
    // 查询
    searchBtn () {
      // var data = this.search_form;
      // this.financingList(this.search_form.name,this.search_form.abbreviation,this.search_form.type,this.search_form.principal)
      this.currentPage = 1;
      this.financingList()

    },
    // 重置
    resetBtn () {
      this.search_form = {
        name: '',
        abbreviation: '',
        type: '',
        principal: '',
      };
      this.customer = ''
      //this.financingList();

    },
    //新增中介机构
    newProFn () {
      this.dialogVisible = true;
      this.handleNewProData();
      // 取出保存的草稿
      let draft = this.$utils.getDraft('financing', false)
      // 如果没有草稿，设置定时器，返回
      if (!draft) {
        this.setTimer()
        return
      }
      // 有草稿，展示提示弹窗
      this.$confirm('是否载入上次保存的草稿?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 回显草稿数据
        this.msgObj = { ...this.msgObj, ...draft }
        this.setTimer()
        console.log(111)
      }).catch(() => {
        console.log(33)
        closeOnClickModal = false;
        this.setTimer()
      })
    },
    /**
* 设置定时器：每5秒保存一次表单数据
*/
    setTimer () {
      // 启动定时器，每5000ms保存一次草稿
      this.newProjectDialogTimer = setInterval(() => {
        this.handleDraftData()
      }, 5000)
    },
    handleDraftData () {
      let data = {
        name: this.msgObj.name, //机构名称
        abbreviation: this.msgObj.abbreviation, //机构简介
        contact: this.msgObj.contact, //机构联系人
        //principal: this.principalmsg,//客户负责人
        telephone: this.msgObj.telephone,//联系电话
        email: this.msgObj.email,//邮箱
        fax: this.msgObj.fax,//传真
        postcode: this.msgObj.postcode,//邮编
        address: this.msgObj.address,//办公地址
        website: this.msgObj.website,//机构网址
        introduction: this.msgObj.introduction,//机构简介
        remarks: this.msgObj.remarks,//备注
      }
      this.$utils.saveDraft('financing', data, false)
    },
    closemediumDialog () {
      this.handleDraftData()
      this.dialogVisible = false;
      this.findUserObj = []
      this.findUserObjM = []
      clearInterval(this.newProjectDialogTimer)
    },
    handleNewProData () {
      this.msgObj.name = ''; //机构名称：
      this.msgObj.abbreviation = '';//机构简称：
      this.msgObj.type = ''; //机构类型：
      this.msgObj.contact = '';//机构联系人：
      this.msgObj.principal = '';//客户负责人
      this.msgObj.telephone = '';//联系电话
      this.msgObj.email = '';//邮箱
      this.msgObj.fax = '';//传真
      this.msgObj.postcode = '';//邮编
      this.msgObj.address = '';//办公地址：
      this.msgObj.website = '';//机构网址：
      this.msgObj.introduction = '';//机构简介：
      this.msgObj.remarks = '';//备注
    },
    // 分页
    onPageChange (currentPage) {
      this.currentPage = currentPage;
      this.financingList()
      console.log(this.currentPage)  //点击第几页

    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.financingList();
    },
    handleExport () {//导出表格
      console.log(this.multipleSelection)
      if (this.multipleSelection.length > 0) {
        var exportdata = [];
        for (var i = 0; i < this.multipleSelection.length; i++) {
          console.log(this.multipleSelection[i].id)
          exportdata.push(this.multipleSelection[i])
        }
        console.log(exportdata)
        var params = {// 参数
          token: this.token,
          userId: this.userId,
          data: exportdata
        };
        this.$store.commit("export", { url: "/info/crm/exportIntermediary", data: exportdata });
      } else {
        this.$message({
          message: '请选择一条数据',
          type: 'warning'
        });
      }
    },
    // 列表数据
    financingList () {
      // console.log(currentPage)
      // if(currentPage==undefined || currentPage == ""){
      //     currentPage=0
      // }
      // if(currentPageval==undefined || currentPageval == ""){
      //     currentPageval=10
      // }
      var data = {
        token: this.token,
        userId: this.userId,
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        data: {
          name: this.search_form.name,
          abbreviation: this.search_form.abbreviation,
          type: this.search_form.type,
          principal: this.customer,
        }

      }
      this.$post('/info/crm/Intermediary', data).then((response) => {
        // console.log(response.data)
        if(response.code != this.success_code) {
          this.$message.error(response.msg)
          return
        }
        if(response.data.pageNum > response.data.pages) {
          this.currentPage = response.data.pages;
          this.financingList();
          return
        }
        this.tableData = response.data.list;
        this.dataTotal = response.data.total;
      }).catch(function (error) {
        console.log(error);
      });

    },
    //保存
    saveMsg () {
      if (this.msgObj.name == "" || this.msgObj.name == undefined || this.msgObj.name == null) {
        this.$message.error('机构名称内容不能为空');
        return;
      }
      if (this.msgObj.abbreviation == "" || this.msgObj.abbreviation == undefined || this.msgObj.abbreviation == null) {
        this.$message.error('机构简称内容不能为空');
        return;
      }
      if (this.msgObj.type == "" || this.msgObj.type == undefined || this.msgObj.type == null) {
        this.$message.error('机构类型内容不能为空');
        return;
      }
      // if(this.msgObj.status == "" || this.msgObj.status == undefined || this.msgObj.status == null){
      //     this.$message.error('合作状态内容不能为空');
      //     return;
      // }
      if (this.msgObj.contact == "" || this.msgObj.contact == undefined || this.msgObj.contact == null) {
        this.$message.error('机构联系人内容不能为空');
        return;
      }
      if (this.msgObj.principal == "" || this.msgObj.principal == undefined || this.msgObj.principal == null) {
        this.$message.error('客户负责人内容不能为空');
        return;
      }
      if (this.msgObj.telephone == "" || this.msgObj.telephone == undefined || this.msgObj.telephone == null) {
        this.$message.error('联系电话内容不能为空');
        return;
      }
      // if (this.msgObj.telephone == "" || this.msgObj.telephone == undefined || this.msgObj.telephone == null) {
      //     this.$message.error('联系电话不能为空');
      //     return;
      // } else if (!(/^[0-9]+.?[0-9]*$/.test(this.msgObj.telephone))) {
      //     this.$message.error('联系电话有误，请重填');
      //     return;
      // }
      if (this.msgObj.email == "" || this.msgObj.email == undefined || this.msgObj.email == null) {
        this.$message.error('邮箱内容不能为空');
        return;
      } else if (!this.$utils.testEmail(this.msgObj.email)) {
        this.$message.error('请输入正确格式');
        return;
      }

      // if(!(/^1[34578]\d{9}$/.test(this.msgObj.telephone))){
      //     this.$message.error("联系电话有误，请重填");
      //     return false;
      // }

      // 邮编验证
      // if (this.msgObj.postcode != "") {
      //   if (!(/^[1-9][0-9]{5}$/.test(this.msgObj.postcode))) {
      //     this.$message.error("邮编有误，请重填");
      //     return false;
      //   }
      // }
      //传真
      if (this.msgObj.fax != "") {
        if (!(/^((([+]?\d{2}-)?0\d{2,3}-\d{7,8})|(([+]?\d{2}-)?(\d{2,3}-)?([1][3,4,5,7,8][0-9]\d{8})))$/.test(this.msgObj.fax))) {
          this.$message.error("传真有误，请重填");
          return false;
        }
      }
      // var prostate = this.msgObj.status;
      //     if( prostate == "初步洽谈"){
      //         this.msgObj.status = 1002
      //         console.log(this.msgObj.status)
      //     }else if(prostate == "达成合作"){
      //         this.msgObj.status = 1003
      //     }else if(prostate == "协议签署"){
      //         this.msgObj.status = 1004
      //     }

      var protype = this.msgObj.type;
      console.log(protype)
      if (protype == "会计师事务所") {
        this.msgObj.type = 1056
        console.log(this.msgObj.type)
      } else if (protype == "律师事务所") {
        this.msgObj.type = 1057
      } else if (protype == "资产评估机构") {
        this.msgObj.type = 1058
      } else if (protype == "信用评级机构") {
        this.msgObj.type = 1059
      } else if (protype == "券商机构") {
        this.msgObj.type = 1060
      }
      var addObj = {
        token: this.token,
        userId: this.userId,
        data: {
          //id: this.tableData.length + 1,
          //pro_code: '荣大科技',
          name: this.msgObj.name, //机构名称
          abbreviation: this.msgObj.abbreviation, //机构简介
          type: this.msgObj.type, //机构类型
          // status: this.msgObj.status, //合作状态
          contact: this.msgObj.contact, //机构联系人
          principal: this.principalmsg,//客户负责人
          telephone: this.msgObj.telephone,//联系电话
          email: this.msgObj.email,//邮箱
          fax: this.msgObj.fax,//传真
          postcode: this.msgObj.postcode,//邮编
          address: this.msgObj.address,//办公地址
          website: this.msgObj.website,//机构网址
          introduction: this.msgObj.introduction,//机构简介
          remarks: this.msgObj.remarks,//备注
        }
      };
      var _this = this;
      this.$post('/info/crm/Intermediary/add', addObj).then((response) => {
        if (response.code == _this.success_code) {
          _this.dialogVisible = false;
          _this.findUserObj = []
          _this.findUserObjM = []
          // 保存成功，关闭弹窗，关闭定时器
          _this.closemediumDialog()
          // 保存成功，清空草稿数据
          _this.$utils.removeDraft('financing', false)
          _this.$message({
            message: '新增成功',
            type: 'success'
          });
          _this.financingList();
        } else {
          _this.$message(response.msg);
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    //模糊搜索
    // querySearch(queryString, cb) {
    //     var restaurants = this.restaurants;
    //     var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
    //     // 调用 callback 返回建议列表的数据
    //     cb(results);
    // },
    // createFilter(queryString) {
    //     return (restaurant) => {
    //         return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
    //     };
    // },

  }
}

</script>

<style scoped lang="scss" type="text/css">
.zhonjieparents .financing {
  position: relative;
  background: #fff;
  .el-breadcrumb {
    line-height: 46px;
    padding-left: 10px;
    //   margin-left: 10px;
  }
  // .finance_tit{
  //         padding-bottom: 10px;
  //         border-bottom: 14px solid #f0f2f5;
  //         font-size: 20px;
  //         font-weight: bold;
  //         padding-left: 10px;
  //       .el-button{
  //         float:right;
  //         margin-right:20px;
  //       }
  //       span{
  //         float:left;
  //         color:#333;
  //         font-size:20px;
  //         line-height:32px;
  //         // margin-left:10px;
  //       }
  // }
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
    //   padding-bottom:20px;
    .el-form-item {
      float: left;
      margin-right: 20px;
      margin-bottom: 15px;
      height: 40px;
      .el-input {
        width: 217px;
      }
      .inline-input {
        width: 217px;
      }
      .el-select {
        width: 217px;
      }
    }
    .el-button {
      float: left;
      //   margin-left:20px;
      margin-top: 0px;
    }
  }
  .el-pagination {
    margin-top: 20px;
    text-align: right;
    margin-right: 40px;
  }
  .func_btn {
    width: 200px;
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
<style>
.zhonjieparents .headersBox .el-button+.el-button {
    margin-left: 5px;
}
.zhonjieparents .financing .table_box {
  padding: 0 10px;
  box-sizing: border_box;
}
.zhonjieparents .financing .el-dialog {
  text-align: left;
}
.zhonjieparents .financing .el-textarea {
  width: 580px;
}
.zhonjieparents .financing .el-dialog__footer {
  text-align: right;
  margin-right: 40px;
}
.zhonjieparents .financing .dialog_tit {
  font-size: 16px;
  font-weight: 600;
}
.zhonjieparents .financing .el-scrollbar__wrap {
  overflow-x: hidden;
}
.zhonjieparents .financing .cell .el-button--text {
    padding: 0;
}
.zhonjieparents .pro_table td {
  /* height: 20px!important; */
  /* padding: 2px 0px!important; */
}
.zhonjieparents .financing .el-dialog__header {
  text-align: center;
  color: #333!;
  border-bottom: 1px solid #e6e6e6;
}

.zhonjieparents .financing .el-button:focus,
.el-button:hover {
  /* color: #606266;
    border-color: #dcdfe6;
    background-color: #fff; */
}

.zhonjieparents .financing .el-button--medium {
  padding: 12px 20px !important;
}
.zhonjieparents .financing .shanchutankuang .el-dialog .el-dialog__header {
  border-bottom: 1px solid #fff !important;
  text-align: left !important;
  font-size: 18px;
  color: #303133;
}
.zhonjieparents .financing .shanchutankuang .el-dialog .el-dialog__footer {
  margin-right: 0px;
}
.zhonjieparents .financing .shanchutankuang .el-dialog__body {
  text-align: left;
}

.zhonjieparents
  .financing
  .shanchutankuang
  .el-dialog
  .el-dialog__footer
  .dialog-footer
  .el-button {
  padding: 9px 15px;
  font-size: 12px;
  border-radius: 3px;
}
</style>
