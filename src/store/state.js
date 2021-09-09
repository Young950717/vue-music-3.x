import { PLAY_MODE, FAVORITE_KEY } from '@/assets/js/constant'
import { load } from '@/assets/js/array-store'
const state = {
  sequencelist: [], // 顺序播放列表
  playlist: [], // 播放列表
  playing: false, // 正在播放
  playMode: PLAY_MODE.sequence,
  currentIndex: 0, // 当前播放索引
  fullScreen: false, // 是否全屏
  favoriteList: load(FAVORITE_KEY) // 收藏歌曲列表
}
export default state
