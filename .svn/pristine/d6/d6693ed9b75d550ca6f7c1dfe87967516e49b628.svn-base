<template>
  <div class="edit_containerssss">
    <div id="div311" class="toolbar" style="display:none"></div>
    <div id="div422" class="text"></div>
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
  props: ["html2", "changes"],
  watch: {
    html2: function(newV, oldV) {
      if(newV) {
        this.editor.txt.html(newV.replace(/”/g, '"'));
      }
    },
    changes: function(newV, oldV) {
      if (newV.state == 1) {
        this.editor.txt.clear();
      }
    }
  },
  mounted() {
    var E = window.wangEditor;
    this.editor = new E("#div311", "#div422");
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
    ];
    this.editor.customConfig.debug = true;
    this.editor.customConfig.debug =
      location.href.indexOf("wangeditor_debug_mode=1") > 0;
    this.editor.customConfig.uploadImgServer =
      allUrl + "/rfs/uploadWangEditorImg";
    this.editor.customConfig.uploadFileName = "file";
    this.editor.customConfig.uploadImgParamsWithUrl = true;
    this.editor.customConfig.uploadImgMaxLength = 1;
    this.editor.customConfig.uploadImgHooks = {
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
      customInsert: function(insertImg, result, editor) {
        var srcs = window.location.host;
        if (result.data[0].trim().startsWith("/")) {
          insertImg(srcs + result.data[0]);
        } else {
          insertImg(result.data[0]);
        }
      }
    };
    var _this = this;
    _this.editor.customConfig.onchange = function(html) {
      _this.htmls(html);
    };
    _this.editor.create();
    // if (_this.html != "") {
    //   _this.editor.txt.html(_this.html2.replace(/”/g, '"'));
    // }
    _this.editor.$textElem.attr('contenteditable', false)
  },
  methods: {
    htmls(html) {
      this.$emit("htmls2", html);
    }
  }
};
</script>
<style  lang="scss" scoped>
.edit_containerssss{
    .w-e-toolbar {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        padding: 0 5px;
        /* flex-wrap: wrap; */
        height: 24px;
        line-height: 5px;
    }
    .toolbar {
        border: 1px solid #ccc;
    }
    .text {
        border: 1px solid #E4E7ED;
        border-radius: 4px;
        height: 115px;
        // max-height: 115px;
        // margin-top: 3px;
        overflow-y: auto; 
        text-align: left;
    }
    .w-e-text {
      padding: 0 10px;
      overflow-y: hidden;
  }
}

</style>
<style scoped>
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.edit_container {
  height: 140px;
  width: 100%;
}
</style>


