<template>
  <div class="new-log">
   <el-dialog title="新建日志"  :visible="dialogVisible" :close-on-click-modal="false" @close="cancelAddjoumal" width="841px">
      <div class="new_rizi" style="height:465px;">
        <el-scrollbar style="height:100%;">
          <el-form ref="form" label-width="140px" class="form_box">
            <el-form-item label="所属项目：" v-if="logType == 1">
              <select-lazy 
                v-model="projectId" 
                filterable
                clearable
                placeholder="请选择所属项目" 
                @change="changeproject"
                :list='myvoteproj'></select-lazy>
              <!-- <el-select v-model="projectId" filterable placeholder="请选择所属项目" @change="changeproject" clearable>
                <el-option v-for="item in myvoteproj" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select> -->
            </el-form-item>
            <el-form-item label="选择日志类型：" required>
              <el-select v-model="ri_data.type" placeholder="请选择日志类型">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="内容：" required style="width:735px;">
              <Editor ref="editor" />
            </el-form-item>
            <el-form-item label=" 附件：" style="margin-bottom:4px;">

              <add-attachment ref="attachment" :projectId="projectId" :onlyLocal="(projectId || logType == 2) ? false : true" @select="$utils.handleSelect(arguments, selectedFileList)"></add-attachment>

              <ul style="text-align: left;" class="attachment-wrap">
                <li v-for="(item, index) in selectedFileList" :key="index" class="attachemnt-list-item">
                  <p class="attachemnt-list-doc">
                    <span class="doc-name" @click="$utils.handleUploadFilePreview(item, projectId)" :title="item.docName">{{item.docName}}</span>
                    <span>
                      <el-button v-if="item.addSource!==1" type="text" @click="$utils.handleDownLoadSelected(item)">下载</el-button>
                      <el-button type="text" @click="$utils.handleDeleteSelected(selectedFileList, item)">删除</el-button>
                    </span>
                  </p>
                </li>
              </ul>
            </el-form-item>
            <div style="position:relative;">
              <i style="position:absolute;left:60px;top:14px;color:#f56c6c;">*</i>
              <el-form-item label=" 抄送人："  class="userbtn-box clearfix">
                <el-tag  v-for="(item,index) in  deployObj" :key="index" class="mr-5"
                @close="delecr(item)"
                :closable ='item.canDelete'>{{item.name}} </el-tag>
                <el-button type="text" @click="optPrinFn" class="color-primary">
                  <i class="iconfont webicon308"></i>
                  <span style="position: relative;top: -1px;">添加抄送人</span>
                </el-button>
                <div class="el-upload__tip">默认通过站内信通知发送给对方，点击x删除</div>

                </el-form-item>
            </div>
            <!-- </div> -->
          </el-form>
        </el-scrollbar>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAddjoumal">取 消</el-button>
        <el-button type="primary" @click="addjoumal">提交</el-button>
      </span>
    </el-dialog>
    <findall-deptuser
      :findFlagShow.sync="findFlag"
      :findUserObj="findUserObj"
      v-on:findAllUser="findAllUser"
      :findState="findState"
      :checkState="checkState"
    ></findall-deptuser>
   </div>
</template>

<script>
//选择人员
import findallDeptuser from "@/components/select_box/findAllDeptUserMultipleNew";
import Editor from '@/components/select_box/Editor11'
export default {
  name: "newLogMessage",
  props: ['dialogVisible', 'logType'],
  components:{
    findallDeptuser,
    Editor
  },
  data() {
    return {
      token: "",
      userId: "",
      projectId: "", //项目id"
      myvoteyproj: "",
      myvoteproj:[],
      options: [
        {value: "1",label: "日报"},
        {value: "2",label: "周报"},
        {value: "3",label: "月报"}
      ],
      deployObj: [],
      ri_data: {
        type: "", //日志类型（1:日报/2:周报/3:月报）
        content: "", //日志内容",
        userIds: [], //抄送人员id集合
        docIds: [] //附件id集
      },
      uploadDocAddIsShow: false,//上传控制
      addDoc: false,
      uploadParamData: {
        docSource: 5,
        projId: 1,
        parentId: null,
        auditProjectId: null
      },
      relafag: false,// 关联附件
      relafagmanus: false, //从底稿选择
      shagreatlist: [],
      selectedFileList: [],
      shagchaunlist:[],
      shagchaun:[],
      findFlag: false,
      findState: {},
      checkState: {},
      findUserObj: [],
      newJournalTimer: null,
      createUserList:[]
    }
  },
  created() {
    this.token = this.$store.state.loginObject.userToken;
    this.userId = this.$store.state.loginObject.userId;
  },
  methods: {
    //查询所属项目--我的日志查询
    teyproj () {
      this.$post("/info/project/getSimpleProjectList")
        .then((response) => {
          if (response.code != this.code.codeNum.SUCCESS) {
            this.$message.error(response.msg);
            return
          }
          this.myvoteproj = response.data
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 我的项目日志--默认的抄送人
    proDefault () {
      var dataObj = {
          token: this.token,
          userId: this.userId,
          data: {
              "projectId":this.projectId
          }
      };
      var that = this;
      this.$post("/info/project/getProjectPrincipal", dataObj)
      .then((response)=> {
          if(response.code == that.code.codeNum.SUCCESS){
              if(response.data.picNames != "" && response.data.picNames != null){
                  var list =response.data.picNames.split(",");
              }else{
                  var list = [];
              }
              that.createUserList = response.data.createUserIdList;
              that.deployObj = []
              for(var i=0;i<response.data.createUserIdList.length;i++){
                  var obj = {};
                  obj.name = list[i];
                obj.label = list[i];
                obj.userId =  response.data.createUserIdList[i];
                  obj.uniqueKey = 'user' + response.data.createUserIdList[i];
                  obj.originData = true;
                  obj.canDelete = false;
                  that.deployObj.push(obj);
              }
          }
      })
      .catch(function(error) {
          console.log(error);
      });

    },
    // 所属项目的切换
    changeproject () {
      if (this.projectId != '') {
        this.shagchaunlist = [];
        this.shagreatlist = [];
        this.selectedFileList = [];
        console.log(this.projectId, 22)
        this.ri_data.userIds = []
        this.proDefault()
        return;
      }
    },
    //  新增中介机构
    optPrinFn () {
      this.findFlag = true;
      this.findState = { state: 0 };
      this.checkState = { state: 2 };
      this.findUserObj = this.$utils.cloneDeepArray(this.deployObj)
      if (!this.deployObj) {
        this.findUserObj = []
      }
    },
    //选择人员返回
    findAllUser (data) {
        // this.findFlag = false;
      console.log(data)
      if(!data || !data.length){
        this.deployObj = []
        return
      }
      this.deployObj = data
      if (this.deployObj !== "") {
        this.deployObj = this.$utils.uniqBy(this.deployObj, 'userId');
        var chgArr = [];
        for(var i=0;i<this.deployObj.length;i++){
          var flag = true;
          for(var j=0;j<chgArr.length;j++){
            if(this.deployObj[i].userId == chgArr[j].userId){
              flag = false;
            };
          };
          if(flag){
            chgArr.push(this.deployObj[i]);
          };
        };
        chgArr.forEach(v => {
          v.usName = v.name
          v.id =  v.id
        })
        this.deployObj = chgArr
      }
      this.deployObj.forEach(v => {
        v.uniqueKey = 'user' + v.userId
        if (!v.originData) {
          v.canDelete = true
        }
       
      })
      this.findUserObj = this.deployObj
    },
    //删除抄送人
    delecr (val) {
      // this.deployObj.splice(val, 1);
      this.deployObj.splice(this.deployObj.indexOf(val), 1)
    },
    cancelAddjoumal(){
      this.$emit('update:dialogVisible', false); 
      // this.ri_data.content = '';
      this.projectId = ""
      this.ri_data.type = ''
      this.deployObj = []
      this.selectedFileList = []
      //清空富文本
      this.$refs['editor'].clear()
      clearInterval(this.newJournalTimer);
      this.$refs['attachment'].close
    },
    //添加新增日志----如果有项目时，需要判断这个项目的新建日志的权限
    addjoumal () {
      var _this = this;
      // 1.2.3.1版本去掉必填
      // if (this.myvoteyproj == "") {
      //   this.$message.error("所属项目不能为空");
      //   return;
      // }
      // console.log(this.$refs.editor.getHtmls().toString(),'this.$refs.editor.getHtmls()')
      // console.log(this.$refs.editor.getText(),'this.$refs.editor.getText()')

      // return
      if (this.ri_data.type == "") {
        this.$message.error("日志类型内容不能为空");
        return;
      }
      if (this.$refs.editor.getHtmls().toString()==='<p><br></p>' && !this.$refs.editor.getText()) {
        this.$message.error("日志内容不能为空");
        return;
      }
      this.deployObj.forEach(function (c) {
        if (c.userId) {
          _this.ri_data.userIds.push(c.userId);
        }
      });
      this.shagchaunlist.forEach(function (c) {
        if (c.id) {
          _this.shagchaun.push(c.id);
        }
      });
      this.shagreatlist.forEach(function (c) {
        if (c.id) {
          _this.shagreatl.push(c.id);
        }
      });
      if (this.ri_data.userIds.length == 0) {
        this.$message.error("抄送人不能为空");
        return;
      }
      if (this.$store.state.isUpload) {
        this.$message.warning('有文件正在上传，请稍后操作')
        return;
      }

      let localAttach = []
      let projectRelev = []

      this.selectedFileList.forEach(v => {
        v.addSource === 1 ? localAttach.push(v.docId) : projectRelev.push(v.docId)
      })
      var data = {
        token: this.token,
        userId: this.userId,
        projectId:this.projectId,
        data: {
          projectId: this.projectId, // "项目id"
          type: this.ri_data.type, //"日志类型（1:日报/2:周报/3:月报）"
          content: this.$refs.editor.getHtmls(), //"日志内容"
          userIds: this.ri_data.userIds, // "抄送人员id集合", "1", "2"
          docIds: localAttach, // "附件id集合"
          projectDocIds: projectRelev
        }
      };
      // 有项目id的需要判断权限，没有的不需要判断
      let url =  (!this.myvoteyproj && !this.projectId) ? '/info/project/addMyLog' : '/info/project/addProjectLog'
      console.log(url, 36)
      this.$post(url, data)
        .then((response) => {
          if (response.code == 0) {
            _this.projectId = "";
            _this.ri_data.type = "";
            // _this.ri_data.content = "";
            _this.deployObj = [];
            _this.shagchaunlist = [];
            _this.selectedFileList = [];
            _this.shagchaun = [];
            _this.shagreatlist = [];
            _this.shagreatl = [];
            _this.ri_data.userIds = [];
            _this.activeName = "first";
            _this.joumaltype = "";
            // _this.query_all();
            _this.$message({
              message: response.msg,
              type: "success"
            });
            _this.$emit('newLogMessageReturn')
            _this.$emit('update:dialogVisible', false); 
          } else {
            _this.$message({
              type: "error",
              message: response.msg
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
  watch: {
    dialogVisible (val) {
      if (val){
        console.log(this.logType)
       this.logType !=1 && (this.projectId = this.$store.state.projectMsg.pro_id);
        this.logType == 1 ? this.teyproj() : this.proDefault()
      }
    },
  }
};
</script>

<style scoped lang="scss">
.new_rizi {
    .form_box {
      margin-top: 15px;
    }
  }
.form_box .el-form-item {
  margin-bottom: 20px;
}
.attachment-wrap {
  margin-right: 60px;
  max-height: 130px;
  overflow-y: auto;
}
p.attachemnt-list-doc {
  display: flex;
  align-items: center;
}

p.attachemnt-list-doc .doc-name {
  display: inline-block;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

p.attachemnt-list-doc .doc-delete {
  font-size: 14px;
  font-weight: 400;
  color: #0061a9;
  cursor: pointer;
  margin-top: 2px;
}
.attachemnt-list-item .attachemnt-progress {
  width: 200px;
}
.el-upload__tip {
  font-size: 14px;
  color: #C6C4C7;
}
.userbtn {
  float: left;
  position: relative;
  margin-right: 10px;
}
.deletro {
  width: 15px;
  height: 15px;
  background: url("../../assets/image/sanc.png") no-repeat;
  background-size: 100% 100%;
}
.delusebtn {
  position: absolute;
  right: 0px;
  top: -3px;
}
</style>


