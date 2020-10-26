<template>
    <div id="business_tree" :style="`width:${width};`">
        <!-- 搜索框以及移动焦点按钮栏 -->
            <div v-show="search" class="search_box" :search="selectClass === 'search_show'">
                <el-input placeholder="搜索业务类型"
                    clearable v-model="select"
                    @keyup.enter.native="handleSelectClick(select,true,'select','click')" >
                    <el-button slot="append" icon="el-icon-search" @click.stop="handleSelectClick(select,true,'select','click')"></el-button>
                </el-input>
            </div>

        <!-- 关键字搜索列表条数展示模块 -->
        <div  v-show="selectClass === 'search_show'" :class="`message ${selectClass}`">
        <!-- <div  v-show="select" :class="`message ${ select && typeof select === 'string' ? 'search_show' : ''}`"> -->
            <div class="message_wrap" v-show="hint.show">
                <p class="message_hint">共{{hint.sum}}个结果,第{{hint.number}}个</p>
                <div class="message_move">
                <el-button style="padding: 5px"
                            size="mini"
                            icon="el-icon-arrow-up"
                            :disabled="hint.number === 1 || hint.number === 0"
                            @click.stop="handleMoveFocus('up')"></el-button>
                <el-button style="padding: 5px"
                            size="mini"
                            icon="el-icon-arrow-down"
                            :disabled="hint.number === hint.sum || hint.number === 0"
                            @click.stop="handleMoveFocus('down')"></el-button>
                </div>
            </div>
        </div>
        <div class="current-bus" v-if="isShowCurrentBus">
            <div class="current-bus-tit">当前业务类型</div>
            <div :class="['current-bus-item','ellipsis1',{'background-primary current-bus-sel':finaTypeId == nodeData.id}]" @click="activeSelNode($store.state.projectMsg.projectMsg.financingId)" :title="$store.state.projectMsg.projectMsg.financingName">{{$store.state.projectMsg.projectMsg.financingName}}</div>
            <div class="current-bus-tit">业务类型</div>
        </div>
        <!-- 树结构部分模块 -->
        <div :class="['tree_view',{'current_bus_tree':isShowCurrentBus}]" :search="search" :data-search="selectClass" @scroll="handleScroll" class="tree-wraper">
            <div v-show="shade && shadeShow" class="tree_shade">
                <div class="tree_shade_top"></div>
                <div class="tree_shade_button"></div>
            </div>
            <el-tree
                :data="data"
                ref="tree"
                :expand-on-click-node="false"
                default-expand-all
                :filter-node-method="()=>true"
                :highlight-current="true"
                node-key="index"
                current-node-key
                @node-click="handleNodeClick"
                empty-text="未搜索到结果"
                :props="defaultProps" >
                <div
                    class="custom_tree_node"
                    slot-scope="{ data }"
                    >
                    <div
                        :data-id="data.id"
                        :data-index="data.index"
                        :title="data.label"
                        :data-label="data.label">
                        {{ data.label }}
                    </div>
                </div>
            </el-tree>
        </div>
    </div>
</template>
<script>
export default {
    name:'businessTree', // 组件名称
    data(){
        return {
            selectClass:'',
            shade:false,
            data:[],    // 树结构数据
            select:'',  // 搜索查询字段
            hint:{
                show:false,
                sum:0,
                number:0,
            },
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            selectNodeFlag:false, // 选中指定节点标识
            finaTypeId: 0, // 业务类型id 选中指定节点使用
            isFirstSelNode:true,
            nodeData: {} // 当前点击节点的数据
        }
    },
    watch:{
        select(newData){
            // this.handleSelectClick(newData,true,'select')
            if(newData.trim() === ''){
                 if(this.data.length === 0){
                    this.data = this.$Business.type
                }
                Object.assign(this.hint,{
                    show : false,
                    sum : 0,
                    number : 0
                })

                if(this.general === false){
                    this.selectClass = ''
                    this.$nextTick(()=>{
                        let num = this.$Business.type[0].index
                        this.$refs.tree.setCurrentKey(num)
                        let node = this.$refs.tree.getNode(num)
                        // this.$refs.tree.setCurrentKey(3)
                        // let node = this.$refs.tree.getNode(3)
                        $('div').removeClass('highlight business_focus')
                        this.$Business.scrollBar($('div[data-index]').eq(0))
                        this.nodeData = node
                        this.$emit('load',this.$Business.type[0],node)
                    })
                }else{
                    this.selectClass = ''
                    this.$refs.tree.setCurrentKey(null)
                    this.$Business.actionPlan()
                    $(`div`).removeClass('highlight business_focus')
                    this.$Business.scrollBar($('div[data-index]').eq(0))
                }
            }
        },
        // $businessSelect:{
        //     handler(newData){
        //         if(newData.procTypeId === 1){
        //             this.$refs.tree.setCurrentKey(1)
        //         }
        //     },
        //     deep:true,
        // },
        project:{
            handler(object){
                this.$refs.tree.filter(true)
                if(Object.keys(object).length === 0){
                    this.$Business.processStore()
                    this.$refs.tree.setCurrentKey(null)
                    this.shade = false
                }else{
                  console.log('test,aaaaa')
                    this.$Business.processStore(object)
                    this.$nextTick(()=>{
                        let parentEl = $('div[data-id="R777"]').parents('.el-tree-node').eq(0)
                        let el = parentEl.find(`div[data-id="${this.$Business.processParams.finaTypeId}"]`)
                        let index = el.attr('data-index')
                        this.$refs.tree.setCurrentKey(null)
                        this.$refs.tree.setCurrentKey(index)
                        this.$Business.action = this.$refs.tree.getNode(index)
                        setTimeout(()=>{
                            this.$Business.scrollBar(el)
                            this.handleShadeShow()
                        },200)
                    })
                }
            },
            deep:true,
        }
    },
    /**
     * 点击等选择事件可在调用组件时配置method事件
     **/
    props:{
        prot:{type:Array,default:()=>{return []}},
        shadeShow:{type:Boolean, default:true}, // 是否需要遮罩
        isOnlyBus:{type:Boolean,default:false}, // 是否只选中业务类型
        isShowCurrentBus:{type:Boolean,default:false}, // 是否显示当前融资类型
        businessSelect:{ type:Object, default:function(){ return {} }}, // 业务选择（现阶段可能是无效字段）
        general:{type:Boolean,default:true}, // 是否展示全部，普通审批，项目类型字段判定
        default:{ type:Boolean,default:false }, // 是否默认选中
        project:{ type:Object, default:function(){ return {} }},// 组件内想项目监听
        width:{ type:String, default:'254px' }, // 组件的宽度
        // height:{ type:String, default:'600px' }, // 组件内树结构的高度
        search:{ type:Boolean, default:false }, // 组件是否支持搜索功能
        business:{ type:Object, default:function(){ // 组件内实例初始化配置
            return {
                updateFocus:true, // true为刷新焦点，false为不刷新焦点
                reset:true, // true为重新获取树结构，false为不重新获取树结构
            }}
        }
    },
    methods:{
        /**
         * 手动设置选择节点 父元素使用$refs调用此方法
         * @param {Number} id 业务类型id
         */
        activeSelNode(id) {
            this.finaTypeId = id
            this.selectNodeFlag = true
            !this.isFirstSelNode && this.selectNode()
        },
        /**
         * 手动选择节点 此方法不可在组件外调用
         * @param {Number} id 业务类型id
         */
        selectNode(id = this.finaTypeId) {
            this.$nextTick(() => {
                let JQdom = $(`div[data-id="${id}"]`)
                if(JQdom.length == 0) { // 在树中没有找到 说明当前业务类型被禁用
                    this.nodeData.id = id
                    $('#business_tree *').removeClass('is-current')
                    this.$emit('noSearchBus',id)
                    return
                }
                let index = JQdom.attr('data-index')
                // this.$refs.tree.setCurrentKey(null)
                this.$refs.tree.setCurrentKey(index)
                this.$Business.scrollBar($(`div[data-id="${id}"]`))
                let node = this.$refs.tree.getNode(index)
                let obj = this.$Business.flatData.find(res=>res.index == index)
                this.nodeData = obj
                this.$emit('method',obj,node)
            })
        },
        // 不可点击遮罩
        handleShadeShow(){
            this.$nextTick(()=>{
                let viewOffset = $('.tree_view').offset()
                let viewHeight = $('.tree_view').height()
                let offset = $('.is-current').offset()

                if(offset && offset.top){
                    $('.tree_shade_top').css({
                        marginTop:'0px',
                        height:(offset.top-229+28+25) < 0 ? 0 : (offset.top-229+28+25) >= viewHeight ? viewHeight : (offset.top-229+28+25)
                    })
                    let topHeight = $('.tree_shade_top').height()
                    let height = viewHeight-topHeight
                    $('.tree_shade_button').css({
                        marginTop: topHeight === 0 ? '0px' : '28px',
                        height:`${height}px`
                    })
                }else{
                    $('.tree_shade_top').css({
                        marginTop:'0px',
                        height:'0px'
                    })
                    $('.tree_shade_button').css({
                        marginTop: '0px',
                        height:`${viewHeight}px`
                    })
                    // setTimeout(()=>{
                    //     this.handleShadeShow()
                    // },100)
                }
                this.shade = true
            })
        },
        // 滚动条
        handleScroll(event){
            if(this.shade){
                 let viewHeight = $('.tree_view').height()
                let top = $(event.target).scrollTop()
                let left = $(event.target).scrollLeft()
                $('.tree_shade').css({
                    top : top,
                    left : left
                })
                this.handleShadeShow()
            }
        },
        // 点击事件，res为焦点数据
        handleNodeClick(res,node,data){
            if(this.select && this.select !== ''){
                Object.assign(this.hint,{
                    number : this.$Business.focusClick(event,this.select).focusIndex+1
                })
            }else{
                $('#business_tree *').removeClass('highlight business_focus')
            }
            this.$Business.actionPlan(false,res)
            this.handleMethod()
        },

        // 输入框查询事件
        handleSelectClick(res,boolean = true,dir,type){
            Object.assign(this.hint,{
                sum : 0,
                number : 0
            })
            this.selectClass = ''
            if(this.data.length === 0){
                this.data = this.$Business.type
            }
            if(dir === 'select'){
                if(this.select){
                    let str = res && typeof res === 'string' ? res : this.select
                    this.$refs.tree.filter(str)
                    this.$nextTick(()=>{
                        this.handleScrollOffset(str)
                        Object.assign(this.hint,{
                            show : str.trim() !== '' ? true : false,
                            sum : this.$Business.sum,
                            number : this.$Business.sum !== 0 ? 1 : 0
                        })
                        if(this.$Business.sum === 0 && dir === 'select'){
                            this.$refs.tree.setCurrentKey(null)
                            this.$Business.actionPlan()
                            if(type === 'click'){
                                this.data=[]
                                this.$message.error('无数据，请输入其他关键字后重试')
                            }
                        }else{
                            this.selectClass = 'search_show'
                        }
                        this.handleMethod(boolean)
                    })
                }else{
                    this.$refs.tree.setCurrentKey(null)
                    this.$Business.actionPlan()
                    $(`div`).removeClass('highlight business_focus')
                    if(type === 'click'){
                        this.$message.error('请输入想要搜索的业务类型关键字后点击搜索');
                    }
                    // this.$nextTick(()=>{
                    //     this.$emit('method',{},{})
                    // })
                }
            }else{
                let str = res && typeof res === 'string' ? res : this.select
                this.$refs.tree.filter(str)
                this.$nextTick(()=>{
                    this.handleScrollOffset(str)
                    this.handleMethod(boolean)
                })
            }
        },
        handleScrollOffset(str){
            let business = this.$Business.query(str)
            if(business.length > 0){
                setTimeout(()=>{
                    this.$refs.tree.setCurrentKey(business[0].index)
                    this.$Business.scrollBar($(`div[data-index="${business[0].index}"]`))

                    // this.$nextTick(()=>{
                    //     setTimeout(()=>{
                    //         this.$Business.scrollBar($(`div[data-index="${business[0].index}"]`))
                    //     },200)
                    // })

                    setTimeout(()=>{
                        // this.$Business.scrollBar($(`div[data-index="${business[0].index}"]`))
                    },200)
                },500)
            }
        },
        // 上下移动焦点事件
        handleMoveFocus(res){
            let business = this.$Business.focus(res)
            Object.assign(this.hint,{
                number : this.$Business.focusIndex+1
            })
            this.$refs.tree.setCurrentKey(business.index)
            setTimeout(()=>{
                this.$Business.scrollBar($('.is-current'))
            },100)
            this.handleMethod()
        },
        // 抛出参数方法
        handleMethod(boolean=true){
            this.$nextTick(()=>{
                console.log('进了这里；；；是是是')
                if(this.$Business.action && typeof this.$Business.action.index !== 'undefined'){
                    this.$refs.tree.setCurrentKey(this.$Business.action.index)
                    let node = this.$refs.tree.getNode(this.$Business.action.index)
                    let object = Object.assign({},this.$Business.action,{
                        id:this.$Business.action.id==="R777" ? 'all' : this.$Business.action.index === 0 ? "" :this.$Business.action.id
                    })
                    this.nodeData = object
                    if(boolean){
                        this.$emit('method',object,node)
                    }
                }else{
                    if(boolean){
                        this.$emit('method')
                    }
                }
            })
        },

        // 树结构轮询定位
        handlePollFunc(i){
            setTimeout(()=>{
                // let JQdom = $(`div[data-id="${this.$Business.processParams.finaTypeId}"]`)
                let parentEl = $('div[data-id="R777"]').parents('.el-tree-node').eq(0)
                let JQdom = parentEl.find(`div[data-id="${this.$Business.processParams.finaTypeId}"]`)
                if(JQdom.length > 0 && JQdom.attr('data-index')){
                    let index = JQdom.attr('data-index')
                    this.$refs.tree.setCurrentKey(null)
                    this.$refs.tree.setCurrentKey(index)
                    this.$Business.scrollBar(JQdom)
                    this.handleShadeShow()
                }else if(i < 10){
                    this.handlePollFunc(i++)
                }else if(JQdom.length === 0){

                }
            },200)
        }
    },
    async mounted(){
        await this.$Business.init(this.business,{bool:this.general,prot:this.prot})
        // Object.assign(this.businessSelect,this.$Business.select)
        // 树结构数据等于Business实例的type参数
        this.data = this.$Business.type
        // 渲染成功后置逻辑
        await this.$nextTick(()=>{
            $('.tree_shade').height()

            // 树结构跳转回显业务类型
            if(this.default && !this.$Business.processParams){
                this.$refs.tree.setCurrentKey(0)

            }
            // 不包含普通审批 默认选中第一条数据
            if(this.general === false){
                let num = this.$Business.type[0].index
                this.$refs.tree.setCurrentKey(num)
                let node = this.$refs.tree.getNode(num)
                this.nodeData = node
                this.$emit('load',this.$Business.type[0],node)
            }

            this.selectNodeFlag && this.selectNode()
            this.isFirstSelNode = false
            // 若this.$Business.processParams存在，则为其他页面跳转，其他页面跳转则定位树结构
            if(this.$Business.processParams){
                this.handlePollFunc(0)
            }

            this.$Mit.watch({
                'select':(res,node)=>{
                    this.$nextTick(()=>{
                        if($('.is-current').length !== 0){
                            let num = this.$refs.tree.getCurrentKey()
                            if(num === 1 && node.procTypeId.toString() !== '1'){
                                this.$refs.tree.setCurrentKey('0')
                            }
                        }
                        if(node.procTypeId.toString() === '1'){
                            this.$refs.tree.setCurrentKey('1')
                        }
                    })
                },

                // 监听树参数刷新树结构列表
                'tree':(res,target)=>{
                    this.$Business.init(this.business,this.general)
                    this.data = this.$Business.type
                },
                'addNode':(res,target)=>{  // 添加树节点后同步数据
                    let data = this.$refs.tree.getCurrentNode()
                    this.$Business.flatData.push(target[target.length-1]) // 追加至扁平化数据
                    !data.children && this.$set(data, 'children', [])
                    data.children.push(Object.assign(target[target.length-1],{index:this.$Business.flatData.length+3}))
                },
                'removeNode':(res,target)=>{ // 删除树节点后同步数据
                    let data = this.$refs.tree.getCurrentNode()
                    let index = data.children.findIndex(res=>res.id === target)
                    if(index !== -1){
                        data.children.splice(index,1)
                    }
                }
            })
        })
    }
}
</script>
<style lang="scss" scope>
.current-bus {
    height: 90px;
    &-tit {
        font-size: 16px;
        padding:5px 0;
        text-align: left;
        font-weight: bold;
        color:#333;
    }
    &-item {
        color:#333;
        padding-left: 15px;
        line-height: 26px;
        text-align: left;
        cursor: pointer;
    }
    &-sel {
        color:#fff;
    }
}
.tree_view.current_bus_tree[search=true] {
    height:calc(100% - 145px);
    &[data-search=search_show]{
        height:calc(100% - 164px);
    }
}
.search_box {
    padding-bottom: 10px;
    &[search=true]{
        padding-bottom: 0px;
    }
}

#business_tree{
    height: 100%;
    padding-top: 10px;
    background: #fff;
    overflow: hidden;
    box-sizing: border-box;
}
// 树结构视窗样式
.tree_view{
    position:relative;
    width: 100%;
    height: 100%;
    overflow:scroll;
    &[search=true]{
        height:calc(100% - 55px);
        &[data-search=search_show]{
            height:calc(100% - 74px);
        }
    }
}
.tree_shade{
    position: absolute;
    z-index:2000;
    width: 100%;
    height:0px;
    >div{
        background: rgba(255,255, 255, 0.6);
        &:nth-child(1){
            height: 25px;
        }
        &:nth-child(2){
        }
        &:nth-child(3){
        }
    }
}

// 高亮样式
.el-tree-node:focus>.el-tree-node__content{
    // color:#fff !important;
    // background-color:#0061A9 !important;
}
.highlight{
    background: rgb(226, 236, 255);
}
// 焦点高亮样式
.business_focus{
    border:1px solid #b2ceee !important;
}
// #business_tree .el-tree-node>.el-tree-node__children{
//     overflow:visible !important;
//     overflow-x:hidden !important;
// }
#business_tree{
    .el-scrollbar .el-scrollbar__wrap {overflow-x: hidden !important;}
    .el-tree>.el-tree-node{
        min-width: 100% !important;
        display:inline-block !important;
    }
}
// 信息提示与焦点移动模块样式
.message {
    height:0px;
    padding:2px 0px;
    &_wrap{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    &_hint {
        margin-left: 2.5%;
        font-size: 12px;
        color: #ba954b;
    }
    &_move {
        margin-right: 2.5%;
    }
}
.search_show{
    height:25px !important;
}
// .search_show{
//     animation:search_height 0.2s linear 1 forwards;
// }
@-webkit-keyframes search_height{
  0% {height:0px;}
  100% {height:25px;}
}
</style>
