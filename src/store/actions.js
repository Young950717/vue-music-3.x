import { PLAY_MODE } from '@/assets/js/constant'
import { shuffle } from '@/assets/js/utils'
// 开始播放actions
export function selectPlay({ commit }, { list, index }) {
  commit('setPlayMode', PLAY_MODE.sequence)
  commit('setSequenceList', list)
  commit('setPlayingState', true)
  commit('setFullScreen', true)
  commit('setPlayList', list)
  commit('setCurrentIndex', index)
}
// 随机播放
export function randomPlay({ commit }, list) {
  commit('setPlayMode', PLAY_MODE.random)
  commit('setSequenceList', list)
  commit('setPlayingState', true)
  commit('setFullScreen', true)
  commit('setPlayList', shuffle(list))
  commit('setCurrentIndex', 0)
}
export function changeMode({ commit, state, getters }, mode) {
  const currentId = getters.currentSong.id
  if (mode === PLAY_MODE.random) {
    commit('setPlayList', shuffle(state.sequencelist))
  } else {
    commit('setPlayList', state.sequencelist)
  }
  // 保证打乱顺序后 还是播放当前的歌
  const index = state.playlist.findIndex(song => song.id === currentId)
  commit('setCurrentIndex', index)
  commit('setPlayMode', mode)
}

export function removeSong({ commit, state }, song) {
  // debugger
  const sequencelist = state.sequencelist.slice()
  const playlist = state.playlist.slice()

  const sequenceIndex = findIndex(sequencelist, song)
  const playlistIndex = findIndex(playlist, song)

  // 要删除的index小于0 没有意义
  if (playlistIndex < 0 || sequenceIndex < 0) return

  let currentIndex = state.currentIndex
  if (currentIndex > playlistIndex || currentIndex === playlist.length) {
    currentIndex--
  }
  sequencelist.splice(sequenceIndex, 1)
  playlist.splice(playlistIndex, 1)

  commit('setSequenceList', sequencelist)
  commit('setPlayList', playlist)
  commit('setCurrentIndex', currentIndex)
}

function findIndex(list, song) {
  return list.findIndex(item => {
    return song.id === item.id
  })
}
