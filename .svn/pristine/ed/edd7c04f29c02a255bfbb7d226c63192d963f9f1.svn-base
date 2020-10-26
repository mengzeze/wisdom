<template>
  <el-color-picker
    class="theme-picker"
    popper-class="theme-picker-dropdown"
    v-model="theme" 
    :size="size">
  </el-color-picker>
</template>

<script>

const version = require('element-ui/package.json').version // element-ui version from node_modules
const ORIGINAL_THEME = '#0061A9' // default color
// const ORIGINAL_THEME = '#CC0000' // default color
const INDEXURL = '../../static/theme/index.css'
const CUSTOMURL = '../../static/theme/custom.css'

export default {
  name: 'ThemePicker',
  props: {
    default: { // 初始化主题，可由外部传入
      type: String,
      default: null
    },
    size: { // 初始化主题，可由外部传入
      type: String,
      default: 'small'
    }
  },
  data() {
    return {
      custom: '',
      chalk: '', // content of theme-chalk css
      theme: ORIGINAL_THEME,
      showSuccess: true // 是否弹出换肤成功消息
    }
  },
  created(){
    // this.updateDomStyle('custom', 'custom-style')
    let val = this.$store.state.themeColor
    let oldVal = this.$store.state.oldThemeColor
    this.handleThemeChange(val, oldVal)
    this.theme = this.$store.state.themeColor
    // console.log('theme',this.theme )
  },
  mounted() {
    if(this.default != null) {
      this.theme = this.$store.state.themeColor
      // console.log('theme',this.theme )

      this.$emit('onThemeChange', this.theme)
      // this.handleThemeChange(ORIGINAL_THEME, ORIGINAL_THEME)
      this.showSuccess = false
    }
  },
  computed:{

  },
  watch: {
    theme(val, oldVal) {
      // console.log('watch', val, oldVal)
      this.handleThemeChange(val, oldVal)
    }
  },
  methods: {
    handleThemeChange(val, oldVal){
     if (typeof val !== 'string') return
      const themeCluster = this.getThemeCluster(val.replace('#', ''))
      const originalCluster = this.getThemeCluster(oldVal.replace('#', ''))
      // console.log(themeCluster,originalCluster)
      const getHandler = (variable, id) => {
        return () => {
          const originalCluster = this.getThemeCluster(ORIGINAL_THEME.replace('#', ''))
          const newStyle = this.updateStyle(this[variable], originalCluster, themeCluster)

          let styleTag = document.getElementById(id)
          if (!styleTag) {
            styleTag = document.createElement('style')
            styleTag.setAttribute('id', id)
            document.head.appendChild(styleTag)
          }
          styleTag.innerText = newStyle
        }
      }

      const chalkHandler = getHandler('chalk', 'chalk-style')

      const chalkHandlerCustom = getHandler('custom', 'custom-style')


      // chalkHandler()

      if (!this.chalk) {
        // const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
        this.getCSSString(INDEXURL, chalkHandler, 'chalk')
        chalkHandler()
      } else {
        chalkHandler()
      }

      if (!this.custom) {
        this.getCSSString(CUSTOMURL, chalkHandlerCustom, 'custom')
        chalkHandlerCustom()
      } else {
        chalkHandlerCustom()
      }

      const styles = [].slice.call(document.querySelectorAll('style'))
        .filter(style => {
          const text = style.innerText
          return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
        })
      styles.forEach(style => {
        const { innerText } = style
        if (typeof innerText !== 'string') return
        style.innerText = this.updateStyle(innerText, originalCluster, themeCluster)
      })
      
      // 响应外部操作
      this.$emit('onThemeChange', val)
      // if(this.showSuccess) {
      //   this.$message({
      //     message: '换肤成功',
      //     type: 'success'
      //   })
      // } else {
      //   this.showSuccess = true
      // }
    },



    updateDomStyle(variable, id){
      let chalkHandler = this.chalkHandler(variable, id)
      this.getCSSString(CUSTOMURL, chalkHandler, variable)
    },

    chalkHandler (variable, id) {
        return () => {
          let val = this.$store.state.themeColor
          let oldVal = this.$store.state.oldThemeColor
          const themeCluster = this.getThemeCluster(val.replace('#', ''))
          const originalCluster = this.getThemeCluster(oldVal.replace('#', ''))
          const newStyle = this.updateStyle(this[variable], originalCluster, themeCluster)
          let styleTag = document.getElementById(id)
          if (!styleTag) {
            styleTag = document.createElement('style')
            styleTag.setAttribute('id', id)
            document.head.appendChild(styleTag)
          }
          styleTag.innerText = newStyle
        }
    },







    updateStyle(style, oldCluster, newCluster) {
      let newStyle = style
      oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
      })
      return newStyle
    },


    getCSSString(url, callback, variable) {
      const xhr = new XMLHttpRequest()
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
          callback()
        }
      }
      xhr.open('GET', url)
      xhr.send()
    },

    getThemeCluster(theme) {
      const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)

        if (tint === 0) { // when primary color is in its rgb space
          return [red, green, blue].join(',')
        } else {
          red += Math.round(tint * (255 - red))
          green += Math.round(tint * (255 - green))
          blue += Math.round(tint * (255 - blue))

          red = red.toString(16)
          green = green.toString(16)
          blue = blue.toString(16)

          return `#${red}${green}${blue}`
        }
      }

      const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)

        red = Math.round((1 - shade) * red)
        green = Math.round((1 - shade) * green)
        blue = Math.round((1 - shade) * blue)

        red = red.toString(16)
        green = green.toString(16)
        blue = blue.toString(16)

        // 处理00颜色值
        red === '0' && (red = '00')
        green === '0' && (green = '00')
        blue === '0' && (blue = '00')

        return `#${red}${green}${blue}`
      }

      const clusters = [theme]
      for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
      }
      clusters.push(shadeColor(theme, 0.1))
      return clusters
    }
  }
}
</script>

<style>
.theme-picker .el-color-picker__trigger {
  vertical-align: middle;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>