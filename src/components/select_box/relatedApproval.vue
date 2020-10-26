<template>
<div id="related-approval"> 
    <el-dialog title="关联审批" class='lists' center :close-on-click-modal="false" :visible="relatedExamVisible" @close="clickEvent">
        <el-scrollbar style="height:calc(100% - 56px)">
            <!-- 查询条件 -->
            <div class="content-title clearfix">
                <span class="fl" v-if="relateFlag">关联审批（当前审批已关联审批）</span>
                <el-button class="start-btn fr" @click="sponsor" v-if="$utils.checkSystemPermission('sub_approve')" type="primary">发起审批</el-button>
            </div>
            <div class='search-box' v-on:keyup.enter="queryBtn">
                <el-form ref="form"  label-width="100px" class="clearfix2">
                    <el-form-item label="项目名称：">
                        <el-input class="q-246" :title="queryObj.projectName" v-model="queryObj.projectName" placeholder="请输入项目名称">                       
                        </el-input>
                    </el-form-item>
                    <el-form-item label="审批类型：" class="business-select fl">
                        <el-input v-model="queryObj.examTypeName" placeholder="请选择审批类型" disabled style="width:220px;" class="fl"></el-input>
                        <el-button  @click="selectTestType(1)" type="primary" style="margin-left:0;">选择</el-button>
                    </el-form-item>
                    <el-form-item label="业务类型：" class="business-select fl">
                        <el-input v-model="queryObj.businessTypeNames" placeholder="请选择业务类型" class="fin_inp fl" disabled style="width:220px;"></el-input>
                        <el-button  @click="businessTypeSele()" type="primary" class="fl" style="margin-left:0;">选择</el-button>
                    </el-form-item>
                    <el-form-item label="状态：" v-show="index == 0 || index == 3">
                        <el-select v-model="queryObj.stageName" placeholder="请选择状态" clearable @change="selectStageChange"  @clear="clearState">
                            <el-option v-for="item in selectStageList" :key="item.id" :lable="item.label" :value="item.label"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="提交人：" class="business-select fl">
                        <el-input v-model="queryObj.creater" placeholder="请选择提交人" disabled :title="queryObj.creater" style="width:220px;" class="fl"></el-input>
                        <el-button  @click="seleCreater(1)" type="primary"  style="margin-left:0;">选择</el-button>
                    </el-form-item>
                    <div>
                        <el-button  type="primary" icon="el-icon-search" @click="queryBtn">查询</el-button>
                        <el-button  @click="reset" icon="el-icon-refresh">重置</el-button>
                    </div>
                </el-form>
            </div>
            <!--数据 -->
            <div class='project-table'>
                <el-tabs class='my-approve' type="border-card" v-model="firstTitle" @tab-click="content_xzs">
                    <el-tab-pane label="待我审批" name="0">
                        <el-table :data="tableDataForApprove" v-loading="loading" style="width: 100%"
                                    :header-cell-style="{background:'#FAFAFA',color:'#000'}">
                            <el-table-column prop="projectName" align="center" label="项目名称" min-width="100">
                                <template slot-scope="scope">
                                    <p type="text" class="ellipsis1" style="padding:1px 0px;width:100%" :title="scope.row.projectName">
                                        {{ scope.row.projectName }}
                                    </p>
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
                            <el-table-column width="100" align="center" label="操作">
                                <template slot-scope="scope">
                                    <div class="oper_box">                                  
                                        <span v-if="!scope.row.relateFlag" @click="guanlianshenpi(scope.row)" class="icon-operate-btn iconfont duigou" title="关联审批">
                                        </span>
                                        <span v-if="scope.row.relateFlag" @click="quxiaoguanlianshenpi(scope.row)" class="icon-operate-btn iconfont quxiaoguanlian" title="取消关联审批">
                                        </span>                       
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
                    <el-tab-pane label="我已审批" class="wfqdinnfo" name="1">
                        <el-tabs v-model="activeName3" @tab-click="handleClick" :class="firststate ? 'has-sub-tab':''">
                            <el-tab-pane :label="'全部（'+ dataTotal +'）'" name="first">
                                <el-table :data="tableDataApprovedTotal" v-loading="loading" style="width: 100%" :header-cell-style="{background:'#FAFAFA',color:'#000'}">
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
                                    <el-table-column width="100" align="center" label="操作">
                                        <template slot-scope="scope">
                                            <div class="oper_box">
                                                <div class="oper_box">                                  
                                                    <span v-if="!scope.row.relateFlag" @click="guanlianshenpi(scope.row)" class="icon-operate-btn iconfont duigou" title="关联审批">
                                                    </span>
                                                    <span v-if="scope.row.relateFlag" @click="quxiaoguanlianshenpi(scope.row)" class="icon-operate-btn iconfont quxiaoguanlian" title="取消关联审批">
                                                    </span>                       
                                                </div>
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
                                <el-table :data="tableDataApprovedFinish" v-loading="loading" style="width: 100%" :header-cell-style="{background:'#FAFAFA',color:'#000'}">
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
                                    <el-table-column width="100" align="center" label="操作">
                                        <template slot-scope="scope">
                                            <div class="oper_box">                                  
                                                <span v-if="!scope.row.relateFlag" @click="guanlianshenpi(scope.row)" class="icon-operate-btn iconfont duigou" title="关联审批">
                                                </span>
                                                <span v-if="scope.row.relateFlag" @click="quxiaoguanlianshenpi(scope.row)" class="icon-operate-btn iconfont quxiaoguanlian" title="取消关联审批">
                                                </span>                       
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
                                <el-table :data="tableDataApprovedChecking" v-loading="loading" style="width: 100%" :header-cell-style="{background:'#FAFAFA',color:'#000'}">
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
                                        <el-table-column width="100" align="center" label="操作">
                                        <template slot-scope="scope">
                                            <div class="oper_box">                                  
                                                <span v-if="!scope.row.relateFlag" @click="guanlianshenpi(scope.row)" class="icon-operate-btn iconfont duigou" title="关联审批">
                                                </span>
                                                <span v-if="scope.row.relateFlag" @click="quxiaoguanlianshenpi(scope.row)" class="icon-operate-btn iconfont quxiaoguanlian" title="取消关联审批">
                                                </span>                       
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
                            <el-table :data="tableDataMySponsorTotal" v-loading="loading" style="width: 100%" :header-cell-style="{background:'#FAFAFA',color:'#000'}">
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
                                <el-table-column width="100" align="center" label="操作">
                                    <template slot-scope="scope">
                                        <div class="oper_box">                                  
                                            <span v-if="!scope.row.relateFlag" @click="guanlianshenpi(scope.row)" class="icon-operate-btn iconfont duigou" title="关联审批">
                                            </span>
                                            <span v-if="scope.row.relateFlag" @click="quxiaoguanlianshenpi(scope.row)" class="icon-operate-btn iconfont quxiaoguanlian" title="取消关联审批">
                                            </span>                       
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
                                <el-table :data="tableDataMySponsorFinish" v-loading="loading" style="width: 100%" :header-cell-style="{background:'#FAFAFA',color:'#000'}">
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
                                    <el-table-column width="100" align="center" label="操作">
                                        <template slot-scope="scope">
                                            <div class="oper_box">                                  
                                                <span v-if="!scope.row.relateFlag" @click="guanlianshenpi(scope.row)" class="icon-operate-btn iconfont duigou" title="关联审批">
                                                </span>
                                                <span v-if="scope.row.relateFlag" @click="quxiaoguanlianshenpi(scope.row)" class="icon-operate-btn iconfont quxiaoguanlian" title="取消关联审批">
                                                </span>                       
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
                            <el-table :data="tableDataMySponsorChecking" v-loading="loading" style="width: 100%" :header-cell-style="{background:'#FAFAFA',color:'#000'}">
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
                                <el-table-column width="100" align="center" label="操作">
                                    <template slot-scope="scope">
                                        <div class="oper_box">                                  
                                            <span v-if="!scope.row.relateFlag" @click="guanlianshenpi(scope.row)" class="icon-operate-btn iconfont duigou" title="关联审批">
                                            </span>
                                            <span v-if="scope.row.relateFlag" @click="quxiaoguanlianshenpi(scope.row)" class="icon-operate-btn iconfont quxiaoguanlian" title="取消关联审批">
                                            </span>                       
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
                                <el-table :data="tableDataMySponsorCancel" v-loading="loading" style="width: 100%" :header-cell-style="{background:'#FAFAFA',color:'#000'}">
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
                                    <el-table-column width="100" align="center" label="操作">
                                        <template slot-scope="scope">
                                            <div class="oper_box">                                  
                                                <span v-if="!scope.row.relateFlag" @click="guanlianshenpi(scope.row)" class="icon-operate-btn iconfont duigou" title="关联审批">
                                                </span>
                                                <span v-if="scope.row.relateFlag" @click="quxiaoguanlianshenpi(scope.row)" class="icon-operate-btn iconfont quxiaoguanlian" title="取消关联审批">
                                                </span>                       
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
                        <el-table :data="tableDataCopied" v-loading="loading" style="width: 100%" :header-cell-style="{background:'#FAFAFA',color:'#000'}">
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
                                <el-table-column width="100" align="center" label="操作">
                                    <template slot-scope="scope">
                                        <div class="oper_box">                                  
                                            <span v-if="!scope.row.relateFlag" @click="guanlianshenpi(scope.row)" class="icon-operate-btn iconfont duigou" title="关联审批">
                                            </span>
                                            <span v-if="scope.row.relateFlag" @click="quxiaoguanlianshenpi(scope.row)" class="icon-operate-btn iconfont quxiaoguanlian" title="取消关联审批">
                                            </span>                       
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
        </el-scrollbar>  
    </el-dialog>
    <!-- 选择创建人组件 -->
    <fintall-deptuser :findFlagShow.sync="selectPerson"
                      v-on:findAllUser="findAllUser"
                      :findUserObj="findUserObj"
                      :findState="findState"
                      :checkState="checkState">
    </fintall-deptuser>
    <!-- 选择审批类型 -->
    <!-- <back-approve v-if="selectBusinessVisibleback" :singleSele="2" :typeObjolg='businessTypeListback' :stateolg="stateolg"
                    v-on:typeProjectolg='typeProjectolg' @sendValueToParentback="projectTypeCloseback" :optStateolg="optStateolg" 
                    :hasSelect="queryObj.financingListback"> -->
    <back-approve v-if="selectBusinessVisibleback" :singleSele="1" :typeObjolg='businessTypeListback' :stateolg="stateolg"
                    v-on:typeProjectolg='typeProjectolg' @sendValueToParentback="projectTypeCloseback" :optStateolg="optStateolg"
                    :hasSelect="hasSelectExamType">
     </back-approve>
     <!-- 选择业务类型 -->
     <project-type v-if="selectBusinessVisible" :singleSele="2" :isProcessengineClick="false" :typeObj='BusinessTypeList' 
        :state="state" v-on:typeProject='typeProject' @sendValueToParent="projectTypeClose"
        :optState="optState" :hasSelect="queryObj.financingList">
    </project-type>
</div>
</template>
<script>
import fintallDeptuser from '@/components/select_box/findAllDeptUserMultipleNew'//选择人员
import projectType from "@/components/dialogcommon/projecttype";//业务类型
import backApprove from "@/components/dialogcommon/backApprove";//审批类型
export default {
    name: 'relatedApproval',
    props: ['relatedExamVisible', 'examObj'],
    components: {
        fintallDeptuser,
        backApprove,//选择审批类型
        projectType,//选择业务类型
    },
    data () {
        return {
            token: '',
            userId: '',
            queryObj: {
                projectName: '',
                examTypeName: '',//审批类型
                examTypeId: '',//审批类型id集合
                financingListback: [],//已选择的审批类型
                businessTypeNames: '',//业务类型
                businessTypeIds: [],
                financingList: [],//已选择的业务类型   
                stageName: '',//阶段名称
                stageId: '',//状态id
                creater: '',  
                createIds: []
            },
            selectStageList: [
                {label: '已通过',id: 0},
                {label: '未通过',id: 2},
                {label: '审批中',id: 1},
                {label: '已撤销',id: 3}
            ],//搜索条件中的审批状态
            tableDataCopied: [],//抄送我的列表
            selectPerson: false,//选择人员弹窗
            findState:{ state: 0 },//选择人员传值
            checkState:{},//选择人员传值
            deployObj: [],
            findUserObj: [],
            selectBusinessVisibleback: false,//选择审批类型弹窗
            selectBusinessVisible: false,//选择业务类型弹窗
            businessTypeListback: [],
            stateolg:1,
            state: 1,
            BusinessTypeList: [],//选择业务类型弹窗
            optState: { value: 2 },
            firstTitle: '0',//tabs切换
            tableDataForApprove: [],//待我审批列表
            tableDataApprovedTotal:[],
            tableDataApprovedFinish: [],
            tableDataApprovedChecking: [],//审批中
            tableDataMySponsorTotal:[],//我发起的
            activeNameSponsor:'first',//我发起的
            dataTotal: 0, //总量
            dataTotalSponsor: 0,
            finish: 0,//审批完成数量
            checking: 0,//我已审批-审批中个数
            finishSponsor: 0,//审批完成个数
            tableDataMySponsorFinish: [],//审批完成数据
            checkingSponsor: 0,//审批中个数
            tableDataMySponsorChecking: [],//审批中数据
            cancelSponsor: 0,//已撤销个数
            tableDataMySponsorCancel: [],//已撤销数据
            loading: true,
            index: "",
            activeName3: "first",
            handleSizeChangeinfo: "",//
            first1: true,
            first2: false,
            first3: false,
            first4 :false,
            tabId: "",
            firststate: false,
            relateFlag: false,//是否已关联
            hasSelectExamType: [],//搜索条件中已选择的审批类型，弹窗中回显用
            pageSizes: [10, 20, 50, 100], //每页显示数量
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

            dataTotalsMySponsorCancel: 0,
            pageSizeMySponsorCancel: 10,
            currentPageMySponsorCancel: 1,
        }
    },
    created () {
        this.token = this.$store.state.loginObject.userToken;
        this.userId = this.$store.state.loginObject.userId;
        this.success_code = this.code.codeNum.SUCCESS;
    },
    mounted(){
        this.pending()
    },
    filters: {
        msg(val){
            var dom = document.createElement('div')
            dom.innerHTML = val
            return val = dom.innerText
        }
    },
    methods: {
        sponsor() {
            this.$router.push("/sponsor");
        },
        clearState(){
            this.queryObj.stageId = ''
        },
        guanlianshenpi(obj){
            console.log('数据',obj)
            var sendData = {
                token: this.token,
                userId: this.userId,
                data:{
                    approvalId: this.examObj.id,
                    taskDefKey: this.examObj.taskDefKey,
                    relateApprovalId: obj.id
                }
            }
            this.$post("/info/audit/relevancy/relateApproval",sendData).then(res => {
                if (this.code.codeNum.SUCCESS == res.code) {
                    this.clickEvent()
                    this.$message.success(res.msg)    
                    this.emit('queryData')
                } else {
                    this.$message.warning(res.msg)
                }
            })
            .catch(err => {
            });
        },
        quxiaoguanlianshenpi(obj){
            this.$confirm('是否取消该关联', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.quxiaoBtnSend(obj)
                }).catch(() => {
            });
        },
        quxiaoBtnSend(obj){
            var sendData = {
                token: this.token,
                userId: this.userId,
                data:{
                    id: obj.relevancyApprovalId,
                }
            }
            this.$post("/info/audit/relevancy/cancelApproval",sendData).then(res => {
                if (this.code.codeNum.SUCCESS == res.code) {
                    this.clickEvent()
                    this.$message.success(res.msg)
                    this.emit('queryData')
                } else {
                    this.$message.warning(res.msg)
                }
            })
            .catch(err => {
            });
        },
        
        //审批类型返回值
        typeProjectolg(data){
            if(data.length != 0){
                this.queryObj.examTypeId = data[0].id || '';
                this.queryObj.examTypeName = data[0].label || ''  
            }else {
                this.queryObj.examTypeId = '';
                this.queryObj.examTypeName = ''
            }
            this.hasSelectExamType = this.$utils.cloneDeepArray(data);
        },
        //业务类型返回值
        typeProject(data){
            this.queryObj.businessTypeIds = [];
            console.log('返回的数据',data)
            let arr = []
            data.forEach((obj)=>{
                arr.push(obj.label)
                this.queryObj.businessTypeIds.push(obj.id)
            })
            this.queryObj.businessTypeNames = arr.length == 1 ? arr[0] : arr.join('、')//选择单个业务类型不加、
            this.queryObj.financingList = this.$utils.cloneDeepArray(data);
        },
        selectStageChange(val){
            for(var i=0;i<this.selectStageList.length;i++){
                if(val==this.selectStageList[i].label){
                    this.queryObj.stageId = this.selectStageList[i].id;
                }
            }
        },
        // 获取待我审批列表
        pending() {
            var sendData = {
                token: this.token,
                userId: this.userId,
                pageNo: this.currentPageForApprove,
                pageSize: this.pageSizeForApprove,
                data:{
                    id: this.examObj.id,//当前审批id
                    taskDefKey: this.examObj.taskDefKey,//审批节点id
                    projectName: this.queryObj.projectName,//项目名称
                    categoryId: this.queryObj.examTypeId,//审批类型id
                    status: this.queryObj.stageId,//已通过/1:审核中/2:未通过/3:已撤销,
                    userSet: this.queryObj.createIds,//[用户id]
                    financingSet: this.queryObj.businessTypeIds,//[业务类型id]
                }
            }
            this.$post("/info/audit/relevancy/listTodo",sendData).then(res => {
                if (this.code.codeNum.SUCCESS == res.code) {
                    this.tableDataForApprove = res.data.data.list;           
                    this.dataTotalsForApprove = res.data.data.total;
                    this.relateFlag = res.data.relateFlag
                    this.loading = false;
                }
            })
            .catch(err => {
                this.loading = false;
            });
        },
        handleClick (tab) {
            var tabId = tab.$vnode.componentInstance.index;
            this.tabId = tabId;
            this.currentPage = 1;
            if (this.index == 1) { // 我已审批
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
                } else if (tabId == 1) {
                    var queryState = [0, 2, 5, 6];
                    this.queryStates = queryState;
                    this.sponsors("", "", "", queryState);
                    this.pageSize = 10;
                } else if (tabId == 2) {
                    var queryState = [1];
                    this.pageSize = 10;
                    this.queryStates = queryState;
                    this.sponsors("", "", "", queryState);
                } else {
                    var queryState = [3];
                    this.queryStates = queryState;
                    this.pageSize = 10;
                    this.sponsors("", "", "", queryState);
                }
            }
            },
        //控制器
        onPageChange (...params) {
            let val = Array.from(params[0])[0]
            console.log('999',val)
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
                // case 'approvedCancel':
                //     this.currentPageApprovedCancel = val;
                //     break
                // case 'mySponsor':
                //     this.currentPageMySponsor = val;
                //     break
                case 'copied':
                    this.currentPageCopied = val;
                    break
                // case 'copied':
                //     this.currentPageCopied = val;
                //     break
                case 'sponsorTotal':
                    this.currentPageMySponsorTotal = val
                    break
                case 'sponsorFinish':
                    this.currentPageMySponsorFinish = val;
                    break;
                case 'sponsorChecking':
                    this.currentPageMySponsorChecking = val;
                    break;
                case 'sponsorCancel':
                    this.currentPageMySponsorCancel = val;
                    break;
            }
            this.onPageChangeinfo = val;
            var currentPage = val;
            if (this.index == "" || this.index == 0) {
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
                    this.finished("", currentPage, this.pageSizeApprovedTotal, queryState);
                } else if (this.tabId == 2) {
                    var queryState = [1];
                    this.queryStates = queryState;
                    this.finished("", currentPage, this.pageSizeApprovedTotal, queryState);
                } else {
                    var queryState = [3];
                    this.queryStates = queryState;
                    this.finished("", currentPage, this.pageSizeApprovedTotal, queryState);
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
                    var queryState = [1];
                    this.queryStates = queryState;
                    this.sponsors("", currentPage, "", queryState);
                } else {
                    var queryState = [3];
                    this.queryStates = queryState;
                    this.sponsors("", currentPage, "", queryState);
                }
            } else {
                this.Blind(currentPage, this.pageSizeCopied);
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
                case 'sponsorTotal':
                    this.pageSizeMySponsorTotal = currentPage;
                    break
                case 'sponsorCancel':
                    this.pageSizeMySponsorCancel = currentPage;
                    break
                case 'sponsorFinish':
                    this.pageSizeMySponsorFinish = currentPage;
                    break
                case 'sponsorChecking':
                    this.pageSizeMySponsorChecking = currentPage;
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
                    this.finished("", "", currentPage, queryState);
                } else if (this.tabId == 2) {
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
                    var queryState = [1];
                    this.queryStates = queryState;
                    this.sponsors("", "", currentPage, queryState);
                } else {
                    var queryState = [3];
                    this.queryStates = queryState;
                    this.sponsors("", "", currentPage, queryState);
                }
            } else {
                this.Blind(this.currentPageCopied, currentPage);
            }
        },
        content_xzs (tab) {
            let index=Number(tab.name)
            this.index = index;
            this.activeName3 = "first";
            this.handleSizeChangeinfo = ""
            if (index == 0) {
                this.pageSizeForApprove = 10
                this.first1 = true;
                this.first2 = false;
                this.first3 = false;
                this.first4 = false;
                this.firststate = false; 
                this.pending();            
            } else if (index == 1) {
                this.pageSizeApprovedFinish = 10
                this.currentPageApprovedFinish = 1
                this.first1 = true;
                this.firststate = true;
                this.queryObj.stageName = ''
                this.queryObj.stageId = ''
                this.finished();
            } else if (index == 2) {
                this.pageSizeMySponsorTotal = 10
                this.currentPageMySponsorTotal = 1;
                this.first1 = true;
                this.firststate = true;
                this.queryObj.stageName = ''
                this.queryObj.stageId = ''
                this.sponsors();     //我发起的      
            } else if (index == 3) {
                this.pageSizeCopied = 10
                this.currentPageCopied = 1;
                this.first1 = true; 
                this.firststate = false;    
                this.Blind();   
            }
        },
        projectTypeCloseback(){
            this.selectBusinessVisibleback = false;
        },
        projectTypeClose(){
            this.selectBusinessVisible = false;
        },
        // 取消
        clickEvent() { 
            this.$emit('update:relatedExamVisible',false);     
        },
        // 查询
        queryBtn() {
            this.currentPage = 1;
            if (this.index == "" || this.index == 0) {
                this.currentPageForApprove = 1
                this.pending(this.text);
            } else if (this.index == 1) {
                console.log('测试',this.tabId)
                if(this.tabId==='0' || this.tabId===''){
                    this.currentPageApprovedTotal = 1;
                    // this.pageSizeApprovedTotal = 10;
                }else if(this.tabId==='1'){
                    this.currentPageApprovedFinish = 1;
                    // this.pageSizeApprovedFinish = 10;
                }else if(this.tabId==='2'){
                    this.currentPageApprovedChecking = 1;
                    // this.pageSizeApprovedChecking = 10;
                }
                this.finished(this.text, "", "", this.queryStates);
            } else if (this.index == 2) {
                if(this.tabId==='0' || this.tabId===''){
                    this.currentPageMySponsorTotal = 1;
                    // this.pageSizeMySponsorTotal = 10;
                }else if(this.tabId==='1'){
                    this.currentPageMySponsorFinish = 1;
                    // this.pageSizeMySponsorFinish = 10;
                }else if(this.tabId==='2'){
                    this.currentPageMySponsorChecking = 1;
                    //this.pageSizeMySponsorChecking = 10;
                } else if(this.tabId==='3'){
                    this.currentPageMySponsorCancel = 1;
                    //this.pageSizeMySponsorCancel = 10;
                }
                this.sponsors(this.text, "", "", this.queryStates);
            } else {
                this.currentPageCopied = 1
                this.Blind();
            }
        },   
        reset () {
            this.queryObj = {
                projectName: '',
                examTypeName: '',//审批类型
                examTypeId: '',//审批类型id集合
                financingListback: [],//已选择的审批类型
                businessTypeNames: '',//业务类型
                businessTypeIds: [],
                financingList: [],//已选择的业务类型   
                stageName: '',//阶段名称
                stageId: '',//状态id
                creater: '',  
                createIds: []
            }
        },   
        //已办
        finished (text, currentPage=1, currentPageval=10, queryState) {
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
                    id: this.examObj.id,//当前审批id
                    taskDefKey: this.examObj.taskDefKey,//审批节点id
                    projectName: this.queryObj.projectName,//项目名称
                    categoryId: this.queryObj.examTypeId,//审批类型id
                    status: this.queryObj.stageId,//已通过/1:审核中/2:未通过/3:已撤销,
                    userSet: this.queryObj.createIds,//[用户id]
                    financingSet: this.queryObj.businessTypeIds,//[业务类型id]
                    queryState: queryState
                }
            };
            var url = "info/audit/relevancy/listCompleted";
            var _this = this;
            // this.loading = true;
            this.$post(url, data)
                .then((response) => {
                    this.loading = false;
                    if(response.code!==0){
                        this.$message.error(response.msg)
                        return
                    }
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
                    // _this.cancel = response.data.cancel;
                    // _this.loading = false;
                })
                .catch( (error)=> {
                    this.loading = false;
                    console.log(error);
                });
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
                    id: this.examObj.id,//当前审批id
                    taskDefKey: this.examObj.taskDefKey,//审批节点id
                    projectName: this.queryObj.projectName,//项目名称
                    categoryId: this.queryObj.examTypeId,//审批类型id
                    status: this.queryObj.stageId,//已通过/1:审核中/2:未通过/3:已撤销,
                    userSet: this.queryObj.createIds,//[用户id]
                    financingSet: this.queryObj.businessTypeIds,//[业务类型id]
                    queryState: queryState
                }
            };
            // this.loading = true
            var url = "/info/audit/relevancy/listMyApply";
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
        Blind(currentPage=1, currentPageval=10) {
            let pageNo = currentPage
            let pageSize = currentPageval
            var data = {
                token: this.$store.state.loginObject.userToken,
                userId: this.$store.state.loginObject.userId,
                pageNo: pageNo,
                pageSize: pageSize,
                sourceName:"我的审批-抄送我的", //页面位置，记录日志用
                projectName:this.$store.state.projectMsg.projectMsg.name, //项目名称，记录日志用
                data: {
                    id: this.examObj.id,//当前审批id
                    taskDefKey: this.examObj.taskDefKey,//审批节点id
                    projectName: this.queryObj.projectName,//项目名称
                    categoryId: this.queryObj.examTypeId,//审批类型id
                    status: this.queryObj.stageId,//已通过/1:审核中/2:未通过/3:已撤销,
                    userSet: this.queryObj.createIds,//[用户id]
                    financingSet: this.queryObj.businessTypeIds,//[业务类型id]
                }
            };
            var url = "/info/audit/relevancy/listMycarbonCopy";
            var _this = this;
            this.loading = true
            this.$post(url, data).then((response) => {
                this.loading = false
                if(response.code!==0){
                    this.$message.error(response.msg)
                    return
                }
                _this.tableDataCopied = response.data.data.list;
                _this.dataTotalsCopied = response.data.data.total;
                _this.loading = false;
            }).catch( (error)=> {
                _this.loading=false
            });
        },
        seleCreater(){
            this.selectPerson = true;
        },
        findAllUser (data) {
            this.deployObj = data;
            var string = "", userIds = [];
            for(var i = 0; i<this.deployObj.length; i++){
                var objname = {};
                objname.name = this.deployObj[i].name;
                string = string + data[i].name + "、";
                userIds.push(data[i].userId)
            }
            this.queryObj.creater  = string;
            this.queryObj.createIds  = userIds;
            this.selectPerson = false;
            this.checkState = {};
            this.findUserObj = data
        },
        selectTestType(val){ //审批类型
            this.selectBusinessVisibleback = false;
            var typeObjab = { "token": this.token, "userId": this.userId, "data": {} } ;
            var that = this;
            this.$post("/info/service/getUsableProcessType",typeObjab).then((response => {
                var data =  response.data;
                if(response.code == that.code.codeNum.SUCCESS){
                    that.selectBusinessVisibleback = true;
                    that.stateolg = 2;
                    that.businessTypeListback = data;
                    that.optStateolg = {value:val};
                
                }else{
                    this.$message(response.msg);
                }
            })).catch(error => {

            });
        },
        businessTypeSele(){//选择业务类型
            var sendData = { "token": this.token, "userId": this.userId, "data": {} } ;
            var that = this;
            this.$post("/info/project/getAllFinanceType", sendData).then((response => {
                var data =  response.data;
                if(response.code == that.code.codeNum.SUCCESS){
                    that.selectBusinessVisible = true;
                    that.state = 2;
                    that.BusinessTypeList = data;
                    that.optState = {value:val};
                }else{
                    this.$message(response.msg);
                }
            })).catch(error => {

            });
        },
    },
    watch: {
       
    }
}
</script>
<style scoped lang="scss">
.content-title {
    padding-bottom: 10px;
}
.content-title span{
    padding-top: 6px;
    padding-left: 20px;
}
.business-select{
    position: relative;
    .el-button{
        position: absolute;
        width: 70px;
        right: 0;
        top: 0;
    }
}
.wfqdinnfo .el-tabs__nav{
    margin-left: 15px;
}
#related-approval .has-sub-tab .el-tabs__nav:nth-child(1) {
  margin-left: 14px;
}
.clearfix2 {
    display: flex;
    flex-wrap: wrap;
}
.q-246{
    width: 220px;
}
.q-170{
    width: 170px; 
}
.el-button {
    margin-left: 20px;
    height: 40px;
    line-height: 1;
}
.start-btn{
    width: 90px;
    height:40px;
    margin-right: 20px;
}
.search-box{
    margin-bottom: 10px;
    .el-button {
        float: left;
    }
}
.pagination {
    background-color: #fff;
    position: absolute;
    bottom: 20px;
    right: 10px;
    width: 99%;
    text-align: right;
    border-top: 1px solid #dedede;
    padding-top: 20px;
}
.my-approve .el-table p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.project-table {
    padding-left: 20px;
    padding-right: 20px;
    /* width: 96%; */
}
.project-table .el-table{
    margin-bottom:16px;
}
.el-table::before {
    height:0 !important;
}
.pages{
    text-align: right;
}
</style>
<style lang="scss">
.my-approve.el-tabs.el-tabs--top.el-tabs--border-card>.el-tabs__content{
  padding: 15px 0;
}
#related-approval .lists .el-dialog{
    width: 96%;
    height: calc(98% - 68px);
    margin-top: 68px!important;
}
#related-approval .el-dialog__header{
    height: 24px;
}
#related-approval .el-dialog__body{
    height: calc(100% - 56px);
    overflow-y: auto;
    padding-top: 10px;
}
</style>