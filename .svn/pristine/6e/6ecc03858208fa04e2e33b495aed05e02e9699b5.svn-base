<template>
  <div id="taskinfossssss" v-if="changeWindoweditor">
    <el-dialog
      :title="titeforbidden"
      left
      :visible.sync="changeWindoweditor"
      :close-on-click-modal="false"
      width="1200px"
      @close="change"
      :modal-append-to-body="false"
    >
      <div class="setbox">
        <el-button
          @click="setchecktask(true)"
          v-if="forbiddenis !== 4"
          size="mini"
          type="primary"
          ><i style="font-size: 2px" class="iconfont tongyi"></i>
          标记完成</el-button
        >
        <el-button @click="setchecktask(false)" v-else size="mini"
          ><i style="font-size: 2px" class="iconfont tongyi"></i
          >已完成</el-button
        >
      </div>
      <div class="clearFix" style="padding-left: 64px;" @click.stop="the_alls">
        <div class="TaskID" style="text-align: left">
          <div class="top" v-if="spans != ''">
            <h3>所属任务：</h3>
            <p>
              <span
                v-for="(item, index) in spans"
                class="ispans"
                @click.stop="the_all(item)"
                :key="index"
                :title="item.name"
              >
                {{ item.isname }}
                <i class="el-icon-arrow-right"></i>
              </span>
            </p>
          </div>
          <div class="iscenetr" v-if="iscenetrs">
            <ul style="height: 93px;">
              <el-scrollbar style="height:100%">
                <li
                  v-for="(item, index) in TaskIDarr"
                  :title="item.name"
                  :key="index"
                  @click.stop="the_all(item)"
                >
                  {{ item.name }}
                </li>
              </el-scrollbar>
            </ul>
          </div>
        </div>
        <div class="front-add-left-content fl">
          <!-- baseMessage -->
          <el-scrollbar>
            <el-form :model="form" :ref="form">
              <span class="baseMessage">
                <i style="color: red;">*</i>任务基本信息
              </span>
              <el-input
                type="textarea"
                class="task-base-message"
                resize="none"
                v-if="status1"
                :disabled="forbiddenisinfo || !isTaskUser"
                maxlength="500"
                v-model="name"
                placeholder="请输入任务标题"
                style="width: 95%;padding-left: 4px;"
                :title="
                  !isTaskUser ? '无对应权限，请联系对应项目组负责人处理' : ''
                "
              ></el-input>
              <el-form-item
                label="执行人"
                :class="[forbiddenis == 4 ? 'notclick' : '', 'sele-person-btn']"
                :label-width="formLabelWidth"
              >
                <span v-if="status1">
                  <i
                    @click="shelterpars"
                    class="iconfont webicon308 color-primary fs-22"
                  ></i>
                  <el-tag
                    v-for="tag in executor"
                    :key="tag.id"
                    :type="tag.type"
                    >{{ tag.name }}</el-tag
                  >
                  <el-tag
                    v-for="tag in executors"
                    :key="tag.ids"
                    closable
                    @close="executorss(tag)"
                    :type="tag.type"
                    >{{ tag.name }}</el-tag
                  >
                </span>
              </el-form-item>
              <el-form-item
                label="抄送人"
                :class="[forbiddenis == 4 ? 'notclick' : '', 'sele-person-btn']"
                :label-width="formLabelWidth"
              >
                <span v-if="status1">
                  <i
                    @click="shelterGlobal"
                    class="iconfont webicon308 color-primary fs-22"
                  ></i>
                  <!-- <span v-for="item in ccpeople" >{{item.name}}</span> -->
                  <el-tag
                    v-for="tag in ccpeople"
                    :key="tag.ids"
                    :type="tag.type"
                    >{{ tag.name }}</el-tag
                  >
                  <el-tag
                    v-for="tag in ccpeoples"
                    :key="tag.ids"
                    @close="ccpeopless(tag)"
                    closable
                    :type="tag.type"
                    >{{ tag.name }}</el-tag
                  >
                </span>
              </el-form-item>
              <!-- <el-form-item label="起止时间" :label-width="formLabelWidth">
              <div class="block" id="block">
                      <el-date-picker style="width: 215px;"
                        v-model="startTimeinfo"
                        type="datetime"
                        placeholder="选择开始时间">
                    </el-date-picker>
                     至
                    <el-date-picker style="width: 215px;"
                        v-model="endTimeinfo"
                        type="datetime"
                        placeholder="选择结束时间">
                    </el-date-picker>
              </div>
              </el-form-item>-->
              <!-- 开始 -->
              <div
                :class="[
                  forbiddenis == 4 ? 'earthquakenotclick' : 'earthquake'
                ]"
              >
                <div class="fl" style="padding-left:2px;">
                  <span
                    class="demonstrations"
                    style="margin-left: 51px;padding-right: 11px;"
                    >起止时间</span
                  >
                  <!-- @mousedown.native.stop="checkPower"    -->
                  <el-date-picker
                    size="small"
                    :title="
                      isTaskUser ? '' : '无对应权限，请联系对应项目组负责人处理'
                    "
                    @change.stop="startpicker(1, $event)"
                    :disabled="isCustomdisableis || !isTaskUser"
                    format="yyyy-MM-dd HH:mm"
                    value-format="yyyy-MM-dd HH:mm"
                    style="position:relative;width: 176px;"
                    v-model="startTimeinfo"
                    type="datetime"
                    placeholder="选择开始时间"
                    @focus="$utils.handleTimeFocus"
                  ></el-date-picker>
                </div>
                <div :class="[forbiddenis == 4 ? 'notclick' : 'block']">
                  <span class="demonstrations">至</span>
                  <el-date-picker
                    size="small"
                    :title="
                      isTaskUser ? '' : '无对应权限，请联系对应项目组负责人处理'
                    "
                    @change="endPicker"
                    :disabled="isCustomdisableis || !isTaskUser"
                    format="yyyy-MM-dd HH:mm"
                    value-format="yyyy-MM-dd HH:mm"
                    style="width: 176px;"
                    v-model="endTimeinfo"
                    type="datetime"
                    placeholder="选择结束时间"
                    @focus="$utils.handleTimeFocus"
                  ></el-date-picker>
                  <el-checkbox
                    @change="Customdisable"
                    :disabled="forbiddenisinfo"
                    v-model="checked"
                    @click.native="checkPower"
                    class="custom-time"
                    >自定义时间</el-checkbox
                  >
                  <!-- <el-checkbox @change="Customdisable" :disabled="forbiddenisinfo" v-model="checked">自定义时间</el-checkbox> -->
                </div>
                <div class="custom"></div>
              </div>
              <div class="customtime" v-if="Customdisableis">
                <div :class="[forbiddenis == 4 ? 'notclick' : '']">
                  <span
                    class="demonstrations"
                    style="display:inline-block;text-align:right;width:70px; padding-right: 8px;"
                    >自定义时间</span
                  >
                  <el-select
                    v-model="definedtimealue"
                    @change="periodinfo"
                    @visible-change="checkPower2('sel5')"
                    ref="sel5"
                    filterable
                    placeholder="请选择时间变量"
                  >
                    <el-option
                      v-for="(item, index) in definedtime"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </div>
                <div :class="[forbiddenis == 4 ? 'notclick' : '']">
                  <div class="seletime clearfix">
                    <div style="float: left;">
                      <el-select
                        v-model="plusstartTimeinfovalue"
                        @change="periodmethod"
                        @visible-change="checkPower2('sel6')"
                        ref="sel6"
                        style="width: 57px;"
                        placeholder="请选择时间变量"
                      >
                        <el-option
                          v-for="item in plusstartTimeinfo"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                      <el-input
                        :disabled="!isTaskUser"
                        :title="
                          !isTaskUser
                            ? '无对应权限，请联系对应项目组负责人处理'
                            : ''
                        "
                        @input="calculate(1)"
                        @change="periodmethod"
                        v-model="plusstartinput"
                        style="width: 48px"
                        placeholder
                      ></el-input>
                      <el-select
                        v-model="naturalstartTimevalue"
                        @change="periodmethod"
                        @visible-change="checkPower2('sel7')"
                        ref="sel7"
                        style="width: 87px;"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in naturalstartTimeinfo"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </div>
                    <span
                      style="float:left;line-height: 39px; margin-left: 6px;margin-right:6px;"
                      >至</span
                    >
                    <div
                      style="float: left;"
                      :class="[forbiddenis == 4 ? 'notclick' : '']"
                    >
                      <el-select
                        v-model="naturalendTimevalue"
                        style="width: 57px;"
                        placeholder="请选择"
                        @change="periodmethod"
                        @visible-change="checkPower2('sel8')"
                        ref="sel8"
                      >
                        <el-option
                          v-for="item in plusendTimeinfo"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                      <el-input
                        :disabled="!isTaskUser"
                        :title="
                          !isTaskUser
                            ? '无对应权限，请联系对应项目组负责人处理'
                            : ''
                        "
                        @input="calculate(2)"
                        @change="periodmethod"
                        v-model="plusendinput"
                        style="width: 48px"
                        placeholder
                      ></el-input>
                      <el-select
                        v-model="naturalstartTimevalue"
                        @change="periodmethod"
                        @visible-change="checkPower2('sel9')"
                        ref="sel9"
                        style="width: 87px;"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in naturalstartTimeinfo"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </div>
                  </div>
                </div>
                <div class="custom"></div>
              </div>
              <el-form-item label="重复周期" :label-width="formLabelWidth">
                <el-select
                  v-model="repetitionvalue"
                  :disabled="forbiddenisinfo"
                  @change="selerepetition()"
                  placeholder="请选择"
                  @visible-change="checkPower2('sel')"
                  ref="sel"
                >
                  <el-option
                    v-for="(item, index) in repetition"
                    :key="index"
                    :label="item.label"
                    :value="index"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- 截止 -->

              <el-form-item label="任务提醒" :label-width="formLabelWidth">
                <div>
                  <el-select
                    v-model="remindTypes"
                    :disabled="forbiddenisinfo"
                    @change="rwtx"
                    placeholder="请选择"
                    @visible-change="checkPower2('sel2')"
                    ref="sel2"
                  >
                    <el-option
                      v-for="(item, index) in remindoption"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item
                label="提醒方式"
                v-if="isShowRemind"
                :label-width="formLabelWidth"
                @visible-change="checkPower2('sel3')"
                ref="sel3"
              >
                <el-checkbox-group
                  v-model="checkedCities"
                  :disabled="forbiddenisinfo"
                  :min="1"
                >
                  <el-checkbox
                    v-for="city in cities"
                    :label="city"
                    :value="city"
                    :key="city"
                    >{{ city }}</el-checkbox
                  >
                </el-checkbox-group>
              </el-form-item>

              <el-form-item label="优先级" :label-width="formLabelWidth">
                <div v-if="status1">
                  <el-select
                    v-model="value12"
                    :disabled="forbiddenisinfo"
                    placeholder="请选择"
                    @visible-change="checkPower2('sel4')"
                    ref="sel4"
                  >
                    <el-option
                      v-for="(item, index) in options12"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item label="任务内容" :label-width="formLabelWidth">
                <Editor2
                  v-if="dayj"
                  :changes="changes"
                  :forbiddenis="forbiddenis"
                  @htmlmsg2="htmlmsg2"
                  @htmls2="htmls2"
                  :html2="html2"
                />
                <Editor14
                  v-else
                  :changes="changes"
                  :forbiddenis="forbiddenis"
                  :isTaskUser="isTaskUser"
                  @htmlmsg2="htmlmsg2"
                  @htmls2="htmls2"
                  :html2="html2"
                />
              </el-form-item>
              <el-form-item label="子任务" :label-width="formLabelWidth">
                <div class="sonShelters clearFix" style="width: 439px;">
                  <div
                    :class="[forbiddenis == 4 ? 'notclick' : 'addSonShelter']"
                    class="color-primary"
                    @click="addsonTasks"
                    v-show="addSontasks"
                    style="text-align:left;"
                    v-if="$utils.checkProjectPermission('project_task_add')"
                  >
                    <i class="el-icon-plus"></i>
                    <span style="cursor:pointer">添加子任务</span>
                  </div>
                  <div style="width: 100%;height: 80px;">
                    <el-scrollbar style="height:100%">
                      <div class="ggg" v-for="(item, index) in childrenss">
                        <div
                          class="fl"
                          style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden;width: 304px;"
                        >
                          <span style="cursor:pointer" @click="zirwy(item)">{{
                            item.name
                          }}</span>
                        </div>
                        <div class="fr sonRightDiv">
                          <span :class="[forbiddenis == 4 ? 'notclick' : '']">
                            <i>
                              <el-dropdown trigger="click">
                                <span
                                  class="el-dropdown-link"
                                  style="cursor:pointer"
                                >
                                  <i
                                    class="taskUser el-icon-more"
                                    style="margin-right: 20px;"
                                  ></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                  <el-dropdown-item
                                    @click.native="delect(item, index)"
                                  >
                                    <span
                                      v-if="
                                        $utils.checkProjectPermission(
                                          'project_task_del'
                                        )
                                      "
                                    >
                                      <i class="el-icon-delete"></i>删除任务
                                    </span>
                                  </el-dropdown-item>
                                  <el-dropdown-item
                                    @click.native="edit(item, index)"
                                  >
                                    <span>
                                      <i class="el-icon-edit"></i>编辑任务
                                    </span>
                                  </el-dropdown-item>
                                  <el-dropdown-item
                                    v-if="item.closeFlag == 1"
                                    @click.native="tasksDeleteskq(item)"
                                  >
                                    <span>
                                      <i
                                        class="el-icon-circle-close-outline"
                                      ></i
                                      >打开任务
                                    </span>
                                  </el-dropdown-item>
                                  <el-dropdown-item
                                    v-else
                                    @click.native="outline(item)"
                                  >
                                    <span>
                                      <i
                                        class="el-icon-circle-close-outline"
                                      ></i
                                      >关闭任务
                                    </span>
                                  </el-dropdown-item>
                                </el-dropdown-menu>
                              </el-dropdown>
                            </i>
                          </span>
                        </div>
                      </div>
                    </el-scrollbar>
                  </div>
                </div>
              </el-form-item>
              <el-form-item
                label="发行人"
                :class="[forbiddenis == 4 ? 'notclick' : '']"
                :label-width="formLabelWidth"
              >
                <div>
                  <el-checkbox
                    :disabled="txdisabled"
                    @click.native="checkPower"
                    @change="issuers"
                    size="small"
                    v-model="Remind"
                    >提醒发行人</el-checkbox
                  >
                  <img
                    @click="addtask"
                    v-if="Remind"
                    style="width: 20px;vertical-align: inherit;"
                    src="../../../../assets/image/addtask.png"
                    alt
                    class="shelterPers"
                  />
                </div>
                <div>
                  <el-tag
                    v-for="(tag, index) in infoArr"
                    size="mini"
                    :key="index"
                    closable
                    @close="closeis(tag, index)"
                    >{{ tag.contactName }}</el-tag
                  >
                </div>
              </el-form-item>
            </el-form>
            <div
              v-if="$utils.checkProjectPermission('project_task_edit')"
              class="dialog-footer"
              style="text-align:center;padding-bottom: 13px;"
            >
              <!-- <el-button v-if="!forbiddenisinfo" size="medium" @click="change">取 消</el-button>
              <el-button v-if="!forbiddenisinfo" size="medium" type="primary" @click="saveTasks">保 存</el-button> -->
            </div>
          </el-scrollbar>
        </div>
        <div class="fl" style="width: 500px;text-align: left;">
          <div class="rightShelter" id="rightShelter">
            <el-tabs v-model="rightName" @tab-click="rightClick">
              <el-tab-pane label="注意事项" name="one">
                <div class="attentionMatters" style="padding-right: 10px;">
                  <Editor
                    v-if="dayj"
                    :changes="changes"
                    :forbiddenis="forbiddenis"
                    :isTaskUser="isTaskUser || isTaskEdit"
                    @htmlmsg="htmlmsg"
                    :msg="msg"
                    @htmls="htmls"
                  />
                  <Editor13
                    v-else
                    :changes="changes"
                    :forbiddenis="forbiddenis"
                    :isTaskUser="isTaskUser || isTaskEdit"
                    @htmlmsg="htmlmsg"
                    :msg="msg"
                    @htmls="htmls"
                  />
                </div>
              </el-tab-pane>
              <el-tab-pane label="相关文件" name="two">
                <related-file
                  :mbids="mbids"
                  :qkr="qkr"
                  :forbiddenis="forbiddenis"
                  :relatedData="relatedData"
                  :flagdetaildatas="flagdetaildatas.name"
                  ref="relateChild"
                ></related-file>
              </el-tab-pane>
              <el-tab-pane label="调查工具" name="three">
                <survey-tool
                  :surveyData="surveyData"
                  :forbiddenis="forbiddenis"
                  :mbids="mbids"
                  ref="surveyChild"
                ></survey-tool>
              </el-tab-pane>
              <el-tab-pane label="关联内容" name="for">
                <associated-content
                  :changes="changes"
                  :varId="varId"
                  :mbids="mbids"
                  :forbiddenis="forbiddenis"
                  :createById="createById"
                  :associatData="associatData"
                  v-if="update"
                  ref="associatChild"
                ></associated-content>
              </el-tab-pane>
              <el-tab-pane label="任务动态" name="fives">
                <dynamic-task
                  :mbids="mbids"
                  :name="name"
                  :forbiddenis="forbiddenis"
                  :Empty="Empty"
                  :dynamicData="dynamicData"
                  ref="dynaminChild"
                ></dynamic-task>
              </el-tab-pane>
            </el-tabs>
          </div>
          <!-- <div style="text-align:right">
            <el-button v-if="!forbiddenisinfo" size="medium" @click="change">取 消</el-button>
            <el-button v-if="!forbiddenisinfo" size="medium" type="primary" @click="saveTasks">保 存</el-button>
          </div> -->
        </div>
      </div>
      <div style="text-align:right" slot="footer">
        <el-button v-if="!forbiddenisinfo" size="medium" @click="change"
          >取 消</el-button
        >
        <el-button
          v-if="!forbiddenisinfo"
          size="medium"
          type="primary"
          @click="saveTasks"
          >保 存</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      title="自定义周期"
      :visible.sync="drepetitionvalue"
      :close-on-click-modal="false"
      width="500px"
      @close="petitionvalueclose"
      append-to-body
    >
      <div>
        <div>
          <div class="drept">
            <span style="color: black;">重复频率</span>
            <el-input-number
              size="medium"
              style="width: 105px;margin-left: 3px;"
              v-model="addnum"
              :min="1"
              @blur="calculate(3)"
              :max="10000000000"
              controls-position="right"
            ></el-input-number>
            <el-select
              size="medium"
              @change="frequen"
              style="width: 91px;"
              v-model="frequencyvalue"
            >
              <el-option
                v-for="item in frequency"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </div>
          <div style="margin-top: 10px;">
            <p v-if="frequencopti" style="margin-bottom: 10px;color: black;">
              重复时间
            </p>
            <ul v-show="frequenge">
              <li
                class="weektime"
                @click="weektimeclick(index)"
                ref="weektimeclick"
                v-for="(item, index) in infoweek"
                :key="item"
              >
                {{ item }}
              </li>
            </ul>
            <el-select
              v-if="frequenz"
              v-model="frequencoptionsvalue"
              size="medium"
              style="width: 180px;"
            >
              <el-option
                v-for="item in frequencoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="dreptto">
          <p style="color: black;">结束时间</p>
          <ul style="margin-top: 17px;margin-left: 6px;">
            <li>
              <el-radio v-model="radio" @change="finishtime" label="1"
                >无限重复</el-radio
              >
            </li>
            <li>
              <el-radio v-model="radio" @change="finishtime" label="2"
                >终止于某天</el-radio
              >
              <el-date-picker
                size="medium"
                v-model="copti"
                style="width: 195px;"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期时间"
                :disabled="Wirelessrepeat"
                @focus="$utils.handleTimeFocus"
              ></el-date-picker>
            </li>
            <li>
              <el-radio v-model="radio" @change="finishtime" label="3"
                >限定重复次数</el-radio
              >
              <!-- <el-input
                size="medium"
                style="width: 100px;margin-left: -12px;"
                v-model="inputcopti"
                @input="calculate(4)"
                :disabled="someday"
                onchange="value=value.replace(/[^\d]/g,'')"
                placeholder="请输入内容"
              ></el-input>-->
              <el-input-number
                size="medium"
                style="width: 105px;margin-left: 3px;"
                v-model="inputcopti"
                @blur="calculate(4)"
                :min="1"
                :disabled="someday"
                :max="10000000000"
                controls-position="right"
              ></el-input-number>
              <span style="margin-left: 3px;">次后</span>
            </li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="drepetitionvalue = false"
          >取 消</el-button
        >
        <el-button size="medium" type="primary" @click="drepetitionvalues"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <select_box
      :findFlagShow.sync="flags"
      :findState="findState"
      :findUserObj="zxr === 1 ? findUserObj : findUserObjM"
      @findAllUser="findAllUser"
      :checkState="checkState"
    />
    <el-dialog
      title="添加子任务"
      :close-on-click-modal="false"
      :visible.sync="addsonrenwu"
      width="400px"
    >
      <span>
        <el-input
          v-model="inputadd"
          maxlength="500"
          placeholder="请输入内容"
        ></el-input>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="addsonrenwu = fasle">取 消</el-button>
        <el-button size="medium" type="primary" @click="addsonrenwus"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <fintall-deptuser
      :findFlags.sync="findFlags"
      :defaultSelects="infoArr"
      @findAllUser="findAllUserinfo"
    ></fintall-deptuser>
  </div>
</template>

<script>
import relatedFile from "./relatedFile";
import surveyTool from "./surveyTool";
import associatedContent from "./associatedContent";
import dynamicTask from "./dynamicTask";
import select_box from "@/components/select_box/findAllDeptUserMultipleNew";
import { fail } from "assert";
import Editor from "@/components/select_box/Editor";
import Editor2 from "@/components/select_box/Editor2";
import Editor13 from "@/components/select_box/Editor13";
import Editor14 from "@/components/select_box/Editor14";
import fintallDeptuser from "@/components/select_box/findAllDeptUserContacts";
export default {
  props: [
    "flagdetail",
    "flagdetaildatas",
    "flagdetaildatasModify",
    "ids",
    "status",
    "dayj",
    "isTaskUser", //对当前任务是否有编辑权限(没有判断是否是创建人和是否有分配任务权限)
    "isTaskEdit" //对当前任务是否有编辑权限
  ],
  components: {
    relatedFile,
    associatedContent,
    surveyTool,
    dynamicTask,
    select_box,
    Editor,
    Editor2,
    Editor13,
    Editor14,
    fintallDeptuser
  },
  data() {
    return {
      //开始
      oldItem: [],
      Accessval: "",
      comonmval: "",
      titeforbidden: "",
      forbiddenis: "",
      forbiddenisinfo: "",
      infoArr: [],
      Remind: false,
      findFlags: false,
      startTimeinfo: "",
      endTimeinfo: "",
      contactLists: [],
      cstomizedWeek: "",
      startTimeinfos: "",
      endTimeinfos: "",
      weekNumis: "",
      infotime: "",
      weekNums: "",
      variableId: "",
      weekday: "",
      Editthe: "",
      txdisabled: false,
      checked: false,
      definedtime: [],
      taksTplRepetitionPeriodinfo: "",
      definedtimealue: "",
      taksTplRepetitionPeriod: {
        repetitionPeriod: null
      },
      plusstartTimeinfo: [
        {
          value: "-",
          label: "-"
        },
        {
          value: "+",
          label: "+"
        }
      ],
      naturalstartTimeinfo: [
        {
          value: "自然日",
          label: "自然日"
        },
        {
          value: "工作日",
          label: "工作日"
        }
      ],
      filtersweek: [
        {
          value: "1",
          label: "一"
        },
        {
          value: "2",
          label: "二"
        },
        {
          value: "3",
          label: "三"
        },
        {
          value: "4",
          label: "四"
        },
        {
          value: "5",
          label: "五"
        },
        {
          value: "6",
          label: "六"
        },
        {
          value: "0",
          label: "日"
        }
      ],
      naturalstartTimevalue: "自然日",
      plusstartTimeinfovalue: "-",
      plusstartinput: 0,
      plusendTimeinfo: [
        {
          value: "+",
          label: "+"
        },
        {
          value: "-",
          label: "-"
        }
      ],
      naturalendTimeinfo: [
        {
          value: "自然日",
          label: "自然日"
        },
        {
          value: "工作日",
          label: "工作日"
        }
      ],
      labelinfo: "",
      naturalendTimevalue: "+",
      plusstendinfovalue: "自然日",
      plusendinput: 0,
      repetition: [],
      repetitionvalue: "不重复",
      drepetitionvalue: false,
      infoweek: ["一", "二", "三", "四", "五", "六", "日"],
      addnum: 0,
      frequency: ["天", "周", "个月", "年"],
      frequencyvalue: "天",
      frequencoptions: [],
      frequencoptionsvalue: "",
      frequenge: false,
      frequenz: false,
      frequencopti: false,
      radio: "1",
      copti: "",
      inputcopti: 1,
      Customdisableis: false,
      isCustomdisableis: false,
      Wirelessrepeat: true,
      someday: true,
      repetition: false,
      addinfo: true,
      repetitioncs: "",
      // 截止
      dateRangeOptions: {
        key: "task"
      },
      qkr: 3,
      mbids: "",
      msgs: "",
      ispans: [],
      TaskIDarr: [],
      spans: [],
      update: true,
      txfs: false,
      changes: { state: 0 },
      Empty: {},
      iscenetrs: false,
      isflag: false,
      status1: true,
      status2: false,
      createById: "",
      token: "String",
      html2: "",
      userId: "0",
      executors: [],
      ccpeoples: [],
      pickerOptionsStart: {
        disabledDate(time) {
          return (
            time.getTime() < new Date(new Date().toLocaleDateString()).getTime()
          );
        }
      },
      pickerOptionsEnd: {
        disabledDate(time) {
          return (
            time.getTime() < new Date(new Date().toLocaleDateString()).getTime()
          );
        }
      },
      varId: "",
      zxr: "",
      ccpeople: [],
      taskCopyer: [],
      msg: "",
      optionszxz2s: "",
      roledata: "",
      inputadd: "",
      options12: [
        {
          value: "0",
          label: "普通"
        },
        {
          value: "1",
          label: "紧急"
        },
        {
          value: "2",
          label: "非常紧急"
        }
      ],
      value12: "",
      label12: "",
      childrenss: [],
      name: "",
      startTimeinfo: "",
      thisdata: [],
      endTimeinfo: "",
      ges: [],
      remindType: "",
      remindTypes: "",
      remindTypeyxj: "",
      content: "",
      flag: false,
      flags: false,
      tmval: [],
      addsonrenwu: false,
      typeshow: "info",
      remindoptions: "",
      showSontasks: false,
      zirenwushow: false,
      addSontasks: true,
      html2s: "",
      inputson: "",
      showInput: true,
      //showSpan:false,
      savetasks: true,
      changeWindoweditor: this.flagdetail,
      dialogTableVisible: false,
      dialogFormVisible: true,
      formLabelWidth: "80px",
      //注意事项的给子组件传值
      attionData: "",
      //相关文件的给子组件传值
      relatedData: "",
      //关联内容的给子组件传值
      associatData: "",
      //调查工具的给子组件传值
      surveyData: "",
      //任务动态的给子组件传值
      dynamicData: "",
      implementStageIdins: "",
      form: {
        name: "",
        content: "",
        startTimeinfo: "", //开始时间
        endTimeinfo: "", //结束时间
        remindType: "", //任务提醒f
        remindVay: [], //提醒方式
        priority: "普通", //优先级
        executorName: "", //执行人名称
        ccpeopleName: "", //抄送人名称
        sonTasks: "", //子任务
        valueTimes: ""
      },
      executor: [
        {
          name: ""
        }
      ], //执行人
      ccpeople: [
        {
          name: ""
        }
      ], //抄送人
      //子任务循环列表
      sonTasklist: [
        {
          name: "hhhhhh"
        },
        {
          name: "kkkk"
        }
      ],
      //提醒方式
      remindoption: [
        {
          value: 0,
          label: "不提醒"
        },
        {
          value: 1,
          label: "截止前15分钟"
        },
        {
          value: 2,
          label: "截止前1小时"
        },
        {
          value: 3,
          label: "截止前3小时"
        },
        {
          value: 4,
          label: "截止前1天"
        },
        {
          value: 5,
          label: "开始前一天"
        },
        {
          value: 6,
          label: "开始时"
        },
        {
          value: 7,
          label: "完成时"
        }
      ],
      checkedCities: [],
      // cities:['站内信', '短信', '邮箱'],
      cities: ["站内信"],
      rightName: "one",
      inputshow: [],
      isShowRemind: false,
      findUserObj: [],
      findUserObjM: [],
      setstate: false,
      checkState: {},
      findState: {},
      flagdetaildatasModify1:{}
    };
  },
  computed: {
    changeMemberTabs() {
      return this.$store.state.projectstat.projectstatinfo;
    }
  },
  watch: {
    changeWindoweditor(val) {
      if (!val) {
        var listarr = {
          name: this.setstate ? 2 : 1
        };
        this.$emit("gxbox", listarr);
        this.setstate = false;
      }
    },
    changeMemberTabs(newV, oldV) {
      console.log(newV);
      this.gx(newV);
    },
    status(val) {},
    flagdetail(val) {
      this.changeWindoweditor = val;
    },
    ids(val) {
      this.implementStageIdins = val.implementStageId;
      this.mbids = val.parentId;
    },
    flagdetaildatas(val) {
      this.flagdetaildatasModify1 = val;
      console.log("val",val);
      console.log("this.flagdetaildatasModify1", this.flagdetaildatasModify1);
      this.forbidden(val);
      this.secxtime();
      this.Editthe = val;
      this.comonm(val);
      if (val.startTime != "null") {
        this.startTimeinfo = val.startTime;
        this.endTimeinfo = val.endTime;
      } else {
        this.startTimeinfo = "";
        this.endTimeinfo = "";
      }
      if (val.parents != "") {
        this.the_alllist(val.parents);
      }
      this.createById = val.createBy;
      this.varId = val.id;
      this.name = val.name;
      this.executor = this.flagdetailqc(val.taskExecutors);
      this.ccpeople = this.flagdetailqc(val.taskCopyer);
      if (val.remindType == 0) {
        this.remindType = "不提醒";
        this.remindTypes = 0;
      } else if (val.remindType == 1) {
        this.remindType = "截至前15分钟";
        this.remindTypes = 1;
      } else if (val.remindType == 2) {
        this.remindType = "截至前1小时";
        this.remindTypes = 2;
      } else if (val.remindType == 3) {
        this.remindType = "截至前3小时";
        this.remindTypes = 3;
      } else if (val.remindType == 4) {
        this.remindType = "截至前1天";
        this.remindTypes = 4;
      } else if (val.remindType == 5) {
        this.remindType = "开始前一天";
        this.remindTypes = 5;
      } else if (val.remindType == 6) {
        this.remindType = "开始时";
        this.remindTypes = 6;
      } else if (val.remindType == 7) {
        this.remindType = "完成时";
        this.remindTypes = 7;
      }
      if (val.priority == 0) {
        this.label12 = 0;
        this.value12 = "普通";
      } else if (val.priority == 1) {
        this.label12 = 1;
        this.value12 = "紧急";
      } else {
        this.label12 = 2;
        this.value12 = "非常紧急";
      }
      if (val.content == null) {
        this.html2 = "";
        this.html2s = "";
      } else {
        this.html2 = val.content;
        this.html2s = val.content;
      }
      this.childrenss = val.childrens;
      this.msg = val.notice;
      this.msgs = val.notice;
      if (val.notice != null) {
        this.msg = val.notice;
        this.msgs = val.notice;
      } else {
        this.msg = "";
        this.msgs = "";
      }
      if (val.remindVay == null || val.remindVay == "") {
        this.checkedCities = [];
      } else {
        this.isShowRemind = true;
        console.log(val.remindVay);
        var arr = val.remindVay.split(",");
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] == 0) {
            arr[i] = "站内信";
          } else if (arr[i] == 2) {
            arr[i] = "短信";
          } else {
            arr[i] = "邮件";
          }
        }
        if (
          (this.repetitionvalue == "不重复" || this.repetitionvalue == 0) &&
          val.remindType == 0
        ) {
          this.isShowRemind = false;
        } else {
          this.isShowRemind = true;
        }
        // 取交集处理：当前后台配置+站内信 与 新建时配置
        this.checkedCities = Array.from(
          new Set(this.cities.filter(x => new Set(arr).has(x)))
        );
      }
    },
    isaddtasksDetail(val) {
      this.changeWindoweditor = val;
      if (val == true) {
        let draft = this.$utils.getDraft("financingId", false);
        if (!draft) {
          this.setTimeoutr();
          return;
        }
        this.$confirm("是否载入上次保存的草稿?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            // 回显草稿数据
            console.log(draft.msg);
            this.name = draft.name;
            this.html2 = draft.content;
            this.msg = draft.msg;
            this.setTimeoutr();
          })
          .catch(() => {
            this.setTimeoutr();
          });
      } else {
        clearInterval(this.newmanagement);
      }
    },
    startTimeinfo(val) {
      val == null || val == "" ? this.selemrer() : this.startpicker();
    },
    checkedCities() {
      this.checkedCities.map(ele => {
        if (ele == "站内信") {
          if (this.checkedCities.length == 1) {
            this.txdisabled = true;
            this.infoArr = [];
            this.Remind = false;
          }
        } else {
          this.txdisabled = false;
        }
      });
    }
  },
  mounted() {
    this.flagdetaildatasModify1 = this.flagdetaildatasModify
    this.$watch("mbids", function(newValue, oldValue) {
      this.mbids = newValue;
    });
    //开始
    var myDate = new Date();
    // this.startTimeinfo = this.gettimes("1");
    // this.endTimeinfo = this.gettimes("2");
    this.getrepetition(new Date()); //默认重复周期开始时间
    this.copti = this.gettimes("3").substring(0, 10);
    // 截止
    this.getPromptType();
  },
  methods: {
    checkPower(e) {
      console.log("阻止");
      if (!this.isTaskUser) {
        this.$message.warning("无对应权限，请联系对应项目组负责人处理");
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      (this.definedtime || !this.definedtime.length) && this.secxtime();
    },
    checkPower2(obj) {
      if (!this.isTaskUser) {
        this.$nextTick(() => {
          this.$message.warning("无对应权限，请联系对应项目组负责人处理");
          this.$refs[obj].visible = false;
          return;
        });
      }
    },
    setchecktask(state) {
      console.log(state)
      this.$post(state ? "/info/task/completeTask" : "/info/task/toUnderway", {
        token: this.token,
        userId: this.userId,
        data: {
          id: this.flagdetaildatasModify1.id
        }
      })
        .then(response => {
          this.setstate = true;
          this.$emit("update", this.flagdetaildatasModify1);
          this.clearUpdata();
          if (response.code == 0) {
            this.$message.success(response.msg);
            this.forbidden(this.flagdetaildatas);
          } else if (response.code == -3021) {
            this.$message.success(response.msg);
            this.forbidden(this.flagdetaildatas);
          } else {
            this.$message.error(response.msg);
          }
        })
        .catch(function(error) {});
    },
    clearUpdata() {
      this.seldatas();
      this.infoArr = [];
      this.executors = [];
      this.ccpeoples = [];
      this.remindType = 0;
      this.txfs = false;
      this.rightName = "one";
      this.startTimeinfo = "";
      this.endTimeinfo = "";
      this.inputadd = "";
      this.iscenetrs = false;
      this.spans = [];
      this.isShowRemind = false;
      this.addnum = 1;
      this.addinfo = true;
      this.frequencyvalue = "天";
      this.radio = "1";
      this.frequencopti = false;
      this.frequenge = false;
      this.frequenz = false;
      this.checked = false;
      this.Customdisableis = false;
      this.changes = { state: 1 };
    },
    forbidden(val) {
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          id: val.id
        }
      };
      this.$post("/info/task/getTaskDetailsByid", data)
        .then(response => {
          this.forbiddenis = response.data.status;
          this.titeforbidden =
            response.data.status == 4 ? "任务完成（不可编辑）" : "编辑任务";
          this.forbiddenisinfo = response.data.status == 4 ? true : false;
        })
        .catch(function(error) {});
    },
    // 获取通知方式
    getPromptType() {
      this.$post("/sys/getNoticeWayConfig")
        .then(res => {
          if (this.code.codeNum.SUCCESS == res.code) {
            res.data.email == 1 && this.cities.push("邮件");
            res.data.sms == 1 && this.cities.push("短信");
            return;
          }
          this.$message.error("通知方式获取失败");
        })
        .catch(err => {
          console.log(err);
        });
    },
    issuers() {
      this.Remind ? (this.findFlags = true) : (this.findFlags = false);
      this.Remind ? this.infoArr : (this.infoArr = []);
    },
    addtask() {
      this.checkPower();
      this.infoArr = this.$utils.uniqBy(this.infoArr, "id");
      this.findFlags = this.Remind;
    },
    findAllUserinfo(val) {
      this.infoArr = val.slice();
    },
    closeis(item, index) {
      this.infoArr.splice(index, 1);
    },
    periodinfo(val, is) {
      var definedtimealue;
      if (typeof val == "number") {
        definedtimealue = val;
      } else {
        definedtimealue = val.variableId;
      }
      var data = {
        token: this.token,
        userId: this.userId,
        projectId: this.$store.state.projectMsg.pro_id,
        data: {
          projectId: this.$store.state.projectMsg.pro_id,
          variableId: definedtimealue
        }
      };
      this.$post("/info/project/isTimeVariable", data)
        .then(res => {
          if (res.code == 0) {
            if (res.data == undefined) {
              this.startTimeinfo = "";
              this.endTimeinfo = "";
              return;
            }
            this.infotime = res.data;
            this.periodmethod();
          } else if (res.code == -5115) {
            this.routeinfo();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    routeinfo() {
      this.$confirm("有项目时间信息不完整，是否完善?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning"
      })
        .then(() => {
          if (this.$utils.checkProjectPermission("project_information")) {
            this.$router.push("/projectmessage");
          } else {
            this.$message.error("没有权限");
          }
        })
        .catch(() => {});
    },
    periodmethod(res) {
      if (this.infotime == "") {
        this.$message.error("请选择自定义时间");
        return;
      }
      var startDayNum, startDayType, endDayNum;
      startDayNum = this.plusstartTimeinfovalue + this.plusstartinput;
      startDayType = this.naturalstartTimevalue == "工作日" ? true : false;
      endDayNum = this.naturalendTimevalue + this.plusendinput;
      this.startTimeinfo = this.gettieminfo(
        startDayType,
        this.plusstartinput,
        this.infotime,
        this.plusstartTimeinfovalue
      );
      this.endTimeinfo = this.gettieminfo(
        startDayType,
        this.plusendinput,
        this.infotime,
        this.naturalendTimevalue
      );
      setTimeout(() => {
        this.taksTplRepetitionPeriodinfos();
      }, 10);
    },
    taksTplRepetitionPeriodinfos() {
      if (this.startTimeinfo == "" || this.startTimeinfo == null) {
        return;
      }
      var myDate = new Date(this.startTimeinfo.replace(new RegExp(/-/gm), "/"));
      var day;
      this.filtersweek.filter(x => {
        if (Number(x.value) == myDate.getDay()) {
          day = x.label;
        }
      });
      this.weekday = myDate.getDay();
      if (this.taksTplRepetitionPeriodinfo != null) {
        if (this.taksTplRepetitionPeriodinfo.repetitionPeriod == 5) {
          if (this.taksTplRepetitionPeriodinfo.customized == 3) {
            if (this.taksTplRepetitionPeriodinfo.repetitionFrequency == 1) {
              this.repetitionvalue = "每个月第" + myDate.getDate() + "天";
            } else {
              this.repetitionvalue =
                "每个" +
                this.taksTplRepetitionPeriodinfo.repetitionFrequency +
                "月第" +
                myDate.getDate() +
                "天";
            }
          } else if (this.taksTplRepetitionPeriodinfo.customized == 4) {
            if (this.taksTplRepetitionPeriodinfo.repetitionFrequency == 1) {
              this.repetitionvalue =
                "每个月第" + Math.ceil(myDate.getDate() / 7) + "个星期" + day;
            } else {
              this.repetitionvalue =
                "每个" +
                this.taksTplRepetitionPeriodinfo.repetitionFrequency +
                "月第" +
                Math.ceil(myDate.getDate() / 7) +
                "个星期" +
                day;
            }
            this.taksTplRepetitionPeriod.week =
              myDate.getDay() == 0 ? 7 : myDate.getDay();
            this.taksTplRepetitionPeriod.weekNum = Math.ceil(
              myDate.getDate() / 7
            );
          } else if (this.taksTplRepetitionPeriodinfo.customized == 5) {
            if (this.taksTplRepetitionPeriodinfo.repetitionFrequency == 1) {
              this.repetitionvalue =
                "每年" + this.startTimeinfo.substring(5, 10);
            } else {
              this.repetitionvalue =
                "每" +
                this.taksTplRepetitionPeriodinfo.repetitionFrequency +
                "年" +
                this.startTimeinfo.substring(5, 10);
            }
          }
          if (this.taksTplRepetitionPeriodinfo.repetitionEndType == 1) {
            this.repetitionvalue =
              this.repetitionvalue +
              "到" +
              this.taksTplRepetitionPeriodinfo.repetitionEndTime.substring(
                0,
                10
              );
          } else if (this.taksTplRepetitionPeriodinfo.repetitionEndType == 2) {
            this.repetitionvalue =
              this.repetitionvalue +
              ",重复" +
              this.taksTplRepetitionPeriodinfo.repetitionNum +
              "次";
          }
          console.log(this.repetition[this.repetition.length].value);
          if (this.repetition[this.repetition.length - 1].value == "ok") {
            this.$set(
              this.repetition[this.repetition.length - 1],
              "label",
              this.repetitionvalue
            );
          } else {
            setTimeout(() => {
              this.repetition.push({
                value: "ok",
                label: this.repetitionvalue
              });
            });
          }
          this.oldItem = [
            {
              label: this.repetitionvalue
            }
          ];
          //   setTimeout(() => {
          //   if (val.taskTplRepetitionPeriod.repetitionPeriod != 5) {
          //     if (this.repetition[this.repetition.length - 1].value == "ok") {
          //       this.repetition.splice(this.repetition.length, 1);
          //     }
          //   }
          // }, 10);
        }
      }
    },
    gettieminfo(startDayType, num, date, state) {
      state = state == "+" ? true : false;
      console.log(startDayType, num, date, state);
      function getDateByType(currentDate, num, isWork, isAdd) {
        let curtime = new Date(currentDate).valueOf();
        let type = isAdd ? 1 : -1;
        let targetDate = "";
        num = Number(num);

        if (!isWork) {
          // 计算自然日
          targetDate = curtime + type * num * 24 * 3600 * 1000;
        } else {
          // 工作日
          targetDate = curtime; // 以当前时间为基准
          let i = num;
          while (i > 0) {
            targetDate += type * 24 * 3600 * 1000;
            if (
              new Date(targetDate).getDay() >= 1 &&
              new Date(targetDate).getDay() <= 5
            ) {
              i--;
            }
          }
        }
        return new Date(targetDate);
      }
      var timeinfo = this.gettime(
        getDateByType(date, num, startDayType, state)
      ).substring(0, 10);
      return timeinfo + " " + "00:" + "00";
    },
    rwtx() {
      // this.isShowRemind = this.remindTypes != 0;
      if (
        (this.repetitionvalue == "不重复" || this.repetitionvalue == 0) &&
        this.remindTypes == 0
      ) {
        this.isShowRemind = false;
      } else {
        this.isShowRemind = true;
      }
      if (this.form.remindType == 0) {
        this.checkedCities = ["站内信"];
      }
    },
    // 开始
    selemrer() {
      this.repetition = [
        {
          value: "6",
          label: "不重复"
        },
        {
          value: "0",
          label: "每天"
        },
        {
          value: "4",
          label: "自定义"
        }
      ];
    },
    secxtime() {
      //时间变量接口
      var data = {
        token: this.token,
        userId: this.userId,
        data: {}
      };
      this.$post("/info/timeVar/findUsingList", data)
        .then(response => {
          this.definedtime = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    startpicker(item, e) {
      // 选择开始时间 重复周期时间变动
      if (item == 1) {
        this.repetitionvalue = "不重复";
        this.taksTplRepetitionPeriod = {
          repetitionPeriod: null
        };
      }
      if (this.startTimeinfo != "" && this.startTimeinfo != null) {
        this.getrepetition(
          new Date(this.startTimeinfo.replace(new RegExp(/-/gm), "/"))
        );
      }
    },
    endPicker() {
      if (!this.isTaskUser) {
        this.$message.warning("没有该权限");
        return;
      }
    },
    getrepetition(myDate) {
      // 重复周期下拉处理
      console.log(myDate);
      var day;
      this.filtersweek.filter(x => {
        if (Number(x.value) == myDate.getDay()) {
          day = x.label;
        }
      });
      this.weekday = myDate.getDay();
      this.repetition = [
        {
          value: "6",
          label: "不重复"
        },
        {
          value: "0",
          label: "每天"
        },
        {
          value: "1",
          label: "每周星期" + day
        },
        {
          value: "2",
          label: "每月第" + Math.ceil(myDate.getDate() / 7) + "个星期" + day
        },
        {
          value: "3",
          label:
            "每年" + (myDate.getMonth() + 1) + "月" + myDate.getDate() + "日"
        },
        {
          value: "4",
          label: "自定义"
        }
      ];
    },
    Customdisable() {
      // 自定义时间 时间、重复周期处理
      if (this.checked) {
        this.plusstartTimeinfovalue = "-";
        this.plusstartinput = 5;
        this.naturalstartTimevalue = "工作日";
        this.naturalendTimevalue = "+";
        // this.naturalstartTimevalue = "自然日";
        this.plusendinput = 5;
        this.repetitionvalue = "不重复";
        this.taksTplRepetitionPeriod = {
          repetitionPeriod: null
        };
        this.secxtime();
      } else {
        this.definedtimealue = "";
        this.plusstartTimeinfovalue = "";
        this.plusstartinput = "";
        this.naturalstartTimevalue = "";
        this.naturalendTimevalue = "";
        this.naturalstartTimevalue = "";
        this.plusendinput = "";
        this.repetitionvalue = "不重复";
        this.taksTplRepetitionPeriod = {
          repetitionPeriod: null
        };
      }
      this.addnum = 1;
      this.frequencyvalue = "天";
      this.radio = "1";
      this.frequencopti = false;
      this.frequenge = false;
      this.frequenz = false;
      this.checked
        ? (this.isCustomdisableis = true)
        : (this.isCustomdisableis = false);
      this.checked
        ? (this.Customdisableis = true)
        : (this.Customdisableis = false);
      this.startTimeinfo = "";
      this.endTimeinfo = "";
      // this.checked
      //   ? (this.startTimeinfo = "")
      //   : (this.startTimeinfo = this.gettime("1"));
      // this.checked
      //   ? (this.endTimeinfo = "")
      //   : (this.endTimeinfo = this.gettime("2"));
      // this.checked
      //   ? (this.repetition = [
      //       {
      //         value: "6",
      //         label: "不重复"
      //       },
      //       {
      //         value: "0",
      //         label: "每天"
      //       },
      //       {
      //         value: "4",
      //         label: "自定义"
      //       }
      //     ])
      //   : this.startpicker();
    },
    gettimes(ts) {
      //公共时间处理方法
      var ms, ds, hs, fs, ss, times, date;
      ts.length == 1
        ? (date = new Date().getTime())
        : (date = new Date(ts).getTime());
      if (ts == 1) {
        date = date + 60 * 60 * 1000;
      }
      if (ts == 2) {
        date = date + 60 * 60 * 2 * 1000;
      }
      var time = new Date(date);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var f = time.getMinutes();
      var s = time.getSeconds();
      m < 10 ? (ms = "0" + m) : (ms = m);
      d < 10 ? (ds = "0" + d) : (ds = d);
      h < 10 ? (hs = "0" + h) : (hs = h);
      f < 10 ? (fs = "0" + f) : (fs = f);
      s < 10 ? (ss = "0" + s) : (ss = s);
      ts == 1 || 2 ? (fs = "00") : f < 10 ? (fs = "0" + f) : (fs = f);
      ts == 1 || 2 ? (ss = "00") : s < 10 ? (ss = "0" + s) : (ss = s);
      return (times = y + "-" + ms + "-" + ds + " " + hs + ":" + fs + ":" + ss);
    },
    selerepetition(item) {
      var item = this.repetition[this.repetitionvalue];
      if (item.value != "4") {
        item.index = this.repetitionvalue;
        this.oldItem = [...[item]];
      }
      if (item.value == "0") {
        this.taksTplRepetitionPeriod = {
          repetitionPeriod: "1"
        };
      } else if (item.value == "1") {
        this.taksTplRepetitionPeriod = {
          repetitionPeriod: "2",
          week: this.weekday == 0 ? 7 : this.weekday
        };
      } else if (item.value == "2") {
        this.taksTplRepetitionPeriod = {
          repetitionPeriod: "3",
          weekNum: item.label.substring(3, 4),
          week: this.weekday == 0 ? 7 : this.weekday
        };
      } else if (item.value == "3") {
        this.taksTplRepetitionPeriod = {
          repetitionPeriod: "4"
        };
      } else if (item.value == "4") {
        this.drepetitionvalue = true;
      } else if (item.value == "6") {
        this.taksTplRepetitionPeriod = {
          repetitionPeriod: null
        };
      } else {
        if (item.value == "ok") {
          this.taksTplRepetitionPeriod = this.taksTplRepetitionPeriodinfo;
        } else {
          this.taksTplRepetitionPeriod = this.taksTplRepetitionPeriod;
        }
      }
      item.label == "不重复"
        ? (this.txfs = [false, 1])
        : (this.txfs = [true, 1]);
      if (
        (this.repetitionvalue == "不重复" || this.repetitionvalue == 0) &&
        this.remindTypes == 0
      ) {
        this.isShowRemind = false;
      } else {
        this.isShowRemind = true;
        if (this.addinfo) {
          var val = this.Accessval;
          this.Access(val);
        } else {
          var val = {
            taskTplRepetitionPeriod: this.taksTplRepetitionPeriod
          };
          this.Access(val);
        }
        setTimeout(() => {
          console.log(this.comonmval);
          var weekdemo = this.$refs.weektimeclick;
          for (let i = 0; i < weekdemo.length; i++) {
            weekdemo[i].style.background = "";
            weekdemo[i].style.color = "black";
          }
          this.comonmval.forEach((ele, index) => {
            weekdemo.forEach((el, idx) => {
              if (Number(ele - 1) == idx) {
                // console.log(el)
                el.style.background = "#3396fa";
                el.style.color = "white";
              }
            });
          });
        });
        this.addinfo = false;
      }
      this.taksTplRepetitionPeriod = this.taksTplRepetitionPeriod;
    },
    finishtime() {
      if (this.radio == 1) {
        this.Wirelessrepeat = true;
        this.someday = true;
      } else if (this.radio == 2) {
        this.Wirelessrepeat = false;
        this.someday = true;
      } else {
        this.Wirelessrepeat = true;
        this.someday = false;
      }
    },
    isopen() {},
    frequen() {
      var myDate, day;
      if (this.startTimeinfo != "" && this.startTimeinfo != null) {
        myDate = new Date(this.startTimeinfo.replace(new RegExp(/-/gm), "/"));
        this.filtersweek.filter(x => {
          if (Number(x.value) == myDate.getDay()) {
            day = x.label;
          }
        });
      }
      if (this.frequencyvalue == "天") {
        this.frequenge = false;
        this.frequenz = false;
        this.frequencopti = false;
      } else if (this.frequencyvalue == "周") {
        this.frequenge = true;
        this.frequenz = false;
        this.frequencopti = true;
        var weekdemo = this.$refs.weektimeclick;
        for (let i = 0; i < weekdemo.length; i++) {
          weekdemo[i].style.background = "";
          weekdemo[i].style.color = "black";
        }
        var val = this.Accessval;
        // if(val.taskTplRepetitionPeriod != null){
        // if(val.taskTplRepetitionPeriod.customized != 2){
        if (this.startTimeinfo != "" && this.startTimeinfo != null) {
          var day = myDate.getDay() == 0 ? 6 : myDate.getDay() - 1;
          weekdemo[day].style.background = "#3396fa";
          weekdemo[day].style.color = "white";
        } else {
          weekdemo[0].style.background = "#3396fa";
          weekdemo[0].style.color = "white";
        }
        //   }
        // }
      } else if (this.frequencyvalue == "个月") {
        this.frequenge = false;
        this.frequenz = true;
        this.frequencopti = true;
      } else {
        this.repetitioncs = 5;
        this.frequenge = false;
        this.frequenz = false;
        this.frequencopti = false;
      }
      day = this.startTimeinfo == "" || this.startTimeinfo == null ? "x" : day;
      var mode =
        this.startTimeinfo == "" || this.startTimeinfo == null
          ? "x"
          : Math.ceil(myDate.getDate() / 7);
      var date =
        this.startTimeinfo == "" || this.startTimeinfo == null
          ? "x"
          : myDate.getDate();
      this.frequencoptions = [
        {
          value: "0",
          label: "每月第" + date + "天"
        },
        {
          value: "1",
          label: "每月第" + mode + "个星期" + day
        }
      ];
    },
    weektimeclick(index) {
      if (
        this.$refs.weektimeclick[index].style.background ==
          "rgb(245, 245, 245)" ||
        this.$refs.weektimeclick[index].style.background == ""
      ) {
        this.$refs.weektimeclick[index].style.background = "#3396fa";
        this.$refs.weektimeclick[index].style.color = "white";
      } else {
        if (this.weekciclk()) {
          return;
        }
        this.$refs.weektimeclick[index].style.background = "#f5f5f5";
        this.$refs.weektimeclick[index].style.color = "black";
      }
    },
    weekciclk() {
      var weekdemo = this.$refs.weektimeclick;
      var weekarr = [];
      for (let i = 0; i < weekdemo.length; i++) {
        if (weekdemo[i].style.color == "white") {
          weekarr.push(weekdemo[i]);
        }
      }
      if (weekarr.length == 1) {
        this.$message.error("请选择重复时间");
        return weekarr.length;
      }
    },
    drepetitionvalues() {
      var addnum = this.addnum == 1 ? "" : this.addnum;
      var label;
      var taksTplRepetitionPeriod;
      var repetitioncs;
      if (this.frequencyvalue == "天") {
        // 天
        repetitioncs = 1;
        if (this.radio == 1) {
          label = "每" + addnum + "天";
        } else if (this.radio == 2) {
          label = "每" + addnum + "天到" + this.copti + "结束";
        } else {
          label = "每" + addnum + "天，重复" + this.inputcopti + "次";
        }
      } else if (this.frequencyvalue == "周") {
        // 周
        repetitioncs = 2;
        var week = "",
          cstomizedWeek = "";
        for (let index = 0; index < this.$refs.weektimeclick.length; index++) {
          if (
            this.$refs.weektimeclick[index].style.background != "" &&
            this.$refs.weektimeclick[index].style.background !=
              "rgb(245, 245, 245)"
          ) {
            // console.log(this.$refs.weektimeclick[index])
            week += "星期" + this.$refs.weektimeclick[index].innerText + ",";
            cstomizedWeek += index + 1 + ",";
          }
        }
        cstomizedWeek = cstomizedWeek.substring(
          0,
          cstomizedWeek.lastIndexOf(",")
        );
        if (this.radio == 1) {
          label =
            "每" + addnum + "周的" + week.substring(0, week.lastIndexOf(","));
        } else if (this.radio == 2) {
          label =
            "每" +
            addnum +
            "周的" +
            week.substring(0, week.lastIndexOf(",")) +
            this.copti +
            "结束";
        } else {
          label =
            "每" +
            addnum +
            "周的" +
            week.substring(0, week.lastIndexOf(",")) +
            "，重复" +
            this.inputcopti +
            "次";
        }
      } else if (this.frequencyvalue == "个月") {
        // 个月
        var item = this.frequencoptions[this.frequencoptionsvalue];
        if (item == undefined) {
          this.$message.error("请选择重复时间");
          return;
        }
        var days;
        if (new RegExp("[0-9]").test(item.label)) {
          days = item.label.replace(/[^0-9]/gi, "");
        } else {
          days = item.label.substring(3, 4);
        }
        if (this.frequencoptionsvalue == 0) {
          repetitioncs = 3;
          if (this.radio == 1) {
            label = "每" + addnum + "月的第" + days + "天";
          } else if (this.radio == 2) {
            label =
              "每" + addnum + "月的第" + days + "天到" + this.copti + "结束";
          } else {
            label =
              "每" +
              addnum +
              "月的第" +
              days +
              "天,重复" +
              this.inputcopti +
              "次";
          }
        } else {
          repetitioncs = 4;
          if (this.radio == 1) {
            if (this.addnum == 1) {
              label = item.label;
            } else {
              label = "每" + addnum + "月" + item.label.substring(2, 8);
            }
          } else if (this.radio == 2) {
            label =
              "每" +
              addnum +
              "月" +
              item.label.substring(2, 8) +
              "到" +
              this.copti +
              "结束";
          } else {
            label =
              "每" +
              addnum +
              "月" +
              item.label.substring(2, 8) +
              ",重复" +
              this.inputcopti +
              "次";
          }
          var weekNums, weekNumis;
          weekNums = item.label.substring(3, 4);
          var day;
          var myDate = new Date();
          weekNumis =
            item.label.substring(7) == 0 ? 7 : item.label.substring(7);
          this.filtersweek.filter(x => {
            if (x.label == weekNumis) {
              weekNumis = x.value;
            }
          });
          weekNumis = weekNumis == 0 ? 7 : weekNumis;
        }
      } else {
        //年
        repetitioncs = 5;
        if (this.startTimeinfo == "" || this.startTimeinfo == null) {
          if (this.radio == 1) {
            label = "每" + addnum + "年";
          } else if (this.radio == 2) {
            label = "每" + addnum + "年" + "到" + this.copti + "结束";
          } else {
            label = "每" + addnum + "年,重复" + this.inputcopti + "次";
          }
        } else {
          if (this.radio == 1) {
            label = "每" + addnum + "年" + this.startTimeinfo.substring(5, 10);
          } else if (this.radio == 2) {
            label =
              "每" +
              addnum +
              "年" +
              this.startTimeinfo.substring(5, 10) +
              "到" +
              this.copti +
              "结束";
          } else {
            label =
              "每" +
              addnum +
              "年" +
              this.startTimeinfo.substring(5, 10) +
              ",重复" +
              this.inputcopti +
              "次";
          }
        }
      }
      if (
        this.repetition.length ==
        (this.startTimeinfo == "" || this.startTimeinfo == null ? 3 : 6)
      ) {
        this.repetition.push({
          value: "5",
          label: label
        });
      } else {
        this.repetition[
          this.startTimeinfo == "" || this.startTimeinfo == null ? 3 : 6
        ].label = label;
      }
      var repetitionEndTypeisi = this.copti,
        isrepetitionEndType = this.inputcopti;
      if (this.radio == "1") {
        repetitionEndTypeisi = "";
        isrepetitionEndType = "";
      } else if (this.radio == "2") {
        isrepetitionEndType = "";
      } else {
        repetitionEndTypeisi = "";
      }
      // console.log(cstomizedWeek)
      // return
      // console.log(repetitionEndTypeisi)
      var taksTplRepetitionPeriod;
      taksTplRepetitionPeriod = {
        repetitionPeriod: 5, // 重复周期(1:每天,2:每周几,3:每月第几周,4:每年,5:自定义)",
        weekNum: weekNums == "x" ? "" : weekNums,
        week: weekNumis == "x" ? "" : weekNumis,
        customized: repetitioncs, //"自定义重复周期(0:默认,1:天,2:周,3:每月第几天,4:每月第几周,5每年)"
        repetitionFrequency: this.addnum,
        repetitionEndType: this.radio - 1, //"结束类型（0:无限重复,1:终止于某天,2:重复次数）",
        repetitionEndTime:
          repetitionEndTypeisi == ""
            ? ""
            : repetitionEndTypeisi + " " + "00:00:00",
        repetitionNum: isrepetitionEndType, //"重复次数",
        customizedWeek: cstomizedWeek // "自定义周几（1,2。1到7“逗号”拼接）",
      };
      this.taksTplRepetitionPeriod = taksTplRepetitionPeriod;
      this.drepetitionvalue = false;
      this.labelinfo = label;
      this.oldItem = [
        ...[
          {
            value: 5,
            label: label
          }
        ]
      ];
      this.repetitionvalue = label;
    },
    inputcheck(index) {
      if (index == 1) {
      } else if (index == 2) {
      }
    },
    petitionvalueclose() {
      // console.log(this.oldItem)
      // console.log(this.repetitionvalue)
      // this.labelinfo == this.repetitionvalue
      //   ? (this.repetitionvalue = this.labelinfo)
      //   : (this.repetitionvalue = "不重复");
      var val = this.oldItem;
      if (val == "") {
        this.repetitionvalue = "不重复";
        this.taksTplRepetitionPeriod = {
          repetitionPeriod: null
        };
      } else {
        this.repetitionvalue = val[0].label;
      }
      if (this.addinfo) {
        this.addnum = 1;
        this.frequencyvalue = "天";
        this.radio = "1";
        this.frequencopti = false;
        this.frequenge = false;
        this.frequenz = false;
      }
    },
    calculate(index) {
      var plusstartinput, plusendinput, addnum, inputcopti;
      switch (index) {
        case 1:
          this.plusstartinput = /[^\d]/g.test(this.plusstartinput)
            ? 1
            : this.plusstartinput;
          break;
        case 2:
          this.plusendinput = /[^\d]/g.test(this.plusendinput)
            ? 1
            : this.plusendinput;
          break;
        case 3:
          if (!/^[0-9]*[1-9][0-9]*$/.test(this.addnum)) {
            this.addnum = 1;
          }
          break;
        case 4:
          if (!/^[0-9]*[1-9][0-9]*$/.test(this.inputcopti)) {
            this.inputcopti = 1;
          }
          break;
        case 5:
          break;
      }
    },
    Access(val) {
      var val = val;
      if (val.taskTplRepetitionPeriod != null) {
        if (val.taskTplRepetitionPeriod.repetitionPeriod == 5) {
          this.addnum = val.taskTplRepetitionPeriod.repetitionFrequency;
          this.copti =
            val.taskTplRepetitionPeriod.repetitionEndTime == "" ||
            val.taskTplRepetitionPeriod.repetitionEndTime == null
              ? this.gettimes("3").substring(0, 10)
              : val.taskTplRepetitionPeriod.repetitionEndTime.substring(0, 10);
          this.inputcopti = val.taskTplRepetitionPeriod.repetitionNum;
          var day, getmode, getday, time;
          if (this.startTimeinfo != "" && this.startTimeinfo != null) {
            time = new Date(this.startTimeinfo.replace(new RegExp(/-/gm), "/"));
          }
          // var time = new Date(this.startTimeinfo.replace(new RegExp(/-/gm) ,"/"))
          if (this.startTimeinfo == "" || this.startTimeinfo == null) {
            (day = "x"), (getmode = "x"), (getday = "x");
          } else {
            (getday = time.getDate()),
              (getmode = Math.ceil(time.getDate() / 7)),
              (day = time.getDay());
          }
          if (day != "x") {
            this.filtersweek.filter(x => {
              if (Number(x.value) == day) {
                day = x.label;
              }
            });
          }
          if (val.taskTplRepetitionPeriod.customized == 1) {
            this.frequencyvalue = "天";
            this.frequencopti = false;
            this.frequenge = false;
            this.frequenz = false;
          } else if (val.taskTplRepetitionPeriod.customized == 2) {
            this.frequencyvalue = "周";
            this.frequencopti = true;
            this.frequenge = true;
            this.frequenz = false;
            this.comonmval = val.taskTplRepetitionPeriod.customizedWeek.split(
              ","
            );
          } else if (val.taskTplRepetitionPeriod.customized == 3) {
            this.frequencyvalue = "个月";
            this.frequencopti = true;
            this.frequenge = false;
            this.frequenz = true;
            this.frequencoptionsvalue = "0";
          } else if (val.taskTplRepetitionPeriod.customized == 4) {
            this.frequencyvalue = "个月";
            this.frequencopti = true;
            this.frequenge = false;
            this.frequenz = true;
            this.frequencoptionsvalue = "1";
          } else if (val.taskTplRepetitionPeriod.customized == 5) {
            this.frequencyvalue = "年";
            this.frequencopti = false;
            this.frequenge = false;
            this.frequenz = false;
          }
          this.addnum = val.taskTplRepetitionPeriod.repetitionFrequency;
          this.radio = (
            val.taskTplRepetitionPeriod.repetitionEndType + 1
          ).toString();
          if (val.taskTplRepetitionPeriod.repetitionEndType == 0) {
            this.someday = true;
            this.Wirelessrepeat = true;
          } else if (val.taskTplRepetitionPeriod.repetitionEndType == 1) {
            this.someday = true;
            this.Wirelessrepeat = false;
          } else if (val.taskTplRepetitionPeriod.repetitionEndType == 2) {
            this.someday = false;
            this.Wirelessrepeat = true;
          }
          this.frequencoptions = [
            {
              value: "0",
              label: "每月第" + getday + "天"
            },
            {
              value: "1",
              label: "每月第" + getmode + "个星期" + day
            }
          ];
        } else {
          this.addnum = 1;
          this.frequencyvalue = "天";
          this.radio = "1";
          this.frequencopti = false;
          this.frequenge = false;
          this.frequenz = false;
          this.Wirelessrepeat = true;
          this.someday = true;
        }
      } else {
        this.addnum = 1;
        this.frequencyvalue = "天";
        this.radio = "1";
        this.frequencopti = false;
        this.frequenge = false;
        this.frequenz = false;
        this.Wirelessrepeat = true;
        this.someday = true;
      }
    },
    comonm(val) {
      // 判断是否有自定义时间
      if (val.contactList != null) {
        this.infoArr = val.contactList;
      }

      val.taskTplRepetitionPeriod = val.taskRepetitionPeriod;
      this.Accessval = val;
      this.startTimeinfo = val.startTime;
      this.endTimeinfo = val.endTime;
      console.log(val);
      // console.log(this.startTimeinfo)
      // console.log(this.endTimeinfo)
      this.txdisabled = val.remindIssuer == 0;
      this.Remind = val.remindIssuer == 1;
      this.taksTplRepetitionPeriod = val.taskRepetitionPeriod;
      if (val.customized == 1) {
        this.checked = true;
        this.Customdisableis = true;
        this.periodinfo(val, 1);
        if (val.startDayNum < 0) {
          this.plusstartTimeinfovalue = "-";
          this.plusstartinput = Math.abs(val.startDayNum);
        } else {
          this.plusstartTimeinfovalue = "+";
          this.plusstartinput = val.startDayNum;
        }
        this.naturalstartTimevalue =
          val.startDayType == 0 ? "自然日" : "工作日";
        if (val.endDayNum < 0) {
          this.naturalendTimevalue = "-";
          this.plusendinput = Math.abs(val.endDayNum);
        } else {
          this.naturalendTimevalue = "+";
          this.plusendinput = val.endDayNum;
        }
        this.naturalstartTimevalue =
          val.startDayType == 0 ? "自然日" : "工作日";
        this.isCustomdisableis = true;
      } else {
        this.isCustomdisableis = false;
        this.checked = false;
        this.Customdisableis = false;
        this.definedtime = "";
      }
      this.definedtimealue = val.variableName;
      this.variableId = val.variableId;
      //开始回显
      console.log(val.taskTplRepetitionPeriod);
      if (val.taskTplRepetitionPeriod == null) {
        if (val.customized == 1) {
          this.repetitionvalue = "不重复";
          this.taksTplRepetitionPeriod = null;
          this.startTimeinfo = "";
        }
      } else {
        if (val.taskTplRepetitionPeriod.repetitionPeriod == 1) {
          this.repetitionvalue = "每天";
        } else if (val.taskTplRepetitionPeriod.repetitionPeriod == 2) {
          var day;
          var wekday =
            val.taskTplRepetitionPeriod.week == 7
              ? 0
              : val.taskTplRepetitionPeriod.week;
          this.filtersweek.filter(x => {
            if (Number(x.value) == wekday) {
              day = x.label;
              return day;
            }
          });
          this.repetitionvalue = "每周星期" + day;
        } else if (val.taskTplRepetitionPeriod.repetitionPeriod == 3) {
          var day;
          var wekday =
            val.taskTplRepetitionPeriod.week == 7
              ? 0
              : val.taskTplRepetitionPeriod.week;
          this.filtersweek.filter(x => {
            if (Number(x.value) == wekday) {
              day = x.label;
              return day;
            }
          });
          this.repetitionvalue =
            "每月第" + val.taskTplRepetitionPeriod.weekNum + "星期" + day;
        } else if (val.taskTplRepetitionPeriod.repetitionPeriod == 4) {
          this.repetitionvalue =
            "每年" +
            val.taskTplRepetitionPeriod.repetitionDate.substring(5, 10) +
            "日";
        } else if (val.taskTplRepetitionPeriod.repetitionPeriod == 5) {
          // 自定义时间的情况

          if (val.taskTplRepetitionPeriod.customized == 1) {
            if (val.taskTplRepetitionPeriod.repetitionFrequency == 1) {
              this.repetitionvalue = "每天";
            } else {
              this.repetitionvalue =
                "每" + val.taskTplRepetitionPeriod.repetitionFrequency + "天";
            }
          } else if (val.taskTplRepetitionPeriod.customized == 2) {
            var arrweek = val.taskTplRepetitionPeriod.customizedWeek.split(",");
            arrweek.forEach((ele, index) => {
              if (ele == 7) {
                arrweek[index] = 0;
              }
            });
            var days = "";
            for (let i = 0; i < arrweek.length; i++) {
              this.filtersweek.filter(x => {
                if (Number(x.value) == Number(arrweek[i])) {
                  days += "星期" + x.label + ",";
                }
              });
            }
            if (val.taskTplRepetitionPeriod.repetitionFrequency == 1) {
              this.repetitionvalue = "每周" + days;
            } else {
              this.repetitionvalue =
                "每" +
                val.taskTplRepetitionPeriod.repetitionFrequency +
                "周" +
                days;
            }
          } else if (val.taskTplRepetitionPeriod.customized == 3) {
            if (val.taskTplRepetitionPeriod.repetitionDate != null) {
              if (val.taskTplRepetitionPeriod.repetitionFrequency == 1) {
                this.repetitionvalue =
                  "每月第" +
                  val.taskTplRepetitionPeriod.repetitionDate.substring(8, 10) +
                  "天";
              } else {
                this.repetitionvalue =
                  "每" +
                  val.taskTplRepetitionPeriod.repetitionFrequency +
                  "月第" +
                  val.taskTplRepetitionPeriod.repetitionDate.substring(8, 10) +
                  "天";
              }
            } else {
              if (val.taskTplRepetitionPeriod.repetitionFrequency == 1) {
                this.repetitionvalue = "每月第x天";
              } else {
                this.repetitionvalue =
                  "每" +
                  val.taskTplRepetitionPeriod.repetitionFrequency +
                  "月第x天";
              }
            }
          } else if (val.taskTplRepetitionPeriod.customized == 4) {
            var day;
            var wekday =
              val.taskTplRepetitionPeriod.week == 7
                ? 0
                : val.taskTplRepetitionPeriod.week;
            this.filtersweek.filter(x => {
              if (Number(x.value) == wekday) {
                day = x.label;
                return day;
              }
            });
            if (val.taskTplRepetitionPeriod.repetitionDate != null) {
              if (val.taskTplRepetitionPeriod.repetitionFrequency == 1) {
                this.repetitionvalue =
                  "每月第" +
                  val.taskTplRepetitionPeriod.weekNum +
                  "个星期" +
                  day;
              } else {
                this.repetitionvalue =
                  "每" +
                  val.taskTplRepetitionPeriod.repetitionFrequency +
                  "月第" +
                  val.taskTplRepetitionPeriod.weekNum +
                  "个星期" +
                  day;
              }
            } else {
              if (val.taskTplRepetitionPeriod.repetitionFrequency == 1) {
                this.repetitionvalue = "每月第x个星期第x天";
              } else {
                this.repetitionvalue =
                  "每" +
                  val.taskTplRepetitionPeriod.repetitionFrequency +
                  "月第x个星期第x天";
              }
            }
          } else if (val.taskTplRepetitionPeriod.customized == 5) {
            var datas =
              val.taskTplRepetitionPeriod.repetitionDate == null ||
              val.taskTplRepetitionPeriod.repetitionDate == ""
                ? ""
                : this.startTimeinfo.substring(5, 10);
            if (val.taskTplRepetitionPeriod.repetitionFrequency == 1) {
              this.repetitionvalue = "每年" + datas;
            } else {
              this.repetitionvalue =
                "每" +
                val.taskTplRepetitionPeriod.repetitionFrequency +
                "年" +
                datas;
            }
          }
          if (val.taskTplRepetitionPeriod.repetitionEndType == 1) {
            this.repetitionvalue =
              this.repetitionvalue +
              "到" +
              val.taskTplRepetitionPeriod.repetitionEndTime.substring(0, 10);
          } else if (val.taskTplRepetitionPeriod.repetitionEndType == 2) {
            this.repetitionvalue =
              this.repetitionvalue +
              ",重复" +
              val.taskTplRepetitionPeriod.repetitionNum +
              "次";
          }
          this.oldItem = [
            {
              label: this.repetitionvalue
            }
          ];
          this.taksTplRepetitionPeriodinfo = val.taskTplRepetitionPeriod;
          val.taskTplRepetitionPeriod.repetitionDate != null
            ? this.startpicker()
            : this.selemrer();
          setTimeout(() => {
            this.repetition.push({
              value: "ok",
              label: this.repetitionvalue
            });
          });
        }
        setTimeout(() => {
          if (val.taskTplRepetitionPeriod.repetitionPeriod != 5) {
            // console.log(this.repetition[this.repetition.length].value);
            if (this.repetition[this.repetition.length - 1].value == "ok") {
              this.repetition.splice(this.repetition.length, 1);
            }
          }
        }, 10);
        //回显时间
      }
    },
    seldatas() {
      this.variableId = "";
      this.startTimeinfo = "";
      this.endTimeinfo = "";
      this.checked = false;
      this.repetitionvalue = "不重复";
      this.taksTplRepetitionPeriod = {
        repetitionPeriod: null
      };
      this.plusstartTimeinfovalue = "-";
      this.plusstartinput = "0";
      this.naturalstartTimevalue = "工作日";
      this.naturalendTimevalue = "+";
      this.naturalstartTimevalue = "自然日";
      this.plusendinput = "0";
      this.Customdisableis = false;
      this.isCustomdisableis = false;
    },
    seldata(response) {
      this.variableId = "";
      this.startTimeinfo = "";
      this.endTimeinfo = "";
      this.checked = false;
      this.repetitionvalue = "不重复";
      this.taksTplRepetitionPeriod = {
        repetitionPeriod: null
      };
      this.plusstartTimeinfovalue = "-";
      this.plusstartinput = 5;
      this.naturalstartTimevalue = "工作日";
      this.naturalendTimevalue = "+";
      this.naturalstartTimevalue = "自然日";
      this.plusendinput = 5;
      this.Customdisableis = false;
      this.comonm(response.data);
    },
    // 截止
    // addsonrenwus() {},
    the_alllist(parents) {
      var TaskID = parents.reverse();
      var spans = [];
      for (let i = 0; i < TaskID.length; i++) {
        if (TaskID[i].name.length >= 9) {
          TaskID[i].isname = TaskID[i].name.substring(0, 9) + "...";
        } else {
          TaskID[i].isname = TaskID[i].name;
        }
        spans.push(TaskID[i]);
      }
      if (spans.length > 3) {
        var isarr = [
          {
            isname: "...",
            id: "999999999"
          }
        ];
        this.spans = isarr.concat(
          spans
            .reverse()
            .slice(0, 3)
            .reverse()
        );
        var oldArr = parents;
        this.TaskIDarr = oldArr.splice(0, oldArr.length - 3);
      } else {
        this.spans = spans;
        this.TaskIDarr = parents;
      }
    },
    the_all(item) {
      window.closeUploadDialog && window.closeUploadDialog();
      // console.log('the_all')
      this.forbidden(item);
      if (item.id == "999999999") {
        this.iscenetrs = true;
      } else {
        var data = {
          token: this.token,
          userId: this.userId,
          data: {
            id: item.id
          }
        };
        var _this = this;
        this.$post("/info/task/isLookTask", data)
          .then(response => {
            if (response.code == 0) {
              _this.gx(item);
              _this.iscenetrs = false;
            } else {
              _this.$message({
                type: "error",
                message: response.msg
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    the_alls() {
      this.iscenetrs = false;
    },
    changezirwu() {
      this.inputadd = "";
    },
    htmls2(val) {
      this.html2s = val;
      console.log(val);
    },
    htmls(val) {
      this.msgs = val;
      console.log(this.msgs);
    },
    tasksDeleteskq(item) {
      this.checkPower();
      // /info/task/openOneTask
      this.$confirm("是否打开[" + item.name + "]", "是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var data = {
            token: this.token,
            userId: this.userId,
            data: {
              id: item.id
            }
          };
          var _this = this;
          this.$post("/info/task/openOneTask", data)
            .then(response => {
              if (response.code == 0) {
                _this.$message({
                  message: response.msg,
                  type: "success"
                });
                _this.sByid(item);
              } else {
                _this.$message({
                  message: response.msg,
                  type: "warning"
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消关闭"
          });
        });
    },
    // info/task/getTaskDetailsByid
    sByid(item) {
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          id: this.mbids
        }
      };
      console.log(data);
      var _this = this;
      this.$post("info/task/getTaskDetailsByid", data)
        .then(response => {
          _this.childrenss = response.data.childrens;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    executorss(item) {
      var arrs = this.executors;
      for (let j = 0; j < arrs.length; j++) {
        if (item.userId == arrs[j].userId) {
          arrs.splice(j, 1);
        }
      }
      this.executors = arrs;
    },
    ccpeopless(item) {
      console.log(item.userId);
      // var arr = win
      var arrs = this.ccpeoples;
      for (let j = 0; j < arrs.length; j++) {
        if (item.userId == arrs[j].userId) {
          arrs.splice(j, 1);
        }
      }
      this.ccpeoples = arrs;
    },
    flagdetailqc(oldArr) {
      // console.log(oldArr);
      var allArr = [];
      for (var i = 0; i < oldArr.length; i++) {
        var flag = true;
        for (var j = 0; j < allArr.length; j++) {
          if (oldArr[i].userId == allArr[j].userId) {
            flag = false;
          }
        }
        if (flag) {
          allArr.push(oldArr[i]);
        }
      }
      return allArr;
    },
    zirwy(item) {
      console.log(item)
      window.closeUploadDialog && window.closeUploadDialog();
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          id: item.id
        }
      };
      var _this = this;
      this.$post("/info/task/isLookTask", data)
        .then(response => {
          if (response.code == 0) {
            if (_this.createById == _this.$store.getters.userId) {
              this.forbiddenis == 4 ? _this.gx(item) : _this.bc(item);
            } else {
              _this.gx(item);
            }
            _this.rightName = "one";
          } else {
            _this.$message({
              type: "error",
              message: response.msg
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    bc(item) {
      var variableId;
      var startOperator,
        startDayNum,
        startDayType,
        endOperator,
        endDayNum,
        endDayType;
      if (!this.checked) {
        startOperator = "";
        startDayNum = "";
        startDayType = "";
        endOperator = "";
        endDayNum = "";
        endDayType = "";
      } else {
        if (typeof this.definedtimealue != "number" && this.variableId == "") {
          this.$message({
            type: "error",
            message: "请选择时间变量"
          });
          return;
        }
        if (this.plusstartinput == "" || this.plusendinput == "") {
          this.$message.error("请输入数字");
          return;
        }
        if (typeof this.definedtimealue != "string") {
          variableId = this.definedtime[this.definedtimealue].id;
        } else {
          variableId = this.variableId == "" ? variableId : this.variableId;
        }
        variableId = this.variableId == "" ? variableId : this.variableId;
        (startDayNum = this.plusstartTimeinfovalue + this.plusstartinput),
          (startDayType = this.naturalstartTimevalue == "工作日" ? 1 : 0);
        (endDayNum = this.naturalendTimevalue + this.plusendinput),
          (endDayType = this.plusstendinfovalue == "自然日" ? 0 : 1);
      }
      if (this.name == "") {
        this.$message({
          message: "请填写完整",
          type: "warning"
        });
        return;
      }
      var contactList = [];
      this.infoArr.map(ele => {
        contactList.push(ele.id);
      });
      if (
        (this.startTimeinfo && !this.endTimeinfo) ||
        (!this.startTimeinfo && this.endTimeinfo)
      ) {
        this.$message.error("请填写完整的时间");
        return;
      }
      if (this.startTimeinfo != "" && this.startTimeinfo != null) {
        var datestr = new Date(
          this.startTimeinfo.replace(new RegExp(/-/gm), "/")
        ).getTime();
        var endstr = new Date(
          this.endTimeinfo.replace(new RegExp(/-/gm), "/")
        ).getTime();
        if (endstr < datestr) {
          this.$message.error("开始时间不能大于结束时间");
          return;
        }
      }
      if (this.value12 == "普通" || this.value12 == 0) {
        this.label12 = 0;
      } else if (this.value12 == "紧急" || this.value12 == 1) {
        this.label12 = 1;
      } else {
        this.label12 = 2;
      }
      var arr = this.checkedCities;
      var ges,
        arrs = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == "站内信") {
          ges = 0;
        } else if (arr[i] == "邮件") {
          ges = 1;
        } else {
          ges = 2;
        }
        arrs.push(ges);
      }
      var zrx = [];
      if (this.executors != undefined || this.executors != []) {
        var axrarr = this.executors;
        for (let i = 0; i < axrarr.length; i++) {
          zrx.push({ userId: axrarr[i].userId });
        }
      }
      var crs = [];
      if (this.ccpeoples != undefined || this.executors != []) {
        var crsarr = this.ccpeoples;
        for (let i = 0; i < crsarr.length; i++) {
          crs.push({ userId: crsarr[i].userId });
        }
      }

      var startTimeinfo, endTimeinfo;
      if (this.startTimeinfo && this.endTimeinfo) {
        startTimeinfo = this.gettime(this.startTimeinfo);
        endTimeinfo = this.gettime(this.endTimeinfo);
      } else {
        startTimeinfo = "";
        endTimeinfo = "";
      }
      if (this.remindTypes != 0) {
        if (arrs == "") {
          arrs = [];
          this.remindTypes = 0;
        }
      }
      if (this.taksTplRepetitionPeriod != null) {
        this.taksTplRepetitionPeriod.repetitionDate =
          this.startTimeinfo == "" || this.startTimeinfo == null
            ? ""
            : this.gettime(this.startTimeinfo);
        if (this.taksTplRepetitionPeriod.repetitionPeriod == null) {
          this.taksTplRepetitionPeriod = null;
        }
      }
      if (
        this.Editthe.taskTplRepetitionPeriod != null &&
        this.variableId == ""
      ) {
        console.log(this.Editthe.taskTplRepetitionPeriod);
        this.taksTplRepetitionPeriod.id = this.Editthe.taskTplRepetitionPeriod.id;
        this.taksTplRepetitionPeriod.taskId = this.Editthe.taskTplRepetitionPeriod.taskId;
      }
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          projectId: this.$store.state.projectMsg.pro_id,
          // implementStageId: this.ids.implementStageId,
          implementStageId: this.implementStageIdins,
          id: this.mbids,
          content: this.html2s,
          remindVay: arrs.join(","),
          remindType: this.remindTypes,
          endTime: endTimeinfo,
          name: this.name,
          priority: this.label12,
          startTime: startTimeinfo,
          remindIssuerSet: contactList,
          taskCopyer: crs,
          taskExecutors: zrx,
          notice: this.msgs,
          remindIssuer: this.Remind ? 1 : 0,
          customized: this.checked ? 1 : 0,
          variableId: variableId,
          // this.definedtimealue == ""
          //   ? ""
          //   : this.definedtime[this.definedtimealue].id, //"时间变量表id",,
          startDayNum: startDayNum, //"开始天数（正/负数）",
          startDayType: startDayType, //"开始时间的类型（0/1：自然日/工作日）",
          endDayNum: endDayNum, //"结束天数（正/负数）",
          endDayType: startDayType, // "结束时间的类型（0/1：自然日/工作日）"
          taskRepetitionPeriod: this.taksTplRepetitionPeriod
        }
      };
      var _this = this;
      this.$post("/info/task/updateTask", data)
        .then(response => {
          if (response.code == 0) {
            _this.executors = [];
            _this.ccpeoples = [];
            _this.rightName = "one";
            _this.startTimeinfo = "";
            _this.endTimeinfo = "";
            _this.changes = { state: 1 };
            _this.gx(item);
            _this.html2 = "";
            _this.msgs = "";
            var state = { state: 2 };
            _this.$store.commit("isref", state);
          } else if (response.code == -5115) {
            _this.routeinfo();
          } else {
            _this.$message({
              type: "error",
              message: response.msg
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    gx(item) {
      this.rightName = "one";
      this.infoArr = [];
      this.Remind = false;
      this.txdisabled = true;
      this.isShowRemind = false;
      this.Editthe = item;
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          id: item.id
        }
      };
      this.mbids = item.id;
      var _this = this;
      this.$post("/info/task/getTaskDetailsByid", data)
        .then(response => {
          this.forbidden(response.data);
          this.flagdetaildatasModify1 = response.data;
          _this.the_alllist(response.data.parents);
          _this.createById = response.data.createBy;
          _this.implementStageIdins = response.data.implementStageId;
          _this.name = response.data.name;
          _this.executor = _this.flagdetailqc(response.data.taskExecutors);
          _this.ccpeople = _this.flagdetailqc(response.data.taskCopyer);
          if (response.data.startTime != null) {
            this.startTimeinfo = response.data.startTime;
            this.endTimeinfo = response.data.endTime;
          } else {
            this.startTimeinfo = "";
            this.endTimeinfo = "";
          }
          if (
            response.data.remindType == 0 ||
            response.data.remindType == null
          ) {
            _this.remindType = "不提醒";
            _this.remindTypes = 0;
          } else if (response.data.remindType == 1) {
            _this.remindType = "截至前15分钟";
            _this.remindTypes = 1;
          } else if (response.data.remindType == 2) {
            _this.remindType = "截至前1小时";
            _this.remindTypes = 2;
          } else if (response.data.remindType == 3) {
            _this.remindType = "截至前3小时";
            _this.remindTypes = 3;
          } else if (response.data.remindType == 4) {
            _this.remindType = "截至前1天";
            _this.remindTypes = 4;
          } else if (response.data.remindType == 5) {
            _this.remindType = "开始前一天";
            _this.remindTypes = 5;
          } else if (response.data.remindType == 6) {
            _this.remindType = "开始时";
            _this.remindTypes = 6;
          } else if (response.data.remindType == 7) {
            _this.remindType = "完成时";
            _this.remindTypes = 7;
          }
          if (response.data.priority == 0) {
            _this.label12 = 0;
            _this.value12 = "普通";
          } else if (response.data.priority == 1) {
            _this.label12 = 1;
            _this.value12 = "紧急";
          } else {
            _this.label12 = 2;
            _this.value12 = "非常紧急";
          }
          if (response.data.notice != null) {
            _this.msg = response.data.notice;
            _this.msgs = response.data.notice;
          } else {
            _this.msg = "";
            _this.msgs = "";
          }
          if (response.data.content == null) {
            _this.html2 = "";
            _this.html2s = "";
          } else {
            _this.html2 = response.data.content;
            _this.html2s = response.data.content;
          }
          _this.childrenss = response.data.childrens;
          if (
            response.data.remindVay == null ||
            response.data.remindVay == ""
          ) {
            this.checkedCities = ["站内信"];
          } else {
            var arr = response.data.remindVay.split(",");
            for (let i = 0; i < arr.length; i++) {
              if (arr[i] == 0) {
                arr[i] = "站内信";
              } else if (arr[i] == 2) {
                arr[i] = "短信";
              } else {
                arr[i] = "邮件";
              }
            }
            this.checkedCities = arr;
            this.isShowRemind = true;
          }
          this.seldata(response);
          if (
            (this.repetitionvalue == "不重复" || this.repetitionvalue == 0) &&
            (response.data.remindType == 0 || response.data.remindVay == null)
          ) {
            this.isShowRemind = false;
          } else {
            this.isShowRemind = true;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    statesbox(val) {
      this.flag = false;
      var arr = val;
      var arrs = [];
      var arrid = [];
      for (let i = 0; i < arr.length; i++) {
        var dxs = {
          name: arr[i].name
        };
        var dxsid = {
          userId: arr[i].id
        };
        arrs.push(dxs);
        arrid.push(dxsid);
      }
      this.ccpeople = arrs;
      this.taskCopyer = arrid;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    rightClick(tab, event) {
      if (tab.index == 0) {
        this.Empty = { Empty: 0 };
      } else if (tab.index == 1) {
        this.Empty = { Empty: 0 };
        this.$refs.relateChild.listdata(this.mbids);
      } else if (tab.index == 2) {
        this.Empty = { Empty: 0 };
        this.$refs.surveyChild.surveylist(this.mbids);
      } else if (tab.index == 3) {
        this.update = false;
        this.Empty = { Empty: 0 };
        this.$nextTick(() => {
          this.update = true;
          setTimeout(() => {
            this.$refs.associatChild.ajax(this.mbids);
          });
        });
      } else if (tab.index == 4) {
        this.Empty = { Empty: 1 };
        this.$refs.dynaminChild.activelist(this.mbids);
      }
    },
    change(value) {
      console.log("close");
      this.seldatas();
      this.infoArr = [];
      this.executors = [];
      this.ccpeoples = [];
      var listarr = {
        name: this.forbiddenis == 4 ? 2 : 1
      };
      this.remindType = 0;
      this.txfs = false;
      this.$emit("gxbox", listarr);
      this.rightName = "one";
      this.startTimeinfo = "";
      this.endTimeinfo = "";
      this.qkr = { state: 1 };
      this.inputadd = "";
      this.changes = { state: 1 };
      this.iscenetrs = false;
      this.spans = [];
      this.isShowRemind = false;
      this.addnum = 1;
      this.addinfo = true;
      this.frequencyvalue = "天";
      this.radio = "1";
      this.frequencopti = false;
      this.frequenge = false;
      this.frequenz = false;
    },
    dialogFormVisiblebr() {
      this.executors = [];
      this.ccpeoples = [];
      var listarr = {
        name: 1
      };
      this.remindType = 0;
      this.txfs = false;
      this.$emit("gxbox", listarr);
      this.rightName = "one";
    },
    addsonTasks() {
      this.checkPower();
      this.addsonrenwu = true;
    },
    addsonrenwus() {
      console.log(this.ids);
      if (this.inputadd == "") {
        this.$message({
          type: "error",
          message: "任务名称不为空"
        });
        return;
      }
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          projectId: this.$store.state.projectMsg.pro_id,
          implementStageId: this.implementStageIdins,
          parentId: this.mbids,
          name: this.inputadd
        }
      };
      var _this = this;
      this.$post("/info/task/saveTask", data)
        .then(response => {
          if (response.code == 0) {
            _this.addsonrenwu = false;
            _this.$message({
              type: "success",
              message: response.msg
            });
            var listarr = {
              name: 3
            };
            _this.$emit("gxbox", listarr);
            var das = { name: _this.inputadd, id: response.data.id };
            var state = { state: 3 };
            _this.$store.commit("isref", state);
            console.log(das);
            _this.childrenss.push(das);
            _this.inputadd = "";
            this.findUserObj = [];
            this.findUserObjM = [];
          } else {
            _this.$message({
              type: "info",
              message: response.msg
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    htmlmsg() {
      this.msg = "";
    },
    htmlmsg2() {
      this.html2 = "";
    },
    delect(item, index) {
      this.checkPower();
      this.$confirm("确定要删除该" + item.name + "吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var data = {
            token: this.token,
            userId: this.userId,
            data: {
              projectId: this.$store.state.projectMsg.pro_id,
              implementStageId: this.implementStageIdins,
              parentId: this.mbids,
              id: item.id
            }
          };
          console.log(data);
          var _this = this;
          this.$post("/info/task/delOneTask", data)
            .then(response => {
              if (response.code == 0) {
                _this.$message({
                  type: "success",
                  message: response.msg
                });
                var state = { state: 3 };
                _this.$store.commit("isref", state);
                var listarr = {
                  name: 3
                };
                _this.$emit("gxbox", listarr);
                Array.prototype.delete = function(delIndex) {
                  var temArray = [];
                  for (var i = 0; i < this.length; i++) {
                    if (i != delIndex) {
                      temArray.push(this[i]);
                    }
                  }
                  return temArray;
                };
                var arr = _this.childrenss;
                _this.childrenss = arr.delete(index);
              } else {
                _this.$message({
                  type: "info",
                  message: response.msg
                });
              }
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
    edit(item, index) {
      this.checkPower();
      console.log(item);
      this.$prompt("", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: item.name
      })
        .then(({ value }) => {
          if (value == "") {
            this.$message({
              type: "error",
              message: "名称不能为空"
            });
            return;
          }
          var data = {
            token: this.token,
            userId: this.userId,
            data: {
              projectId: this.$store.state.projectMsg.pro_id,
              implementStageId: this.implementStageIdins,
              parentId: this.mbids,
              id: item.id,
              name: value,
              priority: item.priority
            }
          };
          var _this = this;
          this.$post("/info/task/updateTask", data)
            .then(response => {
              if (response.code == 0) {
                _this.$message({
                  type: "success",
                  message: response.msg
                });
                var listarr = {
                  name: 3
                };
                _this.$emit("gxbox", listarr);
                var arr = _this.childrenss;
                for (let i = 0; i < arr.length; i++) {
                  if (index == i) {
                    console.log(arr[i]);
                    arr[i].name = value;
                  }
                }
              } else {
                _this.$message({
                  type: "info",
                  message: response.msg
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    outline(item) {
      this.checkPower();
      this.$confirm("确定要关闭该" + item.name + "吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var data = {
            token: this.token,
            userId: this.userId,
            data: {
              projectId: this.$store.state.projectMsg.pro_id,
              implementStageId: this.implementStageIdins,
              parentId: this.mbids,
              id: item.id
            }
          };
          console.log(data);
          var _this = this;
          this.$post("/info/task/closeOneTask", data)
            .then(response => {
              if (response.code == 0) {
                _this.$message({
                  type: "success",
                  message: response.msg
                });
                var listarr = {
                  name: 3
                };
                _this.$emit("gxbox", listarr);
                _this.sByid(item);
              } else {
                _this.$message({
                  type: "info",
                  message: response.msg
                });
              }
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
    // 确定要删除任务消息提示
    tasksDelete() {
      this.$confirm("确定要删除该任务吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //确定要关闭该任务提示
    tasksClose() {
      this.$confirm("确定要关闭该任务吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "关闭成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消关闭"
          });
        });
    },
    infoClass() {
      (this.form.priority = "普通"), (this.typeshow = "info");
    },
    warningClass() {
      this.form.priority = "紧急";
      this.typeshow = "warning";
    },
    dangerClass() {
      (this.form.priority = "非常紧急"), (this.typeshow = "danger");
    },
    shelterpars() {
      console.log("有没有", this.isTaskUser);
      if (!this.isTaskUser) {
        this.$message.warning("无对应权限，请联系对应项目组负责人处理");
        return;
      }
      this.zxr = 1;
      this.findState = { state: 0 };
      this.checkState = { state: 2 };
      this.executor.forEach(v => {
        v.originData = true;
      });
      let findUserObj = this.executor.concat(this.executors);
      findUserObj.forEach(v => {
        v.uniqueKey = "user" + v.userId;
      });
      this.findUserObj = findUserObj;
      // console.log('执行人', this.executor, this.executors, this.findUserObj, this.findUserObjM)
      this.flags = true;
    },
    shelterGlobal() {
      if (!this.isTaskUser) {
        this.$message.warning("无对应权限，请联系对应项目组负责人处理");
        return;
      }
      this.zxr = 2;
      this.findState = { state: 0 };
      this.checkState = { state: 2 };
      this.ccpeople.forEach(v => {
        v.originData = true;
      });
      let findUserObjM = this.ccpeople.concat(this.ccpeoples);
      findUserObjM.forEach(v => {
        v.uniqueKey = "user" + v.userId;
      });
      this.findUserObjM = findUserObjM;
      // console.log('抄送人', this.ccpeoples, this.ccpeople, this.findUserObjM)
      this.flags = true;
    },
    findAllUser(val) {
      if (!val || !val.length) {
        return;
      }
      if (this.zxr == 1) {
        (this.executor = []), (this.executors = []);
        val.forEach(v => {
          if (v.originData) {
            this.executor.push(v);
          } else {
            this.executors.push(v);
          }
        });
      } else {
        (this.ccpeoples = []), (this.ccpeople = []);
        val.forEach(v => {
          if (v.originData) {
            this.ccpeople.push(v);
          } else {
            this.ccpeoples.push(v);
          }
        });
      }
    },
    gettime(ts) {
      // console.log(ts)
      // console.log(ts.length)
      var ints;
      ints = ts.length == undefined ? ts : ts.replace(new RegExp(/-/gm), "/");
      var date = new Date(ints).getTime();
      var time = new Date(date);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var f = time.getMinutes();
      var s = time.getSeconds();
      var ms;
      if (m < 10) {
        ms = "0" + m;
      } else {
        ms = m;
      }
      var ds;
      if (d < 10) {
        ds = "0" + d;
      } else {
        ds = d;
      }
      var hs;
      if (h < 10) {
        hs = "0" + h;
      } else {
        hs = h;
      }
      var fs;
      if (f < 10) {
        fs = "0" + f;
      } else {
        fs = f;
      }
      var ss;
      if (s < 10) {
        ss = "0" + s;
      } else {
        ss = s;
      }

      var times;
      return (times = y + "-" + ms + "-" + ds + " " + hs + ":" + fs + ":" + ss);
    },
    saveTasks() {
      var variableId;
      var startOperator,
        startDayNum,
        startDayType,
        endOperator,
        endDayNum,
        endDayType;
      if (!this.checked) {
        startOperator = "";
        startDayNum = "";
        startDayType = "";
        endOperator = "";
        endDayNum = "";
        endDayType = "";
      } else {
        if (typeof this.definedtimealue != "number" && this.variableId == "") {
          this.$message({
            type: "error",
            message: "请选择时间变量"
          });
          return;
        }
        if (this.plusstartinput == "" || this.plusendinput == "") {
          this.$message.error("请输入数字");
          return;
        }
        if (typeof this.definedtimealue != "string") {
          variableId = this.definedtimealue;
        } else {
          variableId = this.variableId == "" ? variableId : this.variableId;
        }
        (startDayNum = this.plusstartTimeinfovalue + this.plusstartinput),
          (startDayType = this.naturalstartTimevalue == "工作日" ? 1 : 0);
        (endDayNum = this.naturalendTimevalue + this.plusendinput),
          (endDayType = this.plusstendinfovalue == "自然日" ? 0 : 1);
      }
      if (this.name == "") {
        this.$message({
          message: "请填写完整",
          type: "warning"
        });
        return;
      }
      if (
        (this.startTimeinfo && !this.endTimeinfo) ||
        (!this.startTimeinfo && this.endTimeinfo)
      ) {
        this.$message.error("请填写完整的时间");
        return;
      }
      if (this.startTimeinfo != "" && this.startTimeinfo != null) {
        var datestr = new Date(
          this.startTimeinfo.replace(new RegExp(/-/gm), "/")
        ).getTime();
        var endstr = new Date(
          this.endTimeinfo.replace(new RegExp(/-/gm), "/")
        ).getTime();
        if (endstr < datestr) {
          this.$message.error("开始时间不能大于结束时间");
          return;
        }
      }

      if (this.value12 == "普通" || this.value12 == 0) {
        this.label12 = 0;
      } else if (this.value12 == "紧急" || this.value12 == 1) {
        this.label12 = 1;
      } else {
        this.label12 = 2;
      }
      var ges,
        arrs = [];
      var arr = this.checkedCities;
      var ges,
        arrs = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == "站内信") {
          ges = 0;
        } else if (arr[i] == "邮件") {
          ges = 1;
        } else {
          ges = 2;
        }
        arrs.push(ges);
      }
      var zrx = [];
      if (this.executors != undefined || this.executors != []) {
        var axrarr = this.executors;
        for (let i = 0; i < axrarr.length; i++) {
          zrx.push({ userId: axrarr[i].userId });
        }
      }
      var crs = [];
      if (this.ccpeoples != undefined || this.executors != []) {
        var crsarr = this.ccpeoples;
        for (let i = 0; i < crsarr.length; i++) {
          crs.push({ userId: crsarr[i].userId });
        }
      }
      var startTimeinfo, endTimeinfo;
      if (this.startTimeinfo && this.endTimeinfo) {
        startTimeinfo = this.gettime(this.startTimeinfo);
        endTimeinfo = this.gettime(this.endTimeinfo);
      } else {
        startTimeinfo = "";
        endTimeinfo = "";
      }
      if (this.remindTypes != 0) {
        if (arrs == "") {
          arrs = [];
          this.remindTypes = 0;
        }
      }
      // if (crs != "" || zrx != "") {
      //   if (startTimeinfo == "" && endTimeinfo == "") {
      //     this.$message.error("时间不能为空");
      //     return;
      //   }
      // }
      var contactList = [];
      this.infoArr.map(ele => {
        contactList.push(ele.id);
      });
      if (
        this.Editthe.taskTplRepetitionPeriod != null &&
        this.variableId == ""
      ) {
        this.taksTplRepetitionPeriod.id = this.Editthe.taskTplRepetitionPeriod.id;
        this.taksTplRepetitionPeriod.taskId = this.Editthe.taskTplRepetitionPeriod.taskId;
      }
      if (this.taksTplRepetitionPeriod != null) {
        this.taksTplRepetitionPeriod.repetitionDate =
          this.startTimeinfo == "" || this.startTimeinfo == null
            ? ""
            : this.gettime(this.startTimeinfo);
        if (this.taksTplRepetitionPeriod.repetitionPeriod == null) {
          this.taksTplRepetitionPeriod = null;
        }
      }
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          projectId: this.$store.state.projectMsg.pro_id,
          implementStageId: this.implementStageIdins,
          id: this.mbids,
          content: this.html2s,
          remindVay: arrs.join(","),
          remindType: this.remindTypes,
          endTime: endTimeinfo,
          name: this.name,
          priority: this.label12,
          startTime: startTimeinfo,
          taskCopyer: crs,
          remindIssuerSet: contactList,
          taskExecutors: zrx,
          remindIssuer: this.Remind ? 1 : 0,
          notice: this.msgs,
          customized: this.checked ? 1 : 0,
          variableId: variableId,
          startDayNum: startDayNum, //"开始天数（正/负数）",
          startDayType: startDayType, //"开始时间的类型（0/1：自然日/工作日）",
          endDayNum: endDayNum, //"结束天数（正/负数）",
          endDayType: startDayType, // "结束时间的类型（0/1：自然日/工作日）"
          taskRepetitionPeriod: this.taksTplRepetitionPeriod
        }
      };
      var _this = this;
      this.$post("/info/task/updateTask", data)
        .then(response => {
          if (response.code == 0) {
            _this.$message({
              type: "success",
              message: response.msg
            });
            _this.executors = [];
            _this.ccpeoples = [];
            _this.rightName = "one";
            _this.startTimeinfo = "";
            _this.endTimeinfo = "";
            var listarr = {
              name: 2
            };
            _this.$emit("gxbox", listarr);
            _this.html2 = "";
            _this.msgs = "";
            var state = { state: 2 };
            _this.$store.commit("isref", state);
          } else if (response.code == -5115) {
            _this.routeinfo();
          } else {
            _this.$message({
              type: "info",
              message: response.msg
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="scss">
#taskinfossssss .el-dialog__header {
  border-bottom: 1px solid #e8e8e8 !important;
}
#taskinfossssss {
  .el-dialog__body {
    padding: 16px 20px;
  }
  .attentionMatters {
    .edit_container {
      width: 460px;
      height: 580px;
    }
    .text {
      height: 532px;
    }
  }
  .custom-time .el-checkbox__label {
    padding-left: 2px;
  }
  .el-tabs__nav-wrap::after {
    width: 458px;
  }
}
</style>
<style scoped lang="scss">
.front-add-left-content {
  height: 660px;
  border-right: 1px solid rgb(232, 232, 232);
  text-align: left;
  width: 572px;
  margin-left: -21px;
  overflow: auto;
  .el-form-item {
    padding-top: 16px;
    padding-bottom: 0;
    margin-top: 0;
    margin-bottom: 0;
  }
}
.sele-person-btn.el-form-item {
  padding-top: 4px;
}
.attentionMatters {
  height: 560px;
}
.setbox {
  text-align: left;
  margin-left: 42px;
  // margin-top: -34px;
  margin-bottom: 15px;
}
.notclick {
  pointer-events: none;
}
.earthquakenotclick {
  pointer-events: none;
  width: 600px;
  margin-left: -42px;
  .block {
    width: 300px;
    float: left;
  }
}
//开始
.earthquake {
  width: 600px;
  margin-left: -42px;
  .block {
    width: 294px;
    float: left;
  }
}
.customtime {
  margin-top: 16px;
  // margin-left: -69px;
}
.custom {
  clear: both;
}
.seletime {
  margin-left: 80px;
  margin-top: 9px;
  // margin-bottom: 10px;
}
.drept {
  margin-top: -8px;
}
.dreptto {
  margin-top: 53px;
  li {
    height: 46px;
    left: left;
    margin-left: 3px;
  }
}
.weektime {
  width: 29px;
  height: 29px;
  overflow: hidden;
  background: #f5f5f5;
  text-align: center;
  line-height: 25px;
  border-radius: 16px;
  cursor: pointer;
  float: left;
  margin-left: 7px;
  color: black;
}
.weektime:hover {
  background: #ebeef5;
}
//截止
@import "../../../common/css/sheltersright.css";
.el-form-item__content .shelterPers,
.el-form-item__content .shekterAdd {
  position: relative;
  top: 7px;
  margin-right: 10px;
  cursor: pointer;
}
.el-tag {
  padding: 0 10px;
  height: 32px;
  line-height: 30px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  white-space: nowrap;
  /* padding-left: 8px; */
  margin-left: 8px;
}
.el-range-editor.el-input__inner {
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 3px 10px;
  width: 400px;
}
.el-form-item__label {
  text-align: left;
}

.baseMessage {
  display: inline-block;
  margin-bottom: 10px;
  font-weight: bold;
}
.task-base-message .el-textarea__inner {
  width: 90%;
}
.sonShelters {
  width: 463px;
  height: auto;
  border: 1px solid #d9d9d9;
  background-color: #fff;
  border-radius: 4px;
  padding: 5px;
}
.sonShelters .el-checkbox__label {
  width: 94%;
}
.sonShelters .sonShelDiv {
  position: relative;
  top: 8px;
  width: 47%;
}
.sonShelters .sonShelDiv img {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}
.sonShelters .sonShelDiv span:nth-child(2) {
  width: 68%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sonShelters .sonShelDiv i {
}
.sonShelters .sonShelDiv span:nth-child(4) {
  margin-right: 12px;
}

.sonShelters .sonRightDiv .el-date-editor.el-input {
  width: 135px;
}
.sonShelters .sonRightDiv .el-date-editor.el-input .el-input__inner {
  border: 0px;
}

.addSonShelter {
  font-size: 14px;
}
/* 右边的样式 */
.rightShelter {
  margin-left: 20px;
}
.sonShelters {
  width: 394px;
  height: auto;
  border: 1px solid #d9d9d9;
  background-color: #fff;
  border-radius: 4px;
  padding: 5px;
}
.sonShelters.clearFix::before {
  display: inline;
}
.TaskID {
  width: 100%;
  position: relative;
  margin-bottom: 10px;
  .top {
    width: 100%;
    text-align: left;
    h3 {
      display: inline-block;
      font-size: 14px;
      margin-left: -7px;
    }
    p {
      display: inline-block;
      width: 90%;
      span {
        display: inline-block;
        cursor: pointer;
      }
      span:hover {
        color: #409eff;
      }
    }
  }
  .iscenetr {
    position: absolute;
    text-align: left;
    width: 299px;
    height: 93px;
    box-shadow: 1px 1px 3px #888888;
    padding: 4px;
    z-index: 9999999;
    background: white;
    border-radius: 3px;
    top: 25px;
    li {
      height: 30px;
      line-height: 30px;
      border-bottom: 1px solid rgba(231, 231, 231, 1);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      .el-button--text {
        color: #333333;
      }
      .el-button {
        display: inline-block;
        line-height: 0;
      }
    }
    li:hover {
      background: rgba(243, 243, 243, 1);
    }
  }
}
.footer-box {
  margin-right: 100px;
  text-align: right;
}
</style>
