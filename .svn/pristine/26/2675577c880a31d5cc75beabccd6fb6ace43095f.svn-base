import Common from './Lib//Common'
import Examine from './Lib/Examine'
import Business from './Lib/Business'
import Intel from './Lib/Intel'
import Mit from './Lib/Mit'

// 组件引入
import examine from '@/components/examine/examine'
import BusinessTree from '@/components/business/BusinessTree'
import BusinessProcess from '@/components/business/BusinessProcess'
const components = [
    BusinessTree,BusinessProcess,examine
]


export default {
    install(Vue,option){
        this.$lib = Common(option)
        Vue.prototype.$Business = Business(this.$lib)
        Vue.prototype.$Examine = Examine(this.$lib)
        Vue.prototype.$Intel = Intel(this.$lib)
        Vue.prototype.$Mit = Mit
        components.forEach(component=>{
            Vue.component(component.name,component)
        })
    }
}