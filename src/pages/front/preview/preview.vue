<template>
  <div class="preview-box">
    <el-dialog
        fullscreen
        custom-class="previewDialog"
        :visible="getpreview"
        :close-on-click-modal="false"
        :before-close="handleClosePreview">
        <div slot="title" class="dialog-footer">
          <!-- <div class="preview-title" :title="headTitle">{{headTitle}}</div> -->
        </div>

        <div class="preview-container">
          <iframe :src="pIframeSrc" id="frameId" scrolling="no" width="100%" height="100%" class="iframe-style"></iframe>
        </div>
        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="handleClosePreview">关 闭</el-button>
        </span> -->
      </el-dialog>
  </div>
</template>

<script>
  const previewBaseUrl = '../../../../static/preview/preview.html?rfsId='

  export default{
    computed: {
      getpreview() {
        return this.$store.state.showPreview
      }
    },

    watch: {
      "$store.state.previewData.headTitle": function(){
        this.headTitle = this.$store.state.previewData.headTitle;
      }
    },
    data () {
      return {
        token:'',
        userId:'',
        pIframeSrc: '',
        positionX: 0,
        positionY: 0,
        headTitle: '预览',
        projectName: '',//项目名称
        rdSys: window.rdSys || 'touhang'
      }
    },
    created(){
      this.token = this.$store.state.loginObject.userToken;
      this.userId = this.$store.state.loginObject.userId;
      this.headTitle = this.$store.state.previewData.headTitle;
      //document.title = this.$route.query.title
      document.title = this.$store.state.previewData.docName;
      this.projectName = this.$store.state.projectMsg.projectMsg.name;
      this.init()
    },
    methods:{
      init(){
        let p = this.$store.state.previewData // 预览的数据
        let u = this.$store.state.loginObject // 登录信息
        if(this.$store.state.previewData.sourceType === 'helpfile'){ // helpfile类型 为使用帮助进入此页面
          // pc 和 web 显示不同的的手册
          if(this.rdSys==='touhang'){ // 投行系统
            this.pIframeSrc =  this.$store.state.isPC ? '../../../../static/helpManual/userManualPC.pdf' : '../../../../static/helpManual/userManualWeb.pdf'
          } else { // 底稿系统
            this.pIframeSrc =  '../../../../static/helpManual/userManualDigao.pdf'
          }
        } else {
          this.pIframeSrc = previewBaseUrl + p.rfsId + '&docId=' + p.docId + '&token=' + u.userToken + '&userId=' + u.userId;
        }
        sessionStorage.sourceType = this.$store.state.previewData.sourceType || ''
        // this.savePreviewHistory()
      },
      handleClosePreview () {
        this.$store.commit('closePreview')
      },
      // 保存预览记录
      savePreviewHistory() {
        console.log('123999',this.$store.state.previewData)
        let sourceName = this.$store.state.previewData.sourceName
        if(this.$store.state.previewData.sourceType == 'manuscriptmanage'){//底稿需要传文件id
          var data = {
            token: this.$store.state.loginObject.userToken,
            userId: this.$store.state.loginObject.userId,
            sourceName: sourceName,//页面位置，记录日志用
            projectName: this.projectName,//项目名称，记录日志用
            paperFlag: true,
            data: {
              docId: this.$store.state.previewData.docId,
              id: this.$store.state.previewData.id
            }
          }
        } else {
          var data = {
            token: this.$store.state.loginObject.userToken,
            userId: this.$store.state.loginObject.userId,
            sourceName: sourceName,//页面位置，记录日志用
            projectName: this.projectName,//项目名称，记录日志用
            data: {
              docId: this.$store.state.previewData.docId
            }
          }
        }
        this.$post('/doc/paper/previewDocLogRecord',data)
          .then((res) => {

          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }

</script>

<style lang="scss" scoped>
body{
    height: 100%;
}
  .previewDialog .preview-title{
      width: calc(100% - 50px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .previewDialog .el-dialog__body{
      height: calc(100% - 170px);
    }
     .preview-container {
      height: 100%;
    }
    .preview{
        width: 100%;
        height: 100%;
        .preview_header{
            width: 100%;
            height: 50px;
            margin-bottom: 10px;
            display: flex;
            justify-items: center;
            align-items: center;
        }
        .preview_content{
            width: 100%;
             height: 999px;
        }
        #frameId{
            width: 100%;
            height: 100%;

        }
        .back{
            margin-top: 20px;
        }
    }
</style>
<style lang="scss">
.preview-box .el-dialog__header {
  display: none;
    padding: 0
}
.previewDialog .el-dialog__body{
    padding: 0
}
.preview-box .previewDialog .el-dialog__body{
    height: calc(100% - 4px)
    // height: 100%;
}
.preview-box{
    .el-dialog__headerbtn{
        font-size: 0;
    }
    .Detail .Detail_main{
        margin-top: 0;
    }
    .iframe-style{
        border: none;
    }
}
</style>
