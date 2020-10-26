<template>
    <div class="project-doc">
        <div class="project-doc-top header-box">
            <div class="project-doc-rec" @click="goRecovery">
                <el-button type="danger" icon="el-icon-delete" >回收站</el-button>
            </div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>项目管理</el-breadcrumb-item>
                <el-breadcrumb-item>项目文档</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="clearfix">
                <div class="toggle-project-box fl">
                    <toggle-project permission="project_file" @change-project="handleChangeProject"></toggle-project>
                </div>
                <div class="stage-tips fl">
                    <p class="fl">
                        <i class="past fl"></i>
                        <span class="fl">已通过阶段</span>
                    </p>
                    <p class="fl">
                        <i class="current-stage fl"></i>
                        <span class="fl">当前选择阶段</span>
                    </p>
                    <p class="fl">
                        <i class="no-past fl"></i>
                        <span class="fl">未通过阶段</span>
                    </p>
                </div>
            </div>
            <div :class="[{'stage-list-min-box2': moreStageAutoH},'stage-list-box']">
                <div class="stage-list">
                    <el-button type="text" class="more-stage bgcolor-primary-hover border-primary-hover" @click="showAllBtn(0)" v-show="!packBtnVisible && moreStageBtnVisible">
                        更多
                        <i class="iconfont jiantou"></i>
                    </el-button>
                    <el-button type="text" class="more-stage bgcolor-primary-hover border-primary-hover" @click="packUpBtn(0)" v-show="packBtnVisible">
                        收起
                        <i class="iconfont jiantou_shang"></i>
                    </el-button>
                    <ul class="clearfix">
                        <li v-for="(item, index) in stageList" :key="index">
                            <a
                                herf="javascript:;"
                                :class="[{'active':item.completeFlag == 1 || index == 0 || (item.startTime !=null && item.endTime == null)}]"
                                @click="stageBtn(item,$event)"
                            >{{item.name}}</a>
                            <i class="iconfont weibiaoti40" v-if="index < (stageList.length - 1)" :class="{'color-light3':item.completeFlag == 1}"></i>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="project-doc-con">
            <div class="search-box clearfix" >
                <div :class="[{'search-item-box-max': moreSearchAutoH},{'search-item-box-min': !packSearchVisible},'search-item-box','fl']" v-on:keyup.enter="searcgDoc">
                    <el-button type="text" class="more-stage bgcolor-primary-hover border-primary-hover" @click="showAllBtn(1)" v-show="!packSearchVisible && moreSearchBtnVisible">
                        更多
                        <i class="iconfont jiantou"></i>
                    </el-button>
                    <el-button type="text" class="more-stage bgcolor-primary-hover border-primary-hover" @click="packUpBtn(1)" v-show="packSearchVisible">
                        收起
                        <i class="iconfont jiantou_shang"></i>
                    </el-button>
                    <div class="form_box" >
                        <el-form ref="form" :model="search.searchList" label-width="100px" class="clearfix">
                            <el-form-item label="标题关键词：">
                                <el-input class="q-308"
                                    v-model="search.searchList.titleKey"
                                    placeholder="包含以下全部关键词（以空格区分）"
                                    :maxlength="160"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="内容关键词：">
                                <el-input class="q-308"
                                    v-model="search.searchList.conKey"
                                    placeholder="包含以下全部关键词（以空格区分）"
                                    :maxlength="160"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="项目阶段：">
                                <el-select class="q-240"
                                    v-model="search.searchList.proStage"
                                    placeholder="请选择项目阶段"
                                    clearable
                                    @change="changeProStage"
                                >
                                    <el-option
                                        v-for="(item, index) in search.proStageList"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="文件类型：">
                                <multiple-choice ref="docTypeEle" @changeData="fileTypesChangeData" :selectData="search.fileTypes" :width="196"></multiple-choice>
                            </el-form-item>
                            <el-form-item label="文件状态：">
                                <multiple-choice ref="docStateEle" @changeData="fileStateChangeData" :selectData="search.fileState" :width="196"></multiple-choice>
                            </el-form-item>
                            <el-form-item label="目录状态：">
                                <multiple-choice ref="dirStateEle" @changeData="dirStateChangeData" :selectData="search.dirState" :width="196"></multiple-choice>
                            </el-form-item>
                            <el-form-item label="修改日期：">
                            <date-range :date-start.sync="search.searchList.starTime"
                                        :date-end.sync="search.searchList.endTime"
                                        format="yyyy-MM-dd HH:mm:ss"></date-range>
                            </el-form-item>
                            <el-button  type="primary" icon="el-icon-search" @click="searcgDoc">查询</el-button>
                            <el-button  @click="reset" icon="el-icon-refresh">重置</el-button>
                        </el-form>
                    </div>
                </div>
                <div class="search-btn-box fr" v-if="!packSearchVisible">
                    <el-button  type="primary" icon="el-icon-search" @click="searcgDoc">查询</el-button>
                    <el-button  @click="reset" icon="el-icon-refresh">重置</el-button>
                </div>
            </div>
            <div :class="[{'pro-doc-operation-max':moreHandleAutoH},{'pro-doc-operation2':!moreHandleAutoH},'pro-doc-operation','clearfix']">
                <el-button type="text" class="more-stage bgcolor-primary-hover border-primary-hover" @click="showAllBtn(2)" v-show="!packHandleVisible && moreHandleBtnVisible">
                    更多
                    <i class="iconfont jiantou"></i>
                </el-button>
                <el-button type="text" class="more-stage bgcolor-primary-hover border-primary-hover" @click="packUpBtn(2)" v-show="packHandleVisible">
                    收起
                    <i class="iconfont jiantou_shang"></i>
                </el-button>
                <ul style="float:left" class="newremind">
                    <li class="pro-doc-operation-item" @click="newCreatBtn" v-if="permission.projectFileDir && !stageIsAll && !stageSource">
                        <a href="javascript:;">
                            <i class="iconfont wenjianjia"></i>
                            新建文件夹
                        </a>
                    </li>
                    <li class="upload pro-doc-operation-item" v-if="permission.projectFileUpload && !stageIsAll && !stageSource">
                        <!-- <a v-if="!isPC" href="javascript:;" @click="testFn">
                            <i class="shangchuan iconfont"></i>
                            上传
                        </a> -->
                      <el-dropdown trigger="click" @command="handleUpload">
                        <a href="javascript:;">
                          <i class="shangchuan iconfont"></i>
                          上传
                        </a>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="file">文件</el-dropdown-item>
                          <el-dropdown-item command="dict">文件夹</el-dropdown-item>
                          <el-dropdown-item v-if="isPC" command="mulit">多文件及多文件夹</el-dropdown-item>
                          <el-dropdown-item v-if="isPC" command="scan">扫描上传</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                        <el-input type="file" id="fileBtn" style="display:none;"></el-input>
                    </li>
                    <li class="download pro-doc-operation-item" @click="downloadFileBtn">
                        <a href="javascript:;">
                            <i class="iconfont Shapecopy"></i>
                            下载
                        </a>
                    </li>
                    <li class="delete pro-doc-operation-item" @click="deletetDoc">
                        <a href="javascript:;">
                            <i class="shanchu iconfont"></i>
                            删除
                        </a>
                    </li>
                    <li class="Edition pro-doc-operation-item" @click="visionBtn" v-if="permission.projectFileDition">
                        <a href="javascript:;">
                            <i class="xinjianbanbenku iconfont"></i>
                            版本
                        </a>
                    </li>
                    <!-- <li class="doc-rela pro-doc-operation-item" @click="docRelationBtn" v-if="$utils.m('paper_manage') && permission.projectFileToPaper && !stageIsPlaceFile">
                        <a href="javascript:;">
                            <i></i>
                            设为底稿
                        </a>
                    </li> -->

                    <!--  @click="docExamBtn" -->
                    <li class="doc-exam pro-doc-operation-item" @click="fileApprove(2)" v-if="permission.projectFileApprove">
                        <a href="javascript:;">
                            <i class="shenpi iconfont"></i>
                            文件审批
                        </a>
                    </li>
                    <!-- <li class="catalog-exam pro-doc-operation-item" @click="getCatalogFlowChart" v-if="$utils.m('paper_manage') && permission.projectDirApprove">
                        <a href="javascript:;">
                            <i class="wenzhang iconfont"></i>
                            目录审批
                        </a>
                    </li> -->
                    <li class="dicuss-exam pro-doc-operation-item" @click="getDiscuss">
                        <a href="javascript:;">
                            <i class="taolun iconfont"></i>
                            讨论
                        </a>
                    </li>
                    <li class="pro-doc-operation-item fl" @click="setRemind">
                        <a href="javascript:;">
                            <i class="ling iconfont chunk_icon"></i>
                            设置提醒
                        </a>
                    </li>
                    <li class="pro-doc-operation-item fl" @click="selectedDocList">
                        <a href="javascript:;">
                            <i class="yixuanliebiao iconfont"></i>
                            已选文件列表
                        </a>
                    </li>
                    <li class="pro-doc-operation-item fl" @click="clearSelection(true)">
                        <a href="javascript:;">
                            <i class="quxiaoxuanze iconfont"></i>
                            取消选择
                        </a>
                    </li>

                    <li class="pro-doc-operation-item fl" @click="docCopy">
                        <a href="javascript:;">
                            <i class="fuzhi iconfont"></i>
                            复制
                        </a>
                    </li>

                    <li class="pro-doc-operation-item fl" @click="docPaste">
                        <a href="javascript:;">
                            <i class="niantie iconfont"></i>
                            普通粘贴
                        </a>
                    </li>
                    <!--  @click="reviseBtn" -->
                    <li class="pro-doc-operation-item fl" @click="fileApprove(10)">
                        <a href="javascript:;">
                            <i class="xiugai iconfont"></i>
                            文件修订
                        </a>
                    </li>
                    <li class="pro-doc-operation-item fl" @click="remarkBtn">
                        <a href="javascript:;">
                            <i class="ccgl-shujuzidianxiugaijilu-3 iconfont"></i>
                            备注
                        </a>
                    </li>
                    <li class="pro-doc-operation-item fl" @click="projectIndexHandle">
                        <a href="javascript:;">
                            <i class="suoyin iconfont"></i>
                            索引列表
                        </a>
                    </li>
                    <li class="pro-doc-operation-item fl" @click="approvalHandle">
                        <a href="javascript:;">
                            <i class="wenjianshenpishenhequeren iconfont"></i>
                            文件审批意见
                        </a>
                    </li>
                </ul>
            </div>
            <div style="text-align:left;padding-left:10px;margin-top:8px;" class="path-el-breadcrumb">
                <div class="el-breadcrumb-box el-breadcrumb-ul">
                  <path-bar :paths="bread_crumbs" field="title" @toggle="backDir"></path-bar>
                </div>
            </div>
            <div class="project-doc-list" @contextmenu.prevent="rightEvent(null)">
                <el-table
                    id="multipleTable"
                    ref="multipleTable"
                    :data="docInitList"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @select-all="handleSelectAll"
                    @select="handleSelectDoc"
                    @row-dblclick="getDblClickId"
                    @row-contextmenu="rightEvent"
                    :row-style="rowClass"
                    :height="tableHeight"
                    @sort-change="tableSortChange"
                >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column label="文件名" width="700" sortable="custom">
                        <template slot-scope="scope">
                            <el-col :span="15" class="name_col clearfix" :title="scope.row.docName"
                                     :class="['name_col','name_col_box','clearfix']"
                                    style="position:relative">
                                <p class="fl name_col_img">
                                    <img :src="scope.row.fileIcon">
                                </p>
                                <div class="fl name_col_name">
                                    <p :class="[{noIcon: scope.row.auditStatus == null && !scope.row.notes && !scope.row.lockState && !scope.row.record && !scope.row.reminder && scope.row.linkList == null && scope.row.paperLabelList == null},'table-doc-name']">
                                        {{scope.row.docName}}</p>
                                    <ul class="doc-state clearfix" v-if="scope.row.docType == 0">
                                        <li class="fl" v-if="scope.row.auditStatus == 0" title="审批中">
                                            <img
                                                src="../../../../assets/project_doc/shenpizhong.png"
                                                style="width:40px;height:17px"
                                            >
                                        </li>
                                        <li class="fl" v-if="scope.row.auditStatus == 1" title="审批通过">
                                            <img
                                                src="../../../../assets/project_doc/shenpitongguo.png"
                                                style="width:50px;height:17px"
                                            >
                                        </li>
                                        <li class="fl" v-if="scope.row.auditStatus == 3" title="节点审批通过">
                                            <img
                                                src="../../../../assets/project_doc/jiedianshenpitongguo.png"
                                                style="width:50px;height:17px"
                                            >
                                        </li>
                                        <!-- <li class="fl" v-if="scope.row.auditStatus == 2" title="审批未通过">
                                            <img
                                                src="../../../../assets/project_doc/shenpiweitongguo.png"
                                                style="width:61px;height:17px"
                                            >
                                        </li> -->
                                        <li class="fl" v-if="scope.row.auditStatus == 4" title="待审批">
                                            <img
                                                src="../../../../assets/project_doc/daishenpi.png"
                                                style="width:40px;height:17px"
                                            >
                                        </li>
                                        <li class="fl" v-if="scope.row.auditStatus == 2" title="驳回未修改">
                                            <img
                                                src="../../../../assets/project_doc/bohuiweixiugai.png"
                                                style="width:61px;height:17px"
                                            >
                                        </li>
                                        <li class="fl" v-if="scope.row.auditStatus == 5" title="驳回已修改">
                                            <img
                                                src="../../../../assets/project_doc/bohuiyixiugai.png"
                                                style="width:61px;height:17px"
                                            >
                                        </li>

                                        <li class="fl" v-if="scope.row.auditStatus == 7" title="修订中">
                                            <img
                                                src="../../../../assets/project_doc/xiudingzhong.png"
                                                style="width:40px;height:17px"
                                            >
                                        </li>
                                        <li class="fl" v-if="scope.row.auditStatus == 6" title="修订审批中">
                                            <img
                                                src="../../../../assets/project_doc/xuidingshenpizhong.png"
                                                style="width:61px;height:17px"
                                            >
                                        </li>
                                        <li class="fl" v-if="scope.row.auditStatus == 8" title="已归档">
                                            <img
                                                src="../../../../assets/project_doc/yiguidang.png"
                                                style="width:40px;height:17px"
                                            >
                                        </li>
                                        <li class="fl" v-if="scope.row.reminder" title="已设置变更提醒">
                                            <i class="iconfont tongzhi tongzhi-icon"></i>
                                        </li>
                                        <li class="fl" v-if="scope.row.lockState" title="已锁定">
                                            <i class="iconfont tubiao-suo suo-icon"></i>
                                        </li>
                                        <li class="suolin-icon fl" v-if="scope.row.isLink == 1" title="索引">
                                            <i class="iconfont suoyin"></i>
                                        </li>
                                        <li class="beizhu-icon fl" v-if="scope.row.notes" title="备注">
                                            <i class="iconfont beizhu"></i>
                                        </li>
                                        <li class="shenpijilu-icon -folder-emptyfl" v-if="scope.row.record" title="审批记录">
                                            <i class="iconfont shenpijilu1"></i>
                                        </li>
                                    </ul>
                                </div>
                            </el-col>
                        </template>
                    </el-table-column>
                    <el-table-column prop="updateTime" label="修改时间"  sortable="custom" min-width="150">
                        <template slot-scope="scope">
                            <p v-if="scope.row.docType == 0">{{scope.row.updateTime}}</p>
                            <p v-if="scope.row.docType == 0">
                                <span style="font-weight:bold">{{scope.row.createUserName}}</span>
                                生成
                                <span class="color-primary version-style" style="display:inline-block;font-weight:bold;">V{{scope.row.docVersionNumber}}</span>
                            </p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="size" label="大小" show-overflow-tooltip sortable="custom"></el-table-column>
                    <div class="nodata_box" v-if="noDataBol" @contextmenu.prevent="rightEvent(null)">暂无数据</div>
                </el-table>
            </div>

        </div>
        <div class="footer-con">
            <div class="footer-box clearfix">
                <p class="footer-box-l fl">已选中 {{selectedNum}} 项</p>
                <el-pagination
                    class="fr"
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="search.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="search.dataCount"
                    :page-count="search.pageCount"
                ></el-pagination>
            </div>
        </div>
        <!-- 文件属性 -->
        <el-dialog title="文件属性" :close-on-click-modal="false" :visible.sync="isShowNature" class="nature_box" width="500px">
            <div class="box">
                <el-row>
                    <el-col :span="5">名称：</el-col>
                    <el-col :span="19" style="text-align:left">{{select_nature_data.docName}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="5">大小：</el-col>
                    <el-col :span="19" style="text-align:left">{{select_nature_data.docSize}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="5">版本：</el-col>
                    <el-col :span="19" style="text-align:left">{{select_nature_data.docVersion}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="5">创建：</el-col>
                    <el-col :span="19" style="text-align:left">{{select_nature_data.docCreateInto}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="5">锁定：</el-col>
                    <el-col :span="19" style="text-align:left">{{select_nature_data.docLockStatus}}</el-col>
                </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isShowNature = false">关 闭</el-button>
      </span>
        </el-dialog>
        <!-- 权限设置 -->
        <div class="power-set-content" v-if="powerSetIsShow">
            <el-dialog title="权限设置" :close-on-click-modal="false" :visible.sync="powerSetIsShow" width="610px">
                <div class="power-tit clearfix">
                    <span class="fl">文件/文件夹：</span>
                    <p class="fl">{{selectedDoc[0].docName}}</p>
                </div>
                <div class="person-list clearfix">
                    <div class="person-list-left fl">
                        <p class="person-list-title">项目组成员列表</p>
                        <ul>
                            <li
                                :class="[{cur:index == currentPowerPerson},'clearfix']"
                                v-for="(item, index) in powerSetData"
                                :key="index"
                                @click="queryPersonPower(item,index)"
                            >
                                <div class="fl">
                                    <img :src="!item.userImg? require('@/assets/user_img/projectLogUser.png'): getImgUrl(item)" style="width:31px;height:31px">
                                </div>
                                <p class="fl">{{item.usName}}</p>
                            </li>
                        </ul>
                    </div>
                    <div class="person-list-right fl">
                        <p class="person-list-title">权限</p>
                        <div class="person-list-checklist">
                            <el-checkbox-group v-model="checkList" @change="checkboxGroup">
                                <p>
                                    <el-checkbox label="预览"></el-checkbox>
                                </p>
                                <p>
                                    <el-checkbox label="下载"></el-checkbox>
                                </p>
                                <p>
                                    <el-checkbox label="还原版本"></el-checkbox>
                                </p>
                                <p>
                                    <el-checkbox label="复制"></el-checkbox>
                                </p>
                                <p>
                                    <el-checkbox label="删除"></el-checkbox>
                                </p>
                                <p>
                                    <el-checkbox label="剪切"></el-checkbox>
                                </p>
                                <p>
                                    <el-checkbox label="重命名"></el-checkbox>
                                </p>
                            </el-checkbox-group>
                        </div>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="powerSetIsShow=false">取 消</el-button>
                    <el-button type="primary" @click="setPersonPower">保存</el-button>
                </span>
            </el-dialog>
        </div>
        <right-menu
            class="rightMenu"
            :fileData="right_click_data"
            :rightmenuIsShow="rightmenuIsShow"
            :type="'project'"
            :hasDocAndFolder="hasDocAndFolder"
            id="rightM"
            v-on:rightMenuClick="rightMenuClickFn"
        ></right-menu>

        <!-- <catalog-exam
            ref="catalogExam"
            v-if="catalogExamIsShow"
            :catalogFlowChartData="catalogFlowChartData"
            :catalogExamIsShow="catalogExamIsShow"
            :projectData="publicData"
            @sendValueToParent="catalogExamClose"
        ></catalog-exam> -->
        <!-- <doc-relation-single
      :singleDocRelationIsShow="singleDocRelationIsShow"
      @sendValueToParent="docRelationSingleClose"
      @singleDocRelationBtn="docRelationSubmit"
    ></doc-relation-single> -->
        <doc-relation
            ref="docRelationObj"
            :docRelationIsShow.sync="docRelationIsShow"
            :projectData="publicData"
            :toDocRelationList="toDocRelationList"
            @sendValueToParent="docRelationClose"
        ></doc-relation>
        <!-- 索引列表的弹框 -->
        <project-index-lists
            :projectIndexShow.sync="projectIndexShow"
            :projectIndexData="projectIndexData" @sendProjectHandle="proIndexPosition">
        </project-index-lists>
        <doc-exam
            ref="docExam"
            :docSource="1"
            :projectData="publicData"
            :examType="examType"
            @sendValueToParent="docExamClose"
            @sendToParentQueryDoc="docExamSuccess"
            @multipleCallback="docExamMultiple"
        ></doc-exam>
        <!-- <doc-exam
            ref="docExam"
            v-if="docExamIsShow"
            :title="examTitle"
            :docSource="1"
            :docFlowChartData="docFlowChartData"
            :docExamIsShow.sync="docExamIsShow"
            :selectedDoc="docExamFilterDoc"
            :projectData="publicData"
            :examType="examType"
            @sendValueToParent="docExamClose"
            @sendToParentQueryDoc="docExamSuccess"
        ></doc-exam> -->
        <!-- @deleDocToParent="docExamdeleDoc" -->
<!--        <upload-doc-add-->
<!--            v-if="addDoc"-->
<!--            :uploadDocAddIsShow="uploadDocAddIsShow"-->
<!--            :uploadParamData="uploadParamData"-->
<!--            @sendValueToParent="uploadAddDocClose"-->
<!--            @docUpload="docUpload"-->
<!--            @docUploadAllsucess="docUploadAllsucess"-->
<!--            ref="uploadRef"-->
<!--        ></upload-doc-add>-->
<!--        <upload-doc-add-->
<!--            v-if="addVersion"-->
<!--            :limit="addDocNumber"-->
<!--            :uploadDocAddIsShow="uploadVersionAddIsShow"-->
<!--            :uploadParamData="uploadParamData"-->
<!--            @sendValueToParent="versionUploadAddDocClose"-->
<!--            @docUpload="docUploadVersion"-->
<!--            @docUploadAllsucess="docUploadAllsucessVersion"-->
<!--            :accpet="accpet"-->
<!--            ref="versionUploadRef"-->
<!--        ></upload-doc-add>-->

      <rd-uploader ref="RdUploader"
                    @uploaded="docUpload"
                    @version="docUploadVersion"
                    @complete="handleUploadComplete"></rd-uploader>
      <!-- <rd-uploader-folder ref="RdUploaderFolder" :uploadFolderVisible.sync="uploadFolderVisible" :options="options" :uploadParamData="uploadParamData"
                            :docSource ="0" @uploaded="queryDoc" @version="docUploadVersion"></rd-uploader-folder> -->
<!--      <ver-sion-->
<!--        :versionIsShow="versionIsShow"-->
<!--        :docVersionlist="docVersionlist"-->
<!--        :parentdata="selectedDoc"-->
<!--        :otherdata="{token:token,userId:userId}"-->
<!--        :uploadParamData="uploadParamData"-->
<!--        :stageIsAll="stageIsAll"-->
<!--        @colseModule="versionClose"-->
<!--        @queryDoc="queryDoc"-->
<!--      ></ver-sion>-->

      <file-version :versionIsShow="versionIsShow"
                    :docVersionlist="docVersionlist"
                    :parentdata="selectedDoc[0]"
                    flag="project"
                    @new-version="uploadVsion(selectedDoc,1)"
                    @colseModule="versionClose" @queryDoc="versionUpdate"></file-version>
                    <!-- 消息中心提示的弹框 -->
    <location-dialog :locationActive.sync="locationActive"
                      :fileList="locationMsgData"
                     :source="0"></location-dialog>

      <el-dialog
            title="设置提醒"
            :visible.sync="remindbox"
            :close-on-click-modal="false"
            :before-close="closediloages"
            width="818">
            <span>
                <div class="reminddialog">
                    <p class="remindfont">设置提醒后，有版本变动的文件将会在"消息中心"红点标记提醒！ </p>
                    <p class="remindfont">关闭提醒后，该文件对所有人的提醒均关闭！</p>
                    <ul align="left" class="riwjn_we">
                        <li class="usernanmestlt" style="width:96px;"><i style="color:#f56c6c;position:relative;right:4px;">*</i>提醒人员：</li>
                            <span class="flex a-center">
                                <i @click="optPrinFn(1)" class="iconfont webicon308 color-primary fs-22 mr-5"></i>
                            <!-- <img @click="optPrinFn(1)"  src="../../../../assets/image/addtask.png" alt="" class="shekterAdd"> -->
                            添加人员</span>
                        <li class="usernanmes">
                            <el-tag
                                v-for="(item,index) in deployObj"
                                :key="index"
                                class="userbtn"
                                @close="handle_Close(index,0)"
                                :closable ="!chack_bule">
                                {{item.name}}
                            </el-tag>
                            <span v-if="deployObj.length>0">&nbsp;&nbsp;</span>
                        </li>
                        <span class="flex a-center" style="margin-left:96px;margin-top:10px;">
                            <i @click="roles" class="iconfont webicon308 color-primary fs-22 mr-5"></i>
                        <!-- <img @click="roles"  src="../../../../assets/image/addtask.png" alt="" class="shekterAdd"> -->
                        添加角色</span>
                        <li class="usernanmes">
                            <el-tag
                                v-for="(item,index) in strs"
                                :key="index"
                                class="userbtn"
                                @close="handle_Closerole(index)"
                                :closable ="!chack_bule">
                                {{item.roleName}}
                            </el-tag>
                            <span v-if="strs.length>0">&nbsp;&nbsp;</span>
                        </li>
                    </ul>
                    <p class="usernanmestltfile">选择的文件：</p>
                    <ul align="left" class="riwjn_wechose">
                        <li class="chosefile" v-for="(item,index) in chosefilelist">
                            <span class="file_name" :title="item.docName">{{item.docName}}</span>
                            <i class="color-primary" @click="deletefile(index)">删除</i>
                        </li>
                    </ul>
                </div>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button size="medium" @click="closeremind">关闭提醒</el-button>
                <el-button size="medium" type="primary" @click="startsetRemind">设置提醒</el-button>
            </span>
        </el-dialog>
        <el-dialog  title="详情" :visible.sync="indexIsShow" width="1140px"  class="index-details">
            <div>
                <el-table
                :data="indexTableData"
                :close-on-click-modal="false"
                height="480px"
                :header-cell-style="{background:'#FAFAFA',color:'black',fontWeight:'bold'}"
                style="width: 100%"
                >
                    <el-table-column label="将要删除文件" width="350">
                        <template slot-scope="scope">
                            <!-- <el-col :span="15" class="name_col clearfix" :title="scope.row.docName"
                                    style="position:relative"> -->
                                <div :title="scope.row.docName" class="clearfix">
                                    <p class="fl name_col_img">
                                        <img :src="scope.row.fileIcon">
                                    </p>
                                    <div class="fl name_col_name">
                                        <p>
                                            {{scope.row.docName}}
                                        </p>
                                    </div>
                                </div>
                            <!-- </el-col> -->
                        </template>
                    </el-table-column>
                    <el-table-column prop="parentPaperName" label="关联文件位置" width="300"></el-table-column>
                    <el-table-column prop="content" label="被索引情况"></el-table-column>
                </el-table>
            </div>
        </el-dialog>
        <el-dialog  title="提示" :visible.sync="draftDetailBtn" :close-on-click-modal="false" width="422px"  class="delete_has_draft_tips">
            <div class="delete_has_draft_tips_con">
                <div class="clearfix">
                    <i class="el-icon-warning"></i>
                    <p class="delete_has_draft_tips_con_text">{{deleDraftTips}}<el-button type="text" @click="getDraftDetails"> >>详情</el-button></p>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="draftDetailBtn=false">取 消</el-button>
                    <el-button type="primary" @click="sendDelete(deleteDocList)">确 定</el-button>
                </div>
            </div>
        </el-dialog>
      <!--:findUserObj="user_num === 1 ? findUserObj : findUserObjM"-->
      <findall-deptuser
            :findFlagShow.sync="findFlag"
            v-on:findAllUser="findAllUser"
            :findUserObj="user_num === 1 ? findUserObj : findUserObjM"
            :findState="findState"
            :checkState="checkState"
        ></findall-deptuser>
        <remark :remarkIsShow="remarkIsShow" title="备注" :docData="selectedDoc" :proData="publicData" :remarkList="remarkList" @saveRemark="saveRemark" @colseModule="remarkClose"></remark>
      <select_boxs :setdatas="setdatas" :rights="rights"  v-if="flags" v-on:statesbox='statesboxs'  :Role="Role" :roledata="roledata" />
      <input ref="rd_upload_fireFox" type="file" @change="handleFileSelectChange" style="display:none;"></input>
      <input id="versionupload" type="file" @change="handleFileSelectChange" style="display:none;"></input>
    </div>
</template>
<script>
    import rightMenu from "@/components/file/rightmenu_swh";
    import verSion from "@/pages/front/projectlist/projectDoc/versionProjectDoc";
    // import catalogExam from "@/pages/front/projectlist/projectDoc/catalogExam";
    import docRelation from "@/pages/front/projectlist/projectDoc/docRelation";
    import docExam from "@/pages/front/projectlist/projectDoc/docExam";
    import uploadDocAdd from "@/components/file/uploadAddDoc";
    import {wisdom_doc} from "@/pages/common/js/doc.main";
    import {fail} from "assert";
    import findallDeptuser from "@/components/select_box/findAllDeptUserMultipleNew";
    import select_boxs from '@/components/select_box/select_boxs3'
    import projectIndexLists from "@/pages/front/projectlist/projectDoc/projectIndexLists"
    import remark from "@/components/file/remark"
    // 消息中心定位提示
    import locationDialog from '@/pages/front/manuscriptmanage/locationDialog.vue'
    export default {
        name: "projectDoc",
        components: {
            rightMenu,
            verSion,
            docRelation,
            docExam,
            uploadDocAdd,
            findallDeptuser,
            select_boxs,
            projectIndexLists,
            remark,
            locationDialog
            // catalogExam,
        },
        props: [
            // 'projectId'
        ],
        data() {
            return {
              isPC: false,
              dateStart: '',
              dateEnd: '',
                token: "",
                userId: "",
                success_code: "",
                projectId: "", //项目ID
                bread_crumbs: [{title: "根目录", parentId: 0}],
                // bread_crumbs:[],
                publicData: {
                    projectId: "", //项目ID
                    projectName: "", //项目名称
                    processName: "", //流程名称
                    processId: "", //流程id
                    docParentId: 0, //上级目录ID
                    pathNameList: [], //文件目录
                    projectCreatBy: '',//项目创建人
                    proCurProcessName: ''//项目当前阶段名称
                }, //公共基础数据
                docSource: 0, //项目文档为0，底稿文档为1，客户文档为2
                uploadParamData: {
                    docSource: 0,//项目文档固定为0
                    projId: '',
                    parentId: 0,
                    auditProjectId: '' //流程id
                },
                stageList: [
                    {
                        "id": '',
                        "name": "全部",
                        "completeFlag": 0,
                    }
                ],
                curStage: '',
                rightmenuIsShow: false,
                uploadDocAddIsShow: false, //上传文件是否显示
                uploadVersionAddIsShow: false, //上传新版本是否显示
                addDocNumber: 1,//上传新版本时允许添加的文件数量
                isShowNature: false, //是否显示文件属性弹框
                docExamIsShow: false, //是否显示文件审核
                examType: '2',//审批类型，文件审批2/修订审批10
                docExamFilterDoc:[],//发起文件审批时过滤后的文件列表
                docAttrVisible: true,
                fileName: "",
                search: {
                    searchList: {
                        titleKey: "",
                        conKey: "",
                        proStage: "",
                        dirStateSel: [], // 目录状态检索条件
                        fileStateSel: [], // 文件状态检索条件
                        fileTypesSel: [],//文件类型检索条件
                        starTime: "",
                        endTime: ""
                    },
                    proStageList: [
                        // {id:'',name:'全部'}
                    ],
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
                    ],
                    fileState: [  //文件状态
                        { value: 0, label: '有索引的' },
                        { value: 1, label: '已选择' },
                        { value: 2, label: '有备注的' },
                        { value: 3, label: '有审批记录的' },
                        { value: 4, label: '有讨论的' },
                        { value: 5, label: '无索引的' },
                        { value: 7, label: '待审批' },
                        { value: 8, label: '审批中' },
                        { value: 9, label: '节点审批通过' },
			                  { value: 14, label: '审批通过' },
                        { value: 10, label: '驳回未修改' },
                        { value: 11, label: '驳回已修改' },
                        { value: 12, label: '修订中' },
                        { value: 13, label: '修订审批中' },
                        { value: 6, label: '有设置提醒的' },
                        { value: 20, label: '已归档' }
                    ],
                    dirState:[//目录状态
                        { value: 0, label: '无文件' },
                        { value: 1, label: '有文件' },
                        { value: 2, label: '有讨论的' },
                        { value: 3, label: '已选择' }
                    ],
                    fileTypes: [
                        { value: 0, label: 'doc/docx' },
                        { value: 1, label: 'pdf' },
                        { value: 2, label: 'xls/xlsx' },
                        { value: 3, label: 'txt' },
                        { value: 4, label: 'png' },
                        { value: 5, label: 'jpg/jpeg' }
                    ],
                    dataCount: 0, //数据条数
                    pageCount: 1, //总页数
                    pageSize: 100,
                    pageNo: 0
                },
                currentPage: 1,
                docInitList: [],
                orderFlag: "",//表格数据排序依据
                newCreatShow: false, //新建文件夹
                myNewCreatShow: true,
                newCreatName: "新建文件夹",
                selectedDoc: [], //当前选中的文件(不包括文件夹)
                selectedDir: [], //当前选中的文件夹(不包括文件)
                selectedDirIds: [], //当前选中的文件夹id集合(不包括文件)
                manaullyFile: [],//用户手动选中的文件
                seleDocIsSingle: true, //当前选中单个或多个文件
                copyOrCut: "", //copy为复制，cut为粘贴
                isPaste: false, //右击是否显示粘贴
                copySourceData: {
                    //复制剪切相关数据
                    ids: "",
                    projId: "",
                    sourceProjId: "",
                    parentId: "",
                    copyOrCut: "",
                    hasCutOrCopy: false,
                    seleFileIds: [],//复制剪切时文件id集合
                    seleFolderIds: [],//复制剪切时文件夹id集合
                    docSource: 0,//复制的来源0: 项目文档/ 1: 底稿管理
                    auditProjectId: '',
                },
                showReName: [], //显示重命名编辑框
                reNameIndex: 0, //显示重命名编辑框的下标值
                versionIsShow: false, //是否显示版本弹窗
                accpet: "", //版本允许上传的文件类型
                catalogFlowChartData: {
                    modelId: "",
                    deploymentId: "",
                    versionId: "",
                    financingTypeId: "",
                    categoryId: "",
                    catalogExamProcessName: ''
                },
                docFlowChartData: {
                    modelId: "",
                    deploymentId: "",
                    versionId: "",
                    financingTypeId: "",
                    categoryId: "",
                    docExamProcessName: ''
                },
                catalogExamIsShow: false, //是否显示目录审核弹窗
                singleDocRelationIsShow: false, //是否显示单独文件关联弹窗
                docRelationIsShow: false, //是否显示文件关联弹窗
                select_nature_data: "", //文件属性相关数据
                docVersionlist: [], //版本列表
                rightMenucurRow: {
                    index: 0
                },
                addDoc: false,
                addVersion: false,
                multipleSelectionId: [], //当前选中表格的id集合
                parentId: 0, //目录ID
                //以下为权限设置弹层相关
                powerSetIsShow: false,
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
                currentPowerPerson: 0, //当前选中人的index
                currentPersonData: {}, //当前选中人的数据
                noDataBol: false, // 是否有数据
                right_click_data: {}, //右键右击对象,
                reNameDocData: {},//重命名文件&文件夹对象
                dbrowData: null, // 双击获取当前数据
                paperTreeData: [],//底稿目录
                noteAll: 0,
                //dislcose:true,
                remindbox: false,
                deployObj: [], //设置提醒人员
                ccObj: [], //添加抄送人员
                //新增选择人员
                findFlag: false,
                findState: {},
                checkState: {},
                user_num: "", //选择人员标识
                chack_bule: false,
                chosepersonIds: [],
                //选择角色
                setdatas:[],
                rights:'',
                flags:false,
                Role:'',
                setdata:[],
                roledata:'',
                strs:[],
                roleIds:[],
                //选择的文件
                chosefilelist:[],
                chosefileIds:[],
                //调小铃铛的接口返回的值
                smallbell:'',
                docInListIds:[],
                stageIsPlaceFile: false,//当前阶段是否归档
                stageIsAll: false,//阶段是否为全部
                permission: {
                    projectFileDir: this.$utils.checkProjectPermission('project_file_dir'), // 新建项目
                    projectFileMould: this.$utils.checkProjectPermission('project_file_mould'), // 引用模板
                    projectFileUpload: this.$utils.checkProjectPermission('project_file_upload'), // 上传
                    projectFileDition: this.$utils.checkProjectPermission('project_file_dition'), // 版本
                    projectFileToPaper: this.$utils.checkProjectPermission('project_file_to_paper'), // 尚未底稿
                    projectFileApprove: this.$utils.checkProjectPermission('project_file_approve'), // 文件审核
                    projectDirApprove: this.$utils.checkProjectPermission('project_dir_approve'), // 目录审核
                },
                positionDocId: '',//消息中心定位到项目文档的文档ID
                positionDocName: '',//消息中心定位到项目文档的文档名称
                positionDocIndex: 0,//消息中心定位到项目文档的index
                queryDocComplete: false,
                isPosition: false,
                isChatPosition: false,//是不是聊天定位
                positionPathList: ['/projectDocSearch','/projecchat','/proDocSelectList','/manuscriptmanage','/fullsearch'],//定位到项目文档的页面
                hasDocAndFolder: false,
                //被索引详情弹窗相关
                indexIsShow: false,//被索引详情是否展示
                indexTableData: [],//被索引详情列表
                draftDetailBtn: false,//删除时提示已有设为底稿的文件
                deleDraftTips: '',//删除时提示已有设为底稿的弹窗文字
                deleteDocList: [],//将要删除的文件列表
                indexDetailsIds: [],//要获取被索引详情的文件id集合
                toDocRelationList: [],//传给文件关联弹窗的文件和文件夹
                filterSetDraftDoc: 0,//每次点击“设为底稿”按钮时如果有选中的文件夹，把验证出的空目录、含有设为底稿文件的文件夹个数记录下来
                testCanSetDraftTimes: 0,//验证次数
                folderTotal: 0,//选中的文件夹个数
                hasSetedDoc: false,//选中的文件中是否有已设为底稿的文件
                findUserObj: [],
                findUserObjM: [],
                stageSource: false,
                projectPowerList: [],
                projectIndexShow: false, // 索引列表值
                projectIndexData: {}, // 索引传值
                moreStageAutoH: false,//收起，展开状态
                packBtnVisible: false,
                moreSearchAutoH: false,
                packSearchVisible: false,
                moreHandleAutoH: false,
                packHandleVisible: false,
                moreStageBtnVisible: false,
                moreSearchBtnVisible: false,
                moreHandleBtnVisible: false,
                tableHeight: 600,//文件列表表格高度
                selectedTotal: 0,//共选中多少项
                examTitle: '文件审批',//文件审批或修订审批弹窗标题
                remarkIsShow: false,//备注弹窗
                remarkList: [],//单个文件备注列表
                locationActive:false,
                locationMsgData:[],
                uploadVisionDoc: {},//要上传新版本的文件
                uploadFolderVisible: false,
                options: {
                        multiple: true,
                        accept: ""
                }
            };
        },
        created() {
          this.isPC = this.$store.state.isPC
          // PC端查询
          window.PC.queryDoc = this.queryDoc
          // PC端文件上传成功手动插入文件
          window.PC.insertUploadedFileDoc = this.insertUploadedFileDoc

          // pc端定位
          document.addEventListener("click", e => {
              this.rightmenuIsShow = false;
          });

        },
        mounted() {
            this.token = this.$store.state.loginObject.userToken;
            this.userId = this.$store.state.loginObject.userId;
            this.publicData.projectId = this.$store.state.projectMsg.pro_id;
            this.uploadParamData.projId = this.$store.state.projectMsg.pro_id;//文件上传初始化需要的相关数据
            this.uploadParamData.auditProjectId = this.publicData.processId;
            this.publicData.projectName = this.$store.state.projectMsg.projectMsg.name;
            this.publicData.projectCreatBy = this.$store.state.projectMsg.projectMsg.createBy;
            this.publicData.pathNameList = [];
            this.success_code = this.code.codeNum.SUCCESS;
            // this.queryStage(this.queryDoc);
            this.queryPerson();
            this.copySourceData.ids = this.$store.state.projectDocCopy.ids;
            this.copySourceData.projId = this.$store.state.projectDocCopy.projId;
            this.copySourceData.sourceProjId = this.$store.state.projectDocCopy.sourceProjId;
            this.copySourceData.parentId = this.$store.state.projectDocCopy.parentId;
            this.copySourceData.copyOrCut = this.$store.state.projectDocCopy.copyOrCut;
            this.copySourceData.auditProjectId = this.$store.state.projectDocCopy.auditProjectId;
            this.copySourceData.docSource = this.$store.state.projectDocCopy.docSource;
            this.getTableHeight();
            this.$Mit.watch({
              status:(res)=>{
                this.$Intel.message(this.selectedDoc.map(item => {
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
            // getProPermissionFn(this.$store.state.projectMsg.pro_id);
            window.addEventListener('scroll', this.handleScroll,true);
            window.onresize = () => {
                return (() => {
                    this.getTableHeight();
                    this.isShowMoreStageBtn()
                    this.isShowMoreSearchBtn()
                })()
            }
            if(!!this.$route.query.isActive) {
                this.locationActive = true;
                this.locationMsgData = JSON.parse(this.$route.query.data);
            }
            this.isShowMoreSearchBtn();
            // 初始化调用更新状态，触发刷新queryDoc()方法，初始化当前阶段文档列表
            this.queryStage(1);
        },
        computed: {
            versionMsg() {
                return this.$store.state.versionMsg;
            },
            selectedNum(){
                return this.$store.state.selectedNum
            },
            selectedData(){
                let selectData = this.$store.state.selectionProjectDoc;
                let curProData = {};
                selectData.forEach(v => {
                    if (v.id === this.publicData.projectId) {
                        curProData = v;
                    }
                })
                return curProData;
            }
        },

        beforeRouteEnter (to, from, next) {
            next(vm => {
                if(from.path == '/messagecenter' && vm.$route.query.isPosition != undefined){
                    vm.isPosition = true;
                    vm.isChatPosition = false;//是否是项目聊天定位
                    let positionData = JSON.parse(vm.$route.query.data)
                    vm.positionDocId =  positionData.docId;
                    // vm.positionDocName = vm.$route.query.docName;//文件名称
                    vm.publicData.projectId =  vm.$route.query.projectId;
                    vm.publicData.processId = positionData.auditProjectId;//项目阶段ID
                  vm.queryStage(0);//传1需要根据阶段查父级id,传0不需要根据阶段查父级id
                  // console.log(vm.$route.query, '打开的位置123',vm.queryDoc)
                  vm.docPositionQuery(vm.queryDoc);
                    // vm.queryDocComplete = true;
                } else if((vm.positionPathList.indexOf(from.path) !== -1 && vm.$route.query.isPosition != undefined) || vm.$route.query.isPcPosition != undefined){
                    var data = JSON.parse(vm.$route.query.data);
                    // console.log(vm.$route.query, '打开的位置', vm.$route.query.num, data.nowPage)
                    vm.isPosition = true;
                    vm.isChatPosition = from.path == '/projecchat';//是否是项目聊天定位
                    vm.positionDocId =  vm.$route.query.docId;//文件id
                    vm.publicData.projectId =  vm.$route.query.projectId;//项目id
                    vm.publicData.processName = data.stageName;
                    vm.publicData.processId = data.auditProjectId;//项目阶段ID
                    vm.uploadParamData.auditProjectId = data.auditProjectId;//上传时用到的项目阶段ID
                    vm.publicData.docParentId = data.parentId;//所在目录ID 0 为顶级目录
                    vm.copySourceData.parentId = data.parentId; //复制剪切目标父级ID
                    vm.uploadParamData.parentId = data.parentId; //上传目标父级ID
                    // vm.bread_crumbs[0].parentId = data.parentId;
                    vm.search.pageNo = vm.$route.query.num === 2 ? 0 : data.nowPage;//文件所在页码
                    var len = data.parent.length -1;
                    var projectData = data.project;//所在项目的项目相关信息
                    var stageSourceArr = []
                    for(var i = len;i>=0;i--){
                        var obj = {};
                        obj.title = data.parent[i].docName;
                        obj.parentId = data.parent[i].id;
                        if (obj.title === '底稿上传') {
                          stageSourceArr.push(obj)
                        }
                        vm.bread_crumbs.push(obj);
                        vm.publicData.pathNameList.push(data.parent[i].docName);
                    }
                    // 底稿目录定位回来不展示新建文件夹和上传
                    if (stageSourceArr.length) {
                      vm.stageSource = true
                    }
                    vm.$store.commit("projectId",+vm.publicData.projectId);
                    vm.$store.commit("projectMsg",projectData);
                    vm.$store.commit("projectMsgname",projectData.name);
                    // todo 模块化--定位切换项目
                    vm.$utils.saveProjectId(vm.publicData.projectId)
                    vm.$utils.queryProChatNum(vm.publicData.projectId)

                    vm.$utils.queryProExamNum(vm.publicData.projectId)
                    vm.queryStage(0);
                    vm.queryDoc();
                    let isDraftPosition = vm.publicData.processId == 0 && data.parent[0] && data.parent[0].docName == '底稿上传';
                    if(!isDraftPosition){
                        vm.queryDocIdForBarth();
                    }
                } else {
                    vm.isPosition = false;
                    // alert('here')
                    vm.queryStage(1);
                }
            })
        },
        watch: {
            // 处理版本变更通知
            versionMsg(val) {
                // docSource 为0是项目文档， 1是底稿管理，2是客户文档
                if(val.docSource!=0) return

                let idx = this.docInitList.findIndex(v=>v.docId == val.docId)
                // 当前无数据，return
                if(idx<0) return
                // 需要更新的数据
                let updatedObj = {
                    userName: val.userName,
                    docSize: val.docSize,
                    updateBy: val.updateBy,
                    createUserName: val.userName,
                    updateTime: val.updateTime,
                    docVersionNumber: val.docVersionNumber,
                    docRfs: val.docRfs,
                    rfsId: val.docRfs
                }
                val.auditStatus && (updatedObj.auditStatus = val.auditStatus)

                Object.assign(this.docInitList[idx], updatedObj)

                // 版本号放大样式处理
                let el = $('#multipleTable tr').eq(idx+1).find('.version-style')
                el.addClass('rdpulse')
                setTimeout(()=>{
                    el.removeClass('rdpulse')
                },3000)
                // 如果返回的消息中type类型为6，为上传新版本消息通知时，需要取消选中
                console.log(val, 2365)
                if (val.docDescript == '上传新版本') {this.clearSelection()}
            },
            // PC端当前页面定位专用
            '$route.fullPath'(newVal,oldVal) {
                var data = JSON.parse(this.$route.query.data);
                this.isPosition = true;
                this.positionDocId = this.$route.query.docId;//文件id
                this.publicData.projectId =  this.$route.query.projectId;//项目id
                this.publicData.processName = data.stageName;
                this.publicData.processId = data.auditProjectId;//项目阶段ID
                this.uploadParamData.auditProjectId = data.auditProjectId;//上传时用到的项目阶段ID
                this.publicData.docParentId = data.parentId;//所在目录ID 0 为顶级目录
                this.copySourceData.parentId = data.parentId; //复制剪切目标父级ID
                this.uploadParamData.parentId = data.parentId; //上传目标父级ID
                this.search.pageNo = data.nowPage;//文件所在页码
                var len = data.parent.length -1;
                var projectData = data.project;//所在项目的项目相关信息
                // name
                // console.log(projectData)
                this.bread_crumbs = [{title: "根目录", parentId: 0}];
                for(var i = len;i>=0;i--){
                    var obj = {};
                    obj.title = data.parent[i].docName;
                    obj.parentId = data.parent[i].id;
                    this.bread_crumbs.push(obj);
                    this.publicData.pathNameList.push(data.parent[i].docName);
                }
                this.$store.commit("projectId",+this.publicData.projectId);
                this.$store.commit("projectMsg",projectData);
                this.$store.commit("projectMsgname",projectData.name);
                // todo 模块化--定位切换项目
                this.$utils.saveProjectId(this.publicData.projectId)
                this.$utils.queryProChatNum(this.publicData.projectId)

                this.$utils.queryProExamNum(this.publicData.projectId)
                // 为了解决PC当前页面定位，不需要调queryStage方法
                // this.queryStage(0);
                this.queryDoc();
                let isDraftPosition = this.publicData.processId == 0 && data.parent[0] && data.parent[0].docName == '底稿上传';
                if(!isDraftPosition){
                    this.queryDocIdForBarth();
                }
            },
            currentPage(newV, oldV) {
                this.pageNo = newV - 1;
            },
            testCanSetDraftTimes(oldVal, newVal){
                if(this.testCanSetDraftTimes == this.folderTotal){
                    this.docRelation();
                }
            },
            'publicData.projectId': {
                handler(newName, oldName) {
                    this.permission = {
                        projectFileDir: this.$utils.checkProjectPermission('project_file_dir'), // 新建项目
                        projectFileMould: this.$utils.checkProjectPermission('project_file_mould'), // 引用模板
                        projectFileUpload: this.$utils.checkProjectPermission('project_file_upload'), // 上传
                        projectFileDition: this.$utils.checkProjectPermission('project_file_dition'), // 版本
                        projectFileToPaper: this.$utils.checkProjectPermission('project_file_to_paper'), // 尚未底稿
                        projectFileApprove: this.$utils.checkProjectPermission('project_file_approve'), // 文件审核
                        projectDirApprove: this.$utils.checkProjectPermission('project_dir_approve'), // 目录审核
                    }
                },
                deep: true
            },
            selectedData:{
                handler(){
                    this.selectedDoc = this.selectedData.file || [];
                    this.selectedDir = this.selectedData.dir || [];
                    this.manaullyFile = this.selectedData.manaullyFile || [];
                    this.selectedDirIds = [];
                    this.selectedDir.map(item => {
                        this.selectedDirIds.push(item.id)
                    })
                },
                deep: true
            }
        },
        methods: {
            proIndexPosition(positionData){//文件索引弹窗定 位
                this.isPosition = true;
                this.isChatPosition = false;//是否是项目聊天定位
                this.positionDocId =  positionData.docId;
                this.publicData.projectId =  positionData.projectId;
                this.publicData.processId = positionData.auditProjectId;//项目阶段ID
                this.queryStage(0);//传1需要根据阶段查父级id,传0不需要根据阶段查父级id
                this.docPositionQuery(this.queryDoc);
            },
              // 文件审批/目录审批
              fileApprove (procTypeId) {
                // 判断项目状态 已终止禁止操作
                if(this.$store.state.projectMsg.projectMsg.endFlag  && this.$store.state.projectMsg.projectMsg.endFlag === 1){
                    this.$store.commit('projectStatusTips');
                    return;
                }
                this.examType = procTypeId;
                this.$refs.docExam.activeComp()
              },
            isShowMoreStageBtn(){
                let boxH = $('.stage-list-box').height();
                let objH = $('.stage-list ul').height();
                // if(boxH < objH){
                //     this.moreStageBtnVisible = true;
                // } else {
                //     this.moreStageBtnVisible = false;
                // }
                this.moreStageBtnVisible =  boxH < objH
                // let boxH = $('.stage-list-box').height();
                // let objH = $('.stage-list ul').height();

                // $('.stage-list-box').addClass('stage-list-box2')
            },
            isShowMoreSearchBtn(){
                let boxH = $('.search-item-box').height();
                let objH = $('.form_box').height();
                this.moreSearchBtnVisible = boxH < objH;
                let toolbarH = $('.pro-doc-operation').height();
                let toolbarAutoH = $('.newremind').height();
                this.moreHandleBtnVisible = toolbarH < toolbarAutoH;
            },
            // 目录状态选择
            dirStateChangeData (arr) {
                this.search.searchList.dirStateSel = arr.map(v => v.value);
            },
            // 文件状态选择
            fileStateChangeData (arr) {
                this.search.searchList.fileStateSel = arr.map(v => v.value);
            },
            // 文件类型选择
            fileTypesChangeData (arr) {
                this.search.searchList.fileTypesSel = arr.map(v => v.value);
            },
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
            selectedDocList(){//已选文件列表
                if (this.selectedDoc.length == 0) {
                    this.$message.warning('当前无选中文件')
                    return
                }
                this.$router.push({path: '/proDocSelectList',query:{projectData: JSON.stringify(this.publicData),fromItem:0}});
            },
            // 取消选择
            clearSelection(type) {
                // console.log('走了取消状态')
                // 取消table的选中状态
                this.$refs.multipleTable.clearSelection()
                // 清空存储的数据
                this.$select.clearSelection(1, this.publicData.projectId)
                type && this.$message.success('取消选择成功');
            },
            reviseBtn(){//修订
                let placeFileIndex = this.selectedDoc.findIndex(v=>v.auditStatus==8);
                if(placeFileIndex != -1){
                    this.$message.warning('归档文件不可修订');
                    return;
                }
                // let examPastDocList = this.selectedDoc.filter(function(obj){//审批通过的文件
                //     return obj.auditStatus == 1;
                // });
                this.docExamFilterDoc = this.selectedDoc.filter(function(obj){//审批通过的文件
                    return obj.auditStatus == 1;
                });
                if(this.selectedDoc.length == 0 || this.docExamFilterDoc.length == 0){
                    this.$message.warning('请先选择审批通过的文件')
                    return;
                }
                this.getDocFlowChart(10).then(res => {
                    if (res != undefined) {
                        if(res == 'noNeedExam'){
                            if(this.selectedDoc.length > this.docExamFilterDoc.length){
                                this.$confirm('仅审批通过的文件可修订，其他文件将自动过滤', '提示', {
                                        confirmButtonText: '确定',
                                        cancelButtonText: '取消',
                                        type: 'warning'
                                    }).then(() => {
                                        this.postRevise();
                                    }).catch(() => {
                                });
                            } else {
                                this.postRevise();
                            }
                        } else if(res == 'needExam'){
                            if(this.selectedDoc.length > this.docExamFilterDoc.length){
                                this.$confirm('仅审批通过的文件可发起审批，其他文件将自动过滤', '提示', {
                                        confirmButtonText: '确定',
                                        cancelButtonText: '取消',
                                        type: 'warning'
                                    }).then(() => {
                                        this.examTitle = "文件修订审批";
                                        this.examType = '10';
                                        this.docExamIsShow = true;
                                    }).catch(() => {

                                });
                            } else {
                                this.examTitle = "文件修订审批";
                                this.examType = '10';
                                this.docExamIsShow = true;
                            }
                        }
                    }
                });
            },
            remarkBtn(){//备注
                if(this.selectedDoc.length == 0){
                    this.$message.warning('请先选择文件')
                    return;
                } else if(this.selectedDoc.length == 1){
                    this.queryRemarkList();
                }
                this.remarkIsShow = true;
            },
            remarkClose(){
                 this.remarkIsShow = false;
                 this.remarkList = [];
            },
            queryRemarkList(){//查询单个文件备注
                let data = {
                    token: this.token,
                    userId: this.userId,
                    projectId:this.publicData.projectId,
                    sourceName:'项目文档',//页面位置，记录日志用
                    projectName: this.publicData.projectName,//项目名称，记录日志用
                    data: {
                        docId: this.selectedDoc[0].docId,
                    }
                }
                this.$post('/doc/project/queryNoteByFileId', data).then((res)=> {
                    if (this.success_code == res.code) {
                        this.remarkList = res.data;
                    }
                }).catch(function (error) {

                });
            },
            saveRemark(remarkText){//保存备注
                let fileList = [];
                this.selectedDoc.map(item => {
                    let obj = {};
                    obj.docId = item.docId;
                    obj.fileId = item.id;
                    fileList.push(obj)
                })
                let hash = {};
                let setFileList = fileList.reduce((item, next)=>{
                    hash[next.docId] ? '' : hash[next.docId] = true && item.push(next);
                    return item;
                },[])
                this.remarkIsShow = false;
                let data = {
                    token: this.token,
                    userId: this.userId,
                    projectId:this.publicData.projectId,
                    sourceName:'项目文档',//页面位置，记录日志用
                    projectName: this.publicData.projectName,//项目名称，记录日志用
                    data :{
                        sourceFlag: 0,//项目文档固定为0，底稿为1
                        content: remarkText,
                        needFileList: setFileList
                    }
                }
                this.$post('/doc/project/addNotes', data).then((res)=> {
                    if (this.success_code == res.code) {
                        this.$message.success('新增备注成功')
                        this.queryDoc();
                        // 保存成功之后需要取消选中
                        this.clearSelection()
                    } else {
                        this.$message.warning(res.msg)
                    }
                }).catch(function (error) {

                });
            },
            //表格排序
            tableSortChange(column){
                if (column.order == null) return;
                this.search.pageNo = 0;
                if (column.column.label == "文件名") {
                    if (column.order == "ascending") {
                        this.orderFlag = 6
                        column.order = 'descending'
                    } else if (column.order == "descending") {
                        this.orderFlag = 5
                        column.order = 'ascending'
                    }
                } else if (column.column.label == "修改时间") {
                    if (column.order == "ascending") {
                        this.orderFlag = 1
                        column.order = 'descending'
                    } else if (column.order == "descending") {
                        this.orderFlag = 2
                        column.order = 'ascending'
                    }
                } else if (column.column.label == "大小") {
                    if (column.order == "ascending") {
                        this.orderFlag = 3
                        column.order = 'descending'
                    } else if (column.order == "descending") {
                        this.orderFlag = 4
                        column.order = 'ascending'
                    }
                }
                this.queryDoc();
            },
            getTableHeight () {
                window.setTimeout(() => {
                    this.tableHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)
                    - $('.pro-doc-operation li').innerHeight() - 26 - 38 - 68 - 80
                },300)
            },
            showAllBtn(type){
                switch (type) {
                    case 0: // 展开阶段
                        this.moreStageAutoH = !this.moreStageAutoH;
                        this.packBtnVisible = true;
                        break;
                    case 1: // 展开搜索条件
                        this.moreSearchAutoH = !this.moreSearchAutoH;
                        this.packSearchVisible = true;
                        break;
                    case 2: // 展开工具栏
                        this.moreHandleAutoH = !this.moreHandleAutoH;
                        this.packHandleVisible = true;
                        window.setTimeout(() => {
                            this.tableHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)
                            - $('.newremind').innerHeight() - 38 - 68 - 84
                        },500)
                        break;
                }
            },
            packUpBtn(type){
                switch (type) {
                    case 0: // 收起阶段
                        this.packBtnVisible = false;
                        this.moreStageAutoH = false;
                        break;
                    case 1: // 收起搜索条件
                        this.packSearchVisible = false;
                        this.moreSearchAutoH = false;
                        break;
                    case 2: // 收起工具栏
                        this.packHandleVisible = false;
                        this.moreHandleAutoH = false;
                        this.getTableHeight()
                        break;
                }
            },
            approvalHandle () {
                if (!this.selectedDoc.length) {
                    this.$message.warning('请选择文件')
                    return
                }
                let attach = []
                this.selectedDoc.map(v => {
                    let obj = {}
                    obj.docId = v.docId
                    obj.parentId = v.parentId
                    attach.push(obj)
                })
                let commentData = {
                    docSource: 1,
                    sourceName: '项目文档-文件审批意见页',//记录日志用
                    attach: JSON.stringify(attach),
                    projectId: this.publicData.projectId,
                    isLimit: 1
                }
                this.$store.commit('approvalCommentsFn', commentData)
            },
            // 索引列表弹框
            projectIndexHandle () {
                if (!this.selectedDoc.length) {
                    this.$message.warning('当前无选中文件')
                    return
                }
                // console.log(this.$store.state.selectionProjectDoc, 2222, this.publicData.projectId)
                let selectData = this.$store.state.selectionProjectDoc
                let proFileIds = []
                selectData.forEach(v => {
                    if (v.id === this.publicData.projectId) {
                        v.file.forEach(val => {
                            proFileIds.push(val.id)
                        })
                    }
                })
                let obj = {
                    projectId: this.publicData.projectId,// 项目ID
                    idSet: proFileIds, //文件主键ID集合
                    docSource: 0,
                    docPosition: 0
                }
                this.projectIndexData = obj
                this.projectIndexShow = true
            },
          getImgUrl(item){
            return this.$utils.getDownloadUrl(item.userImg);
          },
          handleUploadTest(e){
            // document.getElementById('videoInput').click()
            // console.log(1, e)
            // e.preventDefault()
            // setTimeout(function() {
            //   console.log(1, 'upload')
            //   document.getElementById('videoInput').click()
            // }, 10)

            var data={
              token:this.token,
              userId:this.userId,
              data:{}
            }

            let hasPower = false


            $.ajax({
              url:  window.allUrl+'/sys/getUserPerm',
              type: 'POST',
              async: false,
              dataType: 'json',
              contentType: "application/json",
              data: JSON.stringify(data),
              success: function(res){
                hasPower = true
              },
              error: function(e) {
                hasPower = false;
              }

            });

            // console.log('nice',hasPower)

            document.getElementById('videoInput').click()


            // var _this=this
            // this.$post('/sys/getQueryRole', data).then((response)=> {
            //   console.log(1, 'upload')
            //   document.getElementById('videoInput').click()
            // })


          },


          handleFileSelectChange(){
            let files = this.$refs['rd_upload_fireFox'].files
            this.$refs['RdUploader'].handleChange(files)
          },

          handleUpdateList(uploadData) {
            // 没有阶段的时候直接走刷新
            if (!uploadData.fileData.data.auditProjectId) {
              this.queryDoc()
            }
            if(uploadData.fileData.data.parentId !== this.publicData.docParentId
              || uploadData.fileData.data.projId !== this.publicData.projectId
            || uploadData.fileData.data.auditProjectId !== this.publicData.processId){
              return
            }
            this.queryDoc()
          },

         // 上传
          handleUpload(v){
              // 判断项目状态 已终止禁止操作
            if(this.$store.state.projectMsg.projectMsg.endFlag  && this.$store.state.projectMsg.projectMsg.endFlag === 1){
                this.$store.commit('projectStatusTips');
                return;
            }
            this.isPC ? this.handleUploadPC(v) : this.testFn(v)
          },

         // PC端上传处理
          handleUploadPC(v){
            let data = {
              parentId: this.publicData.docParentId, //父级目录
              projId: this.publicData.projectId, // 项目id
              auditProjId: this.publicData.processId, // 项目阶段id
              docsource: 0, // 文件来源   1 底稿  0 项目文档   2 客户
              sourceName: '项目文档',
              projectName: this.publicData.projectName
            };
            switch (v) {
              case 'file': // 文件上传
                window.ChromeMain.CS_Main_UploadDoc(JSON.stringify(data));
                break;
               case 'dict': // 文件夹上传
                 window.ChromeMain.CS_Main_SingleFolderUpload(JSON.stringify(data));
                break;
              case 'scan': // 扫描上传
                window.ChromeMain.CS_Main_ShowKodakScan(JSON.stringify(data));
                break;
              case 'mulit':  //多文件及多文件夹上传
                window.ChromeMain.CS_Main_batchUpload(JSON.stringify(data)); 
            }
          },

        // 文件夹上传
          uploadFoler(){
              // todo 上传参数
              // 引入上传组件
              this.uploadParamData.auditProjectId = this.publicData.processId
              this.uploadParamData.parentId = this.publicData.docParentId
              this.uploadParamData.projId = this.publicData.projectId
              this.uploadFolderVisible = true;
          },



          handleChangeProject(projectObj){
            // 更新项目信息
            this.packBtnVisible = false;
            this.isPosition = false;
            this.stageList = [{"id": '', "name": "全部", "completeFlag": 0}];//清空阶段列表
            this.search.proStageList = [];
            this.publicData.projectId = projectObj.id;
            this.uploadParamData.projId = projectObj.id;//文件上传初始化需要的相关数据
            this.uploadParamData.auditProjectId = this.publicData.processId;
            this.publicData.projectName = this.$store.state.projectMsg.projectMsg.name;
            this.publicData.projectCreatBy = this.$store.state.projectMsg.projectMsg.createBy;
            this.publicData.pathNameList = [];
            this.copySourceData.projId = this.$store.state.projectDocCopy.projId;
            this.copySourceData.sourceProjId = this.$store.state.projectDocCopy.sourceProjId;
            // 清空筛选条件
            this.bread_crumbs = [{title: "根目录", parentId: 0}];
            this.search.pageNo = 0;
            this.search.pageSize = 100;
            this.publicData.docParentId = 0;
            this.reset()
            this.$refs.multipleTable.clearSort()//重置表格排序
            this.orderFlag = '';
            //查询
            this.queryStage(1);
            this.queryDoc()

          },


            // folderBack(obj,index){
            //   var len = this.folderList.length - (index+1);
            //   this.publicData.docParentId = obj.id;
            //   this.folderList.splice(index+1,len);
            //   this.queryDoc();
            // },
            //选择角色
            //通过消息中心定位到文件
            docPositionQuery(callBack){
            // console.log(33633, callBack)
                var that = this;
                var data = {
                    "token": that.token,
                    "userId": that.userId,
                    "data": {
                        "id": this.positionDocId,
                        "projectId": this.publicData.projectId,
                        "chatOrMsg": 0
                        //docName: this.positionDocName
                    }
                }
                that.$post("/doc/project/position", data)
                    .then( (response)=> {
                        var data =  response.data;
                        if (that.success_code == response.code) {
                            that.publicData.projectId = data.projectId;//项目ID
                            that.publicData.processId = data.auditProjectId;//项目阶段ID
                            that.publicData.processName = data.stageName;//项目阶段名称
                            that.uploadParamData.auditProjectId = data.auditProjectId;//项目阶段ID
                            that.publicData.docParentId = data.parentId;//所在目录ID 0 为顶级目录
                            // console.log('父级id',that.publicData.docParentId)
                            that.copySourceData.parentId = data.parentId; //复制剪切目标父级ID
                            that.search.pageNo = data.nowPage;
                            // that.search.pageNo = 0;
                            var len = data.parent.length -1;
                            var projectData = data.project;
                            for(var i = len;i>=0;i--){
                                var obj = {};
                                obj.title = data.parent[i].docName;
                                obj.parentId = data.parent[i].id;
                                that.bread_crumbs.push(obj);
                                that.publicData.pathNameList.push(data.parent[i].docName);
                            }
                            that.$store.commit("projectId",that.publicData.projectId);
                            that.$store.commit("projectMsg",projectData);
                            that.$store.commit("projectMsgname",projectData.name);

                          // todo 模块化--定位切换项目
                          that.$utils.saveProjectId(that.publicData.projectId)
                          that.$utils.queryProChatNum(that.publicData.projectId)
                          that.$utils.queryProExamNum(that.publicData.projectId)
                            callBack && callBack();
                          let isDraftPosition = that.publicData.processId == 0 && data.parent[0] && data.parent[0].docName == '底稿上传';
                          if(!isDraftPosition){
                            that.queryDocIdForBarth();
                          }
                        }
                    })
                    .catch(function (error) {

                    });
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            // handleSelectionChange(val) {
            //     this.multipleSelection = val;
            // },
            roles(){
                var data={
                    pageNo:0,
                    pageSize:20,
                    token:this.token,
                    userId:this.userId,
                    data:{}
                }
                var _this=this
                this.$post('/sys/getQueryRole', data).then((response)=> {
                    _this.roledata=response.data
                    _this.Role={state:2}
                    _this.$store.commit("setdatas", _this.setdata);
                    _this.flags=true
                }).catch(function(error) {

                });
            },
            //选择角色确定
            statesboxs(data){
                this.setdata = data
                if (this.strs !== "") {
                    this.strs = Array.from(new Set(this.setdata));
                    this.flags=false
                    var chgArr = [];
                    for (var i = 0; i < this.strs.length; i++) {
                        var flag = true;
                        if (flag) {
                            chgArr.push(this.strs[i]);
                            this.roleIds.push(this.strs[i].id)
                        };
                    };
                    this.strs = chgArr;
                }
            },
            //删除选择角色
            handle_Closerole(num) {
                //console.log(num);
                this.strs.splice(num, 1);
                this.roleIds.splice(num,1)
            },
            //renyun
            findAllUser(data) {
                // console.log(data, 123)
              if(!data || !data.length){
                this.findFlag = false;
                this.findState = {};
                this.checkState = {};
                if (this.user_num == 1) {
                  this.deployObj = []
                }
                if (this.user_num == 2) {
                  this.ccObj = []
                }
                return
              }
                if (this.user_num == 1) {
                    var dtt = data;
                    this.deployObj = dtt
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
                                };
                            };
                            if (flag) {
                                chgArr.push(this.deployObj[i]);
                                this.chosepersonIds.push(this.deployObj[i].userId)
                            };
                        };
                        this.deployObj = chgArr
                    }
                    this.findUserObj = data
                } else {
                    var cco = data;
                    this.ccObj = cco
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
                                ;
                            }
                            ;
                            if (flag) {
                                chgArr.push(this.ccObj[i]);
                            }
                            ;
                        }
                        ;
                        this.ccObj = chgArr
                    }
                    this.findUserObjM = data
                }
            },
               //删除选择人员
            handleClose(num) {
                this.ccObj.splice(num, 1);
                this.chosepersonIds.splice(num,1)
            },
            handle_Close(num, ind) {
                if (ind == 0) {
                    this.deployObj.splice(num, 1);
                    this.chosepersonIds.splice(num,1)
                } else {
                    this.ccObj.splice(num, 1);
                }
            },
            //
            optPrinFn(num) {
                this.findFlag = true;
                this.user_num = num;
                // console.log('设置提醒', num)
                if (num == 1) {
                    this.findState = {state: 0};
                    this.checkState = {state: 2};
                  this.findUserObj = this.$utils.cloneDeepArray(this.deployObj)
                } else {
                    this.findState = {state: 0};
                    this.checkState = {state: 2};
                  this.findUserObjM = this.$utils.cloneDeepArray(this.ccObj)
                }
            },
            //  点击面包屑返回目录
            backDir(item) {
                this.rightmenuIsShow = false;
                let index = this.bread_crumbs.findIndex(v=>v.parentId===item.parentId)
                this.$refs.multipleTable.clearSort()
                this.orderFlag = '';
                // if (index == this.bread_crumbs.length - 1) {
                //   return;
                // } else if(index == 0){
                //   this.publicData.docParentId = 0;
                //   this.uploadParamData.parentId = 0;
                //   $('.stage-list li a').removeClass('cur');
                //   $('.stage-list li a').eq(0).addClass('cur');
                //   this.publicData.processId = '';
                //   this.uploadParamData.auditProjectId = '';
                //   this.publicData.processName = '全部';
                // } else {
                //   this.publicData.docParentId = item.parentId;
                // }
                if (index == this.bread_crumbs.length - 1 && this.bread_crumbs.length == 1) {
                    this.currentPage = 1;
                    this.search.pageNo = 0;
                    this.queryDoc();
                    return;
                } else {
                    this.currentPage = 1;
                    this.search.pageNo = 0;
                    if (item.title == "根目录" && this.noteAll == 1) {
                        this.publicData.processId = "";
                        this.stageIsAll = true;
                        $('.stage-list li a').removeClass('cur');
                        $('.stage-list li a').eq(0).addClass('cur');
                        this.publicData.docParentId = item.parentId;
                        this.copySourceData.parentId = item.parentId;
                        this.bread_crumbs.splice(index + 1);
                        this.queryDocId(this.queryDoc);
                        // this.queryDoc();
                    } else {
                        // console.log('11111111111111111111',item.parentId)
                        this.publicData.docParentId = item.parentId;
                        this.copySourceData.parentId = item.parentId;
                        this.bread_crumbs.splice(index + 1);
                        this.queryDoc();
                    }
                }
            },
            //  全选全不选
            checkallChangeFn() {
                for (var i = 0; i < this.tableData.length; i++) {
                    if (this.allchecked) {
                        this.tableData[i]["checked"] = true;
                    } else {
                        this.tableData[i]["checked"] = false;
                    }
                }
            },
            chekcsChange() {
                this.$forceUpdate();
                for (var i = 0; i < this.tableData.length; i++) {
                    if (!this.tableData[i]["checked"]) {
                        this.allchecked = false;
                    }
                }
            },
            stageBtn(val, event) {
                var el = event.currentTarget;
                $('.stage-list li a').removeClass('cur');
                $(event.currentTarget).addClass('cur');
                if ($(".note_all").hasClass("cur")) {
                    this.noteAll = 1;
                    // this.bread_crumbs[0].parentId = 0;
                    // this.publicData.docParentId = 0;
                } else {
                    this.noteAll = 0;
                }
                if(val.sealFlag == 1){
                  this.stageIsPlaceFile = true;
                } else {
                  this.stageIsPlaceFile = false;
                }
                if(val.name == '全部' && val.id == ''){
                  this.stageIsAll = true;
                } else {
                  this.stageIsAll = false;
                  this.stageSource = false
                }
                this.curStage = val;
                this.publicData.processId = val.id;
                this.bread_crumbs[0].parentId = val.id;
                this.uploadParamData.auditProjectId = val.id;
                this.publicData.processName = val.name;
                this.currentPage = 1;
                this.search.pageNo = 0;
                this.$refs.multipleTable.clearSort()//重置表格排序
                this.orderFlag = '';
                this.queryDocId(this.queryDoc);
                this.bread_crumbs.splice(1, this.bread_crumbs.length - 1);
            },
            //右键监听事件
            rightMenuClickFn(data) {
                if (!data) return;
                switch (data) {
                    case "open":
                        this.open();
                        break;
                    case "preview":
                        this.docView();
                        break;
                    case "download":
                        this.downloadFileBtn();
                        break;
                    case "upload":
                        this.uploadVsion([this.right_click_data],2);
                        break;
                    case "delete":
                        this.deletetDoc();
                        break;
                    case "rename":
                        this.isCanReName();
                        break;
                    case "copy":
                        this.docCopy();
                        break;
                    case "cut":
                        this.docCut();
                        break;
                    case "paste":
                        this.docPaste();
                        break;
                    case "lock":
                        this.docLockFn();
                        break;
                    case "unlock":
                        this.docUnLock();
                        break;
                    case "permission":
                        this.docPowerFn();
                        break;
                    case "attributes":
                        this.rightMenuNatureFn();
                        break;
                    case "docDiscuss":
                        this.docDiscuss();
                        break;
                }
            },
            backBtn() {
                this.publicData.docParentId = 0;
                this.uploadParamData.parentId = 0;
                $('.stage-list li a').removeClass('cur');
                $('.stage-list li a').eq(0).addClass('cur');
                this.publicData.processId = '';
                this.uploadParamData.auditProjectId = '';
                this.publicData.processName = '全部';
                // this.folderList = [];
                this.queryDoc();
            },
            docExamdeleDoc(index) {
                // this.selectedDoc[index].isShow = false;
                //this.docExamselectedDoc.splice(index, 1);
            },
            dateChange(val) {
                let newVal = val;
                this.search.searchList.starTime = this.dateToMs(newVal[0]);
                this.search.searchList.endTime = this.dateToMs(newVal[1]) + 86400000;//结束时间加上24小时
            },
            //中国标准时间转为毫秒
            dateToMs(date) {
                let result = new Date(date).getTime();
                return result;
            },
            isCanReName() {
                this.docReName();
                // this.canOperating(
                //     { docId: this.selectedDoc[0].docId, view: this.permsType["view"] },
                //     "view"
                //   ).then(res => {
                //     if (res) {
                //       this.docReName();
                //     }
                // });
            },
            //  右键重命名
            docReName() {
                if (this.right_click_data.auditStatus == 8) {
                    this.$message({
                        message: "归档文件不可重命名",
                        type: "warning"
                    });
                    return;
                } else if (this.right_click_data.delAllow == 0 || this.right_click_data.lockState) {
                    this.$message({
                        message: "该文件不允许重命名",
                        type: "warning"
                    });
                    return;
                } else {
                    var _this = this;
                    this.canOperating(
                        {docId: this.docInitList[this.reNameIndex].id, view: this.permsType["reName"]},
                        "reName"
                    ).then(res => {
                        if (res) {
                            if ($(".rename_box").length > 0) {
                                this.$message({
                                    message: "请先关闭另外一个文件的重命名输入",
                                    type: "warning"
                                });
                                return;
                            }
                            if(this.right_click_data.docType == 0){//文件直接判断
                                if (this.right_click_data.auditStatus===0) {//审批中
                                    this.$message({
                                        message: "审批中的文件不能重命名，请重新选择。",
                                        type: "warning"
                                    });
                                    return;
                                }
                                this.showReNameInput();
                            } else {//文件夹调接口验证
                                let arr = [];
                                arr.push(this.docInitList[this.reNameIndex].id);
                                this.showReNameInput();
                                // this.docStateJudge(arr, 1).then(res => {
                                //     if(res.code != this.success_code){
                                //         this.$message({
                                //             message: res.msg,
                                //             type: "warning"
                                //         });
                                //         // return;
                                //     } else if(res.code === this.success_code){
                                //         this.showReNameInput();
                                //     }
                                // })
                            }
                        }
                    });
                }
            },
            showReNameInput(){
                var _this = this;
                var myReNameIndex = this.reNameIndex;
                this.reNameDocData = this.right_click_data
                var name = $(".name_col").eq(this.reNameIndex).attr('title');
                if (this.right_click_data.docType != 1) {
                    name = name.replace(name.substr(name.lastIndexOf(".")), "");
                    var oldName = name;
                }
                $(".name_col").eq(this.reNameIndex).children()
                    .css("display", "none");
                var dom = $(
                    '<div class="rename_box">' +
                    '<input class="el-input__inner rename_input" placeholder="请输入文件夹名称" style="width:300px;" maxlength="250" value="' +
                    name +
                    '">' +
                    '<i class="el-icon-error icon_btn rename_cancle_btn" style="margin-left: 8px;font-size: 20px;cursor: pointer;color: #efb87f;" title="取消"></i>' +
                    '<i class="el-icon-success icon_btn save_cancle_btn" style="margin-left: 8px;font-size: 20px;cursor: pointer;color: #add7a0;" title="确定"></i>' +
                    "</div>"
                );
                $(".name_col")
                    .eq(myReNameIndex)
                    .append(dom);
                $(".rename_cancle_btn").on("click", function () {
                    $(".rename_box").remove();
                    $(".name_col")
                        .eq(myReNameIndex)
                        .children()
                        .css("display", "block");
                    $(".name_cell")
                        .eq(myReNameIndex)
                        .css({display: "block"});
                });
                $(".save_cancle_btn").on("click", function () {
                    // console.log(111)
                    var name = $(".rename_input").val();
                    if (oldName != name) {
                        // name = name.replace(/[\,\|\/\'\*\:\;\"\L\<\>\?\\]/g, "");
                        let reg = /[\\/:*?"<>|]/g;
                        if(reg.test(name)){
                            _this.$message.warning('不能包含特殊字符\/:*?"<>|');
                            return;
                        }
                        _this.reNameTest(name);
                    } else {
                        $(".rename_box").remove();
                        $(".name_col")
                            .eq(myReNameIndex)
                            .children()
                            .css("display", "block");
                        $(".name_cell")
                            .eq(myReNameIndex)
                            .css({display: "block"});
                    }
                });
            },
            //  右键事件
            rightEvent(data, index) {
                // console.log(data)
                // console.log(index)
                var e = event;
                e.preventDefault();
                e.stopPropagation()
                let doc = false;
                let folder = false;
                if (data) {
                    this.$refs.multipleTable.toggleRowSelection(data, true);
                    this.$select.handleFileSelect(1, this.publicData.projectId, this.publicData.projectId, [data])
                    this.reNameIndex = data.myIndex;
                    this.right_click_data = data;

                    // if(this.selectedDoc.length == 0){
                    //     this.toggleSelection([data]);
                    // } else {
                    //     var curIsSele = false;
                    //     for(var i=0;i<this.selectedDoc.length;i++){
                    //         if(this.selectedDoc[i].id == data.id){
                    //             curIsSele = true;
                    //         }
                    //     }
                    //     if(!curIsSele){
                    //         this.$refs.multipleTable.clearSelection();
                    //         this.toggleSelection([data]);
                    //     }
                    // }
                }
                for(var k=0;k<this.selectedDoc.length;k++){
                    if(this.selectedDoc[k].docType == 1){
                        folder = true;
                    } else if(this.selectedDoc[k].docType == 0){
                        doc = true;
                    }
                }
                if(doc && folder){
                    this.hasDocAndFolder = true;
                } else {
                    this.hasDocAndFolder = false;
                }
                this.rightmenuIsShow = true;
                this.$nextTick(() => {
                    this.rightmenuIsShow = true;
                });
                $("#rightM").css("display", "none");
                setTimeout(() => {
                    $("#rightM").css({
                        top: e.clientY + 10,
                        left: e.clientX + 10,
                        display: "block"
                    });
                    if (e.clientY + 10 >= $(window).height() - $("#rightM").height()) {
                        $("#rightM").css({
                            top: $(window).height() - $("#rightM").height() - 20
                        });
                    } else if (e.clientX + 10 >= $(window).width() - $("#rightM").width()) {
                        $("#rightM").css({
                            left: $(window).width() - $("#rightM").width() - 20
                        });
                    }
                }, 10);
            },
            open() {
                let row = this.right_click_data;
                if (row.docType == 1) {
                    this.bread_crumbs.push({
                        title: row.docName,
                        parentId: row.id
                    });
                    this.currentPage = 1;
                    this.search.pageNo = 0;
                    if (row.delAllow == 0) {
                        let name = row.docName;
                        for (var i = 0; i < this.stageList.length; i++) {
                            if (this.stageList[i].name == name) {
                                $('.stage-list li a').removeClass('cur');
                                $('.stage-list li').eq(i).children().addClass('cur');
                                this.publicData.processId = this.stageList[i].id;
                                this.uploadParamData.auditProjectId = this.stageList[i].id;
                            }
                        }
                        this.publicData.docParentId = row.id;
                        this.uploadParamData.parentId = row.id;
                        this.publicData.pathNameList.push(row.docName);
                        this.copySourceData.parentId = row.id; //目标父级ID
                        // this.$store.commit("projectDocPaste", this.copySourceData);
                        this.queryDoc();
                    } else {
                        this.publicData.docParentId = row.id;
                        this.uploadParamData.parentId = row.id;
                        this.publicData.pathNameList.push(row.docName);
                        this.copySourceData.parentId = row.id; //目标父级ID
                        // this.$store.commit("projectDocPaste", this.copySourceData);
                        this.queryDoc();
                    }
                }
            },
            getDblClickId(row, event, column) {
                // 处理双击复选框的情况
                if(column.type==="selection") return
                if (row.docType == 1) {
                    for (var i = 0; i < this.bread_crumbs.length; i++) {
                        if (row.id == this.bread_crumbs[i].parentId) {
                            return;
                        }
                    }
                    this.bread_crumbs.push({
                        title: row.docName,
                        parentId: row.id
                    });
                    this.$refs.multipleTable.clearSort()//重置表格排序
                    this.orderFlag = '';
                    this.currentPage = 1;
                    this.search.pageNo = 0;
                    if (row.delAllow == 0) {
                        this.stageIsAll = false;
                      let name = row.docName;
                        for (var i = 0; i < this.stageList.length; i++) {
                            if (this.stageList[i].name == name) {
                                $('.stage-list li a').removeClass('cur');
                                $('.stage-list li').eq(i).children().addClass('cur');
                                this.publicData.processId = this.stageList[i].id;
                                this.bread_crumbs[0].parentId = this.stageList[i].id;
                                this.uploadParamData.auditProjectId = this.stageList[i].id;
                                this.stageList[i].sealFlag == 1 ? this.stageIsPlaceFile =  true : this.stageIsPlaceFile =  false;
                            }
                        }
                        this.publicData.docParentId = row.id;
                        this.uploadParamData.parentId = row.id;
                        this.publicData.pathNameList.push(row.docName);
                        this.copySourceData.parentId = row.id; //目标父级ID
                        // this.$store.commit("projectDocPaste", this.copySourceData);
                        this.queryDoc();
                    } else {
                        this.publicData.processId = row.auditProjectId;
                        this.publicData.docParentId = row.id;
                        this.uploadParamData.parentId = row.id;
                        this.publicData.pathNameList.push(row.docName);
                        this.copySourceData.parentId = row.id; //目标父级ID
                        // this.bread_crumbs[0].parentId = row.id;
                        // this.$store.commit("projectDocPaste", this.copySourceData);
                        this.queryDoc();
                    }
                  // row.docSource == 15 为底稿上传
                  row.docSource == 15 ? this.stageSource = true : this.stageSource = false
                } else {
                    //双击预览
                    this.dbrowData = row;
                    this.canOperating(
                        {docId: row.id, view: this.permsType["view"]},
                        "view"
                    ).then(res => {
                        if (res) {
                            // 判断项目是否是已终止状态
                            if( this.isPC && (this.$store.state.projectMsg.projectMsg.endFlag  && this.$store.state.projectMsg.projectMsg.endFlag === 1)){
                                this.$store.commit('projectStatusTips');
                                return;
                            }
                            // PC端预览格式限制
                            if(this.isPC && !this.$globalConfig.docTypeLimit.pcTypeCheck(row.type)) {
                                this.$message.warning('该文件类型暂不支持在线编辑，请下载查看！')
                                return
                            }
                            var proViewData = {
                                rfsId: row.rfsId,
                                docId: row.docId,
                                photoType: row.type,
                                sourceType: 'projectDoc',
                                docName: row.docName,
                                sourceName: '项目文档'//记录日志用
                            }
                            sessionStorage.setItem("proDocViewDownId", row.id);
                            row.source = '0';
                            if(this.isPC) {
                              row.sourceName = '项目文档'
                              row.projectName = this.publicData.projectName
                            }
                          this.isPC
                            ? window.ChromeMain.CS_Main_OpenFile(JSON.stringify(row)) // PC端双击在线编辑
                            : this.$store.commit('previewAllFn', proViewData) // web端预览
                        }
                    });
                }
            },
            testFn(v) {
                let options={
                multiple: true,
                accept: ""
                }
                this.uploadParamData.auditProjectId = this.publicData.processId
                this.uploadParamData.parentId = this.publicData.docParentId
                this.uploadParamData.projId = this.publicData.projectId
                // console.log('testFn',this.uploadParamData)
                v==='file'
                  ? this.$refs['RdUploader'].openSelect(options, this.uploadParamData)
                  : this.$refs['RdUploader'].uploadFolder(this.uploadParamData, 0)

            },
            docPowerFn() {
                // var hasPower = rightProPermissionFn(this.publicData.projectId,'project_file_upload')
                rightSysPermissionFn(this.publicData.projectId, 'project_file_upload')
                if (this.selectedDoc.length == 0 || this.selectedDoc.length > 1) {
                    this.$message({
                        message: "请选择一条数据",
                        type: "warning"
                    });
                    return;
                } else {
                    if (this.selectedDoc[0].docType == 1) {
                        this.$message({
                            message: "文件夹不能设置权限，请选择文件",
                            type: "warning"
                        });
                        return;
                    } else if (this.userId == this.selectedDoc[0].createBy || this.userId == this.publicData.projectCreatBy) {
                        this.powerSetIsShow = true;
                        this.queryPerson();
                        this.queryPersonPower();
                    } else {
                        this.$message({
                            message: "无对应权限,请联系对应项目组负责人处理",
                            type: "warning"
                        });
                    }
                }
            },
            uploadVsion(docList, btnType) {
                // 判断项目状态 已终止禁止操作
                if(this.$store.state.projectMsg.projectMsg.endFlag  && this.$store.state.projectMsg.projectMsg.endFlag === 1){
                    this.$store.commit('projectStatusTips');
                    return;
                }
                this.uploadVisionDoc = btnType == 1 ? this.selectedDoc[0] : this.right_click_data;
                let curData = docList[0]
                if(this.stageIsAll) {
                    this.$message.warning('全部阶段下的文件不允许上传新版本')
                    return;
                }
                if (curData.length > 1 || curData.length == 0) {
                    this.$message.warning("只能对一个文件上传新版本");
                    return;
                }
                //   let curData = this.right_click_data;

                if (curData["docType"] != "0") {
                    this.$message.warning("文件夹不支持上传新版本，请选择文件");
                    return;
                }
                if (curData.auditStatus == 8) {
                    this.$message.warning('归档文件不可上传新版本');
                    return;
                }
                if (curData.lockState) {
                    this.$message.warning('已锁定的文件不能上传新版本，请重新选择');
                    return;
                }


                let hasPower = this.$utils.checkProjectPermissionAjax(this.publicData.projectId,'project_file_upload')

                //   console.log('hasPower', hasPower)

                if(!hasPower.data) {
                    this.$message.error(hasPower.msg)
                    return
                }

                let arr = [];
                arr.push(curData.id);

                let stateCheckResult = this.checkDocStatusAjax(arr, 2)

                //   console.log('stateCheckResult', stateCheckResult)

                if(!stateCheckResult.data){
                    this.$message.error(stateCheckResult.msg)
                    return;
                }
                // PC端上传新版本
                if(this.isPC) {
                    let params = {
                        userId: this.userId,
                        token: this.token,
                        projectId: curData.projectId,
                        loginType:'PC',
                        sourceName: "项目文档",
                        projectName: this.$store.state.projectMsg.projectMsg.name,
                        data: {
                            docSource: 0,
                            docId: curData.docId,
                            id: curData.id,
                            docName: curData.docName,
                            projId: curData.projectId,
                            updateBy: this.userId,
                            parentId: curData.parentId,
                            auditProjectId: curData.auditProjectId,
                            type: curData.type
                        }
                    }
                    window.ChromeMain.CS_Main_UploadNewVersionDoc(JSON.stringify(params))
                    return
                }
                this.versionIsShow = false;
                let accept = ''
                let type = curData.type

                if(type == 'doc' || type == 'docx'){
                    accept = "doc,docx";
                } else if(type == 'xls' || type == 'xlsx') {
                    accept = "xls,xlsx";
                } else if(type == 'rtf'){
                    accept = "doc,docx,rtf";
                } else {
                    accept = type;
                }

                let data = {
                    id: curData.id,
                    projId: curData.projectId,
                    docSource: 0, // 项目文档
                    docId: curData.docId,
                    parentId: curData.parentId,
                    auditProjectId: curData.auditProjectId
                };
                let options = {
                    multiple: false,
                    accept: accept
                }

                this.$refs['RdUploader'].openSelect(options,data,true)

            },
            queryStage(num) { // 查询阶段
                let vm = this;
                let data = {
                    token: this.token,
                    userId: this.userId,
                    data: {
                        projectId: this.publicData.projectId
                    }
                };
                this.$post("/info/project/getImplementStageList", data)
                    .then( (response)=> {
                      if (vm.success_code == response.code) {
                            let data = response.data;
                            if(data.length == 0){
                                this.stageIsAll = true;
                            }
                            vm.stageList = [
                                {
                                'id': '',
                                'name': '全部',
                                'completeFlag': 0
                                }
                            ]
                            // vm.stageList = data;
                            if(vm.isPosition){
                                let posDocStageIndex = 0;
                                for (let i = 0; i < data.length; i++) {
                                    vm.stageList.push(data[i]);
                                    vm.search.proStageList.push(data[i]);
                                    // if (data[i].completeFlag === 1 || (data[i].startTime != null && data[i].endTime == null)) {
                                    //     vm.publicData.processId = data[i].id;
                                    //     vm.publicData.processName = data[i].name;
                                    //     data[i].sealFlag == 1 ? vm.stageIsPlaceFile =  true : vm.stageIsPlaceFile =  false;
                                    // }
                                    if(vm.publicData.processId === data[i].id){
                                        data[i].sealFlag == 1 ? vm.stageIsPlaceFile =  true : vm.stageIsPlaceFile =  false;
                                        posDocStageIndex = i + 1;
                                        vm.publicData.processName = data[i].name;
                                    } else if(vm.publicData.processId === null){
                                        data[i].sealFlag == false;
                                        posDocStageIndex = 0;
                                        vm.publicData.processName = '全部';
                                        vm.stageIsAll = true;
                                    }
                                    if (data[i].completeFlag === 1 || (data[i].startTime != null && data[i].endTime == null)) {
                                        vm.publicData.proCurProcessName = data[i].name;//传给审批弹窗的当前阶段名称，切换阶段不更新
                                    }
                                }

                                setTimeout(function () {
                                    $(".stage-list ul a").eq(posDocStageIndex).addClass("cur");
                                    $(".stage-list .active:first").addClass("note_all");
                                }, 100);

                                if(num == 1){
                                    vm.queryDocId();
                                }
                            } else {
                                for (let i = 0; i < data.length; i++) {
                                    vm.stageList.push(data[i]);
                                    vm.search.proStageList.push(data[i]);
                                    if (data[i].completeFlag === 1 || (data[i].startTime != null && data[i].endTime == null)) {
                                        vm.publicData.processId = data[i].id;
                                        vm.publicData.processName = data[i].name;
                                        vm.publicData.proCurProcessName = data[i].name;//传给审批弹窗的当前阶段名称，切换阶段不更新
                                        data[i].sealFlag == 1 ? vm.stageIsPlaceFile =  true : vm.stageIsPlaceFile =  false;
                                    }
                                }
                                vm.queryDocId(vm.queryDoc);
                                setTimeout(function () {
                                    $(".stage-list .active:last").addClass("cur");
                                    $(".stage-list .active:first").addClass("note_all");
                                }, 100);
                            }
                            // 更新阶段的‘更多’按钮样式
                            this.$nextTick(()=>{
                                this.isShowMoreStageBtn()
                            })
                        }
                        // callBack && callBack();
                    })
                    .catch(function (error) {

                    });
            },
            //根据阶段ID查询对应文件夹的ID
            queryDocId(callBack) {
                let vm = this;
                let data = {
                    "token": this.token,
                    "userId": this.userId,
                    "data": {
                        "projectId": this.publicData.projectId,
                        "stageName": this.publicData.processName
                    }
                }
                this.$post("/doc/project/queryByStageName", data)
                    .then( (response)=> {
                        if (vm.success_code == response.code) {
                            vm.publicData.docParentId = response.data;
                            vm.uploadParamData.parentId = response.data;
                            vm.bread_crumbs[0].parentId = response.data;
                            vm.copySourceData.parentId = response.data; //目标父级ID
                            // vm.$store.commit("projectDocPaste", vm.copySourceData);
                        } else {

                            vm.copySourceData.parentId = 0; //目标父级ID
                            // vm.$store.commit("projectDocPaste", vm.copySourceData);
                            vm.publicData.docParentId = 0;
                            vm.bread_crumbs[0].parentId = 0;
                            vm.uploadParamData.parentId = 0;
                        }
                        callBack && callBack();
                    })
                    .catch(function (error) {

                    });
            },
            //定位时为路径导航根目录赋予parentId
            queryDocIdForBarth() {
                let vm = this;
                let data = {
                    "token": this.token,
                    "userId": this.userId,
                    "data": {
                        "projectId": this.publicData.projectId,
                        "stageName": this.publicData.processName
                    }
                }
                this.$post("/doc/project/queryByStageName", data)
                    .then( (response)=> {
                        if (vm.success_code == response.code) {
                            vm.bread_crumbs[0].parentId = response.data;
                        } else {
                            vm.copySourceData.parentId = 0; //目标父级ID
                            // vm.$store.commit("projectDocPaste", vm.copySourceData);
                            vm.publicData.docParentId = 0;
                            vm.bread_crumbs[0].parentId = 0;
                            vm.uploadParamData.parentId = 0;
                        }
                    })
                    .catch(function (error) {

                    });
            },
            queryDoc(parentId) {
                // console.log('666',this.publicData.docParentId)
                // alert(JSON.stringify(`queryDoc-pid: ${parentId}`))
              // PC端上传成功后刷新列表, 如果当前目录不是上传时的目录则不刷新页面
              if(this.isPC && (parentId != this.publicData.docParentId) && parentId != undefined) {
                return
              }
            //   alert('pass')
              let vm = this;
              // this.search.searchList.starTime = this.dateToMs(newVal[0]);
              // this.search.searchList.endTime = this.dateToMs(newVal[1]) + 86400000;//结束时间加上24小时
              let startTime = this.dateToMs(this.search.searchList.starTime) || "";
                let endTime = (this.dateToMs(this.search.searchList.endTime) + 86400000) || "";
                var curStageText = $('.stage-list li a.cur').text();
                let auditProjectIds = [];
                auditProjectIds.push(this.publicData.processId);
                let searchStageName = [];
                if(this.search.searchList.proStage != ''){
                    this.search.proStageList.forEach(v => {
                        if (v.id == this.search.searchList.proStage) {
                            searchStageName.push(v.name);
                        }
                    })
                }
                let data = {
                    token: this.token,
                    userId: this.userId,
                    pageNo: this.search.pageNo,
                    pageSize: this.search.pageSize,
                    sourceName:'项目文档',//页面位置，记录日志用
                    projectName: this.publicData.projectName,//项目名称，记录日志用
                    data: {
                        projectId: this.publicData.projectId,
                        docContent: this.search.searchList.conKey,
                        auditProjectIds: auditProjectIds, //项目阶段ID
                        parentId: this.publicData.docParentId, //所在目录ID 0 为顶级目录
                        docName: this.search.searchList.titleKey,
                        beginTime: startTime, //文件创建开始时间
                        endTime: endTime, //文件创建结束时间
                        suffixList: this.search.searchList.fileTypesSel, //文件类型（后缀名）
                        fileStatus: this.search.searchList.fileStateSel,
                        dirStatus: this.search.searchList.dirStateSel,
                        idSet: [],
                        orderFlag: this.orderFlag,
                        isSearch: false,
                        auditProjectNames: searchStageName,
                        //"docType": "0"文件类型（文件 0 /文件夹 1）不是只加载目录树就不用传
                    }
                };
                this.$post("/doc/project/queryFileByCondition", data)
                    .then( (response)=> {
                      if (vm.success_code == response.code) {
                        //   console.log(987654)
                            vm.docInitList = response.data.content;
                            $(".new-creat").remove();
                            $(".rename_box").remove();
                            $(".name_col").children().css("display", "block");
                            $(".name_cell").css({display: "block"});
                            vm.docTypeIcon(vm.docInitList);
                            vm.queryDocStatus();
                            // this.docInListIds =
                            vm.search.dataCount = response.data.totalElements;
                            vm.search.pageCount = response.data.totalPages;
                            if(vm.search.pageNo + 1 > vm.search.pageCount){
                                vm.search.pageNo = vm.search.pageCount - 1;
                                this.queryDoc()
                            }
                            vm.currentPage = vm.search.pageNo + 1;
                            if(!this.isChatPosition){
                                this.docInitList.forEach(item => {
                                    if(item.id == this.positionDocId) {
                                        // console.log('选中0000000000')
                                        this.$select.handleFileSelect(1, +this.publicData.projectId, +this.publicData.projectId, [item])
                                    }
                                    return
                                })
                            }
                            // for(var i=0;i<that.docInitList.length;i++){
                            //     if(that.positionDocId == that.docInitList[i].id){

                            //         that.positionDocIndex = i;
                            //         that.queryDocComplete = true;
                            //     }
                            // }
                                // console.log(1111111111111,this.publicData.projectId,vm.docInitList)
                            this.$select.handleDisplaySelection(1,this.publicData.projectId,this.publicData.projectId,vm.docInitList).then(res=>{
                                // console.log('handleDisplaySelection-doc', res)
                                if(!res || !res.length) return
                                res.forEach(v=>{
                                    let idx =  vm.docInitList.findIndex(m=>m.id===v)
                                    // console.log(idx)
                                     this.$nextTick(()=> {
                                        vm.$refs.multipleTable.toggleRowSelection(vm.docInitList[idx],true);
                                    })
                                })

                            })
                            for (let i = 0; i < vm.docInitList.length; i++) {
                                vm.docInitList[i].showReName = false;
                                if (vm.docInitList[i].docName.length > 30) {
                                    vm.docInitList[i].subName = (vm.docInitList[i].docName).substring(0, 30) + '……';
                                } else {
                                    vm.docInitList[i].subName = vm.docInitList[i].docName;
                                }

                                // 聊天页面打开的不需要勾选!this.$route.query.isOpen && 
                                if(vm.positionDocId == vm.docInitList[i].id){
                                    vm.positionDocIndex = i;
                                    vm.queryDocComplete = true;
                                    this.$nextTick(()=> {
                                        vm.$refs.multipleTable.toggleRowSelection(vm.docInitList[vm.positionDocIndex],true);
                                        // console.log("positionDocIndex", vm.positionDocIndex)

                                        let manuBox = $('#el_main .el-scrollbar__wrap');
                                        manuBox.animate({ scrollTop: manuBox.outerHeight(true) }, 350);
                                        let height = $(`#multipleTable .el-table__body tbody .el-table__row:nth-child(${ i })`).prop("offsetTop")
                                        // console.log('height', height)
                                        this.$refs.multipleTable.bodyWrapper.scrollTop=height+53

                                    })
                                    this.$select.handleFileSelect(1,this.publicData.projectId, this.publicData.projectId, [vm.docInitList[vm.positionDocIndex]])
                                    // 定位之后置为空，以免每次查询都会定位
                                    vm.positionDocId = ''
                                }
                                vm.docInitList[i]["size"] = vm.handleFileSize(
                                    vm.docInitList[i]["docSize"]
                                );
                                vm.docInitList[i]['myIndex'] = i;
                                vm.docInitList[i]["checked"] = false;
                            }
                            // /static/img/FolderType1.250d328.png
                            // for (var i = 0; i < vm.docInitList.length; i++) {

                            // }
                            if (vm.docInitList.length == 0) {
                                vm.noDataBol = true;
                            } else {
                                vm.noDataBol = false;
                            }

                            // _this.total = response.data.totalElements;
                            //vm.$forceUpdate();
                        }
                        // vm.tableLoading = false;
                    })
                    .catch(function (error) {
                    });
            },
            //获取文件状态列表
            queryDocStatus(){
                if(this.docInitList.length == 0) return;
                let idSet = [];
                this.docInitList.map(item=>{
                    idSet.push(item.id);
                })
                let sendData = {
                    token: this.token,
                    userId: this.userId,
                    projectId: this.publicData.projectId,
                    data: {
                        projectId: this.publicData.projectId,
                        idSet: idSet
                    }
                }
                this.$post('/doc/project/docStatusAll', sendData).then((response)=> {
                    if(this.success_code == response.code){
                        let data = response.data;
                        this.docInitList.map((item, index)=>{
                            for(let key in data){
                                if(item.id == key){
                                    for(let type in data[key]){
                                         this.$set(this.docInitList[index], type, data[key][type])
                                    }
                                }
                            }
                        })
                        // console.log('有状态了',this.docInitList)
                    }
                }).catch(function(error) {

                });
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
            },
            //分页
            handleSizeChange(val) {
                this.search.pageSize = val;
                this.queryDoc();
            },
            handleCurrentChange(val) {
                this.search.pageNo = val - 1;
                this.queryDoc();
            },
            reset() {
                this.search.searchList.titleKey = "";
                this.search.searchList.conKey = "";
                this.search.searchList.proStage = "";
                this.search.searchList.docType = "";
                this.search.searchList.starTime = "";
                this.search.searchList.endTime = "";
                this.$refs.docTypeEle.clearSel();
                this.$refs.docStateEle.clearSel();
                this.$refs.dirStateEle.clearSel();
            },
            changeProStage(val) {
                this.publicData.processId = val;
                this.uploadParamData.auditProjectId = val;
            },
            changeDocType() {
            },
            //新建文件夹
            insertFolder(name) {
                let vm = this;
                var name = name.replace(/[\,\|\/\'\*\:\;\"\L\<\>\?\\]/g, "");
                let data = {
                    token: this.token,
                    userId: this.userId,
                    sourceName:'项目文档',//页面位置，记录日志用
                    projectName: this.publicData.projectName,//项目名称，记录日志用
                    data: {
                        projectId: this.publicData.projectId,
                        docId: "", //新建文件夹为空
                        docType: 1, //文件类型（文件 0 /文件夹 1）不是只加载目录树就不用传
                        parentId: this.publicData.docParentId, //所在目录ID 0 为顶级目录
                        // docName: this.newCreatName,
                        docName: name,
                        rfsId: "", //文件夹为空,文件为返回的rfsId
                        auditProjectId: this.publicData.processId //项目阶段ID?
                    }
                };
                this.$post("/doc/project/insert", data)
                    .then( (response)=> {
                        if (vm.success_code == response.code) {
                            vm.queryDoc();
                            vm.newCreatName = "新建文件夹";
                            vm.newCreatShow = false;
                            vm.$message({
                                type: "success",
                                message: response.msg
                            });
                        } else {
                            vm.$message.error(response.msg);
                        }
                    })
                    .catch(function (error) {
                    });
            },
            //上传新版本
            docUploadVersion(uploadData) {
                let vm = this;
                let data = {
                    pageNo: 0,
                    pageSize: 10,
                    token: this.token,
                    userId: this.userId,
                    sourceName:'项目文档',//页面位置，记录日志用
                    projectName: this.publicData.projectName,//项目名称，记录日志用
                    data: {
                        docId: uploadData.fileData.data.docId,
                        // id: this.uploadVisionDoc.id,
                        id: uploadData.fileData.data.id,
                        docName: uploadData.fileData.name,
                        projId: uploadData.fileData.data.projId,
                        docSize: uploadData.fileData.size,
                        updateBy: this.userId,
                        docRfs: uploadData.fileData.rfsId
                    }
                };
                this.$post("/doc/project/addDocVersion", data)
                    .then( (response)=> {
                        if (vm.success_code == response.code) {
                          this.$refs['RdUploader'].handleUploadSuccess(uploadData.tId)
                            // vm.$refs.versionUploadRef.uploadComplete();
                        //   this.handleUpdateList(uploadData)
                            this.clearSelection()
                            console.log(12345)
                        } else {
                            vm.$message.error(response.msg);
                        }
                        //vm.versionUploadAddDocClose();
                    })
                    .catch(function (error) {
                    });
            },
            //文件上传
            docUpload(uploadData) {
                // console.log('文件信息',uploadData)
                let url = uploadData.isFolder ? '/doc/project/insertFileForFile' : "/doc/project/insert";
                let fileData = uploadData.fileData

                let vm = this;
                if(uploadData.isFolder){

                    let uploadDir = uploadData.fileData.uploadDir == undefined ? '' : uploadData.fileData.uploadDir;
                    let fileArr = fileData.webkitRelativePath.split("/");
                    const filePath = fileArr.slice(0, fileArr.length - 1).join("/");
                    var data = {
                        token: this.token,
                        userId: this.userId,
                        sourceName:'项目文档',//页面位置，记录日志用
                        projectName: this.publicData.projectName,//项目名称，记录日志用
                        data: {
                            docType: 0,
                            docId: uploadData.docId,
                            docName: fileData.name,//本地准备上传的文件名称
                            rfsId: fileData.rfsId,
                            parentId: fileData.data.parentId,//父级id
                            auditProjectId: fileData.data.auditProjectId,//阶段id
                            docSource: 0,//项目文档为0，底稿为1
                            updateBy: this.userId,
                            filePath,
                            projectId: fileData.data.projId,
                            uploadDir: uploadDir
                        }
                    }
                } else {
                    var data = {
                        token: this.token,
                        userId: this.userId,
                        sourceName:'项目文档',//页面位置，记录日志用
                        projectName: this.publicData.projectName,//项目名称，记录日志用
                        data: {
                            projectId: fileData.data.projId,
                            docId: uploadData.docId,
                            docType: 0, //文件夹为1，文件为0
                            parentId: fileData.data.parentId,
                            docName: fileData.name,
                            rfsId: fileData.rfsId,
                            auditProjectId: fileData.data.auditProjectId,
                            docSize: fileData.size
                        }
                    }
                };
                this.$post(url, data)
                    .then( (response)=> {
                        if (vm.success_code == response.code) {
                          this.$refs['RdUploader'].handleUploadSuccess(uploadData.tId)
                          console.log(1234)

                          // 插入已上传文件信息
                          this.insertUploadedFileDoc(response.data)
                        //   this.queryDoc()
                        } else {
                            vm.$message.error(response.msg);
                        }
                    })
                    .catch(function (error) {

                    });
            },
            insertUploadedFileDoc(data) {
                console.log('insertUploadedFileDoc', data)
                this.isPC && (data = JSON.parse(data))
                let fileProjectId = ''
                let fileParentId =  ''
                let projectId = this.publicData.projectId
                let curDirId = this.publicData.docParentId
                if(data.uploadDirYes) {
                    // 判断是否有文件夹信息
                    if(!data.parentInfo) return
                    // 判断是否在当前页面
                    fileProjectId = data.parentInfo.projectId
                    fileParentId = data.parentInfo.parentId


                } else {
                    fileProjectId = data.projectId
                    fileParentId = data.parentId
                }
                // 判断是否在当前目录下，如果再则更新列表，否则不更新
                if(projectId !== fileProjectId || curDirId!== fileParentId) return

                // 处理文件夹上传：
                let fileData  =  data.uploadDirYes ? data.parentInfo : data
                // 处理文件大小展示
                fileData.size = this.handleFileSize(Math.floor(fileData.docSize));
                // 处理图标
                this.docTypeIcon([fileData])
                this.docInitList.unshift(fileData)
                this.docInitList.forEach((obj,index)=>{
                    obj['myIndex'] = index;
                })
            },
            docUploadAllsucessVersion() {
                this.versionUploadAddDocClose();
                this.newCreatName = "新建文件夹";
                this.newCreatShow = false;
                // this.$message({
                //   type: "success",
                //   message: '上传成功'
                // });
                // this.queryDoc();
            },
            handleUploadComplete(){
                // this.queryDoc();
            },
            docUploadAllsucess() {
                this.queryDoc();
                this.newCreatName = "新建文件夹";
                this.newCreatShow = false;
                this.$message({
                    type: "success",
                    message: '文件上传成功'
                });
                this.uploadAddDocClose();
            },
            //记录下载日志
            downloadNotes(name,id) {
                var data = {
                    "token": this.token,
                    "userId": this.userId,
                    sourceName:'项目文档',//页面位置，记录日志用
                    projectName: this.publicData.projectName,//项目名称，记录日志用
                    "data": {
                        "projectId": this.publicData.projectId,
                        "docName": name,
                        "id": id
                    }
                }
                this.$post("/doc/project/log/addDownload", data)
                    .then( (response)=> {
                    })
                    .catch(function (error) {
                    });
            },
            //记录批量下载日志
            downloadNotesLot() {
                let names = [];
                let seleDirAndFile = [...this.manaullyFile, ...this.selectedDir];
                seleDirAndFile.map(item=>{
                    names.push(item.docName);
                })
                var data = {
                    token: this.token,
                    userId: this.userId,
                    data: {
                        projectId: this.publicData.projectId,
                        docNames: names
                    }
                }
                this.$post("/doc/project/log/addDownloadLogs", data)
                    .then( (response)=> {
                    })
                    .catch(function (error) {
                    });
            },
            downloadFileBtn(){
                if (this.manaullyFile.length == 0 && this.selectedDir.length == 0) {
                  this.$message.warning("请选择至少一条数据")
                  return;
                }
                if((this.selectedDir.length == 0 && this.manaullyFile.length == 1) || this.isPC){
                    this.downloadFile()
                } else {
                    this.downloadFileLot()
                }
            },
            //下载
            downloadFile() {
                var download_arr = [];
                var docId = [];
                if(this.isPC) {
                    let arr = this.selectedDir.concat(this.manaullyFile);
                    arr.forEach(item => {
                        download_arr.push({
                            docId: item.docId,
                            docType: item.docType,
                            id: item.id,
                            docName: item.docName,
                            source: 0, // 文件源： 1底稿 0项目文档 2客户文档
                            parentId: item.parentId,
                            projectId: this.publicData.projectId,
                            sourceName: '项目文档',
                            projectName: this.publicData.projectName
                        })
                        docId.push(item.id)
                    })

                    this.canOperating(
                        {
                            docId: docId.join(','),
                            download: this.permsType["download"]
                        },
                        "download"
                    ).then(res => {
                        if (res) {
                            this.$store.commit("download", download_arr);
                            this.clearSelection()
                        }
                    });
                    return
                }
                for (var i = 0; i < this.selectedDoc.length; i++) {
                    // if (this.selectedDoc[i]["docType"] != "0" && !this.isPC) {
                    //     this.$message.warning("文件夹不支持下载，请选择下载文件");
                    //     return;
                    // }
                    // pc端下载
                     // web端下载
                        if(this.selectedDoc.length == 1){//单文件下载
                            download_arr.push({
                                name: this.selectedDoc[i].docName,
                                id: this.selectedDoc[i].docId
                            });
                            // pc不需要记录
                            this.downloadNotes(this.selectedDoc[i].docName,this.selectedDoc[i].id);
                        }

                    docId.push(this.selectedDoc[i].id);
                    // // pc不需要记录
                    // !this.isPC && this.downloadNotes(this.selectedDoc[i].docName);
                }
                //this.selectedDoc.length != 1 && this.downloadNotesLot();
                this.canOperating(
                    {
                        docId: docId.join(','),
                        download: this.permsType["download"]
                    },
                    "download"
                ).then(res => {
                    if (res) {
                        this.$store.commit("download", download_arr);
                        this.clearSelection()
                    }
                });
            },
            downloadFileLot(){
                let files = [];
                let seleDirAndFile = this.selectedDir.concat(this.manaullyFile);
                seleDirAndFile.map(item=>{
                    // if(item.docType == 0){
                        let obj = {};
                        obj.parentId = item.parentId;
                        obj.rfsId = item.rfsId;
                        obj.fileName = item.docName;
                        obj.id = item.id;
                        obj.docType = item.docType;
                        if(item.docType == 0){
                            obj.createBy = item.createBy;
                        }
                        files.push(obj);
                    // }
                })
                let obj = {
                    projectName: this.publicData.projectName,
                    random: new Date().getTime(),
                    source: 0,//下载位置0 项目文档、 1 底稿
                    files: files
                }
                this.$store.commit("export", { url:`/rfs/files/downloadDocsZip`, data: obj});
                this.clearSelection()


            },
            //引用
            useTempBtn() {
                this.$router.push({
                    path: "/projectDocTemp",
                    query: {
                        projectData: JSON.stringify(this.publicData),
                        parentId: this.publicData.docParentId
                    }
                });
            },
            //回收站
            goRecovery() {
                this.$router.push({
                    path: "/proDocRecovery",
                    query: {projectId: this.publicData.projectId}
                });
            },
            //查询
            searcgDoc() {
               this.$store.commit('proDocSearchFn', this.search)
               this.$store.commit('proDocSearchProFn', this.publicData)
               this.$router.push({path: "/projectDocSearch"});
            },
            //删除
            deletetDoc() {
                let vm = this;
                let arr = [];
                this.deleteDocList = [];
                let flag = true;
                let canDelete = true;
                let hasDraftDoc = false;//是否含有已设为底稿的文件
                let hasInExamDoc = false;//是否含有审批中的文件
                let hasExamPassDoc = false;//是否含有审批通过的文件
                let folderIds = this.selectedDirIds;//文件夹id集合
                let setedDraftIds = [];//选中的列表中只有文件时，已设为底稿的文件id集合
                let sysFolder = 0;

                let allDeleteDoc = [...this.manaullyFile, ...this.selectedDir];
                let placeFileIndex = this.selectedDoc.findIndex(v=>v.auditStatus==8);
                if(placeFileIndex != -1){
                    this.$message.warning('归档文件无法删除');
                    return;
                }
                for (var i = 0; i < allDeleteDoc.length; i++) {
                    if (allDeleteDoc[i].delAllow == 0) {
                        flag = false;
                        sysFolder++;
                    }
                    if (allDeleteDoc[i].lockState) {
                        canDelete = false;
                    }
                    if (allDeleteDoc[i].isLink === 1) {//设为底稿
                        setedDraftIds.push(allDeleteDoc[i].id);
                        hasDraftDoc = true;
                    }
                    if (allDeleteDoc[i].auditStatus===0 || allDeleteDoc[i].auditStatus===6) {//审批中
                        hasInExamDoc = true;
                    }
                    if (allDeleteDoc[i].auditStatus===1) {//审批通过
                        hasExamPassDoc = true;
                    }
                    if(allDeleteDoc[i].docType ===1){
                        folderIds.push(allDeleteDoc[i].id);
                    }
                    arr.push(allDeleteDoc[i].id);
                    this.deleteDocList.push(allDeleteDoc[i].id);
                }
                if (allDeleteDoc.length == 0) {
                    this.$message({
                        message: "请选择至少一条数据",
                        type: "warning"
                    });
                    return;
                }
                this.deleteDocList = this.deleteDocList.concat(folderIds);
                let delAllowArr = []
                allDeleteDoc.forEach(v => {
                    if (v.docSource == 15) {
                        delAllowArr.push(v)
                    }
                })
                if (delAllowArr.length && allDeleteDoc.length == 1) {
                    this.$message.warning('该文件夹不允许删除')
                    return
                }
                if (delAllowArr.length && allDeleteDoc.length != 1) {
                    this.$message.warning('选中的文件夹不允许删除')
                    return
                }
                this.canOperating(
                    {
                        docId: arr.join(','),
                        delete: this.permsType["delete"]
                    },
                    "delete"
                ).then(res => {
                    if (res) {
                        if (folderIds.length === 0 && hasInExamDoc ) {
                            this.$message({
                                message: "审批中的文件不能删除，请重新选择。",
                                type: "warning"
                            });
                            return;
                        } else if (folderIds.length === 0 && !flag) {
                            if(allDeleteDoc.length == 1 && allDeleteDoc[0].subName == '底稿上传'){
                                this.$message({
                                    message: '该文件夹不允许删除',
                                    type: "warning"
                                });
                                return;
                            }
                            if(allDeleteDoc.length == 1){
                                this.$message({
                                    message: '选择的文件含有不允许删除的文件，请重新选择',
                                    type: "warning"
                                });
                                return;
                            }
                        } else if(folderIds.length === 0 && !canDelete){
                            this.$message({
                                message: "锁定后的文件不能删除，请重新选择",
                                type: "warning"
                            });
                            return;
                        } else if(folderIds.length === 0 && hasExamPassDoc){
                            this.$message({
                                message: "审批通过的文件不能删除，请重新选择。",
                                type: "warning"
                            });
                            return;
                        } else if(folderIds.length === 0 && hasDraftDoc){
                            this.deleDraftTips = "确认要把文件放入回收站吗？文件已关联为底稿文件，将一同删除，删除的文件可随时在回收站里还原，但关联文件不能还原。";
                            this.draftDetailBtn = true;
                            this.indexDetailsIds = setedDraftIds;
                        } else if(folderIds.length != 0){
                            let vm = this;
                            if(allDeleteDoc.length == 1 && folderIds.length == 1 && !flag){
                                this.$message({
                                    message: '该文件夹不允许删除',
                                    type: "warning"
                                });
                                return;
                            }
                            if(allDeleteDoc.length == sysFolder){
                                this.$message({
                                    message: '选中的文件夹不允许删除',
                                    type: "warning"
                                });
                                return;
                            }
                            if(!flag){
                                this.$message({
                                    message: '选择的文件含有不允许删除的文件，请重新选择',
                                    type: "warning"
                                });
                                return;
                            }
                            this.docStateJudge(arr, 0).then(res => {
                                if (res.code === vm.success_code && res.data.isLinked) {
                                    this.draftDetailBtn = true;
                                    this.deleDraftTips = res.data.content;
                                } else if(res.code === vm.success_code && !res.data.isLinked){
                                    this.$confirm(
                                        res.data.content,
                                        "提示",
                                        {
                                            confirmButtonText: "确定",
                                            cancelButtonText: "取消",
                                            type: "warning"
                                        }).then(_ => {
                                           vm.sendDelete(arr);
                                    }).catch(_ => {
                                        this.$message({
                                            type: "info",
                                            message: "已取消删除"
                                        });
                                    });
                                }
                            })
                        } else {
                            this.$confirm(
                                "确认要把文件放入回收站吗?删除的文件可随时通过回收站还原。",
                                "提示",
                                {
                                    confirmButtonText: "确定",
                                    cancelButtonText: "取消",
                                    type: "warning"
                                }
                            ).then(() => {
                                this.sendDelete(arr);
                            })
                            .catch(() => {
                                this.$message({
                                    type: "info",
                                    message: "已取消删除"
                                });
                            });
                        }
                    }
                });
            },
            sendDelete(arr){
                let vm = this;
                let data = {
                    token: this.token,
                    userId: this.userId,
                    sourceName:'项目文档',//页面位置，记录日志用
                    projectName: this.publicData.projectName,//项目名称，记录日志用
                    data: {
                        docIds: arr.join(",")
                    }
                };
                let seleDirAndFile = [...this.manaullyFile, ...this.selectedDir];
                vm.$post("/doc/project/deleteProjectDoc", data)
                    .then((response)=> {
                        if (vm.success_code == response.code) {
                            vm.$message({
                                message: "删除成功",
                                type: "success"
                            });
                            // vm.search.pageNo = 0;
                            this.$select.handleCancel(1,this.publicData.projectId, this.publicData.projectId, seleDirAndFile);
                            this.draftDetailBtn = false;
                            vm.queryDoc();
                        } else {
                            vm.$message({
                                message: response.msg,
                                type: "error"
                            });
                        }
                    })
                    .catch(function (error) {
                    });
            },

          checkDocStatusAjax(seleFileIds, doType){
            let params = {
              token: this.token,
              userId: this.userId,
              data: {
                "ids": seleFileIds,//选中的文件和文件夹的id集合
                "doType": doType//操作类型（0删除1重命名2上传新版本）
              }
            };
            let result = {data: false, msg: '当前无权限'}

            $.ajax({
              url:  window.allUrl+'/doc/project/docStatus',
              type: 'POST',
              async: false,
              dataType: 'json',
              contentType: "application/json",
              data: JSON.stringify(params),
              success: (res)=>{
                if (this.success_code !== res.code) {
                  result = {data: false, msg: res.msg}
                  return
                }
                result = {data: true}
              },
              error: function(e) {
                result= {data: false, msg: '系统异常，请刷新重试'}
              }
            });

            return result
          },






            async docStateJudge(seleFileIds, doType) {
                this.indexDetailsIds = [];
                var send_data = {
                    token: this.token,
                    userId: this.userId,
                    data: {
                        "ids": seleFileIds,//选中的文件和文件夹的id集合
                        "doType": doType//操作类型（0删除1重命名2上传新版本）
                    }
                };
                var data = await this
                    .$post("/doc/project/docStatus", send_data)
                    .then((response)=> {
                        if (this.success_code == response.code) {
                            if(response.data != undefined){
                                if(response.data.isLinked){
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
                    .catch(function (error) {

                    });
                return data;
            },
            //获取引用被索引详情
            getDraftDetails(){
                let data = {
                    token: this.token,
                    userId: this.userId,
                    data: {
                        ids: this.indexDetailsIds
                    }
                };
                this.$post("/doc/project/docDetails", data)
                .then((response)=> {
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
                .catch(function (error) {
                });
            },
            docTypeIcon(data){
                for (var i = 0; i < data.length; i++) {
                    if (data[i].type == '' || data[i].docType == 1) {
                        data[i][
                            "fileIcon"
                            ] = require("../../../common/fileIcon/FolderType1.png");
                    } else {
                        var hz_name = data[i].type.toLowerCase();
                        if (hz_name == "doc" || hz_name == "docx" || hz_name == "rtf") {
                            data[i][
                                "fileIcon"
                                ] = require("../../../common/fileIcon/DocType.png");
                        } else if (
                            hz_name == "xls" ||
                            hz_name == "xlsx" ||
                            hz_name == "excel"
                        ) {
                            data[i][
                                "fileIcon"
                                ] = require("../../../common/fileIcon/XlsType.png");
                        } else if (
                            hz_name == "ppt" ||
                            hz_name == "pptx" ||
                            hz_name == "pps" ||
                            hz_name == "ppsx" ||
                            hz_name == "ppsm"
                        ) {
                            data[i][
                                "fileIcon"
                                ] = require("../../../common/fileIcon/PptType.png");
                        } else if (
                            hz_name == "jpg" ||
                            hz_name == "jpeg" ||
                            hz_name == "gif" ||
                            hz_name == "bmp" ||
                            hz_name == "png"
                        ) {
                            data[i][
                                "fileIcon"
                                ] = require("../../../common/fileIcon/ImgType.png");
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
                                ] = require("../../../common/fileIcon/VideoType.png");
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
                                ] = require("../../../common/fileIcon/VideoType.png");
                        } else if (
                            hz_name == "mp3" ||
                            hz_name == "wav" ||
                            hz_name == "wma" ||
                            hz_name == "mid"
                        ) {
                            data[i][
                                "fileIcon"
                                ] = require("../../../common/fileIcon/MusicType.png");
                        } else if (hz_name == "pdf") {
                            data[i][
                                "fileIcon"
                                ] = require("../../../common/fileIcon/PdfType.png");
                        } else if (hz_name == "indd") {
                            data[i][
                                "fileIcon"
                                ] = require("../../../common/fileIcon/indd.png");
                        } else if (hz_name == "ai") {
                            data[i][
                                "fileIcon"
                                ] = require("../../../common/fileIcon/ai.png");
                        } else if (hz_name == "psd") {
                            data[i][
                                "fileIcon"
                                ] = require("../../../common/fileIcon/ps.png");
                        } else if (hz_name == "tif") {
                            data[i][
                                "fileIcon"
                                ] = require("../../../common/fileIcon/tiff.png");
                        } else if (hz_name == "zip" || hz_name == "rar") {
                            data[i][
                                "fileIcon"
                                ] = require("../../../common/fileIcon/RarType.png");
                        } else {
                            data[i][
                                "fileIcon"
                                ] = require("../../../common/fileIcon/other.png");
                        }
                    }
                }
            },
            visionBtn() {
              if(this.selectedDoc.length == 0 || this.selectedDoc.length > 1) {
                this.$message.warning("请选择一条数据");
                return
              }

              if(this.selectedDoc[0].docType!==0){
                this.$message.warning("文件夹不支持该功能，请选择文件");
                return
              }

              this.accpet = this.selectedDoc[0].type;
              var send_data = {
                token: this.token,
                userId: this.userId,
                pageNo: 0,
                pageSize: 10,
                sourceName:'项目文档',//页面位置，记录日志用
                projectName: this.publicData.projectName,//项目名称，记录日志用
                data: {
                  docId: this.selectedDoc[0].docId,
                  docName: this.selectedDoc[0].docName,
                  parentId: this.selectedDoc[0].parentId
                }
              };
              this.$post("/doc/project/getDocVersionList", send_data)
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
            versionUpdate(){
                this.queryDoc();
                this.$select.handleFileSelect(1, this.publicData.projectId, this.publicData.projectId, this.selectedDoc)
            },
            newCreatClose() {
                this.newCreatName = "新建文件夹";
                this.newCreatShow = false;
            },
            newCreatBtn() {
                // 判断项目状态 已终止禁止操作
                if(this.$store.state.projectMsg.projectMsg.endFlag  && this.$store.state.projectMsg.projectMsg.endFlag === 1){
                    this.$store.commit('projectStatusTips');
                    return;
                }
                if ($(".new-creat").length > 0) {
                    return;
                }
                // this.newCreatShow = true;
                let _this = this;
                let dom = '<div class="new-creat clearfix" style="margin-top: 20px;padding-left: 68px;">' +
                    '<p class="new-creat-icon"></p>' +
                    '<div class="new-creat-doc fl">' +
                    '<input size="small" placeholder="请输入文件夹名称" style="border-radius:4px;padding:0 4px;float:left;width:292px;height:32px;border:1px solid #c0c4cc" id="newDocName" maxlength="250">' +
                    '</div>' +
                    '<i class="el-icon-error icon_btn fl"' +
                    'style="margin-top:4px;margin-left:8px;font-size: 20px;cursor: pointer;color: #efb87f;"' +
                    'title="取消" id="newCreatClose"' +
                    '></i>' +
                    '<i class="el-icon-success icon_btn fl" style="margin-top:4px;margin-left:8px;font-size: 20px;cursor: pointer;color: #add7a0;"' +
                    'title="确定"' + 'id="insertDoc"></i></div>'
                $('.project-doc-list .el-table__header-wrapper').append(dom);
                $('#newCreatClose').on('click', function () {
                    $(".new-creat").remove();
                })
                $("#insertDoc").on("click", function () {
                    var name = $("#newDocName").val();
                    if(name == ''){
                        _this.$message({
                            message: "请输入文件夹名称",
                            type: "warning"
                        });
                        return;
                    } else {
                        let reg = /[\\/:*?"<>|]/g;
                        if(reg.test(name)){
                            _this.$message.warning('不能包含特殊字符\/:*?"<>|');
                            return;
                        }
                        if(name.match(/^[ ]+$/)) {
                            _this.$message.warning('请输入文件名称')
                            return;
                        }
                        _this.insertFolder(name);
                        $(".new-creat").remove();
                    }
                });
                // $("#insertDoc").keypress(function(e) {

                // });
                // $('#insertDoc').bind('keypress',function(event){
                //     console.log(88888)
                //     if(event.keyCode == "13"){
                //         alert('你输入的内容为');
                //     }
                // });
            },
            //右键预览
            docView() {
                // if (this.selectedDoc.length == 0 || this.selectedDoc.length != 1) {
                //     this.$message({
                //         message: "请选择一条数据",
                //         type: "warning"
                //     });
                //     return;
                // } else
                if (this.right_click_data.docType == 1) {
                    this.$message({
                        message: "文件夹不能预览，请选择文件",
                        type: "warning"
                    });
                    return;
                } else {
                    // if(this.creatIsUser()){
                    //     this.$router.push({
                    //       path: "/preview",
                    //       query: {
                    //         rfsId: this.selectedDoc[0].rfsId
                    //       }
                    //     });
                    // } else {
                    this.canOperating(
                        {docId: this.right_click_data["id"], view: this.permsType["view"]},
                        "view"
                    ).then(res => {
                        if (res) {
                            var proViewData = {
                                rfsId: this.right_click_data.rfsId,
                                docId: this.right_click_data.docId,
                                photoType: this.right_click_data.type,
                                sourceType: 'projectDoc',
                                docName: this.right_click_data.docName,
                                sourceName: '项目文档'//记录日志用
                            }
                            sessionStorage.setItem("proDocViewDownId", this.right_click_data.id);
                            this.right_click_data.source = '0';
                            // pc端预览还是预览，只有双击时是编辑
                            this.$store.commit('previewAllFn', proViewData)
                            // this.isPC
                            // ? window.ChromeMain.CS_Main_OpenFile(JSON.stringify(this.right_click_data)) // PC端双击在线编辑
                            // : this.$store.commit('previewAllFn', proViewData)


                            // this.$router.push({
                            //   path: "/preview",
                            //   query: {
                            //     rfsId: this.selectedDoc[0].rfsId,
                            //     docId: this.selectedDoc[0].docId
                            //   }
                            // });
                        }
                    });
                    // }

                }
            },
            //文件锁定
            docLock() {
                // if(this.selectedDoc.length != 0 && this.selectedDoc[0].lockState != '-1'){
                //     this.$message({
                //         message: "该文件已经是锁定状态",
                //         type: "warning"
                //     });
                //     return;
                // } else if (this.selectedDoc.length == 0 || this.selectedDoc.length > 1) {
                //     this.$message({
                //         message: "请选择一条数据",
                //         type: "warning"
                //     });
                //     return;
                // } else {
                let vm = this;
                this.rightmenuIsShow = false;
                let data = {
                    data: {
                        docId: this.right_click_data.docId
                    },
                    pageNo: 0,
                    pageSize: 10,
                    token: this.token,
                    userId: this.userId,
                    sourceName:'项目文档',//页面位置，记录日志用
                    projectName: this.publicData.projectName,//项目名称，记录日志用
                };

                this.$post("/doc/project/setDocLock", data)
                    .then((response)=> {
                        if (vm.success_code == response.code) {
                            vm.$message({
                                message: "该文件已加锁",
                                type: "success"
                            });
                            vm.queryDoc();
                            vm.$select.updateStatus(1, vm.publicData.projectId, vm.publicData.projectId)
                            //加icon
                        } else {
                            vm.$message({
                                message: response.msg,
                                type: "error"
                            });
                        }
                    })
                    .catch(function (error) {
                    });

                // }
            },
            //文件解锁
            docUnLock() {
                // if(this.selectedDoc.length != 0 && this.selectedDoc[0].lockState == '-1'){
                //     this.$message({
                //         message: "该文件未锁定",
                //         type: "warning"
                //     });
                //     return;
                // } else if (this.selectedDoc.length == 0 || this.selectedDoc.length > 1) {
                //     this.$message({
                //         message: "请选择一条数据",
                //         type: "warning"
                //     });
                //     return;
                // } else {
                if (this.right_click_data.auditStatus == 8) {
                    this.$message({
                        message: "归档文件不可解锁",
                        type: "warning"
                    });
                    return;
                }
                let data = {
                    data: {
                        docId: this.right_click_data.docId
                    },
                    pageNo: 0,
                    pageSize: 10,
                    token: this.token,
                    userId: this.userId,
                    sourceName:'项目文档',//页面位置，记录日志用
                    projectName: this.publicData.projectName,//项目名称，记录日志用
                };

                this.$post("/doc/project/setDocUnLock", data)
                    .then((response)=> {
                        if (this.success_code == response.code) {
                            this.$message({
                                message: "该文件已解锁",
                                type: "success"
                            });
                            this.queryDoc();
                            this.$select.updateStatus(1, this.publicData.projectId, this.publicData.projectId)
                            //变icon
                        } else {
                            this.$message({
                                message: response.msg,
                                type: "error"
                            });
                        }
                    })
                    .catch(function (error) {
                    });

                // }
            },
            //  右键锁定
            docLockFn() {
                if(this.right_click_data.auditStatus == 1 || this.right_click_data.auditStatus == 0) {
                    this.$message.warning('审批中/审批通过的文件不可手动解锁！')
                    return
                }
                var _this = this;
                if (!this.right_click_data) {
                    this.$message({
                        message: '请选择一条数据',
                        type: "warning"
                    });
                } else {
                    if (this.right_click_data.lockState) {
                        this.$confirm("该文件已锁定，是否解锁", "提示", {
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            type: "warning"
                        }).then(() => {
                            _this.docUnLock();
                        });
                    } else {
                        this.$confirm("是否锁定该文件", "提示", {
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            type: "warning"
                        })
                            .then(() => {
                                _this.docLock();
                            })
                            .catch(() => {
                                this.$message({
                                    type: "info",
                                    message: "取消锁定"
                                });
                            });
                    }
                }
            },
            //项目文档复制时保存数据
            docCopy() {
                if (this.manaullyFile.length == 0 && this.selectedDir.length == 0) {
                    this.$message({
                        message: '请选择想要复制的文件或文件夹',
                        type: "warning"
                    });
                } else {
                    let canCopy = true;
                    this.copySourceData.seleFileIds = [];//选中的文件id集合
                    this.copySourceData.seleFolderIds = this.selectedDirIds;//选中的文件夹id集合
                    var arr = [];
                    for (var i = 0; i < this.manaullyFile.length; i++) {
                        // if (this.selectedDoc[i].lockState != '-1') {
                        //     canCopy = false;
                        // }
                        // if(this.selectedDoc[i].docType == 1){
                        //     this.copySourceData.seleFolderIds.push(this.selectedDoc[i].id);
                        // } else {
                            this.copySourceData.seleFileIds.push(this.manaullyFile[i].id);
                        // }
                        arr.push(this.manaullyFile[i].id);
                    }
                    arr = arr.concat(this.selectedDirIds);//加上选中的文件夹id
                    this.canOperating(
                        {docId: arr.join(','), copy: this.permsType["copy"]},
                        "copy"
                    ).then(res => {
                        if (res) {
                            let arr = [];
                            for (var i = 0; i < this.manaullyFile.length; i++) {
                                arr.push(this.manaullyFile[i].id);
                            }
                            arr = arr.concat(this.selectedDirIds);//加上选中的文件夹id
                            this.copySourceData.ids = arr.join(",");
                            this.copySourceData.sourceProjId = this.publicData.projectId; //原项目ID
                            this.copySourceData.parentId = this.publicData.docParentId; //目标父级ID
                            this.copySourceData.copyOrCut = "copy";
                            this.copySourceData.hasCutOrCopy = true;
                            this.copySourceData.docSource = 0;
                            this.copySourceData.seleFileIds = this.copySourceData.seleFileIds;
                            this.copySourceData.seleFolderIds = this.selectedDirIds;
                            this.$store.commit("projectDocPaste", this.copySourceData);
                            this.$message({
                                type: "success",
                                message: "复制成功!"
                            });
                        }
                    });
                }
            },
            //项目文档剪切时保存数据
            docCut() {
                if (this.manaullyFile.length == 0 && this.selectedDir.length == 0) {
                    this.$message({
                        message: '请选择一条数据',
                        type: "warning"
                    });
                } else {
                    let placeFileIndex = this.selectedDoc.findIndex(v=>v.auditStatus==8);
                    if(placeFileIndex != -1){
                        this.$message.warning('归档文件不可剪切');
                        return;
                    }
                    let canCut = true;
                    this.copySourceData.seleFileIds = [];//选中的文件id集合
                    this.copySourceData.seleFolderIds = this.selectedDirIds;//选中的文件夹id集合
                    var arr = [];
                    for (var i = 0; i < this.manaullyFile.length; i++) {
                        // if (this.selectedDoc[i].lockState != '-1') {
                        //     canCut = false;
                        // }
                        // if(this.selectedDoc[i].docType == 1){
                        //     this.copySourceData.seleFolderIds.push(this.selectedDoc[i].id);
                        // } else {
                            this.copySourceData.seleFileIds.push(this.manaullyFile[i].id);
                        // }
                        arr.push(this.manaullyFile[i].id);
                    }
                    arr = arr.concat(this.selectedDirIds);//加上选中的文件夹id
                    this.canCopyOrCut(this.copySourceData.seleFileIds,this.copySourceData.seleFolderIds,arr).then(res => {
                        if(res){
                            this.canOperating(
                                {docId: arr.join(','), copy: this.permsType["cut"]},
                                "cut"
                            ).then(res => {
                                if (res) {
                                    let arr = [];
                                    for (var i = 0; i < this.manaullyFile.length; i++) {
                                        arr.push(this.manaullyFile[i].id);
                                    }
                                    arr = arr.concat(this.selectedDirIds);//加上选中的文件夹id
                                    this.copySourceData.ids = arr.join(",");
                                    this.copySourceData.sourceProjId = this.publicData.projectId; //原项目ID
                                    this.copySourceData.parentId = this.publicData.docParentId; //目标父级ID
                                    this.copySourceData.copyOrCut = "cut";
                                    this.copySourceData.hasCutOrCopy = true;
                                    this.copySourceData.docSource = 0;
                                    this.copySourceData.seleFileIds = this.copySourceData.seleFileIds;
                                    this.copySourceData.seleFolderIds = this.selectedDirIds;
                                    this.$store.commit("projectDocPaste", this.copySourceData);
                                    this.$message({
                                        type: "success",
                                        message: "剪切成功!"
                                    });
                                }
                            });
                        }
                    });
                }
            },
            docPaste() {
                // 判断项目状态 已终止禁止操作
                if(this.$store.state.projectMsg.projectMsg.endFlag && this.$store.state.projectMsg.projectMsg.endFlag === 1){
                    this.$store.commit('projectStatusTips');
                    return;
                }
                let flag = this.$store.state.projectDocCopy.copyOrCut;
                // let flag = this.copySourceData.copyOrCut;
                let hasCutOrCopy = this.$store.state.projectDocCopy.hasCutOrCopy;
                this.copySourceData.projId = this.publicData.projectId; //粘贴到的项目ID
                if(this.stageIsAll){
                    this.$message({
                        type: "warning",
                        message: "全部阶段下不允许粘贴"
                    });
                } else {
                    if (flag == "copy" && hasCutOrCopy) {
                        this.docCopyPaste();
                    } else if (flag == "cut" && hasCutOrCopy) {
                        this.docCutPaste();
                    } else {
                        this.$message({
                            type: "warning",
                            message: "请先复制或剪切"
                        });
                    }
                }
            },
            //项目文档粘贴
            docCopyPaste() {
                let vm = this;
                let seleFolderIds = this.$store.state.projectDocCopy.seleFolderIds;
                let seleFileIds = this.$store.state.projectDocCopy.seleFileIds;
                // for (var i = 0; i < this.selectedDoc.length; i++) {
                //     if(this.selectedDoc[i].docType == 1){
                //         this.copySourceData.seleFolderIds.push(this.selectedDoc[i].id);
                //     } else {
                //         this.copySourceData.seleFileIds.push(this.selectedDoc[i].id);
                //     }
                // }
                let data = {
                    token: this.token,
                    userId: this.userId,
                    sourceName:'项目文档',//页面位置，记录日志用
                    projectName: this.publicData.projectName,//项目名称，记录日志用
                    data: {
                        projId: this.publicData.projectId, //粘贴到的项目ID
                        docSource: this.copySourceData.docSource,//复制的来源0:项目文档/1:底稿管理
                        parentId: this.publicData.docParentId, //目标父级ID
                        docIdSet: seleFileIds,//文件id
                        dirIdSet: seleFolderIds,//文件夹id
                        sourceProjId: this.copySourceData.sourceProjId, //原项目ID
                        auditProjectId: this.publicData.processId,//目标阶段ID
                    }
                };
                this.$post("/doc/project/copyProjectDocs", data)
                    .then((response)=> {
                        if (vm.success_code == response.code) {
                            // vm.copySourceData = {};
                            vm.$message({
                                message: response.msg,
                                type: "success"
                            });
                            // vm.copySourceData.copyOrCut = "";
                            // vm.$store.commit("projectDocPaste", vm.copySourceData);
                            vm.queryDoc();
                            this.clearSelection()
                        } else {
                            vm.$message({
                                message: response.msg,
                                type: "error"
                            });
                        }
                    })
                    .catch(function (error) {
                    });
            },
            //项目文档剪切后粘贴
            docCutPaste() {
                let seleFolderIds = this.$store.state.projectDocCopy.seleFolderIds;
                let seleFileIds = this.$store.state.projectDocCopy.seleFileIds;
                if(this.copySourceData.sourceProjId != this.copySourceData.projId){
                    this.$message({
                        type: "warning",
                        message: "不能跨项目剪切"
                    });
                    return;
                }
                let vm = this;
                // let seleFolderIds = [];
                // let seleFileIds = [];
                // for (var i = 0; i < this.selectedDoc.length; i++) {
                //     if(this.selectedDoc[i].docType == 1){
                //         this.copySourceData.seleFolderIds.push(this.selectedDoc[i].id);
                //     } else {
                //         this.copySourceData.seleFileIds.push(this.selectedDoc[i].id);
                //     }
                // }
                let data = {
                    data: {
                        ids: this.copySourceData.ids, //文件ID
                        projId: this.publicData.projectId, //粘贴到的项目ID
                        sourceProjId: this.copySourceData.sourceProjId, //原项目ID
                        parentId: this.publicData.docParentId, //目标父级ID
                        auditProjectId: this.publicData.processId,//目标阶段ID
                        doc: seleFileIds.join(','),//文件id
                        dir: seleFolderIds.join(','),//文件夹id
                    },
                    token: this.token,
                    userId: this.userId,
                    sourceName:'项目文档',//页面位置，记录日志用
                    projectName: this.publicData.projectName,//项目名称，记录日志用
                };
                this.$post("/doc/project/cutPaperDocs", data)
                    .then((response)=> {
                        if (vm.success_code == response.code) {
                            // vm.copySourceData = {};
                            vm.$message({
                                message: response.msg,
                                type: "success"
                            });
                            // vm.copySourceData.copyOrCut = "";
                            vm.$store.commit("projectDocPaste", vm.copySourceData);
                            vm.queryDoc();
                            this.clearSelection()
                        } else {
                            vm.$message({
                                message: response.msg,
                                type: "error"
                            });
                        }
                    })
                    .catch(function (error) {
                    });
            },
            rightMenuPower() {
                this.powerSetIsShow = true;
            },
            //重命名提交
            reNameSubmit(name) {
                if (this.reNameDocData.docType == 1) {
                    var type = '';
                    var originname = $(".rename_input").val();
                } else {
                    var type = this.reNameDocData.type;
                    var originname = $(".rename_input").val() + "." + type;
                }
                // var originname = $(".rename_input").val() + "." + type;
                let _this = this;
                // originname = originname.replace(/[\,\|\/\'\*\:\;\"\L\<\>\?\\]/g, "");
                let reg = /[\\/:*?"<>|]/g;
                if(reg.test(originname)){
                    this.$message.warning('不能包含特殊字符\/:*?"<>|');
                    return;
                }
                let data = {
                    token: this.token,
                    userId: this.userId,
                    sourceName:'项目文档',//页面位置，记录日志用
                    projectName: this.publicData.projectName,//项目名称，记录日志用
                    data: {
                        id: this.reNameDocData.id,
                        originaName: this.reNameDocData.docName, //原文件名
                        docName: originname,
                        docSource: 0 //文件来源，项目文档为0
                    }
                };
                _this
                    .$post("/doc/project/reName", data)
                    .then((response)=> {
                        if (_this.success_code == response.code) {
                            $(".rename_box").remove();
                            $(".name_col")
                                .eq(_this.reNameIndex)
                                .children()
                                .css("display", "block");
                            _this.reNameDocData = {};
                            _this.queryDoc();
                            _this.$select.updateStatus(1, _this.publicData.projectId, _this.publicData.projectId)
                            _this.$store.commit('updateDocName', {type: 1, id: _this.publicData.projectId, docName: originname, fileId:this.reNameDocData.id})
                        } else {
                            _this.$message({
                                message: response.msg,
                                type: "error"
                            });
                        }
                    })
                    .catch(function (error) {
                    });
            },
            //验证是否可以重命名
            reNameTest(name) {
                var _this = this;
                let editName = name.replace(/\s*/g,"");
                if (name == "" || editName == '') {
                    this.$message({
                        message: "请输入文件名称",
                        type: "warning"
                    });
                    return;
                }
                var docType = this.reNameDocData.docType;
                var longName = name + "." + this.reNameDocData.type;
                name = docType == 0 ? longName : name;
                let docSource = this.reNameDocData.isLink == 1 ? 1: 0;
                let data = {
                    token: this.token,
                    userId: this.userId,
                    data: {
                        docSource: 0,//项目文档0底稿1
                        projectId: this.publicData.projectId,
                        auditProjectId: this.publicData.processId, //项目阶段ID
                        parentId: this.publicData.docParentId, //所在目录ID 0 为顶级目录
                        docName: name,
                        linkId: this.reNameDocData.linkId,
                        docType: this.reNameDocData.docType,
                        id: this.reNameDocData.id,
                        docId: this.reNameDocData.docId
                    }
                };
                this.$post("/doc/project/validate/docNameByDocSource", data)
                    .then((response)=> {
                        if (_this.success_code == response.code) {
                            if (name != response.data) {
                                name = response.data;
                                _this
                                    .$confirm(
                                        `已有相同名称的${docType == 1?'目录':'文件'}，是否以 ${response.data} 命名${docType == 1?'目录':'文件'}`,
                                        "重名提示",
                                        {
                                            confirmButtonText: "确定",
                                            cancelButtonText: "取消",
                                            type: "warning"
                                        }
                                    )
                                    .then(() => {
                                        var lastIndex = response.data.lastIndexOf('.');
                                        var myName = docType == 0 ? response.data.substring(0, lastIndex) : response.data;
                                        $(".rename_input").val(myName);
                                        _this.reNameSubmit(myName);
                                    })
                                    .catch(() => {
                                    });
                            } else {
                                _this.reNameSubmit(name);
                            }
                        } else {
                            _this.$message({
                                message: response.msg,
                                type: "error"
                            });
                        }
                    })
                    .catch(function (error) {
                    });
            },

            //文件单独关联
            // docRelation() {
            //     this.singleDocRelationIsShow = true;
            // },
            //文件批量关联
            docRelationBtn() {
                this.filterSetDraftDoc = 0;//每次点击“设为底稿”按钮时如果有选中的文件夹，把验证出的空目录、含有设为底稿文件的文件夹个数记录下来
                this.hasSetedDoc = false;//选中的文件中是否有已设为底稿的文件
                this.toDocRelationList = [];
                this.folderTotal = 0;
                this.testCanSetDraftTimes = 0;
                if(this.selectedDoc.length == 0){
                    this.docRelationIsShow = true;
                    this.$refs.docRelationObj.getTreeDataFnProDoc(this.toDocRelationList);
                    this.$refs.docRelationObj.getTreeDataFn();
                } else {
                    for(var i = 0;i<this.selectedDoc.length;i++){
                        if(this.selectedDoc[i].docType == 0){//文件
                            if(this.selectedDoc[i].isLink != 1){
                                this.toDocRelationList.push(this.selectedDoc[i]);
                            } else {
                                this.hasSetedDoc = true;
                            }
                        } else {//文件夹
                            this.folderTotal++;
                            this.testFolderHasSeted(this.selectedDoc[i]).then(res => {
                                if (!res) {
                                    // this.toDocRelationList.push(this.selectedDoc[i-1]);
                                } else {
                                    // return;
                                }
                            })
                            // this.docRelation();
                        }
                    }
                    if(this.folderTotal == 0){
                        this.docRelation();
                    }
                }
            },
            docRelation(){
                if(this.filterSetDraftDoc != 0 || this.hasSetedDoc){
                    this.$confirm(
                        "已自动过滤空目录、已设为底稿的文件和包含已设为底稿文件的文件夹",
                        "提示",
                        {
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            type: "warning"
                        }
                    ).then(() => {
                        // this.toDocRelationList = [];
                        this.docRelationIsShow = true;
                        this.$refs.docRelationObj.getTreeDataFnProDoc(this.toDocRelationList);
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
            async testFolderHasSeted(item){
                let sendData = {
                    token: this.token,
                    userId: this.userId,
                    projectId: this.publicData.projectId,
                    data: {
                        id: item.id
                    }
                }
                var data = await this.$post("/doc/project/validateDirIsLink", sendData)
                    .then((response)=> {
                    if (this.success_code == response.code) {
                        this.testCanSetDraftTimes++;
                        this.toDocRelationList.push(item);
                        return false;
                    } else {
                        this.filterSetDraftDoc++;
                        this.testCanSetDraftTimes++;
                        return true;
                    }
                })
                .catch(function(error) {

                });
                return data;
            },
            // testFolderHasSeted(item){
            //     let data = {
            //         token: this.token,
            //         userId: this.userId,
            //         projectId: this.publicData.projectId,
            //         data: {
            //             id: item.id
            //         }
            //     }
            //     this.$post("/doc/project/validateDirIsLink", data)
            //         .then((response)=> {
            //         if (this.success_code == response.code) {

            //         } else {
            //             this.filterSetDraftDoc = this.filterSetDraftDoc + 1;
            //             console.log('444444444',this.filterSetDraftDoc)
            //         }
            //     })
            //     .catch(function(error) {

            //     });
            //     this.testCanSetDraftTimes++;
            // },
            //鼠标右击
            rowContextMenu(row, column, event) {
                if (this.selectedDoc.length == 0) {
                    this.$message({
                        message: "请选择一条数据",
                        type: "warning"
                    });
                } else {
                    if (event.preventDefault) {
                        event.preventDefault();
                    } else {
                        event.returnValue = false;
                    }
                    let vm = this;
                    this.rightmenuIsShow = true;
                    if (vm.selectedDoc.length === 0 || vm.selectedDoc.length === 1) {
                        this.seleDocIsSingle = true;
                    } else {
                        this.seleDocIsSingle = false;
                    }
                }
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
                for (var i = 0; i < this.selectedDoc.length; i++) {
                    if (this.selectedDoc[i].docType == 1) {
                        this.$message.error('文件夹不可选')
                        this.chosefileIds.length = 0;
                        this.chosefilelist.length = 0;
                        return
                    }
                    this.chosefilelist.push({docName:this.selectedDoc[i].docName,id:this.selectedDoc[i].id,opersmall:this.selectedDoc[i].opersmall});
                    let obj = {};
                    obj.id = this.selectedDoc[i].id;
                    obj.docId = this.selectedDoc[i].docId;
                    this.chosefileIds.push(obj)
                }
                this.remindbox = true;
            },
            // 删除提醒弹框中的文件
            deletefile(index){
                this.chosefilelist.splice(index,1);
                this.chosefileIds.splice(index,1)
            },
            //点x关闭提醒
            closediloages(){
                this.chosefilelist.length = 0; //文件列表
                this.chosefileIds.length = 0; // 文件列表id
                this.deployObj.length = 0; //选择人员id
                this.strs.length = 0; //选择角色id
                this.remindbox = false;  //提醒弹框
                this.chosepersonIds.length = 0;  //选择人员id数组
            },
            //关闭提醒
            closeremind(){
                if (this.chosefileIds == "") {
                    this.$message.error("未选中要关闭的文件");
                    return;
                }
                this.$post('/doc/project/closeReminder', {
                    data:{
                        fileIds:this.chosefileIds,
                        docSource: 0//项目文档0，底稿1
                    }
                }).then((response)=> {
                    //console.log(response.data)
                   if(response.code == this.success_code){
                        this.remindbox = false;
                        this.queryDoc();
                        this.chosefilelist.length = 0;
                        this.deployObj.length = 0;
                        this.chosefileIds.length = 0;
                        this.$message.warning({
                            message:"您已成功关闭本人设置的文件提醒"
                        });
                        this.$select.updateStatus(1, this.publicData.projectId, this.publicData.projectId)
                        // this.showSmallbell();
                    }else{
                        this.$message.error(response.msg);
                    }
                }).catch(function(error) {
                    console.log(error);
                });
            },
            // 开始设置提醒
            startsetRemind(){
                if (this.chosepersonIds.length == 0 && this.roleIds.length == 0) {
                    this.$message.error("请在提醒人员中添加人员或者角色");
                    return;
                }
                //return
                if (this.chosefileIds.length == 0) {
                    this.$message.error("请重新选择要提醒的文件");
                    return;
                }
                // if (this.roleIds == "") {
                //     this.$message.error("选择角色不能为空");
                //     return;
                // }
                this.$post('/doc/project/reminder',{
                    sourceName:'项目文档',//页面位置，记录日志用
                    projectName: this.publicData.projectName,//项目名称，记录日志用
                    data:{
                        acceptIds:this.chosepersonIds,  //人员id
                        acceptMemberIds:this.roleIds, //角色id
                        fileIds: this.chosefileIds, //文件id
                        projectId:this.publicData.projectId,  //项目id
                        docSource: 0//项目文档0，底稿1
                    }
                }).then((response)=> {
                    if(response.code == this.success_code){
                        this.remindbox = false;
                        this.$message.success({
                            message:"文件设置提醒成功"
                        });
                        this.queryDoc();
                        // this.showSmallbell();
                        this.chosefileIds = [];
                        this.chosefilelist = []; //文件列表
                        this.deployObj = []; //选择人员id
                        this.strs = []; //选择角色id
                        this.roleIds = [];
                        this.remindbox = false;  //提醒弹框
                        this.chosepersonIds = [];  //选择人员id数组
                        this.$select.updateStatus(1, this.publicData.projectId, this.publicData.projectId)
                        // 设置提醒成功之后取消选中状态
                        this.clearSelection()
                    }else{
                        this.$message.error(response.msg);
                    }
                }).catch(function(error) {
                    console.log(error);
                });
            },
            // 选中文件的
            handleSelectionChange(val) {
                //this.getvalue = val;
                // if (this.getvalue == undefined || this.getvalue == '' || this.getvalue == null) {
                //         this.disabled = true;
                // }
                // for (var i = 0; i < this.getvalue.length; i++) {
                //     if (this.getvalue[i].docType != 1 ) {
                //         this.disabled = false;
                //     }
                // }
                //let vm = this;
                //this.selectedDoc = val;
                //this.docExamselectedDoc = val;
                // // docType 0 为文件，1文件夹
                // let proFileIds = [],proFileDirIds = [],createBy = []
                // val.forEach(v => {
                //     if (v.docType == 0) {
                //         proFileIds.push(v.id)
                //         createBy.push(v.createBy)
                //     } else {
                //         proFileDirIds.push(v.id)
                //     }
                // })
                // let obj = {
                //     projectId: this.publicData.projectId,// 项目ID
                //     proFileIds: proFileIds.toString(), //文件ID集合
                //     proFileDirIds: proFileDirIds.toString(), //文件夹id集合
                //     createBy: createBy.toString()
                // }
                // console.log(proFileIds, proFileDirIds, obj, 366)
                // this.projectIndexData = obj
            },
            rowClass ({row, rowIndex}) {
                if (!this.selectedDoc) return
                if (this.selectedDoc.includes(row)) {
                    return {"background-color": "rgba(244,246,249,1)"}
                }
            },
            catalogExamClose() {
                this.catalogExamIsShow = false;
            },
            docRelationSingleClose() {
                this.singleDocRelationIsShow = false;
            },
            docRelationClose() {
                // this.docRelationIsShow = false;
                this.queryDoc();
            },
            docExamClose() {
                // this.$refs.multipleTable.clearSelection();
                // this.selectedDoc = [];
                // this.docExamselectedDoc = [];
                this.docExamIsShow = false;
            },
            docExamMultiple(res) {
              this.$message.warning(res.msg)
              let obj = {
                procTypeName: res.dialogTitle,
                procTypeId: res.procTypeId, // 审批类型id
                finaTypeId: this.$store.state.projectMsg.projectMsg.financingId,  // 业务类型id financingId
                finaTypeName: this.$store.state.projectMsg.projectMsg.financingName, // 业务类型 financingName
                projectId: this.$store.state.projectMsg.pro_id || this.publicData.projectId, // 项目id
                progStageId: this.$store.state.projectMsg.projectMsg.currentStageId,// 项目阶段id currentImplementStageId
                progStageName: this.$store.state.projectMsg.projectMsg.currentImplementStageName// 项目阶段 currentImplementStageName

              }
              this.$Business.processStore(obj)
              this.$router.push("/sponsor");
            },
            docExamSuccess(){
                this.queryDoc();
                this.$select.updateStatus(1, this.publicData.projectId, this.publicData.projectId)
                this.clearSelection()
            },
            uploadAddDocClose() {
                this.uploadDocAddIsShow = false;
                this.addDoc = false;
            },
            versionUploadAddDocClose() {
                this.uploadVersionAddIsShow = false;
                this.addVersion = false;
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
                    .then((response)=> {
                        if (vm.success_code == response.code) {
                            vm.powerSetData = response.data;
                        }
                    })
                    .catch(function (error) {

                    });
            },
            //获取某人对某个文件的文件权限
            queryPersonPower(item, index) {
                if (!item) {
                    item = this.powerSetData[0];
                    index = 0;
                }
                this.currentPowerPerson = index;
                this.currentPersonData = item;
                let vm = this;
                let data = {
                    token: this.token,
                    userId: this.userId,
                    data: {
                        docId: "",
                        userId: this.currentPersonData.userId //当前选中的人
                    }
                };
                if (this.selectedDoc.length == 0) {
                    data.data.docId = this.dbrowData.docId;
                } else {
                    data.data.docId = this.selectedDoc[0].id;
                }
                this.$post("/doc/paper/getFilePermOfUserId", data)
                    .then((response)=> {
                        vm.checkList = [];
                        if (vm.success_code == response.code) {
                            vm.permsType = JSON.parse(response.data.permsType);
                            if (vm.permsType.view) {
                                vm.checkList.push("预览");
                            }
                            if (vm.permsType.download) {
                                vm.checkList.push("下载");
                            }
                            if (vm.permsType.recovery) {
                                vm.checkList.push("还原版本");
                            }
                            if (vm.permsType.copy) {
                                vm.checkList.push("复制");
                            }
                            if (vm.permsType.delete) {
                                vm.checkList.push("删除");
                            }
                            if (vm.permsType.cut) {
                                vm.checkList.push("剪切");
                            }
                            if (vm.permsType.reName) {
                                vm.checkList.push("重命名");
                            }
                            // vm.permsType ={"remove":false,"preview":true}
                        } else if (response.code == "-504") {
                            vm.checkList = [];
                        }
                    })
                    .catch(function (error) {

                    });
            },
            //修改权限
            setPersonPower() {
                this.powerSetIsShow = false;
                let vm = this;
                let data = {
                    token: this.token,
                    userId: this.userId,
                    data: {
                        docId: vm.selectedDoc[0].id,
                        projId: this.publicData.projectId,
                        userId: this.currentPersonData.userId, //被设置权限人
                        createBy: this.userId, //谁设置了权限
                        docSource: 0,
                        permsType: JSON.stringify(this.permsType)
                    }
                };
                this.$post("/doc/paper/addFilePermOfUserId", data)
                    .then((response)=> {
                        if (vm.success_code == response.code) {
                            vm.$message({
                                type: "success",
                                message: "权限设置成功!"
                            });
                            //vm.powerSetData = response.data;
                        }
                    })
                    .catch(function (error) {

                    });
            },
            //  右键文件属性
            rightMenuNatureFn() {
                // if (this.selectedDoc.length == 0 || this.selectedDoc.length > 1) {
                //     this.$message({
                //         message: "请选择一条数据",
                //         type: "warning"
                //     });
                //     return;
                // } else {
                    if(this.right_click_data.docType != 0){
                        this.$message({
                            message: "文件夹不支持该功能，请选择文件",
                            type: "warning"
                        });
                        return;
                    }
                    this.isShowNature = true;
                    var _this = this;
                    var send_data = {
                        token: this.token,
                        userId: this.userId,
                        sourceName:'项目文档',//页面位置，记录日志用
                        projectName: this.publicData.projectName,//项目名称，记录日志用
                        data: {
                            docId: this.right_click_data.docId
                        }
                    };
                    _this
                        .$post("/doc/project/getDocAttributeInfo", send_data)
                        .then((response)=> {
                            if (_this.success_code == response.code) {
                                _this.select_nature_data = response.data;
                                _this.select_nature_data["docSize"] = _this.handleFileSize(
                                    parseInt(_this.select_nature_data["docSize"])
                                );
                            } else {
                                _this.$message({
                                    message: response.msg,
                                    type: "error"
                                });
                            }
                        })
                        .catch(function (error) {

                        });
                // }
            },
            docDiscuss(){
            //   let
              if(!this.$store.state.proChatIsShow) {
                this.$message.warning('当前无权限')
                return
              }
              let docTotal = this.manaullyFile.length + this.selectedDir.length;
              if (docTotal > 1) {
                  this.$message.warning('多文件无法操作，请重新选择')
                  return
              }
              let obj = this.manaullyFile[0] || this.selectedDir[0]// 选择文件的内容
              // console.log("right_click_data", this.right_click_data)
              this.$router.push({
                path: '/projecchat',
                query: {
                  docData: JSON.stringify(obj),
                  sourceName: '项目文档'
                }
              });
            },
            checkboxGroup(list) {
                let vm = this;
                for (var prop in vm.permsType) {
                    vm.permsType[prop] = false;
                }
                for (let i = 0; i < list.length; i++) {
                    switch (list[i]) {
                        case "预览":
                            vm.permsType.view = true;
                            break;
                        case "下载":
                            vm.permsType.download = true;
                            break;
                        case "还原版本":
                            vm.permsType.recovery = true;
                            break;
                        case "复制":
                            vm.permsType.copy = true;
                            break;
                        case "删除":
                            vm.permsType.delete = true;
                            break;
                        case "剪切":
                            vm.permsType.cut = true;
                            break;
                        case "重命名":
                            vm.permsType.reName = true;
                            break;
                        default:
                            break;
                    }
                }
            },
            //发起文件审批时判断是否存在手动加锁/PC编辑加锁的文件
            async hasHandSetLock() {
                var _this = this;
                let docIds = [];
                this.selectedDoc.map(item => {
                    docIds.push(item.docId)
                })
                var send_data = {
                    token: this.token,
                    userId: this.userId,
                    projectId: this.publicData.projectId,//项目id
                    data: {
                        docIdList: docIds
                    }
                };
                var data = await _this
                    .$post("/info/audit/judeFileHaveLock", send_data)
                    .then((response)=> {
                        if (_this.success_code == response.code) {
                            return response.data;
                        }
                    })
                    .catch(function (error) {

                    });
                return data;
            },
            docExamBtn(){
                if (this.selectedDoc.length == 0) {
                  this.$message.warning("请先选择文件");
                  return;
                }
                this.hasHandSetLock().then(res => {
                    if(res){
                        this.$message.warning('手动锁定的文件不可发起审批');
                        return;
                    }
                    this.docExam();
                });
            },
            //文件审核
            docExam() {
                this.docExamFilterDoc = this.$utils.cloneDeepArray(this.selectedDoc)
                this.examTitle = "文件审批";
                this.examType = '2';
                var haveNoExamIng = this.selectedDoc.findIndex(v=>v.auditStatus != 0 && v.auditStatus != 1 && v.auditStatus != 6);//是否有不是审批中、审批通过，修订审批中、归档的文件
                let placeFileList = this.selectedDoc.filter(function(obj){//归档文件列表
                    return obj.auditStatus == 8;
                });
                let examIngList = this.selectedDoc.filter(function(obj){//审批中，审批通过、修订审批中文件列表
                    return obj.auditStatus == 0 || obj.auditStatus == 1 || obj.auditStatus == 6;
                });
                let noCanExamLen = placeFileList.length + examIngList.length;
                if(placeFileList.length == this.selectedDoc.length){
                    this.$message({
                        message: "归档文件无法发起审批",
                        type: "warning"
                    });
                    return;
                } else if(noCanExamLen == this.selectedDoc.length){
                    this.$message({
                        message: "请先选择可审批的文件",
                        type: "warning"
                    });
                    return;
                } else if(placeFileList.length != 0 && this.selectedDoc.length > placeFileList.length){
                    this.$confirm('归档文件不能再进行审批，发起审批时将自动过滤', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            placeFileList.map(obj => {
                                this.docExamFilterDoc.splice(this.docExamFilterDoc.findIndex(v=>v.id == obj.id), 1);
                            })
                            // if (haveNoExamIng == -1) {
                            //     this.$message({
                            //         message: "请先选择可审批的文件",
                            //         type: "warning"
                            //     });
                            //     return;
                            // } else {
                                for (var i = 0; i < this.selectedDoc.length; i++) {
                                    this.selectedDoc[i].isShow = true;
                                    this.selectedDoc[i].hasDownBtn = true;
                                }
                                this.getDocFlowChart(2);
                            // }
                        }).catch(() => {
                    });
                } else {
                    if (haveNoExamIng == -1) {
                        this.$message({
                            message: "请先选择可审批的文件",
                            type: "warning"
                        });
                        return;
                    } else {
                        for (var i = 0; i < this.selectedDoc.length; i++) {
                            this.selectedDoc[i].isShow = true;
                            this.selectedDoc[i].hasDownBtn = true;
                        }
                        this.getDocFlowChart(2);
                    }
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
                    .then((response)=> {
                        if (vm.success_code == response.code) {
                            let data = response.data || {};
                            vm.catalogFlowChartData.modelId = data.actModelId || "";
                            vm.catalogFlowChartData.deploymentId = data.procDeployId || "";
                            vm.catalogFlowChartData.versionId = data.procVersionNum;
                            vm.catalogFlowChartData.financingTypeId =
                                data.finaTypeId || "";
                            vm.catalogFlowChartData.categoryId = data.procTypeId || "";
                            vm.catalogFlowChartData.catalogExamProcessName = data.procName || "";
                            vm.catalogExamIsShow = true;
                            // vm.$refs.catalogExam.initData();
                            vm.queryPaperTree();
                        } else {
                            vm.$message({
                                type: "warning",
                                message: response.msg
                            });
                        }
                    })
                    .catch(function (error) {
                        // vm.$message({
                        //     type: "warning",
                        //     message: response.msg
                        // });
                    });
            },
            //根据项目id查询文件流程图信息
            async getDocFlowChart(procTypeId) {
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
                let resData = await this.$post("/info/service/getProcessInfoByProjId", data)
                    .then((response)=> {
                        if (vm.success_code == response.code) {
                            let data = response.data || {};
                            vm.docFlowChartData.modelId = data.actModelId || "";
                            vm.docFlowChartData.deploymentId = data.procDeployId || "";
                            vm.docFlowChartData.versionId = data.procVersionNum;
                            vm.docFlowChartData.financingTypeId = data.finaTypeId || "";
                            vm.docFlowChartData.categoryId = data.procTypeId || "";
                            vm.docFlowChartData.docExamProcessName = data.procName || "";
                            if(procTypeId == 2){
                                vm.docExamIsShow = true;
                            } else if(procTypeId == 10){
                                return 'needExam';
                            }
                            // vm.$refs.docExam.initData();
                        } else if(procTypeId == 10 && response.code == -5041){
                            return 'noNeedExam';
                        }else if (response.code == -3520){
                            // console.log('存在多个要去发起审批页', vm.$store.state.projectMsg)
                            vm.$message({
                                type: "warning",
                                message: response.msg
                            });
                            let obj = {
                                procTypeName: procTypeId == 2 ? '文件审批' : '文件修订审批',// 审批类型
                                procTypeId: procTypeId, // 审批类型id
                                finaTypeId: vm.$store.state.projectMsg.projectMsg.financingId,  // 业务类型id financingId
                                finaTypeName: vm.$store.state.projectMsg.projectMsg.financingName, // 业务类型 financingName
                                procName: vm.$store.state.projectMsg.projectMsg.name, // 项目名称 name
                                projectId: vm.$store.state.projectMsg.pro_id, // 项目id pro_id
                                progStageId: vm.$store.state.projectMsg.projectMsg.currentImplementStageId,// 项目阶段id currentImplementStageId
                                progStageName: vm.$store.state.projectMsg.projectMsg.currentImplementStageName// 项目阶段 currentImplementStageName
                            }
                            vm.$Business.processStore(obj)
                            this.$router.push("/sponsor");
                            return;
                        } else{
                            vm.$message({
                                type: "warning",
                                message: response.msg
                            });
                            return;
                        }
                    })
                    .catch(function (error) {
                    });
                return resData;
            },
            postRevise(){//发起修订
                let fileList = [];
                this.selectedDoc.map(item => {
                    let obj = {};
                    obj.docId = item.docId;
                    obj.parentId = item.parentId;
                    fileList.push(obj)
                })
                let data = {
                    token: this.token,
                    userId: this.userId,
                    projectId: this.publicData.projectId,
                    data: {
                        fileList: fileList
                    }
                }
                this.$post("/info/audit/updateFileStatusForRevise", data)
                    .then((response)=> {
                        if (this.success_code == response.code) {
                            this.$message.success(response.msg);
                            this.queryDoc();
                            this.$select.updateStatus(1, this.publicData.projectId, this.publicData.projectId)
                            this.clearSelection()
                        }else {
                            this.$message.warning(response.msg);
                        }
                    })
                    .catch(function (error) {
                    });
            },
            // docExamQueryDoc(){
            //     setTimeout(() => {
            //         this.queryDoc();
            //     }, 1000);
            // },
            //获取底稿目录
            queryPaperTree() {
                let vm = this;
                let data = {
                    "token": this.token,
                    "userId": this.userId,
                    "pageNo": 0,
                    "pageSize": 10,
                    "data": {
                        "projectId": this.publicData.projectId,
                        "parentId": 0,
                        orderFlag: this.orderFlag,
                    }
                }
                this.$post('/doc/paper/query', data).then((response)=> {
                    if (vm.success_code == response.code) {
                        vm.paperTreeData = response.data.content;
                    }
                }).catch(function (error) {

                });
            },
            getDiscuss () {
              if (this.manaullyFile.length == 0 && this.selectedDir.length == 0) {
                this.$message({
                    message: "请选择一条数据",
                    type: "warning"
                });
                return
              }
              this.docDiscuss()
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
                        .then((response)=> {
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
                        .catch(function (error) {

                        });
                }
                return data;
            },
            //  判断选中的列表是否可进行复制剪切（已锁定，审核中的文件不能进行复制剪切）
            async canCopyOrCut(seleFileIds, seleFolderIds,arr) {
                var _this = this;
                var send_data = {
                    token: this.token,
                    userId: this.userId,
                    data: {
                        "doc": seleFileIds.join(','),//文件id
                        "dir": seleFolderIds.join(','),//文件夹id
                        "projId": this.publicData.projectId,//项目id
                        "ids": arr.join(',')//选中的文件和文件夹的id集合
                    }
                };
                var data = await _this
                    .$post("/doc/project/projectPaperIsCut", send_data)
                    .then((response)=> {
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
                    .catch(function (error) {

                    });
                return data;
            },
            //  判断当前用户是不是文件创建人
            creatIsUser() {
                let isCreatUser = true;
                // for (var i = 0; i < this.selectedDoc.length; i++) {
                //   if(this.selectedDoc[i].createBy != this.userId){
                //       isCreatUser = false;
                //   }
                // }
                return isCreatUser;
            }
        }
    };
</script>
<style scoped lang="scss" type="text/css">
.el-table::before{
    height: 0;
}
.project-doc {
  .el-dialog__footer{
    margin-top: 0!important
  }
  .title {
    text-align: left;
    padding-left: 10px;
  }
  .el-breadcrumb {
    line-height: 40px;
  }
  .project-doc-top {
    position: relative;
    background: #fff;
  }
  .project-doc-rec {
    position: absolute;
    right: 25px;
    top: 50px;
    .el-button{
        padding: 8px 10px
    }
  }
  .stage-list {
    // position:relative;
    // position: absolute;
    // left:0;
    // top: 0;
    height: auto;
    padding-right: 106px;
    margin-bottom: 10px;
    .more-stage{
        top: 10px;
        i{
            color:#5c5a5d;
        }
    }
    li {
      float: left;
      display: flex;
      height: 34px;
      align-items: center;
      i{
          margin-top:10px;
      }
    }
    a {
      float: left;
      cursor: pointer;
      height: 24px;
      line-height: 24px;
      background: #ccc;
      padding: 0 28px;
      margin-top:10px;
      margin-right: 6px;
      color: #fff;
      font-size: 12px;
      border-radius: 12px;
    }
    a.active {
      background: rgba(26, 95, 164, 1);
    }
    a.cur {
      background:#409EFF;
    }
    span {
      float: left;
      height: 24px;
      line-height: 24px;
      background: #ccc;
      padding: 0 28px;
      margin-right: 6px;
      color: #fff;
      font-size: 12px;
      border-radius: 12px;
    }
    span.active {
      background: rgba(26, 95, 164, 1);
    }
    i {
    font-size: 20px;
    color: #ccc;
    margin-right: 5px;
    //   float: left;
    //   width: 33px;
    //   height: 8px;
    //   margin-top: 8px;
    //   margin-right: 6px;
    //   background: url("../../../../assets/project_doc/docArrow.png") no-repeat 0 0;
    }
    i.active {
      background: url("../../../../assets/project_doc/docArrowActive.png")
        no-repeat 0 0;
    }
  }
  .stage-list-box{
      position: relative;
      height: 42px;
      overflow: hidden;
  }
  .stage-list-min-box{
      height: 40px;
      overflow: hidden;
  }
  .stage-list-box.stage-list-min-box2{
      height: auto
  }
  .more-stage{
      position: absolute;
      top: 18px;
      right:14px;
      padding: 6px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 12px;
    //   background: rgba(240,241,243,1);
      color: #5c5a5d;
  }
  .more-stage:hover{
      color: #fff;
      i{
        color: #fff;
      }
  }
  .more-stage.el-button.is-disabled.el-button--text{
      border: 1px solid #ccc;
  }
  .more-stage i{
      margin-right: 0;
    //   margin-left: 2px;
      font-size: 8px;
  }
  .project-doc-con {
    margin-top: 14px;
    padding-bottom:10px;
    background: #fff;
    // .el-breadcrumb-box{
    //     width:80%;
    //     height:30px;
    //     overflow: hidden;
    // }
    .el-breadcrumb-ul{
        // display: flex;
        // overflow-x: auto;
        align-items: center;
        height: 28px;
        max-height:40px;
        line-height: 28px;
        border: 1px solid #D7D7D7;
        margin-left: 5px;
        padding-right:7px;
        padding-left: 7px;
        background: #F7F8FA;
        border-radius: 1px;
        width:80%;
        // overflow-x: auto;
        white-space: nowrap;
    }
  }
  .search-box{
      position: relative;
      padding-bottom:10px;
      border-bottom: 1px solid #e8e8e8;
      .more-stage{
          right: 24px;
          top: 26px;
      }
  }
  .search-btn-box{
      margin-top: 18px;
      margin-right: 118px;

  }
  .search-item-box{
    //   position:relative;
      height: 64px;
      margin-right: 10px;
      overflow: hidden;
    .el-date-editor.el-input{
        width: 196px;
    }
  }
  .search-item-box.search-item-box-max{
      height: auto;
  }
  .search-item-box.search-item-box-min{
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
      // height: 32px;
      .el-input {
        width: 308px;
        // height:32px;
      }
      .el-input__inner {
        // height: 32px;
      }
      .el-select {
        width: 308px;
      }
    }
    .el-button {
      float: left;
      margin-left: 20px;
    }
  }
  .pro-doc-operation {
    position:relative;
    // padding: 8px 0 20px 10px;
    padding: 8px 106px 0 10px;
    margin-right: 8px;
    // border-bottom: 1px solid #e8e8e8;
    font-size: 14px;
    font-weight: 400;
    color: #fff;
    .more-stage{
        top: 12px;
    }
    .pro-doc-operation-item {
      float: left;
      height: 30px;
      line-height: 30px;
      margin-right: 12px;
      margin-bottom:12px;
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
    .operation-item-btn{
        height: 30px;
        line-height: 30px;
        margin-right: 12px;
        margin-bottom:20px;
        padding: 0 16px;
        border: 1px solid #e7e7e7;
        border-radius: 3px;
        background: rgba(242, 243, 245, 1);
    }
    // .new-built i {
    //   width: 16px;
    //   height: 14px;
    //   background: url("../../../../assets/project_doc/xinjian2.png") no-repeat 0 0;
    // }
    // .new-built:hover i {
    //   background: url("../../../../assets/project_doc/xinjian.png") no-repeat 0 0;
    // }
    // .copy-mould i {
    //   width: 17px;
    //   height: 15px;
    //   background: url("../../../../assets/project_doc/moban2.png") no-repeat 0 0;
    // }
    // .copy-mould:hover i {
    //   background: url("../../../../assets/project_doc/moban.png") no-repeat 0 0;
    // }
    // .upload i {
    //   width: 15px;
    //   height: 15px;
    //   background: url("../../../../assets/project_doc/shangchuan2.png") no-repeat
    //     0 0;
    // }
    // .upload:hover i {
    //   background: url("../../../../assets/project_doc/shangchuan.png") no-repeat 0
    //     0;
    // }
    // .download i {
    //   width: 16px;
    //   height: 15px;
    //   background: url("../../../../assets/project_doc/xiazai2.png") no-repeat 0 0;
    // }
    // .download:hover i {
    //   background: url("../../../../assets/project_doc/xiazai.png") no-repeat 0 0;
    // }
    // .delete i {
    //   width: 15px;
    //   height: 16px;
    //   background: url("../../../../assets/project_doc/shanchu2.png") no-repeat 0 0;
    // }
    // .delete:hover i {
    //   background: url("../../../../assets/project_doc/shanchu.png") no-repeat 0 0;
    // }
    // .Edition i {
    //   width: 13px;
    //   height: 16px;
    //   background: url("../../../../assets/project_doc/banben2.png") no-repeat 0 0;
    // }
    // .Edition:hover i {
    //   background: url("../../../../assets/project_doc/banben.png") no-repeat 0 0;
    // }
    // .doc-rela i {
    //   width: 16px;
    //   height: 16px;
    //   background: url("../../../../assets/project_doc/guanlian2.png") no-repeat 0
    //     0;
    // }
    // .doc-rela:hover i {
    //   background: url("../../../../assets/project_doc/guanlian.png") no-repeat 0 0;
    // }
    // .doc-exam i {
    //   width: 15px;
    //   height: 16px;
    //   background: url("../../../../assets/project_doc/shenhe2.png") no-repeat 0 0;
    // }
    // .doc-exam:hover i {
    //   width: 15px;
    //   height: 16px;
    //   background: url("../../../../assets/project_doc/shenhe.png") no-repeat 0 0;
    // }
    // .catalog-exam i{
    //   width: 13px;
    //   height: 16px;
    //   background: url("../../../../assets/project_doc/mulushenhe2.png") no-repeat 0 0;
    // }
    // .catalog-exam:hover i{
    //   width: 13px;
    //   height: 16px;
    //   background: url("../../../../assets/project_doc/mulushenhe.png") no-repeat 0 0;
    // }
    // .dicuss-exam a{
    //     color: #C0C4CC;
    // }
    // .dicuss-exam i {
    //   width: 17px;
    //   height: 20px;
    //   background: url("../../../../assets/project_doc/black.png") no-repeat 0 0;
    // }
    // .dicuss-exam1 a{
    //     color: #000;
    // }
    // .dicuss-exam1 i {
    //   width: 17px;
    //   height: 20px;
    //   background: url("../../../../assets/project_doc/black2.png") no-repeat 0 0;
    // }
    // .dicuss-exam1:hover i {
    //   width: 17px;
    //   height: 20px;
    //   background: url("../../../../assets/project_doc/black.png") no-repeat 0 0;
    // }
  }
  .pro-doc-operation2{
      height: 44px;
      overflow: hidden;
  }
  .pro-doc-operation.pro-doc-operation-max{
      height: auto;
  }
  .new-creat {
    width: 300px;
    margin-top: 20px;
    padding-left: 68px;

    .new-creat-doc {
      float: left;
      width: 210px;
    }
  }
  .new-creat-icon {
      float: left;
      width: 30px;
      height: 30px;
      margin-left: -2px;
      background: url("../../../../assets/project_doc/wenjianjia.png") no-repeat 0
        0;
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
      margin-top:2px;
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
        //   border-radius: 10px;
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
  .rightMenu {
    position: fixed;
    z-index: 12;
  }
  .nodata_box {
    text-align: center;
    padding: 150px 0;
    font-size: large;
    background-color: #fff;
  }
  .project-doc-list .el-col-15{
    display: flex;
    width:100%;
    padding-top: 4px;
  }
  .project-doc-top{
    .head{
      padding-right: 8px;
      text-align: left;
      color:#333333;
      font-size: 20px;
        font-weight: bold;
    }
    .stage-tips{
      padding-top: 9px;
      font-size: 12px;
      i{
        width: 20px;
        height: 12px;
        margin-top:2px;
        margin-right: 6px;
        border-radius: 2px;
      }
      span{
        padding-right: 4px;
      }
    }
    .no-past{
      background: #ccc;
    }
    .toggle-project-box{
        margin-right: 40px;
    }
  }
  .doc-state li{
    margin-right:4px;
    .suo-icon{
        color:#c0c4cc;
    }
    .tongzhi-icon{
        color: #F56C6C;
    }
  }
  .el-date-editor--daterange.el-input__inner{
    width:308px;
    // height:32px;
  }
  .el-form-item .el-form-item__content .q-308{
    width:286px;
    // height:32px;
    // line-height: 32px;
  }
  .el-form-item .el-form-item__content .q-240{
    width:240px;
  }
  .el-form-item .el-form-item__content .q-196{
    width:196px;
  }
  .el-button--medium {
    padding: 12px 20px;
    margin-top:0px;
  }
  .goBack .el-button{
    padding: 8px 20px;
    margin-right:12px;
  }
  .table-doc-name{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .table-doc-name.noIcon {
    margin-top:6px;
  }
  // 以下为分页
  .el-pagination{
    // margin-top:20px;
    // margin-right:16px;
    // margin:20px 16px 16px 0;
    padding: 0;
    margin: 0;
    padding-top: 10px;
    margin-right: 21px;
    text-align: right;
  }

}
//删除时含有设为底稿的文件提示
.delete_has_draft_tips{
    .delete_has_draft_tips_con{
        position: relative;
        padding-left: 52px;
        // padding: 0 38px 20px 52px;
    }
    .delete_has_draft_tips_con_text{
        text-align: left;
        border: none;
        .el-button{
            padding: 0 0 0 4px;
            font-weight: 400;
        }
    }
    .el-icon-warning{
        position: absolute;
        left: 4px;
        top: 16px;
        font-size: 22px;
        color: #e6a23c;
    }
}
//被关联详情
.index-details{
    .el-table::before{
        height: 0px;
    }
    .name_col_name p{
        width: 300px;
        overflow:hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: 6px;
    }
}
//文件状态图标
.name_col_name{
    // flex: 1;
    width: 80%;
}
.suolin-icon, .beizhu-icon{
    color: #299be4;
}
.shenpijilu-icon{
    color: #f8b164;
}

//
.footer-con{
    width: 100%;
    height: 50px;

}
.footer-box{
    width: calc(100% - 236px);
    height: 50px;
    // line-height: 50px;
    position: fixed;
    bottom: 10px;
    border-top: 1px solid #ddd;
    background: #fff;
    z-index: 10;
    padding-left: 16px;
}
.footer-box-l{
    margin-top: 14px;
}
</style>
<style lang="scss" type="text/css">
#app .project-doc .list-item-box{
    display:list-item;
}
.project-doc{
  // .el-breadcrumb__inner,.el-breadcrumb__separator,.el-breadcrumb__item:last-child .el-breadcrumb__inner{
  //   color:#333;
  // }
  // .el-breadcrumb__separator{
  //   margin:0 4px 0 2px;
  // }
  // .el-table th>.cell {
  //   color:#333;
  // }
  .el-breadcrumb-item-li{
    cursor:pointer;
    padding: 0 5px;
    display: inline-block;
  }
  .project-doc-list td{
   border:none;
   padding: 0;
   height: 64px;
//    vertical-align:top;
//    padding: 14px 0 12px 0;
    // padding: 5px 0 12px 0;
  }
  .project-doc-list .noIconBox .name_col_box{
    //   padding: 26px 0 22px 0;
    margin-top: -10px

  }
  .project-doc-list .name_col_box{
    //   padding: 54px 0 10px 0;
  }
  .project-doc-list .cell{
    line-height: 26px;
  }
  .el-table td, .el-table th.is-leaf {
    border:none;
  }
  .el-form-item__label {
    // line-height: 32px;
    // margin-top:4px;
  }

  .power-set-content{

    .el-checkbox__input.is-checked+.el-checkbox__label{
      color:#606266;
    }
    .el-dialog__header{
      border-bottom:1px solid #dedede;
    }
    .el-dialog__body{
      padding:18px 0;
      .el-dialog__header{
          border-bottom:1px solid #dedede;
      }
    }
  }

  .el-dialog__body{
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
//   111
  .reminddialog {

    .remindfont {
        text-align: left;
        color:#DE4747;
        line-height: 26px;
    }

    .riwjn_we {
    // margin-left: 50 px;
        margin-top:20px;
        display: flex;
        flex-wrap: wrap;
        position: relative;
        top: -10px;
        .shekterAdd{
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
    .riwjn_wechose{
        margin-top:10px;
        display: flex;
        flex-wrap: wrap;
        position: relative;
          max-height: 70px;
        overflow-y: auto;
        top: -10px;
        .shekterAdd{
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
    .usernanmestltfile{
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
    .chosefile{
        width:86%;

        .file_name{
            float: left;
            // margin-top: -9px;
            width:300px;
            overflow: hidden;
            text-overflow: ellipsis;
                white-space: nowrap;
            }
            i{
                float: right;
                margin-left:10px;position: relative;
                cursor: pointer;
            }
        }
        .chosefile:hover{
            background:#F7F9FB;
        }


    }
    .newremind .el-button--small{
        padding: 8px 17px;
        font-size: 14px;
        background-color: #f2f3f5;
        float:left;
    }
    .newremind .el-button:focus, .newremind .el-button:hover{
        color: #fff;
    }
    //删除时含有设为底稿的文件提示
    .delete_has_draft_tips{
        .el-dialog__header{
            text-align: left;
        }
        .el-dialog__body{
            padding-top: 0;
            // padding: 0 38px 20px 52px;
        }
        .dialog-footer{
            text-align: right;
            margin-top: 10px;
        }
    }
    .index-details{
        .el-dialog__header{
           border-bottom: 1px solid #e6e6e6;
           font-weight: 400;
           color: #333;
        }
        .el-table td{
           padding: 6px 0;
           border-bottom: 1px solid #ebeef5;
        }
    }
}
</style>
