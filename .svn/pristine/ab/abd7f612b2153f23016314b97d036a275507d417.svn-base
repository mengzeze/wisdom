<template>
  <div style="display: inline-block">
    <el-dropdown @command="handleCommand" :trigger="trigger">
      <span v-if="flag==='chat'" title="发送文件" class="iconfont wj-fswj color-primary-hover" style="cursor: pointer;">

      </span>
      <span v-else class="el-dropdown-link attachment-text color-primary">
        <i class="iconfont fujian color-primary mr-5"></i>
        <span style="cursor: pointer">添加附件</span>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item :disabled="disabled" command="1">本地上传</el-dropdown-item>
        <el-dropdown-item v-if="!onlyLocal" :disabled="disabled" command="2">项目文档选择</el-dropdown-item>
        <el-dropdown-item :disabled="disabled" v-if="$utils.m('paper_manage') && !onlyLocal" command="3">底稿选择</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <!--本地上传-->
    <rd-uploader ref="RdUploader"
                 @uploaded="docUpload"></rd-uploader>

    <!--项目文档选择-->
    <relation-Add-Doc v-if="relafag"
                      @clearstate="clears"
                      :showDisabled="showDisabled"
                      @elationUp="elationUpFn"
                      :getProjectId="projectId"></relation-Add-Doc>
    <!--底稿选择-->
        <manuscript-Add-Doc
          v-if="relafagmanus"
          :showDisabled="showDisabled"
          @clearstate="clearsmacuse"
          :manscProjectId="projectId"
          @elationUpmansc="elationUpmanscFn"></manuscript-Add-Doc>
  </div>


</template>

<script>
    // 上传本地附件
    import uploadAddDoc from "@/components/file/uploadAddDoc";
    // 关联附件
    import relationAddDoc from "@/components/relation/relation";
    // 从底稿选择附件
    import manuscriptAddDoc from "@/components/relation/manuscript";
    export default {
      name: "AddAttachment",
      components: {
        uploadAddDoc,
        relationAddDoc,
        manuscriptAddDoc
      },
      props: ['projectRequired',
        'projectId',
        'icon',
        'disabled',
        'flag',
        'onlyLocal',
        'isPicture',
        'showDisabled',
        'taskId',
        'docSource',//新建拜访记录上传附件为16，其他没有传
        'currentApprovalType' // 7为新建项目审批类型 与未关联项目的审批一致 不可使用底稿和项目文档
      ], // todo 考虑是否有不需要projectId的情况
      data() {
        return {
          trigger: 'hover',
          tansferList: [],
          uploadnum: '',
          addDoc: false,
          uploadDocAddIsShow: false,
          uploadParamData: {
            docSource: 3,
            projId: 1,
            parentId: null,
            auditProjectId: null,
          },
          shagchaunlist: [],
          relafag: false,
          queryDocProjectId: '',
          meeting:{
            Relation:[]
          },
          msgObj:{
            Relation:[]
          },
          relafagmanus: false,
          upLoadItem: '',
          uploadIcon: require('@/assets/image/shanc.png'),
          curDocSource: ''
        }
      },
      created(){

        this.curDocSource = this.docSource || ''
        if(this.flag==='chat'){
          this.trigger = 'click'
        }
        if(this.docSource == 16){
          this.uploadParamData.docSource = 16;
        }
      },
      methods: {
        uploadPic(uploadParamData){
          let options = {
            multiple: true,
            accept: 'bmp,jpg,jpeg,png,tif,gif,pcx,tga,exif,fpx,svg,psd,cdr,pcd,dxf,ufo,eps,ai,raw,WMF,webp'
          }
          this.$refs['RdUploader'].openSelect(options, uploadParamData)
        },
        close(){
          console.log('add-close')
          this.$refs['RdUploader'].handleClose()
          this.$emit('clearApprovalType') // 弹窗关闭时清除当前审批类型值
        },
        handleCommand(v){
          // if(this.projectRequired && !this.projectId){
          //   this.$message.error("请先选择项目后再添加附件");
          //   return;
          // }
          if(this.projectRequired && !this.projectId){ // 项目审批
            this.$message.error("请先选择项目后再添加附件");
            return;
          }
          if(this.currentApprovalType === '7' && v !== '1'){ // 普通审批    新建项目审批 并且不是本地上传 不可上传
            this.$message.error("当前审批未关联项目，因此无法选择底稿和项目文档文件");
            return;
          }
          if(!this.projectId && v !== '1'){  // 普通审批    其他普通审批 并且不是本地上传 不可上传
            this.$message.error("当前审批未关联项目，因此无法选择底稿和项目文档文件");
            return;
          }

          switch (v) {
            case '1':
              this.uploadFromLocal();
              break
            case '2':
              this.uploadFromProject();
              break
            case '3':
              this.uploadFromPaper()

          }
        },

        uploadFromLocal() {
          let options = {
            multiple: true,
            accept: ''
          }
          this.$refs['RdUploader'].openSelect(options, this.uploadParamData)

        },

        uploadFromProject() {
          console.log(123, this.projectId)
          this.$utils.checkProjectPermissionAsync(this.projectId, 'project_file').then(res=>{
            if(!res){
              this.$message.warning('无对应权限，请联系对应项目组负责人处理')
              return
            }
            this.openDialogDoc()
          },err=>{

          })
        },

        uploadFromPaper() {
          this.$utils.checkProjectPermissionAsync(this.projectId, 'project_file').then(res=>{
            if(!res){
              this.$message.warning('无对应权限，请联系对应项目组负责人处理')
              return
            }
            this.openDialogPaper()
          },err=>{

          })
        },


        docUpload(data){

          this.isPicture
            ? this.$emit('upload-pic', data)
            : this.$emit('select', {type:1, data:[data], taskId:this.taskId})

          this.$refs['RdUploader'].handleUploadSuccess(data.tId)

        },

        handleUpdate(p){
          this.$emit('update', p)

          let fileId = p[0]
          let key = p[1]
          let value = p[2]
          let cur = this.tansferList.filter(v=>v.id===fileId)
          cur[0] && (cur[0][key] = value)

        },

        deleteDoc(fileId){
          this.$refs['RdUploader'].deleteDoc(fileId)
        },


        openDialogPre(key) {
          this.upLoadItem = key;
          if(this.projectRequired && !this.projectId){
            this.$message.error("请先选择所属项目");
            return;
          }
          key === 1 ? this.openDialogLocal():this.checkPermission()
        },
        openDialogLocal() {
          this.addDoc = true;
          this.uploadDocAddIsShow = true;
        },
        openDialogDoc() {
          this.relafag = true;
        },
        openDialogPaper() {
          this.relafagmanus = true;
        },
        openDialogChoice() {
          this.upLoadItem === 2 ? this.openDialogDoc(): (this.upLoadItem === 3 && this.openDialogPaper())
        },
        /**
         * 权限验证：
         * 1. 如果有项目id, 需根据项目id获取当前项目权限再做判断；
         * 2. 没有项目id，项目权限同菜单当前项目，权限列表已存在缓存中
         *
         * */
        checkPermission() {
          if(this.projectId) { //涉及选择项目的，即当前表单项目和菜单不是同一个项目
            this.getPermissionByProjectId().then(res=>{
              if(!res){
                this.$message.error("无查看项目文档的权限");
              } else{
                this.openDialogChoice()
              }
            })

          }else if(!this.$utils.checkProjectPermission("project_file")){ // 无项目id,项目即为当前菜单项目
            this.$message.error("无查看项目文档的权限");
          } else {
            this.openDialogChoice()
          }
        },
        /**
         * 根据项目id获取项目权限
         * */
        async getPermissionByProjectId() {
          console.log(5, this.projectId)
          var obj = {
            token: this.token,
            userId: this.userId,
            projectId: this.projectId,
            "data":{
              "projectId":this.projectId
            }
          }
          return await this.$post("/info/project/getProjectPerm", obj).then(response=>{
            if(response.code !== this.code.codeNum.SUCCESS){
              this.$message.error(response.msg)
              return;
            } else if(!response.data.length){
              this.$message.error('无当前项目权限')
              return;
            }
            // 判断是否有项目文档权限（底稿通用）
            let idx = response.data.findIndex(v=>v==='project_file')
            return idx>-1 ;
          },err=>{
            this.$message.error(err.message || '网络异常，请刷新重试')
          })
        },

        /**
         * 本地上传
         */
        uploadingFn() {
          if(this.projectRequired && !this.projectId){
            this.$message.error("请先选择所属项目");
            return;
          }
          //上传
          this.addDoc = true;
          this.uploadDocAddIsShow = true;
        },


        /**
         * 每一个文件上传成功都会触发
         */
        docUploadFn(uploadData) {
          var docType = uploadData.fileData.type;
          var index  = docType.indexOf("/");
          var imgtype = docType.slice(index + 1);
          uploadData.type = imgtype
          this.shagchaunlist.push(uploadData)
          this.$refs.uploadRef.uploadComplete();

          this.$emit('select', {type:1, data:uploadData})
        },
        /**
         * 本地文件上传成功，关闭弹窗
         */
        docUploadAllsucess() {
          this.$emit('docUploadAllsucess')
        },
        sendValueToParentFn() {
          //上传的关闭弹框
          this.addDoc = false;
          this.uploadDocAddIsShow = false;
        },

        /**
         * 项目文档选择
         */
        upreat(num) {
          if(this.projectId) { //涉及选择项目的，即当前表单项目和菜单不是同一个项目


          }else if(!this.$utils.checkProjectPermission("project_file")){
            this.$message.error("无查看项目文档的权限");
          } else {
            this.uploadnum = num;
            this.relafag = true;
          }
        },
        elationUpFn(uploadData) {
          console.log('2', uploadData)
          this.relafag = false;
          this.$emit('select', {type:2, data:uploadData})
        },

        clears(varyt) {
          //上传的关闭弹框
          this.relafag = false;
        },

        /**
         * 底稿选择
         */
        upreatdigao() {

        },
        clearsmacuse(varyt){
          this.relafagmanus = false;
        },
        elationUpmanscFn(uploadData) {
          console.log('3', uploadData)
          this.$emit('select', {type:3, data:uploadData})
          this.relafagmanus = false;
        }
      }
    }
</script>

<style scoped>
  .attachment-text{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .attachment-text-chat{
    display: inline-block;
    width: 13px;
    height: 16px;
    background: url('../assets/common_icon/wenjian_icon.png') no-repeat;
    background-size: 13px 16px;
    margin-left: 20px;
  }
  .attachment-text-chat:hover{
    background: url('../assets/common_icon/wenjian_hover_icon.png') no-repeat;
    background-size: 13px 16px;
  }

</style>
