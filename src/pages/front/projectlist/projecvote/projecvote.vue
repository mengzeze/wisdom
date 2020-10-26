<template>
  <div class="projecvote" id="projectId">
    <div class="header-box">
      <el-breadcrumb separator="/" style="background: #fff;">
        <el-breadcrumb-item>项目管理</el-breadcrumb-item>
        <el-breadcrumb-item>项目投票</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="headersBox finance_tit">
        <div class="headersL">
          <!-- <span class="headers_clearFix_title">项目投票</span> -->
          <toggle-project permission="project_vote" @change-project="handleChangeProject"></toggle-project>
        </div>
        <div class="headersR">
          <el-button type="primary" @click="handleExport" v-if="$utils.checkProjectPermission('project_export_vote')">导出</el-button>
          <el-button type="primary" @click="handleAllDeleteBtn" v-if="flag == 0">删除</el-button>
          <el-button type="primary" v-if="$utils.checkProjectPermission('project_add_vote')" @click="newProFn" icon="el-icon-circle-plus-outline">新增投票</el-button>
        </div>
      </div>
    </div>
    <div v-on:keyup.enter="searchBtn">
    <el-form ref="form" :model="search_form" style="margin-top:14px" label-width="100px" class="form_box clearfix">
      <el-form-item label="投票类型：" class="search-vote-type">
        <!-- {{search_form.pro_type}} -->
        <el-select v-model="search_form.pro_type" placeholder="请选择投票类型" style="width:160px;">
          <el-option v-for="item in searchtype" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="投票名称：">
        <el-input v-model="search_form.pro_name" maxlength="50" placeholder="投票名称" style="width:160px;"></el-input>
      </el-form-item>
      <el-form-item label="投票截止时间：" label-width="110px">
        <date-range :date-start.sync="search_form.startTime"
                    :date-end.sync="search_form.endTime"
                    format="yyyy-MM-dd HH:mm:ss"></date-range>
      </el-form-item>
      <!-- <el-form-item label="参会人员：">
              <el-input v-model="search_form.pro_role" placeholder="参会人员"></el-input>
            </el-form-item>-->
      <el-button type="primary" icon="el-icon-search" @click="searchBtn" class="search-btn" style="margin-left:0px;">查询</el-button>
      <el-button @click="resetBtn" icon="el-icon-refresh" class="reset-btn" style="margin-left:10px;">重置</el-button>
    </el-form>
    </div>
    <div class="table_box">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="我参与的" name="first"></el-tab-pane>
        <el-tab-pane label="我创建的" name="second">
          <!-- 我参与的 -->
        </el-tab-pane>
        <el-tab-pane label="抄送我的" name="third">
          <!-- 抄送我 -->
        </el-tab-pane>

        <div style="min-height:450px;">
          <!--<el-scrollbar style="height:86%">-->
          <el-table :data="cvoteData" fit style="width: 100%" class="pro_table" @selection-change="handleSelectionChange">
            <el-table-column type="selection"></el-table-column>
            <!-- <el-table-column prop="pro_code" label="客户编码" align="center"></el-table-column> -->
            <el-table-column prop="name" label="投票名称" align="center" min-width="100">
              <template slot-scope="scope">
                <p :title="scope.row.name" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.name}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="typeName" label="投票类型" align="center" min-width="100">
              <template slot-scope="scope">
                <p :title="scope.row.typeName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.typeName}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="startTime" label="投票截止时间" align="center" width="160">
              <template slot-scope="scope">
                <p :title="scope.row.startTime | filtertime" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">起：{{scope.row.startTime | filtertime}}</p>
                <p :title="scope.row.endTime | filtertime" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">止：{{scope.row.endTime | filtertime}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="pro_person" label="投票人员" align="center " min-width="100">
              <template slot-scope="scope">
                <p style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" :title="scope.row.userNameList">
                  <span v-for="(item,index) in  scope.row.voteUserList" :key="index" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{item.userName}}<i v-if="index != scope.row.voteUserList.length -1">，</i></span>
                </p>
              </template>
            </el-table-column>
            <el-table-column prop="voteStatusName" label="投票状态" align="center" width="100">
              <template slot-scope="scope">
                <p :title="scope.row.voteStatusName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.voteStatusName}}</p>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" :width="flag !== 2 ? 236 : 200">
              <template slot-scope="scope">
                <!-- 投票 -->
                <el-button 
                v-if="flag == 1" 
                class="pv-0"
                type="text"
                @click="newvote(scope.row)" 
                title="决策" 
                icon="icon-operate-btn iconfont juece"></el-button>
                <el-button type="text" @click="detailsBtn(scope.row)" title="详情" class="pv-0">
                    <i class="icon-operate-btn iconfont wenzhang"></i>
                  </el-button>
                <el-button  v-if="(scope.row.voteStatus == 0 || scope.row.voteStatus == 1) && flag != 2"
                class="pv-0"
                type="text"
                @click="cvoteEdit(scope.$index, scope.row)" 
                icon="icon-operate-btn iconfont bianji2-copy"
                title="编辑"></el-button>
                <!-- 查看结果 -->
                <el-button 
                type="text" 
                class="pv-0"
                :disabled="scope.row.voteStatus!==2 && scope.row.voteStatus!==3" 
                icon="icon-operate-btn iconfont jiangbeishengli"
                @click="pollResults(scope.$index, scope.row)" 
                title="查看结果"></el-button>
                <el-button 
                    v-if="flag !== 2" 
                    class="pv-0"
                    type="text" 
                    icon="icon-operate-btn iconfont jilu"
                    @click="recordBtn(scope.row)" 
                    title="投票记录"></el-button>
                <!-- 删除 -->
                <!-- <i class="icon-operate-btn delete iconfont shanchu"></i> -->
                <el-button 
                v-if="flag == 0" 
                class="pv-0"
                type="text" 
                :disabled="scope.row.voteStatus==1" 
                icon="icon-operate-btn delete iconfont shanchu"
                @click="handleDeleteBtn(scope.row)" 
                title="删除"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--</el-scrollbar>-->
          <div class="table_foot">
            <div class="func_btn">
              <!-- <el-button type="primary" @click="handleExport" v-if="$utils.checkProjectPermission('project_export_vote')">导出</el-button>
              <el-button @click="handleAllDeleteBtn" v-if="flag == 0">删除</el-button> -->
            </div>
            <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="dataTotal" :pageSize="pageSize" :page-sizes="pageSizes" :current-page="currentPage" @current-change="onPageChange" @size-change="handleSizeChange"></el-pagination>
          </div>
        </div>
      </el-tabs>
    </div>
    <!-- 投票结果 -->
    <el-dialog title="投票结果" :close-on-click-modal="false" :visible.sync="vote_result" width="650px" @close="handleVoteClose" class="project-vote-result">
      <div style="height:500px; text-align: left">
        <el-scrollbar style="height:100%">
          <div style="width:600px;margin-top:10px;background:#fff;">
            <el-form ref="form">
              <el-form-item label="项目信息" label-width="85px" style="font-weight:bold"></el-form-item>
              <div class="clearfix">
                <el-form-item label="项目名称:" label-width="90px" style="float:left;text-align: left;">{{itemporjc.name}}</el-form-item>
              </div>
              <div class="clearfix">
                <el-form-item label="项目简称:" label-width="90px" style="float:left;text-align: left;">{{itemporjc.abbreviation}}</el-form-item>
              </div>
              <div class="clearfix">
                <el-form-item label="业务类型:" label-width="90px" style="float:left;text-align: left;">{{itemporjc.financingName}}</el-form-item>
                <el-form-item label="所属部门:" label-width="230px" style="float:left;text-align: left;">{{itemporjc.deptName}}</el-form-item>
              </div>
              <div class="clearfix">
                <el-form-item label="开始时间:" label-width="90px" style="float:left;text-align: left;">{{itemporjc.startTime}}</el-form-item>
                <el-form-item label="结束时间:" label-width="140px" style="float:left;text-align: left;">{{itemporjc.endTime}}</el-form-item>
              </div>
              <div class="project-describe clearfix">
                <el-form-item label="项目描述:" label-width="90px" style="text-align: left;">{{itemporjc.description}}</el-form-item>
              </div>
              <!-- <el-form-item></el-form-item> -->
            </el-form>
          </div>
          <!-- 相关内容 -->
          <div style="width:600px;margin-top:10px;padding-top:10px;background:#fff;">
            <p style="height:40px;padding-left:18px;font-weight:bold;">相关会议</p>
          </div>
          <div style="width:600px;background:#fff;" v-for="itemm in  itemObjk.projectMeetingList" :key="itemm.id">
            <!-- projectMeetingList -->
            <el-form ref="form" style="width:580px" align="left" class="clearfix">
              <!-- <span style="float:left;text-align: left;">相关内容</span> -->
              <el-form-item label="参会人员:" label-width="90px" :title="itemm.usName" class="vote-result" style="float:left;text-align: left;">{{itemm.usName}}</el-form-item>
              <el-form-item label="会议类型:" label-width="84px" style="float:left;text-align: left;">{{itemm.typeName}}</el-form-item>

              <!-- <el-form-item
                              label="会议地点:"
                              label-width="100px"
                              style="float:left;text-align: left;"
                            >{{itemm.meetingSite}}</el-form-item>
                            <el-form-item
                              label="会议时间:"
                              label-width="230px"
                              style="float:left;text-align: left;"
                            >{{itemm.startTime}}</el-form-item> -->
            </el-form>
            <el-form ref="form" style="width:580px" align="left" class="clearfix">
              <!-- <span style="float:left;text-align: left;">相关内容</span> -->
              <!-- <el-form-item
                              label="参会人员:"
                              label-width="100px"
                              style="float:left;text-align: left;"
                            >{{itemm.usName}}</el-form-item>
                            <el-form-item
                              label="会议类型:"
                              label-width="230px"
                              style="float:left;text-align: left;"
                            >{{itemm.typeName}}</el-form-item> -->

              <el-form-item label="会议地点:" label-width="90px" class="vote-result" style="float:left;text-align: left;">{{itemm.site}}</el-form-item>
              <el-form-item label="会议时间:" label-width="84px" style="float:left;text-align: left;">{{itemm.startTime}}</el-form-item>
            </el-form>
          </div>
          <!-- 表决结果 -->
          <div class="hsahsd">
            <!-- <span style="margin-left:100px">表决结果</span> -->
            <el-form ref="form1" label-width="100px">
              <el-form-item label="表决结果" label-width="85px" class="result-title"></el-form-item>
              <el-form-item label="投票人员:" label-width="90px">{{itemObjk.voteUser}}</el-form-item>
              <el-form-item label="投票结果:" label-width="90px">{{itemObjk.voteResultResult}}</el-form-item>
              <el-form-item label="附件:" label-width="90px" class="pr-20">
                <add-attachment ref="attachmentResult"
                                :projectRequired="true"
                                :projectId="projId"
                                @select="$utils.handleSelect(arguments,selectedFileListResult)"></add-attachment>

                <ul style="text-align: left;" class="attachment-wrap">
                  <li v-for="item in selectedFileListResult" class="attachemnt-list-item">
                    <p class="attachemnt-list-doc">
                      <span class="doc-name" @click="$utils.handleUploadFilePreview(item, {projectId:projId,sourceName:'项目投票',projectName:itemporjc.name})" :title="item.docName">{{item.docName}}</span>
                      <span>
                      <el-button v-if="item.addSource!==1" type="text" @click="$utils.handleDownLoadSelected(item)">下载</el-button>
                      <el-button type="text" @click="$utils.handleDeleteSelected(selectedFileListResult, item)">删除</el-button>
                    </span>
                    </p>
                  </li>
                </ul>

                <ul style="text-align: left;" class="attachment-wrap">
                  <li v-for="item in getFileListResult" class="attachemnt-list-item">
                    <p class="attachemnt-list-doc">
                      <span class="doc-name" @click="$utils.handleUploadFilePreview(item,  {projectId:projId,sourceName:'项目投票',projectName:itemporjc.name})" :title="item.docName">{{item.docName}}</span>
                      <span>
                      <el-button type="text" @click="$utils.handleDownLoadSelected(item)">下载</el-button>
                    </span>
                    </p>
                  </li>
                </ul>
              </el-form-item>
            </el-form>
          </div>

        </el-scrollbar>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="voteresult">取 消</el-button>
        <el-button size="medium" type="primary" @click="preservationResult">保存</el-button>
      </span>
    </el-dialog>
    
    
    <input type="file" id="fileBtn" style="display:none">
    
    <!-- 投票记录 -->
    <vote-record :voteRecordShow.sync="voteRecordShow" :voteObj="voteObj">
    </vote-record>
    <!-- 投票新增、详情、编辑 -->
    <vote-details v-if="voteDetaVisible" :voteDetaVisible.sync="voteDetaVisible" :handleType="handleType" :voteType="2"
                  :title="new_cvote" :handleVote="handleVote"  @sendValueToParent="voteDetaClose" @editSucess="queryCvote" :flag="flag">
    </vote-details>
    <vote-decide v-if="voteDecideVisible" :voteDecideVisible.sync="voteDecideVisible" 
                 :handleVote="handleVote"  @sendValueToParent="voteDecideClose" @editSucess="queryCvote">
    </vote-decide>
  </div>
</template>

<script>
import { wisdom_doc } from "@/pages/common/js/doc.main";
//选择人员
import findallDeptuser from "@/components/select_box/findAllDeptUserMultipleNew";
import { constants } from "fs";
//投票记录
import voteRecord from "@/components/select_box/voteRecord";
import voteDetails from "@/components/file/voteDetails";
import voteDecide from "@/components/file/voteDecide";
export default {
  name: "projecvote",
  components: {
    findallDeptuser,
    voteRecord,
    voteDetails,
    voteDecide
  },
  data () {
    return {
      client: window.client,
      getFileListEdit: [],
      getFileListResult: [],
      selectedFileListResult: [],
      selectedFileListEdit:[],
      selectedFileList:[],
      currentProject: '',
      projectList: [],
      token: "",
      new_cvote: " ",
      userId: "",
      activeName: "first",
      flag: 1, //选卡人员控制
      projId: "", //项目id
      // projectId: 1, //会议id
      peodatas: [], //联系人
      deployObj: [], //添加投票人员
      ccObj: [], //添加抄送人员
      deployUserids1: [], ////添加投票人员id集
      deployUserids: [], ////添加投票人员id集
      deployUserids_t: [], ////添加投票人员id集
      ccUserids: [], //添加抄送人员id集
      ccUserids_c: [], //添加抄送人员id集
      flag1: false, //添加联系人插件控制
      itemObjk: "",
      itemporjc: {},
      search_form: {
        pro_name: "",
        pro_type: "",
        starTime: '',//开始时间
        endTime: ''//结束时间
      },
      select_type: [],
      searchtype: [],
      cvoteData: [],
      multipleSelection: [],
      // 全选删除
      qCvoteId: [],
      //分页
      pageSize: 10,
      pageSizes: [10, 20, 50, 100], //每页显示数量
      currentPage: 1, //当前页
      dataTotal: 0, //总量
      dialogvote: false, //投票弹框
      //投票决策展示的项目名称
      Strategyid: "", //投票结果用到的投票id
      Strategyname_y: "", // 请输入投票意见"
      vote_result: false, //投票结果
      isUpdate: false, //编辑修改标识
      success_code: "",
      //类型修改
      exportlis: [], //导出数据集合
      //新增选择人员
      voteRecordShow: false,//投票记录是否显示
      voteDetaVisible: false,//投票新增、详情、编辑弹窗可见
      handleType: 1,//1详情按钮2编辑按钮3新增按钮
      handleVote: {},//当前操作的投票
      voteObj: {},
      // 投票决策相关
      voteDecideVisible: false,
    };
  },
  computed: {
    
  },
  created () {
    this.token = this.$store.state.loginObject.userToken;
    this.userId = this.$store.state.loginObject.userId;
    this.projId = this.$store.state.projectMsg.pro_id;
  },
  mounted () {
    this.queryCvote();
    this.typeList(); //查看分类
    this.sachtype();
  },
  methods: {
    voteDetaClose(){
      this.voteDetaVisible = false;
    },
    recordBtn(row){
      // this.handleVote = row;
      this.voteObj = {
        id: row.id,
        projId: row.projId,
        voteName: row.name
      }
      this.voteRecordShow = true;
    },
    handleVoteClose(){
      this.$refs['attachmentResult'] && this.$refs['attachmentResult'].close()
    },
    handleChangeProject (data) {
      // 更新项目信息
      this.projId = data.id;
      // 重置筛选条件
      this.resetBtn()
      // 查询
      this.queryCvote()
    },
    handleClick (tab, event) {
      if (tab.name == "first") {
        this.flag = 1; //我参与的
        this.currentPage = 1;
        this.pageSize = 10;
        this.queryCvote();
      } else if (tab.name == "second") {
        this.flag = 0;  //我创建的
        this.currentPage = 1;
        this.pageSize = 10;
        if (this.flag == 0) {
          this.queryCvote();
        }
      } else {
        this.flag = 2; //抄送我的
        this.currentPage = 1;
        this.pageSize = 10;
        this.queryCvote();
      }
    },

    queryCvote () {
      var data = {
        token: this.token,
        userId: this.userId,
        // projectName: "项目名称", //"项目名称"
        // projectStage: "项目阶段名称", // "项目阶段名称"
        // stageId: 1, //"项目阶段id"
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        data: {
          projId: this.projId,
          flag: this.flag, //"0:我创建的/1:我参与的/2:抄送我的"
          name: this.search_form.pro_name,
          typeId: this.search_form.pro_type,
          startTime:this.search_form.startTime,
          endTime:this.search_form.endTime
        }
      };
      this.$post("/info/project/findMyProjectVote", data)
        .then((response) => {
          if(response.code != 0) {
            this.$message.error(response.msg);
            return
          }
          if(response.data.pageNum > response.data.pages && response.data.pages != 0) {
            this.currentPage = response.data.pages;
            this.queryCvote();
            return
          }
          console.log(response.data.list)
          this.cvoteData = response.data.list;

          this.dataTotal = response.data.total;
          for (var i = 0; i < this.cvoteData.length; i++) {
            this.cvoteData[i].userNameList = "";
            var string = "";
            var username = this.cvoteData[i].voteUserList;
            for (var j = 0; j < username.length; j++) {
              string = string + username[j].userName + ",";
            }
            this.cvoteData[i].userNameList = string;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    handleSelectionChange (val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
      // console.log(val);
      var that = this;
      var arrids = [];
      var exorts = [];

      if (val.length > 0) {
        that.multipleSelection.forEach(function (c, index) {
          if (c.id) {
            arrids.push(c.id);
            // console.log(c.voteUserList);
          }
          var a = [];
          for (var i = 0; i < c.voteUserList.length; i++) {
            a.push(c.voteUserList[i].userName);
          }
          // console.log(a.join(","));
          exorts.push({
            id: c.id,
            name: c.name,
            typeName: c.typeName,
            voteTimeExport: c.startTime,
            voteUser: a.join(","),
            voteStatusName: c.voteStatusName,
            voteStartTimeExport:c.startTime.substring(0,16),
            voteEndTimeExport:c.endTime.substring(0,16),
            entireFinanceName:c.entireFinanceName,
            projName:c.projName
          });
        });
      } else {
        arrids = [];
        exorts = [];
      }
      var hash = [];
      for (var i = 0; i < arrids.length; i++) {
        if (hash.indexOf(arrids[i]) == -1) {
          hash.push(arrids[i]);
        }
      }
      this.qCvoteId = hash.join(",");
      this.exportlis = exorts;
      // console.log(this.exportlis);
    },
    // 查询
    searchBtn () {
      this.currentPage = 1;
      var dataObj = {
        token: this.token,
        userId: this.userId,
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        data: {
          projId: this.projId,
          flag: this.flag, //"0:我创建的/1:我投票的/2:抄送我的"
          name: this.search_form.pro_name,
          typeId: this.search_form.pro_type,
          startTime:this.search_form.startTime,
          endTime:this.search_form.endTime ? `${ this.search_form.endTime.substr(0, this.search_form.endTime.lastIndexOf(' ')) } 23:59:59` : ''
        }
      };
      var that = this;
      this.$post("/info/project/findMyProjectVote", dataObj)
        .then((response) => {
          that.cvoteData = response.data.list;
          that.dataTotal = response.data.total;
          for (var i = 0; i < that.cvoteData.length; i++) {
            that.cvoteData[i].userNameList = "";
            var string = "";
            var username = that.cvoteData[i].voteUserList;
            for (var j = 0; j < username.length; j++) {
              string = string + username[j].userName + ",";
            }
            that.cvoteData[i].userNameList = string;
          }
          if (response.code == 0) {
            // that.search_form.pro_name = "";
            // that.search_form.pro_type = "";
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 重置
    resetBtn () {
      this.search_form = {
        pro_name: "",
        pro_role: "",
        pro_type: "",
        pro_trade: "",
        pro_state: "",
        startTime:"",
        endTime:""
      };
    },
    newProFn(){
      // 判断项目是否是已终止状态 
      if(this.$store.state.projectMsg.projectMsg.endFlag  && this.$store.state.projectMsg.projectMsg.endFlag === 1){
        this.$store.commit('projectStatusTips');
        return;
      }
      this.new_cvote = "新增投票";
      this.handleType = 3;
      this.voteDetaVisible = true;
    },
    //  查询投票分类所有
    typeList () {
      var dataObj = {
        token: this.token,
        userId: this.userId
      };
      var that = this;
      this.$post("/info/project/findVoteTypeAll", dataObj)
        .then((response) => {
          that.select_type = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //  查询投票分类所有
    sachtype () {
      var dataObj = {
        token: this.token,
        userId: this.userId
      };
      var that = this;
      this.$post("/info/project/findVoteTypeCopyAll", dataObj)
        .then((response) => {
          if (response.code == 0) {
            that.searchtype = response.data;
          } else {
            this.$message.error(response.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    newvote(row){
      this.handleVote = row;
      this.voteDecideVisible = true;
    },
    voteDecideClose(){
      this.voteDecideVisible = false;
    },
    cvoteEdit(index, row){
      this.new_cvote = "投票编辑";
      this.handleType = 2;
      this.handleVote = row;
      this.voteDetaVisible = true;
    },
    detailsBtn(row){
      this.new_cvote = "投票详情";
      this.handleType = 1;
      this.handleVote = row;
      this.voteDetaVisible = true;
    },
    //投票结果
    pollResults (index, row) {
      // console.log(row);
      this.Strategyid = row.id;
      this.getFileListResult = []
      this.selectedFileListResult = []
      var dataObj = {
        token: this.token,
        userId: this.userId,
        data: {
          id: this.Strategyid
        }
      };
      var that = this;
      this.$post("/info/project/findProjectVoteResult", dataObj)
        .then((response) => {
          if (response.code == that.code.codeNum.SUCCESS) {
            that.itemObjk = response.data;
            if (response.data.project == null) {
              that.itemporjc = {};
            } else {
              that.itemporjc = response.data.project;
            }
            this.getFileListResult = response.data.voteActtachList || [];

            if(this.getFileListResult && this.getFileListResult.length){
              this.getFileListResult.forEach(v=>{
                v.name=v.docName
                v.id=v.docId
                v.rfsId=v.docVersionRfs
                v.type=v.docType
              })
            }
          } else {
            this.$message.error(response.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });

      // console.log(this.itemObjk);
      this.vote_result = true;
    },
    // 删除

    // 单挑删除会议
    handleDelete (row) {
      if (row.voteStatus == 1) {
        this.$message.error("投票正在进行中不能删除...");
        return;
      }
      var _this = this;
      this.$confirm("确定删除所有选中投票", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var data = {
            token: _this.token,
            userId: _this.userId,
            data: {
              id: row.id,
              projId: row.projId,
              name: row.name,
              flag: _this.flag
            }
          };
          _this
            .$post("/info/project/delProjectVoteOne", data)
            .then((response) => {
              if (response.code == _this.code.codeNum.SUCCESS) {
                _this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              } else {
                _this.$message({
                  type: "info",
                  message: response.msg
                });
              }
              _this.queryCvote();
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleDeleteBtn (row) {
      if (row.voteStatus == 1) {
        this.$message.error("投票正在进行中不能删除...");
        return;
      }
      this.canDelete(row.id).then(res => {
        if (res) {
          this.handleDelete(row);
        }
      });
    },
    // 分页
    // 分页
    onPageChange (currentPage) {
      this.currentPage = currentPage;
      this.queryCvote();
      // this.listCust("", "", "", "", "", "", currentPage);
      console.log(this.currentPage); //点击第几页
    },
    handleSizeChange (val) {
      this.pageSize = val;
      this.queryCvote();
      console.log(`每页 ${val} 条`);
    },

    // 导出
    handleExport () {
      if (this.exportlis.length <= 0) {
        this.$message({
          type: "info",
          message: "选择导出项"
        });
      } else {
        this.$message({
          type: "success",
          message: "正在导出!"
        });
        this.$store.commit("export", {
          url: "/info/project/exportProjectVote",
          data: this.exportlis
        });
      }
    },
    // 删除选中项
    handleAllDelete () {
      // console.log(this.qCvoteId);
      if (this.qCvoteId == "") {
        this.$message.error("请选择要删除选项");
        return;
      }
      var _this = this;
      this.$confirm("确定删除所有选中投票？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var data = {
            token: _this.token,
            userId: _this.userId,
            data: {
              voteIds: _this.qCvoteId,
              flag: _this.flag
            }
          };
          _this
            .$post("/info/project/delProjectVoteBatch", data)
            .then((response) => {
              if (response.code == _this.code.codeNum.SUCCESS) {
                _this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              } else {
                _this.$message({
                  type: "info",
                  message: response.msg
                });
              }
              _this.queryCvote();
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleAllDeleteBtn () {
      if (this.qCvoteId == "") {
        this.$message.error("请选择要删除选项");
        return;
      } else if(this.multipleSelection.findIndex(obj=>obj.voteStatus == 1) > -1){
          this.$message.error("投票正在进行中不能删除...");
          return;
      }
      this.canDelete(this.qCvoteId).then(res => {
        if (res) {
          this.handleAllDelete();
        }
      });
    },
    //删除前验证是否已被关联，没有被关联才能删除
    async canDelete (ids) {
      var _this = this;
      var send_data = {
        token: this.token,
        userId: this.userId,
        projectId: this.projectId,
        data: {
          voteIds: ids
        }
      }
      var data = await _this
        .$post("/info/project/verifyVoteRelevance", send_data)
        .then((response) => {
          if (_this.success_code == response.code) {
            let data = response.data;
            if (data.result) {
              return true;
            } else {
              let str = response.data.content.substring(0, response.data.content.length - 1) + '投票已被关联，不能删除';
              _this.$message({
                message: str,
                type: "warning"
              });
              return false;
            }
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
    // 取消结果修改
    voteresult () {
      this.$refs['attachmentResult'] && this.$refs['attachmentResult'].close()
      this.vote_result = false;
    },

    // 保存结果修改
    preservationResult () {
      var _this = this;
      if(this.$store.state.isUpload) {
        this.$message.warning('有文件正在上传，请稍后操作')
        return;
      }
      let localAttach = [] // 本地上传
      let projectRelev = [] // 关联文件+之前的附件
      this.selectedFileListResult.forEach(v=>{
        v.addSource===1 ? localAttach.push(v.docId) : projectRelev.push(v.docId)
      })

      this.getFileListResult.forEach(v=>{
        projectRelev.push(v.docId)
      })


      var dataObj = {
        token: this.token,
        userId: this.userId,
        projectId: this.projId,
        data: {
          id: this.Strategyid,
          suggestion: this.Strategyname_y, //"投票意见 "
          localAttach: localAttach.join(","), //"【本地上传文件id】 1,2,3",
          projectRelev: projectRelev.join(",") //"【关联项目文档】 1,2,3"}}
        }
      };
      var that = this;
      this.$post("/info/project/saveAttachByResult", dataObj)
        .then((response) => {
          if (response.code == that.code.codeNum.SUCCESS) {
            that.$message({
              message: response.msg,
              type: "success"
            });
          } else {
            that.$message({
              type: "info",
              message: response.msg
            });
          }
          that.vote_result = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  watch: {
    currentPage: function (valu) {
      // this.queryCvote();
    },
    pageSize: function (valu) {
      // this.queryCvote();
    }
  }
};
</script>

<style scoped lang="scss" type="text/css">
.projecvote {
  position: relative;
  .el-breadcrumb {
    line-height: 40px;
  }
  //   .finance_tit {
  //     padding: 10px 0;
  //     background: #fff;
  //     .el-button {
  //       float: right;
  //       margin-right: 15px;
  //     }
  //     span {
  //       float: left;
  //       color: #333;
  //       font-size: 20px;
  //       line-height: 32px;
  //       font-weight: bold;
  //     }
  //   }
  .form_box.vote-result-add-doc {
    padding-top: 0;
    margin-bottom: 16px;
  }
  .vote-result-add-doc {
    background: #fff;
    // padding-top: 20px;
    // padding-left: 10px;
    .el-form-item {
      // float: left;
      // margin-right: 20px;
      margin-bottom: 12px;
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
      margin-top: 2px;
    }
  }
  .form_box {
    background: #fff;
    padding-top: 20px;
    padding-left: 10px;
    .el-form-item {
      float: left;
      margin-right: 10px;
      margin-bottom: 12px;
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
      // margin-top: 2px;
    }
  }
  .el-pagination {
    padding-right: 40px;
  }
  .func_btn {
    // width: 200px;
    padding-left: 15px;
    position: relative;
  }
  .doc-name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .del-file{
    text-decoration: line-through;
  }
  .vote-result-add-doc .doc-name {
    width: 70%;
    padding-left: 46px;
  }
  .hsahsd {
    width: 600px;
    margin-top: 10px;
    background: #fff;
  }
  .headersBox {
    overflow: hidden;
    zoom: 1;
    .headers_clearFix_title {
      text-align: left;
      font-size: 20px;
      font-weight: bold;
    }
    .headersL {
      float: left;
    }
    .headersR {
      float: right;
      box-sizing: border-box;
      padding-right: 10px;
    }
  }
    .projecvote .toggle-project-container {
    margin-top: 14px;
    padding-left: 0;
  }
}
.projecvote .table_foot {
  margin-top: 30px;
  text-align: left;
  display: flex;
  justify-content: space-between;
}
.projecvote .zueche {
  border: none;
  width: 28px;
  height: 28px;
  background: url("../../../../assets/manuscript_icon/piao1.png") no-repeat;
  background-size: 100% 100%;
}
.projecvote .zueche:hover {
  border: none;
  width: 28px;
  height: 28px;
  background: url("../../../../assets/manuscript_icon/piao.png") no-repeat;
  background-size: 100% 100%;
}

.projecvote .jieguo {
  border: none;
  width: 28px;
  height: 28px;
  background: url("../../../../assets/manuscript_icon/zhijianjieguo21b.png")
    no-repeat;
  background-size: 100% 100%;
}
.projecvote .jieguo:hover {
  border: none;
  width: 28px;
  height: 28px;
  background: url("../../../../assets/manuscript_icon/zhijianjieguo21.png")
    no-repeat;
  background-size: 100% 100%;
}
.projecvote .deletro {
  width: 15px;
  height: 15px;
  //   background: url("../../../../assets/image/sanc.png") no-repeat;
  background-size: 100% 100%;
}
.projecvote .delusebtn {
}
.projecvote .fujllist {
  width: 450px;
  max-height: 71px;
  overflow: auto;
}
.projecvote .fujllist li {
  width: 100%;
  // display: flex;
  /*padding-right: 15px;*/
  line-height: 26px;
  flex-wrap: nowrap;
  // justify-content: space-between;
  /*// background: red;*/
}
.projecvote .fujllist li .view-btn {
  padding-left: 8px;
}
.projecvote .fujllist li:hover {
  background: #f7f9fb;
}
.projecvote .delefj:hover {
  color: #409eff;
}
.projecvote .fujllistul {
  width: 350px;
}
.projecvote .fujllistul li {
  width: 100%;
  // display: flex;
  padding-right: 15px;
  line-height: 26px;
  flex-wrap: nowrap;
  // justify-content: space-between;
  // background: red;
}
.projecvote .fujllistul li .view-btn {
  padding-left: 8px;
}

.projecvote .fujlliltitle {
  width: 60%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.projecvote .fujllistul li:hover {
  background: #f7f9fb;
  .delefj {
    color: #1a5fa4;
  }
}

p.attachemnt-list-doc {
  display: flex;
  align-items: center;
}

p.attachemnt-list-doc {
  display: flex;
  align-items: center;
}

p.attachemnt-list-doc .doc-name{
  display: inline-block;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

p.attachemnt-list-doc .doc-delete{
  font-size: 14px;
  font-weight: 400;
  color: #0061a9;
  cursor: pointer;
  margin-top: 2px;
}
.search-btn,.reset-btn{
  margin-bottom: 12px;
}
.search-btn{
  margin-left: 18px;
}
</style>
<style lang="scss">
.projecvote .toggle-project-container {
    margin-top: 14px;
    padding-left: 0;
}
/* .usernanmes, .attachment-wrap{
    overflow-y: auto;
    max-height: 113px;
}
 */
.projecvote .headersBox .el-button+.el-button {
    margin-left: 5px;
}
.projecvote .table_box {
  background: #fff;
  /* padding: 0 10px; */
  box-sizing: border-box;
}
.projecvote .el-dialog__header {
  padding: 20px 20px 10px;
  border-bottom: 1px solid #e8e8e8;
}
.projecvote .el-textarea {
  width: 580px;
}
.projecvote .el-dialog__footer {
  text-align: right;
  margin-top: -22px;
}

.projecvote .el-scrollbar__wrap {
  overflow-x: hidden;
}
.projecvote .button_bj {
  float: right;
  margin-right: 10px;
}
.projecvote .deleth {
  text-decoration: line-through;
}
.projecvote .el-dialog__body {
  padding: 0px 20px 20px 20px;
  color: #606266;
  font-size: 14px;
}
.projecvote .juechrbox .el-form-item {
  margin-bottom: 4px;
}
.projecvote .table_box {
  padding: 0px;
}

.projecvote .el-dialog__body {
  padding-top: 0px;
}
.projecvote {
  .el-table thead th {
    background: #fafafa;
  }
  .pro_table {
    thead {
      color: rgb(0, 0, 0);
    }
  }
  .el-form-item__label {
    // font-weight: bold;
  }
  .project-describe .el-form-item {
    // margin-bottom:16px;
  }
  .vote-result {
    width: 280px;
    .el-form-item__content {
      width: 180px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .el-tabs--border-card > .el-tabs__content {
    padding-left: 0;
    padding-right: 0;
  }
  .form_box .el-date-editor.el-input{
    width: 160px!important;
  }
  .search-vote-type .el-form-item__label{
    width: 107px;
  }
  .el-table td{
    padding: 0;
  }
}
.project-vote-result {
  .el-dialog__body {
    background: #f9f9f9;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .el-dialog__footer {
    background: #f9f9f9;
  }
  .el-form-item__content {
    background: #fff;
  }
  .vote-result-add-doc .el-form-item__content {
    padding-left: 18px;
  }
  .vote-result-add-doc.form_box {
    padding-left: 0;
  }
  .result-title {
    font-weight: bold;
  }
}
</style>
