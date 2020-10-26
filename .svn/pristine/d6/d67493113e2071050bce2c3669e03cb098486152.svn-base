<template>
  <div class="noticetypeconfig">
    <div class="head">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>系统配置</el-breadcrumb-item>
        <el-breadcrumb-item>通知方式配置</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="headersBox finance_tit">
        <div class="headersL">
          <span class="headers_clearFix_title">通知方式配置</span>
        </div>
        <div class="headersR">
          <el-button type="primary" @click="handleSave">保存</el-button>
        </div>
      </div>
    </div>
    
    <div class="contentBox" :style="`height:${boxHeight}px`">
      <div class="contItem">
        <div class="tit stripTag">短信通知</div>
        <div class="cont">
          <el-checkbox v-model="smsPrompt">启用短信通知</el-checkbox>
          <div class="msg">注：启用前请确保系统已调试成功。</div>
        </div>
      </div>
      <div class="contItem">
        <div class="tit stripTag">邮件通知</div>
        <div class="cont">
          <el-checkbox v-model="emailPrompt">启用邮件通知</el-checkbox>
          <div class="msg">注：启用前请确保系统已调试成功。</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'noticetypeconfig',
  data () {
    return {
      smsPrompt: false, // 短信通知
      emailPrompt: false, // 邮件通知
      boxHeight: 500
    }
  },
  created () {
    this.boxHeight = (document.documentElement.clientHeight || document.body.clientHeight) - 184;
    this.searchStatus();
  },
  methods: {
    // 保存按钮
    handleSave () {
      this.$post('/sys/editNoticeWayConfig', {
        data: {
          email: this.emailPrompt ? 1 : 0,
          sms: this.smsPrompt ? 1 : 0
        }
      }).then(res => {
        if (this.code.codeNum.SUCCESS == res.code) {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          return
        }
        this.$message.error('保存失败')
      }).catch(err => {
        console.log(err)
      })
    },
    // 查询状态
    searchStatus () {
      this.$post('/sys/getNoticeWayConfig').then(res => {
        if (this.code.codeNum.SUCCESS == res.code) {
          this.emailPrompt = res.data.email == 1;
          this.smsPrompt = res.data.sms == 1;
          return
        }
        this.$message.error('获取失败')
      }).catch(err => {
        console.log(err)
      })
    }
  }

}
</script>
<style lang="scss" type="text/css" scoped>
/deep/.noticetypeconfig .head .headersBox .headersR .el-button {
  width: 97px;
  height: 40px;
}
.noticetypeconfig {
  // 头部
  .head {
    box-sizing: border-box;
    width: 100%;
    height: 96px;
    padding: 0 10px 6px 10px;
    background: #fff;
    .el-breadcrumb {
      line-height: 46px;
      padding-left: 1px;
      padding-top: 0px;
    }
    .headersBox {
      overflow: hidden;
      zoom: 1;
      .headers_clearFix_title {
        padding-left: 1px;
        text-align: left;
        font-size: 20px;
      }
      .headersL {
        float: left;
      }
      .headersR {
        float: right;
        box-sizing: border-box;
        padding-right: 14px;
      }
    }
  }
  // 主要内容
  .contentBox {
    width: 100%;
    min-height: 500px;
    margin-top: 14px;
    border-radius: 2px;
    background: #fff;
    text-align: left;
    .contItem {
      padding-top: 44px;
      .tit {
        border-left: 4px solid #0061a9;
        padding-left: 23px;
        font-size: 18px;
      }
      .cont {
        padding: 25px 0 0 47px;
      }
      .msg {
        padding-top: 14px;
        color: #606266;
        font-size: 12px;
      }
    }
  }
}
</style>