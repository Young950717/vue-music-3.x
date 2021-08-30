import { PLAY_MODE } from '@/assets/js/constant'
const state = {
  sequencelist: [], // 顺序播放列表
  playlist: [], // 播放列表
  playing: false, // 正在播放
  playMode: PLAY_MODE.squence,
  currentIndex: 0, // 当前播放索引
  fullScreen: false // 是否全屏
}
export default state
