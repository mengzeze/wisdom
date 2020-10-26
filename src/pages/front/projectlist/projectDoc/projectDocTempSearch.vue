<template>
    <div class="project-doc-temp">
        <!-- <p style="margin-left: 10px;margin-top:10px;text-align:left"><el-button @click="backBtn">返回</el-button></p>   -->
        <div class="project-temp-name-list clearfix">
            <el-button icon="el-icon-back" circle @click="back" class="back_btn"></el-button>
            <div class="total-temp">
                <p>项目模板</p>
                <span>（{{search.proTempTotal}}）</span>
            </div>
            <el-input v-model="search.searchName" placeholder="请输入关键词" class="input-with-select t-input-with-select" clearable>
                <el-button slot="append" icon="el-icon-search" @click="proTempSearch"></el-button>
            </el-input>
            <!-- <el-button type="primary" class="upload-btn">我要上传</el-button> -->
        </div>
        <div class="project-temp-current-path clearfix">
            <p class="current-path">
                当前引用路径:
            </p>
            <p class="current-project-name fl">
                <i class="fl"></i>
                {{projectData.projectName}}
            </p>
            <div class="temp-path-list fl">
                <p v-for="(item, index) in pathNameList" :key="index" class="fl">
                    <i class="title_nav_chunk_icon"></i>
                    {{item}}
                </p>
            </div>
        </div>

        <div class="project-temp-con-list">
            <el-table ref="multipleTable" :data="proDocTempList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column label="模板名称" width="500">
                    <template slot-scope="scope">
                        <p :title="scope.row.fileName" class="tempDocName">{{scope.row.fileName}}</p>
                    </template>
                    <!-- <template slot-scope="scope">
                        <input class="edit-cell" v-model="scope.row.docName" v-if="showReName[scope.row.index]">
                        <span v-if="!showReName[scope.row.index]">{{scope.row.docName}}</span>
                    </template> -->
                </el-table-column>
                <el-table-column prop="docSize" label="模板大小">
                </el-table-column>
                <el-table-column prop="refCount" label="引用次数">
                </el-table-column>
                <el-table-column prop="updateTime" label="更新时间">
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <div class="clearfix">
                            <a href="javascript:;"   @click="showAttention(scope.row)" v-if="scope.row.attention != null" title="注意事项" class="pro_operation_attention fl"></a>
                            <a href="javascript:;" class="pro_operation_refe fl" v-if="$utils.checkProjectPermission('project_project_model')"  title="引用"  @click="quoteTemp(scope.row)"></a>
                            <a href="javascript:;" class="pro_operation_preview fl" title="预览" @click="viewFn(scope.row)"></a>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="project-temp-opera clearfix">
            <div class="quote-temp" @click="lotQuoteTemp">
                <!-- <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button> -->
                <!-- <el-checkbox v-model="allChecked">全选</el-checkbox> -->
                <el-button>批量引用</el-button>
            </div>
            <div class="pagination-box">
                <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="search.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="search.dataCount" :page-count="search.pageCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "projectDocTempSearch",
    components: {},
    props:[

    ],
    data() {
        return {
            token: "",
            userId: "",
            projectData: '',
            success_code: "",
            project_project_model:false,//引用模板权限
            proDocTempList:[],
            search: {
                pageSize: 10,
                pageNo: 0,
                dataCount: 0,//数据条数
                pageCount: 1,//总页数
                searchName: '',
                proTempTotal:''//模板数量
            },
            currentPage: 1,
            allChecked: true,   //全选
            selectedDoc: [], //选中的文件
            pathNameList:[] //当前路径
        }
    },
    created() {
        this.token = this.$store.state.loginObject.userToken;
        this.userId = this.$store.state.loginObject.userId;
        this.projectData = JSON.parse(this.$route.query.projectData);
        // if(rightProPermissionFn(this.projectData.projectId,'project_project_model')){
        //     this.project_project_model = true;
        // } else {
        //     this.project_project_model = false;
        // }
        this.pathNameList = this.projectData.pathNameList,
        this.search.searchName = this.$route.query.searchName;
        this.search.proTempTotal = this.$route.query.proTempTotal;
        //this.getProTempListByCatalog();
        this.proTempSearch();
    },
    mounted() {

    },
    watch: {
        currentPage(newV, oldV) {
            this.search.pageNo = newV - 1;
        }
    },
    methods: {
        back(){
            // this.$router.push({path:'/projectDocTemp'});
            this.$router.push({
                path: "/projectDocTemp",
                query: {
                    projectData: JSON.stringify(this.projectData),
                    parentId: this.projectData.docParentId
                }
            });
        },
        //预览
        viewFn(itemValue) {
            var proViewData = {
              projectId: this.projectData.projectId,
                rfsId: itemValue.docVersionRfs,
                docId: itemValue.docId,
                photoType: itemValue.infoDocType
            }
            this.$store.commit('previewAllFn',proViewData)
            // this.$router.push({
            //     path: '/preview',
            //     query: {
            //         rfsId: itemValue.docVersionRfs
            //     }
            // })
        },
        //根据模板名称模糊查询项目模板数据
        proTempSearch() {
            let that = this;
            this.token = this.$store.state.loginObject.userToken;
            this.userId = this.$store.state.loginObject.userId;
            let data = {
                "data":{
                    "sourceType":"0",//项目文档为0
                    "fileName":this.search.searchName,
                    "proId":this.projectData.projectId
                    // "proId":1
                },
                "pageNo":this.search.pageNo,
                "pageSize":this.search.pageSize,
                "token":this.token,
                "userId":this.userId
            }
            this.$post('/doc/paper/getProjectTemplateListByDocName', data).then((response)=> {
                if(that.code.codeNum.SUCCESS == 0) {
                    let data = response.data;
                    that.search.proTempTotal = response.data.total;
                    that.search.dataCount = response.data.total;
                    that.search.pageCount = response.data.pages;
                    that.proDocTempList = data.list;
                    for(var i=0;i<that.proDocTempList.length;i++){
                        that.proDocTempList[i].docSize = that.handleFileSize(that.proDocTempList[i].docSize);
                    }
                }
            }).catch(function(error) {

            });
        },
        confirmDeleteCatalog(index) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteTempCatalog(index);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        showAttention(data) {
            let text = data.attention;
            if(text != null) {
                this.$alert(text, '注意事项', {
                    confirmButtonText: '确定',
                });
            }
        },
        //选中文件
        handleSelectionChange(val){
            this.selectedDoc = val;
        },
        // 获取表格选中数据的id
        handleSelectData(){
            var arr = [];
            for(var i=0;i<this.selectedDoc.length;i++){
                arr.push(this.selectedDoc[i].id)
            }
            return arr;
        },
        //批量引用
        lotQuoteTemp(){
            if(this.selectedDoc.length == 0){
                this.$message({
                    message: "请选择至少一条数据",
                    type: "warning"
                });
                return;
            } else {
                let that = this;
                let data = {
                    "data": {
                        "ids": this.handleSelectData().join(','),
                        "parentId": this.projectData.docParentId,
                        "proId": this.projectData.projectId
                    },
                    "pageNo": this.search.pageNo,
                    "pageSize": this.search.pageSize,
                    "token": this.token,
                    "userId": this.userId
                }
                this.$post('/doc/project/batchRefProjTemplateDataToProject', data).then((response)=> {
                    if (response.code == 0) {
                    that.$message({
                            message: response.msg,
                            type: "success"
                        });
                    } else {
                        that.$message({
                            message: response.msg,
                            type: "error"
                        });
                    }
                }).catch(function(error) {

                });
            }
        },
        //单独引用模板
        quoteTemp(row){
            let that = this;
            let data = {
                "data": {
                    "ids": row.id,
                    "parentId": this.projectData.docParentId,
                    "proId": this.projectData.projectId
                },
                "pageNo": this.search.pageNo,
                "pageSize": this.search.pageSize,
                "token": this.token,
                "userId": this.userId
            }
            this.$post('/doc/project/batchRefProjTemplateDataToProject', data).then((response)=> {
                if (response.code == 0) {
                   that.$message({
                        message: "引用成功!",
                        type: "success"
                    });
                } else {
                    that.$message({
                        message: "引用失败!",
                        type: "error"
                    });
                }
            }).catch(function(error) {

            });
        },
        //改变每页数量
        handleSizeChange(val) {
            this.search.pageSize = val;
            this.proTempSearch();
        },
        //改变当前页
        handleCurrentChange(val) {
            this.search.pageNo = val;
            this.proTempSearch();
        },
        //  处理文件大小
        handleFileSize(limit) {
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
</script>
<style lang="scss" scoped>
.project-doc-temp{
    width: 100%;
    height: 855px;
    background: #ffffff;
    .project-temp-name-list {
        display: flex;
        padding-top: 20px;
        background: #fff;
        .total-temp {
            display: flex;
            height: 42px;
            padding:0 14px;
            line-height: 42px;
            font-size: 16px;
            p{
                font-size: 16px;
            }
            span{
                font-size: 14px;
                color:rgba(210,44,44,1);
            }
        }
        .input-with-select {
            width:784px;
            height:24px;
            background:rgba(255,255,255,1);
            border-radius:2px;
        }
        .upload-btn {
            margin-left: 20px;
            width:107px;
            height:40px;
            background:rgba(238,245,254,1);
            border:1px solid rgba(187, 215, 251, 1);
            border-radius:2px;
            color:#fff;
        }
    }
    .project-temp-catalog.project-temp-catalog-all {
        height: auto;
    }
    .project-temp-catalog {
        display: flex;
        position: relative;
        text-align: center;
        line-height: 62px;
        width: 98%;
        margin: 20px 1% 0 1%;
        height: 62px;
        overflow: hidden;
        border:1px solid rgba(221, 221, 221, 1);
        border-top-left-radius: 4px;
        background: #fff;
        .project-temp-catalog-tit {
            // float: left;
            position: relative;
            width: 130px;
            // height: 100%;
            text-align: center;
            line-height: 62px;
            background: #f5f5f5;
        }
        .project-temp-catalog-list {
            float: left;
            width: 700px;
            // margin-top: 16px;
            margin-left: 30px;
            span {
                float: left;
                // margin-top:10px;
                // margin-right: 10px;
                margin:20px 10px 14px 0px;
            }
            p {
                float: left;
                width:89px;

                font-size:14px;

                font-weight:400;
                color:rgba(39,90,166,1);

            }
        }
        .project-temp-more {
            position:absolute;
            right: 10px;
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
    .project-temp-current-path {
        height:32px;
        background: #F5F5F5;
        border-radius:2px;
        // margin-top: 20px;
        margin: 20px 10px 0 10px;
        .current-path {
            float: left;
            height: 32px;
            line-height: 32px;
            padding-left: 20px;
            margin-right: 6px;
        }
        .current-project-name{
            height: 32px;
            line-height: 32px;
            margin-right: 6px;
            i{
                width:13px;
                height:11px;
                margin-top:10px;
                margin-right:6px;
                background: url('../../../../assets/project_doc/tempPathIcon.png') no-repeat 0 0;
            }
        }
        .temp-path-list {
            margin-top: 8px;

        }
        .project-temp-more-btn {

        }
    }
    .project-temp-con-list {
        margin-top: 20px;
        // .pro_operation{
            // display: flex;
            .tempDocName {
                width: 80%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow:ellipsis;
            }
            .pro_operation_refe{
                width: 30px;
                height: 30px;
                background: url('../../../../assets/manuscript_icon/refe_icon.png') no-repeat;
                background-size: 30px 30px;
                cursor: pointer;
            }
            .pro_operation_preview{
                width: 30px;
                height: 30px;
                background: url('../../../../assets/manuscript_icon/preview_icon.png') no-repeat;
                background-size: 30px 30px;
                margin-left: 10px;
                cursor: pointer;
            }
            .pro_operation_warning{
                width: 30px;
                height: 30px;
                background: url('../../../../assets/manuscript_icon/warning_icon.png') no-repeat;
                background-size: 30px 30px;
                margin-left: 10px;
                cursor: pointer;
            }
            .pro_operation_refe:hover{
                width: 30px;
                height: 30px;
                background: url('../../../../assets/manuscript_icon/refe_hover_icon.png') no-repeat;
                background-size: 30px 30px;
                cursor: pointer;
            }
            .pro_operation_preview:hover{
                width: 30px;
                height: 30px;
                background: url('../../../../assets/manuscript_icon/preview_hover_icon.png') no-repeat;
                background-size: 30px 30px;
                margin-left: 10px;
                cursor: pointer;
            }
            .pro_operation_warning:hover{
                width: 30px;
                height: 30px;
                background: url('../../../../assets/manuscript_icon/warning_hover_icon.png') no-repeat;
                background-size: 30px 30px;
                cursor: pointer;
            }
        // }
    }
    .project-temp-opera {
        margin-top: 10px;
        margin-left: 20px;
        .quote-temp-btn{
            // background: #1A5FA4;
            // color: #ffffff;
        }
    }
    .quote-temp {
        float: left;
    }
    .pagination-box {
        // float: left;
        margin:  10px auto 0 98px;
        padding-top:2px;
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
    .add-project-temp {
        width: 100px;
        margin: 20px 10px 0 10px;
        i{
            display: block;
            width: 24px;
            height: 24px;
            cursor: pointer;
            background: url('../../../../assets/project_doc/addIcon.png') no-repeat 0 0;
        }
    }
    .project-temp-catalog-list .active{
        color:#1A5FA4;
    }
    // 以下为分页
    .el-pagination{
        // margin-top:20px;
        // margin-right:16px;
        margin:20px 16px 16px 0;
        text-align: right;
    }
        .title_nav_chunk_icon{
        width: 9px;
        height: 11px;
        background: url('../../../../assets/manuscript_icon/next_icon.png') no-repeat;
        background-size: 9px 11px;
        margin-right: 5px;
        display: inline-block;
    }
    .pro_operation_attention{
        width: 30px;
        height: 30px;
        margin-right:10px;
        background: url('../../../../assets/manuscript_icon/warning_icon.png') no-repeat;
        background-size: 30px 30px;
        cursor: pointer;
    }
    .pro_operation_attention:hover{
        background: url('../../../../assets/manuscript_icon/warning_hover_icon.png') no-repeat;
    }
    .pro_operation_refe{
        width: 30px;
        height: 30px;
        background: url('../../../../assets/manuscript_icon/refe_icon.png') no-repeat;
        background-size: 30px 30px;
        cursor: pointer;
    }
    .pro_operation_refe:hover{
        background: url('../../../../assets/manuscript_icon/refe_hover_icon.png') no-repeat;
    }
    .pro_operation_preview{
        width: 30px;
        height: 30px;
        background: url('../../../../assets/manuscript_icon/preview_icon.png') no-repeat;
        background-size: 30px 30px;
        margin-left: 10px;
        cursor: pointer;
    }
    .back_btn{
        margin-left: 10px;
        border: none;
    }
    // .pro_operation_preview:hover{
    //     background: url('../../../../assets/manuscript_icon/preview_hover_icon.png') no-repeat;
    // }
}
</style>
<style lang="scss">
 .project-temp-con-list td{
   border:none;
 }
 .project-doc-temp{
     .el-table__header-wrapper .cell{
        color:rgba(51,51,51,1);
    }


 }
</style>
