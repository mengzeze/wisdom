<template>
  <div class="rduploaderdialoginfo">
    <input v-if="browserType!=='火狐'"  ref="rd_upload" type="file" @change="handleChange" :multiple="multiple" :accept="accept" style="display:none;"></input>
    <input v-else ref="rd_upload" type="file" @change="handleChange" :multiple="multiple" style="display:none;"></input>

    <el-dialog
      title=""
      id="rduploaderdialog"
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
          <el-table-column prop="state" label="状态" width="100">
            <template slot-scope="scope">
              <span class="upload-state-text" :class="{'success': scope.row.state==='上传成功', 'error': scope.row.state==='上传失败'}">{{scope.row.state}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="progress" label="进度条" width="150">
            <template slot-scope="scope">
              <el-progress v-if="scope.row.state==='上传成功'" :percentage="scope.row.progress" status="success"></el-progress>
              <el-progress v-else-if="scope.row.state==='上传失败'" :percentage="scope.row.progress" status="exception"></el-progress>
              <el-progress v-else :percentage="scope.row.progress"></el-progress>
            </template>
          </el-table-column>
          <el-table-column label="操作" show-overflow-tooltip>
            <template slot-scope="scope" v-if="scope.row.state !== '上传成功'">
              <el-button @click="deleteDoc(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-dialog>

  </div>
</template>

<script>
  const exclude = ['exe', 'jsp', 'html', 'htm','php', 'asp', 'js', 'aspx', 'chm']
  import SparkMD5 from 'spark-md5'
  import axios from 'axios'
  export default {
    name: "RdUploader",
    data() {
      return{
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
        rduploaderdialog: 'rduploaderdialog',
        isOnLine: true,
        timer: null,
        checkingNet: false,
        curChunkIdx: 0, // 当前上传的块下标
        uploadId: '', // init 返回的uploadId
        uploadStage: 0, // 上传的阶段：1：初始化完成，切块完成；2: 块验证和上传中；3: 块上传完成，待insert; 4:insert完成
        resData:{}, // 上传成功的数据
        uploadChunkData:{}

      }
    },
    props: ['transfer'],
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
       * 处理选择的文件
       */
      handleChange() {

        // 获取选中的文件对象
        let files = this.$refs['rd_upload'].files

        for(var i=0; i< files.length; i++){
          let hzIdx = files[i].name.lastIndexOf(".")
          let hz_name = ''
          hzIdx >0 && (hz_name = files[i].name.substring(hzIdx+1).toLowerCase());
          if(hzIdx<0 || exclude.indexOf(hz_name)>-1) { // 如果没有后缀名或
            this.$message.error('不支持该类型文件上传，请重新选择')
          } else {
            // 给文件添加id
            let fileName = files[i].name
            files[i].id = this.fileIdNum
            files[i].docType = fileName.substring(fileName.lastIndexOf(".")+1).toLowerCase()
            this.isVersion && (files[i].isVersion = true)
            files[i].data = this.$utils.copyObj(this.uploadParamData)
            files[i].fileName = fileName


            this.uploadList.push(files[i]) // 添加到文件上传队列中
            this.tableData.push({ // 添加表格数据
              id: files[i].id,
              name: fileName,
              docName: fileName,
              size: this.$utils.handleFileSize(files[i].size),
              state: '等待上传',
              progress: files[i].percent || 0,
              progressChunk: [],
              status: '',
              fileIcon: this.$utils.iconFilter(fileName),
              file: '',
            })
            this.fileIdNum++
          }
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
        let el = Array.from(document.querySelectorAll('#rduploaderdialog > .el-dialog'))
        if(!el || !el.length) return
        el.forEach(v=>{
          v.style.marginTop = 0
        })
      },



      uploadSingleFile(){
        // 上传文件，从头到尾逐一上传，上传成功shift上传队列
        let file = this.uploadList[0]
        //存储文件块信息
        file.fileChunkList = []

        this.updateTable(file.id, [{key: 'state', value: '初始化中'}])

        this.$post('/rfs/initUpload').then(res=>{

          // 判断当前文件是否已被删除
          if(!this.checkCurFileExist(file,'uploadSingleFile')) return;

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

          // 文件切片上传
          // this.handleSliceFileData()
          this.handleFileSlice(0)

        }, err=>{
          this.handleUploadError(file.id, err)
        })
      },

      handleFileSlice(chunkIdx){
        let file = this.uploadList[0]

        // 判断当前文件是否已被删除
        if(!this.checkCurFileExist(file, 'handleFileSlice')) return;

        this.curChunkIdx = chunkIdx

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
          this.checkChunkExist(chunkIdx)
        };

        fileReader.onerror = () => {
          //读取文件发生错误的处理
          this.handleUploadError(file.id)
        };
      },



      // 文件切片
      handleSliceFileData(){
        let file = this.uploadList[0]
        file.uploadId = this.uploadId
        file.rfsId = this.uploadId
        this.hashFileAllChunks(file,res=>{
          // 判断当前文件是否已被删除
          if(!this.checkCurFileExist(file,'handleSliceFileData')) return

          // 储存文件片段
          let fileChunkList = res
          // 初始化进度条
          let tableIdx = this.tableData.findIndex(t=>t.id===file.id)
          fileChunkList.forEach(c=>{
            this.tableData[tableIdx].progressChunk[c.index] = 0
          })

          file.chunkSize = fileChunkList.length
          file.fileChunkList = fileChunkList

          // 验证文件是否存在，从第0块开始
          this.checkChunkExist(0)

        })
      },

      checkChunkExist(chunkIdx){
        let file = this.uploadList[0]
        // 判断当前文件是否已被删除
        if(!this.checkCurFileExist(file, 'handleFileSlice')) return;
        this.uploadStage = 1
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
          if(!this.checkCurFileExist(file,'checkChunkExistPromise')) return;

          if(!res.r){ // 如果不存在，上传文件块
            this.uploadChunkData={
              p:p,
              blob: curChunk.blob,
              file: file,
              idx: idx
            }
            this.uploadChunk(this.uploadChunkData)
          } else if (idx<file.chunkSize-1){ // 已经存在，但不是最后一块, 砌块验证上传下一块
            this.tableData[tableIdx].progressChunk[curChunk.index] = 100
            this.handleFileSlice(idx+1)
            // this.checkChunkExist(file, idx+1)
          } else { // 已存在且是最后一块，可以inset了
            this.tableData[tableIdx].progressChunk[curChunk.index] = 100
            this.handleInsertDoc(file)
          }
        }, err=>{
          this.handleUploadError(file.id, err)
        })
      },

      uploadChunk(uploadChunkData){
        let {p, blob, file, idx} = uploadChunkData
        this.uploadStage = 2
        this.updateTable(file.id, [{key: 'state', value: '正在上传'}])
        this.chunkUploadPromise(p, blob, file).then(res=>{

          if(!this.checkCurFileExist(file,'checkChunkExistPromise')) return;

          if(!res.r){ // 上传失败
            this.handleUploadError(file.id)
            return
          }

          if(idx<file.chunkSize-1){ //还有要上传的块, 继续切块上传
            this.handleFileSlice(idx + 1)
            // this.checkChunkExist(file, idx++)
          } else {
            // 块全部全部上传完毕, insert Doc
            this.handleInsertDoc(file)
          }

        }, err=>{
          this.handleUploadError(file.id, err)
        })

      },
      checkCurFileExist(file, source){
        if(!this.uploadList[0] || (file.id !== this.uploadList[0].id)) { // 如果上传列表为空或者当前上传中的文件被删除
          this.uploadStage = 0
          return false;
        } else { // 继续上传当前文件
          return true;
        }
      },


      handleUploadError(fileId, error) {
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
          }
        }

        let update = [
          {key: 'state', value: '上传失败'},
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
        this.uploadList.length && this.uploadSingleFile()
      },


      handleInsertDoc(file) {
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

        // 判断当前文件是否已被删除
        if(!this.checkCurFileExist(file,'handleInsertDoc')) return;

        axios.post('/doc/insert', arg).then(response => {
          // 判断当前文件是否已被删除
          if(!this.checkCurFileExist(file,'handleInsertDoc2')) return;

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
          fileData: file
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
        // 手动触发已上传文件数量变化函数（如果将上传失败的文件删除了，则展示全部上传成功）
        // 不能再次触发complete
        // this.uploadComplete(this.uploadedNo, onlyToast)

        if(!this.uploadList[0] || !isCurrent) return

        // 上传下一个
        this.uploadStage = 0
        this.uploadSingleFile()
      },

      isFileDeleted(fileId) {
        return this.tableData.filter(v=>v.id === fileId).length<1
      },

      uploadComplete(val){
        if(val<=0 || this.uploadList.length>0) return
        let successList = this.uploadedList.filter(v=>v!=='error')

        if(successList.length === this.uploadedList.length) {
          this.$emit('complete', successList)
          this.$message.success('文件上传成功')
          this.tableData.findIndex(v=> v.state === '上传失败')<0 && this.handleClose()
        } else if(successList.length === 0){
          this.$message.error('文件上传失败，请检查网络，或选择重新上传')
        } else {
          this.$emit('complete', successList)
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
      }


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
      },
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

<style scoped>
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
