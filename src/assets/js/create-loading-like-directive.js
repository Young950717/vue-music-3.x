// 封装自定义类似loading组件的指令
import { createApp } from 'vue'
import { addClass, removeClass } from '@/assets/js/dom'
const relativeCls = 'g-relative'
export default function createLoadingLikeDirective (Comp) {
  const name = Comp.name // 多个指令绑在同一个dom元素上的时候作为区分
  function append (el) {
    const style = getComputedStyle(el)
    if (['absolute', 'relative', 'fixed'].indexOf(style.position) === -1) {
      addClass(el, relativeCls)
    }
    el.appendChild(el[name].instance.$el)
  }
  function remove (el) {
    removeClass(el, relativeCls)
    el.removeChild(el[name].instance.$el)
  }
  return {
    mounted (el, binding) {
      // debugger
      const app = createApp(Comp) // 生成对应组件app
      const instance = app.mount(document.createElement('div')) // 挂载在生成的div上
      if (!el[name]) {
        el[name] = {}
      }
      el[name].instance = instance
      const title = binding.arg
      if (typeof title !== 'undefined') {
        instance.setTitle(title)
      }
      if (binding.value) {
        append(el)
      }
    },
    updated (el, binding) {
      const title = binding.arg
      if (typeof title !== 'undefined') {
        el[name].instance.setTitle(title)
      }
      if (binding.value !== binding.oldValue) {
        binding.value ? append(el) : remove(el)
      }
    }

  }
}
