<template>
  <m-header></m-header>
  <tab></tab>
  <router-view />
  <player></player>
</template>
<script>
import MHeader from './components/header/header'
import Player from './components/player/player.vue'
import Tab from './components/tab/tab'
export default {
  components: {
    MHeader,
    Tab,
    Player
  }
}
</script>
<style lang="scss" scoped>
</style>
