<template>
  <div class="rduploader-folder">
    <!-- 文件夹上传 -->
    <input ref="fileFolder" type='file' webkitdirectory  @change="handleFolderSelect" style="display:none;">
    <!-- 文件上传 -->
    <input v-if="browserType!=='火狐'"  ref="rd_upload" type="file" @change="handleChange" :multiple="multiple" :accept="accept" style="display:none;">
    <input v-else ref="rd_upload" type="file" @change="handleChange" :multiple="multiple" style="display:none;">

     <el-dialog title="文件重名" :close-on-click-modal="false" :visible.sync="checkVisible" width="550px"
               @close="checkCloseFn" class="rename-select-box">
       <div>
          <el-radio v-model="plan" label="1">重命名</el-radio>
          <el-radio v-model="plan" label="2">更新版本</el-radio>
          <el-radio v-model="plan" label="3">跳过</el-radio>
       </div>
        <div slot="footer" class="footer">
            <el-button size="medium" @click="checkCloseFn">取 消</el-button>
            <el-button size="medium" type="primary" @click="openSelectFolder">确 定
            </el-button>
        </div>
     </el-dialog>
    <el-dialog
      title=""
      id="rduploaderalldialog"
      :show-close="false"
      :visible.sync="showList"
      class="rduploader dialogStyle"
      :custom-class="rduploaderdialog"
      :close-on-click-modal="false"
      :modal="false">
      <el-card class="table-wrap">
        <div class="transfer-header" :class="{'text-left': mini}">
          <span v-show="!mini" class="transfer-title">文件上传</span>
          <span v-show="mini" class="transfer-title">文件上传 ({{successNo}}/{{allFilesNo}})</span>
          <span class="operate-btn">
            <i v-show="!mini" class="el-icon-minus" @click="handleMinilize"></i>
            <i v-show="mini" class="iconfont zuidahua" @click="handleOpen"></i>
            <i class="el-icon-close" @click="handleClose"></i>
          </span>
        </div>
        <el-table :data="tableData" max-height="320" :header-cell-style="{background:'#FAFAFA',color:'#000'}">
          <el-table-column prop="name" label="文件名称" width="300">
            <template slot-scope="scope">
              <div class="upload_fileName">
                <img class="file-icon" :src="scope.row.fileIcon">
                <span class="file-name" :title="scope.row.name">{{scope.row.name}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="size" label="大小" width="100"></el-table-column>
          <el-table-column prop="state" label="状态" width="150">
            <template slot-scope="scope">
              <span class="upload-state-text" :class="{'success': scope.row.status==='success', 'error': scope.row.status==='exception'}">{{scope.row.state}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="progress" label="进度条" width="150">
            <template slot-scope="scope">
              <el-progress v-if="scope.row.status==='success'" :percentage="scope.row.progress" status="success"></el-progress>
              <el-progress v-else-if="scope.row.status==='exception'" :percentage="scope.row.progress" status="exception"></el-progress>
              <el-progress v-else :percentage="scope.row.progress"></el-progress>
            </template>
          </el-table-column>
          <el-table-column label="操作" show-overflow-tooltip>
            <template slot-scope="scope" v-if="scope.row.status !== 'success'">
              <el-button @click="deleteDoc(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-dialog>

  </div>
</template>

<script>
  const exclude = ['exe', 'jsp', 'htm','php', 'asp', 'js', 'aspx', 'chm']
  import SparkMD5 from 'spark-md5'
  import axios from 'axios'
  export default {
    name: "RdUploaderFolder",
    data() {
      return{
        iswaitingNext: false, // 等待上传下一个
        nextFile: {}, // 下一个要上传的文件，预处理文件
        maxFileSize: 1024 * 1024 * 1024 * 5, // 能上传的最大的单个文件
        chunkSize: 10 * 1024 * 1024,
        multiple: false,
        accept: '',
        showList: false,
        tableData: [],
        fileIdNum: 500,
        isVersion: false,
        mini: false,
        uploadParamData: {},
        browserType: '',
        uploadList: [], // 待上传文件队列
        uploadingFile: {},
        uploadedList: [], // 已上传的文件列表
        rduploaderdialog: 'rduploaderdialog', // 自定义样式
        isOnLine: true,
        timer: null,
        checkingNet: false,
        curChunkIdx: 0, // 当前上传的块下标
        uploadId: '', // init 返回的uploadId
        uploadStage: 0, // 上传的阶段：1：初始化完成，切块完成；2: 块验证和上传中；3: 块上传完成，待insert; 4:insert完成
        resData:{}, // 上传成功的数据
        uploadChunkData:{},
        checkVisible: false,
        plan: '1',//重命名处理 1重命名2更新版本3跳过
        allFile: [],//文件夹下所有的文件
        fileList: [],//不超过5G的文件
        lockedList: [],//锁定文件列表
        childrenList: [],//目录下所有子集文件信息
        docSource: 0,//项目文档为0，底稿文档为1，客户文档为2
      }
    },
    created(){
      // 获取浏览器类型，兼容火狐浏览器
      this.browserType = this.$utils.checkBrowser()
      //解决浏览器刷新之后保持的上传状态
      this.handleClose()
    },

    mounted() {
      // 去掉dialog的margin-top
      this.handleChangeStyle()
      // 关闭痰喘
      window.closeUploadDialog = this.handleClose
    },
    computed: {
      allFilesNo(){
        return this.tableData.length
      },
      successNo() {
        let successNo = this.tableData.filter(v=>v.state === '上传成功').length
        return successNo
      },
      uploadedNo() { // 上传过的文件个数（包括上传成功和失败）
        return this.uploadedList.length
      },
      uploadNo(){ // 上传队列中文件个数
        return this.uploadList.length
      },
      isUpload() {
        return this.$store.state.isUpload
      },
      isCloseUploadDialog(){
        return this.$store.state.isCloseUploadDialog
      }
    },
    methods:{
      uploadFolder(uploadParamData,docSource){
        this.checkVisible = true
        this.uploadParamData = uploadParamData
        this.docSource = docSource;
        // 默认选中重命名
        this.plan='1'
      },

      handleChildrenListPath(childrenList){
        let childrenFile = []
        childrenList.forEach(v=>{
          // 如果是文件夹，不处理
          if(+v.docType===1) return
          let p =  this.getParentPath(v.parentId, childrenList)
          v.fullPath = p ? (p + '/' + v.docName) : v.docName

          // console.log("fullPath", v.fullPath)
          childrenFile.push(v)
          
        })
        return childrenFile
      },

      getParentPath(parentId, childrenList){
        let path = []
        let fn=(pid)=>{
          let parent = childrenList.find(v=>v.id===pid)
          if(!parent) return
          path.push(parent.docName)
          parent.parentId && fn(parent.parentId)
        }
        fn(parentId)

        // 底稿路径要去掉根目录
        // this.docSource != 0 && path.pop()
      
        return path.reverse().join('/')
      },

      // 遍历待上传的文件列表，处理重名逻辑
      handleDuplicated(fileList, childrenList, lockedList){
        let isUploadFirstFile = true;
        console.log('childrenList',childrenList)

        // 上传文件
        fileList.forEach((file, index)=>{
          
          // 处理路径
          // file.parentPath = file.webkitRelativePath.substr( file.webkitRelativePath.indexOf('/')+1)
          file.parentPath = file.webkitRelativePath
          // console.log(file.parentPath)
          // 判断重名
          let duplicatedFile = childrenList.find(c=>c.fullPath===file.parentPath)


          // 不重名，直接上传
          if(!duplicatedFile){
            // 上传处理
            isUploadFirstFile && (file.uploadDir = file.webkitRelativePath.substr(0,file.webkitRelativePath.indexOf('/')));
            isUploadFirstFile = false;
            this.addFileToTransferList(file)
            return
          }
          // 重名
          // 如果为跳过，上传下一个
          if(this.plan==='3') return
          // 如果是重命名，加入上传列表
          if(this.plan==='1') {
            isUploadFirstFile && (file.uploadDir = file.webkitRelativePath.substr(0,file.webkitRelativePath.indexOf('/')));
            isUploadFirstFile = false;
            this.addFileToTransferList(file)
            return
          }
          // 如果是上传新版本，先判断是否为锁定
          let isLock = lockedList.find(l=>l.id===duplicatedFile.id)
          if(isLock) {
            this.$message.warning('该文件在项目中被其他人锁定，请解锁后重新进行上传操作')
            return
          }
          file.docId = duplicatedFile.docId
          file.isVersion = true
          file.orgId = duplicatedFile.id

          // 没有锁定，可以上传新版本，则加入上传列表
          this.addFileToTransferList(file)

        })

        if(!this.uploadList.length) {
          // this.$message.warning('无可上传的文件，请重新选择')
          return
        }

        this.startUpload()

      },

      startUpload(){
        // 开始上传
        // 每一次选择完文件都将恢复传输列表初始状态：打开传输列表，并最大化
        !this.showList && (this.showList = true) // 打开传输列表弹窗
        // this.mini && this.handleOpen() // 如果最小化了弹窗，重新最大化
        this.handleOpen() // 重新最大化
        if(!this.isUpload) { // 如果文件上传状态为false，开始上传；如果已经有文件在上传了，不需要处理
          this.$store.commit('setUploadStatus', true)
          // 上传文件
          this.uploadSingleFile()
        }
      },


      addFileToTransferList(file, flag){
        // 给文件添加id
        let fileName = file.name
        file.id = this.fileIdNum
        file.docType = fileName.substring(fileName.lastIndexOf(".")+1).toLowerCase()
        // 添加上传新版本标识
        if(flag === 'file'){ // 文件上传
          this.isVersion && (file.isVersion = true)
        }
        file.data = this.$utils.copyObj(this.uploadParamData)
        file.docId && (file.data.docId = file.docId)
        file.orgId && (file.data.id = file.orgId)
        file.fileName = fileName

        this.uploadList.push(file) // 添加到文件上传队列中
        this.tableData.push({ // 添加表格数据
          id: file.id,
          name: fileName,
          docName: fileName,
          size: this.$utils.handleFileSize(file.size),
          state: '等待上传',
          progress: file.percent || 0,
          progressChunk: [],
          status: '',
          fileIcon: this.$utils.iconFilter(fileName),
          file: '',
        })
        this.fileIdNum++
          
      },

      checkCloseFn(){
        this.checkVisible = false;
      },
      clearUploadStatus(){
        this.uploadStage = 0
        this.$store.commit('setUploadStatus', false)
        this.curChunkIdx = 0
        this.resData = {}
        this.uploadId = ''
      },

      // 轮询网络状态
      checkNet() {
        window.Netchecking = true
        this.$post('/rfs/initUpload').then(res=>{
          this.checkingNet = false
          window.Netchecking = false
          this.handleReupload()
        }, err=>{
          if(!window.Netchecking) return
          setTimeout(()=>{
            this.checkNet()
          },5000)

        })
      },

      handleReupload() {
        let file = this.uploadList[0]
        if(!file) return
        switch (this.uploadStage) {
          case 0:
            this.uploadSingleFile();
            break
          case 1:
            this.checkChunkExist(this.curChunkIdx);
            break
          case 2:
            this.uploadChunk(this.uploadChunkData)
            // 预加载下一块
            !this.nextFile.file && this.handleFileSlice(this.curChunkIdx+1, 'preLoad')
            break
          case 3:
            this.handleInsertDoc(file);
            break
          case 4:
            this.handleInsertSuccess();
            break
        }
        this.uploadStage!==0 && this.updateTable(file.id, [{key: 'state', value: '正在上传'}])
      },

      /**
       * 打开选择文件控件
       * @param options 文件上传参数
       * @param flag 上传或是上传新版本
       */
      openSelect(options, uploadParamData, flag) {
        if(flag && this.$store.state.isUpload) {
          this.$message.warning('上传新版本每次只能上传一个文件')
          return
        }

        this.multiple = options.multiple // 文件多选

        if(options.accept) {
          let arr = options.accept.split(',')
          let accept = arr.map(v=>"."+v)
          this.accept = accept // 可选文件类型
          // 兼容火狐
          this.$refs['rd_upload'].accept = accept.join(',')
        } else {
          this.accept = ''
          // 兼容火狐浏览器
          this.$refs['rd_upload'].accept = ''
        }


        this.isVersion = false // 记录是否是版本上传
        this.uploadParamData = uploadParamData

        setTimeout(()=>{
          this.isVersion = Boolean(flag)  // 是否是上传新版本
          this.$refs['rd_upload'].click()
        }, 10)
      },

      /**
       * 打开选择文件夹控件
       */
      openSelectFolder() {
        let canUpdate = false
        if(this.docSource==0){
          canUpdate = this.$utils.checkProjectPermissionAjax(this.uploadParamData.projId,'project_file_upload').data
        } else {
          canUpdate = this.$utils.checkSystemPermission('paper_file_file_upload')
        }
        if(this.plan==2 && !canUpdate) {
          this.$message.warning('无更新版本权限')
          return
        }
        setTimeout(()=>{
          this.$refs['fileFolder'].click()
          this.checkCloseFn();
        }, 10)

      },

      /**
       * 选择文件夹
       */
      handleFolderSelect(e) {
        // console.log('xuanzefolder', e)

        let allFile = this.$refs['fileFolder'].files;
        allFile = Array.from(allFile)
        // return
        if(!allFile || !allFile.length) {
          this.$message.warning('该文件夹下无文件，请重新选择')
          return
        }
        let fileList = [] // 存储要上传的文件信息
        let hasExceed = false // 是否有超过5g的文件
        // console.log('9999999999999999999999文件',allFile)
        allFile.forEach(file=>{
          let hzIdx = file.name.lastIndexOf(".")
          let hz_name = ''
          hzIdx >0 && (hz_name = file.name.substring(hzIdx+1).toLowerCase());
          file.typeAccept = hzIdx>0 && exclude.indexOf(hz_name)<0 // 记录是否是支持的文件类型
          file.sizeAccept = file.size<=this.maxFileSize // 记录文件大小是否超出

          file.grandChild = file.webkitRelativePath.match(/\//g).length>1
          file.isFolder = true;
          // if(file.size<=this.maxFileSize) {
          //   // 判断是否为间接子元素，插入文件时需要区分
          //   file.grandChild = file.webkitRelativePath.match(/\//g).length>1
          //   file.isFolder = true;
          //   fileList.push(file)
          // } else {
          //   hasExceed = true
          // }

          fileList.push(file)

        })
        // 清空上次已选文件，防止下次选中统一文件不触发onchange事件
        this.$refs['fileFolder'].value = null

        // 没有可上传的文件，return
        // if(fileList.length == 0){
        //   hasExceed && this.$message.warning("单个文件不能超过5G，请重新选择")
        //   return;
        // }

        // if(fileList.length < allFile.length){
        //   hasExceed && this.$message.warning('单个文件不能超过5G，已自动过滤超出5G的文件');
        // }
        let requestList = []
        requestList.push(this.getChildrenListPromise())
        // 如果是锁定，需获取目标目录下所有锁定的文件信息
        this.plan === '2' && requestList.push(this.getLockedListPromise())

        axios.all(requestList).then(axios.spread((childrenList,lockedList) => {
          // 处理重名
          this.handleDuplicated(fileList, childrenList, lockedList)
        }))
      },


      /**
       * 选择文件夹
       */
      handleFolderSelectBak(e) {
        // console.log('xuanzefolder', e)

        let allFile = this.$refs['fileFolder'].files;
        allFile = Array.from(allFile)
        // console.log(allFile, allFile.length)
        // return
        if(!allFile || !allFile.length) {
          this.$message.warning('该文件夹下无文件，请重新选择')
          return
        }
        let fileList = [] // 存储要上传的文件信息
        let hasExceed = false // 是否有超过5g的文件
        // console.log('9999999999999999999999文件',allFile)
        allFile.forEach(file=>{
          let hzIdx = file.name.lastIndexOf(".")
          let hz_name = ''
          hzIdx >0 && (hz_name = file.name.substring(hzIdx+1).toLowerCase());
          if(hzIdx<0 || exclude.indexOf(hz_name)>-1) { // 如果没有后缀名或
            this.$message.warning(`不支持该 ${hz_name} 类型文件上传，已被自动过滤`)
            return
          }
          if(file.size<=this.maxFileSize) {
            // 判断是否为间接子元素，插入文件时需要区分
            file.grandChild = file.webkitRelativePath.match(/\//g).length>1
            file.isFolder = true;
            fileList.push(file)
          } else {
            hasExceed = true
          }

        })
        // 清空上次已选文件，防止下次选中统一文件不触发onchange事件
        this.$refs['fileFolder'].value = null

        // 没有可上传的文件，return
        if(fileList.length == 0){
          hasExceed && this.$message.warning("单个文件不能超过5G，请重新选择")
          return;
        }

        if(fileList.length < allFile.length){
          hasExceed && this.$message.warning('单个文件不能超过5G，已自动过滤超出5G的文件');
        }
        let requestList = []
        requestList.push(this.getChildrenListPromise())
        // 如果是锁定，需获取目标目录下所有锁定的文件信息
        this.plan === '2' && requestList.push(this.getLockedListPromise())

        axios.all(requestList).then(axios.spread((childrenList,lockedList) => {
          // 处理重名
          console.log(1)
          this.handleDuplicated(fileList, childrenList, lockedList)
        }))
      },
      getLockedListPromise() { //获取锁定文件列表
        let url = this.docSource == 0 ? '/doc/project/projectParentlistLock' : '/doc/paper/paperParentlistLock';
        let userId = sessionStorage.getItem('userId')
        let token = sessionStorage.getItem('userToken')
        let sendData = {
          token: token,
          userId: userId,
          data: {
            id: this.uploadParamData.parentId,
            projId: this.uploadParamData.projId,
            docType: 1
          }
        }
        return this.$post(url, sendData).then(
          res => {
            if (res.code !== this.code.codeNum.SUCCESS) {
              return;
            }
            return res.data
          },
          err => {
            return false
          })
      },
      getChildrenListPromise() { //获取目录下所有子集文件信息
        let url = this.docSource == 0 ? '/doc/project/projectParentlist' : '/doc/paper/paperParentlist';
        let userId = sessionStorage.getItem('userId')
        let token = sessionStorage.getItem('userToken')
        let sendData = {
          token: token,
          userId: userId,
          data: {
            id: this.uploadParamData.parentId,
            projId: this.uploadParamData.projId,
            docType: 1
          }
        }
        return this.$post(url, sendData).then(
          res => {
            if (res.code !== this.code.codeNum.SUCCESS) {
              return;
            }
            let childrenFileList = this.handleChildrenListPath(res.data)
            return childrenFileList
          },
          err => {
            return false
          })
      },
      insertFile(localFile) { //上传文件夹
        let url = this.docSource == 0 ? '/doc/project/insertFileForFile' : '/doc/paper/insertFileForFile';
        let pathArr = localFile.webkitRelativePath.split("/");
        pathArr.splice(0,1)
        let path = pathArr.join('/')
        let docType = pathArr.length == 1 ? 0 : 1;
        let userId = sessionStorage.getItem('userId')
        let token = sessionStorage.getItem('userToken')
        let sendData = {
          token: token,
          userId: userId,
          data: {
            docType: docType,//文件夹为1
            docName: localFile.name,//本地准备上传的文件名称
            parentId: this.uploadParamData.parentId,//父级id
            auditProjectId: this.uploadParamData.auditProjectId,//阶段id
            docSource: this.docSource,//项目文档为0，底稿为1
            updateBy: userId,
            filePath: path,
            projectId: this.uploadParamData.projId
          }
        }
        console.log(12, sendData)
        this.$post(url, sendData).then(
          res => {
            if (res.code == this.code.codeNum.SUCCESS) {
              this.resData = res.data
              this.handleInsertSuccess()
              this.$message.success('上传成功')
            } else {
              this.$message.warning('上传失败')
            }
          },
          err => {
          })
      },
      /**
       * 处理选择的文件
       */
      handleChange() {

        // 获取选中的文件对象
        let files = this.$refs['rd_upload'].files
        files = Array.from(files)

        for(var i=0; i< files.length; i++){
          let hzIdx = files[i].name.lastIndexOf(".")
          let hz_name = ''
          hzIdx >0 && (hz_name = files[i].name.substring(hzIdx+1).toLowerCase());
          files[i].typeAccept = hzIdx>0 && exclude.indexOf(hz_name)<0 // 记录是否是支持的文件类型
          files[i].sizeAccept = true // 文件上传不限制大小（文件夹限制）
          // 7.17调整交互 -- 调整失败文案
          // if(hzIdx<0 || exclude.indexOf(hz_name)>-1) { // 如果没有后缀名或
          //   this.$message.warning(`不支持该 ${hz_name} 类型文件上传，已被自动过滤`)
          // } else {
          //   this.addFileToTransferList(files[i],'file')
          // }

          this.addFileToTransferList(files[i],'file')
        }
        // 清空上次已选文件，防止下次选中统一文件不触发onchange事件
        this.$refs['rd_upload'].value = null

        if(this.uploadList.length){
          // 每一次选择完文件都将恢复传输列表初始状态：打开传输列表，并最大化
          !this.showList && (this.showList = true) // 打开传输列表弹窗
          // this.mini && this.handleOpen() // 如果最小化了弹窗，重新最大化
          this.handleOpen() // 重新最大化
          if(!this.isUpload) { // 如果文件上传状态为false，开始上传；如果已经有文件在上传了，不需要处理
            this.$store.commit('setUploadStatus', true)
            // 上传文件
            this.uploadSingleFile()
          }
        }
      },

      handleChangeStyle(){
        let el = Array.from(document.querySelectorAll('#rduploaderalldialog > .el-dialog'))
        if(!el || !el.length) return
        el.forEach(v=>{
          v.style.marginTop = 0
        })
      },



      uploadSingleFile(){
        // 上传文件，从头到尾逐一上传，上传成功shift上传队列
        let file = this.uploadList[0]

        if(!file.typeAccept || !file.sizeAccept) {
          let errMsg = !file.typeAccept ? '该格式不支持上传' : '该文件超出5G限制'
          this.handleUploadError(file.id, '', errMsg)
          return
        }

        //存储文件块信息
        file.fileChunkList = []

        this.updateTable(file.id, [{key: 'state', value: '初始化中'}])

        this.$post('/rfs/initUpload').then(res=>{

          // 判断当前文件是否已被删除
          if(!this.checkCurFileExist(file)) return;

          if(res.code!==this.code.codeNum.SUCCESS){
            this.handleUploadError(file.id)
            return;
          }

          this.uploadId = res.data

          file.uploadId = this.uploadId
          file.rfsId = this.uploadId
          // 计算一共需要切多少块
          let chunks = file.size ? Math.ceil(file.size / this.chunkSize) : 1
          // 储存文件一共有多少块
          file.chunkSize = chunks

          // 初始化进度条
          let tableIdx = this.tableData.findIndex(t=>t.id===file.id)
          for(let item=0; item<chunks;item++) {
            this.tableData[tableIdx].progressChunk[item] = 0
          }
          // 开始分片上传
          this.handleFileSlice(0)

        }, err=>{
          this.handleUploadError(file.id, err)
        })
      },

      handleFileSlice(chunkIdx, flag){
        let file = this.uploadList[0]

        // 判断当前文件是否已被删除
        if(!this.checkCurFileExist(file)) return;

        !flag && (this.curChunkIdx = chunkIdx)

        let fileReader = new FileReader();
        let chunkData = {}

        // 文件切片，读取文件流信息
        let start = chunkIdx * this.chunkSize
        let end = ((start + this.chunkSize) >= file.size) ? file.size : start + this.chunkSize;

        let blob = this.blobSlice(file, start, end)

        fileReader.readAsArrayBuffer(blob);

        fileReader.onload = (e) => {
          let spark = new SparkMD5.ArrayBuffer()
          // 拼接 array buffer
          let buffer = e.target.result
          spark.append(buffer)

          chunkData = {
            hashCode: spark.end(),
            blob: blob,
            size: buffer.byteLength,
            index: chunkIdx
          }

          file.fileChunkList.push(chunkData)

          // 验证文件是否存在，从第0块开始
          this.checkChunkExist(chunkIdx,flag)
        };

        fileReader.onerror = () => {
          //读取文件发生错误的处理
          this.handleUploadError(file.id)
        };
      },

      checkChunkExist(chunkIdx, flag){
        let file = this.uploadList[0]
        // 判断当前文件是否已被删除
        if(!this.checkCurFileExist(file)) return;
        // 预加载时不记入上传阶段
        !flag && (this.uploadStage = 1)
        let idx = chunkIdx
        let tableIdx = this.tableData.findIndex(t=>t.id===file.id)

        let curChunk = file.fileChunkList[idx]
        let p = {
          docName: file.name, // 文件名
          docSize: file.size, // 文件大小
          chunkSize: curChunk.size, // 当前文件块大小
          uploadId: file.uploadId, // uploadId
          hashCode: curChunk.hashCode, // hashCode
          docChunkNumber: file.chunkSize, // 总共的文件片数
          index: curChunk.index, // 当前文件块
          blockSize: this.chunkSize // 文件分片标准大小
        }
        this.checkChunkExistPromise(p, curChunk.blob).then(res=>{

          // 判断当前文件是否已被删除
          if(!this.checkCurFileExist(file)) return;


          if(!res.r){ // 如果不存在，上传文件块

            if(this.iswaitingNext || flag!=='preLoad') {
                this.uploadChunkData={
                  p:p,
                  blob: curChunk.blob,
                  file: file,
                  idx: idx
                }
                this.uploadChunk(this.uploadChunkData)
                this.handleFileSlice(idx+1, 'preLoad')
            } else {
              this.nextFile = {
                p:p,
                blob: curChunk.blob,
                file: file,
                idx: idx
              }
            }
            
          } else if (idx<file.chunkSize-1){ // 已经存在，但不是最后一块, 砌块验证上传下一块
            this.nextFile={}

            this.tableData[tableIdx].progressChunk[curChunk.index] = 100
            this.handleFileSlice(idx+1, flag)
            // this.checkChunkExist(file, idx+1)
          } else { // 已存在且是最后一块，可以inset了
            if(this.iswaitingNext || flag!=='preLoad'){
              this.tableData[tableIdx].progressChunk[curChunk.index] = 100
              this.handleInsertDoc(file)
            } else {
              this.nextFile = {
                insert: true,
                tableIdx,
                chunkIndex: curChunk.index,
                file
              } 
            }

          }

        }, err=>{
          this.handleUploadError(file.id, err)
        })
      },
      // 上传下一块
      uploadNext(){
        if(!this.nextFile.file){
          this.iswaitingNext = true
          return
        }

        this.iswaitingNext = false


        let {p, blob, file, idx, tableIdx, chunkIndex, isInsert} = this.nextFile
        // 如果下一块已经存在，直接插入文件
        if(this.nextFile.isInsert){
            this.tableData[tableIdx].progressChunk[chunkIndex] = 100
            this.handleInsertDoc(file)    
            this.nextFile={}
            return
        }
        // 上传下一块
        this.uploadChunkData={
          p,
          blob,
          file,
          idx
        }
        this.uploadChunk(this.uploadChunkData)
        this.nextFile={}

        this.handleFileSlice(idx+1, 'preLoad')

      },

      uploadChunk(uploadChunkData){
        this.iswaitingNext = false
        let {p, blob, file, idx} = uploadChunkData
        this.uploadStage = 2
        this.updateTable(file.id, [{key: 'state', value: '正在上传'}])
        this.chunkUploadPromise(p, blob, file).then(res=>{

          if(!this.checkCurFileExist(file)) return;

          if(!res.r){ // 上传失败
            this.handleUploadError(file.id)
            return
          }

          if(idx<file.chunkSize-1){ //还有要上传的块, 继续切块上传
            // this.handleFileSlice(idx + 1)
            console.log(1)
            this.uploadNext()
          } else {
            // 块全部全部上传完毕, insert Doc
            this.handleInsertDoc(file)
          }

        }, err=>{
          this.handleUploadError(file.id, err)
        })

      },
      checkCurFileExist(file){
        if(!this.uploadList[0] || (file.id !== this.uploadList[0].id)) { // 如果上传列表为空或者当前上传中的文件被删除
          this.uploadStage = 0
          return false;
        } else { // 继续上传当前文件
          return true;
        }
      },


      handleUploadError(fileId, error, errMsg) {
        if(error === 'Network Error' && !this.checkingNet) {
          this.checkingNet = true
          this.checkNet()
        } else {
          this.uploadedList.push('error') // 已上传列表中添加error
          this.uploadList.shift()
          // 文件上传失败，上传下一个
          if(this.uploadList.length) {
            // (下一个文件没有在上传中，比较极端的情况：当前上传的文件被删除了，已经发出的请求又失败了)
            !this.uploadList[0].fileChunkList && this.uploadSingleFile()
          } else {
            // 如果上传队列中已无文件，清空上传状态
            this.clearUploadStatus()
            // 全部上传完成
            this.$emit('complete')
          }
        }

        let update = [
          {key: 'state', value: errMsg || '上传失败'},
          {key: 'status', value: 'exception'},
        ]
        this.updateTable(fileId, update)


      },

      handleUploadSuccess(fileId) {
        // console.log('handleUploadSuccess',fileId )
        let update = [
          {key: 'state', value: '上传成功'},
          {key: 'status', value: 'success'},
          {key: 'progress', value: 100}
        ]
        this.updateTable(fileId, update)
        this.uploadedList.push(fileId)

        this.uploadList.shift()

        // insert 成功，上传下一块
        this.uploadStage = 0
        this.uploadList.length ? this.uploadSingleFile() : this.$emit('complete')
      },


      handleInsertDoc(file) {
        this.iswaitingNext = false
        this.uploadStage = 3

        let param = file.data
        let userId = sessionStorage.getItem('userId')
        let token = sessionStorage.getItem('userToken')
        let arg = {
          token: token,
          userId: userId,
          data: {
            docSource: param.docSource,//项目文档为0，底稿文档为1，客户文档为2
            projId: param.projId,
            parentId: param.parentId,//顶级为0
            auditProjectId: param.auditProjectId,//项目阶段ID，可以为空
            docName: file.name,
            docSize: file.size,
            docVersionRfs: file.uploadId,//
            docHashcode: file.uploadId,
            createBy: userId,
            updateBy: userId,
            docDescript: '上传新文件'
          }
        };
        if(param.docSource == 16){
          arg.data.validateName = false;
        }

        // 判断当前文件是否已被删除
        if(!this.checkCurFileExist(file)) return;

        axios.post('/doc/insert', arg).then(response => {
          // 判断当前文件是否已被删除
          if(!this.checkCurFileExist(file)) return;

          if(response.data.code!==this.code.codeNum.SUCCESS){
            this.handleUploadError(file.id)
            return
          }
          this.uploadStage = 4
          this.resData = response.data.data
          this.handleInsertSuccess()

        }, err=>{
          this.handleUploadError(file.id, err)
        });

      },

      handleInsertSuccess(){
        let file = this.uploadList[0]
        let resData = this.$utils.copyObj(this.resData)
        resData.rfsId = file.uploadId
        let emitData = {
          docId: resData.docId,
          docName: resData.docName,
          tId: file.id,
          fileData: file,
          isFolder: file.isFolder
        } 
        file.isVersion ? this.$emit('version', emitData) : this.$emit('uploaded', emitData)
      },

      /**
       * 更新table中状态展示
       * @param fileId 文件id
       * @param arr 待更新的数组
       */
      updateTable(fileId, arr) {
        arr.forEach(v=>{
          let idx = this.tableData.findIndex(v=>v.id===fileId)
          if(idx<0) return

          this.tableData[idx][v.key] = v.value
        })
      },

      checkChunkExistPromise(p, blob) {
        return new Promise((resolve, reject)=>{
          this.$post('/rfs/checkChunkExist', {data:p}).then(res=>{
            if(res.code!==0) {
              reject()
              return
            }
            resolve({r: res.data, p:p, b:blob, uploadId: p.uploadId})
          }, err=>{
            reject(err)
          })
        })
      },

      chunkUploadPromise(p, blob, file) {
        return new Promise((resolve, reject)=>{
          let formData = new FormData();
          formData.append("docName", p.docName);
          formData.append("docSize", p.docSize);
          formData.append("chunkSize", p.chunkSize);
          formData.append("uploadId", p.uploadId);
          formData.append("hashCode", p.hashCode);
          formData.append("docChunkNumber", p.docChunkNumber);
          formData.append("index", p.index);
          formData.append("blockSize", p.blockSize);
          formData.append("file", blob);
          $.ajax({
            url: allUrl + '/rfs/chunkUpload',
            type: 'POST',
            cache: false,
            data: formData,
            processData: false, // 不处理数据
            contentType: false, // 不设置内容类型
            xhr: ()=> {
              // 获取ajax中的ajaxSettings的xhr对象  为他的upload属性绑定progress事件的处理函数
              var myXhr = $.ajaxSettings.xhr();
              if (myXhr.upload) {
                //检查其属性upload是否存在
                myXhr.upload.addEventListener("progress", (e)=>{
                  // 更新进度条
                  let curPercent = e.loaded/e.total * 100
                  let progress = 0

                  if(file.chunkSize>1){
                    let idx = this.tableData.findIndex(v=> v.id === file.id)
                    if(idx<0) return
                    this.tableData[idx].progressChunk[p.index] = curPercent
                    this.tableData[idx].progressChunk.forEach(m=>{
                      progress += (m||0)
                    })
                    progress = progress/file.chunkSize
                  } else {
                    progress = curPercent
                  }

                  progress = Math.ceil(progress)

                  let pro = progress > 98 ? 99 : progress // 文件插入成功之后展示100%上传成功
                  this.updateTable(file.id, [{key: 'progress', value: pro}])


                }, false);
              }
              return myXhr;
            },
            success:  (res)=> {
              console.log('res', res)
              if(res.code !==0) {
                reject()
                return
              }

              res.data ? resolve({r: true, uploadId: file.uploadId}) : reject()
            },
            error:  (err)=> {
              console.log(err, err.message)
              reject('Network Error')
            }

          })
        })
      },

      handleMinilize(){
        this.mini = true
        $('.table-wrap').css({height: '50px'})
      },

      handleOpen(){
        this.mini = false
        $('.table-wrap').css({height: '400px'})
      },

      handleClose(){
        this.tableData = [];
        this.uploadList = []; // 待上传的文件
        this.uploadedList = [] // 已上传过的文件（成功和失败）
        this.showList = false
        this.mini = false
        this.fileIdNum = 500
        this.uploadStage = 0
        this.$store.commit('setUploadStatus', false)
        this.$store.commit('closeUploadDialog', false)
        window.Netchecking = false
        this.checkingNet = false
      },

      deleteDoc(fileId) {
        // 判断删除的是否为当前正在上传的文件
        let isCurrent = this.uploadList.length && fileId === this.uploadList[0].id
        let tableIdx = this.tableData.findIndex(v=>v.id===fileId)
        this.tableData.splice(tableIdx, 1) // 删除table中数据
        let uploadIdx = this.uploadList.findIndex(v=>v.id===fileId)
        this.uploadList.splice(uploadIdx, 1) // 删除上传队列中响应的数据

        // 如果传入列表已无钥要上传的文件，则全部上传完成
        if(!this.uploadList.length){
          this.$emit('complete')
          return
        }
        // 删除的不是当前正在上传的文件，继续上传当前文件，return
        if(!isCurrent) return

        // 删除了正在上传的文件，上传下一个
        this.uploadStage = 0
        this.uploadSingleFile()
      },

      isFileDeleted(fileId) {
        return this.tableData.findIndex(v=>v.id === fileId)<0
      },

      uploadComplete(val){
        if(val<=0 || this.uploadList.length>0) return
        let successList = this.uploadedList.filter(v=>v!=='error')

        if(successList.length === this.uploadedList.length) {
          this.$message.success('文件上传成功')
          this.tableData.findIndex(v=> v.state === '上传失败')<0 && this.handleClose()
        } else if(successList.length === 0){
          this.$message.error('文件上传失败，请检查网络，或选择重新上传')
        } else {
          this.$message.warning('部分文件上传失败，请检查网络，或选择重新上传')
        }

        this.uploadedList = [] // 将已上传完成的文件list清空
      },

      hashFileAllChunks(file, callBack) {
        let that = this
        let blobArr = []
        if (window.FileReader) {
          let fileHash = () => {
            return new Promise((resolve, reject) => {
              let chunkSize = that.chunkSize,
                chunks = Math.ceil(file.size / chunkSize),
                currentChunk = 0,
                fileReader = new FileReader();
              // 储存所有文件片及相对应的hashcode
              let chunksArr = []

              fileReader.onload = (e) => {
                let spark = new SparkMD5.ArrayBuffer()
                // 首先拼接文件属性
                // spark.append(file.name + file.size + file.lastModified);
                // spark.append(file.name + file.size + file.lastModified);
                // 拼接 array buffer
                let blob = e.target.result
                spark.append(blob)

                chunksArr.push({
                  hashCode: spark.end(),
                  blob: blob,
                  size: blob.byteLength
                })

                currentChunk++;

                if (currentChunk < chunks) {
                  loadNext();
                } else {
                  resolve(chunksArr);
                }
              };

              fileReader.onerror = () => {
                //读取文件发生错误的处理
              };


              let loadNext = () => {

                let start = currentChunk * chunkSize,
                  end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

                let blob = that.blobSlice(file, start, end)
                blobArr.push(blob)

                fileReader.readAsArrayBuffer(blob);
              };

              loadNext();
            })
          };

          fileHash().then((result) => {
            let r = []
            result.forEach((v,idx)=>{
              r.push({
                hashCode: v.hashCode,
                blob: blobArr[idx],
                size: v.size,
                index: idx
              })
            })
            callBack(r);
          });
        } else {
          //对于低版本浏览器的处理
          // this.unsupportBrowserHandler();
        }
      },

      blobSlice(file, start, end) {
        let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
        return blobSlice.call(file, start, end);
      },

              //  判断用户是否有权限进行某一操作
      async canOperating(param, flag) {
            if (this.publicData.projectCreatBy == this.userId) {
                return true;
            } else {
                if (!param) {
                    return;
                }
                // this.queryPersonPower();
                var _this = this;
                var send_data = {
                    token: this.token,
                    userId: this.userId,
                    data: {
                        ids: param.docId,
                        key: flag,
                        docSource: 0
                    }
                };
                // send_data.data = $.extend({}, param, send_data.data);
                var data = await _this
                    .$post("/doc/paper/validateFilePermByUserId", send_data)
                    .then((response)=> {
                        if (_this.success_code == response.code) {
                            // var data = JSON.parse(response.data.permsType);
                            if (!response.data) {
                                _this.$message({
                                    message: "您没有该操作权限，请联系项目管理人员配置权限",
                                    type: "error"
                                });
                                return false;
                            } else {
                                return true;
                            }
                        } else {
                            _this.$message({
                                message: "您没有该操作权限，请联系项目管理人员配置权限",
                                type: "error"
                            });
                            return false;
                        }
                    })
                    .catch(function (error) {

                    });
            }
            return data;
        },


    },
    watch:{
      uploadedNo(val){
        this.uploadComplete(val)

      },
      isCloseUploadDialog(val){
        if(!val) return
        this.handleClose()
      },
      uploadNo(val){
        if(val===0) { // 如果上传列表为空
          this.$store.commit('setUploadStatus', false)
        }
      }
    }

  }
</script>
<style>
.rduploaderdialoginfo .rduploader.dialogStyle{
  z-index: 99999999999 !important;
}
  .rduploaderdialog{
    margin-top: 0;
  }
  .rduploader.dialogStyle{
      top: auto;
      left: auto;
    /*width: 800px;*/
    /*height: 400px;*/
  }

  .rduploader.dialogStyle .el-dialog{
    margin: 0;
    width: 100%;
    box-shadow: none;
  }
  .rduploader.dialogStyle .el-dialog .el-dialog__header{
    padding: 0;
    height: 0;
    border: 0;
  }
  .rduploader.dialogStyle .el-dialog .el-dialog__body{
    padding: 0;
  }
</style>

<style scoped lang="scss" type="text/css">
.rename-select-box{
   .el-dialog__body{
     text-align: center;
   }
}
  .text-left{
    text-align: left;
  }
  .tansfer-list-wrap {
    position: fixed;
    right: 0;
    bottom: 0;

    /*overflow: auto;*/
    /*margin: 0;*/
    z-index: 9999;
    /*display: flex;*/
    /*align-items: center;*/
    /*justify-content: center;*/
  }
  .transfer-title{
    font-size: 18px;
  }

  .transfer-header{
    position: relative;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
  }
  .operate-btn{
    position: absolute;
    right: 20px;
  }
  .operate-btn>i:hover{
    color: #5cb6ff;
  }
  .operate-btn>.el-icon-close{
    margin-left: 8px;
  }
  .table-wrap {
    width: 800px;
    height: 400px;
    transition: height .3s ease;
  }
  .file-icon{
    display: inline-block;
    width: 23px;
    height: 27px;
    margin-right: 5px;
  }
  .upload_fileName{
    display: flex;
    align-items: center;
  }
  .file-name{
    width: 280px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .upload-state-text.success{
    color: #67C23A;
  }
  .upload-state-text.error{
    color: #F56C6C;
  }




</style>
