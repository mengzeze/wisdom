import directives from './directive'

const MyDirective = Object.create(null)

MyDirective.install = function (Vue) {
  for(let key in directives) {
    Vue.directive(key, directives[key])
  }
}
export default MyDirective
