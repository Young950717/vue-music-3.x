import { useStore } from 'vuex'
import { computed, watch, ref } from 'vue'
import { getLyric } from '@/service/song'
import Lyric from 'lyric-parser'
export default function useLyric ({ songReady, currentTime }) {
  const store = useStore()
  const currentLyric = ref(null)
  const lyricScrollRef = ref(null) // 控制scroll dom
  const lyricListRef = ref(null)
  const currentLineNum = ref(0)
  const pureMusicLyric = ref('') // 纯音乐
  const playingLyric = ref('') // 当前播放的歌词
  const currentSong = computed(() => store.getters.currentSong)

  watch(currentSong, async (newCurrentSong) => {
    if (!newCurrentSong.id || !newCurrentSong.url) return
    /* 频繁切换的时候，上一首歌词stop掉 但是歌曲还没加载好，直接切的时候
    下一首歌songready为true了，但是这个时候歌词还是上一首的，所以要做一个清除的操作 */
    stopLyric()
    currentSong.value = null
    currentLineNum.value = 0
    pureMusicLyric.value = ''
    playingLyric.value = ''
    const lyric = await getLyric(newCurrentSong)
    store.commit('addSongLyric', {
      song: newCurrentSong,
      lyric
    })
    /* 优化
    上一首歌曲的歌词还为处理/下载完就切了下一首歌，直接不做歌词处理了 */
    if (currentSong.value.lyric !== lyric) return
    currentLyric.value = new Lyric(lyric, handleLyric)
    const hasLyric = currentLyric.value.lines.length // 是否有歌词
    if (hasLyric) {
      if (songReady.value) {
        // 歌曲开始播放才同步播放歌词
        playLyric()
      }
    } else {
      pureMusicLyric.value = lyric.replace(/\[(\d{2}):(\d{2})}\]/g, '')
    }
  })
  function handleLyric ({ lineNum, txt }) {
    currentLineNum.value = lineNum
    playingLyric.value = txt
    const scrollComp = lyricScrollRef.value
    const listEl = lyricListRef.value
    if (!listEl) return
    if (lineNum > 5) {
      const lineEl = listEl.children[lineNum - 5]
      scrollComp.scroll.scrollToElement(lineEl, 1000)
    } else {
      scrollComp.scroll.scrollTo(0, 0, 1000)
    }
  }
  function playLyric () {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      currentLyricVal.seek(currentTime.value * 1000)
    }
  }
  function stopLyric () {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      currentLyricVal.stop(currentTime.value * 1000)
    }
  }
  return {
    currentLyric,
    currentLineNum,
    lyricScrollRef,
    lyricListRef,
    pureMusicLyric,
    playingLyric,
    playLyric,
    stopLyric
  }
}
