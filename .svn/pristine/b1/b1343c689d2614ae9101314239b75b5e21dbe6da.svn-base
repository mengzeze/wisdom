<template>
  <div class="newproject" id="chosezhongjie">
    <el-dialog
      :title="titleNameTit"
      :visible.sync="choseProject"
      :close-on-click-modal="false"
      @close="choseProjectBtn"
      width="60%">
                <span>
                    <div class="chose_types clearfix">
                        <div class="fl choseLeft">
                            <h4>{{titleName}}</h4>
                            <div style="border:1px solid #ddd;padding:10px;">
                                <el-input v-model="filterText" placeholder="输入关键字进行搜索" class="choseInput" clearable>
                                    <el-button slot="append" icon="el-icon-search"></el-button>
                                </el-input>
                                <div style="height:330px;">
                                    <el-scrollbar style="height:100%">
                                        <!--<el-tree-->
                                          <!--v-if="stateFin === 2"-->
                                          <!--:data="finanObj"-->
                                          <!--:props="defaultProps"-->
                                          <!--:filter-node-method="filterNode"-->
                                          <!--ref="tree2"-->
                                          <!--show-checkbox-->
                                          <!--:expand-on-click-node="false"-->
                                          <!--:default-expanded-keys="dataId"-->
                                          <!--node-key="uniqueId"-->
                                          <!--@check="handleCheck"-->
                                        <!--&gt;-->
                                         <!--<span class="custom-tree-node" slot-scope="{ node, data }">-->
                                             <!--<span  v-if="data.mebsize || data.mebsize === 0" class="custom-tree-node-span">-->
                                                <!--&lt;!&ndash;{{ node.label}}&ndash;&gt;-->
                                               <!--&lt;!&ndash;<span>({{data.mebsize}})</span>&ndash;&gt;-->
                                               <!--<span class="elipet">-->
                                                <!--<el-tooltip v-if="node.label.length > 11" class="item" effect="dark" :content="node.label" placement="right-start">-->
                                                    <!--<span>{{ node.label}}({{data.mebsize}})</span>-->
                                                <!--</el-tooltip>-->
                                                 <!--<span v-else class="elipet">-->
                                                  <!--<span>{{ node.label}}({{data.mebsize}})</span>-->
                                                <!--</span>-->
                                              <!--</span>-->
                                            <!--</span>-->
                                            <!--<span  v-else class="custom-tree-node-span">-->
                                                <!--<span class="userImg-box">-->
                                                <!--<img :src="data.userImg == null ? require('@/assets/user_img/projectLogUser.png') : getImgUrl(data)">-->
                                                <!--</span>-->
                                              <!--&lt;!&ndash;{{ node.label}}&ndash;&gt;-->
                                              <!--<span class="elipet">-->
                                                <!--<el-tooltip v-if="node.label.length > 11" class="item" effect="dark" :content="node.label" placement="right-start">-->
                                                    <!--<span>{{ node.label}}</span>-->
                                                <!--</el-tooltip>-->
                                                 <!--<span v-else class="elipet">-->
                                                  <!--<span>{{ node.label}}</span>-->
                                                <!--</span>-->
                                              <!--</span>-->
                                            <!--</span>-->
                                         <!--</span>-->
                                          <!--&lt;!&ndash;<span v-else class="custom-tree-node" slot-scope="{ node, data }">&ndash;&gt;-->
                                          <!--&lt;!&ndash;<span  class="custom-tree-node-span">&ndash;&gt;-->
                                          <!--&lt;!&ndash;{{ node.label}}&ndash;&gt;-->
                                          <!--&lt;!&ndash;</span>&ndash;&gt;-->
                                          <!--&lt;!&ndash;</span>&ndash;&gt;-->
                                        <!--</el-tree>-->
                                      <el-tree
                                               :data="finanObj"
                                               :props="defaultProps"
                                               :filter-node-method="filterNode"
                                               ref="tree2"
                                               @node-click="handleNodeClick">
                                      </el-tree>
                                    </el-scrollbar>
                                </div>
                            </div>
                        </div>
                        <div class="fr choseRight">
                            <h4>已选择类型</h4>
                            <div style="height:380px;border:1px solid #ddd;padding:12px;">
                                <el-scrollbar style="height:100%;">
                                    <p class="clearfix" v-for="(item,index) in optArr" style="line-height: 40px;" :key="index">
                                        <span class="opted_type" :title="item.labelType">
                                          <span class="userImg-box">
                                            <img :src="item.userImg == null ? require('@/assets/user_img/projectLogUser.png') : getImgUrl(item)">
                                          </span>
                                          <span class="content ellipsis1">{{item.labelType}}</span>
                                          </span>
                                        <span class="fl opted_type" v-if="stateFin == 1" :title="item.label">{{item.label}}</span>
                                        <span class="fl" v-if="stateFin == 2">
                                            <el-select v-model="valueObj[index].value" placeholder="请选择内容" style="width:150px;margin-left:12px;" @change="roleOption(index,valueObj[index].value)">
                                            <el-option
                                              v-for="obj in typeObj"
                                              :key="obj.value"
                                              :label="obj.label"
                                              :value="obj.value">
                                            </el-option>
                                        </el-select>
                                        </span>
                                        <i class="el-icon-delete fr" style="cursor: pointer;position: relative;top:10px;"  @click="deleteOpt(item)"></i>
                                    </p>
                                    <h3 v-if="null_flag" class="pop_no_select_item_tips">暂无选中项</h3>
                                </el-scrollbar>
                            </div>

                        </div>

                    </div>
                </span>
      <span slot="footer" class="dialog-footer">
                    <el-button @click="choseProjectBtn">取 消</el-button>
                    <el-button type="primary" @click="sureType">确 定</el-button>
                </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data (){
      return {
        // 选择中介机构
        titleName:'中介机构',
        titleNameTit:'选择中介机构',
        choseProject:true,
        filterText:'',
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        null_flag: true,
        value: '',
        optArr:[],
        typeObj:[{
          value: '1056',
          label: '会计师事务所'
        }, {
          value: '1057',
          label: '律师事务所'
        }, {
          value: '1058',
          label: '资产评估机构'
        }, {
          value: '1059',
          label: '信用评级机构'
        }, {
          value: '1060',
          label: '券商机构'
        }],
        valueObj:[],
        roleOpt:[],
        dataId: [],
        multeData: []
      }
    },
    props:['finanObj',"stateFin","roleSelect","selectAgenOrMem","teamMemSelecRoleList"],
    created () {
      console.log('888888888888888',this.finanObj)
    },
    watch:{
      finanObj: function(newV, oldV) {
        this.choseProject=true;
        // this.initDisableStatus(newV)
        this.data = newV;
        this.optArr = this.$utils.cloneDeepArray(this.selectAgenOrMem);
        this.valueObj = this.$utils.cloneDeepArray(this.teamMemSelecRoleList);
        // this.findFlagBox(this.selectAgenOrMem)
      },
      stateFin: function(newV, oldV) {
        this.choseProject=true;
        this.optArr = this.$utils.cloneDeepArray(this.selectAgenOrMem);
        if(newV == 1){
          this.titleNameTit = "选择中介机构";
          this.titleName = "中介机构";
          this.valueObj = [];
          this.typeObj = [{
            value: '1056',
            label: '会计师事务所'
          }, {
            value: '1057',
            label: '律师事务所'
          }, {
            value: '1058',
            label: '资产评估机构'
          }, {
            value: '1059',
            label: '信用评级机构'
          }, {
            value: '1060',
            label: '券商机构'
          }];
        }
      },
      filterText(val) {
        this.$refs.tree2.filter(val);
      },
      optArr:function(newV,oldV){
        if(newV.length == 0){
          this.null_flag = true;
        }else{
          this.null_flag = false;
        }
      },
      roleSelect:function(newV){
        this.typeObj = newV;
      },
    },
    mounted(){
      // console.log(this.stateFin)
      var newV=this.stateFin
      this.choseProject=true;
      this.optArr = this.$utils.cloneDeepArray(this.selectAgenOrMem);
      if(newV == 1){
        this.titleNameTit = "选择中介机构";
        this.titleName = "中介机构";
        this.typeObj = [{
          value: '1056',
          label: '会计师事务所'
        }, {
          value: '1057',
          label: '律师事务所'
        }, {
          value: '1058',
          label: '资产评估机构'
        }, {
          value: '1059',
          label: '信用评级机构'
        }, {
          value: '1060',
          label: '券商机构'
        }];
      }
    },
    methods:{
      // stateFin === 2 -团员信息
      // initDisableStatus(list) {
      //   list.forEach((m, index) =>{
      //     (m.mebsize === 0 || m.mebsize) ?  this.$set(m, 'disabled', true) : this.$set(m, 'disabled', false)
      //     if (m.fields) {
      //       m.uniqueId = m.fields.data.uniqueId
      //       this.dataId.push(m.uniqueId)
      //     }
      //     if(m.lists && m.lists.length){
      //       m.lists.forEach(v =>{
      //         this.$set(v, 'disabled', false)
      //       })
      //     }
      //     if(m.children && m.children.length){
      //       m.children.forEach((v, i) =>{
      //         this.$set(v, 'disabled', false)
      //         if (v.fields && v.fields.data) {
      //           v.uniqueId = v.fields.data.uniqueId
      //         }
      //       })
      //       this.initDisableStatus(m.children)
      //     }
      //   })
      // },
      filterNode(value,data){
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      handleNodeClick(data){
        if(this.stateFin == 1){
          if(!data.children){
            var num = 0;
            for(var i=0;i<this.optArr.length;i++){
              if(data.name == this.optArr[i].name && data.id == this.optArr[i].id){
                num = 1;
              }
            }
            if(num == 0){
              this.optArr.push(data);
              var obj = {
                value:"",
                name:"",
              };
              this.valueObj.push(obj);
            }
          }
        }
      },
      setDataValue (data) {
        if(this.stateFin == 1){
          if(!data.children){
            var num = 0;
            for(var i=0;i<this.optArr.length;i++){
              if(data.name == this.optArr[i].name && data.id == this.optArr[i].id){
                num = 1;
              }
            }
            if(num == 0){
              data.labelType = data.labelType
              this.optArr.push(data);
              var obj = {
                value:"",
                name:"",
              };
              this.valueObj.push(obj);
            }
          }
        }
      },
      // findFlagBox (val) {
      //   if (val.length) {
      //     // 默认上一个选中的值
      //     let arr = []
      //     let array = []
      //     val.forEach(v => {
      //       arr.push(v.uniqueId)
      //       array.push(v)
      //     })
      //     this.arrKeys = arr
      //     this.multeData = val // 将字节点放在一个数组中-便于后期删除
      //     this.$refs.tree2.setCheckedKeys(arr)
      //     return
      //   }
      //   this.arrKeys = []
      //   this.$refs.tree2.setCheckedKeys(this.arrKeys)
      // },
      handleCheck (currentObj, treeStatus) {
        let arr = []
        this.optArr.forEach(v => {
          if (v.uniqueId === currentObj.uniqueId) {
            arr.push(currentObj)
          }
        })
        if (arr.length) return
        let selected = treeStatus.checkedKeys.indexOf(currentObj.uniqueId)
        this.selectedata = this.$refs.tree2.getCheckedNodes() // 选中的所有节点
        if (selected !== -1) {
          this.multeData.push(currentObj) // 将字节点放在一个数组中-便于后期删除
          currentObj.disabled = true // 选中的禁用
          this.setDataValue(currentObj)
          console.log(this.finanObj, 2323, this.multeData)
          this.$forceUpdate()
        }
      },
      sureType(){
        if(this.stateFin == 1){
          this.$emit('finanProject',this.$utils.cloneDeepArray(this.optArr));
          this.choseProject=false;
          this.filterText = '';
        }
        // else{
        //   var num = 0;
        //   for(var i=0;i<this.valueObj.length;i++){
        //     if(this.valueObj[i].value == ""){
        //       this.$message.error("关联角色不能为空！");
        //       num = 1;
        //     }
        //   }
        //   if(num == 0){
        //     for(var i=0;i<this.valueObj.length;i++){
        //       for(var j=0;j<this.typeObj.length;j++){
        //         if(this.valueObj[i].value == this.typeObj[j].value){
        //           this.valueObj[i].name = this.typeObj[j].label;
        //         }
        //       }
        //     }
        //     var arrAry = [];
        //     for(var i=0;i<this.optArr.length;i++){
        //       var obj = {};
        //       obj.name = this.valueObj[i].name;
        //       obj.value = this.optArr[i].name;
        //       arrAry.push(obj);
        //     }
        //     // this.$emit('finanProject',this.$utils.cloneDeepArray(this.optArr),this.valueObj,arrAry);
        //     this.$emit('finanProject',this.$utils.cloneDeepArray(this.optArr),this.$utils.cloneDeepArray(this.valueObj),this.$utils.cloneDeepArray(arrAry));
        //     this.choseProject=false;
        //     this.filterText = '';
        //   }
        // }
      },
      choseProjectBtn(){
        this.choseProject = false;
        this.filterText = '';
      },
      deleteOpt(item){
        if (this.stateFin !== 2) {
          var num = 0;
          let idata = ''
          for (var i = 0; i < this.optArr.length; i++) {
            if (item.id == this.optArr[i].id) {
              num = i;
            }
          }
          this.optArr.splice(num,1);
          this.valueObj.splice(num,1);
          // return
        }
        // var num = 0;
        // let idata = ''
        // for (var i = 0; i < this.optArr.length; i++) {
        //   if (item.uniqueId == this.optArr[i].uniqueId) {
        //     num = i;
        //   }
        // }
        // this.optArr.splice(num,1);
        // this.valueObj.splice(num,1);
        // let array = {}
        // array = this.multeData[num]
        // this.multeData.splice(num, 1)
        // let arrId = []
        // this.multeData.forEach(v => {
        //   arrId.push(v.uniqueId)
        // })
        //
        // console.log(item, 6363, arrId)
        // // 删除重新设置节点及展开取消禁用
        // this.$refs.tree2.setCheckedKeys(arrId)
        // // 检查选中的节点中是都有父节点
        // this.selectedata.forEach(v => {
        //   (v.mebsize === 0 || v.mebsize) ?  this.$set(v, 'disabled', true) : this.$set(v, 'disabled', false)
        // })
        // this.$refs.tree2.store.nodesMap[item.uniqueId].expanded = true
      },
      roleOption(ind,val){
        for(var i=0;i<this.typeObj.length;i++){
          if(val == this.typeObj[i].name){
            this.roleOpt.push(this.typeObj[i]);
          }
        }
      },
      getImgUrl(item){
        return this.$utils.getDownloadUrl(item.userImg)
      }
    }
  }
</script>

<style>
  #chosezhongjie .chose_types .choseLeft{
    width: 49%;
    padding-right: 10px;
  }
  #chosezhongjie .el-dialog__header{
    border-bottom: 1px solid #ddd;
  }
  #chosezhongjie .el-dialog__footer{
    padding-top:0px;
    margin-top:-10px;
  }
  #chosezhongjie .chose_types .choseLeft h4,
  #chosezhongjie .chose_types .choseRight h4{
    font-size: 14px;
    color: #333;
    margin-bottom: 10px;
    text-align: left;
  }

  #chosezhongjie .chose_types .choseLeft .choseInput{
    margin-bottom: 10px;
  }
  #chosezhongjie .chose_types .choseRight{
    width: 48%;
  }
  #chosezhongjie .chose_types .choseRight p{
    margin-bottom: 5px;
    margin-right: 16px;
    text-align: left;
  }

  #chosezhongjie .chose_types .choseRight span:nth-child(2) .names{
    margin-left: 20px;

  }
  #chosezhongjie .chose_types .choseRight .el-select{
    width: 80%;
  }
  #chosezhongjie .opted_type{
    display: inline-block;
    width:160px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    display: flex;
    justify-content: flex-start;
  }
  #chosezhongjie .opted_type .content {
    width: 120px;
    background: none;
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
  .userImg-box{
    display: inline-block;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 7px;
  }
  .userImg-box img{
    width: 100%;
    height: 100%;
  }
  #chosezhongjie .el-tree-node__content {
    display: flex;
    align-items: center;
    height: 25px;
    padding: 5px 0 5px 36px;
    margin-bottom: 1px;
  }

</style>
