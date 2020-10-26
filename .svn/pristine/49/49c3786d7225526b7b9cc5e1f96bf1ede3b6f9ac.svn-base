<template>
  <div class="naruralparents nature-client">
      <div class="naturlson">
      <el-breadcrumb separator="/">
          <el-breadcrumb-item>客户管理</el-breadcrumb-item>
          <el-breadcrumb-item>自然人客户</el-breadcrumb-item>
      </el-breadcrumb>

    <div class="headersBox finance_tit">
      <div class="headersL">
        <span class="headers_clearFix_title">自然人客户</span>
      </div>
      <div class="headersR">
        <el-button type="primary" @click="handleExport" v-if="$utils.checkSystemPermission('crm_financing_export')">导出</el-button>
        <el-button type="primary" @click="handleAllDelete" v-if="$utils.checkSystemPermission('crm_financing_del')">删除</el-button>
        <el-button type="primary" @click="newProFn" icon="el-icon-plus"  v-if="$utils.checkSystemPermission('crm_financing_add')">新增自然人客户</el-button>
      </div>
    </div>

      <!-- <el-row class="finance_tit" style="position: relative;">
          <span>自然人客户</span>
          <el-button @click="newProFn" style="position: absolute;top: -11px;right: 7px;" icon="el-icon-plus" type="primary" v-if="$utils.checkSystemPermission('crm_financing_add')">新增自然人客户</el-button>
      </el-row> -->

      <div class="query-box" v-on:keyup.enter="searchBtn">
        <el-form ref="form" :model="search_form" :inline="true"  class="form_box clearfix">
          <el-form-item label="客户名称：">
            <el-input v-model="search_form.name" placeholder="请输入客户名称"></el-input>
          </el-form-item>
          <el-form-item label="客户负责人：">
            <!-- <el-input v-model="search_form.principal" placeholder="请输入客户负责人"></el-input> -->
            <el-input v-model="search_form.principal" class="fl" placeholder="请输入客户负责人" disabled="disabled" :customer="customer"></el-input>
            <el-button type="primary" size="small" @click="optUser(2)" class="fl" style="margin-left: 0px;height: 40px;margin-top: 0px;">选择人员</el-button>
          </el-form-item>
          <el-form-item label="客户类型：">
            <el-select v-model="search_form.type" placeholder="请选择客户类型" clearable>
              <el-option v-for="item in selectStateListType" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户状态：">
            <el-select v-model="search_form.status" placeholder="请选择客户状态" clearable>
              <el-option v-for="item in selectStateListState" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="所属行业：">
                <el-select v-model="msgObj.industry_one" placeholder="请选择所属行业" clearable  @change="selectRoleChange"  >
                    <el-option v-for="item in selectStateListtwo" :key="item.id" :lable="item.id" :value="item.name"></el-option>
                </el-select>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="searchBtn">查询</el-button>
            <el-button  @click="resetBtn" icon="el-icon-refresh">重置</el-button>
          </el-form-item>

        </el-form>
      </div>
      <el-table :data="tableData" fit show-header style="width: 100%" :header-cell-style="{background:'#FAFAFA',color:'#000'}" class="pro_table" @selection-change="handleSelectionChange">
              <el-table-column type="selection"></el-table-column>
              <el-table-column prop="uid" label="客户编码" align="center" min-width="100">
                   <template slot-scope="scope">
                        <p :title="scope.row.uid" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.uid}}</p>
                    </template>
              </el-table-column>
              <el-table-column prop="name" label="客户名称" align="center" min-width="100">
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
              <el-table-column prop="typeName" label="客户类型" align="center" min-width="100">
                   <template slot-scope="scope">
                        <p :title="scope.row.typeName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.typeName}}</p>
                    </template>
              </el-table-column>
              <el-table-column prop="statusName" label="客户状态" align="center" min-width="100">
                   <template slot-scope="scope">
                        <p :title="scope.row.statusName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.statusName}}</p>
                    </template> </el-table-column>
              <!-- <el-table-column prop="industry_one" label="所属行业" align="center"></el-table-column> -->
              <!-- <el-table-column prop="dept_id" label="所属部门" align="center"> </el-table-column> -->
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
                  <!-- <router-link to="/customdetails/2"><el-button type="text">编辑</el-button></router-link> -->
                <!-- <el-tooltip class="item" effect="dark" content="编辑" placement="top"> -->
                        <el-button class="pv-0" type="text"
                        @click="handleClick(scope.row)"
                        v-if="$utils.checkSystemPermission('crm_financing_edit')"
                        title="详情"><i class="icon-operate-btn iconfont wenzhang"></i></el-button>
                <!-- </el-tooltip> -->
                </template>
              </el-table-column>
          </el-table>
      <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="dataTotal" :pageSize="pageSize" :page-sizes="pageSizes" :current-page="currentPage" @current-change="onPageChange" @size-change="handleSizeChange">
      </el-pagination>
      <div class="func_btn">
          <!-- <el-button type="primary" @click="handleExport" v-if="$utils.checkSystemPermission('crm_financing_export')">导出</el-button>
          <el-button @click="handleAllDelete" v-if="$utils.checkSystemPermission('crm_financing_del')">删除</el-button> -->
      </div>
      <!--弹框-->
      <el-dialog title="新增自然人客户" :visible.sync="dialogVisible" width="790px" :close-on-click-modal="false" :before-close="handleClose">
          <span class="dialog_tit">客户信息</span>
          <div style="height:550px;">
              <el-scrollbar style="height:100%">
                  <el-form ref="form" :model="msgObj" label-width="120px" class="form_box clearfix">
                      <el-form-item label="客户中文名：" :rules="[{required:true}]">
                          <el-input v-model="msgObj.name" placeholder="请输入关键词"  maxlength="10"></el-input>
                      </el-form-item>
                      <el-form-item label="客户英文名：">
                          <el-input v-model="msgObj.englishName" placeholder="请输入关键词" maxlength="100"></el-input>
                      </el-form-item>
                      <el-form-item label="客户国籍：">
                          <!-- <el-select v-model="msgObj.nationality" placeholder="请选择客户国籍" clearable  @change="selectRoleChange">
                              <el-option v-for="item in selectStateList" :key="item.id" :lable="item.id" :value="item.name"></el-option>
                          </el-select> -->
                        <el-select v-model="msgObj.nationality" placeholder="请选择客户国籍" clearable>
                            <el-option v-for="item in selectStateListcountrt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="客户学历：">
                          <!-- <el-select v-model="msgObj.education" placeholder="请选择客户学历" clearable  @change="selectRoleChange">
                              <el-option v-for="item in selectStateList" :key="item.id" :lable="item.id" :value="item.name"></el-option>
                          </el-select> -->
                        <el-select v-model="msgObj.education" placeholder="请选择客户学历" clearable>
                            <el-option v-for="item in selectStateListcollecg" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="客户性别：" :rules="[{required:true}]">
                          <el-radio-group v-model="msgObj.sex">
                              <el-radio :label="0">男</el-radio>
                              <el-radio :label="1">女</el-radio>
                          </el-radio-group>
                      </el-form-item>
                      <el-form-item label="出生日期：" :rules="[{required:true}]">
                          <!-- <el-date-picker  v-model="msgObj.birthdate" type="date"  placeholder="选择日期"></el-date-picker> -->
                         <el-date-picker
                            v-model="msgObj.birthdate"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            @focus="$utils.handleTimeFocus">
                        </el-date-picker>
                      </el-form-item>
                      <el-form-item label="身份证号码：" :rules="[{required:true}]">
                          <el-input v-model="msgObj.identityCard" placeholder="请输入身份证号码" maxlength="18"></el-input>
                      </el-form-item>
                      <el-form-item label="客户类型：" :rules="[{required:cusTypeIsMumstFill}]">
                        <el-select v-model="msgObj.type" placeholder="请选择客户类型" clearable>
                            <!-- <el-option v-for="item in selectStateListType" :key="item.value" :label="item.label" :value="item.value"></el-option> -->
                            <el-option v-for="item in selectStateListType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="联系电话：" :rules="[{required:true}]">
                          <el-input v-model="msgObj.telephone" placeholder="请输入联系电话" maxlength="50"></el-input>
                      </el-form-item>
                      <el-form-item label="邮箱：" :rules="[{required:true}]">
                          <el-input v-model="msgObj.email" placeholder="请输入邮箱" maxlength="50"></el-input>
                      </el-form-item>
                      <el-form-item label="邮编：">
                          <el-input v-model="msgObj.postcode" @input="msgObj.postcode=msgObj.postcode.replace(/[^\d\.]/g,'')" placeholder="请输入邮编" maxlength="6"></el-input>
                      </el-form-item>
                      <el-form-item label="客户状态：" :rules="[{required:true}]">
                        <el-select v-model="msgObj.status" placeholder="请选择客户状态" clearable>
                            <el-option v-for="item in selectStateListState" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="客户负责人：" :rules="[{required:true}]">
                            <el-input v-model="msgObj.principal" class="fl" placeholder="请输入客户负责人" disabled="disabled" :customeradd="customeradd"></el-input>
                            <el-button type="primary" size="small" @click="optUser(1)" class="fl" style="margin-left: 0px;height: 40px;margin-top: 0px;">选择人员</el-button>
                          <!-- <el-input v-model="msgObj.principal" placeholder="请输入客户负责人"></el-input> -->
                            <!-- <div style="width:300px;border:1px solid #3333;display:inline-block;border-radius:5px;">
                                <span v-for="item in  deployObj" class="role_btn">{{item.name}}</span>
                            </div>
                            <el-button size="small" type="primary" @click="optUser" class="opt_btn" style="margin-left:0px;margin-right:3px;">选择用户</el-button> -->
                            <!-- <span v-for="item in  appointObj" class="role_btn">{{item.name}}</span> -->
                      </el-form-item>
                      <el-form-item label="地址：" style="margin-top:10px;">
                          <el-input type="textarea" :rows="2"  v-model.trim="msgObj.address" placeholder="请输入地址" maxlength="100"></el-input>
                      </el-form-item>
                      <el-form-item label="备注：" style="margin-top:10px;">
                          <el-input type="textarea" :rows="2"  v-model.trim="msgObj.remarks" placeholder="请输入备注" maxlength="2000"></el-input>
                      </el-form-item>
                  </el-form>
              </el-scrollbar>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button size="medium" @click="closemediumDialog">取 消</el-button>
            <el-button size="medium" type="primary" @click="saveMsg">保 存</el-button>
        </span>
      </el-dialog>
      </div>
    <!-- 删除弹框 -->
    <div class="shanchutankuang">
    <el-dialog
        title="提示"
        :close-on-click-modal="false"
        :visible.sync="deletes"
        width="22%">
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
     <!-- 重命名提示弹框 -->
     <el-dialog
        title="自然人重名提示"
        :visible.sync="duplication"
        :close-on-click-modal="false"
        width="22%">
        <div class="clearfix">
              <span>当前已存在<i style="color:#0061A9">&nbsp;&nbsp;{{datarename.length}}&nbsp;&nbsp;</i>个名称为<i style="color:#0061A9">&nbsp;&nbsp;{{renamehave}}&nbsp;&nbsp;</i>身份证与当前填写身份证一致的自然人客户<i style="color:#0061A9">&nbsp;{{renamehave}}&nbsp;</i>,该客户创建人为<i style="color:#0061A9" >&nbsp;&nbsp;{{str}}</i>，是否创建同名新客户？客户编码将作为该客户唯一标识</span>
         </div>
        <span slot="footer" class="dialog-footer">
            <el-button size="medium" type="primary" @click="createCompany">创建新客户</el-button>
            <el-button size="medium" type="" @click="duplication = false">取消</el-button>
        </span>
    </el-dialog>
    <!-- <frame-work v-if="flag" :peodatas='peodatas'  v-on:statesbox='statesboxs' :radioUser="1"></frame-work> -->
    <!--:findUserObj="user_num === 1 ? findUserObj : findUserObjM"-->
    <fintall-deptuser :findFlagShow.sync="findFlag" v-on:findAllUser="findAllUser"
                      :findUserObj="user_num === 1 ? findUserObj : findUserObjM"
                      :findState="findState" :checkState="checkState"></fintall-deptuser>
  </div>
</template>

<script>
// import frameWork from '@/components/select_box/frameworkpeo'
import fintallDeptuser from '@/components/select_box/findAllDeptUserSingleNew'
  export default{
    name: 'natural',
    components: {
    //frameWork,
    fintallDeptuser
},
    data () {
      return {
        findUserObj: [],
        findUserObjM: [],
          duplication:false,
        //添加人员
        findFlag:false,
        findState:{},
        checkState:{},
        token:'',
        userId:'',
        success_code:'',
        //客户负责人的声明
        customer:'',
        customeradd:'',
        flag:false,
        userId:'',
            flag:false,
            peodatas:'',
         deployObj:[
            {name:''},
        ],
        table_title: this.common.commonObjFn(),
        deletes:false,
        search_form:{
          name: '',
          principal: '',
          type: '',
          status: ''
        },
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
        //客户学历
        selectStateListcollecg:[
            {
                value: 1019,
                label: '本科'
            },
            {
                value: 1020,
                label: '硕士'
            },
            {
                value: 1021,
                label: '博士'
            },
            {
                value: 1022,
                label: '其他'
            }
        ],
        // 客户类型
        selectStateListType: [
            {
                value: 1006,
                label: '潜在客户'
            },
            {
                value: 1007,
                label: '已投客户'
            }
        ],
        // 客户国籍
        selectStateListcountrt:[
            {
                value: 1024,
                label: '埃及'
            },
            {
                value: 1025,
                label: '爱尔兰'
            },
            {
                value: 1026,
                label: '奥地利'
            },
            {
                value: 1027,
                label: '澳大利亚'
            },
                        {
                value: 1028,
                label: '巴西'
            },
            {
                value: 1029,
                label: '波兰'
            },
            {
                value: 1030,
                label: '德国'
            },
            {
                value: 1031,
                label: '俄国'
            },
                        {
                value: 1032,
                label: '法国'
            },
            {
                value: 1033,
                label: '芬兰'
            },
            {
                value: 1034,
                label: '韩国'
            },
            {
                value: 1035,
                label: '荷兰'
            },
            {
                value: 1036,
                label: '加拿大'
            },
                        {
                value: 1037,
                label: '美国'
            },
            {
                value: 1038,
                label: '尼日利亚'
            },
            {
                value: 1039,
                label: '挪威'
            },
            {
                value: 1040,
                label: '葡萄牙'
            },
            {
                value: 1041,
                label: '日本'
            },
                        {
                value: 1042,
                label: '瑞国'
            },
            {
                value: 1043,
                label: '瑞士'
            },
            {
                value: 1044,
                label: '苏格兰'
            },
            {
                value: 1045,
                label: '泰国'
            },
            {
                value: 1046,
                label: '威尔士'
            },
            {
                value: 1047,
                label: '西班牙'
            },
            {
                value: 1048,
                label: '希腊'
            },
            {
                value: 1049,
                label: '新西兰'
            },
            {
                value: 1050,
                label: '以色列'
            },
                        {
                value: 1051,
                label: '意大利'
            },
            {
                value: 1052,
                label: '印度'
            },
            {
                value: 1053,
                label: '英国'
            },
            {
                value: 1054,
                label: '中国'
            }
        ],
        tableData: [],
        multipleSelection: [],
        pageSize:10,
        pageSizes: [10,20,50,100],    //每页显示数量
        currentPage: 1,  //当前页
        dataTotal: 0,    //总量

          dialogVisible: false, //弹框
          msgObj:{
              name: '',
              englishName: '',
              nationality: '',
              education: '',
              sex: '',
              birthdate: '',
              identityCard: '',
              type: '',
              telephone: '',
              email: '',
              postcode: '',
              status: '',
              principal: '',
              address: '',
              remarks: '',
          },
          user_num:'',
          idsdelete:'',
          str:"",
          newProjectDialogTimer:null,
          datarename:[],
          falgrename:true,
        renamehave:'',
        renamecreat:'',
        datarenameperson:[],
        quchonRename:[],
        cusTypeIsMumstFill: true//新增自然人客户时客户类型是否为必填项
      }
    },
    mounted(){

    },
    created () {

        this.token = this.$store.state.loginObject.userToken;
        this.userId = this.$store.state.loginObject.userId;
        this.success_code = this.code.codeNum.SUCCESS;
        this.naturalList();
        this.getIsMustFill();
    },
    methods:{
        //点击关闭
        handleClose(done) {
            //console.log(this.msgObj.name)
            var _this = this
            this.$confirm('确认关闭？')
                .then(_ => {
                    this.closemediumDialog()
                })
                .catch(_ => {});
        },
         //添加人员
          findAllUser(data){
            console.log(data, 5555)
            if(data.length == 0){
              this.findFlag = false;
              this.findState = {};
              this.checkState = {};
              if(this.user_num == 1){
                this.msgObj.principal = '';
                this.customeradd = '';
                this.findUserObj = []
              }else{
                this.search_form.principal = '';
                this.customer = '';
                this.findUserObjM = []
              }
                return
            }
            this.deployObj = data;
            data.forEach(v => {
                v.uniqueKey = 'user' + v.id
            })
            if(this.user_num == 1){
                this.msgObj.principal = this.deployObj[0].name;
                this.customeradd = this.deployObj[0].userId;
                this.findFlag = false;
                this.findState = {};
                this.checkState = {};
                this.findUserObj = data
            }else{
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
        //         this.customeradd = this.deployObj[0].id;
        //     }else{
        //         this.deployObj = data;
        //         this.search_form.principal = this.deployObj[0].name;
        //         this.customer = this.deployObj[0].id;
        //     }
        // },
        // 选择用户
        optUser(num){
            this.user_num = num;
            this.findFlag = true;
            this.findState = {state:0};
            this.checkState = {state:1};
            if (!this.search_form.principal) {
              this.findUserObjM = []
            }
            console.log(this.findUserObjM, num)
        },
        handleClick(row){
            console.log(row)
            var ids = 2;
            console.log(ids)
            row.crmType = 2;
            var customObj = {id:ids,row: JSON.stringify(row)};
            console.log(customObj)
            this.$store.commit("customObj",customObj)
            this.$router.push({path: '/customdetails',query:{ctype : 2}})
            //
        },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        //console.log(val);
            var kk = [];
            for(var i=0; i< this.multipleSelection.length; i++){
                kk.push(this.multipleSelection[i].id)
                //console.log(this.idsdelete)
            }
            this.idsdelete = kk;
      },
      // 确定删除
        deletessure(){
            var datas = {
                data:{
                    ids:this.idsdelete
                },
                token:this.token,
                userId:this.userId,

            }
            var _this = this;
            this.$post('/info/crm/Individual/delete', datas).then((response)=> {
                // _this.deletes = false;
                // _this.$message({
                //     message: '删除成功',
                //     type: 'success'
                // });
                // _this.naturalList();
                if(response.code == _this.success_code){
                    _this.deletes = false;
                    _this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    _this.naturalList();
                }else{
                    _this.$message.error(response.msg);
                }
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
        //新增
        newProFn(){
           this.dialogVisible = true;
           this.falgrename = true;
            this.handleNewProData();
            // 取出保存的草稿
            let draft = this.$utils.getDraft('natural', false)
            // 如果没有草稿，设置定时器，返回
            if(!draft){
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
                this.msgObj = {...this.msgObj, ...draft}
                console.log(this.msgObj)
                this.setTimer()
            }).catch(() => {
                // closeOnClickModal = false;
                this.setTimer()
            })
        },
                /**
     * 设置定时器：每5秒保存一次表单数据
     */
        setTimer() {
        // 启动定时器，每5000ms保存一次草稿
            this.newProjectDialogTimer = setInterval(()=>{
                this.handleDraftData()
            }, 5000)
        },
        handleDraftData(){
            let data = {
                    name: this.msgObj.name, //客户名称
                    englishName: this.msgObj.englishName, //客户英文名称
                    identityCard: this.msgObj.identityCard,//身份证号码
                    telephone: this.msgObj.telephone,//联系电话
                    email:this.msgObj.email,//邮箱
                    postcode:this.msgObj.postcode, //邮编
                    address: this.msgObj.address,//地址
                    remarks: this.msgObj.remarks,//备注
            }
            this.$utils.saveDraft('natural', data, false)
        },
         closemediumDialog(){
             this.handleDraftData()
            this.dialogVisible = false;
            this.findUserObj = []
            this.findUserObjM = []
            clearInterval(this.newProjectDialogTimer)
        },
         handleNewProData(){
             this.msgObj.name = ''; //客户中文名：
            this.msgObj.englishName = '';//客户英文名：
            this.msgObj.nationality = ''; //客户国籍
            this.msgObj.education = ''; //客户学历
            this.msgObj.sex = ''; //客户性别：
            this.msgObj.birthdate = '';//出生日期：
            this.msgObj.identityCard = '';//身份证号码：
            this.msgObj.type = '';//客户类型：
            this.msgObj.telephone = '';//联系电话：
            this.msgObj.email = '';//邮箱
            this.msgObj.postcode = '';//邮编
            this.msgObj.status = '';//客户状态
            this.msgObj.principal = '';//客户负责人
            this.msgObj.remarks = '';//备注
            this.msgObj.address= '';//地址
        },
      // 查询
      searchBtn(){
        // var data = this.search_form;
        // this.naturalList(this.search_form.name,this.search_form.principal,this.search_form.type,this.search_form.status)
        this.currentPage = 1;
        this.naturalList();
      },
      // 重置
      resetBtn(){
        this.search_form = {
            name: '',
            principal: '',
            type: '',
            status: '',
        };
        this.customer = ''
        //this.naturalList()
      },
      // 分页
      onPageChange(currentPage) {
        this.currentPage = currentPage;
         this.naturalList()
      },
      handleSizeChange(val) {
       // console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.naturalList()
      },
    // 列表数据
    naturalList(search_form,currentPage,currentPageval){
        // console.log(currentPage)
        // if(currentPage==undefined || currentPage == ""){
        //     currentPage=0
        // }
        // if(currentPageval==undefined || currentPageval == ""){
        //     currentPageval=10
        // }
        var data={
            token:this.token,
            userId:this.userId,
            pageNo: this.currentPage,
            pageSize: this.pageSize,
            data: {
                name: this.search_form.name,
                principal: this.customer,
                type: this.search_form.type,
                status: this.search_form.status
            }

        }
        this.$post('/info/crm/Individual', data).then((response)=> {
            //console.log(response.data)
            if(response.code != this.success_code) {
                this.$message.error(response.msg)
                return
            }
            if(response.data.pageNum > response.data.pages) {
                this.currentPage = response.data.pages;
                this.naturalList();
                return
            }
            this.tableData = response.data.list;
            this.dataTotal = response.data.total;
        }).catch(function(error) {
            console.log(error);
        });

    },
        handleExport(){//导出表格
            //console.log(this.multipleSelection)
            if(this.multipleSelection.length > 0) {
                var exportdata = [];
                for(var i =0; i<this.multipleSelection.length; i++){
                    //console.log(this.multipleSelection[i].id)
                    exportdata.push(this.multipleSelection[i])
                }
                //console.log(exportdata)
                var params = {// 参数
                    token:this.token,
                    userId:this.userId,
                    data: exportdata
                };
                this.$store.commit("export", { url: "/info/crm/exportIndividual", data: exportdata });
            }else{
                this.$message({
                    message: '请选择一条数据',
                    type: 'warning'
                });
            }
        },
        //创建新客户
        createCompany(){
            this.falgrename = false;
            this.saveMsg();
            this.duplication = false;
            //this.dialogVisible = false;
        },
        getIsMustFill() {//获取新增自然人客户时客户类型是否为必填项
            let data = {
                token: this.token,
                userId: this.userId,
                data: {
                    tableId: 3//固定为3
                }
            }
            this.$post('/sys/interface/enableState', data).then((response)=> {
                if(this.code.codeNum.SUCCESS == response.code) {
                    let data =  response.data;
                    this.cusTypeIsMumstFill = data[0].enableState == 1 ? true : false;
                }
            }).catch(function(error) {

            });
        },
        //保存
        saveMsg(){
            if(this.msgObj.name == "" || this.msgObj.name == undefined || this.msgObj.name == null){
                this.$message.error('客户中文名内容不能为空');
                return;
            }
              if(this.msgObj.sex+"" == "" || this.msgObj.sex == undefined || this.msgObj.sex == null){
                this.$message.error('客户性别为必选');
                return;
            }
            if(this.msgObj.birthdate == "" || this.msgObj.birthdate == undefined || this.msgObj.birthdate == null){
                this.$message.error('客户出生日期不能为空');
                return;
            }
            // console.log(this.msgObj.sex)
            // console.log(this.msgObj.sex+"" == "")
            // console.log(this.msgObj.sex == undefined)
            // console.log(this.msgObj.sex == null)
            // console.log(this.msgObj.sex == "" || this.msgObj.sex == undefined || this.msgObj.sex == null)

            if (this.msgObj.identityCard == "" || this.msgObj.identityCard == undefined || this.msgObj.identityCard == null) {
                this.$message.error('客户身份证号不能为空');
                return;
            }else if(!(/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this.msgObj.identityCard))){
                this.$message.error("客户身份证号错误");
                return false;
            }
            if(this.cusTypeIsMumstFill){
                if(this.msgObj.type == "" || this.msgObj.type == undefined || this.msgObj.type == null){
                    this.$message.error('客户类型内容不能为空');
                    return;
                }
            }
            if(this.msgObj.telephone == "" || this.msgObj.telephone == undefined || this.msgObj.telephone == null){
                this.$message.error('联系电话不能为空');
                return;
            }

            // if (this.msgObj.telephone == "" || this.msgObj.telephone == undefined || this.msgObj.telephone == null) {
            //     this.$message.error('联系电话不能为空');
            //     return;
            // } else if (!(/^[0-9]+.?[0-9]*$/.test(this.msgObj.telephone))) {
            //     this.$message.error('联系电话有误，请重填');
            //     return;
            // }
            //console.log(this.msgObj.telephone)
            if (this.msgObj.email == "") {
                this.$message.error('邮箱内容不能为空');
                return;
            } else if (!this.$utils.testEmail(this.msgObj.email)) {
                this.$message.error('邮箱格式错误');
                return;
            }
            if(this.msgObj.status == "" || this.msgObj.status == undefined || this.msgObj.status == null){
                this.$message.error('客户状态内容不能为空');
                return;
            }
            if(this.msgObj.principal == "" || this.msgObj.principal == undefined || this.msgObj.principal == null){
                this.$message.error('客户负责人内容不能为空');
                return;
            }


            // 邮编验证
            // if (this.msgObj.postcode != "") {
            //     if(!(/^[1-9][0-9]{5}$/.test(this.msgObj.postcode))){
            //         this.$message.error("邮编有误，请重填");
            //         return false;
            //     }
            // }
            var statuscus = this.msgObj.status;
            if( statuscus == "初步洽谈"){
                this.msgObj.status == 1002
            }else if(statuscus == "达成合作"){
                this.msgObj.status == 1003
            }else if(statuscus == "协议签署"){
                this.msgObj.status == 1004
            }

            var typecus = this.msgObj.type;
            if( typecus == "潜在客户"){
                this.msgObj.type == 1006
            }else if(typecus == "已投客户"){
                this.msgObj.type == 1007
            }
            //客户国籍
            var statuscus1 = this.msgObj.nationality;
            if( statuscus1 == "埃及"){
                this.msgObj.nationality == 1024
            }else if(statuscus1 == "爱尔兰"){
                this.msgObj.nationality == 1025
            }else if(statuscus1 == "奥地利"){
                this.msgObj.nationality == 1026
            }else if(statuscus1 == "澳大利亚"){
                this.msgObj.nationality == 1027
            }else if(statuscus1 == "巴西"){
                this.msgObj.nationality == 1028
            }else if(statuscus1 == "波兰"){
                this.msgObj.nationality == 1029
            }else if(statuscus1 == "德国"){
                this.msgObj.nationality == 1030
            }else if(statuscus1 == "俄国"){
                this.msgObj.nationality == 1031
            }else if(statuscus1 == "法国"){
                this.msgObj.nationality == 1032
            }else if(statuscus1 == "芬兰"){
                this.msgObj.nationality == 1033
            }else if(statuscus1 == "韩国"){
                this.msgObj.nationality == 1034
            }else if(statuscus1 == "荷兰"){
                this.msgObj.nationality == 1035
            }else if(statuscus1 == "加拿大"){
                this.msgObj.nationality == 1036
            }else if(statuscus1 == "美国"){
                this.msgObj.nationality == 1037
            }else if(statuscus1 == "尼日利亚"){
                this.msgObj.nationality == 1038
            }else if(statuscus1 == "挪威"){
                this.msgObj.nationality == 1039
            }else if(statuscus1 == "葡萄牙"){
                this.msgObj.nationality == 1040
            }else if(statuscus1 == "日本"){
                this.msgObj.nationality == 1041
            }else if(statuscus1 == "瑞国"){
                this.msgObj.nationality == 1042
            }else if(statuscus1 == "瑞士"){
                this.msgObj.nationality == 1043
            }else if(statuscus1 == "苏格兰"){
                this.msgObj.nationality == 1044
            }else if(statuscus1 == "泰国"){
                this.msgObj.nationality == 1045
            }else if(statuscus1 == "威尔士"){
                this.msgObj.nationality == 1046
            }else if(statuscus1 == "西班牙"){
                this.msgObj.nationality == 1047
            }else if(statuscus1 == "希腊"){
                this.msgObj.nationality == 1048
            }else if(statuscus1 == "新西兰"){
                this.msgObj.nationality == 1049
            }else if(statuscus1 == "以色列"){
                this.msgObj.nationality == 1050
            }else if(statuscus1 == "意大利"){
                this.msgObj.nationality == 1051
            }else if(statuscus1 == "印度"){
                this.msgObj.nationality == 1052
            }else if(statuscus1 == "英国"){
                this.msgObj.nationality == 1053
            }else if(statuscus1 == "中国"){
                this.msgObj.nationality == 1054
            }
            //客户学历
            var typecus1 = this.msgObj.education;
            if( typecus1 == "本科"){
                this.msgObj.education == 1019
            }else if(typecus1 == "硕士"){
                this.msgObj.education == 1020
            }else if(typecus1 == "博士"){
                this.msgObj.education == 1021
            }else if(typecus1 == "其他"){
                this.msgObj.education == 1022
            }
            var addObj = {
                token:this.token,
                userId:this.userId,
                data:{
                    //id: this.tableData.length + 1,
                    name: this.msgObj.name, //客户名称
                    englishName: this.msgObj.englishName, //客户英文名称
                    nationality: this.msgObj.nationality, //客户国籍
                    education: this.msgObj.education, //客户学历
                    sex: this.msgObj.sex, //客户性别
                    birthdate: this.msgObj.birthdate,//出生日期
                    identityCard: this.msgObj.identityCard,//身份证号码
                    type: this.msgObj.type,//客户类型
                    telephone: this.msgObj.telephone,//联系电话
                    email:this.msgObj.email,//邮箱
                    postcode:this.msgObj.postcode, //邮编
                    //industryOne: this.msgObj.industry_one,//所属行业
                    status: this.msgObj.status,//客户状态
                    principal:this.customeradd,//客户负责人
                    address: this.msgObj.address,//地址
                    remarks: this.msgObj.remarks,//备注
                    flag:this.falgrename  //判断是否重命名
                }
            };
            var _this = this;
            this.$post('/info/crm/Individual/add', addObj).then((response)=> {
               if(response.code == _this.success_code){
                    _this.dialogVisible = false;
                    _this.findUserObj = []
                    _this.findUserObjM = []
                     // 保存成功，关闭弹窗，关闭定时器
                    _this.closemediumDialog()
                    // 保存成功，清空草稿数据
                    _this.$utils.removeDraft('natural', false)
                    _this.$message({
                        message: '新增成功',
                        type: 'success'
                    });
                    _this.naturalList();
                }else if(response.code == -3507){
                    _this.duplication = true;
                    _this.datarename = response.data;
                    _this.renamehave = _this.datarename[0].name
                    for(var i=0; i< _this.datarename.length; i++){
                        console.log(_this.quchonRename)
                           _this.quchonRename.push(_this.datarename[i])
                            var resultcopy = [];
                            var objdeco = {};
                            console.log(_this.quchonRename)
                            //debugger;
                            for(var i =0; i<_this.quchonRename.length; i++){
                                if(!objdeco[_this.quchonRename[i].createByName]){
                                    resultcopy.push(_this.quchonRename[i]);
                                    objdeco[_this.quchonRename[i].createByName] = true;
                                }
                            }
                            console.log(resultcopy);
                            _this.datarenameperson = resultcopy;
                            var str = ''
                            response.data.map((x,idx)=>{
                               str += x.createByName +"、"
                            })
                            _this.str = str.substring(0,str.lastIndexOf('、'))
                            console.log(_this.datarenameperson )
                   }
                }else{
                    _this.$message(response.msg);
                }
            }).catch(function(error) {
                console.log(error);
            });
        },
    }
  }

</script>
<style>
.naruralparents .naturlson .el-button--medium{
    padding: 12px 20px!important;
}
</style>

<style scoped lang="scss" type="text/css">
 .naruralparents .naturlson{
    position:relative;
    background:#fff;
  .el-breadcrumb{
      line-height: 46px;
      padding-left: 10px;
    //   margin-left: 10px;
  }
  .finance_tit{
    // padding:10px 0;
    padding-bottom: 10px;
    border-bottom: 14px solid #f0f2f5;
    font-size: 20px;
    font-weight: bold;
    // padding-left: 10px;
    /*// margin:5px 0 19px;*/
  span{
    float:left;
    color:#333;
    font-size:20px;
    // line-height:32px;
    // margin-left:10px;
  }
  }
  .form_box{
    background:#fff;
    padding-top: 20px;
    padding-left:10px;
    // padding-bottom:20px;
  .el-form-item{
    float:left;
    margin-right:13px;
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
  .el-radio-group{
      width:217px;
      .el-radio{
          width:50px;
      }
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
.naruralparents .headersBox .el-button+.el-button {
    margin-left: 5px;
}
 .naruralparents .naturlson .table_box{
    padding:0 10px;
    box-sizing:border_box;
  }
  .naruralparents .naturlson .el-dialog{
      text-align: left;
  }
  .naruralparents .naturlson .el-textarea{
      width:580px;
  }
  .naruralparents .naturlson .el-dialog__footer{
      text-align: right;
      margin-right: 40px;
  }
  .naruralparents .naturlson .cell .el-button--text {
    padding: 0;
  }

  .naruralparents .naturlson .el-dialog__header{
      border-bottom: 1px solid #ddd;
      text-align: center;
  }

.naruralparents .naturlson .el-textarea .el-textarea__inner{
  resize: none;
}
  .naruralparents .naturlson .dialog_tit{
      font-size: 16px;
      font-weight: 600;
  }
  .naruralparents .naturlson .el-scrollbar__wrap {
      overflow-x: hidden;
  }
  .naruralparents .naturlson  .shanchutankuang .el-dialog .el-dialog__header{
      border-bottom:1px solid #fff!important;
      text-align: left!important;
      font-size: 18px;
      color: #303133;
  }
  .naruralparents .naturlson .shanchutankuang .el-dialog .el-dialog__footer{
      margin-right: 0px;
  }
  .naruralparents .naturlson .shanchutankuang .el-dialog__body{
      text-align: left;
  }

  .naruralparents .naturlson .shanchutankuang .el-dialog .el-dialog__footer .dialog-footer .el-button{
      padding: 9px 15px;
    font-size: 12px;
    border-radius: 3px;
  }
</style>
