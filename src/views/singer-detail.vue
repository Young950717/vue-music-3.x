<template>
  <div class="singer-detail">
    <music-list :songs="songs" :pic="pic" :title="title" :loading="loading"></music-list>
  </div>
</template>

<script>
import { getSingerDetail } from '@/service/singer'
import { processSongs } from '@/service/song'
import MusicList from '@/components/music-list/music-list.vue'
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
      return this.singer && this.singer.pic
    },
    title () {
      return this.singer && this.singer.name
    }
  },
  async created () {
    const res = await getSingerDetail(this.singer)
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
