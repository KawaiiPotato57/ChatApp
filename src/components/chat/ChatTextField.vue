<template>
  <div class="inputArea">
    <input type="text" v-model="newMessage" placeholder="Type a message" />
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
  store.dispatch('sendMessage', newMessage.value).then(() => {
    store.dispatch('getChatsWithUser');
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
  font-size: 1em;
}
input[type='text'] {
  flex-grow: 1;
  padding: 10px;
  margin-right: 5px;
  border-radius: 5px;
  border: 1px solid gray;
}
</style>
