<template>
    <div id="approvalRecords">
        <el-dialog title="投票记录" center width="890px" :close-on-click-modal="false" :visible="voteRecordShow" @close="clickEvent">
               <el-scrollbar style="height:100%">
                   <div class='approval-body'>
                        <article>
                             <div v-for="(item, ind) in tableData" :key="ind">
                                <div class="approval-projectContent">
                                    <div>
                                        <div class="btnRight">
                                            <div>
                                                <p><span>投票人员:</span><span>{{item.userName}}</span></p>
                                                <p><span>投票时间:</span><span>{{item.voteTime}}</span></p>
                                            </div>
                                            <div>
                                                <span :class="{'stateSuccessa': item.resultName === '同意',
                                                    'stateNoa': item.resultName === '未投票',
                                                    'statewarna': item.resultName === '暂缓表决',
                                                    'stateNoPassa': item.resultName === '不同意',
                                                    'stateNoblue': item.resultName === '有条件通过'}">{{item.resultName}}</span>
                                            </div>
                                        </div>
                                        <div class="request-content">
                                            <span>投票意见:</span>
                                            <div class="content-text" ref="more">
                                                <div v-if="!item.suggestion">
                                                    {{item.suggestion}}
                                                </div>
                                                <div v-else class="suggcontent" ref='textContainer' :class="{'retract': item.status}" :style="{'max-height':item.status ? textHeight: ''}">
                                                    {{item.suggestion}}
                                                </div>
                                                <!-- <div class="btn"> -->
                                                    <!-- <p v-if="item.status" @click="item.status = false">查看全文</p> -->
                                                    <!-- <p v-if="item.status == false" @click="item.status = true">收起</p> -->
                                                <!-- </div> -->
                                            </div>
                                        </div>
                                    </div>

                                    <div class="approval-checkAll">
                                        <div v-if="item.projectVoteActtachList && item.projectVoteActtachList.length">
                                            <el-checkbox :indeterminate="item['isIndeterminate']" v-model="item['checkAll']" @change="checked => handleCheckAll(checked, ind, item)">投票附件</el-checkbox>
                                            <button @click="downLoadFiles(item, ind)">下载</button>
                                        </div>
                                        <div v-else> 投票附件</div>
                                            <el-checkbox-group v-model="item['attachments']" @change="checked => handleCheckedCities(checked, ind, item)" class="approval-group1">
                                            <ul>
                                                <li v-for="(m, index) in item.projectVoteActtachList" class="attachemnt-list-item" :key="index">
                                                     <!-- :disabled='m.delFlag == 1' -->
                                                    <el-checkbox :label="m">
                                                        <p class="attachemnt-list-doc">    
                                                            <span v-if="m.delFlag == 1" class="doc-name" style="text-decoration:line-through;" @click.prevent="$message.error('该附件被删除')" :title="m.docName">{{m.docName}}</span>
                                                            <span v-else class="doc-name" @click.prevent="handleUploadFilePreview(m,  {projectId,sourceName:'投票记录',projectName: voteObj.projName})" :title="m.docName">{{m.docName}}</span>
                                                        </p>
                                                    </el-checkbox>
                                                </li>
                                            </ul>
                                        </el-checkbox-group>
                                    </div>
                                </div>
                             </div>
                        </article>
                   </div>
               </el-scrollbar>
        </el-dialog>
</div>
</template>
<script>
    export default {
        name: 'approvalRecord',
        components: {},
        props: ['voteRecordShow','voteObj'],
        data () {
            return {
                isPC: this.$store.state.isPC,
                token: '',
                userId: '',
                projectId: this.$store.state.projectMsg.pro_id,
                tableData: [],
                textHeight: null,
                isShowLoading: false,
                queryList: {}
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
            // 取消
            clickEvent() { 
                this.$emit('update:voteRecordShow',false);
            },
            // 查询
            query() {
                let obj = {
                    token: this.$store.state.loginObject.userToken,
                    userId: this.$store.state.loginObject.userId,
                    projectId: this.voteObj.projId,
                    data: {
                        id: this.voteObj.id
                    }
                }
                this.isShowLoading = true;
               this.$post('/info/project/queryVoteRecord', obj).then((response) => {
                    this.isShowLoading = false
                    if (!response) {
                        this.$message.error(response.msg)
                        return
                    }
                    if (response.code !== 0) {
                        this.$message.error(response.msg)
                        return
                    }
                    //投票结果（0:进行中/1:同意/2:不同意/3:暂缓表决/4;有条件通过）0--未投票
                   response.data.forEach((v, i) => {
                        v.result == 0 ? v.resultName = '未投票' : v.resultName = v.resultName
                        v.attachments = []
                        v.isIndeterminate = false
                        v.checkAll = false
                        v.status = true
                   })
                   this.tableData = response.data
                    // this.calculateText()
               })
            },
            // 计算文字 显示展开 收起
            calculateText() {
                // 获取一行文字的height 计算当前文字比较列表文字
                // let oneHeight = this.$refs.more1.scrollHeight
                // let twoHeight = oneHeight * 3 || 60
                let twoHeight = 65
                this.textHeight = `${twoHeight}px`
                let txtDom = this.$refs.textContainer
                for (let i = 0; i < txtDom.length; i++) {
                    let curHeight = txtDom[i].offsetHeight
                    if (curHeight > twoHeight) {
                        this.$set(this.tableData, i, Object.assign({}, this.tableData[i], { status: true }))
                    } else {
                        this.$set(this.tableData, i, Object.assign({}, this.tableData[i], { status: null }))
                    }
                }
            },
            handleUploadFilePreview (item, pro_id) {
                console.log(item, 65656)
                item.rfsId =item.docVersionRfs
                this.$utils.handleUploadFilePreview(item, pro_id)
            },
            // 下载
            /*
            item 区分发起的审批还是审批人发起的附件
            data 当前选择的文件
            index 几级下的当前的下标
            value 几级下的
            */ 
            downLoadFiles (data, index) {
                var uploadConment = data.attachments
                if (!uploadConment.length){
                    this.$message.error('请选择要下载的数据')
                    return
                }
                // 需要区分单文件还是多文件，多文件下载是压缩包
                if(uploadConment.length == 1 ){
                    if (this.$store.state.isPC) {
                    this.$store.commit("pcOtherDownload", {
                        docName : uploadConment[0].docName,
                        docId :uploadConment[0].docId});
                    } else {
                        uploadConment[0].id = uploadConment[0].docId
                        this.$store.commit("download", uploadConment);
                    }
                }else{
                    var data={
                        "random":Math.random(),
                        "docIdStr":uploadConment.map(v=>v.docId).join(','),
                        "zipName": this.voteObj.voteName + '- 投票附件.zip'
                    }
                    this.$store.commit("export", {url: "/rfs/downloadDocsZip",data: data});
                }
            },
            handleCheckAll (val, ind, item) {
                // true、当前下标、当前的元素、上一级下表（几级）
                item.attachments = val ? item.projectVoteActtachList : []
                item.isIndeterminate = false
            },
            handleCheckedCities(val, index, item) {
                // true、当前下标、当前的元素、上一级下表（几级）
                let checkedCount = val.length
                item.checkAll = checkedCount === item.projectVoteActtachList.length
                item.isIndeterminate = checkedCount > 0 && checkedCount < item.projectVoteActtachList.length
            }
        },
        watch: {
            voteRecordShow (val) {
                if (val) {
                    this.query()
                }
            }
        }
    }
</script>

<style scoped lang="scss">
.approval-body{
    min-height: calc(100vh - 580px);
    max-height: calc(100vh - 170px);
}
.level{
    font-weight: 600;
    color:rgba(51,51,51,1) !important;
}
  .content-text {
    position: relative;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 2px;
    color: #666666;
  }
  
  .retract {
    position: relative;
    overflow: hidden;
  }

  .retract:after {
    // content: '...';
    position: absolute;
    bottom: 0;
    right: 2px;
    width: 25px;
    padding-left: 30px;
  }

  .btn {
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: 2px;
    color: #FFAD41;
    cursor: pointer;
    >p {
        margin: 0px;
    }
  }

  .more {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 2px;
    color: #666666;
    visibility: hidden;
    display: -webkit-box;
    overflow: hidden;
    white-space: normal;
    -webkit-line-clamp: 3;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    word-wrap: break-word;
  }

.approval-projectContent {
    margin-left: 30px;
    margin-bottom: 15px;
    p{
        margin: 5px 0;
        >span:nth-child(1){
        // width: 60px;
        // text-align: right;
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
article{
    padding-top: 15px;
}
.addborder {
    margin-left: 0px !important;
    padding: 15px 0 15px 30px;
    // border-top: 1px dashed rgba(220,223,230,1);
    border-bottom: 1px dashed rgba(220,223,230,1);
}
.text_blue{
    text-align: right !important;
    color: blue !important;
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
    .suggcontent{
        width: 690px;
        max-height: 118px;
        padding: 5px;
        border-radius: 4px;
       line-height: 25px;
       font-weight:400;
        overflow-y: auto;
    //     text-overflow: ellipsis;
    //    display: -webkit-box;
    //     overflow: hidden;
    //     white-space: normal;
    //     -webkit-line-clamp: 3;
    //     /*! autoprefixer: off */
    //     -webkit-box-orient: vertical;
    //     /* autoprefixer: on */
        word-wrap: break-word;
    }
    .suggcontent:hover{
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
      color: #FBBB3F;
  }
  .stateSuccessa{
      border: 1px solid #06C237;
      padding: 3px;
      border-radius: 4px;
      color: #06C237;
  }
  .stateNoa{
      border: 1px solid #909399;
      padding: 3px;
      border-radius: 4px;
      color: #909399;
  }
  .stateNoblue{
      border: 1px solid rgba(64,158,255,1);
      padding: 3px;
      border-radius: 4px;
      color: rgba(64,158,255,1);
   }
  .stateNoPassa{
      border: 1px solid #ff4d4f;
      padding: 3px;
      color: #ff4d4f;
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
</style>