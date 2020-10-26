<template>
  <div class="version">
    <el-dialog  title="提示" :close-on-click-modal="false" :visible.sync="showDialog" width="500px" @close="handleClose">
      <div>
        <ul>
          <li class="clearfix">
            <span class="span_first">当前版本</span>
            <span class="span_two">生成人</span>
            <span class="span_two">大小</span>
            <span class="span_two">操作</span>
          </li>
          <div style="height:250px;">
            <el-scrollbar style="height:100%">
              <li v-for="item in versionlist" class="clearfix">
                <el-checkbox v-model="item.checked" @change="changeEvent(item)"></el-checkbox>
                <span class="span_btn">V{{item.docVersionNumber}} {{item.updateTime}}</span>
                <span class="span_sec">{{item.userName}}</span>
                <span class="span_sec">{{item.docSize}}</span>
                <span class="span_sec">
                                <span class="el-icon-back" @click="backEvent(item)"></span>
                                <span class="el-icon-download" @click="loadEvent(item)"></span>
                              </span>
              </li>
            </el-scrollbar>
          </div>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
                <el-button @click="clickEvent">取 消</el-button>
                <el-button @click="affirmUpload">上传新版本</el-button>
          </span>
      <upload-add-doc v-if="addDoc" :uploadDocAddIsShow="uploadDocAddIsShow" @sendValueToParent="sendValueToParentFn" @docUpload="docUploadFn"></upload-add-doc>
      <input type="file" id="fileBtn" style="display:none">
    </el-dialog>
  </div>
</template>

<script>
  import uploadAddDoc from '@/components/file/uploadAddDoc'
  import {wisdom_doc} from '@/pages/common/js/doc.main'
  export default {
    name: 'version',
    props: ['versionIsShow','docVersionlist','verRestoreData', 'verSourceType'],
    components: {
      uploadAddDoc
    },
    data () {
      return {
        addDoc: false,
        uploadDocAddIsShow: false,
        requestCode: {},
        versionlist:[],
        showDialog: false
        // listObj: [{
        //     checked: false,
        //     version: 'v1',
        //     time:'2018-12-12 12:12:12',
        //     user: '上海',
        //     size:'60KB',
        // }, {
        //     checked: false,
        //     version:  'v1',
        //     time:'2018-12-12 12:12:12',
        //     user: '上海',
        //     size:'60KB',
        // }, {
        //     checked: false,
        //     version:  'v1',
        //     time:'2018-12-12 12:12:12',
        //     user: '上海',
        //     size:'60KB',
        // }, {
        //     checked: false,
        //     version:  'v1',
        //     time:'2018-12-12 12:12:12',
        //     user: '上海',
        //     size:'60KB',
        // }]
      }
    },
    created() {
      this.requestCode = this.code.codeNum;
    },
    mounted(){
      this.versionlist = this.docVersionlist
    },
    methods:{
      //版本返回
      backEvent(item){
        if(this.verSourceType) {
          var data = {
            token: this.$store.state.loginObject.userToken,
            userId: this.$store.state.loginObject.userId,
            pageNo: 0,
            pageSize: 10,
            data: {
              docId: '1',
              id: '1',
              updateBy: '2'
            }
          };
          this.$post('/doc/paper/reBackDocVersion',data)
            .then((res) => {
              if(this.code.codeNum.SUCCESS == res.code) {
                this.versionlist.push(res.data)
                this.$message({
                  message: '还原版本成功',
                  type: "success"
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      },
      //下载
      loadEvent(item){
        this.$emit('docVersionLoad',item);
      },
      //选中状态
      changeEvent(item){
        console.log(item)

      },
      clickEvent(){
        this.$emit('closeVersionDialong',false);
      },
      handleClose(){
        // this.$emit('update:versionIsShow',false);
      },
      affirmUpload() {
        this.addDoc = true
        this.uploadDocAddIsShow = true
      },
      sendValueToParentFn() {
        //上传的关闭弹框
        this.addDoc = false
        this.uploadDocAddIsShow = false
      },
      docUploadFn(fileData) {
        //上传成功后的回调
        console.log(this.verSourceType)
        if(this.verSourceType == 1) {
          var data = {
            token: this.$store.state.loginObject.userToken,
            userId: this.$store.state.loginObject.userId,
            data: {
              docSize: fileData.fileData.origSize,
              projId: this.$store.state.projectMsg.pro_id,
              docId: fileData.docId,
              docName: fileData.fileData.name,
              updateBy: this.$store.state.loginObject.userId,
              docRfs: fileData.fileData.rfsId,
              rfsId: fileData.fileData.rfsId
            }
          };
          this.$post('/doc/paper/addDocVersion',data)
            .then((res) => {
              if(this.requestCode.SUCCESS == res.code) {
                this.addDoc = false
                this.uploadDocAddIsShow = false
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      },
    },
    watch:{
      versionIsShow(val){
        this.showDialog = val
      }

    },
  }
</script>

<style scoped lang="scss" type="text/css">

</style>
<style>
  .version li{
    width:100%;
    line-height: 40px;
    font-weight: 600;
    border-bottom:1px solid #e7e7e7;
  }
  .version .span_two{
    float: left;
    width:85px;
  }
  .version .span_first{
    float: left;
    width:200px;
    text-align: left;
  }
  .version .el-checkbox{
    width:20px;
    text-align: left;
    float: left;
    margin-right:0
  }
  .version ul li div{
    height:350px;
  }
  .version ul li div li{
    font-weight: 400;
  }
  .version .span_sec{
    float: left;
    width:85px;
  }
  .version  .span_btn{
    float: left;
    width:180px;
    text-align: left;
  }

</style>
