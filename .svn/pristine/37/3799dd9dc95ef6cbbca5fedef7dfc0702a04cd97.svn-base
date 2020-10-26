<template>
    <div class="project-doc-temp">
        <div class="project-temp-name-list clearfix">
            <el-button icon="el-icon-back" circle @click="back" class="back_btn"></el-button>
            <div class="total-temp">
                <p>项目模板</p>
                <span>（{{proTempTotal}}）</span>
            </div>
            <el-input v-model="search.searchName" placeholder="请输入关键词" class="input-with-select t-input-with-select" clearable>
                <el-button slot="append" icon="el-icon-search" @click="proTempSearch"></el-button>
            </el-input>
            <el-button v-if="$utils.checkProjectPermission('upload-btn')" type="primary" class="upload-btn" @click="upload" id="project_file_model">我要上传</el-button>
            <el-input type="file" id="fileBtn" style="display:none;"></el-input>
        </div>
        <div :class="[{'project-temp-catalog-all': catalogListIsAll}, 'project-temp-catalog', 'clearfix']" :style="{height: manuTempNameHeight}">
            <p class="project-temp-catalog-tit">项目模板:</p>
            <p v-if="$utils.checkSystemPermission('add-project-temp')" class="add-project-temp fl" id="project_add_model">
                <i @click="addTemp"></i>
            </p>
            <div class="project-temp-catalog-list">
                <el-tag v-for="(tag, index) in tempCatalogList" :key="index" :class="[{active:projectTempShow == index},'name']" closable type="info" @close="confirmDeleteCatalog(index)" @click="catalogListBtn(tag,index)" :title="tag.docName">
                    {{tag.docName}}
                </el-tag>
            </div>
            <div class="project-temp-more" @click="projectTempCatalogAll">
                <a href="javascript:void(0);" class="clearfix">
                    <em class="fl">更多</em>
                    <span class="arrow fl" id="cusmore"></span>
                </a>
            </div>

        </div>
        <div class="project-temp-current-path clearfix">
            <p class="current-path">
                当前引用路径:
            </p>
            <p class="current-project-name fl">
                <i class="fl"></i>
                <span class="fl">{{projectData.projectName}}</span>
            </p>
            <div class="temp-path-list fl">
                <p v-for="(item, index) in pathNameList" :key="index" class="fl">
                    <i class="title_nav_chunk_icon"></i>
                    {{item}}
                </p>
            </div>
        </div>

        <div class="project-temp-con-list">
            <el-table ref="multipleTable" :data="proDocTempList" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
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
                        <div class="pro_operation">
                            <!-- v-if="scope.row.attention != null" -->
                            <a href="javascript:;" v-if="scope.row.attention != null" title="注意事项" @click="showAttention(scope.row)" class="pro_operation_attention"></a>
                            <div class="pro_operation_refe" v-if="$utils.checkProjectPermission('project_project_model')" title="引用"  @click="quoteTemp(scope)"></div>
                            <div class="pro_operation_preview" title="预览" @click="proTempView(scope)"></div>
                            <div class="pro_operation_warning" v-if="$utils.checkProjectPermission('project_del_model')" title="删除" @click="deleteProTemp(scope.row)"></div>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="project-temp-opera clearfix">
            <div class="quote-temp" @click="quoteTemp('lot')">
                <el-button class="quote-temp-btn">批量引用</el-button>
            </div>
            <div class="pagination-box">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="search.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="search.dataCount" :page-count="search.pageCount">
                </el-pagination>
            </div>
        </div>
        <div class="creat-temp-class">
            <el-dialog title="创建模板分类" :close-on-click-modal="false" :visible.sync="creatTempClassIsShow" width="35%" class="choseAuditor">
                <div class="clearfix">
                    创建模板分类：
                    <el-input v-model="newTempName" placeholder="请输入内容" style="width:70%;"></el-input>
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
                width="35%" class="choseAuditor">
                <div class="clearfix">
                    <el-form ref="form">
                        <el-form-item label="选择模板：">
                            <el-select v-model="seleCatalog.catalog" placeholder="请选择模板" style="width:70%">
                                <el-option v-for="(list, index) in tempCatalogList" :label="list.docName" :value="list.id" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button  @click="seleCatalogIsShow = false">取 消</el-button>
                    <el-button type="primary" @click="selectedCatalog">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <upload-add-doc v-if="addDoc" ref ="uploadTemp" :uploadDocAddIsShow="uploadDocAddIsShow"
            :uploadParamData="uploadParamData" @sendValueToParent="uploadAddDocClose"
            @docUpload="docUpload" @docUploadAllsucess="docUploadAllsucess">
         </upload-add-doc>
    </div>
</template>
<script>
export default {
    name: "projectDocTemp",
    components: {
        uploadAddDoc:uploadAddDoc => {require(['@/components/file/uploadAddDoc.vue'], uploadAddDoc)}
    },
    props:[

    ],
    data() {
        return {
            token: "",
            userId: "",
            projectData: '',
            success_code: "",
            project_project_model:false,//引用模板权限
            pro_operation_warning:false,//删除模板权限
            projectTempShow:0,
            search: {
                pageSize: 10,
                pageNo: 0,
                dataCount: 0,//数据条数
                pageCount: 1,//总页数
                searchName: ''
            },
            currentPage: 1,
            proTempTotal: 0,
            tempCatalogList: [], //模板目录列表
            manuTempNameHeight: '64px', //底稿模版目录的高
            catalogListIsAll: false,//模板目录列表是否全部展示
            proDocTempList: [],  //模板列表
            selectedProDocTempList: [],//选中的项目模板
            allChecked: true,   //全选
            activeNames: ['1'],
            creatTempClassIsShow: false,
            seleCatalogIsShow:false,
            //以下为新建模板
            newTempName: '',
            seleCatalog: {
                catalog: ''
            },
            catalogId:'',//目录数据
            addDoc: false,//上传弹层
            uploadDocAddIsShow:false,
            uploadParamData: {
                docSource: 0,//固定为0
                projId: '',
                parentId: '',
                auditProjectId: null
            },
            tempCatalogList:[],
            docParentId: '',
            pathNameList:[]
        }
    },
    created() {

    },
    mounted() {
        this.token = this.$store.state.loginObject.userToken;
        this.userId = this.$store.state.loginObject.userId;
        this.success_code = this.code.codeNum.SUCCESS;
        this.projectData = JSON.parse(this.$route.query.projectData);
        // if(rightProPermissionFn(this.projectData.projectId,'project_project_model')){
        //     this.project_project_model = true;
        // } else {
        //     this.project_project_model = false;
        // }
        // if(rightProPermissionFn(this.projectData.projectId,'project_del_model')){
        //     this.pro_operation_warning = true;
        // } else {
        //     this.pro_operation_warning = false;
        // }
        // this.uploadParamData.projId = this.$route.query.projectData.projectId;
        this.uploadParamData.projId = this.projectData.projectId;
        // this.pathNameList = this.$route.query.projectData.pathNameList,
        this.pathNameList = this.projectData.pathNameList,
        this.docParentId = this.$route.query.parentId;
        this.uploadParamData.projId = this.$route.query.projectData.projectId;
        this.uploadParamData.auditProjectId = this.$route.query.projectData.processId;
        this.getProTempCatalog(this.getProTempListByCatalog);
    },
    watch: {
        currentPage(newV, oldV) {
            this.search.pageNo = newV - 1;
        }
    },
    methods: {
        //返回按钮
        back() {
            this.$router.push("/projectDoc")
        },
        // 删除模板
        deleteProTemp(row){
            let vm = this;
            let data = {
                "data": {
                    "id": row.id
                },
                "pageNo": 0,
                "pageSize": 10,
                "token": this.token,
                "userId": this.userId
            }
            this.$post('/doc/project/deleteProjTemplate', data).then((response)=> {
                if(vm.success_code == response.code) {
                    vm.getProTempListByCatalog();
                    vm.$message({
                        type: "success",
                        message: response.msg
                    });
                } else {
                    vm.$message.error(response.msg);
                }
            }).catch(function(error) {

            });
        },
        //预览
        proTempView(itemValue) {
            var proViewData = {
              projectId: this.projectData.projectId,
                rfsId: itemValue.row.docVersionRfs,
                docId: itemValue.row.docId,
                photoType: itemValue.row.infoDocType
            }
            this.$store.commit('previewAllFn',proViewData)
            // this.$router.push({
            //     path: '/preview',
            //     query: {
            //         rfsId: itemValue.docVersionRfs
            //     }
            // })
        },
        //上传模板
        docUpload(uploadData){
            let vm = this;
            this.seleCatalogIsShow = false;
            let data = {
                "data": {
                    "proId": this.projectData.projectId,
                    "parentId": this.seleCatalog.catalog,//上传时目录id
                    "docId": uploadData.docId,
                    "sourceType": 0
                },
                "pageNo": 0,
                "pageSize": 10,
                "token": this.token,
                "userId": this.userId
            }
            this.$post('/doc/project/addProjTemplate', data).then((response)=> {
                if(vm.success_code == response.code) {
                    vm.$refs.uploadTemp.uploadComplete();
                } else {
                    vm.$message.error(response.msg);
                }
            }).catch(function(error) {

            });
        },
        docUploadAllsucess(){
            this.getProTempListByCatalog();
            this.$message({
                type: "success",
                message: '上传成功'
            });
            this.uploadAddDocClose();
        },
        uploadAddDocClose() {
            this.uploadDocAddIsShow = false;
            this.addDoc = false;
        },
        upload(){
            this.seleCatalogIsShow = true;
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
        //新建模板目录
        creatTempCatalog() {
            let that = this;
            this.creatTempCatalogIsShow = false;
            let data = {
                "data":{
                    "proId":this.projectData.projectId,
                    "docName": this.newTempName,
                    "sourceType":0//项目文档为0
                },
                "pageNo":0,
                "pageSize":10,
                "token":this.token,
                "userId":this.userId
            }
            this.$post('/doc/project/addProjTemplateCatalog', data).then((response)=> {
                if(that.success_code == response.code) {
                    that.getProTempCatalog();
                    that.$message({
                        type: "success",
                        message: response.msg
                    });
                    that.creatTempClassIsShow = false;
                } else {
                    that.$message({
                        type: "warning",
                        message: response.msg
                    });
                }

            }).catch(function(error) {

            });
        },
        //增加项目模板名称
        addTemp(){
            this.creatTempClassIsShow = true;
        },
        //获取模板目录列表
        getProTempCatalog(callBack) {
            let that = this;
            let data = {
                "data":{
                    "sourceType":"0",//项目文档0
                    "proId":this.projectData.projectId
                },
                "pageNo":0,
                "pageSize":10,
                "token":this.token,
                "userId":this.userId
            }
            this.$post('/doc/project/getProjectTemplateCatalogList', data).then((response)=> {
                if(that.success_code == response.code) {
                    that.tempCatalogList = response.data;
                    that.projectTempShow = 0;
                    that.catalogId = that.tempCatalogList[0].id;
                    callBack && callBack();
                } else if(response.code == '-504'){
                    that.tempCatalogList = response.data;
                    callBack && callBack();
                }
            }).catch(function(error) {

            });
        },
        catalogListBtn(tag,index){
            this.catalogId = tag.id;
            this.projectTempShow = index;
            // var el = event.currentTarget;
            // $('.project-temp-catalog-list .name').removeClass('active');
            // $(event.currentTarget).addClass('active');
            this.getProTempListByCatalog();
        },
        //模板模糊查询
        searchTempList() {
            let that = this;
            let data = {
                "data": {
                    "sourceType": "0",//项目文档固定为0
                    "fileName": this.search.searchName,
                    "proId": this.projectData.projectId //项目ID
                },
                "pageNo": 0,
                "pageSize": 10,
                "token": this.token,
                "userId": this.userId
            }
            this.$post('/doc/project/getProjectTemplateListByDocName', data).then((response)=> {
                if(that.success_code == response.code) {
                    that.proTempTotal =  response.data.list.length;
                    that.proDocTempList = response.data.list;
                    for(var i=0;i<that.proDocTempList.length;i++){
                        that.proDocTempList[i].docSize = that.handleFileSize(that.proDocTempList[i].docSize);
                    }
                }
            }).catch(function(error) {

            });
        },
        //根据目录ID获取模板列表
        getProTempListByCatalog() {
            let that = this;
            let data = {
                "data": {
                    "sourceType":"0",//项目文档0
                    "parentId": this.catalogId,//目录id
                    "proId": this.projectData.projectId //项目ID
                },
                "pageNo": this.search.pageNo,
                "pageSize": this.search.pageSize,
                "token": this.token,
                "userId": this.userId
            }
            this.$post('/doc/project/getProjectTemplateListByCatalogId', data).then((response)=> {
                if(that.success_code == response.code) {
                    that.proTempTotal =  response.data.total;
                    that.proDocTempList = response.data.list;
                    that.search.dataCount = response.data.total;
                    that.search.pageCount = response.data.pages;
                    for(var i=0;i<that.proDocTempList.length;i++){
                        that.proDocTempList[i].docSize = that.handleFileSize(that.proDocTempList[i].docSize);
                    }
                }
            }).catch(function(error) {

            });
        },
        //跳转到搜索结果页
        proTempSearch() {
            this.$router.push({path:'/projectDocTempSearch',
                query:{projectData: JSON.stringify(this.projectData),searchName: this.search.searchName,proTempTotal:this.proTempTotal,docParentId:this.docParentId}})
        },
        handleSelectionChange(val){
            this.selectedProDocTempList = val;
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
        deleteTempCatalog(index){
                let that = this;
                this.token = this.$store.state.loginObject.userToken;
                this.userId = this.$store.state.loginObject.userId;
                let id = this.tempCatalogList[index].id;
                let data = {
                    "data":{
                        "sourceType":"0",
                        "id":id
                    },
                    "pageNo":0,
                    "pageSize":10,
                    "token":this.token,
                    "userId":this.userId
                }
                this.$post('/doc/project/deleteProjTemplateCatalog', data).then((response)=> {
                    if(that.success_code == response.code) {
                        that.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                        that.search.pageNo = 1;
                        that.search.pageSize = 10;
                        that.getProTempCatalog(that.getProTempListByCatalog);
                    }
                }).catch(function(error) {

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
        // 获取表格选中数据的id
        handleSelectData(){
            var arr = [];
            for(var i=0;i<this.selectedProDocTempList.length;i++){
                arr.push(this.selectedProDocTempList[i].id)
            }
            return arr;
        },
        quoteTempBtn(){

        },
        quoteTemp(obj){
            if(obj == 'lot'){
                if(this.selectedProDocTempList.length == 0 && obj == 'lot'){
                    this.$message({
                        message: '请选择一条数据',
                        type: "warning"
                    });
                    return;
                } else {
                    var idsList = this.handleSelectData().join(',');
                }
            } else {
                var idsList = obj.row.id;
            }
            let that = this;
            let data = {
                "data": {
                    "ids": idsList,
                    "parentId": this.docParentId,
                    "proId": this.projectData.projectId,
                    "auditProjectId": this.projectData.processId
                },
                "pageNo": 0,
                "pageSize": 10,
                "token": this.token,
                "userId": this.userId
            }
            this.$post('/doc/project/batchRefProjTemplateDataToProject', data).then((response)=> {
                if(that.success_code == response.code) {
                    that.$message({
                        type: "success",
                        message: "引用成功!"
                    });
                } else {
                    that.$message({
                        type: "error",
                        message: "引用失败!"
                    });
                }

            }).catch(function(error) {

            });
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
        },
        //改变每页数量
        handleSizeChange(val) {
            this.search.pageSize = val;
            this.getProTempListByCatalog();
        },
        //改变当前页
        handleCurrentChange(val) {
            this.search.pageNo = val;
            this.getProTempListByCatalog();
        },
        projectTempCatalogAll() {
            this.manuTempNameHeight = this.manuTempNameHeight === '64px' ? '' : '64px';
            this.catalogListIsAll = !this.catalogListIsAll;
        },
        creatTempClose(){
            this.creatTempClassIsShow = false;
        }
    }
}
</script>
<style lang="scss" scoped>
.project-doc-temp{
    width: 100%;
    // height: 855px;
    padding-bottom:6px;
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
        // width: 98%;
        padding-right:90px;
        box-sizing:border-box;
        margin: 20px 1% 0 1%;
        margin: 20px 10px 0 10px;
        height: 62px;
        overflow: hidden;
        border:1px solid rgba(221, 221, 221, 1);
        border-top-left-radius: 4px;
        background: #fff;
        .project-temp-catalog-tit {
            flex:0 0 auto;
            // float: left;
            position: relative;
            width: 130px;
            // height: 100%;
            text-align: center;
            line-height: 62px;
            background: #f5f5f5;
        }
        .project-temp-catalog-list {
            // float: left;
            flex:1;
            width:0;
            overflow:hidden;
            box-sizing: border-box;
            // padding-right:90px;
            // padding-left: 30px;
            span {
                float: left;
                position: relative;
                max-width:100%;
                overflow:hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                // margin-top:10px;
                // margin-right: 10px;
                margin:16px 10px 16px 0px;
                padding-right: 18px;
                cursor: pointer;
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
        .tempDocName {
            width: 80%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow:ellipsis;
        }
        .pro_operation{
            display: flex;
            .pro_operation_attention{
                width: 30px;
                height: 30px;
                margin-right:10px;
                background: url('../../../../assets/manuscript_icon/warning_icon.png') no-repeat;
                background-size: 30px 30px;
                cursor: pointer;
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
                background: url("../../../../assets/project_doc/tempDelete.png") no-repeat 0 0;
                background-size: 30px 30px;
                margin-left: 10px;
                cursor: pointer;
            }
            .pro_operation_attention:hover{
                width: 30px;
                height: 30px;
                background: url('../../../../assets/manuscript_icon/warning_hover_icon.png') no-repeat;
                background-size: 30px 30px;
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
                background: url("../../../../assets/project_doc/tempDeleteActive.png") no-repeat 0 0;
                background-size: 30px 30px;
                cursor: pointer;
            }
        }
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
        width: 50px;
        margin: 20px 0 0 10px;
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
    .back_btn{
        margin-left: 10px;
        border: none;
    }
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


    .el-dialog__header{
      border-bottom:1px solid #dedede;
    }
    .el-dialog__body{
        text-align:left;
    }
    .project-temp-catalog-list .el-tag .el-icon-close{
        position: absolute;
        top: 0;
        right: 0;
    }
 }

</style>
