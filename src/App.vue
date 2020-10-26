<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
    data(){
      return {}
    },
    created() {
      this.handleRefresh()
      var isPC = Boolean(window.ChromeMain)
      this.$store.commit('setPcFlag', isPC)
      window.PC = {}
      // pc端消息提示
      window.PC.$message = this.$message
      // PC 端文件定位
      window.PC.fixPosition = this.fixPosition
    },
    mounted(){
    },
    methods:{
      /**
       * 刷新是重新加载权限
       */
      handleRefresh () {
        let that = this
        window.onunload = function () {
          let token = sessionStorage.getItem('login')
          if(!token) return
          that.$utils.getProPermissionFn(that.$store.state.projectMsg.pro_id)
          that.$utils.getSysPermissionFn()
        }
      },

      /**
       * PC端文件定位
       * @param param 定位参数：
       * source: 项目文档 0, 底稿 1 , 客户文档 2
       * fileId: 文件id
       * projectId:  项目id
       */
      fixPosition(param){
        let data = JSON.parse(param)
        switch (data.source) {
          case '0': // 项目文档定位
            this.docLocation(data);
            break;
          case '1': // 底稿定位
            this.menuLocation(data);
            break;
        }

      },
      /**
       * 底稿管理定位 PC
       * @param data 定位文档数据 
       */
      menuLocation(data) {
        this.$post("/doc/paper/location",{
          data: {
            id: data.fileId,
            type: "paper",
            docType: data.docType,
            projectId: data.projectId
          }
        }).then(res => {
          if (this.code.codeNum.SUCCESS != res.code) {
            this.$message.error(res.msg);
            return
          }
          res.data.id = data.fileId;
          res.data.projectId = data.projectId;

           this.$router.push({
                path: '/manuscriptmanage',
                query:{
                  docId: data.fileId,
                  projectId: data.projectId,
                  isPosition: true,
                  data: JSON.stringify(res.data),
                  isPcPosition: true,
                  onlyId: new Date().getTime()
                }
              });
        }).catch(err => {
          console.log(err)
        })
      },
      /**
       * 项目文档定位
       * @param data 定位文档数据
       */
      docLocation(data) {
        let token = this.$store.state.loginObject.userToken;
        let userId = this.$store.state.loginObject.userId;
        var p = {
          "token": token,
          "userId": userId,
          "data": {
            "id": data.fileId,
            "projectId": data.projectId,
            "chatOrMsg": 0,
            "docName": data.fileName
          }
        }
        this.$post("/doc/project/position", p)
          .then( (response)=> {
            if (this.code.codeNum.SUCCESS == response.code) {
              this.$router.push({
                path: "/projectDoc",
                query:{
                  docId: data.fileId,
                  projectId: data.projectId,
                  isPosition: true,
                  data: JSON.stringify(response.data),
                  isPcPosition: true,
                  onlyId: new Date().getTime()
                }
              });
            } else if(response.code == -1002){
              this.$message.error('文件已被删除')
            } else {
              this.$message.error(response.msg)
            }
          })
          .catch(function (error) {
            console.log(error)
          });
      }
    }
}
</script>

<style>
*{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    margin: 0;
    padding: 0;
    list-style: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width:100%;
  height:100%;
}
#app .el-dialog--center{
  text-align: left !important;
}
#app .el-dialog__header{
  text-align: center;
}

  .el-main{
     padding:0 10px;
  }
.el-popover{
    min-width: 100px !important;
}
    .menu_btn{
          display: none;
    }
 .maindeskindex .container  .box-card .fc-event, .fc-event-dot{
      background-color:#E6F7FF!important;
      color: #002666;
      border:#E6F7FF!important;
  }
  #project-catalog .el-scrollbar__wrap {
    overflow-x: auto !important;
  }
#app .el-scrollbar__wrap{
    overflow-x: hidden;
}
.el-tooltip__popper{
    max-width: 500px;
} 
</style>
