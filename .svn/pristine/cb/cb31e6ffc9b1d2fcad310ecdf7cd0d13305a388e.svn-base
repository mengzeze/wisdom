<template>
  <div class="preview-box-img">
    <el-dialog
        fullscreen
        custom-class="previewDialog2"
        :close-on-click-modal="false"
        :visible="true">
        <div id="preview-img-box">
          <div class="preview-img-cover-box">
            <img :src="imgSrc" style="background-size: auto; display: block; max-width: 100%; max-height: 100%;">
          </div>
        </div>
      </el-dialog>
  </div>
</template>
<script>
  export default{
    computed: {
      
    },

    watch: {
      
    },
    data () {
      return {
        token:'',
        userId:'',
        imgSrc: ''
      }
    },
    created(){
      let previewData = this.$store.state.previewData
      this.token = this.$store.state.loginObject.userToken;
      this.userId = this.$store.state.loginObject.userId;
      //document.title = this.$route.query.title || '投行'
      document.title = previewData.docName;
      if ('staticSrc' in previewData) {
        this.imgSrc = previewData.staticSrc
      } else {
        this.imgSrc = this.$utils.getDownloadUrl(previewData.docId)
      }
    },
    mounted(){
     
    },
    methods:{

    }
  }

</script>
<style scoped>
  #preview-img-box{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    background: rgba(0, 0, 0, 0.8);
    z-index: 9999;
    display: flex;
    flex-direction: column;
  }
  .preview-img-cover-box{
    width: 100%;
    height: 100%;
    z-index: 800;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .el-dialog__header{
    padding: 0;
  }
  .el-dialog__body{
    padding: 0;
    width: 100%;
    height: 100%;
  }
  .el-dialog__headerbtn{
    display: none;
  }
</style>