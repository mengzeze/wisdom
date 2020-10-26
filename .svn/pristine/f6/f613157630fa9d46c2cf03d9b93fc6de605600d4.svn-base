<template>
    <div class="manuscriptmanage" id="manuscriptmanage" @click="leftKey">
        <div class="bottom_catalogue" :style="{width: catalogueWidth + 'px'}">
            <div class="catalogue_tree">
                <el-scrollbar style="height:100%">
                    <ul id="manuscriptTree" class="ztree manuscriptZtree"></ul>
                </el-scrollbar>
            </div>
            <span :class="shrink_bac" @click="shrinkFn"></span>
        </div>
        <div class="bottom_indexpage">
            <div class="indexpage_header">
                <div class="header_title">
                    <i class="title_portrait_icon"></i>
                    <div class="title_name">
                      {{projectIdTitle}}
                    </div>
                </div>
            </div>
            <div class="indexpage_nav">
                    <div class="nav_title">
                        <div class="title_left">
                            <div class="title_nav">
                                <div class="title_nav_index">
                                    <i class="title_nav_index_icon"></i>
                                    <span>首页</span>
                                </div>
                                <div class="title_nav_chunk" v-for="(item,idx) in navArray" :key="idx" @click="navClickFn(item)">
                                    <i class="title_nav_chunk_icon"></i>
                                    <span>{{item.docName}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="title_right">
                            <el-input
                                placeholder="全文检索"
                                class="title_input"
                                v-model="search_input"
                                suffix-icon="el-icon-search"
                                @blur="searchFn"
                                @keyup.enter.native="searchFn">
                            </el-input>
                        </div>
                    </div>
            </div>
<!--            <div class="indexpage_list" id="indexpage_list" @contextmenu.prevent="rightEvent($event)">-->
            <div class="indexpage_list" id="indexpage_list">
                <el-table
                    ref="multipleTable"
                    :data="flieNameData"
                    style="width: 100%;"
                    height="100%"
                    @row-dblclick="dblclickFn"
                    @row-contextmenu="handleRightClick"

                    @selection-change="selectFn"
                    v-loadmore="loadMore"
                    size="small"
                    class="manu_table"
                    id="manu_table"
                    highlight-current-row
                    >
                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>
                    <el-table-column
                    label="名称"
                    width="700"
                    class="tabel_name"
                    style="background:red; color: red;">
                    <template slot-scope="scope">
                        <div class="list_name">
                            <div class="list_name_icon">
                                <img :src="scope.row.fileIcon">
                            </div>
                            <div class="list_name_title">
                                <div :title="scope.row.docName">{{ scope.row.docName }}</div>
                            </div>
                        </div>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="借阅剩余时限"
                    label-class-name="list_title_time"
                    align="center">
                        <template slot-scope="scope">

                            <div v-if="scope.row.docType == 0 && scope.row.invalidTime" class="list_time">

                                <div class="list_time_updateUserName" :title="scope.row.invalidTime">{{scope.row.invalidTime}}</div>
                            </div>
                        </template>
                    </el-table-column>

                </el-table>
            </div>
        </div>
        <rightmenu  :rightmenuIsShow= "rightmenuIsShow" :fileData= "rightMenuItemData" :enterType= "enterType" v-on:rightMenuClick="rightMenuClick" class="rightMenu"  id="rightM"/>

    </div>
</template>
<script>
import rightmenu from './rightmenu_manu.vue'
import { setTimeout, setInterval, clearInterval } from 'timers';
export default {
    components: {
        rightmenu
    },
    data() {
        return {
            value: "",
            token: '', //请求接口默认必传数据
            userId: '', //请求接口默认必传数据
            pageNo: 0,  //请求接口默认必传数据
            pageSize: 500, //请求接口默认必传数据
            listPageNo: 0,
            listPageSize: 10,
            pro_id: '', //项目Id
            projectMsg: '', //项目信息
            requestCode: {}, //所有请求的状态码
            reqApi: '', //动态请求地址
            docSource: 1, //底稿管理标实
            shrink_bac: 'shrink_bac_push', //推拉class
            catalogueWidth: 25, //左面底稿目录框的动态款
            zNodes:[],
            setting:{  //左面底稿目录zTree默认配置
                data:{
                    simpleData:{
                        enable: true,
                        pIdKey: 'parentId',
                        idKey: 'id',
                        rootPId: 0
                    },

                    key:{
                        name: 'docName'
                    },

                },
                view:{
                    selectedMulti: false,
                    showLine: false,
                    dblClickExpand: false
                },
                edit: {
                    enable: true,
                    editNameSelectAll: true,
                    showRemoveBtn: false,
                    showRenameBtn: false
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
                    beforeRemove: this.zTreeBeforeRemoveFn,
                    onClick: this.zTreeOnClickFn,
                    onAsyncSuccess: this.onAsyncSuccessFn,
                    beforeRename: this.zTreeBeforeRenameFn,
                    onRename: this.zTreeOnRenameFn
                }

            },
            examineZnodes: [],
            examineSetting: { //全局查看zTree默认配置
                view: {
                    addDiyDom: this.addDiyDom,
                    showLine: false
                },
                check: {
                    enable: true,
                    chkStyle : "checkbox",
                    chkDisabledInherit: this.chkDisabledInherit,
                },
                data: {
                    simpleData: {
                        enable: true,
                        pIdKey: 'parentId',
                        idKey: 'id',
                        rootPId: 0
                    },
                    key:{
                        name: 'docName'
                    },
                },
                callback:{
                    onCheck: this.examineTreeOnCheck,
                    onClick: this.examineTreeOnClickFn,
                }
            },
            chkDisabledInherit: true,
            oldProjId: '', //旧的项目地址
            newProjId: '', //新的项目地址
            insertNewNode: {},
            targetTreeNode: '', //点击树目录的节点数据
            workCatalogueName: '',//工作底稿目录名字
            workCatalogueParentId: '', //工作底稿目录Id
            typeUpload: '',//
            parentIdUpload: '',
            isEditFlag: false,
            versionsRestoreData: {}, //版本还原后数据
            projectIdTitle: '',
            flieNameData: [],
            checked:'',

            search_input: '', //全文检索input值

            selectFileNameNode: '', //选中文件数据
            selectFileNameArray: [],
            rightmenuIsShow: false, //右键是否显示
            copyData: '',
            rightMenuItemData: {},
            navArray: [],
            editNewName: '',
            editName_input: '',
            arrData: [],
            projectName: '',
            dblclickData: '', //双击时当前这条数据
            E_IP: "http://192.168.6.230",
            clickType: 0,
            uploadEnterType: 0, //上传新版本类型1. 版本弹框入口 2. 右键上传版本入口
            copyType: '',
            copyStoreData: { //粘贴数据
                ids: '', //文件ID
                oldProjId: '', //粘贴到的项目ID
                newProjId: '', //原项目ID
                copyData: '', //粘贴数据
                copyType: '' //已复制或者剪切
            },
            citeCatalog: true,
            renameFlag: true,
            renameData: '',
            renameSuffix: '', //文件重命名后缀
            fullscreenLoading: false,
            manuscriptTreeDemo: '',
            examineTreeDemo: '',
            addDocNumber: 1,
            clearFlag: false,
            intervalId: '', //全文查看的下载定时器
            loading: '',
            newLoading: false,
            flag: true,
            allChecked: false, //全选按钮
            busy: true,
            listScrollTop: '',
            enterType: 2,
            fileJurisdictionFlag: false, //文件借阅下载权限
            docLoction: '', //全文检索传过来的定位数据
      };
    },
    created() {
        this.token = this.$store.state.loginObject.userToken;
        this.userId = this.$store.state.loginObject.userId;
        this.pro_id = this.$route.query.id
        this.projectIdTitle = this.$route.query.title
        this.projectMsg = this.$store.state.projectMsg.projectMsg;
        this.requestCode = this.code.codeNum;
        this.reqApi = global.baseUrl;
        // if(this.$route.query.locationData) { //处理有没有全文检索传过来的定位数据
        //   this.docLoction = JSON.parse(this.$route.query.locationData); //将json字符串转成json对象格式
        //   this.listPageNo = this.docLoction.nowPage; //将文件处在第几页赋值
        // }
    },
    mounted(){
        document.getElementById("manuscriptmanage").style.height = (this.getViewPortHeight() - 70 - 90 -14) + "px";
        document.getElementById('indexpage_list').style.height = (this.getViewPortHeight() - 70 - 90 - 14- 76- 70) + "px";
        const selectWrap = document.body.querySelector('.el-table__body-wrapper');
        this.listScrollTop = selectWrap;  
        this.getTreeDataFn(this.pro_id)   
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if(from.path == '/examineFullsearch' && vm.$route.query.isPosition != undefined){
                if(vm.$route.query.locationData) { //处理有没有全文检索传过来的定位数据
                    vm.docLoction = JSON.parse(vm.$route.query.locationData); //将json字符串转成json对象格式
                    vm.listPageNo = vm.docLoction.nowPage; //将文件处在第几页赋值
                }
            }
        })
    },
    beforeRouteLeave(to, from, next) {
        to.meta.keepAlive = false;
        next();
    },
    methods: {
      // 右键点击当前行
      handleRightClick(row){
        this.rightMenuItemData = row
        this.enterType = 2;
        var flagArray = this.selectFileNameArray.filter(item => item.id === this.rightMenuItemData.id)

        if(flagArray.length == 0) {
            this.$refs.multipleTable.clearSelection(this.selectFileNameArray,true);
            this.rightMenuItemData.length != 0 && this.$refs.multipleTable.toggleRowSelection(this.rightMenuItemData,true);
        }
        this.rightMenuItemData.length != 0  && this.$refs.multipleTable.setCurrentRow(this.rightMenuItemData);
        this.rightmenuFn();
      },
        loadMore() {
            if(this.busy) {
                this.busy = false;
                this.listPageNo ++;
                if(this.listPageNo >= this.totalPages ){
                    this.$message({
                        message: '已经到底了~',
                        type: "warning"
                    });
                    return;

                }
                setTimeout(() => {
                    var nodes = this.manuscriptTreeDemo.getSelectedNodes();
                    var node = nodes[0]
                    // this.getList()
                    var data = {
                        token: this.token,
                        userId: this.userId,
                        pageNo: this.listPageNo,
                        pageSize: this.listPageSize,
                        data: {
                            parentId: node.id,
                            projectId: this.newProjId ? this.newProjId : this.pro_id
                        }
                    };
                    this.$post('/doc/paper/query',data)
                    .then((res) => {
                        if(this.requestCode.SUCCESS == res.code) {
                            this.flieNameData = this.flieNameData.concat(res.data.content)
                            // this.flieNameData = res.data.content
                            this.totalPages = res.data.totalPages
                            this.flieNameData.map(item => {
                                item.isEdit = false;
                                this.iconFilter(item)
                            })
                            // if(this.docLoction != '') {
                            //   if(this.listPageNo != this.nowPage) {
                            //     this.$nextTick(() => {//.lastElementChild.offsetTop
                            //       const selectWrap = document.querySelector('.el-table__body-wrapper')
                            //       selectWrap.scrollTop = document.querySelector("tbody").lastElementChild.offsetTop;
                            //       this.flieNameData.map((item,idx) => {
                            //         if(item.id == this.docLoction.id) {
                            //           console.log(item,'+',idx,document.querySelector("tbody"))
                            //           var nowNode = document.querySelector("tbody").childNodes[idx];
                            //           selectWrap.scrollTop = nowNode.offsetTop;
                            //           this.$refs.multipleTable.toggleRowSelection(item,true);
                            //         }
                            //       })
                            //     })
                            //   }
                            // }


                       if(this.docLoction != ''&& this.docLoction.parentId == this.manuscriptTreeDemo.getSelectedNodes()[0].id && document.querySelector("tbody").lastElementChild) {
                              if(this.listPageNo != this.nowPage && !this.positionFlag) {
                                  console.log(1.2)
                                this.$nextTick(() => {//.lastElementChild.offsetTop
                                console.log(1.3)

                                  const selectWrap = document.querySelector('.el-table__body-wrapper')
                                  selectWrap.scrollTop = document.querySelector("tbody").lastElementChild.offsetTop;
                                  
                                  this.flieNameData.map((item,idx) => {
                                    if(item.id == this.docLoction.id) {
                                        console.log(1.4)
                                      console.log(item,'+',idx,document.querySelector("tbody"))
                                      var nowNode = document.querySelector("tbody").childNodes[idx];
                                      selectWrap.scrollTop = nowNode.offsetTop;
                                      console.log('scrollTop',nowNode.offsetTop)
                                      this.$refs.multipleTable.toggleRowSelection(item,true);
                                      this.positionFlag = true;
                                    }
                                  })
                                })
                              }
                            }



                        } else {
                            this.$message({
                                message: res.msg,
                                type: "error"
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                    this.busy = true

                }, 100)

            }
        },
        getViewPortHeight() {
            return document.documentElement.clientHeight || document.body.clientHeight;
        },
        getTreeDataFn(itemId = null) { //获取初始树数据
            var treeProjId = itemId ? itemId : this.pro_id
            var data = {
                token: this.token,
                userId: this.userId,
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                data: {
                    docType: 1,
                    parentId: '0',
                    projectId: treeProjId
                }
            };
            this.$post('/doc/paper/getProjectPaperFileParentId',data)
            .then((res) => {
                if(this.requestCode.SUCCESS == res.code) {
                    this.zNodes = res.data.content;
                    this.zNodes.forEach((item) => {
                        if(item.docType === 1) {
                            item.isParent = true;
                            item.iconSkin = "diy01"
                        };
                    });
                    this.getTreeListFn(this.zNodes[0])

                    if(res.data.content.length != 0) {
                        if(this.navArray.length != 0) {
                            this.navArray[0] = this.zNodes[0]
                            this.navArray.splice(1)
                        } else {
                            this.navArray.push(this.zNodes[0]);
                            this.workCatalogueName = this.zNodes[0].docName;
                            this.workCatalogueParentId = this.zNodes[0].id;
                        }
                    } else {
                        this.navArray = [];
                    }
                    $.fn.zTree.init($("#manuscriptTree"), this.setting, this.zNodes);
                    this.manuscriptTreeDemo = $.fn.zTree.getZTreeObj("manuscriptTree"); //将目录树对象赋值给全局使用
                    var nodes = this.manuscriptTreeDemo.getNodes();
                    this.manuscriptTreeDemo.selectNode(nodes[0])
                    var ls = this.manuscriptTreeDemo.reAsyncChildNodesPromise(nodes[0], "refresh"); //执行强制ztree异步加载返回的是promise函数
                    if(res.data.content.length === 0) return;
                    ls.then(() => {

                           if(!!nodes[0]) {
                          // 解决根目录下文件无法定位的问题
                          this.locationFn(nodes)
                        //   nodes[0].children.length>0?this.locationFn(nodes[0].children):this.locationFn(nodes)
                      } 
                    //   this.locationFn(nodes)
                    })
                } else {
                    this.$message({
                        message: res.msg,
                        type: "error"
                    });
                }
            })
            .catch((error) => {
                console.log(error)
            })
        },
        getTreeListFn(itemValue) { //获取初始树列表
            this.listPageNo = 0;
            this.listPageSize = 10;
            this.busy = true;
            if(itemValue) {
                var data = {
                    token: this.token,
                    userId: this.userId,
                    pageNo: this.listPageNo,
                    pageSize: this.listPageSize,
                    data: {
                        parentId: itemValue.id,
                        projectId: this.newProjId ? this.newProjId : this.pro_id,
                        docType: 1
                    }
                };
                this.$post('/doc/paper/getProjectPaperFileParentId',data)
                .then((res) => {
                    if(this.requestCode.SUCCESS == res.code) {
                        this.flieNameData = res.data.content
                        this.totalPages = res.data.totalPages
                        this.flieNameData.map( item => {
                          if(item.docType != 1 && item.invalidTime) {
                            var timestamp1 = item.invalidTime.replace(/-/g,'/');
                            var timestamp2 = new Date(timestamp1).getTime();
                            var timestamp3 = this.dateToStr(new Date)
                            var timestamp5 = new Date(timestamp3).getTime()
                            var time =(timestamp2 - timestamp5) / 3600000;
                            var hm = time.toString().split('.')
                            var h = hm[0] <= 0 ? '' :  hm[0] + '小时';
                            var m =  Math.floor(('0.' +  hm[1]) * 60) <= 0 ? '' : Math.floor(('0.' +  hm[1]) * 60) + '分钟'
                            var timeOne = h + m
                            this.$set(item,'invalidTime',timeOne)
                          }
                          item.isEdit = false;
                          this.iconFilter(item)
                        })
                        // if(this.docLoction != '') {
                        //   if(this.docLoction.nowPage != 0) {
                        //     this.$nextTick(() => {
                        //       const selectWrap = document.querySelector('.el-table__body-wrapper')
                        //       selectWrap.scrollTop = document.querySelector("tbody").lastElementChild.offsetTop;
                        //     })
                        //   } else {
                        //     this.$nextTick(() => {//.lastElementChild.offsetTop
                        //       const selectWrap = document.querySelector('.el-table__body-wrapper')
                        //       selectWrap.scrollTop = document.querySelector("tbody").lastElementChild.offsetTop;
                        //       this.flieNameData.map((item,idx) => {
                        //         if(item.id == this.docLoction.id) {
                        //           console.log(item,'+',idx,document.querySelector("tbody"))
                        //           var nowNode = document.querySelector("tbody").childNodes[idx];
                        //           selectWrap.scrollTop = nowNode.offsetTop;
                        //           this.$refs.multipleTable.toggleRowSelection(item,true);
                        //         }
                        //       })
                        //     })
                        //   }
                        // }



        if(this.docLoction != ''&& this.docLoction.parentId == this.manuscriptTreeDemo.getSelectedNodes()[0].id && document.querySelector("tbody").lastElementChild) {
                              if(this.listPageNo != this.nowPage && !this.positionFlag) {
                                this.$nextTick(() => {//.lastElementChild.offsetTop
                                  const selectWrap = document.querySelector('.el-table__body-wrapper')
                                  console.log(document.querySelector("tbody").lastElementChild)
                                  selectWrap.scrollTop = document.querySelector("tbody").lastElementChild.offsetTop;
                                  this.flieNameData.map((item,idx) => {
                                    if(item.id == this.docLoction.id) {
                                    //   console.log(item,'+',idx,document.querySelector("tbody"))
                                      var nowNode = document.querySelector("tbody").childNodes[idx];
                                      selectWrap.scrollTop = nowNode.offsetTop;
                                      this.$refs.multipleTable.toggleRowSelection(item,true);
                                      this.positionFlag = true;
                                    }
                                  })
                                })
                              }
                            }





                    } else {
                        this.$message({
                            message: res.msg,
                            type: "error"
                        });
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
            } else {
                this.flieNameData = []
            }
        },
        locationFn(node) { //处理全文检索定过来的数据处理函数
          for( let i in node) {
            for(let j in this.docLoction.parent) {
              if(node[i].id == this.docLoction.parent[j].id) {
                // if(node[i].parentId != '0') {
                  this.manuscriptTreeDemo.selectNode(node[i])
                  //   this.manuscriptTreeDemo.reAsyncChildNodes(node[i], "refresh");
                  var ls = this.manuscriptTreeDemo.reAsyncChildNodesPromise(node[i], "refresh");
                  ls.then(() => {
                      this.locationFn(node[i].children)
                      this.getTreeListFn(node[i])
                        this.loadMore()
                        if(this.navArray.length == 0) {
                            this.navArray.push(node[i])
                        } else {
                            //   this.navArray = []
                            //   this.navFilterFn(node[i])
                            this.navArray = []
                            this.docLoction.parent.map((item, index) => {
                                let obj = [];
                                obj.docName = item.docName;
                                obj.id = item.id;
                                this.navArray.unshift(obj)
                            })
                        }
                  })
                  

                // }
                // this.locationFn(node[i].children)
              }
            }
          }
        },
        leftKey(e) { //左键处理事件
            if(e.button == 0) {
                this.rightmenuIsShow = false;
                this.renameFlag = true;
            }
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
                    pageNo: this.pageNo,
                    pageSize: this.pageSize,
                    data: {
                        docType: treeNode.docType,
                        parentId: treeNode.id,
                        projectId: this.newProjId ? this.newProjId : this.pro_id
                    }
                }
            } else {

                return  {
                    token: this.token,
                    userId: this.userId,
                    pageNo: this.pageNo,
                    pageSize: this.pageSize,
                    data: {
                        docType: 1,
                        parentId: 0,
                        projectId: this.newProjId ? this.newProjId : this.pro_id
                    }
                }
            }

        },
        onAsyncSuccessFn(event, treeId, treeNode, msg) { //异步树成功加载
            var zTree = $.fn.zTree.getZTreeObj(treeId);
	        zTree.updateNode(treeNode); // 异步加载成功后刷新树节点
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
                    if(item.docType === 1) {
                        item.isParent = true;
                        item.iconSkin = "diy01";
                        item.checked = false;
                    }
                })
                this.allChecked = false;
                return responseData.data.content;
            }
        },
        zTreeOnClickFn(e, treeId, treeNode) { //点击树
            this.manuscriptTreeDemo.expandNode(treeNode);
            this.targetTreeNode = treeNode
            this.clickType = 1
            this.workCatalogueName = treeNode.docName
            this.workCatalogueParentId = treeNode.id
            this.listPageNo = 0;
            this.listPageSize = 10;
            this.busy = true;
            this.listScrollTop.scrollTop = 0;
            if(treeNode.id) {
                var data = {
                    token: this.token,
                    userId: this.userId,
                    pageNo: this.listPageNo,
                    pageSize: this.listPageSize,
                    data: {
                        parentId: treeNode.id,
                        projectId: this.newProjId ? this.newProjId : this.pro_id,
                        docType: 1
                    }
                };
                this.$post('/doc/paper/getProjectPaperFileParentId',data)
                .then((res) => {
                    if(this.requestCode.SUCCESS == res.code) {
                        this.flieNameData = res.data.content
                        this.totalPages = res.data.totalPages
                        this.flieNameData.map(item => {
                            if(item.docType != 1 && item.invalidTime) {

                              var timestamp1 = item.invalidTime.replace(/-/g,'/');
                              var timestamp2 = new Date(timestamp1).getTime();

                              var timestamp3 = this.dateToStr(new Date)
                              var timestamp5 = new Date(timestamp3).getTime()
                              var time =(timestamp2 - timestamp5) / 3600000;
                              var hm = time.toString().split('.')
                              var h = hm[0] <= 0 ? '' :  hm[0] + '小时';
                              var m =  Math.floor(('0.' +  hm[1]) * 60) <= 0 ? '' : Math.floor(('0.' +  hm[1]) * 60) + '分钟'
                              var timeOne = h + m
                              this.$set(item,'invalidTime',timeOne)
                              }
                             item.isEdit = false;
                             this.iconFilter(item)
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
            if(this.navArray.length == 0) {
                this.navArray.push(treeNode)
            } else {
                this.navArray = []
                this.navFilterFn(treeNode)
            }
        },
        shrinkFn() { //底稿目录的推拉
            if (this.shrink_bac == 'shrink_bac_push') {
                this.shrink_bac = 'shrink_bac_pull'
                this.catalogueWidth = 300
            } else if(this.shrink_bac == 'shrink_bac_pull'){
                this.shrink_bac = 'shrink_bac_push'
                this.catalogueWidth = 25
            }
        },
        navClickFn(itemValue) { //点击导航
            this.listPageNo = 0;
            this.listPageSize = 10;
            this.busy = true;
            this.listScrollTop.scrollTop = 0
            var data = {
                token: this.token,
                userId: this.userId,
                pageNo: this.listPageNo,
                pageSize: this.listPageSize,
                data: {
                    parentId: itemValue.id,
                    projectId: this.newProjId ? this.newProjId : this.pro_id,
                    docType: 1
                }
            };
            this.$post('/doc/paper/getProjectPaperFileParentId',data)
            .then((res) => {
                if(this.requestCode.SUCCESS == res.code) {
                    this.flieNameData = res.data.content
                    this.totalPages = res.data.totalPages
                    this.flieNameData.map( item => {
                        if(item.docType != 1 && item.invalidTime) {
                        var timestamp1 = item.invalidTime.replace(/-/g,'/');
                          var timestamp2 = new Date(timestamp1).getTime();
                        var timestamp3 = this.dateToStr(new Date)
                          var timestamp5 = new Date(timestamp3).getTime()
                        var time =(timestamp2 - timestamp5) / 3600000;
                        var hm = time.toString().split('.')
                        var h = hm[0] <= 0 ? '' :  hm[0] + '小时';
                        var m =  Math.floor(('0.' +  hm[1]) * 60) <= 0 ? '' : Math.floor(('0.' +  hm[1]) * 60) + '分钟'
                        var timeOne = h + m
                        this.$set(item,'invalidTime',timeOne)
                        }
                        item.isEdit = false;
                        this.iconFilter(item)
                    })
                    var node = this.manuscriptTreeDemo.getNodeByParam("id", itemValue.id, null);
                    this.manuscriptTreeDemo.selectNode(node)
                    this.navArray.map((item,idx) => {
                        if (item.docName == itemValue.docName) {
                            this.navArray.splice(idx + 1, this.navArray.length - 1);
                        }
                    });

                } else {
                    this.$message({
                        message: res.msg,
                        type: "error"
                    });
                }
                // if(this.requestCode.SUCCESS == res.code) {
                //     this.flieNameData = res.data.content
                //     this.flieNameData.map(item => {
                //         item.isEdit = false;
                //         this.iconFilter(item);
                //     })
                //     this.totalPages = res.data.totalPages
                    
                // }
            })
            .catch((error) => {
                console.log(error)
            })
        },
        searchFn() { //全文检索
            if(this.search_input != '') {
                this.$router.push({
                    path: '/examineFullsearch',
                    query: {
                        searchName: this.search_input,
                        projectId: this.newProjId != '' ? this.newProjId : this.pro_id,
                        title: this.projectIdTitle,
                        sealFlag: 1
                    }
                });
            }else {
                return;
            };
        },
        selectFn(itemValue) { //check数据改变的
            this.selectFileNameArray = itemValue
            this.rightmenuIsShow = false;
        },
        dblclickFn(itemValue, event, column) { //双击每条数据
        if(column.type==="selection") return
            this.shrink_bac = 'shrink_bac_pull'
            this.catalogueWidth = 300
            this.rightmenuIsShow = false;
            this.clickType = 2
            this.dblclickData = itemValue;
            if(itemValue.docType == 0) {
                var proId = this.newProjId ? this.newProjId : this.pro_id
                var jurisdiction = rightSysPermissionFn(proId,'paper_file_file_preview')

                if(jurisdiction) {
                   if(itemValue.isLinkDelete != 1) {
                    //    alert(1)
                    //    return
                        var previewData = {
                            projectId:proId,
                            rfsId: itemValue.rfsId,
                            docId : itemValue.docId,
                            photoType: itemValue.type,
                            docName: itemValue.docName,
                            sourceType: 'examineManage',
                            sourceName: '底稿管理',//记录日志用
                            projectName: itemValue.projName//记录日志用
                        }
                        sessionStorage.setItem('examineManageProId', proId)
                        this.$store.commit('previewAllFn',previewData )

                    }
                } else {
                    this.$message({
                        message: '当前无权限',
                        type: "warning"
                    });
                }

            } else if(itemValue.docType == 1) {
                this.listPageNo = 0;
                this.listPageSize = 10;
                this.busy = true;
                this.listScrollTop.scrollTop = 0;
                var node = this.manuscriptTreeDemo.getNodeByParam("id", itemValue.id, null);
                node.children = []
                this.manuscriptTreeDemo.selectNode(node)
                this.manuscriptTreeDemo.reAsyncChildNodes(node, "refresh");
                this.getTreeListFn(node)
                this.navArray.map((item,idx) => {
                    if(item.parentId == itemValue.parentId) {
                        this.navArray.splice(idx,1,itemValue)
                    } else {
                        this.navArray.push(itemValue)
                        this.navArray = Array.from(new Set(this.navArray))
                    }
                })
            }
        },
        filter(node) {
            return node.docName == this.dblclickData.docName
        },
        Trim(str){ //去前后空格
            return str.replace(/(^\s*)|(\s*$)/g, ""); 
        },
        rightEvent(itemValue) { //右键事件
          console.log(22, itemValue)
            let isIEFlag = this.isIE(); //调用判断当前浏览器是否是ie
            let rightInerText = ''; //当前右键的文本内容
            let rightIsLinkDelete = ''; //当前右键的文件是不是不可右键的
            this.enterType = 2;
            console.log(111)
            if(!isIEFlag) {
                if(itemValue.path) {
                  rightInerText = itemValue.path[0].innerText;
                  rightIsLinkDelete = itemValue.path[0].isLinkDelete
                } else {
                  itemValue.originalTarget.innerText;
                  itemValue.originalTarget.innerText;
                }
            } else {
                rightInerText = itemValue.target.innerText
                rightIsLinkDelete = itemValue.target.isLinkDelete
            }
            if(this.flieNameData.length == 0) {
              
            } else {
                 let rightMenuItemData = this.flieNameData.filter(item => this.Trim(item.docName) === rightInerText);
                    //   let rightMenuItemData = this.flieNameData.filter(item => item.docName === rightInerText);
                this.rightMenuItemData = rightMenuItemData.length != 0 ? rightMenuItemData[0] : {};
                if(!rightMenuItemData.length || (this.rightMenuItemData && this.rightMenuItemData.isLinkDelete == 1)) {
                    return;
                }
                var flagArray = this.selectFileNameArray.filter(item => item.id === this.rightMenuItemData.id)
                if(flagArray.length == 0) {
                    this.$refs.multipleTable.clearSelection(this.selectFileNameArray,true);
                    rightMenuItemData.length != 0 && this.$refs.multipleTable.toggleRowSelection(this.rightMenuItemData,true);
                }
                this.rightmenuFn();
                rightMenuItemData.length != 0  && this.$refs.multipleTable.setCurrentRow(this.rightMenuItemData);


                // this.flieNameData.map((item, idx) => {
                //     if(item.docName === rightInerText) {
                //         this.rightMenuItemData = item;
                //         this.rightmenuFn()
                //     } else if(item.isLinkDelete === rightIsLinkDelete){
                //         return;
                //     }else {
                //         this.rightMenuItemData.empty = 'kong'
                //         this.rightmenuFn()
                //     }
                // })
            }

        },
        rightmenuFn() {
            var e = event;
            e.preventDefault();
            $("#rightM").css({
                display: "none"
            });
            this.rightmenuIsShow = true;
            setTimeout(() => {
                $("#rightM").css({
                    top: e.clientY + 10,
                    left: e.clientX + 10,
                    display: "block"
                });
                if (e.clientY + 10 >= $(window).height() - $("#rightM").height()) {
                    $("#rightM").css({
                        top: $(window).height() - $("#rightM").height() - 20
                    });
                } else if (e.clientX + 10 >= $(window).width() - $("#rightM").width()) {
                        $("#rightM").css({
                            left: $(window).width() - $("#rightM").width() - 20
                        });
                }
            }, 10);
        },
        rightMenuClick(data) {
            switch(data) {
                case 'preview' :
                    this.rightMenuPreview();
                    break;
                case 'download' :
                    this.rightMenuDownload();
                    break;
                case 'upload' :
                    this.rightMenuUploading();
                    break;
                case 'delete' :
                    this.rightMenuDelete();
                    break;
                case 'rename' :
                    this.rightMenuRename();
                    break;
                case 'copy' :
                    this.rightMenuCopy();
                    break;
                case 'paste':
                    this.rightMenuPaste();
                    break;
                case 'cut' :
                    this.rightMenuCut();
                    break;
                case 'lock' :
                    this.rightMenuLock();
                    break;
                case 'unlock' :
                    this.rightMenuUnLock();
                    break;
                case 'attributes' :
                    this.rightMenuDocpro();
                    break;
            }
        },
        rightMenuPreview() { //右键预览
          if(this.rightMenuItemData.isLinkDelete != 1) {
            var proId = this.newProjId ? this.newProjId : this.pro_id
              var previewData = {
                projectId: proId,
                  rfsId: this.rightMenuItemData.rfsId,
                  docId : this.rightMenuItemData.docId,
                  photoType: this.rightMenuItemData.type,
                  docName: this.rightMenuItemData.docName,
                  sourceType: 'examineManage',
                  sourceName: '底稿管理',//记录日志用
                  projectName: this.rightMenuItemData.projName//记录日志用
              }
              sessionStorage.setItem('examineManageProId', proId)
              this.$store.commit('previewAllFn',previewData )

          }
        },
        rightMenuDownload() { //右键下载
            this.borrowFileJurisdiction()
            .then((flag) => { //项目权限时候可以下载
              if(flag ) {
                if(this.selectFileNameArray.length != 0) {
                    var downloadArr = []
                    // PC端下载
                    if(this.$store.state.isPC) {
                        downloadArr = this.selectFileNameArray.map(item => {
                            if(item.docType != 1 && item.isLinkDelete != 1) {
                                return {
                                    docId: item.docId,
                                    docType: item.docType,
                                    id: item.id,
                                    docName: item.docName,
                                    source: 1, // 文件源： 1底稿 0项目文档 2客户文档
                                    parentId: item.parentId,
                                    projectId: item.projectId,
                                    parentName: item.parentName
                                }
                            }
                        })
                    }else {
                        downloadArr = this.selectFileNameArray.map(item => {
                        if(item.docType != 1 && item.isLinkDelete != 1) {
                            return {
                                    id: item.docId,
                                    name: item.docName
                                }
                            }
                        })
                    }
                    setTimeout(() => {
                        console.log(downloadArr)
                        this.$store.commit('download', downloadArr)
                    })
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请选中数据进行下载或批量下载(注：锁定文件和不可操作文件是不能下载的)'
                    });
                }
            } else {
                this.$message({
                    message: '当前无权限',
                    type: "warning"
                });
            }
            })


        },
        rightMenuDelete() { //右键删除
            var proId = this.newProjId ? this.newProjId : this.pro_id
            if(this.rightMenuItemData.docType == 1) {
                var jurisdiction = rightSysPermissionFn(proId,'paper_del_atalog')
            } else if (this.rightMenuItemData.docType == 0){
                var jurisdiction = rightSysPermissionFn(proId,'paper_file_file_del')
            }
            if(jurisdiction ) {
                if (this.selectFileNameArray.length <= 1) {
                    if(this.rightMenuItemData != '' && this.flieNameData.length != 0) {
                        if(this.rightMenuItemData.lockState != -1 ) {
                            this.$message({
                                message: '所选数据包含锁定文件不能删除',
                                type: "warning"
                            });
                        } else {
                            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                this.loading = this.$loading({
                                    lock: true,
                                    text: '数据过多正在删除中',
                                    spinner: 'el-icon-loading',
                                    background: 'rgba(0, 0, 0, 0.7)'
                                });
                              let quoteIdList = []
                              let dirIds = []
                              let docPaperIds = []
                              this.rightMenuItemData.quoteId
                                ? quoteIdList.push(item.id)
                                : (this.rightMenuItemData.docType===1 ? dirIds.push(item.id) : docPaperIds.push(item.id))

                                var data = {
                                    token: this.token,
                                    userId: this.userId,
                                    data: {
                                        docIds: this.rightMenuItemData.id,
                                      quoteIdList: quoteIdList, // 引用的目录
                                      dirIds: dirIds, // 自己创建的目录
                                      docPaperIds: docPaperIds, // 文件
                                    }
                                };
                                this.$post('/doc/paper/deletePaperDoc',data)
                                .then((res) => {
                                    this.loading.close();
                                    if(this.requestCode.SUCCESS == res.code) {
                                        this.delEchoingFn(this.rightMenuItemData, 3)
                                        this.rightmenuIsShow = false
                                    } else {
                                        this.$message({
                                            message: '删除失败',
                                            type: "error"
                                        });
                                    }
                                })
                                .catch((error) => {
                                    this.loading.close();
                                    console.log(error)
                                })
                            }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消删除'
                                });
                            });
                        }

                    } else {
                        this.$message({
                            type: 'warning',
                            message: '请选择数据进行删除'
                        });
                    }
                } else {
                    this.$message({
                        type: 'warning',
                        message: '此处删除只能删除单条'
                    });
                }
            } else {
                this.$message({
                    message: '当前无权限',
                    type: "warning"
                });
            }
        },
        rightMenuRename() { //右键重命名
            var proId = this.newProjId ? this.newProjId : this.pro_id
            if(this.rightMenuItemData.docType == 1) {
                var jurisdiction = rightSysPermissionFn(proId,'paper_rename_atalog')
            } else if (this.rightMenuItemData.docType == 0){
                var jurisdiction = rightSysPermissionFn(proId,'paper_file_file_rename')
            }
            if(jurisdiction ) {
                if(this.rightMenuItemData.lockState != -1 ) {
                    this.$message({
                        message: '所选数据包含锁定文件不能重命名',
                        type: "warning"
                    });
                } else {
                    var reg = /(\.)/g;
                    if(this.renameFlag) {
                        this.renameFlag = false
                        this.renameData = this.rightMenuItemData
                        this.flieNameData.map((item,idx) => {
                            if(item.id == this.renameData.id) {
                                item.isEdit = true;

                                if (item.docType == 1) {
                                    this.renameSuffix = ''
                                    this.editName_input = item.docName
                                } else if(item.docType == 0) {
                                    var matches = reg.exec(item.docName).index;
                                    this.renameSuffix = item.docName.substring(matches, item.docName.length)
                                    this.editName_input = item.docName.substring(0, matches)
                                }
                                this.flieNameData.splice(idx, 1, item)

                            }
                        })
                    } else {
                        this.$message({
                            message: '只能重命名一个',
                            type: "warning"
                        });
                    }
                }
            } else {
                this.$message({
                    message: '当前无权限',
                    type: "warning"
                });
            }

        },
        editNameFn() { //右键重命名后
            if(this.renameSuffix != '') {
                var beforName = this.renameData.docName.replace(this.renameData.docName.substr(this.renameData.docName.lastIndexOf(".")), "");
            } else {
                var beforName = this.renameData.docName
            }

            if(this.editName_input === beforName) {
                this.flieNameData.map((item,idx) => {
                    if(item.id == this.renameData.id) {
                        item.isEdit = false;
                        this.editName_input = '';
                        this.flieNameData.splice(idx, 1, item)
                        this.renameFlag = true
                    }
                })
            } else if(this.editName_input == ''){
                this.flieNameData.map((item,idx) => {
                    if(item.id == this.renameData.id) {
                        item.isEdit = false;
                        this.editName_input = '';
                        this.flieNameData.splice(idx, 1, item)
                        this.renameFlag = true
                    }
                })
                this.$message({
                    message: '名字不能为空',
                    type: "warning"
                });
            }else {
                this.renameEchoingFn(this.renameData, this.editName_input, 2)
            }

        },
        rightMenuCopy() { //右键复制
            var proId = this.newProjId ? this.newProjId : this.pro_id
            var jurisdiction = rightSysPermissionFn(proId,'paper_file_file_copy')
            if(jurisdiction ) {
                this.copyType = 1
                var idArray = []
                var id = ''
                if (this.selectFileNameArray.length != 0) {
                    this.selectFileNameArray.map((item,idx) => {
                        idArray.push(item.id)
                    })
                } else {
                    id = this.rightMenuItemData.id
                }
                this.copyStoreData.ids = this.selectFileNameArray.length != 0 ? idArray.join(',') : id
                this.copyStoreData.oldProjId = this.oldProjId
                this.copyStoreData.newProjId = this.newProjId
                this.copyStoreData.copyData = this.rightMenuItemData
                this.copyStoreData.copyType = this.copyType
                this.$store.commit('manuscriptCopyFn', this.copyStoreData)
                setTimeout(() => {
                    this.$message({
                        message: '复制成功',
                        type: "success"
                    });
                    this.rightmenuIsShow = false
                },100)
            } else {
                this.$message({
                    message: '当前无权限',
                    type: "warning"
                });
            }
        },
        rightMenuCut() { //右键剪切
            var proId = this.newProjId ? this.newProjId : this.pro_id
            var jurisdiction = rightSysPermissionFn(proId,'paper_file_file_shear')
            if(jurisdiction ) {
                this.selectFileNameArray.map(item => {
                    if(item.lockState != -1 ) {
                        this.$message({
                            message: '所选数据包含锁定文件不能剪切',
                            type: "warning"
                        });
                    } else {
                        this.copyType = 2
                        var idArray = []
                        var id = ''
                        if(this.selectFileNameArray.length != 0) {
                            this.selectFileNameArray.map((item,idx) => {
                                if(item.docType == 1) {
                                    this.$message({
                                        message : '当前选中有目录数据,暂不支持目录的剪切操作',
                                        type: "warning"
                                    });
                                } else {
                                    if (this.selectFileNameArray.length != 0) {
                                        this.selectFileNameArray.map((item,idx) => {
                                            idArray.push(item.id)
                                            idArray = Array.from(new Set(idArray))
                                            this.flieNameData.map((items,idx) => {
                                                if(items.id === item.id && items.docName == item.docName) {
                                                    this.flieNameData.splice(idx, 1)
                                                }
                                            })
                                        })
                                    } else {
                                        id = this.rightMenuItemData.id
                                        this.flieNameData.map((item,idx) => {
                                            if(item.id === id && item.docName == this.rightMenuItemData.docName) {
                                                this.flieNameData.splice(idx, 1)
                                            }
                                        })
                                    }
                                    this.copyStoreData.ids = this.selectFileNameArray.length != 0 ? idArray.join(',') : id
                                    this.copyStoreData.oldProjId = this.oldProjId
                                    this.copyStoreData.newProjId = this.newProjId
                                    this.copyStoreData.copyData = this.rightMenuItemData
                                    this.copyStoreData.copyType = this.copyType
                                    this.$store.commit('manuscriptCopyFn', this.copyStoreData)
                                    setTimeout(() => {
                                        this.$message({
                                            message: '剪切成功',
                                            type: "success"
                                        });
                                        this.rightmenuIsShow = false
                                    },100)
                                }
                            })
                        } else {
                            id = this.rightMenuItemData.id
                            this.flieNameData.map((item,idx) => {
                                if(item.id === id && item.docName == this.rightMenuItemData.docName) {
                                    this.flieNameData.splice(idx, 1)
                                }
                            })
                            this.copyStoreData.ids = this.selectFileNameArray.length != 0 ? idArray.join(',') : id
                            this.copyStoreData.oldProjId = this.oldProjId
                            this.copyStoreData.newProjId = this.newProjId
                            this.copyStoreData.copyData = this.rightMenuItemData
                            this.copyStoreData.copyType = this.copyType
                            this.$store.commit('manuscriptCopyFn', this.copyStoreData)
                            setTimeout(() => {
                                this.$message({
                                    message: '剪切成功',
                                    type: "success"
                                });
                                this.rightmenuIsShow = false
                            },100)
                        }
                    }
                })
            } else {
                this.$message({
                    message: '当前无权限',
                    type: "warning"
                });
            }

        },
        rightMenuPaste() { //右键粘贴
            var copyData =  this.$store.state.manuscriptCopy
            var nodes = this.manuscriptTreeDemo.getSelectedNodes();
            var node = nodes[0]
            if(copyData.copyType == 1) {
                //复制过来的
                var data = {
                    token: this.token,
                    userId: this.userId,
                    pageNo: 0,
                    pageSize: 10,
                    data: {
                        ids: copyData.ids,
                        projId: copyData.newProjId != '' ? copyData.newProjId : copyData.oldProjId,
                        sourceProjId: copyData.oldProjId,
                        parentId: node.id
                    }
                };

                this.$post('/doc/paper/copyPaperDocs',data)
                .then((res) => {
                    if(this.requestCode.SUCCESS == res.code) {
                        this.copyEchoingFn(node)
                    } else {
                        this.$message({
                            message: res.msg,
                            type: "error"
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            } else if(copyData.copyType == 2) {
                //剪切过来的
                var data = {
                    token: this.token,
                    userId: this.userId,
                    pageNo: 0,
                    pageSize: 10,
                    data: {
                        ids: copyData.ids,
                        projId: copyData.newProjId != '' ? copyData.newProjId : copyData.oldProjId,
                        sourceProjId: copyData.oldProjId,
                        parentId: node.id
                    }
                };
                this.$post('/doc/paper/cutPaperDocs',data)
                .then((res) => {
                    if(this.requestCode.SUCCESS == res.code) {
                        this.copyEchoingFn(node)
                    } else {
                        this.$message({
                            message: res.msg,
                            type: "error"
                        });
                    }
                    this.rightmenuIsShow = false;
                })
                .catch((error) => {
                    console.log(error);
                });
            }

        },
        rightMenuLock() { //右键锁定
            var proId = this.newProjId ? this.newProjId : this.pro_id
            var jurisdiction = rightSysPermissionFn(proId,'paper_file_file_lock')
            if(jurisdiction ) {
                if (this.selectFileNameArray.length <= 1) {
                    var data = {
                        token: this.$store.state.loginObject.userToken,
                        userId: this.$store.state.loginObject.userId,
                        pageNo: 0,
                        pageSize: 10,
                        data: {
                            docId: this.rightMenuItemData.docId,
                            projId: this.newProjId ? this.newProjId : this.pro_id,
                        }
                    };
                    this.$post('/doc/paper/setDocLock',data)
                    .then((res) => {
                        if(this.requestCode.SUCCESS == res.code) {
                            this.rightmenuIsShow = false
                            this.DocLockEchoingFn(this.rightMenuItemData)
                            this.$message({
                                message: '当前文件锁定成功',
                                type: "success"
                            });
                        } else if (this.requestCode.UPD_FAIL == res.code) {
                            this.rightmenuIsShow = false
                            this.$message({
                                message: '当前文件未能锁定成功',
                                type: "error"
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                } else {
                    this.$message({
                        type: 'warning',
                        message: '此处锁定只能锁定单条'
                    });
                }
            } else {
                this.$message({
                    message: '当前无权限',
                    type: "warning"
                });
            }
        },
        rightMenuUnLock() { //右键文件解锁
            var data = {
                token: this.$store.state.loginObject.userToken,
                userId: this.$store.state.loginObject.userId,
                pageNo: 0,
                pageSize: 10,
                data: {
                    docId: this.rightMenuItemData.docId,
                    projId: this.newProjId ? this.newProjId : this.pro_id,
                }
            };
            this.$post('/doc/paper/setDocUnLock',data)
            .then((res) => {
                this.rightmenuIsShow = false;
                if(this.requestCode.SUCCESS == res.code) {
                    this.DocLockEchoingFn(this.rightMenuItemData)
                    this.$message({
                        message: '当前文件解锁成功',
                        type: "success"
                    });
                } else if (this.requestCode.UPD_FAIL == res.code) {
                    this.$message({
                        message: '当前文件未能解锁成功',
                        type: "error"
                    });
                } else {
                    this.$message.error(res.msg);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        },
        below(url, data) { //下载模拟form表单
            var allUrl = this.reqApi + url;
            var form = $("<form></form>");
            form.attr("method", "post");
            form.attr("action", allUrl);
            form.attr("Content-Type", "application/json;charset=UTF-8");
            form.attr("dataType", "json");
            var input1 = $('<input name="random" style="opacity:0"/>');
            input1.val(data.random);
            var input2 = $('<input name="fileName" style="opacity:0"/>');
            input2.val(data.fileName);
            var input3 = $('<input name="files" style="opacity:0"/>');
            input3.val(data.files);
            form.append(input1);
            form.append(input2);
            form.append(input3);

            $("body").append(form);
            form.submit().remove();
        },
        DocLockEchoingFn(itemValue) {//封装锁定回显列表刷新
            var nodeParent = this.manuscriptTreeDemo.getNodeByParam("id", itemValue.parentId, null);
            this.getTreeListFn(nodeParent)
        },
        versionEchoingFn(itemValue) { //封装版本回显列表刷新
            var nodeParent = this.manuscriptTreeDemo.getNodeByParam("id", itemValue.parentId, null);
            this.getTreeListFn(nodeParent)
        },
        delEchoingFn(itemValue,delType) { //封装删除回显示处理
            //delType 删除类型 1.树的删除 2.导航标签 3.右键
            if(delType == 1) {
                var nodeParent = itemValue.getParentNode();
                if(nodeParent) {
                    nodeParent.isParent = true;
                    this.manuscriptTreeDemo.reAsyncChildNodes(nodeParent, "refresh");
                    this.manuscriptTreeDemo.selectNode(nodeParent)
                    this.getTreeListFn(nodeParent)
                } else {
                    this.flieNameData = []
                }
            } else if(delType == 2 || delType == 3) {
                var nodeParent = this.manuscriptTreeDemo.getNodeByParam("id", itemValue.parentId, null);
                if (itemValue.docType == 0) { //0.文件
                    this.getTreeListFn(nodeParent)
                } else if(itemValue.docType == 1) { //1.目录
                    this.manuscriptTreeDemo.reAsyncChildNodes(nodeParent, "refresh");
                    this.getTreeListFn(nodeParent)
                }
            }
            this.navArray.map((item,idx) => {
                if(item.id == itemValue.id) {
                    this.navArray.splice(idx, 1)
                } else {
                    return;
                }
            })
            this.$message({
                message: '删除成功(含有文件锁或特殊文件是不允许删除的)',
                type: "success"
            });
        },
        renameEchoingFn(itemValue, itemName,renameType) { //封装重命名回显示处理
            //itemValue 当前重命名的数据
            //itemName 当前输入的名字
            //renameType 编辑类型 1.树的重命名 2.右键
            itemName = this.stripscript(itemName);
            var data = {
                token: this.token,
                userId: this.userId,
                data: {
                    docSource: '1',
                    projectId: this.newProjId ? this.newProjId : this.pro_id,
                    parentId: itemValue.parentId,
                    docName: itemName + this.renameSuffix,
                }
            }
            this.$post('/doc/project/validate/docNameByDocSource',data)
            .then((res) => {
                if(this.requestCode.SUCCESS == res.code) {
                    if(itemName + this.renameSuffix == res.data) {
                        var data = {
                            token: this.token,
                            userId: this.userId,
                            data: {
                                id: itemValue.id,
                                docName: res.data,
                                originaName: this.renameData.docName,
                                docSource: '1'
                            }
                        }
                        this.$post('/doc/paper/reName',data)
                        .then((res) => {
                            if(this.requestCode.SUCCESS == res.code) {
                                if(renameType == 2) {
                                    this.renameFlag = true
                                    this.flieNameData.map((item,idx) => {
                                        if(item.id == this.renameData.id) {
                                            item.isEdit = false;
                                        }
                                    })
                                    var nodeParent = this.manuscriptTreeDemo.getNodeByParam("id", itemValue.parentId, null);
                                    this.manuscriptTreeDemo.reAsyncChildNodes(nodeParent, "refresh");
                                    this.getTreeListFn(nodeParent)
                                } else if(renameType == 1) {
                                    this.navArray.map((item,idx) => {
                                        if(item.id == itemValue.id) {
                                            item.docName = itemName
                                        }
                                    })
                                }
                                this.$message({
                                    message: '编辑成功',
                                    type: "success"
                                });
                            } else {
                                this.$message({
                                    message: '编辑失败',
                                    type: "error"
                                });
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                        return true
                    } else {
                        var newName = res.data
                        this.$confirm(`您确定要使用${res.data}来当作文件的名字`, '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            var data = {
                                token: this.token,
                                userId: this.userId,
                                data: {
                                    id: itemValue.id,
                                    docName: res.data,
                                    docSource: '1'
                                }
                            }
                            this.$post('/doc/paper/reName',data)
                            .then((res) => {
                                if(this.requestCode.SUCCESS == res.code) {
                                    if(renameType == 2) {
                                        this.renameFlag = true
                                        this.flieNameData.map((item,idx) => {
                                            if(item.id == this.renameData.id) {
                                                item.isEdit = false;
                                                item.docName = newName
                                                this.flieNameData.splice(idx,idx + 1, item)
                                            }
                                        })
                                        var nodeParent = this.manuscriptTreeDemo.getNodeByParam("id", itemValue.parentId, null);
                                        this.manuscriptTreeDemo.reAsyncChildNodes(nodeParent, "refresh");
                                        this.getTreeListFn(nodeParent)
                                    } else if(renameType == 1) {
                                        var nodeParent = this.manuscriptTreeDemo.getNodeByParam("id", itemValue.parentId, null);
                                        this.manuscriptTreeDemo.reAsyncChildNodes(nodeParent, "refresh");
                                        this.navArray.map((item,idx) => {
                                            if(item.id == itemValue.id) {
                                                item.docName = newName
                                            }
                                        })
                                    }
                                    this.$message({
                                        message: '编辑成功',
                                        type: "success"
                                    });
                                } else {
                                    this.$message({
                                        message: '编辑失败',
                                        type: "error"
                                    });
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                            return true
                        }).catch(() => {
                            if(renameType == 1) {
                                var nodeParent = itemValue.getParentNode();
                                this.manuscriptTreeDemo.reAsyncChildNodes(nodeParent, "refresh");
                            }
                            return false
                        });
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            })
        },
        copyEchoingFn(itemValue) { //封装粘贴处理回显列表刷新
            var nodeParent = this.manuscriptTreeDemo.getNodeByParam("id", itemValue.id, null);
            this.manuscriptTreeDemo.reAsyncChildNodes(nodeParent, "refresh");
            this.getTreeListFn(nodeParent)
            this.$message({
                message : '粘贴成功',
                type: "success"
            });
        },
        navFilterFn(node) {
            if(!node){
                // return; 中断执行
                return;
            }
            this.navArray.unshift({
                id: node.id,
                docName: node.docName
            })
            var parentNode = node.getParentNode()
            if (parentNode) {
                this.navFilterFn(parentNode)
            }

            return this.navArray
        },
        renderSize(value){ //过滤处理文件大小
            if(null==value||value==''){
                return "0 Bytes";
            }
            var unitArr = new Array("Bytes","KB","MB","GB","TB","PB","EB","ZB","YB");
            var index=0;
            var srcsize = parseFloat(value);     index=Math.floor(Math.log(srcsize)/Math.log(1024));
            var size =srcsize/Math.pow(1024,index);
            size=size.toFixed(2);//保留的小数位数
            return size+unitArr[index];
        },
        stripscript(s) { //过滤重命名的特殊符号
            var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
            var rs = "";
            for (var i = 0; i < s.length; i++) {
                rs = rs+s.substr(i, 1).replace(pattern, '');
            }
            return rs;
        },
        iconFilter(itemValue) { //过滤重命名的icon
            if (itemValue.docType == 1) {
               itemValue.fileIcon = require("../../common/fileIcon/FolderType1.png");
            } else {
                var hz_name = itemValue.type.toLowerCase();
                if (hz_name == "doc" || hz_name == "docx" || hz_name == "rtf") {
                    itemValue.fileIcon = require("../../common/fileIcon/DocType.png");
                } else if (
                    hz_name == "xls" ||
                    hz_name == "xlsx" ||
                    hz_name == "excel"
                    ) {
                    itemValue.fileIcon = require("../../common/fileIcon/XlsType.png");
                } else if (
                    hz_name == "ppt" ||
                    hz_name == "pptx" ||
                    hz_name == "pps" ||
                    hz_name == "ppsx" ||
                    hz_name == "ppsm"
                    ) {
                        itemValue.fileIcon = require("../../common/fileIcon/PptType.png");
                } else if (
                    hz_name == "jpg" ||
                    hz_name == "jpeg" ||
                    hz_name == "gif" ||
                    hz_name == "bmp" ||
                    hz_name == "png"
                    ) {
                    itemValue.fileIcon = require("../../common/fileIcon/ImgType.png");
                } else if (
                    hz_name == "wmv" ||
                    hz_name == "avi" ||
                    hz_name == "dat" ||
                    hz_name == "asf" ||
                    hz_name == "rm" ||
                    hz_name == "rmvb" ||
                    hz_name == "mpg"
                    ) {
                    itemValue.fileIcon = require("../../common/fileIcon/VideoType.png");
                } else if (
                    hz_name == "mpeg" ||
                    hz_name == "mkv" ||
                    hz_name == "dvix" ||
                    hz_name == "dv" ||
                    hz_name == "flv" ||
                    hz_name == "mov" ||
                    hz_name == "mp4" ||
                    hz_name == "qt" ||
                    hz_name == "smil" ||
                    hz_name == "swf" ||
                    hz_name == "wmv" ||
                    hz_name == "3gp"
                    ) {
                    itemValue.fileIcon = require("../../common/fileIcon/VideoType.png");
                } else if (
                    hz_name == "mp3" ||
                    hz_name == "wav" ||
                    hz_name == "wma" ||
                    hz_name == "mid"
                    ) {
                    itemValue.fileIcon = require("../../common/fileIcon/MusicType.png");
                } else if (hz_name == "pdf") {
                    itemValue.fileIcon = require("../../common/fileIcon/PdfType.png");
                } else if (hz_name == "indd") {
                    itemValue.fileIcon = require("../../common/fileIcon/indd.png");
                } else if (hz_name == "ai") {
                    itemValue.fileIcon = require("../../common/fileIcon/ai.png");
                } else if (hz_name == "psd") {
                    itemValue.fileIcon = require("../../common/fileIcon/ps.png");
                } else if (hz_name == "tif") {
                    itemValue.fileIcon = require("../../common/fileIcon/tiff.png");
                } else if (hz_name == "zip" || hz_name == "rar") {
                    itemValue.fileIcon = require("../../common/fileIcon/RarType.png");
                } else {
                    itemValue.fileIcon = require("../../common/fileIcon/other.png");
                }
            }
        },
        isIE() { //ie?
            if (!!window.ActiveXObject || "ActiveXObject" in window){
                return true;
            } else {
                return false;
            }
        },
        async borrowFileJurisdiction() {
          let data = {
              token: this.$store.state.loginObject.userToken,
              userId: this.$store.state.loginObject.userId,
              data: {
                  projectId: this.newProjId ? this.newProjId : this.pro_id
              }
          };
          return await this.$post('/doc/project/selectDocPaperBorrPermissForProjectId',data)
          .then((res) => {
              if(this.requestCode.SUCCESS != res.code) {
                this.$message.error(res.msg);
                return;
              }
              return res.data? true : false;
          })
          .catch((error) => {
              console.log(error);
          });
        },
        dateToStr(datetime = null){
          var dateTime = new Date(datetime);
          var year = dateTime.getFullYear();
          var month = dateTime.getMonth()+1;//js从0开始取
          var date = dateTime.getDate();
          var hour = dateTime.getHours();
          var minutes = dateTime.getMinutes();
          var second = dateTime.getSeconds();

          if(month<10){
              month = "0" + month;
          }
          if(date<10){
              date = "0" + date;
          }
          if(hour <10){
              hour = "0" + hour;
          }
          if(minutes <10){
              minutes = "0" + minutes;
          }
          if(second <10){
              second = "0" + second ;
          }
          return year+"-"+month+"-"+date+" "+hour+":"+minutes+":"+second;
        },
    },
    directives: { //自定义指令
        loadmore: {
            bind(el, binding) {
                const selectWrap = el.querySelector('.el-table__body-wrapper')           
                selectWrap.addEventListener('scroll', function() {              
                    let sign = 30;           
                    const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight;
                    console.log('scrollDistance', scrollDistance)
                    if( this.scrollHeight == this.clientHeight ) return //没有滚动条                 
                    if (scrollDistance <= sign) {
                        console.log('hahh2')   
                        binding.value()                 
                    }           
                })


            }
        }
    }
}
</script>
<style lang="scss" scoped>
    #manuscriptmanage{

        width: 100%;
        display: flex;
        .bottom_catalogue{
            width: 100%;
            height: 100%;
            background: #FFFFFF;
            float: left;
            display: flex;
            flex-direction: column;

            position: relative;
            .catalogue_tree{
                width: 100%;
                height: 93%;
                .ztree {
                    width: 100%;
                    height: 100%;
                    background:  #fff;
                }
            }
            .shrink_bac_pull{
                width: 16px;
                height: 47px;
                display: inline-block;
                background: url('../../../assets/manuscript_icon/leftpull_icon.png') no-repeat;
                background-size: 100% 100%;
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
                margin:auto;
                cursor: pointer;
            }
            .shrink_bac_push{
                width: 16px;
                height: 47px;
                display: inline-block;
                background: url('../../../assets/manuscript_icon/rightpush_icon.png') no-repeat;
                background-size: 100% 100%;
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
                margin:auto;
                cursor: pointer;
            }
        }
        .bottom_indexpage{
            width: 100%;
            height: 100%;
            background: #FFFFFF;
            float: left;
            margin-left: 6px;
            overflow: hidden;
            .indexpage_header{
                width: 100%;
                height: 75px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #D7D7D7;
                .header_title{
                    margin-left: 21px;
                    display: flex;
                    align-items: center;
                    .title_portrait_icon{
                        width: 35px;
                        height: 35px;
                        display: inline-block;
                        background: url('../../../assets/manuscript_icon/title_portrait_icon.png') no-repeat;
                        background-size: 35px 35px;

                    }
                    .title_name{
                        // display: flex;
                        // justify-content: flex-start;
                        margin-left: 8px;
                        .title_select{
                            width: 200px;
                        }


                    }
                }
            }
            .indexpage_nav{
                width: 100%;
                height: 60px;
                display: flex;
                flex-direction: column;
                border-bottom: 1px solid #DDDDDD;
                .nav_title{
                    height: 30px;
                    display: flex;
                    justify-content: space-between;
                    align-items:center;
                    margin: 20px 0 0 19px;
                    .title_left{
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        .title_nav{
                            width: 80%;
                            height: 28px;
                            border:1px solid #D7D7D7;
                            margin-left: 5px;
                            padding-left: 7px;
                            background: #F7F8FA;
                            border-radius: 1px;
                            display: flex;
                            align-items: center;
                            font-size: 13px;
                            overflow: hidden;
                            font-family: MicrosoftYaHei;
                            .title_nav_index{
                                display: flex;
                                align-items: center;
                                line-height: 28px;
                                margin-left: 7px;
                                cursor: pointer;
                                .title_nav_index_icon{
                                    width: 15px;
                                    height: 15px;
                                    background: url('../../../assets/manuscript_icon/index_icon.png') no-repeat;
                                    background-size: 13px 11px;
                                    margin-right: 2px;
                                    display: inline-block;
                                }
                                span{
                                    width: 28px;
                                    text-align: left;
                                    display: inline-block;
                                }
                            }
                            .title_nav_chunk{
                                display: flex;
                                align-items: center;
                                line-height: 28px;
                                margin-left: 7px;
                                cursor: pointer;
                                .title_nav_chunk_icon{
                                    width: 9px;
                                    height: 11px;
                                    background: url('../../../assets/manuscript_icon/next_icon.png') no-repeat;
                                    background-size: 9px 11px;
                                    margin-right: 5px;
                                    display: inline-block;
                                }
                                span{
                                    width: 70px;
                                    text-align: left;
                                    display: inline-block;
                                    overflow:hidden;
                                    text-overflow:ellipsis;
                                    white-space:nowrap;

                                }
                            }
                        }
                    }
                    .title_right{
                        width: 226px;
                        height: 100%;
                        margin-right: 20px;

                    }
                }
                .nav_operation{
                    height: 30px;
                    margin: 20px 0 20px 19px;
                    display: flex;
                    .operation_chunk{
                        background: #F2F3F5;
                        margin-right: 12px;
                        display: flex;
                        align-items: center;
                        border-radius: 2px;
                        .chunk_icon{
                            display: inline-block;
                            margin: 8px 7px 7px 18px;
                        }
                        .cite_icon{
                            width: 17px;
                            height: 15px;
                            background: url('../../../assets/manuscript_icon/cite_icon.png') no-repeat;
                            background-size: 17px 15px;
                        }
                        .uploading_icon{
                            width: 17px;
                            height: 15px;
                            background: url('../../../assets/manuscript_icon/uploading_icon.png') no-repeat;
                            background-size: 14px 14px;
                        }
                        .download_icon{
                            width: 17px;
                            height: 15px;
                            background: url('../../../assets/manuscript_icon/download_icon.png') no-repeat;
                            background-size: 14px 14px;
                        }
                        .del_icon{
                            width: 17px;
                            height: 15px;
                            background: url('../../../assets/manuscript_icon/del_icon.png') no-repeat;
                            background-size: 14px 14px;
                        }
                        .versions_icon{
                            width: 17px;
                            height: 15px;
                            background: url('../../../assets/manuscript_icon/versions_icon.png') no-repeat;
                            background-size: 14px 14px;
                        }
                        .postil_icon{
                            width: 17px;
                            height: 15px;
                            background: url('../../../assets/manuscript_icon/postil_icon.png') no-repeat;
                            background-size: 14px 14px;
                        }
                        .discuss_icon{
                            width: 17px;
                            height: 15px;
                            background: url('../../../assets/manuscript_icon/discuss_icon.png') no-repeat;
                            background-size: 14px 14px;
                        }
                        .chunk_name{
                            padding-right: 12px;
                        }
                    }
                    .operation_chunk:hover{
                        cursor: pointer;
                    }
                    .operation_cite_chunk:hover{
                        background: #1A5FA4;
                        color: #FFFFFF;
                        font-size: 14px;
                        cursor: pointer;
                        .cite_icon{
                            width: 17px;
                            height: 15px;
                            background: url('../../../assets/manuscript_icon/cite_hover_icon.png') no-repeat;
                            background-size: 17px 15px;
                        }
                    }
                    .operation_uploading_chunk:hover{
                        background: #1A5FA4;
                        color: #FFFFFF;
                        font-size: 14px;
                        .uploading_icon{
                            width: 17px;
                            height: 15px;
                            background: url('../../../assets/manuscript_icon/uploading_hover_icon.png') no-repeat;
                            background-size: 14px 14px;
                        }
                    }
                    .operation_download_chunk:hover{
                        background: #1A5FA4;
                        color: #FFFFFF;
                        font-size: 14px;
                        .download_icon{
                            width: 17px;
                            height: 15px;
                            background: url('../../../assets/manuscript_icon/download_hover_icon.png') no-repeat;
                            background-size: 14px 14px;
                        }
                    }
                    .operation_del_chunk:hover{
                        background: #1A5FA4;
                        color: #FFFFFF;
                        font-size: 14px;
                        .del_icon{
                            width: 17px;
                            height: 15px;
                            background: url('../../../assets/manuscript_icon/del_hover_icon.png') no-repeat;
                            background-size: 14px 14px;
                        }
                    }
                        .operation_versions_chunk:hover{
                        background: #1A5FA4;
                        color: #FFFFFF;
                        font-size: 14px;
                        .versions_icon{
                            width: 17px;
                            height: 15px;
                            background: url('../../../assets/manuscript_icon/versions_hover_icon.png') no-repeat;
                            background-size: 14px 14px;
                        }
                    }
                        .operation_postil_chunk:hover{
                        background: #1A5FA4;
                        color: #FFFFFF;
                        font-size: 14px;
                        .postil_icon{
                            width: 17px;
                            height: 15px;
                            background: url('../../../assets/manuscript_icon/postil_hover_icon.png') no-repeat;
                            background-size: 14px 14px;
                        }
                    }
                    //  .operation_uploading_chunk:hover{
                    //     background: #1A5FA4;
                    //     color: #FFFFFF;
                    //     font-size: 14px;
                    //     .uploading_icon{
                    //         width: 17px;
                    //         height: 15px;
                    //         background: url('../../../assets/manuscript_icon/uploading_hover_icon.png') no-repeat;
                    //         background-size: 17px 15px;
                    //     }
                    // }
                }
                span{
                    display: inline-block;
                }
            }
            .indexpage_list{
                width: 100%;
                .list_name{
                    display: flex;
                    align-items: center;
                    .list_name_icon{
                        width: 23px;
                        height: auto;
                        margin-right: 8px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        img{
                            width: 100%;
                            height: auto;
                        }
                    }
                    .list_name_rename{
                        display: flex;
                        align-items: center;
                        .el-input{
                            width: 550px;
                        }
                        i{
                            margin-left: 5px;
                            width: 15px;
                            height: 15px;
                            border-radius: 50%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            color: #add7a0;
                        }
                    }
                    .list_name_title_die{
                        text-decoration:line-through;
                        color: #2A383F;
                        font-size: 14px;
                    }
                    .list_name_title {
                        display: flex;
                        flex-direction: column;
                        overflow:hidden;
                        text-overflow:ellipsis;
                        white-space:nowrap;
                        div{
                            width: 100%;
                            color: #2A383F;
                            font-size: 14px;
                            overflow:hidden;
                            text-overflow:ellipsis;
                            white-space:nowrap;
                        }
                        .list_name_title_icon{
                            display: inline-block;
                            display: flex;
                            .list_name_title_lock{
                                display: inline-block;
                                width: 9px;
                                height: 10px;
                                background: url('../../../assets/manuscript_icon/lock_icon.png') no-repeat;
                                background-size: 9px 10px;
                            }
                            .list_name_title_auditStatus_pass{
                                display: inline-block;
                                width: 28px;
                                height: 12px;
                                background: url('../../../assets/common_icon/pass_icon.png') no-repeat;
                                background-size: 28px 12px;
                                margin-left: 3px;
                            }
                            .list_name_title_auditStatus_noPass{
                                display: inline-block;
                                width: 28px;
                                height: 12px;
                                background: url('../../../assets/common_icon/noPass_icon.png') no-repeat;
                                background-size: 28px 12px;
                                margin-left: 3px;
                            }

                        }

                    }
                }
                .list_time{
                    width: 100%;
                    display: flex;

                    flex-direction: column;
                    div{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: #999999;
                        color: #333333;
                        font-size: 12px;
                        overflow:hidden;
                        text-overflow:ellipsis;
                        white-space:nowrap;
                        .list_time_updateUserName{
                            display: inline-block;

                        }

                    }

                }
            }
            // .indexpage_list{
            //     width: 100%;
            //     .list_title_row{
            //         height: 40px;
            //         .t_row_col_opera{
            //             height: 100%;
            //             display: flex;
            //             align-items: center;
            //             .t_col_opera_chunk{
            //                 margin-left: 15px;
            //                 display: flex;
            //                 align-items: center;
            //             }
            //         }
            //         .t_row_col_modtime{
            //             height: 100%;
            //             display: flex;
            //             justify-content: center;
            //             align-items: center;
            //         }
            //         .t_row_col_size{
            //             height: 100%;
            //             display: flex;
            //             justify-content: center;
            //             align-items: center;
            //         }
            //     }
            //     .list_content_row{
            //         cursor: pointer;
            //         height: 50px;
            //         .c_row_col_opera{
            //             height: 100%;
            //             display: flex;
            //             align-items: center;
            //             .c_col_opera_chunk{
            //                 margin-left: 15px;
            //                 display: flex;
            //                 align-items: center;
            //                 .c_col_opera_chunk_icon{
            //                     width: 23px;
            //                     height: auto;
            //                     margin-right: 8px;
            //                     display: flex;
            //                     justify-content: center;
            //                     align-items: center;
            //                     img{
            //                         width: 100%;
            //                         height: auto;
            //                     }
            //                 }
            //                 .c_col_opera_chunk_rename{
            //                     display: flex;
            //                     align-items: center;
            //                     .el-input{
            //                         width: 550px;
            //                     }
            //                     i{
            //                         margin-left: 5px;
            //                         width: 15px;
            //                         height: 15px;
            //                         border-radius: 50%;
            //                         display: flex;
            //                         justify-content: center;
            //                         align-items: center;
            //                         color: #add7a0;
            //                     }
            //                 }
            //                 .c_col_opera_chunk_die{
            //                     text-decoration:line-through;
            //                     color: #2A383F;
            //                     font-size: 14px;
            //                 }
            //                 .c_col_opera_chunk_title{
            //                     width: 600px;
            //                     display: flex;
            //                     flex-direction: column;
            //                     overflow:hidden;
            //                     text-overflow:ellipsis;
            //                     white-space:nowrap;
            //                     text-align: left;
            //                     div{
            //                         color: #2A383F;
            //                         font-size: 14px;
            //                         overflow:hidden;
            //                         text-overflow:ellipsis;
            //                         white-space:nowrap;
            //                     }
            //                     .c_col_opera_chunk_title_icon{
            //                         display: inline-block;
            //                         display: flex;
            //                         margin-top: 2px;
            //                         .c_col_opera_chunk_title_lock{
            //                             display: inline-block;
            //                             width: 9px;
            //                             height: 10px;
            //                             background: url('../../../assets/manuscript_icon/lock_icon.png') no-repeat;
            //                             background-size: 9px 10px;
            //                         }
            //                         .c_col_opera_chunk_title_auditStatus_pass{
            //                             display: inline-block;
            //                             width: 28px;
            //                             height: 12px;
            //                             background: url('../../../assets/common_icon/pass_icon.png') no-repeat;
            //                             background-size: 28px 12px;
            //                             margin-left: 3px;
            //                         }
            //                         .c_col_opera_chunk_title_auditStatus_noPass{
            //                             display: inline-block;
            //                             width: 28px;
            //                             height: 12px;
            //                             background: url('../../../assets/common_icon/noPass_icon.png') no-repeat;
            //                             background-size: 28px 12px;
            //                             margin-left: 3px;
            //                         }

            //                     }
            //                 }
            //             }
            //         }
            //         .c_row_col_time{

            //             .c_col_time_chunk{
            //                 display: flex;
            //                 flex-direction: column;
            //                 justify-content: flex-end;
            //                 .c_col_time_chunk_updateTime{
            //                     display: flex;
            //                     justify-content: flex-end;
            //                     color: #999999;
            //                     font-size: 12px;
            //                 }
            //                 div{
            //                     display: flex;
            //                     justify-content: flex-end;
            //                     color: #999999;
            //                     .c_col_time_chunk_updateUserName{
            //                         display: inline-block;
            //                         width: 60px;
            //                         color: #333333;
            //                         font-size: 12px;
            //                         margin-left: 5px;
            //                         overflow:hidden;
            //                         text-overflow:ellipsis;
            //                         white-space:nowrap;
            //                     }
            //                     .c_col_time_chunk_docVersionNumber{
            //                         color: #275AA6;
            //                         font-size: 12px;
            //                         font-weight: bold;
            //                     }
            //                 }
            //             }
            //         }
            //     }
            // }
        }

        .manuscriptmanage_section{
            width: 100%;
            height: 100%;
            display: flex;


        }
        .rightMenu {
            position: fixed;
            z-index: 999;
        }
    }

</style>
<style lang="scss">

    .title_select_dropdown{
        width: 200px;
    }
    #manuscriptmanage .catalogue_tree .el-scrollbar__wrap{
        overflow-x: scroll;
    }

    /* 全文检索input样式 */
    .title_input .el-input__inner{
        width: 100%;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
    }
    .title_input .el-input__suffix-inner .el-icon-search{
        line-height: 30px;
    }
    .ztree li span.button.diy01_ico_open{
        line-height:0; margin:0; width:18px; height:18px; display: inline-block; vertical-align:middle;
	    border:0 none; cursor: pointer;outline:none;
	    background-color:transparent; background-repeat:no-repeat; background-attachment: scroll;
        background: url('../../../assets/manuscript_icon/close_icon.png') no-repeat;
        background-size: 18px 14px;
    }
    .ztree li span.button.diy01_ico_close{
        line-height:0; margin:0; width:18px; height:18px; display: inline-block; vertical-align:middle;
	    border:0 none; cursor: pointer;outline:none;
	    background-color:transparent; background-repeat:no-repeat; background-attachment: scroll;
        background: url('../../../assets/manuscript_icon/open_icon.png') no-repeat;
        background-size: 18px 14px;
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


    /* 引用目录弹框样式 */
    .citeCatalog_dialog .el-dialog__header{
        border-bottom:1px solid #DDDDDD;
        text-align: center;
    }
    .citeCatalog_dialog .content_citeCatalog{
        display: flex;
        align-items: center;
        margin-left: 21px;
        margin-bottom: 17px;
    }
    .citeCatalog_dialog .content_citeTemp {
        display: flex;
        align-items: center;
        margin-left: 21px;
    }
    .citeCatalog_dialog .content_citeCatalog .content_citeCatalog_name{
        width: 70px;
        display: inline-block;
        margin-right: 14px;
    }
    .citeCatalog_dialog .content_citeCatalog .el-select{
        flex: 1;
        margin-right: 14px;
    }
    .citeCatalog_dialog .content_citeTemp .content_citeTemp_name{
        width: 70px;
        display: inline-block;
        margin-right: 14px;
    }
    .citeCatalog_dialog .content_citeTemp .el-radio{
       text-align: start;
    }





    /* 文件属性 */
    .fileAttribute_dialog{
        .el-dialog__header{
            border-bottom:1px solid #DDDDDD;
            text-align: center;
        }
        .fileAttribute_content{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            .fileAttribute_content_item{
                width: 60%;
                display: flex;
                .fileAttribute_content_item_title{
                    width: 55px;
                    margin-left: 20px;
                }
                .fileAttribute_content_item_data{
                    width: 260px;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                    text-align: left;
                }
            }
        }
    }

    /* 文件批注弹框样式 */
    .postil_dialog .el-dialog__header{
        border-bottom:1px solid #DDDDDD;
        text-align: center;
    }
    .postil_dialog .el-dialog__body{
        padding: 0 0;
    }
    .postil_dialog .postil_dialog_content{
        width: 95%;
        margin: 0 2.5% 0 2.5%;
        color: #2A383F;
    }
    .postil_dialog_content .postil_dialog_content_fileName{
        text-align: left;
        width: 100%;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        padding: 26px 0 0 0;
    }
    .postil_dialog_content .postil_dialog_content_title{
        text-align: left;
        padding: 13px 0 0 0;
    }
    .postil_dialog_content .postil_dialog_content_tabel{
        width: 100%;
        display: flex;
        flex-direction: column;
        border: 1px solid #DDDDDD;
        margin-top: 12px;
        margin-bottom: 20px;
    }
    .postil_dialog_content_tabel .postil_dialog_content_tabel_title{
        width: 100%;
        background: #F0F0F0;
        display: flex;
        align-items: center;
    }
    .postil_dialog_content_tabel_title span:nth-child(1){
        width: 12%;
        display: inline-block;
        padding: 11px 0 10px 0;
        margin-left: 2%;
        text-align: left;
    }
    .postil_dialog_content_tabel_title span:nth-child(2){
        width: 60%;
        display: inline-block;
        padding: 11px 0 10px 0;
        margin-left: 2%;
        text-align: left;
    }
    .postil_dialog_content_tabel_title span:nth-child(3){
        width: 22%;
        display: inline-block;
        padding: 11px 0 10px 0;
        margin-left: 2%;
        text-align: left;
    }
    .postil_dialog_content_tabel .postil_dialog_content_tabel_coutent {
        width: 100%;
        height: 175px;
    }
    .postil_dialog_content_tabel_coutent .postil_dialog_content_tabel_coutent_item{
        width: 100%;
        display: flex;
        align-items: center;
    }
    .postil_dialog_content_tabel_coutent_item span{
        display: inline-block;
        font-size: 12px;
        margin-top: 14px;
    }
    .postil_dialog_content_tabel_coutent_item span:nth-child(1){
        width: 12%;
        height: 20px;
        margin-left: 2%;
        text-align: left;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }
    .postil_dialog_content_tabel_coutent_item span:nth-child(2){
        width: 55%;
        margin-left: 2%;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        /*! autoprefixer: off */

        -webkit-box-orient:vertical;

        /*! autoprefixer: on */

        -webkit-line-clamp:3;
    }
    .postil_dialog_content_tabel_coutent_item span:nth-child(3){
        width: 20%;
        height: 20px;
        margin-left: 7%;
        text-align: left;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }
    /* .postil_dialog .postil_dialog_content_input{
        height: 10px;
    } */
    .postil_dialog .el-input__inner{
        width: 570px;
        height: 65px;
        margin-top: 21px;
    }




    /* 版本弹框样式 */
    .versions_dialog .el-dialog__header{
        border-bottom:1px solid #DDDDDD;
        text-align: center;
    }
    .versions_dialog .el-dialog__body{
        padding: 20px 0;
    }
    .versions_dialog li{
        width:100%;
        line-height: 40px;
        border-bottom:1px solid #e7e7e7;
    }
    .versions_dialog .span_two{
        float: left;
        width: 17%;
    }
    .versions_dialog .span_first{
        float: left;
        width: 40%;
        text-align: left;
        margin-left: 5%;
    }
    .versions_dialog ul li div{
        height:350px;
    }
    .version_content_item{
        width: 100%;
    }
    .version_content_item:hover{
        background: #FAFAFA;
    }
    .versions_dialog  .span_btn{
        float: left;
        width: 40%;
        text-align: left;
        margin-left: 5%;
    }
    .versions_dialog .span_sec{
        float: left;
        width: 17%;
    }
    .span_sec .span_sec_return{
        color: #1A5FA4;
    }
    .span_sec .span_sec_down{
        color: #1A5FA4;
    }

    .versions_dialog .version_upload{
        background: #1A5FA4;
        color: #FFFFFF;
        font-size: 14px;
    }
    #manuscriptmanage .versions_dialog .el-scrollbar{
        overflow-x: hidden;
    }


    .span_sec_return:hover{
        text-decoration: underline;
        cursor: pointer;
    }
    .span_sec_down:hover{
        text-decoration: underline;
        cursor: pointer;
    }
    .manu_table{

    }
    .manu_table .el-table__header-wrapper .cell{
        font-size:13px;
        color:rgba(51,51,51,1);

    }
    .manu_table .el-table__body-wrapper .el-table__row td{
        border:none;
        height: 70px;
    }
    .manu_table .el-table td{
        border:none;
        // height: 50px;
    }
    .dropdown_jay{

    }
    // #manuscriptmanage{
    //     /*谷歌、safari、qq浏览器、360浏览器滚动条样式*/
    //     /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
    //     ::-webkit-scrollbar
    //     {
    //         width: 5px;
    //         height: 5px;
    //         background-color: #F5F5F5;
    //     }
    //     /*定义滚动条轨道 内阴影+圆角*/
    //     ::-webkit-scrollbar-track
    //     {
    //         -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    //         border-radius: 10px;
    //         background-color: #F5F5F5;
    //     }
    //     /*定义滑块 内阴影+圆角*/
    //     ::-webkit-scrollbar-thumb
    //     {
    //         border-radius: 10px;
    //         -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    //         background-color: #bdbdbd;
    //     }
    //     /*滑块效果*/
    //     ::-webkit-scrollbar-thumb:hover
    //     {
    //         border-radius: 5px;
    //         -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    //         background: rgba(0,0,0,0.4);
    //     }

    //     /*IE滚动条颜色*/
    //     html {
    //         scrollbar-face-color:#bfbfbf;/*滚动条颜色*/
    //         scrollbar-highlight-color:#000;
    //         scrollbar-3dlight-color:#000;
    //         scrollbar-darkshadow-color:#000;
    //         scrollbar-Shadow-color:#adadad;/*滑块边色*/
    //         scrollbar-arrow-color:rgba(0,0,0,0.4);/*箭头颜色*/
    //         scrollbar-track-color:#eeeeee;/*背景颜色*/
    //     }
    // }

</style>
