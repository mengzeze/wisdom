<template>
  <div class="approve-search">
    <div class="fullsearch_header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{isSelectList?'已选文件列表':subTitle}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="title_box">
        <div class="title_msg">
          <el-button icon="el-icon-back"
              circle
              @click="back"
               class="back_icon"></el-button>
          {{isSelectList?'已选文件列表':subTitle}}
        </div>

        <!-- <div class="header_operation"> -->
          <!-- <el-button type="primary" @click="nodeApprove">节点审批</el-button> -->
        <!-- </div> -->

      </div>
    </div>
    <div class="fullsearch"
         id="fullsearch">
      <div class="fullsearch_nav" v-on:keyup.enter="queryData">
        <!-- 检索条件 -->
        <div class="search_box"
             id="search_box"
             v-show="!isSelectList">
          <div :class="['search_box_left', { search_box_toggle: !searchBtnDrop }]">
            <div class="search-item-box clearfix">
              <div class="search_item">
                <div class="search_tit">{{(getcategoryIds == 2 || getcategoryIds== 10)?'标题':'目录'}}关键字：</div>
                <el-input v-model="issearchCondition.docName"
                          class="el_wide"
                          placeholder="包含以下全部关键字(以空格区分)"></el-input>
              </div>
              <div class="search_item" v-if="getcategoryIds == 2 || getcategoryIds== 10">
                <div class="search_tit">内容关键字：</div>
                <el-input v-model="issearchCondition.docContent"
                          class="el_wide"
                          placeholder="包含以下全部关键字(以空格区分)"></el-input>
              </div>
              <div class="search_item" v-show="getcategoryIds == 2 || getcategoryIds== 10">
                <div class="search_tit">项目阶段：</div>
                <el-select v-model="issearchCondition.auditProjectIds"
                          class="el_wide"
                          clearable
                          placeholder="请选择项目阶段">
                  <el-option v-for="(item, index) in projectStage"
                            :label="item.name"
                            :key="index"
                            :value="item.id">
                  </el-option>
                </el-select>
              </div>
              <div class="search_item" v-show="getcategoryIds == 2 || getcategoryIds== 10">
                <div class="search_tit">文件类型：</div>
                <multiple-choice ref="suffixList"
                                @changeData="fileTypesChangeData"
                                :defaultSelectedValues="issearchConditionfileTypes"
                                :selectData="fileTypes"
                                :width="196"></multiple-choice>
              </div>
              <div class="search_item" v-show="getcategoryIds == 2 || getcategoryIds== 10">
                <div class="search_tit">文件状态：</div>
                <multiple-choice ref="fileStatus"
                                @changeData="fileStateChangeData"
                                :defaultSelectedValues="issearchConditionfileState"
                                :selectData="fileState"
                                :width="196"></multiple-choice>
              </div>
              <div class="search_item">
                <div class="search_tit">目录状态：</div>
                <multiple-choice ref="dirStatus"
                                @changeData="dirStateChangeData"
                                :defaultSelectedValues="issearchConditiondirState"
                                :selectData="dirState"
                                :width="196"></multiple-choice>
              </div>
              <div class="search_item">
                <div class="search_tit">修改时间：</div>
                <!-- 修改时间 -->
                <date-range :width="196"
                            :date-start.sync="issearchCondition.beginTime"
                            :date-end.sync="issearchCondition.endTime"
                            format="yyyy-MM-dd" class="el_wide"></date-range>
              </div>
             </div>
            <div class="search_btn"
                 v-show="!searchBtnDrop">
              <el-button type="primary"
                         icon="el-icon-search"
                         @click="queryData">查询</el-button>
              <el-button icon="el-icon-refresh"
                         @click="resetFn">重置</el-button>
            </div>
          </div>
          <div class="search_btn default_search_btn"
               v-show="searchBtnDrop">
            <el-button type="primary"
                       icon="el-icon-search"
                       @click="queryData">查询</el-button>
            <el-button icon="el-icon-refresh"
                       @click="resetFn">重置</el-button>
          </div>
          <div class="btn_drop">
            <el-button @click="btnBoxToggle('searchBtnDrop')" v-if="moreSearchBtnVisible"
                       type="primary"
                       size="mini"
                       round
                       plain>
              {{ searchBtnDrop ? '更多' : '收起' }}
              <i :class="[
                  'drop_icon',
                  'iconfont',
                  searchBtnDrop ? 'jiantou' : 'jiantou_shang'
                ]"></i>
            </el-button>
          </div>
        </div>
        <div class="nav_operation">
          <div :class="['btn_box', { btn_group_toggle: !btnGroupDrop }]" id="btn_box">
            <div class="toolbar_file_search_box">
                <div class="toolbar_file_search clearfix">
                    <div class="operation_chunk"
                        @click="downloadFn">
                      <i class="iconfont Shapecopy chunk_icon"></i>
                      <span class="chunk_name">下载</span>
                    </div>

                    <div class="operation_chunk"
                        @click="fileApprove">
                            <i class="shenpi iconfont chunk_icon"></i>
                            <span class="chunk_name">审批</span>
                    </div>

                    <div class="operation_chunk" v-if="getcategoryIds == 2 || getcategoryIds== 10"
                        @click="versionClick">
                      <i class="xinjianbanbenku iconfont chunk_icon"></i>
                      <span class="chunk_name">版本</span>
                    </div>


                    <div class="operation_chunk"
                        @click="discussionFn">
                      <i class="taolun iconfont chunk_icon"></i>
                      <span class="chunk_name">讨论</span>
                    </div>


                    <div class="operation_chunk"
                        v-show="getcategoryIds == 2 || getcategoryIds== 10"
                        v-if="!isSelectList"
                        @click="toSelectList">
                      <i class="yixuanliebiao iconfont chunk_icon"></i>
                      <span class="chunk_name">已选文件列表</span>
                    </div>

                  <div class="operation_chunk" @click="clearSelection(true)">
                    <i class="quxiaoxuanze iconfont chunk_icon"></i>
                    <span class="chunk_name">取消选择</span>
                  </div>

                    <div class="operation_chunk"
                        @click="exportClick">
                      <i class="daochu14px iconfont chunk_icon"></i>
                      <span class="chunk_name">导出</span>
                    </div>

                    <div class="operation_chunk"  v-show="getcategoryIds == 2 || getcategoryIds== 10"
                        @click="remarkClick">
                      <i class="beizhu iconfont chunk_icon"></i>
                      <span class="chunk_name">备注</span>
                    </div>

                    <div class="operation_chunk"
                        @click="approvalHandle">
                      <i class="wenjianshenpishenhequeren iconfont chunk_icon"></i>
                      <span class="chunk_name">{{(getcategoryIds == 2 || getcategoryIds== 10)?'文件':'目录'}}审批意见</span>
                    </div>
              </div>
            </div>
          </div>
          <div class="btn_drop">
            <el-button @click="btnBoxToggle('btnGroupDrop')" v-if="moreHandleBtnVisible"
                       type="primary"
                       size="mini"
                       round
                       plain>
              {{ btnGroupDrop ? '更多' : '收起' }}
              <i :class="[
                  'drop_icon',
                  'iconfont',
                  btnGroupDrop ? 'jiantou' : 'jiantou_shang'
                ]"></i>
            </el-button>
          </div>
        </div>
      </div>
      <el-table ref="table"
                id="table_box"
                class="search_table"
                header-row-class-name="table_header_style"
                :height="tableHeight"
                :data="fullsearchData"
                @select-all="handleSelectAll"
                @select="handleSelectDoc"
                @sort-change="tableSort"
                @row-dblclick="dblclickFn">
        <el-table-column type="selection"
                         width="55"> </el-table-column>
        <el-table-column label="文件名"
                         :sortable="!isSelectList"
                         prop="docName"
                         min-width="350">
          <template slot-scope="scope">
            <div class="list_name">
              <div class="list_name_icon">
                <img class="list_name_icon_img"
                     :src="scope.row.fileIcon" />
              </div>
              <div :class="[
                      {
                        'list_name_title3':
                          (scope.row.lockState ||
                            scope.row.auditStatus == 2) &&
                          scope.row.icon &&
                          scope.row.icon.length != 0
                      },
                      'list_name_title2',
                      'list_name_title'
                    ]">
                <div :title="scope.row.docName"
                     class="three-row-name">
                  <span v-html="scope.row.highlightName"></span>
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
                      <span
                        v-if="scope.row.auditStatus == 1  && !scope.row.showInitStatus"
                        title="已通过"
                        class="list_icon_img auditStatus_z1"
                      ></span>
                       <!-- <span
                        v-if="scope.row.auditStatus == 2 && !scope.row.showInitStatus"
                        title="已驳回"
                        class="list_icon_img auditStatus_z3"
                      ></span> -->
                       <span
                        v-if="scope.row.auditStatus == 2 && !scope.row.showInitStatus"
                        title="已驳回"
                        class="list_icon_img auditStatus_z3"
                      ></span>
                       <!-- <span
                        v-if="scope.row.auditStatus == 2 && !scope.row.showInitStatus && scope.row.docType == 1 "
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
                        v-if="dataSource == 'project' && scope.row.isLink == 1"
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
                <div class="list_name_title_auditStatusdiv"
                     v-if="scope.row.icon">
                  <el-tag class="list_name_title_auditStatus_tag"
                          :title="i.labelName"
                          :key="i.id"
                          v-for="i in scope.row.icon">{{ i.labelName }}</el-tag>
                </div>
              </div>

            </div>

          </template>

        </el-table-column>

        <!-- <el-table-column prop="projName" label="所在项目" width="200">
          <template slot-scope="scope">
            <span class="table_projName" :title="scope.row.projName">{{scope.row.projName}}</span>
          </template>
        </el-table-column> -->

        <el-table-column v-if="this.dataSource==='project'" label="所在阶段" prop="stageName">
          <template slot-scope="scope">
             <span class="clinc" :title="scope.row.stageName">{{scope.row.stageName}}</span>
          </template>
        </el-table-column>

        <el-table-column v-if="this.dataSource==='paper'"
                         prop="parentName"
                         label="所在目录"
                         width="200">
          <template slot-scope="scope">
            <span class="table_parentName clinc"
                  :title='`${scope.row.fullPath} / ${scope.row.docName}`'>
              {{scope.row.parentName}}
            </span>
          </template>
        </el-table-column>

        <el-table-column label="修改时间"
                         :sortable="!isSelectList"
                         prop="modifyTime"
                         align="center"
                         width="200">
          <template slot-scope="scope">
            <div v-if="scope.row.docType == 0"
                 class="list_time">
              <span class="list_time_updateTime">{{ scope.row.updateTime }}</span>
              <div>
                <span class="list_time_updateUserName"
                      :title="scope.row.createUserName">{{ scope.row.createUserName }}</span>
                &nbsp;
                <span>
                  生成
                  <span class="color-primary list_time_docVersionNumber">V{{ scope.row.docVersionNumber }}</span>
                </span>
              </div>
            </div>
              <div v-else>
                  <span class="list_time_updateTime" v-if="getcategoryIds != 2 && getcategoryIds != 10">{{ scope.row.updateTime }}</span>
              </div>
          </template>
        </el-table-column>

        <el-table-column label="大小"
                         align="center"
                         :sortable="!isSelectList"
                         prop="size"
                         width="80">
          <template slot-scope="scope">
            <div>
              {{$utils.handleFileSize(scope.row.docSize)}}
            </div>
          </template>
        </el-table-column>

        <el-table-column v-if="this.dataSource==='paper'"
                         label="底稿关联"
                         align="center"
                         min-width="270">
          <template slot-scope="scope">
            <div v-if="scope.row.docType === 0 && scope.row.indexPaper">
              <p v-for="(item, index) in scope.row.indexPaper"
                 :key="index"
                 @mouseover="indexPaperHover(item, scope.row)"
                 @click="paperIndexView(scope.row, item)"
                 :title="item.title"
                 class="paper_index_name">
                {{ item.docName }}
              </p>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作"
                         align="left"
                         min-width="90">
          <template slot-scope="scope">
            <div class="table_operation">
              <el-button type="text"
                         title="摘要"
                         v-if="scope.row.docType != 1 && !isSelectList"
                         @click="toogleExpand(scope.row)">摘要</el-button>
              <el-button type="text"
                         title="定位"
                         @click="docPositon(scope.row)">定位</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column type="expand"
                         width="1">
          <template slot-scope="scope">
            <el-form label-position="left"
                     inline
                     class="demo-table-expand">
              <div v-html="scope.row.highlightContent"></div>
            </el-form>
          </template>
        </el-table-column>
      </el-table>
      <div class="bottom_box_fixed">
        <div class="bottom_box"
             id="bottom_box">
          <div class="sel_total">
            <span v-show="getcategoryIds == 2 || getcategoryIds== 10">已选中 {{ selectedNum }} 项</span>
          </div>
          <el-pagination class="bottom_pagination"
                         background
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="pageNo + 1"
                         :page-sizes="[10, 20, 50, 100]"
                         :page-size="pageSize"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="tableDataTotal"
                         :pager-count="5"></el-pagination>
        </div>
      </div>
    </div>

    <!-- 备注 -->
    <remark :remarkIsShow="remarkIsShow"
            :remarkList="remarkList"
            @saveRemark="saveRemark"
            title="备注"
            :docData="reMarkData"
            @colseModule="remarkClose"></remark>
    <!-- 版本 -->
    <file-version :versionIsShow="versionIsShow"
                  :docVersionlist="docVersionlist"
                  :parentdata="selectedFile[0]"
                  :flag="dataSource"
                  :upload-disable="true"
                  @colseModule="versionClose"
                  @queryDoc="queryData"></file-version>
     <!-- 文件审批记录-没有回复 -->
    <approval-comment
        :approvalShow.sync="approvalShow"
        @updatainfo="updatainfo"
      @approvalSuccess='approvalSuccess'
        :approvalData="approvalData">
    </approval-comment>
    <!-- 节点审批 -->
    <audit-component
      :Auditco="Auditco"
      @ogVisible="ogVisible"
      @filejl="filejl"
      :fileDate="fileDate"
      :approvalRecordShow="approvalRecordShow"
      :approvalRecordObj="approvalRecordObj"></audit-component>
    <!-- 新建日程 -->
    <new-calendar :calend="calend" :calendardata="calendardata" @calende="calende"></new-calendar>

  </div>
</template>
<script>
// 备注
import remark from '@/components/file/remark';
// 设置提醒
import setRemindDialog from '@/pages/front/manuscriptmanage/SetRemindDialog';
// 文件审批
import docExam from '@/pages/front/projectlist/projectDoc/docExam';
// 目录审批
import catalogExam from '@/pages/front/projectlist/projectDoc/catalogExam';
// 批量编辑关联
import batchEditIndex from '@/pages/front/manuscriptmanage/batchEditIndex';
// 索引列表
import projectIndexLists from '@/pages/front/projectlist/projectDoc/projectIndexLists';
// 审批弹框
import approvalComment from "@/components/select_box/approvalComment";
// 节点审批
import AuditComponent from "@/pages/front/Lotus/Audit_component";
// 新建日程
import NewCalendar from "@/pages/front/maindesk/calendar/newcalendar";

export default {
  name: 'ApproveSearch',
  components: {
    remark,
    setRemindDialog,
    docExam,
    catalogExam,
    batchEditIndex,
    projectIndexLists,
    approvalComment,
    AuditComponent,
    NewCalendar
  },
  data() {
    return {
      approvers: false, // 当前登录人是否可审批
      title: '文件审批',
      getcategoryIds:'',
      subTitle: '文件审批搜索结果',
      success_code: 0,
      pageFrom: 'approve', // 从哪个页面过来的
      calend: false,
      calendardata: {
        u: [],
        c: [],
        p: {}
      },
      approvalRecordShow: false,
      approvalRecordObj: {},
      fileDate: {},
      Auditco: false,
      approvalShow: false,
      approvalData: {}, //审批弹框传值
      deleteDocList: [],
      selectedDir:[],
      selectedManaullyFile:[],
      versionIsShow: false, // 版本弹窗
      docVersionlist: [], // 版本数据
      hileUpload: true, // 隐藏版本弹窗中上传新版本及还原功能
      dataSource: '', // 数据来源：项目文档project、底稿paper
      docSource: '', // 文件源：项目文档 0， 底稿 1
      approvalId:'', // 审批id
      fileState: [],
      dirState: [],
      fileStatePaper: [
        // { value: 0, label: '有索引的' },
        // { value: 5, label: '无索引的' },
        { value: 2, label: '有备注的' },
        { value: 4, label: '有讨论的' },
        { value: 16, label: '有标签的' },
        { value: 7, label: '待审批' },
        { value: 8, label: '审批中' },
        { value: 14, label: '审批通过' },
        { value: 9, label: '节点审批通过' },
        { value: 10, label: '驳回未修改' },
        { value: 11, label: '驳回已修改' },
        { value: 12, label: '修订中' },
        { value: 13, label: '修订审批中' },
        { value: 1, label: '已选择' },
        { value: 15, label: '有关联的' },
        { value: 3, label: '有审批记录的' },
        { value: 6, label: '有设置提醒的' }
      ],
      fileTypes: [
        { value: 0, label: 'doc/docx' },
        { value: 1, label: 'pdf' },
        { value: 2, label: 'xls/xlsx' },
        { value: 3, label: 'txt' },
        { value: 4, label: 'png' },
        { value: 5, label: 'jpg/jpeg' }
      ],
      dirStatePaper: [
        { value: 0, label: '无文件' },
        { value: 1, label: '有文件' },
        { value: 3, label: '已选择' },
        { value: 4, label: '待审批' },
        { value: 5, label: '审批中' },
        { value: 6, label: '审批通过' },
        { value: 7, label: '已驳回' },
        { value: 2, label: '有讨论的' }
      ],
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
      checkSys: '',
      isPC: this.$store.state.isPC,
      pro_id: '', //请求接口默认必传数据
      userId: this.$store.state.loginObject.userId,
      projectMsg: this.$store.state.projectMsg.projectMsg, // 项目信息
      projectName: this.$store.state.projectMsg.projectMsg.name,
      pageNo: 0, //请求接口默认必传数据
      pageSize: 100, //请求接口默认必传数据
      tableDataTotal: 0,
      requestCode: {}, //所有请求的状态码
      fullsearchData: [], //列表数据
      intid:[],
      childrenDir:[],
      filenames:"",
      filenameschat:"",
      searchBtnDrop: true, // 检索展开状态
      btnGroupDrop: true, // 按钮组展开状态
      needDomElem: {}, // 所需dom元素
      tableHeight: 300, // 表格高度
      issearchCondition: {
        docName: '',
        docContent: '',
        auditProjectIds: '',
        suffixList: [],
        fileStatus: [],
        dirStatus: [],
        beginTime: '',
        endTime: '',

      }, // 查询条件
      issearchConditionfileTypes:[],
      issearchConditionfileState:[],
      issearchConditiondirState:[],
      projectStage: [], // 项目阶段
      orderFlag: '', // 表格排序规则
      fullsearchDataSel: [],
      addVersionData: {}, // 上传新版本选中文件数据
      versionVisible: false, // 版本弹框
      versionsData: [], //文件版本数据
      reMarkData: [], // 备注数据
      remarkIsShow: false, // 备注弹框
      remarkList: [], // 备注数据
      isShowSetRemind: false, // 提醒弹框
      chosefilelist: [], // 提醒数据
      docExamIsShow: false, // 文件审批弹框显示控制
      examTitle: '文件审批', // 文件审批弹框title
      docFlowChartData: {}, // 文件审批数据
      examType: 2, // 审批类型
      projectData: {}, // 当前项目信息
      catalogExamIsShow: false, // 目录审批弹框显示控制
      catalogFlowChartData: {}, // 目录审批弹框数据
      reviseFileArray: [], // 修订审批数据 需要过滤
      openBatchEditIndex: false, //是否显示批量编辑索引弹窗
      projectIndexData: {}, // 索引列表弹框数据
      projectIndexShow: false, // 索引列表弹框显示
      isSelectList: false, // 是否已选文件列表
      selectListData: { // 已选文件列表页面信息 前端分页
        pageNo: 1,
        pageSize: 100,
        tableDataTotal: 0
      },
      moreSearchBtnVisible: false,
      moreHandleBtnVisible: false,
      Sourceof:false
    }
  },
  watch:{
    subTitle(val){
      console.log(val)
    },
    isSelectList(val){
      console.log(this.$select.getSelectedData(this.selectType, this.approvalId))
      if(val){
        this.getSelectedData()
        var arr = []
        this.selectedFile.concat(this.selectedManaullyFile).forEach((it)=>{
           arr.push(it.id)
        })
        sessionStorage.setItem("pageFromddata",JSON.stringify(arr));
        this.queryData()
      }
    }
  },
  created() {
    this.success_code = this.code.codeNum.SUCCESS;
    this.requestCode = this.code.codeNum;
    let docData = JSON.parse(this.$route.query.item)
    this.Sourceof = docData.docSource == 1 || docData.docSource == 0 ? true : false
    this.fileDate = {
      chemsg: docData.username,
      currentgeneration:
        docData.financingTypeName == "" ||
        docData.financingTypeName == null ||
        docData.categoryId == 1
          ? "无"
          : docData.financingTypeName,
      Typesoffinancing:
        docData.projectStageName == "" || docData.projectStageName == null
          ? "无"
          : docData.projectStageName,
      Typeapproval:
        docData.categoryName == "" || docData.categoryName == null
          ? "无"
          : docData.categoryName,
      data: {
        row: docData
      }
    };
    console.log(this.fileDate)
    this.approver()
    this.getcategoryIds = this.fileDate.data.row.categoryId
    let getcategoryIds = this.fileDate.data.row.categoryId
    this.filenames  = (this.getcategoryIds == 2 || this.getcategoryIds == 10)?"文件":"目录"
    this.filenameschat  = (this.getcategoryIds == 2 || this.getcategoryIds == 10)?"文件/文件夹":"目录"
    this.title = getcategoryIds == 2?'文件审批':getcategoryIds == 10?'文件修订审批':getcategoryIds == 3?'目录审批':'目录修订审批'
    this.subTitle =`${this.title}搜索结果`
    this.docSource = docData.docSource == 2 ? 1: 0
    this.dataSource = docData.docSource == 2 ? 'paper' : 'project'
    this.approvalId = docData.id
    this.pro_id = docData.projectId
    this.pageFrom = sessionStorage.getItem('pageFrom')
    this.isSelectList =  !!this.$route.query.isSelectList || this.pageFrom==='search' || false;
    this.issearchCondition = JSON.parse(this.$route.query.searchData) || {};
    if (!this.isSelectList) {
      // this.fileState = this.dataSource === 'paper' ? this.fileStatePaper : this.fileStateProject
      this.fileState = this.fileStateProject
      this.dirState = this.dataSource === 'paper' ? this.mufile : this.dirStateProject
      this.issearchCondition.approvalId = this.approvalId
      this.issearchCondition.isSearch = true
      this.issearchCondition.reviw = '2'
      this.issearchCondition.parentIdList = []
    }
    this.issearchConditionfileTypes = this.issearchCondition.suffixList
    this.issearchConditionfileState = this.issearchCondition.fileStatus
    this.issearchConditiondirState = this.issearchCondition.dirStatus

    console.log(JSON.parse(this.$route.query.searchData) )
    console.log(12345, this.issearchCondition)
    if(!this.isSelectList){
       this.queryData()
    }
    this.getPageHeight()
    this.getProjectStage()
    this.getSelectedData()
  },
  mounted() {
    // window.addEventListener('resize', this.getPageHeight)
    window.onResize = () => {
      return (()=>{
        this.getPageHeight();
        this.isShowMoreSearchBtn()
      })()
    }
    this.getSelectedData()
    this.$Mit.watch({
      status:(res)=>{
          this.$Intel.message(this.selectedFile.map(item => {
            return {
              id: item.id,
              name: item.docName,
              size: item.docSize,
              type: item.type,
              docId: item.docId
            }
        }))
      }
    })
    this.needDomElem.tableBox = document.getElementById('table_box')
    this.needDomElem.searchBox = document.getElementById('search_box')
    this.needDomElem.btnGroupBox = document.getElementById('btn_box')
    this.needDomElem.fullSearchBox = document.getElementById('fullsearch')
    this.needDomElem.bottomBox = document.getElementById('bottom_box')
    this.isShowMoreSearchBtn()
    this.projectName = this.fileDate.data.row.projectName
  },
  beforeRouteLeave(to, from, next) {
    window.removeEventListener('resize', this.getPageHeight)
    to.meta.keepAlive = false
    next()
  },
  computed: {
    selectedNum() {
      return this.$store.state.selectedNum;
    },
    selectType() {
      //  return this.dataSource === 'project' ? 3 : 4
      return this.dataSource === 'project' ? 3 : (this.getcategoryIds == 3 || this.getcategoryIds == 11)?5:4
    },

  },
  methods: {
    isShowMoreSearchBtn(){//更多按钮是否展示
        let boxH = $('.search_box_left').height() + 16;
        let objH = $('.search-item-box').height();
        this.moreSearchBtnVisible = boxH < objH;
        let toolbarH = $('.btn_box').height() + 3;
        let toolbarAutoH = $('.toolbar_file_search').height();
        console.log('比较高度',toolbarH,toolbarAutoH)
        this.moreHandleBtnVisible = toolbarH < toolbarAutoH;
    },
    updatainfo(){
      this.queryData()
    },
    approvalSuccess(){
      this.clearSelection()
    },
    // 节点审批
    nodeApprove(state) {
      var row = JSON.parse(this.$route.query.item);
      this.queryApprovalFiles(row);
      this.Auditco = true;
    },

    // 查询意见
    queryApprovalFiles(item) {
      let obj = {
        data: { approvalId: item.id },
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId,
        projectId: item.projectId
      };
      this.$post("/info/audit/getPendingFileList", obj).then(res => {
        // console.log(res, "查询审核的文件");
        if (!res || res.code !== 0) {
          this.$message.error(res.msg || '系统异常')
          return;
        }
        // 查询接口调用出来的审批的文件信息
        this.approvalRecordObj.attach = res.data;
        this.approvalRecordObj.approvalId = item.id;
        this.approvalRecordObj.docSource = item.docSource;
        this.approvalRecordObj.sourceName = '主工作台-我的审批-审批-审批记录'
        // console.log(this.approvalRecordObj, "审核记录的传值");
      });
    },
    // 节点审批弹窗回调
    ogVisible(val) {
      if (val.data != undefined) {
        if (val.data != 1) {
          let catItem = val.data;
          catItem.submiter.originData = true;
          catItem.submiter.uniqueKey = "user" + catItem.submiter.id;
          catItem.submiter.userId = catItem.submiter.id;
          // 发起人
          calendardata.u = [catItem.submiter];
          // 抄送人
          calendardata.c = [
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
            p: catItem.projectId,
            n: catItem.projectName
          };
        }
        this.Auditco = val.s;
        this.calend = val.d;
      }
    },
    filejl(val) {
      this.filejlval = { v: val, s: true };
    },
    calende(val) {
      this.calend = val.s;
    },
    // 当前人是否可以审批
    approver() {
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
          if (this.success_code !== res.code) {
            this.$message.error(res.msg);
            return
          }
          this.approvers = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getSelectedData(){
      let setoreData = this.$select.getSelectedData(this.selectType, this.approvalId)
      this.selectedFile = setoreData.file
      this.selectedDir = setoreData.dir
      this.selectedManaullyFile = setoreData.manaullyFile
      this.childrenDir = setoreData.childrenDir
    },
      versionClick() {
        this.getSelectedData()

        if(!this.selectedFile.length){
          this.$message.warning("请选择文件后点击版本");
          return;
        }
        if (this.selectedFile.length > 1) {
          this.$message.warning('请选择单个文件后点击版本');
          return;
        }

        var send_data = {
          paperFlag:!this.Sourceof,
          sourceName:`我的审批-${this.getcategoryIds == 2?'文件':this.getcategoryIds == 10?'文件修订':this.getcategoryIds == 3?'目录':'目录修订'}审批-版本`,
          projectName:this.projectName, //项目名称，记录日志用
          data: {
            docId: this.selectedFile[0].docId,
            docName:this.selectedFile[0].docName,
            parentId:this.selectedFile[0].parentId
          }
        };
        let url = this.dataSource === 'project' ? '/doc/project/getDocVersionList' : '/doc/paper/getDocVersionList'
        this.$post(url, send_data)
        .then((response)=> {
          if (this.success_code !== response.code) {
            this.$message.error(response.msg);
            return
          }
          this.docVersionlist = response.data;
          this.versionIsShow = true;
        }, err=>{
          this.$message.error('网络异常');
        })
    },
    versionClose() {
        this.versionIsShow = false;
        this.clearSelection()
    },

    // 已选文件列表切换
    toSelectList() {
      this.getSelectedData()
      if(!this.selectedFile.length){
        this.$message.warning('当前无选中文件')
        return
      }
      sessionStorage.setItem('pageFrom','search')
      this.pageFrom = 'search'
      this.selectListData = [...this.selectedFile]
      this.isSelectList = true;
      this.selectListData.pageNo = 1
      this.selectListData.pageSize = 100
      this.selectListData.tableDataTotal = 0
      this.issearchCondition.fileStatus = [1]
      this.queryData();
    },
    // 文件审批意见按钮
    approvalHandle() {
      this.getSelectedData()
      var data
      if(this.getcategoryIds == 2 || this.getcategoryIds == 10){
         if(!this.selectedFile.length){
          this.$message.warning('当前无选中文件')
          return
        }
        let arr = this.selectedFile.map(v => { return { docId: v.docId, parentId: v.parentId } })

        this.handleApprovalComments(arr)

      }else{
        if (!this.selectedDir || !this.selectedDir.length) {
          this.$message.error("当前无选中目录");
          return;
        }

        let arr = this.selectedDir.map(item=> {
          return {
            docId: item.id,
            parentId: item.parentId
          }})

        this.handleApprovalComments(arr)

      }
    },

    // 文件审批意见按钮
    handleApprovalComments(arr) {
       let commentData = {
            docSource: this.Sourceof ? 1 : 2, // 来源
            attach: JSON.stringify(arr), //审核的文件id
            projectId: this.rowprojectId,
            isDir:(this.getcategoryIds == 2 || this.getcategoryIds == 10)?false:true,
            // sourceName:`我的审批-${this.getcategoryIds == 2 || this.getcategoryIds == 10? '文件' : '目录'}审批-${this.getcategoryIds == 2 || this.getcategoryIds == 10? '文件' : '目录'}审批意见页`
            sourceName:`我的审批-${this.getcategoryIds == 2?'文件':this.getcategoryIds == 10?'文件修订':this.getcategoryIds == 3?'目录':'目录修订'}审批-${this.getcategoryIds == 2?'文件':this.getcategoryIds == 10?'文件修订':this.getcategoryIds == 3?'目录':'目录修订'}审批意见页`,
      };
      this.$store.commit("approvalCommentsFn", commentData);

    },

    // 文件审批
    fileApprove(procTypeId) {
      this.getSelectedData()
      let selectedDir = []
       if(this.getcategoryIds == 2 || this.getcategoryIds == 10){
         selectedDir = this.selectedFile
       }else{
         selectedDir = this.selectedDir
       }
       if(!selectedDir.length){
          this.$message.warning(`当前无选中${this.filenames}`)
          return
        }
      // 单个文件和多个文件区分弹框
      if(this.approvers){
         if (selectedDir.length == 1 && !selectedDir[0].isCheck) {
          if (selectedDir[0].auditStatus == 0 || selectedDir[0].auditStatus == 1 || selectedDir[0].auditStatus == 6) {
            this.$message.error(`该${this.filenames}` + selectedDir[0].auditStatusText  + `,无法再进行审批`)
          }
          if(selectedDir[0].auditStatus == 2 && !selectedDir[0].showInitStatus){
            this.$message.error(`该${this.filenames}已被其他节点驳回,无法再进行审批`)
          }
          if(this.getcategoryIds != 2 && this.getcategoryIds != 10){
            if(selectedDir[0].auditStatus == 4){
              this.$message.error(`请先选择可审批的目录`)
            }
          }
          return
        }
      }
     if (selectedDir.length > 1) {
       if(this.approvers){
           this.$confirm(this.getcategoryIds == 2 || this.getcategoryIds == 10?`已在其他审批中进行/审批通过的文件不能再进行审批，进行审批时将自动过滤。源文件及索引文件进行审批时，所有审批意见及审批状态将进行同步?`:'已在其他审批中进行/审批通过的目录和本次未提审的待审批目录不能进行审批，进行审批时将自动过滤', '审批确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            dangerouslyUseHTMLString: true,
            distinguishCancelAndClose: true
          }).then(() => {
            let approvalOk = []
            selectedDir.forEach(v => {
                if (v.isCheck) {
                  approvalOk.push(v)
                }
              })
            if (approvalOk.length) {
                this.goToApproval(approvalOk)
                return
              }
              this.$message.error('请先选择可审批的文件')
            }).catch(action => {
          });
          return
        }else{
          var arr = [];
          selectedDir.forEach(item => {
              arr.push({
                docId: item.id,
                parentId: item.parentId
              });
          });
            let commentData = {
            docSource: this.Sourceof ? 1 : 2, // 来源
            attach: JSON.stringify(arr), //审核的文件id
            projectId: this.rowprojectId,
            isDir:(this.getcategoryIds == 2 || this.getcategoryIds == 10)?false:true,
            sourceName:`我的审批-${this.getcategoryIds == 2?'文件':this.getcategoryIds == 10?'文件修订':this.getcategoryIds == 3?'目录':'目录修订'}审批-${this.getcategoryIds == 2?'文件':this.getcategoryIds == 10?'文件修订':this.getcategoryIds == 3?'目录':'目录修订'}审批意见页`,
          };
          this.$store.commit("approvalCommentsFn", commentData);
          return
        }
      }
      this.goToApproval(selectedDir)
    },
    // 去审批
    goToApproval (fileList) {
        if (fileList.length == 1) {
          var docName = fileList[0].docName
        }
        let files = [];
        fileList.forEach(v => {
          let obj = {};
          obj.docId = (this.getcategoryIds == 2 || this.getcategoryIds == 10)?v.docId:v.id;
          obj.docName = v.docName;
          obj.parentId = v.parentId;
          obj.docVersionNumber = v.docVersionNumber;
          files.push(obj);
        });
        let docData = JSON.parse(this.$route.query.item)
        this.approvalData = {
            title: fileList.length ==  1 ?`${this.filenames}审批` : `${this.filenames}审批意见`,
            fileList: files,
            selectData: fileList.map(v =>(this.getcategoryIds == 2 || this.getcategoryIds == 10)?v.docId:v.id),
            findComment: fileList.length ==  1 ? false : true,
            docName: docName || fileList[0].docName,
            approvalId: this.approvalId, // 审核id
            getcategoryId:this.getcategoryIds,
            taskDefKey: docData.taskDefKey, //当前审核节点所处标识
            taskId: docData.taskId,
            selectType: this.selectType,
            Approvers:this.approvers
        }
        console.log(this.selectType, 'this.selectType',this.getcategoryIds)
      this.getCommentData()
        // this.approvalShow = true
    },
     getCommentData () {
      let  obj = {
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId,
        projectId: this.pro_id,
        data:{
          docIdList: this.approvalData.selectData,//文件id的集合
          approvalId: this.approvalData.approvalId
        }
      }
      this.$post(this.getcategoryIds == 2 || this.getcategoryIds == 10?'/info/audit/findApprovalRecordByFileids':'/info/audit/findApprovalRecordByDirids', obj).then(res => {
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
    // 底稿关联路径
    indexPaperHover(item, row) {
      this.$post('/doc/paper/queryPaperParent', {
        data: {
          id: item.id
        }
      }).then(res => {
        if (this.requestCode.SUCCESS != res.code) {
          this.$message.error(res.msg);
          return
        }
        for (let i = 0; i < this.fullsearchData.length; i++) {
          if (this.fullsearchData[i].id == row.id) {
            for (let j = 0; j < this.fullsearchData[i].indexPaper.length; j++) {
              if (this.fullsearchData[i].indexPaper[j].id === item.id) {
                this.$set(this.fullsearchData[i].indexPaper[j], 'title', res.data.reverse().join(' / '));
              }
            }
          }
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 保存备注
    saveRemark(content) {
      this.$post('/doc/project/addNotes', {
        data: {
          sourceFlag: this.dataSource==='project' ? 0 : 1, //项目文档固定为0，底稿为1
          content,
          needFileList: this.selectedFile.map(v => {
            return {
              docId: v.docId,
              fileId: v.id
            };
          })
        }
      })
        .then(res => {
          if (this.requestCode.SUCCESS != res.code) {
            this.$message.error(res.msg);
            return;
          }
          this.remarkIsShow = false;
          this.$message.success(res.msg);
          this.clearSelection()
        })
        .catch(err => { console.log(err) });
    },
    // 备注按钮
    remarkClick() {
      this.getSelectedData()
      this.reMarkData = [...this.selectedFile]
      // 此处调试还要修改
      if (this.reMarkData.length == 0) {
        this.$message.warning('请选择文件');
        return;
      }
      if (this.reMarkData.length == 1) {
        this.$post('/doc/project/queryNoteByFileId', {
          sourceName:`我的审批-${this.getcategoryIds == 2?'文件':this.getcategoryIds == 10?'文件修订':this.getcategoryIds == 3?'目录':'目录修订'}审批-备注`,
          projectName:this.projectName, //项目名称，记录日志用
          paperFlag: !this.Sourceof,
          data: {
            sourceFlag: 1,
            docId: this.reMarkData[0].docId
          }
        })
          .then(res => {
            if (res.code != this.requestCode.SUCCESS) {
              this.$message.error(res.msg);
              return;
            }
            this.remarkList = res.data;
            this.remarkIsShow = true;
          })
          .catch(err => {
            console.log(err);
          });
          return
      }

      this.remarkIsShow = true;
    },
    // 备注弹框关闭
    remarkClose() {
      this.remarkIsShow = false;
      this.queryData();
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
        if(res.data.filter(v=>v.projectId == this.fileDate.data.row.projectId) == ""){
           this.$message.warning("需为该项目成员/对应项目可访问权限方可进行讨论");
           return
        }
      this.getSelectedData()
      let selected
      if(this.getcategoryIds == 2 || this.getcategoryIds == 10){
        selected = [...this.selectedManaullyFile, ...this.selectedDir]
      }else{
        selected = this.selectedDir
      }

      console.log('selected', selected, this.pro_id)
      if (!selected.length || selected.length>1) {
        this.$message.warning(`请选择单个${this.filenameschat}进行讨论`);
        return;
      }
      let data = Object.assign({},selected)
      // 修改项目聊天的项目id
      this.$store.commit("chatProjectFn", data[0].projectId || this.pro_id);
      this.dataSource === 'paper' && (data[0].paperId = selected[0].id)
      this.$router.push({
        path: '/projecchat',
        query: {
          docData: JSON.stringify(data[0]),
          prePro : true
        }
      });
      }).catch(error => {
        console.log(error);
      });
    },
    // 下载
    downloadFn() {
      this.getSelectedData()
      let selected = [...this.selectedManaullyFile, ...this.selectedDir,...this.selectedFile]
      if (!selected.length) {
        this.$message.warning(`请选中${this.filenames}后点击下载`)
        return;
      }
      let arr = []
      if(this.isPC) {
        let pcArr = this.$utils.uniqBy(selected,'id')
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
            sourceName: `我的审批-${this.getcategoryIds == 2?'文件':this.getcategoryIds == 10?'文件修订':this.getcategoryIds == 3?'目录':'目录修订'}审批`,
            projectName: this.$store.state.projectMsg.projectMsg.name,
            paperFlag: !this.Sourceof, // Sourceof false为底稿
            approvalId: this.approvalId
          };
        });
        this.$store.commit("download", downloadArr);
        this.clearSelection()
        return
      }
      arr = selected.map(item => {
         return {
           name: item.docName,
            id:item.rfsId != null?item.docId:item.id,
            parentId: item.parentId,
            rfsId:item.rfsId != null?item.rfsId:'',
            fileName: item.docName,
            docType:item.rfsId != null?0:1,
            docId:item.docId
         }
      });

       if(this.selectedManaullyFile.length == 1 && this.selectedDir.length == 0){
        let obj = {};
        let peon = arr.reduce((cur,next) => {
            obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
            return cur;
        },[]) //设置cur默认类型为数组，并且初始值为空的数组
        this.$store.commit("download", peon)
        this.clearSelection()
        return
      }
      this.$store.commit("export", {
            url: "/rfs/files/downloadDocsZipForApproval",
            data: {
              projectName: this.projectName,
              source: this.docSource,
              random: Math.random(),
              files: arr
            }
          })

      this.clearSelection()
    },
    // 取消选择
    clearSelection(type) {
      if(this.isSelectList){
        // this.fullsearchData = []
      }
      // 取消table的选中状态
      this.$refs.table.clearSelection()
      // 清空存储的数据
      this.$select.clearSelection(this.selectType, this.approvalId)
      type && this.$message.success("取消选择成功");
    },
    // 点击全选复选框
    handleSelectAll(selection) {
      //  this.displaySelected()
    //  this.$select.updateStatus(this.selectType, this.pro_id, this.approvalId)
      selection.length
        ? this.$select.handleFileSelect(this.selectType, this.pro_id, this.approvalId, selection)
        : this.$select.handleCancel(this.selectType, this.pro_id, this.approvalId, this.fullsearchData);
    },
    // 点击单条复选框
    handleSelectDoc(selection, row) {
      //  this.displaySelected()
      // this.$select.updateStatus(this.selectType, this.pro_id, this.approvalId)
      this.$select.fileSelect(this.selectType, this.pro_id, this.approvalId, selection, row, this.displaySelected);
    },
    // 关联选中、取消选中（适用于搜索结果页）
    relatedSelect (res, selection) {
      res.forEach(v => {
        let idx = this.fullsearchData.findIndex(m => m.id === v)
        this.$nextTick(() => {
          idx > -1 && this.$refs.table.toggleRowSelection(this.fullsearchData[idx], selection);
        })
      })
    },
    // 导出功能
    exportClick() {
      this.getSelectedData()
      console.log(this.$select.getSelectedData(this.selectType, this.approvalId))
      if (this.selectedFile == "" && this.selectedDir == "" ) {
        this.$message.warning(`当前无选中${this.filenames}，请选择您要导出的${this.filenames}`);
        return
      }
      this.$store.commit('export', {url:'/doc/paper/ViewExport', data: {
          fileName: this.projectName,
          projectId: this.pro_id,
          source: this.dataSource === 'project' ? 2 : 1, //1底稿2项目文档
          files: this.selectedFile .map(v=>v.id).join(','),
          dirs: this.selectedDir.map(v=>v.id).join(',')
        }
      })
    },
    // 表格排序方法
    tableSort(column) {
      if (column.order != null) {
        let order = column.order;
        switch (column.prop) {
          case 'docName':
            this.orderFlag = order == 'ascending' ? 5 : 6;
            break;
          case 'size':
            this.orderFlag = order == 'ascending' ? 3 : 4;
            break;
          case 'modifyTime':
            this.orderFlag = order == 'ascending' ? 1 : 2;
            break;
          default:
            this.orderFlag = '';
        }
        this.queryData();
      }

    },
    displaySelected() {
      // console.log('this.fullsearchData',this.fullsearchData, this.approvalId)
      this.$select.handleDisplaySelection(this.selectType, this.pro_id, this.approvalId, this.fullsearchData,(this.getcategoryIds == 2 || this.getcategoryIds == 10)?false:true).then(res => {
        // console.log('display-res', res)
        this.fullsearchData.forEach(t => {
          let idx = res.findIndex(m => m === t.id)
          this.$refs.table.toggleRowSelection(t, idx > -1);
        })
      })
    },
    queryData() {
      this.getSelectedData()
      // if (this.isSelectList) {
        // let tableData = this.getTableData(this.selectListData.pageNo, this.selectListData.pageSize, this.$select.getSelectedData(this.selectType, this.approvalId).file);
        // this.fullsearchData = tableData.data;
        // this.selectListData.tableDataTotal = tableData.length;
        // this.laber(this.fullsearchData);
        // this.dataSource === 'paper' && this.filePath(this.fullsearchData);
        // this.fullsearchData.map(item => {
        //   item.keyContenthHight = '40px'
        //   this.iconFilter(item)
        // })
        // // 回显已选数据
        // this.displaySelected()
        // return
        // console.log(JSON.parse(sessionStorage.getItem("pageFromddata")))
      // }
      // console.log(this.searchCondition)
      // console.log(this.$select.getSelectedData(this.selectType, this.approvalId))
      this.issearchCondition.orderFlag = this.orderFlag
      this.issearchCondition.fileStatus.forEach((item)=>{
        if(item == 1){ // 所有的文件
          (this.selectedFile.concat(this.selectedManaullyFile)).forEach((it)=>{
             this.intid.push(it.id)
          })
        }
      })
      this.issearchCondition.dirStatus.forEach((item)=>{
        if(item == 3){ // 所有的文件夹
          this.selectedDir.forEach((it)=>{
             this.intid.push(it.id)
          })
        }
      })
      if (this.isSelectList) {
        this.intid = JSON.parse(sessionStorage.getItem("pageFromddata"))
        this.issearchCondition.fileStatus = [1]
      }
      var arrinfos = Array.from(new Set(this.intid))
      let p =Object.assign({},this.issearchCondition)
      let url = this.dataSource === 'project'
        ? '/info/audit/getPengdingFileForList'
        : (this.getcategoryIds == 3 || this.getcategoryIds == 11)?"/info/audit/getPengdingDirForPaper":"/info/audit/getPengdingFileForPaper"
      this.$post(url, {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
          sourceName:"我的审批-文件审批-文件审批搜索结果", //页面位置，记录日志用
          projectName: this.projectName, //项目名称，记录日志用
 //项目名称，记录日志用
        data:
        {
          approvalId: this.approvalId,
          docName: p.docName,
          docContent: p.docContent,
          auditProjectIds: p.auditProjectIds ? [p.auditProjectIds] : [],
          suffixList: p.suffixList,
          fileStatus: p.fileStatus,
          dirStatus: p.dirStatus,
          beginTime: p.beginTime && (p.beginTime + ' 00:00:00'),
          endTime:  p.endTime && (p.endTime+' 23:59:59'),
          orderFlag: p.orderFlag,
          isSearch: true,
          reviw: 2,
          parentIdList: [],
          idSet:arrinfos,
        }
      })
        .then(res => {
          if (this.requestCode.SUCCESS != res.code) {
            this.$message.error(res.msg)
            return
          }
          this.intid = []
          this.tableDataTotal = res.data.totalElements;
          this.fullsearchData = res.data.content;
          this.laber(this.fullsearchData);
          this.dataSource === 'paper' && this.filePath(this.fullsearchData);
          this.fullsearchData.map(item => {
            item.keyContenthHight = '40px'
            this.iconFilter(item)
          })
          // 回显已选文件
          this.displaySelected()

        })
        .catch(error => {
          console.log(error)
        })
    },
    // 请求项目阶段
    getProjectStage() {
      this.$post('/info/project/getImplementStageList', {
        data: {
          projectId: this.pro_id
        }
      })
        .then(res => {
          if (res.code != this.requestCode.SUCCESS) {
            this.$message(res.msg)
            return
          }
          this.projectStage = res.data
        })
        .catch(err => { })
    },
    // 目录状态选择
    dirStateChangeData(arr) {
      this.issearchCondition.dirStatus = arr.map(v => v.value)
    },
    // 文件状态选择
    fileStateChangeData(arr) {
      this.issearchCondition.fileStatus = arr.map(v => v.value)
    },
    // 文件类型选择
    fileTypesChangeData(arr) {
      this.issearchCondition.suffixList = arr.map(v => v.value)
    },
    // 按钮组展开收起
    btnBoxToggle(val) {
      this[val] = !this[val]
      this.getPageHeight()
    },
    // 计算页面高度
    getPageHeight() {
      this.$nextTick(() => {
        try {
          let pageHeight =
            document.documentElement.clientHeight || document.body.clientHeight
          this.tableHeight =
            pageHeight - this.needDomElem.btnGroupBox.clientHeight - 120
          this.needDomElem.fullSearchBox.style.height = `${pageHeight - 150}px`
          this.needDomElem.bottomBox.style.width = `${this.needDomElem.tableBox.clientWidth}px`
        } catch (err) { }
      })
    },
    // 分页器每页显示改变
    handleSizeChange(val) {
      // if (this.isSelectList) {
        // this.selectListData.pageSize = val;
        this.pageSize = val;
        this.pageNo = 0
      // } else {
      //   this.pageSize = val;
      //   this.pageNo = 0;
      // }
      this.queryData()
    },
    // 切换页码
    handleCurrentChange(val) {
      // if (this.isSelectList) {
      //   this.selectListData.pageNo = val;
      // } else {
        this.pageNo = val - 1;
      // }
      this.queryData()
    },
    back() {
      // 如果当前是已选文件列表页：根据pageFrom判断返回搜索结果或是文件审批页
      if(this.isSelectList && this.pageFrom === 'search') {
        this.isSelectList = false
        this.pageSize=100
        this.pageNo = 0
        this.tableDataTotal = 0
        this.issearchCondition.fileStatus = []
        this.queryData()
        return
      }
      // 如果是搜索结果页，直接返回文件审批页
      // this.$router.go(-1)
      this.$router.push({
          path: "/Filepage",
          query:{
            item: this.$route.query.item,
            path: this.$route.query.paths,
          }
      });
    },
    // 重置
    resetFn() {
      for (let key in this.issearchCondition) {
        if (
          typeof this.issearchCondition[key] == 'string' ||
          typeof this.issearchCondition[key] == 'number'
        ) {
          this.issearchCondition[key] = ''
        } else {
          this.$refs[key].clearSel()
        }
      }
      this.issearchCondition.approvalId = this.approvalId
      this.issearchCondition.isSearch = true
      this.issearchCondition.reviw = '2'
      this.issearchCondition.parentIdList = []
      // this.$forceUpdate();
    },
    dblclickFn(itemValue, event, column) {
      //双击每条数据
      // todo 预览权限
      // if (!rightSysPermissionFn(this.pro_id, 'paper_file_file_preview')) {
      //   this.$message.warning('当前无权限')
      //   return
      // }
      if(column.type==="selection") return
      if (itemValue.docType == 0) {
        var previewData = {
          projectId: this.pro_id,
          rfsId: itemValue.rfsId,
          docId: itemValue.docId,
          photoType: itemValue.type,
          docName: itemValue.docName,
          projectName: this.projectName,
          sourceType: this.Sourceof?'projectDoc':"manuscriptmanage",
          docName: itemValue.docName,
          sourceName:`我的审批-${this.getcategoryIds == 2?'文件':this.getcategoryIds == 10?'文件修订':this.getcategoryIds == 3?'目录':'目录修订'}审批`
        }
        this.$store.commit('previewAllFn', previewData)
      }

    },
    toogleExpand(row) {
      let $table = this.$refs.table
      this.fullsearchData.map(item => {
        if (row.id != item.id) {
          $table.toggleRowExpansion(item, false)
        }
      })
      $table.toggleRowExpansion(row)
    },
    docPositon(row) {
      // 项目文档定位
      if(this.dataSource === 'project') {
        this.docLocationBtn(row)
        return
      }
      //底稿定位
      this.$post('/info/audit/positionFileForPaper ', {
        data: {
          "fileList": [{
            "docId": row.rfsId != null?row.docId:row.id,
            "parentId":row.parentId
          }],
          "projectId":this.fileDate.data.row.projectId,
          "approvalId": this.fileDate.data.row.id,
          "docType": row.rfsId != null?0:1,
        },
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId,
	      "projectId":this.fileDate.data.row.projectId,
	      "pageSize": 100
      }).then(res => {
        if (this.requestCode.SUCCESS !== res.code) {
          if (this.requestCode.RESULT_EMPTY == res.code) {
            this.$message.error(res.msg)
            return
          } else {
            this.$message.error(res.msg)
            return
          }
        }
        this.handleLoacationData(res.data, row)
      })
        .catch(error => { })
    },
    docLocationBtn(item){
        var data = {
            data: {
            "fileList": [{
              "docId": item.rfsId != null?item.docId:item.id,
              "parentId":item.parentId
            }],
            "projectId":this.fileDate.data.row.projectId,
            "approvalId": this.fileDate.data.row.id,
             "docType": item.rfsId != null?0:1
          },
          token: this.$store.state.loginObject.userToken,
          userId: this.$store.state.loginObject.userId,
          "projectId":this.fileDate.data.row.projectId,
          "pageSize": 100
        }
        // console.log(item, 66666)
        this.$post("/info/audit/positionFileForProject", data)
          .then( (response)=> {
            var data =  response.data;
            console.log(response, this.success_code)
            if (this.success_code == response.code) {
              this.handleLoacationData(response.data, item)

            } else if(response.code == -1002){
                this.$message.error('文件已被删除')
            } else {
                this.$message.error(response.msg)
            }
        })
        .catch(function (error) {

        });
    },
    handleLoacationData(resData, item){
      // console.log(1234566777, resData, item)
      this.$router.push({
          path: "/Filepage",
          query:{
            file:JSON.stringify(item),
            item: this.$route.query.item,
            locationData: JSON.stringify(resData),
            path: this.$route.query.paths,
            dwispc:false
          }
      });
    },
    filePath(val) {
      console.log(val)
      this.$post('/doc/project/link/docPath', {
        data: {
          paperIdSet: Array.isArray(val) ? val.map(v => v.id) : [val.id]
        }
      }).then(res => {
        if (res.code != 0) {
          this.$message.error(res.msg);
          return;
        }
        Object.keys(res.data.docPaper).forEach(id => {
          this.fullsearchData.forEach(item => {
            id == item.id && this.$set(item, 'fullPath', res.data.docPaper[id].reverse().join(' / '));
          })
        })
      }).catch(err => { console.log(err) })
    },
    // 文件状态
    laber(val) {
      let url = this.dataSource === 'project' ? '/doc/project/docStatusAll':'/doc/paper/docStatusAll'
      this.$post(url, {
        data: {
          idSet: Array.isArray(val) ? val.map(v => v.id) : [val.id],
          projectId: this.pro_id
        }
      }).then(response => {
        if (response.code == -503) {
          return
        }
        if (response.code != 0) {
          this.$message.error(response.msg);
          return;
        }
        Object.keys(response.data).forEach(id => {
          this.fullsearchData.forEach(item => {
            if (id == item.id) {
              let resItem = response.data[id];
              this.$set(item, 'icon', resItem.paperLabelList);
              this.$set(item, 'indexPaper', resItem.linkList);
              // 0:待审核/1:审批通过/2:驳回未修改/3:节点审批通过/4:待审批/5:驳回已修改/6:修订审批中/7:修订中/8:已归档
              // this.$set(item, 'auditStatus', resItem.auditStatus);
              this.$set(item, 'notes', resItem.notes); // 是否有备注信息
              this.$set(item, 'reminder', resItem.reminder); // 是否有文件提醒
              this.$set(item, 'lockState', resItem.lockState); // 是否有锁
              this.$set(item, 'record', resItem.record); // 是否有审批意见
              // this.$set(item, 'isShowIcon', true); // 防止图标闪烁
            }
          })
        })
      }).catch(err => {
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
      console.log(arguments, 'arguments')
      const { length } = totalData;
      const tableData = {
        data: [],
        page,
        pageSize,
        length,
      };
      if (pageSize >= length) { // pageSize大于等于总数据长度，说明只有1页数据或没有数据
        tableData.data = totalData;
        tableData.page = 1;// 直接取第一页
      } else { // pageSize小于总数据长度，数据多余1页
        const num = pageSize * (page - 1);// 计算当前页（不含）之前的所有数据总条数
        if (num < length) { // 如果当前页之前所有数据总条数小于（不能等于）总的数据集长度，则说明当前页码没有超出最大页码
          const startIndex = num;// 当前页第一条数据在总数据集中的索引
          const endIndex = num + pageSize - 1;// 当前页最后一条数据索引
          tableData.data = totalData.filter((_, index) => index >= startIndex && index <= endIndex);// 当前页数据条数小于每页最大条数时，也按最大条数范围筛取数据
        } else { // 当前页码超出最大页码，则计算实际最后一页的page，自动返回最后一页数据
          const size = parseInt(length / pageSize); // 取整
          const rest = length % pageSize; // 取余数
          if (rest > 0) { // 余数大于0，说明实际最后一页数据不足pageSize，应该取size+1为最后一条的页码
            tableData.page = size + 1;// 当前页码重置，取size+1
            tableData.data = totalData.filter((_, index) => index >= (pageSize * size) && index <= length);
          } else if (rest === 0) { // 余数等于0，最后一页数据条数正好是pageSize
            tableData.page = size;// 当前页码重置，取size
            tableData.data = totalData.filter((_, index) => index >= (pageSize * (size - 1)) && index <= length);
          } // 余数不可能小于0
        }
      }
      return tableData;
    },
    iconFilter(itemValue) {
      //过滤重命名的icon
      if (itemValue.docType == 1) {
        itemValue.fileIcon = require('../../common/fileIcon/FolderType1.png')
      } else {
        var hz_name = itemValue.type.toLowerCase();
        if (hz_name == 'doc' || hz_name == 'docx' || hz_name == 'rtf') {
          itemValue.fileIcon = require('../../common/fileIcon/DocType.png')
        } else if (
          hz_name == 'xls' ||
          hz_name == 'xlsx' ||
          hz_name == 'excel'
        ) {
          itemValue.fileIcon = require('../../common/fileIcon/XlsType.png')
        } else if (
          hz_name == 'ppt' ||
          hz_name == 'pptx' ||
          hz_name == 'pps' ||
          hz_name == 'ppsx' ||
          hz_name == 'ppsm'
        ) {
          itemValue.fileIcon = require('../../common/fileIcon/PptType.png')
        } else if (
          hz_name == 'jpg' ||
          hz_name == 'jpeg' ||
          hz_name == 'gif' ||
          hz_name == 'bmp' ||
          hz_name == 'png'
        ) {
          itemValue.fileIcon = require('../../common/fileIcon/ImgType.png')
        } else if (
          hz_name == 'wmv' ||
          hz_name == 'avi' ||
          hz_name == 'dat' ||
          hz_name == 'asf' ||
          hz_name == 'rm' ||
          hz_name == 'rmvb' ||
          hz_name == 'mpg'
        ) {
          itemValue.fileIcon = require('../../common/fileIcon/VideoType.png')
        } else if (
          hz_name == 'mpeg' ||
          hz_name == 'mkv' ||
          hz_name == 'dvix' ||
          hz_name == 'dv' ||
          hz_name == 'flv' ||
          hz_name == 'mov' ||
          hz_name == 'mp4' ||
          hz_name == 'qt' ||
          hz_name == 'smil' ||
          hz_name == 'swf' ||
          hz_name == 'wmv' ||
          hz_name == '3gp'
        ) {
          itemValue.fileIcon = require('../../common/fileIcon/VideoType.png')
        } else if (
          hz_name == 'mp3' ||
          hz_name == 'wav' ||
          hz_name == 'wma' ||
          hz_name == 'mid'
        ) {
          itemValue.fileIcon = require('../../common/fileIcon/MusicType.png')
        } else if (hz_name == 'pdf') {
          itemValue.fileIcon = require('../../common/fileIcon/PdfType.png')
        } else if (hz_name == 'indd') {
          itemValue.fileIcon = require('../../common/fileIcon/indd.png')
        } else if (hz_name == 'ai') {
          itemValue.fileIcon = require('../../common/fileIcon/ai.png')
        } else if (hz_name == 'psd') {
          itemValue.fileIcon = require('../../common/fileIcon/ps.png')
        } else if (hz_name == 'tif') {
          itemValue.fileIcon = require('../../common/fileIcon/tiff.png')
        } else if (hz_name == 'zip' || hz_name == 'rar') {
          itemValue.fileIcon = require('../../common/fileIcon/RarType.png')
        } else {
          itemValue.fileIcon = require('../../common/fileIcon/other.png')
        }
      }
    }

  }
}
</script>
<style lang="scss" scoped>

.clinc{
    display: inline-block;
    width:200px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
}
.approve-search {
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
      justify-content: space-between;
      padding-right: 15px;
      line-height: 60px;
      /deep/ .back_icon {
        border: none;
      }
      .title_msg {
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
      .btn_drop {
        margin: 16px 21px 0 0;
        /deep/ .el-button {
          // height: 24px;
          // width: 80px;
          // padding: 6px 15px;
          height: 26px;
          width: 50px;
          padding:5px 5px;
          border-radius: 4px;
        }
        .drop_icon {
          font-size: 10px;
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
          max-width: -moz-calc(100% - 360px);
          max-width: -webkit-calc(100% - 360px);
          max-width: calc(100% - 360px);
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
            .el_wide{
              float: left;
            }
            /deep/ .el-input[class~='el_wide'],
            .el-select[class~='el_wide'] {
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
              color:white;
              background: #0061a9;
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
        background: url('../../../assets/manuscript_icon/positioning_icon.png')
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

          $imgUrl: '../../../assets/project_doc/';
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
          // 表格内图片图标
          .auditStatus_z {
            background: url($imgUrl+'shenpizhong.png') no-repeat 0% 0%/40px 17px;
            width: 40px;
          }

          .auditStatus_dsp {
            background: url($imgUrl+'daishenpi.png') no-repeat 0% 0%/40px 17px;
            width: 40px;
          }

          .auditStatus_xdz {
            background: url($imgUrl+'xiudingzhong.png') no-repeat 0% 0%/40px
              17px;
            width: 40px;
          }

          .auditStatus_ygd {
            background: url($imgUrl+'yiguidang.png') no-repeat 0% 0%/40px 17px;
            width: 40px;
          }

          .auditStatus_pass {
            background: url($imgUrl+'shenpitongguo.png') no-repeat 0% 0%/50px
              17px;
            width: 50px;
          }

          .auditStatus_jdsptg {
            background: url($imgUrl+'jiedianshenpitongguo.png') no-repeat 0% 0%/60px
              17px;
            width: 60px;
          }

          .auditStatus_xdspz {
            background: url($imgUrl+'xuidingshenpizhong.png') no-repeat 0% 0%/60px
              17px;
            width: 60px;
          }

          .auditStatus_bhwxg {
            background: url($imgUrl+'bohuiweixiugai.png') no-repeat 0% 0%/60px
              17px;
            width: 60px;
          }

          .auditStatus_bhyxg {
            background: url($imgUrl+'bohuiyixiugai.png') no-repeat 0% 0%/60px
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
<style>
  .approve-search .el-table .el-table__expand-column div{
    padding: 0;
  }
  .approve-search .el-table__expand-icon>.el-icon:before {
    content: '';
  }
.fakeStyle {
  display: none;
}
.nav_projectSelect_dropdown {
  width: 250px;
}
</style>
