<template>
  <div class="chatHeader">
    <div class="imageWrapper">
      <img :src="currentUser.image" alt="User Avatar" class="userImage" />
      <div class="statusDot" v-if="contacts?.isOnlineUser"></div>
    </div>
    <div class="userInfo">
      <div class="userName">
        {{ contacts?.userMobileNo }}
        <span style="font-size: smaller; font-weight: 400; color: rgb(67, 67, 67)"
          >(Average Response Time:
          {{ `${(contacts?.averageResponseTime / 1000).toFixed(0)} secs` }})</span
        >
      </div>
      <div class="userStatus" v-if="contacts?.isOnlineUser" :class="contacts?.isOnlineUser">
        Online
      </div>
      <div class="userStatus" v-else :class="contacts?.isOnlineUser">Offline</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import chatIcon from '@/assets/chatIcon.png';

import { ref, watch } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
interface UserList {
  userId: number;
  userMobileNo: string;
  userName: string;
  isOnlineUser: boolean;
  newMsgCount: number;
  averageResponseTime: number;
}
let contacts = ref<UserList>();

watch(
  () => store.state.currentChatUser,
  (newVal) => {
    contacts.value = newVal;
  },
  { immediate: true }
);
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
