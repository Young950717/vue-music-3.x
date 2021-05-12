<template>
  <div class="singer">singer</div>
</template>

<script>
import { getSingerList } from '@/service/singer'
export default {
  name: 'singer',
  async created() {
    const res = await getSingerList()
    console.log(res)
  }
}
</script>

<style lang="scss" scoped>
</style>
