<template>
  <div class="inputArea">
    <input
      type="text"
      v-model="newMessage"
      placeholder="Type a message"
      @keyup.enter="sendMessage"
    />
    <button @click="sendMessage" class="sendButton">
      <el-icon><Promotion /></el-icon>
    </button>
  </div>
</template>

<script setup lang="ts">
import { Promotion } from '@element-plus/icons-vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const newMessage = ref('');

const sendMessage = () => {
  if (newMessage.value == '' || newMessage.value == null || newMessage.value == undefined) {
    return;
  }
  store.dispatch('sendMessage', newMessage.value).then(() => {
    store.dispatch('getChatsWithUser', false).then(() => {
      for (const IDs of store.state.idArray) {
        store.dispatch('getRecentChatsWithUser', IDs, true);
      }
    });
  });
  newMessage.value = '';
};
</script>

<style scoped>
.inputArea {
  display: flex;
  padding: 10px;
  height: 80px;
}
.sendButton {
  background-color: blue;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  outline: none;
  color: white;
  font-size: 1.5em;
  width: 38px;
  height: 46px;
}
input[type='text'] {
  flex-grow: 1;
  padding: 10px;
  margin-right: 5px;
  border-radius: 5px;
  border: 1px solid gray;
}
</style>
