<template>
  <div class="singer-detail">
    <music-list :songs="songs" :pic="pic" :title="title" :loading="loading"></music-list>
  </div>
</template>

<script>
import { getSingerDetail } from '@/service/singer'
import { processSongs } from '@/service/song'
import MusicList from '@/components/music-list/music-list.vue'
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant'
export default {
  name: 'singer-detail',
  props: {
    singer: Object
  },
  components: {
    MusicList
  },
  data () {
    return {
      songs: [],
      loading: true
    }
  },
  computed: {
    pic () {
      const computedSinger = this.computedSinger
      return computedSinger && computedSinger.pic
    },
    title () {
      const computedSinger = this.computedSinger
      return computedSinger && computedSinger.name
    },
    computedSinger () {
      let ret = null
      const singer = this.singer
      if (singer) {
        ret = singer
      } else {
        const cachesinger = storage.session.get(SINGER_KEY)
        if (cachesinger && cachesinger.mid === this.$route.params.id) {
          ret = cachesinger
        }
      }
      return ret
    }
  },
  async created () {
    const res = await getSingerDetail(this.computedSinger)
    const songs = await processSongs(res.songs)
    this.loading = false
    this.songs = songs
  }
}
</script>

<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
