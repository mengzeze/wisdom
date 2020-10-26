<template>
  <div class="myprojecvote">
    <div class="riheader">
      <el-breadcrumb separator="/" class="page-breadcrumb">
        <el-breadcrumb-item :to="{path:'/maindeskindex'}">主工作台</el-breadcrumb-item>
        <el-breadcrumb-item>我的投票</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row class="finance_tit">
        <span>我的投票</span>
        <el-button
          size="small"
          icon="el-icon-plus"
          type="primary"
          @click="newProFn"
        >新增投票</el-button>
      </el-row>
    </div>
    <div v-on:keyup.enter="searchBtn">
    <el-form
      ref="form"
      :model="search_form"
      style="margin-top:14px" :inline="true"
      class="form_box clearfix"
    >
      <el-form-item label="投票类型：" class="search-vote-type">
        <!-- {{search_form.pro_type}} -->
        <el-select v-model="search_form.pro_type" placeholder="请选择投票类型">
          <el-option
            v-for="item in searchtype"
            :key="item.id"
            :label="item.typeName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="投票名称：">
        <el-input v-model="search_form.pro_name" maxlength="50" placeholder="投票名称"></el-input>
      </el-form-item>
      <el-form-item label="项目名称：">
        <!--<el-input v-model="search_form.usName" placeholder="项目名称"></el-input>-->
        <el-autocomplete
          v-model="search_form.usName"
          :fetch-suggestions="querySearchProj"
          placeholder="请输入项目名称"
          @select="handleSelectProj"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="投票截止时间：" label-width="110px">
        <date-range :date-start.sync="search_form.startTime"
                    :date-end.sync="search_form.endTime"
                    format="yyyy-MM-dd HH:mm:ss"></date-range>
      </el-form-item>
      <!-- <el-form-item label="参会人员：">
        <el-input v-model="search_form.pro_role" placeholder="参会人员"></el-input>
      </el-form-item>-->
      <el-button size="medium" type="primary" @click="searchBtn" icon="el-icon-search" class="search-btn">查询</el-button>
      <el-button size="medium" @click="resetBtn" icon="el-icon-refresh" class="reset-btn">重置</el-button>
    </el-form>
    </div>
    <div class="table_box">
      <el-tabs
        v-model="activeName"
        fit
        show-header
        :header-cell-style="{background:'#F5F7FA',color:'#000'}"
        type="border-card"
        @tab-click="handleClick"
      >
        <el-tab-pane label="我参与的" name="first">
          <!-- 我参与的 -->
        </el-tab-pane>
        <el-tab-pane label="我创建的" name="second"></el-tab-pane>

        <el-tab-pane label="抄送我的" name="third">
          <!-- 抄送我 -->
        </el-tab-pane>

        <div style="min-height: 300px">
          <!--<el-scrollbar style="height:90%">-->
            <el-table
              :data="cvoteData"
              fit
              style="width: 100%"
              class="pro_table"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection"></el-table-column>
              <el-table-column prop="name" label="投票名称" align="center" min-width="100">
                  <template slot-scope="scope">
                    <!-- style="padding:0;width:100%;line-height:22px;" -->
                      <el-button @click="detailsBtn(scope.row)"
                             type="text"
                             class="ellipsis1"
                             :title="scope.row.name">{{ scope.row.name }}</el-button>
                  </template>
              </el-table-column>
              <el-table-column prop="typeName" label="投票类型" align="center" min-width="100">
                  <template slot-scope="scope">
                      <p :title="scope.row.typeName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.typeName}}</p>
                  </template>
              </el-table-column>
              <el-table-column prop="projName" label="项目名称" align="center" min-width="100">
                  <template slot-scope="scope">
                      <p :title="scope.row.projName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.projName}}</p>
                  </template>
              </el-table-column>
              <el-table-column prop="financingName" label="业务类型" align="center" min-width="100">
                  <template slot-scope="scope">
                      <p :title="scope.row.entireFinanceName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.financingName}}</p>
                  </template>
              </el-table-column>
              <el-table-column prop="startTime" label="投票截止时间" align="center" width="160">
                  <template slot-scope="scope">
                      <p :title="scope.row.startTime | filtertime" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">起：{{scope.row.startTime | filtertime}}</p>
                      <p :title="scope.row.endTime | filtertime" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">止：{{scope.row.endTime | filtertime}}</p>
                  </template>
              </el-table-column>
              <el-table-column prop="pro_person" label="投票人员" align="center ">
                <template slot-scope="scope">
                    <p style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" :title="scope.row.userNameList">
                  <span
                    v-for="(item,index) in  scope.row.voteUserList"
                    :key="index"
                  >{{item.userName}},</span>
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
                    @click="newvote(scope.row)"
                   type="text"
                    title="决策"
                    class="pv-0"
                  ><i class="icon-operate-btn iconfont juece"></i></el-button>
                  <!-- 编辑 -->
                  <!-- :disabled="scope.row.voteStatus==1" -->
                  <!-- v-if="scope.row.voteStatus!==2 &&scope.row.voteStatus!==3" -->
                  <el-button type="text" @click="detailsBtn(scope.row)" title="详情" class="pv-0">
                    <i class="icon-operate-btn iconfont wenzhang"></i>
                  </el-button>
                  <el-button v-if="(scope.row.voteStatus == 0 || scope.row.voteStatus == 1) && flag != 2"
                    type="text"
                    @click="cvoteEdit(scope.$index, scope.row)"
                    title="编辑"
                    class="pv-0"
                  ><i class="icon-operate-btn iconfont bianji2-copy"></i></el-button>
                  <!-- 查看结果 -->

                  <el-button
                    :disabled="scope.row.voteStatus!==2 && scope.row.voteStatus!==3"
                    @click="pollResults(scope.$index, scope.row)"
                    type="text"
                    title="查看结果"
                    class="pv-0"
                  ><i class="icon-operate-btn iconfont jiangbeishengli"></i></el-button>
                  <el-button
                    v-if="flag != 2"
                    class="pv-0"
                    type="text"
                    icon="icon-operate-btn iconfont jilu"
                    @click="recordBtn(scope.row)"
                    title="投票记录"></el-button>
                  <!-- 删除 -->
                  <el-button
                    v-if="flag == 0"
                    :disabled="scope.row.voteStatus==1"
                    @click="handleDeleteBtn(scope.row)"
                    type="text"
                    title="删除"
                    class="pv-0"
                  ><i class="icon-operate-btn delete iconfont shanchu"></i></el-button>
                </template>
              </el-table-column>
            </el-table>
          <!--</el-scrollbar>-->
        </div>
        <div class="table_foot">
          <div class="func_btn">
            <el-button type="primary" @click="handleExport">导出</el-button>
            <el-button @click="handleAllDeleteBtn" v-show="deletemycreate">删除</el-button>
          </div>
          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="dataTotal"
            :pageSize="pageSize"
            :page-sizes="pageSizes"
            :current-page="currentPage"
            @current-change="onPageChange"
            @size-change="handleSizeChange"
          ></el-pagination>
        </div>
      </el-tabs>
    </div>
    <!-- 投票结果 -->
    <el-dialog title="投票结果" :close-on-click-modal="false" :visible.sync="vote_result" width="650px" @close="voteresult" class="project-vote-result">
      <div style="height:500px; text-align: left">
        <el-scrollbar style="height:100%">
          <div style="width:600px;margin-top:10px;background:#fff;">
            <el-form ref="form">
              <el-form-item label="项目信息" label-width="100px" style="font-weight:bold"></el-form-item>
              <div class="clearfix">
                <el-form-item
                  label="项目名称:"
                  label-width="100px"
                  style="float:left;text-align: left;"
                >{{itemporjc.name}}</el-form-item>
                <el-form-item
                  label="项目简称:"
                  label-width="100px"
                  style="float:left;text-align: left;"
                >{{itemporjc.abbreviation}}</el-form-item>
              </div>
              <div class="clearfix">
                <el-form-item
                  label="业务类型:"
                  label-width="100px"
                  style="float:left;text-align: left;"
                >{{itemporjc.financingName}}</el-form-item>
                <el-form-item
                  label="所属部门:"
                  label-width="230px"
                  style="float:left;text-align: left;"
                >{{itemporjc.deptName}}</el-form-item>
              </div>
              <div class="clearfix">
                <el-form-item
                  label="开始时间:"
                  label-width="100px"
                  style="float:left;text-align: left;"
                >{{itemporjc.startTime | filtertime}}</el-form-item>
                <el-form-item
                  label="结束时间:"
                  label-width="140px"
                  style="float:left;text-align: left;"
                >{{itemporjc.endTime | filtertime}}</el-form-item>
              </div>
              <el-form-item
                label="项目描述:"
                label-width="100px"
                style="float:left;text-align: left;"
              >{{itemporjc.description}}</el-form-item>
              <el-form-item></el-form-item>
            </el-form>
          </div>
          <!-- 相关内容 -->
          <div style="width:600px;margin-top:10px;padding-top:10px;background:#fff;">
            <p style="height:40px;padding-left:28px;font-weight:bold;">相关会议</p>
          </div>
          <div
            style="width:600px;background:#fff;"
            v-for="itemm in  itemObjk.projectMeetingList"
            :key="itemm.id"
          >
            <!-- projectMeetingList -->
            <el-form ref="form" style="width:580px" align="left" class="clearfix">
              <!-- <span style="float:left;text-align: left;">相关内容</span> -->
              <el-form-item
                label="参会人员:"
                label-width="100px"
                :title="itemm.usName"
                class="vote-result"
                style="float:left;text-align: left;"
              >{{itemm.usName}}</el-form-item>
              <el-form-item
                label="会议类型:"
                label-width="90px"
                style="float:left;text-align: left;width:280px;"
              >{{itemm.typeName}}</el-form-item>
            </el-form>
            <el-form ref="form" style="width:580px" align="left" class="clearfix">
              <el-form-item
                label="会议地点:"
                label-width="100px"
                style="float:left;text-align: left;width:280px;"
              >{{itemm.site}}</el-form-item>
              <el-form-item
                label="会议时间:"
                label-width="90px"
                style="float:left;text-align: left;width:280px;"
              >{{itemm.startTime | filtertime}}</el-form-item>
            </el-form>
          </div>
          <!-- 表决结果 -->
          <div class="hsahsd">
            <el-form ref="form1" label-width="100px">
              <!-- <el-form-item label label-width="100px"></el-form-item> -->
              <el-form-item label="表决结果" label-width="100px" class="result-title"></el-form-item>
              <el-form-item label="投票人员:" label-width="100px">{{itemObjk.voteUser}}</el-form-item>
              <el-form-item label="投票结果:" label-width="100px">{{itemObjk.voteResultResult}}</el-form-item>
              <el-form-item label="附件:" label-width="100px" class="pr-20">
                <add-attachment ref="attachmentResult"
                                :projectId="queryDocProjectId"
                                @select="$utils.handleSelect(arguments,selectedFileListResult)"></add-attachment>

                <ul style="text-align: left;" class="attachment-wrap">
                  <li v-for="(item, index) in selectedFileListResult" class="attachemnt-list-item" :key="index">
                    <p class="attachemnt-list-doc">
                      <span class="doc-name" @click="$utils.handleUploadFilePreview(item,  {projectId:queryDocProjectId,sourceName:'我的投票',projectName:itemporjc.name})" :title="item.docName">{{item.docName}}</span>
                      <span>
                      <el-button v-if="item.addSource!==1" type="text" @click="$utils.handleDownLoadSelected(item)">下载</el-button>
                      <el-button type="text" @click="$utils.handleDeleteSelected(selectedFileListResult, item)">删除</el-button>
                    </span>
                    </p>
                  </li>
                </ul>

                <ul style="text-align: left;" class="attachment-wrap">
                  <li v-for="(item, index) in getFileListResult" class="attachemnt-list-item" :key="index">
                    <p class="attachemnt-list-doc">
                      <span class="doc-name" @click="$utils.handleUploadFilePreview(item,  {projectId:queryDocProjectId,sourceName:'我的投票',projectName:itemporjc.name})" :title="item.docName">{{item.docName}}</span>
                      <span>
                      <el-button type="text" @click="$utils.handleDownLoadSelected(item)">下载</el-button>
                    </span>
                    </p>
                  </li>
                </ul>

              </el-form-item>

            </el-form>
             <!-- 表决结果 -->

          </div>
        </el-scrollbar>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="voteresult">取 消</el-button>
        <el-button type="primary" @click="preservationResult">保存</el-button>
      </span>
    </el-dialog>
    <input type="file" id="fileBtn" style="display:none">
    <!-- 投票记录 -->
    <vote-record :voteRecordShow.sync="voteRecordShow" :voteObj="voteObj">
    </vote-record>
    <!-- 投票新增、详情、编辑 -->
    <vote-details v-if="voteDetaVisible" :voteDetaVisible.sync="voteDetaVisible" :handleType="handleType" :voteType="1"
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
//投票记录
import voteRecord from "@/components/select_box/voteRecord";
import voteDetails from "@/components/file/voteDetails";
import voteDecide from "@/components/file/voteDecide";
export default {
  name: "myprojecvote",
  components: {
    findallDeptuser,
    voteRecord,
    voteDetails,
    voteDecide
  },
  data() {
    return {
      client: window.client, // 区分客户
      getFileListEdit: [],
      getFileListResult: [],
      selectedFileListResult: [],
      selectedFileListEdit:[],
      selectedFileList:[],
      deletemycreate:false,
      token: "",
      new_cvote: " ",
      userId: "",
      activeName: "first",
      flag: 1, //选卡人员控制
      //   projId: "", //项目id
      //   projectId: 1, //会议id
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
        usName: "",
        startTime: '',//开始时间
        endTime: ''//结束时间
      },
      voteProjectId: "",
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
      Strategyid: "", //投票决策展示的项目id

      Strategyname_y: "", // 请输入投票意见"

      vote_result: false, //投票结果
      isUpdate: false, //编辑修改标识

      //上传控制
      success_code: "",
      queryDocProjectId: '',//关联附件（项目文档或底稿）用到的项目id
      myvoteyproj: "",
      exportlis: [], //导出数据集合
      voteRecordShow: false,//投票记录是否显示
      voteDetaVisible: false,//投票新增、详情、编辑弹窗可见
      handleType: 1,//1详情按钮2编辑按钮3新增按钮
      handleVote: {},//当前操作的投票
      voteObj:{},
      // 投票决策相关
      voteDecideVisible: false,
    };
  },
  computed: {

  },
  created() {
    this.token = this.$store.state.loginObject.userToken;
    this.userId = this.$store.state.loginObject.userId;
    // this.projId = this.$store.state.projectMsg.pro_id;
    // this.uploadParamData.projId = this.$store.state.projectMsg.pro_id;
  },
  mounted() {
    this.queryCvote();
    this.typeList(); //查看分类
    this.sachtype();
    this.projectList();
  },
  methods: {
    voteDetaClose(){
      this.voteDetaVisible = false;
    },
    recordBtn(row){
      this.voteObj = {
        id: row.id,
        projId: row.projId,
        voteName: row.name,
        projName: row.projName
      }
      // this.handleVote = row;
      this.voteRecordShow = true;
    },
    projectList() {
      var dataObj = {
        token: this.token,
        userId: this.userId,
        data: {}
      };
      var that = this;
      this.$post("info/project/getSimpleProjectList", dataObj)
        .then((response)=> {
          // console.log(response.data);
          if (response.code == that.code.codeNum.SUCCESS) {
            var data = response.data;
            for (var i = 0; i < data.length; i++) {
              data[i].value = data[i].name;
            }
            that.loadAllProj = data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    createFilter(queryString) {
      return restaurant => {
        return restaurant.value.indexOf(queryString) != -1;
      };
    },
    //  查询条件-项目名称
    querySearchProj(queryString, cb) {
      this.voteProjectId = "";
      var restaurants = this.loadAllProj;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    handleSelectProj(item) {
      // console.log(item);
      this.voteProjectId = item.id;
    },
    handleClick(tab, event) {

      if (tab.name == "first") {
        this.flag = 1; //我参与的
         this.currentPage = 1;
        this.pageSize = 10;
        this.queryCvote();
        this.deletemycreate = false;
      } else if (tab.name == "second") {
          this.deletemycreate = true;
        this.flag = 0; //我创建的
        this.currentPage = 1;
        this.pageSize = 10;
        if (this.flag == 0) {
          this.queryCvote();
        }
      } else {
          this.deletemycreate = false;
        this.flag = 2; //抄送我的
        this.currentPage = 1;
        this.pageSize = 10;
        this.queryCvote();
      }
    },

    queryCvote() {
      var data = {
        token: this.token,
        userId: this.userId,
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        data: {
          // projId: this.projId,
          flag: this.flag, //"0:我创建的/1:我参与的/2:抄送我的"
          name: this.search_form.pro_name,
          typeId: this.search_form.pro_type,
          projId: this.voteProjectId,
          startTime:this.search_form.startTime,
          endTime:this.search_form.endTime ? `${ this.search_form.endTime.substr(0, this.search_form.endTime.lastIndexOf(' ')) } 23:59:59` : ''
        }
      };
      this.$post("/info/project/findMyProjectVote", data)
        .then((response)=> {
          if (response.code != this.code.codeNum.SUCCESS) {
            this.$message.error(response.msg)
            return
          }
          if(response.data.pageNum > response.data.pages) {
              this.currentPage = response.data.pages;
              this.queryCvote();
              return
            }
            this.cvoteData = response.data.list;
            for(var  i=0;i<this.cvoteData.length;i++){
                this.cvoteData[i].userNameList = "";
                var string = "";
                var username = this.cvoteData[i].voteUserList;
                for(var j=0;j<username.length;j++){
                     string = string + username[j].userName + ",";
                }
                this.cvoteData[i].userNameList = string;
            }
            console.log(this.cvoteData);
            this.dataTotal = response.data.total;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
      var that = this;
      var arrids = [];
      var exorts = [];
      if (val.length > 0) {
        that.multipleSelection.forEach(function(c) {
          if (c.id) {
            arrids.push(c.id);
          }
          var a = [];
          for (var i = 0; i < c.voteUserList.length; i++) {
            a.push(c.voteUserList[i].userName);
          }
          console.log(c.endTime.substring(0,16))
          exorts.push({
            id: c.id,
            name: c.name,
            typeName: c.typeName,
            projName:c.projName,
            voteTimeExport: c.startTime,
            voteUser: a.join(","),
            voteStatusName: c.voteStatusName,
            voteStartTimeExport:c.startTime.substring(0,16),
            voteEndTimeExport:c.endTime.substring(0,16),
            entireFinanceName:c.entireFinanceName

          });
        });
      } else {
        // that.qCvoteId = [];
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
    },
    // 查询
    searchBtn() {
      this.currentPage = 1;
      var dataObj = {
        token: this.token,
        userId: this.userId,
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        data: {
          // projId: this.projId,
          flag: this.flag, //"0:我创建的/1:我投票的/2:抄送我的"
          name: this.search_form.pro_name,
          typeId: this.search_form.pro_type,
          projId: this.voteProjectId,
          startTime:this.search_form.startTime,
          endTime:this.search_form.endTime ? `${ this.search_form.endTime.substr(0, this.search_form.endTime.lastIndexOf(' ')) } 23:59:59` : ''
        }
      };
      var that = this;
      this.$post("/info/project/findMyProjectVote", dataObj)
        .then((response)=> {
          that.cvoteData = response.data.list;
          that.dataTotal = response.data.total;
          if (response.code == that.code.codeNum.SUCCESS) {
            // that.search_form.pro_name = "";
            // that.search_form.pro_type = "";
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 重置
    resetBtn() {
      this.search_form = {
        pro_name: "",
        pro_role: "",
        pro_type: "",
        pro_trade: "",
        pro_state: "",
        usName: "",
        endTime:"",
        startTime:""
      };
      this.voteProjectId = "";
    },
    newProFn(){
      this.new_cvote = "新增投票";
      this.handleType = 3;
      this.voteDetaVisible = true;
    },
    //  查询投票分类所有
    typeList() {
      var dataObj = {
        token: this.token,
        userId: this.userId
      };
      var that = this;
      this.$post("/info/project/findVoteTypeAll", dataObj)
        .then((response)=> {
          that.select_type = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //  查询投票分类
    sachtype() {
      var dataObj = {
        token: this.token,
        userId: this.userId
      };
      var that = this;
      this.$post("/info/project/findVoteTypeCopyAll", dataObj)
        .then((response)=> {
          if (response.code == 0) {
            that.searchtype = response.data;
          } else {
            this.$message.error(response.msg);
          }
        })
        .catch(function(error) {
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
      console.log(row)
      this.voteDetaVisible = true;
    },
    detailsBtn(row){
      this.new_cvote = "投票详情";
      this.handleType = 1;
      this.handleVote = row;
      this.voteDetaVisible = true;
    },
    //投票结果
    pollResults(index, row) {
      console.log(row);
      this.Strategyid = row.id;
      this.queryDocProjectId = row.projId;
      this.selectedFileListResult = [];
      this.getFileListResult = [];
      var dataObj = {
        token: this.token,
        userId: this.userId,
        projectId: row.projId,
        data: {
          id: this.Strategyid
        }
      };

      var that = this;
      this.$post("/info/project/findProjectVoteResult", dataObj)
        .then((response)=> {
          that.itemObjk = response.data;
          if (response.data.project == null) {
            that.itemporjc = {};
          } else {
            that.itemporjc = response.data.project;
          }
          // that.shagchaunlist_hlist = response.data.voteActtachList;
          // that.shagchaunlist_h = that.shagchaunlist_hlist.map(function(item) {
          //   return {
          //     name: item.docName,
          //     id: item.docId,
          //     rfsId: item.docVersionRfs,
          //     delFlag: item.delFlag,
          //     type: item.docType
          //   };
          // });

          this.getFileListResult = response.data.voteActtachList || []

          this.getFileListResult.forEach(v=>{
            v.name = v.docName
            v.rfsId = v.docVersionRfs
            v.type = v.docType
          })

        })
        .catch(function(error) {
          console.log(error);
        });

      // console.log(this.itemObjk);
      this.vote_result = true;
    },
    // 删除

    // 单挑删除会议
    handleDelete(row) {
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
            projectId: row.projId,
            data: {
              id: row.id,
              name: row.name,
              projId: row.projId,
              flag: _this.flag
            }
          };
          _this
            .$post("/info/project/delProjectVoteOne", data)
            .then((response)=> {
              // console.log(response);
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
            .catch(function(error) {
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
    handleDeleteBtn(row){
      if (row.voteStatus == 1) {
          this.$message.error("投票正在进行中不能删除...");
          return;
      }
      this.canDelete(row.id).then(res => {
          if(res){
              this.handleDelete(row);
          }
      });
    },
    // 分页
    // 分页
    onPageChange(currentPage) {
      this.currentPage = currentPage;
      this.queryCvote()
      // this.listCust("", "", "", "", "", "", currentPage);
      console.log(this.currentPage); //点击第几页
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.queryCvote()
      console.log(`每页 ${val} 条`);
    },

    // 导出
    handleExport() {
        console.log(this.exportlis)
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
         url: "/info/project/exportProjectVoteMain",
          data: this.exportlis
        });
      }
    },
    // 删除选中项
    handleAllDelete() {
      // console.log(this.qCvoteId);
      if (this.qCvoteId == "") {
        this.$message.error("请选择要删除选项");
        return;
      }
      var _this = this;
      this.$confirm("确定删除已勾选投票？", "提示", {
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
            .then((response)=> {
              console.log(response);
              if (response.code == _this.code.codeNum.SUCCESS) {
                _this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              } else {
                this.$message({
                  type: "info",
                  message: response.msg
                });
              }
              _this.queryCvote();
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(() => {});
    },
    handleAllDeleteBtn(){
        if (this.qCvoteId == "") {
            this.$message.error("请选择要删除选项");
            return;
        } else if(this.multipleSelection.findIndex(obj=>obj.voteStatus == 1) > -1){
          this.$message.error("投票正在进行中不能删除...");
            return;
        }
        this.canDelete(this.qCvoteId).then(res => {
            if(res){
                this.handleAllDelete();
            }
        });
    },
    //删除前验证是否已被关联，没有被关联才能删除
    async canDelete(ids) {
        var _this = this;
        var send_data = {
            token: this.token,
            userId: this.userId,
            data: {
                voteIds: ids
            }
        }
        var data = await _this
            .$post("/info/project/verifyVoteRelevance", send_data)
            .then((response)=> {
                if (_this.success_code == response.code) {
                    let data = response.data;
                    if(data.result){
                        return true;
                    } else {
                        let str = response.data.content.substring(0,response.data.content.length -1) + '投票已被关联，不能删除';
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
    voteresult() {
      this.vote_result = false;
      this.$refs['attachmentResult'] && this.$refs['attachmentResult'].close()
    },

    // 保存结果修改
    preservationResult() {
      var _this = this;
      // 本地上传的附件

      // this.shagchaunlist.forEach(function(c) {
      //   if (c.id) {
      //     _this.shagchaun.push(c.id);
      //   }
      // });
      // //返回的附件
      // this.shagchaunlist_h.forEach(function(c) {
      //   if (c.id && c.delFlag == 0) {
      //     _this.eveltchaunlist.push(c.id);
      //   }
      // });


      if(this.$store.state.isUpload) {
        this.$message.error('有文件正在上传，请稍后操作')
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
        data: {
          id: this.Strategyid,
          suggestion: this.Strategyname_y, //"投票意见 "
          localAttach: localAttach.join(","), //"【本地上传文件id】 1,2,3",
          projectRelev: projectRelev.join(",") //"【关联项目文档】 1,2,3"}}
        }
      };
      var that = this;
      this.$post("/info/project/saveAttachByResult", dataObj)
        .then((response)=> {
          // console.log(response);
          if (response.code == that.code.codeNum.SUCCESS) {
              //debugger;
            that.$message({
              message: response.msg,
              type: "success"
            });
            that.vote_result = false;
            this.getFileListResult = []

          } else {
            that.$message({
              type: "info",
              message: response.msg
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    seeFjadd(rfsId,docId,type, projectId,item){
        // this.$router.push({
        // path: "/preview",
        //     query: {
        //         rfsId: rfsId,
        //         docId: docId
        //     }
        // });
        var proViewData = {
          projectId: projectId,
          rfsId: rfsId,
          docId: docId,
          photoType: type,
          docName: item.fileName
        }
        this.$store.commit('previewAllFn',proViewData)
    },
  },
  watch: {
    // currentPage: function(valu) {
    //   this.queryCvote();
    // },
    // pageSize: function(valu) {
    //   this.queryCvote();
    // },
  }
};
</script>

<style scoped lang="scss" type="text/css">

.myprojecvote {
  width: 99.7%;
  padding: 0px 0px;
  position: relative;
  overflow: hidden;
  // background: #fff;
  .hsahsd{
    width: 600px;
    margin-top:10px;
    background: #fff;
  }
  .form_box.vote-result-add-doc{
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
      // margin-bottom: 12px;
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
  .riheader {
    width: 100%;
    // padding: 0 15px;
    height: 96px;
    padding: 0 8px;
    // padding-bottom: 5px;
    background: rgba(255, 255, 255, 1);
    .el-breadcrumb {
      line-height: 46px;
    }
    .finance_tit {
      position: relative;
      padding: 15px 5px;
      span {
        color: #333;
        // line-height: 32px;
        font-size: 20px;
        font-weight: 600;
        position: absolute;
        left: 0px;
        bottom: 2px;
      }

      .el-button {
        padding-bottom: 10px;
        position: absolute;
        right: 33px;
        bottom: 4px;
        z-index: 10;
      }
    }
  }
  .form_box {
    background: #fff;
    padding-top: 20px;
    padding-left: 10px;
    padding-bottom: 10px;
    .result-item.el-form-item{
      margin-bottom: 0;
    }
    .el-form-item {
      float: left;
      margin-right: 20px;
      margin-bottom: 10px;
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
  .form_boxfuj {
    background: #fff;
    // padding-top: 20px;
    padding-left: 10px;
    padding-bottom: 10px;
    .el-form-item {
      float: left;
      margin-right: 20px;
      margin-bottom: 15px;
      height: 40px;
      width:100%;
    }
  }
  .el-pagination {
    margin-top: 20px;
    padding-right: 25px;
  }
  .func_btn {
    width: 200px;
    position: relative;
  }
  .del-file{
    text-decoration: line-through;
  }
}
.attachment-wrap{
max-height: 113px;
  overflow-y: auto;
}
.table_foot {
  margin-top: 20px;
  text-align: left;
  display: flex;
  justify-content: space-between;
}
.myprojecvote .zueche {
  border: none;
  width: 28px;
  height: 28px;
  background: url("../../../../assets/manuscript_icon/piao1.png") no-repeat;
  background-size: 100% 100%;
}
.myprojecvote .zueche:hover {
  border: none;
  width: 28px;
  height: 28px;
  background: url("../../../../assets/manuscript_icon/piao.png") no-repeat;
  background-size: 100% 100%;
}
.myprojecvote .jieguo {
  border: none;
  width: 28px;
  height: 28px;
  background: url("../../../../assets/manuscript_icon/zhijianjieguo21b.png")
    no-repeat;
  background-size: 100% 100%;
}
.myprojecvote .jieguo:hover {
  border: none;
  width: 28px;
  height: 28px;
  background: url("../../../../assets/manuscript_icon/zhijianjieguo21.png")
    no-repeat;
  background-size: 100% 100%;
}

.deletro {
  width: 15px;
  height: 15px;
  padding: 0;
  background: url("../../../../assets/image/sanc.png") no-repeat;
  background-size: 100% 100%;
}
.fujllistul {
  width: 350px;
}
.result-fujllistul{
  background:#fff;
}
.fujllistul li {
  width: 100%;
  // display: flex;
  padding-right: 15px;
  line-height: 26px;
  flex-wrap: nowrap;
  // justify-content: space-between;
}
.fujlliltitle {
  width: 60%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.fujllistul.result-fujllistul li:hover {
  background: #fff;
}
.fujllistul li:hover {
  background: #f7f9fb;
}
.delefj{
    cursor: pointer;
}
.delefj:hover {
  color: #409eff;
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
  margin-bottom: 14px;
}
.search-btn{
  margin-left: 18px;
}
</style>
<style lang="scss" type="text/css">
.myprojecvote .table_box {
  widows: 100%;
  padding: 0 0px;
  background: #fff;
  box-sizing: border_box;
}
.myprojecvote .el-dialog__body {
  padding: 14px 20px 20px 30px;
  color: #606266;
  font-size: 14px;
}
.myprojecvote .el-dialog__header {
  padding: 20px 20px 10px;
  border-bottom: 1px solid #e8e8e8;
}
.myprojecvote .el-textarea {
  width: 580px;
}
.myprojecvote .el-dialog__footer {
  text-align: right;
}

.myprojecvote .el-scrollbar__wrap {
  overflow-x: hidden;
}
.myprojecvote .button_bj {
  float: right;
  margin-right: 10px;
}
.myprojecvote .deleth {
  text-decoration: line-through;
}
.myprojecvote .el-table td,
.myprojecvote.el-table th {
  min-width: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: center;
}
.myprojecvote{
  .pro_table{
      thead{
          color: rgb(0, 0, 0);
      }
  }
  .form_box .el-date-editor.el-input{
    width: 196px!important;
  }
  .search-vote-type .el-form-item__label{
    width: 107px;
  }
  .el-table td{
    padding: 0;
  }
}
.myprojecvote.el-table__row {
  height: 56px;
}
.myprojecvote .juechrbox .el-form-item {
  margin-bottom: 4px;
}
.myprojecvote .vote-result{
    width:280px;
  .el-form-item__content{
    width:180px;
    overflow:hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
  }
}
.project-vote-result {
  .el-dialog__body {
    background:#f9f9f9;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .el-dialog__footer{
    background: #f9f9f9;
  }
  .el-form-item__content{
    background: #fff;
  }
  .vote-result-add-doc .el-form-item__content{
    padding-left:22px;
  }
  .vote-result-add-doc.form_box {
    padding-left:0;
  }
  .result-title{
    font-weight:bold;
  }
}
/*.myprojecvote .el-button.is-disabled, .myprojecvote .el-button.is-disabled:focus, .myprojecvote .el-button.is-disabled:hover{*/
    /*background-image: ;*/
/*}*/
</style>
