<template>
  <div class="manuscriptmanage_box" id="manuscriptmanage_box">
    <div class="manuscriptmanage_header">
      <div class="header_break">
        <el-breadcrumb class="page-breadcrumb">
          <el-breadcrumb-item>{{nameinfo}}</el-breadcrumb-item>
          <el-breadcrumb-item>{{getcategoryId == 2?'文件审批':getcategoryId == 10?'文件修订审批':getcategoryId == 3?'目录审批':'目录修订审批'}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="indexpage_header">
        <div class="header_title">
          <i @click="Filepageht" class="iconfont">&#xe755;</i>
          <span class="files">{{getcategoryId == 2?'文件审批':getcategoryId == 10?'文件修订审批':getcategoryId == 3?'目录审批':'目录修订审批'}}</span>
        </div>
        <div class="header_operation">
          <el-button type="primary" v-show="isden"  v-if="Approvers" @click="nodeApproval">节点审批</el-button>
          <el-button type="primary" :disabled="toggleFlag" @click="toggleView">切换{{viewType?'列表视图':'目录视图'}}</el-button>
        </div>
      </div>
    </div>
    <div class="manuscriptmanage" id="manuscriptmanage">
      <div
        class="bottom_catalogue"
        id="bottom_catalogue"
        ref="bottom_catalogue"
        v-show="viewType"
        :style="{ width: shrink_bac ? '25px' : '300px' }">
        <div class="catalogue_search">
          <el-input
            placeholder="搜索目录"
            clearable
            maxlength ="30"
            v-model="catalogue_search_input"
            @keyup.enter.native="searchDirFn()"
            @change="searchChange()"
            v-if="searchFlag"
            class="catalogue_search_input"
          >
            <el-button slot="append" icon="el-icon-search" @click="searchDirFn"></el-button>
          </el-input>

          <div
            class="catalogue_search_showTitle"
            v-if="dirData.length != 0 && searchFlag && searchEmpty == false">
            <p class="catalogue_search_showTitle_left">共{{ dirNum }}个结果,第{{ searchIdx }}个</p>
            <div class="catalogue_search_showTitle_right">
              <el-button
                style="padding: 5px"
                size="mini"
                icon="el-icon-arrow-up"
                :disabled="searchIdx === 1 || searchIdx === 0"
                @click="searchUpNode"
              ></el-button>
              <el-button
                style="padding: 5px"
                size="mini"
                icon="el-icon-arrow-down"
                :disabled="searchIdx === dirNum || searchIdx === 0"
                @click="searchDownNode"
              ></el-button>
            </div>
          </div>
          <div class="catalogue_search_showTitle_empty" v-if="searchEmpty">
            <p class="catalogue_search_showTitle_empty_left">未搜索到结果</p>
          </div>
        </div>
        <!-- 适配搜索后zTree高度 -->
        <div :class="['catalogue_tree', { search_tree: searchIdx > 0 }]" v-show="!searchEmpty">
          <ul id="manuscriptTree" class="ztree manuscriptZtree"></ul>
        </div>
        <div class="catalogue_operation"></div>
        <span :class="[shrink_bac ? 'shrink_bac_push' : 'shrink_bac_pull']" @click="shrinkFn"></span>
      </div>

      <div class="bottom_indexpage">
        <div class="indexpage_nav">
          <!-- 检索条件 -->
          <div class="search_box" id="search_box" v-on:keyup.enter="search">
            <div
              :class="[
                'search_box_left',
                { search_box_toggle: !searchBtnDrop }
              ]"
            >
            <!-- search-item-box这个class不要动，方法里面有用到 -->
              <div class="search-item-box clearfix">
                    <div class="search_item">
                        <div class="search_tit">{{(getcategoryId == 2 || getcategoryId== 10)?'标题':'目录'}}关键字：</div>
                        <el-input v-model="titleSearch" class="el_wide" placeholder="包含以下全部关键字(以空格区分)"></el-input>
                    </div>
                    <div class="search_item" v-if="getcategoryId == 2 || getcategoryId== 10">
                        <div class="search_tit">内容关键字：</div>
                        <el-input v-model="contentSearch" class="el_wide" placeholder="包含以下全部关键字(以空格区分)"></el-input>
                    </div>
                    <div class="search_item"  v-show="getcategoryId == 2 || getcategoryId== 10">
                        <div class="search_tit" >项目阶段：</div>
                        <el-select v-model="projectState" class="el_wide" placeholder="请选择项目阶段">
                          <el-option
                              v-for="(item, index) in projectStage"
                              :label="item.name"
                              :key="index"
                              :value="item.id"
                          ></el-option>
                        </el-select>
                    </div>
                    <div class="search_item" v-if="getcategoryId == 2 || getcategoryId== 10">
                        <div class="search_tit">文件类型：</div>
                        <multiple-choice
                        ref="fileTypes"
                        @changeData="fileTypesChangeData"
                        :selectData="fileTypes"
                        :width="196" class="el_wide"
                        ></multiple-choice>
                    </div>
                    <div class="search_item" v-if="getcategoryId == 2 || getcategoryId== 10">
                        <div class="search_tit">文件状态：</div>
                        <multiple-choice
                        ref="fileState"
                        @changeData="fileStateChangeData"
                        :selectData="fileStateProject"
                        :width="196" class="el_wide"
                        ></multiple-choice>
                    </div>
                    <div class="search_item">
                        <div class="search_tit">目录状态：</div>
                        <multiple-choice
                        ref="dirState"
                        @changeData="dirStateChangeData"
                        :selectData="this.Sourceof?dirStateProject:mufile"
                        :width="196" class="el_wide"
                        ></multiple-choice>
                    </div>
                    <div class="search_item">
                        <div class="search_tit">修改时间：</div>
                        <!-- 修改时间 -->
                        <date-range
                        :width="196"
                        :date-start.sync="startTime"
                        :date-end.sync="endTime"
                        format="yyyy-MM-dd" class="el_wide"
                        ></date-range>
                    </div>
                    <div class="search_btn fl" v-show="!searchBtnDrop">
                        <el-button type="primary" icon="el-icon-search" @click="search" class="el_wide">查询</el-button>
                        <el-button icon="el-icon-refresh" @click="resetFn" class="el_wide">重置</el-button>
                    </div>
                    <!-- <div class="search_btn default_search_btn" v-show="searchBtnDrop">
                        <el-button type="primary" icon="el-icon-search" @click="search">查询2</el-button>
                        <el-button icon="el-icon-refresh" @click="resetFn">重置</el-button>
                    </div> -->
              </div>
            </div>
              <div class="search_btn default_search_btn" v-show="searchBtnDrop">
                <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
                <el-button icon="el-icon-refresh" @click="resetFn">重置</el-button>
            </div>
            <div class="btn_drop">
              <el-button
                @click="btnBoxToggle('searchBtnDrop')"
                type="primary"
                size="mini"
                round
                plain v-if="moreSearchBtnVisible"
              >
                {{ searchBtnDrop ? "更多" : "收起" }}
                <i
                  :class="[
                    'drop_icon',
                    'iconfont',
                    searchBtnDrop ? 'jiantou' : 'jiantou_shang'
                  ]"
                ></i>
              </el-button>
            </div>
          </div>
          <!-- 按钮组 -->
          <div class="nav_operation">
            <div :class="['btn_box', { btn_group_toggle: !btnGroupDrop }]" id="btn_box">
              <div class="toolbar_file-box">
                <div class="toolbar_file clearfix">
                  <div class="operation_chunk" @click="downloadFn">
                    <i class="iconfont Shapecopy chunk_icon"></i>
                    <span class="chunk_name">下载</span>
                  </div>
                  <div class="operation_chunk" v-if="getcategoryId == 2 || getcategoryId== 10" @click="approvalList">
                      <i class="shenpi iconfont chunk_icon"></i>
                      <span class="chunk_name">审批</span>
                  </div>
                  <div v-else class="operation_chunk" @click="approvalList">
                    <el-popover
                        placement="top-start"
                        title="小提示"
                        width="300"
                        trigger="hover">
                        <p>如需针对单个目录进行审批操作，可将筛选项中的目录状态选为待审批后点击查询，即可对单个目录进行审批操作</p>
                        <p>注：目录审批搜索结果页不会联动选中目录</p>
                        <div slot="reference">
                        <i class="shenpi iconfont chunk_icon"></i>
                        <span class="chunk_name">审批</span>
                    </div>
                    </el-popover>
                  </div>
                  <div class="operation_chunk" @click="versionsDialogFn" v-if="getcategoryId == 2 || getcategoryId== 10">
                    <i class="xinjianbanbenku iconfont chunk_icon"></i>
                    <span class="chunk_name">版本</span>
                  </div>
                  <div class="operation_chunk" @click="discussionFn">
                    <i class="taolun iconfont chunk_icon"></i>
                    <span class="chunk_name">讨论</span>
                  </div>

                  <div class="operation_chunk" @click="toSelectList" v-if="getcategoryId == 2 || getcategoryId== 10">
                    <i class="yixuanliebiao iconfont chunk_icon"></i>
                    <span class="chunk_name">已选文件列表</span>
                  </div>

                  <div class="operation_chunk" @click="deselected(true)">
                    <i class="quxiaoxuanze iconfont chunk_icon"></i>
                    <span class="chunk_name">取消选择</span>
                  </div>
                  <div class="operation_chunk" @click="exportinfo">
                    <i class="iconfont chunk_icon">&#xe60c;</i>
                    <span class="chunk_name">导出</span>
                  </div>
                  <div class="operation_chunk" @click="remarkClick" v-if="getcategoryId == 2 || getcategoryId== 10">
                    <i class="beizhu iconfont chunk_icon"></i>
                    <span class="chunk_name">备注</span>
                  </div>
                  <div class="operation_chunk" @click="approvalHandle">
                    <i class="wenjianshenpishenhequeren iconfont chunk_icon"></i>
                    <span class="chunk_name">{{(getcategoryId == 2 || getcategoryId== 10)?'文件':'目录'}}审批意见</span>
                  </div>

                </div>
              </div>
            </div>
            <div class="btn_drop">
              <el-button
                @click="btnBoxToggle('btnGroupDrop')"
                type="primary"
                size="mini"
                round
                plain v-if="moreHandleBtnVisible"
              >
                {{ btnGroupDrop ? "更多" : "收起" }}
                <i
                  :class="[
                    'drop_icon',
                    'iconfont',
                    btnGroupDrop ? 'jiantou' : 'jiantou_shang'
                  ]"
                ></i>
              </el-button>
            </div>
          </div>
          <!-- 路径 -->
          <div class="nav_title" v-show="viewType">
            <div class="title_left">
              <div class="title_nav">
                <path-bar :paths="navArray" field="docName" @toggle="navClickFn"></path-bar>
              </div>
            </div>
          </div>
        </div>
        <div class="indexpage_list" id="indexpage_list">
          <el-table
            ref="multipleTable"
            :data="flieNameData"
            @select-all="handleSelectAll"
            @select="handleSelectDoc"
            style="width: 100%;"
            @sort-change="sort_change"
            @row-dblclick="dblclickFn"
            @selection-change="selectChangeFn"
            size="small"
            class="manu_table"
            id="manu_table"
            :header-cell-style="viewType?{background:'rgba(255, 255, 255, 1)'}:{background:'rgba(250, 250, 250, 1)'}"
            :row-style="rowClass"
            :height="tableHeight"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column
              label="文件名"
              sortable="custom"
              class="tabel_name"
              prop="docName"
              min-width="300"
              style="background:red; color: red;"
            >
              <template slot-scope="scope">
                <div class="list_name">
                  <div class="list_name_icon" v-if="!scope.row.isAddDir">
                    <img class="list_name_icon_img" :src="scope.row.fileIcon" />
                  </div>
                  <template v-if="scope.row.isEdit || scope.row.isAddDir">
                    <div v-if="scope.row.isEdit" class="list_name_rename">
                      <el-input
                        class="title_input"
                        v-model="editName_input"
                        maxlength="250"
                        clearable
                      ></el-input>
                      <i class="editIcon el-icon-success" title="确定" @click="editNameFn"></i>
                    </div>
                    <div v-if="scope.row.isAddDir" class="list_name_rename">
                      <el-input class="title_input" v-model="addDirInput" maxlength="250" clearable></el-input>
                      <i class="addIcon el-icon-error" title="取消"></i>
                      <i class="editIcon el-icon-success" title="确定"></i>
                    </div>
                  </template>

                  <div
                    v-else-if="scope.row.isLinkDelete == 1"
                    class="list_name_title_die"
                    :title="scope.row.docName"
                  >
                    {{ scope.row.docName }}
                    <div id="list_name_title_auditStatusdiv" v-if="scope.row.icon">
                      <el-tag
                        class="list_name_title_auditStatus_tag"
                        style="text-decoration: line-through;color: #ccc;"
                        :title="i.labelName"
                        :key="i.id"
                        v-for="i in scope.row.icon"
                      >{{ i.labelName }}</el-tag>
                    </div>
                  </div>
                  <div
                    v-else
                    :class="[
                      {
                        list_name_title3:
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
                      <span>{{ scope.row.docName }}</span>
                    </div>

                    <span class="list_name_title_icon">
                      <!-- 审批状态图片 -->
                      <!-- <span v-if="scope.row.showInitStatus">

                      </span> -->
                      <span
                        v-if="scope.row.auditStatus == 0 && scope.row.showInitStatus"
                        title="审批中"
                        class="list_icon_img auditStatus_z"
                      ></span>
                      <span
                        v-if="scope.row.auditStatus == 1  && scope.row.showInitStatus"
                        title="审批通过"
                        class="list_icon_img auditStatus_pass"
                      ></span>
                      <span
                        v-if="scope.row.auditStatus == 3 && scope.row.showInitStatus"
                        title="节点审批通过"
                        class="list_icon_img auditStatus_jdsptg"
                      ></span>
                      <span
                        v-if="scope.row.auditStatus == 4 && scope.row.showInitStatus"
                        title="待审批"
                        class="list_icon_img auditStatus_dsp"
                      ></span>
                      <span
                        v-if="scope.row.auditStatus == 7 && scope.row.showInitStatus"
                        title="修订中"
                        class="list_icon_img auditStatus_xdz"
                      ></span>
                      <span
                        v-if="scope.row.auditStatus == 8 && scope.row.showInitStatus"
                        title="已归档"
                        class="list_icon_img auditStatus_ygd"
                      ></span>
                      <span
                        v-if="scope.row.auditStatus == 6 && scope.row.showInitStatus"
                        title="修订审批中"
                        class="list_icon_img auditStatus_xdspz"
                      ></span>
                      <span
                        v-if="scope.row.auditStatus == 2 && scope.row.showInitStatus"
                        title="驳回未修改"
                        class="list_icon_img auditStatus_bhwxg"
                      ></span>
                      <span
                        v-if="scope.row.auditStatus == 5 && scope.row.showInitStatus"
                        title="驳回已修改"
                        class="list_icon_img auditStatus_bhyxg"
                      ></span>
                      <!-- 本次审批过的文件状态展示为文件新的操作结果-->
                       <span
                        v-if="scope.row.auditStatus == 0 && !scope.row.showInitStatus"
                        title="待审批"
                        class="list_icon_img auditStatus_dsp"
                      ></span>
                      <!-- 要修改的 -->
                      <span
                        v-if="scope.row.auditStatus == 1  && !scope.row.showInitStatus"
                        title="已通过"
                        class="list_icon_img auditStatus_z1"
                      ></span>
                       <span
                        v-if="scope.row.auditStatus == 2 && !scope.row.showInitStatus"
                        title="已驳回"
                        class="list_icon_img auditStatus_z3"
                      ></span>
                       <!-- <span
                        v-if="scope.row.auditStatus == 2 && !scope.row.showInitStatus && scope.row.docType == 1"
                        title="未通过"
                        class="list_icon_img auditStatus_z4"
                      ></span> -->

                      <span
                        v-if="scope.row.auditStatus == 7 && !scope.row.showInitStatus"
                        title="已修订"
                        class="list_icon_img auditStatus_z2"
                      ></span>
                      <!-- 状态logo -->
                      <span
                        v-if="scope.row.lockState"
                        title="锁定"
                        class="list_icon icon_lock tubiao-suo iconfont"
                      ></span>
                      <span
                        v-if="Sourceof && scope.row.isLink == 1"
                        title="索引"
                        class="list_icon icon_remind suoyin iconfont"
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
                      <span
                        title="不可操作"
                        v-if="!scope.row.isCheck"
                        class="list_icon icon_lock Icon-jinyong iconfont"
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
            
            <!-- 7.17修改为所在目录 -->
            <el-table-column
              prop="parentName"
              v-if="!viewType"
              label="所在目录"
              label-class-name="list_title_time"
              min-width="140"
            >
              <template slot-scope="scope">
                
                    <!-- :title="(getcategoryId == 2 || getcategoryId== 10)?scope.row.pathinfo:scope.row.pathss" -->
                <div class="list_time"
                    @mouseover="getfullPath(scope.row)"
                    style="width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"
                    :title="`${scope.row.fullPath}`">
                    {{scope.row.parentName}}
                </div>
              </template>
            </el-table-column>

            <el-table-column
              label="修改时间"
              prop="modifyTime"
              sortable="custom"
              label-class-name="list_title_time"
              min-width="140"
              align="center"
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
                    <span>
                      生成
                      <span
                        class="color-primary list_time_docVersionNumber"
                      >V{{ scope.row.docVersionNumber }}</span>
                    </span>
                  </div>
                </div>
                <div v-else>
                  <span class="list_time_updateTime" v-if="getcategoryId != 2 && getcategoryId != 10">{{ scope.row.updateTime }}</span>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="大小" prop="size" align="center" sortable="custom" width="80">
              <template slot-scope="scope">
                <div class="list_size">{{ renderSize(scope.row.docSize) }}</div>
              </template>
            </el-table-column>

            <el-table-column label="底稿关联" align="center" min-width="270">
              <template slot-scope="scope">
                <div class="list_size" v-if="scope.row.docType === 0 && scope.row.indexPaper">
                  <p
                    v-for="(item, index) in scope.row.indexPaper"
                    :key="index"
                    @mouseover="indexPaperHover(item, scope.row)"
                    @click="paperIndexView(scope.row, item)"
                    :title="item.title"
                    :class="[
                      'paper_index_name',
                      {
                        paper_index_name_die:
                          scope.row.isLinkDelete == 1 || item.isLinkDelete == 1
                      }
                    ]"
                  >{{ item.docName }}</p>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="bottom_box_fied">
          <div class="bottom_box" ref="bottom_box">
            <div class="sel_total" ><span v-show="getcategoryId == 2 || getcategoryId== 10" >已选中 {{ selectedNum }} 项</span></div>
            <el-pagination
              class="bottom_pagination"
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="listPageNo + 1"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="listPageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableListTotal"
              :pager-count="5"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>

    <!-- 文件审批记录-没有回复 -->
    <approval-comment
      :approvalShow.sync="approvalShow"
      :approvalData="approvalData"
      @updatainfo="updatainfo"
      @approvalSuccess='approvalSuccess'
    ></approval-comment>

    <!--    文件备注-->
    <remark
      :remarkIsShow="remarkIsShow"
      :remarkList="remarkList"
      @saveRemark="saveRemark"
      title="备注"
      :docData="reMarkData"
      @colseModule="remarkClose"
    ></remark>


    <!-- 索引列表的弹框 -->
    <project-index-lists
      :projectIndexShow.sync="projectIndexShow"
      :projectIndexData="projectIndexData"
      @sendProjectHandle="sendProjectHandle"
    ></project-index-lists>
    <!-- 时间原因后期代码优化调整 -->
    <!-- <approvalpending :filejlval="filejlval" @updatainfo="updatapp" :itemState="itemState" /> -->
    <!--    新建日程-->
    <newcalendar :calend="calend" :beforeUrl="beforeUrl" :calendardata="calendardata" @calende="calende" />
    <!--    节点审批-->
    <Auditcomponent
      page='filepage'
      :Auditco="Auditco"
      @updatainfo="updatapp"
      @ogVisible="ogVisible"
      @filejl="filejl"
      @updatalist="updatainfo"
      :fileDate="fileDate"
      @caresinfo="caresinfo"
      :approvalRecordObj="approvalRecordObj"
    />
     <!-- 弹框-审批记录 -->
   <approval-record
       :approvalRecordShow.sync="approvalRecordShow"
        :approvalRecordObj = "approvalRecordObj">
    </approval-record>
    <version :versionIsShow="versionIsShow" :versionsData="versionsData" @versionIs="versionIs" />
  </div>
</template>
<script>
const Auditcomponent = r => require.ensure([], () => r(require('@/pages/front/Lotus/Audit_component.vue')))
const newcalendar = r => require.ensure([], () => r(require('@/pages/front/maindesk/calendar/newcalendar')))
const approvalComment = r => require.ensure([], () => r(require("@/components/select_box/approvalComment")))
const projectIndexLists = r => require.ensure([], () => r(require("@/pages/front/projectlist/projectDoc/projectIndexLists")))
// 审批记录
import approvalRecord from "@/components/select_box/approvalRecord";
// import approvalpending from "@/pages/front/maindesk/myapproval/myapproval";
///
import version from "@/pages/front/Lotus/version";
import remark from "@/components/file/remark";
import { setTimeout, setInterval, clearInterval } from "timers";
// import projectIndexLists from "@/pages/front/projectlist/projectDoc/projectIndexLists";
// 审批弹框
// import approvalComment from "@/components/select_box/approvalComment";
export default {
  components: {
    remark, // 备注
    projectIndexLists, // 索引弹框
    Auditcomponent,
    newcalendar,
    // approvalpending,
    approvalComment,
    version,
    approvalRecord
  },
  data() {
    return {
      approvalRecordShow: false,
      showTransfer: false,
      catalogueoffsetHeight:'',
      tableHeight: 600,//文件列表表格高度
      Approvers: "",
      Approversclose:true,
      versionIsShow: false,
      isden:true,
      approvalRecordObj: {},
      rowprojectId: "",
      nameinfo: "",
      Auditco: false,
      calend: false,
      calendardata: {
        u: [],
        c: [],
        p: {}
      },
      fileDate: {},
      filejlval: {
        v: "",
        s: false
      },
      fileStateProject: [  //文件状态
        { value: 0, label: '有索引的' },
        { value: 1, label: '已选择' },
        { value: 2, label: '有备注的' },
        { value: 3, label: '有审批记录的' },
        { value: 4, label: '有讨论的' },
        { value: 5, label: '无索引的' },
        { value: 6, label: '有设置提醒的' },
        { value:15, label:'有关联的'}  ,
        { value:16, label:'有标签的'}  ,
        { value: 7, label: '待审批' },
        { value: 10, label: '驳回未修改' },
        { value: 11, label: '驳回已修改' },
        { value: 14, label: '审批通过' },
        { value: 13, label: '修订审批中' },
        { value: 17, label: '已修订' },
        { value: 18, label: '已通过' },
        { value: 19, label: '已驳回' },
        { value: 12, label: '修订中' },
        { value: 9, label: '节点审批通过' },
        { value: 8, label: '审批中' },
        // { value: 17, label: '已归档' }
      ],
      dirStateProject:[//目录状态
        { value: 0, label: '无文件' },
        { value: 1, label: '有文件' },
        { value: 2, label: '有讨论的' },
        { value: 3, label: '已选择' }
      ],
      mufile:[
          // { value: 0, label: '无文件' },
          // { value: 1,label: '有文件' },
          { value: 3,label: '已选择' },
          { value: 4,label: '待审批' },
          { value: 5,label: '审批中' },
          { value: 6,label: '审批通过' },
          // { value: 7,label: '已驳回' },
          { value: 9,label: '节点审批通过' },
          { value: 12,label: '修订中' },
          { value: 13,label: '修订审批中' },
          { value: 10,label: '驳回未修改' },
          { value: 11,label: '驳回已修改' },
          { value: 8,label: '有标签的' },
          { value: 2,label: '有讨论的' },
          { value: 14,label: '有审批记录的' },
          { value: 15,label: '引用目录' },
          { value: 16,label: '非引用目录' }
      ],
      //////////
      isPC: false,
      orderFlag: "",
      citeCatalogDialogFnre: false,
      laberTruesitem: "",
      value: "",
      token: "", //请求接口默认必传数据
      userId: "", //请求接口默认必传数据
      pageNo: 0, //请求接口默认必传数据
      pageSize: 500, //请求接口默认必传数据
      listPageNo: 0,
      listPageSize: 100,
      projectMsg: "", //项目信息
      requestCode: {}, //所有请求的状态码
      reqApi: "", //动态请求地址
      docSource: 1, //底稿管理标实
      shrink_bac: false, //推拉状态 true为push
      zNodes: [],
      setting: {
        //左面底稿目录zTree默认配置
        check: {
          enable: false,
          chkStyle: "checkbox",
          chkDisabledInherit: true
        },
        data: {
          simpleData: {
            enable: true,
            pIdKey: "parentId",
            idKey: "id",
            rootPId: 0
          },
          key: {
            name: "docName",
            checked: "isCheck"
          }
        },
        view: {
          selectedMulti: false,
          showLine: false,
          dblClickExpand: false,
          // addDiyDom: this.addDirStatusDiyDom,
          fontCss: this.setSearchFontCss
        },
        edit: {
          enable: true,
          editNameSelectAll: true,
          showRemoveBtn: false,
          showRenameBtn: false,
          drag: {
            isCopy: false,
            isMove: false
          }
        },
        async: {
          enable: true,
          url: this.getAsyncUrl,
          contentType: "application/json",
          dataType: "json",
          autoParam: [],
          otherParam: this.getAsyncData,
          dataFilter: this.treeFilterFn
        },
        callback: {
          beforeClick: this.zTreeBeforeClickFn,
          beforeRemove: this.zTreeBeforeRemoveFn,
          onClick: this.zTreeOnClickFn,
          onAsyncSuccess: this.onAsyncSuccessFn,
          beforeRename: this.zTreeBeforeRenameFn,
          onRename: this.zTreeOnRenameFn,
          onCheck: this.zTreeOnCheckFn
        }
      },
      examineZnodes: [],
      examineSetting: {
        //全局查看zTree默认配置
        view: {
          addDiyDom: this.addDiyDom,
          showLine: false
        },
        check: {
          enable: false,
          chkStyle: "checkbox",
          chkDisabledInherit: this.chkDisabledInherit
        },
        data: {
          simpleData: {
            enable: true,
            pIdKey: "parentId",
            idKey: "id",
            rootPId: 0
          },
          key: {
            name: "docName"
          }
        },
        callback: {
          onCheck: this.examineTreeOnCheck,
          onClick: this.examineTreeOnClickFn
        }
      },
      chkDisabledInherit: true,
      oldProjId: "", //旧的项目地址
      newProjId: "", //新的项目地址
      targetTreeNode: "", //点击树目录的节点数据
      workCatalogueName: "", //工作底稿目录名字
      workCatalogueParentId: "", //工作底稿目录Id
      parentIdUpload: "",
      filenames:"",
      getcategoryId:"",
      isEditFlag: false,
      projectIdTitle: "",
      projectIdData: [],
      flieNameData: [],
      citeCatalogVisible: false, // 控制引用目录弹框
      examineVisible: false, // 控制全局查看弹框
      dirAuditStatusArray: [],
      dirDocStatusArray: [],
      docAuditStatusArray: [],
      gloableDocTypeArray: [],
      postilVisible: false, //控制文件批注弹框
      postilFileName: "", //批注的文件名字
      versionsData: [], //文件版本数据
      checkCaAuditState: [
        {
          dirAuditStatus: 0,
          name: "待审批"
        },
        {
          dirAuditStatus: 1,
          name: "已通过"
        },
        {
          dirAuditStatus: 2,
          name: "已驳回"
        },
        {
          dirAuditStatus: 3,
          name: "未审批"
        }
      ],
      checkAuditState: [
        {
          dirDocStatus: 1,
          name: "有文件"
        },
        {
          dirDocStatus: 2,
          name: "无文件"
        }
      ],
      checkFileAuditState: [
        {
          docAuditStatus: 0,
          name: "待审批"
        },
        {
          docAuditStatus: 1,
          name: "已通过"
        },
        {
          docAuditStatus: 2,
          name: "已驳回"
        },
        {
          docAuditStatus: 3,
          name: "未审批"
        }
      ],
      checkFileType: [
        {
          gloableDocType: 1,
          name: "PDF"
        },
        {
          gloableDocType: 2,
          name: "Word"
        },
        {
          gloableDocType: 3,
          name: "其他"
        }
      ],
      fileState: [
        // { value: 0, label: '有索引的' },
        // { value: 5, label: '无索引的' },
        {
          value: 2,
          label: "有备注的"
        },
        {
          value: 4,
          label: "有讨论的"
        },
        {
          value: 16,
          label: "有标签的"
        },
        {
          value: 7,
          label: "待审批"
        },
        {
          value: 8,
          label: "审批中"
        },
        {
          value: 14,
          label: "审批通过"
        },
        {
          value: 9,
          label: "节点审批通过"
        },
        {
          value: 10,
          label: "驳回未修改"
        },
        {
          value: 11,
          label: "驳回已修改"
        },
        {
          value: 12,
          label: "修订中"
        },
        {
          value: 13,
          label: "修订审批中"
        },
        {
          value: 1,
          label: "已选择"
        },
        {
          value: 15,
          label: "有关联的"
        },
        {
          value: 3,
          label: "有审批记录的"
        },
        {
          value: 6,
          label: "有设置提醒的"
        }
      ],
      fileTypes: [
        {
          value: 0,
          label: "doc/docx"
        },
        {
          value: 1,
          label: "pdf"
        },
        {
          value: 2,
          label: "xls/xlsx"
        },
        {
          value: 3,
          label: "txt"
        },
        {
          value: 4,
          label: "png"
        },
        {
          value: 5,
          label: "jpg/jpeg"
        }
      ],
      dirState: [
        {
          value: 0,
          label: "无文件"
        },
        {
          value: 1,
          label: "有文件"
        },
        {
          value: 3,
          label: "已选择"
        },
        {
          value: 4,
          label: "待审批"
        },
        {
          value: 5,
          label: "审批中"
        },
        {
          value: 6,
          label: "审批通过"
        },
        {
          value: 7,
          label: "已驳回"
        },
        {
          value: 2,
          label: "有讨论的"
        }
      ],
      catItem: {},
      catalogData: [], //引用目录数据
      citeCatalog_select: "", //引用目录select值
      citeCatalog_radio: "1", //引用目录单选按钮值
      search_input: "", //全文检索input值
      postilData: [{}], //批注列表数据
      postilFlag: true, //批注句柄
      postilValue_input: "", //批注内容
      selectFileNameArray: [],
      rightMenuIsShow: false, //右键是否显示
      rightMenuNeedFunction: [], //右键需要的特殊数据
      versionVisible: false, // 版本弹框控制
      uploadDocAddIsShow: false,
      uploadParamData: {},
      uploadParamData_Version: {},
      addDoc: false,
      examineTreeNode: [],
      copyData: "",
      filenameschat:'',
      rightMenuItemData: {},
      propertyVisible: false,
      propertyData: {},
      navArray: [],
      getdataj: "",
      editName_input: "",
      arrData: [],
      projectName: "",
      parentIdData: "",
      dblclickData: "", //双击时当前这条数据
      clickType: 0,
      copyType: "",
      copyStoreData: {
        //粘贴数据
        ids: "", //文件ID
        oldProjId: "", //粘贴到的项目ID
        newProjId: "", //原项目ID
        copyData: "", //粘贴数据
        copyType: "" //已复制或者剪切
      },
      citeCatalog: true,
      renameFlag: true,
      renameData: "",
      renameSuffix: "", //文件重命名后缀
      manuscriptTreeDemo: "",
      examineTreeDemo: "",
      intervalId: "", //全文查看的下载定时器
      loading: "",
      newLoading: false,
      flag: true,
      allChecked: false, //全选按钮
      needDomElem: {
        // 页面需要dom元素
        btnGroupBox: "", // 按钮组DOM元素
        manuBox: "", // 底稿区域
        tableBox: "", // 表格区域
        listScrollTop: "", // 表格内容区域
        searchBox: "" // 检索区域
      },
      docLoction: "", //定位数据
      searchFlag: true, //搜索是否显示
      catalogue_search_input: "", //搜索内容
      dirNum: 0, //搜索后文件的个数
      dirData: [],
      searchIdx: 0,
      searchEmpty: false,
      //底稿索引
      relafagmanus: false, //底稿选择
      indexList: [], //当前文件已索引过的文件列表
      editIndexCurPaper: "", //编辑底稿索引时当前的底稿
      isPcManuPosition: false, // 是否pc底稿定位
      positionFlag: false,
      treeCreatName: "",
      viewType: true, // true目录视图 false列表视图
      btnGroupDrop: true, // 按钮组展开状态
      searchBtnDrop: true, // 检索组展开状态
      dirStateSel: [], // 目录状态检索条件
      fileStateSel: [], // 文件状态检索条件
      fileTypesSel: [], // 文件类型检索条件
      titleSearch: "", // 标题关键字
      contentSearch: "", // 内容关键字
      projectState: "", // 所选项目阶段
      projectStage: [], // 当前项目阶段
      tableListTotal: 0, // 表格数据条目数
      addDirInput: "", // 新建文件夹
      addDirState: false, // 新建文件夹状态
      addVersionData: {}, // 上传新版本选中文件数据
      remarkIsShow: false, // 备注弹框控制
      reMarkData: [], // 备注弹框数据
      isShowSetRemind: false, // 设置提醒显示控制
      startTime: "", // 查询开始时间
      endTime: "",
      itemState:[],
      chosefilelist: [], // 设置提醒选择文件列表
      remarkList: [], // 单个备注传参
      examTitle: "文件审批", // 文件审批弹框title
      docFlowChartData: {}, // 文件审批数据
      examType: 2, // 审批类型
      projectData: {}, // 当前项目信息
      catalogFlowChartData: {}, // 目录审批弹框数据
      projectIndexShow: false, // 索引列表弹框
      projectIndexData: {}, // 索引列表弹框数据
      reviseFileArray: [], // 修订审批数据 需要过滤
      Sourceof: "",
      approvalShow: false, //审批弹框展示
      approvalData: {}, //审批弹框传值
      approvalinfo: "",
      dwispc:true,
      beforeUrl: '',
      moreSearchBtnVisible: false,//是否显示搜索条件的更多按钮
      moreHandleBtnVisible: false,//是否显示搜工具栏的更多按钮
      toggleFlag:false
    };
  },
  computed: {
    selectedNum() {
      return this.$store.state.selectedNum;
    }
  },

  created() {
    var row = JSON.parse(this.$route.query.item);
    this.Sourceof = row.docSource == 1 || row.docSource == 0 ? true : false;
    this.isPC = this.$store.state.isPC;
    this.token = this.$store.state.loginObject.userToken;
    this.userId = this.$store.state.loginObject.userId;
    this.projectMsg = this.$store.state.projectMsg.projectMsg;
    this.requestCode = this.code.codeNum;
    this.reqApi = global.baseUrl;
    console.log(this.docLoction);
  },
  mounted() {
    // 节点审批弹窗数据
    var row = JSON.parse(this.$route.query.item);
    this.fileDate = {
      chemsg: row.username,
      currentgeneration:
        row.financingTypeName == "" ||
        row.financingTypeName == null ||
        row.categoryId == 1
          ? "无"
          : row.financingTypeName,
      Typesoffinancing:
        row.projectStageName == "" || row.projectStageName == null
          ? "无"
          : row.projectStageName,
      Typeapproval:
        row.categoryName == "" || row.categoryName == null
          ? "无"
          : row.categoryName,
      data: {
        row: row
      }
    };
    this.getcategoryId = this.fileDate.data.row.categoryId
    // console.log(row);
    this.Approver(); // 当前人是否可以审批
    if (this.$route.query.path == "/myapproval") {
      this.nameinfo = "我的审批";
    } else if (this.$route.query.path == "/backlogmatter") {
      this.nameinfo = "待办事项";
    } else if (this.$route.query.path == "/messagecenter") {
      this.nameinfo = "消息中心";
    }else if (this.$route.query.path == "/maindeskindex") {
      this.nameinfo = "主工作台";
    }
    // 项目文档  1  底稿 2
    this.approvalinfo = row.id;
    // console.log(this.approvalinfo)
    this.Sourceof = row.docSource == 1 || row.docSource == 0 ? true : false;
    this.projectName = this.fileDate.data.row.projectName
    // console.log(this.fileDate.data.row);
    this.rowprojectId = this.fileDate.data.row.projectId;
     console.log(row.docSource);
    this.getProjectStage();
    console.log(this.Sourceof);
    this.dwispc = this.$route.query.dwispc ? JSON.parse(this.$route.query.dwispc) : this.$route.query.dwispc
    if (this.$route.query.locationData && !this.dwispc) {
      this.docLoction = JSON.parse(this.$route.query.locationData);
      this.listPageNo = 0;
      this.dwispc = false
    } else if (this.$route.query.isPcPosition && !this.dwispc) {
      this.docLoction = JSON.parse(this.$route.query.data);
      this.listPageNo = this.docLoction.nowPage;
      this.dwispc = false

    }
    // window.addEventListener("resize", this.getPageHeight);
    window.onResize = () => {
      return (()=>{
        this.isShowMoreSearchBtn()
      })()
    }
    this.getTreeDataFn();
    // 获取DOM元素存储，优化性能
    this.needDomElem.btnGroupBox = document.getElementById("btn_box");
    this.needDomElem.manuBox = document.getElementById("manuscriptmanage");
    this.needDomElem.tableBox = document.getElementById("indexpage_list");
    this.listScrollTop = document.body.querySelector(".el-table__body-wrapper");
    this.getPageHeight();

    setTimeout(() => {
      this.isShowMoreSearchBtn();
    }, 1000);
    // this.$nextTick(() => {
      // console.log(this.beforeUrl)
    // })
    this.$Mit.watch({
      status:(res)=>{
          this.$Intel.message(this.getnodeinfo().file.map(item => {
            return {
              id: item.id,
              name: item.docName,
              size: item.docSize,
              type: item.type
            }
        }))
      }
    })
    this.filenames  = (this.getcategoryId == 2 || this.getcategoryId == 10)?"文件":"目录"
    this.filenameschat  = (this.getcategoryId == 2 || this.getcategoryId == 10)?"文件/文件夹":"目录"
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.beforeUrl = from.path
      if (to.query.isPcPosition == undefined) {
        return;
      }
      vm.isPcManuPosition = true;
      vm.$store.commit("projectId", to.query.projectId);
    });
  },
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = false;
    window.removeEventListener("resize", this.getPageHeight);
    next();
  },
  watch: {
    "$route.fullPath"() {
      if (!this.$route.query.isPcPosition) {
        return;
      }
      console.log("testttt");
      this.navArray.length = 0;
      this.isPcManuPosition = true;
      this.docLoction = JSON.parse(this.$route.query.data);
      this.listPageNo = this.docLoction.nowPage;
      this.projectIdTitle = this.$route.query.projectId;
      this.positionFlag = false;
      // 当前页面定位 判断是否为当前项目定位 如果不是进行项目切换
      if (this.newProjId != this.$route.query.projectId) {
        [this.newProjId, this.oldProjId] = [this.oldProjId, this.newProjId];
        this.newProjId = this.$route.query.projectId;
      }
      this.$store.commit("projectId", this.$route.query.projectId);
      this.getTreeDataFn();
    },
    examineVisible(newVal, oldVal) {
      if (oldVal) {
        //关闭
        this.examineTreeNode = [];
      }
    },
    "$store.state.asidCollapse"() {
      setTimeout(() => {
        this.getPageHeight();
      }, 350);
    }
  },

  methods: {
    isShowMoreSearchBtn(){
        let boxH = $('.search_box_left').height() + 17;
        let objH = $('.search-item-box').height();
        this.moreSearchBtnVisible = boxH < objH;
        let toolbarH = $('.btn_box').height() + 3;
        let toolbarAutoH = $('.toolbar_file-box').height();
        console.log('比较',toolbarH,toolbarAutoH)
        // this.moreHandleBtnVisible = this.isPC ? toolbarH < toolbarAutoH : toolbarH <= toolbarAutoH
        this.moreHandleBtnVisible = toolbarH < toolbarAutoH
    },
    caresinfo(){
      this.itemState = [10,this.fileDate.data.row,9]
    },
    getnodeinfo() {
      return this.$select.getSelectedData(
        this.Sourceof ? 3 :(this.getcategoryId == 3 ||this.getcategoryId == 11)?5:4,
        this.approvalinfo
      );
    },
    updatainfo(state) {
      if(state.isden == 'isden'){
        if(!state.d){
          if(this.beforeUrl == '/Searchpage'){
            this.$router.push(this.$route.query.path)
          }else{
            this.$router.go(-1)
          }
        }
      }
      this.getTreeListFn(this.getdataj);
      this.Approver();
    },
    approvalSuccess () {
      this.deselected()
    },
    updatapp(){
      if(this.beforeUrl == '/Searchpage'){
        this.$router.push(this.$route.query.path)
      }else{
        this.$router.go(-1)
      }
    },
    // 已选文件列表跳转
    toSelectList() {
      sessionStorage.setItem("pageFrom", "approve");
      var fileinfo = this.getnodeinfo()
      if(fileinfo.file.concat(fileinfo.manaullyFile) == ""){
        this.$message.error('当前无选中文件')
        return
      }
      this.$router.push({
        path: "/Searchpage",
        query: {
          searchData: JSON.stringify({
            docName: '', // 标题关键字
            docContent: '', // 内容关键字
            auditProjectIds: '', // 项目阶段
            dirStatus: [], //目录状态
            fileStatus:[1], //文件状态
            suffixList: [], // 文件类型
            beginTime: '',
            endTime: ''
          }),
          item: this.$route.query.item,
          path: this.$route.query.path,
          paths: this.$route.query.path,
          isSelectList: true,
          pageFrom: "approve"
        }
      });
    },
    // 当前人是否可以审批
    Approver() {
      var data = {
        token: this.token,
        userId: this.userId,
        projectId: this.fileDate.data.row.projectId,
        data: {
          approvalId: this.fileDate.data.row.id
        }
      };
      this.$post("/info/audit/judeApprovaerByUserId ", data)
        .then(res => {
            console.log(res.data)
          this.Approvers = res.data;

        })
        .catch(error => {
          console.log(error);
        });
    },
    // 取消选择
    deselected(type) {
      this.$refs.multipleTable.clearSelection();
      this.$select.clearSelection(this.Sourceof ? 3 : (this.getcategoryId == 3 ||this.getcategoryId == 11)?5:4, this.approvalinfo);
      type && this.$message.success("取消选择成功");
    },
    // 点击全选复选框
    handleSelectAll(selection) {
      selection.length
        ? this.$select.handleFileSelect(
            this.Sourceof ? 3 : (this.getcategoryId == 3 ||this.getcategoryId == 11)?5:4,
            this.rowprojectId,
            this.approvalinfo,
            selection
          )
        : this.$select.handleCancel(
            this.Sourceof ? 3 : (this.getcategoryId == 3 ||this.getcategoryId == 11)?5:4,
            this.rowprojectId,
            this.approvalinfo,
            this.flieNameData
          );
    },
    // 点击单条复选框
    handleSelectDoc(selection, row) {
      this.$select.fileSelect(
        this.Sourceof ? 3 : (this.getcategoryId == 3 ||this.getcategoryId == 11)?5:4,
        this.rowprojectId,
        this.approvalinfo,
        selection,
        row
      )
    },
    // 目录树
    displaySelected() {
      this.$select
        .handleDisplaySelection(
          this.Sourceof ? 3 : (this.getcategoryId == 3 ||this.getcategoryId == 11)?5:4,
          this.rowprojectId,
          this.approvalinfo,
          this.flieNameData
        )
        .then(res => {
          console.log("display-res", res);
          if (!res || !res.length) return;
          res.forEach(v => {
            let idx = this.flieNameData.findIndex(m => m.id === v);
            this.$nextTick(() => {
              this.$refs.multipleTable.toggleRowSelection(
                this.flieNameData[idx],
                true
              );
            });
          });
        });
    },
    // 审批弹框
    approvalList() {
      let allData = this.getnodeinfo()
      console.log('allData',allData.file.length, allData.dir.length)
      if(this.getcategoryId == 2 || this.getcategoryId == 10){
        var fileList = allData.file;
        if (!fileList.length) {
          this.$message.warning(`请选择${this.filenames}`);
          return;
        }
        console.log(111, )
        this.handleApproval(fileList)
      }else{
        let dir = allData.dir;
        if (!dir.length) {
          this.$message.warning(`请选择${this.filenames}`);
          return;
        }
        const loading = this.$loading({
          lock: true,
          text: "拼命加载中",
          spinner: "el-icon-loading"
        });
        let p = {
          projectId: this.rowprojectId,
          data: {
            parentIdList: dir.map(v=>v.id),
            approvalId: this.approvalinfo
          }
        }
        this.$post('/info/audit/queryPendingDirForDir', p).then(res=>{
          loading.close()
          if(res.code!==0) {
            this.$message.error(res.msg)
            return
          }
          let fileList = res.data.content || []
          fileList = [...dir, ...fileList]
          this.handleApproval(fileList)
        }).catch(()=>{
           loading.close()
        })
      }

    },
    handleApproval(fileList){
            // 单个文件和多个文件区分弹框
      if(this.Approvers){
         if (fileList.length == 1 && !fileList[0].isCheck) {
          if (fileList[0].auditStatus == 0 || fileList[0].auditStatus == 1 || fileList[0].auditStatus == 6) {
            this.$message.error(`该${this.filenames}` + fileList[0].auditStatusText  + ',无法再进行审批')
          }
          if(fileList[0].auditStatus == 2 && !fileList[0].showInitStatus){
            this.$message.error(`该${this.filenames}已被其他节点驳回,无法再进行审批`)
          }
          if(this.getcategoryIds != 2 && this.getcategoryIds != 10){
            if(fileList[0].auditStatus == 4){
              this.$message.error(`请先选择可审批的目录`)
            }
          }
          return
        }
      }
      if (fileList.length > 1) {
        if(this.Approvers){
           this.$confirm(this.getcategoryId == 2 || this.getcategoryId == 10?`已在其他审批中进行/审批通过的文件不能再进行审批，进行审批时将自动过滤。源文件及索引文件进行审批时，所有审批意见及审批状态将进行同步?`:'已在其他审批中进行/审批通过的目录和本次未提审的待审批目录不能进行审批，进行审批时将自动过滤', '审批确认', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              dangerouslyUseHTMLString: true,
              distinguishCancelAndClose: true
            }).then(() => {
            let approvalOk = []
            //  CHECKING(0, "审批中"), PASS(1, "审批通过"), FAIL(2, "驳回未修改"), NOT_CHECK(3, "节点审批通过"),
            // APPROVALING(4,"待审批"),FILE_UPDATE(5,"驳回已修改"),REVISE_APPROVAL(6,"修订审批中"),
            // REVISEING(7,"修订中"),ARCHIVE(8,"已归档"); isCheck为true  && (v.auditStatus !== 0 && v.auditStatus !== 1 && v.auditStatus !== 6)
            fileList.forEach(v => {
                if (v.isCheck) {
                  approvalOk.push(v)
                }
              })
              console.log(approvalOk, 369)
              if (approvalOk.length) {
                this.goToApproval(approvalOk)
                return
              }
              this.$message.error(`请先选择可审批的${this.filenames}`)
            }).catch(action => {
            // console.log(action);
          });
          return
        }else{
            var arr = [];
            fileList.forEach(item => {
                arr.push({
                  docId: item.docId || item.id, // 目录审批是id
                  parentId: item.parentId
                });
            });
              let commentData = {
              docSource: this.Sourceof ? 1 : 2, // 来源
              attach: JSON.stringify(arr), //审核的文件id
              projectId: this.rowprojectId,
              isDir:(this.getcategoryId == 2 || this.getcategoryId == 10)?false:true,
              sourceName:`我的审批-${this.getcategoryId == 2?'文件':this.getcategoryId == 10?'文件修订':this.getcategoryId == 3?'目录':'目录修订'}审批-${this.getcategoryId == 2?'文件':this.getcategoryId == 10?'文件修订':this.getcategoryId == 3?'目录':'目录修订'}审批意见页`,
            };
            this.$store.commit("approvalCommentsFn", commentData);
            return
        }
      }


      this.goToApproval(fileList)


    },

    goToApproval(fileList) {
      // 多个文件
      if (fileList.length == 1) {
        var docName = fileList[0].docName;
      }
      let files = [];

      fileList.forEach(v => {
        let obj = {};
        obj.docId = (this.getcategoryId == 2 || this.getcategoryId == 10)?v.docId:v.id;
        obj.docName = v.docName;
        obj.parentId = v.parentId;
        obj.docVersionNumber = v.docVersionNumber;
        files.push(obj);
      });
      let docData = JSON.parse(this.$route.query.item);
      console.log(fileList.length)
      this.approvalData = {
        title: fileList.length == 1 ? `${this.filenames}审批` : `${this.filenames}审批意见`,
        fileList: files,
        selectData: fileList.map(v => {
          return  (this.getcategoryId == 2 || this.getcategoryId == 10)?v.docId:v.id;
        }),
        docName: docName || fileList[0].docName,
        findComment: fileList.length == 1 ? false : true,
        taskDefKey: docData.taskDefKey, //当前审核节点所处标识
        taskId: docData.taskId,
        getcategoryId:this.getcategoryId,
        approvalId: this.fileDate.data.row.id, // 审核id
        selectType: this.Sourceof ? 3 : 4,
        Approvers:this.Approvers,
        Approversclose:this.Approversclose

      };

      this.getCommentData()
    },
    // 提前进行审批的查询
    getCommentData () {
      let  obj = {
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId,
        projectId: this.rowprojectId,
        paperFlag: !this.Sourceof,
        sourceName:`我的审批-${this.getcategoryId == 2?'文件':this.getcategoryId == 10?'文件修订':this.getcategoryId == 3?'目录':'目录修订'}审批-审批`,
        // sourceName:`我的审批-${this.getcategoryId == 2 || this.getcategoryId == 10 ? '文件' : '目录'}审批-审批`,
        projectName:this.projectName, //项目名称，记录日志用
        data:{
          docIdList: this.approvalData.selectData,//文件id的集合
          approvalId: this.approvalData.approvalId
        }
      }
      this.$post((this.getcategoryId == 2 || this.getcategoryId == 10)?'/info/audit/findApprovalRecordByFileids':'/info/audit/findApprovalRecordByDirids', obj).then(res => {
        if (!res) {
            this.$message.error(res.msg)
            return
        }
        if (res.code !== 0) {
          this.$message.error(res.msg)
          return
        }
        if (res.data) {
          this.findComment = res.data.findComment
          if (res.data.findComment) {
            res.data.list.forEach(m => {
              m.state == 0 ? m.stateName = '待审批' : ( m.state == 1 ? m.stateName = '通过' : m.stateName = '驳回')
            })
          }
          this.approvalData.findComment = res.data.findComment
         this.approvalData.tableData = res.data
         this.approvalShow = true;
        }
      })
    },
    // 索引列表关闭回调
    sendProjectHandle() {
      this.projectIndexShow = false;
    },
    // 文件审批意见按钮
    approvalHandle() {
      var file = this.getnodeinfo();
      if(this.getcategoryId == 2 || this.getcategoryId == 10){
          if (file.file == "") {
            this.$message.error("当前无选中文件");
            return;
          }
          var arr = [];
          file.file.forEach(item => {
            if (item.rfsId != null) {
              arr.push({
                docId: item.docId,
                parentId: item.parentId
              });
            }
          });
          this.handleApprovalComments(arr)
      }else{
        if (!file.dir || !file.dir.length) {
            this.$message.error("当前无选中目录");
            return;
          }

        const loading = this.$loading({
          lock: true,
          text: "拼命加载中",
          spinner: "el-icon-loading"
        });
        let p = {
          projectId: this.rowprojectId,
          data: {
            parentIdList: file.dir.map(v=>v.id),
            approvalId: this.approvalinfo
          }
        }
        this.$post('/info/audit/queryPendingDirForDir', p).then(res=>{
          loading.close()
          if(res.code!==0) {
            this.$message.error(res.msg)
            return
          }
          let dirList = res.data.content || []
          dirList = [...file.dir, ...dirList]
          let arr = dirList.map(item=> {
            return {
              docId: item.id,
              parentId: item.parentId
            }
          })
          this.handleApprovalComments(arr)
        }).catch(()=>{
           loading.close()
        })
      }
    },

        // 文件审批意见按钮
    handleApprovalComments(arr) {
       let commentData = {
            docSource: this.Sourceof ? 1 : 2, // 来源
            attach: JSON.stringify(arr), //审核的文件id
            projectId: this.rowprojectId,
            isDir:(this.getcategoryId == 2 || this.getcategoryId == 10)?false:true,
            // sourceName:`我的审批-${this.getcategoryId == 2 || this.getcategoryId == 10? '文件' : '目录'}审批-${this.getcategoryId == 2 || this.getcategoryId == 10? '文件' : '目录'}审批意见页`
            sourceName:`我的审批-${this.getcategoryId == 2?'文件':this.getcategoryId == 10?'文件修订':this.getcategoryId == 3?'目录':'目录修订'}审批-${this.getcategoryId == 2?'文件':this.getcategoryId == 10?'文件修订':this.getcategoryId == 3?'目录':'目录修订'}审批意见页`,
      };
      this.$store.commit("approvalCommentsFn", commentData);

    },



    // 保存备注
    saveRemark(content) {
      this.$post("/doc/project/addNotes", {
        sourceName:`我的审批-${this.getcategoryId == 2?'文件':this.getcategoryId == 10?'文件修订':this.getcategoryId == 3?'目录':'目录修订'}审批-备注`,
        projectName:this.projectName, //项目名称，记录日志用
        paperFlag: !this.Sourceof,
        data: {
          sourceFlag: this.Sourceof ? 0 : 1, //项目文档固定为0，底稿为1
          content,
          needFileList: this.reMarkData.map(v => {
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
          this.$message.success(res.msg);
          this.deselected()
        })
        .catch(function(error) {});
    },
    // 备注按钮
    remarkClick() {
      var file = this.getnodeinfo();
      if (file.file == "") {
        this.$message.error("请选择文件");
        return;
      }
      if (file.file.length == 1) {
        this.$post("/doc/project/queryNoteByFileId", {
            paperFlag: !this.Sourceof,
            // sourceName:`我的审批-${this.getcategoryId == 2 || this.getcategoryId == 10? '文件' : '目录'}审批-备注`,
            sourceName:`我的审批-${this.getcategoryId == 2?'文件':this.getcategoryId == 10?'文件修订':this.getcategoryId == 3?'目录':'目录修订'}审批-备注`,
            projectName:this.projectName, //项目名称，记录日志用
            data: {
                docId: file.file[0].docId
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
      var arr = [];
      file.file.forEach(item => {
        if (item.rfsId != null) {
          arr.push(item);
        }
      });
      this.reMarkData = arr;
      this.remarkIsShow = true;
    },
    // 备注弹框关闭
    remarkClose() {
      this.remarkIsShow = false;
      this.getTreeListFn(null, "");
      this.reMarkData = [];
    },
    // 检索重置
    resetFn() {
      this.titleSearch = "";
      this.contentSearch = "";
      this.projectState = "";
      this.startTime = "";
      this.endTime = "";
      this.$refs.dirState.clearSel();
      if(this.getcategoryId == 2 || this.getcategoryId == 10){
        this.$refs.fileState.clearSel();
        this.$refs.fileTypes.clearSel();
      }
    },
    // 计算页面高度
    getPageHeight() {
      window.setTimeout(() => {
          this.tableHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)
          - $('.search_box').innerHeight() - 100 - 60
      },300)

      this.$nextTick(() => {
        $("#bottom_catalogue")
        $('#bottom_catalogue').height = $('.bottom_indexpage').outerHeight() + 'px'
        this.$refs.bottom_box.style.width = $('.bottom_indexpage').outerWidth() + 'px'
        // let pageHeight =
        //   document.documentElement.clientHeight || document.body.clientHeight;
        // this.needDomElem.manuBox.style.height = `${pageHeight - 70}px`;
        // this.needDomElem.bottomBox.style.width = `${this.needDomElem.tableBox
        //   .clientWidth - 8}px`;
      });
      setTimeout(()=>{
        this.catalogueoffsetHeight = this.$refs.bottom_catalogue.offsetHeight
      },1000)
    },
    // 切换页码
    handleCurrentChange(val) {
      this.listPageNo = val - 1;
      this.getTreeListFn(null, "");
    },
    // 分页器切换页码
    handleSizeChange(val) {
      this.listPageSize = val;
      this.getTreeListFn(null, "");
    },
    // 讨论
    discussionFn() {
      this.$post("/info/projectChat/queryProjectChatNum", {
        token: this.token,
        userId: this.userId,
        projectId: this.fileDate.data.row.projectId,
        data: {}
      }).then(res => {
        if (res.code != 0) {
          this.$message.error(res.msg);
          return
        }
        if(res.data.filter(v=>v.projectId == this.rowprojectId) == ""){
           this.$message.warning("需为该项目成员/对应项目可访问权限方可进行讨论");
           return
        }
        let selected, treeData
        if(this.getcategoryId == 2 || this.getcategoryId == 10){
          selected = this.getnodeinfo().manaullyFile.concat(this.getnodeinfo().dir);
        }else{
          selected = this.getnodeinfo().dir
          treeData = this.manuscriptTreeDemo.getNodes()
        }
         if (!selected.length || selected.length > 1) {
            this.$message.warning(`请选择单个${this.filenameschat}进行讨论`);
            return;
          }
          let data = Object.assign({}, selected);
          // 修改项目聊天的项目id
          this.$store.commit("chatProjectFn", data[0].projectId || treeData[0].projectId);
          if(!this.Sourceof){
            data[0].paperId = data[0].id
          }

          this.$router.push({
            path: "/projecchat",
            query: {
              docData: JSON.stringify(data[0]),
              prePro : true,
            //   sourceName:`我的审批-${this.getcategoryId == 2 || this.getcategoryId == 10? '文件' : '目录'}审批`,//页面位置，记录日志用
            sourceName:`我的审批-${this.getcategoryId == 2?'文件':this.getcategoryId == 10?'文件修订':this.getcategoryId == 3?'目录':'目录修订'}审批`,
            }
          });
      }).catch(error => {
        console.log(error);
      });
    },
    // 左侧树点多选按钮触发
    zTreeOnCheckFn(event, treeId, item) {
      // 可能出现选择父目录，子目录也需要选中
      let zTreeChecked = this.manuscriptTreeDemo.getCheckedNodes();
      this.$refs.multipleTable.clearSelection();
      zTreeChecked.forEach(zTreeItem => {
        this.flieNameData.forEach(items => {
          if (zTreeItem.id == items.id) {
            this.$refs.multipleTable.toggleRowSelection(items);
            this.$select.handleFileSelect(
              this.Sourceof ? 3 : (this.getcategoryId == 3 ||this.getcategoryId == 11)?5:4,
              this.rowprojectId,
              this.approvalinfo,
              [items]
            );
          }
        });
      });
    },
    // 请求项目阶段
    getProjectStage() {
      this.$post("/info/project/getImplementStageList", {
        data: {
          projectId: this.rowprojectId
        }
      })
        .then(res => {
          if (res.code != this.requestCode.SUCCESS) {
            this.$message(res.msg);
            return;
          }
          this.projectStage = res.data;
        })
        .catch(err => {});
    },
    // 查询按钮
    search() {
      // console.log(this.dirStateSel)
      // console.log(this.fileStateSel)
      // return
      sessionStorage.setItem("pageFrom", "approve");
      this.$router.push({
        path: "/Searchpage",
        query: {
          searchData: JSON.stringify({
            docName: this.titleSearch, // 标题关键字
            docContent: this.contentSearch, // 内容关键字
            auditProjectIds: this.projectState, // 项目阶段
            dirStatus: this.dirStateSel, //目录状态
            fileStatus: this.fileStateSel, //文件状态
            suffixList: this.fileTypesSel, // 文件类型
            beginTime: this.startTime,
            endTime: this.endTime
          }),
          path: this.$route.path,
          item: this.$route.query.item,
          paths: this.$route.query.path,
          arrsinfo:JSON.stringify(this.getnodeinfo())
        }
      });
    },
    // 设置表格第一行是否显示选择框
    setHideCheckbox(visibilityVal) {
      // visibilityVal: string
      this.$nextTick(() => {
        $(
          ".el-table .el-table__body tbody .el-table__row:first td:first-child .cell"
        ).css("visibility", visibilityVal);
      });
    },
    // 目录状态选择
    dirStateChangeData(arr) {
      this.dirStateSel = arr.map(v => v.value);
    },
    // 文件状态选择
    fileStateChangeData(arr) {
      this.fileStateSel = arr.map(v => v.value);
    },
    // 文件类型选择
    fileTypesChangeData(arr) {
      this.fileTypesSel = arr.map(v => v.value);
    },
    // 按钮组展开收起
    btnBoxToggle(val) {
      this[val] = !this[val];
      this.getPageHeight();
    },

    labelList(val, arr = this.flieNameData) {
      // console.log(val, arr, 2222, this.rowprojectId, this.editIndexCurPaper, !val)
      if (!val.length) return
      var url = this.Sourceof?"/doc/project/docStatusAll":"/doc/paper/docStatusAll"
      this.$post(url, {
        data: {
          idSet: Array.isArray(val) ? val.map(v => v.id) : [val.id],
          projectId: this.rowprojectId
        }
      })
        .then(response => {
          if (response.code != 0) {
            this.$message.error(response.msg);
            return;
          }
          Object.keys(response.data).forEach(id => {
            arr.forEach(item => {
              if (id == item.id) {
                let resItem = response.data[id];
                this.$set(item, "indexPaper", resItem.linkList);
                // 0:待审核/1:审批通过/2:驳回未修改/3:节点审批通过/4:待审批/5:驳回已修改/6:修订审批中/7:修订中/8:已归档
                // this.$set(item, "auditStatus", resItem.auditStatus);
                this.$set(item, "notes", resItem.notes); // 是否有备注信息
                this.$set(item, "reminder", resItem.reminder); // 是否有文件提醒
                this.$set(item, "lockState", resItem.lockState); // 是否有锁
                this.$set(item, "record", resItem.record); // 是否有审批意见
                // this.$set(item, "isShowIcon", true); // 防止图标闪烁
                this.$set(item, "linkList", resItem.linkList); // 防止图标闪烁
                this.$set(item, "icon", resItem.paperLabelList);
              }
            });
          });
          // if (JSON.stringify(response.data) != "{}") {
          //   let resItem = response.data[item.id];
          //   this.$set(item, "indexPaper", resItem.linkList);
          //   // 0:待审核/1:审批通过/2:驳回未修改/3:节点审批通过/4:待审批/5:驳回已修改/6:修订审批中/7:修订中/8:已归档
          //   // this.$set(item, "auditStatus", resItem.auditStatus);
          //   this.$set(item, "notes", resItem.notes); // 是否有备注信息
          //   this.$set(item, "reminder", resItem.reminder); // 是否有文件提醒
          //   this.$set(item, "lockState", resItem.lockState); // 是否有锁
          //   this.$set(item, "record", resItem.record); // 是否有审批意见
          //   // this.$set(item, "isShowIcon", true); // 防止图标闪烁
          //   this.$set(item, "linkList", resItem.linkList); // 防止图标闪烁
          //   this.$set(item, "icon", resItem.paperLabelList);
          // }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 排序条件为null时保留上次排序状态
    sort_change(column) {
      console.log(column.order);
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
      } else {
        this.orderFlag = "";
      }
      if(!this.dwispc){
           this.getTreeListFn(JSON.parse(this.$route.query.locationData).parent[0], this.orderFlag);
           return
        }
      this.getTreeListFn(false, this.orderFlag);
    },

    citeCatalogDialogFns() {
      this.citeCatalogDialogFnre = true;
    },
    citeCatalogs() {
      this.citeCatalogDialogFnre = false;
    },
    searchDirFn() {
      //搜索目录函数
      if (this.catalogue_search_input == "") return; //输入为空时,点搜索就返出去
      this.searchIdx = 1;
      this.$post(
        this.Sourceof ? "/doc/project/searchDir" : "/doc/paper/searchDir",
        {
          data: {
            docName: this.catalogue_search_input,
            projectId: this.fileDate.data.row.projectId
          }
        }
      )
        .then(res => {
          if (this.requestCode.SUCCESS == res.code) {
            this.dirNum = res.data.num;
            this.dirData = res.data.content;
            this.searchEmpty = false;
            $.fn.zTree.init($("#manuscriptTree"), this.setting, this.zNodes);
            var ls = this.manuscriptTreeDemo.reAsyncChildNodesPromise(
              this.zNodes[0],
              "refresh"
            ); //每次搜索都需要去异步刷新出
            ls.then(() => {
              var nodes = this.manuscriptTreeDemo.getNodes(); //获取整个树数据
              this.searchDataFn(nodes); //调用处理树的函数
            });
          } else {
            $.fn.zTree.init($("#manuscriptTree"), this.setting, []);
            this.searchEmpty = true;
            this.flieNameData = [];
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    searchChange() {
      //搜索输入框清空时
      if (this.catalogue_search_input == "") {
        this.searchEmpty = false;
        $.fn.zTree.init($("#manuscriptTree"), this.setting, this.zNodes);
        var ls = this.manuscriptTreeDemo.reAsyncChildNodesPromise(
          this.zNodes[0],
          "refresh"
        ); //每次搜索都需要去异步刷新出
        ls.then(() => {
          var nodes = this.manuscriptTreeDemo.getNodes(); //获取整个树数据
          this.searchClearDataFn(nodes); //调用处理树的函数
          this.dirNum = 0;
          this.searchIdx = 0;
        });
      }
    },
    searchDataFn(node) {
      //搜索后数据的处理函数 node 为整个树形数据
      for (let i in this.dirData) {
        //循环搜索结果数据
        for (let j in node) {
          //循环树形数据
          if (this.dirData[i].id == node[j].id) {
            //两者匹配唯一的id
            if (this.dirData[i].disabled) {
              //是否有高亮字段的判断
              console.log(node[j])
              // node[j].searchBack = true;
              this.$set(node[j], "searchBack", true);
              // return;
            }
            var ls = this.manuscriptTreeDemo.reAsyncChildNodesPromise(
              node[j],
              "refresh"
            );
            ls.then(() => {
              this.searchDataFn(node[j].children); //每次调用自己打开下一个函数
              console.log(node[j].id  == this.dirData[this.dirData.length - 1].id)
              // console.log(this.dirData[this.dirData.length - 1])
              if (node[j].id == this.dirData[this.dirData.length - 1].id) {
                //判断是否是数组最后一个数 减少请求的
                var nodes = this.manuscriptTreeDemo.getNodesByParam(
                  "searchBack",
                  true,
                  null
                ); //获取所有高亮数据
                // console.log(nodes);
                this.manuscriptTreeDemo.selectNode(nodes[0]); //设置数据第一个为高亮
                this.getTreeListFn(nodes[0]); //同步请求右边的数据列表
                if (this.navArray.length == 0) {
                  //用于处理nav导航数据
                  this.navArray.push(nodes[0]);
                } else {
                  this.navArray = [];
                  this.navFilterFn(nodes[0]);
                }
              }
            });
          }
        }
      }
      console.log(node);
    },
    searchClearDataFn(node) {
      for (let i in this.dirData) {
        //循环搜索结果数据
        for (let j in node) {
          //循环树形数据
          if (this.dirData[i].id == node[j].id) {
            //两者匹配唯一的id
            if (this.dirData[i].disabled) {
              //是否有高亮字段的判断
              node[j].searchBack = false;
              // return;
            }
            var ls = this.manuscriptTreeDemo.reAsyncChildNodesPromise(
              node[j],
              "refresh"
            );
            ls.then(() => {
              this.searchClearDataFn(node[j].children); //每次调用自己打开下一个函数
              if (node[j].id == this.dirData[this.dirData.length - 1].id) {
                //判断是否是数组最后一个数 减少请求的
                this.dirData = [];
              }
            });
          }
        }
      }
    },
    setSearchFontCss(treeId, treeNode) {
      //z-tree 的api方法 处理高亮的
      return treeNode.searchBack
        ? {
            background: "#e2ecff"
          }
        : {};
    },
    searchUpNode() {
      //上一个高亮数据
      var nodes = this.manuscriptTreeDemo.getNodesByParam(
        "searchBack",
        true,
        null
      );
      if (nodes.length == 0) return;
      this.searchIdx--;
      if (this.searchIdx < 1) {
        this.searchIdx = 1;
        return;
      }
      this.manuscriptTreeDemo.selectNode(nodes[this.searchIdx - 1]); //选中当前的树
      // this.manuscriptTreeDemo.reAsyncChildNodes(nodes[this.searchIdx - 1], "refresh");  //异步加载当前数据
      this.getTreeListFn(nodes[this.searchIdx - 1]); //同步请求右边的数据列表
      if (this.navArray.length == 0) {
        //用于处理nav导航数据
        this.navArray.push(nodes[this.searchIdx - 1]);
      } else {
        this.navArray = [];
        this.navFilterFn(nodes[this.searchIdx - 1]);
      }
    },
    searchDownNode() {
      //下一个高亮数据
      var nodes = this.manuscriptTreeDemo.getNodesByParam(
        "searchBack",
        true,
        null
      );
      if (nodes.length == 0) return;
      this.searchIdx++;
      if (this.searchIdx > nodes.length) {
        this.searchIdx = nodes.length;
        return;
      }
      this.manuscriptTreeDemo.selectNode(nodes[this.searchIdx - 1]);
      this.getTreeListFn(nodes[this.searchIdx - 1]);
      if (this.navArray.length == 0) {
        this.navArray.push(nodes[this.searchIdx - 1]);
      } else {
        this.navArray = [];
        this.navFilterFn(nodes[this.searchIdx - 1]);
      }
    },
    //第一次加载目录树并且调右侧列表
    getTreeDataFn(itemId = null) {
      var url;
      if (this.Sourceof) {
        var data = {
          pageNo: this.listPageNo,
          pageSize: this.listPageSize,
          data: {
            isSearch: false,
            parentId: this.Sourceof ?-1:0,
            docType: 1,
            approvalId:this.approvalinfo,
            projectId: this.fileDate.data.row.projectId
          }
        };
        url = "/doc/project/fileApprovalQuery";
      } else {
        var data = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          data: {
            docType: 1,
            parentId: "0",
            approvalId:this.approvalinfo,
            projectId: this.fileDate.data.row.projectId
          }
        };
        url = "/doc/paper/fileApprovalQuery";
      }
      this.$post(url, data)
        .then(res => {
          if (this.requestCode.SUCCESS == res.code) {
            // if(this.Sourceof){
            //   res.data.content = [{
            //     id:0,
            //     docType:1,
            //     docName:"全部",
            //     highlightName:"全部"
            //   }]
            // }

            this.zNodes = res.data.content;
            if((this.getcategoryId == 3 || this.getcategoryId == 11)){
               this.zNodes.forEach(item => {
                if (item.docType === 1) {
                  item.isParent = true;
                  item.iconSkin = "diy02";
                  item.checked = false;
                }
              });
            }else{
              if(!this.Sourceof){
                  this.zNodes.forEach(item => {
                  if (item.fileSum <= 0) {
                    item.isParent = true;
                    item.iconSkin = "diy02";
                    item.checked = false;
                  } else {
                    if (item.docType === 1) {
                      item.isParent = true;
                      item.iconSkin = "diy01";
                      item.checked = false;
                    }
                  }
                })
                }else{
                  this.zNodes.forEach(item => {
                  if (item.fileSum == 3) {
                    item.isParent = true;
                    item.iconSkin = "diy02";
                    item.checked = false;
                  } else {
                    item.isParent = true;
                    item.iconSkin = "diy01";
                    item.checked = false;
                  }
                });
              }
            }
            this.getTreeListFn(this.zNodes[0]);
            this.getdataj = this.zNodes[0];
            if (res.data.content.length != 0) {
              if (this.navArray.length != 0) {
                this.navArray[0] = this.zNodes[0];
                this.navArray.splice(1);
              } else {
                this.navArray.push(this.zNodes[0]);
                this.workCatalogueName = this.zNodes[0].docName;
                this.workCatalogueParentId = this.zNodes[0].id;
              }
            } else {
              this.navArray = [];
            }
            $.fn.zTree.init($("#manuscriptTree"), this.setting, this.zNodes);
            this.manuscriptTreeDemo = $.fn.zTree.getZTreeObj("manuscriptTree"); //将目录树对象赋值给全局使用
            var nodes = this.manuscriptTreeDemo.getNodes();
            this.manuscriptTreeDemo.selectNode(nodes[0]);
            if (res.data.content.length === 0) return;
            this.manuscriptTreeDemo
              .reAsyncChildNodesPromise(nodes[0], "refresh")
              .then(() => {
                if (!!nodes[0]) {
                  // 解决根目录下文件无法定位的问题
                  console.log(nodes)
                  this.locationFn(nodes);
                }
              });
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //第二步加载右侧列表
    getTreeListFn(itemValue, isOrder, state) {
      let parentId =
        itemValue != null && !!itemValue
          ? itemValue.id
          : this.workCatalogueParentId;
      //  if (state) {
      //    parentId = JSON.parse(this.$route.query.locationData).parent[0].id
      //  }
      var url;
      if (this.Sourceof) {
          console.log(this.Sourceof)
        var data = {
          pageNo: this.listPageNo,
          pageSize: this.listPageSize,
          sourceName:"我的审批-文件审批", //页面位置，记录日志用
        projectName:this.projectName, //项目名称，记录日志用
          data: {
            approvalId: this.fileDate.data.row.id, // 任务id
            isSearch: false,
            orderFlag: this.orderFlag,
            reviw: this.viewType ? 1 : 2 // 目录视图 列表视图
          }
        };
        url = "/info/audit/getPengdingFileForList";
      } else {
        var data = {
          pageNo: this.listPageNo,
          pageSize: this.listPageSize,
          sourceName:`我的审批-${this.getcategoryId == 2?'文件':this.getcategoryId == 10?'文件修订':this.getcategoryId == 3?'目录':'目录修订'}审批`,
        //   sourceName:`我的审批-${this.getcategoryId == 2 || this.getcategoryId == 10? '文件' : '目录'}审批`,//页面位置，记录日志用
          projectName:this.projectName, //项目名称，记录日志用
          data: {
            approvalId: this.fileDate.data.row.id, // 任务id
            orderFlag: this.orderFlag,
            isSearch: false,
            reviw: this.viewType ? 1 : 2 // 目录视图 列表视图
          }
        };
        console.log(this.getcategoryId)
        url = (this.getcategoryId == 2 || this.getcategoryId == 10)?"/info/audit/getPengdingFileForPaper":"/info/audit/getPengdingDirForPaper"
      }
      this.viewType ? (data.data.parentIdList = [parentId]) : "";
      this.$post(url, data)
        .then(res => {
          this.toggleFlag = false
          if (this.requestCode.SUCCESS != res.code) {
            this.$message.error(res.msg);
            return;
          }
          if (
            res.data.totalPages < res.data.number &&
            res.data.totalPages != 0
          ) {
            this.listPageNo = res.data.totalPages - 1;
            this.getTreeListFn(null, this.orderFlag != "");
            return;
          }
          this.flieNameData = res.data.content;
          console.log('xue1', this.flieNameData)
          this.flieNameData && this.labelList(this.flieNameData);
          if((this.getcategoryId != 2 && this.getcategoryId != 10)){
              this.getpath(this.flieNameData)
            }
          this.tableListTotal = res.data.totalElements;
          this.flieNameData.map(item => {
            item.isEdit = false;
            item.isAddDir = false;
            this.iconFilter(item);
            // this.labelList(item, res.data.content);
            // console.log(item);
            // if (item.rfsId != null) {
            //   this.filePath(item, res.data.content);
            // }
            // if((this.getcategoryId != 2 && this.getcategoryId != 10)){
            //   if(item.docType == 1){
            //     this.getpath(item,res.data.content)
            //   }
            // }
          });
          this.displaySelected();
          // 判断底稿定位
          // console.log(state)
          // if (state) {
            this.$nextTick(() => {
              if(this.$route.query.file == undefined){
                return
              }
               console.log(res.data.content)
               console.log(JSON.parse(this.$route.query.file))
              var item = ''
              res.data.content.forEach((item,idx) => {
                if(item.docId == null){
                  if(item.id == JSON.parse(this.$route.query.file).id){
                    // console.log(item)
                    this.$refs.multipleTable.toggleRowSelection(item);
                    let manuBox = $('#el_main .el-scrollbar__wrap');
                    manuBox.animate({ scrollTop: manuBox.outerHeight(true) }, 300);
                    let height = $(`#manu_table .el-table__body tbody .el-table__row:nth-child(${ idx })`).prop("offsetTop")
                    // console.log('height', height)
                    this.$refs.multipleTable.bodyWrapper.scrollTop=height+100
                    this.$select.handleFileSelect(
                      this.Sourceof ? 3 : (this.getcategoryId == 3 ||this.getcategoryId == 11)?5:4,
                      this.rowprojectId,
                      this.approvalinfo,
                      [item]
                    );
                  }
                }else{
                  if (item.docId == JSON.parse(this.$route.query.file).docId) {
                    this.$refs.multipleTable.toggleRowSelection(item);
                    this.$select.handleFileSelect(
                      this.Sourceof ? 3 : (this.getcategoryId == 3 ||this.getcategoryId == 11)?5:4,
                      this.rowprojectId,
                      this.approvalinfo,
                      [item]
                    );
                  }
                }
              });
            });
          // }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getpath(items){
      if (!items) return
      // item.docType == 1
      let val = items.find(v => v.docType == 1)
      console.log(val, '目录', items, !val)
      if (!val) return
      this.$post("/doc/project/link/docPath", {
        data: {
          paperIdSet: Array.isArray(val) ? val.map(v => v.id) : [val.id]
        },
        token: this.token,
        userId: this.userId,
        projectId: this.fileDate.data.row.projectId
      })
        .then(res => {
          if (res.code != 0) {
            this.$message.error(res.msg);
            return;
          }
          Object.keys(res.data.docPaper).forEach(id => {
            this.flieNameData.forEach(item => {
              id == item.id &&
                this.$set(
                  item,
                  "fullPath",
                  res.data.docPaper[id].reverse().join(" / ")
                );
            });
          });
          // this.$set(val,'paths', res.data.docPaper[val.id][0])
          // this.$set(val,'pathss', res.data.docPaper[val.id].reverse().join(' / '))

        })
        .catch(err => {});
    },
    getfullPath(val) {
      let files = []
      files.push({
        docId: val.docId,
        parentId: val.parentId
      })
      this.$post("/info/audit/getDirHieraForFileRecord ", {
        data: {
          fileList: files,
          docSource: this.Sourceof ? 1 : 2, // "文件来源 1 项目文档/2 底稿管理",
          projectId: this.rowprojectId,
          isTile: true
        },
        token: this.token,
        userId: this.userId,
        projectId: this.fileDate.data.row.projectId
      })
        .then(res => {
          if (res.code != 0) {
            this.$message.error(res.msg);
            return;
          }
          let fullPath = res.data[0].dirName
          this.$set(val, 'fullPath', res.data[0].dirName.join(' / '))
          })
        .catch(err => {
          console.log(err);
        });
    },
    locationFn(node) {
      // node = node
      console.log(node);
      console.log(this.docLoction)
      //定位数据处理函数
      for (let i in this.docLoction.parent) {
        for (let j in node) {
          if (this.docLoction.parent[i].id == node[j].id) {
            console.log("进这了");
            this.manuscriptTreeDemo.selectNode(node[j]);
            var ls = this.manuscriptTreeDemo.reAsyncChildNodesPromise(
              node[j],
              "refresh"
            );
            ls.then(() => {
              if (this.docLoction.parentId == this.manuscriptTreeDemo.getSelectedNodes()[0].id) {
                console.log(node[j]);
                // this.getTreeListFn(node[j], "", true);
                setTimeout(() => {
                 this.getTreeListFn(node[j], "", true);
                }, 500)
              }
              this.locationFn(node[j].children);

              if (this.navArray.length == 0) {
                this.navArray.push(node[i]);
              } else {
                this.navArray = [];
                this.docLoction.parent.map((item, index) => {
                  let obj = [];
                  obj.docName = item.docName;
                  obj.id = item.id;
                  this.navArray.unshift(obj);
                });
              }
            });
          }
        }
      }
    },
    getAsyncUrl() {
      //配置底稿目录树请求地址
      var url = this.Sourceof
        ? "/doc/project/fileApprovalQuery" // 项目文档
        : "/doc/paper/fileApprovalQuery"; // 底稿
      return `${this.reqApi + url}`;
    },
    getAsyncData(treeId, treeNode) {
      //配置底稿目录树请求数据
      if (treeNode) {
        return {
          token: this.token,
          userId: this.userId,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          data: {
            isSearch: false,
            docType: 1,
            approvalId:this.approvalinfo,
            parentId: treeNode.id,
            projectId: this.fileDate.data.row.projectId
          }
        };
      } else {
        return {
          token: this.token,
          userId: this.userId,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          data: {
            docType: 1,
            parentId: 0,
            approvalId:this.approvalinfo,
            isSearch: false,
            projectId: this.fileDate.data.row.projectId
          }
        };
      }
    },
    onAsyncSuccessFn(event, treeId, treeNode, msg) {
      //异步树成功加载
      var zTree = $.fn.zTree.getZTreeObj(treeId);
      zTree.updateNode(treeNode); // 异步加载成功后刷新树节点
    },
    treeFilterFn(treeId, parentNode, responseData) {
      //异步加载过滤树
      if (responseData.code == this.requestCode.ARGUMENT_ERROR) {
        return this.$message({
          message: res.msg,
          type: "error"
        });
      } else if (responseData.code == this.requestCode.DOC_FIlE_TYPE_MISMATCH) {
        return;
      } else {
        responseData.data.content.forEach(item => {
          // console.log(item.fileSum,'____',item)

          if((this.getcategoryId == 3 || this.getcategoryId == 11)){
            if (item.docType === 1) {
              item.isParent = true;
              item.iconSkin = "diy02";
              item.checked = false;
            }
          }else{
             if (item.fileSum <= 0) {
                item.isParent = true;
                item.iconSkin = "diy02";
                item.checked = false;
              } else {
                if (item.docType === 1) {
                  item.isParent = true;
                  item.iconSkin = "diy01";
                  item.checked = false;
                }
              }
          }
        });
        this.allChecked = false;
        return responseData.data.content;
      }
    },
    zTreeOnClickFn(e, treeId, treeNode) {
      //点击树
      this.$refs.bottom_catalogue.style.height = this.catalogueoffsetHeight + 'px'
      console.log(e,treeNode)
      this.dwispc = true
      this.getdataj = treeNode;
      this.displaySelected();
      this.orderFlag = "";
      this.manuscriptTreeDemo.expandNode(treeNode);
      this.targetTreeNode = treeNode;
      this.clickType = 1;
      this.workCatalogueName = treeNode.docName;
      this.workCatalogueParentId = treeNode.id;
      this.parentIdData = treeNode;
      // console.log(treeNode)
      this.listPageNo = 0;
      this.listScrollTop.scrollTop = 0;
      var nodes = this.manuscriptTreeDemo.getNodesByParam(
        "searchBack",
        true,
        null
      ); //获取所有高亮数据
      if (this.dirData.length != 0) {
        nodes.map((item, idx) => {
          if (item.id == treeNode.id) {
            this.searchIdx = idx + 1;
          }
        });
      }
      if (treeNode.id || treeNode.id == 0) {
        this.getTreeListFn(treeNode);
      } else {
        this.flieNameData = [];
        return;
      }
      if (this.navArray.length == 0) {
        this.navArray.push(treeNode);
      } else {
        this.navArray = [];
        this.navFilterFn(treeNode);
      }
    },
    shrinkFn() {
      //底稿目录的推拉
      this.shrink_bac = !this.shrink_bac;
      this.searchFlag = !this.searchFlag;
      this.getPageHeight();
    },
    //点击导航
    navClickFn(itemValue) {
      this.dwispc = true
      this.getdataj = itemValue;
      this.rightMenuIsShow = false;
      this.orderFlag = "";
      this.listPageNo = 0;
      this.parentIdData = itemValue;
      this.workCatalogueParentId = itemValue.id;
      this.listScrollTop.scrollTop = 0;
      this.$post(
        this.Sourceof
          ? "/info/audit/getPengdingFileForList"
          :(this.getcategoryId == 3 || this.getcategoryId == 11)?"/info/audit/getPengdingDirForPaper":"/info/audit/getPengdingFileForPaper",
        {
          pageNo: this.listPageNo,
          pageSize: this.listPageSize,
          //sourceName:"我的审批-文件审批-点击导航", //页面位置，记录日志用
         // sourceName:`我的审批-${this.getcategoryId == 2 || this.getcategoryId == 10? '文件' : '目录'}审批-点击导航`,//页面位置，记录日志用
        //projectName:this.$store.state.projectMsg.projectMsg.name, //项目名称，记录日志用
          data: {
            approvalId: this.fileDate.data.row.id,
            reviw: this.viewType ? 1 : 2,
            isSearch: false,
            parentIdList: [itemValue.id]
          }
        }
      )
        .then(res => {
          if (this.requestCode.SUCCESS == res.code) {
            this.flieNameData = res.data.content;
            this.tableListTotal = res.data.totalElements;
            console.log('xue', this.flieNameData)
            this.flieNameData && this.labelList(this.flieNameData);
            this.flieNameData.map(item => {
              item.isEdit = false;
              item.isAddDir = false;
              this.iconFilter(item);
              // this.labelList(item);
            });
            var node = this.manuscriptTreeDemo.getNodeByParam(
              "id",
              itemValue.id,
              null
            );
            this.manuscriptTreeDemo.selectNode(node);
            this.navArray.map((item, idx) => {
              if (item.docName == itemValue.docName) {
                this.navArray.splice(idx + 1, this.navArray.length - 1);
              }
            });
            // 回显选中的文件
            this.displaySelected();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 版本关闭
    versionIs(val) {
      this.versionIsShow = val;
      !this.versionIsShow && this.deselected()
    },
    //文件版本弹框函数
    versionsDialogFn() {
      let selected = this.getnodeinfo().file;
      if (!selected.length) {
        this.$message.warning("请选择文件后点击版本");
        return;
      }
      if (selected.length > 1) {
        this.$message.warning("请选择单个文件后点击版本");
        return;
      }
      this.getDocVersionListFn(selected[0]);
    },
    //请求文件版本数据
    //type: 1. 弹框 2. 刷新
    getDocVersionListFn(itemValue) {
        console.log(itemValue)
      const data = {
        paperFlag:!this.Sourceof,
        // sourceName:`我的审批-${this.getcategoryId == 2 || this.getcategoryId == 10? '文件' : '目录'}审批-版本`,
        sourceName:`我的审批-${this.getcategoryId == 2?'文件':this.getcategoryId == 10?'文件修订':this.getcategoryId == 3?'目录':'目录修订'}审批-版本`,
        projectName:this.projectName, //项目名称，记录日志用
        data: {
          docId: itemValue.docId,
          docName:itemValue.docName,
          parentId:itemValue.parentId
        }
      };
      var url = this.Sourceof
        ? "/doc/project/getDocVersionList"
        : "/doc/paper/getDocVersionList";
      this.$post(url, data)
        .then(res => {
          // alert(1,this.requestCode.SUCCESS == res.code, res.code)
          if (this.requestCode.SUCCESS == res.code) {
            this.versionsData = res.data;
            this.versionIsShow = true;
          }else{
            this.$message.error(res.msg)
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    exportinfo() {
      console.log(this.getnodeinfo())
      let selected = this.getnodeinfo()
      if (selected.file.length == "" && selected.dir.length == "" ) {
        this.$message.warning(`当前无选中${this.filenames}，请选择您要导出的${this.filenames}`);
        return
      }
      this.$store.commit("export", {
        url: "/doc/paper/ViewExport",

        data: {
          fileName: this.projectName,
          projectId: this.rowprojectId,
          source: this.Sourceof ? 0 : 1, //1底稿2项目文档
          files: selected.file.map(v => v.id).join(","),
          dirs: selected.dir.map(v => v.id).join(",")
        }
      });
    },
    downloadFn() {
      let selected = this.getnodeinfo()
      console.log(selected)
      var file = (selected.manaullyFile.concat(selected.dir)).concat(selected.file)
      if (!file.length) {
        this.$message.warning(`请选中${this.filenames}后点击下载`);
        return;
      }
      let arr = [];
      if(this.isPC) {
        let pcArr = this.$utils.uniqBy(file,'id')
        let downloadArr = []
        downloadArr = pcArr.map(item => {
          return {
            docId: item.docId,
            docType: item.docType,
            id: item.id,
            docName: item.docName,
            source: this.Sourceof?0:1, // 文件源： 1底稿 0项目文档 2客户文档
            parentId: item.parentId,
            projectId: item.projectId,
            parentName: item.parentName,
            sourceName: `我的审批-${this.getcategoryId == 2?'文件':this.getcategoryId == 10?'文件修订':this.getcategoryId == 3?'目录':'目录修订'}审批`,
            projectName: this.$store.state.projectMsg.projectMsg.name,
            paperFlag: !this.Sourceof, // Sourceof false为底稿
            approvalId: this.approvalinfo
          };
        });
        this.$store.commit("download", downloadArr);
        this.deselected()
        return
      }
      arr = file.map(item => {
        return {
          name: item.docName,
          id: item.rfsId != null ? item.docId : item.id,
          parentId: item.parentId,
          rfsId: item.rfsId != null ? item.rfsId : "",
          fileName: item.docName,
          docType: item.rfsId != null ? 0 : 1,
          docId:item.docId
        }
      })
      if(selected.dir.length == 0 && selected.manaullyFile.length == 1){
        let obj = {};
        let peon = arr.reduce((cur,next) => {
            obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
            return cur;
        },[]) //设置cur默认类型为数组，并且初始值为空的数组
        this.$store.commit("download", peon)
        this.deselected()
        return
      }
      this.$store.commit("export", {
        url: "/rfs/files/downloadDocsZipForApproval",
        data: {
          projectName: this.projectName,
          source: this.Sourceof ? 0 : 1,
          random: Math.random(),
          files: arr
        }
      });
      this.deselected()
    },
    //table数据改变
    selectChangeFn(itemValue) {
      setTimeout(() => {
        this.selectFileNameArray = itemValue;
        this.manuscriptTreeDemo.checkAllNodes(false);
        this.rightMenuIsShow = false;
        itemValue.forEach(item => {
          if (item.docType != 1) return;
          this.manuscriptTreeDemo.checkNode(
            this.manuscriptTreeDemo.getNodesByParam("id", item.id)[0],
            "",
            true
          );
        });
      }, 500);
    },
    rowClass({ row, rowIndex }) {
      if (!this.selectFileNameArray) return;
      if (this.selectFileNameArray.includes(row)) {
        return {
          "background-color": "rgba(244,246,249,1)"
        };
      }
    },
    //双击每条数据
    dblclickFn(itemValue, event, column) {
      if(column.type==="selection") return
      this.dwispc = true
      this.getdataj = itemValue;
      this.orderFlag = "";
      this.shrink_bac = false;
      this.getPageHeight();
      this.searchFlag = true;
      this.rightMenuIsShow = false;
      this.clickType = 2;
      this.dblclickData = itemValue;
      this.parentIdData = itemValue;
      console.log(itemValue);
      if (itemValue.docType == 0) {
        var jurisdiction = rightSysPermissionFn(
          this.rowprojectId,
          "paper_file_file_preview"
        );
        var previewData = {
          projectid: this.rowprojectId,
          rfsId: itemValue.rfsId,
          docId: itemValue.docId,
          photoType: itemValue.type,
          sourceType: "manuscriptmanage",
          docName: itemValue.docName,
          projectName: this.projectName
        };
        itemValue.source = "1";
        // this.isPC
        //   ? window.ChromeMain.CS_Main_OpenFile(JSON.stringify(itemValue)) // PC端双击在线编辑
        this.$store.commit("previewAllFn", previewData); // web端预览
      } else if (itemValue.docType == 1) {
        this.listPageNo = 1;
        this.workCatalogueParentId = itemValue.id;
        this.listScrollTop.scrollTop = 0;
        var node = this.manuscriptTreeDemo.getNodeByParam(
          "id",
          itemValue.id,
          null
        );
        node.children = [];
        this.manuscriptTreeDemo.selectNode(node);
        this.manuscriptTreeDemo.reAsyncChildNodes(node, "refresh");
        this.getTreeListFn(node); // 更新右侧列表
        this.navArray.map((item, idx) => {
          if (item.parentId == itemValue.parentId) {
            this.navArray.splice(idx, 1, itemValue);
          } else {
            this.navArray.push(itemValue);
            this.navArray = Array.from(new Set(this.navArray));
          }
        });
      }
    },
    filter(node) {
      return node.docName == this.dblclickData.docName;
    },
    Trim(str) {
      //去前后空格
      return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    below(url, data) {
      //下载模拟form表单
      var allUrl = this.reqApi + url;
      var form = $("<form></form>");
      form.attr("method", "post");
      form.attr("action", allUrl);
      form.attr("Content-Type", "application/json;charset=UTF-8");
      form.attr("dataType", "json");
      var input1 = $('<input name="random" style="opacity:0"/>');
      input1.val(data.random);
      var input2 = $('<input name="fileName" style="opacity:0"/>');
      input2.val(data.fileName);
      var input3 = $('<input name="files" style="opacity:0"/>');
      input3.val(data.files);
      form.append(input1);
      form.append(input2);
      form.append(input3);

      $("body").append(form);
      form.submit().remove();
    },
    export(url, data) {
      //导出模拟form表单
      var allUrl = this.reqApi + url;
      var form = $("<form></form>");
      form.attr("method", "post");
      form.attr("action", allUrl);
      form.attr("Content-Type", "application/json;charset=UTF-8");
      form.attr("dataType", "json");
      var input1 = $('<input name="token" style="opacity:0"/>');
      input1.val(data.token);
      var input2 = $('<input name="userId" style="opacity:0"/>');
      input2.val(data.userId);
      form.append(input1);
      form.append(input2);
      if (data.data) {
        var input3 = $('<input name="data" style="opacity:0"/>');
        input3.val(JSON.stringify(data.data));
        form.append(input3);
      }
      $("body").append(form);
      form.submit().remove();
    },
    DocLockEchoingFn(itemValue) {
      //封装锁定回显列表刷新
      var nodeParent = this.manuscriptTreeDemo.getNodeByParam(
        "id",
        itemValue.parentId,
        null
      );
      this.getTreeListFn(nodeParent);
    },
    versionEchoingFn(itemValue) {
      //封装版本回显列表刷新
      var nodeParent = this.manuscriptTreeDemo.getNodeByParam(
        "id",
        itemValue,
        null
      );
      this.getTreeListFn(nodeParent);
    },
    navFilterFn(node) {
      if (!node) {
        // return; 中断执行
        return;
      }
      this.navArray.unshift({
        id: node.id,
        docName: node.docName
      });
      var parentNode = node.getParentNode();
      if (parentNode) {
        this.navFilterFn(parentNode);
      }
      return this.navArray;
    },
    renderSize(value) {
      //过滤处理文件大小
      return this.$utils.handleFileSize(value);
    },
    stripscript(s) {
      //过滤重命名的特殊符号
      var pattern = new RegExp(
        "[`~!@#$^&*=|{}':;',\\[\\]<>/?~！@#￥……&*——|{}【】‘；：”“'。，、？]"
      );
      var rs = "";
      for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, "");
      }
      return rs;
    },
    iconFilter(itemValue) {
      //过滤重命名的icon
      if (itemValue.docType == 1) {
        itemValue.fileIcon = require("../../../common/fileIcon/FolderType1.png");
      } else {
        var hz_name = itemValue.type.toLowerCase();
        if (hz_name == "doc" || hz_name == "docx" || hz_name == "rtf") {
          itemValue.fileIcon = require("../../../common/fileIcon/DocType.png");
        } else if (
          hz_name == "xls" ||
          hz_name == "xlsx" ||
          hz_name == "excel"
        ) {
          itemValue.fileIcon = require("../../../common/fileIcon/XlsType.png");
        } else if (
          hz_name == "ppt" ||
          hz_name == "pptx" ||
          hz_name == "pps" ||
          hz_name == "ppsx" ||
          hz_name == "ppsm"
        ) {
          itemValue.fileIcon = require("../../../common/fileIcon/PptType.png");
        } else if (
          hz_name == "jpg" ||
          hz_name == "jpeg" ||
          hz_name == "gif" ||
          hz_name == "bmp" ||
          hz_name == "png"
        ) {
          itemValue.fileIcon = require("../../../common/fileIcon/ImgType.png");
        } else if (
          hz_name == "wmv" ||
          hz_name == "avi" ||
          hz_name == "dat" ||
          hz_name == "asf" ||
          hz_name == "rm" ||
          hz_name == "rmvb" ||
          hz_name == "mpg"
        ) {
          itemValue.fileIcon = require("../../../common/fileIcon/VideoType.png");
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
          itemValue.fileIcon = require("../../../common/fileIcon/VideoType.png");
        } else if (
          hz_name == "mp3" ||
          hz_name == "wav" ||
          hz_name == "wma" ||
          hz_name == "mid"
        ) {
          itemValue.fileIcon = require("../../../common/fileIcon/MusicType.png");
        } else if (hz_name == "pdf") {
          itemValue.fileIcon = require("../../../common/fileIcon/PdfType.png");
        } else if (hz_name == "indd") {
          itemValue.fileIcon = require("../../../common/fileIcon/indd.png");
        } else if (hz_name == "ai") {
          itemValue.fileIcon = require("../../../common/fileIcon/ai.png");
        } else if (hz_name == "psd") {
          itemValue.fileIcon = require("../../../common/fileIcon/ps.png");
        } else if (hz_name == "tif") {
          itemValue.fileIcon = require("../../../common/fileIcon/tiff.png");
        } else if (hz_name == "zip" || hz_name == "rar") {
          itemValue.fileIcon = require("../../../common/fileIcon/RarType.png");
        } else {
          itemValue.fileIcon = require("../../../common/fileIcon/other.png");
        }
      }
    },
    isIE() {
      //ie?
      if (!!window.ActiveXObject || "ActiveXObject" in window) {
        return true;
      } else {
        return false;
      }
    },

    //关闭从底稿选择
    draftClears(varyt) {
      this.relafagmanus = false;
    },
    //底稿返回值
    elationUpmanscFn(newAddIndexPaper, oldIndexPaper) {
      let arr = []; //新增id集合
      let delIds = []; //删除id集合
      let addIndexList = [];
      let delIndexList = [];
      newAddIndexPaper.forEach(function(c) {
        if (c.id) {
          let obj = {};
          obj.id = c.id;
          obj.docName = c.docName;
          obj.parentName = c.parentName;
          arr.push(c.id);
          addIndexList.push(obj);
        }
      });
      oldIndexPaper.forEach(function(c) {
        if (c.id) {
          let obj = {};
          obj.id = c.id;
          obj.docName = c.docName;
          obj.parentId = c.parentId;
          delIds.push(c.id);
          delIndexList.push(obj);
        }
      });
      if (oldIndexPaper.length === 0 && arr.length === 0) {
        this.relafagmanus = false;
        return;
      }
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          paperId: this.editIndexCurPaper.id,
          delIds: delIds,
          addIndexId: arr,
          docName: this.editIndexCurPaper.docName,
          parentName: this.editIndexCurPaper.parentName,
          delIndexList: delIndexList,
          addIndexList: addIndexList
        }
      };
      this.$post("/doc/paper/editPaperIndex", data)
        .then(res => {
          if (this.requestCode.SUCCESS == res.code) {
            this.relafagmanus = false;
            this.$message({
              message: res.msg,
              type: "success"
            });
            this.labelList(this.editIndexCurPaper);
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    indexPaperHover(item, row) {
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          id: item.id
        }
      };
      this.$post("/doc/paper/queryPaperParent", data)
        .then(res => {
          if (this.requestCode.SUCCESS == res.code) {
            for (let i = 0; i < this.flieNameData.length; i++) {
              if (this.flieNameData[i].id == row.id) {
                for (
                  let j = 0;
                  j < this.flieNameData[i].indexPaper.length;
                  j++
                ) {
                  if (this.flieNameData[i].indexPaper[j].id === item.id) {
                    this.$set(
                      this.flieNameData[i].indexPaper[j],
                      "title",
                      res.data.reverse().join(" / ")
                    );
                  }
                }
              }
            }
          } else {
            //
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //预览被索引文件
    paperIndexView(row, itemValue) {
      let access = this.$utils.checkSystemPermission('paper_file_file_preview')
      if(!access){
        this.$message.error('无对应文件预览权限，请在角色权限中进行配置')
        return
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
        projectName: this.projectName
      };
      this.$store.commit("previewAllFn", previewData);
    },
    // 节点审批
    nodeApproval() {
      var row = JSON.parse(this.$route.query.item);
      var data = {
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId,
        data: {
          taskId: this.fileDate.data.row.taskId
        }
      };
      var url = "/info/audit/check_approval";
      this.$post(url, data).then(response => {
        if(response.code != 0){
          this.$message.error(response.msg);
          return
        }
        console.log(1211212, this.fileDate)
        this.Auditco = true;
        this.queryApprovalFiles(row);
      }).catch(function (error) {
        console.log(error);
      });
    },
    // 顶部
    toggleView() {
      this.viewType = !this.viewType; // true目录视图 false列表视图
      this.listPageNo = 0;
      this.toggleFlag = true
      this.getTreeListFn(this.zNodes[0]);
      this.getPageHeight();
    },
    // 查询意见
    queryApprovalFiles(item, state) {
      let obj = {
        data: { approvalId: item.id },
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId,
        projectId: item.projectId
      };
      this.$post("/info/audit/getPendingFileList", obj).then(res => {
        console.log(res, "查询审核的文件");
        if (!res) {
          return;
        }
        if (res.code !== 0) {
          return;
        }
        // 查询接口调用出来的审批的文件信息
        this.approvalRecordObj.attach = res.data;
        this.approvalRecordObj.approvalId = item.id;
        this.approvalRecordObj.docSource = item.docSource;
        console.log(this.approvalRecordObj, "审核记录的传值");
      });
    },
    // 节点审批弹窗回调
    ogVisible(val) {
      if (val.data != undefined) {
        if (val.data != 1) {
          this.catItem = val.data;
          this.catItem.submiter.originData = true;
          this.catItem.submiter.uniqueKey = "user" + this.catItem.submiter.id;
          this.catItem.submiter.userId = this.catItem.submiter.id;
          // 发起人
          this.calendardata.u = [this.catItem.submiter];
          // 抄送人
          this.calendardata.c = [
            {
              userId: this.$store.state.loginObject.userId,
              name: this.$store.state.loginObject.userName,
              uniqueKey: "user" + this.$store.state.loginObject.userId,
              originData: true, //  默认
              num: Math.random()
            }
          ];
          // 项目信息
          this.calendardata.p = {
            p: this.catItem.projectId,
            n: this.catItem.projectName
          };
        }
        this.Auditco = val.s;
        this.calend = val.d;
      }
    },
    calende(val) {
      this.calend = val.s;
    },
    filejl(val) {
      console.log(val, this.approvalRecordObj)
      let obj = {
        data:{approvalId: this.approvalRecordObj.approvalId},
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId,
        projectId: val.projectId
      }
      this.$post('/info/audit/getPendingFileList', obj).then(res => {
        if (!res) {
            return
        }
        if (res.code !== 0) {
          return
        }
        
        this.approvalRecordObj.attach = res.data
        this.approvalRecordObj.approvalId = this.approvalRecordObj.approvalId
        this.approvalRecordObj.docSource = this.approvalRecordObj.docSource
        this.approvalRecordObj.item = val
        this.approvalRecordObj.sourceName = '主工作台-我的审批-审批记录'
        this.approvalRecordShow = true
      })
      // this.filejlval = { v: val, s: true };
    },
    Filepageht() {
      this.$router.push({ path: this.$route.query.path });
    }
  }
};
</script>
<style lang="scss" scoped>
// 全局样式
.seticon{
    display: inline-block;
    font-size: 24px;
    color: #409eff;
    margin-right: 8px;
    margin-top: 8px;
    margin-left: 0px;
}
.manuscriptmanage_box {
  .table-header-row /deep/th {
    background: #14161a;
  }
  .rightMenu {
    position: fixed;
    z-index: 999;
  }

  .right_tree {
    width: 100%;
    height: 90%;
    overflow: auto;

    .examineZtree {
      width: 100%;
      height: 100%;
    }
  }
}

// 头部样式
.manuscriptmanage_header {
  width: 100%;
  height: 100px;
  background-color: #fff;
  text-align: left;
  margin-bottom: 10px;

  .header_break {
    font-size: 14px;
    margin-left: 17px;
  }

  .indexpage_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .header_title {
      font-size: 20px;
      font-family: MicrosoftYaHei;
      color: #333;
      margin-top: 3px;
      margin-bottom: 10px;
      font-weight: 600;
      margin-left: 20px;
      cursor: pointer;
      i {
        font-size: 22px;
        vertical-align: middle;
      }
    }

    .header_operation {
      display: flex;
      padding-right: 2px;

      .header_operation_chunk {
        height: 45px;
        padding-right: 36px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
}

// 下部分
#manuscriptmanage {
  width: 100%;
  position: relative;
  display: flex;
  height: 100%;

  /deep/ .el-scrollbar__wrap {
    overflow-x: auto;
  }

  /*谷歌、safari、qq浏览器、360浏览器滚动条样式*/
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #f5f5f5;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #bdbdbd;
  }

  /*滑块效果*/
  ::-webkit-scrollbar-thumb:hover {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.4);
  }

  /*IE滚动条颜色*/
  html {
    scrollbar-face-color: #bfbfbf;
    /*滚动条颜色*/
    scrollbar-highlight-color: #000;
    scrollbar-3dlight-color: #000;
    scrollbar-darkshadow-color: #000;
    scrollbar-shadow-color: #adadad;
    /*滑块边色*/
    scrollbar-arrow-color: rgba(0, 0, 0, 0.4);
    /*箭头颜色*/
    scrollbar-track-color: #eeeeee;
    /*背景颜色*/
  }

  .bottom_catalogue {
    width: 100%;
    margin-right: 10px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    position: relative;

    .catalogue_search {
      width: 100%;
      display: flex;
      flex-direction: column;

      .catalogue_search_input {
        width: 95%;
        margin: 5px 2.5% 5px 2.5%;
      }

      .catalogue_search_showTitle {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .catalogue_search_showTitle_left {
          margin-left: 2.5%;
          font-size: 12px;
          color: #ba954b;
        }

        .catalogue_search_showTitle_right {
          margin-right: 2.5%;
        }
      }

      .catalogue_search_showTitle_empty {
        display: flex;

        .catalogue_search_showTitle_empty_left {
          margin-left: 2.5%;
          font-size: 12px;
          color: #ba954b;
        }
      }
    }

    .search_tree {
      height: calc(100% - 80px - 26px - 25px) !important;
      height: -webkit-calc(100% - 26px- 25px) !important; //chrome
      height: -moz-calc(100% - 26px- 25px) !important; //firefox
    }

    .catalogue_tree {
      width: calc(100% - 10px);
      height: calc(100% - 80px - 26px);
      height: -webkit-calc(100% - 26px); //chrome
      height: -moz-calc(100% - 26px); //firefox
      margin: 0 5px;
      overflow: auto;
      box-sizing: border-box;

      .ztree {
        width: 100%;
        // height: 100%;
        background: #fff;
        padding: 5px 0;
        box-sizing: border-box;
        overflow: auto;
        height: 98%;
      }
    }

    .catalogue_operation {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      position: absolute;
      bottom: 0;
      left: 0;
      border-top: 1px solid #dddddd;
      background: #fff;
      overflow: hidden;

      .operation_common:hover {
        cursor: pointer;
      }

      div {
        flex: 1;
        width: 14px;
        height: 14px;
        margin: 9px 15px 9px 15px;
      }
    }

    .shrink_bac_pull {
      width: 16px;
      height: 47px;
      display: inline-block;
      background: url("../../../../assets/manuscript_icon/leftpull_icon.png")
        no-repeat;
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      cursor: pointer;
      z-index: 500;
    }

    .shrink_bac_push {
      width: 16px;
      height: 47px;
      display: inline-block;
      background: url("../../../../assets/manuscript_icon/rightpush_icon.png")
        no-repeat;
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      cursor: pointer;
      z-index: 500;
    }
  }

  .bottom_indexpage {
    width: 100%;
    height: 100%;
    background: #ffffff;
    overflow: auto;
    box-sizing: border-box;

    .bottom_box_fied {
      height: 50px;
      width: 100%;

      .bottom_box {
        position: fixed;
        z-index: 888;
        bottom: 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        background: #fff;
        border-top: 1px solid #ddd;

        .sel_total {
          padding-left: 23px;
        }

        .bottom_pagination {
          padding-right: 24px;
          margin: 5px 0;
        }
      }
    }

    .indexpage_nav {
      width: 100%;
      display: flex;
      flex-direction: column;

      .nav_title {
        height: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0 0 19px;

        .title_left {
          width: 95%;
          max-width: 95%;
          /*写给不支持calc()的浏览器*/
          //   max-width: -moz-calc(100% - 226px);
          //   max-width: -webkit-calc(100% - 226px);
          //   max-width: calc(100% - 226px);
          height: 100%;
          display: flex;
          align-items: center;

          .title_nav {
            width: 95%;
            max-width: 95%;
            height: 28px;
            border: 1px solid #d7d7d7;
            padding-left: 7px;
            background: #f7f8fa;
            border-radius: 1px;
            display: flex;
            align-items: center;
            font-size: 13px;
            overflow: hidden;
          }
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
          min-height: 65px !important;
          max-height: 500px !important;
          max-width: 100% !important;
        }

        .search_box_left {
          // display: flex;
          // flex-wrap: wrap;
          max-height: 52px;
          max-width: 50%;
          /*写给不支持calc()的浏览器*/
          max-width: -moz-calc(100% - 360px);
          max-width: -webkit-calc(100% - 360px);
          max-width: calc(100% - 360px);
          overflow: hidden;
          padding: 8px 0 8px 20px;

          .search_item {
            // display: flex;
            // justify-content: space-between;
            float: left;
            height: 40px;
            padding: 7px 22px 7px 0;

            .search_tit {
              float: left;
              width: 90px;
              line-height: 40px;
            }
            .el_wide{
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

      // 按钮组
      .nav_operation {
        display: flex;
        justify-content: space-between;

        .btn_group_toggle {
          min-height: 60px !important;
          max-height: 300px !important;
        }

        .btn_box {
          max-height: 40px;
          margin: 5px 0 5px 19px;
          // display: flex;
          // flex-wrap: wrap;
          overflow: hidden;


        }
      }

      // 展开收起样式
      .btn_drop {
        margin: 16px 21px 0 0;
        height: 24px;
        border-radius: 14px;
        /deep/ .el-button {
          // height: 24px;
          // width: 80px;
          // padding: 6px 15px;
          height: 26px;
          width: 50px;
          padding:5px 5px;
          border-radius: 4px;
        }
         background: white;
        .drop_icon {
          font-size: 10px;
        }
      }
    }

    .indexpage_list {
      width: 100%;
      // height: 100%;
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

        .list_name_rename {
          display: flex;
          align-items: center;
          width: calc(100% - 25px);

          .editIcon,
          .addIcon {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;

            margin-left: 8px;
            font-size: 20px;
            cursor: pointer;
          }

          .editIcon {
            color: #add7a0;
          }

          .addIcon {
            color: #efb87f;
          }
        }

        .list_name_title_die {
          text-decoration: line-through;
          color: #2a383f;
          font-size: 14px;
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
            height: 15px !important;
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

            $imgUrl: "../../../../assets/project_doc/";

            // 表格内图片图标
            .auditStatus_z1 {
              background: url($imgUrl+"yjg.png") no-repeat 0% 0%/40px
                17px;
              width: 40px;
            }
             .auditStatus_z2 {
              background: url($imgUrl+"yxd.png") no-repeat 0% 0%/40px
                17px;
              width: 40px;
            }
             .auditStatus_z3 {
              background: url($imgUrl+"ybh.png") no-repeat 0% 0%/40px
                17px;
              width: 40px;
            }
            .auditStatus_z4 {
              background: url($imgUrl+"noPassed.png") no-repeat 0% 0%/40px
                17px;
              width: 40px;
            }

            .auditStatus_z {
              background: url($imgUrl+"shenpizhong.png") no-repeat 0% 0%/40px
                17px;
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
              background: url($imgUrl+"jiedianshenpitongguo.png") no-repeat 0%
                0%/60px 17px;
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
            font-size: 12px;
            font-weight: bold;
          }
        }
      }
    }
  }

  .manuscriptmanage_section {
    width: 100%;
    height: 100%;
    display: flex;
  }

  .paper_index_name {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .list_index_box {
    //width: 100%;
    //height: 64px;
    //overflow:hidden;
    //text-overflow:ellipsis;
    //white-space:nowrap;
  }

  .tab_edit_btn {
    color: #0061a9;
  }

  .tab_edit_btn:hover {
    text-decoration: underline;
  }

  .paper_index_name_die {
    text-decoration: line-through;
  }


}

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

</style>
<style lang="scss" scope>
.title_select_dropdown {
  width: 200px;
}

.content_citeCatalog_select_dropdown {
  width: 200px;
}

/* 全文检索input样式 */
.title_input .el-input__inner {
  width: 100%;
  height: 30px;
  line-height: 30px;
  border-radius: 15px;
}

.title_input .el-input__suffix-inner .el-icon-search {
  line-height: 30px;
}

.ztree li span.button.diy01_ico_open {
  line-height: 0;
  margin: 0;
  width: 18px;
  height: 18px;
  display: inline-block;
  vertical-align: middle;
  border: 0 none;
  cursor: pointer;
  outline: none;
  background-color: transparent;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background: url("../../../../assets/manuscript_icon/close_icon.png") no-repeat;
  background-size: 18px 14px;
}

.ztree li span.button.diy01_ico_close {
  line-height: 0;
  margin: 0;
  width: 18px;
  height: 18px;
  display: inline-block;
  vertical-align: middle;
  border: 0 none;
  cursor: pointer;
  outline: none;
  background-color: transparent;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background: url("../../../../assets/manuscript_icon/open_icon.png") no-repeat;
  background-size: 18px 14px;
}

.ztree li span.button.diy02_ico_open {
  line-height: 0;
  margin: 0;
  width: 18px;
  height: 18px;
  display: inline-block;
  vertical-align: middle;
  border: 0 none;
  cursor: pointer;
  outline: none;
  background-color: transparent;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background: url("../../../../assets/common_icon/empty_open_icon.png") no-repeat;
  background-size: 18px 14px;
}

.ztree li span.button.diy02_ico_close {
  line-height: 0;
  margin: 0;
  width: 18px;
  height: 18px;
  display: inline-block;
  vertical-align: middle;
  border: 0 none;
  cursor: pointer;
  outline: none;
  background-color: transparent;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background: url("../../../../assets/common_icon/empty_close_icon.png") no-repeat;
  background-size: 18px 14px;
}

.ztree li a .dirStatus {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.ztree li a .statusPending {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: orange;
  border-radius: 50%;
}

.ztree li a .statusPass {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: green;
  border-radius: 50%;
}

.ztree li a .statusNoPass {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: red;
  border-radius: 50%;
}

.manuscriptZtree li a .node_name {
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

.manuscriptZtree li a.curSelectedNode {
  padding-top: 0px;
  background: #f0f0f0;
  color: black;
  height: 16px;
  border: 1px #f0f0f0 solid;
  opacity: 0.8;
}

.manuscriptZtree li span.switch {
  display: none;
}

.examineZtree li a .button {
  float: left;
}

.examineZtree li a .node_name {
  max-width: 250px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
}

.examineZtree li .diyState {
  display: inline-block;
  height: 16px;
  margin-left: 5px;
  cursor: none;
}

.examineZtree li .diyState:link {
  text-decoration: none;
}

.examineZtree li span.button.examine_ico_open {
  line-height: 0;
  margin: 0;
  width: 18px;
  height: 18px;
  display: inline-block;
  vertical-align: middle;
  border: 0 none;
  cursor: pointer;
  outline: none;
  background-color: transparent;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background: url("../../../../assets/manuscript_icon/examopen_icon.png") no-repeat;
  background-size: 18px 14px;
}

.examineZtree li span.button.examine_ico_close {
  line-height: 0;
  margin: 0;
  width: 18px;
  height: 18px;
  display: inline-block;
  vertical-align: middle;
  border: 0 none;
  cursor: pointer;
  outline: none;
  background-color: transparent;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background: url("../../../../assets/manuscript_icon/examclose_icon.png")
    no-repeat;
  background-size: 18px 14px;
}

.examineZtree li span.button.diy03_ico_docu {
  line-height: 0;
  margin: 0;
  width: 18px;
  height: 14px;
  display: inline-block;
  vertical-align: middle;
  border: 0 none;
  cursor: pointer;
  outline: none;
  background-color: transparent;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background: url("../../../../assets/manuscript_icon/file_icon.png") no-repeat;
  background-size: 13px 14px;
}

.examineZtree li a.curSelectedNode {
  padding-top: 0px;
  background: #f0f0f0;
  color: black;
  height: 16px;
  border: 1px #f0f0f0 solid;
  opacity: 0.8;
}

.examineZtree li span.switch {
  display: none;
}

/* 引用目录弹框样式 */
.citeCatalog_dialog .el-dialog__header {
  border-bottom: 1px solid #dddddd;
  text-align: center;
}

.citeCatalog_dialog .content_citeCatalog {
  display: flex;
  align-items: center;
  margin-left: 21px;
  margin-bottom: 17px;
}

.citeCatalog_dialog .content_citeTemp {
  display: flex;
  align-items: center;
  margin-left: 21px;
}

.citeCatalog_dialog .content_citeCatalog .content_citeCatalog_name {
  width: 70px;
  display: inline-block;
  margin-right: 14px;
}

.citeCatalog_dialog .content_citeCatalog .el-select {
  flex: 1;
  margin-right: 14px;
}

.citeCatalog_dialog .content_citeTemp .content_citeTemp_name {
  width: 70px;
  display: inline-block;
  margin-right: 14px;
}

.citeCatalog_dialog .content_citeTemp .el-radio {
  text-align: start;
}

/* 全局查看弹框样式 */
.examine_dialog {
  .el-dialog__header {
    border-bottom: 1px solid #dddddd;
    text-align: center;
  }

  .examine_content {
    display: flex;
    width: 98%;
    margin: 0 1% 0 1%;
    height: 400px;
    border: 1px solid #dddddd;

    .content_left {
      width: 200px;
      height: 100%;
      border-right: 1px solid #dddddd;
      display: flex;
      flex-direction: column;

      .left_content {
        width: 100%;
        height: auto;
        flex: 1;

        .left_content_chunk {
          display: flex;
          flex-direction: column;
          text-align: left;
          margin: 12px 0 10px 15px;

          .content_chunk_name {
            display: inline-block;
          }

          .el-checkbox {
            margin-top: 7px;
          }
        }
      }

      .left_footer {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 1px solid #dddddd;
        color: #999999;
        cursor: pointer;

        i {
          width: 14px;
          height: 14px;
          display: inline-block;
          background: url("../../../../assets/manuscript_icon/clear_icon.png")
            no-repeat;
          background-size: 14px 14px;
          margin-right: 5px;
        }
      }
    }

    .content_right {
      width: calc(100% - 200px) !important;
      width: -webkit-calc(100% - 200px); //chrome
      width: -moz-calc(100% - 200px); //firefox
      height: 100%;
      display: flex;
      flex-direction: column;

      .right_title {
        width: 100%;
        height: 50px;
        background: #f0f0f0;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .right_title_name {
          width: 8%;
          display: inline-block;
          margin-left: 4%;
        }

        .right_title_state {
          width: 8%;
          margin-left: 35%;
        }

        .right_title_download {
          margin-left: 15%;
        }

        .right_title_export {
          margin-left: 10px;
        }
      }
    }
  }
}

/* 文件属性 */
.fileAttribute_dialog {
  .el-dialog__header {
    border-bottom: 1px solid #dddddd;
    text-align: center;
  }

  .fileAttribute_content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .fileAttribute_content_item {
      width: 60%;
      display: flex;

      .fileAttribute_content_item_title {
        width: 55px;
        margin-left: 20px;
      }

      .fileAttribute_content_item_data {
        width: 260px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: left;
      }
    }
  }
}

/* 文件批注弹框样式 */
.postil_dialog .el-dialog__header {
  border-bottom: 1px solid #dddddd;
  text-align: center;
}

.postil_dialog .el-dialog__body {
  padding: 0 0;
}

.postil_dialog .postil_dialog_content {
  width: 95%;
  /*margin: 0 2.5% 0 2.5%;*/
  color: #2a383f;
  margin: 0 auto;
}

.postil_dialog_content .postil_dialog_content_fileName {
  text-align: left;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 26px 0 0 0;
}

.postil_dialog_content .postil_dialog_content_title {
  text-align: left;
  padding: 13px 0 0 0;
}

.postil_dialog_content .postil_dialog_content_tabel {
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #dddddd;
  margin-top: 12px;
  margin-bottom: 20px;
}

.postil_dialog_content_tabel .postil_dialog_content_tabel_title {
  width: 100%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
}

.postil_dialog_content_tabel_title span:nth-child(1) {
  width: 12%;
  display: inline-block;
  padding: 11px 0 10px 0;
  margin-left: 2%;
  text-align: left;
}

.postil_dialog_content_tabel_title span:nth-child(2) {
  width: 60%;
  display: inline-block;
  padding: 11px 0 10px 0;
  margin-left: 2%;
  text-align: left;
}

.postil_dialog_content_tabel_title span:nth-child(3) {
  width: 22%;
  display: inline-block;
  padding: 11px 0 10px 0;
  margin-left: 2%;
  text-align: left;
}

.postil_dialog_content_tabel .postil_dialog_content_tabel_coutent {
  width: 100%;
  height: 175px;
}

.postil_dialog_content_tabel_coutent .postil_dialog_content_tabel_coutent_item {
  width: 100%;
  display: flex;
  align-items: center;
}

.postil_dialog_content_tabel_coutent_item span {
  display: inline-block;
  font-size: 12px;
  margin-top: 14px;
}

.postil_dialog_content_tabel_coutent_item span:nth-child(1) {
  width: 12%;
  height: 20px;
  margin-left: 2%;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.postil_dialog_content_tabel_coutent_item span:nth-child(2) {
  width: 55%;
  margin-left: 2%;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  /*! autoprefixer: off */

  -webkit-box-orient: vertical;

  /*! autoprefixer: on */

  -webkit-line-clamp: 3;
}

.postil_dialog_content_tabel_coutent_item span:nth-child(3) {
  width: 20%;
  height: 20px;
  margin-left: 7%;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* .postil_dialog .postil_dialog_content_input{
        height: 10px;
    } */
.postil_dialog .el-input__inner {
  width: 570px;
  height: 65px;
  margin-top: 21px;
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

.span_sec_return:hover {
  text-decoration: underline;
  cursor: pointer;
}

.span_sec_down:hover {
  text-decoration: underline;
  cursor: pointer;
}

.manu_table .el-table__header-wrapper .cell {
  font-size: 13px;
  color: rgba(51, 51, 51, 1);
}

.manu_table .el-table__body-wrapper .el-table__row td {
  border: none;
  //height: 64px;
  padding: 0;
}

.manu_table .el-table__body-wrapper .el-table__row td .cell {
  // line-height: 37px;
  //height: 64px;
  //line-height: 64px;
}

.manu_table .el-table__body-wrapper .el-table__row td:nth-child(2) {
  border: none;
  height: 64px;
  padding: 0;
}

.manu_table .el-table__body-wrapper .el-table__row td:nth-child(2) .cell {
  // line-height: 37px;
  // height: 64px;
  // line-height: 64px;
}

.manu_table .el-table td {
  border: none;

  // height: 50px;
}

.list_name_title_auditStatusdiv {
  display: inline-block;
  /*height: 47px;*/
  width: 591px;
  white-space: initial;

  .el-tag {
    margin-right: 5px !important;
    padding: 1px !important;
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

.edit-tag {
  visibility: hidden;
}

.list_name_title:hover .edit-tag {
  visibility: visible;
}

#heaer_img {
  display: inline-block;
  width: 26px;
  height: 24px;
  margin-top: 6px;
  background-size: 100%;
  background-image: url("../../../../assets/image/bj.png");
}

#heaer_img:hover {
  display: inline-block;
  width: 26px;
  height: 24px;
  margin-top: 6px;
  background-size: 100%;
  background-image: url("../../../../assets/image/ls.png");
}

.operate-btn-header {
  font-size: 22px;
}
</style>
<style>
.manu_table .el-table--small td {
  padding: 0;
}
</style>
