<template>
  <div class="processengine">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>流程引擎管理</el-breadcrumb-item>
      <el-breadcrumb-item>流程引擎</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="clearfix finance_tit">
      <div class="boxL clearfix">
        <div class="tit" v-show="!isResult">流程引擎</div>
        <div class="tit clearfix" v-show="isResult">
          <el-button circle @click="backBtn" class="iconfont leftarrow back_btn fl"></el-button>
          <p class="fl">流程引擎搜索结果</p>
        </div>
        <div class="header-btn clearfix">
          <el-button v-if="$utils.checkSystemPermission('bask_add_flow') && !isResult" @click="addProcess" type="primary" icon="el-icon-plus">新增流程</el-button>
          <el-button type="primary" @click="handleAllDelete">删除</el-button>
          <el-button type="primary" @click="handleAllCopy">复制</el-button>
          <el-button type="primary" @click="handleAllPaste" v-if="!isResult">粘贴</el-button>
        </div>
      </div>
    </el-row>
    <!-- 原版样式 -->
    <!-- <el-row class="clearfix finance_tit">
        <div class="boxL">
            <div>流程引擎</div>
        </div>
        <div class="header-btn">
          <el-button v-if="$utils.checkSystemPermission('bask_add_flow')" @click="addProcess"   type="primary" icon="el-icon-plus">新增流程</el-button>
          <el-input v-model="searchItem.search_cont" class="inline-input" placeholder="请输入流程名称" @input="searchBtn"></el-input>
        </div>
    </el-row> -->
    <el-container class="clearfix">
      <el-aside width="260px;" id="aside" v-if="!isResult">
        <!-- <el-scrollbar style="height:100%"> -->
          <div class="aside_box" style="height:100%">
            <!-- <ul class="type_list">
              <li v-for="(items,index) in processObj" :key="index">
                <div class="clearfix tit_box" @click="showCont(items,index)" :class="{ backgroundcolor:changeColor == index}">
                  <span class="span_type">{{items.procTypeName}}</span>
                </div>
              </li>
            </ul> -->
            <business-tree @method="handleMethods" :width="'260px'" :height="'auto'" :default="true"></business-tree>
          </div>
        <!-- </el-scrollbar> -->
      </el-aside>
      <el-main class="el_main_content" style="">
        <div class="ipt" v-on:keyup.enter="searchBtn" style="width: 100%">
          <el-form class="clearfix">
            <el-form-item label="流程名称：" class="fl">
              <el-input v-model="searchItem.search_cont" class="inline-input" placeholder="请输入内容"></el-input>
            </el-form-item>
            <!-- <el-form-item label="审批类型：" class="fl">
                <multiple-choice ref="examTypeEle" @changeData="examTypesChangeData" :selectData="searchData.examAllType"></multiple-choice>
            </el-form-item> -->
             <el-form-item label="审批类型：" class="business-select fl">
                <el-input v-model="searchItem.financingNamesearch" placeholder="请选择审批类型" class="" disabled style="width:200px;"></el-input>
                <el-button  @click="optType" type="primary" style="margin-left:-4px;">选择</el-button>
                </el-form-item>
            <el-form-item label="业务类型：" class="business-select fl">
                <el-input v-model="searchItem.financingName" placeholder="请选择业务类型" class="fin_inp" disabled></el-input>
                <el-button  @click="businessTypeSele" type="primary">选择</el-button>
            </el-form-item>
            <el-form-item label="状态：" class="fl">
                <multiple-choice ref="stateEle" @changeData="stateChangeData" :selectData="searchData.stateAll"></multiple-choice>
            </el-form-item>
            <el-form-item label="流程描述：" class="fl">
              <el-input v-model="searchItem.processDes" class="inline-input" placeholder="请输入关键词"></el-input>
            </el-form-item>
            <el-form-item label="创建时间：" class="fl">
              <date-range :date-start.sync="searchItem.starTime"
                        :date-end.sync="searchItem.endTime"
                        format="yyyy-MM-dd HH:mm:ss"></date-range>
            </el-form-item>
            <el-form-item label="项目阶段：" :title="searchItem.financingList.length == 0 ?'请先选择业务类型':(searchItem.financingList.length > 1 ? '请选择一个业务类型' : '')" class="fl">
                <el-select v-model="searchItem.stageId" placeholder="请选择项目阶段" clearable @change="selectStageChange" :disabled="searchItem.financingList.length != 1">
                    <el-option v-for="(item, index) in searchData.selectStageList" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <!-- <multiple-choice ref="proStageEle" @changeData="proStateChangeData" :selectData="searchData.selectStageList" disabled></multiple-choice> -->
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="searchBtn" class="fl">查询</el-button>
              <el-button @click="resetBtn" icon="el-icon-refresh" class="fl">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table style="margin-left: -10px;width: 100%" ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="{background:'#FAFAFA',color:'black',fontWeight:'bold'}" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column label="序号" type="index" width="55" align="center"></el-table-column>
          <el-table-column prop="procName" label="流程名称" align="center" min-width="50">
            <template slot-scope="scope">
              <p :title="scope.row.procName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"  v-if="!isResult">{{scope.row.procName}}</p>
              <p :title="scope.row.procName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" v-if="isResult" v-html="scope.row.procHighLightName"></p>
            </template>
          </el-table-column>
          <el-table-column prop="procTypeName" label="审批类型" align="center" min-width="50">
            <template slot-scope="scope">
              <p :title="scope.row.procTypeName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.procTypeName}}</p>
            </template>
          </el-table-column>
           <!-- && treeClickObj.fields.data.id !== -999 -->
          <el-table-column prop="finaTypeName" v-if=" !treeClickObj.type || treeClickObj.id == 'all'" label="业务类型" align="center" min-width="50">
            <template slot-scope="scope">
              <p :title="scope.row.finaTypeName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.finaTypeName}}</p>
            </template>
          </el-table-column>
           <!-- && treeClickObj.fields.data.id !== -999 -->
          <el-table-column prop="progStageName" v-if=" !treeClickObj.type || treeClickObj.id == 'all'" label="项目阶段" align="center" min-width="50">
            <template slot-scope="scope">
              <p :title="scope.row.progStageName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.progStageName}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="procDescr" label="流程描述" align="center" min-width="50">
            <template slot-scope="scope">
              <p :title="scope.row.procDescr" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"  v-if="!isResult">{{scope.row.procDescr}}</p>
              <p :title="scope.row.procDescr" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" v-if="isResult" v-html="scope.row.procHighLightDescr"></p>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center" min-width="50">
            <template slot-scope="scope">
              <p :title="scope.row.createTime" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.createTime}}</p>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center" min-width="50">
            <template slot-scope="scope">
              <span v-if="scope.row.actStatus == 0" style="color:#999;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" :title="scope.row.actStatusName">{{scope.row.actStatusName}}</span>
              <span v-if="scope.row.actStatus == 1" style="color:#27A700;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" :title="scope.row.actStatusName">{{scope.row.actStatusName}}</span>
              <span v-if="scope.row.actStatus == 2" style="color:#F5982A;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" :title="scope.row.actStatusName">{{scope.row.actStatusName}}</span>
              <span v-if="scope.row.actStatus == 3" style="color:#DC341D;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" :title="scope.row.actStatusName">{{scope.row.actStatusName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="procVersionNum" label="版本" width="55" align="center" min-width="50">
            <template slot-scope="scope">
              <p :title="scope.row.procVersionNum" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.procVersionNum}}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="200">
            <template slot-scope="scope">
              <div class="center">
                <span @click="handlePreview(scope.row)" title="预览" class="iconfont yulan icon-operate-btn"></span>
                <span @click="handleOpen(scope.row)" title="开启流程审批" class="icon-operate-btn iconfont duigou" v-if="scope.row.openAudit == 0 && (scope.row.newproject || scope.row.procTypeName == '文件修订审批' || scope.row.procTypeName == '底稿目录修订审批')"></span>
                <span @click="handleOpen(scope.row)" title="关闭流程审批" class="icon-operate-btn iconfont close" v-if="scope.row.openAudit == 1 && (scope.row.newproject  || scope.row.procTypeName == '文件修订审批' || scope.row.procTypeName == '底稿目录修订审批')"></span>
                <span @click="handleRelevance(scope.$index, scope.row,$event.target)" title="关联项目审批" class="icon-operate-btn iconfont guanlian" v-if="scope.row.relevProjAudit == 0 && scope.row.newproject"></span>
                <span @click="handleRelevance(scope.$index, scope.row,$event.target)" title="关闭关联项目审批" class="icon-operate-btn iconfont quxiaoguanlian" v-if="scope.row.relevProjAudit == 1 && scope.row.newproject"></span>
                <span @click="handleEdit(scope.$index, scope.row)" title="编辑" class="icon-operate-btn iconfont bianji2-copy"></span>
                <span @click="handleStart(scope.$index, scope.row,$event.target)" title="禁用" v-if="scope.row.actStatusId == 3" class="icon-operate-btn iconfont jinyong" :class="{'pointerevents': forbidden}"></span>
                <span @click="handleStart(scope.$index, scope.row,$event.target)" title="启用" v-if="scope.row.actStatusId == 2" class="icon-operate-btn iconfont qiyong-copy" :class="{'pointerevents': forbidden}"></span>
                <span @click="handleStart(scope.$index, scope.row,$event.target)" title="发布" v-if="scope.row.actStatusId == 1" class="icon-operate-btn iconfont fabu" :class="{'pointerevents': forbidden}"></span>
                <span @click="handleDelete(scope.$index, scope.row)" class="icon-operate-btn delete iconfont shanchu" title="删除"></span>

                <!-- <span @click="handleExport(scope.$index, scope.row)" class="tab_operation_export"  title="导出"></span> -->
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="dataTotal" :pageSize="pageSize" :page-sizes="pageSizes" :current-page="currentPage" @current-change="onPageChange" @size-change="handleSizeChange"></el-pagination>
        <div class="func_btn">
          <!-- 删除之前位置 -->
          <!-- <el-button  @click="handleAllDelete">删除</el-button> -->
        </div>
      </el-main>
    </el-container>
    <el-dialog :close-on-click-modal="false" :title="newProcessTitle" :visible.sync="dialogVisible" width="550px">
      <div class="form_box">
        <el-form ref="form" :model="add_form" label-width="100px" class="form_box clearfix">
          <!-- <el-form-item label="审批类型：" :rules="[{required: true}]">
            <el-select v-model="add_form.pro_type" placeholder="请选择" @change="formOption" :disabled="disabeld">
              <el-option v-for="(item, index) in add_form.options" :key="index" :label="item.procTypeName" :value="item.id"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="审批类型：">
              <el-input v-model="financingNameolg" placeholder="请选择审批类型" disabled ></el-input>
              <el-button  @click="changeFnolg" type="primary"  class="opt_btn" style="margin-left:-4px;">选择</el-button>
          </el-form-item>
          <el-form-item label="业务类型：" v-if="procTypeIds" :rules="[{required: true}]">
            <el-input v-model="add_form.pro_code" placeholder="请选择业务类型" disabled></el-input>
            <el-button type="primary" @click="changeFn" class="opt_btn">选择</el-button>
          </el-form-item>

          <div v-if="procTypeIds">
            <el-form-item label="项目阶段：" :rules="[{required: true}]" v-if="form_stage">
              <el-select v-model="add_form.progStage" placeholder="请选择" @change="stageProFn" :disabled="disabeld">
                <el-option v-for="(item, index) in add_form.stageOption" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <!-- <el-form-item label="key：" :rules="[{required: true}]">
                      <el-input v-model="add_form.procKey" placeholder="请输入10位英文字母" maxlength="10"></el-input>
                  </el-form-item> -->
          <el-form-item label="名称：" :rules="[{required: true}]">
            <el-input v-model="add_form.procName" placeholder="请输入关键字" maxlength="50" :disabled="disabeld"></el-input>
          </el-form-item>
          <el-form-item label="描述：">
            <el-input type="textarea" :row="4" resize="none" :disabled="disabeld" v-model="add_form.procDescr" placeholder="请输入关键字" maxlength="1000"></el-input>
          </el-form-item>
          <el-form-item label="流程：" v-if="editShow">
            <el-button type="primary" @click="handleFlowChart">编辑</el-button>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="dialogVisible = false">取 消</el-button>
        <el-button size="medium" type="primary" v-if="!editShow" @click="dialogVisibleFn">保存</el-button>
        <el-button size="medium" type="primary" v-if="editShow" @click="dialogVisibleFnSave">保存</el-button>
        <el-button size="medium" type="primary" v-if="editShow" @click="dialogVisibleFnClose">保存并关闭</el-button>
      </span>
    </el-dialog>
    <!--新增业务选择类型-->
        <!-- :isProcessengineClick="isProcessengineClick" -->

    <project-type
        v-if="typeFlag"
        :typeObj='typeObj'
        :state="state"
        v-on:typeProject='typeProject(1,arguments)'
        :optState="optState"></project-type>
    <el-dialog title="提示" :visible.sync="supplement" :close-on-click-modal="false" width="30%">
      <div class="tips-content">{{startUseTips}}</div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="supplement = false">取消</el-button>
        <el-button size="medium" type="primary" @click="gosupplement">{{errorTipsBtn}}</el-button>
      </span>
    </el-dialog>
    <!-- 选择业务类型 -->
    <project-type
        v-if="selectBusinessVisible"
        :singleSele="2"
        :isProcessengineClick="false"
        :typeObj='BusinessTypeList'
        :state="state"
        v-on:typeProject='typeProject(2,arguments)'
        @sendValueToParent="selectBusinessVisible = false"
        :optState="optState" :hasSelect="searchItem.financingList"></project-type>

    <preview-approval-message
            :previewApprovalShow.sync="previewApprovalShow"
            :columnData="columnData">
    </preview-approval-message>

        <!-- 新增审批类型 -->
    <back-approve v-if="typeFlagolg" :typeObjolg='typeObjolg' :stateolg="stateolg"  v-on:typeProjectolg='typeProjectolg(1,arguments)' :optStateolg="optStateolg"></back-approve>
    <!-- 选择审批类型 -->
    <back-approve v-if="selectBusinessVisibleback" :singleSele="2" :typeObjolg='BusinessTypeListback' :stateolg="stateolg" v-on:typeProjectolg='typeProjectolg(2,arguments)' @sendValueToParentback="projectTypeCloseback" :optStateolg="optStateolg" :hasSelect="searchItem.financingListback"></back-approve>
  </div>
</template>

<script>
import projectType from "@/components/dialogcommon/projecttype";
import previewApprovalMessage from "@/components/select_box/previewApprovalMessage"

//审批类型
import backApprove from "@/components/dialogcommon/backApprove";
export default {
  name: 'newprocess',
  components: {
    projectType,
    previewApprovalMessage,
    backApprove //选择审批类型
  },
  data () {
    return {
      //融资类型
      typeFlagolg:false,
      typeObjolg:[],
      optStateolg:'',
      stateolg:1,
      financingNameolg:'',
      financingIdolg:'',
      isPutong:false,
      isResult: false,
      searchItem: {//搜索条件
        search_cont: '',
        financingName: '',//业务类型
        financingNamesearch:'',
        // businessId: '', //搜索条件中用来获取阶段列表的业务类型id
        financingList: [],//业务类型列表
        financingListback:[],
        processDes: '',//流程描述
        starTime: '',//开始时间
        endTime: '',//结束时间
        stageName: '',//项目阶段
        stageId: ''
      },
      searchData: {
        examTypesSelected: [],//选中的审批类型
        examAllType: [],//调接口获取所有审批类型列表
        stateSelected: [],//选中的状态
        proStageSelected: [],//选中的项目阶段
        stateAll: [//所有状态
          { value: 0, label: '未发布' },
          { value: 1, label: '已发布' },
          { value: 3, label: '禁用中' },
          { value: 2, label: '启用中' },
        ],
        selectStageList: [],//项目阶段列表
      },
      tableData: [],
      forbidden: false,
      multipleSelection: [],
      dialogVisible: false,
      add_form: {
        pro_code: '',
        pro_type: '',
        procName: '',
        procDescr: '',
        //procKey:'',
        options: '',
        stageOption: '',
      },
      processObj: [],
      pageSize: 10,
      pageSizes: [10, 20, 50, 100],    //每页显示数量
      currentPage: 1,  //当前页
      dataTotal: 0,    //总量-页数

      procTypeId: '',
      procTypeIds: true,
      finaTypeId: '',
      form_stage: '',
      stageId: '',

      typeFlag: false,
      typeObj: [],
      state: 1,
      rowData: {},
      // newproject:false
      supplement: false,
      errorTipsBtn: '去补充',
      startUseTips: '',
      rowvalue: '',
      isProcessengineClick: true, // 是否在融资类型中对项目阶段限制
      newProcessTitle: "新建流程",
      editShow: false,
      processIds: [], // 复制数据的id集合
      rowDataEdit: {},
      editObj: {},
      procDeployId: "", // 看是否被引用为空没有被引用
      processId: "", // 流程的id
      disabeld: false, // 正在使用中的禁用状态
      closeShow: false,
      editId: '',
      selectBusinessVisible: false,//查询条件中的选择业务类型弹窗

      selectBusinessVisibleback:false,
      BusinessTypeListback: [],

      BusinessTypeList: [],
      previewApprovalShow: false,
      columnData: {},
      treeClickObj: {id: 'default'}
    }
  },
  mounted () {
    //查询流程列表
    this.findTable();
    //查询所有流程分类
    this.findType();
  },
  methods: {
    projectTypeClose(){
      this.selectBusinessVisible = false;
    },

    projectTypeCloseback(){
        this.selectBusinessVisibleback = false;
    },
    handleMethods(data){//点击左侧树
      this.treeClickObj = data;
      // console.log(this.treeClickObj, 'handleMethods')
      this.findTable()
    },
    backBtn(){
      this.treeClickObj = {id: 'default'};
      this.findTable()
      this.isResult = false;
    },
    handlePreview (row) {
      console.log(row, 363)
      this.previewApprovalShow = true
      this.columnData = {
        deploymentId: row.procDeployId,
        versionId: row.procVersionNum,
        modelId: row.actModelId,
        projectId: '',
        approvalType: row.procTypeId, // 审批类型id
        approvalTypeName: row.procTypeName, // 审批类型
        finaTypeName: row.finaTypeName, // 业务类型
        progStageName: row.progStageName // 当前阶段
      }
    },
    businessTypeSele(){//选择业务类型
      this.isProcessengineClick = false;
      this.$post("/info/project/getAllFinanceType").then((res => {
        if(res.code != this.code.codeNum.SUCCESS){
          this.$message.warning(res.msg)
          return
        }
        this.selectBusinessVisible = true;
        this.state = 2;
        this.BusinessTypeList = res.data;
        this.optState = {value:1};
      })).catch(err => console.log(err))
    },
    optType(){ //审批类型
      this.selectBusinessVisibleback = false;
      this.$post("/info/service/getUsableProcessType").then((res => {
        if(res.code != this.code.codeNum.SUCCESS){
          this.$message.warning(res.msg);
          return
        }
        this.selectBusinessVisibleback = true;
        console.log(this.selectBusinessVisibleback)
        this.stateolg = 2;
        this.BusinessTypeListback = res.data;
        this.optStateolg = {value:1};
      })).catch(err => console.log(err));
    },
    // 状态选择
    stateChangeData (arr) {
      this.searchData.stateSelected = arr.map(v => v.value);
    },
    // 审批类型选择
    examTypesChangeData (arr) {
      this.searchData.examTypesSelected = arr.map(v => v.value);
    },
    // 项目阶段选择
    proStateChangeData (arr){
      this.searchData.proStageSelected = arr.map(v => v.id);
    },
    selectStageChange (val){
        this.searchItem.stageId = val;
    },
    //查询流程列表
    findTable () {
      let finaTypeIds = [];
      let typeIds = [];
      let endDate = this.searchItem.endTime == '' ? '' : this.searchItem.endTime.substr(0,11) + '23:59:59';
      console.log('搜索',this.treeClickObj, this.searchItem.financingList)
      // 当点击是全部的时候, 查询时不带入查询的数据
      if (this.treeClickObj.label == '全部'){
          this.treeClickObj.id = 'default'
      }
      // 普通审批下的所有的类型不展示业务类型和项目阶段，需要字段区分
      if (this.treeClickObj && this.treeClickObj.fields && this.treeClickObj.fields.data && this.treeClickObj.fields.data.id <= 1 && this.treeClickObj.fields.data.typeId) {
        this.treeClickObj.type = true
      }
      if(this.treeClickObj.id == '' || this.treeClickObj.id == 'all'){//不是点击左侧目录树
        this.searchItem.financingList.forEach((obj)=>{
          finaTypeIds.push(obj.id)
        })
        if (this.searchItem.financingListback){
          this.searchItem.financingListback.forEach((obj)=>{
            typeIds.push(obj.id)
          })
        }
        // 项目类型点击
        if (this.treeClickObj.id == 'all') {
          this.treeClickObj.children.forEach((obj)=>{
            finaTypeIds.push(obj.id)
          })
        }
        //dataObj.data.procTypeIds = this.searchData.examTypesSelected;
        // dataObj.data.finaTypeIds = finaTypeIds;
        var dataObj = {
          pageSize: this.pageSize,
          pageNo: this.currentPage,
          data: {
            procName: this.searchItem.search_cont,//流程名称
            procTypeIds: typeIds,//审批类型
            finaTypeIds: finaTypeIds,//业务类型
            actStatuss: this.searchData.stateSelected,//状态
            procDescr: this.searchItem.processDes,//流程描述
            createStartTime: this.searchItem.starTime,
            createEndTime: endDate,
            progStageId: this.searchItem.stageId,//阶段id
          }
        };
         typeIds.length >= 1 ? dataObj.data.singleProcType = true : dataObj.data.singleProcType = false
      } else {//点击左侧目录树
        var dataObj = {
          pageSize: this.pageSize,
          pageNo: this.currentPage,
          data: {
            procName: '',//流程名称
            procTypeIds: [],//审批类型
            finaTypeIds: [],//业务类型
            actStatuss: [],//状态
            procDescr: '',//流程描述
            createStartTime: '',
            createEndTime: '',
            progStageId: '',//阶段id
          }
        };
        finaTypeIds.push(this.treeClickObj.id)


        if(this.treeClickObj.id == 'default'){//左侧全部
            dataObj.data.procTypeIds = [];
            dataObj.data.finaTypeIds = [];
        }else  if(this.treeClickObj.dataType && this.treeClickObj.dataType === 1){
            typeIds.push(this.treeClickObj.fields.data.typeId)
            dataObj.data.finaTypeIds = []
            dataObj.data.procTypeIds = typeIds
        }else {//业务类型
          dataObj.data.procTypeIds = [];
          dataObj.data.finaTypeIds = finaTypeIds;
        }
      }
      console.log(dataObj)
      this.$post("/info/service/getProcessList", dataObj).then((response => {
        var data = response.data;
        if (response.code == this.code.codeNum.SUCCESS) {
          console.log(data.list);
          console.log(response.data)
          if (response.data.pageNum > response.data.pages && response.data.pages != 0) {
            this.currentPage = response.data.pages;
            this.findTable();
            return
          }
          this.tableData = data.list;
          this.dataTotal = data.total;
          this.currentPage = data.pageNum;
          this.pageSize = data.pageSize;
          for (var i = 0; i < data.list.length; i++) {
            // console.log(data.list[i].procTypeName)
            if (data.list[i].procTypeName == "新建项目审批") {
              this.tableData[i].newproject = true;
            } else {
              this.tableData[i].newproject = false;
            }

          }

        } else if (response.code == this.code.codeNum.RESULT_EMPTY) {
          this.tableData = [];
        } else if (response.code == this.code.codeNum.SYSTEM_ERROR) {
          this.$message(response.msg);
        }
      })).catch(error => {
        console.log(error);
      });
    },
    //查询所有流程分类
    findType () {
      this.$post("/info/service/selectProcessTypeAll").then((response => {
        if (response.code == this.code.codeNum.SUCCESS) {
          this.processObj = response.data;
          this.searchData.examAllType = this.processObj.map(item => {
             return {
              value: item.id,
              label: item.procTypeName
            }
          })
        } else if (response.code == this.code.codeNum.RESULT_EMPTY) {
          this.processObj = [];
          this.searchData.examAllType = [];
        } else if (response.code == this.code.codeNum.SYSTEM_ERROR) {
          this.$message(response.msg);
        }
      })).catch(error => {
        console.log(error);
      });
    },
    // 搜索
    searchBtn () {
      this.currentPage = 1;
      this.isResult = true;
      this.treeClickObj = {id: ''};
      this.findTable();
    },
    resetBtn(){
      this.searchItem = {//搜索条件
        search_cont: '',
        financingName: '',//业务类型
        financingList: [],//业务类型列表
        processDes: '',//流程描述
        starTime: '',//开始时间
        endTime: '',//结束时间
        stageName: '',//项目阶段
        stageId: ''
      }
      this.$refs.stateEle.clearSel();
    },
    // 新增
    addProcess () {
      // console.log("新增")financingNameolg
      this.newProcessTitle = "新增流程"
      this.dialogVisible = true;
      this.procTypeIds = true
      this.editShow = false
      this.financingNameolg = ''
      this.add_form = {
        pro_code: '',
        pro_type: '',
        procName: '',
        procDescr: '',
        //procKey:'',
        options: '',
        stageOption: '',
      };
      console.log(this.treeClickObj.id, this.treeClickObj)
      this.procTypeId =  this.financingIdolg;
      if (!this.treeClickObj.isOrdinary && this.treeClickObj.id !== 'all' && this.treeClickObj.id !== 'default'){
        this.$post('/info/project/getProjectStageList', {
          data: {
            financingId: this.treeClickObj.id
          }
        }).then(response => {
          if (response.code !== 0) {
            this.$message.error(response.msg)
            return
          }
          if (response.data && response.data.length > 0) {
            this.add_form.pro_code = this.treeClickObj.label;
            this.finaTypeId = this.treeClickObj.id;
          } else {
            this.add_form.pro_code = '';
            this.finaTypeId = '';
          }
        })
      } else if (this.treeClickObj.isOrdinary){
        this.add_form.pro_type = this.treeClickObj.label;
        this.financingNameolg = this.treeClickObj.label;
        this.procTypeId = this.treeClickObj.id
        this.procTypeIds = false
        this.isPutong = true
      }
      // 只有项目类型下的才可以回显业务类型
      // if(this.treeClickObj.id != 1 && this.treeClickObj.children == null && this.treeClickObj && this.treeClickObj.fields && this.treeClickObj.fields.data.id > 1){//业务类型
      //     this.add_form.pro_code = this.treeClickObj.label;
      //     this.finaTypeId = this.treeClickObj.id;
      // } else {
      //   // 普通类型
      //   console.log(123123)
      //   this.add_form.pro_type = this.treeClickObj.label;
      //   this.procTypeId = this.treeClickObj.id
      // }
      this.stageId = "";
      this.form_stage = false;
      this.add_form.options = this.processObj;
    },
    //编辑
    handleEdit (index, row) {
      console.log(row, row.procTypeId, "点击编辑", this.add_form, row.finaTypeId, row.finaTypeName, row.progStageName, row.procDeployId, this.processObj)
      this.rowDataEdit = row
      this.newProcessTitle = "编辑流程"
      this.dialogVisible = true;
      this.editShow = true
      this.financingNameolg = row.procTypeName // 展示名称
      this.procDeployId = row.procDeployId
      this.processId = row.id
      this.stageId = row.progStageId ? row.progStageId : '' // 项目阶段id
      this.editId = row.progStageId ? row.progStageId : '' // 项目阶段id
      // 是否有值,有值需要校验是否被引用，被引用则禁用
      if (this.procDeployId) {
        this.handleditProcess(this.procDeployId)
      } else {
        this.disabeld = false
      }
      this.add_form = {
        pro_code: row.finaTypeName,// 融资类型
        pro_type: row.procTypeName, // 审批类型
        procName: row.procName, // 项目名称
        procDescr: row.procDescr, // 流程描述
        options: this.processObj,
        progStage: row.progStageId, // 项目阶段
      };
      this.form_stage = false;
      this.add_form.options = this.processObj;
      if (!row.finaTypeId) {
        this.$nextTick(()=>{
          this.form_stage = false;
          this.procTypeIds = false
        })
        this.editObj = {
          pro_code: "",// 融资类型
          pro_type: row.procTypeName, // 审批类型
          procName: row.procName, // 项目名称
          procDescr: row.procDescr, // 流程描述
          options: "",
          progStage: "" // 项目阶段
        }
      }
      // 获取到审批的类型数据，找到相对应的id(系统自带的类型取id,其他取typeId)
      let id = ""
      this.processObj.forEach(v => {
        console.log(v)
        if (v.procTypeName === row.procTypeName) {
          v.id <= 1 ? id = v.typeId : id = v.id
        }
      })
      //   如果没有融资类型，则不比较
      if (!row.finaTypeId) {
        this.editObj = this.$utils.copyObj(this.add_form)
        this.updateType(id)
        return
      }
      // 根据融资类型的id找到相对用的项目阶段---初始化数据展示
      if (row.finaTypeId) {
        this.procTypeIds = true
        this.findTypeID(row.finaTypeId, id, 2)
        return
      }
      this.updateType(id)
    },
    // 根据融资类型的id找相对应的项目阶段
    findTypeID (val, index, isChange) {
      console.log(val, 22222, index, isChange)
      this.finaTypeId = val
      this.$post("/info/project/getProjectStageList", {
        data: {
          financingId: val
        }
      }).then((response => {
        if (!response) {
          this.$message.error(response.msg)
          return
        }
        if (response.code !== 0) {
          this.$message.error(response.msg)
          return
        }
        if (response.data) {
          // 复制第一次的数据，进行保存钱修改校验
          this.add_form.stageOption = response.data;
          console.log(122,this.editObj, this.add_form)
          if (isChange != 1) {
            this.editObj = this.$utils.copyObj(this.add_form)
          }
          console.log(123,this.editObj, this.add_form)
          if (index < 1) {
            index = 1
          }
          this.updateType(index)
        }
      })).catch(error => {
        console.log(error);
      });
    },
    updateType (val) {
      this.procTypeId = val;
      // if(!!this.add_form.stageOption) {
      //   this.add_form.stageOption.length = 0;
      // }
      switch (+val) {
        case 1:
          this.procTypeIds = false;
          this.isProcessengineClick = true;
          break;
        case 2:
        case 3:
        case 5:
        case 10:
        case 11:
          this.form_stage = true;
          this.procTypeIds = true;
          this.isProcessengineClick = false;
          break;
        default:
          this.form_stage = false;
          this.procTypeIds = true;
          this.isProcessengineClick = true;
      }
      this.$forceUpdate(); // 手动更新
    },
    //是否被引用
    handleditProcess (val) {
      this.$post("/info/service/judgeEditProcess", {
        data: {
          procDeployId: val,
          id: this.processId
        }
      }).then((response => {
        if (!response) {
          this.$message.error(response.msg)
          return
        }
        if (response.code !== 0) {
          // 被使用---不可以编辑
          this.disabeld = true
          // this.add_form = this.editObj
          return
        }
        if (response.data) {
          this.disabeld = false
        }
      })).catch(error => {
        console.log(error);
      });
    },
    // 进入编辑流程图方法
    handleFlowChart () {
      // 只要能编辑，需要看编辑内容是否修改，，，，修改则提示需要保存，不修改则不提示
      console.log(this.editObj, '初始', this.procTypeId, this.add_form)
      if (this.procTypeId === 1) {
        if (this.editObj.pro_type !== this.add_form.pro_type ||
          this.editObj.procName !== this.add_form.procName ||
          this.editObj.procDescr !== this.add_form.procDescr) {
          this.$message.info('请先保存修改内容')
          return
        }
      } else {
        if ((this.editObj.pro_code !== this.add_form.pro_code) ||
          this.editObj.pro_type !== this.add_form.pro_type ||
          this.editObj.procName !== this.add_form.procName ||
          this.editObj.procDescr !== this.add_form.procDescr ||
          this.editObj.progStage !== this.add_form.progStage) {
          this.$message.info('请先保存修改内容')
          return
        }
      }
      // 进入流程图的编辑
      this.flowChartBtn()
    },
    flowChartBtn () {
      // console.log(this.rowDataEdit, 555)
      if(!this.$utils.checkSystemPermission('bask_edit_flow')) {
        this.$message.warning("没有该权限");
        return
      }
      this.$router.push({ path: `/newprocess/${this.rowDataEdit.actModelId}&id=${this.rowDataEdit.id}` });
    },
    // 审批流程 1.启用状态 默认为0，未开启
    handleOpen (row) {
      // console.log(row.openAudit)
      if (row.actStatusId != 3) {
        this.$message.warning("只有状态为启用中的时候才能开启审批流程");
        return
      }
      let resOpenAudit = row.openAudit == 0?1:0
      this.$post('/info/service/updateProcessOpenAudit', {
        data: {
          id: row.id,
          openAudit:resOpenAudit
        }
      }).then(res => {
        if (res.code != this.code.codeNum.SUCCESS) {
          this.$message.warning(res.msg);
          return
        }
        this.$message.success(resOpenAudit == 1?'开启审批流程':'关闭审批流程');
        this.findTable()
      }).catch(err => console.log(err))
    },
    // 1.关联项目开启关闭
    handleRelevance (index, row, obj) {
      console.log(row)
      console.log(row.relevProjAudit)
      if (row.openAudit == 0) {
        this.$message.warning("只有开启审批流程之后才能开起关联项目审批");
        return
      }
      let resRelevProjAudit = row.relevProjAudit == 0 ? 1 : 0
      this.$post('/info/service/updateProcessRelevProjAudit', {
        data: {
          id: row.id,
          relevProjAudit:resRelevProjAudit
        }
      }).then(res => {
        if (res.code != this.code.codeNum.SUCCESS) {
          this.$message.warning(res.msg)
          return
        }
        this.$message.success(resRelevProjAudit == 1?"开启关联审批流程":"关闭关联审批流程")
        this.findTable();
      }).catch(err => console.log(err))
    },
    // 1.流程状态: 未发布/	已发布/启用中/禁用中(0/1/2/3),默认未发布actStatusId
    //是否启用
    handleStart (index, row, obj) {
      console.log(row)
      this.forbidden = true
      let url = "";
      let msg = "";
      switch (+row.actStatusId) {
        case 1:
          url = "/info/service/ProcPublish";
          msg = "发布成功！"
          break;
        case 2:
          url = "/info/service/ProcEnabl";
          msg = "启用成功！"
          break;
        default:
          url = "/info/service/ProcDisable";
          msg = "禁用成功"
      }
      this.$post(url, {
        data: {
          id: row.id,
          procName: row.procName
        }
      }).then((response => {
        this.forbidden = false;
        // -2006没有权限
        if (response.code === -2006 || response.code === -2008) {
          this.$message.error(response.msg)
          return
        }
        // 融资类型和项目阶段必填
        if (response.code === -3321) {
          this.$message.error(response.msg)
          return
        }
        // 启用失败
        if (response.code === -3017) {
          this.$message.error(response.msg)
          return
        }
        // 成功
        if(response.code == this.code.codeNum.SUCCESS) {
          this.$message.success(response.msg);
          this.findTable()
          return
        }
        // code为3025和3026并且actStatusId == 2才会提示流程图不完整
        // if((response.code === -3025 || response.code === -3026) && row.actStatusId == 2) {
        if (row.actStatusId == 2) {
          this.rowvalue = row;
          if(response.code == -3522){
            this.$message.error(response.msg)
            return;
          }
          if(response.code == -3521){
            let data = response.data;
            let userError = data.user || [];//审批人异常
            let copyError = data.copy || [];//抄送人异常
            for(let i = 0;i<userError.length;i++){
              userError[i] = '“' + userError[i] + '”';
            }
            for(let j = 0;j<copyError.length;j++){
              copyError[j] = '“' + copyError[j] + '”';
            }
            let userErrorList = userError.join('，')
            let copyErrorList = copyError.join('，')
            this.startUseTips = '';
            if(userError.length != 0){
              this.startUseTips = '所选审批人中' + userErrorList;
            }
            if(copyError.length != 0){
              if(userError.length != 0){
                this.startUseTips = this.startUseTips + '，'
              }
              this.startUseTips = this.startUseTips + '抄送人中' + copyErrorList;
            }
            this.startUseTips = this.startUseTips + '账号异常，请先编辑处理，否则将可能导致审批流程无法正常进行。';
            this.errorTipsBtn = '编辑';
            this.supplement = true;
          } else {
            this.startUseTips = '流程图不完整无法启用该审核，请补充流程图';
            this.supplement = true;
          }
        }
      })).catch(error => {
        console.log(error);
      });
    },
    //去补充流程图
    gosupplement () {
      // console.log(this.rowvalue)
      if(!this.$utils.checkSystemPermission('bask_edit_flow')) {
        this.$message.warning("没有该权限");
        return
      }
      this.$router.push({ path: `/newprocess/${this.rowvalue.actModelId}&id=${this.rowvalue.id}` });
    },
    /**
     * 删除流程的公共方法
     * @param {Boolean} isMultiple 是否多选删除
     */
    deleteVisibleFn (isMultiple) {
      this.$post("/info/service/updateProcListById", {
        data: {
          ids: isMultiple?this.multipleSelection.map(v => v.id).join(','):this.rowData.id
        }
      }).then((res => {
        if (res.code != this.code.codeNum.SUCCESS) {
          this.$message.error(res.msg)
          return
        }
        this.$message.success("删除成功")
        this.findTable()
      })).catch(err => console.log(err))
    },
    //删除
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该流程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.rowData = row
        this.deleteVisibleFn(false)
      }).catch(() => {
        this.$message('已取消删除')
      })
    },
    //融资类型返回值
    typeProject () {
      // 清空项目阶段
      // console.log(this.add_form.progStage, !!this.add_form.progStage)
      // if(!!this.add_form.progStage) {
      //     this.add_form.progStage = '';
      // }
      let data = arguments[1][0]
      var finaTypeId;
      if(arguments[0] == 1){  //新增
        this.add_form.pro_code = data[0].label;
        this.finaTypeId = data[0].id;
        finaTypeId = this.finaTypeId;
      } else {
        this.searchItem.financingList = this.$utils.cloneDeepArray(data);
        let arr = [];
        data.forEach((obj)=>{
          arr.push(obj.label)
        })
        if(arr.length == 1){
          this.searchItem.financingName = arr[0]//选择单个业务类型不加、
        } else {
          this.searchItem.financingName = arr.join('、')
        }
        if(this.searchItem.financingList.length == 1){
            finaTypeId = data[0].id;
        } else {
          return;//选择多个业务类型时不调接口获取阶段列表
        }
      }
      this.$post("/info/project/getProjectStageList", {
        data: {
          financingId: finaTypeId
        }
      }).then((response => {
        var data = response.data;
        if (response.code == this.code.codeNum.SUCCESS) {
          if(arguments[0] == 1){
            this.add_form.progStage = ''
            this.add_form.stageOption = response.data;
            this.$forceUpdate(); // 手动更新
          } else {
            this.searchData.selectStageList = response.data;
            this.searchItem.stageId = ''
          }
        } else {
          this.$message(response.msg);
        }
      })).catch(error => {
        console.log(error);
      });
    },
    // 编辑弹框----保存并关闭
    dialogVisibleFnClose () {
      this.closeShow = true
      this.dialogVisibleFnSave()
    },
    // 编辑弹框-----保存
    dialogVisibleFnSave () {
      this.handleSave()
    },
    // 保存公用
    handleSave () {
      console.log(this.add_form, this.editObj, this.stageId, this.editId, this.procTypeId, this.closeShow, this.form_stage)

      // 如果数据没有修改则不保存
      // if ((this.editObj.pro_code === this.add_form.pro_code) &&
      //   this.editObj.pro_type === this.add_form.pro_type &&
      //   this.editObj.procName === this.add_form.procName &&
      //   this.editObj.procDescr === this.add_form.procDescr &&
      //   this.stageId === this.editId) {
      //   // 如果点击的是保存并关闭，则直接关掉
      //   if (this.closeShow) {
      //     this.dialogVisible = false;
      //     this.closeShow = false
      //   }
      //   return
      // }
      console.log(this.procTypeId != 1)
      if (this.procTypeId != 1) {
        if (this.add_form.pro_code == "") {
          this.$message.error("业务类型内容不能为空！");
          return
        }
        if (this.add_form.pro_type == "") {
          this.$message.error("审核类型内容不能为空！");
          return
        }
        if (this.form_stage) {
          if (this.add_form.progStage == "" || this.add_form.progStage == undefined || this.add_form.progStage == null) {
            this.$message.error("项目阶段内容不能为空！");
            return
          }
        }
      } else {
        this.stageId = ""
        this.finaTypeId = ""
        this.editId = ""
      }
      if (this.add_form.procName == "") {
        this.$message.error("名称不能为空！");
        return
      }
      console.log(this.procTypeId, 'this.procTypeId,', this.add_form, this.editObj)
      // 如果数据没有修改则不保存
      //  普通审批            this.procTypeIds = true
      if (this.procTypeId === 1) {
        if (this.editObj.pro_type === this.add_form.pro_type &&
          this.editObj.procName === this.add_form.procName &&
          this.editObj.procDescr === this.add_form.procDescr) {
          this.procTypeIds = false
          // 如果点击的是保存并关闭，则直接关掉
          if (this.closeShow) {
            this.procTypeIds = false
            this.dialogVisible = false;
            this.closeShow = false
          }
          return
        }
        this.saveFun()
      }else if ([2,3,5,10,11].includes(this.procTypeId)) {
        // 文件审批，融资类型及项目阶段都需要
        if ((this.editObj.pro_code === this.add_form.pro_code) &&
          this.editObj.pro_type === this.add_form.pro_type &&
          this.editObj.procName === this.add_form.procName &&
          this.editObj.procDescr === this.add_form.procDescr &&
          this.editObj.progStage === this.add_form.progStage &&
          this.stageId === this.editId) {
          // 如果点击的是保存并关闭，则直接关掉
          if (this.closeShow) {
            this.dialogVisible = false;
            this.closeShow = false
          }
          console.log(123, this.closeShow)
          return
        }
        this.saveFun()
      }else {
      // 其他不需要项目阶段的
        // if (this.procTypeId !== 2 && this.procTypeId !== 3 && this.procTypeId !== 5 && this.procTypeId !== 10)
        this.stageId = ""
        if ((this.editObj.pro_code === this.add_form.pro_code) &&
          this.editObj.pro_type === this.add_form.pro_type &&
          this.editObj.procName === this.add_form.procName &&
          this.editObj.procDescr === this.add_form.procDescr) {
          // 如果点击的是保存并关闭，则直接关掉
          if (this.closeShow) {
            this.dialogVisible = false;
            this.closeShow = false
          }
          return
        }
        this.saveFun()
      }
      console.log(this.finaTypeId, 666)
    },
    saveFun () {
      console.log(this.procTypeId, 'procTypeId')
      this.$post("/info/service/editProcessInfo", {
        data: {
          procTypeId: this.procTypeId,
          finaTypeId: this.finaTypeId,
          procName: this.add_form.procName,
          progStageId: this.stageId,
          procDescr: this.add_form.procDescr,
          id: this.processId,
          procDeployId: this.procDeployId
        }
      }).then((response => {
        if (!response) {
          this.$message.error(response.msg)
          return
        }
        if (response.code == -3322) {
          // 如果保存时被引用了，则回显到旧数据
          this.add_form = this.$utils.copyObj(this.editObj)
          this.$message.error(response.msg)
          return
        }
        if (response.code !== 0 && response.code !== -3322) {
          this.$message.error(response.msg)
          return
        }
        if (response.data) {
          var data = response.data;
          this.$message.success('保存成功')
          // 保存成功之后复制的数据要保持统一
          // this.editObj = this.add_form
          this.editObj = this.$utils.copyObj(this.add_form)
          if (this.closeShow) {
            this.dialogVisible = false
          }
          this.closeShow = false
          this.findTable()
        }
      })).catch(error => {
        console.log(error);
      });
    },
    // 新建弹框的保存-----保存并关闭
    dialogVisibleFn () {
      console.log("新建的保存---保存并关闭",this.procTypeId, this.stageId, this.finaTypeId, this.isPutong)
      console.log("新建的保存---保存并关闭22222222222222",this.add_form.pro_type)
      if (this.procTypeId != 1 && !this.isPutong) {
        if (this.add_form.pro_code == "") {
          this.$message.error("业务类型内容不能为空！");
          return
        }
        if (this.financingNameolg == "") {
          this.$message.error("审核类型内容不能为空！");
          return
        }
        if (this.form_stage) {
          if (this.add_form.progStage == "" || this.add_form.progStage == undefined || this.add_form.progStage == null) {
            this.$message.error("项目阶段内容不能为空！");
            return
          }
        }
      } else {
        this.stageId = ""
        this.finaTypeId = ""
        this.editId = ""
      }
      if (this.add_form.procName == "") {
        this.$message.error("名称不能为空！");
        return
      }
      //procKey:this.add_form.procKey
      this.$post("/info/service/addProcessModel", {
        data: {
          procTypeId: this.procTypeId,
          finaTypeId: this.finaTypeId,
          procName: this.add_form.procName,
          progStageId: this.stageId,
          procDescr: this.add_form.procDescr
        }
      }).then((res => {
        if (res.code != this.code.codeNum.SUCCESS) {
          this.$message.warning(res.msg)
          return
        }
        const data = res.data
        this.$message.success("新增成功！")
        this.dialogVisible = false;
        this.$router.push({ path: "/newprocess/" + data.actModelId + "&id=" + data.id })
      })).catch(err => console.log(err))
    },
    //选择
    changeFn () {
      if (this.disabeld) return
      this.$post('/info/project/getUsableFinanceType').then(res => {
        if (res.code != this.code.codeNum.SUCCESS) {
          this.$message.warning(res.msg)
          return
        }
        this.typeFlag = true;
        this.state = 1;
        this.typeObj = res.data;
        this.optState = { value: 2 };
      }).catch(err => console.log(err))
    },
    changeFnolg(){
      this.typeFlagolg = false
      this.$post('/info/service/getUsableProcessType').then(response => {
        if (response.code != this.code.codeNum.SUCCESS) {
          this.$message.warning(response.msg)
          return
        }
        console.log(this.typeFlagolg, response.data)
        this.typeFlagolg = true
        this.stateolg = 1
        this.typeObjolg = response.data
        this.optStateolg = { value: 2 }
      }).catch(err => console.log(err))
    },
    //审批类型返回值
    typeProjectolg(){
        let data = arguments[1][0]
        var finaTypeId;
        if(arguments[0] == 1){
            this.editObj.pro_type = data[0].label
            console.log(data[0].fields.data.id)
            // 需要展示业务类型和项目阶段的情况
            if ([2,3,5,10,11].includes(data[0].fields.data.id)) {
              this.procTypeIds = true
              this.form_stage = true;
                this.isPutong = false
            }else if(data[0].isOrdinary){ // 普通类型
                this.procTypeIds = false
                this.isPutong = true
            }else if([6,7,8,9].includes(data[0].fields.data.id)){ // 只有业务类型，没有项目阶段的审批类型
                this.procTypeIds = true
                this.isPutong = false
                this.form_stage = false;
            }
            this.financingIdolg = data[0].id;
            this.financingNameolg = data[0].label;

        } else {
           this.searchItem.financingListback = this.$utils.cloneDeepArray(data);
            let arr = [];
            data.forEach((obj)=>{
            arr.push(obj.label)
            })
            console.log(arr)
            if(arr.length == 1){
            this.searchItem.financingNamesearch = arr[0]//选择单个业务类型不加、
            } else {
            this.searchItem.financingNamesearch = arr.join('、')
            }
            if(this.searchItem.financingListback.length == 1){
                finaTypeId = data[0].id;
            } else {
            return;//选择多个业务类型时不调接口获取阶段列表
            }
        }
      // 审批流程修改选择之后需要修改相关的procTypeId；历史的审批类型取id,新增加的取typeId--isOrdinary = true为普通审批的
      this.procTypeId = data[0].isOrdinary ? data[0].fields.data.typeId : data[0].fields.data.id
      // 当左侧树选择之后，新建时需要调用项目阶段的查询接口
      if (this.add_form.pro_code && this.finaTypeId && !data[0].isOrdinary) {
        this.findTypeID(this.finaTypeId, data[0].fields.data.id, 1)
      }
    },
    //    导出
    // handleExport(index,row){
    //     var dataObj = {
    //         "data":{
    //             "id":row.id
    //         },
    //     };
    //     var now = new Date();
    //     var time = now.getFullYear()+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+(now.getDate()<10?"0":"")+now.getDate();
    //     this.$post('/info/service/export',dataObj).then((response => {
    //         if("undefined" != response.code && undefined != response.code){
    //             this.$message({
    //                 type: 'error',
    //                 message: response.msg
    //             });
    //             return;
    //         }
    //          const aLink = document.createElement("a");
    //          let blob = new Blob([response], {type: "text/xml"})
    //          aLink.href = URL.createObjectURL(blob);
    //          aLink.download = "["+row.procName + time +"].xml";
    //          aLink.click();
    //          document.body.appendChild(aLink);
    //     })).catch(error => {
    //         console.log(error);
    //     })
    // },
    // 批量删除
    handleAllDelete () {
      if (this.multipleSelection.length === 0) {
        this.$message.warning("请先选择流程")
        return
      }
      this.$confirm('此操作将永久删除该流程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteVisibleFn(true)
      }).catch(() => {
        this.$message('已取消删除')
      });
    },
    // 复制
    handleAllCopy () {
      if (!this.multipleSelection.length) {
        this.$message.error("请至少选择一条数据")
        return
      }
      this.processIds = []
      this.multipleSelection.forEach(v => {
        this.processIds.push(v.id)
      })
      console.log(this.processIds, 2333)
      this.$message.success("复制成功")
    },
    // 粘贴
    handleAllPaste () {
      if (!this.processIds.length) {
        this.$message.error("请先复制流程")
        return
      }
      let pasteObj = {
        projectId: this.projectId,
        data: {
          processIds: this.processIds,
          procTypeId: this.treeClickObj.id === 'default' ? '0' : this.treeClickObj.id
        }
      }
      let finaTypeId = ''
      if (this.treeClickObj.id !== 'default' && this.treeClickObj.dataType !== 1) {
        this.treeClickObj.id = this.treeClickObj.id === 'all' ? 1 : this.treeClickObj.id
        finaTypeId = this.treeClickObj.id
        pasteObj.data.finaTypeId = finaTypeId
        pasteObj.data = (({ processIds, finaTypeId }) => ({ processIds, finaTypeId }))(pasteObj.data)
      }
      this.$post("/info/service/pasteProcess", pasteObj).then((response => {
        if (!response) {
          return
        }
        if (response.code !== 0) {
          this.$message.error(response.msg)
          return
        }
        this.$message.success('粘贴成功')
        // 查询第一页
        this.currentPage = 1
        this.findTable()
      })).catch(error => {
        console.log(error);
      });
    },
    // 分页
    onPageChange (currentPage) {
      this.currentPage = currentPage;
      this.findTable();
    },
    handleSizeChange (val) {
      this.pageSize = val;
      this.findTable();
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    //审核类型
    formOption (val) {
      console.log(val, 3666)
      this.procTypeId = val;
      this.add_form.pro_code = '';
      this.add_form.progStage = '';
      if (!!this.add_form.stageOption) {
        this.add_form.stageOption.length = 0;
      }
      switch (+val) {
        case 1:
          this.procTypeIds = false;
          this.isProcessengineClick = true;
          break;
        case 2:
        case 3:
        case 5:
        case 10:
        case 11:
          this.form_stage = true;
          this.procTypeIds = true;
          this.isProcessengineClick = false;
          break;
        default:
          this.form_stage = false;
          this.procTypeIds = true;
          this.isProcessengineClick = true;
      }
      this.$forceUpdate(); // 手动更新
    },
    // 项目阶段
    stageProFn (val) {
      // id值
      this.stageId = val;
      this.$forceUpdate()
    }
  },
  watch: {
    'searchItem.financingList': {
        handler(newList, oldList) {
            this.searchItem.stageId = newList.length == 1 ? this.searchItem.stageId : '';
        },
        deep: true
    }
  }
}

</script>

<style scoped lang="scss" type="text/css">
.pointerevents {
  pointer-events: none;
}
.back_btn{
    margin-right: 10px;
    // margin-left: 10px;
    border: none;
}
.processengine {
  position: relative;
  .el-breadcrumb {
    line-height: 46px;
    padding-left: 10px;
    background: #ffffff;
  }
  .finance_tit {
    position: relative;
    padding-bottom: 10px;
    background: #ffffff;
    .boxL {
      .ipt {
        margin-left: 25px;
      }
      .tit {
        float: left;
        color: #333;
        font-size: 20px;
        line-height: 40px;
        margin-left: 10px;
        font-weight: 600;
      }
    }
  }
  .el-container {
    margin: 10px 0 0;
    height: calc(100vh - 70px);
    .el-aside {
      border-right: 1px solid #e7e7e7;
      background: #ffffff;
      margin-right: 10px;
      width: 260px;
      overflow: hidden;
    }
    .el_main_content {
      background: #ffffff;
    }
  }
}
.ipt{
  padding-top: 14px;
}
.ipt .el-form-item{
  margin-right: 20px;
  margin-bottom: 10px;
}
.business-select {
  input{
    width: 202px;
  }
  .el-button{
    position: absolute;
    right: 0;
    top: 0;
  }
}
.header-btn{
  // text-align:right;
  float: right;
  margin-right: 20px;
}
.tips-content{
  max-height: 134px;
  overflow-y: auto;
}
.fin_inp{
  width: 202px;
}
/* 解决ie11 文字遮挡 */
/deep/ .el-scrollbar .el-scrollbar__wrap{
  // margin-right: 0 !important;
  padding-right: 17px;
}
</style>
<style lang="scss" type="text/css">
.processengine .el-dialog__header {
  border-bottom: 1px solid #dddddd;
  text-align: center;
}
.processengine .type_list li {
  width: 100%;
  line-height: 30px;
}
.processengine .tit_box {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: left;
  cursor: pointer;
  padding-left: 10px;
  box-sizing: border-box;
  font-size: 14px;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  color: #333;
  line-height: 30px;
}
.processengine .tit_box:hover {
  background: #f7f7f7;
  font-size: 14px;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  color: #333;
  line-height: 31px;
}
/* .processengine .tit_box:hover{
        background: #F0F0F0;
    } */
/* .processengine .tit_box:active{
        background: red;
    } */
.processengine .tit_box span {
  display: inline-block;
}
.processengine .tit_box .add_gra {
  float: right;
  width: 10px;
  height: 30px;
  line-height: 30px;
  margin-right: 8px;
}
.processengine .tit_box .add_gra span {
  width: 10px !important;
}
.processengine .type_list .el-input {
  width: 100%;
  height: 30px;
}
.processengine .type_list .el-input input {
  height: 30px;
}
// .processengine .finance_tit .el-input {
//   width: 247px;
//   height: 40px;
//   line-height: 40px;
// }
// .processengine .finance_tit .el-input__inner {
//   width: 247px;
//   height: 40px;
//   line-height: 40px;
// }
.processengine .func_btn {
  width: 100px;
  position: relative;
  top: -40px;
}
.processengine .el-dialog {
  text-align: left;
}
.processengine .opt_btn {
  position: absolute;
  top: 0px;
  right: 0;
}
.processengine .el-pagination {
  margin: 20px 40px 0 0;
  text-align: right;
}
.processengine .type_list .even_btn {
  height: 20px;
  width: 20px;
  padding: 3px;
  margin: 5px 0 5px 5px;
  float: right;
}
.processengine .el-main {
  padding: 0;
}
.processengine .el-scrollbar__wrap {
  overflow-x: hidden;
}
.processengine .el-textarea {
  width: 100%;
}
.processengine .form_box .el-select {
  width: 100%;
}
.processengine .classA {
  background: #0061a9;
  color: #fff;
}
.backgroundcolor {
  background: #f7f7f7;
  font-size: 14px;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  color: #333;
  line-height: 20px;
}
.processengine .ipt{
  .el-form-item__label{
    width: 82px;
  }
  .el-form-item__content{
    float: left;
    // width: 200px;
  }
}
</style>
