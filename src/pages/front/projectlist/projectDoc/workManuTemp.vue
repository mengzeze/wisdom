<template>
    <div class="project-doc-temp" >
        <div class="manu_temp" style="display: inline" @click="leftKey">
            <div class="manu-temp-name-list clearfix">
                <div class="total-temp">
                    <p>底稿模板</p>
                    <span>（共{{manuTempTotal}}个文件）</span>
                </div>
                <el-input v-model="manuSearch_input" placeholder="请输入关键词" class="input-with-select t-input-with-select" clearable>
                    <el-button slot="append" icon="el-icon-search" @click="manuSearchFn"></el-button>
                </el-input>
            </div>
            <div class="manu_temp_name_list" v-if="manuTempChunk">
                <div class="manu_temp_name" :style="{height: manuTempNameHeight}">
                    <p class="manu_temp_name_tit">底稿模板名称:</p>
                    <div class="manu_temp_name_cou">
                        <div class="manu_temp_name_cou_list">
                            <span v-for="(item, idx) in manuTempCataListData" :key="idx" @click="tempNameItemFn(item,idx)" :class="{active:manuTempShow == idx}">
                                {{item.docName}}
                            </span>
                        </div>
                        <div class="manu_temp_name_cou_btn" @click="moreBtnFn">
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
                            <span class="manu_child_cata_cou_list_all" @click="couListAll">全部</span>
                            <span class="manu_child_cata_cou_list_item">{{couListName}}</span>
                        </div>
                        <div class="manu_child_cata_cou_btn" @click.stop="manuChildCataFn">选择子目录</div>
                    </div>
                </div>
            </div>
            <div class="project-temp-current-path clearfix">
                <p class="current-path">当前引用路径:</p>
                <div class="temp-path-list fl">
                    {{workCatalogueName}}
                </div>
            </div>

            <div class="project-temp-con-list">
                <el-table ref="multipleTable" :data="manuTempList" tooltip-effect="dark" style="width: 100%" @selection-change="manuSelectionChange" @select= "manuSelecChange">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column label="模板名称" width="600">
                        <template slot-scope="scope">
                            {{ scope.row.fileName}}
                        </template>
                        <!-- <template slot-scope="scope">
                            <input class="edit-cell" v-model="scope.row.docName" v-if="showReName[scope.row.index]">
                            <span v-if="!showReName[scope.row.index]">{{scope.row.docName}}</span>
                        </template> -->
                    </el-table-column>
                    <el-table-column prop="docSize" label="模板大小" width="240">
                        <template slot-scope="scope">
                            {{ renderSize(scope.row.docSize)}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="refCount" label="引用次数" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="updateTime" label="更新时间" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <div @click="citeFn(scope)">引用</div>
                            <div @click="delFn(scope)">删除</div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="project-temp-opera clearfix">
                <div class="quote-temp">
                    <!-- <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button> -->
                    <!-- <el-checkbox v-model="allChecked">全选</el-checkbox> -->
                    <el-button @click="citesFn()">批量引用</el-button>
                </div>
                <div class="pagination-box">
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalNum">
                    </el-pagination>
                </div>
            </div>

        </div>
         <div class="manu_temp_child" v-if="manuChild">
            <div>
                <el-input v-model="manuCataSearch_input" placeholder="请输入关键词" class="input-with-select t-input-with-select" clearable>
                    <el-button slot="append" icon="el-icon-search" @click="manuCataSearchFn"></el-button>
                </el-input>
            </div>
            <div class="manu_temp_child_list" v-if="listShow">
                <ul id="ztree" class="ztree"></ul>
            </div>
            <div class="manu_temp_child_list_one" v-else>
                <div v-for="item in listOneData">
                    {{item.docName}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import creatTempClass from '@/components/file/creattempclass'
export default {
    name: "projectDocTemp",
    components: {
        creatTempClass
    },
    props:[

    ],
    data() {
        return {
            activeName: "first",
            token: '', //请求接口默认必传数据
            userId: '', //请求接口默认必传数据
            proId: '', //请求接口默认必传数据
            sourceType: '', //请求接口默认必传数据
            requestCode: {}, //所有请求的状态码
            manuTempTotal: 0, //底稿显示文件
            manuSearch_input: '', //底稿搜素框
            manuCataSearch_input: '', //底稿跟目录搜索框
            manuTempChunk: true, //中间底稿块的是否显示
            manuTempCataListData: [], //底稿模版目录数据
            manuTempNameHeight: '64px', //底稿模版目录的高
            manuTempShow: 0,
            manuChild: false, //底稿子目录是否显示
            tempNameItemData: '', //底稿模版名称每一条数据
            manuDocTempList: [], //底稿模版列表
            manuTempList: [], //底稿模版数据
            manuSelectionChangeIds: [], //底稿模版全选数据
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
            projectId: '',
            allChecked: true,   //全选
            listOneData: [],
            listShow: true,
            couListName: '',
            couListData: '',
            activeNames: ['1'],
            workCatalogueName: '',
            workCatalogueParentId: '',
            totalNum: 0,
            currentPage: 1,
            pagesize: 10,
        }
    },
    created() {
        this.projectId = this.$route.query.projectId;
        this.activeName = this.$route.query.activeName;
        this.workCatalogueName = this.$route.query.workCatalogueName;
        this.workCatalogueParentId = this.$route.query.workCatalogueParentId;
        this.token = this.$store.state.loginObject.userToken;
        this.userId = this.$store.state.loginObject.userId;
        this.proId = this.$store.state.projectMsg.pro_id;
        this.requestCode = this.code.codeNum;
        this.sourceType = 1;
        this.getManTempListFn()
    },
    mounted() {

    },
    methods: {
        leftKey(e) {
            if(e.button == 0) {

                this.manuChild = false

            }
        },
        handleClick(tab, event) {
            console.log(tab, event)
        },
        handleSizeChange(val) {
            this.pagesize = val;
            if (this.currentPage = 1) {
                this.manuSearchFn()
            }
        },
        handleCurrentChange(val) {
          this.currentPage = val;
          this.manuSearchFn()
        },
        getManTempListFn() { //获取工作底稿目录列表
            var data = {
                token: this.token,
                userId: this.userId,
                data: {
                }
            }
            this.$post('/doc/paper/getRootSysCatalogs', data)
            .then((res) => {
                if(this.requestCode.SUCCESS == res.code) {
                    this.manuTempCataListData = res.data
                    this.tempNameItemData = res.data[0]
                    this.getDocSysTemplateByCatalogIdPage(this.tempNameItemData.id,this.tempNameItemData.id)
                }
            }).catch(function(error) {
                console.log(error);
            });
        },
        getDocSysTemplateByCatalogIdPage(parentId, id) { //获取工作底稿目录列表请求方式
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
                    this.manuTempList = res.data.list;
                    this.manuTempTotal = res.data.list.length;
                    this.totalNum = res.data.total
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
        manuSearchFn() { //底稿模糊搜索
            if(this.manuSearch_input != '' && this.currentPage != 1) {
                this.currentPage =  1
                this.pagesize =  10
            }
            var data = {
                token: this.token,
                userId: this.userId,
                pageNo: this.currentPage,
                pageSize: this.pagesize,
                data: {
                    fileName: this.manuSearch_input,
                }
            }
            this.$post('/doc/paper/getDocSysTemplateByDocName', data)
            .then((res) => {
                if(this.requestCode.SUCCESS == res.code) {
                    this.manuTempList = res.data.list;
                    this.manuTempTotal = res.data.list.length;
                    this.totalNum = res.data.total
                    this.manuTempChunk = false;
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
        tempNameItemFn(item,idx) { //点击每个目录模版
            this.tempNameItemData = item
            this.manuTempShow = idx
            this.couListName = ''
            this.getDocSysTemplateByCatalogIdPage(item.id,item.id)
        },
        moreBtnFn() { //更多
            this.manuTempNameHeight = this.manuTempNameHeight === '64px' ? '' : '64px';
        },
        manuChildCataFn() { //底稿选择子目录
            this.manuChild = true
            if(this.tempNameItemData != '') {
                var data = {
                    token: this.token,
                    userId: this.userId,
                    pageNo: 0,
                    pageSize: 10,
                    data: {
                        catalogId: this.tempNameItemData.id
                    }
                }
            }
            this.$post('/doc/paper/getAllSysCatalogsByRootCatalog', data)
            .then((res) => {
                if(this.requestCode.SUCCESS == res.code) {
                    this.zNode = res.data
                    this.zNode.forEach((item) => {
                        item.isParent = true;
                    });
                    $.fn.zTree.init($("#ztree"), this.setting, this.zNode);

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
        couListAll() { //点击全部
           if(this.couListData) {
                var treeObj = $.fn.zTree.getZTreeObj("ztree");
                var node = this.couListData.getParentNode();
                this.couListName = node.docName
                this.getDocSysTemplateByCatalogIdPage(node.parentId,node.id)
           }
        },
        zTreeOnClick(event, treeId, treeNode) { //点击树每个目录
            this.manuChild = true
            this.couListName = treeNode.docName
            this.couListData = treeNode
            this.getDocSysTemplateByCatalogIdPage(this.tempNameItemData.id, treeNode.id)
        },
        manuCataSearchFn() {
            if(this.tempNameItemData != '') {
                var data = {
                    token: this.token,
                    userId: this.userId,
                    data: {
                        catalogId: this.tempNameItemData.id,
                        docName: this.manuCataSearch_input
                    }
                }
            } else {
                var data = {
                    token: this.token,
                    userId: this.userId,
                    data: {
                        catalogId: this.manuTempCataListData[0].id,
                        docName: this.manuCataSearch_input
                    }
                }
            }
            this.$post('/doc/paper/getSysCatalogsByDocName', data)
            .then((res) => {
                if(this.requestCode.SUCCESS == res.code) {
                    this.listOneData = res.data
                    this.listShow = false
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
        citeFn(scope) { //引用模版
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
        },
        delFn(scope) { //删除模版
            var data = {
                token: this.token,
                userId: this.userId,
                data: {
                    ids: scope.row.id
                }
            }
            this.$post('/doc/paper/batchDeleteSystemTemplate', data)
            .then((res) => {
                if(this.requestCode.SUCCESS == res.code) {
                    this.currentPage =  1
                    this.pagesize =  10
                    this.manuSearchFn()
                    this.$message({
                        message: '删除成功',
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
        },
        manuSelectionChange(val) {
            //底稿表格全选
            this.manuSelectionChangeIds = val
        },
        manuSelecChange(val) {
            //底稿表格单选
            this.manuSelectionChangeIds = val
        },
        citesFn() { //批量引用
            var idsArr = []
            if(this.manuSelectionChangeIds.length != 0) {
                this.manuSelectionChangeIds.map((item,idx) => {
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
                    if(this.requestCode.SUCCESS == res.code) {
                        this.$message({
                            message: '引用成功',
                            type: "success"
                        });
                    }
                }).catch(function(error) {
                    console.log(error);
                });
            } else {
                this.$message({
                    message: '请选中数据在进行操作',
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
        }
    }
}
</script>
<style lang="scss" scoped>
    /* 工作底稿模版样式 */
    .project-doc-temp {
        position: relative;
        .manu_temp{
            width: 100%;
            height: 100%;
            .manu-temp-name-list {
                margin-top: 20px;
                .total-temp {
                    float: left;
                    height: 42px;
                    padding:0 14px;
                    line-height: 42px;
                    font-size: 16px;
                    p{
                        float:left;
                        font-size: 16px;
                    }
                    span{
                        float:left;
                        font-size: 14px;
                        color:rgba(210,44,44,1);
                    }
                }
                .input-with-select {
                    float: left;
                    width:784px;
                    height:24px;
                    background:rgba(255,255,255,1);
                    border:1px solid rgba(221, 221, 221, 1);
                    border-radius:2px;
                }
                .upload-btn {
                    float: left;
                    width:107px;
                    height:42px;
                    background:rgba(238,245,254,1);
                    border:1px solid rgba(187, 215, 251, 1);
                    border-radius:2px;
                    color:rgba(94,157,248,1);
                }
            }
            .manu_temp_name_list{
                width: 1024px;
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
                                margin: 20px 10px 10px 50px;
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
                                background: url('../../../../assets/project_doc/moreBtn.png') no-repeat 0 0;
                            }
                        }

                    }
                }
                .manu_child_cata{
                    width: 100%;
                    height: 64px;
                    display: flex;
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
                            flex:1;
                            display: flex;
                            justify-content: flex-start;
                            .manu_child_cata_cou_list_all{
                                margin-left: 30px;
                                color:rgba(94,157,248,1);
                            }
                            .manu_child_cata_cou_list_item{
                                margin-left: 20px;
                            }
                        }
                        .manu_child_cata_cou_btn{
                            width: 90px;
                            height: 30px;
                            text-align: center;
                            line-height: 30px;
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
                background: #fff;
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
                    margin-top: 6px;

                }
                .project-temp-more-btn {

                }
            }
            .project-temp-con-list {
                margin-top: 20px;
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
                    background: url('../../../../assets/project_doc/moreBtn.png') no-repeat 0 0;
                }
            }
        }
        .manu_temp_child{
            width: 400px;
            background: #fff;
            position: absolute;
            top: 0;
            right: 0;
            display: flex;
            flex-direction: column;
            .manu_temp_child_list{
                flex:1;
                overflow-y: scroll;
            }
            .manu_temp_child_list_one{
                flex:1;
                overflow-y: scroll;
            }
        }
    }

</style>
