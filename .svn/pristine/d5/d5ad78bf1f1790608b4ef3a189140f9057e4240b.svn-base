<template>
  <div class="content approval">
    <div class="content_top" v-show="Toexamine">
      <!-- this.Toexamine -->
      <p class="content_p">
        <el-breadcrumb separator="/" class="page-breadcrumb">
          <el-breadcrumb-item :to="{path:'/maindeskindex'}">主工作台</el-breadcrumb-item>
          <el-breadcrumb-item>我的审批</el-breadcrumb-item>
        </el-breadcrumb>
      </p>

      <div class="content_box flex j-spaceBetween a-center">
        <div class="content_title">我的审批</div>
        <div class="content_search  flex j-spaceBetween">
          <div class="content_inputBox choose-input" v-on:keyup.enter="search">
            <el-input v-model="text" placeholder="请输入项目名称"></el-input>
            <div><el-button type="primary" @click="search">搜索</el-button></div>
          </div>
          <!-- <div @click="sponsor" style="cursor: pointer;" v-if="$utils.checkSystemPermission('sub_approve')">
            <el-button style="float: right;margin-right: 0px;" type="primary">发起审批</el-button>
          </div> -->
          <el-button style="height:40px" @click="sponsor" v-if="$utils.checkSystemPermission('sub_approve')" type="primary">发起审批</el-button>
          <!-- <div  @click="sponsor" style="cursor: pointer" v-if="$utils.checkSystemPermission('sub_approve')" >发起审批</div> -->
        </div>
      </div>

    </div>

    <div v-show="Toexamine">
<!--      待我审批", "我已审批", "我发起的", "抄送我的-->
      <el-tabs class='my-approve' type="border-card" v-model="firstTitle" @tab-click="content_xzs">
        <el-tab-pane label="待我审批" name="0">
          <el-table :data="tableDataForApprove" v-loading="loading" min-height="530" style="width: 100%" :header-cell-style="{background:'#FAFAFA',color:'#000'}">
            <el-table-column prop="projectName" align="center" label="项目名称" min-width="100">
              <template slot-scope="scope">
                <el-button  @click="handleEdit(scope.$index, scope.row)"
                            type="text"
                            class="ellipsis1"
                            style="padding:1px 0px;width:100%"
                            :title="scope.row.projectName">{{ scope.row.projectName }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="categoryName" align="center" label="审批类型" min-width="100">
              <template slot-scope="scope">
                <p :title="scope.row.categoryName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.categoryName}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="categoryName" align="center"  label="业务类型" width="100">
              <template slot-scope="scope">
                <p :title="scope.row.categoryName == '普通审批'?'':scope.row.finanNameParent" class="ellipsis1">
                  {{scope.row.categoryName =="普通审批"?'无':scope.row.finanNameParent?scope.row.finanNameParent.substring(scope.row.finanNameParent.lastIndexOf('>') + 1):'--'}}
                </p>
              </template>
            </el-table-column>
             <!-- <el-table-column prop="createDate" align="center" label="申请内容" width="230">
              <template slot-scope="scope">
                <p :title="scope.row.remarks | msg" class="remarkss">{{scope.row.projectName}}</p>
              </template>
            </el-table-column> -->
             <el-table-column prop="remarks" align="center" label="申请内容" width="230">
              <template slot-scope="scope">
                <p :title="scope.row.remarks | msg" class="remarksss">{{scope.row.remarks | msg}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="categoryName" align="center" label="当前阶段" min-width="100">
              <template slot-scope="scope">
                <p :title="scope.row.projectStageName" class="ellipsis1">
                  {{scope.row.projectStageName?scope.row.projectStageName:'--'}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="username" align="center" label="提交人员" min-width="100">
              <template slot-scope="scope">
                <p :title="scope.row.username" class="ellipsis1">{{scope.row.username}}</p>
              </template>
            </el-table-column>
             <el-table-column prop="username" align="center" label="当前审批人" min-width="150">
              <template slot-scope="scope">
                <p :title="scope.row.approverName" class="ellipsis1">{{scope.row.approverName}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="createDate" align="center" label="提交时间" min-width="100">
              <template slot-scope="scope">
                <p :title="scope.row.createDate" class="ellipsis1">{{scope.row.createDate}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="approvalStatus" align="center" label="状态" min-width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.approvalStatus == '审批中'" style="color:#FFC53D" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                <span v-else-if="scope.row.approvalStatus == '已通过'" style="color:#52C41A" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                <span v-else-if="scope.row.approvalStatus == '未通过'" style="color:#999999" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                <span v-else-if="scope.row.approvalStatus == '已撤销'" style="color:#999999" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                <span v-else-if="scope.row.approvalStatus == '暂缓表决'" style="color:#FA541C" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                <span v-else-if="scope.row.approvalStatus == '有条件通过'" style="color:#40A9FF" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
              </template>
            </el-table-column>
            <el-table-column width="300" align="center" label="操作">
              <template slot-scope="scope">
                <div class="oper_box">
                  <span v-show="approval2" @click="recalls(scope.row)" v-if="scope.row.status == 1 && scope.row.isCancel == 1" class="icon-operate-btn iconfont daohangchexiao" title="撤销"></span>

                  <span v-if="approval1" @click="handleEdit(scope.$index, scope.row)" class="icon-operate-btn iconfont shenpi" title="审批"></span>

                  <span @click="approved(scope.row)" v-if="scope.row.status == 0 || scope.row.status == 2 || scope.row.status == 4 ||
                      scope.row.status == 5 || scope.row.status == 1" class="icon-operate-btn iconfont jilu" title="审批记录"></span>
                      <!--  v-if="scope.row.relatedApprove" -->
                  <span
                        @click="guanlianshenpi(scope.row)" v-if="scope.row.relatedApprove" class="icon-operate-btn iconfont guanlianshenpi" title="关联审批">
                  </span>
                  <span
                        @click="quxiaoguanlianshenpi(scope.row)" v-if="scope.row.relatedApprove" class="icon-operate-btn iconfont quxiaoguanlian" title="取消关联审批">
                  </span>
                  <span v-if="recallss1s&&scope.row.status == 1" @click="reminder(scope.row)"
                  class="icon-operate-btn iconfont zulincuijiaotixing" title="催办"></span>

                  <span v-if="$utils.m('project_meeting') && scope.row.relatedMeeting == true"
                  @click="glhy(scope.row)" class="icon-operate-btn iconfont guanlianhuiyi" title="关联会议"></span>

                  <span v-if="$utils.m('project_meeting') && scope.row.relatedMeeting == true"
                  @click="QMeet(scope.row)" class="icon-operate-btn iconfont quxiaoguanlian" title="取消关联"></span>

                  <span v-if="$utils.m('project_vote') && scope.row.relatedVote == true"
                   @click="relatedvoting(scope.row)" class="icon-operate-btn iconfont guanliantoupiao" title="关联投票"></span>

                  <span v-if="$utils.m('project_vote') &&scope.row.relatedVote == true"
                  @click="relatedQp(scope.row)" class="icon-operate-btn iconfont quxiaoguanlian" title="取消关联"></span>
                   <span @click="Filepages(scope.row)" v-if="scope.row.categoryName == '文件审批' || scope.row.categoryName == '文件修订审批' || scope.row.categoryName == '目录审批' || scope.row.categoryName == '底稿目录修订审批'" class="iconfont icon-operate-btn" :title="(scope.row.categoryName == '文件审批' || scope.row.categoryName == '文件修订审批')?'去审文件':'去审目录'">&#xe712;</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="pages">
            <el-pagination background layout="total, sizes, prev, pager, next, jumper"
                           :total="dataTotalsForApprove"
                           :pageSize="pageSizeForApprove"
                           :page-sizes="pageSizes"
                           :current-page.sync="currentPageForApprove"
                           @current-change="onPageChange(arguments, 'forApprove')"
                           @size-change="handleSizeChange(arguments,'forApprove')"></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="我已审批" name="1">
          <el-tabs v-model="activeName3" @tab-click="handleClick" :class="firststate ? 'has-sub-tab':''">
            <el-tab-pane :label="'全部（'+ dataTotal +'）'" name="first">
              <el-table :data="tableDataApprovedTotal" v-loading="loading" min-height="530" style="width: 100%" :header-cell-style="{background:'#FAFAFA',color:'#000'}">
                <el-table-column prop="projectName" align="center" label="项目名称" min-width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.projectName" class="ellipsis1">{{scope.row.projectName}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="categoryName" align="center" label="审批类型" min-width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.categoryName" class="ellipsis1">{{scope.row.categoryName}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="categoryName" align="center"  label="业务类型" width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.categoryName == '普通审批'?'':scope.row.finanNameParent" class="ellipsis1">
                      {{scope.row.categoryName =="普通审批"?'无':scope.row.finanNameParent?scope.row.finanNameParent.substring(scope.row.finanNameParent.lastIndexOf('>') + 1):'--'}}
                    </p>
                  </template>
                </el-table-column>
                 <el-table-column prop="remarks" align="center" label="申请内容" width="230">
                  <template slot-scope="scope">
                    <p :title="scope.row.remarks | msg" class="remarksss">{{scope.row.remarks | msg}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="categoryName" align="center" label="当前阶段" min-width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.projectStageName" class="ellipsis1">
                      {{scope.row.projectStageName?scope.row.projectStageName:'--'}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="username" align="center" label="提交人员" min-width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.username" class="ellipsis1">{{scope.row.username}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="username" align="center" label="当前审批人" min-width="150">
                  <template slot-scope="scope">
                    <p :title="scope.row.approverName == null ?'':scope.row.approverName" class="ellipsis1">{{(scope.row.approverName == null ||scope.row.approverName == "") ?'--':scope.row.approverName}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="createDate" align="center" label="提交时间" min-width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.createDate" class="ellipsis1">{{scope.row.createDate}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="approvalStatus" align="center" label="状态" min-width="100">
                  <template slot-scope="scope">
                    <span v-if="scope.row.approvalStatus == '审批中'" style="color:#FFC53D" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                    <span v-else-if="scope.row.approvalStatus == '已通过'" style="color:#52C41A" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                    <span v-else-if="scope.row.approvalStatus == '未通过'" style="color:#999999" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                    <span v-else-if="scope.row.approvalStatus == '已撤销'" style="color:#999999" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                    <span v-else-if="scope.row.approvalStatus == '暂缓表决'" style="color:#FA541C" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                    <span v-else-if="scope.row.approvalStatus == '有条件通过'" style="color:#40A9FF" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                  </template>
                </el-table-column>
                <el-table-column width="300" align="center" label="操作">
                  <template slot-scope="scope">
                    <div class="oper_box">
                      <span v-show="approval2" @click="recalls(scope.row)" v-if="scope.row.status == 1 && scope.row.isCancel == 1" class="icon-operate-btn iconfont daohangchexiao" title="撤销"></span>

                      <span v-if="approval1" @click="handleEdit(scope.$index, scope.row)" class="oper_shenhe icon-operate-btn iconfont shenpi" title="审批"></span>

                      <span @click="approved(scope.row)" v-if="scope.row.status == 0 || scope.row.status == 2 || scope.row.status == 4 ||
                      scope.row.status == 5 || scope.row.status == 1" class="oper_shenhejilu icon-operate-btn iconfont jilu" title="审批记录"></span>

                      <span v-if="recallss1s&&scope.row.status == 1"
                      @click="reminder(scope.row)" class="icon-operate-btn iconfont zulincuijiaotixing" title="催办"></span>

                      <span v-if="$utils.m('project_meeting') && scope.row.relatedMeeting == true"
                      @click="glhy(scope.row)" class="icon-operate-btn iconfont guanlianhuiyi" title="关联会议"></span>

                      <span v-if="$utils.m('project_meeting') && scope.row.relatedMeeting == true"
                      @click="QMeet(scope.row)" class="icon-operate-btn iconfont quxiaoguanlian" title="取消关联"></span>

                      <span v-if="$utils.m('project_vote') && scope.row.relatedVote == true"
                      @click="relatedvoting(scope.row)" class="icon-operate-btn iconfont guanliantoupiao" title="关联投票"></span>

                      <span v-if="$utils.m('project_vote') &&scope.row.relatedVote == true"
                      @click="relatedQp(scope.row)" class="icon-operate-btn iconfont quxiaoguanlian" title="取消关联"></span>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <div class="pages">
                <el-pagination background layout="total, sizes, prev, pager, next, jumper"
                               :total="dataTotalsApprovedTotal"
                               :pageSize="pageSizeApprovedTotal"
                               :page-sizes="pageSizes"
                               :current-page.sync="currentPageApprovedTotal"
                               @current-change="onPageChange(arguments, 'approvedTotal')"
                               @size-change="handleSizeChange(arguments,'approvedTotal')"></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="'审批完成（'+finish+'）'" name="second">
              <el-table :data="tableDataApprovedFinish" v-loading="loading" min-height="530" style="width: 100%" :header-cell-style="{background:'#FAFAFA',color:'#000'}">
                <el-table-column prop="projectName" align="center" label="项目名称" min-width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.projectName" class="ellipsis1">{{scope.row.projectName}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="categoryName" align="center" label="审批类型" min-width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.categoryName" class="ellipsis1">{{scope.row.categoryName}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="categoryName" align="center"  label="业务类型" width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.categoryName == '普通审批'?'':scope.row.finanNameParent" class="ellipsis1">
                      {{scope.row.categoryName =="普通审批"?'无':scope.row.finanNameParent?scope.row.finanNameParent.substring(scope.row.finanNameParent.lastIndexOf('>') + 1):'--'}}
                    </p>
                  </template>
                </el-table-column>
                <el-table-column prop="remarks" align="center" label="申请内容" width="230">
                  <template slot-scope="scope">
                    <p :title="scope.row.remarks | msg" class="remarksss">{{scope.row.remarks | msg}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="categoryName" align="center" label="当前阶段" min-width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.projectStageName" class="ellipsis1">
                      {{scope.row.projectStageName?scope.row.projectStageName:'--'}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="username" align="center" label="提交人员" min-width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.username" class="ellipsis1">{{scope.row.username}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="createDate" align="center" label="提交时间" min-width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.createDate" class="ellipsis1">{{scope.row.createDate}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="approvalStatus" align="center" label="状态" min-width="100">
                  <template slot-scope="scope">
                    <span v-if="scope.row.approvalStatus == '审批中'" style="color:#FFC53D" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                    <span v-else-if="scope.row.approvalStatus == '已通过'" style="color:#52C41A" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                    <span v-else-if="scope.row.approvalStatus == '未通过'" style="color:#999999" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                    <span v-else-if="scope.row.approvalStatus == '已撤销'" style="color:#999999" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                    <span v-else-if="scope.row.approvalStatus == '暂缓表决'" style="color:#FA541C" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                    <span v-else-if="scope.row.approvalStatus == '有条件通过'" style="color:#40A9FF" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                  </template>
                </el-table-column>
                <el-table-column width="300" align="center" label="操作">
                  <template slot-scope="scope">
                    <div class="oper_box">
                      <span v-show="approval2" @click="recalls(scope.row)" v-if="scope.row.status == 1 && scope.row.isCancel == 1" class="icon-operate-btn iconfont daohangchexiao" title="撤销"></span>

                      <span v-if="approval1" @click="handleEdit(scope.$index, scope.row)" class="oper_shenhe icon-operate-btn iconfont shenpi" title="审批"></span>

                      <span @click="approved(scope.row)" v-if="scope.row.status == 0 || scope.row.status == 2 || scope.row.status == 4 ||
                      scope.row.status == 5 || scope.row.status == 1" class="oper_shenhejilu icon-operate-btn iconfont jilu" title="审批记录"></span>

                      <span v-if="recallss1s&&scope.row.status == 1" @click="reminder(scope.row)" class="icon-operate-btn iconfont zulincuijiaotixing" title="催办"></span>

                      <span v-if="$utils.m('project_meeting') && scope.row.relatedMeeting == true"
                      @click="glhy(scope.row)" class="icon-operate-btn iconfont guanlianhuiyi" title="关联会议"></span>

                      <span v-if="$utils.m('project_meeting') && scope.row.relatedMeeting == true"
                      @click="QMeet(scope.row)" class="icon-operate-btn iconfont quxiaoguanlian" title="取消关联"></span>

                      <span v-if="$utils.m('project_vote') && scope.row.relatedVote == true"
                      @click="relatedvoting(scope.row)" class="icon-operate-btn iconfont guanliantoupiao" title="关联投票"></span>

                      <span v-if="$utils.m('project_vote') &&scope.row.relatedVote == true"
                      @click="relatedQp(scope.row)" class="icon-operate-btn iconfont quxiaoguanlian" title="取消关联"></span>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <div class="pages">
                <el-pagination background layout="total, sizes, prev, pager, next, jumper"
                               :total="dataTotalsApprovedFinish"
                               :pageSize="pageSizeApprovedFinish"
                               :page-sizes="pageSizes"
                               :current-page.sync="currentPageApprovedFinish"
                               @current-change="onPageChange(arguments, 'approvedFinish')"
                               @size-change="handleSizeChange(arguments,'approvedFinish')"></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="'审批中（'+checking+'）'" name="third">
              <el-table :data="tableDataApprovedChecking" v-loading="loading" min-height="530" style="width: 100%" :header-cell-style="{background:'#FAFAFA',color:'#000'}">
                <el-table-column prop="projectName" align="center" label="项目名称" min-width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.projectName" class="ellipsis1">{{scope.row.projectName}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="categoryName" align="center" label="审批类型" min-width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.categoryName" class="ellipsis1">{{scope.row.categoryName}}</p>
                  </template>
                </el-table-column>
               <el-table-column prop="categoryName" align="center"  label="业务类型" width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.categoryName == '普通审批'?'':scope.row.finanNameParent" class="ellipsis1">
                      {{scope.row.categoryName =="普通审批"?'无':scope.row.finanNameParent?scope.row.finanNameParent.substring(scope.row.finanNameParent.lastIndexOf('>') + 1):'--'}}
                    </p>
                  </template>
                </el-table-column>
                <el-table-column prop="remarks" align="center" label="申请内容" width="230">
                  <template slot-scope="scope">
                    <p :title="scope.row.remarks | msg" class="remarksss">{{scope.row.remarks | msg}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="categoryName" align="center" label="当前阶段" min-width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.projectStageName" class="ellipsis1">
                      {{scope.row.projectStageName?scope.row.projectStageName:'--'}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="username" align="center" label="提交人员" min-width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.username" class="ellipsis1">{{scope.row.username}}</p>
                  </template>
                </el-table-column>
                 <el-table-column prop="username" align="center" label="当前审批人" min-width="150">
                  <template slot-scope="scope">
                    <p :title="scope.row.approverName == null ?'':scope.row.approverName" class="ellipsis1">{{(scope.row.approverName == null ||scope.row.approverName == "") ?'--':scope.row.approverName}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="createDate" align="center" label="提交时间" min-width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.createDate" class="ellipsis1">{{scope.row.createDate}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="approvalStatus" align="center" label="状态" min-width="100">
                  <template slot-scope="scope">
                    <span v-if="scope.row.approvalStatus == '审批中'" style="color:#FFC53D" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                    <span v-else-if="scope.row.approvalStatus == '已通过'" style="color:#52C41A" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                    <span v-else-if="scope.row.approvalStatus == '未通过'" style="color:#999999" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                    <span v-else-if="scope.row.approvalStatus == '已撤销'" style="color:#999999" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                    <span v-else-if="scope.row.approvalStatus == '暂缓表决'" style="color:#FA541C" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                    <span v-else-if="scope.row.approvalStatus == '有条件通过'" style="color:#40A9FF" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                  </template>
                </el-table-column>
                <el-table-column width="300" align="center" label="操作">
                  <template slot-scope="scope">
                    <div class="oper_box">
                      <span v-show="approval2" @click="recalls(scope.row)" v-if="scope.row.status == 1 && scope.row.isCancel == 1" class="icon-operate-btn iconfont daohangchexiao" title="撤销"></span>

                      <span v-if="approval1" @click="handleEdit(scope.$index, scope.row)" class="oper_shenhe icon-operate-btn iconfont shenpi" title="审批"></span>

                      <span @click="approved(scope.row)" v-if="scope.row.status == 0 || scope.row.status == 2 || scope.row.status == 4 ||
                      scope.row.status == 5 || scope.row.status == 1" class="oper_shenhejilu icon-operate-btn iconfont jilu" title="审批记录"></span>

                      <span v-if="recallss1s&&scope.row.status == 1" @click="reminder(scope.row)" class="icon-operate-btn iconfont zulincuijiaotixing" title="催办"></span>

                      <span v-if="$utils.m('project_meeting') && scope.row.relatedMeeting == true"
                      @click="glhy(scope.row)" class="icon-operate-btn iconfont guanlianhuiyi" title="关联会议"></span>

                      <span v-if="$utils.m('project_meeting') && scope.row.relatedMeeting == true"
                      @click="QMeet(scope.row)" class="icon-operate-btn iconfont quxiaoguanlian" title="取消关联"></span>

                      <span v-if="$utils.m('project_vote') && scope.row.relatedVote == true"
                      @click="relatedvoting(scope.row)" class="icon-operate-btn iconfont guanliantoupiao" title="关联投票"></span>

                      <span v-if="$utils.m('project_vote') &&scope.row.relatedVote == true"
                      @click="relatedQp(scope.row)" class="icon-operate-btn iconfont quxiaoguanlian" title="取消关联"></span>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <div class="pages">
                <el-pagination background layout="total, sizes, prev, pager, next, jumper"
                               :total="dataTotalsApprovedChecking"
                               :pageSize="pageSizeApprovedChecking"
                               :page-sizes="pageSizes"
                               :current-page.sync="currentPageApprovedChecking"
                               @current-change="onPageChange(arguments, 'approvedChecking')"
                               @size-change="handleSizeChange(arguments,'approvedChecking')"></el-pagination>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="我发起的" class="wfqdinnfo" name="2">
          <el-tabs v-model="activeNameSponsor" @tab-click="handleClick">
            <el-tab-pane :label="'全部（'+ dataTotalSponsor +'）'" name="first">
              <el-table :data="tableDataMySponsorTotal" v-loading="loading" min-height="530" style="width: 100%" :header-cell-style="{background:'#FAFAFA',color:'#000'}">
                <el-table-column prop="projectName" align="center" label="项目名称" min-width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.projectName" class="ellipsis1">{{scope.row.projectName}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="categoryName" align="center" label="审批类型" min-width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.categoryName" class="ellipsis1">{{scope.row.categoryName}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="categoryName" align="center"  label="业务类型" width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.categoryName == '普通审批'?'':scope.row.finanNameParent" class="ellipsis1">
                      {{scope.row.categoryName =="普通审批"?'无':scope.row.finanNameParent?scope.row.finanNameParent.substring(scope.row.finanNameParent.lastIndexOf('>') + 1):'--'}}
                    </p>
                  </template>
                </el-table-column>
                 <el-table-column prop="remarks" align="center" label="申请内容" width="230">
              <template slot-scope="scope">
                <p :title="scope.row.remarks | msg" class="remarksss">{{scope.row.remarks | msg}}</p>
              </template>
            </el-table-column>

                <el-table-column prop="categoryName" align="center" label="当前阶段" min-width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.projectStageName" class="ellipsis1">
                      {{scope.row.projectStageName?scope.row.projectStageName:'--'}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="username" align="center" label="提交人员" min-width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.username" class="ellipsis1">{{scope.row.username}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="username" align="center" label="当前审批人" min-width="150">
                  <template slot-scope="scope">
                    <p :title="scope.row.approverName == null ?'':scope.row.approverName" class="ellipsis1">{{(scope.row.approverName == null ||scope.row.approverName == "") ?'--':scope.row.approverName}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="createDate" align="center" label="提交时间" min-width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.createDate" class="ellipsis1">{{scope.row.createDate}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="approvalStatus" align="center" label="状态" min-width="100">
                  <template slot-scope="scope">
                    <span v-if="scope.row.approvalStatus == '审批中'" style="color:#FFC53D" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                    <span v-else-if="scope.row.approvalStatus == '已通过'" style="color:#52C41A" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                    <span v-else-if="scope.row.approvalStatus == '未通过'" style="color:#999999" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                    <span v-else-if="scope.row.approvalStatus == '已撤销'" style="color:#999999" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                    <span v-else-if="scope.row.approvalStatus == '暂缓表决'" style="color:#FA541C" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                    <span v-else-if="scope.row.approvalStatus == '有条件通过'" style="color:#40A9FF" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                  </template>
                </el-table-column>
                <el-table-column width="300" align="center" label="操作">
                  <template slot-scope="scope">
                    <div class="oper_box">
                      <span v-show="approval2" @click="recalls(scope.row)" v-if="scope.row.status == 1 && scope.row.isCancel == 1" class="icon-operate-btn iconfont daohangchexiao" title="撤销"></span>

                      <span v-if="approval1" @click="handleEdit(scope.$index, scope.row)" class="oper_shenhe icon-operate-btn iconfont shenpi" title="审批"></span>

                      <span @click="approved(scope.row)" v-if="scope.row.status == 0 || scope.row.status == 2 || scope.row.status == 4 ||
                      scope.row.status == 5 || scope.row.status == 1" class="oper_shenhejilu icon-operate-btn iconfont jilu" title="审批记录"></span>

                      <span v-if="recallss1s&&scope.row.status == 1" @click="reminder(scope.row)" class="icon-operate-btn iconfont zulincuijiaotixing" title="催办"></span>

                      <span v-if="$utils.m('project_meeting') && scope.row.relatedMeeting == true"
                      @click="glhy(scope.row)" class="icon-operate-btn iconfont guanlianhuiyi" title="关联会议"></span>

                      <span v-if="$utils.m('project_meeting') && scope.row.relatedMeeting == true"
                      @click="QMeet(scope.row)" class="icon-operate-btn iconfont quxiaoguanlian" title="取消关联"></span>

                      <span v-if="$utils.m('project_vote') && scope.row.relatedVote == true"
                      @click="relatedvoting(scope.row)" class="icon-operate-btn iconfont guanliantoupiao" title="关联投票"></span>

                      <span v-if="$utils.m('project_vote') &&scope.row.relatedVote == true"
                      @click="relatedQp(scope.row)" class="icon-operate-btn iconfont quxiaoguanlian" title="取消关联"></span>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <div class="pages">
                <el-pagination background layout="total, sizes, prev, pager, next, jumper"
                               :total="dataTotalsMySponsorTotal"
                               :pageSize="pageSizeMySponsorTotal"
                               :page-sizes="pageSizes"
                               :current-page.sync="currentPageMySponsorTotal"
                               @current-change="onPageChange(arguments, 'sponsorTotal')"
                               @size-change="handleSizeChange(arguments,'sponsorTotal')"></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="'审批完成（'+finishSponsor+'）'" name="second">
              <el-table :data="tableDataMySponsorFinish" v-loading="loading" min-height="530" style="width: 100%" :header-cell-style="{background:'#FAFAFA',color:'#000'}">
                <el-table-column prop="projectName" align="center" label="项目名称" min-width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.projectName" class="ellipsis1">{{scope.row.projectName}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="categoryName" align="center" label="审批类型" min-width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.categoryName" class="ellipsis1">{{scope.row.categoryName}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="categoryName" align="center"  label="业务类型" width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.categoryName == '普通审批'?'':scope.row.finanNameParent" class="ellipsis1">
                      {{scope.row.categoryName =="普通审批"?'无':scope.row.finanNameParent?scope.row.finanNameParent.substring(scope.row.finanNameParent.lastIndexOf('>') + 1):'--'}}
                    </p>
                  </template>
                </el-table-column>
                 <el-table-column prop="remarks" align="center" label="申请内容" width="230">
              <template slot-scope="scope">
                <p :title="scope.row.remarks | msg" class="remarksss">{{scope.row.remarks | msg}}</p>
              </template>
            </el-table-column>
                <el-table-column prop="categoryName" align="center" label="当前阶段" min-width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.projectStageName" class="ellipsis1">
                      {{scope.row.projectStageName?scope.row.projectStageName:'--'}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="username" align="center" label="提交人员" min-width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.username" class="ellipsis1">{{scope.row.username}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="createDate" align="center" label="提交时间" min-width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.createDate" class="ellipsis1">{{scope.row.createDate}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="approvalStatus" align="center" label="状态" min-width="100">
                  <template slot-scope="scope">
                    <span v-if="scope.row.approvalStatus == '审批中'" style="color:#FFC53D" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                    <span v-else-if="scope.row.approvalStatus == '已通过'" style="color:#52C41A" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                    <span v-else-if="scope.row.approvalStatus == '未通过'" style="color:#999999" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                    <span v-else-if="scope.row.approvalStatus == '已撤销'" style="color:#999999" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                    <span v-else-if="scope.row.approvalStatus == '暂缓表决'" style="color:#FA541C" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                    <span v-else-if="scope.row.approvalStatus == '有条件通过'" style="color:#40A9FF" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                  </template>
                </el-table-column>
                <el-table-column width="300" align="center" label="操作">
                  <template slot-scope="scope">
                    <div class="oper_box">
                      <span v-show="approval2" @click="recalls(scope.row)" v-if="scope.row.status == 1 && scope.row.isCancel == 1" class="icon-operate-btn iconfont daohangchexiao" title="撤销"></span>

                      <span v-if="approval1" @click="handleEdit(scope.$index, scope.row)" class="oper_shenhe icon-operate-btn iconfont shenpi" title="审批"></span>

                      <span @click="approved(scope.row)" v-if="scope.row.status == 0 || scope.row.status == 2 || scope.row.status == 4 ||
                      scope.row.status == 5 || scope.row.status == 1" class="oper_shenhejilu icon-operate-btn iconfont jilu" title="审批记录"></span>

                      <span v-if="recallss1s&&scope.row.status == 1" @click="reminder(scope.row)" class="icon-operate-btn iconfont zulincuijiaotixing" title="催办"></span>

                      <span v-if="$utils.m('project_meeting') && scope.row.relatedMeeting == true"
                      @click="glhy(scope.row)" class="icon-operate-btn iconfont guanlianhuiyi" title="关联会议"></span>

                      <span v-if="$utils.m('project_meeting') && scope.row.relatedMeeting == true"
                      @click="QMeet(scope.row)" class="icon-operate-btn iconfont quxiaoguanlian" title="取消关联"></span>

                      <span v-if="$utils.m('project_vote') && scope.row.relatedVote == true"
                      @click="relatedvoting(scope.row)" class="icon-operate-btn iconfont guanliantoupiao" title="关联投票"></span>

                      <span v-if="$utils.m('project_vote') &&scope.row.relatedVote == true"
                      @click="relatedQp(scope.row)" class="icon-operate-btn iconfont quxiaoguanlian" title="取消关联"></span>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <div class="pages">
                <el-pagination background layout="total, sizes, prev, pager, next, jumper"
                               :total="dataTotalsMySponsorFinish"
                               :pageSize="pageSizeMySponsorFinish"
                               :page-sizes="pageSizes"
                               :current-page.sync="currentPageMySponsorFinish"
                               @current-change="onPageChange(arguments, 'sponsorFinish')"
                               @size-change="handleSizeChange(arguments,'sponsorFinish')"></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="'审批中（'+checkingSponsor+'）'" name="third">
              <el-table :data="tableDataMySponsorChecking" v-loading="loading" min-height="530" style="width: 100%" :header-cell-style="{background:'#FAFAFA',color:'#000'}">
                <el-table-column prop="projectName" align="center" label="项目名称" min-width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.projectName" class="ellipsis1">{{scope.row.projectName}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="categoryName" align="center" label="审批类型" min-width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.categoryName" class="ellipsis1">{{scope.row.categoryName}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="categoryName" align="center"  label="业务类型" width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.categoryName == '普通审批'?'':scope.row.finanNameParent" class="ellipsis1">
                      {{scope.row.categoryName =="普通审批"?'无':scope.row.finanNameParent?scope.row.finanNameParent.substring(scope.row.finanNameParent.lastIndexOf('>') + 1):'--'}}
                    </p>
                  </template>
                </el-table-column>
                <el-table-column prop="remarks" align="center" label="申请内容" width="230">
              <template slot-scope="scope">
                <p :title="scope.row.remarks | msg" class="remarksss">{{scope.row.remarks | msg}}</p>
              </template>
            </el-table-column>
                <el-table-column prop="categoryName" align="center" label="当前阶段" min-width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.projectStageName" class="ellipsis1">
                      {{scope.row.projectStageName?scope.row.projectStageName:'--'}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="username" align="center" label="提交人员" min-width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.username" class="ellipsis1">{{scope.row.username}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="username" align="center" label="当前审批人" min-width="150">
                  <template slot-scope="scope">
                    <p :title="scope.row.approverName == null ?'':scope.row.approverName" class="ellipsis1">{{(scope.row.approverName == null ||scope.row.approverName == "") ?'--':scope.row.approverName}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="createDate" align="center" label="提交时间" min-width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.createDate" class="ellipsis1">{{scope.row.createDate}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="approvalStatus" align="center" label="状态" min-width="100">
                  <template slot-scope="scope">
                    <span v-if="scope.row.approvalStatus == '审批中'" style="color:#FFC53D" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                    <span v-else-if="scope.row.approvalStatus == '已通过'" style="color:#52C41A" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                    <span v-else-if="scope.row.approvalStatus == '未通过'" style="color:#999999" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                    <span v-else-if="scope.row.approvalStatus == '已撤销'" style="color:#999999" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                    <span v-else-if="scope.row.approvalStatus == '暂缓表决'" style="color:#FA541C" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                    <span v-else-if="scope.row.approvalStatus == '有条件通过'" style="color:#40A9FF" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                  </template>
                </el-table-column>
                <el-table-column width="300" align="center" label="操作">
                  <template slot-scope="scope">
                    <div class="oper_box">
                      <span v-show="approval2" @click="recalls(scope.row)" v-if="scope.row.status == 1 && scope.row.isCancel == 1" class="icon-operate-btn iconfont daohangchexiao" title="撤销"></span>

                      <span v-if="approval1" @click="handleEdit(scope.$index, scope.row)" class="oper_shenhe icon-operate-btn iconfont shenpi" title="审批"></span>

                      <span @click="approved(scope.row)" v-if="scope.row.status == 0 || scope.row.status == 2 || scope.row.status == 4 ||
                      scope.row.status == 5 || scope.row.status == 1" class="oper_shenhejilu icon-operate-btn iconfont jilu" title="审批记录"></span>

                      <span v-if="recallss1s&&scope.row.status == 1" @click="reminder(scope.row)" class="icon-operate-btn iconfont zulincuijiaotixing" title="催办"></span>

                      <span v-if="$utils.m('project_meeting') && scope.row.relatedMeeting == true"
                      @click="glhy(scope.row)" class="icon-operate-btn iconfont guanlianhuiyi" title="关联会议"></span>

                      <span v-if="$utils.m('project_meeting') && scope.row.relatedMeeting == true"
                      @click="QMeet(scope.row)" class="icon-operate-btn iconfont quxiaoguanlian" title="取消关联"></span>

                      <span v-if="$utils.m('project_vote') && scope.row.relatedVote == true"
                      @click="relatedvoting(scope.row)" class="icon-operate-btn iconfont guanliantoupiao" title="关联投票"></span>

                      <span v-if="$utils.m('project_vote') &&scope.row.relatedVote == true"
                      @click="relatedQp(scope.row)" class="icon-operate-btn iconfont quxiaoguanlian" title="取消关联"></span>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <div class="pages">
                <el-pagination background layout="total, sizes, prev, pager, next, jumper"
                               :total="dataTotalsMySponsorChecking"
                               :pageSize="pageSizeMySponsorChecking"
                               :page-sizes="pageSizes"
                               :current-page.sync="currentPageMySponsorChecking"
                               @current-change="onPageChange(arguments, 'sponsorChecking')"
                               @size-change="handleSizeChange(arguments,'sponsorChecking')"></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="'已撤销（'+cancelSponsor+'）'" name="fourth">
              <el-table :data="tableDataMySponsorCancel" v-loading="loading" min-height="530" style="width: 100%" :header-cell-style="{background:'#FAFAFA',color:'#000'}">
                <el-table-column prop="projectName" align="center" label="项目名称" min-width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.projectName" class="ellipsis1">{{scope.row.projectName}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="categoryName" align="center" label="审批类型" min-width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.categoryName" class="ellipsis1">{{scope.row.categoryName}}</p>
                  </template>
                </el-table-column>
                 <el-table-column prop="categoryName" align="center"  label="业务类型" width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.categoryName == '普通审批'?'':scope.row.finanNameParent" class="ellipsis1">
                      {{scope.row.categoryName =="普通审批"?'无':scope.row.finanNameParent?scope.row.finanNameParent.substring(scope.row.finanNameParent.lastIndexOf('>') + 1):'--'}}
                    </p>
                  </template>
                </el-table-column>
                 <el-table-column prop="remarks" align="center" label="申请内容" width="230">
              <template slot-scope="scope">
                <p :title="scope.row.remarks | msg" class="remarksss">{{scope.row.remarks | msg}}</p>
              </template>
            </el-table-column>
                <el-table-column prop="categoryName" align="center" label="当前阶段" min-width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.projectStageName" class="ellipsis1">
                      {{scope.row.projectStageName?scope.row.projectStageName:'--'}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="username" align="center" label="提交人员" min-width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.username" class="ellipsis1">{{scope.row.username}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="createDate" align="center" label="提交时间" min-width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.createDate" class="ellipsis1">{{scope.row.createDate}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="approvalStatus" align="center" label="状态" min-width="100">
                  <template slot-scope="scope">
                    <span v-if="scope.row.approvalStatus == '审批中'" style="color:#FFC53D" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                    <span v-else-if="scope.row.approvalStatus == '已通过'" style="color:#52C41A" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                    <span v-else-if="scope.row.approvalStatus == '未通过'" style="color:#999999" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                    <span v-else-if="scope.row.approvalStatus == '已撤销'" style="color:#999999" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                    <span v-else-if="scope.row.approvalStatus == '暂缓表决'" style="color:#FA541C" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                    <span v-else-if="scope.row.approvalStatus == '有条件通过'" style="color:#40A9FF" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                  </template>
                </el-table-column>
                <el-table-column width="300" align="center" label="操作">
                  <template slot-scope="scope">
                    <div class="oper_box">
                      <span v-show="approval2" @click="recalls(scope.row)" v-if="scope.row.status == 1 && scope.row.isCancel == 1" class="icon-operate-btn iconfont daohangchexiao" title="撤销"></span>

                      <span v-if="approval1" @click="handleEdit(scope.$index, scope.row)" class="oper_shenhe icon-operate-btn iconfont shenpi" title="审批"></span>

                      <span @click="approved(scope.row)" v-if="scope.row.status == 0 || scope.row.status == 2 || scope.row.status == 4 ||
                      scope.row.status == 5 || scope.row.status == 1" class="oper_shenhejilu icon-operate-btn iconfont jilu" title="审批记录"></span>

                      <span v-if="recallss1s&&scope.row.status == 1" @click="reminder(scope.row)" class="icon-operate-btn iconfont zulincuijiaotixing" title="催办"></span>

                      <span v-if="$utils.m('project_meeting') && scope.row.relatedMeeting == true"
                      @click="glhy(scope.row)" class="icon-operate-btn iconfont guanlianhuiyi" title="关联会议"></span>

                      <span v-if="$utils.m('project_meeting') && scope.row.relatedMeeting == true"
                      @click="QMeet(scope.row)" class="icon-operate-btn iconfont quxiaoguanlian" title="取消关联"></span>

                      <span v-if="$utils.m('project_vote') && scope.row.relatedVote == true"
                      @click="relatedvoting(scope.row)" class="icon-operate-btn iconfont guanliantoupiao" title="关联投票"></span>

                      <span v-if="$utils.m('project_vote') &&scope.row.relatedVote == true"
                      @click="relatedQp(scope.row)" class="icon-operate-btn iconfont quxiaoguanlian" title="取消关联"></span>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <div class="pages">
                <el-pagination background layout="total, sizes, prev, pager, next, jumper"
                               :total="dataTotalsMySponsorCancel"
                               :pageSize="pageSizeMySponsorCancel"
                               :page-sizes="pageSizes"
                               :current-page.sync="currentPageMySponsorCancel"
                               @current-change="onPageChange(arguments, 'sponsorCancel')"
                               @size-change="handleSizeChange(arguments,'sponsorCancel')"></el-pagination>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="抄送我的" name="3">
          <el-table :data="tableDataCopied" v-loading="loading" min-height="530" style="width: 100%" :header-cell-style="{background:'#FAFAFA',color:'#000'}">
            <el-table-column prop="projectName" align="center" label="项目名称" min-width="100">
              <template slot-scope="scope">
                <p :title="scope.row.projectName" class="ellipsis1">{{scope.row.projectName}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="categoryName" align="center" label="审批类型" min-width="100">
              <template slot-scope="scope">
                <p :title="scope.row.categoryName" class="ellipsis1">{{scope.row.categoryName}}</p>
              </template>
            </el-table-column>
             <el-table-column prop="categoryName" align="center"  label="业务类型" width="100">
                  <template slot-scope="scope">
                    <p :title="scope.row.categoryName == '普通审批'?'':scope.row.finanNameParent" class="ellipsis1">
                      {{scope.row.categoryName =="普通审批"?'无':scope.row.finanNameParent?scope.row.finanNameParent.substring(scope.row.finanNameParent.lastIndexOf('>') + 1):'--'}}
                    </p>
                  </template>
                </el-table-column>
                 <el-table-column prop="remarks" align="center" label="申请内容" width="230">
              <template slot-scope="scope">
                <p :title="scope.row.remarks | msg" class="remarksss">{{scope.row.remarks | msg}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="categoryName" align="center" label="当前阶段" min-width="100">
              <template slot-scope="scope">
                <p :title="scope.row.projectStageName" class="ellipsis1">
                  {{scope.row.projectStageName?scope.row.projectStageName:'--'}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="username" align="center" label="提交人员" min-width="100">
              <template slot-scope="scope">
                <p :title="scope.row.username" class="ellipsis1">{{scope.row.username}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="createDate" align="center" label="提交时间" min-width="100">
              <template slot-scope="scope">
                <p :title="scope.row.createDate" class="ellipsis1">{{scope.row.createDate}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="approvalStatus" align="center" label="状态" min-width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.approvalStatus == '审批中'" style="color:#FFC53D" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                <span v-else-if="scope.row.approvalStatus == '已通过'" style="color:#52C41A" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                <span v-else-if="scope.row.approvalStatus == '未通过'" style="color:#999999" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                <span v-else-if="scope.row.approvalStatus == '已撤销'" style="color:#999999" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                <span v-else-if="scope.row.approvalStatus == '暂缓表决'" style="color:#FA541C" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
                <span v-else-if="scope.row.approvalStatus == '有条件通过'" style="color:#40A9FF" class="recalls_state" :title="scope.row.approvalStatus">{{scope.row.approvalStatus}}</span>
              </template>
            </el-table-column>
            <el-table-column width="300" align="center" label="操作">
              <template slot-scope="scope">
                <div class="oper_box">
                  <span v-show="approval2" @click="recalls(scope.row)" v-if="scope.row.status == 1 && scope.row.isCancel == 1" class="icon-operate-btn iconfont daohangchexiao" title="撤销"></span>

                  <span v-if="approval1" @click="handleEdit(scope.$index, scope.row)" class="oper_shenhe icon-operate-btn iconfont shenpi" title="审批"></span>

                  <span @click="approved(scope.row)" v-if="scope.row.status == 0 || scope.row.status == 2 || scope.row.status == 4 ||
                      scope.row.status == 5 || scope.row.status == 1" class="oper_shenhejilu icon-operate-btn iconfont jilu" title="审批记录"></span>

                  <span v-if="recallss1s&&scope.row.status == 1" @click="reminder(scope.row)" class="icon-operate-btn iconfont zulincuijiaotixing" title="催办"></span>

                  <span v-if="$utils.m('project_meeting') && scope.row.relatedMeeting == true"
                  @click="glhy(scope.row)" class="icon-operate-btn iconfont guanlianhuiyi" title="关联会议"></span>

                  <span v-if="$utils.m('project_meeting') && scope.row.relatedMeeting == true"
                  @click="QMeet(scope.row)" class="icon-operate-btn iconfont quxiaoguanlian" title="取消关联"></span>

                  <span v-if="$utils.m('project_vote') && scope.row.relatedVote == true"
                  @click="relatedvoting(scope.row)" class="icon-operate-btn iconfont guanliantoupiao" title="关联投票"></span>

                  <span v-if="$utils.m('project_vote') &&scope.row.relatedVote == true"
                  @click="relatedQp(scope.row)" class="icon-operate-btn iconfont quxiaoguanlian" title="取消关联"></span>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="pages">
            <el-pagination background layout="total, sizes, prev, pager, next, jumper"
                           :total="dataTotalsCopied"
                           :pageSize="pageSizeCopied"
                           :page-sizes="pageSizes"
                           :current-page.sync="currentPageCopied"
                           @current-change="onPageChange(arguments, 'copied')"
                           @size-change="handleSizeChange(arguments,'copied')"></el-pagination>
          </div>
        </el-tab-pane>

      </el-tabs>
    </div>

<!-- 其他审批审批 -->
    <el-dialog :title="catItem.procName+''" center top="80px" :close-on-click-modal="false" @close="closes" :visible.sync="dialogVisible" width="700px">
      <div class="project" style="height: calc(100vh - 300px);">
        <el-scrollbar style="height:100%">
          <!-- <p></p> -->
          <div class="infowan">
            <p style="float: left;">发起人：{{chemsg}}</p>
            <p class="infowan-type" style="margin-right: 0" :title="currentgeneration">业务类型:{{currentgeneration}}</p>
            <p class="infowan-type" style="margin-top: 10px;margin-right: 0" :title="Typesoffinancing">当前阶段:{{Typesoffinancing}}</p>
            <p class="infowan-type" style="margin-top: 10px;float: left;" :title="Typeapproval">审批类型:{{Typeapproval}}</p>
          </div>
          <div class="project1">
            <div style="line-height: 50px;width: 300px;" class="title_lable" v-if="prometitle">项目信息
              <!-- <span style="margin-left: 27px;font-size: 10px;">发起人：<span style="font-weight: lighter;">{{chemsg}}</span></span> -->
            </div>
            <ul class="porject_name" v-if="auditormessage">
              <li>
                <i style="position: relative;top: -6px;">项目名称：</i>
                <span style="width: 185px;">
                  <el-input size="mini" disabled v-model="xmbh" placeholder="请输入内容"></el-input>
                </span>
              </li>
              <li>
                <i style="position: relative;top: -6px;">项目编码：</i>
                <span style="width: 185px;">
                  <el-input size="mini" disabled v-model="xmbh2" placeholder="请输入内容"></el-input>
                </span>
              </li>
              <li v-if="pigeonholemoment">
                <i style="position: relative;top: -6px;">归档阶段：</i>
                <span style="width: 185px;">
                  <el-input size="mini" disabled v-model="pigjieduan" placeholder="请输入内容"></el-input>
                </span>
              </li>
              <!-- <li v-if="pigeonholeremark" style="width:97%;margin-bottom:20px;">
                <i style="position: relative;top: -6px;">归档备注：</i>
                <span style="">
                  <el-input size="mini" disabled v-model="pigbeizhu" placeholder="请输入内容" type="textarea"></el-input>
                </span>
              </li> -->
              <li style="padding-bottom: 19px" v-for="(item,index) in typeText.form" :key="index" v-if="otherxiangm">
                <i>{{item.name}}：</i>
                <span v-if="item.type.mimeType == 'text/plain'" style="width: 185px;">
                  <el-input disabled size="mini" :placeholder="item.value" type="textarea" style="height:46px;"></el-input>
                </span>
                <span v-else style="width: 185px;">
                  <el-input disabled size="mini" :placeholder="item.value" type="textarea" style="height:46px;"></el-input>
                </span>
              </li>
              <!-- <li style="clear:both;height:0"></li> -->
            </ul>

            <div v-if="newmesageproject">
              <!-- 新建项目的客户信息 -->
              <ul v-if="$utils.m('customer_manage')" class="projectnewmessage clearFix">
                <div class="companymessage">客户信息</div>
                <li class="clearFix">
                  <div class="messcontent">
                    <label for="">客户名称：</label>
                    <span>{{customMsg.name}}</span>
                  </div>
                  <div class="messcontent">
                    <label for="">所属行业：</label>
                    <span>{{customMsg.industryOne}}</span>
                  </div>
                </li>
                <li class="clearFix">
                  <div class="messcontent">
                    <label for="">客户类型：</label>
                    <span>{{customMsg.type}}</span>
                  </div>
                  <div class="messcontent">
                    <label for="">成立时间：</label>
                    <span>{{customMsg.foundingTime}}</span>
                  </div>
                </li>
                <li class="clearFix">
                  <div class="messcontent">
                    <label for="">法人代表：</label>
                    <span>{{customMsg.legalPerson}}</span>
                  </div>
                  <div class="messcontent">
                    <label for="">联系电话：</label>
                    <span>{{customMsg.telephone}}</span>
                  </div>
                </li>
                <li class="clearFix areacompany">
                  <label for="">主营业务：</label>
                  <span>{{customMsg.business}}</span>
                </li>
              </ul>
              <!-- 新建项目的项目信息 -->
              <ul class="projectnewmessage clearFix">
                <div class="companymessage">项目信息</div>
                <li class="clearFix">
                  <div class="messcontent">
                    <label for="">项目编码：</label>
                    <span :title="proMsg.code">{{proMsg.code}}</span>
                  </div>
                  <div class="messcontent">
                    <label for="">项目名称：</label>
                    <span :title="proMsg.name">{{proMsg.name}}</span>
                  </div>
                </li>
                <li class="clearFix">
                  <div class="messcontent">
                    <label for="">项目简称：</label>
                    <span :title="proMsg.abbreviation">{{proMsg.abbreviation}}</span>
                  </div>
                  <div class="messcontent">
                    <label for="">业务类型：</label>
                    <span :title="proMsg.financingName">{{proMsg.financingName}}</span>
                  </div>
                </li>
                <li class="clearFix">
                  <div class="messcontent">
                    <label for="">所属部门：</label>
                    <span :title="proMsg.deptName">{{proMsg.deptName}}</span>
                  </div>
                  <div class="messcontent">
                    <label for="">开始日期：</label>
                    <span>{{proMsg.startTime}}</span>
                  </div>
                </li>
                <li class="clearFix">
                  <div class="messcontent">
                    <label for="">结束日期：</label>
                    <span>{{proMsg.endTime}}</span>
                  </div>
                </li>
                <li class="clearFix areacompany">
                  <label for="">项目描述：</label>
                  <span :title="proMsg.description">{{proMsg.description}}</span>
                </li>
              </ul>
              <!-- 新建项目的中介机构 -->
              <ul class="projectnewmessage clearFix" v-if="this.$utils.m('customer_manage')">
                <div class="companymessage">中介机构</div>
                <li class="clearFix">
                  <div class="messcontent clearFix" v-for="(item,key,index) in messageObj">
                    <label for="">{{key}}：</label>
                    <div v-for="obj in item" style="float:left;">
                      <span>{{obj.name}}、</span>
                    </div>
                  </div>
                </li>
              </ul>
              <!-- 新建项目的团队信息 -->
              <ul class="projectnewmessage clearFix">
                <div class="companymessage">团队信息</div>
                <li class="clearFix">
                  <div class="messcontent" v-for="(value,key) in projectMemberInfo">
                    <label for="">{{value.roleName}}：</label>
                    <div v-for="item in value.usNameList" class="messDiv">
                      <span>{{item}}、</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <!-- 文件借阅 -->
            <div v-if="fileBorrow" class="filejieyue">
              <div style="line-height: 50px;" class="title_lable">借阅信息</div>
              <ul>
                <li>
                  <label for="">借阅方式：</label>
                  <span>
                    <el-radio-group v-model="radioList" disabled="disabled">
                      <el-radio :label="1">电子借阅</el-radio>
                      <el-radio :label="0">纸质借阅</el-radio>
                    </el-radio-group>
                  </span>
                </li>
                <li>
                  <label for="">借阅时间：</label>
                  <span style="width:255px;px;display:inline-block">
                    <el-input size="mini" disabled v-model="jieyuetime" placeholder="请输入内容"></el-input>
                  </span>
                </li>
                <li>
                  <label for="">文件名称：</label>
                  <span>
                    <ul id="project2" class="wait_shfile" style="margin-left:15px;">
                      <el-scrollbar style="height:100%">
                        <li v-for="(item,index) in borrowFileLjieyue.borrowFileList">
                          <div class="filename" style="display: inline-flex; text-align:left;">
                            <p style="width:530px!important;cursor:auto;">{{item.fileName}}</p>
                            <!-- <el-button
                                        style="padding-left: 158px;"
                                        size="mini"
                                        type="text"
                                        @click.stop="delects(item)"
                                    >删除</el-button> -->
                          </div>
                          <!-- <div class="filename" v-else style="text-decoration:line-through;">{{item.fileName}}</div> -->
                        </li>
                      </el-scrollbar>
                    </ul>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div style="clear: both;"></div>
<!-- style="clear: both;" -->
          <div  v-if="selewenjian != '新建项目审批'" class="requese-content">
            <p>申请内容：</p>
            <div><approvalpending :html2="html2" :changes="changes" /></div>
          </div>
          <!-- 2-3 -->
          <div class="wait_shfile" style="margin-left:-9px;" v-if="states">
            <div class="project1_titlebox">
              <div class="project1_titlebox_ittle" style="margin-left:12px;">{{wjsh}}</div>
              <p @click="filejil" class="project2span color-primary" style="cursor: pointer;">&nbsp;{{selewenjian}}记录</p>
            </div>
            <ul id="project2" class="wait_shfile" style="margin-left:15px;height:115px;width: 97%;">
              <el-scrollbar style="height:100%">
                <li v-for="(item,index) in typeText.attachment" v-if="item.delFlag == 0" :key="item.fileId" style="height:20px;">
                  <div class="filename" @click="yulan5(item)" style="text-align:left;margin-left:10px;">{{item.fileName}}</div>
                  <div class="fileoper" v-if="item.approvalStatus == '已驳回'">
                    <p ref="value1">
                      <!-- <input type="radio" disabled @change="value1(item,index,$event)" value="2" :name="item.id" /> 不同意
                      <input type="radio" disabled @change="value2(item,index)" value="1" :name="item.id" style="margin-left: 15px;" /> 同意 -->
                    </p>
                  </div>
                  <div class="fileoper" v-else>
                    <p ref="value1">
                      <input type="radio" @change="value1(item,index,$event)" value="2" :name="item.id" /> 不同意
                      <input type="radio" @change="value2(item,index)" value="1" :name="item.id" style="margin-left: 15px;" /> 同意
                    </p>
                  </div>
                  <p>
                    <el-button size="mini" type="text" v-if="mlstat" @click="xz(item)">下载</el-button>
                  </p>
                  <div class="filestatus" style="margin-right: 35px;">
                    <p v-if="item.approvalStatus == '待审批'" style="color: #52C41A">{{item.approvalStatus}}</p>
                    <p v-if="item.approvalStatus == '已通过'" style="color: #52C41A">待审批</p>
                    <p v-if="item.approvalStatus == '已驳回'" style="color: #FF4F3E">{{item.approvalStatus}}</p>
                  </div>
                </li>
                <li v-for="(item,index) in typeText.attachment" v-else :key="index">
                  <div class="filename" style="text-decoration:line-through;">{{item.fileName}}</div>
                </li>
              </el-scrollbar>
            </ul>
          </div>
           <div class="project1" id="auditorfujian" v-if="audfujian">
            <!-- <div class="title_lable">审批附件111</div> -->
            <!-- <p @click="filejil" class="project2span">&nbsp;</p> -->
            <!-- <ul id="project2" class="wait_shfile" style="margin-left:15px;">
              <el-scrollbar style="height:100%">
                <li v-for="(item,index) in typeText.annex">
                  <div class="filename" v-if="item.delFlag == 0" @click="yulan5(item)" style="display: inline-flex; text-align:left;">
                    <p v-if="item.delFlag == 0">{{item.fileName}}</p>
                    <el-button style="padding-left: 158px;" size="mini" type="text" @click.stop="xz(item)">下载</el-button>
                  </div>
                  <div class="filename" v-else style="text-decoration:line-through;">{{item.fileName}}</div>
                </li>
              </el-scrollbar>
            </ul>-->
                <div class="approval-check">
                    <div class="clearFix">
                        <el-checkbox v-if="typeText.annex && typeText.annex.length" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="fl">审批附件</el-checkbox>
                        <span v-else class="ml-5"> 审批附件</span>
                        <button  v-if="typeText.annex && typeText.annex.length" @click="downLoadFilesaaa" class="fr down-load-btn">下载</button>
                    </div>
                    <el-checkbox-group class="approval-group" v-model="annex" @change="handleCheckedCitiesChange">
                        <ul>
                            <!-- queryList.attachment -->
                            <el-checkbox v-for="item in typeText.annex" class="attachemnt-list-item select-box" :key="item.fileId" :label="item.fileId">
                                <span class="doc-name" @click="$utils.handleUploadFilePreview(item)" :title="item.fileName">{{item.fileName}}</span>
                            </el-checkbox>
                        </ul>
                    </el-checkbox-group>
                </div>
          </div>
        <!-- 附件 -->

          <!-- 审批环节 -->
          <div class="project3 sphj_box">
            <div class="project1_titlebox">
              <div class="project1_titlebox_ittle" style="width:100px;">审批环节</div>
              <p @click="cares = true"  v-if="isCareOf == 1" class="project2span color-primary" style="margin-right: -540px;margin-top: 25px;"
               ><el-button type="primary" size="mini">转交</el-button></p>
              <!-- <p @click="cares = true" v-if="rowOwner" class="project2span" style="margin-right: -540px;margin-top: 25px;"><el-button type="primary" size="mini">转交</el-button></p> -->
              <p @click="approved(catItem)" class="project2span color-primary" style="cursor: pointer;">&nbsp;审批记录</p>
            </div>
            <!-- <div>审批环节</div> -->
            <ul>
              <li style="margin-top:20px;margin-left:3px;text-align:left;width: 86%;">
                <i style="color:red">*</i>
                <span style="padding-right: 12px;">审批结果</span>
                <!-- <el-radio v-model="radio" label="1">{{item.name}}</el-radio> -->

                <i v-for="(item,index)  in radioId" :key="index" style="padding-right: 15px;">
                  <input ref="radios" @change="record(item,index)" type="radio" name="name" />
                  <i>{{item.name}}</i>
                </i>
                <!-- <span @click="approved()" style="float:right;color:#1F58A0;cursor: pointer;">审核记录</span> -->
              </li>
            </ul>
          </div>
          <div class="proend" style="margin-top:18px">
            <p style="margin-left:14px;">审批意见：</p>
            <textarea v-model="textareas" maxlength="1000" name id style="width:542px;"></textarea>
          </div>
           <div class="proend" style="margin-top:18px;max-height: 126px;overflow-y: auto;height:auto;">
               <p style="padding-bottom: 7px;margin-top:10px;">抄送人:</p>
                <span v-if="deployObjputong.length>0">&nbsp;&nbsp;</span>
                <el-button type="primary" @click="optPrinFnputong(1)" size="small" style="margin-top:-1px;">选择人员</el-button>
                    <el-tag v-for="(item,index) in colyObjputong" :key="'info2'+index" class="userbtn" style="margin-left:10px;margin-bottom:10px;">
                    {{item.name}}
                </el-tag>
                <el-tag v-for="(item,index) in deployObjputong" :key="index" class="userbtn" style="margin-left:10px;margin-bottom:10px;" @close="handle_Closeputong(index,0)" :closable="!chack_buleputong">
                    {{item.name}}
                </el-tag>
          </div>
          <div class="fj_box" style="padding-left:16px;text-align:left;">
            <span class="title">附件：</span>

            <add-attachment ref="attachment"
                            :projectId="projectId"
                            @select="$utils.handleSelect(arguments, selectedFileList)"></add-attachment>
            <ul style="text-align: left;margin-left: 48px;" class="attachment-wrap">
              <li v-for="item in selectedFileList" class="attachemnt-list-item">
                <p class="attachemnt-list-doc" style="float: none;">
                  <span class="doc-name" @click="$utils.handleUploadFilePreview(item, {projectId:projectId,sourceName:'我的审批',projectName:projectName})" :title="item.docName">{{item.docName}}</span>
                  <span>
<!--                      <el-button v-if="item.addSource!==1" type="text" @click="dowanFs(item)">下载</el-button>-->
                      <el-button type="text" @click="$utils.handleDeleteSelected(selectedFileList, item)">删除</el-button>
                    </span>
                </p>
              </li>
            </ul>

            <ul v-if="1===2" id="project2" style="margin-left:17px;">
              <el-scrollbar style="height:100%">
                <li v-for="(item,index) in shagreatlist" :key="index" class="upload_file_list">
                  <!-- <span class="hide_text">{{item.name}}</span> -->
                  <span type="text" @click="yulan3(item)" style="width:518px; overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #0061a9;cursor: pointer;">{{item.name}}</span>
                  <i class="project2span color-primary" @click="delects(item)" style="float:right;">删除</i>
                </li>
                <li v-for="(item,index) in shagchaunlist" :key="index" class="upload_file_list">
                  <!-- <span class="hide_text">{{item.name}}</span> -->
                  <span type="text" @click="yulan3(item)" style="width:518px; overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #0061a9;cursor: pointer;">{{item.name}}</span>
                  <i class="project2span color-primary" @click="delects2(item)" style="float:right;">删除</i>
                </li>
              </el-scrollbar>
            </ul>


          </div>
        </el-scrollbar>
      </div>
      <div id="dialog-footer">
        <el-button size="medium" style="margin-right:12px;" @click="closes">取 消</el-button>
        <span id="sub_approve">
          <el-button size="medium" type="primary" :disabled="completetask" @click="dialogVisibles">确定</el-button>
        </span>
      </div>
    </el-dialog>

    <!-- <el-dialog title="审批催办" align="left" :close-on-click-modal="false" :visible.sync="dialogVisible2" center width="720px">
      <div style="height: calc(100vh - 400px);">
        <div class="dialos_box shcb_box">
            <div style="height: calc(100vh - 400px);">
                <el-scrollbar style="height: 100%">
                        <el-form :model="formInline" class="demo-form-inline"  label-width="100px" style="text-align:left">
                            <el-form-item label="提醒方式：" class="remindRight">
                                <el-checkbox-group v-model="remindWay" @change="checkboxChose">
                                    <el-checkbox v-for="way in remindWayGrounp" :label="way.label" :key="way.value">{{way.label}}</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="接收人员：" class="remindRight">
                                <el-tag v-for="(item,index) in userIds"
                                    :key="index"
                                    class="userbtn"
                                    @close="delectx(index)"
                                    :closable="!chack_bule">
                                    {{item.name}}
                                </el-tag>
                            </el-form-item>
                            <el-form-item label="提醒内容：" class="remindRight">
                                <el-input type="textarea" cols="40" rows="5" resize="none" v-model.trim="formInline.contentMessage"  maxlength="100" ></el-input>
                                <el-input type="textarea" cols="40" rows="5" resize="none" v-model.trim="formInline.contentEmial"  maxlength="100" class="remindContent" v-if="contentEmial"></el-input>
                                <el-input type="textarea" cols="40" rows="5" resize="none" v-model.trim="formInline.contentNote"  maxlength="100" class="remindContent" v-if="contentNote"></el-input>
                            </el-form-item>
                        </el-form> -->
                    <!-- <div id="dialos">
                            <span class="title">接收人员：</span>
                            <span class="js_people" v-for="(item,index) in userIds" :key="index">
                            {{item}}
                            <i class="delete-copy-person" style="right:-4px;top:5px;" @click="delectx(item,index)"></i>
                            </span>
                    </div>
                    <div class="dialo_opinion">
                            <p class="title" style="text-align:left">内容：</p>
                            <textarea name maxlength="100" id="dialo_textarea" v-model="textaress"></textarea>
                    </div>
                    <div class="dialog_file3">
                            <span class="title">提醒方式：</span>
                            <el-select size="mini" v-model="value" placeholder="站内信">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                    </div> -->
                <!-- </el-scrollbar>
            </div>
            <div id="dialog-footer">
                <el-button size="medium" @click="dialogVisible2 = false">取 消</el-button>
                <el-button size="medium" type="primary" @click="dialogVisible9">确 定</el-button>
            </div>
        </div>
      </div>
    </el-dialog> -->
        <!-- 审批催办 -->
    <el-dialog
        title="审批催办"
        :visible.sync="dialogVisible2"
        width="720px"
        @close="dialogVisibleclose">
        <div style="height: calc(100vh - 400px);" >
            <el-scrollbar style="height: 100%">
                <el-form :model="formInline" class="demo-form-inline"  label-width="100px" style="text-align:left">
                    <el-form-item label="提醒方式：" class="remindRight">
                        <el-checkbox-group v-model="remindWay" :min="1">
                            <el-checkbox v-for="way in remindWayGrounp" :label="way.label" :key="way.value">{{way.label}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="接收人员：" class="remindRight">
                            <el-tag class="js_people" v-for="(item,index) in userIds" :key="index" :closable="!chack_bule" @close="delectx(item,index)">
                            {{item}}
                            <!-- <i class="delete-copy-person" style="right:-4px;top:5px;" @click="delectx(item,index)"></i> -->
                            </el-tag>
                    </el-form-item>
                    <el-form-item label="提醒内容：" class="remindRight">
                        <el-input type="textarea" cols="40" rows="5" resize="none" v-model.trim="textaress"  maxlength="100" ></el-input>
                        <!-- <el-input type="textarea" cols="40" rows="5" resize="none" v-model.trim="formInline.contentEmial"  maxlength="100" class="remindContent" v-if="contentEmial"></el-input>
                        <el-input type="textarea" cols="40" rows="5" resize="none" v-model.trim="formInline.contentNote"  maxlength="100" class="remindContent" v-if="contentNote"></el-input> -->
                    </el-form-item>
                </el-form>
            </el-scrollbar>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleclose">取 消</el-button>
            <el-button type="primary" @click="dialogVisible9">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog title="审批记录" align="left" :close-on-click-modal="false" center @close="close3" :visible.sync="dialogVisible3" width="620px" height="456px">
      <div>
        <div class="dialos_box shjl_box">
          <div id="records">
            <el-scrollbar style="height: 100%">
              <ul style="text-align:left;">
                <li>
                  <span class="lispsan">提交人：&nbsp;</span>
                  <!-- <span class="spanimg">
                  <img src="../../../assets/image/user.png" alt>
                </span>-->
                  <el-tag>{{approved_memo.username}}</el-tag>
                </li>
                <li>
                  <span class="lispsan">提交时间：</span>
                  <span>{{approved_memo.time}}</span>
                </li>
                <li>
                  <p style="font-weight:400;text-align:left;float: left;margin-left: 0px;font-weight: bold;color: black;font-size: 14px;">
                    申请内容：
                  </p>
                  <!-- margin-top: -25px;margin-bottom: 10px; -->
                  <div style="float: left;width: 468px; height:72px; margin-left: 26px;">
                    <approvedmemo :html2is="html2is" :changes2="changes2" />
                  </div>
                </li>
                <li>
                    <p style="font-weight:400;text-align:left;float: left;margin-left: 0px;font-weight: bold;color: black;font-size: 14px;margin-top:10px;">
                    抄送人：
                  </p>
                  <div style="float: left;width: 468px; height:120px; margin-left: 26px;margin-top:8px;max-height: 150px;overflow-y: auto;">
                    <el-tag v-for="(item,index) in colyObj" :key="'info2'+index" class="userbtn" style="margin-left:10px;margin-bottom:10px;">
                        {{item.name}}
                    </el-tag>
                  </div>
                </li>
                <p style="clear: both;"></p>
                <!-- 发起审批的附件 attachmentShow-->
                <div v-if="attachmentShow" class=''>
                    <div style="font-weight:400;text-align:left;" class="clearFix">
                        <el-checkbox :indeterminate="isIndeterminatefujian" v-model="checkAllfujian" @change="handleCheckAllChangefujian" class="fl" style="font-weight: bold;color: black;">上传附件:</el-checkbox>
                        <button  @click="downLoadFilesfujian" class="fr down-load-btn down-load-btn-right">下载</button>
                    </div>
                   <!-- <li v-for="(item, ind) in attachData" :key="ind"> -->
                    <li class='attach-files' style="max-height: 210px;overflow: auto;">
                        <el-scrollbar>
                         <div class="files-box"  v-for="item in approved_memo.attachment" :key="item.fileId" :label="item.fileId">
                        <!-- <p @click="previewFn(item)">
                            <span class='files-img'><img :src="item.fileIcon"></span>
                            <span :title="item.fileName">{{item.fileName}}</span>
                        </p>
                        <span style="margin-right: 3px;" @click="downLoadFiles(item, ind)">下载</span> -->
                            <!-- <el-checkbox    @click="handleUploadFilePreviewfujian(item)" class="attachemnt-list-item select-box" style="display:block" :key="item.fileId" :label="item.fileId">
                                <span class="doc-name"  @click="previewFn(item)" :title="item.fileName">{{item.fileName}}</span>
                            </el-checkbox> -->
                            <el-checkbox-group class="approval-group" v-model="annexfujian" @change="handleCheckedCitiesChangefujian">
                                <ul>
                                     <el-checkbox  class="attachemnt-list-item select-box"  :key="item.fileId" :label="item.fileId">
                                        <span class="doc-name"  @click="previewFn(item)" :title="item.fileName">{{item.fileName}}</span>
                                    </el-checkbox>
                                </ul>
                            </el-checkbox-group>
                        </div>
                        </el-scrollbar>
                    </li>
                  <!-- </li> -->
                </div>

                <li style="height: 39px;">
                  <span class="lispsan">审批状态：</span>
                  <span class="result">{{approved_memo.status}}</span>
                </li>
                <!-- taskDefKey -->
                <div class="sh_list" v-for="(item,i) in approved_memo.list" :key="i">
                  <li>
                    <i v-if="item.taskDefKey != ''">
                      <i class="lispsan">{{item.rankApprove}}级审批：</i>
                      <span class="recordss">（{{item.approvalType}}）</span>
                    </i>
                    <!-- <i v-else>
                    <i class="lispsan">{{i}}</i>
                  </i>-->
                  </li>
                  <li>
                    <i class="linspans">审批人：</i>
                    <span v-if='item.ownerName == null || item.ownerName == ""' class="lispsan" style="margin-left: 6%;">{{item.username}}</span>
                    <span v-else class="lispsan" style="margin-left: 6%;">{{item.ownerName}} <i class="iconfont weibiaoti40" aria-hidden="true"></i> {{item.username}}</span>
                  </li>
                  <li>
                    <i class="linspans">审批时间：</i>
                    <i style='margin-left: 4%;'>{{item.createDate}}</i>
                  </li>
                  <li v-if="item.comment != '' && item.comment != null">
                    <i class="linspans">审批意见：</i>
                    <span :title="item.comment" class="comments">{{item.comment}}</span>
                  </li>
                  <li v-if="item.ownerContext != null">
                    <i class="linspans">转交理由：</i>
                    <span :title="item.ownerContext" style='margin-left: 4%;display: inline-block;max-height: 116px;overflow: auto;'>{{item.ownerContext}}</span>
<!--
            <el-input style="width: 85%;" type="textarea" :rows="2" maxlength="1000" placeholder="请输入转交理由" v-model="carestextarea"> -->
                  </li>
                  <li v-if="item.status != '' && item.status != null">
                    <span class="linspans">审批结果：</span>
                    <span class="result addleft" v-if="item.status == '同意'" style="color: #52C41A">{{item.status}}</span>
                    <span class="result addleft" v-else-if="item.status == '驳回'" style="color: #FA541C">{{item.status}}</span>
                    <span class="result addleft" v-else>{{item.status}}</span>
                  </li>
                  <div class="dialogs_files"  v-if='item.commentAttachmentshow'>
                      <div class="clearFix">
                            <el-checkbox :indeterminate="isIndeterminatefujsecond" v-model="checkAllfujsecond" @change="handleCheckAllChangefujsecond" class="fl" style="display: inline-block;width: 80px;">上传附件:</el-checkbox>
                            <button  @click="downLoadFilesfujsecond" class="fr" style="margin-right:30px;background:none;">下载</button>
                      </div>
                    <!-- <span class="title" style="display: inline-block;width: 80px;">上传附件:</span> -->

                    <div class="" style="">
                      <li v-for="(o, ind) in item.commentAttachment" :key="ind" class='attach-files'>
                          <el-checkbox-group class="approval-group" v-model="annexfujsecond" @change="handleCheckedCitiesChangefujsecond">
                                <ul>
                                     <el-checkbox  class="attachemnt-list-item select-box" style="display:block" :key="o.fileId" :label="o.fileId">
                                        <span class="doc-name"  @click="previewFn(o)" :title="o.fileName">{{o.fileName}}</span>
                                    </el-checkbox>
                                </ul>
                            </el-checkbox-group>
                        <!-- <div class="files-box">
                          <p @click="previewFn(o)">
                            <span class='files-img'><img :src="o.fileIcon"></span>
                            <span :class="o.delFlag == 1?'del-file':''" :title="o.fileName">{{o.fileName}}</span>
                          </p>
                          <!-- <span @click="downLoadFiles(o)">下载</span> -->
                        <!-- </div>  -->
                      </li>
                    </div>
                  </div>
                  <li style='height:50px;'></li>
                </div>
              </ul>
            </el-scrollbar>
          </div>
        </div>
      </div>
    </el-dialog>
    <!--title="文件审批记录"-->
    <el-dialog :title="selewenjian+'记录'" :close-on-click-modal="false" align="left" @close="close5" center :visible.sync="dialogVisible7" width="480px">
      <div>
        <div class="dialos_box">
          <div id="records">
            <ul>
              <li>
                <span class="lispsan">提交人：&nbsp;</span>
                <!-- <span class="spanimg">
                  <img src="../../../assets/image/user.png" alt>
                </span>-->
                <span>&nbsp;&nbsp;{{review.username}}</span>
              </li>
              <li>
                <span class="lispsan">提交时间：</span>
                <span>{{review.time}}</span>
              </li>
              <li>
                <span class="lispsan">审批状态：</span>
                <span class="result">{{review.status}}</span>
              </li>
              <div v-for="(item,i) in review.list" :key="i">
                <li>
                  <i class="lispsan">{{++i}}级审批：</i>
                  <span class="recordss">（{{item.approvalType}}）</span>
                </li>
                <li>
                  <i class="linspans">审批人：</i>
                  <span class="lispsan">{{item.username}}</span>
                </li>
                <li>
                  <i class="linspans">审批时间：</i>
                  <i>{{item.createDate}}</i>
                </li>
                <li>
                  <span class="linspans">审批结果：</span>
                  <span class="result" v-if="item.status != '同意'">{{item.status}}</span>
                  <span class="result" v-if="item.status == '同意'" style="color: #52C41A">{{item.status}}</span>
                </li>
                <div class="dialogs_files">
                  <span class="title">审批文件：</span>
                  <div class="dialogs_files_box">
                    <el-scrollbar style="height:100%">
                      <li v-for="(ite,index) in item.recordAttachment" :key="index" style="height:20px;">
                        <div v-if="ite.state == 0">
                          <div v-if="ite.delFlag == 1" class="gdt" style="text-decoration:line-through;">
                            <!-- {{ite.fileName}} -->
                            <a href="javascript:void(0);" style>{{ite.fileName}}</a>
                          </div>
                          <div v-else class="gdt">
                            <!-- {{ite.fileName}} -->
                            <a @click="yls(ite)" class="cssls" href="javascript:void(0);" style="text-align:left;">{{ite.fileName}}</a>
                            <a src style="margin-right: 5px;float: right;" @click="xz(ite)">下载</a>
                            <i style="margin-right: 5px;float: right;font-size: 9px;color: #999999;">待审批</i>
                          </div>
                        </div>
                        <div v-if="ite.state == 1">
                          <div class="gdt" v-if="ite.delFlag == 1" style="text-decoration:line-through;">
                            <!-- {{ite.fileName}} -->
                            <a href="javascript:void(0);">{{ite.fileName}}</a>
                          </div>
                          <div v-else class="gdt">
                            <!-- {{ite.fileName}} -->
                            <a @click="yls(ite)" class="cssls" href="javascript:void(0);" style="text-align:left;">{{ite.fileName}}</a>
                            <a src style="margin-right: 5px;float: right;" @click="xz(ite)">下载</a>
                            <i style="margin-right: 5px;float: right;color: #999999;">通过</i>
                          </div>
                        </div>
                        <div v-if="ite.state == 2">
                          <div class="gdt" v-if="ite.delFlag == 1" style="text-decoration:line-through;">
                            <!-- {{ite.fileName}} -->
                            <a href="javascript:void(0);">{{ite.fileName}}</a>
                          </div>
                          <div v-else class="gdt">
                            <!-- {{ite.fileName}} -->
                            <a @click="yls(ite)" class="cssls" href="javascript:void(0);" style="text-align:left;">{{ite.fileName}}</a>
                            <a src style="margin-right: 5px;float: right;" @click="xz(ite)">下载</a>
                            <i style="margin-right: 5px;float: right;color: #999999;">不通过</i>
                          </div>
                        </div>
                      </li>
                    </el-scrollbar>
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="文件审批记录" align="left" center :close-on-click-modal="false" :visible.sync="dialogVisiblewenj" width="430px">
      <div>
        <div class="dialos_box">
          <div id="recordss">
            <ul>
              <li>
                <h3>文件名称:</h3>
                <p>
                  <input type="checkbox" style="vertical-align: text-top;" />
                  <span>&nbsp;平方根几号放假</span>
                </p>
              </li>
              <li>
                <h3>审批意见:</h3>
                <textarea name id="textares" cols="30" rows="10" placeholder></textarea>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </el-dialog>

    <input type="file" id="fileBtn" style="display:none" />
    <!--新增关联会议弹框-->
    <el-dialog title="关联会议" :close-on-click-modal="false" :visible.sync="dialogMeeting" width="650px">
      <div>
        <el-scrollbar style="height:100%">
          <el-form label-width="130px" align="left" class="demo-ruleForm">
            <el-form-item label="选择会议：">
              <!-- {{meetRegion}} -->
              <el-select v-model="meetRegion" filterable placeholder="请选择会议" @change="fsgj">
                <el-option v-for="item in meetList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="我选中的会议：" prop="type" v-if="meetcheckList.length>0">
              <!-- {{meetCheckid}} {{meetcheckList}} -->
              <el-checkbox-group v-model="meetCheckid">
                <el-checkbox @change="duaoxuan" v-for="(itm,index) in meetcheckList" :label="itm.id" :key="index" checked style="display:block;">{{itm.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="新增会议：" v-if="showNewMeeting" prop="type">
              <el-button type="primary" size="medium" @click="addresMeeting">新增会议</el-button>
            </el-form-item>
          </el-form>
          <span class="ques_button">
            <el-button size="medium" type="primary" @click="RelationMeet">确定</el-button>
            <el-button size="medium" @click="RelatMeet_x">取消</el-button>
          </span>
        </el-scrollbar>
      </div>
    </el-dialog>
    <el-dialog title="取消关联提醒" :close-on-click-modal="false" :visible.sync="QMeeting" width="550px">
      <div style="height:300px;">
        <el-scrollbar style="height:100%">
          <ul class="exit_box">
            <li v-for="(item,index) in Assd_meeting" :key="index" style="margin-bottom: 16px;">
              <span class="left">{{item.meetingName}}</span>
              <span class="right" @click="haQMeet(item)">取消关联</span>
            </li>
          </ul>
          <!-- <el-form label-width="190px" align="left" class="demo-ruleForm">
            <el-form-item
              style="font-size: 26px;line-height: 20px;"
              v-for="(item,index) in Assd_meeting"
              :label="item.meetingName"
              :key="index"
            >
              <el-button
                style="margin-left:50px;height:24px;"
                type="primary"
                round
                size="mini"
                @click="haQMeet(item)"
              >取消关联</el-button>
            </el-form-item>
          </el-form>-->
        </el-scrollbar>
      </div>
    </el-dialog>
    <el-dialog title="新增会议" :close-on-click-modal="false" :visible.sync="addMeeting" width="650px" @close="cancelMeet">
      <div>
        <el-scrollbar style="height:100%">
          <el-form ref="form" :model="meeting" label-width="120px" align="left" class="form_box clearfix">
            <ul align="left" class="riwjn_we" style="margin-left:24px;">
              <li class="usernanmestlt" style="font-size:14px;">
                <i style="color:red;padding-right: 5px;    margin-left:4px;text-align:left;">*</i>参会人员：
              </li>
              <li class="usernanmes" style="font-size:14px;">
                <span class="userbtn" style="padding-right:10px;" v-for="(item,index) in meeting.Voterusids" :key="index">
                  {{item.name}}
                  <button class="deletro delusebtn" @click="deletusid(1,index)"></button>
                </span>
                <span>&nbsp;&nbsp;</span>
                <el-button type="primary" @click="optPrinFn(1)" size="mini">选择人员</el-button>
              </li>
              <!-- <li>参会人员:</li>
              <li>
                <span
                  type="text"
                  v-for="(item,index) in meeting.Voterusids"
                  :key="index"
                  style="margin-left:15px;"
                  size="mini"
                >
                  {{item.name}}
                  <i @click="deletusid(1,index)" class="el-icon-close"></i>
                </span>
              </li>
              <li style="padding-left:5px; ">
                <el-button type="primary" size="mini" @click="optPrinFn(1)">选择人员</el-button>
              </li>-->
            </ul>
            <ul align="left" class="riwjn_we" style="margin-left:42px;">
              <li class="usernanmestlt" style="font-size:14px;width:76px;">列席人员：</li>
              <li class="usernanmes">
                <span class="userbtn" style="padding-right:10px;" v-for="(item,index) in meeting.copyPerson" :key="index">
                  {{item.name}}
                  <button class="deletro delusebtn" @click="deletusid(2,index)"></button>
                </span>
                <span>&nbsp;&nbsp;</span>
                <el-button type="primary" @click="optPrinFn(2)" size="mini">选择人员</el-button>
              </li>
            </ul>
            <el-form-item required label="会议主题：" style="margin-top:8px" align="left">
              <el-input v-model="meeting.name" style="width:220px;text-align: left;" placeholder="请输入内容" :maxlength="50"></el-input>
            </el-form-item>
            <el-form-item required label="会议类型：" align="left">
              <el-select v-model="meeting.typeName" filterable placeholder="请选择会议类型" style="width:220px;">
                <el-option v-for="item in selectStateList" :key="item.value" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item required label="会议地点：">
              <el-input v-model="meeting.meetingSite" style="width:220px;text-align: left;" placeholder="请输入会议地点" :maxlength="50"></el-input>
            </el-form-item>
            <el-form-item required label="会议时间：">
              <el-date-picker @focus="$utils.handleTimeFocus" v-model="meeting.pro_time" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="会议开始时间"></el-date-picker>
              <el-date-picker @focus="$utils.handleTimeFocus" v-model="meeting.list_time" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="会议结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="提醒：">
              <!-- {{msgObj.remindType}} -->
              <el-select v-model="meeting.remindType" placeholder="无提醒" style="width:220px;">
                <el-option v-for="item in selectremind" :key="item.value" :label="item.name" :value="item.id"></el-option>
              </el-select>
              <!-- {{meeting.pro_mode}} -->
              <el-select v-model="meeting.pro_mode" multiple placeholder="请选择" v-if="!drgs">
                <el-option v-for="item in modelist" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="备注：" style="margin-top:10px;">
              <el-input type="textarea" :rows="2" v-model.trim="meeting.pro_remark" placeholder="请输入内容" :maxlength="2000" style="width:450px;text-align: left;"></el-input>
            </el-form-item>
            <ul align="left" class="riwjn_we">
              <li class="usernanmestlt" style="width:66px;">抄送人：</li>
              <li class="usernanmes">
                <span class="userbtn" style="padding-right:10px;" v-for="(item,index) in meeting.copychaoon" :key="index">
                  {{item.name}}
                  <button class="deletro delusebtn" @click="deletusid(5,index)"></button>
                </span>
                <span>&nbsp;&nbsp;</span>
                <el-button type="primary" @click="optPrinFn(7)" size="mini">抄送人员</el-button>
              </li>
            </ul>

            <el-form-item label="附件：" style="margin-top:10px;" align="left">
              <add-attachment ref="attachmentMeeting"
                              :projectId="queryDocProjectId"
                              @select="$utils.handleSelect(arguments,selectedFileMeeting)"></add-attachment>

              <ul style="text-align: left;" class="attachment-wrap">
                <li v-for="item in selectedFileMeeting" class="attachemnt-list-item">
                  <p class="attachemnt-list-doc">
                    <span class="doc-name" @click="$utils.handleUploadFilePreview(item, {projectId:queryDocProjectId,sourceName:'主工作台-我的审批-新增会议',projectName:projectName})" :title="item.docName">{{item.docName}}</span>
                    <span>
<!--                      <el-button v-if="item.addSource!==1" type="text" @click="dowanFs(item)">下载</el-button>-->
                      <el-button type="text" @click="$utils.handleDeleteSelected(selectedFileMeeting, item)">删除</el-button>
                    </span>
                  </p>
                </li>
              </ul>


              <ul v-if="1===2" style="text-align:left;height:60px;">
                <el-scrollbar style="height:100%">
                  <li v-for="item in selectedFileMeeting" class="attachemnt-list-item">
                    <p class="attachemnt-list-doc">
                      <span class="doc-name" @click="$utils.handleUploadFilePreview(item)" :title="item.docName">{{item.docName}}</span>
                      <span>
<!--                      <el-button v-if="item.addSource!==1" type="text" @click="dowanFs(item)">下载</el-button>-->
                      <el-button type="text" @click="$utils.handleDeleteSelected(selectedFileMeeting, item)">删除</el-button>
                    </span>
                    </p>
                  </li>

                </el-scrollbar>
              </ul>
            </el-form-item>
          </el-form>
          <span class="ques_button" style="float:right;margin-right:40px;">
            <el-button size="medium" type="primary" @click="aDDupMeet">确定</el-button>
            <el-button size="medium" @click="cancelMeet">取消</el-button>
          </span>
        </el-scrollbar>
      </div>
    </el-dialog>

    <!--新增关联投票弹框-->
    <el-dialog title="关联投票" :close-on-click-modal="false" @close="QxRelate" :visible.sync="dialogCvote" width="650px">
      <div>
        <el-scrollbar style="height:100%">
          <el-form ref="ruleForm4" label-width="140px" class="demo-ruleForm">
            <el-form-item label="选择投票：" align="left" prop="region">
              <!-- {{CvoteList_id}} -->
              <el-select v-model="CvoteList_id" filterable placeholder="请选择投票">
                <!-- CvoteList -->
                <el-option v-for="item in CvoteList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="我选中的投票:" align="left" v-if="ruleFormnme!==''" prop="type">{{ruleFormnme}}</el-form-item>
            <el-form-item label="新增投票：" v-if="showNewVote" align="left" prop="type">
              <el-button type="primary" size="medium" @click="addCvote">新增投票</el-button>
            </el-form-item>
          </el-form>
          <span class="ques_button">
            <el-button size="medium" type="primary" @click="Relatedvoting">确定</el-button>
            <el-button size="medium" @click="QxRelate">取消</el-button>
          </span>
        </el-scrollbar>
      </div>
    </el-dialog>

    <el-dialog title="取消投票关联提醒" :close-on-click-modal="false" :visible.sync="QXgCvote" width="550px">
      <div class="exit_container">
        <el-scrollbar style="height:100%">
          <ul class="exit_box">
            <li v-for="(item,index) in Assd_Cvote" :key="index">
              <span class="left">{{item.voteName}}</span>
              <span class="right" @click="haCvote(item)">取消关联</span>
            </li>
          </ul>
          <p style="padding:30px 0;text-align:center" v-if="Assd_Cvote.length<=0">此审批流程要求您要有关联的投票</p>
          <!-- <el-form label-width="190px" align="left" class="demo-ruleForm">
            <el-form-item
              style="font-size: 26px;line-height: 20px;"
              v-for="(item,index) in Assd_Cvote"
              :label="item.voteName"
              :key="index"
            >
              <el-button
                style="margin-left:50px; "
                type="primary"
                @click="haCvote(item)"
                round
                size="mini"
              >取消关联</el-button>
            </el-form-item>
            <el-form-item v-if="Assd_Cvote.length<=0">没有关联的投票</el-form-item>
          </el-form>-->
        </el-scrollbar>
      </div>
    </el-dialog>

    <el-dialog title="新增投票" :close-on-click-modal="false" :visible.sync="addCvotebul" width="650px" @close="handleCloseVote">
      <div style="height:470px;">
        <el-scrollbar style="height:90%">
          <el-form ref="form" :model="msgObj" label-width="120px" class="form_box clearfix" align="left">
            <el-form-item required label="投票名称:" align="left">
              <el-input v-model="msgObj.pro_name" style="width:220px;text-align: left;" placeholder="请输入投票名称" :maxlength="50"></el-input>
            </el-form-item>
            <el-form-item label="投票类型:" :rules="[{required: true}]" align="left">
              <!-- {{msgObj.pro_state}} -->
              <el-select v-model="msgObj.pro_state" @change="seleist()" placeholder="请选择投票类型" style="width:220px;">
                <el-option v-for="item in select_type" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
              </el-select>
              <!-- {{setr_id}} -->
            </el-form-item>

            <el-form-item required label="投票时间:" align="left">
              <el-date-picker @focus="$utils.handleTimeFocus" v-model="msgObj.pro_time" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择开始日期时间"></el-date-picker>
              <el-date-picker @focus="$utils.handleTimeFocus" v-model="msgObj.list_time" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择结束日期时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="提醒:" align="left">
              <!-- {{msgObj.remindType}} -->
              <el-select v-model="msgObj.remindType" placeholder="无提醒" style="width:220px;">
                <el-option v-for="item in selectremind" :key="item.value" :label="item.name" :value="item.id"></el-option>
              </el-select>
              <!-- {{msgObj.pro_mode}} -->
              <el-select v-model="msgObj.pro_mode" multiple placeholder="站内信" v-if="!drg" style="width:220px;">
                <el-option v-for="item in modelist" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <ul align="left" class="riwjn_we" style="margin-left:35px;">
            <li>
              <i style="color:red;padding-right: 5px;    margin-left:4px;text-align:left;">*</i>投票人员：
            </li>
            <li>
              <span v-for="(item,index) in msgObj.Voterusids" :key="index" style="margin-left:15px;margin-top:5px" size="mini" plain>
                {{item.name}}
                <i @click="deletusid(3,index)" class="el-icon-close"></i>
              </span>
            </li>
            <li style="padding-left:5px;margin-top:5px;">
              <el-button type="primary" size="mini" @click="optPrinFn(3)">选择人员</el-button>
            </li>
          </ul>

          <!-- ////////// -->
          <!-- <el-form-item label="投票类型:" align="left">{{该投票需要角色:技术负责人,不少于2}}</el-form-item> -->
          <!--<ul align="left" class="riwjn_we" v-if="jincarr.length>0">-->
          <!--&lt;!&ndash; {{jincarr}} &ndash;&gt;-->
          <!--&lt;!&ndash; <li-->
          <!--v-for="(itm,index) in jincarr"-->
          <!--:key="index"-->
          <!--&gt;该投票需要角色:{{itm.roleName}},不少于{{itm.count}}</li> &ndash;&gt;-->
          <!--该投票需要角色:<li v-for="item in jincarr">{{item.roleName}},不少于{{item.count}}人;</li>-->
          <!--</ul>-->
          <p style="color:#999999" v-if="jincarr.length>0">
            该投票需要角色:
            <span v-for="(item,index) in jincarr" :key="index">{{item.roleName}},不少于{{item.count}};</span>
          </p>
          <ul align="left" class="riwjn_we">
            <li>抄送人员：</li>
            <li>
              <span v-for="(item,index) in msgObj.copyPerson" :key="index" style="margin-left:15px;margin-top:5px" size="mini" plain>
                {{item.name}}
                <i @click="deletusid(4,index)" class="el-icon-close"></i>
              </span>
            </li>

            <li style="padding-left:5px;margin-top:5px;">
              <el-button type="primary" size="mini" @click="optPrinFn(4)">选择抄送人员</el-button>
            </li>
          </ul>
          <el-form label-width="120px" align="left">
            <el-form-item label="附件：" style="margin-top:10px;" align="left">
              <add-attachment ref="attachmentVote"
                              :projectRequired="true"
                              :projectId="queryDocProjectId"
                              @select="$utils.handleSelect(arguments,selectedFileVote)"></add-attachment>



              <ul style="text-align: left;height:60px;">
                <!-- 本地上传文件 -->
                <el-scrollbar style="height:100%">
                  <li v-for="item in selectedFileVote" class="attachemnt-list-item">
                    <p class="attachemnt-list-doc">
                      <span class="doc-name" @click="$utils.handleUploadFilePreview(item, {projectId:queryDocProjectId,sourceName:'主工作台-我的审批-新增投票',projectName:msgObj.pro_name})" :title="item.docName">{{item.docName}}</span>
                      <span>
                      <el-button type="text" @click="$utils.handleDeleteSelected(selectedFileVote,item)">删除</el-button>
                        </span>
                    </p>
                  </li>



<!--                  <li v-for="(item,index) in msgObj.Enclosure" :key="index" class="upload_file_list" style="height:25px;">-->
<!--                    <span style="width:505px;overflow: hidden;text-overflow: ellipsis; white-space: nowrap;color: #0061a9;cursor: pointer;" @click="seeFj(item)">{{item.name}}</span>-->
<!--                    <i @click="deletben(3,index)" style="float:right;margin-top:1px;cursor: pointer;width:84px;" class="project2span">删除</i>-->
<!--                  </li>-->
<!--                  &lt;!&ndash; 关联文件 &ndash;&gt;-->
<!--                  <li v-for="(item,index) in msgObj.Relation" :key="index" class="upload_file_list" style="height:25px;">-->
<!--                    <span style="width:505px;overflow: hidden;text-overflow: ellipsis; white-space: nowrap;color: #0061a9;cursor: pointer;" @click="seeFj(item)">{{item.name}}</span>-->
<!--                    <i style="float:right;margin-top:1px;cursor: pointer;width:84px;" class="project2span">删除</i>-->
<!--                  </li>-->
                </el-scrollbar>
              </ul>

              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-form-item>
          </el-form>
        </el-scrollbar>
        <span style="float:right;margin-right:40px;">
          <el-button size="medium" type="primary" @click="AddVote">确定</el-button>
          <el-button size="medium" @click="cancelVote">取消</el-button>
        </span>
      </div>
    </el-dialog>
    <!--选择人员 -->
    <!--:findUserObj="findUserObj"-->
    <Auditcomponent @updatalist="updatalist" :approvalRecordShow="approvalRecordShow" :approvalRecordObj="approvalRecordObj" :nameinfo="nameinfo" @caresinfo="caresinfo" @filejl="filejl" :Auditco="Auditco" @ogVisible="ogVisible" @fileinfo="fileinfo" :fileDate="fileDate"/>
    <calendar :calendardata="calendardata" @calende="calende" :calend='calend' />
    <findDeptuser :findFlagShow.sync="findFlag" v-on:findAllUser="findAllUser"
                  :findState="findState" :checkState="checkState"></findDeptuser>
    <el-dialog title="转交" :close-on-click-modal="false" :visible.sync="cares" @close="caresss" width="600px">
      <div>
        <ul class="caresli">
          <li></li>
           <li>
             <span> <i style="color:red;padding-right: 5px">*</i>转交人员：</span>
             <span @click="selectPeople"><el-button style=" margin-top: 5px;margin-bottom: 5px;" size="mini" type="primary">选择人员</el-button></span>
             <div style="height:35px">
                <el-scrollbar style="height:100%">
                  <span style="margin-top: 3px"><el-tag
                      style="margin-right: 3px;margin-top: 3px;"
                      v-for="(tag,index) in caretags"
                      :key="index"
                      closable
                      @close="tabclose(tag,index)"
                      :type="tag.type">
                      {{tag.name}}
                    </el-tag></span>
             </el-scrollbar>
             </div>
           </li>
          <li>
            <p style=" float: left"> <i style="color:red;padding-right: 5px">*</i>转交理由：</p>
            <el-input style="width: 85%;" type="textarea" :rows="2" maxlength="1000" placeholder="请输入转交理由" v-model="carestextarea">
            </el-input>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="caresss">取 消</el-button>
        <el-button size="medium" type="primary" @click="caresqd">确 定</el-button>
      </span>
    </el-dialog>
     <!-- 弹框-审批记录 -->
   <approval-record
       :approvalRecordShow.sync="approvalRecordShow"
        :approvalRecordObj = "approvalRecordObj">
    </approval-record>
      <findall-deptuserputong  :findFlagShowputong.sync="findFlagputong" v-on:findAllUserputong="findAllUserputong"
            :findUserObjputong="user_numputong === 1 ? findUserObjputong : findUserObjMputong"
            :findStateputong="findStateputong" :checkStateputong="checkStateputong"></findall-deptuserputong>
    <related-approval :examObj="examObj" :relatedExamVisible.sync="relatedExamVisible"></related-approval>
    <cancel-related-approval :examObj="examObj" :cancelRelatedExamVisible.sync="cancelRelatedExamVisible"></cancel-related-approval>
  </div>
</template>
<script>

// 新建日程组件
import calendar from './newcalendar'
// 选择人员
import findDeptuser from "@/components/select_box/findAllDeptUserMultipleNew";
// 选择人员copy的一模一样 先不管
import findallDeptuserputong from "@/components/select_box/findAllDeptUserMultipleNewputong";
// 编辑器
import approvedmemo from "@/components/select_box/approved_memo";
// 编辑器
import approvalpending from "@/components/select_box/approval_pending";
// 文件/目录 审批弹框
import Auditcomponent from './Audit_component';
// 审批记录
import approvalRecord from "@/components/select_box/approvalRecord";
//
import setTypeso from './setTypeso'
import relatedApproval from "@/components/select_box/relatedApproval";
import cancelRelatedApproval from "@/components/select_box/cancelRelatedApproval";
export default {
  props:['itemState','filejlval'],
  components: {
    approvedmemo,
    findDeptuser,
    approvalpending,
    Auditcomponent,
    calendar,
    approvalRecord,
    findallDeptuserputong,
    relatedApproval,//关联审批
    cancelRelatedApproval//取消关联审批
  },
  data () {
    return {
        checkAll: false,
        isIndeterminate: false,
        annex:[],
    client: window.client,
    hasToApprovalList: window.hasToApprovalList || [],
    nameinfo:"我的审批",
    calendardata:{
          u:[],
          c:[],
          p:{}
        },
      fileDate: {
        chemsg:'',
        currentgeneration:'',
        Typesoffinancing:'',
        Typeapproval:'',
        data:{
          index:'',
          row:''
        },
         html2:{
            annex:[]
          }
      },
      Toexamine:'',
      Auditco:false,
      calend:false,
      dataTotalsForApprove:0,
      pageSizeForApprove: 10,
      currentPageForApprove: 1,

      dataTotalsApprovedTotal:0,
      pageSizeApprovedTotal: 10,
      currentPageApprovedTotal: 1,

      dataTotalsApprovedChecking:0,
      pageSizeApprovedChecking: 10,
      currentPageApprovedChecking: 1,

      dataTotalsApprovedFinish:0,
      pageSizeApprovedFinish: 10,
      currentPageApprovedFinish: 1,

      dataTotalsApprovedCancel:0,
      pageSizeApprovedCancel: 10,
      currentPageApprovedCancel: 1,

      dataTotalsCopied:0,
      pageSizeCopied: 10,
      currentPageCopied: 1,

      dataTotalsMySponsorTotal:0,
      pageSizeMySponsorTotal: 10,
      currentPageMySponsorTotal: 1,

      dataTotalsMySponsorFinish:0,
      pageSizeMySponsorFinish: 10,
      currentPageMySponsorFinish: 1,

      dataTotalsMySponsorChecking:0,
      pageSizeMySponsorChecking: 10,
      currentPageMySponsorChecking: 1,

      dataTotalsMySponsorCancel:0,
      pageSizeMySponsorCancel: 10,
      currentPageMySponsorCancel: 1,



      tableDataForApprove:[],
      tableDataCopied:[],
      tableDataMySponsorTotal:[],
      tableDataMySponsorChecking:[],
      tableDataMySponsorFinish:[],
      tableDataMySponsorCancel:[],
      tableDataApprovedTotal:[],
      tableDataApprovedChecking:[],
      tableDataApprovedFinish:[],
      tableDataApprovedCancel:[],

      dataTotalSponsor: 0,
      finishSponsor: 0,
      checkingSponsor :0,
      cancelSponsor : 0,
      activeNameSponsor:'first',
      firstTitle:'0',
      showNewMeeting: false,
      chemsg:"",
      selectedFileList:[],
      selectedFileMeeting:[],
      selectedFileVote:[],
      fileIcon: '@/common/fileIcon/FolderType1.png',
      rowOwner: "",
      caretags: [],
      catItem: "",
      html2: "",
      html2is: "11111111111",
      ischeckState: {},
      carestextarea: '',
      projectName: "",
      projectId:'',
      username: "",
      shagchaunlist03: [],
      mlstat: true,
      senn3: false,
      cares: false,
      states: false,
      wjsh: "",
      token: "",
      userId: "",
      options: [
        {
          value: 0,
          label: "站内信"
        }
        // {
        //   value: 2,
        //   label: "邮件"
        // },
        // {
        //   value: 3,
        //   label: "短信"
        // }
      ],
      value: "",
      uploadDocAddIsShow: false,
      addDoc: false,
      uploadParamData: {
        docSource: 5,
        projId: "",
        parentId: null,
        auditProjectId: null
      },
      success_code: "",
      shagchaun: [],
      xmbh: "",
      xmbh2: "",
      proIdsxiangm: "",
      shagchaunlist: [],
      shagreatlist: [],
      shagreatl: [],

      tableData: [],
      // 关联附件
      radio2: 0,
      value: "",
      typeText: "",
      nameids: [],
      queryDocProjectId:"",
      approveds: "",
      radioId: "",
      dialogVisiblewenj: false,
      dialogVisible7: false,
      approved_memo: "",
      first1: true,
      firststate: false,
      spid: "",
      revocation: false,
      approval2: false,
      audit: true,
      loading: true,
      first2: false,
      review: "",
      Typeapproval:"无",
      currentgeneration:"无",
      Typesoffinancing:"无",
      first3: false,
      first4: false,
      dataTotals: 0,
      data_xz: ["待我审批", "我已审批", "我发起的", "抄送我的"],
      activeName2: "first",
      dialogVisible: false,
      dialogVisible2: false,
      index: "",
      dialogVisible3: false,
      attachmentShow: false,
      commentAttachmentShow: false,
      attachData: [], // 发起审批人的附件集合
      textares: "最多输入400字",
      textaress: "",
      checked: true,
      tableData: [],
      userIds: [],
      currentPage3: 5,
      changes: "",
      userbtns:[],
      changes2: "",
      activeName3: "first",
      multipleSelection: [],
      textareas: "",
      pageSize: 10,
      tabId: "",
      cancel: "",
      approval1: true,
      statearr: [],
      statearr2: [],
      checking: "0",
      completetask:false,
      selewenjian:"",
      statevalue: "",
      finish: "0",
      recallss1s: false,
      queryStates: [],
      askId: "",
      outcome: "",
      handleSizeChangeinfo: "",
      onPageChangeinfo: "",
      pageSizes: [10, 20, 50, 100], //每页显示数量
      currentPage: 1, //当前页
      dataTotal: 0, //总量
      text: "",
      form: {
        sttusCodes: [
          {
            label: "男",
            value: "0",
            selected: "1"
          },
          {
            label: "女",
            value: "1",
            selected: "0"
          }
        ]
      },
      //15号新加内容
      uploadtype: "", //本地上传
      dialogMeeting: false, //关联会议弹框控制
      addMeeting: false, //新增会议
      dialogCvote: false, //关联投票弹框控制
      addCvotebul: false, //新增投票
      //提醒
      selectremind: [
        {
          id: 0,
          name: "不提醒"
        },
        {
          id: 1,
          name: "截止前15分钟"
        },
        {
          id: 2,
          name: "截止前1小时"
        },
        {
          id: 3,
          name: "截止前3小时"
        },
        {
          id: 4,
          name: "截止前1天"
        }
      ],
      //提醒方式
      modelist: [
        {
          id: 0,
          name: "站内信"
          // },
          // {
          //   id: "1",
          //   name: "邮件"
          // },
          // {
          //   id: "2",
          //   name: "短信"
        }
      ],

      ruleForm: {
        region: "",
        type: []
      },
      arrcheck: [],
      shfj: "",
      meetRegion: "",
      meeting: {
        id: "",
        name: "",
        typeName: "",
        pro_time: "",
        list_time: "",
        meetingSite: "",
        remindType: 0, //会议提醒
        remindVay: "", //提醒方式
        pro_remark: "",
        Voterusids: [], //参会人
        copyPerson: [], //抄送会人
        copychaoon: [], //抄送人
        Enclosure: [], //本地附件
        pro_mode: [],
        Relation: [] //关联附件
      },
      metprojectId: "", //单条项目id
      aeurv: [],
      msgObj: {
        pro_name: "",
        pro_state: "",
        pro_time: "",
        list_time: "",
        pro_legal: "",
        pro_person: "",
        remindType: 0,
        pro_mode: [],
        Voterusids: [], //投票人
        copyPerson: [], //列会会人

        Enclosure: [], //本地附件
        Relation: [] //关联附件
      },
      msgObjcopyPerson: [],
      //新增选择人员
      findFlag: false,
      findState: {},
      checkState: {},
      statesss: "",
      zhongnum: "",
      select_type: [], //投票类型
      selectStateList: [], //会议类型
      meetList: [],
      inbs: 0,
      meetcheckList: [],
      meetapprovalId: "", //关联会议id
      meettaskDefKey: "", //关联DefKey
      meetCheckid: [], //选中的关联会议
      QMeeting: false, //取消关联会议bul
      CvoteapprovalId: "",
      CvotetaskDefKey: "",
      isCareOf:"",
      CvotetprojectId: "",
      jincarr: [],
      CvoteList: [], //获取投票下拉列表
      ruleFormnme: "",
      CvoteList_id: "", //下拉选中id投票
      CvoteCheckid: [], //选中的关联投票
      Assd_meeting: [], //已关联会议
      QXgCvote: false, //取消关联提醒
      Assd_Cvote: [],
      Cvoteusids: [],
      CvotePerson: [],
      Enclosuress: [],
      Relationss: [],
      userIdsnewids: [],
      userIdsnew: [], //"参会人员id集合",
      rankUserIdsL: [], //"列会人员id集合",
      rankUserIds: [], //"列会人员id集合",
      meetcist: [],
      copypersons: [], //抄送人id
      typesetList: [], //投票规则选择人员
      shagchaun: [], //"附件id集合"
      projDocIds: [], //关联项目文档id集合
      projectName: "23", //"项目名称",
      projectStage: "33", //"项目阶段名称",
      stageId: "435",//"项目阶段id",


      //新建项目信息的展示与隐藏
      auditormessage: true,
      newmesageproject: false,
      audfujian: true,
      customMsg: {
        name: '',
        industryOne: '',
        industryTwo: '',
        type: '',
        foundingTime: '',
        legalPerson: '',
        telephone: '',
        business: '',
      },
      proMsg: {
        name: '',
        abbreviation: '',
        financingName: '',
        deptName: '',
        startTime: '',
        endTime: '',
        description: '',
        parentProject: ''
      },
      messageObj: {},
      projectMemberInfo: [],
      //底稿归档
      pigeonholemoment: false,
      pigeonholeremark: false,
      // 底稿借阅
      fileBorrow: false,
      prometitle: true,
      radioList: '0',
      jieyuetime: '',
      borrowFileLjieyue: '',
      pigjieduan: '',
      pigbeizhu: '',
      otherxiangm: true,
      proxiangmuwendang: true,
      mescriptshow: true,
      textColor: {
        color: "#ccc"
      },
      findUserObj: [],
      showNewVote: false, // 显示新增会议
      isJumpLogin: false,//是否为通过跳转登录过来的
      jumpLoginApprovalId: '',//通过跳转登录传过来的id
      // 弹框-审批记录
      approvalRecordShow: false,
      approvalRecordObj: {},
      isLocation:false, // 是否定位
      locationData:null, // 定位数据


       remindWay: ['站内信'],
        remindWayGrounp:[{
            label:"站内信",
            value:0
        }],
        formInline:{
            content:'',
            contentMessage:'',
            contentNote:'',
            contentEmial:''
        },
        chack_bule:false,
        contentNote:false,
        contentEmial:false,

        messagefailed:"",
        errorMsg:"",

        colyObj:[],


        deployObjputong: [], //抄送人员
        colyObjputong:[],
        chack_buleputong:false,
        findFlagputong:false,
        findUserObjMputong: [],
        findUserObjputong: [],
        findStateputong: {},
        checkStateputong: {},
        user_numputong: "", //选择人员标识
        annexfujian:[],
        isIndeterminatefujian:false,
         checkAllfujian: false,

         annexfujsecond:[],
        isIndeterminatefujsecond:false,
         checkAllfujsecond: false,
         approvelistArray:[],
         examObj:{},//关联审批，取消关联审批当前数据
         relatedExamVisible: false,//关联审批
         cancelRelatedExamVisible: false,//取消关联审批
    };
  },
  created () {
    this.Toexamine = this.$route.path =='/backlogmatter' || this.$route.path =='/Filepage' ? false:true
    this.token = this.$store.state.loginObject.userToken;
    this.userId = this.$store.state.loginObject.userId;
    this.projectId = this.$store.state.projectMsg.pro_id;
    this.projectMsg = this.$store.state.projectMsg.projectMsg;
    this.requestCode = this.code.codeNum;
    // 消息中心定位
    if(Object.keys(this.$route.query).length != 0) {
      let data = this.$route.query;
      this.isLocation = true;
      this.locationData = data;
      console.log(this.$route.query,'query')
      this.firstTitle = `${data.paneState}`;
      this.content_xzs({name:data.paneState});
    }
  },
  computed: {
    aegrwh: function () {
      var temp = []; //一个新的临时数组
      for (var i = 0; i < this.msgObjcopyPerson.length; i++) {
        if (temp.indexOf(this.msgObjcopyPerson[i]) == -1) {
          temp.push(this.msgObjcopyPerson[i]);
        }
      }
      return temp;
    },
    drg: function () {
      var srr = false;
      if (this.msgObj.remindType > 0) {
        console.log(this.msgObj.pro_mode);
        srr = false;
        // this.msgObj.pro_mode = [0];
        //this.remindstyle = true;
      } else {
        srr = true;
        this.msgObj.pro_mode = [];
      }
      return srr;
    },
    drgs: function () {
      var srr = false;
      if (this.meeting.remindType > 0) {
        //console.log(this.msgObj.pro_mode)
        srr = false;
        // this.meeting.pro_mode = [0];
        //this.remindstyle = true;
      } else {
        srr = true;
        this.meeting.pro_mode = [];
      }
      return srr;
    }
  },
  filters: {
      msg(val){
        var dom = document.createElement('div')
        dom.innerHTML = val
        return val = dom.innerText
      }
  },
  updated(){
    //  this.remarkss()
  },
  mounted () {
    //  this.remarkss()
    // var arr = this.$refs.outsideComponentRef;
    // arr[0].style.borderBottom = "2px solid #0061A9";
    // arr[0].style.color = "#0061A9";
    if(this.client && this.hasToApprovalList.indexOf(this.client) != -1){
      this.isJumpLogin = this.$route.query.isJumpLoginappro != undefined;
      if(this.isJumpLogin){
        this.jumpLoginApprovalId = this.$store.state.jumpLoginApprovalId;
        this.firstTitle = '0';
      }
    }
    this.pending();
    this.getPromptType()
    this.$Business.processStore()
  },
  watch:{
    textdata: {
      handler() {
        if (this.typeText.annex.length == 0) {
          this.isIndeterminate = false;
          this.checkAll = false;
          return
        }
        let checkedCount = this.annex.length;
        let allLen = this.typeText.annex.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < allLen;
        this.checkAll = checkedCount == allLen;
      },
      deep: true
    }
  },
  methods: {
        guanlianshenpi(obj){//关联审批
          this.examObj = obj
          this.relatedExamVisible = true;
        },
        quxiaoguanlianshenpi(obj){//取消关联审批
          this.examObj = obj
          this.cancelRelatedExamVisible = true
        },
       findAllUserputong (data) {
        console.log(data, '2566')
        if(!data || !data.length){
            this.findFlagputong = false;
            this.findStateputong = {};
            this.checkStateputong = {};
            if (this.user_numputong == 1) {
                this.deployObjputong = []
            }
        }
        //  返回的数据分为默认的和其他的选择的，
        let defaultArr = []
        let copyData = []
        console.log(data)
        if (this.user_numputong == 1) {
            this.deployObjputong = data
            console.log(this.deployObjputong, 1);
            if (this.deployObjputong !== "") {
                this.deployObjputong = this.$utils.uniqBy(this.deployObjputong, 'id')
                console.log(this.deployObj, 2);
                this.findFlagputong = false;
                this.findStateputong = {};
                this.checkStateputong = {};
                var chgArr = [];
                for (var i = 0; i < this.deployObjputong.length; i++) {
                    var flag = true;
                    for (var j = 0; j < chgArr.length; j++) {
                    if (this.deployObjputong[i].userId == chgArr[j].userId) {
                        flag = false;
                    };
                    };
                    if (flag) {
                    chgArr.push(this.deployObjputong[i]);
                    };
                };
                this.deployObjputong = chgArr
                console.log();
            }
            this.findUserObjputong = this.deployObjputong
        }
    },
    //  选择抄送人
    optPrinFnputong (num) {
        this.findFlagputong = true;
        this.user_numputong = num;
        console.log(num, 3333, this.deployObj, this.ccObj)
        if (num == 1) {
            this.findStateputong = { state: 0 };
            this.checkStateputong = { state: 2 };
            this.findUserObjputong = this.$utils.cloneDeepArray(this.deployObjputong)

        } else {
            this.findStateputong = { state: 0 };
            this.checkStateputong = { state: 2 };
            this.findUserObjMputong = this.$utils.cloneDeepArray(this.ccObjputong)
        }
    },
      handle_Closeputong (num, ind) {
        this.$refs['attachmentEdit'] && this.$refs['attachmentEdit'].close()
        if (ind == 0) {
            this.deployObjputong.splice(num, 1);
        } else {
            //this.ccObj.splice(num, 1);
        }
    },
    //    checkboxChose(){
    //        console.log(this.remindWay.length)
    //         // if(this.remindWay.length == 0){
    //         //     this.$message.error("通知方式获取失败");
    //         // }

    // 	},
     handleCheckAllChange(val) {
        console.log(val, 2, this.annex)
        //this.annex = val ? this.typeText.annex : [];
        this.annex = val ? this.typeText.annex.map(v => v.fileId) : [];
        console.log(this.annex)
        this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
        console.log(value, 66)
        let checkedCount = value.length;
        console.log(checkedCount)
        this.checkAll = checkedCount === this.typeText.annex.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.typeText.annex.length;
    },
       handleCheckAllChangefujian(val) {
        this.annexfujian = val ? this.approved_memo.attachment.map(v => v.fileId) : [];
        console.log(this.annexfujian)
        this.isIndeterminatefujian = false;
    },
    handleCheckedCitiesChangefujian(value) {
        console.log(value, 66)
        let checkedCount = value.length;
        this.checkAllfujian = checkedCount === this.approved_memo.attachment.length;
        this.isIndeterminatefujian = checkedCount > 0 && checkedCount < this.approved_memo.attachment.length;
    },
    handleCheckAllChangefujsecond(val) {
        console.log(this.approvelistArray)
        this.annexfujsecond = val ? this.approvelistArray[0].map(v => v.fileId) : [];
        console.log(this.annexfujsecond)
        this.isIndeterminatefujsecond  = false;
    },
    handleCheckedCitiesChangefujsecond(value) {
        console.log(value, 66)
        let checkedCount = value.length;
        this.checkAllfujsecond = checkedCount ===this.approvelistArray[0].length;
        this.isIndeterminatefujsecond = checkedCount > 0 && checkedCount < this.approvelistArray[0].length;
    },
    // 获取提醒方式
    getPromptType() {
    this.$post("/sys/getNoticeWayConfig")
        .then(res => {
        if (this.code.codeNum.SUCCESS == res.code) {
            res.data.email == 1 && this.remindWayGrounp.push({label:"邮件",value:1});
            res.data.sms == 1 && this.remindWayGrounp.push({label:"短信",value:2});;
            res.data.email == 1 && this.modelist.push({ name: '邮件', id: 1 });
            res.data.sms == 1 && this.modelist.push({ name: '短信', id: 2 });
            return;
        }
        this.$message.error("通知方式获取失败");
        })
        .catch(err => {
        console.log(err);
        });
    },
    updatalist(){
      this.pending()
      this.$emit('updatas',true)
    },
    filejl(val){
      this.approved(val)
    },
    caresinfo(val){
      this.cares = val
    },
    fileinfo(val){
      this.pending()
    },
    // remarkss(){
    //    Array.from($('.remarkss')).forEach((item)=>{
    //     item.innerText = (item.innerText.trim()).length>=25?item.innerText.substring(0,25)+'...':item.innerText
    //   })
    // },
    handleCloseVote(){
      this.$refs['attachmentVote'] && this.$refs['attachmentVote'].close()
    },
    caresss () {
      this.cares = false
      this.caretags = []
      this.carestextarea = ''
    },
    tabclose (item,index) {
      this.caretags.splice(index,1)
    },
    caresqd () {
      if (this.caretags == '') {
        this.$message.error('请选择转交人员');
        return
      }
      if (this.carestextarea == "") {
        this.$message.error('请输入转交理由');
        return
      }
      var arr = []
      this.caretags.forEach((ele,index)=>{ arr.push(ele.userId)})
      var dataObj = {
        token: this.token,
        userId: this.userId,
        data: {
          userIds: arr,
          context: this.carestextarea,
          taskId: this.taskId,
          projectId: this.catItem.projectId,
          projectName: this.catItem.projectName,
          id: this.catItem.id,
          categoryId: this.catItem.categoryId
        }
      };
      var _this = this;
      this.$post("/info/audit/handOver", dataObj)
        .then((response) => {
          if (response.code == 0) {
            _this.$message({
              type: "success",
              message: response.msg
            });
            _this.caretags = ""
            _this.carestextarea = ""
            _this.cares = false
            _this.dialogVisible = false
            _this.pending('', _this.onPageChangeinfo, _this.handleSizeChangeinfo);
             this.$emit('updatas',true)
             this.$emit('updatainfo',true)
             this.Auditco = false
          } else {
            _this.$message({
              type: "error",
              message: response.msg
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    selectPeople () {
      this.findFlag = true
      this.findState = { state: 0 };
      this.checkState = { state: 2 };
      this.ischeckState = { state: 1 }
    },
    yls (item) {
      console.log(item);
      //  this.$router.push({
      //   path: "/preview",
      //   query: {
      //     rfsId: item.rfsId,
      //     docId:item.fileId,
      //     photoType: item.docType
      //   }
      // });
      var previewData = {
        // rfsId: item.rfsId,
        // docId: item.docId,
        projectId: this.queryDocProjectId,
        rfsId: item.rfsId,
        docId: item.fileId,
        photoType: item.docType,
        docName: item.fileName,
        projectName: this.projectName
      };
      this.$store.commit("previewAllFn", previewData);
    },
    xz (ite) {
      // console.log(ite)
      if(this.$store.state.isPC) {
        this.$store.commit("pcOtherDownload",{
          docId: ite.fileId,
          docName: ite.fileName
        });
      }else {
        this.$store.commit("download", [
        {
          id: ite.fileId,
          name: ite.fileName
        }
        ]);
      }
    },
    downLoadFilesaaa () {
        if (this.annex == ""){
            this.$message.error('请选择要下载的数据')
            return
        }
        let uploadData = []
        console.log(this.annex)
        console.log(this.typeText.annex)
        this.annex.forEach(item => {
            this.typeText.annex.forEach(it => {
            if (item == it.fileId && it.delFlag != 1) {
                if (this.$store.state.isPC) {
                    uploadData.push({
                    docId: it.fileId,
                    docName: it.fileName
                });
                } else {
                    uploadData.push({
                    docId: it.fileId,
                    docName: it.fileName
                });
                }
            }
            });
        });
        if(uploadData.length == 1 ){
            if (this.$store.state.isPC) {
                this.$store.commit("pcOtherDownload", {
                    docName : uploadData[0].docName,
                    docId :uploadData[0].docId
                });
            } else {
                this.$store.commit("download", [{
                    docName : uploadData[0].docName,
                    id :uploadData[0].docId
                }]);
            }
        }else{
        var data={
            "random":Math.random(),
            "docIdStr":uploadData.map(v=>v.docId).join(','),
            "zipName": this.xmbh.substring(0,10)+'-审批附件.zip'
            }
        this.$store.commit("export", {url: "/rfs/downloadDocsZip",data: data});
        }
    },
    ipdown (item) {
      console.log(item);
      this.$store.commit("download", [
        {
          id: item.fileId,
          name: item.fileName
        }
      ]);
    },
    //关联会议 在原来基础上写，原有字段未动
    glhy (row) {
      console.log(row)
      this.$utils.getProjectPermPromise(row.projectId).then(res=>{
        this.showNewMeeting = (res && res.findIndex(v => v === 'project_add_mett') > -1)
      })
      this.queryDocProjectId = row.projectId;
      console.log(this.queryDocProjectId);
      if (this.meetCheckid.length > 0) {
        this.meetCheckid = [];
      }
      if (this.meetcheckList.length > 0) {
        // console.log(3);
        this.meetcheckList = [];
        // console.log(this.meetcheckList);
      }
      this.uploadParamData.projId = row.projectId;
      this.meetapprovalId = "";
      this.meettaskDefKey = "";
      this.meetRegion = "";
      this.metprojectId = "";
      this.meetcheckList = [];
      // console.log(row);
      this.meetapprovalId = row.id;
      this.meettaskDefKey = row.taskDefKey;
      this.metprojectId = row.projectId;
      // console.log("334", this.metprojectId);

      this.ObtainmeetLs();
      this.dialogMeeting = true;
    },
    //获取关联会议
    ObtainmeetLs () {
      var dataObj = {
        token: this.token,
        userId: this.userId,
        data: {
          approvalId: this.meetapprovalId
        }
      };
      var that = this;
      this.$post("/info/audit/get_meeting_list", dataObj)
        .then((response) => {
          if (response.code == that.code.codeNum.SUCCESS) {
            // console.log(response);
            that.meetList = response.data;
            // meetList
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    closes () {
      this.$refs['attachment'] && this.$refs['attachment'].close()
      this.xmbh = "";
      this.xmbh2 = "";
      this.typeText = "";
      this.textareas = "";
      this.shagreatlist = [];
      this.shagchaunlist = [];
      this.shagchaunlist03 = [];
      this.Typeapproval = ''
      this.currentgeneration = ''
      this.Typesoffinancing = ''
      this.arrcheck = [];
      this.outcome = "";
      this.changes = { state: 1 }
      this.radioss();
      this.html2 = ""
      this.dialogVisible = false
      this.deployObjputong = []
      this.deployObj = []
      this.isIndeterminate = false
      this.checkAll = false
      this.annex.splice(0)
    },
    //新增会议
    addresMeeting () {
      this.newMeet();
      this.meeting.name = "";
      this.meeting.typeName = "";
      this.meeting.pro_time = "";
      this.meeting.list_time = "";
      this.meeting.meetingSite = "";
      this.meeting.remindType = 0;
      this.meeting.remindVay = "";
      this.meeting.pro_remark = "";
      this.meeting.Enclosure = [];
      this.meeting.Voterusids = []; //参会人
      this.meeting.copyPerson = []; //列会会人
      this.meeting.copychaoon = []; //抄送会人
      this.meeting.Relation = []; //关联附件
      this.selectedFileMeeting = [];
      this.addMeeting = true;
    },
    //关联会议
    RelationMeet () {
      if(this.meetCheckid == ''){
        this.$message.error('请选择会议')
        return
      }
      var dataObj = {
        token: this.token,
        userId: this.userId,
        data: {
          approvalId: this.meetapprovalId,
          taskDefKey: this.meettaskDefKey,
          meetingIds: this.meetCheckid
        }
      };
      var that = this;
      this.$post("/info/audit/relate_approval_meeting", dataObj)
        .then((response) => {
          if (response.code == that.code.codeNum.SUCCESS) {
            // console.log(response);
            that.meetCheckid = [];
            that.meetapprovalId = "";
            that.meettaskDefKey = "";
            that.meetRegion = "";
            that.meetcheckList = [];
            that.dialogMeeting = false;
            that.$emit('updatas',false)
          } else {
            that.$message.error(response.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //取消关联申请
    RelatMeet_x () {
      this.meetcheckList = [];
      this.meetCheckid = [];
      this.dialogMeeting = false;
    },
    //添加会议
    aDDupMeet () {
      var myDate = new Date();
      var _this = this;
      if (this.meeting.name == "") {
        this.$message.error("会议主题内容不能为空");
        return;
      }
      if (this.meeting.typeName == "") {
        this.$message.error("会议类型内容不能为空");
        return;
      }
      if (this.meeting.meetingSite == "") {
        this.$message.error("会议地点不能为空");
        return;
      }
      if (this.meeting.pro_time == "") {
        this.$message.error("会议开始时间不能为空");
        return;
      }
      if (this.meeting.list_time == "") {
        this.$message.error("结束时间不能为空");
        return;
      }
      if (this.meeting.Voterusids == "") {
        this.$message.error("参会人员不能为空")
        return;
      }
      var oDate1 = new Date(this.meeting.pro_time);
      var oDate2 = new Date(this.meeting.list_time);
      if (oDate1.getTime() < myDate.getTime()) {
        this.$message.error("开始时间不能小于当前时间");
        return;
      }
      if (oDate1.getTime() > oDate2.getTime()) {
        this.$message.error("开始时间不能大于结束时间");
        return;
      }
      if (oDate2.getTime() < this.$moment().add(1, "hours")) {
        this.$message.error("结束时间需大于当前时间1小时");
        return;
      }
      //参会人员
      this.meeting.Voterusids.forEach(function (c) {
        if (c.userId) {
          _this.userIdsnewids.push(c.userId);
        }
      });
      //参会人员
      if (this.userIdsnewids !== "") {
        this.userIdsnew = Array.from(new Set(this.userIdsnewids));
      }
      //列会人员
      if (this.meeting.copyPerson !== "") {
        this.meeting.copyPerson.forEach(function (c) {
          if (c.userId) {
            _this.rankUserIdsL.push(c.userId);
          }
        });
      }
      if (this.rankUserIdsL !== "") {
        this.rankUserIds = Array.from(new Set(this.rankUserIdsL));
      }
      //抄送人ids

      if (this.meeting.copychaoon !== "") {
        this.meeting.copychaoon.forEach(function (c) {
          if (c.userId) {
            _this.copypersons.push(c.userId);
          }
        });
      }
      if (this.copypersons !== "") {
        this.copypersons = Array.from(new Set(this.copypersons));
      }

      //本地附件上传
      if (this.meeting.Enclosure !== "") {
        this.meeting.Enclosure.forEach(function (c) {
          if (c.id) {
            _this.shagchaun.push(c.id);
          }
        });
      }
      if (this.shagchaun !== "") {
        this.shagchaun = Array.from(new Set(this.shagchaun));
      }
      //关联
      if (this.meeting.Relation !== "") {
        this.meeting.Relation.forEach(function (c) {
          if (c.id) {
            _this.projDocIds.push(c.id);
          }
        });
      }
      if (this.projDocIds !== "") {
        this.projDocIds = Array.from(new Set(this.projDocIds));
      }

      if(this.$store.state.isUpload) {
        this.$message.warning('有文件正在上传，请稍后操作')
        return;
      }

      let localAttach = []
      let projectRelev = []

      this.selectedFileMeeting.forEach(v=>{
        v.addSource===1 ? localAttach.push(v.docId) : projectRelev.push(v.docId)
      })


      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          approvalId: this.meetapprovalId, //"审批id",
          taskDefKey: this.meettaskDefKey, //"审批节点id",
          projectId: this.metprojectId,
          name: this.meeting.name, // "会议主题",
          typeId: this.meeting.typeName,
          site: this.meeting.meetingSite, // "会议地点（数据字典表code)",
          remindType: this.meeting.remindType, //提醒类型（0:不提醒/1:截止前15分钟/2截止前1小时/3:截止前3小时/4:截止前1天)"
          remindVay: this.meeting.pro_mode.join(","), //"站内信,邮件,短信"
          projectName: this.projectName, //"项目名称"this.projectMsg.name
          projectStage: this.projectStage, // "项目阶段名称"
          stageId: this.stageId, //"项目阶段id"
          startTime: this.meeting.pro_time, //开始时间
          endTime: this.meeting.list_time, //结束时间
          userIds: this.userIdsnew, //"参会人员id集合",
          rankUserIds: this.rankUserIds, //"列会人员id集合",
          docIds: localAttach, //"附件id集合"
          projectDocIds: projectRelev, //关联项目文档id集合
          copyerUserIds: this.copypersons //抄送人员id集合
        }
      };

      this.$post("/info/audit/add_approval_meeting", data)
        .then((response) => {
          // console.log(response);
          if (response.code == _this.code.codeNum.SUCCESS) {
            _this.$message({
              type: "success",
              message: response.msg
            });
            _this.ObtainmeetLs();
            _this.meeting.name = ""; // "会议主题",
            _this.meeting.typeName = "";
            _this.meeting.meetingSite = ""; // "会议地点（数据字典表code)",
            _this.meeting.remindType = 0; //提醒类型（0:不提醒/1:截止前15分钟/2截止前1小时/3:截止前3小时/4:截止前1天)"
            _this.meeting.pro_mode = []; //"站内信,邮件,短信"
            _this.projectName = ""; //"项目名称"this.projectMsg.name
            _this.meeting.pro_time = ""; //开始时间
            _this.meeting.list_time = ""; //结束时间
            _this.userIdsnew = []; //"参会人员id集合",
            _this.rankUserIds = []; //"列会人员id集合",
            _this.shagchaun = []; //"附件id集合"
            _this.projDocIds = []; //关联项目文档id集合
            _this.copypersons = []; //抄送人员id集合
            _this.meeting.Relation = [];
            _this.meeting.Enclosure = [];
            _this.meeting.Voterusids = [];
            _this.userIdsnewids = [];
            _this.rankUserIdsL = [];
            _this.meeting.copychaoon = [];

            _this.addMeeting = false;
            _this.dialogMeeting = false;
            _this.$emit('updatas',false)
          } else {
            _this.$message.error(response.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //取消会议
    cancelMeet () {
      this.$refs['attachmentMeeting'] && this.$refs['attachmentMeeting'].close()
      this.meeting.name = "";
      this.meeting.typeName = "";
      this.meeting.pro_time = "";
      this.meeting.list_time = "";
      this.meeting.meetingSite = "";
      this.meeting.remindType = 0;
      this.meeting.remindVay = "";
      this.meeting.pro_remark = "";
      this.meeting.Enclosure = [];
      this.meeting.Voterusids = []; //参会人
      this.meeting.copyPerson = []; //列会会人
      this.meeting.copychaoon = []; //抄送会人
      this.meeting.Relation = []; //关联附件
      this.addMeeting = false;
      this.dialogMeeting = false;
      this.deployObjputong = [];
    },
    //查询已关联会议
    QMeet (row) {
      console.log(row);
      this.meetapprovalId = row.id;
      this.meettaskDefKey = row.taskDefKey;

      this.QMeeting = true;
      this.QMEet();
    },
    QMEet () {
      var dataObj = {
        token: this.token,
        userId: this.userId,
        data: {
          approvalId: this.meetapprovalId
        }
      };
      var that = this;
      this.$post("/info/audit/get_related_meeting_list", dataObj)
        .then((response) => {
          if (response.code == that.code.codeNum.SUCCESS) {
            that.Assd_meeting = response.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 单挑删除会议
    haQMeet (va) {
      // console.log(va);
      var _this = this;
      this.$confirm("是否取消该关联", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var data = {
            token: _this.token,
            userId: _this.userId,
            data: {
              approvalId: va.approvalId,
              taskDefKey: va.taskDefKey,
              meetingId: va.meetingId
            }
          };
          _this
            .$post("/info/audit/cancel_approval_meeting", data)
            .then((response) => {
              if (response.code == _this.code.codeNum.SUCCESS) {
                _this.QMEet();
                _this.$message({
                  type: "success",
                  message: "取消成功!"
                });
                _this.$emit('updatas',false)
              } else {
                _this.$message({
                  type: "info",
                  message: "已取消"
                });
              }
              if (_this.Assd_meeting.length == 0) {
                _this.QMeeting = false;
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    //关联投票
    relatedvoting (row) {
      this.queryDocProjectId = row.projectId;
      console.log(this.queryDocProjectId);
      this.CvoteapprovalId = "";
      this.CvotetaskDefKey = "";
      this.CvotetprojectId = "";
      this.CvoteapprovalId = row.id;
      this.CvotetaskDefKey = row.taskDefKey;
      this.CvotetprojectId = row.projectId;
      this.uploadParamData.projId = row.projectId;
      // alert(this.uploadParamData.projId);
      var dataObj = {
        token: this.token,
        userId: this.userId,
        data: {
          name: "",
          approvalId: row.id,
          taskDefKey: row.taskDefKey
        }
      };
      var that = this;
      this.$post("/info/audit/get_vote_list", dataObj)
        .then((response) => {
          if (response.code == that.code.codeNum.SUCCESS) {
            // console.log(response);
            that.CvoteList = response.data;
            that.dialogCvote = true;
            // 获取权限
            this.$utils.getProjectPermPromise(row.projectId).then(res=>{
              this.showNewVote = (res && res.findIndex(v => v === 'project_add_vote') > -1)
              // $utils.checkProjectPermissionAsync(this.queryDocProjectId,'project_add_vote')
            })

          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 根据项目id获取响应的全新
    getProjectPermPromise(projectId) {
      var proObj = {
        'token': JSON.parse(sessionStorage.getItem("userToken")),
        'userId': JSON.parse(sessionStorage.getItem("userId")),
        "projectId": projectId,
        "data": {
          "projectId": projectId
        }
      }

      return post('/info/project/getProjectPerm', proObj).then(
        res => {
          // console.log(55556, res)
          if (res.code !== code.codeNum.SUCCESS) {
            return;
          } else if (!res.data.length) {
            return;
          }
          // console.log(5555, res)
          return res.data
        },
        err => {
          return false
        })
    },


    //审批关联投票
    Relatedvoting () {
      if(this.CvoteList_id == ""){
        this.$message.error('请选择投票')
        return
      }
      var dataObj = {
        token: this.token,
        userId: this.userId,
        data: {
          approvalId: this.CvoteapprovalId,
          taskDefKey: this.CvotetaskDefKey,
          voteId: this.CvoteList_id
        }
      };
      var that = this;
      this.$post("/info/audit/relate_approval_vote", dataObj)
        .then((response) => {
          if (response.code == that.code.codeNum.SUCCESS) {
            // console.log(response);
            that.$message({
              type: "success",
              message: response.msg
            });
            that.dialogCvote = false;
            that.CvoteList_id = ""
            that.ruleFormnme = ""
            that.$emit('updatas',false)
          } else {
            that.$message({
              type: "info",
              message: response.msg
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
     Filepages(item){
         console.log(item)
      this.$router.push({ path:'/Filepage', query: {item:JSON.stringify(item),path:this.$route.path,name:this.nameinfo}});
    },
    //取消审批关联投票
    QxRelate () {
      this.CvoteList_id = "";
      this.ruleFormnme = "";
      this.dialogCvote = false;
    },
    //取消审批关联投票申请
    relatedQp (row) {
      this.CvoteapprovalId = "";
      this.CvotetaskDefKey = "";
      this.CvoteapprovalId = row.id;
      this.CvotetaskDefKey = row.taskDefKey;
      this.QXgCvote = true;
      this.QMEQp();
    },
    //获取已关联列表
    QMEQp () {
      var dataObj = {
        token: this.token,
        userId: this.userId,
        data: {
          approvalId: this.CvoteapprovalId
        }
      };
      var that = this;
      this.$post("/info/audit/get_related_vote_list", dataObj)
        .then((response) => {
          if (response.code == that.code.codeNum.SUCCESS) {
            // console.log(response);
            that.Assd_Cvote = response.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //取消投票关联
    haCvote (va) {
      // console.log(va);
      var _this = this;
      this.$confirm("是否取消该关联投票", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var data = {
            token: _this.token,
            userId: _this.userId,
            data: {
              approvalId: va.approvalId,
              taskDefKey: va.taskDefKey,
              voteId: va.voteId
            }
          };
          _this
            .$post("/info/audit/cancel_approval_vote", data)
            .then((response) => {
              if (response.code == _this.code.codeNum.SUCCESS) {
                // console.log(response);
                _this.QMEQp();
                _this.$message({
                  type: "success",
                  message: "取消成功!"
                });
                if (_this.Assd_Cvote.length <= 0) {
                  _this.QXgCvote = false;
                }
                  _this.$emit('updatas',false)
              } else {
                _this.$message({
                  type: "info",
                  message: "已取消"
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    //增投票
    addCvote () {
      this.typeList();
      // this.typset();
      this.jincarr = [];
      this.msgObj.pro_mode = "";
      this.msgObj.pro_name = "";
      this.msgObj.pro_state = "";
      this.msgObj.pro_time = "";
      this.msgObj.list_time = "";
      this.msgObj.remindType = 0;
      this.msgObj.pro_mode = [];
      this.msgObj.Voterusids = [];
      this.msgObj.copyPerson = [];
      this.msgObj.Enclosure = [];
      this.msgObj.Relation = [];
      this.Cvoteusids = [];
      this.CvotePerson = [];
      this.Enclosuress = [];
      this.Relationss = [];
      this.selectedFileVote=[];
      this.addCvotebul = true;
    },
    //  添加投票接口
    AddVote () {
      var that = this;
      if (this.msgObj.Voterusids == "") {
        this.$message.error("投票人员不能为空");
        return;
      }
      if (this.msgObj.pro_name == "") {
        this.$message.error("投票名称不能为空");
        return;
      }
      if (this.msgObj.pro_state == "") {
        this.$message.error("投票类型不能为空");
        return;
      }
      if (this.msgObj.pro_time == "") {
        this.$message.error("请选择开始时间");
        return;
      }
      if (this.msgObj.list_time == "") {
        this.$message.error("请选择结束时间");
        return;
      }
      let oDate1 = new Date(this.msgObj.pro_time);
      let oDate2 = new Date(this.msgObj.list_time);
      if (oDate1.getTime() > oDate2.getTime()) {
          this.$message.error("开始时间不能大于结束时间");
          return;
      }
          //return
      if (oDate2.getTime() < this.$moment().add(1, "hours")) {
        this.$message.error("结束时间需大于当前时间1小时");
        return;
      }
           
      if (this.msgObj.Voterusids !== "") {
        var deploy = [];
        this.msgObj.Voterusids.forEach(function (c) {
          if (c.userId) {
            deploy.push(c.userId);
          }
        });
        this.Cvoteusids = Array.from(new Set(deploy));
      }
      if (this.msgObj.copyPerson !== "") {
        var deployuse = [];
        this.msgObj.copyPerson.forEach(function (c) {
          if (c.userId) {
            deployuse.push(c.userId);
          }
        });
        this.CvotePerson = Array.from(new Set(deployuse));
      }
      if (this.msgObj.Enclosure !== "") {
        this.msgObj.Enclosure.forEach(function (c) {
          if (c.id) {
            that.Enclosuress.push(c.id);
          }
        });
      }
      if (this.msgObj.Relation !== "") {
        this.msgObj.Relation.forEach(function (c) {
          if (c.id) {
            that.Relationss.push(c.id);
          }
        });
      }
      // console.log(this.msgObj.Relation);
      // console.log(that.Relationss);
      // console.log("334", that.Enclosuress);
      // return;
      // "projectId":0,

      if(this.$store.state.isUpload) {
        this.$message.warning('有文件正在上传，请稍后操作')
        return;
      }

      let localAttach = []
      let projectRelev = []

      this.selectedFileVote.forEach(v=>{
        v.addSource===1 ? localAttach.push(v.docId) : projectRelev.push(v.docId)
      })

      var dataObj = {
        token: this.token,
        userId: this.userId,
        data: {
          approvalId: this.CvoteapprovalId,
          taskDefKey: this.CvotetaskDefKey,
          projId: this.CvotetprojectId,
          typeId: this.msgObj.pro_state,
          name: this.msgObj.pro_name,
          startTime: this.msgObj.pro_time,
          endTime: this.msgObj.list_time,
          remindType: this.msgObj.remindType,
          remindWay: this.msgObj.pro_mode.join(","), //"【0:站内信，1:邮件，2:短信】 拼接：0,1,2",
          voteUser: this.Cvoteusids.join(","),
          localAttach: localAttach.join(","), //"【本地上传文件id】 1,2,3",
          projectRelev: projectRelev.join(","), //"【关联项目文档】 1,2,3",
          carbonUser: this.CvotePerson.join(",") //"【抄送人id】 1,2,3"}}
        }
      };

      this.$post("/info/audit/add_approval_vote", dataObj)
        .then((response) => {
          if (response.code == that.code.codeNum.SUCCESS) {
            // console.log(response);
            that.msgObj.pro_name = "";
            that.msgObj.pro_state = "";
            that.msgObj.pro_time = "";
            that.msgObj.list_time = "";
            that.msgObj.remindType = 0;
            that.msgObj.pro_mode = [];
            that.msgObj.Voterusids = [];
            that.msgObj.copyPerson = [];
            that.msgObj.Enclosure = [];
            that.msgObj.Relation = [];
            that.Cvoteusids = [];
            that.CvotePerson = [];
            that.Enclosuress = [];
            that.Relationss = [];

            that.$message({
              type: "success",
              message: response.msg
            });
            that.addCvotebul = false;
            that.dialogCvote = false;
            that.$emit('updatas',false)
          } else {
            that.$message({
              type: "warning",
              message: response.msg
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //取消投票
    cancelVote () {
      this.$refs['attachmentVote'] && this.$refs['attachmentVote'].close()
      this.addCvotebul = false;
      this.dialogCvote = false;
      this.msgObj.pro_name = "";
      this.msgObj.pro_state = "";
      this.msgObj.pro_time = "";
      this.msgObj.list_time = "";
      this.msgObj.remindType = 0;
      this.msgObj.pro_mode = [];
      this.msgObj.Voterusids = [];
      this.msgObj.copyPerson = [];
      this.msgObj.Enclosure = [];
      this.msgObj.Relation = [];
    },
    //删除本地附件
    deletben (num, v) {
      if (num == 2) {
        this.meeting.Enclosure.splice(v, 1);
      } else {
        this.msgObj.Enclosure.splice(v, 1);
      }
    },
    yulan3 (item) {
      // console.log(item)
      // console.log(item.name.lastIndexOf(''))
      // console.log(item.name.substring(item.name.lastIndexOf('.')+1))
      // this.$router.push({
      //   path: "/preview",
      //   query: {
      // docId:item.id,
      // rfsId:item.rfsId
      //   }
      // });
      var previewData = {
        // rfsId: item.rfsId,
        // docId: item.docId,
        projectId: this.queryDocProjectId,
        docId: item.id,
        rfsId: item.rfsId,
        photoType: item.name.substring(item.name.lastIndexOf(".") + 1),
        docName: item.name,
        projectName: this.projectName
      };
      this.$store.commit("previewAllFn", previewData);
    },
    yulan5 (item) {
      console.log(item);
      // this.$router.push({
      //   path: "/preview",
      //   query: {
      // docId:item.fileId,
      // rfsId:item.rfsId
      //   }
      // });
      // alert(1)
      var previewData = {
        // rfsId: item.rfsId,
        // docId: item.docId,
        projectId: this.queryDocProjectId,
        docId: item.fileId,
        rfsId: item.rfsId,
        photoType: item.docType,
        docName: item.fileName,
        projectName: this.projectName
      };
      this.$store.commit("previewAllFn", previewData);
    },
    // //  新增中介机构
    optPrinFn (num) {
      this.findFlag = true;
      this.zhongnum = num;
      this.findState = { state: 0 };
      this.checkState = { state: 2 };
      if (num == 1) {
        this.findState = { state: 0 };
        this.checkState = { state: 2 };
      } else if (num == 2) {
        this.findState = { state: 0 };
        this.checkState = { state: 2 };
      } else if (num == 7) {
        this.findState = { state: 0 };
        this.checkState = { state: 2 };
      }
      //else if (num == 3) {
      //     this.findState = { state: 0 };
      //     this.checkState = { state: 2 };
      //   } else {
      //     this.findState = { state: 0 };
      //     this.checkState = { state: 2 };
      //   }
    },
    //renyun
    findAllUser (data) {
      console.log('findAllUser',data)
      if(!data || !data.length){
        this.findFlag = false;
        this.findState = {};
        this.checkState = {};
        return
      }
      if (this.ischeckState.state == 1) {
            this.findFlag = false;
            this.findState = {};
            this.checkState = {};
            var arr = this.caretags.concat(data)
            for (let i=0, len=arr.length; i<len; i++) {
              for (let j=i+1; j<len; j++) {
                  if (arr[i].userId == arr[j].userId) {
                      arr.splice(j, 1);
                      len--;
                      j--;
                  }
              }
          }
          this.caretags = arr
          console.log(arr)
          return
      }
      if (this.zhongnum == 1) {
        //参会人员
        this.aeurv = this.aeurv.concat(data);
        // this.meeting.Voterusids = this.meeting.Voterusids.concat(stty);
        if (this.aeurv !== "") {
          this.meeting.Voterusids = this.$utils.uniqBy(this.aeurv, 'id')
          console.log(this.meeting.Voterusids);
        }
        console.log('Voterusids', this.meeting.Voterusids)
      } else if (this.zhongnum == 2) {
        // 列席人员
        this.meeting.copyPerson = this.meeting.copyPerson.concat(data);
        if (this.meeting.copyPerson !== "") {
          this.meeting.copyPerson = this.$utils.uniqBy(this.meeting.copyPerson, 'id')
        }
      } else if (this.zhongnum == 3) {
        // 投票列席人员
        var that = this;
        // this.msgObjcopyPerson = this.msgObjcopyPerson.concat(data);
        this.msgObj.Voterusids = this.msgObj.Voterusids.concat(data);
        if (this.msgObj.Voterusids.length) {
          this.msgObj.Voterusids = this.$utils.uniqBy(this.msgObj.Voterusids, 'id')
        }
      } else if (this.zhongnum == 4) {
        // 编辑投票列席人员
        this.msgObj.copyPerson = this.msgObj.copyPerson.concat(data);
        if (this.msgObj.copyPerson !== "") {
          this.msgObj.copyPerson = this.$utils.uniqBy(this.msgObj.copyPerson, 'id')
        }
      } else {
        // 会议抄送列席人员
        this.meeting.copychaoon = this.meeting.copychaoon.concat(data);
        if (this.meeting.copychaoon !== "") {
          this.meeting.copychaoon =this.$utils.uniqBy(this.meeting.copychaoon, 'id')
        }
      }
      this.findUserObj = data
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
    //投票规则提示
    typset () {
      var dataObj = {
        token: this.token,
        userId: this.userId,
        data: {
          approvalId: this.CvoteapprovalId,
          taskDefKey: this.CvotetaskDefKey
        }
      };
      var that = this;
      this.$post("/info/audit/get_vote_rule", dataObj)
        .then((response) => {
          that.typesetList = JSON.parse(response.data.limitation);
          // console.log(that.typesetList);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //新增会议查询配置
    newMeet () {
      var data = {
        token: this.token,
        userId: this.userId,
        pageNo: 0,
        pageSize: 100,
        data: {}
      };
      var _this = this;
      this.$post("/info/project/getMeetingConfigAll", data)
        .then((response) => {
          if (response.code == 0) {
            _this.selectStateList = response.data.list;
          } else {
            _this.$message.error(response.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //删除人员
    deletusid (num, v) {
      if (num == 1) {
        this.meeting.Voterusids.splice(v, 1);
      } else if (num == 2) {
        this.meeting.copyPerson.splice(v, 1);
      } else if (num == 3) {
        this.msgObj.Voterusids.splice(v, 1);
      } else if (num == 4) {
        this.msgObj.copyPerson.splice(v, 1);
      } else {
        this.meeting.copychaoon.splice(v, 1);
      }
    },
    delects (item) {
      var arr = this.shagreatlist;
      for (let j = 0; j < arr.length; j++) {
        if (item.id == arr[j].id) {
          arr.splice(j, 1);
          j = j - 1;
        }
      }
      this.shagreatlist = arr;
    },
    delects2 (item) {
      var arr = this.shagchaunlist;
      for (let j = 0; j < arr.length; j++) {
        if (item.id == arr[j].id) {
          arr.splice(j, 1);
          j = j - 1;
        }
      }
      // console.log(arr)
      this.shagchaunlist = arr;
    },

    //本地上传
    uploadingFn (va) {
      this.uploadtype = va;
      // this.uploadParamData.projId=this.xmbh2
      console.log(this.uploadParamData);
      this.addDoc = true;
      this.uploadDocAddIsShow = true;
    },
    sendValueToParentFn () {
      //上传的关闭弹框
      this.addDoc = false;
      this.uploadDocAddIsShow = false;
    },
    //本地上传返回值
    docUploadFn (uploadData) {
      console.log(uploadData);
      if (this.uploadtype == 1) {
        // var shagchaunlist = [];
        // console.log(uploadData)
        // shagchaunlist03
        // shagchaunlist
        console.log();
        this.shagchaunlist03.push({
          id: uploadData.docId,
          rfsId: uploadData.fileData.rfsId,
          name: uploadData.docName
        });
        console.log(this.shagchaunlist03);
      } else if (this.uploadtype == 2) {
        this.meeting.Enclosure.push({
          id: uploadData.docId,
          name: uploadData.docName,
          rfsId: uploadData.fileData.rfsId
        });
        console.log(this.meeting.Enclosure);
      } else {
        this.msgObj.Enclosure.push({
          id: uploadData.docId,
          name: uploadData.docName,
          rfsId: uploadData.fileData.rfsId
        });
        console.log(this.msgObj.Enclosure);
      }
      this.$refs.uploadRef.uploadComplete();
      // this.$refs.uploadRef.destroy()
      //   this.shagchaunlist=shagchaunlist
      // this.addDoc = false;
      // this.uploadDocAddIsShow = false;
    },
    docUploadAllsucess () {
      if (this.uploadtype == 1) {
        this.shagchaunlist = this.shagchaunlist03;
      }
      this.addDoc = false;
      this.uploadDocAddIsShow = false;
    },
    //关联文件上传
    upreat (num) {
      this.$utils
        .checkProjectPermissionAsync(this.queryDocProjectId, "project_file")
        .then(res => {
          if (!res) {
            this.$message.error("无查看项目文档的权限");
            return;
          }
          this.uploadnum = num;
          console.log(this.relafag);
          this.relafag = true;
          console.log(this.relafag);
        });
    },

    delectx (item, index) {
      if (this.userIds.length > 1) {
        Array.prototype.delete = function (delIndex) {
          var temArray = [];
          for (var i = 0; i < this.length; i++) {
            if (i != delIndex) {
              temArray.push(this[i]);
            }
          }
          return temArray;
        };
        var arr = this.userIds;
        this.userIds = arr.delete(index);
        var nameids = this.nameids;
        this.nameids = nameids.delete(index);
      } else {
        this.$message({
          type: "info",
          message: "接收人不能为空"
        });
      }
    },
    async remindSetMessage(){
        let data = {
            "token": this.token,
            "userId": this.userId,
            data:this.nameids.map(Number)// 要提醒的人员id
        }
        var url = "/sys/getUserList";
        var _this = this;
        return await this.$post(url, data).then((response) => {
            _this.messagefailed = response.data;
            _this.errorMsg = "";
            let checkedRemindNames = _this.remindWay;
            for(var i=0; i<_this.messagefailed.length; i++){
                let name = _this.messagefailed[i].name;
                if (!_this.messagefailed[i].email && checkedRemindNames.indexOf("邮件") !=-1) {
                    _this.errorMsg += name + "的邮箱发送失败；";
                }
                if (!_this.messagefailed[i].mobile && checkedRemindNames.indexOf("短信") !=-1) {
                    _this.errorMsg += name + "的短信发送失败；";
                }
            }
            if (_this.errorMsg) {
                let errorMsg = _this.errorMsg + "请在个人信息中完善！其余均发送成功";
                // _this.$message.error(errorMsg);
                return errorMsg;
            }
            return null;

        })
        .catch(function (error) {
        console.log(error);
        });
    },
    dialogVisible9 () {
        this.remindSetMessage().then(res=>{
            console.log(res);
            if (this.value == "") {
                this.value = 1;
            }
                var arr = this.remindWay;
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
                if(this.textaress == "" ){
                    this.$message.error("请填写提醒模版");
                    return
                }

            var data = {
                token: this.$store.state.loginObject.userToken,
                userId: this.$store.state.loginObject.userId,
                data: {
                id: this.spid,
                userIds: this.nameids,
                urgeText: this.textaress,
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
                    _this.dialogVisible2 = false;
                    _this.remindWay = ["站内信"]
                    _this.textaress = "";
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
    dialogVisibleclose(){
        this.dialogVisible2 = false;
        this.remindWay = ["站内信"]
    },
    filejil () {
      this.dialogVisible7 = true;
      var data = {
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId,
        data: {
          approvalId: this.approveds
          // "approvalId": 64,
        }
      };
      var url = "/info/audit/file_record_list ";
      var _this = this;
      this.$post(url, data)
        .then((response) => {
          _this.review = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    search () {
      console.log(this.index);
      this.currentPage = 1;
      if (this.index == "" || this.index == 0) {
        this.pending(this.text);
      } else if (this.index == 1) {
        // queryStates
        console.log(this.queryStates);
        this.finished(this.text, "", "", this.queryStates);
      } else if (this.index == 2) {
        console.log(this.queryStates);
        this.sponsors(this.text, "", "", this.queryStates);
      } else {
        this.Blind(this.text);
      }
    },
    //待审批
    pending (text, currentPage=1, currentPageval=10) {
      // console.log(currentPage);
      // console.log(currentPageval);
      if (text == undefined) {
        text = "";
      }
      let pageNo = currentPage || this.currentPageForApprove
      let pageSize = currentPageval || this.pageSizeForApprove


      if(!this.isJumpLogin){//不是跳转登录
        var data = {
          token: this.$store.state.loginObject.userToken,
          userId: this.$store.state.loginObject.userId,
          pageNo: pageNo,
          pageSize: pageSize,
            sourceName:"我的审批-待我审批", //页面位置，记录日志用
            projectName:this.$store.state.projectMsg.projectMsg.name, //项目名称，记录日志用
          data: {
            projectName: this.text
          }
        };
      } else {
        var data = {
          token: this.$store.state.loginObject.userToken,
          userId: this.$store.state.loginObject.userId,
          pageNo: pageNo,
          pageSize: pageSize,
           sourceName:"我的审批-待我审批", //页面位置，记录日志用
            projectName:this.$store.state.projectMsg.projectMsg.name, //项目名称，记录日志用
          data: {
            projectName: this.text,
            id: this.jumpLoginApprovalId
          }
        }
      }
      var url = "/info/audit/todo_list ";
      var _this = this;
      // this.loading = true;
      this.$post(url, data)
        .then((response) => {
          if(response.code!==0){
            this.$message.error(response.msg)
            return
          }
          _this.tableDataForApprove = response.data.list;
          this.dataTotalsForApprove = response.data.total;
          _this.loading = false;
        })
        .catch( (error)=> {
          this.loading = false;
          console.log(error);
        });
    },
    //已办
    finished (text, currentPage=1, currentPageval=10, queryState) {
      if (text == undefined) {
        text = "";
      }
      if (queryState == undefined) {
        queryState = [];
      }
      let pageNo = currentPage
      let pageSize = currentPageval

      if(!queryState||!queryState.length){
        pageNo = this.currentPageApprovedTotal;
        pageSize = this.pageSizeApprovedTotal;
      } else if(this.tabId==='1'){
        pageNo = this.currentPageApprovedFinish;
        pageSize = this.pageSizeApprovedFinish;
      }else if(this.tabId==='2'){
        pageNo = this.currentPageApprovedChecking;
        pageSize = this.pageSizeApprovedChecking;
      }else if(this.tabId==='3'){
        pageNo = this.currentPageApprovedCancel;
        pageSize = this.pageSizeApprovedCancel;
      }


      var data = {
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId,
        pageNo: pageNo,
        pageSize: pageSize,
        sourceName:"我的审批-我已审批", //页面位置，记录日志用
        projectName:this.$store.state.projectMsg.projectMsg.name, //项目名称，记录日志用
        data: {
          projectName: this.text,
          queryState: queryState
        }
      };
      var url = "/info/audit/completed_list";
      var _this = this;
      // this.loading = true;
      this.$post(url, data)
        .then((response) => {
          this.loading = false;
          if(response.code!==0){
            this.$message.error(response.msg)
            return
          }
          // _this.tableData = response.data.data.list;
          // _this.dataTotals = response.data.data.total;

          if(!queryState||!queryState.length){
            _this.tableDataApprovedTotal = response.data.data.list;
            this.dataTotalsApprovedTotal = response.data.data.total;
          } else if(this.tabId==='1'){
            _this.tableDataApprovedFinish = response.data.data.list;
            this.dataTotalsApprovedFinish = response.data.data.total;
          }else if(this.tabId==='2'){
            _this.tableDataApprovedChecking = response.data.data.list;
            this.dataTotalsApprovedChecking = response.data.data.total;
          }else if(this.tabId==='3'){
            _this.tableDataApprovedCancel = response.data.data.list;
            this.dataTotalsApprovedCancel = response.data.data.total;
          }
          _this.dataTotal = response.data.total;
          _this.finish = response.data.finish;
          _this.checking = response.data.checking;
          _this.cancel = response.data.cancel;
          // _this.loading = false;
        })
        .catch( (error)=> {
          this.loading = false;
          console.log(error);
        });
    },
    yulan (item) {
      console.log(item);
      this.$store.commit("previewAllFn", { rfsId: item.rfsId });
      // this.$router.push({
      //   path: "/preview",
      //   query: {
      //     rfsId: item.rfsId
      //   }
      // });
    },
    //发起
    sponsors (text, currentPage=1, currentPageval=10, queryState) {
      if (text == undefined) {
        text = "";
      }
      if (queryState == undefined) {
        queryState = [];
      }
      let pageNo = currentPage
      let pageSize = currentPageval

      if(!queryState||!queryState.length){
        pageNo = this.currentPageMySponsorTotal;
        pageSize = this.pageSizeMySponsorTotal;
      } else if(this.tabId==='1'){
        pageNo = this.currentPageMySponsorFinish;
        pageSize = this.pageSizeMySponsorFinish;
      }else if(this.tabId==='2'){
        pageNo = this.currentPageMySponsorChecking;
        pageSize = this.pageSizeMySponsorChecking;
      }else if(this.tabId==='3'){
        pageNo = this.currentPageMySponsorCancel;
        pageSize = this.pageSizeMySponsorCancel;
      }



      var data = {
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId,
        pageNo: pageNo,
        pageSize: pageSize,
        sourceName:"我的审批-我发起的", //页面位置，记录日志用
        projectName:this.$store.state.projectMsg.projectMsg.name, //项目名称，记录日志用
        data: {
          projectName: this.text,
          queryState: queryState
        }
      };
      // this.loading = true
      var url = "/info/audit/my_apply_list";
      var _this = this;
      this.$post(url, data)
        .then((response) => {
          _this.loading = false;
          if(response.code!==0){
            this.$message.error(response.msg)
            return
          }

          if(!queryState||!queryState.length){
            _this.tableDataMySponsorTotal = response.data.data.list;
            this.dataTotalsMySponsorTotal = response.data.data.total;
          } else if(this.tabId==='1'){
            _this.tableDataMySponsorFinish = response.data.data.list;
            this.dataTotalsMySponsorFinish = response.data.data.total;
          }else if(this.tabId==='2'){
            _this.tableDataMySponsorChecking = response.data.data.list;
            this.dataTotalsMySponsorChecking = response.data.data.total;
          }else if(this.tabId==='3'){
            _this.tableDataMySponsorCancel = response.data.data.list;
            this.dataTotalsMySponsorCancel = response.data.data.total;
          }



          // _this.tableData = response.data.data.list;
          // _this.dataTotals = response.data.data.total;
          // _this.tableDataMySponsor = response.data.data.list;
          // this.dataTotalsMySponsor = response.data.data.total
          _this.dataTotalSponsor = response.data.total;
          _this.finishSponsor = response.data.finish;
          _this.checkingSponsor = response.data.checking;
          _this.cancelSponsor = response.data.cancel;

        })
        .catch( (error)=> {
          this.loading = false;
          console.log(error);
        });
    },
    // 抄送
    Blind (text, currentPage=1, currentPageval=10) {
      if (text == undefined) {
        text = "";
      }
      let pageNo=currentPage || this.currentPageCopied
      let pageSize=currentPageval|| this.pageSizeCopied
      var data = {
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId,
        pageNo: pageNo,
        pageSize: pageSize,
        sourceName:"我的审批-抄送我的", //页面位置，记录日志用
        projectName:this.$store.state.projectMsg.projectMsg.name, //项目名称，记录日志用
        data: {
          projectName: this.text
        }
      };
      var url = "/info/audit/my_carbon_copy_list";
      var _this = this;
      // this.loading = true
      this.$post(url, data)
        .then((response) => {
          this.loading = false
          if(response.code!==0){
            this.$message.error(response.msg)
            return
          }
          // _this.tableData = response.data.list;
          // _this.dataTotals = response.data.total;
          _this.tableDataCopied = response.data.list;
          this.dataTotalsCopied = response.data.total;
          // _this.loading = false;
        })
        .catch( (error)=> {
          this.loading=false
          console.log(error);
        });
    },
    content_xzs (tab) {
      let index=Number(tab.name)
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
      this.index = index;
      // this.currentPage = 1;
      this.activeName3 = "first";
      this.handleSizeChangeinfo = ""
      // this.pageSize = 10
      if (index == 0) {
        // alert(1)
        this.pageSizeForApprove = 10
        this.currentPageForApprove = this.isLocation?this.locationData.pageNo:1
        this.first1 = true;
        this.first2 = false;
        this.first3 = false;
        this.first4 = false;
        this.firststate = false;
        this.revocation = false;
        this.audit = true;
        this.pending();
        this.approval1 = true;
        this.approval2 = false;
        this.recallss1s = false;
        this.pageSize = 10;
      } else if (index == 1) {
        this.pageSizeApprovedFinish = 10
        this.currentPageApprovedFinish = 1
        this.first1 = true;
        this.revocation = false;
        this.audit = true;
        this.firststate = true;
        this.finished();
        this.approval1 = false;
        this.approval2 = false;
        this.recallss1s = false;
        this.pageSize = 10;
      } else if (index == 2) {
        // alert(1)
        this.pageSizeMySponsorTotal = 10
        this.currentPageMySponsorTotal = this.isLocation?this.locationData.pageNo:1;
        this.recallss1s = true;
        this.first1 = true;
        this.revocation = true;
        this.firststate = true;
        this.audit = false;
        this.sponsors();
        this.approval1 = false;
        this.approval2 = true;
        this.pageSize = 10;
      } else if (index == 3) {
        this.pageSizeCopied = 10
        this.currentPageCopied = this.isLocation?this.locationData.pageNo:1;
        this.first1 = true;
        this.revocation = false;
        this.firststate = false;
        this.audit = true;
        this.Blind();
        this.approval1 = false;
        this.approval2 = false;
        this.recallss1s = false;
        this.pageSize = 10;
      }
      this.isLocation = false;
    },
    close3 () {
      this.dialogVisible3 = false;
      this.isIndeterminatefujian = false
      this.checkAllfujian = false
      this.checkAllfujsecond = false
      this.isIndeterminatefujsecond = false
      this.annexfujian.splice(0)
      this.annexfujsecond.splice(0)
      this.approvelistArray.splice(0)
      this.changes2 = { state: 1 }
    },
    sponsor () {
      this.$router.push("/sponsor");
    },
    handleClick (tab) {
      var tabId = tab.$vnode.componentInstance.index;
      this.tabId = tabId;
      this.currentPage = 1;
      // console.log(this.tabId, this.index)
      if (this.index == "" || this.index == 0) {
        this.recallss1s = false;
      } else if (this.index == 1) { // 我已审批
        // this.recallss1s = false;
        this.approval1 = false;
        if (tabId == 0) {
          this.queryStates = [];
          this.finished();
          this.pageSize = 10;
        } else if (tabId == 1) {
          var queryState = [0, 2, 5, 6];
          this.queryStates = queryState;
          this.finished("", "", "", queryState);
          this.pageSize = 10;
        } else if (tabId == 2) {
          var queryState = [1];
          this.queryStates = queryState;
          this.finished("", "", "", queryState);
          this.pageSize = 10;
        } else {
          var queryState = [3];
          this.queryStates = queryState;
          this.finished("", "", "", queryState);
          this.pageSize = 10;
        }
      } else if (this.index == 2) { // 我发起的
        if (tabId == 0) {
          this.queryStates = [];
          this.sponsors();
          this.pageSize = 10;
          // this.recallss1s = false;
        } else if (tabId == 1) {
          var queryState = [0, 2, 5, 6];
          this.queryStates = queryState;
          this.sponsors("", "", "", queryState);
          this.pageSize = 10;
          // this.recallss1s = false;
        } else if (tabId == 2) {
          var queryState = [1];
          // this.recallss1s = true;
          //  this.recallss1s = false;
          this.pageSize = 10;
          this.queryStates = queryState;
          this.sponsors("", "", "", queryState);
        } else {
          var queryState = [3];
          this.queryStates = queryState;
          this.pageSize = 10;
          this.sponsors("", "", "", queryState);
          // this.recallss1s = false;
        }
      }
    },

    //审核弹窗
    handleEdit (index, row) {
      console.log('row', row, row.approvalType)
      this.newmesageproject = false
      this.selewenjian = row.categoryName
      this.chemsg = row.username
      if (row.owner == null || row.owner == "") {
        this.rowOwner = true
      } else {
        this.rowOwner = false
      }
      this.projectId = row.projectId;
      this.projectName = row.projectName
      this.selectedFileList = [];
      this.Typeapproval = row.categoryName == "" || row.categoryName == null ? '无':row.categoryName
      this.currentgeneration = row.financingTypeName == ""|| row.financingTypeName == null || row.categoryId == 1 ?'无':row.financingTypeName
      this.Typesoffinancing = row.projectStageName == "" || row.projectStageName == null ? '无':row.projectStageName
      this.catItem = row
      if (row.approvalType == 3) {
        this.pigeonholemoment = false;
        this.pigeonholeremark = false;
        this.mlstat = false;
      } else {
        this.mlstat = true;
      }
      if (row.approvalType == 2) {
        this.auditormessage = true;
        this.newmesageproject = false;
        this.audfujian = true;
        this.prometitle = true;
        this.proxiangmuwendang = true
        this.mescriptshow = true;
        this.pigeonholemoment = false;
        this.pigeonholeremark = false;
        this.fileBorrow = false;
      }
      if (row.approvalType == 5) {
        this.auditormessage = true
        this.audfujian = true
      }
      //底稿借阅审核
      if (row.approvalType == 9) {
        this.fileBorrow = true;
        this.auditormessage = false;
        this.prometitle = false;
        this.newmesageproject = false;
        this.states = false;
        this.audfujian = false;
        this.proxiangmuwendang = true
        this.mescriptshow = true;
        var dataObj = {
          "token": this.token,
          "userId": this.userId,
          "data": { "id": row.id }
        };
        var that = this;
        this.$post("/info/audit/getDocPaperBorrowingByApproveId", dataObj).then((response => {
          var data = response.data;
          console.log(data)
          if (data == undefined) {
            return
          } else {
            if (response.code == that.code.codeNum.SUCCESS) {
              that.radioList = data.type;
              that.jieyuetime = data.borrowingTime + "小时";
              that.borrowFileLjieyue = data
              // that.proMsg.name = data.name;
              // that.proMsg.abbreviation = data.abbreviation;
              // that.proMsg.financingName = data.financingName;

            } else if (response.code == that.code.codeNum.SYSTEM_ERROR) {
              that.$message(response.msg);
            } else if (response.code == that.code.codeNum.PROJECT_NOT_EXIST) {
              that.$message(response.msg);
            }
          }
        })).catch(error => {
          console.log(error);
        });
      }
      //底稿归档的审核
      if (row.approvalType == 8) {
        this.prometitle = true;
        this.auditormessage = true;
        this.pigeonholemoment = true;
        this.pigeonholeremark = true;
        this.otherxiangm = false;
        this.audfujian = false;
        this.proxiangmuwendang = true
        this.mescriptshow = true;
        this.newmesageproject = false;
        this.fileBorrow = false;
        var dataObj = {
          "token": this.token,
          "userId": this.userId,
          "data": { "id": row.id }
        };
        var that = this;
        this.$post("/info/audit/getSealUpStageByApproveId", dataObj).then((response => {
          var data = response.data;
          console.log(data)
          if (response.code == that.code.codeNum.SUCCESS) {
            that.pigjieduan = data.stageName;
            that.pigbeizhu = data.sealDescribe;

          } else if (response.code == that.code.codeNum.SYSTEM_ERROR) {
            that.$message(response.msg);
          } else if (response.code == that.code.codeNum.PROJECT_NOT_EXIST) {
            that.$message(response.msg);
          }
        })).catch(error => {
          console.log(error);
        });
      }
      // 新建项目信息的审核
      if (row.approvalType == 7) {
        this.auditormessage = false;
        this.newmesageproject = true;
        this.audfujian = false;
        this.fileBorrow = false;
        this.proxiangmuwendang = false
        this.mescriptshow = false;
        //   项目信息
        this.proMsg = {};
        var dataObj = {
          "token": this.token,
          "projectId": row.projectId,
          "userId": this.userId,
          "data": { "id": row.projectId, "isApprove": false }
        };
        var that = this;
        this.$post("/info/project/getProjectDetail", dataObj).then((response => {
          var data = response.data;
          console.log(data)
          if (response.code == that.code.codeNum.SUCCESS) {
            that.proMsg.code = data.code;
            that.proMsg.name = data.name;
            that.proMsg.abbreviation = data.abbreviation;
            that.proMsg.financingName = data.financingName;
            that.proMsg.deptName = data.deptName;
            that.proMsg.startTime = data.startTime;
            that.proMsg.endTime = data.endTime;
            that.proMsg.description = data.description;
            that.proMsg.parentProject = data.linkProjectName;
            that.projectMemberInfo = data.projectMemberInfo; //团队信息
            that.messageObj = data.organInfo; //中介机构
            //that.departFormId = data.deptId;
            if (that.$utils.m('customer_manage') && data.crmId != null) {
              that.interFn(data.crmId);
            }
            // that.interFn(data.crmId);
          } else if (response.code == that.code.codeNum.SYSTEM_ERROR) {
            that.$message(response.msg);
          } else if (response.code == that.code.codeNum.PROJECT_NOT_EXIST) {
            that.$message(response.msg);
          }
        })).catch(error => {
          console.log(error);
        });
      }


      var stat = row.categoryId;
      this.statesss = row.categoryId;
      if (stat == 2) {
        this.wjsh = "待审文件";
        this.states = true;
        this.senn3 = true;
      } else if (stat == 3) {
        this.wjsh = "待审目录";
        this.states = true;
        this.senn3 = false;
      } else {
        this.states = false;
        this.senn3 = false;
      }
      // this.dialogVisible=true
      console.log(row);
      this.xmbh = row.projectName;
      this.xmbh2 = row.code;
      this.proIdsxiangm = row.projectId
      this.uploadParamData.projId = row.projectId;
      this.approveds = row.id;
      this.queryDocProjectId = row.projectId;
      // console.log(this.getProjectId)
      // this.taskIdis = ro
      this.taskId = row.taskId;
      console.log(this.uploadParamData);
      var dataObj = {
        token: this.token,
        userId: this.userId,
        data: {
          taskId: row.taskId
        }
      };
      var that = this;
      this.$post("/info/audit/check_approval", dataObj).then(function (response) {
        if (response.code == that.code.codeNum.SUCCESS) {
          that.shenhe(row.approvalType);
          console.log('？---', stat)
          if(stat == 2 || stat == 10 || stat == 3 || stat == 11){
            that.Auditco = true
            that.dialogVisible = false
          }else{
            that.dialogVisible = true
            that.Auditco = false
          }
        } else {
          that.$message.error(response.msg)
          return
        }
      });
      this.queryApprovalFiles(row,true)
      this.fileDate = {
        chemsg:this.chemsg,
        currentgeneration:this.currentgeneration,
        Typesoffinancing:this.Typesoffinancing,
        Typeapproval:this.Typeapproval,
        data:{
          index:index,
          row:row
        }
      }
    },
    ogVisible(val){
           if(val.data != undefined){
             if(val.data != 1){
                this.catItem = val.data
                this.catItem.submiter.originData = true
                this.catItem.submiter.uniqueKey = "user" + this.catItem.submiter.id
                this.catItem.submiter.userId =  this.catItem.submiter.id
                  // 发起人
                  this.calendardata.u=[this.catItem.submiter]
                  // 抄送人
                  this.calendardata.c= [{
                    userId:this.$store.state.loginObject.userId,
                    name:this.$store.state.loginObject.userName,
                    uniqueKey:"user" + this.$store.state.loginObject.userId,
                    originData:true,  //  默认
                    num:Math.random()
                  }]
                  // 项目信息
                  this.calendardata.p={
                    p:this.catItem.projectId,
                    n:this.catItem.projectName,
                  }
             }
                this.Auditco = val.s
                this.calend = val.d
           }
    },
    calende(val){
      this.calend = val.s
    },
    //客户信息
    interFn (val) {
      //  if(!that.$utils.m('customer_manage') || data.crmId == null){
      //      return
      // }
      console.log(val)
      console.log(val)
      var crmObj = {
        "token": this.token,
        "userId": this.userId,
        "data": {
          "id": val
        }
      };
      var that = this;
      this.$post("/info/crm/companyCustomer", crmObj).then((response => {
        var data = response.data;
        if (response.code == that.code.codeNum.SUCCESS) {
          //that.editData = data;
          console.log(data)
          that.customMsg.name = data.name;
          that.customMsg.industryOne = data.industryOne;
          //that.customMsg.industryTwo = data.industryTwo;
          that.customMsg.type = data.typeName;
          that.customMsg.foundingTime = data.foundingTime;
          that.customMsg.legalPerson = data.legalPerson;
          that.customMsg.telephone = data.telephone;
          that.customMsg.business = data.business;
        } else {
          that.$message(response.msg);
        }
      })).catch(error => {
        console.log(error);
      });
    },
    //审核跳转
    shenhe (num) {
      // if (row.approvalType == 1) {
      // if (num != 3) {
      // this.dialogVisible = true;
      var data = {
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId,
        data: {
          taskId: this.taskId
        }
      };
      var url = "/info/audit/approval_btn_list ";
      var _this = this;
      this.$post(url, data)
        .then((response) => {
          let vm = this
          this.radioId = setTypeso(vm, response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
      var datas = {
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId,
        data: {
          taskId: this.taskId
        }
      };
      var urls = "/info/audit/form_attachment";
      var _this = this;
      this.$post(urls, datas)
        .then((response) => {
          _this.html2 = response.data.remarks
          _this.isCareOf = response.data.isCareOf
          _this.typeText = response.data;
          if(this.typeText.annex && this.typeText.annex.length){
            this.typeText.annex.forEach(v=>{
              v.docName = v.fileName
              v.docId = v.fileId
            })
          }
          _this.colyObjputong = response.data.carbonCopy
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    value1 (item, index, el) {
      var arr = this.$refs.value1,
        index;
      for (var i = 0; i < arr.length; i++) {
        if (i == index) {
          this.statevalue = arr[i].children[0].value;
          if (this.arrcheck != "") {
            var array = this.arrcheck;
            var a = true;
            for (let j = 0; j < array.length; j++) {
              if (array[j].id == item.id) {
                array[j].state = 2;
                a = false;
              }
            }
            if (a) {
              var arrs = {
                id: item.id,
                fileId: item.fileId,
                state: this.statevalue
              };
              this.arrcheck.push(arrs);
            }
          } else {
            var arrs = {
              id: item.id,
              fileId: item.fileId,
              state: this.statevalue
            };
            this.arrcheck.push(arrs);
          }
        }
      }
      console.log(this.arrcheck);
    },
    value2 (item, index) {
      var arr = this.$refs.value1,
        index;
      for (var i = 0; i < arr.length; i++) {
        if (i == index) {
          this.statevalue = arr[i].children[1].value;
          if (this.arrcheck != "") {
            var array = this.arrcheck;
            var a = true;
            for (let j = 0; j < array.length; j++) {
              if (array[j].id == item.id) {
                array[j].state = 1;
                a = false;
              }
            }
            if (a) {
              var arrs = {
                id: item.id,
                fileId: item.fileId,
                state: this.statevalue
              };
              this.arrcheck.push(arrs);
            }
          } else {
            var arrs = {
              id: item.id,
              fileId: item.fileId,
              state: this.statevalue
            };
            this.arrcheck.push(arrs);
          }
        }
      }
      console.log(this.arrcheck);
    },
    radioss () {
      var array = this.$refs.radios;
      for (let i = 0; i < array.length; i++) {
        array[i].checked = false;
      }
    },
    record (item, index) {
      var arr = this.radioId;
      for (let i = 0; i < arr.length; i++) {
        if (index == i) {
          this.outcome = arr[i].value;
        }
      }
      console.log(this.outcome);
    },
    //审核提交
    dialogVisibles () {
      // console.log(this.statearr);
      if (this.outcome == "") {
        this.$message({
          type: "warning",
          message: "请选择审批结果"
        });
        return;
      }

      var news = this.shagchaunlist.concat(this.shagreatlist);


      var newarr = [];
      for (let i = 0; i < news.length; i++) {
        newarr.push(news[i].id);
      }
      var array = this.statearr;
      console.log(array);
      var flagarr = [];
      for (let i = 0; i < array.length; i++) {
        if (array[i].state == 2) {
          flagarr.push(array[i].state);
        }
      }
      var lslength = this.typeText.attachment.length;
      console.log(this.outcome);
      // if (lslength != 0) {
      //   if (lslength == this.statearr.length) {
      //     if (this.outcome == "yes") {
      //       this.$message({
      //         type: "warning",
      //         message: "当前附件都是未通过"
      //       });
      //       return;
      //     }
      //   }
      // }
      // console.log(num)
      // if()
      // var rearr= []
      // var isarr=this.arrcheck
      // for (let i = 0; i < isarr.length; i++) {
      //   console.log(isarr[i])
      // }
      var arrinfos = []
      this.typeText.attachment.forEach(ele=>{
        if(ele.approvalStatus != "已驳回"){
           arrinfos.push(ele)
        }
      })
      console.log(arrinfos)
      if (arrinfos.length != this.arrcheck.length) {
        var tipmuli = "";
        if (this.statesss == 2) {
          tipmuli = "您有未审批文件，请全部审批";
        } else if (this.statesss == 3) {
          tipmuli = "请审批目录";
        }
        this.$message({
          type: "warning",
          message: tipmuli
        });
        return;
      }
      if (this.statesss == 2 || this.statesss == 3) {
        if (this.arrcheck == "") {
          var tipmuli = "";
          if (this.statesss == 2) {
            tipmuli = "您有未审批文件，请全部审批";
          } else if (this.statesss == 3) {
            tipmuli = "请审批目录";
          }
          this.$message({
            type: "warning",
            message: tipmuli
          });
          return;
        }
        var num = [];
        var arr = this.arrcheck; ///22222
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].state == 2) {
            num.push(arr[i].state);
            // console.log(arr[i].state);
          }
        }
        if (num.length == arr.length) {
          if (this.outcome == "yes") {
            this.$message({
              type: "warning",
              message: "当前附件全部未通过"
            });
            return;
          }
        }
      }
      if(this.$store.state.isUpload) {
        this.$message.warning('有文件正在上传，请稍后操作')
        return;
      }

      let localAttach = []
      let projectRelev = []

      this.selectedFileList.forEach(v=>{
        v.addSource===1 && localAttach.push(v.docId)
        projectRelev.push(v.docId)
      })
      let colyObjIds = [];
      let findUserObjIds = []
      for(var i=0; i<this.findUserObjputong.length; i++){
          findUserObjIds.push(this.findUserObjputong[i].id)
      }
      for(var i=0; i<this.colyObjputong.length; i++){
          colyObjIds.push(this.colyObjputong[i].id)
      }
      let extCopy = [];
      extCopy = colyObjIds.concat(findUserObjIds);
      var datas = {
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId,
        data: {
          taskId: this.taskId,
          outcome: this.outcome,
          records: this.arrcheck,
          remarks: this.textareas,
          attach: projectRelev, // 附件（项目文档选择、底稿选择、本地上传）
          localFile: localAttach, // 本地上传
          projectId: this.proIdsxiangm,
          extCopy: extCopy
        }
      };
      console.log(datas);
      this.completetask = true
      var urls = "/info/audit/complete_task ";
      var _this = this;
      this.$post(urls, datas)
        .then((response) => {
          if (response.code == 0) {
            _this.xmbh = "";
            _this.xmbh2 = "";
            _this.typeText = "";
            _this.textareas = "";
            _this.shagreatlist = [];
            _this.shagchaunlist = [];
            _this.dialogVisible = false;
            _this.shagchaunlist03 = [];
            _this.arrcheck = [];
            _this.outcome = "";
            _this.deployObjputong = [];
            _this.radioss();
            _this.pending();
            _this.$message({
              type: "success",
              message: response.msg
            });
            this.$emit('updatas',true)
            // 将终止项目信息存入vuex （当前终止项目与vuex所存项目是同一个时更新项目信息，不是同一个不更新）
            if(_this.proIdsxiangm === _this.$store.state.projectMsg.pro_id){
              this.$utils.saveProjectmsg(_this.proIdsxiangm)
            }
          } else {
            _this.$message({
              type: "warning",
              message: response.msg
            });
            _this.completetask = true
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    seleist () {
      console.log(this.msgObj.pro_state);
      var array = this.select_type;
      for (let index = 0; index < array.length; index++) {
        if (array[index].id == this.msgObj.pro_state) {
          this.jincarr = JSON.parse(array[index].limitation);
        }
      }
      console.log(this.jincarr);
    },
    handleDelete (index, row) {
      console.log(index, row);
    },
    //控制器
    onPageChange (...params) {
      let val = Array.from(params[0])[0]
      let flag = params[1]
      switch (flag) {
        case 'forApprove':
          this.currentPageForApprove = val;
          break
        case 'approvedTotal':
          this.currentPageApprovedTotal = val;
          break
        case 'approvedFinish':
          this.currentPageApprovedFinish = val;
          break
        case 'approvedChecking':
          this.currentPageApprovedChecking = val;
          break
        case 'approvedCancel':
          this.currentPageApprovedCancel = val;
          break
        case 'mySponsor':
          this.currentPageMySponsor = val;
          break
        case 'copied':
          this.currentPageCopied = val;
          break
      }



      this.onPageChangeinfo = val;
      var currentPage = val;
      if (this.index == "" || this.index == 0) {
        console.log(currentPage);
        this.queryStates = [];
        var size
        if (this.handleSizeChangeinfo == '') {
          size = 10
        } else {
          size = this.handleSizeChangeinfo
        }
        this.pending("", currentPage, size);
      } else if (this.index == 1) {
        if (this.tabId == 0 || this.tabId == "") {
          this.finished("", currentPage);
        } else if (this.tabId == 1) {
          var queryState = [0, 2, 5, 6];
          this.queryStates = queryState;
          console.log(this.queryStates);
          // alert(1)
          this.finished("", currentPage, "", queryState);
        } else if (this.tabId == 2) {
          console.log(currentPage);
          var queryState = [1];
          this.queryStates = queryState;
          this.finished("", currentPage, "", queryState);
        } else {
          var queryState = [3];
          this.queryStates = queryState;
          this.finished("", currentPage, "", queryState);
        }
      } else if (this.index == 2) {
        if (this.tabId == 0 || this.tabId == "") {
          this.queryStates = [];
          this.sponsors("", currentPage);
        } else if (this.tabId == 1) {
          var queryState = [0, 2, 5, 6];
          this.queryStates = queryState;
          this.sponsors("", currentPage, "", queryState);
        } else if (this.tabId == 2) {
          console.log(currentPage);
          var queryState = [1];
          this.queryStates = queryState;
          this.sponsors("", currentPage, "", queryState);
        } else {
          var queryState = [3];
          this.queryStates = queryState;
          this.sponsors("", currentPage, "", queryState);
        }
      } else {
        this.Blind("", currentPage);
      }
    },
    handleSizeChange (...params) {


      let currentPage = Array.from(params[0])[0]
      let flag = params[1]
      this.handleSizeChangeinfo = currentPage
      this.pageSize = currentPage;

      switch (flag) {
        case 'forApprove':
          this.pageSizeForApprove = currentPage;
          break
        case 'approvedTotal':
          this.pageSizeApprovedTotal = currentPage;
          break
        case 'approvedFinish':
          this.pageSizeApprovedFinish = currentPage;
          break
        case 'approvedChecking':
          this.pageSizeApprovedChecking = currentPage;
          break
        case 'approvedCancel':
          this.pageSizeApprovedCancel = currentPage;
          break
        case 'mySponsor':
          this.pageSizeMySponsor = currentPage;
          break
        case 'copied':
          this.pageSizeCopied = currentPage;
          break
      }

      if (this.index == "" || this.index == 0) {
        this.queryStates = [];
        this.pending("", "", currentPage);
      } else if (this.index == 1) {
        if (this.tabId == 0 || this.tabId == "") {
          this.finished("", "", currentPage);
        } else if (this.tabId == 1) {
          var queryState = [0, 2, 5, 6];
          this.queryStates = queryState;
          console.log(this.queryStates);
          // alert(1)
          this.finished("", "", currentPage, queryState);
        } else if (this.tabId == 2) {
          console.log(currentPage);
          var queryState = [1];
          this.queryStates = queryState;
          this.finished("", "", currentPage, queryState);
        } else {
          var queryState = [3];
          this.queryStates = queryState;
          this.finished("", "", currentPage, queryState);
        }
      } else if (this.index == 2) {
        if (this.tabId == 0 || this.tabId == "") {
          this.queryStates = [];
          this.sponsors("", "", currentPage);
        } else if (this.tabId == 1) {
          var queryState = [0, 2, 5, 6];
          this.queryStates = queryState;
          this.sponsors("", "", currentPage, queryState);
        } else if (this.tabId == 2) {
          console.log(currentPage);
          var queryState = [1];
          this.queryStates = queryState;
          this.sponsors("", "", currentPage, queryState);
        } else {
          var queryState = [3];
          this.queryStates = queryState;
          this.sponsors("", "", currentPage, queryState);
        }
      } else {
        this.Blind("", "", currentPage);
      }
    },
    // 获取此次文件的审核文件
    queryApprovalFiles (item,state) {
      let obj = {
        data:{approvalId: item.id},
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId,
        projectId: item.projectId
      }
      this.$post('/info/audit/getPendingFileList', obj).then(res => {
        console.log(res, '查询审核的文件')
        if (!res) {
            return
        }
        if (res.code !== 0) {
          return
        }
        // 查询接口调用出来的审批的文件信息
        if(!state){
          this.approvalRecordShow = true
        }
        this.approvalRecordObj.attach = res.data
        this.approvalRecordObj.approvalId = item.id
        this.approvalRecordObj.docSource = item.docSource
        this.approvalRecordObj.item = item
        console.log(this.approvalRecordObj, '审核记录的传值')
      })
    },
    //审核记录
    approved (item) {
      // console.log(456, item, item.categoryId)
      this.projectName = item.projectName
      var ids;
      if (item == undefined) {
        ids = this.approveds;
         this.dialogVisible3 = true;
      } else {
        if(item.categoryId == 2 || item.categoryId == 10 || item.categoryId == 3 || item.categoryId == 11 ){
         this.queryApprovalFiles(item)
         return
        }else{
          this.dialogVisible3 = true;
        }
        ids = item.id;
      }
      var datas = {
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId,
        data: {
          approvalId: ids
        }
      };
      // var urls = "/info/audit/file_record_list";
      var urls = "/info/audit/approval_record_list";
      var _this = this;
      this.$post(urls, datas)
        .then((response) => {
          _this.approved_memo = response.data;
          _this.html2is = response.data.remarks;
          _this.colyObj = response.data.carbonCopy;
          // console.log(_this.approved_memo, '审批记录接口返回', _this.approved_memo.attachment)
          // _this.attachData  发起人的附件集合，attachment
          if (_this.approved_memo.attachment && _this.approved_memo.attachment.length > 0 ) {
            _this.attachmentShow = true
            _this.approved_memo.attachment.forEach(v => {
              this.iconFilter(v)
            })
          } else {
            _this.attachmentShow = false
          }
          //list是审批记录的层级，commentAttachment层级下的审批人的附件集合
          if (_this.approved_memo.list.length) {
            _this.approved_memo.list.forEach(val => {
              if (val.commentAttachment && val.commentAttachment.length > 0) {
                this.$set(val, 'commentAttachmentshow', true)
                val.commentAttachment.forEach(item => {
                  this.iconFilter(item)
                })
              }
              this.approvelistArray.push(val.commentAttachment)
            })

          }
          console.log(this.approvelistArray)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    previewFn(itemValue) { //文件预览 itemValue接收当前点击文件的数据
        if(itemValue.delFlag == 1) {
          this.$message({
            type: 'warning',
            message: '该附件已被删除'
          });
          return
        }
        var previewData = {
            projectId: this.queryDocProjectId,
            rfsId: itemValue.rfsId,
            docId : itemValue.fileId,
            photoType: itemValue.docType,
            docName: itemValue.fileName,
            projectName:this.projectName
        }
        this.$store.commit('previewAllFn',previewData)
      },
    // 审核记录下载附件
    downLoadFilesfujian() {
        if (this.annexfujian == ""){
            this.$message.error('请选择要下载的数据')
            return
        }
        let uploadData = []
        console.log(this.annexfujian)
        console.log(this.approved_memo.attachment)
        this.annexfujian.forEach(item => {
            console.log(item)
            this.approved_memo.attachment.forEach(it => {
                console.log(it)
            if (item == it.fileId && it.delFlag != 1) {
                if (this.$store.state.isPC) {
                    uploadData.push({
                    docId: it.fileId,
                    docName: it.fileName
                });
                } else {
                    uploadData.push({
                    docId: it.fileId,
                    docName: it.fileName
                });
                }
            }
            });
        });
        if(uploadData.length == 1 ){
            if (this.$store.state.isPC) {
                this.$store.commit("pcOtherDownload", {
                    docName : uploadData[0].docName,
                    docId :uploadData[0].docId
                });
            } else {
                this.$store.commit("download", [{
                    docName : uploadData[0].docName,
                    id :uploadData[0].docId
                }]);
            }
        }else{
        var data={
            "random":Math.random(),
            "docIdStr":uploadData.map(v=>v.docId).join(','),
            "zipName": this.projectName.substring(0,10)+'-审批附件.zip'
            }
        this.$store.commit("export", {url: "/rfs/downloadDocsZip",data: data});
        }

    },
       // 审核记录上传附件
    downLoadFilesfujsecond() {
        if (this.annexfujsecond== ""){
            this.$message.error('请选择要下载的数据')
            return
        }
        let uploadData = []
        console.log(this.annexfujsecond)
        //console.log(this.approved_memo.list.commentAttachment)
        this.annexfujsecond.forEach(item => {
            console.log(item)
            this.approvelistArray[0].forEach(it => {
                console.log(it)
            if (item == it.fileId && it.delFlag != 1) {
                if (this.$store.state.isPC) {
                    uploadData.push({
                    docId: it.fileId,
                    docName: it.fileName
                });
                } else {
                    uploadData.push({
                      docId: it.fileId,
                      docName: it.fileName
                  });
                }
            }
            });
        });
        if(uploadData.length == 1 ){
            if (this.$store.state.isPC) {
                this.$store.commit("pcOtherDownload", {
                    docName : uploadData[0].docName,
                    docId :uploadData[0].docId
                });
            } else {
                this.$store.commit("download", [{
                    docName : uploadData[0].docName,
                    id :uploadData[0].docId
                }]);
            }
        }else{
            //console.log(22)
          var data={
            "random":Math.random(),
            "docIdStr":uploadData.map(v=>v.docId).join(','),
            "zipName": this.projectName.substring(0,10)+'-审批附件.zip'
            }
        this.$store.commit("export", {url: "/rfs/downloadDocsZip",data: data});
        }

    },
    iconFilter(itemValue) { //过滤重命名的icon
        if (itemValue.docType == 1) {
          itemValue.fileIcon = require("../../common/fileIcon/FolderType1.png");
        } else {
          var hz_name = itemValue.docType;
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
    handleClose (done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    reminder (item) {
      console.log(item)
      //  <el-table-column prop="projectName" align="center" label="项目名称"></el-table-column>
      //       <el-table-column prop="categoryName" align="center" label="类型"></el-table-column>
      //       <el-table-column prop="username" align="center" label="提交人员"></el-table-column>
      this.projectName = item.categoryName;
      this.username = item.username;
      this.spid = item.id;
      var datas = {
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId,
        pageNo: "0",
        pageSize: "10",
        data: {
          id: item.id
        }
      };
      var urls = "/info/audit/current_approval_user ";
      var _this = this;
      this.$post(urls, datas)
        .then((response) => {
            console.log(response.data)
          _this.userIds = response.data.name;
          _this.nameids = response.data.ids;
          //var aa= &nbsp;
          let projectInfo = item.projectName ? `${item.projectName}项目的` : ''

          _this.textaress =
            `【智慧投行】 ${this.$store.state.loginObject.userName} ：提醒您尽快审批关于${projectInfo}${item.categoryName}，可在'我的审批-待我审批中'进行查看，该审批提交时间为${this.$moment().format("YYYY-MM-DD HH:mm:ss")}`
          _this.textColor.color = "#ccc";

        })
        .catch(function (error) {
          console.log(error);
        });
      this.dialogVisible2 = true;
      this.value = "";
    },
    // getfocus(){
    //     this.textaress = "";
    //     this.textColor.color="#333";
    // },
    //撤销
    recalls (item) {
      this.$confirm("确认要撤销审批吗？ ", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var datas = {
            token: this.$store.state.loginObject.userToken,
            userId: this.$store.state.loginObject.userId,
            data: {
              id: item.id,
              taskId: item.taskId
            }
          };
          var urls = "/info/audit/cancel_instance";
          var _this = this;
          this.$post(urls, datas)
            .then((response) => {
              if (response.code == 0) {
                _this.$message({
                  type: "success",
                  message: response.msg
                });
                let queryStates = []
                if(this.tabId == 1) {
                  queryStates = [0, 2, 5, 6]
                } else if(this.tabId == 2) {
                  queryStates = [1]
                } else if(this.tabId == 3) {
                  queryStates = [3]
                }

                _this.sponsors('', '', '', queryStates);
                _this.currentPage = 1;
                console.log(item.docSource)
                this.$select.updateStatus(item.docSource, item.projectId, item.projectId)
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
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消申请"
          });
        });
    },
    close5 () {
      this.dialogVisible7 = false;
    },
    fsgj () {
      console.log(this.meetRegion);
      this.meetList.map((item, idx) => {
        if (item.id == this.meetRegion) {
          this.meetcheckList.push(item);
        }
      });
      this.meetcheckList = this.$utils.uniqBy(this.meetcheckList, 'id')
    },
    duaoxuan () {
      console.log(this.meetCheckid);
      this.meetCheckid = Array.from(new Set(this.meetCheckid));
    }
  },
  watch: {
    dialogVisible(val){
      if(!val){
        this.completetask = false

      }
    },
    addMeeting(val){
      // if(!val){
      //   this.meeting = {}
      // }
    },
    addCvotebul(val){
      // if(!val){
      //  this.msgObj = {}
      // }
    },
    itemState:function(val){
      console.log(val, 'itemState')
       switch(val[0]) {
        case 0: // 审批
        this.handleEdit(val[2],val[1])
            break;
        case 1: //关联会议
        this.glhy(val[1])
            break;
        case 2: //取消关联会议
        this.QMeet(val[1])
            break;
        case 3: // 关联投票
        this.relatedvoting(val[1])
            break;
        case 4: // 取下关联投票
        this.relatedQp(val[1])
            break;
        case 9: // 审批记录
        this.approved(val[1])
            break;
        case 10: // 转交
        this.cares = true
        this.catItem = val[1]
        this.taskId = val[1].taskId;
        default:
        }
    },
    filejlval(val){
      this.approved(val.v)
    },
    dialogMeeting: function (val) {
      console.log(val);
      if (val == false) {
        if (this.meetcheckList.length > 0) {
          this.meetcheckList = [];
        }
        this.meetcheckList = [];
        this.meetCheckid = [];
      }
    },
    CvoteList_id: function (newV, oldV) {
      this.CvoteCheckid = [];
      this.ruleForm.type = [];
      for (var i = 0; i < this.CvoteList.length; i++) {
        if (newV == this.CvoteList[i].id) {
          this.ruleFormnme = this.CvoteList[i].name;
          this.CvoteCheckid.push(this.CvoteList[i]);
        }
      }
    },
    'userIds':{
    handler(newName, oldName) {
        console.log(newName.length)
        if(newName.length <=1){
            this.chack_bule = true;
        }else{
            this.chack_bule = false;
        }
    },
    deep: true
}
  }
};
</script>
<style lang="scss" scoped>
.project {
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
  p {
    float: right;
    margin-right: 2%;
  }
}
// 修改审批意见抖动的问题
.requese-content{
  display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    >p{
      margin-left: 15px;
      flex-shrink: 0;
      margin-right: 0;
    }
    >div{
      width: 556px;
      margin-bottom: 10px;
      background: rgb(243, 246, 249);
    }
}
.down-load-btn{
  background:none;
  margin-right:8px;
}
.down-load-btn-right{
  margin-right:25px !important;
}
.infowan-type{
  max-width: 300px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.messcontent span {
  max-width: 190px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  display: block;
}
.remarksss{
  width:200px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.del-file{
  text-decoration: line-through;
}
.content {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.content_p {
  width: 100%;
  height: 22px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.45);
  line-height: 52px;
  text-align: left;
  margin-left: 10px;
  span {
    color: rgba(0, 0, 0, 0.65);
  }
}
.content_top {
  width: 100%;
  height: 99px;
  background: rgba(255, 255, 255, 1);
  margin-bottom: 10px;
}
.page-breadcrumb.el-breadcrumb{
  line-height: 46px;
}
.content_zj {
  width: 100%;
  height: 14px;
  background: #eef0f4;
}
.content_box {
  width: 100%;
  // margin-top: 41px;
  margin-top: 24px;
  height: 50px;
  line-height: 50px;
}
.content_title {
  float: left;
  color:#333;
  font-size: 20px;
  // padding-left: 22px;
  padding-left: 10px;
  text-align: left;
  font-weight: bold;
  font-family: MicrosoftYaHei;
}
.content_search {
  margin-right: 21px;
}

.content_inputBox {
  width: 283px;
  height: 40px;
  line-height: 35px;
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.content_xz {
  padding: 12px 0 0 4px;
  height: 25px;
  background: white;
  li {
    height: 25px;
    float: left;
    margin-top: 0;
    margin-left: 2%;
    width: 63px;
    font-size: 14px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: #000000;
    cursor: pointer;
  }
}
.content_xz li:first-child {
  margin-left: 0px;
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
  li {
    width: 100%;
    height: 100%;
    padding: 15px 0;
    box-sizing: border-box;
    // margin-left: -13px;
  }
}
.pages {
  text-align: right;
  height: 37px;
  margin-top: 22px;
  padding-right: 25px;
}
.dialos {
  margin-bottom: 8%;
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
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    font-size: 14px;
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
  height: 177px;
  resize: none;
  color: #333;
  border: 1px solid #cccccc;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  border-radius: 2px;
  margin-top: 6px;
  margin-left: 2px;
  padding: 5px;
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
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
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
    right: 27px;
    height: 127px;
    overflow: hidden;
    overflow-y: auto;
  }
}
.dialog_file3 {
  padding-top: 5%;
  width: 106%;
  height: 50px;
  /* border: 1px solid; */
  overflow: auto;
  margin-left: -24px;
  // border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  padding-left: 25px;
  // div {
  //   width: 100%;
  //   height: auto;
  //   float: left;
  //   margin-top: -12px;
  //   margin-left: -79px;
  // }
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
  top: 353px;
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
  height: 19px;
  display: inline-block;
  font-family: PingFangSC-Regular;
  color: #1890ff;
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
// .recallsss {
//   margin-left: 8px;
//   text-align: center;
//   width: 58px;
//   height: 15px;
//   border-radius: 3px;
//   display: inline-block;
//   // border: 1px solid #ccc;
//   font-family: PingFangSC-Regular;
//   color: #1890ff;
//   font-size: 14px;
//   line-height: 24px;
// }
.dialos i,
.dialog_filess span {
  color: yellow;
}
.dialog_filesss p {
  margin-left: 3%;
}
#records {
  width: 104%;
  max-height: 500px;
  overflow-y: auto;
  // margin-top: -29px;
  ul > li {
    width: 100%;
    height: 30px;
    // margin-top: 5px;
    line-height: 30px;
  }
  .sh_list li {
    margin-top: 12px;
  }
  .sh_list li:first-child {
    margin-top: 4px;
  }
  /deep/ .el-scrollbar__wrap {
    overflow-y: auto;
    padding-bottom: 17px !important;
  }
}
.lispsan {
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: bold;
  // color: rgba(0, 0, 0, 0.85);
  margin-right: 20px;
  color: rgba(51,51,51,1);
}
//
.linspans {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.diaglogs_box {
  margin-left: 15%;
  padding-right: 4%;
  height: 90px;
  overflow-y: auto;
}
.dialogs_files {
  width: 100%;
  overflow: hidden;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  .title {
    float: left;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  .dialogs_files_box {
    float: left;
    margin-left: 8px;
    height: 69px;
    width: 84%;
    overflow: auto;
    div {
      // margin-left: 15%;
      // padding-right: 4%;
    }
    li {
      margin-top: 0 !important;
      width: 100%;
      font-size: 14px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      cursor: pointer;
      a {
        text-align: right;
        color: #0061a9;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        line-height: 21px;
        margin: 1px;
      }
      .view_file {
        color: #666;
        cursor: pointer;
      }
      .view_file:hover {
        color: #0061a9;
      }
    }
  }
}
.recordss {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
#textares {
  margin-top: 5px;
  width: 380px;
  height: 145px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  resize: none;
}
.spanimg {
  width: 23px;
  height: 23px;
  border-radius: 21px;
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
  img {
    width: 100%;
    vertical-align: sub;
  }
}
.result {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 188, 17, 1);
  margin-left: 4px;
}
.addleft {
  margin-left: 4%;
}
.addleft1 {
  margin-left: 30px;
}
#dialos {
  width: 100%;
  // height: 30px;
  padding-bottom: 27px;
}
#dialos span:first-child {
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}
#dialos span:nth-child(3) {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
// #dialos span:nth-child(4) {
//   width: 19px;
//   height: 19px;
//   background: #3686fe;
//   color: white;
//   // border-radius: 9px;
//   display: inline-block;
//   text-align: center;
//   line-height: 19px;
//   margin-left: 7px;
//   border-radius: 9px;
//   font-size: 15px;
// }
// #dialos span:nth-child(5) {
// font-size: 14px;
// font-family: PingFangSC-Medium;
// font-weight: bold;
// color: rgba(51, 51, 51, 1);
// }

.project1 {
  .title_lable {
    width: 100px;
    // height: 22px;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 46px;
  }
  .porject_name {
    width: 100%;
    min-height: 60px;
    // padding-top: 2%;
    li {
      float: left;
      // width: 40%;
      width: 305px;
      height: 40px;
      margin-left: 15px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
      display: flex;
      align-items: center;
      span {
        // width: 215px;
        flex: 1;
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
   .approval-check{
    border-top: 1px dashed rgba(220,223,230,1);
    padding: 15px 0 10px 0px;
    >div{
        // display: flex;
        // justify-content: space-between;
        padding: 0 35px 10px 0;
        >button{
            color: rgba(0,97,169,1);
            cursor: pointer;
            background: #fff;
        }
    }
    .approval-group{
        // display: flex;
        // flex-direction: column;
        max-height: 300px;
        overflow-y: auto;
        overflow-x: hidden;
        margin-right: 20px;
            .el-checkbox{
            padding: 8px 0;
            .el-checkbox__input{
                margin-top:-9px;
            }

        }
    }
     .attachemnt-list-doc {
        cursor: pointer;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 500px;
    }
}
  //   新建项目信息
  .projectnewmessage {
    padding-bottom: 20px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
    // padding:0px 15px;
    .companymessage {
      display: block;
      margin-left: 15px;
      font-weight: bold;
      color: #333;
    }
    li {
      // float:left;
      margin-left: 15px;
      // width: 309px;
      font-size: 14px;
      line-height: 30px;
      .messcontent {
        float: left;
        // width: 315px;
        min-width: 45%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        label {
          width: 96px;
          display: inline-block;
          float: left;
        }
        .messDiv {
          float: left;
        }
      }
    }
    .areacompany {
      label {
        float: left;
        width: 85px;
        display: inline-block;
      }
      span {
        // max-height: 200px;
        // overflow-y: auto;
        // display: inline-block;
        float: left;
        width: 85%;
        // margin-top: -30px;
        // margin-left: 90px;
      }
    }
  }
  //文件借阅
  .filejieyue {
    ul {
      padding-left: 17px;
      li {
        label {
          font-size: 14px;
          font-weight: bold;
        }
      }
    }
  }



}


#project2 {
  width: 100%;
  height: 94px;
  li {
    width: 100%;
    height: 25px;
    span {
      width: 75%;
      display: inline-block;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
      padding-left: 60px;
    }
  }
}
.project2span {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
}
.project3 {
  div {
    width: 64px;
    height: 22px;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 40px;
  }
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
    color: rgba(153, 153, 153, 1);
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
  width: 100px;
  height: 1px;
  display: inline-block;
  vertical-align: text-top;
  background: #1890ff;
}

.pro5 {
  vertical-align: super;
}
.proend {
  width: 100%;
  height: 91px;
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
    // float: left;
    // margin-left: 13%;
    // margin-top: -17px;
    width: 61%;
    height: 91px;
    resize: none;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.15);
  }
}
#recordss {
  width: 100%;
  height: 350px;
  li {
    width: 100%;
    // height:150px;
    h3 {
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
    textarea {
    }
  }
}
.ques_button {
  display: block;
  height: 45px;
  text-align: right;
  margin-bottom: 15px;
  margin-right: 26px;
}
.riwjn_we {
  margin-left: 50px;
  margin-top: 6px;
  display: flex;
  flex-wrap: wrap;
}
.riwjn_we li {
  line-height: 30px;
}
.el-pagination {
  padding: 0;
}

.usernanmestlt {
  width: 16%;
}
.usernanmes {
  width: 84%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.deletro {
  padding-left: 6px;
  width: 15px;
  height: 15px;
  background: url("../../../assets/image/sanc.png") no-repeat;
  background-size: 100% 100%;
}

.wait_shfile {
  .project1_titlebox {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .project1_titlebox_ittle {
      font-size: 16px;
      font-weight: bold;
      color: #333333;
    }
  }
  .project2 {
    margin-left: 80px;
    height: 100px;
  }
  li {
    height: 30px;
    line-height: 30px;
    display: flex;
    justify-content: space-between;
    .filename {
      flex: 1;
      height: 30px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: rgba(0, 0, 0, 0.65);
      p {
        width: 360px !important;
        // padding-left: 0px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-left: 10px;
        // float: left;
        // margin-left: 15px !important;
      }
    }
    li:first-child {
      margin-top: 16px;
    }
    .filename:hover {
      color: #0061a9;
      cursor: pointer;
    }
    .fileoper {
      margin: 0 25px;
      width: 125px;
    }
    .filestatus {
      width: 60px;
    }
  }
}
.sphj_box {
  .project1_titlebox {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .project1_titlebox_ittle {
      font-size: 16px;
      font-weight: bold;
      color: #333333;
    }
  }
}
// 表格操作按钮
.oper_box {
  margin: auto;
  min-width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    display: inline-block;
    margin-right: 10px;
    width: 28px;
    height: 28px;
    line-height: 28px;
    border: solid 1px #e7e7e7;
    border-radius: 50%;
    cursor: pointer;
    // border-radius: 50%;
  }
  span:last-child {
    margin-right: 0;
  }
  .oper_shenhe {
    width: 28px;
    height: 28px;
    line-height: 28px;
  }
  .oper_shenhejilu {
    width: 28px;
    height: 28px;
    line-height: 28px;
  }

  .oper_guanlianhuiyi {
    background-image: url("../../../assets/image/myshenpi/guanlanhuiyi_0.png");
  }
  .oper_guanlianhuiyi:hover {
    background-image: url("../../../assets/image/myshenpi/guanlanhuiyi_1.png");
  }
  .oper_quxiaoguanlian {
    background-image: url("../../../assets/image/myshenpi/quxiaoguanlian_0.png");
  }
  .oper_quxiaoguanlian:hover {
    background-image: url("../../../assets/image/myshenpi/quxiaoguanlian_1.png");
  }
  .oper_guanliantoupiao {
    background-image: url("../../../assets/image/myshenpi/guanlantoupiao_0.png");
  }
  .oper_guanliantoupiao:hover {
    background-image: url("../../../assets/image/myshenpi/guanlantoupiao_1.png");
  }
}
// 审核催办弹框
.shcb_box {
  .title {
    font-size: 15px !important;
    font-weight: bold !important;
    color: #000 !important;
  }
  #dialos {
    display: flex;
    flex-wrap: wrap;
    .js_people {
      margin-bottom: 12px;
      padding: 2px 0;
      padding-right: 15px;
      margin-right: 16px;
      position: relative;
      .delete-copy-person {
        position: absolute;
        right: 0;
        top: -4px;
        width: 15px;
        height: 15px;
        cursor: pointer;
        background: url("../../../assets/project_doc/deletePerson.png")
          no-repeat 0 0;
      }
    }
  }
  .dialog_file3 {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    width: auto;
    height: 40px;
    .el-select {
      width: 200px;
    }
  }
}
.upload_file_list {
  display: flex;
  align-items: center;
  .project2span {
    cursor: pointer;
  }
}
.hide_text {
  width: 100%;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hide_text :hover {
  color: red;
}
// 审核上传附件
.fj_box {
  margin-top: 18px;
  position: relative;
  padding-left: 65px;
  .title {
    font-size: 14px;
    font-weight: bold;
    color: #333333;
  }
  .upload_select {
    position: absolute;
    top: 0;
    left: 70px;
  }
  .add_file_img {
    width: 14px;
    height: 14px;
  }

  .select_btn {
    padding: 0 8px;
  }
}
// 审核记录文件上传
.shjl_box {
  .file_list {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    .file_name {
      // cursor: pointer;
      flex: 1;
      text-align: left;
      width: 60%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .file_down {
      width: 50px;
      cursor: pointer;
      margin-right: 10px;
    }
  }
  .attach{
    display: flex;
    justify-content: flex-start;
    .attach-files {
      width: 80%;
      margin-left: 35px;
    }
  }
  .files-box {
      margin: 15px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        width: 70%;
        display: flex;
        align-items: center;
        font-size: 14px;
        cursor: pointer;
         .files-img {
          width: 38px;
          height: 22px;
          margin-right: 6px;
          img {
            height: 100%;
          }
        }
        span{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      >span {
        font-weight:400;
        color:rgba(0,97,169,1);
        cursor: pointer;
      }
  }
}
// 取消关联弹框
.exit_box {
  margin: 0 20px;
  li {
    display: flex;
    margin-bottom: 8px;
    .left {
      flex: 1;
      text-align: left;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .right {
      width: 80px;
      text-align: right;
      color: #0061a9;
      cursor: pointer;
    }
  }
}
.exit_container {
  height: 100px;
  ul {
    margin-top: 20px;
  }
}
// 待审批文件列表
.sp_file_list {
}
</style>
<style lang="scss">
/* .el-scrollbar__wrap {
   overflow-x: hidden;
 } */
.approval {
  .el-table td {
    padding: 11px 0;
  }
}

.my-approve.el-tabs.el-tabs--top.el-tabs--border-card>.el-tabs__content{
  padding: 15px 0;
}

</style>
<style lang="scss" scoped>
.select-box{
  display: flex;
  align-items: flex-start;
}
.select-box .el-checkbox__label >span{
  // align-items:center;
  display: inline-block;
  max-width: 500px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.approval .el-dialog__header {
  border-bottom: solid 1px #eaeaea !important;
}
.approval .el-table__body td {
  padding: 0;
  height: 57px;
  line-height: 57px;
}

.gdt {
  width: 100%;
  height: 70px;
  overflow-y: auto;
}
.cssls {
  float: left;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.comments {
  width: 79%;
  margin-left: 4%;
  // height: 20px;
  overflow: hidden;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.borrow_dialog {
  .borrow_middle {
    margin: 0 24px 0 24px;
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
        border: 1px solid #dddddd;
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
                background: url("../../../assets/manuscript_icon/file_icon.png")
                  no-repeat;
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
        border: 1px solid #dddddd;
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
              max-width: 296px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              padding-left: 15px;
            }
            .borrow_middle_chunk_right_list_item_del {
              display: inline-block;
              color: #1462a3;
              padding-right: 19px;
              cursor: pointer;
            }
          }
          .borrow_middle_chunk_right_list_item:hover {
            background: #f7f9fb;
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
          .borrow_middle_chunk_content_middle_title:nth-child(1) {
            margin-top: 0;
          }
          .borrow_middle_chunk_content_middle_operation {
            width: 100%;
            margin-top: 10px;
            display: flex;
            align-items: center;
            cursor: pointer;
            .borrow_middle_chunk_content_middle_operation_icon {
              width: 24px;
              height: 24px;
              background: url("../../../assets/common_icon/addtask_icon.png")
                no-repeat;
              background-size: 24px 24px;
            }
            .borrow_middle_chunk_content_middle_operation_title {
              color: #1462a3;
              margin-left: 6px;
            }
          }
          .borrow_middle_chunk_content_middle_list {
            max-height: 216px;
            overflow-y: scroll;
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

.attachment-wrap{
  margin-left: 48px;
}
.attachment-wrap p.attachemnt-list-doc{
  float: none;
  padding-right: 20px;
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
.approval .el-dialog__body {
  /* padding: 18px 30px 18px 40px;
  height: 400px; */
  overflow-y: auto;
}
</style>
<style>
.project .el-scrollbar .is-horizontal {
    display: none;
  }
.approval .el-dialog__header {
  box-shadow:0px 1px 0px 0px rgba(221, 221, 221, 0.35);
  border-bottom: solid 1px #eaeaea !important;
}

.content .el-textarea .el-textarea__inner {
  resize: none;
}
.approval .el-dialog__body .el-scrollbar__view .el-tag{
  margin-left: 10px;
    height: 32px;
    text-align: center;
}
#auditorfujian ul li:nth-child(3) span {
  margin-left: 0px !important;
}
#auditorfujian ul li:nth-child(4) span {
  margin-left: 0px !important;
}
#auditorfujian ul li:nth-child(3) p {
  margin-left: 0px !important;
}
.borrowZtree li a .node_name {
  width: 300px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.borrowZtree li a .diyState {
  display: inline-block;
  float: right;
  margin-left: 10px;
}
.borrowZtree li span.button.diy01_ico_open {
  line-height: 0;
  margin: 0;
  width: 18px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
  border: 0 none;
  cursor: pointer;
  outline: none;
  background-color: transparent;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background: url("../../../assets/manuscript_icon/examopen_icon.png") no-repeat;
  background-size: 18px 14px;
}
.borrowZtree li span.button.diy01_ico_close {
  line-height: 0;
  margin: 0;
  width: 18px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
  border: 0 none;
  cursor: pointer;
  outline: none;
  background-color: transparent;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background: url("../../../assets/manuscript_icon/examclose_icon.png")
    no-repeat;
  background-size: 18px 14px;
}
.infowan{
  width: 100%;
  color: #333
}
.infowan p {
    float: left;
    width: 312px;
    font-weight: bold;
}
.borrowZtree li span.button.diy03_ico_docu {
  line-height: 0;
  margin: 0;
  width: 18px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
  border: 0 none;
  cursor: pointer;
  outline: none;
  background-color: transparent;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background: url("../../../assets/manuscript_icon/file_icon.png") no-repeat;
  background-size: 13px 14px;
}
.borrowZtree li a.curSelectedNode {
  padding-top: 0px;
  background: #f0f0f0;
  color: black;
  height: 16px;
  border: 1px #f0f0f0 solid;
  opacity: 0.8;
}
.borrowZtree li span.switch {
  display: none;
}
.caresli {
  text-align: left;
}
.caresli li:first-child {
  /* width: 107%;
  height: 1px;
  background: #dddddd;
  margin-left: -19px;
  margin-top: -15px; */
}
.caresli li:nth-child(2) {
  margin-top: 22px;
  margin-left: 8px;
}
.caresli li:nth-child(3) {
  margin-left: 8px;
}
.caresli textarea {
  height: 95px;
}
.approval .has-sub-tab .el-tabs__nav:nth-child(1) {
  margin-left: 14px;
}
.wfqdinnfo .el-tabs__nav{
   margin-left: 14px !important;
}
.remindRight{
    margin-right: 20px;
}
.remindRight .userbtn{
    margin-right: 10px;
    margin-bottom: 10px;
}
.remindContent{
    margin-top: 10px;
}
</style>

