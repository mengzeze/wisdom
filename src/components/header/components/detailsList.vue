<template>
  <div class="list__box" :style="`height:${height}px`">
    <div class="list__item-content" v-loading="loading" :style="`height:${height-78}px`">
      <el-table 
        :data="tableData"
        show-header
        fit
        :header-cell-style="{background:'#FAFAFA',color:'#000',fontWeight:'800'}" 
        :height="height-78"
        style="width: 100%" 
        class="pro_table">
        <el-table-column 
          v-for="(item,idx) in header" 
          :key="idx" 
          :prop="item.prop" 
          :label="item.label" 
          :align="item.align || 'center'" 
          :min-width="item.min || '100'">
          <template slot-scope="scope">
            <p v-if="!item.slot" class="list__item-td"  :title="redirect(item,scope.row)">
              {{redirect(item,scope.row)}}
            </p>
            <div v-else>
              <slot :name="item.prop" :data="scope.row"></slot>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="list__item-page" :style="`height:78px;text-align:right;`">
      <!-- 页码模块 -->
      <el-pagination
        background layout="total, sizes, prev, pager, next, jumper"
        :total="totals"
        :pageSize.sync="page.size"
        :page-sizes="page.choosable"
        :current-page.sync="page.current"
        @current-change="onPageChange"
        @size-change="handleSizeChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    header:{
      type:Array,
      default:()=>([])
    },
    height:{
      type:Number,
      default:400,
    },
    tableData:{
      type:Array,
      default:()=>([])
    },
    totals:{
      type:Number,
      default:0
    },
    loading:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return {
      page:{
        size:10,
        current:0,
        choosable:[10, 20, 50, 100],
      },
    }
  },
  methods:{
    pageInit(){
      this.page.current = 0
    },
    onPageChange(...params){
      this.$emit('pageChange',this.page)
    },
    handleSizeChange(...params){
      this.pageInit()
      this.$emit('pageChange',this.page)
    },
    redirect(params,data){
      let { prop,redirect } = params
      if(!redirect || (typeof redirect !== 'function' && typeof redirect !== 'string')) {
        return data[prop];
      }
      if(redirect){
        return typeof redirect === 'function' ? redirect(data[prop],data,...data) : data[redirect];
      }
      return data[prop]
    }
  }
}
</script>
<style lang="scss" scoped>
.list__box{
  display: flex;
  flex-direction: column;
  text-align: center;
  .list__item-content{
    flex:1;
  }
  .list__item-td{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .list__item-page{
    flex:0;
  }
}
</style>