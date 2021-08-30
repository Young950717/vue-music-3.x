import { PLAY_MODE } from '@/assets/js/constant'
import { shuffle } from '@/assets/js/utils'
// 开始播放actions
export function selectPlay ({ commit }, { list, index }) {
  commit('setPlayMode', PLAY_MODE.squence)
  commit('setSequenceList', list)
  commit('setPlayingState', true)
  commit('setFullScreen', true)
  commit('setPlayList', list)
  commit('setCurrentIndex', index)
}
// 随机播放
export function randomPlay ({ commit }, list) {
  commit('setPlayMode', PLAY_MODE.random)
  commit('setSequenceList', list)
  commit('setPlayingState', true)
  commit('setFullScreen', true)
  commit('setPlayList', shuffle(list))
  commit('setCurrentIndex', 0)
}
