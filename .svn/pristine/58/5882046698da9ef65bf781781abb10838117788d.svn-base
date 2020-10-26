
<template>
  <div class="chatroom project-chat" :style="{'height':chatBoxHeight}" @click="leftKey">
    <div class="chatroom_header">
      <div class="chatroom_header_title">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>项目管理</el-breadcrumb-item>
          <el-breadcrumb-item>项目聊天</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="chatroom_header_proSelect">
        <div class="chatroom_header_proSelect_left">
          <span class="iconfont jianzhu project-company color-primary"></span>
          <div class="chatroom_header_proSelect_select">
            <span class="chatroom_header_proSelect_select_redGlobule" v-if="elseProMessageShow"></span>
            <el-select
              v-model="proSearch_select"
              filterable
              @change="proSelectFn"
              @visible-change="proPullDownFn"
              popper-class="chatroom_header_proSelect_select_dropdown"
            >
              <el-option
                v-for="item in proSearch_options"
                :key="item.projectId"
                :label="item.projectName"
                :value="item.projectId">
                <span class="select_redGlobule" v-if="item.num"></span>
                <span class="select_title">{{ item.projectName }}</span>
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="chatroom_header_proSelect_setFloating">
          <el-button type="primary" @click="setChatRecord"><i class="icon-task-btn iconfont liaotianjilu2"></i>聊天记录</el-button>
          <el-button type="primary" @click="setAllFloatingFn">设置为全局浮窗</el-button>
        </div>
      </div>
    </div>
    <div class="chatroom_section" id="chatroom_section" ref="scrollSection">
      <div class="chatroom_section_chartList" id="chatroom_section_chartList">
        <div class="chatroom_section_chartList_chunk" v-for="(item,idx) in meSpeakArr" :key="idx" :id="item.id">
          <p class="cl_title" v-if="item.flag">{{item.sendTime}}</p>
          <!-- 接收的消息 -->
          <div class="cl_left" v-if="item.sendId != userId">
            <div class="cl_left_chunk">
              <div class="cl_left_chunk_userImg">
                <!-- <i class="cl_left_chunk_userImg_icon"></i> -->
                <img  :src="(!item.userImgUrl ? defaultImage : item.userImgUrl)" :onerror="`this.src='${defaultImage}'`" alt="">
              </div>
              <div class="cl_left_chunk_right">
                <p class="cl_left_chunk_right_userName"
                   @click="aitPeopleFn(item)"
                   @mouseover="useNameHoverOverFn($event, item)"
                   @mouseout="useNameHoverOutFn($event, item)">
                  {{item.userName}}
                  <span class="cl_left_chunk_right_userName_ait" v-if="item.aitShow">@</span>
                </p>
                <div class="cl_left_chunk_right_content">
                  <p class="cl_left_chunk_right_content_character" v-if="item.context != '' " v-html="item.context">

                  </p>
                  <div class="cl_left_chunk_right_content_file" v-if="(item.type == '2' || item.type == '6')&& item.fileData">
                    <div class="cl_left_chunk_right_content_file_top">
                      <img :src="item.fileData.fileIcon">
                      <p class="cl_left_chunk_right_content_file_top_title" :title="item.fileData.docName">{{item.fileData.docName}}</p>
                    </div>
                    <div class="cl_left_chunk_right_content_file_bottom">
                      <span class="cl_right_chunk_content_character_file_bottom_preview color-primary" v-if="item.fileType" @click="previewFn(item, 1)">预览</span>
                      <span class="cl_right_chunk_content_character_file_bottom_preview color-primary" v-else @click="handleOpen(item, 2)">打开</span>
                      <span class="cl_left_chunk_right_content_file_bottom_location color-primary" @click="docLocationFn(item)">定位</span>
                    </div>
                  </div>
                  <div class="cl_left_chunk_right_content_file" v-if="(item.type != '2' && item.type != '6') && item.fileData">
                    <div class="cl_left_chunk_right_content_file_top">
                      <img :src="item.fileData.fileIcon">
                      <p class="cl_left_chunk_right_content_file_top_title" :title="item.fileData.docName">{{item.fileData.docName}}</p>
                    </div>
                    <div class="cl_left_chunk_right_content_file_bottom">
                      <!--cl_left_chunk_right_content_file_bottom_preview-->
                      <span class="all_text color-primary" @click="previewFn(item, item.type)">预览</span>
                    </div>
                  </div>
                  <div class="cl_left_chunk_right_content_image" v-if="item.imageUrl" >
                    <img :src="item.imageUrl" alt="" @dblclick="dblclickFn(item)">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 自己的消息 -->
          <div class="cl_right" v-else-if="item.sendId == userId ">
            <div class="cl_right_chunk">
              <div class="cl_right_chunk_userImg">
                <!-- <i class="cl_right_chunk_userImg_icon"></i> -->
                <img :src="(!item.userImgUrl ? defaultImage : item.userImgUrl)" :onerror="`this.src='${defaultImage}'`" alt="">
              </div>
              <div class="cl_right_chunk_content">
                <p class="cl_right_chunk_content_character" v-html="item.context"></p>
                <div class="cl_right_chunk_content_character_file" v-if="(item.type == '2' || item.type == '6') && item.fileData">
                  <div class="cl_right_chunk_content_character_file_top">
                    <img :src="item.fileData.fileIcon">
                    <p class="cl_right_chunk_content_character_file_top_title" :title="item.fileData.docName">{{item.fileData.docName}}</p>
                  </div>
                  <div class="cl_right_chunk_content_character_file_bottom">
                    <span class="cl_right_chunk_content_character_file_bottom_preview color-primary" v-if="item.fileType" @click="previewFn(item, 1)">预览</span>
                    <span class="cl_right_chunk_content_character_file_bottom_preview color-primary" v-else @click="previewFn(item, 2)">打开</span>
                    <span class="cl_right_chunk_content_character_file_bottom_location color-primary" @click="docLocationFn(item)">定位</span>
                  </div>
                </div>
                <!--本地上传为type == 5 文件夹的-->
                <div class="cl_right_chunk_content_character_file" v-if="(item.type != '2' && item.type != '6') && item.fileData">
                  <div class="cl_right_chunk_content_character_file_top">
                    <img :src="item.fileData.fileIcon">
                    <p class="cl_right_chunk_content_character_file_top_title" :title="item.fileData.docName">{{item.fileData.docName}}</p>
                  </div>
                  <div class="cl_right_chunk_content_character_file_bottom">
                    <!--cl_right_chunk_content_character_file_bottom_preview-->
                    <span class="all_text color-primary" @click="previewFn(item, item.type)">预览</span>
                  </div>
                </div>
                <!--本地上传的图片-----双击打开-->
                <div class="cl_right_chunk_content_character_image" v-if="item.imageUrl">
                  <img :src="item.imageUrl" alt="" @dblclick="dblclickFn(item)">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="chatroom_section_chartList_noMessage" v-if="meSpeakArr.length == 0">
        <i class="chatroom_section_chartList_noMessage_img"></i>
        <div class="chatroom_section_chartList_noMessage_bottom"></div>
      </div>
    </div>
    <div class="chatroom_footer">
      <transition name="fade" mode="">
        <div class="chatroom_footer_fileTitle" v-if="fileData">
          <div class="chatroom_footer_fileTitle_left">
            <img :src="fileData.fileIcon">
            <p class="chatroom_footer_fileTitle_left_title" :title="fileData.docName">{{fileData.docName}}</p>
          </div>
          <div class="chatroom_footer_fileTitle_right" @click="fileCloseFn">x</div>
        </div>
      </transition>
      <div class="chatroom_footer_opera">
        <!--<span class="chatroom_footer_opera_photo" @click="photoFn" v-show="operationShow" title="上传图片"></span>-->
        <div class="iconfont biaoqing color-primary-hover" style="position:relative;cursor: pointer;" @click.stop="emojiFn()" title="表情">
          <transition name="fade" mode="">
            <div class="chatroom_footer_opera_face_box" v-if="emojiShow" >
              <vue-emoji
                @select="selectEmoji">
              </vue-emoji>
            </div>
          </transition>

        </div>
        <span class="iconfont aite color-primary-hover" style="position:relative;cursor: pointer;" @click.stop="aitFn()" title="@人员">
              <transition name="fade" mode="">
                <div class="chatroom_footer_opera_ait_list" id="chatroom_footer_opera_ait_list" v-show="aitShow">
                  <p class="chatroom_footer_opera_ait_list_item" @click.stop="aitPeopleFn(aitAll)" >@所有人</p>
                  <button class="chatroom_footer_opera_ait_list_item" @click.stop="aitPeopleFn(item)"  v-for="(item, idx) in aitPeopleList" :key="idx" :title="item.usName">{{item.usName}}</button>
                </div>
              </transition>
            </span>
        <!-- <add-attachment ref="attachment"
                        flag="chat"
                        :isPicture="true"
                        :projectId="projectId"
                        @upload-pic="photoUploadFn"
                        @select="handleSelectAttachment"></add-attachment> -->
      </div>
      <div class="chatroom_footer_text" @click="showPlace">
        <span v-show="placeShow" class="messagePlace">请输入消息</span>
        <div  ref="cTextareaRef"
              v-show="!placeShow"
              class="chatroom_footer_text_textarea"
              id="chatroom_footer_text_textarea"
              @keydown.enter.exact="sendMessageFn"
              @keyup.ctrl.enter="lineFeed($event)"
              @keyup="macHandleKeyup($event)"
              @keypress="handleKeypress($event)"
              @keydown="handleKeydown($event)"
              @focus="handleFocus($event)"
              @compositionend="handleEnd"
              @change="handleInputChange($event)"
              contenteditable="true">
        </div>
      </div>
      <div class="c_footer_enter">
        <p class="c_f_enter_remind">Enter发送,Ctrl+Enter换行</p>
        <div class="c_f_enter_send">
          <transition name="fade" mode="">
            <div class="c_f_enter_title" v-if="wordsFlag">
              <i class=el-icon-warning></i>
              {{tips}}
            </div>
          </transition>
          <el-button class="send_btn" @click="sendMessageFn">发送</el-button>
        </div>
      </div>
    </div>
    <!-- 图片上传器 -->
    <upload-doc-add
      v-if="photoUploadFlag"
      :uploadDocAddIsShow="phototUploadAddIsShow"
      :uploadParamData="photoUploadParamData"
      @sendValueToParent="photoUploadAddDocCloseFn"
      @docUpload="photoUploadFn"
      @docUploadAllsucess="photoUploadAllsucess"
      :accpet="photoAccpet"
      ref="photoUploadRef"
    ></upload-doc-add>
    <!-- 文件上传器 -->
    <upload-doc-add
      v-if="docUploadFlag"
      :uploadDocAddIsShow="docUploadAddIsShow"
      :uploadParamData="docUploadParamData"
      @sendValueToParent="docUploadAddDocCloseFn"
      @docUpload="docUploadFn"
      @docUploadAllsucess="docUploadAllsucess"
      ref="docUploadRef"
    ></upload-doc-add>
    <!-- 从底稿上传 -->
    <manuscript-Add-Doc
      v-if="manuscriptUploadFlag"
      :manscProjectId="manuscProjectId"
      @clearstate="manuscriptUploadCloseFn"
      @elationUpmansc="manuscriptUploadFn"
    ></manuscript-Add-Doc>
    <!-- 从项目文档上传 -->
    <relation-Add-Doc
      v-if="proDocUploadFlag"
      :getProjectId="proDocUploadProjectId"
      @clearstates="proDocUploadCloseFn"
      @elationUp="proDocUploadFn"
    ></relation-Add-Doc>
     <!-- 聊天记录的弹框 -->
      <project-chat-record
          :chatRecordShow.sync="chatRecordShow"
          :chatRecordObj = "chatRecordObj"
          @chatRecordLocal = "chatRecordLocal">
      </project-chat-record>
  </div>
</template>
<script>
  import vueEmoji from '@/components/emoji/emoji.vue'
  import uploadDocAdd from "@/components/file/uploadAddDoc"; //上传的文件的组件
  import {wisdom_doc} from "@/pages/common/js/doc.main"; //上传的文件的组件
  import manuscriptAddDoc from '@/components/relation/manuscript'; //从底稿选择文件的组件
  import relationAddDoc from "@/components/relation/projectDocRelation"; //从项目文档选择文件的组件
  import projectChatRecord from "@/components/select_box/projectChatRecord"; // 项目聊天记录
  import { setTimeout } from 'timers';

  export default {

    data() {
      return {
        placeShow: true,
        isLoadingMore: false,
        frontPageNo:1, //
        lastPageNo:1,
        initStateheight: 0,
        selectedFileList: [],
        token: '',
        userId: '',
        projectId: '',
        reqApi: '',
        socket: '',
        defaultImage:require('@/assets/user_img/user2.png'),
        defaultImageError:'this.src='+require('@/assets/user_img/user2.png'),
        requestCode: {},//接口默认字段
        aitShow: false,
        emojiShow: false,
        docShow: false,
        proSearch_select: '', //项目搜索下拉框
        elseProMessageShow: false,
        allFloatingFlage: false,
        operationShow: true,
        value: '',
        fileData: '',
        proSearch_options:[],
        aitAll: {
          usName: '所有人',
          special: true
        },
        aitPeopleList: [],
        sendMessage_input: '', //发送信息值
        dd: "",
        contentMaxLength: 1000,
        sel: '', //光标
        savedRange: {}, //光标的片段
        busy: true,
        listPageNo: 1,
        listPageSize: 10,
        pages: '',
        meSpeakArr: [],
        //图片上传配置
        photoUploadFlag: false, //控制显示隐藏开关
        phototUploadAddIsShow: false, //同上
        photoUploadParamData: {}, //上传的需要的数据
        photoAccpet: ".jpg,.jpeg,.gif,.bmp,.png,.psd", //上传文件都为图片格式
        //文件上传配置
        docUploadFlag: false,
        docUploadAddIsShow: false,
        docUploadParamData: {},
        //底稿上传器配置
        manuscriptUploadFlag: false,
        manuscProjectId: '',
        //项目文档上传配置
        proDocUploadFlag: false,
        proDocUploadProjectId: '',
        wordsFlag: false, //字数标题显示
        tips: '',
        fileList: '',
        persionList: [],
        persionShow: false,
        content: '',
        enojiShow: false,
        context:'',
        aitPeopleListCopy:[],
        chatRecordShow: false, //聊天记录的展示
        chatRecordObj: {},
        chectReturnData: {},
        chatRecordflow: false
      }
    },
    beforeRouteEnter(to, from, next) {
      sessionStorage.allFloatingFromUrl = from.fullPath
      next()
    },
    beforeRouteLeave(to, from, next) {
      to.meta.keepAlive = false;
      // sessionStorage.removeItem("allFloatingFromUrl");
      sessionStorage.allFloatingFromUrl = from.fullPath
      next();
    },
    created() {
      let formObj = {
        allFloatingFlage: false
      }
      this.token = this.$store.state.loginObject.userToken;
      this.userId = this.$store.state.loginObject.userId;
      this.projectId = this.$route.query.prePro && this.$store.state.chatProjectObj.projectId ?  this.$store.state.chatProjectObj.projectId : this.$store.state.projectMsg.pro_id;
      this.requestCode = this.code.codeNum;
      this.reqApi = global.baseUrl;
      this.$store.commit('allFloatingFn', formObj)
      this.getAllProMessageFn() //项目列表和消息
      this.getAllAitPeopleFn() //@人员列表
      this.setMessageRead() //设置当前项目已读
      if(this.$route.query.docData) { //文件讨论
        this.fileData = JSON.parse(this.$route.query.docData)
        if (!this.fileData.fileType) {
         this.fileData.fileType = this.fileData.docName.substring(this.fileData.docName.lastIndexOf(".") + 1, this.fileData.docName.length);//截
        }
        this.operationShow = false;
        this.iconFilter(this.fileData)
        this.getAllChatMessageFn()
      } else {
        this.getAllChatMessageFn() //项目聊天列表所有信息
      }
    },
    mounted() {
      document.addEventListener('selectionchange', this.selectHandler()); // 每次光标变化的时候，保存 range
      $("#chatroom_footer_text_textarea").on("paste",  (e)=> {
        this.handlePaste(e)
      });
      // 鼠标滚动事件
      this.initLoadMore()
    },
    methods: {
      // 处理ie11下光标在输入placeholder之后的问题，点击时取消占位符的展示
      showPlace () {
        this.placeShow = false
        this.$nextTick(()=>{
          $("#chatroom_footer_text_textarea").focus()
        })
      },

      // 初始化滚动加载更多
      initLoadMore () {
        let that = this
        let sign = 5
        const dom = document.querySelector('#chatroom_section')
        dom.addEventListener('scroll', function () {
          let scrollDistance = dom.scrollHeight - dom.scrollTop - dom.clientHeight
          if (scrollDistance <= sign && !that.isLoadingMore) { // 滚动条拉到了底部
            that.isLoadingMore = true
            that.loadBottonMore()
          } else if ( dom.scrollTop <= sign && !that.isLoadingMore) {
            that.isLoadingMore = true
            that.loadMore()
            dom.scrollTop = 6
          }
        })
      },

      // 文件的打开方法
      handleOpen(item) {
        this.previewFn(item, 2)
      },

      // 滚动的函数
      functionScroll () {
        var e = e || window.event;
          if(e.wheelDelta) {
              var divScrollTop = document.querySelector("#chatroom_section").scrollTop;
              var divClientHeight = document.querySelector("#chatroom_section").clientHeight;
              var divScrollHeight = document.querySelector("#chatroom_section").scrollHeight;
                if(e.wheelDelta > 0) {     //当鼠标滚轮向上滚动时
                    // console.log("鼠标滚轮向上滚动1.1-top", this.chectReturnData.pageNo, this.listPageNo);
                    // if (divScrollTop == 0) {
                    //     this.loadMore()
                    // }
                }
                if(e.wheelDelta < 0) {     //当鼠标滚轮向下滚动时
                  if (this.listPageNo === 1) {
                    return
                  }
                  if(parseInt(divScrollTop + divClientHeight) + 1 >= parseInt(divScrollHeight)){
                      if (this.listPageNo < 1) {
                        return
                      }
                      this.busy = true
                      this.loadBottonMore()
                  }
                }
          } else if(e.detail) {
                if(e.detail < 0) {   //当鼠标滚轮向上滚动时
                    // console.log("鼠标滚轮向上滚动1.2-top");
                }
                if(e.detail > 0) {   //当鼠标滚轮向下滚动时
                    // console.log("鼠标滚轮向下滚动1.2-botom");
                }
          }
      },

      // 打开聊天记录弹框
      setChatRecord () {
        let obj = {
          projectId: this.projectId,
          projectName: this.proSearch_select
        }
        this.chatRecordObj = obj
        this.chatRecordShow = true
      },

      // 记录弹框返回
      // 根据页码先返回相对应的数据
      // 再次监听滚动的事件，获取页码，根据高度进行调用接口
      // 接口返回的数据的插入
      chatRecordLocal (data) {
        // 先清除上次定位的样式
        let id = this.chectReturnData.id
        $('#' + id).css('background-color', '#f0f2f5')

        // 处理本次定位的数据
        this.chatRecordflow = true
        this.chectReturnData = data
        this.isLoadingMore = false
        // 总页码去找数据
        this.loadMore(this.chectReturnData)
      },

      // 上传文件的函数
      handleSelectAttachment(data){
        switch (data.type) {
          case 1:
            this.docUploadFn(data.data);
            break
          case 2:
            this.proDocUploadFn(data.data);
            break
          case 3:
            this.manuscriptUploadFn(data.data);
            break
        }
      },

      // 复制粘贴
      handlePaste(e){
        e.preventDefault();
        // 判断是否超出字数限制
        var text;
        var clp = (e.originalEvent || e).clipboardData;
        if (clp === undefined || clp === null) {
          text = window.clipboardData.getData("text") || "";
          text = text.replace('\n', '<br>')
          if (text !== "") {
            if (window.getSelection) {
              var newNode = document.createElement("span");
              newNode.innerHTML = text;
              window.getSelection().getRangeAt(0).insertNode(newNode);
            } else {
              document.selection.createRange().pasteHTML(text);
            }
          }

        } else {
          text = clp.getData('text/plain') || "";
          text = text.replace('\n', '<br>')
          if (text !== "") {
            document.execCommand('InsertHTML', false, text);
          }
        }
        this.valueHandle(e, this.$refs.cTextareaRef.innerHTML)
      },

      // 左键处理事件
      leftKey(e) {
        if(e.button == 0) {
          this.aitShow = false;
          this.emojiShow = false;
          this.docShow = false;
        }
      },

      // 获取浏览器的可视高度
      getViewPortHeight() {
        return document.documentElement.clientHeight || document.body.clientHeight;
      },

      // 讨论过来的文件、文件夹的关闭函数
      fileCloseFn() {
        this.fileData = '';
        this.operationShow = true;
        this.$router.push({
          path: '/projecchat',
        });
        this.listPageNo = 1
        this.getAllChatMessageFn();
      },

       //设置聊天消息已读
      setMessageRead() {
        let obj ={
          token: this.token,
          userId: this.userId,
          data:{
            projectId: this.projectId
          }
        }
        this.$post("/info/projectChat/readChat",obj).then((res => {
          if(this.requestCode.SUCCESS !== res.code){
            if(this.requestCode.RESULT_EMPTY == res.code) {
              return;
            } else {
              this.$message.error(res.msg);
              return;
            }
          }
        })).catch(error => {

        });
      },
       //划进用户名 itemValue当前数据对象 e当前标签
      useNameHoverOverFn(e, itemValue) {
        e.target.className = 'cl_left_chunk_right_userName_hover'
        this.$set(itemValue, 'aitShow' , true)
      },
       //划出用户名 itemValue当前数据对象 e当前标签
      useNameHoverOutFn(e, itemValue) {
        e.target.className = 'cl_left_chunk_right_userName'
        this.$set(itemValue, 'aitShow' , false)
      },
      // 表情的点击
      emojiFn() {
        this.emojiShow = !this.emojiShow
        this.aitShow = false;
        this.docShow = false;
      },
       //获取所以项目和项目未读消息
      getAllProMessageFn() {
        let obj ={
          token: this.token,
          userId: this.userId,
          data:{
            projectId: this.projectId
          }
        }
        this.$post("/info/projectChat/queryProjectChatNum",obj).then((res => {
          if(this.requestCode.SUCCESS !== res.code){
            if(this.requestCode.RESULT_EMPTY == res.code) {
              return;
            } else {
              this.$message.error(res.msg);
              return;
            }
          }
          let i = 0;
          this.proSearch_options = res.data
          this.proSearch_options.map((item, idx) => {
            if(item.projectId === this.projectId) {
              this.proSearch_select = item.projectName;
            }
            if(item.num != 0) {
              i ++;
            }
          })
          setTimeout(() => {
            i != 0 ? this.elseProMessageShow = true :this.elseProMessageShow = false;
          })
         // 当有消息时，弹框也会有消息
         this.elseProMessageShow ? window.msg.$store.state.allFloatingObj.iconStyle = true : window.msg.$store.state.allFloatingObj.iconStyle = false
        })).catch(error => {

        });
      },

      // 项目切换时查询相关的数据
      proPullDownFn(flag) {
        flag && this.getAllProMessageFn();
      },

      // 切换项目
      proSelectFn(itemValue) {
        this.proSearch_options.map((item, idx) => {
          if(item.projectId === itemValue) {
            this.projectId = item.projectId;
            this.$store.commit("chatProjectFn", item.projectId);
            this.getAllChatMessageFn();
            this.getAllAitPeopleFn();
            this.getAllProMessageFn();
            this.setMessageRead();
            this.fileCloseFn()
            this.isLoadingMore = false;
            this.listPageNo = 1;
          }
        })
      },

      // 查询之后需要记录到系统日志
      setSysLogMessage(){
        if (!this.fileData) return
        let data = {
          token: this.token,
          userId: this.userId,
          sourceName: this.$route.query.sourceName,
          projectName: this.$store.state.projectMsg.projectMsg.name,
          data: {
            id: this.fileData.id // 文件的主键id
          }
        }
        if (this.fileData.paperId) {data.paperFlag = true}
        this.$post("/doc/project/log/addDiscussLog",data).then(res => {
          console.log(res)
        })
      },

       //获取所有聊天信息listPageNo
      getAllChatMessageFn () {
        let obj ={
          token: this.token,
          userId: this.userId,
          pageNo: this.listPageNo,
          pageSize: this.listPageSize,
          data:{
            projectId: this.projectId,
            fileId: this.fileData.paperId ? this.fileData.id : (this.fileData.docId ? this.fileData.docId : this.fileData.id),
            fileSource: (this.fileData.paperId && this.fileData.docType === 0) ? '0' : ''
          }
        }
        this.$post("/info/projectChat/queryProjectChat",obj).then((res => {
          this.isLoadingMore = false
          if(this.requestCode.SUCCESS !== res.code){
            if(this.requestCode.RESULT_EMPTY == res.code) {
              return;
            } else {
              this.$message.error(res.msg);
              return;
            }
          }
          this.pages = res.data.pages
          res.data.list.map((item, idx) => {
            if(item.type == '2' || item.type == '6') { //文件讨论的历史聊天记录
              //设置讨论的文件展示
              item.fileData = {};
              item.fileData.type = item.fileType;
              item.fileData.docType = item.fileType ? item.fileType : 1;
              item.fileData.docName = item.fileName;
              this.iconFilter(item.fileData)
            } else {
              //上传文件和图片的记录
              if(item.fileType) {
                if(item.fileType.indexOf('application') != -1) { //fileType字段里application/后缀拼起来的 文件的类型
                  var matches = item.fileName.lastIndexOf('.')
                  var suffix = item.fileName.substring(matches + 1, item.fileName.length)
                  item.fileData = {};
                  item.fileData.type = suffix;
                  item.fileData.docName = item.fileName;
                  this.iconFilter(item.fileData)
                } else if(item.fileType.indexOf('image') != -1) { //fileType字段里image/后缀拼起来的 图片的类型
                  item.imageUrl = this.$utils.getDownloadUrl(item.fileId);
                } else if(item.fileType == 'jpg' ||
                  item.fileType == 'jpeg'||
                  item.fileType == 'gif' ||
                  item.fileType == 'bmp' ||
                  item.fileType == 'png' ||
                  item.fileType == 'psd'){ //fileType字段里只用后缀的 图片的类型
                  item.imageUrl = this.$utils.getDownloadUrl(item.fileId);
                } else { //fileType字段里只用后缀的 文件的类型
                  item.fileData = {};
                  item.fileData.type = item.fileType;
                  item.fileData.docName = item.fileName;
                  this.iconFilter(item.fileData)
                }
              }
            }
            // 用户头像
            if(item.userImg) {
              item.userImgUrl = this.$utils.getDownloadUrl(item.userImg)
            }
          })
          if(res.data.list.length == 1) {
            var start = this.getDayName(res.data.list[0].sendTime);
            if(start == '今天') {
              var start = res.data.list[0].sendTime.indexOf(' ');
              var dateString = res.data.list[0].sendTime.substr(0, start + 1)
              res.data.list[0].sendTime = res.data.list[0].sendTime.replace(dateString, '')
            } else if(start == '昨天') {
              var start = res.data.list[0].sendTime.indexOf(' ');
              var dateString = res.data.list[0].sendTime.substr(0, start)
              res.data.list[0].sendTime = res.data.list[0].sendTime.replace(dateString, '昨天')
            }
            res.data.list[0].flag = true;
          }
          for(let i = 0; i < res.data.list.length - 1; i++) {
            if(res.data.list[i].untime * 1000 - res.data.list[i + 1].untime * 1000 > 60000) {
              var start = this.getDayName(res.data.list[i].sendTime);

              if(start == '今天') {
                var start = res.data.list[i].sendTime.indexOf(' ');
                var dateString = res.data.list[i].sendTime.substr(0, start + 1)
                res.data.list[i].sendTime = res.data.list[i].sendTime.replace(dateString, '')
              } else if(start == '昨天') {
                var start = res.data.list[i].sendTime.indexOf(' ');
                var dateString = res.data.list[i].sendTime.substr(0, start)
                res.data.list[i].sendTime = res.data.list[i].sendTime.replace(dateString, '昨天')
              }
              res.data.list[i].flag = true;
            }
          }
          this.meSpeakArr = res.data.list.reverse();
          this.setSysLogMessage()
          let idx = this.meSpeakArr.findIndex(v=>v.id === this.chectReturnData.id)
          this.$refs.cTextareaRef.innerHTML = "";
          this.aitShow = false
          if (this.chatRecordflow) {
            if(idx<2) {
              document.querySelector("#chatroom_section").scrollTop = 0;
              this.scrollToLocation()
              return
            }else if(idx>7){
              let el = document.querySelector("#chatroom_section")
              document.querySelector("#chatroom_section").scrollTop = el.clientHeight;
              this.lastPageNo>1 ? this.loadBottonMore() : this.scrollToLocation()
              return
            }
            this.scrollToLocation()
            return
          }
          this.scrollToBottom()
        })).catch(error => {
          console.log(error)
        });
      },

      // 定位到的样式
      scrollToLocation(){
        this.isLoadingMore = false
        let id = this.chectReturnData.id
        setTimeout(()=> {
          $('#' + id).css('background-color', 'rgba(227,235,245,1)')
          document.getElementById(id).scrollIntoView({block: "center", behavior: "smooth"})
          setTimeout(()=>{
            $('#' + id).css('background-color', '#f0f2f5')
          }, 3000)
        }, 1000)
      },

      // 滚动获取所有聊天信息
      scrollGetAllChatMessageFn (val) {
        if (val) {
          this.listPageNo = val
        }
        if(this.listPageNo>this.pages) {
          this.isLoadingMore =  false
          return
        }
        let obj ={
          token: this.token,
          userId: this.userId,
          pageNo: this.listPageNo,
          pageSize: this.listPageSize,
          data:{
            projectId: this.projectId,
            fileId: this.fileData.paperId  ? this.fileData.id : (this.fileData.docId ? this.fileData.docId : this.fileData.id),
            fileSource: (this.fileData.paperId && this.fileData.docType == 0) ? '0' : ''
          }
        }
        this.$post("/info/projectChat/queryProjectChat",obj).then((res => {
          if(this.requestCode.SUCCESS !== res.code){
            this.isLoadingMore =  false
            if(this.requestCode.RESULT_EMPTY == res.code) {
              return;
            } else {
              this.$message.error(res.msg);
              return;
            }
          }
          // val 下加载
          val ? (this.lastPageNo=this.listPageNo) : (this.frontPageNo=this.listPageNo)
          this.busy = true;
          this.pages = res.data.pages
          res.data.list.map((item, idx) => {
            if(item.type == '2' || item.type == '6') { //文件讨论的历史聊天记录
              //设置讨论的文件展示  dir文件夹的类型
              item.fileData = {};
              item.fileData.type = item.fileType;
              item.fileData.docType = item.fileType ? item.fileType : 1;
              item.fileData.docName = item.fileName;
              this.iconFilter(item.fileData)
            } else {
              //上传文件和图片的记录
              if(item.fileType) {
                if(item.fileType.indexOf('application') != -1) { //fileType字段里application/后缀拼起来的 文件的类型
                  var matches = item.fileName.lastIndexOf('.')
                  var suffix = item.fileName.substring(matches + 1, item.fileName.length)
                  item.fileData = {};
                  item.fileData.type = suffix;
                  item.fileData.docName = item.fileName;
                  this.iconFilter(item.fileData)
                } else if(item.fileType.indexOf('image') != -1) { //fileType字段里image/后缀拼起来的 图片的类型
                  item.imageUrl = this.$utils.getDownloadUrl(item.fileId);
                } else if(item.fileType == 'jpg' ||
                  item.fileType == 'jpeg'||
                  item.fileType == 'gif' ||
                  item.fileType == 'bmp' ||
                  item.fileType == 'png' ||
                  item.fileType == 'psd'){ //fileType字段里只用后缀的 图片的类型
                  item.imageUrl = this.$utils.getDownloadUrl(item.fileId);
                } else { //fileType字段里只用后缀的 文件的类型
                  item.fileData = {};
                  item.fileData.type = item.fileType;
                  item.fileData.docName = item.fileName;
                  this.iconFilter(item.fileData)
                }
              }
            }
            if(item.userImg) {
              item.userImgUrl = this.$utils.getDownloadUrl(item.userImg)
            }
          })
          for(let i = 0; i < res.data.list.length - 1; i++) {
            if(res.data.list[i].untime * 1000 - res.data.list[i + 1].untime * 1000 > 60000) {
              var start = this.getDayName(res.data.list[i].sendTime);
              if(start == '今天') {
                var start = res.data.list[i].sendTime.indexOf(' ');
                var dateString = res.data.list[i].sendTime.substr(0, start + 1)
                res.data.list[i].sendTime = res.data.list[i].sendTime.replace(dateString, '')
              } else if(start == '昨天') {
                var start = res.data.list[i].sendTime.indexOf(' ');
                var dateString = res.data.list[i].sendTime.substr(0, start)
                res.data.list[i].sendTime = res.data.list[i].sendTime.replace(dateString, '昨天')
              }
              res.data.list[i].flag = true;
            }
          }

          val
          ? this.meSpeakArr.push(...res.data.list.reverse())
          : this.meSpeakArr.unshift(...res.data.list.reverse())
           this.$nextTick(() => {//.lastElementChild.offsetTop
            if(this.chatRecordflow){
              this.chatRecordflow = false
                this.scrollToLocation()
                return
            }
            this.isLoadingMore =  false
            })
        })).catch(error => {

        });
      },

      // 获取所有可以ait的人员
      getAllAitPeopleFn() {
        let obj ={
          token: this.token,
          userId: this.userId,
          data:{
            projectId: this.projectId
          }
        }
        this.$post("/info/project/getMemberAll",obj).then((res => {
          if(this.requestCode.SUCCESS !== res.code){
            if(this.requestCode.RESULT_EMPTY == res.code) {
              return;
            } else {
              this.$message.error(res.msg);
              return;
            }
          }
          this.aitPeopleList = res.data;
          this.aitPeopleListCopy = this.aitPeopleList
          this.aitStyle(this.aitPeopleList)
        })).catch(error => {

        });
      },

      // @人员的事件
      aitFn() {
        this.aitShow = !this.aitShow;
        this.emojiShow = false;
        this.docShow = false;
        this.$nextTick(() => {
          var aitListHeight = document.getElementById('chatroom_footer_opera_ait_list')
          aitListHeight.style.top = '-' + (aitListHeight.clientHeight + 20) + 'px'
        })
      },

      // 选择表情图片
      selectEmoji (code) {
        this.showPlace()
        var str = '';
        this.emojiShow = false;
        this.$refs.cTextareaRef.innerHTML = this.$refs.cTextareaRef.innerHTML + this.emoji(code)
        var imgS = this.$refs.cTextareaRef.getElementsByTagName('img')
        this.emoji(code)
        if(this.$refs.cTextareaRef.innerHTML.length >= this.contentMaxLength) {
          Array.from(imgS).map((item, idx) => {
            var dataEmoji = item.getAttribute('data-emoji')
            if(dataEmoji == code) {
              this.$refs.cTextareaRef.removeChild(item) //如果当前的输入框长度不够当前的表情的长度删除当前表情
            }
          })
          return;
        }
        this.sel.selectAllChildren(this.$refs.cTextareaRef); //取消之前的文本区域 设置新的区域
        this.sel.collapseToEnd() //把光标定位到文本最后
        this.$refs.cTextareaRef.focus() //闪烁光标
        this.enojiShow = true
      },

      // 选择@列表角色名 itemValue:每条数据信息
      aitPeopleFn(itemValue = null) {
        this.placeShow = false
        let aitName = document.createElement('a')
        aitName.innerHTML = itemValue.usName ? `@ ${itemValue.usName} ` : `@ ${itemValue.userName} `;
        aitName.className = itemValue.special ? 'aitNameActiveAll' : 'aitNameActive'
        aitName.setAttribute("data-userId", itemValue.userId ? itemValue.userId : itemValue.sendId);
        // 手动输入第一个@，然后选择的相对应的人
        if(this.$refs.cTextareaRef.innerHTML.charAt(this.$refs.cTextareaRef.innerHTML.length - 1) == '@' ) { // 区分下是手动输入@还是通过上方导航栏来选择的@
          this.$refs.cTextareaRef.innerHTML = this.$refs.cTextareaRef.innerHTML.slice(0,this.$refs.cTextareaRef.innerHTML.length-1) //先把输入的@去掉
          this.$refs.cTextareaRef.appendChild(aitName) //在把设置好的@放进当前输入框里
        } else {
          // 输入@人，或者直接@人 点击的
          // 检测查找到的内容--光标前最近的一次@人
          // 重新获取输入框中的内容，包含标签
          if (this.content) {
            this.content = this.$refs.cTextareaRef.innerHTML
            let a = this.$refs.cTextareaRef.innerHTML.lastIndexOf('@')
            // 如果检测到的最后一个值在人员中没有，则替换
            let b = this.$refs.cTextareaRef.innerHTML.substring(a + 1, this.$refs.cTextareaRef.innerHTML.length)
            var str = 0
            if (b.indexOf("</a>") != -1) {
              str = 1
            }
            if (str == 0 && a > -1) {
              this.$refs.cTextareaRef.innerHTML = this.$refs.cTextareaRef.innerHTML.substring(0, a)
            } else {
              this.$refs.cTextareaRef.innerHTML = this.content
            }
          }
          this.$refs.cTextareaRef.appendChild(aitName)
          this.content = ''
        }
        if(this.$refs.cTextareaRef.innerHTML.length >= this.contentMaxLength) {
          this.$refs.cTextareaRef.removeChild(aitName) //如果当前的输入框长度不够当前的@的长度删除当前表情
          this.aitShow = false;
          this.tips = '超出输入限制!'
          this.wordsFlag = true;
          setTimeout(() => {
            this.wordsFlag = false;
          }, 1000)
          return;
        }
        this.$refs.cTextareaRef.innerHTML = this.$refs.cTextareaRef.innerHTML + '&nbsp;'
        this.sel.selectAllChildren(this.$refs.cTextareaRef); //取消之前的文本区域 设置新的区域
        this.sel.collapseToEnd() //把光标定位到文本最后
        this.$refs.cTextareaRef.focus() //闪烁光标
        this.aitShow = false;
      },

      // 设置为全局浮窗函数
      setAllFloatingFn() {
        this.elseProMessageShow ? window.msg.$store.state.allFloatingObj.iconStyle = true : window.msg.$store.state.allFloatingObj.iconStyle = false
        this.allFloatingFlage = true;
        let allFloatingFromUrl = sessionStorage.allFloatingFromUrl
        sessionStorage.isAllChat = true;
        let formObj = {
          allFloatingFromUrl: allFloatingFromUrl,
          allFloatingFlage: this.allFloatingFlage
        }
        this.$store.commit('allFloatingFn', formObj)
        this.$store.commit("chatProjectFn", this.projectId);
        this.$router.push(allFloatingFromUrl)
      },
      // enter发送
      sendMessageFn(event) {
        // 表情
        if (this.enojiShow) {
          let o = document.getElementById("chatroom_footer_text_textarea")
          let delArr = o.querySelectorAll('div')
          Array.from(delArr).map((item, idx) => {
            if(item.querySelector('br')  && (item.nextElementSibling ? item.nextElementSibling.querySelector('br'): true)) {
              this.$refs.cTextareaRef.removeChild(item)
            }
          })
          this.filterReqDataFn() //调用发送接口
          this.$refs.cTextareaRef.innerHTML = "";
          this.enojiShow = false
          return
        }
        // 为空不可发送，出现提示
        if($("#chatroom_footer_text_textarea").val() === '' && $("#chatroom_footer_text_textarea").text() === '' || this.$refs.cTextareaRef.innerText.trim() === '') {
          this.tips = '不能发送空白消息！',
          this.wordsFlag = true
          this.$refs.cTextareaRef.innerHTML = "";
          setTimeout(() => {
            this.wordsFlag = false;
          }, 1000)
          return;
        }
        let o = document.getElementById("chatroom_footer_text_textarea")
        let delArr = o.querySelectorAll('div')
        Array.from(delArr).map((item, idx) => {
          if(item.querySelector('br')  && (item.nextElementSibling ? item.nextElementSibling.querySelector('br'): true)) {
            this.$refs.cTextareaRef.removeChild(item)
          }
        })
        this.filterReqDataFn() //调用发送接口
        this.$refs.cTextareaRef.innerHTML = "";
      },

       // 处理请求的数据
      filterReqDataFn(itemValue = null, type) {
        // type传值为1时，是从本地上传或者项目文档中选择的文件类型为5，只可以预览，不走查询文件存不存在
        let Y,M,D,h,m,s,date,time,obj={},userIdsArr=[],firstRep;
        firstRep = this.$refs.cTextareaRef.innerHTML.replace(/["]+/g,'')
        //当前的时间
        date = new Date()
        Y = date.getFullYear() + '-';
        M = (date.getMonth() + 1 < 10 ? '0'+(date.getMonth() + 1) : date.getMonth() + 1) + '-';
        D = date.getDate() + ' ';
        h = date.getHours() + ':';
        m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
        s = date.getSeconds();
        time = Y + M + D + h + m + s;

        //请求接口数据
        obj.token = this.token;
        obj.userId = this.userId;
        obj.data = {
          projectId: this.projectId,
          sendId: this.userId,
          context: firstRep ? firstRep : this.$refs.cTextareaRef.innerHTML.replace(/[\r\n]/g,""),
          sendTime: time,
        }
        if(this.fileData && type !== 1) { //讨论的文件存在时
          obj.data.type = 2;
          obj.data. fileName = this.fileData.docName; //文件名字
          obj.data.fileId = this.fileData.docId ? this.fileData.docId : this.fileData.id
          obj.data.fileType = this.fileData.type; //文件后缀
          obj.data.rfsId = this.fileData.rfsId;
          // 针对文件的讨论且@所有人和@单个人的需要传userIds
          if (this.$refs.cTextareaRef.innerHTML.indexOf('aitNameActiveAll') != -1 && this.$refs.cTextareaRef.innerHTML.indexOf('aitNameActive') != -1) {
              let userIdArr = this.$refs.cTextareaRef.querySelectorAll('.aitNameActive');
            if (userIdArr.length) {
              Array.from(userIdArr).map((item, idx) => {
                let userId = item.getAttribute('data-userId')
                userIdsArr.push(userId)
              })
              obj.data.userIds = Array.from(new Set(userIdsArr)).join(',')
            }
            if (!userIdArr.length) {
              let userIds = this.aitPeopleList.map(v=> {return v.userId})
              obj.data.userIds = userIds.join(',')
            }
          } else if (this.$refs.cTextareaRef.innerHTML.indexOf('aitNameActive') != -1) {
            let userIdArr = this.$refs.cTextareaRef.querySelectorAll('.aitNameActive');
            Array.from(userIdArr).map((item, idx) => {
              let userId = item.getAttribute('data-userId')
              userIdsArr.push(userId)
            })
            obj.data.userIds = Array.from(new Set(userIdsArr)).join(',')
          }
        } else if(this.$refs.cTextareaRef.innerHTML.indexOf('aitNameActiveAll') != -1){ //包含@所有人时
          obj.data.type = 4;
            let userIdArr = this.$refs.cTextareaRef.querySelectorAll('.aitNameActive');
            if (userIdArr.length) {
              Array.from(userIdArr).map((item, idx) => {
                let userId = item.getAttribute('data-userId')
                userIdsArr.push(userId)
              })
              obj.data.userIds = Array.from(new Set(userIdsArr)).join(',')
            }
            if (!userIdArr.length) {
              let userIds = this.aitPeopleList.map(v=> {return v.userId})
              obj.data.userIds = userIds.join(',')
            }
        } else if(this.$refs.cTextareaRef.innerHTML.indexOf('aitNameActive') != -1) { //都是单人@时
          obj.data.type = 3;
          let userIdArr = this.$refs.cTextareaRef.querySelectorAll('.aitNameActive');
          Array.from(userIdArr).map((item, idx) => {
            let userId = item.getAttribute('data-userId')
            userIdsArr.push(userId)
          })
          obj.data.userIds = Array.from(new Set(userIdsArr)).join(',')
        }else if (type === 1){ // 本地上传的文件加类型为5,项目文档和底稿上传的都为5
          obj.data.type = 5;
        } else if (this.fileData.paperId) {
          obj.data.paperId = this.fileData.paperId
          obj.data.type = '6'
        } else { //正常发信息
          obj.data.type = 1;
        }
        if(itemValue && type !== 1) {
          obj.data. fileName = itemValue.docName; //文件名字
          obj.data.fileId = itemValue.docId; //文件docId    this.fileData.docId ? this.fileData.docId : this.fileData.id
          obj.data.fileType = itemValue.fileData.type; //文件后缀
          obj.data.rfsId = itemValue.rfsId ? itemValue.rfsId : itemValue.fileData.rfsId;
        }
        // 本地上传的处理文件的type类型
        if (itemValue && type === 1) {
          var matches = itemValue.docName.lastIndexOf('.')
          let type = itemValue.docName.substring(matches + 1, itemValue.docName.length)
          obj.data. fileName = itemValue.docName; //文件名字
          obj.data.fileId = itemValue.docId; //文件docId
          obj.data.fileType = type; //文件后缀
          obj.data.rfsId = itemValue.rfsId ? itemValue.rfsId : itemValue.fileData.rfsId;
        }
        if (this.fileData.paperId) {
          obj.data.paperId = this.fileData.paperId
          obj.data.type = '6'
        }
        this.$post("/info/projectChat/addChatMsg",obj).then((res => {
          if(this.requestCode.SUCCESS !== res.code){
            if(this.requestCode.RESULT_EMPTY == res.code) {
              return;
            } else {
              this.$message.error(res.msg);
              return;
            }
          }
          if(itemValue.fileData.type.indexOf('application') != -1) {
            this.$refs.docUploadRef.uploadComplete()
          } else if(itemValue.fileData.type.indexOf('image') != -1) {
            this.$refs.photoUploadRef.uploadComplete()
          } else {
            this.manuscriptUploadCloseFn()
            this.proDocUploadCloseFn()
          }
        })).catch(error => {

        });

      },

      // 图片预览 itemValue接收当前点击文件的数据
      dblclickFn(itemValue) {
        if(itemValue.fileType.indexOf('image') != -1) {
          var matches = itemValue.fileName.lastIndexOf('.')
          itemValue.fileType = itemValue.fileName.substring(matches + 1, itemValue.fileName.length)
        }
        var previewData = {
          projectId: this.projectId,
          rfsId: itemValue.rfsId,
          docId : itemValue.fileId,
          photoType: itemValue.fileType,
          docName: itemValue.fileName,
          sourceName: '项目聊天'
        }
        this.$store.commit('previewAllFn',previewData )
      },

      // 文件预览 itemValue接收当前点击文件的数据
      previewFn(itemValue, num) {
        if (num === 1) {
          let param = {
            docId:itemValue.fileId
          }
          this.$post('/doc/project/docIsExist', {data: param}).then(res=>{
            if(this.requestCode.SUCCESS != res.code){
              this.$message.error(res.msg);
              return;
            }
            if(!res.data) {
              this.$message.error('文件已删除，不能预览');
              return;
            }
            var previewData = {
              projectId: this.projectId,
              rfsId: itemValue.rfsId,
              docId : itemValue.fileId,
              photoType: itemValue.fileType,
              docName: itemValue.fileName
            }
            if (itemValue.type == 6) {
              previewData.sourceType = 'manuscriptmanage'
              previewData.sourceName = '项目聊天'
              previewData.id = itemValue.paperId
            } else if (itemValue.type == 2) {
              previewData.sourceName = '项目聊天'
            } else {
              previewData.sourceName = '项目聊天'
            }
            this.$store.commit('previewAllFn',previewData)
          },err=>{

          })
          return
        } else if (num == 5 || num == 3 || num == 4) {
        // @个人--3   @所有人4---存在@完之后进行本地上传的文件预览判断
          if (num == 3 || num == 4){
            this.queryDoc(itemValue)
            return
          }
          this.previewHandle(itemValue)
          return
        }
        // 打开,2为打开
        this.docLocationFn(itemValue, 2)
      },
      // 本地上传的文件和项目文档底稿上传的文件与---@消息之后的本地上传文件预览的区分
      queryDoc (itemValue){
        this.$post('/doc/project/isChatPreview', {
        data: itemValue.fileId
        }).then(res=>{
          if (res.code !== 0){
            this.$message.error(res.msg)
            return
          }
          this.previewHandle(itemValue)
        })
      },
      // 预览共用方法提取
      previewHandle(itemValue){
        // 本地上传的文件类型的处理-针对旧数据
          var matches = itemValue.fileName.lastIndexOf('.')
          let type = itemValue.fileName.substring(matches + 1, itemValue.fileName.length)
          // 本地上传的文件不走定位
          var previewData = {
            projectId: this.projectId,
            rfsId: itemValue.rfsId,
            docId: itemValue.fileId,
            photoType: type,
            docName: itemValue.fileName,
            sourceName: '项目聊天'
          }
          this.$store.commit('previewAllFn', previewData)
      },
      // 文件讨论文件定位 itemValue接收当前点击文件的数据
      docLocationFn(itemValue, num) {
        let jurisdiction = this.$utils.checkProjectPermission('project_file') //判断是否有项目文档的权限
        let parperJurisdiction = this.$utils.checkSystemPermission('paper_mange') // 判断底稿的权限
        if (!jurisdiction && itemValue.type !== 6) {
          this.$message.error('无对应权限，请联系对应项目组负责人处理')
          return
        }
        if (!parperJurisdiction && itemValue.type == 6) {
          this.$message.error('无对应权限，请联系对应项目组负责人处理')
          return
        }
        // if(jurisdiction) {
          // 项目文档定位数据
        let projectData = {
          token: this.token,
          userId: this.userId,
          data: {
            id: itemValue.fileId ? itemValue.fileId : itemValue.id,
            projectId: itemValue.projectId,
            docType: itemValue.fileType ? 0 : 1,
            chatOrMsg: 1
          }
        }
        // 底稿定位数据
        let paperData = {
          token: this.token,
          userId: this.userId,
          data: {
            projectId: itemValue.projectId,
            id: itemValue.paperId ? itemValue.paperId : itemValue.fileId,
            type: 'paper',
            docType: itemValue.fileType ? 0 : 1
          },
          pageNo: 1,
          pageSize: 100
        }
        let url = (itemValue.type == 6) ?  '/doc/paper/location' : '/doc/project/position'
        let data = itemValue.type == 6 ? paperData : projectData
        this.$post(url, data)
          .then((res) => {
            if(this.requestCode.SUCCESS != res.code){
              this.$message.error(res.msg);
              return;
            }
            let data =  res.data;
            let obj = {
              id: itemValue.fileId,
              docName: itemValue.fileName
            }
            // 打开定位到最后一级拼接路径，定位是定位到位置不拼接
            num == 2 ? data.parent.unshift(obj) : data = res.data
            if (num === 2) {
              res.data.parentId = data.docId
            }
            // 判断是项目文档过来还是底稿的定位
            if (itemValue.type !== 6) {
              this.$router.push({
                path: "/projectDoc",
                query: {
                  docId: data.docId ? data.docId : data.id,
                  projectId: data.projectId,
                  parentId: num ? data.docId : data.parentId,
                  auditProjectId: data.auditProjectId,
                  isPosition: true,
                  data: JSON.stringify(res.data),
                  num: num,
                  isOpen: num === 2
                }
              });

             this.$store.commit("projectId", data.projectId);
              return
            }
            res.data.id = itemValue.paperId
            res.data.isOpen = num === 2 ? true : false
            // 定位到底稿
            this.$router.push({
                path: '/manuscriptmanage',
                query: {
                    locationData: JSON.stringify(res.data)
                }
            })
             this.$store.commit("projectId", data.projectId);

          }).catch(function (error) {});
      },

      // 浏览器的处理
      browserType () {
        var userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
        var isOpera = false;
        if (userAgent.indexOf('Edge') > -1) {
          return "Edge";
        }
        if (userAgent.indexOf('.NET') > -1) {
          return "IE";
        }
        if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
          isOpera = true;
          return "Opera"
        }; //判断是否Opera浏览器
        if (userAgent.indexOf("Firefox") > -1) {
          return "FF";
        } //判断是否Firefox浏览器
        if (userAgent.indexOf("Chrome") > -1) {
          return "Chrome";
        }
        if (userAgent.indexOf("Safari") > -1) {
          return "Safari";
        } //判断是否Safari浏览器
        if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
          return "IE";
        }; //判断是否IE浏览器
      },

      // 换行
      lineFeed(e) {
        var e = e || window.event, ec = e.keyCode || e.which;
        if (e.ctrlKey && 13 == ec) {
          if (this.browserType() == 'IE' || this.browserType() == 'Edge') {
            $("#chatroom_footer_text_textarea").append("<div></div>")
          } else if (this.browserType () == 'FF') {
            $("#chatroom_footer_text_textarea").append("<br/><br/>")
          } else {
            $("#chatroom_footer_text_textarea").append("<br/><br/>")
          }
          if(this.$refs.cTextareaRef.innerHTML == "") {
            this.$refs.cTextareaRef.innerHTML = this.$refs.cTextareaRef.innerHTML + '<br/>'
          }
          document.execCommand('insertHTML', 'false', '<br/>')
        }
      },
      handleFocus(e) { //光标闪烁时 用于处理手输入的问题
      },

       //mac 是command + v
      macHandleKeyup(e) {
        this.content = this.$refs.cTextareaRef.innerText
        return
        if(this.$refs.cTextareaRef.innerHTML.length >= this.contentMaxLength) {
          this.$refs.cTextareaRef.innerHTML = this.$refs.cTextareaRef.innerHTML.substr(0, this.contentMaxLength);
          this.sel.selectAllChildren(this.$refs.cTextareaRef); //取消之前的文本区域 设置新的区域
          this.sel.collapseToEnd() //把光标定位到文本最后
          this.wordsFlag = true;
        } else {
          this.wordsFlag = false;
        }
        return
        if(e.keyCode !== 91 && e.keyCode !== 86) {
          return
        }
        this.$refs.cTextareaRef.innerHTML = this.$refs.cTextareaRef.innerText.substr(0, this.contentMaxLength);
        this.sel.selectAllChildren(this.$refs.cTextareaRef); //取消之前的文本区域 设置新的区域
        this.sel.collapseToEnd() //把光标定位到文本最后
        this.wordsFlag = this.$refs.cTextareaRef.innerHTML.length >= this.contentMaxLength
      },

      // 输入的长度大于最大长度时的处理
      handleKeypress(e) {
        if(e.target.innerHTML.length == this.contentMaxLength) {
          e.preventDefault();
        }
      },

      // 键盘按下的函数
      handleKeydown(e) {
        let keyCode = e.keyCode;
        let content = this.$refs.cTextareaRef.innerHTML
        let nameA = content.indexOf("@")
        let numPad = content.indexOf("Numpad")
        let numDigit = content.indexOf('Digit')
        // shift+@时
        if((keyCode == 50 && e.key == '@') || (keyCode == 229 && e.key == 'Process' && e.code == "Digit2" && nameA > -1) || (keyCode == 229 && e.key == '@')) { //@的键值让其显示
          this.getAllAitPeopleFn()
          this.aitShow = true;
        }else if ((keyCode == 8 && e.key == 'Backspace') || (e.keyCode == 32 && e.key == " ") || (e.keyCode === 229 && e.key === "Process") || nameA > -1 || numPad > -1 || numDigit > -1) {
          this.handleVal(e, $("#chatroom_footer_text_textarea").text())
        } else {
          this.aitShow = false;
        }
        if(keyCode == 13) {
          e.preventDefault();
        }
      },

      // 当输入完成时
      handleEnd(e) {
        let html = e.target.innerHTML;
        let content = $("#chatroom_footer_text_textarea").text()
        this.valueHandle(e, content)
      },

      // 文本超出最大限制时 需要提示语的处理
      valueHandle (e, h) {
        let html = this.$refs.cTextareaRef.innerHTML
        this.wordsFlag = html.length >= this.contentMaxLength
        if(!html) return
        if(this.wordsFlag) {
          this.tips = '超出输入限制！'
          this.$refs.cTextareaRef.innerHTML = html.substr(0, this.contentMaxLength);
          this.sel.selectAllChildren(this.$refs.cTextareaRef); //取消之前的文本区域 设置新的区域
          this.sel.collapseToEnd() //把光标定位到文本最后
          setTimeout(() => {
            this.wordsFlag = false;
          }, 1000)
        }
        this.handleVal(e, h)
      },
      // 处理输入最后一个值前为@的情况，针对@列表检索的处理
      handleVal(e, h){
        let testx = h.substring(h.lastIndexOf("@"))
        // 没值时
        if (!h) {
          this.aitShow = false
          return
        }
        // 检测是否有@
        let nameA = testx.indexOf("@")
        if (nameA === -1) {
          this.aitShow = false
          return
        }
        // 完全等于@时
        if (testx === "@") {
          this.aitShow = false
          return
        }
        // 如果包含上方键盘和右边数字键盘
        if (testx.length === 2 && e.key == 'Backspace') {
          this.aitShow = true
          this.getAllAitPeopleFn()
          this.aitStyle(this.aitPeopleList)
          return
        }
        this.valueFilter(testx)
      },

      // @列表的样式处理函数
      aitStyle(val) {
        if (val) {
          if (val.length > 6) {
            this.$nextTick(() => {
              var aitListHeight = document.getElementById('chatroom_footer_opera_ait_list')
              aitListHeight.style.top = '-' + 260 + 'px'
            })
            return
          }
          this.$nextTick(() => {
            var aitListHeight = document.getElementById('chatroom_footer_opera_ait_list')
            aitListHeight.style.top = '-' + (val.length * 40 + 60) + 'px'
          })
        }
      },
      // @列表值过滤的情况
      valueFilter (html) {
        if (!html) {
          this.aitShow = false
          return
        }
        if ($("#chatroom_footer_text_textarea").text() == '@') {
          this.aitShow = true
          this.getAllAitPeopleFn()
          return
        }
        let context = $("#chatroom_footer_text_textarea").text()
        this.content = context
        let testx = context.substring(context.lastIndexOf("@"))
        let textA = testx.replace("@","")
        let result = []
        this.aitPeopleListCopy.map(item => {
          if (item.usName.search(textA) !== -1) {
            result.push(item)
          }
        })
        if (!result.length) {
          this.aitShow = false
          return
        }
        this.aitShow = true
        this.aitPeopleList = result
        this.aitStyle(this.aitPeopleList)
      },

      // 监听选定文本的变动
      selectHandler() {
        if(window.getSelection) {
          this.sel = window.getSelection();
        } else if (window.document.getSelection) {
          this.sel = window.document.getSelection();
        } else if (window.document.selection) {
          this.sel = window.document.selection.createRange().text;
        }
        let rang = this.sel.rangeCount > 0 ? this.sel.getRangeAt(0) : null; //节点和文本节点的部分的文档的片段。
        this.savedRange = rang;
      },

       // 向下滚动
      loadBottonMore () {
        this.busy = false;
        this.listPageNo = this.lastPageNo -1
        if(this.listPageNo < 1) {
          this.isLoadingMore = false
          return
        }
        setTimeout(() => {
          this.scrollGetAllChatMessageFn(this.listPageNo)
        }, 100)

        if(this.busy) {
          this.busy = false;
          if(this.listPageNo == this.lastPageNo -1) return;
          this.listPageNo = this.lastPageNo -1
          if(this.listPageNo < 1 ) return;
          setTimeout(() => {
            this.scrollGetAllChatMessageFn(this.listPageNo)
          }, 100)
        }
      },

      // 聊天记录定位数据的函数
      loadMore(val) {
        // 找到数据
          if (val) { // 定位数据
            this.frontPageNo = val.pageNo
            this.lastPageNo = val.pageNo
            this.listPageNo = val.pageNo
            this.getAllChatMessageFn()
            return
          }
          this.busy = false;
          this.listPageNo = this.frontPageNo +1
          if(this.listPageNo > this.pages ) {
            this.isLoadingMore = false
            return
          }
          setTimeout(() => {
            this.scrollGetAllChatMessageFn()
          }, 100)
      },

      // 过滤重命名的icon
      iconFilter(itemValue) {
        if (itemValue.docType == 1) {
          itemValue.fileIcon = require("../../../common/fileIcon/FolderType1.png");
        } else {
          itemValue.type  = itemValue.type ? itemValue.type : itemValue.fileType
          let fileName = 'a.'+ itemValue.type // 模拟文件名，保证数据格式一致性
          itemValue.fileIcon = this.$utils.iconFilter(fileName)
        }
      },

      // 聊天记录中（今天，昨天）时间的处理
      getDayName(d){
        var td=new Date();
        td=new Date(td.getFullYear(),td.getMonth(),td.getDate());
        var od=new Date(d);
        od=new Date(od.getFullYear(),od.getMonth(),od.getDate());
        var xc=(od-td)/1000/60/60/24;
        if(-1 <= xc && xc < 0){
          return "昨天";
        }else if(xc==0){
          return "今天";
        }
      },

      // 设置将滚动条置到底部, 获取最后一个元素值有则置低，无则赋0
      scrollToBottom() {
        this.$nextTick(() => {
          let isHaveContent = document.querySelector("#chatroom_section_chartList").lastElementChild
          document.querySelector("#chatroom_section").scrollTop = isHaveContent ? isHaveContent.offsetTop : 0
        })
      },

      // 图片上传
      photoFn() { //图片窗口开启
        this.photoUploadParamData = {
          docSource: 4,
          projId: this.projectId,
          parentId: 0,
          auditProjectId: ''
        }
        this.$refs['attachment'].uploadPic(this.photoUploadParamData)
      },

      // 图片上传窗口关闭
      photoUploadAddDocCloseFn() {
        this.photoUploadFlag = false;
        this.phototUploadAddIsShow = false;
      },

      // 图片上传成功的回调
      photoUploadFn(uploadData) {
        this.filterReqDataFn(uploadData, 1)
      },

      // 图片上传成功的回调
      photoUploadAllsucess() {
        this.photoUploadAddDocCloseFn()
      },

      //本地文件上传
      docFn() {
        this.docShow = !this.docShow;
        this.docUploadParamData = {
          docSource: 2,
          projId: this.projectId,
          parentId: 0,
          auditProjectId: ''
        }
        this.docUploadFlag = true;
        this.docUploadAddIsShow = true;
      },
      //本地文件上传
      docUploadAddDocCloseFn() {
        this.docUploadFlag = false;
        this.docUploadAddIsShow = false;
      },

      docUploadFn(uploadData) {
        uploadData.map((item, idx) => {
          let atterData = {}
          var suffixIdx = item.docName.lastIndexOf('.');
          item.type = item.docName.substring(suffixIdx + 1, item.docName.length)
          atterData = {
            addSource: 1,
            docId: item.docId,
            docName: item.docName,
            rfsId: item.rfsId,
            fileData: {
              type: item.type
            }
          }
          // 针对文件的处理
          this.filterReqDataFn(atterData, 1)
        })

      },

      // 上传成功之后的回调
      docUploadAllsucess() {
        this.docUploadAddDocCloseFn()
      },

      //从底稿选择文件
      manuscriptFn() {
        let jurisdiction = this.$utils.checkProjectPermission('project_file') //判断是否有项目文档的权限
        if(jurisdiction) {
          this.docShow = !this.docShow;
          this.manuscriptUploadFlag = true;
          this.manuscProjectId = this.projectId
        } else {
          this.$message.error('无查看项目文档的权限')
        }
      },
      manuscriptUploadCloseFn() {
        this.manuscriptUploadFlag = false;
      },
      manuscriptUploadFn(uploadData) {
        let atterData = {}
        uploadData.map((item, idx) => {
          if(item.type) {
            atterData = {
              docId: item.docId,
              docName: item.docName,
              rfsId: item.rfsId,
              fileData: {
                type: item.type
              }
            }
          } else {
            var suffixIdx = item.docName.lastIndexOf('.');
            item.type = item.docName.substring(suffixIdx + 1, item.docName.length)
            atterData = {
              docId: item.docId,
              docName: item.docName,
              rfsId: item.rfsId,
              fileData: {
                type: item.type
              }
            }
          }
          this.filterReqDataFn(atterData, 1)
        })
      },
      //从项目文档选择文件
      proDocFn() {
        let jurisdiction = this.$utils.checkProjectPermission('project_file') //判断是否有项目文档的权限
        if(jurisdiction) {
          this.docShow = !this.docShow;
          this.proDocUploadFlag = true;
          this.proDocUploadProjectId = this.projectId
        } else {
          this.$message.error('无查看项目文档的权限')
        }
      },
      proDocUploadCloseFn() {
        this.proDocUploadFlag = false;
      },
      proDocUploadFn(uploadData) {
        uploadData.map((item, idx) => {
          let atterData = {
            docId: item.docId,
            docName: item.docName,
            rfsId: item.rfsId,
            fileData: {
              type: item.type
            }
          }
          this.filterReqDataFn(atterData, 1)
        })
      },
    },
    computed:{
      chatMessageObj(){
        return this.$store.state.chatMessageObj
      },
      chatBoxHeight() {
        let pageHeight =
            document.documentElement.clientHeight || document.body.clientHeight
        return `${pageHeight - 70}px`
      }
    },
    destroyed(){
      window.removeEventListener('wheel',this.functionScroll)
    },
    watch: {
      chatMessageObj: {
        handler(newVal,oldVal){
          if(newVal.projectId == this.projectId) {
            if(newVal.type == '2' || newVal.type == '6') { //文件讨论的信息
              newVal.fileData = {};
              newVal.fileData.type = newVal.fileType;
              newVal.fileData.docType = newVal.fileType ? newVal.fileType : 1;
              newVal.fileData.docName = newVal.fileName;
              this.iconFilter(newVal.fileData);
            } else { //正常聊天信息
              if(newVal.fileType) {
                if(newVal.fileType.indexOf('application') != -1) { //fileType字段里application/后缀拼起来的 文件的类型
                  var matches = newVal.fileName.lastIndexOf('.')
                  var suffix = newVal.fileName.substring(matches + 1, newVal.fileName.length)
                  newVal.fileData = {};
                  newVal.fileData.type = suffix;
                  newVal.fileData.docName = newVal.fileName;
                  this.iconFilter(newVal.fileData)
                } else if(newVal.fileType.indexOf('image') != -1) { //fileType字段里image/后缀拼起来的 图片的类型
                  newVal.imageUrl = this.$utils.getDownloadUrl(newVal.fileId);
                } else if(newVal.fileType == 'jpg' ||
                  newVal.fileType == 'jpeg'||
                  newVal.fileType == 'gif' ||
                  newVal.fileType == 'bmp' ||
                  newVal.fileType == 'png' ||
                  newVal.fileType == 'psd'){ //fileType字段里只用后缀的 图片的类型
                  newVal.imageUrl = this.$utils.getDownloadUrl(newVal.fileId);
                } else { //fileType字段里只用后缀的 文件的类型
                  newVal.fileData = {};
                  newVal.fileData.type = newVal.fileType;
                  newVal.fileData.docName = newVal.fileName;
                  this.iconFilter(newVal.fileData)
                }
              }
            }
            if(newVal.userImg) {
              newVal.userImgUrl = this.$utils.getDownloadUrl(newVal.userImg)
            }
            if(newVal.projectId == oldVal.projectId) {
              if(newVal.untime - oldVal.untime > 60000) {
                var start = newVal.sendTime.indexOf(' ');
                var dateString = newVal.sendTime.substr(0, start + 1)
                newVal.sendTime = newVal.sendTime.replace(dateString, '')
                this.$set(newVal, 'sendTime' , newVal.sendTime.replace(dateString, ''))
                newVal.flag = true;
              }
            } else {
              var start = newVal.sendTime.indexOf(' ');
              var dateString = newVal.sendTime.substr(0, start + 1)
              newVal.sendTime = newVal.sendTime.replace(dateString, '')
              this.$set(newVal, 'sendTime' , newVal.sendTime.replace(dateString, ''))
              newVal.flag = true;
            }
            if (oldVal.id === newVal.id) {
              return
            }
            this.meSpeakArr.push(newVal)
            this.scrollToBottom()
          } else {
            this.elseProMessageShow = true;
          }
        }
      },
      content (val) {
        if (val) {
          // 检测是否有@
          let nameA = val.indexOf("@")
          if (nameA === -1) {
            this.aitShow = false
            return
          }
          // 完全等于@时
          if (val === "@") {
            this.aitShow = true
            return
          }
          // 截取最后一位
          let valLast = val.substring(val.lastIndexOf("@"))
          this.valueFilter(valLast)
        }
      }
    },
    components: {
      vueEmoji,
      uploadDocAdd,
      manuscriptAddDoc,
      relationAddDoc,
      projectChatRecord
    },
    directives: { //自定义指令
      loadmore: {
        bind(el, binding) {
          el.addEventListener('scroll', function() {
            let sign = 30;
            const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight;
            if( this.scrollHeight == this.clientHeight ) return //没有滚动条
            // 滚动到顶部
            if ( this.scrollTop <= sign) {
              binding.value()
            }

          })
        }
      },
    }
  }

</script>
<style lang="scss" scoped>
.icon-task-btn {
  margin-right: 6px;
}
.messagePlace{
  color: #bbb;
  position: absolute;
  top: 30px;
  left: 10px;
}
  .chatroom{
    width: 100%;
    height: 100%;
    overflow:hidden;
    span{
      display: inline-block;
    }
    .chatroom_header{
      width: 100%;
      height:115px;
      background: #fff;
      .chatroom_header_title{
        width: 100%;
        height: 45px;
        display: flex;
        align-items: center;
        margin-left: 14px;
      }
      .chatroom_header_proSelect{
        width: 100%;
        margin:12px 0 18px 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .chatroom_header_proSelect_left{
          display: flex;
          align-items: center;
          .chatroom_header_proSelect_icon{
            width: 23px;
            height: 23px;
            display: inline-block;
            background: url('../../../../assets/common_icon/company_icon.png') no-repeat;
            background-size: 23px 23px;
          }
          .chatroom_header_proSelect_select{
            margin-left: 5px;
            position: relative;
            .chatroom_header_proSelect_select_redGlobule{
              display: inline-block;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: red;
              position: absolute;
              right: -2px;
              top: -2px;
              z-index: 100;
            }
            .el-select{
              width: 100%;
            }
          }
        }
        .chatroom_header_proSelect_setFloating{
          margin-right: 35px;
        }
      }
    }
    .chatroom_section{
      width: calc(100% - 10px);
      height:calc(100% - 285px);
      overflow-y:auto;
      .chatroom_section_chartList{
        display: flex;
        flex-direction: column;
        .chatroom_section_chartList_chunk{
          display: flex;
          flex-direction: column;
          .cl_title{
            display: flex;
            align-items: center;
            justify-content: center;
            color: #909399;
          }
          .cl_left{
            width: 100%;
            margin-bottom: 15px;
            display: flex;
            justify-content: flex-start;
            margin-top: 5px;
            .cl_left_chunk{
              width: 50%;
              display: flex;
              .cl_left_chunk_userImg{
                width: 36px;
                height: 36px;
                border-radius: 50%;
                margin-right: 18px;
                img{
                  width: 36px;
                  height: 36px;
                  max-width: 36px;
                  max-height: 36px;
                  border-radius: 50%;
                }
              }
              .cl_left_chunk_right{
                max-width: 90%;/*写给不支持calc()的浏览器*/
                max-width:-moz-calc(90% - 10px - 36px - 18px);
                max-width:-webkit-calc(90% - 10px - 36px - 18px);
                // max-width: calc(90% - 10px - 36px - 18px);
                text-align: left;
                display: flex;
                flex-direction: column;
                .cl_left_chunk_right_userName{
                  font-size: 12px;
                  color: #666666;
                  margin-bottom: 5px;
                  .cl_left_chunk_right_userName_ait{
                    margin-left: 3px;
                  }
                }
                .cl_left_chunk_right_userName_hover{
                  font-size: 12px;
                  color: #275AA6;
                  margin-bottom: 5px;
                }
                .cl_left_chunk_right_content{
                  padding: 10px;
                  text-align: left;
                  background: #ffffff;
                  border-radius: 5px;
                  .cl_left_chunk_right_content_character{
                    word-wrap:break-word;
                    overflow:hidden;
                    padding: 8px 0 0 8px;
                    /*display: flex;*/
                    /*align-items: center;*/
                  }
                  .cl_left_chunk_right_content_file{
                    width: 308px;
                    height: 107px;
                    display: flex;
                    flex-direction: column;
                    margin-top: 6px;
                    background: #fff;
                    border-radius: 5px;
                    .cl_left_chunk_right_content_file_top{
                      height: 66px;
                      display: flex;
                      align-items: center;
                      padding: 5px;
                      img {
                        padding: 0 17px;
                        width: 36px;
                        height: 28px;
                      }
                      .cl_left_chunk_right_content_file_top_title{
                        font-size: 16px;
                        color: #000;
                        width: 100%;
                        overflow:hidden;
                        text-overflow:ellipsis;
                        white-space:nowrap;
                      }
                    }
                    .cl_left_chunk_right_content_file_bottom{
                      display: flex;
                      justify-content: space-between;
                      padding: 5px 0 5px 5px;
                      border-top: 1px solid #EDEDEE;
                      height: 40px;
                      line-height: 35px;
                      span{
                        padding: 0 10px 0 10px;
                        cursor: pointer;
                        width: 46%;
                        text-align: center;
                      }
                      span:nth-child(1){
                        border-right: 1px solid #EDEDEE;
                      }
                    }
                  }
                  .cl_left_chunk_right_content_image{
                    height: 120px;
                    max-height: 120px;
                    img{
                      max-width: 100%;
                      max-height: 120px;
                    }
                  }
                }

              }
            }
          }
          .cl_right{
            width: 100%;
            margin-bottom: 15px;
            display: flex;
            justify-content: flex-end;
            margin-top: 5px;
            .cl_right_chunk{
              width: 50%;
              display: flex;
              flex-direction: row-reverse;
              .cl_right_chunk_userImg{
                width: 36px;
                height: 36px;
                border-radius: 50%;
                margin-right: 18px;
                img{
                  width: 36px;
                  height: 36px;
                  max-width: 36px;
                  max-height: 36px;
                  border-radius: 50%;
                }
              }
              .cl_right_chunk_content{
                max-width: 90%;/*写给不支持calc()的浏览器*/
                max-width:-moz-calc(90% - 10px - 36px - 18px);
                max-width:-webkit-calc(90% - 10px - 36px - 18px);
                // max-width: calc(90% - 10px - 36px - 18px);
                margin-right: 10px;
                padding: 10px;
                text-align: left;
                background: #CEE1FE;
                border-radius: 5px;
                .cl_right_chunk_content_character{
                  word-wrap:break-word;
                  overflow:hidden;
                  /*display: flex;*/
                  /*align-items: center;*/
                  .cl_right_chunk_content_character>>> .aitNameActive{
                    cursor: default;
                  }

                }
                .cl_right_chunk_content_character_file{
                  width: 308px;
                  height: 107px;
                  display: flex;
                  flex-direction: column;
                  margin-top: 12px;
                  background: #fff;
                  border-radius: 5px;
                  .cl_right_chunk_content_character_file_top{
                    height: 66px;
                    display: flex;
                    align-items: center;
                    padding: 5px;
                    font-size: 16px;
                    color: #000;
                    img{
                      padding: 0 17px;
                      width: 36px;
                      height: 28px;
                    }
                    .cl_right_chunk_content_character_file_top_title{
                      // margin-left: 12px;
                      width: 100%;
                      overflow:hidden;
                      text-overflow:ellipsis;
                      white-space:nowrap;
                    }
                  }
                  .cl_right_chunk_content_character_file_bottom{
                    padding: 5px 0 5px 5px;
                    border-top: 1px solid #EDEDEE;
                    display: flex;
                    justify-content: space-between;
                    height: 40px;
                    line-height: 35px;
                    span{
                      color: #275AA6;
                      padding: 0 10px 0 10px;
                      cursor: pointer;
                      width: 46%;
                      text-align: center
                    }
                    span:nth-child(1){
                      border-right: 1px solid #EDEDEE;
                    }
                  }
                }
                .cl_right_chunk_content_character_image{
                  max-height: 120px;
                  img{
                    max-width: 100%;
                    max-height: 120px;
                  }
                }
              }
            }
          }
        }
      }
      .chatroom_section_chartList_noMessage{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .chatroom_section_chartList_noMessage_img{
          display: inline-block;
          width: 240px;
          height: 200px;
          background: url('../../../../assets/common_icon/noMessage_icon.png') no-repeat;
          background-size: 240px 200px;
        }
        .chatroom_section_chartList_noMessage_bottom{
          width: 240px;
          height: 20px;
          border-radius: 50%;;
          background: #e8ebf1;
        }
      }
    }
    .chatroom_footer{
      width: 100%;
      height: 170px;
      display: flex;
      flex-direction: column;
      border-top:1px solid #DDDDDD;
      position: relative;
      .chatroom_footer_fileTitle{
        width: 100%;
        height: 48px;
        background: #DFE5EF;
        position: absolute;
        left: 0;
        top: -48px;
        // z-index: -1;
        opacity: 0.3;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .chatroom_footer_fileTitle_left{
          display: flex;
          align-items: center;
          margin-left: 20px;
          .chatroom_footer_fileTitle_left_title{
            max-width: 500px;
            margin-left: 8px;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            color: #333333;
            font-weight:bold;
          }
        }
        .chatroom_footer_fileTitle_right{
          width: 25px;
          height: 25px;
          color: #666666;
          margin-right: 21px;
          font-weight: bold;
          font-size: 18px;
          cursor: pointer;
        }
      }
      .chatroom_footer_opera{
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        padding-left: 10px;
        span{
          width: 16px;
          height: 16px;
          display: inline-block;
          margin-left: 15px;
          margin-right: 15px;
        }
        span:nth-child(1) {
          margin-left: 10px;
        }
        .chatroom_footer_opera_photo{
          width: 16px;
          height: 12px;
          background: url('../../../../assets/common_icon/tupian_icon.png') no-repeat;
          background-size: 16px 12px;
        }
        .chatroom_footer_opera_photo:hover{
          width: 16px;
          height: 12px;
          background: url('../../../../assets/common_icon/tupian_hover_icon.png') no-repeat;
          background-size: 16px 12px;
        }
        .chatroom_footer_opera_face{
          width: 16px;
          height: 16px;
          background: url('../../../../assets/common_icon/biaoqing_icon.png') no-repeat;
          background-size: 16px 16px;
          position: relative;
          margin-left: 30px;

        }
        .chatroom_footer_opera_face:hover{
          width: 16px;
          height: 16px;
          background: url('../../../../assets/common_icon/biaoqing_hover_icon.png') no-repeat;
          background-size: 16px 16px;
          position: relative;
          margin-left: 30px;
        }

        .chatroom_footer_opera_face_box{
            position: absolute;
            left: 0;
            top: -225px;
            border-radius: 5px;
            box-shadow: 5px 5px 5px #cccccc;
          }
        .chatroom_footer_opera_ait{
          position: relative;
          background: url('../../../../assets/common_icon/aite_icon.png') no-repeat;
          background-size: 16px 16px;

          }
        .chatroom_footer_opera_ait:hover{
          position: relative;
          background: url('../../../../assets/common_icon/aite_hover_icon.png') no-repeat;
          background-size: 16px 16px;
        }
                .chatroom_footer_opera_ait_list{
            background: #fff;
            width: 129px;
            position: absolute;
            left: 0px;
            max-height: 240px;
            overflow-y: auto;
            border-radius: 6px;
            color: rgba(51,51,51,1);
            box-shadow:0px 5px 10px 0px rgba(192, 216, 199, 0.35);

        }
              .chatroom_footer_opera_ait_list_item{
                font-size: 14px;
              width: 100%;
              height: 40px;
              text-align: center;
              display: inline-block;
              line-height: 40px;
              // border-bottom: 1px solid #E7E7E7;
              overflow:hidden;
              text-overflow:ellipsis;
              white-space:nowrap;
              text-align: left;
              text-indent: 20px;
              background: rgba(255,255,255,1);
              border-radius: 0px 6px 6px 6px;
              cursor: pointer;
            }
            .chatroom_footer_opera_ait_list_item:nth-child(1){
              background: rgba(238,245,254,1);
            }
        .chatroom_footer_opera_doc{
          width: 13px;
          height: 16px;
          position: relative;
          background: url('../../../../assets/common_icon/wenjian_icon.png') no-repeat;
          background-size: 13px 16px;
          .chatroom_footer_opera_doc_list{
            display: flex;
            flex-direction: column;
            background: #fff;
            width: 159px;
            height: 122px;
            position: absolute;
            left: 0;
            top: -140px;
            border-radius: 5px;
            box-shadow: 5px 5px 5px #cccccc;
            p{
              width: 100%;
              height: 40px;
              text-align: left;
              text-indent: 20px;
              line-height: 40px;
              cursor: pointer;
            }
          }
        }
        .chatroom_footer_opera_doc:hover{
          width: 13px;
          height: 16px;
          position: relative;
          background: url('../../../../assets/common_icon/wenjian_hover_icon.png') no-repeat;
          background-size: 13px 16px;
        }
      }
      .chatroom_footer_text{
        width: 100%;
        height:100px;
        box-sizing: border-box;
        &_textarea{
          width: 100%;
          height: 100px;
          overflow-y: auto;
          text-align: left;
          padding-left:10px;
          padding-right: 10px;
          word-wrap:break-word;
          font-family: MicrosoftYaHei;
          font-size: 14px;
          /*overflow:hidden;*/
          // 允许编辑，禁止富文本
          // user-modify: read-write-plaintext-only !important;
          // -webkit-user-modify: read-write-plaintext-only !important;
          // -moz-user-modify: read-write-plaintext-only;
          box-sizing: border-box;

        }
        &_textarea:empty:before {
          content: attr(placeholder);
          color: #bbb;
        }
      }
      .c_footer_enter{
        width: 100%;
        height: 20px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .c_f_enter_remind{
          margin-right: 10px;
          color: rgba(192,193,196,1);
          font-size: 12px;
          margin-top: 20px;
        }
        .c_f_enter_send{
          width: 88px;
          height: 22px;
          margin-right: 20px;
          display: flex;
          position: relative;
          .c_f_enter_title{
            // margin: 100px;;
            width:170px;
            height:60px;
            line-height: 60px;
            background:rgba(255,255,255,1);
            border:1px solid rgba(220,223,230,1);
            border-radius:4px;
            left: -85px;
            top: -74px;
            position: absolute;
          }
          .c_f_enter_title:after, .c_f_enter_title:before{
            border: solid transparent;
            content: ' ';
            width: 0;
            height: 0;
            top: 100%;    //根据三角形的位置，可以随意更改。
            position: absolute;
          }
          .c_f_enter_title:after {
            border-width: 10px;
            border-top-color: #fff;
            left: 120px;//根据三角的位置改变
          }//此处是一个白色的三角
          .c_f_enter_title:before {
            border-width: 12px;
            left: 98px;
          }
          .send_btn{
            width:90px;
            height:40px;
            background:rgba(255,255,255,1);
            border:1px solid rgba(220,223,230,1);
            border-radius:4px;
          }
        }
      }
    }
    .all_text {
      margin: 0 auto;
      border: none !important;
    }
  }
</style>
<style lang="scss">
  .select_redGlobule{
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: red;
  }
  .select_title{
    width: 290px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    margin-left: 10px;
  }
  .emojiActive{
    width: 16px;
    height: 16px;
    cursor: default;
  }
  .aitNameActive{
    cursor: default;
    -webkit-user-modify: read-only !important;
    font-family: MicrosoftYaHei;
    font-size: 14px;
  }
  .aitNameActiveAll{
    cursor: default;
    -webkit-user-modify: read-only !important;
  }
  .fade-enter-active, .fade-leave-active { transition: opacity .5s; }
  .fade-enter, .fade-leave-active { opacity: 0; }
  .fade-move { transition: transform .4s; }
  .chatroom{
    /*谷歌、safari、qq浏览器、360浏览器滚动条样式*/
    /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
    ::-webkit-scrollbar
    {
      width: 5px;
      height: 5px;
      background-color: #F5F5F5;
    }
    /*定义滚动条轨道 内阴影+圆角*/
    ::-webkit-scrollbar-track
    {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      border-radius: 10px;
      background-color: #F5F5F5;
    }
    /*定义滑块 内阴影+圆角*/
    ::-webkit-scrollbar-thumb
    {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: #bdbdbd;
    }
    /*滑块效果*/
    ::-webkit-scrollbar-thumb:hover
    {
      border-radius: 5px;
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      background: rgba(0,0,0,0.4);
    }
    /*IE滚动条颜色*/
    html {
      scrollbar-face-color:#bfbfbf;/*滚动条颜色*/
      scrollbar-highlight-color:#000;
      scrollbar-3dlight-color:#000;
      scrollbar-darkshadow-color:#000;
      scrollbar-Shadow-color:#adadad;/*滑块边色*/
      scrollbar-arrow-color:rgba(0,0,0,0.4);/*箭头颜色*/
      scrollbar-track-color:#eeeeee;/*背景颜色*/
    }
  }
  //.el-icon-warning{
  //  color: rgba(250,205,137,1);
  //}
</style>
