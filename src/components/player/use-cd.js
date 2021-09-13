import { useStore } from 'vuex'
import { computed, ref, watch } from 'vue'
// import { PLAY_MODE } from '@/assets/js/constant'
export default function useCd () {
  const store = useStore()
  const cdRef = ref(null)
  const cdImageRef = ref(null)
  const playing = computed(() => store.state.playing)
  const cdCls = computed(() => {
    return playing.value ? 'playing' : ''
  })
  watch(playing, newPlaying => {
    if (!newPlaying) {
      // 点击暂停的时候同步内外层的transform
      syncTransform(cdRef.value, cdImageRef.value)
    }
  })

  function syncTransform (wrapper, inner) {
    /* 因为内层图片相对于外层div来旋转，第一次暂停之后外层已经有一定的旋转了，
    所以下一次暂停同步的时候需要加上第一次暂停外层旋转的角度（叠加） */
    const wrapperTransform = getComputedStyle(wrapper).transform
    const innerTransform = getComputedStyle(inner).transform
    wrapper.style.transform =
      wrapperTransform === 'none' ? innerTransform : innerTransform + wrapperTransform
  }
  return {
    cdCls,
    cdRef,
    cdImageRef
  }
}
