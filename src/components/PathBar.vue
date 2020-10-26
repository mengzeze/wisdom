<template>
    <div class="path-wrapper">
      <el-dropdown v-if="showMore"
                   trigger="click"
                   placement="bottom-start"
                   @command="handlePathClick">
        <span class="el-dropdown-link">
          <i class="el-icon-more"></i>
          <i class="el-icon-arrow-right" v-if="separator === 'arrow'"></i>
          <i class="el-breadcrumb__separator" v-else>/</i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item, i) in hiddenPath"
                            :key="i"
                            :command="item">{{item[field]}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <p
        v-for="(item,idx) in showPath"
        :key="idx"
        class="path-item">
        <span @click.stop="handlePathClick(item)"
              :title="item[field]"
              class="ellipsis1 pathName color-primary-hover">{{item[field]}}</span>
        <i class="el-icon-arrow-right" v-if="separator === 'arrow'"></i>
        <i class="el-breadcrumb__separator" v-else>/</i>
      </p>
    </div>
</template>

<script>
    export default {
      name: "PathBar",
      props:['paths', 'field', 'separator'],
      data() {
        return{
          hiddenPath:[], // 隐藏的路径集合
          showPath:[], // 展示的路径集合
          showMore: false // 是否展示更多
        }
      },
      created() {
        // 初始化路径展示
        this.handlePathData(this.paths)
      },
      methods:{
        /**
         * d点击路径名称，返回对应的
         * @param item 当前路径对象
         */
        handlePathClick(item) {
          this.$emit('toggle', item)
        },
        /**
         * 处理路径数据展示，默认展示5条路径数据，超出5条的部分展示更多（...）, 点击以dropdown形式展示
         * @param paths 全部路径集合
         */
        handlePathData(paths) {
          // 截取后5条数据为展示数据
          this.showPath = paths.slice(-5)
          // 判断是否展示更多
          this.showMore = paths.length > 5
          // 获取隐藏部分的数据
          this.hiddenPath = this.showMore
            ? paths.slice(0, paths.length-5)
            : []
        }
      },
      watch: {
        // 监听路径集合的变化，添加/回退路径时触发
        paths (val) {
          this.handlePathData(val)
        }
      }
    }
</script>

<style scoped>
  .path-item{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pathName {
    display: inline-block;
    max-width: 80px;
    cursor: pointer;
  }
  .path-wrapper {
    display: flex;
    align-items: center;
  }

</style>
