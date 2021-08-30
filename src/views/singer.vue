<template>
  <div class="singer" v-loading="!singers.length">
    <index-list :data="singers" @select="selectSinger"></index-list>
    <router-view v-slot="{ Component }" :singer="selectedSinger">
      <transition appear name="slide">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
import { getSingerList } from '@/service/singer'
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant'
import IndexList from '@/components/base/index-list/index-list.vue'
export default {
  components: { IndexList },
  name: 'singer',
  async created () {
    const res = await getSingerList()
    this.singers = res.singers
  },
  data () {
    return {
      singers: [],
      selectedSinger: null
    }
  },
  methods: {
    selectSinger (singer) {
      this.selectedSinger = singer
      this.cacheSinger(singer)
      this.$router.push({
        path: `/singer/${singer.mid}`
      })
    },
    cacheSinger (singer) {
      storage.session.set(SINGER_KEY, singer)
    }
  }
}
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>
