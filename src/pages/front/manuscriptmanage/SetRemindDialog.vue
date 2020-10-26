<template>
  <div>
    <el-dialog title="设置提醒"
               :visible="isShowSetRemind"
               :close-on-click-modal="false"
               :before-close="setRemindClose"
               width="818">
      <span>
        <div class="reminddialog">
          <p class="remindfont">设置提醒后，有版本变动的文件将会在"消息中心"红点标记提醒！</p>
          <p class="remindfont">关闭提醒后，该文件对所有人的提醒均关闭！</p>
          <ul align="left"
              class="riwjn_we">
            <li class="usernanmestlt"
                style="width:96px;"><i style="color:#f56c6c;position:relative;right:4px;">*</i>提醒人员：</li>
            <span class="flex a-center">
              <i @click="optPrinFn"
                 class="add_icon iconfont webicon308 color-primary fs-22 mr-5"></i>
              添加人员</span>
            <li class="usernanmes">
              <el-tag v-for="(item,index) in deployObj"
                      :key="index"
                      class="userbtn"
                      @close="closePeople(index)"
                      closable>
                {{item.name}}
              </el-tag>
              <span v-if="deployObj.length>0">&nbsp;&nbsp;</span>
            </li>
            <span class="flex a-center "
                  style="margin-left:96px;margin-top:10px;">
              <i @click="roles"
                 class="add_icon iconfont webicon308 color-primary fs-22 mr-5"></i>
              <!-- <img @click="roles"
                   src="../../../assets/image/addtask.png"
                   alt=""
                   class="shekterAdd"> -->
              添加角色</span>
            <li class="usernanmes">
              <el-tag v-for="(item,index) in strs"
                      :key="index"
                      class="userbtn"
                      @close="closerole(index)"
                      closable>
                {{item.roleName}}
              </el-tag>
              <span v-if="strs.length>0">&nbsp;&nbsp;</span>
            </li>
          </ul>
          <p class="usernanmestltfile">选择的文件：</p>
          <ul align="left"
              class="riwjn_wechose">
            <li class="chosefile"
                v-for="(item,index) in filelist"
                :key="index">
              <span class="file_name"
                    :title="item.docName">{{item.docName}}</span>
              <i class="color-primary"
                 @click="deletefile(index)">删除</i>
            </li>
          </ul>
        </div>
      </span>
      <span slot="footer"
            class="dialog-footer">
        <el-button size="medium"
                   @click="closeremind">关闭提醒</el-button>
        <el-button size="medium"
                   type="primary"
                   @click="startsetRemind">设置提醒</el-button>
      </span>
    </el-dialog>
    <select-boxs :rights="rights"
                 v-if="flags"
                 @statesbox='statesboxs'
                 :Role="{state:2}"
                 :roledata="roledata" />
    <findall-deptuser :findFlagShow.sync="findFlag"
                      @findAllUser="findAllUser"
                      :findUserObj="findUserObj"
                      :findState="findState"
                      :checkState="{ state: 2 }"></findall-deptuser>
  </div>
</template>

<script>
import selectBoxs from '@/components/select_box/select_boxs3'
import findallDeptuser from "@/components/select_box/findAllDeptUserMultipleNew"
export default {
  name: 'setRemind',
  components: {
    findallDeptuser,
    selectBoxs
  },
  data() {
    return {
      findFlag: false,
      flags: false,
      findUserObj: [],
      deployObj: [],
      strs: [],
      seljs: [],
      rights: '',
      roledata: '',
      filelist: this.chosefilelist,
      findState: { state: 0 }
    }
  },
  props: ['chosefilelist', 'isShowSetRemind'],
  methods: {
    // 点击添加人员
    optPrinFn() {
      this.findFlag = true;
      // this.findUserObj = this.$utils.cloneDeepArray(this.deployObj)
      this.findUserObj = this.deployObj
      console.log(1234, this.findUserObj)
    },
    // 选择人员确定
    findAllUser(data) {
      console.log(data)
      this.deployObj = data;
      this.findFlag = false;
    },
    //删除选择角色
    closerole(num) {
      this.strs.splice(num, 1);
    },
    // 选择角色确定
    statesboxs(data) {
      this.flags = false;
      this.strs = data;
      this.$store.commit("setdatas", data);
    },
    roles() {
      this.seljs = this.$utils.cloneDeepArray(this.strs)
      this.$post('/sys/getQueryRole').then((response) => {
        this.roledata = response.data;
        this.flags = true;
      }).catch(err => { console.log(err) });
    },
    closePeople(num) {
      this.deployObj.splice(num, 1);
    },
    // 删除提醒弹框中的文件
    deletefile(index) {
      this.filelist.splice(index, 1);
      this.$emit('update:chosefilelist', this.filelist)
    },
    // 设置提醒弹框关闭
    setRemindClose() {
      this.findFlag = false;
      this.filelist.length = 0; // 文件列表
      this.deployObj.length = 0; // 选择人员id
      this.strs.length = 0; // 选择角色id
      this.$store.commit("setdatas", []);
      this.$emit('remindClose') // 关闭弹框回调
      this.$emit('update:isShowSetRemind', false);
    },

    //关闭提醒
    closeremind() {
      if (this.filelist.length == 0) {
        this.$message.warning("未选中要关闭的文件");
        return;
      }
      this.$post('/doc/project/closeReminder', {
        data: {
          docSource: 1,
          fileIds: this.filelist.map(v => { return { id: v.id, docId: v.docId } })
        }
      }).then((response) => {
        if (response.code != 0) {
          this.$message.error(response.msg);
          return
        }
        this.setRemindClose();
        this.$message.warning({
          message: "您已成功关闭本人设置的文件提醒"
        });
      }).catch(err => { console.log(err) });
    },
    // 开始设置提醒
    startsetRemind() {
      if (this.deployObj.length == 0 && this.strs.length == 0) {
        this.$message.error("请在提醒人员中添加人员或者角色");
        return;
      }
      if (this.filelist.length == 0) {
        this.$message.error("请重新选择要提醒的文件");
        return;
      }
      this.$post('/doc/project/reminder', {
        sourceName:'底稿管理',
        projectName:this.$store.state.projectMsg.projectMsg.name,
        paperFlag:true,
        data: {
          docSource: 1,
          acceptIds: this.deployObj.map(v => v.id),  //人员id
          acceptMemberIds: this.strs.map(v => v.id), //角色id
          fileIds: this.filelist.map(v => { return { id: v.id, docId: v.docId } }), //文件id
          projectId: this.$store.state.projectMsg.pro_id  //项目id
        }
      }).then((response) => {
        if (response.code != 0) {
          this.$message.error(response.msg);
          return
        }
        this.setRemindClose();
        
        this.$emit('remindSuccess')
        this.$message.success("文件设置提醒成功");

      }).catch(err => { console.log(err) });
    }
  }
}
</script>

<style lang="scss" scoped>
// 设置提醒样式
.reminddialog {
  .add_icon {
    padding-top: 2px;
    cursor: pointer;
  }
  .remindfont {
    text-align: left;
    color: #de4747;
    line-height: 26px;
  }

  .riwjn_we {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    top: -10px;
    .shekterAdd {
      width: 24px;
      height: 24px;
      position: relative;
      top: 7px;
      margin-right: 8px;
      cursor: pointer;
    }
  }

  .riwjn_we li {
    margin-top: 6px;
    line-height: 30px;
  }
  .riwjn_wechose {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    max-height: 70px;
    overflow-y: auto;
    top: -10px;
    .shekterAdd {
      width: 24px;
      height: 24px;
      position: relative;
      top: 7px;
      margin-right: 8px;
      cursor: pointer;
    }
  }
  .riwjn_wechose li {
    margin-top: 6px;
    line-height: 30px;
  }

  .usernanmestlt {
    width: 14%;
  }
  .usernanmestltfile {
    margin-top: 10px;
    text-align: left;
    float: left;
  }

  .usernanmes {
    width: 84%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-left: 97px;
    max-height: 170px;
    overflow-y: auto;
  }

  .userbtn {
    margin-left: 10px;
    margin-top: 10px;
  }
  .chosefile {
    width: 86%;

    .file_name {
      float: left;
      // margin-top: -9px;
      width: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    i {
      float: right;
      margin-left: 10px;
      position: relative;
      cursor: pointer;
    }
  }
  .chosefile:hover {
    background: #f7f9fb;
  }
}
</style>