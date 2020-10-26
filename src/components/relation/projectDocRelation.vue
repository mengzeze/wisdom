<template>
  <div class="select_relation">
    <el-dialog
      title="文件关联"
      align="content"
      :append-to-body="true"
      :close-on-click-modal="false"
      :visible.sync="state_box"
      width="790px"
      @close='closeS'
    >
      <div class="Relation">
        <div class="Relation_left">
          <el-scrollbar style="height:96%">
            <span>文件关联</span>
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
        </div>
      </div>

      <span slot="footer" style="text-align:right">
        <el-button size="medium" @click="dialogVisibles">取 消</el-button>
        <el-button size="medium" @click="upaddres" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import dev from "../../../config/index.js";

export default {
  props:[
    "getProjectId","stateis"
  ],
  data() {
    return {
      token: "",
      userId: "",
      projectId: "",
      state_box: true,
      requestCode: "",
      peodatas: [],
      peodataslist: [],
      myGetProjectId:'',
      zNodes: [], //zTree默认配置
      setting: {
        //zTree默认配置
        data: {
          simpleData: {
            enable: true,
            pIdKey: "parentId",
            idKey: "id",
            rootPId: 0
          },

          key: {
            name: "docName"
          }
        },
        view: {
          selectedMulti: false,
          showLine: false
        },
        edit: {
          enable: true,
          editNameSelectAll: true,
          showRemoveBtn: false,
          showRenameBtn: false
        },
        async: {
          enable: true,
          url: this.getAsyncUrl,
          contentType: "application/json",
          dataType: "json",
          autoParam: [],
          otherParam: this.bb,
          dataFilter: this.treeFilterFn
        },
        callback: {
          onClick: this.zTreeOnClickFn,
          onAsyncSuccess: this.onAsyncSuccessFn
        }
      }
    };
  },
  created() {
    this.token = this.$store.state.loginObject.userToken;
    this.userId = this.$store.state.loginObject.userId;
    this.projectId = this.$store.state.projectMsg.pro_id;
    this.requestCode = this.code.codeNum;
    // this.reqApi = dev.dev.proxyTable["/api"].target;
    this.reqApi = allUrl;
    this.myGetProjectId = this.getProjectId || this.$store.state.projectMsg.pro_id;
  },
  computed: {
    peolist: function() {
      var listed = [];
      listed = Array.from(new Set(this.peodataslist));
      return listed;
    }
  },
  watch: {
    state_box: function(vargt) {
      if (!vargt) {
        this.state_box = false;
        this.$emit("clearstate", this.state_box);
      }
    },
    stateis:function(val){
      console.log(val)
    }
  },
  mounted() {
    this.listTablse();
    // console.log(this.stateis)
  },
  methods: {
    listTablse() {
      var data = {
        token: this.token,
        userId: this.userId,
        pageNo: 0,
        pageSize: 100,
          projectId:this.projectId,
          data: {
          projectId: this.myGetProjectId,
          parentId: 0
        }
      };
      var _this = this;
      this.$post("/doc/project/query", data)
        .then((response)=> {
          // console.log(1);
          // console.log(response);
          _this.peodatas = response.data.content;
          if (_this.peodatas.length > 0) {
            _this.peodatas.forEach(item => {
              if (item.docType === 1) {
                item.isParent = true;
              }
            });
            $.fn.zTree.init($("#treeDemo"), _this.setting, _this.peodatas);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    zTreeOnClickFn(e, treeId, treeNode) {
      console.log(treeNode.docType);
      // this.manuscriptTreeDemo.expandNode(treeNode);
      var treeObj = $.fn.zTree.getZTreeObj(treeId);
      treeObj.expandNode(treeNode);
      if (treeNode.docType == 1) {
        var data = {
          token: this.token,
          userId: this.userId,
          pageNo: 0,
          pageSize: 300,
            projectId:this.projectId,
            data: {
            projectId: this.myGetProjectId,
            parentId: treeNode.id
          }
        };
        this.$post("/doc/project/query", data)
          .then(res => {
            if (this.requestCode.SUCCESS == res.code) {
              this.flieNameData = res.data.content;
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        if(treeNode.auditStatus == 0 || treeNode.lockState != -1){
          if(treeNode.auditStatus == 0){
             this.$message({
                message: "该文件正在审批中，不能选择",
                type: "warning"
            });
              return;
          }
           if(treeNode.lockState != -1){
             this.$message({
                message: "锁定中的文件不能再次发起审批，请重新选择",
                type: "warning"
            });
              return;
          }
        } else {
            treeNode.hasDownBtn = true;
            this.peodataslist.push(treeNode);
        }   
           
      }
    },
    closeS(){
      var state_box = {state:0}
      this.$emit("clearstates",state_box);
    },
    //删除所选项
    deletlis(v) {
      this.peodataslist.splice(v, 1);
    },
    dialogVisibles() {
      var state_box = {state:0}
      this.$emit("clearstates",state_box);
    },

    //向父及发送数据
    upaddres() {
      //   this.state_box1 = false;
      this.$emit("elationUp", this.peolist);
    },

    // ztree加载数据
    getAsyncUrl() {
      return `${this.reqApi}/doc/project/query`;
    },
    bb(treeId, treeNode) {
      return {
        token: this.token,
        userId: this.userId,
        pageNo: 0,
        pageSize: 300,
        projectId:this.projectId,
          data: {
          projectId: this.myGetProjectId,
          parentId: treeNode.id
        }
      };
    },
    onAsyncSuccessFn(event, treeId, treeNode, msg) {
      console.log(treeId,'___')
      var zTree = $.fn.zTree.getZTreeObj(treeId);
      zTree.updateNode(treeNode); // 异步加载成功后刷新树节点
    },
    treeFilterFn(treeId, parentNode, responseData) {
      //异步加载过滤树
      if (responseData.code == this.requestCode.ARGUMENT_ERROR) {
        return;
      } else if (responseData.code == this.requestCode.DOC_FIlE_TYPE_MISMATCH) {
        return;
      } else {
        responseData.data.content.forEach(item => {
          if (item.docType === 1) {
            item.isParent = true;
          }
        });
        return responseData.data.content;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.Relation {
  width: 100%;
  height: 500px;
  display: flex;
  padding-top: 15px;
  // border: 1px solid #e9e9e9;
  .Relation_left {
    width: 50%;
    height: 100%;
    /deep/ .ztree li .node_name{
        display: inline-block;
        width: 260px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap
    }
    #treeDemo > li {
      line-height: 30px;
      width:100%;
    }
  }
  .Relation_right {
    text-align: left;
    padding: 8px;
    width: 50%;
    height: 100%;
    li{
      cursor:pointer;
      &:after{
        display:block;
        content:' ';
        width:1px;
        height:1px;
        overflow:hidden;
        clear:both;
      }
      i{
        float:left;
        line-height: 37px;
      }
    }
    &_dis{
      float:left;
      display: inline-block;
      width: 80%;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap
    }
  }
}
/deep/ .el-scrollbar__wrap{
  overflow-x:hidden;
}
</style>
