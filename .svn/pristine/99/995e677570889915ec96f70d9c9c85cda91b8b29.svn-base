<template>
    <div class="project-doc-temp">
         <el-tabs v-model="activeName" id="elTabs" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="工作底稿模版" name="first" class="first_tab">
                 <div class="manu_temp" @click="leftKey">
                    <div class="manu-temp-name-list clearfix">
                        <el-button icon="el-icon-back" circle @click="back" class="back_btn"></el-button>
                        <div class="total-temp">
                            <p>底稿模板</p>
                            <span>（共{{workManuTempTotal}}个文件）</span>
                        </div>
                        <el-input v-model="workManuSearch_input" placeholder="请输入关键词" class="input-with-select t-input-with-select" clearable>
                            <el-button slot="append" icon="el-icon-search" @click="workManuSearchFn"></el-button>
                        </el-input>
                    </div>
                    <div class="manu_temp_name_list" v-if="workManuTempChunk">
                        <div class="manu_temp_name" :style="{height: workManuTempNameHeight}">
                            <p class="manu_temp_name_tit">底稿模板名称:</p>
                            <div class="manu_temp_name_cou">
                                <div class="manu_temp_name_cou_list">
                                    <span v-for="(item, idx) in workManuTempCataListData" :key="idx" @click="workTempNameItemFn(item,idx)" :class="{active:workManuTempShow == idx}">
                                        {{item.docName}}
                                    </span>
                                </div>
                                <div class="manu_temp_name_cou_btn" @click="workMoreBtnFn">
                                    <a href="javascript:void(0);" class="clearfix">
                                        <em class="fl">更多</em>
                                        <span class="arrow fl" id="cusmore"></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="manu_child_cata">
                            <p class="manu_child_cata_tit">底稿子目录:</p>
                            <div class="manu_child_cata_cou">
                                <div class="manu_child_cata_cou_list">
                                    <span class="manu_child_cata_cou_list_all" @click="workCouListAll">全部</span>
                                    <span class="manu_child_cata_cou_list_item" :title="workCouListName">{{workCouListName}}</span>
                                </div>
                                <el-button type="primary" class="manu_child_cata_cou_btn" @click.stop="workManuChildCataFn">选择子目录</el-button>

                            </div>
                        </div>
                    </div>
                    <div class="project-temp-current-path clearfix">
                        <p class="current-path">当前引用路径:</p>
                        <div class="temp-path-list fl" :title="workCatalogueName">
                            {{workCatalogueName}}
                        </div>
                    </div>

                    <div class="project-temp-con-list">
                        <el-table ref="multipleTable" :data="workManuTempList" tooltip-effect="dark" style="width: 100%; height:100%" @selection-change="workManuSelectionChange" @select= "workManuSelecChange">
                            <el-table-column type="selection" width="55">
                            </el-table-column>
                            <el-table-column label="模板名称" width="430">
                                <template slot-scope="scope">
                                    <div class="work_table_tem_name">
                                        <div class="work_table_tem_name_icon">
                                            <img :src="scope.row.fileIcon"></img>
                                        </div>
                                        <span class="work_table_tem_name_title" :title="scope.row.fileName">{{scope.row.fileName}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="docSize" label="模板大小" width="140">
                                <template slot-scope="scope">
                                    {{ renderSize(scope.row.docSize)}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="refCount" align="center"  label="引用次数" width="200">
                            </el-table-column>
                            <el-table-column prop="updateTime" label="更新时间" width="200">
                            </el-table-column>
                            <el-table-column label="操作" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <div class="work_operation">
                                        <div class="work_operation_refe" @click="workCiteFn(scope)" title="引用"></div>
                                        <div class="work_operation_warning" v-if="scope.row.attention != ''" @click="workWarningFn(scope)" title="注意事项"></div>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="project-temp-opera clearfix">
                        <div class="quote-temp">
                            <el-button v-if="$utils.checkSystemPermission('paper_template_u')" class="paper_template_u" type="primary" @click="workAllCitesFn()" style="background: #F7F9FB;color:#fff;">批量引用</el-button>
                        </div>
                        <div class="pages">
                            <el-pagination
                            @size-change="workHandleSizeChange"
                            @current-change="workHandleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[10, 20, 50, 100]"
                            :page-size="pagesize"
                             background
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="workTotalNum">
                            </el-pagination>
                        </div>
                    </div>
                     <el-dialog title="注意事项" :close-on-click-modal="false" :visible.sync="warningIsShow" width="30%" class="warning_dialog">
                        <div class="create_content clearfix">
                            <div>{{attention}}</div>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="warningIsShow = false">关闭</el-button>
                        </span>
                    </el-dialog>
                </div>
            </el-tab-pane>
            <el-tab-pane label="项目模版" name="second" class="second_tab">
                <div class="manu_temp" id="manu_temp_second">
                    <div class="manu-temp-name-list clearfix">
                        <el-button icon="el-icon-back" circle @click="back" class="back_btn"></el-button>
                        <div class="total-temp">
                            <p>项目模板</p>
                            <span>（共{{proManuTempTotal}}个文件）</span>
                        </div>
                        <el-input v-model="proManuSearch_input" placeholder="请输入关键词" class="input-with-select t-input-with-select" clearable>
                            <el-button slot="append" icon="el-icon-search" @click="proManuSearchFn"></el-button>
                        </el-input>
                        <el-button type="primary" class="upload-btn" id="paper_template_upload" @click="upload" v-if="proManuTempChunk">我要上传</el-button>
                        <el-input type="file" id="fileBtn" style="display:none;"></el-input>
                    </div>
                    <div class="manu_temp_name_list" v-if="proManuTempChunk">
                        <div class="manu_temp_name" :style="{height: proManuTempNameHeight}">
                            <p class="manu_temp_name_tit">项目模板:</p>
                            <div class="manu_temp_name_cou">
                                <div class="add-project-temp fl">
                                    <i id="paper_template_create" @click="addTemp"></i>
                                </div>
                                <div class="manu_temp_name_cou_list">
                                    <div v-for="(item, idx) in proManuTempCataListData" :key="idx" :class="{active:proManuTempShow == idx}" class="paper_template_del manu_temp_name_cou_list_chunk" @click="proTempNameItemFn(item,idx)">
                                        <p class="manu_temp_name_cou_list_chunk_title" :title="item.docName">{{item.docName}}</p>
                                        <i class="el-icon-close" @click="proConfirmDeleteCatalog(item,1)"></i>
                                    </div>
                                </div>
                                <div class="manu_temp_name_cou_btn" @click="proMoreBtnFn">
                                    <a href="javascript:void(0);" class="clearfix">
                                        <em class="fl">更多</em>
                                        <span class="arrow fl" id="cusmore"></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="project-temp-current-path clearfix">
                        <p class="current-path">当前引用路径:</p>
                        <div class="temp-path-list fl" :title="workCatalogueName">
                            {{workCatalogueName}}
                        </div>
                    </div>

                    <div class="project-temp-con-list">
                        <el-table ref="multipleTable" :data="proManuTempList" tooltip-effect="dark" style="width: 100%; height: 100%;" @selection-change="proManuSelectionChange" @select= "proManuSelecChange">
                            <el-table-column type="selection" width="55">
                            </el-table-column>
                            <el-table-column label="模板名称" width="400">
                                <template slot-scope="scope">
                                    <div class="pro_table_tem_name">
                                        <div class="pro_table_tem_name_icon">
                                            <img :src="scope.row.fileIcon"></img>
                                        </div>
                                        <div class="pro_table_tem_name_title" :title="scope.row.fileName">{{ scope.row.fileName}}</div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="docSize" label="模板大小" width="140">
                                <template slot-scope="scope">
                                    {{ renderSize(scope.row.docSize)}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="refCount" align="center" label="引用次数" width="200">
                            </el-table-column>
                            <el-table-column prop="updateTime" label="更新时间" width="200">
                            </el-table-column>
                            <el-table-column label="操作"  show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <div class="work_operation">
                                        <div class="work_operation_refe" @click="proCiteFn(scope)" title="引用"></div>
                                        <div class="work_operation_preview" @click="proTempView(scope)" title="预览"></div>
                                        <div class="work_operation_del" @click="proConfirmDeleteCatalog(scope.row,2)" title="删除"></div>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="project-temp-opera clearfix">
                        <div class="quote-temp">
                            <el-button v-if="$utils.checkSystemPermission('paper_template_u')" class="paper_template_u" type="primary" @click="proAllCitesFn()" style="background: #F7F9FB;color:#fff;">批量引用</el-button>
                        </div>
                        <div class="pages">
                            <el-pagination
                            @size-change="proHandleSizeChange"
                            @current-change="proHandleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[10, 20, 50, 100]"
                            background
                            :page-size="pagesize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="proTotalNum">
                            </el-pagination>
                        </div>
                    </div>

                </div>

                <el-dialog title="创建模板分类" :close-on-click-modal="false" :visible.sync="creatTempClassIsShow" width="30%" class="create_dialog">
                    <div class="create_content clearfix">
                        <div class="create_content_left">创建模板分类：</div>
                        <div class="create_content_right">
                            <el-input v-model="newTempName" placeholder="请输入内容" style=""></el-input>
                        </div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="creatTempClassIsShow = false">取 消</el-button>
                        <el-button type="primary" @click="creatTempCatalog">创 建</el-button>
                    </span>
                </el-dialog>
                <el-dialog
                    title="上传到模板提示"
                    :close-on-click-modal="false"
                    :visible.sync="seleCatalogIsShow"
                    width="30%" class="create_dialog">
                    <div class="create_content clearfix">
                        <div class="create_content_left">选择模版：</div>
                        <div class="create_content_right">
                            <el-select v-model="seleCatalog.catalog" placeholder="请选择模版" class="create_content_right_select" popper-class="create_content_right_select_dropdown">
                                <el-option v-for="(item, idx) in proManuTempCataListData" :title="item.docName" :label="item.docName" :value="item.id" :key="idx"></el-option>
                            </el-select>
                        </div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button  @click="seleCatalogIsShow = false">取 消</el-button>
                        <el-button type="primary" @click="selectedCatalog">确 定</el-button>
                    </span>
                </el-dialog>
                <upload-add-doc v-if="addDoc"
                                :uploadDocAddIsShow="uploadDocAddIsShow"
                                :uploadParamData="uploadParamData"
                                ref="uploadComplete"
                                @sendValueToParent="uploadAddDocClose"
                                @docUpload="docUpload"
                                @docUploadAllsucess="docUploadAllsucess">
                </upload-add-doc>
            </el-tab-pane>
        </el-tabs>
        <div class="manu_temp_child" v-if="workManuChild">
            <div class="manu_temp_child_list_title">
                <el-input v-model="workManuCataSearch_input" placeholder="请输入关键词" class="input-with-select t-input-with-select" clearable>
                    <el-button slot="append" icon="el-icon-search" @click="workManuCataSearchFn"></el-button>
                </el-input>
            </div>
            <div class="manu_temp_child_list" v-show="listShow">
                <el-scrollbar style="height:100%">
                    <ul id="rightZtree" class="ztree dirZtree"></ul>
                </el-scrollbar>
            </div>
            <div class="manu_temp_child_list_one" v-show="listShow == false">
                <div class="manu_temp_child_list_one_item" v-for="item in listOneData" @click="directoryOnClick(item)">
                    <span class="manu_temp_child_list_one_item_icon"></span>
                    <span class="manu_temp_child_list_one_item_title"> {{item.docName}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import uploadAddDoc from '@/components/file/uploadAddDoc';
export default {
    components: {
        uploadAddDoc
    },
    name: "projectDocTemp",
    props:[

    ],
    data() {
        return {
            activeName: "first",
            workCatalogueName: '',
            workCatalogueParentId: '',
            parentId: '',
            token: '', //请求接口默认必传数据
            userId: '', //请求接口默认必传数据
            proId: '', //请求接口默认必传数据
            sourceType: '', //请求接口默认必传数据
            requestCode: {}, //所有请求的状态码
            workManuTempList: [], //底稿模版数据
            workManuTempTotal: 0, //底稿显示文件
            workManuSearch_input: '', //底稿搜素框
            workManuCataSearch_input: '', //底稿跟目录搜索框
            workManuTempChunk: true, //中间底稿块的是否显示
            workManuTempCataListData: [], //底稿模版目录数据
            workManuTempNameHeight: '64px', //底稿模版目录的高
            workManuTempShow: 0, //每一个模版数据
            workManuChild: false, //底稿子目录是否显示
            workTempNameItemData: '', //底稿模版名称每一条数据
            wrokManuSelectionChangeIds: [], //底稿模版全选数据
            setting:{  //zTree默认配置
                data:{
                    simpleData:{
                        enable: true,
                        pIdKey: 'parentId',
                        idKey: 'id',
                        rootPId: 0
                    },

                    key:{
                        name: 'docName'
                    },

                },
                view:{
                    selectedMulti: false,
                    showLine: false
                },
                edit: {
                    enable: true,
                    editNameSelectAll: true,
                    showRemoveBtn: false,
                    showRenameBtn: false
                },
                callback:{
                    onClick: this.zTreeOnClick
                }

            },
            zNode: [],
            listOneData: [],
            listShow: true,
            workCouListName: '', //每一条树的数据名字
            workCouListData: '', //每一条树的数据
            workFenType: '',
            workTotalNum: 0,
            proTotalNum: 0,
            currentPage: 1,
            pagesize: 10,


            proManuTempTotal: 0, //项目显示文件
            proManuSearch_input: '', //项目搜素框
            proManuTempChunk: true, //中间底稿块的是否显示
            proManuTempCataListData: [], //项目模版目录数据
            proManuTempNameHeight: '64px', //项目模版目录的高
            proManuTempShow: 0, //项目模版显示文件
            proManuTempList: [], //底稿模版数据
            proManuSelectionChangeIds: [], //项目模版全选数据
            proTempNameItemData: '', //项目模版名称每一条数据
            creatTempClassIsShow: false,
            warningIsShow: false,
            attention: '',
            newTempName: '',
            seleCatalogIsShow: false,
            allChecked: true,   //全选
            addDoc: false,//上传弹层
            uploadDocAddIsShow:false,
            uploadParamData: {
                docSource: 0,
                projId: '',
                parentId: 56,
                auditProjectId: null
            },
            seleCatalog: {
                catalog: ''
            },
            proFenType: ''

        }
    },
    created() {
        this.token = this.$store.state.loginObject.userToken;
        this.userId = this.$store.state.loginObject.userId;
        this.proId = this.$store.state.projectMsg.pro_id;
        this.requestCode = this.code.codeNum;
        this.sourceType = 1;
        this.activeName = this.$route.query.activeName;
        this.workCatalogueName = this.$route.query.workCatalogueName;
        this.workCatalogueParentId = this.$route.query.workCatalogueParentId;
        this.parentId = this.$route.query.parentId;
        if(this.activeName == "first") {
            this.workGetManTempListFn()
        }
    },
    mounted() {
        document.getElementById("main_view").style.height = (this.getViewPortHeight() - 70) + "px";
    },
    beforeRouteLeave(to, from, next) {
        to.meta.keepAlive = false;
        next();
    },
    methods: {
        getViewPortHeight() {
            return document.documentElement.clientHeight || document.body.clientHeight;
        },
        back() {
            this.$router.push('/manuscriptmanage')
        },
        //工作底稿模版
        handleClick(tab, event) {
            if(tab.name == "first") {
                this.proManuTempChunk = true;
                this.workTempNameItemData = ''
                this.workManuTempShow = 0
                this.workGetManTempListFn()
            } else if(tab.name == 'second') {
                this.workManuChild = false;
                this.listShow = true;
                this.workManuTempChunk = true;
                this.proTempNameItemData = ''
                this.proManuTempShow = 0
                this.proGetManTempListFn()
            }
        },
        leftKey(e) {
            if(e.button == 0) {
                this.workManuChild = false;
                this.listShow = true;
                this.workManuCataSearch_input = ''
            }
        },
        workHandleSizeChange(val) {
            this.pagesize = val;
            if(this.workFenType == 1 && this.currentPage == 1) {
                this.workGetDocSysTemplateByCatalogIdPage(this.workTempNameItemData.id)
            } else if(this.workFenType == 2 && this.currentPage == 1) {
                this.workManuSearchFn()
            }
        },
        workHandleCurrentChange(val) {
            this.currentPage = val;
            if(this.workFenType == 1) {
                this.workGetDocSysTemplateByCatalogIdPage(this.workTempNameItemData.id)
            } else if(this.workFenType == 2) {
                this.workManuSearchFn()
            }
        },
        workGetManTempListFn() { //获取工作底稿目录列表

            var data = {
                token: this.token,
                userId: this.userId,
                data: {
                }
            }
            this.$post('/doc/paper/getRootSysCatalogs', data)
            .then((res) => {
                if(this.requestCode.SUCCESS == res.code) {
                    this.workManuTempCataListData = res.data
                    this.workTempNameItemData = res.data[0]
                    this.workGetDocSysTemplateByCatalogIdPage(this.workTempNameItemData.id)
                } else {
                    this.$message({
                        message: res.msg,
                        type: "error"
                    });
                }
            }).catch(function(error) {
                console.log(error);
            });
        },
        workGetDocSysTemplateByCatalogIdPage(parentId) { //获取工作底稿目录列表请求方式.根
            this.workFenType = 1
            var data = {
                token: this.token,
                userId: this.userId,
                pageNo: this.currentPage,
                pageSize: this.pagesize,
                data: {
                    catalogId: parentId
                }
            }
            this.$post('/doc/paper/getDocSysTemplateByCatalogIdPage', data)
            .then((res) => {
                if(this.requestCode.SUCCESS == res.code) {
                    this.workManuTempList = res.data.list;
                    this.workManuTempList.map(item => {
                        console.log(item)
                        this.iconFilter(item)
                    })
                    this.workManuTempTotal = res.data.total;
                    this.workTotalNum = res.data.total
                } else {
                    this.$message({
                        message: res.msg,
                        type: "error"
                    });
                }
            }).catch(function(error) {
                console.log(error);
            });
        },
        workGetDocSysTemplateByCatalogIdPageParent(parentId, id) { //获取工作底稿目录列表请求方式
            var data = {
                token: this.token,
                userId: this.userId,
                pageNo: this.currentPage,
                pageSize: this.pagesize,
                data: {
                    catalogId: parentId,
                    parentId: id
                }
            }
            this.$post('/doc/paper/getDocSysTemplateByCatalogIdPage', data)
            .then((res) => {
                if(this.requestCode.SUCCESS == res.code) {
                    this.workManuTempList = res.data.list;

                    this.workManuTempList.map(item => {
                        this.iconFilter(item)
                        console.log(item)
                    })
                    this.workManuTempTotal = res.data.list.length;
                    this.workTotalNum = res.data.total
                } else {
                    this.$message({
                        message: res.msg,
                        type: "error"
                    });
                }
            }).catch(function(error) {
                console.log(error);
            });
        },
        workManuSearchFn() { //底稿模糊搜索
            this.workFenType = 2
            if(this.workManuSearch_input != '' && this.currentPage != 1) {
                this.currentPage =  1
                this.pagesize =  10
            }
            var data = {
                token: this.token,
                userId: this.userId,
                pageNo: this.currentPage,
                pageSize: this.pagesize,
                data: {
                    fileName: this.workManuSearch_input,
                }
            }
            this.$post('/doc/paper/getDocSysTemplateByDocName', data)
            .then((res) => {
                if(this.requestCode.SUCCESS == res.code) {
                    this.workManuTempList = res.data.list;
                    this.workManuTempList.map(item => {
                        this.iconFilter(item)
                    })
                    this.workManuTempTotal = res.data.list.length;
                    this.workManuTempChunk = false;
                    this.workTotalNum = res.data.total
                } else {
                    this.$message({
                        message: res.data,
                        type: "error"
                    });
                }
            }).catch(function(error) {
                console.log(error);
            });
        },
        workTempNameItemFn(item,idx) { //点击每个目录模版
            console.log(item,'+++')
            this.workTempNameItemData = item
            this.workManuTempShow = idx
            this.workCouListName = ''
            this.workGetDocSysTemplateByCatalogIdPage(item.id)
        },
        workMoreBtnFn() { //更多
            this.workManuTempNameHeight = this.workManuTempNameHeight === '64px' ? '' : '64px';
        },
        workManuChildCataFn() { //底稿选择子目录
            this.workManuChild = true;
            this.listShow = true;
            this.workManuCataSearch_input = ''
            if(this.workTempNameItemData != '') {
                var data = {
                    token: this.token,
                    userId: this.userId,
                    pageNo: 0,
                    pageSize: 10,
                    data: {
                        catalogId: this.workTempNameItemData.id
                    }
                }
            }
            this.$post('/doc/paper/getAllSysCatalogsByRootCatalog', data)
            .then((res) => {
                if(this.requestCode.SUCCESS == res.code) {
                    this.zNode = res.data
                    this.zNode.forEach((item) => {
                        item.isParent = true;
                        item.iconSkin = "diy01"
                    });
                    $.fn.zTree.init($("#rightZtree"), this.setting, this.zNode);

                } else {
                    this.$message({
                        message: res.msg,
                        type: "error"
                    });
                }
            }).catch(function(error) {
                console.log(error);
            });
        },
        workCouListAll() { //点击全部
            this.listShow = true
            this.workManuCataSearch_input = ''
            if(this.workCouListData) {
                var treeObj = $.fn.zTree.getZTreeObj("rightZtree");
                this.workCouListName = ''
                this.workGetDocSysTemplateByCatalogIdPage(this.workTempNameItemData.id)
            }
        },
        zTreeOnClick(event, treeId, treeNode) { //点击树每个目录
            var zTree = $.fn.zTree.getZTreeObj("rightZtree");
            zTree.expandNode(treeNode);
            this.workManuChild = true;
            this.workCouListName = treeNode.docName
            this.workCouListData = treeNode
            this.workGetDocSysTemplateByCatalogIdPageParent(this.workTempNameItemData.id, treeNode.id)
        },
        directoryOnClick(itemValue) {
            this.workCouListName = itemValue.docName
            this.workCouListData = itemValue
            this.workGetDocSysTemplateByCatalogIdPageParent(this.workTempNameItemData.id, itemValue.id)
        },
        workManuCataSearchFn() { //树的模糊搜索
            if(this.workTempNameItemData != '') {
                var data = {
                    token: this.token,
                    userId: this.userId,
                    data: {
                        catalogId: this.workTempNameItemData.id,
                        docName: this.workManuCataSearch_input
                    }
                }
            } else {
                var data = {
                    token: this.token,
                    userId: this.userId,
                    data: {
                        catalogId: this.workManuTempCataListData[0].id,
                        docName: this.workManuCataSearch_input
                    }
                }
            }
            this.$post('/doc/paper/getSysCatalogsByDocName', data)
            .then((res) => {
                if(this.requestCode.SUCCESS == res.code) {

                    if(this.workManuCataSearch_input == '') {
                        this.zNode = res.data
                        this.zNode.forEach((item) => {
                            item.isParent = true;
                            item.iconSkin = "diy01"
                        });
                        $.fn.zTree.init($("#rightZtree"), this.setting, this.zNode);
                        this.listShow = true
                    } else {
                        this.listOneData = res.data;
                        this.listShow = false;
                    }
                } else {
                    this.$message({
                        message: res.msg,
                        type: "error"
                    });
                }
            }).catch(function(error) {
                console.log(error);
            });
        },
        workCiteFn(scope) { //引用模版(权限)
            var proId = this.proId
            var jurisdiction = rightSysPermissionFn(proId,'paper_template_u')
            if(jurisdiction ) {
                var data = {
                    token: this.token,
                    userId: this.userId,
                    pageNo: 0,
                    pageSize: 10,
                    data: {
                        ids: scope.row.id,
                        parentId: this.workCatalogueParentId,
                        projId: this.proId
                    }
                }
                this.$post('/doc/paper/batchRefSysTemplateDataToPaper', data)
                .then((res) => {
                    if(this.requestCode.SUCCESS == res.code) {
                        if(this.workFenType == 1) {
                            this.workGetDocSysTemplateByCatalogIdPage(scope.row.catalogId)
                        } else if(this.workFenType == 2) {
                            this.workManuSearchFn()
                        }

                        this.$message({
                            message: '引用成功',
                            type: "success"
                        });
                    } else {
                        this.$message({
                            message: res.msg,
                            type: "error"
                        });
                    }
                }).catch(function(error) {
                    console.log(error);
                });
            } else {
                this.$message({
                    message: '当前无权限',
                    type: "warning"
                });
            }
        },
        workWarningFn(scope) {
            this.warningIsShow = true;
            this.attention = scope.row.attention
        },
        workManuSelectionChange(val) { //底稿表格全选
            this.wrokManuSelectionChangeIds = val
        },
        workManuSelecChange(val) { //底稿表格单选
            this.wrokManuSelectionChangeIds = val
        },
        workAllCitesFn() { //批量引用(权限)
            var idsArr = []
            var proId = this.proId
            var jurisdiction = rightSysPermissionFn(proId,'paper_template_u')
            if(jurisdiction ) {
                if(this.wrokManuSelectionChangeIds.length != 0) {
                    var loading = this.$loading({
                        lock: true,
                        text: '数据过多正在引用中',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    this.wrokManuSelectionChangeIds.map((item,idx) => {
                        idsArr.push(item.id)
                    })

                    var data = {
                        token: this.token,
                        userId: this.userId,
                        pageNo: 0,
                        pageSize: 10,
                        data: {
                            ids: idsArr.join(','),
                            projId: this.proId,
                            parentId: this.workCatalogueParentId
                        }
                    }
                    this.$post('/doc/paper/batchRefSysTemplateDataToPaper', data)
                    .then((res) => {
                        loading.close();
                        if(this.requestCode.SUCCESS == res.code) {
                            if(this.workFenType == 1) {
                                this.workGetDocSysTemplateByCatalogIdPage(this.workTempNameItemData.id)
                            } else if(this.workFenType == 2) {
                                this.workManuSearchFn()
                            }
                            this.$message({
                                message: '引用成功',
                                type: "success"
                            });
                        } else {
                            this.$message({
                                message: res.msg,
                                type: "error"
                            });
                        }
                    }).catch(function(error) {
                        loading.close();
                        console.log(error);
                    });
                } else {
                    this.$message({
                        message: '请选中数据在进行操作',
                        type: "warning"
                    });
                }
            } else {
                this.$message({
                    message: '当前无权限',
                    type: "warning"
                });
            }

        },
        renderSize(value){ //过滤处理文件大小
            if(null==value||value==''){
                return "0 Bytes";
            }
            var unitArr = new Array("Bytes","KB","MB","GB","TB","PB","EB","ZB","YB");
            var index=0;
            var srcsize = parseFloat(value);     index=Math.floor(Math.log(srcsize)/Math.log(1024));
            var size =srcsize/Math.pow(1024,index);
            size=size.toFixed(2);//保留的小数位数
            return size+unitArr[index];
        },

        /* 工作底稿 与 项目 区分*/

        proHandleSizeChange(val) {
            this.pagesize = val;
            if(this.proFenType == 1 && this.currentPage == 1) {
                this.proGetDocSysTemplateByCatalogIdPage(this.proTempNameItemData.id)
            } else if(this.proFenType == 2 && this.currentPage == 1) {
                this.proManuSearchFn()
            }
        },
        proHandleCurrentChange(val) {
          this.currentPage = val;
          if(this.proFenType == 1) {
              this.proGetDocSysTemplateByCatalogIdPage(this.proTempNameItemData.id)
          } else if(this.proFenType == 2) {
            this.proManuSearchFn()
          }
        },
        proGetManTempListFn() { //获取项目模版目录列表
            var data = {
                token: this.token,
                userId: this.userId,
                data: {
                    sourceType: 0,
                    proId: this.proId
                }
            }
            this.$post('/doc/project/getProjectTemplateCatalogList', data)
            .then((res) => {
                if(this.requestCode.SUCCESS == res.code) {
                    this.proManuTempCataListData = res.data
                    this.proTempNameItemData = res.data[0]
                    this.proGetDocSysTemplateByCatalogIdPage(this.proManuTempCataListData[0].id)
                } else if(this.requestCode.RESULT_EMPTY == res.code){
                    this.proManuTempList = res.data
                    this.proManuTempCataListData = res.data
                } else {
                    this.$message({
                        message: res.msg,
                        type: "error"
                    });
                }
            }).catch(function(error) {
                console.log(error);
            });
        },
        proGetDocSysTemplateByCatalogIdPage(parentId) { //获取项目目录列表请求方式
            this.proFenType = 1;
            var data = {
                token: this.token,
                userId: this.userId,
                pageNo: this.currentPage,
                pageSize: this.pagesize,
                data: {
                    sourceType: 0,
                    proId: this.proId,
                    parentId: parentId
                }
            }
            this.$post('/doc/project/getProjectTemplateListByCatalogId', data)
            .then((res) => {
                if(this.requestCode.SUCCESS == res.code) {
                    this.proManuTempList = res.data.list;
                    this.proManuTempList.map(item => {
                        this.proIconFilter(item)
                    })
                    this.proManuTempTotal = res.data.total;
                    this.proTotalNum = res.data.total
                } else {
                    this.$message({
                        message: res.msg,
                        type: "error"
                    });
                }
            }).catch(function(error) {
                console.log(error);
            });
        },
        proManuSearchFn() { //项目模糊搜索
            this.proFenType = 2;
            if(this.proManuSearch_input != '' && this.currentPage != 1) {
                this.currentPage =  1
                this.pagesize =  10
            }
            var data = {
                token: this.token,
                userId: this.userId,
                pageNo: this.currentPage,
                pageSize: this.pagesize,
                data: {
                    fileName: this.proManuSearch_input,
                    sourceType: 0,
                    proId: this.proId
                }
            }
            this.$post('/doc/paper/getProjectTemplateListByDocName', data)
            .then((res) => {
                if(this.requestCode.SUCCESS == res.code) {
                    this.proManuTempList = res.data.list;
                    this.proManuTempList.map(item => {
                        this.proIconFilter(item)
                    })
                    this.proManuTempTotal = res.data.list.length;
                    this.proTotalNum = res.data.total
                    this.proManuTempChunk = false;
                } else {
                    this.$message({
                        message: res.msg,
                        type: "error"
                    });
                }
            }).catch(function(error) {
                console.log(error);
            });
        },
        addTemp() {
            var proId = this.proId
            var jurisdiction = rightSysPermissionFn(proId,'paper_template_create')
            if(jurisdiction ) {
                this.newTempName = ''
                this.creatTempClassIsShow = true;
            } else {
                this.$message({
                    message: '当前无权限',
                    type: "warning"
                });
            }

        },
        creatTempCatalog() { //新建模板目录
            var data = {
                pageNo:0,
                pageSize:10,
                token:this.token,
                userId:this.userId,
                data:{
                    proId:this.proId,
                    docName: this.newTempName,
                    sourceType:0//项目文档为0
                },
            }
            this.$post('/doc/project/addProjTemplateCatalog', data)
            .then((res) => {
                if(this.requestCode.SUCCESS == res.code) {
                    this.proGetManTempListFn();
                    this.$message({
                        type: "success",
                        message: res.msg
                    });
                    this.creatTempClassIsShow = false;
                } else {
                    this.$message({
                        type: "error",
                        message: res.msg
                    });
                }

            }).catch(function(error) {
                console.log(error);
            });
        },
        proConfirmDeleteCatalog(itemValue,delType) { //删除目录
            //delType 删除类型 1.模版 2.条数据
            var proId = this.proId
            var jurisdiction = rightSysPermissionFn(proId,'paper_template_del')
            if(jurisdiction ) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteTempCatalog(itemValue,delType);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            } else {
                this.$message({
                    message: '当前无权限',
                    type: "warning"
                });
            }
        },
        deleteTempCatalog(itemValue,delType){
            var data = {
                pageNo:0,
                pageSize:10,
                token:this.token,
                userId:this.userId,
                data:{
                    sourceType: 0,
                    id:itemValue.id
                }
            }
            this.$post('/doc/project/deleteProjTemplateCatalog', data)
            .then((res) => {

                if(this.requestCode.SUCCESS == res.code) {
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                    this.currentPage =  1
                    this.pagesize =  10
                    if(delType == 1) {
                        this.proGetManTempListFn()
                    } else if(delType == 2) {
                        if(this.proFenType == 1) {

                            this.proGetDocSysTemplateByCatalogIdPage(this.proTempNameItemData.id)
                        } else if(this.proFenType == 2) {
                            this.proManuSearchFn()
                        }
                    }

                } else {
                    this.$message({
                        message: res.msg,
                        type: "error"
                    });
                }
            }).catch(function(error) {
                console.log(error);
            });
        },
        proTempNameItemFn(item,idx) { //点击每个目录模版
            this.proTempNameItemData = item
            this.proManuTempShow = idx
            this.proGetDocSysTemplateByCatalogIdPage(item.id)
        },
        proMoreBtnFn() { //更多
            this.proManuTempNameHeight = this.proManuTempNameHeight === '64px' ? '' : '64px';
        },
        proCiteFn(scope) { //引用模版(权限)
            var proId = this.proId
            var jurisdiction = rightSysPermissionFn(proId,'paper_template_u')
            if(jurisdiction ) {
                var data = {
                    token: this.token,
                    userId: this.userId,
                    pageNo: 0,
                    pageSize: 10,
                    data: {
                        ids: scope.row.id,
                        parentId: this.workCatalogueParentId,
                        proId: this.proId
                    }
                }
                this.$post('/doc/paper/batchRefProjTemplateDataToPaper', data)
                .then((res) => {
                    if(this.requestCode.SUCCESS == res.code) {
                        if(this.proFenType == 1) {

                            this.proGetDocSysTemplateByCatalogIdPage(this.proTempNameItemData.id)
                        } else if(this.proFenType == 2) {
                            this.proManuSearchFn()
                        }
                        this.$message({
                            message: '引用成功',
                            type: "success"
                        });
                    } else {
                        this.$message({
                            message: res.msg,
                            type: "error"
                        });
                    }
                }).catch(function(error) {
                    console.log(error);
                });
            } else {
                this.$message({
                    message: '当前无权限',
                    type: "warning"
                });
            }
        },
        proManuSelectionChange(val) { //项目表格全选
            this.proManuSelectionChangeIds = val
        },
        proManuSelecChange(val) {  //项目表格单选
            this.proManuSelectionChangeIds = val
        },
        proAllCitesFn() { //批量引用(权限)
            var idsArr = []
            var proId = this.proId
            var jurisdiction = rightSysPermissionFn(proId,'paper_template_u')
            if(jurisdiction ) {
                if(this.proManuSelectionChangeIds.length != 0) {
                    var loading = this.$loading({
                        lock: true,
                        text: '数据过多正在引用中',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    this.proManuSelectionChangeIds.map((item,idx) => {
                        idsArr.push(item.id)
                    })

                    var data = {
                        token: this.token,
                        userId: this.userId,
                        pageNo: 0,
                        pageSize: 10,
                        data: {
                            ids: idsArr.join(','),
                            proId: this.proId,
                            parentId: this.workCatalogueParentId
                        }
                    }
                    this.$post('/doc/paper/batchRefProjTemplateDataToPaper', data)
                    .then((res) => {
                        loading.close();
                        if(this.requestCode.SUCCESS == res.code) {
                            if(this.proFenType == 1) {
                                this.proGetDocSysTemplateByCatalogIdPage(this.proTempNameItemData.id)
                            } else if(this.proFenType == 2) {
                                this.proManuSearchFn()
                            }
                            this.$message({
                                message: '引用成功',
                                type: "success"
                            });
                        } else {

                            this.$message({
                                message: res.msg,
                                type: "error"
                            });
                        }
                    }).catch(function(error) {
                        loading.close();
                        console.log(error);
                    });
                } else {
                    this.$message({
                        message: '请选中数据在进行操作',
                        type: "warning"
                    });
                }
            } else {
                this.$message({
                    message: '当前无权限',
                    type: "warning"
                });
            }

        },
        proTempView(itemValue) { //预览
            var previewData = {
              projectId: this.$store.state.projectMsg.pro_id,
                rfsId: itemValue.row.docVersionRfs,
                docId : itemValue.row.docId,
                photoType: itemValue.row.infoDocType,
                docName: itemValue.docName
            }
            this.$store.commit('previewAllFn',previewData )
        },
        upload(){
            var proId = this.proId
            var jurisdiction = rightSysPermissionFn(proId,'paper_template_upload')
            if(jurisdiction ) {
                this.seleCatalogIsShow = true;
            } else {
                this.$message({
                    message: '当前无权限',
                    type: "warning"
                });
            }
        },
        selectedCatalog(){
            if(this.seleCatalog.catalog == ''){
                this.$message({
                    type: "warning",
                    message: '请选择目录'
                });
            } else {
                this.uploadParamData.parentId = this.seleCatalog.catalog;
                this.addDoc = true;
                this.uploadDocAddIsShow = true;
            }
        },
        docUpload(uploadData){ //上传模板
            this.seleCatalogIsShow = false;
            let data = {
                data: {
                    proId: this.proId,
                    parentId: this.seleCatalog.catalog,//上传时目录id
                    docId: uploadData.docId,
                    sourceType: 0
                },
                pageNo: 0,
                pageSize: 10,
                token: this.token,
                userId: this.userId
            }
            this.$post('/doc/project/addProjTemplate', data)
            .then((response) => {
                if(this.requestCode.SUCCESS == response.code) {
                    this.$refs.uploadComplete.uploadComplete();
                } else {
                    this.$message({
                        message: response.msg,
                        type: "error"
                    });
                }
            }).catch(function(error) {

            });
        },
         docUploadAllsucess(){
            this.uploadAddDocClose()
            this.proGetDocSysTemplateByCatalogIdPage(this.seleCatalog.catalog);
            this.$message({
                type: "success",
                message: '上传成功'
            });
        },
        uploadAddDocClose() {
            this.uploadDocAddIsShow = false;
            this.addDoc = false;
        },


        iconFilter(itemValue) { //过滤重命名的icon
            if (itemValue.docType == 1) {
               itemValue.fileIcon = require("../../common/fileIcon/FolderType1.png");
            } else {
                var hz_name = itemValue.docType.toLowerCase();
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
        },
        proIconFilter(itemValue) { //过滤重命名的icon
            if (itemValue.docType == 1) {
                itemValue.fileIcon = require("../../common/fileIcon/FolderType1.png");
            } else {
                var hz_name = itemValue.infoDocType;
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
}
</script>
<style lang="scss" scoped>
    .project-doc-temp{
        width: 100%;
        position: relative;
        .el-tabs__content{
            width: 100%;
            height: 100%;
        }
        .first_tab{
            .manu_temp{
                width: 100%;
                height: 100%;
            .manu-temp-name-list {
                width: 100%;
                margin-top: 10px;
                display: flex;
                .total-temp {
                    display: flex;
                    height: 42px;
                    padding:0 14px;
                    line-height: 42px;
                    font-size: 14px;
                    p{
                        font-size: 14px;
                        margin-left: 5px;
                    }
                    span{
                        font-size: 14px;
                        color:rgba(210,44,44,1);
                    }
                }
                .input-with-select {
                    width: 500px;
                    height:24px;
                    background:rgba(255,255,255,1);
                    border-radius:2px;
                }
            }
            .manu_temp_name_list{
                width: 100%;
                margin-top: 20px;
                overflow: hidden;
                border:1px solid rgba(221, 221, 221, 1);
                .manu_temp_name{
                    width: 100%;
                    display: flex;
                    background: #fff;
                    overflow: hidden;
                    .manu_temp_name_tit{
                        width: 130px;
                        text-align: center;
                        line-height: 62px;
                        background: #f5f5f5;
                    }
                    .manu_temp_name_cou{
                        flex:1;
                        display: flex;
                        justify-content: space-between;
                        .manu_temp_name_cou_list{
                            flex: 1;
                            display: flex;
                            flex-wrap: wrap;
                            span{
                                display: inline-block;
                                margin: 20px 10px 10px 10px;
                                cursor: pointer;
                            }
                            .active{
                                color:rgba(94,157,248,1);
                                cursor: pointer;
                            }
                        }
                        .manu_temp_name_cou_btn{
                            width: 60px;
                            height: 62px;
                            text-align: center;
                            line-height: 62px;
                            em{
                                margin-right:6px;
                            }
                            .arrow{
                                width: 12px;
                                height: 8px;
                                margin-top: 26px;
                                background: url('../../../assets/project_doc/moreBtn.png') no-repeat 0 0;
                            }
                        }

                    }
                }
                .manu_child_cata{
                    width: 100%;
                    height: 64px;
                    display: flex;
                    flex-direction: row;
                    background: #fff;
                    border-top: 1px dashed #cccccc;
                    .manu_child_cata_tit{
                        width: 130px;
                        height: 100%;
                        text-align: center;
                        line-height: 62px;
                        background: #f5f5f5;
                    }
                    .manu_child_cata_cou{
                        flex:1;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .manu_child_cata_cou_list{
                            width: 100%;
                            height: 100%;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            overflow: hidden;
                            .manu_child_cata_cou_list_all{
                                width: 40px;
                                display: inline-block;
                                margin-left: 10px;
                                color:rgba(94,157,248,1);
                            }
                            .manu_child_cata_cou_list_item{
                                display: inline-block;
                                width: 700px;
                                overflow:hidden;
                                text-overflow:ellipsis;
                                white-space:nowrap;
                            }
                        }
                        .manu_child_cata_cou_btn{
                            background: #F7F9FB;
                            margin-right: 10px;
                        }
                    }
                }
            }

            .project-temp-catalog.project-temp-catalog-all {
                height: auto;
            }
            .project-temp-current-path {
                height:32px;
                background: #F5F5F5;
                border-radius:2px;
                margin-top: 20px;
                .current-path {
                    float: left;
                    height: 32px;
                    line-height: 32px;
                    padding-left: 20px;
                    margin-right: 6px;
                }
                .temp-path-list {
                    width: 400px;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                    margin-top: 6px;

                }
                .project-temp-more-btn {

                }
            }
            .project-temp-con-list {
                width: 100%;
                height: 100%;
                margin-top: 20px;
                .work_table_tem_name{
                    display: flex;
                    align-items: center;
                    .work_table_tem_name_icon{
                        width: 23px;
                        height: auto;
                        margin-right: 8px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        img{
                            width: 100%;
                            height: auto;
                        }
                    }
                    .work_table_tem_name_title {
                        width: 350px;
                        overflow:hidden;
                        text-overflow:ellipsis;
                        white-space:nowrap;
                    }
                }
                .work_operation{
                    display: flex;
                    .work_operation_refe{
                        width: 30px;
                        height: 30px;
                        background: url('../../../assets/manuscript_icon/refe_icon.png') no-repeat;
                        background-size: 30px 30px;
                        cursor: pointer;
                    }
                    .work_operation_warning{
                        width: 30px;
                        height: 30px;
                        background: url('../../../assets/manuscript_icon/warning_icon.png') no-repeat;
                        background-size: 30px 30px;
                        margin-left: 10px;
                        cursor: pointer;
                    }
                    .work_operation_refe:hover{
                        width: 30px;
                        height: 30px;
                        background: url('../../../assets/manuscript_icon/refe_hover_icon.png') no-repeat;
                        background-size: 30px 30px;
                        cursor: pointer;
                    }
                    .work_operation_warning:hover{
                        width: 30px;
                        height: 30px;
                        background: url('../../../assets/manuscript_icon/warning_hover_icon.png') no-repeat;
                        background-size: 30px 30px;
                        cursor: pointer;
                    }
                }
            }
            .project-temp-opera {
                margin-top: 10px;
            }
            .quote-temp {
                float: left;
            }
            .pagination-box {
                // float: left;
                margin:  10px auto 0 98px;
                // margin-left: 98px;
            }
            .project-temp-more {
                span {
                    display: block;
                    width: 12px;
                    height: 8px;
                    background: url('../../../assets/project_doc/moreBtn.png') no-repeat 0 0;
                }
            }
            }
        }
        .second_tab{
            .manu_temp{
                width: 100%;
                height: 100%;
                .manu-temp-name-list {
                    width: 100%;
                    margin-top: 10px;
                    display: flex;
                    .total-temp {
                        display: flex;
                        height: 42px;
                        padding:0 14px;
                        line-height: 42px;
                        font-size: 16px;
                        p{
                            font-size: 14px;
                        }
                        span{
                            font-size: 14px;
                            color:rgba(210,44,44,1);
                        }
                    }
                    .input-with-select {
                         width: 500px;
                        height:24px;
                        background:rgba(255,255,255,1);
                        border-radius:2px;
                    }
                    .upload-btn {
                        width:107px;
                        height:42px;
                        background:rgba(238,245,254,1);
                        border:1px solid rgba(187, 215, 251, 1);
                        border-radius:2px;
                        color:#fff;
                        margin-left: 20px;
                        margin-right: 20px;
                    }
                }
                .manu_temp_name_list{
                    width: 100%;
                    margin-top: 20px;
                    overflow: hidden;
                    border:1px solid rgba(221, 221, 221, 1);
                    .manu_temp_name{
                        width: 100%;
                        display: flex;
                        background: #fff;
                        overflow: hidden;
                        .manu_temp_name_tit{
                            width: 130px;
                            text-align: center;
                            line-height: 62px;
                            background: #f5f5f5;
                        }
                        .manu_temp_name_cou{
                            flex:1;
                            display: flex;
                            justify-content: space-between;
                            .add-project-temp {
                                width: 60px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                // margin: 20px 10px 0 10px;
                                i{
                                    display: block;
                                    width: 24px;
                                    height: 24px;
                                    cursor: pointer;
                                    background: url('../../../assets/project_doc/addIcon.png') no-repeat 0 0;
                                }
                            }

                            .manu_temp_name_cou_list{
                                flex: 1;
                                display: flex;
                                align-items: center;
                                flex-wrap: wrap;
                                .manu_temp_name_cou_list_chunk{
                                    height: 40px;
                                    display: flex;
                                    align-items: center;
                                    border:1px solid #ccc;
                                    border-radius: 5px;
                                    margin: 10px 0 6px 10px;
                                    cursor: pointer;
                                    .manu_temp_name_cou_list_chunk_title{
                                        display: inline-block;
                                        width: 200px;
                                        overflow:hidden;
                                        text-overflow:ellipsis;
                                        white-space:nowrap;
                                        text-align: left;
                                        margin-left: 5px;
                                    }
                                    i{
                                        margin-right: 5px;
                                    }
                                }

                                .active{
                                    color:rgba(94,157,248,1);
                                }
                            }
                            .manu_temp_name_cou_btn{
                                width: 60px;
                                height: 62px;
                                text-align: center;
                                line-height: 62px;
                                em{
                                    margin-right:6px;
                                }
                                .arrow{
                                    width: 12px;
                                    height: 8px;
                                    margin-top: 26px;
                                    background: url('../../../assets/project_doc/moreBtn.png') no-repeat 0 0;
                                }
                            }

                        }
                    }
                }
                .project-temp-catalog.project-temp-catalog-all {
                    height: auto;
                }
                .project-temp-current-path {
                    height:32px;
                    background: #F5F5F5;
                    border-radius:2px;
                    margin-top: 20px;
                    .current-path {
                        float: left;
                        height: 32px;
                        line-height: 32px;
                        padding-left: 20px;
                        margin-right: 6px;
                    }
                    .temp-path-list {
                        width: 400px;
                        overflow:hidden;
                        text-overflow:ellipsis;
                        white-space:nowrap;
                        margin-top: 6px;

                    }
                    .project-temp-more-btn {

                    }
                }
                .project-temp-con-list {
                    width: 100%;
                    height: 100%;
                    margin-top: 20px;
                    .pro_table_tem_name{
                        display: flex;
                        align-items: center;
                        .pro_table_tem_name_icon{
                            width: 23px;
                            height: auto;
                            margin-right: 8px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            img{
                                width: 100%;
                                height: auto;
                            }
                        }
                        .pro_table_tem_name_title {
                            width: 350px;
                            overflow:hidden;
                            text-overflow:ellipsis;
                            white-space:nowrap;
                        }
                    }
                    .work_operation{
                        width: 100%;
                        display: flex;
                        .work_operation_refe{
                            width: 30px;
                            height: 30px;
                            background: url('../../../assets/manuscript_icon/refe_icon.png') no-repeat;
                            background-size: 30px 30px;
                            cursor: pointer;
                        }
                        .work_operation_preview{
                            width: 30px;
                            height: 30px;
                            background: url('../../../assets/manuscript_icon/preview_icon.png') no-repeat;
                            background-size: 30px 30px;
                            margin-left: 10px;
                            cursor: pointer;
                        }
                        .work_operation_del{
                            width: 30px;
                            height: 30px;
                            background: url('../../../assets/manuscript_icon/shanchu-83.png') no-repeat;
                            background-size: 30px 30px;
                            margin-left: 10px;
                            cursor: pointer;
                        }
                        .work_operation_refe:hover{
                            width: 30px;
                            height: 30px;
                            background: url('../../../assets/manuscript_icon/refe_hover_icon.png') no-repeat;
                            background-size: 30px 30px;
                            cursor: pointer;
                        }
                        .work_operation_preview:hover{
                            width: 30px;
                            height: 30px;
                            background: url('../../../assets/manuscript_icon/preview_hover_icon.png') no-repeat;
                            background-size: 30px 30px;
                            margin-left: 10px;
                            cursor: pointer;
                        }
                        .work_operation_del:hover{
                            width: 30px;
                            height: 30px;
                            background: url('../../../assets/manuscript_icon/shanchu.png') no-repeat;
                            background-size: 30px 30px;
                            margin-left: 10px;
                            cursor: pointer;
                        }
                    }
                }
                .project-temp-opera {
                    margin-top: 10px;
                }
                .quote-temp {
                    float: left;
                }
                .pagination-box {
                    // float: left;
                    margin:  10px auto 0 98px;
                    // margin-left: 98px;
                }
                .project-temp-more {
                    span {
                        display: block;
                        width: 12px;
                        height: 8px;
                        background: url('../../../assets/project_doc/moreBtn.png') no-repeat 0 0;
                    }
                }
            }
            .create_dialog{
                .el-dialog{
                    background: red;
                }
                .el-dialog__header{
                    border-bottom:1px solid #DDDDDD;
                    text-align: center;
                }
                .create_content{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .create_content_left{
                        width: 30%;
                    }
                    .create_content_right{
                        width: 80%;
                        .el-select{
                            width: 100%;
                        }
                    }
                }
            }

        }
        .manu_temp_child{
            position: absolute;
            right: 0;
            top: 0;
            width:400px;
            height: 100%;
            background: #ffffff;
            z-index: 999;
            animation: bounceInLeft 3s cubic-bezier(0.215, 0.610, 0.355, 1.000);
            border-left:1px solid #ccc;
            .manu_temp_child_list_title{
                width: 100%;
                height: 5%;
                background: #fff;
            }
            .manu_temp_child_list{
                width: 100%;
                height: 95%;
                .ztree{
                    width: 100%;
                }
            }
            .manu_temp_child_list_one{
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                .manu_temp_child_list_one_item{
                    display: flex;
                    align-items: center;
                    margin: 5px 5px 5px 10px;
                    .manu_temp_child_list_one_item_icon{
                        display: inline-block;
                        width: 18px;
                        height: 14px;
                        background: url('../../../assets/manuscript_icon/open_icon.png') no-repeat;
                        background-size: 18px 14px;
                    }
                    .manu_temp_child_list_one_item_title{
                        width: 370px;
                        overflow:hidden;
                        text-overflow:ellipsis;
                        white-space:nowrap;
                    }
                }

            }
        }
        @keyframes bounceInLeft {
            0% {

                transform: translate3d(400px, 0, 0);
            }
            60% {
            /*  opacity: 1;*/
                transform: translate3d(50px, 0, 0);
            }
            75% {
                transform: translate3d(0px, 0, 0);
            }
            90% {
                transform: translate3d(0px, 0, 0);
            }
            100% {
                transform: none;
            }
        }
        .pages {
            margin-top: 2px;
            padding-right: 50px;
            text-align: right;
            // background: #fff;
        }
    }
</style>
<style lang="scss">
    .create_dialog{
        .el-dialog__header{
            border-bottom:1px solid #DDDDDD;
            text-align: center;
        }
    }
    // .create_content_right_select_dropdown{
    //     width: 30%;
    // }
    .back_btn{
        border: none;
    }
    #rightZtree{
        width: 100%;
        height: 80%;
        li a {
            width: 100%;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
        }
        li span.switch{
            display: none;
        }
        li .node_name{
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            width: 100%;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
        }
        li a.curSelectedNode{
            padding-top: 0px;
            background: #F0F0F0;
            color: black;
            height: 16px;
            border: 1px #F0F0F0 solid;
            opacity: 0.8;
        }
        li span.button.diy01_ico_open{
            line-height:0; margin:0; width:18px; height:18px; display: inline-block; vertical-align:middle;
            border:0 none; cursor: pointer;outline:none;
            background-color:transparent; background-repeat:no-repeat; background-attachment: scroll;
            background: url('../../../assets/manuscript_icon/close_icon.png') no-repeat;
            background-size: 18px 14px;
        }
        li span.button.diy01_ico_close{
            line-height:0; margin:0; width:18px; height:18px; display: inline-block; vertical-align:middle;
            border:0 none; cursor: pointer;outline:none;
            background-color:transparent; background-repeat:no-repeat; background-attachment: scroll;
            background: url('../../../assets/manuscript_icon/open_icon.png') no-repeat;
            background-size: 18px 14px;
        }
    }
</style>

