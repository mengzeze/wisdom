<template>
  <div class="edit_container" :title="isTaskUser ? '' : '无对应权限，请联系对应项目组负责人处理'">
    <!-- <el-scrollbar style="height:100%">
      <div id="editor"></div>
    </el-scrollbar> -->
    <div id="editor" class="toolbar"></div>
    <div id="editor100" class="text"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: "",
      editorOption: {},
      editor: ""
    };
  },
  props: ["msg", "changes", "statelist",'forbiddenis',
    "isTaskUser"//是否有编辑权限
  ],
  watch: {
    forbiddenis(val){
     this.editor.$textElem.attr('contenteditable', this.forbiddenis == 4? false :true)
    },
    msg: function(newV, oldV) {
      this.editor.txt.html(newV.replace(/”/g, '"'));
    },
    changes: function(newV, oldV) {
      console.log(newV);
      if (newV.state == 1) {
        this.editor.txt.clear();
        // this.msg = "";
        this.$emit("htmlmsg", false);
      }
    },
    isTaskUser(newVal,oldVal){
      this.initContent()
    }
  },
  mounted() {
    this.initContent()
  },
  methods: {
    htmls(html) {
      this.$emit("htmls", html);
    },
    initContent(){
      var E = window.wangEditor;
      this.editor = new E("#editor","#editor100");
      this.editor.customConfig.menus = [
        "head", // 标题
        "bold", // 粗体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "undo", // 撤销
        "justify", // 对齐方式
        "image", // 插入图片
        "table" // 表格
      ];
      this.editor.customConfig.colors = [
        "#000000",
        "#eeece0",
        "#1c487f",
        "#4d80bf",
        "#c24f4a",
        "#8baa4a",
        "#7b5ba1",
        "#46acc8",
        "#f9963b",
        "#ffffff"
      ];
      this.editor.customConfig.pasteIgnoreImg = true;
      this.editor.customConfig.debug = true;
      this.editor.customConfig.debug =
        location.href.indexOf("wangeditor_debug_mode=1") > 0;
      this.editor.customConfig.uploadImgServer =
        allUrl + "/rfs/uploadWangEditorImg";
      this.editor.customConfig.uploadFileName = "file";
      this.editor.customConfig.uploadImgParamsWithUrl = true;
      this.editor.customConfig.uploadImgMaxLength = 1;
      let _this = this;
      _this.editor.customConfig.uploadImgHooks = {
        before: function(xhr, editor, files) {},
        success: function(xhr, editor, result) {
          console.log("上传成功");
        },
        fail: function(xhr, editor, result) {
          console.log("上传失败,原因是" + result);
          console.log(result);
          console.log(xhr);
          console.log(editor);
        },
        error: function(xhr, editor) {
          console.log("上传出错");
        },
        timeout: function(xhr, editor) {
          console.log("上传超时");
        }, 
        customInsert: function (insertImg, result, editor) {
          let srcs = _this.$store.state.isPC ? allUrl : window.location.origin;
          if(result.data[0].trim().startsWith("/")){
            insertImg(srcs+result.data[0])
          }else{
            insertImg(result.data[0])
          }
      }
      };
      _this.editor.customConfig.onchange = function(html) {
        _this.htmls(html);
      };
      
      _this.editor.create();
      if(this.isTaskUser){
        setTimeout(()=>{
          let ele = document.querySelectorAll('#editor100 div')
          ele.forEach(obj=>{
            obj.setAttribute("contenteditable", true)
          })
        },1000)
      } else {
        setTimeout(()=>{
          let ele = document.querySelectorAll('#editor100 div')
          ele.forEach(obj=>{
            obj.setAttribute("contenteditable", false)
          })
        },1000)
      }
      _this.editor.txt.html(_this.msg.replace(/”/g, '"'));
      if (this.statelist == 1) {
        _this.editor.$textElem.attr("contenteditable", false);
      }
    }
  }
};
</script>
<style lang="" >
.w-e-toolbar {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 0 5px;
  /* flex-wrap: wrap; */
  height: 24px;
  line-height: 5px;
}
</style>
<style scoped>
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.edit_container {
  height: 440px;
  width: 100%;
  overflow: hidden;
}
</style>


