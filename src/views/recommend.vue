<template>
  <div class="recommend">推荐</div>
</template>

<script>
import { getRecommend } from '@/service/recommend'
export default {
  name: 'recommend',
  async created() {
    const res = await getRecommend()
    console.log(res)
  }
}
</script>

<style lang="scss" scoped>
</style>
