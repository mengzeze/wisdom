<template>
    <div id="project-chat-record"> 
        <el-dialog :title="projectName + ' - ' + '聊天记录'" center width="800px" :close-on-click-modal="false" :visible="chatRecordShow" @close="clickEvent">
               <el-input
                class="chat-nav"
                placeholder="请输入关键字（以空格区分）"
                @keyup.enter.native="handleSearch()"
                v-model="chatContext"
                clearable>
                <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
              </el-input>
              <!-- <el-input v-model="chatContext" placeholder="请输入关键字（以空格区分）"  clearable>
                <el-button slot="append" icon="el-icon-search" @click="query(1)"></el-button>
            </el-input> -->
           <section>
               <el-scrollbar ref="scrollbar" style="height:100%">
                   <div class='chat-content'>
                       <article  v-if="tableData.length == 0">
                           <i class="chat-no iconfont liaotianjilu2"></i>
                           暂无相关聊天记录
                        </article>
                       <div v-for="(item, index) in tableData" :key="index" v-else @click="goProjectlocal(item)" title="点击可定位到对应聊天记录">
                           <div>
                                <img :src="item.userImg == null ? require('@/assets/user_img/projectLogUser.png') : getImgUrl(item)"/>
                           </div>
                            <div>
                                <p>
                                    <span v-html="item.userName"></span>
                                    <span style="color: #909399;">{{item.sendTime}}</span>
                                </p>
                                <!-- 消息 -->
                                <p v-html="item.context"></p> 
                                <p class='picture' v-if="item.imageUrl">
                                    <img :src='item.imageUrl'/>
                                </p>
                                <div class='files' v-if="!item.imageUrl && item.fileId">
                                    <img v-if="item.fileData && item.fileData.fileIcon" :src="item.fileData.fileIcon"/>
                                    <div>
                                        <p v-html="item.fileName"></p>
                                        <p></p>
                                    </div>
                                </div>
                                
                            </div>
                       </div>
                   </div>
               </el-scrollbar>
           </section>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'projectChatRecord',
        props: ['chatRecordShow', 'chatRecordObj'],
        components: {},
        data () {
            return {
                token: '',
                userId: '',
                projectId:'',
                chatContext: '',
                projectName: '',
                tableData: [],
                pages: '',
                chatPageNo: 1,
                addShow: false,
                openScoll: false
            }
        },
        created () {
            this.token = this.$store.state.loginObject.userToken;
            this.userId = this.$store.state.loginObject.userId;
            this.success_code = this.code.codeNum.SUCCESS;
        },
        mounted(){
            this.query()
        },
        methods: {
            // 取消
            clickEvent() { 
                this.$emit('update:chatRecordShow',false);
                this.chatContext = ''
                this.$refs['scrollbar'].$refs['wrap'].scrollTop = 0 // 滚动高度
            },
            handle(val) {
                console.log(val)
            },
            // 查询时滚动条到最顶部
            handleSearch(){
                this.$refs['scrollbar'].$refs['wrap'].scrollTop = 0
                this.chatPageNo = 1
                this.query(1)
            },
            // 查询
            query(val) {
                if (val == 1) {
                    this.addShow = false
                }
                let obj = {
                    token: this.token,
                    userId: this.userId,
                    pageNo: this.chatPageNo,
                    data: {
                        projectId: this.projectId,
                        chatContext: this.chatContext
                    }
                }
               this.$post('/info/projectChat/queryChat', obj).then((res) => {
                    if (!res) {
                        this.$message.error(res.msg)
                        return
                    }
                    if (res.code !== 0) {
                        this.$message.error(res.msg)
                        this.tableData = []
                        return
                    }
                    this.pages = res.data.pages
                    res.data.list.forEach(item => {
                        if(item.type == '2' || item.type == '6') { //文件讨论的历史聊天记录
                            //设置讨论的文件展示
                            item.fileData = {};
                            item.fileData.type = item.fileType;
                            item.fileData.docName = item.fileName;
                            this.iconFilter(item.fileData)
                        } else {
                        //上传文件和图片的记录
                            if(item.fileType) {
                                if(item.fileType.indexOf('application') != -1) { //fileType字段里application/后缀拼起来的 文件的类型
                                    var matches = item.fileName.lastIndexOf('.')
                                    var suffix = item.fileName.substring(matches + 1, item.fileName.length)
                                    item.fileData = {};
                                    item.fileData.type = suffix;
                                    item.fileData.docName = item.fileName;
                                    this.iconFilter(item.fileData)
                                } else if(item.fileType.indexOf('image') != -1) { //fileType字段里image/后缀拼起来的 图片的类型
                                    item.imageUrl = this.$utils.getDownloadUrl(item.fileId);
                                } else if(item.fileType == 'jpg' ||
                                    item.fileType == 'jpeg'||
                                    item.fileType == 'gif' ||
                                    item.fileType == 'bmp' ||
                                    item.fileType == 'png' ||
                                    item.fileType == 'psd'){ //fileType字段里只用后缀的 图片的类型
                                    item.imageUrl = this.$utils.getDownloadUrl(item.fileId);
                                } else { //fileType字段里只用后缀的 文件的类型
                                    item.fileData = {};
                                    item.fileData.type = item.fileType;
                                    item.fileData.docName = item.fileName;
                                    this.iconFilter(item.fileData)
                                }
                            }
                        }
                    })
                    for(let i = 0; i < res.data.list.length; i++) {
                            var start = this.getDayName(res.data.list[i].sendTime);
                            console.log(start, 36)
                            if(start == '今天') {
                                var start = res.data.list[i].sendTime.indexOf(' ');
                                var dateString = res.data.list[i].sendTime.substr(0, start + 1)
                                res.data.list[i].sendTime = res.data.list[i].sendTime.replace(dateString, ' ')
                            } else if(start == '昨天') {
                                var start = res.data.list[i].sendTime.indexOf(' ');
                                var dateString = res.data.list[i].sendTime.substr(0, start)
                                res.data.list[i].sendTime = res.data.list[i].sendTime.replace(dateString, '昨天')
                            }
                    }
                    if (this.addShow) {
                        this.tableData =  this.tableData.concat(res.data.list)
                    } else {
                        this.tableData = res.data.list
                    }

                }).catch((error) => {
                    this.$message.error(error)
                });
            },
            // 计算时间的咋展示格式
            getDayName(d){
                var td=new Date();
                td=new Date(td.getFullYear(),td.getMonth(),td.getDate());
                var od=new Date(d);
                od=new Date(od.getFullYear(),od.getMonth(),od.getDate());
                var xc=(od-td)/1000/60/60/24;
                // console.log(xc, 'xc,--s-1 <= xc && xc < 0', -1 <= xc && xc < 0)
                if(-1 <= xc && xc < 0){
                    return "昨天";
                }else if(xc==0){
                    return "今天";
                }
            },
            // 页面的滚动效果
            listenScrollbar () {
                if(this.openScoll) {
                    if (this.chatPageNo >= this.pages) return
                    let let1 = document.body.scrollHeight // 浏览器可见高度
                    let let2 = this.$refs['scrollbar'].$refs['wrap'].scrollTop // 滚动高度
                    let let3 = this.$refs['scrollbar'].$refs['wrap'].scrollHeight // 总高度
                    if (parseInt(let3 - let2) <= 600) {
                        this.chatPageNo = this.chatPageNo + 1
                        this.addShow = true
                        this.query()
                    }
                }
            },
            // 过滤文件格式
            iconFilter(itemValue) { //过滤重命名的icon
                if (!itemValue.type) {
                    itemValue.fileIcon = require("@/pages/common/fileIcon/FolderType1.png");
                } else{
                    let fileName = 'a.'+itemValue.type // 模拟文件名，保证数据格式一致性
                    itemValue.fileIcon = this.$utils.iconFilter(fileName)
                }
            },
            // 查询页码
            queryListPage (item) {
                let obj = {
                    token: this.token,
                    userId: this.userId,
                    data: {
                        projectId: this.projectId,
                        id: item.id
                    }
                }
               this.$post('/info/projectChat/chatLocation', obj).then((response) => {
                   if (!response) {
                        this.$message.error(response.msg)
                        return
                    }
                    if (response.code !== 0) {
                        this.$message.error(response.msg)
                        return
                    }
                    item.pageNo = response.data + 1
                    this.$emit('chatRecordLocal',  item)
                    this.$emit('update:chatRecordShow',false);
                    this.chatPageNo = 1
                    window.removeEventListener('scroll', this.listenScrollbar, true);
               })
            },

            // 定位到相对位置
            goProjectlocal (item) {
                this.queryListPage (item)
            },

             // 获取用户照片路径
            getImgUrl(item){
                return this.$utils.getDownloadUrl(item.userImg)
            }
        },
        destroyed(){
            //  删除监听事件
            this.chatPageNo = 1
            window.removeEventListener('scroll',this.listenScrollbar,true);
		},
        watch: {
            // 弹框组件打开的数据初始化处理
            chatRecordShow (val) {
                if (val) {
                    this.projectId = this.chatRecordObj.projectId;
                    this.projectName = this.chatRecordObj.projectName;
                    this.chatPageNo = 1
                    this.addShow = false
                    this.openScoll = true
                    this.query()
                    window.addEventListener('scroll',this.listenScrollbar,true);
                }
            },
            chatContext (val) {
                if (!val) {
                    this.chatPageNo = 1
                    this.query()
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .chat-nav {
        border: 1px solid rgba(215,218,226,1);
        border-radius:4px;
        margin-bottom: 20px;
    }
    section {
        width: 100%;
        height: 600px;
        border: 1px solid rgba(215,218,226,1);
        background: rgba(240,242,245,1);
    }
   .chat-content{
       width: 100%;
       >div {
        //    width: 100%;
           display: flex;
           justify-content: flex-start;
           margin: 15px;
           padding: 15px;
           background: rgba(255,255,255,1);
           >div:nth-child(1) {
               width: 38px;
               height: 38px;
               border-radius: 50%;
               display: flex;
               justify-content: center;
               img{
                   width: 100%;
                   border-radius: 50%;
               }
           }
           >div:nth-child(2) {
               width: 95%;
               margin-left: 20px;
               >p:nth-child(1){
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 8px;
               }
               .picture{
                   img{
                        width: 92px;
                        height: 92px;
                   }
               }
               .files{
                   width:380px;
                    height:66px;
                    background:rgba(255,255,255,1);
                    border:1px solid rgba(220,223,230,1);
                    border-radius:4px;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    margin-top: 5px;
                   img{
                        width: 28px;
                        height: 28px;
                        margin: 0 15px;
                   }
                   >div{
                       width: 300px;
                       p{
                       overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                       }
                   }
               }
               
           }
       }
   }
   /* 聊天记录中的移入颜色 */
#project-chat-record .chat-content>div:hover {
  background-color: rgba(244,246,249,1);
  box-shadow:0px 0px 5px 0px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
article{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-top: 200px;
    color: rgba(144,147,153,1);
        opacity: 0.4;

    .chat-no{
        font-size: 120px;
        margin-bottom: 10px;
        color: rgba(144,147,153,1);
        opacity: 0.3;

    }
}
</style>