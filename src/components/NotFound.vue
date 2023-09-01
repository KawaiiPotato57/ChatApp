<template>
  <div class="notFoundContainer">
    <img :src="chatIcon" />
    <h2>Chat App :)</h2>
    <h1>Page Not Found</h1>
    <router-link to="/signup"
      ><span class="routerLink">Don't have an account? Sign Up </span></router-link
    >
  </div>
</template>

<script setup lang="ts">
import chatIcon from '@/assets/chatIcon.png';
</script>

<style scoped>
.notFoundContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
img {
  width: 150px;
  height: 150px;
}
h1 {
  font-size: 100px;
  color: #8e0000;
}
h2 {
  font-size: 40px;
  color: #006aff;
  margin-bottom: 100px;
}
</style>
