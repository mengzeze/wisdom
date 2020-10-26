<template>
  <div class="metting-details">
    <!-- 会议详情 -->
    <el-dialog
      :title="handleType == 1 ? '会议详情' : '编辑会议'"
      :visible.sync="isShow"
      :close-on-click-modal="false"
      width="680px"
      @close="clickEvent"
    >
      <div
        class="tan_dialog"
        style="text-align: left;"
        :class="{ autoHeight: autoHeight }"
      >
        <el-scrollbar style="height:100%">
          <el-form ref="form" label-width="134px">
            <el-form-item
              label="参会人员:"
              width="180px"
              v-if="handleType == 1"
              class="overFlowScroll"
            >
              <div class="usernanmes">
                <span style="padding-right: 6px;"
                  v-for="(item, index) in mett_details.meetingUserList"
                  :key="index"
                >
                  {{ item.usName }}
                </span>
              </div>
            </el-form-item>
            <el-form-item
              label="参会人员:"
              width="180px"
              v-if="handleType == 2"
              class="overFlowScroll"
            >
              <div class="usernanmes">
                <span
                  class="userbtn"
                  style="padding-left:9px;padding-right:20px;"
                  v-for="(item, index) in editobjDefName"
                  :key="index"
                >
                  {{ item.usName }}
                </span>
                <span
                  class="userbtn"
                  style="padding-left:9px;padding-right:20px;"
                  v-for="(item, index) in editobj_usName"
                  :key="index"
                >
                  {{ item.usName }}
                  <button
                    class="deletro delusebtn"
                    @click.prevent="delet_bx(index)"
                  ></button>
                </span>
                <span v-if="editobj_usName.length > 0">&nbsp;&nbsp;</span>
                <el-button type="primary" @click="optPrinFn(3)" size="mini"
                  >选择人员</el-button
                >
              </div>
            </el-form-item>
            <el-form-item
              label="列席人员:"
              width="180px"
              v-if="handleType == 1"
              class="overFlowScroll"
            >
              <div class="usernanmes">
                <span
                  type="text" style="padding-right: 6px;"
                  v-for="(item, id) in mett_details.rankUserList"
                  :key="id"
                >
                  {{ item.usName }}
                </span>
              </div>
            </el-form-item>
            <el-form-item
              label="列席人员:"
              width="180px"
              v-if="handleType == 2"
              class="overFlowScroll"
            >
              <div class="usernanmes">
                <span
                  class="userbtn"
                  style="padding-left:9px;padding-right:20px;"
                  v-for="(item, index) in editobj_rankDefUserList"
                  :key="index"
                >
                  {{ item.usName }}
                </span>
                <span
                  class="userbtn"
                  style="padding-left:9px;padding-right:20px;"
                  v-for="(item, index) in editobj_rankUserList"
                  :key="index"
                >
                  {{ item.usName }}
                  <button
                    class="deletro delusebtn"
                    @click.prevent="delet_bl(index)"
                  ></button>
                </span>
                <!-- <span v-if="editobj_rankUserList.length > 0">&nbsp;&nbsp;</span> -->
                <el-button
                  type="primary"
                  @click="optPrinFn(4)"
                  size="mini"
                  :class="{'edit-meeting-button': editobj_rankDefUserList.length || editobj_rankUserList.length}"
                  v-if="handleType == 2"
                  >选择人员</el-button
                >
              </div>
            </el-form-item>
            <el-form-item label="会议主题:" width="600px">
              <p
                style="width:80%;white-space: nowrap;text-overflow : ellipsis;overflow:hidden;"
                v-if="handleType == 1"
                :title="mett_details.name"
              >
                {{ mett_details.name }}
              </p>
              <el-input
                v-model="editobj.name"
                placeholder="请输入会议主题"
                :maxlength="50"
                v-else
              ></el-input>
            </el-form-item>
            <el-form-item
              label="会议类型:"
              width="120px"
              v-if="handleType == 1"
              >{{ mett_details.typeName }}</el-form-item
            >
            <el-form-item label="会议类型:" v-if="handleType == 2">
              <el-select
                v-model="typeName"
                disabled
                placeholder="请选择会议类型"
                style="width:217px;"
              >
                <el-option
                  disabled
                  v-for="item in selectStateList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="会议地点:"
              width="130px"
              v-if="handleType == 1"
              >{{ mett_details.site }}</el-form-item
            >
            <el-form-item
              label="会议地点:"
              width="130px"
              v-if="handleType == 2"
            >
              <el-input
                v-model="meetingSite"
                placeholder="请输入会议地点"
                :maxlength="30"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="会议抄送人:"
              width="130px"
              v-if="handleType == 1"
            >
              <span
                type="text"
                v-for="(item, id) in mett_details.copyerUserList"
                :key="id"
              >
                {{ item.usName }}
              </span>
            </el-form-item>
            <el-form-item
              label="起止时间:"
              width="180px"
              v-if="handleType == 1"
            >
              {{ mett_details.startTime }}~{{ mett_details.endTime }}
            </el-form-item>
            <el-form-item label="会议时间:" v-if="handleType == 2">
              <el-date-picker
                @focus="$utils.handleTimeFocus"
                v-model="editobj_startTime"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="会议开始时间"
              ></el-date-picker>
              <el-date-picker
                @focus="$utils.handleTimeFocus"
                v-model="editobj_endTime"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="会议结束时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="提醒:" width="180px" v-if="handleType == 1"
              >{{ djjt }}、{{ mett_details.remindVay }}</el-form-item
            >
            <el-form-item label="提醒:" v-if="handleType == 2">
              <el-select
                v-model="editobj.remindType"
                placeholder="无提醒"
                style="width:217px;"
              >
                <el-option
                  v-for="item in selectremind"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>

              <el-select
                v-model="editobj.remindVay"
                v-if="editobj.remindType !== 0"
                multiple
                placeholder="请选择"
              >
                <el-option
                  v-for="item in modelist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="会议内容:"
              width="180px"
              v-if="
                mett_details.content !== null &&
                  mett_details.content !== '' &&
                  handleType == 1
              "
            >
              <p class="content_x">{{ mett_details.content }}</p>
            </el-form-item>
            <el-form-item
              label="会议内容:"
              style="margin-top:10px;"
              v-if="handleType == 2"
            >
              <el-input
                type="textarea"
                :rows="2"
                v-model.trim="editobj.pro_remark"
                placeholder="请输入会议内容"
                :maxlength="2000"
                style="width:450px;text-align: left;"
                resize="none"
              ></el-input>
            </el-form-item>
            <el-form-item label="附件:" width="180px" v-if="handleType == 1">
              <ul style="max-height:113px;overflow:auto;">
                <li
                  v-for="item in mett_details.meetingFileList"
                  :key="item.id"
                  @click="
                    seeFj(
                      item.rfsId,
                      item.delFlag,
                      item.docId,
                      item.docType,
                      item
                    )
                  "
                  :class="
                    (item.delFlag == 1 ? 'deleth' : '') + ' clip-self-deep'
                  "
                >
                  <span
                    :class="`file-name ${item.delFlag == 1 ? 'del-file' : ''}`"
                    :title="item.fileName"
                  >
                    {{ item.fileName }}
                  </span>
                  <div style="float:left;">
                    <i
                      v-if="item.delFlag == 0"
                      style="margin-left:25px;cursor:pointer;"
                      @click.stop="dowanFs(2, item)"
                    >
                      下载
                    </i>
                  </div>
                </li>
              </ul>
            </el-form-item>
            <el-form-item
              label="附件:"
              label-width="134px"
              style="line-height: 40px;margin-top:8px "
              align="left"
              class="w-100"
              v-if="handleType == 2"
            >
              <add-attachment
                ref="attachmentEdit"
                :projectId="projectId"
                @select="$utils.handleSelect(arguments, selectedFileListEdit)"
              >
              </add-attachment>
              <div class="overflFile">
                <ul style="text-align: left;" class="attachment-wrap">
                  <li
                    v-for="(item, index) in selectedFileListEdit"
                    :key="index"
                  >
                    <p class="attachemnt-list-doc">
                      <span
                        class="doc-name"
                        @click="
                          $utils.handleUploadFilePreview(item, {
                            projectId: projectId,
                            sourceName:
                              handleType == 1 ? '会议详情' : '编辑会议',
                            projectName: handleMeeting.projectName
                          })
                        "
                        :title="item.docName"
                        >{{ item.docName }}</span
                      >
                      <span>
                        <el-button
                          v-if="item.addSource !== 1"
                          type="text"
                          @click="$utils.handleDownLoadSelected(item)"
                          >下载</el-button
                        >
                        <el-button
                          type="text"
                          @click="
                            $utils.handleDeleteSelected(
                              selectedFileListEdit,
                              item
                            )
                          "
                          >删除</el-button
                        >
                      </span>
                    </p>
                  </li>
                </ul>

                <ul style="text-align: left;" class="attachment-wrap">
                  <li v-for="(item, index) in getFileListEdit" :key="index">
                    <p class="attachemnt-list-doc">
                      <span
                        class="doc-name"
                        @click="
                          $utils.handleUploadFilePreview(item, {
                            projectId: projectId,
                            sourceName:
                              handleType == 1 ? '会议详情' : '编辑会议',
                            projectName: handleMeeting.projectName
                          })
                        "
                        :title="item.docName"
                        >{{ item.docName }}</span
                      >
                      <span>
                        <el-button
                          type="text"
                          @click="$utils.handleDownLoadSelected(item)"
                          >下载</el-button
                        >
                      </span>
                    </p>
                  </li>
                </ul>
              </div>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
      <span slot="footer" class="dialog-footer" v-if="handleType == 2">
        <el-button size="medium" @click="clickEvent">取 消</el-button>
        <el-button size="medium" type="primary" @click="naioi">保 存</el-button>
      </span>
    </el-dialog>
    <!--选择人员 -->
    <findall-deptuser
      :findFlagShow.sync="findFlag"
      :findUserObj="findUserObj"
      v-on:findAllUser="findAllUser"
      :findState="findState"
      :checkState="checkState"
    ></findall-deptuser>
  </div>
</template>

<script>
//选择人员
import findallDeptuser from "@/components/select_box/findAllDeptUserMultipleNew";
export default {
  name: "meetingDetails",
  components: {
    findallDeptuser
  },
  props: [
    "meetingDetaVisible",
    "handleType", //操作类型1详情，2编辑
    "handleMeeting" //当前操作的会议
  ],
  data() {
    return {
      client: window.client,
      token: "",
      userId: "",
      projectId: "",
      success_code: "",
      isShow: true,
      //新增选择人员
      findFlag: false,
      findState: {},
      checkState: {},
      findUserObj: [],
      user_num: "",
      mett_details: {}, //会议详情
      rem_Type: "",
      // 会议编辑数据
      meet_id: "",
      editobj: {
        name: "",
        remindType: 0, //会议提醒
        remindVay: [], //提醒方式
        pro_remark: ""
      },
      editobjDefName: [], //默认参会人员
      editobj_usName: [], //编辑参会人员
      editobj_userIds: [], //编辑参会人员idji
      editobj_userIds1: [], //编辑参会人员idji
      editobj_rankDefUserList: [], //默认列席人员
      editobj_rankUserList: [], //编辑liehui
      editobj_rankUserIds: [], //编辑列席人员id集合
      editobj_rankUserIds1: [], //编辑列席人员id集合
      editobj_startTime: "", //开始时间
      editobj_endTime: "", //结束时间
      meetingSite: "", //会议地址
      site: "", //会议地址idji
      typeName: "", //会议类型mingchneg
      typeName1: "", //会议类型mingchneg
      typeId: "", //会议类型
      flag: false, //编辑会议修改标识
      copyperson: [], //抄送人
      copypersons: [],
      selectStateList: [], //会议类型列表
      selectedFileListEdit: [], //附件
      getFileListEdit: [],
      //新增选择人员
      findFlag: false,
      findUserObj: [],
      findUserObj3: [],
      findUserObj4: [],
      findState: {},
      checkState: {},
      rem_Type: "",
      newProjectMeetingTimer: null,
      //上传控制
      uploadDocAddIsShow: false,
      addDoc: false,
      success_code: "",
      shagchaun: [],
      //提醒
      selectremind: [
        { id: 0, name: "无提醒" },
        { id: 1, name: "提前15分钟" },
        { id: 2, name: "提前1小时" },
        { id: 3, name: "提前3小时" },
        { id: 4, name: "提前1天" }
      ],
      //提醒方式
      modelist: [{ id: "0", name: "站内信" }],
      autoHeight: false //附件的高度自适应
    };
  },
  mounted() {
    this.token = this.$store.state.loginObject.userToken;
    this.userId = this.$store.state.loginObject.userId;
    this.projectId = this.handleMeeting.projectId;
    this.success_code = this.code.codeNum.SUCCESS;
    if (this.handleType == 1) {
      this.meetmeetVisible();
    } else {
      this.meetedit();
      this.newMeet();
    }
    this.getPromptType();
  },
  created() {},
  methods: {
    // 获取提醒方式
    getPromptType() {
      this.$post("/sys/getNoticeWayConfig")
        .then(res => {
          if (this.code.codeNum.SUCCESS == res.code) {
            if (res.data.email == 1) {
              this.modelist.push({ id: "1", name: "邮件" });
            }
            if (res.data.sms == 1) {
              this.modelist.push({ id: "2", name: "短信" });
            }
            return;
          }
          this.$message.error("通知方式获取失败");
        })
        .catch(err => {
          console.log(err);
        });
    },
    //会议详情
    meetmeetVisible() {
      var data = {
        token: this.token,
        userId: this.userId,
        projectId: this.projectId,
        data: {
          id: this.handleMeeting.id
        }
      };
      var _this = this;
      this.$post("/info/project/getMeeting", data)
        .then(response => {
          if (response.code == _this.code.codeNum.SUCCESS) {
            if (
              response.data.remindVay != "" &&
              response.data.remindVay != null &&
              response.data.remindVay != undefined
            ) {
              var remind = response.data.remindVay.split(",");
              var arr = [];
              for (var i = 0; i < remind.length; i++) {
                var n = remind[i];
                _this.modelist.forEach(obj => {
                  if (n == obj.id) {
                    arr.push(obj.name);
                  }
                });
              }
              response.data.remindVay = arr.join(",");
            } else {
              response.data.remindVay = null;
            }
            _this.mett_details = response.data;
            _this.$set(
              _this.mett_details,
              "startTime",
              _this.mett_details.startTime.substring(0, 16)
            );
            _this.$set(
              _this.mett_details,
              "endTime",
              _this.mett_details.endTime.substring(0, 16)
            );
            _this.rem_Type = response.data.remindType;
          } else {
            _this.$message.error(response.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    meetedit() {
      this.flag = false;
      this.editobj_rankUserList = [];
      this.editobj_usName = [];
      this.editobj_userIds1 = [];
      this.editobj_userIds = [];
      this.editobj_rankUserIds1 = [];
      this.editobj_rankUserIds = [];
      this.editobj.remindType = "";
      this.editobj.pro_remark = "";
      this.editobj.remindVay = [];
      this.selectedFileListEdit = [];
      this.getFileListEdit = [];
      this.flag = false;
      this.meet_id = this.handleMeeting.id;
      var data = {
        token: this.token,
        userId: this.userId,
        projectId: this.projectId,
        data: { id: this.handleMeeting.id }
      };
      this.$post("/info/project/getMeeting", data)
        .then(response => {
          if (response.code == this.code.codeNum.SUCCESS) {
            this.mett_details = response.data;
            if (this.mett_details.meetingUserList !== null) {
              this.editobjDefName = [];
              this.mett_details.meetingUserList.forEach(c => {
                if (c.userId) {
                  this.editobjDefName.push({
                    usName: c.usName,
                    id: c.userId,
                    name: c.usName,
                    label: c.usName,
                    uniqueKey: "user" + c.userId,
                    canDelete: true,
                    originData: true
                  });
                }
              });
            }
            this.editobj_rankDefUserList = [];
            if (this.mett_details.rankUserList !== null) {
              this.mett_details.rankUserList.forEach(c => {
                if (c.userId) {
                  this.editobj_rankDefUserList.push({
                    usName: c.usName,
                    id: c.userId,
                    name: c.usName,
                    label: c.usName,
                    uniqueKey: "user" + c.userId,
                    canDelete: true,
                    originData: true
                  });
                }
              });
            }
            this.editobj_startTime = this.mett_details.startTime;
            this.editobj_endTime = this.mett_details.endTime;
            this.editobj.name = this.mett_details.name;
            this.site = this.mett_details.site;
            this.typeName = this.mett_details.typeName;
            this.typeName1 = this.mett_details.typeName;
            this.typeId = this.mett_details.typeId;
            this.editobj.pro_remark = this.mett_details.content;
            this.meetingSite = this.mett_details.site;
            this.getFileListEdit = this.mett_details.meetingFileList;
            if (!!this.getFileListEdit) {
              this.getFileListEdit.forEach(v => {
                if (!v.docId) return;
                v.name = v.fileName;
                v.id = v.docId;
                v.type = v.docType;
                v.docName = v.fileName;
              });
            }
            this.editobj.remindType = this.mett_details.remindType;
            this.editobj.remindVay = this.mett_details.remindVay
              ? this.mett_details.remindVay.split(",")
              : [];
            this.$set(
              this.mett_details,
              "startTime",
              this.mett_details.startTime.substring(0, 16)
            );
            this.$set(
              this.mett_details,
              "endTime",
              this.mett_details.endTime.substring(0, 16)
            );
            this.rem_Type = response.data.remindType;
          } else {
            this.$message.error(response.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      this.meetVisible = false;
    },
    // 编辑保存
    naioi() {
      var _this = this;
      var oDate1 = new Date(_this.editobj_startTime);
      var oDate2 = new Date(_this.editobj_endTime);
      var myDate = new Date();
      // 会议不提醒时
      if (this.editobj.remindType == 0) {
        this.editobj.remindVay = [];
      }else{
        this.flag = true
      }
      if (_this.editobj_startTime == "" || _this.editobj_startTime == null) {
        this.$message.error("会议开始时间不能为空");
        return;
      }
      if (_this.editobj_endTime == "" || _this.editobj_endTime == null) {
        this.$message.error("会议结束时间不能为空");
        return;
      }
      if (oDate1.getTime() < myDate.getTime()) {
        this.$message.error("开始时间不能小于当前时间");
        return;
      }
      if (oDate1.getTime() === myDate.getTime()) {
        this.$message.error("开始时间不能等于当前时间");
        return;
      }
      _this.editobj_userIds1 = [];
      if (this.editobj_usName) {
        this.editobj_usName.forEach(function(c) {
          if (c.id) {
            _this.editobj_userIds1.push(c.id);
          }
        });
      }

      this.editobj_rankUserIds1 = [];
      this.editobj_userIds = Array.from(new Set(this.editobj_userIds1));
      if (this.editobj_rankUserList) {
        this.editobj_rankUserList.forEach(function(c) {
          if (c.id) {
            _this.editobj_rankUserIds1.push(c.id);
          }
        });
      }

      this.editobj_rankUserIds = Array.from(new Set(this.editobj_rankUserIds1));
      if (this.typeName !== this.typeName1) {
        this.typeId = this.typeName;
      }
      var repeatPerson = [];
      var allJoinMetPerson = this.editobjDefName.concat(this.editobj_usName);
      var allAttendPerson = this.editobj_rankDefUserList.concat(
        this.editobj_rankUserList
      );
      for (let i = 0; i < allJoinMetPerson.length; i++) {
        for (let j = 0; j < allAttendPerson.length; j++) {
          if (allJoinMetPerson[i].id == allAttendPerson[j].id) {
            repeatPerson.push(allJoinMetPerson[i].usName);
          }
        }
      }
      if (repeatPerson.length != 0) {
        var repeatList = repeatPerson.join("、") + "不能同时为参会和列席人员";
        this.$message.error(repeatList);
        return;
      }
      // if (this.msgObj.name == "") {
      //   this.$message.error("会议主题内容不能为空");
      //   return;
      // }
      if (this.editobj.name == "") {
        this.$message.error("会议主题不能为空");
        return;
      }

      if (this.meetingSite == "") {
        this.$message.error("会议地点不能为空");
        return;
      }
      if (this.editobj_startTime == "" || this.editobj_startTime == null) {
        this.$message.error("会议开始时间不能为空");
        return;
      }

      if (this.editobj_endTime == "" || this.editobj_endTime == null) {
        this.$message.error("会议结束时间不能为空");
        return;
      }

      if (oDate1.getTime() > oDate2.getTime()) {
        this.$message.error("开始时间不能大于结束时间");
        return;
      }
      if (oDate1.getTime() == oDate2.getTime()) {
        this.$message.error("开始时间不能等于结束时间");
        return;
      }

      for (var i = 0; i < this.modelist.length; i++) {
        for (var j = 0; j < this.remindVayas.length; j++) {
          if (this.modelist[i].name == this.remindVayas[j]) {
            this.remindVayas[j] = this.modelist[i].id;
          }
        }
      }
      if (this.editobj.remindType !== 0 && this.editobj.remindType !== "") {
        if (this.editobj.remindVay.length == 0) {
          this.$message.error("请选择提醒方式");
          return;
        }
      }

      let localAttach = [];
      let projectRelev = [];
      if (this.$store.state.isUpload) {
        this.$message.error("有文件正在上传，请稍后操作");
        return;
      }
      if (!!this.getFileListEdit) {
        projectRelev = this.getFileListEdit.map(v => v.docId);
      }
      this.selectedFileListEdit.forEach(v => {
        v.addSource === 1
          ? localAttach.push(v.docId)
          : projectRelev.push(v.docId);
      });
      var data = {
        token: this.token,
        userId: this.userId,
        projectId: this.projectId,
        data: {
          projectId: this.projectId,
          name: this.editobj.name, // "会议主题"
          id: this.meet_id, // "会议id"
          site: this.meetingSite,
          typeId: this.typeId,
          remindType: this.editobj.remindType, //"提醒类型（0:不提醒/1:截止前15分钟/2截止前1小时/3:截止前3小时/4:截止前1天)"
          remindVay: this.remindVayas, // "提醒方式（站内信,邮件,短信）"
          startTime: this.editobj_startTime + ":00", //开始时间
          endTime: this.editobj_endTime + ":00", //结束时间
          flag: this.flag,
          userIds: this.editobj_userIds, // "参会人员id集合"
          rankUserIds: this.editobj_rankUserIds, // "列会人员id集合"
          docIds: projectRelev, // "文件id集合"
          newDocIds: localAttach,
          content: this.editobj.pro_remark
        }
      };
      this.$post("/info/project/updateMeeting", data)
        .then(response => {
          if (response.code == _this.code.codeNum.SUCCESS) {
            (_this.editobj.name = ""), // "会议主题",
              (_this.site = ""), // "会议地点（数据字典表code)",
              (_this.editobj.remindType = ""), //提醒类型（0:不提醒/1:截止前15分钟/2截止前1小时/3:截止前3小时/4:截止前1天)"
              (_this.editobj.remindVay = []), //提醒类型（0:不提醒/1:截止前15分钟/2截止前1小时/3:截止前3小时/4:截止前1天)"
              (_this.editobj_startTime = ""), //开始时间
              (_this.editobj_endTime = ""), //结束时间
              (_this.userIds = []), //"参会人员id集合",
              (this.selectedFileListEdit = []);
            _this.editobj_rankUserIds = []; //"列会人员id集合"
            _this.editobj.pro_remark = "";
            this.findUserObj = {};
            this.clickEvent();
            _this.$emit("editSucess");
            _this.$message.success(response.msg);
          } else {
            _this.$message.error(response.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //  新增中介机构
    optPrinFn(num) {
      this.findFlag = true;
      this.user_num = num;
      this.flag = true;
      this.findState = { state: 0 };
      this.checkState = { state: 2 };
      if (num == 3) {
        this.editobj_usName.forEach(v => {
          v.name = v.usName;
          v.label = v.usName;
          v.uniqueKey = "user" + v.id;
        });
        this.findUserObj = this.editobjDefName.concat(this.editobj_usName);
      } else {
        this.findUserObj = this.editobj_rankDefUserList.concat(
          this.editobj_rankUserList
        );
      }
    },
    // 人员的返回值
    findAllUser(data) {
      this.findFlag = false;
      this.findState = {};
      this.checkState = {};
      if (!data || !data.length) {
        if (this.user_num == 3) {
          this.editobj_usName = [];
        } else {
          this.editobj_rankUserList = [];
        }
        return;
      }
      let defaults = [];
      let content = [];
      data.forEach(v => {
        v.usName = v.name;
        v.uniqueKey = "user" + v.id;
        if (v.canDelete) {
          defaults.push(v);
        } else {
          content.push(v);
        }
      });
      if (this.user_num == 3) {
        this.editobj_usName = content;
        this.editobjDefName = defaults;
        this.findUserObj3 = this.editobjDefName.concat(this.editobj_usName);
      } else {
        this.editobj_rankUserList = content;
        this.mett_details.rankUserList = defaults;
      }
    },
    // 参会人员的删除小图标
    delet_bx(v) {
      this.editobj_usName.splice(v, 1);
    },
    // 列席人员的删除小图标
    delet_bl(v) {
      this.editobj_rankUserList.splice(v, 1);
    },
    // 取消弹框
    clickEvent() {
      this.$emit("sendValueToParent", false);
    },
    // 查看附件
    seeFj(v, num, id, type, item) {
      if (num == 1) {
        this.$message.warning("该附件已被删除");
      } else {
        var proViewData = {
          projectId: this.projectId,
          rfsId: v,
          docId: id,
          photoType: type,
          docName: item.fileName,
          sourceName: "会议详情",
          projectName: this.handleMeeting.projectName
        };
        this.$store.commit("previewAllFn", proViewData);
      }
    },
    // 下载附件
    dowanFs(num, item) {
      let download_arr = [];
      if (this.$store.state.isPC) {
        this.$store.commit("pcOtherDownload", {
          docId: num == 1 ? item.id : item.docId,
          docName: num == 1 ? item.name : item.fileName
        });
      } else {
        download_arr.push({
          name: num == 1 ? item.name : item.fileName,
          id: num == 1 ? item.id : item.docId
        });
      }

      this.$store.commit("download", download_arr);
    },
    // 新增会议查询配置
    newMeet() {
      var data = {
        token: this.token,
        userId: this.userId,
        pageNo: 0,
        pageSize: 100,
        projectId: this.projectId,
        data: {}
      };
      var _this = this;
      this.$post("/info/project/getMeetingConfigAll", data)
        .then(response => {
          _this.selectStateList = response.data.list;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  watch: {
    meetingDetaVisible(val) {
      this.isShow = val;
    },
    getFileListEdit: {
      handler(newName, oldName) {
        if (newName == null) {
          return;
        }
        if (newName.length > 0) {
          this.autoHeight = true;
        }
      },
      deep: true
    },
    selectedFileListEdit: {
      handler(newName, oldName) {
        if (newName == null) {
          return;
        }
        if (newName.length > 0) {
          this.autoHeight = true;
        }
      },
      deep: true
    }
  },
  computed: {
    djjt: function() {
      var sftr = "";
      for (var i = 0; i < this.selectremind.length; i++) {
        if (this.selectremind[i].id == this.rem_Type) {
          sftr = this.selectremind[i].name;
        }
      }
      return sftr;
    },
    remindVayas: function() {
      if (this.editobj.remindType == 0) {
        return "";
      }
      return this.editobj.remindVay.join(",");
    }
  }
};
</script>
<style scoped lang="scss" type="text/css">
.usernanmes {
  width: calc(100% - 20px);
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  max-height: 113px;
}
.tan_dialog {
  position: relative;
  .el-form-item {
    margin-bottom: 16px;
  }
  .el-input {
    width: 217px;
  }
}
.content_x {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  word-break: break-all;
}
.deleth {
  text-decoration: line-through;
}
/deep/ .clip-self-deep {
  &:after {
    display: block;
    content: " ";
    width: 1px;
    height: 1px;
    clear: both;
    zoom: 0;
    visibility: hidden;
  }
}
.file-name {
  display: inline-block;
  float: left;
  width: 80%;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.del-file {
  text-decoration: line-through;
}
.userbtn {
  position: relative;
}
.deletro {
  padding: 0;
  padding-left: 6px;
  width: 15px;
  height: 15px;
  background: url("../../assets/image/sanc.png") no-repeat;
  background-size: 100% 100%;
}
.delusebtn {
  position: absolute;
  right: 0px;
  top: 4px;
}
.edit-meeting-button {
  margin-left: 20px;
}
.attachemnt-list-doc {
  display: flex;
  align-items: center;
}

.attachemnt-list-doc .doc-name {
  display: inline-block;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.attachemnt-list-doc .doc-delete {
  font-size: 14px;
  font-weight: 400;
  color: #0061a9;
  cursor: pointer;
  margin-top: 2px;
}
.doc-name {
  display: inline-block;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.w-100 {
  width: 100%;
}
.overflFile {
  overflow-y: auto;
  max-height: 113px;
}
.attachment-wrap {
  margin-right: 20px;
}
</style>
<style lang="scss" type="text/css">
.metting-details .overFlowScroll .el-form-item__content {
  overflow-y: auto;
  max-height: 113px;
}
.autoHeight {
  height: 614px;
}
</style>
