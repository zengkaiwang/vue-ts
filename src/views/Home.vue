<template>
  <div class="home">
    <div>我是home页面</div>
    <el-button type="primary">主要按钮</el-button>
    <div :style="{ color: 'orange' }">
      <icon
        data="@icon/icon-dashboard.svg"
        width="40"
        height="40"
        color="blue"
        dir="right"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld
  }
}
</script>
