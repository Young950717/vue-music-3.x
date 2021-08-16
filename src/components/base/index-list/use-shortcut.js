import { computed, ref } from 'vue'
export default function usershortcut (props, gruopRef) {
  const ANCHOR_HEIGHT = 18
  const scrollRef = ref(null)
  const shortcutList = computed(() => {
    return props.data.map(group => {
      return group.title
    })
  })
  const touch = {} // 记录差值
  function onShortcutTouchStart (e) {
    const anchorIndex = parseInt(e.target.dataset.index)
    touch.y1 = e.touches[0].pageY
    touch.anchorIndex = anchorIndex
    scrollTo(anchorIndex)
  }
  function onShortcutTouchMove (e) {
    touch.y2 = e.touches[0].pageY
    const delta = (touch.y2 - touch.y1) / ANCHOR_HEIGHT | 0
    const anchorIndex = touch.anchorIndex + delta
    scrollTo(anchorIndex)
  }
  function scrollTo (index) {
    if (isNaN(index)) return
    // 限制滑动的区间在bar之间
    index = Math.max(0, Math.min(shortcutList.value.length - 1, index))
    const targetEl = gruopRef.value.children[index]
    const scroll = scrollRef.value.scroll
    scroll.scrollToElement(targetEl, 0)
  }
  return {
    shortcutList,
    scrollRef,
    onShortcutTouchStart,
    onShortcutTouchMove
  }
}
