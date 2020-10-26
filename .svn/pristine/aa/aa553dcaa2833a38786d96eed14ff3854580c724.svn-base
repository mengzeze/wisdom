<template>
    <div class="doc-relation batch-edit-index">
      <el-dialog title="批量编辑关联" :close-on-click-modal="false" :visible="docRelationIsShow" @close="clickEvent" width="60%">
            <div class="doc-relation-con clearfix">
                <div class="content-l">
                    <p class="doc-relation-title">选择要创建关联的文件</p>
                    <div class="search-box" v-on:keyup.enter="treeSearchFn(1)">
                        <el-input @input="searchValue(1)" v-model="searchProDoCatalog" placeholder="请输入关键词搜索" clearable prefix-icon="search" height="30">
                            <el-button slot="append"  @click="treeSearchFn(1)" @keyup.native.enter="treeSearchFn(1)" icon="el-icon-search"></el-button>
                        </el-input>
                    </div>
                    <div class="tree-box">
                        <el-tree
                            :data="data"
                            :props="leftTreeProps" ref="leftTree" lazy :load="leftTreeLoadNode" node-key="id" check-strictly
                            :expand-on-click-node="false" @check-change="selectChange" show-checkbox >
                            <div class="tree-node" slot-scope="{node, data}" :title="data.docName">
                                <p :class="{'paper_index_name_die':data.isLinkDelete == 1}">{{data.docName}}</p>
                            </div>
                        </el-tree>
                    </div>                    
                </div>
                <div class="content-c">
                    <p class="content-c-tit">文件</p>
                    <div class="doc-list" v-for="(item, index) in selectedDocList" :key="index" @click="seeFj(item)">
                        <i></i>
                        <p>{{item.docName}}</p>
                    </div>                   
                </div>
                <div class="content-r">
                    <p class="doc-relation-title">选择要关联的目标文件</p>
                    <div class="search-box" v-on:keyup.enter="treeSearchFn(2)">
                        <el-input @input="searchValue(2)" v-model="searchDraftCatalog" placeholder="请输入关键词搜索" clearable prefix-icon="search" height="30">
                            <el-button slot="append" @click="treeSearchFn(2)" @keyup.native.enter="treeSearchFn(2)"  icon="el-icon-search"></el-button>
                        </el-input>
                    </div>
                    <div class="tree-box">
                        <el-tree
                            :data="datainfo"
                            :props="rightTreeProps" ref="rightTree" lazy :load="rightTreeLoadNode" node-key="id" check-strictly
                            :expand-on-click-node="false" @check-change="selectChangeR" show-checkbox >
                            <div class="tree-node" slot-scope="{node,data}" :title="data.docName">
                                <span>
                                    <i :class="node.icon"></i>
                                </span> 
                                <p :class="{'paper_index_name_die':data.isLinkDelete == 1}">{{data.docName}}</p>
                            </div>
                        </el-tree>
                    </div>                   
                </div>               
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="medium" @click="clickEvent">取 消</el-button>
                <el-button size="medium" type="primary" @click="submitIndex">确 定</el-button>
            </div>
      </el-dialog>
    </div>
</template>

<script>

export default {
    name: 'batchEditIndex',
    props: ['docRelationIsShow','projectId'],
    data () {
        return {
            token:"",
            userId:'',
            success_code: "",
            data:[],
            datainfo:[],
            docParentId: 0,//查询项目文档时的parentId
            allDocInitList: [],
            draftDocList: [],//底稿文档
            searchProDoCatalog: '',//搜索项目文档目录
            searchDraftCatalog: '',//搜索底稿文档目录
            selectedDocList: [],//选中的项目文档的集合
            selectedDocListId: [],//选中的项目文档ID的集合
            selecteddraftList: [],//选中的目录集合
            selectOrg: {
                orgsid: []
            },
            leftTreeProps: {
                label: 'docName',
                children: 'child',
                // isLeaf: 'leaf'
                isLeaf: 'leaf'
            },
            rightTreeProps: {
                label: 'docName',
                children: 'child',
                // isLeaf: 'leaf'
                isLeaf: 'leaf'
            },
            node: {childNodes: []},
            resolve: '',
            isFirst: true,
            rightNode: {childNodes: []},
            rightResolve: '',
            rightIsFirst: true
        }
    },
    created(){
        
    },
    mounted(){
        
        this.token = this.$store.state.loginObject.userToken;
        this.userId = this.$store.state.loginObject.userId;
        this.success_code = this.code.codeNum.SUCCESS;
        // this.treeQueryDoc(0);
        // this.queryDraftDoc(0);
        
    },
    methods:{ 
        searchValue(item){
           let arr = [{ docName: '底稿文档', id: '0',disabled: true}]
           if(item == 1){
               if(this.searchProDoCatalog == ''){
                   this.data = arr
               }
           }else{
               if(this.searchDraftCatalog == ''){
                   this.datainfo = arr
               }
           }
        },
        treeSearchFn(item){
            var docName = item == 1? this.searchProDoCatalog:this.searchDraftCatalog
            if(docName == ""){
               this.$message.error('请输入关键字')
               return
            }
            var data = {
                token: this.token,
                userId: this.userId,
                "pageNo":0,
                "pageSize":500,
                 data: {
                     docPaperContent:docName,
                     projectId: this.projectId
                }
                };
            this.$post('/doc/paper/query',data).then((res) => {
                if(res.code == 0){
                    let arr = []
                    console.log
                    res.data.content.forEach(element => {
                        if(element.docType == 0){
                            arr.push(element)
                        }
                    });
                    console.log(arr)
                    item == 1? this.data = arr :this.datainfo = arr
                //   this.$message.success(res.msg)
                }else{
                  this.$message.error(res.msg)
                }
            }).catch((error) => {
            })
        },
        leftTreeLoadNode(node, resolve) {
            if (this.isFirst) {
                this.node = node
                this.resolve = resolve
                this.isFirst = false
            }
            if (node.level === 0) {
                this.node.childNodes = [];
                return resolve([{ docName: '底稿文档', id: '0',disabled: true}])               
            } else if(node.data.level === '-1'){
                return resolve([]);
            } else {
                // 这里resolve的数据是后台给的,id用于之后点击发起请求时的参数
                this.queryDraftDoc(node.data.id,resolve);                
            }
        },
        rightTreeLoadNode(node, resolve) {
            if (this.rightIsFirst) {
                this.rightNode = node
                this.rightResolve = resolve
                this.rightIsFirst = false
            }
            if (node.level === 0) {
                this.rightNode.childNodes = [];
                return resolve([{ docName: '底稿文档', id: '0',disabled: true}])               
            } else if(node.data.level === '-1'){
                return resolve([]);
            } else {
                // 这里resolve的数据是后台给的,id用于之后点击发起请求时的参数
                this.queryDraftDoc(node.data.id,resolve);                
            }
        },
        // 获取左侧目录树点击数据
        // handleNodeClick(data) {
        //     this.selectedDocList = data;
        // },   
        //选择左侧底稿目录   
        selectChange(data){ 
            this.selectedDocList = data;         
            this.selectedDocList = this.$refs.leftTree.getCheckedNodes(); 
            this.selectedDocListId = [];   
            for(var i=0;i<this.selectedDocList.length;i++){
                this.selectedDocListId.push(this.selectedDocList[i].id);
            }      
        },
        //选择右侧底稿目录
        selectChangeR(data,checked,indeterminate){
            this.selecteddraftList = this.$refs.rightTree.getCheckedNodes();         
            this.selectOrg.orgsid = [];
            for(var i=0;i<this.selecteddraftList.length;i++){
                this.selectOrg.orgsid.push(this.selecteddraftList[i].id);
                this.selectOrg.parentId = this.selecteddraftList[0].parentId;
            }            
        },
        clickEvent(){     
            this.setTree();      
            this.$refs.leftTree.setCheckedKeys([]);  
            this.$refs.rightTree.setCheckedKeys([]);    
            this.$emit('update:docRelationIsShow',false);
            this.searchProDoCatalog = '';
            this.searchDraftCatalog = '';
        },
        //查询底稿文档
        queryDraftDoc(id,resolve) {
            let vm = this;
            let data = {
                "token": this.token,
                "userId": this.userId,
                "pageNo": "0",
                "pageSize": 5000,
                "data": {
                    "docContent": "",
                    "parentId": id,
                    "projectId": this.projectId
                }
            }
            
            this.$post('/doc/paper/query', data).then((response)=> {
                if(vm.success_code == response.code) {                
                    vm.draftDocList = response.data.content;
                    for(let i = 0;i<vm.draftDocList.length;i++) {
                        if(vm.draftDocList[i].docType == 1){
                            vm.draftDocList[i].disabled = true;
                        } else if(vm.draftDocList[i].isLinkDelete == 1){
                            vm.draftDocList[i].disabled = true;
                        } else {
                            vm.draftDocList[i].disabled = false;
                        }
                    }                  
                    resolve(vm.draftDocList)                                  
                }                        
            }).catch(function(error) {
                
            });
        },
        leftFilterNode(value, data) {
            if (!value) return true;
            return data.docName.indexOf(value) !== -1;
        },
        rightFilterNode(value, data) {
            if (!value) return true;
            return data.docName.indexOf(value) !== -1;
        },
        //提交
        submitIndex(){
            if(this.selectOrg.orgsid.length > 1){
                this.$message.warning('右侧只能选择一个文件');
                return;
            } else if(this.selectedDocList.length === 0){
                this.$message.warning('请选择要创建关联的文件');
                return;
            } else if(this.selectOrg.orgsid.length ===0){
                this.$message.warning('请选择要关联的目标文件');
                return;
            } else {
                let sameDoc = '';
                for(let i = 0; i < this.selectedDocList.length;i++){
                    if(this.selectedDocList[i].id === this.selectOrg.orgsid[0]){
                        sameDoc = sameDoc + this.selectedDocList[i].docName;
                    }
                }
                if(sameDoc !== ''){
                    this.$message.warning(sameDoc + '不能关联本身');
                    return;
                }
            }
            // this.selectedDocList选中的左侧树集合，this.selectedDocListId选中的左侧树的id集合,this.selecteddraftList右侧树集合 this.selectOrg.orgsid右侧树id集合
            
            let mySelectedDocList = this.selectedDocList;
            let mySelectedDocListId = this.selectedDocListId;
            let mySelecteddraftList = this.selecteddraftList;
            let myOrgsid = this.selectOrg.orgsid;
            this.setTree();
            this.searchProDoCatalog = '';
            this.searchDraftCatalog = '';
            this.$emit("submitBatchIndex", mySelectedDocList, mySelectedDocListId, mySelecteddraftList, myOrgsid);
        },
        //初始化树
        setTree(){
            this.selectedDocListId = [];
            this.selectedDocList = [];           
            this.selectOrg.orgsid = [];
            this.selecteddraftList = [];
            this.node.level = 0;
            this.rightNode.level = 0;           
            this.$refs.leftTree.load(this.node,this.resolve);
            this.$refs.rightTree.load(this.rightNode,this.rightResolve); 
        },
        seeFj(item){       
            var idx  = item.type.indexOf("/");
            var imgtype = item.type.slice(idx+1);
            var previewData = {
                projectId: this.projectId,
                rfsId: item.rfsId,
                docId : item.docId,
                photoType: imgtype,
                docName: item.docName
            }          
            this.$store.commit('previewAllFn',previewData )
        },
    },
    watch:{
        searchProDoCatalog(val) {
            // this.$refs.leftTree.filter(val);
        },
        searchDraftCatalog(val){
            // this.$refs.rightTree.filter(val);
        }
    }
}
</script>

<style scoped lang="scss" type="text/css">
.doc-relation{
    .search-box{
        height:40px;
    }
    .tree-box{
        margin-top:10px;
    }
    .doc-relation-name {
        width: 308px;
        text-align: left;
        overflow:hidden;
        white-space: nowrap;
        text-overflow:ellipsis;
    }
    .doc-relation-con {
        margin:20px 0;
        display:flex;
        .content-c-tit{
            padding-left:6px;
            padding-bottom:6px;
            text-align: left;
            font-size:14px;
            font-weight:bold;
        }
        .doc-list {
            padding: 4px 6px;            
            p{
                width: 100%;
                text-align: left;
                overflow:hidden;
                white-space: nowrap;
                text-overflow:ellipsis;
            }
        }
    }
    .content-l {
        width:32%;
        height: 336px;
        overflow: auto;
        border-right: 1px solid #ccc;
      box-sizing: border-box;
      margin-left: 15px;
      padding-right: 15px;
    }
    .content-c {
        width:32%;
        height: 336px;
        overflow-y: auto;

    }
    .content-r {
        width:32%;
        height: 336px;
        overflow: auto;
        border-left: 1px solid #ccc;
      box-sizing: border-box;
      margin-right: 15px;
      padding-left: 15px;
        .search-box{
            // padding: 0 6px;
        }
    }
    .el-input--suffix .el-input__inner {
        padding-left: 15px;
    }
    .paper_index_name_die{
        text-decoration:line-through;
    }
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
</style>
<style lang="scss" type="text/css">
.doc-relation{
    .doc-relation-title{
        padding-bottom: 8px;
        text-align: left;
        font-size: 16px;
    }
    .el-dialog__header{
        border-bottom:1px solid #dedede;
    }
 
    .doc-relation-con{
        .el-tree-node__expand-icon.expanded{
            width: 18px;
            height:14px;
            margin-top:10px;
            background: url("../../../assets/project_doc/treeopen.png") no-repeat 0 0;
            
        }
        .el-tree-node__expand-icon{
            width: 21px;
            height:21px;
            margin-top:10px;
            background: url("../../../assets/project_doc/treenoopen.png") no-repeat 0 0;
        }
         .el-tree-node__expand-icon{
            width: 21px;
            height:21px;
            margin-top:10px;
            background: url("../../../assets/project_doc/treenoopen.png") no-repeat 0 0;
        }
        .el-tree-node__expand-icon.is-leaf{
            background:none;
        }
        .el-tree-node__expand-icon.expanded{
            transform:none;
        }
        .el-icon-caret-right:before{
            color:#fff;
            opacity: 0;
        }
    }
    .el-input--suffix .el-input__inner {
        padding-left: 15px;
    }
    .tree-node{
        width:80%;
        p{
            width:80%;
            text-align:left;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap
        }
    }
    .el-tree-node>.el-tree-node__children{
        overflow: visible;
    }
}

.batch-edit-index .el-dialog__body{
  padding: 0;
}
</style>

