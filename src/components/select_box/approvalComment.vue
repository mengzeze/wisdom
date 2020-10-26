<template>
  <div class="remark-approvalComent">
    <el-dialog :title="title" :close-on-click-modal="false" :visible="approvalShow" width="780px" style="height: calc(100vh);" @close="close">
      <nav class="selected-total" v-if="!tableData.findComment">
        当前已选中：
        <span>待审批{{(this.getcategoryId == 2 || this.getcategoryId == 10)?'文件':'目录'}}{{tableData.pending ? tableData.pending : 0}}个,</span>
        <span>已通过{{(this.getcategoryId == 2 || this.getcategoryId == 10)?'文件':'目录'}}{{tableData.pass ? tableData.pass : 0}}个,</span>
        <span>已驳回{{(this.getcategoryId == 2 || this.getcategoryId == 10)?'文件':'目录'}}{{tableData.cancel ? tableData.cancel : 0}}个</span>
      </nav>
      <nav class="approvalComme" v-if="!tableData.findComment">审批意见：</nav>
      <nav class="docName"  v-if="tableData.findComment" :title="docName">{{docName}}</nav>
      <div class="Reply" v-if="tableData.findComment">
        <!-- 一级 -->
        <p class="nothing" v-if="tableData.findComment && !tableData.list">暂无审批意见</p>
        <ul v-for="(item, ind) in tableData.list" :key="ind" :id="item.id">
          <li class="Replyone">
            <span class="Replyonetwo">{{item.userName}}</span>
            <span class="Replyonethree">{{item.createDate}}</span>
          </li>
          <li class="Replytwo">
            <p class="Replytwop" :title="item.fileApprovalCommen" v-if="getcategoryId == 2 || getcategoryId == 10">
              <span v-if="getcategoryId == 2 || getcategoryId == 10">【版本:</span><span class="color-primary" v-if="getcategoryId == 2 || getcategoryId== 10">V{{item.docVersionNumber}}</span> -
            <span :class='[item.state =="0" ? "statewait" : (item.state =="1" ? "stateSuccess" : "stateNo")]'>
              {{item.stateName}}
            </span>】{{item.fileApprovalCommen}}
            </p>
            <p class="Replytwop" :title="item.fileApprovalCommen" v-else>
              <span :class='[item.state =="0" ? "statewait" : (item.state =="1" ? "stateSuccess" : "stateNo")]'>
                【{{item.stateName}}】
              </span>{{item.fileApprovalCommen}}
            </p>
            <p class="Replytwotowp clearfix">
                <el-button v-show="item.send" @click="Clickreply($event,true,0,item)" size="medium" class="fr"  type="text" style="display:block">回复</el-button>
                <el-button v-show="!item.send" @click="Clickreply($event,false,0,item)" size="medium" class="fr" type="text" style="display: none;">取消回复</el-button>
                <span v-show="!item.send" style="position:relative;display:block;width:83%;display: none;margin-left:20px;" class="fl">
                  <div class="reply-sign border-primary-hover">
                    <div  style="flex-shrink: 0;">回复：<span class="color-primary">{{item.userName}}</span></div>
                    <el-input class="reply-input" type="textarea" v-model="item.replay" maxlength="1000" rows="1" resize="none" @input="updateView($event)"></el-input>
                  </div>
                  <el-button slot="append" type="text" @click="sendOpinion($event,item,1)" class="reply-send-btn" :disabled="item.replay == undefined || item.replay == ''">发布</el-button>
              </span>
            </p>
          </li>
          <li>
            <!-- 二级 -->
            <ul class="second" v-for="(it, ind) in item.comments" :key="ind" >
              <li class="secondoneli clearfix">
                <span class="secondone fl">
                  <span class="">{{it.createByName}}</span> &nbsp;回复：
                  <span class="color-primary">{{it.revertUserName}}</span>
                </span>
                <span class="secondonetime fr">{{it.createTime}}</span>
              </li>
              <li style="margin-bottom:10px;">
                <p class="Replytwop">
                  <span style="color:#0061a9"></span>{{it.content}}
                </p>
               <p class="Replytwotowp clearfix">
                <el-button v-show="it.send" @click="Clickreply($event,true,1,it)" size="medium" class="fr"  type="text" style="display: block;">回复</el-button>
                <el-button v-show="!it.send" @click="Clickreply($event,false,1,it)" size="medium" class="fr"  type="text" style="display: none;">取消回复</el-button>
                <span v-show="!it.send" style="position:relative;display:block;width:85%;display: none" class="fl">
                  <div class="reply-sign border-primary-hover">
                    <div style="flex-shrink: 0;">回复： <span class="color-primary">{{it.createByName}}</span></div>
                    <el-input class="reply-input" type="textarea" v-model="it.replay" maxlength="1000" rows="1" resize="none"></el-input>
                  </div>
                  <el-button slot="append" type="text" @click="sendOpinion($event,it,2)" class="reply-send-btn" :disabled="it.replay == undefined || it.replay == ''">发布</el-button>
              </span>
            </p>
              </li>
            </ul>
            <p class="secondonelip" @click="lookMoreReplaytrue(item)" v-if="item.commentNum > 2">查看全部<span>{{item.commentNum}}</span>条回复</p>
          </li>
        </ul>
      </div>
      <el-input
        v-show="Approvers"
        :class="[{'is-active': noRemarkText}]"
        type="textarea"
        :rows="4"
        resize="none"
        maxlength="1000"
        v-model="saveObj.fileApprovalCommen"
        :placeholder= "`请输入${getcategoryId == 2 ? '文件' : '目录'}审批意见，最多输入1000字`"
      ></el-input>
      <div class="checkboxinfo" v-show="Approvers">
        <div>
          <i style="color:red">*</i>
           <span>审批结果:</span>
           <div>
             <template>
              <el-radio v-model="saveObj.state" label="0">待审批</el-radio>
              <el-radio v-model="saveObj.state" label="1">通过</el-radio>
              <el-radio v-model="saveObj.state" label="2">驳回</el-radio>
            </template>
           </div>
        </div>
        <div>
          <span>&nbsp;消息通知:</span>
          <div>
            <el-checkbox v-model="saveObj.noticeLook">通过站内信通知发起人查看</el-checkbox>
          </div>
        </div>
      </div>
      <div slot="footer" style="margin-top: -26px;" v-show="Approvers" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button  type="primary" @click="saveBtn">保 存</el-button>
      </div>
       <div slot="footer" style="margin-top: -10px;text-align:center" v-show="!Approvers" class="dialog-footer">
        <el-button @click="close">关 闭</el-button>
      </div>

    </el-dialog>

    <!-- 多条回复的详情 -->
    <el-dialog title="审批回复详情" :close-on-click-modal="false" :visible="approvalDeatil" width="780px" style="height: calc(100vh);" :before-close="handleClose">
      <div class="ReplyMore">
        <!-- 一级 -->
        <ul :oneReply="oneReply">
          <li class="Replyone">
              <!-- <img  class="fl" style="width:40px;height:40px;border-radius:50%;position: relative;top: 0px;margin-right: 10px;" :src="oneReply.userImg == null ? require('../../assets/user_img/projectLogUser.png') : getImgUrl(oneReply)"> -->
            <span class="Replyonetwo">{{oneReply.userName}}</span>
            <span class="Replyonethree">{{oneReply.createDate}}</span>
          </li>
          <li class="Replytwo" style="border-bottom:1px solid #ebeef5">
            <p class="Replytwop">
              <template v-if="getcategoryId == 2 || getcategoryId == 10">
                【<span>版本:</span><span class="color-primary" v-if="getcategoryId == 2 || getcategoryId == 10">V{{oneReply.docVersionNumber}} -</span>
                  <span :class='[oneReply.state =="0" ? "statewait" : (oneReply.state =="1" ? "stateSuccess" : "stateNo")]'>
                  {{oneReply.stateName}}
                </span>】{{oneReply.fileApprovalCommen}}
              </template>
              <template v-else>
                <span :class='[oneReply.state =="0" ? "statewait" : (oneReply.state =="1" ? "stateSuccess" : "stateNo")]'>
                  【{{oneReply.stateName}}】
                </span>
              </template>
            </p>
            <p class="Replytwotowp clearfix">
                <el-button v-show="oneReply.send" @click="Clickreply($event,true,2,oneReply)" size="medium" class="fr" type="text">回复</el-button>
                <el-button v-show="!oneReply.send" @click="Clickreply($event,false,2,oneReply)" size="medium" class="fr" type="text" style="display: none;">取消回复</el-button>
                <span v-show="!oneReply.send" style="position:relative;display:block;width:83%;display: none;margin-left:20px;" class="fl">
                  <div class="reply-sign border-primary-hover">
                    <div style="flex-shrink: 0;">回复：<span class="color-primary">{{oneReply.userName}}</span></div>
                    <el-input class="reply-input" type="textarea" v-model="oneReply.replay" maxlength="1000" rows="1" resize="none"></el-input>
                  </div>
                  <el-button slot="append" type="text" @click="sendOpinion($event,oneReply,1)" class="reply-send-btn" :disabled="oneReply.replay == undefined || oneReply.replay == ''">发布</el-button>
              </span>
            </p>
          </li>
          <li class="detaileMore" :oneReply="oneReply">
            <!-- 二级 -->
            <div class="replyItem" :lengthReplay="lengthReplay">共有<span>{{lengthReplay.length}}</span>条回复</div>
            <ul class="second" v-for="item in deatilbox" :key="item.id" >
              <li class="secondoneli clearfix">
                <span class="secondone fl">
                    <!-- <img  class="fl" style="width:40px;height:40px;border-radius:50%;position: relative;top: -13px;margin-right: 10px;" :src="item.userImg == null ? require('../../assets/user_img/projectLogUser.png') : getImgUrl(item)"> -->
                  <span class="">{{item.createByName}}</span> &nbsp;回复：
                  <span class="color-primary">{{item.revertUserName}}</span>
                </span>
                <span class="secondonetime fr">{{item.createTime}}</span>
              </li>
              <li>
                <p class="Replytwop">
                  <span style="">{{item.content}}</span>
                </p>
               <p class="Replytwotowp clearfix">
                <el-button v-show="item.send" @click="Clickreply($event,true,3,item)" size="medium" class="fr" type="text">回复</el-button>
                <el-button v-show="!item.send" @click="Clickreply($event,false,3,item)" size="medium" class="fr" type="text" style="display: none;">取消回复</el-button>
                <span v-show="!item.send" style="position:relative;display:block;width:85%;display: none" class="fl">
                  <div class="reply-sign border-primary-hover">
                    <div style="flex-shrink: 0;">回复：<span class="color-primary">{{item.createByName}}</span></div>
                    <el-input class="reply-input" type="textarea" v-model="item.replay" maxlength="1000" rows="1" resize="none"></el-input>
                  </div>
                  <el-button slot="append" type="text" @click="sendOpinion($event,item,2)" class="reply-send-btn" :disabled="item.replay == undefined || item.replay == ''">发布</el-button>
              </span>
            </p>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "approvalComment",
  props: ["approvalShow", "approvalData"],
  data() {
    return {
      title: '',
      docName: '',
      token: '',
      userId: '',
      projectId: '',
      selectType: '',
      getcategoryId:'',
      Approvers:'',
      Approversclose:'',
      findComment: false,
      saveObj: {
          approvalId: '',
          taskId: '',
          taskDefKey: '', //当前审核节点所处标识
          fileApprovalCommen: '', //文件审批意见
          fileList: [], // {"docId":"文件docId","docName":"文件名称","parentId":"文件父级id","docVersionNum":"文件版本号"}
          state: '', //"0:待审核/1:通过/2:不通过"
          noticeLook: true // 是否勾选发消息true 勾选/fasle 不勾选"
      },
      Reply: '',
      noRemarkText: false, //保存时备注内容是否为空
      tableData: {
        findComment: false, // 展示多文件
        pending: 0,
        pass: 0,
        cancel: 0,
        list: []
      },
      tableReply:[],
      //回复详情页面
      approvalDeatil:false,
      deatilbox:[],
      oneReply:{},
      opinionId:[],
      lengthReplay:{},
      lookmoreAll:true,
      commentNum:"",
      moreReply:"",
      originalContent:''
    };
  },
  created() {
     this.token = this.$store.state.loginObject.userToken;
     this.userId = this.$store.state.loginObject.userId;
     this.projectId = this.$store.state.projectMsg.pro_id
  },
  mounted(){},
  methods: {
    updateView(e) {
      this.$forceUpdate()
    },
    getImgUrl (item) {
      return this.$utils.getDownloadUrl(item.userImg)
    },
    // 取消回复和回复的事件
    Clickreply(el, state,type,item) {
      console.log(el, state, type, item, '3652')
        this.originalContent = item.conent;
       if(state == false){
           item.replay = ''
       }
       item.send = !state
       return

    if(type == 0){
      item.send = !state
    }else if(type == 1){
        if (state) {
           el.path[2].children[0].style.display = "none";
            el.path[2].children[1].style.display = "block";
            el.path[2].children[2].style.display = "block";
        } else {
            el.path[2].children[0].style.display = "block";
            el.path[2].children[1].style.display = "none";
            el.path[2].children[2].style.display = "none";
      }
    }else if(type == 2){
        if (state) {
             el.path[2].children[0].style.display = "none";
            el.path[2].children[1].style.display = "block";
            el.path[2].children[2].style.display = "block";
        } else {
            el.path[2].children[0].style.display = "block";
            el.path[2].children[1].style.display = "none";
            el.path[2].children[2].style.display = "none";
      }
    }else{
        if (state) {
            el.path[2].children[0].style.display = "none";
            el.path[2].children[1].style.display = "block";
            el.path[2].children[2].style.display = "block";
        } else {
            el.path[2].children[0].style.display = "block";
            el.path[2].children[1].style.display = "none";
            el.path[2].children[2].style.display = "none";
        }
    }
    },
    //查看更多回复
    lookMoreReplaytrue(item){
        console.log('item',item)
        this.approvalDeatil = true
        var type = 1
        this.oneReply = item;
        this.lookMoreReplay(item,1)
    },
    lookMoreReplay(item,type){
        var commiId="";
        if(type == 1){
            commiId = item.id

        }else{
            commiId = item.opinionId
        }

        var listObj = {
           "token": this.token,
            "userId": this.userId,
            "data": {
                "opinionId": commiId
            }
        }
            this.$post("/info/audit/findAllComment", listObj).then((response => {
            if (response.code == this.code.codeNum.SUCCESS) {
                this.deatilbox = response.data;
                this.deatilbox.forEach(v=>{
                  this.$set(v, 'send', true)
                  this.$set(v, 'replay', '')
                })
                this.lengthReplay = response.data
                this.commentNum = response.data.length;
                if(response.data.length >2){
                    this.lookmoreAll = true
                }
                this.queryReply(commiId)
            } else {
            this.$message({
                type: "info",
                message: response.msg
            });
            }
        })).catch(error => {

        });
    },
    //查看更多回复的关闭
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
            this.approvalDeatil = false
          })
          .catch(_ => {

          });
      },
      //发送审批意见
    sendOpinion(el,item,type){
        if(item.replay == undefined){
            this.$message.warning("请输入意见内容");
            return;
        }
        if(type == 1){
             var listObj = {
                "token": this.token,
                "userId": this.userId,
                "projectId": this.projectId,
                "data": {
                    "approvalId": item.approvalId,//"审批id",
                    "opinionId": item.id, //"审批意见id",
                    "content": item.replay, //"内容",
                    "revertUser":item.userId,  //"被回复用户Id",
                    "originalContent":item.fileApprovalCommen,
                    "fileList": [{
                        "docId": this.approvalData.fileList[0].docId,//"文件docId",
                        "docName":this.approvalData.fileList[0].docName,// "文件名称",
                        "parentId": this.approvalData.fileList[0].parentId,//"文件父级id",
                        "docVersionNumber":this.approvalData.fileList[0].docVersionNumber //"文件版本号"
                    }]
                }
            }

            this.queryReply(item.id);

        }else{
            var listObj = {
                "token": this.token,
                "userId": this.userId,
                "projectId": this.projectId,
                "data": {
                    "approvalId": item.approvalId,//"审批id",
                    "opinionId": item.opinionId, //"审批意见id",
                    "content": item.replay, //"内容",
                    "revertUser":item.createBy,  //"被回复用户Id",
                    "originalContent":item.content,
                    "fileList": [{
                        "docId": this.approvalData.fileList[0].docId,//"文件docId",
                        "docName":this.approvalData.fileList[0].docName,// "文件名称",
                        "parentId": this.approvalData.fileList[0].parentId,//"文件父级id",
                        "docVersionNumber":this.approvalData.fileList[0].docVersionNumber //"文件版本号"
                    }]
                }
            }
            this.queryReply(item.opinionId);
        }
        this.$post("/info/audit/responseComment", listObj).then((response => {
          if (response.code == this.code.codeNum.SUCCESS) {
            this.$message.success(response.msg);
              item.replay = ''
              this.query()
              this.lookMoreReplay(item,type)
          } else {
            this.$message({
                type: "info",
                message: response.msg
            });
          }
        })).catch(error => {});
    },
    aaa(){
      if(this.tableData.findComment == true){
          for(var i =0;i<this.tableData.list.length; i++){
            this.opinionId.push(this.tableData.list[i].id)
            this.$set(this.tableData.list[i], 'send', true)
          }
          for(var j =0;j<this.opinionId.length; j++){
            this.queryReply(this.opinionId[j])
          }
      }

    },
    //查询审批意见的的回复
    queryReply(item){
        var listObj = {
            "token": this.token,
            "userId": this.userId,
            "data": {
                "opinionId": item
            }
        }
        this.$post("/info/audit/findOpinionComment", listObj).then((response => {
          if (response.code == this.code.codeNum.SUCCESS) {
              for(var i=0; i<this.tableData.list.length; i++){
                  if(this.tableData.list[i].id == response.data[0].opinionId){
                      response.data[0].comments.replay = '';
                      response.data[0].comments.forEach(v=>{
                        this.$set(v, 'send', true)
                      })
                      this.$set(this.tableData.list[i],'comments',response.data[0].comments)
                      this.$set(this.tableData.list[i], 'send', true)
                      this.$set(this.tableData.list[i],'commentNum',response.data[0].commentNum)
                  }
              }
          } else {
            this.$message.info(response.msg);
          }
        })).catch(error => {});
    },
    query() {
      this.tableData = this.approvalData.tableData;
       for (var i = 0; i < this.tableData.list; i ++) {
            this.tableData.list[i].replay = "";
            this.commentNum= this.tableData.list[i].commentNum;
             console.log(this.commentNum)
            this.$set(this.tableData.list[i],'send', true)
        }

    },
    saveBtn() {
      if (!this.saveObj.state) {
        this.$message.warning('请勾选审批结果')
        return
      }
      var selectType= this.approvalData.selectType;
      //return
      //保存
      let obj = {
        token: this.token,
        userId: this.userId,
        data: this.saveObj,
        sourceName:`我的审批-${this.getcategoryId == 2 || this.getcategoryId == 10? '文件' : '目录'}审批-${this.getcategoryIds == 2 || this.getcategoryIds == 10? '文件' : '目录'}审批意见`,
        projectName: this.$store.state.projectMsg.projectMsg.name,
        paperFlag:(selectType == 3 || selectType == 4)?false:true,
      }
      var url = (this.getcategoryId == 2 || this.getcategoryId == 10)?'/info/audit/addFileApprovalComment':'/info/audit/addDirApprovalComment'
      this.$post(url, obj).then(res => {
        if (!res) {
            this.$message.error(res.msg)
            return
        }
        if (res.code !== 0) {
          this.$message.error(res.msg)
          return
        }
        this.$message.success(res.msg)
        // 审批完之后，更新审批的状态 类型、项目id，审核id
        this.$emit('approvalSuccess');
        this.close()
      })
    },
    close() {
      this.$emit('update:approvalShow', false);
      this.$emit('updatainfo',false)
      this.saveObj.fileApprovalCommen = ''
      this.saveObj.state = ''
      this.saveObj.noticeLook = true
      this.$select.updateStatus(this.selectType, this.$store.state.projectMsg.pro_id, this.approvalData.approvalId)
    }
  },
  watch: {
    approvalShow (val) {
      if (val){
        if(this.approvalData.tableData.findComment == true){
             if(this.approvalData.tableData.list.length>0){
                this.commentNum= this.approvalData.tableData.list[0].commentNum
            }
        }
        this.getcategoryId = this.approvalData.getcategoryId
        this.title = this.approvalData.title
        this.docName = this.approvalData.docName
        this.findComment = this.approvalData.findComment
        this.saveObj.approvalId = this.approvalData.approvalId ? this.approvalData.approvalId : ''
        this.saveObj.taskId = this.approvalData.taskId ? this.approvalData.taskId : ''
        this.saveObj.taskDefKey = this.approvalData.taskDefKey ? this.approvalData.taskDefKey : ''
        this.saveObj.fileList = this.approvalData.fileList ? this.approvalData.fileList : []
        this.selectType = this.approvalData.selectType
        this.Approvers = this.approvalData.Approvers
        this.query()
        this.aaa()
      }
    }
  }
};
</script>

<style scoped lang="scss">
.el-dialog__header {
  border-bottom: 1px solid #dedede;
}
.selected-total {
  text-align: left;
  font-size: 14px;
  font-weight: 400;
  color:rgba(96,98,102,1);
  >span{
    color: #000000;
    margin-left: 5px;
  }
}
.docName {
  width: 700px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  text-align: center;
  padding: 0 0 19px 0;
  font-size:16px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(0,0,0,1);
  margin: 0 auto;
}
.sub-Approvaltitle {
  padding: 10px 0;
  font-size: 14px;
}
.remark-list {
  margin-top: 16px;
}
.check-tell{
  display: flex;
  margin: 15px 0;
}
.nothing{
  position: relative;
  text-align: center;
  top: 50%;
}
</style>
<style lang="scss"  scoped>
.statewait{
    color: #FBBB50;
  }
  .stateNo {
    color: red;
  }
  .stateSuccess{
    color: rgba(103,194,58,1);
  }
.approvalComme{
  text-align: left;
  padding: 10px 0;
}
.remark-approvalComent {
  .el-dialog__header {
    border-bottom: 1px solid #dedede;
  }
  .el-table th > .cell {
    font-size: 14px;
    font-weight: 400;
  }
  .el-table td {
    border-bottom: 1px solid #dedede;
  }
  .el-table th.is-leaf {
    border-bottom: 1px solid #dedede;
  }
  .el-table__body-wrapper.is-scrolling-none {
    width: calc(100% - 6px);
  }
}
.Reply {
  height: calc(100vh - 400px);
  overflow: auto;
  padding: 17px;
  border:1px solid rgba(215,218,226,1);
  background:rgba(247,247,247,1);
  ul{
    background:rgba(255,255,255,1);
    padding: 15px;
    margin-bottom: 10px;
  }
  li {
    width: 100%;
  }
}
.ReplyMore{
    height: calc(100vh - 200px);
    overflow: auto;
    padding: 17px;
    padding-top:0px;
    ul{
        background:rgba(255,255,255,1);
        padding: 15px;
        padding-top:0px;
        margin-bottom: 10px;
    }
    li {
        width: 100%;
        padding-bottom: 10px;
    }
}
.detaileMore{
    margin-top: 10px;
    .replyItem{
        border-left: 5px solid #409EFF;
        padding-left: 10px;
        text-align: left;
        margin-left: 20px;
    }
    .second{

    }
}
.Replyone {
  height: 17px;
  padding-bottom: 7px;

  span {
    display: inline-block;
    overflow: hidden;
    width: 200px;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
  }
  .Replyonetwo {
    text-align: left;
  }
  .Replyonethree {
    text-align: right;
    width: 65%;
  }
}
.Replytwo {
  text-align: left;
}
.Replytwop {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; //需要控制的文本行数
  overflow: hidden;
  text-align: left;
  letter-spacing: 0.3px;
  cursor: pointer;
}
.Replytwotowp {
  width: 100%;
  text-align: right;
  margin-top: 15px;

}
.second {
  padding: 0px!important;
  padding-top: 15px!important;
    border-bottom: 1px solid #EBEEF5;
    margin-top: 5px;
    margin-left: 21px;
}
.secondoneli {
  text-align: left;
  padding-bottom: 7px;
}
// .secondonetime {
//   display: inline-block;
//   text-align: right;
//   width: 82%;
// }
.secondonelip {
  text-align: left;
  margin-left: 25px;
  margin-top: 3x;
  color: #909399;
  padding-bottom: 7px;
  cursor: pointer;
}
.checkboxinfo {
  text-align: left;
  margin-top: 20px;
  > div{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 15px 0;
    >div{
      margin-left: 30px;
    }
  }
}
  .reply-send-btn {
    position: absolute;
    right: 15px;
    top: -4px;
    z-index: 1;
    padding-right: 8px;
  }
  .reply-sign {
    // position: absolute;
    position: relative;
    display: flex;
    justify-content: space-between;
    left: 0;
    top: 0;
    z-index: 1;
    height: 33px;
    line-height: 33px;
    padding-left: 10px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    span {
      color: #999999;
      text-align: left;
    }
  }

/deep/ {
  .reply-input .el-textarea__inner{
    padding-right: 50px;
    border: none;
  }
}
</style>


