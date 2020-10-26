<template>
  <div class="tasks" ref="tasks" style="overflow: hidden;overflow-x: auto;height: 780px;">
    <div>
      <div
        class="tasksContent clearfix;"
        style="margin-top: 21px;white-space: nowrap;text-align: left;"
      >
        <p style="text-align: left;padding-left: 6px;margin-top: -11px;">
          <el-button size="mini" v-if="pzmbis" @click="pzhi">配置模板</el-button>
          <el-button size="mini" :title="restore?'还原重置前顺序':'恢复看板初始顺序'" @click="replacementli">
            <span>{{restore?'还原':'重置'}}</span>
          </el-button>
        </p>
        <ul
          class="phase_task fls"
          style="width: 360px;position: relative"
          v-for="(item,index)  in listData"
          :key="index"
        >
          <div class="phaseTiele clearfix">
            <h4 class="fl">
              <span
                :title="item.stageName"
                style="float: left;max-width: 170px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis"
              >{{item.stageName}}</span>
              <span></span>
              <span>({{item.taskCount}})</span>
              <span v-if="item.underway" style="float: right;margin-left: 8px;margin-top: 3px;">
                <el-rate v-model="valuex" disabled text-color="#ff9900"></el-rate>
              </span>
            </h4>
            <p class="fr">
              <i style="margin-right: -13px;">
                <div class="taskMenu">
                  <el-popover placement="bottom" width="133px" trigger="click">
                    <el-dropdown-item @click.native="primarys(item,1)">
                      <span v-if="$utils.checkProjectPermission('project_task_del')">
                        <i class="el-icon-delete" style="margin-right:5px"></i>将本列表所有任务删除
                      </span>
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="primaryss(item,1)">
                      <span v-if="$utils.checkProjectPermission('project_task_close')">
                        <i class="el-icon-circle-close-outline" style="margin-right:5px"></i>关闭任务
                      </span>
                    </el-dropdown-item>
                    <div v-show="chosepract" class="practitioners">
                      <div class="paracFist">
                        <i class="el-icon-arrow-left" @click="closeMenu"></i>
                        <span>选择执行者</span>
                      </div>
                      <div class="paracSecond">
                        <el-input placeholder="请输入内容">
                          <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                        <p>
                          <img src="../../../../assets/image/user.png" alt />
                          <span>待认领</span>
                        </p>
                        <p>
                          <img src="../../../../assets/image/user.png" alt />
                          <span>人员姓名</span>
                        </p>
                        <p>
                          <img src="../../../../assets/image/user.png" alt />
                          <span>人员姓名</span>
                        </p>
                      </div>
                      <el-button type="primary" class="sure">确认</el-button>
                    </div>
                    <div v-show="endtimes" class="practitioners">
                      <div class="paracFist">
                        <i class="el-icon-arrow-left" @click="closeMenu"></i>
                        <span>选择执行者</span>
                      </div>
                      <div class="paracSecond">
                        <el-date-picker
                          v-model="valueendtime"
                          type="date"
                          placeholder="选择日期"
                          @focus="$utils.handleTimeFocus"
                        ></el-date-picker>
                      </div>
                      <el-button type="primary" class="sure">确认</el-button>
                    </div>
                    <i
                      class="el-icon-setting"
                      style="margin-right: 10px;font-size: 18px;color: #919191;"
                      slot="reference"
                    ></i>
                  </el-popover>
                </div>
              </i>
            </p>
          </div>
          <div
            ref="refgd"
            class="idclassinfo"
            v-loadmore:[item]="loadmoretask"
            style="margin-top: -10px;position: relative"
          >
            <Container
              group-name="col"
              :drag-handle-selector="infoarrs"
              @drop="(e) => onCardDrop(item.implementStageId, e)"
              @drag-start="dragstart($event)"
              :get-child-payload="getCardPayload(item)"
            >
              <Draggable v-for="(items,indexes) in item.data" :key="indexes">
                <li class="phaseContent" style="width: 360px;cursor:pointer">
                  <div
                    style="width: 360px;background: rgb(255, 255, 255);width: 360px;opacity: 0.6;"
                    v-if="items.status == 4"
                  >
                        <!-- <span
                          style="background: #919191"
                          class="hoverChange"
                          v-if="items.priority == 0"
                        ></span>
                        <span
                          style="background: #ffc53d"
                          class="hoverChange"
                          v-else-if="items.priority == 1"
                        ></span>
                        <span
                          style="background:#ff4d4f"
                          class="hoverChange"
                          v-else-if="items.priority == 2"
                        ></span> -->
                    <span style="background:#ffc53d" class="hoverChange" v-if="items.priority == 1"></span>
                    <span style="background:#ff4d4f" class="hoverChange" v-else-if="items.priority == 2"></span>
                    <span style="background:#919191" class="hoverChange" v-else></span>
                    <div class="phaseDiv clearfix">
                      <div v-if="items.status == 4" style="padding-top: 0px;;margin-top: 9px;">
                        <!-- <input  style="vertical-align:middle;margin-right: 5px;width: 15px;height: 15px;" type="checkbox" checked @change="popovers($event,items,indexes)"> -->
                        <el-checkbox v-model="items.checked" @change="popovers($event,items,indexes)"></el-checkbox>
                        <el-button type="text" @click="flagdetails(items,item)">
                          <span class="ellipsis1 task-name delete-line" :title="items.name">{{items.name}}</span>
                        </el-button>

                                <!--  <span>
                          <el-button  @click="flagdetails(items,item)" type="text">
                            <div class="classA">
                            <a href="javascript:void(0)" style="color: #a6a6a6;font-size: 14px;font-weight: bold;text-decoration-line: line-through;" :title="items.name">
                            {{items.name}}
                            </a>
                            </div>
                            </el-button>
                                </span>-->
                      </div>
                      <div
                        @mouseover="cxnames(items,$event)"
                        :title="namest"
                        v-if="items.parentId > 0"
                        style="float: right;margin-top: -27px; margin-right: 25px;">
                        <img style="width: 12px;" src="../../../../assets/login/qizi@2x.png" alt />
                      </div>
                      <i class="fr" alt style="float: right;margin-top: -27px;margin-right: -10px;">
                        <el-dropdown trigger.stop="click">
                          <span class="el-dropdown-link">
                            <i style="color:#bfbfbf" class="taskUser el-icon-more"></i>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-if="indexes == 0" disabled>
                              <span>
                                <span>
                                  <i class="el-icon-upload2" style="margin-right:5px"></i>置顶
                                </span>
                              </span>
                            </el-dropdown-item>
                            <el-dropdown-item v-else @click.native="Stick(item,index,indexes)">
                              <span>
                                <span>
                                  <i class="el-icon-upload2" style="margin-right:5px"></i>置顶
                                </span>
                              </span>
                            </el-dropdown-item>
                            <el-dropdown-item @click.native="tasksDelete(items,2)">
                              <span v-if="$utils.checkProjectPermission('project_task_del')">
                                <i class="el-icon-delete" style="margin-right:5px"></i>删除任务
                              </span>
                            </el-dropdown-item>
                            <el-dropdown-item
                              @click.native="tasksDeleteskq(items,2)"
                              v-if="items.closeFlag == 1"
                            >
                              <span>
                                <i class="el-icon-circle-check" style="margin-right:5px"></i>打开任务
                              </span>
                            </el-dropdown-item>
                            <el-dropdown-item v-else @click.native="tasksDeletes(items,2)">
                              <span v-if="$utils.checkProjectPermission('project_task_close')">
                                <i class="el-icon-circle-close" style="margin-right:5px"></i>关闭任务
                              </span>
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </i>
                      <div @click="flagdetails(items,item)" style="margin-top: -18px;">
                        <p
                          style="margin-top: -5px;"
                          v-if="items.startTimeStr != '' && items.startTimeStr != null">
                          <el-button type="text" style="text-align: left;">
                            <span>
                              <el-button type="text">
                                <span style="color: #a6a6a6;">{{items.startTimeStr | filtertime}}-</span>
                              </el-button>
                            </span>
                            <span v-if="items.endTimeStr == null"></span>
                            <span v-else>
                              <el-button type="text">
                                <span style="color: #a6a6a6;">{{items.endTimeStr | filtertime}}</span>
                              </el-button>
                            </span>
                            <div
                              v-if="items.endTimeStr == null"
                              style="line-height: 43px;margin-top: 14px;margin-bottom: -7px;"
                            >
                              <span v-if="items.overdue == 1" class="colose">已逾期</span>
                              <span
                                v-if="items.closeFlag == 1"
                                style="background:#bfbfbf;margin-left: 8px;"
                                class="colose"
                              >已关闭</span>
                            </div>
                            <div v-else style="line-height: 43px;margin-top: -9px;">
                              <span v-if="items.overdue == 1" class="colose">已逾期</span>
                              <span
                                v-if="items.closeFlag == 1"
                                style="background:#bfbfbf;margin-left: 8px;"
                                class="colose"
                              >已关闭</span>
                            </div>
                          </el-button>
                        </p>
                        <p style="margin-top: -13px;padding-bottom: 5px;">
                          <el-button style="text-align: left;" type="text">
                            <span style="color: #a6a6a6;font-size: 14px;">{{items.createByName}}(创建)</span>
                            <img style="width:3%" src="../../../../assets/image/creats.png" alt />
                            <span v-if="items.executorNum =='' || items.executorNum == 0"></span>
                            <span
                              style="color: #a6a6a6;font-size: 14px;"
                              v-else
                            >{{items.executorName}}(执行人)等{{items.executorNum}}人</span>
                          </el-button>
                        </p>
                        <p
                          v-if="items.status == 2 || items.status == 3 ||items.status == 4"
                          style="padding-bottom: 5px;margin-top: -15px;">
                          <span>
                            <el-button type="text" style="text-align: left;">
                              <i style="color: #a6a6a6;font-size: 14px;">{{items.completeNum}}</i>
                            </el-button>
                          </span>
                          /
                          <span style="margin-right: 0px;">
                            <el-button type="text" style="text-align: left;">
                              <span style="color: #a6a6a6;font-size: 14px;">{{items.executorNum}}</span>
                              <span style="color: #a6a6a6;font-size: 14px;">已完成</span>
                            </el-button>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                        <!-- <span
                          style="background: #919191"
                          class="hoverChange"
                          v-if="items.priority == 0"
                        ></span>
                        <span
                          style="background: #ffc53d"
                          class="hoverChange"
                          v-if="items.priority == 1"
                        ></span> -->
                    <span style="background:#ffc53d" class="hoverChange" v-if="items.priority == 1"></span>
                    <span style="background:#ff4d4f" class="hoverChange" v-else-if="items.priority == 2"></span>
                    <span style="background:#919191" class="hoverChange" v-else></span>
                    <div class="phaseDiv clearfix">
                      <div v-if="items.status == 4" style="padding-top: 0px;">
                        <el-checkbox v-model="items.checked" @change="popovers($event,items,indexes)"></el-checkbox>
                        <el-button type="text" @click="flagdetails(items,item)">
                          <span class="ellipsis1 task-name" :title="items.name">{{items.name}}</span>
                        </el-button>

                                <!-- <input   style="vertical-align:middle;margin-right: 5px;width: 15px;height: 15px;" type="checkbox" checked @change="popovers($event,items,indexes)"> -->
                                <!-- <span @click="flagdetails(items,item)"><el-button type="text">  <span style="color: #333333;font-size: 14px;font-weight: bold;">
                            <div class="classA"><a href="javascript:void(0)" :title="items.name">{{items.name}}</a></div>
                                </span></el-button></span>-->
                      </div>
                      <div v-else style="padding-top: 6px;">
                        <el-checkbox v-model="items.selected" @change="popovers($event,items,indexes)"></el-checkbox>
                        <el-button type="text" @click="flagdetails(items,item)">
                          <span class="ellipsis1 task-name" :title="items.name">{{items.name}}</span>
                        </el-button>

                                <!-- <input  style="vertical-align:middle;margin-right: 5px;width: 15px;height: 15px;" type="checkbox" @change="popovers($event,items,indexes)">
                          <span><el-button @click="flagdetails(items,item)" type="text">
                            <span style="color: #333333;font-size: 14px;font-weight: bold;">
                                <div class="classA"><a href="javascript:void(0)" :title="items.name">{{items.name}}</a></div>
                                </span></el-button></span>-->
                      </div>
                      <div
                        @mouseover.stop="cxnames(items,$event)"
                        :title="namest"
                        v-if="items.parentId > 0"
                        style="float: right;margin-top: -27px; margin-right: 25px;">
                        <img style="width: 12px;" src="../../../../assets/login/qizi@2x.png" alt />
                      </div>
                      <i
                        class="fr"
                        alt
                        style="float: right;margin-top: -27px; margin-right: -13px;">
                        <el-dropdown trigger.stop="click">
                          <span class="el-dropdown-link">
                            <i style="color:#bfbfbf" class="taskUser el-icon-more"></i>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-if="indexes == 0" disabled>
                              <span>
                                <i class="el-icon-upload2" style="margin-right:5px"></i>置顶
                              </span>
                            </el-dropdown-item>
                            <el-dropdown-item v-else @click.native="Stick(item,index,indexes)">
                              <span>
                                <i class="el-icon-upload2" style="margin-right:5px"></i>置顶
                              </span>
                            </el-dropdown-item>
                            <el-dropdown-item @click.native="tasksDelete(items,2)">
                              <span v-if="$utils.checkProjectPermission('project_task_del')">
                                <i class="el-icon-delete" style="margin-right:5px"></i>删除任务
                              </span>
                            </el-dropdown-item>
                            <el-dropdown-item
                              @click.native="tasksDeleteskq(items,2)"
                              v-if="items.closeFlag == 1"
                            >
                              <span>
                                <i class="el-icon-circle-check" style="margin-right:5px"></i>打开任务
                              </span>
                            </el-dropdown-item>
                            <el-dropdown-item v-else @click.native="tasksDeletes(items,2)">
                              <span v-if="$utils.checkProjectPermission('project_task_close')">
                                <i class="el-icon-circle-close" style="margin-right:5px"></i>关闭任务
                              </span>
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </i>
                      <div @click="flagdetails(items,item)" style="margin-top: -18px;">
                        <p v-if="items.startTimeStr != null || items.endTimeStr != null">
                          <span>
                            <el-button type="text">{{items.startTimeStr | filtertime}}-</el-button>
                          </span>
                          <span v-if="items.endTimeStr == null"></span>
                          <span v-else>
                            <el-button type="text">{{items.endTimeStr | filtertime}}</el-button>
                          </span>
                        </p>
                        <div
                          v-if="items.endTimeStr == null"
                          style="line-height: 43px;margin-top: 14px;margin-bottom: -7px;">
                          <span v-if="items.overdue == 1" class="colose">已逾期</span>
                          <span
                            v-if="items.closeFlag == 1"
                            style="background:#bfbfbf;margin-left: 8px;"
                            class="colose"
                          >已关闭</span>
                        </div>
                        <div v-else style="line-height: 43px;margin-top: -9px;">
                          <span v-if="items.overdue == 1" class="colose">已逾期</span>
                          <span
                            v-if="items.closeFlag == 1"
                            style="background:#bfbfbf;margin-left: 8px;"
                            class="colose"
                          >已关闭</span>
                        </div>
                        <p
                          v-if="items.startTimeStr == null || items.endTimeStr == null"
                          style="margin-top: 16px;"></p>
                        <p
                          style="margin-top: -4px;padding-bottom: 5px;"
                          v-if="items.endTimeStr != null">
                          <span style="color: #333333;font-size: 14px;">{{items.createByName}}(创建)</span>
                          <img style="width: 3%;" src="../../../../assets/image/creats.png" alt />
                          <span v-if="items.executorNum =='' || items.executorNum == 0"></span>
                          <span style="color: #333333;font-size: 14px;" v-else>{{items.executorName}}(执行人)等{{items.executorNum}}人</span>
                        </p>
                        <p
                          style="margin-top: -4px;padding-bottom: 16px;"
                          v-if="items.endTimeStr == null">
                          <span style="color: #333333;font-size: 14px;">{{items.createByName}}(创建)</span>
                          <img style="width: 3%;" src="../../../../assets/image/creats.png" alt />
                          <span v-if="items.executorNum =='' || items.executorNum == 0"></span>
                          <span style="color: #333333;font-size: 14px;" v-else >{{items.executorName}}(执行人)等{{items.executorNum}}人</span>
                        </p>
                        <p
                          v-if="items.status == 2 || items.status == 3 ||items.status == 4"
                          style="padding-bottom: 9px;margin-top: 16px;">
                          <span>
                            <i style="color: #333333;font-size: 14px;">{{items.completeNum}}</i>
                          </span>
                          /
                          <span style="margin-right: 0px;">
                            <span style="color: #333333;font-size: 14px;">{{items.executorNum}}</span>
                            <span style="color: #333333;font-size: 14px;">已完成</span>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </Draggable>
            </Container>
          </div>
          <el-button type="text">
            <li
              class="phaseContent"
              ref="addNode"
              v-if="$utils.checkProjectPermission('project_task_add') && item.data != ''"
              style="margin-top:3px;border: 1px solid #e8e8e8;"
            >
              <div class="phaseDivAdd clearfix;width: 369px;" @click="flagadds(item,index)">
                <el-button type="text" class="color-primary-hover">
                  <div style="width: 357px;height: 30px;margin-left: -28px;">
                    <i style="font-size: 19px;" class="el-icon-plus"></i>
                  </div>
                </el-button>
              </div>
            </li>
            <li
              class="phaseContent"
              ref="addNode"
              v-if="$utils.checkProjectPermission('project_task_add') && item.data == ''"
              style="margin-top: 3px;border: 1px solid #e8e8e8;"
            >
              <div class="phaseDivAdd clearfix;width: 369px;" @click="flagadds(item,index)">
                <el-button class="color-primary-hover" type="text">
                  <div style="width: 357px;height: 30px;margin-left: -28px;">
                    <i style="font-size: 19px;" class="el-icon-plus"></i>
                  </div>
                </el-button>
              </div>
            </li>
          </el-button>
        </ul>
        <!-- </Container> -->
      </div>
      <!-- </Container> -->
      <tasks-detail
        v-if="flagdetail"
        :flagdetail="flagdetail"
        :status="status"
        @update="update"
        :flagdetaildatas="flagdetaildatas"
        :flagdetaildatasModify="flagdetaildatas"
        :ids="ids"
        v-on:gxbox="gxbox"
        v-on:changeWindowedetails="onResultChangedetails($event)"
        :isTaskUser="isTaskUser"
        :isTaskEdit="isTaskEdit"
      ></tasks-detail>

      <!--任务模板预览 :before-close="backBefore"-->
      <el-dialog
        title="任务模板预览"
        :close-on-click-modal="false"
        :visible.sync="previewVisible"
        width="50%"
        @close="backBefore"
      >
        <div class="task_modul task_modules">
          <el-scrollbar style="height:100%;">
            <div class="clearfix modul_box" style="white-space: nowrap;">
              <div class="task_show" v-for="(item,index) in prevObj" :key="index">
                <p class="task_tit">
                  <span>{{item.stageName}}</span>
                  <em>（{{item.taskCount}}）</em>
                </p>
                <ul>
                  <li v-for="(and, index) in item.data" class="task_li" :key="index">
                    <div class="task_li_title">
                      <router-link to="/project_tasks/tasks">
                        <el-checkbox class="task_li_title_check">
                          <span>{{and.name}}</span>
                        </el-checkbox>
                      </router-link>
                      <i class="task_li_title_icon"></i>
                    </div>
                  </li>
                  <li
                    class="task_li"
                    style="text-align: center;height:50px;line-height: 48px;font-size: 18px;font-weight: 600;"
                  >+</li>
                </ul>
              </div>
            </div>
          </el-scrollbar>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="backBefore">{{isCurrentBus?'取 消':'关 闭'}}</el-button>
          <el-button type="primary" @click="viewSubmit" v-if="isCurrentBus">确认配置</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="选择阶段导入"
        left
        :visible.sync="dialogs"
        :close-on-click-modal="false"
        @close="gbdialogs"
        width="500px"
      >
        <p
          style="width: 108.5%;background: #ccc;height: 1px;margin-top: -21px;margin-bottom: 32px;margin-left: -20px;"
        ></p>
        <div id="pcheck">
          <el-scrollbar style="height:100%">
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            >全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <p v-for="city in cities" :key="city.id">
                <el-checkbox :label="city.id" :key="city.id">
                  <span class="ridos">{{city.name}}</span>
                </el-checkbox>
              </p>
            </el-checkbox-group>
          </el-scrollbar>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogs = false">取 消</el-button>
          <el-button type="primary" @click="dialogqd">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="提示"
        :visible.sync="Visibles"
        :close-on-click-modal="false"
        :before-close="handleClose2"
        width="500px">
        <div style="text-align: center">
          <p class="cmmwt" :title="'新导入任务“更新《'+redataname+'”与原有模板任务重名！'">
            新导入任务“更新
            <span>《{{redataname}}》</span> ”与原有模板任务重名！
          </p>
          <span slot="footer" class="dialog-footer">
            <el-button style="margin-right: 70px;" type="primary" @click="zdqc(1)">自动重命名</el-button>
            <el-button @click="zdqc(2)">跳过这个任务</el-button>
          </span>
          <p class="xzks">
            <el-checkbox v-model="checkeds">
              <span class="color-primary">后续同名任务是否按此规则执行</span>
            </el-checkbox>
          </p>
        </div>
      </el-dialog>
      <tasksAdd v-if="flagadd" :flagadd="flagadd" :addnew="addnew" @addgxbox="addgxbox" />
      <index-template
        :visible.sync="innerVisible"
        :source="1"
        @preview="previewFn"
        @confirm="checkTemp"
        ref="seleTemp"
      ></index-template>
    </div>
  </div>
</template>
<script>
let allList = [];
let exportList = []
import tasksAdd from "./addtasksDetail";
import tasksDetail from "./tasksDetail.vue";
import {
  Container,
  Draggable
} from "@/pages/behind/systemconfig/tasksconfig/utils/main";
import {
  applyDrag,
  generateItems
} from "@/pages/behind/systemconfig/tasksconfig/utils/helpers";
// 模板配置
import indexTemplate from "@/components/dialogcommon/indexTemplate";
import axios from 'axios'
export default {
  components: {
    tasksAdd,
    tasksDetail,
    Container,
    Draggable,
    indexTemplate
  },
  data() {
    return {
      dropPlaceholderOptions: {
        className: "drop-preview",
        animationDuration: "150",
        showOnTop: true
      },
      upperDropPlaceholderOptions: {
        className: "cards-drop-preview",
        animationDuration: "150",
        showOnTop: true
      },
      infoarrs: "",
      checkeds: false,
      checkAll: false,
      restore: "",
      startstageId: "",
      indexI: 0,
      endstageId: "",
      checkedCities: [],
      Visibles: false,
      dragAndDrop: { animation: 150 },
      cities: [],
      isIndeterminate: false,
      namejd: "",
      valuex: 1,
      dialogs: false,
      tasksde: true,
      newarros: [],
      apparr: [],
      arrosos: [],
      pzmbis: true,
      newarros2: "",
      newarros3: "",
      standname: "",
      apparrs: "",
      flagdetail3: false,
      flagd: true,
      tites: "任务完成（不可编辑）",
      status: "",
      prevObj: [],
      flagdetailss: false,
      flagdetaildatas: "",
      taskVisible: false,
      seen3: true,
      tjstate: "",
      daor: [],
      tjsdata: "",
      tjsdataarr: [],
      previewVisible: false,
      cxlis: "",
      token: this.$store.state.loginObject.userToken,
      userId: this.$store.state.loginObject.userId,
      mrid: "",
      addnew: "",
      optionszxz2s: [],
      satrttime: "",
      endtime: "",
      svalue1: "",
      standObj: [],
      otherObj: [],
      svaluearr: [],
      placeholders1: "",
      abcd: false,
      //是否显示编辑弹框
      flagdetail: false,
      flagadd: false,
      namest: "",
      redataname: "",
      ccxnames: "",
      inputadd: "",
      financingTopIdis: "",
      financingIdis: "",
      addphasesphase: false,
      hoverShowDivsdiv: false,
      listData: [
        // {
        //     titles:'提交的立项报告中，并进尽调报告附在附件中',
        //     times:'2018.09.10'
        // },
        // {
        //     titles:'提交的立项报告中，并进尽调报告附在附件中',
        //     times:'2018.09.10'
        // }
      ],
      infoClass: false,
      warninClass: false,
      dangerClass: false,
      viewtabs: false,
      inputsearch: "",
      useTplIds: "",
      //看板视图的单选
      radio: "1",
      inputFind: "",
      value1: "",
      activeIndex: "1",
      redata: [],
      activeIndex2: "1",
      checked: true,
      num: 0,
      visible: false,
      //搜索公司名称
      options: [
        {
          value: "HTML",
          label: "HTML"
        },
        {
          value: "CSS",
          label: "CSS"
        },
        {
          value: "JavaScript",
          label: "JavaScript"
        }
      ],
      valuezxr: [],
      valuezxr2: [],
      ids: "",
      menetask: true,
      heightSequence: "",
      replacement: "重置",
      chosepract: false,
      valueendtime: "",
      endtimes: false,
      // imgs:require('../../../../assets/image/add.png'),
      deletestask: false,
      closetasks: false,
      projectId: "",
      optionszxz: "",
      isTaskUser: true, //当前用户对某个项目是否有编辑权限
      isTaskEdit: true,
      innerVisible: false, //配置模板
      viewModuleObj: {},
      taskName: "",
      tasksDetailVisible: false, //编辑任务弹窗
      closeDialog: false
    };
  },
  computed: {
    changeMemberTab() {
      return this.$store.state.projectMsg.pro_id;
    },
    changeMemberTabs() {
      return this.$store.state.projectMsgs.topdata;
    },
    Memberpzhi() {
      return this.$store.state.projectstat.pzhistate;
    },
    Task_exportis() {
      return this.$store.state.projectstat.Task_exports;
    },
    setupdatas() {
      return this.$store.state.setupdata;
    },
    isCurrentBus() {
      return (
        Number(this.viewModuleObj.financeid) ===
        Number(this.$store.state.projectMsg.projectMsg.financingId)
      );
    }
  },
  watch: {
    setupdatas(val) {
      this.cxlist();
    },
    changeMemberTab: function(newV, oldV) {
      //监听项目id变更
      this.mrid = newV;
      this.cxlist();
      this.mblist();
      this.jiedu();
    },
    // 导出功能
    Task_exportis(newV, oldV) {
      if (newV.state == 1) {
        var arr = [];
        // var isarr = exportList;
        console.log(456, exportList)

        for (let i = 0; i < exportList.length; i++) {
          var item = exportList[i].data;
          for (let j = 0; j < item.length; j++) {
            item[j].implementStageName = exportList[i].stageName;
            arr.push(item[j]);
          }
        }
        console.log(7, arr)
        this.Verify_size(arr);
      }
    },
    changeMemberTabs: function(newV, oldV) {
      if (newV == 1) {
        this.cxlist();
        this.infoarrs = "";
      } else {
        this.infoarrs = "infoarrs";
        this.listData = newV;
      }
    },
    Memberpzhi: function(newV, oldV) {
      if (newV.state == "1") {
        this.dialogs = true;
      }
    },
    previewVisible(val) {
      if (val) {
        this.closeDialog = false;
      }
    }
  },
  //动态高度
  mounted() {
    let h = document.documentElement.clientHeight || document.body.clientHeight;
    h = h - 200;
    this.$refs.tasks.style.height = h + "px";
    console.log('mrid', this.mrid)
    if (this.mrid == "") {
      this.mrid = this.$store.state.projectMsg.pro_id;
      this.cxlist();
      this.mblist();
    }
    this.jiedu();
    this.$store.commit("states", 1);
  },
  updated() {
    var ch =
      document.documentElement.clientHeight || document.body.clientHeight;
    var arr = this.$refs.refgd;
    if (!arr || !arr.length) return;
    for (let i = 0; i < arr.length; i++) {
      arr[i].style.height = ch - 370 + "px";
    }
    this.dndcontainer();
  },
  methods: {
    // 滚动加载任务
    loadmoretask(item) {
      let obj = allList.find(v => v.implementStageId === item.implementStageId);
      if (!obj || !obj.data.length) return;
      let curItem = this.listData.find(v=> v.implementStageId === item.implementStageId)
      if(!curItem) return
      curItem.data = [...curItem.data, ...obj.data.splice(0, 10)]
    },
    dndcontainer() {
      var arr = $(".smooth-dnd-container");
      let addNode = this.$refs.addNode;
      var num = 0;
      Array.from(arr).forEach((element, idx) => {
        addNode[idx].style.position = "absolute";
        element.children.length == 0
          ? (addNode[idx].style.top = 50 + "px")
          : (addNode[idx].style.top = 35);
        Array.from(element.children).forEach((ele, index) => {
          num += ele.offsetHeight;
          addNode[idx].style.top =
            num < this.$refs.refgd[0].offsetHeight - 45
              ? num + 50 + "px"
              : this.$refs.refgd[0].offsetHeight + 60 + "px";
        });
        num = 0;
      });
    },
    onCardDrop(columnId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        let column;
        this.listData.forEach(ele => {
          if (ele.implementStageId == columnId) {
            column = ele;
          }
        });
        const columnIndex = this.listData.indexOf(column);
        column.data = applyDrag(column.data, dropResult);
        this.listData.splice(columnIndex, 1, column);
      }
      this.indexI++;
      if (this.indexI == this.listData.length) {
        setTimeout(() => {
          this.listData.forEach((element, index) => {
            element.data.forEach(ele => {
              if (ele.id == dropResult.payload.id) {
                this.endstageId = index;
                this.ends();
                this.indexI = 0;
              }
            });
          });
        }, 300);
      }
    },
    dragstart(e) {
      const scene = Object.assign([], this.listData);
      scene.forEach((element, index) => {
        element.data.forEach(ele => {
          if (ele.id == e.payload.id) {
            this.startstageId = index;
          }
        });
      });
    },
    getCardPayload(columnId) {
      return index => {
        return this.listData.filter(
          p => p.implementStageId === columnId.implementStageId
        )[0].data[index];
      };
    },
    ends: function(evt) {
      if (this.listData[0].sort) {
        if (this.startstageId == this.endstageId) {
          this.commet([this.listData[this.endstageId]]);
        } else {
          this.commet([
            this.listData[this.startstageId],
            this.listData[this.endstageId]
          ]);
        }
      } else {
        this.commet(this.listData);
      }
    },
    commet(val) {
      var copeArr = [];
      var obj;
      val.forEach((elemen, index) => {
        elemen.taskCount = elemen.data.length;
        var copyArr = [];
        elemen.sort = true;
        elemen.data.forEach((ele, idx) => {
          ele.index = index;
          ele.imst = elemen.implementStageId;
          if (index == ele.index) {
            copyArr.push({
              userId: this.$store.state.loginObject.userId,
              projectId: ele.projectId,
              implementStageId: ele.imst,
              taskId: ele.id,
              sort: idx + 1
            });
            obj = [...copyArr];
          }
        });
        if (obj == undefined) {
          obj = [];
        }
        copeArr.push({
          userId: this.$store.state.loginObject.userId,
          projectId: this.$store.state.projectMsg.projectMsg.id,
          implementStageId: elemen.implementStageId,
          tasks: obj
        });
        obj = [];
      });
      this.dragDIV(copeArr);
    },
    dragDIV(data) {
      var dat = [];
      data.forEach((ele, index) => {
        if (ele != undefined) {
          dat.push(ele);
        } else {
          if (data.length > 0) {
            dat.push([]);
          } else {
            dat.push(ele);
          }
        }
      });
      var datas = {
        token: this.token,
        userId: this.userId,
        data: dat
      };
      // console.log(dat)
      this.$post("/info/task/saveTaskSort", datas)
        .then(response => {
          if (response.code == 0) {
            this.restore = false;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    Stick(item, index, indexes) {
      this.listData[index].data.unshift(this.listData[index].data[indexes]);
      this.listData[index].data.splice(indexes + 1, 1);
      console.log(item);
      this.commet([item]);
    },
    replacementli() {
      var url;
      if (this.restore) {
        this.restore = false;
        url = "/info/task/taskSortRestore ";
      } else {
        this.restore = true;
        url = "/info/task/taskSortReset";
      }
      this.restores(url);
    },
    restores(url) {
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          userId: this.$store.state.loginObject.userId,
          projectId: this.mrid
        }
      };
      this.$post(url, data)
        .then(response => {
          if (response.code == 0) {
            this.cxlist();
          } else {
            this.$message.error(response.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    Verify_size(arr) {
      var isarr = [],
        isarrs = arr;
      for (let i = 0; i < isarrs.length; i++) {
        isarr.push({
          taskId: isarrs[i].id,
          implementStageName: isarrs[i].implementStageName
        });
      }
      console.log(8, isarr)
      if (isarr == "") {
        this.$message({
          message: "暂无任务导出",
          type: "error"
        });
        return;
      }
      var data = {
        token: this.token,
        userId: this.userId,
        projectId: this.$store.state.projectMsg.projectMsg.id,
        data: {
          projectName: this.$store.state.projectMsg.projectMsg.name,
          taskInfos: isarr
        }
      };
      var _this = this;
      this.$post("/info/task/exportTaskIsFileSize", data)
        .then(response => {
          if (response.code == 0) {
            _this.$store.commit("export", {
              url: "/rfs/export/task/exportTaskAndFile",
              data: data.data
            });
          } else if (response.code == -550) {
            _this
              .$confirm(response.msg + ", 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              })
              .then(() => {
                _this.$store.commit("export", {
                  url: "/rfs/export/task/exportTaskAndFile",
                  data: data.data
                });
              })
              .catch(() => {});
          } else {
            _this.$message({
              message: response.msg,
              type: "error"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    addgxbox(val) {
      if (val.name == 3) {
        this.flagadd = false;
        this.cxlist();
        this.mblist();
      }
    },
    // 获取重命名
    zdqc(name) {
      console.log("重命名", this.redata);
      this.num++; //点击的次数0开始
      if (this.checkeds == true) {
        this.standname = name;
        this.Visibles = false;
        this.daorshuju();
      } else {
        var arr = this.redata; // 重命名总数据
        for (let i = 0; i < arr.length; i++) {
          if (i == this.num - 1) {
            //判断是否为第一次点击
            if (this.num - 1 == 0) {
              // 记录第一次点击
              if (name == 1) {
                //(newarros) 重命名
                this.newarros.push(arr[i]);
                this.Visibles = false; // 弹窗
              } else {
                // (apparr) 跳过的
                this.apparr.push(arr[i]);
                this.Visibles = false;
              }
            } else {
              this.Visibles = false;
            }
            setTimeout(() => {
              // 记录第二次
              for (let j = 0; j < arr.length; j++) {
                if (j == this.num - 1) {
                  // 判断是否为第二次点击
                  if (j + 1 < arr.length) {
                    this.redataname = arr[j + 1].name; // 获取当前的名字 + 1
                  }
                  if (this.num != 1) {
                    // 点击的次数不等于1时
                    if (name == 1) {
                      // 1 不跳过  2 跳过
                      this.newarros.push(arr[j]);
                    } else {
                      this.apparr.push(arr[j]);
                    }
                  }
                }
              }
              if (this.num == this.redata.length) {
                // 点击的次数 等于 总数据的长度
                this.Visibles = false; //  弹窗
                this.daorshuju(); /// 查询处理重命名
              } else {
                this.Visibles = true; //  弹窗
              }
            });
          }
        }
      }
    },
    //处理重命名验证
    daorshuju() {
      setTimeout(() => {
        // 定时器异步执行
        console.log(this.apparr);
        console.log(this.newarros);
        if (this.num == 1 && this.checkeds == true && this.standname == 1) {
          this.arrosos = this.redata; //全部自重命名 true + 复选框  + name =1 + num  =1
          this.checkeds = false;
          this.qqff(); // 处理重命名
          return;
        } else {
          //点击的次数 等于 总数据的长度或者记录的跳过的长度等于点击的次数
          if (
            this.num == this.redata.length ||
            this.apparr.length == this.num
          ) {
            if (this.checkeds != true) {
              if (this.apparr.length == this.redata.length) {
                // this.num=0
                // this.standname=''
                // this.newarros=[]
                // this.apparr=[]
                // this.checkeds=false
                // this.arrosos=[]
                // this.redata=[]
                this.num = 0;
                this.standname = "";
                this.newarros = [];
                this.apparr = [];
                this.redata = [];
                this.checkeds = false;
                this.arrosos = [];
                this.newarros = [];
                this.cxlist();
                this.taskName = "";
                this.mblist();
                this.taskVisible = false;
                this.standname = "";
                this.seen3 = false;
                this.daor = [];
                (this.checkeds = false), (this.dialogs = false);
                var state = { state: 10 };
                this.$store.commit("isref", state);
              } else {
                if (this.newarros != "") {
                  // 自重命名不为空并且当不选择全选时，记录自重命名
                  this.arrosos = this.newarros;
                  this.qqff();
                }
              }
            } else {
              //自重命名为空并且当不选择全选时，无操作
              if (this.checkeds != true) {
                // this.num=0
                // this.standname=''
                // this.newarros=[]
                // this.apparr=[]
                // this.checkeds=false
                // this.arrosos=[]
                // this.redata=[]
                this.num = 0;
                this.standname = "";
                this.newarros = [];
                this.apparr = [];
                this.redata = [];
                this.checkeds = false;
                this.arrosos = [];
                this.newarros = [];
                this.cxlist();
                this.taskName = "";
                this.mblist();
                this.taskVisible = false;
                this.standname = "";
                this.seen3 = false;
                this.daor = [];
                (this.checkeds = false), (this.dialogs = false);
                var state = { state: 10 };
                this.$store.commit("isref", state);
              }
            }
          }
          if (this.checkeds == true) {
            if (this.standname == 1) {
              //点击自重命名 + checkeds= true
              var array = this.redata;
              var arr = this.apparr;
              var newarr = []; //进行去重
              for (let i = 0; i < array.length; i++) {
                for (let j = 0; j < arr.length; j++) {
                  if (arr[j].id == array[i].id) {
                    array.splice(i, 1);
                  }
                }
              }
              this.arrosos = array;
              this.qqff();
              return;
            } else {
              //点击跳过 + checkeds= true
              this.checkeds = false;
              if (this.newarros != "") {
                this.arrosos = this.newarros;
                this.qqff();
              } else {
                // /全部跳过 + 复选框  + name =2 + num =1
                // this.num=0
                // this.standname=''
                // this.newarros=[]
                // this.apparr=[]
                // this.checkeds=false
                // this.arrosos=[]
                // this.redata=[]
                this.num = 0;
                this.standname = "";
                this.newarros = [];
                this.apparr = [];
                this.redata = [];
                this.checkeds = false;
                this.arrosos = [];
                this.newarros = [];
                this.cxlist();
                this.taskName = "";
                this.mblist();
                this.taskVisible = false;
                this.standname = "";
                this.seen3 = false;
                this.daor = [];
                (this.checkeds = false), (this.dialogs = false);
                var state = { state: 10 };
                this.$store.commit("isref", state);
              }
            }
          }
        }
      }, 10);
    },
    // 处理重命名
    qqff() {
      var obj = {},
        objnew = [];
      // for (let i = 0; i < this.arrosos.length; i++) {
      //   console.log(this.arrosos[i])
      //   obj={
      //     "id":this.arrosos[i].id,
      //     "needImportImplementStageId":this.arrosos[i].needImportImplementStageId,
      //     "needImportProjectId":this.mrid,
      //     "projectTplId":this.useTplIds,
      //     "stageId":this.arrosos[i].stageId,
      //     'name':this.arrosos[i].name,
      //     'parentId':this.arrosos[i].parentId
      //   }
      //   objnew.push(obj)
      // }
      var data = {
        token: this.token,
        userId: this.userId,
        data: this.arrosos
      };

      var _this = this;
      this.$post("info/project/importDuplicationOfNameTask", data)
        .then(response => {
          if (response.code == 0) {
            _this.$message({
              message: response.msg,
              type: "success"
            });
            _this.num = 0;
            _this.standname = "";
            _this.newarros = [];
            _this.apparr = [];
            _this.redata = [];
            _this.checkeds = false;
            _this.arrosos = [];
            _this.newarros = [];
            _this.cxlist();
            _this.taskName = "";
            _this.mblist();
            _this.taskVisible = false;
            _this.standname = "";
            _this.seen3 = false;
            _this.daor = [];
            (_this.checkeds = false), (_this.dialogs = false);
            var state = { state: 10 };
            _this.$store.commit("isref", state);
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
    },
    gbdialogs() {
      this.checkedCities = [];
      this.checkAll = false
      this.isIndeterminate = false
    },
    // 关闭重命名弹窗
    handleClose2(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
          this.num = 0;
          this.standname = "";
          this.newarros = [];
          this.apparr = [];
          this.checkeds = false;
          this.arrosos = [];
          this.redata = [];
        })
        .catch(_ => {});
    },
    // 控制调起方法
    dialogqd() {
      if (this.daor == "") {
        this.$message({
          message: "请选择阶段",
          type: "warning"
        });
        return;
      }

      let useTplId = this.$store.state.projectMsg.projectMsg.useTplId;
      // 判断是否已经引用了模板
      if (useTplId == null) {
        this.taskVisible = true;
        this.taskModel();
      } else {
        this.$confirm("新模板以增量的方式覆盖之前的模板, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.ajaxtaskModel();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      }
    },
    // 第二次判断重命名
    ajaxtaskModel() {
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          projectId: this.mrid,
          includeImportStageIds: this.daor
        }
      };
      var _this = this;
      this.$post("info/project/reImportTaskFromProjectChooseTpl", data)
        .then(response => {
          if (response.code == 0) {
            _this.dialogs = false;
            if (response.data != "") {
              //校验重命名
              _this.Visibles = true;
              _this.redata = response.data;
              _this.redataname = response.data[0].name;
              //  console.log(response.data.length)
            } else {
              _this.cxlist();
              _this.$message({
                message: response.msg,
                type: "success"
              });
            }
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
    },
    //获取阶段数据
    jiedu() {
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          projectId: this.mrid
        }
      };
      this.$post("info/project/getImplementStageList", data)
        .then(response => {
          this.cities = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //获取阶段id
    handleCheckAllChange(val) {
      var arr = this.cities;
      console.log(arr)
      var cities = [];
      for (let i = 0; i < arr.length; i++) {
        cities.push(arr[i].id);
      }
      if (val == true) {
        this.daor = cities;
      } else {
        this.daor = [];
      }
      console.log(this.daor);
      this.checkedCities = val ? cities : [];
      this.isIndeterminate = false;
    },
    //获取阶段id
    handleCheckedCitiesChange(value) {
      this.daor=value
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      // this.checkAll = false
    },
    // 父任务
    cxnames(items, el) {
      var data = {
        token: this.token,
        userId: this.userId,
        projectId: this.mrid,
        data: {
          parentId: items.parentId
        }
      };
      var _this = this;
      this.$post("/info/task/getParentTask", data)
        .then(response => {
          // console.log(response.data)
          if (response.data == undefined) {
            _this.namest = "";
          } else {
            _this.namest = "所属父任务:" + response.data.name;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    // 导入模板数据
    sureTask() {
      console.log("导入", this.taskName);
      if (this.taskName == "" || this.taskName == undefined) {
        this.$message({
          message: "请选择模板",
          type: "warning"
        });
        return;
      }
      var typeObj = {
        token: this.token,
        userId: this.userId,
        data: {
          id: this.optTaskId,
          projectId: this.mrid,
          includeImportStageIds: this.daor,
          financingId: this.taskFinanId,
          name: this.taskName
        }
      };
      var loading = this.$loading({
        lock: true,
        text: "拼命加载中",
        spinner: "el-icon-loading"
      });
      this.$post("/info/project/importProjectTpl", typeObj)
        .then(response => {
          console.log(response);
          if (response.code == 0) {
            if (response.data != "") {
              // 校验重命名
              this.$confirm(
                "新模板以增量的方式覆盖之前的模板, 是否继续?",
                "提示",
                {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                }
              )
                .then(() => {
                  this.Visibles = true;
                  this.redata = response.data;
                  this.redataname = response.data[0].name;
                })
                .catch(() => {
                  this.$message({
                    type: "info",
                    message: "已取消"
                  });
                });
            }
            this.$message({
              message: response.msg,
              type: "success"
            });
            this.cxlist();
            this.taskName = "";
            this.$store.commit("isCanImportTpl", 1);//配置模板成功后显示导入任务模板按钮
            this.mblist();
            this.taskVisible = false;
            this.seen3 = false;
            this.daor = [];
            this.dialogs = false;
            var state = { state: 10 };
            loading.close();
            this.$store.commit("isref", state);
          } else {
            this.$message({
              message: response.msg,
              type: "warning"
            });
            loading.close();
          }
        })
        .catch(error => {
          loading.close();
          console.log(error);
        });
    },
    taskVisibleFn() {
      this.taskVisible = false;
    },
    backBefore() {
      if (this.closeDialog) {
        return;
      }
      this.previewVisible = false;
      this.innerVisible = true;
      this.$refs.seleTemp.setSelTemplate();
    },
    viewSubmit(e) {
      this.closeDialog = true;
      // this.$refs.seleTemp.setSelTemplate(this.viewModuleObj.id)
      this.previewVisible = false;
      this.innerVisible = false;
      this.checkTemp(this.viewModuleObj);
    },
    checkTemp(item) {
      // 选择模板数据
      console.log("测试11111", item);
      // if(item.canChoose){
      if (item.flag) {
        for (var i = 0; i < this.standObj.length; i++) {
          if (item.id == this.standObj[i].id) {
            this.standObj[i].flag = false;
            this.taskFinanId = "";
            this.taskName = "";
            this.$forceUpdate();
          }
        }
      } else {
        for (var i = 0; i < this.standObj.length; i++) {
          this.standObj[i].flag = false;
          if (item.id == this.standObj[i].id) {
            this.standObj[i].flag = true;
          }
        }
        this.taskFinanId = item.financingId;
        this.taskName = item.temname;
        this.optTaskId = item.id;
        this.$forceUpdate();
      }
      // }
      this.sureTask();
    },
    previewFn(item) {
      this.innerVisible = false;
      // this.taskVisible = false;
      // this.previewVisible = true;
      var typeObj = {
        token: this.token,
        userId: this.userId,
        data: {
          financingId: item.financeid,
          id: item.id
        }
      };
      var that = this;
      this.$post("/info/taskTpl/getTaskTplList", typeObj)
        .then(response => {
          console.log(response);
          console.log(response.data);
          var data = response.data;
          if (response.code == that.code.codeNum.SUCCESS) {
            that.prevObj = data;
            that.taskVisible = false;
            that.previewVisible = true;
            console.log("2222222222", item);
            that.viewModuleObj = item;
          } else {
            that.$message(response.msg);
          }
        })
        .catch(error => {});
    },
    //第一次（配置模板）
    pzhi() {
      // 判断项目是否是已终止状态
      if (
        this.$store.state.projectMsg.projectMsg.endFlag &&
        this.$store.state.projectMsg.projectMsg.endFlag === 1
      ) {
        this.$store.commit("projectStatusTips");
      } else {
        // this.taskVisible=true
        // this.taskModel()
        this.innerVisible = true;
      }
    },
    //判断显示（配置模板/导入模板）
    mblist() {
      let proObj = this.$store.state.projectMsg.projectMsg;
      this.financingTopIdis = proObj.financingTopId;
      this.financingIdis = proObj.financingId;
      let useTplId = proObj.useTplId;
      this.Deletehidden(useTplId);
    },
    //删除显示隐藏
    Deletehidden(useTplId) {
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          id: this.mrid
        }
      };
      var _this = this;
      // 是否可导入任务模板
      this.$post("/info/project/projectCanImportTaskTpl", data)
        .then(response => {
          // console.log(useTplId)  // null 时说明没配置过模板/非null 配置过模板
          // response.data.canImport // false 有任务 /true 没有任务
          // _this.$store.commit("pzhistates", {state:1});  / 1 false  2 true
          console.log(useTplId);
          console.log(response.data.canImport);
          if (response.data.canImport == false && useTplId != null) {
            _this.pzmbis = false;
            _this.$store.commit("pzhistates", { state: 2 });
          } else if (response.data.canImport == false && useTplId == null) {
            _this.pzmbis = false;
            _this.$store.commit("pzhistates", { state: 1 });
          } else if (response.data.canImport == true && useTplId != null) {
            _this.pzmbis = true;
            _this.$store.commit("pzhistates", { state: 1 });
          } else if (response.data.canImport == true && useTplId == null) {
            _this.pzmbis = true;
            _this.$store.commit("pzhistates", { state: 1 });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //  获取任务模板数据
    taskModel() {
      var typeObj = {
        token: this.token,
        userId: this.userId,
        data: {
          // "financingTopId":this.$store.state.projectMsg.projectMsg.financingTopId,
          // "financingId":this.$store.state.projectMsg.projectMsg.financingId,
          financingTopId: this.financingTopIdis,
          financingId: this.financingIdis
        }
      };
      var that = this;
      this.$post("/info/taskTpl/getChooseTplList", typeObj)
        .then(response => {
          console.log(response);
          console.log(response.data);
          var data = response.data;
          if (response.code == that.code.codeNum.SUCCESS) {
            that.otherObj = data.otherTplList;
            that.standObj = data.standardTplList;
            for (var i = 0; i < that.standObj.length; i++) {
              that.standObj[i].flag = false;
            }
          } else {
            that.$message(response.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    gxbox(val) {
      if (val.name == 2) {
        this.cxlist();
        this.flagdetail = false;
      } else if (val.name == 3) {
        this.cxlist();
      } else if (val.name == 1) {
        this.flagdetail = false;
      } else if (val.name == 9) {
        this.flagdetail = false;
      }
    },
    dialog() {
      this.$router.push({
        path: "/project_tasks/mytasks",
        query: {
          projectId: this.mrid
        }
      });
    },
    update(item) {
      this.flagdetails(item);
    },
    flagdetails(items, item){
      axios.all([this.queryIsTaskUser(items),this.queryIsTaskEdit(items)]).then(axios.spread((res1,res2) => {
        this.isTaskUser = res1.data;
        this.isTaskEdit = res2.data;
        this.flagdetails2(items, item)
      }))
    },
    flagdetails2(items, item) {
      console.log(123, "flagdetails");
      // this.queryIsTaskUser(items);
      // this.queryIsTaskEdit(items);
      this.status = items.status;
      this.flagdetail = true;
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          id: items.id
        }
      };
      var _this = this;
      this.$post("/info/task/getTaskDetailsByid", data)
        .then(response => {
          _this.flagdetaildatas = response.data;
          var ids = {
            implementStageId: response.data.implementStageId,
            parentId: items.id
          };
          _this.ids = ids;
        })
        .catch(function(error) {});
    },
    // 查询对当前编辑的任务是否有权限
    async queryIsTaskUser(item) {
      var data = {
        userId: this.userId,
        projectId: this.$store.state.projectMsg.projectMsg.id,
        data: {
          id: item.id //任务id
        }
      };
      console.log("查询权限2");
      return await this.$post("/info/task/isTaskUser", data)
        .then(res => {
          if (this.code.codeNum.SUCCESS == res.code) {
            return res;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 查询对当前编辑的任务是否是创建人和是否有分配权限
    async queryIsTaskEdit(item) {
      var data = {
        userId: this.userId,
        projectId: this.$store.state.projectMsg.projectMsg.id,
        data: {
          id: item.id //任务id
        }
      };
      return await this.$post("/info/task/isTaskEdit", data)
        .then(res => {
          if (this.code.codeNum.SUCCESS == res.code) {
            return res;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    MemberQuerys() {
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          projectId: this.mrid
        }
      };
      var _this = this;
      this.$post("/info/project/getProjectMemberAll", data)
        .then(response => {})
        .catch(function(error) {
          console.log(error);
        });
    },
    popovers(el, item, index) {
      if (item.checked) {
        var url = "/info/task/completeTask";
      } else {
        var url = "/info/task/toUnderway";
      }
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          id: item.id
        }
      };
      var _this = this;
      this.$post(url, data)
        .then(response => {
          if (response.code == 0) {
            _this.$message({
              message: response.msg,
              type: "success"
            });
            _this.cxlist();
            item.checked = false;
            // el.target.checked=false;
            console.log(1,el)
          } else if (response.code == -3021) { // 任务完成成功
            _this.$message({
              message: response.msg,
              type: "success"
            });
            _this.cxlist();
            // item.checked = true;
            el.target.checked=true;
            console.log(2,el)
          } else {
            _this.$message({
              message: response.msg,
              type: "warning"
            });
            // item.checked = false;
            setTimeout(() => {
              this.$set(item,'selected',false)
            },200)
            console.log(3,el)
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //阶段渲染
    cxlist(datas) {
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          projectId: this.mrid
        }
      };
      var loading = this.$loading({
        lock: true,
        text: "拼命加载中",
        spinner: "el-icon-loading"
      });

      this.$post("/info/task/getTaskByProjectView", data)
        .then(response => {
          exportList = JSON.parse(JSON.stringify(response.data))
          allList = response.data

          this.listData = [];
          allList.forEach(v => {
            let list = v.data.splice(0, 20);
            let obj = {};
            for (let p in v) {
              p !== "data" && (obj[p] = v[p]);
            }
            list.forEach(l=>{
              this.$set(l,'checked',true)
              this.$set(l,'selected',false)
            })
            obj.data = list;

            this.listData.push(obj);
          });

          loading.close();
          this.restore = response.data[0].restore;

          // _this.issort = response
          if (this.tjstate == 1) {
            this.viewtabs = false;
          }
          this.$store.commit("isref", { state: 3 });
        })
        .catch(function(error) {
          loading.close();
          console.log(error);
        });
    },
    //新建
    flagadds(item) {
      // 判断项目是否是已终止状态
      if (
        this.$store.state.projectMsg.projectMsg.endFlag &&
        this.$store.state.projectMsg.projectMsg.endFlag === 1
      ) {
        this.$store.commit("projectStatusTips");
        return;
      }
      this.flagadd = true;
      this.addnew = item;
      console.log(item);
    },
    onResultChangedetails(val) {
      console.log("子组件传过来的是", val);
      this.flagdetail = val;
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    onSubmit() {
      this.$router.push("/project_tasks/taskssearch");
    },
    clickhoverdiv() {
      this.hoverShowDivsdiv = true;
    },
    closeHoverinfo() {
      this.hoverShowDivsdiv = false;
      this.infoClass = true;
      this.warninClass = false;
      this.dangerClass = false;
    },
    closeHoverwarning() {
      this.hoverShowDivsdiv = false;
      this.warninClass = true;
      this.dangerClass = false;
      this.infoClass = false;
    },
    closeHoverdanger() {
      this.hoverShowDivsdiv = false;
      this.dangerClass = true;
      this.warninClass = false;
      this.infoClass = false;
    },
    // onResultChangeadd(val) {
    //   console.log("子组件传过来的是", val);
    //   this.flagadd = val;
    //   this.mblist()
    //   if(val == true){
    //       this.cxlist()
    //   }
    // },
    //展示设置栏菜单
    showMenu() {
      this.chosepract = true;
      this.menetask = false;
    },
    showEndtime() {
      this.endtimes = true;
      this.menetask = false;
    },
    showDelete() {
      this.deletestask = true;
      this.menetask = false;
    },
    closetasksop() {
      this.closetasks = true;
      this.menetask = false;
    },
    closeMenu() {
      this.menetask = true;
      this.chosepract = false;
      this.endtimes = false;
      this.deletestask = false;
      this.closetasks = false;
    },
    tasksDelete(items, is) {
      var tasksDelete = 1;
      this.delectds(tasksDelete, items);
      this.names = items.name;
    },
    tasksDeletes(items, is) {
      var tasksDelete = 4;
      this.delectds(tasksDelete, items);
      this.names = items.name;
    },
    tasksDeleteskq(item, is) {
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
                 _this.cxlist()
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
    primarys(item, is) {
      var tasksDelete = 2;
      this.delectds(tasksDelete, item);
    },
    primaryss(item, is) {
      var tasksDelete = 3;
      this.delectds(tasksDelete, item);
    },
    delectds(tasksDelete, item, is) {
      var url, text;
      if (tasksDelete == 1) {
        //删除单个
        var data = {
          token: this.token,
          userId: this.userId,
          data: {
            id: item.id
          }
        };
        url = "/info/task/delOneTask";
        text = "是否要删除[" + item.name + "]";
      } else if (tasksDelete == 2) {
        // 删除全部
        var data = {
          token: this.token,
          userId: this.userId,
          data: {
            implementStageId: item.implementStageId
          }
        };
        url = "/info/task/delTaskByStage";
        text = "是否要删除[" + item.stageName + "]";
      } else if (tasksDelete == 3) {
        //关闭全部
        var data = {
          token: this.token,
          userId: this.userId,
          data: {
            implementStageId: item.implementStageId
          }
        };
        url = "/info/task/closeTaskByStage";
        text = "是否要关闭[" + item.stageName + "]";
      } else {
        // 关闭单个
        var data = {
          token: this.token,
          userId: this.userId,
          data: {
            id: item.id
          }
        };
        url = "/info/task/closeOneTask";
        text = "是否要关闭[" + item.name + "]";
      }
      this.$confirm(text, "是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var _this = this;
          this.$post(url, data)
            .then(response => {
              if (response.code == 0) {
                _this.$message({
                  message: response.msg,
                  type: "success"
                });
                 _this.cxlist()
                _this.mblist();
                var state = { state: 3 };
                _this.$store.commit("isref", state);
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
    //确定要关闭该任务提示
    tasksClose() {},
    // 任务设置中的任务删除
    deleteTssks() {},
    addphases() {
      this.addphasesphase = true;
    },
    clickhoverdiv() {
      this.hoverShowDivsdiv = true;
    },
    closeHoverinfo() {
      this.hoverShowDivsdiv = false;
      this.infoClass = true;
      this.warninClass = false;
      this.dangerClass = false;
      // this.abcd = true;
    },
    closeHoverwarning() {
      this.hoverShowDivsdiv = false;
      this.warninClass = true;
      this.dangerClass = false;
      this.infoClass = false;
      // this.abcd = true;
    },
    closeHoverdanger() {
      this.hoverShowDivsdiv = false;
      this.dangerClass = true;
      this.warninClass = false;
      this.infoClass = false;
      // this.abcd = true;
    }
  }
};
</script>
<style lang="scss">
.idclassinfo {
  overflow: auto;
}

.idclassinfo .smooth-dnd-container {
  position: relative;
  // overflow: auto;
  min-height: 10px;
  height: 300px;
  // background: red;
}
// .el-scrollbar__wrap {
//   padding-right: -5px !important;
// }
.xzks {
  text-align: left;
  margin-left: 7px;
  margin-top: 15px;
}

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
</style>
<style scoped lang="scss" type="text/css">
.task-name{
  display: inline-block;
  width: 237px;
  color: #333333;
  font-size: 14px;
  font-weight: bold;
  text-align: left;
}
.smooth-dnd-container {
  position: relative;
  /* max-width: 500px; */
  // overflow: auto;
}
@import "../../../common/css/tasks.css";
#footergd {
  position: relative;
}
.opt_task {
  height: 550px;
  .el-scrollbar {
    .temp_task {
      width: 100%;
      text-align: left;
      margin-bottom: 20px;
      .temp_tit {
        font-size: 16px;
        font-weight: bolder;
        line-height: 26px;
      }
      .temp_type {
        width: 100%;
        .temp_box {
          float: left;
          margin: 0 20px 20px 0;
          width: 220px;
          height: 140px;
          position: relative;
          cursor: not-allowed;
          color: #fff;
          img {
            width: 100%;
            height: 100%;
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
            top: 0;
            z-index: 3;
            width: 100%;
            height: 100%;
            text-align: center;
            vertical-align: middle;
            padding: 20px;
            box-sizing: border-box;
            /*color: #fff;*/
            line-height: 100px;
            background: rgba(0, 0, 0, 0);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .check_icon {
            position: absolute;
            left: 5px;
            top: 5px;
            width: 42px;
            height: 32px;
            z-index: 10;
          }
        }
        .classB {
          color: #ecad40;
          cursor: pointer;
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
      }
      .temp_type {
        width: 100%;
        .temp_box {
          float: left;
          margin: 0 20px 20px 0;
          width: 220px;
          height: 140px;
          position: relative;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
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
            top: 0;
            z-index: 3;
            width: 100%;
            height: 100%;
            text-align: center;
            vertical-align: middle;
            padding: 20px;
            box-sizing: border-box;
            color: #fff;
            line-height: 100px;
            background: rgba(0, 0, 0, 0);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
}

.infoClass {
  background: #919191 !important;
}
.warninClass {
  background: #ffc53d !important;
}
.el-button--text.color-primary-hover {
  color: #999;
}

.dangerClass {
  background: #ff4d4f !important;
}

.tasks {
  height: auto;
}
.el-form-item__content {
  text-align: left;
}
.el-form-item__label {
  text-align: left;
}

.taskMenu i {
  cursor: pointer;
}

.sonTasksMenu {
  padding-bottom: 10px;
  display: inline-block;
  margin-top: 10px;
  margin-left: 10px;
}
.sonTasksUl {
  padding: 12px;
}
.sonTasksUl li {
  margin-bottom: 6px;
  height: 30px;
  cursor: pointer;
}
.sonTasksUl li img {
  position: relative;
  top: 1px;
}
.sonTasksUl li span {
  margin-left: 5px;
}
.practitioners .paracFist {
  padding: 5px;
}
.practitioners .paracFist i {
  margin-left: 5px;
  cursor: pointer;
}
.practitioners .paracFist span {
  margin-left: 65px;
}
.practitioners .paracSecond {
  padding: 15px;
}

.paracSecond .el-date-editor.el-input {
  width: 203px;
}
.practitioners .paracSecond p {
  padding: 5px;
  margin-top: 15px;
}
.practitioners .paracSecond p img {
  position: relative;
  top: 3px;
  margin-left: 5px;
  margin-right: 5px;
  width: 16px;
  height: 16px;
}

.practitioners .sure {
  margin-left: 83px;
  height: 30px;
  padding: 0 10px;
  margin-bottom: 10px;
}

.taskremind {
  padding: 10px;
  text-align: left;
}
.taskremind p {
  font-size: 14px;
  color: #333;
  margin-top: 10px;
  margin-bottom: 10px;
}
.taskremind .endtimes {
  display: block;
  width: 78px;
  height: 22px;
  background-color: #ff4d4f;
  text-align: center;
  line-height: 22px;
  color: #fff;
  font-size: 12px;
  padding: 0 5px;
}

.addPhase {
  width: 300px;
  height: 200px;
  border: 1px solid #e8e8e8;
  background: #fff;
  padding: 5px 15px;
}

.hoverChange {
  position: absolute;
  width: 5px;
  height: 100%;
  background: yellow;
  display: block;
  cursor: pointer;
  top: 1px;
}

.hoverShowDiv {
  position: absolute;
  width: 200px;
  height: auto;
  border: 1px solid #e8e8e8;
  background: #fff;
  z-index: 11;
  top: 160px;
}
.hoverShowDiv div {
  display: block;
  margin-top: 15px;
  margin-left: 15px;
  margin-bottom: 15px;
}
.infoClass {
  background: #919191 !important;
}
.warninClass {
  background: #ffc53d !important;
}

.dangerClass {
  background: #ff4d4f !important;
}
.top_nav {
  height: 120px;
  background-color: #fff;
  padding: 24px;
  padding-bottom: 0px;
  padding-top: 0px;
}

.companyDiv {
  top: 17px;
  position: relative;
}
.companyDiv span {
  margin-right: 10px;
}
.companyDiv span:nth-child(2) {
  margin-left: 10px;
}
.companyDiv img {
  top: 6px;
  position: relative;
}

.companyDiv .allSearch input {
  padding-left: 40px;
}

.companySearch .el-input input {
  border: 0px;
  width: 250px;
  color: #275aa6;
  font-size: 16px;
  font-weight: bold;
}

.searchInput input {
  margin-left: 19px;
  width: 86%;
  margin-top: 10px;
}

.allProjects {
  display: inline-block;
  margin-top: 10px;
  border-bottom: 1px solid #e8e8e8;
  width: 100%;
  padding-left: 20px;
  padding-bottom: 10px;
}
.el-header {
  padding: 0px;
}
.el-breadcrumb {
  padding-top: 24px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}

.task_click {
  position: relative;
}

.el-submenu__title:hover {
  background-color: #fff;
}
.el-submenu__title {
  color: #909399;
}

.menu_task {
  position: absolute;
  top: 5px;
  left: 47px;
}
.menu_task div {
  height: 50px;
}
.el-menu--popup-bottom-start {
  position: absolute;
  left: -110px;
}

.taskTitle {
  margin-top: 10px;
  margin-left: 13px;
  color: #000000;
}
.progress {
  width: 90%;
  border-radius: 10px;
  height: 10px;
  margin: 5px;
}
.progress span {
  height: 10px;
  display: inline-block;
  border-radius: 10px;
}
.progress span:nth-child(1) {
  width: 30%;
  background: #a0d911;
}
.progress span:nth-child(2) {
  width: 40%;
  background: #ffc53d;
  margin-left: -7px;
}
.progress span:nth-child(3) {
  width: 30%;
  background: #ff4d4f;
  margin-left: -7px;
}
/* 今天的任务 */
.todyTask {
  text-align: left;
  position: relative;
  margin-bottom: 10px;
}
.todyTask .hoverAside {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #ff4d4f;
  left: -20px;
  top: 3px;
  cursor: pointer;
}
.hoverAside:hover {
  width: 10px;
}

.ifstatus {
  width: 200px;
  height: 160px;
  padding: 10px;
}
.ifstatus .tagEvery {
  display: block;
  margin-top: 10px;
}

.todyTask .todyCheckbox em {
  position: absolute;
  right: 0px;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #333;
}

/*
视图切换 */
.viewTaba {
  position: absolute;
  right: 0px;
  width: 360px;
  height: 978px;
  background: rgba(255, 255, 255, 1);
  box-shadow: -4px 0px 12px 0px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  z-index: 2;
  background: #fff;
  top: -2px;
  overflow: auto;
}

.viewTaba .viewTabaTitle {
  height: 60px;
  border-bottom: 1px solid #e8e8e8;
  text-align: center;
}
.viewTaba .viewTabaTitle span {
  line-height: 70px;
  color: #333;
  font-size: 20px;
}
.viewTaba .viewTabaTitle i {
  float: right;
  margin-right: 5px;
  line-height: 70px;
}
.viewTaba .viewTabaReadio span li {
  display: inline-block;
}
.viewTaba .viewTabaReadio span .el-menu-item:focus,
.el-menu-item:hover {
  background-color: #fff;
}

.viewTaba .screening {
  padding: 10px;
  text-align: left;
}
.viewTaba .screening span {
  display: block;
  margin-bottom: 10px;
}

.viewTaba .custom,
.viewTaba .taskType {
  text-align: left;
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 10px;
}
.viewTaba .custom .el-select,
.viewTaba .taskType .el-select {
  width: 100%;
  font-weight: bold;
}

.viewTaba .custom .el-select .el-input__inner,
.viewTaba .taskType .el-select .el-input__inner {
  border: 0px;
}

.viewTaba .practitioners {
  text-align: left;
  padding: 10px;
}
.viewTaba .practitioners span {
  font-size: 14px;
  text-align: left;
  color: #333;
  display: inline-block;
  margin-bottom: 10px;
}
.viewTaba .practitioners p img {
  width: 16px;
  height: 16px;
  margin-right: 5px;
  position: relative;
  top: 4px;
}
.viewTaba .practitioners p span {
  margin-left: 7px;
}
.viewTaba .endTimes {
  padding: 10px;
  text-align: left;
}
.viewTaba .endTimes span {
  font-size: 14px;
  color: #333;
  display: inline-block;
  margin-bottom: 10px;
}
.viewTaba .endTimes p span {
  color: #999;
  font-size: 14px;
}
.viewTaba .endTimes p i {
  float: right;
}
.viewTaba .addscreening {
  padding: 10px;
  position: relative;
}
.viewTaba .addscreening .filter {
  width: 240px;
  height: 375px;
  position: absolute;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.15);
}
.viewTaba .addscreening .filter .addScreenTitle {
  height: 54px;
  border-bottom: 1px solid #e8e8e8;
}
.viewTaba .addscreening .filter .addScreenTitle span {
  line-height: 55px;
}
.viewTaba .addscreening .filter .addScreenTitle i {
  float: right;
  margin-right: 5px;
  margin-top: 10px;
}
.tasks .tasksContent .phase_task .phaseContent .phaseDiv[data-v-757a1a06] {
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
}
.viewTaba .addscreening .filter .screenType p {
  padding: 10px;
  text-align: left;
}
.viewTaba .addscreening .filter .screenType p span {
  text-align: left;
}
.viewTaba .addscreening .filter .screenType p i {
  float: right;
  margin-right: 5px;
}
.task_modul {
  height: 350px;
  .el-scrollbar {
    .modul_box {
      .task_show {
        display: inline-block;
        vertical-align: text-top;
        width: 390px;
        padding: 5px 10px;
        box-sizing: border-box;
        margin-right: 10px;
        .task_tit {
          line-height: 24px;
          text-align: left;
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
            box-shadow: 0 4px 4px rgb(237, 237, 237);
            background: #fff;
            border-radius: 4px;
            .task_li_title {
              margin: 16px 0 16px 0;
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 14px;
              color: #333333;
              a {
                display: flex;
                align-items: center;
                .task_li_title_check {
                  margin-left: 8px;
                  display: flex;
                  align-items: center;
                  span {
                    width: 250px;
                    display: block;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                }
              }
              .task_li_title_icon {
                display: inline-block;
                width: 16px;
                height: 16px;
                background: url("../../../../assets/common_icon/more_icon.png")
                  no-repeat;
                background-size: 16px 16px;
                margin-right: 8px;
              }
            }
            .task_li_time {
              margin-left: 34px;
              color: #1890ff;
              font-size: 14px;
            }
            .task_li_clutter {
              display: flex;
              margin: 8px 0 16px 34px;
              color: #14161a;
              p:nth-child(2) {
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
.tasks
  .tasksContent
  .phase_task
  .phaseContent
  .phaseDiv[data-v-757a1a06][data-v-757a1a06] {
  padding-top: 4px;
  padding-left: 16px;
  padding-right: 16px;
}
.colose {
  background: #ff4d4f;
  color: white;
  padding: 1%;
  font-size: 12px;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 4px;
  padding-bottom: 4px;
  border-radius: 2px;
}
.tasks .tasksContent .phase_task .phaseTiele h4[data-v-757a1a06] {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  line-height: 34px;
}
.tasks .tasksContent .phase_task .phaseTiele[data-v-757a1a06] {
  margin-bottom: 10px;
}
.tasks .tasksContent .phase_task .phaseContent .phaseDivAdd[data-v-757a1a06] {
  width: 357px;
  height: 48px;
  text-align: center;
  line-height: 48px;
}
.tasks
  .tasksContent
  .phase_task
  .phaseContent
  .phaseDivAdd[data-v-757a1a06][data-v-757a1a06] {
  width: 357px;
  height: 36px;
  text-align: center;
  line-height: 48px;
}
.tasks
  .tasksContent
  .phase_task
  .phaseContent
  .phaseDivAdd
  img[data-v-757a1a06][data-v-757a1a06] {
  width: 20px;
  height: 20px;
  padding: 0px;
  margin-top: -11px;
}

.tasks .tasksContent .phase_task .phaseContent[data-v-757a1a06] {
  width: 359px;
  background-color: #fff;
  -webkit-box-shadow: 0px 2px 4px 0px rgba(20, 22, 26, 0.08);
  box-shadow: 0px 2px 4px 0px rgba(20, 22, 26, 0.08);
  border-radius: 4px;
  text-align: left;
  margin-bottom: 16px;
  // margin-top: 16px;
  /* cursor: pointer; */
  position: relative;
}
.tasks .tasksContent[data-v-757a1a06] {
  margin-top: 9px;
}
.sonTasksUl li span[data-v-757a1a06] {
  margin-left: -21px;
  margin-top: -7px;
}
.sonTasksUl[data-v-757a1a06] {
  padding: 12px;
  margin-top: -19px;
  margin-bottom: -19px;
}
.tasks .tasksContent .phase_task[data-v-757a1a06] {
  margin-left: 36px;
  margin-top: 4px;
}
.classA {
  width: 237px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: left;
}
.tasks .tasksContent .phase_task .phaseContent[data-v-1932ceca] {
  width: 360px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(20, 22, 26, 0.08);
  border-radius: 4px;
  text-align: left;
  margin-top: 16px;
  position: relative;
}
.tasks .tasksContent .phase_task .phaseContent {
  width: 361px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(20, 22, 26, 0.08);
  border-radius: 4px;
  text-align: left;
  // margin-top: 16px;
  margin-bottom: 16px;
  position: relative;
}

// .el-scrollbar__wrap {
//   overflow-x: auto;
// }
.tasks[data-v-757a1a06] {
  width: 100%;
  height: 732px;
  overflow: hidden;
  overflow-x: auto;
}
.tasks .tasksContent[data-v-757a1a06][data-v-757a1a06] {
  margin-top: 9px;
  white-space: nowrap;
}
.fls {
  display: inline-block;
  // display: inline-table;
}
.tasks {
  height: 780px;
  overflow: hidden;
  overflow-x: auto;
  overflow-y: auto;
}
.tasks .tasksContent {
  margin-top: 24px;
  white-space: nowrap;
}
.tasks .tasksContent .phase_task .phaseContent .phaseDiv {
  padding-top: 0px;
  padding-left: 16px;
  padding-right: 16px;
  margin-top: -11px;
  margin-bottom: -4px;
}
.tasks .tasksContent .phase_task .phaseContent .phaseDiv {
  padding-top: 4px;
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 1px;
}
.tasks .tasksContent .phase_task .phaseContent .phaseDiv {
  padding-top: 4px;
  padding-left: 16px;
  padding-right: 16px;
}
.tasks .tasksContent .phase_task .phaseTiele {
  margin-bottom: 10px;
}
.infos {
  text-align: center;
  color: rgb(51, 51, 51);
  padding-top: 6px;
  width: 74%;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  margin: 0 auto;
  overflow: hidden;
}
</style>
<style lang="scss">
#app .task_modules .el-scrollbar__wrap {
  overflow-x: auto;
}
@media screen and (max-width: 1650px) {
  .tasks .opt_task {
    height: 400px !important;
  }
}
#pcheck {
  text-align: left;
  margin-left: 46px;
  height: 150px;
  overflow: hidden;
  p {
    padding-bottom: 3px;
  }
  .ridos {
    display: inline-block;
    width: 350px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .el-checkbox__input {
    cursor: pointer;
    outline: 0;
    line-height: 1;
    vertical-align: super;
  }
}
.cmmwt {
  padding-bottom: 26px;
  font-size: 15px;
  width: 471px;
  margin: 0 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: bold;
  span {
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 10px;
  }
}
</style>


