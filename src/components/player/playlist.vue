<template>
  <teleport to="body">
    <transition name="list-fade">
      <div class="playlist" v-show="playlist.length && visiable" @click="hide">
        <div class="list-wrapper" @click.stop>
          <div class="list-header">
            <h1 class="title">
              <i class="icon" :class="modeIcon" @click.stop="changeMode"></i>
              <span class="text">{{ modeText }}</span>
            </h1>
          </div>
          <scroll class="list-content" ref="listScollRef">
            <transition-group tag="ul" name="list" ref="listRef">
              <li class="item" v-for="song in sequenceList" :key="song.id" @click="selectItem(song)">
                <i class="current" :class="getCurrentIcon(song)"></i>
                <span class="text">{{ song.name }}</span>
                <span class="favorite" @click="toggleFavorite(song)">
                  <i :class="getFavoriteIcon(song)"></i>
                </span>
                <span class="delete" @click.stop="removeSong(song)">
                  <i class="icon-delete"></i>
                </span>
              </li>
            </transition-group>
          </scroll>
          <div class="list-footer" @click.stop="hide">
            <span>关闭</span>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import scroll from '@/components/base/scroll/scroll.vue'
import { ref, computed, nextTick, watch } from 'vue'
import { useStore } from 'vuex'
import useMode from './user-mode'
import useFavorite from './use-favorite'
export default {
  name: 'playlist',
  components: {
    scroll
  },
  setup () {
    const visiable = ref(false)
    const listScollRef = ref(null)
    const listRef = ref(null)
    const store = useStore()
    const { modeIcon, changeMode, modeText } = useMode()
    const { getFavoriteIcon, toggleFavorite } = useFavorite()
    const currentSong = computed(() => store.getters.currentSong)
    const playlist = computed(() => store.state.playlist)
    const sequenceList = computed(() => store.state.sequencelist)

    // 除了手动切换，歌曲自动播放完也要执行scrollToElement这个动作
    watch(currentSong, async () => {
      if (!visiable.value) return
      await nextTick()
      // console.log(1)
      scrollToCurrent()
    })

    function getCurrentIcon (song) {
      if (song.id === currentSong.value.id) {
        return 'icon-play'
      }
    }

    function hide () {
      visiable.value = false
    }
    async function show () {
      visiable.value = true
      await nextTick()
      refreshScroll()
      scrollToCurrent()
    }
    function refreshScroll () {
      listScollRef.value.scroll.refresh()
    }
    function scrollToCurrent () {
      // debugger
      const index = sequenceList.value.findIndex(song => {
        return song.id === currentSong.value.id
      })
      const target = listRef.value.$el.children[index]
      listScollRef.value.scroll.scrollToElement(target, 300)
    }
    function selectItem (song) {
      // console.log(123)
      const index = playlist.value.findIndex(item => {
        return item.id === song.id
      })
      store.commit('setCurrentIndex', index)
      store.commit('setPlayingState', true)
    }
    function removeSong (song) {
      // debugger
      store.dispatch('removeSong', song)
    }

    return {
      visiable,
      playlist,
      sequenceList,
      modeIcon,
      changeMode,
      modeText,
      listScollRef,
      getFavoriteIcon,
      toggleFavorite,
      listRef,
      removeSong,
      selectItem,
      getCurrentIcon,
      hide,
      show
    }
  }

}
</script>

<style lang="scss" scoped>
.playlist {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  background-color: $color-background-d;
  &.list-fade-enter-active,
  &.list-fade-leave-active {
    transition: opacity 0.3s;
    .list-wrapper {
      transition: all 0.3s;
    }
  }
  &.list-fade-enter-from,
  &.list-fade-leave-to {
    opacity: 0;
    .list-wrapper {
      transform: translate3d(0, 100%, 0);
    }
  }
  .list-wrapper {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 210;
    width: 100%;
    background-color: $color-highlight-background;
    .list-header {
      position: relative;
      padding: 20px 30px 10px 20px;
      .title {
        display: flex;
        align-items: center;
        .icon {
          margin-right: 10px;
          font-size: 24px;
          color: $color-theme-d;
        }
        .text {
          flex: 1;
          font-size: $font-size-medium;
          color: $color-text-l;
        }
        .clear {
          @include extend-click();
          .icon-clear {
            font-size: $font-size-medium;
            color: $color-text-d;
          }
        }
      }
    }
    .list-content {
      max-height: 240px;
      overflow: hidden;
      .item {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 30px 0 20px;
        overflow: hidden;
        .current {
          flex: 0 0 20px;
          width: 20px;
          font-size: $font-size-small;
          color: $color-theme-d;
        }
        .text {
          flex: 1;
          @include no-wrap();
          font-size: $font-size-medium;
          color: $color-text-d;
        }
        .favorite {
          @include extend-click();
          margin-right: 15px;
          font-size: $font-size-small;
          color: $color-theme;
          .icon-favorite {
            color: $color-sub-theme;
          }
        }
        .delete {
          @include extend-click();
          font-size: $font-size-small;
          color: $color-theme;
          &.disable {
            color: $color-theme-d;
          }
        }
      }
    }
    .list-add {
      width: 140px;
      margin: 20px auto 30px auto;
      .add {
        display: flex;
        align-items: center;
        padding: 8px 16px;
        border: 1px solid $color-text-l;
        border-radius: 100px;
        color: $color-text-l;
        .icon-add {
          margin-right: 5px;
          font-size: $font-size-small-s;
        }
        .text {
          font-size: $font-size-small;
        }
      }
    }
    .list-footer {
      text-align: center;
      line-height: 50px;
      background: $color-background;
      font-size: $font-size-medium-x;
      color: $color-text-l;
    }
  }
}
</style>
