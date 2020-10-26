<template>
  <div class="manuscriptmanage" id="manuscriptmanage">
    <!-- 目录树 -->
    <div
      class="bottom_catalogue"
      id="drag_catalogue"
      style="width:300px;border-right: 2px solid #dcdfe6;position: relative"
    >
      <div class="catalogue_search" id="catalogue_search" @mousedown="catalogue_search($event)">
        <el-input
          placeholder="搜索目录"
          clearable
          ref="catalogue_search"
          v-model="catalogue_search_input"
          @keyup.enter.native="searchDirFn()"
          @change="searchChange()"
          v-if="searchmessg"
          class="catalogue_search_input"
        >
          <el-button slot="append" icon="el-icon-search" @click="searchDirFn"></el-button>
        </el-input>
        <div v-show="filterNod != ''" class="catalogue_search_showTitle">
          <p class="catalogue_search_showTitle_left">共{{addnum}}个结果,第{{searchIdx ==0?1:searchIdx}}个</p>
          <div class="catalogue_search_showTitle_right">
            <el-button
              @click="topaddinfo(true)"
              style="padding: 5px"
              size="mini"
              :disabled="searchtop"
              icon="el-icon-arrow-up"
            ></el-button>
            <el-button
              @click="topaddinfo(false)"
              style="padding: 5px"
              :disabled="searchtbot"
              size="mini"
              icon="el-icon-arrow-down"
            ></el-button>
          </div>
        </div>
      </div>
      <div class="catalogue_tree">
        <el-tree
          class="filter-tree"
          :data="data"
          show-checkbox
          node-key="id"
          @node-click="nodeclick"
          current-node-key
          highlight-current
          :props="defaultProps"
          :default-expanded-keys="expandedKeys"
          :filter-node-method="filterNode"
          :render-content="renderContent"
          ref="tree"
        ></el-tree>
      </div>
      <div id="resizor" @mousedown="dragget($event)" title="拖动我"></div>
    </div>
    <!-- 文件列表右侧 -->
    <div id="right" style="width: 76%;;height: 100%;">
      <!-- 右侧顶部 -->
      <div class="right_box">
        <div class="right_boxfirst">
          <ul>
            <li>
              <span>标题关键字：</span>
              <el-input v-model="btkeyword" placeholder="请输入内容"></el-input>
            </li>
            <li>
              <span>内容关键字：</span>
              <el-input v-model="nrkeyword" placeholder="请输入内容"></el-input>
            </li>
            <li>
              <span>&nbsp;&nbsp;&nbsp;项目阶段：</span>
              <el-input v-model="stagekeyword" placeholder="请输入内容"></el-input>
            </li>
          </ul>
        </div>
        <div>
          <span v-show="!keyspan">
            <el-button size="small" @click="buttoninfo(true)" type="primary">查询</el-button>
            <el-button size="small" @click="buttoninfo(false)">重置</el-button>
          </span>
          <span class="right_keyspan" @click="iconfontinfo">
            <el-button v-if="keyspan" type="text">
              收起&nbsp;
              <i class="iconfont">&#xe633;</i>
            </el-button>
            <el-button v-else type="text">
              更多&nbsp;
              <i class="iconfont">&#xe717;</i>
            </el-button>
          </span>
        </div>
      </div>
      <div v-show="keyspan">
        <ul class="right_keysinfo" style="margin-left: 24px;">
          <li>
            <span>文件类型：</span>
            <multiplechoice @changeData="fileTypesChangeData" :selectData="fileTypes" :width="196" />
          </li>
          <li>
            <span>文件状态：</span>
            <multiplechoice @changeData="fileStateChangeData" :selectData="fileState" :width="196" />
          </li>
          <li>
            <span>目录状态：</span>
            <multiplechoice @changeData="dirStateChangeData" :selectData="dirState" :width="196" />
          </li>
        </ul>
      </div>
      <div v-show="keyspan">
        <ul class="right_keys" style="margin-left: 24px;">
          <li>
            <span>修改时间：</span>
            <el-date-picker v-model="starstime" type="datetime" placeholder="选择日期时间"></el-date-picker>至
            <el-date-picker v-model="endtime" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </li>
          <li style="width: 200px">
            <el-button size="small" @click="buttoninfo(true)" type="primary">查询</el-button>
            <el-button size="small" @click="buttoninfo(false)">重置</el-button>
          </li>
        </ul>
      </div>
      <div class="iconinfo">
        <ul>
          <li @click="operate(1)">
            <i class="iconfont">&#xe604;</i>下载
          </li>
          <li @click="operate(2)">
            <i class="iconfont">&#xe630;</i>审批
          </li>
          <li @click="operate(3)">
            <i class="iconfont">&#xe60a;</i>版本
          </li>
          <li @click="operate(4)">
            <i class="iconfont">&#xe619;</i>讨论
          </li>
          <li @click="operate(5)">
            <i class="iconfont">&#xe601;</i>已选文件列表
          </li>
          <li @click="operate(6)">
            <i class="iconfont">&#xe689;</i>取消选择
          </li>
          <li @click="operate(7)">
            <i class="iconfont">&#xe60c;</i>导出
          </li>
          <li @click="operate(8)">
            <i class="iconfont">&#xe62d;</i>备注
          </li>
          <li @click="operate(9)">
            <i class="iconfont">&#xe68c;</i>查看审批记录
          </li>
        </ul>
      </div>
      <!-- 路劲 -->
      <div class="navArray">
        <path-bar :paths="navArray" field="label" @toggle="navClickFn"></path-bar>
      </div>
      <!-- 文件列表 -->
      <div class="files">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          @row-dblclick="handledbClick"
          @sort-change="sort_change"
          @selection-change="selectFn"
          :header-cell-style="{background:'#FAFAFA',color:'black',fontWeight:'bold'}"
          style="width: 100%"
          max-height="430"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="文件名" min-width="300">
            <template slot-scope="scope">
              <div class="list_name_icon">
                <div>
                  <img :src="scope.row.fileIcon" />
                </div>
                <div :title="scope.row.docName" class="list_name">{{scope.row.docName}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="修改时间" align="center" width="150">
            <template slot-scope="scope">
              <div v-if="scope.row.docType == 0" class="list_time">
                <span class="list_time_updateTime">{{scope.row.updateTime}}</span>
                <div>
                  <span
                    class="list_time_updateUserName"
                    :title="scope.row.createUserName"
                  >{{scope.row.createUserName}}</span>&nbsp;
                  <span>
                    生成
                    <span class="list_time_docVersionNumber">v{{scope.row.docVersionNumber}}</span>
                  </span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="大小" align="center" sortable width="120">
            <template slot-scope="scope">
              <div class="list_size">{{renderSize(scope.row.docSize)}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="底稿关联" align="center" width="300"></el-table-column>
        </el-table>
        <div class="demonstration">
          <el-pagination
            class="bottom_pagination"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="100"
            :pager-count="5"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!-- 下拉组件 -->
    <Auditcomponent @ogVisible="ogVisible" v-if="Auditcom" :selectData="selectData" />
    <!-- 日程组件 -->
    <calendar @calende="calende" :calend="calend" />
    <!-- 版本组件 -->
    <version :versionIsShow="versionIsShow" @versionIs="versionIs" />
    <!-- 备注弹窗 -->
    <remark
      :remarkIsShow="remarkIsShow"
      @colseModule="colseModule"
      :docData="docData"
      :title="title"
    />
    <!-- 审批弹窗 -->
    <!-- <approve :Approvalreply="Approvalreply" :Approvaltitle="Approvaltitle" :ApprovaldocData="ApprovaldocData"/> -->
        <!-- 文件审批记录-没有回复 -->
        <!-- <approval-comment
            :approvalShow.sync="approvalShow"
            :approvalData="ApprovaldocData">
        </approval-comment> -->
  </div>
</template>
<script>
import { setTimeout, setInterval, clearInterval } from "timers";
import approve from './approve'
import multiplechoice from "../../../components/MultipleChoice";
import remark from "../../../components/file/remark";
import Auditcomponent from "./Audit_component";
import calendar from "../maindesk/calendar/newcalendar";
import version from "./version";
// import { obj, table } from "./demo";
export default {
  components: {
    multiplechoice,
    Auditcomponent,
    calendar,
    version,
    remark,
    approve
  },
  props: ["Nodeapprova"],
  data() {
    return {
      projectName: '',
      Auditcom: false,
      megssFlag: true,
      checkAll: false,
      calend: false,
      keyspan: false,
      isIndeterminate: true,
      searchmessg: true,
      infoser: true,
      btkeyword: "",
      nrkeyword: "",
      stagekeyword: "",
      starstime: "",
      endtime: "",
      flieNameData: [],
      selectData: [],
      catalogue_search_input: "",
      data: obj,
      addnum: 0,
      searchIdx: 0,
      expandedKeys: [],
      filterNod: [],
      searchtop: false,
      searchtbot: false,
      highlight: true,
      pro_id: "",
      navArray: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      fileState: [
        { value: 1, label: "无文件" },
        { value: 2, label: "有文件" },
        { value: 3, label: "已选择" },
        { value: 4, label: "待审批" },
        { value: 5, label: "审批中" },
        { value: 6, label: "审批通过" },
        { value: 7, label: "已驳回" },
        { value: 8, label: "有备注的" },
        { value: 9, label: "有讨论的" }
      ],
      fileTypes: [
        { value: 1, label: "doc/docx" },
        { value: 2, label: "pdf" },
        { value: 3, label: "xls/xlsx" },
        { value: 4, label: "txt" },
        { value: 5, label: "png" },
        { value: 6, label: "jpg/jpeg" },
        { value: 7, label: "其他" }
      ],
      dirState: [
        { value: 1, label: "待审批" },
        { value: 2, label: "审批中" },
        { value: 3, label: "审批通过" },
        { value: 4, label: "已驳回" },
        { value: 5, label: "有备注的" },
        { value: 6, label: "有讨论的" }
      ],
      TypesChangeData: {
        TypesChange: [],
        StateChange: [],
        dirStateCh: []
      },
      tableData: [],
      fileHeight: "",
      currentPage: 5, //分页器,
      // 功能区参数配置
      versionIsShow: false,
      remarkIsShow: false,
      docData: [{ docName: 1111 }],
      title: "备注",
      selectionlist: [],
      Approvalreply:true,
      ApprovaldocData: [{ docName: 11111111111 }],
      Approvaltitle:'审批意见'
    };
  },
  watch: {
    // 节点审批 切换目录视图
    Nodeapprova(val) {
      if (val.e == 1) {
        this.Auditcom = val.s == 1 ? true : false;
        return;
      }
    }
  },
  created() {
    this.tableDatalist(); // 获取文件列表
    this.token = this.$store.state.loginObject.userToken;
    this.userId = this.$store.state.loginObject.userId;
    this.pro_id = this.$store.state.projectMsg.pro_id;
    this.projectMsg = this.$store.state.projectMsg.projectMsg;
  },
  mounted() {
    //默认展开第一个节点
    this.expandedKeys.push(obj[0].id);
    this.navArray = [obj[0]];
    // 监听鼠标放下
    document.addEventListener(
      "mouseup",
      e => {
        this.infoser = false;
      },
      true
    );
    document.addEventListener(
      "mousedown",
      e => {
        this.infoser = true;
      },
      true
    );
    this.getTreeDataFn();
    // 修改页面高度
    document.getElementById("manuscriptmanage").style.height =
      this.getViewPortHeight() - 70 - 90 - 14 + "px";
    // 文件审批页得高度
    setTimeout(() => {
      this.fileHeight = $("#drag_catalogue").height() - 300;
    });
  },
  methods: {
    // 右侧展开收起按钮
    iconfontinfo() {
      this.keyspan = !this.keyspan;
    },
    // 文件审批节点弹窗
    ogVisible(val) {
      this.Auditcom = val.s;
      this.calend = val.d;
    },
    // 日程弹窗
    calende(val) {
      this.calend = val.s;
    },
    //目录树的拖拽
    dragget() {
      var obj = document.getElementById("drag_catalogue");
      obj.onmousedown = e => {
        e = e || event;
        var dir = "";
        var firstX = e.clientX;
        var width = obj.offsetWidth;
        var left = e.offsetX;
        if (firstX > left + obj.offsetWidth - 20) {
          dir = "right";
        }
        document.onmousemove = e => {
          if (!this.infoser) return;
          e = e || event;
          switch (dir) {
            case "right":
              this.searchmessg =
                Number(
                  obj.style["width"].substring(
                    0,
                    obj.style["width"].lastIndexOf("p")
                  )
                ) <= 105
                  ? false
                  : true;
              obj.style["width"] = width + (e.clientX - firstX) + "px";
              break;
          }
        };
        obj.onmouseup = function() {
          document.onmousemove = null;
        };
        return false;
      };
    },
    //解决光标问题
    catalogue_search() {
      this.$refs.catalogue_search.focus();
      this.infoser = false;
    },
    // 修改页面高度
    getViewPortHeight() {
      return (
        document.documentElement.clientHeight || document.body.clientHeight
      );
    },
    // 搜索逻辑 1
    searchChange() {
      this.filterNod = [];
      this.addnum = 0;
      this.searchIdx = 0;
      this.$refs.tree.filter(this.catalogue_search_input);
      this.$nextTick(function() {
        this.$refs.tree.setCurrentKey();
      });
    },
    //清除输入框
    searchDirFn() {
      this.filterNod = [];
      this.addnum = 0;
      this.searchIdx = 0;
      if (this.catalogue_search_input == "") return;
      this.$refs.tree.filter(this.catalogue_search_input);
    },
    // 上一个下一个
    topaddinfo(state) {
      !state ? this.searchIdx++ : this.searchIdx--;
      this.searchtop = this.searchIdx <= 0 ? true : false;
      this.searchIdx = this.searchIdx < 0 ? 0 : this.searchIdx;
      this.searchtbot =
        this.searchIdx == this.filterNod.length - 1 ? true : false;
      this.$nextTick(function() {
        this.$refs.tree.setCurrentKey(this.filterNod[this.searchIdx].id);
      });
    },
    // 搜索逻辑 2
    filterNode(value, data) {
      if (!value) return true;
      if (data.label.indexOf(value) !== -1) {
        this.addnum++;
        this.filterNod.push(data);
        this.$nextTick(function() {
          this.$refs.tree.setCurrentKey(this.filterNod[0].id);
        });
        this.searchIdx = 0;
      }
      return data.label.indexOf(value) !== -1;
    },
    // 设置图标
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <i class={data.icon}></i>
          <span style="margin-left:5px;">{node.label}</span>
        </span>
      );
    },
    // 路径展示
    nodeclick(data, Node, vuecomponent) {
      var labelName = [];
      if (Node != undefined) {
        var p = Node;
        while (true) {
          if (p == null) {
            break;
          }
          if (p.label != undefined) {
            if (labelName === "") {
              labelName = [{ label: p.label, id: p.key }];
            } else {
              labelName.push({ label: p.label, id: p.key });
            }
          }
          p = p.parent;
        }
      }
      this.navArray = labelName.reverse();
    },
    // 路径控制目录树
    navClickFn(val) {
      var Idindex = 0;
      this.navArray.forEach((item, index) => {
        if (item.id == val.id) {
          Idindex = index;
        }
      });
      this.$nextTick(function() {
        this.$refs.tree.setCurrentKey(val.id);
      });
      this.navArray.splice(Idindex + 1);
    },
    // 文件类型
    fileTypesChangeData(val) {
      this.TypesChangeData.TypesChange = val;
    },
    // 文件状态
    fileStateChangeData(val) {
      this.TypesChangeData.StateChange = val;
    },
    //目录状态
    dirStateChangeData(val) {
      this.TypesChangeData.dirStateCh = val;
    },
    // 筛选列表
    buttoninfo(state) {
      // ture 展开所有筛选  false 收起清空
      this.$router.push('./Searchpage')
      if (this.keyspan) {
      } else {
        this.TypesChangeData = {
          TypesChange: [],
          StateChange: [],
          dirStateCh: []
        };
      }
      // true查询  false 重置
      if (state) {
        var data = {
          token: this.token,
          userId: this.userId,
          data: {
            btkeyword: this.btkeyword,
            nrkeyword: this.nrkeyword,
            stagekeyword: this.stagekeyword,
            starstime: this.starstime,
            endtime: this.endtime,
            TypesChangeData: this.TypesChangeData
          }
        };
        console.log(data);
      } else {
        this.btkeyword = "";
        this.nrkeyword = "";
        this.stagekeyword = "";
        this.starstime = "";
        this.endtime = "";
      }
    },
    // 功能区
    operate() {
      switch (arguments[0]) {
        case 1: // 下载
          if (this.selectionlist == "")
            return this.$message.warning("请选择至少一条数据");
          var downloadArr = [],
            that = this;
          async function fn() {
            that.selectionlist.forEach(item => [
              downloadArr.push({
                id: item.docId,
                name: item.docName
              })
            ]);
            return downloadArr;
          }
          fn().then(res => {
            this.$store.commit("download", res);
          });
          break;
        case 2:
          break;
        case 3: // 版本
          this.versionIsShow = true;
          break;
        case 4: // 讨论
          if (this.selectionlist == "")
            return this.$message.warning("请选择一条数据");
          if (this.selectionlist.length > 1)
            return this.$message.warning("多文件无法操作，请重新选择");
          this.$router.push({
            path: "/projecchat",
            query: {
              docData: JSON.stringify(this.selectionlist[0])
            }
          });
          break;
        case 5:
          break;
        case 6:
          break;
        case 7: // 导出
          if (this.selectionlist == "")
            return this.$message.warning("请选择一条数据");
          var params = {
            userId: this.userId,
            token: this.token,
            data: {
              // fileName: this.projectName,
              // files: downloadFilesArray.join(","),
              // dirs: downloadDirsArray.join(","),
              // projId: this.newProjId ? this.newProjId : this.pro_id
            }
          };
          // this.export("/doc/paper/globalViewExport", params);
          break;
        case 8:
          this.remarkIsShow = true;
          break;
        case 9:
          this.$router.push("./approvalComments");
          break;
      }
    },
    // 勾选的数据
    selectFn(selection) {
      this.selectionlist = selection;
    },
    versionIs(val) {
      // 版本
      this.versionIsShow = val;
    },
    //获取初始树数据
    getTreeDataFn() {},
    //获取文件列表
    tableDatalist() {
      this.tableData = table.data.content;
      table.data.content.forEach(item => {
        this.iconFilter(item);
      });
    },

    // 备注
    colseModule() {
      this.remarkIsShow = false;
    },
    iconFilter(itemValue) {
      //过滤重命名的icon
      if (itemValue.docType == 1) {
        itemValue.fileIcon = require("../../common/fileIcon/FolderType1.png");
      } else {
        var hz_name = itemValue.type.toLowerCase();
        if (hz_name == "doc" || hz_name == "docx" || hz_name == "rtf") {
          itemValue.fileIcon = require("../../common/fileIcon/DocType.png");
        } else if (
          hz_name == "xls" ||
          hz_name == "xlsx" ||
          hz_name == "excel"
        ) {
          itemValue.fileIcon = require("../../common/fileIcon/XlsType.png");
        } else if (
          hz_name == "ppt" ||
          hz_name == "pptx" ||
          hz_name == "pps" ||
          hz_name == "ppsx" ||
          hz_name == "ppsm"
        ) {
          itemValue.fileIcon = require("../../common/fileIcon/PptType.png");
        } else if (
          hz_name == "jpg" ||
          hz_name == "jpeg" ||
          hz_name == "gif" ||
          hz_name == "bmp" ||
          hz_name == "png"
        ) {
          itemValue.fileIcon = require("../../common/fileIcon/ImgType.png");
        } else if (
          hz_name == "wmv" ||
          hz_name == "avi" ||
          hz_name == "dat" ||
          hz_name == "asf" ||
          hz_name == "rm" ||
          hz_name == "rmvb" ||
          hz_name == "mpg"
        ) {
          itemValue.fileIcon = require("../../common/fileIcon/VideoType.png");
        } else if (
          hz_name == "mpeg" ||
          hz_name == "mkv" ||
          hz_name == "dvix" ||
          hz_name == "dv" ||
          hz_name == "flv" ||
          hz_name == "mov" ||
          hz_name == "mp4" ||
          hz_name == "qt" ||
          hz_name == "smil" ||
          hz_name == "swf" ||
          hz_name == "wmv" ||
          hz_name == "3gp"
        ) {
          itemValue.fileIcon = require("../../common/fileIcon/VideoType.png");
        } else if (
          hz_name == "mp3" ||
          hz_name == "wav" ||
          hz_name == "wma" ||
          hz_name == "mid"
        ) {
          itemValue.fileIcon = require("../../common/fileIcon/MusicType.png");
        } else if (hz_name == "pdf") {
          itemValue.fileIcon = require("../../common/fileIcon/PdfType.png");
        } else if (hz_name == "indd") {
          itemValue.fileIcon = require("../../common/fileIcon/indd.png");
        } else if (hz_name == "ai") {
          itemValue.fileIcon = require("../../common/fileIcon/ai.png");
        } else if (hz_name == "psd") {
          itemValue.fileIcon = require("../../common/fileIcon/ps.png");
        } else if (hz_name == "tif") {
          itemValue.fileIcon = require("../../common/fileIcon/tiff.png");
        } else if (hz_name == "zip" || hz_name == "rar") {
          itemValue.fileIcon = require("../../common/fileIcon/RarType.png");
        } else {
          itemValue.fileIcon = require("../../common/fileIcon/other.png");
        }
      }
    },
    //过滤处理文件大小
    renderSize(value) {
      return this.$utils.handleFileSize(value);
    },
    //表格双击事件
    handledbClick(itemValue, event, column) {
      // 以下区域预览
      if(column.type==="selection") return
      var previewData = {
        projectid: this.pro_id,
        rfsId: itemValue.rfsId,
        docId: itemValue.docId,
        photoType: itemValue.type,
        sourceType: "approvalPage",
        docName: itemValue.docName,
        projectName: this.projectName
      };
      this.$store.commit("previewAllFn", previewData);
    },
    // 大小排序
    sort_change() {},
    handleSizeChange() {},
    handleCurrentChange() {}
  }
};
</script>
<style>

</style>
