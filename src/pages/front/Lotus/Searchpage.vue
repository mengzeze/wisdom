<template>
  <div class="project-doc-search">
    <div class="project-doc-top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>文件审批</el-breadcrumb-item>
        <el-breadcrumb-item>文件审批搜索结果</el-breadcrumb-item>
      </el-breadcrumb>
      <router-link to="/approvalPage">
        <div class="clearfix">
          <el-button icon="el-icon-back" circle class="back_btn fl"></el-button>
          <p class="head fl">文件审批搜索结果</p>
        </div>
      </router-link>
    </div>
    <div class="project-doc-con">
      <div class="search-box clearfix">
        <div
          :class="[{'search-item-box-max': moreSearchAutoH},{'search-item-box-min': !packSearchVisible},'search-item-box','fl']"
        >
          <el-button
            type="text"
            class="more-stage border-primary color-primary-hover"
            @click="showAllBtn(1)"
            v-if="!packSearchVisible"
          >
            更多
            <i class="iconfont jiantou color-primary"></i>
          </el-button>
          <el-button
            type="text"
            class="border-primary color-primary-hover more-stage"
            @click="packUpBtn(1)"
            v-if="packSearchVisible"
          >
            收起
            <i class="iconfont jiantou_shang color-primary"></i>
          </el-button>
          <div class="form_box">
            <el-form ref="form" :model="mySearch.searchList" label-width="100px" class="clearfix">
              <el-form-item label="标题关键词：">
                <el-input
                  class="q-308"
                  v-model="mySearch.searchList.titleKey"
                  placeholder="包含以下全部关键词（以空格区分）"
                  maxlength="160"
                ></el-input>
              </el-form-item>
              <el-form-item label="内容关键词：">
                <el-input
                  class="q-308"
                  v-model="mySearch.searchList.conKey"
                  placeholder="包含以下全部关键词（以空格区分）"
                  maxlength="160"
                ></el-input>
              </el-form-item>
              <el-form-item label="项目阶段：">
                <el-select
                  class="q-240"
                  v-model="mySearch.searchList.proStage"
                  placeholder="请选择项目阶段"
                  clearable
                  @change="changeProStage"
                >
                  <el-option
                    v-for="(item, index) in mySearch.proStageList"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="文件类型：">
                <multiple-choice
                  @changeData="fileTypesChangeData"
                  :selectData="mySearch.docTypeList"
                  :width="196"
                  ref="child"
                />
              </el-form-item>
              <el-form-item label="文件状态：">
                <multiple-choice
                  @changeData="fileStateChangeData"
                  :selectData="mySearch.fileState"
                  :width="196"
                  ref="child1"
                ></multiple-choice>
              </el-form-item>
              <el-form-item label="目录状态：">
                <multiple-choice
                  @changeData="dirStateChangeData"
                  :selectData="mySearch.dirState"
                  :width="196"
                  ref="child2"
                ></multiple-choice>
              </el-form-item>
              <el-form-item label="修改日期：">
                <date-range
                  :date-start.sync="mySearch.searchList.starTime"
                  :date-end.sync="mySearch.searchList.endTime"
                  format="yyyy-MM-dd HH:mm:ss"
                ></date-range>
              </el-form-item>
              <el-button
                size="medium"
                type="primary"
                icon="el-icon-search"
                @click="queryDocBtn(true)"
              >查询</el-button>
              <el-button size="medium" icon="el-icon-refresh" @click="reset">重置</el-button>
            </el-form>
          </div>
        </div>
        <div class="search-btn-box fr" v-if="!packSearchVisible">
          <el-button type="primary" icon="el-icon-search" @click="queryDocBtn(false)">查询</el-button>
          <el-button @click="reset" icon="el-icon-refresh">重置</el-button>
        </div>
      </div>
      <!-- 111 -->
      <!-- <div class="pro-doc-operation clearfix"> -->
      <div
        :class="[{'pro-doc-operation-max':moreHandleAutoH},{'pro-doc-operation2':!moreHandleDisable},'pro-doc-operation','clearfix']"
      >
        <el-button
          type="text"
          class="more-stage border-primary color-primary-hover"
          @click="showAllBtn(2)"
          v-if="!packHandleVisible"
        >
          更多
          <i class="iconfont jiantou color-primary"></i>
        </el-button>
        <el-button
          type="text"
          class="border-primary color-primary-hover more-stage"
          @click="packUpBtn(2)"
          v-if="packHandleVisible"
        >
          收起
          <i class="iconfont jiantou_shang color-primary"></i>
        </el-button>
        <ul style="float:left" class="newremind">
          <li class="download pro-doc-operation-item" @click="downloadFile">
            <a href="javascript:;">
              <i class="iconfont Shapecopy"></i>
              下载
            </a>
          </li>
          <li class="Edition pro-doc-operation-item" @click="visionBtn">
            <a href="javascript:;">
              <i class="xinjianbanbenku iconfont"></i>
              版本
            </a>
          </li>
          <li class="dicuss-exam pro-doc-operation-item" @click="getDiscuss">
            <a href="javascript:;">
              <i class="taolun iconfont"></i>
              讨论
            </a>
          </li>
          <li class="pro-doc-operation-item fl">
            <a href="javascript:;">
              <i class="liebiao-black iconfont"></i>
              已选文件列表
            </a>
          </li>
          <li class="pro-doc-operation-item fl" @click="clearSelection(true)">
            <a href="javascript:;">
              <i class="quxiaoxuanze iconfont"></i>
              取消选择
            </a>
          </li>
          <li class="pro-doc-operation-item fl">
            <a href="javascript:;">
              <i class="daochu14px iconfont"></i>
              导出
            </a>
          </li>
          <li class="pro-doc-operation-item fl" @click="remarkBtn">
            <a href="javascript:;">
              <i class="beizhu iconfont"></i>
              备注
            </a>
          </li>
          <li class="pro-doc-operation-item fl" @click="approvalHandle">
            <a href="javascript:;">
              <i class="shenpijilu1 iconfont"></i>
              查看审批记录
            </a>
          </li>
        </ul>
      </div>
      <!-- 111   -->
      <div style="text-align:left;padding-left:10px;margin-top:8px;" class="path-el-breadcrumb">
        <div class="el-breadcrumb-box el-breadcrumb-ul">
          <path-bar :paths="bread_crumbs" field="title" @toggle="backDir"></path-bar>
        </div>
      </div>
      <div class="project-doc-list">
        <el-table
          ref="table"
          :row-style="rowClass"
          highlight-current-row
          :data="docInitList"
          @select-all="handleSelectAll"
          @select="handleSelectDoc"
          @row-dblclick="getDblClickId"
          @selection-change="handleSelectionChange"
          :height="tableHeight"
          @sort-change="tableSortChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="文件名" prop="docName" width="600" sortable="custom">
            <template slot-scope="scope">
              <el-col
                :span="15"
                class="name_col clearfix"
                style="position:relative"
                :title="scope.row.docName"
              >
                <p class="fl">
                  <img :src="scope.row.fileIcon" />
                </p>
                <div class="fl name_col_name">
                  <div
                    :class="[{noIcon:scope.row.lockState != '0' && scope.row.lockState != '1'&& scope.row.lockState != '2'},'table-doc-name']"
                    v-html="scope.row.highlightName"
                    :title="scope.row.docName"
                  ></div>
                  <ul class="doc-state clearfix" v-if="scope.row.docType == 0">
                    <li class="fl" v-if="scope.row.auditStatus == 0" title="审批中">
                      <img
                        src="../../../assets/project_doc/shenpizhong.png"
                        style="width:40px;height:17px"
                      />
                    </li>
                    <li class="fl" v-if="scope.row.auditStatus == 1" title="审批通过">
                      <img
                        src="../../../assets/project_doc/shenpitongguo.png"
                        style="width:50px;height:17px"
                      />
                    </li>
                    <li class="fl" v-if="scope.row.auditStatus == 2" title="审批未通过">
                      <img
                        src="../../../assets/project_doc/shenpiweitongguo.png"
                        style="width:61px;height:17px"
                      />
                    </li>
                    <li class="fl" title="待审批">
                      <img
                        src="../../../assets/project_doc/daishenpi.png"
                        style="width:40px;height:17px"
                      />
                    </li>
                    <li class="fl" title="驳回未修改">
                      <img
                        src="../../../assets/project_doc/bohuiweixiugai.png"
                        style="width:61px;height:17px"
                      />
                    </li>
                    <li class="fl" title="驳回已修改">
                      <img
                        src="../../../assets/project_doc/bohuiyixiugai.png"
                        style="width:61px;height:17px"
                      />
                    </li>

                    <li class="fl" title="修订中">
                      <img
                        src="../../../assets/project_doc/xiudingzhong.png"
                        style="width:40px;height:17px"
                      />
                    </li>
                    <li class="fl" title="修订审批中">
                      <img
                        src="../../../assets/project_doc/xuidingshenpizhong.png"
                        style="width:61px;height:17px"
                      />
                    </li>
                    <li class="fl" title="已归档">
                      <img
                        src="../../../assets/project_doc/yiguidang.png"
                        style="width:40px;height:17px"
                      />
                    </li>
                    <li class="fl" v-if="scope.row.opersmall" title="已设置变更提醒">
                      <i class="confont tongzhi"></i>
                    </li>
                    <li class="fl" v-if="scope.row.lockState != '-1'" title="已锁定">
                      <i class="confont tubiao-suo"></i>
                    </li>
                    <li class="suolin-icon fl" title="索引">
                      <i class="iconfont suoyin"></i>
                    </li>
                    <li class="beizhu-icon fl" title="备注">
                      <i class="iconfont beizhu"></i>
                    </li>
                    <li class="shenpijilu-icon -folder-emptyfl" title="审批记录">
                      <i class="iconfont shenpijilu1"></i>
                    </li>
                  </ul>
                </div>
              </el-col>
            </template>
          </el-table-column>
          <el-table-column label="所在阶段" prop="stageName"></el-table-column>
          <el-table-column label="修改时间" prop="updateTime" width="160" sortable="custom"></el-table-column>
          <el-table-column label="大小" prop="docSize" width="140" sortable="custom"></el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="toogleExpand(scope.row)"
                v-if="scope.row.docType == 0"
              >摘要</el-button>
              <el-button type="text" @click="docLocationBtn(scope.row)">定位</el-button>
            </template>
          </el-table-column>
          <el-table-column type="expand" width="1">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label>
                  <span v-html="props.row.highlightContent"></span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="footer-box clearfix">
        <p class="footer-box-l fl">已选中{{selectedTotal}}项</p>
        <el-pagination
          class="fr"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="mySearch.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="mySearch.dataCount"
          :page-count="mySearch.pageCount"
        ></el-pagination>
      </div>
    </div>
    <version :versionIsShow="versionIsShow" @versionIs="versionIs" />
  </div>
</template>
<script>
import version from "./version";
export default {
  name: "projectDocSearch",
  components: {
    version
  },
  props: [],
  data() {
    return {
      dataSource: 'project', // 文件来源：project项目文档，paper 底稿
      ChangeData: {
        // 下拉选框数据
        dirStateChange: [],
        fileStateChange: [],
        fileTypesChange: []
      },
      versionIsShow: false,
      //
      dateStart: "",
      dateEnd: "",
      token: "",
      userId: "",
      success_code: "",
      docInitList: [], //项目列表
      projectId: "", //项目ID
      stageList: [],
      projectData: {}, //跳转路由传过来的项目信息
      isSearch: true,
      mySearch: {
        searchList: {
          titleKey: "",
          conKey: "",
          proStage: "",
          docType: "",
          starTime: "",
          endTime: ""
        },
        proStageList: [],
        docTypeList: [
          { value: 1, label: "doc/docx" },
          { value: 2, label: "pdf" },
          { value: 3, label: "xls/xlsx" },
          { value: 4, label: "txt" },
          { value: 5, label: "png" },
          { value: 6, label: "jpg/jpeg" },
          { value: 7, label: "其他" }
        ],
        fileState: [
          //文件状态
          { value: 1, label: "无文件" },
          { value: 2, label: "有文件" },
          { value: 3, label: "已选择" },
          { value: 4, label: "待审批" },
          { value: 5, label: "审批中" },
          { value: 6, label: "审批通过" },
          { value: 7, label: "已驳回" },
          { value: 8, label: "有备注的" },
          { value: 9, label: "有讨论的" }
        ],
        dirState: [
          //目录状态
          { value: 1, label: "待审批" },
          { value: 2, label: "审批中" },
          { value: 3, label: "审批通过" },
          { value: 4, label: "已驳回" },
          { value: 5, label: "有备注的" },
          { value: 6, label: "有讨论的" }
        ],
        dataCount: 0, //数据条数
        pageCount: 1, //总页数
        pageSize: 100,
        pageNo: 0
      },
      currentPage: 1,
      searchedTerm: {
        searchList: {
          titleKey: "",
          conKey: "",
          proStage: "",
          docType: "",
          startTime: "",
          endTime: ""
        },
        proStageList: [],
        docTypeList: [
          {
            type: "全部",
            id: ""
          },
          {
            type: "Word文档",
            id: "0"
          },
          {
            type: "PDF文档",
            id: "1"
          },
          {
            type: "Excel文档",
            id: "2"
          },
          {
            type: "txt文档",
            id: "3"
          },
          {
            type: "png图片",
            id: "4"
          },
          {
            type: "jpg图片",
            id: "5"
          }
        ]
      },
      currentQueryDoc: false,
      publicData: {
        projectId: "", //项目ID
        projectName: "", //项目名称
        processName: "", //流程名称
        processId: "", //流程id
        docParentId: 0, //上级目录ID
        pathNameList: [], //文件目录
        projectCreatBy: "" //项目创建人
      }, //公共基础数据
      permission: {
        projectFileDir: this.$utils.checkProjectPermission("project_file_dir"), // 新建项目
        projectFileMould: this.$utils.checkProjectPermission(
          "project_file_mould"
        ), // 引用模板
        projectFileUpload: this.$utils.checkProjectPermission(
          "project_file_upload"
        ), // 上传
        projectFileDition: this.$utils.checkProjectPermission(
          "project_file_dition"
        ), // 版本
        projectFileToPaper: this.$utils.checkProjectPermission(
          "project_file_to_paper"
        ), // 尚未底稿
        projectFileApprove: this.$utils.checkProjectPermission(
          "project_file_approve"
        ), // 文件审核
        projectDirApprove: this.$utils.checkProjectPermission(
          "project_dir_approve"
        ) // 目录审核
      },
      selectedDoc: [], //当前选中的文件或文件夹
      powerSetIsShow: false,
      //设置权限
      powerSetData: [],
      checkList: [],
      permsType: {
        view: false,
        download: false,
        recovery: false,
        copy: false,
        delete: false,
        cut: false,
        reName: false
      }, //向后台提交的权限数据
      currentPowerPerson: 0, //设置权限时当前选中人的index
      currentPersonData: {}, //当前选中人的数据
      versionIsShow: false, //是否显示版本弹窗
      docVersionlist: [], //版本列表
      uploadParamData: {
        //上传新版本需要传的数据
        docSource: 0, //项目文档固定为0
        projId: "",
        parentId: 0,
        auditProjectId: "" //流程id
      },
      stageIsAll: false, //阶段是否为全部
      docRelationIsShow: false, //是否显示文件关联弹窗
      //文件审核
      docExamIsShow: false, //是否显示文件审核
      examType: "2", //审批类型，文件审批2/修订审批10
      docExamselectedDoc: [], //文件审核弹层当前选中的文件或文件夹
      docFlowChartData: {
        //流程图相关信息
        modelId: "",
        deploymentId: "",
        versionId: "",
        financingTypeId: "",
        categoryId: "",
        docExamProcessName: ""
      },
      //目录审批
      catalogExamIsShow: false, //是否显示目录审批弹窗
      catalogFlowChartData: {
        modelId: "",
        deploymentId: "",
        versionId: "",
        financingTypeId: "",
        categoryId: "",
        catalogExamProcessName: ""
      },
      // 设置提醒
      getvalue: "", //设置提醒
      remindbox: false, //提醒弹窗是否显示
      deployObj: [], //设置提醒人员
      chack_bule: false,
      strs: [],
      choseDoclist: [], //设置提醒选择的文件集合
      chosefileIds: [], //设置提醒选择的文件id集合
      findFlag: false, //添加人员弹窗
      findState: {},
      checkState: {},
      user_num: "", //选择人员标识
      ccObj: [], //添加抄送人员
      chosepersonIds: [],
      //选择角色
      setdatas: [],
      rights: "",
      flags: false, //是否显示选择角色弹窗
      roledata: "",
      Role: "",
      setdata: [],
      roleIds: [],
      bread_crumbs: [{ title: "根目录", parentId: 0 }], //路径
      copySourceData: {
        //复制剪切相关数据
        ids: "",
        projId: "",
        sourceProjId: "",
        parentId: "",
        copyOrCut: "",
        seleFileIds: [], //复制剪切时文件id集合
        seleFolderIds: [] //复制剪切时文件夹id集合
      },
      reNameIndex: 0, //显示重命名编辑框的下标值
      isShowNature: false, //是否显示文件属性弹框
      select_nature_data: "", //文件属性相关数据
      // 1.2.2
      //被索引详情弹窗相关
      indexIsShow: false, //被索引详情是否展示
      indexTableData: [], //被索引详情列表
      draftDetailBtn: false, //删除时提示已有设为底稿的文件
      deleDraftTips: "", //删除时提示已有设为底稿的弹窗文字
      deleteDocList: [], //将要删除的文件列表
      indexDetailsIds: [], //要获取被索引详情的文件id集合
      toDocRelationList: [], //传给文件关联弹窗的文件和文件夹
      filterSetDraftDoc: 0, //每次点击“设为底稿”按钮时如果有选中的文件夹，把验证出的空目录、含有设为底稿文件的文件夹个数记录下来
      testCanSetDraftTimes: 0, //验证次数
      folderTotal: 0, //选中的文件夹个数
      hasSetedDoc: false, //选中的文件中是否有已设为底稿的文件
      findUserObj: [],
      findUserObjM: [],
      projectIndexShow: false, // 索引列表值
      projectIndexData: {}, // 索引传值
      moreStageAutoH: false, //收起，展开状态
      packBtnVisible: false,
      moreSearchAutoH: false,
      packSearchVisible: false,
      moreHandleAutoH: false,
      packHandleVisible: false,
      tableHeight: 600, //文件列表表格高度
      selectedTotal: 0, //共选中多少项
      examTitle: "文件审批", //文件审批或修订审批弹窗标题
      remarkIsShow: false, //备注弹窗
      docData: [
        {
          docName:
            "文件名文件名文件名文件名文件名文件名文件名文件名文件名文件名文件名文件名文件名文件名文件名文件名文件名文件名文件名文件名文件名文件名文件名文件名文件名"
        }
      ]
    };
  },
  created() {
    this.token = this.$store.state.loginObject.userToken;
    this.userId = this.$store.state.loginObject.userId;
    this.success_code = this.code.codeNum.SUCCESS;
    this.searchedTerm = JSON.parse(this.$route.query.searchedData); //获取传过来的查询条件
    this.projectData = JSON.parse(this.$route.query.projectData);
    console.log("项目数据", this.projectData);
    this.publicData.processId = this.projectData.processId;
    this.publicData.projectName = this.projectData.projectName;
    this.publicData.projectId = this.projectData.projectId;

    this.projectId = this.projectData.projectId; //项目id
    this.uploadParamData.projId = this.projectId;
    this.publicData.projectId = this.projectId;
    this.publicData.projectCreatBy = this.projectData.createBy; //项目创建人

    //把上一页的搜索条件显示出来
    this.mySearch.searchList.conKey = this.searchedTerm.searchList.conKey;
    this.mySearch.searchList.proStage = this.searchedTerm.searchList.proStage;
    this.mySearch.searchList.titleKey = this.searchedTerm.searchList.titleKey;
    this.mySearch.searchList.docType = this.searchedTerm.searchList.docType;
    this.mySearch.searchList.starTime = this.searchedTerm.searchList.starTime;
    this.mySearch.searchList.endTime = this.searchedTerm.searchList.endTime;
    this.$forceUpdate();
    this.queryStage();
  },
  mounted() {
    // this.termQueryDoc();//根据上一页的条件查询
    this.queryDoc();
    this.queryPerson();
    this.getTableHeight();
    window.addEventListener("scroll", this.handleScroll, true);
  },
  watch: {
    currentPage(newV, oldV) {
      this.mySearch.pageNo = newV - 1;
    },
    testCanSetDraftTimes(newVal, oldVal) {
      if (this.testCanSetDraftTimes == this.folderTotal) {
        this.docRelation();
      }
    }
  },
  methods: {
    // 点击全选复选框
    handleSelectAll(selection){
        selection.length
          ? this.$select.handleFileSelect(1,this.publicData.projectId, this.publicData.projectId, selection)
          : this.$select.handleCancel(1,this.publicData.projectId, this.publicData.projectId, this.docInitList)
    },
    // 点击单个复选框
    handleSelectDoc(selection,row){
      this.$select.fileSelect(1,this.publicData.projectId, this.publicData.projectId, selection,row)
    },
    selectedDocList() {
      //已选文件列表
    },
    cancelSelect() {
      //取消选中
    },
    reviseBtn() {
      //修订
      this.examTitle = "文件修订审批";
      this.examType = "10";
      this.getDocFlowChart(10);
    },
    remarkBtn() {
      //备注
      this.remarkIsShow = true;
    },
    remarkClose() {
      this.remarkIsShow = false;
    },
    approvalHandle() {
      if (!this.docExamselectedDoc.length) {
        this.$message.warning("请选择文件");
        return;
      }
      let selectData = this.docExamselectedDoc;
      let filesId = selectData.map(v => {
        return v.id;
      });
      let commentData = {
        docSource: 1,
        attach: filesId,
        projectId: this.publicData.projectId
      };
      this.$store.commit("approvalCommentsFn", commentData);
    },
    // 索引列表弹框
    projectIndexHandle() {
      if (!this.docExamselectedDoc.length) {
        this.$message.warning("请选择文件");
        return;
      }
      let selectData = this.docExamselectedDoc;
      // docType 0 为文件，1文件夹
      let proFileIds = [],
        proFileDirIds = [],
        createBy = [];
      selectData.forEach(v => {
        if (v.docType == 0) {
          proFileIds.push(v.id);
          createBy.push(v.createBy);
        } else {
          proFileDirIds.push(v.id);
        }
      });
      console.log('proFileDirIds', proFileDirIds)
      let obj = {
        projectId: this.publicData.projectId, // 项目ID
        proFileIds: proFileIds.toString(), //文件ID集合
        proFileDirIds: proFileDirIds.toString(), //文件夹id集合
        createBy: createBy.toString()
      };
      console.log(proFileIds, proFileDirIds, obj, 366);
      this.projectIndexData = obj;
      this.projectIndexShow = true;
    },
    // 索引返回
    sendProjectHandle(val) {
      var data = JSON.parse(val.data);
      console.log("索引返回", data, val);
      this.positionDocId = val.docId; //文件id
      this.publicData.projectId = data.projectId; //项目id
      this.publicData.processName = data.stageName;
      this.publicData.processId = data.auditProjectId; //项目阶段ID
      this.uploadParamData.auditProjectId = data.auditProjectId; //上传时用到的项目阶段ID
      this.publicData.docParentId = data.parentId; //所在目录ID 0 为顶级目录
      this.copySourceData.parentId = data.parentId; //复制剪切目标父级ID
      this.uploadParamData.parentId = data.parentId; //上传目标父级ID
      this.bread_crumbs[0].parentId = data.parentId;
      this.search.pageNo = data.nowPage; //文件所在页码
      this.queryDoc();
    },
    // 目录状态选择
    dirStateChangeData(val) {
      this.ChangeData.dirStateChange = val;
    },
    // 文件状态选择
    fileStateChangeData(val) {
      this.ChangeData.fileStateChange = val;
    },
    fileTypesChangeData(val) {
      this.ChangeData.fileTypesChange = val;
    },
    //表格排序
    tableSortChange() {},
    getTableHeight() {
      window.setTimeout(() => {
        this.tableHeight =
          (window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight) -
          $(".pro-doc-operation li").innerHeight() -
          10 -
          38 -
          68 -
          84;
      }, 300);
    },
    //  搜索区
    showAllBtn(type) {
      switch (type) {
        case 0: // 展开阶段
          this.moreStageDisable = !this.moreStageDisable;
          this.packBtnVisible = true;
          break;
        case 1: // 展开搜索条件
          this.moreSearchDisable = !this.moreSearchDisable;
          this.moreSearchAutoH = !this.moreSearchAutoH;
          this.packSearchVisible = true;
          break;
        case 2: // 展开工具栏
          this.moreHandleDisable = !this.moreHandleDisable;
          this.packHandleVisible = true;
          window.setTimeout(() => {
            this.tableHeight =
              (window.innerHeight ||
                document.documentElement.clientHeight ||
                document.body.clientHeight) -
              $(".newremind").innerHeight() -
              38 -
              68 -
              84;
          }, 500);
          break;
      }
    },
    // 关闭搜索区
    packUpBtn(type) {
      switch (type) {
        case 0: // 收起阶段
          this.packBtnVisible = false;
          this.moreStageDisable = false;
          break;
        case 1: // 收起搜索条件
          this.packSearchVisible = false;
          this.moreSearchDisable = false;
          this.moreSearchAutoH = false;
          break;
        case 2: // 收起工具栏
          this.packHandleVisible = false;
          this.moreHandleDisable = false;
          this.getTableHeight();
          break;
      }
    },
    //上传新版本
    docUploadVersion(uploadData) {
      let vm = this;
      let data = {
        pageNo: 0,
        pageSize: 10,
        token: this.token,
        userId: this.userId,
        data: {
          docId: uploadData.fileData.data.docId,
          docName: uploadData.fileData.name,
          projId: uploadData.fileData.data.projId,
          docSize: uploadData.fileData.size,
          updateBy: this.userId,
          docRfs: uploadData.fileData.rfsId
        }
      };
      this.$post("/doc/project/addDocVersion", data)
        .then(response => {
          if (vm.success_code == response.code) {
            this.$refs["RdUploader"].handleUploadSuccess(uploadData.tId);

            // vm.$refs.versionUploadRef.uploadComplete();
            this.handleUpdateList(uploadData);
          } else {
            vm.$message.error(response.msg);
          }
          //vm.versionUploadAddDocClose();
        })
        .catch(function(error) {});
    },
    handleUpdateList(uploadData) {
      if (
        uploadData.fileData.data.parentId !== this.publicData.docParentId ||
        uploadData.fileData.data.projId !== this.publicData.projectId ||
        uploadData.fileData.data.auditProjectId !== this.publicData.processId
      ) {
        return;
      }
      this.dbClickQueryDoc();
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.table.toggleRowSelection(row);
        });
      } else {
        this.$refs.table.clearSelection();
      }
    },
    //毫秒转为标准日期
    toDate(number) {
      var date = new Date(number);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      return Y + M + D;
    },
    rowClass({ row, rowIndex }) {
      if (!this.selectedDoc) return;
      if (this.selectedDoc.includes(row)) {
        return { "background-color": "rgba(244,246,249,1)" };
      }
    },
    //双击
    getDblClickId(row, event, column) {
      if(column.type==="selection") return
      if (row.docType == 1) {
        this.isSearch = false;
        for (var i = 0; i < this.bread_crumbs.length; i++) {
          if (row.id == this.bread_crumbs[i].parentId) {
            return;
          }
        }
        this.bread_crumbs.push({
          title: row.docName,
          parentId: row.id
        });
        this.currentPage = 1;
        this.mySearch.pageNo = 0;
        if (row.delAllow == 0) {
          let name = row.docName;
          console.log("阶段666", this.stageList);
          for (var i = 0; i < this.stageList.length; i++) {
            if (this.stageList[i].name == name) {
              // $('.stage-list li a').removeClass('cur');
              // $('.stage-list li').eq(i).children().addClass('cur');
              this.publicData.processId = this.stageList[i].id;
              // this.bread_crumbs[0].parentId = this.stageList[i].id;
              this.uploadParamData.auditProjectId = this.stageList[i].id;
              // this.mySearch.searchList.proStage = this.stageList[i].id;
              this.stageList[i].sealFlag == 1
                ? (this.stageIsPlaceFile = true)
                : (this.stageIsPlaceFile = false);
            }
          }
          this.publicData.docParentId = row.id;
          this.uploadParamData.parentId = row.id;
          this.publicData.pathNameList.push(row.docName);
          this.copySourceData.parentId = row.id; //目标父级ID
          this.$store.commit("projectDocPaste", this.copySourceData);
          this.dbClickQueryDoc();
        } else {
          this.publicData.processId = row.auditProjectId;
          this.publicData.docParentId = row.id;
          this.uploadParamData.parentId = row.id;
          this.publicData.pathNameList.push(row.docName);
          this.copySourceData.parentId = row.id; //目标父级ID
          // this.bread_crumbs[0].parentId = row.id;
          this.$store.commit("projectDocPaste", this.copySourceData);
          this.dbClickQueryDoc();
        }
      } else {
        //双击预览
        this.canOperating({ docId: row.id, view: true }, "view").then(res => {
          if (res) {
            var proViewData = {
              projectId: this.projectData.projectId,
              rfsId: row.rfsId,
              docId: row.docId,
              photoType: row.type,
              sourceType: "projectDoc",
              docName: row.docName
            };
            sessionStorage.setItem("proDocViewDownId", row.id);
            this.$store.commit("previewAllFn", proViewData);
          }
        });
      }
    },
    uploadVsion() {
      console.log("parent new version");

      if (this.stageIsAll) {
        this.$message.warning("全部阶段下的文件不允许上传新版本");
        return;
      }
      if (this.selectedDoc.length > 1 || this.selectedDoc.length == 0) {
        this.$message.warning("只能对一个文件上传新版本");
        return;
      }
      let curData = this.selectedDoc[0];

      if (curData["docType"] != "0") {
        this.$message.warning("文件夹不支持上传新版本，请选择文件");
        return;
      }
      if (curData.lockState != "-1") {
        this.$message.warning("文件已锁定，不允许上传新版本");
        return;
      }

      let hasPower = this.$utils.checkProjectPermissionAjax(
        this.publicData.projectId,
        "project_file_upload"
      );

      console.log("hasPower", hasPower);

      if (!hasPower.data) {
        this.$message.error(hasPower.msg);
        return;
      }

      let arr = [];
      arr.push(this.selectedDoc[0].id);

      let stateCheckResult = this.checkDocStatusAjax(arr, 2);

      console.log("stateCheckResult", stateCheckResult);

      if (!stateCheckResult.data) {
        this.$message.error(stateCheckResult.msg);
        return;
      }
      this.versionIsShow = false;
      let accept = "";
      let type = curData.type;

      if (type == "doc" || type == "docx") {
        accept = "doc,docx";
      } else if (type == "xls" || type == "xlsx") {
        accept = "xls,xlsx";
      } else if (type == "rtf") {
        accept = "doc,docx,rtf";
      } else {
        accept = type;
      }

      let data = {
        projId: curData.projectId,
        docSource: 0, // 项目文档
        docId: curData.docId,
        parentId: curData.parentId,
        auditProjectId: curData.auditProjectId
      };
      let options = {
        multiple: false,
        accept: accept
      };

      this.$refs["RdUploader"].openSelect(options, data, true);
    },
    //删除，重命名，上传新版本前文件状态判断

    checkDocStatusAjax(seleFileIds, doType) {
      let params = {
        token: this.token,
        userId: this.userId,
        data: {
          ids: seleFileIds, //选中的文件和文件夹的id集合
          doType: doType //操作类型（0删除1重命名2上传新版本）
        }
      };
      let result = { data: false, msg: "当前无权限" };

      $.ajax({
        url: window.allUrl + "/doc/project/docStatus",
        type: "POST",
        async: false,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(params),
        success: res => {
          if (this.success_code !== res.code) {
            result = { data: false, msg: res.msg };
            return;
          }
          result = { data: true };
        },
        error: function(e) {
          result = { data: false, msg: "系统异常，请刷新重试" };
        }
      });

      return result;
    },
    //  判断选中的列表是否可进行复制剪切（已锁定，审核中的文件不能进行复制剪切）
    async canCopyOrCut(seleFileIds, seleFolderIds, arr) {
      var _this = this;
      var send_data = {
        token: this.token,
        userId: this.userId,
        data: {
          doc: seleFileIds.join(","), //文件id
          dir: seleFolderIds.join(","), //文件夹id
          projId: this.publicData.projectId, //项目id
          ids: arr.join(",") //选中的文件和文件夹的id集合
        }
      };
      var data = await _this
        .$post("/doc/project/projectPaperIsCut", send_data)
        .then(response => {
          if (_this.success_code == response.code) {
            return true;
          } else {
            _this.$message({
              message: response.msg,
              type: "error"
            });
            return false;
          }
        })
        .catch(function(error) {});
      return data;
    },
    //获取项目成员列表
    queryPerson() {
      let vm = this;
      let data = {
        token: this.token,
        userId: this.userId,
        data: {
          projectId: this.publicData.projectId
        }
      };
      this.$post("/info/project/getMemberAll", data)
        .then(response => {
          if (vm.success_code == response.code) {
            vm.powerSetData = response.data;
          }
        })
        .catch(function(error) {});
    },
    //根据阶段ID查询对应文件夹的ID
    queryDocId(callBack) {
      let vm = this;
      let data = {
        token: this.token,
        userId: this.userId,
        data: {
          projectId: this.publicData.projectId,
          stageName: this.publicData.processName
        }
      };
      this.$post("/doc/project/queryByStageName", data)
        .then(response => {
          if (vm.success_code == response.code) {
            vm.publicData.docParentId = response.data;
            vm.uploadParamData.parentId = response.data;
            vm.bread_crumbs[0].parentId = response.data;
            vm.copySourceData.parentId = response.data; //目标父级ID
            vm.$store.commit("projectDocPaste", vm.copySourceData);
          } else {
            vm.copySourceData.parentId = 0; //目标父级ID
            vm.$store.commit("projectDocPaste", vm.copySourceData);
            vm.publicData.docParentId = 0;
            vm.bread_crumbs[0].parentId = 0;
            vm.uploadParamData.parentId = 0;
          }
          callBack && callBack();
        })
        .catch(function(error) {});
    },
    //  点击面包屑返回目录
    backDir(item) {
      this.isSearch = false;
      let index = this.bread_crumbs.findIndex(
        v => v.parentId === item.parentId
      );
      if (
        index == this.bread_crumbs.length - 1 &&
        this.bread_crumbs.length == 1
      ) {
        this.isSearch = true;
        this.publicData.processId = "";
        this.stageIsAll = true;
        this.publicData.docParentId = 0;
        this.copySourceData.parentId = 0;
        // this.currentPage = 1;
        // this.mySearch.pageNo = 0;
        // this.publicData.docParentId = 0;
        // this.dbClickQueryDoc();
        return;
      } else {
        this.currentPage = 1;
        this.mySearch.pageNo = 0;
        if (item.title == "根目录" && item.parentId == 0) {
          this.isSearch = true;
          this.publicData.processId = "";
          this.stageIsAll = true;
          $(".stage-list li a").removeClass("cur");
          $(".stage-list li a")
            .eq(0)
            .addClass("cur");
          this.publicData.docParentId = 0;
          this.copySourceData.parentId = 0;
          this.bread_crumbs.splice(index + 1);
          // this.queryDocId(this.dbClickQueryDoc);
          this.queryDoc();
        } else {
          this.publicData.docParentId = item.parentId;
          this.copySourceData.parentId = item.parentId;
          this.bread_crumbs.splice(index + 1);
          if (this.isSearch) {
            this.queryDoc();
          } else {
            this.dbClickQueryDoc();
          }
        }
      }
    },
    // 搜索功能 1
    queryDocBtn(state) {
      let data = {
        token: this.token,
        userId: this.userId,
        data: {}
      };
      let dataArr;
      if (state) {
        dataArr = {
          k: this.mySearch.searchList.titleKey
        };
        return;
      }
      console.log(this.ChangeData); // 下拉选框数据
      dataArr = {
        k: this.mySearch.searchList.titleKey, // 标题关键词
        s: this.mySearch.searchList.conKey, // 内容关键词
        p: this.mySearch.searchList.proStage, //项目阶段
        starTime: this.mySearch.searchList.starTime,
        end: this.mySearch.searchList.endTime
      };
      this.queryStage(data);
    },
    // 搜索功能 2
    queryStage() {
      let data = {
        token: this.token,
        userId: this.userId,
        data: data
      };
      return;
      this.$post("/info/project/getImplementStageList", data)
        .then(response => {
          if (that.success_code == response.code) {
            let data = response.data;
            that.stageList = data;
            for (let i = 0; i < data.length; i++) {
              that.mySearch.proStageList.push(data[i]);
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //当前页面查询
    queryDoc() {
      let vm = this;
      this.bread_crumbs = [{ title: "根目录", parentId: 0 }]; //路径
      let startTime = this.dateToMs(this.mySearch.searchList.starTime) || "";
      let endTime =
        this.dateToMs(this.mySearch.searchList.endTime) + 86400000 || "";
      let data = {
        token: this.token,
        userId: this.userId,
        pageNo: this.mySearch.pageNo,
        pageSize: this.mySearch.pageSize,
        data: {
          projectId: this.projectData.projectId,
          docContent: this.mySearch.searchList.conKey,
          auditProjectId: this.mySearch.searchList.proStage, //项目阶段ID
          // "parentId": this.publicData.docParentId,//所在目录ID
          docName: this.mySearch.searchList.titleKey, //文件或者目录名称
          beginTime: startTime, //文件创建开始时间
          endTime: endTime, //文件创建结束时间
          suffix: this.mySearch.searchList.docType,
          isSearch: this.isSearch
        }
      };
      this.$post("/doc/project/query", data)
        .then(response => {
          if (vm.success_code == response.code) {
            let data = response.data;
            vm.docInitList = data.content;
            vm.docTypeIcon(vm.docInitList);
            vm.showSmallbell();
            vm.mySearch.dataCount = response.data.totalElements;
            vm.mySearch.pageCount = response.data.totalPages;
            for (var i = 0; i < vm.docInitList.length; i++) {
              vm.docInitList[i]["docSize"] = vm.handleFileSize(
                vm.docInitList[i]["docSize"]
              );
              vm.docInitList[i]["myIndex"] = i;
              vm.docInitList[i]["checked"] = false;
            }
          }
        })
        .catch(function(error) {});
    },
    //根据上一页的条件实现查询
    termQueryDoc() {
      let vm = this;
      let startTime = this.searchedTerm.searchList.starTime;
      let endTime = this.searchedTerm.searchList.endTime;
      let data = {
        token: this.token,
        userId: this.userId,
        pageNo: 0,
        pageSize: 10,
        data: {
          projectId: this.projectData.projectId,
          docContent: this.searchedTerm.searchList.conKey,
          auditProjectId: this.projectData.processId,
          //"parentId": 1,所在目录ID
          docName: this.searchedTerm.searchList.titleKey, //文件或者目录名称
          beginTime: startTime, //文件创建开始时间
          endTime: endTime, //文件创建结束时间
          suffix: this.searchedTerm.searchList.docType,
          isSearch: true
        }
      };
      this.$post("/doc/project/query", data)
        .then(response => {
          if (vm.success_code == response.code) {
            let data = response.data;
            vm.docInitList = data.content;
            vm.docTypeIcon(vm.docInitList);
            vm.showSmallbell();
            vm.mySearch.dataCount = response.data.totalElements;
            vm.mySearch.pageCount = response.data.totalPages;
            for (var i = 0; i < vm.docInitList.length; i++) {
              vm.docInitList[i]["docSize"] = vm.handleFileSize(
                vm.docInitList[i]["docSize"]
              );
              vm.docInitList[i]["myIndex"] = i;
              vm.docInitList[i]["checked"] = false;
            }
          }
        })
        .catch(function(error) {});
    },
    //双击文件夹查询
    dbClickQueryDoc() {
      console.log("1111111111111查询");
      let vm = this;
      let startTime = this.dateToMs(this.mySearch.searchList.starTime) || "";
      let endTime =
        this.dateToMs(this.mySearch.searchList.endTime) + 86400000 || "";
      // this.isSearch = false;
      let data = {
        token: this.token,
        userId: this.userId,
        pageNo: this.mySearch.pageNo,
        pageSize: this.mySearch.pageSize,
        data: {
          projectId: this.projectData.projectId,
          docContent: "",
          // "auditProjectId":this.publicData.processId,//项目阶段ID
          auditProjectId: "",
          parentId: this.publicData.docParentId, //所在目录ID
          docName: "", //文件或者目录名称
          beginTime: "", //文件创建开始时间
          endTime: "", //文件创建结束时间
          suffix: ""
        }
      };
      this.$post("/doc/project/query", data)
        .then(response => {
          if (vm.success_code == response.code) {
            let data = response.data;
            vm.docInitList = data.content;
            vm.docTypeIcon(vm.docInitList);
            vm.showSmallbell();
            vm.mySearch.dataCount = response.data.totalElements;
            vm.mySearch.pageCount = response.data.totalPages;

            for (var i = 0; i < vm.docInitList.length; i++) {
              vm.docInitList[i]["docSize"] = vm.handleFileSize(
                vm.docInitList[i]["docSize"]
              );
              vm.docInitList[i]["myIndex"] = i;
              vm.docInitList[i]["checked"] = false;
            }
          }
        })
        .catch(function(error) {});
    },
    toogleExpand(row) {
      let $table = this.$refs.table;
      this.docInitList.map(item => {
        if (row.id != item.id) {
          $table.toggleRowExpansion(item, false);
        }
      });
      $table.toggleRowExpansion(row);
    },
    //改变项目阶段
    changeProStage() {},
    //改变文件类型
    changeDocType() {},
    //分页
    handleSizeChange(val) {
      this.mySearch.pageSize = val;
      this.currentQueryDoc = true;
      this.mySearch.pageNo = 0;
      this.currentPage = 1;
      // this.queryDoc();
      if (this.isSearch) {
        this.queryDoc();
      } else {
        this.dbClickQueryDoc();
      }
    },
    handleCurrentChange(val) {
      this.mySearch.pageNo = val - 1;
      this.currentQueryDoc = true;

      // this.isSearch = '';
      if (this.isSearch) {
        this.queryDoc();
      } else {
        this.dbClickQueryDoc();
      }
    },
    //重置
    reset() {
      this.mySearch.searchList.titleKey = "";
      this.mySearch.searchList.conKey = "";
      this.mySearch.searchList.proStage = "";
      this.mySearch.searchList.docType = "";
      this.mySearch.searchList.starTime = "";
      this.mySearch.searchList.endTime = "";
      this.$refs.child.clearSel();
      this.$refs.child1.clearSel();
      this.$refs.child2.clearSel();
    },
    docLocationBtn(item) {
      var that = this;
      // var id = item.docType == 0 ? item.docId : item.id;
      var data = {
        token: that.token,
        userId: that.userId,
        data: {
          id: item.id,
          projectId: item.projectId,
          chatOrMsg: 0
          // "docName": item.docName // 文档或文件夹名字
          // "docType": item.docType
        }
      };
      console.log(item, 66666);
      that
        .$post("/doc/project/position", data)
        .then(response => {
          var data = response.data;
          if (that.success_code == response.code) {
            that.$router.push({
              path: "/projectDoc",
              query: {
                docId: item.id,
                projectId: item.projectId,
                isPosition: true,
                data: JSON.stringify(response.data)
              }
            });
          } else if (response.code == -1002) {
            that.$message.warning("文件已被删除");
          } else {
            that.$message.warning(response.msg);
          }
        })
        .catch(function(error) {});
    },
    //中国标准时间转为毫秒
    dateToMs(date) {
      let result = new Date(date).getTime();
      return result;
    },
    // 讨论
    getDiscuss() {
      if (this.selectedDoc.length == 0) {
        this.$message({
          message: "请选择一条数据",
          type: "warning"
        });
        return;
      }
      this.docDiscuss();
    },
    docDiscuss() {
    //   if (!this.$store.state.proChatIsShow) {
    //     this.$message.warning("当前无权限");
    //     return;
    //   }
      if (this.selectedDoc.length > 1) {
        this.$message.warning("多文件无法操作，请重新选择");
        return;
      }
      this.$router.push({
        path: "/projecchat",
        query: {
          docData: JSON.stringify(this.selectedDoc[0])
        }
      });
    },
    //  判断用户是否有权限进行某一操作
    async canOperating(param, flag) {
      if (this.publicData.projectCreatBy == this.userId) {
        return true;
      } else {
        if (!param) {
          return;
        }
        // this.queryPersonPower();
        var _this = this;
        var send_data = {
          token: this.token,
          userId: this.userId,
          data: {
            ids: param.docId,
            key: flag,
            docSource: 0
          }
        };
        // send_data.data = $.extend({}, param, send_data.data);
        var data = await _this
          .$post("/doc/paper/validateFilePermByUserId", send_data)
          .then(response => {
            if (_this.success_code == response.code) {
              // var data = JSON.parse(response.data.permsType);
              if (!response.data) {
                _this.$message({
                  message: "您没有该操作权限，请联系项目管理人员配置权限",
                  type: "error"
                });
                return false;
              } else {
                return true;
              }
            } else {
              _this.$message({
                message: "您没有该操作权限，请联系项目管理人员配置权限",
                type: "error"
              });
              return false;
            }
          })
          .catch(function(error) {});
      }
      return data;
    },
    // 选中文件
    handleSelectionChange(val) {
      this.getvalue = val;
      this.selectedDoc = val;
      this.docExamselectedDoc = val;
    },
    //下载
    downloadFile() {
      if (this.selectedDoc.length == 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }

      var download_arr = [];
      var docId = [];
      for (var i = 0; i < this.selectedDoc.length; i++) {
        if (this.selectedDoc[i]["docType"] != "0") {
          this.$message.warning("文件夹不支持下载，请选择下载文件");
          return;
        }
        // pc端下载
        if (this.$store.state.isPC) {
          download_arr.push({
            docId: this.selectedDoc[i].docId,
            docType: this.selectedDoc[i].docType,
            id: this.selectedDoc[i].id,
            docName: this.selectedDoc[i].docName,
            source: 0, // 文件源： 1底稿 0项目文档 2客户文档
            parentId: this.selectedDoc[i].parentId,
            projectId: this.selectedDoc[i].projectId
          });
        } else {
          // web端下载
          download_arr.push({
            name: this.selectedDoc[i].docName,
            id: this.selectedDoc[i].docId
          });
        }
        docId.push(this.selectedDoc[i].id);
        // pc不需要记录
        !this.$store.state.isPC &&
          this.downloadNotes(this.selectedDoc[i].docName);
      }
      this.canOperating(
        {
          docId: docId.join(","),
          download: this.permsType["download"]
        },
        "download"
      ).then(res => {
        if (res) {
          this.$store.commit("download", download_arr);
        }
      });
    },
    //记录下载日志
    downloadNotes(name) {
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          projectId: this.publicData.projectId,
          docName: name
        }
      };
      this.$post("/doc/project/log/addDownload", data)
        .then(response => {})
        .catch(function(error) {});
    },
    sendDelete(arr) {
      let vm = this;
      let data = {
        token: this.token,
        userId: this.userId,
        data: {
          docIds: arr.join(",")
        }
      };
      // this.$confirm(
      //     "确认要把文件放入回收站吗?删除的文件可随时通过回收站还原",
      //     "提示",
      //     {
      //         confirmButtonText: "确定",
      //         cancelButtonText: "取消",
      //         type: "warning"
      //     }
      // )
      //     .then(() => {
      vm.$post("/doc/project/deleteProjectDoc", data)
        .then(response => {
          if (vm.success_code == response.code) {
            vm.$message({
              message: "删除成功",
              type: "success"
            });
            // vm.search.pageNo = 0;
            this.draftDetailBtn = false;
            if (this.isSearch) {
              this.queryDoc();
            } else {
              this.dbClickQueryDoc();
            }
          } else {
            vm.$message({
              message: response.msg,
              type: "error"
            });
          }
        })
        .catch(function(error) {});
      // })
      // .catch(() => {
      //     vm.$message({
      //         type: "info",
      //         message: "已取消删除"
      //     });
      // });
    },
    //删除，重命名，上传新版本前文件状态判断
    async docStateJudge(seleFileIds, doType) {
      this.indexDetailsIds = [];
      var send_data = {
        token: this.token,
        userId: this.userId,
        data: {
          ids: seleFileIds, //选中的文件和文件夹的id集合
          doType: doType //操作类型（0删除1重命名2上传新版本）
        }
      };
      var data = await this.$post("/doc/project/docStatus", send_data)
        .then(response => {
          if (this.success_code == response.code) {
            if (response.data != undefined) {
              if (response.data.isLinked) {
                this.indexDetailsIds = response.data.ids;
              }
            }
            return response;
          } else {
            this.$message({
              message: response.msg,
              type: "warning"
            });
            return response;
          }
        })
        .catch(function(error) {});
      return data;
    },
    //获取引用被索引详情
    getDraftDetails() {
      let data = {
        token: this.token,
        userId: this.userId,
        data: {
          ids: this.indexDetailsIds
        }
      };
      this.$post("/doc/project/docDetails", data)
        .then(response => {
          if (this.success_code == response.code) {
            this.indexTableData = response.data;
            this.docTypeIcon(this.indexTableData);
            this.indexIsShow = true;
          } else {
            this.$message({
              message: response.msg,
              type: "error"
            });
          }
        })
        .catch(function(error) {});
    },
    docTypeIcon(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].type == "" || data[i].docType == 1) {
          data[i][
            "fileIcon"
          ] = require("../../common/fileIcon/FolderType1.png");
        } else {
          var hz_name = data[i].type.toLowerCase();
          if (hz_name == "doc" || hz_name == "docx" || hz_name == "rtf") {
            data[i]["fileIcon"] = require("../../common/fileIcon/DocType.png");
          } else if (
            hz_name == "xls" ||
            hz_name == "xlsx" ||
            hz_name == "excel"
          ) {
            data[i]["fileIcon"] = require("../../common/fileIcon/XlsType.png");
          } else if (
            hz_name == "ppt" ||
            hz_name == "pptx" ||
            hz_name == "pps" ||
            hz_name == "ppsx" ||
            hz_name == "ppsm"
          ) {
            data[i]["fileIcon"] = require("../../common/fileIcon/PptType.png");
          } else if (
            hz_name == "jpg" ||
            hz_name == "jpeg" ||
            hz_name == "gif" ||
            hz_name == "bmp" ||
            hz_name == "png"
          ) {
            data[i]["fileIcon"] = require("../../common/fileIcon/ImgType.png");
          } else if (
            hz_name == "wmv" ||
            hz_name == "avi" ||
            hz_name == "dat" ||
            hz_name == "asf" ||
            hz_name == "rm" ||
            hz_name == "rmvb" ||
            hz_name == "mpg"
          ) {
            data[i][
              "fileIcon"
            ] = require("../../common/fileIcon/VideoType.png");
          } else if (
            hz_name == "mpeg" ||
            hz_name == "mkv" ||
            hz_name == "dvix" ||
            hz_name == "dv" ||
            hz_name == "flv" ||
            hz_name == "mov" ||
            hz_name == "mp4" ||
            hz_name == "qt" ||
            hz_name == "smil" ||
            hz_name == "swf" ||
            hz_name == "wmv" ||
            hz_name == "3gp"
          ) {
            data[i][
              "fileIcon"
            ] = require("../../common/fileIcon/VideoType.png");
          } else if (
            hz_name == "mp3" ||
            hz_name == "wav" ||
            hz_name == "wma" ||
            hz_name == "mid"
          ) {
            data[i][
              "fileIcon"
            ] = require("../../common/fileIcon/MusicType.png");
          } else if (hz_name == "pdf") {
            data[i]["fileIcon"] = require("../../common/fileIcon/PdfType.png");
          } else if (hz_name == "indd") {
            data[i]["fileIcon"] = require("../../common/fileIcon/indd.png");
          } else if (hz_name == "ai") {
            data[i]["fileIcon"] = require("../../common/fileIcon/ai.png");
          } else if (hz_name == "psd") {
            data[i]["fileIcon"] = require("../../common/fileIcon/ps.png");
          } else if (hz_name == "tif") {
            data[i]["fileIcon"] = require("../../common/fileIcon/tiff.png");
          } else if (hz_name == "zip" || hz_name == "rar") {
            data[i]["fileIcon"] = require("../../common/fileIcon/RarType.png");
          } else {
            data[i]["fileIcon"] = require("../../common/fileIcon/other.png");
          }
        }
      }
    },
    //版本关闭
    versionIs(val) {
      this.versionIsShow = val;
    },
    //版本开启
    visionBtn() {
      this.versionIsShow = true;
      return;
      if (this.selectedDoc.length == 0 || this.selectedDoc.length > 1) {
        this.$message({
          message: "请选择一条数据",
          type: "warning"
        });
      } else {
        let flag = 1;
        for (var i = 0; i < this.selectedDoc.length; i++) {
          if (this.selectedDoc[i]["docType"] != "0") {
            flag = 2;
          }
        }
        if (flag == 2) {
          this.$message({
            message: "文件夹不支持该功能，请选择文件",
            type: "warning"
          });
        } else {
          var _this = this;
          var send_data = {
            token: this.token,
            userId: this.userId,
            pageNo: 0,
            pageSize: 10,
            data: {
              docId: this.selectedDoc[0].docId
            }
          };
          this.$post("/doc/project/getDocVersionList", send_data)
            .then(response => {
              if (_this.success_code == response.code) {
                _this.docVersionlist = response.data;
                _this.versionIsShow = true;
              } else {
                _this.$message({
                  message: response.msg,
                  type: "error"
                });
              }
            })
            .catch(function(error) {});
        }
      }
    },
    //关闭版本弹窗
    versionClose() {
      this.versionIsShow = false;
    },
    //设为底稿
    docRelationBtn() {
      this.filterSetDraftDoc = 0; //每次点击“设为底稿”按钮时如果有选中的文件夹，把验证出的空目录、含有设为底稿文件的
      this.hasSetedDoc = false; //选中的文件中是否有已设为底稿的文件
      this.toDocRelationList = [];
      this.folderTotal = 0;
      this.testCanSetDraftTimes = 0;
      if (this.selectedDoc.length == 0) {
        this.docRelationIsShow = true;
        this.$refs.docRelationObj.getTreeDataFnProDoc(this.toDocRelationList);
        this.$refs.docRelationObj.getTreeDataFn();
      } else {
        for (var i = 0; i < this.selectedDoc.length; i++) {
          if (this.selectedDoc[i].docType == 0) {
            //文件
            if (this.selectedDoc[i].isLink != 1) {
              this.toDocRelationList.push(this.selectedDoc[i]);
            } else {
              this.hasSetedDoc = true;
            }
          } else {
            //文件夹
            this.folderTotal++;
            this.testFolderHasSeted(this.selectedDoc[i]).then(res => {
              if (!res) {
                // this.toDocRelationList.push(this.selectedDoc[i-1]);
                // console.log('存起来的')
              } else {
                // return;
              }
            });
            // this.docRelation();
          }
        }
        if (this.folderTotal == 0) {
          this.docRelation();
        }
      }
    },
    docRelation() {
      if (this.filterSetDraftDoc != 0 || this.hasSetedDoc) {
        this.$confirm(
          "已自动过滤空目录、已设为底稿的文件和包含已设为底稿文件的文件夹",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            // this.toDocRelationList = [];
            this.docRelationIsShow = true;
            this.$refs.docRelationObj.getTreeDataFnProDoc(
              this.toDocRelationList
            );
            this.$refs.docRelationObj.getTreeDataFn();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      } else {
        this.toDocRelationList = this.$utils.copyObj(this.selectedDoc);
        this.docRelationIsShow = true;
        this.$refs.docRelationObj.getTreeDataFnProDoc(this.toDocRelationList);
        this.$refs.docRelationObj.getTreeDataFn();
      }
    },
    //验证该文件夹中的子文件（子文件夹）是否已经被设为底稿
    async testFolderHasSeted(item) {
      let sendData = {
        token: this.token,
        userId: this.userId,
        projectId: this.publicData.projectId,
        data: {
          id: item.id
        }
      };
      var data = await this.$post("/doc/project/validateDirIsLink", sendData)
        .then(response => {
          if (this.success_code == response.code) {
            console.log("通过");
            this.testCanSetDraftTimes++;
            this.toDocRelationList.push(item);
            return false;
          } else {
            console.log("不通过");
            this.filterSetDraftDoc++;
            this.testCanSetDraftTimes++;
            return true;
          }
        })
        .catch(function(error) {});
      return data;
    },
    docRelationClose() {
      this.docRelationIsShow = false;
      if (this.isSearch) {
        this.queryDoc();
      } else {
        this.dbClickQueryDoc();
      }
      // this.dbClickQueryDoc();
    },
    //根据项目id查询文件流程图信息
    getDocFlowChart(procTypeId) {
      let vm = this;
      let data = {
        data: {
          projId: this.publicData.projectId,
          procTypeId: procTypeId //文件审批为2，文件修订审批为10
        },
        token: this.token,
        userId: this.userId,
        projectId: this.publicData.projectId
      };
      this.$post("/info/service/getProcessInfoByProjId", data)
        .then(response => {
          if (vm.success_code == response.code) {
            let data = response.data || {};
            vm.docFlowChartData.modelId = data.actModelId || "";
            vm.docFlowChartData.deploymentId = data.procDeployId || "";
            vm.docFlowChartData.versionId = data.procVersionNum || "";
            vm.docFlowChartData.financingTypeId = data.finaTypeId || "";
            vm.docFlowChartData.categoryId = data.procTypeId || "";
            vm.docFlowChartData.docExamProcessName = data.procName || "";
            vm.docExamIsShow = true;
          } else {
            vm.$message({
              type: "warning",
              message: response.msg
            });
          }
        })
        .catch(function(error) {});
    },
    //文件审核
    docExamBtn() {
      this.examTitle = "文件审批";
      this.examType = "2";
      var hasFolder = false;
      var examIng = false;
      let totus = false;
      for (var i = 0; i < this.docExamselectedDoc.length; i++) {
        if (this.docExamselectedDoc[i].docType == 1) {
          hasFolder = true;
        }
        if (this.docExamselectedDoc[i].auditStatus == 0) {
          examIng = true;
        }
        if (this.docExamselectedDoc[i].lockState != -1) {
          totus = true;
        }
      }
      if (hasFolder) {
        this.$message({
          message: "请选择文件，非文件夹",
          type: "warning"
        });
      } else if (examIng) {
        this.$message({
          message: "该文件正在审批中，不能选择",
          type: "warning"
        });
      } else if (totus) {
        this.$message({
          message: "锁定中的文件不能再次发起审批，请重新选择",
          type: "warning"
        });
      } else {
        for (var i = 0; i < this.docExamselectedDoc.length; i++) {
          this.docExamselectedDoc[i].isShow = true;
          this.docExamselectedDoc[i].hasDownBtn = true;
        }
        this.getDocFlowChart(2);
      }
    },
    // 关闭文件审核弹窗
    docExamClose() {
      this.$refs.table.clearSelection();
      this.selectedDoc = [];
      this.docExamselectedDoc = [];
      this.docExamIsShow = false;
    },
    queryDocWay() {
      if (this.isSearch) {
        this.queryDoc();
      } else {
        this.dbClickQueryDoc();
      }
    },
    //根据项目id查询目录流程图信息
    getCatalogFlowChart() {
      let vm = this;
      let data = {
        data: {
          projId: this.publicData.projectId,
          procTypeId: 3 //目录为3
        },
        token: this.token,
        userId: this.userId,
        projectId: this.publicData.projectId
      };
      this.$post("/info/service/getProcessInfoByProjId", data)
        .then(response => {
          if (vm.success_code == response.code) {
            let data = response.data || {};
            vm.catalogFlowChartData.modelId = data.actModelId || "";
            vm.catalogFlowChartData.deploymentId = data.procDeployId || "";
            vm.catalogFlowChartData.versionId = data.procVersionNum || "";
            vm.catalogFlowChartData.financingTypeId = data.finaTypeId || "";
            vm.catalogFlowChartData.categoryId = data.procTypeId || "";
            vm.catalogFlowChartData.catalogExamProcessName =
              data.procName || "";
            vm.catalogExamIsShow = true;
            vm.$refs.catalogExam.initData();
            vm.queryPaperTree();
          } else {
            vm.$message({
              type: "warning",
              message: response.msg
            });
          }
        })
        .catch(function(error) {
          vm.$message({
            type: "warning",
            message: response.msg
          });
        });
    },
    //获取底稿目录
    queryPaperTree() {
      let vm = this;
      let data = {
        token: this.token,
        userId: this.userId,
        pageNo: 0,
        pageSize: 10,
        data: {
          projectId: this.publicData.projectId,
          parentId: 0
        }
      };
      this.$post("/doc/paper/query", data)
        .then(response => {
          if (vm.success_code == response.code) {
            vm.paperTreeData = response.data.content;
          }
        })
        .catch(function(error) {});
    },
    catalogExamClose() {
      this.catalogExamIsShow = false;
    },
    //设置提醒的弹框按钮
    setRemind() {
      if (this.selectedDoc.length == 0) {
        this.$message({
          message: "请选择一条数据",
          type: "warning"
        });
        return;
      }
      for (var i = 0; i < this.getvalue.length; i++) {
        if (this.getvalue[i].docType == 1) {
          this.$message.error("文件夹不可选");
          return;
        }
        this.choseDoclist.push({
          docName: this.getvalue[i].docName,
          id: this.getvalue[i].id,
          opersmall: this.getvalue[i].opersmall
        });
        this.chosefileIds.push(this.choseDoclist[i].id);
      }
      this.remindbox = true;
    },
    //小铃铛是否出现
    showSmallbell() {
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          projectId: this.publicData.projectId
        }
      };
      var _this = this;
      this.$post("/doc/project/reminderState", data)
        .then(response => {
          _this.smallbell = response.data;
          for (var k = 0; k < _this.docInitList.length; k++) {
            var item = _this.docInitList[k].id;
            //大于 -1 说明当前值包含在_this.smallbell中，只要满足就直接停止循环
            if (_this.smallbell.indexOf(item) > -1) {
              _this.$set(_this.docInitList[k], "opersmall", true);
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 删除提醒弹框中的文件
    deletefile(index) {
      this.selectedDoc.length = 0;
      this.chosefileIds.length = 0;
      this.choseDoclist.splice(index, 1);
      this.chosefileIds.splice(index, 1);
    },
    //点x关闭提醒
    closediloages() {
      this.chosefileIds.length = 0; // 文件列表id
      this.choseDoclist = []; //文件列表
      this.deployObj = []; //选择人员id
      this.strs = []; //选择角色id
      this.remindbox = false; //提醒弹框
      this.chosepersonIds = []; //选择人员id数组
    },
    //关闭提醒
    closeremind() {
      if (this.chosefileIds == "") {
        this.$message.error("未选中要关闭的文件");
        return;
      }
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          fileIds: this.chosefileIds
        }
      };
      var _this = this;
      this.$post("/doc/project/closeReminder", data)
        .then(response => {
          if (response.code == _this.success_code) {
            _this.remindbox = false;
            _this.choseDoclist = [];
            this.selectedDoc.length = 0;
            this.chosefileIds.length = 0;
            this.deployObj.length = 0;
            _this.$message.warning({
              message: "您已成功关闭本人设置的文件提醒"
            });
            this.isSearch ? this.queryDoc() : this.dbClickQueryDoc();
            // this.dbClickQueryDoc();
            // this.queryDoc();
          } else {
            _this.$message.error(response.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 开始设置提醒
    startsetRemind() {
      if (this.chosepersonIds.length == 0 && this.roleIds.length == 0) {
        this.$message.error("请在提醒人员中添加人员或者角色");
        return;
      }
      if (this.chosefileIds.length == 0) {
        this.$message.error("请重新选择要提醒的文件");
        return;
      }
      var datas = {
        data: {
          acceptIds: this.chosepersonIds, //人员id
          acceptMemberIds: this.roleIds, //角色id
          fileIds: this.chosefileIds, //文件id
          projectId: this.publicData.projectId //项目id
        },
        token: this.token,
        userId: this.userId
      };
      var _this = this;
      this.$post("/doc/project/reminder", datas)
        .then(response => {
          console.log(response.data);
          if (response.code == _this.success_code) {
            _this.remindbox = false;
            _this.$message.success({
              message: "文件设置提醒成功"
            });
            console.log(this.isSearch);
            this.isSearch ? this.queryDoc() : this.dbClickQueryDoc();
            //   this.queryDoc();
            // _this.dbClickQueryDoc();
            // _this.showSmallbell();
            this.chosefileIds = [];
            _this.choseDoclist = []; //文件列表
            _this.deployObj = []; //选择人员id
            _this.strs = []; //选择角色id
            _this.roleIds = [];
            _this.remindbox = false; //提醒弹框
            _this.chosepersonIds = []; //选择人员id数组
          } else {
            __this.$message.error(response.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //设置提醒的添加人员
    optPrinFn(num) {
      this.findFlag = true;
      this.user_num = num;
      console.log(this.user_num, this.deployObj, 66);
      if (num == 1) {
        this.findState = { state: 0 };
        this.checkState = { state: 2 };
        this.findUserObj = this.$utils.cloneDeepArray(this.deployObj);
      } else {
        this.findState = { state: 0 };
        this.checkState = { state: 2 };
        this.findUserObjM = this.$utils.cloneDeepArray(this.ccObj);
      }
    },
    roles() {
      var data = {
        pageNo: 0,
        pageSize: 20,
        token: this.token,
        userId: this.userId,
        data: {}
      };
      var _this = this;
      this.$post("/sys/getQueryRole", data)
        .then(response => {
          _this.roledata = response.data;
          _this.Role = { state: 2 };
          _this.$store.commit("setdatas", _this.setdata);
          _this.flags = true;
        })
        .catch(function(error) {});
    },
    //选择角色确定
    statesboxs(data) {
      this.setdata = data;
      if (this.strs !== "") {
        this.strs = Array.from(new Set(this.setdata));
        this.flags = false;
        var chgArr = [];
        for (var i = 0; i < this.strs.length; i++) {
          var flag = true;
          if (flag) {
            chgArr.push(this.strs[i]);
            this.roleIds.push(this.strs[i].id);
          }
        }
        this.strs = chgArr;
      }
    },
    //设置文件提醒时删除选择角色
    handle_Closerole(num) {
      this.strs.splice(num, 1);
      this.roleIds.splice(num, 1);
    },
    //设置文件提醒时选择人员
    findAllUser(data) {
      console.log(data, 22);
      if (!data || !data.length) {
        this.findFlag = false;
        this.findState = {};
        this.checkState = {};
        if (this.user_num == 1) {
          this.deployObj = [];
        }
        if (this.user_num == 2) {
          this.ccObj = [];
        }
        return;
      }
      if (this.user_num == 1) {
        var dtt = data;
        this.deployObj = dtt;
        if (this.deployObj !== "") {
          this.deployObj = Array.from(new Set(this.deployObj));
          this.findFlag = false;
          this.findState = {};
          this.checkState = {};
          var chgArr = [];
          for (var i = 0; i < this.deployObj.length; i++) {
            var flag = true;
            for (var j = 0; j < chgArr.length; j++) {
              if (this.deployObj[i].userId == chgArr[j].userId) {
                flag = false;
              }
            }
            if (flag) {
              chgArr.push(this.deployObj[i]);
              this.chosepersonIds.push(this.deployObj[i].userId);
            }
          }
          this.deployObj = chgArr;
        }
        this.findUserObj = this.deployObj;
      } else {
        var cco = data;
        this.ccObj = this.ccObj.concat(cco);
        if (this.ccObj !== "") {
          this.ccObj = Array.from(new Set(this.ccObj));
          this.findFlag = false;
          this.findState = {};
          this.checkState = {};
          var chgArr = [];
          for (var i = 0; i < this.ccObj.length; i++) {
            var flag = true;
            for (var j = 0; j < chgArr.length; j++) {
              if (this.ccObj[i].userId == chgArr[j].userId) {
                flag = false;
              }
            }
            if (flag) {
              chgArr.push(this.ccObj[i]);
            }
          }
          this.ccObj = chgArr;
        }
        this.findUserObjM = this.ccObj;
      }
    },
    //设置文件提醒时删除选择人员
    handleClose(num) {
      this.ccObj.splice(num, 1);
      this.chosepersonIds.splice(num, 1);
    },
    handle_Close(num, ind) {
      if (ind == 0) {
        this.deployObj.splice(num, 1);
        this.chosepersonIds.splice(num, 1);
      } else {
        this.ccObj.splice(num, 1);
      }
    },
    //右击判断文件及文件夹的操作
    judgeOperating() {
      for (var i = 0; i < this.selectedDoc.length; i++) {
        if (this.selectedDoc[i]["docType"] != "0") {
          this.$message({
            message: "文件夹不支持该功能，请选择文件",
            type: "warning"
          });
          return false;
        } else {
          return true;
        }
      }
    },
    //  处理文件大小
    handleFileSize(limit) {
      if (limit == null) {
        return;
      } else {
        var size = "";
        if (limit < 0.1 * 1024) {
          //小于0.1KB，则转化成B
          size = limit.toFixed(2) + "B";
        } else if (limit < 0.1 * 1024 * 1024) {
          //小于0.1MB，则转化成KB
          size = (limit / 1024).toFixed(2) + "KB";
        } else if (limit < 0.1 * 1024 * 1024 * 1024) {
          //小于0.1GB，则转化成MB
          size = (limit / (1024 * 1024)).toFixed(2) + "MB";
        } else {
          //其他转化成GB
          size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
        }

        var sizeStr = size + ""; //转成字符串
        var index = sizeStr.indexOf("."); //获取小数点处的索引
        var dou = sizeStr.substr(index + 1, 2); //获取小数点后两位的值
        if (dou == "00") {
          //判断后两位是否为00，如果是则删除00
          return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
        }
        return size;
      }
    }
  }
};
</script>
<style scoped lang="scss" type="text/css">
.project-doc-search {
  .title {
    text-align: left;
    padding-left: 10px;
  }
  .el-breadcrumb {
    line-height: 46px;
    padding-left: 10px;
  }
  .project-doc-top {
    position: relative;
    padding-bottom: 20px;
    background: #fff;
    .project-doc-rec {
      position: absolute;
      right: 20px;
      top: 50px;
      .el-button {
        padding: 8px 10px;
      }
    }
  }
  .stage-list {
    margin-top: 18px;
    margin-left: 10px;
    li {
      float: left;
    }
    span.active {
      background: rgba(26, 95, 164, 1);
    }
    span {
      float: left;
      height: 24px;
      line-height: 24px;
      padding: 0 28px;
      margin-right: 6px;
      color: #fff;
      font-size: 12px;
      border-radius: 12px;
      background: #ccc;
    }
    i {
      float: left;
      width: 33px;
      height: 8px;
      margin-top: 8px;
      margin-right: 6px;
      background: url("../../../assets/project_doc/docArrow.png") no-repeat 0 0;
    }
    i.active {
      background: url("../../../assets/project_doc/docArrowActive.png")
        no-repeat 0 0;
    }
  }
  .stage-list-box {
    height: 42px;
    overflow: hidden;
  }
  .stage-list-min-box {
    height: 40px;
    overflow: hidden;
  }
  .stage-list-box.stage-list-min-box2 {
    height: auto;
  }
  .more-stage {
    position: absolute;
    top: 28px;
    right: 14px;
    padding: 4px 14px;
    border: 1px solid #ccc;
    border-radius: 14px;
  }
  .more-stage.el-button.is-disabled.el-button--text {
    border: 1px solid #ccc;
  }
  .more-stage i {
    margin-right: 4px;
    margin-left: 2px;
    font-size: 12px;
  }
  .project-doc-con {
    margin-top: 14px;
    padding-bottom: 10px;
    background: #fff;
  }
  .search-item-box {
    // position:relative;
    height: 64px;
    margin-right: 10px;
    overflow: hidden;
    .el-date-editor.el-input {
      width: 196px;
    }
  }
  .search-item-box.search-item-box-max {
    height: auto;
  }
  .search-box {
    position: relative;
    .more-stage {
      right: 24px;
      top: 26px;
    }
  }
  .search-btn-box {
    margin-top: 18px;
    margin-right: 118px;
  }
  .search-item-box.search-item-box-min {
    max-width: calc(100% - 360px);
  }
  .form_box {
    background: #fff;
    margin-right: 78px;
    padding-top: 20px;
    padding-left: 10px;
    .el-form-item {
      float: left;
      margin-right: 20px;
      margin-bottom: 0;
      padding-bottom: 15px;
      height: 40px;
      .el-input {
        width: 308px;
      }
      // .inline-input{
      //     width:217px;
      // }
      // .el-select{
      //     width:217px;
      // }
    }
    .el-button {
      float: left;
      margin-left: 20px;
      // margin-top:2px;
    }
  }
  //
  .doc-state li {
    margin-right: 4px;
  }
  .el-date-editor--daterange.el-input__inner {
    width: 308px;
    // height:32px;
  }
  .el-form-item .el-form-item__content .el-input input {
    width: 308px;
    // height:32px;
    // line-height: 32px;
  }
  .el-form-item .el-form-item__content .q-308 {
    width: 286px;
    // height:32px;
    // line-height: 32px;
  }
  .el-form-item .el-form-item__content .q-240 {
    width: 240px;
  }
  .el-form-item .el-form-item__content .q-196 {
    width: 196px;
  }
  .el-button--medium {
    padding: 12px 20px;
    margin-top: 0px;
  }
  .table-doc-name.noIcon {
    margin-top: 6px;
  }
  .project-doc-top {
    .head {
      height: 38px;
      line-height: 38px;
      padding-left: 10px;
      text-align: left;
      font-size: 20px;
      color: #333333;
      font-size: 20px;
      font-weight: 500;
    }
  }
  // 以下为分页
  .footer-box {
    padding-left: 16px;
  }
  .footer-box-l {
    margin-top: 24px;
  }
  .el-pagination {
    margin-top: 20px;
    margin-right: 16px;
    text-align: right;
  }
  .back_btn {
    margin-left: 10px;
    border: none;
  }
}
.pro-doc-operation {
  position: relative;
  // padding: 8px 0 20px 10px;
  padding: 8px 106px 0 10px;
  margin-right: 8px;
  border-bottom: 1px solid #e8e8e8;
  font-size: 14px;
  font-weight: 400;
  color: #fff;
  .more-stage {
    top: 12px;
  }
  .pro-doc-operation-item {
    float: left;
    height: 30px;
    line-height: 30px;
    margin-right: 12px;
    margin-bottom: 20px;
    padding: 0 16px;
    border: 1px solid #e7e7e7;
    border-radius: 3px;
    background: rgba(242, 243, 245, 1);
    i {
      float: left;
      // margin-top: 6px;
      margin-right: 6px;
    }
    a {
      float: left;
    }
  }
  .pro-doc-operation-item:hover a {
    color: #fff;
  }
  .operation-item-btn {
    height: 30px;
    line-height: 30px;
    margin-right: 12px;
    margin-bottom: 20px;
    padding: 0 16px;
    border: 1px solid #e7e7e7;
    border-radius: 3px;
    background: rgba(242, 243, 245, 1);
  }
}
.pro-doc-operation2 {
  height: 46px;
  overflow: hidden;
}
.pro-doc-operation.pro-doc-operation-max {
  height: auto;
}
.reminddialog {
  .remindfont {
    text-align: left;
    color: #de4747;
    line-height: 26px;
  }
  .riwjn_we {
    // margin-left: 50 px;
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    top: -10px;
    .shekterAdd {
      width: 24px;
      height: 24px;
      position: relative;
      top: 7px;
      margin-right: 8px;
      cursor: pointer;
    }
  }

  .riwjn_we li {
    margin-top: 6px;
    line-height: 30px;
  }
  .riwjn_wechose {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    max-height: 70px;
    overflow-y: auto;
    top: -10px;
    .shekterAdd {
      width: 24px;
      height: 24px;
      position: relative;
      top: 7px;
      margin-right: 8px;
      cursor: pointer;
    }
  }
  .riwjn_wechose li {
    margin-top: 6px;
    line-height: 30px;
  }
  .usernanmestlt {
    width: 14%;
  }
  .usernanmestltfile {
    margin-top: 10px;
    text-align: left;
    float: left;
  }
  .usernanmes {
    width: 84%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-left: 97px;
    max-height: 170px;
    overflow-y: auto;
  }
  .userbtn {
    margin-left: 10px;
    margin-top: 10px;
  }
  .chosefile {
    width: 86%;
    .file_name {
      float: left;
      width: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    i {
      float: right;
      margin-left: 10px;
      position: relative;
      cursor: pointer;
      color: #0061a9;
    }
  }
  .chosefile:hover {
    background: #f7f9fb;
  }
}
.newremind .el-button--small {
  padding: 8px 17px;
  font-size: 14px;
  background-color: #f2f3f5;
  float: left;
}
.newremind .el-button:focus,
.newremind .el-button:hover {
  color: #fff;
}
.el-breadcrumb-ul {
  align-items: center;
  height: 28px;
  max-height: 40px;
  line-height: 28px;
  border: 1px solid #d7d7d7;
  margin-left: 5px;
  padding-right: 7px;
  padding-left: 7px;
  background: #f7f8fa;
  border-radius: 1px;
  width: 80%;
  white-space: nowrap;
}
.rightMenu {
  position: fixed;
  z-index: 12;
}
//权限设置弹窗
.power-set-content {
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #606266;
  }
  .el-dialog__header {
    border-bottom: 1px solid #dedede;
  }
  .el-dialog__body {
    padding: 18px 0;
    .el-dialog__header {
      border-bottom: 1px solid #dedede;
    }
  }
  .power-tit {
    padding-left: 20px;
    span {
      padding-right: 6px;
      font-size: 14px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
    p {
      margin-top: 2px;
      font-size: 14px;
      color: rgba(51, 51, 51, 1);
    }
  }
  .person-list {
    margin-top: 10px;
    .person-list-left {
      width: 310px;
      height: 300px;
      overflow-y: auto;
      border-right: 1px solid #ccc;
      li {
        padding-left: 26px;
        margin-bottom: 8px;
      }
      li.cur {
        background: rgba(247, 247, 247, 1);
      }
      ul {
        margin-top: 14px;
        div {
          margin-right: 12px;
        }
        p {
          height: 34px;
          line-height: 34px;
        }
      }
    }
    .person-list-right {
      width: 180px;
    }
    .person-list-title {
      text-align: left;
      margin-left: 22px;
      font-size: 14px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
    .person-list-checklist p {
      text-align: left;
      margin-left: 23px;
      margin-top: 12px;
    }
  }
}
//删除时含有设为底稿的文件提示
.delete_has_draft_tips {
  .delete_has_draft_tips_con {
    position: relative;
    padding-left: 52px;
    // padding: 0 38px 20px 52px;
  }
  .delete_has_draft_tips_con_text {
    text-align: left;
    border: none;
    .el-button {
      padding: 0 0 0 4px;
      font-weight: 400;
      color: #0061a9;
    }
  }
  .el-icon-warning {
    position: absolute;
    left: 4px;
    top: 16px;
    font-size: 22px;
    color: #e6a23c;
  }
}
//被关联详情
.index-details {
  .el-table::before {
    height: 0px;
  }
  .name_col_name p {
    width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 6px;
  }
}
//文件状态图标
.name_col_name {
  flex: 1;
}
.suolin-icon,
.beizhu-icon {
  color: #299be4;
}
.shenpijilu-icon {
  color: #f8b164;
}
.project-doc-list {
  .el-col-15 {
    width: 95%;
  }
}
</style>
<style lang="scss" type="text/css">
.project-doc-search {
  .project-doc-list td {
    border: none;
  }
  .name_col_name {
    float: left;
    width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .name_col_name div {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  // 文件属性
  .nature_box .el-dialog__header {
    background-color: #5ca8fc;
    .el-dialog__title,
    .el-icon-close {
      color: #fff;
    }
  }
  .el-dialog__body {
    .box {
      padding: 10px 0;
      background: #fff;
      border: solid 1px #ccc;
      font-size: 16px;
      line-height: 2.5;
      .el-row .el-col-5 {
        text-align: right;
        padding-right: 10px;
      }
    }
  }
  //删除时含有设为底稿的文件提示
  .delete_has_draft_tips {
    .el-dialog__header {
      text-align: left;
    }
    .el-dialog__body {
      padding-top: 0;
    }
    .dialog-footer {
      text-align: right;
    }
  }
  .index-details {
    .el-dialog__header {
      border-bottom: 1px solid #e6e6e6;
      font-weight: 400;
      color: #333;
    }
    .el-table td {
      padding: 6px 0;
      border-bottom: 1px solid #ebeef5;
    }
  }
}
</style>
