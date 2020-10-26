<template>
  <div class="manu_fullsearch">
    <div class="fullsearch_header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>底稿管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{isSelectList?'已选文件列表':'底稿管理搜索结果'}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="title_box">
        <el-button icon="el-icon-back" circle @click="back" class="back_icon"></el-button>
        <div class="title_msg">{{isSelectList?'已选文件列表':'底稿管理搜索结果'}}</div>
      </div>
    </div>
    <div class="fullsearch" id="fullsearch">
      <div class="fullsearch_nav">
        <!-- 检索条件 -->
        <div
          class="search_box"
          id="search_box"
          v-show="!isSelectList"
          v-on:keyup.enter="queryData(true)"
        >
          <div :class="['search_box_left', { search_box_toggle: !searchBtnDrop }]">
            <div class="search-item-box clearfix">
              <div class="search_item">
                <div class="search_tit">标题关键字：</div>
                <el-input
                  v-model="searchCondition.titleSearch"
                  class="el_wide"
                  placeholder="包含以下全部关键字(以空格区分)"
                ></el-input>
              </div>
              <div class="search_item">
                <div class="search_tit">内容关键字：</div>
                <el-input
                  v-model="searchCondition.contentSearch"
                  class="el_wide"
                  placeholder="包含以下全部关键字(以空格区分)"
                ></el-input>
              </div>
              <div class="search_item">
                <div class="search_tit">项目阶段：</div>
                <el-select
                  v-model="searchCondition.projectState"
                  class="el_wide"
                  placeholder="请选择项目阶段"
                >
                  <el-option
                    v-for="(item, index) in projectStage"
                    :label="item.name"
                    :key="index"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
              <div class="search_item">
                <div class="search_tit">文件类型：</div>
                <multiple-choice
                  ref="fileTypes"
                  @changeData="fileTypesChangeData"
                  :defaultSelectedValues="searchCondition.fileTypes"
                  :selectData="fileTypes"
                  :width="196"
                ></multiple-choice>
              </div>
              <div class="search_item">
                <div class="search_tit">文件状态：</div>
                <multiple-choice
                  ref="fileState"
                  @changeData="fileStateChangeData"
                  :defaultSelectedValues="searchCondition.fileState"
                  :selectData="fileState"
                  :width="196"
                ></multiple-choice>
              </div>
              <div class="search_item">
                <div class="search_tit">目录状态：</div>
                <multiple-choice
                  ref="dirState"
                  @changeData="dirStateChangeData"
                  :defaultSelectedValues="searchCondition.dirState"
                  :selectData="dirState"
                  :width="196"
                ></multiple-choice>
              </div>
              <div class="search_item">
                <div class="search_tit">修改时间：</div>
                <!-- 修改时间 -->
                <date-range
                  :width="196"
                  class="el_wide"
                  :date-start.sync="searchCondition.startTime"
                  :date-end.sync="searchCondition.endTime"
                  format="yyyy/MM/dd"
                ></date-range>
              </div>
              <div class="search_btn fl" v-show="!searchBtnDrop">
                <el-button type="primary" icon="el-icon-search" @click="queryData(true)">查询</el-button>
                <el-button icon="el-icon-refresh" @click="resetFn">重置</el-button>
              </div>
            </div>
          </div>
          <div class="search_btn default_search_btn" v-show="searchBtnDrop">
            <el-button type="primary" icon="el-icon-search" @click="queryData(true)">查询</el-button>
            <el-button icon="el-icon-refresh" @click="resetFn">重置</el-button>
          </div>
          <div
            class="btn_drop center btn_drop_search bgcolor-primary-hover border-primary-hover"
            @click="btnBoxToggle('searchBtnDrop')"
            v-if="moreSearchBtnVisible"
          >
            <span>{{ searchBtnDrop ? '更多' : '收起' }}</span>
            <i
              :class="[
                  'drop_icon',
                  'iconfont',
                  searchBtnDrop ? 'jiantou' : 'jiantou_shang'
                ]"
            ></i>
          </div>
        </div>
        <div class="nav_operation">
          <div :class="['btn_box', { btn_group_toggle: !btnGroupDrop }]" id="btn_box">
            <div class="toolbar_manu">
              <div
                v-if="this.$utils.checkSystemPermission('paper_file_file_down')"
                class="operation_chunk"
                @click="downloadFn"
              >
                <i class="iconfont Shapecopy chunk_icon"></i>
                <span class="chunk_name">下载</span>
              </div>

              <div
                v-if="this.$utils.checkSystemPermission('paper_file_file_del')"
                class="operation_chunk"
                @click="delFn"
              >
                <i class="shanchu iconfont chunk_icon"></i>
                <span class="chunk_name">删除</span>
              </div>

              <div
                v-if="this.$utils.checkSystemPermission('paper_file_file_dition')"
                class="operation_chunk"
                @click="versionsDialogFn"
              >
                <i class="xinjianbanbenku iconfont chunk_icon"></i>
                <span class="chunk_name">版本</span>
              </div>

              <div class="operation_chunk" @click="fileApprove(2)">
                <i class="shenpi iconfont chunk_icon"></i>
                <span class="chunk_name">文件审批</span>
              </div>

              <div class="operation_chunk" @click="fileApprove(3)">
                <i class="wenzhang iconfont chunk_icon"></i>
                <span class="chunk_name">目录审批</span>
              </div>

              <div class="operation_chunk" @click="discussionFn">
                <i class="taolun iconfont chunk_icon"></i>
                <span class="chunk_name">讨论</span>
              </div>

              <div class="operation_chunk" @click="setRemindClick">
                <i class="ling iconfont chunk_icon"></i>
                <span class="chunk_name">设置提醒</span>
              </div>

              <div class="operation_chunk" v-if="!isSelectList" @click="toSelectList">
                <i class="yixuanliebiao iconfont chunk_icon"></i>
                <span class="chunk_name">已选文件列表</span>
              </div>

              <div class="operation_chunk" @click="clearSelection">
                <i class="quxiaoxuanze iconfont chunk_icon"></i>
                <span class="chunk_name">取消选择</span>
              </div>
              <div class="operation_chunk" @click="copyClick">
                <i class="fuzhi iconfont chunk_icon"></i>
                <span class="chunk_name">复制</span>
              </div>
              <div class="operation_chunk" @click="exportClick" v-if="!isSelectList">
                <i class="daochu14px iconfont chunk_icon"></i>
                <span class="chunk_name">导出</span>
              </div>
              <div class="operation_chunk" @click="fileApprove(10)">
                <i class="xiugai iconfont chunk_icon"></i>
                <span class="chunk_name">文件修订</span>
              </div>
              <div class="operation_chunk" @click="fileApprove(11)">
                <i class="beizhu1 iconfont chunk_icon"></i>
                <span class="chunk_name">目录修订</span>
              </div>
              <div class="operation_chunk" @click="remarkClick">
                <i class="ccgl-shujuzidianxiugaijilu-3 iconfont chunk_icon"></i>
                <span class="chunk_name">备注</span>
              </div>
              <div
                class="operation_chunk"
                v-if="this.$utils.checkSystemPermission('edit_paper_index_max')"
                @click="editIndexList"
              >
                <i class="guanlian iconfont chunk_icon"></i>
                <span class="chunk_name">批量编辑关联</span>
              </div>
              <div class="operation_chunk" @click="projectIndexList">
                <i class="iconfont suoyin chunk_icon"></i>
                <span class="chunk_name">索引列表</span>
              </div>

              <div class="operation_chunk" @click="approvalHandle(1)">
                <i class="wenjianshenpishenhequeren iconfont chunk_icon"></i>
                <span class="chunk_name">文件审批意见</span>
              </div>
              <div class="operation_chunk" @click="approvalHandle(2)">
                <i class="wenjianshenpishenhequeren iconfont chunk_icon"></i>
                <span class="chunk_name">目录审批意见</span>
              </div>
            </div>
          </div>
          <div
            class="btn_drop center btn_drop_group bgcolor-primary-hover border-primary-hover"
            @click="btnBoxToggle('btnGroupDrop')"
            v-if="moreHandleBtnVisible"
          >
            <span>{{ btnGroupDrop ? '更多' : '收起' }}</span>
            <i
              :class="[
                  'drop_icon',
                  'iconfont',
                  btnGroupDrop ? 'jiantou' : 'jiantou_shang'
                ]"
            ></i>
          </div>
        </div>
      </div>
      <el-table
        ref="table"
        id="table_box"
        class="search_table"
        header-row-class-name="table_header_style"
        :height="tableHeight"
        :data="fullsearchData"
        @select="handleSelectDoc"
        @select-all="handleSelectAll"
        @selection-change="selectChangeFn"
        @sort-change="tableSort"
        @row-dblclick="dblclickFn"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          label="文件名"
          :sortable="isSelectList?false:'custom'"
          prop="docName"
          min-width="400"
        >
          <template slot-scope="scope">
            <div class="list_name">
              <div class="list_name_icon">
                <img class="list_name_icon_img" :src="scope.row.fileIcon" />
              </div>
              <div
                :class="[
                      {
                        'list_name_title3':
                          (scope.row.lockState ||
                            scope.row.auditStatus == 2) &&
                          scope.row.icon &&
                          scope.row.icon.length != 0
                      },
                      'list_name_title2',
                      'list_name_title'
                    ]"
              >
                <div :title="scope.row.docName" class="three-row-name">
                  <span v-if="searchCondition.titleSearch" v-html="scope.row.highlightName"></span>
                  <span v-else v-html="scope.row.docName"></span>
                </div>
                <span v-if="scope.row.isShowIcon" class="list_name_title_icon">
                  <template>
                    <!-- 审批状态图片 -->
                    <span
                      v-if="scope.row.auditStatus == 0"
                      title="审批中"
                      class="list_icon_img auditStatus_z"
                    ></span>
                    <span
                      v-if="scope.row.auditStatus == 1"
                      title="审批通过"
                      class="list_icon_img auditStatus_pass"
                    ></span>
                    <span
                      v-if="scope.row.auditStatus == 3"
                      title="节点审批通过"
                      class="list_icon_img auditStatus_jdsptg"
                    ></span>
                    <span
                      v-if="scope.row.auditStatus == 4"
                      title="待审批"
                      class="list_icon_img auditStatus_dsp"
                    ></span>
                    <span
                      v-if="scope.row.auditStatus == 7"
                      title="修订中"
                      class="list_icon_img auditStatus_xdz"
                    ></span>
                    <span
                      v-if="scope.row.auditStatus == 8"
                      title="已归档"
                      class="list_icon_img auditStatus_ygd"
                    ></span>
                    <span
                      v-if="scope.row.auditStatus == 6"
                      title="修订审批中"
                      class="list_icon_img auditStatus_xdspz"
                    ></span>
                    <span
                      v-if="scope.row.auditStatus == 2"
                      title="驳回未修改"
                      class="list_icon_img auditStatus_bhwxg"
                    ></span>
                    <span
                      v-if="scope.row.auditStatus == 5"
                      title="驳回已修改"
                      class="list_icon_img auditStatus_bhyxg"
                    ></span>
                  </template>
                  <!-- 目录状态 -->
                  <!-- <template v-else>
                    <span v-if="scope.row.auditStatus == 1"
                          title="已通过"
                          class="list_icon_img auditStatus_passed"></span>
                    <span v-if="scope.row.auditStatus == 2"
                          title="未通过"
                          class="list_icon_img auditStatus_noPassed"></span>
                  </template>-->
                  <!-- 状态logo -->
                  <span
                    v-if="scope.row.lockState"
                    title="锁定"
                    class="list_icon icon_lock tubiao-suo iconfont"
                  ></span>
                  <span
                    v-if="scope.row.reminder"
                    title="提醒"
                    class="list_icon icon_remind tongzhi iconfont"
                  ></span>
                  <span
                    v-if="scope.row.notes"
                    title="备注"
                    class="list_icon icon_note beizhu iconfont"
                  ></span>
                  <span
                    v-if="scope.row.record"
                    title="审批记录"
                    class="list_icon icon_record shenpijilu1 iconfont"
                  ></span>
                </span>
                <div class="list_name_title_auditStatusdiv" v-if="scope.row.icon">
                  <el-tag
                    class="list_name_title_auditStatus_tag"
                    :title="i.labelName"
                    :key="i.id"
                    v-for="i in scope.row.icon"
                  >{{ i.labelName }}</el-tag>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>

        <!-- <el-table-column prop="projName" label="所在项目" width="200">
          <template slot-scope="scope">
            <span class="table_projName" :title="scope.row.projName">{{scope.row.projName}}</span>
          </template>
        </el-table-column>-->

        <el-table-column prop="parentName" label="所在目录" width="200">
          <template slot-scope="scope">
            <span
              class="table_parentName"
              :title="`${scope.row.fullPath} / ${scope.row.docName}`"
            >{{scope.row.parentName}}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="修改时间"
          :sortable="isSelectList?false:'custom'"
          prop="modifyTime"
          align="center"
          width="200"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.docType == 0" class="list_time">
              <span class="list_time_updateTime">{{ scope.row.updateTime }}</span>
              <div>
                <span
                  class="list_time_updateUserName"
                  :title="scope.row.createUserName"
                >{{ scope.row.createUserName }}</span>
                &nbsp;
                <span
                  v-if="$utils.checkSystemPermission('paper_file_file_dition')"
                >
                  生成
                  <span
                    class="color-primary list_time_docVersionNumber"
                  >V{{ scope.row.docVersionNumber }}</span>
                </span>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          label="大小"
          align="center"
          :sortable="isSelectList?false:'custom'"
          prop="size"
          width="80"
        >
          <template slot-scope="scope">
            <div>{{$utils.handleFileSize(scope.row.docSize)}}</div>
          </template>
        </el-table-column>

        <el-table-column label="底稿关联" align="center" min-width="270">
          <template slot-scope="scope">
            <div v-if="scope.row.docType === 0 && scope.row.indexPaper">
              <p
                v-for="(item, index) in scope.row.indexPaper"
                :key="index"
                @mouseover="indexPaperHover(item, scope.row)"
                @click="paperIndexView(scope.row, item)"
                :title="item.title"
                class="paper_index_name"
              >{{ item.docName }}</p>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="left" min-width="100">
          <template slot-scope="scope">
            <div class="table_operation">
              <el-button
                type="text"
                title="摘要"
                v-if="scope.row.docType != 1 && !isSelectList"
                @click="toogleExpand(scope.row)"
              >摘要</el-button>
              <el-button type="text" title="定位" @click="docPositon(scope.row)">定位</el-button>
              <!-- <span
                class="icon-operate-btn iconfont zhaiyao"
                v-if="scope.row.docType != 1 && scope.row.isLinkDelete != 1"
                @click="toogleExpand(scope.row)"
                title="摘要"
              ></span>
              <span
                class="icon-operate-btn iconfont dingwei"
                @click="docPositon(scope.row)"
                title="定位"
              ></span>-->
            </div>
          </template>
        </el-table-column>
        <el-table-column type="expand" width="1">
          <template slot-scope="scope">
            <el-form label-position="left" inline class="demo-table-expand">
              <div v-html="scope.row.highlightContent"></div>
            </el-form>
          </template>
        </el-table-column>
      </el-table>
      <div class="bottom_box_fixed">
        <div class="bottom_box" id="bottom_box">
          <div class="sel_total">已选中 {{ selectedNum }} 项</div>
          <el-pagination
            class="bottom_pagination"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNo + 1"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableDataTotal"
            :pager-count="5"
          ></el-pagination>
        </div>
      </div>
    </div>
    <el-dialog
      title="文件版本"
      :close-on-click-modal="false"
      :visible.sync="versionVisible"
      width="500px"
      class="versions_dialog"
      :before-close="closeVersion"
    >
      <div>
        <ul>
          <li class="clearfix" style="background:#FAFAFA;">
            <span class="span_first">当前版本</span>
            <span class="span_two">生成人</span>
            <span class="span_two">大小</span>
            <span class="span_two">操作</span>
          </li>
          <div style="height:250px;">
            <el-scrollbar style="height:100%">
              <li
                v-for="(item, idx) in versionsData"
                class="version_content_item clearFix"
                :key="idx"
              >
                <!-- <el-checkbox v-model="item.checked" @change="verionsCheckChang(item)" class="span_check"></el-checkbox> -->
                <span class="span_btn">V{{ item.docVersionNumber }} {{ item.updateTime }}</span>
                <span class="span_sec">{{ item.userName }}</span>
                <span class="span_sec">{{$utils.handleFileSize(item.docSize)}}</span>
                <span class="span_sec">
                  <span class="span_sec_return" @click="restoreFn(item)">还原</span>
                  <span class="span_sec_down" @click="versionLoad(item)">下载</span>
                </span>
              </li>
            </el-scrollbar>
          </div>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="closeVersion">取 消</el-button>
        <el-button @click="affirmVersionUpload" size="medium">上传新版本</el-button>
      </span>
    </el-dialog>
    <!-- 文件、目录 修订/审批 -->
    <doc-exam
      ref="docExam"
      :projectData="projectData"
      :examType="examType"
      @sendValueToParent="docExamClose"
      @sendToParentQueryDoc="docExamCallback"
      @multipleCallback="docExamMultiple"
      :docSource="2"
    ></doc-exam>
    <!-- 设置提醒 -->
    <set-remind-dialog
      :chosefilelist.sync="chosefilelist"
      v-if="isShowSetRemind"
      :isShowSetRemind.sync="isShowSetRemind"
      @remindSuccess="remindSuccess"
      @remindClose="remindClose"
    ></set-remind-dialog>
    <!-- 批量编辑索引 -->
    <batch-Edit-Index
      ref="docRelationObj"
      :docRelationIsShow.sync="openBatchEditIndex"
      :projectId="pro_id"
      @submitBatchIndex="submitBatchIndex"
    ></batch-Edit-Index>
    <!-- 索引列表的弹框 -->
    <project-index-lists
      :projectIndexShow.sync="projectIndexShow"
      :projectIndexData="projectIndexData"
      @sendProjectHandle="sendProjectHandle"
    ></project-index-lists>
    <!-- 备注 -->
    <remark
      :remarkIsShow="remarkIsShow"
      :remarkList="remarkList"
      @saveRemark="saveRemark"
      title="备注"
      :docData="reMarkData"
      @colseModule="remarkClose"
    ></remark>
    <rd-uploader ref="RdUploader" :transfer="true" @version="versionUploadFn"></rd-uploader>
  </div>
</template>
<script>
// 备注
import remark from "@/components/file/remark";
// 设置提醒
import setRemindDialog from "./SetRemindDialog";
// 文件审批
import docExam from "@/pages/front/projectlist/projectDoc/docExam";
// 目录审批
// import catalogExam from '@/pages/front/projectlist/projectDoc/catalogExam';
// 批量编辑关联
import batchEditIndex from "@/pages/front/manuscriptmanage/batchEditIndex";
// 索引列表
import projectIndexLists from "@/pages/front/projectlist/projectDoc/projectIndexLists";

export default {
  name: "fullSearch",
  components: {
    remark,
    setRemindDialog,
    docExam,
    // catalogExam,
    batchEditIndex,
    projectIndexLists
  },
  data() {
    const dirState = [
      { value: 0, label: "无文件" },
      { value: 1, label: "有文件" },
      { value: 3, label: "已选择" },
      { value: 4, label: "待审批" },
      { value: 5, label: "审批中" },
      { value: 6, label: "审批通过" },
      // { value: 7,label: '已驳回' },
      { value: 9, label: "节点审批通过" },
      { value: 12, label: "修订中" },
      { value: 13, label: "修订审批中" },
      { value: 10, label: "驳回未修改" },
      { value: 11, label: "驳回已修改" },
      { value: 8, label: "有标签的" },
      { value: 2, label: "有讨论的" },
      { value: 14, label: "有审批记录的" },
      { value: 15, label: "引用目录" },
      { value: 16, label: "非引用目录" }
    ];
    const fileState = [
      // { value: 0, label: '有索引的' },
      // { value: 5, label: '无索引的' },
      { value: 2, label: "有备注的" },
      { value: 4, label: "有讨论的" },
      { value: 16, label: "有标签的" },
      { value: 7, label: "待审批" },
      { value: 8, label: "审批中" },
      { value: 14, label: "审批通过" },
      { value: 9, label: "节点审批通过" },
      { value: 10, label: "驳回未修改" },
      { value: 11, label: "驳回已修改" },
      { value: 12, label: "修订中" },
      { value: 13, label: "修订审批中" },
      { value: 1, label: "已选择" },
      { value: 15, label: "有关联的" },
      { value: 3, label: "有审批记录的" },
      { value: 6, label: "有设置提醒的" },
      { value: 20, label: "已归档" }
    ];
    const fileTypes = [
      { value: 0, label: "doc/docx" },
      { value: 1, label: "pdf" },
      { value: 2, label: "xls/xlsx" },
      { value: 3, label: "txt" },
      { value: 4, label: "png" },
      { value: 5, label: "jpg/jpeg" }
    ];
    return {
      fileState,
      fileTypes,
      dirState,
      checkSys: "",
      isPC: this.$store.state.isPC,
      pro_id: this.$store.state.projectMsg.pro_id, //请求接口默认必传数据
      userId: this.$store.state.loginObject.userId,
      projectMsg: this.$store.state.projectMsg.projectMsg, // 项目信息
      projectName: this.$store.state.projectMsg.projectMsg.name,
      pageNo: 0, //请求接口默认必传数据
      pageSize: 100, //请求接口默认必传数据
      tableDataTotal: 0,
      requestCode: {}, //所有请求的状态码
      fullsearchData: [], //列表数据
      searchBtnDrop: true, // 检索展开状态
      btnGroupDrop: true, // 按钮组展开状态
      needDomElem: {}, // 所需dom元素
      tableHeight: 300, // 表格高度
      searchCondition: {}, // 查询条件
      projectStage: [], // 项目阶段
      orderFlag: "", // 表格排序规则
      fullsearchDataSel: [],
      addVersionData: {}, // 上传新版本选中文件数据
      versionVisible: false, // 版本弹框
      versionsData: [], //文件版本数据
      reMarkData: [], // 备注数据
      remarkIsShow: false, // 备注弹框
      remarkList: [], // 备注数据
      isShowSetRemind: false, // 提醒弹框
      chosefilelist: [], // 提醒数据
      examType: 2, // 审批类型
      projectData: {}, // 当前项目信息
      reviseFileArray: [], // 修订审批数据 需要过滤
      openBatchEditIndex: false, //是否显示批量编辑索引弹窗
      projectIndexData: {}, // 索引列表弹框数据
      projectIndexShow: false, // 索引列表弹框显示
      isSelectList: false, // 是否已选文件列表
      selectListData: {
        // 已选文件列表页面信息 前端分页
        pageNo: 1,
        pageSize: 100,
        tableDataTotal: 0
      },
      selectManaullyFile: [], // 手动选择文件
      selectDir: [], // 已选文件夹
      backFlag: false, // 返回标记
      moreSearchBtnVisible: false,
      moreHandleBtnVisible: false
    };
  },
  created() {
    this.isSelectList =
      !!this.$route.query.isSelectList ||
      this.$store.state.isSelectList.viewType;
    !this.isSelectList &&
      (this.searchCondition = JSON.parse(this.$route.query.searchData) || {});
    this.backFlag = this.$store.state.isSelectList.backFlag;
    this.$store.commit("setSelectList", {
      viewType: this.isSelectList,
      backFlag: this.backFlag
    });
    this.requestCode = this.code.codeNum;
    this.queryIds = this.$utils.cloneDeepArray(
      this.$select.getSelectedData(2, this.pro_id).file
    );
    this.getProjectStage(this.queryData);
    // this.queryData()
    this.getPageHeight();
  },
  mounted() {
    // window.addEventListener('resize', this.getPageHeight)
    window.onResize = () => {
      return (() => {
        this.getPageHeight();
        this.isShowMoreSearchBtn();
      })();
    };
    this.$Mit.watch({
      status: res => {
        this.$Intel.message(
          this.$select.getSelectedData(2, this.pro_id).file.map(item => {
            return {
              id: item.id,
              name: item.docName,
              size: item.docSize,
              type: item.type,
              docId: item.docId
            };
          })
        );
      }
    });
    this.needDomElem.tableBox = document.getElementById("table_box");
    this.needDomElem.searchBox = document.getElementById("search_box");
    this.needDomElem.btnGroupBox = document.getElementById("btn_box");
    this.needDomElem.fullSearchBox = document.getElementById("fullsearch");
    this.needDomElem.bottomBox = document.getElementById("bottom_box");
    this.isShowMoreSearchBtn();
  },
  beforeRouteLeave(to, from, next) {
    window.removeEventListener("resize", this.getPageHeight);
    this.$store.commit("setSelectList", { viewType: false, backFlag: false });
    to.meta.keepAlive = false;
    next();
  },
  computed: {
    selectedNum() {
      return this.$store.state.selectedNum;
    },
    versionMsg() {
       return this.$store.state.versionMsg;
    }
  },
  watch: {
    versionMsg(val) {
      // docSource 为0是项目文档， 1是底稿管理，2是客户文档
      if(val.docSource!=1) return
     
      let idx = this.fullsearchData.findIndex(v=>v.docId == val.docId)
      // 当前无数据，return
      if(idx<0) return
      
      // 需要更新的数据
      let updatedObj = {
        userName: val.userName,
        docSize: val.docSize,
        updateBy: val.updateBy,
        updateTime: val.updateTime,
        docVersionNumber: val.docVersionNumber,
        docRfs: val.docRfs,
        rfsId: val.docRfs
      }
      val.auditStatus && (updatedObj.auditStatus = val.auditStatus)

      Object.assign(this.fullsearchData[idx], updatedObj)

      // 版本号放大样式处理
      let el = $('#table_box tr').eq(idx+1).find('.list_time_docVersionNumber')
      el.addClass('rdpulse')
      setTimeout(()=>{
        el.removeClass('rdpulse')
      },3000)
    },
    "$store.state.asidCollapse"() {
      setTimeout(() => {
        this.getPageHeight();
      }, 350);
    }
  },
  methods: {
    docExamMultiple(res) {
      this.$message.warning(res.msg);
      let obj = {
        procTypeName: res.dialogTitle,
        procTypeId: res.procTypeId, // 审批类型id
        finaTypeId: this.$store.state.projectMsg.projectMsg.financingId, // 业务类型id financingId
        finaTypeName: this.$store.state.projectMsg.projectMsg.financingName, // 业务类型 financingName
        projectId: this.$store.state.projectMsg.pro_id, // 项目id
        progStageId: this.$store.state.projectMsg.projectMsg.currentStageId, // 项目阶段id currentImplementStageId
        progStageName: this.$store.state.projectMsg.projectMsg
          .currentImplementStageName // 项目阶段 currentImplementStageName
      };
      this.$Business.processStore(obj);
      this.$router.push("/sponsor");
    },
    isShowMoreSearchBtn() {
      //更多按钮是否展示
      let boxH = $(".search_box_left").height() + 16;
      let objH = $(".search-item-box").height();
      this.moreSearchBtnVisible = boxH < objH;
      let toolbarH = $(".btn_box").height();
      let toolbarAutoH = $(".toolbar_manu").height();
      this.moreHandleBtnVisible = toolbarH <= toolbarAutoH;
    },
    // 关联选中、取消选中（适用于搜索结果页）
    relatedSelect(res, selection) {
      res.forEach(v => {
        let idx = this.fullsearchData.findIndex(m => m.id === v);
        this.$nextTick(() => {
          if (this.$route.path != "/fullsearch") return;
          idx > -1 &&
            this.$refs.table.toggleRowSelection(
              this.fullsearchData[idx],
              selection
            );
        });
      });
    },
    // 取消选择
    clearSelection() {
      // 取消table的选中状态
      this.$refs.table.clearSelection();
      // 清空存储的数据
      this.$select.clearSelection(2, this.pro_id);
      if (this.isSelectList) {
        // this.queryData();
        this.fullsearchDataSel.length = 0;
        // this.fullsearchData.length = 0;
      }
    },
    // 回显已选文件
    displaySelected() {
      this.$select
        .handleDisplaySelection(
          2,
          this.pro_id,
          this.pro_id,
          this.fullsearchData
        )
        .then((res = []) => {
          console.log(11111, res);
          this.fullsearchData.forEach(t => {
            let idx = res.findIndex(m => m === t.id);
            this.$refs.table.toggleRowSelection(t, idx > -1);
          });
        });
    },
    // 已选文件列表切换
    toSelectList() {
      this.$select.updateStatus(2, this.pro_id, this.pro_id);
      this.selectChangeFn();
      if (this.fullsearchDataSel.length == 0) {
        this.$message.warning("当前无选中文件");
        return;
      }
      this.queryIds = this.$utils.cloneDeepArray(
        this.$select.getSelectedData(2, this.pro_id).file
      );
      this.backFlag = true;
      this.isSelectList = true;
      this.pageNo = 0;
      this.$store.commit("setSelectList", {
        viewType: this.isSelectList,
        backFlag: this.backFlag
      });
      this.queryData();
    },
    /**
     * 文件/目录审批意见按钮
     * @param {Number} type 1：文件 2：目录
     */
    approvalHandle(type) {
      this.$select.updateStatus(2, this.pro_id, this.pro_id);
      this.selectChangeFn();
      let arr = type == 1 ? this.fullsearchDataSel : this.selectDir;
      if (arr.length == 0) {
        this.$message.warning(`请选择${type == 1 ? "文件" : "目录"}`);
        return;
      }
      this.$store.commit("approvalCommentsFn", {
        docSource: 2,
        attach: JSON.stringify(
          arr.map(v => {
            return { docId: type == 1 ? v.docId : v.id, parentId: v.parentId };
          })
        ),
        projectId: this.pro_id,
        isLimit: 2,
        isDir: type == 2,
        sourceName: `底稿管理-${type == 1 ? "文件" : "目录"}审批意见页`
      });
    },
    // 索引列表按钮
    projectIndexList() {
      this.$select.updateStatus(2, this.pro_id, this.pro_id);
      this.selectChangeFn();
      if (this.fullsearchDataSel.length == 0) {
        this.$message.warning("请先选择文件");
        return;
      }
      this.projectIndexData = {
        projectId: this.pro_id,
        idSet: this.fullsearchDataSel.map(v => v.id),
        docSource: 1,
        docPosition: this.isSelectList ? 2 : 1 // 区分当前点击的是底稿管理 0 ？ 搜索结果页1 、已选文件列表2？
      };
      this.projectIndexShow = true;
    },
    // 索引列表关闭回调
    sendProjectHandle() {
      this.projectIndexShow = false;
    },
    //提交批量索引
    submitBatchIndex(leftItemArr, leftIdsArr, rightItemArr, rightIdsArr) {
      let paperList = [];
      leftItemArr.forEach(item => {
        if (item.id) {
          paperList.push({
            id: item.id,
            docName: item.docName,
            parentName: item.iparentNamed
          });
        }
      });
      this.$post("/doc/paper/editPaperIndexMax", {
        sourceName: "底稿管理",
        projectName: this.projectName,
        paperFlag: true,
        data: {
          paperIds: leftIdsArr,
          paperIdIndex: rightIdsArr[0],
          paperList: paperList, //左侧选中数据列表
          docName: rightItemArr[0].docName, //右侧
          parentName: rightItemArr[0].parentName, //右侧
          paperIdIndex: rightItemArr[0].id //右侧
        }
      })
        .then(res => {
          if (this.requestCode.SUCCESS != res.code) {
            this.$message.error(res.msg);
            return;
          }
          this.openBatchEditIndex = false;
          this.laber(this.fullsearchData);
          this.$message.success(res.msg);
        })
        .catch(error => {
          console.log(error);
        });
    },
    //批量编辑索引
    editIndexList() {
      this.openBatchEditIndex = true;
      // this.$refs.docRelationObj.treeQueryDoc(0);
      this.$refs.docRelationObj.queryDraftDoc(0);
    },
    // 文件审批弹框关闭回调
    docExamClose() {
      this.queryData();
    },
    docExamCallback() {
      this.queryData();
      this.$select.updateStatus(2, this.pro_id, this.pro_id);
      this.clearSelection();
    },
    // 文件审批/目录审批
    fileApprove(procTypeId) {
      // 判断项目是否是已终止状态
      if(this.$store.state.projectMsg.projectMsg.endFlag  && this.$store.state.projectMsg.projectMsg.endFlag === 1){
        this.$store.commit('projectStatusTips');
        return;
      }
      this.examType = procTypeId;
      this.projectData = {
        docParentId: 0,
        pathNameList: this.navArray,
        processId: this.projectMsg.currentImplementStageId,
        processName: this.projectMsg.currentImplementStageName,
        projectCreatBy: this.projectMsg.createBy,
        projectId: this.pro_id,
        projectName: this.projectName
      };
      this.$refs.docExam.activeComp();
    },
    // 设置提醒成功后
    remindSuccess() {
      this.clearSelection();
    },
    // 设置提醒关闭回调
    remindClose() {
      this.isShowSetRemind = false;
      this.queryData();
    },
    // 设置提醒按钮
    setRemindClick() {
      this.$select.updateStatus(2, this.pro_id, this.pro_id);
      this.selectChangeFn();
      if (this.fullsearchDataSel.length == 0) {
        this.$message.warning("请先选择文件");
        return;
      }
      this.isShowSetRemind = true;
      this.chosefilelist = this.$utils.cloneDeepArray(this.fullsearchDataSel);
    },
    // 底稿关联路径
    indexPaperHover(item, row) {
      this.$post("/doc/paper/queryPaperParent", {
        data: {
          id: item.id
        }
      })
        .then(res => {
          if (this.requestCode.SUCCESS != res.code) {
            this.$message.error(res.msg);
            return;
          }
          for (let i = 0; i < this.fullsearchData.length; i++) {
            if (this.fullsearchData[i].id == row.id) {
              for (
                let j = 0;
                j < this.fullsearchData[i].indexPaper.length;
                j++
              ) {
                if (this.fullsearchData[i].indexPaper[j].id === item.id) {
                  this.$set(
                    this.fullsearchData[i].indexPaper[j],
                    "title",
                    res.data.reverse().join(" / ")
                  );
                }
              }
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //预览被索引文件
    paperIndexView(row, itemValue) {
      if (!rightSysPermissionFn(this.pro_id, "paper_file_file_preview")) {
        this.$message.warning("无对应文件预览权限，请在角色权限中进行配置");
        return;
      }
      if (row.isLinkDelete === 1 || itemValue.isLinkDelete === 1) {
        this.$message.warning("文件已删除，不能预览");
        return;
      }
      var previewData = {
        projectId: row.projectId,
        rfsId: itemValue.rfsId,
        docId: itemValue.docId,
        photoType: itemValue.type,
        sourceType: "manuscriptmanage",
        isPaperIndexDoc: true,
        paperIndexCatalog: itemValue.title, //被索引文件的上级，上上级，一直到顶级的目录列表
        docName: itemValue.docName,
        id: itemValue.id,
        sourceName: "底稿管理"
      };
      this.$store.commit("previewAllFn", previewData);
    },
    // 保存备注
    saveRemark(content) {
      this.$post("/doc/project/addNotes", {
        sourceName: "底稿管理",
        projectName: this.projectName,
        paperFlag: true,
        data: {
          sourceFlag: 1, //项目文档固定为0，底稿为1
          content,
          needFileList: this.fullsearchDataSel.map(v => {
            return {
              docId: v.docId,
              fileId: v.id
            };
          })
        }
      })
        .then(res => {
          if (this.requestCode.SUCCESS != res.code) {
            this.$message.warning(res.msg);
            return;
          }
          this.remarkIsShow = false;
          this.$message.success("新增备注成功");
          this.clearSelection();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 备注按钮
    remarkClick() {
      this.$select.updateStatus(2, this.pro_id, this.pro_id);
      this.selectChangeFn();
      if (this.fullsearchDataSel.length == 0) {
        this.$message.warning("请先选择文件");
        return;
      }
      if (this.fullsearchDataSel.length == 1) {
        this.$post("/doc/project/queryNoteByFileId", {
          sourceName: "底稿管理",
          projectName: this.projectName,
          paperFlag: true,
          data: {
            sourceFlag: 1,
            docId: this.fullsearchDataSel[0].docId
          }
        })
          .then(res => {
            if (res.code != this.requestCode.SUCCESS) {
              this.$message.error(res.msg);
              return;
            }
            this.remarkList = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      }

      this.reMarkData = this.fullsearchDataSel;
      this.remarkIsShow = true;
    },
    // 备注弹框关闭
    remarkClose() {
      this.remarkIsShow = false;
      this.queryData();
    },
    // 讨论
    discussionFn() {
      if (!this.$store.state.proChatIsShow) {
        this.$message.warning("当前无权限");
        return;
      }
      this.$select.updateStatus(2, this.pro_id, this.pro_id);
      this.selectChangeFn();
      let discussionData = [...this.selectManaullyFile, ...this.selectDir];
      if (discussionData.length == 0) {
        this.$message.warning("请先选择文件或文件夹");
        return;
      }
      if (discussionData.length > 1) {
        this.$message.warning("多文件无法操作，请重新选择");
        return;
      }
      discussionData[0].paperId = discussionData[0].id;
      this.$router.push({
        path: "/projecchat",
        query: {
          docData: JSON.stringify(discussionData[0]),
          sourceName: "底稿管理"
        }
      });
    },
    versionUploadFn(fileData) {
      //上传新版本
      this.$post("/doc/paper/addDocVersion", {
        sourceName: "底稿管理",
        projectName: this.projectName,
        paperFlag: true,
        data: {
          docId: this.addVersionData.docId,
          id: this.addVersionData.id,
          docName: fileData.fileData.name,
          projId: fileData.fileData.data.projId,
          docSize: fileData.fileData.size,
          updateBy: this.userId,
          docRfs: fileData.fileData.rfsId
        }
      })
        .then(res => {
          if (this.requestCode.SUCCESS != res.code) {
            this.$message.error(res.msg);
            return;
          }
          this.$refs["RdUploader"].handleUploadSuccess(fileData.tId);
          // this.queryData();
          this.clearSelection()
        })
        .catch(error => {
          console.log(error);
        });
    },
    affirmVersionUpload() {
      // 判断项目是否是已终止状态
      if(this.$store.state.projectMsg.projectMsg.endFlag  && this.$store.state.projectMsg.projectMsg.endFlag === 1){
        this.$store.commit('projectStatusTips');
        return;
      }
      if (!this.$utils.checkSystemPermission("paper_file_file_dition")) {
        this.$message.warning("您没有该权限");
        return;
      }
      //文件版本上传新版本
      this.addVersionData = this.fullsearchDataSel[0];
      if (
        this.fullsearchDataSel.length != 1 ||
        this.addVersionData.docType != 0
      ) {
        this.$message.warning("请选中单个文件进行操作");
        return;
      }
      if (
        this.addVersionData.lockState ||
        this.addVersionData.auditStatus == 1 ||
        this.addVersionData.auditStatus == 0 ||
        this.addVersionData.auditStatus == 6 ||
        this.addVersionData.auditStatus == 8
      ) {
        this.$message.warning("所选数据包含锁定文件和不可操作文件");
        return;
      }
      this.$refs["RdUploader"].openSelect(
        {
          multiple: false,
          accept: ""
        },
        {
          docSource: 1,
          projId: this.pro_id,
          parentId: this.fullsearchDataSel[0].parentId,
          auditProjectId: null
        },
        true
      );
      this.closeVersion();
    },
    // 版本弹框关闭
    closeVersion() {
      this.versionVisible = false;
      this.queryData();
      this.clearSelection();
    },
    // 文件版本
    versionsDialogFn() {
      this.$select.updateStatus(2, this.pro_id, this.pro_id);
      this.selectChangeFn();
      this.addVersionData = this.fullsearchDataSel[0];
      if (
        this.fullsearchDataSel.length != 1 ||
        this.fullsearchDataSel[0].docType != 0
      ) {
        this.$message.warning("请选中单个文件进行操作");
        return;
      }
      this.getDocVersionListFn(this.fullsearchDataSel[0], 1);
    },
    getDocVersionListFn(itemValue, type) {
      //请求文件版本数据
      //type: 1. 弹框 2. 刷新
      this.$post("/doc/paper/getDocVersionList", {
        sourceName: "底稿管理",
        projectName: this.projectName,
        paperFlag: true,
        data: {
          docId: itemValue.docId,
          docName: itemValue.docName,
          parentId: itemValue.parentId
        }
      })
        .then(res => {
          if (this.requestCode.SUCCESS != res.code) {
            this.$message.error(res.msg);
            return;
          }
          this.versionsData = res.data;
          if (type == 1) {
            this.versionVisible = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    restoreFn(itemValue) {
      // 判断项目是否是已终止状态
      if(this.$store.state.projectMsg.projectMsg.endFlag  && this.$store.state.projectMsg.projectMsg.endFlag === 1){
        this.$store.commit('projectStatusTips');
        return;
      }
      //文件版本还原
      if (this.addVersionData.lockState) {
        this.$message.warning("文件已锁定，不允许还原版本");
        return;
      }
      if (
        this.addVersionData.auditStatus == 1 ||
        this.addVersionData.auditStatus == 0 ||
        this.addVersionData.auditStatus == 6 ||
        this.addVersionData.auditStatus == 8
      ) {
        this.$message.warning("审批通过/审批中/修订审批中不允许还原版本");
        return;
      }
      this.$post("/doc/paper/reBackDocVersion", {
        pageNo: 0,
        pageSize: 10,
        sourceName: "底稿管理",
        projectName: this.projectName,
        paperFlag: true,
        data: {
          docId: itemValue.docId,
          fileId: this.addVersionData.id,
          id: itemValue.id,
          updateBy: itemValue.updateBy,
          docSize: itemValue.docSize
        }
      })
        .then(res => {
          if (this.requestCode.SUCCESS == res.code) {
            this.getDocVersionListFn(this.fullsearchDataSel[0], 2);
            this.queryData(false, this.addVersionData.id);
            this.versionVisible = false;
            this.clearSelection()
            this.$message.success("还原版本成功");
          } else if (this.requestCode.DOC_FIlE_VERSION_NEW == res.code) {
            this.$message.success("该版本是文件最新版本");
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    versionLoad(itemValue) {
      //文件版本下载
      if (!rightSysPermissionFn(this.pro_id, "paper_file_file_down")) {
        this.$message.warning("当前无权限");
        return;
      }
      this.$store.commit("downloadRfs", [
        {
          name: itemValue.docName,
          id: itemValue.docRfs,
          docId: itemValue.docId
        }
      ]);
    },
    // 文件删除
    delFn() {
      this.$select.updateStatus(2, this.pro_id, this.pro_id);
      this.selectChangeFn();
      let delData = [...this.selectManaullyFile, ...this.selectDir];
      if (delData.length == 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      let delFlag = false;
      let lockFlag = false;
      delData.some(item => {
        if (item.docType == 1) {
          delFlag = item.quoteId ? true: rightSysPermissionFn(this.pro_id, "paper_del_atalog");
        } else {
          delFlag = rightSysPermissionFn(this.pro_id, "paper_file_file_del");
        }
        if (!delFlag) {
          this.$message.warning("您无对应的项目角色权限/后台权限");
          return true;
        }
        if (item.lockState) {
          this.$message.warning(`锁定${item.docType == 1?'目录':'文件'}不能删除`);
          lockFlag = true;
          return true;
        }
        if (!delFlag || lockFlag) {
          return;
        }
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.loading = this.$loading({
              lock: true,
              text: "数据过多正在删除中",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            let quoteIdList = [];
            let dirIds = [];
            let docPaperIds = [];
            let docIds = [];
            delData.forEach(item => {
              docIds.push(item.id);
              item.quoteId
                ? quoteIdList.push(item.id)
                : item.docType === 1
                ? dirIds.push(item.id)
                : docPaperIds.push(item.id);
            });

            this.$post("/doc/paper/deletePaperDoc", {
              sourceName: "底稿管理",
              projectName: this.projectName,
              paperFlag: true,
              data: {
                docIds: docIds.join(","),
                quoteId: delData[0].quoteId,
                parentId: delData[0].parentId,
                quoteIdList: quoteIdList, // 引用的目录
                dirIds: dirIds, // 自己创建的目录
                docPaperIds: docPaperIds // 文件
              }
            })
              .then(res => {
                this.loading.close();
                if (this.requestCode.SUCCESS != res.code) {
                  this.$message.error(res.msg);
                  return;
                }
                // TODO: 在已选列表清空
                this.$select.handleCancel(
                  2,
                  this.pro_id,
                  this.pro_id,
                  delData,
                  this.displaySelected
                );
                this.queryData();
                this.$message.success(
                  "删除成功(含有文件锁或特殊文件是不允许删除的)"
                );
              })
              .catch(error => {
                this.loading.close();
                console.log(error);
              });
          })
          .catch(() => {});
      });
    },
    downloadFn() {
      this.$select.updateStatus(2, this.pro_id, this.pro_id);
      this.selectChangeFn();
      let downData = [...this.selectManaullyFile, ...this.selectDir];
      //文件下载
      if (downData.length == 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      let downloadArr = [];
      // PC端下载
      if (this.isPC) {
        downloadArr = downData.map(item => {
          return {
            docId: item.docId,
            docType: item.docType,
            id: item.id,
            docName: item.docName,
            source: 1, // 文件源： 1底稿 0项目文档 2客户文档
            parentId: item.parentId,
            projectId: item.projectId,
            parentName: item.parentName,
            sourceName: '底稿管理',
            projectName: this.projectName,
            paperFlag: true
          };
        });
        this.$store.commit("download", downloadArr);
        this.clearSelection();
        return;
      } else {
        downloadArr = downData.map(item => {
          return {
            id: item.docId,
            name: item.docName
          };
        });
      }
      setTimeout(() => {
        // console.log(downloadArr)
        !this.isPC && this.journal(); // pc不需要记录
        // 单文件下载
        if (downData.length == 1 && downData[0].docType != 1) {
          this.$store.commit("download", downloadArr);
          return;
        }
        // 批量下载
        let files = [];
        files = downData.map(item => {
          return {
            parentId: item.parentId,
            rfsId: item.rfsId,
            fileName: item.docName,
            id: item.id,
            docType: item.docType
          };
        });
        this.$store.commit("export", {
          url: `/rfs/files/downloadDocsZip`,
          data: {
            projectName: this.projectName,
            random: new Date().getTime(),
            source: 1, //下载位置0 项目文档、 1 底稿
            files
          }
        });
      });
      this.clearSelection();
    },
    journal() {
      this.$post("/doc/paper/log/addDownload", {
        sourceName: "底稿管理",
        projectName: this.projectName,
        paperFlag: true,
        data: {
          projectId: this.pro_id,
          docPapers: this.fullsearchDataSel.map(v => {
            return { docName: v.docName, id: v.id };
          })
        }
      })
        .then(res => {})
        .catch(err => {});
    },
    selectChangeFn(val) {
      let data = this.$select.getSelectedData(2, this.pro_id);
      this.fullsearchDataSel = data.file;
      this.selectDir = data.dir;
      this.selectManaullyFile = data.manaullyFile;
    },
    // 点击全选复选框
    handleSelectAll(selection) {
      this.$select.updateStatus(2, this.pro_id, this.pro_id);
      selection.length
        ? this.$select.handleFileSelect(2, this.pro_id, this.pro_id, selection)
        : this.$select.handleCancel(
            2,
            this.pro_id,
            this.pro_id,
            this.fullsearchData
          );
    },
    // 点击单条复选框
    handleSelectDoc(selection, row) {
      this.$select.updateStatus(2, this.pro_id, this.pro_id);
      this.$select.fileSelect(
        2,
        this.pro_id,
        this.pro_id,
        selection,
        row,
        this.displaySelected
      );
    },
    // 导出功能
    exportClick() {
      this.$select.updateStatus(2, this.pro_id, this.pro_id);
      this.selectChangeFn();
      if (this.fullsearchDataSel.length == 0 && !this.selectDir.length) {
        this.$message.warning("请选择想要导出的文件或文件夹");
        return;
      }
      this.$store.commit("export", {
        url: "/doc/paper/ViewExport",
        data: {
          fileName: this.projectName,
          files: this.fullsearchDataSel.map(v => v.id).join(","),
          dirs: this.selectDir.map(v => v.id).join(","),
          source: 1,
          projectId: this.pro_id
        }
      });
    },
    // 复制按钮点击
    copyClick() {
      this.$select.updateStatus(2, this.pro_id, this.pro_id);
      this.selectChangeFn();
      let copyData = [...this.selectDir, ...this.selectManaullyFile];
      if (copyData.length == 0) {
        this.$message.warning("请选择想要复制的文件或文件夹");
        return;
      }
      let seleFileIds = [];
      let seleFolderIds = [];
      copyData.forEach(item => {
        if (item.docType != 1) {
          seleFileIds.push(item.id);
        } else {
          seleFolderIds.push(item.id);
        }
      });
      this.$store.commit("projectDocPaste", {
        ids: copyData.map(v => v.id).join(","),
        copyOrCut: "copy",
        sourceProjId: this.pro_id,
        hasCutOrCopy: true,
        seleFileIds,
        seleFolderIds,
        docSource: 1
      });
      this.$message.success("复制成功");
    },
    // 表格排序方法
    tableSort(column) {
      if (column.order != null) {
        let order = column.order;
        switch (column.prop) {
          case "docName":
            this.orderFlag = order == "ascending" ? 5 : 6;
            break;
          case "size":
            this.orderFlag = order == "ascending" ? 3 : 4;
            break;
          case "modifyTime":
            this.orderFlag = order == "ascending" ? 1 : 2;
            break;
          default:
            this.orderFlag = "";
        }
        this.queryData();
      }
    },
    queryData(isClearNum, updateId) {
      console.log(this.searchCondition.projectState, 123, this.projectStage);
      let idSet = [];
      let setList = [];
      if (isClearNum) {
        this.pageNo = 0;
      }
      (this.isSelectList || this.searchCondition.fileState.indexOf(1) !== -1) &&
        (idSet = [
          ...idSet,
          ...this.$select.getSelectedData(2, this.pro_id).file
        ]);
      if (!this.isSelectList)
        this.searchCondition.dirState.indexOf(3) !== -1 &&
          (idSet = [
            ...idSet,
            ...this.$select.getSelectedData(2, this.pro_id).dir
          ]);
      // 底稿添加项目阶段的名字
      let auditProjectNames = [];
      this.projectStage.map(v => {
        if (this.searchCondition.projectState == v.id) {
          return auditProjectNames.push(v.name);
        }
      });
      if (
        this.$route.query.searchData &&
        !!JSON.parse(this.$route.query.searchData).syslog
      ) {
        setList = JSON.parse(this.$route.query.searchData).set.map(v => v.id);
        console.log("setList,setListsetList", setList);
      } else {
        setList = idSet.map(v => v.id);
      }
      let data = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        sourceName: "底稿管理",
        projectName: this.$store.state.projectMsg.projectMsg.name,
        data: {
          projectId: this.pro_id,
          docContent: this.searchCondition.contentSearch,
          auditProjectIds: !!this.searchCondition.projectState
            ? [this.searchCondition.projectState]
            : [],
          auditProjectNames: auditProjectNames,
          docName: this.searchCondition.titleSearch,
          beginTime: new Date(this.searchCondition.startTime).getTime() || "",
          endTime:
            new Date(this.searchCondition.endTime).getTime() + 86400000 || "",
          suffixList: this.searchCondition.fileTypes,
          fileStatus: this.searchCondition.fileState,
          dirFileStatus: this.searchCondition.dirState,
          idSet: setList, // 勾选目录已选择 文件已选择
          orderFlag: this.orderFlag,
          docType: null,
          isSearch: true
        }
      };
      if (this.isSelectList) {
        data = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          sourceName: "底稿管理",
          projectName: this.$store.state.projectMsg.name,
          data: {
            projectId: this.pro_id,
            docContent: "",
            auditProjectIds: [],
            auditProjectNames: [],
            docName: "",
            beginTime: "",
            endTime: "",
            suffixList: [],
            fileStatus: [1],
            dirFileStatus: [],
            idSet: this.queryIds.map(v => v.id), // 勾选目录已选择 文件已选择
            orderFlag: "",
            docType: null,
            isSearch: true
          }
        };
      }
      this.$post("/doc/paper/queryFileByCondition", data)
        .then(res => {
          if (this.requestCode.SUCCESS != res.code && res.code != -504) {
            this.$message.error(res.msg);
            return;
          }
          if (res.code == -504) {
            this.tableDataTotal = 0;
            this.fullsearchData.length = 0;
            return;
          }
          if (
            this.pageNo + 1 > res.data.totalPages &&
            res.data.totalPages != 0
          ) {
            this.pageNo = res.data.totalPages - 1;
            this.queryData();
            return;
          }
          this.tableDataTotal = res.data.totalElements;
          this.fullsearchData = res.data.content;
          this.fullsearchData.length != 0 && this.laber(this.fullsearchData);
          this.fullsearchData.length != 0 && this.filePath(this.fullsearchData);
          this.displaySelected();
          this.fullsearchData.map(item => {
            item.keyContenthHight = "40px";
            this.iconFilter(item);
          });
          if (!!updateId) {
            this.fullsearchData.forEach(item => {
              item.id == updateId &&
                this.$select.handleFileSelect(2, this.pro_id, this.pro_id, [
                  item
                ]);
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 日期格式转时间戳
    // 请求项目阶段
    getProjectStage(callBack) {
      this.$post("/info/project/getImplementStageList", {
        data: {
          projectId: this.pro_id
        }
      })
        .then(res => {
          if (res.code != this.requestCode.SUCCESS) {
            this.$message(res.msg);
            return;
          }
          this.projectStage = res.data;
          console.log(res.data, "projectState");
          callBack && callBack();
        })
        .catch(err => {});
    },
    // 目录状态选择
    dirStateChangeData(arr) {
      this.searchCondition.dirState = arr.map(v => v.value);
    },
    // 文件状态选择
    fileStateChangeData(arr) {
      this.searchCondition.fileState = arr.map(v => v.value);
    },
    // 文件类型选择
    fileTypesChangeData(arr) {
      this.searchCondition.fileTypes = arr.map(v => v.value);
    },
    // 按钮组展开收起
    btnBoxToggle(val) {
      this[val] = !this[val];
      this.getPageHeight();
    },
    // 计算页面高度
    getPageHeight() {
      this.$nextTick(() => {
        try {
          let pageHeight =
            document.documentElement.clientHeight || document.body.clientHeight;
          this.tableHeight =
            pageHeight - this.needDomElem.btnGroupBox.clientHeight - 120;
          this.needDomElem.fullSearchBox.style.height = `${pageHeight - 150}px`;
          this.needDomElem.bottomBox.style.width = `${this.needDomElem.tableBox.clientWidth}px`;
        } catch (err) {}
      });
    },
    // 分页器每页显示改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageNo = 0;
      this.queryData();
    },
    // 切换页码
    handleCurrentChange(val) {
      this.pageNo = val - 1;
      this.queryData();
    },
    back() {
      if (this.backFlag) {
        this.isSelectList = false;
        this.backFlag = false;
        this.pageNo = 0;
        this.$store.commit("setSelectList", {
          viewType: this.isSelectList,
          backFlag: this.backFlag
        });
        this.queryData();
        return;
      }
      this.$router.push("/manuscriptmanage");
    },
    // 重置
    resetFn() {
      for (let key in this.searchCondition) {
        if (
          typeof this.searchCondition[key] == "string" ||
          typeof this.searchCondition[key] == "number"
        ) {
          this.searchCondition[key] = "";
        } else {
          this.$refs[key].clearSel();
        }
      }
      // this.$forceUpdate();
    },
    dblclickFn(itemValue, event, column) {
      if (column.type === "selection") return;
      //双击每条数据
      if (!rightSysPermissionFn(this.pro_id, "paper_file_file_preview")) {
        this.$message.warning("当前无权限");
        return;
      }
      // PC端预览格式限制
      if (
        this.isPC &&
        !this.$globalConfig.docTypeLimit.pcTypeCheck(itemValue.type)
      ) {
        this.$message.warning("该文件类型暂不支持在线编辑，请下载查看！");
        return;
      }
      if (itemValue.docType == 0) {
        var previewData = {
          projectId: this.pro_id,
          rfsId: itemValue.rfsId,
          docId: itemValue.docId,
          photoType: itemValue.type,
          sourceType: "manuscriptmanage",
          docName: itemValue.docName,
          id: itemValue.id,
          sourceName: "底稿管理"
        };
        itemValue.source = "1";
        if(this.isPC) {
          itemValue.sourceName = '底稿管理'
          itemValue.projectName = this.$store.state.projectMsg.projectMsg.name
          itemValue.paperFlag = true
        }
        this.isPC
          ? window.ChromeMain.CS_Main_OpenFile(JSON.stringify(itemValue)) // PC端双击在线编辑
          : this.$store.commit("previewAllFn", previewData); // web端预览
      }
    },
    toogleExpand(row) {
      let $table = this.$refs.table;
      this.fullsearchData.map(item => {
        if (row.id != item.id) {
          $table.toggleRowExpansion(item, false);
        }
      });
      $table.toggleRowExpansion(row);
    },
    docPositon(row) {
      //文件定位
      this.$post("/doc/paper/location", {
        data: {
          projectId: this.pro_id,
          id: row.id,
          type: "paper",
          docType: row.docType
        },
        pageSize: 100
      })
        .then(res => {
          if (this.requestCode.SUCCESS !== res.code) {
            if (this.requestCode.RESULT_EMPTY == res.code) {
              return;
            } else {
              this.$message.error(res.msg);
              return;
            }
          }

          // return
          res.data.id = row.id;
          this.$router.push({
            path: "/manuscriptmanage",
            query: {
              locationData: JSON.stringify(res.data)
            }
          });
        })
        .catch(error => {});
    },
    filePath(val) {
      this.$post("/doc/project/link/docPath", {
        data: {
          paperIdSet: Array.isArray(val) ? val.map(v => v.id) : [val.id]
        }
      })
        .then(res => {
          if (res.code != 0) {
            this.$message.error(res.msg);
            return;
          }
          Object.keys(res.data.docPaper).forEach(id => {
            this.fullsearchData.forEach(item => {
              id == item.id &&
                this.$set(
                  item,
                  "fullPath",
                  res.data.docPaper[id].reverse().join(" / ")
                );
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    laber(val) {
      this.$post("/doc/paper/docStatusAll", {
        data: {
          idSet: Array.isArray(val) ? val.map(v => v.id) : [val.id],
          projectId: this.pro_id
        }
      })
        .then(response => {
          if (response.code == -503) {
            return;
          }
          if (response.code != 0) {
            this.$message.error(response.msg);
            return;
          }
          Object.keys(response.data).forEach(id => {
            this.fullsearchData.forEach(item => {
              if (id == item.id) {
                let resItem = response.data[id];
                this.$set(item, "icon", resItem.paperLabelList);
                this.$set(item, "indexPaper", resItem.linkList);
                // 0:审批中/1:审批通过/2:驳回未修改/3:节点审批通过/4:待审批/5:驳回已修改/6:修订审批中/7:修订中/8:已归档
                this.$set(item, "auditStatus", resItem.auditStatus);
                this.$set(item, "notes", resItem.notes); // 是否有备注信息
                this.$set(item, "reminder", resItem.reminder); // 是否有文件提醒
                this.$set(item, "lockState", resItem.lockState); // 是否有锁
                this.$set(item, "record", resItem.record); // 是否有审批意见
                this.$set(item, "isShowIcon", true); // 防止图标闪烁
              }
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * @param  {Number} page 当前页码，默认1
     * @param  {Number} pageSize 每页最多显示条数，默认10
     * @param  {Array}  totalData 总的数据集，默认为空数组
     * @return {Object} {
     *      data, //当前页展示数据，数组
     *      page, //当前页码
     *      pageSize, //每页最多显示条数
     *      length, //总的数据条数
     *    }
     **/
    getTableData(page = 1, pageSize = 100, totalData = []) {
      const { length } = totalData;
      const tableData = {
        data: [],
        page,
        pageSize,
        length
      };
      if (pageSize >= length) {
        // pageSize大于等于总数据长度，说明只有1页数据或没有数据
        tableData.data = totalData;
        tableData.page = 1; // 直接取第一页
      } else {
        // pageSize小于总数据长度，数据多余1页
        const num = pageSize * (page - 1); // 计算当前页（不含）之前的所有数据总条数
        if (num < length) {
          // 如果当前页之前所有数据总条数小于（不能等于）总的数据集长度，则说明当前页码没有超出最大页码
          const startIndex = num; // 当前页第一条数据在总数据集中的索引
          const endIndex = num + pageSize - 1; // 当前页最后一条数据索引
          tableData.data = totalData.filter(
            (_, index) => index >= startIndex && index <= endIndex
          ); // 当前页数据条数小于每页最大条数时，也按最大条数范围筛取数据
        } else {
          // 当前页码超出最大页码，则计算实际最后一页的page，自动返回最后一页数据
          const size = parseInt(length / pageSize); // 取整
          const rest = length % pageSize; // 取余数
          if (rest > 0) {
            // 余数大于0，说明实际最后一页数据不足pageSize，应该取size+1为最后一条的页码
            tableData.page = size + 1; // 当前页码重置，取size+1
            tableData.data = totalData.filter(
              (_, index) => index >= pageSize * size && index <= length
            );
          } else if (rest === 0) {
            // 余数等于0，最后一页数据条数正好是pageSize
            tableData.page = size; // 当前页码重置，取size
            tableData.data = totalData.filter(
              (_, index) => index >= pageSize * (size - 1) && index <= length
            );
          } // 余数不可能小于0
        }
      }
      return tableData;
    },
    iconFilter(itemValue) {
      //过滤重命名的icon
      if (itemValue.docType == 1) {
        itemValue.fileIcon = require("../../common/fileIcon/FolderType1.png");
      } else {
        var hz_name = itemValue.type.toLowerCase();
        if (hz_name == "doc" || hz_name == "docx" || hz_name == "rtf") {
          itemValue.fileIcon = require("../../common/fileIcon/DocType.png");
        } else if (
          hz_name == "xls" ||
          hz_name == "xlsx" ||
          hz_name == "excel"
        ) {
          itemValue.fileIcon = require("../../common/fileIcon/XlsType.png");
        } else if (
          hz_name == "ppt" ||
          hz_name == "pptx" ||
          hz_name == "pps" ||
          hz_name == "ppsx" ||
          hz_name == "ppsm"
        ) {
          itemValue.fileIcon = require("../../common/fileIcon/PptType.png");
        } else if (
          hz_name == "jpg" ||
          hz_name == "jpeg" ||
          hz_name == "gif" ||
          hz_name == "bmp" ||
          hz_name == "png"
        ) {
          itemValue.fileIcon = require("../../common/fileIcon/ImgType.png");
        } else if (
          hz_name == "wmv" ||
          hz_name == "avi" ||
          hz_name == "dat" ||
          hz_name == "asf" ||
          hz_name == "rm" ||
          hz_name == "rmvb" ||
          hz_name == "mpg"
        ) {
          itemValue.fileIcon = require("../../common/fileIcon/VideoType.png");
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
          itemValue.fileIcon = require("../../common/fileIcon/VideoType.png");
        } else if (
          hz_name == "mp3" ||
          hz_name == "wav" ||
          hz_name == "wma" ||
          hz_name == "mid"
        ) {
          itemValue.fileIcon = require("../../common/fileIcon/MusicType.png");
        } else if (hz_name == "pdf") {
          itemValue.fileIcon = require("../../common/fileIcon/PdfType.png");
        } else if (hz_name == "indd") {
          itemValue.fileIcon = require("../../common/fileIcon/indd.png");
        } else if (hz_name == "ai") {
          itemValue.fileIcon = require("../../common/fileIcon/ai.png");
        } else if (hz_name == "psd") {
          itemValue.fileIcon = require("../../common/fileIcon/ps.png");
        } else if (hz_name == "tif") {
          itemValue.fileIcon = require("../../common/fileIcon/tiff.png");
        } else if (hz_name == "zip" || hz_name == "rar") {
          itemValue.fileIcon = require("../../common/fileIcon/RarType.png");
        } else {
          itemValue.fileIcon = require("../../common/fileIcon/other.png");
        }
      }
    }
  }
};
</script>
<style lang="">
.manu_fullsearch .el-table .el-table__expand-column div {
  padding: 0;
}
.manu_fullsearch .el-table__expand-icon > .el-icon:before {
  content: "";
}
</style>
<style lang="scss" scoped>
.manu_fullsearch {
  .fullsearch_header {
    height: 90px;
    background-color: #fff;
    text-align: left;
    margin-bottom: 10px;
    box-sizing: border-box;
    padding: 14px 0 21px 21px;
    .title_box {
      display: flex;
      align-items: center;
      line-height: 60px;
      /deep/ .back_icon {
        border: none;
      }
      .title_msg {
        padding-left: 15px;
        font-size: 20px;
      }
    }
  }
  /* 版本弹框样式 */
  .versions_dialog .el-dialog__header {
    border-bottom: 1px solid #dddddd;
    text-align: center;
  }

  .versions_dialog .el-dialog__body {
    padding: 20px 0;
  }

  .versions_dialog li {
    width: 100%;
    line-height: 40px;
    border-bottom: 1px solid #e7e7e7;
  }

  .versions_dialog .span_two {
    float: left;
    width: 17%;
  }

  .versions_dialog .span_first {
    float: left;
    width: 40%;
    text-align: left;
    margin-left: 5%;
  }

  .versions_dialog ul li div {
    height: 350px;
  }

  .version_content_item {
    width: 100%;
  }

  .version_content_item:hover {
    background: #fafafa;
  }

  .versions_dialog .span_btn {
    float: left;
    width: 40%;
    text-align: left;
    margin-left: 5%;
  }

  .versions_dialog .span_sec {
    float: left;
    width: 17%;
  }

  .span_sec .span_sec_return {
    color: #1a5fa4;
  }

  .span_sec .span_sec_down {
    color: #1a5fa4;
  }

  /deep/ #manuscriptmanage .versions_dialog .el-scrollbar .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .fullsearch {
    width: 100%;
    background: #ffffff;
    // 底部样式
    .bottom_box_fixed {
      height: 50px;
      .bottom_box {
        position: fixed;
        bottom: 10px;
        z-index: 999;
        background: #fff;
        border-top: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        width: 100%;
        box-sizing: border-box;
        .sel_total {
          padding-left: 23px;
          box-sizing: border-box;
        }
        .bottom_pagination {
          padding-right: 24px;
          box-sizing: border-box;
          margin: 5px 0;
        }
      }
    }

    // 展开收起样式
    .fullsearch_nav {
      width: 100%;
      display: flex;
      //   align-items: center;
      flex-direction: column;
      // 展开收起样式
      .btn_drop {
        width: 48px;
        height: 24px;
        font-size: 12px;
        border: 1px solid rgba(215, 218, 226, 1);
        border-radius: 4px;
        flex-shrink: 0;
        &:hover {
          cursor: pointer;
          color: #fff;
        }
        .drop_icon {
          font-size: 8px;
        }
        &_search {
          margin: 17px 20px 0 0;
        }
        &_group {
          margin: 14px 20px 0 0;
        }
      }
      // 检索组
      .search_box {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ddd;
        .search_btn {
          width: 216px;
          padding: 7px 0 7px 8px;
          /deep/ .el-button {
            width: 97px;
            height: 40px;
          }
        }
        .default_search_btn {
          margin-top: 8px;
        }
        .search_box_toggle {
          max-height: 500px !important;
          max-width: 100% !important;
        }
        .search_box_left {
          // display: flex;
          // flex-wrap: wrap;
          max-height: 52px;
          max-width: 50%; /*写给不支持calc()的浏览器*/
          max-width: -moz-calc(100% - 350px);
          max-width: -webkit-calc(100% - 350px);
          max-width: calc(100% - 350px);
          overflow: hidden;
          padding: 8px 0 8px 20px;
          .search_item {
            // display: flex;
            float: left;
            height: 40px;
            // justify-content: space-between;
            padding: 7px 22px 7px 0;
            .search_tit {
              float: left;
              width: 90px;
              line-height: 40px;
            }
            .el_wide {
              float: left;
            }
            /deep/ .el-input[class~="el_wide"],
            .el-select[class~="el_wide"] {
              width: 286px;
              height: 40px;
            }
          }
        }
      }
      .btn_group_toggle {
        max-height: 300px !important;
      }
      .nav_operation {
        display: flex;
        justify-content: space-between;
        .btn_box {
          max-height: 40px;
          margin: 5px 0 5px 19px;
          display: flex;
          flex-wrap: wrap;
          overflow: hidden;
          .operation_chunk {
            height: 32px;
            background: #f2f3f5;
            margin: 5px 10px 5px 0;
            // display: flex;
            float: left;
            align-items: center;
            border-radius: 2px;
            font-size: 14px;
            &:hover {
              color: #fff;
              cursor: pointer;
            }
            .chunk_icon {
              display: inline-block;
              margin: 8px 7px 7px 12px;
            }
            .chunk_name {
              display: inline-block;
              padding-right: 12px;
            }
          }
        }
      }

      .back_btn {
        margin-left: 15px;
      }
      .nav_fullsearch {
        display: flex;
        align-items: center;
        span {
          display: inline-block;
          margin-left: 10px;
        }
        .el-input {
          width: 310px;
          margin-left: 10px;
        }
      }
      .nav_projectSelect {
        width: 250px;
        margin-left: 50px;
      }
      .nav_reset {
        width: 100px;
      }
      .nav_query {
        width: 100px;
        margin-left: 50px;
      }
      span {
        display: inline-block;
      }
    }
    .fullsearch_title {
      width: 100%;
      height: 52px;
      display: flex;
      align-items: center;
      background: #fafafa;
      .fullsearch_title_fileName {
        margin-left: 68px;
      }
      .fullsearch_title_project {
        margin-left: 200px;
      }
      .fullsearch_title_catalogue {
        margin-left: 183px;
      }
      .fullsearch_title_time {
        margin-left: 281px;
      }
      .fullsearch_title_operation {
        margin-left: 132px;
      }
      span {
        display: inline-block;
      }
    }
    .table_projName {
      width: 100%;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .table_parentName {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .list_time {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .list_time_updateTime {
        display: flex;
        justify-content: center;
        color: #999999;
        font-size: 12px;
      }

      div {
        display: flex;
        justify-content: center;
        color: #999999;

        .list_time_updateUserName {
          display: inline-block;
          width: 60px;
          color: #333333;
          font-size: 12px;
          margin-left: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .list_time_docVersionNumber {
          display: inline-block;
          font-size: 12px;
          font-weight: bold;
        }
      }
    }
    .paper_index_name {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .table_time {
      width: 131px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .table_time_updateTime {
        display: flex;
        justify-content: flex-end;
        color: #999999;
        font-size: 12px;
      }
      div {
        display: flex;
        justify-content: flex-end;
        color: #999999;
        .table_time_updateUserName {
          display: inline-block;
          width: 60px;
          color: #333333;
          font-size: 12px;
          margin-left: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .table_time_time_docVersionNumber {
          font-size: 12px;
          font-weight: bold;
        }
      }
    }
    .table_operation {
      width: 100px;
      display: flex;
      align-items: center;
      .operation_abstract {
        color: #1a5fa4;
        font-size: 12px;
        cursor: pointer;
      }
      .operation_positioning {
        display: inline-block;
        width: 10px;
        height: 18px;
        background: url("../../../assets/manuscript_icon/positioning_icon.png")
          no-repeat;
        background-size: 10px 14px;
        margin-left: 7px;
        cursor: pointer;
      }
    }
    .list_name {
      display: flex;
      .list_name_icon {
        width: 36px;
        height: 36px;
        display: flex;
        justify-content: center;
        align-items: center;

        .list_name_icon_img {
          width: 23px;
          height: 23px;
        }
      }

      .list_name_title3 .three-row-name {
        line-height: 30px;
        margin-top: 4px;
      }

      .list_name_title3 .list_name_title_icon {
        padding-bottom: 4px;
      }

      .list_name_title2 .three-row-name {
        line-height: 20px;
        margin-top: 10px;
        padding-bottom: 6px;
      }

      .list_name_title2.list_name_title3 .three-row-name {
        line-height: 20px;
        margin-top: 6px;
        padding-bottom: 6px;
      }

      .list_name_title {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;

        div {
          width: 100%;
          color: #2a383f;
          font-size: 14px;
          display: flex;
          align-items: center;

          span {
            max-width: calc(100% - 25px);
            display: inline-block;
            color: #2a383f;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          i {
            /*margin-left: 100px;*/
            color: #ccc;
            /*display: none;*/
            cursor: pointer;
            margin-left: 10px;
          }
        }

        .list_name_title_icon {
          display: flex;
          align-items: center;
          line-height: 17px;

          .list_icon {
            display: inline-block;
            font-size: 14px;
            padding: 2px 3px 0px 3px;
          }

          .icon_lock {
            color: #c0c4cc;
          }

          .icon_remind {
            color: #f56c6c;
          }

          .icon_note {
            color: #299be4;
          }

          .icon_record {
            color: #f8b164;
          }

          .list_icon_img {
            display: inline-block;
            height: 17px;
          }

          $imgUrl: "../../../assets/project_doc/";

          // 表格内图片图标
          .auditStatus_z {
            background: url($imgUrl+"shenpizhong.png") no-repeat 0% 0%/40px 17px;
            width: 40px;
          }

          .auditStatus_dsp {
            background: url($imgUrl+"daishenpi.png") no-repeat 0% 0%/40px 17px;
            width: 40px;
          }

          .auditStatus_xdz {
            background: url($imgUrl+"xiudingzhong.png") no-repeat 0% 0%/40px
              17px;
            width: 40px;
          }
          .auditStatus_passed {
            background: url($imgUrl+"passed.png") no-repeat 0% 0%/40px 17px;
            width: 40px;
          }
          .auditStatus_noPassed {
            background: url($imgUrl+"noPassed.png") no-repeat 0% 0%/40px 17px;
            width: 40px;
          }

          .auditStatus_ygd {
            background: url($imgUrl+"yiguidang.png") no-repeat 0% 0%/40px 17px;
            width: 40px;
          }

          .auditStatus_pass {
            background: url($imgUrl+"shenpitongguo.png") no-repeat 0% 0%/50px
              17px;
            width: 50px;
          }

          .auditStatus_jdsptg {
            background: url($imgUrl+"jiedianshenpitongguo.png") no-repeat 0% 0%/60px
              17px;
            width: 60px;
          }

          .auditStatus_xdspz {
            background: url($imgUrl+"xuidingshenpizhong.png") no-repeat 0% 0%/60px
              17px;
            width: 60px;
          }

          .auditStatus_bhwxg {
            background: url($imgUrl+"bohuiweixiugai.png") no-repeat 0% 0%/60px
              17px;
            width: 60px;
          }

          .auditStatus_bhyxg {
            background: url($imgUrl+"bohuiyixiugai.png") no-repeat 0% 0%/60px
              17px;
            width: 60px;
          }
        }
      }
    }
  }
  /deep/ .table_header_style {
    th {
      background: #f9f9f9 !important;
      height: 42px;
      color: #333;
      padding: 0;
    }
  }
  #list_name_title_auditStatusdivs {
    display: inline-block;
    height: 47px;
    margin-top: -7px;
    white-space: initial;
    padding-top: 15px;
    .el-tag {
      margin-left: 5px !important;
      display: inline-block !important;
      height: 17px !important;
      line-height: 14px !important;
      max-width: 78px !important;
      font-size: 9px !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      white-space: nowrap !important;
    }
  }
}
</style>

