<template>
  <div class="custom_tag-wrapper" :class="{ 'min-width': isEdit }">
    <transition name="el-zoom-in-center" mode="out-in">
      <el-input
        v-show="isEdit"
        v-model="labelName"
        ref="tagInputRef"
        class="custom-input"
        size="small"
        placeholder="请输入标签名称"
        maxlength="10"
        minlength="1"
        @keyup.enter.native="handleInputConfirm"
        @blur="blurHandle"
      ></el-input>
    </transition>
    <el-tag
      v-show="!isEdit"
      class="custom-tag"
      :type="tagType"
      :closable="edit"
      @click="switchTagStatus"
      @close="handleClose"
      >{{ labelName }}
    </el-tag>
  </div>
</template>

<script>
import { trim, delay } from './tools';

const tagStatus = {
  edit: 1,
  selected: 2,
  normal: 3,
};

export default {
  name: "CustomTag",

  props: {
    dataSource: {
      type: Object,
      required: true,
    },
    edit: {
      type: Boolean,
      required: true,
    }
  },

  computed: {
    isEdit() {
      return !this.dataSource.isNotFit && this.status === tagStatus.edit;
    },
    tagType() {
      if (!this.edit) {
        return '';
      }
      return this.status === tagStatus.normal ? "info" : "";
    },
  },

  data() {
    const { id, isNotFit, labelIntro, labelName, identifier } = this.dataSource;
    return {
      status: tagStatus.normal,
      id,
      isNotFit,
      labelIntro,
      labelName,
      identifier,
    };
  },

  methods: {
    async switchTagStatus() {
      if (this.$parent.validaDetails()) {
        return;
      }
      const validate = await this.$parent.validate()
      if (validate) {
        return;
      }
      if (!this.edit) {
        this.$parent.$emit('click-tag', { ...this.dataSource });
        return;
      }
      this.status = tagStatus.edit;
      this.$nextTick((_) => {
        this.getFocus();
        this.$parent.updateSiblingElesStatus(this);
      });
    },

    getFocus() {
      this.$refs.tagInputRef.$refs.input.focus();
    },

    async blurHandle() {
      await delay(50);
      this.handleInputConfirm();
    },

    handleInputConfirm() {
      const str = trim(this.labelName);
      if (!str) {
        this.labelName = this.dataSource.labelName;
      }
      this.$parent.$emit('update-tag-info', this.getTagValue(), () => {
        this.status = tagStatus.selected;
      });
    },

    setNormalStatus() {
      this.status = tagStatus.normal;
    },

    setSelectedStatus() {
      this.status = tagStatus.selected;
    },

    getTagValue() {
      const {
        id,
        isNotFit,
        labelIntro,
        labelName,
        identifier,
      } = this;

      return {
        id,
        isNotFit,
        labelIntro,
        labelName,
        identifier,
      }
    },

    handleClose() {
      this.$parent.$emit('remove-tag', this.getTagValue())
    }
  },

  watch: {
    dataSource(newData) {
      const { id,
        isNotFit,
        labelIntro,
        labelName,
        identifier, } = newData;

      this.id = id;
      this.isNotFit = isNotFit;
      this.labelIntro = labelIntro;
      this.labelName = labelName;
      this.identifier = identifier;
    }
  }
};
</script>

<style lang="scss" scoped>
.custom_tag-wrapper {
  display: inline-flex;
  margin-right: 10px;
  clear: both;
  height: 30px;
  position: relative;
  margin-bottom: 10px;

  &.min-width {
    min-width: 120px;
  }

  .custom-tag {
    cursor: pointer;
  }

  .custom-input {
    width: 120px;
    vertical-align: bottom;
    position: absolute;
    left: 0px;
    top: 0px;
  }
}
</style>
