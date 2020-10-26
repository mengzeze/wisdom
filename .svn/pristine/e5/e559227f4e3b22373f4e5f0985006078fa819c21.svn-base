<template>
    <div class="project-catalog-exam">
      <el-dialog  title="目录审批" :visible.sync="isShow" :close-on-click-modal="false" width="930px" @close="clickEvent">
            <div class="clearfix">
               <span class="catalog-tit fl">归属项目：</span>
               <p class="project-name fl">{{projectData.projectName}}</p>
            </div>
            <div class="catalog-title-list clearfix">
               <span class="catalog-tit fl">目录：</span>
               <p class="fl">底稿目录</p>
               <div class="fl">所选目录</div>
            </div>
            <div class="catalog-box clearfix">
                <div class="all-catalog-box fl">                   
                    <el-tree
                        :props="props1" ref="tree" lazy :load="loadNode1" node-key="id"
                        :expand-on-click-node="false" @check-change="selectChange" show-checkbox :filter-node-method="leftFilterNode">
                        <div class="tree-node" slot-scope="{node, data}" :title="data.docName">
                            <p class="tree-doc-name fl">{{data.docName}}</p>
                            <i :class="[{waitexam:data.auditStatus == 0},{pase:data.auditStatus == 1},{nopase:data.auditStatus == 2},{noexam:data.auditStatus == 3},'exam-state']">{{data.auditStatusText}}</i>
                        </div>
                    </el-tree>
                </div>
                <div class="select-catalog-box fl">
                    <p v-for="(item, index) in selectedCatalogList" :key="index" v-if="item.docName != '底稿目录' && item.id != '0'">{{item.docName}}</p>
                </div>
            </div>
            <div class="exam-cont">
                <div class="exam-link clearfix">
                    <span class="catalog-tit catalog-tit2 fl">审批环节:</span>
                    <div v-show="initDocExamRoleinfo.key" style="text-align: left;padding-bottom: 10px">
                        <i class="bitians">*</i>发起人所属部门：
                        <el-select size="small" v-model="value" filterable  @change="initDocExamRole(true)" placeholder="请选择部门">
                            <el-option
                            v-for="item in isMultiDeptdata.deptList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <!-- <span class="fl" style="font-weight:bold">一级审核</span> -->
                </div>
                <div v-show="isMultiDept" style="text-align: left;padding-left: 9%;padding-bottom: 2%;">
                    请填完必填项，会默认展示审批流程图。
                </div>
                <div v-show="!isMultiDept">
                    <div class="exam-person">
                        <div class="initiate_title">发起人：</div>
                        <div class="initiate_people">{{$store.state.loginObject.userName}}</div>
                    </div>
                    <div class="exam-person clearfix">
                        <span class="fl">审批人：</span>
                        <span class="mode-remarks fl">（审批方式，{{examWay}}）</span>
                    </div>
                    <ul style="margin-left:68px;" class="initiate_people clearfix">                                                         
                        <li class="fl" v-for="(item, index) in examPersonList" :key="index">
                            <span class="fl" style="margin-top: 6px;margin-right:6px;">
                                {{item}}
                            </span>
                            <span class="pro5 fl" style="margin-top: 16px;margin-right:6px;" v-if="index != (examPersonList.length -1)"></span>                               
                        </li> 
                    </ul>                
                    <div class="exam-person clearfix">
                        <span class="fl">抄送人：</span>
                        <span class="mode-remarks fl">（抄送方式，审批通过后通知）</span>
                    </div>
                    <div class="copy-person-box clearfix">
                        <ul class="fl clearfix" style="margin-top:6px;">                            
                            <li class="fl" v-for="(item, index) in copyPostPersonList" :key="index">
                                <span class="copy-person-name">
                                    {{item.copyName}}
                                    <i class="delete-copy-person" @click="deletePerFn(index)" v-if="item.isDelete"></i>
                                </span>
                            </li>     
                        </ul>
                        <!-- <div class="add-copy-person fl" @click="addPerFn">
                            <i class="fl"></i>
                            <p class="fl">添加抄送人</p>
                        </div> -->
                        <el-button type="primary" size="medium" @click="addPerFn" class="fl" >选择人员</el-button>
                    </div>
                </div>
            </div>
            <div class="proend clearfix" style="margin-top: 10px;">
                <p class="catalog-tit fl" style="margin-top:20px;">申请内容：</p>
                <textarea class="input-remarks fl" v-model="textares" placeholder="请输入申请内容，最多输入400字" cols="60" rows="10"  style="margin-top: 10px;" maxlength="400"></textarea>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="medium" @click="clickEvent">取 消</el-button>
                <el-button size="medium" type="primary"  @click="submitExam">提交审批</el-button>
            </span>
      </el-dialog>
    <findall-deptuser  :findFlagShow.sync="findFlag" v-on:findAllUser="findAllUser"
                      :findUserObj="findUserObj" :findState="findState" :checkState="checkState"></findall-deptuser>
    </div>
</template>

<script>
//选择人员
import findallDeptuser from "@/components/select_box/findAllDeptUserMultipleNew";
export default {
    name: 'catalogExam',
    components: {
        findallDeptuser
    },
    props: [
        'catalogExamIsShow',
        'projectData',
        'catalogFlowChartData'//流程相关信息   
    ],
    data () {
        return { 
            isShow:this.catalogExamIsShow,
            token:"",
            userId:'',
            value:'',
            isMultiDept:false,
            initDocExamRoleinfo:{},
            isMultiDeptdata:{},
            success_code: "",
            textares: '',//备注信息  
            selectedCatalogList: [],
            examWay:'',//审核方式
            examPersonList: [],//审核人列表
            copyPostPersonList:[],//抄送人列表
            chosePersonIsShow: false,//添加抄送人是否显示
            props1: {
                label: 'docName',
                children: 'zones',
                isLeaf: 'docType' === 1?'false':'true'
            },
            paperTreeData:[],//底稿树
            //以下为选择人员相关
            findFlag: false,
            findState: {},
            checkState: {},
          findUserObj:[]
        }
    },
    mounted(){
        this.token = this.$store.state.loginObject.userToken;
        this.userId = this.$store.state.loginObject.userId;
        this.projectId = this.$store.state.projectMsg.pro_id;
        this.success_code = this.code.codeNum.SUCCESS;   
        console.log('项目id555555555555555555555555555',this.projectId)
        console.log('项目数据',this.projectData)
        // this.queryPaperTree();
        this.initData();
    },
    watch:{
            isShow(val){
                if(!val){
                    this.value = ""
                    this.initDocExamRoleinfo.key = false
                }
            }
    },
    methods:{
        leftFilterNode(value, data) {
            if (!value) return true;
            return data.docName.indexOf(value) !== -1;
        },
        loadNode1(node, resolve) {
            // this.getTreeChild(node.data.id, resolve);
            if (node.level === 0) {
                return resolve([{ docName: '底稿目录', id: '0',disabled: true}])               
            } else {
                // 这里resolve的数据是后台给的,id用于之后点击发起请求时的参数
                this.queryPaperTree(node.data.id,resolve);                
            }
        },
        getTreeChild(id, resolve) {           
            resolve(this.paperTreeData);                 
        },
        //查询底稿文档
        queryPaperTree(id,resolve) {
            let vm = this;
            let data = {
                "token": this.token,
                "userId": this.userId,
                "pageNo": "0",
                "pageSize": "5000",
                "data": {
                    "docContent": "",
                    "parentId": id,
                    "projectId": this.projectId,
                    "docType": 1//固定为1
                }
            }            
            this.$post('/doc/paper/query', data).then((response)=> {
                if(vm.success_code == response.code) {                
                    vm.paperTreeData = response.data.content;
                    for(let i = 0;i<vm.paperTreeData.length;i++) {
                        if(vm.paperTreeData[i].auditStatus == 0){
                            vm.paperTreeData[i].disabled = true;
                        } else {
                            vm.paperTreeData[i].disabled = false;
                        }
                    }                  
                    resolve(vm.paperTreeData)                                  
                }                        
            }).catch(function(error) {
                
            });
        },
        addPerFn() {
          console.log(this.findUserObj, 2)
            this.findFlag = true;
            this.findState = { state: 0 };
            this.checkState = { state: 2 };
            this.findUserObj = this.$utils.cloneDeepArray(this.copyPostPersonList)
          if (!this.copyPostPersonList) {
              this.findUserObj = []
            }   
        },
        findAllUser(data) {
          if(!data || !data.length){
            this.findFlag = false;
            this.findState = {};
            this.checkState = {};
            this.copyPostPersonList = []
            return
          }
          this.copyPostPersonList = data
          if (this.copyPostPersonList !== "") {
            this.copyPostPersonList = Array.from(new Set(this.copyPostPersonList));
            this.findFlag = false;
            this.findState = {};
            this.checkState = {};

            var chgArr = [];
            for(var i=0;i<this.copyPostPersonList.length;i++){
              var flag = true;
              for(var j=0;j<chgArr.length;j++){
                if(this.copyPostPersonList[i].userId == chgArr[j].userId){
                  flag = false;
                };
              };
              if(flag){
                chgArr.push(this.copyPostPersonList[i]);
              };
            };
            chgArr.forEach(v => {
              if (!v.originData) {
                v.isDelete = true
              } else {
                v.isDelete = false
              }
              v.copyName = v.name;
              v.copyCode = v.userId
              v.canDelete = true;
              v.name = v.name
              v.label = v.name
              v.uniqueKey = 'user' + v.userId
            })
            this.copyPostPersonList = chgArr
            this.findUserObj = this.copyPostPersonList
          }
        //   let arr = data;
        //   let hash = {};
        //   this.copyPostPersonList = this.copyPostPersonList.concat(arr);
        //   this.copyPostPersonList = this.copyPostPersonList.reduce((item, next) => {
        //     hash[next.id] ? '' : hash[next.id] = true && item.push(next);
        //     return item
        //   }, []);

        //   this.copyPostPersonList.map((item,idx) => {
        //     if(this.copyPostPersonList.indexOf(item.name) != -1) {
        //       this.copyPostPersonList.splice(idx, 1)
        //     }
        //   })
        //   this.copyPostPersonList.forEach(v => {
        //     v.copyName = v.name;
        //     v.copyCode = v.userId
        //     v.isDelete = true;
        //     v.canDelete = true;
        //     v.name = v.name
        //     v.label = v.name
        //   })
        //   this.findUserObj = this.copyPostPersonList
            // var userData = data;
            // var arr = [];
            // var flag = 0;
            // for(var i=0;i<userData.length;i++){
            //     for(var j=0;j<this.copyPostPersonList.length;j++){
            //         if(this.copyPostPersonList[j].copyCode == userData[i].userId){
            //             flag = 1;
            //         }
            //     }
            //     if(flag == 0){
            //         var obj = {};
            //         obj.copyName = userData[i].name;
            //         obj.copyCode = userData[i].userId;
            //         obj.isDelete = true;
            //         arr.push(obj);
            //     }
            // }
            //  this.copyPostPersonList = this.copyPostPersonList.concat(arr);
            // if (this.copyPostPersonList !== "") {
            //     this.copyPostPersonList = Array.from(new Set(this.copyPostPersonList));
            // }
          // }
        },
        clickEvent(){    
            this.copyPostPersonList = [];
            this.$refs.tree.setCheckedKeys([]);  
            this.textares = '';
            this.$emit('sendValueToParent',false);
        },
        selectChange(){
            this.selectedCatalogList = this.$refs.tree.getCheckedNodes();          
        },
        deletePerFn(index) {
            this.copyPostPersonList.splice(index,1);
        },
        submitExam() {
            if(this.initDocExamRoleinfo.key){
             if(this.value == ""){
               this.$message.error('请选部门')
               return
             }
            }
            if(this.selectedCatalogList.length == 0){
                this.$message({
                    type: "warning",
                    message: '请至少选择一个目录'
                });  
            } else {
                this.copyPostPersonList = [];
                this.$refs.tree.setCheckedKeys([]);      
                // this.$emit('sendValueToParent',false);
                let vm = this;
                let copyPerId = [];
                let selectedDocId = [];
                for(var i=0;i < this.copyPostPersonList.length;i++){
                    copyPerId.push(this.copyPostPersonList[i].copyCode);
                } 
                for(var i=0;i < this.selectedCatalogList.length;i++){
                    if(this.selectedCatalogList[i].docName != '底稿目录' && this.selectedCatalogList[i].id != '0'){
                        selectedDocId.push(this.selectedCatalogList[i].id);
                    }                  
                }  
                let data = {
                  projectName: this.projectData.projectName,
                  sourceName: '发起审批',
                    "data": {
                        "modelId": this.catalogFlowChartData.modelId,//模型ID
                        "deploymentId": this.catalogFlowChartData.deploymentId,//部署ID
                        "versionId": this.catalogFlowChartData.versionId,//版本号
                        "financingTypeId": this.catalogFlowChartData.financingTypeId,//融资类型ID
                        "categoryId": this.catalogFlowChartData.categoryId,//分类ID
                        "projectName": this.projectData.projectName,
                        "projectId": this.projectId,
                        userDept:this.value,
                        "procName": this.catalogFlowChartData.catalogExamProcessName,//流程名称
                        "approvalType": "3",//审核类型1:普通审核,2:项目文件审核,3:目录审核,4:底稿文件审批
                        "remarks": this.textares,
                        "extCopy": copyPerId,//添加的抄送人用户ID
                        "attach": selectedDocId,//附件的docId集合
                        "localFile": [],//本地上传的文件docId集合
                        "formData": ""//传空
                    }
                }
                if(this.initDocExamRoleinfo.key){
                    data.data.userDept = this.value
                }
                this.$post('/info/audit/start_process_instance', data).then((response)=> {
                    this.textares = '';          
                    if(vm.success_code == response.code) {                    
                        this.$message({
                            type: "success",
                            message: '提交审批成功'
                        });  
                        
                        vm.$emit('sendValueSuccess',true);
                        vm.$emit('sendValueToParent',false);
                        return;
                    } else if(response.code ==  -5022){
                         this.$confirm(response.msg, '提示', {
                            type: 'warning',
                            confirmButtonText:'我知道了',
                            showCancelButton:false
                            }).then(() => {
                            }).catch(() => { 
                            });
                        return
                    } else {
                        this.$message.error(res.msg || '提交审批失败')

                        // this.$message({
                        //     type: "warning",
                        //     message: '提交审批失败'
                        // });  
                    }                     
                }).catch(function(error) {
                    
                });
            }
        },
        initData() {
            let that = this;
            let data = {
                "token": this.token,
                "userId": this.userId,
                "data": {
                    "modelId": this.catalogFlowChartData.modelId,//模型ID
                    "deploymentId": this.catalogFlowChartData.deploymentId,//部署ID
                    "versionId": this.catalogFlowChartData.versionId,//版本号
                    "approvalType": "3"//文档2，目录3
                }
            }
            this.$post('/info/audit/form_detail', data).then((response)=> {
                if(that.success_code == response.code) {                    
                    that.examPersonList = response.data.approvalName;
                    that.examWay = response.data.approveType;
                    for(var i=0;i < response.data.copyCode.length;i++){
                        let obj = {};
                        obj.copyName = response.data.copyName[i];
                        obj.copyCode = response.data.copyCode[i];
                      obj.originData = true;
                      obj.isDelete = false;
                      obj.name = response.data.copyName[i];
                      obj.label = response.data.copyName[i];
                      obj.userId = response.data.copyCode[i]
                      obj.uniqueKey = 'user' + response.data.copyCode[i];
                        that.copyPostPersonList.push(obj);
                    }       
                    this.initDocExamRoleinfo = {...{key: response.data.isMultiDept}}      
                    this.isMultiDept = response.data.isMultiDept   
                    this.isMultiDeptdata =  response.data;
                    
                    if(!this.isMultiDeptdata.isMultiDept){
                        // needAgainQuery为true重新查询审批人、抄送人
                        if(response.data.needAgainQuery) {
                            this.initDocExamRole(false)
                        }
                    }
                }     
                                 
            }).catch(function(error) {
                
            });
        },
           initDocExamRole(state) {
            this.copyPostPersonList = [];
            let that = this;
            let data = {
                "token": this.token,
                "userId": this.userId,
                "data": {
                     "projectId": this.projectId,
                     "modelId": this.catalogFlowChartData.modelId,//模型ID
                    "deploymentId": this.catalogFlowChartData.deploymentId,//部署ID
                    "versionId": this.catalogFlowChartData.versionId,//版本号
                    "approvalType": "3",//文档2，目录3
                    userDept:this.value,
                }
            }
            if(state){
                 data.data.userDept = this.value
                 this.initDocExamRoleinfo = {key:state}
            }
            this.$post('/info/audit/formDetailNew', data).then((response)=> {
                if(that.success_code == response.code) {                    
                    that.examPersonList = response.data.approvalName;
                    // that.examWay = response.data.approveType;
                    for(var i=0;i < response.data.copyCode.length;i++){
                        let obj = {};

                      obj.copyName = response.data.copyName[i];
                      obj.copyCode = response.data.copyCode[i];
                      obj.originData = true;
                      obj.isDelete = false;
                      obj.name = response.data.copyName[i];
                      obj.label = response.data.copyName[i];
                      obj.userId = response.data.copyCode[i]
                      obj.uniqueKey = 'user' + response.data.copyCode[i];


                    //     obj.copyName = response.data.copyName[i];
                    //     obj.copyCode = response.data.copyCode[i];
                    //   obj.originData = true;
                    //   obj.isDelete = false;
                        that.copyPostPersonList.push(obj);
                    }
                    if(that.isMultiDept){
                      that.isMultiDept = false
                    }                                        
                }    
                console.log(123, that.copyPostPersonList)                  
            }).catch(function(error) {
                
            });
        },
    },
}
</script>
<style scoped lang="scss" type="text/css">
.project-catalog-exam{
    .el-dialog__header {
        border-bottom:1px solid #ccc;
    }
    .catalog-tit {
        width: 70px;
        text-align:left;    
        font-size:14px;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .catalog-tit {
        padding-top: 5px;
    }
    .catalog-title-list {
        div{
            font-weight:bold;
            margin-left: 406px;
        }
        p{
            font-weight:bold;
        }
        margin-top: 12px;
    }
    .project-name {
        min-width:310px;
        height:26px;
        // padding-left: 10px;
        line-height:20px;
        text-align:left;       
    }
    .catalog-box {
        margin-top: 12px;
        margin-left: 70px;
    }
    .all-catalog-box {
        width:445px;
        height:362px;
        overflow-y:auto;
        overflow-x:auto;
        margin-right:6px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(221, 221, 221, 1);
        border-radius:2px;
    }
    .select-catalog-box {
        width:327px;
        height:358px;
        overflow-y:auto;
        background:rgba(255,255,255,1);
        border:1px solid rgba(221, 221, 221, 1);
        border-radius:2px;
        p{
            width: 100%;
            overflow:hidden;
            white-space: nowrap;
            text-overflow:ellipsis;
        }
    }
    .exam-link {
        margin-top:18px;
    }
    .exam-person {
        padding-left: 68px;
        // margin-top: 12px;
    }
    .initiate_title {
        font-family:Microsoft YaHei;
        text-align: left;
    }
    .initiate_people {
        font-family:Microsoft YaHei;
        text-align: left;
        padding: 10px 0 10px 18px;
        font-size: 14px;
    }
    // .exam-person:nth-child(2) {
    //     margin-top: -19px;
    // }
    .exam-person:nth-child(3) {
        margin-top: 0px;
    }
    .line{
        width:78px;
        height:1px;
        margin-top: 9px;
        margin-right:6px;
        background:rgba(26,95,164,1);
    }
    .delete-copy-person {
        position:absolute;
        right: 0;
        top: -4px;
        width: 18px;
        height: 18px;
        background: url('../../../../assets/project_doc/deletePerson.png') no-repeat 0 0;
    }
    .copy-person-name {
        position: relative;
        margin-right:2px;
        padding-right: 18px;
    }
    .catalog-exam-stage {
        position:absolute;
        right:4px;
    }
    .all-catalog-box {
        .el-tree-node__content {
            position: relative;
        }
        .catalog-exam-name {
            width: 308px;
            text-align: left;
            overflow:hidden;
            white-space: nowrap;
            text-overflow:ellipsis;
        }
    }
    .select-catalog-box{
        padding: 2px 6px;
        font-size: 14px;
        p{
            width: 308px;
            height:22px;
            line-height:22px;
            text-align:left;
            overflow:hidden;
            white-space: nowrap;
            text-overflow:ellipsis;
        }  
    }
    .add-copy-person i{
        width:24px;
        height:24px;
        margin-right:6px;
        background: url('../../../../assets/project_doc/addIcon.png') no-repeat 0 0;
    }
    .add-copy-person {   
        font-size:14px;
        font-weight:400;
        color:rgba(20,98,163,1);
    } 
    .copy-person-box {
        margin-top:20px;
        margin-left:86px;
        li{
            height: 26px;
        }
    }
    .project2span,.delete-copy-person,.add-copy-person{
        cursor: pointer;
    }   
    .mode-remarks{
        margin-top:2px;
        font-size:12px;
        color:#9a9a9a;
    }  
    .pro5 {
        width: 45px;
        height: 2px;
        background:rgba(26,95,164,1);
    }
    .input-remarks {
        border:1px solid #dddddd;
        padding:10px;
        width:786px;
        margin-top: 10px;
        border-radius: 4px;
        resize:none;
    }
    .tree-doc-name{
        // width:360px;
        width:60%;
        text-align: left;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }
    .exam-state{
        float:right;
        padding-right:12px;
    }
    .exam-state.waitexam{
        color:#FABD5B;
    }
    .exam-state.pase{
        color:#8EC77D;
    }
    .exam-state.nopase{
        color:#F25E65;
    }
    .exam-state.noexam{
        color:#FABD5B;
    }
    // 以下为选择人员相关
    .wanc{
        width: 100%;
        height: 230px;
        // background: red;
        margin-top: 4px;
        overflow: hidden;
        overflow: auto;
    }
    .choseAuditor .auditorType{
        text-align: left;
    }
    .choseAuditor .auditorType .typeLeft,
    .choseAuditor .auditorType .typeRight{
        width: 45%;
        padding-right: 10px;
        border-right: 1px solid #e8e8e8;
    }
    .choseAuditor .auditorType .typeRight{
        border-right: 0px;
    }
    .choseAuditor .auditorType .typeLeft .alerdy,
    .choseAuditor .auditorType .typeRight .alerdy{
        font-size: 14px;
        color:#333;
        margin-top: 5px;
        margin-bottom: 5px;
        display: block;
    }
    .choseAuditor .auditorType .typeLeft p{
        margin-top: 10px;
        margin-bottom: 8px;
    }
    .choseAuditor .auditorType .typeRight .choTypes li{
        height: 34px;
        line-height: 34px;
    }
    .choseAuditor .auditorType .typeRight .choTypes li:hover{
        background-color: #F7F7F7;
    }
    .choseAuditor .auditorType .typeRight .choTypes li span{
        font-size: 14px;
        color: #333;
        margin-left: 5px;
    }
    .choseAuditor .auditorType .typeRight .choTypes li i{
        margin-right: 5px;
        position: relative;
        top: 11px;

    }
}

</style>
<style lang="scss" type="text/css">
.project-catalog-exam{
    .el-dialog__header{
        border-bottom:1px solid #dedede;
    }
    .el-dialog__body{
       padding:18px 20px;
    }
    .all-catalog-box {
        padding-left:10px;
        .el-tree-node__expand-icon.expanded{
            width: 18px;
            height:14px;
            margin-top:10px;
            background: url("../../../../assets/project_doc/treeopen.png") no-repeat 0 0;
            
        }
        .el-tree-node__expand-icon{
            width: 21px;
            height:21px;
            margin-top:10px;
            background: url("../../../../assets/project_doc/treenoopen.png") no-repeat 0 0;
        }
        .el-tree-node__expand-icon.is-leaf{
            background:none;
        }
        .el-tree-node__expand-icon.expanded{
            transform:none;
        }
        .tree-node{
            width:85%;
        }
    }
 
    .el-icon-caret-right:before{
        color:#fff;
        opacity: 0;
    }
}   
.bitians{
    color: red;
    margin-left: 5px;
    margin-right: 3px
}
</style>

