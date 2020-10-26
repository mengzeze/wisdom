<template>
  <div>
    <div class="surveyTool" style="width: 463px;margin-top: 2px;">
      <p class="addHref">
        <el-button type="text"  :class="[forbiddenis == 4?'notclick':'']" class="color-primary" @click="addSurvey = true">
          <i class="el-icon-plus"></i>
          <span>添加调查工具</span>
        </el-button>
      </p>
      <ul class="surveyDetail" style="height:427px">
        <el-scrollbar style="height:100%">
          <div style="width: 100%;margin-top: 1%;" v-if="datasurvey.ParaValueIsNull !='字段值为空:taskId'" v-for="item in datasurvey">
            <span
              style="float: left;padding-top: 2%;padding-left: 11px;width: 140px;
                    overflow: hidden;height: 23px;white-space: nowrap;text-overflow: ellipsis"
            >
              <a
                target="_blank"
                :title="item.url"
                 class="color-primary"
                :href="item.url"
              >{{item.name}}</a>
            </span>
            <span
              style="float: left;margin-top: 9px;padding-left: 11%;color: #999999;width: 145px;height: 23px;
                    overflow: hidden;white-space: nowrap;text-overflow: ellipsis"
            >{{item.description}}</span>
            <div style="float: right;padding-right: 16px;"  :class="[forbiddenis == 4?'notclick':'']">
              <span @click="surveyEdit(item)">
                <el-button type="text">编辑</el-button>
              </span>
              <span @click="deletes(item)" style="padding-right: 5px;">
                <el-button type="text">删除</el-button>
              </span>
            </div>
            <div style="clear: both;"></div>
          </div>
        </el-scrollbar>
      </ul>
    </div>
    <!-- 点击调查工具弹框 -->
    <el-dialog
      title="新增调查工具"
      :close-on-click-modal="false"
      :visible.sync="addSurvey"
      width="500px"
      :append-to-body="true"
      @close="change"
    >
      <span>
        <div>
          <el-form
            :label-position="labelPosition"
            label-width="80px"
            ref="formadd"
            :model="formadd"
          >
            <el-form-item label>
              <span style="float:left;margin-left: -20%;">
                <i style="color: red;">*</i> 名称:
              </span>
              <span style="float:left;width: 100%;">
                <el-input maxlength="50" v-model="formadd.name"></el-input>
              </span>
            </el-form-item>
            <el-form-item label>
              <span style="float:left;margin-left: -20%;">
                <i style="color: red;">*</i>工具链接:
              </span>
              <el-input maxlength="500" v-model="formadd.url"></el-input>
            </el-form-item>
            <el-form-item label>
              <span style="float:left;margin-left: -20%;">
                <i style="color: red;">*</i>描述:
              </span>
              <el-input
                type="textarea"
                resize="none"
                maxlength="2000"
                v-model="formadd.description"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="canceladd">取 消</el-button>
        <el-button size="medium" type="primary" @click="addSurveysave(formadd)">保 存</el-button>
      </span>
    </el-dialog>
    <!-- 编辑调查工具 -->
    <el-dialog title="编辑调查工具" :close-on-click-modal="false" :visible.sync="editorSurvey" width="500px" :append-to-body="true">
      <span>
        <div>
          <el-form
            :label-position="labelPosition"
            label-width="80px"
            ref="formLabEdit"
            :model="formLabEdit"
          >
            <el-form-item>
              <span style="float:left;margin-left: -20%;">
                <i style="color: red;">*</i> 名称:
              </span>
              <el-input v-model="name" maxlength="50"></el-input>
            </el-form-item>
            <el-form-item>
              <span style="float:left;margin-left: -20%;">
                <i style="color: red;">*</i>工具链接:
              </span>
              <el-input v-model="url" maxlength="500"></el-input>
            </el-form-item>
            <el-form-item>
              <span style="float:left;margin-left: -20%;">
                <i style="color: red;">*</i>描述:
              </span>
              <el-input type="textarea" resize="none" maxlength="2000" v-model="description"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="canceledit">取 消</el-button>
        <el-button size="medium" type="primary" @click="surveyModefl">保 存</el-button>
      </span>
    </el-dialog>
    <!-- 删除 -->
    <el-dialog
      title="删除"
      :visible.sync="deletediog"
      :close-on-click-modal="false"
      width="15%"
      :before-close="canceldelete"
      :append-to-body="true"
    >
      <span>确定要删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button  @click="canceldelete">取 消</el-button>
        <el-button type="primary" @click="deleteok">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "survey-tool",
  props: ["surveyData", "mbids",'forbiddenis','forbiddenis'],
  data() {
    return {
      //添加调查工具
      name: "",
      url: "",
      description: "",
      labelPosition: "left",
      addSurvey: false,
      editorSurvey: false,
      id: "",
      deletediog: false,
      formadd: {
        name: "",
        url: "",
        description: ""
      },
      formLabEdit: {
        name: "",
        url: "",
        description: ""
      },
      datasurvey: [],
      global: "",
      delId: "",
      token: "String",
      userId: "0"
    };
  },
  // created () {
  //     this.surveylist()
  // },
  watch: {
    mbids(val) {
      this.mbids = val;
      // this.surveylist()
    }
  },
  methods: {
    change() {
      this.name = "";
      this.url = "";
      this.description = "";
      this.formadd.name = "";
      this.formadd.url = "";
      this.formadd.description = "";
    },
    //取消弹框
    canceladd() {
      this.addSurvey = false;
    },
    canceledit() {
      this.editorSurvey = false;
    },
    canceldelete() {
      this.deletediog = false;
    },
    //新增调查工具
    addSurveysave() {
      if (
        this.formadd.name == "" ||
        this.formadd.url == "" ||
        this.formadd.description == ""
      ) {
        this.$message({
          type: "info",
          message: "请填写完整"
        });
        return;
      }
      console.log(this.surveyData);
      var datas = {
        data: {
          name: this.formadd.name, //名称
          url: this.formadd.url, //工具链接
          description: this.formadd.description, //描述
          taskId: this.mbids //任务id
        },
        token: "string",
        userId: 123
      };
      var thisObjet = this;
      this.$post("/info/task/saveTaskTool", datas)
        .then((response)=> {
          if (response.code == 0) {
            thisObjet.addSurvey = false;
            thisObjet.formadd.name, //名称
              thisObjet.formadd.url, //工具链接
              thisObjet.formadd.description, //描述
              thisObjet.$message({
                message: "新增成功",
                type: "success"
              });
            thisObjet.formadd.name = "";
            thisObjet.formadd.url = "";
            thisObjet.formadd.description = "";
            thisObjet.surveylist();
          } else {
            thisObjet.$message({
              type: "info",
              message: response.msg
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 查询调查工具列表
    surveylist(ids) {
      if (ids != undefined) {
        this.mbids = ids;
      }
      var dataList = {
        data: {
          taskId: this.mbids //任务id
        },
        token: "string",
        userId: 123,
        pageSize: 10,
        pageNo: 0
      };
      var thisObjetList = this;
      this.$post("/info/task/getTaskToolByTaskid", dataList)
        .then((response)=> {
          thisObjetList.datasurvey = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 编辑回显调查工具列表
    surveyEdit(item) {
      console.log(item);
      this.global = item.id;
      this.editorSurvey = true;
      this.name = item.name;
      this.url = item.url;
      this.description = item.description;
    },
    //修改调查工具
    surveyModefl() {
      if (this.name == "" || this.url == "" || this.description == "") {
        this.$message({
          type: "info",
          message: "请填写完整"
        });
        return;
      }
      var dataList = {
        data: {
          id: this.global, //调查工具id
          name: this.name,
          url: this.url,
          description: this.description,
          taskId:this.mbids
        },
        token: "string",
        userId: 123
      };
      var _this = this;
      this.$post("/info/task/updateTaskTool", dataList)
        .then((response)=> {
          // _this.editorSurvey = false;
          // _this.$message({
          //     message: '修改成功',
          //     type: 'success'
          // });
          // //刷新列表
          // _this.surveylist();
          if (response.code == 0) {
            _this.editorSurvey = false;
            _this.$message({
              type: "success",
              message: response.msg
            });
            _this.surveylist();
          } else {
            _this.$message({
              type: "info",
              message: response.msg
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //删除
    deletes(item) {
      this.$confirm("确定要删除该" + item.name + "吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var data = {
            token: this.token,
            userId: this.userId,
            data: {
              id: item.id,
              taskId:this.mbids
            }
          };
          console.log(data);
          var _this = this;
          this.$post("/info/task/delTaskTool", data)
            .then((response)=> {
              if (response.code == 0) {
                _this.$message({
                  type: "success",
                  message: response.msg
                });
                _this.surveylist();
              } else {
                _this.$message({
                  type: "info",
                  message: response.msg
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    deleteok() {
      var datas = {
        data: {
          id: this.delId //调查工具id
        },
        token: "string",
        userId: 123
      };
      var _this = this;
      this.$post("/info/task/delTaskTool", datas)
        .then((response)=> {
          // _this.deletediog = false;
          // _this.$message({
          //     message: '删除成功',
          //     type: 'success'
          // });
          // //刷新列表
          // _this.surveylist();
          if (response.code == 0) {
            // _this.editorSurvey = false;
            _this.deletediog = false;
            _this.$message({
              type: "success",
              message: response.msg
            });
            _this.surveylist();
          } else {
            _this.$message({
              type: "info",
              message: response.msg
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="" scoped>
.notclick{
 pointer-events: none;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
<style scoped>
.surveyTool .surveyDetail li em {
  cursor: pointer;
}
.clss {
  float: right;
}
.iclas {
  float: left;
}
.cssls {
  display: inline-block;
  width: 300px;
  height: 6px;
  line-height: 1px;
  text-align: left;
  overflow: hidden;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.el-scrollbar__wrap {
  overflow-x: hidden;
}
.associatedContent {
}
/* 右边的样式 */
.rightShelter {
  margin-left: 20px;
}
.rightShelter .attentionMatters,
.rightShelter .relatedFile,
.rightShelter .surveyTool,
.rightShelter .associatedContent {
  margin-top: 30px;
}

.rightShelter .attentionMatters .addMatt,
.rightShelter .relatedFile .addRelate,
.rightShelter .surveyTool .addHref,
.rightShelter .associatedContent .addContent {
  border: 1px solid #d9d9d9;
  width: 460px;
  height: 32px;
  border-radius: 3px;
  text-align: center;
  line-height: 32px;
}
.rightShelter .attentionMatters .addMatt i,
.rightShelter .attentionMatters .addMatt span,
.rightShelter .relatedFile .addRelate i,
.rightShelter .relatedFile .addRelate span,
.rightShelter .surveyTool .addHref i,
.rightShelter .surveyTool .addHref span,
.rightShelter .associatedContent .addContent i,
.rightShelter .associatedContent .addContent span {
  position: relative;
  top: -2px;
}
.rightShelter .attentionMatters .mattersDetail,
.rightShelter .relatedFile .relateDetail,
.rightShelter .surveyTool .surveyDetail,
.rightShelter .associatedContent .associatedDetail {
  margin-top: 20px;
}
.rightShelter .attentionMatters .mattersDetail li {
  border-radius: 3px;
  width: 460px;
  line-height: 20px;
  border: 1px solid #d9d9d9;
  height: auto;
  text-align: left !important;
  padding-bottom: 10px;
}

/* 相关文件和调查工具和关联内容的一部分样式 */
.rightShelter .relatedFile .relateDetail,
.rightShelter .surveyTool .surveyDetail,
.rightShelter .associatedContent .associatedDetail {
  border: 1px solid #d9d9d9;
}
.rightShelter .relatedFile .relateDetail h3,
.rightShelter .surveyTool .surveyDetail h3,
.rightShelter .associatedContent .associatedDetail h3 {
  color: #333;
  font-size: 14px;

  text-align: left !important;
}
.rightShelter .relatedFile .relateDetail .relateLi,
.rightShelter .surveyTool .surveyDetail .surveyLi,
.rightShelter .associatedContent .associatedDetail .associatedLi {
  margin-top: 3px;
  margin-left: 15px;
  margin-bottom: -19px;
}
.rightShelter .surveyTool .surveyDetail .surveyLi {
  text-align: left;
}
.rightShelter .surveyTool .surveyDetail .surveyLi span:nth-child(1) {
  width: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.rightShelter .surveyTool .surveyDetail .surveyLi span:nth-child(2) {
  width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: lef;
}
.rightShelter .relatedFile .relateDetail .relateLi em,
.rightShelter .surveyTool .surveyDetail .surveyLi em {
  margin-right: 10px;
  color: #0061a9;
}

/* 关联内容 */
.rightShelter .associatedContent .associatedDetail .associatedLi em {
  margin-right: 10px;
  color: #0061a9;
}

/* 任务动态 */
.rightShelter .dynamicTask {
  height: 560px;
  overflow-y: auto;
  border-bottom: 1px solid #d9d9d9;
}
.rightShelter .dynamicTask h4 {
  color: #333333;
  font-size: 14px;
  text-align: left !important;
  margin-bottom: 15px;
}
.rightShelter .dynamicTask h5 {
  color: #999999;
  text-align: left !important;
  margin-bottom: 15px;
}
.rightShelter .dynamicTask .dynamicUl li {
  margin-bottom: 15px;
}
.rightShelter .dynamicTask .dynamicUl li p {
  margin-bottom: 10px;
}
.rightShelter .dynamicTask .dynamicUl li p span,
.rightShelter .dynamicTask .dynamicUl li p em {
  color: #999;
}
.rightShelter .dynamicTask .dynamicUl li p span .downFiles {
  color: #0061a9 !important;
  margin-left: 5px;
}

/* 底下发布 */
.dialogOthers {
}
.dialogOthers textarea {
  width: 98%;
  height: 100px;
  border: 0px;
  padding-top: 10px;
}
.dialogOthers .release {
}
.dialogOthers .release img {
  width: 24px;
  height: 24px;
}
.dialogOthers .release span {
  color: #0061a9;
}

/* 关联内容弹框中的样式 */
/* .el-checkbox:last-child{
    margin-right: 30px!important;
} */

.contentTab .taskNames {
  text-align: left;
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  margin-top: 5px;
}
.contentTab .el-checkbox__label img {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}
.spans {
  height: 200px;
  overflow: hidden;
  overflow-y: auto;
}
.attentionMatters,
.rightShelter .relatedFile,
.rightShelter .surveyTool,
.rightShelter .associatedContent {
  margin-top: 3px;
}
</style>
