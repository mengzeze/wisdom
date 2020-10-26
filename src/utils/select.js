import store from '@/store/index'
import { post } from '@/api/axios'
import { Message } from 'element-ui'

export default {
  // 文件需要存储的字段
  fileFields: ['id', 'docId', 'parentId', 'rfsId', 'docName', 'createBy',
  'docType', 'docSize', 'delAllow', 'lockState',
  'isLink', 'auditStatus', 'type', 'isCheck', 'projectId',
    'docSource', 'auditProjectId', 'docVersionNumber', 'parentName', 'auditStatusText'],
  // 目录需要存储的文件
  dirFields: ['id', 'parentId', 'rfsId','docName', 'createBy', 'docType', 'delAllow',
  'lockState', 'isLink', 'auditStatus', 'type', 'isCheck', 'docVersionNumber', 'quoteId',
  'parentName', 'auditStatusText'],

  /**
   * el-table 单条勾选事件：勾选、取消勾选
   * @param {*} type   1：项目文档；2：底稿管理；3：文件审批-项目文档；4：文件审批-底稿
   * @param {*} projectId 项目id, 请求接口数据
   * @param {*} id 存储数据的唯一标识：项目文档和底稿均为projectId, 文件审批为审批id
   * @param {*} selection table中所有选中的数据
   * @param {*} row 当前点击触发的数据
   */
  fileSelect(type, projectId, id, selection, row, displayCb){
    //区分勾选和取消勾选
    let selected = selection.length && selection.indexOf(row) !== -1

    if(!selected){ // 取消勾选
      this.handleCancel(type, projectId, id, [row], displayCb)
      return
    }
    // 勾选，走勾选逻辑
    this.handleFileSelect(type, projectId, id, [row], displayCb)

  },

  /**
   * 根据目录id查询目录下所有的文件
   * @param {*} type  1：项目文档；2：底稿管理；3：文件审批-项目文档；4：文件审批-底稿
   * @param {*} projectId 项目id, 请求接口数据
   * @param {*} dir 要查询的目录id集合，数组类型
   * @returns promise 查询到的文件数据
   */
  getFileByDirId(type, projectId, dir, approvalId){
    return new Promise((reslove, reject)=>{
      if(!dir.length){
        reslove([])
        return
      }
      let isApprove = (type === 3 || type === 4)
      let urlType = (type===1 || type===3) ? 'project' : 'paper'
      let url = ''
      let data = {}
      if(type ===5 ){
        url = '/info/audit/queryPendingDirForDir'
        data = {
          parentIdList: dir,
          approvalId: approvalId
        }

      }else if(isApprove) {
        url = '/info/audit/queryPendingForDir'
        data = {
          parentIdList: dir,
          approvalId: approvalId
        }

      } else {
        url = `/doc/${urlType}/queryDirForDoc`
        data = {
          proFileDirIds: dir
        }        
      }
      
      post(url,{projectId,data:data}).then(res=>{
        if(res.code!==0){
          reject()
          return
        }
        let fileList = res.data.content || []
        if(!fileList.length) {
          reslove([])
        } else {
          this.updateFileStatus(type, projectId, fileList, approvalId).then(updatedList=>{
            reslove(updatedList)
          })
        }
      })
    })
  },

    /**
   * 根据目录id查询目录下所有的文件
   * @param {*} type  1：项目文档；2：底稿管理；3：文件审批-项目文档；4：文件审批-底稿
   * @param {*} projectId 项目id, 请求接口数据
   * @param {*} ids 要查询的目录id集合，数组类型
   * @returns promise 查询到的文件数据
   */
  getParentById(type, projectId, ids){
    return new Promise((reslove, reject)=>{
      let urlType = (type===1 || type===3) ? 'project' : 'paper'
      post(`/doc/${urlType}/queryParentIds`,{projectId,data:{ids}}).then(res=>{
        if(res.code!==0){
          reject()
          return
        }
        reslove(res.data)
      })
    })
  },


  /**
   * 处理选中的数据: 将选中的数据存入store中。
   * 如果是文件直接存入，
   * 如果是目录，则先获取目录下所有的文件，再将获取到的文件存入store
   * 同时还要将手动选择的目录存入store
   * @param {*} type   1：项目文档；2：底稿管理；3：文件审批-项目文档；4：文件审批-底稿
   * @param {*} projectId 项目id, 请求接口数据
   * @param {*} id 存储数据的唯一标识：项目文档和底稿均为projectId, 文件审批为审批id
   * @param {*} selection table中所有选中的数据
   */
  handleFileSelect(type, projectId, id, selection, cb){
  
    let file = [] // 文件
    let dir=[] //手动选择的目录
    let childrenDir = [] // 被动选择子目录
    let queryDir = [] // 非空目录，需要请求目录下的文件 
    let manaullyFile = [] // 手动选择的文件（对文件夹进行操作时使用）

    // 区分选择的是文件还是文件夹
    selection.forEach(v=>{
      if (v.docType === 0) {
        file.push(v)
        manaullyFile.push(v)
        return
      }
      // 记录手动选择的目录
      type === 5 && childrenDir.push(v)

      // 存储文件夹信息
      dir.push(v)
      // 如果文件夹数量不为空，记录
      v.fileSum && queryDir.push(v.id)
    })

    if (type === 5) {
      this.handleDataBeforeCommit(type, id, dir, file, manaullyFile)
      // store.commit('setSelection', { type, id, dir, file, manaullyFile,})
      return
    }


    //如果选择的数据中没有目录，直接将文件存入store
    if (!dir.length) {
      this.handleDataBeforeCommit(type, id, dir, file, manaullyFile, childrenDir)
      // store.commit('setSelection', { type, id, dir, file, manaullyFile, childrenDir})

      cb && cb()
      
      // cb && this.getParentById(type, projectId, file.map(f=>f.id)).then(pidData=>{
      //   let pids = []
      //   pidData.forEach(r => {
      //     pids = [...pids, ...r.parentIdList]
      //   })
      //   cb([...new Set(pids)], true)
      // })
      return
    }

    // 如果有目录，获取目录下所有的文件，再存入store
    // 底稿管理特殊，需要过滤空文件夹
    let paramsId = type === 2 ? queryDir : dir.map(v=>v.id)
    this.getFileByDirId(type, projectId, paramsId, id).then(data=>{
      if(type!==5){
        // 直接选中的文件 + 目录下获取的文件
        file= file.concat(data)
        // 如果有手动选择了其子文文件，删除手动选择的子文件
        let storedManaullyFile = this.getSelectedData(type, id).manaullyFile
        if (storedManaullyFile.length){
          let deleted = data.map(v => {
            let idx = storedManaullyFile.findIndex(m => m.id === v.id)
            if (idx > -1) {
              return storedManaullyFile[idx].id
            }
          })
          // 删除手动选择的子文件
          deleted.length && store.commit('deleteManaullyFile', { type, id, deleted })
        }
      } else {
         // 处理目录审批
         childrenDir = [...childrenDir, ...data]
        let storedDir = this.getSelectedData(type, id).dir
        if (storedDir.length){
          let deleted = data.map(v => {
            let idx = storedDir.findIndex(m => m.id === v.id)
            if (idx > -1) {
              return storedDir[idx].id
            }
          })
          // 删除手动选择的子文件
          deleted.length && store.commit('deleteManaullyFile', { type, id, deleted })
        }
      }

      // 存储选中的文件
      this.handleDataBeforeCommit(type, id, dir, file, manaullyFile, childrenDir)
      // store.commit('setSelection', { type, id, dir, file, manaullyFile, childrenDir})
      cb && cb()

  
      // cb && cb(data.map(v=>v.id), true)
      
    })
  },

  queryFileStatus(type, projectId, idSet){
    return new Promise((reslove, reject) => {
      let urlType = (type === 1 || type === 3) ? 'project' : 'paper'
      post(`/doc/${urlType}/docStatusAll`, { projectId, data: { projectId, idSet} }).then(res => {
        if(res.code===0){
          reslove(res.data)
        }
      })
    })
  },

  /**
   * 处理取消选中。将要取消的数据从store中移除
   * 如果是文件直接移除
   * 如果是目录，则先获取目录下所有的文件，再将获取到的文件移除
   * 同时还要将手动选择的目录移除
   * 判断取消勾选的数据的父及是否被选中，如果选中也要移除
   * 
   * @param {*} type   1：项目文档；2：底稿管理；3：文件审批-项目文档；4：文件审批-底稿
   * @param {*} projectId 项目id, 请求接口数据
   * @param {*} id 存储数据的唯一标识：项目文档和底稿均为projectId, 文件审批为审批id
   * @param {*} cancelData 取消选中的数据
   */
  handleCancel(type,projectId, id,cancelData, cb){

    let file = [] // 记录要取消的文件id
    let dir = [] //记录要取消的目录id

    cancelData.forEach(v=>{
      v.docType === 0 ? file.push(v.id) : dir.push(v.id)
    })
    // 如果是目录
    if(type===5){
      let allDirs = this.getSelectedData(type, id).childrenDir
      let fn=(pidArr)=>{

        let c = allDirs.filter(v=>pidArr.indexOf(v.parentId)>-1)
        if(c.length) {
          let cid = c.map(v=>v.id)
          dir = [...dir, ...cid]
          fn(cid)
        }
      }
      fn(dir)
      store.commit('cancelSelection',{type,id,file,dir})
      return
    }
    // 直接移除
    store.commit('cancelSelection',{type,id,file,dir})

    // 如果取消的是文件夹，需要把之前存的文件夹下的所有文件都取消了
    if(dir.length){
      this.removeFileByDir(type, projectId, id, dir).then(deletedData => {
        let { dFile, dDir } = deletedData
        store.commit('cancelSelection', { type, id, file: dFile, dir: dDir })
        cb && cb()
      })

    }

    // 再次查询dir
    let storeDirUpdated = this.getSelectedData(type, id).dir

    // 取消关联的父及目录
    // 如果没有记录选中的目录
    // if(!storeDirUpdated.length) {
    //   cb && cb()
    //   return
    // }

    // 查询文件的所有父及目录
    this.getParentById(type, projectId,file.concat(dir) ).then(data=>{
      let cancelDir = []
      data.forEach(r=>{
        let idx = storeDirUpdated.findIndex(v=>r.parentIdList.indexOf(v.id)>-1)
        idx>-1 && cancelDir.push(storeDirUpdated[idx].id)
      })
      // 可能会有多个需要移除的父及目录
      if (cancelDir.length) {
        store.commit('cancelSelection', { type, id, file: [], dir: cancelDir })
      }
      cb && cb()
    })
  },

  /**
   * 取消选择
   * @param {*} type  数字类型。 1：项目文档；2：底稿管理；3：文件审批-项目文档；4：文件审批-底稿
   * @param {*} id 存储数据的唯一标识：项目文档和底稿均为projectId, 文件审批为审批id
   */
  clearSelection(type, id){
    store.commit('clearSelection', { type, id })
  },

  // 取消选择目录，获取 除 取消选择的目录及子目录外的所有目录
  getAllDirLine(type, projectId, deletedDir){
    return new Promise((reslove, reject)=>{
      // 如果table中有目录，先获取组织架构树目录
      let urlType = (type === 1 || type === 3) ? 'project' : 'paper'
      post(`/doc/${urlType}/queryDirTree`, { projectId: projectId }).then(res => {
        if (res.code !== 0) {
          reject()
          return
        }
        if (!res.data || !res.data.length) return
        let tree = res.data

        let dirs = []
        let treeToLine = (tree) => {
          tree.forEach(v => {
            if (deletedDir.indexOf(v.id)<0){
              dirs.push(v.id)
              v.children && v.children.length && treeToLine(v.children)
            }
          });
        }
        treeToLine(tree)
        reslove(dirs)
      })
    })
  },

  removeFileByDir(type, projectId, id, deletedDir) {
    return new Promise((reslove, reject)=>{
      this.getAllDirLine(type, projectId, deletedDir).then(res => {
        let dirs = res
        // 去掉本次删除的目录id
        dirs = dirs.filter(v => deletedDir.indexOf(v)<0)
        let storeData = this.getSelectedData(type, id)
        let storeFile = storeData.file
        let storeDir = storeData.dir
        if (!storeFile.length && !storeDir.length) return
        let dFile = []
        let dDir = []
        for (let v of storeFile) {
          dirs.indexOf(v.parentId) < 0 && dFile.push(v.id)
        }
        for (let v of storeDir) {
          dirs.indexOf(v.id) < 0 && dDir.push(v.id)
        }
        reslove({ dFile, dDir })
      })
    })

  },


  /**
   * 回显已选中的数据。
   * @param {*} type   1：项目文档；2：底稿管理；3：文件审批-项目文档；4：文件审批-底稿
   * @param {*} projectId 项目id, 请求接口数据
   * @param {*} id 存储数据的唯一标识：项目文档和底稿均为projectId, 文件审批为审批id
   * @param {*} tableData 列表中的全部数据
   * @returns promise 返回需要勾选id
   */
  handleDisplaySelection(type,projectId, id, tableData, isSearch){
    let a = projectId
    let b= id
    let c = tableData.length

    return new Promise((reslove, reject)=>{
      // 根据type和id取出store中的值
      let storeFile = this.getSelectedData(type, id).file
      let storeDir = this.getSelectedData(type, id).dir

      // 更新选中数据的数量
      store.commit('setSelectedNum', type===5 ? storeDir.length : storeFile.length)

      // 尚未选中数据: 没有选中的文件也没有选中的目录（考虑选择的全是空文件夹的情况）
      if(!storeFile.length && !storeDir.length){
        reslove([])
        return
      }
      // 没有选中的文件，但是有选中的目录
      // if(!storeFile.length && storeDir.length){
      //   let selected = []
      //   tableData.forEach(t=>{
      //     storeDir.findIndex(i=>i.id===t.id) >-1  && selected.push(t.id)  
      //   })
      //   reslove(selected)
      //   return
      // }

      // 小优化：如果tableData全部是文件，就没有必要查询目录树了
      if(tableData.findIndex(v=>v.docType===1)===-1){
        let selected = []
        tableData.forEach(t=>{
          storeFile.findIndex(i=>i.id===t.id) >-1  && selected.push(t.id)  
        })
        reslove(selected)
        return
      }
      // 如果table中有目录，先获取组织架构树目录
      let urlType = (type===1 || type===3) ? 'project' : 'paper'
      post(`/doc/${urlType}/queryDirTree`,{projectId:projectId, istest: true}).then(res=>{
        if(res.code!==0){
          reject()
          return
        }
        if(!res.data || !res.data.length) return
        let tree = res.data
        let dirs=[]
        let treeToLine = (tree,ids)=>{
          tree.forEach(v => {
            let t = [v.id,...ids]
            v.children && v.children.length ?  treeToLine(v.children, t) : dirs.push(t)
          });
        }

        treeToLine(tree,[])
        // 计算应该勾选的项
        let selected = []
        for (let v of tableData) {
          if(v.docType===0){ // 如果是文件直接放入选中列表中
            storeFile.findIndex(i=>i.id===v.id) >-1  && selected.push(v.id)
          }else{ // 如果是目录需要判断其子文件有没有被选中的
             // 注意空目录--和存储的目录对比
            if(storeDir.findIndex(i=>i.id === v.id) >-1){
              selected.push(v.id)
              continue;
            }

            // 判断其父目录或子目录是否有选中的
            let isFatherSelected = false
            for (let item of storeDir) {
              if(type!==5 || isSearch) {
                if (item.id > v.id) {
                  continue;
                }
              }

              
              if (dirs.findIndex(n => n.indexOf(v.id) > -1 && n.indexOf(item.id) > -1) > -1) {
                isFatherSelected = true
                selected.push(v.id)
                break;
              }
            }

            // 如果父文件夹有被选中的，储存选中状态，进行下一次循环
            if (isFatherSelected) {
              continue;
            }

            // 如果父文件夹没有被选中的，判断子文件是否有被选中的
            for (let item of storeFile) {
              if(item.parentId<v.id){
                continue;
              }

              if(dirs.findIndex(n=>n.indexOf(v.id)>-1 && n.indexOf(item.parentId)>-1)>-1) {
                selected.push(v.id)
                break;
              }
            }
          }       
        }


        reslove(selected)
    
      },err=>{
        reject()
      })

    })
  },

  /**
   * 获取选中的数据
   * @param {*} type   1：项目文档；2：底稿管理；3：文件审批-项目文档；4：文件审批-底稿
   * @param {*} id 存储数据的唯一标识：项目文档和底稿均为projectId, 文件审批为审批id
   * @returns 返回储存的数据{id, file, dir} || undefind
   */
  getSelectedData(type,id){
    // 根据type和id取出store中的值
    let curStoreData = []
    switch(type){
      case 1: // 项目文档
        curStoreData = store.state.selectionProjectDoc
         break;
      case 2: // 底稿管理
        curStoreData = store.state.selectionPaper
        break;
      case 3: // 文件审批-项目文档
        curStoreData = store.state.selectionApproveDoc
        break;
      case 4: // 文件审批-底稿管理
        curStoreData = store.state.selectionApprovePaper
        break;
      case 5: // 文件审批-目录审批
        curStoreData = store.state.selectionApproveDir
        break;
    }
    let selectedData=curStoreData.find(v=>v.id===id)

    let file = selectedData ? selectedData.file : []
    let dir = selectedData ? selectedData.dir : []
    let manaullyFile = selectedData ? selectedData.manaullyFile : []
    let childrenDir = selectedData ? selectedData.childrenDir : []

    return { file, dir, manaullyFile, childrenDir }
    
  },

  // 更新文件状态
  updateFileStatus(type, projectId, fileList){
    return new Promise((reslove, reject)=>{
      this.queryFileStatus(type, projectId, fileList.map(v => v.id)).then(statusData => {
        fileList.map(item => {
          for (let key in statusData) {
            if (item.id == key) {
              for (let status in statusData[key]) {
                if (!((type === 3 || type === 4) && status ==='auditStatus')){
                  item[status] = statusData[key][status]
                }
              }
            }
          }
        })
        reslove(fileList)
      })
    })
  },

  /**
   * 更新缓存数据
   * @param {*} type   1：项目文档；2：底稿管理；3：文件审批-项目文档；4：文件审批-底稿
   * @param {*} projectId 项目id, 请求接口数据
   * @param {*} id 存储数据的唯一标识：项目文档和底稿均为projectId, 文件审批为审批idt
   */
  updateStatus(type, projectId, id) {

    let list = this.getSelectedData(type, id).file
    if(!list.length) return

    this.queryFileStatus(type, projectId, list.map(v => v.id)).then(updated=> {
      updated && store.commit("updateStatus", { type, id, updated})
    })

  },
  /**
   * 处理要缓存的数据：只存储有需要的字段（fileFields，dirFields）
   * @param {*} type   1：项目文档；2：底稿管理；3：文件审批-项目文档；4：文件审批-底稿
   * @param {*} id 存储数据的唯一标识：项目文档和底稿均为projectId, 文件审批为审批idt
   * @param {*} dirData 
   * @param {*} fileData 
   * @param {*} manaullyFileData 
   * @param {*} childrenDirData 
   */
  handleDataBeforeCommit(type, id, dirData, fileData, manaullyFileData, childrenDirData) { 
    let dir = dirData ? this.filterFields('dir', dirData):[]
    let file = fileData ? this.filterFields('file', fileData):[]
    let manaullyFile = manaullyFileData ? this.filterFields('file', manaullyFileData):[]
    let childrenDir = childrenDirData ? this.filterFields('dir', childrenDirData):[]
    store.commit('setSelection', { type, id, dir, file, manaullyFile, childrenDir})

  },
  /**
   * 过滤字段
   * @param {*} flag  数据标识（file 文件， dir 目录）
   * @param {*} allData 要处理的 数据列表（全部字段）
   * @returns 数据列表（只包含需要存储的字段）
   */
  filterFields(flag, allData) {
    let data = []
    let fileds = flag === 'file' ? this.fileFields : this.dirFields
    data = allData.map(v => { 
      let obj = {}
      fileds.forEach(k => { 
        obj[k]=v[k]
      })
      return obj
    })
    return data
   }

}