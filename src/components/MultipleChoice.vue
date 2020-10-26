<template>
  <div :class="[unicodeId,{'sel-inline':isInline}]"
       :title="titleMsg">
    <el-select :style="{ width:`${width}px` }"
               :value="selMsg"
               @change="preventClose"
               ref="sel">

      <el-option :value="allSelData.value">
        <el-checkbox :indeterminate="isAllInter"
                     v-model="isAllChecked"
                     @change="handleCliickAll">
          <div class="label-item">{{ allSelData.label }}</div>
        </el-checkbox>

      </el-option>

      <el-option v-for="(item,index) in originData"
                 :key="index"
                 :value="item.value">
        <el-checkbox v-model="item.isSel"
                     @change="selChange">
          <div class="label-item">{{ item.label }}</div>
        </el-checkbox>
      </el-option>
    </el-select>
  </div>
</template>


<script>
/**
 * 用于筛选条件下拉选择
 * @author zl
 * @param {Array} selectData 选项内容(不包含全部) 必填
 * @param {Array:item(Number)} defaultSelectedValues 需要默认选中的value
 * @param {Boolean} isInline 是否行内标签 default: inline
 * @param {Number} width 组件宽度
 * @return {Array} 返回选中的选项
 * @desc 点确定时会触发changeData事件，携带参数为选中项
 *       如果数据为异步获取，获取到数据后手动调用组件initComponents方法
 * 
 */
export default {
  name: 'MultipleChoice',
  props: {
    selectData: {
      type: Array,
      required: true
    },
    defaultSelectedValues: {
      type: Array,
      default: () => [],
      validator (val) {
        return val.every(item => !isNaN(item))
      }
    },
    isInline: {
      type: Boolean,
      default: true
    },
    width: {
      type: Number,
      default: 200
    }
  },
  data () {
    return {
      selMsg: '',
      titleMsg: '',
      originData: this.selectData,
      isAllChecked: false,
      isAllInter: false,
      checkboxData: [],
      allSelData: {
        label: '全部',
        value: 999
      },
      unicodeId: Date.now().toString(36),
      inputDom: null
    }
  },
  created () {
    this.$nextTick(() => {
      this.inputDom = $(`.${ this.unicodeId } .el-input__inner`)[0];
    });
    this.initComponents()

  },
  methods: {
    initComponents () {
      this.originData.forEach(item => {
        item.isSel = false;
      })
      // 处理默认选中
      if (this.defaultSelectedValues.length > 0) {
        this.originData.forEach(item => {
          this.defaultSelectedValues.forEach(items => {
            if (item.value == items) {
              item.isSel = true;
            }
          })
        })
        this.filterCheckedData();
        this.changeSelMsg();
        this.allBtnStatus();
        return
      }

      this.handleCliickAll(true);
    },
    clearSel () {
      this.handleCliickAll(true);
      this.allBtnStatus();
    },
    selChange (val, item) {
      this.preventClose();
      this.$forceUpdate();
      this.filterCheckedData();
      this.allBtnStatus();
      this.changeSelMsg();
    },
    // 处理全选按钮状态
    allBtnStatus () {
      if (this.checkboxData.length < this.originData.length && this.checkboxData.length !== 0) {
        this.isAllChecked = false;
        this.isAllInter = true;
      } else if (this.checkboxData.length == this.originData.length) {
        this.isAllChecked = true;
        this.isAllInter = false;
      } else if (this.checkboxData.length == 0) {
        this.isAllInter = false;
      }
    },
    // 更新选中内容
    filterCheckedData () {
      this.checkboxData.length = 0;
      this.originData.forEach(item => {
        if (item.isSel) {
          this.checkboxData.push(item)
        }
      });
      if (this.originData.length === this.checkboxData.length) {
        this.$emit('changeData', [])
        return
      }
      this.$emit('changeData', this.checkboxData.map(item => {
        return { value: item.value, label: item.label }
      }));
    },
    /**
     * 全选
     * @param status 全选按钮状态
     */
    handleCliickAll (status) {
      if (this.isAllChecked) {
        this.isAllInter = false;
      }
      this.isAllChecked = status;
      this.originData.forEach(item => item.isSel = status);
      this.filterCheckedData();
      this.changeSelMsg();
    },
    //  处理选中文字
    changeSelMsg () {
      this.titleMsg = this.checkboxData.length !== 0 ? `(${ this.checkboxData.map(v => v.label).join('/') })` : '';
      if (this.checkboxData.length == this.originData.length || (this.isAllChecked && !this.isAllInter)) {
        this.selMsg = this.allSelData.label;
        return
      }
      if (this.checkboxData.length == 0) {
        this.selMsg = '';
        return
      }
      this.selMsg = `已选中${ this.checkboxData.length }项(${ this.checkboxData.map(v => v.label).join('/') })`;
      this.setSelPosition();
    },
    // 设置光标位置
    setSelPosition () {
      try {
        this.inputDom.focus();
        this.$nextTick(() => {
          this.inputDom.setSelectionRange(0, 0);
        })
      } catch (e) { }
    },
    cloneDeepArray (arr) {
      if (!arr || !arr.length) return []
      return arr.map(item => {
        if (typeof item == 'object') {
          return Object.assign({}, item)
        }
        return item
      })
    },
    // 阻止弹框关闭
    preventClose () {
      this.$nextTick(() => {
        this.$refs.sel.visible = true
      })
    }
  }
}
</script>
<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 0 !important;
}
.sel-inline {
  display: inline-block;
}
.label-item {
  display: inline-block;
  padding-left: 6px;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>