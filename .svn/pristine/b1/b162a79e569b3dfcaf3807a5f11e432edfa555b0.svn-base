<template>
  <div class="custo_tag_group-wrapper">
    <cutsom-tag
      v-for="(tag, key) in sortByTag"
      :key="key"
      :data-source="tag"
      :edit="edit"
      ref="tagRef"
    />

    <div v-if="allowAdd">
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        maxlength="10"
        minlength="1"
        placeholder="请输入标签"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">
        + 添加标签
      </el-button>
    </div>
  </div>
</template>

<script>
import CutsomTag from "./CutsomTag.vue";
import { trim, decorator } from './tools';

export default {
  name: "CustomTagGroup",

  props: {
    tags: {
      type: Array,
      required: true,
    },
    allowAdd: {
      type: Boolean,
      required: false,
      default: false,
    },
    edit: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

  computed: {
    sortByTag() {
      return this.tags.sort(item => item.isNotFit ? -1 : 1);
    },
  },

  components: {
    CutsomTag,
  },

  data() {
    return {
      inputVisible: false,
      inputValue: '',
    }
  },

  methods: {

    updateSiblingElesStatus(vNode) {
      const vNodes = this.$refs.tagRef;
      if (!vNodes || !vNode || vNodes.length === 0) {
        return;
      }
      vNodes.forEach((flag) => {
        if (flag._uid === vNode._uid) {
          this.$emit('current-selected-tag', vNode.dataSource);
          return;
        }
        flag.setNormalStatus();
      });
    },

    showInput() {
      const addTag = this.validaIsNotFit()
      if(addTag){
        return;
      }
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
        this.updateSiblingElesStatus(this.$refs.saveTagInput);
        this.$emit('current-selected-tag');
      });
    },

    handleInputConfirm() {
      let value = trim(this.inputValue);
      if (!value) {
        this.closeAddTag();
        return;
      }

      const tagData = {
        labelName: value,
        labelIntro: '',
        isNotFit: false,
        id: undefined,
      };

      this.$emit('add-tag', decorator(tagData), () => {
        this.closeAddTag();
      });
    },

    closeAddTag() {
      this.inputVisible = false;
      this.inputValue = '';
    },

    setSselected(tag) {
      const vNodes = this.$refs.tagRef;
      if (vNodes.length === 0) {
        return;
      }
      vNodes.forEach((flag) => {
        if (flag.identifier === tag.identifier) {
          flag.setSelectedStatus();
          this.$emit('current-selected-tag', flag.dataSource);
          return;
        }
        flag.setNormalStatus();
      });
    },

    getAllTagData() {
      const vNodes = this.$refs.tagRef;
      if (vNodes.length === 0) {
        return [];
      }

      return vNodes.map(vNode => {
        const { id, isNotFit, labelIntro, labelName, identifier } = vNode.getTagValue();
        return { id, isNotFit, labelIntro, labelName, identifier };
      });
    },

    validate() {
      return new Promise((resolve) => {
        this.$nextTick(() => {
          const vNodes = this.$refs.tagRef;
          const vNode = vNodes.find(item => {
            return this.validaRepeat(this.tags, item.getTagValue());
          })
          if (vNode) {
            resolve(true);
            vNode.getFocus();
            return;
          }
          resolve(false);
        });
      });
    },  

    validaRepeat(tags, tag) {
      const flags = tags.filter(flag => {
        if (flag.identifier !== tag.identifier) {
          return tag.labelName === flag.labelName;
        }
        return false;
      });

      return flags.length !== 0;
    },

    validaDetails() {
      const validate = this.$parent.$parent.getNotFitValue();
      return validate;
    },

    validaIsNotFit(){
      if(!this.$refs.tagRef){
        return;
      }
      const curTag = this.$refs.tagRef;
      const isNotFitFlags = curTag[0]
      if(!isNotFitFlags){
        return;
      }
      if(isNotFitFlags.isNotFit && !isNotFitFlags.labelIntro){
        return true;
      }
      return false;
    }
  },
};
</script>

<style lang="scss" scoped>
.custo_tag_group-wrapper {
  display: flex;
  flex-wrap: wrap;
}
.button-new-tag{
  border: 1px dashed #0061A9;
  color: #0061A9;
  background: #fff;
  border-radius: 4px;
}
</style>