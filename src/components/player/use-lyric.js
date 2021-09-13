import { useStore } from 'vuex'
import { computed, watch, ref } from 'vue'
import { getLyric } from '@/service/song'
import Lyric from 'lyric-parser'
export default function useLyric ({ songReady, currentTime }) {
  const store = useStore()
  const currentLyric = ref(null)
  const currentLineNum = ref(0)
  const currentSong = computed(() => store.getters.currentSong)

  watch(currentSong, async (newCurrentSong) => {
    if (!newCurrentSong.id || !newCurrentSong.url) return
    const lyric = await getLyric(newCurrentSong)
    store.commit('addSongLyric', {
      song: newCurrentSong,
      lyric
    })
    /* 优化
    上一首歌曲的歌词还为处理/下载完就切了下一首歌，直接不做歌词处理了 */
    if (currentSong.value.lyric !== lyric) return
    currentLyric.value = new Lyric(lyric, handleLyric)
    if (songReady.value) {
      // 歌曲开始播放才同步播放歌词
      playLyric()
    }
  })
  function handleLyric ({ lineNum }) {
    currentLineNum.value = lineNum
  }
  function playLyric () {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      currentLyricVal.seek(currentTime.value * 1000)
    }
  }
  return {
    currentLyric,
    currentLineNum,
    playLyric
  }
}
