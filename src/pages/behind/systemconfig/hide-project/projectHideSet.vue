<template>
  <div class="projectlist">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>系统配置</el-breadcrumb-item>
      <el-breadcrumb-item>一键隐藏项目</el-breadcrumb-item>
    </el-breadcrumb>
      <div class="page_title">
          <span>一键隐藏项目</span>
          <div v-show="hideBtnShow" class="finance_tit">
              <el-button type="primary" class="back_btn" @click="multipleProHide">一键隐藏</el-button>
          </div>
          <div v-show="cancelHidebtnShow" class="finance_tit">
              <el-button type="primary" class="back_btn" @click="cancelMultipleProHide">取消隐藏</el-button>
          </div>
      </div>
      <div class="page_cen"></div>
    <el-tabs @tab-click="tabClick" type="border-card" v-model="tabValue">
      <el-tab-pane label="项目列表" name="项目列表" >
            <div id="pro_list_scro" v-on:keyup.enter="searchBtn">
              <el-scrollbar style="height:100%;overflow-x: hidden">
                <div>
                    <el-form ref="form"  label-width="100px" class="form_box clearfix list_form">
                        <el-form-item label="项目编码：">
                            <el-input v-model="codeCont" placeholder="请输入项目编码" :maxlength="50"></el-input>
                        </el-form-item>
                        <el-form-item label="项目名称：">
                            <el-input v-model="keyWord" placeholder="请输入项目名称" :maxlength="50"></el-input>
                        </el-form-item>
                        <el-form-item label="业务类型：">
                            <el-input v-model="financingName" placeholder="请选择业务类型" class="fin_inp" disabled></el-input>
                            <el-button  @click="optType" type="primary">选择</el-button>
                        </el-form-item>
                    </el-form>
               </div>
            <div>
              <el-form ref="form"  label-width="100px" class="form_box clearfix list_form">
                  <!-- <el-form-item label="项目状态：">
                      <el-select v-model="completeFlagName" placeholder="请选择项目状态" clearable  @change="selectRoleChange">
                          <el-option v-for="item in selectRoleList" :key="item.value" :label="item.name" :value="item.id"></el-option>
                      </el-select>
                  </el-form-item> -->
                  <el-form-item label="项目阶段：">
                      <el-select v-model="stage_name" placeholder="请选择项目阶段" clearable @change="selectStageChange" :disabled="financingName == ''">
                          <el-option v-for="item in selectStageList" :key="item.value" :lable="item.name" :value="item.name"></el-option>
                      </el-select>
                  </el-form-item>
                  <el-button size="medium" icon="el-icon-search" type="primary" @click="searchBtn">查询</el-button>
                  <el-button size="medium" icon="el-icon-refresh" @click="resetBtn(1)">重置</el-button>
              </el-form>
          </div>
        <el-table :data="tableData" fit show-header :header-cell-style="{background:'#FAFAFA',color:'#000'}"
         style="width: 100%" class="pro_table" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="code" label="项目编码" align="center" min-width="100">
              <template slot-scope="scope">
                  <p :title="scope.row.code" class="ellipsis1">{{scope.row.code}}</p>
              </template>
          </el-table-column>
          <el-table-column prop="name" label="项目名称" align="center"  min-width="100">
              <template slot-scope="scope">
                  <p :title="scope.row.name" class="ellipsis1">{{scope.row.name}}</p>
              </template>
          </el-table-column>
          <el-table-column prop="financingName" label="业务类型" align="center" min-width="100">
              <template slot-scope="scope">
                  <p :title="scope.row.financingName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.financingName}}</p>
              </template>
          </el-table-column>
          <el-table-column prop="startStageName" label="开始阶段" align="center"  min-width="100">
              <template slot-scope="scope">
                  <p :title="scope.row.startStageName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.startStageName}}</p>
              </template>
          </el-table-column>
          <el-table-column prop="currentImplementStageName" label="当前阶段" align="center"  min-width="100">
              <template slot-scope="scope">
                  <p :title="scope.row.currentImplementStageName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.currentImplementStageName}}</p>
              </template>
          </el-table-column>
          <el-table-column prop="linkProjectName" label="关联项目" align="center"  min-width="100">
              <template slot-scope="scope">
                  <p :title="scope.row.linkProjectName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.linkProjectName}}</p>
              </template>
          </el-table-column>
          <el-table-column prop="picNames" label="项目负责人" align="center"  min-width="100">
              <template slot-scope="scope">
                  <p :title="scope.row.picNames" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.picNames}}</p>
              </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center"  min-width="100">
              <template slot-scope="scope">
                  <p :title="scope.row.createTime" class="ellipsis1">{{scope.row.createTime}}</p>
              </template>
          </el-table-column>
          <el-table-column prop="deptName" label="部门" align="center"  min-width="100">
              <template slot-scope="scope">
                  <p :title="scope.row.deptName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.deptName}}</p>
              </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class="pro_edit_task">
            <template slot-scope="scope">
             <el-button type="text" 
             title="隐藏" 
             @click="singleHidePro(scope.row)"><i class="icon-operate-btn iconfont yincang" ></i></el-button>
            </template>
          </el-table-column>
        </el-table>
                <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="dataTotal" :pageSize="pageSize" :page-sizes="pageSizes" :current-page="currentPage" @current-change="onPageChange" @size-change="handleSizeChange"></el-pagination>
    </el-scrollbar>
          </div>
      </el-tab-pane>
      <el-tab-pane label="项目终止库" name="项目终止库">
          <div v-on:keyup.enter="searchBtn">
        <el-form ref="form" :model="stop_form" label-width="100px" class="form_box clearfix">
          <el-form-item label="项目编码：">
            <el-input v-model="stop_form.pro_code" placeholder="请输入项目编码" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="项目名称：">
            <el-input v-model="stop_form.pro_name" placeholder="请输入项目名称" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="终止原因：">
            <el-input v-model="stop_form.pro_text" placeholder="请输入终止原因" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="终止时间：">
            <el-date-picker @focus="$utils.handleTimeFocus" v-model="stop_form.pro_date" type="date" placeholder="请选择终止日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
            <el-button size="medium" type="primary" icon="el-icon-search" @click="searchBtn">查询</el-button>
            <el-button size="medium" @click="resetBtn(2)"  icon="el-icon-refresh">重置</el-button>
        </el-form>
        </div>
        <el-table :data="stopTableData" fit show-header  :header-cell-style="{background:'#FAFAFA',color:'#000'}"  style="width: 100%" class="pro_table"  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="code" label="项目编码" align="center" min-width="100">
              <template slot-scope="scope">
                  <p :title="scope.row.code" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.code}}</p>
              </template>
          </el-table-column>
          <el-table-column prop="name" label="项目名称" align="center" min-width="100">
              <template slot-scope="scope">
                  <p :title="scope.row.name" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.name}}</p>
              </template>
          </el-table-column>
          <el-table-column prop="financingName" label="业务类型" align="center" min-width="100">
              <template slot-scope="scope">
                  <p :title="scope.row.financingName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.financingName}}</p>
              </template>
          </el-table-column>
          <el-table-column prop="startStageName" label="开始阶段" align="center" min-width="100">
              <template slot-scope="scope">
                  <p :title="scope.row.startStageName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.startStageName}}</p>
              </template>
          </el-table-column>
          <el-table-column prop="currentImplementStageName" label="当前阶段" align="center" min-width="100">
              <template slot-scope="scope">
                  <p :title="scope.row.currentImplementStageName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.currentImplementStageName}}</p>
              </template>
          </el-table-column>
          <el-table-column prop="linkProjectName" label="关联项目" align="center" min-width="100">
              <template slot-scope="scope">
                  <p :title="scope.row.linkProjectName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.linkProjectName}}</p>
              </template>
          </el-table-column>
          <el-table-column prop="stopLibraryInfo.reason" label="终止原因" align="center" min-width="100">
              <template slot-scope="scope">
                  <p :title="scope.row.stopLibraryInfo.reason" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.stopLibraryInfo.reason}}</p>
              </template>
          </el-table-column>
          <el-table-column prop="stopLibraryInfo.description" label="终止说明" align="center" min-width="100" class-name="stop_take">
              <template slot-scope="scope">
                  <p :title="scope.row.stopLibraryInfo.description" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.stopLibraryInfo.description}}</p>
              </template>
          </el-table-column>
          <el-table-column prop="stopLibraryInfo.updateTime" label="终止时间" align="center" min-width="100">
              <template slot-scope="scope">
                  <p :title="scope.row.updateTime" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.stopLibraryInfo.updateTime}}</p>
              </template>
          </el-table-column>
          <el-table-column prop="picNames" label="项目负责人" align="center" min-width="100">
              <template slot-scope="scope">
                  <p :title="scope.row.picNames" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.picNames}}</p>
              </template>
          </el-table-column>
          <el-table-column prop="deptName" label="部门" align="center" min-width="100">
              <template slot-scope="scope">
                  <p :title="scope.row.deptName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.deptName}}</p>
              </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class="pro_edit_task">
            <template slot-scope="scope">
                    <el-button type="text" title="隐藏" 
                    @click="singleHidePro(scope.row)"><i class="icon-operate-btn iconfont yincang" ></i></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="dataTotal" :pageSize="pageSize" :page-sizes="pageSizes" :current-page="currentPage" @current-change="onPageChange" @size-change="handleSizeChange"></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="回收站" name="回收站">
          <el-table :data="objectData" fit show-header  :header-cell-style="{background:'#FAFAFA',color:'#000'}"  style="width: 100%" class="pro_table"  @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="项目名称" align="center" min-width="100">
                <template slot-scope="scope">
                    <p :title="scope.name" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.name}}</p>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" class="pro_edit_task">
                <template  slot-scope="scope">
                        <el-button type="text" title="隐藏" 
                        @click="singleHidePro(scope.row)"><i class="icon-operate-btn iconfont yincang" ></i></el-button>
                </template>
            </el-table-column>
          </el-table>
        <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="dataTotal" :pageSize="pageSize" :page-sizes="pageSizes" :current-page="currentPage" @current-change="onPageChange" @size-change="handleSizeChange"></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="已隐藏的项目" name="已隐藏的项目">
            <div id="pro_list_scro2" v-on:keyup.enter="searchBtn">
                <el-scrollbar style="height:100%;overflow-x: hidden">
                    <div>
                        <el-form ref="form"  label-width="100px" class="form_box clearfix list_form">
                            <el-form-item label="项目编码：">
                                <el-input v-model="hideProSearch.proCode" placeholder="请输入项目编码" :maxlength="50"></el-input>
                            </el-form-item>
                            <el-form-item label="项目名称：">
                                <el-input v-model="hideProSearch.proName" placeholder="请输入项目名称" :maxlength="50"></el-input>
                            </el-form-item>
                            <el-form-item label="业务类型：">
                                <el-input v-model="hideProSearch.financingName" placeholder="请选择业务类型" class="fin_inp" disabled></el-input>
                                <el-button  @click="optType" type="primary">选择</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                <div>
                    <el-form ref="form"  label-width="100px" class="form_box clearfix list_form">
                        <!-- <el-form-item label="项目状态：">
                            <el-select v-model="hideProSearch.pro_status_id" placeholder="请选择项目状态" clearable  @change="selectRoleChange">
                                <el-option v-for="item in selectRoleList" :key="item.value" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item> -->
                        <el-form-item label="项目阶段：">
                            <el-select v-model="hideProSearch.pro_stage_name" placeholder="请选择项目阶段" clearable @change="selectStageChange" :disabled="hideProSearch.financingName == ''">
                                <el-option v-for="item in hideProSelectStageList" :key="item.value" :lable="item.name" :value="item.name"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-button size="medium" icon="el-icon-search" type="primary" @click="searchBtn">查询</el-button>
                        <el-button size="medium" icon="el-icon-refresh" @click="resetBtn(3)">重置</el-button>
                    </el-form>
                </div>
            <el-table :data="pigeonholeTableData" fit show-header :header-cell-style="{background:'#FAFAFA',color:'#000'}" style="width: 100%" class="pro_table"  @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="code" label="项目编码" align="center" min-width="100">
                    <template slot-scope="scope">
                        <p :title="scope.row.code" class="ellipsis1">{{scope.row.code}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="项目名称" align="center"  min-width="100">
                    <template slot-scope="scope">
                        <p :title="scope.row.name" class="ellipsis1">{{scope.row.name}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="financingName" label="业务类型" align="center" min-width="100">
                    <template slot-scope="scope">
                        <p :title="scope.row.financingName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.financingName}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="startStageName" label="开始阶段" align="center"  min-width="100">
                    <template slot-scope="scope">
                        <p :title="scope.row.startStageName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.startStageName}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="currentImplementStageName" label="当前阶段" align="center"  min-width="100">
                    <template slot-scope="scope">
                        <p :title="scope.row.currentImplementStageName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.currentImplementStageName}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="linkProjectName" label="关联项目" align="center"  min-width="100">
                    <template slot-scope="scope">
                        <p :title="scope.row.linkProjectName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.linkProjectName}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="picNames" label="项目负责人" align="center"  min-width="100">
                    <template slot-scope="scope">
                        <p :title="scope.row.picNames" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.picNames}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center"  min-width="100">
                    <template slot-scope="scope">
                        <p :title="scope.row.createTime" class="ellipsis1">{{scope.row.createTime}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="deptName" label="部门" align="center"  min-width="100">
                    <template slot-scope="scope">
                        <p :title="scope.row.deptName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.deptName}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" class="pro_edit_task">
                    <template slot-scope="scope">
                            <el-button type="text"
                            title="取消隐藏" 
                            @click="cancelSingleHidePro(scope.row)"><i class="icon-operate-btn iconfont yanjing" ></i></el-button>
                    </template>
                </el-table-column>
                </el-table>
            <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="dataTotal" :pageSize="pageSize" :page-sizes="pageSizes" :current-page="currentPage" @current-change="onPageChange" @size-change="handleSizeChange"></el-pagination>
            </el-scrollbar>
            </div>
        </el-tab-pane>
    </el-tabs>
    <!--融资类型弹框-->
        <project-type v-if="typeFlag" :typeObj='typeObj' :state="state"  v-on:typeProject='typeProject' :optState="optState"></project-type>
      <!--loading-->
      <div v-if="loadFlag" class="loadDiv" v-loading="true" element-loading-text="数据处理中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"></div>
  </div>
</template>

<script>
import projectType from "@/components/dialogcommon/projecttype";
export default {
  name: "projectHideSet",
  components: {
      projectType
  },
  data() {
    return {
        tabValue: '项目列表',
        loadFlag:false,
        hideBtnShow:true,//一键隐藏
        cancelHidebtnShow: false,//取消隐藏
        //融资类型
        typeFlag:false,
        typeObj:[],
        state:1,
        tabs:'0',
        selectRoleList: [
            {
                id: '0',
                name: "进行中"
            },
            {
                id: '1',
                name: "已完成"
            }
        ],
        selectStageList:[],//项目列表tab页项目阶段列表
        hideProSelectStageList:[],//已隐藏的项目tab页项目阶段列表
        tableData: [],
        pageSize: 10,
        pageSizes: [10, 20, 50, 100], //每页显示数量
        currentPage: 1, //当前页
        dataTotal: 0, //总量
        //回收站
        objectData: [],
        cover_data:true,
        //  终止库
        stop_form: {
          pro_code: "",
          pro_name: "",
          pro_text: "",
          pro_date: ""
        },
        stopTableData: [],     
        token:"",
        userId:'',
        projectId:"",
        requestCode: {},//请求返回码验证
        codeCont:'',
        keyWord:'',
        financingId:'',
        stage_id:'',
        completeFlagName:'',//搜索条件项目状态
        completeFlag:'',//项目状态id
        financingName:'',
        stage_name:'',
        addProjectId:'',
        addProjectName:'',
        financingParentId:'',
        optState:{},
        //隐藏项目
        pigeonholeTableData: [],//已隐藏的项目列表
        hideProSearch: {//已隐藏的项目搜索条件
            proCode: '',//项目编码
            proName: '',//项目名称
            financingId: '',//融资类型id
            financingName: '',//融资类型name
            pro_status_id: '',//项目状态id
            pro_stage_id: '',//项目阶段id
            pro_stage_name: ''//项目阶段name
        },
        selectedPro: [],//选中的项目
    };
  },
  created(){
      var pro_id = JSON.parse(sessionStorage.getItem("project_id"));
      if(pro_id == 0){
          var obj = {};
          this.$store.commit("projectId",0);
          this.$store.commit("projectMsg",obj);
      }
      this.token = this.$store.state.loginObject.userToken;
      this.userId = this.$store.state.loginObject.userId;
      this.projectId = this.$store.state.projectMsg.pro_id;
      this.requestCode = this.code.codeNum;
      this.reqApi = global.baseUrl;
    //   this.$store.commit("hideProject", this.hideProIds);
  },
  mounted() {
      this.projectList();
      $(".menu_btn").show();
      this.getViewPortHeight();
  },
  beforeRouteLeave(to, from, next) {
      to.meta.keepAlive = false;
      next();
  },
  computed:{
    
  },
  watch:{
      objectData(val){
          if(this.objectData.length < 1){
              this.cover_data = true;
          }else{
              this.cover_data = false;
          }
      }
  },
  methods: {
    //项目列表滚动条
    getViewPortHeight() {
        var heig = document.documentElement.clientHeight || document.body.clientHeight;
        document.getElementById("pro_list_scro").style.height = (heig - 250) + "px";
        document.getElementById("pro_list_scro2").style.height = (heig - 250) + "px";
    },
    //项目列表
    projectList(){
          var listObj = {
              "token": this.token,
              "userId": this.userId,
              "pageNo": this.currentPage,
              "pageSize": this.pageSize,
              "data": {
                  "code":this.codeCont,
                  "name":this.keyWord,
                  "financingId":this.financingId,
                  "completeFlag":this.completeFlag,//项目状态id(查询条件可不填)
                  "currentStageId":this.stage_id
              }
          };
          var that = this;
        this.$post("/info/project/selectProjectForHide",listObj).then((response => {
            var data =  response.data;
            if(response.code == that.code.codeNum.SUCCESS){
                that.tableData = data.list;
                that.dataTotal = data.total;
                for(var i=0;i<that.tableData.length;i++){
                  if(that.tableData[i].createBy == that.userId){
                      that.tableData[i].isCreatePerson = true;
                  } else {
                      that.tableData[i].isCreatePerson = false;
                  }
                }
                that.getViewPortHeight();
            }else{
                this.$message(response.msg);
            }
        })).catch(error => {

        });
    },
    //获取已隐藏的项目列表
    getHideProList(){
        let data = {
            "token": this.token,
            "userId": this.userId,
            "pageNo": this.currentPage,
            "pageSize": this.pageSize,
            "data": {
                "code": this.hideProSearch.proCode,//项目编码（查询条件，可不填）
                "name": this.hideProSearch.proName,//项目名称（查询条件，可不填）
                "financingId": this.hideProSearch.financingId,//融资类型id（查询条件，可不填）
                "currentStageId": this.hideProSearch.pro_stage_id,//当前执行阶段的源阶段id（查询条件，可不填）
                "completeFlag": this.hideProSearch.pro_status_id//项目状态id(查询条件可不填)
            }
        }
        this.$post("/info/project/selectHideProject",data).then(res => {
            if(this.requestCode.SUCCESS !== res.code){
                this.$message(res.msg);
                return;
            }
            this.pigeonholeTableData = res.data.list;
            this.dataTotal = res.data.total;
        }).catch(error => {

        });
    },
    //隐藏项目
    setHide(arr){        
        let data = {
            "token": this.token,
            "userId": this.userId,
            "data": {
                "projectIdList": arr
            }
        }
        this.$post("/info/project/batchHideProject",data).then(res => {
            if(this.requestCode.SUCCESS !== res.code){
                this.$message.error(res.msg);
                return;
            }
            if(this.tabs == 0){
                this.projectList();
                this.selectedPro = [];//清空选中的列表
            } else if(this.tabs == 1){
                this.projectStop();
                this.selectedPro = [];//清空选中的列表
            } else if(this.tabs == 2){
                this.projectRecovery();
                this.selectedPro = [];//清空选中的列表
            } else if(this.tabs == 3){
                this.getHideProList(); //已隐藏的项目
                this.selectedPro = [];//清空选中的列表
            }
            if(arr.indexOf(this.projectId) != -1){
                this.$store.commit("hideProject", [this.projectId])
            }
            this.$message.success(res.msg);
        }).catch(error => {

        });
    },
    //取消隐藏项目
    cancelHide(arr){        
        let data = {
            "token": this.token,
            "userId": this.userId,
            "data": {
                "projectIdList": arr
            }
        }
        this.$post("/info/project/batchCancelHideProject",data).then(res => {
            if(this.requestCode.SUCCESS !== res.code){
                this.$message.error(res.msg);
                return;
            }
            this.getHideProList();
            this.$message.success(res.msg);
            if(arr.indexOf(this.projectId) != -1){
                this.$store.commit("hideProject", [])
            }
        }).catch(error => {

        });
    },
    multipleProHide(){
        if(this.selectedPro.length !== 0){
            let arr = [];
            for(let i=0;i<this.selectedPro.length;i++){
                arr.push(this.selectedPro[i].id)
            }
            this.setHide(arr);
        } else {
            this.$message.warning("请先选择项目");
            return;
        }       
    },
    singleHidePro(row){
        let arr = [];      
        arr.push(row.id);
        this.setHide(arr);
    },
    cancelMultipleProHide(){
        if(this.selectedPro.length !== 0){
            let arr = [];
            for(let i=0;i<this.selectedPro.length;i++){
                arr.push(this.selectedPro[i].id)
            }
            this.cancelHide(arr);
        } else {
            this.$message.warning("请先选择项目");
            return;
        }       
    },
    cancelSingleHidePro(row){
        let arr = [];      
        arr.push(row.id);
        this.cancelHide(arr);
    },
    handleSelectionChange(val){
        this.selectedPro = val;
    },
    //项目阶段
    projectStage(financingId){
        var listObj = {
            "token": this.token,
            "userId": this.userId,
            "data": {
                "financingId":financingId,
            }
        };
        var that = this;
        this.$post("/info/project/getImplementStageListByFinancingId",listObj).then((response => {
            var data =  response.data;
            if(response.code == that.code.codeNum.SUCCESS){
                if(this.tabs === '0'){
                    that.selectStageList = data;
                } else if(this.tabs === '3'){
                    that.hideProSelectStageList = data;
                }                
            }else{
                this.$message(response.msg);
            }
        })).catch(error => {
              console.log(error);
        });
    },
    selectStageChange(val){
        if (this.tabs == 0){
            for(var i=0;i<this.selectStageList.length;i++){
                if(val==this.selectStageList[i].name){
                    this.stage_id = this.selectStageList[i].copySourceStageId;
                } else if(val == ''){
                    this.stage_id = '';
                }
            }
        } else if (this.tabs == 3) {
            for(var i=0;i<this.hideProSelectStageList.length;i++){
                if(val==this.hideProSelectStageList[i].name){
                    this.hideProSearch.pro_stage_id = this.hideProSelectStageList[i].copySourceStageId;
                } else if(val == ''){
                    this.hideProSearch.pro_stage_id = '';
                }
            }
        }     
    },
    //项目状态
    selectRoleChange(val){
        this.completeFlag = val;
    }, 
    //  回收站列表
    projectRecovery(){
        var recover = {
            "token": this.token,
            "userId": this.userId,
            "pageNo": this.currentPage,
            "pageSize": this.pageSize,
            "data": {}
        };
        var that = this;
        this.$post("/info/project/getDelProjectListForHide",recover).then((response => {
            var data =  response.data;
            if(response.code == that.code.codeNum.SUCCESS){
                that.objectData = data.list;
                for(var i=0;i<that.objectData.length;i++){
                    that.objectData[i].cover = true;
                }
                that.dataTotal = data.total;
            }else{
                this.$message(response.msg);
            }
        })).catch(error => {
              console.log(error);
        });
    },
    //  项目终止库
    projectStop(){
        var date = "";
        if(this.stop_form.pro_date != "" && this.stop_form.pro_date != null){
            date = this.stop_form.pro_date + " 00:00:00";
        }
        var stopObj = {
            "token": this.token,
            "userId": this.userId,
            "pageNo": this.currentPage,
            "pageSize": this.pageSize,
            "data": {
                "code":this.stop_form.pro_code,
                "name":this.stop_form.pro_name,
                "stopLibraryInfo":{
                    "reason":this.stop_form.pro_text,
                    "updateTime":date
                }
              }
        };
        var that = this;
        this.$post("/info/project/getFinishProjectListForHide",stopObj).then((response => {
            var data =  response.data;
            if(response.code == that.code.codeNum.SUCCESS){
                that.stopTableData = data.list;
                that.dataTotal = data.total;
            }else{
                this.$message(response.msg);
            }
        })).catch(error => {

        });
    },
    // tab切换
    tabClick(tab, e) {
        this.tabs = tab.index;
        this.pageSize = 10;
        this.currentPage = 1;
        this.dataTotal = 0;
      if(tab.index === '3'){
        this.cancelHidebtnShow = true;
      }else{
        this.cancelHidebtnShow = false;
        this.hideBtnShow = true;
        this.$forceUpdate()
      }
      switch (e.target.innerText) {
        case "项目列表":
          this.projectList();
          this.selectedPro = [];//清空选中的列表
          break;
        case "项目终止库":
          this.projectStop();
          this.selectedPro = [];//清空选中的列表
          break;
        case "回收站":
            this.projectRecovery();
            this.selectedPro = [];//清空选中的列表
          break;
        case "已隐藏的项目":
          this.getHideProList(); //已隐藏的项目
          this.selectedPro = [];//清空选中的列表
          break;
      }
    },
    //  选择融资类型
    optType(){
        var typeObj = { "token": this.token, "userId": this.userId, "data": {} };
        var that = this;
        var url = "/info/project/getAllFinanceType";       
        this.$post(url, typeObj).then((response => {
            var data =  response.data;
            if(response.code == that.code.codeNum.SUCCESS){
                that.typeFlag = true;
                that.state = 1;
                that.typeObj = data;
                that.optState = {value:val};
            }else{
                this.$message(response.msg);
            }
        })).catch(error => {

        });
    },
    //融资类型返回值
    typeProject(data){
          if(data.length > 0){
              if(this.tabs == 0){
                  this.financingId = data[0].id;
                  this.financingName = data[0].label;
                  this.projectStage(this.financingId);
              }else{
                  this.hideProSearch.financingId = data[0].id;
                  this.hideProSearch.financingName = data[0].label;
                  this.projectStage(this.hideProSearch.financingId);
              }
          }else{
              if(this.tabs == 0){
                  this.financingId = "";
                  this.financingName = "";
                  this.selectStageList = [];
              }else{
                  this.hideProSearch.financingId = "";
                  this.hideProSearch.financingName = "";
                  this.hideProSelectStageList = [];
              }
          }
    },
    // 查询
    searchBtn() {
      if (this.tabs == 0){
          this.currentPage = 1;
          this.projectList();
      } else if (this.tabs == 1) {
          this.currentPage = 1;
          this.projectStop();
      }  else if (this.tabs == 3) {
          this.currentPage = 1;
          this.getHideProList(); //已隐藏的项目
      }
    },
    // 重置
    resetBtn(val){
        if(val == 1){
            this.codeCont = "";
            this.keyWord = "";
            this.financingName = "";
            this.completeFlagName = "";
            this.stage_name = "";
            this.financingId = "";
            this.stage_id = "";
            this.completeFlag = "";
        }else if(val == 2){
            this.stop_form = {
                pro_code: "",
                pro_name: "",
                pro_text: "",
                pro_date: ""
            };
        } else {
            this.hideProSearch = {//已隐藏的项目搜索条件
                proCode: '',//项目编码
                proName: '',//项目名称
                financingId: '',//融资类型id
                financingName: "",//融资类型名称
                pro_status_id: '',//项目状态id
                pro_stage_id: ''//项目阶段id
            }
        }
    },
    // 分页
    onPageChange(currentPage) {
        this.currentPage = currentPage;
        if(this.tabs == 0){
            this.projectList();
        }else if(this.tabs == 1){
            this.projectStop();
        }else if(this.tabs == 3){
          this.getHideProList();
        }else{
            this.projectRecovery();
        }
    },
    handleSizeChange(val) {
        this.pageSize = val;
        if(this.tabs == 0){
            this.projectList();
        }else if(this.tabs == 1){
            this.projectStop();
        }else if(this.tabs == 3){
          this.getHideProList();
        }else{
            this.projectRecovery();
        }
    },
  }
}
</script>
<style scoped lang="scss" type="text/css">
.projectlist {
  position: relative;
  background: #fff;
    box-sizing:border-box;
      .el-breadcrumb {
             line-height: 46px;
             padding-left: 10px;
      }
      .page_title{
        position: relative;
          text-align: left;
          font-size: 20px;
          font-weight: bold;
          margin:5px 0 19px;
          padding-left: 10px;
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
    }
  }
  .form_box_cus{
      .el-form-item:nth-child(even){
           margin-left: 25px;
      }
  }
  .form_box_pro{

      .el-form-item:nth-child(even){
           margin-left: 25px;
      }
  }
  .el-table {
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
    }
  }
  .el-dialog {
    .visit_box {
        .visit_search{
            label{
                font-size: 16px;
            }
            .el-button{
                position: relative;
                left: -4px;
                top:-1px;
            }
        }
      .cont_box {
        margin-top: 20px;
        padding: 20px;
        box-sizing: border-box;
        /*background: #ccc;*/
        .no_search {
          text-align: center;
          vertical-align: middle;
          font-size: 14px;
            color:#999;
        }
        .null_search {
          text-align: center;
          vertical-align: middle;
          font-size: 14px;
            color:#999
        }
        .search_result {
          .result_box {
            line-height: 24px;
          text-align:left;
          margin-bottom:16px;
            label {
              /*width: 120px;*/
                margin-left: 20px;
              text-align: right;
                display: inline-block;
            }
            div {
              display: inline-block;
              text-align: left;
            }
          }
        }
      }
    }
    .opt_task {
      height: 450px;
      .el-scrollbar {
        .temp_task {
          width: 100%;
          text-align: left;
          /*margin-bottom: 20px;*/
          .temp_tit {
            font-size: 16px;
            font-weight: bolder;
            line-height: 26px;
              img{
                  margin-right: 8px;
              }
          }
            p{
                line-height: 30px;
            }
          .temp_type {
            width: 100%;
            margin-top:8px;
            .temp_box {
              float: left;
              margin: 0 20px 20px 0;
              width: 220px;
              height: 140px;
              position: relative;
              cursor: not-allowed;
                color:#fff;
            img{
                width: 100%;
                height:100%;
                z-index: -1;
            }
              span {
                position: absolute;
                color: #fff;
                right: 5px;
                top: 5px;
                z-index: 20;
                cursor: pointer;
              }
              p {
                  position: absolute;
                  left: 0;
                  top:0;
                  z-index: 3;
                width: 100%;
                height: 100%;
                text-align: center;
                vertical-align: middle;
                padding: 20px;
                box-sizing: border-box;
                  /*color: #fff;*/
                  line-height: 100px;
                  background: rgba(0,0,0,0);
                  overflow:hidden;
                  text-overflow:ellipsis;
                  white-space:nowrap
              }
              .check_icon{
                position: absolute;
                left: 16px;
                top: 16px;
                width: 42px;
                height: 32px;
                z-index: 10;
              }
            }
            .classA{
                color:#ecad40;
                cursor:pointer;
            }
          }
        }
        .other_task {
          width: 100%;
          text-align: left;
          .temp_tit {
            font-size: 16px;
            font-weight: bolder;
            line-height: 26px;
            img{
                margin-right: 8px;
            }
          }
            p{
                line-height: 30px;
            }
          .temp_type {
            width: 100%;
          margin-top:8px;
            .temp_box {
              float: left;
              margin: 0 20px 20px 0;
              width: 220px;
              height: 140px;
              position: relative;
              cursor: pointer;
                img{
                    width: 100%;
                    height:100%;
                    z-index: -1;
                }
              span {
                position: absolute;
                color: #fff;
                right: 5px;
                top: 5px;
                z-index: 20;
                cursor: pointer;
              }
              p {
                  position: absolute;
                  left: 0;
                  top:0;
                  z-index: 3;
                width: 100%;
                height: 100%;
                text-align: center;
                vertical-align: middle;
                padding: 20px;
                box-sizing: border-box;
                color: #fff;
                 line-height: 100px;
                  overflow:hidden;
                  text-overflow:ellipsis;
                  white-space:nowrap
              }
            }
          }
        }
      }
    }
    .task_modul {
      height: 350px;
      .el-scrollbar {
        .modul_box {
          .task_show {
            display:inline-block;
            vertical-align: text-top;
            width: 390px;
            padding: 5px 10px;
            box-sizing: border-box;
            margin-right: 10px;
            .task_tit {
              line-height: 24px;
                text-align:left;
                font-size: 18px;
                color: #333333;
                margin-bottom: 8px;
              span {
                display: inline-block;
                margin-right: 5px;
              }
            }
            ul {
              width: 100%;
              .task_li {
                width: 100%;
                margin-bottom: 10px;
                border: 1px solid #e7e7e7;
                box-sizing: border-box;
                overflow-x: hidden;
                text-align: left;
                box-shadow:0 4px 4px rgb(237, 237, 237);
                background: #fff;
                border-radius: 4px;
                .task_li_title{
                    margin: 16px 0 16px 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 14px;
                    color: #333333;
                    a{
                        display: flex;
                        align-items: center;
                        .task_li_title_check{
                            margin-left: 8px;
                            display: flex;
                            align-items: center;
                            span{
                                width: 250px;
                                display: block;
                                overflow:hidden;
                                text-overflow:ellipsis;
                                white-space:nowrap;
                            }
                        }

                    }
                }
                .task_li_time{
                    margin-left: 34px;
                    color: #1890FF;
                    font-size: 14px;
                }
                .task_li_clutter{
                    display: flex;
                    margin: 8px 0 16px 34px;
                    color: #14161A;
                    p:nth-child(2){
                        margin-left: 6px;
                    }
                }
              }
              .add_li {
                width: 100%;
                height: 30px;
                border: 1px solid #e7e7e7;
                box-sizing: border-box;
                text-align: center;
                line-height: 30px;
                font-weight: bolder;
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
}
/* 归档相关 */
.borrowRecord_dialog{
  .borrowRecord_middle{
      margin: 0 24px 0 24px;
      .b_middle_title{
          width: 100%;
          color:rgba(51,51,51,1);
          font-size: 16px;
          margin-top: 18px;
          font-weight:bold;
      }
      .b_middle_nav{
          width: 100%;
          display: flex;
          margin-top: 23px;
          .b_middle_nav_chunk{
              display: flex;
              align-items: center;
              justify-content: center;
              .b_middle_nav_chunk_title{
                  display: inline-block;
                  color: #000000;
              }
              .b_middle_nav_chunk_title_borPeople{
              }
              .b_middle_nav_chunk_title_borTime{
                  margin-left: 36px;
              }
              .b_middle_nav_chunk_borPeople{
                  width: 210px;
                  margin-left: 18px;
              }
              .b_middle_nav_chunk_borTime{
                  width: 350px;
                  margin-left: 9px;
              }
          }
          .b_middle_nav_chunkBtn{
              width: 70px;
              margin-left: 10px;
          }
      }
      .b_middle_list{
        height: 700px;
        .b_middle_chunk{
          border-top: 1px solid  rgba(221,221,221,1);
          margin: 20px 0;
          width: 100%;
          .b_middle_chunk_item{
              margin-top: 16px;
              color: #333333;
              display: flex;
              .b_middle_chunk_item_examineAll{
                  color: #1A5FA4;
                  font-weight:400;
                  text-decoration: underline;
                  cursor: pointer;
                  position: relative;
                  .box_card{
                    width: 372px;
                    position: absolute;
                    left:90px;
                    top: -50px;
                    .box_card_item{
                      width: 100%;
                      max-height: 500px;
                      display: flex;
                      flex-direction: column;
                      overflow-y: scroll;
                      overflow-x: hidden;
                      p{
                        width: 330px;
                        display: flex;
                        .box_card_item_fileIcon{
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
                        .box_card_item_title{
                          width: 300px;
                          overflow:hidden;
                          text-overflow:ellipsis;
                          white-space:nowrap;
                        }
                      }
                    }
                  }
              }
              .b_middle_chunk_item_chunk{
                  display: flex;
                  flex-direction: column;
                  .b_middle_chunk_item_chunk_content{
                      .b_middle_chunk_item_chunk_content_item{
                          width: 800px;
                          margin-top: 12px;
                          overflow:hidden;
                          text-overflow:ellipsis;
                          white-space:nowrap;

                      }
                      .b_middle_chunk_item_chunk_content_item:nth-child(1){
                          margin-top: 0;
                      }

                  }
                  .b_middle_chunk_item_chunk_examineAll{
                      color: #1A5FA4;
                      font-weight:400;
                      margin-top: 15px;
                      text-decoration: underline;
                      cursor: pointer;
                  }
              }
          }
          .b_middle_chunk_item:nth-child(1){
              margin-top: 20px;
          }
        }
        .b_middle_list_noData{
          margin-top: 30px;
          text-align: center;
        }
      }

  }
}
.borrow_dialog{
  .borrow_middle{
      margin: 0 24px 0 24px;
      .borrow_middle_chunk{
          display: flex;
          .borrow_middle_chunk_title{
              display: inline-block;
              margin-right: 14px;
              display: inline-block;
              font-size: 12px;
              width: 66px;
          }
          .borrow_middle_chunk_type{
              height: 20px;
              vertical-align: middle;
              display: inline-block;

              // display: flex;
              // justify-content: center;
              // align-items: center;
          }
          .borrow_middle_chunk_time{
              display: flex;
              flex-direction: column;
              .borrow_middle_chunk_time_top{
                  width: 330px;
                  .el-select{
                      width: 100%;
                  }
              }
          }
          .borrow_middle_chunk_left{
              width: 408px;
              height: 384px;
              border:1px solid #DDDDDD;
              display: flex;
              flex-direction: column;
              border-radius: 5px;
              .borrow_middle_chunk_left_top{
                  .borrow_middle_chunk_left_top_search{
                      margin: 15px 41px 16px 15px;
                      width: 354px;
                  }
              }
              .borrow_middle_chunk_left_bottom{
                  height: 315px;
                  .borrowList{
                    .borrowList_item{
                      padding-left: 15px;
                      margin-top: 5px;
                      display: flex;
                      align-items: center;
                      cursor: pointer;
                      .borrowList_item_title{
                        width: 300px;
                        overflow:hidden;
                        text-overflow:ellipsis;
                        white-space:nowrap;
                        margin-left: 5px;
                      }
                    }
                    .borrowList_title{
                      text-align: center;
                    }
                  }
              }
          }
          .borrow_middle_chunk_right{
              width: 408px;
              height: 384px;
              border:1px solid #DDDDDD;
              margin-left: 10px;
              border-radius: 5px;
              .borrow_middle_chunk_right_title{

                  padding: 19px 0 0 15px;
              }
              .borrow_middle_chunk_right_list{
                  height: 345px;
                  display: flex;
                  flex-direction: column;
                  .borrow_middle_chunk_right_list_item{
                      width: 100%;
                      margin-top: 3px;
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      padding: 5px 0 5px 0;
                      .borrow_middle_chunk_right_list_item_title{
                          display: inline-block;
                          max-width: 326px;
                          overflow: hidden;
                          text-overflow: ellipsis;
                          white-space: nowrap;
                          padding-left: 15px;
                      }
                      .borrow_middle_chunk_right_list_item_del{
                          display: inline-block;
                          color: #1462A3;
                          padding-right: 19px;
                          cursor: pointer;
                      }
                  }
                  .borrow_middle_chunk_right_list_item:hover{
                    background: #F7F9FB;
                  }
              }
          }
          .borrow_middle_chunk_remark{
              width: 830px;
          }
          .borrow_middle_chunk_content{
              flex:1;
              display: flex;
              flex-direction: column;
              .borrow_middle_chunk_content_title{
                  color: #333333;
              }
              .borrow_middle_chunk_content_middle{
                  display: flex;
                  flex-direction: column;
                  .borrow_middle_chunk_content_middle_title{
                      margin-top: 22px;
                      .borrow_middle_chunk_content_middle_title_people{
                          color: #333333;
                      }
                      .borrow_middle_chunk_content_middle_title_annotation{
                          color: #999999;
                      }
                  }
                  .borrow_middle_chunk_content_middle_title:nth-child(1){
                    margin-top: 0;
                  }
                  .borrow_middle_chunk_content_middle_operation{
                      width: 100%;
                      margin-top: 10px;
                      display: flex;
                      align-items: center;
                      cursor: pointer;
                      .borrow_middle_chunk_content_middle_operation_title{
                          color: #1462A3;
                          margin-left: 6px;
                      }
                  }
                  .borrow_middle_chunk_content_middle_list{
                      max-height: 216px;
                      overflow-y: scroll;
                      .el-tag {
                          margin: 10px 10px 10px 0;
                      }
                  }
              }
              .borrow_middle_chunk_content_remark{
                display: flex;
                .borrow_middle_chunk_content_remark_title{
                  display: inline-block;
                  color: #000000;
                  width: 66px;
                  overflow: hidden;
                }
                .borrow_middle_chunk_content_remark_content{
                  width: 740px;
                }
              }
          }
      }
      .borrow_middle_chunk:nth-child(1){
          margin-top: 24px;
      }
      .borrow_middle_chunk:nth-child(2){
          margin-top: 18px;
          align-items: center;
      }
      .borrow_middle_chunk:nth-child(3){
          margin-top: 14px;
          margin-left: 80px;
      }
      .borrow_middle_chunk:nth-child(4){
          margin-top: 20px;
      }
      .borrow_middle_chunk:nth-child(5){
          margin-top: 20px;
      }
  }
}
.stop_take {
  width: 10%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.finance_tit {
    position: absolute;
    right: 15px;
    top: -15px;
    z-index: 10;
    .el-button {
        float: right;
        margin-right: 10px;
    }
    span {
        color: #333;
        font-size: 16px;
        line-height: 32px;
    }
}
</style>
<style>
    .projectlist .el-dialog__header{
        text-align: center;
        border-bottom:1px solid #e6e6e6;
    }
    .projectlist .task_dialog .el-dialog{
        background: #f5f6f9;
    }
    .projectlist list_form .el-form-item{
        position: relative;
    }
    .projectlist .list_form .el-form-item .el-button{
        position: absolute;
        right:0;
        top:0;
        margin:0;
    }

    .projectlist .el-textarea {
        width: 580px;
    }

    .projectlist .dialog_tit {
  font-size: 16px;
  font-weight: 600;
    display: block;
    text-align: left;
    line-height: 40px;
}
    .projectlist .dialog_tit_zhong{
    display: flex;
    justify-content: space-between;
}
    .projectlist .dialog_tit_zhong .add_finan{
    font-size: 12px;
    font-weight: none;
}
    .projectlist .el-scrollbar__wrap {
  overflow-x: hidden;
}
    .projectlist .form_box .opt_btn {
  position: absolute;
  top: -2px;
  right: 0;
  /*height: 38px;*/
}
    .projectlist .add_finan {
  text-align: right;
    margin-bottom: 10px;
}
.projectlist .form_box .add_finan .add_finan_tit {
  float: none;
    margin-right: 50px;
    cursor: pointer;
}
    .projectlist .skip_btn {
  float: right;
  margin-left: 30px;
}

    .projectlist .fin_inp input{
        padding-right: 70px;
    }
    .projectlist .prin_user .el-input__inner{
        padding-right: 70px;
    }
    .projectlist .cus_prin .opt_btn{
        width:70px;
        padding-left: 0;
        padding-right: 0;
    }
    .projectlist .team_box_div{
        width:337px;
        float: left;
        margin-right: 20px;
        margin-bottom: 16px;
    }
    .projectlist .team_box_div label{
        width:120px;
        text-align: right;
        float: left;
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 0;
        box-sizing: border-box;
    }
    .projectlist .team_box_div .el-input{
        width:217px;
    }
    .projectlist .team_box_div .el-input input{
        width:217px;
    }
    .projectlist .el-table__body-wrapper td{
        /*padding: 0;*/
    }
    .projectlist .el-tabs--border-card{
        border:none;
        box-shadow: none;
    }
    .projectlist .el-select-dropdown__list {
        padding-bottom: 14px;
    }

    @media screen and (max-width:1650px){
        .projectlist .opt_task {
            height:400px !important;
        }
        .projectlist .newProDiv{
            height:400px !important
        }
    }
    .projectlist .loadDiv{
        position: fixed;
        left:0;
        top:0;
        width:100%;
        height:100%;
        z-index: 3333;
    }
    #app .projectlist .el-scrollbar__wrap{
        overflow-x: auto;
    }
    /* 归档相关 */
    .borrow_dialog .el-dialog__body{
        padding: 0;
        text-align: left;
    }
    .borrow_dialog .el-textarea{
        width: 100%;
    }
    .borrowZtree{
        width: 100%;
        height: 100%;
    }
    .borrowZtree li a .button{
        float: left;
    }
    .borrowZtree li a .node_name{
        width: 300px;
        display: inline-block;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        font-size:14px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .borrowZtree li a .diyState{
        display: inline-block;
        float: right;
        margin-left: 10px;
    }
    .borrowZtree li a.curSelectedNode{
        padding-top: 0px;
        background:#F0F0F0;
        color: black;
        height: 16px;
        border: 1px #F0F0F0 solid;
        opacity: 0.8;
    }
    .borrowZtree li span.switch{
        display: none;
    }
    .borrowRecord_dialog .el-dialog__body{
        padding: 0;
        text-align: left;
    }
    .borrow_dialog .el-textarea {
        width: 100%;
    }
</style>
