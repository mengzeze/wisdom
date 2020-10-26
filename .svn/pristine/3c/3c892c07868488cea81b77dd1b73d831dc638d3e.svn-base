<template>
  <!-- <div class="select_relation"> -->
    <el-dialog
        class="borrow_dialog"
      title="底稿选择"
      align="content"
      :close-on-click-modal="false"
      :append-to-body="true"
      :visible.sync="state_box"
      width="872px"
      
    >
      <div class="borrow_middle">
        <!-- <div class="Relation_left">
          <el-scrollbar style="height:96%">
            <span></span>
            <ul id="treeDemo" class="ztree"></ul>
          </el-scrollbar>
        </div>

        <div class="Relation_right">
          <el-scrollbar style="height:96%">
            <ul>
              <li style="line-height: 37px;" v-for="(itm,index) in peolist" :title="itm.docName" :key="itm.id">
                <span class="Relation_right_dis">{{itm.docName}}</span>
                <i
                  class="el-icon-delete"
                  style="margin-left:18px"
                  @click="deletlis(index)"
                ></i>
              </li>
            </ul>
          </el-scrollbar>
        </div> -->
            <div class="borrow_middle_chunk">
                <div class="borrow_middle_chunk_left">
                    <div class="borrow_middle_chunk_left_top">
                        <el-input placeholder="输入关键字进行搜索" v-model.trim="myUaData.tree_input"  @keyup.native.enter="treeSearchFn()" clearable class="borrow_middle_chunk_left_top_search">
                            <el-button slot="append" icon="el-icon-search" @click="treeSearchFn"></el-button>
                        </el-input>
                    </div>
                    <div class="borrow_middle_chunk_left_bottom">
                        <el-scrollbar style="height:100%">
                            <ul id="borrowTree" class="ztree borrowZtree" v-if="isSearchShow"></ul>
                            <div v-else class="borrowList">
                              <p v-if="borrowSearchFileList.length === 0" class="borrowList_title" >暂无数据</p>
                              <p v-for="(item,idx) in borrowSearchFileList" :key="idx" class="borrowList_item" @click="listItemClickFn(item)" v-else>
                                  <span class="borrowList_item_fileIcon"></span>
                                  <span class="borrowList_item_title" :title="item.docName">{{item.docName}}</span>
                              </p>

                            </div>
                        </el-scrollbar>
                    </div>
                </div>
                <div class="borrow_middle_chunk_right">
                    <p class="borrow_middle_chunk_right_title">文件名</p>
                    <div class="borrow_middle_chunk_right_list">
                        <el-scrollbar style="height:100%">
                            <p class="borrow_middle_chunk_right_list_item" v-for="(item,idx) in borrowFileList">
                                <span class="borrow_middle_chunk_right_list_item_title"  :title="item.docName" @click="seeFj(item)">{{item.docName}}</span>
                                <span class="borrow_middle_chunk_right_list_item_del" @click="borrowFileDelFn(item)">删除</span>
                            </p>
                        </el-scrollbar>
                    </div>
                </div>
            </div>
      </div>
      <span slot="footer" style="text-align:right">
        <el-button size="medium" @click="dialogVisibles">取 消</el-button>
        <el-button size="medium" @click="upaddres" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  <!-- </div> -->
</template>
<script>
import dev from "../../../config/index.js";

export default {
  props:[
    'showDisabled',
    "manscProjectId",
    "filterDocStatus"//项目文档文件审核从底稿时不能选择审核中和锁定状态的文件
  ],
  data() {
    return {
      token: "",
      userId: "",
      projectId: "",
      state_box: true,
      requestCode: "",
      peodatas: [],
      zNodes: [], //zTree默认配置
      myGetProjectId:'',
      borrowSetting:{  //借阅树结构zTree默认配置
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
              onClick: this.zTreeOnClickFn,
              onAsyncSuccess: this.onAsyncSuccessFn,
              onCheck:this.zTreeOnCheck,
              beforeDrag: this.zTreeBeforeDrag
            //   onCollapse: this.zTreeOnCollapse,  //用于捕获节点被折叠的事件回调函数
            //   onExpand: this.onExpand     
          }
        },
        borrowVisible:false,
        isSearchShow: true, //是否搜索显示结果
        borrowSearchFileList: [],
        borrowFileList: [],
        borrowZnodes: [], //借阅树结构
        //tree_input:'',
        requestCode: {},
        borrowTreeDemo: '',
        myUaData:{
            tree_input:''
        },
        isFilterDocStatus: ""//能否选择审核中和锁定状态的文件
    };
  },
  created() {
    this.token = this.$store.state.loginObject.userToken;
    this.userId = this.$store.state.loginObject.userId;
   // this.projectId = this.$store.state.projectMsg.pro_id;
    this.requestCode = this.code.codeNum;
    console.log(this.requestCode)
    // this.reqApi = dev.dev.proxyTable["/api"].target;
    this.reqApi = allUrl;
    this.myGetProjectId = this.manscProjectId || this.$store.state.projectMsg.pro_id;
    this.isFilterDocStatus = this.showDisabled || false;
  },
  computed: {
    peolist: function() {
      var listed = [];
      listed = Array.from(new Set(this.borrowFileList));
      return listed;
    },
    searchSite() {
      return this.myUaData.tree_input;
    }
  },
  watch: {
    state_box: function(vargt) {
      if (!vargt) {
        this.state_box = false;
        this.$emit("clearstate", this.state_box);
      }
    },
    //监听输入框是否为空
    searchSite(newValue, oldValue) {
        console.log(newValue)
      if (newValue == "" || newValue == undefined ||newValue == null) {
          this.isSearchShow = true;
        this.borrowTreeFn();
      }
    }



  },
  mounted() {
    this.borrowTreeFn();
  },
  methods: {
    zTreeBeforeDrag(){
      return false
    },
    borrowTreeFn() {
        var data = {
            token: this.token,
            userId: this.userId,
            pageNo: 0,
            pageSize: 70,
            projectId:this.myGetProjectId,
            private:true,
            data: {

                docType: '',
                parentId: '0',
                projectId: this.myGetProjectId
            }
        };
      var _this = this;
      this.$post("/doc/paper/relevanceQuery", data)
        .then((response)=> {
           // console.log(response.data.content.filter(v=>v.isLinkDelete != 1))
        _this.borrowZnodes = response.data.content;
            console.log(_this.borrowZnodes)
            _this.borrowZnodes.forEach((item) => {
                if(item.docType === 1) {
                    item.isParent = true;
                    item.iconSkin = "diy01"
                } else {
                    item.iconSkin = "diy03"
                }
            });
            $.fn.zTree.init($("#borrowTree"), _this.borrowSetting, _this.borrowZnodes);
            _this.borrowTreeDemo = $.fn.zTree.getZTreeObj("borrowTree"); //将目录树对象赋值给全局使用
            var nodes = _this.borrowTreeDemo.getNodes();
            _this.borrowTreeDemo.selectNode(nodes[0])
            _this.borrowTreeDemo.reAsyncChildNodes(nodes[0], "refresh");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    treeSearchFn() {
        //var treeProjId = itemId ? itemId : this.projectId
      if(this.myUaData.tree_input != '') {
        this.isSearchShow = false;
        // var ooo = {
        //     bbbb:1,
        //     proId:this.myGetProjectId
        // };
        // this.$store.commit("digaoproject",ooo);
        var data = {
            token: this.token,
            userId: this.userId,
            pageNo: 0,
            pageSize: 1000,
            private:true,
            data: {
                docName:this.myUaData.tree_input,
                projectId: this.myGetProjectId
            }
        };
        this.$post('/doc/paper/searchFile',data)
        .then((res) => {
            if(this.requestCode.SUCCESS == res.code) {
                console.log(res)
                this.borrowSearchFileList = res.data.content
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
        this.isSearchShow = true;
        this.borrowTreeFn()
      }

    },
 
     // ztree加载数据
    getAsyncUrl() {
      return `${this.reqApi}/doc/paper/relevanceQuery`;
      //return 'http://192.168.6.230:212/doc/paper/query'
    },
    getAsyncData(treeId, treeNode) {
        if(treeNode) {
            console.log("----" + this.myGetProjectId)
            // var ooo = {
            //     bbbb:1,
            //     proId:this.myGetProjectId
            // };
            // this.$store.commit("digaoproject",ooo);
            return  {
                token: this.token,
                userId: this.userId,
                pageNo: 0,
                pageSize: 500,
                projectId:this.myGetProjectId,
                private:true,
                data: {
                    docType: '',
                    parentId: treeNode.id,
                    projectId: this.myGetProjectId
                }
            }
        }else {
            // var ooo = {
            //     bbbb:1,
            //     proId:this.myGetProjectId
            // };
            // this.$store.commit("digaoproject",ooo);
            return  {
                token: this.token,
                userId: this.userId,
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                projectId:this.myGetProjectId,
                private:true,
                data: {
                    docType: '',
                    parentId: 0,
                    projectId: this.myGetProjectId
                }
            }
        }
    },
    onAsyncSuccessFn(event, treeId, treeNode, msg) {
      var zTree = $.fn.zTree.getZTreeObj(treeId);
      zTree.updateNode(treeNode); // 异步加载成功后刷新树节点
    },
    treeFilterFn(treeId, parentNode, responseData) { //异步加载过滤树
        console.log(responseData)
        if (responseData.code == this.requestCode.ARGUMENT_ERROR) {
            return;
        } else if(responseData.code == this.requestCode.DOC_FIlE_TYPE_MISMATCH) {
            return ;
        }else if(responseData.code == this.requestCode.NOT_PERMISSION) {
            this.$message({
                message: "没有该权限",
                type: "warning"
            });
            return ;
        }else {
            var resDatasfilter = responseData.data.content.filter(v=>v.isLinkDelete != 1)
            resDatasfilter.forEach((item) => {
                if(item.docType === 1) {
                    item.isParent = true;
                    item.iconSkin = "diy01";
                    item.checked = false;
                } else {
                    item.iconSkin = "diy03"
                }
            })
            return resDatasfilter;
        }
    },
    //点击树节点的方法
    zTreeOnClickFn(e, treeId, treeNode) {
        this.borrowTreeDemo.expandNode(treeNode);
        this.targetTreeNode = treeNode;
        console.log(123, treeNode)
        if(treeNode.docType != 1) { 
            if(this.isFilterDocStatus){
                console.log('审核',treeNode)
                  let newObj = this.borrowFileList.find(v => treeNode.id == v.id)
                  if(newObj == undefined) {
                      this.borrowFileList.push(treeNode)
                  }
            } else {
                let newObj = this.borrowFileList.find(v => treeNode.id == v.id)
                if(newObj == undefined) {
                    this.borrowFileList.push(treeNode)
                }
            }
        }
    },
    zTreeOnCheck(event, treeId, treeNode){
        // alert(treeNode.id + ", " + treeNode.docName + "," + treeNode.checked);
        console.log(treeNode)
        this.borrowFileList.push(treeNode)
        console.log(this.borrowFileList)
    },
     listItemClickFn(itemValue) { //点击查询后列表每条
        console.log(itemValue)
       if(this.borrowFileList.findIndex(v=>itemValue.id == v.id)>-1) return;
       this.borrowFileList.push(itemValue)

    },
    //删除所选项
    // deletlis(v) {
    //   this.borrowFileList.splice(v, 1);
    // },
    //删除所选项
    borrowFileDelFn(itemValue) {
        this.borrowFileList.splice(this.borrowFileList.indexOf(itemValue),1)
        itemValue.checked = false;
        // this.borrowZnodes.forEach((item) => {
        //     console.log(item)
        // });
       // this.borrowTreeFn();
       
    },
//    closeS(){
//       var state_box = {state:0}
//       this.$emit("clearstates",state_box);
//     },
    dialogVisibles() {
      this.state_box = false;
      this.$emit("clearstate", this.state_box);
    },

    //向父及发送数据
    upaddres() {
      //   this.state_box1 = false;
      this.$emit("elationUpmansc", this.peolist);
    },

    seeFj(item){
        console.log(item)
        //console.log(docid)
        //console.log(type)
        var idx  = item.type.indexOf("/");
        var imgtype = item.type.slice(idx+1);

        //console.log(imgtype)
        var previewData = {
          projectId: this.myGetProjectId,
          rfsId: item.rfsId,
          docId : item.docId,
          photoType: imgtype
        }
        
        this.$store.commit('previewAllFn',previewData )
        this.dialogVisibleadd = false;
        this.dialogVisibleedit = false;

        // this.$router.push({
        // path: "/preview",
        //     query: {
        //         rfsId: item,
        //         docId: docid
        //     }
        // });
    },

  }
};
</script>
<style lang="scss" scoped>
    .el-scrollbar .el-scrollbar__wrap{
      margin-right:0 !important;
    }

.borrow_dialog{
    .el-dialog__header{
        text-align: center;
        border-bottom: 1px solid #ddd!important;
    }

  .borrow_middle{
      margin: 0 24px 0 24px;
      .borrow_middle_chunk{
          display: flex;
          .borrow_middle_chunk_title{
              display: inline-block;
              margin-right: 14px;
              display: inline-block;
              font-size: 12px;
              width: 66px;
          }
          .borrow_middle_chunk_type{
              height: 20px;
              vertical-align: middle;
              display: inline-block;

              // display: flex;
              // justify-content: center;
              // align-items: center;
          }
          .borrow_middle_chunk_time{
              display: flex;
              flex-direction: column;
              .borrow_middle_chunk_time_top{
                  width: 330px;
                  .el-select{
                      width: 100%;
                  }
              }
          }
          .borrow_middle_chunk_left{
              width: 408px;
              height: 384px;
              border:1px solid #DDDDDD;
              display: flex;
              flex-direction: column;
              border-radius: 5px;
              .borrow_middle_chunk_left_top{
                  .borrow_middle_chunk_left_top_search{
                      margin: 15px 41px 16px 15px;
                      width: 354px;
                  }
              }
              .borrow_middle_chunk_left_bottom{
                  height: 315px;
                  .borrowList{
                    .borrowList_item{
                      padding-left: 15px;
                      margin-top: 5px;
                      display: flex;
                      align-items: center;
                      cursor: pointer;
                      .borrowList_item_fileIcon{
                        width: 13px;
                        height: 14px;
                        display: inline-block;
                        background: url('../../assets/manuscript_icon/file_icon.png') no-repeat;
                        background-size: 13px 14px;
                      }
                      .borrowList_item_title{
                        width: 300px;
                        overflow:hidden;
                        text-overflow:ellipsis;
                        white-space:nowrap;
                        margin-left: 5px;
                      }
                    }
                    .borrowList_title{
                      text-align: center;
                    }
                  }
              }
          }
          .borrow_middle_chunk_right{
              width: 408px;
              height: 384px;
              border:1px solid #DDDDDD;
              margin-left: 10px;
              border-radius: 5px;
              .borrow_middle_chunk_right_title{

                  padding: 19px 0 0 15px;
              }
              .borrow_middle_chunk_right_list{
                  height: 345px;
                  display: flex;
                  flex-direction: column;
                  .borrow_middle_chunk_right_list_item{
                      width: 100%;
                      margin-top: 3px;
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      padding: 5px 0 5px 0;
                      .borrow_middle_chunk_right_list_item_title{
                          display: inline-block;
                          max-width: 296px;
                          overflow: hidden;
                          text-overflow: ellipsis;
                          white-space: nowrap;
                          padding-left: 15px;
                          cursor: pointer;
                      }
                      .borrow_middle_chunk_right_list_item_del{
                          display: inline-block;
                          color: #1462A3;
                          padding-right: 19px;
                          cursor: pointer;
                      }
                  }
                  .borrow_middle_chunk_right_list_item:hover{
                    background: #F7F9FB;
                  }
              }
          }
          .borrow_middle_chunk_remark{
              width: 830px;
          }
          .borrow_middle_chunk_content{
              flex:1;
              display: flex;
              flex-direction: column;
              .borrow_middle_chunk_content_title{
                  color: #333333;
              }
              .borrow_middle_chunk_content_middle{
                  display: flex;
                  flex-direction: column;
                  .borrow_middle_chunk_content_middle_title{
                      margin-top: 22px;
                      .borrow_middle_chunk_content_middle_title_people{
                          color: #333333;
                      }
                      .borrow_middle_chunk_content_middle_title_annotation{
                          color: #999999;
                      }
                  }
                  .borrow_middle_chunk_content_middle_title:nth-child(1){
                    margin-top: 0;
                  }
                  .borrow_middle_chunk_content_middle_operation{
                      width: 100%;
                      margin-top: 10px;
                      display: flex;
                      align-items: center;
                      cursor: pointer;
                      .borrow_middle_chunk_content_middle_operation_icon{
                          width: 24px;
                          height: 24px;
                          background: url('../../assets/common_icon/addtask_icon.png') no-repeat;
                          background-size: 24px 24px;
                      }
                      .borrow_middle_chunk_content_middle_operation_title{
                          color: #1462A3;
                          margin-left: 6px;
                      }
                  }
                  .borrow_middle_chunk_content_middle_list{
                      max-height: 216px;
                      overflow-y: scroll;
                      .el-tag {
                          margin: 10px 10px 10px 0;
                      }
                  }
              }
              .borrow_middle_chunk_content_remark{
                display: flex;
                .borrow_middle_chunk_content_remark_title{
                  display: inline-block;
                  color: #000000;
                  width: 66px;
                  overflow: hidden;
                }
                .borrow_middle_chunk_content_remark_content{
                  width: 740px;
                }
              }
          }
      }
      .borrow_middle_chunk:nth-child(1){
          margin-top: 24px;
      }
      .borrow_middle_chunk:nth-child(2){
          margin-top: 18px;
          align-items: center;
      }
      .borrow_middle_chunk:nth-child(3){
          margin-top: 14px;
          margin-left: 80px;
      }
      .borrow_middle_chunk:nth-child(4){
          margin-top: 20px;
      }
      .borrow_middle_chunk:nth-child(5){
          margin-top: 20px;
      }
  }
  /deep/ .el-scrollbar .el-scrollbar__wrap{  // ie11 兼容
    padding-right: 17px !important;
  }
}
</style>
<style>
    .el-dialog__header{
        text-align: center;
        border-bottom: 1px solid #ddd!important;
    }
.borrowZtree li a .node_name{
        width: 300px;
        display: inline-block;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        font-size:14px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .borrowZtree li a .diyState{
        display: inline-block;
        float: right;
        margin-left: 10px;
    }
    .borrowZtree li span.button.diy01_ico_open{
        line-height:0; margin:0; width:18px; height:20px; display: inline-block; vertical-align:middle;
        border:0 none; cursor: pointer;outline:none;
        background-color:transparent; background-repeat:no-repeat; background-attachment: scroll;
        background: url('../../assets/manuscript_icon/examopen_icon.png') no-repeat;
        background-size: 18px 14px;
    }
    .borrowZtree li span.button.diy01_ico_close{
        line-height:0; margin:0; width:18px; height:20px; display: inline-block; vertical-align:middle;
        border:0 none; cursor: pointer;outline:none;
        background-color:transparent; background-repeat:no-repeat; background-attachment: scroll;
        background: url('../../assets/manuscript_icon/examclose_icon.png') no-repeat;
        background-size: 18px 14px;
    }
    .borrowZtree li span.button.diy03_ico_docu{
        line-height:0; margin:0; width:18px; height:20px; display: inline-block; vertical-align:middle;
        border:0 none; cursor: pointer;outline:none;
        background-color:transparent; background-repeat:no-repeat; background-attachment: scroll;
        background: url('../../assets/manuscript_icon/file_icon.png') no-repeat;
        background-size: 13px 14px;
    }
    .borrowZtree li a.curSelectedNode{
        padding-top: 0px;
        background:#F0F0F0;
        color: black;
        height: 16px;
        border: 1px #F0F0F0 solid;
        opacity: 0.8;
    }
    .borrowZtree li span.switch{
        display: none;
    }

</style>

