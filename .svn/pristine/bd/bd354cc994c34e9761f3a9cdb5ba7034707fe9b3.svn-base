  <template>
  <div class="rightMenuBox" v-if="rightMenuShow">
    <div class="right_menu">
      <ul class="right_menu_ul">
        <li v-for="(item,idx) in menuList"
            :key="idx"
            @click="operationFn(item.flag)"
            class="right_menu_ul_li">
          <div class="li_left">
            <img :src="item.url">
          </div>
          <div class="li_right">{{item.lable}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    isShow: {
      type: Boolean,
      default: false,
      required: true,
    },
    fileData: {
      default:{},
      required: true,
    },
    needFunction: {
      type: Array
    }
  },
  data(){
    return {
      rightMenuShow: this.isShow,
      defaultmenuList: [
        {
          id: 1,
          lable: "预览", // 右键菜单名称
          show: true, //  是否显示该项
          flag: "preview", //  判断标识
          url: require("../../common/rightmenuicon/preview.png")//图标地址
        },
        {
          id: 2,
          lable: "下载",
          show: true,
          flag: "download",
          url: require("../../common/rightmenuicon/download.png")
        },
        {
          id: 3,
          lable: "上传新版本",
          show: true,
          flag: "upload",
          url: require("../../common/rightmenuicon/upload.png")
        },
        {
          id: 4,
          lable: "删除",
          show: true,
          flag: "delete",
          url: require("../../common/rightmenuicon/delete.png")
        },
        {
          id: 5,
          lable: "重命名",
          show: true,
          flag: "rename",
          url: require("../../common/rightmenuicon/rename.png")
        },
        {
          id: 6,
          lable: "复制",
          show: true,
          flag: "copy",
          url: require("../../common/rightmenuicon/copy.png")
        },
        {
          id: 7,
          lable: "剪切",
          show: true,
          flag: "cut",
          url: require("../../common/rightmenuicon/cut.png")
        },
        {
          id: 8,
          lable: "粘贴",
          show: true,
          flag: "paste",
          url: require("../../common/rightmenuicon/paste.png")
        },
        {
          id: 9,
          lable: "锁定",
          show: true,
          flag: "lock",
          url: require("../../common/rightmenuicon/lock.png")
        },
        {
          id: 10,
          lable: "解锁",
          show: true,
          flag: "unlock",
          url: require("../../common/rightmenuicon/unlock.png")
        },
        {
          id: 11,
          lable: "文件属性",
          show: true,
          flag: "attributes",
          url: require("../../common/rightmenuicon/attributes.png")
        }
      ],
      menuList: [],
      operList:[]
    }
  },
  watch:{
    isShow(val, oldVal) {
      this.rightMenuShow = val;
    },
    fileData: {
      handler(val, oldVal) {
        let selectOperaArray = [];
        this.menuList = [];

        if(this.needFunction.length != 0) {
          selectOperaArray = selectOperaArray.concat(this.needFunction)
        }
        if(val.docType == 1) { //目录
          selectOperaArray.push(4,5)
        } else if(val.docType == 0){ //文件
          selectOperaArray.push(1,2,3,4,5,11)
          if(val.lockState) {
            selectOperaArray.push(10)
          } else {
            selectOperaArray.push(9)
          }
        }

        if(val.hasOwnProperty("empty")) {
          this.defaultmenuList.map((item,idx) => {
            if(item.id === 4 || item.id === 5) {
              this.menuList.push(item)
            }
          })
        }
        selectOperaArray = Array.from(new Set(selectOperaArray))
        this.defaultmenuList.map((item,idx) => {
          selectOperaArray.map((itemNum,idx) => {
            if(item.id == itemNum) {
              this.menuList.push(item)
            }
          })
        })
        // this.initImgUrl();

      },
      immediate: true,
      deep: true
    },
  },
  created() {
    // this.initImgUrl();
  },
  methods:{
    operationFn(flag) {
      this.$emit("rightMenuClick", flag);
    },
    initImgUrl(){
      for (var i = 0; i < this.menuList.length; i++) {
        this.menuList[i].url = require("../../common/rightmenuicon/" +
          this.menuList[i].flag +
          ".png");
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .rightMenuBox{
    .right_menu{
      width: 150px;
      height: auto;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      background-color: #fff;
      .right_menu_ul{
        width: 100%;
        display: flex;
        flex-direction: column;
        .right_menu_ul_li{
          width: 100%;
          display: flex;
          align-items: center;
          cursor: pointer;
          .li_left{
            width: 30px;
            height: 30px;
            background: #f2f2f2;
            img {
              display: block;
              margin: 8px auto;
              width: 15px;
              height: 15px;
            }
          }
          .li_right{
            text-indent: 15px;
            text-align: left;
          }
        }
        .right_menu_ul_li:hover{
          background-color: #eff6fe;
          box-shadow: 2px 2px 2px #eef5fd;
        }
      }
    }
  }
</style>
