<template>
  <div class="bg-hex-b2a8bb">tailwind.css</div>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="@/assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <div>
    <RouterLink :to="{ name: 'home' }" class="home"> HOME </RouterLink>
    <RouterLink :to="{ name: 'about' }"> ABOUT </RouterLink>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from '@/components/HelloWorld/index.vue'
export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld
  },
  setup() {}
})
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

<style lang="less" scoped>
.home {
  color: red;
}
</style>
