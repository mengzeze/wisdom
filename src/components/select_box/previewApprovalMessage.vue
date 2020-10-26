<template>
    <div id="preview-approval">
        <el-dialog title="审批流程预览" center width="890px" :close-on-click-modal="false" :visible="previewApprovalShow" @close="clickEvent">
               <el-scrollbar style="height:100%">
                   <div class='approval-body'>
                       <header>
                           <h3>项目信息</h3>
                           <div class="approval-title">
                                    <div><span>审批类型</span><span :title="columnData.approvalTypeName || '无'">{{columnData.approvalTypeName || '无'}}</span></div>
                                    <div></div>
                                    <div><span>业务类型</span><span  :title="columnData.finaTypeName || '无'">{{columnData.finaTypeName || '无'}}</span></div>
                                    <div><span>当前阶段</span><span  :title="columnData.progStageName || '无'">{{columnData.progStageName || '无'}}</span></div>
                                    <div><span>项目名称</span><span  :title="columnData.projectName || '无'">{{columnData.projectName || '无'}}</span></div>
                                    <div><span>项目编码</span><span  :title="columnData.projectCode || '无'">{{columnData.projectCode || '无'}}</span></div>
                            </div>
                            <div class="request-content">
                                <span>申请内容</span>
                                <!-- {{queryList.remarks ? queryList.remarks : ' '}} -->
                                <div>无</div>
                            </div>
                           <h3>上传附件</h3>
                           <div class="approval-title">
                                <div><span class='approvalfj'>附件</span><label>暂无附件</label></div>
                           </div>
                       </header>
                       <article>
                           <h3 class="clearfix">
                               <p class="fl">审批流程</p>
                               <p class="fr" style="margin-right:30px;" v-if="(columnData.projectId || urlType == 1) && approvalData.length >1">
                                     <el-button type="text" class="more-stage" @click="showAllBtn(2)">
                                        展开
                                        <i class="iconfont jiantou" style="font-size: 12px;"></i>
                                    </el-button>
                                </p>
                           </h3>
                           <!-- 无项目id且类型为0  !queryList.projectId && urlType == 0-->
                           <div v-if="(!columnData.projectId || urlType == 0) && approvalData.length">
                                <div class="approval-content" v-for="(item, index) in approvalData" :key="index + 1">
                                    <nav><b>{{item.level}}级审批:</b>&nbsp;&nbsp;&nbsp;<span>( {{item.approvalTypeName}} )</span></nav>
                                    <div v-if="item.approver" class="approver-box">
                                        <div><span><el-checkbox v-model="item.approver.returnAuditAssignee.initiator" disabled></el-checkbox>发起人</span></div>
                                        <div><span><el-checkbox v-model="item.approver.returnAuditAssignee.lastStep" disabled></el-checkbox>上一步执行人</span></div>
                                        <div class='approval-tag'><span><el-checkbox v-model="item.approver.returnAuditAssignee.userChecked" disabled></el-checkbox>指定用户</span>
                                            <div v-if="item.approver.returnAuditAssignee.usersName">
                                                <el-tag v-for="(o,t) in item.approver.returnAuditAssignee.usersName" :key="t" :title="o.name" class="tags ellipsis1">{{o.name}}
                                                </el-tag>
                                            </div>
                                        </div>
                                        <div  class='approval-tag'><span><el-checkbox v-model="item.approver.returnAuditAssignee.roleChecked" disabled></el-checkbox>指定角色</span>
                                            <div v-if="item.approver.returnAuditAssignee.sysRoleData"><el-tag v-for="(m, n) in  item.approver.returnAuditAssignee.sysRoleData " :key="n" :title="`${m.roleName} | ${m.front == 'front' ? '前台' : '后台'}`" class="tags ellipsis1">{{m.roleName}} | {{m.front == 'front' ? '前台' : '后台'}}</el-tag></div>
                                        </div>
                                        <div><span><el-checkbox v-model="item.approver.returnAuditAssignee.supervisor" disabled></el-checkbox>部门主管</span><span v-show="item.approver.returnAuditAssignee.supervisorNum > 0">发起人的：{{item.approver.returnAuditAssignee.supervisorNum}}级主管</span></div>
                                    </div>
                                    <div v-else>暂未选择审批人</div>
                                    <div>
                                        <p>抄送人:</p>
                                        <div>
                                            <div v-if="item.nodeCarbonCopy" class="approver-box">
                                                <div><span><el-checkbox v-model="item.nodeCarbonCopy.returnAuditAssignee.initiator" disabled></el-checkbox>发起人</span></div>
                                                <div><span><el-checkbox v-model="item.nodeCarbonCopy.returnAuditAssignee.lastStep" disabled></el-checkbox>上一步执行人</span></div>
                                                <div class='approval-tag'><span><el-checkbox v-model="item.nodeCarbonCopy.returnAuditAssignee.userChecked" disabled></el-checkbox>指定用户</span>
                                                    <div v-if="item.nodeCarbonCopy.returnAuditAssignee.usersName">
                                                        <el-tag v-for="(o,t) in item.nodeCarbonCopy.returnAuditAssignee.usersName" :key="t" :title="o.name" class="tags ellipsis1">{{o.name}}
                                                        </el-tag>
                                                    </div>
                                                </div>
                                                <div  class='approval-tag'><span><el-checkbox v-model="item.nodeCarbonCopy.returnAuditAssignee.roleChecked" disabled></el-checkbox>指定角色</span>
                                                    <div v-if="item.nodeCarbonCopy.returnAuditAssignee.sysRoleData"><el-tag v-for="(m, n) in  item.nodeCarbonCopy.returnAuditAssignee.sysRoleData " :key="n" :title="`${m.roleName} | ${m.front == 'front' ? '前台' : '后台'}`" class="tags ellipsis1">{{m.roleName}} | {{m.front == 'front' ? '前台' : '后台'}}</el-tag></div>
                                                </div>
                                                <div><span><el-checkbox v-model="item.nodeCarbonCopy.returnAuditAssignee.supervisor" disabled></el-checkbox>部门主管</span><span v-show="item.nodeCarbonCopy.returnAuditAssignee.supervisorNum > 0">发起人的：{{item.nodeCarbonCopy.returnAuditAssignee.supervisorNum}}级主管</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                           </div>
                           <!-- 有项目id 并且type为1-->
                           <!-- <div> -->
                               <div :class="[{'pro-doc-operation-max':moreHandleAutoH},{'pro-doc-operation2':!moreHandleAutoH},'pro-doc-operation','clearfix']" v-if="urlType == 1 && approvalData.length">
                                    <div class="approval-content" v-for="(item, index) in approvalData" :key="index">
                                        <nav><b>{{item.level}}级审批:</b>&nbsp;&nbsp;&nbsp;<span>( {{item.approvalTypeName}} )</span></nav>
                                            <div v-if="item.list && item.list.length">
                                                <div class='approval-tag'><span style="margin-right:20px;flex-shrink: 0;">审批人:</span>
                                                    <el-tag v-for="(o,t) in  item.list" :key="t" :title="o" class="tags ellipsis1">{{o}}</el-tag></div>
                                                </div>
                                            <div class='approval-tag' v-else>暂未匹配到对应的审批人</div>
                                    </div>
                                </div>
                                <div style="margin-top: 12px;padding: 10px;" v-if="(columnData.projectId || urlType == 1) && approvalData.length">
                                    <p class="fl" style="margin-left:20px;margin-right:10px;">抄送人:</p>
                                    <div>
                                        <el-tag v-for="(item,index) in colyObj" :key="'info2'+index" class="userbtn" style="margin-left:10px;margin-bottom:10px;">
                                            {{item}}
                                        </el-tag>
                                    </div>
                                </div>
                           <!-- 没有审批流程的信息 -->
                            <div v-if="!approvalData.length" style="margin-left: 30px;">暂未配置流程图</div>
                       </article>
                   </div>
               </el-scrollbar>
        </el-dialog>
</div>
</template>
<script>
    export default {
        name: 'previewApprovalMessage',
        props: ['previewApprovalShow', 'columnData'],
        data () {
            return {
                token: '',
                userId: '',
                isPC: this.$store.state.isPC,
                projectId: this.$store.state.projectMsg.pro_id,
                urlType: 0,
                isShowLoading: false,
                approvalData: [],
                colyObj:[],
                moreHandleAutoH: false,
                packBtnVisible: false,
                moreHandleBtnVisible: false,
                packHandleVisible: false,
        }
    },
        created () {
            this.token = this.$store.state.loginObject.userToken;
            this.userId = this.$store.state.loginObject.userId;
            this.success_code = this.code.codeNum.SUCCESS;
        },
        mounted(){
        },
        methods: {
            showAllBtn(type){
                this.moreHandleAutoH = !this.moreHandleAutoH;
                this.packHandleVisible = true;

            },
            // 取消
            clickEvent() {
                this.$emit('update:previewApprovalShow',false);
                this.approvalData = []
            },
            // 查询
            query() {
                // console.log('query', this.columnData, this.columnData.projectId, this.urlType)
                // urlType为0（或者项目id不存在的时候）--走后台的查询----反之走前台的
                let url = this.urlType == 0 ? '/info/service/processPreview' : '/info/audit/approvalPreview'
                let obj = {
                    procDeployId: this.columnData.deploymentId,
                    procVersionNum: this.columnData.versionId,
                    actModelId: this.columnData.modelId
                }
                let approvalObj = {
                    modelId: this.columnData.modelId,// 模型id--取列表中的actModelId
                    deploymentId: this.columnData.deploymentId,// 取列表中的-procDeployId
                    versionId: this.columnData.versionId, // 主版本号--procVersionNum
                    financingTypeId: this.columnData.financingTypeId,// 融资类型对应的id
                    projectName: this.columnData.projectName, // 项目名称progStageName
                    projectId:this.columnData.projectId,// 项目id
                    procName: this.columnData.procName,//审批名称
                    approvalType: this.columnData.approvalType
                }
                let proviewData = {
                    token:this.token,
                    userId:this.userId,
                    projectId: this.projectId,
                    data: this.urlType == 0 ? obj : approvalObj
                }
                    this.isShowLoading = true;
                this.$post(url, proviewData).then(res=>{
                    this.isShowLoading = false;
                    if (!res) return
                    if (res.code == -3033) {
                        this.$message.error('暂未配置流程图')
                        return
                    }
                    if (res.code !== 0 && res.code !== -3033) {
                        this.$message.error(res.msg)
                        return
                    }
                    if (res.data) {
                        res.data.list.forEach(v => {
                            if (v.approver && v.approver.returnAuditAssignee) {
                                // 指定用户、指定角色、部门主管
                                v.approver.returnAuditAssignee.usersName ? v.approver.returnAuditAssignee.userChecked = true : v.approver.returnAuditAssignee.userChecked = false
                                if ((v.approver.returnAuditAssignee.sysRoleName && v.approver.returnAuditAssignee.sysRoleName.length) || (v.approver.returnAuditAssignee.projectRoleName && v.approver.returnAuditAssignee.projectRoleName.length)) {
                                    v.approver.returnAuditAssignee.roleChecked = true
                                    if (v.approver.returnAuditAssignee.projectRoleName !== null && v.approver.returnAuditAssignee.sysRoleName !== null) {
                                        v.approver.returnAuditAssignee.sysRoleData = v.approver.returnAuditAssignee.sysRoleName.concat(v.approver.returnAuditAssignee.projectRoleName)
                                    } else if (v.approver.returnAuditAssignee.projectRoleName == null) {
                                        v.approver.returnAuditAssignee.sysRoleData = v.approver.returnAuditAssignee.sysRoleName
                                    } else if (v.approver.returnAuditAssignee.sysRoleName == null) {
                                        v.approver.returnAuditAssignee.sysRoleData = v.approver.returnAuditAssignee.projectRoleName
                                    }
                                } else {
                                    v.approver.returnAuditAssignee.roleChecked = false
                                }
                            }
                            if (v.nodeCarbonCopy && v.nodeCarbonCopy.returnAuditAssignee) {
                                // 指定用户、指定角色、部门主管
                                v.nodeCarbonCopy.returnAuditAssignee.usersName ? v.nodeCarbonCopy.returnAuditAssignee.userChecked = true : v.nodeCarbonCopy.returnAuditAssignee.userChecked = false
                                if ((v.nodeCarbonCopy.returnAuditAssignee.sysRoleName && v.nodeCarbonCopy.returnAuditAssignee.sysRoleName.length) || (v.nodeCarbonCopy.returnAuditAssignee.projectRoleName && v.nodeCarbonCopy.returnAuditAssignee.projectRoleName.length)) {
                                    v.nodeCarbonCopy.returnAuditAssignee.roleChecked = true
                                    if (v.nodeCarbonCopy.returnAuditAssignee.projectRoleName !== null && v.nodeCarbonCopy.returnAuditAssignee.sysRoleName !== null) {
                                        v.nodeCarbonCopy.returnAuditAssignee.sysRoleData = v.nodeCarbonCopy.returnAuditAssignee.sysRoleName.concat(v.nodeCarbonCopy.returnAuditAssignee.projectRoleName)
                                    } else if (v.nodeCarbonCopy.returnAuditAssignee.projectRoleName == null) {
                                        v.nodeCarbonCopy.returnAuditAssignee.sysRoleData = v.nodeCarbonCopy.returnAuditAssignee.sysRoleName
                                    } else if (v.nodeCarbonCopy.returnAuditAssignee.sysRoleName == null) {
                                        v.nodeCarbonCopy.returnAuditAssignee.sysRoleData = v.nodeCarbonCopy.returnAuditAssignee.projectRoleName
                                    }
                                } else {
                                    v.nodeCarbonCopy.returnAuditAssignee.roleChecked = false
                                }
                            }

                        })
                        this.approvalData = res.data.list
                        console.log(this.approvalData, 'this.approvalData')
                        this.colyObj = res.data.carbonCopy
                        return
                    }
                    this.approvalData = []
                }).catch(error => {
                    console.log(error);
                });
            }
        },
        watch: {
            previewApprovalShow (val) {
                if (val) {
                    // 当发起审批中没有选择项目时，需要改变接口调用
                    !this.columnData.projectId ? this.urlType = 0 : this.urlType = 1
                    this.query()
                }
            }
        }
    }
</script>

<style scoped lang="scss">
.approval-body{
    min-height: calc(100vh -506px);
    max-height: calc(100vh - 170px);
    .tags {
        max-width: calc(100% - 5px);
        margin-right: 5px;
    }
}
.approval-tag .tags{
    max-width: 200px;
}
.level{
      font-weight: 600;
      color:rgba(51,51,51,1) !important;
  }
  .approval-content{
    margin: 15px 12px 0 30px;
    border-bottom: 1px dashed rgba(220,223,230,1);
    .approver-box {
        margin: 15px 0;
         >div {
            >span:nth-child(1){
            min-width: 70px;
            max-width: 110px;
            display: inline-block;
            margin-right: 15px;
            color:rgba(96,98,102,1);
            flex-shrink:0;
            .el-checkbox{
                margin-right: 10px !important;
            }
        }
        >span:nth-of-type(2) {
            color:rgba(0,0,0,1);
            font-weight:400;
        }
        }

    }
  }
  .approver-box >div{
    margin: 15px 0;
  }
  nav{
      b{
        font-weight:600;
        color:rgba(45,45,45,1);
      }
      span{
        color:rgba(86,87,91,1);
      }
  }
  .approval-tag{
      display: flex;
      justify-content: flex-start;
      margin: 15px 0;
      width: 100%;
      flex-wrap: wrap;
      >span{
          max-width: 70px;
          margin: 7px 0;
      }
      >div{
        max-height: 149px;
        overflow-y: auto;
        max-width: 690px;
      }
  }
  header, article{
      h3{
        font-size:16px;
        font-weight:500;
        color:rgba(48,49,51,1);
        margin: 10px 0;
        line-height: 43px;
      }
      .approval-title {
          display: flex;
          justify-content: space-between;
          margin-left: 30px;
        //   margin-bottom: 15px;
         flex-wrap: wrap;
          >div{
              width: 50%;
              margin: 5px 0;
              display: flex;
              >span:nth-child(1){
                display: inline-block;
                margin-right: 15px;
                color:rgba(96,98,102,1);
              }
              >span:nth-of-type(2) {
                 color:rgba(0,0,0,1);
                 width: 290px;
                 font-weight:400;
                 overflow: hidden;
                 white-space: nowrap;
                 text-overflow: ellipsis;
              }
              label{
                  font-weight:400;
                  color:rgba(153,153,153,1);
              }
          }
      }
      .approval-projectConten {
          margin-left: 30px;
          margin-bottom: 15px;
           p{
              margin: 6px 0;
              >span:nth-child(1){
                width: 60px;
                text-align: right;
                display: inline-block;
                margin-right: 15px;
                color:rgba(96,98,102,1);
              }
              >span:nth-of-type(2) {
                 color:rgba(0,0,0,1);
                 font-weight:400;
              }
          }
      }
      .approval-check{
          border-top: 1px dashed rgba(220,223,230,1);
          padding: 15px 0 10px 30px;
      }
      .approval-checkAll{
          padding:  8px 0px;
      }
      .approval-checkAll, .approval-check{
        //   border-top: 1px dashed rgba(220,223,230,1);
          border-bottom: 1px dashed rgba(220,223,230,1);
          >div{
              display: flex;
              justify-content: space-between;
              padding: 0 35px 10px 0;
              >button{
                  color: rgba(0,97,169,1);
                  cursor: pointer;
                  background: #fff;
              }
          }
          .approval-group{
              display: flex;
              flex-direction: column;
              max-height: 300px;
              overflow-y: auto;
            overflow-x: hidden;
            margin-right: 20px;
              .el-checkbox{
                  padding: 8px 0;
              }
          }
      }
  }
  article{
      padding: 15px 0;
  }
  .addborder {
    margin-left: 0px !important;
    padding: 15px 0 15px 30px;
    border-bottom: 1px dashed rgba(220,223,230,1);
  }

.request-content{
    display: flex;
    align-items: center;
    margin-left: 30px;
    span{
        display: inline-block;
        margin-right: 15px;
    }
    >div{
        color:rgba(0,0,0,1);
        font-weight:400;
        width: 690px;
        max-height: 118px;
        overflow-y: auto;
        padding: 5px 5px 5px 0;
        border-radius: 4px;
        line-height: 25px;
        font-weight:400;
    }
    >div:hover{
        background:rgba(240,242,245,1);
    }
}
.approvalfj{
    margin-right: 50px!important;
}
.btnRight{
    display: flex;
    justify-content: space-between;
    padding-right: 30px;
}
  .doc-owname {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
  }
  .attachemnt-list-doc {
      cursor: pointer;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 500px;
  }
  .doc-name {
      cursor: pointer;
       overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 500px;
  }
  .select-box {
        display: flex;
        width: 100%;
  }
  .attachemnt-list-item .el-checkbox{
      display: flex;
      align-items: center;
  }
  .approval-group1{
      max-height: 300px;
      overflow-y: auto;
    overflow-x: hidden;
    margin-right: 20px;
  }
    .pro-doc-operation-max{
      height:auto;
  }
   .pro-doc-operation2{
      height: 100px;
      overflow: hidden;
  }
</style>
