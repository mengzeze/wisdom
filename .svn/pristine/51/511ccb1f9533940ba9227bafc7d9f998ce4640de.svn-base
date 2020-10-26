<template>
    <div>
         <el-dialog title="新建任务" :close-on-click-modal="false" :visible.sync="changeWindowadd" width="600px" @close="change">
            <div class="clearfix">
                <div class="fl" style="width:114%;margin-left: 29px;">
                    <el-form  ref="formaddTask" style="text-align: left;padding-right: 18%;">
                        <el-form-item label="" :label-width="formLabelWidth">
                             <span style="float:left;margin-left: -19%;"><i style="color: red;">*</i>任务名称</span>
                            <el-input style="width: 91%;" type="textarea"   resize='none' maxlength="500" v-model="name" placeholder="请输入名称"></el-input>
                        </el-form-item>
                         <el-form-item label="执行人" :label-width="formLabelWidth">
                             <span>
                             <i @click="shelterpars" class="iconfont webicon308 color-primary fs-22"></i>
                              <!-- <span v-for="item in executor" style="margin-right:5px;" >{{item.name}}</span> -->
                              <el-tag
                                v-for="(tag) in executor"
                                :key="tag.id"
                                closable
                                 @close="executors(tag)"
                                :type="tag.type">
                                {{tag.name}}
                                </el-tag>
                            </span>
                        </el-form-item>
                        <el-form-item label="抄送人" :label-width="formLabelWidth">
                            <span>
                            <i @click="shelterGlobal" class="iconfont webicon308 color-primary fs-22"></i>
                            <!-- <span v-for="item in ccpeople" >{{item.name}}</span> -->
                             <el-tag
                                v-for="tag in ccpeople"
                                :key="tag.id"
                                closable
                                @close="ccpeoples(tag)"
                                :type="tag.type">
                                {{tag.name}}
                                </el-tag>
                            </span>
                        </el-form-item>
                        <el-form-item label="起止时间" :label-width="formLabelWidth">
                            <div class="block">
                                <el-date-picker
                                    v-model="value6"
                                    type="daterange"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    :picker-options="pickerOptionsStart"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    @focus="$utils.handleTimeFocus">
                                </el-date-picker>
                            </div>
                        </el-form-item>
                        <el-form-item label="任务提醒" :label-width="formLabelWidth">
                            <div style="float:left">
                                  <el-select v-model="remindoptions" @change="rwtx" placeholder="请选择">
                                    <el-option
                                    v-for="item in remindoption"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                             <div style="float:left;padding-top: 0px;">
                                 <el-select v-if="txfs"  v-model="checkListoptions" multiple placeholder="方式">
                                <el-option
                                v-for="item in  checkListoption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                             </div>
                        </el-form-item>
                       <el-form-item label="优先级" :label-width="formLabelWidth">
                            <el-select v-model="value"  @change="Priority" placeholder="请选择">
                                <el-option
                                v-for="(item,index) in options"
                                :key="index"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="任务内容" :label-width="formLabelWidth">
                               <Editor :changes="changes" @htmls2="htmls2" />
                            <!-- <el-input type="textarea"   resize='none' v-model="content" placeholder="请输入内容"></el-input> -->
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer" style="text-align:center;padding-right: 120px;">
                        <el-button @click="changeWindowadd = false">取 消</el-button>
                        <el-button type="primary" @click="taskAdddiloag">创 建</el-button>
                     </div>
                </div>
            </div>
        </el-dialog>
        <select_box  :findFlagShow.sync="flags" :findState="findState" @findAllUser="findAllUser" :checkState="checkState" />
         <!-- <select_box v-if="flag"  :roledata="roledata" v-on:statesbox="statesbox" />
        <select_boxs v-if="flags" v-on:statesboxlist="statesboxlist" :roledata="roledata" /> -->
    </div>
</template>
<script>
import Editor from '@/components/select_box/Editor3'
import select_box from '@/components/select_box/findAllDeptUserMultipleNew'
export default {
    props:["flagadd","addnew",'mrid'],
    components:{
        // select_box,
        select_box,
        Editor
        // select_boxs,
    },
    data (){
        return {
            msg:'',
            checkState:'',
            findState:'',
            changes:{state:0},
            flag:false,
            txfs:false,
            flags:false,
            ccpeople:[],
            remind:'',
            taskCopyer:[],
            value6:[],
            executor:[],
            executorarr:[],
            remindVay:'',
            txds:true,
            zxr:'',
            pickerOptionsStart: {
                disabledDate(time) {
                    return time.getTime() < new Date(new Date().toLocaleDateString()).getTime();
                }
            },
            roledata:[],
            typeshow:'info',
            // token:"String",
            // userId:"123",
            taskExecutors:[],
            changeWindowadd:this.flagadd,
            dialogFormVisible: true,
            name:'',
            content:'',
             checkListoptions:[],
            checkListoption:[
                {
                    value: 0,
                    label: '站内信'
                },
                // {
                //     value: 2,
                //     label: '短信'
                // },
                // {
                //     value: 1,
                //     label: '邮箱'
                // },
            ],
            remindoptions:0,
            remindoption: [
                {
                    value: 0,
                    label: '不提醒'
                },
                {
                    value: 1,
                    label: '截止前15分钟'
                },
                {
                    value: 2,
                    label: '截止前1小时'
                },
                {
                    value: 3,
                    label: '截止前3小时'
                },
                {
                    value: 4,
                    label: '截止前1天'
                }
            ],
            formLabelWidth: '70px',
            pickerOptions2: {},
            options: [
               {
                    value: '0',
                    label: '普通'
                },
                {
                    value: '1',
                    label: '重要'
                },
                {
                    value: '2',
                    label: '非常重要'
                },
            ],
            value: '普通',
            label:0,
        }
    },
    watch:{
        flagadd(val){
            this.changeWindowadd = val;
        }
    },
    methods:{
        htmls2(val){
            this.content=val
        },
         rwtx(){
             console.log(this.remindType)
             if(this.remindoptions == 0){
                 this.txfs=false
                 this.checkListoptions=[]
                 this.value-''
             }else{
                 this.txfs=true

             }
         },
        executors(item){
            var arrs= this.executor
            for (let j = 0; j < arrs.length; j++) {
                if(item.userId== arrs[j].userId){
                    arrs.splice(j,1)
                }
            }
          this.executor=arrs
        },
        ccpeoples(item){
            console.log(item.userId)
            var arrs= this.ccpeople
            for (let j = 0; j < arrs.length; j++) {
                if(item.userId== arrs[j].userId){
                    arrs.splice(j,1)
                }
            }
          this.ccpeople=arrs
        },
        shelterpars(){
            this.zxr=1
            this.findState={state:2}
            this.checkState={state:2}
            this.flags=true
        },
          statesbox(val){
            this.flag = false;
            var arr=val
            var arrs=[]
            var arrid=[]
            for (let i = 0; i < arr.length; i++) {
                var dxs={
                    name:arr[i].name
                }
                var dxsid={
                    userId:arr[i].id
                }
                arrs.push(dxs)
                arrid.push(dxsid)
            }
            this.ccpeople=arrs
            this.taskCopyer=arrid
        },
         statesboxlist(val){
            this.flags = false;
            var arr=val
            var arrs=[]
            var arrid=[]
            for (let i = 0; i < arr.length; i++) {
                var dxs={
                    name:arr[i].usName
                }
                var dxsid={
                    userId:arr[i].userId
                }
                arrs.push(dxs)
                arrid.push(dxsid)
            }
            this.executor=arrs
            this.taskExecutors=arrid
        },
         shelterGlobal(val){
            this.zxr=2
            this.findState={state:0}
            this.checkState={state:2}
            this.flags=true
        },
        findAllUser(val){
          if(!val || !val.length){
            this.flags=false
            return
          }
            console.log(val)
            if(this.zxr == 1){
            //  this.executor=val
            var arr=val  //传入的
            // this.executor=this.executorarr.concat(val)  //现在的
            var arrs=this.executor
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arrs.length; j++) {
                    if(arr[i].userId == arrs[j].userId){
                        arr.splice(i,1)
                    }
                }
            }
            this.executor=this.executor.concat(arr)
            }else{
            //  this.ccpeople=val
                var arr=val
                var arrs=this.ccpeople
                for (let i = 0; i < arr.length; i++) {
                    for (let j = 0; j < arrs.length; j++) {
                        if(arr[i].userId == arrs[j].userId){
                            arr.splice(i,1)
                        }
                    }
                }
                console.log(arr)
                this.ccpeople=this.ccpeople.concat(arr)
            }
             this.flags=false
        },
        flagshow(){
            this.flag = true;
            this.$refs.flagData.project();
        },
         Priority(){
            this.label=this.value
            console.log(this.label)
        },
        onResflag(val){
            console.log("子组件传过来的是",val)
            this.flag=val;
        },
        change(value) {
            console.log(value);
            this.changeWindowadd = false
            this.$emit('changeWindowadd',false)
                 this.name=''
                 this.value6=[]
                 this.executor=[]
                 this.ccpeople=[]
                //  this.value6-''
                 this.remindoptions=0
                 this.checkListoptions=[]
                 this.value=''
                 this.content=''
                 this.txfs=false
                //  console.log(this.changes)
                 this.changes={state:1}
                //  console.log(this.changes)
        },
        gettime(ts){
        var date = (new Date(ts)).getTime();
        var time = new Date(date)
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours()
        var f = time.getMinutes()
        var s =  time.getSeconds()
        var ms
        if(m < 10){
            ms="0"+m
        }else{
            ms=m
        }
        var ds
        if(d < 10){
            ds="0"+d
        }else{
            ds=d
        }
        var hs
        if(h < 10){
            hs="0"+h
        }else{
            hs=h
        }
        var fs
        if(f < 10){
            fs="0"+s
        }else{
            fs=f
        }
        var ss
        if(s < 10){
            ss="0"+s
        }else{
            ss=s
        }

        var times
        return times=y+'-'+ms+'-'+ds+' '+hs+':'+fs+':'+ss
        },
        taskAdddiloag(){
             console.log(this.checkListoptions)
            // return
              if(this.name == ''){
                    this.$message({
                    message: '请填写完整',
                    type: 'warning'
                    });
                    return
              }
              var zrx=[]
              var axrarr=this.executor
              for (let i = 0; i < axrarr.length; i++) {
                  zrx.push({userId:axrarr[i].userId})
              }
              var crs=[]
              var crsarr=this.ccpeople
              for (let i = 0; i < crsarr.length; i++) {
                 crs.push({userId:crsarr[i].userId})
              }
              console.log(zrx)
              console.log(crs)
              var checkListoptions
              if(this.checkListoptions != []){
                  checkListoptions=this.checkListoptions.join(',')
              }else{
                  checkListoptions=[]
              }
              var startTime,endTime
              if(this.value6 != ''){
                  startTime=this.gettime(this.value6[0])
                  endTime=this.gettime(this.value6[1])
              }else{
                  startTime=''
                  endTime=''
              }
              var checkListoptionss
              console.log(checkListoptions)
              if(this.remindoptions != 0){
                  if(this.checkListoptions == ''){
                      checkListoptionss=''
                      this.remindoptions=0
                  }
              }
             checkListoptionss=checkListoptions
              console.log(checkListoptionss,this.remindoptions)
             if(zrx != '' ||  crs != ''){
                    if(endTime == '' || startTime == ''){
                        this.$message({
                            type: 'info',
                            message:'请选择时间'
                        });
                      return;
                    }
                }
              var data={
                token:this.token,
                userId:this.userId,
                data:{
                     name:this.name,
                    "projectId":this.mrid,
                    "startTime": startTime,
                    "endTime":endTime,
                    "implementStageId":Number(this.addnew.implementStageId),
                    "parentId":0,
                    "taskCopyer":crs,
                    "taskExecutors":zrx,
                    "remindType":this.remindoptions,
                    "remindVay":checkListoptionss,
                    "content": this.content,
                    "priority":this.label,
                }
            }
            var _this=this
            this.$post('/info/task/saveTask', data).then((response)=> {
                if(response.code == 0){
                    _this.$message({
                        message: response.msg,
                        type: 'success'
                    });
                _this.changeWindowadd = false
                _this.name=''
                _this.value6=[]
                _this.executor=[]
                _this.ccpeople=[]
                // _this.value6-''
                _this.remindoptions=0
                _this.checkListoptions=[]
                _this.value=''
                _this.content=''
                _this.label=''
                _this.$emit('changeWindowadd',true)
                var state={state:1}
                _this.$store.commit("isref",state);
                // console.log(_this.$store.state.projectstat.isref)
                }else{
                    _this.$message({
                    message: response.msg,
                    type: 'warning'
                    });
                }
            }).catch(function(error) {
                console.log(error);
            });
        }

    }
}
</script>
<style scoped lang="scss">
@import "../../../common/css/sheltersright.css";
.el-form-item__content .shelterPers,
.el-form-item__content .shekterAdd{
    position: relative !important;
    top: 7px !important;
    margin-right: 10px !important;
    width: 24px !important;
    height: 24px !important;
    cursor:pointer !important;
}
.el-form-item__label{
    text-align: left !important;
}
.fl{
    .el-textarea {
    display: inline-block;
    width: 111%;
    vertical-align: bottom;
    font-size: 14px;
}
.el-tag {
    padding: 0 10px;
    height: 32px;
    line-height: 30px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: nowrap;
    /* padding-left: 8px; */
    margin-left: 8px;
}
}
.baseMessage{
    display: block !important;
    margin-bottom: 10px !important;
    font-weight: bold !important;
    text-align: left !important;
}


.encapsulationSelect{
    width: 90px !important;
    border: 1px solid red !important;
    border-radius: 5px !important;
}
 input::-webkit-input-placeholder{
            color:red !important;
        }
</style>


