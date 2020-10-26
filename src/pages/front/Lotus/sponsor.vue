<template>
  <div class="content sponsor">
    <div class="content_top">
      <p class="content_p">
        <el-breadcrumb separator="/" class="page-breadcrumb">
          <el-breadcrumb-item :to="{path:'/maindeskindex'}">主工作台</el-breadcrumb-item>
          <el-breadcrumb-item>发起审批</el-breadcrumb-item>
        </el-breadcrumb>
      </p>
      <div class="content_box">
        <div class="content_title">
          <!-- 归档库借阅审批特殊处理 -->
          <div class="flex a-center company-wrap" v-if="onlyProjectName">
            <i class="project-company iconfont jianzhu color-primary"></i>
            <span class="company-name ellipsis1 ml-3">{{projectName}}</span>
          </div>
          <!-- 一般流程 -->
          <toggle-project v-else type="sponsor" :projectId="value" :reset="projectReset" @change-project="handleChangeProject"></toggle-project>
        </div>
      </div>
    </div>
    <div id="business-wrap" class="business-tree">
      <div id="business-wrap-tree">
        <business-tree @method="handleMethods" :project="businessProject" :default="true"></business-tree>
      </div>
      <div id="business-wrap-content" class="business-content">
        <business-process :business="bussinessMessage" @operate="handleOperate" :project="businessProject"
                          :abc="abc"></business-process>
      </div>
    </div>

    <el-dialog :title="procNamedos+'审批'"
               class="lxsq_box"
               center top="80px"
               @close="closes"
               :visible.sync="dialogVisibles"
               width="800px"
               :close-on-click-modal="false"
               :before-close="handleClose">
      <i
        style="display: inline-block;width: 800px;background: #cccc;height: 1px;margin-top: -23px;float: left;margin-left: -26px;"></i>
      <div class="project">
        <!-- <p></p> -->
        <div class="project1 xm_message">
          <nav id="xm_message">
            <span>审批类型：{{Typeapproval}}</span><span>业务类型：{{currentgeneration}}</span>
            <span style="margin-left: 371px;">当前阶段：{{!Typesoffinancing || Typesoffinancing === '' ? '无' : Typesoffinancing}}</span>
          </nav>
          <div style="line-height: 48px;">项目信息</div>
          <ul>
            <li style="margin-left:6%;">
              <p style="border: none;">
                <i style="color:red;padding-right: 3px;"><i v-show="Regulars != 1">*</i></i>
                <i>项目名称：</i>
                <span>
                  <select-lazy
                    v-model="value"
                    size="mini"
                    @change="procTypeIds"
                    filterable placeholder="请选择"
                    :list="options">
                  </select-lazy>
                  <!-- <el-select v-model="value" size="mini" @change="procTypeIds" filterable placeholder="请选择" style="width:250px;">
                    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select> -->
                </span>
              </p>
            </li>
            <li style="margin-left:12%;">
              <p style="border: none;">
                <i style="color:red;padding-right: 3px;"><i v-show="Regulars != 1">*</i></i>
                <i>项目编码：</i>
                <span>
                  <el-input size="mini" v-model="xmbhsss" disabled placeholder="请选择项目编码"
                            style="width:250px;"></el-input>
                </span>
              </p>
            </li>
            <li style="width: 50%;" v-show="isMultiDept.isMultiDept">
              <p style="border: none;">
                <i style="color:red;padding-right: 3px;">*</i>
                <i>发起人所属部门：</i>
                <span>
                  <el-select v-model="isMultiDeptvalue" size="mini" @change="procTypeIds" filterable placeholder="请选择"
                             style="width:250px;">
                    <el-option v-for="item in isMultiDept.deptList" :key="item.id" :label="item.name"
                               :value="item.id"></el-option>
                  </el-select>
                </span>
              </p>
            </li>
            <li v-for="(item,index) in inputdata.form" v-if="plain" :key="index">
              <p style="border: none;" v-if="item.type.name == 'date'">
                <i style="color:red;padding-right: 3px;">*</i>
                <i>{{item.name}}：</i>
                <span>
                  <el-date-picker v-model="list[index]" type="date" placeholder="选择日期"
                                  @focus="$utils.handleTimeFocus"></el-date-picker>
                </span>
              </p>
              <p style="border: none;" v-else>
                <i style="color:red;padding-right: 3px;">*</i>
                <i>{{item.name}}：</i>
                <span>
                  <el-input size="mini" v-model="list[index]" placeholder="请输入内容"></el-input>
                </span>
              </p>
            </li>
            <!-- 6 -->
            <li class="xm_messageul" v-for="(item,index) in inputdata.form" style="padding-bottom: 15px;"
                :class="['endreson','endsay'][index]" v-if="plain2" :key="item">
              <p class="clearfix" style="border: none;margin-left: 1px;"
                 v-if="item.id == 'reason' || item.id == 'description' || item.type.name == 'string'">

                <!-- <i style="color:red;padding-right: 3px;">*</i> -->
                <i style="margin-top: -1px;float: left;">{{item.name}}：</i>
                <span style="width: 246px;margin-left:5px;">
                  <!-- <textarea name style="float: left;height: 72px;width: 207px;"  type="textarea" id="inputs" v-model="list[index]" placeholder="最多输入1000字" maxlength="1000"   cols="30" rows="10"></textarea> -->
                  <el-input size="mini" type="textarea" resize="none" id="inputs" maxlength="1000" v-model="list[index]"
                            placeholder="请输入内容"></el-input>
                </span>
              </p>
              <p v-else style="border: none;">
                <i style="color:red;padding-right: 3px;">*</i>
                <i>{{item.name}}：</i>
                <span>
                  <el-input size="mini" v-model="list[index]" placeholder="请输入内容`"></el-input>
                </span>
              </p>
            </li>
          </ul>
        </div>
        <div class="proend" style="margin-left: -8px;">
          <p style="font-weight:400;color:#666;text-align:left;">
            <i style="color:red;padding-right: 5px;margin-left:4px;text-align:left;">*</i>申请内容：
          </p>
          <div style="float: left;margin-left: 113px;width: 641px;margin-top: -15px;">
            <sponsor ref="selfEditer" :html2="html2" @htmls2="htmls2" :changes="changes"/>
          </div>
        </div>
        <!-- 上传附件 -->
        <div class="upload_file" v-if="seensks">
          <div class="attactment">
            <span class="first-title"><i style="color:red;padding-right: 3px;">*</i>{{sjwj}}</span>
            <add-attachment ref="attachmentCheck"
                            :showDisabled="sjwj==='待审文件'"
                            :projectRequired="true"
                            :projectId="queryDocProjectId"
                            @select="$utils.handleSelect(arguments, selectedFileListCheck)"></add-attachment>
          </div>

          <ul class="file_list" style>
            <li v-for="(item, ind) in selectedFileListCheck" :key="ind">
              <p class="attachemnt-list-title">
                <i class="doc-name" @click="$utils.handleUploadFilePreview(item, queryDocProjectId)"
                   :title="item.docName">{{item.docName}}</i>
                <i class="doc-delete color-primary" @click="$utils.handleDeleteSelected(selectedFileListCheck,item)">&nbsp;删除</i>
              </p>
            </li>
          </ul>
        </div>
        <!-- 待审目录 -->
        <div class="upload_file" v-if="seensk">
          <div class="attactment">
            <span class="first-title">上传附件</span>
            <add-attachment ref="attachment"
                            :projectRequired="true"
                            :projectId="queryDocProjectId"
                            @select="$utils.handleSelect(arguments,selectedFileList)"></add-attachment>
          </div>

          <ul style="text-align: left;max-height: 100px;overflow: auto" class="attachment-wrap">
            <li v-for="(item, index) in selectedFileList" class="attachemnt-list-item" :key="index">
              <p class="attachemnt-list-doc">
                <span class="doc-name" @click="$utils.handleUploadFilePreview(item, queryDocProjectId)"
                      :title="item.docName">{{item.docName}}</span>
                <span>
                  <el-button type="text" @click="$utils.handleDeleteSelected(selectedFileList, item)">删除</el-button>
                </span>
              </p>
            </li>
          </ul>

        </div>
        <div class="project3 shhj">
          <div class="first-title">审批环节</div>
          <div v-show="MultiDeptvalue" style="padding: 3%;">
            请填完必填项，会默认展示审批流程图。
          </div>
          <div v-show="!MultiDeptvalue">
            <h5 style="margin-left: 37px;margin-top: 26px;font-size: 14px;font-weight: bold;">发起人：<span
              style="font-weight: 100;">{{faname}}</span></h5>
            <ul class="sp_people">
              <li style="margin-top:24px;margin-left: 36px;text-align:left;">
                审批人
                <i>（审批方式:{{inputdata.approveType}}）</i>
              </li>
              <div id="copypeo">
                <el-scrollbar style="height:100%">
                  <li style="padding-left: 6%;margin-left: 1px;" class="sh_people">
                    <div class="sh_people_box">
                    <span class="sh_people_name" v-for="(tag,index) in  inputdata.approvalName" :key="index">
                      {{tag}}
                      <span class="sh_people_line" v-if="index != (inputdata.approvalName.length -1)"></span>
                    </span>
                      <span style="clear:both:height:0"></span>
                    </div>
                  </li>
                </el-scrollbar>
              </div>
            </ul>
            <span v-if="inputdata.noAudit" class="infored">注：审批流程涉及项目角色，需要选择项目后显示审批人。</span>
            <ul>
              <li style="margin-left: 36px;text-align:left;">
                抄送人
                <i>（抄送方式:审批通过后通知）</i>
              </li>
              <div id="copypeo">
                <el-scrollbar style="height:100%;">
                  <li style="margin-left: 6%;width: 700px;" class="cs_people">
                    <el-tag class v-for="(tag,index) in  inputdatacopyName" :key="index"
                            style="margin-left: 3px;margin-top: 3px;">{{tag}}
                    </el-tag>
                    <el-tag v-for="(tag,idx) in ches" :key="idx" closable @close="closess(tag)" :type="tag.type"
                            style="margin-left: 3px;margin-top: 3px;">{{tag.name}}
                    </el-tag>
                    <!-- <span @click="addpeople" style="margin-left: -6px;">
                    <span class="iconfont webicon308 color-primary"></span>
                    <span class="pro5">待添加</span>
                  </span> -->

                    <el-button type="text" class="color-primary" @click="addpeople">
                      <i class="iconfont webicon308"></i><span>添加抄送人</span>
                    </el-button>
                  </li>
                </el-scrollbar>
              </div>
            </ul>
            <span v-if="inputdata.noCopyUser" class="infored">注：审批流程涉及项目角色，需要选择项目后显示抄送人。</span>
          </div>
        </div>
      </div>
      <div id="dialog-footer">
        <el-checkbox v-model="isSetRamindchecked" style="margin-right:20px;">是否设置提醒</el-checkbox>
        <el-button size="medium" @click="closemediumDialog">取 消</el-button>
        <el-button size="medium" type="primary" :disabled="disableds" @click="submitApprove">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="提示"
      :close-on-click-modal="false"
      :visible.sync="checkout"
      width="450px"
      :before-close="handleClose">
      <div>
        <div :title="checkoutmsg"
             style=" word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;">
          <i class="el-icon-warning" style="font-size: 16px;vertical-align: text-bottom;color: #e6a23c;"
             aria-hidden="true"></i>
          {{checkoutmsg}}
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="small" @click="checkout = false">我知道了</el-button>
        </span>
    </el-dialog>
    <!-- 是否设置提醒弹框 -->
    <el-dialog
      title="审批提醒"
      :visible.sync="approveRemind"
      width="720px"
      :before-close="handleCloseremind" class="examine">
      <div style="height: calc(100vh - 400px);">
        <el-scrollbar style="height: 100%">
          <el-form :model="formInline" class="demo-form-inline" label-width="100px" style="text-align:left">
            <el-form-item label="提醒方式：" class="remindRight">
              <el-checkbox-group v-model="remindWay" :min="1" @change="aaa">
                <el-checkbox v-for="way in remindWayGrounp" :label="way.label" :key="way.value">{{way.label}}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="接收人员：" class="remindRight">
              <el-tag class v-for="(tag,index) in  inputdatapprovalName" :key="index"
                      style="margin-left: 3px;margin-top: 3px;" @close="deletePerFnexam(tag,index)"
                      :closable="inputdatapprovalName.length == 1?false:true">{{tag}}
              </el-tag>
              <!-- <el-tag v-for="(tag) in ches" :key="tag.id" :closable="!chack_bule" @close="cdeletePerFnexam(tag)" :type="tag.type" style="margin-left: 3px;margin-top: 3px;" >{{tag.name}}</el-tag> -->
            </el-form-item>
            <el-form-item label="提醒内容：" class="remindRight">
              <el-input type="textarea" cols="40" rows="5" resize="none" v-model.trim="formInline.contentMessage"
                        maxlength="100"></el-input>
              <!-- <el-input type="textarea" cols="40" rows="5" resize="none" v-model.trim="formInline.contentEmial"  maxlength="100" class="remindContent" v-if="contentEmial"></el-input>
                        <el-input type="textarea" cols="40" rows="5" resize="none" v-model.trim="formInline.contentNote"  maxlength="100" class="remindContent" v-if="contentNote"></el-input> -->
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
      <span slot="footer" class="dialog-footer">
            <el-button @click="approveRemindclose">取 消</el-button>
            <el-button type="primary" @click="approveRemindSave">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 是否设置提醒弹框文件借阅和归档的设置提醒 -->
    <el-dialog
      title="审批提醒"
      :visible.sync="approveRemindfile"
      width="720px"
      :before-close="handleClosefile" class="examine">
      <div style="height: calc(100vh - 400px);">
        <el-scrollbar style="height: 100%">
          <el-form :model="formInlinefile" class="demo-form-inline" label-width="100px" style="text-align:left">
            <el-form-item label="提醒方式：" class="remindRight">
              <el-checkbox-group v-model="remindWayfile" @change="bbb" :min="1">
                <el-checkbox v-for="way in remindWayGrounpfile" :label="way.label" :key="way.value">{{way.label}}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="接收人员：" class="remindRight">
              <el-tag class v-for="(tag,index) in  inputdatapprovalNamefile" :key="index"
                      style="margin-left: 3px;margin-top: 3px;" @close="deletePerFnexamfile(tag,index)"
                      :closable="inputdatapprovalNamefile.length == 1?false:true">{{tag}}
              </el-tag>
              <!-- <el-tag v-for="(tag) in ches" :key="tag.id" :closable="!chack_bule" @close="cdeletePerFnexam(tag)" :type="tag.type" style="margin-left: 3px;margin-top: 3px;" >{{tag.name}}</el-tag> -->
            </el-form-item>
            <el-form-item label="提醒内容：" class="remindRight">
              <el-input type="textarea" cols="40" rows="5" resize="none" v-model.trim="formInlinefile.contentMessage"
                        maxlength="100"></el-input>
              <!-- <el-input type="textarea" cols="40" rows="5" resize="none" v-model.trim="formInline.contentEmial"  maxlength="100" class="remindContent" v-if="contentEmial"></el-input>
                        <el-input type="textarea" cols="40" rows="5" resize="none" v-model.trim="formInline.contentNote"  maxlength="100" class="remindContent" v-if="contentNote"></el-input> -->
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
      <span slot="footer" class="dialog-footer">
            <el-button @click="approveRemindclosefile">取 消</el-button>
            <el-button type="primary" @click="approveRemindSavefile">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 文件借阅弹窗 -->
    <el-dialog title="文件借阅" class="borrow_dialog" :close-on-click-modal="false" :visible.sync="borrowVisible"
               :before-close="borrowCloseFn" width="958px">
      <div class="borrow_middle">
        <div class="borrow_middle_chunk">
          <span class="borrow_middle_chunk_title">借阅方式:</span>
          <div class="borrow_middle_chunk_type">
            <el-radio v-model="borrow_radio" label="1" @change="borrowTypeFn">电子借阅</el-radio>
            <el-radio v-model="borrow_radio" label="0" @change="borrowTypeFn">纸质借阅</el-radio>
          </div>
        </div>
        <div class="borrow_middle_chunk">
          <span class="borrow_middle_chunk_title">借阅时间:</span>
          <div class="borrow_middle_chunk_time">
            <div class="borrow_middle_chunk_time_top">
              <el-select v-model="borTime_select" placeholder="请选择借阅时间">
                <el-option
                  v-for="item in borTime_options"
                  :key="item.id"
                  :label="item.borrowingTime + '小时'"
                  :value="item.borrowingTime">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="borrow_middle_chunk">
          <div class="borrow_middle_chunk_left">
            <div class="borrow_middle_chunk_left_top" v-on:keyup.enter="treeSearchFn">
              <el-input placeholder="请输入内容" v-model="tree_input" class="borrow_middle_chunk_left_top_search">
                <el-button slot="append" icon="el-icon-search" @click="treeSearchFn"></el-button>
              </el-input>
            </div>
            <div class="borrow_middle_chunk_left_bottom">
                <ul id="borrowTree" class="ztree borrowZtree" v-if="isSearchShow"></ul>
                <div v-else class="borrowList">
                  <p v-if="borrowSearchFileList.length === 0" class="borrowList_title">暂无数据</p>
                  <p v-for="(item,idx) in borrowSearchFileList" :key="idx" class="borrowList_item"
                     @click="listItemClickFn(item)" v-else>
                    <span class="borrowList_item_fileIcon"></span>
                    <span class="borrowList_item_title">{{item.docName}}</span>
                  </p>

                </div>
            </div>
          </div>
          <div class="borrow_middle_chunk_right">
            <p class="borrow_middle_chunk_right_title">文件名</p>
            <div class="borrow_middle_chunk_right_list">
              <el-scrollbar style="height:100%">
                <p class="borrow_middle_chunk_right_list_item" v-for="(item,idx) in borrowFileList" :key="idx">
                  <span class="borrow_middle_chunk_right_list_item_title">{{item.docName}}</span>
                  <span class="borrow_middle_chunk_right_list_item_del color-primary"
                        @click="borrowFileDelFn(item)">删除</span>
                </p>
              </el-scrollbar>
            </div>
          </div>
        </div>
        <div class="borrow_middle_chunk">
          <span class="borrow_middle_chunk_title">申请内容:</span>
          <div class="borrow_middle_chunk_remark">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8}"
              resize="none"
              placeholder="最多输入200字"
              maxlength="200"
              v-model="remark_textarea">
            </el-input>
          </div>
        </div>
        <!-- <div class="borrow_middle_chunk_content_remark">
                    <span class="borrow_middle_chunk_title">申请内容：</span>
                    <div class="borrow_middle_chunk_content_remark_content">
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 4, maxRows: 8}"
                            resize="none"
                            placeholder="最多输入200字"
                            maxlength="200"
                            v-model="remark_textarea">
                        </el-input>
                    </div>
                </div> -->
        <div v-show="initDocExamRoleinfo.key" style="padding-top: 2%;">
          <i class="bitians">*</i>发起人所属部门：
          <el-select size="small" v-model="isMultiDeptvalue" filterable @change="handleInitiatorSection()"
                     placeholder="请选择部门">
            <el-option
              v-for="item in isMultiDept.deptList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <!-- <div v-show="initDocExamRoleinfo.key" style="padding: 3%;">请填完必填项，会默认展示审批流程图。</div> -->
        </div>
        <div class="borrow_middle_chunk borrow_middle_chunk_details">
          <div class="borrow_middle_chunk_title">审批环节:</div>
          <div class="borrow_middle_chunk_content">
            <div v-show="isMultiDeptdata.isMultiDept">请填完必填项，会默认展示审批流程图。</div>
            <div v-show="!isMultiDeptdata.isMultiDept">
              <div class="borrow_middle_chunk_content_middle">
                <p class="borrow_middle_chunk_content_middle_title initiate_title">
                  <span class="borrow_middle_chunk_content_middle_title_people">发起人:</span>
                  <span class="initiate_people">{{$store.state.loginObject.userName}}</span>
                </p>
              </div>
              <div class="borrow_middle_chunk_content_middle">
                <p class="borrow_middle_chunk_content_middle_title">
                  <span class="borrow_middle_chunk_content_middle_title_people">审批人:</span>
                  <span class="borrow_middle_chunk_content_middle_title_annotation">（审批方式：{{approveType}}）</span>
                </p>
                <div class="borrow_middle_chunk_content_middle_list">
                  <el-tag
                    :key="idx"
                    v-for="(tag,idx) in approvalNameArray"
                    :closable="false"
                    :disable-transitions="false"
                  >
                    {{tag}}
                  </el-tag>
                  <!-- <span v-for="(item,idx) in approvalNameArray" class="borrow_middle_chunk_content_middle_list_chunk">{{item}}</span> -->

                </div>
              </div>
              <div class="borrow_middle_chunk_content_middle">
                <p class="borrow_middle_chunk_content_middle_title">
                  <span class="borrow_middle_chunk_content_middle_title_people">抄送人:</span>
                  <span class="borrow_middle_chunk_content_middle_title_annotation">（抄送方式：审批通过后通知）</span>
                </p>
                <p class="borrow_middle_chunk_content_middle_operation color-primary" @click="addpeople">
                  <i class="iconfont webicon308"></i><span>添加抄送人</span>
                </p>
                <div class="borrow_middle_chunk_content_middle_list">
                  <el-tag
                    :key="idx"
                    v-for="(tag,idx) in copyNameArray"
                    :closable="false"
                    :disable-transitions="false"
                  >
                    {{tag}}
                  </el-tag>
                  <el-tag
                    :key="idx"
                    v-for="(tag,idx) in ches"
                    :closable="true"
                    :disable-transitions="false"
                    @close="handleCloseFn(tag)"
                  >
                    {{tag.name}}
                  </el-tag>
                </div>
              </div>
            </div>
            <!-- <div class="borrow_middle_chunk_content_remark">
                    <span class="borrow_middle_chunk_title">申请内容：</span>
                    <div class="borrow_middle_chunk_content_remark_content">
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 4, maxRows: 8}"
                            resize="none"
                            placeholder="最多输入200字"
                            maxlength="200"
                            v-model="remark_textarea">
                        </el-input>
                    </div>
                </div> -->
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
            <el-checkbox v-model="isSetRamindcheckedfile" style="margin-right:20px;">是否设置提醒</el-checkbox>
            <el-button size="medium" @click="borrowCloseFn">取消</el-button>
            <el-button size="medium" type="primary" @click="submitApprovefile">提 交</el-button>
        </span>
    </el-dialog>
    <!--项目归档（底稿归档）-->
    <el-dialog :title="titleguidang" :close-on-click-modal="false" class="proPigeonhole_dialog" @close="proPigeo"
               :visible.sync="proPigeonholeVisible" width="818px">
      <div class="pigeonhole_middle">
        <p class="p_middle_title">底稿归档</p>
        <div class="p_middle_nav">
          <div class="p_middle_nav_chunk">
            <span class="proPigeonhole_title p_middle_nav_chunk_title_proName" title="项目名称">项目名称:</span>
            <div class="p_middle_nav_chunk_proName">
              <el-input placeholder="请输入内容" class="" :disabled="true" v-model="proPigeonholeName_input"></el-input>
            </div>
          </div>
          <div class="p_middle_nav_chunk">
            <span class="p_middle_nav_chunk_title p_middle_nav_chunk_title_proNumber">项目编码:</span>
            <div class="p_middle_nav_chunk_proNumber">
              <el-input placeholder="请输入内容" class="" :disabled="true" v-model="proPigeonholeNumber_input"></el-input>
            </div>
          </div>
        </div>
        <div class="p_middle_pigeonholeStage">
          <span class="proPigeonhole_title" title="归档阶段">归档阶段:</span>
          <div class="p_middle_pigeonholeStage_stage">
            <el-input placeholder="请输入内容" class="" :disabled="true" v-model="stage_input"></el-input>
          </div>
        </div>
        <div class="p_middle_remark" v-for="(item,idx) in remarkFromArray" :key="idx">
          <span class="proPigeonhole_title" :title="item.name">{{item.name}}:</span>
          <div class="p_middle_remark_content">
            <el-input
              type="textarea"
              :autosize="{ minRows: 7, maxRows: 14}"
              resize="none"
              :placeholder="'请输入'+item.name"
              maxlength="1000"
              v-model="item.value">
            </el-input>
          </div>
        </div>
        <div style="padding-top: 13px" v-show="initDocExamRoleinfo.key">
          <i class="bitians">*</i>发起人所属部门：
          <el-select size="medium" v-model="isMultiDeptvalue" filterable @change="handleInitiatorSection()"
                     placeholder="请选择部门">
            <el-option
              v-for="item in isMultiDept.deptList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="p_middle_audit">
          <span class="proPigeonhole_title" title="审批环节">审批环节:</span>
          <div class="p_middle_audit_content">
            <div class="p_middle_audit_content_middle" v-show="!isMultiDeptdata.isMultiDept">
              <p class="p_middle_audit_content_middle_title initiate_title">
                <span class="p_middle_audit_content_middle_title_people">发起人:</span>
                <span class="initiate_people">{{$store.state.loginObject.userName}}</span>
              </p>
            </div>
            <div class="p_middle_audit_content_middle" v-show="!isMultiDeptdata.isMultiDept">
              <p class="p_middle_audit_content_middle_title">
                <span class="p_middle_audit_content_middle_title_people">审批人:</span>
                <span class="p_middle_audit_content_middle_title_annotation">（审批方式：{{approveType}}）</span>
              </p>
              <div class="p_middle_audit_content_middle_list">
                <el-tag
                  :key="idx"
                  v-for="(tag,idx) in approvalNameArray"
                  :closable="false"
                  :disable-transitions="false"
                >
                  {{tag}}
                </el-tag>
              </div>
            </div>
            <div class="p_middle_audit_content_middle" v-show="!isMultiDeptdata.isMultiDept">
              <p class="p_middle_audit_content_middle_title">
                <span class="p_middle_audit_content_middle_title_people">抄送人:</span>
                <span class="p_middle_audit_content_middle_title_annotation">（抄送方式：审批通过后通知）</span>
              </p>
              <p class="p_middle_audit_content_middle_operation color-primary" @click="addpeople">
                <i class="iconfont webicon308"></i><span>添加抄送人</span>
              </p>
              <div class="p_middle_audit_content_middle_list">
                <el-tag
                  :key="idx"
                  v-for="(tag,idx) in copyNameArray"
                  :closable="false"
                  :disable-transitions="false"
                >
                  {{tag}}
                </el-tag>
                <el-tag
                  :key="idx"
                  v-for="(tag,idx) in ches"
                  :closable="true"
                  :disable-transitions="false"
                  @close="handleCloseFn(tag)"
                >
                  {{tag.name}}
                </el-tag>
              </div>
            </div>
            <div class="p_middle_audit_content_remark">
              <span class="p_middle_audit_content_remark_title" title="申请内容">申请内容:</span>
              <div class="p_middle_audit_content_remark_content">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 7, maxRows: 14}"
                  resize="none"
                  placeholder="请输入申请内容，最多输入200字"
                  maxlength="200"
                  v-model="remark_textarea">
                </el-input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
            <el-checkbox v-model="isSetRamindcheckedfile" style="margin-right:20px;">是否设置提醒</el-checkbox>
            <el-button @click="cancelPigeonholeFn">取 消</el-button>
            <el-button type="primary" @click="submitApprovefile">提交</el-button>
        </span>
    </el-dialog>

    <findAllDeptUser v-on:findAllUser="findAllUsers"
                     :findUserObj="findUserObj"
                     :findFlagShow.sync="findAllDeptUsers"
                     :findState="findState" :checkState="checkState"/>
    <upload-add-doc v-if="addDoc" ref="uploadRef" :uploadDocAddIsShow="uploadDocAddIsShow"
                    @sendValueToParent="sendValueToParentFn" @docUpload="docUploadFn"
                    @docUploadAllsucess="docUploadAllsucess" :uploadParamData="uploadParamData"></upload-add-doc>
    <relation-Add-Doc v-if="relafag" @clearstate="clears" @elationUp="elationUpFn"
                      :getProjectId="proid"></relation-Add-Doc>
    <manuscript-Add-Doc v-if="relafagmanus" @clearstate="clearsmacuse" :manscProjectId="mancDocProjectId"
                        @elationUpmansc="elationUpmanscFn"></manuscript-Add-Doc>
    <exam-relation-Add-Doc v-if="selectProjectDocIsShow" @clearstates="clearstates" @elationUp="selectProjectDocSure"
                           :getProjectId="proid"></exam-relation-Add-Doc>
    <input type="file" id="fileBtn" style="display:none"/>
  </div>
</template>
<script>
  // 编辑器
  import sponsor from "@/components/select_box/sponsor";
  // 选择人员
  import findAllDeptUser from "@/components/select_box/findAllDeptUserMultipleNew";
  import uploadAddDoc from "@/components/file/uploadAddDoc";
  import relationAddDoc from "@/components/relation/relation";
  import examRelationAddDoc from "@/components/relation/projectDocRelation";
  import manuscriptAddDoc from "@/components/relation/manuscript";
  import previewApprovalMessage from "@/components/select_box/previewApprovalMessage"

  export default {
    components: {
      sponsor,
      uploadAddDoc,
      relationAddDoc,
      findAllDeptUser,
      examRelationAddDoc,
      manuscriptAddDoc,
      previewApprovalMessage
    },
    data() {
      return {
        flowValue: {},
        valueCatch: '',
        // 底稿归档参数
        proPigeonholeVisible: false, //控制项目归档弹框开关
        proPigeonholeName_input: '', //归档项目名称
        proPigeonholeNumber_input: '', //归档项目编码
        remark_textarea: '', //归档备注
        stageArray: [], //归档阶段数组
        stage_input: '', //归档阶段
        inputdatapprovalName: [],
        inputdatapprovalNamefile: [],
        approvalNameArray: [], //审批人列表
        flowChartObj: {}, //流程图数据
        findFlag: false, //选择弹框开关
        extCopyArray: [], //后选择抄送人数组
        pigeonholeFlag: false,
        isFromStop: false,//是否是从项目终止库跳转过来的
        //利益冲突核查报告相关
        reportListVisible: false,//是否显示利益冲突核查报告列表
        compResultVisible: false,//是否显示利益冲突比对结果报告
        reportListData: [],//利益冲突核查报告列表
        reportProjectName: '',//利益冲突核查报告列表搜索条件
        curProIsHasCrm: false,//当前项目在新建之前是否有客户信息和中介机构
        //选择客户相关
        seleCrmVisible: false,//选择客户弹窗
        tableData: [],//表格数据
        search_form: {//搜索条件
          name: '',
          principal: '',
          type: '',
          status: '',
          indexId: '',
          indexId2: ''
        },
        // --------------------------------end
        // 底稿借阅参数
        requestCode: {},
        isMultiDeptdata: {},
        pigeonholeTableData: [], //归档库列表数据
        borrowVisible: false, //控制借阅弹框开关
        nowIsBorrow: false, //是否借阅
        borrow_radio: '1', //借阅里借阅方式单选
        borrowRecordVisible: false, //控制借阅记录弹框开关
        borPeople_input: '', //借阅记录借阅人
        borTime_select: '', //借阅时间下拉
        borTime_options: [], //借阅时间下拉数据
        tree_input: '', //借阅树结构的搜索
        borrowRemark_textarea: '', //借阅理由备注信息
        reqApi: '', //动态请求地址
        borrowZnodes: [], //借阅树结构
        borrowSetting: {  //借阅树结构zTree默认配置
          data: {
            simpleData: {
              enable: true,
              pIdKey: 'parentId',
              idKey: 'id',
              rootPId: 0
            },

            key: {
              name: 'docName'
            },

          },
          view: {
            selectedMulti: false,
            showLine: false,
            dblClickExpand: false
          },
          edit: {
            enable: false,
            editNameSelectAll: true,
            showRemoveBtn: false,
            showRenameBtn: false
          },
          async: {
            enable: true,
            url: this.getAsyncUrl,
            contentType: "application/json",
            dataType: "json",
            autoParam: [],
            otherParam: this.getAsyncData,
            dataFilter: this.treeFilterFn
          },
          callback: {
            onClick: this.zTreeOnClickFn,
            onAsyncSuccess: this.onAsyncSuccessFn,
          }
        },
        isSearchShow: true, //是否搜索显示结果
        borrowTreeDemo: '',
        borrowSearchFileList: [],
        borrowFileList: [],
        currentItemData: "", //当前这条借阅的数据
        approveType: '', //审批类型
        copyNameArray: [], //抄送人列表
        copyNameCode: [], // 抄送人id
        remarkFromArray: [],
        // ------------------------------end-------------------------
        examine: {},
        businessProject: {},
        bussinessMessage: {},
        projectReset: true,
        examineMessage: {},
        selectedFileListCheck: [],
        selectedFileList: [],
        checkout: false,
        // needAgainQuery:true,
        checkoutmsg: "",
        Regulars: "",
        node: "",
        resolve: "",
        isMultiDept: [],
        isMultiDeptvalue: '',
        MultiDeptvalue: '',
        isFirst: true,
        leftTreeProps: {
          label: "docName",
          children: "child",
          // isLeaf: 'leaf'
          isLeaf: "docType" === 1 ? "false" : "true"
        },
        html2: "",
        xmwds: true,
        Typeapproval: "无",
        currentgeneration: "无",
        Typesoffinancing: "无",
        xmbhsss: "",
        faname: "",
        xmwds2: false,
        uploadnum: "",
        changes: {},
        html2sss: '',
        selectProjectDocIsShow: false,
        procNamedos: "",
        shagchaunlist2: [],
        shagchaunlists2: [],
        progStageIdids: "",
        currentStageId: "",
        shagchaunlists: [],
        options: [],
        queryDocProjectId: "",
        procTypeId: "",
        sjwj: "",
        xmbh: "",
        value: "",
        plain2: false,
        procTypeIdss: "",
        mancDocProjectId: "",
        seensk: false,
        seensks: false,
        plain: true,
        ches: [],
        extCopy: [],
        disableds: false,
        //上传控制
        findState: {},
        inputdatacopyNamesss: [],
        inputdatacopyName: [],
        inputdatacopyCode: [],
        checkState: {},
        _findAllDeptUsers: false,
        get findAllDeptUsers() {
          return this._findAllDeptUsers;
        },
        set findAllDeptUsers(value) {
          this._findAllDeptUsers = value;
        },
        uploadDocAddIsShow: false,
        addDoc: false,
        uploadParamData: {
          docSource: 7,
          projId: "",
          // projId:,
          parentId: 0,
          auditProjectId: null
        },
        success_code: "",
        shagchaun: [],
        copymess: '',
        shagreatlists: [],
        shagreatl: [],
        uploadingFnstrw: "",
        // 关联附件
        relafag: false,
        itemname: "",
        take_remake: "",
        sonObj: [],
        perObj: [],
        opt_file: true,

        newarr: "",
        first1: true,
        firststate: false,
        arrs: [],
        revocation: false,
        procName: "",
        dialogVisibles: false,
        projectName: "",
        selectedDocList: [],
        selectedDocListId: [],
        selectedDoc: [],
        initDocExamRoleinfo: {},
        pageSize: 10,
        pageSizes: [10, 20, 50, 100], //每页显示数量
        currentPage: 1, //当前页
        dataTotal: 0, //总量,
        inputdata: "",
        items: "",
        list: {
          0: "",
          1: "",
          2: "",
          3: ""
        },
        shagreatlist: [],
        shagchaunlist: [],
        relafagmanus: false,
        newProjectDialogTimer: null,
        findUserObj: [],
        isSetRamindchecked: false,  //是否设置提醒勾选
        approveRemind: false, //设置提醒弹框出现
        remindWay: ['站内信'],
        remindWayGrounp: [{
          label: "站内信",
          value: 0
        }],
        formInline: {
          content: '',
          contentMessage: '',
          contentNote: '',
          contentEmial: ''
        },
        chack_bule: false,
        //文件借阅的设置提醒
        isSetRamindcheckedfile: false,  //是否设置提醒勾选
        approveRemindfile: false, //设置提醒弹框出现
        remindWayfile: ['站内信'],
        remindWayGrounpfile: [{
          label: "站内信",
          value: 0
        }],
        formInlinefile: {
          content: '',
          contentMessage: '',
        },
        chack_bulefile: false,
        resdata: "", //获取审批类型数据的名称
        itemfordetaildata: "",//获取form_detail 的参数
        //归档表单的title
        titleguidang: '归档表单',
        dataRows: '',
        messagefailed: "",
        errorMsg: "",
        messagefailedfile: "",
        errorMsgfile: "",

        rmindaaa: ['站内信'],
        rmindbbb: ['站内信'],
        pronamesponer: '',
        abc: {
          name: "发起审批",
          isJump: false
        },
        onlyProjectName: false

      };
    },
    created() {
      this.$Examine()
      // 特殊处理：如果是由归档库发起借阅审批（多个流程）跳转过来的，不展示选择项目下拉框，直接展示项目名（bug：14322）
      if(this.$Business.processParams && this.$Business.processParams.pageFrom === 'archiveLibrary'){
        this.onlyProjectName = true
        this.projectName =this.$Business.processParams.procName
      }

    },
    mounted() {
      // this.$Examine()
      this.reqApi = global.baseUrl
      if (this.$Business.processParams) {
        this.projectReset = false
        this.$nextTick(() => {
          this.value = this.$Business.processParams.procName
          this.abc.isJump = !!(this.$Business.processParams.procName || this.$Business.processParams.procTypeName)
        })
      }
      this.faname = this.$store.state.loginObject.userName
      // var arr = this.$refs.outsideComponentRef;
      // arr[0].style.borderBottom = "2px solid #0061A9";
      // arr[0].style.color = "#0061A9";

      // var data = {
      //   token: this.$store.state.loginObject.userToken,
      //   userId: this.$store.state.loginObject.userId,
      //   data: {}
      // };
      // // 获取所有融资顶级类型列表
      // var url = "/info/project/getTopFinanceTypeList";
      // var _this = this;
      // this.$post(url, data)
      //   .then((response) => {
      //     response.data.push({
      //       id: "普通审批",
      //       name: "普通审批"
      //     })
      //     _this.data_xz = response.data;

      //     // _this.content_xzs("", "", response.data[0].id);
      //     _this.ids(response.data[0].id, response.data[0]);
      //     _this.idss = response.data[0].id;
      //     _this.itemname = response.data[0].name;
      //   })
      //   .catch(function (error) {
      //     // console.log(error);
      //   });
      this.getPromptType()
      this.getPromptTypefile()

      this.$nextTick(() => {
        let wrapWidth = $('#business-wrap').width()
        let treeWidth = $('#business-wrap-tree').width()
        // $('#business-wrap-content').width('100%')
        $('.business-tree').css({'min-height': $('.business-tree').height()})
        $('.business-tree').css({'min-width': $('.business-tree').width()})
      })
    },
    beforeDestroy() {
      if (this.newProjectDialogTimer) {
        clearInterval(this.newProjectDialogTimer)
      }
    },
    methods: {
      // 部门发起人所属部门方法
      async handleInitiatorSection() {
        let data = await this.examine.formDetailNew(this.isMultiDeptvalue)
        this.copyNameCode = data.copyNameCode;
        this.copyNameArray = data.copyNameStore;
        this.approvalNameArray = data.approvalNameStore;
        if (this.examine.approvalsForm.isMultiDept) {
          this.isMultiDeptdata.isMultiDept = false
        }
        if (this.examine.procTypeId === 8 && data.form != undefined) {
          this.remarkFromArray = res.data.form;
        }
      },


      handleCloseFn(itemValue) { //删除当前的抄送人
        this.ches.splice(this.ches.indexOf(itemValue), 1)
      },
      getAsyncUrl() { //配置底稿目录树请求地址
        return `${this.reqApi}/doc/paper/getProjectPaperFileParentId`
        // return 'http://192.168.6.230:212/doc/paper/query'
      },
      getAsyncData(treeId, treeNode) { //配置底稿目录树请求数据
        if (treeNode) {
          return {
            token: this.$store.state.loginObject.userToken,
            userId: this.$store.state.loginObject.userId,
            pageNo: 0,
            pageSize: 500,
            data: {
              parentId: treeNode.id,
              projectId: this.currentItemData.projectId,
              docType: 1,
              borringType: this.borrow_radio
            }
          }
        }
      },
      onAsyncSuccessFn(event, treeId, treeNode, msg) { //异步树成功加载
        var zTree = $.fn.zTree.getZTreeObj(treeId);
        zTree.updateNode(treeNode); // 异步加载成功后刷新树节点
      },
      treeFilterFn(treeId, parentNode, responseData) { //异步加载过滤树
        if (responseData.code == this.requestCode.ARGUMENT_ERROR) {
          return;
        } else if (responseData.code == this.requestCode.DOC_FIlE_TYPE_MISMATCH) {
          return;
        } else {
          responseData.data.content.forEach((item) => {
            if (item.docType === 1) {
              item.isParent = true;
              item.iconSkin = "diy01";
              item.checked = false;
            } else {
              item.iconSkin = "diy03"
            }
          })
          return responseData.data.content;
        }
      },
      zTreeOnClickFn(e, treeId, treeNode) { //点击树
        this.borrowTreeDemo.expandNode(treeNode);
        this.targetTreeNode = treeNode;
        if (treeNode.borringFlag && treeNode.docType != 1) {
          this.$message.warning(this.borrow_radio == '1' ? '你已经借过当前文件' : '底稿已被借用')
          return;
        }
        if (treeNode.docType != 1) {
          let newObj = this.borrowFileList.find(v => treeNode.id == v.id)
          if (newObj == undefined) {
            this.borrowFileList.push(treeNode)
          }
        }

      },
      listItemClickFn(itemValue) { //点击查询后列表每条
        if (itemValue.borringFlag && itemValue.docType != 1) {
          this.$message.warning('你已经借过当前文件');
          return;
        }
        let newObj = this.borrowFileList.find(v => itemValue.id == v.id)
        if (newObj == undefined) {
          this.borrowFileList.push(itemValue)
        }
      },
      borrowFileDelFn(itemValue) {
        this.borrowFileList.splice(this.borrowFileList.indexOf(itemValue), 1)
      },
      // 底稿归档逻辑
      proPigeo() {
        this.stage_input = ''
      },
      cancelPigeonholeFn() { //取消归档函数
        this.ches = [];
        this.proPigeonholeVisible = false;
      },
      savePigeonholeFn() { //提交归档函数
        if (this.initDocExamRoleinfo.key) {
          if (this.isMultiDeptvalue == "") {
            this.$message.error('请选择发起人所属部门')
            return
          }
        }
        let stageIds = [], stageNames = [], userIdArray = [], fromObj = {};
        this.stageArray.map((item, idx) => {
          // stageIds += item.id + ','
          // stageNames += item.name + ','
          stageIds.push(item.id)
          stageNames.push(item.name)
        })
        this.ches.map((item, idx) => {
          userIdArray.push(item.userId)
        })
        this.remarkFromArray.forEach(i => {
          fromObj = Object.assign(fromObj, {
            [i.id]: i.value
          })
        })
        let data = {
          projectName: this.examine.projectMsg.procName || this.examine.projectMsg.projectName || this.examine.projectMsg.name,
          sourceName: '发起审批',
          data: {
            modelId: this.examine.message.actModelId,
            deploymentId: this.examine.message.procDeployId,
            procName: this.examine.message.procName,
            versionId: this.examine.message.procVersionNum,
            financingTypeId: this.examine.message.finaTypeId,
            categoryId: 8, //归档
            projectName: this.examine.projectMsg.procName || this.examine.projectMsg.projectName || this.examine.projectMsg.name,
            projectId: this.examine.projectMsg.projectId,
            approvalType: 8, //归档
            userDept: this.isMultiDeptvalue,
            extCopy: userIdArray,
            formData: JSON.stringify(fromObj),
            stageIds: stageIds.join(','),
            stageNames: stageNames.join(','),
            remarks: this.remark_textarea
          }
        };


        this.$confirm('项目归档成功后不可恢复，请谨慎操作是否确认提交归档申请？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',

        }).then(() => {
          this.$post("/info/audit/start_process_instance", data).then((res => {
            this.disableds = false
            //   if(this.requestCode.SUCCESS !== res.code){
            //       this.$message.error(res.msg);
            //       return;
            //   }else if(res.code = -5022){
            //        this.$confirm(res.msg, '提示', {
            //         confirmButtonText: '我知道了',
            //         showCancelButton:false,
            //         type: 'warning'
            //         }).then(() => {
            //         }).catch(() => {
            //         });
            //     return
            //   }

            if (res.code == 0) {
              this.$Mit.approvalSuccessful.code = 200
              this.approveRemindfile = false;
              this.proPigeonholeVisible = false;
              this.$message.success(res.msg);
              this.shenpiId = res.data
              if (this.isSetRamindcheckedfile) {
                this.setRemaidfile()
                this.approveRemindfile = false;
              }
              this.isSetRamindcheckedfile = false;
              this.remindWayfile = ["站内信"]
            } else if (res.code == -5022) {
              this.$confirm(res.msg, '提示', {
                confirmButtonText: '我知道了',
                showCancelButton: false,
                type: 'warning'
              }).then(() => {
              }).catch(() => {
              });
            } else {
              this.$message.error(res.msg);
            }
          })).catch(error => {

          });
        }).catch(() => {
          //this.approveRemindfile = false;
        });
      },
      proPigeonhole() { //项目归档弹框开启
        this.finishNoPigeonholeQueryFn()
      },
      finishNoPigeonholeQueryFn() { //完成未归档查询函数
        this.$post("/info/projectSealUp/queryIsSealFlag", {
          data: {
            projectId: this.value
          }
        }).then((res => {
          this.stageArray = res.data;
          this.stageArray.map((item, idx) => {
            this.stage_input += item.name + ','
          })
          this.queryStagePastDoc();
        })).catch(error => {

        });
      },
      queryStagePastDoc() { //查询阶段下的设为底稿的审批通过的文件集合
        this.$post("/doc/paper/findIsExistPassFile", {
          data: {
            stageIds: this.stageArray.map(v => v.id).join(',')
          }
        }).then((res => {
          this.flowChartQueryFn(this.$Business.processParams.projectId)
        })).catch(error => {

        });
      },

      // 底稿借阅逻辑
      flowChartQueryFn(itemValue) { //流程图查询函数
        this.$post("/info/service/getProcessInfoByProjId", {
          data: {
            projId: itemValue,
            procTypeId: this.examine.procTypeId, //归档
          }
        }).then((res => {
          if (this.examine.procTypeId === 8) {
            this.proPigeonholeVisible = true;
          }
          this.flowChartObj = res.data;
          this.examineAndApproveQueryFn(res.data)
        })).catch(error => {
        });
      },
      examineAndApproveQueryFn(itemValue) { //审批环节查询函数
        //itemValue 流程图相关信息
        let data = {
          data: {
            modelId: itemValue.actModelId,
            versionId: itemValue.procVersionNum,
            deploymentId: itemValue.procDeployId,
            approvalType: 9, //归档
          }
        };
        this.$post("/info/audit/form_detail", data).then((res => {
          this.isMultiDeptdata = res.data
          this.remarkFromArray = res.data.form;
          this.approveType = res.data.approveType;

          this.initDocExamRoleinfo = {...{key: res.data.isMultiDept}}
          //console.log(this.inputdata.form)
          // if(this.inputdata)
          if (this.examine.procTypeId === 8) {
            this.approvalNameArray = res.data.approvalName;
            this.copyNameArray = res.data.copyName;
          } else {
            this.borrowVisible = true;
            this.itemfordetaildata = itemValue
            if (!this.isMultiDeptdata.isMultiDept) {
              // needAgainQuery为true重新查询审批人、抄送人
              if (res.data.needAgainQuery) {
                this.middlechunk(itemValue)
              } else {
                this.copyNameArray = res.data.copyName;
                this.approvalNameArray = res.data.approvalName;
                this.copyNameCode = res.data.copyCode;
              }
            }
            this.borrowTreeFn();
          }
        })).catch(error => {

        });
      },
      timeQueryFn() { //借阅时间的查询函数
        this.$post("/doc/project/selectDocPaperBorrTime").then((res => {
          if (res.code != 0) {
            this.borTime_options = []
            return
          }
          this.borTime_options = res.data;
        })).catch(error => {

        });
      },
      borrowSaveFn() { //借阅提交
        if (this.initDocExamRoleinfo.key) {
          if (this.isMultiDeptvalue == "") {
            this.$message.error('请选择发起人所属部门')
            return
          }
        }
        let borrowFileListArry = [], userIdArray = [];
        this.ches.map((item, idx) => {
          userIdArray.push(item.userId)
        })
        this.borrowFileList.map((item, idx) => {
          let obj = {};
          obj.fileId = item.id
          obj.parentId = item.parentId
          borrowFileListArry.push(obj)
        })
        if (this.borTime_select === '') {
          this.$message.warning('请选择您要借阅的时间');
          return;
        }
        if (this.borrowFileList.length === 0) {
          this.$message.warning('请选择您要借阅的文件');
          return;
        }
        let data = {
          projectName: this.examine.projectMsg.procName || this.examine.projectMsg.projectName || this.examine.projectMsg.name,
          sourceName: '发起审批',
          data: {
            modelId: this.examine.message.actModelId,
            deploymentId: this.examine.message.procDeployId,
            procName: this.examine.message.procName,
            versionId: this.examine.message.procVersionNum,
            financingTypeId: this.examine.message.finaTypeId,
            categoryId: 9, //借阅
            userDept: this.valueCatch,
            projectName: this.examine.projectMsg.procName || this.examine.projectMsg.projectName || this.examine.projectMsg.name,
            projectId: this.currentItemData.projectId,
            approvalType: 9, //借阅
            remarks: this.remark_textarea,
            extCopy: userIdArray,
            docPaperBorrowing: {
              type: this.borrow_radio,
              borrowingTime: this.borTime_select,
              borrowFileList: borrowFileListArry,
              borrowReson: this.borrowRemark_textarea,
            }
          }

        };
        this.$confirm(`从借阅成功起，借阅时限为<span style="color:#1A5FA4">"${this.borTime_select}"</span>小时超过借阅时限后，
            借阅文件<span style="color:#e57272">自动失效，无法查看</span>是否确定借阅？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
          type: 'warning'
        }).then(() => {
          this.$post("/info/audit/start_process_instance", data).then((res => {
            //   if(this.requestCode.SUCCESS !== res.code){
            //       this.$message.error(res.msg);
            //       return;
            //   }else if(res.code == -5022){
            //      this.$confirm(res.msg, '提示', {
            //         type: 'warning',
            //         confirmButtonText:'我知道了',
            //         showCancelButton:false
            //         }).then(() => {
            //         }).catch(() => {
            //         });
            //     return
            //   }
            //   this.borrow_radio = "1";
            //   this.borTime_select = '';
            //   this.remark_textarea = '';
            //   this.borrowFileList = [];
            //   this.extCopyArray = [];
            //   this.borrowVisible = false;
            //   this.$message.success(res.msg);
            if (res.code == 0) {
              this.$Mit.approvalSuccessful.code = 200
              this.borrow_radio = "1";
              this.borTime_select = '';
              this.remark_textarea = '';
              this.borrowRemark_textarea = '';
              this.borrowFileList = [];
              this.ches = [];
              this.approveRemindfile = false;
              this.borrowVisible = false;
              this.shenpiId = res.data;
              console.log("借阅之后成功的方法返回的id", this.shenpiId)
              console.log(this.isSetRamindcheckedfile)
              if (this.isSetRamindcheckedfile) {
                console.log("借阅审批成功之后判断是否提醒是否选中", 1111)
                this.setRemaidfile()
              }
              this.isSetRamindcheckedfile = false;
              this.remindWayfile = ["站内信"]
              this.$message.success(res.msg);

            } else if (res.code == -5022) {
              this.$confirm(res.msg, '提示', {
                type: 'warning',
                confirmButtonText: '我知道了',
                showCancelButton: false
              }).then(() => {
              }).catch(() => {
              });
              return
            } else {
              this.$message.error(res.msg);
              return;
            }
          })).catch(error => {

          });
        }).catch(() => {
          //this.remindWayfile = ["站内信"]
        });

      },
      addCopyPeopleFn() { //添加抄送人弹框函数
        this.deployObj = this.copyNameArray.map((name, i) => ({
          name,
          id: this.copyNameCode[i],
          label: name,
          originData: true,
          uniqueKey: 'user' + this.copyNameCode[i]
        }));
        this.findFlags = true;
        this.findState = {state: 0};
        this.checkState = {state: 2};
        let copyData = this.deployObj.concat(this.extCopyArray)
        copyData.forEach(v => {
          v.label = v.name
          v.uniqueKey = 'user' + v.id
        })
        this.findUserObj = copyData
        console.log(copyData, 1.2, this.findUserObj)
      },
      treeSearchFn() {
        if (this.tree_input != '') {
          this.isSearchShow = false;
          var data = {
            token: this.token,
            userId: this.userId,
            pageNo: 0,
            pageSize: 1000,
            data: {
              projectId: this.currentItemData.projectId,
              docPaperContent: this.tree_input,
              docType: 0,
              borringType: this.borrow_radio
            }
          };
          this.$post('/doc/paper/getProjectPaperFileParentId', data)
            .then((res) => {
              this.borrowSearchFileList = res.data.content
            })
            .catch((error) => {
              console.log(error)
            })
        } else {
          this.isSearchShow = true;
          this.borrowTreeFn()
        }

      },
      borrowTypeFn() {
        this.borrowTreeFn()
        this.borrowFileList = []
      },
      borrowCloseFn() { //借阅关闭
        this.$confirm('确认关闭？')
          .then(_ => {
            this.borrow_radio = "1";
            this.borTime_select = '';
            this.remark_textarea = '';
            this.borrowRemark_textarea = '';
            this.borrowFileList = [];
            this.ches = [];
            this.borrowVisible = false;
            this.remindWayfile = ["站内信"]
            this.isSetRamindcheckedfile = false;
            done();
          })
          .catch(_ => {
          });
      },
      borrowTreeFn() { //获取初始树列表
        this.isSearchShow = true;
        let data = {
          token: this.token,
          userId: this.userId,
          pageNo: 0,
          pageSize: 500,
          data: {
            parentId: 0,
            projectId: this.currentItemData.projectId,
            borringType: this.borrow_radio
          }
        };
        this.$post('/doc/paper/getProjectPaperFileParentId', data)
          .then((res) => {
            this.borrowZnodes = res.data.content;
            this.borrowZnodes.forEach((item) => {
              if (item.docType === 1) {
                item.isParent = true;
                item.iconSkin = "diy01"
              } else {
                item.iconSkin = "diy03"
              }
            });
            $.fn.zTree.init($("#borrowTree"), this.borrowSetting, this.borrowZnodes);
            this.borrowTreeDemo = $.fn.zTree.getZTreeObj("borrowTree"); //将目录树对象赋值给全局使用
            var nodes = this.borrowTreeDemo.getNodes();
            this.borrowTreeDemo.selectNode(nodes[0])
            console.log(nodes[0])
            this.borrowTreeDemo.reAsyncChildNodes(nodes[0], "refresh");
          })
          .catch((error) => {
            console.log(error)
          })
      },
      // 点击发起审批
      handleOperate(res, project) {
        console.log(res, '22222222222', project)
        this.flowValue = res
        this.examine = this.$Examine(res, project ? project : this.$Business.processParams ? this.$Business.processParams : this.businessProject)
        this.resdata = res
        this.examine.isCommon = res.isCommon // 1--普通审批/普通审批下的子集
        this.Typesoffinancing =  this.businessProject.currentImplementStageName// 项目阶段
        console.log(this.examine, 'project')

        if (Object.keys(this.businessProject).length !== 0) {
          console.log(this.businessProject, '_____this.businessProject')
          this.queryDocProjectId = this.businessProject.projectId;
        }
        if (!project && this.$Business.processParams) {
          this.value = this.$Business.processParams.projectId // 项目id
          this.xmbhsss = this.$Business.processParams.code // 项目编码
          this.proPigeonholeName_input = this.$Business.processParams.projectId // 项目id
          this.proPigeonholeNumber_input = this.$Business.processParams.code // 项目编码
        }
        console.log(this.examine.procTypeId, this.examine.launchSure(this.$route.path), '_this.examine.launchSure(this.$route.path)')
        if (this.examine.launchSure(this.$route.path)) {
          if (this.examine.procTypeId === 9) {
            this.currentItemData = this.$Business.processParams;
            this.timeQueryFn()
            this.examineInit('', (model, Instance) => {
              this.borrowVisible = true;
              console.log("测试借阅啊啊啊啊")
              this.borrowTreeFn();
            })
          } else if (this.examine.procTypeId === 8) {
            this.currentItemData = this.$Business.processParams;
            if (this.$Business.processParams) {
              this.proPigeonholeName_input = this.$Business.processParams.projectName || this.$Business.processParams.procName;
              this.proPigeonholeNumber_input = this.$Business.processParams.code;
            }

            this.examineInit('', (model, Instance) => {
              // this.approvalNameArray = model.approvalsForm.approvalName; // 表单和审批环节信息执行人
              console.log(model.noFileStageJoin, '_____model.noFileStageJoin')
              this.stage_input = model.noFileStageJoin
              this.proPigeonholeVisible = true
            })

          } else {
            this.lx(res)
          }
        } else {
          this.$message.error('本页面不可发起新建项目审批！')
        }

      },
      handleChangeProject(project, res) {
        if (project) {
          this.value = project.id
          this.proid = project.id
          let projectId = project
          console.log(project, res, '____project,res')
          this.businessProject = Object.assign({}, {
            code: project.code,
            finaTypeName: project.financingName,
            finaTypeId: project.financingId,
            currentImplementStageName:project.currentImplementStageName,
            // procTypeId:project.procTypeId,
            // progStageId:project.currentImplementStageId,
            projectName: project.name,
            projectId: project.id,
            createBy: project.createBy
          })
          // this.$Business.projectStore(obj)
        } else {
          this.value = ''
          this.proid = ''
          this.businessProject = {}
          this.abc.isJump = false
          this.$Business.action = {}
        }
      },
      handleMethods(res, node) {
        // this.bussinessMessage = res
        this.$Mit.business.message = res
        console.log(res, node, '_______data')
      },
      //关闭提醒方法弹框
      handleCloseremind(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
            this.remindWay = ["站内信"]
          })
          .catch(_ => {
          });
      },
      //关闭提醒方法弹框
      handleClosefile(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
            this.remindWayfile = ["站内信"]
          })
          .catch(_ => {
          });
      },
      // 获取提醒方式
      getPromptType() {
        this.$post("/sys/getNoticeWayConfig")
          .then(res => {
            if (this.code.codeNum.SUCCESS == res.code) {
              res.data.email == 1 && this.remindWayGrounp.push({label: "邮件", value: 1});
              res.data.sms == 1 && this.remindWayGrounp.push({label: "短信", value: 2});
              ;
              return;
            }
            this.$message.error("通知方式获取失败");
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 获取提醒方式文件归档
      getPromptTypefile() {
        this.$post("/sys/getNoticeWayConfig")
          .then(res => {
            if (this.code.codeNum.SUCCESS == res.code) {
              res.data.email == 1 && this.remindWayGrounpfile.push({label: "邮件", value: 1});
              res.data.sms == 1 && this.remindWayGrounpfile.push({label: "短信", value: 2});
              ;
              return;
            }
            this.$message.error("通知方式获取失败");
          })
          .catch(err => {
            console.log(err);
          });
      },
      deletePerFn(index) {
        this.inputdatacopyName.splice(index, 1);
      },
      deleteSelected(list, item, ref) {
        let idx = ''
        if (item.addSource === 1 && item.progress !== 100) { // 删除正在上传的文件
          idx = list.findIndex(v => (v.addSource === item.addSource && v.docId === item.docId))
          this.$refs[ref].deleteDoc(item.id)
          console.log('uploading')
        } else { // 删除已上传、项目文档、底稿文件
          idx = list.findIndex(v => (v.addSource === item.addSource && v.id === item.id))
        }
        list.splice(idx, 1)
      },

      htmls2(html) {
        this.sponsorhtml = html
      },
      upreatdigao(num) {
        if (this.proid == "") {
          this.$message({
            type: "info",
            message: "请选择项目"
          });
          return;
        }
        // if (!this.$utils.checkProjectPermission("project_file")) {
        //   this.$message.error("无查看项目文档的权限");
        //   return;
        // }
        // this.uploadnum = num;
        // this.relafagmanus = true;
        this.$utils
          .checkProjectPermissionAsync(this.queryDocProjectId, "project_file")
          .then(res => {
            if (!res) {
              this.$message.error("无查看项目文档的权限");
              return;
            }
            // this.selectProjectDocIsShow = true;
            // this.relafag = true;
            this.uploadnum = num;
            this.relafagmanus = true;
          });
      },
      needAgainQuery() {
        // 获取第一个节点审核和抄送人员
        console.log(this.copymess, '__________this.copymess')
        this.$post("/info/audit/formDetailNew", this.copymess)
          .then((response) => {
            if (response.code != 0) {
              this.$message.error(response.msg)
            }
            if (this.inputdata.noAudit) {
              this.inputdata.approvalName = response.data.approvalName
            }
            if (this.inputdata.noCopyUser) {
              this.inputdata.copyCode = response.data.copyCode
              this.inputdata.copyName = response.data.copyName
            }
            this.inputdatacopyCode = response.data.copyCode
            this.inputdatacopyName = response.data.copyName;
            if (this.isMultiDept.isMultiDept) {
              this.MultiDeptvalue = false
            }
          })
          .catch(function (error) {
          });
      },
      clearstates(varyt) {
        //上传的关闭弹框
        // console.log(varyt);
        if (varyt.state == 0) {
          this.selectProjectDocIsShow = false;
        }
      },

      upreats2() {
        // console.log(this.queryDocProjectId)
        if (this.proid == "") {
          this.$message({
            type: "info",
            message: "请选择项目"
          });
          return;
        }
        // if (!this.$utils.checkProjectPermission("project_file")) {
        //   this.$message.error("无项目文档权限");
        //   return;
        // }
        this.$utils
          .checkProjectPermissionAsync(this.queryDocProjectId, "project_file")
          .then(res => {
            if (!res) {
              this.$message.error("无查看项目文档的权限");
              return;
            }
            this.selectProjectDocIsShow = true;
            // this.relafag = true;
          });
        // this.selectProjectDocIsShow = true;
      },
      selectDocClose() {
        this.selectProjectDocIsShow = false;
      },
      leftTreeLoadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([{docName: "项目文档", id: "0", disabled: true}]);
        } else {
          this.treeQueryDoc(node.data.id, resolve);
        }
      },
      treeQueryDoc(id, resolve) {
        let vm = this;
        let data = {
          token: this.token,
          userId: this.userId,
          pageNo: 0,
          pageSize: 5000,
          data: {
            projectId: this.proid,
            docContent: "",
            auditProjectId: "", //项目阶段ID
            parentId: id, //所在目录ID 0 为顶级目录
            docName: "",
            beginTime: "", //文件创建开始时间
            endTime: "", //文件创建结束时间
            suffix: "" //文件类型（后缀名）
          }
        };
        this.$post("/doc/project/query", data)
          .then((response) => {
            if (vm.success_code == response.code) {
              vm.docInitList = response.data.content;
              for (let i = 0; i < vm.docInitList.length; i++) {
                if (vm.docInitList[i].docType == 0) {
                  if (vm.docInitList[i].auditStatus == 0) {
                    vm.docInitList[i].disabled = true;
                  } else {
                    vm.docInitList[i].disabled = false;
                  }
                } else {
                  vm.docInitList[i].disabled = true;
                }
              }
              resolve(vm.docInitList);
              //console.log(vm.docInitList);
            }
          })
          .catch(function (error) {
          });
      },
      closess(item) {
        console.log(item)
        var arr = this.ches;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].userId == item.userId) {
            arr.splice(i, 1);
          }
        }
        this.ches = arr;
        this.findUserObj.forEach((v, n) => {
          if (v.userId == item.userId) {
            this.findUserObj.splice(n, 1);
          }
        })
      },
      selectChange(data) {
        // console.log("文件关联选中的", this.$refs.leftTree.getCheckedNodes());
        this.selectedDocList = data;
        this.selectedDocList = this.$refs.leftTree.getCheckedNodes();
        this.selectedDocListId = [];
        for (var i = 0; i < this.selectedDocList.length; i++) {
          this.selectedDocListId.push(this.selectedDocList[i].id);
        }
        // console.log(this.selectedDocListId)
      },
      //  selectProjectDocSure(){
      //     for(var i=0;i<this.selectedDocList.length;i++){
      //         // this.selectedDocList[i].isShow = true;
      //         this.selectedDoc.push(this.selectedDocList[i]);
      //     }
      //     console.log(this.selectedDoc)
      //     var array=this.selectedDoc
      //     var arrs=[]
      //     for (let i = 0; i < array.length; i++) {
      //       arrs.push({
      //           id: array[i].docId,
      //           name:array[i].docName,
      //           rfsId:array[i].rfsId,
      //       })
      //     }
      //     this.shagreatlists=arrs
      //     this.selectedDocList = [];
      //     this.selectedDoc=[]
      //     this.selectProjectDocIsShow = false;
      // },f=
      selectProjectDocSure(selectList) {
        // console.log(selectList);

        for (var i = 0; i < selectList.length; i++) {
          // this.selectedDocList[i].isShow = true;
          this.selectedDoc.push(selectList[i]);
        }
        // console.log(this.selectedDoc);
        var array = this.selectedDoc;
        var arrs = [];
        for (let i = 0; i < array.length; i++) {
          this.shagreatlists.push({
            id: array[i].docId,
            name: array[i].docName,
            rfsId: array[i].rfsId
          });
        }
        // console.log(arrs)
        // this.shagreatlists = arrs;
        let obj = {};
        this.shagreatlists = this.shagreatlists.reduce((cur, next) => {
          obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
          return cur;
        }, []) //
        this.selectedDocList = [];
        this.selectedDoc = [];
        this.selectProjectDocIsShow = false;
      },
      async procTypeIds(stateisMultiDept) {
        console.log(this.initDocExamRoleinfo, '____initDocExamRoleinfo')
        let examine = this.examine
        //清空附件
        this.shagreatlist = [];
        this.shagchaunlist = [];
        this.shagchaunlists = [];
        this.shagreatlists = [];
        this.shagchaunlist2 = [];
        this.shagchaunlists2 = [];
        this.ches = [];
        console.log(this.value, '____this.value')
        // 获取选中项目信息
        let proc = {}
        let ids = ''
        let arr = examine.projectList;
        if (this.value != '') {
          proc = arr.find(item => item.id === this.value)
          console.log(proc)

          console.log(proc.currentImplementStageName, '__________proc.currentImplementStageName')
          ids = proc.id;
          this.examine.projectMsg = proc
          console.log(proc, '______proc')
          this.currentgeneration = proc.financingName;
          this.proid = proc.id;
          this.queryDocProjectId = proc.id;
          this.mancDocProjectId = proc.id;
          this.Typesoffinancing = proc.currentImplementStageName
          this.uploadParamData.projId = proc.id;
          this.currentStageId = proc.currentStageId;
          this.xmbhsss = proc.code;
          this.copymess.data.projectId = this.proid
          this.pronamesponer = proc.name;
          await this.handleOperate(this.flowValue, proc)
        }
        if (this.initDocExamRoleinfo.key) {
          // if(this.isMultiDeptvalue != '' && this.value != ''){
          if (this.isMultiDeptvalue != '') {
            this.copymess.data.userDept = this.isMultiDeptvalue
          } else {
            if (this.Regulars == 1) {
              if (this.isMultiDeptvalue != '') {
                this.initDocExamRoleinfo = {key: true}
                this.needAgainQuery()
                return
              }
            }
          }
          this.initDocExamRoleinfo = {key: true}
          this.needAgainQuery()
        } else {
          if (this.inputdata.needAgainQuery) {
            this.needAgainQuery()
          }
        }
        if (this.Regulars == 1) {
          return
        }
        // console.log(this.progStageIdids,this.currentStageId)
        console.log(proc.financingId, this.finaTypeIds, '____proc.financingId , this.finaTypeIds')
        if (proc.financingId != this.finaTypeIds) {
          this.$message.warning("项目所属业务类型与流程图所属业务类型不匹配");
          this.disableds = true;
          return;
        } else {
          this.disableds = false;
        }
        if (this.procTypeId == 5) {
          this.disableds = false;
          if (this.progStageIdids != this.currentStageId) { // 判断项目阶段是否一致
            this.$message.warning("项目所属阶段与流程图所属阶段不匹配");
            this.disableds = true;
            return;
          } else {
            this.disableds = false;
          }
        } else {
          this.disableds = false;
        }
        if (this.procTypeId == 6) {
        } else if (this.procTypeId == 5) {
          var data = {
            token: this.$store.state.loginObject.userToken,
            userId: this.$store.state.loginObject.userId,
            pageNo: "",
            pageSize: "",
            data: {
              projectId: ids,
              deploymentId: this.procTypeIdss
            }
          };
          var url = "/info/audit/current_project_use";
          var _this = this;
          this.$post(url, data)
            .then((response) => {
              if (response.code == 0) {
                if (!response.data) {
                  _this.$message({
                    type: "info",
                    message: "当前项目正在进行阶段审核"
                  });
                  _this.disableds = true;
                  return
                } else {
                  _this.disableds = false
                }
              } else {
                _this.$message({
                  type: "info",
                  message: response.data
                });
              }
            })
            .catch(function (error) {
            });
        }
      },
      closes() {
        this.$refs['attachmentCheck'] && this.$refs['attachmentCheck'].close()
        this.$refs['attachment'] && this.$refs['attachment'].close()
        this.value = "";
        this.xmbh = "";
        this.inputdata = "";
        this.plain2 = false;
        this.plain = false;
        this.list = [];
        this.sponsorhtml = ''
        this.html2 = ""
        this.changes = {state: 1}
        this.Typeapproval = ""
        this.currentgeneration = ""
        this.Typesoffinancing = ""
        // this.inputdata.approvalName = []
        // console.log(this.inputdata)
        this.inputdatacopyName = []
        // this.shagreatlists=[]
        // this.shagchaunlists=[]
        // this.shagreatlist=[]
        // this.shagreatlist=[]
        // this.inputdatacopyName=[]
        this.shagchaunlist2 = [];
        this.shagchaunlists2 = [];
        this.shagreatlist = [];
        this.shagreatlists = [];

        this.shagreatlists = [];
        this.shagchaunlists = [];
        this.shagreatlist = [];
        this.shagchaunlist = [];
        this.shagreatlist = [];
        this.shagchaunlist = [];
        this.shagchaunlists = [];
        this.shagreatlists = [];
        this.shagchaunlist2 = [];
        this.shagchaunlists2 = [];
        this.ches = [];
        this.proid = "";
      },
      dialogVisibleqx() {
        this.value = "";
        this.xmbhsss = "";
        this.xmbh = "";
        this.inputdata = "";
        this.plain2 = false;
        this.plain = false;
        this.list = [];
        this.shagreatlists = [];
        this.shagchaunlists = [];
        this.shagreatlist = [];
        this.shagreatlist = [];
        this.inputdatacopyName = [];
        this.ches = [];
        //this.dialogVisibles = false;
      },

      findAllUsers(item) {
        console.log(item, '返回')
        if (!item || !item.length) {
          this.findAllDeptUsers = false;
          this.findState = {};
          this.checkState = {};
          this.ches = []
          this.findUserObj = []
          return
        }
        this.findAllDeptUsers = false;
        this.findState = {};
        this.checkState = {};
        let defaultArr = [], arr1 = []
        item.forEach(v => {
          if (v.originData) {
            defaultArr.push(v)
          } else {
            arr1.push(v)
          }
        })
        let data = (this.inputdatacopyCode.length > 0 ? this.inputdatacopyCode : this.copyNameCode) || []

        // 数组去重
        this.ches = arr1.filter(res => {
          let num = 0
          data.forEach(item => {
            if (res.id.toString() === item.toString()) {
              num++
            }
          })
          if (num === 0) {
            return res
          }
        })
        this.findUserObj = this.findUserObj.concat(this.ches)
      },

      uploadingFn() {
        // console.log(this.value);
        if (this.value == "") {
          this.$message({
            type: "info",
            message: "请选择项目"
          });
          return;
        }
        //上传
        this.uploadingFnstrw = 1;
        this.addDoc = true;
        this.uploadDocAddIsShow = true;
      },
      clearsmacuse(varyt) {
        this.relafagmanus = false;
      },
      uploadingFns() {
        //上传
        if (this.value == "") {
          this.$message({
            type: "info",
            message: "请选择项目"
          });
          return;
        }
        this.uploadingFnstrw = 2;
        this.addDoc = true;

        this.uploadDocAddIsShow = true;
      },
      upreat() {
        if (this.proid == "") {
          this.$message({
            type: "info",
            message: "请选择项目"
          });
          return;
        }
        // if (!this.$utils.checkProjectPermission("project_file")) {
        //   this.$message.error("无项目文档权限");
        //   return;
        // }
        this.$utils
          .checkProjectPermissionAsync(this.queryDocProjectId, "project_file")
          .then(res => {
            if (!res) {
              this.$message.error("无查看项目文档的权限");
              return;
            }
            this.uploadingFnstrw = 1;
            this.relafag = true;
            // this.selectProjectDocIsShow = true;
            // this.relafag = true;
          });
        // this.uploadingFnstrw = 1;
        // this.relafag = true;
      },
      upreats() {
        if (this.proid == "") {
          this.$message({
            type: "info",
            message: "请选择项目"
          });
          return;
        }
        // if (!this.$utils.checkProjectPermission("project_file")) {
        //   this.$message.error("无项目文档权限");
        //   return;
        // }
        // this.uploadingFnstrw = 2;
        // this.relafag = true;
        this.$utils
          .checkProjectPermissionAsync(this.queryDocProjectId, "project_file")
          .then(res => {
            if (!res) {
              this.$message.error("无查看项目文档的权限");
              return;
            }
            //  this.selectProjectDocIsShow = true;
            // this.relafag = true;
            this.uploadingFnstrw = 2;
            this.relafag = true;
          });
      },
      clears(varyt) {
        //上传的关闭弹框
        this.relafag = false;
      },
      // 底稿返回值
      elationUpmanscFn(uploadData) {
        console.log(this.uploadnum);
        var _this = this;
        if (this.uploadnum == 2) {
          uploadData.forEach(function (c) {
            if (c.id) {
              _this.shagreatlists.push({
                id: c.docId,
                name: c.docName,
                rfsId: c.rfsId
              });
            }
          });
          let obj = {};
          _this.shagreatlists = _this.shagreatlists.reduce((cur, next) => {
            obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
            return cur;
          }, []) //
        } else if (this.uploadnum == 1) {
          uploadData.forEach(function (c) {
            if (c.id) {
              _this.shagreatlist.push({
                id: c.docId,
                name: c.docName,
                rfsId: c.rfsId
              });
            }
          });
          let obj = {};
          _this.shagreatlist = _this.shagreatlist.reduce((cur, next) => {
            obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
            return cur;
          }, [])
        }
        this.relafagmanus = false;
      },
      elationUpFn(uploadData) {
        // console.log(uploadData);
        // var _this = this;
        // uploadData.forEach(function(c) {
        //   if (c.id) {
        //     _this.shagreatlist.push({
        //       id: c.docId,
        //       name: c.docName
        //     });
        //   }
        // });
        // console.log(this.shagreatlist);
        // this.relafag = false;
        if (this.uploadingFnstrw == 1) {
          var _this = this;
          uploadData.forEach(function (c) {
            if (c.id) {
              _this.shagreatlist.push({
                id: c.docId,
                name: c.docName,
                rfsId: c.rfsId
              });
            }
          });
          this.relafag = false;
          // console.log(this.shagreatlist);
          let obj = {};
          _this.shagreatlist = _this.shagreatlist.reduce((cur, next) => {
            obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
            return cur;
          }, []) //设置cur默认类型为数组，并且初始值为空的数组

        } else {
          var _this = this;
          uploadData.forEach(function (c) {
            if (c.id) {
              _this.shagreatlists.push({
                id: c.docId,
                name: c.docName,
                rfsId: c.rfsId
              });
            }
          });
          this.relafag = false;
          let obj = {};
          _this.shagreatlists = _this.shagreatlists.reduce((cur, next) => {
            obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
            return cur;
          }, []) //
          // console.log(this.shagreatlists);
        }
      },
      sendValueToParentFn() {
        //上传的关闭弹框
        this.addDoc = false;
        this.uploadDocAddIsShow = false;
      },
      docUploadFn(uploadData) {
        // console.log(uploadData);
        if (this.uploadingFnstrw == 1) {
          this.shagchaunlist2.push({
            id: uploadData.docId,
            rfsId: uploadData.fileData.rfsId,
            name: uploadData.docName
          });
          // console.log(this.shagchaunlist);
        } else {
          // 上传附件
          this.shagchaunlists2.push({
            id: uploadData.docId,
            rfsId: uploadData.fileData.rfsId,
            name: uploadData.docName,
            type: uploadData.fileData.type
          });
        }
        this.$refs.uploadRef.uploadComplete();
        //  console.log(this.shagchaunlists)  //
        //  this.addDoc = false;
        //  this.$refs.uploadRef.destroy()
        this.uploadDocAddIsShow = false;
      },
      docUploadAllsucess() {
        if (this.uploadingFnstrw == 1) {
          this.shagchaunlist = this.shagchaunlist2;
          // console.log(this.shagchaunlist);
        } else {
          // 上传附件
          this.shagchaunlists = this.shagchaunlists2;
        }
        this.addDoc = false;
        this.uploadDocAddIsShow = false;
      },
      //判断是否勾选设置提醒
      submitApprove() {
        if (this.isSetRamindchecked == true) {
          this.approveRemind = true
          this.querysShenp()
          console.log(this.procNamedos)
          console.log(this.options)
          console.log(this.examine)
          console.log(this.pronamesponer)
          // 站内信模板
          console.log(this.Typeapproval)
          if (this.Typeapproval == "普通审批") {
            if (this.pronamesponer == '') {
              var insideLetter = "【智慧投行】 " + this.$store.state.loginObject.userName + ":" + "提醒您尽快审批" + this.Typeapproval + "，可在'我的审批-待我审批中'进行查看，该审批提交时间为 " + this.$moment().format("YYYY-MM-DD HH:mm:ss")
            } else {
              var insideLetter = "【智慧投行】 " + this.$store.state.loginObject.userName + ":" + "提醒您尽快审批关于" + this.pronamesponer + "项目的" + this.Typeapproval + "，可在'我的审批-待我审批中'进行查看，该审批提交时间为 " + this.$moment().format("YYYY-MM-DD HH:mm:ss")
            }
          } else {
            let projectName = this.examine.projectMsg.projectName || this.examine.projectMsg.name
            let projectInfo = projectName ? `${projectName}项目的`:''
            var insideLetter = "【智慧投行】 " + this.$store.state.loginObject.userName + ":" + "提醒您尽快审批关于" + projectInfo + this.Typeapproval + "，可在'我的审批-待我审批中'进行查看，该审批提交时间为 " + this.$moment().format("YYYY-MM-DD HH:mm:ss")
          }

          this.formInline.contentMessage = insideLetter
          console.log(this.inputdata.approvalName)
          console.log(this.inputdata.approvalName.length)
          this.copyNameArrayinfo = [...this.copyNameArray]
          this.inputdatapprovalName = [...this.inputdata.approvalName]
          if (this.inputdata.approvalName.length <= 1) {
            this.chack_bule = true;
          } else {
            this.chack_bule = false;
          }

        } else {
          this.dialogVisibles1();
        }
      },
      deletePerFnexam(tag, index) {
        console.log(333)
        if (this.inputdatapprovalName.length > 1) {
          Array.prototype.delete = function (delIndex) {
            let temArray = [];
            for (var i = 0; i < this.length; i++) {
              if (i != delIndex) {
                temArray.push(this[i]);
              }
            }
            return temArray;
          };
          var arr = this.inputdatapprovalName;
          this.inputdatapprovalName = arr.delete(index);
          var approverIds = this.approverIds;
          this.approverIds = approverIds.delete(index);
        } else {
          this.$message({
            type: "info",
            message: "接收人不能为空"
          });
        }
        // this.inputdatapprovalName.splice(index, 1);
      },
      //提醒弹框的确定按钮
      approveRemindSave() {
        this.dialogVisibles1();
        //this.approveRemind = false;
      },
      approveRemindclose() {
        this.approveRemind = false;
        this.inputdatapprovalName = [...this.inputdata.approvalName]
        this.remindWay = ["站内信"]
      },
      //查询审批人员的id
      querysShenp() {
        console.log(this.copymess)
        this.$post("/info/audit/getApprover", this.copymess)
          .then((response) => {
            console.log(response.data)
            this.approverIds = response.data.approverId
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      async remindSetMessage() {
        let data = {
          data: this.approverIds// 要提醒的人员id
        }
        return await this.$post("/sys/getUserList", data).then((response) => {
          this.messagefailed = response.data;
          this.errorMsg = "";
          let checkedRemindNames = this.rmindaaa;
          for (var i = 0; i < this.messagefailed.length; i++) {
            let name = this.messagefailed[i].name;
            if (!this.messagefailed[i].email && checkedRemindNames.indexOf("邮件") != -1) {
              this.errorMsg += name + "的邮箱发送失败；";
            }
            if (!this.messagefailed[i].mobile && checkedRemindNames.indexOf("短信") != -1) {
              this.errorMsg += name + "的短信发送失败；";
            }
          }
          console.log(this.errorMsg,'this.errorMsg')
          if (this.errorMsg) {
            let errorMsg = this.errorMsg + "请在个人信息中完善！其余均发送成功";
            // this.$message.error(errorMsg);
            return errorMsg;
          }
          return null;

        })
          .catch(function (error) {
            console.log(error);
          });
      },
      aaa(value) {
        console.log(value)
        this.rmindaaa = value
        console.log(this.rmindaaa)
      },
      //设置提醒的方法（相当于审批催办）
      setRemaid() {
        console.log(this.remindWay)
        this.remindSetMessage().then(res => {
          var arr = this.rmindaaa;
          var ges,
            arrs = [];
          for (let i = 0; i < arr.length; i++) {
            console.log(arr[i])
            if (arr[i] == "站内信") {
              ges = 0;
            } else if (arr[i] == "邮件") {
              ges = 1;
            } else {
              ges = 2;
            }
            arrs.push(ges);
          }
          console.log(arrs)
          var data = {
            token: this.$store.state.loginObject.userToken,
            userId: this.$store.state.loginObject.userId,
            data: {
              id: this.shenpiId, //提交审批成功后的返回的id
              userIds: this.approverIds, //审批人员的id
              urgeText: this.formInline.contentMessage,
              remindWay: arrs.join(",")
            }
          };
          var url = "/info/audit/urge_approval";
          var _this = this;
          this.$post(url, data)
            .then((response) => {
              if (response.code == 0) {
                _this.$message({
                  type: "success",
                  message: res == null ? response.msg : response.msg + " " + res
                });
                _this.isSetRamindchecked = false;
                this.approveRemind = false;
              } else {
                _this.$message({
                  type: "warning",
                  message: response.msg
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        })
      },

      //文件借阅的设置提醒方法
      //判断是否勾选设置提醒
      submitApprovefile() {
        if (this.resdata.procTypeName == "底稿归档审批") {
          if (this.isSetRamindcheckedfile == true) {
            this.approveRemindfile = true
            this.querysShenpfile()
            // 站内信模板
            let projectInfo = this.examine.projectMsg.projectName ? `${this.examine.projectMsg.projectName}项目的`: ''
            var insideLetter = "【智慧投行】 " + this.$store.state.loginObject.userName + "：" + "提醒您尽快审批关于" + projectInfo + this.resdata.procTypeName + "，可在'我的审批-待我审批中'进行查看，该审批提交时间为 " + this.$moment().format("YYYY-MM-DD HH:mm:ss")
            this.formInlinefile.contentMessage = insideLetter
            //this.copyNameArrayinfo = [...this.copyNameArray]
            this.inputdatapprovalNamefile = [...this.approvalNameArray]
            if (this.inputdatapprovalName.length <= 1) {
              this.chack_bulefile = true;
            } else {
              this.chack_bulefile = false;
            }

          } else {
            this.savePigeonholeFn();
          }
        } else {
          if (this.isSetRamindcheckedfile == true) {
            this.approveRemindfile = true
            this.querysShenpfile()
            // 站内信模板
            var insideLetter = "【智慧投行】 " + this.$store.state.loginObject.userName + "：" + "提醒您尽快审批关于" + this.$store.state.projectMsg.projectMsg.name + "，项目的" + this.resdata.procTypeName + "，可在'我的审批-待我审批中'进行查看，该审批提交时间为 " + this.$moment().format("YYYY-MM-DD HH:mm:ss")
            this.formInlinefile.contentMessage = insideLetter
            //this.copyNameArrayinfo = [...this.copyNameArray]
            this.inputdatapprovalNamefile = [...this.approvalNameArray]
            if (this.inputdatapprovalName.length <= 1) {
              this.chack_bulefile = true;
            } else {
              this.chack_bulefile = false;
            }

          } else {
            this.borrowSaveFn();
          }
        }

      },
      deletePerFnexamfile(tag, index) {
        if (this.inputdatapprovalNamefile.length > 1) {
          Array.prototype.delete = function (delIndex) {
            let temArray = [];
            for (var i = 0; i < this.length; i++) {
              if (i != delIndex) {
                temArray.push(this[i]);
              }
            }
            return temArray;
          };
          var arr = this.inputdatapprovalNamefile;
          this.inputdatapprovalNamefile = arr.delete(index);
          var approverIds = this.approverIds;
          this.approverIds = approverIds.delete(index);
        } else {
          this.$message({
            type: "info",
            message: "接收人不能为空"
          });
        }
        // this.inputdatapprovalNamefile.splice(index, 1);
      },
      //提醒弹框的确定按钮
      approveRemindSavefile() {
        //this.remindWayfile = ["站内信"]
        if (this.resdata.procTypeName == "底稿归档审批") {
          this.savePigeonholeFn();
        } else {
          this.borrowSaveFn();

        }
      },
      approveRemindclosefile() {
        this.approveRemindfile = false;
        this.inputdatapprovalNamefile = [...this.approvalNameArray]
        this.remindWayfile = ["站内信"]
      },
      //查询审批人员的id
      querysShenpfile() {
        // console.log(this.itemfordetaildata,"filed")
        // let data = {
        //     "token": this.token,
        //     "userId": this.userId,
        //     "data": {
        //         "modelId": this.itemfordetaildata.actModelId,
        //         "deploymentId": this.itemfordetaildata.procDeployId,
        //         "versionId": this.itemfordetaildata.procVersionNum,
        //         "approvalType": 9
        //     }
        // }
        console.log(this.examine.projectMsg, 'projectIdtMsg')
        let obj = Object.assign({}, this.copymess, {
          data: Object.assign({}, this.copymess.data, {
            projectId: this.examine.projectMsg.projectId
          })
        })
        this.$post("/info/audit/getApprover", obj)
          .then((response) => {
            console.log(response.data)
            this.approverIds = response.data.approverId
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      async remindSetMessagefile() {
        let data = {
          "token": this.token,
          "userId": this.userId,
          data: this.approverIds// 要提醒的人员id
        }
        var url = "/sys/getUserList";
        var _this = this;
        return await this.$post(url, data).then((response) => {
          _this.messagefailedfile = response.data;
          _this.errorMsgfile = "";
          let checkedRemindNames = _this.rmindbbb;
          for (var i = 0; i < _this.messagefailedfile.length; i++) {
            let name = _this.messagefailedfile[i].name;
            if (!_this.messagefailedfile[i].email && checkedRemindNames.indexOf("邮件") != -1) {
              _this.errorMsgfile += name + "的邮箱发送失败；";
            }
            if (!_this.messagefailedfile[i].mobile && checkedRemindNames.indexOf("短信") != -1) {
              _this.errorMsgfile += name + "的短信发送失败；";
            }
          }
          if (_this.errorMsgfile) {
            let errorMsgfile = _this.errorMsgfile + "请在个人信息中完善！其余均发送成功";
            // _this.$message.error(errorMsg);
            return errorMsgfile;
          }
          return null;

        })
          .catch(function (error) {
            console.log(error);
          });
      },
      bbb(value) {
        console.log(value)
        this.rmindbbb = value
        console.log(this.rmindbbb)
      },
      //设置提醒的方法（相当于审批催办）
      setRemaidfile() {
        this.remindSetMessagefile().then(res => {
          var arr = this.rmindbbb;
          console.log(arr)
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
          console.log(arr)
          console.log("设置提醒的方法", this.shenpiId)
          var data = {
            token: this.$store.state.loginObject.userToken,
            userId: this.$store.state.loginObject.userId,
            data: {
              id: this.shenpiId, //提交审批成功后的返回的id
              userIds: this.approverIds, //审批人员的id
              urgeText: this.formInlinefile.contentMessage,
              remindWay: arrs.join(",")
            }
          };
          var url = "/info/audit/urge_approval";
          var _this = this;
          this.$post(url, data)
            .then((response) => {
              if (response.code == 0) {
                _this.$message({
                  type: "success",
                  message: res == null ? response.msg : response.msg + " " + res
                });
                _this.isSetRamindcheckedfile = false;
              } else {
                _this.$message({
                  type: "warning",
                  message: response.msg
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        })
      },


      dialogVisibles1() {
        var listarr = this.list;
        this.sponsorhtml = this.$refs.selfEditer.getHtmls()
        let test = this.$refs.selfEditer.getText()
        let projectId = this.examine.projectMsg ? this.examine.projectMsg.projectId ? this.examine.projectMsg.projectId : this.examine.projectMsg.id : undefined
        if (this.sponsorhtml.toString()==='<p><br></p>' && !test.trim()) {
          this.$message({
            type: "error",
            message: "请把表单填写完整"
          });
          return;
        }
        let proname = ''
        if (this.Regulars != 1) {
          if (!projectId || projectId === '') {
            this.$message({
              type: "error",
              message: "请把表单填写完整"
            });
            return;
          }
          proname = this.options.filter(v => v.id === this.value)[0].name
        } else {
          if (this.value != "" && this.xmbh != "") {
            proname = this.options.filter(v => v.id === this.value)[0].name
          }
        }
        if (this.initDocExamRoleinfo.key && this.isMultiDeptvalue == "") {
          this.$message.error('请选择发起人所属部门')
          return
        }
        var arr = this.inputdata.form;
        var name;
        var newarr = "";
        var flag = true;
        if (Array.isArray(arr)) {
          for (let i = 0; i < arr.length; i++) {
            name = arr[i].id;
            // console.log(name);
            for (var k in this.list) {
              if (i == k) {
                if (flag == true) {
                  newarr += "'" + name + "':'" + this.list[k] + "'";
                  flag = false;
                } else {
                  newarr += ",'" + name + "':'" + this.list[k] + "'";
                }
              }
            }
          }
        }

        newarr = "{" + newarr + "}";
        this.newarr = newarr;
        var localFile = []; // 第二个 本地
        var localFiles = this.shagchaunlist;
        for (let i = 0; i < localFiles.length; i++) {
          localFile.push(localFiles[i].id);
        }
        // 上传附件
        var local = []; // 第一个  本地
        var loarr = this.shagchaunlists;
        for (let i = 0; i < loarr.length; i++) {
          local.push(loarr[i].id);
        }
        var localFiles = localFile.concat(local); // id 集合

        // 为2的情况
        var attach = this.shagreatlist; //二个
        var attachs = [];
        if (attach != "") {
          for (let i = 0; i < attach.length; i++) {
            // attachs.push(attach[i].id);
            attachs.push(attach[i].id);
          }
        }
        attachs = localFile.concat(attachs);
        // console.log(attachs)
        // console.log(localFile)

        var attacharr = this.shagreatlists; // 第一个 附件
        // console.log(attacharr);
        var ararr = [];
        if (attacharr != "") {
          for (let i = 0; i < attacharr.length; i++) {
            ararr.push(attacharr[i].id);
          }
        }
        ararr = ararr.concat(local);
        var chesarr = this.ches,
          extCopy = [];
        for (let i = 0; i < chesarr.length; i++) {
          extCopy.push(chesarr[i].userId);
        }
        if (this.$store.state.isUpload) {
          this.$message.error('有文件正在上传，请稍后操作')
          return;
        }

        if (this.procTypeId == 2 && !this.selectedFileListCheck.length) {
          this.$message.warning("请添加待审文件");
          return;
        }

        // let localAttach = [] // 本地上传
        // let projectRelev = [] // 关联文件+之前的附件
        let attachArr = []
        let localFileArr = []
        let annexArr = []
        this.selectedFileList.forEach(v => {
          v.addSource === 1 && localFileArr.push(v.docId)
          annexArr.push(v.docId)
          // v.addSource===1 ? localAttach.push(v.docId) : projectRelev.push(v.docId)
        })


        this.selectedFileListCheck.forEach(v => {
          v.addSource === 1 && localFileArr.push(v.docId)
          attachArr.push(v.docId)
        })
        console.log(this.remindWay)
        console.log(this.examine.message, this.examine.message.finaTypeId, '____this.examine.message.finaTypeId')
        var data = {
          projectName: this.examine.projectMsg.procName || this.examine.projectMsg.projectName || this.examine.projectMsg.name,
          sourceName: '发起审批',
          data: {
            modelId: this.examine.message.actModelId,
            deploymentId: this.examine.message.procDeployId,
            procName: this.examine.message.procName,
            versionId: this.examine.message.procVersionNum,
            financingTypeId: this.examine.message.finaTypeId,
            categoryId: this.items.procTypeId,
            projectName: this.examine.projectMsg.procName || this.examine.projectMsg.projectName || this.examine.projectMsg.name,
            projectId: this.value, //  输入框id
            approvalType: this.items.procTypeId,
            procName: this.examine.instance.procName,
            remarks: this.sponsorhtml,
            extCopy: extCopy,
            userDept: this.isMultiDeptvalue,
            attach: attachArr, //上传附件id
            annex: annexArr,
            localFile: localFileArr, //本地上传id
            formData: this.newarr,
            shenpiId: '',
            approverIds: []
          }
        };

        // 若为阶段审批则不可点击
        if (this.examine.procTypeId === 5) {
          this.disableds = true
        }
        // this.$Mit.approvalSuccessful.code = 200
        // 提交申请
        var url = "/info/audit/start_process_instance";
        this.$post(url, data)
          .then((response) => {
            this.disableds = false
            if (response.code == -5022) {
              this.$confirm(response.msg, '提示', {
                type: 'warning',
                confirmButtonText: '我知道了',
                showCancelButton: false
              }).then(() => {
              }).catch(() => {
              });
              return
            }
            if (response.code != 0) {
              this.$message.warning(response.msg)
              return
            }
            this.$Mit.approvalSuccessful.code = 200
            // this.dialogVisibles=true
            this.$message.success(response.msg);
            console.log(response.data)
            this.shenpiId = response.data

            if (this.isSetRamindchecked) {
              this.setRemaid()
            }
            this.dialogVisibles = false;
            this.isSetRamindchecked = false;
            console.log(response.data)
            this.remindWay = ["站内信"]

            // 保存成功，关闭弹窗，关闭定时器
            this.closemediumDialog();
            // 保存成功，清空草稿数据
            this.$utils.removeDraft("sponsor", false);

            // this.value=''
            // this.xmbh=''
            // this.inputdata=''
            // this.list=[]
            this.value = "";
            this.xmbh = "";
            this.inputdata = "";
            this.sponsorhtml = "";
            this.plain2 = false;
            this.plain = false;
            this.list = [];
            this.proid = "";
            // this.shagreatlists=[]
            // this.shagchaunlists=[]
            // this.shagreatlist=[]
            // this.shagreatlist=[]
            this.shagchaunlist2 = [];
            this.shagchaunlists2 = [];
            this.shagreatlist = [];
            this.shagreatlists = [];

            this.shagreatlists = [];
            this.shagchaunlists = [];
            this.shagreatlist = [];
            this.shagchaunlist = [];
            this.shagreatlist = [];
            this.shagchaunlist = [];
            this.shagchaunlists = [];
            this.shagreatlists = [];
            this.shagchaunlist2 = [];
            this.shagchaunlists2 = [];
            this.inputdatacopyName = [];
            this.ches = [];
            this.inputdata = response.data;
            // console.log(response.data);
          })
          .catch(function (error) {
            // console.log(error);
          });
      },
      addpeople() {
        console.log(123, this.inputdatacopyName, this.ches, this.findUserObj)
        this.findAllDeptUsers = true;
        this.findState = {state: 0};
        this.checkState = {state: 2};
        if (!this.inputdatacopyName) {
          this.findUserObj = this.$utils.cloneDeepArray(this.ches)
          return
          // this.findUserObj = this.ches
        }
        this.findUserObj = this.inputdatacopyName.map((name, i) => ({
          name,
          id: this.inputdatacopyCode[i],
          label: name,
          uniqueKey: 'user' + this.inputdatacopyCode[i],
          originData: true
        }));
        console.log(this.findUserObj, 22)
        // this.findUserObj = result
        this.findUserObj = this.findUserObj.concat(this.ches)
      },

      async examineInit(userDept, func) {
        await this.examine.init(userDept, (model, instance) => {
          if (this.dialogVisibles !== true) {
            this.isMultiDeptdata = model.approvalsForm  // 表单和审批环节信息
            this.remarkFromArray = model.approvalsForm.form; // 表单和审批环节弹窗模块内容
            this.approveType = model.approvalsForm.approveType; // 表单和审批环节获取会签，或签

            this.copymess = model.params
            this.inputdata = Object.assign({}, model.approvalsForm, model.formDetailArea);　// 表单和审批环节信息
            this.inputdatacopyName = model.copyNameStore && model.copyNameStore.length > 0 ? model.copyNameStore : model.approvalsForm.copyName; // 表单和审批环节信息抄送人
            this.inputdatacopyCode = model.copyNameCode && model.copyNameCode.length > 0 ? model.copyNameCode : model.approvalsForm.copyCode; // 表单和审批环节信息抄送人code
            // approvalNameArray
            this.approvalNameArray = model.formDetailArea ? model.formDetailArea.approvalName : model.approvalsForm.approvalName// 表单和审批环节信息
            this.copyNameArray = model.copyNameStore && model.copyNameStore.length > 0 ? model.copyNameStore : model.approvalsForm.copyName; // 表单和审批环节信息抄送人
            this.copyNameCode = model.copyNameCode && model.copyNameCode.length > 0 ? model.copyNameCode : model.approvalsForm.copyCode; // 表单和审批环节信息抄送人code
            console.log(this.approvalNameArray, this.copyNameArray, this.copyNameCode, '____this.copyNameCode')
            this.isMultiDept = model.approvalsForm // 表单和审批环节信息
            this.MultiDeptvalue = model.approvalsForm.isMultiDept // 表单和审批环节信息是否为多个部门
            this.initDocExamRoleinfo = {...{key: model.approvalsForm.isMultiDept}} // 表单和审批环节信息是否为多个部门

            this.findUserObj = model.approvalsForm.copyMessage // 表单和审批环节信息抄送人信息
            // 调用传入方法
            this.queryDocProjectId = model.projectMsg.projectId

            func(model, instance)
          }
        }, this.dialogVisibles)
      },
      async lx(items) {
        this.selectedFileList = [];
        this.selectedFileListCheck = [];
        await this.examineInit(undefined, (model, instance) => {
          if (this.dialogVisibles !== true) {
            console.log(instance, '____instance')
            console.log(model, '____instance')
            console.log(instance.finaTypeId, '____instance')
            // 业务类型
            this.currentgeneration = instance.finaTypeName
            this.Typeapproval = instance.procTypeName // 流程类型名称
            this.finaTypeIds = instance.finaTypeId; // 业务类型id
            this.procNamedos = instance.procName; // 项目名称
            // procTypeName为审批名称 procTypeId为审批id progStageId为项目阶段id

            // this.sjwj = "待审文件";
            // 普通审批及普通审批下的子集都是isCommon 为1 不需要展示必填项目信息
            this.Regulars = items.isCommon == 1 ? 1 : instance.procTypeId
            this.seensks = instance.fileExamine; // 文件审批
            this.seensk = instance.catalogExamine; // 文件审批-待审目录
            this.plain = instance.dataSelect; // 日期选择
            this.plain2 = instance.flowChart; // 流程图
            this.xmwds = instance.documentSelect; // 项目文档选择
            this.xmwds2 = instance.documentSelect2; // 项目文档选择
            if (instance.hint) {
              this.$message({
                type: "info",
                message: instance.hint
              })
              return
            }
            console.log(this.queryDocProjectId, '_____111112222')
            this.procTypeIdids = instance.procTypeId; // 审批类型id
            this.progStageIdids = instance.progStageId; // 项目阶段
            this.procTypeIdss = instance.procDeployId; // 流程部署id
            this.procTypeId = instance.procTypeId; // 审批类型id
            this.procName = instance.procName; // 项目名称
            //this.querysShenp()
            // this.querysShenpfile(this.copymess)

            // 项目列表
            this.options = model.projectList; // 项目列表
            //   console.log("23", items);
            this.items = items;

            // 判断弹窗是否存在，若不存在则执行下列方法，否则则不执行
            this.disableds = false;
            this.dialogVisibles = true;
            //this.dialogVisibleqx();
            // 取出保存的草稿
            let draft = this.$utils.getDraft("sponsor", false);
            // console.log(draft);
            // console.log(draft.textares);
            // 如果没有草稿，设置定时器，返回
            if (!draft.onlyText) {
              this.setTimer();
              return;
            }
            // 有草稿，展示提示弹窗
            this.$confirm("是否载入上次保存的草稿?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              // 回显草稿数据
              this.html2 = draft.textares;
              this.sponsorhtml = draft.textares
            }).catch(() => {
              // closeOnClickModal = false;
              this.setTimer();
            });
          }
        })
      },
      /**
       * 设置定时器：每5秒保存一次表单数据
       */
      setTimer() {
        // 启动定时器，每5000ms保存一次草稿
        this.newProjectDialogTimer = setInterval(() => {
          this.handleDraftData();
        }, 1000);
      },
      //处理草稿数据
      handleDraftData() {
        let data = {
          textares: this.$refs.selfEditer.getHtmls(), //客户名称
          onlyText: this.$refs.selfEditer.getText()
        };
        // console.log(data);
        this.$utils.saveDraft("sponsor", data, false);
      },
      closemediumDialog() {
        this.approveRemind = false;
        this.remindWay = ["站内信"]
        this.isSetRamindchecked = false
        this.$refs['attachmentCheck'] && this.$refs['attachmentCheck'].close()
        this.$refs['attachment'] && this.$refs['attachment'].close()
        this.Typeapproval = ""
        this.currentgeneration = ""
        this.Typesoffinancing = ""
        this.html2 = ''
        this.xmbhsss = ''
        this.handleDraftData();
        this.dialogVisibles = false;
        clearInterval(this.newProjectDialogTimer);
        this.inputdata.approvalName = []
        this.inputdatacopyName = []
      },
      // listsss (items) {
      //     //this.dataRows = items
      //     //console.log(this.dataRows)
      //     // this.querysShenp(items)

      //   var data = {
      //     token: this.$store.state.loginObject.userToken,
      //     userId: this.$store.state.loginObject.userId,
      //     data: {
      //       modelId: items.actModelId,
      //       deploymentId: items.procDeployId,
      //       progStageId: items.progStageId,
      //       versionId: items.procVersionNum,
      //       approvalType: items.procTypeId
      //     }
      //   };
      //   this.copymess = data
      //   // 获取开始表单和审批环节信息
      //   var url = "/info/audit/form_detail ";
      //   var _this = this;
      //   this.$post(url, data)
      //     .then((response) => {
      //       _this.inputdata = response.data;
      //       console.log(this.inputdata,'__________________inputdata')
      //       _this.inputdatacopyName = response.data.copyName;
      //       _this.inputdatacopyCode = response.data.copyCode;
      //       // 将默认的抄送人单独添加到一个数组中
      //       this.isMultiDept = response.data
      //       this.MultiDeptvalue = response.data.isMultiDept
      //       this.initDocExamRoleinfo = {...{key: response.data.isMultiDept}}
      //       let arr1 = response.data.copyName
      //       let arr = response.data.copyCode
      //       let result = arr1.map((name,i) => ({name, id: arr[i],label: name, uniqueKey: 'user' + arr[i],originData: true}));
      //       console.log(result, 22)
      //       this.findUserObj = result
      //       if(response.code != 0){
      //         this.$message.error(response.data)
      //       }
      //     })
      // },
      // handleClick (tab, event) {
      //   console.log(tab.index,'_______>>>');
      //   var arr = this.data_xz;
      //   for (let i = 0; i < arr.length; i++) {
      //     if (tab.index == i) {
      //       console.log(arr[i]);
      //       this.ids(arr[i].id, arr[i]);
      //       this.idss = arr[i].id;
      //       this.itemname = arr[i].name;
      //     }
      //   }
      // },
      // content_xzs (index, item, id) {
      // var arr = this.$refs.outsideComponentRef;
      // for (let i = 0; i < arr.length; i++) {
      //   if (index == i) {
      //     arr[i].style.borderBottom = "2px solid #0061A9";
      //     arr[i].style.color = "#0061A9";
      //   } else {
      //     arr[i].style.borderBottom = "none";
      //     arr[i].style.color = "rgba(0,0,0,0.65)";
      //   }
      // }
      // console.log(item);
      // console.log(item.name);
      // var ids;
      // if (item == "") {
      //   ids = id;
      // } else {
      //   ids = item.id;
      // }
      // this.ids(ids,item)
      // console.log(ids)
      // this.idss=ids
      // this.itemname=item.name
      // },

      // 面板的子类结构子类------等等再删
      // ids (ids, item) {
      //   console.log(item, '子类型面板', ids)
      //   if (item.name == '普通审批') {
      //     this.Regular(item)
      //     this.Regulars = 1
      //     return
      //   }
      //   this.Regulars = ""
      //   var loading = this.$loading({
      //     lock: true,
      //     text: "拼命加载中",
      //     spinner: "el-icon-loading"
      //     // background: 'rgba(0, 0, 0, 0.7)'
      //   });
      //   var data = {
      //     token: this.$store.state.loginObject.userToken,
      //     userId: this.$store.state.loginObject.userId,
      //     data: {
      //       id: ids,
      //       name: item.name
      //     }
      //   };
      //   loading.close();
      // 按融资类型顶级id查询流程列表
      // var url = "/info/service/findProcessByFinaType";
      // var _this = this;
      // this.$post(url, data)
      //   .then((response) => {
      //     if (response.code == -504) {
      //       response.data = [];
      //     }
      //     _this.sponsors = response.data;
      //     loading.close();
      //     // console.log(_this.sponsors);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
      // },
      // Regular (item) {
      //   var loading = this.$loading({
      //     lock: true,
      //     text: "拼命加载中",
      //     spinner: "el-icon-loading"
      //   });
      //   var data = {
      //     token: this.$store.state.loginObject.userToken,
      //     userId: this.$store.state.loginObject.userId,
      //     data: {
      //       "procTypeId": 1,
      //       "name": ""
      //     }
      //   };
      //   // 获取普通审批流程列表
      //   var url = "/info/service/findGeneralProcess";
      //   var _this = this;
      //   this.$post(url, data)
      //     .then((response) => {
      //       if (response.code == -504) {
      //         response.data = [];
      //       }
      //       // _this.sponsors = response.data;
      //       _this.sponsors = [{
      //         "id": 69,
      //         "name": "普通审批",
      //         "proceName": null,
      //         "children": [{
      //           "id": 1,
      //           "procTypeParent": null,
      //           "procTypeName": "普通审批",
      //           "createTime": null,
      //           "delFlag": null,
      //           "name": "普通审批",
      //           "flag": false,
      //           "flags": false,
      //           "children": response.data
      //         }]
      //       }]
      //       loading.close();
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });
      // },
      handleClose(done) { //审批弹框的关闭
        this.$confirm("确认关闭？")
          .then(_ => {
            done();
            this.remindWay = ["站内信"];
            this.isSetRamindchecked = false
            this.isSetRamindcheckedfile = false
          })
          .catch(_ => {
          });
      },
      recalls() {
        this.$confirm("确定要撤销申请吗, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message.success("申请成功!")
          })
          .catch(() => {
            this.$message("已取消申请")
          });
      }
    },
    watch: {
      borrowVisible(val) {
        if (!val) {
          this.valueCatch = ""
          this.initDocExamRoleinfo.key = false
        }
      },
      proPigeonholeVisible(val) {
        if (!val) {
          this.initDocExamRoleinfo.key = false
          this.isMultiDeptvalue = ''
        }
      },
      examineMessage(newData) {
        this.sjwj = "待审文件"
        this.seensk = newData.fileExamine
        this.seensks = newData.catalogExamine
        this.plain2 = newData.fileExamine
        this.plain = newData.dataSelect
        this.xmwds = newData.documentSelect
        this.xmwds2 = newData.documentSelect2
        newData.project.call(this, 'options')
        if (newData.hint) {
          this.$message({type: "info", message: newData.hint})
        }

      },
      'inputdata.approvalName': {
        handler(newName, oldName) {
          // console.log(newName.length)
          if (newName != null) {
            if (newName.length <= 1) {
              this.chack_bule = true;
            } else {
              this.chack_bule = false;
            }
          }
        },
        deep: true
      },

      'approvalNameArray': {
        handler(newName, oldName) {
          // console.log(newName.length)
          if (newName != null) {
            if (newName.length <= 1) {
              this.chack_bulefile = true;
            } else {
              this.chack_bulefile = false;
            }
          }
        },
        deep: true
      },
      value: function (val) {
        this.xmbh = val;
      },
      dialogVisibles(val) {
        if (!val) {
          this.isMultiDeptvalue = ""
          this.initDocExamRoleinfo.key = false
          this.newProjectDialogTimer && clearInterval(this.newProjectDialogTimer)
        }
      },

    }
  };
</script>

<style>
  .endreson {
    margin-left: 34px !important;
  }

  .endsay {
    position: relative;
    left: 54px;
  }
</style>
<style lang="scss" scoped>
  .business-tree {
    display: flex;
    height: calc(100vh - 175px);
    margin-top: 10px;

    > div:nth-child(2) {
      margin-left: 10px;
    }
  }

  #business-wrap-content {
    width: calc(100% - 254px)
  }

  .business-content {
    width: 1440px;
    height: 100%;
  }

  .content {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .content_p {
    width: 100%;
    height: auto;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.45);
    line-height: 52px;
    text-align: left;
    margin-left: 20px;

    span {
      color: rgba(0, 0, 0, 0.65);
    }
  }

  .content_top {
    width: 100%;
    height: auto;
    background: rgba(255, 255, 255, 1);
  }

  .content_zj {
    width: 100%;
    height: 14px;
    background: #eef0f4;
  }

  .content_box {
    overflow: hidden;
    zoom: 1;
    height: 50px;
  }

  .content_title {
    float: left;
    // color:#333;
    // font-size: 20px;
    padding-left: 19px;
    // text-align: left;
    // font-family: MicrosoftYaHei;
  }

  .content_search {
    overflow: hidden;
    zoom: 1;
    float: right;
    display: flex;
    height: 50px;
    margin-right: 21px;
  }

  .content_inputBox {
    width: 283px;
    height: 40px;
    line-height: 40px;
  }

  .content_xz {
    padding: 12px 0;
    // width: 100%;
    height: 25px;
    background: white;

    li {
      height: 25px;
      float: left;
      margin-top: 0;
      margin-left: 2%;
      // width: 73px;
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: #000000;
      cursor: pointer;
    }
  }

  .content_xz li:first-child {
    margin-left: 12px;
  }

  .content_tagcen {
    width: 100%;
    height: 30px;
    background: #f0f2f5;
  }

  .content_tagsss {
    // width: 100%;
    // height: 100%;
    padding: 2%;
    background: white;
    margin-top: -18px;
  }

  .content_tag {
    width: 100%;
    // padding: 1%;
    height: 100%;
    background: white;
    margin-top: -18px;

    ul {
      width: 100%;
      height: 100%;
    }

    li {
      width: 109%;
      height: 100%;
      padding: 1%;
      margin-left: -50px;

      h2 {
        width: 100%;
        height: 35px;
        border-bottom: 1px solid #eef0f4;
        text-align: left;
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.85);
        line-height: 25px;
        padding-left: 78px;
      }
    }
  }

  .firstsh {
    width: 100%;
    height: auto;
    overflow: hidden;
    padding-left: 61px;
    margin-top: 5px;

    p {
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      text-align: left;
      margin-top: 1%;
      // padding-left: 78px;
      // margin-left: -59px;
    }

    .firstsh2 {
      width: 100%;
      height: auto;
      text-align: left;
      float: left;

      .title_box {
        height: 50px;
        line-height: 50px;
        padding-left: 16px;
        border-bottom: solid 1px #e9e9e9;

        .title_box_left {
          float: left;
          margin: 15px 0;
          height: 20px;
          width: 6px;
        }

        p {
          float: left;
          margin-top: 0;
          margin-left: 8px;
          font-size: 16px;
          font-weight: bold;
        }
      }
    }

    .firstsh4 {
      padding: 1px 12px;
      height: 160px;
      clear: both;

      h3 {
        margin: 24px 0;
        font-size: 16px;
        font-weight: bold;
      }
    }

    .firstsh5 {
    }

    .firstsh3 {
      width: 363px;
      height: 94px;
      background: white;
      border-radius: 4px;
      border: 1px solid #e9e9e9;
      float: left;
      margin-bottom: 12px;
      margin-right: 1%;
      line-height: 94px;
      text-align: left;
      -webkit-box-shadow: #e9e9e9 0px 0px 1px;
      box-shadow: #e9e9e9 0px 0px 1px;
      cursor: pointer;

      i {
        width: 48px;
        height: 48px;
        color: white;
        border-radius: 50%;
        display: inline-block;
        text-align: center;
        line-height: 48px;
        margin-left: 27px;
        font-size: 20px;
      }

      span {
        font-size: 16px;
        margin-left: 16px;
        font-weight: bold;
        vertical-align: bottom;
        letter-spacing: 1px;
      }
    }

    .firstsh3:hover {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }

    // #hhh{
    //         width: 19%;
    //         height: 81px;
    //         background: white;
    //         border-radius: 4px;
    //         border: 1px solid #e9e9e9;
    //         float: left;
    //         margin-top: 12px;
    //         margin-left: 1%;
    //         line-height: 81px;
    //         text-align: left;
    //         -webkit-box-shadow: #e9e9e9 0px 0px 1px;
    //         box-shadow: #e9e9e9 0px 0px 1px;

    // }
    .firstsh {
    }
  }

  .pagination {
    margin-top: 60px;
    float: right;
  }

  .dialos {
    margin-bottom: 5%;
  }

  #dialos_i {
    color: red;
    margin-right: 1%;
    font-size: 16px;
    vertical-align: bottom;
  }

  .dialos span:first-child {
    margin-left: -7px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    font-size: 15px;
  }

  .dialos_box {
    // width: 100%;
    // height: 100%;
    // overflow: hidden;
  }

  .dialos_p {
    float: left;
    /* margin-top: -2%; */
    font-weight: bold;
    font-size: 14px;
  }

  #checkeds {
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
  }

  .dialos span {
    margin-left: 10%;
  }

  .dialos i {
    color: #f1e3a2;
  }

  .dialog {
    float: right;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(0, 97, 169, 1);
  }

  .dialo_opinion {
    margin-top: -5%;

    p {
      font-family: PingFangSC-Medium;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      font-size: 15px;
      margin-left: 2px;
    }
  }

  .dialo_opinionss {
    width: 100%;
    height: 1px;
    background: #ccc;
    margin-top: 1%;
    overflow: hidden;
  }

  .dialog_filess,
  li,
  .dialog_filesss {
    margin-top: 1%;
    font-size: 13px;
  }

  .dialog_filess li {
    margin-left: 3%;
  }

  .dialog_filesss li {
    margin-left: 12%;
  }

  .dialog_filesss ul {
    margin-top: 1%;
  }

  /* .dialo_opinion textarea{
        margin-top: 1%;
        width: 80%;
        height: 200px;
        resize:none;
        color:#ccc;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
    } */
  .dialos_boxp {
    width: 480px;
    height: 1px;
    background: rgba(0, 0, 0, 0.09);
    margin-left: -24px;
    margin-top: -23px;
    margin-bottom: 20px;
  }

  #dialo_textarea {
    width: 98%;
    height: 145px;
    resize: none;
    color: #ccc;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    border-radius: 2px;
    margin-top: 6px;
    margin-left: 2px;
    padding: 5px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.15);
  }

  .dialo_opinions {
    text-align: center;
  }

  .dialo_opinions span {
    text-align: left;
  }

  .dialo_opinions p {
    float: left;
    padding-left: 6%;
  }

  .dialo_opinions textarea {
    margin-top: 2%;
    width: 80%;
    height: 150px;
    resize: none;
    border-radius: 3px;
    color: #ccc;
    padding: 1%;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
  }

  .dialog_file {
    padding-top: 5%;
    width: 111%;
    height: 130px;
    /* border: 1px solid; */
    overflow: auto;
    margin-left: -24px;
    // border-bottom: 1px solid rgba(0,0,0,0.09);
    padding-left: 25px;

    span {
      font-size: 13px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(0, 97, 169, 1);
    }

    div {
      display: inline-block;
      width: 340px;
      height: auto;
      // border: 1px solid;
      position: absolute;
      height: 127px;
      overflow: hidden;
      overflow-y: auto;

      i {
        font-size: 14px;
        margin-left: -21px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        letter-spacing: 1px;
      }
    }
  }

  .dialog_file3 {
    padding-top: 5%;
    width: 106%;
    height: 50px;
    /* border: 1px solid; */
    overflow: auto;
    margin-left: -24px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.09);
    padding-left: 25px;

    div {
      width: 100%;
      height: auto;
      float: left;
      margin-top: -12px;
      margin-left: -79px;
    }

    span {
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      float: left;
      color: rgba(0, 0, 0, 0.85);
    }

    p {
      width: 99px;
      height: 30px;
      float: right;
    }
  }

  .dialog_filei {
    position: absolute;
    top: 78px;

    span {
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
  }

  #dialog_files {
    width: 44px;
    height: 23px;
    display: inline-block;
    background: #0061a9;
    color: white;
    text-align: center;
    line-height: 23px;
    border-radius: 3px;
  }

  .dialog_file3 p:first-child {
    margin-left: 5px;
  }

  #dialog-footer {
    text-align: right;
    margin-top: 14px;
  }

  .dialog_file input {
    opacity: 0;
    width: 50px;
    overflow: hidden;
    position: absolute;
    left: 43px;
  }

  .dialog_file button {
    /* margin-left: -257px; */
    margin-left: -8.5%;
  }

  .recall {
    text-align: center;
    width: 57px;
    height: 24px;
    border-radius: 3px;
    display: inline-block;
    border: 1px solid #ccc;
    font-size: 12px;
    line-height: 24px;
  }

  .recall:hover {
    background: #ccc;
    transition: 0.7s linear;
  }

  #reminder {
    text-align: center;
    width: 52px;
    height: 19px;
    border-radius: 3px;
    display: inline-block;
    border: 1px solid #ccc;
    font-size: 12px;
    line-height: 20px;
    margin-left: 0;
    margin-left: 2%;
    border: 1px solid #ccc;
  }

  .dialog_file select {
    width: 90px;
    border-radius: 3px;
    font-size: 13px;
    height: 20px;
  }

  .recalls_state {
    text-align: center;
    width: 60px;
    height: 19px;
    border-radius: 3px;
    display: inline-block;
    border: 1px solid #ccc;
    font-family: PingFangSC-Regular;
    color: #1890ff;
    font-size: 11px;
    line-height: 19px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }

  .recallss {
    text-align: center;
    width: 58px;
    height: 15px;
    border-radius: 3px;
    display: inline-block;
    // border: 1px solid #ccc;
    font-family: PingFangSC-Regular;
    color: #1890ff;
    font-size: 14px;
    line-height: 24px;
    // margin-left: 2%;
  }

  .recallss1 {
    margin-left: -13px;
    text-align: center;
    width: 56px;
    height: 15px;
    border-radius: 3px;
    display: inline-block;
    // border: 1px solid #ccc;
    font-family: PingFangSC-Regular;
    color: #1890ff;
    font-size: 14px;
    line-height: 24px;
  }

  .recallsss {
    margin-left: 8px;
    text-align: center;
    width: 58px;
    height: 15px;
    border-radius: 3px;
    display: inline-block;
    // border: 1px solid #ccc;
    font-family: PingFangSC-Regular;
    color: #1890ff;
    font-size: 14px;
    line-height: 24px;
  }

  .dialos i,
  .dialog_filess span {
    color: yellow;
  }

  .dialog_filesss p {
    margin-left: 3%;
  }

  #records {
    width: 100%;
    height: 100%;
    // margin-top: -29px;
    li {
      width: 100%;
      height: 30px;
      margin-top: 5px;
      line-height: 20px;
    }
  }

  .lispsan {
    font-size: 14px;
    font-family: PingFangSC-Medium;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.85);
  }

  //
  .linspans {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }

  .dialogs_files {
    width: 100%;
    height: 69px;
    overflow: hidden;
    margin-top: 2px;

    span {
      float: left;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }

    div {
      float: left;
      height: 69px;
      width: 80%;
      overflow: auto;

      li {
        width: 100%;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);

        a {
          text-align: right;
          color: #0061a9;
          font-size: 14px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
        }
      }
    }
  }

  .project {
    width: 100%;
    //    height:750px;
    overflow: hidden;
    overflow-y: auto;

    p {
      width: 107%;
      height: 1px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.15);
      margin-left: -25px;
      margin-top: -19px;
    }
  }

  .project1 {
    .attactment {
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      line-height: 46px;
    }

    ul {
      width: 100%;
      // min-height: 80px;
      padding-top: 2%;

      li {
        // float: left;
        width: 40%;
        height: 40px;
        margin-left: 4%;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.85);

        span {
          width: 215px;
          display: inline-block;
          height: 40px;

          div {
            width: 100%;
            font-size: 14px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.25);
          }
        }

        textarea {
          width: 106%;
          height: 81px;
          resize: none;
          background: rgba(255, 255, 255, 1);
          border-radius: 4px;
          border: 1px solid rgba(0, 0, 0, 0.15);
          float: right;
        }
      }
    }
  }

  .infored {
    color: red;
    font-size: 9px;
    margin-left: 37px;
  }

  #project2 {
    width: 100%;

    li {
      width: 100%;
      height: 22px;

      span {
        // width:83%;
        display: inline-block;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.65);
        padding-left: 3px;
      }
    }
  }

  .project2span {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
  }

  .project3 li:first-child {
    margin-top: 2%;
    margin-left: 4%;
    font-size: 14px;
    font-weight: bold;

    i {
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
    }

    p {
      border: none;
      float: left;
    }
  }

  .por1 {
    width: 21px;
    height: 21px;
    overflow: hidden;
    display: inline-block;
    border-radius: 30px;

    img {
      width: 100%;
    }
  }

  .pro3 {
    width: 50px;
    height: 1px;
    display: inline-block;
    vertical-align: text-top;
    background: #1890ff;
  }

  .pro4 {
    margin-left: 5px;
    width: 21px;
    height: 21px;
    overflow: hidden;
    display: inline-block;
    background: #0061a9;

    border-radius: 50%;
    color: white;
    text-align: center;
    line-height: 21px;
    font-size: 18px;
    cursor: pointer;
  }

  .pro5 {
    vertical-align: super;
  }

  .proend {
    width: 100%;
    height: 81px;
    margin-top: 3%;

    p {
      float: left;
      margin-left: 28px;
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      border: none;
    }

    textarea {
      float: left;
      margin-left: 110px;
      margin-top: -17px;
      width: 630px;
      height: 81px;
      resize: none;
      background: rgba(255, 255, 255, 1);
      border-radius: 4px;
      border: 1px solid rgba(0, 0, 0, 0.15);
    }
  }

  textarea {
    color: #333;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    padding: 1%;
  }

  .content_xz {
    width: 100%;
    height: 25px;
    background: white;
    overflow: hidden;
    // overflow-y: auto;
  }

  .projectmessage {
    position: relative;
    background: #fff;

    .el-breadcrumb {
      line-height: 40px;
      padding-left: 10px;
    }

    .finance_tit {
      padding: 10px 0;

      .el-button {
        float: right;
        margin-right: 20px;
      }

      span {
        float: left;
        color: #333;
        font-size: 16px;
        line-height: 32px;
        margin-left: 10px;
      }
    }

    .cont_box {
      .cont_area {
        padding: 10px;
        box-sizing: border_box;

        .cont_tit {
          width: 100%;
          padding: 0;
          height: 50px;
          line-height: 50px;

          span {
            float: left;
            font-size: 18px;
            font-weight: 600;
            line-height: 50px;
          }

          .el-button {
            float: right;
            margin-right: 10px;
          }

          i {
            float: left;
            color: blue;
            margin-left: 20px;
            cursor: pointer;
          }
        }

        .specif_cont {
          width: 100%;
          padding: 0;

          .specif_box {
            float: left;
            min-width: 30%;

            label {
              float: left;
              line-height: 30px;
              margin-left: 20px;
            }

            div {
              width: auto;
              float: left;
              line-height: 30px;
              margin-left: 20px;
            }
          }
        }
      }
    }

    .el-dialog {
      .step_box {
        text-align: center;

        .step_div {
          height: 50px;
          margin-bottom: 50px;
          padding-left: 20px;

          .add_step {
            float: left;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            position: relative;

            img {
              widht: 100%;
              height: 100%;
            }

            span {
              position: absolute;
              left: 0;
              bottom: -30px;
              width: 50px;
              text-align: center;
              line-height: 18px;
              font-size: 12px;
            }
          }

          .step_line {
            width: 130px;
            height: 3px;
            float: left;
            margin: 23px 3px;
            background: #ccc;
          }
        }

        .step_cont {
          text-align: left;

          .role_inp {
            width: 100%;
            line-height: 40px;

            label {
              display: inline-block;
              width: 120px;
              text-align: right;
            }
          }

          .step_suc {
            width: 100%;
            height: 80px;
            padding-left: 30px;

            img {
              float: left;
              margin-right: 30px;
              vertical-align: middle;
              width: 50px;
              height: 50px;
            }

            .suc_msg {
              float: left;

              p {
                line-height: 30px;
              }
            }
          }
        }
      }

      .stop_box {
        .el-scrollbar {
          .stop_list {
            position: relative;
            margin-bottom: 20px;

            .opt_file {
              position: absolute;
              left: 120px;
              top: 50px;
            }

            .audit_box {
              float: left;

              .audit_tit {
                color: #333;
              }

              .audit_two_tit {
                color: #999;
                line-height: 30px;

                span {
                  color: #666;
                }
              }

              .set_own {
                span {
                  display: inline-block;
                  margin-right: 10px;
                }

                .el-button {
                  width: 20px;
                  height: 20px;
                  padding: 0;
                  text-align: center;
                  line-height: 20px;
                }
              }
            }
          }
        }
      }
    }
  }

  .lca {
    text-align: left;
    display: inline-block;
    width: 300px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #333333;
  }

  .lca:hover {
    color: #0061a9;
  }

  .xm_message {
    li {
      float: left;
    }
  }


  #xm_message {
    width: 743px;
    height: 30px;
    margin-bottom: -15px;
    font-weight: bold;

    span {
      display: inline-block;
      font-size: 14px;
      line-height: 20px;
      width: 371px;
      height: 20px;
      overflow: hidden;
      color: #333;
    }
  }

  .sh_people {
    .sh_people_box {
      width: 100%;
      height: auto;
      font-size: 13px;
      font-weight: 400;
      display: flex;
      flex-flow: row wrap;

      .sh_people_name {
        display: flex;
        align-items: center;
      }

      .sh_people_line {
        display: inline-block;
        margin: 0 6px;
        width: 45px;
        height: 2px;
        background-color: #1a5fa4;
      }
    }
  }

  .cs_people {
    margin-top: 12px;
    height: auto;
    font-size: 13px;
    font-weight: 400;
    display: flex;
    flex-flow: row wrap;
    align-items: center;

    .cs_people_name_nodel,
    .cs_people_name_candel {
      margin-bottom: 12px;
      padding: 2px 0;
      padding-right: 15px;
      margin-right: 16px;
    }

    .cs_people_name_candel {
      position: relative;

      .delete-copy-person {
        position: absolute;
        right: 0;
        top: -4px;
        width: 15px;
        height: 15px;
        cursor: pointer;
        background: url("~@/assets/project_doc/deletePerson.png") no-repeat 0 0;
      }
    }
  }

  #copypeo {
    height: 85px;

    div {
      // width: 800px;

    }
  }

  .sponsor .no_data {
    padding: 30px 0;
    text-align: center;
  }

  .infowar {
    float: left;
    width: 10%;
    font-size: 23px;
    color: #e2bf40;
    margin-left: 17px;
  }

  .borrow_dialog {
    .borrow_middle {
      margin: 0 24px 0 24px;

      .borrow_middle_chunk_details {
        text-align: left;
        margin-top: 14px;
        padding-left: 6px;
      }

      .borrow_middle_chunk {
        display: flex;

        .borrow_middle_chunk_title {
          display: inline-block;
          margin-right: 14px;
          display: inline-block;
          font-size: 12px;
          width: 66px;
        }

        .borrow_middle_chunk_type {
          height: 20px;
          vertical-align: middle;
          display: inline-block;

          // display: flex;
          // justify-content: center;
          // align-items: center;
        }

        .borrow_middle_chunk_time {
          display: flex;
          flex-direction: column;

          .borrow_middle_chunk_time_top {
            width: 330px;

            .el-select {
              width: 100%;
            }
          }
        }

        .borrow_middle_chunk_left {
          width: 408px;
          height: 384px;
          border: 1px solid #DDDDDD;
          display: flex;
          flex-direction: column;
          border-radius: 5px;

          .borrow_middle_chunk_left_top {
            .borrow_middle_chunk_left_top_search {
              margin: 15px 41px 16px 15px;
              width: 354px;
            }
          }

          .borrow_middle_chunk_left_bottom {
            height: 315px;
            overflow:auto;
            .borrowList {
              .borrowList_item {
                padding-left: 15px;
                margin-top: 5px;
                display: flex;
                align-items: center;
                cursor: pointer;

                .borrowList_item_fileIcon {
                  width: 13px;
                  height: 14px;
                  display: inline-block;
                  background: url('~@/assets/manuscript_icon/file_icon.png') no-repeat;
                  background-size: 13px 14px;
                }

                .borrowList_item_title {
                  width: 300px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  margin-left: 5px;
                }
              }

              .borrowList_title {
                text-align: center;
              }
            }
          }
        }

        .borrow_middle_chunk_right {
          width: 408px;
          height: 384px;
          border: 1px solid #DDDDDD;
          margin-left: 10px;
          border-radius: 5px;

          .borrow_middle_chunk_right_title {

            padding: 19px 0 0 15px;
          }

          .borrow_middle_chunk_right_list {
            height: 345px;
            display: flex;
            flex-direction: column;

            .borrow_middle_chunk_right_list_item {
              width: 100%;
              margin-top: 3px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 5px 0 5px 0;

              .borrow_middle_chunk_right_list_item_title {
                display: inline-block;
                max-width: 326px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding-left: 15px;
              }

              .borrow_middle_chunk_right_list_item_del {
                display: inline-block;
                padding-right: 19px;
                cursor: pointer;
              }
            }

            .borrow_middle_chunk_right_list_item:hover {
              background: #F7F9FB;
            }
          }
        }

        .borrow_middle_chunk_remark {
          width: 830px;
        }

        .borrow_middle_chunk_content {
          flex: 1;
          display: flex;
          flex-direction: column;

          .borrow_middle_chunk_content_title {
            color: #333333;
          }

          .borrow_middle_chunk_content_middle {
            display: flex;
            flex-direction: column;

            .borrow_middle_chunk_content_middle_title {
              margin-top: 22px;

              .borrow_middle_chunk_content_middle_title_people {
                color: #333333;
              }

              .borrow_middle_chunk_content_middle_title_annotation {
                color: #999999;
              }
            }

            .initiate_title {
              font-family: Microsoft YaHei;
              display: block;

              .borrow_middle_chunk_content_middle_title_people {
                display: block;
              }

              .initiate_people {
                display: block;
                padding: 18px 0 20px 18px;
                font-size: 13px;
              }
            }

            .borrow_middle_chunk_content_middle_title:nth-child(1) {
              margin-top: 0;

            }

            .borrow_middle_chunk_content_middle_operation {
              width: 100px;
              margin-top: 10px;
              display: flex;
              align-items: center;
              cursor: pointer;

              .borrow_middle_chunk_content_middle_operation_icon {
                width: 24px;
                height: 24px;
                background: url('~@/assets/common_icon/addtask_icon.png') no-repeat;
                background-size: 24px 24px;
              }

              .borrow_middle_chunk_content_middle_operation_title {
                color: #1462A3;
                margin-left: 6px;
              }
            }

            .borrow_middle_chunk_content_middle_list {
              max-height: 216px;
              overflow-y: auto;

              .el-tag {
                margin: 10px 10px 10px 0;
              }
            }
          }

          .borrow_middle_chunk_content_remark {
            display: flex;

            .borrow_middle_chunk_content_remark_title {
              display: inline-block;
              color: #000000;
              width: 66px;
              overflow: hidden;
            }

            .borrow_middle_chunk_content_remark_content {
              width: 740px;
            }
          }
        }
      }

      .borrow_middle_chunk:nth-child(1) {
        margin-top: 24px;
      }

      .borrow_middle_chunk:nth-child(2) {
        margin-top: 18px;
        align-items: center;
      }

      .borrow_middle_chunk:nth-child(3) {
        margin-top: 14px;
        margin-left: 80px;
      }

      .borrow_middle_chunk:nth-child(4) {
        margin-top: 20px;
      }

      .borrow_middle_chunk:nth-child(5) {
        margin-top: 20px;
      }
    }
  }

  .borrow_dialog .el-dialog__body {
    padding: 0;
    text-align: left;
  }

  .borrow_dialog .el-textarea {
    width: 100%;
  }

  .borrow_dialog .el-textarea {
    width: 100%;
  }

  .proPigeonhole_dialog .el-dialog__body {
    padding: 0;
  }

  .proPigeonhole_dialog {
    .pigeonhole_middle {
      text-align: left;
      width: 100%;

      .p_middle_title {
        font-size: 16px;
        color: #333333;
        margin: 18px 0 0 24px;
      }

      .proPigeonhole_title {
        display: inline-block;
        color: #000000;
        margin-left: 24px;
        width: 66px;
        overflow: hidden;
      }

      .p_middle_nav {
        width: 100%;
        margin: 23px 0 0 0;
        display: flex;

        .p_middle_nav_chunk {
          display: flex;
          align-items: center;
          justify-content: center;

          .p_middle_nav_chunk_title {
            display: inline-block;
            color: #000000;
          }

          .p_middle_nav_chunk_title_proName {
            margin-left: 24px;
          }

          .p_middle_nav_chunk_title_proNumber {
            margin-left: 37px;
          }

          .p_middle_nav_chunk_proName {
            width: 330px;
            margin-left: 18px;
          }

          .p_middle_nav_chunk_proNumber {
            width: 228px;
            margin-left: 9px;
          }
        }
      }

      .p_middle_pigeonholeStage {
        margin: 23px 0 0 0;
        display: flex;
        align-items: center;

        .p_middle_pigeonholeStage_stage {
          width: 665px;
          margin-left: 18px;
        }
      }

      .p_middle_remark {
        width: 100%;
        display: flex;
        margin-top: 14px;

        .p_middle_remark_content {
          width: 670px;
          margin-left: 18px;
        }
      }

      .p_middle_audit {
        width: 100%;
        display: flex;
        margin-top: 21px;

        .p_middle_audit_title {
          display: inline-block;
          color: #000000;
          margin-left: 24px;
        }

        .p_middle_audit_content {
          flex: 1;
          display: flex;
          flex-direction: column;
          margin-left: 18px;

          .p_middle_audit_content_middle {
            display: flex;
            flex-direction: column;

            .p_middle_audit_content_middle_title {
              margin-top: 10px;

              .p_middle_audit_content_middle_title_people {
                color: #333333;
              }

              .p_middle_audit_content_middle_title_annotation {
                color: #999999;
              }
            }

            .initiate_title {
              font-family: Microsoft YaHei;
              display: block;

              .borrow_middle_chunk_content_middle_title_people {
                display: block;
              }

              .initiate_people {
                display: block;
                padding: 18px 0 20px 18px;
                font-size: 13px;
              }
            }

            .p_middle_audit_content_middle_title:nth-child(1) {
              margin-top: 0;
            }

            .p_middle_audit_content_middle_operation {
              width: 100px;
              margin-top: 10px;
              display: flex;
              align-items: center;
              cursor: pointer;

              .p_middle_audit_content_middle_operation_icon {
                width: 24px;
                height: 24px;
                background: url('~@/assets/common_icon/addtask_icon.png') no-repeat;
                background-size: 24px 24px;
              }

              .p_middle_audit_content_middle_operation_title {
                color: #1462A3;
                margin-left: 6px;
              }
            }

            .p_middle_audit_content_middle_list {
              max-height: 216px;
              overflow-y: scroll;

              .el-tag {
                margin: 10px 10px 10px 0;
              }
            }
          }

          .p_middle_audit_content_remark {
            display: flex;

            .p_middle_audit_content_remark_title {
              display: inline-block;
              color: #000000;
              width: 66px;
              overflow: hidden;
            }

            .p_middle_audit_content_remark_content {
              width: 580px;
              margin-left: 18px;
            }
          }
        }
      }
    }
  }

</style>
<style lang="scss" scoped>

  .first-title {
    height: 22px;
    font-size: 16px;
    font-weight: bold;
    color: #333333;
    line-height: 40px;
    margin-right: 10px;
    display: inline-block;
    width: 80px;
    text-align: right;
  }


  .sponsor .el-dialog__header {
    border-bottom: solid 1px #eaeaea !important;
  }

  .lxsq_box .el-input__inner {
    height: 40px;
    line-height: 40px;
  }

  /* .el-dialog {
  text-align: left;
} */
  .el-dialog__body label {
    width: 100px;
    text-align: right;
    display: inline-block;
  }

  .el-dialog__body .label_take {
    float: left;
  }

  .inp_pass {
    width: 330px;
  }

  .firstsh .firstsh3 {
    width: 16%;
    height: 94px;
    background: white;
    border-radius: 4px;
    border: 1px solid #e9e9e9;
    float: left;
    margin-bottom: 12px;
    margin-right: 1%;
    line-height: 94px;
    text-align: left;
    -webkit-box-shadow: #e9e9e9 0px 0px 1px;
    box-shadow: #e9e9e9 0px 0px 1px;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  #inputs {
    resize: none;
  }

  .file_list > li {
    padding: 0 80px;
  }

  .file_list p.attachemnt-list-title {
    border: none;
    width: 100%;
    display: flex;
    margin: 0;
    padding: 0;
    height: auto;
  }

  .file_list p.attachemnt-list-title .doc-name {
    display: inline-block;
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .file_list p.attachemnt-list-title .doc-delete {
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    margin-top: 2px;

  }

  ul.file_list {
    margin-bottom: 20px;
  }

  ul.attachment-wrap {
    margin-left: 95px;
    padding-right: 20px;
  }

  .attachment-wrap .attachemnt-list-item p.attachemnt-list-doc {
    display: flex;
    width: 100%;
    height: 30px;
    line-height: 30px;
    border: none;
    margin: 0;
  }

  p.attachemnt-list-doc .doc-name {
    display: inline-block;
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  p.attachemnt-list-doc .doc-delete {
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    margin-top: 2px;

  }

  /* 解决ie11 文字遮挡 */
  /deep/ .el-scrollbar .el-scrollbar__wrap {
    padding-right: 17px;
    // margin-right:0 !important;
  }
  .project1 ul li:nth-child(4) span {
    width: 248px !important;
    margin-left: 3px !important;
  }
</style>
<style>
  .content .el-tabs__nav-prev {
    position: absolute;
    top: -3px;
  }

  .content .el-tabs__nav-next {
    position: absolute;
    top: -3px;
  }

  .content .el-dialog__header {
    padding-left: 45px;
    padding-right: 45px;
    height: 40px;
  }

  /*.xm_message ul li:nth-child(3) {*/
  /*  margin-left: 5%;*/
  /*}*/
  /*.project1 ul li:nth-child(3) p {*/
  /*  margin-left: -5px !important;*/
  /*}*/
  /*.project1 ul li:nth-child(3) span {*/
  /*  width: 248px !important;*/
  /*  margin-left: 3px !important;*/
  /*}*/
  .xm_message ul li:nth-child(4) {
    margin-left: 48px;
  }

  /* .project1 ul li:nth-child(4) span {
    width: 248px !important;
    margin-left: 3px !important;
  } */

  .remindRight {
    margin-right: 20px;
  }

  .remindRight .userbtn {
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .remindContent {
    margin-top: 10px;
  }

  .examine .el-dialog__body label {
    width: 50px;
  }
</style>


