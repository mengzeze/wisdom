<template>
  <div class="anti-wash-money">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>合规管理</el-breadcrumb-item>
      <el-breadcrumb-item>关联方</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="page_title">
        <span>关联方</span>
    </div>
    <div class="page_cen"></div>
    <el-tabs @tab-click="tabClick" type="border-card" v-model="tabValue">
        <el-tab-pane label="关联机构" name="关联机构">
            <div class="pro_list_scro">
                <el-scrollbar style="height:100%;overflow-x: hidden">
                    <div>
                        <el-form ref="form"  label-width="100px" class="form_box clearfix list_form">
                            <el-form-item label="公司名称：">
                            <el-input v-model="customerName" placeholder="请输入关联机构名称"></el-input>
                            </el-form-item>
                            <el-button size="medium" icon="el-icon-search" type="primary" @click="searchBtn">查询</el-button>
                            <el-button size="medium" icon="el-icon-refresh" @click="resetBtn(1)">重置</el-button>
                            <el-button size="medium" @click="importBtn" class="import-btn">
                                <i></i>
                                导入
                            </el-button>
                        </el-form>
                    </div>
                    <el-table :data="reportListData" fit show-header :header-cell-style="{background:'#FAFAFA',color:'#000'}" style="width: 100%" class="pro_table">
                        <el-table-column prop="code" label="公司名称" align="center" width="312">
                            <template slot-scope="scope">
                                <p :title="scope.row.code" class="ellipsis1">{{scope.row.code}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="关联自然人在关联机构任职情况 " align="center"  min-width="140">
                            <template slot-scope="scope">
                                <p :title="scope.row.name" class="ellipsis1">{{scope.row.name}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column prop="financingName" label="备注 " align="center" width="312">
                            <template slot-scope="scope">
                                <p :title="scope.row.financingName" class="ellipsis1">{{scope.row.financingName}}</p>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="dataTotal" :pageSize="pageSize" :page-sizes="pageSizes" :current-page="currentPage" @current-change="onPageChange" @size-change="handleSizeChange"></el-pagination>
                </el-scrollbar>
            </div>
        </el-tab-pane>
        <el-tab-pane label="关联自然人" name="关联自然人">
            <div class="pro_list_scro">
                <el-scrollbar style="height:100%;overflow-x: hidden">
                    <div>
                        <el-form ref="form"  label-width="70px" class="form_box clearfix list_form">
                            <el-form-item label="名称：">
                            <el-input v-model="customerName" placeholder="请输入关联自然人名称"></el-input>
                            </el-form-item>
                            <el-button size="medium" icon="el-icon-search" type="primary" @click="searchBtn">查询</el-button>
                            <el-button size="medium" icon="el-icon-refresh" @click="resetBtn(1)">重置</el-button>
                            <el-button size="medium" @click="importBtn" class="import-btn">
                                <i></i>
                                导入
                            </el-button>
                        </el-form>
                    </div>
                    <el-table :data="tableData" fit show-header :header-cell-style="{background:'#FAFAFA',color:'#000'}" style="width: 100%" class="pro_table">
                        <el-table-column prop="code" label="姓名" align="center" width="160">
                            <template slot-scope="scope">
                                <p :title="scope.row.code" class="ellipsis1">{{scope.row.code}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="单位" align="center"  min-width="140">
                            <template slot-scope="scope">
                                <p :title="scope.row.name" class="ellipsis1">{{scope.row.name}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column prop="financingName" label="职务" align="center" width="312">
                            <template slot-scope="scope">
                                <p :title="scope.row.financingName" class="ellipsis1">{{scope.row.financingName}}</p>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="dataTotal" :pageSize="pageSize" :page-sizes="pageSizes"      :current-page="currentPage" @current-change="onPageChange" @size-change="handleSizeChange"></el-pagination>
                </el-scrollbar>
            </div>
        </el-tab-pane>
        <el-tab-pane label="比对报告" name="比对报告">
            <div class="pro_list_scro comp_report_con">
                <el-scrollbar style="height:100%;overflow-x: hidden">
                    <div>
                        <el-form ref="form"  label-width="100px" class="form_box clearfix list_form">
                            <el-form-item label="项目名称：">
                            <el-input v-model="customerName" placeholder="请输入项目名称"></el-input>
                            </el-form-item>
                            <el-button size="medium" icon="el-icon-search" type="primary" @click="searchBtn">查询</el-button>
                            <el-button size="medium" icon="el-icon-refresh" @click="resetBtn(1)">重置</el-button>
                        </el-form>
                    </div>
                    <el-table :data="tableData" fit show-header :header-cell-style="{background:'#FAFAFA',color:'#000'}" style="width: 100%" class="pro_table">
                        <el-table-column prop="code" label="项目名称" align="center" min-width="180">
                            <template slot-scope="scope">
                                <p :title="scope.row.code" class="ellipsis1">{{scope.row.code}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center" class="pro_edit_task">
                            <!-- <template slot-scope="scope">
                                    <el-button type="text"  @click="viewReport(scope.$index, scope.row)" class="handle-btn" title="查看报告">查看报告</el-button>
                                    <el-button type="text"  @click="exportReport(scope.$index, scope.row)" class="handle-btn" title="导出">导出</el-button>
                            </template> -->
                            <template slot-scope="scope">
                                    <span @click="viewReport(scope.$index, scope.row)" class="view_report_btn" title="查看报告"></span>
                                    <span @click="exportReport(scope.$index, scope.row)" class="export_btn" title="导出"></span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="dataTotal" :pageSize="pageSize" :page-sizes="pageSizes" :current-page="currentPage" @current-change="onPageChange" @size-change="handleSizeChange"></el-pagination>
                </el-scrollbar>
          </div>
        </el-tab-pane>
    </el-tabs>   
    <el-dialog title="利益冲突比对结果报告" :close-on-click-modal="false" :visible.sync="compResultVisible" width="790px">
        <div style="height:550px;" class="comp-result">
            <el-scrollbar style="height:100%">
                <p class="comp-result-title">经比对，客户唐一二与2017-07-05发布的黑名单姓名/证件号码比对一致，经核实，客户与黑名单比对一致的原因为：布的黑名单姓名布的黑名单姓名布的黑名单姓名布的黑名单姓名</p>
                <p class="comp-result-con">经比对，客户唐一二与2017-07-05发布的黑名单姓名/证件号码比对一致，经核实，客户与黑名单比对一致的原因为：经比对，客户唐一二与2017-07-05发布的黑名单姓名/证件号码比对一致，经核实，客户与黑名单比对一致的原因为：经比对，客户唐一二与2017-07-05发布的黑名单姓名/证件号码比对一致，经核实，客户与黑名单比对一致的原因为：经比对，客户唐一二与2017-07-05发布的黑名单姓名/证件号码比对一致，经核实，客户与黑名单比对一致的原因为：经比对，客户唐一二与2017-07-05发布的黑名单姓名/证件号码比对一致，经核实，客户与黑名单比对一致的原因为：经比对，客户唐一二与2017-07-05发布的黑名单姓名/证件号码比对一致，经核实，客户与黑名单比对一致的原因为：</p>
            </el-scrollbar>
        </div>
        <!-- <span slot="footer" class="dialog-footer">
            <el-button>抄送</el-button>
            <el-button type="primary" :disabled="newProtep">导出至客户文档</el-button>
        </span> -->
    </el-dialog> 
    <div v-if="loadFlag" class="loadDiv" v-loading="true" element-loading-text="数据处理中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"></div>
    <upload-doc-add
            v-if="addDoc"
            :uploadDocAddIsShow="uploadDocAddIsShow"
            :uploadParamData="uploadParamData"
            @sendValueToParent="uploadAddDocClose"
            @docUpload="docUpload"
            @docUploadAllsucess="docUploadAllsucess"
            :accpet="accpet"
            ref="uploadRef"
        ></upload-doc-add> 
  </div>
</template>

<script>
import uploadDocAdd from "@/components/file/uploadAddDoc";
export default {
    name: "gainConflictCheck",
    components: {
        uploadDocAdd
    },
    data() {
        return {
            token: "",
            userId: "",
            success_code: "",
            tabs:0,
            tabValue:'关联机构',
            loadFlag: false,//加载
            tableData:[],//黑名单列表
            pageSize: 10,
            pageSizes: [10, 20, 50, 100], //每页显示数量
            currentPage: 1, //当前页
            dataTotal: 0, //总量
            //搜索条件
            customerName:'',//客户姓名
            customerSex:'',//客户性别
            state:'',//黑名单状态
            cusSexList: [//客户性别列表
                {
                    id: '0',
                    name: "男"
                },
                {
                    id: '1',
                    name: "女"
                }
            ],
            stateChangeList:[//黑名单状态列表
                {
                    id: '0',
                    name: "正常"
                },
                {
                    id: '1',
                    name: "除名"
                }
            ],
            reportListData: [],//比对报告列表
            addDoc: false,//导入文件弹窗
            uploadDocAddIsShow: false,
            uploadParamData: {},//导入时用到的参数
            accpet: '',//导入的文件格式限制
            compResultVisible: false,//查看报告弹窗
        };
    },
    created(){
        
    },
    mounted() {
        this.token = this.$store.state.loginObject.userToken;
        this.userId = this.$store.state.loginObject.userId;
        this.success_code = this.code.codeNum.SUCCESS; 
        this.getViewPortHeight();
        this.getBlackList();
        this.getReportList();
    },
    computed:{
        
    },
    watch:{
        
    },
    methods: {
        // tab切换
        tabClick(tab, e) {
            this.tabs = tab.index;
            this.pageSize = 10;
            this.currentPage = 1;
            this.dataTotal = 0;
            if(tab.index !== '0'){
                this.btnShow = false
            }else{
                this.btnShow = true
                this.$forceUpdate()
            }
            switch (e.target.innerText) {
                case "黑名单":
                  this.getBlackList();
                break;
                case "比对报告":
                this.getReportList();
                break;
            }
        },
        //黑名单列表
        getBlackList(){
            var listObj = {
                "token": this.token,
                "userId": this.userId,
                "pageNo": this.currentPage,
                "pageSize": this.pageSize,
                "data": {
                    
                }
            };
            this.$post("/info/project/getProjectList",listObj).then((response => {
                var response = {"msg":"成功","code":0,"data":{"pageNum":1,"pageSize":10,"size":10,"startRow":1,"endRow":10,"total":203,"pages":21,"list":[{"projectOrganList":null,"projectMemberRoleList":null,"picNames":"","createUserIdList":[],"deptName":"北京部","projectMemberVoList":null,"recycleBinUpdateTime":null,"projectRecycleBinInfo":null,"stopLibraryInfo":null,"projectProcess":null,"organInfo":null,"projectMemberInfo":null,"projectStatus":"进行中","createName":"付静","projectFinancingList":null,"approveResultMap":null,"linkProjectName":null,"projectNeedApprove":null,"id":331,"code":"chfj","currentImplementStageName":"北京市朝阳区朝阳路永丰街道19号北京市朝阳区朝阳路永丰街道19号","currentImplementStageId":2824,"currentStageId":1,"crmId":1,"name":"123456789fdfjdkfjdjfdkfdjfjdf","abbreviation":"","financingTopId":null,"financingId":41,"financingName":"身份证身份证身份证身份证身份证身份证","deptId":5,"startTime":null,"endTime":null,"delFlag":null,"endFlag":null,"completeFlag":0,"createTime":"2019-09-26 11:57:36","updateTime":null,"createBy":89,"updateBy":null,"description":"","linkProjectId":null,"startStageId":null,"endStageId":null,"startStageName":"北京市朝阳区朝阳路永丰街道19号北京市朝阳区朝阳路永丰街道19号","endStageName":null,"needApprove":null,"approveStatus":null,"useTplId":38},{"projectOrganList":null,"projectMemberRoleList":null,"picNames":"闫成龙2号","createUserIdList":[135],"deptName":"北京部","projectMemberVoList":null,"recycleBinUpdateTime":null,"projectRecycleBinInfo":null,"stopLibraryInfo":null,"projectProcess":null,"organInfo":null,"projectMemberInfo":null,"projectStatus":"进行中","createName":"闫成龙娃娃粉阿道夫撒","projectFinancingList":null,"approveResultMap":null,"linkProjectName":null,"projectNeedApprove":null,"id":328,"code":"3345134","currentImplementStageName":"北京市朝阳区朝阳路永丰街道19号","currentImplementStageId":2823,"currentStageId":1,"crmId":1,"name":"新建项目审批","abbreviation":"","financingTopId":null,"financingId":41,"financingName":"科创板","deptId":5,"startTime":null,"endTime":null,"delFlag":null,"endFlag":null,"completeFlag":0,"createTime":"2019-09-25 12:00:14","updateTime":null,"createBy":133,"updateBy":null,"description":"","linkProjectId":null,"startStageId":null,"endStageId":null,"startStageName":"北京市朝阳区朝阳路永丰街道19号","endStageName":null,"needApprove":null,"approveStatus":null,"useTplId":null},{"projectOrganList":null,"projectMemberRoleList":null,"picNames":"周12","createUserIdList":[90],"deptName":"北京部","projectMemberVoList":null,"recycleBinUpdateTime":null,"projectRecycleBinInfo":null,"stopLibraryInfo":null,"projectProcess":null,"organInfo":null,"projectMemberInfo":null,"projectStatus":"进行中","createName":"邢亚坤","projectFinancingList":null,"approveResultMap":null,"linkProjectName":null,"projectNeedApprove":null,"id":327,"code":"34568799764564564","currentImplementStageName":"北京市朝阳区朝阳路永丰街道19号","currentImplementStageId":2817,"currentStageId":1,"crmId":1,"name":"阿道夫","abbreviation":"","financingTopId":null,"financingId":41,"financingName":"科创板","deptId":5,"startTime":null,"endTime":null,"delFlag":null,"endFlag":null,"completeFlag":0,"createTime":"2019-09-24 10:51:14","updateTime":null,"createBy":132,"updateBy":null,"description":"","linkProjectId":null,"startStageId":null,"endStageId":null,"startStageName":"北京市朝阳区朝阳路永丰街道19号","endStageName":null,"needApprove":null,"approveStatus":null,"useTplId":null},{"projectOrganList":null,"projectMemberRoleList":null,"picNames":"","createUserIdList":[],"deptName":"合规风控部","projectMemberVoList":null,"recycleBinUpdateTime":null,"projectRecycleBinInfo":null,"stopLibraryInfo":null,"projectProcess":null,"organInfo":null,"projectMemberInfo":null,"projectStatus":"进行中","createName":"金超","projectFinancingList":null,"approveResultMap":null,"linkProjectName":null,"projectNeedApprove":null,"id":326,"code":"asdf","currentImplementStageName":"北京市朝阳区朝阳路永丰街道19号","currentImplementStageId":2814,"currentStageId":1,"crmId":2,"name":"阿斯顿发生全文s","abbreviation":"","financingTopId":null,"financingId":41,"financingName":"科创板","deptId":8,"startTime":null,"endTime":null,"delFlag":null,"endFlag":null,"completeFlag":0,"createTime":"2019-09-23 11:06:31","updateTime":null,"createBy":6,"updateBy":null,"description":"","linkProjectId":null,"startStageId":null,"endStageId":null,"startStageName":"北京市朝阳区朝阳路永丰街道19号","endStageName":null,"needApprove":null,"approveStatus":null,"useTplId":null},{"projectOrganList":null,"projectMemberRoleList":null,"picNames":"","createUserIdList":[],"deptName":"股权资本市场部","projectMemberVoList":null,"recycleBinUpdateTime":null,"projectRecycleBinInfo":null,"stopLibraryInfo":null,"projectProcess":null,"organInfo":null,"projectMemberInfo":null,"projectStatus":"进行中","createName":"y1","projectFinancingList":null,"approveResultMap":null,"linkProjectName":null,"projectNeedApprove":null,"id":324,"code":"4","currentImplementStageName":"北京市朝阳区朝阳路永丰街道19号","currentImplementStageId":2810,"currentStageId":1,"crmId":1,"name":"4","abbreviation":"4","financingTopId":null,"financingId":41,"financingName":"科创板","deptId":14,"startTime":null,"endTime":null,"delFlag":null,"endFlag":null,"completeFlag":0,"createTime":"2019-09-20 16:41:52","updateTime":null,"createBy":69,"updateBy":null,"description":"","linkProjectId":null,"startStageId":null,"endStageId":null,"startStageName":"北京市朝阳区朝阳路永丰街道19号","endStageName":null,"needApprove":null,"approveStatus":null,"useTplId":null},{"projectOrganList":null,"projectMemberRoleList":null,"picNames":"","createUserIdList":[],"deptName":"东北业务部","projectMemberVoList":null,"recycleBinUpdateTime":null,"projectRecycleBinInfo":null,"stopLibraryInfo":null,"projectProcess":null,"organInfo":null,"projectMemberInfo":null,"projectStatus":"进行中","createName":"何聪","projectFinancingList":null,"approveResultMap":null,"linkProjectName":"项目项目项目项目项目项目项目项目项目项目项目","projectNeedApprove":null,"id":318,"code":"585469","currentImplementStageName":"内核","currentImplementStageId":2802,"currentStageId":5,"crmId":5,"name":"撒旦","abbreviation":"是的","financingTopId":null,"financingId":41,"financingName":"科创板","deptId":7,"startTime":null,"endTime":null,"delFlag":null,"endFlag":null,"completeFlag":0,"createTime":"2019-09-18 19:00:45","updateTime":null,"createBy":4,"updateBy":null,"description":"第三方","linkProjectId":6,"startStageId":null,"endStageId":null,"startStageName":"内核","endStageName":null,"needApprove":null,"approveStatus":null,"useTplId":13},{"projectOrganList":null,"projectMemberRoleList":null,"picNames":"","createUserIdList":[],"deptName":"东北业务部","projectMemberVoList":null,"recycleBinUpdateTime":null,"projectRecycleBinInfo":null,"stopLibraryInfo":null,"projectProcess":null,"organInfo":null,"projectMemberInfo":null,"projectStatus":"进行中","createName":"何聪","projectFinancingList":null,"approveResultMap":null,"linkProjectName":"aaa","projectNeedApprove":null,"id":316,"code":"444444","currentImplementStageName":"内核","currentImplementStageId":2800,"currentStageId":5,"crmId":2,"name":"我创建的","abbreviation":"我","financingTopId":null,"financingId":41,"financingName":"科创板","deptId":7,"startTime":null,"endTime":null,"delFlag":null,"endFlag":null,"completeFlag":0,"createTime":"2019-09-18 17:53:45","updateTime":null,"createBy":4,"updateBy":null,"description":"而","linkProjectId":315,"startStageId":null,"endStageId":null,"startStageName":"内核","endStageName":null,"needApprove":null,"approveStatus":null,"useTplId":null},{"projectOrganList":null,"projectMemberRoleList":null,"picNames":"","createUserIdList":[],"deptName":"股权资本市场部","projectMemberVoList":null,"recycleBinUpdateTime":null,"projectRecycleBinInfo":null,"stopLibraryInfo":null,"projectProcess":null,"organInfo":null,"projectMemberInfo":null,"projectStatus":"进行中","createName":"何阶","projectFinancingList":null,"approveResultMap":null,"linkProjectName":null,"projectNeedApprove":null,"id":315,"code":"dsdas","currentImplementStageName":"北京市朝阳区朝阳路永丰街道19号","currentImplementStageId":2796,"currentStageId":1,"crmId":1,"name":"aaa","abbreviation":"","financingTopId":null,"financingId":41,"financingName":"科创板","deptId":14,"startTime":null,"endTime":null,"delFlag":null,"endFlag":null,"completeFlag":0,"createTime":"2019-09-18 17:45:34","updateTime":null,"createBy":11,"updateBy":null,"description":"","linkProjectId":null,"startStageId":null,"endStageId":null,"startStageName":"北京市朝阳区朝阳路永丰街道19号","endStageName":null,"needApprove":null,"approveStatus":null,"useTplId":null},{"projectOrganList":null,"projectMemberRoleList":null,"picNames":"","createUserIdList":[],"deptName":"恒泰长材","projectMemberVoList":null,"recycleBinUpdateTime":null,"projectRecycleBinInfo":null,"stopLibraryInfo":null,"projectProcess":null,"organInfo":null,"projectMemberInfo":null,"projectStatus":"进行中","createName":"金超","projectFinancingList":null,"approveResultMap":null,"linkProjectName":null,"projectNeedApprove":null,"id":314,"code":"456","currentImplementStageName":"北京市朝阳区朝阳路永丰街道19号","currentImplementStageId":2794,"currentStageId":1,"crmId":2,"name":"jinc123123","abbreviation":"","financingTopId":null,"financingId":41,"financingName":"科创板","deptId":1,"startTime":null,"endTime":null,"delFlag":null,"endFlag":null,"completeFlag":0,"createTime":"2019-09-18 10:22:02","updateTime":null,"createBy":6,"updateBy":null,"description":"","linkProjectId":null,"startStageId":null,"endStageId":null,"startStageName":"北京市朝阳区朝阳路永丰街道19号","endStageName":null,"needApprove":null,"approveStatus":null,"useTplId":null},{"projectOrganList":null,"projectMemberRoleList":null,"picNames":"","createUserIdList":[],"deptName":"债券融资总部八部","projectMemberVoList":null,"recycleBinUpdateTime":null,"projectRecycleBinInfo":null,"stopLibraryInfo":null,"projectProcess":null,"organInfo":null,"projectMemberInfo":null,"projectStatus":"进行中","createName":"y1","projectFinancingList":null,"approveResultMap":null,"linkProjectName":null,"projectNeedApprove":null,"id":313,"code":"414454","currentImplementStageName":"北京市朝阳区朝阳路永丰街道19号","currentImplementStageId":2780,"currentStageId":1,"crmId":1,"name":"5","abbreviation":"","financingTopId":null,"financingId":41,"financingName":"科创板","deptId":4,"startTime":null,"endTime":null,"delFlag":null,"endFlag":null,"completeFlag":0,"createTime":"2019-09-17 19:29:22","updateTime":null,"createBy":69,"updateBy":null,"description":"","linkProjectId":null,"startStageId":null,"endStageId":null,"startStageName":"北京市朝阳区朝阳路永丰街道19号","endStageName":null,"needApprove":null,"approveStatus":null,"useTplId":14}],"prePage":0,"nextPage":2,"isFirstPage":true,"isLastPage":false,"hasPreviousPage":false,"hasNextPage":true,"navigatePages":8,"navigatepageNums":[1,2,3,4,5,6,7,8],"navigateFirstPage":1,"navigateLastPage":8,"lastPage":8,"firstPage":1}}
                var data =  response.data;
                if(response.code == this.success_code){
                    this.tableData = data.list;
                    this.dataTotal = data.total;
                    this.getViewPortHeight();
                }else{
                    this.$message(response.msg);
                }
            })).catch(error => {

            });
        },
        //搜索条件性别切换
        cusSexChan(val){
            this.customerSex = val;
        },
        //搜索条件黑名单状态切换
        stateChange(val){
            this.state = val;
        },
        // 查询
        searchBtn() {
            this.currentPage = 1;
            this.getBlackList();
        },
        // 重置
        resetBtn(val){
            this.customerName = "";
            this.customerSex = "";
            this.state = "";
        },
        //导入
        importBtn(){
            this.$confirm('新导入的数据将会覆盖当前数据，是否确认导入？', '导入提醒', {
                confirmButtonText: '是',
                cancelButtonText: '否',
                type: 'warning'
            }).then(() => {
                //弹出上传弹窗
                this.confirmImport();
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消导入'
                });
            });
        },
        confirmImport(){
            this.accpet = "xls,xlsx,excel";
            this.addDoc = true;
            this.uploadDocAddIsShow = true;
        },
        //上传要导入的文件
        docUpload(uploadData) {
            // let vm = this;
            // let data = {
            //     token: this.token,
            //     userId: this.userId,
            //     data: {
            //         projectId: this.publicData.projectId,
            //         docId: uploadData.docId,
            //         docType: 0, //文件夹为1，文件为0
            //         parentId: this.publicData.docParentId,
            //         docName: uploadData.fileData.name,
            //         rfsId: uploadData.fileData.rfsId,
            //         auditProjectId: this.publicData.processId
            //     }
            // };
            // this.$post("/doc/project/insert", data)
            //     .then((response)=> {
            //         if (vm.success_code == response.code) {
            //             vm.$refs.uploadRef.uploadComplete();
            //             vm.search.pageNo = 0;
            //         } else {
            //             vm.$message.error(response.msg);
            //         }
            //     })
            //     .catch(function (error) {

            //     });
        },
        docUploadAllsucess() {
            this.$message({
                type: "success",
                message: '导入成功'
            });
            this.getBlackList();
        },
        uploadAddDocClose() {
            this.uploadDocAddIsShow = false;
            this.addDoc = false;
        },
        //比对报告列表
        getReportList(){
            var listObj = {
                "token": this.token,
                "userId": this.userId,
                "pageNo": this.currentPage,
                "pageSize": this.pageSize,
                "data": {
                    
                }
            };
            this.$post("/info/project/getProjectList",listObj).then((response => {
                var response = {"msg":"成功","code":0,"data":{"pageNum":1,"pageSize":10,"size":10,"startRow":1,"endRow":10,"total":203,"pages":21,"list":[{
			"projectOrganList": null,
			"projectMemberRoleList": null,
			"picNames": "",
			"createUserIdList": [],
			"deptName": "北京部",
			"projectMemberVoList": null,
			"recycleBinUpdateTime": null,
			"projectRecycleBinInfo": null,
			"stopLibraryInfo": null,
			"projectProcess": null,
			"organInfo": null,
			"projectMemberInfo": null,
			"projectStatus": "进行中",
			"createName": "付静",
			"projectFinancingList": null,
			"approveResultMap": null,
			"linkProjectName": null,
			"projectNeedApprove": null,
			"id": 331,
			"code": "chfj",
			"currentImplementStageName": "北京市朝阳区朝北京市朝阳区朝阳路永丰街道19号",
			"currentImplementStageId": 2824,
			"currentStageId": 1,
			"crmId": 1,
			"name": "小沙传媒",
			"abbreviation": "",
			"financingTopId": null,
			"financingId": 41,
			"financingName": "科创板",
			"deptId": 5,
			"startTime": null,
			"endTime": null,
			"delFlag": null,
			"endFlag": null,
			"completeFlag": 0,
			"createTime": "2019-09-26 11:57:36",
			"updateTime": null,
			"createBy": 89,
			"updateBy": null,
			"description": "",
			"linkProjectId": null,
			"startStageId": null,
			"endStageId": null,
			"startStageName": "北京市朝阳区朝阳路永丰街道19号",
			"endStageName": null,
			"needApprove": null,
			"approveStatus": null,
			"useTplId": 38
		},{
			"projectOrganList": null,
			"projectMemberRoleList": null,
			"picNames": "",
			"createUserIdList": [],
			"deptName": "北京部",
			"projectMemberVoList": null,
			"recycleBinUpdateTime": null,
			"projectRecycleBinInfo": null,
			"stopLibraryInfo": null,
			"projectProcess": null,
			"organInfo": null,
			"projectMemberInfo": null,
			"projectStatus": "进行中",
			"createName": "付静",
			"projectFinancingList": null,
			"approveResultMap": null,
			"linkProjectName": null,
			"projectNeedApprove": null,
			"id": 331,
			"code": "chfj",
			"currentImplementStageName": "北京市朝阳区朝北京市朝阳区朝阳路永丰街道19号",
			"currentImplementStageId": 2824,
			"currentStageId": 1,
			"crmId": 1,
			"name": "小沙传媒",
			"abbreviation": "",
			"financingTopId": null,
			"financingId": 41,
			"financingName": "科创板",
			"deptId": 5,
			"startTime": null,
			"endTime": null,
			"delFlag": null,
			"endFlag": null,
			"completeFlag": 0,
			"createTime": "2019-09-26 11:57:36",
			"updateTime": null,
			"createBy": 89,
			"updateBy": null,
			"description": "",
			"linkProjectId": null,
			"startStageId": null,
			"endStageId": null,
			"startStageName": "北京市朝阳区朝阳路永丰街道19号",
			"endStageName": null,
			"needApprove": null,
			"approveStatus": null,
			"useTplId": 38
		},{
			"projectOrganList": null,
			"projectMemberRoleList": null,
			"picNames": "",
			"createUserIdList": [],
			"deptName": "北京部",
			"projectMemberVoList": null,
			"recycleBinUpdateTime": null,
			"projectRecycleBinInfo": null,
			"stopLibraryInfo": null,
			"projectProcess": null,
			"organInfo": null,
			"projectMemberInfo": null,
			"projectStatus": "进行中",
			"createName": "付静",
			"projectFinancingList": null,
			"approveResultMap": null,
			"linkProjectName": null,
			"projectNeedApprove": null,
			"id": 331,
			"code": "chfj",
			"currentImplementStageName": "北京市朝阳区朝北京市朝阳区朝阳路永丰街道19号",
			"currentImplementStageId": 2824,
			"currentStageId": 1,
			"crmId": 1,
			"name": "小沙传媒",
			"abbreviation": "",
			"financingTopId": null,
			"financingId": 41,
			"financingName": "科创板",
			"deptId": 5,
			"startTime": null,
			"endTime": null,
			"delFlag": null,
			"endFlag": null,
			"completeFlag": 0,
			"createTime": "2019-09-26 11:57:36",
			"updateTime": null,
			"createBy": 89,
			"updateBy": null,
			"description": "",
			"linkProjectId": null,
			"startStageId": null,
			"endStageId": null,
			"startStageName": "北京市朝阳区朝阳路永丰街道19号",
			"endStageName": null,
			"needApprove": null,
			"approveStatus": null,
			"useTplId": 38
		},{"projectOrganList":null,"projectMemberRoleList":null,"picNames":"","createUserIdList":[],"deptName":"北京部","projectMemberVoList":null,"recycleBinUpdateTime":null,"projectRecycleBinInfo":null,"stopLibraryInfo":null,"projectProcess":null,"organInfo":null,"projectMemberInfo":null,"projectStatus":"进行中","createName":"付静","projectFinancingList":null,"approveResultMap":null,"linkProjectName":null,"projectNeedApprove":null,"id":331,"code":"chfj","currentImplementStageName":"北京市朝阳区朝北京市朝阳区朝阳路永丰街道19号","currentImplementStageId":2824,"currentStageId":1,"crmId":1,"name":"小沙传媒","abbreviation":"","financingTopId":null,"financingId":41,"financingName":"科创板","deptId":5,"startTime":null,"endTime":null,"delFlag":null,"endFlag":null,"completeFlag":0,"createTime":"2019-09-26 11:57:36","updateTime":null,"createBy":89,"updateBy":null,"description":"","linkProjectId":null,"startStageId":null,"endStageId":null,"startStageName":"北京市朝阳区朝阳路永丰街道19号","endStageName":null,"needApprove":null,"approveStatus":null,"useTplId":38},{"projectOrganList":null,"projectMemberRoleList":null,"picNames":"闫成龙2号","createUserIdList":[135],"deptName":"北京部","projectMemberVoList":null,"recycleBinUpdateTime":null,"projectRecycleBinInfo":null,"stopLibraryInfo":null,"projectProcess":null,"organInfo":null,"projectMemberInfo":null,"projectStatus":"进行中","createName":"闫成龙娃娃粉阿道夫撒","projectFinancingList":null,"approveResultMap":null,"linkProjectName":null,"projectNeedApprove":null,"id":328,"code":"3345134","currentImplementStageName":"北京市朝阳区朝阳路永丰街道19号","currentImplementStageId":2823,"currentStageId":1,"crmId":1,"name":"新建项目审批","abbreviation":"","financingTopId":null,"financingId":41,"financingName":"科创板","deptId":5,"startTime":null,"endTime":null,"delFlag":null,"endFlag":null,"completeFlag":0,"createTime":"2019-09-25 12:00:14","updateTime":null,"createBy":133,"updateBy":null,"description":"","linkProjectId":null,"startStageId":null,"endStageId":null,"startStageName":"北京市朝阳区朝阳路永丰街道19号","endStageName":null,"needApprove":null,"approveStatus":null,"useTplId":null},{"projectOrganList":null,"projectMemberRoleList":null,"picNames":"周12","createUserIdList":[90],"deptName":"北京部","projectMemberVoList":null,"recycleBinUpdateTime":null,"projectRecycleBinInfo":null,"stopLibraryInfo":null,"projectProcess":null,"organInfo":null,"projectMemberInfo":null,"projectStatus":"进行中","createName":"邢亚坤","projectFinancingList":null,"approveResultMap":null,"linkProjectName":null,"projectNeedApprove":null,"id":327,"code":"34568799764564564","currentImplementStageName":"北京市朝阳区朝阳路永丰街道19号","currentImplementStageId":2817,"currentStageId":1,"crmId":1,"name":"阿道夫","abbreviation":"","financingTopId":null,"financingId":41,"financingName":"科创板","deptId":5,"startTime":null,"endTime":null,"delFlag":null,"endFlag":null,"completeFlag":0,"createTime":"2019-09-24 10:51:14","updateTime":null,"createBy":132,"updateBy":null,"description":"","linkProjectId":null,"startStageId":null,"endStageId":null,"startStageName":"北京市朝阳区朝阳路永丰街道19号","endStageName":null,"needApprove":null,"approveStatus":null,"useTplId":null},{"projectOrganList":null,"projectMemberRoleList":null,"picNames":"","createUserIdList":[],"deptName":"合规风控部","projectMemberVoList":null,"recycleBinUpdateTime":null,"projectRecycleBinInfo":null,"stopLibraryInfo":null,"projectProcess":null,"organInfo":null,"projectMemberInfo":null,"projectStatus":"进行中","createName":"金超","projectFinancingList":null,"approveResultMap":null,"linkProjectName":null,"projectNeedApprove":null,"id":326,"code":"asdf","currentImplementStageName":"北京市朝阳区朝阳路永丰街道19号","currentImplementStageId":2814,"currentStageId":1,"crmId":2,"name":"阿斯顿发生全文s","abbreviation":"","financingTopId":null,"financingId":41,"financingName":"科创板","deptId":8,"startTime":null,"endTime":null,"delFlag":null,"endFlag":null,"completeFlag":0,"createTime":"2019-09-23 11:06:31","updateTime":null,"createBy":6,"updateBy":null,"description":"","linkProjectId":null,"startStageId":null,"endStageId":null,"startStageName":"北京市朝阳区朝阳路永丰街道19号","endStageName":null,"needApprove":null,"approveStatus":null,"useTplId":null},{"projectOrganList":null,"projectMemberRoleList":null,"picNames":"","createUserIdList":[],"deptName":"股权资本市场部","projectMemberVoList":null,"recycleBinUpdateTime":null,"projectRecycleBinInfo":null,"stopLibraryInfo":null,"projectProcess":null,"organInfo":null,"projectMemberInfo":null,"projectStatus":"进行中","createName":"y1","projectFinancingList":null,"approveResultMap":null,"linkProjectName":null,"projectNeedApprove":null,"id":324,"code":"4","currentImplementStageName":"北京市朝阳区朝阳路永丰街道19号","currentImplementStageId":2810,"currentStageId":1,"crmId":1,"name":"4","abbreviation":"4","financingTopId":null,"financingId":41,"financingName":"科创板","deptId":14,"startTime":null,"endTime":null,"delFlag":null,"endFlag":null,"completeFlag":0,"createTime":"2019-09-20 16:41:52","updateTime":null,"createBy":69,"updateBy":null,"description":"","linkProjectId":null,"startStageId":null,"endStageId":null,"startStageName":"北京市朝阳区朝阳路永丰街道19号","endStageName":null,"needApprove":null,"approveStatus":null,"useTplId":null},{"projectOrganList":null,"projectMemberRoleList":null,"picNames":"","createUserIdList":[],"deptName":"东北业务部","projectMemberVoList":null,"recycleBinUpdateTime":null,"projectRecycleBinInfo":null,"stopLibraryInfo":null,"projectProcess":null,"organInfo":null,"projectMemberInfo":null,"projectStatus":"进行中","createName":"何聪","projectFinancingList":null,"approveResultMap":null,"linkProjectName":"项目项目项目项目项目项目项目项目项目项目项目","projectNeedApprove":null,"id":318,"code":"585469","currentImplementStageName":"内核","currentImplementStageId":2802,"currentStageId":5,"crmId":5,"name":"撒旦","abbreviation":"是的","financingTopId":null,"financingId":41,"financingName":"科创板","deptId":7,"startTime":null,"endTime":null,"delFlag":null,"endFlag":null,"completeFlag":0,"createTime":"2019-09-18 19:00:45","updateTime":null,"createBy":4,"updateBy":null,"description":"第三方","linkProjectId":6,"startStageId":null,"endStageId":null,"startStageName":"内核","endStageName":null,"needApprove":null,"approveStatus":null,"useTplId":13},{"projectOrganList":null,"projectMemberRoleList":null,"picNames":"","createUserIdList":[],"deptName":"东北业务部","projectMemberVoList":null,"recycleBinUpdateTime":null,"projectRecycleBinInfo":null,"stopLibraryInfo":null,"projectProcess":null,"organInfo":null,"projectMemberInfo":null,"projectStatus":"进行中","createName":"何聪","projectFinancingList":null,"approveResultMap":null,"linkProjectName":"aaa","projectNeedApprove":null,"id":316,"code":"444444","currentImplementStageName":"内核","currentImplementStageId":2800,"currentStageId":5,"crmId":2,"name":"我创建的","abbreviation":"我","financingTopId":null,"financingId":41,"financingName":"科创板","deptId":7,"startTime":null,"endTime":null,"delFlag":null,"endFlag":null,"completeFlag":0,"createTime":"2019-09-18 17:53:45","updateTime":null,"createBy":4,"updateBy":null,"description":"而","linkProjectId":315,"startStageId":null,"endStageId":null,"startStageName":"内核","endStageName":null,"needApprove":null,"approveStatus":null,"useTplId":null},{"projectOrganList":null,"projectMemberRoleList":null,"picNames":"","createUserIdList":[],"deptName":"股权资本市场部","projectMemberVoList":null,"recycleBinUpdateTime":null,"projectRecycleBinInfo":null,"stopLibraryInfo":null,"projectProcess":null,"organInfo":null,"projectMemberInfo":null,"projectStatus":"进行中","createName":"何阶","projectFinancingList":null,"approveResultMap":null,"linkProjectName":null,"projectNeedApprove":null,"id":315,"code":"dsdas","currentImplementStageName":"北京市朝阳区朝阳路永丰街道19号","currentImplementStageId":2796,"currentStageId":1,"crmId":1,"name":"aaa","abbreviation":"","financingTopId":null,"financingId":41,"financingName":"科创板","deptId":14,"startTime":null,"endTime":null,"delFlag":null,"endFlag":null,"completeFlag":0,"createTime":"2019-09-18 17:45:34","updateTime":null,"createBy":11,"updateBy":null,"description":"","linkProjectId":null,"startStageId":null,"endStageId":null,"startStageName":"北京市朝阳区朝阳路永丰街道19号","endStageName":null,"needApprove":null,"approveStatus":null,"useTplId":null},{"projectOrganList":null,"projectMemberRoleList":null,"picNames":"","createUserIdList":[],"deptName":"恒泰长材","projectMemberVoList":null,"recycleBinUpdateTime":null,"projectRecycleBinInfo":null,"stopLibraryInfo":null,"projectProcess":null,"organInfo":null,"projectMemberInfo":null,"projectStatus":"进行中","createName":"金超","projectFinancingList":null,"approveResultMap":null,"linkProjectName":null,"projectNeedApprove":null,"id":314,"code":"456","currentImplementStageName":"北京市朝阳区朝阳路永丰街道19号","currentImplementStageId":2794,"currentStageId":1,"crmId":2,"name":"jinc123123","abbreviation":"","financingTopId":null,"financingId":41,"financingName":"科创板","deptId":1,"startTime":null,"endTime":null,"delFlag":null,"endFlag":null,"completeFlag":0,"createTime":"2019-09-18 10:22:02","updateTime":null,"createBy":6,"updateBy":null,"description":"","linkProjectId":null,"startStageId":null,"endStageId":null,"startStageName":"北京市朝阳区朝阳路永丰街道19号","endStageName":null,"needApprove":null,"approveStatus":null,"useTplId":null},{"projectOrganList":null,"projectMemberRoleList":null,"picNames":"","createUserIdList":[],"deptName":"债券融资总部八部","projectMemberVoList":null,"recycleBinUpdateTime":null,"projectRecycleBinInfo":null,"stopLibraryInfo":null,"projectProcess":null,"organInfo":null,"projectMemberInfo":null,"projectStatus":"进行中","createName":"y1","projectFinancingList":null,"approveResultMap":null,"linkProjectName":null,"projectNeedApprove":null,"id":313,"code":"414454","currentImplementStageName":"北京市朝阳区朝阳路永丰街道19号","currentImplementStageId":2780,"currentStageId":1,"crmId":1,"name":"5","abbreviation":"","financingTopId":null,"financingId":41,"financingName":"科创板","deptId":4,"startTime":null,"endTime":null,"delFlag":null,"endFlag":null,"completeFlag":0,"createTime":"2019-09-17 19:29:22","updateTime":null,"createBy":69,"updateBy":null,"description":"","linkProjectId":null,"startStageId":null,"endStageId":null,"startStageName":"北京市朝阳区朝阳路永丰街道19号","endStageName":null,"needApprove":null,"approveStatus":null,"useTplId":14}],"prePage":0,"nextPage":2,"isFirstPage":true,"isLastPage":false,"hasPreviousPage":false,"hasNextPage":true,"navigatePages":8,"navigatepageNums":[1,2,3,4,5,6,7,8],"navigateFirstPage":1,"navigateLastPage":8,"lastPage":8,"firstPage":1}}
                var data =  response.data;
                if(response.code == this.success_code){
                    this.reportListData = data.list;
                    this.dataTotal = data.total;
                }else{
                    this.$message(response.msg);
                }
            })).catch(error => {

            });
        },
        // 分页
        onPageChange(currentPage) {
            this.currentPage = currentPage;
            if(this.tabs == 0){
                this.getBlackList();
            }else if(this.tabs == 1){
                this.getReportList();
            }
        },
        handleSizeChange(val) {
            this.pageSize = val;
            if(this.tabs == 0){
                this.getBlackList();
            }else if(this.tabs == 1){
                this.getReportList();
            }
        },
        //黑名单列表滚动条
        getViewPortHeight() {
            // var heig = document.documentElement.clientHeight || document.body.clientHeight;
            // document.getElementById("pro_list_scro").style.height = (heig - 250) + "px";
            var heig = $(window).height();
            $('.pro_list_scro').css('height',(heig - 250) + "px");
            
        },
        // 查看报告
        viewReport(index, row){
            this.compResultVisible = true;
        },
        // 导出报告
        exportReport(index, row){
            
        }
    }
}


</script>

<style scoped lang="scss" type="text/css">
.anti-wash-money {
    position: relative;
    background: #fff;
    box-sizing:border-box;
    .el-breadcrumb {
        line-height: 46px;
        padding-left: 10px;
    }
    .page_title{
        text-align: left;
        font-size: 20px;
        font-weight: bold;
        margin:5px 0 19px;
        padding-left: 10px;
        position:relative;
    }
    .page_cen{
       height:10px;
       background: #f0f2f5;
    }
    .form_box {
        background: #fff;
        padding-left: 10px;
        .el-form-item {
            float: left;
            margin-right: 20px;
            margin-bottom: 16px;
            height: 40px;
            .el-input {
                width: 217px;
            }
            .inline-input {
                width: 217px;
            }
            .el-select {
                width: 217px;
            }
        }
        .el-button {
            float: left;
            margin-left: 20px;
            margin-top: 2px;
            margin-bottom: 18px;
        }
        .import-btn{
            position:relative;
            padding-left:40px;
            background: #0061A9;
            color: #fff;
            i{
                position:absolute;
                left:16px;
                top:8px;
                width:14px;
                height:13px;
                background-image: url("../../../assets/common_icon/import_icon.png")
            }           
        }
    }
    .el-pagination {
        margin-top: 20px;
        text-align: right;
        margin-right: 40px;
    }
    .el-tabs {
        .el-tab-pane {
            ul {
                width: 100%;
                li:nth-child(1){
                    background:rgb(250, 250, 250);
                    border-bottom: 1px solid #ccc;
                    span{
                        font-weight: bold;
                    }
                }
                li {
                width: 100%;
                height: 56px;
                line-height: 56px;
                span:nth-child(1) {
                    float: left;
                    width: 60%;
                    height: 56px;
                    line-height: 56px;
                    padding-left: 10px;
                    box-sizing: border-box;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    text-align: left;
                }
                span:nth-child(2) {
                    float: right;
                    width: 30%;
                    height: 56px;
                    line-height: 56px;
                    padding-right: 10px;
                    box-sizing: border-box;
                    text-align: right;
                }
                }
                .recover_li {
                    border-bottom:1px solid #e8e8e8;
                    &:hover {
                        background: #f5f7fa;
                    }
                }
            }
            .handle-btn{
                // width: 28px;
                height: 28px;
            }
        }
    }
    .view_report_btn{
        display: inline-block;
        width:28px;
        height:28px;
        margin-right: 10px;
        background-image: url("../../../assets/image/usermanage/view_icon_0.png")
    }
    .view_report_btn:hover{
        background-image: url("../../../assets/image/usermanage/view_icon_1.png")
    }
    .export_btn{
        display: inline-block;
        width:28px;
        height:28px;
        background-image: url("../../../assets/image/usermanage/export_icon_0.png")
    }
    .export_btn:hover{
        background-image: url("../../../assets/image/usermanage/export_icon_1.png")
    }
    // 弹窗相关
    .comp-result{
        text-align: left;
    }
    .comp-result-title{
        line-height: 24px;
        font-size:14px;
        font-weight:bold;
    }
    .comp-result-con{
        margin-top: 16px;
        line-height: 24px;
        font-size:14px;
        font-weight:400;
    }
}
.stop_take {
  width: 10%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
<style lang="scss" type="text/css">
// .anti-wash-money list_form .el-form-item{
//     position: relative;
// }
.anti-wash-money{
    .list_form .el-form-item .el-button{
        position: absolute;
        right:0;
        top:0;
        margin:0;
    }
    .el-scrollbar__wrap {
        overflow-x: hidden;
    }
    .el-tabs--border-card{
        border:none;
        box-shadow: none;
    }
    .loadDiv{
        position: fixed;
        left:0;
        top:0;
        width:100%;
        height:100%;
        z-index: 3333;
    }
    .el-dialog__header{
        border-bottom: 1px solid #e6e6e6;
    }
    .comp_report_con{
       .el-table th.is-center,.el-table td.is-center{
           text-align: left;
       } 
    }
}
</style>
