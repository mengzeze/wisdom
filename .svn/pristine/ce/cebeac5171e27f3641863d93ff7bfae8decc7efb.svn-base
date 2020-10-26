<template>
    <div id="approvalRecords">
        <el-dialog title="审批记录" center width="890px" :close-on-click-modal="false" :visible="approvalRecordShow" @close="clickEvent">
               <el-scrollbar style="height:100%">
                   <div class='approval-body'>
                        <!-- 项目信息 -->
                        <header>
                            <h3>项目信息</h3>
                            <div class="approval-projectConten">
                                    <p><span>项目名称:</span><span>{{queryList.projectName}}</span></p>
                                    <p><span>项目编码:</span><span>{{queryList.projectCode}}</span></p>
                                    <p><span>当前阶段:</span><span>{{queryList.projectStageName}}</span></p>
                                    <p><span>提交人:</span><span>{{queryList.username}}</span></p>
                                    <p><span>提交时间:</span><span>{{queryList.time}}</span></p>
                                    <p>
                                        <span>审批状态:</span>
                                        <span :class="{'stateSuccess': queryList.status === '已通过',
                                                        'statewarn': queryList.status === '审批中',
                                                        'stateNo': queryList.status === '未审批',
                                                        'stateNoPass': queryList.status === '未通过'}">{{queryList.status}}
                                        </span>
                                    </p>
                                    <div class="request-content"><span>申请内容:</span>
                                        <div v-if="queryList.remarks">{{queryList.remarks}}</div>
                                    </div>
                                    <p><span>提审{{(categoryId == 2 || categoryId == 10)?'文件':'目录'}}:</span>
                                        <el-button type="primary" v-if="this.$route.path !== '/Filepage'" @click="approvalList">查看审批{{categoryId == 2?'文件':categoryId == 10?'文件修订':categoryId == 3?'目录':"目录修订"}}列表</el-button>
                                        <el-button type="primary" @click="approvalComment">查看{{categoryId == 2?'文件':categoryId == 10?'文件修订':categoryId == 3?'目录':"目录修订"}}审批意见</el-button>
                                    </p>
                            </div>
                            <!-- 附件 -->
                            <div class="approval-check" >
                                <div>
                                    <el-checkbox v-if="queryList.attachment && queryList.attachment.length" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">审批附件</el-checkbox>
                                    <span v-else> 审批附件</span>
                                    <button  v-if="queryList.attachment && queryList.attachment.length" @click="downLoadFiles(1, attachment)">下载</button>
                                </div>
                                <el-checkbox-group v-model="attachment" @change="handleCheckedCitiesChange" class="approval-group">
                                    <ul>
                                        <li v-for="item in queryList.attachment" class="attachemnt-list-item" :key="item.fileId">
                                        <el-checkbox :label="item.fileId" class='select-box'>
                                            <p class="attachemnt-list-doc">
                                                <span class="doc-name" @click="handleUploadFilePreview(item)" :title="item.fileName">{{item.fileName}}</span>
                                            </p>
                                        </el-checkbox>
                                        </li>
                                    </ul>
                                </el-checkbox-group>
                            </div>
                        </header>
                        <article>
                             <h3 class="clearfix">
                                 <p class="fl">审批信息</p>
                                 <p class="fr" style="margin-right:30px;" v-if="iconshow">
                                     <el-button type="text" class="more-stage" @click="showAllBtn(2)">
                                        展开
                                        <i class="iconfont jiantou" style="font-size:12px;"></i>
                                    </el-button>
                                </p>
                             </h3>
                             <div :class="[{'pro-doc-operation-max':moreHandleAutoH},{'pro-doc-operation2':!moreHandleAutoH},'pro-doc-operation','clearfix']">
                                 <div>
                                     <div v-for="(item, ind) in tableData" :key="ind" >
                                        <div class="approval-projectContent">
                                                <p  class="btnRight">
                                                    <span>
                                                        <span class="level">{{item.level}}级审批:</span>
                                                        <span style="margin-right:20px;color:rgba(96,98,102,1);"> ( {{item.approvalTypeName}} )</span>
                                                    </span>
                                                    <span :class="{'stateSuccessa': item.status === '已通过',
                                                                    'statewarna': item.status === '审批中',
                                                                    'stateNoa': item.status === '未审批',
                                                                    'stateNoPassa': item.status === '未通过'}">{{item.status}}</span>
                                                </p>
                                                <div v-for="(o, index) in item.list" :key="index">
                                                    <div>
                                                        <p><span>审批人:</span>
                                                            <span v-if="o.ownerName">{{o.ownerName}} --->{{o.username}}</span>
                                                            <span v-else>{{o.username}}</span>
                                                            </p>
                                                        <p  v-if="!o.ownerName"><span>审批时间:</span><span>{{o.createDate}}</span></p>
                                                        <p  v-if="o.ownerName"><span>转交时间:</span><span>{{o.createDate}}</span></p>
                                                        <p  v-if="!o.ownerName"><span>审批结果:</span><span>{{o.status}}</span></p>
                                                        <p v-if="o.ownerName"><span>转交理由:</span><span class="doc-owname" :title="o.ownerContext">{{o.ownerContext}}</span></p>
                                                        <div class="request-content"  v-if="!o.ownerName"><span>审批意见:</span>
                                                            <div v-if="o.comment">{{o.comment}}</div>
                                                            <div v-if="!o.comment && !o.ownerName && o.status"> - </div>
                                                        </div>
                                                    </div>

                                                    <div class="approval-checkAll">
                                                        <div v-if="o.commentAttachment && o.commentAttachment.length">
                                                            <el-checkbox :indeterminate="o['isIndeterminate']" v-model="o['checkAll']" @change="checked => handleCheckAll(checked, index, o, ind, item)">附件</el-checkbox>

                                                            <button @click="downLoadFiles(2, o, index, item)">下载</button>
                                                        </div>
                                                        <div v-else> 附件</div>


                                                            <ul>
                                                                <li v-for="(m, index) in o.commentAttachment" class="attachemnt-list-item" :key="index">
                                                                       <el-checkbox-group v-model="o['attachments']" @change="checked => handleCheckedCities(checked, index, o, ind, item,m)" class="approval-group1">
                                                                            <el-checkbox :label="m.fileId">
                                                                                <p class="attachemnt-list-doc">
                                                                                    <span class="doc-name" @click="handleUploadFilePreview(m, projectId)" :title="m.fileName">{{m.fileName}}</span>
                                                                                </p>
                                                                            </el-checkbox>
                                                                    </el-checkbox-group>
                                                                </li>
                                                            </ul>

                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                 </div>
                             </div>
                             <!-- 审批抄送人 -->
                            <div style="padding:10px;">
                                <p style="margin: 0 0 10px 17px;" class="fl"><span>抄送人:</span></p>
                                <el-tag v-for="(item,index) in colyObj" :key="'info2'+index" class="userbtn" style="margin-left:10px;margin-bottom:10px;">{{item.name}} </el-tag>
                            </div>
                        </article>
                   </div>
               </el-scrollbar>
        </el-dialog>
        <!-- 文件审批记录-没有回复 -->
        <approval-comment
            :approvalShow.sync="approvalShow"
            :approvalData="approvalData">
        </approval-comment>
</div>
</template>
<script>
    import approvalComment from "@/components/select_box/approvalComment";
    export default {
        name: 'approvalRecord',
        components: {
            approvalComment
        },
        props: ['approvalRecordShow', 'approvalRecordObj'],
        data () {
            return {
                isPC: this.$store.state.isPC,
                categoryId:"",
                token: '',
                userId: '',
                projectId: '',
                projectName:'',
                tableData: [],
                 checkAll: false,
                 attachment: [], //审核附件的数组
                isIndeterminate: false,
                isIndeterminateAll: false,
                queryList: {},
                // 没有回复弹框审批记录
                approvalShow: false,
                approvalData: {},
                addFiles: false,
                colyObj:[],
                moreHandleAutoH: false,
                packBtnVisible: false,
                moreHandleBtnVisible: false,
                packHandleVisible: false,
                iconshow:false,
                arraydatas:[]
            }
        },
        created () {
            this.token = this.$store.state.loginObject.userToken;
            this.userId = this.$store.state.loginObject.userId;
            this.success_code = this.code.codeNum.SUCCESS;


        },
        mounted(){},
        methods: {
            showAllBtn(type){
                this.moreHandleAutoH = !this.moreHandleAutoH;
                this.packHandleVisible = true;
                this.iconshow = false
            },
            // 取消
            clickEvent() {
                this.$emit('update:approvalRecordShow',false);
                this.moreHandleAutoH = false
                this.iconshow = false
                this.isIndeterminate = false
                this.checkAll = false
                this.attachment.splice(0)
                this.queryList = []
                this.tableData = []
            },
            // 查询
            query() {
                this.projectId = this.approvalRecordObj.item.projectId
                this.projectName = this.approvalRecordObj.item.projectName
                this.categoryId = this.approvalRecordObj.item.categoryId
                let obj = {
                    token: this.$store.state.loginObject.userToken,
                    userId: this.$store.state.loginObject.userId,
                    data: {
                        approvalId: this.approvalRecordObj.approvalId,
                        projectId: this.projectId
                    }
                }
               this.$post('/info/audit/approval_record_list_new', obj).then((response) => {
                    if (!response) {
                        this.$message.error(response.msg)
                        return
                    }
                    if (response.code !== 0) {
                        this.$message.error(response.msg)
                        return
                    }
                   response.data.list.forEach(v => {
                       v.list.forEach(o => {
                        o.isIndeterminate = false
                        o.checkAll = false
                        o.attachments = []
                       })
                   })

                   this.queryList = response.data
                   this.tableData = response.data.list;
                    this.tableData.forEach(v=>{
                      v.list.forEach(l=>{
                        this.$set(l, 'checkAll', false)
                      })
                    })


                   if(this.tableData.length>1 || this.tableData[0].list.length>1){
                        this.iconshow = true
                   }else{
                    this.moreHandleAutoH = true // 如果为1个，需要展示全部
                    this.iconshow = false
                   }
                   this.colyObj = response.data.carbonCopy
               })
            },
            // 审批文件列表
            approvalList() {
                let item = this.approvalRecordObj.item
                this.$router.push({ path:'/Filepage', query: {item:JSON.stringify(item),path:this.$route.path,name: '我的审批'}});
            },
            // 文件审批意见
            approvalComment() {
                let attach = []
                this.approvalRecordObj.attach.map(v => {
                    let obj = {}
                    obj.docId = v.docId
                    obj.parentId = v.parentId
                    attach.push(obj)
                })
                let commentData = {
                    docSource: this.approvalRecordObj.docSource, // 来源
                    attach: JSON.stringify(attach), //审核的文件id
                    projectId: this.projectId,
                    projectName: this.projectName,
                    isDir:(this.categoryId == 2 || this.categoryId ==10)?false:true,
                    sourceName:`我的审批-我发起的-审批记录-查看-${this.categoryId == 2?'文件':this.categoryId == 10?'文件修订':this.categoryId == 3?'目录':'目录修订'}审批-${this.categoryId == 2?'文件':this.categoryId == 10?'文件修订':this.categoryId == 3?'目录':'目录修订'}审批意见页`,

                }
                this.$store.commit('approvalCommentsFn', commentData)
            },
            handleUploadFilePreview (item, pro_id) {
                item.docName = item.fileName
                item.docId = item.fileId
                this.$utils.handleUploadFilePreview(item, {projectId:this.projectId,sourceName:this.approvalRecordObj.sourceName,projectName:this.projectName})
            },
            // 下载
            /*
            item 区分发起的审批还是审批人发起的附件
            data 当前选择的文件
            index 几级下的当前的下标
            value 几级下的
            */
            downLoadFiles (item, data, index, value) {
                let querylistarray = []
                if(item == 1) {
                    console.log(1)
                    var uploadConment = data;
                    querylistarray = this.queryList.attachment
                } else {
                    console.log(2)
                    var uploadConment = value.list[index].attachments;
                    querylistarray = data.commentAttachment
                }
                if (!uploadConment.length){
                    this.$message.error('请选择要下载的数据')
                    return
                }
                let uploadData = []
                uploadConment.forEach(item => {
                querylistarray.forEach(it => {
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
                        "zipName": this.queryList.projectName.substring(0,10)+'-审批附件.zip'
                        }
                    this.$store.commit("export", {url: "/rfs/downloadDocsZip",data: data});
                }
            },
            handleCheckAllChange(val) {
                this.attachment = val ? this.queryList.attachment.map(v => v.fileId) : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.queryList.attachment.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.queryList.attachment.length;
            },
            handleCheckAll (val, index, o, ind, item) {
                // true、当前下标、当前的元素、上一级下表（几级）
                this.arraydatas = item.list[index].commentAttachment.slice();
                let aaa = item.list[index].commentAttachment;
                item.list[index].attachments = val ? aaa.map(v => v.fileId) : [];
                o.checkAll=val
                item.list[index].isIndeterminate = false
            },
            handleCheckedCities(val, index, o, ind, item, m) {
                // true、当前下标、当前的元素、上一级下表（几级）
              // 判断选中还是取消
              let checked = val.indexOf(m.fileId)>-1
              checked
                ? this.arraydatas.findIndex(v=>v.fileId===m.fileId)<0 && this.arraydatas.push(m)
                : this.arraydatas = this.arraydatas.filter(v=>v.id!==m.id)
              o.attachments = val
              // 处理全选和
                let checkedCount = val.length
                let totalLength = o.commentAttachment.length
                o.checkAll = checkedCount === totalLength
                o.isIndeterminate = checkedCount > 0 && checkedCount < totalLength
            }
        },
        watch: {
            approvalRecordShow (val) {
                if (val) {
                    this.query()
                }
            }
        }
    }
</script>

<style scoped lang="scss">
.approval-body{
    min-height: calc(100vh - 250px);
    max-height: calc(100vh - 170px);
}
.level{
      font-weight: 600;
      color:rgba(51,51,51,1) !important;
  }
  header, article{
      h3{
        font-size:16px;
        font-weight:500;
        color:rgba(48,49,51,1);
        margin-bottom: 20px;
        line-height: 43px;
      }
      .approval-projectContent {
          margin-left: 30px;
          margin-bottom: 15px;
          p{
              margin: 5px 0;
              >span:nth-child(1){
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
       .statewarn, .statewarna{
            color: #FBBB3F !important;
        }
        .stateSuccess, .stateSuccessa{
            color: #06C237 !important;
        }
        .stateNo, .stateNoa{
            color: #909399 !important;
        }
        .stateNoPass, .stateNoPassa{
            color: #ff4d4f !important;
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
          border-bottom: 1px dashed rgba(220,223,230,1);
          margin-right: 12px;
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
      padding-top: 15px;
  }
  .addborder {
    margin-left: 0px !important;
    padding: 15px 0 15px 30px;
    border-bottom: 1px dashed rgba(220,223,230,1);
  }
.request-content{
    display: flex;
    align-items: center;
    span{
        width: 60px;
        display: inline-block;
        margin-right: 15px;
        text-align: right;
    }
    >div{
        width: 690px;
        max-height: 118px;
        overflow-y: auto;
        padding: 5px;
        border-radius: 4px;
       line-height: 25px;
       font-weight:400;
    }
    >div:hover{
        background:rgba(240,242,245,1);
    }
}
.btnRight{
    display: flex;
    justify-content: space-between;
    padding-right: 30px;
}

  .statewarna{
      border: 1px solid #FBBB3F;
      padding: 3px;
      border-radius: 4px;
  }
  .stateSuccessa{
      border: 1px solid #06C237;
      padding: 3px;
      border-radius: 4px;
  }
  .stateNoa{
      border: 1px solid #909399;
      padding: 3px;
      border-radius: 4px;
  }
  .stateNoPassa{
      border: 1px solid #ff4d4f;
      padding: 3px;
      border-radius: 4px;
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
      max-height: 175px;
      overflow: hidden;
  }
</style>
