<template>
    <div id="examine">
        <div
            id="examine-button"
            class="background-primary"
            @mousedown="setAllFloatingMoveFn($event)"
            @click="handleClick"
            circle>
            <p>
                智能<br/>核查
            </p>
        </div>
        <!-- <div id="shade-tier" v-show="isDown"></div> -->
    </div>
</template>
<script>
export default {
    name:'examine-button',
    data(){
        // 文件id
        // 文件名称
        // 项目名称
        // 用户id
        // 用户token
        // 
        return {}
    },
    methods:{
        setAllFloatingMoveFn(e) {
          let bdiv = document.getElementById('main')
          let odiv = document.getElementById('examine-button');   //获取当前元素
          let firstTime='',lastTime='';
          document.getElementById('examine-button').setAttribute('data-flag',false)
          firstTime = new Date().getTime();
          let disX = e.clientX - odiv.offsetLeft;
          let disY = e.clientY - odiv.offsetTop;
          document.onmousemove = (e)=>{
            //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            let left = e.clientX - disX;
            let top = e.clientY - disY;

            var width = bdiv.clientWidth - odiv.offsetWidth
            var height = bdiv.clientHeight - odiv.offsetHeight

            left = Math.min(Math.max(0, left), width)
            top = Math.min(Math.max(0, top), height)

            // //绑定元素位置到positionX和positionY上面
            // this.positionX = left;
            // this.positionY = top;

            //移动当前元素
            odiv.style.left = left + 'px';
            odiv.style.top = top + 'px';
          };
          document.onmouseup = (e) => {
            document.onmousemove = null;
            document.onmouseup = null;
            lastTime = new Date().getTime();
            if( (lastTime - firstTime) < 200){
              document.getElementById('examine-button').setAttribute('data-flag',true)
            }
          };
        },
        async handleClick(){
            this.$Mit.status.code = 200
            let num = 0 
            if(this.$Intel.list.length > 11){
                num = 1
                this.$message({
                    type: "info",
                    message: "当前支持核查文件的数量的最大值为11个！"
                });
                this.$Intel.message()
            }

            await this.$Intel.list.forEach((res,index)=>{
                if(!res.size || Number(res.size) > 200*1024*1024){ // 文件大小超过200MB则阻止跳转
                    num = 1
                    this.$message({
                        type: "info",
                        message: "单文件大小要小于等于200M"
                    });
                    this.$Intel.list.splice(index,1,undefined)
                }else if(res.type){
                    let arr = ['doc','docx','xls','xlsx','pdf']
                    if(arr.indexOf(res.type.toLowerCase()) === -1){ // 文件格式不正确，则阻止跳转
                        num = 1
                        this.$message({
                            type: "info",
                            message: "当前只支持对DOC、DOCX、XLS、XLSX、PDF（必须是可编辑版转换的）的文件进行核查！"
                        });
                        this.$Intel.list.splice(index,1,undefined)
                    }
                }else{
                    this.$message({
                        type: "info",
                        message: "文件参数格式缺失！"
                    })
                }
            })
            let token = this.$store.state.loginObject.userToken;
            let userId = this.$store.state.loginObject.userId;
            let userName = this.$store.state.loginObject.userName;
            let projectName = this.$store.state.projectMsg.projectMsg.name
            let area = this.$Intel.list.filter(res=>res !== undefined)
            let obj = area.map(res=>{
                return {[res.docId]:res.name}
            })
            this.$Intel.message()
            let url = `${intelUrl}?userId=${userId}&userToken=${token}&userName=${userName}&procName=${projectName}&files=${encodeURIComponent(JSON.stringify(obj))}`
            let isPC = this.$store.state.isPC
            if(num === 1){
                await setTimeout(()=>{
                    isPC ? window.ChromeMain.CS_Main_OpenInspect(url) : window.open(url)
                },3000)
            }else{
                isPC ? window.ChromeMain.CS_Main_OpenInspect(url) : window.open(url)
            }
        }
    }
}
</script>
<style lang="scss" scoped>

#examine-button{
    display: flex;
    width:50px;
	height:50px;
    color:#fff;
    font-size:16px;
    align-items: center;
    justify-content: center; 
    text-align:center;
    padding:7px;
	border-radius:50%;
	position:absolute;
    top:80px;
    z-index:2000;
    right:400px;
    cursor: pointer;
    &:hover{
        animation:run 1s infinite;
    }
}
#shade-tier{
    position: absolute;
    top:0px;
    left:0px;
    content:'';
    width: 100vw;
    height: 100vh;
    background:rgba(0,0,0,0);
    z-index:1999;
}
</style>