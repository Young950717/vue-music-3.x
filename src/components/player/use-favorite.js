import { useStore } from 'vuex'
import { computed } from 'vue'
import { save, remove } from '@/assets/js/array-store.js'
import { FAVORITE_KEY } from '@/assets/js/constant.js'
export default function useFavorite () {
  const store = useStore()
  const favoriteList = computed(() => store.state.favoriteList)
  const manLen = 100 // 收藏歌曲最大限制
  function getFavoriteIcon (song) {
    return isFavorite(song) ? 'icon-favorite' : 'icon-not-favorite'
  }
  function isFavorite (song) {
    return favoriteList.value.findIndex(item => {
      return song.id === item.id
    }) > -1
  }
  function toggleFavorite (song) {
    let list
    if (isFavorite(song)) {
      // remove
      list = remove(FAVORITE_KEY, compare)
    } else {
      // instert
      list = save(song, FAVORITE_KEY, compare, manLen)
    }
    store.commit('setFavoriteList', list)
    function compare (item) {
      return item.id === song.id
    }
  }
  return {
    getFavoriteIcon,
    toggleFavorite
  }
}
