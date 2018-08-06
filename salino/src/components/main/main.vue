<template>
    <div>
      <first-view></first-view>
      <router-view></router-view>
    </div>
</template>

<script>
import FirstView from '../firstView/firstView'
export default {
  name: 'main',
  components: {
    FirstView
  }
}
</script>

<style scoped>

</style>
