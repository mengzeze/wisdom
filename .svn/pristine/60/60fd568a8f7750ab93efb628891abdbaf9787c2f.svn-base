<template>
  <div class="projectlist">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>项目管理</el-breadcrumb-item>
      <el-breadcrumb-item>项目列表</el-breadcrumb-item>
    </el-breadcrumb>
      <div class="page_title" style="position: relative;">
          <span>项目列表</span>
          <div v-show="btnShow" class="finance_tit" >
              <el-button style="position: absolute;top: -11px;right: 88px;" @click="newProFn"  type="primary" v-if="$utils.checkSystemPermission('project_add')"><span style="display: inline-block;margin-right: 5px;font-weight: 600;color: #fff;line-height: 12px;font-size: 14px;">+</span>新建项目</el-button>
              <el-button style="position: absolute;top: -11px;right: -2px;" type="primary" @click="addProjectFn" class="back_btn" v-if="$utils.checkSystemPermission('project_apply')">加入</el-button>
          </div>
      </div>
      <div class="page_cen"></div>
    <el-tabs @tab-click="tabClick" type="border-card" v-model="tabValue">
      <el-tab-pane label="项目列表" name="项目列表" >
            <div id="pro_list_scro" v-on:keyup.enter="searchBtn">
                <el-form ref="form"  label-width="100px" class="form_box clearfix list_form">
                    <el-form-item label="项目编码：">
                        <el-input v-model="codeCont" placeholder="请输入项目编码" maxlength="50"></el-input>
                    </el-form-item>
                    <el-form-item label="项目名称：">
                        <el-input v-model="keyWord" placeholder="请输入项目名称" maxlength="50"></el-input>
                    </el-form-item>
                    <el-form-item label="业务类型：">
                        <el-input v-model="financingName" placeholder="请选择业务类型" class="fin_inp" disabled></el-input>
                        <el-button  @click="optType(1)" type="primary">选择</el-button>
                    </el-form-item>
                </el-form>
                <el-form ref="form"  label-width="100px" class="form_box clearfix list_form">
                    <el-form-item label="项目状态：">
                        <el-select v-model="completeFlagName" placeholder="请选择项目状态" clearable  @change="selectRoleChange">
                            <el-option v-for="item in selectRoleList" :key="item.value" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="项目阶段：" :title="proObj.pro_type == ''?'请先选择业务类型':''">
                        <el-select v-model="stage_name" placeholder="请选择项目阶段" clearable @change="selectStageChange" :disabled="financingName == ''">
                            <el-option v-for="item in selectStageList" :key="item.value" :lable="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-button  icon="el-icon-search" type="primary" @click="searchBtn" class="search-btn">查询</el-button>
                    <el-button  icon="el-icon-refresh" @click="resetBtn(1)" class="search-btn">重置</el-button>
                 </el-form>
              </div>
        <el-table :data="tableData" fit show-header :header-cell-style="{background:'#FAFAFA',color:'#000'}" style="width: 100%" class="pro_table">
          <el-table-column prop="code" label="项目编码" align="center" min-width="100">
              <template slot-scope="scope">
                <!--  <p :title="scope.row.code" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.code}}</p>-->
                  <p :title="scope.row.code" class="ellipsis1">{{scope.row.code}}</p>
              </template>
          </el-table-column>
          <el-table-column prop="name" label="项目名称" align="center"  min-width="100">
              <template slot-scope="scope">
                <!--  <p :title="scope.row.name" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.name}}</p>-->
                <!-- style="padding:0;width:100%;line-height:22px;" -->
                  <el-button @click="handleEdit(scope.$index, scope.row)"
                             type="text"
                             class="ellipsis1 btn-width-style"
                             :title="scope.row.name">{{ scope.row.name }}</el-button>
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
              <template slot-scope="scope" v-if="scope.row.isCreatePerson && scope.row.linkProjectHide === 0">
                  <p :title="scope.row.linkProjectName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" @click="relationProjectGoTask(scope.row.linkProjectId,scope.row.linkProjectName)">{{scope.row.linkProjectName}}</p>
              </template>
          </el-table-column>
          <el-table-column prop="picNames" label="项目负责人" align="center"  min-width="100">
              <template slot-scope="scope">
                  <p :title="scope.row.picNames" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.picNames}}</p>
              </template>
          </el-table-column>
          <el-table-column prop="projectStatus" label="项目状态" align="center"  min-width="100">
              <template slot-scope="scope">
                  <p :title="scope.row.projectStatus" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.projectStatus}}</p>
              </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center"  min-width="100">
              <template slot-scope="scope">
<!--                  <p :title="scope.row.createTime" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.createTime}}</p>-->
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
                <el-button type="text"  @click="handleEdit(scope.$index, scope.row)" title="详情">
                    <i class="icon-operate-btn iconfont wenzhang"></i>
                </el-button>
            </template>
          </el-table-column>
        </el-table>
                <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="dataTotal" :pageSize="pageSize" :page-sizes="pageSizes" :current-page="currentPage" @current-change="onPageChange" @size-change="handleSizeChange"></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="项目终止库" name="项目终止库" v-if="stopFlag">
          <div  v-on:keyup.enter="searchBtn">
        <el-form ref="form" :model="stop_form" label-width="100px" class="form_box clearfix">
          <el-form-item label="项目编码：">
            <el-input v-model="stop_form.pro_code" placeholder="请输入项目编码" maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="项目名称：">
            <el-input v-model="stop_form.pro_name" placeholder="请输入项目名称" maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="终止原因：">
            <el-input v-model="stop_form.pro_text" placeholder="请输入终止原因" maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="终止时间：">
            <el-date-picker @focus="$utils.handleTimeFocus" v-model="stop_form.pro_date" type="date" placeholder="请选择终止日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
            <el-button  type="primary" icon="el-icon-search" @click="searchBtn">查询</el-button>
            <el-button @click="resetBtn(2)"  icon="el-icon-refresh">重置</el-button>
        </el-form>
        </div>
        <el-table :data="stopTableData" fit show-header  :header-cell-style="{background:'#FAFAFA',color:'#000'}"  style="width: 100%" class="pro_table">
          <el-table-column prop="code" label="项目编码" align="center" min-width="100">
              <template slot-scope="scope">
                  <p :title="scope.row.code" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.code}}</p>
              </template>
          </el-table-column>
          <el-table-column prop="name" label="项目名称" align="center" min-width="100">
              <template slot-scope="scope">
                  <p :title="scope.row.name" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.name}}</p>
              </template>
              <!-- <template slot-scope="scope">
                <el-button @click="handleEdit(scope.$index, scope.row)"
                    type="text"
                    class="ellipsis1"
                    style="padding:0;width:100%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                    :title="scope.row.name">{{ scope.row.name }}
                </el-button>
              </template> -->
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
              <template slot-scope="scope" v-if="scope.row.isCreatePerson && scope.row.linkProjectHide === 0">
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
                  <p :title="scope.row.stopLibraryInfo.updateTime" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.stopLibraryInfo.updateTime}}</p>
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
                <!-- 项目终止库中详情操作与其他状态项目一致  -->
                    <el-button type="text"  @click="handleEdit(scope.$index, scope.row)"
                    title="查看"><i class="icon-operate-btn iconfont wenzhang"></i></el-button>
                    <!-- <el-button type="text"  @click="handleEditStop(scope.$index, scope.row)"
                    title="查看"><i class="icon-operate-btn iconfont wenzhang"></i></el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="dataTotal" :pageSize="pageSize" :page-sizes="pageSizes" :current-page="currentPage" @current-change="onPageChange" @size-change="handleSizeChange"></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="回收站" name="回收站" v-if="recoverFlag">
            <!-- <ul>
                <li class="clearfix">
                    <span>项目名称</span>
                    <span>修改时间</span>
                </li>
                <li v-for="item in objectData" class="clearfix recover_li" :title="item.name" @mouseenter="overFn(item)" @mouseleave="leaveFn(item)">
                    <span :title="item.name">{{item.name}}</span>
                    <span v-if="item.cover == true">{{item.projectRecycleBinInfo.updateTime}}</span>
                    <span v-if="item.cover == false" @click="recoverProFn(item)" style="cursor: pointer" class="project_reduction">恢复项目</span>
                </li>
                <li style="line-height: 40px;color:#999;text-align: center;height:40px;" v-if="cover_data">暂无数据</li>
           </ul> -->
        <el-table :data="objectData" fit show-header  :header-cell-style="{background:'#FAFAFA',color:'#000'}"
          style="width: 100%" class="pro_table recover_pro_table">
            <el-table-column label="项目名称" align="center" min-width="100">
                <template slot-scope="scope">
                    <p :title="scope.row.name" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.name}}</p>
                </template>
            </el-table-column>
            <el-table-column label="修改时间" align="center" min-width="80" width="300">
                <template slot-scope="scope">
                    <p :title="scope.row.projectRecycleBinInfo.updateTime"   style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.projectRecycleBinInfo.updateTime}}</p>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="200">
                <template slot-scope="scope">
                    <el-button type="text"  @click="recoverProFn(scope.row)"  title="恢复项目"
                    ><i class="icon-operate-btn iconfont huifu"></i></el-button>
                </template>
          </el-table-column>
        </el-table>
        <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="dataTotal" :pageSize="pageSize" :page-sizes="pageSizes" :current-page="currentPage" @current-change="onPageChange" @size-change="handleSizeChange"></el-pagination>
      </el-tab-pane>
      <el-tab-pane v-if="$utils.m('paper_manage')" label="归档库" name="归档库">
            <el-table :data="pigeonholeTableData" fit show-header  :header-cell-style="{background:'#FAFAFA',color:'#000'}"  style="width: 100%" class="pro_table place_file_pro_table">
                <el-table-column label="项目名称" align="center" min-width="100">
                    <template slot-scope="scope">
                        <p :title="scope.row.projectName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.projectName}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="项目编码" align="center" min-width="80">
                    <template slot-scope="scope">
                        <p :title="scope.row.code" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.code}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="业务类型" align="center" min-width="70">
                    <template slot-scope="scope">
                        <p :title="scope.row.financingName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.financingName}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="当前归档阶段" align="center" min-width="60">
                    <template slot-scope="scope">
                        <p :title="scope.row.stageName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.stageName}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="历史归档阶段" align="center" min-width="60">
                    <template slot-scope="scope">
                        <p :title="scope.row.oldStageName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.oldStageName}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="当前归档时间" align="center" min-width="80">
                    <template slot-scope="scope">
                        <p :title="scope.row.createTime" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.createTime}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="当前归档人员" align="center" min-width="60" class-name="stop_take">
                    <template slot-scope="scope">
                        <p :title="scope.row.userName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.userName}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <div class="pigeonholeTable_operation">
                            <div  @click="examineFn(scope.row)"
                                  v-if="scope.row.querySeal"
                                  class="icon-operate-btn iconfont yanjing"
                                  title="查看底稿"></div>
                            <div  @click="borrowFn(scope.row)"
                                  class="icon-operate-btn iconfont shiwujieyue"
                                  title="借阅"></div>
                            <div  v-if="scope.row.queryBorring"
                                  @click="borrowRecordFn(scope.row)"
                                  class="icon-operate-btn iconfont file-management-borrowed-record"
                                  title="借阅记录"></div>
                        </div>

                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="dataTotal" :pageSize="pageSize" :page-sizes="pageSizes" :current-page="currentPage" @current-change="onPageChange" @size-change="handleSizeChange"></el-pagination>
        </el-tab-pane>
    </el-tabs>
    <!--新建项目-->
    <el-dialog title="新建项目"  :visible.sync="dialogVisible" :close-on-click-modal="false" :before-close="handleCloseProject" width="790px" class="create_dialog">
      <div style="height:550px;" class="newProDiv">
        <el-scrollbar style="height:100%">
<!--          客户信息-->
          <div v-if="$utils.m('customer_manage')" class="form_box form_box_cus">
            <span class="dialog_tit">客户信息</span>
            <el-form ref="form" :model="cusObj" label-width="100px" class="form_box clearfix">
              <el-form-item label="客户名称：" :rules="[{required: true}]">
                  <el-select v-model="cusObj.cus_name" placeholder="请选择" filterable @change="handleSelect">
                      <el-option
                          v-for="item in customOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="所属行业：" :rules="[{required: true}]">
                <el-input v-model="cusObj.cus_job" maxlength="10" disabled></el-input>
              </el-form-item>
              <el-form-item label="客户类型：" :rules="[{required: true}]">
                <el-input v-model="cusObj.cus_type" maxlength="10" disabled></el-input>
              </el-form-item>
              <el-form-item label="成立时间：">
                <el-date-picker @focus="$utils.handleTimeFocus" v-model="cusObj.cus_time" type="date" placeholder="选择日期" disabled></el-date-picker>
              </el-form-item>
              <el-form-item label="法人代表：">
                <el-input v-model="cusObj.cus_legal" maxlength="20" disabled></el-input>
              </el-form-item>
              <el-form-item label="联系电话：">
                <el-input v-model="cusObj.cus_phone" maxlength="11" disabled></el-input>
              </el-form-item>
              <el-form-item label="主营业务：" :rules="[{required: true}]">
                <el-input
                  type="textarea"
                  :rows="2"
                  v-model.trim="cusObj.cus_range"
                  :maxlength="200"
                  resize="none"
                  disabled
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
<!--          项目信息-->
          <div class="form_box form_box_pro">
            <span class="dialog_tit">项目信息</span>
            <el-form ref="form" :model="proObj" label-width="100px" class="form_box clearfix">
              <!-- <el-form-item label="项目编码：" :rules="[{required: true}]">
                  <el-input v-model="proObj.pro_code_input" placeholder="请输入项目编码" :maxlength="50"  @blur="inputProjectCodeBlur"></el-input>
              </el-form-item> -->
              <el-form-item label="项目编码：">
                  <el-input placeholder="自动生成" disabled></el-input>
              </el-form-item>
              <el-form-item label="项目名称：" :rules="[{required: true}]">
                  <el-input v-model="proObj.pro_name" placeholder="请输入项目名称" :maxlength="50"></el-input>
              </el-form-item>
              <el-form-item label="业务类型：" :rules="[{required: true}]">
                <el-input v-model="proObj.pro_type" placeholder="请选择" disabled></el-input>
                <el-button type="primary" @click="optType(2)" class="opt_btn">选择</el-button>
              </el-form-item>
              <el-form-item label="项目简称：">
                <el-input v-model="proObj.pro_job" placeholder="请输入项目简称" :maxlength="20"></el-input>
              </el-form-item>
              <el-form-item label="开始阶段：" :rules="[{required: true}]" :title="proObj.pro_type == ''?'请先选择业务类型':''">
                  <el-select v-model="cusObj.start_stage_id" placeholder="请选择" filterable @change="startStageChange" :disabled="proObj.pro_type == ''">
                      <el-option
                          v-for="item in startStageList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id" :sort="item.sort">
                      </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="结束阶段：" :rules="[{required: true}]"  :title="(proObj.pro_type == '' || cusObj.start_stage_id == '')?'请先选择业务类型和开始阶段':''">
                  <el-select v-model="end_stage_id" placeholder="请选择" filterable  @change="endStageChange" :disabled="(proObj.pro_type == '' || cusObj.start_stage_id == '')">
                      <el-option
                          v-for="item in endStageList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                          :disabled="item.disabled">
                      </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="计划开始时间：" label-width="120px" style="margin-left:-20px">
                <el-date-picker @focus="$utils.handleTimeFocus" v-model="proObj.pro_start" type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
              </el-form-item>
              <el-form-item label="计划结束时间：" label-width="120px" style="margin-left:6px">
                <el-date-picker @focus="$utils.handleTimeFocus" v-model="proObj.pro_stop" type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
              </el-form-item>
              <el-form-item label="所属部门：" :rules="[{required: true}]">
                <el-input v-model="proObj.pro_legal" placeholder="请选择" disabled></el-input>
                <el-button type="primary" @click="optDepart" class="opt_btn">选择</el-button>
              </el-form-item>
              <!-- 组件 -->
              <el-form-item label="关联项目：">
                <select-lazy
                  v-model="cusObj.relation_pro" 
                  @change="relationProjectChange" 
                  filterable 
                  placeholder="请选择" 
                  :list="relationProjectList">
                    </select-lazy>
              </el-form-item>
              <!-- 报送新增字段 -->
              <el-form-item label="上市/挂牌板块：" label-width="120px" style="margin-left:-20px">
                  <el-select v-model="proObj.ipoMarket" placeholder="请选择上市/挂牌板块" clearable>
                      <el-option
                          v-for="item in projectPlat"
                          :key="item.label"
                          :label="item.label"
                          :value="item.id">
                      </el-option>
                  </el-select>
              </el-form-item>
                <el-form-item></el-form-item>
                <el-form-item label="项目区域：">
                  <el-select v-model="proObj.itemArea"
                            @change="areaChange(proObj.itemArea, projectArea)"
                            clearable placeholder="请选择项目区域" filterable>
                      <el-option
                          v-for="item in projectArea"
                          :key="item.label"
                          :label="item.label"
                          :value="item.id">
                      </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  v-if="proObj.itemArea === '900000'" label="区域名称：" :rules="[{required: true}]">
                    <el-input v-model="proObj.areaName" @input="change($event)" placeholder="请输入区域名称" :maxlength="30"></el-input>
                </el-form-item>
              <el-form-item v-if="proObj.itemArea !== '900000'"></el-form-item>
              <el-form-item label="申报时间：">
                <el-date-picker
                    @focus="$utils.handleTimeFocus"
                    v-model="proObj.reportTime"
                    type="date" placeholder="请选择日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
                    <!-- content="项目的申报受理日期，项目信息报送以后，报送过申报时间后不可更改" -->
                <el-tooltip
                    placement="top" effect="dark">
                    <div slot="content">项目的申报受理日期，项目信息报送以后，<br/>报送过申报时间后不可更改。</div>
                    <i class="el-icon-warning-outline"></i>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="发行时间：" class="issue-mleft">
                <el-date-picker
                    @focus="$utils.handleTimeFocus"
                    v-model="proObj.issueTime"
                    type="date" placeholder="请选择日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
                    <!-- content="适用上市/挂牌时间的，填写上市/挂牌时间；不适用上市/挂牌时间的，填写“缴款截止日”" -->
                <el-tooltip
                    placement="top" effect="dark">
                    <div slot="content">适用上市/挂牌时间的，填写上市/挂牌时间；<br/>不适用上市/挂牌时间的，填写“缴款截止日。项目信息<br/>报送以后，报送过申报时间后不可更改</div>
                    <i class="el-icon-warning-outline"></i>
                </el-tooltip>
              </el-form-item>
              <!-- 证券类 -->
              <security-message ref="securt" :stkAndTps="stkAndTps" :type="'newMessage'"></security-message>
              <el-form-item label="项目描述：">
                <el-input
                  type="textarea"
                  :rows="2"
                  v-model.trim="proObj.pro_range"
                  placeholder="请输入项目描述"
                  :maxlength="1000"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
<!--          中介机构-->
          <div v-if="$utils.m('customer_manage')" class="form_box">
            <div>
              <div class="dialog_tit dialog_tit_zhong">
                  <span>中介机构</span>
                  <div class="add_finan">
                        如果系统中没有可选的中介机构，请在此处添加 <span class="add_finan_tit color-primary" @click="addFinan">新建中介机构</span>
                    </div>
              </div>

            </div>
            <el-form ref="form" :model="finObj" label-width="120px" class="form_box clearfix">
              <el-form-item label="会计师事务所：">
                <el-input v-model="finObj.fin_acco" placeholder="请选择" disabled></el-input>
                <el-button type="primary" @click="finanOpt" class="opt_btn">选择</el-button>
              </el-form-item>
              <el-form-item label="律师事务所：">
                <el-input v-model="finObj.fin_lawyer" placeholder="请选择" disabled></el-input>
                <el-button type="primary" @click="finanOpt" class="opt_btn">选择</el-button>
              </el-form-item>
              <el-form-item label="资产评估机构：">
                <el-input v-model="finObj.fin_asset" placeholder="请选择" disabled></el-input>
                <el-button type="primary" @click="finanOpt" class="opt_btn">选择</el-button>
              </el-form-item>
              <el-form-item label="信用评级机构：">
                <el-input v-model="finObj.fin_credit" placeholder="请选择" disabled></el-input>
                <el-button type="primary" @click="finanOpt" class="opt_btn">选择</el-button>
              </el-form-item>
              <el-form-item label="券商机构：">
                <el-input v-model="finObj.fin_rela" placeholder="请选择" disabled></el-input>
                <el-button type="primary" @click="finanOpt" class="opt_btn">选择</el-button>
              </el-form-item>
            </el-form>
          </div>
<!--          团队成员-->
          <div class="form_box">
            <span class="dialog_tit">团队成员</span>
            <el-form ref="form" :model="teamObj" label-width="120px" class="form_box clearfix">
              <el-form-item label="团队成员：">
                <el-input v-model="teamObj.team_user1" placeholder="请选择" disabled></el-input>
                <el-button type="primary" @click="teamMemb" class="opt_btn">选择</el-button>
              </el-form-item>
              <div v-for="item in roleList" class="team_box_div clearfix">
                  <label class="team_box_label"><span class="team_box_span" :title="item.name.length > 5 && item.name ">{{item.name}}</span>:</label><el-input v-model="item.value" disabled></el-input>
              </div>
            </el-form>
          </div>
        </el-scrollbar>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="closeNewProjectDialog">取 消</el-button>
        <el-button size="medium" type="primary" @click="saveMsg" :disabled="newProtep">创 建</el-button>
      </span>
    </el-dialog>
    <!--选择任务模板-->
    <el-dialog title="选择任务模板" :close-on-click-modal="false" :visible.sync="taskVisible" :before-close="handleClose"  width="790px" style="overflow: hidden">
      <div class="opt_task">
        <el-scrollbar style="height:100%;overflow-x: hidden;">
          <div class="temp_task">
            <span class="temp_tit"><img src="../../../assets/prolist/biao.png" width="16px" />标准模板</span>
            <p>股权融资业务（业务类型默认）</p>
            <div class="clearfix temp_type">
              <div v-for="(item,index) in standObj" @click="checkTemp(item,standObj)" :class="item.canChoose ? 'classA temp_box' : 'temp_box' " >
                 <img src="../../../assets/taskmodel/model1.png" v-if="index == 0"/>
                  <img src="../../../assets/taskmodel/model2.png" v-if="index == 1"/>
                  <img src="../../../assets/taskmodel/model3.png" v-if="index == 2"/>
                  <img src="../../../assets/taskmodel/model4.png" v-if="index == 3"/>
                  <img src="../../../assets/taskmodel/model4.png" v-if="index != 3 && index != 2 && index != 1 && index != 0"/>
                <span @click.stop="previewFn(item)">预览</span>
                <p>{{item.financeTypeName}}{{item.name}}</p>
                <img src="../../../assets/taskmodel/checked.png" v-show="item.flag" class="check_icon"/>
              </div>
            </div>
          </div>
          <div class="other_task">
            <span class="temp_tit"><img src="../../../assets/prolist/oth.png" width="16px" />其他模板</span>
            <div class="clearfix temp_type">
              <div class="temp_box" v-for="(item,index) in otherObj" style="cursor:not-allowed">
                  <img src="../../../assets/taskmodel/other1.png" v-if="index == 0"/>
                  <img src="../../../assets/taskmodel/other2.png" v-if="index == 1"/>
                  <img src="../../../assets/taskmodel/other3.png" v-if="index == 2"/>
                  <img src="../../../assets/taskmodel/other4.png" v-if="index == 3"/>
                  <img src="../../../assets/taskmodel/other5.png" v-if="index != 3 && index != 2 && index != 1 && index != 0"/>
                <span @click.stop="previewFn(item)">预览</span>
                <p>{{item.financeTypeName}}{{item.name}}</p>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <span slot="footer" class="dialog-footer">
        <!--<el-button @click="backBefore">返回上一步</el-button>-->
         <el-button @click="taskVisibleFn()" class="skip_btn">跳过</el-button>
        <el-button type="primary" @click="sureTask">确认</el-button>
      </span>
    </el-dialog>
    <!--任务模板预览-->
    <el-dialog title="任务模板预览" :close-on-click-modal="false" :visible.sync="previewVisible" :before-close="backBeforeTask"  width="50%" class="task_dialog">
      <div class="task_modul">
        <el-scrollbar style="height:100%">
          <div class="clearfix modul_box" style="white-space: nowrap;">
            <div class="task_show" v-for="item in prevObj">
              <p class="task_tit">
                <span>{{item.stageName}}</span>
                <em>{{item.taskCount}}</em>
              </p>
              <ul>
                <li v-for="and in item.data" class="task_li">
                  <div class="task_li_title">
                    <router-link to="/project_tasks/tasks">
                        <el-checkbox class="task_li_title_check">
                            <span>{{and.name}}</span>
                        </el-checkbox>
                    </router-link>
                    <i class="task_li_title_icon"></i>
                  </div>
                </li>
                <li class="task_li" style="text-align: center;height:50px;line-height: 48px;font-size: 18px;font-weight: 600;">+</li>
              </ul>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="backBeforeTask">返回上一步</el-button>
        <el-button type="primary" @click="backBeforeTask">确 定</el-button>
      </span>
    </el-dialog>
    <!--申请加入项目-->
    <el-dialog title="申请加入项目" :close-on-click-modal="false" :visible.sync="addVisible" width="580px">
      <div class="visit_box">
        <div class="visit_search">
          <label>项目编码：</label>
            <el-input v-model.trim="pro_code" placeholder="请输入内容" class="inline-input" @keydown.native="enterEvent" :maxlength="50" style="width:300px;"></el-input>
            <el-button @click="searchCodeFn" size="medium" type="primary" style="height:40px;">搜索</el-button>
        </div>
        <div class="cont_box">
          <!--未搜索时-->
          <div class="no_search" v-show="no_search">您可以联系项目负责人索取项目编码/项目名称，申请加入对应的项目。 也可以由项目负责人邀请您加入项目。</div>
          <!--搜索无内容时-->
          <div class="null_search" v-show="null_search">搜索内容为空</div>
          <!--搜索信息-->
          <div class="search_result" v-show="search_result">
            <div class="result_box">
              <label>项目名称：</label><div class="result_div">{{searchCode.name}}</div>
            </div>
              <div class="result_box">
                  <label>项目简称：</label><div class="result_div">{{searchCode.abbreviation}}</div>
              </div>
              <div class="result_box">
                  <label>项目类型：</label><div class="result_div">{{searchCode.financingName}}</div>
              </div>
              <div class="result_box">
                  <label>项目负责人：</label><div class="result_div">{{searchCode.picNames}}</div>
              </div>
              <div class="result_box">
                  <label>项目描述：</label><div class="result_div">{{searchCode.description}}</div>
              </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer" v-show="search_result">
        <el-button size="medium" type="primary" @click="addVisit">申请加入</el-button>
      </span>
    </el-dialog>
    <!--借阅-->
    <el-dialog title="文件借阅" class="borrow_dialog" :close-on-click-modal="false" :visible.sync="borrowVisible" :before-close="borrowCloseFn"  width="958px" >
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
                            <el-button slot="append" icon="el-icon-search" @click="treeSearchFn" ></el-button>
                        </el-input>
                    </div>
                    <div class="borrow_middle_chunk_left_bottom">
                            <ul id="borrowTree" class="ztree borrowZtree" v-if="isSearchShow"></ul>
                            <div v-else class="borrowList">
                              <p v-if="borrowSearchFileList.length === 0" class="borrowList_title" >暂无数据</p>
                              <p v-for="(item,idx) in borrowSearchFileList" :key="idx" class="borrowList_item" @click="listItemClickFn(item)" v-else>
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
                            <p class="borrow_middle_chunk_right_list_item" v-for="(item,idx) in borrowFileList">
                                <span class="borrow_middle_chunk_right_list_item_title">{{item.docName}}</span>
                                <span class="borrow_middle_chunk_right_list_item_del color-primary" @click="borrowFileDelFn(item)">删除</span>
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
                <el-select size="small" v-model="value" filterable @change="middlechunk()" placeholder="请选择部门">
                    <el-option
                    v-for="item in isMultiDeptdata.deptList"
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
                            <p class="borrow_middle_chunk_content_middle_operation color-primary" @click="addCopyPeopleFn">
                                <i class="iconfont webicon308"></i><span >添加抄送人</span>
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
                                    :key="tag.userId"
                                    v-for="(tag,idx) in extCopyArray"
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
            <el-checkbox v-model="isSetRamindchecked">是否设置提醒</el-checkbox>
            <el-button size="medium" @click="borrowCloseFn">取消</el-button>
            <el-button size="medium" type="primary" @click="submitApprove">提 交</el-button>
        </span>
    </el-dialog>
     <!-- 是否设置提醒弹框 -->
    <el-dialog title="审批提醒"
               :visible.sync="approveRemind"
               width="720px"
               :before-close="handleClose">
      <div style="height: calc(100vh - 400px);">
        <el-scrollbar style="height: 100%">
          <el-form :model="formInline"
                   class="demo-form-inline"
                   label-width="100px"
                   style="text-align:left">
            <el-form-item label="提醒方式："
                          class="remindRight">
              <el-checkbox-group v-model="remindWay">
                <el-checkbox v-for="way in remindWayGrounp"
                             :label="way.label"
                             :key="way.value">{{way.label}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="接收人员："
                          class="remindRight">
              <el-tag v-for="(item,index) in approverData.approvalName"
                      :key="index"
                      class="userbtn"
                      @close="deletePerFnexam(index)"
                      :closable="!chack_bule">
                {{item}}
              </el-tag>
            </el-form-item>
            <el-form-item label="提醒内容："
                          class="remindRight">
              <el-input type="textarea"
                        cols="40"
                        rows="5"
                        resize="none"
                        v-model.trim="formInline.contentMessage"
                        maxlength="100"></el-input>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="approveRemindclose">取 消</el-button>
        <el-button type="primary"
                   @click="approveRemindSave">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
        title="提示"
        :close-on-click-modal="false"
        :visible.sync="checkout"
         width="450px"
        :before-close="handleClose">
        <div>
          <div :title="checkoutmsg" style=" word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;">
            <i class="el-icon-warning" style="font-size: 16px;vertical-align: text-bottom;color: #e6a23c;" aria-hidden="true"></i>
            {{checkoutmsg}}
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="small" @click="checkout = false">我知道了</el-button>
        </span>
    </el-dialog>
    <!--借阅记录-->
    <el-dialog title="借阅记录" class="borrowRecord_dialog" :close-on-click-modal="false" :visible.sync="borrowRecordVisible" width="958px" >
        <div class="borrowRecord_middle">
          <p class="b_middle_title">借阅记录</p>
          <div class="b_middle_nav">
              <div class="b_middle_nav_chunk">
                  <span class="b_middle_nav_chunk_title b_middle_nav_chunk_title_proName">借阅人员:</span>
                  <div class="b_middle_nav_chunk_borPeople" v-on:keyup.enter="borrowRecordSearchFn">
                      <el-input placeholder="请输入借阅人员" v-model="borPeople_input" maxlength="50"></el-input>
                  </div>
              </div>
              <div class="b_middle_nav_chunk">
                  <span class="b_middle_nav_chunk_title b_middle_nav_chunk_title_borTime">借阅时间:</span>
                  <div class="b_middle_nav_chunk_borTime">
                    <date-range :date-start.sync="startTime"
                                :date-end.sync="endTime"
                                width="160"
                                format="yyyy-MM-dd HH:mm:ss"></date-range>
                  </div>
              </div>
              <div class="b_middle_nav_chunkBtn">
                  <el-button size="medium" type="primary" @click="borrowRecordSearchFn">查询</el-button>
              </div>
              <div class="b_middle_nav_chunkBtn">
                  <el-button size="medium" @click="borrowRecordResetFn">重置</el-button>
              </div>
          </div>
          <el-scrollbar style="height:100%">
            <div class="b_middle_list" v-if="borrowRecordListData.length != 0">
              <div class="b_middle_chunk" v-for="(item,idx) in borrowRecordListData">
                <p class="b_middle_chunk_item">
                    <span>借阅时间：</span>
                    <span>{{item.createTime}}</span>
                </p>
                <p class="b_middle_chunk_item">
                    <span>借阅人员：</span>
                    <span>{{item.userName}}</span>
                </p>
                <p class="b_middle_chunk_item">
                    <span>借阅方式：</span>
                    <span>{{item.type != 1 ? '纸质借阅': '电子借阅'}}</span>
                </p>
                <p class="b_middle_chunk_item">
                    <span>借阅时长：</span>
                    <span>{{item.borrowingTime}}小时</span>
                </p>
                <div class="b_middle_chunk_item">
                    <span>借阅内容：</span>
                    <span class="b_middle_chunk_item_examineAll color-primary" @click="examineAllFn(item)">查看全部文件
                    <el-card class="box_card" v-if="item.fileShow">
                        <div  class="box_card_item">
                          <p class="" :title="item.fileName" v-for="(item,idx) in borrowRecordFileData" :key="idx">
                            <span class="box_card_item_fileIcon">
                              <img :src="item.fileIcon">
                            </span>
                            <span class="box_card_item_title">{{item.fileName}}</span>
                          </p>
                        </div>
                    </el-card>
                    </span>
                </div>
              </div>
            </div>
            <div class="b_middle_list" v-else>
              <p class="b_middle_list_noData">暂无数据</p>
            </div>
            <!-- <p class="b_middle_wireOne"></p> -->
          </el-scrollbar>
      </div>
    </el-dialog>
    <!--中介机构弹框 与 团队成员-->
    <new-project v-if="finanFlag" :finanObj='finanObj' :stateFin="stateFin"  v-on:finanProject='finanProject' :roleSelect="roleSelect"
        :selectAgenOrMem="selectAgenOrMem" :teamMemSelecRoleList="teamMemSelecRoleList"
    ></new-project>
    <new-projects v-if="finanFlags" :finanObj='finanObjs' v-on:finanProjects='finanProjects' :roleSelect="roleSelect"
                 :selectAgenOrMem="selectAgenOrMem" :teamMemSelecRoleList="teamMemSelecRoleList"
    ></new-projects>

        <!--融资类型弹框-->
        <project-type v-if="typeFlag" :typeObj='typeObj' :state="state"  v-on:typeProject='typeProject' :optState="optState"></project-type>
      <!--选择部门-->
      <frame-peos v-if="flags" :clearstate="clearstate" v-on:states="stateDepart" :treestate='treestate' :tree="tree"></frame-peos>
      <!--新增中介机构弹框-->
      <el-dialog title="新增中介机构" :visible.sync="finanVisible" :close-on-click-modal="false" width="790px">
          <span class="dialog_tit">机构信息</span>
          <div style="height:500px;">
              <el-scrollbar style="height:100%">
                  <el-form ref="msgObj" :model="msgObj" label-width="120px" class="form_box clearfix">
                      <el-form-item label="机构名称：" :rules="[{required: true}]">
                          <el-input v-model="msgObj.pro_name" placeholder="请输入机构名称"   :maxlength="100"></el-input>
                      </el-form-item>
                      <el-form-item label="机构简称：" :rules="[{required: true}]">
                          <el-input v-model="msgObj.abbreviation" placeholder="请输入机构简称"   :maxlength="50"></el-input>
                      </el-form-item>
                      <el-form-item label="机构类型：" :rules="[{required: true}]">
                          <el-select v-model="msgObj.type" placeholder="请选择机构类型" clearable  @change="selectRoleChange"  >
                              <el-option v-for="item in selectStateListState1" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                          </el-select>
                      </el-form-item>
                      <el-form-item label="合作状态：" :rules="[{required: true}]">
                          <el-select v-model="msgObj.status" placeholder="请选择合作状态" clearable  @change="selectRoleChange">
                              <el-option v-for="item in selectStateListState" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                          </el-select>
                      </el-form-item>
                      <el-form-item label="机构联系人：" :rules="[{required: true}]">
                          <el-input v-model="msgObj.contact" placeholder="请输入机构联系人" maxlength="20"></el-input>
                      </el-form-item>
                      <el-form-item label="客户负责人：" class="cus_prin" :rules="[{required: true}]">
                           <el-input v-model="msgObj.principal" placeholder="请选择客户负责人" disabled class="prin_user"></el-input>
                          <el-button type="primary" @click="optPrinFn" class="opt_btn">选择用户</el-button>
                      </el-form-item>
                      <el-form-item label="联系电话：" :rules="[{required: true}]">
                          <el-input v-model="msgObj.telephone" placeholder="请输入联系电话" maxlength="50"></el-input>
                      </el-form-item>
                      <el-form-item label="邮箱：" :rules="[{required: true}]">
                          <el-input v-model="msgObj.email" placeholder="请输入邮箱" maxlength="50"></el-input>
                      </el-form-item>
                      <el-form-item label="传真：">
                          <el-input v-model="msgObj.fax" placeholder="请输入传真"  maxlength="15"  ></el-input>
                      </el-form-item>
                      <el-form-item label="邮编：">
                          <el-input v-model="msgObj.postcode" placeholder="请输入邮编"  maxlength="6"></el-input>
                      </el-form-item>
                      <el-form-item label="办公地址：">
                          <el-input v-model="msgObj.address" placeholder="请输入办公地址" :maxlength="100" ></el-input>
                      </el-form-item>
                      <el-form-item label="机构网址：">
                          <el-input v-model="msgObj.website" placeholder="请输入机构网址"   :maxlength="100"></el-input>
                      </el-form-item>
                      <el-form-item label="机构简介：" style="margin-top:10px;">
                          <el-input type="textarea" :rows="2"  v-model.trim="msgObj.introduction" placeholder="请输入机构简介"  :maxlength="2000" resize="none"></el-input>
                      </el-form-item>
                      <el-form-item label="备注：" style="margin-top:10px;">
                          <el-input type="textarea" :rows="2"  v-model.trim="msgObj.remarks" placeholder="请输入备注"   :maxlength="100" resize="none"></el-input>
                      </el-form-item>
                  </el-form>
              </el-scrollbar>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="finanVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveFinanMsg">保存</el-button>
        </span>
      </el-dialog>
        <el-dialog
            title="提示"
            :close-on-click-modal="false"
            :visible.sync="checkout"
            width="450px">
            <div>
            <div :title="checkoutmsg" style=" word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;">
                <i class="el-icon-warning" style="font-size: 16px;vertical-align: text-bottom;color: #e6a23c;" aria-hidden="true"></i>
                {{checkoutmsg}}
            </div>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" size="small" @click="checkout = false">我知道了</el-button>
            </span>
        </el-dialog>
      <!--选择用户-->
      <!--<frame-work v-if="flag" :peodatas='peodatas'  v-on:statesbox='statesboxs' :radioUser="1"></frame-work>-->
      <!--查询所有有部门的人员-->
      <findall-deptuser :findFlagShow.sync="findFlag" v-on:findAllUser="findAllUser"
                        :findUserObj="findUserObjM"
                        :findState="findState" :checkState="checkState"></findall-deptuser>

    <findall-deptuserS :isSelectMember="isSelectMember"
                        :roleSelect="roleSelect"
                        :findFlagShow.sync="findFlags"
                        v-on:findAllUser="findAllUsers"
                      :findUserObj="findUserObj"
                      :findState="findState" :checkState="checkState"></findall-deptuserS>
      <!--loading-->
      <div v-if="loadFlag" class="loadDiv" v-loading="true" element-loading-text="数据处理中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"></div>

      <!-- 方正新建项目 -->
      <select-project-fz
        ref="fz"
        :isShow="showSelectProject"
        :projectOptions='projectOptions'
        @sure='handleProjectSelect'
        @cancel='handleSelectCancel'></select-project-fz>

  </div>
</template>

<script>

import newProject from "@/components/dialogcommon/newproject";
import newProjects from "@/components/dialogcommon/newprojects";
import projectType from "@/components/dialogcommon/projecttype";
import framePeos from '@/components/select_box/frameworkpeos'
import frameWork from '@/components/select_box/frameworkpeo'
import findallDeptuser from '@/components/select_box/findAllDeptUserSingleNew'
import findallDeptuserS from '@/components/select_box/findAllDeptUserMultipleNew'
import { setTimeout } from 'timers';
import SelectProjectFz from '@/components/SelectProjectFz'
import securityMessage from '@/components/select_box/securityMessage'

export default {
  name: "projectlist",
  components: {
    newProject,
    projectType,
    framePeos,
    frameWork,
    findallDeptuser,
    findallDeptuserS,
    newProjects,
    SelectProjectFz,
    securityMessage
  },
  data() {
    return {
        client: window.client,
        isSelectMember: false,
        isSelected: false, // 方正 -- 是否是选择的项目
        sourceIdFz: '',  // 方正 -- sourceId
        sourceFlagFz: '',   // 方正 -- sourceFlag
        selectedProjectId: '',  // 方正 -- 选择的项目ID
        showSelectProject: false,  // 方正 -- 选择项目弹窗
        projectOptions: [],  // 方正 -- 待选项目下拉框
        isFZ: false, // 方正证券
        startTime: '',
        endTime: '',
        checkout:false,
        checkoutmsg:"",
        newProjectDialogTimer: null,
        tabValue: '项目列表',
        customN: 0,
        loadFlag:false,
        checkoutmsg:"",
        stopFlag:false,
        checkout:false,
        recoverFlag:false,
        btnShow:true,
        newProtep:"",
        findFlag:false,
        findFlags:false,
        findState:{},
        checkState:{},
        table_title: this.common.commonObjFn(),
        //融资类型
        typeFlag:false,
        typeObj:[],
        state:1,
        tabs:0,
        selectRoleList: [
            {
            id: '0',
            name: "进行中"
            },
            {
            id: '1',
            name: "已完成"
            },
            {
            id: '2',
            name: "已终止"
            }
        ],
        selectStageList:[],
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
        //    新建项目
        dialogVisible: false, //弹框
        relationProjectList: [],//可关联项目列表
        endStageNoCanSele: true,//结束阶段是否可以选择
        startStageList: [],//开始阶段下拉列表
        endStageList: [],//结束阶段下拉列表
        cusObj: {
          cus_name: "",
          cus_job: "",
          cus_type: "",
          cus_time: "",
          cus_legal: "",
          cus_phone: "",
          cus_range: "",
          relation_pro: "",//关联项目
          start_stage_id: "",//开始阶段id
          start_stage_name: "",//开始阶段名称
        },
        end_stage_id: "",//结束阶段id
        end_stage_name: "",//结束阶段名称
        projectPlat: this.report.reportData.projectPlat, // 上市板块
        projectArea: this.report.reportData.projectArea, // 项目区域
        proObj: {
          pro_name: "",
          pro_job: "",
          pro_type: "",
          pro_legal: "",
          pro_start: "",
          pro_stop: "",
          pro_range: "",
        //   pro_code_input: "",//项目编码
          financingId:'',
          departFormId:'',

          ipoMarket: '', // 上市板块
          itemArea: '', // 项目区域编码
          areaName: '', // 区域名称
          reportTime: '', // 申报时间
          issueTime: '', // 发行时间
          stkAndTps:[] // 证券类
        },
        stkAndTps:[{
            stkCode: '', // 证券代码
            stkSpName:'',
            tpCode:'',
            tpName: ''
        }],
        finObj: {
          fin_acco: "",
          fin_lawyer: "",
          fin_asset: "",
          fin_credit: "",
          fin_rela: ""
        },
        teamObj: {
          team_user1: "",
        },
        restaurants: [],
        //    模板弹框
        taskVisible: false,
        tempObj: [],
        standObj: [],
        otherObj: [],
        //    预览弹框
        previewVisible: false,
        prevObj: [],
        //    申请加入项目
        addVisible: false,
        pro_code: "",
        no_search: true,
        null_search: false,
        search_result: false,
        searchCode: {
            name: '',//项目名称
            abbreviation: '',//项目简称
            financingName: '',//项目类型
            picNames: '',//项目负责人
            description: ''//项目描述
        },
        token:"",
        userId:'',
        projectId:"",
        requestCode: {},
        value:'',
        isMultiDeptdata:{},
        codeCont:'',
        keyWord:'',
        financingId:'',
        stage_id:'',
        completeFlagName:'',
        completeFlag:'',
        financingName:'',
        stage_name:'',
        addProjectId:'',
        addProjectName:'',
        tupeNum:1,
        //    部门
        clearstate:'',
        treestate:'',
        tree:'',
        flags:false,
        //    中介机构
        finanFlag:'',
      finanFlags: '',
        finanObj:'',
      finanObjs: '',
        stateFin:[],
      stateFins: [],
        //新增中介机构
        finanVisible: false,
        msgObj:{
          pro_name: '',
          abbreviation: '',
          type: '',
          status: '',
          contact:'',
          principal:"",
          principalId:'',
          telephone: '',
          email: '',
          fax: '',
          postcode: '',
          address: '',
          website: '',
          introduction: '',
          remarks: '',
        },
        selectStateListState1:[
            {
                value: 1056,
                label: '会计师事务所'
            },
            {
                value: 1057,
                label: '律师事务所'
            },
            {
                value: 1058,
                label: '资产评估机构'
            },
            {
                value: 1059,
                label: '信用评级机构'
            },
            {
                value: 1060,
                label: '券商机构'
            }
        ],
        selectAgenOrMem: "",//向子组件传的中介机构数据或者团队成员数据
        agencySelectData: [],//选中的中介机构数据
        teamMemSelectData: [],//选中的团队成员
        teamMemSelecRoleList: [],//选中的团队成员角色
        // 客户状态
        selectStateListState:[
            {
                value: 1062,
                label: '初步洽谈'
            },
            {
                value: 1063,
                label: '达成合作'
            },
            {
                value: 1064,
                label: '协议签署'
            }
        ],
        crmId:'',
        financingParentId:'',
        organArr:[],
        taskProjectId:'',
        taskFinanId:'',
        taskName:'',
        initDocExamRoleinfo:{},
        optTaskId:'',
        roleSelect:'',
        projectMemberRoleList:[],
        roleList:[],
        customOptions:[],
        optState:{},
        /* 归档相关 */
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
        remark_textarea: '', //审核备注信息
        reqApi: '', //动态请求地址
        borrowZnodes: [], //借阅树结构
        borrowSetting:{  //借阅树结构zTree默认配置
          data:{
              simpleData:{
                  enable: true,
                  pIdKey: 'parentId',
                  idKey: 'id',
                  rootPId: 0
              },

              key:{
                  name: 'docName'
              },

          },
          view:{
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
          async:{
              enable: true,
              url: this.getAsyncUrl,
              contentType: "application/json",
              dataType: "json",
              autoParam: [],
              otherParam: this.getAsyncData,
              dataFilter: this.treeFilterFn
          },
          callback:{
              onClick: this.zTreeOnClickFn,
              onAsyncSuccess: this.onAsyncSuccessFn,
          }
        },
        isSearchShow: true, //是否搜索显示结果
        borrowTreeDemo: '',
        borrowSearchFileList: [],
        borrowFileList: [],
        borrowRecordListData: [], //借阅记录列表数据
        borrowRecordFileData: [], //借阅文件列表数据
        currentItemData: "", //当前这条借阅的数据
        approvalNameArray: [], //审批人列表
        approveType: '', //审批类型
        copyNameArray: [], //抄送人列表
        copyNameCode: [], // 抄送人id
        remarkFromArray: [],
        flowChartObj: {}, //流程图数据
        findFlag: false, //选择弹框开关
        extCopyArray: [], //后选择抄送人数组
        findState: {},
        checkState: {},
       findUserObj:[],
      findUserObjM:[],
      deployObj: [],

        isSetRamindchecked: false,  //是否设置提醒勾选
      approveRemind: false, //设置提醒弹框出现
      remindWay: ['站内信'],
      remindWayGrounp: [{
        label: "站内信",
        value: 0
      }],
      formInline: {
        contentMessage: '',

      },
      chack_bule: false,
       shenpiId: "",
      approverData: {},//审批催办的数据
      approverDataCopy:{},  //审批催办的复制数据
      success_code:"",
      messagefailed: ""
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
      this.success_code = this.code.codeNum.SUCCESS;
      this.reqApi = global.baseUrl;
      var listObj = {
          "token": this.token,
          "userId": this.userId,
          "projectId":this.projectId
      };
      var that = this;
      this.$post("/sys/getUserPerm",listObj).then((response => {
          var data =  response.data;
          if(response.code == that.code.codeNum.SUCCESS){
              for(var i=0;i<data.length;i++){
                  if(data[i] == "project_recyled"){
                      that.recoverFlag = true;
                  }else if(data[i] == "project_termination"){
                      that.stopFlag = true;
                  }
              }
          }
      })).catch(error => {
          console.log(error);
      });

  },
  mounted() {

      this.projectList();

      $(".menu_btn").show();
      // this.getViewPortHeight();
      this.getPromptType()
  },
  beforeRouteLeave(to, from, next) {
      to.meta.keepAlive = false;
      next();
  },
  computed:{
    newValue() {
　　　　return this.proObj.pro_type
　　}
  },
  watch:{
      objectData(val){
          if(this.objectData.length < 1){
              this.cover_data = true;
          }else{
              this.cover_data = false;
          }
      },
      newValue(val, oldVal){
          this.cusObj.start_stage_id = '';
          this.end_stage_id = '';
      },
      borrowVisible(val){
          if(!val){
              this.value = ""
              this.tree_input = ''
              this.initDocExamRoleinfo.key = false
          }
      },
      finanVisible(val){
          if(!val){
              this.completeFlag = '';
          }
      },
        'approverData.approverId': {
      handler (newName, oldName) {
        console.log(newName.length)
        if (newName != null) {
          if (newName.length <= 1) {
            this.chack_bule = true;
          } else {
            this.chack_bule = false;
          }
        }

      },
      deep: true
    }
  },
  methods: {
        deletePerFnexam (index) {
            // this.examPersonList.splice(index, 1);
            this.approverData.approvalName.splice(index, 1)
            this.approverData.approverId.splice(index, 1)
        },
      // 获取提醒方式
    getPromptType () {
      this.$post("/sys/getNoticeWayConfig")
        .then(res => {
          if (this.success_code == res.code) {
            res.data.email == 1 && this.remindWayGrounp.push({ label: "邮件", value: 1 });
            res.data.sms == 1 && this.remindWayGrounp.push({ label: "短信", value: 2 });;
            return;
          }
         this.$message.error("通知方式获取失败");
        })
        .catch(err => {
          console.log(err);
        });
    },
      //判断是否勾选设置提醒
    submitApprove () {
        console.log(this.isSetRamindchecked)
      if (this.isSetRamindchecked == true) {

        this.approveRemind = true;
        console.log(this.currentItemData)
        // 站内信模板
        var insideLetter = "【智慧投行】 " + this.currentItemData.userName + "：" + "提醒您尽快审批关于" + this.currentItemData.projectName + "，项目的文件借阅审批,可在'我的审批-待我审批中'进行查看，该审批提交时间为 " + this.$moment().format("YYYY-MM-DD HH:mm:ss")
        console.log(insideLetter)
        this.formInline.contentMessage = insideLetter;
        this.querysShenp()
        console.log(this.approverData.approverId)
        if(this.approverData.approverId != undefined){
             if (this.approverData.approverId.length <= 1) {
            this.chack_bule = true;
            } else {
            this.chack_bule = false;
            }
        }


      } else {
        this.borrowSaveFn();
      }
    },
    //提醒弹框的确定按钮
    approveRemindSave () {
      this.borrowSaveFn();
    //    this.approveRemind = false;
    //   this.isdocExamIsShow = false;
      //this.remindWay = ["站内信"]
    },
     //关闭提醒方法弹框
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
          this.remindWay = ["站内信"]
        })
        .catch(_ => { });

    },

    approveRemindclose () {
      this.approveRemind = false;
      this.remindWay = ["站内信"]
      let copyObj = this.$utils.copyObj(this.approverDataCopy)
      this.approverData = copyObj
    },
    //查询审批人员的id
    querysShenp (itemValue = this.flowChartObj) {
      console.log(this.value)
      let data = {
        "token": this.token,
        "userId": this.userId,
        "data": {
          "projectId": this.currentItemData.projectId,
          "modelId": itemValue.actModelId,
          "deploymentId": itemValue.procDeployId,
          "versionId": itemValue.procVersionNum,
          "approvalType": 9
        }
      }
      data.data.userDept = this.value
      var url = "/info/audit/getApprover";
      var _this = this;
      this.$post(url, data)
        .then((response) => {
          this.approverData = response.data;
          console.log(this.approverData)
          this.approverDataCopy = this.$utils.copyObj(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //设置提醒的方法（相当于审批催办）
    setRemaid () {
        this.remindSetMessage().then(res => {
            var arr = this.remindWay;
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
                arrs.push(ges)
            }
            this.$post("/info/audit/urge_approval", {
                token: this.$store.state.loginObject.userToken,
                userId: this.$store.state.loginObject.userId,
                data: {
                id: this.shenpiId, //提交审批成功后的返回的id
                userIds: this.approverData.approverId, //审批人员的id
                urgeText: this.formInline.contentMessage,
                remindWay: arrs.join(",")
                }
            }).then((response) => {
                this.remindWay = ["站内信"]
                if (response.code != 0) {
                    this.$message.warning(response.msg)
                    return
                }
                // console.log(response.msg);
                // this.$message.success(response.msg);
                this.$message.success(res == null ? response.msg : response.msg + " " + res);
                this.isSetRamindchecked = false;
                this.isSetRamindchecked = false;
            })
            .catch(function (error) {
            console.log(error);
            });
        })
    },
    async remindSetMessage() {
        return await this.$post("/sys/getUserList", {
          data: this.approverData.approverId // 要提醒的人员id
        }).then(response => {
          if(response.code != 0) {
            this.$message.warning(response.msg)
            return null
          }
          this.messagefailed = response.data;
          this.errorMsg = "";
          let checkedRemindNames = this.remindWay;
          console.log(this.remindWay)
          for (var i = 0; i < this.messagefailed.length; i++) {
            let name = this.messagefailed[i].name;
            if (!this.messagefailed[i].email && checkedRemindNames.indexOf("邮件") != -1) {
              this.errorMsg += name + "的邮箱发送失败；";
            }
            if (!this.messagefailed[i].mobile && checkedRemindNames.indexOf("短信") != -1) {
              this.errorMsg += name + "的短信发送失败；";
            }
          }
          if (this.errorMsg) {
            let errorMsg = this.errorMsg + "请在个人信息中完善！其余均发送成功";
            // this.$message.error(errorMsg);
            console.log(errorMsg)
            return errorMsg;
          }
          return null;

        }).catch(err => console.log(err));
      },
    //项目列表滚动条
    getViewPortHeight() {
        // var heig = document.documentElement.clientHeight || document.body.clientHeight;
        // document.getElementById("pro_list_scro").style.height = (heig - 250) + "px";
    },
    //取消弹框遮罩点击
    handleCloseProject(done){
        this.$confirm('确认关闭？')
        .then(_ => {
          this.closeNewProjectDialog()
        })
        .catch(_ => {});
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
                  "completeFlag":this.completeFlag !== '2' ? this.completeFlag : '', // 已终止状态置空
                  "currentStageId":this.stage_id,
                  "endFlag":this.completeFlag === '2' ? '1' : '' // 已终止状态赋值 依据this.completeFlag 的取值 '2'为已终止 此时赋值为 1
              }
          };
          var that = this;
        this.$post("/info/project/getProjectList",listObj).then((response => {
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
    //项目阶段
    projectStage(){
        var listObj = {
            "token": this.token,
            "userId": this.userId,
            "data": {
                "financingId":this.financingId,
            }
        };
        var that = this;
        this.$post("/info/project/getImplementStageListByFinancingId",listObj).then((response => {
            var data =  response.data;
            if(response.code == that.code.codeNum.SUCCESS){
                that.selectStageList = data;
            }else{
                this.$message(response.msg);
            }
        })).catch(error => {
              console.log(error);
        });
    },
    selectStageChange(val){
        this.stage_id = '';
        for(var i=0;i<this.selectStageList.length;i++){
            if(val==this.selectStageList[i].name){
                this.stage_id = this.selectStageList[i].copySourceStageId;
            }
        }
    },
    //项目状态
    selectRoleChange(val){
        this.completeFlag = val;
    },
    //新建项目输入项目编码失去焦点
    // inputProjectCodeBlur(){
    //   // let mark = /[^\\/?*:"<>|]/;
    //   // let letter = /[0-9a-zA-Z]/g;
    //   // let chinese = /[\u0000-\u00FF]/;
    //   // if(mark.test(this.proObj.pro_code_input) || !chinese.test(this.proObj.pro_code_input)){
    //   //     this.$message.error('项目编码格式不正确');
    //   // }
    //   if(this.proObj.pro_code_input != ''){
    //       var reg = /^[0-9a-zA-Z_-]+$/;
    //       if(!reg.test(this.proObj.pro_code_input)){
    //           this.$message.error('项目编码格式不正确');
    //       }
    //   }
    // },
    //获取可关联项目
    getCanRelationProjectList(){
        var listObj = {
            "token": this.token,
            "userId": this.userId,
            "data": {}
        };
        this.$post("/info/project/getCanRelevanceProjectList",listObj).then((response => {
            if(response.code == this.code.codeNum.SUCCESS){
                this.relationProjectList =  response.data;
            }else{
                // this.$message(response.msg);
            }
        })).catch(error => {

        });
    },
    //获取融资类型下的阶段
    getStageList(){
        var listObj = {
            "token": this.token,
            "userId": this.userId,
            "data": {
                "financingId":this.proObj.financingId
            }
        };
        this.$post("/info/project/getProjectStageList",listObj).then((response => {
            if(response.code == this.code.codeNum.SUCCESS){
                this.startStageList =  response.data;
                this.endStageList =  response.data;
            }else{
                this.$message(response.msg);
            }
        })).catch(error => {

        });
    },
    //根据项目ID获取项目信息
    saveProjectmsg(id){
      var obj = {
          "token": this.token,
          "userId": this.userId,
          "data": {
              "id": id,
          }
      };
      var that = this;
      this.$post("/info/project/getProjectInfo",obj).then((response => {
          var data =  response.data;
          if(response.code == that.code.codeNum.SUCCESS){
              that.$store.commit("projectMsg",response.data);
          }else{
              console.log(response.msg);
          }
      })).catch(error => {
            console.log(response.msg);
      });
    },
    //关联项目跳转到项目任务页
    relationProjectGoTask(proId, proName){
      this.$store.commit("projectId",proId);
      this.$utils.saveProjectmsg(proId)
      this.$store.commit("projectMsgname",proName);
      // todo 模块化--项目列表切换项目
      this.$utils.saveProjectId(proId);
      this.$utils.queryProChatNum(proId);
      this.$utils.queryProExamNum(proId);
      this.$router.push({path:'/project_tasks/tasks'});
      // $(".asides .el-menu-item").removeClass("is-active");
      // $(".menu_btn").eq(0).addClass("is-active");
    },
    relationProjectChange(){

    },
    startStageChange(val){
        this.endStageNoCanSele = false;
        this.end_stage_id = '';
        var sort;
        for(var i=0;i<this.startStageList.length;i++){
            if(this.startStageList[i].id == val){
                this.cusObj.start_stage_name = this.startStageList[i].name;
                sort = this.startStageList[i].sort;
                  for(var j=0;j<this.endStageList.length;j++){
                      if(this.endStageList[j].sort < sort){
                          this.endStageList[j].disabled = true;
                      } else {
                          this.endStageList[j].disabled = false;
                      }
                  }
            }
        }
    },
    endStageChange(val){
          for(var i=0;i<this.endStageList.length;i++){
              if(this.endStageList[i].id == val){
                  this.end_stage_name = this.endStageList[i].name;
              }
          }
    },
    //  回收站列表
    projectRecovery(){
        var recover = {
            "token": this.token,
            "userId": this.userId,
            "pageNo": this.currentPage,
            "pageSize": this.pageSize,
            "data": { }
        };
        this.$post("/info/project/getDelProjectList",recover).then((response => {
            var data =  response.data;
            if(response.code == this.code.codeNum.SUCCESS){
                if(data.pageNum > data.pages && data.pageNum != 0) {
                    this.currentPage = data.pages;
                    this.projectRecovery();
                    return
                }
                this.objectData = data.list;
                for(var i=0;i<this.objectData.length;i++){
                    this.objectData[i].cover = true;
                }
                this.dataTotal = data.total;
            }else{
                this.$message(response.msg);
            }
        })).catch(error => {
              console.log(error);
        });
    },
    //  鼠标事件
    overFn(item){
        for(var i=0;i<this.objectData.length;i++){
            if(item.id == this.objectData[i].id){
                this.$forceUpdate();
                this.objectData[i].cover = false;
                this.$set(this.objectData[i],"cover",false);
            }
        }
    },
    leaveFn(item){
        for(var i=0;i<this.objectData.length;i++){
            if(item.id == this.objectData[i].id){
                this.$forceUpdate();
                this.objectData[i].cover = true;
                this.$set(this.objectData[i],"cover",true);
            }
        }
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
        this.$post("/info/project/getFinishProjectList",stopObj).then((response => {
            var data =  response.data;
            if(response.code == that.code.codeNum.SUCCESS){
                that.stopTableData = data.list;
                that.dataTotal = data.total;
                for(var i=0;i<that.stopTableData.length;i++){
                  if(that.stopTableData[i].createBy == that.userId){
                      that.stopTableData[i].isCreatePerson = true;
                  } else {
                      that.stopTableData[i].isCreatePerson = false;
                  }
                }
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
      if(tab.index !== '0'){
        this.btnShow = false
      }else{
        this.btnShow = true
        this.$forceUpdate()
      }
      switch (e.target.innerText) {
        case "项目列表":
          this.projectList();
          break;
        case "项目终止库":
          this.projectStop();
          break;
        case "回收站":
            this.projectRecovery();
          break;
        case "归档库":
          this.pigeonholeQueryFn() //归档
          break;
      }
    },
    //  选择融资类型
    optType(val){
        this.tupeNum = val;
        var typeObj = { "token": this.token, "userId": this.userId, "data": {} } ;
        var that = this;
        var url = '';
        if(this.tupeNum == 1){
            url = "/info/project/getAllFinanceType";
        } else if(this.tupeNum == 2){
            url = "/info/project/getUsableFinanceType";
        }
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
              if(this.tupeNum == 1){
                  this.financingId = data[0].id;
                  this.financingName = data[0].label;
                  this.projectStage();
              }else{
                  this.proObj.financingId = data[0].id;
                  this.proObj.pro_type = data[0].label;
                  this.financingParentId =data[0].fields.data.financeTopId;
                  //
                  this.getStageList();
              }
          }else{
              if(this.tupeNum == 1){
                  this.financingId = "";
                  this.financingName = "";
                  this.selectStageList = [];
              }else{
                  this.proObj.financingId = "";
                  this.proObj.pro_type = "";
                  this.financingParentId = "";
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
            this.endFlag = ""; // 项目状态已终止字段 置空
        }else{
            this.stop_form = {
                pro_code: "",
                pro_name: "",
                pro_text: "",
                pro_date: ""
            };
        }
    },
    //    编辑
    handleEdit(index, row) {
        var editObj = {
            'token': this.token,
            'userId': this.userId,
            "projectId": row.id,
            "data":{
                "projectId":row.id
            }
        }
        // var that=this;
        // var num = 0 ;
        this.$post('/info/project/getProjectPerm', editObj).then((response)=> {
            if(response.code == this.code.codeNum.SUCCESS) {
              let accessList = response.data
              if(!accessList || !accessList.length){ // 没有权限、权限为空
                this.$message.error('没有权限')
                return;
              }
              let hasAccess = false
              let path = ''
              if(this.$utils.m('project_task')) { // 有任务模块
                if(accessList.indexOf('project_task')>-1) { // 有项目任务权限
                  hasAccess = true
                  path = '/project_tasks/tasks'
                }
              } else if(accessList.indexOf('project_information')>-1){ // 有项目信息权限
                console.log('projectmessage')
                hasAccess = true
                path = '/projectmessage'
              }
              if(!hasAccess){
                this.$message.error("没有权限")
                return
              }

              this.$store.commit("projectId",row.id);
              this.$store.commit("projectMsg",row);
              this.$store.commit("projectMsgname",row.name);
              this.$utils.saveProjectId(row.id);
              this.$utils.queryProChatNum(row.id);
              this.$utils.queryProExamNum(row.id);
              this.$router.push({path: path})
                // for(var i=0;i<response.data.length;i++){
                //     if(response.data[i] == "project_task"){
                //         num = 1;
                //     }
                // }
                // if(num == 1){
                //     that.$store.commit("projectId",row.id);
                //     that.$store.commit("projectMsg",row);
                //     that.$store.commit("projectMsgname",row.name);
                //     // todo 模块化--项目列表切换项目
                //
                //     that.$utils.m('project_task') ? that.$router.push({path:'/project_tasks/tasks'}): ;
                // }else{
                //     that.$message("没有该权限");
                // }
            }else{
                this.$message.error(response.msg);
            }
        }).catch(function(error) {
            console.log(error);
        });
    },
    handleEditStop(index, row){
        this.$store.commit("projectId",0);
        this.$store.commit("stopProjectId",row.id);
        this.$store.commit("projectMsg",row);
        this.$store.commit("projectMsgname",row.name);
        this.$store.commit("proChatIsShow",false);
        // todo 模块化--项目列表切换项目
        // saveProjectId(0);
        this.$utils.saveProjectId(0);
        // this.$utils.queryProChatNum(0);
        this.$store.commit("proChatIsShow", false);
        // hideProject();
        this.$router.push({path:'/projectmessage',query:{id:row.id,isFromStop:true}});
        // $(".asides .el-menu-item").removeClass("is-active");
        // $(".menu_btn").hide();
        // $(".menu_btn").eq(2).addClass("is-active").show();
    },
    //  选择部门
    optDepart(){
        var data={
            token:this.token,
            userId:this.userId,
        }
        var that=this;
        this.$post('/sys/getOrganization', data).then((response)=> {
            if(response.code == that.code.codeNum.SUCCESS) {
                that.tree = response.data;
                that.flags = true;
                that.treestate = {state: 1};
                that.clearstate = {state: 3};
            }
        }).catch(function(error) {
            console.log(error);
        });
    },
    //  部门返回值
    stateDepart(data){
        if(data.length > 0){
            this.proObj.departFormId = data[0].id;
            this.proObj.pro_legal = data[0].name;
        }else{
            this.proObj.departFormId = "";
            this.proObj.pro_legal = "";
        }
    },
    //  新增中介机构
    addFinan(){
        this.finanVisible = true;
    },
    optPrinFn(){
        this.findFlag = true;
        this.findState = {state:0};
        this.checkState = {state:1};
        if (!this.msgObj.principal) {
          this.findUserObjM = []
        }
        console.log(this.findUserObjM)
    },
    findAllUser(data){
      if (data.length == 0) {
        this.findFlag = false;
        this.findState = {};
        this.checkState = {};
        this.msgObj.principal = '';
        this.msgObj.principalId = ''
        return
      }
      data.forEach(v => {
        v.uniqueKey = 'user' + v.userId
      })
        this.msgObj.principal = data[0].name;
        this.msgObj.principalId = data[0].userId;
        this.findUserObjM = data
    },
    saveFinanMsg(){
        if(this.msgObj.pro_name == ""){
            this.$message.error('机构名称内容不能为空');
            return;
        }
        if(this.msgObj.abbreviation == ""){
            this.$message.error('机构简称内容不能为空');
            return;
        }
        if(this.msgObj.type == ""){
            this.$message.error('机构类型内容不能为空');
            return;
        }
        if(this.msgObj.status == ""){
            this.$message.error('合作状态内容不能为空');
            return;
        }
        if(this.msgObj.contact == ""){
            this.$message.error('机构联系人内容不能为空');
            return;
        }
        if(this.msgObj.principal == ""){
            this.$message.error('客户负责人内容不能为空');
            return;
        }
        if(this.msgObj.email == "") {
            this.$message.error('邮箱内容不能为空');
            return;
        }else if (!this.$utils.testEmail(this.msgObj.email)) {
                this.$message.error('邮箱格式错误');
                return;
          }
        if(!(/^1[34578]\d{9}$/.test(this.msgObj.telephone))){
            this.$message.error("手机号码有误，请重填");
            return false;
        }else if(this.msgObj.telephone == ""){
            this.$message.error('联系电话内容不能为空');
            return;
        }
        var prostate = this.msgObj.status;
        if( prostate == "初步洽谈"){
            this.msgObj.status = 1062
        }else if(prostate == "达成合作"){
            this.msgObj.status = 1063
        }else if(prostate == "协议签署"){
            this.msgObj.status = 1064
        }

        var protype = this.msgObj.type;
        if( protype == "会计师事务所"){
            this.msgObj.type = 1056
        }else if(protype == "律师事务所"){
            this.msgObj.type = 1057
        }else if(protype == "资产评估机构"){
            this.msgObj.type =1058
        }else if(protype == "信用评级机构"){
            this.msgObj.type = 1059
        }else if(protype == "券商机构"){
            this.msgObj.type = 1060
        }
        var addObj = {
            token:this.token,
            userId:this.userId,
            data:{
                name: this.msgObj.pro_name, //机构名称
                abbreviation: this.msgObj.abbreviation, //机构简介
                type: this.msgObj.type, //机构类型
                status: this.msgObj.status, //合作状态
                contact: this.msgObj.contact, //机构联系人
                principal: this.msgObj.principalId,//客户负责人
                telephone: this.msgObj.telephone,//联系电话
                email: this.msgObj.email,//邮箱
                fax: this.msgObj.fax,//传真
                postcode:this.msgObj.postcode,//邮编
                address: this.msgObj.address,//办公地址
                website: this.msgObj.website,//机构网址
                introduction: this.msgObj.introduction,//机构简介
                remarks: this.msgObj.remarks,//备注
            }
        };
        var _this = this;
        this.$post('/info/crm/Intermediary/add', addObj).then((response)=> {
            if(response.code == _this.code.codeNum.SUCCESS){
                _this.finanVisible = false;
                _this.$message({
                    message: '新增成功',
                    type: 'success'
                });
                _this.msgObj.pro_name = ""
                _this.msgObj.abbreviation=""
                _this.msgObj.type= ""
                _this.msgObj.status= ""
                _this.msgObj.contact= ""
                _this.msgObj.principal =""
                _this.msgObj.telephone=""
                _this.msgObj.email=""
                _this.msgObj.fax=""
                _this.msgObj.postcode=""
                _this.msgObj.address=""
                _this.msgObj.website=""
                _this.msgObj.introduction=""
                _this.msgObj.remarks=""
            }
        }).catch(function(error) {
            console.log(error);
        });
    },
    //  中介机构
    finanOpt(){
        var data={
            token:this.token,
            userId:this.userId,
        }
        var that=this;
        //中介机构的查询接口
        this.$post('/info/crm/proIntermediary', data).then((response)=> {
            if(response.code == that.code.codeNum.SUCCESS) {
                var arr = [];
                for(var i=0;i<response.data.length;i++){
                    var obj = {};
                    var label = "";
                    if(response.data[i].intermediaryType == 1060){   //券商机构     2
                        label = "券商机构";
                    }else if(response.data[i].intermediaryType == 1056){   //会计师         5
                        label = "会计师事务所";
                    }else if(response.data[i].intermediaryType == 1057){    //律师       1
                        label = "律师事务所";
                    }else if(response.data[i].intermediaryType == 1058){     //资产评估      4
                        label = "资产评估机构";
                    }else if(response.data[i].intermediaryType == 1059){            //信用评级      3
                        label = "信用评级机构";
                    }
                    for(var j=0;j<response.data[i].data.length;j++){
                        response.data[i].data[j].label = response.data[i].data[j].name;
                        response.data[i].data[j].labelType = label;
                    }
                    obj.label = label;
                    obj.children = response.data[i].data;
                    arr.push(obj);
                };
                that.finanObj = arr;
                that.selectAgenOrMem = that.agencySelectData;
                that.finanFlag = true;
                that.stateFin = 1;
            }
        }).catch(function(error) {
            console.log(error);
        });
    },
    //  中介机构返回值
    finanProject(data,list,dataObj){
        // if( this.stateFin == 1){
            this.organArr = [];
            this.agencySelectData = data;
            this.finObj = {
                fin_acco: "",
                fin_lawyer: "",
                fin_asset: "",
                fin_credit: "",
                fin_rela: ""
            };
            for(var i=0;i<data.length;i++){
                var obj = {};
                if(data[i].labelType == "券商机构"){
                    this.finObj.fin_rela = '';
                    this.finObj.fin_rela  = data[i].name + "、"+ this.finObj.fin_rela
                }else if(data[i].labelType == "会计师事务所"){
                    this.finObj.fin_acco = '';
                    this.finObj.fin_acco  = data[i].name + "、"+ this.finObj.fin_acco
                }else if(data[i].labelType == "律师事务所"){
                    this.finObj.fin_lawyer = '';
                    this.finObj.fin_lawyer  = data[i].name + "、"+ this.finObj.fin_lawyer
                }else if(data[i].labelType == "资产评估机构"){
                    this.finObj.fin_asset  = '';
                    this.finObj.fin_asset  = data[i].name + "、"+ this.finObj.fin_asset
                }else if(data[i].labelType == "信用评级机构"){
                    this.finObj.fin_credit  = '';
                    this.finObj.fin_credit  = data[i].name + "、"+ this.finObj.fin_credit
                }
                obj.organId = data[i].id;
                this.organArr.push(obj);
            }
            for(var i=0;i<data.length;i++){
                if(data[i].labelType == "券商机构"){
                    this.finObj.fin_rela = '';
                    this.finObj.fin_rela_ids = [];
                    for(var j=0;j<data.length;j++){
                        if(data[j].labelType == "券商机构"){
                            this.finObj.fin_rela  = data[j].name + "、"+ this.finObj.fin_rela;
                            var obj = {};
                            obj.organId = data[j].id;
                            this.finObj.fin_rela_ids.push(obj);
                        }
                    }
                }else if(data[i].labelType == "会计师事务所"){
                    this.finObj.fin_acco = '';
                    this.finObj.fin_acco_ids = [];
                    for(var j=0;j<data.length;j++){
                        if(data[j].labelType == "会计师事务所"){
                            this.finObj.fin_acco  = data[j].name + "、"+ this.finObj.fin_acco
                            var obj = {};
                            obj.organId = data[j].id;
                            this.finObj.fin_acco_ids.push(obj);
                        }
                    }
                }else if(data[i].labelType == "律师事务所"){
                    this.finObj.fin_lawyer = '';
                    this.finObj.fin_lawyer_ids = [];
                    for(var j=0;j<data.length;j++){
                        if(data[j].labelType == "律师事务所"){
                            this.finObj.fin_lawyer  = data[j].name + "、"+ this.finObj.fin_lawyer
                            var obj = {};
                            obj.organId = data[j].id;
                            this.finObj.fin_lawyer_ids.push(obj);
                        }
                    }
                }else if(data[i].labelType == "资产评估机构"){
                    this.finObj.fin_asset  = '';
                    this.finObj.fin_asset_ids = [];
                    for(var j=0;j<data.length;j++){
                        if(data[j].labelType == "资产评估机构"){
                            this.finObj.fin_asset  = data[j].name + "、"+ this.finObj.fin_asset
                            var obj = {};
                            obj.organId = data[j].id;
                            this.finObj.fin_asset_ids.push(obj);
                        }
                    }
                }else if(data[i].labelType == "信用评级机构"){
                    this.finObj.fin_credit  = '';
                    this.finObj.fin_credit_ids = [];
                    for(var j=0;j<data.length;j++){
                        if(data[j].labelType == "信用评级机构"){
                            this.finObj.fin_credit  = data[j].name + "、"+ this.finObj.fin_credit
                            var obj = {};
                            obj.organId = data[j].id;
                            this.finObj.fin_credit_ids.push(obj);
                        }
                    }
                }
                // this.organArr = this.finObj.fin_rela_ids.concat(this.finObj.fin_acco_ids,this.finObj.fin_lawyer_ids,this.finObj.fin_asset_ids,this.finObj.fin_credit_ids);
                // this.organArr.push(obj);
            }
        // }
        // else if( this.stateFin == 2){
        //     this.roleList = [];
        //     this.teamMemSelecRoleList = list;
        //     this.teamMemSelectData = data;
        //     this.projectMemberRoleList = [];
        //       for(var i=0;i<data.length;i++){
        //           var obj = {};
        //           obj.userId = data[i].userId;
        //           obj.roleId = list[i].value;
        //           this.projectMemberRoleList.push(obj);
        //       }
        //     var tempArr = [];
        //     for(var j=0;j<dataObj.length;j++){
        //         if(tempArr.indexOf(dataObj[j]) == -1){
        //             tempArr.push(dataObj[j].name);
        //         }
        //     }
        //     var tempAry = [];
        //     for(var k=0;k<tempArr.length;k++){
        //         var obj = {};
        //         obj.name = tempArr[k];
        //         obj.value = "";
        //         for(var j=0;j<dataObj.length;j++){
        //             if(tempArr[k] == dataObj[j].name){
        //                 obj.value = obj.value + dataObj[j].value + "、";
        //             }
        //         }
        //         tempAry.push(obj);
        //     }
        //     for(var i=0;i<tempAry.length;i++){
        //         var flag = true;
        //         for(var j=0;j<this.roleList.length;j++){
        //             if(tempAry[i].name == this.roleList[j].name){
        //                 flag = false;
        //             };
        //         };
        //         if(flag){
        //             this.roleList.push(tempAry[i]);
        //         };
        //     };
        // }
    },
    finanProjects(data,list,dataObj) {
      console.log(2, dataObj)
      this.roleList = [];
      this.teamMemSelecRoleList = list;
      this.teamMemSelectData = data;
      this.projectMemberRoleList = [];
      for(var i=0;i<data.length;i++){
        var obj = {};
        obj.userId = data[i].userId;
        obj.roleId = list[i].value;
        this.projectMemberRoleList.push(obj);
      }
      var tempArr = [];
      for(var j=0;j<dataObj.length;j++){
        if(tempArr.indexOf(dataObj[j]) == -1){
          tempArr.push(dataObj[j].name);
        }
      }
      var tempAry = [];
      for(var k=0;k<tempArr.length;k++){
        var obj = {};
        obj.name = tempArr[k];
        obj.value = "";
        for(var j=0;j<dataObj.length;j++){
          if(tempArr[k] == dataObj[j].name){
            obj.value = obj.value + dataObj[j].value + "、";
          }
        }
        tempAry.push(obj);
      }
      for(var i=0;i<tempAry.length;i++){
        var flag = true;
        for(var j=0;j<this.roleList.length;j++){
          if(tempAry[i].name == this.roleList[j].name){
            flag = false;
          };
        };
        if(flag){
          this.roleList.push(tempAry[i]);
        };
      };
    },
    //  团队成员关联角色
    addUserRole(){
        var that = this;
        this.$post('/info/project/getProjectRoleExclude').then((response)=> {
            var data = response.data;
            if(response.code == that.code.codeNum.SUCCESS){
                for(var i=0;i<data.length;i++){
                    data[i].children = null;
                    data[i].label = data[i].name;
                    that.roleSelect = data;
                }
            }else{
                that.$message.error(response.msg);
            }
        }).catch(function(error) {
            console.log(error);
        });
    },
    //  团队成员
    teamMemb(){
        this.$post('/info/project/getProjectRoleExclude').then((response)=> {
            var data = response.data;
            if(response.code == this.code.codeNum.SUCCESS){
                for(var i=0;i<data.length;i++){
                    data[i].children = null;
                    data[i].label = data[i].name;
                    this.roleSelect = data;
                }
                console.log(55, this.teamMemSelectData)

                this.findUserObj = this.$utils.cloneDeepArray(this.teamMemSelectData);

                this.findState={state:0}
                this.findFlags = true
            }else{
                this.$message.error(response.msg);
            }
        }).catch(function(error) {
            console.log(error);
        });

        return





        var dataObj = {
            token: this.token,
            userId: this.userId,
            data: {}
        };
        var that = this;
        this.$post('/sys/getUserAll', dataObj).then((response)=> {
            var data = response.data;
            if(response.code == that.code.codeNum.SUCCESS){
                // for(var i=0;i<data.length;i++){
                //     data[i].children = null;
                //     data[i].label = data[i].name;
                // }
                that.updateTree(data[0])
                that.finanObjs = data;
                that.selectAgenOrMem = this.$utils.cloneDeepArray(that.teamMemSelectData);
                console.log(123, data)
                // that.finanFlags = true;
                // that.stateFin =2;
                // this.findUserObj = {}
                this.findFlagShow = true
                that.addUserRole();
            }else{
                that.$message.error(response.msg);
            }
        }).catch(function(error) {
            console.log(error);
        });
    },
        //递归就是在方法里调用这个方法本身
        updateTree (node) {
          node.uniqueKey = (node.mebsize || node.mebsize===0) ? 'dept'+node.id : 'user'+node.id
        var list = node.lists;
        //如果 children 为空，初始化为空数组
        if (!node.children) {
            node.children = [];
        }
        var children = node.children;
        //如果 lists 不为空，将 lists 中的元素添加到 children 中
        if (list && list.length > 0) {
            for (var i = 0; i < list.length; i++) {
                children.push(list[i]);
            }
        }
        //如果 children 有下级节点，递归
        if (children.length > 0) {
            for (var i = 0; i < children.length; i++) {
                //console.log(children[i])
                this.updateTree(children[i]);
            }
        }
    },

    /**
     * 点击新建项目：打开新建项目弹窗，判断是否有草稿
     */
    newProFn () {
        console.log(1001, this.showSelectProject)
      // 打开新建项目弹窗
      this.dialogVisible = true
      this.isSelected = false // 是否是选择项目（方正）
     this.stkAndTps = [{
            stkCode: '', // 证券代码
            stkSpName:'',
            tpCode:'',
            tpName: ''}]
      this.handleNewProData()

      if(this.isFZ) {
        // 获取项目列表
        this.$post("/dataSyn/findFzProjectList",{token: this.token, userId: this.userId}).then((res => {
            if(res.code!==0 || !res.data || !res.data.length){
                this.handleNewProjectNormal()
                return
            }

            this.projectOptions=res.data.map(v=>{
                return {projectCode: v.proj_code, projectName: v.proj_name, projectId: v.proj_id}
            })
            // console.log('projectOptions',this.projectOptions )
            this.showSelectProject = true
            this.$refs['fz'].openDialog()
        }))
        return
      }

      this.handleNewProjectNormal()

     },

    // 方正选择项目--确定
     handleProjectSelect(code){
         this.isSelected = true
         let p = {
             token: this.token,
             userId: this.userId,
             data:{code}
         }
         this.$post("/dataSyn/findFzProjectByPrjcode",p).then(res=>{
             if(res.code!==0) {
                 this.$message.error(res.msg)
                 return
             }

             let data = res.data
             this.sourceFlagFz = data.sourceFlag
             this.sourceIdFz = data.fzId
            //  console.log('sourceFlag', this.sourceFlagFz,this.sourceIdFz )

            //  项目名称
            this.proObj.pro_name = data.name
            this.proObj.pro_code_input = data.code // 项目编码

             // 所属部门id
             this.proObj.pro_legal = data.deptName
             this.proObj.departFormId = data.deptId
             // 所属部门名称

             // 融资类型id
            this.proObj.pro_type = data.financingName
            this.proObj.financingId = data.financingId
            this.financingParentId = data.financingTopId
            this.getStageList()

            // 团队成员信息
            this.projectMemberRoleList = []
            this.roleList = []
            data.projectMemberInfo.forEach(v=>{
                this.projectMemberRoleList.push({userId: v.userId, roleId:v.roleId})
                console.log(this.projectMemberRoleList)
                let cur = this.roleList.find(r=>r.name===v.roleName)
                cur ? cur.memberList = [...cur.memberList, ...v.usNameList] :this.roleList.push({name:v.roleName, memberList:v.usNameList, value:''})
            })
            this.roleList.forEach(v=>{
                v.value=v.memberList.join('、')
            })

            // console.log('roleList',this.roleList)

         })


     },
     // 方正选择项目--取消
     handleSelectCancel(){
        this.showSelectProject = false
     },

    handleNewProjectNormal(){
        // 取出保存的草稿
        let draft = this.$utils.getDraft('project', false)
        // 如果没有草稿，设置定时器，返回
        if(!draft){
        this.setTimer()
        return
        }
        // 有草稿，展示提示弹窗
        this.$confirm('是否载入上次保存的草稿?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
        // 回显草稿数据
        this.proObj = {...this.proObj, ...draft}
        this.stkAndTps = draft.stkAndTps.length ? draft.stkAndTps : [{
            stkCode: '', // 证券代码
            stkSpName:'',
            tpCode:'',
            tpName: ''}]
        this.setTimer()
        }).catch(() => {
        this.setTimer()
        });
    },

     /**
     * 设置定时器：每5秒保存一次表单数据
     */
    setTimer() {
      // 启动定时器，每5000ms保存一次草稿
      this.newProjectDialogTimer = setInterval(()=>{
        this.handleDraftData()
      }, 5000)
    },
    /**
     * 处理草稿数据
     */
    handleDraftData() {
      let stkData = this.stkAndTps.filter(v=> (v.stkCode || v.stkSpName || v.tpCode))
      let data = {
        pro_name: this.proObj.pro_name, // 项目名称
        pro_job: this.proObj.pro_job, // 项目简称
        pro_range: this.proObj.pro_range, // 项目描述
        stkAndTps: stkData // 证券类的存储
        // pro_code_input: this.proObj.pro_code_input // 项目编码
      }
      this.$utils.saveDraft('project', data, false)
    },
    /**
     * 初识化新建项目表单数据
     */
    handleNewProData() {
      this.customN = 0;
      // this.dialogVisible = true;
      this.getCanRelationProjectList();
      this.newProtep = false;
      this.cusObj = {
            cus_name: "",
            cus_job: "",
            cus_type: "",
            cus_time: "",
            cus_legal: "",
            cus_phone: "",
            cus_range: "",
            relation_pro: "",//关联项目
            start_stage_id: "",//开始阶段id
            start_stage_name: "",//开始阶段名称
        };
          this.proObj = {
            pro_name: "",
            pro_job: "",
            pro_type: "",
            pro_legal: "",
            pro_start: "",
            pro_stop: "",
            pro_range: "",
            // pro_code_input: "",//项目编码
            financingId:'',
            departFormId:'',
          };
        this.finObj = {
            fin_acco: "",
            fin_lawyer: "",
            fin_asset: "",
            fin_credit: "",
            fin_rela: ""
        };
        this.teamObj = {
            team_user1: "",
        };
        this.projectMemberRoleList = [];
        this.roleList = [];
        var dataObj = {
            "token": this.token,
            "userId": this.userId
        };
        this.agencySelectData = [];
        this.teamMemSelectData = [];
        this.teamMemSelecRoleList = [];
        var that=this;
        //客户信息回显的查询接口
        this.$post('/info/crm/companyName', dataObj).then((response)=> {
            var data = response.data;
            if(response.code == that.code.codeNum.SUCCESS){
                var loadData = data;
                for(var i=0;i<data.length;i++){
                    loadData[i].label = data[i].name;
                    loadData[i].value = data[i].id;
                }
                that.customOptions = loadData;
            }
        }).catch(function(error) {
            console.log(error);
        });

    },
    /**
     * 关闭新建项目弹窗：关闭弹窗，清除保存草稿的定时器
     */
    closeNewProjectDialog() {
      // 关闭弹窗前实时保存数据，解决输入完立即关闭弹窗，草稿没保存上的问题
      this.handleDraftData()
      this.dialogVisible = false
      this.remindWay = ["站内信"]
      clearInterval(this.newProjectDialogTimer)
    },
    // 加入
    addProjectFn() {
      this.addVisible = true;
      this.pro_code = "";
      this.no_search = true;
      this.null_search = false;
      this.search_result = false;
    },
    // 分页
    onPageChange(currentPage) {
        this.currentPage = currentPage;
        if(this.tabs == 0){
            this.projectList();
        }else if(this.tabs == 1){
            this.projectStop();
        }else if(this.tabs == 3){
          this.pigeonholeQueryFn();
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
          this.pigeonholeQueryFn();
        }else{
            this.projectRecovery();
        }
    },
    //恢复项目
    recoverProFn(item) {
       delete item.cover;
        var typeObj = {
            "token": this.token,
            "userId": this.userId,
            "data": {
                "id":item.id,
                "name":item.name
            }
        } ;
        var that = this;
        this.$post("/info/project/recoveryProject",typeObj).then((response => {
            var data =  response.data;
            if(response.code == that.code.codeNum.SUCCESS){
                that.$message.success("恢复项目成功！");
                that.projectRecovery();
            }else{
                that.$message(response.msg);
            }
        })).catch(error => {
            console.log(error);
        });
    },
    handleSelect(val) {
          this.customN = 1;
          var item = {};
          for(var i=0;i<this.customOptions.length;i++){
              if(val == this.customOptions[i].id){
                  item = this.customOptions[i];
              }
          }
        this.crmId = item.id;
        console.log(item)
        this.cusObj.cus_job = item.industryOne;
        this.cusObj.cus_type = item.typeName;
        // this.cusObj.cus_time = item.updateTime;
        this.cusObj.cus_time = item.foundingTime
        this.cusObj.cus_legal = item.legalPerson;
        this.cusObj.cus_phone = item.telephone;
        this.cusObj.cus_range = item.business;
    },
    // loadAll(arr) {
      // return arr;
    // },
    backBeforeTask(){
        this.previewVisible = false;
        this.taskVisible = true;
    },
    //    选择任务模板
    sureTask() {
        this.loadFlag = true;
        if(this.taskFinanId != "" && this.taskName != ""){
          var typeObj ={
              "token": this.token,
              "userId": this.userId,
              "data": {
                  "id":this.optTaskId,
                  "projectId":this.taskProjectId,
                  "financingId":this.taskFinanId,
                  "name":this.taskName,
              }
          }
          var that = this;
          this.$post("/info/project/importProjectTpl",typeObj).then((response => {
              if(response.code == that.code.codeNum.SUCCESS){
                  that.taskVisible = false;
                  that.$router.push({path:"/project_tasks/tasks"});
                  that.$store.commit("projectId",that.taskProjectId);
                  // $(".asides .el-menu-item").removeClass("is-active");
                  // $(".menu_btn").eq(0).addClass("is-active");
              }else{
                  that.$message(response.msg);
              }
              that.loadFlag = false;
          })).catch(error => {
              console.log(error);
              that.loadFlag = false;
          });
      }else{
          this.$router.push({path:"/project_tasks/tasks"});
          // $(".asides .el-menu-item").removeClass("is-active");
          // $(".menu_btn").eq(0).addClass("is-active");
            this.loadFlag = false;
      }
    },
    //  跳过
    taskVisibleFn(){
        this.taskVisible = false;
        this.$router.push({path:"/project_tasks/tasks"});
        // $(".asides .el-menu-item").removeClass("is-active");
        // $(".menu_btn").eq(0).addClass("is-active");
    },
    //    返回上一步
    backBefore() {
      this.taskVisible = false;
      this.dialogVisible = true;
    },
    //  获取任务模板
    taskModel(){
        var typeObj ={
            "token": this.token,
            "userId": this.userId,
            "data": {
                "financingTopId":this.financingParentId,
                "financingId":this.proObj.financingId,
            }
        }
        var that = this;
        this.$post("/info/taskTpl/getChooseTplList",typeObj).then((response => {
            var data =  response.data;
            if(response.code == that.code.codeNum.SUCCESS){
                that.loadFlag = false;
                that.otherObj = data.otherTplList;
                that.standObj = data.standardTplList;
                for(var i=0;i<that.standObj.length;i++){
                    that.standObj[i].flag = false;
                }
            }else{
                that.$message(response.msg);
            }
        })).catch(error => {
              console.log(error);
        });
    },
    areaChange(item, option){
      if (item === '900000') {
        this.proObj.areaName = ''
        return
      }
      this.proObj.areaName = item ? option.find(ele => ele.id === item).label : ''
    },
    change(e){this.$forceUpdate()},
    //下一步
    saveMsg() {
        
        // 客户模块化验证
        if(this.$utils.m('customer_manage')){
            if(this.customN == 0){
            this.$message.error('请选择客户名称');
            return;
            }
            if(this.cusObj.cus_name == ""){
            this.$message.error('客户名称不能为空');
            return;
            }
        }
        if(this.proObj.pro_name == ""){
            this.$message.error('项目名称不能为空');
            return;
        }
        if(this.proObj.pro_type == ""){
            this.$message.error('业务类型不能为空');
            return;
        }
        if(this.proObj.pro_legal == ""){
            this.$message.error('所属部门不能为空');
            return;
        }
        if(this.cusObj.start_stage_id == ""){
            this.$message.error('请选择开始阶段');
            return;
        }
        if(this.end_stage_id == ''){
            this.$message.error('请选择结束阶段');
            return;
        }
        
        if(new Date(this.proObj.pro_stop) < new Date(this.proObj.pro_start)){
            this.$message.error('开始时间不能大于结束时间');
            return;
        }
        // 项目区域为境外。。。区域名称必填
        if (this.proObj.itemArea === '900000' && !this.proObj.areaName){
            this.$message.error('区域名称不能为空');
            return
        }
        
        // 申报时间小于发行时间----暂不处理。。。后期在说
        // if(new Date(this.proObj.issueTime) < new Date(this.proObj.reportTime)){
        //     this.$message.error('发行时间不能小于申报时间');
        //     return;
        // }
        // 交易场所为其他。。。场所名称为必填
        let stkAndTpsData = this.$refs.securt.stkAndTps
        let stkData = stkAndTpsData.filter(v=> (v.stkCode || v.stkSpName || v.tpCode))
        if (stkData.some(v => (v.tpCode === '2007' && !v.tpName))) {
            this.$message.error('交易场所名称不能为空');
            return
        }
        this.newProtep = true;
        var addObj = {
            "token": this.token,
            "userId": this.userId,
            "data": {
                "crmId": this.crmId,
                "name":this.proObj.pro_name,
                "financingTopId":this.financingParentId,
                "financingId": this.proObj.financingId,
                "financingName": this.proObj.pro_type,
                "abbreviation":this.proObj.pro_job,
                "deptId":this.proObj.departFormId,
                "startTime":this.proObj.pro_start,
                "endTime":this.proObj.pro_stop,
                "description":this.proObj.pro_range,
                "projectOrganList":this.organArr,
                "projectMemberRoleList":this.projectMemberRoleList,
                "linkProjectId": this.cusObj.relation_pro,//关联项目ID
                "startStageId": this.cusObj.start_stage_id,//开始阶段id
                "startStageName":this.cusObj.start_stage_name,//开始阶段名称
                "endStageId": this.end_stage_id,//结束阶段id
                "endStageName": this.end_stage_name, //结束阶段名称
                // "code":this.proObj.pro_code_input//项目编码必传
                // 上市/挂牌板块,
                "ipoMarket": this.proObj.ipoMarket,
                //项目区域编码,
                "itemArea": this.proObj.itemArea,
                //项目区域名称,
                "areaName": this.proObj.areaName,
                //申报时间,
                "reportTime": this.proObj.reportTime ? this.proObj.reportTime + " 00:00:00" : '',
                //发行时间,
                "issueTime": this.proObj.issueTime ? this.proObj.issueTime + " 00:00:00" : '',
                "stkAndTps": stkData
            }
        };
        // console.log(this.$refs.securt.stkAndTps, 12222, this.proObj.itemArea, stkData.some(v => (v.tpCode === '2007' && !v.tpName)), addObj)
        if(this.isFZ && this.isSelected) {
            addObj.data.sourceFlag = this.sourceFlagFz || 0
            addObj.data.fzId = this.sourceIdFz
        }
        var that = this;
        // http://192.168.10.181:19100/info/project/getProjectDetail
        this.$post("/info/project/addProjectInfo",addObj).then((response => {
            var data =  response.data;
            that.newProtep = false;
            if(response.code == that.code.codeNum.SUCCESS){
                // 保存成功，关闭弹窗，关闭定时器
                // that.dialogVisible = false;
              this.closeNewProjectDialog()
              // 保存成功，清空草稿数据
              this.$utils.removeDraft('project', false)
                // that.taskVisible = true;
                // that.taskModel();    //模板
                // that.common.listMenu();
                if(!data.projectNeedApprove){
                    that.$message.success("创建成功！");
                    that.taskProjectId = data.id;
                    that.$store.commit("projectMsg",data);
                    that.$store.commit("projectId",data.id);
                    // TODO 模块化--新建项目切换项目
                    that.$utils.saveProjectId(data.id);
                    that.$utils.queryProChatNum(data.id);
                     that.$utils.queryProExamNum(data.id);
                    that.projectList();
                } else {
                    that.$message.success("新建项目已提交审批！");
                }
                // if(!data.projectNeedApprove){
                //     that.$router.push({path:"/project_tasks/tasks"});
                // }
            } else if(response.code == -3076){//项目编码已存在
                that.$message.error(response.msg);
                that.newProtep = false;
            }else if(response.code == -5022){
                // that.$message.error(response.msg);
                that.checkout = true
                that.checkoutmsg = response.msg
                return
            } else{
                that.$message.error(response.msg);
                that.newProtep = false;
            }
        })).catch(error => {
            that.newProtep = false;
        });
    },
    //选择按钮
    changeOpt() {

    },
    //    选中任务模板
    checkTemp(item, obj) {
          if(item.canChoose){
              if (item.flag) {
                  for(var i=0;i<this.standObj.length;i++){
                      if(item.id == this.standObj[i].id){
                          this.standObj[i].flag = false;
                          this.taskFinanId = "";
                          this.taskName = "";
                          this.$forceUpdate();
                      }
                  }
              } else {
                  for(var i=0;i<this.standObj.length;i++){
                      this.standObj[i].flag = false;
                      if(item.id == this.standObj[i].id){
                          this.standObj[i].flag = true;
                          this.taskFinanId = item.financingId;
                          this.taskName = item.name;
                          this.optTaskId = item.id;
                          this.$forceUpdate();
                      }
                  }
              }
          }
    },
    //    搜索
    enterEvent(e){
        var e = window.event || e;
        switch (e.keyCode || e.which) {
            case 13: //回车
                this.searchCodeFn();
                break;
        }
    },
    searchCodeFn() {
          var reg = /^[0-9A-Za-z] {8}$/;
          if(this.pro_code == ""){
              this.$message("请输入项目编码");
              return;
          }
        //   else if(reg.test(this.pro_code)){
        //       this.$message("项目编码格式不正确");
        //       return;
        //   }
        var typeObj = {
            "token": this.token,
            "userId": this.userId,
            "data": {
                "code":this.pro_code
            }
        };
        var that = this;
        this.$post("/info/project/searchProjectByCode",typeObj).then((response => {
            var data =  response.data;
            if(response.code == that.code.codeNum.SUCCESS) {
                that.no_search = false;
                that.null_search = false;
                that.search_result = true;
                that.addProjectId = data.id;
                that.projectName = data.name;
                that.searchCode.name = data.name;
                that.searchCode.abbreviation = data.abbreviation;
                that.searchCode.financingName = data.financingName;
                that.searchCode.picNames = data.picNames;
                that.searchCode.description = data.description;
            }else if(response.code == that.code.codeNum.PROJECT_NOT_EXIST){
                that.no_search = false;
                that.null_search = true;
                that.search_result = false;
            }else{
                that.$message(response.msg);
            }
        })).catch(error => {

        });
    },
    //    申请加入
    addSuccess(){
      var typeObj = {
          "token": this.token,
          "userId": this.userId,
          "projectId": this.addProjectId,
          "data": {
              "projectId": this.addProjectId,
              "projectName":this.searchCode.name,
          }
      };
      var that = this;
      this.$post("/info/project/joinProject",typeObj).then((response => {
          var data =  response.data;
          if(response.code == that.code.codeNum.SUCCESS){
              that.$message.success("申请项目成功");
          }else{
              that.$message.error(response.msg);
          }
      })).catch(error => {

      });
    },
    addVisit() {
      var that = this;
      var cont = this.$store.state.loginObject.userName + "申请加入投行项目组(项目编码:"+this.pro_code+")";
      this.$confirm(cont)
        .then(_ => {
            this.addSuccess();
          that.addVisible = false;
          done();
        })
        .catch(_ => {});
    },
    //预览
    previewFn(item) {
      this.taskVisible = false;
      this.previewVisible = true;
        var typeObj ={
            "token": this.token,
            "userId": this.userId,
            "data": {
                "financingId":item.financingId,
                "id":item.id
            }
        };
        var that = this;
        this.$post("/info/taskTpl/getTaskTplList",typeObj).then((response => {
            var data =  response.data;
            if(response.code == that.code.codeNum.SUCCESS){
                that.prevObj = data;
                that.taskVisible = false;
                that.previewVisible = true;
            }else{
                that.$message(response.msg);
            }
        })).catch(error => {

        });
    },


    //归档库
    pigeonholeQueryFn(){  //归档信息查询列表函数
        let data = {
            token: this.token,
            userId: this.userId,
            pageNo: this.currentPage,
            pageSize: this.pageSize,
        };
        this.$post("/info/projectSealUp/getProjectSealUpList",data).then(res => {
            if(this.requestCode.SUCCESS !== res.code){
                this.$message(res.msg);
                return;
            }
            this.pigeonholeTableData = res.data.list;
            this.dataTotal = res.data.total;
        }).catch(error => {

        });
    },
    borrowCloseFn() { //借阅关闭
        this.$confirm('确认关闭？')
        .then(_ => {
            this.borrow_radio = "1";
            this.borTime_select = '';
            this.remark_textarea = '';
            this.borrowRemark_textarea = '';
            this.borrowFileList = [];
            this.extCopyArray = [];
            this.borrowVisible = false;
            this.isSetRamindchecked = false
            done();
        })
        .catch(_ => {});
    },

    borrowSaveFn() { //借阅提交
    console.log(this.initDocExamRoleinfo.key)
      if(this.initDocExamRoleinfo.key){
        if(this.value == ""){
          this.$message.error('请选择发起人所属部门')
          return
        }
      }
      let borrowFileListArry = [],userIdArray = [];
      this.extCopyArray.map((item,idx) => {
          userIdArray.push(item.userId)
      })
      this.borrowFileList.map((item,idx) => {
        let obj = {};
        obj.fileId = item.id
        obj.parentId = item.parentId
        borrowFileListArry.push(obj)
      })
      if(this.borTime_select === '') {
        this.$message.warning('请选择您要借阅的时间');
        return;
      }
      if(this.borrowFileList.length === 0) {
        this.$message.warning('请选择您要借阅的文件');
        return;
      }
      let data = {
          projectName: this.currentItemData.projectName,
          sourceName: '发起审批',
          data: {
              modelId: this.flowChartObj.actModelId,
              deploymentId: this.flowChartObj.procDeployId,
              procName:  this.flowChartObj.procName,
              versionId: this.flowChartObj.procVersionNum,
              financingTypeId: this.flowChartObj.finaTypeId,
              categoryId: 9, //借阅
              userDept:this.value,
              projectName: this.currentItemData.projectName,
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
      借阅文件<span style="color:#E57272">自动失效，无法查看</span>是否确定借阅？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
          type: 'warning'
        }).then(() => {
          this.$post("/info/audit/start_process_instance",data).then((res => {
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
            if(res.code == 0){
              this.borrow_radio = "1";
              this.borTime_select = '';
              this.remark_textarea = '';
              this.borrowRemark_textarea = '';
              this.borrowFileList = [];
              this.extCopyArray = [];
              this.borrowVisible = false;
              this.approveRemind = false;
              this.shenpiId = res.data
              this.$message.success(res.msg);
              if (this.isSetRamindchecked) {
                  this.setRemaid();//审批催办的方法、
              }
            }else if(res.code == -5022){
              this.$confirm(res.msg, '提示', {
                type: 'warning',
                confirmButtonText:'我知道了',
                showCancelButton:false
                }).then(() => {}).catch(() => {});
              return
            }else{
              this.$message.error(res.msg);
              return;
            }
          })).catch(error => {

          });
        }).catch(() => {

        });

    },
    examineFn(itemValue) { //查看底稿
        this.$router.push({
            path: '/examineManuscriptManage',
            query: {
                id: itemValue.projectId,
                title: itemValue.projectName
            }
        })
    },
    borrowFn(itemValue) { //借阅弹框开启
        this.currentItemData = itemValue;

        this.timeQueryFn();

        this.flowChartQueryFn(itemValue);

    },
    timeQueryFn() { //借阅时间的查询函数
        let data = {
            token: this.token,
            userId: this.userId,
            projectId: this.projectId
        };
        this.$post("/doc/project/selectDocPaperBorrTime",data).then((res => {

            if(this.requestCode.SUCCESS !== res.code){
                this.borTime_options = []
              if(this.requestCode.RESULT_EMPTY == res.code) {
                return;
              } else {
                this.$message.error(res.msg);
                return;
              }
            }
            this.borTime_options = res.data;
        })).catch(error => {

        });
    },
    flowChartQueryFn(itemValue) { //流程图查询函数
    // console.log(itemValue)
    // return
        let data = {
            token: this.token,
            userId: this.userId,
            data: {
                projId: itemValue.projectId,
                procTypeId: 9, //归档
            }
        };
        this.$post("/info/service/getProcessInfoByProjId",data).then((res => {
            if (res.code == -3520){
            // console.log('存在多个要去发起审批页')
            this.$message({
                type: "warning",
                message: res.msg
            });
            let obj = {
                procTypeName: '底稿借阅审批',
                procTypeId: 9, // 审批类型id
                finaTypeId: itemValue.financingId,  // 业务类型id financingId
                finaTypeName: itemValue.financingName, // 业务类型 financingName
                procName: itemValue.projectName, // 项目名称 name
                projectId: itemValue.projectId, // 项目id pro_id
                progStageId: '',// 项目阶段id currentImplementStageId
                progStageName: '',// 项目阶段 currentImplementStageName
                code:itemValue.code,
                pageFrom: 'archiveLibrary'
            }
            this.$Business.processStore(obj)
            this.$router.push("/sponsor");
            return
        }else if(this.requestCode.SUCCESS != res.code && res.code !== -3520){
                this.$message.error(res.msg);
                return;
            }
            this.flowChartObj = res.data;
            this.examineAndApproveQueryFn(res.data)

        })).catch(error => {
        });
    },
    examineAndApproveQueryFn(itemValue) { //审批环节查询函数
        //itemValue 流程图相关信息
        let data = {
            token: this.token,
            userId: this.userId,
            pageNo: 0,
            pageSize: 100,
            data: {
                modelId: itemValue.actModelId,
                versionId: itemValue.procVersionNum,
                deploymentId: itemValue.procDeployId,
                approvalType: 9, //归档
            }

        };
        this.$post("/info/audit/form_detail",data).then((res => {
            if(this.requestCode.SUCCESS !== res.code){
                this.$message.error(res.msg);
                return;
            }
            this.borrowVisible = true;
            this.approveType = res.data.approveType;
            this.remarkFromArray = res.data.form;
            this.isMultiDeptdata = res.data
            // needAgainQuery为true重新查询审批人、抄送人
            // if(res.data.needAgainQuery) {
            //     this.middlechunk(itemValue)
            // }else {
            //     console.log(123, res.data)
            //     this.copyNameArray = res.data.copyName;
            //     this.approvalNameArray = res.data.approvalName;
            //     this.copyNameCode = res.data.copyCode;
            // }
            if(!this.isMultiDeptdata.isMultiDept){
                // needAgainQuery为true重新查询审批人、抄送人
                if(res.data.needAgainQuery) {
                    this.middlechunk(itemValue)
                }else {
                    this.copyNameArray = res.data.copyName;
                    this.approvalNameArray = res.data.approvalName;
                    this.copyNameCode = res.data.copyCode;
                }
            }
            this.borrowTreeFn();
            this.initDocExamRoleinfo = {...{key: res.data.isMultiDept}}
        })).catch(error => {

        });
    },
    middlechunk(itemValue = this.flowChartObj){
         this.$post('/info/audit/formDetailNew',{
                pageNo: 0,
                pageSize: 100,
                data: {
                    projectId: this.currentItemData.projectId,
                    modelId: itemValue.actModelId,
                    userDept:this.value,
                    versionId: itemValue.procVersionNum,
                    deploymentId: itemValue.procDeployId,
                    approvalType: 9, //归档
                }
                }).then(res => {
                    if(res.code != this.requestCode.SUCCESS) {
                        this.$message.error(res.msg);
                        return;
                    }
                    this.copyNameArray = res.data.copyName;
                    this.approvalNameArray = res.data.approvalName;
                    this.copyNameCode = res.data.copyCode;
                    if(this.isMultiDeptdata.isMultiDept){
                        this.isMultiDeptdata.isMultiDept = false
                    }
                }).catch(err => {
                    console.log(err)
                })
    },
    addCopyPeopleFn() { //添加抄送人弹框函数
        this.deployObj = this.copyNameArray.map((name,i) => ({name, id: this.copyNameCode[i],label: name, originData: true, uniqueKey: 'user' + this.copyNameCode[i]}));
        this.findFlags = true;
        this.findState = { state: 0 };
        this.checkState = { state: 2 };
        let copyData = this.deployObj.concat(this.extCopyArray)
          copyData.forEach(v =>{
            v.label =  v.name
            v.uniqueKey = 'user' + v.id
          })
          this.findUserObj = copyData
        console.log(copyData, 1.2, this.findUserObj)
    },
    handleRoleData(){

        this.projectMemberRoleList = []
        this.roleList = []
        this.teamMemSelectData.forEach(v=>{
            this.projectMemberRoleList.push({userId: v.userId, roleId:v.roleId})
            let cur = this.roleList.find(r=>r.name===v.roleName)
            cur ? cur.memberList.push(v.name) :this.roleList.push({name:v.roleName || '', memberList:[v.name], value:''})
        })
        this.roleList.forEach(v=>{
            v.value=v.memberList.join('、')
        })
        console.log(11111, this.roleList)
    },
    findAllUsers(data) { //添加抄送人回调函数
      console.log(data, 236, this.roleList)
      if(!data || !data.length){
        this.findFlags = false;
        this.findState = {};
        this.checkState = {};
        this.extCopyArray = []
        this.roleList = []
        return
      }
      this.teamMemSelectData = data
      this.handleRoleData()
      //  返回的数据分为默认的和其他的选择的，this.copyNameArray默认
        let defaultArr = []
        let copyData = []
        data.forEach(v=> {
          if (v.originData) {
            defaultArr.push(v)
          } else {
            copyData.push(v)
          }
        })
        this.deployObj = defaultArr
        this.extCopyArray = copyData
        if (this.extCopyArray !== '') {
            this.extCopyArray = Array.from(new Set(this.extCopyArray));
            this.findFlags = false;
            this.findState = {};
            this.checkState = {};
            var chgArr = [];
            for(var i=0;i<this.extCopyArray.length;i++){
              var flag = true;
              for(var j=0;j<chgArr.length;j++){
                if(this.extCopyArray[i].userId == chgArr[j].userId){
                  flag = false;
                };
              };
              if(flag){
                chgArr.push(this.extCopyArray[i]);
              };
            };
            this.extCopyArray = chgArr
        }

          this.findUserObj = this.deployObj.concat(this.extCopyArray)



        // 对数组去重
    //     let hash = {};
    //     this.extCopyArray = this.extCopyArray.reduce((item, next) => {
    //         hash[next.id] ? '' : hash[next.id] = true && item.push(next);
    //         return item
    //     }, []);

    //     this.extCopyArray.map((item,idx) => {
    //         if(this.copyNameArray.indexOf(item.name) != -1) {
    //             this.extCopyArray.splice(idx, 1)
    //         }
    //     })

    //     this.msgObj.principal = data[0].name;
    //     this.msgObj.principalId = data[0].userId;
    //     this.findFlags = false;
    //     this.findState = {};
    //     this.checkState = {};
    //   this.findUserObj = this.extCopyArray
    },
    handleCloseFn(itemValue) { //删除当前的抄送人
        this.extCopyArray.splice(this.extCopyArray.indexOf(itemValue), 1)
    },
    borrowTypeFn() {
      this.borrowTreeFn()
      this.borrowFileList = []
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
        this.$post('/doc/paper/getProjectPaperFileParentId',data)
        .then((res) => {
            if(this.requestCode.SUCCESS !== res.code){
                this.$message.error(res.msg);
                return;
            }

            this.borrowZnodes = res.data.content;
            this.borrowZnodes.forEach((item) => {
                if(item.docType === 1) {
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
            this.borrowTreeDemo.reAsyncChildNodes(nodes[0], "refresh");
        })
        .catch((error) => {
            console.log(error)
        })
    },
    treeSearchFn() {
      if(this.tree_input != '') {
        this.isSearchShow = false;
        var data = {
            pageNo: 0,
            pageSize: 1000,
            data: {
                projectId: this.currentItemData.projectId,
                docPaperContent: this.tree_input,
                docType: 0,
                borringType: this.borrow_radio
            }
        };
        this.$post('/doc/paper/getProjectPaperFileParentId',data)
        .then((res) => {
            if(this.requestCode.SUCCESS == res.code) {
                this.borrowSearchFileList = res.data.content
                // this.totalPages = res.data.totalPages
                // this.flieNameData.map(item => {
                //       item.isEdit = false;
                //       this.iconFilter(item)
                // })
            } else {
                this.$message({
                    message: res.data,
                    type: "error"
                });
            }
        })
        .catch((error) => {
            console.log(error)
        })
      } else {
        this.isSearchShow = true;
        this.borrowTreeFn()
      }

    },
    borrowRecordFn(itemValue) { //借阅记录弹框开启
      this.currentItemData = itemValue;
      this.borrowRecordQueryFn(itemValue)
    },

    borrowRecordSearchFn() {
      let startTime = '',endTime= '';
      startTime = this.startTime ? this.dateToStr(this.startTime) : undefined;
      endTime = this.endTime ? this.dateToStr(this.endTime) : undefined;
      let data = {
          token: this.token,
          userId: this.userId,
          data:{
            projectId: this.currentItemData.projectId,
            userName: this.borPeople_input ? this.borPeople_input : undefined,
            startTime: startTime,
            endTime: endTime
          }
      };
      this.$post("/doc/project/queryDocPaperBorr",data).then((res => {
          if(this.requestCode.SUCCESS !== res.code){
            this.borrowRecordListData = []
            this.$message.error(res.msg);
            return;
          }
          res.data.map((item,idx) => {
            this.$set(item,'fileShow', false);
          })
          this.borrowRecordListData = res.data;
      })).catch(error => {

      });
    },
    borrowRecordResetFn() {
      this.borPeople_input = ''
      this.startTime = ''
      this.endTime = ''
    },
    borrowRecordQueryFn(itemValue) { //借阅记录查询函数
        let data = {
            token: this.token,
            userId: this.userId,
            data:{
              projectId: itemValue.projectId
            }
        };
        this.$post("/doc/project/queryDocPaperBorr",data).then((res => {
            if(this.requestCode.SUCCESS !== res.code){

              this.borrowRecordListData = []
              this.$message.error(res.msg);
              return;
            }
            this.borrowRecordResetFn()
            this.borrowRecordVisible = true;
            res.data.map((item,idx) => {
              this.$set(item,'fileShow', false);
            })
            this.borrowRecordListData = res.data;
        })).catch(error => {

        });
    },
    examineAllFn(itemValue) { //借阅记录弹框里查看全部文件
        //itemValue 每条数据
        console.log(itemValue,'___')
        if(itemValue.fileShow) {
          this.$set(itemValue,'fileShow', false);
          return;
        }

        let data = {
            token: this.token,
            userId: this.userId,
            data:{
              id: itemValue.approveId
            }
        };
        this.$post("/info/audit/getDocPaperBorrowingByApproveId",data).then((res => {
            if(this.requestCode.SUCCESS !== res.code){
                this.$message.error(res.msg);
                return;
            }
            this.borrowRecordListData.map((item,idx) => {
              if(item.id == itemValue.id) {
                this.$set(item,'fileShow', true);
              } else {
                this.$set(item,'fileShow', false);
              }
            })
            res.data.borrowFileList.map((item,idx) => {
               this.iconFilter(item);
            })

            // res.data.map((item,idx) => {
            //   this.$set(item,'fileShow', false);
            // })
            this.borrowRecordFileData = res.data.borrowFileList;

            // this.borTime_options = res.data;
        })).catch(error => {

        });
        // this.$set(itemValue,'scrollbarShowFlag', true)

    },
    examineAllOutFn(itemValue) { //借阅记录弹框里查看全部文件划过离开
      this.$set(itemValue,'fileShow', false);
    },
    getAsyncUrl() { //配置底稿目录树请求地址
        return `${this.reqApi}/doc/paper/getProjectPaperFileParentId`
        // return 'http://192.168.6.230:212/doc/paper/query'
    },
    getAsyncData(treeId, treeNode) { //配置底稿目录树请求数据
        if(treeNode) {
            return  {
                token: this.token,
                userId: this.userId,
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
        } else if(responseData.code == this.requestCode.DOC_FIlE_TYPE_MISMATCH) {
            return ;
        }else {
            responseData.data.content.forEach((item) => {
                if(item.docType === 1) {
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
        if(treeNode.borringFlag && treeNode.docType != 1) {
          this.borrow_radio === '1' ?  this.$message.warning('你已经借过当前文件') : this.$message.warning('底稿已被借用')

          return;
        }
        if(treeNode.docType != 1) {
          let newObj = this.borrowFileList.find(v => treeNode.id == v.id)
          if(newObj == undefined) {
            this.borrowFileList.push(treeNode)
          }
        }

    },
    listItemClickFn(itemValue) { //点击查询后列表每条
      if(itemValue.borringFlag && itemValue.docType != 1) {
        this.$message.warning('你已经借过当前文件');
        return;
      }
      let newObj = this.borrowFileList.find(v => itemValue.id == v.id)
      if(newObj == undefined) {
        this.borrowFileList.push(itemValue)
      }
    },
    borrowFileDelFn(itemValue) {
      this.borrowFileList.splice(this.borrowFileList.indexOf(itemValue),1)
    },
    dateToStr(datetime = null){
      var dateTime = new Date(datetime);
      var year = dateTime.getFullYear();
      var month = dateTime.getMonth()+1;//js从0开始取
      var date = dateTime.getDate();
      var hour = dateTime.getHours();
      var minutes = dateTime.getMinutes();
      var second = dateTime.getSeconds();

      if(month<10){
          month = "0" + month;
      }
      if(date<10){
          date = "0" + date;
      }
      if(hour <10){
          hour = "0" + hour;
      }
      if(minutes <10){
          minutes = "0" + minutes;
      }
      if(second <10){
          second = "0" + second ;
      }

      return year+"-"+month+"-"+date+" "+hour+":"+minutes+":"+second;
    },
    iconFilter(itemValue) { //过滤重命名的icon
      var reg = /(\.)/g;
      var matches = reg.exec(itemValue.fileName).index + 1;
      var renameSuffix = itemValue.fileName.substring(matches, itemValue.fileName.length)
      console.log(renameSuffix,'__')
      var hz_name = renameSuffix.toLowerCase();
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
    },
  }
}


</script>

<style scoped lang="scss" type="text/css">
.projectlist {
    .btn-width-style{
        max-width:150px;
    }
  .back_btn{
      padding-top: 12px;
      padding-bottom: 12px;
  }
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
    }
  }
  .form_box_cus{
      .el-form-item:nth-child(even){
           margin-left: 25px;
      }
  }
    .form_box_pro .issue-mleft{
        margin-left: 5px !important;
    }
  .form_box_pro{
   
    .el-form-item:nth-child(even){
        margin-left: 25px;
    }
    .el-form-item:nth-last-child(1){
        margin-left: 0px;
    }
    .el-icon-warning-outline{
        color: #c0c4cc;
        margin-left: 5px;
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
          height: 52px;
          line-height: 52px;
          span:nth-child(1) {
            float: left;
            width: 60%;
            height: 52px;
            line-height: 52px;
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
            height: 52px;
            line-height: 52px;
            padding-right: 10px;
            box-sizing: border-box;
            text-align: right;
          }
        }
        .recover_li {
            border-bottom:1px solid#ebeef5;
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
                top:-3px;
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
                    .task_li_title_icon{
                        display: inline-block;
                        width: 16px;
                        height: 16px;
                        background: url('../../../assets/common_icon/more_icon.png') no-repeat;
                        background-size: 16px 16px;
                        margin-right: 8px;
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
/deep/ {
     .borrow_dialog .el-scrollbar__wrap{
        margin-right: 0px !important;
    }
} 
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
      .borrow_middle_chunk_details{
          margin-top: 14px;
          padding-left: 6px;
      }
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
                  overflow:auto;
                  .borrowList{
                    .borrowList_item{
                      padding-left: 15px;
                      margin-top: 5px;
                      display: flex;
                      align-items: center;
                      cursor: pointer;
                      .borrowList_item_fileIcon{
                        width: 13px;
                        height: 14px;
                        display: inline-block;
                        background: url('../../../assets/manuscript_icon/file_icon.png') no-repeat;
                        background-size: 13px 14px;
                      }
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
                  .initiate_title {
                      font-family:Microsoft YaHei;
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
                  .borrow_middle_chunk_content_middle_title:nth-child(1){
                    margin-top: 0;

                  }
                  .borrow_middle_chunk_content_middle_operation{
                      width: 100px;
                      margin-top: 10px;
                      display: flex;
                      align-items: center;
                      cursor: pointer;
                      .borrow_middle_chunk_content_middle_operation_icon{
                          width: 24px;
                          height: 24px;
                          background: url('../../../assets/common_icon/addtask_icon.png') no-repeat;
                          background-size: 24px 24px;
                      }
                      .borrow_middle_chunk_content_middle_operation_title{
                          color: #1462A3;
                          margin-left: 6px;
                      }
                  }
                  .borrow_middle_chunk_content_middle_list{
                      max-height: 216px;
                      overflow-y: auto;
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
    right: 20px;
    top: 0px;
    z-index: 10;
    // width:200px;
    height: 80px;
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
<style lang="scss">
    .projectlist .el-dialog__header{
        text-align: center;
        border-bottom:1px solid #e6e6e6;
    }
    .projectlist .task_dialog .el-dialog{
        background: #f5f6f9;
    }
    .projectlist .tab_edit_btn{
        width:28px;
        height:28px;
        background: url("../../../assets/image/myshenpi/xiangqing_0.png") no-repeat 100% 100%/ 100% 100%;
    }
    .projectlist .tab_edit_btn:hover{
        background: url("../../../assets/image/myshenpi/xiangqing_1.png") no-repeat 100% 100%/ 100% 100%;
    }
    .projectlist .recover_pro_btn{
        width:28px;
        height:28px;
        background: url("../../../assets/common_icon/recoverPro.png") no-repeat 100% 100%/ 100% 100%;
    }
    .projectlist .recover_pro_btn:hover{
        background: url("../../../assets/common_icon/recoverProHover.png") no-repeat 100% 100%/ 100% 100%;
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
    .projectlist .list_form .search-btn.el-button{
        margin-top: 0;
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
    .team_box_label{
        width:120px;
        text-align: right;
        float: left;
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 0;
        box-sizing: border-box;
        display: flex;
    }
    .team_box_span{
        width:120px;
        display: inline-block;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .projectlist .team_box_div .el-input{
        width:217px;
    }
    .projectlist .team_box_div .el-input input{
        width:217px;
    }
    .projectlist .el-table__body-wrapper td{
        padding: 0;
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
        height: 99%;
        padding: 0;
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
    .borrowZtree li span.button.diy01_ico_open{
        line-height:0; margin:0; width:18px; height:18px; display: inline-block; vertical-align:middle;
        border:0 none; cursor: pointer;outline:none;
        background-color:transparent; background-repeat:no-repeat; background-attachment: scroll;
        background: url('../../../assets/manuscript_icon/examopen_icon.png') no-repeat;
        background-size: 18px 14px;
    }
    .borrowZtree li span.button.diy01_ico_close{
        line-height:0; margin:0; width:18px; height:18px; display: inline-block; vertical-align:middle;
        border:0 none; cursor: pointer;outline:none;
        background-color:transparent; background-repeat:no-repeat; background-attachment: scroll;
        background: url('../../../assets/manuscript_icon/examclose_icon.png') no-repeat;
        background-size: 18px 14px;
    }
    .borrowZtree li span.button.diy03_ico_docu{
        line-height:0; margin:0; width:18px; height:14px; display: inline-block; vertical-align:middle;
        border:0 none; cursor: pointer;outline:none;
        background-color:transparent; background-repeat:no-repeat; background-attachment: scroll;
        background: url('../../../assets/manuscript_icon/file_icon.png') no-repeat;
        background-size: 13px 14px;
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
    .el-icon-examineDigao {
      width:28px;
      height:28px;
      background: url('../../../assets/common_icon/examineDigao_icon.png') no-repeat;
      background-size: 28px 28px;
      font-family: element-icons!important;
      speak: none;
      font-style: normal;
      font-weight: 400;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
      vertical-align: baseline;
      display: inline-block;
      -webkit-font-smoothing: antialiased;
    }
    .el-icon-examineDigao:hover {
      width:28px;
      height:28px;
      background: url('../../../assets/common_icon/examineDigao_hover_icon.png') no-repeat;
      background-size: 28px 28px;
      font-family: element-icons!important;
      speak: none;
      font-style: normal;
      font-weight: 400;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
      vertical-align: baseline;
      display: inline-block;
      -webkit-font-smoothing: antialiased;
    }
    .el-icon-borrow {
      width:28px;
      height:28px;
      background: url('../../../assets/common_icon/borrow_icon.png') no-repeat;
      background-size: 28px 28px;
      font-family: element-icons!important;
      speak: none;
      font-style: normal;
      font-weight: 400;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
      vertical-align: baseline;
      display: inline-block;
      -webkit-font-smoothing: antialiased;
    }
    .el-icon-borrow:hover {
      width:28px;
      height:28px;
      background: url('../../../assets/common_icon/borrow_hover_icon.png') no-repeat;
      background-size: 28px 28px;
      font-family: element-icons!important;
      speak: none;
      font-style: normal;
      font-weight: 400;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
      vertical-align: baseline;
      display: inline-block;
      -webkit-font-smoothing: antialiased;
    }
    .el-icon-borrowRecord {
      width:28px;
      height:28px;
      background: url('../../../assets/common_icon/borrowRecord_icon.png') no-repeat;
      background-size: 28px 28px;
      font-family: element-icons!important;
      speak: none;
      font-style: normal;
      font-weight: 400;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
      vertical-align: baseline;
      display: inline-block;
      -webkit-font-smoothing: antialiased;
    }
    .el-icon-borrowRecord:hover {
      width:28px;
      height:28px;
      background: url('../../../assets/common_icon/borrowRecord_hover_icon.png') no-repeat;
      background-size: 28px 28px;
      font-family: element-icons!important;
      speak: none;
      font-style: normal;
      font-weight: 400;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
      vertical-align: baseline;
      display: inline-block;
      -webkit-font-smoothing: antialiased;
    }
    .projectlist{
        .recover_pro_table.el-table, .place_file_pro_table.el-table{
            td{
                height: 53px;
                padding: 0;
            }
        }
        .recover_pro_table.el-table{
            thead tr th:first-child{
                text-align: left;
                div{
                    padding-left: 40px;
                }
            }
            tbody tr td:first-child{
                text-align: left;
                p{
                    padding-left: 30px;
                }
            }
        }
        .el-tabs--border-card>.el-tabs__content{
            padding-left: 0;
            padding-right: 0;
        }
    }
.bitians{
    color: red;
    margin-left: 5px;
    margin-right: 3px
}
</style>
