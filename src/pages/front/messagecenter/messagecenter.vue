<template>
  <div class="messagecenter">
    <div class="messagecenter_contenti_headers">
      <p class="headers_break">
        <span>消息中心</span>
      </p>
      <h3 class="headers_clearFix">
        <span class="headers_clearFix_title">消息中心</span>
        <el-button class="param_btn"
                   type="primary"
                   @click="readMsgFn">
          <i class="el-icon-message"></i>
          <span>全部标记已读</span>
        </el-button>
      </h3>
    </div>
    <div class="contenti_container">
      <div class="container_header">
        <!-- <div class="tabs_card">
          <div class="tags" @click="tabFn($event,0)">
            项目消息(
            <span>{{total1}}</span>)
          </div>
          <div class="tags" @click="tabFn($event,1)">
            审批消息(
            <span>{{total2}}</span>)
          </div>
        </div> -->
        <el-tabs type="border-card"
                 v-model="activeName"
                 @tab-click="handleClick">
          <el-tab-pane :label="'项目消息(' + total1 + ')'"
                       name="0">
            <div class="message_box">
              <el-row class="tb_header">
                <el-col :span="12"
                        class="header_title_col">标题内容</el-col>
                <el-col :span="4"
                        class="header_title_col header_title_pro">所属项目</el-col>
                <el-col :span="4"
                        class="header_date_col">时间</el-col>
                <el-col :span="4"
                        class="header_date_col">操作</el-col>
              </el-row>
              <el-row class="table_body_row"
                      v-for="(item,index) in projectMsg"
                      :key="index"
                      style="width: 100%;overflow: hidden"
                      @click.native="readOne(item)"
                      :class="item.readFlag == 1 ? 'read' : 'noread'">
                <el-col :span="12"
                        class="title_col"
                        :title="contentFilter(item.context)"
                        @click.native="goProFn(item)">
                  <span class="no_read"
                        v-if="item.readFlag == 0"></span>

                  <div class="msg">
                    <div class="cont ellipsis1">{{contentFilter(item.context)}}</div>
                    <div class="file ellipsis1"
                         :title="item.fileName"
                         v-if="!!item.fileName">讨论对象:{{item.fileName}}</div>
                  </div>

                </el-col>
                <el-col :span="4"
                        class="pro_col"
                        style="font-weight:400;"
                        :title="item.projectName">{{item.projectName}}</el-col>
                <el-col :span="4"
                        class="date_col"
                        style="font-weight:400;"
                        :title="item.sendTime">{{item.sendTime}}</el-col>

                <el-col :span="4"
                        class="date_col">

                  <div id="btn_group">
                    <template v-if="item.operation=='申请中'">
                      <el-button type="text"
                                 title="同意"
                                 @click="agreeOrRefuse(item,'1')">
                        <i class="icon-operate-btn iconfont tongyi agree"></i>
                      </el-button>
                      <el-button type="text"
                                 title="拒绝"
                                 @click="agreeOrRefuse(item,'0')">
                        <i class="icon-operate-btn iconfont jujue cancel"></i>
                      </el-button>
                    </template>
                    <template v-if="item.operation!='申请中' && !!item.operation">
                      <el-button type="info"
                                 size="mini"
                                 disabled>{{item.operation}}</el-button>
                    </template>

                    <template v-if="item.type == 15">
                      <el-button type="text"
                                 title="进入聊天"
                                 @click="enterChat(item.projectId)">
                        <i class="icon-operate-btn iconfont liaotianjilu1"></i>
                      </el-button>
                    </template>

                    <template v-if="item.type == 14 || item.type == 18">
                      <el-button type="text"
                                 title="进入聊天"
                                 @click="enterFilePreview(item,0)">
                        <i class="icon-operate-btn iconfont liaotianjilu1"></i>
                      </el-button>
                      <el-button type="text"
                                 title="文件预览"
                                 @click="enterPreview(item)">
                        <i class="icon-operate-btn iconfont wenjian2"></i>
                      </el-button>
                    </template>
                    <template v-if="item.type == 29">
                      <el-button type="text"
                                 title="定位"
                                 @click="enterLook(item)">
                        <i class="icon-operate-btn iconfont location"></i>
                      </el-button>
                    </template>
                    <template v-if="item.type == 24 || item.type == 25">
                      <el-button type="text"
                                 title="进入聊天"
                                 @click="enterFilePreview(item,1)">
                        <i class="icon-operate-btn iconfont liaotianjilu1"></i>
                      </el-button>
                      <el-button type="text"
                                 title="文件夹定位"
                                 @click="enterLocation(item)">
                        <i class="icon-operate-btn iconfont wenjianjia"></i>
                      </el-button>
                    </template>
                    <!-- "   docLocationBtn(item)-->
                    <template v-if="item.type == 21 || item.type == 26">
                      <el-button type="text"
                                 title="定位"
                                 @click="enterLocation(item)">
                        <i class="icon-operate-btn iconfont location"></i>
                      </el-button>
                    </template>
                    <!-- 单文件27 -->
                    <template v-if="item.type == 27">
                      <el-button type="text"
                                 title="定位"
                                 @click="enterApproveMsg(item)">
                        <i class="icon-operate-btn iconfont location"></i>
                      </el-button>
                      <el-button type="text"
                                 title="回复"
                                 @click="getenterLook(item,false)">
                        <i class="icon-operate-btn iconfont reply"></i>
                      </el-button>
                    </template>
                     <template v-if="item.type == 30">
                      <el-button type="text"
                                 title="定位"
                                 @click="enterApproveMsgnum(item)">
                        <i class="icon-operate-btn iconfont location"></i>
                      </el-button>
                      <el-button type="text"
                                 title="回复"
                                 @click="getenterLooknum(item,false,3)">
                        <i class="icon-operate-btn iconfont reply"></i>
                      </el-button>
                    </template>
                    <!-- 多文件 28 0项目文档 1底稿-->
                    <template v-if="item.type == 28">
                      <el-button type="text"
                                 title="进入项目"
                                 @click="enterProject(item)">
                        <i class="icon-operate-btn iconfont liebiao-black"></i>
                      </el-button>
                      <el-button type="text"
                                 title="查看"
                                 @click="enterLook(item)">
                        <i class="icon-operate-btn iconfont wenzhang"></i>
                      </el-button>
                    </template>
                      <template v-if="item.type == 31">
                       <el-button type="text"
                                 title="定位"
                                 @click="enterApproveMsg(item,true)">
                        <i class="icon-operate-btn iconfont location"></i>
                      </el-button>
                      <el-button type="text"
                                 title="回复"
                                 @click="getenterLook(item,true)">
                        <i class="icon-operate-btn iconfont reply"></i>
                      </el-button>
                    </template>
                     <template v-if="item.type == 32">
                       <el-button type="text"
                                 title="进入项目"
                                 @click="enterProjects(item)">
                        <i class="icon-operate-btn iconfont liebiao-black"></i>
                      </el-button>
                       <el-button type="text"
                                 title="查看"
                                 @click="enterLook(item,true)">
                        <i class="icon-operate-btn iconfont wenzhang"></i>
                      </el-button>
                    </template>
                     <template v-if="item.type == 33">
                       <el-button type="text"
                                 title="定位"
                                 @click="enterLook(item,true)">
                        <i class="icon-operate-btn iconfont location"></i>
                      </el-button>
                    </template>
                  </div>

                  <!-- <div class="position-btn" v-if="item.type == 21">
                      <el-button type="primary" size="mini" @click="docLocationBtn(item)" class="clearfix">生成黑名单对比结果报告</el-button>
                  </div> -->
                </el-col>

              </el-row>
              <div class="nodata_box"
                   v-if="projectMsg.length == 0">暂无数据</div>
              <div class="pages">
                <el-pagination :current-page.sync="currentPage1"
                               :page-size="pageSize1"
                               layout="total, sizes, prev, pager, next, jumper"
                               :total="total1"
                               background
                               :page-sizes="[10, 20, 50, 100]"
                               @size-change="handleSizeChange1"></el-pagination>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="'审批消息(' + total2 + ')'"
                       name="1">
            <div class="message_box">
              <el-row class="tb_header">
                <el-col :span="16"
                        class="header_title_col">标题内容</el-col>
                <el-col :span="4"
                        class="header_date_col">时间</el-col>
                <el-col :span="4"
                        class="header_date_col">操作</el-col>
              </el-row>
              <el-row class="table_body_row"
                      v-for="(item,index) in approveMsg"
                      :key="index"
                      @click.native="readOne(item)"
                      :class="item.readFlag == 1 ? 'read' : 'noread'">
                <el-col :span="16"
                        class="title_col"
                        :title="item.context">
                  <span class="no_read"
                        v-if="item.readFlag == 0"></span>
                  <span v-html="item.context"></span>
                </el-col>
                <el-col :span="4"
                        class="date_col"
                        :title="item.sendTime">{{item.sendTime}}</el-col>
                <el-col :span="4"
                        class="date_col">

                  <div id="btn_group">
                    <template v-if="item.type == 7 || item.type == 8">
                      <el-button type="text"
                                 title="查看审批"
                                 @click="enterApproval(item)">
                        <i class="icon-operate-btn iconfont wenzhang"></i>
                      </el-button>
                    </template>
                    <template v-if="item.type == 6">
                      <el-button type="text"
                                 title="去审批"
                                 @click="goApproval(item)">
                        <i class="icon-operate-btn iconfont wj-fswj"></i>
                      </el-button>
                    </template>
                  </div>

                </el-col>
              </el-row>
              <div class="nodata_box"
                   v-if="approveMsg.length == 0">暂无数据</div>
              <div class="pages">
                <el-pagination :current-page.sync="currentPage2"
                               :page-size="pageSize2"
                               layout="total, sizes, prev, pager, next, jumper"
                               :total="total2"
                               background
                               :page-sizes="[10, 20, 50, 100]"
                               @size-change="handleSizeChange2"></el-pagination>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!--提醒-->
    <div class="totas_box">
      <span></span>
    </div>
    <!-- 生成黑名单对比报告弹框 -->
    <el-dialog title="黑名单比对结果报告"
               :visible.sync="blacklist"
               :close-on-click-modal="false"
               width="738px"
               class="blackList">
      <span>
        <p>比对，荣大科技ipo项目中，发行人关联方【唐一二】与项目【深圳飞荣达公司债】存在利益冲突，经核实，利益冲突原因为：</p>
        <el-input type="textarea"
                  :rows="6"
                  placeholder="请输入原因"></el-input>
      </span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="blacklist = false">取 消</el-button>
        <el-button type="primary"
                   @click="blacklist = false">生成黑名单比对结果报告</el-button>
      </span>
    </el-dialog>
    <!-- 反洗钱比对结果报告弹框 -->
    <el-dialog title="反洗钱比对结果报告"
               :visible.sync="blackresult"
               :close-on-click-modal="false"
               width="738px"
               class="blackList">
      <span>
        <p>比对，荣大科技ipo项目中，发行人关联方【唐一二】与项目【深圳飞荣达公司债】存在利益冲突，经核实，利益冲突原因为：</p>
        <p style="color:#666">
          比对，荣大科技ipo项目中，发行人关联方【唐一二】与项目【深圳飞荣达公司债】存在利益冲突，经核实，利益冲突原因为比对，荣大科技ipo项目中，发行人关联方【唐一二】与项目【深圳飞荣达公司债】存在利益冲突，经核实，利益冲突原因为比对，荣大科技ipo项目中，发行人关联方【唐一二】与项目【深圳飞荣达公司债】存在利益冲突，经核实，利益冲突原因为比对，荣大科技ipo项目中，发行人关联方【唐一二】与项目【深圳飞荣达公司债】存在利益冲突，经核实，利益冲突原因为比对，荣大科技ipo项目中，发行人关联方【唐一二】与项目【深圳飞荣达公司债】存在利益冲突，经核实，利益冲突原因为比对，荣大科技ipo项目中，发行人关联方【唐一二】与项目【深圳飞荣达公司债】存在利益冲突，经核实，利益冲突原因为比对，荣大科技ipo项目中，发行人关联方【唐一二】与项目【深圳飞荣比对，荣大科技ipo项目中目中...
        </p>
      </span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="blackresult = false">抄送</el-button>
        <el-button type="primary"
                   @click="blackresult = false">导出至客户文档</el-button>
      </span>
    </el-dialog>
     <approval-comment
      :approvalShow.sync="approvalShow"
      :approvalData="approvalData"
      @updatainfo="updatainfo"
    ></approval-comment>
  </div>
</template>

<script>
import { constants } from "fs";
import rightMenu from "@/components/file/rightmenu";
import approvalComment from "@/components/select_box/approvalComment";
export default {
  data () {
    return {
      activeName: '0',
      token: "",
      i: 0,
      userId: "",
      projectMsg: [],
      approveMsg: [],
      approvalShow: false, //审批弹框展示
      approvalData: {}, //审批弹框传值
      total1: 0, // 项目消息总条数
      pageNum1: 1, // 第几页
      pageSize1: 10, // 每页显示的数量
      pageSize2: 10, // 每页显示的数量
      currentPage1: 1,
      total2: 0, // 审批消息总条数
      pageNum2: 1, // 第几页
      currentPage2: 1,
      success_code: "",
      active_index: 0, // 当前标签index
      blacklist: false,
      blackresult: false

    };
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('setMessageIcon', false)
    to.meta.keepAlive = false;
    next();
  },
  computed: {
    contentFilter (item) {
      return (item) => {
        return item.replace('&nbsp;', ' ')
      }
    }
  },
  components:{
    approvalComment
  },
  methods: {
    enterApproveMsgnum(item){
      this.$post('/sys/queryDirOrFileForResponse', {
        data: {
          id: item.id
        }

      }).then(res => {
        if (res.code != this.success_code) {
          this.$message.error(res.msg);
          return
        }
        // source 0 文档 1底稿
        this.enterLocation({
          type: res.data.docSource == 2 ? '26' : '21',
          projectId: item.projectId,
          relationId: res.data.id
        })
      }).catch(err => { console.log(err) })
    },
    getenterLooknum(item){
      this.$post('/sys/queryDirOrFileForResponse', {
        data: {
          id: item.id
        }

      }).then(res => {
        if (res.code != this.success_code) {
          this.$message.error(res.msg);
          return
        }
        // source 0 文档 1底稿
      this.approvalData = {
          title: res.data.docType == 0 ? '文件审批':'目录审批',
          fileList:[
            {
              docId:res.data.docFileinfo.docId,
              docName:res.data.docFileinfo.docName,
              parentId:res.data.docFileinfo.parentId,
              docVersionNumber:res.data.docFileinfo.docVersionNumber
            }
          ],
          selectData:[res.data.docFileinfo.docId],
          docName: res.data.docFileinfo.docName,
          findComment:false,
          taskDefKey: '', //当前审核节点所处标识
          taskId: '',
          selectType:(res.data.docSource == 0 ||  res.data.docSource == 1)?3:4,
          approvalId: '', // 审核id
          selectType: 4,
          Approvers:''
        }
        // console.log(2222222, this.approvalData)
        this.getCommentData(item,false,3,res.data.docType,res.data.docSource)
      }).catch(err => { console.log(err) })
    },
    updatainfo(){
      this.approvalShow = false
    },
    enterProjects(item){
       this.$post('/sys/queryProjectByDir', {
        data: {
          id: item.id,
          isQuery: false
        }
      }).then(res => {
        if (res.code != this.success_code) {
          this.$message.error(res.msg);
          return
        }
        let flag = this.$select.getSelectedData(res.data.docSource == 1 ? 2 : 1, item.projectId).dir.length == 0;
        console.log(flag)
         if(!flag){
           this.$router.push({
            path: '/manuscriptmanage',
            query: {
              data :JSON.stringify(res.data.result),
              searchData: JSON.stringify({
                titleSearch: '',
                contentSearch: '',
                projectState: '',
                dirState: [],
                fileState: [1],
                fileTypes: [],
                startTime: '',
                endTime: '',
                syslog:true,
                set:res.data.result
              }),
              isActives: true,
            }
          });
         }else{
           this.$select.handleFileSelect(2, item.projectId, item.projectId, res.data.result)
           setTimeout(()=>{
              this.$router.push({
                  path: '/fullsearch',
                  query: {
                    searchData:JSON.stringify({
                    titleSearch: '',
                    contentSearch: '',
                    projectState: '',
                    dirState: [],
                    fileState: [1],
                    fileTypes: [],
                    startTime: '',
                    endTime: '',
                    syslog:true,
                    set:res.data.result
                  }),
                }
              });
           })
         }

      })
    },
    getenterLook(item,state){
       this.$post(state?'/sys/queryDirIdById':'/sys/queryFileIdById', {
        data: {
          id: item.id
        }

      }).then(res => {
        if (res.code != this.success_code) {
          this.$message.error(res.msg);
          return
        }
        // source 0 文档 1底稿
      this.approvalData = {
          title:item.type == 27?'文件审批':'目录审批',
          fileList:[
            {
              docId:state?res.data.docFileinfo.id:res.data.docFileinfo.docId,
              docName:res.data.docFileinfo.docName,
              parentId:res.data.docFileinfo.parentId,
              docVersionNumber:res.data.docFileinfo.docVersionNumber
            }
          ],
          selectData:state?[res.data.docFileinfo.id]:[res.data.docFileinfo.docId],
          docName: res.data.docFileinfo.docName,
          findComment:false,
          approvalId: item.relationId, // 审核id
          selectType: 4,
          Approvers:false
        }
        console.log(1111111111, this.approvalData)
        this.getCommentData(item,state,' ' ,item.type == 27 ? 0 : '')
      }).catch(err => { console.log(err) })
    },
     getCommentData (item,state,y = 2,type = 100,docSource = 100) {
       console.log(444, item,state, type, docSource)
      let  obj = {
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId,
        projectId: this.$store.state.projectMsg.pro_id,
        data:{
          docIdList:this.approvalData.selectData,//文件id的集合
          approvalId:item.relationId,
          docSource:docSource
        }
      }
      var url = y != 3
      ?state?'/info/audit/findApprovalRecordByDirids':'/info/audit/findApprovalRecordByFileids'
      :type == 0 ?'/info/audit/findApprovalRecordByFileidsForMsg':type == 1?'/info/audit/findApprovalRecordByDiridsForMsg':''
      this.$post(url, obj).then(res => {
        if (!res) {
            this.$message.error(res.msg)
            return
        }
        if (res.code !== 0) {
          this.$message.error(res.msg)
          return
        }
        if (res.data) {
          if (res.data.findComment) {
            res.data.list.forEach(m => {
              m.state == 0 ? m.stateName = '待审批' : ( m.state == 1 ? m.stateName = '通过' : m.stateName = '驳回')
            })
          }
         this.approvalData.Approvers = res.data.isApprover
         this.approvalData.taskDefKey = res.data.list[0].taskDefKey
         this.approvalData.taskId = res.data.list[0].taskId
         this.approvalData.approvalId = res.data.list[0].approvalId
         this.approvalData.findComment = res.data.findComment
         this.approvalData.tableData = res.data
         this.approvalData.getcategoryId = type == 0 ?2:3
         console.log(this.approvalData.tableData)
         this.approvalShow = true;
        }
      })
    },
    // 进入项目：点击“进入项目”文字标签跳转至对应文件位置（项目文档页/底稿管理页）的已选文件页，如该页面含选中

    // 状态文件，显示【弹窗】-取消已选文件，点击弹窗“确定”后，将对应文件显示在已选文件页，默认未选中状态，点击弹窗

    // “否”后，保留原选中状态文件，到对应位置默认页

    // 进入项目按钮
    enterProject (item) {
      this.$post('/sys/queryProjectByFile', {
        data: {
          id: item.id,
          isQuery: false
        }
      }).then(res => {
        if (res.code != this.success_code) {
          this.$message.error(res.msg);
          return
        }
        // console.log(item, 'item')
        // console.log(res.data, 'res.data')
        this.$store.commit('projectId', item.projectId);
        let flag = this.$select.getSelectedData(res.data.docSource == 1 ? 2 : 1, item.projectId).file.length == 0;
        // console.log(this.$select.getSelectedData(res.data.docSource == 1 ? 2 : 1, item.projectId).file)
        // console.log(flag);
        // return
        if (res.data.docSource == 1) { // 底稿
          // 判断当前项目底稿是否有选中文件，有选中文件进底稿，没有选中文件进已选文件列表
          if (flag) {
            this.$select.handleFileSelect(2, item.projectId, item.projectId, res.data.result)
            setTimeout(() => {
              this.$router.push({
                path: '/fullsearch',
                query: {
                  isSelectList: true
                }
              })
            }, 500)
            return
          } else {
            this.$router.push({
              path: '/manuscriptmanage',
              query: {
                isActive: true,
                data: JSON.stringify(res.data.result)
              }
            })
          }
          return
        }

        // 项目文档
        if (flag) {
          let proData = {
                          projectId: item.projectId,
                          projectName: item.projectName
                        }
          this.$select.handleFileSelect(1, item.projectId, item.projectId, res.data.result);
          this.$router.push({
              path: '/proDocSelectList',
              query: {
                        projectData:JSON.stringify(proData)
              }
          })
        } else {
          this.$router.push({
            path: '/projectDoc',
            query: {
              isActive: true,
              data: JSON.stringify(res.data.result)
            }
          })
        }

      }).catch(err => { console.log(err) })
    },
    // 项目消息-查看按钮
    enterLook (item,state) {
      this.$post(state?'/sys/queryProjectByDir':'/sys/queryProjectByFile', {
        data: {
          id: item.id,
          isQuery: true
        }
      }).then(res => {
        if (res.code != this.success_code) {
          this.$message.error(res.msg);
          return
        }
        console.log(res.data.result[0].docSource, '36666')
        this.$store.commit('approvalCommentsFn', {
          docSource: res.data.result[0].docSource + 1,
          attach: JSON.stringify(res.data.result.map(v => { return { docId: v.docId, parentId: v.parentId } })),
          projectId: item.projectId,
          isDir:state?true:false,
          sourceName: `消息中心-${res.data.result[0].docSource + 1 == 1 ? "文件" : "目录"}审批意见页`

        });
      }).catch(err => { console.log(err) })

    },
    // 去审批------------------------------------------------------
    goApproval (item) {
      this.$post('/info/audit/getApprovalTaskInfoByApprovalId', {
        data: {
          approvalId: item.approveId
        }
      }).then(res => {
        if (res.code != this.success_code) {
          this.$message.error(res.msg);
          return
        }
        res.data.submiter = {
          id: res.data.userId,
          name: res.data.username
        }
        // TODO：跳转康哥页面
        this.$router.push({
          path: '/Filepage',
          query: {
            item: JSON.stringify(res.data),
            path: this.$route.path
          }
        })
      }).catch(err => { console.log(err) })
    },
    // 我的审批页跳转
    // 两种情况 7 跳到我发起的，8跳到 我抄送的
    enterApproval (item) {
      console.log(item)
      //          我发起的  抄送我的  代我审批
      // type      7        8         6
      // paneState 2        3         0

      this.$post(item.type == 7 ? '/info/audit/positMyApplyList' : '/info/audit/positionMyCarbonCopy', {
        pageSize: 10,
        data: {
          id: item.approveId
        }
      }).then(res => {
        if (res.code != this.success_code) {
          this.$message.error(res.msg);
          return
        }
        this.$router.push({
          path: '/myapproval',
          query: {
            pageNo: res.data.pageNoNew,
            paneState: item.type == 7 ? 2 : 3
          }
        })

      }).catch(err => { console.log(err) })
    },
    // 带文件进入项目聊天
    enterFilePreview (item, docType) {
      this.$store.commit('chatProjectFn', item.projectId);
      this.$store.commit('projectId', item.projectId);
      this.$router.push({
        path: '/projecchat',
        query: {
          docData: JSON.stringify({
            docName: item.fileName,
            docId: docType == 1 ? item.relationId : '',
            id: item.relationId,
            docType,
            paperId: item.type == 18 || item.type == 25 ? item.relationId : ''
          })
        }
      });
    },
    // 审批消息文件定位
    enterApproveMsg (item,state) {
      this.$post(state?'/sys/queryDirIdById':'/sys/queryFileIdById', {
        data: {
          id: item.id
        }

      }).then(res => {
        if (res.code != this.success_code) {
          this.$message.error(res.msg);
          return
        }
        // source 0 文档 1底稿
        this.enterLocation({
          type: res.data.docSource == 1 ? '26' : '21',
          projectId: item.projectId,
          relationId: res.data.id
        })
      }).catch(err => { console.log(err) })
    },
    // 文件/文件夹定位
    enterLocation (item) {
      /**
       * type 15      只进入项目聊天
       * type 14 18   包含文档、底稿文件	进入消息讨论页面  文件预览    14 文档  18底稿
       * type 24 25   文件夹     进入消息讨论页面  文件夹定位   recordid  项目文档定位  文件讨论也recordid
       */
      let url = item.type == 24 || item.type == 21 ? '/doc/project/position' : '/doc/paper/location';
      if (item.type == 24 || item.type == 21) {
        this.$post(url, {
          data: {
            id: item.relationId,
            projectId: item.projectId,
            chatOrMsg: 0
          }
        }).then(res => {
          if (res.code != this.success_code) {
            this.$message.error(res.msg);
            return
          }
          this.$store.commit('projectId', item.projectId);
          this.$router.push({
            path: "/projectDoc",
            query: {
              docId: item.relationId,
              projectId: item.projectId,
              isPosition: true,
              data: JSON.stringify(res.data)
            }
          });
        }).catch(err => { console.log(err) })
        return
      }
      console.log(item)
      // 26

      if (item.type == 26) {
        this.$post('/doc/paper/locationPaperOrProject', {
          data: {
            id: item.relationId,
            projectId: item.projectId,
            pageSize: 100
          }
        }).then(res => {
          if (res.code != this.success_code) {
            this.$message.error(res.msg);
            return
          }
          const data = res.data;
          this.$store.commit('projectId', data.projectId);
          if (res.data.isProject) {
            this.$router.push({
              path: "/projectDoc",
              query: {
                docId: data.docId,
                projectId: data.projectId,
                isPosition: true,
                data: JSON.stringify(res.data)
              }
            })
            return
          }
          res.data.id = item.relationId
          this.$router.push({
            path: '/manuscriptmanage',
            query: {
              locationData: JSON.stringify(res.data)
            }
          })
        }).catch(err => { console.log(err) })
        return
      }

      this.$post(url, {
        data: {
          projectId: item.projectId,
          id: item.relationId,
          docType: item.type == 25 ? 1 : 0, // 1文件夹 0文件
          type: 'paper'
        },
        pageSize: 100
      }).then(res => {
        if (res.code != this.success_code) {
          this.$message.error(res.msg);
          return
        }
        res.data.id = item.relationId;
        this.$store.commit('projectId', item.projectId);
        this.$router.push({
          path: '/manuscriptmanage',
          query: {
            locationData: JSON.stringify(res.data)
          }
        })
      }).catch(err => { console.log(err) })

    },
    // 文件预览
    enterPreview (item) {
      this.$store.commit('previewAllFn', {
        projectid: item.projectId,
        photoType: item.fileName.substring(item.fileName.lastIndexOf('.') + 1),
        docId: item.type == 14 ? item.relationId : item.docId,
        docName: item.fileName,
        sourceName: '消息中心',
        rfsId: item.rfsId
      });
    },
    // 跳转文件讨论
    enterChat (pro_id) {
      this.$store.commit('chatProjectFn', pro_id);
      this.$store.commit('projectId', pro_id);
      this.$router.push('/projecchat');
    },
    // 记录消息中心图标
    recodMessageIcon () {
      this.$post('/sys/readNewMsg').then(res => {
        if (res.code != this.success_code) {
          this.$message.error(res.msg);
          return
        }
      }).catch(err => { console.log(err) })
    },
    handleRecesiveMsg (item) {
      this.projectMsg.pop()
      this.projectMsg.unshift(item.data)
    },
    handleRecesiveApproMsg (item) {
      this.approveMsg.pop()
      this.approveMsg.unshift(item.data)
    },
    //  切换tab标签
    handleClick (tab, event) {
      // $(".tags").removeClass("tags_active");
      // $(e.currentTarget).addClass("tags_active");
      // this.active_index = flag;
      // this.isShowModule();
      this.active_index = tab.name;
      if (this.active_index == '0') {
        this.pageNum1 = 1;
        this.currentPage1 = 1;
        this.getProjectMsgDataFn();
      } else if (this.active_index == '1') {
        this.pageNum2 = 1;
        this.currentPage2 = 1;
        this.getApproveMsgDataFn();
      }
    },
    //  获取项目消息数据
    getProjectMsgDataFn () {
      var send_data = {
        token: this.token,
        userId: this.userId,
        pageNo: this.pageNum1,
        pageSize: this.pageSize1,
        data: {
          acceptId: this.userId
        }
      };
      this.$post("/sys/queryProjectMsg", send_data)
        .then((response) => {
          console.log(response);
          if (this.success_code == response.code) {
            console.log('消息列表', response)
            var getcontetn;
            for (var i = 0; i < response.data.list.length; i++) {
              getcontetn = response.data.list[i].context
              response.data.list[i].context = getcontetn.replace(/<\/?.+?>/g, "");
            }
            this.projectMsg = response.data.list;
            this.total1 = response.data.total;
          } else {
            this.$message({
              message: response.msg,
              type: "error"
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //  获取审批消息数据
    getApproveMsgDataFn () {
      var send_data = {
        token: this.token,
        userId: this.userId,
        pageNo: this.pageNum2,
        pageSize: this.pageSize2,
        data: {
          acceptId: this.userId
        }
      };
      this.$post("/sys/queryApproveMsg", send_data)
        .then((response) => {
          if (this.success_code == response.code) {
            this.approveMsg = response.data.list;
            this.total2 = response.data.total;
          } else {
            this.$message({
              message: response.msg,
              type: "error"
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //  同意或者拒绝加入
    agreeOrRefuse (data, flag) {
      var _this = this;
      var send_data = {
        token: this.token,
        userId: this.userId,
        data: {
          projectId: data.projectId,
          applyUserId: data.sendId
          // applyUserId: 89
        }
      };
      if (flag == "1") {
        send_data.data["result"] = 1;
      } else {
        send_data.data["result"] = 2;
      }
      var operation = send_data.data["result"];
      var send_datas = {};
      this.$post("/info/project/isJoinProject", send_data)
        .then((response) => {
          if (_this.success_code == response.code) {
            send_datas = {
              token: _this.token,
              userId: _this.userId,
              data: {
                acceptId: data.acceptId,
                id: data.id,
                operation: operation
              }
            };
          } else if (response.code == "-2006") {
            send_datas = {
              token: _this.token,
              userId: _this.userId,
              data: {
                acceptId: data.acceptId,
                id: data.id
              }
            };
          } else if (response.code == "-570") {
            // 当项目终止了不让走阅读的接口了
             _this.$message.error(response.msg)
            return
          } else {
            _this.$message({
              message: response.msg,
              type: "error"
            });
          }
          console.log(response.data)
          if (response.data == false) {
            send_datas = {
              token: _this.token,
              userId: _this.userId,
              data: {
                id: data.id,
                acceptId: data.acceptId,
                operation: 3
              }
            }
          }

          _this
            .$post("/sys/readProjectMsg", send_datas)
            .then((response) => {
              if (_this.success_code == response.code) {
                _this.getProjectMsgDataFn();
              } else {
                _this.$message({
                  message: response.msg,
                  type: "error"
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //  点击一行已读
    readOne (data) {
      if (data.readFlag == 1) {
        return;
      }
      var _this = this;
      var url = "";
      var send_data = {
        token: this.token,
        userId: this.userId,
        data: {
          id: data.id,
          acceptId: data.acceptId
        }
      };
      if (this.active_index == 0) {
        url = "/sys/readProjectMsg";
      } else if (this.active_index == 1) {
        url = "/sys/readApproveMsg";
      }
      this.$post(url, send_data)
        .then((response) => {
          if (_this.success_code == response.code) {
            if (_this.active_index == 0) {
              _this.getProjectMsgDataFn();
            } else if (_this.active_index == 1) {
              _this.getApproveMsgDataFn();
            }
          } else {
            _this.$message({
              message: response.msg,
              type: "error"
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 项目消息分页
    exchangeCurrentPage1 () {
      this.messageData = [];
      this.getProjectMsgDataFn();
    },
    // 审批消息分页
    exchangeCurrentPage2 () {
      this.approveMsg = [];
      this.getApproveMsgDataFn();
    },
    //  消息已读
    readMsgFn () {
      var _this = this;
      var url = "";
      var send_data = {
        token: this.token,
        userId: this.userId,
        data: {
          acceptId: this.userId
        }
      };
      // if (this.active_index == 0) {
      //   url = "/sys/readProjectMsg";
      // } else if (this.active_index == 1) {
      //   url = "/sys/readApproveMsg";
      // }
      this.$post("/sys/readAllMsg", send_data)
        .then((response) => {
          if (_this.success_code == response.code) {
            // if (_this.active_index == 0) {
            _this.getProjectMsgDataFn();
            // } else if (_this.active_index == 1) {
            _this.getApproveMsgDataFn();
            $(".no_read").hide();
            // }
          } else {
            _this.$message({
              message: response.msg,
              type: "error"
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //  跳转项目   (功能取消)
    goProFn (data) {
      if ((data.type == 3 && data.operation == "已同意") || data.type == 2) {
      }
    },
    isShowModule () {
      // var list = $(".message_box");
      // for (var i = 0; i < list.length; i++) {
      //   if (this.active_index == i) {
      //     $(".message_box")
      //       .eq(i)
      //       .show();
      //   } else {
      //     $(".message_box")
      //       .eq(i)
      //       .hide();
      //   }
      // }
    },
    // 页面展示条数改变事件
    handleSizeChange1 (val) {
      this.pageSize1 = val;
      setTimeout(() => {
        this.getProjectMsgDataFn();
      }, 500)
    },
    handleSizeChange2 (val) {
      this.pageSize2 = val;
      setTimeout(() => {
        this.getApproveMsgDataFn();
      }, 500)
    },

    // }
    //分页
    // onPageChange1(currentPage) {
    //     this.currentPage1 = currentPage;
    //     this.getProjectMsgDataFn();
    // },
    // onPageChange2(currentPage) {
    //     this.currentPage2 = currentPage;
    //     this.getApproveMsgDataFn();
    // },
  },
  created () {
    this.token = this.$store.state.loginObject.userToken;
    this.userId = this.$store.state.loginObject.userId;
    this.success_code = this.code.codeNum.SUCCESS;
    this.getProjectMsgDataFn();
    this.getApproveMsgDataFn();
    this.$store.commit('setMessageIcon', false);
    this.recodMessageIcon();
  },
  mounted () {
    $(".tags")
      .first()
      .addClass("tags_active");
    this.isShowModule();
    window.recProjMsg = this.handleRecesiveMsg
    window.approMsg = this.handleRecesiveApproMsg
  },
  watch: {
    currentPage1 (newV, oldV) {
      this.pageNum1 = newV;
      this.exchangeCurrentPage1();
    },
    currentPage2 (newV, oldV) {
      this.pageNum2 = newV;
      this.exchangeCurrentPage2();
    }
  }
};



//项目消息
// window.recProjMsg = function(item) {
//   console.log('1112',item)
//   var doc = "";
//   if ($(".el-pager").eq(0).find(".active").text() == 1) {
//     var data = item.data;
//     console.log('消息123',data)
//     if (data.type == 1 && data.operation == "申请中") {
//       doc = '<div data-v-f16c19a2="">' +
//         '<div data-v-f16c19a2="">' +
//         '<button data-v-f16c19a2="" type="button" class="el-button el-button--success el-button--mini el_btn_result" id="' +
//         data.id + '"  projectId="' + data.projectId + '"   acceptId="' + data.acceptId + '"  applyUserId="' + data.sendId + '" onclick="agreeRefuse(this,1)">' +
//         '<i class="el-icon-check"></i><span>同意</span>' +
//         "</button> " +
//         '<button data-v-f16c19a2="" type="button" class="el-button el-button--danger el-button--mini el_btn_result" name=" ' +
//         data + '" id="' + data.id + '"  projectId="' + data.projectId + '"   acceptId="' + data.acceptId + '"  applyUserId="' + data.sendId + '"  onclick="agreeRefuse(this,0)">' +
//         '<i class="el-icon-close"></i><span>拒绝</span>' +
//         "</button>" +
//         '<button type="button" disabled class="result_btn"></button>' +
//         "</div></div>";
//     } else if (data.type == 21){
//        doc = '<button data-v-f16c19a2="" type="button" class="el-button position-btn clearfix el-button--text" id="' + data.relationId + '"  projectId="' + data.projectId + '" onclick="docLocationFn(this,0)">' +
//             '<span><i data-v-f16c19a2="" class="fl"></i><span data-v-f16c19a2="" class="fl">定位</span></span>' +
//        '</button>'
//     } else {
//       doc = "";
//     }
//     var html =
//       '<div data-v-f16c19a2="" class="table_body_row el-row noread" onclick="readOne(this)" style="height:45px;line-height:45px;text-align: left;border-bottom: 1px solid #e7e7e7">' +
//       '<div data-v-f16c19a2="" style="padding-left: 35px;" class="title_col el-col el-col-12" title=" ' +
//       data.context +
//       ' ">' +
//       '<span data-v-f16c19a2="" class="no_read"></span> ' +
//       '<span data-v-f16c19a2="">' +
//       data.context +
//       "</span></div>" +
//       ' <div data-v-f16c19a2="" class="date_col el-col el-col-4" title=" ' +
//       data.projectName +
//       ' ">' +
//       data.projectName +
//       "</div> " +
//       ' <div data-v-f16c19a2="" class="date_col el-col el-col-4" title=" ' +
//       data.sendTime +
//       ' ">' +
//       data.sendTime +
//       "</div> " +
//       '<div data-v-f16c19a2="" class="date_col el-col el-col-4">' +
//       doc +
//       "</div></div>";
//     $(".message_box").eq(0).find(".tb_header").after(html);
//     $(".message_box").eq(0).find(".table_body_row").each(function(index) {
//         if (index > 9) {
//           $(this).hide();
//         }
//       });
//     $(".nodata_box").eq(0).hide();
//   }
//   var tNum = $(".messagecenter .is-active").text();
//   var i =  tNum.split('(');
//   var j = i[1].split(")");
//   var k = j[0];
//     $(".messagecenter .is-active").text("项目消息(" + Number(Number(k)+1) + ")");
// };
//审批消息
window.approMsg = function (item) {
  if ($(".el-pager").eq(1).find(".active").text() == 1) {
    var data = item.data;
    var html =
      '<div data-v-f16c19a2="" class="table_body_row el-row noread" onclick="readOne(this)" style="height:45px;line-height:45px;text-align: left;border-bottom: 1px solid #e7e7e7">' +
      '<div data-v-f16c19a2="" class="title_col el-col el-col-20"  style="padding-left: 35px;" title=" ' +
      data.context + ' ">' +
      '<span data-v-f16c19a2="" class="no_read"></span> ' +
      '<span data-v-f16c19a2="">' + data.context + "</span></div>" +
      ' <div data-v-f16c19a2="" class="date_col el-col el-col-4" title=" ' +
      data.sendTime + ' ">' + data.sendTime + "</div> " +
      '<div data-v-f16c19a2="">' +
      "</div></div>";
    $(".message_box").eq(1).find(".tb_header").after(html);
    $(".message_box").eq(1).find(".table_body_row").each(function () {
      if (index > 9) {
        $(this).hide();
      }
    });
    $(".nodata_box").eq(1).hide();
  }
  var tNum = $(".messagecenter .is-active").text();
  var i = tNum.split('(');
  var j = i[1].split(")");
  var k = j[0];
  $(".messagecenter .is-active").text("审批消息(" + Number(Number(k) + 1) + ")");};
</script>

<style lang="scss" scoped>
.messagecenter .messagecenter_contenti_headers {
  padding: 0 10px;
  margin: auto;
  height: 96px;
  overflow: hidden;
  background-color: #fff;
  text-align: left;
  position: relative;
  .headers_break {
    height: 46px;
    line-height: 46px;
  }

  .headers_clearFix {
    margin: 5px 0 19px;

    .headers_clearFix_title {
      font-size: 20px;
      font-weight: 600;
    }
  }
  .param_btn {
    position: absolute;
    top: 40px;
    right: 25px;
  }
}
.contenti_container {
  padding: 15px 0;

  .container_header {
    position: relative;
    height: 40px;

    .tabs_card {
      height: 100%;
      .tags {
        height: 40px;
        line-height: 40px;
        float: left;
        margin-right: 10px;
        padding: 0 10px;
        background-color: #eaeff7;
        color: #3b6db2;
        cursor: pointer;
      }
    }

    .tags_active {
      background-color: #fff !important;
      border-top: solid 3px #225aa8;
    }
  }

  .message_box {
    // margin-top: 3px;
  }
  .tb_header,
  .table_body_row {
    min-height: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    background-color: #fafafa;
    text-align: left;
    border-bottom: 1px solid #ebeef5;
  }
  .tb_header {
    text-align: center;
    background: rgb(250, 250, 250);
  }
  .header_title_col {
    text-align: left;
    padding-left: 30px;
  }
  .header_title_col.header_title_pro {
    text-align: center;
    padding-left: 0;
  }
  .table_body_row {
    background-color: #fff;
    cursor: pointer;
  }
  .table_body_row:hover {
    background-color: #f5f7fa;
  }
  .title_col {
    padding-left: 30px !important;
    display: flex;
    align-items: center;
    .no_read {
      margin-right: 10px;
      height: 8px;
      width: 8px;
      border-radius: 50%;
      background-color: #d73224;
    }
    .msg {
      display: inline-block;
      width: 90%;
      .file {
        font-size: 12px;
        width: 100%;
      }
      .cont {
        width: 100%;
      }
    }
  }
  .date_col {
    text-align: center;
    #btn_group {
      .cancel.jujue {
        font-size: 11px;
        &:hover {
          color: #edeced;
          background-color: #f56c6c;
        }
      }
      .agree {
        &:hover {
          color: #edeced;
          background-color: #67c23a;
        }
      }
    }
  }
  .pro_col {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
  }
  .nodata_box {
    text-align: center;
    padding: 150px 0;
    background-color: #fff;
  }
  .pages {
    margin-top: 2px;
    padding: 10px 0;
    padding-right: 20px;
    text-align: right;
    // background: #fff;
  }
}
</style>
<style lang="scss" type="text/css">
/*.messagecenter .el-pager .number,*/
/*.messagecenter .btn-prev,*/
/*.messagecenter .btn-next {*/
/*background-color: #fff !important;*/
/*}*/
/*.messagecenter .el-tabs__content{*/
/*  padding: 0px!important;*/
/*}*/
.messagecenter .totas_box {
  position: fixed;
  top: 80px;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 100;
  text-align: center;
  display: none;
}
.messagecenter .totas_box span {
  text-align: center;
  display: inline-block;
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  background: rgba(0, 0, 0, 0.82);
  color: #fff;
  border-radius: 4px;
}
.messagecenter .result_btn {
  display: none;
  padding: 7px 15px;
  color: #fff;
  background-color: #c8c9cc;
  border-color: #c8c9cc;
  font-size: 12px;
  border-radius: 3px;
}
.messagecenter .read {
  color: #999999;
}
.messagecenter .noread {
  color: #333;
}
.messagecenter .title_col {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.messagecenter {
  .el-button.el-button--text:hover {
    span {
      text-decoration: underline;
    }
  }
  .position-btn {
    color: #0061a9;
    height: 45px;
    i {
      padding-top: 6px;
      padding-right: 6px;
      width: 10px;
      height: 14px;
      background: url('../../../assets/project_doc/docPosition.png') no-repeat 0
        0;
    }
  }
}
// .position-btn{
//   text-align: center;
//   div{
//     text-align: center;
//   }
//   span{
//     float:left;
//     width:10px;
//     height:14px;
//     background: url("../../../assets/project_doc/docPosition.png") no-repeat 0 0;
//   }
//   p{
//     float:left;
//   }
// }
.messagecenter .contenti_container .el-col-12 {
  width: 50%;
}
.blackList p {
  color: #333;
  font-weight: bold;
}
.blackList p,
.blackList textarea {
  text-align: left;
  margin-top: 20px;
}
.blackList textarea {
  color: #999;
}

// .blackList div{
//     text-align: left;
//     margin-top: 20px;
// }
.blackList .el-dialog__header {
  border-bottom: 1px solid #ddd;
}

.blackList .el-textarea .el-textarea__inner {
  // 然后找到对应的类名，在这里将拉伸去掉即可
  resize: none;
}
.messagecenter {
  .el-tabs--border-card > .el-tabs__content {
    padding: 15px 0 0 0;
  }
}
</style>

