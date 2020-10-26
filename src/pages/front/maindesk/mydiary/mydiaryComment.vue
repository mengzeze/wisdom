<template>
  <div class="projecjournal">
    <div class="ri_content">
      <el-form
        v-if="mydiaryType == 1"
        ref="form"
        class="form_box1 clearfix"
        @keydown.enter.native="query_all(true)"
      >
        <el-form-item label="创建时间：" label-width="100px">
          <date-range
            :date-start.sync="startTime"
            :date-end.sync="endTime"
            width="160"
            format="yyyy-MM-dd HH:mm:ss"
          ></date-range>
        </el-form-item>
        <el-form-item label="所属项目：" label-width="100px">
          <el-autocomplete
            v-model="searchprjck"
            class="inline-input"
            :hide-loading="false"
            :fetch-suggestions="querySearch"
            placeholder="请输入项目名称"
            clearable
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="日志内容:" label-width="100px">
          <el-input
            v-model="contentText"
            maxlength="50"
            style="width:170px"
            placeholder="请输入关键字搜索"
          ></el-input>
        </el-form-item>
        <el-form-item label-width="20px" align="left">
          <el-button
            size="medium"
            type="primary"
            icon="el-icon-search"
            @click="query_all(true)"
          >
            查询
          </el-button>
          <el-button size="medium" icon="el-icon-refresh" @click="resetBtn">
            重置
          </el-button>
        </el-form-item>
      </el-form>
      <el-tabs
        v-model="activeName"
        style="border:none;clear: both;overflow: hidden;"
        type="border-card"
        @tab-click="handleClick"
      >
        <el-tab-pane label="全部" name="first"></el-tab-pane>
        <el-tab-pane label="我发出的" name="second">
          <!-- 我发出的 -->
        </el-tab-pane>
        <el-tab-pane label="抄送我的" name="third">
          <!-- 抄送我的 -->
        </el-tab-pane>
        <el-tab-pane label="日报" name="fourth">
          <!-- 日报 -->
        </el-tab-pane>
        <el-tab-pane label="周报" name="fifth">
          <!-- 周报 -->
        </el-tab-pane>
        <el-tab-pane label="月报" name="sex">
          <!-- 月报 -->
        </el-tab-pane>
        <div>
          <div
            v-for="(item, index) in tableData"
            :id="item.id"
            :key="index"
            class="ri_list"
          >
            <div class="ri_list_title">
              <div class="ri_list_tit">
                <div class="ri_list_titleimg">
                  <img
                    :src="
                      item.userImg == null
                        ? require('../../../../assets/user_img/projectLogUser.png')
                        : getImgUrl(item)
                    "
                  >
                </div>
                <div class="ri_list_titlename">
                  <span
                  >{{ item.createName }}的<span
                    v-show="item.projectName"
                  >项目</span
                  >日志</span
                  >
                  <span>{{ item.createTime }}</span>
                </div>
              </div>
              <div class="ri_right">
                <p
                  v-show="mydiaryType == 1 && item.projectName"
                  :title="item.projectName"
                >
                  项目: {{ item.projectName }}
                </p>
                <el-dropdown>
                  <span ref="echarType" class="el-dropdown-link">
                    <i class="el-icon-more"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="handleExport(item)">
                      导出附件
                    </el-dropdown-item>
                    <el-dropdown-item
                      v-if="mydiaryType != 1 || item.projectName"
                      @click.native="document(item)"
                    >
                      导出到项目文档
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
            <div class="ri_list_content">
              <div class="ri_content_d">
                <div class="ri_content_title">{{ item.typeName }}内容：</div>
              </div>
              <div class="ri_content_t">
                <div
                  :class="
                    item.overbul
                      ? 'ri_content_cont  '
                      : 'ri_content_cont ovetext'
                  "
                >
                  <!-- contentText -->
                  <div
                    @click="imgViev($event, item.projectId)"
                    v-html="searchFlag && contentText ? item.contentText : item.content"
                  ></div>
                  <!-- <i v-if="item.ellipsisIsShow" class="ellipsis-con">…</i> -->
                  <div v-if="item.overbul" class="enclosure">
                    <p v-if="item.logUserList.length > 0">
                      <span>抄送人：</span>
                      <span
                        v-for="itms in item.logUserList"
                        :key="itms.userId"
                        style="margin: 0 9px 0 2px;"
                      >{{ itms.usName }}</span
                      >
                    </p>
                    <div class="maydia-fujian">
                      <span v-if="item.logFileList.length > 0">附件:</span>
                      <ul class="enclosure_ul">
                        <li
                          v-for="(itmm, index) in item.logFileList"
                          :key="index"
                        >
                          <span
                            :class="
                              itmm.delFlag == 1 ? 'tiltl_li deleth' : 'tiltl_li'
                            "
                            :title="itmm.fileName"
                            style="cursor:pointer;"
                            @click="
                              seeFj(
                                itmm.rfsId,
                                itmm.delFlag,
                                itmm.docId,
                                itmm.docType,
                                item.projectId,
                                itmm,
                                item.projectName
                              )
                            "
                          >{{ itmm.fileName }}</span
                          >
                          <i
                            v-if="itmm.delFlag == 0 || itmm.delFlag == null"
                            class="shapeLoad iconfont Shapecopy color-primary"
                            style="margin-left:8px;cursor:pointer;position: relative;top: -6px;"
                            @click.stop="dowanFs(itmm)"
                          ></i>
                          <!-- el-icon-download color-primary -->
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <el-button
                v-if="!item.overbul"
                class="over_chancg"
                type="text"
                @click="overbulchancg(index)"
              >
                查看全文<i class="arrow-dow1 iconfont arrow-down"></i>
              </el-button>
              <el-button
                v-else
                class="over_chancg"
                type="text"
                @click="overbulchancg(index)"
              >
                收起<i class="arrow-dow2 iconfont arrow-down"></i>
              </el-button>
            </div>
            <div class="comment-btn clearfix">
              <el-button
                plain
                class="fl"
                icon="iconfont reply"
                @click="commentBtn(item, index, 0)"
              >
                评论
              </el-button>
            </div>
            <div class="comment-input-box">
              <div v-if="item.isShowInput" style="position:relative;">
                <el-input
                  v-model="comment"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  placeholder="请输入内容，上限400字"
                  maxlength="400"
                  rows="1"
                  resize="none"
                  show-word-limit
                >
                </el-input>
                <el-button
                  type="text"
                  class="comment-send-btn"
                  :disabled="comment === ''"
                  @click="saveComment(item, 0)"
                >
                  发送
                </el-button>
              </div>
              <div v-if="item.isShowReply" style="position:relative;">
                <div class="reply-sign border-primary-hover">
                  <div style="flex-shrink: 0;">
                    回复<span class="color-primary">@{{ replyUser }}</span>
                  </div>
                  <el-input
                    v-model="comment"
                    class="reply-input"
                    type="textarea"
                    maxlength="400"
                    rows="1"
                    resize="none"
                    show-word-limit
                  ></el-input>
                </div>
                <!-- <el-input class="reply-input" type="textarea" v-model="comment" maxlength="400" rows="1" resize="none" show-word-limit></el-input> -->
                <el-button
                  slot="append"
                  type="text"
                  class="reply-send-btn"
                  :disabled="comment === ''"
                  @click="saveComment(item, 1)"
                >
                  发送
                </el-button>
              </div>
            </div>
            <div class="comment-box">
              <ul>
                <li
                  v-for="(subItem, subIndex) in item.logCommentList"
                  :key="subIndex"
                  class="clearfix"
                >
                  <span>{{ subItem.createName }}:</span>
                  <p v-if="subItem.type != 0">
                    回复：<i>@{{ subItem.userName }}</i>
                  </p>
                  <div @click.stop="commentBtn(subItem, index, 1)">
                    <span
                      class="comment-content"
                      v-html="subItem.content"
                    ></span>
                    <a
                      v-if="subItem.createBy == userId"
                      href="javascript:;"
                      title="删除"
                      @click.stop="deleteComment(subItem)"
                    ><i class="delicon iconfont jujue"></i
                    ></a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <p
            v-if="tableData.length == 0"
            class=""
            style="color: #909399;min-height: 47px;"
          >
            暂无数据
          </p>
          <el-pagination
            style="float:right;padding-right:20px;margin-top: 20px;"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="dataTotal"
            :page-size="pageSize"
            :page-sizes="pageSizes"
            :current-page="currentPage"
            @current-change="onPageChange"
            @size-change="handleSizeChange"
          ></el-pagination>
        </div>
      </el-tabs>
    </div>
    <input id="fileBtn" type="file" style="display:none">
  </div>
</template>

<script>
export default {
  name: 'Projecjournal',
  props: ['mydiaryType'],
  data() {
    return {
      selectedFileList: [],
      token: this.$store.state.loginObject.userToken,
      userId: this.$store.state.loginObject.userId,
      projectId: this.$store.state.projectMsg.pro_id, // 项目id"
      joumaltype: '',
      projectMsg: this.$store.state.projectMsg.projectMsg,
      contentText: '', // 日志内容
      activeName: 'first',
      dialogVisible: false, // 弹框
      peodatas: [], // 联系人
      deployObj: [], // 添加抄送人员
      deployObjss: [], // 添加抄送人员
      flag: false, // 插件控制
      ri_data: {
        type: '', // 日志类型（1:日报/2:周报/3:月报）
        content: '', // 日志内容",
        userIds: [], // 抄送人员id集合
        docIds: [] // 附件id集
      },
      userm: [],

      // 默认头像
      hea_img: 'user.png',
      options: [
        {
          value: '1',
          label: '日报'
        },
        {
          value: '2',
          label: '周报'
        },
        {
          value: '3',
          label: '月报'
        }
      ],
      desc: '',
      // 上传控制
      uploadDocAddIsShow: false,
      addDoc: false,
      uploadParamData: {
        docSource: 5,
        projId: 1,
        parentId: null,
        auditProjectId: null
      },
      success_code: '',
      shagchaun: [],
      shagchaunlist: [],
      shagreatlist: [],
      shagreatl: [],
      tableData: [],
      // 关联附件
      relafag: false,
      startTime: '', // 开始时间
      endTime: '', // 结束时间
      searchprjck: '', // 搜索名称
      // 所属项目
      myvoteyproj: '',
      myvoteproj: [],
      // 所属项目
      myvottypss: [],
      // 分页
      pageSize: 10,
      pageSizes: [10, 20, 50, 100], // 每页显示数量
      currentPage: this.$route.query.isPosition ? this.$route.query.pageNo : 1, // 当前页
      dataTotal: 0, // 总量
      remindVayss: [],
      // 新增选择人员
      findFlag: false,
      findState: {},
      checkState: {},
      voteprojId: this.$store.state.voteprojId,
      createUserList: [],
      currentIsIe: false,
      comment: '', // 评论或者回复内容
      replyUser: '', // 被回复的用户名
      reolyId: '', // 被回复的用户名id
      newJournalTimer: null, // 草稿定时器,
      relafagmanus: false, // 从底稿选择
      findUserObj: [],
      searchFlag: false // 搜索标识
    };
  },
  computed: {},

  watch: {
    pageSize: function(valu) {
      this.query_all(this.joumaltype);
    },
    dialogVisible: function(val) {
      if (val == false) {
        this.deployObj = [];
        this.deployObjss = [];
      }
    },
    comment: function(val) {
      if (val.length >= 400) {
        this.$message.warning({
          message: '超出输入限制'
        });
      }
    },
    myvoteyproj: function(valu) {
      var that = this;
      that.deployObj = [];
      this.uploadParamData.projId = valu;
      for (var i = 0; i < that.myvottypss.length; i++) {
        if (that.myvottypss[i].id == valu) {
          var names = that.myvottypss[i].createUserIdList;
          console.log(that.myvottypss[i].picNames);
          let list = [];
          if (
            that.myvottypss[i].picNames != '' &&
            that.myvottypss[i].picNames != null
          ) {
            list = that.myvottypss[i].picNames.split(',');
          } else {
            list = [];
          }
          for (var j = 0; j < names.length; j++) {
            var obj = {};
            obj.name = list[j];
            obj.label = list[j];
            obj.userId = names[j];
            obj.uniqueKey = 'user' + names[j];
            obj.canDelete = false;
            obj.originData = true;
            that.deployObj.push(obj);
          }
        }
      }
    }
  },
  mounted() {
    this.query_all();
    this.teyproj();
  },
  methods: {
    // 输入框匹配
    querySearch(queryString, callback) {
      let cbVal = queryString
        ? this.myvoteproj.filter(this.createFilter(queryString))
        : this.myvoteproj;
      callback(cbVal);
    },
    createFilter(queryString) {
      return (item) => {
        return item.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1;
      };
    },
    deleteSelected(list, item, ref) {
      let idx = '';
      if (item.addSource === 1 && !item.docId) {
        // 删除正在上传的文件
        idx = list.findIndex(
          (v) => v.addSource === item.addSource && v.docId === item.docId
        );
        this.$refs[ref].deleteDoc(item.id);
      } else {
        // 删除已上传、项目文档、底稿文件
        idx = list.findIndex(
          (v) => v.addSource === item.addSource && v.id === item.id
        );
      }
      list.splice(idx, 1);
    },
    // 查询所有日志
    parentHandleclick() {
      this.currentPage = 1;
      this.query_all();
    },
    // 查询
    query_all(isSearch = false) {
      var _this = this;
      console.log(
        this.$route.path,
        9,
        this.$route.query.isPosition,
        this.$route,
        this.contentText
      );
      isSearch && (this.currentPage = 1);
      this.searchFlag = isSearch
      var dataObj = {
        token: this.token,
        userId: this.userId,
        pageNo: this.$route.query.isPosition
          ? this.$route.query.pageNo
          : this.currentPage,
        pageSize: this.pageSize,
        data: {}
      };
      let url = '';
      if (this.mydiaryType == 1) {
        url = '/info/project/getMyProjectLogAll';
        dataObj.data = {
          type: this.joumaltype, // （1:日报/2:周报/3:月报/4:我发出的/5:抄送我的）
          startTime: this.startTime,
          endTime: this.endTime ? this.endTime.substr(0, 11) + '23:59:59' : '',
          projectName: this.searchprjck,
          contentText: this.contentText,
          projectId: this.projectId // "项目id"
        };
      } else {
        url = '/info/project/getProjectLogAll';
        dataObj.data = {
          type: this.joumaltype, // （1:日报/2:周报/3:月报/4:我发出的/5:抄送我的）
          projectId: this.projectId // "项目id"
        };
      }
      // console.log(this.mydiaryType, url, dataObj)
      this.$post(url, dataObj)
        .then((response) => {
          if (response.code == _this.code.codeNum.SUCCESS) {
            console.log(response)
            _this.tableData = response.data.list;
            _this.dataTotal = response.data.total;
            _this.tableData.forEach((c) => {
              if (c.id) {
                c.overbul = false;
              }
              if (_this.isIE()) {
                c.ellipsisIsShow = true;
                _this.currentIsIe = true;
              } else {
                c.ellipsisIsShow = false;
                _this.currentIsIe = false;
              }
              if (_this.joumaltype == undefined) {
                c.isShowInput = false;
                c.isShowReply = false;
              }
              c.logCommentList.forEach((obj) => {
                for (var k in obj) {
                  if (k === 'content') {
                    obj[k] = obj[k].replace(/^\s+|\s+$/g, ''); // 去掉首尾换行
                    obj[k] = obj[k].replace(/(\r\n|\n|\r)/g, '<br/>'); // 换行转换成<br/>标签
                  }
                }
              });
              c.userImgAddress = _this.$utils.getDownloadUrl(c.userImg);
              c.content = c.content.replace(/”/g, '"');
              c.content = c.content.replace(/<img/g, '<img class="img"');
              // 主工作台中的数据id
              if (c.id === _this.$route.query.id) {
                _this.scrollToLocation();
                console.log('定位到了，id是', c.id, _this.$route.query.id);
              }
            });
          } else {
            // _this.$message.error((response.msg == '暂无该权限'? '没有该权限' : response.msg));
            _this.$message.error(response.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 滚动到相对位置
    scrollToLocation() {
      setTimeout(() => {
        $('#' + this.$route.query.id).css('background-color', '#f6f6f6');
        document.getElementById(this.$route.query.id).scrollIntoView();
        this.$router.replace({
          path: '/mydiary',
          query: { isPosition: false, id: this.$route.query.id }
        });
        setTimeout(() => {
          $('#' + this.$route.query.id).css('background-color', 'white');
        }, 3000);
      }, 1000);
    },
    imgViev(e, projectId) {
      if ($(e.target).hasClass('img')) {
        let linkArr = $(e.target)
          .attr('src')
          .split('/');
        let previewData = {
          projectId: this.mydiaryType == 1 ? projectId : this.projectId,
          photoType: 'jpg'
        };
        let docId = linkArr[linkArr.length - 1]
        if (!isNaN(+docId)) {
          previewData.docId = docId
        } else {
          previewData.staticSrc = $(e.target).attr('src')
        }
        this.$store.commit('previewAllFn', previewData);
      }
    },
    // tab切换筛选
    handleClick(tab, event) {
      // this.currentPage = 1; //当前页
      this.currentPage = this.$route.query.isPosition
        ? this.$route.query.pageNo
        : this.currentPage;
      this.pageSize = 10;
      if (tab.name == 'first') {
        this.joumaltype = '';
        this.query_all();
      } else if (tab.name == 'second') {
        this.joumaltype = 4;
        this.query_all();
      } else if (tab.name == 'third') {
        this.joumaltype = 5;
        this.query_all();
      } else if (tab.name == 'fourth') {
        this.joumaltype = 1;
        this.query_all();
      } else if (tab.name == 'fifth') {
        this.joumaltype = 2;
        this.query_all();
      } else {
        this.joumaltype = 3;
        this.query_all();
      }
    },
    // 查询所属项目
    teyproj() {
      this.$post('/info/project/getSimpleProjectList')
        .then((response) => {
          if (response.code != this.code.codeNum.SUCCESS) {
            this.$message.error(response.msg);
            return;
          }
          this.myvoteproj = response.data.map((item) => {
            return { id: item.id, name: item.name, value: item.name };
          });
          // 添加一个空行
          let obj = { id: '', name: ' ', value: ' ' };
          this.myvoteproj.unshift(obj);
          this.myvottypss = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    // 查看附件
    seeFj(v, num, docId, type, projectId, obj, projectName) {
      if (num == 1) {
        this.$message({
          type: 'warning',
          message: '该附件已被删除'
        });
        return;
      }
      var proViewData = {
        projectId: projectId,
        rfsId: v,
        docId: docId,
        photoType: type,
        docName: obj.fileName,
        sourceName: '我的日志',
        projectName: projectName
      };
      this.$store.commit('previewAllFn', proViewData);
    },

    // 下载附件
    dowanFs(item) {
      if (this.$store.state.isPC) {
        this.$store.commit('pcOtherDownload', {
          docId: item.docId,
          docName: item.fileName
        });
      } else {
        this.$store.commit('download', [
          {
            name: item.fileName,
            id: item.docId
          }
        ]);
      }
    },

    // 上传成功后的回调
    docUploadFn(uploadData) {
      var docType = uploadData.fileData.type;
      var index = docType.indexOf('/');
      var imgtype = docType.slice(index + 1);
      this.shagchaunlist.push({
        id: uploadData.docId,
        name: uploadData.docName,
        rfsId: uploadData.fileData.rfsId,
        type: imgtype
      });
      this.$refs.uploadRef.uploadComplete();
    },
    docUploadAllsucess() {
      this.addDoc = false;
      this.uploadDocAddIsShow = false;
    },
    // 删除
    deletetDoc(num, val) {
      var that = this;
      this.$confirm('确认要把文件放入回删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (num == 1) {
            that.shagchaunlist.splice(val, 1);
          } else {
            that.shagreatlist.splice(val, 1);
          }
          that.$message({
            message: '删除成功',
            type: 'success'
          });
        })
        .catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    // 收起的方法
    overbulchancg(v) {
      if (this.currentIsIe) {
        this.tableData[v].ellipsisIsShow = !this.tableData[v].ellipsisIsShow;
      }
      this.tableData[v].overbul = !this.tableData[v].overbul;
      this.$forceUpdate();
    },
    // 点击评论按钮
    commentBtn(item, index, type) {
      this.comment = '';
      if (type == 0) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.$set(this.tableData[i], 'isShowInput', false);
          this.$set(this.tableData[i], 'isShowReply', false);
        }
        this.$set(this.tableData[index], 'isShowInput', true);
      } else {
        for (let i = 0; i < this.tableData.length; i++) {
          this.$set(this.tableData[i], 'isShowReply', false);
          this.$set(this.tableData[i], 'isShowInput', false);
        }
        this.replyUser = item.createName;
        this.reolyId = item.createBy;
        this.$set(this.tableData[index], 'isShowReply', true);
      }
      this.$forceUpdate();
    },
    // 日志重置
    resetBtn() {
      this.startTime = '';
      this.endTime = '';
      // 所属项目
      this.searchprjck = '';
      // 日志内容
      this.contentText = '';
      this.searchFlag = false
    },
    // 新增日志取消或关闭弹窗
    cancelAddjoumal() {
      this.dialogVisible = false;
      this.ri_data.content = '';
      // 清空富文本
      this.$refs['editor'].clear();
      clearInterval(this.newJournalTimer);
      this.$refs['attachment'].close;
    },
    // 分页
    onPageChange(currentPage) {
      this.currentPage = currentPage;
      this.query_all();
      console.log(this.currentPage, '9'); // 点击第几页
    },
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(`每页 ${val} 条`);
    },
    // 导出
    handleExport(val) {
      this.mydiaryType == 1 ? this.exportmyDiary(val) : this.exportProject(val);
    },
    exportmyDiary(val) {
      if (val.projectId && val.projectId !== 0) {
        this.exportProject(val, 'isFlag');
        return;
      }
      var a = [];
      for (var i = 0; i < val.logUserList.length; i++) {
        a.push(val.logUserList[i].usName);
      }
      console.log(val);
      // return
      // console.log(a.join(","));
      var exportlis = [];
      exportlis.push({
        copyerName: a.join(','),
        typeName: val.typeName,
        content: val.content,
        projectName: val.projectName || '', // 项目名称
        createTime: val.createTime
      });
      if (exportlis.length > 0) {
        this.$message({
          type: 'success',
          message: '正在导出!'
        });
        this.$store.commit('export', {
          url: '/info/project/exportMyLog',
          data: exportlis
        });
      }
    },
    // 导出
    exportProject(val, isFlag) {
      console.log('项目的导出', isFlag);
      var obj = {
        token: this.token,
        userId: this.userId,
        projectId: isFlag ? val.projectId : this.projectId,
        data: {
          projectId: isFlag ? val.projectId : this.projectId
        }
      };
      var _this = this;
      this.$post('/info/project/getProjectPerm', obj)
        .then((response) => {
          if (response.code !== 0) {
            _this.$message.error(response.msg);
            return;
          }

          if (response.code == _this.code.codeNum.SUCCESS) {
            var num = 0;
            for (var i = 0; i < response.data.length; i++) {
              if (response.data[i] == 'project_export_log') {
                num = 1;
              }
            }
            if (num == 0) {
              _this.$message({
                type: 'error',
                message: '没有该权限'
              });
            } else {
              console.log(1111, val.projectId, this.projectId);
              var a = [];
              for (let i = 0; i < val.logUserList.length; i++) {
                a.push(val.logUserList[i].usName);
              }
              var exportlis = [];
              exportlis.push({
                copyerName: a.join(','),
                typeName: val.typeName,
                content: val.content,
                projectName: isFlag ? val.projectName : _this.projectMsg.name, // "项目名称\
                createTime: val.createTime
              });
              if (exportlis.length > 0) {
                _this.$message({
                  type: 'success',
                  message: '正在导出!'
                });
                _this.$store.commit('export', {
                  url: '/info/project/exportProjectLog',
                  data: exportlis,
                  projectIdFlag: isFlag ? val.projectId : this.projectId
                });
              }
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 删除抄送人
    delecr(val) {
      this.deployObj.splice(val, 1);
    },
    // 导出关联文档
    document(va) {
      console.log(va, '导出到项目文档');
      var _this = this;
      var usNamelkist = [];
      if (va.logUserList !== '') {
        va.logUserList.forEach((c) => {
          if (c.userId) {
            usNamelkist.push(c.usName);
          }
        });
      }
      var obj = {
        token: this.token,
        userId: this.userId,
        projectId: va.projectId,
        data: {
          projectId: va.projectId
        }
      };
      this.$post('/info/project/getProjectPerm', obj)
        .then((response) => {
          if (response.code == _this.code.codeNum.SUCCESS) {
            var num = 0;
            for (var i = 0; i < response.data.length; i++) {
              if (response.data[i] == 'project_log_relation') {
                num = 1;
              }
            }
            if (num == 0) {
              _this.$message({
                type: 'error',
                message: '没有该权限'
              });
            } else {
              var data = {
                token: _this.token,
                userId: _this.userId,
                projectId: va.projectId,
                projectName:
                  this.mydiaryType == 1 ? va.projectName : this.projectMsg.name, // "项目名称\
                sourceName: this.mydiaryType == 1 ? '我的日志' : '项目日志',
                data: {
                  id: va.id, // "项目日志id",
                  createBy: va.createBy, // "创建人id",
                  createTime: va.createTime, // "创建时间",
                  typeName: va.typeName, // "日志类型",
                  content: va.content, // "日志内容",
                  projectId: va.projectId, // "项目id"
                  copyerName: usNamelkist.join(','), // \"抄送人名
                  projectName:
                    this.mydiaryType == 1
                      ? va.projectName
                      : this.projectMsg.name // "项目名称\
                }
              };

              _this
                .$post('/info/project/exportLogToProject', data)
                .then((response) => {
                  if (response.code == _this.code.codeNum.SUCCESS) {
                    _this.$message({
                      type: 'success',
                      message: response.msg
                    });
                  } else {
                    _this.$message({
                      type: 'error',
                      message: response.msg
                    });
                  }
                })
                .catch(function(error) {
                  console.log(error);
                });
            }
          } else {
            _this.$message({
              type: 'info',
              message: response.msg
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 添加评论
    saveComment(item, type) {
      if (this.comment === '' && type === 0) {
        this.$message.warning('请输入评论内容');
        return;
      } else if (this.comment === '' && type === 1) {
        this.$message.warning('请输入回复内容');
        return;
      }
      var listObj = {
        token: this.token,
        userId: this.userId,
        projectId: this.projectId,
        data: {
          type: type, // 0：评论/1：回复
          projectId: this.projectId,
          content: this.comment,
          logId: item.id,
          revertUser: this.reolyId // 有回复才会起作用
        }
      };
      this.$post('/info/project/addComment', listObj).then((response) => {
        if (response.code == this.code.codeNum.SUCCESS) {
          this.$message.success(response.msg);
          this.query_all(this.joumaltype);
        } else {
          this.$message({
            type: 'info',
            message: response.msg
          });
        }
      });
    },
    // 删除评论
    deleteComment(item) {
      var listObj = {
        token: this.token,
        userId: this.userId,
        projectId: this.projectId,
        data: {
          id: item.id
        }
      };
      this.$post('/info/project/delComment', listObj).then((response) => {
        if (response.code == this.code.codeNum.SUCCESS) {
          this.$message.success(response.msg);
          this.query_all(this.joumaltype);
        } else {
          this.$message({
            type: 'info',
            message: response.msg
          });
        }
      });
    },
    checkIsEnter(event) {
      this.comment = this.comment + ' \n ';
    },
    htmls2(val) {
      this.ri_data.content = val;
    },
    // 判断是否为IE浏览器
    isIE() {
      if (!!window.ActiveXObject || 'ActiveXObject' in window) {
        return true;
      } else {
        return false;
      }
    },
    getImgUrl(item) {
      return this.$utils.getDownloadUrl(item.userImg);
    }
  }
};
</script>

<style scoped lang="scss" type="text/css">
/deep/ .el-upload__tip {
  font-size: 11px;
  color: red;
}
.projecjournal {
  padding: 0px 0px;
  width: 100%;
  clear: both;
  overflow: hidden;
  .ri_content {
    margin-top: 8px;
    width: 100%;
    clear: both;
    overflow: hidden;

    background: rgba(255, 255, 255, 1);
    .el-tab-pane {
      padding: 0px 2px;
    }
    .ri_list {
      width: 97%;
      padding: 8px;
      background: rgba(255, 255, 255, 1);
      border-bottom: 2px solid #eceef1;
      clear: both;
      overflow: hidden;
    }
  }
  .delicon {
    font-size: 10px;
    margin-left: 10px;
  }
  .comment-box {
    padding-top: 6px;
    font-size: 14px;
    color: rgba(51, 51, 51, 1);
    a {
      display: none;
      width: 10px;
      height: 10px;
      margin-bottom: 4px;
      background: url("/../../assets/prolist/delete.png") no-repeat 0 0;
      background-size: 10px 10px;
    }
    a:hover {
      background: url("/../../assets/prolist/delete2.png") no-repeat 0 0;
    }

    li {
      display: flex;
      align-items: center;
      padding-bottom: 4px;
      div {
        flex: 1;
        text-align: left;
      }
    }
    li:hover {
      a {
        display: inline-block;
      }
    }
    span {
      padding-right: 6px;
      font-weight: bold;
    }
    .comment-content {
      padding-right: 0;
      font-weight: normal;
      word-break: break-all;
    }
    p {
      padding-right: 4px;
      pre {
        float: left;
      }
    }
    i {
      color: #0061a9;
    }
  }
  .ri_list_title {
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    clear: both;
    overflow: hidden;
    margin-top: 3px;
  }
  .ri_list_content {
    width: 100%;
    text-align: left;
    .ri_content_t {
      display: flex;
      line-height: 20px;
    }
  }
  .comment-input-box {
    margin-top: 6px;
  }
  .ri_list_tit {
    display: flex;
    align-items: center;
    clear: both;
    overflow: hidden;
  }
  .ri_list_rijht {
    width: 20px;
    height: 15px;
    float: right;
    margin-right: 8px;
  }
  .ri_list_titleimg {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    clear: both;
    overflow: hidden;
  }
  .ri_list_titleimg img {
    width: 100%;
    height: 100%;
  }
  .ellipsis_d {
    display: inline-block;
    width: 4px;
    height: 4px;
    background: #c1c1c1;
    border-radius: 50%;
  }

  .new_rizi {
    .form_box {
      margin-top: 15px;
    }
  }
  .ovetext {
    display: -webkit-box;
    overflow: hidden;
    word-wrap: break-word;
    /*! autoprefixer: ignore next */
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }
  .enclosure {
    margin-top: 6px;
  }
  .enclosure_ul {
    margin-left: 30px;
    width: 90%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .enclosure_ul li {
    margin-right: 80px;
  }
  .shapeLoad {
    font-size: 14px;
  }
  .over_chancg {
    height: 30px;
  }
  .comment-btn {
    text-align: left;
    margin-top: 5px;
    .el-button {
      padding: 0;
      border: 0;
    }
  }
  .comment-send-btn {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
    padding-right: 8px;
  }
  .reply-send-btn {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
    padding-right: 8px;
  }
  .reply-sign {
    // position: absolute;
    position: relative;
    display: flex;
    justify-content: space-between;
    left: 0;
    top: 0;
    z-index: 1;
    height: 33px;
    line-height: 33px;
    padding-left: 10px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    span {
      color: #999999;
      text-align: left;
    }
  }
}

.form_box1 {
  background: #fff;
  padding-top: 20px;
  padding-left: 10px;
  padding-bottom: 10px;
  .el-form-item {
    float: left;
    margin-right: 10px;
    margin-bottom: 12px;
    height: 40px;
    .el-input {
      width: 200px;
    }
    .inline-input {
      width: 200px;
    }
  }
}
.tiltl_li {
  display: inline-block;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.deleth {
  text-decoration: line-through;
}
.delefj:hover {
  color: #0061a9;
}
.deletro {
  display: inline-block;
  width: 15px;
  height: 15px;
  background: url("../../../../assets/image/sanc.png") no-repeat;
  background-size: 100% 100%;
}
.addimg {
  display: inline-block;
  width: 16px;
  height: 16px;
  background: url("../../../../assets/image/addtask.png") no-repeat;
  background-size: 100% 100%;
}
.userbtn {
  float: left;
  position: relative;
  margin-right: 10px;
}
.delusebtn {
  position: absolute;
  right: 0px;
  top: -3px;
}
.form_box .el-form-item {
  margin-bottom: 20px;
}
.clip-self-deep:after {
  display: block;
  content: " ";
  width: 1px;
  height: 1px;
  visibility: hidden;
  clear: both;
  zoom: 0;
}
pre {
  white-space: pre-wrap; /* css3.0 */
  white-space: -moz-pre-wrap; /* Firefox */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
}

.attachment-wrap {
  margin-right: 60px;
}
p.attachemnt-list-doc {
  display: flex;
  align-items: center;
}

p.attachemnt-list-doc .doc-name {
  display: inline-block;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
}

p.attachemnt-list-doc .doc-delete {
  font-size: 14px;
  font-weight: 400;
  color: #0061a9;
  cursor: pointer;
  margin-top: 2px;
}

.attachemnt-list-item .attachemnt-progress {
  width: 200px;
}
.form_box .userbtn-box {
  margin-bottom: 0;
}
.ri_list_titlename {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin-left: 10px;
  text-align: left;
  > span:nth-child(1) {
    font-weight: bold;
    font-size: 14px;
  }
  > span:nth-child(2) {
    font-size: 12px;
    margin-top: 3px;
  }
}
.ri_content_title {
  height: 18px;
  display: inline-block;
  text-align: right;
  margin: 13px 0;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}
.ri_content_cont {
  width: 100%;
  position: relative;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-wrap: break-word;
  color: #333333;
}
.ellipsis-con {
  position: absolute;
  right: 0;
  bottom: 0;
  padding-left: 4px;
  background: #fff;
}
.arrow-dow1 {
  position: relative;
  top: 2px;
  font-size: 14px;
}
.arrow-dow2 {
  font-size: 14px;
  position: absolute;
  transform: rotate(180deg);
  -ms-transform: rotate(180deg); /* Internet Explorer 9*/
  -moz-transform: rotate(180deg); /* Firefox */
  -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
  -o-transform: rotate(180deg); /* Opera */
}
.maydia-fujian {
  display: flex;
  margin-top: 5px;
}
/deep/ .el-upload {
  width: 40px;
}
</style>
<style lang="scss" type="text/css">
.el-dialog {
  text-align: left;
}
.el-dialog__header {
  padding: 20px 20px 10px;
  text-align: center;
  border-bottom: 1px solid #e8e8e8;
}
.el-dialog__body {
  padding: 14px 20px 20px 30px;
  color: #606266;
  font-size: 14px;
}


.projecjournal .ovetext {
  display: -webkit-box;
  overflow: hidden;
  word-wrap: break-word;
  /*! autoprefixer: ignore next */
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
}
.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: #f5f7fa;
  color: #666666;
}
.ri_content_cont div .img {
  display: block;
  width: 40px;
  height: 40px;
  vertical-align: top;
}
.ri_content_cont table {
  border: 1px solid #ccc;
  margin-top: 6px;
}
.ri_content_cont td {
  border-left: 1px solid #ccc;
  border-top: 1px solid #ccc;
}
.ri_content_cont th {
  border-left: 1px solid #ccc;
}
.projecjournal {
  .comment-input-box {
    .el-textarea__inner {
      overflow: hidden;
      padding-right: 60px;
    }
    .reply-input {
      .el-textarea__inner {
        border: none;
        padding-right: 50px;
      }
    }
    .el-button {
      padding: 8px 12px;
    }
  }
}
.ri_right {
  display: flex;
  > p {
    margin-right: 15px;
    max-width: 316px;
    color: #333;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
