<template>
    <div id="project-index-lists">
        <el-dialog title="索引列表" class='lists' center :close-on-click-modal="false" :visible="projectIndexShow" @close="clickEvent">
            <!-- 查询条件 -->
            <div class='project_search' v-on:keyup.enter="query">
                <el-form ref="form"  label-width="100px" class="clearfix">
                    <el-form-item label="源文件名称:">
                        <el-input class="q-246"
                            :title="queryObj.docNameSet"
                            v-model="queryObj.docNameSet"
                            placeholder="包含以下全部关键字（以空格区分）"
                            :maxlength="160"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="源文件所在目录:"  label-width="140px" >
                        <el-input class="q-246"
                            :title="queryObj.projectDirNameSet"
                            v-model="queryObj.projectDirNameSet"
                            placeholder="包含以下全部关键字（以空格区分）"
                            :maxlength="160"
                        ></el-input>
                    </el-form-item>
                     <el-form-item label="索引文件所在目录:"  label-width="153px" >
                        <el-input class="q-246"
                            :title="queryObj.paperDirNameSet"
                            v-model="queryObj.paperDirNameSet"
                            placeholder="包含以下全部关键字（以空格区分）"
                            :maxlength="160"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="索引创建人:"  label-width="113px" >
                        <el-input :title="createName" v-model="createName" class="fl q-170" placeholder="请选择人员" disabled="disabled"></el-input>
                        <el-button type="primary" size="small" class="fl" @click="optUser" style="margin-left: 0px;height: 40px;margin-top: 0px;">选择人员</el-button>
                    </el-form-item>
                    <el-form-item label="创建索引时间:" label-width="113px">
                      <date-range :date-start.sync="queryObj.beginData"
                                  :date-end.sync="queryObj.endData"
                                  format="yyyy-MM-dd HH:mm:ss"></date-range>
                    </el-form-item>
                     <el-button  type="primary" icon="el-icon-search" @click="query">查询</el-button>
                    <el-button  @click="reset" icon="el-icon-refresh">重置</el-button>
                </el-form>
            </div>
            <!-- 表格 -->
            <div class='project-table'>
                    <!-- height='100%' -->
                <el-table
                    :data="tableData"
                    height="calc(100vh - 380px)"
                    tooltip-effect="dark">
                    <el-table-column prop='docName' label="源文件名称" width="auto">
                        <template slot-scope="scope">
                            <div class='docName-local'>
                                <p class="localcolor iconfont location"  @click="positionDoc(scope.row, 0)"></p>
                                <p :title="scope.row.docName" @click="handleUploadFilePreview(scope.row, projectId, 1)">{{scope.row.docName}}</p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="projectDirName" label="源文件所在目录" width="200">
                         <template slot-scope="scope">
                             <!-- projectDirName -->
                            <p :title='`${scope.row.docProjectTitle} / ${scope.row.docName}`'>{{scope.row.projectDirName}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="docName" label="索引文件名称" width="auto">
                        <template slot-scope="scope">
                             <div class='docName-local'>
                                <p class="localcolor iconfont location"  @click="positionDoc(scope.row, 1)"></p>
                                <p :title="scope.row.docName" @click="handleUploadFilePreview(scope.row, projectId, 2)">{{scope.row.docName}}</p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="paperDirName" label="索引文件所在目录" width="200">
                        <template slot-scope="scope">
                            <!-- paperDirName -->
                            <p :title='`${scope.row.docPaperTitle} / ${scope.row.docName}`'>{{scope.row.paperDirName}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建索引时间" width="200"></el-table-column>
                    <el-table-column prop="createName" label="索引创建人" width="180">
                        <template slot-scope="scope">
                            <div class="sltitle" :title="scope.row.createName">{{scope.row.createName}}</div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 底部分页器 -->
            <div class="pagination">
                <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="totals"
                            :pageSize.sync="pageSize" :page-sizes.sync="pageSizes" :current-page.sync="currentPage"
                            @current-change="onPageChange" @size-change="handleSizeChange">
                </el-pagination>
            </div>
        </el-dialog>
        <!-- 选择索引创建人组件 -->
        <fintall-deptuser
            :findFlagShow.sync="findFlag"
            v-on:findAllUser="findAllUser"
            :findUserObj="findUserObj"
            :findState="findState"
            :checkState="checkState">
        </fintall-deptuser>
    </div>
</template>
<script>
    import fintallDeptuser from '@/components/select_box/findAllDeptUserMultipleNew'
    export default {
        name: 'projectIndexLists',
        props: ['projectIndexShow', 'projectIndexData'],
        components: {
            fintallDeptuser
        },
        data () {
            return {
                 permsType: {
                    view: false
                }, //向后台提交的权限数据
                token: '',
                userId: '',
                projectId:'',
                projectCreatBy: '',
                isPC: false,
                createName: '',
                queryObj: {
                    projectId: '', //"项目id",
                    idSet: [], // "已选择文件id集合{1,2,3}",
                    docNameSet: '', // 源文件名称
                    projectDirNameSet: '', // 源文件所在目录
                    paperDirNameSet: '', // 索引文件所在目录名称
                    createBySet: [], // 创建人id
                    beginData: '', // 开始时间
                    endData: '' // 结束时间
                },
                tableData: [],
                findFlag: false,
                findState:{},
                checkState:{},
                deployObj: [],
                findUserObj: [],
                pageNo: 0, //当前页码,
                totals: 0, // 总量
                pageSize: 100,
                pageSizes: [10, 20, 50, 100],  //每页显示数量
                currentPage: 1, //当前页
                 "docProject": {
                    "9188": [
                        "项目会议",
                        "项目承揽"
                    ],
                    "9577": [
                        "项目承揽"
                    ],
                    "9584": [
                        "项目承揽"
                    ],
                 }
            }
        },
        created () {
            this.token = this.$store.state.loginObject.userToken;
            this.userId = this.$store.state.loginObject.userId;
            this.success_code = this.code.codeNum.SUCCESS;
            this.projectCreatBy = this.$store.state.projectMsg.projectMsg.createBy;
            this.isPC = this.$store.state.isPC;
        },
        mounted(){
            this.queryList()
        },
        methods: {
            // 取消
            clickEvent() {
                this.$emit('update:projectIndexShow',false);
                this.queryObj.idSet = []
                this.queryObj.docNameSet = '' // 文件名称
                this.queryObj.projectDirNameSet = '' // 源文件所在目录
                this.queryObj.paperDirNameSet = '' // 索引文件所在目录名称
                this.queryObj.beginData = ''
                this.queryObj.endData = ''
                this.queryObj.createBySet = []
                this.createName = ''
            },
            // 查询
            query() {
                // this.projectIndexData.docPosition // 区分当前点击的是底稿管理 0 ？ 搜索结果页1 、已选文件列表2？
                console.log(this.projectIndexData.docSource, this.queryObj.docNameSet)
                this.projectId = this.projectIndexData.projectId
                let obj = {
                    projectId: this.projectIndexData.projectId, //"项目id",
                    idSet: this.projectIndexData.idSet, // "已选择文件id集合{1,2,3}",
                    docNameSet: this.queryObj.docNameSet ? this.queryObj.docNameSet.trim().split(" ") : [], // 源文件名称
                    projectDirNameSet: this.queryObj.projectDirNameSet ? this.queryObj.projectDirNameSet.trim().split(" ") : [], // 源文件所在目录
                    paperDirNameSet: this.queryObj.paperDirNameSet ? this.queryObj.paperDirNameSet.trim().split(" ") : [], // 索引文件所在目录名称
                    createBySet: this.queryObj.createBySet, // 创建人id
                    beginData: this.queryObj.beginData, // 开始时间
                    endData: this.queryObj.endData ? this.queryObj.endData.substr(0, 11) + '23:59:59' : ''  // this.search_form.endTime ? this.search_form.endTime.substr(0,11) + '23:59:59' : ''// 结束时间
                }
                //  0-项目文档，底稿管理，1-底稿管理查询
                var url = this.projectIndexData.docSource == 0 ? '/doc/project/linkAll': '/doc/paper/linkAll'
                var data = {
                    token: this.token,
                    userId: this.userId,
                    data: obj,
                    pageNo: this.currentPage,
                    pageSize: this.pageSize,
                    projectName: this.$store.state.projectMsg.projectMsg.name
                }
                // 系统日志添加记录的传参修改
                if(this.projectIndexData.docSource == 0) {
                    data.sourceName = '项目文档-索引列表'
                } else {
                    data.sourceName = '底稿管理-索引列表'
                    if (obj.docNameSet.length || obj.projectDirNameSet.length || obj.paperDirNameSet.length || obj.createBySet.length || obj.beginData !== '' || obj.endData !== '') {
                        data.paperFlag = true
                    }
                }
                this.$post(url, data).then((response) => {
                    if (response.code !== 0) {
                        this.$message.error(response.msg)
                        this.tableData = []
                        this.totals = 0
                        return
                    }
                    this.totals = response.data.total
                    if(this.currentPage > response.data.pages && response.data.pages !== 0) {
                        this.currentPage = response.data.pages
                        this.query()
                        return
                    }
                    if (response.data.list && response.data.list.length) {
                        this.queryList(response.data.list)
                        return
                    }
                    this.tableData = []

                }).catch((error) => {
                    this.$message.error(error)
                });
            },
            // 对应----目录title
            queryList (data) {
                // console.log(data, 3666)
                if (data && data.length) {
                let idSet = [], paperIdSet = []
                    data.forEach(v => {
                        idSet.push(v.docProjectId)
                        paperIdSet.push(v.docPaperId)
                    })
                    let obj = {
                        data: {
                            idSet: idSet,
                            paperIdSet: paperIdSet
                        },
                        token: this.token,
                        userId: this.userId,
                        projectId: this.projectId
                    }
                    this.$post('/doc/project/link/docPath', obj).then((response) => {
                        if (!response) {
                            this.$message.error(response.msg)
                            return
                        }
                        if (response.code !== 0) {
                            this.$message.error(response.msg)
                            return
                        }
                        console.log(response.data, 2365, data)
                        // response.data.docPaper---底稿，  docProject--项目文档
                        let docProject = response.data.docProject
                        let docPaper = response.data.docPaper
                        data.forEach(v => {
                            v.docProjectTitle = docProject[v.docProjectId].reverse().join(' / ')
                            v.docPaperTitle = docPaper[v.docPaperId].reverse().join(' / ')
                        })
                        this.tableData = data
                    console.log(235, this.tableData, docProject['9761'])
                    this.$forceUpdate()
                    }).catch((error) => {
                        this.$message.error(error)
                    });
                }
            },
            reset () {
                this.queryObj.idSet = []
                this.queryObj.docNameSet = '' // 文件名称
                this.queryObj.projectDirNameSet = '' // 源文件所在目录
                this.queryObj.paperDirNameSet = '' // 索引文件所在目录名称
                this.queryObj.beginData = ''
                this.queryObj.endData = ''
                this.queryObj.createBySet = []
                this.createName = ''
                console.log('重置')
            },
            /* 点击文件预览
                row:当前行
                projectId: this.projectId
                type: 1/项目文档，2/底稿
            */
            handleUploadFilePreview (row, projectId, num) {
                console.log(row, 6352, projectId, num, this.isPC)
                var type = row.docName.substring(row.docName.lastIndexOf(".") + 1, row.docName.length);//截
                var previewData = {
                    rfsId: row.rfsId,
                    docId: row.docId,
                    photoType: type,
                    sourceType: num == 1 ? 'projectDoc' : 'manuscriptmanage',
                    docName: row.docName,
                    sourceName: '索引列表页',
                    projectName: this.$store.state.projectMsg.projectMsg.name
                }
                // 项目文档验权限的id---取docProjectId, 预览和下载使用docId
                if (num == 1) {
                    this.canOperating(
                        {docId: row.docProjectId, view: false},
                        'view'
                        ).then(res => {
                            if(!res) {
                                this.$message.error('当前无权限');
                                return
                            }

                            var previewData = {
                                rfsId: row.rfsId,
                                docId: row.docId,
                                photoType: type,
                                sourceType: num == 1 ? 'projectDoc' : 'manuscriptmanage',
                                docName: row.docName,
                                sourceName: '索引列表页',
                                projectName: this.$store.state.projectMsg.projectMsg.name
                            }
                            sessionStorage.setItem("proDocViewDownId", row.docProjectId);
                            row.source = '0';
                            // this.isPC
                            // ? window.ChromeMain.CS_Main_OpenFile(JSON.stringify(row)) // PC端双击在线编辑
                            this.$store.commit('previewAllFn', previewData); // web端预览

                        })
                    }
                if (num == 2) {
                    if (!rightSysPermissionFn(row.docPaperId, 'paper_file_file_preview')) {
                        this.$message.error('当前无权限');
                        return
                    }
                    row.source = '1';
                    // this.isPC
                    // ? window.ChromeMain.CS_Main_OpenFile(JSON.stringify(row)) // PC端双击在线编辑
                    this.$store.commit('previewAllFn', previewData); // web端预览
                }

            },
            //  判断用户是否有权限进行某一操作
            async canOperating(param, flag) {
                if (this.projectCreatBy == this.userId) {
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
                    var data = await _this
                        .$post("/doc/paper/validateFilePermByUserId", send_data)
                        .then((response)=> {
                            if (_this.success_code == response.code) {
                                // var data = JSON.parse(response.data.permsType);
                                console.log(123, response.data)
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
            positionDoc (itemValue, type) {
                // type--0 源文件    1--索引文件
                let jurisdiction = this.$utils.checkProjectPermission('project_file') //判断是否有项目文档的权限
                let parperJurisdiction = this.$utils.checkSystemPermission('paper_mange') // 判断底稿的权限
                if (!jurisdiction && type == 0) {
                    this.$message.error('当前无权限')
                    return
                }
                if (!parperJurisdiction && type == 1) {
                    this.$message.error('当前无权限')
                    return
                }
                let data = {
                    token: this.token,
                    userId: this.userId,
                    data: {
                        id: itemValue.docProjectId,
                        projectId: itemValue.projectId,
                        docType: 0,
                        chatOrMsg: 0
                    }
                }
                let dataFull = {
                    projectId: itemValue.projectId,
                    id: itemValue.docPaperId,
                    type: "paper",
                    docType: itemValue.docType
                }
                let url = (type == 0) ? '/doc/project/position' : '/doc/paper/location'
                if (type == 1) {
                    data.data = dataFull
                }
                this.$post(url, data).then((res) => {
                    console.log(res, 6666)
                    if(res.code !== 0){
                        this.$message.error(res.msg);
                        return;
                    }
                    let data =  res.data;
                    let query = {
                        docId: data.docId,
                        projectId: data.projectId,
                        parentId: data.parentId,
                        auditProjectId: data.auditProjectId,
                        isPosition: true,
                        data: JSON.stringify(res.data)
                    }
                    // 0-当前页面是项目文档，1-底稿管理
                    if (type == 0) {
                        console.log(this.$route.path, 2365)
                        if (this.$route.path == '/projectDoc') {
                            this.$emit('update:projectIndexShow',false);
                            this.$emit('sendProjectHandle', query)
                            return
                        }
                        console.log(123, data)
                        this.$router.push({
                            path: "/projectDoc",
                            query: {
                                docId: data.docId,
                                projectId: data.projectId,
                                parentId: data.parentId,
                                auditProjectId: data.auditProjectId,
                                isPosition: true,
                                data: JSON.stringify(res.data)
                            }
                        });
                        return
                    }

                    res.data.id = itemValue.docPaperId
                    this.$emit('update:projectIndexShow',false);
                    // 当前页是底稿
                    if (this.$route.path == '/manuscriptmanage') {
                        this.$router.push({
                            path: '/manuscriptmanage',
                            query: {
                                docId: data.fileId,
                                projectId: data.projectId,
                                isPosition: true,
                                data: JSON.stringify(res.data),
                                isPcPosition: true,
                                onlyId: new Date().getTime()
                            }
                        })
                        this.clickEvent()
                        return
                    }
                    this.$router.push({
                        path: '/manuscriptmanage',
                        query: {
                            locationData: JSON.stringify(res.data),
                        }
                    })


                }).catch(function (error) {

                });

            },
            optUser () {
                this.findFlag = true
                this.findState = {state:0};
                this.checkState = {state:2};
                this.findUserObj = this.$utils.cloneDeepArray(this.deployObj)
                if (!this.createName) {
                    this.findUserObj = []
                }
            },
            findAllUser (data) {
                 if(data.length == 0){
                    this.findFlag = false;
                    this.findState = {};
                    this.checkState = {};
                    this.createName = ''
                    this.queryObj.createBySet = []
                    return
                }
                this.deployObj = data;
                var string = "", userIds = [];
                for(var i = 0; i<this.deployObj.length; i++){
                    var objname = {};
                    objname.name = this.deployObj[i].name;
                    string = string + data[i].name + "、";
                    userIds.push(data[i].userId)
                }
                this.createName  = string;
                this.queryObj.createBySet  = userIds;
                console.log(userIds, 'userIds', string)
                this.findFlag = false;
                this.findState = {};
                this.checkState = {};
                this.findUserObj = data
            },
            //分页
            onPageChange (currentPage) {
                this.currentPage = currentPage
                this.query()
            },
            handleSizeChange (val) {
                this.pageSize = val;
                this.query()
            }
        },
        watch: {
            projectIndexShow (val) {
                if (val) {
                    console.log(this.projectIndexData, 32656)
                    this.query()
                }
            }
        }
    }
</script>

<style scoped>
    .clearfix {
        display: flex;
        flex-wrap: wrap;
    }
    .q-246{
        width: 250px;
    }
    .q-170{
        width: 170px;
    }
    .el-button {
      float: left;
      margin-left: 20px;
      width: 90px;
      height: 40px;
      line-height: 1;
    }
    .pagination {
        background-color: #fff;
        position: absolute;
        bottom: 20px;
        right: 10px;
        width: 99%;
        text-align: right;
        border-top: 1px solid #dedede;
        padding-top: 20px;
    }
    p{
     cursor: pointer;
     overflow: hidden;
     text-overflow: ellipsis;
     white-space: nowrap;
    }
    .project-table {
        position: absolute;
        left: 2%;
        width: 96%;
        /* height: 70%; */
    }
    .docName-local{
        display: flex;
    justify-content: flex-start;
    }
    /* .docName-local p{
        display: inline-block;
    } */
    .docName-local p:nth-child(1) {
        margin-right: 10px;
    }
    .docName-local p:nth-child(2) {
        width: 60%;
        overflow: hidden;
     text-overflow: ellipsis;
     white-space: nowrap;
    }
    .localcolor{
        color: blue;
    }
    .el-table::before {
        height:0 !important;
    }
   .sltitle {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
   }
</style>
<style>
  /* 索引列表页的弹框 */
  #project-index-lists .lists .el-dialog {
    margin-top: 60px!important;
    width: 96%;
    height: calc(96% - 68px);
  }

  #project-index-lists .el-dialog__header, #project-chat-record .el-dialog__header{
    border-bottom: 1px solid #dedede;
    border-radius:4px 4px 0px 0px;
  }
  #project-index-lists .el-table__header-wrapper .el-table__header .has-gutter tr th{
    background-color: #FAFAFA;
    color: #2c2c2c;
    font-weight: 500;
  }
  #project-index-lists .el-table td, .el-table th.is-leaf{
    border: none !important;
  }
</style>
