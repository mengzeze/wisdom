<template>
  <div class="laber_true">
    <el-dialog @close="laberTruescolse(1)" :close-on-click-modal="false" :visible.sync="laberTruesinfo" width="600px">
      <div
        :title="laberTruesitems"
        class="dialog_title_laber"
      >编辑标签-{{laberTruesitems}}</div>
      <div class="lineLaber"></div>
      <div class="lanbercss">
        <h3>标签</h3>
        <p class="lanbertext">最多还能添加{{n}}个，按enter键进行分割</p>
        <div class="lanberbox" @click="lanberboxfocus">
          <el-tag
            style="margin-right: 9px;margin-top: 9px;"
            v-for="tag in oldtags"
            closable
            :key="tag.id"
            @close="closeLavel(tag)"
          >{{tag.labelName}}</el-tag>
          <el-tag
            style="margin-right: 9px;margin-top: 9px;"
            v-for="tag in tags"
            closable
            :key="tag.id"
            @close="closeLavels(tag)"
          >{{tag.labelName}}</el-tag>
          <input ref="focuss" placeholder="请输入" v-focus v-model.trim="inpVlavue" maxlength="10" v-on:keyup.enter="generate" type="text" />
        </div>
      </div>
      <div class="recently" style="margin-top: 20px;">
        <h3>最近使用的标签</h3>
        <div>
          <el-tag
            style="margin-right: 9px;margin-top: 9px;"
            v-for="tag in docTags"
            @click="addtag(tag)"
            :key="tag.id"
          >{{tag.labelName}}</el-tag>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <div style="margin-top: -13px;">
          <el-button size="medium" @click="laberTruescolse(1)">取 消</el-button>
          <el-button size="medium" type="primary" @click="laberTruesfalse">确 定</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ["laberTruesitem", "laberTrues"],
  data() {
    return {
      createBy: "",
      delectTags: [], // 删除的数组
      inpVlavue: "",
      laberTruesitems: "",
      docTags: [],
      tags: [],
      oldtags: [],
      laberTruesinfo: false,
      n: 10
    };
  },
  watch: {
    n(val) {
      console.log(val);
    }
  },
  mounted() {
    console.log(this.$store.state.loginObject.userId);
    this.laberTruesinfo = this.laberTrues;
    this.laberTruesitems = this.laberTruesitem.docName;
    this.urlber();
    this.ondBer();
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function(el) {
        el.focus();
      }
    }
  },
  methods: {
    // 保存标签
    lanberboxfocus(){
      this.$refs.focuss.focus()
    },
    laberTruesfalse() {
      let [...delectTags] = this.delectTags;
      let [...delectTagis] = this.delectTags;
      let [...tags] = this.tags;
      for (let i = 0; i < delectTags.length; i++) {
        for (let j = 0; j < tags.length; j++) {
          if (delectTags[i].labelName == tags[j].labelName) {
            if (this.$store.state.loginObject.userId == this.createBy) {
              tags.splice(j, 1);
              delectTagis.splice(j,1)
            }
          }
        }
      }
      this.tags = tags
      this.delectTags = delectTagis
      // console.log(this.tags)
      // console.log(this.delectTags)
      // return
      var delectarr = [];
      for (let i = 0; i < this.delectTags.length; i++) {
        delectarr.push({
          paperId: this.laberTruesitem.id,
          id: this.delectTags[i].id,
          labelName:this.delectTags[i].labelName,
          parentId:this.laberTruesitem.parentId,
          docName:this.laberTruesitem.docName,
        });
      }
      let data = {
        data: delectarr,
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId,
        sourceName: '底稿管理',
        projectName: this.$store.state.projectMsg.projectMsg.name,
        paperFlag: true
      };

      this.$post("/doc/paper/label/deleteLabel", data)
        .then(response => {
          this.delectTaglist();
        })
        .catch(function(error) {});
    },
    delectTaglist() {
      if (this.inpVlavue == "" && this.tags == "") {
        this.$emit("laberTrueclose", false);
        return;
      }else{
        if(this.inpVlavue != ""){
          var addtags = this.tags.concat(this.oldtags);
          if(addtags.length < 10){
            for (let i = 0; i <  addtags.length; i++) {
              if( addtags[i].labelName == this.inpVlavue){
                this.$message({ message: '标签名不能相同', type: "error" });
                return
              }
            }
            this.tags.push({ labelName: this.inpVlavue });
          }else{
            this.$message({ message: "标签最多添加10个", type: "error" });
            return;
          }
        }
      }
      var labelName = [];
      for (let i = 0; i < this.tags.length; i++) {
        labelName.push({
          paperId: this.laberTruesitem.id,
          labelName: this.tags[i].labelName,
          parentId:this.laberTruesitem.parentId,
          docName:this.laberTruesitem.docName,
          docId:this.laberTruesitem.docId
        });
      }
      let data = {
        data: labelName,
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId,
        sourceName: '底稿管理',
        projectName: this.$store.state.projectMsg.projectMsg.name,
        paperFlag: true
      };
      this.$post("/doc/paper/label/addLabel", data)
        .then(response => {
          if (response.code == 0) {
            this.$emit("laberTrueclose", false);
            this.tags = [];
            this.$message({ message: response.msg, type: "success" });
          } else {
            this.$message({ message: response.msg, type: "error" });
          }
        })
        .catch(function(error) {});
    },
    // 标签数据
    urlber() {
      let data = {
        data: {
          paperId: this.laberTruesitem.id,
          docType: this.laberTruesitem.docType
        },
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId
      };
      this.$post("/doc/paper/label/getLabelByPaperId", data)
        .then(response => {
          if (response.code == 0) {
            this.oldtags = response.data.labelList;
            this.createBy = response.data.labelList[0].createBy;
            this.n = 10 - (this.tags.length + this.oldtags.length);
          } else if(response.code == -504){}else {
            this.$message({ message: response.msg, type: "error" });
          }
        })
        .catch(function(error) {});
    },
    // 最近使用
    ondBer() {
      let data = {
        data: {
          paperId: this.laberTruesitem.id
        },
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId
      };
      this.$post("/doc/paper/label/getUserLabel", data)
        .then(response => {
          if (response.code == 0) {
            this.docTags = response.data;
          }else if(response.code == -504){
          }else {
            this.$message({ message: response.msg, type: "error" });
          }
        })
        .catch(function(error) {});
    },
    laberTruescolse(item) {
      this.$emit("laberTrueclose", item);
    },
    // 真实删除标签
    closeLavel(tag) {
      this.delectTags.push(tag);
      for (let i = 0; i < this.oldtags.length; i++) {
        if (this.oldtags[i].labelName == tag.labelName) {
          this.oldtags.splice(i, 1);
        }
      }
      this.n = 10 - (this.tags.length + this.oldtags.length);
    },
    closeLavels(tag) {
      for (let i = 0; i < this.tags.length; i++) {
        if (this.tags[i].labelName == tag.labelName) {
          this.tags.splice(i, 1);
        }
      }
      this.n = 10 - (this.tags.length + this.oldtags.length);
    },
    // 最近标签
    addtag(tag) {
      var addtags = this.tags.concat(this.oldtags);
      // console.log(addtags)
      for (let i = 0; i < addtags.length; i++) {
        if (tag.labelName == addtags[i].labelName) {
          this.$message({ message: "标签名不能相同", type: "error" });
          return;
        }
      }
      if (this.tags.length + this.oldtags.length >= 10) {
        this.$message({ message: "标签最多添加10个", type: "error" });
        return;
      }
      this.n = 10 - (this.tags.length + 1 + this.oldtags.length);
      this.tags.push(tag);
    },
    // 生成标签
    generate() {
      if (!this.inpVlavue) {
        this.$message({ message: "标签名不能为空", type: "error" });
        return;
      }
      if (this.tags.length + this.oldtags.length >= 10) {
        this.$message({ message: "标签最多添加10个", type: "error" });
        return;
      }
      var addtags = this.tags.concat(this.oldtags);
      for (let i = 0; i < addtags.length; i++) {
        if (this.inpVlavue == addtags[i].labelName) {
          this.$message({ message: "标签名不能相同", type: "error" });
          return;
        }
      }
      // console.log(this.$ref.focuss)
      this.$refs.focuss.focus()
      this.tags.push({ labelName: this.inpVlavue });
      this.inpVlavue = "";
      this.n = 10 - (this.tags.length + this.oldtags.length);
    }
  }
};
</script>
<style lang="scss">
.laber_true .el-dialog__header {
  border-bottom: none !important;
}
.dialog_title_laber {
    width: 460px;
    line-height: 24px;
    margin: -32px auto 0;
    padding-bottom:10px;
    text-align: center;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    font-size: 18px;
}
.lineLaber {
  width: 100%;
  height: 0px;
  border-top:1px solid rgb(221, 221, 221);
  position: absolute;
  left:0;
  // margin-left:-20px;
}
.lanbercss {
  width: 100%;
  padding-top:20px;
  max-height: 200px;
  h3 {
    text-align: left;
  }
  .lanbertext {
    text-align: right;
    margin-top: -16px;
  }
  .lanberbox {
    width: 96%;
    min-height: 18px;
    border: 1px solid #ccc;
    margin-top: 5px;
    border-radius: 3px;
    text-align: left;
    padding: 10px;
    padding-top: 3px;
    padding-bottom: 21px;
    input {
      height: 26px;
      width: 88px;
      border: none;
      margin-top: 9px;
    }
  }
}
.recently {
  text-align: left;
  h3 {
    margin-top: 10px;
  }
  div {
    padding-left: 12px;
  }
}
</style>