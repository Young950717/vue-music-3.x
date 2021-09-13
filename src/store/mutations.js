const mutations = {
  // 修改播放状态
  setPlayingState (state, playing) {
    state.playing = playing
  },
  // 设置顺序播放列表
  setSequenceList (state, list) {
    state.sequencelist = list
  },
  // 设置播放列表
  setPlayList (state, list) {
    state.playlist = list
  },
  // 设置播放模式
  setPlayMode (state, mode) {
    state.playMode = mode
  },
  // 设置当前播放index
  setCurrentIndex (state, index) {
    state.currentIndex = index
  },
  // 设置全屏
  setFullScreen (state, val) {
    state.fullScreen = val
  },
  setFavoriteList (state, list) {
    state.favoriteList = list
  },
  addSongLyric (state, { song, lyric }) {
    state.sequencelist.map(item => {
      if (item.mid === song.mid) {
        item.lyric = lyric
      }
      return item
    })
  }
}
export default mutations
