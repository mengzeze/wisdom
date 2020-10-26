<template>
  <div class="mediumpanerts medium-client">
      <div class="mediuson">
      <el-breadcrumb separator="/">
          <el-breadcrumb-item>客户管理</el-breadcrumb-item>
          <el-breadcrumb-item>融资客户</el-breadcrumb-item>
      </el-breadcrumb>

    <div class="headersBox finance_tit">
      <div class="headersL">
        <span class="headers_clearFix_title">融资客户</span>
      </div>
      <!-- 导出删除新增按钮 -->
      <div class="headersR">
        <el-button type="primary" @click="handleExport" v-if="$utils.checkSystemPermission('crm_financing_export')">导出</el-button>
        <el-button type="primary" @click="handleAllDelete" v-if="$utils.checkSystemPermission('crm_financing_del')">删除</el-button>
        <el-button type="primary" @click="newProFn"  icon="el-icon-plus"  v-if="$utils.checkSystemPermission('crm_financing_add')">新增融资客户</el-button>
      </div>
    </div>
      <!-- <el-row class="finance_tit" style="position: relative;">
        <span>融资客户</span>
        <el-button @click="newProFn"  style="position: absolute;top: -11px;right: 7px;"  icon="el-icon-plus" type="primary" v-if="$utils.checkSystemPermission('crm_financing_add')">新增融资客户</el-button>
      </el-row> -->
        <div class="query-box" v-on:keyup.enter="searchBtn">
          <el-form ref="search_form" :model="search_form" :inline="true" class="form_box clearfix">
            <el-form-item label="客户名称：">
              <el-input v-model.trim="search_form.name" placeholder="请输入客户名称"></el-input>
            </el-form-item>
            <el-form-item label="客户负责人：">
              <el-input v-model="search_form.principal" class="fl" placeholder="请选择客户负责人" disabled="disabled" :customer="customer"></el-input>
              <el-button type="primary" size="small" @click="optUser(2)" class="fl" style="margin-left: 0px;height: 40px;margin-top: 0px;">选择人员</el-button>
            </el-form-item>
            <el-form-item label="客户类型：">
              <!-- <el-option v-for="item in selectStateListType" :key="item.value" :lable="item.label" :value="item.value"></el-option> -->
              <el-select v-model="search_form.type" placeholder="请选择客户类型" clearable >
                <el-option
                  v-for="item in selectStateListType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="客户状态：">
              <el-select v-model="search_form.status" placeholder="请选择客户状态" clearable >
                <el-option v-for="item in selectStateListState" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="行业（1级）：">
              <el-select name="province" class="classify" v-on:change="indexSelectsearch" v-model="search_form.indexIdsearch" clearable placeholder="请选择一级行业">
                <el-option  :value="item.id" v-for="item in primaryIndustry" :key="item.id">{{item.name}}</el-option>
              </el-select>
              <!-- <select name="province" id="province" class="classify" v-on:change="indexSelect01" v-model="indexId" placeholder="请选择一级行业">
                  <option :value="item.id" v-for="(item,index) in select01" :key="index">{{item.name}}</option>
              </select> -->
            </el-form-item>
            <el-form-item label="行业（2级）：">
              <el-select name="city" class="classify mt10" v-model="search_form.indexId2search" clearable placeholder="请选择二级行业">
                <el-option :value="k.name" v-for="k in secondaryIndustry" :key="k.name">{{k.name}}</el-option>
              </el-select>
              <!--二级菜单-->
              <!-- <select name="city" id="city" class="classify mt10" v-model="indexId2" placeholder="请选择一级行业">
                  <option :value="k.name" v-for="k in select02">{{k.name}}</option>
              </select> -->
            </el-form-item>
            <el-form-item>
              <el-button  type="primary" @click="searchBtn" icon="el-icon-search">查询</el-button>
              <el-button  @click="resetBtn" icon="el-icon-refresh">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
    <div class="table_box">
        <!-- <el-scrollbar style="height:90%"> -->
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
        <!-- <el-table-column prop="deptIdName" label="所属部门" align="center" :show-overflow-tooltip="true"> </el-table-column> -->
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
            <!-- <router-link to="/customdetails/1/scope.row"></router-link> -->
            <!-- <router-link to="/customdetails"><el-button type="text" @click="handleClick(scope.row)">编辑</el-button></router-link> -->
            <!-- :to="{path:'/Detail/ckmike', params:{name:'Lily'},query:{sex:'女'},props:{age:18}}" -->
            <!-- <el-tooltip class="item" effect="dark" content="编辑" placement="top"> -->
                <el-button class="pv-0" type="text"
                @click="handleClick(scope.row)"
                v-if="$utils.checkSystemPermission('crm_financing_edit')"
                title="详情"><i class="icon-operate-btn iconfont wenzhang"></i></el-button>
             <!-- </el-tooltip> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- </el-scrollbar> -->
    </div>
    <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="dataTotal" :pageSize="pageSize" :page-sizes="pageSizes" :current-page="currentPage" @current-change="onPageChange" @size-change="handleSizeChange">
    </el-pagination>
    <div class="func_btn">
      <!-- <el-button type="primary" @click="handleExport" v-if="$utils.checkSystemPermission('crm_financing_export')">导出</el-button>
      <el-button @click="handleAllDelete" v-if="$utils.checkSystemPermission('crm_financing_del')">删除</el-button> -->
    </div>
      <!--新增弹框-->
      <el-dialog title="新增客户" :visible.sync="dialogVisible" width="790px" :close-on-click-modal="false" :before-close="handleClose">
          <span class="dialog_tit">客户信息</span>
          <div style="height:550px;">
              <el-scrollbar style="height:100%">
                    <el-form ref="msgObj" :model="msgObj" label-width="120px" class="form_box clearfix">
                    <el-form-item label="客户名称：" :rules="[{required:true}]">
                        <el-input v-model.trim="msgObj.name" placeholder="请输入客户名称"  maxlength="50"></el-input>
                    </el-form-item>
                    <el-form-item label="客户简称：" :rules="[{required:true}]">
                        <el-input v-model="msgObj.abbreviation" placeholder="请输入客户简称"  maxlength="20"></el-input>
                    </el-form-item>
                    <el-form-item label="客户类型：" :rules="[{required:cusTypeIsMumstFill}]">
                        <!-- <el-select v-model="msgObj.type" placeholder="请选择客户类型" clearable  >
                            <el-option v-for="item in selectStateListType" :key="item.value" :lable="item.label" :value="item.value"></el-option>
                        </el-select> -->
                        <el-select v-model="msgObj.type" placeholder="请选择客户类型" clearable  >
                            <el-option v-for="item in selectStateListType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="客户状态：" :rules="[{required:true}]">
                        <el-select v-model="msgObj.status" placeholder="请选择客户状态" clearable  >
                            <!-- <el-option v-for="item in selectStateListState" :key="item.id" :lable="item.id" :value="item.name"></el-option> -->
                            <el-option
                            v-for="item in selectStateListState"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="行业（1级）：" :rules="[{required:true}]">
                         <!--一级菜单-->
                        <el-select name="province" id="province" class="classify" v-on:change="indexSelect01" v-model="msgObj.indexId" placeholder="请选择一级行业">
                            <el-option  :value="item.id" v-for="(item,index) in select01" :key="item.id">{{item.name}}</el-option>
                        </el-select>
                        <!-- <select name="province" id="province" class="classify" v-on:change="indexSelect01" v-model="indexId" placeholder="请选择一级行业">
                            <option :value="item.id" v-for="(item,index) in select01">{{item.name}}</option>
                        </select> -->
                        <!--二级菜单-->
                        <!-- <select name="city" id="city" class="classify mt10" v-model="indexId2">
                            <option value="选择二级菜单">选择二级菜单</option>
                            <option :value="k.id" v-for="k in select02">{{k.name}}</option>
                        </select> -->
                        <!-- <el-select v-on:change="indexSelect01" v-model="indexId" placeholder="请选择所属行业" clearable  >
                            <el-option :value="item.id" v-for="(item,index) in select01">{{item.name}}</el-option>
                        </el-select> -->
                    </el-form-item>
                    <el-form-item label="行业（2级）：" :rules="[{required:true}]">
                        <!--二级菜单-->
                        <el-select name="city" id="city" class="classify mt10" v-model="msgObj.indexId2" placeholder="请选择二级行业">
                            <el-option :value="k.name" v-for="k in select02" :key="k.name">{{k.name}}</el-option>
                        </el-select>
                        <!-- <select name="city" id="city" class="classify mt10" v-model="indexId2" placeholder="请选择二级行业">
                            <option :value="k.id" v-for="k in select02">{{k.name}}</option>
                        </select> -->
                        <!-- <el-select v-model="indexId2"  placeholder="请选择所属行业" clearable  >
                            <el-option :value="k.id" v-for="k in select02"  :key="k.value" :label="k.name">{{k.name}}</el-option>
                        </el-select> -->
                    </el-form-item>
                    <el-form-item label="成立时间：">
                        <!-- <el-date-picker  v-model="msgObj.foundingTime" type="date"  placeholder="选择日期"  ></el-date-picker> -->
                        <el-date-picker
                            v-model="msgObj.foundingTime"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            @focus="$utils.handleTimeFocus">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="上市板块：">
                        <el-select v-model="msgObj.ipo" placeholder="选择上市板块" clearable  >
                            <el-option
                            v-for="item in selectStateListipo"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="上市时间：">
                        <!-- <el-date-picker  v-model="msgObj.ipoTime" type="date"  placeholder="选择日期"  ></el-date-picker> -->
                        <el-date-picker
                            v-model="msgObj.ipoTime"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            @focus="$utils.handleTimeFocus">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="法人代表：">
                        <el-input v-model="msgObj.legalPerson" placeholder="请输入法人代表" maxlength="20"></el-input>
                    </el-form-item>
                    <el-form-item label="注册资本：">

                        <el-input v-model="msgObj.registeredCapital" placeholder="请输入注册资本" maxlength="50"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话：">
                        <el-input v-model="msgObj.telephone" placeholder="请输入联系电话" maxlength="50"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱：">
                        <el-input v-model="msgObj.email" placeholder="请输入邮箱"  maxlength="50"></el-input>
                    </el-form-item>
                    <el-form-item label="传真：">
                        <el-input v-model="msgObj.fax" placeholder="请输入传真"  maxlength="15"></el-input>
                    </el-form-item>
                    <el-form-item label="邮编：">
                        <el-input v-model="msgObj.postcode" @input="msgObj.postcode=msgObj.postcode.replace(/[^\d\.]/g,'')" placeholder="请输入邮编"  maxlength="6"></el-input>
                    </el-form-item>
                    <el-form-item label="客户负责人：" class="clearFix">
                        <el-input v-model="msgObj.principal" class="fl" placeholder="请输入客户负责人" disabled="disabled" :principalCust="principalCust"></el-input>
                        <el-button type="primary" size="small" @click="optUser(1)" class="fl" style="margin-left: 0px;height: 40px;margin-top: 0px;">选择人员</el-button>
                        <!-- <el-input v-model="msgObj.principal" placeholder="请输入客户负责人"  ></el-input> -->
                            <!-- <el-input v-for="item in  deployObj" v-model.trim="msgObj.principal" placeholder="请输入客户负责人" disabled="disabled"></el-input>
                            <el-button size="small" type="primary" @click="changePer" class="opt_btn">选择人员</el-button>  -->
                            <!-- <div style="width:300px;border:1px solid #3333;display:inline-block;border-radius:5px;">
                                <span v-for="item in  deployObj" class="role_btn" style="display:inline-block;height:25px;">{{item.name}}</span>
                            </div> -->
                            <!-- <el-button size="small" type="primary" @click="optUser" class="opt_btn" style="margin-left:0px;margin-right:3px;">选择用户</el-button> -->
                            <!-- <span v-for="item in  appointObj" class="role_btn">{{item.name}}</span> -->
                    </el-form-item>
                    <el-form-item label="公司网址：">
                        <el-input v-model="msgObj.website" placeholder="请输入公司网址"  maxlength="100"></el-input>
                    </el-form-item>
                    <el-form-item label="公司简介：" style="margin-top:10px;">
                        <el-input type="textarea" :rows="2"  v-model.trim="msgObj.introduction" placeholder="请输入公司简介"  maxlength="2000"></el-input>
                    </el-form-item>
                    <el-form-item label="经营范围：" style="margin-top:10px;" :rules="[{required:true}]">
                        <el-input type="textarea" :rows="2"  v-model.trim="msgObj.business" placeholder="请输入经营范围"  maxlength="2000"></el-input>
                    </el-form-item>
                    <el-form-item label="地址：" style="margin-top:10px;">
                        <el-input type="textarea" :rows="2"  v-model.trim="msgObj.address" placeholder="请输入地址"  maxlength="100"></el-input>
                    </el-form-item>
                    <el-form-item label="备注：" style="margin-top:10px;">
                        <el-input type="textarea" :rows="2"  v-model.trim="msgObj.remarks" placeholder="请输入备注"  maxlength="2000"></el-input>
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
    <div class="shanchutankuang">
          <!-- 删除弹框 -->
    <el-dialog
        title="提示"
        :close-on-click-modal="false"
        :visible.sync="deletes"
        width="22%">
         <div class="clearFix">
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
        title="融资机构重名提示"
        :close-on-click-modal="false"
        :visible.sync="duplication"
        width="22%">
        <div class="clearFix" :data="datarename">
              <span>当前已存在<i class="color-primary">&nbsp;&nbsp;{{datarename.length}}&nbsp;&nbsp;</i>个名称为<i class="color-primary">&nbsp;&nbsp;{{renamehave}}&nbsp;&nbsp;</i>的融资机构客户，客户创建人为<i class="color-primary" >&nbsp;&nbsp;{{str}}&nbsp;&nbsp;</i>，是否创建同名新客户？客户编码将作为该客户唯一标识</span>
         </div>
        <span slot="footer" class="dialog-footer">
            <el-button size="medium" type="primary" @click="createCompany">创建新客户</el-button>
            <el-button size="medium" type="" @click="duplication = false">取消</el-button>
        </span>
    </el-dialog>
    <!--选择人员-->
    <!-- <frame-work v-if="flag" :peodatas='peodatas'  v-on:statesbox='statesboxs' :radioUser="1"></frame-work> -->
    <!--:findUserObj="user_num == 1 ? findUserObj : findUserObjM"-->
    <fintall-deptuser :findFlagShow.sync="findFlag" v-on:findAllUser="findAllUser"
              :findUserObj="user_num == 1 ? findUserObj : findUserObjM"
              :findState="findState" :checkState="checkState"></fintall-deptuser>
  </div>
</template>

<script>
// import frameWork from '@/components/select_box/frameworkpeo'
import fintallDeptuser from '@/components/select_box/findAllDeptUserSingleNew'
// import $ from 'jquery'
export default{
    name: 'medium',
    components: {
        fintallDeptuser
    },
    data () {
        return {
            duplication:false,
            findFlag:false,
            findState:{},
            checkState:{},
            //添加人员
                // flag:false,
                // peodatas:'',
            select01: [],//获取的一级数组数据
            select02: [],//获取的二级数组数据
            indexId:'',//定义分类一的默认值
            indexId2:'',
            indexNum:0,//定义一级菜单的下标
            indexNum2:0,
            // 搜索的行业
            str:'',
            primaryIndustry: [],//获取的一级数组数据
            secondaryIndustry: [],//获取的二级数组数据
            indexNumsearch:0,//定义一级菜单的下标
            indexNum2search:0,
            table_title: this.common.commonObjFn(),
            search_form:{
                name: '',
                principal: '',
                type: '',
                status: '',
                indexId: '',
                indexId2:'',
                indexIdsearch:'',//定义分类一的默认值
                indexId2search:'',
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
                    value: 1065,
                    label:'科创版'
                },
                {
                    value: 1014,
                    label:'其他'
                }
            ],
            // 选择人员的值
            deployObj:[
                {name:''},
            ],
            // 表格数据
            tableData: [],
            datarename:[],
            multipleSelection: [],
            pageSize:10,
            pageSizes: [10,20,50,100],    //每页显示数量
            currentPage: 1,  //当前页
            dataTotal: 0,    //总量
            dialogVisible: false, //弹框
            msgObj:{
                //id:"",
                name: '',
                abbreviation: '',
                type: '',
                status: '',
                foundingTime: '',
                ipo: '',
                ipoTime: '',
                legalPerson: '',
                registeredCapital: '',
                telephone: '',
                email: '',
                fax: '',
                postcode: '',
                principal: '',
                website: '',
                introduction: '',
                business: '',
                remarks: '',
                address:'',
                indexId: '',
                indexId2:''
            },
            // pricipalsArray:[],
            user_num:'',
            idsdelete:[],
            exportData:[],
            customer:'',
            principalCust:'',
            // caogao:false, //草稿的弹框
            newProjectDialogTimer:null,
            falgrename:true,
            renamehave:'',
            renamecreat:'',
            datarenameperson:[],
            quchonRename:[],
            findUserObj: [],
            findUserObjM: [],
            cusTypeIsMumstFill: true,//新增融资客户时客户类型是否为必填项
        }
    },
    created () {
        // this.$router.push({path:'/customdetails/1/row', query:{row:row}})
        this.token = this.$store.state.loginObject.userToken;
        this.userId = this.$store.state.loginObject.userId;
        this.success_code = this.code.codeNum.SUCCESS;
        this.mediunList();  //列表的方法
        this.getIsMustFill();
    },
    mounted(){
        this.indusytryData()  //一级行业和二级行业的
        this.indusytryDatasearch()  //搜索的一级行业和二级行业
    },

    methods:{
        //点击关闭
        handleClose(done) {
            var _this = this
            this.$confirm('确认关闭？')
                .then(_ => {
                    this.closemediumDialog()
                })
                .catch(_ => {});
        },
         //添加人员
         findAllUser(data){
          console.log(data, 5)
            if(!data || !data.length){
              this.findFlag = false;
              this.findState = {};
              this.checkState = {};
              if (this.user_num == 1){
                this.findUserObj = []
                this.msgObj.principal = '';
                this.principalCust = '';
              }else {
                this.findUserObjM = []
                this.search_form.principal = '';
                this.customer = '';
              }
                return
            }
            this.deployObj = data;
            this.deployObj.forEach(v => {
                v.uniqueKey = 'user' + v.userId
            })
            if(this.user_num == 1){
                this.msgObj.principal = this.deployObj[0].name;
                this.principalCust = this.deployObj[0].userId;
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
        //     this.deployObj = data;
        //     console.log(this.deployObj)
        //     if(this.user_num == 1){
        //         this.deployObj = data;
        //         this.msgObj.principal = this.deployObj[0].name;
        //         this.principalCust = this.deployObj[0].id;
        //     }else{
        //         this.deployObj = data;
        //         this.search_form.principal = this.deployObj[0].name;
        //         this.customer = this.deployObj[0].id;
        //     }

        //     console.log(this.deployObj[0].id)
        // },

        // 选择用户
        optUser(num){
            this.user_num = num;
            this.findFlag = true;
            this.findState = {state:0};
            this.checkState = {state:1};
            console.log(num, this.findUserObjM)
            if (this.search_form.principal == '') {
              this.findUserObjM = []
            }
        },
        indexSelect(event){
            this.A = event.target.value;
            // console.log(this.A);
        },
        //点击行业出现数据
        indexSelect01(){
            let i = 0;
            for (i = 0;i<this.select01.length;i++) {
                if (this.select01[i].id == this.msgObj.indexId){
                    this.indexNum = i;
                    this.msgObj.indexId = this.select01[i].name
                    break
                }
            }
            this.select02 = this.select01[this.indexNum].childrens;
            this.msgObj.indexId2 = '';
        },
        // 行业的接口返回数据
        indusytryData(){
            var datas = {
                data:{

                },
                token:this.token,
                userId:this.userId

            }
            var _this = this;
             this.$post('/sys/Industry',datas).then((response)=> {
                _this.select01 = response.data;
                _this.indexSelect01(); //二级行业

            }).catch(function(error) {
                console.log(error);
            });
        },
        // 搜索点击行业出现一级行业
        indexSelectsearch(){
            let i = 0;
            for (i = 0;i<this.primaryIndustry.length;i++) {
                if (this.primaryIndustry[i].id == this.search_form.indexIdsearch){
                    this.indexNumsearch = i;
                    this.search_form.indexIdsearch = this.primaryIndustry[i].name
                    break
                }
            }
            this.secondaryIndustry = this.primaryIndustry[this.indexNumsearch].childrens;
            this.search_form.indexId2search = '';
        },
        // 搜索的二级行业
        indusytryDatasearch(){
            var datas = {
                data:{

                },
                token:this.token,
                userId:this.userId

            }
            var _this = this;
             this.$post('/sys/Industry',datas).then((response)=> {
                _this.primaryIndustry = response.data;
                _this.indexSelectsearch();


            }).catch(function(error) {
                console.log(error);
            });
        },
        //编辑跳转的点击事件
        handleClick(row){
            var ids = 1;
            row.crmType = 1;
            var customObj = {id:ids,row: JSON.stringify(row)};
            this.$store.commit("customObj",customObj)
            this.$router.push({path: '/customdetails',query:{ctype : 1}})
        },

        //获取选中项的数据
        handleSelectionChange(val) {
            this.multipleSelection = val;
            var kk = [];
            for(var i=0; i< this.multipleSelection.length; i++){
                kk.push(this.multipleSelection[i].id)
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
                userId:this.userId

            }
            var _this = this;
            this.$post('/info/crm/company/delete', datas).then((response)=> {
                if(response.code == _this.success_code){
                    _this.deletes = false;
                    _this.mediunList();
                    _this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                }else{
                    _this.$message(response.msg);
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

        // 查询
        searchBtn(){
            this.currentPage = 1;
            this.mediunList()
        },

        // 重置
        resetBtn(){
            this.search_form = {
                name: '',
                principal: '',
                type: '',
                status: '',
                indexIdsearch: '',
                indexId2search: ''
            };
            this.customer = '' // 重置客户负责人弹窗中的值
            // this.pricipalsArray = ''
            //this.mediunList();

        },

        // 列表数据
        mediunList(){
            var data={
                token:this.token,
                userId:this.userId,
                pageNo: this.currentPage,
                pageSize: this.pageSize,
                data: {
                    name: this.search_form.name,
                    principal: this.customer,
                    type: this.search_form.type,
                    status: this.search_form.status,
                    industryOne: this.search_form.indexIdsearch,
                    industryTwo: this.search_form.indexId2search
                }

            }
            this.$post('/info/crm/company', data).then((response)=> {
                //console.log(response.data)
                if(response.code != this.success_code) {
                    this.$message.error(response.msg)
                    return
                }
                if(response.data.pageNum > response.data.pages) {
                    this.currentPage = response.data.pages;
                    this.mediunList();
                    return
                }
                this.tableData = response.data.list;
                // this.msgObj.indexId = response.data.industryOne;
                // this.msgObj.indexId2 = response.data.industryTwo;
                this.dataTotal = response.data.total;
            }).catch(function(error) {
                console.log(error);
            });

        },
        //分页
        onPageChange(currentPage) {
            this.currentPage = currentPage;
            this.mediunList()
            //console.log(this.currentPage)  //点击第几页
        },
        // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange(val) {
            this.pageSize = val;
            this.mediunList()
        },
        //新增融资客户
        newProFn(){
            this.dialogVisible = true;
            this.falgrename = true;
            this.handleNewProData();
            // 取出保存的草稿
            let draft = this.$utils.getDraft('medium', false)
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
                console.log(111)
            }).catch(() => {
                console.log(33)
                //closeOnClickModal = false;
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
                abbreviation: this.msgObj.abbreviation, //客户简称
                legalPerson: this.msgObj.legalPerson,//法人代表
                registeredCapital: this.msgObj.registeredCapital,//注册资本
                telephone: this.msgObj.telephone,//联系电话
                email: this.msgObj.email,//邮箱
                fax: this.msgObj.fax,//传真
                postcode: this.msgObj.postcode,//邮编
                website: this.msgObj.website,//公司网址
                introduction: this.msgObj.introduction,//公司简介
                business: this.msgObj.business,//主营业务
                remarks: this.msgObj.remarks,//备注
                address:this.msgObj.address//地址
            }
            this.$utils.saveDraft('medium', data, false)
        },
        closemediumDialog(){
            this.handleDraftData()
            //this.$utils.saveDraft('medium', data, false)
            this.dialogVisible = false;
            this.findUserObj = []
            this.findUserObjM = []
            clearInterval(this.newProjectDialogTimer)
        },
        // 点击清空新增弹框数据
        handleNewProData(){
            this.msgObj.name = ''; //客户名称
            this.msgObj.abbreviation = '';//客户简称
            this.msgObj.type = ''; //客户类型
            this.msgObj.status = ''; //客户状态
            this.msgObj.indexId = ''; //所选行业（1级）
            this.msgObj.indexId2 = '';  //所选行业（2级）
            this.msgObj.foundingTime = ''; //成立时间
            this.msgObj.ipo = '';//上市板块
            this.msgObj.ipoTime = '';//上市时间
            this.msgObj.legalPerson = '';//法人代表
            this.msgObj.registeredCapital = '';//注册资本
            this.msgObj.telephone = '';//联系电话
            this.msgObj.email = '';//邮箱
            this.msgObj.fax = '';//传真
            this.msgObj.postcode = '';//邮编
            this.msgObj.principal = '';//客户负责人
            this.msgObj.website = '';//公司网址
            this.msgObj.introduction = '';//公司简介
            this.msgObj.business = '';//主营业务
            this.msgObj.remarks = '';//备注
            this.msgObj.address= '';//地址
        },
        //创建新客户
        createCompany(){
            this.falgrename = false;
            this.saveMsg();
            this.duplication = false;
            //this.dialogVisible = false;
        },
        getIsMustFill() {//获取新增融资客户时客户类型是否为必填项
            let data = {
                token: this.token,
                userId: this.userId,
                data: {
                    tableId: 2//固定为2
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
                this.$message.error('客户名称内容不能为空');
                return;
            }
            if(this.msgObj.abbreviation == "" || this.msgObj.abbreviation == undefined || this.msgObj.abbreviation == null){
                this.$message.error('客户简称内容不能为空');
                return;
            }
            if(this.cusTypeIsMumstFill){
                if(this.msgObj.type == "" || this.msgObj.type == undefined || this.msgObj.type == null){
                    this.$message.error('客户类型内容不能为空');
                    return;
                }
            }
            if(this.msgObj.status == "" || this.msgObj.status == undefined || this.msgObj.status == null){
                this.$message.error('客户状态内容不能为空');
                return;
            }
            if(this.msgObj.indexId == ""){
                this.$message.error('行业（1级）内容不能为空');
                return;
            }
            if(this.msgObj.indexId2 == ""){
                this.$message.error('行业（2级）内容不能为空');
                return;
            }
            if(this.msgObj.business == "" || this.msgObj.business == undefined || this.msgObj.business == null){
                this.$message.error('经营范围不能为空');
                return;
            }
            if (this.msgObj.email != "") {
                if (!this.$utils.testEmail(this.msgObj.email)) {
                    this.$message.error('邮箱格式错误');
                    return;
                }
            }
            // 联系电话验证
            const regularEx= /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
            const mobileEx = /^1[34578][0-9]{9}$/
            if(this.msgObj.telephone&& !(regularEx.test(this.msgObj.telephone) || mobileEx.test(this.msgObj.telephone)) ){
                this.$message.error("联系电话格式错误，请重填");
                return false;
            }
            // 手机号验证
            // if (this.msgObj.telephone != "") {
            //     if(!(/^[0-9]+.?[0-9]*$/.test(this.msgObj.telephone))){
            //         this.$message.error("联系电话有误，请重填");
            //         return false;
            //     }
            // }
            // if (this.msgObj.telephone != "") {
            //     if(!(/^1[34578]\d{9}$/.test(this.msgObj.telephone))){
            //         this.$message.error("联系电话有误，请重填");
            //         return false;
            //     }
            // }
            // 邮编验证
            // if (this.msgObj.postcode != "") {
            //     if(!(/^[1-9][0-9]{5}$/.test(this.msgObj.postcode))){
            //         this.$message.error("邮编有误，请重填");
            //         return false;
            //     }
            // }
            //传真
            if (this.msgObj.fax != "") {
                if(!(/^((([+]?\d{2}-)?0\d{2,3}-\d{7,8})|(([+]?\d{2}-)?(\d{2,3}-)?([1][3,4,5,7,8][0-9]\d{8})))$/.test(this.msgObj.fax))){
                    this.$message.error("传真有误，请重填");
                    return false;
                }
            }
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
            var iopmediu = this.msgObj.ipo;
            if( iopmediu == "未上市"){
                this.msgObj.ipo == 1009
            }else if(iopmediu == "主板"){
                this.msgObj.ipo == 1010
            }else if(iopmediu == "中小板"){
                this.msgObj.ipo == 1011
            }else if(iopmediu == "创业板"){
                this.msgObj.ipo == 1012
            }else if(iopmediu == "新三板"){
                this.msgObj.ipo == 1065
            }else if(iopmediu == "科创板"){
                this.msgObj.ipo == 1013
            }else if(iopmediu == "其他"){
                this.msgObj.ipo == 1014
            }
            var addObj = {
                token:this.token,
                userId:this.userId,
                data:{
                    name: this.msgObj.name, //客户名称
                    abbreviation: this.msgObj.abbreviation, //客户简称
                    type: this.msgObj.type, //客户类型
                    status: this.msgObj.status, //客户状态
                    industryOne:this.msgObj.indexId, //所选行业（1级）
                    industryTwo:this.msgObj.indexId2,  //所选行业（2级）
                    foundingTime: this.msgObj.foundingTime, //成立时间
                    ipo: this.msgObj.ipo,//上市板块
                    ipoTime: this.msgObj.ipoTime,//上市时间
                    legalPerson: this.msgObj.legalPerson,//法人代表
                    registeredCapital: this.msgObj.registeredCapital,//注册资本
                    telephone: this.msgObj.telephone,//联系电话
                    email: this.msgObj.email,//邮箱
                    fax: this.msgObj.fax,//传真
                    postcode: this.msgObj.postcode,//邮编
                    principal: this.principalCust,//客户负责人
                    website: this.msgObj.website,//公司网址
                    introduction: this.msgObj.introduction,//公司简介
                    business: this.msgObj.business,//主营业务
                    remarks: this.msgObj.remarks,//备注
                    address:this.msgObj.address,//地址
                    flag:this.falgrename  //判断是否重命名
                }
            };
            var _this = this;
            this.$post('/info/crm/company/add', addObj).then((response)=> {
                console.log(response)
                if(response.code == _this.success_code){
                    _this.dialogVisible = false;
                    _this.findUserObj = [] // 客户负责人 选中人员
                    _this.findUserObjM = [] // 客户负责人 选中人员
                    // 保存成功，关闭弹窗，关闭定时器
                    _this.closemediumDialog()
                    // 保存成功，清空草稿数据
                    _this.$utils.removeDraft('medium', false)
                    _this.$message({
                        message: '新增成功',
                        type: 'success'
                    });
                    _this.mediunList();

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
                            // console.log(_this.datarenameperson )
                            var str = ''
                            response.data.map((x,idx)=>{
                               str += x.createByName +"、"
                            })
                            _this.str = str.substring(0,str.lastIndexOf('、'))
                   }
                }else{
                    _this.$message(response.msg);
                }

            }).catch(function(error) {
                console.log(error);
            });
        },


          // 导出
        // handleExport(){
        //     if(this.multipleSelection.length > 0) {
        //         console.log(this.multipleSelection)
        //         var exportdata = [];
        //         for(var i =0; i<this.multipleSelection.length; i++){
        //             console.log(this.multipleSelection[i].id)
        //             exportdata.push(this.multipleSelection[i])
        //         }

        //         console.log(exportdata)
        //         var datas={
        //             token: "11",
        //             userId: 3,
        //             data: exportdata
        //         }


        //         var _this=this;
        //         // window.open()
        //         this.$post('/info/crm/exportCompany', datas).then((response)=> {
        //             console.log(response)
        //             // _this.tableData = response.data.list;
        //             // _this.dataTotal = response.data.total;
        //         }).catch(function(error) {
        //             console.log(error);
        //         });
        //     } else {
        //             this.$message({
        //             message: '请选择一条数据',
        //             type: 'warning'
        //         });
        //     }
        // }
            handleExport(){//导出表格
                //console.log(this.multipleSelection)
                if(this.multipleSelection.length > 0) {
                    var exportdata = [];
                    for(var i =0; i<this.multipleSelection.length; i++){
                        console.log(this.multipleSelection[i].id)
                        exportdata.push(this.multipleSelection[i])
                    }
                    //console.log(exportdata)
                    var params = {// 参数
                        token:this.token,
                        userId:this.userId,
                        data: exportdata
                    };
                    this.$store.commit("export", { url: "/info/crm/exportCompany", data: exportdata });
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
<style>

/* .financing .pro_table td{

    height: 20px!important;
    padding: 2px 0px!important;
}  */
.mediumpanerts .mediuson .el-select .el-input__inner{
    padding-right: 0px!important;
}
.mediumpanerts .mediuson .el-input--suffix .el-input__inner{
    padding-right: 0px!important;
}

.mediumpanerts .mediuson .el-button--medium{
    padding: 12px 20px!important;
}
.mediumpanerts .mediuson  .el-dialog__header{
      text-align: center!important;
      color:#333!important;
      border-bottom:1px solid #e6e6e6;
  }



</style>

<style scoped lang="scss" type="text/css">
.mediumpanerts .mediuson{
    position:relative;
    background:#fff;
  .el-breadcrumb{
      line-height: 46px;
      padding-left: 10px;
    //   margin-left: 10px;
      padding-top: 0px;
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
    margin-bottom: 10px;
    // padding-bottom:20px;
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
  }

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
</style>
<style>
.mediumpanerts .headersBox .el-button+.el-button {
    margin-left: 5px;
}

.mediumpanerts .mediuson .el-textarea .el-textarea__inner{
  resize: none;
}
  .mediumpanerts .mediuson .el-dialog{
      text-align: left;
  }
 .mediumpanerts .mediuson .el-textarea{
      width:580px;
  }
 .mediumpanerts .mediuson .el-dialog__footer{
      text-align: right;
      margin-right: 40px;
  }
 .mediumpanerts .mediuson .dialog_tit{
      font-size: 16px;
      font-weight: 600;
  }
  .mediumpanerts .mediuson .cell .el-button--text {
    padding: 0;
  }
   .mediumpanerts .mediuson .el-scrollbar__wrap {
      overflow-x: hidden;
  }

  .mediumpanerts .shanchutankuang .el-dialog .el-dialog__header{
      border-bottom:1px solid #fff!important;
      text-align: left!important;
      font-size: 18px;
      color: #303133;
  }
  .mediumpanerts .shanchutankuang .el-dialog .el-dialog__footer{
      margin-right: 0px;
  }
  .mediumpanerts .shanchutankuang .el-dialog__body{
      text-align: left;
  }

  .mediumpanerts .shanchutankuang .el-dialog .el-dialog__footer .dialog-footer .el-button{
      padding: 9px 15px;
    font-size: 12px;
    border-radius: 3px;
  }

</style>
