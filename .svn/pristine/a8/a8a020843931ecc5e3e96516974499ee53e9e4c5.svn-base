<template>
    <div id="business_process">
        <!-- 查询模块:通过for循环将constant.js中的参数遍历渲染 -->
        <div class="business_select"  v-on:keyup.enter="handleSelect('reset')">
            <el-form :inline="true" >
                <el-form-item class="business_select_button" v-for="(item,int) in search.form" :label="`${item.label}：`" :key="int">
                    <!-- 判断类型是否为输入框框 -->
                    <template v-if="item.type === 'input'">
                        <el-input v-model="search.params[item.key]" :placeholder="item.placeholder"></el-input>
                    </template>
                    <!-- 判断类型是否为审批类型的输入框 -->
                     <template v-else-if="item.type === 'inputSelect'">
                        <el-input v-model="search.params[item.key]"  :placeholder="item.placeholder" class="fin_inp" disabled style="width:300px;"></el-input>
                        <el-button  @click="optType(1)" type="primary" style="margin-left:-4px; margin-bottom:3px;">选择</el-button>
                    </template>
                    <!-- 判断类型是否为下拉框 -->
                    <template v-else>
                        <el-select
                            v-model="search.params[item.key]"
                            :disabled="item.key === 'procTagId' ? procTagIdShow === true ? true : false :
                                       item.key === 'available' ? availableShow === true ? true : false : false"
                            :placeholder="item.placeholder">
                            <el-option v-for="(option,index) in item.children" :label="option[item.key]" :value="option.id" :key="index"></el-option>
                        </el-select>
                    </template>

                </el-form-item>
                <!-- <el-form-item label="审批类型：">
                    <div>
                        <el-input v-model="financingName" placeholder="请选择审批类型" class="fin_inp" disabled style="width:300px;"></el-input>
                        <el-button  @click="optType(1)" type="primary" style="margin-left:-4px;">选择</el-button>
                     </div>
                </el-form-item> -->
                <!-- 查询按钮组 -->
                <el-form-item >
                    <el-button type="primary" icon="el-icon-search" @click.stop="handleSelect('reset')">查询</el-button>
                    <el-button class="select_button" icon="el-icon-refresh" @click.stop="handleReset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 表单模块 -->
        <div class="business_table">
            <el-table class="pro_table" :data="data" :height="'100%'" style="width: 100%" fit show-header   :header-cell-style="{background:'#FAFAFA',color:'#000',fontWeight:'bold'}">
                <!-- 表格内展示模块，通过for循环动态生成渲染页面 -->
                <el-table-column
                    v-for="(item,int) in tableHeader" align="center"
                    :prop="item.key" :label="item.name" :min-width="item.width || ''" :key="int"
                    >
                    <template slot-scope="scope">
                        <!-- 通过for循环以及各类判断确定内置的参数 -->
                        <p  :title="scope.row[item.key] === '' ||
                                    scope.row[item.key] === null ? '-' :
                                    item.key === 'available' ? scope.row[item.key].toString() === '1' ? '可用' :
                                    scope.row[item.key].toString() === '0' ? path === 'sponsor' ? '不可用' : '不可用' : scope.row[item.key] : scope.row[item.key]"
                            :class="`table_row_p ${scope.row[item.key] &&
                                    scope.row.available.toString() === '1' ?
                                    item.key === 'available' ?
                                    'table_available' :
                                    item.key === 'procName' ?
                                    'color-primary table_examine_available':
                                    '' :
                                    'table_not_available'}`"
                            @click.stop="handleRowOperate(item.key,scope.row.available.toString(),scope.row)" >
                            {{
                                scope.row[item.key] === '' || scope.row[item.key] === null ? '-' :
                                item.key === 'available' ? availableShow && scope.row.isCommon !== 1 ? '-' : scope.row[item.key].toString() === '1' ? '可用' :
                                scope.row[item.key].toString() === '0' ? path === 'sponsor' ? '不可用' : '不可用' : scope.row[item.key] : scope.row[item.key]
                            }}
                            <!-- {{item.key === 'available' ? availableShow && scope.row.procTypeId !== 1 :  '可用'}} -->
                        </p>
                    </template>
                </el-table-column>

                <!-- 表格内操作模块 -->
                <el-table-column label="操作" align="center" width="160">
                    <template slot-scope="scope" >
                        <!-- 预览与发起的按钮组 -->
                        <el-button class="pv-0" type="text" @click.stop="handlePreview(scope.row)" title="预览" >
                            <span class="icon-operate-btn iconfont">&#xe654;</span>
                        </el-button>
                        <el-button class="pv-0" type="text" @click.stop="handleOperate(scope.row)" title="发起"
                         :disabled="scope.row.available.toString() === '0' || scope.row.procTypeId.toString() === '7' ? true : path === 'sponsor' ? launchShow === true && scope.row.isCommon !== 1 ?  true : false : false" >
                            <span class="icon-operate-btn iconfont">&#xe6b2;</span>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 页码模块 -->
        <div class="business_pages">
            <el-pagination
                background layout="total, sizes, prev, pager, next, jumper"
                :total="dataTotalsForApprove"
                :pageSize="pageSizeForApprove"
                :page-sizes="pageSizes"
                :current-page.sync="currentPageForApprove"
                @current-change="onPageChange(arguments, 'forApprove')"
                @size-change="handleSizeChange(arguments,'forApprove')">
            </el-pagination>
        </div>

        <!-- 预览弹窗 -->
        <preview-approval-message
            :openAudit="openAudit.toString() === '0' ? false : true"
            :previewApprovalShow.sync="preview.show"
            :columnData="preview.data">
        </preview-approval-message>

        <!-- 目录审批等公共组件弹窗 -->
        <doc-exam
            ref="exam"
            :activeSource="launchPageTag"
            :examType="examType"
            :approvalData="approvalData"
            :openAudit="openAudit.toString() === '0' ? false : true"
            docSource='1'
            :projectData="projectData">
        </doc-exam>

    <!-- 选择审批类型 -->
    <ordinary-approve v-if="typeFlag" :typeObj='typeObj' :state="state"  v-on:typeProject='typeProject' :optState="optState" :hasSelect="busData"></ordinary-approve>
    </div>
</template>
<script>
// 流程预览
import previewApprovalMessage from "@/components/select_box/previewApprovalMessage"
// 文件/目录审批
import docExam from '@/pages/front/projectlist/projectDoc/docExam.vue'
//审批类型
import ordinaryApprove from "@/components/dialogcommon/ordinaryApprove";

export default {
    name:'businessProcess',
    data(){
        return{
            message:{},
            treeFocus:{},
            availableShow:true, // 控制是否可用下拉框是否可以下拉
            procTagIdShow:true, // 控制项目阶段下拉框是否可用下拉
            openAudit:0, // 为预览，发起文件审批，底稿目录审批等传参
            launchShow:true, // 发起审批按钮是否可用
            launchPageTag:1, // 为预览，发起文件审批，底稿目录审批等传参
            projectData:{}, // 为预览，发起文件审批，底稿目录审批等传参
            approvalData:{}, // 为预览，发起文件审批，底稿目录审批等传参
            examType:0, // 为预览，发起文件审批，底稿目录审批等传参
            process:{}, // 流程列表实例
            data:[], // 表格数据
            tableHeader:process.tableHeader, // 表格抬头
            search:{ // 查询表单数据
                form:process.search,
                params:{
                    procName:'', // 项目名称
                    financingName:'',  //审批类型名称
                    procTagId:'R222', // 项目阶段
                    procTypeId:'R222', // 审批类型
                    available:'R222' // 是否可用
                }
            },
            projectControl:false, // 项目控制参数（似乎可废弃）
            currentPageForApprove:2,
            dataTotalsForApprove:200, // 总列表条数
            pageSizeForApprove:10, // 每页展示的数量
            pageSizes:[10, 20, 50, 100], // 分页可选数量
            preview:{
                show:false, // 预览弹窗展示
                data:{} // 预览所需data数据
            },

             //融资类型
            typeFlag:false,
            typeObj:[],
            busData:[], // 融资类型返回值 用于弹框内回显
            optState:'',
            state:1,
           // financingName:'',
            tupeNum:1,
            financingId:'',

        }
    },
    props:{
        path:{ type:String,default:'sponsor'}, // 组件所在页面约定
        project:{ type:Object,default:function(){ // 项目信息
            return {}
        }},
        reset:{ type:Boolean,default:true},
        business:{ // 业务信息
            type:Object,
            default:function(){return{}}
        },
        select:{ // 查询信息
            type:Object,
            default:function(){return{}}
        },
        abc:{
            type:Object,
            default:function(){return{}}
        }
    },
    components:{
        previewApprovalMessage, // 预览弹窗组件
        docExam, // 发起审批底稿审批弹窗
        ordinaryApprove //选择审批类型
    },
    watch:{
        /*
         * 监听process流程列表实例，通过不同的实例内置参数进行不同的逻辑匹配
         * process实例被监听3次
         * 第一次为初始化实例阶段
         * 第二次为内部接口调用赋值
         * 第三步为内部二次接口赋值
         */
        process:{
            handler(Instance){
                if(!Instance.projectId || Instance.projectId === ""){
                    this.data = Instance.storage
                    this.dataTotalsForApprove = Instance.totals
                }else{
                    this.handleSelect(Instance.pageBool ? '' : 'reset')
                    Instance.pageBool = false
                    this.availableShow = false
                    this.handleSelectShow()
                }
            },
            deep:true
        },

        /***
         * 查询数据监听
         * 若存在查询数据且其位普通审核则目录树同步高亮
         **/
        search:{
            handler(newData){
                // 若树结构为普通审批，则置空
                if(Object.keys(this.treeFocus).length !== 0 && this.treeFocus.procTypeId && this.treeFocus.procTypeId === 1){
                    this.treeFocus = {}
                }
                Object.assign(this.$Business.select,newData.params)
                this.$Mit.select.code = newData.params
                this.$emit('watch-search',newData.params)
            },
            deep:true
        },

        // 监听项目下拉，切换传参
        project(newData){
            // 项目下拉,清空查询类型
            Object.assign(this.search.params,{
                procName:'', // 项目名称
                //financingName:'', //审批类型的名称
                procTagId:'R222', // 项目阶段
                procTypeId:'R222', // 审批类型
                available:'R222', // 是否可用
                procTypeId:'',
                financingName:''
            })
            this.busData.splice(0)
            // 项目是否为空的判断逻辑
            if(Object.keys(newData).length === 0){
                this.launchShow = true
                this.availableShow = true
                this.procTagIdShow = true
                this.process = this.$Business.process(newData,true)
                this.process.init()
            }else{
                this.launchShow = false
                // if(this.projectControl){
                this.process = this.$Business.process(newData,true)
                this.process.init()
                this.process.projectPhase(newData.projectId)
                this.handleSelectShow()
                // }
            }

        },
    },
    methods:{

        // 触发项目阶段下拉框展示
        handleSelectShow(){
            if($('.is-current').length !== 0 || $('.highlight.business_focus').length !== 0 || this.path !== 'sponsor' || this.availableShow === false){
                this.procTagIdShow = false
            }
        },

        // 点击预览头部发起审批
        handleRowOperate(key,available,scope){
            if(scope.available.toString() === '0' || scope.procTypeId.toString() === '7'){
                this.$message.error(scope.available.toString() === '0' ? '该流程不可用！' : '不可发起新建项目审批！')
            }else{
                if(this.launchShow === true && scope.isCommon !== 1){
                    this.$message.error('请选择项目！')
                }else{
                    if(key === 'procName' && available === '1'){
                        this.handleOperate(scope)
                    }
                }
            }
        },
        // 确定发起审批页面标识
        handlePageTag(){
            if(this.$route.path === '/sponsor'){
                this.launchPageTag = 1
            }else if(this.$route.path === '/projecexamine'){
                this.launchPageTag = 2
            }
        },
        // 重置搜索框
        handleReset(){
            let obj = this.search.params
            for(let i in obj){
                obj[i] = ''
            }
            this.busData.splice(0)
            this.process.operate = 0 // 非查询按钮
        },
        // 页码切换
        onPageChange(res){
            this.process.pageNo = res[0]
            if(!this.process.projectId || this.process.projectId === ""){
                let result = this.process.query(this.search.params)
                this.data = []
                result.storage.forEach(item=>{
                    this.data.push(item)
                })
                this.dataTotalsForApprove = result.totals
            }else{
                this.data = this.process.pageFile()
                this.process.pageBool = true
                this.dataTotalsForApprove = this.process.totals
            }
        },
        // 更改每页展示数量
        handleSizeChange(res){
            this.process.pageSize = res[0]
            if(!this.process.projectId || this.process.projectId === ""){
                this.process.query()
                let result = this.process.query()
                this.data = result.storage
                this.dataTotalsForApprove = result.totals
            }else{
                this.data = this.process.pageFile()
                this.dataTotalsForApprove = this.process.totals
            }
        },
        // 预览调用方法
        handlePreview(scope){
            let message = {}
            this.preview.show = true
            let projectMsg = this.project.code? this.project : this.$store.state.projectMsg.projectMsg;
            if(this.project.code) {
                projectMsg.financingName = this.project.finaTypeName
                projectMsg.financingId = this.project.finaTypeId
                projectMsg.name = this.project.projectName
                projectMsg.id = this.project.projectId
            }

            if(Object.keys(this.project).length > 0 || this.$Business.processParams){
                message = Object.assign({},{
                    code:projectMsg.code,
                    finaTypeName:projectMsg.financingName,
                    finaTypeId:projectMsg.financingId,
                    // procTypeId:projectMsg.procTypeId,
                    // progStageId:projectMsg.currentImplementStageId,
                    projectName:projectMsg.name,
                    projectId:projectMsg.id
                })
            }

            this.preview.data = {
                "modelId": scope.actModelId, // 模型id--取列表中的actModelId
                "deploymentId": scope.procDeployId, // 取列表中的-procDeployId
                "versionId": scope.procVersionNum, // 主版本号--procVersionNum
                "financingTypeId": scope.finaTypeId, // 业务类型对应的id
                'finaTypeName': scope.finaTypeName, // 业务类型名称
                "projectName": message.projectName || '', // 项目名称
                "projectId": message.projectId || '', // 项目id
                "procName": scope.procName, // 审批名称
                "projectCode": message.code || '', // 项目编码
                "approvalType": scope.procTypeId, // 审批类型id
                "approvalTypeName": scope.procTypeName, // 审批类型名称
                'progStageName': scope.progStageName // 当前阶段
            }
            this.$emit('preview',scope)
        },
        // 发起调用方法
        handleOperate(scope){
            let processParams = this.$store.state.projectMsg.projectMsg
            let hint = this.process.hint(scope)
            this.examType = scope.procTypeId
            console.log(scope.procTypeId, '69666', scope)
            if(
                scope.procTypeId === 2 ||
                scope.procTypeId === 10 ||
                scope.procTypeId === 3 ||
                scope.procTypeId === 11){
                this.openAudit = scope.openAudit
                Object.assign(this.projectData,{
                    docParentId : 0,
                    processId:scope.id,
                    processName:scope.progStageName,
                    financingName:this.process.message.finaTypeName || processParams.financingName,
                    projectId : this.process.message.projectId,
                    projectName : this.process.message.projectName || processParams.name,
                    projectCreatBy : this.process.message.createBy,
                    pathNameList : [],
                })
                Object.assign(this.approvalData,{
                    modelId:scope.actModelId,
                    deploymentId:scope.procDeployId,
                    versionId:scope.procVersionNum,
                    financingTypeId:scope.finaTypeId,
                    categoryId:scope.procTypeId,
                    docExamProcessName:scope.procName,
                    catalogExamProcessName:scope.procName
                })
                this.$refs.exam.activeComp()
            }else{
                this.$emit('operate',scope)
            }
        },

        // 查询计算
        handleSelect(dir){
            if (dir === 'reset') this.process.operate = 1 // 查询按钮查询
            if(!this.process.projectId || this.process.projectId === ""){
                if( Object.keys(this.treeFocus).length === 0 ||
                    this.treeFocus.procTypeId === this.search.params.procTypeId ||
                    this.search.params.procTypeId ||
                    this.treeFocus.finaTypeId !== undefined){
                    let object = Object.assign({},this.search.params,this.treeFocus)
                    let result = this.process.query(object,'select')
                    this.data = result.storage
                    this.dataTotalsForApprove = result.totals
                    this.currentPageForApprove = 1
                }else{
                    this.data = []
                    this.dataTotalsForApprove = 0
                    this.currentPageForApprove = 1
                }
            }else{
                // params:{procName:'',procTagId:'R222',procTypeId:'R222',available:'R222'}
                if(dir === 'reset'){
                    this.process.pageNo = 1
                    this.currentPageForApprove = 1
                }
                this.process.intercept = true
                this.data = this.process.pageFile({
                    procName:this.search.params.procName,
                    progStageId:this.search.params.procTagId,
                    procTypeId:this.search.params.procTypeId,
                    available:this.search.params.available
                })
                this.dataTotalsForApprove =this.process.selectLength
            }
        },

        // 洋葱模型，初始化方法
        async init(){
            this.message = this.$Business.processParams
            // 接口请求参数
            let object = Object.assign({},this.project,this.$Business.processParams)

            // 流程列表实例化
            this.process = this.$Business.process(Object.assign({},{
                projectId: this.$Business.processParams ? this.$Business.processParams.projectId : undefined, // 若项目跳转至此页面则携带项目id
                finaTypeId: this.$Business.processParams ? this.$Business.processParams.finaTypeId : '', // 若项目跳转至此页面则携带此业务类型
            }))
            this.tableHeader=this.process.tableHeader
            console.log(1111111111, this.tableHeader)
            this.search.form=this.process.search
            //
            if(this.$Business.processParams){
                await this.process.projectPhase(this.$Business.processParams.finaTypeId)
            }
            if(object.projectId && object.projectId !== ''){
                Object.assign(object,{available:'1'})
            }
            // 项目初始化
            await this.process.init(Object.keys(this.project).length > 0 ? this.project :{} ,
            Object.assign({},{ projectId:object.projectId,finaTypeId:object.finaTypeId }) || {},()=>{
                if(this.$Business.processParams){
                    this.data =  this.process.pageFile({
                        procTypeId: this.path === 'sponsor' ? this.$Business.processParams.procTypeId : '',
                        progStageId: this.path === 'sponsor'? this.$Business.processParams.progStageId : ''
                    })
                    console.log(222222, this.data)
                    this.dataTotalsForApprove = this.process.selectLength
                    // 判断是否为发起审批页内容初始化
                    if(this.path === 'sponsor'){
                        Object.assign(this.search.params,{
                            procTypeId: this.$Business.processParams.procTypeId || 'R222',
                            procTagId: this.$Business.processParams.progStageId || 'R222',
                            financingName: this.$Business.processParams.procTypeName
                        })
                        this.busData = [{
                            id: this.search.params.procTypeId,
                            label: this.search.params.financingName
                        }]
                    }else{
                        this.availableShow = false
                        Object.assign(this.search.params,{
                            procTypeId: 'R222',
                            procTagId: 'R222',
                        })
                    }
                    this.launchShow = false
                    this.handleSelectShow()
                }else{
                    this.data = this.path === 'sponsor' ? this.process.storage : this.process.pageFile()
                    this.dataTotalsForApprove = this.path === 'sponsor' ? this.process.totals : this.process.selectLength
                    console.log(33333333, this.data)
                }
            })
        },
         //融资类型返回值
        typeProject(data){
            if(data.length > 0){
                this.process.operate = 1
                if(this.tupeNum == 1){
                    this.busData = data
                    this.financingId = data[0].id;
                    this.search.params.procTypeId = data[0].id;
                    this.search.params.financingName = data[0].label;
                }
            }else{
                if(this.tupeNum == 1){
                    this.financingId = "";
                    this.financingName = "";
                    this.search.params.procTypeId = ''
                    this.search.params.financingName = ''
                    this.selectStageList = [];
                    this.busData.splice(0)
                    this.process.operate = 0
                }
            }
        },
        optType(val){
            this.tupeNum = val;
            this.$post("/info/service/getUsableProcessType").then((response => {
                if(response.code != this.code.codeNum.SUCCESS){
                    this.$message.warning(response.msg);
                    return
                }
                const data = response.data;
                if(this.abc.name == "项目审批"){
                    this.typeObj = [data[1]]
                }else if(this.abc.name == "发起审批"){
                    // 当前是否没有选择项目 选择了项目 不展示普通审批
                    let isSelProject = false
                    // const isSelProject = this.project.procTagId == '' || (this.$Business.processParams && !this.$Business.processParams.procTypeId) || Object.keys(this.project).length == 0
                    // 有值 说明是多流程跳转
                    if(this.abc.isJump) {
                        isSelProject = false
                    }else {
                        if(!!this.$Business.action && Object.keys(this.$Business.action).length !== 0) {
                            isSelProject = (this.$Business.action.id===999 && this.$Business.action.label==="全部") || !!this.$Business.action.isOrdinary
                        }else {
                            isSelProject = true
                        }
                    }
                    this.typeObj = isSelProject?data:[data[1]];
                }
                this.typeFlag = true;
                this.state = 1;
                this.optState = {value:val};
            })).catch(err => console.log(err));
        },
    },
    async mounted(){
        console.log(this.abc)

        // 页码栏信息
        this.handlePageTag()

        // 流程加载限制
        if(!this.projectControl){
            await this.init()
            this.projectControl = false
        }

        // 渲染成功后执行逻辑
        this.$nextTick(()=>{
            let processHeight = $('#business_process').height()
            let selectHeight = $('.business_select').height()
            let pageHeight = $('.business_pages').height()
            $('.business_table').height(processHeight-selectHeight-pageHeight-58)
        })

        // 监听业务更新组件内数据-------项目下拉菜单使用逻辑
        this.$Mit.watch({
            business:(res,type)=>{
                console.log(type,'_____type')
                this.handleSelectShow()
                let object = {}
                this.treeFocus = {}
                //  procName:'', // 项目名称
                //     procTagId:'R222', // 项目阶段
                //     procTypeId:'R222', // 审批类型
                //     available:'R222' // 是否可用
                Object.assign(this.search.params,{ procName:'', procTypeId:'R222',procTagId:'R222',available:'R222' })
                if(type.label === '普通审批'){
                    this.process.operate = 0 // 非查询按钮
                    Object.assign(this.treeFocus,{ procTypeId:type.id,procTagId:'R222' })
                    Object.assign(this.search.params,{ procTypeId:type.id })
                    Object.assign(object,this.search.params,{finaTypeId:'', procTypeId:type.id,pageSize:this.process.pageSize })
                }else if(type.dataType && type.dataType === 1){
                    this.process.operate = 0 // 非查询按钮
                    // Object.assign(this.treeFocus,{ finaTypeId:type.id })
                    // Object.assign(object,this.search.params,{procTypeId:type.fields.data.typeId},{
                    //     // procTypeId:'',
                    //     pageSize:this.process.pageSize
                    // })
                    Object.assign(this.search.params, { procTypeId: type.fields.data.typeId })
                    Object.assign(object, this.search.params, { procTypeId: type.fields.data.typeId }, {
                        // procTypeId:'',
                        pageSize: this.process.pageSize
                    })
                }else{
                    Object.assign(this.treeFocus,{ finaTypeId:type.id })
                    Object.assign(object,this.search.params,{finaTypeId:type.id},{
                        // procTypeId:'',
                        pageSize:this.process.pageSize
                    })
                }
                // 若存在this.process的实例，且存在项目，则将参数合并
                this.process = this.$Business.process(this.process ? Object.assign(this.process.message,{ operate: this.process.operate },object) : object,true)
                this.process.init()
                if(type.label !== '普通审批'){
                    this.process.projectPhase(type.id)
                }
            },
            approvalSuccessful:(res,taget,value)=>{
                this.process = this.$Business.process(this.process ? this.process.message : {})
                this.process.init()
                if(!this.process.projectId || this.process.projectId === ""){
                    this.data = this.process.storage
                    this.dataTotalsForApprove = this.process.totals
                }else{
                    this.handleSelect(this.process.pageBool ? '' : 'reset')
                    this.process.pageBool = false
                    this.availableShow = false
                    this.handleSelectShow()
                }
            }
        })


    },
    destroyed(){
        if(!this.$route.path.includes('projecexamine')){
            this.$Business.processStore()
        }
    }
}
</script>
<style lang="scss" scoped>
#business_process{
    position: relative;
    background: #fff;
    width:100%;
    height: 100%;
    overflow-y:scroll;
    @media (max-width: 1360px){
        overflow:scroll;
    }
    // min-height:600px;
    .business{
        &_select{
            padding:14px 20px;
            text-align:left;
            min-width: 1030px;
            .el-form-item{
                margin-top:8px;
                margin-bottom:8px;
            }
            &-button:nth-child(4){
                margin-right:30px !important;
            }
            .select_button{
                margin-left:20px !important;
            }
        }
        &_table{
            width: 100%;
            min-width: 1070px;
            // height: calc(100% - 165px);
            .table_row_p{
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
                &.table_available{
                    color:#67C23A !important;
                }
                &.table_examine_available{
                    cursor:pointer;
                }
                &.table_not_available{
                    color:rgba(86,87,91,0.5);
                }
            }
            // min-height:500px;
            .pro_table{
                // min-height:500px;
            }
        }
        &_pages{
            position: absolute;
            bottom:0px;
            box-sizing:border-box;
            padding:10px 35px;
            width: 100%;
            min-width: 1070px;
            text-align:right;
            @media (max-width: 1360px){
                position:relative;
            }
        }
    }
}
</style>
