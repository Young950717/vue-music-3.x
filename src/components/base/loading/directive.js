import { createApp } from 'vue'
import Loading from './loading.vue'
import { addClass, removeClass } from '@/assets/js/dom'
const relativeCls = 'g-relative'
const loadingDirective = {
    mounted(el, binding) {
        const app = createApp(Loading) // 生成loading组件app
        const instance = app.mount(document.createElement('div')) // 挂载在生成的div上
        el.instance = instance
        if (binding.value) {
            append(el)
        }
    },
    updated(el, binding) {
        if (binding.value !== binding.oldValue) {
            binding.value ? append(el) : remove(el)
        }
    }
}
function append(el) {
    const style = getComputedStyle(el)
    if (['absolute', 'relative', 'fixed'].indexOf(style.position) === -1) {
        addClass(el, relativeCls)
    }
    el.appendChild(el.instance.$el)
}
function remove(el) {
    removeClass(el, relativeCls)
    el.removeChild(el.instance.$el)
}
export default loadingDirective
