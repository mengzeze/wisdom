
const component = Object.create(null)
component.install = function (vue) {

  // 下拉多选
  vue.component('multiple-choice',(resolve) => { require.ensure([],() => resolve(require('./MultipleChoice')))})
  // 添加附件
  vue.component('add-attachment', (resolve) => { require.ensure([], () => resolve(require('./AddAttachment'))) })
  // 文档路径
  vue.component('path-bar', (resolve) => { require.ensure([], () => resolve(require('./PathBar'))) })
  // 切换项目
  vue.component('toggle-project', (resolve) => { require.ensure([], () => resolve(require('./ToggleProject'))) })
  // 时间范围选择
  vue.component('date-range', (resolve) => { require.ensure([], () => resolve(require('./DateRange'))) })
  // 上传
  // vue.component('rd-uploader', (resolve) => { require.ensure([], () => resolve(require('./RdUploader'))) })
  vue.component('rd-uploader', (resolve) => { require.ensure([], () => resolve(require('./RdUploaderFolder'))) })
  // vue.component('rd-uploader-folder', (resolve) => { require.ensure([], () => resolve(require('./RdUploaderFolder'))) })
  // 版本
  vue.component('file-version', (resolve) => { require.ensure([], () => resolve(require('./FileVersion'))) })
  // 切换主题
  vue.component('theme-picker', (resolve) => { require.ensure([], () => resolve(require('./ThemePicker'))) })
  // 下拉选择框懒加载组件
  vue.component('select-lazy', (resolve) => { require.ensure([], () => resolve(require('./SelectLazy'))) })

}
export default component
