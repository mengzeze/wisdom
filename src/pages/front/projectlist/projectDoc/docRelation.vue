<template>
    <div class="doc-relation set-paper">
      <el-dialog title="文件关联" :close-on-click-modal="false" :visible="docRelationIsShow" @close="clickEvent" width="60%">
            <div class="doc-relation-con" v-loading.lock="docLoading || paperLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
                <div class="content-l">
                    <div class="search-box">
                        <el-input v-model="searchProDoCatalog" placeholder="请输入关键词搜索" clearable prefix-icon="search" height="30" @clear="searchChangeProDoc">
                            <el-button slot="append" icon="el-icon-search" @click="searchDirFnProDoc"></el-button>
                        </el-input>
                    </div>
                    <div class="tree-box">
                        <!-- <el-tree
                            :props="leftTreeProps" ref="leftTree" lazy :load="leftTreeLoadNode" node-key="id" check-strictly
                            :expand-on-click-node="false" @check-change="selectChange" show-checkbox :filter-node-method="leftFilterNode">
                            <div class="tree-node" slot-scope="{node, data}" :title="data.docName">
                                <p>{{data.docName}}</p>
                            </div>
                        </el-tree> -->
                        <ul id="projectDocTree" class="ztree manuscriptZtree"></ul>
                        <!-- <p class="catalogue_search_showTitle_empty_left" v-if="flieNameDataProDoc.length == 0">未搜索到结果</p>  -->
                    </div>                    
                </div>
                <div class="content-c">
                    <p class="content-c-tit">文件</p>
                    <div class="doc-list clearfix" v-for="(item, index) in selectedDocList" :key="index">
                        <span class="fl name_icon_img" v-if="item.docType == 1">
                            <!-- <img src="../../../../assets/manuscript_icon/open_icon.png"> -->
                        </span>
                        <i class="el-icon-close fr color-primary-hover" @click="deleSeleDoc(item,index)"></i>
                        <p :class="[{folder:item.docType == 1},'fl']" :title="item.docName">{{item.docName}}</p>
                    </div>                   
                </div>
                <div class="content-r">
                    <div class="search-box">
                        <el-input v-model="searchDraftCatalog" placeholder="请输入关键词搜索" clearable prefix-icon="search" height="30" @clear="searchChange">
                            <el-button slot="append" icon="el-icon-search" @click="searchDirFn"></el-button>
                        </el-input>
                    </div>
                    <div class="tree-box">
                        <!-- <el-tree
                            :props="rightTreeProps" ref="rightTree" lazy :load="rightTreeLoadNode" node-key="id" check-strictly
                            :expand-on-click-node="false" @check-change="selectChangeR" show-checkbox :filter-node-method="rightFilterNode">
                            <div class="tree-node" slot-scope="{node,data}" :title="data.docName">
                                <span>
                                    <i :class="node.icon"></i>
                                </span> 
                                <p>{{data.docName}}</p>
                            </div>
                        </el-tree> -->
                        <ul id="manuscriptTree" class="ztree manuscriptZtree"></ul>
                    </div>                   
                </div>
            </div>
            <div slot="footer" class="dialog-footer" v-show="!docLoading && !paperLoading">
                <el-button size="medium" @click="clickEvent">取 消</el-button>
                <el-button size="medium" type="primary" @click="setDraft">确 定</el-button>
            </div>
      </el-dialog>
        <!-- 重名提示 -->
        <el-dialog :close-on-click-modal="false" title="重名提示" :visible.sync="sameNameTipsVisible" width="422px"  class="set_draft_same_name">
            <div>
                <div class="set_draft_same_name-con clearfix">
                    <i class="el-icon-warning"></i>
                    <p>存在重名文件，是否继续将重名文件设为底稿？</p>
                    <p>注：非同名文件已设为底稿。</p>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="hasSameNameCancel">取 消</el-button>
                    <el-button type="primary" @click="hasSameNameLink">确 定</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>

export default {
    name: 'docRelation',
    props: ['docRelationIsShow','projectData','toDocRelationList'],
    data () {
        return {
            token:"",
            userId:'',
            success_code: "",
            projectId: '',//项目ID
            docParentId: 0,//查询项目文档时的parentId
            docInitList: [],
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
            rightIsFirst: true,
            hasFolder: false,//要设为底稿的项目文档是否有文件夹
            sameNameProDoc: [],//设为底稿时后台返回的重名文件列表
            sameNameTipsVisible: false,
            // 666
            setting:{  //右侧底稿目录zTree默认配置
                check: {
                    enable: true,
                    chkStyle: "radio",
                    radioType: "all"
                },
                data:{
                    simpleData:{
                        enable: true,
                        pIdKey: 'parentId',
                        idKey: 'id',
                        rootPId: 0
                    },

                    key:{
                        name: 'highlightName'
                    },

                },
                view:{
                    selectedMulti: false,
                    showLine: false,
                    dblClickExpand: false,
                    // addDiyDom: this.addDirStatusDiyDom,
                    fontCss : this.setSearchFontCss,
                },
                edit: {
                    enable: true,
                    editNameSelectAll: true,
                    showRemoveBtn: false,
                    showRenameBtn: false,
                    drag: {
                        isCopy: false,
                        isMove: false
                    }
                },
                async:{
                    enable: true,
                    url: this.getAsyncUrl,
                    contentType: "application/json",
                    dataType: "json",
                    autoParam: [],
                    otherParam: this.getAsyncData,
                    dataFilter: this.treeFilterFn
                },
                callback:{
                    beforeClick: this.zTreeBeforeClickFn,
                    onClick: this.zTreeOnClickFn,
                    onAsyncSuccess: this.onAsyncSuccessFn,
                    onCheck: this.checkDraft
                }

            },
            zNodes:[],
            manuscriptTreeDemo: '',
            requestCode: {}, //所有请求的状态码
            targetTreeNode: '', //点击树目录的节点数据
            parentIdData:'',
            dirNum: 0,//搜索结果个数
            searchIdx: 0,//第几个结果
            flieNameData: [],
            reqApi: '', //动态请求地址
            dirData: [],
            //777
            settingProDoc:{  //左侧项目文档zTree默认配置
                check: {
                    enable: true,
                    chkboxType: { "Y" : "", "N" : "" },
                    autoCheckTrigger: true
                },
                data:{
                    simpleData:{
                        enable: true,
                        pIdKey: 'parentId',
                        idKey: 'id',
                        rootPId: 0
                    },

                    key:{
                        name: 'highlightName'
                    },

                },
                view:{
                    selectedMulti: false,
                    showLine: false,
                    dblClickExpand: false,
                    // addDiyDom: this.addDirStatusDiyDom,
                    fontCss : this.setSearchFontCssProDoc,
                },
                edit: {
                    enable: true,
                    editNameSelectAll: true,
                    showRemoveBtn: false,
                    showRenameBtn: false,
                    drag: {
                        isCopy: false,
                        isMove: false
                    }
                },
                async:{
                    enable: true,
                    url: this.getAsyncUrlProDoc,
                    contentType: "application/json",
                    dataType: "json",
                    autoParam: [],
                    otherParam: this.getAsyncDataProDoc,
                    dataFilter: this.treeFilterFnProDoc
                },
                callback:{
                    beforeClick: this.zTreeBeforeClickFnProDoc,
                    onClick: this.zTreeOnClickFnProDoc,
                    onAsyncSuccess: this.onAsyncSuccessFnProDoc,
                    onCheck: this.checkProDoc
                }

            },
            zNodesProDoc:[],
            proDocTreeDemo: '',
            targetTreeNodeProDoc: '', //点击树目录的节点数据
            parentIdDataProDoc:'',
            dirNumProDoc: 0,//搜索结果个数
            searchIdxProDoc: 0,//第几个结果
            flieNameDataProDoc: [],
            dirDataProDoc: [],
            searchEmptyProDoc: false,//项目文档搜索结果是否为空
            sameDoc: [], //重名后返回的设为底稿失败的文件
            docLoading: true, // 文档目录loading
            paperLoading: true, // 底稿目录loading
            stagePlaceFileIds: []
        }
    },
    created(){
        
    },
    mounted(){
        this.token = this.$store.state.loginObject.userToken;
        this.userId = this.$store.state.loginObject.userId;
        this.success_code = this.code.codeNum.SUCCESS;
        this.projectId = this.$store.state.projectMsg.pro_id;
        this.reqApi = global.baseUrl;
        this.requestCode = this.code.codeNum;
        // this.getTreeDataFn();
        this.queryPlaceFileStage();
    },
    methods:{ 
         queryPlaceFileStage() {   
             this.stagePlaceFileIds = [];
             let projectId = this.$store.state.projectMsg.pro_id;         
            let data = {
                token: this.token,
                userId: this.userId,
                data: {
                    projectId: projectId
                }
            };
            this.$post("/info/project/getImplementStageList", data)
                .then( (response)=> {
                    if (this.success_code == response.code) {
                        let data = response.data;
                          data.map((item)=>{
                              if(item.sealFlag == 1){
                                  this.stagePlaceFileIds.push(item.id)
                              }
                          })                     
                    }    
                })
                .catch(function (error) {

                });
        },
        //右侧底稿
        searchDirFn() { //搜索目录函数
            let projectId = this.$store.state.projectMsg.pro_id;
            let searchStr = this.searchDraftCatalog.replace(/\s*/g,"");
            if(this.searchDraftCatalog == '') return; //输入为空时,点搜索就返出去
            if(searchStr == ''){
                this.$message.warning('请输入正确的内容');  
                return;
            }
            this.searchIdx = 1;
            var data = {
                token: this.token,
                userId: this.userId,
                pageNo: 0,
                pageSize: 5000,
                data: {
                    docName: this.searchDraftCatalog,
                    projectId: projectId
                }
            };
             this.$post('/doc/paper/searchDir',data)
            .then((res) => {
                if(this.requestCode.SUCCESS == res.code) {
                    this.dirNum = res.data.num
                    this.dirData = res.data.content
                    $.fn.zTree.init($("#manuscriptTree"), this.setting, this.zNodes);
                    var ls = this.manuscriptTreeDemo.reAsyncChildNodesPromise(this.zNodes[0], "refresh"); //每次搜索都需要去异步刷新出
                    ls.then(() => {
                        var nodes = this.manuscriptTreeDemo.getNodes();     //获取整个树数据
                        this.searchDataFn(nodes) //调用处理树的函数
                    })
                } else {
                    $.fn.zTree.init($("#manuscriptTree"), this.setting, []);
                    // this.searchEmpty = true;
                    this.flieNameData = []
                    this.$message({
                        message: res.msg,
                        type: "warning"
                    });                 
                }
            })
            .catch((error) => {
                console.log(error);
            });
        },
        searchDataFn(node) { //搜索后数据的处理函数 node 为整个树形数据
          for( let i in this.dirData) { //循环搜索结果数据
            for(let j in node) {  //循环树形数据   
              if(this.dirData[i].id == node[j].id ) { //两者匹配唯一的id
                if(this.dirData[i].disabled) { //是否有高亮字段的判断
                    node[j].searchBack = true;
                    // return;
                }
                var ls = this.manuscriptTreeDemo.reAsyncChildNodesPromise(node[j], "refresh");
                ls.then(() => {                   
                    this.searchDataFn(node[j].children)  //每次调用自己打开下一个函数
                    if(node[j].id == this.dirData[this.dirData.length - 1].id) { //判断是否是数组最后一个数 减少请求的
                        var nodes = this.manuscriptTreeDemo.getNodesByParam("searchBack", true, null); //获取所有高亮数据
                        this.manuscriptTreeDemo.selectNode(nodes[0]) //设置数据第一个为高亮
                    }   
                })              
              }
            }
          }
        },
        searchChange() { //搜索输入框清空时
            if(this.searchDraftCatalog == '' ) {
                // this.searchEmpty = false;
                $.fn.zTree.init($("#manuscriptTree"), this.setting, this.zNodes);
                var ls = this.manuscriptTreeDemo.reAsyncChildNodesPromise(this.zNodes[0], "refresh"); //每次搜索都需要去异步刷新出
                ls.then(() => {
                    var nodes = this.manuscriptTreeDemo.getNodes();     //获取整个树数据
                    this.searchClearDataFn(nodes) //调用处理树的函数
                    this.dirNum = 0;
                    this.searchIdx = 0;
                
                })
            }
        },
        searchClearDataFn(node) {
            for( let i in this.dirData) { //循环搜索结果数据
                for(let j in node) {  //循环树形数据   
                    if(this.dirData[i].id == node[j].id ) { //两者匹配唯一的id
                        if(this.dirData[i].disabled) { //是否有高亮字段的判断
                            node[j].searchBack = false;
                            // return;
                        }
                        var ls = this.manuscriptTreeDemo.reAsyncChildNodesPromise(node[j], "refresh");
                        ls.then(() => {                   
                            this.searchClearDataFn(node[j].children)  //每次调用自己打开下一个函数 
                            if(node[j].id == this.dirData[this.dirData.length - 1].id) { //判断是否是数组最后一个数 减少请求的
                                this.dirData = []
                            } 
                        })
                    
                    }
                }
            }
    
        },
        getTreeDataFn() { //获取初始树数据
            let projectId = this.$store.state.projectMsg.pro_id;
            var data = {
                token: this.token,
                userId: this.userId,
                pageNo: 0,
                pageSize: 5000,
                data: {
                    docType: 1,//固定为1
                    parentId: '0',
                    projectId: projectId
                }
            };
            this.$post('/doc/paper/query',data)
            .then((res) => {
                if(this.success_code == res.code) {
                    this.zNodes = res.data.content;                   
                    this.zNodes.forEach((item) => {
                        if(item.fileSum <= 0) {
                            item.isParent = true;
                            item.iconSkin = "diy02";
                            item.checked = false;
                        } else {
                            if(item.docType === 1) {
                                item.isParent = true;
                                item.iconSkin = "diy01";
                                item.checked = false;
                            }
                        }
                    });
                    $.fn.zTree.init($("#manuscriptTree"), this.setting, this.zNodes);
                    this.manuscriptTreeDemo = $.fn.zTree.getZTreeObj("manuscriptTree"); //将目录树对象赋值给全局使用
                    var nodes = this.manuscriptTreeDemo.getNodes();
                    this.manuscriptTreeDemo.selectNode(nodes[0])
                    // var ls = this.manuscriptTreeDemo.reAsyncChildNodesPromise(nodes[0], "refresh");
                    // if(res.data.content.length === 0) return;
                    // ls.then(() => {
                    //   (nodes[0] && nodes[0].children) && this.locationFn(nodes[0].children)
                    // })
                } else {
                    this.$message({
                        message: res.msg,
                        type: "error"
                    });
                }
                this.paperLoading = false;
            })
            .catch((error) => {
                console.log(error)
                this.paperLoading = false;
            })
        },
        setSearchFontCss(treeId, treeNode) { //z-tree 的api方法 处理高亮的
            return treeNode.searchBack ? {background:"#e2ecff"} : {};
        },
        getAsyncUrl() { //配置底稿目录树请求地址
            return `${this.reqApi}/doc/paper/query`
            // return 'http://192.168.6.230:212/doc/paper/query'
        },
        getAsyncData(treeId, treeNode) { //配置底稿目录树请求数据
            if(treeNode) {
                return  {
                    token: this.token,
                    userId: this.userId,
                    pageNo: 0,
                    pageSize: 5000,
                    projectId: this.projectId,
                    data: {
                        docType: treeNode.docType,
                        parentId: treeNode.id,
                        projectId: this.projectId
                    }
                }
            } else {
                return  {
                    token: this.token,
                    userId: this.userId,
                    pageNo: 0,
                    pageSize: 5000,
                    data: {
                        docType: 1,
                        parentId: 0,
                        projectId: this.projectId
                    }
                }
            }

        },
        treeFilterFn(treeId, parentNode, responseData) { //异步加载过滤树
            if (responseData.code == this.requestCode.ARGUMENT_ERROR) {
                return this.$message({
                        message: res.msg,
                        type: "error"
                    });;
            } else if(responseData.code == this.requestCode.DOC_FIlE_TYPE_MISMATCH) {
                return ;
            }else {
                responseData.data.content.forEach((item) => {
                    console.log(item.fileSum,'____',item)
                    if(item.fileSum <= 0) {
                        item.isParent = true;
                        item.iconSkin = "diy02";
                        item.checked = false;
                    } else {
                        if(item.docType === 1) {
                            item.isParent = true;
                            item.iconSkin = "diy01";
                            item.checked = false;
                        }
                    }
                    
                })
                return responseData.data.content;
            }
        },
        zTreeOnClickFn(e, treeId, treeNode) { //点击树
            let projectId = this.$store.state.projectMsg.pro_id;
            // this.orderFlag = ""
            this.manuscriptTreeDemo.expandNode(treeNode);
            this.targetTreeNode = treeNode
            // this.workCatalogueName = treeNode.docName
            this.parentIdData = treeNode
            // this.listScrollTop.scrollTop = 0;
            // var nodes = this.manuscriptTreeDemo.getNodesByParam("searchBack", true, null); //获取所有高亮数据
            // if(this.dirData.length != 0) {
            //     nodes.map((item,idx) => {
            //         if(item.id == treeNode.id) {
            //             this.searchIdx = idx + 1;
            //         }
            //     })
            // }
            if(treeNode.id) {
                var data = {
                    token: this.token,
                    userId: this.userId,
                    pageNo: 0,
                    pageSize: 5000,
                    data: {
                        parentId: treeNode.id,
                        projectId: projectId
                    }
                };
                this.$post('/doc/paper/query',data)
                .then((res) => {
                    if(this.requestCode.SUCCESS == res.code) {
                        this.flieNameData = res.data.content
                        this.flieNameData.map(item => {
                             item.isEdit = false;
                            //  this.iconFilter(item)
                            //  this.labelList(item,res.data.content)
                        })
                    } else {
                        this.$message({
                            message: res.data,
                            type: "error"
                        });
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
            } else {
                this.flieNameData = []
                return;
            }
        },
        onAsyncSuccessFn(event, treeId, treeNode, msg) { //异步树成功加载
          var zTree = $.fn.zTree.getZTreeObj(treeId);
	        zTree.updateNode(treeNode); // 异步加载成功后刷新树节点
        },
        checkDraft(event, treeId, treeNode){           
            this.selectOrg.orgsid = [];
            this.selecteddraftList = this.manuscriptTreeDemo.getCheckedNodes();
            for(var i=0;i<this.selecteddraftList.length;i++){
                this.selectOrg.orgsid.push(this.selecteddraftList[i].id);
            }              
        },
        //左侧项目文档
        searchDirFnProDoc() { //搜索项目文档
            let projectId = this.$store.state.projectMsg.pro_id;
            let searchStr = this.searchProDoCatalog.replace(/\s*/g,"");
            if(this.searchProDoCatalog == '') return; //输入为空时,点搜索就返出去
            if(searchStr == ''){
                this.$message.warning('请输入正确的内容');  
                return;
            }
            this.searchIdxProDoc = 1;
            let data = {
                token: this.token,
                userId:this.userId,
                projectId:projectId,  
                data: {
                    projectId:projectId,  
                    docName: this.searchProDoCatalog
                }
            }
             this.$post('/doc/project/link/searchDirAndFile',data)
            .then((res) => {
                if(this.requestCode.SUCCESS == res.code) {
                    // this.dirNumProDoc = res.data.num
                    this.dirDataProDoc = res.data.content
                    $.fn.zTree.init($("#projectDocTree"), this.settingProDoc, this.zNodesProDoc);                   
                    var ls = this.proDocTreeDemo.reAsyncChildNodesPromise(this.zNodesProDoc[0], "refresh"); //每次搜索都需要去异步刷新出
                    ls.then(() => {
                        var nodes = this.proDocTreeDemo.getNodes();     //获取整个树数据
                        this.searchDataFnProDoc(nodes) //调用处理树的函数
                        this.selectedNode(this.dirDataProDoc);
                        
                    })
                } else {
                    $.fn.zTree.init($("#projectDocTree"), this.settingProDoc, []);
                    this.flieNameDataProDoc = []
                    this.$message({
                        message: res.msg,
                        type: "warning"
                    });                 
                }
            })
            .catch((error) => {
                console.log(error);
            });
        },
        searchDataFnProDoc(node) { //搜索后数据的处理函数 node 为整个树形数据
          for( let i in this.dirDataProDoc) { //循环搜索结果数据
            for(let j in node) {  //循环树形数据   
              if(this.dirDataProDoc[i].id == node[j].id ) { //两者匹配唯一的id
                
                if(this.dirDataProDoc[i].disabled) { //是否有高亮字段的判断
                    node[j].searchBack = true;
                    this.proDocTreeDemo.updateNode(node[j]); 
                    // return;
                }
                
                var ls = this.proDocTreeDemo.reAsyncChildNodesPromise(node[j], "refresh");
                ls.then(() => {                                     
                    this.searchDataFnProDoc(node[j].children)  //每次调用自己打开下一个函数
                    if(node[j].id == this.dirDataProDoc[this.dirDataProDoc.length - 1].id) { //判断是否是数组最后一个数 减少请求的
                        var nodes = this.proDocTreeDemo.getNodesByParam("searchBack", true, null); //获取所有高亮数据
                        // this.proDocTreeDemo.selectNode(nodes[0]) //设置数据第一个为高亮
                    }   
                })
               
              }
            }
          }
        },
        searchChangeProDoc() { //搜索输入框清空时
            if(this.searchProDoCatalog == '' ) {
                // this.searchEmpty = false;
                $.fn.zTree.init($("#projectDocTree"), this.settingProDoc, this.zNodesProDoc);
                var ls = this.proDocTreeDemo.reAsyncChildNodesPromise(this.zNodesProDoc[0], "refresh"); //每次搜索都需要去异步刷新出
                ls.then(() => {
                    var nodes = this.proDocTreeDemo.getNodes();     //获取整个树数据
                    this.searchClearDataFnProDoc(nodes) //调用处理树的函数
                    this.dirNumProDoc = 0;
                    this.searchIdxProDoc = 0;
                
                })
            }
        },
        searchClearDataFnProDoc(node) {
            for( let i in this.dirDataProDoc) { //循环搜索结果数据
                for(let j in node) {  //循环树形数据   
                    if(this.dirDataProDoc[i].id == node[j].id ) { //两者匹配唯一的id
                        if(this.dirDataProDoc[i].disabled) { //是否有高亮字段的判断
                            node[j].searchBack = false;
                            // return;
                        }
                        var ls = this.proDocTreeDemo.reAsyncChildNodesPromise(node[j], "refresh");
                        ls.then(() => {                   
                            this.searchClearDataFnProDoc(node[j].children)  //每次调用自己打开下一个函数 
                            if(node[j].id == this.dirDataProDoc[this.dirDataProDoc.length - 1].id) { //判断是否是数组最后一个数 减少请求的
                                this.dirDataProDoc = []
                            } 
                        })
                    
                    }
                }
            }
    
        },
        getTreeDataFnProDoc(hasSeleDocList) { //获取初始树数据
            // console.log('拿到的',hasSeleDocList)
            let projectId = this.$store.state.projectMsg.pro_id;
            this.selectedDocList = this.$utils.copyObj(hasSeleDocList);
            for(var i=0;i<this.selectedDocList.length;i++){
                this.selectedDocListId.push(this.selectedDocList[i].id);
            }
            let data = {
                token: this.token,
                userId: this.userId,
                pageNo: 0,
                pageSize: 5000,
                projectId: projectId,
                data: {
                    projectId: projectId,
                    docContent: '',
                    auditProjectId: '', //项目阶段ID
                    parentId: 0,//所在目录ID
                    docName: '',
                    beginTime: '', //文件创建开始时间
                    endTime: '', //文件创建结束时间
                    suffix: '' //文件类型（后缀名）
                    //"docType": "0"文件类型（文件 0 /文件夹 1）不是只加载目录树就不用传
                }
            };
            this.$post('/doc/project/linkQuery',data)
            .then((res) => {
                if(this.success_code == res.code) {
                    this.zNodesProDoc = res.data.content;
                    this.zNodesProDoc.forEach((item) => {
                        if(item.fileSum <= 0) {
                            item.isParent = true;
                            item.iconSkin = "diy02";
                            item.checked = false;
                        } else {
                            if(item.docType === 1) {
                                item.isParent = true;
                                item.iconSkin = "diy01";
                                item.checked = false;
                            }
                        }
                        if(item.isLink == 1) {
                            item.chkDisabled = true;
                        } else {
                            item.chkDisabled = false;
                        }
                    });
                    $.fn.zTree.init($("#projectDocTree"), this.settingProDoc, this.zNodesProDoc);
                    this.proDocTreeDemo = $.fn.zTree.getZTreeObj("projectDocTree"); //将目录树对象赋值给全局使用
                    var nodes = this.proDocTreeDemo.getNodes();
                    this.proDocTreeDemo.selectNode(nodes[0])
                    // var ls = this.manuscriptTreeDemo.reAsyncChildNodesPromise(nodes[0], "refresh");
                    if(res.data.content.length != 0) this.selectedNode(nodes);
                    // ls.then(() => {
                    //   (nodes[0] && nodes[0].children) && this.locationFn(nodes[0].children)
                    // })

                } else {
                    this.$message({
                        message: res.msg,
                        type: "error"
                    });
                }
                this.docLoading = false;
            })
            .catch((error) => {
                console.log(error)
                this.docLoading = false;
            })
        },
        selectedNode(nodes){
            // var nodes = this.proDocTreeDemo.getNodes();
            this.selectedDocList.map((item, index) => {
                let seleObj = item;
                // var node = this.proDocTreeDemo.getNodeByParam("id",seleObj.id);
                // node.checked = true
                // this.proDocTreeDemo.updateNode(node);
                nodes.map((item2, index2) => {
                    if(seleObj.id == item2.id){
                        var node = this.proDocTreeDemo.getNodeByParam("id",seleObj.id);
                        node.checked = true
                        this.proDocTreeDemo.updateNode(node); 
                    }
                })
            })
        },
        setSearchFontCssProDoc(treeId, treeNode) { //z-tree 的api方法 处理高亮的
            return treeNode.searchBack ? {background:"#e2ecff"} : {};
        },
        getAsyncUrlProDoc() { //配置底稿目录树请求地址
            return `${this.reqApi}/doc/project/query`
            // return 'http://192.168.6.230:212/doc/paper/query'
        },
        getAsyncDataProDoc(treeId, treeNode) { //配置项目文档目录树请求数据
            if(treeNode) {
                console.log('000222')
                return {
                    token: this.token,
                    userId:this.userId,
                    pageNo: 0,
                    pageSize: 5000,    
                    projectId:this.projectId,           
                    data:{
                        projectId:this.projectId,
                        docContent:'',
                        auditProjectId:'',
                        parentId: treeNode.id,//所在目录ID
                        docName:'',//文件或者目录名称
                        beginTime: '',//文件创建开始时间
                        endTime: '',//文件创建结束时间
                        suffix:''
                    }
                }
            } else {
                console.log('111')
                return {
                    token: this.token,
                    userId:this.userId,
                    pageNo: 0,
                    pageSize: 5000,   
                    projectId:this.projectId,            
                    data:{
                        projectId:this.projectId,
                        docContent:'',
                        auditProjectId:'',
                        parentId: 0,//所在目录ID
                        docName:'',//文件或者目录名称
                        beginTime: '',//文件创建开始时间
                        endTime: '',//文件创建结束时间
                        suffix:''
                    }
                }
            }

        },
        treeFilterFnProDoc(treeId, parentNode, responseData) { //异步加载过滤树
            if (responseData.code == this.requestCode.ARGUMENT_ERROR) {
                return this.$message({
                        message: res.msg,
                        type: "error"
                    });;
            } else if(responseData.code == this.requestCode.DOC_FIlE_TYPE_MISMATCH) {
                return ;
            }else {
                responseData.data.content.forEach((item) => {
                    // console.log(item.fileSum,'____',item)
                    if(item.fileSum <= 0) {
                        item.isParent = true;
                        item.iconSkin = "diy02";
                        item.checked = false;
                    } else {
                        if(item.docType === 1) {
                            item.isParent = true;
                            item.iconSkin = "diy01";
                            item.checked = false;
                        }
                    }
                    if(item.isLink == 1) {
                        item.chkDisabled = true;
                    } else {
                        item.chkDisabled = false;
                    }
                })
                return responseData.data.content;
            }
        },
        zTreeOnClickFnProDoc(e, treeId, treeNode) { //点击树
            let curNodeisSele = treeNode.checked;
            let projectId = this.$store.state.projectMsg.pro_id;
            // this.orderFlag = ""
            this.proDocTreeDemo.expandNode(treeNode);
            this.targetTreeNodeProDoc = treeNode
            // this.workCatalogueName = treeNode.docName
            this.parentIdDataProDoc = treeNode
            // this.listScrollTop.scrollTop = 0;
            // var nodes = this.manuscriptTreeDemo.getNodesByParam("searchBack", true, null); //获取所有高亮数据
            // if(this.dirData.length != 0) {
            //     nodes.map((item,idx) => {
            //         if(item.id == treeNode.id) {
            //             this.searchIdx = idx + 1;
            //         }
            //     })
            // }
            let auditProjectId = treeNode.auditProjectId;
            if(treeNode.id) {
                let data = {
                    token: this.token,
                    userId: this.userId,
                    pageNo: 0,
                    pageSize:5000,
                    projectId: projectId,
                    data: {
                        projectId: projectId,
                        docContent: '',
                        auditProjectId: auditProjectId,//项目阶段ID,固定为空
                        parentId: treeNode.id,//所在目录ID 0 为顶级目录
                        docName: '',
                        beginTime: '',//文件创建开始时间
                        endTime: '',//文件创建结束时间
                        suffix: ''//文件类型（后缀名）
                    }
                }
                this.$post('/doc/project/query',data)
                .then((res) => {
                    if(this.requestCode.SUCCESS == res.code) {
                        this.flieNameDataProDoc = res.data.content
                        if(curNodeisSele){//是选中状态                         
                            var nodeChild = treeNode.children;
                            var nodes2 = this.proDocTreeDemo.getNodesByParam("isLink",1,null);
                            var nodes3 = this.proDocTreeDemo.getNodesByParam("chkDisabled",true,null);
                            var nodes4 = nodeChild.concat(nodes2,nodes3);
                            for (var i=0, l=nodes4.length; i < l; i++) {
                                this.proDocTreeDemo.setChkDisabled(nodes4[i], true);
                            }                         
                        } else {
                            if(treeNode.open){
                                this.flieNameDataProDoc.map(item => {
                                    
                                    if(item.isLink == 1){                                        
                                        let node = this.proDocTreeDemo.getNodesByParam("id",item.id,null);                                
                                        //node.isLink = 1;
                                        //this.proDocTreeDemo.updateNode(node);
                                        let nodes2 = this.proDocTreeDemo.getNodesByParam("isLink",1,null);
                                        let nodes3 = this.proDocTreeDemo.getNodesByParam("chkDisabled",true,null);
                                        let nodes4 = node.concat(nodes2,nodes3);
                                        let l=nodes4.length;
                                        for (var i=0;i < l; i++) {
                                            this.proDocTreeDemo.setChkDisabled(nodes4[i], true);
                                        }                         
                                    }                                    
                                })
                                // this.proDocTreeDemo.updateNode(treeNode);
                                // this.proDocTreeDemo.reAsyncChildNodes(treeNode, "refresh" ); //局部刷新节点   
                            }
                        }  
                        this.flieNameDataProDoc.map(item => {
                             item.isEdit = false;
                            //  this.iconFilter(item)
                            //  this.labelList(item,res.data.content)
                        })
                        this.selectedNode(this.flieNameDataProDoc);
                    } else {
                        this.$message({
                            message: res.data,
                            type: "error"
                        });
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
            } else {
                this.flieNameDataProDoc = []
                return;
            }
        },
        onAsyncSuccessFnProDoc(event, treeId, treeNode, msg) { //异步树成功加载           
          var zTree = $.fn.zTree.getZTreeObj(treeId);
	        zTree.updateNode(treeNode); // 异步加载成功后刷新树节点
        },
        checkProDoc(event, treeId, treeNode){  
            if(treeNode.checked){//选中
                if(treeNode.docType == 0){      
                    this.selectedDocList.push(treeNode); 
                    this.selectedDocListId.push(treeNode.id);   
                } else {
                    // this.testFolderHasSeted(treeNode);
                    this.testFolderHasSeted(treeNode).then(res => {
                        if (!res) {//含有设为底稿的文件
                            treeNode.checked = false;
                            this.proDocTreeDemo.updateNode(treeNode);                    
                        } else {                 
                                        
                            let childList = treeNode.children;
                            let testarr = [];
                            let list = this.getChildren(testarr,treeNode,1)
                            console.log('6666666666666',list)
                            // for(let i=0;i<list.length;i++){
                                // console.log('6666666666666',treeNode.children[i])
                                // treeNode.children[i].checked = false;
                                // treeNode.children[i].chkDisabled = true;
                                // this.proDocTreeDemo.updateNode(treeNode.children[i]);  
                                // this.selectedDocList.splice(this.selectedDocList.findIndex(item => item.id === treeNode.children[i].id), 1)//在选中的文件列表中删除
                                // this.selectedDocListId.splice(this.selectedDocListId.findIndex(item => item === treeNode.children[i].id), 1)//在选中的文件id列表中删除  
                                      
                                treeNode.checked = false;
                                treeNode.chkDisabled = true;
                                this.proDocTreeDemo.updateNode(treeNode);  
                                this.selectedDocList.splice(this.selectedDocList.findIndex(item => item.id === treeNode.id), 1)//在选中的文件列表中删除
                                this.selectedDocListId.splice(this.selectedDocListId.findIndex(item => item === treeNode.id), 1)//在选中的文件id列表中删除                       
                            // }  
                              
                            treeNode.chkDisabled = false;
                            this.proDocTreeDemo.updateNode(treeNode);  
                            treeNode.checked = true;
                            // this.proDocTreeDemo.updateNode(treeNode);  
                            this.selectedDocList.push(treeNode); 
                            this.selectedDocListId.push(treeNode.id); 
                            // if(treeNode.docType != 0){
                            //     for(let j=0;j<childList.length;j++){
                            //         // let node = this.proDocTreeDemo.getNodesByParam("id",childList[j].id);
                            //         treeNode.children[j].checked = false;
                            //         this.proDocTreeDemo.updateNode(treeNode.children[j]);  
                            //         this.selectedDocList.map((item,index)=>{
                            //             if(childList[j].id == item.id){
                            //                 this.selectedDocList.splice(index, 1)
                            //             }
                            //         })                       
                            //     } 
                            //     var nodeChild = treeNode.children;
                            //     var nodes2 = this.proDocTreeDemo.getNodesByParam("isLink",1,null);
                            //     var nodes3 = this.proDocTreeDemo.getNodesByParam("chkDisabled",true,null);
                            //     var nodes4 = nodeChild.concat(nodes2,nodes3);
                            //     for (var i=0, l=nodes4.length; i < l; i++) {
                            //         this.proDocTreeDemo.setChkDisabled(nodes4[i], true);
                            //     }                                
                            // }
                            if(treeNode.docType != 0){
                                for(let j=0;j<list.length;j++){
                                    let node = this.proDocTreeDemo.getNodesByParam("id",list[j].id);
                                    list[j].checked = false;
                                    this.proDocTreeDemo.updateNode(list[j]);  
                                    this.selectedDocList.map((item,index)=>{
                                        if(list[j].id == item.id){
                                            this.selectedDocList.splice(index, 1)
                                        }
                                    })   
                                    this.selectedDocListId.map((item,index)=>{
                                        if(list[j].id == item){
                                            this.selectedDocListId.splice(index, 1)
                                        }
                                    })                     
                                } 
                                console.log('选中的id',this.selectedDocListId)
                                // var nodeChild = treeNode.children;
                                var nodes2 = this.proDocTreeDemo.getNodesByParam("isLink",1,null);
                                var nodes3 = this.proDocTreeDemo.getNodesByParam("chkDisabled",true,null);
                                var nodes4 = list.concat(nodes2,nodes3);
                                for (var i=0, l=nodes4.length; i < l; i++) {
                                    this.proDocTreeDemo.setChkDisabled(nodes4[i], true);
                                }                                
                            }
                        }
                    })
                } 
            } else {//取消选中
                this.selectedDocListId.map((item, index) => {
                    if(item.id === treeNode.id){
                        this.selectedDocListId.splice(index, 1)
                    }
                })
                this.selectedDocList.map((item, index) => {
                    if(item.id === treeNode.id){
                        this.selectedDocList.splice(index, 1)
                    }
                })
                if(treeNode.docType != 0){//文件夹
                    // let childList = treeNode.children;
                    // for(let i=0;i<childList.length;i++){
                    //     treeNode.children[i].chkDisabled = false;
                    //     this.proDocTreeDemo.updateNode(treeNode.children[i]);                       
                    // }
                    let testarr = [];
                    let list = this.getChildren(testarr, treeNode)
                    for(let i=0;i<list.length;i++){
                        list[i].chkDisabled = false;
                        this.proDocTreeDemo.updateNode(list[i]);                         
                    }                           
                }
            }             
        },
        getChildren(list, treeNode,num){        
            if(num == 0){
                list.push(treeNode);
            }
            if (treeNode.isParent){
                for(var obj in treeNode.children){
                    this.getChildren(list,treeNode.children[obj],0);
                }
            }
            return list;
        },
        //设为底稿
        setDraft(){
            let stageIsPlaceFile = this.selectedDocList.findIndex((value)=>value.sealFlag==1)
            let hasPlaceFileDoc = false;
            this.selectedDocList.map((item)=>{
                let index = this.stagePlaceFileIds.indexOf(item.auditProjectId)
                if(index != -1){
                    hasPlaceFileDoc = true;
                }
            })
            this.hasFolder = false;
            if(stageIsPlaceFile != -1 || hasPlaceFileDoc){
                this.$message.warning('项目阶段已归档无法关联到底稿');
                return;
            } else if(this.selectOrg.orgsid.length == 0){
                this.$message.warning('请至少选中一个底稿目录');
                return;
            } else if(this.selectedDocListId.length == 0){
                this.$message.warning('请至少选中一个项目文档');
                return;
            } else {
                this.link();
            }
        },
        //验证该文件夹中的子文件（子文件夹）是否已经被设为底稿
        async testFolderHasSeted(item){
            let projectId = this.$store.state.projectMsg.pro_id;
            let data = {
                token: this.token,
                userId: this.userId,
                projectId: projectId,
                data: {
                    id: item.id
                }
            }
            return await this.$post("/doc/project/validateDirIsLink", data)
                .then((response)=> {
                if (this.success_code == response.code) {
                    this.selectedDocList.push(item); 
                    this.selectedDocListId.push(item.id);
                    return true; 
                } else {
                    this.$message({
                        message: response.msg,
                        type: "warning"
                    });
                    return false;
                }
            })
            .catch(function(error) {

            });
        },
        //关联底稿
        link(){
            let projectId = this.$store.state.projectMsg.pro_id;
            let selectedDocListId = [...new Set(this.selectedDocListId)];
            this.sameNameProDoc = [];
            let data = {
                token: this.token,
                userId: this.userId,
                projectId: projectId,
                data: {
                    idSet: selectedDocListId,
                    paperParentId: this.selectOrg.orgsid.join(''),//设为底稿的目录id
                    flag: false,//发生重名后第二次操作
                }
            }
            this.$post("/doc/project/docLink", data)
                .then((response)=> {
                if (this.success_code == response.code) {
                    this.proDocTreeDemo = $.fn.zTree.getZTreeObj("projectDocTree"); //将目录树对象赋值给全局使用
                    var selectedNodes = this.proDocTreeDemo.getCheckedNodes(true);//项目文档选中节点
                    var draftSelectedDoc = this.manuscriptTreeDemo.getCheckedNodes(true)//底稿选中节点
                    draftSelectedDoc[0].isParent = true;//设置不为空目录
                    draftSelectedDoc[0].iconSkin = "diy01";
                    draftSelectedDoc[0].checked = false;
                    this.manuscriptTreeDemo.updateNode(draftSelectedDoc[0]);
                    this.manuscriptTreeDemo.reAsyncChildNodes(draftSelectedDoc[0], "refresh" ); //局部刷新节点
                    selectedNodes.map((item, index) => {//刷新左侧的选中节点
                        item.isLink = 1;     
                        this.proDocTreeDemo.reAsyncChildNodes(item, "refresh" );                  
                    })
                    
                    this.proDocTreeDemo.checkAllNodes(false);//清空所有选中
                    var nodes2 = this.proDocTreeDemo.getNodesByParam("isLink",1,null);//设置不能选择
                    var nodes3 = this.proDocTreeDemo.getNodesByParam("chkDisabled",true,null);
                    var nodes4 = nodes2.concat(nodes3,selectedNodes);
                    for (var i=0, l=nodes4.length; i < l; i++) {
                        this.proDocTreeDemo.setChkDisabled(nodes4[i], true);
                    }
                    this.selectedDocList = [] 
                    this.selectedDocListId = []; 
                    this.selectOrg.orgsid = [];   
                    this.selecteddraftList = [];
                    this.$message.success(response.msg); 
                } else if(response.code == -5113){
                    this.sameDoc = response.data.docProjectList;                   
                    this.sameNameProDoc = response.data;     
                    this.sameNameTipsVisible = true;     
                } else {
                    this.$message({
                        message: response.msg,
                        type: "warning"
                    });
                    return;
                }
            })
            .catch(function(error) {

            });
        },
        //关联底稿
        hasSameNameLink(){
            let projectId = this.$store.state.projectMsg.pro_id;
            let selectedDocListId = [...new Set(this.selectedDocListId)];
            // let data = {
            //     token: this.token,
            //     userId: this.userId,
            //     projectId: projectId,
            //     data: {
            //         idSet: selectedDocListId,
            //         paperParentId: this.selectOrg.orgsid.join(''),//设为底稿的目录id
            //         flag: true,//发生重名后第二次操作
            //         docProjectList: this.sameNameProDoc
            //     }
            // }
            let data = {
                token: this.token,
                userId: this.userId,
                projectId: projectId,
                data: this.sameNameProDoc
            }
            this.$post("/doc/project/docLink", data)
                .then((response)=> {
                if (this.success_code == response.code) {
                    this.proDocTreeDemo = $.fn.zTree.getZTreeObj("projectDocTree"); //将目录树对象赋值给全局使用
                    var selectedNodes = this.proDocTreeDemo.getCheckedNodes(true);
                    var draftSelectedDoc = this.manuscriptTreeDemo.getCheckedNodes(true)//底稿选中节点
                    draftSelectedDoc[0].isParent = true;
                    draftSelectedDoc[0].iconSkin = "diy01";
                    draftSelectedDoc[0].checked = false;
                    this.manuscriptTreeDemo.updateNode(draftSelectedDoc[0]);
                    this.manuscriptTreeDemo.reAsyncChildNodes(draftSelectedDoc[0], "refresh" ); 
                    selectedNodes.map((item, index) => {
                        item.isLink = 1;
                        this.proDocTreeDemo.reAsyncChildNodes(item, "refresh" );                          
                    })
                    this.proDocTreeDemo.checkAllNodes(false);
                    var nodes2 = this.proDocTreeDemo.getNodesByParam("isLink",1,null);
                    var nodes3 = this.proDocTreeDemo.getNodesByParam("chkDisabled",true,null);
                    console.log('nodes3',nodes3)
                    var nodes4 = nodes2.concat(nodes3,selectedNodes);
                    for (var i=0, l=nodes4.length; i < l; i++) {
                        console.log('设置不能选择')
                        this.proDocTreeDemo.setChkDisabled(nodes4[i], true);
                    }
                    this.selectedDocList = [] 
                    this.selectedDocListId = []; 
                    this.selectOrg.orgsid = [];   
                    this.selecteddraftList = [];
                    this.sameNameTipsVisible = false;  
                    // this.proDocTreeDemo.checkAllNodes(false);
                    // this.manuscriptTreeDemo.checkAllNodes(false);
                    // var draftSelectednodes = this.manuscriptTreeDemo.getSelectedNodes();
                    // this.manuscriptTreeDemo.cancelSelectedNode(draftSelectednodes[0])
                    this.$message.success(response.msg); 
                } else {
                    this.$message({
                        message: response.msg,
                        type: "warning"
                    });
                    return;
                }
            })
            .catch(function(error) {

            });
        }, 
        hasSameNameCancel(){           
            let sameDocIds = [];//设置底稿时重名的文件id集合
            let successDoc = [];
            this.sameDoc.map((item, index) => {
                sameDocIds.push(item.id)
            })
            for(var m = 0;m<this.selectedDocList.length;m++){
                let id = this.selectedDocList[m].id;
                if(sameDocIds.findIndex((n) => n == id) == -1){
                    successDoc.push(this.selectedDocList[m])
                }
            }     
            successDoc.map((obj, index) => {         
                this.selectedDocList.splice(this.selectedDocList.findIndex(item => item.id === obj.id), 1)//在选中的文件列表中删除
                this.selectedDocListId.splice(this.selectedDocListId.findIndex(item => item === obj.id), 1)//在选中的文件id列表中删除 
                let node = this.proDocTreeDemo.getNodesByParam("id",obj.id);
                obj.checked = false;
                this.proDocTreeDemo.updateNode(obj);        
            })
            this.sameNameTipsVisible=false;
            var nodes2 = this.proDocTreeDemo.getNodesByParam("isLink",1,null);
            var nodes3 = this.proDocTreeDemo.getNodesByParam("chkDisabled",true,null);
            var nodes4 = successDoc.concat(nodes2,nodes3);
            for (var i=0, l=nodes4.length; i < l; i++) {
                this.proDocTreeDemo.setChkDisabled(nodes4[i], true);
            }
        },
        deleSeleDoc(item, index){
            if(item.docType == 0){
                this.selectedDocList.splice(index,1);
                this.selectedDocListId.splice(index,1);
                var node = this.proDocTreeDemo.getNodeByParam("id",item.id);
                node.checked = false;
                this.proDocTreeDemo.updateNode(node);    
            } else {
                this.selectedDocList.splice(index,1);
                this.selectedDocListId.splice(index,1);
                var node = this.proDocTreeDemo.getNodeByParam("id",item.id);
                node.checked = false;


                let testarr = [];
                // let treeNode = this.proDocTreeDemo.getNodesByParam("id",item.id);
                let list = this.getChildren(testarr,node,1)
                for(let j=0;j<list.length;j++){
                    let node = this.proDocTreeDemo.getNodesByParam("id",list[j].id);
                    
                    list[j].checked = false;
                    this.proDocTreeDemo.setChkDisabled(list[j], false);
                    this.proDocTreeDemo.updateNode(list[j]);                      
                } 
                var nodes2 = this.proDocTreeDemo.getNodesByParam("isLink",1,null);
                var nodes3 = this.proDocTreeDemo.getNodesByParam("chkDisabled",true,null);
                var nodes4 = nodes2.concat(nodes3);
                for (var i=0, l=nodes4.length; i < l; i++) {
                    this.proDocTreeDemo.setChkDisabled(nodes4[i], true);
                } 
            }             
        },
        clickEvent(){  
            this.selectedDocList = [] 
            this.selectedDocListId = []; 
            this.selectOrg.orgsid = [];   
            this.selecteddraftList = [];
            // if(this.proDocTreeDemo != ''){
            //     this.proDocTreeDemo.checkAllNodes(false);
            // }
            // if(this.manuscriptTreeDemo != ''){
            //     this.manuscriptTreeDemo.checkAllNodes(false);
            // }         
            // this.getTreeDataFnProDoc(this.selectedDocList);
            // this.getTreeDataFn();
            $.fn.zTree.init($("#manuscriptTree"), this.setting, []);
            $.fn.zTree.init($("#projectDocTree"), this.settingProDoc, []);
            this.$emit('sendValueToParent');
            this.$emit('update:docRelationIsShow',false);           
            this.searchProDoCatalog = '';
            this.searchDraftCatalog = '';
        },
    },
    computed:{
        curProjcetId() {
            return this.$store.state.projectMsg.pro_id
        }
    },
    watch:{
        curProjcetId: function(){
            this.queryPlaceFileStage()
            this.projectId = this.$store.state.projectMsg.pro_id;
        }
    },
}
</script>

<style scoped lang="scss" type="text/css">
.doc-relation{
    /deep/ .el-dialog__body {
        overflow-x: auto;
    }
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
        display: flex;
        margin:20px 0;
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
                width: 80%;
                text-align: left;
                overflow:hidden;
                white-space: nowrap;
                text-overflow:ellipsis;
            }
            .name_icon_img{
                width: 18px;
                height:14px;
                margin-right:4px;
                background: url('../../../../assets/manuscript_icon/open_icon.png') no-repeat;
                background-size: 18px 14px;
            }
            .folder{
                width: 70%;
            }
            i{
               font-size: 18px; 
            }
        }
    }
    .content-l {
        /*min-width:200px;*/
        width:32%;
        height: 336px;
        overflow: auto;
        border-right: 1px solid #ccc;
      box-sizing: border-box;
      margin-left: 15px;
      padding-right: 15px;
    }
    .content-c {
        /*min-width:200px;*/
        width:32%;
        height: 336px;
        overflow-y: auto;
    }
    .content-r {
        /*min-width:200px;*/
        width:32%;
        height: 336px;
        overflow: auto;
        border-left: 1px solid #ccc;
      box-sizing: border-box;
      margin-right: 15px;
      padding-left: 15px;
    }
    
    
}
//重名提示
.set_draft_same_name{
    .el-dialog__body p{
        padding-left: 40px;
        text-align: left;
    }
    .dialog-footer{
        margin-top: 30px;
        text-align: right;
    }
    .set_draft_same_name-con{
        position: relative;
    }
    .el-icon-warning{
        position: absolute;
        left: 4px;
        top: 6px;
        font-size: 22px;
        color: #e6a23c;
    }
}
.ztree li span.button.chk.checkbox_true_full_focus{
    background-position: -14px 0;
}
.ztree li span.button.chk.checkbox_true_part{
    background-position: -14px -28px;
}
</style>
<style lang="scss" type="text/css">
.doc-relation{
    .el-dialog__header{
        border-bottom:1px solid #dedede;
    }

    .doc-relation-con{
        .el-tree-node__expand-icon.expanded{
            width: 18px;
            height:14px;
            margin-top:10px;
            background: url("../../../../assets/project_doc/treeopen.png") no-repeat 0 0;
            
        }
        .el-tree-node__expand-icon{
            width: 21px;
            height:21px;
            margin-top:10px;
            background: url("../../../../assets/project_doc/treenoopen.png") no-repeat 0 0;
        }
         .el-tree-node__expand-icon{
            width: 21px;
            height:21px;
            margin-top:10px;
            background: url("../../../../assets/project_doc/treenoopen.png") no-repeat 0 0;
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
    .search-box{
        .el-input--prefix .el-input__inner{
            padding-left: 15px;
        }
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
    //重名提示
    .set_draft_same_name{
        .el-dialog__header{
            text-align: left;
        }
        
    }
    .manuscriptZtree li a .node_name{
        font-size:14px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .manuscriptZtree li a.curSelectedNode{
        padding-top: 0px;
        background: #F0F0F0;
        color: black;
        height: 16px;
        border: 1px #F0F0F0 solid;
        opacity: 0.8;
    }
    .manuscriptZtree li span.switch{
        display: none;
    }
    .ztree li span.button.diy01_ico_open{
        line-height:0; margin:0; width:18px; height:18px; display: inline-block; vertical-align:middle;
        border:0 none; cursor: pointer;outline:none;
        background-color:transparent; background-repeat:no-repeat; background-attachment: scroll;
        background: url('../../../../assets/manuscript_icon/close_icon.png') no-repeat;
        background-size: 18px 14px;
    }
    .ztree li span.button.diy01_ico_close{
        line-height:0; margin:0; width:18px; height:18px; display: inline-block; vertical-align:middle;
        border:0 none; cursor: pointer;outline:none;
        background-color:transparent; background-repeat:no-repeat; background-attachment: scroll;
        background: url('../../../../assets/manuscript_icon/open_icon.png') no-repeat;
        background-size: 18px 14px;
    }
    .ztree li span.button.diy02_ico_open{
        line-height:0; margin:0; width:18px; height:18px; display: inline-block; vertical-align:middle;
        border:0 none; cursor: pointer;outline:none;
        background-color:transparent; background-repeat:no-repeat; background-attachment: scroll;
        background: url('../../../../assets/common_icon/empty_open_icon.png') no-repeat;
        background-size: 18px 14px;
    }
    .ztree li span.button.diy02_ico_close{
        line-height:0; margin:0; width:18px; height:18px; display: inline-block; vertical-align:middle;
        border:0 none; cursor: pointer;outline:none;
        background-color:transparent; background-repeat:no-repeat; background-attachment: scroll;
        background: url('../../../../assets/common_icon/empty_close_icon.png') no-repeat;
        background-size: 18px 14px;
    }
    .ztree li a .dirStatus{
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
    }
    .ztree li a .statusPending{
        display: inline-block;
        width: 8px;
        height: 8px;
        background: orange;
        border-radius: 50%;
    }
    .ztree li a .statusPass{
        display: inline-block;
        width: 8px;
        height: 8px;
        background: green;
        border-radius: 50%;
    }
    .ztree li a .statusNoPass{
        display: inline-block;
        width: 8px;
        height: 8px;
        background: red;
        border-radius: 50%;
    }
}

.set-paper .el-dialog__body {
  padding: 20px;
}
</style>

