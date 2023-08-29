<template>
  <div class="chatHeader">
    <div class="imageWrapper">
      <img :src="currentUser.image" alt="User Avatar" class="userImage" />
      <div class="statusDot" v-if="currentUser.isOnline"></div>
    </div>
    <div class="userInfo">
      <div class="userName">{{ currentUser.name }}</div>
      <div class="userStatus" v-if="currentUser.isOnline" :class="currentUser.isOnline">Online</div>
      <div class="userStatus" v-else :class="currentUser.isOnline">Offline</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import chatIcon from '../assets/chatIcon.png';

import { ref } from 'vue';
interface User {
  name: string;
  image: string;
  isOnline: boolean;
}
const currentUser = ref<User>({
  name: 'John Doe',
  image: chatIcon,
  isOnline: true
});
</script>

<style scoped>
.chatHeader {
  display: flex;
  align-items: center;
  position: relative;
  padding: 10px;
}
.chatHeader::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.5px;
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.75);
}
.imageWrapper {
  position: relative;
}
.userImage {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1px;
}

.userInfo {
  display: flex;
  flex-direction: column;
}

.userName {
  font-weight: bold;
}

.userStatus {
  font-size: 0.8em;
  color: gray;
}
.userStatus.true {
  color: green;
}
.statusDot {
  width: 10px;
  height: 10px;
  background-color: green;
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
