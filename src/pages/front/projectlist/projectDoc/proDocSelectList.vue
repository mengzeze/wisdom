<template>
    <div class="project-doc-selected">
        <div class="project-doc-top">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>项目管理</el-breadcrumb-item>
                <el-breadcrumb-item>项目文档</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="clearfix">
                <el-button icon="el-icon-back" circle @click="back" class="back_btn fl"></el-button>
                <p class="head fl">已选文件列表</p>
            </div>
        </div>
        <div class="project-doc-con">
            <div :class="[{'pro-doc-operation-max':moreHandleAutoH},{'pro-doc-operation2':!moreHandleAutoH},'pro-doc-operation','clearfix']">
                <el-button type="text" class="more-stage bgcolor-primary-hover" @click="showAllBtn()" v-if="!packHandleVisible && moreHandleBtnVisible">
                    更多
                    <i class="iconfont jiantou"></i>
                </el-button>
                <el-button type="text" class="more-stage bgcolor-primary-hover" @click="packUpBtn()" v-if="packHandleVisible">
                    收起
                    <i class="iconfont jiantou_shang"></i>
                </el-button>
                <ul style="float:left" class="newremind">
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
                    <!-- <li class="doc-rela pro-doc-operation-item" @click="docRelationBtn" v-if="$utils.m('paper_manage') && permission.projectFileToPaper">
                        <a href="javascript:;">
                            <i></i>
                            设为底稿
                        </a>
                    </li> -->
                    <!-- @click="docExamBtn" -->
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
                    <li class="pro-doc-operation-item" @click="setRemind">
                        <a href="javascript:;">
                            <i class="ling iconfont"></i>
                            设置提醒
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
                    <li class="pro-doc-operation-item fl" @click="exportBtn">
                        <a href="javascript:;">
                            <i class="daochu14px iconfont"></i>
                            导出
                        </a>
                    </li>
                    <li class="pro-doc-operation-item fl" @click="fileApprove(10)">
                        <a href="javascript:;">
                            <i class="xiuding iconfont"></i>
                            文件修订
                        </a>
                    </li>
                    <li class="pro-doc-operation-item fl" @click="remarkBtn">
                        <a href="javascript:;">
                            <i class="shenpijilu iconfont"></i>
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
            <div class="project-doc-list">
                 <el-table
                    ref="multipleTable"
                    :row-style="rowClass"
                    highlight-current-row
                    :data="docInitList"
                    @select-all="handleSelectAll"
                    @select="handleSelectDoc"
                    @row-dblclick="getDblClickId"
                    @selection-change="handleSelectionChange" :height="tableHeight">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column label="文件名" prop="docName" min-width="560">
                        <template slot-scope="scope">
                            <el-col :span="15" class="name_col clearfix" style="position:relative" :title="scope.row.docName">
                                    <p class="fl"><img :src="scope.row.fileIcon"></p>
                                    <div class="fl name_col_name">
                                        <div :class="[{noIcon:scope.row.auditStatus == null && !scope.row.notes && !scope.row.lockState && !scope.row.record && !scope.row.reminder && scope.row.linkList == null && scope.row.paperLabelList == null},'table-doc-name']"  :title="scope.row.docName">
                                        {{scope.row.docName}}
                                        </div>
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
                    <el-table-column label="所在目录" prop="parentName" min-width="200">
                            <template slot-scope="scope">
                                <el-col>
                                    <p :title="scope.row.path" class="overflow-hidden">{{scope.row.parentName}}</p>
                                </el-col>
                            </template>
                    </el-table-column>
                    <el-table-column label="修改时间" prop="updateTime" min-width="160">
                    </el-table-column>
                    <el-table-column label="大小" prop="size" min-width="140">
                    </el-table-column>
                    <el-table-column label="操作" min-width="150">
                        <template slot-scope="scope">
                            <el-button type="text" @click="toogleExpand(scope.row)" v-if="scope.row.docType == 0">摘要</el-button>
                            <el-button type="text" @click="docLocationBtn(scope.row)">定位</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column type="expand" width="1">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="">
                                <span v-html="props.row.highlightContent"></span>
                            </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="footer-con">
                <div class="footer-box clearfix">
                    <p class="footer-box-l fl">已选中{{selectedNum}}项</p>
                    <el-pagination
                    class="fr"
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="mySearch.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="mySearch.dataCount" :page-count="mySearch.pageCount">
                    </el-pagination>
                </div>
            </div>
        </div>
        <!-- 版本弹窗 -->
        <file-version :versionIsShow="versionIsShow"
                    :docVersionlist="docVersionlist"
                    :parentdata="selectedDoc[0]"
                    flag="project"
                    @new-version="uploadVsion(selectedDoc)"
                    @colseModule="versionClose" @queryDoc="versionUpdate"></file-version>
        <!-- 索引列表的弹框 -->
        <project-index-lists
            :projectIndexShow.sync="projectIndexShow"
            :projectIndexData="projectIndexData"
            @sendProjectHandle="sendProjectHandle">
        </project-index-lists>
        <!-- 文件审核 -->
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
        <catalog-exam
            v-if="catalogExamIsShow"
            ref="catalogExam"
            :catalogFlowChartData="catalogFlowChartData"
            :catalogExamIsShow="catalogExamIsShow"
            :projectData="publicData"
            @sendValueToParent="catalogExamClose"
        ></catalog-exam>
        <findall-deptuser
            :findFlagShow.sync="findFlag"
            v-on:findAllUser="findAllUser"
            :findUserObj="user_num === 1 ? findUserObj : findUserObjM"
            :findState="findState"
            :checkState="checkState"
        ></findall-deptuser>
        <select-boxs :setdatas="setdatas" :rights="rights"  v-if="flags" v-on:statesbox='statesboxs'  :Role="Role" :roledata="roledata">
        </select-boxs>
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
                            <img @click="optPrinFn(1)"  src="../../../../assets/image/addtask.png" alt="" class="shekterAdd">
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
                        <li class="chosefile" v-for="(item,index) in choseDoclist" :key="index">
                            <span class="file_name" :title="item.docName">{{item.docName}}</span>
                            <i class="" @click="deletefile(index)">删除</i>
                        </li>
                    </ul>
                </div>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button size="medium" @click="closeremind">关闭提醒</el-button>
                <el-button size="medium" type="primary" @click="startsetRemind">设置提醒</el-button>
            </span>
        </el-dialog>
        <el-dialog  title="提示" :close-on-click-modal="false" :visible.sync="draftDetailBtn" width="422px"  class="delete_has_draft_tips">
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
        <el-dialog  title="详情" :close-on-click-modal="false" :visible.sync="indexIsShow" width="1140px"  class="index-details">
            <div>
                <el-table
                :data="indexTableData"
                height="480px"
                :header-cell-style="{background:'#FAFAFA',color:'black',fontWeight:'bold'}"
                style="width: 100%"
                >
                    <!-- <el-table-column prop="docName" label="将要删除文件" width="350"></el-table-column> -->
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
        <el-dialog  title="提示" :close-on-click-modal="false" :visible.sync="draftDetailBtn" width="422px"  class="delete_has_draft_tips">
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
        <rd-uploader ref="RdUploader" :transfer="true" @version="docUploadVersion"></rd-uploader>
        <remark :remarkIsShow="remarkIsShow" title="备注" :docData="selectedDoc" :proData="publicData" :remarkList="remarkList" @saveRemark="saveRemark" @colseModule="remarkClose"></remark>
    </div>
</template>
<script>
import verSion from "@/pages/front/projectlist/projectDoc/versionProjectDoc";
import catalogExam from "@/pages/front/projectlist/projectDoc/catalogExam";
import docRelation from "@/pages/front/projectlist/projectDoc/docRelation";
import docExam from "@/pages/front/projectlist/projectDoc/docExam";
import findallDeptuser from "@/components/select_box/findAllDeptUserMultipleNew";
import selectBoxs from '@/components/select_box/select_boxs3'
import projectIndexLists from "@/pages/front/projectlist/projectDoc/projectIndexLists"
import remark from "@/components/file/remark"
export default {
    name: "proDocSelectList",
    components: {
        verSion,
        catalogExam,
        docRelation,
        docExam,
        findallDeptuser,//选择人员弹窗
        selectBoxs,
        projectIndexLists,
        remark
    },
    props:[

    ],
    data() {
        return {
            isPC: this.$store.state.isPC,
            dateStart: '',
            dateEnd: '',
            token:"",
            userId:'',
            success_code: "",
            fromItem: 0,//项目文档跳转过来0，项目文档搜索结果页跳转过来1
            docInitList: [],//项目列表
            cacheDocInitList: [],//前端存储在store中的已选文件列表
            orderFlag: "",//表格数据排序依据
            projectId: '',//项目ID
            stageList: [],
            projectData: {},//跳转路由传过来的项目信息
            isSearch: true,
            mySearch: {
                dataCount: 0,//数据条数
                pageCount: 1,//总页数
                pageSize: 100,
                pageNo: 0
            },
            currentPage: 1,
            searchedTerm: {
                searchList: {
                    titleKey: '',
                    conKey: '',
                    proStage: '',
                    dirStateSel: [], // 目录状态检索条件
                    fileStateSel: [], // 文件状态检索条件
                    fileTypesSel: [],//文件类型检索条件
                    startTime: '',
                    endTime: ''
                },
                proStageList: [],
                docTypeList: [
                    {
                        type: '全部',
                        id: ''
                    },
                    {
                        type: 'Word文档',
                        id: '0'
                    },
                    {
                        type: 'PDF文档',
                        id: '1'
                    },
                    {
                        type: 'Excel文档',
                        id: '2'
                    },
                    {
                        type: 'txt文档',
                        id: '3'
                    },
                    {
                        type: 'png图片',
                        id: '4'
                    },
                    {
                        type: 'jpg图片',
                        id: '5'
                    }
                ]
            },
            currentQueryDoc: false,
            publicData: {
                projectId: '',//项目ID
                projectName: '',//项目名称
                processName: '',//流程名称
                processId: '',//流程id
                docParentId: 0,//上级目录ID
                pathNameList: [],//文件目录
                projectCreatBy: ''//项目创建人
            },//公共基础数据
            permission: {
                projectFileDir: this.$utils.checkProjectPermission('project_file_dir'), // 新建项目
                projectFileMould: this.$utils.checkProjectPermission('project_file_mould'), // 引用模板
                projectFileUpload: this.$utils.checkProjectPermission('project_file_upload'), // 上传
                projectFileDition: this.$utils.checkProjectPermission('project_file_dition'), // 版本
                projectFileToPaper: this.$utils.checkProjectPermission('project_file_to_paper'), // 尚未底稿
                projectFileApprove: this.$utils.checkProjectPermission('project_file_approve'), // 文件审核
                projectDirApprove: this.$utils.checkProjectPermission('project_dir_approve'), // 目录审核
            },
            selectedDoc: [], //当前选中的文件(不包括文件夹)
            selectedDir: [], //当前选中的文件夹id集合(不包括文件)
            selectedDirIds: [], //当前选中的文件夹id集合(不包括文件)
            manaullyFile: [],//用户手动选中的文件
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
            versionIsShow: false,//是否显示版本弹窗
            docVersionlist: [], //版本列表
            uploadParamData: {   //上传新版本需要传的数据
                docSource: 0,//项目文档固定为0
                projId: '',
                parentId: 0,
                auditProjectId: '' //流程id
            },
            stageIsAll: false,//阶段是否为全部
            //文件审核
            docExamIsShow: false, //是否显示文件审核
            examType: '2',//审批类型，文件审批2/修订审批10
            docExamFilterDoc:[],//发起文件审批时过滤后的文件列表
            docFlowChartData: {    //流程图相关信息
                modelId: "",
                deploymentId: "",
                versionId: "",
                financingTypeId: "",
                categoryId: "",
                docExamProcessName: ''
            },
            //目录审批
            catalogExamIsShow: false, //是否显示目录审批弹窗
            catalogFlowChartData: {
                modelId: "",
                deploymentId: "",
                versionId: "",
                financingTypeId: "",
                categoryId: "",
                catalogExamProcessName: ''
            },
            // 设置提醒
            remindbox: false,//提醒弹窗是否显示
            deployObj: [], //设置提醒人员
            chack_bule: false,
            strs:[],
            choseDoclist:[],//设置提醒选择的文件集合
            chosefileIds:[],//设置提醒选择的文件id集合
            findFlag: false,//添加人员弹窗
            findState: {},
            checkState: {},
            user_num: "", //选择人员标识
            ccObj: [], //添加抄送人员
            chosepersonIds: [],
            //选择角色
            setdatas:[],
            rights:'',
            flags:false,//是否显示选择角色弹窗
            roledata:'',
            Role:'',
            setdata:[],
            roleIds:[],
            bread_crumbs: [{title: "根目录", parentId: 0}],//路径
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
            reNameIndex: 0, //显示重命名编辑框的下标值
            isShowNature: false, //是否显示文件属性弹框
            select_nature_data: "", //文件属性相关数据
            // 1.2.2
            //被索引详情弹窗相关
            indexIsShow: false,//被索引详情是否展示
            indexTableData: [],//被索引详情列表
            draftDetailBtn: false,//删除时提示已有设为底稿的文件
            deleDraftTips: '',//删除时提示已有设为底稿的弹窗文字
            deleteDocList: [],//将要删除的文件列表
            indexDetailsIds: [],//要获取被索引详情的文件id集合
            filterSetDraftDoc: 0,//每次点击“设为底稿”按钮时如果有选中的文件夹，把验证出的空目录、含有设为底稿文件的文件夹个数记录下来
            testCanSetDraftTimes: 0,//验证次数
            folderTotal: 0,//选中的文件夹个数
            hasSetedDoc: false,//选中的文件中是否有已设为底稿的文件
          findUserObj: [],
          findUserObjM: [],
            projectIndexShow: false, // 索引列表值
            projectIndexData: {}, // 索引传值
            moreStageAutoH: false,//收起，展开状态
            packBtnVisible: false,
            moreSearchAutoH: false,
            packSearchVisible: false,
            moreHandleAutoH: false,
            packHandleVisible: false,
            moreHandleBtnVisible: false,
            tableHeight: 600,//文件列表表格高度
            examTitle: '文件审批',//文件审批或修订审批弹窗标题
            remarkIsShow: false,//备注弹窗
            remarkList: [],//单个文件备注列表
            reqApi: '', //动态请求地址
        }
    },
    created() {
        this.isPC = this.$store.state.isPC;
        this.reqApi = global.baseUrl;
        this.token = this.$store.state.loginObject.userToken;
        this.userId = this.$store.state.loginObject.userId;
        this.success_code = this.code.codeNum.SUCCESS;
        this.projectId = this.$store.state.projectMsg.pro_id;//项目id
        this.uploadParamData.projId = this.projectId;
        this.publicData.projectId = this.projectId;
        this.publicData.projectCreatBy = this.$store.state.projectMsg.projectMsg.createBy;//项目创建人
        this.projectData = JSON.parse(this.$route.query.projectData) || {};
        this.fromItem = this.$route.query.fromItem || 0;
        console.log('项目数据',this.projectData)
        this.publicData.processId = this.projectData.processId;
        this.publicData.projectName = this.projectData.projectName;
        this.publicData.projectId = this.projectData.projectId;
        console.log('已选数据',this.$select.getSelectedData(1,this.publicData.projectId))
        this.cacheDocInitList = this.$utils.cloneDeepArray(this.$select.getSelectedData(1,this.publicData.projectId).file);
        this.queryDoc();
        // this.queryDocPath()
        this.queryStage();
        this.$forceUpdate()
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
    },
    mounted() {
        this.queryPerson();
        this.getTableHeight();
        this.isShowMoreSearchBtn()
        window.addEventListener('scroll', this.handleScroll,true);
        window.onresize = () => {
            return (() => {
                this.getTableHeight();
                this.isShowMoreSearchBtn()
            })()
        }
    },
    computed: {
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
        },
        versionMsg() {
            return this.$store.state.versionMsg;
        }
    },
    watch: {
        // 处理版本变更通知
        versionMsg(val) {
        // docSource 为0是项目文档， 1是底稿管理，2是客户文档
        if (val.docSource != 0) return

        let idx = this.docInitList.findIndex(v => v.docId == val.docId)
        // 当前无数据，return
        if (idx < 0) return
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


        Object.assign(this.docInitList[idx], updatedObj)

        // 版本号放大样式处理
        let el = $('#multipleTable tr').eq(idx + 1).find('.version-style')
        el.addClass('rdpulse')
        setTimeout(() => {
            el.removeClass('rdpulse')
        }, 3000)
        // 如果返回的消息中type类型为6，为上传新版本消息通知时，需要取消选中
        console.log(val, 2365)
        if (val.docDescript == '上传新版本') { this.clearSelection() }
        },
        currentPage(newV, oldV) {
            this.mySearch.pageNo = newV - 1;
        },
        testCanSetDraftTimes(newVal, oldVal){
            if(this.testCanSetDraftTimes == this.folderTotal){
                this.docRelation();
            }
        },
        selectedData:{
            handler(){
                this.selectedDoc = this.selectedData.file || [];
                // this.docInitList = this.selectedData.file || [];
                //this.queryDoc();
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
      docExamMultiple(res) {
        let obj = {
          procTypeName: res.dialogTitle,
          procTypeId: res.procTypeId, // 审批类型id
          finaTypeId: this.$store.state.projectMsg.projectMsg.financingId,  // 业务类型id financingId
          finaTypeName: this.$store.state.projectMsg.projectMsg.financingName, // 业务类型 financingName
          projectId: this.$store.state.projectMsg.pro_id, // 项目id
          progStageId: this.$store.state.projectMsg.projectMsg.currentStageId,// 项目阶段id currentImplementStageId
          progStageName: this.$store.state.projectMsg.projectMsg.currentImplementStageName// 项目阶段 currentImplementStageName

        }
        this.$Business.processStore(obj)
        this.$router.push("/sponsor");
      },
      fileApprove (procTypeId) {
          // 判断项目状态 已终止禁止操作
        if(this.$store.state.projectMsg.projectMsg.endFlag  && this.$store.state.projectMsg.projectMsg.endFlag === 1){
            this.$store.commit('projectStatusTips');
            return;
        }
        this.examType = procTypeId;
        this.$refs.docExam.activeComp()
    },
        isShowMoreSearchBtn(){
            let toolbarH = $('.pro-doc-operation').height();
            let toolbarAutoH = $('.newremind').height();
            this.moreHandleBtnVisible = toolbarH < toolbarAutoH;
        },
        //当前页面查询
        queryDoc() {
            let idSet = [];
            // this.cacheDocInitList = this.$select.getSelectedData(1,this.publicData.projectId).file;
            console.log('缓存中的数据',this.cacheDocInitList)
            this.cacheDocInitList.map(obj=>{
                idSet.push(obj.id)
            })
            let data = {
                token: this.token,
                userId: this.userId,
                pageNo: this.mySearch.pageNo,
                pageSize: this.mySearch.pageSize,
                sourceName:'项目文档',//页面位置，记录日志用
                projectName: this.publicData.projectName,//项目名称，记录日志用
                data: {
                    projectI:this.projectData.projectId,
                    docContent:'',
                    auditProjectIds: [], //项目阶段ID
                    //"parentId": this.publicData.docParentId,//所在目录ID
                    docName:'',//文件或者目录名称
                    beginTime: '',//文件创建开始时间
                    endTime: '',//文件创建结束时间
                    suffixList: [], //文件类型（后缀名）
                    fileStatus: [1],
                    dirStatus: [],
                    idSet: idSet,
                    orderFlag: '',
                    isSearch: true,
                    auditProjectNames: [],
                    //"docType": "0"文件类型（文件 0 /文件夹 1）不是只加载目录树就不用传
                }
            };
            let vm = this;
            this.$post('/doc/project/queryFileByCondition', data).then((response)=> {
                if(vm.success_code == response.code) {
                    let data =  response.data;
                    vm.docInitList = data.content;
                    vm.docTypeIcon(vm.docInitList);
                    vm.queryDocStatus();
                    vm.mySearch.dataCount = response.data.totalElements;
                    vm.mySearch.pageCount = response.data.totalPages;
                    this.$select.handleDisplaySelection(1,this.publicData.projectId,this.publicData.projectId,vm.docInitList).then(res=>{
                        console.log('handleDisplaySelection-doc', res)
                        if(!res || !res.length) return
                        res.forEach(v=>{
                            let idx =  vm.docInitList.findIndex(m=>m.id===v)
                                console.log(idx)
                                this.$nextTick(()=> {
                                vm.$refs.multipleTable.toggleRowSelection(vm.docInitList[idx],true);
                            })
                        })

                    })
                    console.log('查询后',vm.docInitList)
                    for (var i = 0; i < vm.docInitList.length; i++) {
                         vm.docInitList[i]["size"] = vm.handleFileSize(
                            vm.docInitList[i]["docSize"]
                        );
                        vm.docInitList[i]['myIndex'] = i;
                        vm.docInitList[i]["checked"] = false;
                        // vm.docInitList[i].highlightName = vm.docInitList[i].highlightName.replace(/<br\/>/g, "");
                    }
                    this.queryDocPath()
                } else if(response.code == -504){
                    vm.docInitList = [];
                    vm.mySearch.dataCount = 0;
                    vm.mySearch.pageCount = 0;
                }

            }).catch(function(error) {

            });
        },
        queryStage() {
            let that = this;
            let data = {
                "token": this.token,
                "userId": this.userId,
                "data": {
                    "projectId": this.projectData.projectId,
                }
            }
            this.$post('/info/project/getImplementStageList', data).then((response)=> {
                if(that.success_code == response.code) {
                    let data = response.data;
                    that.stageList = data;
                    for(let i = 0;i < data.length;i++) {
                        // that.mySearch.proStageList.push(data[i])
                        if (data[i].completeFlag === 1 || (data[i].startTime != null && data[i].endTime == null)) {
                            that.publicData.processId = data[i].id;
                            that.publicData.processName = data[i].name;
                            // that.publicData.proCurProcessName = data[i].name;//传给审批弹窗的当前阶段名称，切换阶段不更新
                            // data[i].sealFlag == 1 ? that.stageIsPlaceFile =  true : that.stageIsPlaceFile =  false;
                        }
                    }
                    if(data.length == 0){
                        this.stageIsAll = true;
                    }
                }
            }).catch(function(error) {
                console.log(error);
            });
        },
        //获取文件目录列表
        queryDocPath(){
            let idSet = [];
            this.docInitList.map(item=>{
                idSet.push(item.id);
            })
            let sendData = {
                token: this.token,
                userId: this.userId,
                projectId: this.publicData.projectId,
                data: {
                    idSet: idSet
                }
            }
            this.$post('/doc/project/link/docPath', sendData).then((response)=> {
                if(this.success_code == response.code){
                    let data = response.data.docProject;
                    this.docInitList.map((item, index)=>{
                        for(let key in data){
                            if(item.id == key){
                                let str = data[key].reverse().join('/');
                                this.$set(this.docInitList[index], 'path', str)
                            }
                        }
                    })
                }
            }).catch(function(error) {

            });
        },
        exportBtn(){
            if (this.manaullyFile.length != 0 || this.selectedDirIds.length != 0) {
                let docIds = [];
                this.selectedDoc.map(item=>{
                    docIds.push(item.id)
                })
                var params = {
                    userId: this.userId,
                    token: this.token,
                    "data": {
                        "fileName": this.publicData.projectName,
                        "files": docIds.join(','),
                        "dirs": this.selectedDirIds.join(','),
                        "projectId": this.publicData.projectId,
                        "source": 2//1底稿2项目文档
                    }
                };

                if (this.isPC) {
                    this.$store.commit('export', {
                        url: '/doc/paper/ViewExport',
                        data: params.data
                    });
                    return;
                }
                this.export('/doc/paper/ViewExport', params);
            } else {
                this.$message({
                    message: '请选中想要的文件再进行导出',
                    type: 'warning'
                });
            }
        },
        export(url, data) {
            //导出模拟form表单
            var allUrl = this.reqApi + url;
            var form = $('<form></form>');
            form.attr('method', 'post');
            form.attr('action', allUrl);
            form.attr('Content-Type', 'application/json;charset=UTF-8');
            form.attr('dataType', 'json');
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
            $('body').append(form);
            form.submit().remove();
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
            // this.queryDoc();
        },
        selectedDocList(){//已选文件列表

        },
        // 取消选择
        clearSelection(type) {
            console.log('走了取消状态')
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
        queryRemarkList(){//查询单个文件备注
            let data = {
                token: this.token,
                userId: this.userId,
                projectId:this.publicData.projectId,
                sourceName:'项目文档',//页面位置，记录日志用
                projectName: this.publicData.projectName,//项目名称，记录日志用
                data: {
                    docId: this.selectedDoc[0].docId
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
                    needFileList: fileList
                }
            }
            this.$post('/doc/project/addNotes', data).then((res)=> {
                if (this.success_code == res.code) {
                    this.$message.success('新增备注成功')
                    this.queryDocStatus();
                    // 保存成功之后需要取消选中
                    this.clearSelection()
                } else {
                    this.$message.warning(res.msg)
                }
            }).catch(function (error) {

            });
        },
        remarkClose(){
            this.remarkIsShow = false;
            this.remarkList = [];
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
                docPosition: 2
            }
            this.projectIndexData = obj
            this.projectIndexShow = true
        },
        // 索引返回
        sendProjectHandle (val) {
            var data = JSON.parse(val.data);
            console.log('索引返回', data, val)
            // this.positionDocId =  val.docId;//文件id
            // this.publicData.projectId =  data.projectId;//项目id
            // this.publicData.processName = data.stageName;
            // this.publicData.processId = data.auditProjectId;//项目阶段ID
            // this.uploadParamData.auditProjectId = data.auditProjectId;//上传时用到的项目阶段ID
            // this.publicData.docParentId = data.parentId;//所在目录ID 0 为顶级目录
            // this.copySourceData.parentId = data.parentId; //复制剪切目标父级ID
            // this.uploadParamData.parentId = data.parentId; //上传目标父级ID
            // this.bread_crumbs[0].parentId = data.parentId;
            // this.queryDocStatus()
        },
        getTableHeight () {
            window.setTimeout(() => {
                this.tableHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)
                - $('.pro-doc-operation li').innerHeight() - 10 - 38 - 68 - 80
            },300)
        },
        showAllBtn(){
            this.moreHandleAutoH = !this.moreHandleAutoH;
            this.packHandleVisible = true;
            window.setTimeout(() => {
                this.tableHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)
                - $('.newremind').innerHeight() - 38 - 68 - 80
            },500)
        },
        packUpBtn(){
            this.packHandleVisible = false;
            this.moreHandleAutoH = false;
            this.getTableHeight()
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
                        this.$select.handleFileSelect(1, this.publicData.projectId, this.publicData.projectId, this.selectedDoc);
                        // vm.$refs.versionUploadRef.uploadComplete();
                        // this.docInitList = this.$select.getSelectedData(1,this.publicData.projectId).file;
                        this.queryDoc();
                        this.handleUpdateList(uploadData)
                        this.clearSelection()
                    } else {
                        vm.$message.error(response.msg);
                    }
                    //vm.versionUploadAddDocClose();
                })
                .catch(function (error) {
                });
        },
        handleUpdateList(uploadData) {
            if(uploadData.fileData.data.parentId !== this.publicData.docParentId
                || uploadData.fileData.data.projId !== this.publicData.projectId
            || uploadData.fileData.data.auditProjectId !== this.publicData.processId){
                return
            }
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
        //返回按钮
        back() {
            // alert(this.$select.getSelectedData(1,this.publicData.projectId).file.length)
            if(this.fromItem == 0){
                this.$router.push("/projectDoc");
            } else if(this.fromItem == 1){
                this.$router.push("/projectDocSearch");
            }
        },
        //毫秒转为标准日期
        toDate(number) {
            var date = new Date(number);
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            return (Y + M + D );
        },
        rowClass ({row, rowIndex}) {
          if (!this.selectedDoc) return
          if (this.selectedDoc.includes(row)) {
            return {"background-color": "rgba(244,246,249,1)"}
          }
        },
        //双击
        getDblClickId(row, event, column){
            if(column.type==="selection") return
            //双击预览
            this.canOperating(
                { docId: row.id, view: true },
                "view"
            ).then(res => {
                if (res) {
                    // PC端预览格式限制
                    if(this.isPC && !this.$globalConfig.docTypeLimit.pcTypeCheck(row.type)) {
                        this.$message.warning('该文件类型暂不支持在线编辑，请下载查看！')
                        return
                    }
                    var proViewData = {
                        projectId: this.projectData.projectId,
                        rfsId : row.rfsId,
                        docId: row.docId,
                        photoType: row.type,
                        sourceType: 'projectDoc',
                        docName: row.docName
                    }
                    sessionStorage.setItem("proDocViewDownId", row.id);
                    row.source = '0';
                    if(this.isPC) {
                      row.sourceName = '项目文档'
                      row.projectName = this.publicData.projectName
                    }
                    this.isPC
                            ? window.ChromeMain.CS_Main_OpenFile(JSON.stringify(row)) // PC端双击在线编辑
                            : this.$store.commit('previewAllFn',proViewData)
                }
            });
        },
        //删除，重命名，上传新版本前文件状态判断

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
        toogleExpand(row) {
            let $table = this.$refs.multipleTable;
            this.docInitList.map((item) => {
                if (row.id != item.id) {
                    $table.toggleRowExpansion(item, false)
                }
            })
            $table.toggleRowExpansion(row)
        },
        //分页
        handleSizeChange(val) {
            this.mySearch.pageSize = val;
            this.currentQueryDoc = true;
            this.mySearch.pageNo = 0;
            this.currentPage = 1;
            this.queryDoc();
        },
        handleCurrentChange(val) {
            this.mySearch.pageNo = val -1;
            this.currentQueryDoc = true;
            this.queryDoc();
            // this.isSearch = '';
        },
        docLocationBtn(item){
            var that = this;
            // var id = item.docType == 0 ? item.docId : item.id;
            var data = {
                "token": that.token,
                "userId": that.userId,
                "data": {
                    "id": item.id,
                    "projectId": item.projectId,
                    "chatOrMsg": 0,
                    // "docName": item.docName // 文档或文件夹名字
                    "docType": item.docType
                }
            }
            console.log(item, 66666)
            that.$post("/doc/project/position", data)
                .then( (response)=> {
                    var data =  response.data;
                    if (that.success_code == response.code) {
                        that.$router.push({
                            path: "/projectDoc",
                            query:{
                                docId: item.id,
                                projectId: item.projectId,
                                isPosition: true,
                                data: JSON.stringify(response.data)
                            }
                        });
                    } else if(response.code == -1002){
                        that.$message.warning('文件已被删除')
                    } else {
                        that.$message.warning(response.msg)
                    }
                })
                .catch(function (error) {

                });
        },
        //中国标准时间转为毫秒
        dateToMs(date) {
            let result = new Date(date).getTime();
            return result;
        },
        getDiscuss () {
            if (this.selectedNum === 0) {
                this.$message({
                    message: "请选择一条数据",
                    type: "warning"
                });
                return
            }
            this.docDiscuss()
        },
        docDiscuss(){
            if(!this.$store.state.proChatIsShow) {
                this.$message.warning('当前无权限')
                return
            }
            // let docTotal = this.manaullyFile.length + this.selectedDir.length;
            if (this.selectedNum > 1) {
                this.$message.warning('多文件无法操作，请重新选择')
                return
            }
            // let obj = this.manaullyFile[0] || this.selectedDir[0]// 选择文件的内容
            let obj = this.selectedDoc[0]
            this.$router.push({
                path: '/projecchat',
                query: {
                    docData: JSON.stringify(obj),
                    sourceName: '项目文档'
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
        // 选中文件
        handleSelectionChange(val) {
            // this.getvalue = val;
            // this.selectedDoc = val;
            // this.docExamselectedDoc = val;
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
            if (this.selectedDoc.length == 0) {
                this.$message.warning("请选择至少一条数据")
                return;
            }
            var download_arr = [];
            var docId = [];
            for (var i = 0; i < this.selectedDoc.length; i++) {
                // if (this.selectedDoc[i]["docType"] != "0" && !this.isPC) {
                //     this.$message.warning("文件夹不支持下载，请选择下载文件");
                //     return;
                // }
                // pc端下载
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
                    this.canOperating({
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
                }else { // web端下载
                    if(this.selectedDoc.length == 1){//单文件下载
                        download_arr.push({
                            name: this.selectedDoc[i].docName,
                            id: this.selectedDoc[i].docId
                        });
                        // pc不需要记录
                        this.downloadNotes(this.selectedDoc[i].docName,this.selectedDoc[i].id);
                    }
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
                    // if(this.selectedDoc.length != 1){
                    //     this.downloadFileLot();//批量下载
                    //     return;
                    // }
                    this.$store.commit("download", download_arr);
                    this.clearSelection()
                }
            });
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
        //删除
        deletetDoc() {
            console.log('1111',this.selectedDoc)
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
            console.log('123',allDeleteDoc)
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

            //arr = arr.concat(folderIds);
            this.deleteDocList = this.deleteDocList.concat(folderIds);
            let delAllowArr = []
            allDeleteDoc.forEach(v => {
            if (v.docSource == 15) {
                delAllowArr.push(v)
            }
            })
            console.log(delAllowArr, this.selectedDoc)
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
                            arr = [...new Set(arr)]
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
                // else{
                //     this.$message({
                //         message: "您没有该操作权限，请联系项目管理人员配置权限",
                //         type: "error"
                //     });
                // }
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
                        this.draftDetailBtn = false;
                        this.$select.handleCancel(1,this.publicData.projectId, this.publicData.projectId, seleDirAndFile);
                        // this.docInitList = this.$select.getSelectedData(1,this.publicData.projectId).file;
                        this.queryDoc();
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
        //删除，重命名，上传新版本前文件状态判断
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
        //版本
        visionBtn(){
            console.log('66666666666',this.selectedDoc)
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
                        .catch(function (error) {

                        });
                }
            }
        },
        uploadVsion(docList) {
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

            console.log('hasPower', hasPower)

            if(!hasPower.data) {
                this.$message.error(hasPower.msg)
                return
            }

            let arr = [];
            arr.push(curData.id);

            let stateCheckResult = this.checkDocStatusAjax(arr, 2)

            console.log('stateCheckResult', stateCheckResult)

            if(!stateCheckResult.data){
                this.$message.error(stateCheckResult.msg)
                return;
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
        //关闭版本弹窗
        versionClose() {
            this.versionIsShow = false;
            this.clearSelection()
        },
        versionUpdate(){
            this.queryDoc();
            this.$select.handleFileSelect(1, this.publicData.projectId, this.publicData.projectId, this.selectedDoc)
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
                        console.log('存在多个要去发起审批页')
                        vm.$message({
                            type: "warning",
                            message: response.msg
                        });
                        let obj = {
                            procTypeName: procTypeId == 2 ? '文件审批' : '文件修订审批',
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
            console.log('123',this.selectedDoc.auditStatus)
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
                        this.queryDocStatus();
                        this.$select.updateStatus(1, this.publicData.projectId, this.publicData.projectId)
                        this.clearSelection()
                    }else {
                        this.$message.warning(response.msg);
                    }
                })
                .catch(function (error) {
                });
        },
        // 关闭文件审核弹窗
        docExamClose() {
            // this.$refs.multipleTable.clearSelection();
            // this.selectedDoc = [];
            // this.docExamselectedDoc = [];
            this.docExamIsShow = false;
        },
        docExamSuccess() {
            this.queryDocStatus();
            this.clearSelection()
        },
        //根据项目id查询目录流程图信息
        getCatalogFlowChart(){
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
                        vm.$refs.catalogExam.initData();
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
                    "parentId": 0
                }
            }
            this.$post('/doc/paper/query', data).then((response)=> {
                if (vm.success_code == response.code) {
                    vm.paperTreeData = response.data.content;
                }
            }).catch(function (error) {

            });
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
            for (var i = 0; i < this.selectedDoc.length; i++) {
                if (this.selectedDoc[i].docType == 1 ) {
                    this.$message.error('文件夹不可选')
                    return
                }
                this.choseDoclist.push({docName:this.selectedDoc[i].docName,id:this.selectedDoc[i].id,opersmall:this.selectedDoc[i].opersmall});
                let obj = {};
                obj.id = this.selectedDoc[i].id;
                obj.docId = this.selectedDoc[i].docId;
                this.chosefileIds.push(obj)
            }
            this.remindbox = true;
        },
        // 删除提醒弹框中的文件
        deletefile(index){
            this.choseDoclist.splice(index,1);
            this.chosefileIds.splice(index,1)
        },
        //点x关闭提醒
        closediloages(){
            this.chosefileIds.length = 0; // 文件列表id
            this.choseDoclist = []; //文件列表
            this.deployObj = [] //选择人员id
            this.strs = [] //选择角色id
            this.remindbox = false;  //提醒弹框
            this.chosepersonIds = [];  //选择人员id数组
        },
        //关闭提醒
        closeremind(){
            if (this.chosefileIds == "") {
                this.$message.error("未选中要关闭的文件");
                return;
            }
            var data={
                token:this.token,
                userId:this.userId,
                data:{
                    fileIds:this.chosefileIds,
                    docSource: 0//项目文档0，底稿1
                }
            }
            var _this=this
            this.$post('/doc/project/closeReminder', data).then((response)=> {
                if(response.code == _this.success_code){
                    _this.remindbox = false;
                    _this.choseDoclist = [];
                    // this.selectedDoc.length = 0;
                    this.chosefileIds.length = 0;
                    this.deployObj.length = 0;
                    _this.$message.warning({
                        message:"您已成功关闭本人设置的文件提醒"
                    });
                    this.queryDocStatus();
                    this.$select.updateStatus(1, this.publicData.projectId, this.publicData.projectId)
                }else{
                    _this.$message.error(response.msg);
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
            if (this.chosefileIds.length == 0) {
                this.$message.error("请重新选择要提醒的文件");
                return;
            }
            var datas = {
                sourceName:'项目文档',//页面位置，记录日志用
                projectName: this.publicData.projectName,//项目名称，记录日志用
                data:{
                    acceptIds:this.chosepersonIds,  //人员id
                    acceptMemberIds:this.roleIds, //角色id
                    fileIds: this.chosefileIds, //文件id
                    projectId:this.publicData.projectId,  //项目id
                    docSource: 0//项目文档0，底稿1
                },
                token:this.token,
                userId:this.userId
            }
            var _this = this;
            this.$post('/doc/project/reminder',datas).then((response)=> {
                console.log(response.data)
                if(response.code == _this.success_code){
                    _this.remindbox = false;
                    _this.$message.success({
                        message:"文件设置提醒成功"
                    });
                    console.log(this.isSearch)
                    this.queryDocStatus();
                    this.chosefileIds=[]
                    _this.choseDoclist = []; //文件列表
                    _this.deployObj = [] //选择人员id
                    _this.strs = [] //选择角色id
                    _this.roleIds = []
                    _this.remindbox = false;  //提醒弹框
                    _this.chosepersonIds = [];  //选择人员id数组
                    _this.$select.updateStatus(1, _this.publicData.projectId, _this.publicData.projectId)
                    // 设置提醒成功之后取消选中状态
                    _this.clearSelection()
                }else{
                    __this.$message.error(response.msg);
                }

            }).catch(function(error) {
                console.log(error);
            });

        },
        //设置提醒的添加人员
        optPrinFn(num) {
            this.findFlag = true;
            this.user_num = num;
            console.log(this.user_num, this.deployObj, 66)
            if (num == 1) {
                this.findState = {state: 0};
                this.checkState = {state: 2};
              this.findUserObj = this.$utils.cloneDeepArray(this.deployObj)
            } else {
                this.findState = {state: 0};
                this.checkState = {state: 2}
              this.findUserObjM = this.$utils.cloneDeepArray(this.ccObj)
            }
        },
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
        //设置文件提醒时删除选择角色
        handle_Closerole(num) {
            this.strs.splice(num, 1);
            this.roleIds.splice(num,1)
        },
        //设置文件提醒时选择人员
        findAllUser(data) {
          console.log(data, 22)
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
              this.findUserObj = this.deployObj
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
                    this.ccObj = chgArr
                }
              this.findUserObjM = this.ccObj
            }
        },
        //设置文件提醒时删除选择人员
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
                            console.log('提交成功',this.$store.state.projectDocCopy.hasCutOrCopy)
                            this.$message({
                                type: "success",
                                message: "复制成功!"
                            });
                        }
                    });
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
                        console.log('88888')
                        for(let key in data){
                            if(item.id == key){
                                for(let type in data[key]){
                                        this.$set(this.docInitList[index], type, data[key][type])
                                }
                            }
                        }
                    })
                    // this.clearSelection()
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
    }
}
</script>
<style scoped lang="scss" type="text/css">
.el-table::before{
    height: 0;
}
.project-doc-selected {
    .title {
        text-align: left;
        padding-left: 10px;
    }
    .el-breadcrumb{
        line-height: 46px;
        padding-left: 10px;
    }
    .project-doc-top {
        position:relative;
        padding-bottom: 20px;
        background: #fff;
        .project-doc-rec {
            position:absolute;
            right:20px;
            top:50px;
            .el-button{
                padding: 8px 10px
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
           background: rgba(26,95,164,1);
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
           background:#ccc;
        }
        i {
            float: left;
            width: 33px;
            height: 8px;
            margin-top: 8px;
            margin-right:6px;
            background: url('../../../../assets/project_doc/docArrow.png') no-repeat 0 0;
        }
        i.active {
            background: url('../../../../assets/project_doc/docArrowActive.png') no-repeat 0 0;
        }
    }
    .stage-list-box{
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
        top: 28px;
        right:14px;
        padding: 6px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 12px;
        // background: rgba(240,241,243,1);
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
        // margin-right: 4px;
        // margin-left: 2px;
        font-size: 8px;
    }
    .project-doc-con {
        margin-top: 14px;
        padding-bottom:10px;
        background: #fff
    }
    .search-item-box{
        // position:relative;
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
    .search-box{
        position: relative;
        .more-stage{
            right: 24px;
            top: 26px;
        }
    }
    .search-btn-box{
        margin-top: 18px;
        margin-right: 118px;

    }
    .search-item-box.search-item-box-min{
        max-width: calc(100% - 360px);
    }
    .form_box{
        background:#fff;
        margin-right: 78px;
        padding-top: 20px;
        padding-left:10px;
        .el-form-item {
            float:left;
            margin-right:20px;
            margin-bottom: 0;
            padding-bottom: 15px;
            height:40px;
        .el-input{
            width:308px;
        }
        // .inline-input{
        //     width:217px;
        // }
        // .el-select{
        //     width:217px;
        // }
        }
        .el-button{
            float:left;
            margin-left:20px;
            // margin-top:2px;
        }
    }
    //
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
    .el-form-item .el-form-item__content .el-input input{
        width:308px;
        // height:32px;
        // line-height: 32px;
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
    .table-doc-name.noIcon {
        margin-top:6px;
    }
    .project-doc-top{
        .head{
            height:38px;
            line-height: 38px;
            padding-left:10px;
            text-align: left;
            font-size: 20px;
            color:#333333;
            font-size: 20px;
            font-weight: 500;
        }
    }
    .table-doc-name{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    // 以下为分页
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
    .el-pagination{
        // margin-top:20px;
        // margin-right:16px;
        padding: 0;
        margin: 0;
        padding-top: 10px;
        margin-right: 21px;
        text-align: right;
    }
    .back_btn{
        margin-left: 10px;
        border: none;
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
}
.pro-doc-operation2{
    height: 44px;
    overflow: hidden;
}
.pro-doc-operation.pro-doc-operation-max{
    height: auto;
}
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
.el-breadcrumb-ul{
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
    white-space: nowrap;
}
.rightMenu {
    position: fixed;
    z-index: 12;
}
//权限设置弹窗
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
.project-doc-list {
    .el-col-15{
        width:95%;
    }
    .el-table__header{
        background: #f9f9f9;
    }
}
.overflow-hidden{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
<style lang="scss" type="text/css">
 .project-doc-selected{
    .project-doc-list{
        td{
            border:none;
        }
        thead th{
            background: #f9f9f9;
        }
    }
    .name_col_name{
        float:left;
        width: 80%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow:ellipsis;
    }
    .name_col_name div{
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow:ellipsis;
    }
    .el-form-item__label {
        // line-height: 32px;
        // margin-top:4px;
    }

    // 文件属性
    .nature_box .el-dialog__header {
        background-color: #5ca8fc;
        .el-dialog__title,
        .el-icon-close {
            color: #fff;
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
    //删除时含有设为底稿的文件提示
    .delete_has_draft_tips{
        .el-dialog__header{
            text-align: left;
        }
        .el-dialog__body{
            padding-top: 0;
        }
        .dialog-footer{
            text-align: right;
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
