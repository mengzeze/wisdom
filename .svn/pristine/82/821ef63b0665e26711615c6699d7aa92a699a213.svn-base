import filters from './filter'

const MyFilter = Object.create(null)
MyFilter.install = (Vue)=>{
  for (let key in filters) {
    Vue.filter(key, filters[key])
  }
}
export default MyFilter
