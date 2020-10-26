<template>
  <div class="findallparents">
    <div class="findalledptuser">
      <el-dialog
        title="选择人员"
        :visible.sync="innerVisible"
        width="730px"
        @close="closeS"
        :close-on-click-modal="false"
        v-loading.fullscreen.lock="isShowLoading"
        class="find_box"
      >
        <div class="clearfix find_cont">
          <div class="left_tree">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="客户联系人" name="first">
                <div style="border:1px solid #ddd;padding:12px;">
                  <el-input
                    placeholder="输入关键字进行搜索"
                    @keyup.enter.native="searchuserCompany(0)"
                    v-model.trim="company.inputsearch"
                    v-if="inputseachshow"
                    clearable
                    style="margin-bottom:4px;"
                  >
                    <el-button
                      slot="append"
                      icon="el-icon-search"
                      @click="searchuserCompany(0)"
                    ></el-button>
                  </el-input>
                  <div style="height:336px">
                    <el-scrollbar style="height:100%">
                      <div class="borrowList">
                        <p
                          class="borrowList_title"
                          v-if="listCompanyData.length === 0"
                          style="text-align:center;"
                        >
                          暂无数据
                        </p>
                        <!--@click="handleNodeClickD(item)"-->
                        <p
                          v-for="(item, idx) in listCompanyData"
                          :key="idx"
                          v-else
                          class="borrowList_item"
                        >
                          <span>
                            <el-checkbox
                              v-model="item.checked"
                              @change="checkChange(item)"
                              class="chooseA"
                            ></el-checkbox>
                          </span>
                          <span class="borrowList_item_fileIcon userImg-box">
                            <img
                              :src="
                                item.userImg == null
                                  ? require('@/assets/user_img/projectLogUser.png')
                                  : getImgUrl(item)
                              "
                            />
                          </span>
                          <!--borrowList_item_disabed-->
                          <span class="borrowList_item_title">{{
                            item.contactName
                          }}</span>
                        </p>
                      </div>
                    </el-scrollbar>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="机构联系人" name="second">
                <div style="border:1px solid #ddd;padding:12px;">
                  <el-input
                    placeholder="输入关键字进行搜索"
                    @keyup.enter.native="searchuserCompany(1)"
                    v-model.trim="company.search"
                    v-if="inputseachshow"
                    clearable
                    style="margin-bottom:4px;"
                  >
                    <el-button
                      slot="append"
                      icon="el-icon-search"
                      @click="searchuserCompany(1)"
                    ></el-button>
                  </el-input>
                  <div style="height:336px">
                    <el-scrollbar style="height:100%">
                      <div class="borrowList">
                        <p
                          class="borrowList_title"
                          v-if="listCompanyDatas.length === 0"
                          style="text-align:center;"
                        >
                          暂无数据
                        </p>
                        <p
                          v-for="(item, idx) in listCompanyDatas"
                          :key="idx"
                          class="borrowList_item"
                          v-else
                        >
                          <span>
                            <el-checkbox
                              v-model="item.checked"
                              @change="checkChangeD(item)"
                              class="chooseA"
                            ></el-checkbox>
                          </span>
                          <span class="borrowList_item_fileIcon userImg-box">
                            <img
                              :src="
                                item.userImg == null
                                  ? require('@/assets/user_img/projectLogUser.png')
                                  : getImgUrl(item)
                              "
                            />
                          </span>
                          <span class="borrowList_item_title">{{
                            item.contactName
                          }}</span>
                        </p>
                      </div>
                    </el-scrollbar>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="right_tree">
            <div
              style="line-height: 30px;box-sizing: border-box;text-align:left;margin-top:-10px;"
            >
              已选人员
            </div>
            <div style="border:1px solid #ddd;padding:12px;">
              <ul style="height:380px;">
                <el-scrollbar style="height:100%">
                  <li
                    v-for="(item, ind) in optionUser"
                    class="user_list"
                    :key="ind"
                  >
                    <span class="userImg-box">
                      <img
                        :src="
                          item.userImg == null
                            ? require('@/assets/user_img/projectLogUser.png')
                            : getImgUrl(item)
                        "
                      />
                    </span>
                    <span class="opt_name">{{ item.contactName }}</span>
                    <i
                      @click="delect(item, ind)"
                      class="el-dialog__close el-icon el-icon-close fr"
                      style="cursor:pointer;"
                    ></i>
                  </li>
                  <li v-if="!showList" class="pop_no_select_item_tips">
                    暂无选中项
                  </li>
                </el-scrollbar>
              </ul>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="medium" @click="cancelBtn">取 消</el-button>
          <el-button size="medium" type="primary" @click="findFlagUserFn"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab: 0,
      activeName: "first",
      innerVisible: false,
      optionUser: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      company: {
        inputsearch: "",
        search: ""
      },
      projectId: "",
      data: [],
      voteprojId: "",
      inputseachshow: true, //全员组织架构的搜索
      treeAndoList: [],
      listCompanyData: [],
      listCompanyDatas: [],
      showList: false,
      isShowLoading: false // 是否显示加载遮罩
    };
  },
  props: {
    findFlags: {
      type: Boolean,
      default: false
    },
    defaultSelects: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    searchSite() {
      return this.company.inputsearch || this.company.search;
    }
  },
  created() {
    this.voteprojId = this.$store.state.voteprojId;
  },
  mounted() {
    if (this.voteprojId !== "") {
      this.projectId = this.voteprojId;
    } else {
      this.projectId = this.$store.state.projectMsg.pro_id;
    }
    this.searchuserCompany(0);
  },
  methods: {
    handleClick(tab, event) {
      this.tab = tab.index;
      this.searchuserCompany(tab.index);
    },
    // 客户联系人及机构联系人的弹框
    searchuserCompany(val) {
      console.log(val, 23);
      // val 1-客户，2机构
      var typeObj = {
        projectId: this.projectId,
        data: {
          projectId: this.projectId,
          name: val == 0 ? this.company.inputsearch : this.company.search
        }
      };
      if (val == 0) {
        var url = "/info/crm/contact/listCompany";
      } else {
        var url = "/info/crm/contact/listIntermediary";
      }
      this.isShowLoading = true;
      this.$post(url, typeObj)
        .then(res => {
          this.isShowLoading = false;
          if (!res) {
            return;
          }
          if (res.code !== 0) {
            this.$message.error(res.msg);
            return;
          }
          if (res.data) {
            console.log(res.data, "data");
            res.data.forEach(v => {
              this.$set(v, "checked", false);
              this.$set(v, "disabled", false);
            });
            val == 0
              ? (this.listCompanyData = res.data)
              : (this.listCompanyDatas = res.data);
            if (this.optionUser.length && val == 0) {
              this.listCompanyData.forEach(v => {
                this.optionUser.forEach(m => {
                  if (v.id == m.id) {
                    v.checked = true;
                    v.disabled = true;
                  }
                });
              });
              return;
            }
            this.listCompanyDatas.forEach(v => {
              this.optionUser.forEach(m => {
                if (v.id == m.id) {
                  v.checked = true;
                  v.disabled = true;
                }
              });
            });
          }
        })
        .catch(error => {
          this.isShowLoading = false;
          console.log(error);
        });
    },
    // 确定
    findFlagUserFn() {
      this.$emit("findAllUser", this.optionUser);
      this.innerVisible = false;
      this.company.inputsearch = "";
      this.company.search = "";
      this.listCompanyData = [];
      this.listCompanyDatas = [];
      this.tab = 0;
      this.activeName = "first";
    },
    // 取消
    cancelBtn() {
      this.company.inputsearch = "";
      this.company.search = "";
      this.innerVisible = false;
    },
    //查询
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    checkChange(data) {
      this.$set(data, "delState", 0);
      this.$set(data, "type", 1);
      if (!data.checked) {
        this.optionUser.forEach((v, t) => {
          if (v.id === data.id) {
            this.optionUser.splice(t, 1);
          }
        });
        return;
      }
      this.optionUser.push(data);
    },
    // 机构联系人和客户联系人多选
    checkChangeD(data) {
      this.$set(data, "delState", 1);
      this.$set(data, "type", 3);
      if (!data.checked) {
        this.optionUser.forEach((v, t) => {
          if (v.id === data.id) {
            this.optionUser.splice(t, 1);
          }
        });
        return;
      }
      this.optionUser.push(data);
    },
    //    删除
    delect(item, index) {
      console.log(item, "itemtem");
      this.optionUser.splice(index, 1);
      const cycleArr = this[
        item.delState == 0 ? "listCompanyData" : "listCompanyDatas"
      ];
      const delIndex = cycleArr.findIndex(v => v.id === item.id);
      if (delIndex !== -1) {
        cycleArr[delIndex].checked = false;
        cycleArr[delIndex].disabled = false;
      }
    },
    closeS() {
      // this.optionUser = []
      this.optionUser = [];
      this.listCompanyData.forEach(v => {
        v.checked = false;
      });
      this.listCompanyDatas.forEach(v => {
        v.checked = false;
      });
      this.innerVisible = false;
      this.company.inputsearch = "";
      this.company.search = "";
      this.tab = 0;
      this.activeName = "first";
    },
    getImgUrl(item) {
      return this.$utils.getDownloadUrl(item.userImg);
    }
  },
  watch: {
    optionUser(val, oldval) {
      console.log(val, val.length);
      if (val && val.length) {
        this.showList = true;
        return;
      }
      this.showList = false;
    },
    searchSite(newValue, oldValue) {
      if (newValue == "" || newValue == undefined || newValue == null) {
        this.searchuserCompany(this.tab);
        
      }
    },
    findFlags(val) {
      this.innerVisible = val;
    },
    innerVisible(status) {
      this.$emit("update:findFlags", status);
      this.searchuserCompany(0);
      if (status) {
        this.optionUser = this.defaultSelects.map(item => {
          item.delState = item.type === 1 ? 0 : 1;
          return item;
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.findallparents .findalledptuser .el-dialog {
  .find_cont {
    .left_tree {
      float: left;
      width: 49%;
      //   border-right: 1px solid #ddd;
      box-sizing: border-box;
      padding-right: 10px;
      margin-top: -15px;
      //   border:1px solid #ddd;
      .borrowList_item {
        display: flex;
        justify-content: flex-start;
        text-align: left;
        padding-left: 10px;
        font-size: 14px;
        line-height: 35px;
        align-items: center;
        .borrowList_item_disabed {
          color: rgba(144, 147, 153, 1);
        }
      }
      .borrowList_title {
        text-align: center;
      }
      .borrowList_item:hover {
        background-color: #f5f7fa;
      }
      .userImg-box {
        margin: 0 10px;
      }
    }
    .right_tree {
      float: right;
      width: 49%;
      //   border:1px solid #ddd;
    }
  }
  .custom-tree-node-span {
    display: flex;
    align-items: center;
  }
  .elipet {
    width: 150px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
  }
  .userImg-box {
    display: inline-block;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 7px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
<style>
.findallparents .findalledptuser .find_cont .el-tree-node__label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.findallparents .findalledptuser .opt_name {
  /* padding-left: 10px; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 200px;
  display: inline-block;
  text-align: left;
}
.findallparents .findalledptuser .user_list {
  line-height: 30px;
  text-align: left;
}
.findallparents .findalledptuser .user_list .fr {
  position: relative;
  top: 8px;
  right: 10px;
}
.findallparents .findalledptuser .el-dialog__header {
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
}

.findallparents .findalledptuser .el-dialog__footer {
  margin-top: -13px;
}
.findallparents .findalledptuser .el-dialog__body {
  margin-top: 0px;
}
.findallparents .el-tree-node__content {
  display: flex;
  align-items: center;
  height: 25px;
  padding: 5px 0 5px 36px;
  margin-bottom: 1px;
}
.findallparents .el-tabs__header {
  margin: 0px;
}
</style>
