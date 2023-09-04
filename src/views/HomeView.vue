<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { ChatRound, SwitchButton } from '@element-plus/icons-vue';
import ContactsView from '../components/contacts/ContactsView.vue';
import ChatContainer from '../components/chat/ChatContainer.vue';
import chatIcon from '@/assets/chatIcon.png';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const router = useRouter();
const store = useStore();

const isCollapse = ref(true);
const showAboutView = ref(true);
const showChatContainer = ref(true);
const handleOpen = (key: string, keyPath: string[]) => {};
const handleClose = (key: string, keyPath: string[]) => {};

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value;
};
const handleResize = () => {
  if (window.innerWidth <= 1100) {
    showAboutView.value = false;
    showChatContainer.value = true;
  } else {
    showAboutView.value = true;
    showChatContainer.value = true;
  }
};
const toggleAboutView = () => {
  if (window.innerWidth <= 1100) {
    showAboutView.value = !showAboutView.value;
    showChatContainer.value = !showAboutView.value;
  } else {
    showAboutView.value = !showAboutView.value;
    showChatContainer.value = true;
    console.log('IN about view', showAboutView.value);
  }
};
const logoutUser = () => {
  store.dispatch('removeConnectionId').then(() => {
    router.push('/signin');
  });
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize(); // Call it once during mounted to set initial state
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="mainContainer">
    <div class="menuBar">
      <el-menu
        default-active="5"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="1" @click="toggleCollapse">
          <img class="icon" :src="chatIcon" alt="" />
          <template #title>ChatApp</template>
        </el-menu-item>
        <el-menu-item index="2" @click="toggleAboutView">
          <el-icon><ChatRound /></el-icon> <template #title>Your Chats</template>
        </el-menu-item>

        <el-menu-item index="3" disabled> </el-menu-item>
        <el-menu-item index="4" disabled> </el-menu-item>
        <el-menu-item index="5" disabled> </el-menu-item>
        <el-menu-item index="6" disabled> </el-menu-item>
        <el-menu-item index="7" disabled> </el-menu-item>
        <el-menu-item index="8" disabled> </el-menu-item>
        <el-menu-item index="9" disabled> </el-menu-item>
        <el-menu-item index="10" disabled> </el-menu-item>
        <el-menu-item index="11" @click="logoutUser">
          <el-icon><SwitchButton /></el-icon>
          <template #title>Logout</template>
        </el-menu-item>
      </el-menu>
    </div>
    <ContactsView v-if="showAboutView" />
    <ChatContainer v-if="showChatContainer" />
  </div>
</template>

<style>
.mainContainer {
  display: flex;
  flex-direction: row;
  height: 80vh;
  width: 100%;
}
.menuBar {
  height: 80vh;
}
.icon {
  width: 25px;
  height: 30px;
  margin-right: 10px;
}
.el-menu--collapse {
  min-height: 80vh;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-width: 200px;
  min-height: 80vh;
}

@media (max-width: 1200px) {
  .mainContainer {
    display: flex;
    flex-direction: row;
    height: 80vh;
    width: 90%;
  }
  .menuBar {
    height: 100%;
  }
  .el-menu--collapse {
    min-height: 80vh;
    width: 80px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    min-width: 200px;
    min-height: 80vh;
  }
  .icon {
    width: 20px;
    height: 25px;
    margin-right: 10px;
  }
}

/* Medium screens, typically tablets */
@media (max-width: 992px) {
  .mainContainer {
    display: flex;
    flex-direction: row;
    height: 80vh;
    width: 100%;
  }
  .menuBar {
    height: 100%;
  }
  .el-menu--collapse {
    min-height: 80vh;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    min-width: 200px;
    min-height: 80vh;
  }
}

/* Small screens, typically large mobile devices */
@media (max-width: 768px) {
  .mainContainer {
    display: flex;
    flex-direction: row;
    height: 80vh;
    width: 100%;
  }
  .menuBar {
    height: 100%;
  }
  .el-menu--collapse {
    min-height: 80vh;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    min-width: 200px;
    min-height: 80vh;
  }
}

/* Extra-small screens, typically small mobile devices */
@media (max-width: 576px) {
}

@media (max-width: 320px) {
}
</style>
