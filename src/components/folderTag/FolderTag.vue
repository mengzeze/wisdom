<template>
  <div class="folder_tag-wrapper">
    <el-dialog
      center
      v-loading="loading"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :before-close="cancle"
    >
      <div slot="title" class="header-title">
          <span :title="'编辑标签-' + folderTagItem.docName" class="tit">编辑标签-{{folderTagItem.docName}}</span>
      </div>
      <div class="tag-title-mode">
        <span class="tag-title-mode-label">标签</span>
        <span class="tag-title-mode-mark">
          {{
            `最多还能添加${allowMaxTagNum - tags.length}个，按Enter回车保存。`
          }}
        </span>
      </div>
      <custom-tag-group
        ref="tagRef"
        class="tag-management-mode"
        :tags="tags"
        :allow-add="isAllowAdd"
        @add-tag="addTagHandle"
        @current-selected-tag="currentSelectedTag"
        @update-tag-info="updateTagInfo"
        @remove-tag="removeTagHandle"
      />
      <div class="tag-details-mode details-mode margin-top">
        <span class="is-required" v-show="isNotFit">*</span>
        <span class="tag-details-mode-label">{{ currentTagName }}标签说明</span>
        <span class="tag-details-mode-mark">
          最多可输入{{ 100 - selectedTag.labelIntro.length }}个字
        </span>
        <el-input
          v-model="selectedTag.labelIntro"
          type="textarea"
          class="textarea-wrapper"
          placeholder="请输入标签说明"
          maxlength="100"
          :class="{
            'is-error': this.isNotFitError,
            'is-required': this.isNotFitError,
          }"
          show-word-limit
          :autosize="{ minRows: 4 }"
          @blur="onBlurHandle"
          :disabled="isReadonly"
        >
        </el-input>
      </div>
      <div class="tag-used-mode">
        <span class="tag-used-mode-label">常用标签</span>

        <custom-tag-group
          class="tag-management-mode margin-top"
          :tags="usedTags"
          :edit="false"
          @click-tag="clickUsedTag"
        />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="saveTagHandle">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CustomTagGroup from "./CustomTagGroup.vue";
import { delay, decorator } from './tools';

const ALLOW_MAX_TAG_NUM = 10;
const EMPTY_TAG = {
  id: undefined,
  labelName: '',
  labelIntro: '',
  isNotFit: false,
};

export default {
  name: "FolderTag",

  components: {
    CustomTagGroup,
  },

  props: {
    folderTagItem: {
      type: [String, Object],
      required: true,
    },
    folderTagShow: {
      type: Boolean,
      required: true,
    },
    isFolder: {
      type: Boolean,
      required: false,
      default: true,
    }
  },

  data() {
    return {
      loading: false,
      dialogVisible: false,
      allowMaxTagNum: ALLOW_MAX_TAG_NUM,
      tags: [],
      usedTags: [],
      inputValue: '',
      inputVisible: false,
      selectedTag: EMPTY_TAG,
    };
  },

  computed: {
    isAllowAdd() {
      return !!(this.allowMaxTagNum - this.tags.length);
    },
    currentTagName() {
      console.log(this.selectedTag)
      const { labelName } = this.selectedTag;
      return labelName ? `${labelName}-` : "";
    },
    isNotFit() {
      return this.selectedTag.isNotFit;
    },
    isNotFitError() {
      return this.isNotFit && !this.selectedTag.labelIntro.length;
    },

    isReadonly() {
      return !this.selectedTag.id && !this.selectedTag.identifier;
    }
  },

  watch:{
      folderTagShow(val){
        this.dialogVisible = val;
        val && this.getTags()
      }
    },

  methods: {
    async getTags() {
      this.loading = true;
      // 接口请求
      // await delay(2000);
      let param = {
        data: {
          paperId: this.folderTagItem.id,
          docType: this.folderTagItem.docType
        },
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId
      };
      return await this.$post("/doc/paper/label/getLabelByPaperId", param).then(response => {
        this.loading = false;
        if (response.code == 0) {
          this.tags = decorator(response.data.labelList); // 已有标签
          // this.createBy = response.data.labelList[0].createBy;
          this.usedTags = response.data.userLabel;
          if(this.folderTagItem.docType == 0){
            this.usedTags.shift()
          } else {
            if(this.usedTags.length > 1){
              this.usedTags.pop()
            }
          }
          this.$nextTick(() => {
            this.setDefaultSelectedtag();
          });
        } else if(response.code == -504){}else {
          this.$message({ message: response.msg, type: "error" });
        }
      }).catch(function(error) {});
    },

    setDefaultSelectedtag() {
      const tag = this.tags[0];
      if (!tag) {
        return;
      }
      this.selectedTag = tag;
      this.$refs.tagRef.setSselected(tag);
    },

    getNotFitValue() {
      return this.isNotFitError;
    },

    getCurrentTagName(){
      return this.currentTagName;
    },

    addTagHandle(tag, done = () => {}) {
      const valida = this.validaRepeat(this.tags, tag);
      if (valida) {
        return;
      }
      if(this.tags.length == 10){
        this.$message.error('标签最多添加10个')
        return
      }
      tag = this.formatTag(tag);
      done();
      this.tags.push(tag);
      this.$nextTick(() => {
        this.$refs.tagRef.setSselected(tag);
      });
    },

    currentSelectedTag(tag = EMPTY_TAG) {
      this.selectedTag = Object.assign({}, tag);
    },

    clickUsedTag(tag) {
      const clickuseTag =  this.$refs.tagRef.validaIsNotFit();
      if(clickuseTag){
        return;
      }
      const newTag = Object.assign(
        {},
        {...EMPTY_TAG},
        {...tag},
      );
      this.addTagHandle(decorator(newTag));
    },

    saveTagHandle() {
      if (this.isNotFitError) {
        this.$message.error('不适用标签说明不能为空');
        return;
      }
      this.$nextTick(() => {
        const data = this.$refs.tagRef.getAllTagData();
        let paramData;
        if(data.length > 0){
          paramData = data.map(ele => {
            return {
              id: ele.id,
              labelName: ele.labelName,
              isNotFit: ele.isNotFit,
              labelIntro: ele.labelIntro,
              paperId: this.folderTagItem.id,
              parentId: this.folderTagItem.parentId,
              docName: this.folderTagItem.docName
            }
          });
        } else { // 全部删除后需传paperId & delFlag
          paramData = [{
            paperId: this.folderTagItem.id,
            delFlag: 1
          }]
        }
        let params = {
          data: paramData,
          token: this.$store.state.loginObject.userToken,
          userId: this.$store.state.loginObject.userId,
          sourceName: '底稿管理',
          projectName: this.$store.state.projectMsg.projectMsg.name,
          paperFlag: true
        };
        this.$post("/doc/paper/label/saveLabels", params).then(response => {
          if (response.code == 0) {
            this.$message({ message: response.msg, type: "success" });
            this.$emit("update:folderTagShow", false);
            this.$emit("folderTagSubmit");
            this.reset()
          } else {
            this.$message({ message: response.msg, type: "error" });
          }
        })
        .catch(function(error) {});
      });
    },

    onBlurHandle() {
      const selectedTag = this.selectedTag;
      this.updateTagInfo(this.selectedTag);
    },

    updateTagInfo(tag, done = () => {}) {
      const flags = this.tags.filter(flag => flag.identifier !== tag.identifier);
      const valida = this.validaRepeat(flags, tag);
      if (valida) {
        return;
      }

      tag = this.formatTag(tag);
      done();
      const tags = this.tags.map(flag => {
        if (flag.identifier === tag.identifier) {
          return tag;
        }
        return flag;
      });
      this.tags = JSON.parse(JSON.stringify(tags));
      this.selectedTag = tag;
    },

    validaRepeat(tags, tag) {
      const flags = tags.filter(flag => tag.labelName === flag.labelName);
      if (flags.length !== 0) {
        this.$message.error('已存在该标签，请重新输入！');
        return true;
      }
      return false;
    },

    formatTag(tag) {
      const fitLabel = ['不适用'];
      if (fitLabel.includes(tag.labelName) && this.isFolder) {
        tag.isNotFit = true;
      }
      return tag;
    },

    removeTagHandle(selectedTag) {
      if(!selectedTag.isNotFit){
        const removeTag =  this.$refs.tagRef.validaIsNotFit();
        if(removeTag){
          return;
        }
      }
      const index = this.tags.findIndex((tag) => {
        return tag.identifier === selectedTag.identifier;
      });

      this.tags.splice(index, 1);
      this.$nextTick(() => {
        const flag = this.tags[0];
        if (flag) {
          this.$refs.tagRef.setSselected(flag);
        } else {
          this.selectedTag = {
            id: undefined,
            labelName: '',
            labelIntro: '',
            isNotFit: false,
          };
          this.getCurrentTagName()
        }
      });
    },

    cancle(){
      this.dialogVisible = false;
      this.$emit('update:folderTagShow', false);
      this.reset();
    },

    reset(){
      this.allowMaxTagNum = ALLOW_MAX_TAG_NUM;
      this.tags =  [];
      this.usedTags =  [];
      this.inputValue =  '';
      this.inputVisible = false;
      this.selectedTag =  EMPTY_TAG;
    }
  },
};
</script>


<style lang="scss" scoped>
.folder_tag-wrapper {
  .tag-title-mode,
  .tag-used-mode,
  .tag-details-mode {
    width: 100%;
    margin-bottom: 15px;

    &.margin-top {
      margin-top: 10px;
    }

    .margin-top {
      margin-top: 10px;
    }

    .is-required {
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #ff4545;
      line-height: 20px;
    }

    &-label {
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: left;
      color: #303133;
      line-height: 22px;
    }

    &-mark {
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #909399;
      line-height: 17px;
    }

    .textarea-wrapper {
      display: block;
      margin-top: 20px;

      &.is-error {
        /deep/ .el-textarea__inner {
          border: 1px solid #ff4545 !important;
        }
      }

      &.is-required {
        &::after {
          content: '不适用标签说明是必填项，不能为空';
          font-size: 14px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: left;
          color: #ff4545;
          line-height: 20px;
        }
      }
    }
  }

  .tag-management-mode {
    widows: 100%;
    display: flex;

    &-add {
      display: inline-block;
      .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
      }
      .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
      }
    }
  }

  .dialog-footer {
    text-align: right;
  }

  .tit {
    display: inline-block;
    width: 480px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    font-size: 18px;
  }
}
</style>